import type { Metadata } from "next";
import SimulateurLoaLld from "./SimulateurLoaLld";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/simulateur-loa-lld" },
  title: "Simulateur LOA vs LLD 2026 - Comparateur Location Voiture",
  description:
    "Comparez LOA (Location Option Achat) vs LLD (Location Longue Duree) pour votre voiture : cout total, valeur residuelle, avantages/inconvenients. Simulateur gratuit 2026.",
  keywords:
    "LOA vs LLD, location voiture, simulateur leasing auto, location avec option achat, location longue duree, comparateur LOA LLD",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quelle difference entre LOA et LLD ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La LOA (Location avec Option d'Achat) permet d'acheter le vehicule a la fin du contrat en payant la valeur residuelle (l'option d'achat, fixee au depart). La LLD (Location Longue Duree) ne le permet pas : le vehicule est restitue a la fin, sans possibilite de rachat. La LLD inclut souvent l'entretien et l'assurance dans le loyer, ce qui simplifie la gestion mais augmente le cout mensuel. Les loyers LLD sont generalement 10-20% plus eleves que la LOA a prestations equivalentes.",
      },
    },
    {
      "@type": "Question",
      name: "Est-ce que la LOA est interessante financierement ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La LOA est interessante si vous souhaitez changer de voiture regulierement (tous les 3-5 ans) sans vous engager sur un achat definitif. Elle permet de tester le vehicule puis de decider de l'acheter ou non. Financierement, sur la duree : LOA + rachat coute souvent 10-25% plus cher qu'un achat comptant ou un pret auto classique. Si vous gardez la voiture plus de 7 ans, l'achat direct reste le plus economique.",
      },
    },
    {
      "@type": "Question",
      name: "Peut-on resilier un contrat LOA ou LLD ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, mais avec penalites. LOA : vous pouvez anticiper le rachat (en payant le capital restant du + valeur residuelle), ou restituer le vehicule en cas de force majeure (deces, invalidite, perte d'emploi pour certains contrats) sans frais. LLD : resiliation possible mais souvent avec penalite de 6-12 loyers + frais de restitution. Toujours lire attentivement les clauses de sortie avant de signer.",
      },
    },
    {
      "@type": "Question",
      name: "Faut-il declarer LOA/LLD en micro-entreprise ou profession liberale ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, les loyers LOA/LLD sont deductibles du resultat imposable pour les professionnels (regime reel). En micro-entreprise, l'abattement forfaitaire est applique : pas de deduction reelle possible. Attention : seule la fraction professionnelle des loyers est deductible (si utilisation mixte, appliquer un pourcentage d'utilisation pro). Pour les vehicules de societe (M1), le plafond de deduction des amortissements s'applique (9 900-30 000 EUR selon CO2).",
      },
    },
  ],
};

export default function Page() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <WebAppJsonLd name="Simulateur LOA vs LLD" description="Comparateur location voiture 2026" category="FinanceApplication" />
      <Breadcrumb currentPage="Simulateur LOA vs LLD" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚘
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">LOA vs LLD 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Comparez la Location avec Option d&apos;Achat (LOA) et la Location Longue Duree (LLD) pour votre voiture.
      </p>

      <SimulateurLoaLld />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">LOA et LLD : comprendre les differences</h2>
        <div className="grid gap-6 sm:grid-cols-2 mb-4">
          <div className="bg-sky-50 rounded-xl p-5 border border-sky-200">
            <h3 className="font-bold text-sky-900 mb-3">LOA : Location avec Option d&apos;Achat</h3>
            <ul className="text-sm text-slate-700 space-y-1.5">
              <li>✓ Possibilite d&apos;acheter le vehicule a la fin</li>
              <li>✓ Loyers plus bas que LLD (10-20%)</li>
              <li>✓ Flexibilite en fin de contrat</li>
              <li>✗ Entretien/assurance en sus</li>
              <li>✗ Gestion plus complexe</li>
              <li>✗ Penalites kilometriques si depassement</li>
            </ul>
          </div>
          <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
            <h3 className="font-bold text-emerald-900 mb-3">LLD : Location Longue Duree</h3>
            <ul className="text-sm text-slate-700 space-y-1.5">
              <li>✓ Tout-inclus (entretien, assurance, assistance)</li>
              <li>✓ Budget previsible, pas de surprise</li>
              <li>✓ Pas de revente a gerer</li>
              <li>✗ Aucune possibilite d&apos;achat</li>
              <li>✗ Loyers plus eleves</li>
              <li>✗ Penalites fortes en cas de resiliation</li>
            </ul>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Quand choisir LOA vs LLD ?</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>LOA</strong> : si vous hesitez entre garder ou changer la voiture, si vous roulez peu/normalement</li>
          <li><strong>LLD</strong> : si vous voulez un budget fixe et simple, si vous changez de voiture tous les 3-4 ans sans vouloir vous soucier de la revente</li>
          <li><strong>Achat comptant</strong> : si vous gardez la voiture 7+ ans (le moins cher sur le long terme)</li>
          <li><strong>Credit auto classique</strong> : si vous voulez etre proprietaire immediatement avec mensualites</li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Points de vigilance</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li><strong>Kilometrage</strong> : definissez-le avec marge. Depassement = 0,05-0,30 EUR/km</li>
          <li><strong>Etat du vehicule a la restitution</strong> : attention aux frais de remise en etat (rayures, usure)</li>
          <li><strong>Valeur residuelle</strong> : en LOA, verifiez qu&apos;elle soit realiste (pas trop haute)</li>
          <li><strong>Assurance tous risques</strong> : obligatoire en LOA/LLD, plus chere que tiers</li>
        </ul>
      </section>

      <RelatedCalculators currentSlug="/simulateur-loa-lld" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
