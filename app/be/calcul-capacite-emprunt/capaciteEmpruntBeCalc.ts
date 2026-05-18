// Capacite d'emprunt hypothecaire Belgique - calcul base sur taux endettement max 33%
// Sources : pratiques bancaires BE, taux marche Immotheker mai 2026

// Taux moyens marche BE pour calcul mensualite -> capital
export const TAUX_MOYENS_BE_EMPRUNT: Record<number, number> = {
  15: 3.0,
  20: 3.05,
  25: 3.25,
  30: 3.45,
};

// Plafond endettement legal en Belgique
export const TAUX_ENDETTEMENT_MAX = 0.33; // 33 % des revenus nets

export interface ResultatCapaciteBE {
  revenuMensuelNet: number;
  charges: number;
  mensualiteMax: number;
  duree: number;
  taux: number;
  capitalMax: number;
  prixMaxAvecApport: (apport: number) => number;
}

export function calculerCapaciteEmpruntBE(
  revenuMensuelNet: number,
  charges: number,
  dureeAnnees: number,
): ResultatCapaciteBE {
  const taux = TAUX_MOYENS_BE_EMPRUNT[dureeAnnees] ?? TAUX_MOYENS_BE_EMPRUNT[25];
  const tauxMensuel = taux / 100 / 12;
  const n = dureeAnnees * 12;

  // Mensualite max = 33 % (revenu net - charges existantes)
  const revenuDispo = Math.max(0, revenuMensuelNet - charges);
  const mensualiteMax = revenuDispo * TAUX_ENDETTEMENT_MAX;

  // Capital max = mensualite × (1 - (1+t)^-n) / t
  const capitalMax =
    tauxMensuel === 0
      ? mensualiteMax * n
      : (mensualiteMax * (1 - Math.pow(1 + tauxMensuel, -n))) / tauxMensuel;

  return {
    revenuMensuelNet,
    charges,
    mensualiteMax,
    duree: dureeAnnees,
    taux,
    capitalMax,
    prixMaxAvecApport: (apport: number) => capitalMax + apport,
  };
}
