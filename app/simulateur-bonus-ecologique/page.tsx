import type { Metadata } from "next";
import SimulateurBonusEcologique from "./SimulateurBonusEcologique";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";

export const metadata: Metadata = {
  title: "Simulateur Bonus Ecologique Auto 2026 - Calcul gratuit",
  description:
    "Calculez votre bonus ecologique 2026 pour l'achat d'une voiture electrique. Bareme officiel selon vos revenus (RFR). Surbonus batterie europeenne. Jusqu'a 7 700 €.",
  keywords:
    "bonus ecologique, bonus ecologique 2026, voiture electrique, aide achat voiture electrique, prime ecologique, surbonus batterie, CEE automobile",
};

export default function Page() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quel est le montant du bonus ecologique en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le bonus ecologique 2026 varie selon vos revenus : 5 700 € pour les revenus modestes (RFR ≤ 16 300 €/part), 4 700 € pour les revenus intermediaires (16 301 - 26 300 €/part), et 3 500 € pour les autres. Un surbonus de 1 200 a 2 000 € s'ajoute si la batterie est fabriquee en Europe. Maximum total : 7 700 €.",
                },
              },
              {
                "@type": "Question",
                name: "Quelles voitures sont eligibles au bonus ecologique 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Seuls les vehicules 100% electriques ou hydrogene neufs sont eligibles. Le prix doit etre inferieur a 47 000 € TTC, le poids inferieur a 2 400 kg, et le score environnemental ADEME doit etre superieur ou egal a 60/80. Les hybrides (rechargeables ou non), les vehicules thermiques et les occasions sont exclus.",
                },
              },
              {
                "@type": "Question",
                name: "La prime a la conversion existe-t-elle encore en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Non, la prime a la conversion a ete definitivement supprimee fin 2024. Les derniers dossiers ont ete acceptes le 2 decembre 2024. En 2026, seul le bonus ecologique (finance par les CEE) reste disponible.",
                },
              },
              {
                "@type": "Question",
                name: "Comment est finance le bonus ecologique en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Depuis juillet 2025, le bonus ecologique est finance par les Certificats d'Economie d'Energie (CEE), et non plus par le budget de l'Etat. Ce sont les fournisseurs d'energie (EDF, TotalEnergies, Engie...) qui financent le dispositif. La demande se fait chez le concessionnaire au moment de l'achat.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Simulateur Bonus Ecologique Auto" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚗
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Bonus Ecologique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez le montant de votre bonus ecologique pour l&apos;achat
        d&apos;une voiture electrique. Bareme officiel 2026 selon vos revenus.
      </p>

      <SimulateurBonusEcologique />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <div className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Bonus ecologique 2026 : tout ce qui change
        </h2>
        <p>
          Le <strong>bonus ecologique</strong> est une aide financiere accordee
          pour l&apos;achat d&apos;un vehicule electrique neuf. En 2026, le
          dispositif a ete profondement reforme : il est desormais finance par les{" "}
          <strong>Certificats d&apos;Economie d&apos;Energie (CEE)</strong> et non
          plus par le budget de l&apos;Etat.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-5 my-6 not-prose">
          <h3 className="font-bold text-green-800 mb-2">
            Bareme du bonus ecologique 2026
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-xs text-slate-500">
                RFR ≤ 16 300 €/part
              </div>
              <div className="text-2xl font-black text-green-700">5 700 €</div>
              <div className="text-xs text-green-600">
                + jusqu&apos;a 2 000 € surbonus EU
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-xs text-slate-500">
                16 301 - 26 300 €/part
              </div>
              <div className="text-2xl font-black text-green-700">4 700 €</div>
              <div className="text-xs text-green-600">
                + jusqu&apos;a 1 500 € surbonus EU
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-xs text-slate-500">
                &gt; 26 300 €/part
              </div>
              <div className="text-2xl font-black text-green-700">3 500 €</div>
              <div className="text-xs text-green-600">
                + jusqu&apos;a 1 200 € surbonus EU
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Conditions d&apos;eligibilite
        </h2>
        <p>Pour beneficier du bonus ecologique en 2026, le vehicule doit remplir <strong>toutes</strong> ces conditions :</p>
        <ul>
          <li><strong>Type</strong> : 100% electrique ou hydrogene (les hybrides sont exclus)</li>
          <li><strong>Prix</strong> : inferieur a <strong>47 000 € TTC</strong></li>
          <li><strong>Poids</strong> : inferieur a <strong>2 400 kg</strong></li>
          <li><strong>Etat</strong> : vehicule neuf, jamais immatricule</li>
          <li><strong>Score ADEME</strong> : superieur ou egal a 60/80 (score environnemental)</li>
          <li><strong>Acheteur</strong> : particulier residant en France</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Le surbonus batterie europeenne
        </h2>
        <p>
          Nouveaute majeure : un <strong>surbonus</strong> de 1 200 a 2 000 € est
          accorde si la batterie du vehicule est fabriquee en Europe. Ce bonus
          supplementaire vise a favoriser la production industrielle europeenne
          et a reduire la dependance aux importations asiatiques.
        </p>
        <p>
          Les modeles avec batterie europeenne incluent notamment : Renault 5
          E-Tech, Peugeot e-208, Citroen e-C3, Fiat 500e, Renault Megane
          E-Tech, et Tesla Model 3 (batterie Gigafactory Berlin).
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Vehicules exclus du bonus 2026
        </h2>
        <ul>
          <li><strong>Hybrides rechargeables</strong> : plus aucune aide depuis fin 2024</li>
          <li><strong>Hybrides simples</strong> : jamais eligibles</li>
          <li><strong>Vehicules thermiques</strong> : essence et diesel exclus</li>
          <li><strong>SUV lourds</strong> : vehicules depassant 2 400 kg (Tesla Model X, BMW iX...)</li>
          <li><strong>Vehicules premium</strong> : prix superieur a 47 000 € (Porsche Taycan, Mercedes EQS...)</li>
          <li><strong>Occasions</strong> : seuls les vehicules neufs sont eligibles</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Prime a la conversion : supprimee
        </h2>
        <p>
          La <strong>prime a la conversion</strong> (anciennement &quot;prime a la
          casse&quot;) a ete <strong>definitivement supprimee</strong> le 2
          decembre 2024. Il n&apos;est plus possible de cumuler un bonus avec une
          prime pour la mise au rebut d&apos;un ancien vehicule polluant. Seul le
          bonus ecologique subsiste en 2026.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Evolution du bonus : 2024 → 2025 → 2026
        </h2>
        <div className="overflow-x-auto not-prose mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-3 font-semibold text-slate-700">Annee</th>
                <th className="text-center p-3 font-semibold text-slate-700">Bonus max</th>
                <th className="text-center p-3 font-semibold text-slate-700">Prime conversion</th>
                <th className="text-center p-3 font-semibold text-slate-700">Financement</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="p-3 font-medium">2024</td>
                <td className="p-3 text-center">7 000 €</td>
                <td className="p-3 text-center text-green-600">Jusqu&apos;a 6 000 €</td>
                <td className="p-3 text-center">Budget Etat</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3 font-medium">2025 (juil.)</td>
                <td className="p-3 text-center">4 000 €</td>
                <td className="p-3 text-center text-red-500">Supprimee</td>
                <td className="p-3 text-center">CEE (transition)</td>
              </tr>
              <tr className="border-b border-slate-100 bg-green-50">
                <td className="p-3 font-bold">2026</td>
                <td className="p-3 text-center font-bold text-green-700">7 700 €</td>
                <td className="p-3 text-center text-red-500">Supprimee</td>
                <td className="p-3 text-center">CEE (stabilise)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Economie voiture electrique vs thermique
        </h2>
        <p>
          Au-dela du bonus, une voiture electrique permet d&apos;economiser
          environ <strong>1 440 €/an</strong> en carburant (15 000 km/an). Sur 5
          ans, avec le bonus, l&apos;economie totale peut atteindre <strong>
          plus de 14 000 €</strong>. A cela s&apos;ajoutent des economies sur
          l&apos;entretien (pas de vidange, plaquettes plus durables) et
          l&apos;exoneration de la taxe sur les vehicules de societe.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Comment faire la demande ?
        </h2>
        <ol>
          <li>Choisir un vehicule eligible (electrique, &lt; 47 000 €, &lt; 2 400 kg)</li>
          <li>Verifier le <strong>score ADEME</strong> sur le site officiel</li>
          <li>Preparer votre <strong>avis d&apos;imposition</strong> (RFR par part)</li>
          <li>La demande se fait directement chez le <strong>concessionnaire</strong></li>
          <li>Le bonus est deduit du prix ou verse apres immatriculation (delai 2-3 mois)</li>
        </ol>
      </div>

      <AdSlot adSlot="0987654321" adFormat="rectangle" className="my-8" />

      <RelatedCalculators currentSlug="/simulateur-bonus-ecologique" />
    </div>
  );
}
