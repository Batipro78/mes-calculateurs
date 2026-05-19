import type { Metadata } from "next";
import Calcul1RM from "../Calcul1RM";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculer1RM, chargePourReps, arrondirAuPlate } from "../oneRepMaxCalc";

// 25 variantes SEO populaires
// Format : {poids}kg-{reps}-reps
// Poids : 40, 50, 60, 70, 80, 90, 100, 120, 140, 160
// Reps : 3, 5, 8, 10
const VARIANTES = [
  "40kg-3-reps",
  "40kg-5-reps",
  "40kg-8-reps",
  "40kg-10-reps",
  "60kg-3-reps",
  "60kg-5-reps",
  "60kg-8-reps",
  "60kg-10-reps",
  "80kg-3-reps",
  "80kg-5-reps",
  "80kg-8-reps",
  "80kg-10-reps",
  "100kg-3-reps",
  "100kg-5-reps",
  "100kg-8-reps",
  "100kg-10-reps",
  "120kg-3-reps",
  "120kg-5-reps",
  "120kg-8-reps",
  "120kg-10-reps",
  "140kg-5-reps",
  "140kg-8-reps",
  "160kg-3-reps",
  "160kg-5-reps",
  "160kg-8-reps",
];

function fmt(n: number, digits = 1): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function parseSlug(slug: string): {
  poids: number;
  reps: number;
} | null {
  const match = slug.match(/^(\d+)kg-(\d+)-reps$/);
  if (!match) return null;
  const [, poids, reps] = match;
  return {
    poids: parseFloat(poids),
    reps: parseFloat(reps),
  };
}

export function generateStaticParams() {
  return VARIANTES.map((slug) => ({ params: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const resultat = calculer1RM(parsed.poids, parsed.reps);
  const rm1Str = fmt(resultat.moyenneArrondie, 1);

  return {
    alternates: { canonical: `/calcul-1rm/${slug}` },
    title: `1RM pour ${parsed.poids}kg × ${parsed.reps} reps = ${rm1Str} kg`,
    description: `Calcul 1RM : ${parsed.poids}kg levé ${parsed.reps} fois = 1 Rep Max estimé à ${rm1Str} kg selon Brzycki, Epley, Lander. Formules powerlifting et charges de travail.`,
    keywords: `1rm ${parsed.poids}kg ${parsed.reps} reps, one rep max, calcul 1rm, charge maximale musculation`,
    openGraph: {
      title: `1RM : ${parsed.poids}kg × ${parsed.reps} = ${rm1Str} kg`,
      description: `Estimation 1 Rep Max : ${rm1Str} kg avec 5 formules (Brzycki, Epley, Lander, Lombardi, O'Connor).`,
    },
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

  const resultat = calculer1RM(parsed.poids, parsed.reps);
  const rm1Str = fmt(resultat.moyenneArrondie, 1);

  // Variations autour : ±10kg poids, ±3 reps
  const variations = [
    { poids: Math.max(20, parsed.poids - 10), reps: Math.max(1, parsed.reps - 3) },
    { poids: parsed.poids - 10, reps: parsed.reps },
    { poids: parsed.poids, reps: parsed.reps - 3 },
    { poids: parsed.poids + 10, reps: parsed.reps },
    { poids: Math.min(200, parsed.poids + 10), reps: Math.min(20, parsed.reps + 3) },
  ].filter(
    (v) =>
      VARIANTES.includes(`${v.poids}kg-${v.reps}-reps`) &&
      !(v.poids === parsed.poids && v.reps === parsed.reps)
  );

  return (
    <div>
      <Breadcrumb currentPage={`1RM ${parsed.poids}kg × ${parsed.reps} reps`} />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-violet-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏋️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          1RM pour {parsed.poids}kg × {parsed.reps} reps
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Votre 1 Rep Max estimé et charges de travail pour différents nombres de répétitions.
      </p>

      {/* Résumé grand */}
      <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border border-purple-200 p-8 mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-purple-600 font-semibold mb-2">Vos données</p>
            <div className="space-y-1">
              <p className="text-2xl font-black text-slate-800">
                {fmt(parsed.poids, 0)} kg
              </p>
              <p className="text-sm text-slate-600">levé(s) en {parsed.reps} répétition{parsed.reps > 1 ? "s" : ""}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-purple-600 font-semibold mb-2">Votre 1RM estimé</p>
            <div className="space-y-1">
              <p className="text-5xl font-black text-purple-600">
                {rm1Str} kg
              </p>
              <p className="text-xs text-slate-500">Moyenne arrondie aux plates</p>
            </div>
          </div>
        </div>
      </div>

      <Calcul1RM />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Comparaisons */}
      {variations.length > 0 && (
        <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Calculez d&apos;autres variantes
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {variations.map(({ poids, reps }) => {
              const res = calculer1RM(poids, reps);
              const rmStr = fmt(res.moyenneArrondie, 1);
              return (
                <a
                  key={`${poids}kg-${reps}-reps`}
                  href={`/calcul-1rm/${poids}kg-${reps}-reps`}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 hover:from-purple-50 hover:to-violet-50 rounded-xl p-4 border border-slate-200 hover:border-purple-300 transition-all group cursor-pointer"
                >
                  <p className="text-xs text-slate-500 group-hover:text-purple-600 font-medium mb-1">
                    {poids}kg × {reps}
                  </p>
                  <p className="text-lg font-bold text-slate-800 group-hover:text-purple-600">
                    {rmStr} kg
                  </p>
                </a>
              );
            })}
          </div>
        </section>
      )}

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <RelatedCalculators calculatorSlug="calcul-1rm" />
    </div>
  );
}
