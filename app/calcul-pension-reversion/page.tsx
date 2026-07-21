import type { Metadata } from "next";
import CalculateurPensionReversion from "./CalculateurPensionReversion";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-pension-reversion" },
  title: "Calcul Pension de Reversion 2026 - Montant et Conditions",
  description:
    "Calculez votre pension de reversion : regime general (54%) et AGIRC-ARRCO (60%). Plafond de ressources, age minimum, montant estime. Bareme 2026.",
  keywords:
    "pension de reversion, calcul pension reversion, montant pension reversion, reversion conjoint, reversion regime general, reversion agirc arrco, pension veuf veuve",
};

const FAQ_ITEMS: FaqItem[] = [
  { q: "Quel est le montant de la pension de reversion ?", a: "La pension de reversion du regime general represente 54% de la retraite du conjoint decede. La complementaire AGIRC-ARRCO represente 60%. Ces montants sont soumis a des conditions de ressources." },
  { q: "A quel age peut-on toucher la pension de reversion ?", a: "L'age minimum est de 55 ans pour le regime general. Pour l'AGIRC-ARRCO, l'age minimum est egalement de 55 ans, mais sans condition de ressources a partir de 55 ans." },
  { q: "Le remariage supprime-t-il la pension de reversion ?", a: "Pour le regime general (Securite Sociale), le remariage, la vie en concubinage ou le PACS supprime la pension de reversion. Pour l'AGIRC-ARRCO (complementaire), la pension de reversion est maintenue meme en cas de remariage depuis 2017." },
  { q: "La pension de reversion est-elle soumise a conditions de ressources ?", a: "Oui, pour le regime general. Les ressources annuelles du conjoint survivant ne doivent pas depasser un plafond fixe chaque annee (environ 23 441 euros en 2026 pour une personne seule). Pour l'AGIRC-ARRCO, il n'y a pas de condition de ressources." },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Pension Reversion" />
      <Breadcrumb currentPage="Pension de Reversion" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">💜</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Pension de Reversion 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Estimez votre pension de reversion : regime general (54%) et complementaire (60%).</p>
      <CalculateurPensionReversion />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Pension de reversion : comment ca marche ?</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">La <strong>pension de reversion</strong> permet au conjoint survivant de percevoir une partie de la retraite du defunt. Le taux varie selon le regime.</p>
        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          <div className="bg-violet-50/50 rounded-xl p-4">
            <p className="font-semibold text-violet-700">Regime general</p>
            <p className="text-sm text-slate-600">54% de la pension — sous conditions de ressources</p>
          </div>
          <div className="bg-violet-50/50 rounded-xl p-4">
            <p className="font-semibold text-violet-700">AGIRC-ARRCO</p>
            <p className="text-sm text-slate-600">60% de la pension — pas de condition de ressources</p>
          </div>
        </div>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">Tableau par pension du defunt (regime general)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Pension defunt</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Reversion (54%)</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Annuel</th>
            </tr></thead>
            <tbody>
              {[800, 1000, 1200, 1500, 1800, 2000, 2500, 3000].map((p) => (
                <tr key={p} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 text-slate-700">{p.toLocaleString("fr-FR")} &euro;</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-violet-600">{Math.round(p * 0.54).toLocaleString("fr-FR")} &euro;</td>
                  <td className="py-2.5 px-2 text-right text-slate-500">{Math.round(p * 0.54 * 12).toLocaleString("fr-FR")} &euro;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Demander sa pension de reversion : demarches et delais</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La pension de reversion n&apos;est <strong>jamais attribuee automatiquement</strong> : le conjoint
          survivant doit en faire la demande, regime par regime. Le plus simple est de remplir la{" "}
          <strong>demande unique de retraite de reversion</strong> sur le site info-retraite.fr : elle est
          transmise d&apos;un coup a l&apos;ensemble des caisses (regime general, complementaire, fonction
          publique, regimes speciaux) aupres desquelles le defunt avait cotise.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Les etapes a suivre</h3>
        <ol className="list-decimal list-inside text-slate-600 space-y-1 mb-4">
          <li>Reunir les pieces : acte de deces, livret de famille, vos justificatifs de ressources, RIB</li>
          <li>Deposer la demande en ligne sur info-retraite.fr (ou par formulaire papier Cerfa)</li>
          <li>Indiquer tous les regimes du defunt (salarie, independant, agricole, public...)</li>
          <li>Attendre l&apos;instruction : comptez generalement 2 a 4 mois de traitement</li>
        </ol>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Attention au point de depart</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Si la demande est deposee dans les <strong>12 mois</strong> qui suivent le deces, la reversion prend
          effet le 1er jour du mois suivant le deces. Passe ce delai, elle ne demarre qu&apos;au 1er jour du
          mois suivant le depot : <strong>tarder a faire sa demande fait perdre des mois de pension</strong>,
          sans rattrapage. Mieux vaut donc lancer la demarche rapidement, meme si toutes les pieces ne sont pas
          encore reunies.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Cumul avec ses propres revenus</h3>
        <p className="text-slate-600 leading-relaxed">
          Au regime general, la reversion est soumise a un plafond de ressources : vos pensions de retraite
          personnelles, revenus d&apos;activite et certains biens sont pris en compte. Si vos ressources
          augmentent (reprise d&apos;activite, heritage), le montant peut etre revu a la baisse. La
          complementaire AGIRC-ARRCO, elle, n&apos;impose aucune condition de ressources : seul l&apos;age
          minimum (55 ans) compte.
        </p>
      </section>

      <HowToJsonLd
        name="Calculer sa pension de reversion"
        steps={[
          { name: "Saisir la pension mensuelle du defunt", text: "Entrer le montant mensuel brut de la retraite du conjoint decede, separement pour le régime général (Sécurité Sociale) et la complémentaire AGIRC-ARRCO si disponible." },
          { name: "Appliquer le taux de reversion", text: "Le régime général verse 54 % de la pension du defunt. L'AGIRC-ARRCO verse 60 %. Exemple : pension de 1 500 EUR - reversion régime général = 810 EUR/mois, AGIRC-ARRCO = 900 EUR/mois." },
          { name: "Vérifier les conditions d'eligibilite", text: "Régime général : avoir au moins 55 ans, ressources annuelles inferieures à environ 23 441 EUR en 2026 (personne seule), avoir ete marie(e) au defunt. AGIRC-ARRCO : 55 ans minimum, pas de condition de ressources." },
          { name: "Deposer la demande dans les 12 mois", text: "La pension de reversion n'est pas automatique. Deposer la demande unique sur info-retraite.fr dans les 12 mois du deces pour que la pension prenne effet au 1er du mois suivant le deces, sans perte de mensualités." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode={`La pension de reversion est une fraction de la retraite du conjoint decede (54 % au regime general), versee sous conditions d'age et de ressources. Le simulateur applique ces regles selon le regime.`}
        sources={[
          { label: "Info-retraite.fr - Pension de reversion", url: "https://www.info-retraite.fr" },
          { label: "Service-Public.fr - Pension de reversion", url: "https://www.service-public.fr/particuliers/vosdroits/F1928" },
        ]}
      />

      <RelatedCalculators currentSlug="/calcul-pension-reversion" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
