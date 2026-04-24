import type { Metadata } from "next";
import EstimateurChauffagiste from "./EstimateurChauffagiste";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import VillesLinks from "../components/VillesLinks";

export const metadata: Metadata = {
  alternates: { canonical: "/prix-chauffagiste" },
  title: "Prix Chauffagiste 2026 : Estimateur en Ligne - Tarifs par Prestation",
  description:
    "Estimez le prix d'un chauffagiste en 2026. Tarifs : chaudiere gaz, pompe a chaleur, chauffe-eau, plancher chauffant, radiateur, entretien, desembouage, depannage. Fournitures + main d'oeuvre par region.",
  keywords:
    "prix chauffagiste, tarif chauffagiste 2026, cout pompe a chaleur, prix chaudiere gaz, prix plancher chauffant, entretien chaudiere, devis chauffagiste",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Prix Chauffagiste 2026" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quel est le tarif horaire moyen d'un chauffagiste en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le tarif horaire d'un chauffagiste varie de 40 a 80 \u20ac HT en province et de 50 a 130 \u20ac HT en Ile-de-France. Les frais de deplacement (20-40 \u20ac) s'ajoutent en supplement. Les interventions en urgence (soir, weekend) sont majorees de 25 a 50%.",
                },
              },
              {
                "@type": "Question",
                name: "Combien coute l'installation d'une pompe a chaleur air-eau ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'installation d'une pompe a chaleur air-eau coute entre 10 000 et 18 000 \u20ac TTC en 2026, fournitures et pose comprises. Ce prix varie selon la puissance, la marque et la complexite de l'installation. Des aides (MaPrimeRenov', CEE) peuvent reduire le cout de 3 000 a 5 000 \u20ac.",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le prix de l'entretien annuel d'une chaudiere ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'entretien annuel obligatoire d'une chaudiere (gaz, fioul) coute entre 100 et 180 \u20ac TTC en 2026. Un contrat d'entretien annuel est souvent plus avantageux (120-200 \u20ac/an) et inclut generalement un depannage gratuit.",
                },
              },
              {
                "@type": "Question",
                name: "Quelles aides pour l'installation d'un chauffage en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les pompes a chaleur et chauffe-eau thermodynamiques sont eligibles a MaPrimeRenov' (jusqu'a 5 000 \u20ac), aux CEE (500-4 000 \u20ac), a l'eco-pret a taux zero (jusqu'a 50 000 \u20ac) et a une TVA a 5,5%. L'artisan doit etre certifie RGE pour debloquer ces aides.",
                },
              },
            ],
          }),
        }}
      />
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

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

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

      <RelatedCalculators currentSlug="/prix-chauffagiste" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
