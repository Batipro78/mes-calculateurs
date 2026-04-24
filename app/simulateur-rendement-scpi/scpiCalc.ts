// Simulateur rendement SCPI 2026
// Source : ASPIM (Association francaise des SCPI) - TDVM moyen 2025 = 4,52%

export interface ParamsSCPI {
  montantInvesti: number;
  tdvm: number; // Taux de distribution sur valeur de marche, % par an
  fraisEntree: number; // % du montant investi
  fraisGestion: number; // % deja deduit du TDVM (affiche pour info)
  tmi: number; // tranche marginale d'imposition du foyer, %
  dureeAnnees: number;
  revalorisationAnnuelle: number; // % revalorisation parts, ~1% moyen
}

export interface ResultatSCPI {
  montantNet: number; // apres frais d'entree
  revenuBrutAnnuel: number;
  revenuAnnuelNetImpots: number;
  revenuMensuelNet: number;
  revenuTotalNetSurDuree: number;
  impotsTotauxSurDuree: number;
  plusValuePotentielle: number;
  capitalFinal: number; // parts revalorisees
  rendementNetAnnuel: number; // rendement % apres frais & impots
}

const PRELEVEMENTS_SOCIAUX = 17.2; // %

export function calculerSCPI(p: ParamsSCPI): ResultatSCPI {
  // Frais d'entree deduits du montant reellement investi en parts
  const montantNet = p.montantInvesti * (1 - p.fraisEntree / 100);

  // Revenu brut annuel (TDVM applique sur montant net)
  const revenuBrutAnnuel = montantNet * (p.tdvm / 100);

  // Fiscalite : revenus fonciers = TMI + 17,2% PS
  const tauxFiscalGlobal = (p.tmi + PRELEVEMENTS_SOCIAUX) / 100;
  const impotsAnnuels = revenuBrutAnnuel * tauxFiscalGlobal;
  const revenuAnnuelNetImpots = revenuBrutAnnuel - impotsAnnuels;

  const revenuMensuelNet = revenuAnnuelNetImpots / 12;

  // Cumul sur la duree
  const revenuTotalNetSurDuree = revenuAnnuelNetImpots * p.dureeAnnees;
  const impotsTotauxSurDuree = impotsAnnuels * p.dureeAnnees;

  // Plus-value potentielle par revalorisation des parts
  const capitalFinal = montantNet * Math.pow(1 + p.revalorisationAnnuelle / 100, p.dureeAnnees);
  const plusValuePotentielle = capitalFinal - montantNet;

  // Rendement net annualise
  const rendementNetAnnuel = (revenuAnnuelNetImpots / p.montantInvesti) * 100;

  return {
    montantNet,
    revenuBrutAnnuel,
    revenuAnnuelNetImpots,
    revenuMensuelNet,
    revenuTotalNetSurDuree,
    impotsTotauxSurDuree,
    plusValuePotentielle,
    capitalFinal,
    rendementNetAnnuel,
  };
}

export function fmtEur(n: number): string {
  return Math.round(n).toLocaleString("fr-FR") + " EUR";
}
