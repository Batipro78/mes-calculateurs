import type { Metadata } from "next";
import CalculateurInteretCompose from "./CalculateurInteretCompose";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-interet-compose" },
  title: "Calcul Interet Compose - Simulateur Epargne et Investissement",
  description:
    "Calculez les interets composes sur votre epargne ou investissement. Capital initial, versements mensuels, taux, duree. Tableau d'evolution annuel.",
  keywords:
    "calcul interet compose, interets composes simulateur, interet compose formule, simulateur placement, calculer interet compose, epargne interets composes",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Interet Compose" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Comment fonctionnent les interets composes ?",
            acceptedAnswer: { "@type": "Answer", text: "Les interets composes generent des interets sur les interets deja gagnes. Contrairement aux interets simples, le capital grandit de facon exponentielle. Formule : Capital final = Capital initial x (1 + taux)^duree. Einstein aurait qualifie les interets composes de \"8e merveille du monde\"." } },
          { "@type": "Question", name: "Combien rapportent 10 000 euros places a 5% pendant 20 ans ?",
            acceptedAnswer: { "@type": "Answer", text: "10 000 euros places a 5% par an pendant 20 ans deviennent 26 533 euros grace aux interets composes (sans versement additionnel). Avec 200 euros de versement mensuel en plus, le capital atteint 108 065 euros." } },
          { "@type": "Question", name: "Quelle est la difference entre interet simple et compose ?",
            acceptedAnswer: { "@type": "Answer", text: "Interet simple : les interets sont calcules uniquement sur le capital initial. Interet compose : les interets sont calcules sur le capital + les interets deja acquis. Sur 20 ans a 5%, 10 000 euros donnent 20 000 euros en simple mais 26 533 euros en compose." } },
        ]
      }) }} />
      <Breadcrumb currentPage="Interet Compose" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">📈</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Interet Compose</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Simulez la croissance de votre epargne avec les interets composes. Capital, versements, taux et duree.</p>

      <CalculateurInteretCompose />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">La puissance des interets composes</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les <strong>interets composes</strong> sont le principe selon lequel vos interets generent eux-memes des interets.
          Plus la duree est longue, plus l&apos;effet &quot;boule de neige&quot; est puissant.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">Exemples concrets (10 000 &euro; initiaux, sans versement)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Taux</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">5 ans</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">10 ans</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">20 ans</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">30 ans</th>
            </tr></thead>
            <tbody>
              {[3, 5, 7, 10].map((t) => (
                <tr key={t} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 font-semibold text-slate-700">{t}%</td>
                  {[5, 10, 20, 30].map((d) => (
                    <td key={d} className="py-2.5 px-2 text-right text-slate-600">
                      {(10000 * Math.pow(1 + t / 100, d)).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} &euro;
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">La regle des 72</h3>
        <p className="text-slate-600 leading-relaxed">
          Pour savoir en combien d&apos;annees votre capital double, divisez 72 par le taux annuel.
          Exemple : a 6%, votre capital double en 72 &divide; 6 = <strong>12 ans</strong>.
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-interet-compose" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
