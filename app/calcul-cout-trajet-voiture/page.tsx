import type { Metadata } from "next";
import CalculCoutTrajetVoiture from "./CalculCoutTrajetVoiture";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-cout-trajet-voiture" },
  title: "Calcul Cout Trajet Voiture - Essence, Diesel, Electrique 2026",
  description:
    "Calculez le cout reel d'un trajet voiture en France 2026. Carburant + peages + comparaison train/avion + empreinte CO2. Prix moyens essence 1.80 €, diesel 1.72 €, electrique 0.30 €/kWh.",
  keywords:
    "cout trajet voiture, prix essence trajet, calcul cout carburant, comparaison train voiture, prix kilometre voiture, cout km auto, empreinte CO2 trajet",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment calculer le cout d'un trajet en voiture ?",
    a: "Formule : Cout = (distance x consommation / 100) x prix carburant + peages. Exemple : 500 km x 7 L/100 x 1.80 € + 40 € de peages = 63 + 40 = 103 €. Le calcul integre aussi les peages pour un total realiste, et permet de comparer avec le train ou l'avion.",
  },
  {
    q: "Quels sont les prix moyens des carburants en France en 2026 ?",
    a: "Prix moyens France 2026 : Essence (SP95/SP98) 1.80 €/L, Diesel (Gazole) 1.72 €/L, Electrique 0.30 €/kWh a domicile (jusqu'a 0.59 €/kWh en borne rapide), GPL 1.00 €/L. Source : Ministere de la Transition Ecologique.",
  },
  {
    q: "Voiture electrique vraiment moins chere a l'usage ?",
    a: "Oui en general : pour 500 km, une electrique consommant 17 kWh/100 a domicile coute ~25 €, contre ~63 € pour une essence (7 L/100). Soit 60% d'economie. Attention : en borne rapide autoroute (0.50-0.59 €/kWh), l'avantage se reduit a 30-40%.",
  },
  {
    q: "Quand le train est-il moins cher que la voiture ?",
    a: "Le train est generalement moins cher pour les longs trajets en solo, surtout en reservant a l'avance (Ouigo, TGV InOui early-bird). Pour 1 personne, le train bat la voiture des 200-300 km. Pour 2+ personnes, la voiture redevient competitive. Avec une voiture electrique, l'ecart se reduit fortement.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Cout Trajet Voiture" />
      <Breadcrumb currentPage="Cout Trajet Voiture" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚗
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Cout Trajet Voiture
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez le cout reel de votre trajet : carburant + peages + comparaison
        train / avion + empreinte CO2. Prix moyens France 2026 inclus.
      </p>

      <CalculCoutTrajetVoiture />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment calculer le cout d&apos;un trajet en voiture ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le cout d&apos;un trajet voiture depend de 3 facteurs : la <strong>distance</strong>,
          la <strong>consommation</strong> du vehicule, et le <strong>prix du carburant</strong>.
          Il faut aussi ajouter les peages si vous prenez l&apos;autoroute.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="font-mono text-blue-900 text-center text-base sm:text-lg">
            Cout = (Distance × Conso / 100) × Prix carburant + Peages
          </p>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Exemple : Paris - Lyon (465 km)</h3>
        <ul className="text-slate-600 space-y-2 mb-4 ml-4 list-disc">
          <li>Distance : 465 km (aller simple)</li>
          <li>Consommation moyenne essence : 7 L / 100 km</li>
          <li>Carburant consomme : 465 × 7 / 100 = 32,5 L</li>
          <li>Cout carburant : 32,5 × 1,80 € = 58,50 €</li>
          <li>Peages aller : ~38 €</li>
          <li><strong>Total aller simple : 96,50 €</strong></li>
          <li>Aller-retour : <strong>193 €</strong></li>
        </ul>
      </section>

      <section className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
          ⛽ Prix moyens carburants France 2026
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 mb-4">
          <div className="bg-white rounded-lg p-3 border border-amber-200">
            <p className="font-semibold text-amber-900">Essence (SP95/SP98)</p>
            <p className="text-2xl font-bold text-amber-800">1,80 €/L</p>
            <p className="text-xs text-amber-700 mt-1">Moyenne pondérée nationale</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-amber-200">
            <p className="font-semibold text-amber-900">Diesel (Gazole)</p>
            <p className="text-2xl font-bold text-amber-800">1,72 €/L</p>
            <p className="text-xs text-amber-700 mt-1">Reste moins cher que l&apos;essence</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-amber-200">
            <p className="font-semibold text-amber-900">Electrique (domicile)</p>
            <p className="text-2xl font-bold text-amber-800">0,30 €/kWh</p>
            <p className="text-xs text-amber-700 mt-1">Tarif reglemente EDF base</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-amber-200">
            <p className="font-semibold text-amber-900">GPL</p>
            <p className="text-2xl font-bold text-amber-800">1,00 €/L</p>
            <p className="text-xs text-amber-700 mt-1">Option encore tres economique</p>
          </div>
        </div>
        <p className="text-sm text-amber-800">
          Source : Ministere de la Transition Ecologique, releves hebdomadaires des prix
          des carburants 2026.
        </p>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Voiture vs train : qui est le moins cher ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La comparaison depend du nombre de passagers, de la distance et du type de
          train. Voici les grandes lignes :
        </p>

        <div className="space-y-3 mb-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="font-semibold text-green-900 mb-1">Train souvent gagnant :</p>
            <ul className="text-green-800 text-sm space-y-1 ml-4 list-disc">
              <li>Trajet en solo</li>
              <li>Long trajet (plus de 300 km)</li>
              <li>Reservation a l&apos;avance (Ouigo, TGV early-bird)</li>
              <li>Pas de stationnement a l&apos;arrivee</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="font-semibold text-blue-900 mb-1">Voiture souvent gagnante :</p>
            <ul className="text-blue-800 text-sm space-y-1 ml-4 list-disc">
              <li>Voyage a 2-4 personnes</li>
              <li>Reservation derniere minute</li>
              <li>Petit trajet (moins de 200 km)</li>
              <li>Voiture electrique (rechargee a domicile)</li>
              <li>Trajet hors axes TGV majeurs</li>
            </ul>
          </div>
        </div>

        <p className="text-slate-600 text-sm">
          Notre estimation train (0,18 €/km) est une moyenne entre TER, TGV Inoui et
          Ouigo. Les prix reels varient enormement selon le jour, l&apos;heure et
          l&apos;anticipation.
        </p>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment reduire le cout de vos trajets ?
        </h2>

        <div className="space-y-4">
          <div className="border-l-4 border-emerald-500 pl-4 py-2">
            <p className="font-bold text-slate-800">1. Eco-conduite</p>
            <p className="text-slate-600 text-sm mt-1">
              Reduisez votre consommation de 15-20% en anticipant, en utilisant le
              frein moteur, en respectant les limitations (110 km/h sur autoroute
              au lieu de 130 = -20% conso).
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="font-bold text-slate-800">2. Eviter les peages</p>
            <p className="text-slate-600 text-sm mt-1">
              Routes nationales : +30-60 minutes mais economie de 30-60 € sur les
              longs trajets. Utilisez l&apos;option &quot;eviter les peages&quot; dans
              votre GPS.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <p className="font-bold text-slate-800">3. Covoiturage</p>
            <p className="text-slate-600 text-sm mt-1">
              Diviser le cout par 2, 3 ou 4 en partageant via BlaBlaCar ou Mobicoop.
              Pour Paris-Lyon a 4, c&apos;est moins de 25 € par personne.
            </p>
          </div>

          <div className="border-l-4 border-amber-500 pl-4 py-2">
            <p className="font-bold text-slate-800">4. Stations les moins cheres</p>
            <p className="text-slate-600 text-sm mt-1">
              Les stations de supermarches sont 5-15 centimes moins cheres que sur
              autoroute. Faire le plein avant ou au retour peut economiser 5-10 € par
              trajet.
            </p>
          </div>

          <div className="border-l-4 border-rose-500 pl-4 py-2">
            <p className="font-bold text-slate-800">5. Indemnites kilometriques</p>
            <p className="text-slate-600 text-sm mt-1">
              Si trajet pro : declarez vos indemnites kilometriques aux impots (bareme
              fiscal 2026). Cela compense largement le cout reel pour les salaries
              utilisant leur voiture perso.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-green-50 border border-green-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
          🌱 Empreinte carbone et ecologie
        </h2>
        <p className="text-green-800 mb-4 leading-relaxed">
          Au-dela du cout financier, chaque trajet a une empreinte carbone. Les
          facteurs d&apos;emission (source ADEME 2024) sont :
        </p>
        <ul className="text-green-800 space-y-2 mb-4 ml-4 list-disc">
          <li>Essence : 2,28 kg CO2 par litre brule</li>
          <li>Diesel : 2,62 kg CO2 par litre brule</li>
          <li>Electrique : 0,06 kg CO2 par kWh (mix EDF tres decarbone)</li>
          <li>Train TGV : environ 2 g CO2/passager.km (electrique)</li>
          <li>Avion : 200-250 g CO2/passager.km (court courrier)</li>
        </ul>
        <p className="text-green-800 leading-relaxed">
          Un Paris-Lyon en voiture essence emet ~74 kg CO2. Le meme trajet en TGV : moins de 1 kg.
        </p>
      </section>

      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600">
        <p>
          <strong>Disclaimer :</strong> Ce calcul est une estimation. Les prix reels
          des carburants varient selon les stations et l&apos;evolution du marche.
          Source : Ministere de la Transition Ecologique, ADEME, SNCF Tarifs 2026.
          Les estimations train/avion sont indicatives ; consultez les sites des
          operateurs pour les prix exacts.
        </p>
      </div>

      <HowToJsonLd
        name="Calculer le coût réel d'un trajet en voiture"
        steps={[
          { name: "Saisir la distance, le carburant et la consommation", text: "Entrer la distance en km, choisir le type de carburant (essence à 1,80 EUR/L, diesel à 1,72 EUR/L, électrique à 0,30 EUR/kWh ou GPL à 1,00 EUR/L) et la consommation aux 100 km du véhicule." },
          { name: "Calculer le coût carburant du trajet", text: "Coût carburant = (distance x consommation / 100) x prix. Exemple Paris-Lyon 465 km à 7 L/100 km : (465 x 7 / 100) x 1,80 = 58,50 EUR de carburant." },
          { name: "Ajouter les peages et obtenir le total", text: "Ajouter le montant estime des peages (exemple Paris-Lyon aller : 38 EUR). Total aller = 58,50 + 38 = 96,50 EUR. Le coût par passager est divise par le nombre de personnes." },
          { name: "Comparer avec le train et lire l'empreinte CO2", text: "Le calculateur affiche le coût équivalent train (0,18 EUR/km en moyenne) et l'empreinte carbone (essence 2,28 kg CO2/L, électrique 0,06 kg CO2/kWh selon ADEME 2024) pour comparaison." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-cout-trajet-voiture" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
