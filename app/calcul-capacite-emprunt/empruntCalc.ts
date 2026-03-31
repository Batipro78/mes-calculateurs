// Calculateur Capacite d'Emprunt Immobilier 2026

// Taux moyens immobilier avril 2026
export const TAUX_MOYENS: Record<number, number> = {
  15: 3.20,
  20: 3.35,
  25: 3.45,
};

export const DUREES = [15, 20, 25] as const;
export type DureeType = (typeof DUREES)[number];

export const TAUX_ASSURANCE_DEFAUT = 0.30;
export const TAUX_ENDETTEMENT_MAX = 35;

export const DUREE_LABELS: Record<number, string> = {
  15: "15 ans",
  20: "20 ans",
  25: "25 ans",
};

export interface ResultatEmprunt {
  revenuTotal: number;
  charges: number;
  mensualiteMax: number;
  capitalMax: number;
  apport: number;
  budgetTotal: number;
  coutInterets: number;
  coutAssurance: number;
  coutTotal: number;
  tauxEndettement: number;
  resteAVivre: number;
  conforme: boolean;
  dureeAnnees: number;
  tauxAnnuel: number;
  tauxAssurance: number;
}

export interface ComparatifDuree {
  duree: number;
  taux: number;
  mensualite: number;
  capitalMax: number;
  budgetTotal: number;
  coutTotal: number;
}

export function calcCapaciteEmprunt(
  revenu1: number,
  revenu2: number,
  charges: number,
  apport: number,
  dureeAnnees: number,
  tauxAnnuel: number,
  tauxAssurance: number = TAUX_ASSURANCE_DEFAUT
): ResultatEmprunt {
  const revenuTotal = revenu1 + revenu2;
  const mensualiteMax = (revenuTotal - charges) * (TAUX_ENDETTEMENT_MAX / 100);

  const tauxMensuel = tauxAnnuel / 100 / 12;
  const nbMois = dureeAnnees * 12;

  // Capital empruntable (hors assurance)
  const tauxAssuranceMensuel = tauxAssurance / 100 / 12;
  const mensualiteHorsAssurance = mensualiteMax / (1 + (tauxAssuranceMensuel * nbMois * 12) / (tauxAnnuel > 0 ? nbMois : 1));

  let capitalMax: number;
  if (tauxMensuel === 0) {
    capitalMax = mensualiteMax * nbMois;
  } else {
    // On deduit le cout de l'assurance de la mensualite max
    const mensualiteAssurance = (mensualiteMax * tauxAssurance / 100) / 12;
    const mensualiteCredit = mensualiteMax - mensualiteAssurance;

    if (mensualiteCredit <= 0) {
      capitalMax = 0;
    } else {
      capitalMax = mensualiteCredit * ((1 - Math.pow(1 + tauxMensuel, -nbMois)) / tauxMensuel);
    }
  }

  capitalMax = Math.max(0, Math.round(capitalMax));

  const budgetTotal = capitalMax + apport;

  // Cout total
  const mensualiteAssuranceReelle = (capitalMax * tauxAssurance / 100) / 12;
  let mensualiteCreditReelle: number;
  if (tauxMensuel === 0) {
    mensualiteCreditReelle = capitalMax / nbMois;
  } else {
    mensualiteCreditReelle = (capitalMax * tauxMensuel * Math.pow(1 + tauxMensuel, nbMois)) / (Math.pow(1 + tauxMensuel, nbMois) - 1);
  }

  const coutInterets = Math.round((mensualiteCreditReelle * nbMois) - capitalMax);
  const coutAssurance = Math.round(mensualiteAssuranceReelle * nbMois);
  const coutTotal = coutInterets + coutAssurance;

  const mensualiteReelle = mensualiteCreditReelle + mensualiteAssuranceReelle;
  const tauxEndettement = revenuTotal > 0 ? (mensualiteReelle / revenuTotal) * 100 : 0;
  const resteAVivre = revenuTotal - charges - mensualiteReelle;
  const conforme = tauxEndettement <= TAUX_ENDETTEMENT_MAX && resteAVivre >= 700;

  return {
    revenuTotal,
    charges,
    mensualiteMax: Math.round(mensualiteReelle),
    capitalMax,
    apport,
    budgetTotal,
    coutInterets: Math.max(0, coutInterets),
    coutAssurance: Math.max(0, coutAssurance),
    coutTotal: Math.max(0, coutTotal),
    tauxEndettement: Math.round(tauxEndettement * 10) / 10,
    resteAVivre: Math.round(resteAVivre),
    conforme,
    dureeAnnees,
    tauxAnnuel,
    tauxAssurance,
  };
}

export function calcComparatifDurees(
  revenu1: number,
  revenu2: number,
  charges: number,
  apport: number,
  tauxAssurance: number = TAUX_ASSURANCE_DEFAUT
): ComparatifDuree[] {
  return DUREES.map((duree) => {
    const taux = TAUX_MOYENS[duree];
    const res = calcCapaciteEmprunt(revenu1, revenu2, charges, apport, duree, taux, tauxAssurance);
    return {
      duree,
      taux,
      mensualite: res.mensualiteMax,
      capitalMax: res.capitalMax,
      budgetTotal: res.budgetTotal,
      coutTotal: res.coutTotal,
    };
  });
}
