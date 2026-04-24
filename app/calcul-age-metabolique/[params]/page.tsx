import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurAgeMetabolique from "../CalculateurAgeMetabolique";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { calcAgeMetabolique } from "../ageMetaboliqueCalc";

const SEXES = ["homme", "femme"] as const;
const AGES = [25, 30, 35, 40, 45, 50, 55, 60, 65];
const ACTIVITES = ["sedentaire", "leger", "modere", "actif", "intense"] as const;

type Sexe = "homme" | "femme";
type Activite = "sedentaire" | "leger" | "modere" | "actif" | "intense";

const ACTIVITE_LABELS: Record<Activite, string> = {
  sedentaire: "Sedentaire",
  leger: "Legerement actif",
  modere: "Moderement actif",
  actif: "Tres actif",
  intense: "Extremement actif",
};

const DEFAULTS = {
  homme: { poids: 78, taille: 178, tourTaille: 88 },
  femme: { poids: 65, taille: 165, tourTaille: 75 },
};

function fmt(n: number): string {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n);
}

function parseSlug(slug: string): { sexe: Sexe; age: number; activite: Activite } | null {
  const match = slug.match(/^(homme|femme)-(\d+)ans-(sedentaire|leger|modere|actif|intense)$/);
  if (!match) return null;
  return {
    sexe: match[1] as Sexe,
    age: parseInt(match[2]),
    activite: match[3] as Activite,
  };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const sexe of SEXES) {
    for (const age of AGES) {
      for (const activite of ACTIVITES) {
        params.push({ params: `${sexe}-${age}ans-${activite}` });
      }
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

  const { sexe, age, activite } = parsed;
  const defaults = DEFAULTS[sexe];
  const res = calcAgeMetabolique(age, defaults.poids, defaults.taille, sexe, defaults.tourTaille, activite, false, false);
  const sexeLabel = sexe === "homme" ? "homme" : "femme";
  const activiteLabel = ACTIVITE_LABELS[activite];

  return {
    alternates: { canonical: `/calcul-age-metabolique/${slug}` },
    title: `Age Metabolique ${sexe} ${age} ans ${activiteLabel} = ${res.ageMetabolique} ans`,
    description: `Age metabolique pour un ${sexeLabel} de ${age} ans avec un niveau d'activite ${activiteLabel.toLowerCase()} : ${res.ageMetabolique} ans (ecart ${res.ecart > 0 ? "+" : ""}${res.ecart} an${Math.abs(res.ecart) > 1 ? "s" : ""}). BMR ${fmt(res.bmr)} kcal vs reference ${fmt(res.bmrRef)} kcal.`,
    keywords: `age metabolique ${sexe} ${age} ans, age biologique ${sexe} ${age} ans, metabolisme ${activite} ${age} ans`,
    openGraph: {
      title: `Age Metabolique ${sexe} ${age} ans (${activiteLabel}) : ${res.ageMetabolique} ans`,
      description: `BMR ${fmt(res.bmr)} kcal vs reference ${fmt(res.bmrRef)} kcal. Age metabolique ${res.ecart > 0 ? "+" : ""}${res.ecart} an${Math.abs(res.ecart) > 1 ? "s" : ""} par rapport a l'age reel.`,
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

  const { sexe, age, activite } = parsed;
  if (!SEXES.includes(sexe) || !AGES.includes(age) || !ACTIVITES.includes(activite)) {
    notFound();
  }

  const defaults = DEFAULTS[sexe];
  const res = calcAgeMetabolique(age, defaults.poids, defaults.taille, sexe, defaults.tourTaille, activite, false, false);
  const sexeLabel = sexe === "homme" ? "homme" : "femme";
  const activiteLabel = ACTIVITE_LABELS[activite];

  // Comparaison selon l'age (meme sexe, meme activite)
  const comparaisonAge = AGES.map((a) => {
    const r = calcAgeMetabolique(a, defaults.poids, defaults.taille, sexe, defaults.tourTaille, activite, false, false);
    return { age: a, ageMetabolique: r.ageMetabolique, ecart: r.ecart, isCurrent: a === age };
  });

  // Comparaison selon l'activite (meme sexe, meme age)
  const comparaisonActivite = ACTIVITES.map((act) => {
    const r = calcAgeMetabolique(age, defaults.poids, defaults.taille, sexe, defaults.tourTaille, act, false, false);
    return { activite: act, ageMetabolique: r.ageMetabolique, ecart: r.ecart, isCurrent: act === activite };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel est l'age metabolique d'un ${sexeLabel} de ${age} ans avec un niveau ${activiteLabel.toLowerCase()} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un ${sexeLabel} de ${age} ans avec un niveau d'activite ${activiteLabel.toLowerCase()} (poids de reference ${defaults.poids} kg, taille ${defaults.taille} cm), l'age metabolique estime est de ${res.ageMetabolique} ans, soit un ecart de ${res.ecart > 0 ? "+" : ""}${res.ecart} an${Math.abs(res.ecart) > 1 ? "s" : ""} par rapport a l'age reel. Le BMR est de ${fmt(res.bmr)} kcal/jour.`,
        },
      },
      {
        "@type": "Question",
        name: `Comment ameliorer l'age metabolique a ${age} ans ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A ${age} ans, pour ameliorer son age metabolique, il est recommande de pratiquer la musculation 2 a 3 fois par semaine, d'augmenter l'apport en proteines (1,6 a 2 g/kg/jour), de reduire la graisse abdominale et de dormir 7 a 9 heures par nuit. Passer du niveau ${activiteLabel.toLowerCase()} a un niveau superieur peut rajeunir l'age metabolique de 1 a 3 ans.`,
        },
      },
      {
        "@type": "Question",
        name: `Quelle est la difference d'age metabolique entre sedentaire et actif a ${age} ans ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A ${age} ans (${sexeLabel}), l'ecart d'age metabolique entre un niveau sedentaire et un niveau tres actif est de 5 ans en moyenne. Un mode de vie sedentaire ajoute 3 ans a l'age metabolique tandis qu'un niveau tres actif peut le reduire de 2 ans.`,
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
        currentPage={`${sexe === "homme" ? "Homme" : "Femme"} ${age} ans — ${activiteLabel}`}
        parentPage="Calcul Age Metabolique"
        parentHref="/calcul-age-metabolique"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🧬
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Age Metabolique — {sexe === "homme" ? "Homme" : "Femme"} {age} ans, {activiteLabel}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Age metabolique estime pour un{sexe === "femme" ? "e" : ""} {sexeLabel} de {age} ans
        avec un niveau d&apos;activite {activiteLabel.toLowerCase()}.
      </p>

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="mb-8" />

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg mb-8">
        <p className="text-white/80 mb-1">Age metabolique estime</p>
        <p className="text-5xl font-extrabold tracking-tight">{res.ageMetabolique}</p>
        <p className="text-xl font-medium mt-1">ans</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-white/70">Age reel</p>
            <p className="text-2xl font-bold">{age} ans</p>
          </div>
          <div>
            <p className="text-white/70">Ecart</p>
            <p className="text-2xl font-bold">
              {res.ecart > 0 ? "+" : ""}{res.ecart} an{Math.abs(res.ecart) > 1 ? "s" : ""}
            </p>
          </div>
          <div>
            <p className="text-white/70">BMR</p>
            <p className="text-2xl font-bold">{fmt(res.bmr)} kcal</p>
          </div>
        </div>
      </div>

      {/* Comparaison selon l'age */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Age metabolique {sexe} — {activiteLabel} selon l&apos;age
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Age reel</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Age metabolique</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Ecart</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonAge.map((row) => (
                <tr
                  key={row.age}
                  className={`border-b border-slate-100 ${row.isCurrent ? "bg-violet-50/50" : ""}`}
                >
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-violet-600">{row.age} ans</span>
                    ) : (
                      <a
                        href={`/calcul-age-metabolique/${sexe}-${row.age}ans-${activite}`}
                        className="text-slate-700 hover:text-violet-600 transition-colors"
                      >
                        {row.age} ans
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-violet-600" : "text-slate-700"}`}>
                    {row.ageMetabolique} ans
                  </td>
                  <td className={`py-2.5 px-2 text-right text-sm ${row.ecart > 2 ? "text-red-500" : row.ecart < 0 ? "text-emerald-600" : "text-slate-500"}`}>
                    {row.ecart > 0 ? "+" : ""}{row.ecart}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison selon l'activite */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Age metabolique {sexe} {age} ans selon l&apos;activite physique
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Niveau d&apos;activite</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Age metabolique</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Ecart</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonActivite.map((row) => (
                <tr
                  key={row.activite}
                  className={`border-b border-slate-100 ${row.isCurrent ? "bg-violet-50/50" : ""}`}
                >
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-violet-600">{ACTIVITE_LABELS[row.activite]}</span>
                    ) : (
                      <a
                        href={`/calcul-age-metabolique/${sexe}-${age}ans-${row.activite}`}
                        className="text-slate-700 hover:text-violet-600 transition-colors"
                      >
                        {ACTIVITE_LABELS[row.activite]}
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-violet-600" : "text-slate-700"}`}>
                    {row.ageMetabolique} ans
                  </td>
                  <td className={`py-2.5 px-2 text-right text-sm ${row.ecart > 2 ? "text-red-500" : row.ecart < 0 ? "text-emerald-600" : "text-slate-500"}`}>
                    {row.ecart > 0 ? "+" : ""}{row.ecart}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Texte SEO */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Age metabolique : {sexeLabel} {age} ans, {activiteLabel}
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour un{sexe === "femme" ? "e" : ""} <strong>{sexeLabel}</strong> de{" "}
          <strong>{age} ans</strong> avec un niveau d&apos;activite{" "}
          <strong>{activiteLabel.toLowerCase()}</strong> (poids de reference{" "}
          {defaults.poids} kg, taille {defaults.taille} cm), l&apos;age metabolique
          estime est de <strong>{res.ageMetabolique} ans</strong>, soit un ecart de{" "}
          <strong>
            {res.ecart > 0 ? "+" : ""}{res.ecart} an{Math.abs(res.ecart) > 1 ? "s" : ""}
          </strong>{" "}
          par rapport a l&apos;age reel.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le BMR (metabolisme de base) est de <strong>{fmt(res.bmr)} kcal/jour</strong>, a
          comparer au BMR de reference de{" "}
          <strong>{fmt(res.bmrRef)} kcal/jour</strong> pour un{sexe === "femme" ? "e" : ""}{" "}
          {sexeLabel} de {age} ans avec un IMC ideal de 22. L&apos;ecart est de{" "}
          <strong>
            {res.bmr >= res.bmrRef ? "+" : ""}{fmt(res.bmr - res.bmrRef)} kcal
          </strong>.
        </p>
        <p className="text-slate-600 leading-relaxed">
          L&apos;activite physique a un impact direct : passer d&apos;un niveau sedentaire a
          un niveau tres actif peut reduire l&apos;age metabolique de 5 ans. La
          musculation, l&apos;alimentation equilibree et un sommeil de qualite sont les
          trois piliers d&apos;un metabolisme jeune et efficace.
        </p>
        <p className="text-xs text-slate-400 mt-6">
          Mis a jour le 8 avril 2026
        </p>
      </section>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Calculateur interactif
      </h2>
      <CalculateurAgeMetabolique />

      <RelatedCalculators currentSlug="/calcul-age-metabolique" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
