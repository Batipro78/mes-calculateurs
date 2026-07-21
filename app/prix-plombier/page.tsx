import type { Metadata } from "next";
import EstimateurPlombier from "./EstimateurPlombier";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import VillesLinks from "../components/VillesLinks";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";
import CTAMonDevisMinute from "../components/CTAMonDevisMinute";

export const metadata: Metadata = {
  alternates: { canonical: "/prix-plombier" },
  title: "Prix Plombier 2026 : Estimateur en Ligne - Tarifs par Prestation",
  description:
    "Estimez le prix d'un plombier en 2026. Tarifs : robinet, WC, chauffe-eau, douche, baignoire, debouchage, chaudiere, salle de bain. Fournitures + main d'oeuvre par region.",
  keywords:
    "prix plombier, tarif plombier 2026, cout plombier, prix installation salle de bain, prix chauffe-eau, prix debouchage, prix chaudiere gaz, devis plombier",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quel est le tarif horaire moyen d'un plombier en 2026 ?",
    a: "Le tarif horaire d'un plombier varie de 40 à 80 € HT en province et de 70 à 140 € HT en Île-de-France. Le déplacement est facturé entre 15 et 45 € en supplément. Les interventions en urgence (soir, week-end) sont majorées de 20 à 100 %.",
  },
  {
    q: "Combien coûte la création d'une salle de bain complète ?",
    a: "La création d'une salle de bain complète coûte entre 900 et 2 500 €/m² en 2026. Pour une salle de bain de 6 m², le budget se situe entre 5 400 € et 15 000 € TTC selon le niveau de gamme (standard, confort ou premium).",
  },
  {
    q: "Combien coûte un débouchage de canalisation ?",
    a: "Un débouchage de canalisation coûte entre 100 € et 450 € TTC selon la méthode : ventouse/siphon (50-180 €), furet motorisé (100-250 €), hydrocurage haute pression (200-450 €). L'inspection caméra supplémentaire coûte 150 à 300 €.",
  },
  {
    q: "Quel est le prix d'installation d'un chauffe-eau électrique ?",
    a: "L'installation d'un chauffe-eau électrique (cumulus) coûte entre 500 € et 1 400 € TTC, fourniture incluse. Le prix varie selon la capacité (100 à 300 litres), le type de résistance (blindée ou stéatite) et la région.",
  },
  {
    q: "Comment bien comparer les devis de plombier ?",
    a: "Demandez au moins trois devis détaillés et comparez-les ligne par ligne : vérifiez qu'ils portent sur les mêmes prestations, distinguent la main d'œuvre des fournitures, indiquent les quantités et le taux de TVA, et précisent délais et garanties. Un devis anormalement bas cache souvent des prestations manquantes.",
  },
  {
    q: "Comment réduire le coût de ses travaux de plomberie ?",
    a: "Trois leviers : regrouper plusieurs interventions en une seule pour limiter les déplacements, comparer plusieurs devis, et vérifier votre éligibilité à la TVA réduite (10 % en rénovation d'un logement de plus de 2 ans, voire 5,5 % pour les travaux d'amélioration énergétique). Fournir vous-même certains équipements peut aussi alléger la facture.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Prix Plombier 2026" />
      <Breadcrumb currentPage="Prix Plombier" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {"🔧"}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Prix Plombier 2026 : Estimateur en Ligne
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez le cout de vos travaux de plomberie. 10 prestations, prix fournitures + main d&apos;oeuvre, ajuste par region.
      </p>

      <EstimateurPlombier />


      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment estimer le prix d&apos;un plombier en 2026 ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>prix d&apos;un plombier</strong> depend de la nature de l&apos;intervention (installation, reparation, depannage), de la complexite des travaux et de votre <strong>localisation geographique</strong>. En Ile-de-France, les tarifs sont en moyenne 30% plus eleves qu&apos;en province.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les prestations les plus demandees
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les interventions les plus courantes sont le <strong>debouchage de canalisation</strong> (100-450 &euro;), l&apos;<strong>installation de robinet</strong> (130-350 &euro;/unite) et le <strong>remplacement de chauffe-eau</strong> (500-1 400 &euro;). Pour une <strong>salle de bain complete</strong>, le budget demarre a 900 &euro;/m&sup2;.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Fournitures vs main d&apos;oeuvre
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          En plomberie, la repartition varie beaucoup selon la prestation. Pour un <strong>debouchage</strong>, c&apos;est quasi 100% main d&apos;oeuvre. Pour une <strong>chaudiere gaz</strong>, les fournitures representent 70% du cout. Pour une <strong>salle de bain</strong>, c&apos;est environ 50/50.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Impact de la region sur les prix
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Ile-de-France</span>
            <span className="text-sm font-bold text-slate-800">+30% vs province</span>
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
          Les travaux de <strong>plomberie dans un logement de plus de 2 ans</strong> beneficient d&apos;une TVA reduite a 10%. Pour le remplacement d&apos;une chaudiere par une <strong>pompe a chaleur</strong>, vous pouvez beneficier de <strong>MaPrimeRenov&apos;</strong> et de l&apos;eco-pret a taux zero. Attention : les chaudieres gaz ne beneficient plus d&apos;aides depuis 2024.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Budget global de vos travaux
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Pour planifier vos travaux de plomberie, pensez a estimer le <strong>budget global</strong> : utilisez notre <a href="/simulateur-pret-immobilier" className="text-cyan-600 underline hover:text-cyan-800">simulateur de pret immobilier</a> pour calculer vos mensualites, verifiez votre <a href="/calcul-capacite-emprunt" className="text-cyan-600 underline hover:text-cyan-800">capacite d&apos;emprunt</a> et estimez les <a href="/frais-de-notaire" className="text-cyan-600 underline hover:text-cyan-800">frais de notaire</a> si vous achetez un bien a renover. Si vous prevoyez d&apos;autres travaux, consultez aussi nos estimateurs <a href="/prix-chauffagiste" className="text-cyan-600 underline hover:text-cyan-800">prix chauffagiste</a>, <a href="/prix-electricien" className="text-cyan-600 underline hover:text-cyan-800">prix electricien</a> et <a href="/prix-macon" className="text-cyan-600 underline hover:text-cyan-800">prix macon</a>.
        </p>
      </section>

      <HowToJsonLd
        name="Estimer le prix d'une intervention de plombier"
        steps={[
          { name: "Choisir la prestation", text: "Sélectionner parmi les 10 types de travaux : debouchage (100-450 EUR), installation de robinet (130-350 EUR/unité), remplacement WC, chauffe-eau électrique (500-1 400 EUR), creation de salle de bain (900-2 500 EUR/m2), chaudiere gaz, etc." },
          { name: "Saisir la quantité ou la surface", text: "Indiquer le nombre d'unités (ex : 2 robinets) ou la surface en m2 (ex : 6 m2 pour une salle de bain complète). Pour un debouchage ou une reparation de fuite, c'est un forfait sans surface." },
          { name: "Sélectionner la region", text: "Appliquer le coefficient : Ile-de-France (+30 %), grandes villes (+10 %), province (référence), rural (-10 %). Ex : chauffe-eau électrique 150 L en province = 500 à 900 EUR, en Ile-de-France = 650 à 1 170 EUR." },
          { name: "Vérifier les aides applicables", text: "La TVA est de 10 % pour les travaux dans un logement de plus de 2 ans. Le remplacement d'une chaudiere par une pompe à chaleur ouvre droit à MaPrimeRenov'. Attention : les chaudieres gaz neuves ne sont plus aidees depuis 2024." },
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

      <VillesLinks metierSlug="/prix-plombier" />
      <CTAMonDevisMinute
        campaign="prix-plombier"
        variant="devis"
        guide={{ href: "/guides/devis-depannage-urgence-regles", label: "Dépannage et urgence : les règles à respecter" }}
      />

      <RelatedCalculators currentSlug="/prix-plombier" />
    </div>
  );
}
