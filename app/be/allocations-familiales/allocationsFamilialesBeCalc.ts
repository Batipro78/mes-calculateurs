export type RegionBE = "wallonie" | "flandre" | "bruxelles";

export const PRIME_NAISSANCE: Record<RegionBE, number> = {
  wallonie: 1100,
  bruxelles: 1100,
  flandre: 1144,
};

export interface ResultatAllocations {
  region: RegionBE;
  nbEnfants: number;
  ageEnfants: number[];
  montantParEnfant: number[];
  montantMensuel: number;
  montantAnnuel: number;
  primeNaissance: number;
  primeNaissanceTotal: number;
}

export function calculerAllocationsBE(
  region: RegionBE,
  ageEnfants: number[]
): ResultatAllocations {
  const nbEnfants = ageEnfants.length;
  const montantParEnfant: number[] = [];
  let montantMensuel = 0;

  if (region === "wallonie") {
    // Rang 1-2 : 167,68 EUR, Rang 3+ : 250,93 EUR
    for (let i = 0; i < nbEnfants; i++) {
      if (i < 2) {
        montantParEnfant.push(167.68);
      } else {
        montantParEnfant.push(250.93);
      }
    }
  } else if (region === "flandre") {
    // Par âge : 0-5 ans : 173,55 EUR, 6-11 ans : 194,57 EUR, 12-17 ans : 248,74 EUR
    for (const age of ageEnfants) {
      if (age <= 5) {
        montantParEnfant.push(173.55);
      } else if (age <= 11) {
        montantParEnfant.push(194.57);
      } else {
        montantParEnfant.push(248.74);
      }
    }
  } else if (region === "bruxelles") {
    // Uniforme 167,68 EUR par enfant
    for (let i = 0; i < nbEnfants; i++) {
      montantParEnfant.push(167.68);
    }
  }

  montantMensuel = montantParEnfant.reduce((a, b) => a + b, 0);

  const primeNaissance = PRIME_NAISSANCE[region];
  const primeNaissanceTotal = primeNaissance * nbEnfants;

  return {
    region,
    nbEnfants,
    ageEnfants,
    montantParEnfant,
    montantMensuel,
    montantAnnuel: montantMensuel * 12,
    primeNaissance,
    primeNaissanceTotal,
  };
}
