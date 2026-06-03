import type { Metadata } from "next";
import CalculateurSuccession from "./CalculateurSuccession";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-droits-succession" },
  title: "Calcul Droits de Succession 2026 - Bareme et Abattements",
  description:
    "Calculez les droits de succession 2026. Bareme par lien de parente, abattements (100 000\u20ac enfants), exoneration conjoint. Simulateur gratuit.",
  keywords:
    "calcul droits succession, droits de succession 2026, bareme succession, abattement succession, simulateur succession, heritage impot, droits mutation",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Le conjoint paye-t-il des droits de succession ?",
    a: "Non. Le conjoint survivant et le partenaire de PACS sont totalement exon\u00e9r\u00e9s de droits de succession, quel que soit le montant h\u00e9rit\u00e9.",
  },
  {
    q: "Quel est l'abattement pour les enfants ?",
    a: "Chaque enfant b\u00e9n\u00e9ficie d'un abattement de 100 000 \u20ac sur sa part d'h\u00e9ritage. Au-del\u00e0, les droits sont calcul\u00e9s selon un bar\u00e8me progressif de 5 % \u00e0 45 %.",
  },
  {
    q: "Quels sont les droits de succession entre fr\u00e8res et s\u0153urs ?",
    a: "Entre fr\u00e8res et s\u0153urs, l'abattement est de 15 932 \u20ac. Au-del\u00e0, le taux est de 35 % jusqu'\u00e0 24 430 \u20ac puis 45 %. Une exon\u00e9ration totale existe si le fr\u00e8re ou la s\u0153ur est c\u00e9libataire, veuf ou divorc\u00e9, \u00e2g\u00e9 de plus de 50 ans et domicili\u00e9 chez le d\u00e9funt depuis 5 ans.",
  },
  {
    q: "Comment sont calcul\u00e9s les droits de succession en ligne directe ?",
    a: "Les droits de succession en ligne directe (parents-enfants) s'appliquent apr\u00e8s d\u00e9duction de l'abattement de 100 000 \u20ac. La part taxable est ensuite soumise \u00e0 un bar\u00e8me progressif : 5 % jusqu'\u00e0 8 072 \u20ac, 10 % de 8 072 \u20ac \u00e0 12 109 \u20ac, 15 % jusqu'\u00e0 15 932 \u20ac, 20 % jusqu'\u00e0 552 324 \u20ac, 30 % puis 40 % et 45 % pour les parts tr\u00e8s \u00e9lev\u00e9es.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Droits Succession" />
      <Breadcrumb currentPage="Droits de Succession" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-xl shadow-sm">⚖️</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Droits de Succession 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Simulez les droits de succession selon le lien de parente, le montant et le nombre d&apos;heritiers.</p>
      <CalculateurSuccession />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Bareme des droits de succession (ligne directe)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Tranche</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux</th>
            </tr></thead>
            <tbody>
              {[
                { t: "0 - 8 072 \u20ac", tx: "5%" }, { t: "8 072 - 12 109 \u20ac", tx: "10%" },
                { t: "12 109 - 15 932 \u20ac", tx: "15%" }, { t: "15 932 - 552 324 \u20ac", tx: "20%" },
                { t: "552 324 - 902 838 \u20ac", tx: "30%" }, { t: "902 838 - 1 805 677 \u20ac", tx: "40%" },
                { t: "Au-dela de 1 805 677 \u20ac", tx: "45%" },
              ].map((r) => (
                <tr key={r.t} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 text-slate-700">{r.t}</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-slate-800">{r.tx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mt-8 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
        <p className="text-sm text-amber-900">
          <strong>Information indicative.</strong> Ce calcul donne une
          estimation des droits de succession bases sur le bareme fiscal en
          vigueur. Il ne constitue pas un conseil juridique ou fiscal
          personnalise. Pour une succession reelle, consultez un notaire qui
          tiendra compte des exonerations, des donations anterieures, du
          regime matrimonial et de la nature des biens.
        </p>
      </section>
      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode={`Les droits de succession se calculent sur la part nette taxable de chaque heritier, apres abattement selon le lien de parente, puis application du bareme progressif correspondant.`}
        sources={[
          { label: "Service-Public.fr - Droits de succession", url: "https://www.service-public.fr/particuliers/vosdroits/F14198" },
          { label: "Impots.gouv.fr - Succession", url: "https://www.impots.gouv.fr/particulier/succession" },
        ]}
      />

      <RelatedCalculators currentSlug="/calcul-droits-succession" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
