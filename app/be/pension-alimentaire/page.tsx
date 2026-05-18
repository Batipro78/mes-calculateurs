import type { Metadata } from "next";
import CalculateurPensionAlimentaireBE from "./CalculateurPensionAlimentaireBE";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import WebAppJsonLd from "../../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "/be/pension-alimentaire",
    languages: { "fr-BE": "/be/pension-alimentaire" },
  },
  title:
    "Calculateur Pension Alimentaire Belgique - Méthode Renard 2026 gratuit",
  description:
    "Calculez la pension alimentaire en Belgique avec la méthode Renard. Coefficients officiels par âge, plafond 1/3, déduction 80%. Rapide et gratuit.",
  keywords:
    "pension alimentaire belgique, méthode renard, calculateur pension, coefficients renard, plafond tiers",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Pension Alimentaire Belgique" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Qu'est-ce que la méthode Renard en Belgique ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La méthode Renard est la formule officielle de calcul de la pension alimentaire en Belgique. Elle détermine le coût d'un enfant en fonction des revenus combinés des deux parents et applique un coefficient selon l'âge de l'enfant. La pension est alors répartie proportionnellement aux revenus de chaque parent.",
                },
              },
              {
                "@type": "Question",
                name: "Quels sont les coefficients Renard par âge ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les coefficients Renard varient de 0,1371 (0-1 an) à 0,2695 (18+ ans). Par exemple : 0-1 an = 0,1371 ; 6-7 ans = 0,18 ; 10-11 ans = 0,21 ; 14-15 ans = 0,24 ; 18+ ans = 0,2695. Ces coefficients représentent le coût proportionnel de l'enfant par rapport aux revenus parentaux.",
                },
              },
              {
                "@type": "Question",
                name: "Qu'est-ce que le plafond 1/3 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le plafond 1/3 est une jurisprudence belge qui limite la pension alimentaire à un tiers des revenus du débiteur (parent sans garde principale). Si la part calculée dépasse ce tiers, la pension est réduite au plafond 1/3.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la déductibilité fiscale de la pension ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "En Belgique, la pension alimentaire versée est déductible à 80% des revenus imposables du débiteur. Les 20% restants ne sont pas déductibles. Cette mesure s'applique si l'enfant est à charge du créancier.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        currentPage="Pension Alimentaire"
        parentPage="Belgique"
        parentHref="/be"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          👨‍👩‍👧
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Pension Alimentaire Belgique &mdash; Méthode Renard 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez la pension alimentaire selon la méthode Renard officielle.
        Coefficients par âge, plafond 1/3, déductibilité 80%. Instantané et
        gratuit.
      </p>

      <CalculateurPensionAlimentaireBE />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          La méthode Renard en Belgique
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          La méthode Renard est la formule officielle de calcul de la pension
          alimentaire en Belgique, reconnue par la jurisprudence et les
          avocats. Elle fonctionne en trois étapes :
        </p>
        <ol className="list-decimal list-inside space-y-3 text-slate-600 mb-6">
          <li>
            <strong>Coût total :</strong> (Revenus P1 + Revenus P2) × Coefficient
            Renard (selon l'âge)
          </li>
          <li>
            <strong>Parts proportionnelles :</strong> Chaque parent paie sa part
            selon ses revenus
          </li>
          <li>
            <strong>Pension :</strong> Le parent sans garde principale verse sa
            part au parent gardien (limité au plafond 1/3)
          </li>
        </ol>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Coefficients Renard par tranche d'âge
        </h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5 mb-6">
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-sm font-bold text-slate-800">0-1 an</p>
            <p className="text-lg font-bold text-pink-600">0,1371</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-sm font-bold text-slate-800">6-7 ans</p>
            <p className="text-lg font-bold text-pink-600">0,18</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-sm font-bold text-slate-800">10-11 ans</p>
            <p className="text-lg font-bold text-pink-600">0,21</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-sm font-bold text-slate-800">14-15 ans</p>
            <p className="text-lg font-bold text-pink-600">0,24</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-sm font-bold text-slate-800">18+ ans</p>
            <p className="text-lg font-bold text-pink-600">0,2695</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Plafond 1/3 et déductibilité
        </h3>
        <ul className="list-disc list-inside space-y-2 text-slate-600">
          <li>
            <strong>Plafond 1/3 :</strong> La pension ne peut pas dépasser 1/3
            des revenus du débiteur
          </li>
          <li>
            <strong>Déductible à 80% :</strong> Le débiteur peut déduire 80% de
            la pension de ses revenus imposables
          </li>
          <li>
            <strong>Avis :</strong> Ce calculateur est une estimation simplifié.
            Pour un cas réel, consultez un avocat ou le tribunal.
          </li>
        </ul>
      </section>

      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
