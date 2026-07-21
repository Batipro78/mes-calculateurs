import type { Metadata } from "next";
import CalculateurPlusValue from "./CalculateurPlusValue";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-plus-value-immobiliere" },
  title: "Calcul Plus-Value Immobiliere 2026 - Simulateur Impot",
  description:
    "Calculez la plus-value immobiliere et l'impot a payer. Abattements par duree de detention, IR 19%, prelevements sociaux 17,2%. Bareme 2026.",
  keywords:
    "calcul plus value immobiliere, simulateur plus value, impot plus value immobiliere, abattement duree detention, plus value vente maison, taxe plus value 2026",
};

const FAQ_ITEMS: FaqItem[] = [
  { q: "Comment est imposee la plus-value immobiliere ?", a: "La plus-value immobiliere est imposee a 19% d'impot sur le revenu + 17,2% de prelevements sociaux, soit 36,2% au total. Des abattements s'appliquent en fonction de la duree de detention : exoneration totale d'IR apres 22 ans et de PS apres 30 ans." },
  { q: "La vente de ma residence principale est-elle imposee ?", a: "Non. La plus-value realisee lors de la vente de votre residence principale est totalement exoneree d'impot, quelle que soit la duree de detention ou le montant de la plus-value." },
  { q: "Quels abattements pour duree de detention ?", a: "Pour l'IR : 6% par an de la 6e a la 21e annee, puis 4% la 22e annee (exoneration totale a 22 ans). Pour les PS : 1,65% par an de la 6e a la 21e annee, 1,6% la 22e annee, puis 9% par an de la 23e a la 30e annee (exoneration totale a 30 ans)." },
  { q: "Peut-on deduire les travaux du calcul de la plus-value ?", a: "Oui. Les travaux d'amelioration, de construction ou d'agrandissement realises par des entreprises sont deductibles du prix de vente pour reduire la plus-value imposable. Ils doivent etre justifies par des factures. Les travaux d'entretien courant ne sont pas deductibles. Alternativement, un forfait de 15% du prix d'achat est applicable sans justificatif si le bien est detenu depuis plus de 5 ans." },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Plus-Value Immobiliere" />
      <Breadcrumb currentPage="Plus-Value Immobiliere" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏡
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Plus-Value Immobiliere 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulez l&apos;impot sur la plus-value immobiliere. Abattements, IR 19%, PS 17,2%, surtaxe.
      </p>

      <CalculateurPlusValue />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Comment calculer la plus-value immobiliere ?</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La <strong>plus-value immobiliere</strong> = prix de vente &minus; prix d&apos;achat corrige (achat + frais d&apos;acquisition + travaux).
          Elle est imposee a <strong>19% d&apos;IR + 17,2% de PS</strong> = 36,2%, avec des abattements selon la duree de detention.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Tableau des abattements</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Duree</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Abattement IR</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Abattement PS</th>
              </tr>
            </thead>
            <tbody>
              {[0, 5, 6, 10, 15, 20, 22, 25, 30].map((a) => (
                <tr key={a} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 text-slate-700">{a} ans</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-green-600">
                    {a >= 22 ? "100%" : `${((a < 6 ? 0 : (a - 5) * 6)).toFixed(0)}%`}
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">
                    {a >= 30 ? "100%" : a < 6 ? "0%" : a <= 21 ? `${((a - 5) * 1.65).toFixed(1)}%` : a === 22 ? "28,0%" : `${(28 + (a - 22) * 9).toFixed(0)}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Exonerations</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { cas: "Residence principale", detail: "Exoneration totale" },
            { cas: "Vente < 15 000 \u20ac", detail: "Exoneree si prix de vente < 15 000 \u20ac" },
            { cas: "Premiere vente", detail: "Sous conditions (remploi dans les 24 mois)" },
            { cas: "Detention > 22 ans", detail: "Exoneree d'IR (PS restent jusqu'a 30 ans)" },
          ].map((item) => (
            <div key={item.cas} className="bg-slate-50 rounded-xl p-3">
              <p className="text-sm font-semibold text-slate-700">{item.cas}</p>
              <p className="text-xs text-slate-500">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Frais, travaux et surtaxe : les details qui changent le montant</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Au-dela du calcul de base, plusieurs mecanismes peuvent augmenter ou alleger sensiblement la
          plus-value imposable. Bien les connaitre permet souvent d&apos;economiser plusieurs milliers
          d&apos;euros.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Majorer le prix d&apos;achat (pour reduire la plus-value)</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>Frais d&apos;acquisition</strong> : forfait de <strong>7,5 %</strong> du prix d&apos;achat, sans justificatif (ou frais reels si superieurs)</li>
          <li><strong>Travaux</strong> : forfait de <strong>15 %</strong> du prix d&apos;achat si le bien est detenu depuis plus de 5 ans, sans fournir de factures (ou montant reel sur justificatifs)</li>
        </ul>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Ces deux forfaits se cumulent : pour un bien achete 200 000 &euro;, on peut ajouter d&apos;office
          15 000 &euro; de frais et 30 000 &euro; de travaux au prix d&apos;acquisition, soit 45 000 &euro; de
          plus-value en moins a taxer.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">La surtaxe sur les plus-values elevees</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Au-dela de <strong>50 000 &euro;</strong> de plus-value imposable (apres abattements), une taxe
          supplementaire progressive de <strong>2 % a 6 %</strong> s&apos;ajoute aux 36,2 % deja dus. Elle ne
          concerne ni la residence principale (exoneree) ni les terrains a batir.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Exemple chiffre</h3>
        <p className="text-slate-600 leading-relaxed">
          Bien locatif achete 200 000 &euro; en 2010, revendu 320 000 &euro; en 2026 (16 ans de detention).
          Prix d&apos;achat majore : 200 000 + 15 000 (frais) + 30 000 (travaux) = 245 000 &euro;. Plus-value
          brute : 75 000 &euro;. Apres 66 % d&apos;abattement IR (11 ans au-dela de la 5e), la base IR tombe a
          environ 25 500 &euro;, soit ~4 845 &euro; d&apos;impot sur le revenu, auxquels s&apos;ajoutent les
          prelevements sociaux apres leur propre abattement. Sans le forfait travaux, la facture aurait ete
          nettement plus lourde.
        </p>
      </section>

      <HowToJsonLd
        name="Calculer l'impôt sur la plus-value immobiliere"
        steps={[
          { name: "Calculer le prix d'achat corrige", text: "Ajouter au prix d'achat les frais d'acquisition (forfait 7,5 % ou frais réels) et les travaux (forfait 15 % du prix d'achat si detention supérieure à 5 ans, ou montant réel sur factures). Ex. achat 200 000 EUR + 15 000 frais + 30 000 travaux = 245 000 EUR." },
          { name: "Calculer la plus-value brute", text: "Soustraire le prix d'achat corrige du prix de vente. Ex. vente 320 000 EUR - prix corrige 245 000 EUR = 75 000 EUR de plus-value brute." },
          { name: "Appliquer les abattements pour durée de detention", text: "IR : 6 % par an de la 6e à la 21e année, puis 4 % la 22e (exonération totale à 22 ans). PS : 1,65 % par an de la 6e à la 21e année, puis 9 % par an jusqu'à la 30e année (exonération totale à 30 ans)." },
          { name: "Calculer l'impôt et la surtaxe eventuelle", text: "Impôt = plus-value nette IR x 19 % + plus-value nette PS x 17,2 %. Si la plus-value nette depasse 50 000 EUR, ajouter la surtaxe progressive de 2 % à 6 %." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode={`La plus-value imposable est la difference entre prix de vente et prix d'acquisition (majore des frais et travaux), reduite par des abattements pour duree de detention. Elle est taxee a l'impot (19 %) et aux prelevements sociaux (17,2 %). La residence principale est exoneree.`}
        sources={[
          { label: "Service-Public.fr - Plus-value immobiliere", url: "https://www.service-public.fr/particuliers/vosdroits/F10864" },
          { label: "Impots.gouv.fr - Plus-values immobilieres", url: "https://www.impots.gouv.fr/particulier/les-plus-values-immobilieres" },
        ]}
      />

      <RelatedCalculators currentSlug="/calcul-plus-value-immobiliere" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
