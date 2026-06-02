import type { Metadata } from "next";
import ConvertisseurCoteProba from "./ConvertisseurCoteProba";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/convertisseur-cote-probabilite" },
  title: "Convertisseur Cote ↔ Probabilite - Tous les formats",
  description:
    "Convertissez entre cotes decimales, fractionnelles, americaines et probabilites. Calculez la marge bookmaker. Outil educatif gratuit.",
  keywords:
    "convertisseur cote probabilite, cote decimale, cote fractionnelle, cote americaine, marge bookmaker, conversion cote",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment convertir une cote en probabilite ?",
    a: "Pour convertir une cote decimale en probabilite : Probabilite (%) = (1 / cote) × 100. Par exemple, une cote de 2.00 = (1 / 2.00) × 100 = 50%. Une cote de 5.00 = (1 / 5.00) × 100 = 20%.",
  },
  {
    q: "Comment convertir une probabilite en cote ?",
    a: "Pour convertir une probabilite en cote decimale : Cote = 100 / Probabilite (%). Par exemple, une probabilite de 50% = 100 / 50 = 2.00. Une probabilite de 25% = 100 / 25 = 4.00.",
  },
  {
    q: "Quelle est la difference entre cote decimale, fractionnelle et americaine ?",
    a: "Cote decimale (1.50, 2.00) = format europeen, montant total pour 1 EUR mise. Cote fractionnelle (5/2, 2/1) = format britannique, benefice net par rapport a la mise. Cote americaine (+250, -150) = format US, pour une mise de 100 USD : positive = gain, negative = mise requise pour gagner 100.",
  },
  {
    q: "Qu'est-ce que la marge bookmaker ?",
    a: "La marge bookmaker est la difference entre la somme des probabilites de tous les resultats (100%) et ce que le bookmaker offre reellement. Si la somme est 105%, le bookmaker a une marge de 5%. Une marge > 0% favore le bookmaker, < 0% peut indiquer une value bet pour le pariant.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Convertisseur Cote ↔ Probabilite" />
      <Breadcrumb currentPage="Convertisseur Cote ↔ Probabilite" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-cyan-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🎲
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Convertisseur Cote ↔ Probabilite
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Convertissez entre tous les formats de cotes et probabilites. Calcul marge bookmaker inclus.
      </p>

      <ConvertisseurCoteProba />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Guide de conversion des cotes
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Les cotes permettent de calculer la probabilite d&apos;un evenement et le gain potentiel.
          Il existe 3 formats principaux selon la region.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Cote Decimale
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Cote Fractionnelle
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Cote Americaine
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Probabilite
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">1.10</td>
                <td className="py-3 px-2 text-slate-600">1/10</td>
                <td className="py-3 px-2 text-slate-600">-1000</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">
                  90.9%
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">1.50</td>
                <td className="py-3 px-2 text-slate-600">1/2</td>
                <td className="py-3 px-2 text-slate-600">-200</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">
                  66.7%
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50 bg-teal-50/50">
                <td className="py-3 px-2 font-medium text-slate-700">2.00</td>
                <td className="py-3 px-2 text-slate-600">1/1</td>
                <td className="py-3 px-2 text-slate-600">+100</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">
                  50%
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">3.00</td>
                <td className="py-3 px-2 text-slate-600">2/1</td>
                <td className="py-3 px-2 text-slate-600">+200</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">
                  33.3%
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">5.00</td>
                <td className="py-3 px-2 text-slate-600">4/1</td>
                <td className="py-3 px-2 text-slate-600">+400</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">
                  20%
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">10.00</td>
                <td className="py-3 px-2 text-slate-600">9/1</td>
                <td className="py-3 px-2 text-slate-600">+900</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">
                  10%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Formules de conversion
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">
              Decimale → Probabilite
            </h3>
            <p className="text-sm font-mono text-slate-700 bg-white rounded p-2">
              Proba = (1 / cote) × 100
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Exemple : 2.50 → (1 / 2.50) × 100 = 40%
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">
              Probabilite → Decimale
            </h3>
            <p className="text-sm font-mono text-slate-700 bg-white rounded p-2">
              Cote = 100 / Proba
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Exemple : 40% → 100 / 40 = 2.50
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">
              Fractionnelle → Decimale
            </h3>
            <p className="text-sm font-mono text-slate-700 bg-white rounded p-2">
              Decimal = 1 + (num / den)
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Exemple : 5/2 → 1 + (5/2) = 3.50
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">
              Americaine → Decimale
            </h3>
            <p className="text-sm font-mono text-slate-700 bg-white rounded p-2">
              Positive : 1 + (cote/100)
              <br />
              Negative : 1 + (100/-cote)
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Exemples : +250 → 3.50 | -150 → 1.67
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Marge bookmaker
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La marge bookmaker est le profit intrinseque du bookmaker. Elle se calcule en additionnant
          les probabilites implicites de tous les resultats possibles. Si le total depasse 100%,
          le bookmaker a un avantage.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 mb-4">
          <p className="text-sm font-mono text-slate-700 bg-white rounded p-3">
            Marge = (Proba1 + Proba2 + ... + ProbaX) - 100%
          </p>
        </div>
        <p className="text-slate-600 leading-relaxed">
          <strong>Exemple avec 2 cotes opposees :</strong> Cote A = 2.00 (50%), Cote B = 2.00 (50%).
          Marge = (50% + 50%) - 100% = 0%. Le bookmaker n&apos;a pas d&apos;avantage.
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/convertisseur-cote-probabilite" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
