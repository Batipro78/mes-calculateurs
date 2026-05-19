export type ImportanceFete = "majeure" | "secondaire";
export type TypeFete = "mobile" | "fixe";

export interface Fete {
  nom: string;
  date: Date;
  type: TypeFete;
  importance: ImportanceFete;
  description: string;
}

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

export function premierDimancheAvent(annee: number): Date {
  const noel = new Date(annee, 11, 25);
  const jourSemaineNoel = noel.getDay();
  const decompte = jourSemaineNoel === 0 ? 28 : 21 + jourSemaineNoel;
  const avent = new Date(annee, 11, 25 - decompte);
  return avent;
}

export function formatDateFR(date: Date): string {
  const jours = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  const mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  const dayName = jours[date.getDay()];
  const dayNum = date.getDate();
  const monthName = mois[date.getMonth()];
  const year = date.getFullYear();
  return `${dayName} ${dayNum} ${monthName} ${year}`;
}

export function formatDateCourte(date: Date): string {
  const moisAbbr = ["jan", "fév", "mar", "avr", "mai", "juin", "juil", "août", "sep", "oct", "nov", "déc"];
  return `${date.getDate()} ${moisAbbr[date.getMonth()]}`;
}

export function getFetesAnnee(annee: number): Fete[] {
  const paques = paquesGregorien(annee);
  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const fetesMobiles: Fete[] = [
    { nom: "Mercredi des Cendres", date: addDays(paques, -46), type: "mobile", importance: "majeure", description: "Début du Carême" },
    { nom: "Dimanche des Rameaux", date: addDays(paques, -7), type: "mobile", importance: "majeure", description: "Entrée de Jésus à Jérusalem" },
    { nom: "Jeudi Saint", date: addDays(paques, -3), type: "mobile", importance: "majeure", description: "Dernière Cène" },
    { nom: "Vendredi Saint", date: addDays(paques, -2), type: "mobile", importance: "majeure", description: "Crucifixion du Christ" },
    { nom: "Samedi Saint", date: addDays(paques, -1), type: "mobile", importance: "secondaire", description: "Vigile pascale" },
    { nom: "Pâques", date: paques, type: "mobile", importance: "majeure", description: "Résurrection du Christ" },
    { nom: "Lundi de Pâques", date: addDays(paques, 1), type: "mobile", importance: "secondaire", description: "Lendemain de Pâques" },
    { nom: "Ascension", date: addDays(paques, 39), type: "mobile", importance: "majeure", description: "Ascension de Jésus aux cieux" },
    { nom: "Pentecôte", date: addDays(paques, 49), type: "mobile", importance: "majeure", description: "Descente de l&apos;Esprit Saint" },
    { nom: "Lundi de Pentecôte", date: addDays(paques, 50), type: "mobile", importance: "secondaire", description: "Lendemain de la Pentecôte" },
    { nom: "Sainte-Trinité", date: addDays(paques, 56), type: "mobile", importance: "secondaire", description: "Fête de la Sainte-Trinité" },
    { nom: "Fête-Dieu", date: addDays(paques, 60), type: "mobile", importance: "majeure", description: "Solennité du Corps du Christ" },
    { nom: "Sacré-Cœur", date: addDays(paques, 68), type: "mobile", importance: "secondaire", description: "Fête du Sacré-Cœur de Jésus" },
    { nom: "1er Avent", date: premierDimancheAvent(annee), type: "mobile", importance: "majeure", description: "Premier dimanche de l&apos;Avent" },
    { nom: "Christ-Roi", date: addDays(premierDimancheAvent(annee), -7), type: "mobile", importance: "majeure", description: "Dimanche du Christ-Roi" },
  ];

  const fetesFixes: Fete[] = [
    { nom: "Sainte Marie Mère de Dieu", date: new Date(annee, 0, 1), type: "fixe", importance: "majeure", description: "1er janvier" },
    { nom: "Épiphanie", date: new Date(annee, 0, 6), type: "fixe", importance: "majeure", description: "Manifestation du Seigneur (6 janvier)" },
    { nom: "Chandeleur", date: new Date(annee, 1, 2), type: "fixe", importance: "secondaire", description: "Présentation du Seigneur (2 février)" },
    { nom: "Annonciation", date: new Date(annee, 2, 25), type: "fixe", importance: "majeure", description: "Annonciation à Marie (25 mars)" },
    { nom: "Saint Jean-Baptiste", date: new Date(annee, 5, 24), type: "fixe", importance: "majeure", description: "Nativité de Saint Jean-Baptiste (24 juin)" },
    { nom: "Saints Pierre et Paul", date: new Date(annee, 5, 29), type: "fixe", importance: "majeure", description: "Fête des Apôtres Pierre et Paul (29 juin)" },
    { nom: "Assomption", date: new Date(annee, 7, 15), type: "fixe", importance: "majeure", description: "Assomption de Marie (15 août)" },
    { nom: "Toussaint", date: new Date(annee, 10, 1), type: "fixe", importance: "majeure", description: "Solennité de tous les saints (1er novembre)" },
    { nom: "Jour des Défunts", date: new Date(annee, 10, 2), type: "fixe", importance: "majeure", description: "Commémoration des défunts (2 novembre)" },
    { nom: "Immaculée Conception", date: new Date(annee, 11, 8), type: "fixe", importance: "majeure", description: "Immaculée Conception (8 décembre)" },
    { nom: "Noël", date: new Date(annee, 11, 25), type: "fixe", importance: "majeure", description: "Nativité du Seigneur (25 décembre)" },
    { nom: "Saint-Étienne", date: new Date(annee, 11, 26), type: "fixe", importance: "secondaire", description: "Martyre de Saint-Étienne (26 décembre)" },
  ];

  return [...fetesMobiles, ...fetesFixes].sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function getProchaineFete(annee: number = new Date().getFullYear()): { fete: Fete | null; joursRestants: number } {
  const maintenant = new Date();
  maintenant.setHours(0, 0, 0, 0);
  let fetes = getFetesAnnee(annee);
  let prochaine = fetes.find((f) => f.date >= maintenant);
  if (!prochaine) {
    fetes = getFetesAnnee(annee + 1);
    prochaine = fetes[0];
  }
  if (!prochaine) return { fete: null, joursRestants: 0 };
  const diff = prochaine.date.getTime() - maintenant.getTime();
  const joursRestants = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return { fete: prochaine, joursRestants };
}
