import type { Metadata } from "next";
import SimulateurIS from "./SimulateurIS";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/simulateur-impot-societe" },
  title: "Simulateur Impot Societe (IS) 2026 - Calcul 15% / 25%",
  description:
    "Calculez l'Impot sur les Societes 2026 : taux reduit PME 15% jusqu'a 42 500 EUR, taux normal 25% au-dela. Simulateur gratuit art. 219 CGI.",
  keywords:
    "impot societe, IS 2026, simulateur IS, taux reduit PME 15%, impot entreprise, calcul IS, article 219 CGI",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quel est le taux de l'IS en 2026 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En 2026, le taux normal de l'Impot sur les Societes est de 25% sur l'ensemble du benefice imposable. Les PME eligibles beneficient d'un taux reduit de 15% sur les 42 500 premiers euros de benefice, puis 25% au-dela. Exemple : pour 100 000 EUR de benefice, une PME paie 15% × 42 500 + 25% × 57 500 = 20 750 EUR, contre 25 000 EUR pour une grande entreprise.",
      },
    },
    {
      "@type": "Question",
      name: "Qui peut beneficier du taux reduit PME a 15% ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pour beneficier du taux reduit d'IS a 15%, la societe doit remplir 3 conditions cumulatives : chiffre d'affaires inferieur a 10 000 000 EUR HT, capital entierement libere, et au moins 75% du capital detenu de maniere continue par des personnes physiques (ou par des PME eligibles au meme regime). Cette reduction s'applique sur les 42 500 premiers euros de benefice imposable.",
      },
    },
    {
      "@type": "Question",
      name: "Comment est calcule le benefice imposable a l'IS ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le benefice imposable a l'IS correspond au resultat comptable apres retraitements fiscaux : on ajoute les charges non deductibles (amendes, cadeaux >69 EUR, etc.) et on deduit les produits non imposables. Les amortissements, provisions et remuneration du dirigeant sont deductibles dans les limites legales. Le deficit fiscal peut etre reporte en avant (sans limite) ou en arriere (1 an, dans la limite d'1 M EUR).",
      },
    },
  ],
};

export default function Page() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <WebAppJsonLd name="Simulateur IS" description="Simulateur Impot sur les Societes 2026" category="FinanceApplication" />
      <Breadcrumb currentPage="Simulateur IS" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏦
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Simulateur IS 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez l&apos;Impot sur les Societes avec le bareme 2026 : 15% PME jusqu&apos;a 42 500 EUR, 25% au-dela.
      </p>

      <SimulateurIS />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">L&apos;IS en 2026 : taux et fonctionnement</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;<strong>Impot sur les Societes (IS)</strong> s&apos;applique aux societes de capitaux (SA, SAS, SARL, etc.)
          et aux SCI optant pour l&apos;IS. Il est calcule sur le <strong>benefice imposable</strong> (resultat comptable
          retraite). Article 219 CGI.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Bareme IS 2026</h3>
        <table className="w-full text-sm mb-4">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-2 px-2 text-slate-500">Tranche</th>
              <th className="text-right py-2 px-2 text-slate-500">Taux PME eligibles</th>
              <th className="text-right py-2 px-2 text-slate-500">Taux normal</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="py-2 px-2">0 - 42 500 EUR</td>
              <td className="py-2 px-2 text-right font-bold text-emerald-600">15%</td>
              <td className="py-2 px-2 text-right">25%</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 px-2">Au-dela de 42 500 EUR</td>
              <td className="py-2 px-2 text-right">25%</td>
              <td className="py-2 px-2 text-right">25%</td>
            </tr>
          </tbody>
        </table>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Conditions du taux reduit PME 15%</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li>Chiffre d&apos;affaires HT &lt; <strong>10 000 000 EUR</strong></li>
          <li>Capital <strong>entierement libere</strong></li>
          <li>Au moins <strong>75% du capital</strong> detenu par des personnes physiques (ou PME eligibles)</li>
          <li>Applicable sur les <strong>42 500 premiers euros</strong> de benefice</li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Paiement de l&apos;IS</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li><strong>4 acomptes trimestriels</strong> : 15 mars, 15 juin, 15 septembre, 15 decembre</li>
          <li><strong>Solde</strong> : 15 mai (exercice cloture 31/12) ou 4 mois apres cloture</li>
          <li>Dispense d&apos;acomptes si IS N-1 &lt; 3 000 EUR</li>
        </ul>
      </section>

      <RelatedCalculators currentSlug="/simulateur-impot-societe" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
