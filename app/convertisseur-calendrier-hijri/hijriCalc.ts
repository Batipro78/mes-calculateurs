export type MethodeHijri = "tic" | "umm-al-qura";

export interface DateHijri {
  jour: number;
  mois: number;
  moisNom: string;
  annee: number;
}

export const MOIS_HIJRI: Array<{ nom: string; arabe: string; jours: number; sacre: boolean }> = [
  { nom: "Mouharram", arabe: "محرّم", jours: 30, sacre: true },
  { nom: "Safar", arabe: "صفر", jours: 29, sacre: false },
  { nom: "Rabi' al-Awwal", arabe: "ربيع الأول", jours: 30, sacre: false },
  { nom: "Rabi' al-Thani", arabe: "ربيع الثاني", jours: 29, sacre: false },
  { nom: "Joumada al-Oula", arabe: "جمادى الأولى", jours: 30, sacre: false },
  { nom: "Joumada al-Thania", arabe: "جمادى الثانية", jours: 29, sacre: false },
  { nom: "Rajab", arabe: "رجب", jours: 30, sacre: true },
  { nom: "Cha'ban", arabe: "شعبان", jours: 29, sacre: false },
  { nom: "Ramadan", arabe: "رمضان", jours: 30, sacre: false },
  { nom: "Chawwal", arabe: "شوّال", jours: 29, sacre: false },
  { nom: "Dhou al-Qa'da", arabe: "ذو القعدة", jours: 30, sacre: true },
  { nom: "Dhou al-Hijja", arabe: "ذو الحجة", jours: 30, sacre: true },
];

/**
 * Convertit une date grégorienne en date hijri
 * Utilise Intl.DateTimeFormat pour extraire composants hijri
 */
export function gregorienVersHijri(date: Date, methode: MethodeHijri): DateHijri {
  const calId = methode === "umm-al-qura" ? "islamic-umalqura" : "islamic";
  const formatter = new Intl.DateTimeFormat("ar-SA", {
    calendar: calId,
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const parts = formatter.formatToParts(date);
  const values = Object.fromEntries(
    parts.map((p) => [p.type, parseInt(p.value, 10)])
  );

  const moisIndex = (values.month || 1) - 1;
  return {
    jour: values.day || 1,
    mois: values.month || 1,
    moisNom: MOIS_HIJRI[moisIndex]?.nom || "Mois inconnu",
    annee: values.year || 1,
  };
}

/**
 * Convertit une date hijri en date grégorienne
 * Utilise l'algorithme de Fatoohi inversé + ajustement par Intl pour précision
 */
export function hijriVersGregorien(
  hAnnee: number,
  hMois: number,
  hJour: number,
  methode: MethodeHijri
): Date {
  // Algorithme Fatoohi inversé (approximation TIC)
  // Précision : ±1-2 jours. Umm al-Qura sera proche mais pas identique
  const jdn =
    Math.floor((11 * hAnnee + 3) / 30) +
    354 * hAnnee +
    30 * hMois -
    Math.floor((hMois - 1) / 2) +
    hJour +
    1948440 -
    385;

  // Convertir JDN en grégorien
  const a = jdn + 32044;
  const b = (4 * a + 3) / 146097;
  const c = a - Math.floor((146097 * b) / 4);
  const d = (4 * c + 3) / 1461;
  const e = c - Math.floor((1461 * d) / 4);
  const m = (5 * e + 2) / 153;

  const jour = e - Math.floor((153 * m + 2) / 5) + 1;
  const mois = m + 3 - 12 * Math.floor((m + 9) / 12);
  const annee = 100 * b + d - 4800 + Math.floor((m + 9) / 12);

  const dateApprox = new Date(annee, mois - 1, jour);

  // Ajustement fin via recherche binaire si méthode spécifique
  // Chercher la date grégorienne qui matche exactement la hijri cible
  let result = dateApprox;
  let minDiff = Infinity;

  for (let offset = -2; offset <= 2; offset++) {
    const testDate = new Date(dateApprox);
    testDate.setDate(testDate.getDate() + offset);
    const testHijri = gregorienVersHijri(testDate, methode);

    const diff =
      Math.abs(testHijri.annee - hAnnee) * 1000 +
      Math.abs(testHijri.mois - hMois) * 30 +
      Math.abs(testHijri.jour - hJour);

    if (diff < minDiff) {
      minDiff = diff;
      result = testDate;
      if (diff === 0) break; // Correspondance exacte trouvée
    }
  }

  return result;
}

/**
 * Calcule l'âge en années hijri (lunaires)
 * Année hijri = 354 jours (11 jours de moins que l'année grégorienne)
 */
export function calculerAgeHijri(dateNaissance: Date): {
  ans: number;
  mois: number;
  jours: number;
  ansGregorien: number;
} {
  const aujourd = new Date();
  const hijriAujourd = gregorienVersHijri(aujourd, "tic");
  const hijriNaissance = gregorienVersHijri(dateNaissance, "tic");

  let ans = hijriAujourd.annee - hijriNaissance.annee;
  let mois = hijriAujourd.mois - hijriNaissance.mois;
  let jours = hijriAujourd.jour - hijriNaissance.jour;

  if (jours < 0) {
    mois--;
    jours += 30; // Approximation, sinon calculer jours du mois précédent
  }

  if (mois < 0) {
    ans--;
    mois += 12;
  }

  // Calcul âge grégorien simple pour comparaison
  const ansGregorien =
    Math.floor((aujourd.getTime() - dateNaissance.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

  return { ans, mois, jours, ansGregorien };
}

/**
 * Formate une date hijri en string lisible
 */
export function formatDateHijri(hijri: DateHijri): string {
  return `${hijri.jour} ${hijri.moisNom} ${hijri.annee} AH`;
}

/**
 * Retourne le nom du mois hijri à partir de l'index (0-11)
 */
export function getNomMoisHijri(moisIndex: number): string {
  return MOIS_HIJRI[moisIndex]?.nom || "Mois inconnu";
}

/**
 * Retourne l'arabisé du mois hijri à partir de l'index (0-11)
 */
export function getArabeMoisHijri(moisIndex: number): string {
  return MOIS_HIJRI[moisIndex]?.arabe || "?";
}

/**
 * Vérifie si un mois hijri est sacré
 */
export function estMoisSacre(moisIndex: number): boolean {
  return MOIS_HIJRI[moisIndex]?.sacre || false;
}
