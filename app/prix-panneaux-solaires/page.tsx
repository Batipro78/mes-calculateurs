import type { Metadata } from "next";
import EstimateurSolaire from "./EstimateurSolaire";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import VillesLinks from "../components/VillesLinks";

export const metadata: Metadata = {
  alternates: { canonical: "/prix-panneaux-solaires" },
  title: "Prix Panneaux Solaires 2026 : Estimateur en Ligne - Tarifs Photovoltaique",
  description:
    "Estimez le prix d'une installation photovoltaique en 2026. Tarifs : panneaux 3, 6, 9 kWc, batterie domestique, solaire thermique, onduleur, carport, nettoyage, audit. Fournitures + main d'oeuvre par region.",
  keywords:
    "prix panneaux solaires, tarif photovoltaique 2026, cout installation solaire, prix batterie domestique, prix carport solaire, prix solaire thermique, devis panneaux solaires",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Prix Panneaux Solaires 2026" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quel est le prix d'une installation photovoltaique 3 kWc en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Une installation photovoltaique 3 kWc (~9 panneaux) coute entre 8 000 et 12 000 € TTC en 2026, pose comprise. Ce prix varie selon la marque des panneaux, la complexite de la toiture et la region. La prime a l'autoconsommation (~80 €/kWc) et la TVA reduite a 10% permettent de reduire la facture finale.",
                },
              },
              {
                "@type": "Question",
                name: "Combien coute une batterie domestique pour panneaux solaires ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Une batterie domestique 5 kWh coute entre 5 000 et 8 000 € TTC pose, une 10 kWh entre 8 000 et 13 000 €. Le couplage panneaux + batterie permet d'augmenter le taux d'autoconsommation de 30% a 70% et de stocker le surplus produit en journee pour la soiree.",
                },
              },
              {
                "@type": "Question",
                name: "Quelles aides pour les panneaux solaires en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les installations photovoltaiques en autoconsommation jusqu'a 9 kWc beneficient de la prime a l'autoconsommation (~80 €/kWc pour 3 kWc, degressive), de la TVA reduite a 10% (installation ≤ 3 kWc) et du tarif d'achat du surplus par EDF OA garanti 20 ans. L'installateur doit etre certifie RGE QualiPV.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la duree d'amortissement de panneaux solaires ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Une installation photovoltaique 3 kWc en autoconsommation avec revente du surplus s'amortit en 8 a 12 ans selon l'ensoleillement, le taux d'autoconsommation et le prix de l'electricite. Les panneaux durent 25 a 30 ans avec une perte de rendement de 0,5%/an, soit 10 a 18 ans de production rentable apres amortissement.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Prix Panneaux Solaires" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {"☀️"}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Prix Panneaux Solaires 2026 : Estimateur en Ligne
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez le cout d&apos;une installation photovoltaique. 10 prestations, prix fournitures + main d&apos;oeuvre, ajuste par region.
      </p>

      <EstimateurSolaire />


      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment estimer le prix d&apos;une installation photovoltaique en 2026 ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>prix de panneaux solaires</strong> depend de la <strong>puissance installee</strong> (en kWc), du type d&apos;equipement (panneaux seuls, avec batterie, solaire thermique) et de votre <strong>localisation geographique</strong>. En Ile-de-France, les tarifs sont en moyenne 20% plus eleves qu&apos;en province en raison du cout de la main d&apos;oeuvre et de la logistique.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les puissances les plus installees
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les installations residentielles les plus frequentes sont en <strong>3 kWc</strong> (~9 panneaux, 8 000-12 000 &euro;) pour une consommation modeste, <strong>6 kWc</strong> (~18 panneaux, 14 000-20 000 &euro;) pour une famille moyenne, et <strong>9 kWc</strong> (~27 panneaux, 20 000-28 000 &euro;) pour une grande maison ou un projet avec pompe a chaleur et voiture electrique.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Fournitures vs main d&apos;oeuvre
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour les <strong>installations photovoltaiques</strong>, les fournitures (panneaux, onduleur, structure) representent 65-75% du budget total. La <strong>main d&apos;oeuvre</strong> (pose, raccordement, demarches administratives) represente 25-35%. Pour le <strong>nettoyage / demoussage</strong> ou un <strong>audit a domicile</strong>, c&apos;est l&apos;inverse : la main d&apos;oeuvre represente 80-90% du cout.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Impact de la region sur les prix
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Ile-de-France</span>
            <span className="text-sm font-bold text-slate-800">+20% vs province</span>
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
          TVA et aides pour vos panneaux solaires
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Les installations <strong>en autoconsommation jusqu&apos;a 3 kWc</strong> beneficient d&apos;une TVA reduite a 10%. Au-dela (6-9 kWc), la TVA est de 20%. Toutes les installations en autoconsommation jusqu&apos;a 9 kWc sont eligibles a la <strong>prime a l&apos;autoconsommation</strong> (~80 &euro;/kWc pour 3 kWc) et au <strong>tarif d&apos;achat du surplus</strong> garanti 20 ans par EDF OA. L&apos;artisan doit etre <strong>certifie RGE QualiPV</strong>.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Budget global de vos travaux
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Pour planifier votre projet solaire, pensez a estimer le <strong>budget global</strong> : utilisez notre <a href="/simulateur-pret-immobilier" className="text-amber-600 underline hover:text-amber-800">simulateur de pret immobilier</a> pour calculer vos mensualites (eco-PTZ jusqu&apos;a 50 000 &euro;), verifiez votre <a href="/calcul-capacite-emprunt" className="text-amber-600 underline hover:text-amber-800">capacite d&apos;emprunt</a> et simulez votre <a href="/calcul-consommation-electrique" className="text-amber-600 underline hover:text-amber-800">consommation electrique</a> pour dimensionner l&apos;installation. Si vous prevoyez d&apos;autres travaux, consultez aussi nos estimateurs <a href="/prix-chauffagiste" className="text-amber-600 underline hover:text-amber-800">prix chauffagiste</a>, <a href="/prix-electricien" className="text-amber-600 underline hover:text-amber-800">prix electricien</a> et <a href="/prix-couvreur" className="text-amber-600 underline hover:text-amber-800">prix couvreur</a>.
        </p>
      </section>

      <VillesLinks metierSlug="/prix-panneaux-solaires" />

      <RelatedCalculators currentSlug="/prix-panneaux-solaires" />
    </div>
  );
}
