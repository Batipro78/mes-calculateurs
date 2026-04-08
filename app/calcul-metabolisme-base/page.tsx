import type { Metadata } from "next";
import CalculateurMetabolisme from "./CalculateurMetabolisme";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Calcul Metabolisme de Base 2026 - BMR Gratuit (Mifflin-St Jeor)",
  description:
    "Calculez votre metabolisme de base (BMR) gratuitement. Formules Mifflin-St Jeor et Harris-Benedict, TDEE selon votre activite physique. Resultats instantanes pour hommes et femmes.",
  keywords:
    "calcul metabolisme de base, BMR, metabolisme basal, Mifflin-St Jeor, Harris-Benedict, depense energetique repos, DER, TDEE, calories repos, besoins energetiques",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Metabolisme de Base" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment calculer son metabolisme de base ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le metabolisme de base (BMR) se calcule avec la formule Mifflin-St Jeor : pour un homme, BMR = 10 x poids(kg) + 6,25 x taille(cm) - 5 x age + 5. Pour une femme, BMR = 10 x poids(kg) + 6,25 x taille(cm) - 5 x age - 161. C'est la formule la plus precise selon l'Academy of Nutrition and Dietetics.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la difference entre metabolisme de base et TDEE ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le metabolisme de base (BMR) represente les calories brulees au repos pour maintenir les fonctions vitales (respiration, circulation, temperature). Le TDEE (Total Daily Energy Expenditure) est le BMR multiplie par un coefficient d'activite physique. Par exemple, une personne sedentaire multiplie son BMR par 1,2.",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le metabolisme de base normal pour un homme et une femme ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "En moyenne, le metabolisme de base est de 1 600 a 2 000 kcal/jour pour un homme adulte et de 1 200 a 1 600 kcal/jour pour une femme adulte. Ces valeurs varient selon le poids, la taille, l'age et la composition corporelle. Les sportifs ont generalement un BMR plus eleve grace a leur masse musculaire.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul Metabolisme de Base" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⚡
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Metabolisme de Base 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre BMR (metabolisme basal) avec les formules Mifflin-St Jeor
        et Harris-Benedict, et estimez vos besoins energetiques journaliers.
      </p>

      <CalculateurMetabolisme />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Qu&apos;est-ce que le metabolisme de base (BMR) ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>metabolisme de base</strong> (BMR — Basal Metabolic Rate, ou DER —
          Depense Energetique de Repos) represente la quantite de{" "}
          <strong>calories</strong> que votre corps brule au repos pour maintenir
          ses fonctions vitales : respiration, circulation sanguine, regulation de la
          temperature, fonctionnement des organes.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Il constitue generalement <strong>60 a 75 %</strong> de la depense
          energetique totale quotidienne (TDEE). Connaitre son BMR est
          indispensable pour adapter son alimentation selon ses objectifs de
          sante ou de composition corporelle.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Formule Mifflin-St Jeor (recommandee)
        </h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Publiee en 1990, la formule <strong>Mifflin-St Jeor</strong> est
          aujourd&apos;hui consideree comme la plus precise. Elle est
          recommandee par l&apos;Academy of Nutrition and Dietetics pour
          estimer le BMR en pratique clinique.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700 space-y-2">
          <p>
            <strong>Homme</strong> : BMR = 10 x poids(kg) + 6,25 x taille(cm) - 5
            x age + 5
          </p>
          <p>
            <strong>Femme</strong> : BMR = 10 x poids(kg) + 6,25 x taille(cm) - 5
            x age - 161
          </p>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Formule Harris-Benedict (reference historique)
        </h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          La formule <strong>Harris-Benedict</strong>, etablie en 1919 puis
          revisee en 1984, reste une reference internationale. Elle tend a
          surestimer legerement le BMR par rapport a Mifflin-St Jeor.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700 space-y-2">
          <p>
            <strong>Homme</strong> : BMR = 88,362 + 13,397 x poids + 4,799 x taille - 5,677 x age
          </p>
          <p>
            <strong>Femme</strong> : BMR = 447,593 + 9,247 x poids + 3,098 x taille - 4,330 x age
          </p>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Metabolisme de base selon l&apos;age et le sexe
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Age
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Homme (70 kg, 175 cm)
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Femme (60 kg, 165 cm)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">20 ans</td>
                <td className="py-2.5 px-2 text-right text-slate-600">1 830 kcal</td>
                <td className="py-2.5 px-2 text-right text-slate-600">1 431 kcal</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">30 ans</td>
                <td className="py-2.5 px-2 text-right text-slate-600">1 780 kcal</td>
                <td className="py-2.5 px-2 text-right text-slate-600">1 381 kcal</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">40 ans</td>
                <td className="py-2.5 px-2 text-right text-slate-600">1 730 kcal</td>
                <td className="py-2.5 px-2 text-right text-slate-600">1 331 kcal</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">50 ans</td>
                <td className="py-2.5 px-2 text-right text-slate-600">1 680 kcal</td>
                <td className="py-2.5 px-2 text-right text-slate-600">1 281 kcal</td>
              </tr>
              <tr>
                <td className="py-2.5 px-2 font-medium text-slate-700">60 ans</td>
                <td className="py-2.5 px-2 text-right text-slate-600">1 630 kcal</td>
                <td className="py-2.5 px-2 text-right text-slate-600">1 231 kcal</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Facteurs qui influencent le metabolisme de base
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1.5 mb-4">
          <li>
            <strong>Masse musculaire</strong> : le muscle consomme plus de calories
            au repos que la graisse
          </li>
          <li>
            <strong>Age</strong> : le BMR diminue d&apos;environ 1 a 2 % par
            decennie apres 30 ans
          </li>
          <li>
            <strong>Sexe</strong> : les hommes ont en general un BMR plus eleve
            (plus de masse musculaire)
          </li>
          <li>
            <strong>Genetique</strong> : certaines personnes ont naturellement un
            metabolisme plus rapide ou lent
          </li>
          <li>
            <strong>Hormones</strong> : la thyroide joue un role majeur dans la
            regulation du metabolisme
          </li>
          <li>
            <strong>Temperature</strong> : un environnement froid augmente le BMR
            pour maintenir la temperature corporelle
          </li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Comment augmenter son metabolisme de base ?
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="font-semibold text-orange-700 text-sm">
              Musculation
            </p>
            <p className="text-xs text-orange-600 mt-1">
              Augmenter la masse musculaire est le moyen le plus efficace.
              1 kg de muscle brule ~13 kcal/jour de plus au repos.
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="font-semibold text-blue-700 text-sm">
              Proteines alimentaires
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Les proteines ont un effet thermique eleve (25-30 %) contre
              5-10 % pour les glucides et 0-3 % pour les lipides.
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="font-semibold text-green-700 text-sm">
              Sommeil de qualite
            </p>
            <p className="text-xs text-green-600 mt-1">
              Le manque de sommeil perturbe les hormones qui regulen
              l&apos;appetit (leptine, ghrelline) et ralentit le metabolisme.
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <p className="font-semibold text-purple-700 text-sm">
              NEAT (activite non-sportive)
            </p>
            <p className="text-xs text-purple-600 mt-1">
              Marcher, se lever, gesticuler : le NEAT peut representer
              100 a 800 kcal/jour supplementaires.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-6">
          Mis a jour le 8 avril 2026
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-metabolisme-base" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
