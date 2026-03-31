import type { Metadata } from "next";
import SimulateurRetraite from "../SimulateurRetraite";
import { calcRetraite } from "../calcRetraite";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const ANNEES = [1960, 1962, 1964, 1965, 1968, 1970, 1975, 1980, 1985, 1990];
const SALAIRES = [20000, 25000, 30000, 35000, 40000, 47100];

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

function parseSlug(slug: string): { annee: number; salaire: number } | null {
  const match = slug.match(/^ne-en-(\d{4})-(\d+)-euros$/);
  if (!match) return null;
  return { annee: parseInt(match[1]), salaire: parseInt(match[2]) };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const a of ANNEES) {
    for (const s of SALAIRES) {
      params.push({ params: `ne-en-${a}-${s}-euros` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { annee, salaire } = parsed;
  const r172 = calcRetraite(annee, salaire, 172, 64);
  const r160 = calcRetraite(annee, salaire, 160, 64);

  return {
    title: `Retraite ne(e) en ${annee}, ${fmtInt(salaire)} EUR/an = ${fmtInt(r172.pensionTotaleNette)} EUR/mois net`,
    description: `Simulation retraite pour une personne nee en ${annee} avec un SAM de ${fmtInt(salaire)} EUR : pension nette estimee ${fmtInt(r172.pensionTotaleNette)} EUR/mois (carriere complete) ou ${fmtInt(r160.pensionTotaleNette)} EUR/mois (160 trimestres). Age legal : ${r172.ageLegal} ans.`,
    keywords: `retraite ${annee}, pension retraite ${fmtInt(salaire)} euros, simulation retraite ne en ${annee}, age legal retraite ${annee}`,
    openGraph: {
      title: `Ne(e) en ${annee}, ${fmtInt(salaire)} EUR/an → ${fmtInt(r172.pensionTotaleNette)} EUR net/mois de retraite`,
      description: `Pension base : ${fmt(r172.pensionBase)} EUR. Complementaire : ${fmt(r172.complementaireEffective)} EUR. Age legal : ${r172.ageLegal} ans. ${r172.trimestresRequis} trimestres requis.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { annee, salaire } = parsed;
  if (!ANNEES.includes(annee) || !SALAIRES.includes(salaire)) notFound();

  // Scenarios par trimestres
  const trimScenarios = [120, 140, 150, 160, 168, 172, 180].map((t) => {
    const res = calcRetraite(annee, salaire, t, 64);
    return { trimestres: t, ...res };
  });

  // Scenarios par age de depart (avec 172 trimestres)
  const ageScenarios = [62, 63, 64, 65, 66, 67].map((age) => {
    const res = calcRetraite(annee, salaire, 172, age);
    return { age, ...res };
  });

  // Comparaison par salaire (172 trim, 64 ans)
  const salaireComparaison = SALAIRES.map((s) => {
    const res = calcRetraite(annee, s, 172, 64);
    return { salaire: s, ...res, isCurrent: s === salaire };
  });

  const r = calcRetraite(annee, salaire, 172, 64);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quelle retraite pour un salaire de ${fmtInt(salaire)} EUR/an, ne(e) en ${annee} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Avec un SAM de ${fmtInt(salaire)} EUR et une carriere complete (${r.trimestresRequis} trimestres), la pension nette estimee est de ${fmtInt(r.pensionTotaleNette)} EUR/mois. Base : ${fmt(r.pensionBase)} EUR + complementaire : ${fmt(r.complementaireEffective)} EUR - prelevements 9,1%.`,
        },
      },
      {
        "@type": "Question",
        name: `Quel est l'age legal de depart pour les personnes nees en ${annee} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `L'age legal de depart a la retraite pour les personnes nees en ${annee} est de ${r.ageLegal % 1 === 0 ? r.ageLegal : r.ageLegal.toFixed(1)} ans (reforme 2023). Le nombre de trimestres requis pour le taux plein est de ${r.trimestresRequis}. L'age du taux plein automatique (sans condition de trimestres) est de 67 ans.`,
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
        currentPage={`Ne(e) en ${annee}, ${fmtInt(salaire)} EUR`}
        parentPage="Simulateur Retraite"
        parentHref="/simulateur-retraite"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏖️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Retraite : ne(e) en {annee}, {fmtInt(salaire)} EUR/an
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Pension estimee pour un salaire annuel moyen de {fmtInt(salaire)} EUR, generation {annee}.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-8 shadow-lg mb-8">
        <p className="text-white/80 mb-1">Pension de retraite nette estimee (carriere complete)</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmtInt(r.pensionTotaleNette)} EUR</p>
        <p className="text-lg font-medium mt-1">par mois</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-white/70">Brut mensuel</p>
            <p className="font-semibold">{fmt(r.pensionTotaleBrute)} EUR</p>
          </div>
          <div>
            <p className="text-white/70">Age legal</p>
            <p className="font-semibold">{r.ageLegal % 1 === 0 ? r.ageLegal : r.ageLegal.toFixed(1)} ans</p>
          </div>
          <div>
            <p className="text-white/70">Trimestres requis</p>
            <p className="font-semibold">{r.trimestresRequis}</p>
          </div>
          <div>
            <p className="text-white/70">Taux remplacement</p>
            <p className="font-semibold">{r.tauxRemplacement.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Detail base + complementaire */}
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-1">Regime general (base)</p>
          <p className="text-3xl font-extrabold text-slate-800">{fmt(r.pensionBase)} EUR</p>
          <p className="text-xs text-slate-500 mt-1">brut/mois — net : {fmt(r.pensionBase * 0.909)} EUR</p>
          <div className="mt-3 text-xs text-slate-400">
            <p>SAM plafonne : {fmtInt(r.samPlafonne)} EUR</p>
            <p>Taux : {(r.taux * 100).toFixed(2)}% — Prorata : {(r.coeffProrata * 100).toFixed(1)}%</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-1">Complementaire AGIRC-ARRCO</p>
          <p className="text-3xl font-extrabold text-slate-800">{fmt(r.complementaireEffective)} EUR</p>
          <p className="text-xs text-slate-500 mt-1">brut/mois — net : {fmt(r.complementaireEffective * 0.909)} EUR</p>
          <div className="mt-3 text-xs text-slate-400">
            <p>Estimation basee sur un taux moyen de cotisation de 7,87%</p>
          </div>
        </div>
      </div>

      {/* Pension selon l'age de depart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Pension nette selon l&apos;age de depart ({fmtInt(salaire)} EUR, 172 trim.)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Age</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Base</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Compl.</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Net/mois</th>
              </tr>
            </thead>
            <tbody>
              {ageScenarios.map((s) => (
                <tr key={s.age} className={`border-b border-slate-100 ${s.age === 64 ? "bg-amber-50/50" : ""}`}>
                  <td className={`py-2.5 px-2 font-medium ${s.age === 64 ? "text-amber-600" : "text-slate-700"}`}>
                    {s.age} ans
                    {s.age < s.ageLegal && <span className="text-xs text-red-400 ml-1">(impossible)</span>}
                  </td>
                  <td className={`py-2.5 px-2 text-right ${s.age === 64 ? "text-amber-600" : "text-slate-500"}`}>{(s.taux * 100).toFixed(1)}%</td>
                  <td className={`py-2.5 px-2 text-right ${s.age === 64 ? "text-amber-600" : "text-slate-500"}`}>{fmt(s.pensionBase)}</td>
                  <td className={`py-2.5 px-2 text-right ${s.age === 64 ? "text-amber-600" : "text-slate-500"}`}>{fmt(s.complementaireEffective)}</td>
                  <td className={`py-2.5 px-2 text-right font-bold ${s.age === 64 ? "text-amber-600" : "text-slate-700"}`}>{fmtInt(s.pensionTotaleNette)} EUR</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pension selon les trimestres */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Pension nette selon les trimestres ({fmtInt(salaire)} EUR, 64 ans)
        </h2>
        <div className="space-y-2">
          {trimScenarios.map((s) => (
            <div key={s.trimestres} className={`flex items-center justify-between px-4 py-3 rounded-xl border ${s.trimestres === 172 ? "bg-amber-50 border-amber-300" : "border-slate-100"}`}>
              <div>
                <span className={`font-semibold text-sm ${s.trimestres === 172 ? "text-amber-700" : "text-slate-600"}`}>
                  {s.trimestres} trimestres
                </span>
                <span className="text-xs text-slate-400 ml-2">({(s.trimestres / 4).toFixed(0)} ans)</span>
              </div>
              <div className="text-right">
                <span className={`font-extrabold ${s.trimestres === 172 ? "text-amber-700" : "text-slate-700"}`}>{fmtInt(s.pensionTotaleNette)} EUR</span>
                <span className="text-xs text-slate-400 ml-1">/mois</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparaison par salaire */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Pension selon le salaire (ne(e) en {annee}, 172 trim., 64 ans)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">SAM annuel</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Base</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Compl.</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Net/mois</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux remp.</th>
              </tr>
            </thead>
            <tbody>
              {salaireComparaison.map((row) => (
                <tr key={row.salaire} className={`border-b border-slate-100 ${row.isCurrent ? "bg-amber-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-amber-600">{fmtInt(row.salaire)} EUR</span>
                    ) : (
                      <a href={`/simulateur-retraite/ne-en-${annee}-${row.salaire}-euros`} className="text-slate-700 hover:text-amber-600 transition-colors">
                        {fmtInt(row.salaire)} EUR
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "text-amber-600" : "text-slate-500"}`}>{fmt(row.pensionBase)}</td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "text-amber-600" : "text-slate-500"}`}>{fmt(row.complementaireEffective)}</td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-amber-600" : "text-slate-700"}`}>{fmtInt(row.pensionTotaleNette)} EUR</td>
                  <td className={`py-2.5 px-2 text-right text-sm ${row.isCurrent ? "text-amber-600" : "text-slate-500"}`}>{row.tauxRemplacement.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur interactif</h2>
      <SimulateurRetraite />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Retraite pour les personnes nees en {annee} avec {fmtInt(salaire)} EUR de SAM
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour une personne nee en <strong>{annee}</strong> avec un Salaire Annuel Moyen
          de <strong>{fmtInt(salaire)} EUR</strong>, la pension de retraite nette estimee
          est de <strong>{fmtInt(r.pensionTotaleNette)} EUR/mois</strong> (carriere complete
          de {r.trimestresRequis} trimestres, depart a {r.ageLegal % 1 === 0 ? r.ageLegal : r.ageLegal.toFixed(1)} ans).
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La pension se decompose en <strong>{fmt(r.pensionBase)} EUR/mois</strong> de regime
          general et <strong>{fmt(r.complementaireEffective)} EUR/mois</strong> de complementaire
          AGIRC-ARRCO. Apres prelevements sociaux de 9,1% (CSG, CRDS, Casa), la pension
          brute de {fmt(r.pensionTotaleBrute)} EUR donne un net de {fmtInt(r.pensionTotaleNette)} EUR.
        </p>
        <p className="text-slate-600 leading-relaxed">
          L&apos;age legal de depart pour la generation {annee} est de <strong>{r.ageLegal % 1 === 0 ? r.ageLegal : r.ageLegal.toFixed(1)} ans</strong>.
          Le taux de remplacement (pension nette / dernier salaire net) est d&apos;environ <strong>{r.tauxRemplacement.toFixed(1)}%</strong>.
          Attendre 67 ans supprime toute decote quel que soit le nombre de trimestres.
        </p>
      </section>

      {/* Liens internes */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations retraite</h2>
        <div className="flex flex-wrap gap-2">
          {ANNEES.filter((a) => a !== annee).slice(0, 5).map((a) => (
            <a
              key={`a-${a}`}
              href={`/simulateur-retraite/ne-en-${a}-${salaire}-euros`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50/50 transition-all"
            >
              Ne(e) en {a}
            </a>
          ))}
          {SALAIRES.filter((s) => s !== salaire).map((s) => (
            <a
              key={`s-${s}`}
              href={`/simulateur-retraite/ne-en-${annee}-${s}-euros`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50/50 transition-all"
            >
              {fmtInt(s)} EUR/an
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-retraite" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
