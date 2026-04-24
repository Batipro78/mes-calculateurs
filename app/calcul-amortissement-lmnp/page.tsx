import type { Metadata } from "next";
import CalculateurLMNP from "./CalculateurLMNP";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-amortissement-lmnp" },
  title: "Calcul Amortissement LMNP 2026 - Regime Reel vs Micro-BIC",
  description:
    "Simulez l'amortissement de votre LMNP en regime reel. Calculez l'economie d'impot vs micro-BIC. Amortissement bien (30 ans) + mobilier (7 ans).",
  keywords:
    "amortissement LMNP, calcul LMNP reel, LMNP micro-BIC, regime reel LMNP, fiscalite LMNP, amortissement meuble non professionnel",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qu'est-ce que l'amortissement en LMNP ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En LMNP (Location Meublee Non Professionnelle) regime reel, l'amortissement consiste a deduire chaque annee une fraction de la valeur du bien et du mobilier de vos revenus locatifs, comme le ferait une entreprise. Le bien immobilier (hors terrain) s'amortit typiquement sur 25 a 40 ans, le mobilier sur 5 a 10 ans. Cet amortissement est une charge non decaissable qui reduit le resultat fiscal et donc l'impot, tout en preservant votre tresorerie reelle.",
      },
    },
    {
      "@type": "Question",
      name: "LMNP micro-BIC ou reel : lequel choisir ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Micro-BIC : abattement forfaitaire de 50% sur les loyers (71% si meuble de tourisme classe), simple mais souvent moins avantageux. Regime reel : vous deduisez les charges reelles + l'amortissement, ce qui efface souvent totalement l'impot sur les loyers. Regle simple : le reel est quasi TOUJOURS plus avantageux des que vos charges reelles (taxes, copro, interets, amortissement) depassent 50% des loyers (soit quasi tous les cas). Obligation de comptabilite en reel (logiciel ou expert-comptable).",
      },
    },
    {
      "@type": "Question",
      name: "Quelle duree d'amortissement pour un bien LMNP ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Duree d'amortissement indicative LMNP (usage comptable francais) : Bien immobilier (hors terrain, non amortissable) : 25-40 ans (30 ans standard). Mobilier : 5-10 ans (lit, canape, table). Electromenager : 5-7 ans. Decoration/Linge : 5 ans. Gros oeuvre de renovation : 15-25 ans. Chaque composant peut etre amorti separement (methode dite 'par composants'). Un expert-comptable optimise la decomposition pour maximiser l'amortissement.",
      },
    },
    {
      "@type": "Question",
      name: "L'amortissement peut-il creer un deficit fiscal en LMNP ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non, en LMNP, l'amortissement ne peut PAS creer de deficit : il est plafonne au montant du resultat imposable (apres deduction des charges). La fraction non utilisee d'amortissement est reportable sans limite de temps, ce qui est tres avantageux : elle s'applique sur les benefices futurs. Contrairement au LMP (Loueur Meuble Professionnel), le deficit LMNP ne peut pas etre impute sur le revenu global.",
      },
    },
  ],
};

export default function Page() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <WebAppJsonLd name="Calcul Amortissement LMNP" description="Simulateur LMNP regime reel" category="FinanceApplication" />
      <Breadcrumb currentPage="Calcul Amortissement LMNP" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Amortissement LMNP</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulez l&apos;amortissement LMNP regime reel et l&apos;economie fiscale vs micro-BIC.
      </p>

      <CalculateurLMNP />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">LMNP reel : le meilleur regime pour l&apos;immobilier locatif meuble</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>LMNP au reel</strong> est souvent le regime fiscal le plus avantageux pour un investissement locatif meuble.
          Grace a l&apos;<strong>amortissement comptable</strong>, vous pouvez souvent reduire votre imposition sur les loyers
          a ZERO pendant plusieurs annees, sans perdre de tresorerie reelle.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Comment calculer l&apos;amortissement ?</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">3 etapes :</p>
        <ol className="list-decimal list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>Decomposer</strong> le prix d&apos;acquisition : terrain (non amortissable, ~10-20%), bien (amortissable), mobilier (amortissable plus rapidement)</li>
          <li><strong>Choisir les durees d&apos;amortissement</strong> : 30 ans pour le bien, 7 ans pour le mobilier (durees usuelles)</li>
          <li><strong>Calculer l&apos;annuite</strong> : valeur / duree = amortissement annuel deductible</li>
        </ol>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Exemple concret</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Bien a 200 000 EUR (dont 30 000 terrain) + 10 000 EUR mobilier, loyers 12 000 EUR/an, charges 3 500 EUR/an, TMI 30% :
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li>Amortissement bien : 160 000 / 30 ans = <strong>5 333 EUR/an</strong></li>
          <li>Amortissement mobilier : 10 000 / 7 ans = <strong>1 429 EUR/an</strong></li>
          <li>Total amortissement : <strong>6 762 EUR/an</strong></li>
          <li>Resultat imposable : 12 000 - 3 500 - 6 762 = <strong>1 738 EUR</strong></li>
          <li>Impot annuel : 1 738 × (30% + 17,2%) = <strong>820 EUR</strong></li>
          <li>Micro-BIC : (12 000 × 50%) × 47,2% = <strong>2 832 EUR</strong></li>
          <li><strong>Gain avec le reel : ~2 000 EUR/an</strong></li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Avantages & limites</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <p className="font-bold text-emerald-900 mb-2">Avantages</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>+ Reduction massive de l&apos;impot sur loyers</li>
              <li>+ Preservation de la tresorerie</li>
              <li>+ Report illimite des amortissements non utilises</li>
              <li>+ Statut LMNP accessible (loyers &lt; 23 000 EUR)</li>
            </ul>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="font-bold text-amber-900 mb-2">Limites</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>- Comptabilite obligatoire (expert-comptable conseille)</li>
              <li>- Cout comptable : 300-1 000 EUR/an</li>
              <li>- L&apos;amortissement ne cree pas de deficit</li>
              <li>- Impact sur plus-value en cas de revente</li>
            </ul>
          </div>
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-amortissement-lmnp" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
