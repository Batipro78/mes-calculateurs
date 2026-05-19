import type { Metadata } from "next";
import CalculFFMI from "../CalculFFMI";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerFFMI, type Sexe } from "../ffmiCalc";

// 25 variantes SEO populaires
const VARIANTES = [
  // Hommes 70-90kg, tailles 170-185cm, MG 10-20%
  "homme-70kg-170cm-15-mg",
  "homme-75kg-175cm-15-mg",
  "homme-80kg-180cm-15-mg",
  "homme-85kg-185cm-15-mg",
  "homme-90kg-185cm-15-mg",
  "homme-75kg-175cm-10-mg",
  "homme-80kg-180cm-10-mg",
  "homme-80kg-180cm-20-mg",
  "homme-75kg-170cm-20-mg",
  "homme-85kg-180cm-15-mg",
  "homme-70kg-175cm-15-mg",
  "homme-80kg-185cm-15-mg",
  "homme-90kg-180cm-15-mg",
  "homme-75kg-180cm-12-mg",
  "homme-80kg-175cm-18-mg",
  // Femmes 55-70kg, tailles 160-170cm, MG 18-25%
  "femme-55kg-160cm-22-mg",
  "femme-60kg-165cm-22-mg",
  "femme-65kg-170cm-22-mg",
  "femme-70kg-170cm-22-mg",
  "femme-55kg-165cm-20-mg",
  "femme-60kg-160cm-25-mg",
  "femme-65kg-165cm-20-mg",
  "femme-70kg-165cm-22-mg",
  "femme-60kg-165cm-25-mg",
  "femme-55kg-160cm-20-mg",
];

function fmt(n: number, digits = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function parseSlug(slug: string): {
  sexe: Sexe;
  poidsKg: number;
  tailleCm: number;
  pourcentMG: number;
} | null {
  const match = slug.match(
    /^(homme|femme)-(\d+)kg-(\d+)cm-(\d+)-mg$/
  );
  if (!match) return null;
  const [, sexe, poids, taille, mg] = match;
  return {
    sexe: sexe as Sexe,
    poidsKg: parseFloat(poids),
    tailleCm: parseFloat(taille),
    pourcentMG: parseFloat(mg),
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

  const resultat = calculerFFMI(
    parsed.poidsKg,
    parsed.tailleCm,
    parsed.pourcentMG
  );

  const sexeLabel = parsed.sexe === "homme" ? "homme" : "femme";
  const ffmiStr = fmt(resultat.ffmiNormalise, 1);
  const masseMaigre = fmt(resultat.masseMaigre, 1);

  return {
    alternates: { canonical: `/calcul-ffmi/${slug}` },
    title: `FFMI ${sexeLabel} ${parsed.poidsKg}kg ${parsed.tailleCm}cm ${parsed.pourcentMG}% MG = ${ffmiStr}`,
    description: `FFMI ${sexeLabel} ${parsed.poidsKg}kg a ${parsed.tailleCm}cm avec ${parsed.pourcentMG}% de masse grasse = ${ffmiStr} (${resultat.niveau}). Masse maigre : ${masseMaigre} kg.`,
    keywords: `ffmi ${parsed.poidsKg}kg ${parsed.tailleCm}cm, calcul ffmi ${sexeLabel}, indice masse maigre, ${resultat.niveau}`,
    openGraph: {
      title: `FFMI ${ffmiStr} - ${sexeLabel} ${parsed.poidsKg}kg ${parsed.tailleCm}cm`,
      description: `Calcul FFMI : ${ffmiStr} pts (${resultat.niveau}). Masse maigre ${masseMaigre} kg.`,
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

  const resultat = calculerFFMI(
    parsed.poidsKg,
    parsed.tailleCm,
    parsed.pourcentMG
  );

  const sexeLabel = parsed.sexe === "homme" ? "homme" : "femme";
  const ffmiStr = fmt(resultat.ffmiNormalise, 1);
  const masseMaigre = fmt(resultat.masseMaigre, 1);

  // Variations autour : ±5% MG, ±5kg poids, ±5cm taille
  const variations = [
    {
      label: "MG -5%",
      resultat: calculerFFMI(
        parsed.poidsKg,
        parsed.tailleCm,
        Math.max(0, parsed.pourcentMG - 5)
      ),
    },
    {
      label: "MG +5%",
      resultat: calculerFFMI(
        parsed.poidsKg,
        parsed.tailleCm,
        Math.min(100, parsed.pourcentMG + 5)
      ),
    },
    {
      label: "Poids +5kg",
      resultat: calculerFFMI(
        parsed.poidsKg + 5,
        parsed.tailleCm,
        parsed.pourcentMG
      ),
    },
    {
      label: "Taille +5cm",
      resultat: calculerFFMI(
        parsed.poidsKg,
        parsed.tailleCm + 5,
        parsed.pourcentMG
      ),
    },
    {
      label: "Muscle pur (+2% + 3kg)",
      resultat: calculerFFMI(
        parsed.poidsKg + 3,
        parsed.tailleCm,
        Math.max(0, parsed.pourcentMG - 2)
      ),
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `FFMI ${parsed.poidsKg}kg ${parsed.tailleCm}cm ${parsed.pourcentMG}% MG : c&apos;est bon ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Un FFMI de ${ffmiStr} pour un ${sexeLabel} de ${parsed.poidsKg}kg a ${parsed.tailleCm}cm avec ${parsed.pourcentMG}% de masse grasse corresponds a un niveau ${resultat.niveau}. ${resultat.description}`,
        },
      },
      {
        "@type": "Question",
        name: "Comment augmenter mon FFMI ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pour augmenter votre FFMI, vous avez deux leviers : 1) Augmenter la masse maigre par l&apos;entrainement en force et une alimentation riche en proteines. 2) Reduire le pourcentage de masse grasse par une alimentation controlee et du cardio. L&apos;ideal est de gagner du muscle tout en reduisant la graisse (recomposition corporelle).",
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
        currentPage={`FFMI ${sexeLabel} ${parsed.poidsKg}kg ${parsed.tailleCm}cm`}
        parentPage="Calcul FFMI"
        parentHref="/calcul-ffmi"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💪
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          FFMI {sexeLabel} {parsed.poidsKg}kg {parsed.tailleCm}cm = {ffmiStr}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        {parsed.pourcentMG}% de masse grasse — Niveau {resultat.niveau}
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-violet-600 to-purple-700 text-white rounded-2xl p-8 shadow-lg shadow-violet-200/50 mb-8">
        <p className="text-violet-100 mb-1">FFMI normalisé</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {ffmiStr} <span className="text-2xl font-semibold">pts</span>
        </p>
        <p className={`text-lg mt-2 font-semibold ${resultat.couleur}`}>
          {resultat.niveau}
        </p>
      </div>

      {/* Details */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Votre profil musculaire
        </h2>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">Poids corporel</p>
            <p className="text-2xl font-bold text-slate-800">
              {parsed.poidsKg} kg
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">Taille</p>
            <p className="text-2xl font-bold text-slate-800">
              {parsed.tailleCm} cm
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">Masse grasse</p>
            <p className="text-2xl font-bold text-slate-800">
              {parsed.pourcentMG} %
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">Masse maigre</p>
            <p className="text-2xl font-bold text-slate-800">
              {masseMaigre} kg
            </p>
          </div>
        </div>
      </div>

      {/* Variations */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Si vous changiez 1 parametre
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          Voici comment varierait votre FFMI avec de petites modifications.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Scenario
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Nouveau FFMI
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Niveau
                </th>
              </tr>
            </thead>
            <tbody>
              {variations.map((v, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-2 font-medium text-slate-700">
                    {v.label}
                  </td>
                  <td className="py-3 px-2 font-bold text-slate-800">
                    {fmt(v.resultat.ffmiNormalise, 1)}
                  </td>
                  <td className="py-3 px-2 text-slate-600">
                    {v.resultat.niveau}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Affiner votre calcul
      </h2>
      <CalculFFMI />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Interpretation */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Interpretation de votre FFMI
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          <strong>Votre FFMI : {ffmiStr}</strong>
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          {resultat.description}
        </p>
        <p className="text-slate-600 leading-relaxed">
          Avec une masse maigre de <strong>{masseMaigre} kg</strong> et une
          taille de <strong>{parsed.tailleCm} cm</strong>, votre profil
          correspon a un {sexeLabel} avec un niveau{" "}
          <strong>{resultat.niveau}</strong> de developpement musculaire.
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-ffmi" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
