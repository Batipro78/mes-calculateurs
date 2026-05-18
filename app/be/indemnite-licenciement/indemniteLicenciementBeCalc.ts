// Calcul indemnite de licenciement Belgique - Statut unifie post-1er janvier 2014
// Sources : SPF Emploi, Securex, Liantis, Loi Claeys-De Witte 2014
// Note : la formule Claeys d'origine n'est plus utilisee pour les contrats post-2014 (statut unifie)

// Bareme de preavis officiel en semaines selon anciennete (employes et ouvriers post-2014)
export function preavisSemainesBE(ancienneteMois: number): number {
  if (ancienneteMois < 3) return 1;
  if (ancienneteMois < 4) return 3;
  if (ancienneteMois < 5) return 4;
  if (ancienneteMois < 6) return 5;
  if (ancienneteMois < 9) return 6;
  if (ancienneteMois < 12) return 7;
  if (ancienneteMois < 15) return 8;
  if (ancienneteMois < 18) return 9;
  if (ancienneteMois < 21) return 10;
  if (ancienneteMois < 24) return 11;
  if (ancienneteMois < 36) return 12;
  if (ancienneteMois < 48) return 13;
  if (ancienneteMois < 60) return 15;

  const annees = Math.floor(ancienneteMois / 12);

  // De 5 a 20 ans d'anciennete : 18 sem (5 ans) + 3 sem par annee supplementaire
  if (annees < 20) return 18 + (annees - 5) * 3;

  // Au-dela de 20 ans : 62 semaines + 1 semaine par annee supplementaire
  return 62 + (annees - 20);
}

export interface ResultatIndemniteLicenciement {
  brutMensuel: number;
  ancienneteMois: number;
  ancienneteAnnees: number;
  preavisSemaines: number;
  indemniteBrute: number;
  remunerationHebdo: number;
  facteurAvantages: number;
}

// Indemnite brute = (remuneration annuelle + avantages) / 52 × preavisSemaines
// Facteur 1.16 inclut pecule de vacances (~15,38 %) et prime fin d'annee
export function calculerIndemniteLicenciementBE(
  brutMensuel: number,
  ancienneteMois: number,
  facteurAvantages: number = 1.16,
): ResultatIndemniteLicenciement {
  if (brutMensuel <= 0 || ancienneteMois < 0) {
    return {
      brutMensuel: 0,
      ancienneteMois: 0,
      ancienneteAnnees: 0,
      preavisSemaines: 0,
      indemniteBrute: 0,
      remunerationHebdo: 0,
      facteurAvantages,
    };
  }

  const preavisSem = preavisSemainesBE(ancienneteMois);
  const remunerationAnnuelle = brutMensuel * 12 * facteurAvantages;
  const remunerationHebdo = remunerationAnnuelle / 52;
  const indemniteBrute = remunerationHebdo * preavisSem;

  return {
    brutMensuel,
    ancienneteMois,
    ancienneteAnnees: Math.floor(ancienneteMois / 12),
    preavisSemaines: preavisSem,
    indemniteBrute,
    remunerationHebdo,
    facteurAvantages,
  };
}
