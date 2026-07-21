import type { Metadata } from "next";
import CalculateurEssence from "./CalculateurEssence";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-consommation-essence" },
  title: "Calcul Consommation Essence - Cout Trajet et Prix Carburant",
  description:
    "Calculez le cout de votre trajet en carburant. Distance, consommation L/100km, prix du litre. Cout au kilometre et budget mensuel.",
  keywords:
    "calcul consommation essence, cout trajet voiture, prix carburant calcul, litres pour trajet, consommation carburant, cout km voiture, calculer essence trajet",
};

// Prose en chaines JS (guillemets doubles) pour eviter les soucis d'apostrophe.
const SECTIONS: { title: string; paras: string[] }[] = [
  {
    title: "La formule du coût d'un trajet",
    paras: [
      "Le coût d'un trajet en carburant se calcule en trois temps. D'abord les litres consommés : litres = consommation (L/100 km) × distance ÷ 100. Ensuite le coût : litres × prix du litre.",
      "En une seule formule : coût = (consommation ÷ 100) × distance × prix du litre. Exemple pour un trajet de 500 km avec une voiture à 7 L/100 km et un carburant à 1,75 €/L : (7 ÷ 100) × 500 × 1,75 = 61,25 €.",
    ],
  },
  {
    title: "Comment mesurer sa consommation réelle ?",
    paras: [
      "La méthode la plus fiable est celle du « plein à plein ». Faites le plein complet, remettez le compteur kilométrique journalier à zéro, roulez normalement, puis refaites le plein.",
      "Notez le nombre de litres qu'il a fallu pour refaire le plein et la distance parcourue. La consommation réelle = litres × 100 ÷ kilomètres. Par exemple, 42 litres pour 600 km donnent 7 L/100 km. C'est bien plus précis que la valeur officielle du constructeur.",
    ],
  },
  {
    title: "Estimer son budget carburant annuel",
    paras: [
      "Pour connaître votre budget sur l'année : budget = (kilomètres annuels ÷ 100) × consommation × prix du litre.",
      "Exemple pour 15 000 km par an, une consommation de 7 L/100 km et un prix de 1,90 €/L : (15 000 ÷ 100) × 7 × 1,90 ≈ 1 995 € par an, soit environ 166 € par mois. Surveiller le prix à la pompe et comparer les stations peut faire économiser plusieurs centaines d'euros par an.",
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment calculer le coût d'un trajet en voiture ?",
    a: "Coût = (consommation en L/100 km ÷ 100) × distance en km × prix du litre. Exemple : 7 L/100 km, 500 km, 1,75 €/L → (7 ÷ 100) × 500 × 1,75 = 61,25 €.",
  },
  {
    q: "Combien coûte 100 km en voiture ?",
    a: "Multipliez la consommation aux 100 km par le prix du litre. Par exemple, une voiture à 7 L/100 km avec un carburant à 1,90 €/L revient à 7 × 1,90 = 13,30 € aux 100 km. Une citadine à 5 L coûtera environ 9,50 € aux 100 km.",
  },
  {
    q: "Quelle est la consommation moyenne d'une voiture ?",
    a: "En France, la consommation moyenne est d'environ 6-7 L/100 km pour une voiture essence et 5-6 L/100 km pour un diesel. Les citadines consomment 4-5 L, les SUV 8-10 L.",
  },
  {
    q: "Comment connaître la consommation réelle de ma voiture ?",
    a: "Utilisez la méthode du plein à plein : faites le plein, remettez le compteur journalier à zéro, roulez, puis refaites le plein. Divisez les litres ajoutés par les kilomètres parcourus et multipliez par 100. Exemple : 42 L pour 600 km = 7 L/100 km.",
  },
  {
    q: "Quelle différence entre consommation officielle et réelle ?",
    a: "La consommation officielle (cycle WLTP) est mesurée en laboratoire. En conditions réelles (autoroute, climatisation, charge), on observe généralement 10 à 25 % de plus. Utilisez votre propre relevé de consommation pour un calcul précis.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Consommation Essence" />
      <Breadcrumb currentPage="Consommation Essence" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center text-xl shadow-sm">⛽</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Consommation Essence</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Calculez le cout de votre trajet, les litres necessaires et le cout au kilometre.</p>

      <CalculateurEssence />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Consommation moyenne par type de vehicule</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Type</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Essence</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Diesel</th>
            </tr></thead>
            <tbody>
              {[
                { t: "Citadine (Clio, 208)", e: "5-6 L", d: "4-5 L" },
                { t: "Compacte (Golf, 308)", e: "6-7 L", d: "5-6 L" },
                { t: "Berline (Passat, 508)", e: "7-8 L", d: "5-7 L" },
                { t: "SUV compact (3008, Tiguan)", e: "7-9 L", d: "6-7 L" },
                { t: "SUV (Tucson, Kadjar)", e: "8-10 L", d: "6-8 L" },
                { t: "Utilitaire", e: "9-12 L", d: "7-9 L" },
              ].map((r) => (
                <tr key={r.t} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 text-slate-700">{r.t}</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-red-600">{r.e}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{r.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Conseils pour reduire sa consommation</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { c: "Pression des pneus", d: "+0,5 bar = +4% conso" },
            { c: "Vitesse 130 → 110 km/h", d: "Economie ~20% sur autoroute" },
            { c: "Conduite souple", d: "Anticiper, eviter freinages brusques" },
            { c: "Climatisation", d: "+10 a 20% de consommation" },
          ].map((item) => (
            <div key={item.c} className="bg-slate-50 rounded-xl p-3">
              <p className="text-sm font-semibold text-slate-700">{item.c}</p>
              <p className="text-xs text-slate-500">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sections de contenu detaille (prose en chaines JS) */}
      {SECTIONS.map((section) => (
        <section
          key={section.title}
          className="mt-8 bg-white rounded-2xl border border-slate-200 p-8"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            {section.title}
          </h2>
          <div className="space-y-3">
            {section.paras.map((p, i) => (
              <p key={i} className="text-slate-600 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}

      <HowToJsonLd
        name="Calculer la consommation d'essence et le coût d'un trajet"
        steps={[
          { name: "Saisir la distance et la consommation", text: "Entrer la distance du trajet en km et la consommation du véhicule aux 100 km. Exemple : 500 km et 7 L/100 km." },
          { name: "Calculer les litres nécessaires", text: "Litres = (consommation / 100) x distance. Exemple : (7 / 100) x 500 = 35 L consommes pour ce trajet." },
          { name: "Saisir le prix du litre et calculer le coût du trajet", text: "Coût trajet = litres x prix du litre. Exemple : 35 x 1,75 EUR = 61,25 EUR. Le coût au km = consommation / 100 x prix du litre, soit 0,1225 EUR/km." },
          { name: "Estimer le budget mensuel ou annuel", text: "Budget annuel = (km annuels / 100) x consommation x prix du litre. Exemple : 15 000 km, 7 L/100, 1,90 EUR/L = 1 995 EUR par an, soit environ 166 EUR par mois." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-consommation-essence" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
