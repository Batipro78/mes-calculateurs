export const TAUX_NORMAL = 0.25;
export const TAUX_REDUIT_PME = 0.20;
export const SEUIL_TAUX_REDUIT = 100000;
export const REMUNERATION_MIN_DIRIGEANT = 50000;

export interface ResultatISOC {
  beneficeImposable: number;
  estPME: boolean;
  impotTotal: number;
  tauxEffectif: number;
  economiePME: number;
}

export function calculerISOC(
  benefice: number,
  estPME: boolean
): ResultatISOC {
  const beneficeImposable = Math.max(0, benefice);

  let impotTotal: number;

  if (estPME && beneficeImposable <= SEUIL_TAUX_REDUIT) {
    // Taux réduit PME 20% sur la totalité
    impotTotal = beneficeImposable * TAUX_REDUIT_PME;
  } else if (estPME && beneficeImposable > SEUIL_TAUX_REDUIT) {
    // Taux réduit 20% sur 100 000, taux normal 25% au-delà
    impotTotal =
      SEUIL_TAUX_REDUIT * TAUX_REDUIT_PME +
      (beneficeImposable - SEUIL_TAUX_REDUIT) * TAUX_NORMAL;
  } else {
    // Taux normal 25%
    impotTotal = beneficeImposable * TAUX_NORMAL;
  }

  const impotNormal = beneficeImposable * TAUX_NORMAL;
  const economiePME = estPME ? impotNormal - impotTotal : 0;
  const tauxEffectif =
    beneficeImposable > 0 ? impotTotal / beneficeImposable : 0;

  return {
    beneficeImposable,
    estPME,
    impotTotal,
    tauxEffectif,
    economiePME,
  };
}
