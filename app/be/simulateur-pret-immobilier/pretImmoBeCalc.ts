// Calcul pret hypothecaire Belgique 2026
// Sources : Immotheker, Meilleurtaux.be, baromettre BNB mai 2026
// Taux moyens marche belge : 3,05% (20 ans), 3,25% (25 ans), 3,10% (15 ans)

export const TAUX_MOYENS_BE: Record<number, number> = {
  10: 2.85,
  15: 3.0,
  20: 3.05,
  25: 3.25,
  30: 3.45,
};

export interface ResultatPretBE {
  montant: number;
  duree: number;
  taux: number;
  mensualite: number;
  coutTotal: number;
  interetsTotal: number;
  amortissementAnnee1: number;
}

export function calculerPretBE(
  montant: number,
  dureeAnnees: number,
  tauxAnnuel: number,
): ResultatPretBE {
  if (montant <= 0 || dureeAnnees <= 0) {
    return {
      montant: 0,
      duree: dureeAnnees,
      taux: tauxAnnuel,
      mensualite: 0,
      coutTotal: 0,
      interetsTotal: 0,
      amortissementAnnee1: 0,
    };
  }

  const n = dureeAnnees * 12;
  const tauxMensuel = tauxAnnuel / 100 / 12;

  // Formule mensualite : M = P * t / (1 - (1+t)^-n)
  const mensualite =
    tauxMensuel === 0
      ? montant / n
      : (montant * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -n));

  const coutTotal = mensualite * n;
  const interetsTotal = coutTotal - montant;

  // Amortissement capital annee 1
  let capitalRestant = montant;
  let amortAnnee1 = 0;
  for (let i = 0; i < 12; i++) {
    const interet = capitalRestant * tauxMensuel;
    const capital = mensualite - interet;
    amortAnnee1 += capital;
    capitalRestant -= capital;
  }

  return {
    montant,
    duree: dureeAnnees,
    taux: tauxAnnuel,
    mensualite,
    coutTotal,
    interetsTotal,
    amortissementAnnee1: amortAnnee1,
  };
}
