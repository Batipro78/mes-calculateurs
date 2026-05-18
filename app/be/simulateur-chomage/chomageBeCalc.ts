// Calcul allocations chomage Belgique - Reforme mars 2026
// Sources : ONEM, reforme assurance chomage 2026, baremes officiels
// IMPORTANT : depuis le 1er mars 2026, duree max = 24 mois (12 base + 12 supplementaires selon passe pro)

// Plafond salaire brut journalier pris en compte par l'ONEM (2026)
const PLAFOND_BRUT_JOURNALIER = 92.00; // ~2 392 EUR/mois (26 jours)
const JOURS_PAR_MOIS = 26;
const PLAFOND_MENSUEL = PLAFOND_BRUT_JOURNALIER * JOURS_PAR_MOIS;

export type SituationFamilialeChomage = "isole" | "cohabitant-charge-famille" | "cohabitant-sans-charge";

export interface ResultatChomageBE {
  brutMensuel: number;
  brutPlafonne: number;
  situation: SituationFamilialeChomage;
  mois: number; // mois de chomage demande (1-24)
  tauxApplique: number; // %
  allocationMensuelle: number;
  totalSurDuree: number; // somme de toutes les allocations de mois 1 a mois `mois`
  phaseLabel: string;
}

// Taux d'allocation par phase (depuis reforme mars 2026)
function getTauxPhase(situation: SituationFamilialeChomage, mois: number): { taux: number; phase: string } {
  // Phase 1.1 : mois 1-3 = 65 % (tous statuts)
  if (mois <= 3) return { taux: 0.65, phase: "Phase 1 (mois 1-3)" };

  // Phase 1.2 : mois 4-12 = 60 % (chef de famille), 55-60 % autres
  if (mois <= 12) {
    if (situation === "cohabitant-charge-famille") return { taux: 0.60, phase: "Phase 2 (mois 4-12)" };
    return { taux: 0.55, phase: "Phase 2 (mois 4-12)" };
  }

  // Phase 2 (degressive) : mois 13-24 - degressivite progressive
  // Plus simple : on degresse lineairement de 55-60 % vers 40 % sur les mois 13-24
  const moisDeg = mois - 12; // 1 a 12
  const tauxInit = situation === "cohabitant-charge-famille" ? 0.55 : 0.50;
  const tauxFinal = 0.40;
  const taux = tauxInit - (tauxInit - tauxFinal) * (moisDeg / 12);
  return { taux, phase: "Phase 3 (degressive, mois 13-24)" };
}

export function calculerChomageBE(
  brutMensuel: number,
  situation: SituationFamilialeChomage,
  mois: number,
): ResultatChomageBE {
  const brutPlafonne = Math.min(Math.max(brutMensuel, 0), PLAFOND_MENSUEL);
  const moisClamp = Math.min(Math.max(mois, 1), 24);

  // Allocation au mois `mois`
  const { taux, phase } = getTauxPhase(situation, moisClamp);
  const allocationMensuelle = brutPlafonne * taux;

  // Total cumule sur tous les mois de 1 a `mois`
  let total = 0;
  for (let m = 1; m <= moisClamp; m++) {
    const { taux: t } = getTauxPhase(situation, m);
    total += brutPlafonne * t;
  }

  return {
    brutMensuel,
    brutPlafonne,
    situation,
    mois: moisClamp,
    tauxApplique: taux * 100,
    allocationMensuelle,
    totalSurDuree: total,
    phaseLabel: phase,
  };
}

export const PLAFOND_INFO = {
  journalier: PLAFOND_BRUT_JOURNALIER,
  mensuel: PLAFOND_MENSUEL,
  joursParMois: JOURS_PAR_MOIS,
};
