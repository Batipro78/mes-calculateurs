import type { Metadata } from "next";
import CalculateurPariCombine from "./CalculateurPariCombine";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "/calculateur-pari-combine",
  },
  title:
    "Calculateur Pari Combiné — Cote Totale & Gain (Accumulator)",
  description:
    "Calculez instantanément votre pari combiné : cote totale, gain, bénéfice et probabilité implicite. Outil pédagogique mathématique gratuit.",
  keywords:
    "pari combiné, accumulator, calcul cote, gain pari, probabilité pari, calcul gain combiné",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Calculateur Pari Combiné"
        description="Calcul de cote totale, gain et probabilité pour paris combinés"
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
                name: "Comment calculer la cote totale d&apos;un pari combiné ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La cote totale d&apos;un pari combiné est le produit de toutes les cotes individuelles. Exemple : 3 sélections à cotes 1.40, 1.55 et 1.30 donnent une cote totale de 1.40 × 1.55 × 1.30 = 2.821. Le gain total est ensuite mise × cote totale.",
                },
              },
              {
                "@type": "Question",
                name: "Pourquoi la probabilité chute avec plus de sélections ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La probabilité implicite combinée est 1 / cote totale. Plus on ajoute de sélections, plus la cote totale augmente (multiplication), donc plus la probabilité diminue exponentiellement. Un combiné de 5 sélections a une probabilité bien plus faible qu&apos;une simple sélection.",
                },
              },
              {
                "@type": "Question",
                name: "Que se passe-t-il si un match du combiné est annulé ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Selon les règles des opérateurs agréés (France, Belgique), un match annulé dans un combiné voit sa cote remplacée par 1.00. Le combiné reste actif avec les autres sélections, mais le gain est réduit puisque la cote totale est divisée par la cote annulée.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la différence entre pari simple et pari combiné ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Un pari simple = une seule sélection avec une cote. Un pari combiné = plusieurs sélections dépendantes : il faut que TOUTES les sélections gagnent pour toucher le gain. Le gain est plus élevé (multiplication des cotes) mais le risque aussi.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        currentPage="Calculateur Pari Combiné"
        parentPage={undefined}
        parentHref={undefined}
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🎯
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calculateur Pari Combiné
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Cote totale, gain et probabilité implicite. Résultat instantané.
      </p>

      <CalculateurPariCombine />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment calculer un pari combiné ?
        </h2>

        <div className="grid gap-6 mb-8">
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">
              Formule — Cote totale
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              La cote totale est le produit de toutes les cotes individuelles :
            </p>
            <div className="bg-white rounded-lg p-3 font-mono text-sm border border-slate-200 mb-3 text-slate-700">
              Cote totale = Cote₁ × Cote₂ × ... × CoteN
            </div>
            <p className="text-slate-600 text-sm">
              Ensuite, le gain total s&apos;obtient en multipliant la mise par la
              cote totale.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">Exemple concret</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              Mise : 10 EUR | Cotes : 1.40, 1.55, 1.30
            </p>
            <ul className="text-slate-600 text-sm space-y-2 list-disc list-inside">
              <li>Cote totale : 1.40 × 1.55 × 1.30 = 2.821</li>
              <li>Gain total : 10 × 2.821 = 28.21 EUR</li>
              <li>Bénéfice net : 28.21 − 10 = 18.21 EUR</li>
              <li>Probabilité implicite : 1 / 2.821 ≈ 35.4 %</li>
            </ul>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">
              Règle match annulé
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Chez les opérateurs agréés en France et Belgique, si un match est
              annulé, sa cote est remplacée par <strong>1.00</strong> dans le
              combiné. Le combiné reste actif, mais votre gain diminue. Le combiné
              ne perd que si toutes les autres sélections gagnent et cette
              sélection-là ne compte pas.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">
              Probabilité implicite combinée
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              C&apos;est l&apos;estimation de la probabilité que le combiné gagne,
              selon les cotes :
            </p>
            <div className="bg-white rounded-lg p-3 font-mono text-sm border border-slate-200 mb-3 text-slate-700">
              Probabilité (%) = (1 / Cote totale) × 100
            </div>
            <p className="text-slate-600 text-sm">
              Plus les cotes sont élevées, plus cette probabilité baisse. Un
              combiné à 5 sélections aura une probabilité beaucoup plus faible
              qu&apos;un simple à 2 sélections.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Différence : Pari simple vs. Pari combiné
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-slate-600">
            <thead>
              <tr className="border-b border-slate-300">
                <th className="text-left py-2 px-3 font-bold text-slate-800">
                  Aspect
                </th>
                <th className="text-left py-2 px-3 font-bold text-slate-800">
                  Pari simple
                </th>
                <th className="text-left py-2 px-3 font-bold text-slate-800">
                  Pari combiné
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="py-2 px-3 font-medium">Nombre de sélections</td>
                <td className="py-2 px-3">1 seule</td>
                <td className="py-2 px-3">2 ou plus</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2 px-3 font-medium">Condition de gain</td>
                <td className="py-2 px-3">1 sélection doit gagner</td>
                <td className="py-2 px-3">TOUTES les sélections doivent gagner</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2 px-3 font-medium">Calcul du gain</td>
                <td className="py-2 px-3">Mise × Cote</td>
                <td className="py-2 px-3">Mise × (Cote₁ × Cote₂ × ...)</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2 px-3 font-medium">Risque</td>
                <td className="py-2 px-3">Faible</td>
                <td className="py-2 px-3">Élevé</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Gain potentiel</td>
                <td className="py-2 px-3">Modéré</td>
                <td className="py-2 px-3">Très élevé</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-8 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800 leading-relaxed">
        <strong>Avertissement :</strong> Cet outil est un convertisseur mathématique
        pédagogique. Il ne constitue pas un conseil de pari. Les paris comportent
        des risques. Jouez responsable sur des sites autorisés.
      </div>
    </div>
  );
}
