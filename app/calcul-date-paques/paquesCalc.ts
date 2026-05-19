// Calcul date de Pâques et fêtes chrétiennes mobiles
// Algorithme Meeus/Jones/Butcher pour calendrier grégorien
// Algorithme julien pour Pâques orthodoxe

export type Tradition = "catholique" | "orthodoxe";

export interface FetesAnnee {
  annee: number;
  tradition: Tradition;
  cendres: Date;
  rameaux: Date;
  jeudiSaint: Date;
  vendrediSaint: Date;
  samediSaint: Date;
  paques: Date;
  lundiPaques: Date;
  ascension: Date;
  pentecote: Date;
  lundiPentecote: Date;
  trinite: Date;
  feteDieu: Date;
  sacreCoeur: Date;
}

// Pâques grégorienne (catholique/protestante) — Meeus/Jones/Butcher
export function paquesGregorien(Y: number): Date {
  const a = Y % 19;
  const b = Math.floor(Y / 100);
  const c = Y % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mois = Math.floor((h + l - 7 * m + 114) / 31);
  const jour = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Y, mois - 1, jour);
}

// Pâques orthodoxe (calendrier julien + 13 jours pour 1900-2099)
export function paquesOrthodoxe(Y: number): Date {
  const a = Y % 4;
  const b = Y % 7;
  const c = Y % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const moisJ = Math.floor((d + e + 114) / 31);
  const jourJ = ((d + e + 114) % 31) + 1;
  const julien = new Date(Y, moisJ - 1, jourJ);
  julien.setDate(julien.getDate() + 13); // Décalage grégorien pour 1900-2099
  return julien;
}

// Obtenir toutes les fêtes de l'année
export function getFetesAnnee(
  annee: number,
  tradition: Tradition
): FetesAnnee {
  const paques =
    tradition === "catholique" ? paquesGregorien(annee) : paquesOrthodoxe(annee);

  // Fonction helper pour ajouter/soustraire des jours
  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  return {
    annee,
    tradition,
    cendres: addDays(paques, -46),
    rameaux: addDays(paques, -7),
    jeudiSaint: addDays(paques, -3),
    vendrediSaint: addDays(paques, -2),
    samediSaint: addDays(paques, -1),
    paques,
    lundiPaques: addDays(paques, 1),
    ascension: addDays(paques, 39),
    pentecote: addDays(paques, 49),
    lundiPentecote: addDays(paques, 50),
    trinite: addDays(paques, 56),
    feteDieu: addDays(paques, 60),
    sacreCoeur: addDays(paques, 68),
  };
}

// Formater une date en FR (ex: "dimanche 5 avril 2026")
export function formatDateFR(date: Date): string {
  const jours = [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ];
  const mois = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const dayName = jours[date.getDay()];
  const dayNum = date.getDate();
  const monthName = mois[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName} ${dayNum} ${monthName} ${year}`;
}

// Formater une date courte (ex: "5 avr")
export function formatDateCourte(date: Date): string {
  const moisAbbr = [
    "jan",
    "fév",
    "mar",
    "avr",
    "mai",
    "juin",
    "juil",
    "août",
    "sep",
    "oct",
    "nov",
    "déc",
  ];
  return `${date.getDate()} ${moisAbbr[date.getMonth()]}`;
}

// Calculer jours restants jusqu'à Pâques
export function joursAvantPaques(annee: number = new Date().getFullYear()): {
  jours: number;
  datesPaques: { catholique: Date; orthodoxe: Date };
} {
  const aujourd = new Date();
  aujourd.setHours(0, 0, 0, 0);

  const paquesCath = paquesGregorien(annee);
  const paquesOrtho = paquesOrthodoxe(annee);

  // Chercher la prochaine Pâques (catholique)
  let cible = paquesCath;
  if (cible < aujourd) {
    cible = paquesGregorien(annee + 1);
  }

  const diff = cible.getTime() - aujourd.getTime();
  const jours = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return {
    jours,
    datesPaques: {
      catholique: paquesCath,
      orthodoxe: paquesOrtho,
    },
  };
}
