// Helper pour calcul VMA (Vitesse Maximale Aérobie) et zones cardiaques

export type MethodeTest = "cooper" | "demi-cooper" | "vameval" | "saisie-directe";

// Test Cooper 12 minutes : VMA = distance(m) / 200
export function calculerVMACooper(distanceM: number): number {
  if (distanceM <= 0) return 0;
  return Math.round((distanceM / 200) * 100) / 100;
}

// Test demi-Cooper 6 minutes : VMA = (distance(m) × 2) / 200
export function calculerVMADemiCooper(distanceM: number): number {
  if (distanceM <= 0) return 0;
  return Math.round(((distanceM * 2) / 200) * 100) / 100;
}

// Test VAMEVAL : VMA = vitesse moyenne en km/h (saisie directe via temps 1500m)
export function calculerVMAVameval(distance1500mM: number): number {
  if (distance1500mM <= 0) return 0;
  const vitesseKmh = (1.5 / distance1500mM) * 60;
  return Math.round(vitesseKmh * 100) / 100;
}

// FC max Tanaka (plus precise) : FC max = 208 - 0.7 × âge
export function calculerFCMaxTanaka(age: number): number {
  if (age <= 0 || age > 120) return 0;
  return Math.round(208 - 0.7 * age);
}

// FC max Astrand (classique) : FC max = 220 - âge
export function calculerFCMaxAstrand(age: number): number {
  if (age <= 0 || age > 120) return 0;
  return Math.round(220 - age);
}

// Calcul zone Karvonen : Zone = FC repos + (FC max - FC repos) × pourcent
export function calculerZoneKarvonen(
  fcMax: number,
  fcRepos: number,
  pourcentIntensité: number
): number {
  if (fcMax <= 0 || fcRepos < 0 || pourcentIntensité < 0) return 0;
  return Math.round(fcRepos + (fcMax - fcRepos) * (pourcentIntensité / 100));
}

// Calcul allure (min/km) selon % de VMA : allure = 60 / (vma × pourcent/100)
export function calculerAllureSelonPourcentVMA(
  vma: number,
  pourcentVMA: number
): { kmh: number; minKm: number } {
  if (vma <= 0 || pourcentVMA <= 0) return { kmh: 0, minKm: 0 };
  const kmh = (vma * pourcentVMA) / 100;
  const minKm = kmh > 0 ? 60 / kmh : 0;
  return {
    kmh: Math.round(kmh * 100) / 100,
    minKm: Math.round(minKm * 100) / 100,
  };
}

// Format allure décimale en MM:SS (ex: 5.5 → "5:30")
export function formatAllure(minutesDecimal: number): string {
  if (minutesDecimal <= 0) return "0:00";
  const minutes = Math.floor(minutesDecimal);
  const secondes = Math.round((minutesDecimal - minutes) * 60);
  return `${minutes}:${secondes.toString().padStart(2, "0")}`;
}

// Allure types d'entraînement
export const ALLURES_ENTRAINEMENT = [
  { nom: "Endurance fondamentale", minPourcent: 65, maxPourcent: 75 },
  { nom: "Endurance active", minPourcent: 75, maxPourcent: 85 },
  { nom: "Seuil aérobie", minPourcent: 85, maxPourcent: 90 },
  { nom: "Seuil anaérobie", minPourcent: 90, maxPourcent: 95 },
  { nom: "VMA pure (fractionné)", minPourcent: 100, maxPourcent: 110 },
];

// Zones FC Karvonen
export const ZONES_FC = [
  { zone: "Z1 (Récupération)", minPourcent: 50, maxPourcent: 60 },
  { zone: "Z2 (Endurance fondamentale)", minPourcent: 60, maxPourcent: 70 },
  { zone: "Z3 (Endurance active)", minPourcent: 70, maxPourcent: 80 },
  { zone: "Z4 (Seuil aérobie)", minPourcent: 80, maxPourcent: 90 },
  { zone: "Z5 (VO2max/VMA)", minPourcent: 90, maxPourcent: 100 },
];

// Formatter nombre français
export function fmt(n: number, digits = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}
