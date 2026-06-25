import type { Metadata } from "next";
import CalculateurRevenusFonciers from "./CalculateurRevenusFonciers";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-revenus-fonciers" },
  title: "Calcul Revenus Fonciers 2026 - Simulateur Impot Location Gratuit",
  description:
    "Simulez l'imposition de vos revenus fonciers 2026. Comparez micro-foncier (abattement 30%) vs regime reel, deficit foncier, prelevements sociaux 17,2%. Bareme TMI inclus.",
  keywords:
    "calcul revenus fonciers, simulateur impot location, micro foncier regime reel, deficit foncier, charges deductibles location, impot loyer 2026, prelevements sociaux revenus fonciers",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quelle difference entre micro-foncier et regime reel ?",
    a: "Le micro-foncier applique un abattement forfaitaire de 30% sur les loyers bruts (accessible si loyers < 15 000 €/an). Le regime reel deduit les charges reelles : taxe fonciere, assurance, interets d'emprunt, travaux, frais de gestion. Le reel est plus avantageux quand les charges reelles depassent 30% des loyers.",
  },
  {
    q: "Qu'est-ce que le deficit foncier ?",
    a: "En regime reel, si vos charges deductibles depassent vos loyers, vous creez un deficit foncier. Celui-ci est imputable sur votre revenu global dans la limite de 10 700 €/an, ce qui reduit directement votre impot sur le revenu. L'exces est reportable sur les revenus fonciers des 10 annees suivantes.",
  },
  {
    q: "Quelles charges sont deductibles en regime reel ?",
    a: "En regime reel, vous pouvez deduire : la taxe fonciere, les primes d'assurance, les interets et frais d'emprunt, les depenses de travaux (entretien, reparation, amelioration), les frais de gestion locative, les charges de copropriete non recuperables, et les frais de diagnostics. Les travaux de construction ou d'agrandissement ne sont pas deductibles.",
  },
  {
    q: "Peut-on passer du micro-foncier au regime reel ?",
    a: "Oui. Le passage au regime reel est possible a tout moment. En revanche, une fois opte pour le reel, vous y etes engage pendant 3 ans minimum. Il est conseille de faire les calculs pour comparer les deux regimes avant de choisir, surtout si vous avez des travaux importants ou un emprunt en cours.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Revenus Fonciers" />
      <Breadcrumb currentPage="Revenus Fonciers" lastUpdated="8 avril 2026" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏘️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Revenus Fonciers 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulez l&apos;imposition de vos loyers. Comparez micro-foncier vs regime reel, identifiez le regime le plus avantageux.
      </p>

      <CalculateurRevenusFonciers />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Micro-foncier ou regime reel : comment choisir ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les <strong>revenus fonciers</strong> sont les loyers percus de la location de biens immobiliers
          non meublas. Ils sont imposes a votre tranche marginale d&apos;imposition (TMI) + 17,2% de prelevements
          sociaux. Deux regimes s&apos;appliquent :
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <p className="font-bold text-emerald-800 mb-2">Micro-foncier</p>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>• Loyers bruts &lt; 15 000 &euro;/an</li>
              <li>• Abattement forfaitaire de <strong>30%</strong></li>
              <li>• Pas de justificatifs de charges</li>
              <li>• Declaration simplifiee (2042)</li>
            </ul>
          </div>
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
            <p className="font-bold text-indigo-800 mb-2">Regime reel</p>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Applicable quel que soit le montant</li>
              <li>• Deduction des <strong>charges reelles</strong></li>
              <li>• Creation possible d&apos;un deficit foncier</li>
              <li>• Declaration 2044 obligatoire</li>
            </ul>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Charges deductibles en regime reel</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { charge: "Taxe fonciere", detail: "Part non recuperee sur le locataire" },
            { charge: "Interets d'emprunt", detail: "Interets + assurance pret immobilier" },
            { charge: "Travaux d'entretien", detail: "Reparations, amelioration (hors construction)" },
            { charge: "Frais de gestion", detail: "Agence, syndic, frais de procedures" },
            { charge: "Assurances", detail: "PNO, garantie loyers impayes" },
            { charge: "Charges de copropriete", detail: "Non recuperables aupres du locataire" },
          ].map((item) => (
            <div key={item.charge} className="bg-slate-50 rounded-xl p-3">
              <p className="text-sm font-semibold text-slate-700">{item.charge}</p>
              <p className="text-xs text-slate-500">{item.detail}</p>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Impact de la TMI sur votre imposition</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">TMI</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">IR seul</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">IR + PS (17,2%)</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux effectif micro</th>
              </tr>
            </thead>
            <tbody>
              {[0, 11, 30, 41, 45].map((t) => (
                <tr key={t} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 font-semibold text-slate-800">{t}%</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{t}%</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-indigo-600">{(t + 17.2).toFixed(1)}%</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{((t + 17.2) * 0.7).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">* Taux effectif micro = (TMI + PS) x 70% (apres abattement 30%)</p>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Le deficit foncier : l&apos;arme du regime reel</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le grand atout du regime reel, c&apos;est le <strong>deficit foncier</strong>. Quand vos charges
          deductibles (travaux, interets, taxe fonciere...) depassent vos loyers, le surplus vient effacer une
          partie de votre impot, et pas seulement sur vos revenus locatifs.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Comment ca fonctionne</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li>Le deficit (hors interets d&apos;emprunt) s&apos;impute sur votre <strong>revenu global</strong> jusqu&apos;a <strong>10 700 &euro;/an</strong>, ce qui reduit directement votre impot sur le revenu</li>
          <li>Ce plafond est porte a <strong>21 400 &euro;</strong> pour les travaux de renovation energetique sortant un logement du statut de passoire thermique (depenses payees jusqu&apos;a fin 2025)</li>
          <li>La part de deficit au-dela du plafond, ainsi que celle issue des interets d&apos;emprunt, est <strong>reportable 10 ans</strong> sur vos seuls revenus fonciers</li>
        </ul>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">La condition a ne pas oublier</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour conserver l&apos;avantage, vous devez continuer a <strong>louer le bien pendant 3 ans</strong> apres
          l&apos;annee d&apos;imputation du deficit. Une revente ou une mise a disposition anticipee entraine la
          remise en cause de l&apos;economie d&apos;impot.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">La declaration en pratique</h3>
        <p className="text-slate-600 leading-relaxed">
          Le regime reel impose la declaration <strong>2044</strong> (ou 2044 speciale), en complement de votre
          declaration de revenus. Vous y detaillez loyers encaisses et charges payees dans l&apos;annee. Bien que
          l&apos;impot soit preleve a la source via un acompte, c&apos;est cette declaration annuelle qui ajuste le
          montant reellement du. Conservez toutes vos factures : en cas de controle, seules les depenses
          justifiees sont admises.
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode={`Les revenus fonciers (location nue) sont imposes au micro-foncier (abattement de 30 %) en dessous de 15 000 euros de loyers annuels, ou au regime reel (deduction des charges reelles) au-dela ou sur option. Le simulateur compare les deux regimes.`}
        sources={[
          { label: "Impots.gouv.fr - Revenus fonciers", url: "https://www.impots.gouv.fr/particulier/les-revenus-fonciers" },
          { label: "Service-Public.fr - Revenus fonciers", url: "https://www.service-public.fr/particuliers/vosdroits/F1989" },
        ]}
      />

      <RelatedCalculators currentSlug="/calcul-revenus-fonciers" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
