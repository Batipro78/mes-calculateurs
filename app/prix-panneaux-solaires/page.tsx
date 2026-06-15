import type { Metadata } from "next";
import EstimateurSolaire from "./EstimateurSolaire";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import VillesLinks from "../components/VillesLinks";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/prix-panneaux-solaires" },
  title: "Prix Panneaux Solaires 2026 : Estimateur en Ligne - Tarifs Photovoltaique",
  description:
    "Estimez le prix d'une installation photovoltaique en 2026. Tarifs : panneaux 3, 6, 9 kWc, batterie domestique, solaire thermique, onduleur, carport, nettoyage, audit. Fournitures + main d'oeuvre par region.",
  keywords:
    "prix panneaux solaires, tarif photovoltaique 2026, cout installation solaire, prix batterie domestique, prix carport solaire, prix solaire thermique, devis panneaux solaires",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quel est le prix d'une installation photovoltaïque 3 kWc en 2026 ?",
    a: "Une installation photovoltaïque 3 kWc (~9 panneaux) coûte entre 8 000 et 12 000 € TTC en 2026, pose comprise. Ce prix varie selon la marque des panneaux, la complexité de la toiture et la région. La prime à l'autoconsommation (~80 €/kWc) et la TVA réduite à 10 % permettent de réduire la facture finale.",
  },
  {
    q: "Combien coûte une batterie domestique pour panneaux solaires ?",
    a: "Une batterie domestique 5 kWh coûte entre 5 000 et 8 000 € TTC pose, une 10 kWh entre 8 000 et 13 000 €. Le couplage panneaux + batterie permet d'augmenter le taux d'autoconsommation de 30 % à 70 % et de stocker le surplus produit en journée pour la soirée.",
  },
  {
    q: "Quelles aides pour les panneaux solaires en 2026 ?",
    a: "Les installations photovoltaïques en autoconsommation jusqu'à 9 kWc bénéficient de la prime à l'autoconsommation (~80 €/kWc pour 3 kWc, dégressive), de la TVA réduite à 10 % (installation ≤ 3 kWc) et du tarif d'achat du surplus par EDF OA garanti 20 ans. L'installateur doit être certifié RGE QualiPV.",
  },
  {
    q: "Quelle est la durée d'amortissement de panneaux solaires ?",
    a: "Une installation photovoltaïque 3 kWc en autoconsommation avec revente du surplus s'amortit en 8 à 12 ans selon l'ensoleillement, le taux d'autoconsommation et le prix de l'électricité. Les panneaux durent 25 à 30 ans avec une perte de rendement de 0,5 %/an, soit 10 à 18 ans de production rentable après amortissement.",
  },
  {
    q: "Comment bien comparer les devis de panneaux solaires ?",
    a: "Demandez au moins trois devis détaillés et comparez-les ligne par ligne : vérifiez la puissance installée (en kWc), la marque et le rendement des panneaux et de l'onduleur, le détail pose comprise, ainsi que les garanties (produit et production). Méfiez-vous des offres de démarchage agressif et des promesses de rentabilité trop belles.",
  },
  {
    q: "Quelles aides pour réduire le coût de panneaux solaires ?",
    a: "Une installation en autoconsommation bénéficie de la prime à l'autoconsommation versée par EDF OA, d'un tarif de rachat du surplus, et d'une TVA réduite à 10 % pour les installations jusqu'à 9 kWc (sous conditions). Faire appel à un installateur RGE est généralement exigé pour ouvrir droit à ces dispositifs.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Prix Panneaux Solaires 2026" />
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

      <Faq items={FAQ_ITEMS} />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-base font-bold text-slate-800 mb-2">
          Méthode et sources
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          Les montants affichés sont des fourchettes indicatives, basées sur les
          tarifs couramment observés sur le marché français en 2026 ; le prix
          réel dépend de chaque installation et ne remplace pas un devis. Aides
          et tarifs de rachat sur{" "}
          <a
            href="https://www.service-public.fr"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-blue-600 hover:underline"
          >
            service-public.fr
          </a>
          .
        </p>
      </section>

      <RelatedCalculators currentSlug="/prix-panneaux-solaires" />
    </div>
  );
}
