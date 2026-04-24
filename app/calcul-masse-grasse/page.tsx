import type { Metadata } from "next";
import CalculateurMasseGrasse from "./CalculateurMasseGrasse";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-masse-grasse" },
  title: "Calcul Masse Grasse 2026 - Taux de Graisse Corporelle Gratuit",
  description:
    "Calculez votre taux de masse grasse gratuitement avec la methode US Navy et la formule IMC. Classez votre resultat : essentiel, athlete, fitness, normal, surpoids.",
  keywords:
    "calcul masse grasse, taux de graisse corporelle, methode navy masse grasse, pourcentage masse grasse, masse grasse homme, masse grasse femme, calcul composition corporelle",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Masse Grasse" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment calculer son taux de masse grasse ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La methode US Navy utilise les mesures du tour de taille, du tour de cou (et du tour de hanches pour les femmes) ainsi que la taille. Pour les hommes : %MG = 86,010 × log10(taille – cou) – 70,041 × log10(taille corps) + 36,76. Pour les femmes : %MG = 163,205 × log10(taille + hanches – cou) – 97,684 × log10(taille corps) – 78,387."
                },
              },
              {
                "@type": "Question",
                name: "Quel est le taux de masse grasse normal ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour un homme, le taux de masse grasse normal se situe entre 18 % et 24 %. Pour une femme, il se situe entre 25 % et 31 %. Un taux inferieur indique une categorie athlete ou essentiel, un taux superieur indique un surpoids graisseux."
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la difference entre masse grasse et poids ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le poids total inclut la masse grasse (tissus adipeux) ET la masse maigre (muscles, os, organes, eau). Deux personnes avec le meme poids peuvent avoir des compositions corporelles tres differentes. Un sportif muscle peut peser plus qu'une personne sedentaire tout en ayant moins de graisse."
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul Masse Grasse" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏋️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Masse Grasse 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre taux de graisse corporelle avec la methode US Navy et
        estimez votre composition corporelle.
      </p>

      <CalculateurMasseGrasse />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment mesurer sa masse grasse ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>taux de masse grasse</strong> est la proportion de tissu
          adipeux dans le corps total. Contrairement a l&apos;IMC, il distingue
          la graisse de la masse musculaire. Deux methodes sont disponibles ici :
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Methode US Navy (recommandee)
        </h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Mise au point par la marine americaine, elle necessite un simple ruban
          mesureur. Les formules sont :
        </p>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700 space-y-2">
          <p>
            <strong>Homme :</strong> %MG = 86,010 × log10(taille – cou) –
            70,041 × log10(taille) + 36,76
          </p>
          <p>
            <strong>Femme :</strong> %MG = 163,205 × log10(taille + hanches –
            cou) – 97,684 × log10(taille) – 78,387
          </p>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Estimation par IMC (Deurenberg)
        </h3>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700 space-y-2">
          <p>
            <strong>Homme :</strong> %MG = 1,20 × IMC + 0,23 × age – 16,2
          </p>
          <p>
            <strong>Femme :</strong> %MG = 1,20 × IMC + 0,23 × age – 5,4
          </p>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Classification de la masse grasse
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-3 px-3 text-slate-600 font-semibold">
                  Categorie
                </th>
                <th className="text-center py-3 px-3 text-slate-600 font-semibold">
                  Homme
                </th>
                <th className="text-center py-3 px-3 text-slate-600 font-semibold">
                  Femme
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-3 text-blue-700 font-medium">
                  Essentiel
                </td>
                <td className="py-2.5 px-3 text-center text-slate-600">
                  &lt; 6 %
                </td>
                <td className="py-2.5 px-3 text-center text-slate-600">
                  &lt; 14 %
                </td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <td className="py-2.5 px-3 text-emerald-700 font-medium">
                  Athlete
                </td>
                <td className="py-2.5 px-3 text-center text-slate-600">
                  6 – 13 %
                </td>
                <td className="py-2.5 px-3 text-center text-slate-600">
                  14 – 20 %
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-3 text-teal-700 font-medium">
                  Fitness
                </td>
                <td className="py-2.5 px-3 text-center text-slate-600">
                  14 – 17 %
                </td>
                <td className="py-2.5 px-3 text-center text-slate-600">
                  21 – 24 %
                </td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <td className="py-2.5 px-3 text-amber-700 font-medium">
                  Normal
                </td>
                <td className="py-2.5 px-3 text-center text-slate-600">
                  18 – 24 %
                </td>
                <td className="py-2.5 px-3 text-center text-slate-600">
                  25 – 31 %
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-red-700 font-medium">
                  Surpoids
                </td>
                <td className="py-2.5 px-3 text-center text-slate-600">
                  &gt; 25 %
                </td>
                <td className="py-2.5 px-3 text-center text-slate-600">
                  &gt; 32 %
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Implications pour la sante
        </h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Un <strong>taux de masse grasse trop eleve</strong> est associe a un
          risque accru de maladies cardiovasculaires, de diabete de type 2 et
          d&apos;hypertension. A l&apos;inverse, un taux trop bas (categorie
          &quot;essentiel&quot;) peut perturber les hormones et affecter la
          sante osseuse.
        </p>
        <p className="text-slate-600 leading-relaxed">
          La <strong>graisse viscerale</strong> (autour des organes) est plus
          dangereuse que la graisse sous-cutanee. Le tour de taille est un bon
          indicateur de la graisse viscerale : risque eleve au-dela de 94 cm
          pour l&apos;homme et 80 cm pour la femme.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Comment reduire sa masse grasse ?
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1.5">
          <li>
            Deficit calorique modere (300-500 kcal/jour) — voir notre{" "}
            <a
              href="/calcul-calories"
              className="text-violet-600 hover:underline font-medium"
            >
              calculateur de calories
            </a>
          </li>
          <li>Entrainement en resistance (musculation) pour preserver la masse maigre</li>
          <li>Cardio moderee 2-3 fois par semaine</li>
          <li>Alimentation riche en proteines (1,6-2,2 g/kg de poids corporel)</li>
          <li>Sommeil suffisant (7-9h) — le manque de sommeil favorise le stockage de graisses</li>
        </ul>

        <p className="text-xs text-slate-400 mt-6">
          Mis a jour le 8 avril 2026
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-masse-grasse" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
