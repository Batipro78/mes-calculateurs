import type { Metadata } from "next";
import CalculCaloriesChienChat from "./CalculCaloriesChienChat";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import { genererTableauBER, STADES_LABELS, ACTIVITE_LABELS } from "./caloriesAnimauxCalc";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-calories-chien-chat" },
  title:
    "Calcul Calories Chien Chat - Besoin Énergétique (BER DER) gratuit | Mescalculateurs.fr",
  description:
    "Calculez les besoins caloriques de votre chien ou chat gratuitement. BER, DER, stade de vie, activité. Formules WSAVA et NRC. Conseil nutritionnel vétérinaire.",
  keywords:
    "calories chien, calories chat, besoin energetique chien, besoin energetique chat, BER DER, ration energie, calcul calories animaux, chien adulte calories, chat sterilise calories",
};

export default function Page() {
  const tableauBER = genererTableauBER(1, 50, 5);

  const facteursChien = [
    { stade: "Chiot 0-4 mois", sedentaire: 3.0, normal: 3.0, actif: 3.0, travail: 3.0 },
    { stade: "Chiot 4-12 mois", sedentaire: 2.0, normal: 2.0, actif: 2.0, travail: 2.0 },
    { stade: "Adulte (non stérilisé)", sedentaire: 1.2, normal: 1.6, actif: 2.0, travail: 3.0 },
    { stade: "Adulte (stérilisé)", sedentaire: 1.2, normal: 1.4, actif: 1.8, travail: 3.0 },
    { stade: "Sénior", sedentaire: 1.4, normal: 1.4, actif: 1.6, travail: 1.6 },
    { stade: "Gestation", sedentaire: 1.8, normal: 2.2, actif: 2.8, travail: 3.0 },
    { stade: "Allaitement", sedentaire: 4.0, normal: 5.5, actif: 6.5, travail: 8.0 },
  ];

  const facteursChat = [
    { stade: "Chaton 0-4 mois", sedentaire: 2.5, normal: 2.5, actif: 2.5, travail: 2.5 },
    { stade: "Chaton 4-12 mois", sedentaire: 2.0, normal: 2.0, actif: 2.0, travail: 2.0 },
    { stade: "Adulte intérieur", sedentaire: 1.2, normal: 1.2, actif: 1.2, travail: 1.2 },
    { stade: "Adulte extérieur", sedentaire: 1.4, normal: 1.4, actif: 1.6, travail: 1.6 },
    { stade: "Adulte stérilisé", sedentaire: 1.2, normal: 1.2, actif: 1.4, travail: 1.4 },
    { stade: "Sénior", sedentaire: 1.1, normal: 1.1, actif: 1.2, travail: 1.2 },
    { stade: "Gestation", sedentaire: 1.6, normal: 1.8, actif: 2.0, travail: 2.0 },
    { stade: "Allaitement", sedentaire: 2.0, normal: 3.5, actif: 5.0, travail: 6.0 },
  ];

  return (
    <div>
      <WebAppJsonLd name="Calcul Calories Chien Chat - Besoin Énergétique" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Combien de calories par jour pour un chien ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le besoin calorique journalier (DER) d&apos;un chien se calcule avec la formule BER = 70 × (poids en kg)^0.75, puis multiplié par un facteur d&apos;activité selon l&apos;âge, l&apos;état (stérilisé ou non) et le niveau d&apos;activité. Un chien adulte moyen de 25 kg non stérilisé a besoin d&apos;environ 900-1000 kcal/jour.",
                },
              },
              {
                "@type": "Question",
                name: "Combien de calories par jour pour un chat ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Un chat adulte moyen de 4-5 kg a besoin d&apos;environ 180-250 kcal/jour selon son activité et son état (stérilisé réduit les besoins). La formule BER = 70 × (poids en kg)^0.75 s&apos;applique, puis multiplication par le facteur d&apos;activité adapté à l&apos;espèce féline.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la différence entre BER et DER ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le BER (Besoin Énergétique de Repos) est l&apos;énergie minimale pour maintenir les fonctions vitales au repos. Le DER (Besoin Énergétique Quotidien) = BER × facteur d&apos;activité. Il représente le total calorique réel qu&apos;un animal dépense en fonction de son activité.",
                },
              },
              {
                "@type": "Question",
                name: "Comment gérer la perte de poids chez un chien ou un chat ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour une perte de poids graduelle et saine, réduisez les apports caloriques de 10-15% du DER calculé. Combinez avec de l&apos;exercice modéré et suivez l&apos;évolution du poids chaque 2-4 semaines. Un vétérinaire nutritionniste peut ajuster le régime selon la réponse de l&apos;animal.",
                },
              },
            ],
          }),
        }}
      />

      <Breadcrumb
        items={[{ label: "Accueil", href: "/" }, { label: "Calcul Calories Chien Chat" }]}
      />

      <AdSlot />

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* En-tête */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
            🐾 Calcul Calories Chien Chat
          </h1>
          <p className="text-xl text-gray-700">
            Calculez les besoins énergétiques (BER & DER) de votre animal gratuitement
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Basé sur les formules WSAVA, NRC et Royal Canin
          </p>
        </div>

        {/* Composant calcul */}
        <div className="mb-12">
          <CalculCaloriesChienChat />
        </div>

        <AdSlot />

        {/* Section BER */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">
            📊 Tableau BER par Poids
          </h2>
          <p className="mb-4 text-gray-700">
            Besoin Énergétique de Repos pour chiens et chats selon leur poids (avant application
            du facteur d&apos;activité).
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-orange-100 to-red-100">
                  <th className="border-b border-gray-200 px-4 py-3 text-left font-semibold text-gray-800">
                    Poids (kg)
                  </th>
                  <th className="border-b border-gray-200 px-4 py-3 text-right font-semibold text-gray-800">
                    BER (kcal/jour)
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableauBER.map((row, idx) => (
                  <tr
                    key={idx}
                    className={
                      idx % 2 === 0 ? "bg-white" : "bg-orange-50"
                    }
                  >
                    <td className="border-b border-gray-100 px-4 py-2">{row.poids}</td>
                    <td className="border-b border-gray-100 px-4 py-2 text-right font-semibold text-orange-600">
                      {row.ber.toLocaleString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Facteurs CHIEN */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">
            🐕 Facteurs d&apos;Activité - CHIEN
          </h2>
          <p className="mb-4 text-gray-700">
            Multipliez le BER par ces facteurs selon l&apos;âge, l&apos;état et l&apos;activité du chien.
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-blue-100 to-blue-50">
                  <th className="border-b border-gray-200 px-4 py-3 text-left font-semibold text-gray-800">
                    Stade
                  </th>
                  <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold text-gray-800">
                    Sédentaire
                  </th>
                  <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold text-gray-800">
                    Normal
                  </th>
                  <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold text-gray-800">
                    Actif
                  </th>
                  <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold text-gray-800">
                    Travail
                  </th>
                </tr>
              </thead>
              <tbody>
                {facteursChien.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                    <td className="border-b border-gray-100 px-4 py-2 font-medium text-gray-800">
                      {row.stade}
                    </td>
                    <td className="border-b border-gray-100 px-4 py-2 text-center text-gray-700">
                      {row.sedentaire}
                    </td>
                    <td className="border-b border-gray-100 px-4 py-2 text-center text-gray-700">
                      {row.normal}
                    </td>
                    <td className="border-b border-gray-100 px-4 py-2 text-center text-gray-700">
                      {row.actif}
                    </td>
                    <td className="border-b border-gray-100 px-4 py-2 text-center text-gray-700">
                      {row.travail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Facteurs CHAT */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">
            🐱 Facteurs d&apos;Activité - CHAT
          </h2>
          <p className="mb-4 text-gray-700">
            Multipliez le BER par ces facteurs selon l&apos;âge, l&apos;état et l&apos;activité du chat.
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-purple-100 to-purple-50">
                  <th className="border-b border-gray-200 px-4 py-3 text-left font-semibold text-gray-800">
                    Stade
                  </th>
                  <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold text-gray-800">
                    Sédentaire
                  </th>
                  <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold text-gray-800">
                    Normal
                  </th>
                  <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold text-gray-800">
                    Actif
                  </th>
                  <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold text-gray-800">
                    Travail
                  </th>
                </tr>
              </thead>
              <tbody>
                {facteursChat.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-purple-50"}>
                    <td className="border-b border-gray-100 px-4 py-2 font-medium text-gray-800">
                      {row.stade}
                    </td>
                    <td className="border-b border-gray-100 px-4 py-2 text-center text-gray-700">
                      {row.sedentaire}
                    </td>
                    <td className="border-b border-gray-100 px-4 py-2 text-center text-gray-700">
                      {row.normal}
                    </td>
                    <td className="border-b border-gray-100 px-4 py-2 text-center text-gray-700">
                      {row.actif}
                    </td>
                    <td className="border-b border-gray-100 px-4 py-2 text-center text-gray-700">
                      {row.travail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <AdSlot />

        {/* Section BER vs DER */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">
            ⚡ Différence BER vs DER
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
              <h3 className="mb-3 text-xl font-bold text-blue-900">BER (Besoin Énergétique de Repos)</h3>
              <p className="text-gray-800">
                Énergie minimale pour maintenir les fonctions vitales (respiration, circulation, température).
              </p>
              <p className="mt-3 font-semibold text-blue-700">Formule: BER = 70 × (poids)^0.75</p>
            </div>
            <div className="rounded-lg border-2 border-green-200 bg-green-50 p-6">
              <h3 className="mb-3 text-xl font-bold text-green-900">DER (Besoin Énergétique Quotidien)</h3>
              <p className="text-gray-800">
                Total des calories réelles dépensées en fonction du niveau d&apos;activité, âge, et état physiologique.
              </p>
              <p className="mt-3 font-semibold text-green-700">Formule: DER = BER × Facteur d&apos;activité</p>
            </div>
          </div>
        </section>

        {/* Section perte/prise de poids */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">
            🎯 Gérer le Poids (Perte / Prise)
          </h2>
          <div className="space-y-6">
            <div className="rounded-lg bg-yellow-50 p-6 border-l-4 border-yellow-400">
              <h3 className="mb-2 text-lg font-bold text-yellow-900">📉 Perte de Poids Graduelle</h3>
              <ul className="list-inside list-disc space-y-2 text-gray-800">
                <li>Réduire les apports caloriques de <strong>10-15%</strong> du DER calculé</li>
                <li>Combiner avec exercice modéré régulier (promenades, jeux)</li>
                <li>Suivre le poids chaque 2-4 semaines</li>
                <li>Objectif: perte de <strong>0,5-1% du poids/semaine</strong> (sain et durable)</li>
                <li>Adapter l&apos;aliment selon le score d&apos;état corporel (BCS: 1-9)</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 p-6 border-l-4 border-green-400">
              <h3 className="mb-2 text-lg font-bold text-green-900">📈 Prise de Poids (Croissance, Convalescence)</h3>
              <ul className="list-inside list-disc space-y-2 text-gray-800">
                <li>Augmenter l&apos;apport calorique selon le stade (chatons/chiots = +50-100%)</li>
                <li>Rations fractionnées (3-4 repas/jour pour chiots/chatons)</li>
                <li>Vérifier la qualité protéique (essentielles pour croissance musculaire)</li>
                <li>En convalescence: graduelle augmentation sous supervision vétérinaire</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mb-12 rounded-lg bg-red-50 p-6 border-l-4 border-red-400">
          <p className="text-sm text-gray-800">
            <strong>⚠️ Disclaimer:</strong> Ce calculateur fournit des estimations basées sur les formules WSAVA, NRC et Royal Canin.
            Les besoins réels peuvent varier selon la race, métabolisme individuel, santé, et environnement.
            <strong> Pour besoins spécifiques, perte de poids importante, ou maladies</strong>, consultez un vétérinaire nutritionniste.
          </p>
        </section>

        <AdSlot />
      </div>

      <RelatedCalculators currentSlug="/calcul-calories-chien-chat" />
    </div>
  );
}
