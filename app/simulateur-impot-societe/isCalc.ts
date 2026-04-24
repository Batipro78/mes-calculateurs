// Simulateur Impot sur les Societes (IS) 2026
// Bareme officiel : article 219 CGI

export interface ParamsIS {
  beneficeImposable: number; // en EUR
  eligibleTauxReduit: boolean; // PME : CA < 10M, capital libere, 75% personnes physiques
}

export interface ResultatIS {
  impotTrancheReduite: number;
  impotTrancheNormale: number;
  impotTotal: number;
  tauxEffectif: number; // %
  beneficeNet: number;
  detail: Array<{ tranche: string; taux: number; assiette: number; impot: number }>;
}

const SEUIL_TAUX_REDUIT = 42500; // plafond du taux reduit 15%
const TAUX_REDUIT = 0.15;
const TAUX_NORMAL = 0.25;

export function calculerIS(p: ParamsIS): ResultatIS {
  let impotTrancheReduite = 0;
  let impotTrancheNormale = 0;
  const detail: ResultatIS["detail"] = [];

  if (p.eligibleTauxReduit) {
    // Taux reduit 15% sur les 42 500 premiers EUR
    const assietteReduite = Math.min(p.beneficeImposable, SEUIL_TAUX_REDUIT);
    impotTrancheReduite = Math.max(0, assietteReduite) * TAUX_REDUIT;
    detail.push({
      tranche: `0 - ${SEUIL_TAUX_REDUIT.toLocaleString("fr-FR")} EUR (taux reduit PME)`,
      taux: 15,
      assiette: Math.max(0, assietteReduite),
      impot: impotTrancheReduite,
    });

    // Taux normal 25% au-dela
    const assietteNormale = Math.max(0, p.beneficeImposable - SEUIL_TAUX_REDUIT);
    impotTrancheNormale = assietteNormale * TAUX_NORMAL;
    if (assietteNormale > 0) {
      detail.push({
        tranche: `Au-dela de ${SEUIL_TAUX_REDUIT.toLocaleString("fr-FR")} EUR (taux normal)`,
        taux: 25,
        assiette: assietteNormale,
        impot: impotTrancheNormale,
      });
    }
  } else {
    // Taux normal 25% sur tout
    impotTrancheNormale = Math.max(0, p.beneficeImposable) * TAUX_NORMAL;
    detail.push({
      tranche: `Totalite du benefice (taux normal)`,
      taux: 25,
      assiette: Math.max(0, p.beneficeImposable),
      impot: impotTrancheNormale,
    });
  }

  const impotTotal = impotTrancheReduite + impotTrancheNormale;
  const tauxEffectif = p.beneficeImposable > 0 ? (impotTotal / p.beneficeImposable) * 100 : 0;
  const beneficeNet = p.beneficeImposable - impotTotal;

  return {
    impotTrancheReduite,
    impotTrancheNormale,
    impotTotal,
    tauxEffectif,
    beneficeNet,
    detail,
  };
}

export function fmtEur(n: number): string {
  return Math.round(n).toLocaleString("fr-FR") + " EUR";
}
