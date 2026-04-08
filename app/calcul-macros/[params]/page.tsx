import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { calcMacros, type Objectif } from "../macrosCalc";
import CalculateurMacros from "../CalculateurMacros";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";

const CALORIES_LIST = [1400, 1600, 1800, 2000, 2200, 2500, 2800, 3000, 3500];
const OBJECTIFS: Objectif[] = ["maintien", "perte", "prise", "seche", "cetogene"];

const OBJECTIF_LABELS: Record<Objectif, string> = {
  maintien: "Maintien",
  perte: "Perte de poids",
  prise: "Prise de masse",
  seche: "Seche",
  cetogene: "Cetogene",
};

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

function parseSlug(slug: string): { calories: number; objectif: Objectif } | null {
  const match = slug.match(/^(\d+)kcal-(maintien|perte|prise|seche|cetogene)$/);
  if (!match) return null;
  return {
    calories: parseInt(match[1]),
    objectif: match[2] as Objectif,
  };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const calories of CALORIES_LIST) {
    for (const objectif of OBJECTIFS) {
      params.push({ params: `${calories}kcal-${objectif}` });
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

  const { calories, objectif } = parsed;
  const macros = calcMacros(calories, objectif);
  const objectifLabel = OBJECTIF_LABELS[objectif];

  return {
    title: `Macros ${calories} kcal (${objectifLabel}) — ${fmt(macros.proteines.grammes)}g P / ${fmt(macros.glucides.grammes)}g G / ${fmt(macros.lipides.grammes)}g L`,
    description: `Repartition des macronutriments pour ${calories} kcal/jour en mode ${objectifLabel.toLowerCase()} : ${fmt(macros.proteines.grammes)}g de proteines, ${fmt(macros.glucides.grammes)}g de glucides, ${fmt(macros.lipides.grammes)}g de lipides. Calcul instantane et gratuit.`,
    keywords: `macros ${calories} kcal, repartition macronutriments ${objectifLabel.toLowerCase()}, proteines glucides lipides ${calories} calories`,
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

  const { calories, objectif } = parsed;
  if (!CALORIES_LIST.includes(calories) || !OBJECTIFS.includes(objectif)) notFound();

  const macros = calcMacros(calories, objectif);
  const objectifLabel = OBJECTIF_LABELS[objectif];

  // Comparaison par calories (meme objectif)
  const comparaisonCalories = CALORIES_LIST.map((cal) => {
    const m = calcMacros(cal, objectif);
    return { calories: cal, macros: m, isCurrent: cal === calories };
  });

  // Comparaison par objectif (memes calories)
  const comparaisonObjectifs = OBJECTIFS.map((obj) => {
    const m = calcMacros(calories, obj);
    return { objectif: obj, label: OBJECTIF_LABELS[obj], macros: m, isCurrent: obj === objectif };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Comment repartir ${calories} kcal en mode ${objectifLabel.toLowerCase()} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour ${calories} kcal/jour en mode ${objectifLabel.toLowerCase()}, la repartition recommandee est : ${fmt(macros.proteines.grammes)}g de proteines (${Math.round(macros.proteines.pourcentage)}%), ${fmt(macros.glucides.grammes)}g de glucides (${Math.round(macros.glucides.pourcentage)}%) et ${fmt(macros.lipides.grammes)}g de lipides (${Math.round(macros.lipides.pourcentage)}%). Les calories ajustees sont de ${fmt(macros.caloriesAjustees)} kcal.`,
        },
      },
      {
        "@type": "Question",
        name: `Combien de proteines pour ${calories} kcal par jour ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour ${calories} kcal/jour en mode ${objectifLabel.toLowerCase()}, vous avez besoin de ${fmt(macros.proteines.grammes)}g de proteines par jour, soit ${fmt(macros.proteines.calories)} kcal. Les proteines representent ${Math.round(macros.proteines.pourcentage)}% de votre apport calorique total.`,
        },
      },
      {
        "@type": "Question",
        name: `Quel regime alimentaire pour ${calories} kcal en ${objectifLabel.toLowerCase()} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A ${calories} kcal/jour pour un objectif ${objectifLabel.toLowerCase()}, repartissez vos repas en 3 prises : environ ${fmt(macros.proteines.grammes / 3)}g de proteines, ${fmt(macros.glucides.grammes / 3)}g de glucides et ${fmt(macros.lipides.grammes / 3)}g de lipides par repas, soit ${fmt(macros.caloriesAjustees / 3)} kcal par repas.`,
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mes-calculateurs.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Calcul Macros", item: "https://mes-calculateurs.vercel.app/calcul-macros" },
      { "@type": "ListItem", position: 3, name: `${calories} kcal — ${objectifLabel}` },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <Breadcrumb
        currentPage={`${calories} kcal — ${objectifLabel}`}
        parentPage="Calcul Macros"
        parentHref="/calcul-macros"
        lastUpdated="8 avril 2026"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🥗
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Macros {calories} kcal — {objectifLabel}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Repartition des macronutriments pour {calories} kcal/jour en mode {objectifLabel.toLowerCase()}.
        Mis a jour le 8 avril 2026.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg mb-8">
        <p className="text-white/80 mb-1">Calories ajustees ({objectifLabel})</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmt(macros.caloriesAjustees)} kcal</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-white/70 text-sm">Proteines</p>
            <p className="text-2xl font-extrabold">{fmt(macros.proteines.grammes)}g</p>
            <p className="text-xs text-white/60">{Math.round(macros.proteines.pourcentage)}% — {fmt(macros.proteines.calories)} kcal</p>
          </div>
          <div>
            <p className="text-white/70 text-sm">Glucides</p>
            <p className="text-2xl font-extrabold">{fmt(macros.glucides.grammes)}g</p>
            <p className="text-xs text-white/60">{Math.round(macros.glucides.pourcentage)}% — {fmt(macros.glucides.calories)} kcal</p>
          </div>
          <div>
            <p className="text-white/70 text-sm">Lipides</p>
            <p className="text-2xl font-extrabold">{fmt(macros.lipides.grammes)}g</p>
            <p className="text-xs text-white/60">{Math.round(macros.lipides.pourcentage)}% — {fmt(macros.lipides.calories)} kcal</p>
          </div>
        </div>
      </div>

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="mb-8" />

      {/* Comparaison par objectif */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Repartition selon l&apos;objectif pour {calories} kcal
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Objectif</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Proteines</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Glucides</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Lipides</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonObjectifs.map((row) => (
                <tr key={row.objectif} className={`border-b border-slate-100 ${row.isCurrent ? "bg-violet-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-violet-600">{row.label}</span>
                    ) : (
                      <a
                        href={`/calcul-macros/${calories}kcal-${row.objectif}`}
                        className="text-slate-700 hover:text-violet-600 transition-colors"
                      >
                        {row.label}
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-blue-600" : "text-slate-600"}`}>
                    {fmt(row.macros.proteines.grammes)}g
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-green-600" : "text-slate-600"}`}>
                    {fmt(row.macros.glucides.grammes)}g
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-orange-600" : "text-slate-600"}`}>
                    {fmt(row.macros.lipides.grammes)}g
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-violet-600" : "text-slate-700"}`}>
                    {fmt(row.macros.caloriesAjustees)} kcal
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par calories */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Repartition selon les calories en mode {objectifLabel.toLowerCase()}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Calories</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Proteines</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Glucides</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Lipides</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Total ajuste</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonCalories.map((row) => (
                <tr key={row.calories} className={`border-b border-slate-100 ${row.isCurrent ? "bg-violet-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-violet-600">{row.calories} kcal</span>
                    ) : (
                      <a
                        href={`/calcul-macros/${row.calories}kcal-${objectif}`}
                        className="text-slate-700 hover:text-violet-600 transition-colors"
                      >
                        {row.calories} kcal
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-blue-600" : "text-slate-600"}`}>
                    {fmt(row.macros.proteines.grammes)}g
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-green-600" : "text-slate-600"}`}>
                    {fmt(row.macros.glucides.grammes)}g
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-orange-600" : "text-slate-600"}`}>
                    {fmt(row.macros.lipides.grammes)}g
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-violet-600" : "text-slate-700"}`}>
                    {fmt(row.macros.caloriesAjustees)} kcal
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
          {fmt(macros.proteines.grammes)}g de proteines, {fmt(macros.glucides.grammes)}g de glucides, {fmt(macros.lipides.grammes)}g de lipides
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour un apport de <strong>{calories} kcal/jour</strong> avec un objectif{" "}
          <strong>{objectifLabel.toLowerCase()}</strong>, les macronutriments ajustes sont calcules sur{" "}
          <strong>{fmt(macros.caloriesAjustees)} kcal</strong>
          {objectif === "perte" && " (deficit de 400 kcal applique)"}
          {objectif === "prise" && " (surplus de 300 kcal applique)"}.
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li>
            <strong>Proteines</strong> : {fmt(macros.proteines.grammes)}g — {Math.round(macros.proteines.pourcentage)}% des calories ({fmt(macros.proteines.calories)} kcal) — 4 kcal/g
          </li>
          <li>
            <strong>Glucides</strong> : {fmt(macros.glucides.grammes)}g — {Math.round(macros.glucides.pourcentage)}% des calories ({fmt(macros.glucides.calories)} kcal) — 4 kcal/g
          </li>
          <li>
            <strong>Lipides</strong> : {fmt(macros.lipides.grammes)}g — {Math.round(macros.lipides.pourcentage)}% des calories ({fmt(macros.lipides.calories)} kcal) — 9 kcal/g
          </li>
        </ul>
        <p className="text-slate-600 leading-relaxed">
          Repartis sur 3 repas, cela represente{" "}
          <strong>{fmt(macros.proteines.grammes / 3)}g de proteines</strong>,{" "}
          <strong>{fmt(macros.glucides.grammes / 3)}g de glucides</strong> et{" "}
          <strong>{fmt(macros.lipides.grammes / 3)}g de lipides</strong> par repas, soit{" "}
          <strong>{fmt(macros.caloriesAjustees / 3)} kcal par repas</strong>.
        </p>
        <p className="text-xs text-slate-400 mt-4">Mis a jour le 8 avril 2026.</p>
      </section>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif</h2>
      <CalculateurMacros />

      <AdSlot adSlot="0987654321" adFormat="horizontal" className="my-8" />

      <RelatedCalculators currentSlug="/calcul-macros" />
    </div>
  );
}
