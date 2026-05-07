// Audit Frais Bancaires 2026
// Sources : tarifs-bancaires.gouv.fr, MoneyVox, Comite consultatif du secteur financier (CCSF)

// Moyennes annuelles 2026 (banque traditionnelle vs banque en ligne)
export const MOYENNE_BANQUE_TRAD = 215;
export const MOYENNE_BANQUE_LIGNE = 35;

// Plafonds legaux 2026
export const PLAFOND_COMMISSION_INTERVENTION_MOIS = 80;
export const PLAFOND_COMMISSION_INTERVENTION_OP = 8;
export const PLAFOND_FRAGILITE_MOIS = 20;
export const PLAFOND_FRAGILITE_OP = 4;
export const PLAFOND_REJET_CHEQUE_PETIT = 30; // ≤ 50 €
export const PLAFOND_REJET_CHEQUE_GRAND = 50; // > 50 €
export const PLAFOND_REJET_PRELEVEMENT = 20;

// Tarifs moyens 2026 (en €/an)
export const TARIFS_MOYENS_2026 = {
  tenueCompte: 20.6,
  cartesVisaClassic: 94.8, // 7,90 €/mois
  cartesVisaPremier: 165.6, // 13,80 €/mois
  cartesVisaInfinite: 312, // 26 €/mois
  virementGuichet: 5,
  decouvertForfaitaire: 6.05,
};

export type TypeBanque = "traditionnelle" | "ligne" | "neobanque" | "inconnue";
export type TypeCarte = "aucune" | "classic" | "premier" | "infinite";

export interface InputsAudit {
  // Frais explicites declares par l'utilisateur
  tenueCompte: number; // €/an
  carte: TypeCarte;
  carteMontant: number; // €/an (si carte != aucune)
  // Frais ponctuels (totaux annuels)
  virementsPayants: number; // €/an
  commissionsIntervention: number; // €/an
  rejetsCheque: number; // €/an
  rejetsPrelevement: number; // €/an
  agios: number; // €/an
  // Frais "caches" 2026
  gestionDigitale: number; // €/mois (acces appli mobile)
  virementsInstantPremium: number; // €/an (frais 0,80 a 1,50 €/op)
  assuranceLiee: number; // €/mois (assurance moyens de paiement)
  fraisDesolidarisation: number; // €/an (compte joint)
  fraisEtranger: number; // €/an
  // Profil
  typeBanque: TypeBanque;
  revenuMensuel: number;
  fragiliteFinanciere: boolean;
}

export interface FraisCacheDetecte {
  nom: string;
  montantAnnuel: number;
  description: string;
  emoji: string;
}

export interface AlerteAbus {
  type: "rouge" | "orange" | "info";
  titre: string;
  description: string;
}

export interface ResultatAudit {
  totalAnnuel: number;
  totalMensuel: number;
  ventilation: { categorie: string; montant: number; pourcentage: number; couleur: string }[];
  // Comparaisons
  excedentVsMoyenne: number; // si > 0, paie plus que la moyenne
  excedentVsBanqueLigne: number; // economie potentielle
  positionVsMoyenne: "tres-bas" | "bas" | "moyen" | "eleve" | "tres-eleve";
  // Score d'abus 0-100
  scoreAbus: number;
  // Frais caches detectes
  fraisCachesDetectes: FraisCacheDetecte[];
  // Alertes plafonds legaux
  alertes: AlerteAbus[];
  // Projections
  perte5Ans: number;
  perte10Ans: number;
  // Recommandation
  banqueRecommandee: BanqueReco;
}

export interface BanqueReco {
  nom: string;
  type: string;
  fraisAnnuelsEstimes: number;
  economieAnnuelle: number;
  prime: string;
  pourquoi: string;
  emoji: string;
}

// Moyennes par poste de frais (banque traditionnelle 2026)
const MOYENNES_POSTE = {
  tenueCompte: 20.6,
  carteClassic: 94.8,
  cartePremier: 165.6,
  virementsPayants: 12, // ~2 par an
  commissionsIntervention: 25, // ~3 par an
  rejets: 15,
  agios: 30,
  gestionDigitale: 0, // gratuit avant 2026, 0 historique
  assuranceLiee: 0,
};

export function calcAudit(inputs: InputsAudit): ResultatAudit {
  // 1. Total annuel
  const totalAnnuel =
    inputs.tenueCompte +
    inputs.carteMontant +
    inputs.virementsPayants +
    inputs.commissionsIntervention +
    inputs.rejetsCheque +
    inputs.rejetsPrelevement +
    inputs.agios +
    inputs.gestionDigitale * 12 +
    inputs.virementsInstantPremium +
    inputs.assuranceLiee * 12 +
    inputs.fraisDesolidarisation +
    inputs.fraisEtranger;

  const totalMensuel = totalAnnuel / 12;

  // 2. Ventilation
  const postes = [
    { categorie: "Tenue de compte", montant: inputs.tenueCompte, couleur: "bg-blue-500" },
    { categorie: "Carte bancaire", montant: inputs.carteMontant, couleur: "bg-indigo-500" },
    { categorie: "Virements payants", montant: inputs.virementsPayants + inputs.virementsInstantPremium, couleur: "bg-purple-500" },
    { categorie: "Commissions d'intervention", montant: inputs.commissionsIntervention, couleur: "bg-rose-500" },
    { categorie: "Rejets (cheques + prelevements)", montant: inputs.rejetsCheque + inputs.rejetsPrelevement, couleur: "bg-red-500" },
    { categorie: "Agios / decouvert", montant: inputs.agios, couleur: "bg-orange-500" },
    { categorie: "Gestion digitale (appli)", montant: inputs.gestionDigitale * 12, couleur: "bg-amber-500" },
    { categorie: "Assurance liee aux moyens de paiement", montant: inputs.assuranceLiee * 12, couleur: "bg-yellow-500" },
    { categorie: "Frais desolidarisation / divers", montant: inputs.fraisDesolidarisation, couleur: "bg-pink-500" },
    { categorie: "Frais a l'etranger", montant: inputs.fraisEtranger, couleur: "bg-teal-500" },
  ].filter((p) => p.montant > 0);

  const ventilation = postes.map((p) => ({
    categorie: p.categorie,
    montant: Math.round(p.montant * 100) / 100,
    pourcentage: totalAnnuel > 0 ? Math.round((p.montant / totalAnnuel) * 1000) / 10 : 0,
    couleur: p.couleur,
  }));

  // 3. Comparaisons
  const excedentVsMoyenne = Math.round((totalAnnuel - MOYENNE_BANQUE_TRAD) * 100) / 100;
  const excedentVsBanqueLigne = Math.round((totalAnnuel - MOYENNE_BANQUE_LIGNE) * 100) / 100;

  let positionVsMoyenne: ResultatAudit["positionVsMoyenne"];
  if (totalAnnuel < 50) positionVsMoyenne = "tres-bas";
  else if (totalAnnuel < 150) positionVsMoyenne = "bas";
  else if (totalAnnuel < 250) positionVsMoyenne = "moyen";
  else if (totalAnnuel < 400) positionVsMoyenne = "eleve";
  else positionVsMoyenne = "tres-eleve";

  // 4. Frais caches 2026
  const fraisCachesDetectes: FraisCacheDetecte[] = [];

  if (inputs.gestionDigitale > 0) {
    fraisCachesDetectes.push({
      nom: "Frais de gestion digitale",
      montantAnnuel: inputs.gestionDigitale * 12,
      description: "L'acces a l'appli mobile etait gratuit avant 2026. Plusieurs banques facturent desormais 2 a 5 €/mois ce service. C'est un frais que vous pouvez contester ou eviter en changeant de banque.",
      emoji: "📱",
    });
  }

  if (inputs.virementsInstantPremium > 0) {
    fraisCachesDetectes.push({
      nom: "Virements instantanes 'premium'",
      montantAnnuel: inputs.virementsInstantPremium,
      description: "Depuis le 9 janvier 2025, les virements instantanes doivent etre gratuits dans toutes les banques de l'UE. Si vous payez encore pour ces virements, c'est ILLEGAL : reclamez le remboursement.",
      emoji: "⚡",
    });
  }

  if (inputs.assuranceLiee > 0) {
    fraisCachesDetectes.push({
      nom: "Assurance liee aux moyens de paiement",
      montantAnnuel: inputs.assuranceLiee * 12,
      description: "Souvent souscrite sans le savoir, cette assurance fait double emploi avec votre carte bancaire premium ou votre assurance habitation. Verifiez si vous en avez vraiment besoin.",
      emoji: "🛡️",
    });
  }

  if (inputs.fraisDesolidarisation > 50) {
    fraisCachesDetectes.push({
      nom: "Frais de desolidarisation eleves",
      montantAnnuel: inputs.fraisDesolidarisation,
      description: "Les frais de desolidarisation de compte joint moyens sont d'environ 30 €. Au-dela de 50 €, c'est potentiellement abusif.",
      emoji: "👥",
    });
  }

  // 5. Alertes plafonds legaux
  const alertes: AlerteAbus[] = [];

  const plafondCommissionAnnuel = inputs.fragiliteFinanciere
    ? PLAFOND_FRAGILITE_MOIS * 12
    : PLAFOND_COMMISSION_INTERVENTION_MOIS * 12;

  if (inputs.commissionsIntervention > plafondCommissionAnnuel) {
    alertes.push({
      type: "rouge",
      titre: "Commissions d'intervention au-dessus du plafond legal",
      description: `Le plafond legal est de ${plafondCommissionAnnuel} €/an${
        inputs.fragiliteFinanciere ? " (clientele en fragilite)" : ""
      }. Vous declarez ${inputs.commissionsIntervention} €. Demandez un remboursement.`,
    });
  }

  if (totalAnnuel > 400) {
    alertes.push({
      type: "rouge",
      titre: "Frais bancaires anormalement eleves",
      description: `Vous payez ${Math.round(totalAnnuel)} €/an, soit pres du DOUBLE de la moyenne nationale (215 €). Vous economiseriez ${Math.round(totalAnnuel - 35)} €/an en passant a une banque en ligne.`,
    });
  } else if (totalAnnuel > MOYENNE_BANQUE_TRAD * 1.3) {
    alertes.push({
      type: "orange",
      titre: "Frais au-dessus de la moyenne",
      description: `Vous payez ${Math.round(excedentVsMoyenne)} € de plus que la moyenne nationale. Comparez les offres.`,
    });
  } else if (totalAnnuel < 50 && inputs.typeBanque !== "ligne") {
    alertes.push({
      type: "info",
      titre: "Frais tres bas — bravo",
      description: "Vos frais sont en dessous de la moyenne. Continuez a surveiller vos releves chaque mois.",
    });
  }

  // 6. Score d'abus (0-100)
  let scoreAbus = 0;
  if (totalAnnuel > MOYENNE_BANQUE_TRAD) {
    scoreAbus += Math.min(40, ((totalAnnuel - MOYENNE_BANQUE_TRAD) / 5));
  }
  scoreAbus += fraisCachesDetectes.length * 10;
  scoreAbus += alertes.filter((a) => a.type === "rouge").length * 15;
  scoreAbus = Math.min(100, Math.round(scoreAbus));

  // 7. Projections
  const economieAnnuelle = Math.max(0, totalAnnuel - MOYENNE_BANQUE_LIGNE);
  const perte5Ans = Math.round(economieAnnuelle * 5);
  const perte10Ans = Math.round(economieAnnuelle * 10);

  // 8. Recommandation banque
  const banqueRecommandee = recommanderBanque(inputs, totalAnnuel);

  return {
    totalAnnuel: Math.round(totalAnnuel * 100) / 100,
    totalMensuel: Math.round(totalMensuel * 100) / 100,
    ventilation,
    excedentVsMoyenne,
    excedentVsBanqueLigne,
    positionVsMoyenne,
    scoreAbus,
    fraisCachesDetectes,
    alertes,
    perte5Ans,
    perte10Ans,
    banqueRecommandee,
  };
}

function recommanderBanque(inputs: InputsAudit, totalAnnuel: number): BanqueReco {
  // Profil voyageur (frais etranger eleves)
  if (inputs.fraisEtranger > 30) {
    return {
      nom: "Boursobank Ultim",
      type: "Banque en ligne premium",
      fraisAnnuelsEstimes: 0,
      economieAnnuelle: Math.round(totalAnnuel),
      prime: "Jusqu'a 220 € offerts a l'ouverture",
      pourquoi: "Carte Visa Premier gratuite, paiements et retraits gratuits a l'etranger sans plafond. Ideal pour les voyageurs.",
      emoji: "✈️",
    };
  }

  // Profil revenus eleves
  if (inputs.revenuMensuel > 4000) {
    return {
      nom: "Fortuneo Gold",
      type: "Banque en ligne premium",
      fraisAnnuelsEstimes: 0,
      economieAnnuelle: Math.round(totalAnnuel),
      prime: "Jusqu'a 150 € offerts",
      pourquoi: "Carte World Elite Mastercard gratuite, services premium, frais a l'etranger reduits. Conditions de revenus elevees mais avantages haut de gamme.",
      emoji: "💎",
    };
  }

  // Profil fragilite financiere
  if (inputs.fragiliteFinanciere) {
    return {
      nom: "La Banque Postale (offre client fragile)",
      type: "Banque universelle",
      fraisAnnuelsEstimes: 36,
      economieAnnuelle: Math.max(0, Math.round(totalAnnuel - 36)),
      prime: "Plafond commissions a 20 €/mois",
      pourquoi: "Si vous etes en situation de fragilite financiere, plafond legal des commissions a 20 €/mois (au lieu de 80 €). Demandez explicitement le statut.",
      emoji: "🤝",
    };
  }

  // Profil decouvert frequent
  if (inputs.commissionsIntervention > 30 || inputs.agios > 50) {
    return {
      nom: "Hello Bank Hello One",
      type: "Banque en ligne (groupe BNP)",
      fraisAnnuelsEstimes: 0,
      economieAnnuelle: Math.round(totalAnnuel),
      prime: "80 € offerts",
      pourquoi: "Tarifs decouvert plus souples que les banques traditionnelles, soutien BNP Paribas (agences accessibles). Ideal en transition.",
      emoji: "🏦",
    };
  }

  // Profil simple
  return {
    nom: "Boursobank Welcome",
    type: "Banque en ligne",
    fraisAnnuelsEstimes: 0,
    economieAnnuelle: Math.round(totalAnnuel),
    prime: "Jusqu'a 150 € offerts a l'ouverture",
    pourquoi: "Banque la moins chere de France 9 ans de suite (MoneyVox). Carte Visa gratuite, virements, application notee 4,7/5. Aucune condition de revenus.",
    emoji: "🥇",
  };
}

// Helper : calculer le montant de carte selon type
export function montantCarteParType(type: TypeCarte): number {
  switch (type) {
    case "classic": return TARIFS_MOYENS_2026.cartesVisaClassic;
    case "premier": return TARIFS_MOYENS_2026.cartesVisaPremier;
    case "infinite": return TARIFS_MOYENS_2026.cartesVisaInfinite;
    default: return 0;
  }
}
