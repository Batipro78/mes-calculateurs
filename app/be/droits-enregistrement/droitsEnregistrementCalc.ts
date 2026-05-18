// Calcul des droits d'enregistrement immobilier en Belgique
// Sources : SPF Finances, regions Wallonie / Flandre / Bruxelles. Baremes en vigueur 2026.

export type RegionBE = "wallonie" | "flandre" | "bruxelles";

export interface ResultatDroits {
  region: RegionBE;
  prixAchat: number;
  habitationUnique: boolean;
  tauxApplique: number; // en %
  abattementApplique: number; // EUR
  droitsEnregistrement: number; // EUR
  baseTaxable: number; // EUR
}

// Calcule les droits d'enregistrement selon la region et le statut "habitation propre et unique"
export function calculerDroitsEnregistrement(
  region: RegionBE,
  prixAchat: number,
  habitationUnique: boolean,
): ResultatDroits {
  if (prixAchat <= 0) {
    return {
      region,
      prixAchat: 0,
      habitationUnique,
      tauxApplique: 0,
      abattementApplique: 0,
      droitsEnregistrement: 0,
      baseTaxable: 0,
    };
  }

  let tauxApplique: number;
  let abattementApplique = 0;

  if (region === "wallonie") {
    if (habitationUnique) {
      tauxApplique = 3;
      abattementApplique = 20000; // 1ere tranche exoneree
    } else {
      tauxApplique = 12.5;
    }
  } else if (region === "flandre") {
    if (habitationUnique) {
      tauxApplique = 2;
    } else {
      tauxApplique = 12;
    }
  } else {
    // bruxelles
    if (habitationUnique) {
      tauxApplique = 12.5;
      abattementApplique = 200000; // 1ere tranche exoneree (sous conditions)
    } else {
      tauxApplique = 12.5;
    }
  }

  const baseTaxable = Math.max(0, prixAchat - abattementApplique);
  const droitsEnregistrement = baseTaxable * (tauxApplique / 100);

  return {
    region,
    prixAchat,
    habitationUnique,
    tauxApplique,
    abattementApplique,
    droitsEnregistrement,
    baseTaxable,
  };
}
