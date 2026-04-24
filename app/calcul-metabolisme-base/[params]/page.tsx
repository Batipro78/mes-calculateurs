import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurMetabolisme from "../CalculateurMetabolisme";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { calcMetabolisme } from "../metabolismeCalc";

const SEXES = ["homme", "femme"] as const;
const AGES = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65];
const POIDS = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

type Sexe = "homme" | "femme";

function fmt(n: number): string {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n);
}

function parseSlug(slug: string): { sexe: Sexe; poids: number; age: number } | null {
  const match = slug.match(/^(homme|femme)-(\d+)kg-(\d+)ans$/);
  if (!match) return null;
  return {
    sexe: match[1] as Sexe,
    poids: parseInt(match[2]),
    age: parseInt(match[3]),
  };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const sexe of SEXES) {
    for (const poids of POIDS) {
      for (const age of AGES) {
        params.push({ params: `${sexe}-${poids}kg-${age}ans` });
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

  const { sexe, poids, age } = parsed;
  const taille = sexe === "homme" ? 175 : 165;
  const res = calcMetabolisme(poids, taille, age, sexe);
  const sexeLabel = sexe === "homme" ? "homme" : "femme";

  return {
    alternates: { canonical: `/calcul-metabolisme-base/${slug}` },
    title: `BMR ${sexe} ${poids} kg ${age} ans = ${fmt(res.mifflin)} kcal - Metabolisme de Base`,
    description: `Metabolisme de base pour un ${sexeLabel} de ${poids} kg a ${age} ans : ${fmt(res.mifflin)} kcal/jour (Mifflin-St Jeor) et ${fmt(res.harris)} kcal/jour (Harris-Benedict). TDEE sedentaire : ${fmt(res.tdee.sedentaire)} kcal.`,
    keywords: `metabolisme base ${sexe} ${poids} kg ${age} ans, BMR ${poids}kg ${age}ans, calories repos ${sexe} ${age} ans`,
    openGraph: {
      title: `BMR ${sexe} ${poids} kg ${age} ans : ${fmt(res.mifflin)} kcal/jour`,
      description: `Metabolisme de base : ${fmt(res.mifflin)} kcal (Mifflin) / ${fmt(res.harris)} kcal (Harris). TDEE modere : ${fmt(res.tdee.modere)} kcal/jour.`,
    },
  };
}

const TDEE_ROWS = [
  { key: "sedentaire" as const, label: "Sedentaire", description: "Peu ou pas d'exercice", coeff: "x 1,2" },
  { key: "leger" as const, label: "Legerement actif", description: "1-3 jours/semaine", coeff: "x 1,375" },
  { key: "modere" as const, label: "Moderement actif", description: "3-5 jours/semaine", coeff: "x 1,55" },
  { key: "actif" as const, label: "Tres actif", description: "6-7 jours/semaine", coeff: "x 1,725" },
  { key: "intense" as const, label: "Extremement actif", description: "Athlete, travail physique", coeff: "x 1,9" },
];

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { sexe, poids, age } = parsed;
  if (!SEXES.includes(sexe) || !POIDS.includes(poids) || !AGES.includes(age)) {
    notFound();
  }

  const taille = sexe === "homme" ? 175 : 165;
  const res = calcMetabolisme(poids, taille, age, sexe);
  const sexeLabel = sexe === "homme" ? "homme" : "femme";

  // Comparaison selon le poids (meme sexe, meme age)
  const comparaisonPoids = POIDS.map((p) => {
    const r = calcMetabolisme(p, taille, age, sexe);
    return { poids: p, bmr: r.mifflin, isCurrent: p === poids };
  });

  // Comparaison selon l'age (meme sexe, meme poids)
  const comparaisonAge = AGES.map((a) => {
    const r = calcMetabolisme(poids, taille, a, sexe);
    return { age: a, bmr: r.mifflin, isCurrent: a === age };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel est le metabolisme de base d'un ${sexeLabel} de ${poids} kg a ${age} ans ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un ${sexeLabel} de ${poids} kg a ${age} ans (taille de reference ${taille} cm), le metabolisme de base est de ${fmt(res.mifflin)} kcal/jour selon la formule Mifflin-St Jeor et ${fmt(res.harris)} kcal/jour selon Harris-Benedict. La depense energetique totale (TDEE) pour un niveau d'activite modere est de ${fmt(res.tdee.modere)} kcal/jour.`,
        },
      },
      {
        "@type": "Question",
        name: `Combien de calories brule un ${sexeLabel} de ${poids} kg par jour ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Un ${sexeLabel} de ${poids} kg a ${age} ans brule en moyenne ${fmt(res.tdee.sedentaire)} kcal/jour au repos (sedentaire) et jusqu'a ${fmt(res.tdee.intense)} kcal/jour avec une activite physique intense. Le metabolisme de base seul (au repos complet) est de ${fmt(res.mifflin)} kcal/jour.`,
        },
      },
      {
        "@type": "Question",
        name: `Quelle est la difference entre Mifflin-St Jeor et Harris-Benedict pour ${poids} kg, ${age} ans ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un ${sexeLabel} de ${poids} kg a ${age} ans, la formule Mifflin-St Jeor donne ${fmt(res.mifflin)} kcal/jour et Harris-Benedict donne ${fmt(res.harris)} kcal/jour, soit un ecart de ${fmt(Math.abs(res.mifflin - res.harris))} kcal. Mifflin-St Jeor est generalement consideree plus precise pour la population actuelle.`,
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
        currentPage={`${sexe === "homme" ? "Homme" : "Femme"} ${poids} kg, ${age} ans`}
        parentPage="Calcul Metabolisme de Base"
        parentHref="/calcul-metabolisme-base"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⚡
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          BMR {sexe === "homme" ? "Homme" : "Femme"} — {poids} kg, {age} ans
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Metabolisme de base pour un{sexe === "femme" ? "e" : ""} {sexeLabel} de{" "}
        {poids} kg a {age} ans — formules Mifflin-St Jeor et Harris-Benedict.
      </p>

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="mb-8" />

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-2xl p-8 shadow-lg mb-8">
        <p className="text-white/80 mb-1">Metabolisme de base (Mifflin-St Jeor)</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmt(res.mifflin)}</p>
        <p className="text-xl font-medium mt-1">kcal / jour</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-white/70">Harris-Benedict</p>
            <p className="text-2xl font-bold">{fmt(res.harris)} kcal</p>
          </div>
          <div>
            <p className="text-white/70">Ecart formules</p>
            <p className="text-2xl font-bold">
              {fmt(Math.abs(res.mifflin - res.harris))} kcal
            </p>
          </div>
        </div>
      </div>

      {/* TDEE */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Depense energetique totale selon l&apos;activite
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Niveau d&apos;activite
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium hidden sm:table-cell">
                  Description
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  TDEE (kcal/j)
                </th>
              </tr>
            </thead>
            <tbody>
              {TDEE_ROWS.map((row) => (
                <tr key={row.key} className="border-b border-slate-100 last:border-0">
                  <td className="py-2.5 px-2 font-medium text-slate-700">
                    {row.label}
                    <span className="text-xs text-slate-400 ml-1">{row.coeff}</span>
                  </td>
                  <td className="py-2.5 px-2 text-slate-500 hidden sm:table-cell">
                    {row.description}
                  </td>
                  <td className="py-2.5 px-2 text-right font-extrabold text-orange-600">
                    {fmt(res.tdee[row.key])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison selon le poids */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          BMR {sexe} {age} ans selon le poids
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Poids</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  BMR Mifflin (kcal/j)
                </th>
              </tr>
            </thead>
            <tbody>
              {comparaisonPoids.map((row) => (
                <tr
                  key={row.poids}
                  className={`border-b border-slate-100 ${row.isCurrent ? "bg-orange-50/50" : ""}`}
                >
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-orange-600">{row.poids} kg</span>
                    ) : (
                      <a
                        href={`/calcul-metabolisme-base/${sexe}-${row.poids}kg-${age}ans`}
                        className="text-slate-700 hover:text-orange-600 transition-colors"
                      >
                        {row.poids} kg
                      </a>
                    )}
                  </td>
                  <td
                    className={`py-2.5 px-2 text-right font-bold ${
                      row.isCurrent ? "text-orange-600" : "text-slate-700"
                    }`}
                  >
                    {fmt(row.bmr)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison selon l'age */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          BMR {sexe} {poids} kg selon l&apos;age
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Age</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  BMR Mifflin (kcal/j)
                </th>
              </tr>
            </thead>
            <tbody>
              {comparaisonAge.map((row) => (
                <tr
                  key={row.age}
                  className={`border-b border-slate-100 ${row.isCurrent ? "bg-orange-50/50" : ""}`}
                >
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-orange-600">{row.age} ans</span>
                    ) : (
                      <a
                        href={`/calcul-metabolisme-base/${sexe}-${poids}kg-${row.age}ans`}
                        className="text-slate-700 hover:text-orange-600 transition-colors"
                      >
                        {row.age} ans
                      </a>
                    )}
                  </td>
                  <td
                    className={`py-2.5 px-2 text-right font-bold ${
                      row.isCurrent ? "text-orange-600" : "text-slate-700"
                    }`}
                  >
                    {fmt(row.bmr)}
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
          Metabolisme de base : {sexe} {poids} kg, {age} ans
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour un{sexe === "femme" ? "e" : ""} <strong>{sexeLabel}</strong> de{" "}
          <strong>{poids} kg</strong> a <strong>{age} ans</strong> (taille de
          reference {taille} cm), le metabolisme de base est de{" "}
          <strong>{fmt(res.mifflin)} kcal/jour</strong> selon la formule
          Mifflin-St Jeor. Ces calories representent la depense minimale
          necessaire au maintien des fonctions vitales au repos complet.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La formule Harris-Benedict, reference historique, donne{" "}
          <strong>{fmt(res.harris)} kcal/jour</strong>. L&apos;ecart entre les
          deux formules est de{" "}
          <strong>{fmt(Math.abs(res.mifflin - res.harris))} kcal</strong>. En
          pratique, Mifflin-St Jeor est recommandee car elle a ete validee sur
          des populations plus recentes et diverses.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Pour une personne moderement active (exercice 3-5 jours/semaine), le
          besoin calorique journalier total est de{" "}
          <strong>{fmt(res.tdee.modere)} kcal/jour</strong>. Ce chiffre est
          essentiel pour planifier son alimentation selon ses objectifs (perte de
          poids, maintien ou prise de masse).
        </p>
        <p className="text-xs text-slate-400 mt-6">
          Mis a jour le 8 avril 2026
        </p>
      </section>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Calculateur interactif
      </h2>
      <CalculateurMetabolisme />

      <RelatedCalculators currentSlug="/calcul-metabolisme-base" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
