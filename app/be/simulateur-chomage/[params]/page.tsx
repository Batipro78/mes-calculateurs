import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SimulateurChomageBE from "../SimulateurChomageBE";
import Breadcrumb from "../../../components/Breadcrumb";
import {
  calculerChomageBE,
  type SituationFamilialeChomage,
} from "../chomageBeCalc";

const BRUTS = [1800, 2000, 2400, 2800, 3000, 3500, 4000, 5000];
const SITUATIONS: { slug: string; value: SituationFamilialeChomage; label: string }[] = [
  { slug: "isole", value: "isole", label: "Isole" },
  { slug: "chef-famille", value: "cohabitant-charge-famille", label: "Chef de famille" },
  { slug: "cohabitant", value: "cohabitant-sans-charge", label: "Cohabitant simple" },
];
const MOIS_VALEURS = [3, 6, 12, 18, 24];

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-BE");
}

type Parsed = { brut: number; situation: typeof SITUATIONS[number]; mois: number };

function parseSlug(slug: string): Parsed | null {
  const m = slug.match(/^(\d+)-euros-(.+)-(\d+)-mois$/);
  if (!m) return null;
  const brut = parseInt(m[1], 10);
  const situation = SITUATIONS.find((s) => s.slug === m[2]);
  const mois = parseInt(m[3], 10);
  if (!BRUTS.includes(brut) || !situation || !MOIS_VALEURS.includes(mois)) return null;
  return { brut, situation, mois };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const b of BRUTS) {
    for (const s of SITUATIONS) {
      for (const m of MOIS_VALEURS) {
        params.push({ params: `${b}-euros-${s.slug}-${m}-mois` });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const res = calculerChomageBE(parsed.brut, parsed.situation.value, parsed.mois);
  return {
    alternates: { canonical: `/be/simulateur-chomage/${slug}` },
    title: `Chomage ${parsed.brut} EUR brut ${parsed.situation.label} mois ${parsed.mois} Belgique`,
    description: `Allocation chomage ONEM pour ${parsed.brut} EUR brut, ${parsed.situation.label.toLowerCase()}, au mois ${parsed.mois} : ${fmt(res.allocationMensuelle)} EUR. Reforme 2026.`,
    keywords: `chomage ${parsed.brut} belgique, ONEM ${parsed.situation.slug}, allocation mois ${parsed.mois}`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const res = calculerChomageBE(parsed.brut, parsed.situation.value, parsed.mois);

  const comparaisonMois = MOIS_VALEURS.map((m) => ({
    mois: m,
    res: calculerChomageBE(parsed.brut, parsed.situation.value, m),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel chomage pour ${parsed.brut} EUR brut et ${parsed.mois} mois en Belgique ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un brut de ${parsed.brut} EUR/mois, en tant que ${parsed.situation.label.toLowerCase()}, au mois ${parsed.mois} de chomage : ${fmt(res.allocationMensuelle)} EUR/mois (taux ${res.tauxApplique.toFixed(1)} %). Total cumule sur ${parsed.mois} mois : ${fmt(res.totalSurDuree)} EUR.`,
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
        currentPage={`${parsed.brut} EUR / ${parsed.situation.label} / mois ${parsed.mois}`}
        parentPage="Simulateur Chomage"
        parentHref="/be/simulateur-chomage"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📋
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Chomage ONEM : {parsed.brut} EUR brut, {parsed.situation.label}, mois {parsed.mois}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calcul detaille avec la reforme du 1er mars 2026.
      </p>

      <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl p-8 shadow-lg shadow-sky-200/50 mb-8">
        <p className="text-sky-100 mb-1">Allocation au mois {parsed.mois}</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(res.allocationMensuelle)}{" "}
          <span className="text-2xl font-semibold">EUR</span>
        </p>
        <p className="text-sky-100 mt-2 text-sm">
          {res.phaseLabel} &middot; Taux : {res.tauxApplique.toFixed(1)} %
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Evolution sur les 24 mois ({parsed.situation.label})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Mois
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Taux
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Allocation
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Cumul
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Lien
                </th>
              </tr>
            </thead>
            <tbody>
              {comparaisonMois.map((c) => (
                <tr
                  key={c.mois}
                  className={`border-b border-slate-100 ${
                    c.mois === parsed.mois ? "bg-sky-50/40" : ""
                  }`}
                >
                  <td className="py-2.5 px-2 font-medium text-slate-700">
                    {c.mois}
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">
                    {c.res.tauxApplique.toFixed(0)} %
                  </td>
                  <td className="py-2.5 px-2 text-right font-bold text-sky-600">
                    {fmt(c.res.allocationMensuelle)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">
                    {fmt(c.res.totalSurDuree)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right">
                    <a
                      href={`/be/simulateur-chomage/${parsed.brut}-euros-${parsed.situation.slug}-${c.mois}-mois`}
                      className="text-sky-600 hover:underline text-xs font-medium"
                    >
                      voir →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Calculateur interactif
      </h2>
      <SimulateurChomageBE />


      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-3">
          Autres bruts ({parsed.situation.label}, mois {parsed.mois})
        </h3>
        <div className="flex flex-wrap gap-2">
          {BRUTS.filter((b) => b !== parsed.brut).map((b) => (
            <a
              key={b}
              href={`/be/simulateur-chomage/${b}-euros-${parsed.situation.slug}-${parsed.mois}-mois`}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50/50 transition-all"
            >
              {b} EUR
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
