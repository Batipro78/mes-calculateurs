import type { Metadata } from "next";
import CalculCoteArgusVoiture from "./CalculCoteArgusVoiture";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-cote-argus-voiture" },
  title: "Estimation Cote Voiture Occasion - Calcul Indicatif (non officiel)",
  description:
    "Estimez la valeur indicative de votre voiture d'occasion : décote 1ère année 25%, ans 2-5 15%/an, 6+ 10%/an. Calcul informatif (PAS la cote Argus officielle). Comparaison kilométrage.",
  keywords:
    "cote voiture occasion, estimation prix voiture, calcul decote voiture, valeur voiture occasion, prix revente auto, decote auto, cote voiture indicative",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Ce calculateur donne-t-il la vraie cote Argus officielle ?",
    a: "NON. Ce calculateur fournit uniquement une estimation indicative à but informatif, basée sur des règles de décote moyennes du marché. Pour obtenir la cote Argus officielle (marque déposée), consultez le site largus.fr qui propose ce service payant.",
  },
  {
    q: "Comment est calculée la décote d'une voiture ?",
    a: "La règle généralement admise sur le marché français : la 1ère année, la voiture perd environ 25% de sa valeur (sortie du concessionnaire). Les années 2 à 5, la décote est d'environ 15% par an. À partir de la 6ème année, environ 10% par an. La décote totale est plafonnée et la voiture conserve au minimum 10% de sa valeur neuve.",
  },
  {
    q: "Quel est le kilométrage moyen d'une voiture en France ?",
    a: "Le kilométrage moyen annuel d'un véhicule en France est d'environ 15 000 km/an (source : SDES, Ministère de la Transition écologique). Un véhicule au kilométrage inférieur à cette moyenne sera mieux valorisé à la revente, et inversement.",
  },
  {
    q: "Le type de carburant influence-t-il la décote ?",
    a: "Oui. Depuis l'instauration des ZFE (Zones à Faibles Émissions) et les restrictions Crit'Air, le diesel se déprécie plus rapidement que l'essence. Les hybrides bénéficient d'une demande soutenue. Les électriques ont une décote initiale forte due à l'évolution rapide de la technologie batterie, mais cela tend à se stabiliser.",
  },
  {
    q: "Quels autres facteurs influencent le prix de revente ?",
    a: "Au-delà de l'âge et du kilométrage, le prix de revente dépend de : l'état général (carrosserie, intérieur), la complétude du carnet d'entretien, les options présentes (GPS, toit ouvrant, sièges chauffants), la marque et le modèle (certains conservent mieux leur valeur), et la région (offre/demande locale).",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Estimation Cote Voiture Occasion" category="UtilitiesApplication" />
      <Breadcrumb currentPage="Cote Voiture Occasion" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚗
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Estimation Cote Voiture d&apos;Occasion
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimation indicative gratuite de la valeur de votre voiture. <strong>Pas la cote
        Argus officielle</strong> — calcul informatif basé sur les règles de décote moyennes.
      </p>

      <CalculCoteArgusVoiture />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment fonctionne la décote d&apos;une voiture ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La décote correspond à la perte de valeur d&apos;un véhicule au fil du temps.
          Elle est influencée par de nombreux facteurs : âge, kilométrage, état, marque,
          modèle, carburant, options. Voici la règle générale appliquée sur le marché
          français pour une décote moyenne :
        </p>

        <div className="grid gap-3 sm:grid-cols-3 mb-4">
          <div className="bg-red-50 rounded-lg p-3 border border-red-200">
            <p className="font-semibold text-red-900">1ère année</p>
            <p className="text-3xl font-bold text-red-700 my-1">-25%</p>
            <p className="text-xs text-red-700">Sortie du concessionnaire</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
            <p className="font-semibold text-orange-900">Années 2 à 5</p>
            <p className="text-3xl font-bold text-orange-700 my-1">-15%/an</p>
            <p className="text-xs text-orange-700">Décote dégressive</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
            <p className="font-semibold text-amber-900">Année 6 et +</p>
            <p className="text-3xl font-bold text-amber-700 my-1">-10%/an</p>
            <p className="text-xs text-amber-700">Plafonnement progressif</p>
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed">
          La décote totale est plafonnée : votre voiture conserve toujours au minimum
          environ 10% de sa valeur neuve, même après 15+ ans (sauf cas particulier comme
          voiture de collection qui peut reprendre de la valeur).
        </p>
      </section>

      <section className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          📏 Le rôle du kilométrage
        </h2>
        <p className="text-blue-800 mb-4 leading-relaxed">
          Selon le Service des Données et Études Statistiques (SDES, Ministère de la
          Transition écologique), le kilométrage moyen d&apos;une voiture en France est
          d&apos;environ <strong>15 000 km/an</strong>. Cette référence sert à comparer
          si votre véhicule est au-dessus ou en-dessous de la moyenne.
        </p>

        <div className="bg-white border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-900 font-semibold mb-2">Exemple :</p>
          <p className="text-sm text-blue-800">
            Une voiture de 5 ans avec 60 000 km est au kilométrage moyen (5 × 15 000 = 75 000 km,
            elle est en-dessous donc valorisée). Une voiture de 5 ans avec 130 000 km a fait
            beaucoup plus que la moyenne → décote accentuée.
          </p>
        </div>

        <p className="text-blue-800 leading-relaxed">
          Un kilométrage faible (moins de 12 000 km/an en moyenne) est un argument fort
          à la revente. À l&apos;inverse, plus de 20 000 km/an de moyenne réduira
          significativement la valeur du véhicule.
        </p>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          L&apos;impact du carburant sur la décote
        </h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="font-bold text-slate-800">⛽ Essence</p>
            <p className="text-slate-600 text-sm mt-1">
              Carburant de référence. Décote classique, marché dynamique en occasion.
              Pas de restriction majeure pour les modèles récents.
            </p>
          </div>

          <div className="border-l-4 border-amber-500 pl-4 py-2">
            <p className="font-bold text-slate-800">🛢️ Diesel</p>
            <p className="text-slate-600 text-sm mt-1">
              Décote accélérée (~8% de pénalité en plus de la décote standard) en raison
              des restrictions ZFE (Crit&apos;Air 3, 4, 5 progressivement interdits dans
              les grandes métropoles : Paris, Lyon, Marseille, etc.).
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-4 py-2">
            <p className="font-bold text-slate-800">🔋 Hybride</p>
            <p className="text-slate-600 text-sm mt-1">
              Légère prime à la revente (~5% bonus). Demande soutenue, image écologique
              positive, accès facilité aux ZFE.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <p className="font-bold text-slate-800">🔌 Électrique</p>
            <p className="text-slate-600 text-sm mt-1">
              Forte décote initiale (~5%) car la technologie batterie évolue vite (autonomie,
              durée de vie). Tendance à se stabiliser pour les modèles récents (2022+).
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment maximiser la valeur de revente ?
        </h2>
        <ul className="text-slate-600 space-y-2 ml-4 list-disc">
          <li><strong>Entretien régulier :</strong> conservez tous les justificatifs de révisions et factures.</li>
          <li><strong>Carnet d&apos;entretien complet :</strong> indispensable pour une revente au prix fort.</li>
          <li><strong>Nettoyage et detailing :</strong> une voiture propre se vend 10 à 15% de plus.</li>
          <li><strong>Photos de qualité :</strong> 8 à 12 photos extérieur/intérieur en lumière naturelle.</li>
          <li><strong>Annonce détaillée :</strong> mentionnez options, historique, points forts.</li>
          <li><strong>Petites réparations avant vente :</strong> phare brisé, plaquettes usées → impact fort sur la négociation.</li>
        </ul>
      </section>

      <div className="mt-8 bg-red-50 border-2 border-red-200 rounded-lg p-4 text-sm text-red-900">
        <p>
          <strong>⚠️ DISCLAIMER IMPORTANT :</strong> Ce calculateur fournit une estimation
          indicative à but uniquement informatif. Il ne reflète PAS la cote officielle
          publiée par L&apos;argus (marque déposée). Les règles de décote utilisées sont
          des moyennes du marché français et peuvent varier sensiblement selon le modèle,
          la marque, les options, la région et la demande. Pour obtenir la cote Argus
          officielle, consultez le site{" "}
          <a href="https://www.largus.fr" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
            largus.fr
          </a>{" "}
          (service payant). Pour des alternatives gratuites, voir aussi La Centrale, AutoScout24
          ou un professionnel automobile.
        </p>
      </div>

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-cote-argus-voiture" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
