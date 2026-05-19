// Calcul date Bar/Bat Mitzvah (13 ans hébraïques garçon, 12 ans fille)
// Utilise Intl.DateTimeFormat avec calendrier hébraïque pour conversions grégorien ↔ hébraïque

export type Sexe = "garcon" | "fille";

export interface ResultatBarMitzvah {
  sexe: Sexe;
  ageRequis: number; // 13 ou 12
  dateNaissanceGregorien: Date;
  dateNaissanceHebraique: {
    jour: number;
    mois: string;
    annee: number;
  };
  dateBarMitzvahHebraique: {
    jour: number;
    mois: string;
    annee: number;
  };
  dateBarMitzvahGregorien: Date;
  joursAvant: number;
}

/**
 * Convertit une date grégorienne → composantes hébraïques via Intl.DateTimeFormat
 * Retourne { jour, mois, annee }
 */
export function gregorienVersHebraique(dateGregorien: Date): {
  jour: number;
  mois: string;
  annee: number;
} {
  const formatter = new Intl.DateTimeFormat("fr-FR-u-ca-hebrew", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const parts = formatter.formatToParts(dateGregorien);
  const jour = parseInt(
    parts.find((p) => p.type === "day")?.value || "1",
    10
  );
  const mois = parts.find((p) => p.type === "month")?.value || "Tishrei";
  const annee = parseInt(
    parts.find((p) => p.type === "year")?.value || "5786",
    10
  );

  return { jour, mois, annee };
}

/**
 * Approximation : convertit composantes hébraïques → date grégorienne
 * La conversion exacte hébraïque→grégorien est complexe.
 * Méthode : tester des dates grégoriennes proches jusqu'à trouver correspondance.
 *
 * Approche itérative (acceptable pour usage calculateur) :
 * - Partir d'une estimation grégorienne basée sur ratio années hébreu/grégorien
 * - Affiner par comparaison Intl jusqu'à match
 */
export function hebraiqueVersGregorien(
  jourHebraique: number,
  moisHebraique: string,
  anneeHebraique: number
): Date {
  // Ratio approximatif : 1 année hébraïque ≈ 0.9833 années grégoriennes
  // (365.25 jours grégorien vs ~354.37 jours luni-solaire hébreu)
  const anneeEstimee = Math.floor(anneeHebraique * 0.9833 - 3760);

  // Chercher le mois grégorien (map mois hébreu → estimé grégorien)
  // Tishrei (sept) → environ septembre, mais décalage selon année
  const moisHebreuMap: Record<string, number> = {
    tishrei: 9,
    heshvan: 10,
    kislev: 11,
    tevet: 12,
    shevat: 1,
    adar: 2,
    "adar i": 2,
    "adar ii": 3,
    nisan: 4,
    iyar: 5,
    sivan: 6,
    tammuz: 7,
    av: 8,
    elul: 9,
  };
  const moisEstime = moisHebreuMap[moisHebraique.toLowerCase()] || 1;

  // Créer date grégorienne estimée
  const dateEstimee = new Date(anneeEstimee, moisEstime - 1, jourHebraique);

  // Affiner par itération : tester ±30 jours jusqu'à trouver correspondance
  for (let offset = -30; offset <= 30; offset++) {
    const dateTest = new Date(dateEstimee);
    dateTest.setDate(dateTest.getDate() + offset);

    const hebraiqueTest = gregorienVersHebraique(dateTest);
    if (
      hebraiqueTest.jour === jourHebraique &&
      hebraiqueTest.mois.toLowerCase() === moisHebraique.toLowerCase() &&
      hebraiqueTest.annee === anneeHebraique
    ) {
      return dateTest;
    }
  }

  // Fallback (si pas de correspondance exacte trouvée)
  return dateEstimee;
}

/**
 * Calcule la date de Bar/Bat Mitzvah
 * @param dateNaissance Date de naissance grégorienne
 * @param sexe "garcon" (13 ans) ou "fille" (12 ans)
 */
export function calculerBarMitzvah(
  dateNaissance: Date,
  sexe: Sexe
): ResultatBarMitzvah {
  const ageRequis = sexe === "garcon" ? 13 : 12;

  // Convertir naissance grégorienne → hébraïque
  const naisHebraique = gregorienVersHebraique(dateNaissance);

  // Ajouter l'âge requis à l'année hébraïque
  const anneeBarMitzvahHebraique = naisHebraique.annee + ageRequis;

  // La date hébraïque Bar/Bat Mitzvah = même jour/mois hébreu, année future
  const dateBarMitzvahHebraique = {
    jour: naisHebraique.jour,
    mois: naisHebraique.mois,
    annee: anneeBarMitzvahHebraique,
  };

  // Convertir cette date hébraïque → grégorienne
  const dateBarMitzvahGregorien = hebraiqueVersGregorien(
    dateBarMitzvahHebraique.jour,
    dateBarMitzvahHebraique.mois,
    dateBarMitzvahHebraique.annee
  );

  // Calculer jours avant (aujourd'hui)
  const aujourd = new Date();
  aujourd.setHours(0, 0, 0, 0);
  const diff =
    dateBarMitzvahGregorien.getTime() - aujourd.getTime();
  const joursAvant = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return {
    sexe,
    ageRequis,
    dateNaissanceGregorien: dateNaissance,
    dateNaissanceHebraique: naisHebraique,
    dateBarMitzvahHebraique,
    dateBarMitzvahGregorien,
    joursAvant,
  };
}

/**
 * Formate une date grégorienne en FR (ex: "lundi 5 avril 2026")
 */
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
