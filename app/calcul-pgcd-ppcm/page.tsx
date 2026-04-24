import type { Metadata } from "next";
import CalculateurPgcdPpcm from "./CalculateurPgcdPpcm";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-pgcd-ppcm" },
  title: "Calcul PGCD et PPCM - Algorithme d'Euclide",
  description:
    "Calculez le PGCD et le PPCM de deux nombres. Algorithme d'Euclide detaille, decomposition en facteurs premiers, verification. Gratuit.",
  keywords:
    "calcul pgcd, calcul ppcm, pgcd ppcm en ligne, algorithme euclide, plus grand commun diviseur, plus petit commun multiple, facteurs premiers, pgcd ppcm calculatrice",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul PGCD PPCM" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Comment calculer le PGCD de deux nombres ?",
            acceptedAnswer: { "@type": "Answer", text: "Le PGCD (Plus Grand Commun Diviseur) se calcule avec l'algorithme d'Euclide : on divise le plus grand nombre par le plus petit, puis on recommence avec le diviseur et le reste, jusqu'a obtenir un reste de 0. Le dernier diviseur non nul est le PGCD." } },
          { "@type": "Question", name: "Comment calculer le PPCM ?",
            acceptedAnswer: { "@type": "Answer", text: "Le PPCM (Plus Petit Commun Multiple) se calcule avec la formule : PPCM(a, b) = (a x b) / PGCD(a, b). Il suffit donc de connaitre le PGCD pour calculer le PPCM." } },
          { "@type": "Question", name: "A quoi servent le PGCD et le PPCM ?",
            acceptedAnswer: { "@type": "Answer", text: "Le PGCD sert a simplifier les fractions, trouver des mesures communes. Le PPCM sert a trouver un denominateur commun pour additionner des fractions, synchroniser des cycles ou calculer des periodicites." } },
        ]
      }) }} />
      <Breadcrumb currentPage="PGCD / PPCM" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center text-xl shadow-sm">🔢</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul PGCD et PPCM</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Trouvez le PGCD et le PPCM de deux nombres. Algorithme d&apos;Euclide detaille et facteurs premiers.</p>

      <CalculateurPgcdPpcm />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">PGCD et PPCM : explications</h2>
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div className="bg-purple-50/50 rounded-xl p-4">
            <p className="font-semibold text-purple-700 mb-1">PGCD</p>
            <p className="text-sm text-slate-600">Plus Grand Commun Diviseur : le plus grand nombre qui divise a et b sans reste.</p>
          </div>
          <div className="bg-purple-50/50 rounded-xl p-4">
            <p className="font-semibold text-purple-700 mb-1">PPCM</p>
            <p className="text-sm text-slate-600">Plus Petit Commun Multiple : le plus petit nombre qui est multiple de a et de b.</p>
          </div>
        </div>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">Relation fondamentale</h3>
        <div className="bg-purple-50/50 rounded-xl p-4 text-center">
          <p className="text-lg font-semibold text-purple-700">PGCD(a, b) &times; PPCM(a, b) = a &times; b</p>
        </div>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">Exemples courants</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">a, b</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">PGCD</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">PPCM</th>
            </tr></thead>
            <tbody>
              {[[12,18],[24,36],[15,20],[8,12],[100,75],[36,48]].map(([a,b]) => {
                const g = function pgcd(x: number, y: number): number { while(y){[x,y]=[y,x%y];} return x; }(a,b);
                return (
                  <tr key={`${a}-${b}`} className="border-b border-slate-100">
                    <td className="py-2.5 px-2 text-slate-700">{a} et {b}</td>
                    <td className="py-2.5 px-2 text-right font-bold text-purple-600">{g}</td>
                    <td className="py-2.5 px-2 text-right font-bold text-slate-700">{(a*b)/g}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-pgcd-ppcm" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
