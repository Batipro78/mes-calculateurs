import type { Metadata } from "next";
import CalculateurEssence from "./CalculateurEssence";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-consommation-essence" },
  title: "Calcul Consommation Essence - Cout Trajet et Prix Carburant",
  description:
    "Calculez le cout de votre trajet en carburant. Distance, consommation L/100km, prix du litre. Cout au kilometre et budget mensuel.",
  keywords:
    "calcul consommation essence, cout trajet voiture, prix carburant calcul, litres pour trajet, consommation carburant, cout km voiture, calculer essence trajet",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Consommation Essence" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment calculer le cout d'un trajet en voiture ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Cout = (consommation en L/100km / 100) x distance en km x prix du litre. Exemple : 7 L/100km, 500 km, 1,75\u20ac/L → (7/100) x 500 x 1,75 = 61,25\u20ac.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la consommation moyenne d'une voiture ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "En France, la consommation moyenne est d'environ 6-7 L/100km pour une voiture essence et 5-6 L/100km pour un diesel. Les citadines consomment 4-5 L, les SUV 8-10 L.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Consommation Essence" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center text-xl shadow-sm">⛽</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Consommation Essence</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Calculez le cout de votre trajet, les litres necessaires et le cout au kilometre.</p>

      <CalculateurEssence />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Consommation moyenne par type de vehicule</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Type</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Essence</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Diesel</th>
            </tr></thead>
            <tbody>
              {[
                { t: "Citadine (Clio, 208)", e: "5-6 L", d: "4-5 L" },
                { t: "Compacte (Golf, 308)", e: "6-7 L", d: "5-6 L" },
                { t: "Berline (Passat, 508)", e: "7-8 L", d: "5-7 L" },
                { t: "SUV compact (3008, Tiguan)", e: "7-9 L", d: "6-7 L" },
                { t: "SUV (Tucson, Kadjar)", e: "8-10 L", d: "6-8 L" },
                { t: "Utilitaire", e: "9-12 L", d: "7-9 L" },
              ].map((r) => (
                <tr key={r.t} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 text-slate-700">{r.t}</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-red-600">{r.e}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{r.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Conseils pour reduire sa consommation</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { c: "Pression des pneus", d: "+0,5 bar = +4% conso" },
            { c: "Vitesse 130 → 110 km/h", d: "Economie ~20% sur autoroute" },
            { c: "Conduite souple", d: "Anticiper, eviter freinages brusques" },
            { c: "Climatisation", d: "+10 a 20% de consommation" },
          ].map((item) => (
            <div key={item.c} className="bg-slate-50 rounded-xl p-3">
              <p className="text-sm font-semibold text-slate-700">{item.c}</p>
              <p className="text-xs text-slate-500">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-consommation-essence" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
