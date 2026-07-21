import type { Metadata } from "next";
import EstimateurCouvreur from "./EstimateurCouvreur";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import VillesLinks from "../components/VillesLinks";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";
import CTAMonDevisMinute from "../components/CTAMonDevisMinute";

export const metadata: Metadata = {
  alternates: { canonical: "/prix-couvreur" },
  title: "Prix Couvreur 2026 : Estimateur en Ligne - Tarifs par Prestation",
  description:
    "Estimez le prix d'un couvreur en 2026. Tarifs : reparation, renovation toiture, demoussage, isolation sarking, Velux, gouttiere, charpente, zinguerie. Fournitures + main d'oeuvre par region.",
  keywords:
    "prix couvreur, tarif couvreur 2026, cout toiture, prix renovation toiture, prix demoussage toiture, prix isolation sarking, prix velux, devis couvreur",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quel est le tarif horaire moyen d'un couvreur en 2026 ?",
    a: "Le tarif horaire d'un couvreur varie de 40 \u00e0 60 \u20ac HT en province et de 50 \u00e0 90 \u20ac HT en \u00cele-de-France. Le prix de l'\u00e9chafaudage (10-15 \u20ac/m\u00b2) s'ajoute en suppl\u00e9ment. Les interventions en urgence (temp\u00eate, fuite) sont major\u00e9es de 30 \u00e0 100 %.",
  },
  {
    q: "Combien co\u00fbte une r\u00e9novation de toiture compl\u00e8te ?",
    a: "La r\u00e9novation d'une toiture compl\u00e8te co\u00fbte entre 130 et 300 \u20ac/m\u00b2 TTC en 2026, soit 13 000 \u00e0 30 000 \u20ac pour 100 m\u00b2. Ce prix inclut la d\u00e9pose de l'ancienne couverture, la fourniture des mat\u00e9riaux (tuiles, ardoise) et la main d'\u0153uvre de pose.",
  },
  {
    q: "Quel est le prix du d\u00e9moussage de toiture ?",
    a: "Le d\u00e9moussage de toiture co\u00fbte entre 10 et 40 \u20ac/m\u00b2 TTC en 2026. Pour une toiture de 100 m\u00b2, comptez 1 000 \u00e0 4 000 \u20ac. Le prix varie selon le produit utilis\u00e9 (anti-mousse, hydrofuge) et l'accessibilit\u00e9 du toit.",
  },
  {
    q: "Quelles aides pour la r\u00e9novation de toiture en 2026 ?",
    a: "L'isolation de toiture (sarking, combles) b\u00e9n\u00e9ficie de MaPrimeR\u00e9nov' (jusqu'\u00e0 75 \u20ac/m\u00b2 selon revenus), d'une TVA \u00e0 5,5 % et de l'\u00e9co-pr\u00eat \u00e0 taux z\u00e9ro. La r\u00e9novation simple (hors isolation) b\u00e9n\u00e9ficie d'une TVA \u00e0 10 % pour les logements de plus de 2 ans.",
  },
  {
    q: "Comment bien comparer les devis de couvreur ?",
    a: "Demandez au moins trois devis d\u00e9taill\u00e9s et comparez-les ligne par ligne : v\u00e9rifiez qu'ils portent sur la m\u00eame surface de toiture et les m\u00eames mat\u00e9riaux, distinguent la main d'\u0153uvre des fournitures, incluent l'\u00e9chafaudage et l'\u00e9vacuation des gravats, et pr\u00e9cisent les garanties. Un devis anormalement bas cache souvent des postes oubli\u00e9s.",
  },
  {
    q: "Comment r\u00e9duire le co\u00fbt de ses travaux de toiture ?",
    a: "Trois leviers : regrouper les travaux (couverture, isolation, zinguerie) en une seule intervention, comparer plusieurs devis, et v\u00e9rifier votre \u00e9ligibilit\u00e9 \u00e0 la TVA r\u00e9duite (10 % en r\u00e9novation d'un logement de plus de 2 ans, voire 5,5 % pour l'isolation de toiture). Planifier le chantier hors p\u00e9riode de forte demande peut aussi faire baisser le prix.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Prix Couvreur 2026" />
      <Breadcrumb currentPage="Prix Couvreur" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-700 to-amber-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {"\ud83e\ude9c"}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Prix Couvreur 2026 : Estimateur en Ligne
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez le cout de vos travaux de toiture. 10 prestations, prix fournitures + main d&apos;oeuvre, ajuste par region.
      </p>

      <EstimateurCouvreur />


      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment estimer le prix d&apos;un couvreur en 2026 ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>prix d&apos;un couvreur</strong> depend de la nature de l&apos;intervention (reparation, renovation complete, isolation), du type de couverture (tuiles, ardoise, zinc) et de votre <strong>localisation geographique</strong>. En Ile-de-France, les tarifs sont en moyenne 20% plus eleves qu&apos;en province.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les prestations les plus demandees
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les interventions les plus courantes sont le <strong>demoussage de toiture</strong> (10-40 &euro;/m&sup2;), la <strong>reparation de toiture</strong> (40-100 &euro;/m&sup2;) et la <strong>pose de gouttiere</strong> (30-95 &euro;/ml). Pour une <strong>renovation complete</strong>, le budget demarre a 130 &euro;/m&sup2;.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Fournitures vs main d&apos;oeuvre
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          En couverture, la repartition varie selon la prestation. Pour un <strong>demoussage</strong>, c&apos;est environ 80% main d&apos;oeuvre. Pour une <strong>renovation complete</strong>, les materiaux (tuiles, ardoise) representent 50-60% du cout. Pour l&apos;<strong>isolation sarking</strong>, les fournitures sont preponderantes (70%).
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
          TVA et aides pour vos travaux de toiture
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Les travaux de <strong>renovation de toiture dans un logement de plus de 2 ans</strong> beneficient d&apos;une TVA a 10%. Les travaux d&apos;<strong>isolation</strong> (sarking, combles) beneficient d&apos;une TVA a 5,5% et sont eligibles a <strong>MaPrimeRenov&apos;</strong> (jusqu&apos;a 75 &euro;/m&sup2;) et a l&apos;eco-pret a taux zero.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Budget global de vos travaux
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Pour planifier vos travaux de toiture, pensez a estimer le <strong>budget global</strong> : utilisez notre <a href="/simulateur-pret-immobilier" className="text-red-600 underline hover:text-red-800">simulateur de pret immobilier</a> pour calculer vos mensualites, verifiez votre <a href="/calcul-capacite-emprunt" className="text-red-600 underline hover:text-red-800">capacite d&apos;emprunt</a> et estimez les <a href="/frais-de-notaire" className="text-red-600 underline hover:text-red-800">frais de notaire</a> si vous achetez un bien a renover. Pour une renovation complete, consultez aussi <a href="/prix-chauffagiste" className="text-red-600 underline hover:text-red-800">prix chauffagiste</a>, <a href="/prix-electricien" className="text-red-600 underline hover:text-red-800">prix electricien</a> et <a href="/prix-macon" className="text-red-600 underline hover:text-red-800">prix macon</a>.
        </p>
      </section>

      <VillesLinks metierSlug="/prix-couvreur" />

      <HowToJsonLd
        name="Estimer le prix d'une intervention de couvreur"
        steps={[
          { name: "Choisir la prestation", text: "Sélectionner parmi les 10 types de travaux : reparation de tuiles, rénovation complète (130-300 EUR/m2), demoussage (10-40 EUR/m2), isolation sarking, pose de Velux, gouttiere (30-95 EUR/ml), zinguerie, etc." },
          { name: "Saisir la surface ou la longueur", text: "Indiquer la surface en m2 pour la rénovation ou le demoussage (ex : 100 m2 de toiture), ou la longueur en mètres lineaires pour les gouttieres (ex : 30 ml). L'echafaudage est inclus dans la plupart des prestations." },
          { name: "Sélectionner la region", text: "Appliquer le coefficient : Ile-de-France (+20 %), grandes villes (+10 %), province (référence), rural (-10 %). Ex : demoussage 100 m2 en province = 1 000 à 4 000 EUR ; en Ile-de-France = 1 200 à 4 800 EUR." },
          { name: "Identifier les aides disponibles", text: "La rénovation simple beneficie d'une TVA à 10 % pour les logements de plus de 2 ans. L'isolation de toiture (sarking, combles) beneficie d'une TVA à 5,5 % et de MaPrimeRenov' (jusqu'à 75 EUR/m2 selon les revenus)." },
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
        campaign="prix-couvreur"
        variant="devis"
        guide={{ href: "/guides/devis-signe-valeur-juridique", label: "Devis signé : ce qui vous engage vraiment" }}
      />

      <RelatedCalculators currentSlug="/prix-couvreur" />
    </div>
  );
}
