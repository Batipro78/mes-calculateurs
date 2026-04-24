import type { Metadata } from "next";
import EstimateurCouvreur from "./EstimateurCouvreur";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import VillesLinks from "../components/VillesLinks";

export const metadata: Metadata = {
  alternates: { canonical: "/prix-couvreur" },
  title: "Prix Couvreur 2026 : Estimateur en Ligne - Tarifs par Prestation",
  description:
    "Estimez le prix d'un couvreur en 2026. Tarifs : reparation, renovation toiture, demoussage, isolation sarking, Velux, gouttiere, charpente, zinguerie. Fournitures + main d'oeuvre par region.",
  keywords:
    "prix couvreur, tarif couvreur 2026, cout toiture, prix renovation toiture, prix demoussage toiture, prix isolation sarking, prix velux, devis couvreur",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Prix Couvreur 2026" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quel est le tarif horaire moyen d'un couvreur en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le tarif horaire d'un couvreur varie de 40 a 60 \u20ac HT en province et de 50 a 90 \u20ac HT en Ile-de-France. Le prix de l'echafaudage (10-15 \u20ac/m\u00b2) s'ajoute en supplement. Les interventions en urgence (tempete, fuite) sont majorees de 30 a 100%.",
                },
              },
              {
                "@type": "Question",
                name: "Combien coute une renovation de toiture complete ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La renovation d'une toiture complete coute entre 130 et 300 \u20ac/m\u00b2 TTC en 2026, soit 13 000 a 30 000 \u20ac pour 100 m\u00b2. Ce prix inclut la depose de l'ancienne couverture, la fourniture des materiaux (tuiles, ardoise) et la main d'oeuvre de pose.",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le prix du demoussage de toiture ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le demoussage de toiture coute entre 10 et 40 \u20ac/m\u00b2 TTC en 2026. Pour une toiture de 100 m\u00b2, comptez 1 000 a 4 000 \u20ac. Le prix varie selon le produit utilise (anti-mousse, hydrofuge) et l'accessibilite du toit.",
                },
              },
              {
                "@type": "Question",
                name: "Quelles aides pour la renovation de toiture en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'isolation de toiture (sarking, combles) beneficie de MaPrimeRenov' (jusqu'a 75 \u20ac/m\u00b2 selon revenus), d'une TVA a 5,5% et de l'eco-pret a taux zero. La renovation simple (hors isolation) beneficie d'une TVA a 10% pour les logements de plus de 2 ans.",
                },
              },
            ],
          }),
        }}
      />
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

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

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

      <RelatedCalculators currentSlug="/prix-couvreur" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
