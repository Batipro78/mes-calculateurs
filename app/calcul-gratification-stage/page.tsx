import type { Metadata } from "next";
import CalculateurGratificationStage from "./CalculateurGratificationStage";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Calcul Gratification Stage 2026 - Montant Minimum et Total",
  description:
    "Calculez la gratification de stage 2026 : montant mensuel, total, minimum legal (4,35\u20ac/h). Stage obligatoire ou facultatif, exoneration charges.",
  keywords:
    "gratification stage 2026, calcul gratification stage, montant minimum stage, indemnite stage, stage remuneration, gratification obligatoire stage",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Gratification Stage" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Quel est le montant minimum de la gratification de stage en 2026 ?",
            acceptedAnswer: { "@type": "Answer", text: "En 2026, la gratification minimale est de 4,35\u20ac par heure de presence effective (15% du plafond horaire de la Securite sociale). Pour un stage a temps plein (35h/semaine), cela represente environ 600\u20ac par mois." } },
          { "@type": "Question", name: "A partir de quelle duree la gratification est-elle obligatoire ?",
            acceptedAnswer: { "@type": "Answer", text: "La gratification est obligatoire des que le stage depasse 2 mois consecutifs (soit plus de 44 jours de presence effective, ou 308 heures). En dessous de cette duree, elle est facultative." } },
        ]
      }) }} />
      <Breadcrumb currentPage="Gratification Stage" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">🎓</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Gratification Stage 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Calculez votre gratification de stage : montant mensuel, total et minimum legal.</p>
      <CalculateurGratificationStage />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Regles de la gratification de stage</h2>
        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          <div className="bg-indigo-50/50 rounded-xl p-4">
            <p className="font-semibold text-indigo-700">Stage &le; 2 mois</p>
            <p className="text-sm text-slate-600">Gratification facultative</p>
          </div>
          <div className="bg-indigo-50/50 rounded-xl p-4">
            <p className="font-semibold text-indigo-700">Stage &gt; 2 mois</p>
            <p className="text-sm text-slate-600">Gratification obligatoire (min 4,35 &euro;/h)</p>
          </div>
        </div>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">Tableau par duree (35h/semaine, minimum legal)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Duree</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Mensuel</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Total</th>
            </tr></thead>
            <tbody>
              {[1,2,3,4,5,6].map((m) => {
                const hMois = 35 * 52 / 12;
                const mensuel = 4.35 * hMois;
                return (
                  <tr key={m} className="border-b border-slate-100">
                    <td className="py-2.5 px-2 text-slate-700">{m} mois</td>
                    <td className="py-2.5 px-2 text-right font-semibold text-indigo-600">{mensuel.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} &euro;</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{(mensuel * m).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} &euro;</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <RelatedCalculators currentSlug="/calcul-gratification-stage" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
