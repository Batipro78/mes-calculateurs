// Calcul cout garde enfant 2026 — Baremes CAF, CMG, credit impot

export type ModeGarde = "creche" | "assmat" | "domicile" | "microcreche";

export const MODE_LABELS: Record<ModeGarde, string> = {
  creche: "Creche municipale / privee",
  assmat: "Assistante maternelle",
  domicile: "Garde a domicile",
  microcreche: "Micro-creche",
};

export const MODE_EMOJIS: Record<ModeGarde, string> = {
  creche: "🏫",
  assmat: "👩‍🍼",
  domicile: "🏠",
  microcreche: "🧒",
};

// Taux d'effort creche CAF 2026 par nombre d'enfants a charge
const TAUX_EFFORT: Record<number, number> = {
  1: 0.000619,
  2: 0.000516,
  3: 0.000413,
  4: 0.000310,
  5: 0.000310,
  6: 0.000310,
};

// Plancher et plafond revenus mensuels pour creche
const REVENU_PLANCHER = 801;
const REVENU_PLAFOND = 8500;

// Tarifs horaires moyens
const TARIF_ASSMAT = 4.91; // tarif reference Etat 2026
const TARIF_DOMICILE_BRUT = 12.51; // salaire min brut/h
const TARIF_MICROCRECHE = 8.50; // moyenne

// CMG max cotisations (emploi direct, enfant 0-3 ans)
const CMG_MAX_COTISATIONS = 517;

// Credit impot
const PLAFOND_CREDIT_IMPOT_HORS_DOMICILE = 3500; // par enfant/an
const PLAFOND_CREDIT_IMPOT_DOMICILE = 12000; // base annuelle
const TAUX_CREDIT_IMPOT = 0.5;

export interface ResultatGarde {
  mode: ModeGarde;
  tarifHoraire: number;
  coutMensuelBrut: number;
  coutAnnuelBrut: number;
  cmgMensuel: number;
  creditImpotAnnuel: number;
  coutMensuelNet: number;
  coutAnnuelNet: number;
  heuresMois: number;
  nbEnfants: number;
  revenuMensuel: number;
}

// Calcul tarif horaire creche
export function calcTarifCreche(revenuAnnuel: number, nbEnfants: number): number {
  const revenuMensuel = Math.max(REVENU_PLANCHER, Math.min(REVENU_PLAFOND, revenuAnnuel / 12));
  const taux = TAUX_EFFORT[Math.min(nbEnfants, 6)] || TAUX_EFFORT[1];
  const tarif = taux * revenuAnnuel / 12;
  return Math.max(0.50, Math.min(5.26, Math.round(tarif * 100) / 100));
}

// Estimation CMG mensuel simplifie
function estimerCMG(mode: ModeGarde, coutMensuel: number, revenuAnnuel: number, ageEnfant: number): number {
  if (mode === "creche") return 0; // creche = pas de CMG (tarif CAF directement)
  if (ageEnfant >= 6) return 0;

  // CMG simplifie : couvre une partie des cotisations
  // Plus les revenus sont bas, plus le CMG est eleve
  const revenuMensuel = revenuAnnuel / 12;
  let tauxCouverture: number;
  if (revenuMensuel <= 2000) tauxCouverture = 0.85;
  else if (revenuMensuel <= 3500) tauxCouverture = 0.60;
  else if (revenuMensuel <= 5000) tauxCouverture = 0.40;
  else tauxCouverture = 0.25;

  // Pour enfants 3-6 ans, CMG reduit de moitie
  if (ageEnfant >= 3) tauxCouverture *= 0.5;

  const cmg = Math.min(CMG_MAX_COTISATIONS, coutMensuel * tauxCouverture);
  return Math.round(cmg * 100) / 100;
}

// Credit d'impot annuel
function calcCreditImpot(mode: ModeGarde, coutAnnuelNet: number, nbEnfantsGardes: number): number {
  let plafond: number;
  if (mode === "domicile") {
    plafond = PLAFOND_CREDIT_IMPOT_DOMICILE;
  } else {
    plafond = PLAFOND_CREDIT_IMPOT_HORS_DOMICILE * nbEnfantsGardes;
  }
  const base = Math.min(coutAnnuelNet, plafond);
  return Math.round(base * TAUX_CREDIT_IMPOT * 100) / 100;
}

export function calcGardeEnfant(
  mode: ModeGarde,
  revenuAnnuel: number,
  nbEnfants: number,
  nbEnfantsGardes: number,
  heuresParSemaine: number,
  ageEnfant: number
): ResultatGarde {
  const heuresMois = Math.round(heuresParSemaine * 52 / 12);
  const revenuMensuel = revenuAnnuel / 12;

  // Tarif horaire selon le mode
  let tarifHoraire: number;
  switch (mode) {
    case "creche":
      tarifHoraire = calcTarifCreche(revenuAnnuel, nbEnfants);
      break;
    case "assmat":
      tarifHoraire = TARIF_ASSMAT;
      break;
    case "domicile":
      // Cout total employeur (brut + charges ~45%)
      tarifHoraire = TARIF_DOMICILE_BRUT * 1.45;
      break;
    case "microcreche":
      tarifHoraire = TARIF_MICROCRECHE;
      break;
  }

  const coutMensuelBrut = Math.round(tarifHoraire * heuresMois * 100) / 100;
  const coutAnnuelBrut = Math.round(coutMensuelBrut * 12 * 100) / 100;

  // CMG
  const cmgMensuel = estimerCMG(mode, coutMensuelBrut, revenuAnnuel, ageEnfant);

  // Cout apres CMG
  const coutAnnuelApresCMG = Math.max(0, coutAnnuelBrut - cmgMensuel * 12);

  // Credit impot
  const creditImpotAnnuel = calcCreditImpot(mode, coutAnnuelApresCMG, nbEnfantsGardes);

  const coutAnnuelNet = Math.max(0, coutAnnuelApresCMG - creditImpotAnnuel);
  const coutMensuelNet = Math.round(coutAnnuelNet / 12 * 100) / 100;

  return {
    mode,
    tarifHoraire: Math.round(tarifHoraire * 100) / 100,
    coutMensuelBrut,
    coutAnnuelBrut,
    cmgMensuel,
    creditImpotAnnuel,
    coutMensuelNet,
    coutAnnuelNet: Math.round(coutAnnuelNet * 100) / 100,
    heuresMois,
    nbEnfants,
    revenuMensuel: Math.round(revenuMensuel),
  };
}

export const MODES: ModeGarde[] = ["creche", "assmat", "domicile", "microcreche"];
