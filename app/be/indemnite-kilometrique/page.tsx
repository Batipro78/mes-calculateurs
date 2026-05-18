import type { Metadata } from "next";
import CalculateurIndemniteKmBE from "./CalculateurIndemniteKmBE";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import WebAppJsonLd from "../../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "/be/indemnite-kilometrique",
    languages: {
      "fr-BE": "/be/indemnite-kilometrique",
      "fr-FR": "/indemnite-kilometrique",
    },
  },
  title: "Calculateur Indemnité Kilométrique Belgique 2026",
  description:
    "Calculez votre indemnité kilométrique en Belgique 2026. Taux trimestriel, annuel, fonctionnaire et frais réels. Conforme barèmes officiels UCM, Securex, Partena.",
  keywords:
    "indemnité kilométrique Belgique, indemnité km 2026, taux indemnité, calculateur km Belgique",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Calculateur Indemnité Kilométrique Belgique"
        description="Calculez votre indemnité kilométrique en Belgique 2026"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quel est le taux d'indemnité kilométrique en Belgique en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "En Belgique, l'indemnité kilométrique varie selon le régime : 0,4326 EUR/km pour le taux trimestriel (janvier-mars 2026), 0,4449 EUR/km pour le taux annuel (juillet 2025-juin 2026), 0,4477 EUR/km pour les fonctionnaires du secteur public, et 0,15 EUR/km pour le forfait fiscal (déclaration d'impôt).",
                },
              },
              {
                "@type": "Question",
                name: "Comment calculer l'indemnité kilométrique en Belgique ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La formule est simple : Indemnité = Distance (km) × Taux EUR/km. Par exemple, 1000 km avec le taux trimestriel (0,4326 EUR/km) = 1000 × 0,4326 = 432,60 EUR. Le taux s'indexe trimestriellement et annuellement en Belgique.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle différence entre le taux trimestriel et annuel ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le taux trimestriel (0,4326 EUR/km) s'applique de janvier à mars 2026. Le taux annuel (0,4449 EUR/km) couvre la période du 1er juillet 2025 au 30 juin 2026 et est légèrement plus avantageux. Votre entreprise/profession choisit lequel appliquer.",
                },
              },
              {
                "@type": "Question",
                name: "Le forfait fiscal de 0,15 EUR/km est-il suffisant ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le forfait de 0,15 EUR/km est un déduction fiscale simplifiée pour les salariés belges dans leur déclaration d'impôt. C'est moins avantageux que les taux professionnels (0,43-0,45 EUR/km), mais permet un déduction sans justificatif détaillé de chaque trajet.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        currentPage="Indemnité Kilométrique Belgique"
        parentPage="Belgique"
        parentHref="/be"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚗
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Indemnité Kilométrique Belgique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre indemnité kilométrique en Belgique avec les taux 2026
        officiels. Tarifs trimestriels, annuels, fonctionnaires et frais réels.
      </p>

      <CalculateurIndemniteKmBE />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Taux d&apos;indemnité kilométrique en Belgique (2026)
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xl font-bold text-teal-600">0,4326 EUR/km</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux trimestriel
            </p>
            <p className="text-xs text-slate-400 mt-1">
              En vigueur 01/01 - 31/03/2026
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xl font-bold text-teal-600">0,4449 EUR/km</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux annuel
            </p>
            <p className="text-xs text-slate-400 mt-1">
              En vigueur 01/07/2025 - 30/06/2026
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xl font-bold text-teal-600">0,4477 EUR/km</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux fonctionnaire
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Secteur public belge
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xl font-bold text-teal-600">0,15 EUR/km</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Forfait fiscal
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Déduction impôt (salariés)
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Comment calculer l&apos;indemnité kilométrique ?
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          <strong>Formule simple :</strong> Indemnité = Distance (km) × Taux
          (EUR/km). Par exemple, parcourir 1000 km en Belgique avec le taux
          trimestriel (0,4326 EUR/km) vous donne droit à une indemnité de
          1000 × 0,4326 = <strong>432,60 EUR</strong>.
        </p>
        <p className="text-slate-600 leading-relaxed">
          <strong>Choix du taux :</strong> Les travailleurs et entreprises
          belges choisissent entre le taux <strong>trimestriel</strong> (plus
          bas mais valable 3 mois) et <strong>annuel</strong> (légèrement plus
          avantageux, valable 12 mois). Les fonctionnaires belges utilisent le
          taux spécifique plus élevé.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Indexation et changements 2026
        </h3>
        <p className="text-slate-600 leading-relaxed">
          L&apos;indemnité kilométrique en Belgique s&apos;indexe
          trimestriellement et annuellement en fonction de l&apos;inflation
          (indice des prix à la consommation). Le taux <strong>trimestriel</strong>{" "}
          de 0,4326 EUR/km s&apos;applique de janvier à mars 2026 et augmente
          ensuite le 1er avril. Le taux <strong>annuel</strong> de 0,4449 EUR/km
          couvre la période estivale (juillet 2025 - juin 2026) et est mis à
          jour chaque 1er juillet.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Forfait fiscal vs. taux professionnel
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Le forfait fiscal de <strong>0,15 EUR/km</strong> est une déduction
          simplifiée pour les salariés belges dans leur déclaration
          d&apos;impôt sur le revenu. C&apos;est moins avantageux que les taux
          professionnels (0,43-0,45 EUR/km), mais permet une déduction sans
          justifier chaque trajet. Les indépendants et entreprises doivent
          justifier leurs frais réels auprès des autorités.
        </p>
      </section>
    </div>
  );
}
