import type { Metadata } from "next";
import CalculateurIK from "../CalculateurIK";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const DISTANCES = [3000, 5000, 8000, 10000, 12000, 15000, 18000, 20000, 25000, 30000];
const CV_LIST = [
  { cv: "3cv", label: "3 CV", idx: 0 },
  { cv: "4cv", label: "4 CV", idx: 1 },
  { cv: "5cv", label: "5 CV", idx: 2 },
  { cv: "6cv", label: "6 CV", idx: 3 },
  { cv: "7cv", label: "7 CV+", idx: 4 },
];

const CV_SLUGS = CV_LIST.map((c) => c.cv);

// Bareme fiscal 2026 voitures
const BAREME = [
  { label: "3 CV et moins", d1: 0.529, d2: 0.316, d3: 0.37, c1: 1065 },
  { label: "4 CV", d1: 0.606, d2: 0.34, d3: 0.407, c1: 1330 },
  { label: "5 CV", d1: 0.636, d2: 0.357, d3: 0.427, c1: 1395 },
  { label: "6 CV", d1: 0.665, d2: 0.374, d3: 0.447, c1: 1457 },
  { label: "7 CV et plus", d1: 0.697, d2: 0.394, d3: 0.47, c1: 1515 },
];

function calculIK(cvIdx: number, km: number, electrique: boolean = false): number {
  const b = BAREME[cvIdx];
  let montant = 0;
  if (km <= 5000) montant = km * b.d1;
  else if (km <= 20000) montant = km * b.d2 + b.c1;
  else montant = km * b.d3;
  if (electrique) montant *= 1.2;
  return montant;
}

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function parseSlug(slug: string): { km: number; cv: string } | null {
  const match = slug.match(/^(\d+)-km-(\d+cv)$/);
  if (!match) return null;
  return { km: parseInt(match[1]), cv: match[2] };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const d of DISTANCES) {
    for (const c of CV_SLUGS) {
      params.push({ params: `${d}-km-${c}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { km, cv } = parsed;
  const cvInfo = CV_LIST.find((c) => c.cv === cv);
  if (!cvInfo) return {};

  const montant = calculIK(cvInfo.idx, km);
  const parMois = montant / 12;
  const parKm = km > 0 ? montant / km : 0;

  return {
    alternates: { canonical: `/calcul-indemnites-kilometriques/${slug}` },
    title: `Indemnites kilometriques ${fmtInt(km)} km ${cvInfo.label} - Bareme 2026`,
    description: `Indemnites kilometriques pour ${fmtInt(km)} km/an avec une voiture ${cvInfo.label} : ${fmt(montant)} EUR/an (${fmt(parMois)} EUR/mois, ${fmt(parKm)} EUR/km). Bareme fiscal 2026.`,
    keywords: `indemnites kilometriques ${fmtInt(km)} km, IK ${cvInfo.label}, bareme km ${fmtInt(km)}, frais kilometriques ${cvInfo.label} ${fmtInt(km)} km`,
    openGraph: {
      title: `${fmtInt(km)} km/an (${cvInfo.label}) = ${fmt(montant)} EUR d'indemnites (2026)`,
      description: `Bareme kilometrique 2026 : ${fmtInt(km)} km avec ${cvInfo.label} = ${fmt(montant)} EUR/an soit ${fmt(parMois)} EUR/mois.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { km, cv } = parsed;
  const cvInfo = CV_LIST.find((c) => c.cv === cv);
  if (!cvInfo || !DISTANCES.includes(km)) notFound();

  const montant = calculIK(cvInfo.idx, km);
  const montantEV = calculIK(cvInfo.idx, km, true);
  const parMois = montant / 12;
  const parKm = km > 0 ? montant / km : 0;

  // Tranche utilisee
  let tranche = "";
  if (km <= 5000) tranche = `${fmtInt(km)} x ${BAREME[cvInfo.idx].d1} = ${fmt(montant)} EUR`;
  else if (km <= 20000) tranche = `(${fmtInt(km)} x ${BAREME[cvInfo.idx].d2}) + ${fmtInt(BAREME[cvInfo.idx].c1)} = ${fmt(montant)} EUR`;
  else tranche = `${fmtInt(km)} x ${BAREME[cvInfo.idx].d3} = ${fmt(montant)} EUR`;

  // Comparaison par CV pour cette distance
  const comparaisonCV = CV_LIST.map((c) => {
    const m = calculIK(c.idx, km);
    return { cv: c.cv, label: c.label, montant: m, parKm: km > 0 ? m / km : 0, isCurrent: c.cv === cv };
  });

  // Comparaison par distance pour ce CV
  const comparaisonDistances = DISTANCES.map((d) => {
    const m = calculIK(cvInfo.idx, d);
    return { km: d, montant: m, parMois: m / 12, isCurrent: d === km };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien d'indemnites kilometriques pour ${fmtInt(km)} km avec une ${cvInfo.label} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour ${fmtInt(km)} km par an avec une voiture de ${cvInfo.label}, les indemnites kilometriques s'elevent a ${fmt(montant)} EUR selon le bareme fiscal 2026. Cela represente ${fmt(parMois)} EUR par mois et ${fmt(parKm)} EUR par kilometre. Pour un vehicule electrique, le montant est majore de 20% soit ${fmt(montantEV)} EUR.`,
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
        currentPage={`${fmtInt(km)} km - ${cvInfo.label}`}
        parentPage="Indemnites Kilometriques"
        parentHref="/calcul-indemnites-kilometriques"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚗
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          IK : {fmtInt(km)} km/an — {cvInfo.label}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Indemnites kilometriques pour {fmtInt(km)} km par an avec une voiture {cvInfo.label} — bareme fiscal 2026.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl p-8 shadow-lg shadow-teal-200/50 mb-8">
        <p className="text-teal-200 mb-1">Indemnite annuelle</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(montant)} <span className="text-2xl font-semibold">EUR / an</span>
        </p>
        <p className="text-teal-200 mt-2">pour {fmtInt(km)} km avec {cvInfo.label}</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-teal-200">Par mois</p>
            <p className="font-semibold">{fmt(parMois)} EUR</p>
          </div>
          <div>
            <p className="text-teal-200">Par kilometre</p>
            <p className="font-semibold">{fmt(parKm)} EUR/km</p>
          </div>
          <div>
            <p className="text-teal-200">Puissance</p>
            <p className="font-semibold">{cvInfo.label}</p>
          </div>
          <div>
            <p className="text-teal-200">Si electrique</p>
            <p className="font-semibold">{fmt(montantEV)} EUR (+20%)</p>
          </div>
        </div>
      </div>

      {/* Formule */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Detail du calcul</h2>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700">
          <p>Tranche : {km <= 5000 ? "jusqu'a 5 000 km" : km <= 20000 ? "5 001 a 20 000 km" : "plus de 20 000 km"}</p>
          <p className="mt-1">{tranche}</p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
            <p className="text-xs text-teal-500">Thermique</p>
            <p className="text-xl font-extrabold text-teal-700">{fmt(montant)} EUR</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="text-xs text-green-500">Electrique (+20%)</p>
            <p className="text-xl font-extrabold text-green-700">{fmt(montantEV)} EUR</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="text-xs text-slate-400">Abattement 10% equivalent</p>
            <p className="text-xl font-extrabold text-slate-700">{fmt(montant * 10 / (montant > 0 ? montant : 1) * 1000)} EUR</p>
            <p className="text-xs text-slate-400">Revenu pour lequel les IK sont plus interessants</p>
          </div>
        </div>
      </div>

      {/* Comparaison par CV */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {fmtInt(km)} km : comparaison par puissance fiscale
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Puissance</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Indemnite / an</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Par km</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonCV.map((row) => (
                <tr key={row.cv} className={`border-b border-slate-100 ${row.isCurrent ? "bg-teal-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-teal-600">{row.label}</span>
                    ) : (
                      <a href={`/calcul-indemnites-kilometriques/${km}-km-${row.cv}`} className="text-slate-700 hover:text-teal-600 transition-colors">
                        {row.label}
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-teal-600" : "text-slate-700"}`}>
                    {fmt(row.montant)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{fmt(row.parKm)} EUR</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par distance */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {cvInfo.label} : comparaison par distance
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Distance</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Indemnite / an</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Par mois</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonDistances.map((row) => (
                <tr key={row.km} className={`border-b border-slate-100 ${row.isCurrent ? "bg-teal-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-teal-600">{fmtInt(row.km)} km</span>
                    ) : (
                      <a href={`/calcul-indemnites-kilometriques/${row.km}-km-${cv}`} className="text-slate-700 hover:text-teal-600 transition-colors">
                        {fmtInt(row.km)} km
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-teal-600" : "text-slate-700"}`}>
                    {fmt(row.montant)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{fmt(row.parMois)} EUR</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur interactif</h2>
      <CalculateurIK />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Indemnites kilometriques pour {fmtInt(km)} km avec {cvInfo.label} en 2026
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour <strong>{fmtInt(km)} km</strong> parcourus dans l&apos;annee avec une voiture
          de <strong>{cvInfo.label}</strong>, le bareme fiscal 2026 donne une indemnite
          de <strong>{fmt(montant)} EUR</strong>, soit <strong>{fmt(parMois)} EUR par mois</strong>.
          Si votre vehicule est 100% electrique, la majoration de 20% porte ce montant
          a <strong>{fmt(montantEV)} EUR</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Ce montant couvre l&apos;amortissement du vehicule, le carburant, l&apos;assurance,
          l&apos;entretien et les pneumatiques. Les frais de peage et de stationnement
          professionnel sont deductibles en plus du bareme.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Conseils</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>Comparez avec la deduction forfaitaire de 10% avant de declarer</li>
          <li>Conservez votre carte grise et un suivi kilometrique</li>
          <li>Le trajet domicile-travail est limite a 40 km aller simple (sauf justification)</li>
          <li>Les peages et parkings sont deductibles en supplement</li>
        </ul>
      </section>

      {/* Liens */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations</h2>
        <div className="flex flex-wrap gap-2">
          {CV_LIST.filter((c) => c.cv !== cv).map((c) => (
            <a
              key={c.cv}
              href={`/calcul-indemnites-kilometriques/${km}-km-${c.cv}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50/50 transition-all"
            >
              {fmtInt(km)} km - {c.label}
            </a>
          ))}
          {DISTANCES.filter((d) => d !== km).slice(0, 5).map((d) => (
            <a
              key={d}
              href={`/calcul-indemnites-kilometriques/${d}-km-${cv}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50/50 transition-all"
            >
              {fmtInt(d)} km - {cvInfo.label}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-indemnites-kilometriques" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
