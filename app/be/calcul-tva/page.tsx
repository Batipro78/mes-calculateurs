import type { Metadata } from "next";
import CalculateurTVABE from "./CalculateurTVABE";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import WebAppJsonLd from "../../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "/be/calcul-tva",
    languages: {
      "fr-BE": "/be/calcul-tva",
      "fr-FR": "/calcul-tva",
    },
  },
  title: "Calcul TVA Belgique 2026 - Convertisseur HTVA / TVAC",
  description:
    "Calculez la TVA belge instantanement : 21 %, 12 % et 6 %. Conversion HTVA vers TVAC et inversement. Conforme baremes 2026.",
  keywords:
    "TVA Belgique, calcul TVA belge, HTVA, TVAC, taux TVA 21%, taux TVA 6%, taux TVA 12%",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Calcul TVA Belgique"
        description="Calculateur de TVA belge 21% / 12% / 6%"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quels sont les taux de TVA en Belgique en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La Belgique applique 4 taux de TVA : 21 % (taux normal pour la plupart des biens et services), 12 % (taux intermediaire pour la restauration, le charbon et depuis 2026 les hotels et campings), 6 % (taux reduit pour l'alimentation de base, les livres, les medicaments non rembourses, les transports publics et les renovations de batiments de plus de 10 ans) et 0 % (journaux et certains biens specifiques).",
                },
              },
              {
                "@type": "Question",
                name: "Comment calculer la TVA belge ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour passer de HTVA a TVAC : Montant TVAC = Montant HTVA x (1 + taux). Par exemple, 100 EUR HTVA avec TVA a 21 % = 121 EUR TVAC. Pour passer de TVAC a HTVA : Montant HTVA = Montant TVAC / (1 + taux). Par exemple, 121 EUR TVAC / 1,21 = 100 EUR HTVA.",
                },
              },
              {
                "@type": "Question",
                name: "Quoi de neuf pour la TVA belge en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Deux modifications principales en 2026 : les hotels et campings passent de 6 % a 12 %, et les produits phytopharmaceutiques passent de 12 % a 21 %. Les autres taux restent inchanges.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul TVA Belgique" parentPage="Belgique" parentHref="/be" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🧾
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul TVA Belgique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Convertissez entre HTVA et TVAC avec les taux belges officiels 2026.
        Resultat instantane.
      </p>

      <CalculateurTVABE />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les taux de TVA en Belgique (2026)
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">21 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux normal
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Tous biens et services non specifiquement reduits
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">12 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux intermediaire
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Restauration, charbon, hotels/campings (depuis 2026)
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">6 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux reduit
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Alimentation, livres, eau, transports publics
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">0 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux zero
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Journaux, recyclage, exports
            </p>
          </div>
        </div>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Comment calculer la TVA en Belgique ?
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          <strong>HTVA vers TVAC :</strong> Montant TVAC = Montant HTVA x (1 +
          taux de TVA). Par exemple, pour 100 EUR HTVA avec une TVA a 21 % :
          100 x 1,21 = 121 EUR TVAC.
        </p>
        <p className="text-slate-600 leading-relaxed">
          <strong>TVAC vers HTVA :</strong> Montant HTVA = Montant TVAC / (1 +
          taux de TVA). Par exemple, pour 121 EUR TVAC avec une TVA a 21 % :
          121 / 1,21 = 100 EUR HTVA.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Changements TVA 2026
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Deux changements de taux sont entres en vigueur en 2026 en Belgique :
          les <strong>hotels et campings</strong> sont passes de 6 % a 12 %, et
          les <strong>produits phytopharmaceutiques</strong> sont passes de 12 %
          a 21 %. Pour le reste, les taux restent identiques.
        </p>
      </section>
    </div>
  );
}
