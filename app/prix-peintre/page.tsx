import type { Metadata } from "next";
import EstimateurPeintre from "./EstimateurPeintre";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import VillesLinks from "../components/VillesLinks";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/prix-peintre" },
  title: "Prix Peintre 2026 : Estimateur en Ligne - Tarifs au m\u00b2",
  description:
    "Estimez le prix d'un peintre en 2026. Tarifs au m\u00b2 : murs, plafond, facade, boiseries, papier peint. Fournitures + main d'oeuvre par region. Gratuit.",
  keywords:
    "prix peintre, tarif peintre 2026, cout peinture m2, prix peinture mur, prix peinture plafond, prix peinture facade, devis peintre",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quel est le prix moyen d'un peintre au m² en 2026 ?",
    a: "Le prix d'un peintre varie de 15 €/m² (lessivage + peinture) à 70 €/m² (peinture décorative). Peindre un mur intérieur coûte en moyenne 20 à 40 €/m² fournitures et main d'œuvre comprises. En Île-de-France, comptez 25 % de plus.",
  },
  {
    q: "Combien coûte la peinture d'une pièce de 20 m² ?",
    a: "Pour une pièce complète de 20 m² (murs + plafond), comptez entre 500 € et 1 000 € en province, fournitures et main d'œuvre incluses. Ce prix comprend la préparation des surfaces, la sous-couche et 2 couches de peinture.",
  },
  {
    q: "Faut-il fournir la peinture au peintre ?",
    a: "Non, le peintre fournit généralement la peinture et les fournitures. C'est d'ailleurs recommandé car il choisira des produits adaptés au support. De plus, vous bénéficiez de la TVA à 10 % sur les fournitures si le peintre les fournit (logement de + de 2 ans).",
  },
  {
    q: "Comment bien comparer les devis de peintre ?",
    a: "Demandez au moins trois devis détaillés et comparez-les ligne par ligne : vérifiez qu'ils portent sur les mêmes surfaces et le même nombre de couches, distinguent la main d'œuvre des fournitures, indiquent la qualité de la peinture et le taux de TVA, et précisent la préparation des supports. Un devis anormalement bas cache souvent une étape de préparation manquante.",
  },
  {
    q: "Comment réduire le coût de ses travaux de peinture ?",
    a: "Trois leviers : regrouper plusieurs pièces en une seule intervention, comparer plusieurs devis, et vérifier votre éligibilité à la TVA réduite à 10 % en rénovation d'un logement de plus de 2 ans. Préparer vous-même les murs (rebouchage, ponçage) ou fournir la peinture peut aussi alléger la facture.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Prix Peintre 2026" />
      <Breadcrumb currentPage="Prix Peintre" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {"\ud83c\udfa8"}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Prix Peintre 2026 : Estimateur en Ligne
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez le cout de vos travaux de peinture. 10 prestations, prix fournitures + main d&apos;oeuvre, ajuste par region.
      </p>

      <EstimateurPeintre />


      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment estimer le prix d&apos;un peintre en 2026 ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>prix d&apos;un peintre</strong> depend du type de prestation (peinture murale, plafond, facade, decorative), de la <strong>surface a peindre</strong> et de l&apos;etat des surfaces existantes. Un mur en bon etat necessitera moins de preparation qu&apos;un mur fissure ou tache.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les prestations les plus courantes
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La <strong>peinture de murs interieurs</strong> est la prestation la plus demandee (20-40 &euro;/m&sup2;). Le <strong>plafond</strong> coute un peu plus cher (25-45 &euro;/m&sup2;) car le travail est plus penible. La <strong>peinture de facade</strong> (25-60 &euro;/m&sup2;) inclut souvent l&apos;echafaudage.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Ce qui influence le prix
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Etat du support</span>
            <span className="text-sm font-bold text-slate-800">+20 a +50%</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Hauteur sous plafond (&gt;3m)</span>
            <span className="text-sm font-bold text-slate-800">+15 a +30%</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Peinture haut de gamme</span>
            <span className="text-sm font-bold text-slate-800">+10 a +20%</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Ile-de-France</span>
            <span className="text-sm font-bold text-slate-800">+25% vs province</span>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          TVA et aides
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Les travaux de peinture dans un <strong>logement de plus de 2 ans</strong> beneficient d&apos;une TVA reduite a 10% (au lieu de 20%), a condition que le peintre fournisse les materiaux. Si vous achetez la peinture vous-meme, seule la main d&apos;oeuvre beneficie du taux reduit.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Budget global de vos travaux
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Pour planifier vos travaux de peinture, pensez a estimer le <strong>budget global</strong> : utilisez notre <a href="/calcul-surface-peinture" className="text-violet-600 underline hover:text-violet-800">calculateur de surface</a> pour evaluer la quantite necessaire, notre <a href="/simulateur-pret-immobilier" className="text-violet-600 underline hover:text-violet-800">simulateur de pret immobilier</a> pour le financement et les <a href="/frais-de-notaire" className="text-violet-600 underline hover:text-violet-800">frais de notaire</a> si vous achetez un bien a renover. Pour une renovation complete, consultez aussi <a href="/prix-macon" className="text-violet-600 underline hover:text-violet-800">prix macon</a>, <a href="/prix-electricien" className="text-violet-600 underline hover:text-violet-800">prix electricien</a> et <a href="/prix-plombier" className="text-violet-600 underline hover:text-violet-800">prix plombier</a>.
        </p>
      </section>

      <VillesLinks metierSlug="/prix-peintre" />
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

      <RelatedCalculators currentSlug="/prix-peintre" />
    </div>
  );
}
