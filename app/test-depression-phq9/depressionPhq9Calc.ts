// Patient Health Questionnaire-9 (PHQ-9)
// Source : Kroenke K., Spitzer R.L., Williams J.B.W. (2001). The PHQ-9: Validity
// of a Brief Depression Severity Measure. Journal of General Internal Medicine,
// 16(9), 606-613. Developpe avec Pfizer Inc.
// Validation FR : INSERM / Sante publique France. Outil utilise en pratique courante
// chez les medecins generalistes francais et reconnu par l'OMS.

export type NiveauDepression =
  | "minimale"
  | "legere"
  | "moderee"
  | "moderement-severe"
  | "severe";

export interface QuestionPhq9 {
  id: number;
  texte: string;
}

export interface ResultatPhq9 {
  score: number; // 0-27
  niveau: NiveauDepression;
  label: string;
  description: string;
  conseil: string;
  recommandation: string;
  alerteSuicide: boolean; // si question 9 >= 1
  couleur: string;
}

// 9 questions PHQ-9 validees (traduction francaise officielle Sante publique France)
export const QUESTIONS_PHQ9: QuestionPhq9[] = [
  {
    id: 1,
    texte: "Peu d'interet ou de plaisir a faire les choses.",
  },
  {
    id: 2,
    texte: "Se sentir triste, deprime ou desespere.",
  },
  {
    id: 3,
    texte: "Difficultes a s'endormir ou a rester endormi, ou trop dormir.",
  },
  {
    id: 4,
    texte: "Se sentir fatigue ou manquer d'energie.",
  },
  {
    id: 5,
    texte: "Manque d'appetit ou manger trop.",
  },
  {
    id: 6,
    texte:
      "Mauvaise perception de vous-meme - ou avoir le sentiment d'etre nul, ou d'avoir decu votre famille ou de vous etre decu vous-meme.",
  },
  {
    id: 7,
    texte:
      "Difficultes a se concentrer sur certaines choses, telles que lire le journal ou regarder la television.",
  },
  {
    id: 8,
    texte:
      "Vous bougez ou parlez si lentement que les autres ont pu le remarquer. Ou au contraire, vous etes si agite que vous bougez beaucoup plus que d'habitude.",
  },
  {
    id: 9,
    texte:
      "Vous avez pense qu'il vaudrait mieux mourir ou envisage de vous faire du mal d'une maniere ou d'une autre.",
  },
];

export const ECHELLE_PHQ9 = [
  { value: 0, label: "Jamais", short: "Jamais" },
  { value: 1, label: "Plusieurs jours", short: "Plusieurs jours" },
  { value: 2, label: "Plus de la moitie des jours", short: "Plus de la moitie" },
  { value: 3, label: "Presque tous les jours", short: "Presque tous les jours" },
];

export function calculerPhq9(reponses: Record<number, number>): ResultatPhq9 {
  const score = QUESTIONS_PHQ9.reduce(
    (acc, q) => acc + (reponses[q.id] ?? 0),
    0
  );

  let niveau: NiveauDepression;
  let label: string;
  let description: string;
  let conseil: string;
  let recommandation: string;
  let couleur: string;

  if (score <= 4) {
    niveau = "minimale";
    label = "Depression minimale ou absente";
    description =
      "Vos symptomes sont legers ou inexistants. Aucune intervention specifique n'est generalement necessaire.";
    conseil =
      "Continuez a prendre soin de vous : sommeil regulier, activite physique, lien social. Repetez le test dans quelques semaines si votre situation evolue.";
    recommandation = "Surveillance simple.";
    couleur = "green";
  } else if (score <= 9) {
    niveau = "legere";
    label = "Depression legere";
    description =
      "Vous presentez quelques symptomes depressifs. Cela merite attention mais n'est pas necessairement une depression clinique.";
    conseil =
      "Renforcez les facteurs protecteurs : sport, alimentation, sommeil, soutien social. Consultez votre medecin si les symptomes persistent au-dela de 2 semaines.";
    recommandation = "Surveillance attentive, consultation conseillee.";
    couleur = "yellow";
  } else if (score <= 14) {
    niveau = "moderee";
    label = "Depression moderee";
    description =
      "Vous presentez des signes nets de depression. Une prise en charge est recommandee pour eviter une aggravation.";
    conseil =
      "Consultez votre medecin generaliste ou un psychologue. Une therapie cognitive et comportementale (TCC) est souvent efficace a ce stade. Un traitement medicamenteux peut etre discute.";
    recommandation = "Consultation medicale ou psychologique recommandee.";
    couleur = "orange";
  } else if (score <= 19) {
    niveau = "moderement-severe";
    label = "Depression moderement severe";
    description =
      "Vos symptomes sont importants et alterent probablement votre quotidien. Une prise en charge active est necessaire.";
    conseil =
      "Consultez rapidement un medecin. Un traitement combine (psychotherapie + medicaments) est generalement preconise a ce niveau. Ne restez pas seul(e) avec ces symptomes.";
    recommandation = "Consultation medicale urgente recommandee.";
    couleur = "red";
  } else {
    niveau = "severe";
    label = "Depression severe";
    description =
      "Vos symptomes sont severes. Une prise en charge medicale immediate est necessaire.";
    conseil =
      "Consultez sans attendre un medecin ou rendez-vous aux urgences si vous ressentez une grande detresse. Un traitement antidepresseur associe a un suivi psychotherapeutique est presque toujours indique.";
    recommandation = "Consultation medicale urgente indispensable.";
    couleur = "red";
  }

  // Alerte suicide : question 9 a 1 ou plus = signal d'alarme
  const alerteSuicide = (reponses[9] ?? 0) >= 1;

  return {
    score,
    niveau,
    label,
    description,
    conseil,
    recommandation,
    alerteSuicide,
    couleur,
  };
}

export const SEUILS_PHQ9 = [
  { min: 0, max: 4, niveau: "minimale" as const, label: "Minimale ou absente" },
  { min: 5, max: 9, niveau: "legere" as const, label: "Legere" },
  { min: 10, max: 14, niveau: "moderee" as const, label: "Moderee" },
  { min: 15, max: 19, niveau: "moderement-severe" as const, label: "Moderement severe" },
  { min: 20, max: 27, niveau: "severe" as const, label: "Severe" },
];
