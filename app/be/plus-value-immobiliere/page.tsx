import type { Metadata } from "next";
import CalculateurPlusValueBE from "./CalculateurPlusValueBE";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import WebAppJsonLd from "../../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "/be/plus-value-immobiliere",
    languages: {
      "fr-BE": "/be/plus-value-immobiliere",
    },
  },
  title: "Calcul Plus-Value Immobilière Belgique 2026 - Simulateur Fiscal",
  description:
    "Calculez la plus-value immobilière en Belgique : taxe 16.5%, 33%, exonérations. Habitation principale, bien bâti, terrain. Impôt gratuit instantané.",
  keywords:
    "plus-value immobilière Belgique, calcul taxe vente bien, impôt plus-value, exonération habitation principale, terrain, bien bâti",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Calcul Plus-Value Immobilière Belgique"
        description="Calculateur de taxe plus-value immobilière belge 2026"
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
                name: "Habitation principale : est-elle exonérée en Belgique ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Oui, la vente d&apos;une habitation principale (résidence du vendeur) est complètement exonérée de taxe sur la plus-value en Belgique, quelle que soit la durée de détention. C&apos;est l&apos;avantage principal en Belgique par rapport aux autres pays.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la règle des 5 ans pour un bien bâti ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Un bien bâti (maison ou appartement) revendu dans les 5 ans est imposé à 16,5 % sur la plus-value. Si la vente intervient après 5 ans de détention, la plus-value est exonérée de taxe. Cette règle ne s&apos;applique pas à l&apos;habitation principale.",
                },
              },
              {
                "@type": "Question",
                name: "Comment fonctionne la règle des 8 ans pour un terrain ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Un terrain (bien non-bâti) est soumis à des taux progressifs : 33 % si revendu avant 5 ans, 16,5 % entre 5 et 8 ans, et exonération totale après 8 ans de détention.",
                },
              },
              {
                "@type": "Question",
                name: "Comment calculer la plus-value immobilière ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Plus-value brute = Prix de vente - Prix d&apos;achat - Frais d&apos;acquisition (droits d&apos;enregistrement, honoraires notaire ~ 12,5%) - Travaux réalisés avec factures. Puis : Impôt = Plus-value brute × Taux applicable. Plus-value nette = Plus-value brute - Impôt.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        currentPage="Plus-Value Immobilière"
        parentPage="Belgique"
        parentHref="/be"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Plus-Value Immobilière Belgique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez la taxe sur votre plus-value : habitation principale, bien
        bâti, terrain. Taux 2026 officiels.
      </p>

      <CalculateurPlusValueBE />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Taxe plus-value immobilière en Belgique (2026)
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">0 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Habitation principale
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Résidence du vendeur — Exonération totale
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-orange-600">16,5 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Bien bâti &lt;5 ans
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Maison/Apartment revendu avant 5 ans
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-red-600">33 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Terrain &lt;5 ans
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Bien non-bâti revendu avant 5 ans
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">0 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              &gt;5-8 ans
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Bien bâti ≥5 ans, terrain ≥8 ans
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Comment calculer la plus-value immobilière ?
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          <strong>Plus-value brute :</strong> Prix de vente − Prix d&apos;achat
          − Frais d&apos;acquisition (droits d&apos;enregistrement, honoraires
          notaire, environ 12,5 % du prix d&apos;achat) − Travaux réalisés avec
          factures.
        </p>
        <p className="text-slate-600 leading-relaxed mb-3">
          <strong>Impôt :</strong> Plus-value brute × Taux applicable (en fonction
          du type de bien et de la durée).
        </p>
        <p className="text-slate-600 leading-relaxed">
          <strong>Plus-value nette :</strong> Plus-value brute − Impôt. C&apos;est
          votre bénéfice net après impôt.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Exonérations et cas particuliers (2026)
        </h3>
        <ul className="text-slate-600 leading-relaxed space-y-2">
          <li>
            🏠 <strong>Habitation principale</strong> : Exonération totale quelle
            que soit la durée. C&apos;est la résidence fiscale du vendeur.
          </li>
          <li>
            🏢 <strong>Bien bâti d&apos;investissement</strong> : 16,5 % si revendu
            avant 5 ans, 0 % après 5 ans.
          </li>
          <li>
            🌱 <strong>Terrain (bien non-bâti)</strong> : 33 % avant 5 ans, 16,5 %
            entre 5 et 8 ans, 0 % après 8 ans.
          </li>
          <li>
            📋 <strong>Travaux</strong> : Déductibles uniquement avec factures à
            l&apos;appui.
          </li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Sources officielles</h3>
        <p className="text-slate-600 leading-relaxed text-sm">
          Barèmes et règles issus de : SPF Finances Belgique, notaire.be,
          ekilibre.be. Pour une analyse précise, consultez un notaire ou un
          expert-comptable.
        </p>
      </section>
    </div>
  );
}
