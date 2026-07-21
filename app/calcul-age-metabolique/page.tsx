import type { Metadata } from "next";
import CalculateurAgeMetabolique from "./CalculateurAgeMetabolique";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-age-metabolique" },
  title: "Calcul Age Metabolique 2026 - Age Biologique Gratuit",
  description:
    "Calculez votre age metabolique gratuitement. Comparez votre metabolisme de base reel au metabolisme de reference pour votre age et sexe. Resultats instantanes avec conseils personnalises.",
  keywords:
    "calcul age metabolique, age biologique, age metabolique, metabolisme de base, vieillissement metabolique, BMR age, metabolisme age, calculateur age metabolique, test age metabolique",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Qu'est-ce que l'age metabolique ?",
    a: "L'age metabolique est une estimation de l'age de votre corps base sur votre metabolisme de base (BMR). Si votre BMR est egal a celui d'une personne plus jeune que vous, votre age metabolique est inferieur a votre age reel — votre corps fonctionne de maniere plus efficace. A l'inverse, un BMR plus bas que la reference indique un vieillissement metabolique accelere.",
  },
  {
    q: "Comment reduire son age metabolique ?",
    a: "Pour reduire son age metabolique, il faut augmenter son metabolisme de base : pratiquer de la musculation pour developper la masse musculaire, adopter une alimentation riche en proteines, faire de l'exercice regulier (objectif 150 min/semaine), reduire la graisse abdominale, arreter le tabac, limiter l'alcool et dormir 7 a 9 heures par nuit.",
  },
  {
    q: "Quel est un bon age metabolique ?",
    a: "Un age metabolique inferieur de 5 ans ou plus a votre age reel est considere comme excellent. Entre -4 et -1 an, c'est bon. Un ecart de 0 a 2 ans est normal. Au-dela de 3 ans de plus que votre age reel, des ajustements du mode de vie sont recommandes. Au-dela de 7 ans, une consultation medicale est conseillee.",
  },
  {
    q: "L'age metabolique et l'IMC sont-ils la meme chose ?",
    a: "Non, ce sont deux indicateurs differents. L'IMC mesure uniquement le rapport poids/taille sans distinguer masse musculaire et graisse. L'age metabolique est base sur le metabolisme de base (BMR) et reflète la composition corporelle réelle. Une personne musclée peut avoir un IMC élevé mais un excellent age metabolique.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Age Metabolique" />
      <Breadcrumb currentPage="Calcul Age Metabolique" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🧬
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Age Metabolique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Decouvrez votre age biologique en comparant votre metabolisme de base a
        la reference pour votre age et sexe. Facteurs de style de vie inclus.
      </p>

      <CalculateurAgeMetabolique />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Qu&apos;est-ce que l&apos;age metabolique ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;<strong>age metabolique</strong> (ou age biologique) est une estimation de
          l&apos;age apparent de votre corps base sur votre{" "}
          <strong>metabolisme de base</strong> (BMR — Basal Metabolic Rate). Il
          compare votre depense energetique au repos a celle d&apos;une personne de
          meme sexe avec un poids ideal (IMC 22) pour votre age.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Un <strong>age metabolique inferieur</strong> a votre age reel signifie que votre
          metabolisme est plus rapide et efficace que la moyenne — votre corps
          fonctionne comme celui d&apos;une personne plus jeune. Un age metabolique
          superieur indique un vieillissement metabolique accelere qui peut etre
          ameliore par des changements de style de vie.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Facteurs qui influencent l&apos;age metabolique
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
            <p className="font-semibold text-violet-700 text-sm">Masse musculaire</p>
            <p className="text-xs text-violet-600 mt-1">
              Le muscle brule ~13 kcal/kg/jour au repos. Plus vous avez de muscle,
              plus votre metabolisme est actif et jeune.
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="font-semibold text-blue-700 text-sm">Activite physique</p>
            <p className="text-xs text-blue-600 mt-1">
              L&apos;exercice regulier, notamment la musculation, peut rajeunir
              l&apos;age metabolique de 3 a 5 ans.
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">Composition corporelle</p>
            <p className="text-xs text-amber-600 mt-1">
              La graisse abdominale (tour de taille) est un indicateur cle du
              vieillissement metabolique.
            </p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <p className="font-semibold text-red-700 text-sm">Tabac et alcool</p>
            <p className="text-xs text-red-600 mt-1">
              Le tabac vieillit metaboliquement de 2 ans, l&apos;alcool regulier d&apos;1 an
              en moyenne.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Age metabolique moyen par tranche d&apos;age
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Tranche d&apos;age</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Objectif sante</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">BMR de reference (homme)</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">BMR de reference (femme)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">20–30 ans</td>
                <td className="py-2.5 px-2 text-slate-600">Age metabolique &le; age reel</td>
                <td className="py-2.5 px-2 text-slate-600">~1 780 kcal</td>
                <td className="py-2.5 px-2 text-slate-600">~1 450 kcal</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">30–40 ans</td>
                <td className="py-2.5 px-2 text-slate-600">Age metabolique &le; age reel</td>
                <td className="py-2.5 px-2 text-slate-600">~1 730 kcal</td>
                <td className="py-2.5 px-2 text-slate-600">~1 400 kcal</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">40–50 ans</td>
                <td className="py-2.5 px-2 text-slate-600">Ecart &le; +2 ans</td>
                <td className="py-2.5 px-2 text-slate-600">~1 680 kcal</td>
                <td className="py-2.5 px-2 text-slate-600">~1 350 kcal</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">50–60 ans</td>
                <td className="py-2.5 px-2 text-slate-600">Ecart &le; +3 ans</td>
                <td className="py-2.5 px-2 text-slate-600">~1 630 kcal</td>
                <td className="py-2.5 px-2 text-slate-600">~1 300 kcal</td>
              </tr>
              <tr>
                <td className="py-2.5 px-2 font-medium text-slate-700">60–70 ans</td>
                <td className="py-2.5 px-2 text-slate-600">Ecart &le; +4 ans</td>
                <td className="py-2.5 px-2 text-slate-600">~1 580 kcal</td>
                <td className="py-2.5 px-2 text-slate-600">~1 250 kcal</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Comment ameliorer son age metabolique ?
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1.5 mb-4">
          <li>
            <strong>Musculation</strong> : 2 a 3 seances par semaine augmentent
            la masse musculaire et accelarent le metabolisme au repos
          </li>
          <li>
            <strong>Proteines</strong> : viser 1,6 a 2 g/kg/jour pour maintenir et
            developper la masse musculaire
          </li>
          <li>
            <strong>Reduction du tour de taille</strong> : la graisse viscerale est
            metaboliquement active et accelere le vieillissement
          </li>
          <li>
            <strong>Sommeil</strong> : 7 a 9 heures par nuit optimisent les hormones
            anabolisantes (GH, testosterone)
          </li>
          <li>
            <strong>Hydratation</strong> : boire 1,5 a 2 litres d&apos;eau par jour
            maintient l&apos;efficacite des reactions metaboliques
          </li>
          <li>
            <strong>Arret du tabac</strong> : recuperation partielle du metabolisme
            en quelques semaines apres l&apos;arret
          </li>
        </ul>

        <p className="text-xs text-slate-400 mt-6">
          Mis a jour le 8 avril 2026
        </p>
      </section>

      <HowToJsonLd
        name="Calculer son âge metabolique"
        steps={[
          { name: "Saisir les données corporelles", text: "Renseigner le sexe, l'âge, le poids en kg, la taille en cm et le tour de taille en cm. Ces valeurs servent à calculer le metabolisme de base (BMR) par la formule Mifflin-St Jeor." },
          { name: "Calculer le BMR par la formule Mifflin-St Jeor", text: "Homme : BMR = 10 x poids + 6.25 x taille - 5 x âge + 5. Femme : BMR = 10 x poids + 6.25 x taille - 5 x âge - 161. Le BMR représente la dépense energetique au repos en kcal par jour." },
          { name: "Ajuster selon le mode de vie", text: "Un coefficient correctif est applique selon le niveau d'activité physique (sedentaire à intense), le tour de taille, la consommation de tabac (+2 ans metaboliques) et d'alcool regulier (+1 an)." },
          { name: "Comparer au BMR de référence et lire l'âge metabolique", text: "Le BMR calcule est compare au BMR d'une personne de même sexe et même âge ayant un IMC de 22. L'âge metabolique correspond à l'âge pour lequel ce BMR de référence est le plus proche de votre BMR réel." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentSlug="/calcul-age-metabolique" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
