export type Sexe = "homme" | "femme" | "enfant";

export interface ResultatWthr {
  wthr: number; // ratio ex: 0.43, 0.52
  niveau: string; // "Sain", "Surpoids", "Obésité", etc.
  niveauCouleur: string; // class Tailwind pour text
  bgCouleur: string; // class Tailwind pour background gradient
  borderCouleur: string; // class Tailwind pour border
  niveauDescription: string; // Description du niveau
  risqueCardio: string; // "Faible", "Modéré", "Élevé", "Très élevé"
  ecartRegle05: number; // Différence vs 0.5 (règle d'or OMS)
  ecartRegle05Texte: string; // Ex: "+0.02 vs règle d'or"
}

// Critères NHS UK 2022 pour hommes
const SEUILS_HOMMES = [
  { max: 0.43, niveau: "Sous-poids", couleur: "text-blue-600", bg: "from-blue-500 to-cyan-500", border: "border-blue-200 bg-blue-50", risque: "Très faible", desc: "Très mince, risque minimal" },
  { max: 0.52, niveau: "Sain", couleur: "text-emerald-600", bg: "from-emerald-500 to-green-500", border: "border-emerald-200 bg-emerald-50", risque: "Faible", desc: "Sain, risque cardiovasculaire faible" },
  { max: 0.57, niveau: "Surpoids", couleur: "text-amber-600", bg: "from-amber-500 to-yellow-500", border: "border-amber-200 bg-amber-50", risque: "Modéré", desc: "Surpoids, risque cardiovasculaire modéré" },
  { max: 0.62, niveau: "Obésité", couleur: "text-orange-600", bg: "from-orange-500 to-amber-600", border: "border-orange-200 bg-orange-50", risque: "Élevé", desc: "Obésité, risque cardiovasculaire élevé" },
  { max: Infinity, niveau: "Obésité morbide", couleur: "text-red-800", bg: "from-red-700 to-red-500", border: "border-red-300 bg-red-100", risque: "Très élevé", desc: "Obésité morbide, risque très élevé" },
];

// Critères NHS UK 2022 pour femmes
const SEUILS_FEMMES = [
  { max: 0.42, niveau: "Sous-poids", couleur: "text-blue-600", bg: "from-blue-500 to-cyan-500", border: "border-blue-200 bg-blue-50", risque: "Très faible", desc: "Très mince, risque minimal" },
  { max: 0.48, niveau: "Sain", couleur: "text-emerald-600", bg: "from-emerald-500 to-green-500", border: "border-emerald-200 bg-emerald-50", risque: "Faible", desc: "Sain, risque cardiovasculaire faible" },
  { max: 0.53, niveau: "Surpoids", couleur: "text-amber-600", bg: "from-amber-500 to-yellow-500", border: "border-amber-200 bg-amber-50", risque: "Modéré", desc: "Surpoids, risque cardiovasculaire modéré" },
  { max: 0.57, niveau: "Obésité", couleur: "text-orange-600", bg: "from-orange-500 to-amber-600", border: "border-orange-200 bg-orange-50", risque: "Élevé", desc: "Obésité, risque cardiovasculaire élevé" },
  { max: Infinity, niveau: "Obésité morbide", couleur: "text-red-800", bg: "from-red-700 to-red-500", border: "border-red-300 bg-red-100", risque: "Très élevé", desc: "Obésité morbide, risque très élevé" },
];

// Pour enfants 5-18 ans: seuil universel 0.5
const SEUILS_ENFANTS = [
  { max: 0.45, niveau: "Sous-poids", couleur: "text-blue-600", bg: "from-blue-500 to-cyan-500", border: "border-blue-200 bg-blue-50", risque: "Très faible", desc: "Très mince" },
  { max: 0.5, niveau: "Sain", couleur: "text-emerald-600", bg: "from-emerald-500 to-green-500", border: "border-emerald-200 bg-emerald-50", risque: "Faible", desc: "Sain (≤ 0.5)" },
  { max: Infinity, niveau: "Surpoids/Obésité", couleur: "text-orange-600", bg: "from-orange-500 to-amber-600", border: "border-orange-200 bg-orange-50", risque: "Élevé", desc: "Risque augmenté (> 0.5)" },
];

function getSeuils(sexe: Sexe) {
  if (sexe === "enfant") return SEUILS_ENFANTS;
  if (sexe === "femme") return SEUILS_FEMMES;
  return SEUILS_HOMMES;
}

function getCategorieWthr(wthr: number, sexe: Sexe) {
  const seuils = getSeuils(sexe);
  return seuils.find((s) => wthr <= s.max) || seuils[seuils.length - 1];
}

export function calculerWthr(
  tourDeTailleCm: number,
  tailleCm: number,
  sexe: Sexe = "homme"
): ResultatWthr {
  const wthr = tailleCm > 0 ? tourDeTailleCm / tailleCm : 0;
  const categorie = getCategorieWthr(wthr, sexe);
  const ecartRegle05 = wthr - 0.5;
  const ecartRegle05Texte = ecartRegle05 < 0
    ? `${Math.abs(ecartRegle05).toFixed(2)} vs règle d'or`
    : `+${ecartRegle05.toFixed(2)} vs règle d'or`;

  return {
    wthr: Math.round(wthr * 10000) / 10000, // 4 décimales
    niveau: categorie.niveau,
    niveauCouleur: categorie.couleur,
    bgCouleur: categorie.bg,
    borderCouleur: categorie.border,
    niveauDescription: categorie.desc,
    risqueCardio: categorie.risque,
    ecartRegle05: Math.round(ecartRegle05 * 10000) / 10000,
    ecartRegle05Texte,
  };
}

export function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
