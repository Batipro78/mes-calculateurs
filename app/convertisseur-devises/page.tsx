import type { Metadata } from "next";
import ConvertisseurDevises from "./ConvertisseurDevises";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/convertisseur-devises" },
  title:
    "Convertisseur de Devises Gratuit 2026 - Taux de change en temps reel",
  description:
    "Convertissez facilement entre Euro, Dollar, Livre sterling, Dirham, Dinar, Franc suisse et 14 devises. Taux de change actualises, calcul instantane et gratuit.",
  keywords:
    "convertisseur devises, taux de change, euro dollar, conversion monnaie, convertisseur euro, change devise, EUR USD, EUR GBP, EUR MAD, EUR TND, EUR DZD, convertisseur monnaie gratuit",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment convertir des euros en dollars ?",
    a: "Pour convertir des euros en dollars, multipliez le montant en euros par le taux de change EUR/USD. Par exemple, si le taux est de 1,0856, alors 1 000 EUR = 1 000 x 1,0856 = 1 085,60 USD. Les taux de change fluctuent en permanence sur le marche des changes (Forex).",
  },
  {
    q: "Qu'est-ce qui influence les taux de change ?",
    a: "Les taux de change sont influences par les taux d'interet des banques centrales, l'inflation, la balance commerciale, la stabilite politique et la croissance economique. Un pays avec des taux d'interet eleves et une inflation faible voit generalement sa devise se renforcer.",
  },
  {
    q: "Quelle est la parite entre l'Euro et le Franc CFA ?",
    a: "Le Franc CFA (XOF et XAF) a une parite fixe avec l'Euro : 1 EUR = 655,957 CFA. Cette parite est garantie par le Tresor francais et ne varie jamais, contrairement aux autres paires de devises.",
  },
  {
    q: "Quelles devises sont disponibles dans ce convertisseur ?",
    a: "Notre convertisseur prend en charge 14 devises : Euro (EUR), Dollar americain (USD), Livre sterling (GBP), Franc suisse (CHF), Dollar canadien (CAD), Yen japonais (JPY), Dirham marocain (MAD), Dinar tunisien (TND), Dinar algerien (DZD), et d'autres monnaies couramment utilisees depuis la France.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Convertisseur Devises" />
      <Breadcrumb currentPage="Convertisseur Devises" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💱
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Convertisseur de Devises
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Convertissez instantanement entre 14 devises. Taux indicatifs actualises.
      </p>

      <ConvertisseurDevises />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment fonctionne la conversion de devises ?
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          La conversion de devises consiste a calculer la valeur equivalente
          d&apos;un montant exprime dans une monnaie vers une autre monnaie,
          en utilisant un taux de change. Ce taux represente le prix d&apos;une
          devise par rapport a une autre et fluctue en permanence en fonction
          de l&apos;offre et de la demande sur les marches financiers
          internationaux (marche des changes ou Forex).
        </p>
        <p className="text-slate-600 leading-relaxed mb-6">
          Notre convertisseur de devises gratuit vous permet de convertir
          rapidement entre les principales monnaies du monde : Euro (EUR),
          Dollar americain (USD), Livre sterling (GBP), Franc suisse (CHF),
          Dollar canadien (CAD), Yen japonais (JPY), Dirham marocain (MAD),
          Dinar tunisien (TND), Dinar algerien (DZD) et bien d&apos;autres.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          La formule de conversion
        </h3>
        <div className="bg-slate-50 rounded-xl p-4 mb-6">
          <p className="font-mono text-sm text-slate-600">
            Montant converti = Montant d&apos;origine x (Taux devise cible / Taux devise source)
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Exemple : 1 000 EUR en USD = 1 000 x 1,0856 = 1 085,60 USD
          </p>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les devises les plus echangees dans le monde
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          Le Dollar americain (USD) est la devise la plus echangee au monde,
          presente dans environ 88% des transactions sur le marche des changes.
          L&apos;Euro (EUR) arrive en deuxieme position avec environ 31% des
          echanges, suivi du Yen japonais (JPY) et de la Livre sterling (GBP).
          Le marche du Forex traite plus de 7 500 milliards de dollars par jour,
          ce qui en fait le plus grand marche financier au monde.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Qu&apos;est-ce qui influence les taux de change ?
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Taux d&apos;interet</p>
            <p className="text-xs text-slate-500 mt-1">
              Les banques centrales (BCE, Fed, BoE) fixent les taux directeurs.
              Un taux eleve attire les investisseurs et renforce la devise.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Inflation</p>
            <p className="text-xs text-slate-500 mt-1">
              Un pays avec une inflation faible voit generalement sa monnaie
              s&apos;apprecier par rapport aux pays a forte inflation.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Balance commerciale</p>
            <p className="text-xs text-slate-500 mt-1">
              Un excedent commercial (plus d&apos;exportations que d&apos;importations)
              tend a renforcer la devise du pays exportateur.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Stabilite politique</p>
            <p className="text-xs text-slate-500 mt-1">
              Les investisseurs privilegient les devises de pays politiquement
              stables, ce qui renforce ces monnaies (ex : CHF, valeur refuge).
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Conseils pour vos conversions de devises
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2">
          <li>
            <strong>Voyages :</strong> comparez les taux de votre banque, des
            bureaux de change et des cartes bancaires multi-devises (Revolut,
            Wise, N26) pour trouver le meilleur taux.
          </li>
          <li>
            <strong>Achats en ligne :</strong> verifiez si payer en devise
            locale ou en euros est plus avantageux. Les frais de conversion
            bancaire peuvent atteindre 2 a 3%.
          </li>
          <li>
            <strong>Transferts internationaux :</strong> les services en ligne
            comme Wise ou Remitly offrent souvent de meilleurs taux que les
            banques traditionnelles.
          </li>
          <li>
            <strong>Investissement :</strong> les variations de change peuvent
            impacter la rentabilite de vos placements a l&apos;etranger. Le
            risque de change est un facteur important a considerer.
          </li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Le Franc CFA : une parite fixe avec l&apos;Euro
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          Le Franc CFA (XOF pour l&apos;Afrique de l&apos;Ouest et XAF pour
          l&apos;Afrique Centrale) a une parite fixe avec l&apos;Euro :
          1 EUR = 655,957 CFA. Cette parite, heritee de l&apos;ancienne
          parite avec le Franc francais, est garantie par le Tresor francais.
          Cela signifie que la conversion EUR/CFA ne varie jamais, contrairement
          aux autres paires de devises.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Principales paires de devises depuis la France
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left mt-2">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-2 text-slate-500 font-medium">Paire</th>
                <th className="pb-2 text-slate-500 font-medium">Usage courant</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b border-slate-100">
                <td className="py-2 font-semibold">EUR/USD</td>
                <td className="py-2">Achats en ligne, voyages aux USA</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 font-semibold">EUR/GBP</td>
                <td className="py-2">Commerce avec le Royaume-Uni</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 font-semibold">EUR/CHF</td>
                <td className="py-2">Travailleurs frontaliers France-Suisse</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 font-semibold">EUR/MAD</td>
                <td className="py-2">Transferts familiaux, voyages au Maroc</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 font-semibold">EUR/TND</td>
                <td className="py-2">Transferts familiaux, voyages en Tunisie</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">EUR/DZD</td>
                <td className="py-2">Transferts familiaux, voyages en Algerie</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <HowToJsonLd
        name="Convertir un montant entre devises"
        steps={[
          { name: "Saisir le montant et choisir la devise source", text: "Entrer le montant à convertir (ex. 1000) et sélectionner la devise d'origine parmi 14 disponibles : EUR, USD, GBP, CHF, CAD, JPY, MAD, TND, DZD et autres." },
          { name: "Choisir la devise cible", text: "Sélectionner la devise d'arrivee (ex. USD). Le Franc CFA (XOF/XAF) beneficie d'une parite fixe garantie par le Tresor francais : 1 EUR = 655,957 CFA sans variation possible." },
          { name: "Appliquer la formule de conversion", text: "Montant converti = montant source x (taux devise cible / taux devise source). Ex. : 1000 EUR x taux EUR/USD 1,0856 = 1 085,60 USD." },
          { name: "Lire le montant converti et optimiser", text: "Le montant dans la devise cible s'affiche avec le taux indicatif utilise. Pour les transferts internationaux, comparer avec les frais bancaires habituels (2 à 3 %) ou les services en ligne comme Wise." },
        ]}
      />
      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/convertisseur-devises" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
