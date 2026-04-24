import type { Metadata } from "next";
import CalculateurSurfaceCercle from "./CalculateurSurfaceCercle";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-surface-cercle" },
  title: "Calcul Surface Cercle - Aire, Perimetre, Rayon, Diametre",
  description:
    "Calculez la surface (aire) d'un cercle a partir du rayon, diametre ou perimetre. Formule pi x r2, perimetre, schema. Gratuit.",
  keywords:
    "calcul surface cercle, aire cercle, surface cercle formule, pi r carre, perimetre cercle, calcul aire disque, surface disque",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Surface Cercle" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Comment calculer la surface d'un cercle ?",
            acceptedAnswer: { "@type": "Answer", text: "La surface (aire) d'un cercle = pi x rayon au carre (pi x r\u00b2). Si le rayon est de 5 cm, la surface = 3,14159 x 25 = 78,54 cm\u00b2. Si vous connaissez le diametre, divisez-le par 2 pour obtenir le rayon." } },
          { "@type": "Question", name: "Comment calculer le perimetre d'un cercle ?",
            acceptedAnswer: { "@type": "Answer", text: "Le perimetre (circonference) d'un cercle = 2 x pi x rayon, ou pi x diametre. Si le rayon est de 5 cm, le perimetre = 2 x 3,14159 x 5 = 31,42 cm." } },
        ]
      }) }} />
      <Breadcrumb currentPage="Surface Cercle" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-xl shadow-sm">⭕</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Surface Cercle</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Calculez l&apos;aire, le perimetre, le rayon et le diametre d&apos;un cercle.</p>
      <CalculateurSurfaceCercle />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Tableau de surfaces</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Rayon</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Diametre</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Surface</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Perimetre</th>
            </tr></thead>
            <tbody>
              {[1,2,3,4,5,6,7,8,9,10,15,20,25,50,100].map((r) => (
                <tr key={r} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 font-semibold text-slate-700">{r}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{r * 2}</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-blue-600">{(Math.PI * r * r).toLocaleString("fr-FR", { maximumFractionDigits: 2 })}</td>
                  <td className="py-2.5 px-2 text-right text-slate-500">{(2 * Math.PI * r).toLocaleString("fr-FR", { maximumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <RelatedCalculators currentSlug="/calcul-surface-cercle" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
