import type { Metadata } from "next";
import CalculAllureNatation from "./CalculAllureNatation";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";
import {
  formatAllureNatation,
  predireTempsNatation,
  allureVersVitesse,
  ALLURES_REFERENCE,
} from "./natationCalc";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-allure-natation" },
  title:
    "Calcul Allure Natation + SWOLF - Prédictions 200m à Ironman 3800m",
  description:
    "Convertissez votre allure natation (min/100m ↔ km/h), calculez votre SWOLF score et prédisez vos temps pour piscine, triathlon et Ironman.",
  keywords:
    "allure natation, calcul vitesse nageur, swolf score, prediction ironman, allure 100m piscine, triathlon natation, eau libre, temps 1500m",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Qu'est-ce que l'allure en natation ?",
    a: "L'allure en natation est le temps nécessaire pour parcourir 100 mètres, exprimé en minutes:secondes. Par exemple, une allure de 1:45/100m signifie que vous nagez 100 mètres en 1 minute 45 secondes.",
  },
  {
    q: "C'est quoi le SWOLF score ?",
    a: "Le SWOLF (Swimming + Golf) est la somme du temps pour nager 25 mètres (en secondes) et du nombre de coups de bras. Par exemple : temps 25m = 30s + 16 coups = SWOLF de 46. Plus bas est mieux !",
  },
  {
    q: "Quelle allure pour l'Ironman 3800m ?",
    a: "Selon votre niveau : Elite (≤1:00/100m = ≤57min), Avancé (1:15 = 72min), Amateur (1:30 = 87min), Débutant (1:45 = 102min). Voir le tableau pour toutes les estimations.",
  },
  {
    q: "Différence eau libre vs piscine ?",
    a: "En eau libre (lac, mer), les vagues et le courant ralentissent généralement de 10-15%. Une allure de 1:30 en piscine peut devenir 1:45-2:00 en eau libre. Commencez par des allures plus conservatrices.",
  },
  {
    q: "Comment améliorer son allure en natation ?",
    a: "Pour progresser, travaillez d'abord la technique (allongement des bras, rotation du corps, battements réguliers) plutôt que la force brute. Un SWOLF bas indique une nage efficace. Des séances avec un coach FFN certifié permettent d'identifier rapidement les défauts techniques.",
  },
];

export default function Page() {
  // Tableau allures de référence
  const tableauAllures = ALLURES_REFERENCE.map((allure) => {
    const kmh = allureVersVitesse(allure);
    const pred200 = predireTempsNatation(allure, 200);
    const pred400 = predireTempsNatation(allure, 400);
    const pred1500 = predireTempsNatation(allure, 1500);
    const pred1900 = predireTempsNatation(allure, 1900);
    const pred3800 = predireTempsNatation(allure, 3800);
    return {
      allure: formatAllureNatation(allure),
      kmh,
      temps200: pred200,
      temps400: pred400,
      temps1500: pred1500,
      temps1900: pred1900,
      temps3800: pred3800,
    };
  });

  // Niveaux SWOLF
  const niveauxSWOLF = [
    { min: 0, max: 35, niveau: "Elite", couleur: "from-red-500 to-orange-600" },
    {
      min: 35,
      max: 45,
      niveau: "Avancé",
      couleur: "from-blue-500 to-cyan-600",
    },
    {
      min: 45,
      max: 55,
      niveau: "Intermédiaire",
      couleur: "from-emerald-500 to-teal-600",
    },
    {
      min: 55,
      max: 65,
      niveau: "Débutant entraîné",
      couleur: "from-yellow-500 to-amber-600",
    },
    { min: 65, max: 100, niveau: "Débutant", couleur: "from-slate-500 to-slate-600" },
  ];

  return (
    <div>
      <WebAppJsonLd name="Calcul Allure Natation + SWOLF" />
      <Breadcrumb currentPage="Calcul Allure Natation + SWOLF" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏊
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Allure Natation + SWOLF
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Convertissez entre allure (min/100m) et vitesse (km/h). Calculez votre
        SWOLF score. Prédisez vos temps de piscine à Ironman.
      </p>

      <CalculAllureNatation />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Tableau de référence des allures courantes
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Consultez ce tableau pour voir les équivalences entre allure
          (min/100m), vitesse (km/h) et temps estimés sur distances populaires.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Allure (min/100m)
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Vitesse (km/h)
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  200m
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  400m
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  1500m
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Half IM (1900m)
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Ironman (3800m)
                </th>
              </tr>
            </thead>
            <tbody>
              {tableauAllures.map((row) => (
                <tr
                  key={row.allure}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="py-3 px-2 font-medium text-slate-700">
                    {row.allure}
                  </td>
                  <td className="py-3 px-2 text-slate-600">
                    {row.kmh.toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    km/h
                  </td>
                  <td className="py-3 px-2 text-right text-slate-600">
                    {row.temps200}
                  </td>
                  <td className="py-3 px-2 text-right text-slate-600">
                    {row.temps400}
                  </td>
                  <td className="py-3 px-2 text-right text-slate-600">
                    {row.temps1500}
                  </td>
                  <td className="py-3 px-2 text-right text-slate-600">
                    {row.temps1900}
                  </td>
                  <td className="py-3 px-2 text-right font-bold text-slate-800">
                    {row.temps3800}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Niveaux SWOLF (crawl 25m)
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {niveauxSWOLF.map((n) => (
            <div
              key={n.niveau}
              className={`bg-gradient-to-br ${n.couleur} text-white rounded-xl p-4 shadow-md`}
            >
              <h3 className="font-bold mb-2">{n.niveau}</h3>
              <p className="text-sm opacity-90">
                {n.min}-{n.max === 100 ? "+" : n.max}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Allures par niveau de nageur
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">Débutant</h3>
            <p className="text-sm font-mono text-slate-700 mb-2">1:45 - 2:30</p>
            <p className="text-xs text-slate-500">Vitesse : 2.4 - 3.4 km/h</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">
              Débutant entraîné
            </h3>
            <p className="text-sm font-mono text-slate-700 mb-2">1:30 - 1:45</p>
            <p className="text-xs text-slate-500">Vitesse : 3.4 - 4.0 km/h</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">Intermédiaire</h3>
            <p className="text-sm font-mono text-slate-700 mb-2">1:15 - 1:30</p>
            <p className="text-xs text-slate-500">Vitesse : 4.0 - 4.8 km/h</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">Avancé / Elite</h3>
            <p className="text-sm font-mono text-slate-700 mb-2">
              &lt; 1:15
            </p>
            <p className="text-xs text-slate-500">Vitesse : &gt; 4.8 km/h</p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Conseils de natation
        </h2>
        <ul className="space-y-3 text-slate-600 leading-relaxed">
          <li>
            <strong>Allure en piscine vs eau libre :</strong> Prévoyez 10-15%
            plus lent en eau libre (vagues, courant, visibilité). Entraînez-vous
            progressivement en eau libre.
          </li>
          <li>
            <strong>SWOLF pour l&apos;efficacité :</strong> Cherchez à réduire
            votre SWOLF plutôt que juste l&apos;allure. Plus de coups =
            nage inefficace, même si rapide.
          </li>
          <li>
            <strong>Triathlon :</strong> En Half Ironman (1900m), attendez-vous à
            être plus lent qu&apos;en piscine. En Ironman (3800m), maintenez une
            allure régulière et économe (80-85% de vos capacités).
          </li>
          <li>
            <strong>Coaching technique :</strong> Pour progresser, consultez un
            coach FFN certifié. La technique compte plus que l&apos;allure.
          </li>
        </ul>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Formules utilisées
        </h2>
        <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
          <p>
            <strong>Allure → Vitesse (km/h) :</strong> (60 / allure_min/100m) ×
            0.1 = km/h
          </p>
          <p>
            <strong>Vitesse (km/h) → Allure :</strong> 60 / (km/h × 10) =
            min/100m
          </p>
          <p>
            <strong>Temps sur distance :</strong> allure × (distance / 100)
          </p>
          <p>
            <strong>SWOLF :</strong> temps_25m (secondes) + nombre_coups
          </p>
        </div>
      </section>

      <section className="mt-8 bg-yellow-50 rounded-2xl border border-yellow-200 p-6">
        <p className="text-sm text-slate-600 leading-relaxed">
          <strong>Disclaimer :</strong> Ces calculs sont basés sur des formules
          standards de natation. Les résultats réels dépendent de votre
          technique, votre condition physique, la température de l&apos;eau et
          les conditions de l&apos;eau (piscine vs lac/mer). Pour optimisation
          technique et entraînement personnalisé, consultez un coach FFN
          certifié.
        </p>
      </section>

      <HowToJsonLd
        name="Calculer son allure natation et predire ses temps"
        steps={[
          { name: "Saisir l'allure ou la vitesse", text: "Entrer l'allure en min/100m (ex: 1:30) ou la vitesse en km/h. La conversion applique la formule : allure (min/100m) = 60 / (vitesse km/h x 10)." },
          { name: "Calculer le score SWOLF", text: "Entrer le temps pour nager 25m en secondes et le nombre de coups de bras. SWOLF = temps 25m (secondes) + nombre de coups. Un score inférieur à 35 correspond au niveau elite." },
          { name: "Lire les predictions de temps sur les distances cles", text: "Le calculateur applique la formule : temps = allure x (distance / 100) pour estimer les temps sur 200m, 400m, 1500m, Half Ironman 1900m et Ironman 3800m." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentSlug="/calcul-allure-natation" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
