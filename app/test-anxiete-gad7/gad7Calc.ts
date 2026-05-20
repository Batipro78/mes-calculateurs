export type NiveauAnxiete = "minimale" | "legere" | "moderee" | "severe";

export interface QuestionGAD7 {
  id: number;
  texte: string;
}

export interface ReponseGAD7 {
  questionId: number;
  valeur: number; // 0-3
}

export interface ResultatGAD7 {
  scoreTotal: number;
  niveau: NiveauAnxiete;
  nomNiveau: string;
  description: string;
  recommandation: string;
  couleur: string;
}

export const QUESTIONS_GAD7: QuestionGAD7[] = [
  {
    id: 1,
    texte:
      "Vous vous sentez nerveux(se), anxieux(se) ou tendu(e)",
  },
  {
    id: 2,
    texte:
      "Vous n'arrivez pas a arreter de vous inquieter ou a controler vos inquietudes",
  },
  {
    id: 3,
    texte:
      "Vous vous inquietez trop a propos de differentes choses",
  },
  {
    id: 4,
    texte: "Vous avez du mal a vous detendre",
  },
  {
    id: 5,
    texte:
      "Vous etes tellement agite(e) qu'il vous est difficile de rester tranquille",
  },
  {
    id: 6,
    texte: "Vous devenez facilement contrarie(e) ou irritable",
  },
  {
    id: 7,
    texte:
      "Vous avez peur que quelque chose d'horrible puisse se produire",
  },
];

export const ECHELLE_REPONSES: Array<{ valeur: number; label: string }> = [
  { valeur: 0, label: "Jamais" },
  { valeur: 1, label: "Plusieurs jours" },
  { valeur: 2, label: "Plus de la moitie des jours" },
  { valeur: 3, label: "Presque tous les jours" },
];

export function calculerGAD7(reponses: number[]): ResultatGAD7 {
  const scoreTotal = reponses.reduce((sum, v) => sum + (v || 0), 0);

  let niveau: NiveauAnxiete;
  let nomNiveau: string;
  let description: string;
  let recommandation: string;
  let couleur: string;

  if (scoreTotal <= 4) {
    niveau = "minimale";
    nomNiveau = "Anxiete minimale";
    description =
      "Vos reponses suggerent un niveau d'anxiete tres faible ou absent. C'est typique d'une humeur normale.";
    recommandation =
      "Aucune action specifique requise. Maintenez vos habitudes de bien-etre : sommeil, activite physique, lien social.";
    couleur = "green";
  } else if (scoreTotal <= 9) {
    niveau = "legere";
    nomNiveau = "Anxiete legere";
    description =
      "Vos reponses indiquent une anxiete legere. Cela peut etre transitoire ou liee a une periode stressante.";
    recommandation =
      "Surveillance recommandee. Techniques de relaxation, respiration, activite physique reguliere. Reevaluez dans 2 semaines.";
    couleur = "yellow";
  } else if (scoreTotal <= 14) {
    niveau = "moderee";
    nomNiveau = "Anxiete moderee";
    description =
      "Vos reponses suggerent une anxiete moderee susceptible d'avoir un impact sur votre quotidien.";
    recommandation =
      "Une consultation avec un medecin generaliste ou un psychologue est recommandee. Une prise en charge (TCC, suivi) peut etre benefique.";
    couleur = "orange";
  } else {
    niveau = "severe";
    nomNiveau = "Anxiete severe";
    description =
      "Vos reponses indiquent une anxiete severe qui necessite une attention medicale.";
    recommandation =
      "Consultation medicale recommandee rapidement. Un suivi psychiatrique ou psychologique specialise peut etre necessaire (TCC, parfois traitement medicamenteux).";
    couleur = "red";
  }

  return {
    scoreTotal,
    niveau,
    nomNiveau,
    description,
    recommandation,
    couleur,
  };
}

export const SEUILS_GAD7 = [
  { min: 0, max: 4, niveau: "Minimale", couleur: "green" },
  { min: 5, max: 9, niveau: "Legere", couleur: "yellow" },
  { min: 10, max: 14, niveau: "Moderee", couleur: "orange" },
  { min: 15, max: 21, niveau: "Severe", couleur: "red" },
];
