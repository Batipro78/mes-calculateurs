import type { Metadata } from "next";
import SimulateurDCA from "./SimulateurDCA";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/simulateur-dca" },
  title: "Simulateur DCA 2026 - Calculez vos gains d'investissement passe",
  description:
    "Simulez un investissement DCA (Dollar Cost Averaging) sur le S&P 500, CAC 40 ou Bitcoin. Decouvrez combien vous auriez gagne en investissant chaque mois depuis 2010. Gratuit et instantane.",
  keywords:
    "simulateur DCA, dollar cost averaging, investissement S&P 500, rendement CAC 40, investir Bitcoin, calcul investissement mensuel, performance bourse, si j'avais investi, rendement historique, investissement progressif",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Simulateur DCA" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Qu'est-ce que le DCA (Dollar Cost Averaging) ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le DCA (Dollar Cost Averaging) ou investissement programme consiste a investir une somme fixe a intervalles reguliers (chaque mois par exemple), quel que soit le prix de l'actif. Cette strategie permet de lisser le prix d'achat moyen et de reduire l'impact de la volatilite des marches. C'est l'une des strategies les plus recommandees pour les investisseurs particuliers."
                }
              },
              {
                "@type": "Question",
                name: "Quel est le rendement historique du S&P 500 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le S&P 500 a offert un rendement annuel moyen d'environ 10% sur les 50 dernieres annees (environ 7% apres inflation). Avec une strategie DCA de 150 EUR par mois depuis 2010, un investisseur aurait plus que double son capital investi. Les performances passees ne garantissent toutefois pas les resultats futurs."
                }
              },
              {
                "@type": "Question",
                name: "Est-ce risque d'investir en DCA sur le Bitcoin ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le Bitcoin est un actif tres volatil : son prix peut varier de 50% ou plus en quelques mois. Cependant, le DCA reduit ce risque en lissant le prix d'achat. Historiquement, un DCA sur le Bitcoin depuis 2015 ou 2016 a ete extremement rentable, mais les pertes peuvent etre importantes sur des periodes courtes. N'investissez que ce que vous pouvez vous permettre de perdre."
                }
              }
            ]
          })
        }}
      />
      <Breadcrumb currentPage="Simulateur DCA" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📈
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur DCA &mdash; Investissement Passe
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Decouvrez combien vous auriez gagne en investissant chaque mois sur le
        S&amp;P 500, le CAC 40 ou le Bitcoin.
      </p>

      <SimulateurDCA />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Qu&apos;est-ce que le DCA (Dollar Cost Averaging) ?
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Le <strong>DCA</strong> (Dollar Cost Averaging), ou{" "}
          <strong>investissement programme</strong>, est une strategie qui
          consiste a investir une somme fixe a intervalles reguliers, peu
          importe le prix du marche. Par exemple, investir 150 EUR chaque
          mois sur le S&amp;P 500, que le marche soit haut ou bas.
        </p>
        <p className="text-slate-600 leading-relaxed mb-6">
          L&apos;avantage principal : vous achetez <strong>plus de parts
          quand les prix sont bas</strong> et moins quand ils sont hauts, ce
          qui lisse votre prix d&apos;achat moyen. Vous n&apos;avez pas
          besoin de &quot;timer le marche&quot; (ce que meme les
          professionnels echouent souvent a faire).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Pourquoi le DCA est-il si populaire ?
        </h3>
        <div className="grid gap-3 sm:grid-cols-3 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Simplicite</p>
            <p className="text-xs text-slate-500 mt-1">
              Un virement automatique chaque mois, aucune decision a prendre.
              Ideal pour les debutants comme les investisseurs confirmes.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Discipline</p>
            <p className="text-xs text-slate-500 mt-1">
              Le DCA elimine les emotions (peur, euphorie) qui poussent a
              acheter haut et vendre bas. Vous investissez mecaniquement.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Accessibilite</p>
            <p className="text-xs text-slate-500 mt-1">
              Pas besoin d&apos;un gros capital de depart. Meme 50 EUR par
              mois font la difference sur 10 ou 20 ans grace aux interets
              composes.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les 3 actifs proposes
        </h3>
        <div className="grid gap-3 sm:grid-cols-3 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">S&amp;P 500</p>
            <p className="text-emerald-600 font-bold text-lg">~10% / an</p>
            <p className="text-xs text-slate-500 mt-1">
              Les 500 plus grandes entreprises americaines (Apple, Microsoft,
              Amazon...). L&apos;indice de reference mondial. Rendement moyen
              historique d&apos;environ 10% par an sur 50 ans.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">CAC 40</p>
            <p className="text-emerald-600 font-bold text-lg">~7% / an</p>
            <p className="text-xs text-slate-500 mt-1">
              Les 40 plus grandes entreprises francaises (LVMH, TotalEnergies,
              L&apos;Oreal...). Rendement historique d&apos;environ 7% par an
              (hors dividendes reinvestis).
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Bitcoin</p>
            <p className="text-emerald-600 font-bold text-lg">Tres variable</p>
            <p className="text-xs text-slate-500 mt-1">
              Cryptomonnaie la plus connue. Rendement historique tres eleve
              mais volatilite extreme (+300% certaines annees, -70% d&apos;autres).
              Investissement a haut risque.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Comment investir concretement ?
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
          <li>
            <strong>S&amp;P 500 :</strong> via un ETF (fonds indiciel) comme le
            Amundi MSCI World ou le iShares Core S&amp;P 500, disponible sur un
            PEA ou un compte-titres.
          </li>
          <li>
            <strong>CAC 40 :</strong> via un ETF CAC 40 (Amundi, Lyxor),
            egalement eligible au PEA.
          </li>
          <li>
            <strong>Bitcoin :</strong> via une plateforme d&apos;echange comme
            Binance, Coinbase, Kraken ou Bitstack (DCA automatique).
          </li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Avertissement
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Les performances passees ne garantissent pas les resultats futurs.
          Ce simulateur est fourni a titre indicatif et educatif uniquement.
          Il ne constitue pas un conseil en investissement. Tout investissement
          comporte un risque de perte en capital. Consultez un conseiller
          financier avant d&apos;investir.
        </p>
      </section>

      <RelatedCalculators currentSlug="/simulateur-dca" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
