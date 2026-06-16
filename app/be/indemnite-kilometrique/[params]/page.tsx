import { fmtEUR_BE as fmt, fmtIntBE as fmtInt } from "@/app/lib/fmt";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurIndemniteKmBE from "../CalculateurIndemniteKmBE";
import Breadcrumb from "../../../components/Breadcrumb";
import {
  REGIMES_INDEMNITE,
  calculerIndemniteKm,
} from "../indemniteKmBeCalc";

const DISTANCES = [1000, 3000, 5000, 8000, 10000, 15000, 20000, 25000, 30000];

function parseSlug(slug: string): { distance: number; regime: typeof REGIMES_INDEMNITE[number] } | null {
  const m = slug.match(/^(\d+)-km-(.+)$/);
  if (!m) return null;

  const distance = parseInt(m[1], 10);
  const regimeSlug = m[2];
  const regime = REGIMES_INDEMNITE.find((r) => r.slug === regimeSlug);

  if (!regime || !DISTANCES.includes(distance)) return null;
  return { distance, regime };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const d of DISTANCES) {
    for (const r of REGIMES_INDEMNITE) {
      params.push({ params: `${d}-km-${r.slug}` });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { distance, regime } = parsed;
  const resultat = calculerIndemniteKm(distance, regime.slug);

  return {
    alternates: { canonical: `/be/indemnite-kilometrique/${slug}` },
    title: `Indemnité ${distance} km ${regime.label} - Belgique 2026`,
    description: `Indemnité kilométrique : ${distance} km en Belgique au taux ${regime.label} = ${fmt(resultat.montant)} EUR. Barèmes 2026 officiels.`,
    keywords: `${distance} km Belgique, indemnité kilométrique, ${regime.label}, frais km`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { distance, regime } = parsed;
  const resultat = calculerIndemniteKm(distance, regime.slug);

  // Autres regimes pour comparaison
  const autresResultats = REGIMES_INDEMNITE.filter(
    (r) => r.slug !== regime.slug
  ).map((r) => ({
    regime: r,
    montant: calculerIndemniteKm(distance, r.slug).montant,
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien pour ${distance} km en Belgique au taux ${regime.label} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${distance} km avec le taux ${regime.label} (${fmt(regime.taux)} EUR/km) en Belgique = ${fmt(resultat.montant)} EUR d'indemnité kilométrique.`,
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
        currentPage={`${distance} km - ${regime.label}`}
        parentPage="Indemnité Kilométrique Belgique"
        parentHref="/be/indemnite-kilometrique"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚗
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Indemnité {distance} km - {regime.label}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calcul de l&apos;indemnité kilométrique en Belgique pour {distance} km
        au taux {regime.label}.
      </p>

      <div className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl p-8 shadow-lg shadow-teal-200/50 mb-8">
        <p className="text-teal-100 mb-1">Indemnité totale</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(resultat.montant)}{" "}
          <span className="text-2xl font-semibold">EUR</span>
        </p>
        <p className="text-teal-100 mt-2 text-sm">
          {distance} km × {fmt(regime.taux)} EUR/km
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Avec d&apos;autres régimes (même distance)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Régime
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Taux
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Indemnité
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Lien
                </th>
              </tr>
            </thead>
            <tbody>
              {autresResultats.map((r) => (
                <tr key={r.regime.slug} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 font-medium text-slate-700">
                    {r.regime.label}
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">
                    {fmt(r.regime.taux)} EUR/km
                  </td>
                  <td className="py-2.5 px-2 text-right font-bold text-teal-600">
                    {fmt(r.montant)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right">
                    <a
                      href={`/be/indemnite-kilometrique/${distance}-km-${r.regime.slug}`}
                      className="text-teal-600 hover:underline text-xs font-medium"
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
      <CalculateurIndemniteKmBE />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Détail : {distance} km au taux {regime.label}
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour une distance de <strong>{distance} km</strong> en Belgique avec
          le régime <strong>{regime.label}</strong>, le taux est de{" "}
          <strong>{fmt(regime.taux)} EUR/km</strong>. L&apos;indemnité
          kilométrique s&apos;élève donc à <strong>{fmt(resultat.montant)} EUR</strong>{" "}
          ({distance} km × {fmt(regime.taux)} EUR/km).
        </p>
        <p className="text-slate-600 leading-relaxed">
          Ce taux de <strong>{regime.label}</strong> {regime.desc.toLowerCase()}. Il est
          officiel selon les sources belges : UCM (Union des Classes Moyennes),
          Securex, Partena, et SPF Finances (Belgique).
        </p>
      </section>

      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-3">
          Autres distances au taux {regime.label}
        </h3>
        <div className="flex flex-wrap gap-2">
          {DISTANCES.filter((d) => d !== distance).map((d) => (
            <a
              key={d}
              href={`/be/indemnite-kilometrique/${d}-km-${regime.slug}`}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50/50 transition-all"
            >
              {fmtInt(d)} km
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
