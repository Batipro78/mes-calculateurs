import type { Metadata } from "next";
import CalculateurInteretCompose from "./CalculateurInteretCompose";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-interet-compose" },
  title: "Calcul Interet Compose - Simulateur Epargne et Investissement",
  description:
    "Calculez les interets composes sur votre epargne ou investissement. Capital initial, versements mensuels, taux, duree. Tableau d'evolution annuel.",
  keywords:
    "calcul interet compose, interets composes simulateur, interet compose formule, simulateur placement, calculer interet compose, epargne interets composes",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment fonctionnent les interets composes ?",
    a: "Les interets composes generent des interets sur les interets deja gagnes. Contrairement aux interets simples, le capital grandit de facon exponentielle. Formule : Capital final = Capital initial x (1 + taux)^duree. Einstein aurait qualifie les interets composes de \"8e merveille du monde\".",
  },
  {
    q: "Combien rapportent 10 000 euros places a 5% pendant 20 ans ?",
    a: "10 000 euros places a 5% par an pendant 20 ans deviennent 26 533 euros grace aux interets composes (sans versement additionnel). Avec 200 euros de versement mensuel en plus, le capital atteint 108 065 euros.",
  },
  {
    q: "Quelle est la difference entre interet simple et compose ?",
    a: "Interet simple : les interets sont calcules uniquement sur le capital initial. Interet compose : les interets sont calcules sur le capital + les interets deja acquis. Sur 20 ans a 5%, 10 000 euros donnent 20 000 euros en simple mais 26 533 euros en compose.",
  },
  {
    q: "Qu'est-ce que la regle des 72 ?",
    a: "La regle des 72 permet d'estimer en combien d'annees un capital double : il suffit de diviser 72 par le taux annuel. Exemple : a 6% par an, votre capital double en 72 / 6 = 12 ans. A 4%, il double en 18 ans. C'est une approximation tres pratique pour comparer des placements.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Interet Compose" />
      <Breadcrumb currentPage="Interet Compose" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">📈</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Interet Compose</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Simulez la croissance de votre epargne avec les interets composes. Capital, versements, taux et duree.</p>

      <CalculateurInteretCompose />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">La puissance des interets composes</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les <strong>interets composes</strong> sont le principe selon lequel vos interets generent eux-memes des interets.
          Plus la duree est longue, plus l&apos;effet &quot;boule de neige&quot; est puissant.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">Exemples concrets (10 000 &euro; initiaux, sans versement)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Taux</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">5 ans</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">10 ans</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">20 ans</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">30 ans</th>
            </tr></thead>
            <tbody>
              {[3, 5, 7, 10].map((t) => (
                <tr key={t} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 font-semibold text-slate-700">{t}%</td>
                  {[5, 10, 20, 30].map((d) => (
                    <td key={d} className="py-2.5 px-2 text-right text-slate-600">
                      {(10000 * Math.pow(1 + t / 100, d)).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} &euro;
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">La regle des 72</h3>
        <p className="text-slate-600 leading-relaxed">
          Pour savoir en combien d&apos;annees votre capital double, divisez 72 par le taux annuel.
          Exemple : a 6%, votre capital double en 72 &divide; 6 = <strong>12 ans</strong>.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Commencer tot : le facteur le plus puissant</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Avec les interets composes, <strong>le temps compte plus que le montant</strong>. Quelques annees
          d&apos;avance changent radicalement le resultat final, car les premiers interets ont le plus de temps
          pour produire eux-memes des interets.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">L&apos;exemple qui parle</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Anne place 200 &euro; par mois des 25 ans et s&apos;arrete a 35 ans (10 ans d&apos;effort,
          24 000 &euro; verses). Bruno commence a 35 ans et verse 200 &euro; par mois jusqu&apos;a 65 ans
          (30 ans, 72 000 &euro; verses). A 65 ans, avec un rendement de 6 % par an,{" "}
          <strong>Anne a souvent plus de capital que Bruno</strong> alors qu&apos;elle a verse trois fois moins.
          C&apos;est toute la puissance de l&apos;anteriorite.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Sur quels supports en profiter en France</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>Livret A et LDDS</strong> : capital garanti, taux reglemente, ideal pour l&apos;epargne de precaution</li>
          <li><strong>Assurance-vie (fonds euros)</strong> : securise, fiscalite avantageuse apres 8 ans</li>
          <li><strong>PEA et ETF actions</strong> : plus volatils mais rendement historique de l&apos;ordre de 7 % par an sur le long terme</li>
          <li><strong>Plan d&apos;epargne retraite (PER)</strong> : interets composes + deduction fiscale a l&apos;entree</li>
        </ul>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Les deux ennemis : frais et inflation</h3>
        <p className="text-slate-600 leading-relaxed">
          Les frais agissent comme des interets composes <strong>a l&apos;envers</strong> : 1 % de frais annuels
          peut amputer le capital final de 20 a 25 % sur 30 ans. De meme, raisonnez toujours en rendement{" "}
          <strong>reel</strong> (rendement moins inflation) : a 5 % de rendement et 2 % d&apos;inflation, votre
          pouvoir d&apos;achat ne progresse que de 3 % par an. Privilegier des supports a frais reduits est donc
          aussi important que viser un bon rendement.
        </p>
      </section>

      <HowToJsonLd
        name="Calculer les intérêts composes sur une epargne"
        steps={[
          { name: "Saisir le capital et le taux annuel", text: "Entrer le capital initial (ex. 10 000 EUR) et le taux annuel brut (ex. 5 %). Ces deux valeurs determinent la base de la croissance exponentielle." },
          { name: "Renseigner les versements et la durée", text: "Saisir le montant des versements mensuels eventuels (ex. 200 EUR/mois) et la durée en années (ex. 20 ans). Le simulateur cumule le capital initial et les versements capitalises." },
          { name: "Appliquer la formule des intérêts composes", text: "Capital final = capital initial x (1 + taux)^années. A 5 % sur 20 ans, 10 000 EUR deviennent 26 533 EUR sans versements, ou 108 065 EUR avec 200 EUR/mois en plus." },
          { name: "Lire le tableau annuel et la regle des 72", text: "Le tableau annuel montre la progression an par an. La regle des 72 indique le doublement : 72 divise par le taux = années de doublement (ex. 72 / 6 = 12 ans à 6 % par an)." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode={`Les interets composes produisent des interets sur les interets deja acquis : le capital final est egal au capital initial multiplie par (1 + taux) puissance duree, auquel s'ajoute l'effet des versements reguliers. Le simulateur applique cette formule.`}
        sources={[
          { label: "AMF - Les interets composes et l'epargne", url: "https://www.amf-france.org" },
          { label: "Service-Public.fr - Epargne", url: "https://www.service-public.fr/particuliers/vosdroits/N67" },
        ]}
      />

      <RelatedCalculators currentSlug="/calcul-interet-compose" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
