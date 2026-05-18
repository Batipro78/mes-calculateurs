// Coefficients Renard (méthode officielle Belgique)
export const COEFFICIENTS_RENARD = [
  { ageMin: 0, ageMax: 1, coef: 0.1371 },
  { ageMin: 2, ageMax: 3, coef: 0.15 },
  { ageMin: 4, ageMax: 5, coef: 0.165 },
  { ageMin: 6, ageMax: 7, coef: 0.18 },
  { ageMin: 8, ageMax: 9, coef: 0.195 },
  { ageMin: 10, ageMax: 11, coef: 0.21 },
  { ageMin: 12, ageMax: 13, coef: 0.22 },
  { ageMin: 14, ageMax: 15, coef: 0.24 },
  { ageMin: 16, ageMax: 17, coef: 0.255 },
  { ageMin: 18, ageMax: 100, coef: 0.2695 },
];

export function getCoefficientPourAge(age: number): number {
  const found = COEFFICIENTS_RENARD.find(
    (c) => age >= c.ageMin && age <= c.ageMax
  );
  return found?.coef ?? 0.2695; // Default 18+ si age invalide
}

export interface ResultatPension {
  revenusP1: number;
  revenusP2: number;
  age: number;
  nbEnfants: number;
  coutEnfantTotal: number;
  partP1: number;
  partP2: number;
  pensionAVerser: number;
  plafondTiers: number;
  deductionFiscale: number;
  coefficientRenard: number;
}

export function calculerPensionAlimentaireBE(
  revenusP1: number,
  revenusP2: number,
  age: number,
  nbEnfants: number,
  gardeChezP1: boolean = true
): ResultatPension {
  const coefficient = getCoefficientPourAge(age);

  // 1. Coût total enfant (pour 1 enfant, puis x nbEnfants simplifié)
  const revenus = revenusP1 + revenusP2;
  const coutUnEnfant = revenus * coefficient;
  const coutEnfantTotal = coutUnEnfant * nbEnfants;

  // 2. Part P1 et P2
  let partP1 = 0;
  let partP2 = 0;

  if (revenus > 0) {
    partP1 = coutEnfantTotal * (revenusP1 / revenus);
    partP2 = coutEnfantTotal - partP1;
  }

  // 3. Pension à verser (par le parent sans garde principale)
  let pensionAVerser = gardeChezP1 ? partP2 : partP1;

  // 4. Plafond 1/3
  const debiteur = gardeChezP1 ? revenusP2 : revenusP1;
  const plafondTiers = debiteur / 3;

  // Appliquer le plafond 1/3
  if (pensionAVerser > plafondTiers) {
    pensionAVerser = plafondTiers;
  }

  // 5. Déduction fiscale (80%)
  const deductionFiscale = pensionAVerser * 0.8;

  return {
    revenusP1,
    revenusP2,
    age,
    nbEnfants,
    coutEnfantTotal,
    partP1,
    partP2,
    pensionAVerser,
    plafondTiers,
    deductionFiscale,
    coefficientRenard: coefficient,
  };
}
