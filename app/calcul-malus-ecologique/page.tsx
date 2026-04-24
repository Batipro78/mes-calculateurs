import type { Metadata } from "next";
import CalculateurMalus from "./CalculateurMalus";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-malus-ecologique" },
  title: "Calcul Malus Ecologique 2026 - CO2 et Poids",
  description:
    "Calculez le malus ecologique 2026 de votre vehicule. Malus CO2 (seuil 113 g/km) et malus au poids (seuil 1600 kg). Bareme officiel, plafond 70 000 euros.",
  keywords:
    "malus ecologique 2026, calcul malus co2, malus poids voiture, bareme malus 2026, simulateur malus ecologique, taxe co2 voiture 2026, malus automobile",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Malus Ecologique" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "A partir de combien de CO2 paye-t-on le malus en 2026 ?",
            acceptedAnswer: { "@type": "Answer", text: "En 2026, le malus CO2 s'applique a partir de 114 g/km de CO2 (seuil abaisse par rapport a 2025). Le montant demarre a 50 euros et peut atteindre 70 000 euros pour les vehicules les plus polluants." } },
          { "@type": "Question", name: "Comment fonctionne le malus au poids ?",
            acceptedAnswer: { "@type": "Answer", text: "Le malus au poids s'applique aux vehicules de plus de 1 600 kg. Le tarif est de 10 euros par kg au-dessus de ce seuil. Les vehicules electriques et hybrides rechargeables en sont exoneres." } },
          { "@type": "Question", name: "Le malus CO2 et le malus poids se cumulent-ils ?",
            acceptedAnswer: { "@type": "Answer", text: "Non, on retient le montant le plus eleve entre le malus CO2 et le malus au poids. Ils ne se cumulent pas." } },
        ]
      }) }} />
      <Breadcrumb currentPage="Malus Ecologique" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl flex items-center justify-center text-xl shadow-sm">🚗</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Malus Ecologique 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Simulez le malus CO2 et le malus au poids de votre vehicule. Bareme officiel 2026.</p>

      <CalculateurMalus />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Bareme malus CO2 2026</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Emissions CO2</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Malus</th>
            </tr></thead>
            <tbody>
              {[
                { co2: "\u2264 113 g/km", malus: "0 \u20ac" },
                { co2: "114 g/km", malus: "50 \u20ac" },
                { co2: "120 g/km", malus: "200 \u20ac" },
                { co2: "130 g/km", malus: "700 \u20ac" },
                { co2: "140 g/km", malus: "1 500 \u20ac" },
                { co2: "150 g/km", malus: "3 000 \u20ac" },
                { co2: "160 g/km", malus: "5 500 \u20ac" },
                { co2: "170 g/km", malus: "9 500 \u20ac" },
                { co2: "180 g/km", malus: "15 500 \u20ac" },
                { co2: "190 g/km", malus: "23 500 \u20ac" },
                { co2: "200 g/km", malus: "33 500 \u20ac" },
                { co2: "210+ g/km", malus: "45 500 \u20ac+" },
                { co2: "Plafond", malus: "70 000 \u20ac" },
              ].map((r) => (
                <tr key={r.co2} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 text-slate-700">{r.co2}</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-rose-600">{r.malus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Exonerations</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { cas: "Vehicule electrique", d: "Exonere CO2 + poids" },
            { cas: "Hybride rechargeable (< 50 g)", d: "Exonere CO2 + poids" },
            { cas: "Famille nombreuse (3+ enfants)", d: "Abattement 20 g/km par enfant" },
            { cas: "Personne handicapee", d: "Exoneration sous conditions" },
          ].map((item) => (
            <div key={item.cas} className="bg-slate-50 rounded-xl p-3">
              <p className="text-sm font-semibold text-slate-700">{item.cas}</p>
              <p className="text-xs text-slate-500">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-malus-ecologique" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
