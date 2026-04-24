// Allocations Familiales CAF 2026 — Bareme base 2025, ajuste 2026

// --- Plafonds de ressources annuelles (2 enfants a charge) ---
export const PLAFOND_TRANCHE_1 = 74966; // revenus < 74 966 EUR
export const PLAFOND_TRANCHE_2 = 99922; // revenus 74 966 - 99 922 EUR
// Au-dela = tranche 3

// Les plafonds augmentent de 6 631 EUR par enfant supplementaire au-dela de 2
export const MAJORATION_PLAFOND_PAR_ENFANT = 6631;

// --- Montants mensuels allocations familiales ---
// Tranche 1 (revenus les plus bas)
export const AF_2_ENFANTS_T1 = 141.99;
export const AF_3_ENFANTS_T1 = 323.91;
export const AF_PAR_ENFANT_SUP_T1 = 181.92;
export const MAJORATION_14_ANS_T1 = 71.00;

// Tranche 2 (revenus moyens)
export const AF_2_ENFANTS_T2 = 71.00;
export const AF_3_ENFANTS_T2 = 161.96;
export const AF_PAR_ENFANT_SUP_T2 = 90.96;
export const MAJORATION_14_ANS_T2 = 35.50;

// Tranche 3 (revenus eleves)
export const AF_2_ENFANTS_T3 = 35.50;
export const AF_3_ENFANTS_T3 = 80.98;
export const AF_PAR_ENFANT_SUP_T3 = 45.48;
export const MAJORATION_14_ANS_T3 = 17.75;

// --- Complement familial ---
export const COMPLEMENT_FAMILIAL = 172.77; // mensuel, sous conditions

// --- Allocation de Rentree Scolaire (ARS) — montants annuels ---
export const ARS_6_10 = 416.40;
export const ARS_11_14 = 439.38;
export const ARS_15_18 = 454.60;

// Plafonds de ressources ARS (approximatifs, famille avec 1 enfant)
export const ARS_PLAFOND_BASE = 26637; // 1 enfant
export const ARS_PLAFOND_PAR_ENFANT = 6157; // par enfant supplementaire

// --- Interfaces ---
export interface FamilleConfig {
  nombreEnfants: number;
  agesEnfants: number[];
  revenuAnnuel: number;
  situation: "couple" | "seul";
}

export interface DetailEnfant {
  age: number;
  ars: number;
  majoration: number;
}

export interface ResultatAllocation {
  allocationsFamiliales: number; // mensuel
  complementFamilial: number; // mensuel
  allocationRentreeScolaire: number; // annuel total
  totalMensuel: number;
  totalAnnuel: number;
  detailParEnfant: DetailEnfant[];
  trancheRevenus: string;
}

// --- Determine la tranche de revenus ---
function getTranche(revenuAnnuel: number, nombreEnfants: number): number {
  const enfantsSup = Math.max(0, nombreEnfants - 2);
  const plafond1 = PLAFOND_TRANCHE_1 + enfantsSup * MAJORATION_PLAFOND_PAR_ENFANT;
  const plafond2 = PLAFOND_TRANCHE_2 + enfantsSup * MAJORATION_PLAFOND_PAR_ENFANT;

  if (revenuAnnuel <= plafond1) return 1;
  if (revenuAnnuel <= plafond2) return 2;
  return 3;
}

function getTrancheLabel(tranche: number, nombreEnfants: number): string {
  const enfantsSup = Math.max(0, nombreEnfants - 2);
  const p1 = PLAFOND_TRANCHE_1 + enfantsSup * MAJORATION_PLAFOND_PAR_ENFANT;
  const p2 = PLAFOND_TRANCHE_2 + enfantsSup * MAJORATION_PLAFOND_PAR_ENFANT;

  if (tranche === 1) return `Tranche 1 (revenus < ${p1.toLocaleString("fr-FR")} EUR)`;
  if (tranche === 2) return `Tranche 2 (${p1.toLocaleString("fr-FR")} - ${p2.toLocaleString("fr-FR")} EUR)`;
  return `Tranche 3 (revenus > ${p2.toLocaleString("fr-FR")} EUR)`;
}

// --- Calcul allocations familiales mensuelles ---
function calcAllocFamiliales(nombreEnfants: number, agesEnfants: number[], tranche: number): {
  base: number;
  majorations: number;
  majorationsParEnfant: number[];
} {
  if (nombreEnfants < 2) return { base: 0, majorations: 0, majorationsParEnfant: [] };

  // Montants selon tranche
  const montants = {
    1: {
      base2: AF_2_ENFANTS_T1, base3: AF_3_ENFANTS_T1,
      sup: AF_PAR_ENFANT_SUP_T1, maj: MAJORATION_14_ANS_T1,
    },
    2: {
      base2: AF_2_ENFANTS_T2, base3: AF_3_ENFANTS_T2,
      sup: AF_PAR_ENFANT_SUP_T2, maj: MAJORATION_14_ANS_T2,
    },
    3: {
      base2: AF_2_ENFANTS_T3, base3: AF_3_ENFANTS_T3,
      sup: AF_PAR_ENFANT_SUP_T3, maj: MAJORATION_14_ANS_T3,
    },
  }[tranche as 1 | 2 | 3]!;

  const enfantsSup = Math.max(0, nombreEnfants - 3);
  const baseAF = nombreEnfants === 2 ? montants.base2 : montants.base3;
  const base = baseAF + enfantsSup * montants.sup;
  const majParEnfant = montants.maj;

  // Majorations pour enfants > 14 ans (sauf l'aine si seulement 2 enfants)
  const majorationsParEnfant: number[] = [];
  let totalMaj = 0;

  // Trier les ages pour identifier l'aine
  const agesTries = [...agesEnfants].sort((a, b) => b - a);
  const ageAine = agesTries[0] || 0;

  for (let i = 0; i < agesEnfants.length; i++) {
    const age = agesEnfants[i];
    // Majoration: enfant > 14 ans, SAUF l'aine quand il n'y a que 2 enfants
    if (age >= 14 && !(nombreEnfants === 2 && age === ageAine)) {
      majorationsParEnfant.push(majParEnfant);
      totalMaj += majParEnfant;
    } else {
      majorationsParEnfant.push(0);
    }
  }

  return { base, majorations: totalMaj, majorationsParEnfant };
}

// --- Calcul complement familial ---
function calcComplementFamilial(
  nombreEnfants: number,
  agesEnfants: number[],
  revenuAnnuel: number,
  situation: "couple" | "seul"
): number {
  // Conditions: 3+ enfants, tous entre 3 et 21 ans
  if (nombreEnfants < 3) return 0;

  const tousEligibles = agesEnfants.every((age) => age >= 3 && age <= 21);
  if (!tousEligibles) return 0;

  // Plafond de ressources (simplifie)
  const plafondBase = situation === "couple" ? 42800 : 37000;
  const plafondTotal = plafondBase + (nombreEnfants - 3) * 5200;

  if (revenuAnnuel > plafondTotal) return 0;

  return COMPLEMENT_FAMILIAL;
}

// --- Calcul ARS ---
function calcARS(age: number): number {
  if (age >= 6 && age <= 10) return ARS_6_10;
  if (age >= 11 && age <= 14) return ARS_11_14;
  if (age >= 15 && age <= 18) return ARS_15_18;
  return 0;
}

function isEligibleARS(revenuAnnuel: number, nombreEnfants: number): boolean {
  const plafond = ARS_PLAFOND_BASE + (nombreEnfants - 1) * ARS_PLAFOND_PAR_ENFANT;
  return revenuAnnuel <= plafond;
}

// --- Fonction principale ---
export function calculerAllocations(config: FamilleConfig): ResultatAllocation {
  const { nombreEnfants, agesEnfants, revenuAnnuel, situation } = config;

  // Pas d'enfants = pas d'allocations
  if (nombreEnfants === 0 || agesEnfants.length === 0) {
    return {
      allocationsFamiliales: 0,
      complementFamilial: 0,
      allocationRentreeScolaire: 0,
      totalMensuel: 0,
      totalAnnuel: 0,
      detailParEnfant: [],
      trancheRevenus: "Aucun enfant a charge",
    };
  }

  const tranche = getTranche(revenuAnnuel, nombreEnfants);
  const trancheLabel = getTrancheLabel(tranche, nombreEnfants);

  // Allocations familiales
  const af = calcAllocFamiliales(nombreEnfants, agesEnfants, tranche);
  const afMensuel = Math.round((af.base + af.majorations) * 100) / 100;

  // Complement familial
  const cf = calcComplementFamilial(nombreEnfants, agesEnfants, revenuAnnuel, situation);

  // ARS par enfant
  const eligibleARS = isEligibleARS(revenuAnnuel, nombreEnfants);
  const detailParEnfant: DetailEnfant[] = agesEnfants.map((age, i) => ({
    age,
    ars: eligibleARS ? calcARS(age) : 0,
    majoration: af.majorationsParEnfant[i] || 0,
  }));

  const totalARS = detailParEnfant.reduce((sum, d) => sum + d.ars, 0);

  const totalMensuel = Math.round((afMensuel + cf) * 100) / 100;
  const totalAnnuel = Math.round((totalMensuel * 12 + totalARS) * 100) / 100;

  return {
    allocationsFamiliales: afMensuel,
    complementFamilial: cf,
    allocationRentreeScolaire: totalARS,
    totalMensuel,
    totalAnnuel,
    detailParEnfant,
    trancheRevenus: trancheLabel,
  };
}

// --- Calcul par tranche (pour tableau comparatif) ---
export function calculerParTranche(nombreEnfants: number, agesEnfants: number[]): {
  tranche1: number;
  tranche2: number;
  tranche3: number;
} {
  if (nombreEnfants < 2) return { tranche1: 0, tranche2: 0, tranche3: 0 };

  const r1 = calcAllocFamiliales(nombreEnfants, agesEnfants, 1);
  const r2 = calcAllocFamiliales(nombreEnfants, agesEnfants, 2);
  const r3 = calcAllocFamiliales(nombreEnfants, agesEnfants, 3);

  return {
    tranche1: Math.round((r1.base + r1.majorations) * 100) / 100,
    tranche2: Math.round((r2.base + r2.majorations) * 100) / 100,
    tranche3: Math.round((r3.base + r3.majorations) * 100) / 100,
  };
}
