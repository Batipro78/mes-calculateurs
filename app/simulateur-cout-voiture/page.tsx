import type { Metadata } from "next";
import SimulateurCoutVoiture from "./SimulateurCoutVoiture";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Cout Total Voiture 2026 - Simulateur Budget Auto Complet Gratuit",
  description:
    "Calculez le cout total de possession de votre voiture : carburant, assurance, entretien, depreciation, controles techniques. Comparaison thermique vs electrique. Gratuit.",
  keywords:
    "cout total voiture, simulateur budget auto, cout possession voiture, cout kilometrique reel, thermique vs electrique, depreciation voiture, budget automobile 2026",
  openGraph: {
    title: "Simulateur Cout Total Voiture 2026",
    description:
      "Calculez le vrai cout de votre voiture sur toute la duree de detention : carburant, assurance, entretien, controle technique et depreciation.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulateur Cout Total Voiture 2026",
    description:
      "Combien vous coute vraiment votre voiture ? Calculez le cout total de possession en quelques secondes.",
  },
};

export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quel est le cout total moyen d'une voiture par an en France ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le cout annuel moyen d'une voiture en France varie entre 3 000 € et 8 000 € selon le type de vehicule. Une citadine coute environ 3 500 €/an (carburant + assurance + entretien + depreciation), une berline autour de 5 000 €/an, et un SUV peut depasser 7 000 €/an. Ces chiffres incluent toutes les charges : carburant, assurance, entretien, controles techniques et depreciation.",
        },
      },
      {
        "@type": "Question",
        name: "Une voiture electrique est-elle vraiment moins chere qu'une voiture thermique ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sur le cout total de possession, une voiture electrique peut etre moins chere qu'une thermique sur 5 ans ou plus, malgre un prix d'achat plus eleve. L'electricite coute environ 2-3 fois moins cher que l'essence au kilometre, et l'entretien est reduit (pas de vidange, moins de pieces d'usure). La difference se creuse avec un kilométrage annuel eleve (plus de 15 000 km/an).",
        },
      },
      {
        "@type": "Question",
        name: "Comment reduire le cout total de sa voiture ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pour reduire le cout total de votre voiture : 1) Privilegier une citadine recente plutot qu'un gros vehicule d'occasion (moins d'entretien), 2) Comparer les assurances chaque annee (economie possible de 200-400 €/an), 3) Respecter les revisions pour eviter les pannes coteuses, 4) Conduire de facon eco (moins de consommation), 5) Envisager le vehicule electrique si vous roulez plus de 15 000 km/an, 6) Garder votre vehicule plus longtemps (la depreciation est plus forte les premieres annees).",
        },
      },
    ],
  };

  return (
    <div>
      <WebAppJsonLd
        name="Simulateur Cout Total Voiture 2026"
        description="Calculez le cout total de possession de votre voiture sur toute la duree de detention"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb
        currentPage="Simulateur Cout Voiture"
        lastUpdated="8 avril 2026"
      />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚗
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Cout Total Voiture 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez le vrai cout de votre voiture : carburant, assurance, entretien, depreciation et controles techniques.
      </p>

      <SimulateurCoutVoiture />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* SEO content: thermique vs electrique */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Thermique vs Electrique : comparaison du cout total sur 5 ans
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-3 text-slate-500 font-medium">Poste</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Citadine thermique</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Compacte electrique</th>
              </tr>
            </thead>
            <tbody>
              {[
                { poste: "Prix d'achat", th: "18 000 €", el: "35 000 €" },
                { poste: "Carburant/energie (5 ans, 15 000 km/an)", th: "7 672 €", el: "2 025 €" },
                { poste: "Assurance (5 ans)", th: "3 000 €", el: "2 750 €" },
                { poste: "Entretien (5 ans)", th: "2 602 €", el: "1 500 €" },
                { poste: "Controles techniques", th: "160 €", el: "160 €" },
                { poste: "Valeur de revente", th: "-7 989 €", el: "-15 521 €" },
                { poste: "Cout total net", th: "~23 445 €", el: "~25 914 €" },
              ].map((row, i) => (
                <tr key={i} className={`border-b border-slate-100 ${i === 6 ? "bg-blue-50/50 font-bold" : ""}`}>
                  <td className="py-2.5 px-3 text-slate-700">{row.poste}</td>
                  <td className="py-2.5 px-3 text-right text-slate-600">{row.th}</td>
                  <td className="py-2.5 px-3 text-right text-emerald-600">{row.el}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-3">
          Calculs basés sur 15 000 km/an, carburant a 1,85 €/L, electricite a 2,70 €/100km equivalent. Les resultats varient selon votre usage.
        </p>
      </section>

      {/* Tips to reduce costs */}
      <section className="mt-6 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment reduire le cout total de votre voiture ?
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              titre: "Comparer les assurances chaque annee",
              desc: "Changer d'assureur peut vous faire economiser 200 a 400 €/an sans changer de garanties.",
            },
            {
              titre: "Conduire en mode eco",
              desc: "Anticiper les freinages, maintenir la pression des pneus : jusqu'a 20% d'economie de carburant.",
            },
            {
              titre: "Respecter les revisions",
              desc: "Un entretien regulier evite les pannes coteuses et preserve la valeur de revente du vehicule.",
            },
            {
              titre: "Garder le vehicule plus longtemps",
              desc: "La depreciation est maximale les 3 premieres annees. Conserver 7-10 ans optimise le cout total.",
            },
            {
              titre: "Privilegier un vehicule bien classe",
              desc: "Un vehicule WLTP faible consommation reduit le carburant ET l'assurance (prime moins elevee).",
            },
            {
              titre: "Envisager le covoiturage",
              desc: "Partager les trajets domicile-travail peut diviser le cout kilometrique reel par 2.",
            },
          ].map((tip, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">{tip.titre}</p>
                <p className="text-sm text-slate-500 mt-0.5">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-cout-voiture" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
