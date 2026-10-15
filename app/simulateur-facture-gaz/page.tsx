import type { Metadata } from "next";
import SimulateurFactureGaz from "./SimulateurFactureGaz";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import AmazonReco from "../components/AmazonReco";
import HowToJsonLd from "../components/HowToJsonLd";
import Visuel from "../components/Visuel";

export const metadata: Metadata = {
  alternates: { canonical: "/simulateur-facture-gaz" },
  title: "Simulateur Facture Gaz 2026 - Estimez votre Facture Gratuit",
  description:
    "Estimez votre facture de gaz naturel avec le prix repère de la CRE d'octobre 2026 : abonnement, prix du kWh, CTA, TICGN et TVA. Cuisson, eau chaude ou chauffage. Calcul gratuit.",
  keywords:
    "simulateur facture gaz, calcul facture gaz, comment calculer une facture de gaz, prix gaz naturel 2026, prix repère gaz CRE, abonnement gaz, kWh gaz prix, réduire sa facture de gaz",
  openGraph: {
    title: "Simulateur Facture Gaz 2026 - Calculez votre Facture",
    description:
      "Calculez votre facture de gaz avec le prix repère de la CRE d'octobre 2026. Cuisson, eau chaude ou chauffage. Fourchette de prix incluse.",
  },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment est calculée une facture de gaz naturel en France ?",
    a: "La facture de gaz comprend l'abonnement (part fixe), la consommation (kWh multipliés par le prix du kWh), la CTA (contribution tarifaire d'acheminement), la TICGN (taxe intérieure de consommation sur le gaz naturel) et la TVA à 20 %. Le simulateur calcule l'abonnement TTC plus le nombre de kWh multiplié par le prix TTC du kWh du prix repère de la CRE.",
  },
  {
    q: "Quel est le prix du gaz en octobre 2026 ?",
    a: "Le prix repère de vente de gaz de la CRE pour octobre 2026 est de 0,14557 EUR le kWh TTC en moyenne pour un logement chauffé au gaz, avec un abonnement de 360,79 EUR TTC par an. Pour la cuisson et l'eau chaude : 0,17832 EUR le kWh TTC et 152,46 EUR d'abonnement. Ce prix est publié chaque mois et change : en novembre 2026, le kWh de chauffage passe à 0,15760 EUR TTC en moyenne.",
  },
  {
    q: "Existe-t-il encore un tarif réglementé du gaz ?",
    a: "Non. Les tarifs réglementés de vente de gaz ont pris fin le 30 juin 2023. La CRE publie depuis un prix repère mensuel, à titre indicatif : chaque fournisseur fixe librement ses offres, qui peuvent être plus chères ou moins chères que ce repère.",
  },
  {
    q: "Comment réduire sa facture de gaz ?",
    a: "Baisser le chauffage de 1 °C représente environ 7 % de consommation en moins selon le ministère de la Transition écologique et l'ADEME. Vous pouvez aussi faire entretenir la chaudière (révision annuelle obligatoire), isoler le logement et comparer les offres sur le comparateur du Médiateur national de l'énergie.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Simulateur Facture Gaz" />
      <Breadcrumb
        currentPage="Simulateur Facture Gaz"
        lastUpdated="14 octobre 2026"
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
        Estimez votre facture de gaz naturel selon votre usage et votre consommation, avec le prix repère de vente de gaz
        de la CRE d&apos;octobre 2026. Ce prix change chaque mois. Mis à jour le 14 octobre 2026.
      </p>

      <SimulateurFactureGaz />

      <Visuel
        fichier="facture-gaz-chauffage-80m2-baisse-un-degre"
        alt="Facture de gaz pour un logement chauffé au gaz de 13 000 kWh par an avec le prix repère de la CRE d'octobre 2026 : 2 253 euros par an ; 2 121 euros en baissant le chauffage de 1 degré, soit 132 euros économisés ; 1 988 euros en baissant de 2 degrés, soit 265 euros économisés ; 1 856 euros en baissant de 3 degrés, soit 397 euros économisés. Repère de 7 % de consommation en moins par degré."
        legende="Exemple calculé par le simulateur : 13 000 kWh par an (hypothèse du simulateur pour 80 m²), prix repère moyen de la CRE d'octobre 2026. Le gain de 7 % par degré est un repère officiel (ministère de la Transition écologique et ADEME), appliqué ici à la consommation ; l'abonnement ne baisse pas."
        className="mt-8"
      />
      <p className="text-sm text-slate-600 mt-4 leading-relaxed">
        Pour savoir à quelle température régler le chauffage dans chaque pièce, la nuit ou quand vous partez, lisez{" "}
        <a href="/quelle-temperature-pour-le-chauffage" className="text-orange-600 hover:underline font-medium">
          Quelle température régler pour le chauffage ?
        </a>
      </p>

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* SEO content */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-6">
        <h2 className="text-xl font-bold text-slate-800">
          Comment fonctionne la facturation du gaz en France ?
        </h2>
        <p className="text-slate-600 leading-relaxed">
          Votre facture de gaz naturel se décompose en une <strong>part fixe</strong> (l&apos;abonnement, avec la CTA, la
          contribution tarifaire d&apos;acheminement) et une <strong>part variable</strong> proportionnelle à votre
          consommation en kWh (avec la TICGN, la taxe intérieure de consommation sur le gaz naturel). La TVA de 20 % porte
          sur l&apos;ensemble.
        </p>

        <h3 className="font-bold text-slate-800 mt-6">
          Le prix repère de la CRE, mois par mois
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Les tarifs réglementés de vente de gaz ont pris fin le 30 juin 2023. Depuis, la Commission de régulation de
          l&apos;énergie (CRE) publie chaque mois un <strong>prix repère</strong>, à titre indicatif, pour la zone de
          distribution de GRDF. Chaque fournisseur fixe librement ses offres : une offre à prix fixe peut être très
          différente de ce repère. Le simulateur utilise ce repère, car c&apos;est le seul prix public et officiel.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-3 text-slate-500 font-medium">Prix repère CRE (TTC)</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Octobre 2026</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Novembre 2026</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-3 text-slate-600">Chauffage : kWh moyen</td>
                <td className="py-2.5 px-3 text-right text-slate-700">0,14557 EUR</td>
                <td className="py-2.5 px-3 text-right text-slate-700">0,15760 EUR</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-3 text-slate-600">Chauffage : abonnement par an</td>
                <td className="py-2.5 px-3 text-right text-slate-700">360,79 EUR</td>
                <td className="py-2.5 px-3 text-right text-slate-700">360,79 EUR</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-3 text-slate-600">Cuisson et eau chaude : kWh moyen</td>
                <td className="py-2.5 px-3 text-right text-slate-700">0,17832 EUR</td>
                <td className="py-2.5 px-3 text-right text-slate-700">0,19027 EUR</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-3 text-slate-600">Cuisson et eau chaude : abonnement par an</td>
                <td className="py-2.5 px-3 text-right text-slate-700">152,46 EUR</td>
                <td className="py-2.5 px-3 text-right text-slate-700">152,46 EUR</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400">
          Source : CRE, prix repère de vente de gaz naturel pour les clients résidentiels (grilles d&apos;octobre et de
          novembre 2026). Le simulateur est réglé sur octobre 2026. Pour un autre mois ou pour
          votre contrat, multipliez vos kWh par le prix du kWh TTC de votre facture et ajoutez l&apos;abonnement.
        </p>

        <h3 className="font-bold text-slate-800 mt-6">
          Conseils pour diminuer sa consommation de gaz
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>
            Régler le chauffage selon la pièce et le moment (19 °C dans les pièces de vie occupées, 17 °C dans la chambre la nuit
            d&apos;après l&apos;ADEME). Baisser de 1 °C fait environ 7 % de consommation en moins.
          </li>
          <li>
            Faire entretenir votre chaudière chaque année (révision annuelle obligatoire pour les chaudières gaz)
          </li>
          <li>
            Installer une tête thermostatique sur chaque radiateur pour ajuster pièce par pièce
          </li>
          <li>
            Isoler les combles et les murs pour réduire les besoins de chauffage
          </li>
          <li>
            Comparer les offres sur le comparateur du Médiateur national de l&apos;énergie{" "}
            <strong>energie-info.fr</strong>
          </li>
        </ul>
        <p className="text-slate-600 leading-relaxed">
          Si vous vous chauffez à l&apos;électricité, regardez aussi{" "}
          <a href="/combien-consomme-un-radiateur-electrique" className="text-orange-600 hover:underline font-medium">
            combien consomme un radiateur électrique
          </a>
          .
        </p>
      </section>

      <HowToJsonLd
        name="Estimer sa facture de gaz naturel"
        steps={[
          { name: "Choisir l'usage du gaz", text: "Sélectionner l'usage (cuisson, eau chaude ou chauffage) et, pour le chauffage, la surface du logement. Le simulateur propose une consommation indicative en kWh par an." },
          { name: "Saisir la consommation annuelle en kWh", text: "Indiquer la consommation annuelle lue sur la facture ou estimée selon l'usage. Les valeurs proposées par le simulateur sont des ordres de grandeur, pas des valeurs officielles." },
          { name: "Choisir le prix du kWh", text: "Garder le prix repère moyen de la CRE d'octobre 2026 (0,14557 EUR le kWh TTC pour le chauffage) ou choisir le bas ou le haut de la fourchette." },
          { name: "Lire la facture estimée", text: "Le résultat affiche la facture annuelle et mensuelle TTC : abonnement, consommation, CTA, TICGN et TVA à 20 %. Comparer ensuite les offres sur energie-info.fr." },
        ]}
      />

      <AmazonReco page="simulateur-facture-gaz" />

      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentSlug="/simulateur-facture-gaz" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
