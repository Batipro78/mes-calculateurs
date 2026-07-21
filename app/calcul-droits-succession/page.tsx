import type { Metadata } from "next";
import CalculateurSuccession from "./CalculateurSuccession";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";
import HowToJsonLd from "../components/HowToJsonLd";

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
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Reduire legalement les droits de succession</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les droits de succession peuvent etre fortement alleges en anticipant de son vivant. Plusieurs
          dispositifs parfaitement legaux permettent de transmettre davantage a ses proches sans taxation.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Les principaux leviers</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>Donation tous les 15 ans</strong> : chaque parent peut donner jusqu&apos;a 100 000 &euro; par enfant en franchise de droits, renouvelable tous les 15 ans</li>
          <li><strong>Don familial de somme d&apos;argent</strong> : 31 865 &euro; supplementaires exoneres par un donateur de moins de 80 ans a un enfant ou petit-enfant majeur</li>
          <li><strong>Assurance-vie</strong> : les sommes versees avant 70 ans sont transmises hors succession, avec un abattement de 152 500 &euro; par beneficiaire</li>
          <li><strong>Demembrement de propriete</strong> : donner la nue-propriete en gardant l&apos;usufruit reduit la base taxable, car seule la valeur de la nue-propriete est imposee</li>
          <li><strong>Petits-enfants</strong> : un abattement specifique de 31 865 &euro; s&apos;applique aux donations grand-parent / petit-enfant</li>
        </ul>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Delais a respecter pour la declaration</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La declaration de succession doit etre deposee dans les <strong>6 mois</strong> suivant le deces
          (12 mois si le deces a eu lieu a l&apos;etranger). Au-dela, des interets de retard de 0,20 % par mois
          s&apos;appliquent, majores d&apos;une penalite de 10 % apres 6 mois de retard supplementaires. Le
          paiement peut etre fractionne ou differe sous conditions, notamment en cas de transmission
          d&apos;entreprise.
        </p>
        <p className="text-slate-600 leading-relaxed">
          En pratique, une transmission preparee 15 a 20 ans a l&apos;avance, en combinant donations successives
          et assurance-vie, permet souvent de <strong>diviser par deux ou trois</strong> la facture fiscale
          finale. Un notaire chiffrera la strategie la mieux adaptee a votre patrimoine.
        </p>
      </section>

      <HowToJsonLd
        name="Calculer les droits de succession 2026"
        steps={[
          { name: "Renseigner le lien de parente et la part successorale", text: "Indiquer le lien de parente avec le defunt (enfant, conjoint, frere ou soeur, neveu ou niece, tiers) et le montant de la part brute recue en heritage." },
          { name: "Appliquer l'abattement selon le lien de parente", text: "Déduire l'abattement : 100 000 EUR par enfant, 0 EUR pour le conjoint et le partenaire de PACS (exonération totale), 15 932 EUR pour un frere ou une soeur, 7 967 EUR pour un neveu ou une niece." },
          { name: "Calculer les droits sur la part taxable selon le barème progressif", text: "La part taxable (part brute moins abattement) est soumise au barème en ligne directe : 5% jusqu'à 8 072 EUR, 10% jusqu'à 12 109 EUR, 15% jusqu'à 15 932 EUR, 20% jusqu'à 552 324 EUR, puis 30%, 40% et 45% au-dela." },
        ]}
      />

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
