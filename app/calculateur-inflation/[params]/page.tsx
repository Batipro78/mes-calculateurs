import type { Metadata } from "next";
import CalculateurInflation from "../CalculateurInflation";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const INFLATION_FR: Record<number, number> = {
  2000: 1.8, 2001: 1.8, 2002: 1.9, 2003: 2.2, 2004: 2.3,
  2005: 1.9, 2006: 1.9, 2007: 1.6, 2008: 3.2, 2009: 0.1,
  2010: 1.7, 2011: 2.3, 2012: 2.2, 2013: 1.0, 2014: 0.6,
  2015: 0.1, 2016: 0.3, 2017: 1.2, 2018: 2.1, 2019: 1.3,
  2020: 0.5, 2021: 1.6, 2022: 5.2, 2023: 4.9, 2024: 2.0,
  2025: 1.5,
};

const CURRENT_YEAR = 2025;
const MONTANTS = [1000, 1500, 2000, 2500, 3000, 3500, 4000, 5000];
const ANNEES = [2000, 2005, 2010, 2015, 2018, 2020, 2022, 2023];

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function calculInflation(montant: number, anneeDepart: number) {
  let multiplier = 1;
  const evolution: { year: number; inflation: number; cumulative: number; equivalent: number }[] = [];

  for (let y = anneeDepart; y <= CURRENT_YEAR; y++) {
    const rate = INFLATION_FR[y] || 0;
    if (y > anneeDepart) multiplier *= 1 + rate / 100;
    evolution.push({
      year: y,
      inflation: rate,
      cumulative: (multiplier - 1) * 100,
      equivalent: montant * multiplier,
    });
  }

  const equivalent = montant * multiplier;
  const perte = equivalent - montant;
  const pertePct = (multiplier - 1) * 100;
  const pouvoirAchat = montant / multiplier;

  return { equivalent, perte, pertePct, pouvoirAchat, multiplier, evolution };
}

function parseSlug(slug: string): { montant: number; annee: number } | null {
  const match = slug.match(/^(\d+)-euros-depuis-(\d{4})$/);
  if (!match) return null;
  return { montant: parseInt(match[1]), annee: parseInt(match[2]) };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const m of MONTANTS) {
    for (const a of ANNEES) {
      params.push({ params: `${m}-euros-depuis-${a}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { montant, annee } = parsed;
  const result = calculInflation(montant, annee);

  return {
    alternates: { canonical: `/calculateur-inflation/${slug}` },
    title: `${fmtInt(montant)} EUR en ${annee} = combien aujourd'hui ? Calculateur inflation`,
    description: `${fmtInt(montant)} EUR de ${annee} valent ${fmt(result.equivalent)} EUR en ${CURRENT_YEAR}. Inflation cumulee : +${fmt(result.pertePct)}%. Perte de pouvoir d'achat : ${fmt(result.perte)} EUR. Donnees INSEE.`,
    keywords: `inflation ${fmtInt(montant)} euros ${annee}, pouvoir achat ${annee}, ${fmtInt(montant)} euros ${annee} equivalent aujourd'hui, inflation france ${annee}`,
    openGraph: {
      title: `${fmtInt(montant)} EUR de ${annee} = ${fmt(result.equivalent)} EUR aujourd'hui`,
      description: `Inflation cumulee +${fmt(result.pertePct)}% depuis ${annee}. ${fmtInt(montant)} EUR de ${annee} equivalent a ${fmt(result.equivalent)} EUR en ${CURRENT_YEAR}.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { montant, annee } = parsed;
  if (!MONTANTS.includes(montant) || !ANNEES.includes(annee)) notFound();

  const result = calculInflation(montant, annee);
  const pertePouvoirAchat = montant - result.pouvoirAchat;

  // Comparaison par montant pour cette annee
  const comparaisonMontants = MONTANTS.map((m) => {
    const r = calculInflation(m, annee);
    return { montant: m, equivalent: r.equivalent, perte: r.perte, isCurrent: m === montant };
  });

  // Comparaison par annee pour ce montant
  const comparaisonAnnees = ANNEES.map((a) => {
    const r = calculInflation(montant, a);
    return { annee: a, equivalent: r.equivalent, pertePct: r.pertePct, isCurrent: a === annee };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien valent ${fmtInt(montant)} EUR de ${annee} aujourd'hui ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${fmtInt(montant)} EUR de ${annee} equivalent a ${fmt(result.equivalent)} EUR en ${CURRENT_YEAR} apres prise en compte de l'inflation (+${fmt(result.pertePct)}%). Pour conserver le meme pouvoir d'achat, il faudrait ${fmt(result.perte)} EUR de plus. Source : INSEE.`,
        },
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb
        currentPage={`${fmtInt(montant)} EUR depuis ${annee}`}
        parentPage="Calculateur Inflation"
        parentHref="/calculateur-inflation"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📉
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {fmtInt(montant)} EUR de {annee} en {CURRENT_YEAR}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Impact de l&apos;inflation sur {fmtInt(montant)} EUR depuis {annee} — donnees INSEE.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-2xl p-8 shadow-lg shadow-red-200/50 mb-8">
        <p className="text-red-200 mb-1">{fmtInt(montant)} EUR de {annee} =</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(result.equivalent)} <span className="text-2xl font-semibold">EUR en {CURRENT_YEAR}</span>
        </p>
        <p className="text-red-200 mt-2">+{fmt(result.perte)} EUR necessaires pour le meme pouvoir d&apos;achat</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-red-200">Inflation cumulee</p>
            <p className="font-semibold">+{fmt(result.pertePct)}%</p>
          </div>
          <div>
            <p className="text-red-200">Perte pouvoir achat</p>
            <p className="font-semibold">{fmt(pertePouvoirAchat)} EUR</p>
          </div>
          <div>
            <p className="text-red-200">Valeur reelle</p>
            <p className="font-semibold">{fmt(result.pouvoirAchat)} EUR</p>
          </div>
          <div>
            <p className="text-red-200">Periode</p>
            <p className="font-semibold">{CURRENT_YEAR - annee} ans</p>
          </div>
        </div>
      </div>

      {/* Phrase resumee */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200 p-6 mb-8">
        <p className="text-slate-700 leading-relaxed">
          Si vous gagniez <strong>{fmtInt(montant)} EUR/mois</strong> en{" "}
          <strong>{annee}</strong>, vous devriez gagner{" "}
          <strong className="text-red-700">{fmt(result.equivalent)} EUR</strong> aujourd&apos;hui
          pour avoir le meme niveau de vie. Sans augmentation, vous avez perdu{" "}
          <strong className="text-red-700">{fmt(result.perte)} EUR/mois</strong> de pouvoir d&apos;achat,
          soit <strong className="text-red-700">{fmt(result.perte * 12)} EUR/an</strong>.
        </p>
      </div>

      {/* Evolution annuelle */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Inflation annuelle depuis {annee}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Annee</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Inflation</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Cumul</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Equivalent</th>
              </tr>
            </thead>
            <tbody>
              {result.evolution.map((e) => (
                <tr key={e.year} className={`border-b border-slate-100 ${e.inflation >= 3 ? "bg-red-50/30" : ""}`}>
                  <td className="py-2.5 px-2 font-medium text-slate-700">{e.year}</td>
                  <td className={`py-2.5 px-2 text-right ${e.inflation >= 3 ? "font-bold text-red-600" : "text-slate-600"}`}>
                    +{e.inflation.toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">+{e.cumulative.toFixed(1)}%</td>
                  <td className="py-2.5 px-2 text-right font-bold text-slate-700">{fmt(e.equivalent)} EUR</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par montant */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Inflation depuis {annee} par montant
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Montant {annee}</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Equivalent {CURRENT_YEAR}</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Perte</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonMontants.map((row) => (
                <tr key={row.montant} className={`border-b border-slate-100 ${row.isCurrent ? "bg-red-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-red-600">{fmtInt(row.montant)} EUR</span>
                    ) : (
                      <a href={`/calculateur-inflation/${row.montant}-euros-depuis-${annee}`} className="text-slate-700 hover:text-red-600 transition-colors">
                        {fmtInt(row.montant)} EUR
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-red-600" : "text-slate-700"}`}>
                    {fmt(row.equivalent)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right text-red-500">+{fmt(row.perte)} EUR</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par annee */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {fmtInt(montant)} EUR : inflation selon l&apos;annee de depart
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Depuis</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Equivalent {CURRENT_YEAR}</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Inflation cumulee</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonAnnees.map((row) => (
                <tr key={row.annee} className={`border-b border-slate-100 ${row.isCurrent ? "bg-red-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-red-600">{row.annee}</span>
                    ) : (
                      <a href={`/calculateur-inflation/${montant}-euros-depuis-${row.annee}`} className="text-slate-700 hover:text-red-600 transition-colors">
                        {row.annee}
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-red-600" : "text-slate-700"}`}>
                    {fmt(row.equivalent)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right text-red-500">+{fmt(row.pertePct)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur interactif</h2>
      <CalculateurInflation />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          L&apos;inflation depuis {annee} : impact sur {fmtInt(montant)} EUR
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          En {CURRENT_YEAR - annee} ans (de {annee} a {CURRENT_YEAR}), l&apos;inflation cumulee en France
          a atteint <strong>+{fmt(result.pertePct)}%</strong> (source INSEE). Cela signifie que{" "}
          <strong>{fmtInt(montant)} EUR de {annee}</strong> ont le meme pouvoir d&apos;achat que{" "}
          <strong>{fmt(result.equivalent)} EUR aujourd&apos;hui</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Inversement, si vous avez toujours {fmtInt(montant)} EUR aujourd&apos;hui, leur valeur
          reelle n&apos;est plus que de <strong>{fmt(result.pouvoirAchat)} EUR</strong> en euros de {annee}.
          Vous avez perdu <strong>{fmt(pertePouvoirAchat)} EUR</strong> de pouvoir d&apos;achat.
        </p>
      </section>

      {/* Liens */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations</h2>
        <div className="flex flex-wrap gap-2">
          {ANNEES.filter((a) => a !== annee).map((a) => (
            <a
              key={a}
              href={`/calculateur-inflation/${montant}-euros-depuis-${a}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50/50 transition-all"
            >
              {fmtInt(montant)} EUR depuis {a}
            </a>
          ))}
          {MONTANTS.filter((m) => m !== montant).slice(0, 4).map((m) => (
            <a
              key={m}
              href={`/calculateur-inflation/${m}-euros-depuis-${annee}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50/50 transition-all"
            >
              {fmtInt(m)} EUR depuis {annee}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calculateur-inflation" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
