import type { Metadata } from "next";
import SimulateurDividendes from "./SimulateurDividendes";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/simulateur-dividendes" },
  title: "Simulateur Dividendes 2026 - PFU vs Bareme Progressif",
  description:
    "Calculez l'impot sur vos dividendes en 2026. Comparez PFU (flat tax 30%) vs bareme progressif avec abattement 40%. Gerant majoritaire : cotisations TNS.",
  keywords:
    "simulateur dividendes, impot dividendes 2026, PFU dividendes, flat tax 30%, abattement 40% dividendes, dividendes gerant majoritaire",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quelle fiscalite s'applique aux dividendes en 2026 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Par defaut, les dividendes sont soumis au PFU (Prelevement Forfaitaire Unique) de 30% = 12,8% d'impot sur le revenu + 17,2% de prelevements sociaux. Cette flat tax est prelevee a la source par l'etablissement payeur. L'alternative : opter pour le bareme progressif de l'IR qui applique un abattement de 40% avant imposition a la TMI + 17,2% PS sur le brut. L'option bareme est GLOBALE (applicable a tous les revenus de capitaux mobiliers de l'annee).",
      },
    },
    {
      "@type": "Question",
      name: "Quand choisir le bareme progressif plutot que le PFU ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le bareme est plus avantageux si votre TMI est faible (0%, 11%) car l'abattement de 40% + la TMI + PS est inferieur au PFU 30%. Exemple : TMI 11%, dividendes 10 000 EUR : bareme = (10 000 × 60% × 11%) + (10 000 × 17,2%) = 660 + 1 720 = 2 380 EUR (24%) vs PFU 3 000 EUR (30%). A partir de TMI 30%, le PFU est quasi-toujours plus avantageux. Toujours simuler avant de choisir.",
      },
    },
    {
      "@type": "Question",
      name: "Dividendes ou remuneration : que choisir en tant que dirigeant ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Remuneration : deductible du benefice IS (baisse l'IS) mais soumise aux charges sociales URSSAF (~75% en SAS, ~45% en EURL/SARL gerant majoritaire TNS) et a l'IR sur le revenu. Dividendes : non deductibles de l'IS (25% ou 15% PME) mais soumis au PFU 30% (+cotisations TNS si gerant majoritaire SARL/EURL au-dela de 10% du capital). Regle generale : en SAS avec IS 25%, optimisation par remuneration jusqu'a couvrir la remuneration minimum, puis dividendes. En SARL, la remuneration est souvent preferable car le regime TNS est moins couteux que le regime general.",
      },
    },
    {
      "@type": "Question",
      name: "Qu'est-ce que la regle des 10% pour les dividendes de gerant majoritaire ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pour les gerants majoritaires de SARL/EURL (ou assimiles TNS), la part des dividendes depassant 10% du capital social + primes d'emission + soldes moyens annuels des comptes courants d'associe est soumise a cotisations sociales TNS (~25-40% selon les tranches). Exemple : capital 10 000 EUR, dividendes 50 000 EUR → 1 000 EUR au-dessus de 10% = 49 000 EUR soumis a cotisations (+ environ 10 000 EUR de charges sociales supplementaires). Cette regle ne s'applique PAS aux presidents de SAS (affilies au regime general).",
      },
    },
  ],
};

export default function Page() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <WebAppJsonLd name="Simulateur Dividendes" description="PFU vs bareme progressif 2026" category="FinanceApplication" />
      <Breadcrumb currentPage="Simulateur Dividendes" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💎
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Simulateur Dividendes 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Comparez PFU (flat tax 30%) vs bareme progressif avec abattement 40%. Choisissez l&apos;option la plus avantageuse.
      </p>

      <SimulateurDividendes />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Fiscalite des dividendes en 2026</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          En France, les dividendes peuvent etre imposes selon 2 regimes au choix du contribuable :
          le <strong>PFU (Prelevement Forfaitaire Unique)</strong> a 30% (defaut depuis 2018) ou le <strong>bareme progressif</strong>
          de l&apos;impot sur le revenu (option globale annuelle).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Option 1 : PFU (Flat tax 30%)</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>12,8%</strong> d&apos;impot sur le revenu</li>
          <li><strong>17,2%</strong> de prelevements sociaux (CSG, CRDS, prelevement solidarite)</li>
          <li>Total : <strong>30%</strong> (flat tax)</li>
          <li>Preleve a la source, pas de declaration complexe</li>
          <li>Pas d&apos;abattement, pas de deduction</li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Option 2 : Bareme progressif</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>Abattement 40%</strong> sur le montant brut (dividendes d&apos;actions FR/UE)</li>
          <li>Le montant apres abattement s&apos;ajoute au revenu imposable et est taxe a la TMI</li>
          <li><strong>17,2%</strong> de prelevements sociaux (sur le BRUT, pas sur la base apres abattement)</li>
          <li>Deductibilite partielle de la CSG (6,8%) l&apos;annee suivante</li>
          <li>Option GLOBALE : applicable a tous les revenus de capitaux mobiliers de l&apos;annee</li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Quel regime est le plus avantageux ?</h3>
        <table className="w-full text-sm mb-4">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-2 px-2 text-slate-500">TMI</th>
              <th className="text-right py-2 px-2 text-slate-500">PFU</th>
              <th className="text-right py-2 px-2 text-slate-500">Bareme</th>
              <th className="text-right py-2 px-2 text-slate-500">Meilleur</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">0%</td><td className="py-2 px-2 text-right">30%</td><td className="py-2 px-2 text-right">17,2%</td><td className="py-2 px-2 text-right text-emerald-600 font-bold">Bareme</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">11%</td><td className="py-2 px-2 text-right">30%</td><td className="py-2 px-2 text-right">23,8%</td><td className="py-2 px-2 text-right text-emerald-600 font-bold">Bareme</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">30%</td><td className="py-2 px-2 text-right">30%</td><td className="py-2 px-2 text-right">35,2%</td><td className="py-2 px-2 text-right text-violet-600 font-bold">PFU</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">41%</td><td className="py-2 px-2 text-right">30%</td><td className="py-2 px-2 text-right">41,8%</td><td className="py-2 px-2 text-right text-violet-600 font-bold">PFU</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">45%</td><td className="py-2 px-2 text-right">30%</td><td className="py-2 px-2 text-right">44,2%</td><td className="py-2 px-2 text-right text-violet-600 font-bold">PFU</td></tr>
          </tbody>
        </table>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Cas particulier : gerant majoritaire SARL/EURL</h3>
        <p className="text-slate-600 leading-relaxed">
          Attention : si vous etes <strong>gerant majoritaire</strong> d&apos;une SARL ou EURL (affilie TNS), la part de vos
          dividendes depassant <strong>10% du capital social</strong> (+ primes d&apos;emission + soldes moyens annuels des
          comptes courants d&apos;associe) est soumise aux <strong>cotisations sociales TNS</strong> (~25-40% selon les tranches).
          Cette regle ne s&apos;applique pas aux presidents de SAS (regime general).
        </p>
      </section>

      <RelatedCalculators currentSlug="/simulateur-dividendes" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
