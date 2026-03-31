// Bareme pension alimentaire — Table de reference du Ministere de la Justice 2025-2026

// Minimum vital (RSA socle personne seule)
export const MINIMUM_VITAL = 648;

// Pourcentages par enfant selon le type de garde
// Index 0 = 1 enfant, index 5 = 6 enfants
const TAUX_REDUIT = [0.180, 0.155, 0.133, 0.117, 0.106, 0.095];
const TAUX_CLASSIQUE = [0.135, 0.115, 0.100, 0.088, 0.080, 0.072];
const TAUX_ALTERNEE = [0.090, 0.078, 0.067, 0.059, 0.053, 0.048];

export type TypeGarde = "reduit" | "classique" | "alternee";

export const GARDE_LABELS: Record<TypeGarde, string> = {
  reduit: "Droit de visite reduit",
  classique: "Garde classique",
  alternee: "Garde alternee",
};

export function getTaux(enfants: number, garde: TypeGarde): number {
  const idx = Math.min(Math.max(enfants, 1), 6) - 1;
  if (garde === "reduit") return TAUX_REDUIT[idx];
  if (garde === "alternee") return TAUX_ALTERNEE[idx];
  return TAUX_CLASSIQUE[idx];
}

export interface ResultatPension {
  revenuNet: number;
  minimumVital: number;
  revenuDisponible: number;
  taux: number;
  enfants: number;
  garde: TypeGarde;
  pensionParEnfant: number;
  pensionTotale: number;
  resteAVivre: number;
}

export function calcPensionAlimentaire(
  revenuNet: number,
  enfants: number,
  garde: TypeGarde
): ResultatPension {
  const revenuDisponible = Math.max(0, revenuNet - MINIMUM_VITAL);
  const taux = getTaux(enfants, garde);
  const pensionParEnfant = revenuDisponible * taux;
  const pensionTotale = pensionParEnfant * enfants;
  const resteAVivre = revenuNet - pensionTotale;

  return {
    revenuNet,
    minimumVital: MINIMUM_VITAL,
    revenuDisponible,
    taux,
    enfants,
    garde,
    pensionParEnfant: Math.round(pensionParEnfant * 100) / 100,
    pensionTotale: Math.round(pensionTotale * 100) / 100,
    resteAVivre: Math.round(resteAVivre * 100) / 100,
  };
}
