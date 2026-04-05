import type { Metadata } from "next";
import CalculateurRentabilite from "./CalculateurRentabilite";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Calcul Rentabilite Locative - Brute et Nette 2026",
  description:
    "Calculez la rentabilite locative brute et nette de votre investissement immobilier. Charges, taxe fonciere, vacance locative. Simulateur gratuit.",
  keywords:
    "calcul rentabilite locative, rentabilite brute nette, rendement locatif, investissement immobilier rentabilite, simulateur rentabilite locative, rendement immobilier 2026",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Rentabilite Locative" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment calculer la rentabilite locative brute ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Rentabilite brute = (loyer annuel / prix d'achat total) x 100. Exemple : loyer 800\u20ac/mois, achat 200 000\u20ac → (9 600 / 200 000) x 100 = 4,8%. C'est un indicateur rapide mais ne tient pas compte des charges.",
                },
              },
              {
                "@type": "Question",
                name: "Comment calculer la rentabilite locative nette ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Rentabilite nette = ((loyer annuel - charges - taxe fonciere) / investissement total) x 100. L'investissement total inclut le prix d'achat, les frais de notaire et les travaux. C'est l'indicateur le plus fiable.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est une bonne rentabilite locative ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "En France, la rentabilite nette moyenne se situe entre 3% et 5%. Au-dessus de 5% net, c'est considere comme bon. Au-dessus de 7%, c'est excellent. En dessous de 3%, c'est faible sauf si la plus-value attendue compense.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Rentabilite Locative" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏢
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Rentabilite Locative 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez la rentabilite brute et nette de votre investissement locatif. Charges, taxe fonciere, vacance.
      </p>

      <CalculateurRentabilite />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Comment calculer la rentabilite locative ?</h2>

        <h3 className="font-bold text-slate-800 mt-4 mb-3">Formules</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-amber-50/50 rounded-xl p-4">
            <p className="font-semibold text-amber-700 mb-1">Rentabilite brute</p>
            <p className="text-sm text-slate-600">(Loyer annuel &divide; Prix d&apos;achat) &times; 100</p>
          </div>
          <div className="bg-amber-50/50 rounded-xl p-4">
            <p className="font-semibold text-amber-700 mb-1">Rentabilite nette</p>
            <p className="text-sm text-slate-600">(Loyer net &divide; Invest. total) &times; 100</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Echelle de rentabilite</h3>
        <div className="space-y-2">
          {[
            { label: "Excellente", range: "> 7%", color: "bg-green-100 text-green-700" },
            { label: "Bonne", range: "5% - 7%", color: "bg-emerald-100 text-emerald-700" },
            { label: "Moyenne", range: "3% - 5%", color: "bg-amber-100 text-amber-700" },
            { label: "Faible", range: "< 3%", color: "bg-red-100 text-red-700" },
          ].map((r) => (
            <div key={r.label} className={`rounded-xl p-3 flex justify-between items-center ${r.color}`}>
              <span className="text-sm font-semibold">{r.label}</span>
              <span className="text-xs">{r.range}</span>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Rentabilite moyenne par ville (2026)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Ville</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Renta brute moy.</th>
            </tr></thead>
            <tbody>
              {[
                { v: "Paris", r: "2,5% - 3,5%" }, { v: "Lyon", r: "3% - 4,5%" }, { v: "Marseille", r: "4% - 6%" },
                { v: "Bordeaux", r: "3% - 4,5%" }, { v: "Lille", r: "4,5% - 6,5%" }, { v: "Toulouse", r: "3,5% - 5%" },
                { v: "Saint-Etienne", r: "6% - 10%" }, { v: "Mulhouse", r: "7% - 12%" },
              ].map((item) => (
                <tr key={item.v} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 text-slate-700">{item.v}</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-amber-600">{item.r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-rentabilite-locative" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
