import type { Metadata } from "next";
import CalculHandicapGolfWHS from "./CalculHandicapGolfWHS";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-handicap-golf-whs" },
  title: "Calcul Handicap Golf WHS - Index Officiel FFGolf 2026",
  description:
    "Calculez votre Index WHS (World Handicap System) avec le système officiel FFGolf. Entrez vos cartes, obtenez votre handicap et le handicap de jeu. Outil gratuit pour golfeurs.",
  keywords:
    "calcul handicap golf, index whs, world handicap system, ffgolf, slope, sss, handicap de jeu, différentiel golf, handicap officiel",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Handicap Golf WHS - Index Officiel" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Qu&apos;est-ce que le système WHS (World Handicap System) ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le WHS est le système officiel de handicap de golf adopté par la FFGolf depuis 2021. L&apos;Index WHS est basé sur la moyenne des 8 meilleurs différentiels parmi vos 20 dernières cartes officielles. Le différentiel d&apos;une carte = (Score brut − SSS) × 113 / Slope. Si vous avez moins de 20 cartes, un ajustement s&apos;applique (ex: 3 cartes → meilleur − 2.0).",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le nombre minimum de cartes pour calculer un Index WHS ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Vous avez besoin d&apos;au minimum 3 cartes officielles pour calculer un Index WHS. Avec 3 cartes, seule la meilleure est utilisée avec un ajustement de −2.0. À partir de 20 cartes, vous utilisez la moyenne des 8 meilleurs différentiels sans ajustement.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la différence entre SSS, Slope et Par ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le SSS (Slope Style Score ou USGA Course Rating) est le score théorique du parcours en conditions standards (ex: 72). Le Slope (95−155) mesure la difficulté relative du parcours pour un golfeur moyen (113 = standard). Le Par est le nombre de coups théoriques pour le parcours (ex: 72).",
                },
              },
              {
                "@type": "Question",
                name: "Comment calculer le Handicap de jeu depuis l&apos;Index WHS ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Handicap de jeu = Index WHS × (Slope / 113) + (SSS − Par). Par exemple, Index 18 sur un parcours Slope 125, SSS 73, Par 72 = 18 × (125/113) + (73−72) ≈ 21.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul Handicap Golf WHS - Index Officiel" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⛳
        </div>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
          Calcul Handicap Golf WHS
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre Index WHS officiel et votre handicap de jeu selon le système World Handicap System.
      </p>

      <CalculHandicapGolfWHS />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment fonctionne le WHS ?
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Le système WHS (World Handicap System) est le référentiel officiel en golf. Il mesure votre capacité relative au terrain et permet une comparaison équitable entre golfeurs de tous niveaux et de tous parcours.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-6">
            <h3 className="font-bold text-slate-800 mb-3">Index WHS</h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              Votre Index WHS représente votre meilleur potentiel. Il est basé sur la moyenne des 8 meilleurs différentiels parmi vos 20 dernières cartes officielles.
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Minimum 3 cartes pour un Index provisoire</li>
              <li>• À partir de 20 cartes : 8 meilleurs différentiels</li>
              <li>• Ajustement appliqué si &lt; 20 cartes</li>
            </ul>
          </div>

          <div className="bg-slate-50 rounded-xl p-6">
            <h3 className="font-bold text-slate-800 mb-3">Handicap de jeu</h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              C&apos;est le handicap que vous prenez pour une partie. Il dépend du parcours où vous jouez (Slope, SSS, Par).
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Ajusté selon la difficulté du parcours</li>
              <li>• Change d&apos;un parcours à l&apos;autre</li>
              <li>• Utilisé pour le classement et les handicaps de trous</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Formules de calcul
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">Différentiel</h3>
            <p className="text-sm font-mono text-slate-700 bg-white rounded p-2 mb-2">
              (Score brut − SSS) × 113 / Slope
            </p>
            <p className="text-xs text-slate-500">
              Exemple : (82 − 72) × 113 / 130 = 8.5
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">Index WHS</h3>
            <p className="text-sm font-mono text-slate-700 bg-white rounded p-2 mb-2">
              Moyenne des N meilleurs différentiels ± ajustement
            </p>
            <p className="text-xs text-slate-500">
              Avec 3 cartes : meilleur différentiel − 2.0
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 md:col-span-2">
            <h3 className="font-bold text-slate-800 mb-2">
              Handicap de jeu (Playing Handicap)
            </h3>
            <p className="text-sm font-mono text-slate-700 bg-white rounded p-2 mb-2">
              Index × (Slope / 113) + (SSS − Par)
            </p>
            <p className="text-xs text-slate-500">
              Exemple : Index 18 × (125 / 113) + (73 − 72) ≈ 21
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Tableau : Cartes utilisées selon le nombre
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Le nombre de cartes utilisées varie selon votre total de cartes officielles (table WHS officielle).
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Nb cartes
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Nb utilisés
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Ajustement
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Exemple
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">3</td>
                <td className="py-3 px-2 text-slate-600">1 (meilleur)</td>
                <td className="py-3 px-2 text-slate-600">−2.0</td>
                <td className="py-3 px-2 text-slate-600">8.5 − 2.0 = 6.5</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">4</td>
                <td className="py-3 px-2 text-slate-600">1</td>
                <td className="py-3 px-2 text-slate-600">−1.0</td>
                <td className="py-3 px-2 text-slate-600">8.5 − 1.0 = 7.5</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">5−8</td>
                <td className="py-3 px-2 text-slate-600">1−2</td>
                <td className="py-3 px-2 text-slate-600">Variable</td>
                <td className="py-3 px-2 text-slate-600">5 cartes → 1 + adj</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">12−14</td>
                <td className="py-3 px-2 text-slate-600">4</td>
                <td className="py-3 px-2 text-slate-600">0</td>
                <td className="py-3 px-2 text-slate-600">Moyenne 4 meilleurs</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">17−19</td>
                <td className="py-3 px-2 text-slate-600">6−7</td>
                <td className="py-3 px-2 text-slate-600">0</td>
                <td className="py-3 px-2 text-slate-600">Moyenne 6−7 meilleurs</td>
              </tr>
              <tr className="hover:bg-slate-50 bg-green-50/50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  20+
                </td>
                <td className="py-3 px-2 font-bold text-slate-700">8</td>
                <td className="py-3 px-2 text-slate-600">0</td>
                <td className="py-3 px-2 font-semibold text-green-700">
                  Moyenne 8 meilleurs
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-emerald-900 mb-4">
          Lexique du golf
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-bold text-emerald-800 mb-2">Slope</h3>
            <p className="text-sm text-emerald-700 leading-relaxed">
              Rating de difficulté (95−155). Plus le Slope est élevé, plus le parcours est difficile pour un golfeur moyen. 113 = standard.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-emerald-800 mb-2">SSS / Course Rating</h3>
            <p className="text-sm text-emerald-700 leading-relaxed">
              Score théorique du parcours en conditions normales (ex: 72). Défini pour chaque jeu de tees.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-emerald-800 mb-2">Différentiel</h3>
            <p className="text-sm text-emerald-700 leading-relaxed">
              Score ajusté relative à la difficulté. Permet de comparer vos performances sur différents parcours.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-emerald-800 mb-2">Par</h3>
            <p className="text-sm text-emerald-700 leading-relaxed">
              Nombre standard de coups pour le parcours (ex: 72 pour 18 trous). Généralement 70, 71 ou 72.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Sources officielles
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Ce calculateur suit le système WHS officiel adopté par la FFGolf depuis 2021, conforme aux standards de la USGA et de la R&A.
        </p>
        <div className="mt-4 space-y-2 text-sm">
          <p className="text-slate-700">
            🔗{" "}
            <a
              href="https://www.ffgolf.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              FFGolf - Fédération Française de Golf
            </a>
          </p>
          <p className="text-slate-700">
            🔗{" "}
            <a
              href="https://www.usga.org/handicapping.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              USGA - United States Golf Association
            </a>
          </p>
        </div>
      </section>

      <section className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-amber-900 mb-4">⚠️ Disclaimer</h2>
        <p className="text-sm text-amber-800 leading-relaxed">
          Ce calculateur utilise le système WHS officiel et permet d&apos;estimer votre Index. Pour les cartes officielles enregistrées auprès de la FFGolf, consultez votre compte sur le site officiel de la FFGolf ou votre club. Les résultats ne remplacent pas l&apos;Index officiel.
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-handicap-golf-whs" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
