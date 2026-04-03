import type { Metadata } from "next";
import EstimateurElectricien from "./EstimateurElectricien";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import VillesLinks from "../components/VillesLinks";

export const metadata: Metadata = {
  title: "Prix Electricien 2026 : Estimateur en Ligne - Tarifs par Prestation",
  description:
    "Estimez le prix d'un electricien en 2026. Tarifs : prise, tableau electrique, renovation, VMC, borne IRVE, volet roulant. Fournitures + main d'oeuvre par region. Gratuit.",
  keywords:
    "prix electricien, tarif electricien 2026, cout electricien, prix installation electrique, prix tableau electrique, prix prise electrique, prix borne recharge, devis electricien",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Prix Electricien 2026" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quel est le tarif horaire moyen d'un electricien en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le tarif horaire d'un electricien varie de 35 a 80 € TTC selon la region et la complexite. En Ile-de-France, comptez 70 a 80 €/h contre 35 a 65 €/h en province. Les interventions le week-end ou en urgence coutent 10 a 15 € de plus par heure.",
                },
              },
              {
                "@type": "Question",
                name: "Combien coute une renovation electrique complete ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Une renovation electrique complete coute entre 90 et 200 €/m² en 2026. Pour une maison de 100 m², le budget se situe entre 9 000 € et 20 000 € TTC, selon l'etat de l'installation existante et le niveau de prestation souhaite.",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le prix d'installation d'une borne de recharge IRVE ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'installation d'une borne de recharge IRVE (7,4 kW) coute entre 1 500 € et 2 500 € TTC, installation comprise. La TVA est reduite a 5,5% pour les logements de plus de 2 ans. Un credit d'impot de 300 € est disponible. L'installation doit etre realisee par un electricien certifie IRVE.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle TVA pour les travaux d'electricite ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La TVA est de 10% pour les travaux de renovation electrique dans un logement de plus de 2 ans. Pour l'installation d'une borne IRVE, la TVA est reduite a 5,5%. Pour une construction neuve, la TVA reste a 20%.",
                },
              },
            ],
          }),
        }}
      />
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

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

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

      <VillesLinks metierSlug="/prix-electricien" />
      <RelatedCalculators currentSlug="/prix-electricien" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
