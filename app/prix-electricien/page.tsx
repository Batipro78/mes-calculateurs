import type { Metadata } from "next";
import EstimateurElectricien from "./EstimateurElectricien";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import VillesLinks from "../components/VillesLinks";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/prix-electricien" },
  title: "Prix Electricien 2026 : Estimateur en Ligne - Tarifs par Prestation",
  description:
    "Estimez le prix d'un electricien en 2026. Tarifs : prise, tableau electrique, renovation, VMC, borne IRVE, volet roulant. Fournitures + main d'oeuvre par region. Gratuit.",
  keywords:
    "prix electricien, tarif electricien 2026, cout electricien, prix installation electrique, prix tableau electrique, prix prise electrique, prix borne recharge, devis electricien",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quel est le tarif horaire moyen d'un électricien en 2026 ?",
    a: "Le tarif horaire d'un électricien varie de 35 à 80 € TTC selon la région et la complexité. En Île-de-France, comptez 70 à 80 €/h contre 35 à 65 €/h en province. Les interventions le week-end ou en urgence coûtent 10 à 15 € de plus par heure.",
  },
  {
    q: "Combien coûte une rénovation électrique complète ?",
    a: "Une rénovation électrique complète coûte entre 90 et 200 €/m² en 2026. Pour une maison de 100 m², le budget se situe entre 9 000 € et 20 000 € TTC, selon l'état de l'installation existante et le niveau de prestation souhaité.",
  },
  {
    q: "Quel est le prix d'installation d'une borne de recharge IRVE ?",
    a: "L'installation d'une borne de recharge IRVE (7,4 kW) coûte entre 1 500 € et 2 500 € TTC, installation comprise. La TVA est réduite à 5,5 % pour les logements de plus de 2 ans, et la prime Advenir peut couvrir une partie du coût. L'installation doit être réalisée par un électricien certifié IRVE.",
  },
  {
    q: "Quelle TVA pour les travaux d'électricité ?",
    a: "La TVA est de 10 % pour les travaux de rénovation électrique dans un logement de plus de 2 ans. Pour l'installation d'une borne IRVE, la TVA est réduite à 5,5 %. Pour une construction neuve, la TVA reste à 20 %.",
  },
  {
    q: "Faut-il faire appel à un électricien certifié ?",
    a: "Pour la plupart des travaux, une qualification reconnue (comme Qualifelec) est un gage de sérieux. Elle devient indispensable dans certains cas : la pose d'une borne de recharge de plus de 3,7 kW exige un électricien certifié IRVE, et toute nouvelle installation doit recevoir l'attestation de conformité Consuel avant la mise sous tension.",
  },
  {
    q: "Comment réduire le coût de ses travaux électriques ?",
    a: "Trois leviers principaux : demandez au moins trois devis détaillés pour comparer, regroupez vos travaux en une seule intervention pour limiter les déplacements, et vérifiez votre éligibilité aux aides (TVA réduite à 10 % ou 5,5 %, prime Advenir pour une borne, MaPrimeRénov' pour la VMC). Fournir vous-même certaines fournitures peut aussi faire baisser la facture.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Prix Electricien 2026" />
      <Breadcrumb currentPage="Prix Electricien" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {"⚡"}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Prix Electricien 2026 : Estimateur en Ligne
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez le cout de vos travaux d&apos;electricite. 10 prestations, prix fournitures + main d&apos;oeuvre, ajuste par region.
      </p>

      <EstimateurElectricien />


      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment estimer le prix d&apos;un electricien en 2026 ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>prix d&apos;un electricien</strong> depend de la prestation (installation, renovation, mise aux normes), du nombre de points electriques et de votre <strong>localisation geographique</strong>. En Ile-de-France, les tarifs sont en moyenne 25% plus eleves qu&apos;en province.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les prestations les plus demandees
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les travaux les plus courants sont l&apos;<strong>installation de prises electriques</strong> (50-150 &euro;/unite), le <strong>remplacement du tableau electrique</strong> (800-2 000 &euro;) et la <strong>renovation electrique complete</strong> (90-200 &euro;/m&sup2;). La <strong>borne de recharge IRVE</strong> est en forte demande avec un cout de 1 500 a 2 500 &euro;.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Fournitures vs main d&apos;oeuvre
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          En electricite, la repartition varie selon la prestation. Pour une <strong>installation de prises</strong>, la main d&apos;oeuvre represente 70% du cout. Pour les <strong>radiateurs electriques</strong>, les fournitures representent 60 a 80%. Pour une <strong>borne IRVE</strong>, c&apos;est environ 50/50.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Impact de la region sur les prix
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Ile-de-France</span>
            <span className="text-sm font-bold text-slate-800">+25% vs province</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Grandes villes (Lyon, Marseille...)</span>
            <span className="text-sm font-bold text-slate-800">+10% vs province</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Province</span>
            <span className="text-sm font-bold text-slate-800">Prix de reference</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Zone rurale</span>
            <span className="text-sm font-bold text-slate-800">-10% vs province</span>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Norme NF C 15-100 et aides
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Toute installation electrique doit respecter la <strong>norme NF C 15-100</strong> (version 2024). Pour les travaux de renovation dans un logement de plus de 2 ans, la TVA est reduite a <strong>10%</strong>. L&apos;installation d&apos;une borne IRVE beneficie d&apos;une TVA a <strong>5,5%</strong> et d&apos;un credit d&apos;impot de <strong>300 &euro;</strong>. Pensez egalement a <strong>MaPrimeRenov&apos;</strong> pour la VMC.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Budget global de vos travaux
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Pour planifier vos travaux electriques, pensez a estimer le <strong>budget global</strong> : utilisez notre <a href="/simulateur-pret-immobilier" className="text-blue-600 underline hover:text-blue-800">simulateur de pret immobilier</a> pour calculer vos mensualites, verifiez votre <a href="/calcul-capacite-emprunt" className="text-blue-600 underline hover:text-blue-800">capacite d&apos;emprunt</a> et estimez les <a href="/frais-de-notaire" className="text-blue-600 underline hover:text-blue-800">frais de notaire</a> si vous achetez un bien a renover. Si vous prevoyez d&apos;autres travaux, consultez aussi nos estimateurs <a href="/prix-chauffagiste" className="text-blue-600 underline hover:text-blue-800">prix chauffagiste</a>, <a href="/prix-plombier" className="text-blue-600 underline hover:text-blue-800">prix plombier</a> et <a href="/prix-peintre" className="text-blue-600 underline hover:text-blue-800">prix peintre</a>.
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-base font-bold text-slate-800 mb-2">
          Méthode et sources
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          Les montants affichés sont des fourchettes indicatives, basées sur les
          tarifs couramment observés sur le marché français en 2026 ; le prix
          réel dépend de chaque chantier et ne remplace pas un devis. Règles de
          TVA sur{" "}
          <a
            href="https://www.service-public.fr"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-blue-600 hover:underline"
          >
            service-public.fr
          </a>
          , prime borne de recharge sur{" "}
          <a
            href="https://advenir.mobi"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-blue-600 hover:underline"
          >
            advenir.mobi
          </a>{" "}
          et aides à la rénovation sur{" "}
          <a
            href="https://www.maprimerenov.gouv.fr"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-blue-600 hover:underline"
          >
            maprimerenov.gouv.fr
          </a>
          .
        </p>
      </section>

      <VillesLinks metierSlug="/prix-electricien" />
      <RelatedCalculators currentSlug="/prix-electricien" />
    </div>
  );
}
