import type { Metadata } from "next";
import SimulateurRetraite from "./SimulateurRetraite";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/simulateur-retraite" },
  title: "Simulateur Retraite 2026 - Calcul pension, age legal, decote",
  description:
    "Calculez votre retraite gratuitement : pension brute et nette, age legal (reforme 2023), decote/surcote, complementaire AGIRC-ARRCO, taux de remplacement. Bareme 2026.",
  keywords:
    "simulateur retraite, calcul pension retraite, age legal retraite 2026, reforme retraite, decote retraite, surcote, AGIRC-ARRCO, taux remplacement, trimestres retraite",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Simulateur Retraite" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quel est l'age legal de la retraite en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Depuis la reforme de 2023, l'age legal passe progressivement de 62 a 64 ans. En 2026, il depend de votre annee de naissance : 62 ans (nes avant 1961), 62 ans et 3 mois (1961), jusqu'a 64 ans (nes en 1968 et apres). L'age du taux plein automatique reste fixe a 67 ans.",
                },
              },
              {
                "@type": "Question",
                name: "Comment est calculee la pension de retraite ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La pension de base = Salaire Annuel Moyen (25 meilleures annees) x Taux de liquidation (50% au taux plein) x (Trimestres cotises / Trimestres requis). A cela s'ajoute la retraite complementaire AGIRC-ARRCO basee sur les points accumules.",
                },
              },
              {
                "@type": "Question",
                name: "Qu'est-ce que la decote et la surcote ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La decote reduit votre pension de 0,625% par trimestre manquant (max 20 trimestres = 12,5%). La surcote augmente votre pension de 1,25% par trimestre supplementaire travaille au-dela du taux plein. Attendre 67 ans supprime automatiquement toute decote.",
                },
              },
              {
                "@type": "Question",
                name: "Combien de trimestres faut-il pour le taux plein ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le nombre de trimestres requis depend de votre annee de naissance : 166 (1955-1957), 167 (1958-1960), 169 (1961-1962), 170 (1963), 171 (1964) et 172 trimestres (1965 et apres), soit 43 ans de cotisation.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Simulateur Retraite" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏖️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Retraite 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez votre pension de retraite : regime general + complementaire
        AGIRC-ARRCO, avec la reforme 2023.
      </p>

      <SimulateurRetraite />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment calculer sa retraite en 2026 ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Votre pension de retraite se compose de deux parties : la <strong>retraite
          de base</strong> (regime general de la Securite sociale) et la <strong>retraite
          complementaire</strong> (AGIRC-ARRCO pour les salaries du prive). La reforme
          des retraites de 2023 a modifie l&apos;age legal et le nombre de trimestres requis.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">La formule de la retraite de base</h3>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700">
          Pension = SAM x Taux x (Trimestres cotises / Trimestres requis)
        </div>
        <ul className="list-disc list-inside text-slate-600 mt-3 space-y-1.5">
          <li><strong>SAM</strong> : Salaire Annuel Moyen des 25 meilleures annees (plafonne au PASS : 47 100 EUR en 2026)</li>
          <li><strong>Taux</strong> : 50% au taux plein, reduit par la decote ou augmente par la surcote</li>
          <li><strong>Proratisation</strong> : ratio trimestres cotises / trimestres requis (plafonne a 100%)</li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Age legal depuis la reforme 2023</h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          L&apos;age legal de depart est releve progressivement de <strong>62 a 64 ans</strong>,
          a raison de 3 mois par generation :
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Annee de naissance</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Age legal</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Trimestres requis</th>
              </tr>
            </thead>
            <tbody>
              {[
                { annee: "Avant sept. 1961", age: "62 ans", trim: "167" },
                { annee: "Sept-dec 1961", age: "62 ans 3 mois", trim: "169" },
                { annee: "1962", age: "62 ans 6 mois", trim: "169" },
                { annee: "1963", age: "62 ans 9 mois", trim: "170" },
                { annee: "1964", age: "63 ans", trim: "171" },
                { annee: "1965", age: "63 ans 3 mois", trim: "172" },
                { annee: "1966", age: "63 ans 6 mois", trim: "172" },
                { annee: "1967", age: "63 ans 9 mois", trim: "172" },
                { annee: "1968 et apres", age: "64 ans", trim: "172" },
              ].map((row) => (
                <tr key={row.annee} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 font-medium text-slate-700">{row.annee}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{row.age}</td>
                  <td className="py-2.5 px-2 text-right font-bold text-slate-700">{row.trim}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Decote et surcote</h3>
        <div className="grid gap-3 sm:grid-cols-2 mt-3">
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <p className="font-semibold text-red-700 text-sm">Decote (depart anticipe)</p>
            <p className="text-xs text-red-600 mt-1">-0,625% par trimestre manquant</p>
            <p className="text-xs text-red-600">Maximum 20 trimestres = -12,5%</p>
            <p className="text-xs text-red-600 font-bold mt-1">Disparait automatiquement a 67 ans</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="font-semibold text-green-700 text-sm">Surcote (depart differe)</p>
            <p className="text-xs text-green-600 mt-1">+1,25% par trimestre supplementaire</p>
            <p className="text-xs text-green-600">Au-dela de l&apos;age legal + taux plein</p>
            <p className="text-xs text-green-600 font-bold mt-1">Pas de limite de surcote</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">La retraite complementaire AGIRC-ARRCO</h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Chaque annee de cotisation genere des <strong>points de retraite</strong>. Au moment
          du depart, vos points sont multiplies par la <strong>valeur du point</strong> (1,4159 EUR
          en 2026) pour determiner votre pension complementaire annuelle.
        </p>
        <p className="text-slate-600 mb-3 leading-relaxed">
          La complementaire represente en moyenne <strong>40 a 60%</strong> de la pension
          totale pour les cadres, et <strong>25 a 40%</strong> pour les non-cadres.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">De la pension brute a la pension nette</h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          La pension de retraite est soumise a des prelevements sociaux :
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Prelevement</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-2 text-slate-700">CSG (taux normal)</td>
                <td className="py-2 px-2 text-right font-medium text-slate-700">8,3%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-2 text-slate-700">CRDS</td>
                <td className="py-2 px-2 text-right font-medium text-slate-700">0,5%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-2 text-slate-700">Casa</td>
                <td className="py-2 px-2 text-right font-medium text-slate-700">0,3%</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="py-2 px-2 font-bold text-slate-800">Total</td>
                <td className="py-2 px-2 text-right font-extrabold text-slate-800">9,1%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Le taux de CSG peut etre reduit (6,6% ou 3,8%) ou nul selon votre revenu fiscal de reference.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Exemples concrets</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">SMIC toute carriere</p>
            <p className="text-xs text-amber-600 mt-1">SAM : ~20 000 EUR, 172 trim.</p>
            <p className="text-xs text-amber-600 font-bold">~1 100-1 200 EUR net/mois</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">Cadre moyen</p>
            <p className="text-xs text-amber-600 mt-1">SAM : ~40 000 EUR, 172 trim.</p>
            <p className="text-xs text-amber-600 font-bold">~2 000-2 400 EUR net/mois</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">Carriere incomplete (130 trim.)</p>
            <p className="text-xs text-amber-600 mt-1">SAM : ~30 000 EUR, decote</p>
            <p className="text-xs text-amber-600 font-bold">~900-1 100 EUR net/mois</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">Cadre sup (plafond)</p>
            <p className="text-xs text-amber-600 mt-1">SAM : ~47 100 EUR, 172 trim.</p>
            <p className="text-xs text-amber-600 font-bold">~2 600-3 000 EUR net/mois</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Comment connaitre ses trimestres ?</h3>
        <p className="text-slate-600 leading-relaxed">
          Rendez-vous sur <strong>info-retraite.fr</strong> pour acceder a votre releve de
          carriere. Ce document detaille vos trimestres valides, vos revenus et une estimation
          officielle de votre pension. Vous recevez aussi un <strong>Estimation Indicative
          Globale (EIG)</strong> a 55 et 60 ans.
        </p>
      </section>

      <RelatedCalculators currentSlug="/simulateur-retraite" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
