// Helper pour conversion allure course à pied (min/km ↔ km/h ↔ min/mile)

export interface PredictionCourse {
  distance: string;
  km: number;
  tempsTotal: string;
  tempsMinutes: number;
}

// Allure en minutes décimales (ex: 5.5 = 5min30/km) vers km/h
export function allureMinKmVersKmh(minTotal: number): number {
  if (minTotal <= 0) return 0;
  return Math.round((60 / minTotal) * 100) / 100;
}

// km/h vers allure en minutes décimales par km
export function kmhVersAllureMinKm(kmh: number): number {
  if (kmh <= 0) return 0;
  return Math.round((60 / kmh) * 100) / 100;
}

// Allure min/km vers allure min/mile (conversion: 1 km = 0.621371 miles)
export function allureMinKmVersMinMile(minKm: number): number {
  // 1 mile = 1.609344 km, donc tempo pour 1 mile = minKm * 1.609344
  return Math.round(minKm * 1.609344 * 100) / 100;
}

// Format allure décimale en MM:SS (ex: 5.5 → "5:30")
export function formatAllure(minutesDecimal: number): string {
  if (minutesDecimal <= 0) return "0:00";
  const minutes = Math.floor(minutesDecimal);
  const secondes = Math.round((minutesDecimal - minutes) * 60);
  return `${minutes}:${secondes.toString().padStart(2, "0")}`;
}

// Parse allure en format MM:SS en minutes décimales (ex: "5:30" → 5.5)
export function parseAllure(str: string): number | null {
  const match = str.trim().match(/^(\d+):(\d{1,2})$/);
  if (!match) return null;
  const minutes = parseInt(match[1]);
  const secondes = parseInt(match[2]);
  if (secondes < 0 || secondes > 59) return null;
  return Math.round((minutes + secondes / 60) * 100) / 100;
}

// Format temps en secondes vers "1h25min30s" ou "45min12s"
export function formatTemps(totalSecondes: number): string {
  if (totalSecondes <= 0) return "0s";

  const heures = Math.floor(totalSecondes / 3600);
  const rest = totalSecondes % 3600;
  const minutes = Math.floor(rest / 60);
  const secondes = Math.round(rest % 60);

  let result = "";
  if (heures > 0) result += `${heures}h`;
  if (minutes > 0) result += `${minutes}min`;
  if (secondes > 0 || result === "") result += `${secondes}s`;

  return result;
}

// Prédire le temps sur une distance donnée (en km) avec une allure (min/km décimales)
export function predireTempsCourse(
  allureMinKmDec: number,
  distanceKm: number
): { totalMinutes: number; totalSecondes: number; formatte: string } {
  if (allureMinKmDec <= 0 || distanceKm <= 0) {
    return { totalMinutes: 0, totalSecondes: 0, formatte: "0s" };
  }

  const totalMinutes = allureMinKmDec * distanceKm;
  const totalSecondes = totalMinutes * 60;

  // Format en H:MM:SS ou MM:SS
  const heures = Math.floor(totalSecondes / 3600);
  const minRest = Math.floor((totalSecondes % 3600) / 60);
  const secRest = Math.round(totalSecondes % 60);

  let formatte = "";
  if (heures > 0) formatte += `${heures}h`;
  if (minRest > 0 || heures > 0) formatte += `${minRest}min`;
  if (secRest > 0 || formatte === "") formatte += `${secRest}s`;

  return { totalMinutes, totalSecondes, formatte };
}

// Distances courantes pour table de prédiction
export const DISTANCES_COURANTES = [
  { nom: "5 km", km: 5 },
  { nom: "10 km", km: 10 },
  { nom: "Semi-marathon", km: 21.0975 },
  { nom: "Marathon", km: 42.195 },
];

// Générer la table de prédictions pour une allure donnée
export function genererPredictions(allureMinKmDec: number): PredictionCourse[] {
  return DISTANCES_COURANTES.map((d) => {
    const { totalMinutes, formatte } = predireTempsCourse(
      allureMinKmDec,
      d.km
    );
    return {
      distance: d.nom,
      km: d.km,
      tempsTotal: formatte,
      tempsMinutes: totalMinutes,
    };
  });
}
