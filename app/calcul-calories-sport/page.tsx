import type { Metadata } from "next";
import CalculCaloriesSport from "./CalculCaloriesSport";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";
import { getTopSports, SPORTS } from "./caloriesSportCalc";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-calories-sport" },
  title: "Calcul calories brûlées par sport - 40+ activités",
  description:
    "Calculez les calories brûlées selon le sport, votre poids et la durée. Course, vélo, natation, musculation, sports collectifs, yoga, CrossFit... Formule METs. Outil gratuit.",
  keywords:
    "calories brulees sport, calcul calories sport, METs, depense calorique, course calories, velo calories, natation calories, musculation calories, perte de poids",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Qu'est-ce qu'un MET ?",
    a: "Un MET (Metabolic Equivalent of Task) est une unité qui mesure l'intensite d'une activite physique. 1 MET = depense calorique au repos. Par exemple, 5 METs signifie que vous consommez 5 fois plus d'energie qu'au repos. Les METs permettent de comparer l'intensite de differents sports de maniere objective.",
  },
  {
    q: "Quel sport brule le plus de calories ?",
    a: "Le sprint brule le plus de calories avec 23 METs, suivi du papillon en natation (13.8 METs), de l'aviron intense (12 METs), et du velo route 30 km/h (12 METs). Cependant, la durabilite compte aussi : un sport de 60 minutes a intensite moderee peut bruler autant ou plus qu'un effort court et intense.",
  },
  {
    q: "Combien de calories pour 1 km de course ?",
    a: "Pour 1 km de course a 10 km/h (6 minutes), une personne de 70 kg brule environ 70 kcal. Pour une course plus rapide (15 km/h), ce nombre augmente a 95 kcal/km. La depense calorique par km augmente avec la vitesse et le poids corporel.",
  },
  {
    q: "Comment maigrir avec le sport ?",
    a: "Pour maigrir, vous devez creer un deficit calorique : bruler plus que vous ne consommez. Les sports a intensite moderee-elevee (course, velo, natation, CrossFit) brulent beaucoup de calories. Combinez l'exercice avec une alimentation saine et equilibree. Un deficit de 500 kcal/jour permet de perdre ~500g par semaine.",
  },
];

export default function Page() {
  const topSports = getTopSports(70, 60); // Top 10 pour 70kg, 1h

  return (
    <div>
      <WebAppJsonLd name="Calcul calories brûlées par sport" />
      <Breadcrumb currentPage="Calcul calories brûlées par sport" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🔥
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul calories brûlées par sport
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Découvrez combien de calories vous brûlez avec votre activité favorite. 40+ sports disponibles.
      </p>

      <CalculCaloriesSport />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Top 10 sports */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          🏆 Top 10 sports qui brûlent le plus (1h, 70kg)
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Classement des sports par calories brûlées en 1 heure pour une personne de 70 kg. Plus haut = plus intense.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Rang
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Sport
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  METs
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Calories/h
                </th>
              </tr>
            </thead>
            <tbody>
              {topSports.map((sport, idx) => (
                <tr
                  key={sport.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="py-3 px-2 font-bold text-slate-700">#{idx + 1}</td>
                  <td className="py-3 px-2 text-slate-700">
                    {sport.emoji} {sport.nom}
                  </td>
                  <td className="py-3 px-2 text-right font-medium text-slate-600">
                    {sport.mets}
                  </td>
                  <td className="py-3 px-2 text-right font-bold text-orange-600">
                    {Math.round(sport.calories)} kcal
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Comment utiliser les METs */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment utiliser les METs ?
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Les METs (Metabolic Equivalent of Task) permettent de normaliser la depense calorique par poids corporel et duree. La formule est simple :
        </p>
        <div className="bg-slate-50 rounded-xl p-6 mb-6">
          <p className="text-center text-lg font-mono font-bold text-slate-800">
            Calories = METs × Poids (kg) × Durée (heures)
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-bold text-slate-800 mb-2">Exemple</h3>
            <p className="text-sm text-slate-600">
              <strong>Course 10 km/h</strong> (10 METs) pendant <strong>30 min</strong> pour une personne de <strong>70 kg</strong>
            </p>
            <p className="text-sm font-mono mt-2 text-slate-700">
              10 × 70 × 0,5 = <strong>350 kcal</strong>
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-bold text-slate-800 mb-2">Intensité légère</h3>
            <p className="text-sm text-slate-600">
              2 - 3 METs (marche, yoga doux, stretching)
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-bold text-slate-800 mb-2">Intensité élevée</h3>
            <p className="text-sm text-slate-600">
              10+ METs (sprint, sports collectifs, CrossFit)
            </p>
          </div>
        </div>
      </section>

      {/* Sport et perte de poids */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Sport et perte de poids
        </h2>
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>
            <strong>Créer un déficit calorique</strong> est la clé pour perdre du poids. Vous devez brûler plus que vous ne consommez. Un déficit de 500 kcal par jour (soit 3 500 kcal par semaine) permet une perte de poids stable d&apos;environ 500g par semaine.
          </p>
          <p>
            <strong>Combiner sport + nutrition :</strong> L&apos;exercice brûle les calories, mais l&apos;alimentation en contrôle l&apos;apport. Une personne qui court 1h (600 kcal) mais mange 800 kcal de trop n&apos;aura pas de déficit.
          </p>
          <p>
            <strong>Fréquence recommandée :</strong> Au moins 150 min/semaine d&apos;activité modérée (marche, vélo loisir) ou 75 min/semaine d&apos;activité intense (course, CrossFit, sports collectifs).
          </p>
          <p>
            <strong>Répartir l&apos;effort :</strong> Pas besoin de faire 1h tous les jours. 30 min × 5 jours est plus durable que 2h une fois par semaine. La régularité compte plus que l&apos;intensité à court terme.
          </p>
        </div>
      </section>

      {/* METs reference table */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Tableau METs complet
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Référence des METs pour tous les sports disponibles dans le calculateur. Ces valeurs proviennent du Compendium of Physical Activities 2024.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Sport
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Catégorie
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  METs
                </th>
              </tr>
            </thead>
            <tbody>
              {SPORTS.map((sport) => (
                <tr
                  key={sport.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="py-3 px-2 text-slate-700">
                    {sport.emoji} {sport.nom}
                  </td>
                  <td className="py-3 px-2 text-slate-500 text-xs">
                    {sport.categorie.charAt(0).toUpperCase() + sport.categorie.slice(1)}
                  </td>
                  <td className="py-3 px-2 text-right font-bold text-slate-800">
                    {sport.mets}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <HowToJsonLd
        name="Calculer les calories brulees par une activité sportive"
        steps={[
          { name: "Choisir le sport et son coefficient MET", text: "Sélectionner l'activité parmi 40+ sports. Chaque sport est associe à une valeur MET : course 10 km/h = 10 METs, velo route 30 km/h = 12 METs, yoga = 2.5 METs, sprint = 23 METs." },
          { name: "Saisir le poids corporel et la durée", text: "Entrer le poids en kg et la durée en minutes. La formule s'applique : Calories = METs x poids (kg) x durée (heures). Exemple : 10 METs x 70 kg x 0.5h = 350 kcal." },
          { name: "Évaluer le deficit calorique et l'impact sur le poids", text: "Comparer les calories brulees au deficit journalier cible. Un deficit de 500 kcal/jour entraine une perte d'environ 500 g par semaine. Le cumul de plusieurs activités est possible en mode multi-sports." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentSlug="/calcul-calories-sport" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
