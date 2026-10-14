// Calcul de l'allocation d'aide au retour a l'emploi (ARE), regles Unedic en vigueur
// au 14 octobre 2026. Utilise par le simulateur, par les pages [params] et par le
// script des visuels (scripts/visuels/chomage-*.mjs).
//
// Sources (unedic.org) :
//   - Quel sera le montant de mon allocation chomage ? (formules, minimum, plafond 75 % du SJR, maximum)
//   - Allocation d'aide au retour a l'emploi (ARE) (tableau par salaire, degressivite, durees)
//   - Duree d'indemnisation (coefficient 0,75, durees maximales par age)
//   - Pas de revalorisation au 1er juillet 2026 : partie fixe 13,18 EUR et minimum 32,13 EUR maintenus
//   - Ce qui change le 1er septembre 2026 (rupture conventionnelle : 15 mois / 20,5 mois)

export const PART_FIXE = 13.18; // EUR par jour, partie fixe de l'ARE
export const TAUX_FORMULE_1 = 0.404; // 40,4 % du SJR + partie fixe
export const TAUX_FORMULE_2 = 0.57; // 57 % du SJR
export const PLAFOND_TAUX_SJR = 0.75; // l'allocation ne peut pas depasser 75 % du SJR
export const ARE_MINIMALE = 32.13; // EUR par jour
export const ARE_MAXIMALE = 300.21; // EUR brut par jour
export const SEUIL_DEGRESSIVITE = 92.57; // EUR par jour : au-dela, -30 % a partir du 7e mois (moins de 55 ans)
export const TAUX_DEGRESSIVITE = 0.3;
export const JOURS_AVANT_DEGRESSIVITE = 182; // 6 mois d'indemnisation
export const COEFFICIENT_DUREE = 0.75;
export const JOURS_PAR_MOIS = 365 / 12; // 730 jours = 24 mois
export const DUREE_MIN_JOURS = 182;

// Durees maximales en jours calendaires (apres coefficient 0,75)
export const DUREE_MAX_MOINS_55 = 548; // 18 mois
export const DUREE_MAX_55_56 = 685; // 22,5 mois
export const DUREE_MAX_57_PLUS = 822; // 27 mois
// Rupture conventionnelle individuelle, fin de contrat a partir du 1er septembre 2026 (metropole)
export const DUREE_MAX_RC_MOINS_55 = 456; // 15 mois
export const DUREE_MAX_RC_55_PLUS = 624; // 20,5 mois

export interface ResultatARE {
  sjr: number;
  joursReference: number;
  formule1: number; // 57 % du SJR
  formule2: number; // 40,4 % du SJR + partie fixe
  areJour: number;
  areMois: number; // 30 jours
  tauxRemplacement: number;
  dureeJours: number;
  dureeMois: number;
  dureeMaxJours: number;
  droitOuvert: boolean; // au moins 6 mois travailles
  isDegressif: boolean;
  areJourApresDegressivite: number;
  montantTotal: number;
}

export function dureeMaxJours(age: number, ruptureConventionnelle = false): number {
  if (ruptureConventionnelle) return age < 55 ? DUREE_MAX_RC_MOINS_55 : DUREE_MAX_RC_55_PLUS;
  if (age < 55) return DUREE_MAX_MOINS_55;
  if (age < 57) return DUREE_MAX_55_56;
  return DUREE_MAX_57_PLUS;
}

// Hypothese du simulateur : salaire brut identique chaque mois, emploi continu.
// Le SJR est alors le salaire d'un mois divise par 30,4167 jours (365 / 12).
export function calculerARE(
  salaireBrutMensuel: number,
  moisTravailles: number,
  age: number,
  ruptureConventionnelle = false,
): ResultatARE {
  const periodeMax = age >= 55 ? 36 : 24;
  const mois = Math.min(Math.max(moisTravailles, 0), periodeMax);
  const joursReference = mois * JOURS_PAR_MOIS;
  const sjr = joursReference > 0 ? (salaireBrutMensuel * mois) / joursReference : 0;

  const formule1 = sjr * TAUX_FORMULE_2;
  const formule2 = sjr * TAUX_FORMULE_1 + PART_FIXE;
  const plafondSjr = sjr * PLAFOND_TAUX_SJR;
  let areJour = Math.max(formule1, formule2);
  areJour = Math.min(areJour, plafondSjr);
  // Le minimum ne s'applique pas quand 75 % du SJR est deja plus bas que lui.
  areJour = Math.max(areJour, Math.min(ARE_MINIMALE, plafondSjr));
  areJour = Math.min(areJour, ARE_MAXIMALE);
  if (sjr <= 0) areJour = 0;
  // L'allocation journaliere est arrondie au centime avant toute multiplication.
  areJour = Math.round(areJour * 100) / 100;

  const dureeMax = dureeMaxJours(age, ruptureConventionnelle);
  const dureeBrute = Math.round(joursReference * COEFFICIENT_DUREE);
  const droitOuvert = mois >= 6;
  const dureeJours = droitOuvert ? Math.min(Math.max(dureeBrute, DUREE_MIN_JOURS), dureeMax) : 0;

  const isDegressif = age < 55 && areJour > SEUIL_DEGRESSIVITE;
  const areJourApresDegressivite = isDegressif
    ? Math.round(Math.max(areJour * (1 - TAUX_DEGRESSIVITE), SEUIL_DEGRESSIVITE) * 100) / 100
    : areJour;

  let montantTotal = areJour * dureeJours;
  if (isDegressif && dureeJours > JOURS_AVANT_DEGRESSIVITE) {
    montantTotal =
      areJour * JOURS_AVANT_DEGRESSIVITE +
      areJourApresDegressivite * (dureeJours - JOURS_AVANT_DEGRESSIVITE);
  }

  const areMois = Math.round(areJour * 30 * 100) / 100;
  return {
    sjr,
    joursReference,
    formule1,
    formule2,
    areJour,
    areMois,
    tauxRemplacement: salaireBrutMensuel > 0 ? (areMois / salaireBrutMensuel) * 100 : 0,
    dureeJours,
    dureeMois: dureeJours / JOURS_PAR_MOIS,
    dureeMaxJours: dureeMax,
    droitOuvert,
    isDegressif,
    areJourApresDegressivite,
    montantTotal,
  };
}
