import type { Metadata } from "next";
import CalculateurMacros from "./CalculateurMacros";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Calcul Macros 2026 - Repartition Macronutriments Gratuit",
  description:
    "Calculez gratuitement vos macronutriments journaliers (proteines, glucides, lipides) selon votre objectif : maintien, perte de poids, prise de masse, seche ou cetogene. Formule Mifflin incluse.",
  keywords:
    "calcul macros, macronutriments, repartition proteines glucides lipides, regime cetogene, prise de masse, perte de poids macros, calcul nutrition",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Macros Nutrition" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Qu'est-ce que les macronutriments ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les macronutriments (ou macros) sont les trois grandes categories de nutriments qui fournissent de l'energie : les proteines (4 kcal/g), les glucides (4 kcal/g) et les lipides (9 kcal/g). Chaque repas devrait contenir une combinaison equilibree de ces trois macros selon votre objectif.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle repartition de macros pour maigrir ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour perdre du poids, il est recommande d'augmenter les proteines pour preserver le muscle : 40% de proteines, 30% de glucides et 30% de lipides. Associe a un deficit calorique de 400 kcal, cette repartition favorise la perte de masse grasse tout en preservant la masse musculaire.",
                },
              },
              {
                "@type": "Question",
                name: "Comment calculer ses macros pour la prise de masse ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour la prise de masse, privilegiez un surplus calorique de 300 kcal et une repartition de 25% de proteines, 50% de glucides et 25% de lipides. Les glucides sont essentiels pour l'energie lors de l'entrainement et la recuperation musculaire. Visez 1,6 a 2,2 g de proteines par kg de poids corporel.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul Macros" lastUpdated="8 avril 2026" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🥗
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Macros 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre repartition ideale en proteines, glucides et lipides selon votre objectif nutritionnel.
      </p>

      <CalculateurMacros />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Qu&apos;est-ce que les macronutriments ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les <strong>macronutriments</strong> (ou &quot;macros&quot;) sont les trois piliers de la nutrition : les{" "}
          <strong>proteines</strong>, les <strong>glucides</strong> et les <strong>lipides</strong>. Chacun joue un
          role precis dans votre corps et fournit une quantite d&apos;energie differente :
        </p>
        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="font-bold text-blue-700">Proteines</p>
            <p className="text-sm text-blue-600 mt-1">4 kcal par gramme</p>
            <p className="text-xs text-blue-500 mt-2">Construction musculaire, reparation tissulaire, enzymes, hormones, satiete.</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="font-bold text-green-700">Glucides</p>
            <p className="text-sm text-green-600 mt-1">4 kcal par gramme</p>
            <p className="text-xs text-green-500 mt-2">Source d&apos;energie principale, carburant du cerveau, performance sportive.</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="font-bold text-orange-700">Lipides</p>
            <p className="text-sm text-orange-600 mt-1">9 kcal par gramme</p>
            <p className="text-xs text-orange-500 mt-2">Hormones, vitamines liposolubles, protection des organes, energie de reserve.</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-4 mt-8">
          Ratios de macronutriments par objectif
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La repartition optimale de vos macros depend directement de votre <strong>objectif nutritionnel</strong>.
          Voici les ratios recommandes par la communaute scientifique :
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Objectif</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Proteines</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Glucides</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Lipides</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-semibold text-slate-700">⚖️ Maintien</td>
                <td className="py-2.5 px-2 text-right text-blue-600 font-bold">30%</td>
                <td className="py-2.5 px-2 text-right text-green-600 font-bold">40%</td>
                <td className="py-2.5 px-2 text-right text-orange-600 font-bold">30%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-semibold text-slate-700">📉 Perte de poids</td>
                <td className="py-2.5 px-2 text-right text-blue-600 font-bold">40%</td>
                <td className="py-2.5 px-2 text-right text-green-600 font-bold">30%</td>
                <td className="py-2.5 px-2 text-right text-orange-600 font-bold">30%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-semibold text-slate-700">💪 Prise de masse</td>
                <td className="py-2.5 px-2 text-right text-blue-600 font-bold">25%</td>
                <td className="py-2.5 px-2 text-right text-green-600 font-bold">50%</td>
                <td className="py-2.5 px-2 text-right text-orange-600 font-bold">25%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-semibold text-slate-700">🔥 Seche</td>
                <td className="py-2.5 px-2 text-right text-blue-600 font-bold">40%</td>
                <td className="py-2.5 px-2 text-right text-green-600 font-bold">25%</td>
                <td className="py-2.5 px-2 text-right text-orange-600 font-bold">35%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-2 font-semibold text-slate-700">🥑 Cetogene (keto)</td>
                <td className="py-2.5 px-2 text-right text-blue-600 font-bold">20%</td>
                <td className="py-2.5 px-2 text-right text-green-600 font-bold">5%</td>
                <td className="py-2.5 px-2 text-right text-orange-600 font-bold">75%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-4 mt-8">
          Pourquoi les macros sont importants ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Connaitre et ajuster ses macronutriments permet d&apos;aller au-dela du simple comptage de calories. Deux
          personnes peuvent manger le meme nombre de calories mais avec des compositions tres differentes, ce qui
          entraine des resultats tres differents en termes de <strong>composition corporelle</strong>, d&apos;
          <strong>energie</strong> et de <strong>performance sportive</strong>.
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li>Des <strong>proteines insuffisantes</strong> ralentissent la recuperation et provoquent la perte de muscle</li>
          <li>Trop de <strong>glucides simples</strong> provoquent des pics d&apos;insuline et favorisent le stockage des graisses</li>
          <li>Les <strong>bons lipides</strong> sont indispensables a la production hormonale et a l&apos;absorption des vitamines</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-800 mb-4 mt-8">
          Sources alimentaires par macronutriment
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="font-bold text-blue-700 mb-2">Proteines</p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>Poulet, dinde, boeuf maigre</li>
              <li>Oeufs, blancs d&apos;oeufs</li>
              <li>Thon, saumon, sardines</li>
              <li>Fromage blanc, yaourt grec</li>
              <li>Lentilles, pois chiches, tofu</li>
              <li>Whey, proteines en poudre</li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="font-bold text-green-700 mb-2">Glucides</p>
            <ul className="text-xs text-green-600 space-y-1">
              <li>Riz, pates, pain complet</li>
              <li>Pommes de terre, patate douce</li>
              <li>Avoine, flocons d&apos;avoine</li>
              <li>Fruits, jus de fruits</li>
              <li>Legumineuses, haricots</li>
              <li>Quinoa, boulgour</li>
            </ul>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="font-bold text-orange-700 mb-2">Lipides</p>
            <ul className="text-xs text-orange-600 space-y-1">
              <li>Huile d&apos;olive, colza</li>
              <li>Avocat</li>
              <li>Noix, amandes, noisettes</li>
              <li>Saumon, maquereau</li>
              <li>Fromage, beurre (moderation)</li>
              <li>Graines de lin, chia</li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-6">
          Mis a jour le 8 avril 2026. Les recommandations sont basees sur des ratios generalement acceptes par la
          communaute scientifique. Consultez un nutritionniste pour un suivi personnalise.
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-macros" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
