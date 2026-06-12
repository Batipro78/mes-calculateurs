// Calcul reduction d'impot Denormandie (investissement locatif dans l'ancien avec travaux)
// Source : article 199 novovicies CGI, loi n° 2024-322 du 9 avril 2024 (prorogation au 31/12/2027)
// BOFiP : https://bofip.impots.gouv.fr/bofip/11862-PGP.html

export type Localisation = "metropole" | "outre-mer";
export type DureeEngagement = 6 | 9 | 12;

export interface ParamsDenormandie {
  localisation: Localisation;
  prixAcquisition: number; // EUR
  montantTravaux: number;  // EUR
  duree: DureeEngagement;
}

export interface ResultatDenormandie {
  coutTotal: number;
  partTravaux: number;             // ratio 0..1
  eligible: boolean;
  travauxMinimum: number;          // travaux min pour etre eligible (25% du total)
  baseRetenue: number;             // min(coutTotal, 300 000)
  basePlafonnee: boolean;
  taux: number;                    // ex : 0.18 pour 18 %
  reductionTotale: number;
  reductionAnnuelleBase: number;   // reduction / duree (annees normales)
  reductionAnnuelleBonifiee: number; // pour 12 ans : années 1-9 (metropole) ou 1-9 (outre-mer)
  reductionAnnuelleFinale: number;   // pour 12 ans : années 10-12
  detail12ans: boolean;            // true si duree == 12
}

// Plafond de base de calcul
const PLAFOND_BASE = 300_000;

// Taux selon localisation et duree
const TAUX: Record<Localisation, Record<DureeEngagement, number>> = {
  metropole: { 6: 0.12, 9: 0.18, 12: 0.21 },
  "outre-mer": { 6: 0.23, 9: 0.29, 12: 0.32 },
};

// Repartition du taux 12 ans (annees 1-9 puis annees 10-12)
// Metropole : 2%/an * 9 = 18% puis 1%/an * 3 = 3% => total 21%
// Outre-mer : 29% sur 9 ans (reparti egal) puis 1%/an * 3 = 3% => total 32%
// Taux annuel annees 1-9 : metropole = 2%, outre-mer = 29/9 %
// Taux annuel annees 10-12 : 1% pour les deux
const TAUX_12_ANS_PREMIERE_PERIODE: Record<Localisation, number> = {
  metropole: 0.02,        // 2 %/an sur 9 ans
  "outre-mer": 29 / 9 / 100, // 29% / 9 ans
};
const TAUX_12_ANS_SECONDE_PERIODE = 0.01; // 1 %/an sur 3 ans (les deux zones)

export function calculerDenormandie(p: ParamsDenormandie): ResultatDenormandie {
  const coutTotal = p.prixAcquisition + p.montantTravaux;
  const partTravaux = coutTotal > 0 ? p.montantTravaux / coutTotal : 0;
  const eligible = partTravaux >= 0.25;

  // Travaux minimum pour atteindre 25 % du total : travaux_min = prix / 3
  const travauxMinimum = p.prixAcquisition / 3;

  const baseRetenue = Math.min(coutTotal, PLAFOND_BASE);
  const basePlafonnee = coutTotal > PLAFOND_BASE;

  const taux = TAUX[p.localisation][p.duree];
  const reductionTotale = baseRetenue * taux;

  let reductionAnnuelleBase = 0;
  let reductionAnnuelleBonifiee = 0;
  let reductionAnnuelleFinale = 0;
  const detail12ans = p.duree === 12;

  if (p.duree === 6 || p.duree === 9) {
    reductionAnnuelleBase = reductionTotale / p.duree;
    reductionAnnuelleBonifiee = reductionAnnuelleBase;
    reductionAnnuelleFinale = reductionAnnuelleBase;
  } else {
    // 12 ans : premiere periode 9 ans, seconde 3 ans
    reductionAnnuelleBonifiee = baseRetenue * TAUX_12_ANS_PREMIERE_PERIODE[p.localisation];
    reductionAnnuelleFinale = baseRetenue * TAUX_12_ANS_SECONDE_PERIODE;
    reductionAnnuelleBase = reductionAnnuelleBonifiee; // alias pour affichage general
  }

  return {
    coutTotal,
    partTravaux,
    eligible,
    travauxMinimum,
    baseRetenue,
    basePlafonnee,
    taux,
    reductionTotale,
    reductionAnnuelleBase,
    reductionAnnuelleBonifiee,
    reductionAnnuelleFinale,
    detail12ans,
  };
}

export function fmtEur(n: number): string {
  return Math.round(n).toLocaleString("fr-FR") + " EUR";
}

export function fmtPct(n: number): string {
  return (n * 100).toFixed(1).replace(".", ",") + " %";
}
