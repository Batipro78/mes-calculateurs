import type { Metadata } from "next";
import CalculCaloriesSport from "../CalculCaloriesSport";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import {
  calculerCalories,
  getSport,
  equivalenceCalories,
  tempsForBrulerCalories,
} from "../caloriesSportCalc";

// Populaires variantes statiques
const SPORT_VARIANTS = [
  // Course 10 km/h
  { sport: "course-10kmh", poids: 60, duree: 30 },
  { sport: "course-10kmh", poids: 70, duree: 30 },
  { sport: "course-10kmh", poids: 80, duree: 30 },
  { sport: "course-10kmh", poids: 70, duree: 60 },
  { sport: "course-10kmh", poids: 80, duree: 60 },

  // Vélo route 25 km/h
  { sport: "velo-route-25", poids: 70, duree: 30 },
  { sport: "velo-route-25", poids: 70, duree: 60 },
  { sport: "velo-route-25", poids: 80, duree: 60 },

  // Natation modérée
  { sport: "natation-moderee", poids: 70, duree: 30 },
  { sport: "natation-moderee", poids: 70, duree: 60 },
  { sport: "natation-rapide", poids: 70, duree: 30 },

  // Football match
  { sport: "football-match", poids: 70, duree: 60 },
  { sport: "football-match", poids: 80, duree: 60 },
  { sport: "football-recreatif", poids: 70, duree: 60 },

  // Musculation
  { sport: "muscu-moderee", poids: 70, duree: 30 },
  { sport: "muscu-intense", poids: 70, duree: 60 },
  { sport: "crossfit", poids: 70, duree: 30 },

  // HIIT
  { sport: "hiit", poids: 70, duree: 30 },
  { sport: "hiit", poids: 70, duree: 60 },

  // Yoga vinyasa
  { sport: "yoga-vinyasa", poids: 60, duree: 60 },
  { sport: "yoga-vinyasa", poids: 70, duree: 60 },

  // Marche rapide
  { sport: "marche-rapide", poids: 70, duree: 30 },
  { sport: "marche-rapide", poids: 70, duree: 60 },

  // Randonnée montagne
  { sport: "randonnee-montagne", poids: 70, duree: 60 },
  { sport: "randonnee-montagne", poids: 80, duree: 60 },

  // Zumba
  { sport: "zumba", poids: 60, duree: 60 },
  { sport: "zumba", poids: 70, duree: 60 },

  // Basketball
  { sport: "basketball-match", poids: 70, duree: 60 },

  // Tennis
  { sport: "tennis-simple", poids: 70, duree: 60 },

  // Aviron
  { sport: "aviron-intense", poids: 70, duree: 30 },
  { sport: "aviron-intense", poids: 70, duree: 60 },
];

function parseSlug(slug: string): {
  sport: string;
  poids: number;
  duree: number;
} | null {
  // Format: {sport-id}-{poids}kg-{duree}min
  // Sport ID peut contenir des tirets (ex: "velo-route-25"), donc on doit matcher de droite à gauche
  const match = slug.match(/^(.+?)-(\d+)kg-(\d+)min$/);
  if (!match) return null;

  const sportId = match[1];
  const poids = parseInt(match[2], 10);
  const duree = parseInt(match[3], 10);

  if (!getSport(sportId)) return null;
  if (poids <= 0 || duree <= 0) return null;

  return { sport: sportId, poids, duree };
}

export function generateStaticParams() {
  return SPORT_VARIANTS.map((v) => ({
    params: `${v.sport}-${v.poids}kg-${v.duree}min`,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) return {};

  const { sport: sportId, poids, duree } = parsed;
  const sportInfo = getSport(sportId);
  if (!sportInfo) return {};

  const calories = calculerCalories(sportInfo.mets, poids, duree);
  const title = `${sportInfo.nom} ${poids}kg ${duree}min : ${calories} kcal brûlées`;
  const description = `Brûlez ${calories} kcal en pratiquant ${sportInfo.nom} pendant ${duree} minutes à ${poids}kg. Équivalences alimentaires et durée pour bruler 100/300/500 kcal.`;
  const keywords = `${sportInfo.nom} calories, ${sportInfo.nom} ${duree}min, ${poids}kg calories, dépense calorique`;

  return {
    alternates: { canonical: `/calcul-calories-sport/${slug}` },
    title,
    description,
    keywords,
    openGraph: { title, description },
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

  const { sport: sportId, poids, duree } = parsed;
  const sportInfo = getSport(sportId);

  if (!sportInfo) notFound();

  const calories = calculerCalories(sportInfo.mets, poids, duree);
  const equivalences = equivalenceCalories(calories);
  const temps100 = tempsForBrulerCalories(sportInfo.mets, poids, 100);
  const temps300 = tempsForBrulerCalories(sportInfo.mets, poids, 300);
  const temps500 = tempsForBrulerCalories(sportInfo.mets, poids, 500);

  function fmt(n: number, digits = 0): string {
    return n.toLocaleString("fr-FR", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  }

  function fmtDecimals(n: number, digits = 1): string {
    return n.toLocaleString("fr-FR", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien de calories pour ${duree}min de ${sportInfo.nom} à ${poids}kg ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `En pratiquant ${sportInfo.nom} pendant ${duree} minutes à ${poids}kg, vous brûlez environ ${calories} kcal. Formule : ${sportInfo.mets} METs × ${poids}kg × ${duree / 60} heures = ${calories} kcal.`,
        },
      },
      {
        "@type": "Question",
        name: `Combien de temps pour bruler 500 kcal avec ${sportInfo.nom} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour bruler 500 kcal à ${poids}kg en pratiquant ${sportInfo.nom}, il vous faut environ ${fmt(temps500)} minutes.`,
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
        currentPage={`${sportInfo.nom} - ${poids}kg - ${duree}min`}
        parentPage="Calcul Calories Sport"
        parentHref="/calcul-calories-sport"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {sportInfo.emoji}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {sportInfo.nom} : {calories} kcal
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        {duree} minutes à {poids}kg — Équivalences alimentaires et temps pour bruler X calories
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-8 shadow-lg shadow-orange-200/50 mb-8">
        <p className="text-orange-100 mb-1">Calories brûlées</p>
        <p className="text-5xl font-extrabold tracking-tight mb-3">
          {fmt(calories)} <span className="text-lg font-semibold">kcal</span>
        </p>
        <p className="text-orange-100 text-sm">
          {sportInfo.emoji} {sportInfo.nom} — {duree} min — {poids} kg
        </p>
      </div>

      {/* Equivalences */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs text-slate-400 mb-2 font-semibold uppercase">
            Équivalent
          </p>
          <p className="text-3xl font-bold text-slate-800">
            {fmtDecimals(equivalences.bigmac, 1)}
          </p>
          <p className="text-sm text-slate-600 mt-1">Big Mac</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs text-slate-400 mb-2 font-semibold uppercase">
            Ou
          </p>
          <p className="text-3xl font-bold text-slate-800">
            {fmt(equivalences.banane)}
          </p>
          <p className="text-sm text-slate-600 mt-1">Bananes</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs text-slate-400 mb-2 font-semibold uppercase">
            Ou
          </p>
          <p className="text-3xl font-bold text-slate-800">
            {fmt(equivalences.carre_chocolat)}
          </p>
          <p className="text-sm text-slate-600 mt-1">Carrés de chocolat</p>
        </div>
      </div>

      {/* Temps pour bruler */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Temps nécessaire pour bruler
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-2">100 kcal</p>
            <p className="text-2xl font-bold text-slate-800">{fmt(temps100)} min</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-2">300 kcal</p>
            <p className="text-2xl font-bold text-slate-800">{fmt(temps300)} min</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-2">500 kcal</p>
            <p className="text-2xl font-bold text-slate-800">{fmt(temps500)} min</p>
          </div>
        </div>
      </div>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Calculateur interactif
      </h2>
      <CalculCaloriesSport />


      {/* Explication */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          À propos de ce calcul
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Ce calcul utilise les METs officiels du <strong>Compendium of Physical Activities 2024</strong>. Les METs (Metabolic Equivalent of Task) permettent de normaliser la dépense calorique.
        </p>
        <div className="bg-slate-50 rounded-lg p-4 mb-4">
          <p className="text-sm font-mono text-slate-800">
            <strong>Calories = {sportInfo.mets} METs × {poids}kg × {duree / 60} heures = {calories} kcal</strong>
          </p>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Ces valeurs sont <strong>approximatives</strong> et dépendent aussi de facteurs personnels : âge, sexe, métabolisme de base, intensité réelle de l&apos;effort, conditions externes. Utilisez ce calculateur à titre informatif.
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-calories-sport" />
    </div>
  );
}
