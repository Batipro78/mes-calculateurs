import type { Metadata } from "next";
import SimulateurEpargne from "./SimulateurEpargne";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title:
    "Simulateur Epargne 2026 - Calculez les interets de votre placement",
  description:
    "Simulez votre epargne : Livret A, LDDS, LEP, assurance-vie, PEL. Calculez le capital final, les interets composes et l'evolution annuelle de votre placement. Gratuit et instantane.",
  keywords:
    "simulateur epargne, calcul interets composes, livret A 2026, simulateur placement, rendement epargne, calcul livret A, interets livret A, simulateur LEP, epargne mensuelle, capital final",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Simulateur Epargne" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quel est le taux du Livret A en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le taux du Livret A est de 2,4% net en 2026. Les interets sont exoneres d'impot sur le revenu et de prelevements sociaux. Le plafond de depots est de 22 950 EUR (hors interets capitalises)."
                }
              },
              {
                "@type": "Question",
                name: "Comment fonctionnent les interets composes ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les interets composes signifient que les interets generes chaque annee s'ajoutent au capital et produisent eux-memes des interets l'annee suivante. C'est un effet boule de neige : plus la duree est longue, plus l'acceleration est forte. La formule est : Capital final = Capital initial x (1 + taux) puissance duree."
                }
              },
              {
                "@type": "Question",
                name: "Quel est le meilleur placement en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le LEP (Livret d'Epargne Populaire) offre le meilleur taux a 3,5% net, mais il est reserve aux revenus modestes. Le Livret A (2,4%) et le LDDS (2,4%) sont accessibles a tous et sans impot. L'assurance-vie en fonds euros (~2,5%) est ideale pour l'epargne long terme grace a sa fiscalite avantageuse apres 8 ans."
                }
              }
            ]
          })
        }}
      />
      <Breadcrumb currentPage="Simulateur Epargne" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏦
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur d&apos;Epargne
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulez l&apos;evolution de votre epargne avec les interets composes.
        Livret A, LEP, assurance-vie ou taux personnalise.
      </p>

      <SimulateurEpargne />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment fonctionne l&apos;epargne et les interets composes ?
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          L&apos;epargne consiste a mettre de l&apos;argent de cote sur un
          support financier qui genere des interets. Le principe des
          <strong> interets composes</strong> est fondamental : chaque annee,
          les interets generes s&apos;ajoutent au capital et produisent
          eux-memes des interets l&apos;annee suivante. Albert Einstein
          aurait qualifie les interets composes de &quot;huitieme merveille du
          monde&quot;. Plus la duree de placement est longue, plus l&apos;effet
          boule de neige est puissant.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          La formule des interets composes
        </h3>
        <div className="bg-slate-50 rounded-xl p-4 mb-6">
          <p className="font-mono text-sm text-slate-600">
            Capital final = Capital initial x (1 + taux)^duree + Versement x ((1 + taux)^duree - 1) / taux
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Exemple : 5 000 EUR a 2,4% pendant 10 ans + 200 EUR/mois = 32 500 EUR environ
          </p>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les principaux placements en France (2026)
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              Livret A
            </p>
            <p className="text-emerald-600 font-bold text-lg">2,4%</p>
            <p className="text-xs text-slate-500 mt-1">
              Plafond : 22 950 EUR. Interets exoneres d&apos;impot et de
              prelevements sociaux. Disponibilite immediate. Le placement
              prefere des Francais avec plus de 55 millions de livrets ouverts.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              LDDS (Livret Developpement Durable)
            </p>
            <p className="text-emerald-600 font-bold text-lg">2,4%</p>
            <p className="text-xs text-slate-500 mt-1">
              Plafond : 12 000 EUR. Meme taux et fiscalite que le Livret A.
              Complement ideal pour continuer a epargner sans impot une fois
              le Livret A plein.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              LEP (Livret d&apos;Epargne Populaire)
            </p>
            <p className="text-emerald-600 font-bold text-lg">3,5%</p>
            <p className="text-xs text-slate-500 mt-1">
              Plafond : 10 000 EUR. Reserve aux revenus modestes (revenu
              fiscal de reference &lt; 22 419 EUR pour une personne seule).
              Le livret le mieux remunere et le plus avantageux fiscalement.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              Assurance-vie (fonds euro)
            </p>
            <p className="text-emerald-600 font-bold text-lg">~2,5%</p>
            <p className="text-xs text-slate-500 mt-1">
              Pas de plafond. Rendement variable selon le contrat. Fiscalite
              avantageuse apres 8 ans (abattement de 4 600 EUR / 9 200 EUR
              pour un couple). Outil ideal pour la transmission.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              PEL (Plan Epargne Logement)
            </p>
            <p className="text-emerald-600 font-bold text-lg">2,25%</p>
            <p className="text-xs text-slate-500 mt-1">
              Plafond : 61 200 EUR. Taux fixe a l&apos;ouverture. Duree
              minimum 4 ans. Permet d&apos;obtenir un pret immobilier a
              taux preferentiel. Soumis au PFU de 30% depuis 2018.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              Livret Jeune (12-25 ans)
            </p>
            <p className="text-emerald-600 font-bold text-lg">&ge; 2,4%</p>
            <p className="text-xs text-slate-500 mt-1">
              Plafond : 1 600 EUR. Taux libre fixe par chaque banque, au
              minimum egal au Livret A. Exonere d&apos;impot. Reserve aux
              12-25 ans.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          L&apos;importance de commencer tot
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          Grace aux interets composes, commencer a epargner tot fait une
          enorme difference. Exemple concret : en placant 200 EUR par mois
          a 3% pendant 30 ans, vous obtenez environ 116 000 EUR dont
          44 000 EUR d&apos;interets. Si vous commencez 10 ans plus tard
          (20 ans de placement), vous n&apos;obtenez que 65 500 EUR dont
          seulement 17 500 EUR d&apos;interets. Attendre 10 ans vous coute
          plus de 50 000 EUR.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Strategie d&apos;epargne recommandee
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
          <li>
            <strong>Epargne de precaution :</strong> 3 a 6 mois de depenses
            sur Livret A / LDDS pour faire face aux imprevus.
          </li>
          <li>
            <strong>Epargne moyen terme (3-8 ans) :</strong> assurance-vie
            fonds euros ou PEL pour un projet immobilier ou autre.
          </li>
          <li>
            <strong>Epargne long terme (&gt; 8 ans) :</strong> assurance-vie
            en unites de compte ou PEA (actions) pour rechercher un meilleur
            rendement avec une part de risque maitrisee.
          </li>
          <li>
            <strong>Regle du &quot;payez-vous en premier&quot; :</strong>{" "}
            automatisez un virement le jour de la paie vers votre epargne.
            Meme 50 EUR/mois font la difference sur 20 ans.
          </li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Interets simples vs interets composes
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          Avec les <strong>interets simples</strong>, seul le capital initial
          produit des interets. Avec les <strong>interets composes</strong>,
          les interets gagnes sont reinvestis et produisent a leur tour des
          interets. Sur une longue duree, la difference est considerable :
          10 000 EUR places a 5% pendant 30 ans donnent 25 000 EUR en
          interets simples, mais 43 219 EUR en interets composes, soit
          72% de plus.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          La regle des 72
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Cette regle simple permet d&apos;estimer le temps necessaire pour
          doubler votre capital : divisez 72 par le taux d&apos;interet annuel.
          Exemple : a 3%, il faut environ 72 / 3 = 24 ans pour doubler son
          argent. A 6%, seulement 12 ans. A 2,4% (Livret A 2026), comptez
          30 ans pour doubler votre capital.
        </p>
      </section>

      <RelatedCalculators currentSlug="/simulateur-epargne" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
