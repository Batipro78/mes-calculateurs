// Calcul salaire brut/net Belgique 2026
// Sources : SPF Finances, ONSS, baremes officiels 2026

export type SituationFamiliale = "isole" | "marie-1-revenu" | "marie-2-revenus";

// Cotisations ONSS salariales 2026
const ONSS_TAUX = 0.1307;

// Tranches du precompte professionnel / IPP 2026
const TRANCHES_IPP_2026 = [
  { plafond: 16320, taux: 0.25 },
  { plafond: 28800, taux: 0.40 },
  { plafond: 49840, taux: 0.45 },
  { plafond: Infinity, taux: 0.50 },
];

// Quotite exemptee 2026
const QUOTITE_ISOLE = 10570; // EUR/an
const QUOTITE_MARIE_1_REVENU = 14570; // EUR/an (quotite + supplement conjoint)
const QUOTITE_MARIE_2_REVENUS = 10570; // chacun a sa propre quotite

// Frais professionnels forfaitaires 2026
const FRAIS_FORFAIT_TAUX = 0.30;
const FRAIS_FORFAIT_PLAFOND = 6070; // EUR/an

// Additionnels communaux moyens (Belgique)
const ADDITIONNELS_COMMUNAUX_MOYEN = 0.075; // 7,5% moyenne nationale

// Reductions impot pour enfants a charge (montant annuel d'impot economise)
function reductionEnfants(nbEnfants: number): number {
  if (nbEnfants <= 0) return 0;
  if (nbEnfants === 1) return 660;
  if (nbEnfants === 2) return 1740;
  if (nbEnfants === 3) return 4730;
  if (nbEnfants === 4) return 8030;
  return 8030 + (nbEnfants - 4) * 3300;
}

function getQuotite(situation: SituationFamiliale): number {
  if (situation === "marie-1-revenu") return QUOTITE_MARIE_1_REVENU;
  return QUOTITE_ISOLE;
}

function impotSurMontant(montant: number): number {
  let impot = 0;
  let restant = montant;
  let plafondPrecedent = 0;
  for (const tranche of TRANCHES_IPP_2026) {
    if (restant <= 0) break;
    const largeurTranche = tranche.plafond - plafondPrecedent;
    const dansCetteTranche = Math.min(restant, largeurTranche);
    impot += dansCetteTranche * tranche.taux;
    restant -= dansCetteTranche;
    plafondPrecedent = tranche.plafond;
  }
  return impot;
}

export interface ResultatSalaireBE {
  brutMensuel: number;
  brutAnnuel: number;
  netMensuel: number;
  netAnnuel: number;
  onssMensuel: number;
  onssAnnuel: number;
  precompteMensuel: number;
  precompteAnnuel: number;
  fraisForfaitMensuel: number;
  fraisForfaitAnnuel: number;
  quotiteExempteeAnnuel: number;
  imposableAnnuel: number;
  tauxGlobal: number; // pourcentage net/brut
}

export function brutVersNetBE(
  brutMensuel: number,
  situation: SituationFamiliale,
  nbEnfants: number,
): ResultatSalaireBE {
  const brutAnnuel = brutMensuel * 12;

  // ONSS salariale
  const onssAnnuel = brutAnnuel * ONSS_TAUX;
  const brutApresOnss = brutAnnuel - onssAnnuel;

  // Frais professionnels forfaitaires
  const fraisForfaitAnnuel = Math.min(
    brutApresOnss * FRAIS_FORFAIT_TAUX,
    FRAIS_FORFAIT_PLAFOND,
  );
  const imposableAnnuel = Math.max(0, brutApresOnss - fraisForfaitAnnuel);

  // Impot par tranches
  const impotBrutTotal = impotSurMontant(imposableAnnuel);

  // Reduction pour quotite exemptee (calculee au taux de la 1ere tranche : 25%)
  const quotite = getQuotite(situation);
  const reductionQuotite = impotSurMontant(Math.min(quotite, imposableAnnuel));

  // Reduction pour enfants a charge
  const reductionEnf = reductionEnfants(nbEnfants);

  // Impot federal apres reductions
  const impotFederal = Math.max(
    0,
    impotBrutTotal - reductionQuotite - reductionEnf,
  );

  // Additionnels communaux (calcules sur l'impot federal)
  const additionnels = impotFederal * ADDITIONNELS_COMMUNAUX_MOYEN;

  const precompteAnnuel = impotFederal + additionnels;
  const netAnnuel = brutAnnuel - onssAnnuel - precompteAnnuel;
  const netMensuel = netAnnuel / 12;

  return {
    brutMensuel,
    brutAnnuel,
    netMensuel,
    netAnnuel,
    onssMensuel: onssAnnuel / 12,
    onssAnnuel,
    precompteMensuel: precompteAnnuel / 12,
    precompteAnnuel,
    fraisForfaitMensuel: fraisForfaitAnnuel / 12,
    fraisForfaitAnnuel,
    quotiteExempteeAnnuel: quotite,
    imposableAnnuel,
    tauxGlobal: brutAnnuel > 0 ? (netAnnuel / brutAnnuel) * 100 : 0,
  };
}

// Inversion par bissection : trouver le brut qui donne le net cible
export function netVersBrutBE(
  netMensuelCible: number,
  situation: SituationFamiliale,
  nbEnfants: number,
): ResultatSalaireBE {
  let bas = netMensuelCible;
  let haut = netMensuelCible * 3;
  let brutMensuel = netMensuelCible * 1.5;

  for (let i = 0; i < 50; i++) {
    const res = brutVersNetBE(brutMensuel, situation, nbEnfants);
    const diff = res.netMensuel - netMensuelCible;
    if (Math.abs(diff) < 0.01) return res;
    if (diff > 0) {
      haut = brutMensuel;
    } else {
      bas = brutMensuel;
    }
    brutMensuel = (bas + haut) / 2;
  }

  return brutVersNetBE(brutMensuel, situation, nbEnfants);
}
