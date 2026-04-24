import type { Metadata } from "next";
import CalculateurSuccession from "./CalculateurSuccession";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-droits-succession" },
  title: "Calcul Droits de Succession 2026 - Bareme et Abattements",
  description:
    "Calculez les droits de succession 2026. Bareme par lien de parente, abattements (100 000\u20ac enfants), exoneration conjoint. Simulateur gratuit.",
  keywords:
    "calcul droits succession, droits de succession 2026, bareme succession, abattement succession, simulateur succession, heritage impot, droits mutation",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Droits Succession" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Le conjoint paye-t-il des droits de succession ?",
            acceptedAnswer: { "@type": "Answer", text: "Non. Le conjoint survivant et le partenaire de PACS sont totalement exoneres de droits de succession, quel que soit le montant herite." } },
          { "@type": "Question", name: "Quel est l'abattement pour les enfants ?",
            acceptedAnswer: { "@type": "Answer", text: "Chaque enfant beneficie d'un abattement de 100 000\u20ac sur sa part d'heritage. Au-dela, les droits sont calcules selon un bareme progressif de 5% a 45%." } },
        ]
      }) }} />
      <Breadcrumb currentPage="Droits de Succession" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-xl shadow-sm">⚖️</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Droits de Succession 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Simulez les droits de succession selon le lien de parente, le montant et le nombre d&apos;heritiers.</p>
      <CalculateurSuccession />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Bareme des droits de succession (ligne directe)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Tranche</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux</th>
            </tr></thead>
            <tbody>
              {[
                { t: "0 - 8 072 \u20ac", tx: "5%" }, { t: "8 072 - 12 109 \u20ac", tx: "10%" },
                { t: "12 109 - 15 932 \u20ac", tx: "15%" }, { t: "15 932 - 552 324 \u20ac", tx: "20%" },
                { t: "552 324 - 902 838 \u20ac", tx: "30%" }, { t: "902 838 - 1 805 677 \u20ac", tx: "40%" },
                { t: "Au-dela de 1 805 677 \u20ac", tx: "45%" },
              ].map((r) => (
                <tr key={r.t} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 text-slate-700">{r.t}</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-slate-800">{r.tx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <RelatedCalculators currentSlug="/calcul-droits-succession" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
