import type { Metadata } from "next";
import CalculateurRacineCarree from "./CalculateurRacineCarree";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Calcul Racine Carree - Racine Cubique, Carres Parfaits",
  description:
    "Calculez la racine carree de n'importe quel nombre. Racine cubique, verification, carres parfaits proches. Tableau des racines. Gratuit.",
  keywords:
    "racine carree, calcul racine carree, racine carree en ligne, carre parfait, racine cubique, calculer racine, racine carree de, tableau racines carrees",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Racine Carree" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Comment calculer une racine carree ?",
            acceptedAnswer: { "@type": "Answer", text: "La racine carree de n est le nombre qui, multiplie par lui-meme, donne n. Exemple : \u221a144 = 12 car 12 \u00d7 12 = 144. Pour les nombres non parfaits, le resultat est decimal : \u221a2 \u2248 1,414213." } },
          { "@type": "Question", name: "Qu'est-ce qu'un carre parfait ?",
            acceptedAnswer: { "@type": "Answer", text: "Un carre parfait est un entier dont la racine carree est aussi un entier. Les premiers carres parfaits sont : 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256..." } },
        ]
      }) }} />
      <Breadcrumb currentPage="Racine Carree" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">&radic;</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Racine Carree</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Racine carree, cubique, verification et carres parfaits.</p>
      <CalculateurRacineCarree />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Tableau des racines carrees</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">n</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">&radic;n</th>
              <th className="text-left py-3 px-2 text-slate-500 font-medium">n</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">&radic;n</th>
            </tr></thead>
            <tbody>
              {Array.from({ length: 13 }, (_, i) => i + 1).map((n) => (
                <tr key={n} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 text-slate-700">{n}</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-amber-600">{Math.sqrt(n).toLocaleString("fr-FR", { maximumFractionDigits: 4 })}</td>
                  <td className="py-2.5 px-2 text-slate-700">{n * n}</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-amber-600">{n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">Les 20 premiers carres parfaits</h3>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 20 }, (_, i) => (i + 1) * (i + 1)).map((n) => (
            <span key={n} className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium">{n}</span>
          ))}
        </div>
      </section>
      <RelatedCalculators currentSlug="/calcul-racine-carree" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
