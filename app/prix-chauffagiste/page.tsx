import type { Metadata } from "next";
import EstimateurChauffagiste from "./EstimateurChauffagiste";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import VillesLinks from "../components/VillesLinks";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";
import CTAMonDevisMinute from "../components/CTAMonDevisMinute";

export const metadata: Metadata = {
  alternates: { canonical: "/prix-chauffagiste" },
  title: "Prix Chauffagiste 2026 : Estimateur en Ligne - Tarifs par Prestation",
  description:
    "Estimez le prix d'un chauffagiste en 2026. Tarifs : chaudiere gaz, pompe a chaleur, chauffe-eau, plancher chauffant, radiateur, entretien, desembouage, depannage. Fournitures + main d'oeuvre par region.",
  keywords:
    "prix chauffagiste, tarif chauffagiste 2026, cout pompe a chaleur, prix chaudiere gaz, prix plancher chauffant, entretien chaudiere, devis chauffagiste",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quel est le tarif horaire moyen d'un chauffagiste en 2026 ?",
    a: "Le tarif horaire d'un chauffagiste varie de 40 à 80 € HT en province et de 50 à 130 € HT en Île-de-France. Les frais de déplacement (20-40 €) s'ajoutent en supplément. Les interventions en urgence (soir, weekend) sont majorées de 25 à 50 %.",
  },
  {
    q: "Combien coûte l'installation d'une pompe à chaleur air-eau ?",
    a: "L'installation d'une pompe à chaleur air-eau coûte entre 10 000 et 18 000 € TTC en 2026, fournitures et pose comprises. Ce prix varie selon la puissance, la marque et la complexité de l'installation. Des aides (MaPrimeRénov', CEE) peuvent réduire le coût de 3 000 à 5 000 €.",
  },
  {
    q: "Quel est le prix de l'entretien annuel d'une chaudière ?",
    a: "L'entretien annuel obligatoire d'une chaudière (gaz, fioul) coûte entre 100 et 180 € TTC en 2026. Un contrat d'entretien annuel est souvent plus avantageux (120-200 €/an) et inclut généralement un dépannage gratuit.",
  },
  {
    q: "Quelles aides pour l'installation d'un chauffage en 2026 ?",
    a: "Les pompes à chaleur et chauffe-eau thermodynamiques sont éligibles à MaPrimeRénov' (jusqu'à 5 000 €), aux CEE (500-4 000 €), à l'éco-prêt à taux zéro (jusqu'à 50 000 €) et à une TVA à 5,5 %. L'artisan doit être certifié RGE pour débloquer ces aides.",
  },
  {
    q: "Comment bien comparer les devis de chauffagiste ?",
    a: "Demandez au moins trois devis détaillés et comparez-les ligne par ligne : vérifiez qu'ils portent sur le même équipement et la même puissance, distinguent la main d'œuvre des fournitures, incluent la dépose de l'ancien matériel et la mise en service, et précisent les garanties. Un devis anormalement bas cache souvent des postes oubliés.",
  },
  {
    q: "Comment réduire le coût de son installation de chauffage ?",
    a: "Trois leviers : comparer plusieurs devis, choisir un équipement adapté à la taille du logement, et surtout vérifier votre éligibilité aux aides. Le remplacement d'un chauffage par un système performant (pompe à chaleur, chaudière biomasse) bénéficie souvent de la TVA à 5,5 % et d'aides comme MaPrimeRénov', sous conditions et avec un installateur RGE.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Prix Chauffagiste 2026" />
      <Breadcrumb currentPage="Prix Chauffagiste" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {"\ud83d\udd25"}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Prix Chauffagiste 2026 : Estimateur en Ligne
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez le cout de vos travaux de chauffage. 10 prestations, prix fournitures + main d&apos;oeuvre, ajuste par region.
      </p>

      <EstimateurChauffagiste />


      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment estimer le prix d&apos;un chauffagiste en 2026 ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>prix d&apos;un chauffagiste</strong> depend de la nature de l&apos;intervention (installation, entretien, depannage), du type d&apos;equipement (chaudiere gaz, pompe a chaleur, chauffe-eau) et de votre <strong>localisation geographique</strong>. En Ile-de-France, les tarifs sont en moyenne 20% plus eleves qu&apos;en province.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les prestations les plus demandees
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les interventions les plus courantes sont l&apos;<strong>entretien annuel de chaudiere</strong> (100-180 &euro;), l&apos;<strong>installation de pompe a chaleur</strong> (2 000-18 000 &euro; selon le type) et le <strong>remplacement de chauffe-eau</strong> (400-4 500 &euro;). Le <strong>depannage chauffage</strong> coute en moyenne 110 a 300 &euro;.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Fournitures vs main d&apos;oeuvre
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour les <strong>installations lourdes</strong> (PAC, chaudiere), les fournitures representent 60-70% du budget total. Pour l&apos;<strong>entretien et le depannage</strong>, c&apos;est l&apos;inverse : la main d&apos;oeuvre represente 80-90% du cout. Le <strong>plancher chauffant</strong> est equilibre entre fournitures et pose (50/50).
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
          TVA et aides pour vos travaux de chauffage
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Les travaux de <strong>renovation energetique</strong> (PAC, chauffe-eau thermodynamique) beneficient d&apos;une TVA a 5,5% et sont eligibles a <strong>MaPrimeRenov&apos;</strong> (jusqu&apos;a 5 000 &euro;), aux <strong>CEE</strong> et a l&apos;eco-pret a taux zero. Les travaux de renovation classique beneficient d&apos;une TVA a 10%. L&apos;artisan doit etre <strong>certifie RGE</strong>.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Budget global de vos travaux
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Pour planifier vos travaux de chauffage, pensez a estimer le <strong>budget global</strong> : utilisez notre <a href="/simulateur-pret-immobilier" className="text-orange-600 underline hover:text-orange-800">simulateur de pret immobilier</a> pour calculer vos mensualites, verifiez votre <a href="/calcul-capacite-emprunt" className="text-orange-600 underline hover:text-orange-800">capacite d&apos;emprunt</a> et estimez les <a href="/frais-de-notaire" className="text-orange-600 underline hover:text-orange-800">frais de notaire</a> si vous achetez un bien a renover. Si vous prevoyez d&apos;autres travaux, consultez aussi nos estimateurs <a href="/prix-electricien" className="text-orange-600 underline hover:text-orange-800">prix electricien</a>, <a href="/prix-plombier" className="text-orange-600 underline hover:text-orange-800">prix plombier</a> et <a href="/prix-couvreur" className="text-orange-600 underline hover:text-orange-800">prix couvreur</a>.
        </p>
      </section>

      <VillesLinks metierSlug="/prix-chauffagiste" />

      <HowToJsonLd
        name="Estimer le prix d'une intervention de chauffagiste"
        steps={[
          { name: "Choisir la prestation", text: "Sélectionner le type de travaux parmi les 10 disponibles : entretien chaudiere (100-180 EUR), installation PAC air-eau (10 000-18 000 EUR), remplacement chauffe-eau (400-4 500 EUR), plancher chauffant, desembouage, depannage, etc." },
          { name: "Saisir la surface ou la quantité", text: "Indiquer la surface en m2 pour un plancher chauffant (ex : 80 m2) ou le nombre d'unités pour les equipements (ex : 1 chaudiere gaz 24 kW). L'entretien annuel et le depannage sont des forfaits sans surface." },
          { name: "Sélectionner la region", text: "Appliquer le coefficient : Ile-de-France (+20 %), grandes villes (+10 %), province (prix de référence), rural (-10 %). Ex : entretien chaudiere 140 EUR en province = 168 EUR en Ile-de-France." },
          { name: "Lire la fourchette et vérifier les aides", text: "L'estimateur affiche le coût total fournitures + main d'oeuvre. Les installations PAC et chauffe-eau thermodynamique sont eligibles à MaPrimeRenov' (jusqu'à 5 000 EUR) et à la TVA à 5,5 % si l'artisan est certifie RGE." },
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
          réel dépend de chaque chantier et ne remplace pas un devis. Aides et
          TVA des travaux de chauffage sur{" "}
          <a
            href="https://www.service-public.fr"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-blue-600 hover:underline"
          >
            service-public.fr
          </a>{" "}
          et{" "}
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

      <CTAMonDevisMinute
        campaign="prix-chauffagiste"
        variant="devis"
        guide={{ href: "/guides/taux-tva-travaux-renovation", label: "Quel taux de TVA appliquer sur vos travaux" }}
      />

      <RelatedCalculators currentSlug="/prix-chauffagiste" />
    </div>
  );
}
