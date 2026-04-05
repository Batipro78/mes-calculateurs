import type { Metadata } from "next";
import CalculateurPlusValue from "./CalculateurPlusValue";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Calcul Plus-Value Immobiliere 2026 - Simulateur Impot",
  description:
    "Calculez la plus-value immobiliere et l'impot a payer. Abattements par duree de detention, IR 19%, prelevements sociaux 17,2%. Bareme 2026.",
  keywords:
    "calcul plus value immobiliere, simulateur plus value, impot plus value immobiliere, abattement duree detention, plus value vente maison, taxe plus value 2026",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Plus-Value Immobiliere" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment est imposee la plus-value immobiliere ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La plus-value immobiliere est imposee a 19% d'impot sur le revenu + 17,2% de prelevements sociaux, soit 36,2% au total. Des abattements s'appliquent en fonction de la duree de detention : exoneration totale d'IR apres 22 ans et de PS apres 30 ans.",
                },
              },
              {
                "@type": "Question",
                name: "La vente de ma residence principale est-elle imposee ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Non. La plus-value realisee lors de la vente de votre residence principale est totalement exoneree d'impot, quelle que soit la duree de detention ou le montant de la plus-value.",
                },
              },
              {
                "@type": "Question",
                name: "Quels abattements pour duree de detention ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour l'IR : 6% par an de la 6e a la 21e annee, puis 4% la 22e annee (exoneration totale a 22 ans). Pour les PS : 1,65% par an de la 6e a la 21e annee, 1,6% la 22e annee, puis 9% par an de la 23e a la 30e annee (exoneration totale a 30 ans).",
                },
              },
            ],
          }),
        }}
      />
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

      <RelatedCalculators currentSlug="/calcul-plus-value-immobiliere" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
