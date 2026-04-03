import type { Metadata } from "next";
import CalculateurTVA from "./CalculateurTVA";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Calcul TVA 2026 - Convertisseur HT / TTC gratuit",
  description:
    "Calculez la TVA, le montant HT et TTC instantanement. Tous les taux francais : 20%, 10%, 5.5%, 2.1%. Outil gratuit et precis.",
  keywords:
    "calcul TVA, HT TTC, convertisseur TVA, taux TVA France, TVA 20%, TVA 10%, TVA 5.5%",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul TVA HT/TTC" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quels sont les taux de TVA en France en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La France applique 4 taux de TVA : 20% (taux normal pour les biens et services courants), 10% (taux intermediaire pour la restauration, transports, travaux), 5.5% (taux reduit pour l'alimentation, energie, livres) et 2.1% (taux super reduit pour les medicaments, presse, spectacles)."
                }
              },
              {
                "@type": "Question",
                name: "Comment calculer la TVA ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour passer du HT au TTC : Montant TTC = Montant HT x (1 + taux TVA). Par exemple, 100 EUR HT avec TVA a 20% = 100 x 1.20 = 120 EUR TTC. Pour passer du TTC au HT : Montant HT = Montant TTC / (1 + taux TVA). Par exemple, 120 EUR TTC / 1.20 = 100 EUR HT."
                }
              }
            ]
          })
        }}
      />
      <Breadcrumb currentPage="Calcul TVA" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🧾
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul TVA &mdash; HT / TTC 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Convertissez entre HT et TTC avec tous les taux de TVA francais.
        Resultat instantane.
      </p>

      <CalculateurTVA />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les taux de TVA en France (2026)
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">20%</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux normal
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Biens et services courants
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">10%</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux intermediaire
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Restauration, transports, travaux
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">5,5%</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux reduit
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Alimentation, energie, livres
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">2,1%</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux super reduit
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Medicaments, presse, spectacles
            </p>
          </div>
        </div>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Comment calculer la TVA ?
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          <strong>HT vers TTC :</strong> Montant TTC = Montant HT x (1 + taux
          TVA). Par exemple, pour 100 EUR HT avec une TVA a 20% : 100 x 1.20 =
          120 EUR TTC.
        </p>
        <p className="text-slate-600 leading-relaxed">
          <strong>TTC vers HT :</strong> Montant HT = Montant TTC / (1 + taux
          TVA). Par exemple, pour 120 EUR TTC avec une TVA a 20% : 120 / 1.20 =
          100 EUR HT.
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-tva" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
