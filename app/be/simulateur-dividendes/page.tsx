import type { Metadata } from "next";
import SimulateurDividendesBE from "./SimulateurDividendesBE";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import WebAppJsonLd from "../../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "/be/simulateur-dividendes",
    languages: {
      "fr-BE": "/be/simulateur-dividendes",
      "fr-FR": "/simulateur-dividendes",
    },
  },
  title: "Simulateur Dividendes Belgique 2026 - Calcul Précompte Mobilier",
  description:
    "Calculez vos dividendes nets en Belgique : standard 30%, VVPRbis 15%, liquidation 6,5%. Exonération personne physique 833 EUR/an. Conforme baremes 2026.",
  keywords:
    "dividendes Belgique, précompte mobilier, VVPRbis, liquidation, simulation dividendes, impot dividendes",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Simulateur Dividendes Belgique"
        description="Calcul des dividendes nets avec précompte mobilier belge"
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
                name: "Quel est le taux de précompte mobilier standard en Belgique 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le taux standard de précompte mobilier en Belgique est de 30% sur tous les dividendes et intérêts. C'est le régime qui s'applique par défaut à la plupart des contribuables.",
                },
              },
              {
                "@type": "Question",
                name: "Qu'est-ce que le régime VVPRbis à 15% en Belgique ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le régime VVPRbis (Voordelig VermogensRendement) s'applique aux petites et moyennes entreprises constituées après 2013 avec un apport minimum de 18 550 EUR. Le précompte mobilier est réduit à 15% sur les dividendes.",
                },
              },
              {
                "@type": "Question",
                name: "Qu'est-ce que l'exonération de 833 EUR de dividendes pour personne physique ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les personnes physiques peuvent exonérer jusqu'à 833 EUR de dividendes par an. Cela signifie que vous ne payez pas de précompte sur les premiers 833 EUR de dividendes reçus (maximum 249,90 EUR de précompte récupérable).",
                },
              },
              {
                "@type": "Question",
                name: "Puis-je récupérer le précompte mobilier sur ma déclaration d'impôt ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Oui, les personnes physiques résidentes en Belgique peuvent déduire le précompte mobilier payé sur leur déclaration d'impôt. Le montant peut être déduit du précompte retenu ou générer un remboursement selon votre situation fiscale globale.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        currentPage="Simulateur Dividendes Belgique"
        parentPage="Belgique"
        parentHref="/be"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💰
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Dividendes Belgique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez vos dividendes nets après précompte mobilier belge. Régimes
        standard, VVPRbis et liquidation. Instant.
      </p>

      <SimulateurDividendesBE />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Régimes de précompte mobilier Belgique (2026)
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">30 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Standard
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Taux normal sur tous dividendes et intérêts
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">15 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              VVPRbis
            </p>
            <p className="text-xs text-slate-400 mt-1">
              PME constituée &gt;2013, apport min 18 550 EUR
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">6,5 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Liquidation
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Réserves constituées après 2025, distribuées 3+ ans
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Comment fonctionne le précompte mobilier ?
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          Le <strong>précompte mobilier</strong> est un impôt retenu à la source
          sur les dividendes et intérêts payés par les entreprises belges. Il
          est déduit directement du montant versé au bénéficiaire. Le taux
          standard est de <strong>30%</strong>, mais des régimes réduits
          existent pour certaines situations (VVPRbis 15%, liquidation 6,5%).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Exonération annuelle pour personnes physiques
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Les <strong>personnes physiques résidentes en Belgique</strong> peuvent
          exonérer jusqu'à <strong>833 EUR de dividendes par année civile</strong>
          . Cette exonération réduit le précompte retenu. Pour l'impôt sur le
          revenu, le précompte payé peut ensuite être déduit ou générer un
          remboursement selon votre situation globale.
        </p>
      </section>
    </div>
  );
}
