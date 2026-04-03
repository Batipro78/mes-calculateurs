import type { Metadata } from "next";
import SimulateurAPL from "./SimulateurAPL";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Simulateur APL 2026 - Calcul aide au logement gratuit",
  description:
    "Estimez votre APL en 2 minutes. Simulateur gratuit base sur les baremes 2026. Zone 1, 2 ou 3, seul ou en couple, avec ou sans enfants.",
  keywords:
    "simulateur APL, calcul APL, aide au logement, APL 2026, simulation aide logement CAF, aide personnalisee logement, APL locataire",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Simulateur APL" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Qui a droit a l'APL en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'APL est ouverte a tout locataire (ou colocataire) d'un logement conventionnne, sous conditions de ressources. Elle concerne les locataires du parc prive et social, les residents en foyer et les sous-locataires. Les etudiants, salaries, chomeurs et retraites peuvent en beneficier.",
                },
              },
              {
                "@type": "Question",
                name: "Comment est calculee l'APL ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'APL est calculee selon la formule : Loyer plafonne + Forfait charges - Participation personnelle. La participation personnelle depend de vos revenus (N-2), de votre situation familiale et de votre zone geographique (1, 2 ou 3). Les baremes sont revises chaque annee.",
                },
              },
              {
                "@type": "Question",
                name: "Quand l'APL est-elle versee ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'APL est versee mensuellement par la CAF, generalement le 5 du mois. Elle peut etre versee directement au proprietaire (tiers payant) ou au locataire. Le premier versement intervient le mois suivant l'ouverture du droit. L'APL n'est pas versee si son montant est inferieur a 10 EUR par mois.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Simulateur APL" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏘️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur APL 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez votre Aide Personnalisee au Logement en quelques clics.
        Baremes 2026.
      </p>

      <SimulateurAPL />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment fonctionne l&apos;APL ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;<strong>Aide Personnalisee au Logement (APL)</strong> est une aide
          financiere versee par la CAF pour reduire le montant de votre loyer. Elle
          est calculee en fonction de vos <strong>revenus</strong>, de la{" "}
          <strong>composition de votre foyer</strong>, de votre{" "}
          <strong>loyer</strong> et de votre <strong>zone geographique</strong>.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les zones geographiques
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700">Zone 1</p>
            <p className="text-sm text-slate-500 mt-1">Ile-de-France</p>
            <p className="text-xs text-slate-400 mt-1">
              Loyer plafond : 319,41 EUR (1 pers.)
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700">Zone 2</p>
            <p className="text-sm text-slate-500 mt-1">Grandes agglomerations</p>
            <p className="text-xs text-slate-400 mt-1">
              Loyer plafond : 278,28 EUR (1 pers.)
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700">Zone 3</p>
            <p className="text-sm text-slate-500 mt-1">Reste du territoire</p>
            <p className="text-xs text-slate-400 mt-1">
              Loyer plafond : 260,82 EUR (1 pers.)
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          La formule de calcul
        </h3>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700 mb-4">
          APL = Loyer plafonne + Forfait charges - Participation personnelle
        </div>
        <ul className="list-disc list-inside text-slate-600 space-y-1.5">
          <li>
            <strong>Loyer plafonne :</strong> votre loyer reel, dans la limite du
            plafond fixe pour votre zone et la taille de votre foyer
          </li>
          <li>
            <strong>Forfait charges :</strong> montant forfaitaire (60,59 EUR pour
            1 personne, 73,17 EUR pour 2 personnes, +11,20 EUR par personne
            supplementaire)
          </li>
          <li>
            <strong>Participation personnelle :</strong> part du loyer restant a votre
            charge, calculee selon vos revenus. Minimum 39,15 EUR/mois
          </li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Conditions pour beneficier de l&apos;APL
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>Etre locataire d&apos;un logement conventionne</li>
          <li>Le logement doit etre votre residence principale</li>
          <li>Vos ressources ne doivent pas depasser certains plafonds</li>
          <li>Etre de nationalite francaise ou en situation reguliere</li>
          <li>
            L&apos;APL n&apos;est pas versee si son montant est inferieur
            a <strong>10 EUR/mois</strong>
          </li>
        </ul>
      </section>

      <RelatedCalculators currentSlug="/simulateur-apl" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
