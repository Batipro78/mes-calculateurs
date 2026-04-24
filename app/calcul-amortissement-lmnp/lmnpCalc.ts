// Calcul amortissement LMNP (Location Meublee Non Professionnelle) - regime reel
// Source : BOI-BIC-AMT-20-40, plan comptable general

export interface ParamsLMNP {
  prixBienTotal: number; // prix d'acquisition avec frais de notaire
  valeurTerrain: number; // non amortissable, souvent 10-20% du prix
  valeurMobilier: number; // amortissable sur plus courte duree
  dureeAmortBien: number; // annees (25-40, moyenne 30)
  dureeAmortMobilier: number; // annees (5-10, moyenne 7)
  loyersAnnuelsHT: number;
  chargesDeductibles: number; // taxe fonciere, copro, interets emprunt, assurance, etc.
  tmi: number; // tranche marginale imposition en %
}

export interface ResultatLMNP {
  valeurAmortissableBien: number;
  amortissementBienAnnuel: number;
  amortissementMobilierAnnuel: number;
  amortissementTotalAnnuel: number;
  resultatImposableAvantAmort: number;
  resultatImposableApresAmort: number;
  economieImpot: number; // via amortissement
  cashFlowNetApresImpot: number;
  impotSansLMNP: number; // si regime micro-BIC
  impotAvecLMNPReel: number;
  gainRegimeReel: number;
  dureeAmortissementRestante: number;
}

const PRELEVEMENTS_SOCIAUX = 17.2;
const ABATTEMENT_MICRO_BIC = 0.5; // 50% d'abattement forfaitaire sur les loyers

export function calculerLMNP(p: ParamsLMNP): ResultatLMNP {
  const valeurAmortissableBien = Math.max(0, p.prixBienTotal - p.valeurTerrain - p.valeurMobilier);
  const amortissementBienAnnuel = valeurAmortissableBien / p.dureeAmortBien;
  const amortissementMobilierAnnuel = p.valeurMobilier / p.dureeAmortMobilier;
  const amortissementTotalAnnuel = amortissementBienAnnuel + amortissementMobilierAnnuel;

  const resultatImposableAvantAmort = Math.max(0, p.loyersAnnuelsHT - p.chargesDeductibles);
  // LMNP reel : amortissement deduit jusqu'a concurrence du benefice (ne peut creer de deficit)
  const amortissementUtilise = Math.min(amortissementTotalAnnuel, resultatImposableAvantAmort);
  const resultatImposableApresAmort = resultatImposableAvantAmort - amortissementUtilise;

  const tauxFiscalGlobal = (p.tmi + PRELEVEMENTS_SOCIAUX) / 100;
  const impotAvecLMNPReel = resultatImposableApresAmort * tauxFiscalGlobal;

  // Comparaison micro-BIC : abattement 50% puis imposition TMI + PS
  const baseMicroBic = p.loyersAnnuelsHT * (1 - ABATTEMENT_MICRO_BIC);
  const impotSansLMNP = baseMicroBic * tauxFiscalGlobal;

  const economieImpot = amortissementUtilise * tauxFiscalGlobal;
  const gainRegimeReel = impotSansLMNP - impotAvecLMNPReel;

  const cashFlowNetApresImpot = p.loyersAnnuelsHT - p.chargesDeductibles - impotAvecLMNPReel;

  return {
    valeurAmortissableBien,
    amortissementBienAnnuel,
    amortissementMobilierAnnuel,
    amortissementTotalAnnuel,
    resultatImposableAvantAmort,
    resultatImposableApresAmort,
    economieImpot,
    cashFlowNetApresImpot,
    impotSansLMNP,
    impotAvecLMNPReel,
    gainRegimeReel,
    dureeAmortissementRestante: p.dureeAmortBien,
  };
}

export function fmtEur(n: number): string {
  return Math.round(n).toLocaleString("fr-FR") + " EUR";
}
