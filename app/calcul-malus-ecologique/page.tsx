import type { Metadata } from "next";
import CalculateurMalus from "./CalculateurMalus";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-malus-ecologique" },
  title: "Calcul Malus Ecologique 2026 - CO2 et Poids",
  description:
    "Calculez le malus ecologique 2026 de votre vehicule. Malus CO2 (seuil 113 g/km) et malus au poids (seuil 1600 kg). Bareme officiel, plafond 70 000 euros.",
  keywords:
    "malus ecologique 2026, calcul malus co2, malus poids voiture, bareme malus 2026, simulateur malus ecologique, taxe co2 voiture 2026, malus automobile",
};

// Prose en chaines JS (guillemets doubles) pour eviter les soucis d'apostrophe.
const SECTIONS: { title: string; paras: string[] }[] = [
  {
    title: "Comment fonctionne le malus écologique ?",
    paras: [
      "Le malus écologique est une taxe payée une seule fois, au moment de la première immatriculation d'un véhicule neuf en France. Il figure sur la carte grise et s'ajoute au prix d'achat.",
      "Il repose sur deux composantes : le malus sur les émissions de CO2 (mesurées selon la norme WLTP) et le malus au poids. Plus un véhicule émet de CO2 ou est lourd, plus la taxe est élevée, dans la limite d'un plafond.",
    ],
  },
  {
    title: "Malus CO2 et malus au poids : on retient le plus élevé",
    paras: [
      "Les deux malus ne s'additionnent pas. L'administration calcule le malus CO2 d'un côté et le malus au poids de l'autre, puis retient uniquement le montant le plus élevé des deux.",
      "Le malus CO2 démarre à partir de 114 g/km en 2026 et grimpe très vite. Le malus au poids vise les véhicules de plus de 1,6 tonne, à raison de 10 € par kilo au-delà du seuil. Les gros SUV thermiques sont les plus touchés.",
    ],
  },
  {
    title: "Les exonérations et abattements",
    paras: [
      "Les véhicules 100 % électriques sont totalement exonérés des deux malus. Les hybrides rechargeables émettant moins de 50 g/km de CO2 le sont également, quel que soit leur poids.",
      "Les familles nombreuses bénéficient d'un abattement de 20 g/km de CO2 par enfant à charge (à partir de trois enfants), sur demande de remboursement. Des exonérations existent aussi pour les personnes en situation de handicap et les véhicules accessibles en fauteuil roulant.",
    ],
  },
  {
    title: "Le malus s'applique-t-il à une voiture d'occasion ?",
    paras: [
      "Acheter une voiture d'occasion déjà immatriculée en France ne déclenche aucun malus : il a déjà été payé par le premier propriétaire.",
      "En revanche, importer un véhicule d'occasion depuis l'étranger entraîne un « malus occasion » lors de son immatriculation en France. Son montant est toutefois réduit de 10 % par année d'ancienneté du véhicule, ce qui l'allège fortement pour les voitures âgées.",
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  { q: "À partir de combien de CO2 paye-t-on le malus en 2026 ?", a: "En 2026, le malus CO2 s'applique à partir de 114 g/km de CO2 (seuil abaissé par rapport à 2025). Le montant démarre à 50 euros et peut atteindre 70 000 euros pour les véhicules les plus polluants." },
  { q: "Comment fonctionne le malus au poids ?", a: "Le malus au poids s'applique aux véhicules de plus de 1 600 kg. Le tarif est de 10 euros par kg au-dessus de ce seuil. Les véhicules électriques et hybrides rechargeables en sont exonérés." },
  { q: "Le malus CO2 et le malus poids se cumulent-ils ?", a: "Non, on retient le montant le plus élevé entre le malus CO2 et le malus au poids. Ils ne se cumulent pas." },
  { q: "Le malus s'applique-t-il aux voitures d'occasion ?", a: "Non pour une occasion déjà immatriculée en France : le malus a été réglé à l'origine. En revanche, l'importation d'une occasion de l'étranger déclenche un malus occasion, réduit de 10 % par année d'ancienneté du véhicule." },
  { q: "Comment réduire ou éviter le malus écologique ?", a: "En choisissant un véhicule peu émetteur et léger, un modèle électrique ou hybride rechargeable sous 50 g/km (exonérés), en profitant de l'abattement famille nombreuse (20 g/km par enfant), ou en achetant une occasion déjà immatriculée en France." },
  { q: "Un véhicule hybride rechargeable est-il exonéré du malus ?", a: "Oui, les véhicules hybrides rechargeables dont les émissions de CO2 sont inférieures à 50 g/km sont exonérés à la fois du malus CO2 et du malus au poids, quel que soit leur poids." },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Malus Ecologique" />
      <Breadcrumb currentPage="Malus Ecologique" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl flex items-center justify-center text-xl shadow-sm">🚗</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Malus Ecologique 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Simulez le malus CO2 et le malus au poids de votre vehicule. Bareme officiel 2026.</p>

      <CalculateurMalus />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Bareme malus CO2 2026</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Emissions CO2</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Malus</th>
            </tr></thead>
            <tbody>
              {[
                { co2: "\u2264 113 g/km", malus: "0 \u20ac" },
                { co2: "114 g/km", malus: "50 \u20ac" },
                { co2: "120 g/km", malus: "200 \u20ac" },
                { co2: "130 g/km", malus: "700 \u20ac" },
                { co2: "140 g/km", malus: "1 500 \u20ac" },
                { co2: "150 g/km", malus: "3 000 \u20ac" },
                { co2: "160 g/km", malus: "5 500 \u20ac" },
                { co2: "170 g/km", malus: "9 500 \u20ac" },
                { co2: "180 g/km", malus: "15 500 \u20ac" },
                { co2: "190 g/km", malus: "23 500 \u20ac" },
                { co2: "200 g/km", malus: "33 500 \u20ac" },
                { co2: "210+ g/km", malus: "45 500 \u20ac+" },
                { co2: "Plafond", malus: "70 000 \u20ac" },
              ].map((r) => (
                <tr key={r.co2} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 text-slate-700">{r.co2}</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-rose-600">{r.malus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Exonerations</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { cas: "Vehicule electrique", d: "Exonere CO2 + poids" },
            { cas: "Hybride rechargeable (< 50 g)", d: "Exonere CO2 + poids" },
            { cas: "Famille nombreuse (3+ enfants)", d: "Abattement 20 g/km par enfant" },
            { cas: "Personne handicapee", d: "Exoneration sous conditions" },
          ].map((item) => (
            <div key={item.cas} className="bg-slate-50 rounded-xl p-3">
              <p className="text-sm font-semibold text-slate-700">{item.cas}</p>
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
        name="Calculer le malus ecologique de son véhicule"
        steps={[
          { name: "Saisir les emissions de CO2 en g/km", text: "Entrer les emissions de CO2 selon la norme WLTP (disponible sur le certificat de conformite ou la carte grise). Le seuil d'exonération est de 113 g/km en 2026 ; à 114 g/km, le malus demarre à 50 EUR." },
          { name: "Saisir le poids du véhicule en kg", text: "Entrer le poids à vide du véhicule (mentionne sur la carte grise). Le malus au poids s'applique à partir de 1 600 kg, à raison de 10 EUR par kg supplémentaire (ex. 1 800 kg = 2 000 EUR)." },
          { name: "Retenir le montant le plus eleve des deux malus", text: "Le malus CO2 suit le barème progressif (ex. 150 g/km = 3 000 EUR, 170 g/km = 9 500 EUR). Le malus poids = (poids - 1 600) x 10 EUR. Les deux ne se cumulent pas : seul le plus eleve s'applique, dans la limite de 70 000 EUR." },
          { name: "Vérifier les exonérations applicables", text: "Véhicules électriques et hybrides rechargeables sous 50 g/km : exoneres des deux malus. Famille de 3 enfants ou plus : abattement de 20 g/km par enfant sur le malus CO2, sur demande de remboursement aupres du fisc." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode={`Le malus ecologique est une taxe a l'immatriculation assise sur les emissions de CO2 (norme WLTP) du vehicule neuf, selon un bareme annuel progressif, complete par un malus au poids. Le simulateur applique le bareme en vigueur.`}
        sources={[
          { label: "Service-Public.fr - Malus ecologique", url: "https://www.service-public.fr/particuliers/vosdroits/F35041" },
          { label: "Economie.gouv.fr - Malus automobile", url: "https://www.economie.gouv.fr" },
        ]}
      />

      <RelatedCalculators currentSlug="/calcul-malus-ecologique" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
