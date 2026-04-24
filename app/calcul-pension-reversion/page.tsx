import type { Metadata } from "next";
import CalculateurPensionReversion from "./CalculateurPensionReversion";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-pension-reversion" },
  title: "Calcul Pension de Reversion 2026 - Montant et Conditions",
  description:
    "Calculez votre pension de reversion : regime general (54%) et AGIRC-ARRCO (60%). Plafond de ressources, age minimum, montant estime. Bareme 2026.",
  keywords:
    "pension de reversion, calcul pension reversion, montant pension reversion, reversion conjoint, reversion regime general, reversion agirc arrco, pension veuf veuve",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Pension Reversion" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Quel est le montant de la pension de reversion ?",
            acceptedAnswer: { "@type": "Answer", text: "La pension de reversion du regime general represente 54% de la retraite du conjoint decede. La complementaire AGIRC-ARRCO represente 60%. Ces montants sont soumis a des conditions de ressources." } },
          { "@type": "Question", name: "A quel age peut-on toucher la pension de reversion ?",
            acceptedAnswer: { "@type": "Answer", text: "L'age minimum est de 55 ans pour le regime general. Pour l'AGIRC-ARRCO, l'age minimum est egalement de 55 ans, mais sans condition de ressources a partir de 55 ans." } },
        ]
      }) }} />
      <Breadcrumb currentPage="Pension de Reversion" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">💜</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Pension de Reversion 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Estimez votre pension de reversion : regime general (54%) et complementaire (60%).</p>
      <CalculateurPensionReversion />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Pension de reversion : comment ca marche ?</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">La <strong>pension de reversion</strong> permet au conjoint survivant de percevoir une partie de la retraite du defunt. Le taux varie selon le regime.</p>
        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          <div className="bg-violet-50/50 rounded-xl p-4">
            <p className="font-semibold text-violet-700">Regime general</p>
            <p className="text-sm text-slate-600">54% de la pension — sous conditions de ressources</p>
          </div>
          <div className="bg-violet-50/50 rounded-xl p-4">
            <p className="font-semibold text-violet-700">AGIRC-ARRCO</p>
            <p className="text-sm text-slate-600">60% de la pension — pas de condition de ressources</p>
          </div>
        </div>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">Tableau par pension du defunt (regime general)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Pension defunt</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Reversion (54%)</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Annuel</th>
            </tr></thead>
            <tbody>
              {[800, 1000, 1200, 1500, 1800, 2000, 2500, 3000].map((p) => (
                <tr key={p} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 text-slate-700">{p.toLocaleString("fr-FR")} &euro;</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-violet-600">{Math.round(p * 0.54).toLocaleString("fr-FR")} &euro;</td>
                  <td className="py-2.5 px-2 text-right text-slate-500">{Math.round(p * 0.54 * 12).toLocaleString("fr-FR")} &euro;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <RelatedCalculators currentSlug="/calcul-pension-reversion" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
