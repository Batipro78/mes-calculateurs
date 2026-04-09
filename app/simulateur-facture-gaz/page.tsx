import type { Metadata } from "next";
import SimulateurFactureGaz from "./SimulateurFactureGaz";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Simulateur Facture Gaz 2026 - Estimez votre Facture Gratuit",
  description:
    "Estimez votre facture de gaz naturel 2026 : abonnement GRDF, prix kWh par zone, taxes (CTA, TICGN, TVA). Comparaison EDF, Engie, TotalEnergies, Eni. Calcul gratuit et instantane.",
  keywords:
    "simulateur facture gaz, calcul facture gaz, prix gaz naturel 2026, tarif reglemente GRDF, zone tarifaire gaz, abonnement gaz, kWh gaz prix, comparer fournisseurs gaz",
  openGraph: {
    title: "Simulateur Facture Gaz 2026 - Calculez votre Facture",
    description:
      "Calculez votre facture de gaz avec les tarifs reglementes GRDF 2026. Cuisson, eau chaude ou chauffage. Comparaison fournisseurs incluse.",
  },
};

export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Comment est calculee une facture de gaz naturel en France ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La facture de gaz comprend : l'abonnement (part fixe selon l'usage), la consommation (kWh x prix unitaire), la CTA (Contribution Tarifaire d'Acheminement), la TVA a 5,5% sur l'abonnement et la CTA, la TVA a 20% sur la consommation, et la TICGN (Taxe Interieure de Consommation sur le Gaz Naturel). Le prix du kWh varie selon la zone tarifaire GRDF (1 a 6).",
        },
      },
      {
        "@type": "Question",
        name: "Quelles sont les zones tarifaires du gaz en France ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GRDF divise la France en 6 zones tarifaires. La zone 1 (Paris, Nord) est la moins chere avec environ 0,1284 EUR/kWh, tandis que la zone 6 (Clermont-Ferrand, Limoges) atteint 0,1488 EUR/kWh. La zone est determinee par votre reseau de distribution local et influe directement sur le prix du kWh de votre contrat.",
        },
      },
      {
        "@type": "Question",
        name: "Vaut-il mieux rester au tarif reglemente ou passer a une offre de marche ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le tarif reglemente GRDF sert de reference. Les offres de marche (EDF, Engie, TotalEnergies, Eni...) peuvent etre plus avantageuses, notamment en periode de stabilite des prix du gaz. Il est conseille de comparer les offres tous les ans via les comparateurs officiels (energie-info.fr). Attention aux contrats indexes sur le marche qui peuvent etre volatils.",
        },
      },
    ],
  };

  return (
    <div>
      <WebAppJsonLd name="Simulateur Facture Gaz" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb
        currentPage="Simulateur Facture Gaz"
        lastUpdated="8 avril 2026"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🔥
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Facture Gaz 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez votre facture de gaz naturel selon votre usage, votre zone GRDF et votre consommation.
        Tarifs reglementes Q1 2026. Mis a jour le 8 avril 2026.
      </p>

      <SimulateurFactureGaz />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* SEO content */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-6">
        <h2 className="text-xl font-bold text-slate-800">
          Comment fonctionne la facturation du gaz en France ?
        </h2>
        <p className="text-slate-600 leading-relaxed">
          Votre facture de gaz naturel se decompose en plusieurs composantes :
          une <strong>part fixe</strong> (abonnement GRDF + CTA) et une{" "}
          <strong>part variable</strong> proportionnelle a votre consommation en kWh.
          Des taxes specifiques s&apos;appliquent selon la nature des postes.
        </p>

        <h3 className="font-bold text-slate-800 mt-6">
          Les zones tarifaires GRDF expliquees
        </h3>
        <p className="text-slate-600 leading-relaxed">
          GRDF (Gestionnaire du Reseau de Distribution de Gaz) divise la France en{" "}
          <strong>6 zones tarifaires</strong>, chacune correspondant a un reseau de
          distribution local. Plus le reseau est eloigne des sources de gaz ou
          dense, plus le prix de l&apos;acheminement est eleve. Votre zone determine
          directement le <strong>prix unitaire du kWh</strong> qui figure sur votre contrat.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { zone: "Zone 1", prix: "0,1284", villes: "Paris, Nord, Ile-de-France" },
            { zone: "Zone 2", prix: "0,1324", villes: "Lyon, Bordeaux, Rennes" },
            { zone: "Zone 3", prix: "0,1365", villes: "Marseille, Toulouse, Nantes" },
            { zone: "Zone 4", prix: "0,1406", villes: "Strasbourg, Metz, Reims" },
            { zone: "Zone 5", prix: "0,1447", villes: "Montpellier, Nice, Grenoble" },
            { zone: "Zone 6", prix: "0,1488", villes: "Clermont-Ferrand, Limoges, Poitiers" },
          ].map((z) => (
            <div key={z.zone} className="bg-slate-50 rounded-xl p-4">
              <p className="font-semibold text-slate-700">{z.zone}</p>
              <p className="text-lg font-bold text-orange-600">{z.prix} EUR/kWh</p>
              <p className="text-xs text-slate-400">{z.villes}</p>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-slate-800 mt-6">
          Tarif reglemente vs marche libre
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Le <strong>tarif reglemente</strong> (TRV gaz) est fixe par les pouvoirs publics
          et sert de reference. Il est actuellement reserve aux contrats en vigueur
          depuis avant la fin du TRV pour les nouveaux abonnes. Les{" "}
          <strong>offres de marche</strong> proposees par EDF, Engie,
          TotalEnergies, Eni et d&apos;autres peuvent etre indexees ou fixes.
          Elles sont parfois plus avantageuses, surtout sur les offres a prix fixe
          en periode de baisse du marche du gaz.
        </p>

        <h3 className="font-bold text-slate-800 mt-6">
          Conseils pour diminuer sa consommation de gaz
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>
            Regler votre thermostat a <strong>19°C le jour</strong> et 16°C la nuit
          </li>
          <li>
            Faire entretenir votre chaudiere chaque annee (obligation legale, gain de rendement jusqu&apos;a 15%)
          </li>
          <li>
            Installer une tete thermostatique sur chaque radiateur pour ajuster piece par piece
          </li>
          <li>
            Isoler les combles et les murs pour reduire les deperditions thermiques
          </li>
          <li>
            Opter pour un chauffe-eau thermodynamique si vous consommez beaucoup d&apos;eau chaude
          </li>
          <li>
            Comparer les offres chaque annee via le comparateur officiel{" "}
            <strong>energie-info.fr</strong>
          </li>
        </ul>
      </section>

      <RelatedCalculators currentSlug="/simulateur-facture-gaz" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
