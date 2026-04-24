import type { Metadata } from "next";
import CalculateurMicroEntreprise from "../CalculateurMicroEntreprise";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

interface ActiviteConfig {
  slug: string;
  label: string;
  tauxCharges: number;
  tauxAbattement: number;
  plafondCA: number;
  tauxVL: number;
  tauxCFP: number;
}

const ACTIVITES: ActiviteConfig[] = [
  { slug: "services-bnc", label: "Prestations de services (BNC)", tauxCharges: 21.1, tauxAbattement: 34, plafondCA: 77700, tauxVL: 2.2, tauxCFP: 0.2 },
  { slug: "services-bic", label: "Prestations de services (BIC)", tauxCharges: 21.2, tauxAbattement: 50, plafondCA: 77700, tauxVL: 1.7, tauxCFP: 0.2 },
  { slug: "achat-revente", label: "Achat / Revente de marchandises", tauxCharges: 12.3, tauxAbattement: 71, plafondCA: 188700, tauxVL: 1.0, tauxCFP: 0.1 },
  { slug: "liberal", label: "Activite liberale (BNC)", tauxCharges: 21.2, tauxAbattement: 34, plafondCA: 77700, tauxVL: 2.2, tauxCFP: 0.2 },
];

const CA_VALUES = [10000, 15000, 20000, 25000, 30000, 35000, 40000, 50000, 60000, 70000, 77700];

const TRANCHES_IR = [
  { min: 0, max: 11497, taux: 0 },
  { min: 11497, max: 29315, taux: 11 },
  { min: 29315, max: 83823, taux: 30 },
  { min: 83823, max: 180294, taux: 41 },
  { min: 180294, max: Infinity, taux: 45 },
];

function calculerIR(revenuImposable: number): number {
  let impot = 0;
  for (const tranche of TRANCHES_IR) {
    if (revenuImposable <= tranche.min) break;
    const base = Math.min(revenuImposable, tranche.max) - tranche.min;
    impot += base * (tranche.taux / 100);
  }
  return impot;
}

function calcMicro(ca: number, activite: ActiviteConfig) {
  const charges = ca * (activite.tauxCharges / 100);
  const cfp = ca * (activite.tauxCFP / 100);
  const totalCharges = charges + cfp;
  const revenuImposable = ca * (1 - activite.tauxAbattement / 100);
  const impot = calculerIR(revenuImposable);
  const impotVL = ca * (activite.tauxVL / 100);
  const revenuNet = ca - totalCharges - impot;
  const revenuNetVL = ca - totalCharges - impotVL;
  const chargesACRE = ca * ((activite.tauxCharges / 2) / 100);
  const totalChargesACRE = chargesACRE + cfp;
  const revenuNetACRE = ca - totalChargesACRE - impot;
  return { charges, cfp, totalCharges, revenuImposable, impot, impotVL, revenuNet, revenuNetVL, revenuNetACRE, totalChargesACRE, tauxTotal: ca > 0 ? ((totalCharges + impot) / ca) * 100 : 0 };
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

function parseSlug(slug: string): { ca: number; activiteSlug: string } | null {
  const match = slug.match(/^(\d+)-euros-(.+)$/);
  if (!match) return null;
  return { ca: parseInt(match[1]), activiteSlug: match[2] };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const ca of CA_VALUES) {
    for (const act of ACTIVITES) {
      params.push({ params: `${ca}-euros-${act.slug}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const activite = ACTIVITES.find((a) => a.slug === parsed.activiteSlug);
  if (!activite) return {};

  const r = calcMicro(parsed.ca, activite);

  return {
    alternates: { canonical: `/simulateur-micro-entreprise/${slug}` },
    title: `Micro-entreprise ${fmt(parsed.ca)} EUR ${activite.label} = ${fmt(r.revenuNet)} EUR net`,
    description: `Simulateur micro-entreprise pour ${fmt(parsed.ca)} EUR de CA en ${activite.label.toLowerCase()} : charges ${fmt(r.totalCharges)} EUR, impot ${fmt(r.impot)} EUR, revenu net ${fmt(r.revenuNet)} EUR/an (${fmt(r.revenuNet / 12)} EUR/mois). Taux URSSAF ${activite.tauxCharges}%.`,
    keywords: `micro-entreprise ${fmt(parsed.ca)} euros, auto-entrepreneur ${activite.label.toLowerCase()}, charges ${activite.tauxCharges}%, revenu net micro-entreprise`,
    openGraph: {
      title: `${fmt(parsed.ca)} EUR CA (${activite.label}) → ${fmt(r.revenuNet)} EUR net/an`,
      description: `Charges : ${fmt(r.totalCharges)} EUR. IR : ${fmt(r.impot)} EUR. Net mensuel : ${fmt(r.revenuNet / 12)} EUR.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const activite = ACTIVITES.find((a) => a.slug === parsed.activiteSlug);
  if (!activite || !CA_VALUES.includes(parsed.ca)) notFound();

  const { ca } = parsed;
  const r = calcMicro(ca, activite);

  // Comparaison par CA
  const comparaisonCA = CA_VALUES.map((c) => {
    const res = calcMicro(c, activite);
    return { ca: c, charges: res.totalCharges, impot: res.impot, net: res.revenuNet, netMensuel: res.revenuNet / 12, taux: res.tauxTotal, isCurrent: c === ca };
  });

  // Comparaison par activite
  const comparaisonActivite = ACTIVITES.map((act) => {
    const res = calcMicro(ca, act);
    return { label: act.label, slug: act.slug, charges: res.totalCharges, impot: res.impot, net: res.revenuNet, isCurrent: act.slug === activite.slug };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien gagne un auto-entrepreneur avec ${fmt(ca)} EUR de CA en ${activite.label.toLowerCase()} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Avec ${fmt(ca)} EUR de chiffre d'affaires en ${activite.label.toLowerCase()}, le revenu net est d'environ ${fmt(r.revenuNet)} EUR/an (${fmt(r.revenuNet / 12)} EUR/mois). Les charges URSSAF sont de ${fmt(r.charges)} EUR (${activite.tauxCharges}%) et l'impot est de ${fmt(r.impot)} EUR.`,
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
        currentPage={`${fmt(ca)} EUR - ${activite.label}`}
        parentPage="Simulateur Micro-Entreprise"
        parentHref="/simulateur-micro-entreprise"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏢
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Micro-entreprise : {fmt(ca)} EUR de CA
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        {activite.label} — charges, impot et revenu net pour {fmt(ca)} EUR de chiffre d&apos;affaires.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg mb-8">
        <p className="text-white/80 mb-1">Revenu net annuel</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmt(r.revenuNet)} EUR</p>
        <p className="text-lg font-medium mt-1">{fmt(r.revenuNet / 12)} EUR/mois</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-white/70">CA</p>
            <p className="font-semibold">{fmt(ca)} EUR</p>
          </div>
          <div>
            <p className="text-white/70">Charges</p>
            <p className="font-semibold">{fmt(r.totalCharges)} EUR</p>
          </div>
          <div>
            <p className="text-white/70">Impot</p>
            <p className="font-semibold">{fmt(r.impot)} EUR</p>
          </div>
          <div>
            <p className="text-white/70">Taux total</p>
            <p className="font-semibold">{r.tauxTotal.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Comparaison : classique vs VL vs ACRE */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-1">Regime classique</p>
          <p className="text-2xl font-extrabold text-slate-800">{fmt(r.revenuNet)} EUR</p>
          <p className="text-xs text-slate-500 mt-1">IR : {fmt(r.impot)} EUR (abatt. {activite.tauxAbattement}%)</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-1">Versement liberatoire</p>
          <p className="text-2xl font-extrabold text-violet-700">{fmt(r.revenuNetVL)} EUR</p>
          <p className="text-xs text-slate-500 mt-1">IR : {fmt(r.impotVL)} EUR (VL {activite.tauxVL}%)</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-1">Avec ACRE (1ere annee)</p>
          <p className="text-2xl font-extrabold text-green-700">{fmt(r.revenuNetACRE)} EUR</p>
          <p className="text-xs text-slate-500 mt-1">Charges : {fmt(r.totalChargesACRE)} EUR (-50%)</p>
        </div>
      </div>

      {/* Comparaison par CA */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Revenu net selon le CA ({activite.label})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">CA annuel</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Charges</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Impot</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Net/an</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Net/mois</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonCA.map((row) => (
                <tr key={row.ca} className={`border-b border-slate-100 ${row.isCurrent ? "bg-violet-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-violet-600">{fmt(row.ca)} EUR</span>
                    ) : (
                      <a href={`/simulateur-micro-entreprise/${row.ca}-euros-${activite.slug}`} className="text-slate-700 hover:text-violet-600 transition-colors">
                        {fmt(row.ca)} EUR
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "text-violet-600" : "text-slate-500"}`}>{fmt(row.charges)}</td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "text-violet-600" : "text-slate-500"}`}>{fmt(row.impot)}</td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-violet-600" : "text-slate-700"}`}>{fmt(row.net)}</td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-violet-600" : "text-slate-500"}`}>{fmt(row.netMensuel)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par activite */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Revenu net selon l&apos;activite ({fmt(ca)} EUR de CA)
        </h2>
        <div className="space-y-2">
          {comparaisonActivite.map((row) => (
            <div key={row.slug} className={`flex items-center justify-between px-4 py-3 rounded-xl border ${row.isCurrent ? "bg-violet-50 border-violet-300" : "border-slate-100"}`}>
              <span className={`font-semibold text-sm ${row.isCurrent ? "text-violet-700" : "text-slate-600"}`}>
                {row.isCurrent ? row.label : (
                  <a href={`/simulateur-micro-entreprise/${ca}-euros-${row.slug}`} className="hover:text-violet-600 transition-colors">{row.label}</a>
                )}
              </span>
              <span className={`font-extrabold ${row.isCurrent ? "text-violet-700" : "text-slate-700"}`}>{fmt(row.net)} EUR</span>
            </div>
          ))}
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur interactif</h2>
      <CalculateurMicroEntreprise />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Micro-entreprise a {fmt(ca)} EUR de CA : combien gagnez-vous vraiment ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Avec un chiffre d&apos;affaires de <strong>{fmt(ca)} EUR/an</strong> en{" "}
          <strong>{activite.label.toLowerCase()}</strong>, vos charges sociales URSSAF
          s&apos;elevent a <strong>{fmt(r.charges)} EUR</strong> ({activite.tauxCharges}% du CA).
          La CFP ajoute <strong>{fmt(r.cfp)} EUR</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Apres application de l&apos;abattement forfaitaire de <strong>{activite.tauxAbattement}%</strong>,
          votre revenu imposable est de <strong>{fmt(r.revenuImposable)} EUR</strong>,
          ce qui donne un impot estime de <strong>{fmt(r.impot)} EUR</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Votre <strong>revenu net</strong> est donc de <strong>{fmt(r.revenuNet)} EUR/an</strong>,
          soit environ <strong>{fmt(r.revenuNet / 12)} EUR/mois</strong>.
          Le taux de prelevement total est de <strong>{r.tauxTotal.toFixed(1)}%</strong>.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Avec le <strong>versement liberatoire</strong> ({activite.tauxVL}%), le net serait
          de <strong>{fmt(r.revenuNetVL)} EUR/an</strong>. Avec l&apos;<strong>ACRE</strong> (charges divisees
          par 2), le net serait de <strong>{fmt(r.revenuNetACRE)} EUR/an</strong> la premiere annee.
        </p>
      </section>

      {/* Liens internes */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations</h2>
        <div className="flex flex-wrap gap-2">
          {CA_VALUES.filter((c) => c !== ca).slice(0, 5).map((c) => (
            <a
              key={`c-${c}`}
              href={`/simulateur-micro-entreprise/${c}-euros-${activite.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/50 transition-all"
            >
              {fmt(c)} EUR
            </a>
          ))}
          {ACTIVITES.filter((a) => a.slug !== activite.slug).map((a) => (
            <a
              key={a.slug}
              href={`/simulateur-micro-entreprise/${ca}-euros-${a.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/50 transition-all"
            >
              {a.label}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-micro-entreprise" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
