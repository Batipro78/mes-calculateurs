import type { Metadata } from "next";
import CalculateurGainPari from "./CalculateurGainPari";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "/calculateur-gain-pari",
  },
  title: "Calculateur Gain Pari Sportif - Cote Décimale, Fractionnelle, Américaine",
  description:
    "Calculez le gain d&apos;un pari sportif instantanément. Convertissez entre cotes décimales, fractionnelles et américaines. Calcul probabilité implicite.",
  keywords:
    "pari sportif, calculateur gain, cote décimale, cote fractionnelle, cote américaine, probabilité pari",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Calculateur Gain Pari Sportif"
        description="Calculateur de gain pour paris sportifs avec conversion de cotes"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment calculer le gain d&apos;un pari sportif avec cote décimale ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le calcul est simple : Gain total = Mise × Cote. Par exemple, une mise de 10 EUR avec une cote de 3.50 donne un gain total de 35 EUR. Le bénéfice net est la différence : 35 - 10 = 25 EUR de bénéfice.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la différence entre cote décimale, fractionnelle et américaine ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La cote décimale (3.50) est le format européen. La cote fractionnelle (5/2) est le format britannique et affiche le bénéfice par rapport à la mise. La cote américaine (+350 ou -200) est utilisée aux États-Unis et indique le montant à parier ou à gagner pour 100 USD. Ces trois formats représentent la même probabilité, juste présentée différemment.",
                },
              },
              {
                "@type": "Question",
                name: "Comment convertir une cote décimale en probabilité implicite ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La probabilité implicite est calculée comme : (1 / Cote décimale) × 100. Par exemple, une cote de 2.00 donne une probabilité implicite de 50 %, une cote de 3.00 donne 33,33 %, et une cote de 1.50 donne 66,67 %. Cette probabilité inclut la marge du bookmaker.",
                },
              },
              {
                "@type": "Question",
                name: "Qu&apos;est-ce que la marge du bookmaker dans les cotes ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La marge du bookmaker (appelée aussi &apos;overround&apos; ou &apos;vig&apos;) est l&apos;avantage intégré dans les cotes. Lorsque vous additionnez les probabilités implicites de tous les résultats possibles d&apos;un événement, le total dépasse 100 %. Cette différence est le profit du bookmaker. Par exemple, si un match a deux résultats avec 55 % et 50 % de probabilité implicite, le total est 105 %, et la marge est 5 %.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calculateur Gain Pari Sportif" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💰
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calculateur Gain Pari Sportif
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez le gain de votre pari, convertissez entre formats de cote et
        visualisez la probabilité implicite.
      </p>

      <CalculateurGainPari />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment se calcule un gain de pari sportif ?
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Le calcul d&apos;un gain de pari sportif repose sur une formule mathématique simple : <strong>Gain total = Mise × Cote décimale</strong>. Cela représente le montant que vous recevrez si votre pari est gagnant. Le <strong>bénéfice net</strong> (votre profit réel) est la différence entre le gain total et votre mise initiale.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Les trois formats de cote
        </h3>
        <div className="grid gap-3 sm:grid-cols-3 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-lg font-bold text-slate-700">Décimale</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">3.50</p>
            <p className="text-xs text-slate-500 mt-2">
              Format européen. Montant reçu pour chaque euro misé.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-lg font-bold text-slate-700">Fractionnelle</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">5/2</p>
            <p className="text-xs text-slate-500 mt-2">
              Format britannique. Profit pour chaque unité misée.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-lg font-bold text-slate-700">Américaine</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">+350</p>
            <p className="text-xs text-slate-500 mt-2">
              Format américain. Profit pour 100 USD misés.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Conversion entre formats
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          <strong>Décimale vers Fractionnelle :</strong> Soustrayez 1 à la cote décimale. Exemple : 3.50 - 1 = 2.50, soit 5/2.
        </p>
        <p className="text-slate-600 leading-relaxed mb-3">
          <strong>Décimale vers Américaine :</strong> Si cote ≥ 2.00 : (cote - 1) × 100. Si cote &lt; 2.00 : -100 / (cote - 1). Exemple : 3.50 → +250, et 1.50 → -200.
        </p>
        <p className="text-slate-600 leading-relaxed">
          <strong>Cote vers Probabilité implicite :</strong> (1 / cote décimale) × 100 %. Exemple : cote 2.00 → 50 % de probabilité. Important : cette probabilité inclut la marge du bookmaker, elle ne représente pas la probabilité réelle de l&apos;événement.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Exemple concret
        </h3>
        <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 leading-relaxed">
          <p className="mb-2">Vous misez 10 EUR sur une cote de 2.50 :</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Gain total :</strong> 10 × 2.50 = 25 EUR</li>
            <li><strong>Bénéfice net :</strong> 25 - 10 = 15 EUR</li>
            <li><strong>Cote fractionnelle :</strong> 2.50 - 1 = 1.50 = 3/2</li>
            <li><strong>Cote américaine :</strong> (2.50 - 1) × 100 = +150</li>
            <li><strong>Probabilité implicite :</strong> (1 / 2.50) × 100 = 40 %</li>
          </ul>
        </div>

        <p className="text-slate-500 text-xs mt-6">
          Cet outil est une calculatrice mathématique pour comprendre les cotes de paris. Il n&apos;offre aucun conseil de pari ni prédiction. Les paris sportifs comportent un risque financier réel.
        </p>
      </section>
    </div>
  );
}
