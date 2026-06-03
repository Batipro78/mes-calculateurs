import type { Metadata } from "next";
import CalculateurCalories from "./CalculateurCalories";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-calories" },
  title: "Calcul Calories 2026 - Besoin Calorique Journalier (TDEE) gratuit",
  description:
    "Calculez vos besoins caloriques journaliers (TDEE) gratuitement. Metabolisme de base, objectifs perte/prise de poids, repartition macronutriments. Formule Mifflin-St Jeor.",
  keywords:
    "calcul calories, besoin calorique journalier, TDEE, metabolisme de base, calories par jour, deficit calorique, perte de poids, prise de masse, macronutriments",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment calculer ses besoins caloriques journaliers ?",
    a: "Le TDEE se calcule en multipliant le metabolisme de base par un coefficient d'activite. Formule Mifflin-St Jeor : MB homme = 10 x poids + 6,25 x taille - 5 x age + 5 ; MB femme = 10 x poids + 6,25 x taille - 5 x age - 161. Puis TDEE = MB x coefficient d'activite.",
  },
  {
    q: "Combien de calories par jour pour maigrir ?",
    a: "Creez un deficit de 250 a 500 kcal sous votre TDEE. Un deficit de 500 kcal/jour fait perdre environ 0,5 kg par semaine. Ne descendez pas sous 1 200 kcal/jour (femmes) ou 1 500 kcal/jour (hommes).",
  },
  {
    q: "Quelle difference entre metabolisme de base et TDEE ?",
    a: "Le metabolisme de base est l'energie brulee au repos pour les fonctions vitales. Le TDEE est ce metabolisme multiplie par votre coefficient d'activite : il represente le total de calories brulees dans une journee.",
  },
  {
    q: "Combien de calories pour prendre du muscle ?",
    a: "Visez un surplus de 250 a 500 kcal au-dessus de votre TDEE, avec un apport en proteines de 1,6 a 2,2 g par kilo de poids de corps, et un entrainement en resistance regulier.",
  },
  {
    q: "Faut-il compter ses calories tous les jours ?",
    a: "Pas forcement. Compter precisement pendant 1 a 2 semaines aide a prendre des reperes. Ensuite, beaucoup de personnes maintiennent leurs resultats avec de simples habitudes, sans tout peser.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Calories Journalier" />
      <Breadcrumb currentPage="Calcul Calories" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🔥
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Calories 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez vos besoins caloriques journaliers (TDEE), votre metabolisme de
        base et vos objectifs de poids.
      </p>

      <CalculateurCalories />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Qu&apos;est-ce que le TDEE (besoin calorique journalier) ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>TDEE</strong> (Total Daily Energy Expenditure) represente le
          nombre total de <strong>calories</strong> que votre corps brule en une
          journee. Il prend en compte votre <strong>metabolisme de base</strong>{" "}
          (les calories necessaires au repos) et votre{" "}
          <strong>niveau d&apos;activite physique</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Connaitre votre TDEE est essentiel pour atteindre vos objectifs : perdre
          du poids (<strong>deficit calorique</strong>), en prendre (
          <strong>surplus calorique</strong>) ou maintenir votre poids actuel.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          La formule Mifflin-St Jeor
        </h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Publiee en 1990, la formule <strong>Mifflin-St Jeor</strong> est
          consideree comme la plus precise par l&apos;Academy of Nutrition and
          Dietetics. Elle remplace l&apos;ancienne formule de Harris-Benedict.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700 space-y-2">
          <p>
            <strong>Homme</strong> : MB = 10 x poids(kg) + 6,25 x taille(cm) - 5
            x age + 5
          </p>
          <p>
            <strong>Femme</strong> : MB = 10 x poids(kg) + 6,25 x taille(cm) - 5
            x age - 161
          </p>
          <p className="text-slate-500 pt-2 border-t border-slate-200">
            TDEE = MB x coefficient d&apos;activite
          </p>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Coefficients d&apos;activite
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Niveau</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Description</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Coefficient</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Sedentaire</td>
                <td className="py-2.5 px-2 text-slate-500">Peu ou pas d&apos;exercice</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">1,2</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Legerement actif</td>
                <td className="py-2.5 px-2 text-slate-500">1-3 jours/semaine</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">1,375</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Moderement actif</td>
                <td className="py-2.5 px-2 text-slate-500">3-5 jours/semaine</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">1,55</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Tres actif</td>
                <td className="py-2.5 px-2 text-slate-500">6-7 jours/semaine</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">1,725</td>
              </tr>
              <tr>
                <td className="py-2.5 px-2 font-medium text-slate-700">Extremement actif</td>
                <td className="py-2.5 px-2 text-slate-500">Athlete, travail physique</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">1,9</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Exemples de besoins caloriques
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="font-semibold text-blue-700 text-sm">Homme 30 ans, 80 kg, 180 cm</p>
            <p className="text-xs text-blue-600 mt-1">Sedentaire : ~2 050 kcal/jour</p>
            <p className="text-xs text-blue-600">Actif : ~2 650 kcal/jour</p>
          </div>
          <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
            <p className="font-semibold text-pink-700 text-sm">Femme 25 ans, 60 kg, 165 cm</p>
            <p className="text-xs text-pink-600 mt-1">Sedentaire : ~1 600 kcal/jour</p>
            <p className="text-xs text-pink-600">Active : ~2 050 kcal/jour</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Comment perdre du poids avec le TDEE ?
        </h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Pour perdre du poids, vous devez manger <strong>moins de calories que votre TDEE</strong>.
          C&apos;est le principe du <strong>deficit calorique</strong>.
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>-250 kcal/jour</strong> = perte d&apos;environ 0,25 kg/semaine (perte lente et durable)</li>
          <li><strong>-500 kcal/jour</strong> = perte d&apos;environ 0,5 kg/semaine (recommande)</li>
          <li>Ne jamais descendre en dessous de <strong>1 200 kcal</strong> (femmes) ou <strong>1 500 kcal</strong> (hommes)</li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Repartition des macronutriments
        </h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Au-dela des calories totales, la repartition des <strong>macronutriments</strong>
          (proteines, lipides, glucides) est importante :
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
            <p className="font-semibold text-blue-700 text-sm">Proteines</p>
            <p className="text-xs text-blue-500 mt-0.5">1,6 a 2,2 g/kg de poids</p>
            <p className="text-xs text-blue-500">4 kcal par gramme</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">Lipides</p>
            <p className="text-xs text-amber-500 mt-0.5">25 a 35% des calories</p>
            <p className="text-xs text-amber-500">9 kcal par gramme</p>
          </div>
          <div className="bg-green-50 rounded-xl p-3 border border-green-100">
            <p className="font-semibold text-green-700 text-sm">Glucides</p>
            <p className="text-xs text-green-500 mt-0.5">Le reste des calories</p>
            <p className="text-xs text-green-500">4 kcal par gramme</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Calcul Calories vs Calcul IMC
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Le <a href="/calcul-imc" className="text-blue-600 hover:underline font-medium">calcul de l&apos;IMC</a> vous
          indique si votre poids est adapte a votre taille. Le calcul des calories vous dit <strong>combien manger</strong> pour
          atteindre ou maintenir un poids sain. Les deux outils sont complementaires : commencez par votre IMC pour savoir ou vous
          en etes, puis utilisez le calcul de calories pour definir votre plan alimentaire.
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode={`Le besoin calorique journalier (TDEE) est estime a partir du metabolisme de base (formule de Mifflin-St Jeor) multiplie par un facteur d'activite. Les references nutritionnelles sont celles de l'ANSES.`}
        sources={[
          { label: "ANSES - References nutritionnelles", url: "https://www.anses.fr" },
          { label: "Manger-Bouger (Sante publique France)", url: "https://www.mangerbouger.fr" },
        ]}
      />


      <RelatedCalculators currentSlug="/calcul-calories" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
