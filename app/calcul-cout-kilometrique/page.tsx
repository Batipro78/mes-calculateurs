import type { Metadata } from "next";
import CalculateurCoutKm from "./CalculateurCoutKm";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Calcul Cout Kilometrique 2026 - Bareme Fiscal IK",
  description:
    "Calculez votre cout kilometrique avec le bareme fiscal 2026. Indemnites km par puissance fiscale, distance, vehicule electrique (+20%). Bareme officiel.",
  keywords:
    "cout kilometrique, bareme kilometrique 2026, indemnite kilometrique, calcul IK, frais kilometriques, bareme fiscal voiture, cout km vehicule",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Cout Kilometrique" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Comment fonctionne le bareme kilometrique ?",
            acceptedAnswer: { "@type": "Answer", text: "Le bareme kilometrique fiscal permet de deduire les frais de deplacement professionnel de ses impots. Il prend en compte la puissance fiscale du vehicule et la distance annuelle parcourue. Il couvre le carburant, l'assurance, l'entretien et la depreciation." } },
          { "@type": "Question", name: "Les vehicules electriques ont-ils un avantage ?",
            acceptedAnswer: { "@type": "Answer", text: "Oui, les vehicules electriques beneficient d'une majoration de 20% sur le bareme kilometrique. Cela encourage l'utilisation de vehicules propres pour les trajets professionnels." } },
        ]
      }) }} />
      <Breadcrumb currentPage="Cout Kilometrique" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">🚙</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Cout Kilometrique 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Calculez votre indemnite kilometrique avec le bareme fiscal officiel 2026.</p>
      <CalculateurCoutKm />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Bareme kilometrique 2026 (voiture)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">CV fiscaux</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">&le; 5 000 km</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">5 001-20 000</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">&gt; 20 000</th>
            </tr></thead>
            <tbody>
              {[
                { cv: "3 CV", a: "d x 0,529", b: "d x 0,316 + 1065", c: "d x 0,370" },
                { cv: "4 CV", a: "d x 0,606", b: "d x 0,340 + 1330", c: "d x 0,407" },
                { cv: "5 CV", a: "d x 0,636", b: "d x 0,357 + 1395", c: "d x 0,427" },
                { cv: "6 CV", a: "d x 0,665", b: "d x 0,374 + 1457", c: "d x 0,447" },
                { cv: "7+ CV", a: "d x 0,697", b: "d x 0,394 + 1515", c: "d x 0,470" },
              ].map((r) => (
                <tr key={r.cv} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 font-semibold text-slate-700">{r.cv}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600 text-xs">{r.a}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600 text-xs">{r.b}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600 text-xs">{r.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <RelatedCalculators currentSlug="/calcul-cout-kilometrique" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
