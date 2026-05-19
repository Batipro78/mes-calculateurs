// Helper pour conversion allure natation (min/100m ↔ km/h ↔ vitesse)

export type Mode = "allure" | "vitesse" | "swolf";

export interface ResultatAllure {
  alluremin100m: number; // ex 1.75 = 1:45
  alluremin100mFormatte: string; // "1:45"
  vitesseKmh: number;
  predictions: { distance: number; distanceLabel: string; temps: string }[];
}

export interface ResultatSWOLF {
  swolf: number;
  niveau: string;
  niveauCouleur: string;
}

// Format allure décimale en MM:SS (ex: 1.75 → "1:45")
export function formatAllureNatation(minutesDecimal: number): string {
  if (minutesDecimal <= 0) return "0:00";
  const minutes = Math.floor(minutesDecimal);
  const secondes = Math.round((minutesDecimal - minutes) * 60);
  return `${minutes}:${secondes.toString().padStart(2, "0")}`;
}

// Parse allure en format MM:SS en minutes décimales (ex: "1:45" → 1.75)
export function parseAllureNatation(str: string): number | null {
  const match = str.trim().match(/^(\d+):(\d{1,2})$/);
  if (!match) return null;
  const minutes = parseInt(match[1]);
  const secondes = parseInt(match[2]);
  if (secondes < 0 || secondes > 59) return null;
  return Math.round((minutes + secondes / 60) * 100) / 100;
}

// Allure min/100m vers vitesse km/h
// Formule : (60 / allure_min_par_100m) × 0.1 = km/h
export function allureVersVitesse(alluremin100m: number): number {
  if (alluremin100m <= 0) return 0;
  return Math.round(((60 / alluremin100m) * 0.1) * 100) / 100;
}

// Vitesse km/h vers allure min/100m
// Formule : 60 / (km/h × 10) = min/100m
export function vitesseVersAllure(kmh: number): number {
  if (kmh <= 0) return 0;
  return Math.round((60 / (kmh * 10)) * 100) / 100;
}

// Prédire le temps sur une distance donnée (en mètres) avec une allure (min/100m décimales)
export function predireTempsNatation(
  alluremin100m: number,
  distanceM: number
): string {
  if (alluremin100m <= 0 || distanceM <= 0) return "0s";

  // Temps en minutes : alluremin100m * (distance / 100)
  const tempsMinutes = alluremin100m * (distanceM / 100);
  const totalSecondes = tempsMinutes * 60;

  // Format en H:MM:SS ou MM:SS
  const heures = Math.floor(totalSecondes / 3600);
  const minRest = Math.floor((totalSecondes % 3600) / 60);
  const secRest = Math.round(totalSecondes % 60);

  let formatte = "";
  if (heures > 0) formatte += `${heures}h`;
  if (minRest > 0 || heures > 0) formatte += `${minRest}min`;
  if (secRest > 0 || formatte === "") formatte += `${secRest}s`;

  return formatte;
}

// Distances courantes pour table de prédiction (en mètres)
export const DISTANCES_COURANTES = [
  { distance: 200, label: "200m" },
  { distance: 400, label: "400m" },
  { distance: 800, label: "800m" },
  { distance: 1500, label: "1500m (piscine)" },
  { distance: 1900, label: "1900m (Half Ironman)" },
  { distance: 3000, label: "3000m" },
  { distance: 3800, label: "3800m (Ironman)" },
  { distance: 10000, label: "10km (eau libre)" },
];

// Générer la table de prédictions pour une allure donnée
export function genererPredictions(
  alluremin100m: number
): ResultatAllure["predictions"] {
  return DISTANCES_COURANTES.map((d) => ({
    distance: d.distance,
    distanceLabel: d.label,
    temps: predireTempsNatation(alluremin100m, d.distance),
  }));
}

// Calculer SWOLF score : temps 25m (secondes) + nombre de coups
export function calculerSWOLF(
  temps25mSec: number,
  nbCoups: number
): ResultatSWOLF {
  const swolf = Math.round(temps25mSec) + nbCoups;

  let niveau = "";
  let niveauCouleur = "";

  if (swolf <= 35) {
    niveau = "Elite";
    niveauCouleur = "from-red-500 to-orange-600"; // or gold
  } else if (swolf <= 45) {
    niveau = "Avancé";
    niveauCouleur = "from-blue-500 to-cyan-600";
  } else if (swolf <= 55) {
    niveau = "Intermédiaire";
    niveauCouleur = "from-emerald-500 to-teal-600";
  } else if (swolf <= 65) {
    niveau = "Débutant entraîné";
    niveauCouleur = "from-yellow-500 to-amber-600";
  } else {
    niveau = "Débutant";
    niveauCouleur = "from-slate-500 to-slate-600";
  }

  return { swolf, niveau, niveauCouleur };
}

// Allures de référence natation (min/100m décimales)
export const ALLURES_REFERENCE = [
  1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5,
]; // 1:00 à 2:30
