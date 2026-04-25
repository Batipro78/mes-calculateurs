import type { Metadata } from "next";
import EvVsThermique from "./EvVsThermique";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/simulateur-electrique-vs-thermique" },
  title:
    "Voiture Electrique vs Thermique 2026 - Comparateur Cout Total Gratuit",
  description:
    "Comparez le cout total d'une voiture electrique vs thermique : achat, carburant, entretien, assurance, depreciation. Simulateur gratuit avec economies sur 1 a 10 ans.",
  keywords:
    "voiture electrique vs thermique, comparateur cout voiture electrique, cout total possession, electrique ou thermique, simulateur voiture electrique, economie voiture electrique, cout entretien electrique, cout carburant vs electricite",
  openGraph: {
    title:
      "Voiture Electrique vs Thermique 2026 - Comparateur Cout Total Gratuit",
    description:
      "Comparez le cout total d'une voiture electrique vs thermique : achat, carburant, entretien, assurance, depreciation. Simulateur gratuit.",
    type: "website",
    url: "https://mescalculateurs.fr/simulateur-electrique-vs-thermique",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Voiture Electrique vs Thermique 2026 - Comparateur Cout Total Gratuit",
    description:
      "Comparez le cout total d'une voiture electrique vs thermique : achat, carburant, entretien, assurance, depreciation.",
  },
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Simulateur Voiture Electrique vs Thermique" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Est-ce qu'une voiture electrique revient vraiment moins cher qu'une thermique ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Oui, dans la majorite des cas. Malgre un prix d'achat plus eleve, la voiture electrique est moins chere a l'usage : electricite 3 a 4 fois moins chere que l'essence, entretien reduit de 30 a 50%, et bonus ecologique jusqu'a 7 700 €. Sur 5 ans et 15 000 km/an, l'economie depasse souvent 5 000 € par rapport a un vehicule thermique equivalent.",
                },
              },
              {
                "@type": "Question",
                name: "A partir de combien de kilometres par an la voiture electrique est-elle rentable ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le seuil de rentabilite depend du surcoat a l'achat et du prix de l'electricite. Pour une citadine (Clio vs Renault 5), l'electrique devient rentable des 8 000-10 000 km/an. Pour un SUV (3008 vs e-3008), il faut compter 12 000-15 000 km/an. Plus vous roulez, plus l'electrique est avantageux.",
                },
              },
              {
                "@type": "Question",
                name: "Quels sont les vrais couts d'entretien d'une voiture electrique ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'entretien d'une voiture electrique coute en moyenne 400 a 500 €/an contre 800 a 1 100 €/an pour un thermique. Il n'y a pas de vidange, pas de courroie de distribution, pas d'embrayage, et les plaquettes de frein durent plus longtemps grace au freinage regeneratif. Les postes principaux sont les pneus, le liquide de frein et la climatisation.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Simulateur Electrique vs Thermique" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⚡
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Voiture Electrique vs Thermique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Comparez le cout total de possession sur 1 a 10 ans : achat, carburant,
        entretien, assurance et depreciation.
      </p>

      <EvVsThermique />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <div className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Electrique vs Thermique : le vrai comparatif des couts en 2026
        </h2>
        <p>
          Le choix entre <strong>voiture electrique et thermique</strong> ne se
          limite pas au prix d&apos;achat. Pour faire le bon choix, il faut
          comparer le <strong>cout total de possession</strong> (TCO) qui inclut
          l&apos;energie, l&apos;entretien, l&apos;assurance et la depreciation.
          Notre simulateur prend en compte tous ces postes pour vous donner une
          reponse precise.
        </p>

        <div className="overflow-x-auto not-prose my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-3 font-semibold text-slate-700">
                  Poste de cout
                </th>
                <th className="text-center p-3 font-semibold text-blue-700">
                  ⛽ Thermique
                </th>
                <th className="text-center p-3 font-semibold text-green-700">
                  ⚡ Electrique
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="p-3 font-medium">Prix d&apos;achat</td>
                <td className="p-3 text-center">20 000 - 40 000 €</td>
                <td className="p-3 text-center">25 000 - 50 000 €</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3 font-medium">Energie (15 000 km/an)</td>
                <td className="p-3 text-center">1 500 - 2 000 €/an</td>
                <td className="p-3 text-center text-green-600">
                  400 - 600 €/an
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3 font-medium">Entretien</td>
                <td className="p-3 text-center">800 - 1 200 €/an</td>
                <td className="p-3 text-center text-green-600">
                  400 - 600 €/an
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3 font-medium">Assurance</td>
                <td className="p-3 text-center">600 - 900 €/an</td>
                <td className="p-3 text-center">650 - 950 €/an</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3 font-medium">Depreciation (5 ans)</td>
                <td className="p-3 text-center">-55%</td>
                <td className="p-3 text-center">-55%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3 font-medium">Bonus ecologique</td>
                <td className="p-3 text-center text-red-500">Aucun</td>
                <td className="p-3 text-center text-green-600">
                  3 500 a 7 700 €
                </td>
              </tr>
              <tr className="bg-green-50">
                <td className="p-3 font-bold">Bilan sur 5 ans</td>
                <td className="p-3 text-center font-bold">
                  Plus cher a l&apos;usage
                </td>
                <td className="p-3 text-center font-bold text-green-700">
                  Economie de 3 000 a 8 000 €
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Quand la voiture electrique devient-elle rentable ?
        </h2>
        <p>
          Le <strong>seuil de rentabilite</strong> depend de plusieurs facteurs :
          le surcoat a l&apos;achat, le prix du carburant vs electricite, et le
          nombre de kilometres parcourus. En regle generale :
        </p>
        <ul>
          <li>
            <strong>Gros rouleurs (&gt; 20 000 km/an)</strong> : l&apos;electrique
            est rentable des la 2e annee
          </li>
          <li>
            <strong>Rouleurs moyens (12 000-20 000 km/an)</strong> : rentable a
            partir de la 3e-4e annee
          </li>
          <li>
            <strong>Petits rouleurs (&lt; 10 000 km/an)</strong> : rentabilite
            plus longue, mais le bonus ecologique compense une partie
          </li>
        </ul>
        <p>
          Notre simulateur calcule automatiquement votre seuil de rentabilite
          personnalise en fonction de vos parametres reels.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Conseils pour optimiser votre choix
        </h2>
        <div className="grid md:grid-cols-2 gap-4 not-prose my-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-bold text-green-800 text-sm mb-1">
              Rechargez a domicile
            </h3>
            <p className="text-sm text-green-700">
              L&apos;electricite a domicile (heures creuses) coute 0,15-0,20
              €/kWh contre 0,40-0,70 € sur borne rapide. Privilege la recharge
              nocturne.
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-bold text-green-800 text-sm mb-1">
              Profitez du bonus ecologique
            </h3>
            <p className="text-sm text-green-700">
              Jusqu&apos;a 7 700 € d&apos;aide en 2026. Le bonus est deduit
              directement chez le concessionnaire. Verifiez votre eligibilite.
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-bold text-blue-800 text-sm mb-1">
              Comparez les assurances
            </h3>
            <p className="text-sm text-blue-700">
              L&apos;assurance electrique est souvent 5 a 15% plus chere. Mais
              certains assureurs offrent des tarifs dedies. Comparez !
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-bold text-blue-800 text-sm mb-1">
              Pensez a la revente
            </h3>
            <p className="text-sm text-blue-700">
              La depreciation est similaire entre electrique et thermique. La
              batterie est garantie 8 ans et conserve bien sa valeur.
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h3 className="font-bold text-amber-800 text-sm mb-1">
              Evaluez vos trajets
            </h3>
            <p className="text-sm text-amber-700">
              Si 90% de vos trajets font moins de 100 km, l&apos;electrique
              couvre facilement vos besoins quotidiens. Pour les longs trajets
              occasionnels, le reseau de bornes rapides s&apos;etend.
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h3 className="font-bold text-amber-800 text-sm mb-1">
              LOA ou achat ?
            </h3>
            <p className="text-sm text-amber-700">
              La LOA (location avec option d&apos;achat) est tres populaire pour
              l&apos;electrique. Elle permet de beneficier du bonus sans avancer
              le prix total du vehicule.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-6 not-prose">
          <p className="text-sm text-slate-600">
            <strong>Avertissement :</strong> Ce simulateur fournit des
            estimations basees sur les parametres que vous saisissez. Les couts
            reels peuvent varier selon le modele exact, vos habitudes de
            conduite, la region, le prix du carburant et de l&apos;electricite.
            Les montants de bonus ecologique sont indicatifs et soumis aux
            conditions d&apos;eligibilite officielles.
          </p>
        </div>
      </div>

      <AdSlot adSlot="0987654321" adFormat="rectangle" className="my-8" />

      <RelatedCalculators currentSlug="/simulateur-electrique-vs-thermique" />
    </div>
  );
}
