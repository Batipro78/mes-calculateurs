import type { Metadata } from "next";
import EstimateurMacon from "./EstimateurMacon";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Prix Macon 2026 : Estimateur en Ligne - Tarifs au m\u00b2",
  description:
    "Estimez le prix d'un macon en 2026. Tarifs au m\u00b2 : mur parpaings, dalle beton, terrasse, facade, demolition. Fournitures + main d'oeuvre par region. Gratuit.",
  keywords:
    "prix macon, tarif macon 2026, cout macon m2, prix mur parpaings, prix dalle beton, prix terrasse beton, prix ravalement facade, devis macon",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Prix Macon 2026" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quel est le prix moyen d'un macon au m\u00b2 en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le prix d'un macon varie de 25 \u20ac/m\u00b2 (chape beton) a 150 \u20ac/m\u00b2 (terrasse beton) selon la prestation. Un mur en parpaings coute en moyenne 50 a 80 \u20ac/m\u00b2 fournitures et main d'oeuvre comprises. En Ile-de-France, comptez 25% de plus.",
                },
              },
              {
                "@type": "Question",
                name: "Combien coute une ouverture dans un mur porteur ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Une ouverture dans un mur porteur coute entre 1 500 \u20ac et 4 000 \u20ac en forfait, incluant l'etude de structure, la pose d'un IPN et la finition. Ce prix varie selon l'epaisseur du mur et la taille de l'ouverture.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle TVA pour les travaux de maconnerie ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La TVA est de 10% pour les travaux de renovation dans un logement de plus de 2 ans (au lieu de 20%). Pour une construction neuve ou un agrandissement, la TVA reste a 20%.",
                },
              },
            ],
          }),
        }}
      />
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

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

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
      </section>

      <RelatedCalculators currentSlug="/prix-macon" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
