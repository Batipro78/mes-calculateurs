import type { Metadata } from "next";
import EstimateurPeintre from "./EstimateurPeintre";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import VillesLinks from "../components/VillesLinks";

export const metadata: Metadata = {
  alternates: { canonical: "/prix-peintre" },
  title: "Prix Peintre 2026 : Estimateur en Ligne - Tarifs au m\u00b2",
  description:
    "Estimez le prix d'un peintre en 2026. Tarifs au m\u00b2 : murs, plafond, facade, boiseries, papier peint. Fournitures + main d'oeuvre par region. Gratuit.",
  keywords:
    "prix peintre, tarif peintre 2026, cout peinture m2, prix peinture mur, prix peinture plafond, prix peinture facade, devis peintre",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Prix Peintre 2026" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quel est le prix moyen d'un peintre au m\u00b2 en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le prix d'un peintre varie de 15 \u20ac/m\u00b2 (lessivage + peinture) a 70 \u20ac/m\u00b2 (peinture decorative). Peindre un mur interieur coute en moyenne 20 a 40 \u20ac/m\u00b2 fournitures et main d'oeuvre comprises. En Ile-de-France, comptez 25% de plus.",
                },
              },
              {
                "@type": "Question",
                name: "Combien coute la peinture d'une piece de 20 m\u00b2 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour une piece complete de 20 m\u00b2 (murs + plafond), comptez entre 500 \u20ac et 1 000 \u20ac en province, fournitures et main d'oeuvre incluses. Ce prix comprend la preparation des surfaces, la sous-couche et 2 couches de peinture.",
                },
              },
              {
                "@type": "Question",
                name: "Faut-il fournir la peinture au peintre ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Non, le peintre fournit generalement la peinture et les fournitures. C'est d'ailleurs recommande car il choisira des produits adaptes au support. De plus, vous beneficiez de la TVA a 10% sur les fournitures si le peintre les fournit (logement de + de 2 ans).",
                },
              },
            ],
          }),
        }}
      />
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

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

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
      <RelatedCalculators currentSlug="/prix-peintre" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
