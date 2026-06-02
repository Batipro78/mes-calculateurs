import type { Metadata } from "next";
import CalculVMA from "./CalculVMA";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import {
  calculerVMACooper,
  calculerAllureSelonPourcentVMA,
  formatAllure,
  fmt,
} from "./vmaCalc";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-vma" },
  title:
    "Calcul VMA - Test Cooper, zones cardiaques Karvonen, allures running",
  description:
    "Calculez votre VMA (Vitesse Maximale Aérobie) via test Cooper ou demi-Cooper. Zones de fréquence cardiaque Karvonen et allures d'entraînement running.",
  keywords:
    "calcul vma, test cooper, vameval, fc max, karvonen, allure entrainement, zones cardiaques, running, triathlon, vitesse maximale aerobie",
};

export default function Page() {
  // Tableau de référence : VMA typiques
  const vmaRefernces = [
    { vma: 12, niveau: "Débutant" },
    { vma: 13, niveau: "Débutant+" },
    { vma: 14, niveau: "Amateur" },
    { vma: 15, niveau: "Amateur" },
    { vma: 16, niveau: "Confirmé" },
    { vma: 17, niveau: "Confirmé" },
    { vma: 18, niveau: "Performant" },
    { vma: 19, niveau: "Performant" },
    { vma: 20, niveau: "Elite" },
  ];

  // Plans d'entraînement par niveau VMA
  const plansEntrainement = [
    {
      titre: "Débutant (VMA 12 km/h)",
      vma: 12,
      description:
        "Pour débuter la course à pied et progresser sereinement. 3 séances/semaine max.",
    },
    {
      titre: "Intermédiaire (VMA 15 km/h)",
      vma: 15,
      description:
        "Coureur amateur régulier. Objectif : semi-marathon ou 10km performant. 4 séances/semaine.",
    },
    {
      titre: "Confirmé (VMA 18 km/h)",
      vma: 18,
      description:
        "Coureur expérimenté visant la performance. Marathon ou trail. 5+ séances/semaine.",
    },
  ];

  const FAQ_ITEMS: FaqItem[] = [
    {
      q: "Qu'est-ce que la VMA (Vitesse Maximale Aérobie) ?",
      a: "La VMA est la vitesse minimale à laquelle le VO2max est atteint. Elle s'exprime en km/h et est la vitesse maximale qu'un coureur peut maintenir en utilisant 100% de sa capacité aérobie. Elle est fondamentale pour calibrer ses entraînements et zones d'intensité.",
    },
    {
      q: "Comment faire le test Cooper pour calculer sa VMA ?",
      a: "Le test Cooper consiste à courir 12 minutes à allure maximale sur une piste ou une zone de distance connue. La distance parcourue (en mètres) est divisée par 200 pour obtenir votre VMA en km/h. Formule : VMA = distance(m) / 200. Conseil : effectuer un échauffement de 10 min avant le test.",
    },
    {
      q: "Quelle est la différence entre la formule FC max de Tanaka et Astrand ?",
      a: "Formule Astrand : FC max = 220 - âge (classique). Formule Tanaka : FC max = 208 - 0.7 × âge (plus précise, basée sur 43 études). La formule de Tanaka est recommandée pour les athlètes, celle d'Astrand pour le grand public.",
    },
    {
      q: "Comment utiliser les zones cardiaques Karvonen ?",
      a: "Les zones de Karvonen prennent en compte la FC repos pour un calcul plus personnel. Formule : FC zone = FC repos + (FC max - FC repos) × intensité%. Les 5 zones vont de la récupération (Z1 50-60%) au VO2max (Z5 90-100%). Utilisez une montre cardio pour suivre vos séances.",
    },
  ];

  return (
    <div>
      <WebAppJsonLd name="Calcul VMA et Zones Cardiaques" />
      <Breadcrumb currentPage="Calcul VMA" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💚
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul VMA et Zones Cardiaques
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre VMA (Vitesse Maximale Aérobie) via test Cooper ou
        VAMEVAL. Déterminez vos zones de fréquence cardiaque Karvonen et
        allures d&apos;entraînement.
      </p>

      <CalculVMA />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Guide tests VMA */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Guide des tests VMA
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-3">Test Cooper (12 min)</h3>
            <p className="text-sm text-slate-600 mb-4">
              Courrez 12 minutes à allure maximale. Notez la distance en mètres.
            </p>
            <p className="text-xs font-mono text-emerald-600">
              VMA = distance / 200
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Idéal pour tous. Peut être répété régulièrement.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-3">
              Demi-Cooper (6 min)
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Courez 6 minutes à allure maximale. Double la distance mesurée.
            </p>
            <p className="text-xs font-mono text-emerald-600">
              VMA = (distance × 2) / 200
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Moins exigeant physiquement. Idéal pour débuter.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-3">VAMEVAL (1500m)</h3>
            <p className="text-sm text-slate-600 mb-4">
              Courez 1500m le plus vite possible. Notez le temps précis.
            </p>
            <p className="text-xs font-mono text-emerald-600">
              VMA = 1.5 km / temps(h)
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Test précis et court. Demande une bonne puissance.
            </p>
          </div>
        </div>
      </section>

      {/* Tableau allures */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Tableau de référence VMA et niveaux
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Consultez le tableau pour identifier votre niveau de VMA et les
          allures cibles d&apos;entraînement correspondantes.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  VMA (km/h)
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Niveau
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Endurance (65-75%)
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Seuil (85-90%)
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  VMA (100-110%)
                </th>
              </tr>
            </thead>
            <tbody>
              {vmaRefernces.map((ref) => {
                const endurance = calculerAllureSelonPourcentVMA(
                  ref.vma,
                  70
                );
                const seuil = calculerAllureSelonPourcentVMA(ref.vma, 87.5);
                const vma100 = calculerAllureSelonPourcentVMA(ref.vma, 105);
                return (
                  <tr
                    key={ref.vma}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="py-3 px-2 font-bold text-emerald-600">
                      {fmt(ref.vma, 1)}
                    </td>
                    <td className="py-3 px-2 text-slate-700">{ref.niveau}</td>
                    <td className="py-3 px-2 text-right font-mono text-slate-700">
                      {formatAllure(endurance.minKm)}
                    </td>
                    <td className="py-3 px-2 text-right font-mono text-slate-700">
                      {formatAllure(seuil.minKm)}
                    </td>
                    <td className="py-3 px-2 text-right font-mono text-slate-700">
                      {formatAllure(vma100.minKm)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Plans d'entraînement */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Plans d&apos;entraînement selon votre VMA
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {plansEntrainement.map((plan) => {
            const endurance = calculerAllureSelonPourcentVMA(plan.vma, 70);
            const seuil = calculerAllureSelonPourcentVMA(plan.vma, 87.5);
            const vma100 = calculerAllureSelonPourcentVMA(plan.vma, 105);
            return (
              <div
                key={plan.vma}
                className="bg-slate-50 rounded-xl p-6 border border-slate-200"
              >
                <h3 className="font-bold text-slate-800 mb-2">{plan.titre}</h3>
                <p className="text-sm text-slate-600 mb-4">
                  {plan.description}
                </p>
                <div className="space-y-3 text-xs">
                  <div>
                    <p className="font-semibold text-slate-700">
                      Endurance fondamentale
                    </p>
                    <p className="text-slate-600 font-mono">
                      {formatAllure(endurance.minKm)} ({fmt(endurance.kmh, 1)}{" "}
                      km/h)
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700">
                      Seuil aérobie
                    </p>
                    <p className="text-slate-600 font-mono">
                      {formatAllure(seuil.minKm)} ({fmt(seuil.kmh, 1)} km/h)
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700">VMA</p>
                    <p className="text-slate-600 font-mono">
                      {formatAllure(vma100.minKm)} ({fmt(vma100.kmh, 1)} km/h)
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-vma" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
