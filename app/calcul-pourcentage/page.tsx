import type { Metadata } from "next";
import CalculateurPourcentage from "./CalculateurPourcentage";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-pourcentage" },
  title: "Calcul Pourcentage 2026 - Calculateur gratuit en ligne",
  description:
    "Calculez un pourcentage facilement : pourcentage d'un nombre, augmentation, reduction, part en pourcentage. Outil gratuit, instantane et sans inscription.",
  keywords:
    "calcul pourcentage, pourcentage d'un nombre, calculer pourcentage, augmentation pourcentage, reduction pourcentage, remise pourcentage",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Pourcentage" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment calculer un pourcentage d'un nombre ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour calculer X% d'un nombre Y, utilisez la formule : Y x (X / 100). Par exemple, 20% de 150 = 150 x 0.20 = 30."
                }
              },
              {
                "@type": "Question",
                name: "Comment calculer une augmentation en pourcentage ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La formule est : ((Nouveau - Ancien) / Ancien) x 100. Par exemple, passer de 80 a 100 represente une augmentation de +25%."
                }
              },
              {
                "@type": "Question",
                name: "Comment calculer une reduction ou remise en pourcentage ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Utilisez la formule : Prix final = Prix x (1 - Remise / 100). Par exemple, un article a 80 EUR avec -25% de remise = 80 x 0.75 = 60 EUR."
                }
              }
            ]
          })
        }}
      />
      <Breadcrumb currentPage="Calcul Pourcentage" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📊
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Pourcentage
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Tous les calculs de pourcentage en un seul outil. Resultat instantane.
      </p>

      <CalculateurPourcentage />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment calculer un pourcentage ?
        </h2>

        <h3 className="font-bold text-slate-800 mt-4 mb-3">Les formules</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              Pourcentage d&apos;un nombre
            </p>
            <p className="font-mono text-sm text-slate-600 mt-2">
              X% de Y = Y x (X / 100)
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Ex : 20% de 150 = 150 x 0.20 = 30
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              Augmentation en %
            </p>
            <p className="font-mono text-sm text-slate-600 mt-2">
              ((Nouveau - Ancien) / Ancien) x 100
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Ex : 80 → 100 = +25%
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              Reduction / Remise
            </p>
            <p className="font-mono text-sm text-slate-600 mt-2">
              Prix final = Prix x (1 - Remise / 100)
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Ex : 80 EUR - 25% = 60 EUR
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              Part en pourcentage
            </p>
            <p className="font-mono text-sm text-slate-600 mt-2">
              (Partie / Total) x 100
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Ex : 30 sur 120 = 25%
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Exemples courants
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>
            <strong>Soldes :</strong> un article a 80 EUR avec -30% = 56 EUR
          </li>
          <li>
            <strong>Pourboire :</strong> 15% de 45 EUR = 6,75 EUR
          </li>
          <li>
            <strong>Augmentation loyer :</strong> 750 EUR + 3,5% = 776,25 EUR
          </li>
          <li>
            <strong>Note :</strong> 14 sur 20 = 70%
          </li>
        </ul>
      </section>

      <RelatedCalculators currentSlug="/calcul-pourcentage" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
