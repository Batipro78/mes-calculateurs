// Simulateur assurance emprunteur 2026
// Taux indicatifs du marche francais 2026

export type ProfilAge = "jeune" | "adulte" | "senior";
export type TypeProfil = "non-fumeur" | "fumeur";

export interface ParamsAssurance {
  capital: number; // montant emprunte en euros
  dureeAnnees: number;
  tauxBanque: number; // % annuel capital initial (ex: 0.40)
  tauxDelegation: number; // % annuel (ex: 0.15)
  quotiteCouverture: number; // 1 seule personne = 100, couple = 200
}

export interface ResultatAssurance {
  coutMensuelBanque: number;
  coutTotalBanque: number;
  coutMensuelDelegation: number;
  coutTotalDelegation: number;
  economieTotale: number;
  economieMensuelle: number;
  pctEconomie: number;
}

// Taux moyens 2026 par profil (pour affichage)
// Base : non-fumeur moyenne age 35-45
export const TAUX_BANQUE_MOYEN: Record<ProfilAge, Record<TypeProfil, number>> = {
  jeune:   { "non-fumeur": 0.34, "fumeur": 0.52 }, // 20-35 ans
  adulte:  { "non-fumeur": 0.40, "fumeur": 0.60 }, // 35-50 ans
  senior:  { "non-fumeur": 0.55, "fumeur": 0.80 }, // 50-65 ans
};

export const TAUX_DELEGATION_MOYEN: Record<ProfilAge, Record<TypeProfil, number>> = {
  jeune:   { "non-fumeur": 0.10, "fumeur": 0.20 },
  adulte:  { "non-fumeur": 0.15, "fumeur": 0.28 },
  senior:  { "non-fumeur": 0.25, "fumeur": 0.42 },
};

export function calculerAssurance(p: ParamsAssurance): ResultatAssurance {
  const qMult = p.quotiteCouverture / 100;

  // Cout annuel = capital × taux × quotite
  const coutAnnuelBanque = p.capital * (p.tauxBanque / 100) * qMult;
  const coutAnnuelDelegation = p.capital * (p.tauxDelegation / 100) * qMult;

  const coutTotalBanque = coutAnnuelBanque * p.dureeAnnees;
  const coutTotalDelegation = coutAnnuelDelegation * p.dureeAnnees;

  const coutMensuelBanque = coutAnnuelBanque / 12;
  const coutMensuelDelegation = coutAnnuelDelegation / 12;

  const economieTotale = coutTotalBanque - coutTotalDelegation;
  const economieMensuelle = coutMensuelBanque - coutMensuelDelegation;
  const pctEconomie = coutTotalBanque > 0 ? (economieTotale / coutTotalBanque) * 100 : 0;

  return {
    coutMensuelBanque,
    coutTotalBanque,
    coutMensuelDelegation,
    coutTotalDelegation,
    economieTotale,
    economieMensuelle,
    pctEconomie,
  };
}

export function fmtEur(n: number): string {
  return Math.round(n).toLocaleString("fr-FR") + " EUR";
}

export function fmtEur2(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " EUR";
}
