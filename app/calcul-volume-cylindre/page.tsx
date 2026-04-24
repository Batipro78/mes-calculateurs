import type { Metadata } from "next";
import CalculateurVolumeCylindre from "./CalculateurVolumeCylindre";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-volume-cylindre" },
  title: "Calcul Volume Cylindre - Formule, Surface, Litres",
  description:
    "Calculez le volume d'un cylindre a partir du rayon et de la hauteur. Formule pi r2 h, surface laterale et totale, conversion en litres. Gratuit.",
  keywords:
    "calcul volume cylindre, volume cylindre formule, pi r2 h, surface cylindre, volume en litres, cylindre calcul, calculer volume cylindre",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Volume Cylindre" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Comment calculer le volume d'un cylindre ?",
            acceptedAnswer: { "@type": "Answer", text: "Volume = pi x rayon\u00b2 x hauteur. Si le rayon est de 5 cm et la hauteur de 10 cm : V = 3,14159 x 25 x 10 = 785,40 cm\u00b3 (soit 0,785 litres)." } },
          { "@type": "Question", name: "Comment convertir un volume en litres ?",
            acceptedAnswer: { "@type": "Answer", text: "1 litre = 1 000 cm\u00b3 = 1 dm\u00b3. Divisez le volume en cm\u00b3 par 1 000 pour obtenir des litres. Exemple : 5 000 cm\u00b3 = 5 litres." } },
        ]
      }) }} />
      <Breadcrumb currentPage="Volume Cylindre" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-sm">🛢️</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Volume Cylindre</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Calculez le volume, la surface laterale et totale d&apos;un cylindre. Conversion en litres.</p>
      <CalculateurVolumeCylindre />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Tableau de volumes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Rayon</th>
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Hauteur</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Volume</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Litres</th>
            </tr></thead>
            <tbody>
              {[[2,5],[3,8],[5,10],[5,20],[10,15],[10,30],[15,20],[20,40],[25,50]].map(([r,h]) => {
                const v = Math.PI * r * r * h;
                return (
                  <tr key={`${r}-${h}`} className="border-b border-slate-100">
                    <td className="py-2.5 px-2 text-slate-700">{r}</td>
                    <td className="py-2.5 px-2 text-slate-700">{h}</td>
                    <td className="py-2.5 px-2 text-right font-semibold text-teal-600">{v.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}</td>
                    <td className="py-2.5 px-2 text-right text-slate-500">{(v / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 2 })} L</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <RelatedCalculators currentSlug="/calcul-volume-cylindre" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
