import type { Metadata } from "next";
import EstimateurMacon from "./EstimateurMacon";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import VillesLinks from "../components/VillesLinks";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";
import CTAMonDevisMinute from "../components/CTAMonDevisMinute";

export const metadata: Metadata = {
  alternates: { canonical: "/prix-macon" },
  title: "Prix Macon 2026 : Estimateur en Ligne - Tarifs au m\u00b2",
  description:
    "Estimez le prix d'un macon en 2026. Tarifs au m\u00b2 : mur parpaings, dalle beton, terrasse, facade, demolition. Fournitures + main d'oeuvre par region. Gratuit.",
  keywords:
    "prix macon, tarif macon 2026, cout macon m2, prix mur parpaings, prix dalle beton, prix terrasse beton, prix ravalement facade, devis macon",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quel est le prix moyen d'un maçon au m² en 2026 ?",
    a: "Le prix d'un maçon varie de 25 €/m² (chape béton) à 150 €/m² (terrasse béton) selon la prestation. Un mur en parpaings coûte en moyenne 50 à 80 €/m² fournitures et main d'œuvre comprises. En Île-de-France, comptez 25 % de plus.",
  },
  {
    q: "Combien coûte une ouverture dans un mur porteur ?",
    a: "Une ouverture dans un mur porteur coûte entre 1 500 € et 4 000 € en forfait, incluant l'étude de structure, la pose d'un IPN et la finition. Ce prix varie selon l'épaisseur du mur et la taille de l'ouverture.",
  },
  {
    q: "Quelle TVA pour les travaux de maçonnerie ?",
    a: "La TVA est de 10 % pour les travaux de rénovation dans un logement de plus de 2 ans (au lieu de 20 %). Pour une construction neuve ou un agrandissement, la TVA reste à 20 %.",
  },
  {
    q: "Comment bien comparer les devis de maçon ?",
    a: "Demandez au moins trois devis détaillés et comparez-les ligne par ligne : vérifiez qu'ils portent sur les mêmes prestations, distinguent la main d'œuvre des fournitures, indiquent les quantités et le taux de TVA, et précisent délais et garanties. Un devis anormalement bas cache souvent des prestations manquantes.",
  },
  {
    q: "Comment réduire le coût de ses travaux de maçonnerie ?",
    a: "Trois leviers : regrouper plusieurs travaux en une seule intervention pour limiter les déplacements, comparer plusieurs devis, et vérifier votre éligibilité à la TVA réduite (10 % en rénovation d'un logement de plus de 2 ans, voire 5,5 % pour les travaux d'amélioration énergétique). Anticiper le chantier hors saison de forte demande peut aussi jouer sur le prix.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Prix Macon 2026" />
      <Breadcrumb currentPage="Prix Macon" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {"\ud83e\uddf1"}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Prix Macon 2026 : Estimateur en Ligne
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez le cout de vos travaux de maconnerie. 10 prestations, prix fournitures + main d&apos;oeuvre, ajuste par region.
      </p>

      <EstimateurMacon />


      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment estimer le prix d&apos;un macon en 2026 ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>prix d&apos;un macon</strong> depend de plusieurs facteurs : le type de prestation (construction, renovation, demolition), la surface en m&sup2; ou en metres lineaires, et votre <strong>localisation geographique</strong>. En Ile-de-France, les tarifs sont en moyenne 25% plus eleves qu&apos;en province.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les prestations les plus demandees
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les travaux les plus courants sont la <strong>construction de mur en parpaings</strong> (50-80 &euro;/m&sup2;), la <strong>dalle beton</strong> (60-120 &euro;/m&sup2;) et le <strong>ravalement de facade</strong> (30-100 &euro;/m&sup2;). Pour une <strong>ouverture dans un mur porteur</strong>, comptez un forfait de 1 500 a 4 000 &euro; selon la complexite.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Fournitures vs main d&apos;oeuvre
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          En maconnerie, la <strong>main d&apos;oeuvre represente generalement 60 a 70%</strong> du cout total. Les fournitures (parpaings, beton, enduit) sont relativement bon marche, mais le savoir-faire du macon fait la difference sur la qualite et la durabilite des travaux.
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
          TVA et aides pour vos travaux
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Les travaux de <strong>renovation dans un logement de plus de 2 ans</strong> beneficient d&apos;une TVA reduite a 10%. Pour des travaux d&apos;amelioration energetique (isolation par l&apos;exterieur), la TVA peut descendre a 5,5%. Pensez egalement aux aides MaPrimeRenov&apos; et aux eco-prets a taux zero pour financer vos travaux.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Budget global de vos travaux
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Pour planifier vos travaux de maconnerie, pensez a estimer le <strong>budget global</strong> : utilisez notre <a href="/simulateur-pret-immobilier" className="text-amber-600 underline hover:text-amber-800">simulateur de pret immobilier</a> pour calculer vos mensualites, verifiez votre <a href="/calcul-capacite-emprunt" className="text-amber-600 underline hover:text-amber-800">capacite d&apos;emprunt</a> et estimez les <a href="/frais-de-notaire" className="text-amber-600 underline hover:text-amber-800">frais de notaire</a> si vous achetez un bien a renover. Pour une renovation complete, consultez aussi nos estimateurs <a href="/prix-electricien" className="text-amber-600 underline hover:text-amber-800">prix electricien</a>, <a href="/prix-plombier" className="text-amber-600 underline hover:text-amber-800">prix plombier</a> et <a href="/prix-peintre" className="text-amber-600 underline hover:text-amber-800">prix peintre</a>.
        </p>
      </section>

      <VillesLinks metierSlug="/prix-macon" />

      <HowToJsonLd
        name="Estimer le prix d'une intervention de macon"
        steps={[
          { name: "Choisir la prestation", text: "Sélectionner parmi les 10 types de travaux : mur en parpaings (50-80 EUR/m2), dalle beton (60-120 EUR/m2), chape (25-40 EUR/m2), terrasse beton (80-150 EUR/m2), ravalement de facade (30-100 EUR/m2), ouverture dans un mur porteur (1 500-4 000 EUR forfait), etc." },
          { name: "Saisir la surface", text: "Indiquer la surface en m2 pour la plupart des prestations (ex : 50 m2 de mur en parpaings, 20 m2 de dalle beton, 80 m2 de ravalement). Pour une ouverture dans un mur porteur, c'est un forfait independant de la surface." },
          { name: "Sélectionner la region", text: "Appliquer le coefficient : Ile-de-France (+25 %), grandes villes (+10 %), province (référence), rural (-10 %). Ex : mur parpaings 50 m2 en province = 2 500 à 4 000 EUR, en Ile-de-France = 3 125 à 5 000 EUR." },
          { name: "Lire la fourchette et la TVA", text: "La main d'oeuvre représente 60 à 70 % du total en maconnerie. Les travaux de rénovation dans un logement de plus de 2 ans beneficient d'une TVA à 10 %. L'isolation par l'exterieur peut ouvrir droit à la TVA à 5,5 % et à MaPrimeRenov'." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-base font-bold text-slate-800 mb-2">
          Méthode et sources
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          Les montants affichés sont des fourchettes indicatives, basées sur les
          tarifs couramment observés sur le marché français en 2026 ; le prix
          réel dépend de chaque chantier et ne remplace pas un devis. Règles de
          TVA des travaux sur{" "}
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

      <CTAMonDevisMinute
        campaign="prix-macon"
        variant="devis"
        guide={{ href: "/guides/chiffrer-un-devis-btp", label: "Chiffrer un devis BTP sans se planter" }}
      />

      <RelatedCalculators currentSlug="/prix-macon" />
    </div>
  );
}
