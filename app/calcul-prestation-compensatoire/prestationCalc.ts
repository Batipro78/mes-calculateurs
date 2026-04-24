// Calcul prestation compensatoire (divorce)
// Methode CA Paris (Depondt) + methode indicative moyenne

export interface ParamsPrestation {
  revenuAnnuelDemandeur: number; // revenu annuel net du conjoint a plus faible revenu (qui demande la prestation)
  revenuAnnuelDebiteur: number;  // revenu annuel net du conjoint a plus haut revenu (qui verse)
  dureeMariage: number; // en annees
  ageDemandeur: number;
  nbEnfantsDemandeur: number; // a charge exclusive du demandeur
  patrimoineCommun: number; // pour info
}

export interface ResultatPrestation {
  methodeDepondt: number; // formule (ecart annuel × durée) / 2
  methodeMoyenne: number; // formule simplifiee
  methodeAgeesperanceVie: number; // prise en compte esperance de vie
  montantEstime: number; // moyenne des 3
  plancher: number;
  plafond: number;
  commentaire: string;
}

// Esperance de vie residuelle moyenne par age (INSEE 2025)
function esperanceVieResiduelle(age: number): number {
  if (age <= 30) return 55;
  if (age <= 40) return 46;
  if (age <= 50) return 37;
  if (age <= 60) return 28;
  if (age <= 70) return 20;
  return 13;
}

export function calculerPrestation(p: ParamsPrestation): ResultatPrestation {
  const ecartAnnuel = Math.max(0, p.revenuAnnuelDebiteur - p.revenuAnnuelDemandeur);
  const ecartMensuel = ecartAnnuel / 12;

  // Methode Depondt (CA Paris) : (ecart annuel × durée × 0.4) / 2
  // Approximation : ecart-revenu × durée mariage × 40% de remise / 2 conjoints
  const methodeDepondt = Math.max(0, (ecartAnnuel * p.dureeMariage * 0.4) / 2);

  // Methode moyenne (formule plus simple) : ecart mensuel × 12 × (durée mariage × 0.5)
  const methodeMoyenne = Math.max(0, ecartMensuel * 12 * (p.dureeMariage * 0.5));

  // Methode esperance de vie : besoin mensuel × 20% × nb annees restantes (plafond 20 ans)
  const esperance = Math.min(20, esperanceVieResiduelle(p.ageDemandeur));
  const methodeAgeesperanceVie = Math.max(0, ecartMensuel * 12 * esperance * 0.2);

  const montants = [methodeDepondt, methodeMoyenne, methodeAgeesperanceVie].sort((a, b) => a - b);
  const montantEstime = montants[1]; // mediane

  const plancher = montants[0];
  const plafond = montants[2];

  let commentaire = "";
  if (p.dureeMariage < 5) {
    commentaire = "Mariage court (< 5 ans) : la prestation compensatoire est souvent refusee ou faible par le juge.";
  } else if (p.dureeMariage < 15) {
    commentaire = "Mariage de duree moyenne. La prestation est calculee selon le niveau de vie du couple pendant le mariage.";
  } else if (p.dureeMariage < 25) {
    commentaire = "Long mariage. La prestation prend en compte la reduction des droits a la retraite du conjoint qui s'est dedie au foyer.";
  } else {
    commentaire = "Tres long mariage. Le juge peut accorder une prestation significative pour compenser la disparite creee par le divorce.";
  }

  if (p.nbEnfantsDemandeur >= 1) {
    commentaire += ` Le fait d'avoir eu ${p.nbEnfantsDemandeur} enfant${p.nbEnfantsDemandeur > 1 ? "s" : ""} a charge peut majorer le montant de 10-30%.`;
  }

  return {
    methodeDepondt,
    methodeMoyenne,
    methodeAgeesperanceVie,
    montantEstime,
    plancher,
    plafond,
    commentaire,
  };
}

export function fmtEur(n: number): string {
  return Math.round(n).toLocaleString("fr-FR") + " EUR";
}
