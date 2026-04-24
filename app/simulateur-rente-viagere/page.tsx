import type { Metadata } from "next";
import SimulateurRenteViagere from "./SimulateurRenteViagere";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/simulateur-rente-viagere" },
  title: "Simulateur Rente Viagere 2026 - Conversion capital en rente",
  description:
    "Calculez votre rente viagere : taux de conversion selon age, fiscalite avec abattement (article 158-6 CGI), rente nette apres impots. Assurance-vie, PER, Madelin.",
  keywords:
    "rente viagere, simulateur rente, conversion capital rente, rente assurance-vie, rente PER, fiscalite rente viagere, abattement age rente",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Comment est calculee une rente viagere ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La rente viagere est calculee en multipliant le capital par un taux de conversion fixe par l'assureur. Ce taux depend de votre age au 1er versement (plus on est age, plus le taux est eleve car l'esperance de vie est plus courte), du taux technique du contrat (~1% en 2026) et des options (reversion conjoint, annuites garanties). Exemples : 60 ans = ~4,3%, 65 ans = ~4,9%, 70 ans = ~5,7%.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la fiscalite d'une rente viagere en 2026 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pour une rente viagere a titre onereux (issue d'une assurance-vie), seule une fraction est imposable selon l'age au 1er versement (art. 158-6 CGI) : 70% imposable avant 50 ans, 50% entre 50-59 ans, 40% entre 60-69 ans, 30% apres 70 ans. Cette fraction est soumise a la TMI + 17,2% de prelevements sociaux. Pour un PER, la rente est integralement imposable comme une pension de retraite.",
      },
    },
    {
      "@type": "Question",
      name: "Vaut-il mieux sortir en rente ou en capital ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La sortie en capital offre plus de flexibilite (vous gardez le contrôle du capital et pouvez le transmettre) mais n'apporte aucune garantie a vie. La rente viagere garantit un revenu a vie (securite maximale) mais vous perdez le capital au deces (sauf option annuites garanties ou reversion). La rente est pertinente si vous vivez longtemps (80+ ans). Le breakeven se situe souvent vers 18-22 ans de rente. Une solution hybride : sortir 50% en capital et 50% en rente.",
      },
    },
    {
      "@type": "Question",
      name: "Qu'est-ce que la reversion au conjoint pour une rente ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'option reversion permet que votre conjoint continue a percevoir la rente (60%, 80% ou 100%) apres votre deces, a vie. En contrepartie, votre propre rente est reduite d'environ 15-20% (car l'esperance de duree de versement est plus longue). Option recommandee pour les couples maries sans autres ressources.",
      },
    },
  ],
};

export default function Page() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <WebAppJsonLd name="Simulateur Rente Viagere" description="Conversion capital en rente viagere" category="FinanceApplication" />
      <Breadcrumb currentPage="Simulateur Rente Viagere" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏦
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Simulateur Rente Viagere 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Convertissez votre capital en rente viagere et calculez le revenu net apres fiscalite.
      </p>

      <SimulateurRenteViagere />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Rente viagere : comprendre le mecanisme</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La <strong>rente viagere</strong> transforme un capital en revenu garanti a vie. L&apos;assureur calcule le
          montant en fonction de votre <strong>age</strong> (esperance de vie), du <strong>taux technique</strong> (rendement garanti)
          et des options choisies.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Taux de conversion indicatifs 2026</h3>
        <table className="w-full text-sm mb-4">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-2 px-2 text-slate-500">Age au 1er versement</th>
              <th className="text-right py-2 px-2 text-slate-500">Taux rente simple</th>
              <th className="text-right py-2 px-2 text-slate-500">Taux rente reversion</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">60 ans</td><td className="py-2 px-2 text-right">~4,3%</td><td className="py-2 px-2 text-right">~3,7%</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">65 ans</td><td className="py-2 px-2 text-right">~4,9%</td><td className="py-2 px-2 text-right">~4,2%</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">70 ans</td><td className="py-2 px-2 text-right">~5,7%</td><td className="py-2 px-2 text-right">~4,8%</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">75 ans</td><td className="py-2 px-2 text-right">~6,8%</td><td className="py-2 px-2 text-right">~5,8%</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">80 ans</td><td className="py-2 px-2 text-right">~8,3%</td><td className="py-2 px-2 text-right">~7,1%</td></tr>
          </tbody>
        </table>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Fiscalite tres avantageuse (rente a titre onereux)</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;article 158-6 du CGI permet un <strong>abattement progressif</strong> selon l&apos;age au 1er versement :
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li>Avant 50 ans : 30% d&apos;abattement (70% imposable)</li>
          <li>50-59 ans : 50% d&apos;abattement</li>
          <li>60-69 ans : <strong>60% d&apos;abattement</strong> (40% imposable — cas le plus frequent)</li>
          <li>70 ans et plus : 70% d&apos;abattement (30% imposable — optimal)</li>
        </ul>
        <p className="text-slate-600 leading-relaxed">
          <strong>Astuce</strong> : attendre 70 ans pour demander la conversion en rente maximise l&apos;abattement
          (70%) et booste le taux de conversion (~5,7%).
        </p>
      </section>

      <RelatedCalculators currentSlug="/simulateur-rente-viagere" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
