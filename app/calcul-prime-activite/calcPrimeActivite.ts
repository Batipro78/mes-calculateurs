// Prime d'activite 2026 — Bareme CAF avril 2025-mars 2026 + revalorisation avril 2026

// Montant forfaitaire de base (personne seule, avril 2025)
export const FORFAITAIRE_BASE = 633.21;

// Majorations selon composition du foyer
// +50% pour la 1ere personne supplementaire, +30% par enfant/personne en plus
// Isolement : +128,412% pour parent isole
export function getMontantForfaitaire(situation: string, enfants: number, parentIsole: boolean): number {
  let base = FORFAITAIRE_BASE;

  if (situation === "couple") {
    base = FORFAITAIRE_BASE * 1.5; // +50% pour le conjoint
  }

  // Enfants / personnes a charge
  if (situation === "couple") {
    // Couple : +30% par enfant pour les 2 premiers, +40% au-dela
    for (let i = 0; i < enfants; i++) {
      if (i < 2) {
        base += FORFAITAIRE_BASE * 0.3;
      } else {
        base += FORFAITAIRE_BASE * 0.4;
      }
    }
  } else {
    // Seul : +50% pour le 1er enfant, +30% pour le 2e, +40% au-dela
    for (let i = 0; i < enfants; i++) {
      if (i === 0) {
        base += FORFAITAIRE_BASE * 0.5;
      } else if (i === 1) {
        base += FORFAITAIRE_BASE * 0.3;
      } else {
        base += FORFAITAIRE_BASE * 0.4;
      }
    }
  }

  // Majoration parent isole (remplacement du montant forfaitaire)
  if (parentIsole && situation === "seul" && enfants > 0) {
    base = FORFAITAIRE_BASE * 1.28412; // montant isole de base
    for (let i = 0; i < enfants; i++) {
      base += FORFAITAIRE_BASE * 0.42804;
    }
  }

  return base;
}

// Bonification individuelle (par membre actif du foyer)
export function getBonification(revenuMensuel: number): number {
  const seuilMin = 709.18; // 0.5 SMIC net mensuel approx
  const seuilMax = 1442.40; // ~SMIC net mensuel
  const bonifMax = 173.22; // montant max bonification individuelle

  if (revenuMensuel < seuilMin) return 0;
  if (revenuMensuel >= seuilMax) return bonifMax;

  // Progression lineaire entre seuilMin et seuilMax
  return bonifMax * ((revenuMensuel - seuilMin) / (seuilMax - seuilMin));
}

// Forfait logement (deduit si le foyer a un logement)
export function getForfaitLogement(situation: string, enfants: number): number {
  const nbPersonnes = (situation === "couple" ? 2 : 1) + enfants;
  if (nbPersonnes === 1) return FORFAITAIRE_BASE * 0.12;
  if (nbPersonnes === 2) return FORFAITAIRE_BASE * 0.24;
  return FORFAITAIRE_BASE * 0.2978; // 3 personnes et plus
}

export interface ResultatPrimeActivite {
  montantForfaitaire: number;
  partRevenus: number;
  bonification: number;
  bonificationConjoint: number;
  totalAvantDeduction: number;
  ressourcesFoyer: number;
  forfaitLogement: number;
  primeActivite: number;
  eligible: boolean;
  raisonIneligible: string;
}

export function calcPrimeActivite(
  situation: string,
  enfants: number,
  parentIsole: boolean,
  revenuNetMensuel: number,
  revenuConjoint: number,
  autresRessources: number,
  aLogement: boolean
): ResultatPrimeActivite {
  // Eligibilite : au moins 0 EUR de revenu d'activite
  if (revenuNetMensuel <= 0 && revenuConjoint <= 0) {
    return {
      montantForfaitaire: 0,
      partRevenus: 0,
      bonification: 0,
      bonificationConjoint: 0,
      totalAvantDeduction: 0,
      ressourcesFoyer: 0,
      forfaitLogement: 0,
      primeActivite: 0,
      eligible: false,
      raisonIneligible: "Aucun revenu d'activite declare",
    };
  }

  const montantForfaitaire = getMontantForfaitaire(situation, enfants, parentIsole);

  // 61% des revenus professionnels du foyer
  const totalRevenusPro = revenuNetMensuel + revenuConjoint;
  const partRevenus = totalRevenusPro * 0.61;

  // Bonifications individuelles
  const bonification = getBonification(revenuNetMensuel);
  const bonificationConjoint = situation === "couple" ? getBonification(revenuConjoint) : 0;

  const totalAvantDeduction = montantForfaitaire + partRevenus + bonification + bonificationConjoint;

  // Ressources du foyer (ensemble des revenus)
  const ressourcesFoyer = totalRevenusPro + autresRessources;

  // Forfait logement
  const forfaitLogement = aLogement ? getForfaitLogement(situation, enfants) : 0;

  // Prime = Total - Ressources - Forfait logement
  let prime = totalAvantDeduction - ressourcesFoyer - forfaitLogement;

  // Minimum de versement : 15 EUR
  if (prime < 15) {
    return {
      montantForfaitaire,
      partRevenus,
      bonification,
      bonificationConjoint,
      totalAvantDeduction,
      ressourcesFoyer,
      forfaitLogement,
      primeActivite: 0,
      eligible: false,
      raisonIneligible: prime > 0
        ? "Montant inferieur au seuil de versement (15 EUR)"
        : "Ressources trop elevees",
    };
  }

  return {
    montantForfaitaire,
    partRevenus,
    bonification,
    bonificationConjoint,
    totalAvantDeduction,
    ressourcesFoyer,
    forfaitLogement,
    primeActivite: Math.round(prime * 100) / 100,
    eligible: true,
    raisonIneligible: "",
  };
}
