import type { Metadata } from "next";
import EstimateurPlombier from "./EstimateurPlombier";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import VillesLinks from "../components/VillesLinks";

export const metadata: Metadata = {
  title: "Prix Plombier 2026 : Estimateur en Ligne - Tarifs par Prestation",
  description:
    "Estimez le prix d'un plombier en 2026. Tarifs : robinet, WC, chauffe-eau, douche, baignoire, debouchage, chaudiere, salle de bain. Fournitures + main d'oeuvre par region.",
  keywords:
    "prix plombier, tarif plombier 2026, cout plombier, prix installation salle de bain, prix chauffe-eau, prix debouchage, prix chaudiere gaz, devis plombier",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Prix Plombier 2026" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quel est le tarif horaire moyen d'un plombier en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le tarif horaire d'un plombier varie de 40 a 80 € HT en province et de 70 a 140 € HT en Ile-de-France. Le deplacement est facture entre 15 et 45 € en supplement. Les interventions en urgence (soir, week-end) sont majorees de 20 a 100%.",
                },
              },
              {
                "@type": "Question",
                name: "Combien coute la creation d'une salle de bain complete ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La creation d'une salle de bain complete coute entre 900 et 2 500 €/m² en 2026. Pour une salle de bain de 6 m², le budget se situe entre 5 400 € et 15 000 € TTC selon le niveau de gamme (standard, confort ou premium).",
                },
              },
              {
                "@type": "Question",
                name: "Combien coute un debouchage de canalisation ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Un debouchage de canalisation coute entre 100 € et 450 € TTC selon la methode : ventouse/siphon (50-180 €), furet motorise (100-250 €), hydrocurage haute pression (200-450 €). L'inspection camera supplementaire coute 150 a 300 €.",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le prix d'installation d'un chauffe-eau electrique ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'installation d'un chauffe-eau electrique (cumulus) coute entre 500 € et 1 400 € TTC, fourniture incluse. Le prix varie selon la capacite (100 a 300 litres), le type de resistance (blindee ou steatite) et la region.",
                },
              },
            ],
          }),
        }}
      />
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

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

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

      <VillesLinks metierSlug="/prix-plombier" />
      <RelatedCalculators currentSlug="/prix-plombier" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
