import type { Metadata } from "next";
import CalculateurIFI from "./CalculateurIFI";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-ifi" },
  title: "Calcul IFI 2026 - Simulateur Impot Fortune Immobiliere",
  description:
    "Calculez votre IFI 2026 : bareme officiel, abattement 30% residence principale, decote 1,3-1,4M EUR. Simulateur gratuit article 977 CGI.",
  keywords:
    "calcul IFI, impot fortune immobiliere, simulateur IFI 2026, bareme IFI, abattement residence principale IFI, decote IFI",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "A partir de quel patrimoine faut-il payer l'IFI ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'IFI (Impot sur la Fortune Immobiliere) concerne les foyers fiscaux dont le patrimoine immobilier net au 1er janvier depasse 1 300 000 EUR. Le patrimoine net = valeur venale des biens - dettes (emprunts) - abattement 30% sur la residence principale - autres exonerations. Les biens professionnels immobiliers et les SCPI en assurance-vie beneficient d'exonerations.",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le bareme de l'IFI en 2026 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bareme IFI 2026 (identique depuis 2018) : 0% jusqu'a 800 000 EUR, 0,5% de 800K a 1,3M, 0,7% de 1,3M a 2,57M, 1,0% de 2,57M a 5M, 1,25% de 5M a 10M, 1,5% au-dela de 10M. Il existe une decote pour les patrimoines entre 1,3M et 1,4M (degressive). La residence principale beneficie d'un abattement de 30%.",
      },
    },
    {
      "@type": "Question",
      name: "Comment reduire son IFI legalement ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plusieurs leviers legaux : 1) Investir dans des biens professionnels (exoneres), 2) Donation temporaire d'usufruit a un enfant majeur (le nu-proprietaire n'est pas redevable), 3) Reduction IFI-PME (50% du montant investi, plafond 50 000 EUR), 4) Dons a des organismes d'interet general (75% deductibles, plafond 50 000 EUR), 5) Detention via SCI a l'IS (la valeur des parts est prise mais l'IS allegera la valorisation), 6) Assurance-vie avec SCPI (les UC SCPI en assurance-vie ne sont que partiellement taxables).",
      },
    },
    {
      "@type": "Question",
      name: "Qu'est-ce que la decote IFI ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La decote (article 977-II CGI) s'applique aux patrimoines entre 1 300 000 EUR et 1 400 000 EUR pour lisser l'entree dans l'IFI. Formule : decote = 17 500 - (1,25% × patrimoine net). A 1,3M : decote ~1 250 EUR. A 1,35M : decote ~625 EUR. A 1,4M : decote = 0. Elle se deduit directement de l'IFI calcule.",
      },
    },
  ],
};

export default function Page() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <WebAppJsonLd name="Calcul IFI" description="Simulateur Impot Fortune Immobiliere 2026" category="FinanceApplication" />
      <Breadcrumb currentPage="Calcul IFI" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏛
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul IFI 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulateur officiel de l&apos;Impot sur la Fortune Immobiliere - bareme article 977 CGI.
      </p>

      <CalculateurIFI />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">L&apos;IFI en 2026 : ce qu&apos;il faut savoir</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;<strong>IFI (Impot sur la Fortune Immobiliere)</strong> a remplace l&apos;ISF en 2018. Il concerne
          uniquement le <strong>patrimoine immobilier</strong> (pas les placements financiers) des foyers dont le
          patrimoine net immo au 1er janvier depasse <strong>1 300 000 EUR</strong>. Environ 150 000 foyers sont
          redevables en France.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Bareme IFI 2026 (art. 977 CGI)</h3>
        <table className="w-full text-sm mb-4">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-2 px-2 text-slate-500">Tranche patrimoine net</th>
              <th className="text-right py-2 px-2 text-slate-500">Taux IFI</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">De 0 a 800 000 EUR</td><td className="py-2 px-2 text-right">0%</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">De 800 000 a 1 300 000 EUR</td><td className="py-2 px-2 text-right">0,50%</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">De 1 300 000 a 2 570 000 EUR</td><td className="py-2 px-2 text-right">0,70%</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">De 2 570 000 a 5 000 000 EUR</td><td className="py-2 px-2 text-right">1,00%</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">De 5 000 000 a 10 000 000 EUR</td><td className="py-2 px-2 text-right">1,25%</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">Au-dela de 10 000 000 EUR</td><td className="py-2 px-2 text-right">1,50%</td></tr>
          </tbody>
        </table>
        <p className="text-xs text-slate-500">
          Le seuil de declaration est 1,3M EUR mais le bareme commence a 800K. Decote pour les patrimoines entre 1,3M et 1,4M.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Qu&apos;est-ce qui entre dans l&apos;assiette ?</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>Residence principale</strong> (avec abattement de 30%)</li>
          <li>Residences secondaires, biens locatifs, terrains</li>
          <li>Parts de SCPI en direct, SCI, SCIC</li>
          <li>Fraction immobiliere des OPCI, SIIC</li>
          <li>Unites de compte immobilieres en assurance-vie (fraction seulement)</li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Ce qui n&apos;entre PAS</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>Comptes bancaires, livrets, actions, obligations</li>
          <li>Bijoux, oeuvres d&apos;art, collections</li>
          <li>Biens professionnels (activite principale)</li>
          <li>Forets et terres agricoles (exonerations partielles/totales)</li>
          <li>Objets de l&apos;IFI-PME souscrits</li>
        </ul>
      </section>

      <RelatedCalculators currentSlug="/calcul-ifi" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
