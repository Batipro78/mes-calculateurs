export interface DateHebraique {
  jour: number;
  mois: number;
  moisNom: string;
  moisHebreu: string;
  annee: number;
  saison: string;
  estEmbolismique: boolean;
}

export const MOIS_HEBRAIQUES: Array<{
  nom: string;
  hebreu: string;
  saison: string;
  ordre: number;
}> = [
  { nom: "Tichri", hebreu: "תשרי", saison: "Automne", ordre: 1 },
  { nom: "Heshvan", hebreu: "חשון", saison: "Automne", ordre: 2 },
  { nom: "Kislev", hebreu: "כסלו", saison: "Hiver", ordre: 3 },
  { nom: "Tevet", hebreu: "טבת", saison: "Hiver", ordre: 4 },
  { nom: "Shevat", hebreu: "שבט", saison: "Hiver", ordre: 5 },
  { nom: "Adar", hebreu: "אדר", saison: "Printemps", ordre: 6 },
  { nom: "Adar II", hebreu: "אדר ב", saison: "Printemps", ordre: 6 },
  { nom: "Nissan", hebreu: "ניסן", saison: "Printemps", ordre: 7 },
  { nom: "Iyar", hebreu: "אייר", saison: "Printemps", ordre: 8 },
  { nom: "Sivan", hebreu: "סיון", saison: "Été", ordre: 9 },
  { nom: "Tammouz", hebreu: "תמוז", saison: "Été", ordre: 10 },
  { nom: "Av", hebreu: "אב", saison: "Été", ordre: 11 },
  { nom: "Eloul", hebreu: "אלול", saison: "Été", ordre: 12 },
];

/**
 * Vérifie si une année hébraïque est embolismique (13 mois)
 * Cycle Meton : 7 années embolismiques sur 19 ans
 * Années embolismiques : 3, 6, 8, 11, 14, 17, 19 dans le cycle
 * Formule : (annee * 7 + 1) % 19 < 7
 */
export function estAnneeEmbolismique(annee: number): boolean {
  return ((annee * 7 + 1) % 19) < 7;
}

/**
 * Convertit une date grégorienne en date hébraïque
 * Utilise Intl.DateTimeFormat pour extraire composants hébraïques
 */
export function gregorienVersHebraique(date: Date): DateHebraique {
  const formatter = new Intl.DateTimeFormat("fr-FR-u-ca-hebrew", {
    calendar: "hebrew",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const parts = formatter.formatToParts(date);
  const values = Object.fromEntries(
    parts.map((p) => [p.type, parseInt(p.value, 10)])
  );

  const jour = values.day || 1;
  const moisNum = values.month || 1;
  const annee = values.year || 5000;

  // Déterminer l'index du mois
  // En année embolismique, Adar I existe (Adar normal devient Adar II)
  let moisIndex = moisNum - 1;
  const embolismique = estAnneeEmbolismique(annee);

  // Ajustement si année embolismique et mois > 6
  if (embolismique && moisNum > 6) {
    // En année embolismique : Adar I = 6, Adar II = 7, Nissan = 8, etc.
    // Si moisNum > 6, mapper à l'index correspondant (+1)
    moisIndex = Math.min(moisNum, MOIS_HEBRAIQUES.length - 1);
  } else if (!embolismique && moisNum > 6) {
    // En année normale, Adar = 6, Nissan = 7
    // moisNum = 7 (Nissan) → index = 7
    moisIndex = Math.min(moisNum, MOIS_HEBRAIQUES.length - 1);
  }

  const mois = MOIS_HEBRAIQUES[moisIndex] || MOIS_HEBRAIQUES[0];

  return {
    jour,
    mois: moisNum,
    moisNom: mois.nom,
    moisHebreu: mois.hebreu,
    annee,
    saison: mois.saison,
    estEmbolismique: embolismique,
  };
}

/**
 * Convertit une date hébraïque en date grégorienne
 * Utilise une recherche binaire via Intl pour trouver la date grégorienne correspondante
 */
export function hebraiqueVersGregorien(
  hAnnee: number,
  hMois: number,
  hJour: number
): Date {
  // Approximation initiale
  const ansEcoules = hAnnee - 5000;
  const ansGregoriens = Math.floor(ansEcoules * 0.96825); // Facteur moyen années lunaires
  const anneeApprox = 3761 + ansGregoriens;

  let dateApprox = new Date(anneeApprox, 0, 1);

  // Recherche binaire fine : chercher la date grégorienne qui matche exactement
  let minDiff = Infinity;
  let result = dateApprox;

  // Élargir la plage de recherche (±180 jours)
  for (let offset = -180; offset <= 180; offset++) {
    const testDate = new Date(dateApprox);
    testDate.setDate(testDate.getDate() + offset);

    const testHeb = gregorienVersHebraique(testDate);

    const diff =
      Math.abs(testHeb.annee - hAnnee) * 10000 +
      Math.abs(testHeb.mois - hMois) * 30 +
      Math.abs(testHeb.jour - hJour);

    if (diff < minDiff) {
      minDiff = diff;
      result = testDate;
      if (diff === 0) break;
    }
  }

  return result;
}

/**
 * Calcule l'âge en années hébraïques
 */
export function calculerAgeHebraique(dateNaissance: Date): {
  ans: number;
  mois: number;
  jours: number;
  ansGregorien: number;
} {
  const aujourd = new Date();
  const hebAujourd = gregorienVersHebraique(aujourd);
  const hebNaissance = gregorienVersHebraique(dateNaissance);

  let ans = hebAujourd.annee - hebNaissance.annee;
  let mois = hebAujourd.mois - hebNaissance.mois;
  let jours = hebAujourd.jour - hebNaissance.jour;

  if (jours < 0) {
    mois--;
    jours += 30; // Approximation
  }

  if (mois < 0) {
    ans--;
    mois += 12;
  }

  // Âge grégorien simple
  const ansGregorien = Math.floor(
    (aujourd.getTime() - dateNaissance.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  );

  return { ans, mois, jours, ansGregorien };
}

/**
 * Formate une date hébraïque en string lisible
 */
export function formatDateHebraique(heb: DateHebraique): string {
  return `${heb.jour} ${heb.moisNom} ${heb.annee}`;
}

/**
 * Retourne le nom du mois hébraïque à partir de l'index (0-12)
 */
export function getNomMoisHebraique(moisIndex: number): string {
  return MOIS_HEBRAIQUES[moisIndex]?.nom || "Mois inconnu";
}

/**
 * Retourne l'hébreu du mois à partir de l'index
 */
export function getHebreuMoisHebraique(moisIndex: number): string {
  return MOIS_HEBRAIQUES[moisIndex]?.hebreu || "?";
}

/**
 * Retourne les mois disponibles pour une année (13 ou 12)
 */
export function getMoisPourAnnee(annee: number): Array<{
  nom: string;
  hebreu: string;
  numero: number;
  saison: string;
}> {
  const embolismique = estAnneeEmbolismique(annee);
  if (embolismique) {
    return MOIS_HEBRAIQUES.map((m, i) => ({
      nom: m.nom,
      hebreu: m.hebreu,
      numero: i + 1,
      saison: m.saison,
    }));
  } else {
    // Année normale : pas d'Adar II
    return MOIS_HEBRAIQUES.filter((_, i) => i !== 6).map((m, i) => ({
      nom: m.nom,
      hebreu: m.hebreu,
      numero: i + 1,
      saison: m.saison,
    }));
  }
}
