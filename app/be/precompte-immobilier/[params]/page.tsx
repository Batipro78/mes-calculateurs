import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurPrecompteImmobilier from "../CalculateurPrecompteImmobilier";
import AdSlot from "../../../components/AdSlot";
import Breadcrumb from "../../../components/Breadcrumb";
import {
  calculerPrecompteImmobilier,
  type RegionBE,
} from "../precompteImmobilierCalc";

const RC_VALUES = [500, 800, 1000, 1200, 1500, 2000, 3000, 5000];
const REGIONS: {
  slug: string;
  value: RegionBE;
  label: string;
  centimesDefaut: number;
}[] = [
  { slug: "wallonie", value: "wallonie", label: "Wallonie", centimesDefaut: 2700 },
  { slug: "flandre", value: "flandre", label: "Flandre", centimesDefaut: 1100 },
  { slug: "bruxelles", value: "bruxelles", label: "Bruxelles", centimesDefaut: 2750 },
];

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-BE");
}

type Parsed = {
  rc: number;
  region: typeof REGIONS[number];
};

function parseSlug(slug: string): Parsed | null {
  const m = slug.match(/^(\d+)-rc-(wallonie|flandre|bruxelles)$/);
  if (!m) return null;
  const rc = parseInt(m[1], 10);
  const region = REGIONS.find((r) => r.slug === m[2]);
  if (!region || !RC_VALUES.includes(rc)) return null;
  return { rc, region };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const rc of RC_VALUES) {
    for (const r of REGIONS) {
      params.push({ params: `${rc}-rc-${r.slug}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const res = calculerPrecompteImmobilier(
    parsed.rc,
    parsed.region.value,
    parsed.region.centimesDefaut,
  );

  return {
    alternates: { canonical: `/be/precompte-immobilier/${slug}` },
    title: `Precompte immobilier ${parsed.region.label} RC ${parsed.rc} - Calcul 2026`,
    description: `Precompte immobilier en ${parsed.region.label} pour un revenu cadastral de ${parsed.rc} EUR : environ ${fmt(res.precompteTotal)} EUR/an avec centimes communaux moyens ${parsed.region.centimesDefaut}. Coefficient 2026 = 2,1763.`,
    keywords: `precompte immobilier RC ${parsed.rc}, taxe fonciere belgique, ${parsed.region.slug}, revenu cadastral`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const res = calculerPrecompteImmobilier(
    parsed.rc,
    parsed.region.value,
    parsed.region.centimesDefaut,
  );

  // Comparaison regions
  const comparaisonRegions = REGIONS.map((r) => ({
    region: r,
    res: calculerPrecompteImmobilier(parsed.rc, r.value, r.centimesDefaut),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel precompte immobilier pour un RC de ${parsed.rc} EUR en ${parsed.region.label} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `En ${parsed.region.label}, un revenu cadastral non indexe de ${parsed.rc} EUR donne un RC indexe de ${fmt(res.rcIndexe)} EUR (coefficient 2026 = 2,1763). Avec un taux regional de ${res.tauxRegional} % et des centimes communaux moyens de ${parsed.region.centimesDefaut}, le precompte annuel s'eleve a environ ${fmt(res.precompteTotal)} EUR.`,
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
        currentPage={`RC ${parsed.rc} en ${parsed.region.label}`}
        parentPage="Precompte immobilier"
        parentHref="/be/precompte-immobilier"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏛️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Precompte immobilier : RC {parsed.rc} EUR en {parsed.region.label}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calcul base sur le revenu cadastral, taux regional et centimes
        communaux moyens. Indexation 2026.
      </p>

      <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-8 shadow-lg shadow-amber-200/50 mb-8">
        <p className="text-amber-100 mb-1">Precompte immobilier annuel</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(res.precompteTotal)}{" "}
          <span className="text-2xl font-semibold">EUR</span>
        </p>
        <p className="text-amber-100 mt-2 text-sm">
          RC indexe : {fmt(res.rcIndexe)} EUR &middot; Taux regional :{" "}
          {res.tauxRegional} % &middot; Centimes communaux moyens :{" "}
          {parsed.region.centimesDefaut}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Detail du calcul
        </h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">RC non indexe</span>
            <span className="font-semibold text-slate-700">
              {fmt(res.rcNonIndexe)} EUR
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">x coefficient indexation 2026</span>
            <span className="font-semibold text-slate-700">
              x 2,1763
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">= RC indexe</span>
            <span className="font-semibold text-slate-700">
              {fmt(res.rcIndexe)} EUR
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">
              x taux regional ({res.tauxRegional} %)
            </span>
            <span className="font-semibold text-slate-700">
              {fmt(res.precompteBase)} EUR
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">
              + Additionnels communaux ({res.centimesCommunaux})
            </span>
            <span className="font-semibold text-amber-600">
              +{fmt(res.precompteCommunal)} EUR
            </span>
          </div>
          {res.precompteProvincial > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-500">
                + Additionnels provinciaux ({res.centimesProvinciaux})
              </span>
              <span className="font-semibold text-amber-600">
                +{fmt(res.precompteProvincial)} EUR
              </span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-slate-100">
            <span className="font-medium text-slate-600">Total annuel</span>
            <span className="font-bold text-slate-800">
              {fmt(res.precompteTotal)} EUR
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Comparaison entre regions (meme RC)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Region
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Taux
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Precompte
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Lien
                </th>
              </tr>
            </thead>
            <tbody>
              {comparaisonRegions.map((c) => (
                <tr
                  key={c.region.slug}
                  className={`border-b border-slate-100 ${
                    c.region.slug === parsed.region.slug
                      ? "bg-amber-50/40"
                      : ""
                  }`}
                >
                  <td className="py-2.5 px-2 font-medium text-slate-700">
                    {c.region.label}
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">
                    {c.res.tauxRegional} %
                  </td>
                  <td className="py-2.5 px-2 text-right font-bold text-amber-600">
                    {fmt(c.res.precompteTotal)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right">
                    <a
                      href={`/be/precompte-immobilier/${parsed.rc}-rc-${c.region.slug}`}
                      className="text-amber-600 hover:underline text-xs font-medium"
                    >
                      voir →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-3 leading-relaxed">
          Centimes communaux moyens utilises : Wallonie 2 700, Flandre 1 100,
          Bruxelles 2 750. Pour un calcul precis a votre commune, utilisez le
          calculateur interactif ci-dessous.
        </p>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Calculateur interactif (avec votre commune)
      </h2>
      <CalculateurPrecompteImmobilier />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comprendre ce precompte
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour un bien situe en <strong>{parsed.region.label}</strong> avec un
          revenu cadastral non indexe de <strong>{parsed.rc} EUR</strong>, le
          precompte immobilier annuel moyen estime est de{" "}
          <strong>{fmt(res.precompteTotal)} EUR</strong>. Ce montant varie
          fortement selon votre commune precise : les centimes additionnels
          communaux peuvent aller de 0 (Knokke-Heist) a plus de 4 000 selon les
          villes belges.
        </p>
        <p className="text-slate-600 leading-relaxed">
          La formule appliquee est : RC indexe ({fmt(res.rcIndexe)} EUR) x taux
          regional ({res.tauxRegional} %) x (1 + centimes communaux + centimes
          provinciaux). Le coefficient d&apos;indexation 2026 du revenu
          cadastral est officiellement fixe a <strong>2,1763</strong>.
        </p>
      </section>

      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-3">
          Autres RC en {parsed.region.label}
        </h3>
        <div className="flex flex-wrap gap-2">
          {RC_VALUES.filter((rc) => rc !== parsed.rc).map((rc) => (
            <a
              key={rc}
              href={`/be/precompte-immobilier/${rc}-rc-${parsed.region.slug}`}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50/50 transition-all"
            >
              RC {rc} EUR
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
