// Maslach Burnout Inventory (MBI-HSS) - Version Human Services Survey
// Source : Maslach C. & Jackson S.E. (1981). The measurement of experienced burnout. Journal of Occupational Behavior.
// Validation FR : Dion G. & Tessier R. (1994). Validation de la traduction de l'Inventaire d'epuisement
// professionnel de Maslach et Jackson. Revue canadienne des sciences du comportement, 26(2), 210-227.

export type DimensionMbi = "EE" | "DP" | "AP";
export type NiveauMbi = "bas" | "modere" | "eleve";

export interface QuestionMbi {
  id: number;
  texte: string;
  dimension: DimensionMbi;
}

export interface ResultatDimension {
  dimension: DimensionMbi;
  nomComplet: string;
  score: number;
  scoreMax: number;
  niveau: NiveauMbi;
  description: string;
  couleur: string;
}

export interface ResultatMbi {
  dimensions: ResultatDimension[];
  scoreTotalRisque: number; // 0-100 indicatif global
  burnoutGlobal: NiveauMbi;
  resume: string;
}

// 22 questions du MBI-HSS (echelle 0-6)
// EE = Epuisement Emotionnel (9 items)
// DP = Depersonnalisation (5 items)
// AP = Accomplissement Personnel (8 items) - score inverse (haut = bien)
export const QUESTIONS_MBI: QuestionMbi[] = [
  { id: 1, texte: "Je me sens emotionnellement vide a cause de mon travail.", dimension: "EE" },
  { id: 2, texte: "Je me sens a bout a la fin de ma journee de travail.", dimension: "EE" },
  { id: 3, texte: "Je me sens fatigue lorsque je me leve le matin et que j'ai a affronter une autre journee de travail.", dimension: "EE" },
  { id: 4, texte: "Je peux comprendre facilement ce que mes clients/patients/eleves ressentent.", dimension: "AP" },
  { id: 5, texte: "Je sens que je m'occupe de certains clients de facon impersonnelle, comme s'ils etaient des objets.", dimension: "DP" },
  { id: 6, texte: "Travailler avec des gens tout au long de la journee me demande beaucoup d'effort.", dimension: "EE" },
  { id: 7, texte: "Je m'occupe tres efficacement des problemes de mes clients.", dimension: "AP" },
  { id: 8, texte: "Je sens que je craque a cause de mon travail.", dimension: "EE" },
  { id: 9, texte: "J'ai l'impression, a travers mon travail, d'avoir une influence positive sur les gens.", dimension: "AP" },
  { id: 10, texte: "Je suis devenu plus insensible aux gens depuis que je fais ce travail.", dimension: "DP" },
  { id: 11, texte: "Je crains que ce travail ne m'endurcisse emotionnellement.", dimension: "DP" },
  { id: 12, texte: "Je me sens plein d'energie.", dimension: "AP" },
  { id: 13, texte: "Je me sens frustre par mon travail.", dimension: "EE" },
  { id: 14, texte: "Je sens que je travaille trop dur dans mon travail.", dimension: "EE" },
  { id: 15, texte: "Je ne me soucie pas vraiment de ce qui arrive a certains de mes clients.", dimension: "DP" },
  { id: 16, texte: "Travailler en contact direct avec les gens me stresse trop.", dimension: "EE" },
  { id: 17, texte: "J'arrive facilement a creer une atmosphere detendue avec mes clients.", dimension: "AP" },
  { id: 18, texte: "Je me sens ragaillardi lorsque dans mon travail j'ai ete proche de mes clients.", dimension: "AP" },
  { id: 19, texte: "J'ai accompli beaucoup de choses qui en valent la peine dans ce travail.", dimension: "AP" },
  { id: 20, texte: "Je me sens au bout du rouleau.", dimension: "EE" },
  { id: 21, texte: "Dans mon travail, je traite les problemes emotionnels tres calmement.", dimension: "AP" },
  { id: 22, texte: "J'ai l'impression que mes clients me rendent responsable de certains de leurs problemes.", dimension: "DP" },
];

export const ECHELLE_FREQUENCE = [
  { value: 0, label: "Jamais" },
  { value: 1, label: "Quelques fois par annee" },
  { value: 2, label: "Une fois par mois" },
  { value: 3, label: "Quelques fois par mois" },
  { value: 4, label: "Une fois par semaine" },
  { value: 5, label: "Quelques fois par semaine" },
  { value: 6, label: "Chaque jour" },
];

// Seuils officiels Maslach & Jackson 1981 (MBI-HSS)
const SEUILS = {
  EE: { bas: 17, eleve: 27 }, // EE: bas <=17, modere 18-26, eleve >=27
  DP: { bas: 5, eleve: 13 },   // DP: bas <=5, modere 6-12, eleve >=13
  AP: { bas: 33, eleve: 39 },  // AP INVERSE: eleve <=33 burnout, modere 34-38, bas >=39 (bon)
};

function niveauEE(score: number): NiveauMbi {
  if (score <= SEUILS.EE.bas) return "bas";
  if (score >= SEUILS.EE.eleve) return "eleve";
  return "modere";
}

function niveauDP(score: number): NiveauMbi {
  if (score <= SEUILS.DP.bas) return "bas";
  if (score >= SEUILS.DP.eleve) return "eleve";
  return "modere";
}

// AP : score eleve = bonne sante. Pour homogeneiser "eleve = mauvais = burnout"
// on retourne le niveau de RISQUE (donc inverse l'echelle).
function niveauAP(score: number): NiveauMbi {
  if (score <= SEUILS.AP.bas) return "eleve"; // burnout eleve
  if (score >= SEUILS.AP.eleve) return "bas"; // peu de burnout
  return "modere";
}

export function calculerMbi(reponses: Record<number, number>): ResultatMbi {
  const scoreEE = QUESTIONS_MBI
    .filter((q) => q.dimension === "EE")
    .reduce((acc, q) => acc + (reponses[q.id] ?? 0), 0);
  const scoreDP = QUESTIONS_MBI
    .filter((q) => q.dimension === "DP")
    .reduce((acc, q) => acc + (reponses[q.id] ?? 0), 0);
  const scoreAP = QUESTIONS_MBI
    .filter((q) => q.dimension === "AP")
    .reduce((acc, q) => acc + (reponses[q.id] ?? 0), 0);

  const ee: ResultatDimension = {
    dimension: "EE",
    nomComplet: "Epuisement emotionnel",
    score: scoreEE,
    scoreMax: 54,
    niveau: niveauEE(scoreEE),
    description: "Fatigue, perte d'energie, sentiment d'etre vide a cause du travail.",
    couleur: "red",
  };
  const dp: ResultatDimension = {
    dimension: "DP",
    nomComplet: "Depersonnalisation",
    score: scoreDP,
    scoreMax: 30,
    niveau: niveauDP(scoreDP),
    description: "Cynisme, distance emotionnelle, deshumanisation des relations.",
    couleur: "orange",
  };
  const ap: ResultatDimension = {
    dimension: "AP",
    nomComplet: "Accomplissement personnel",
    score: scoreAP,
    scoreMax: 48,
    niveau: niveauAP(scoreAP),
    description: "Sentiment d'efficacite et de reussite professionnelle (haut = bon).",
    couleur: "blue",
  };

  // Score global indicatif : pourcentage de risque
  // EE et DP : plus c'est haut, plus c'est mauvais
  // AP : plus c'est bas, plus c'est mauvais
  const risqueEE = (scoreEE / 54) * 100;
  const risqueDP = (scoreDP / 30) * 100;
  const risqueAP = ((48 - scoreAP) / 48) * 100;
  const scoreTotalRisque = Math.round((risqueEE + risqueDP + risqueAP) / 3);

  // Burnout global : si au moins 2 dimensions sur 3 sont "eleve" -> eleve
  const niveaux = [ee.niveau, dp.niveau, ap.niveau];
  const nbEleve = niveaux.filter((n) => n === "eleve").length;
  const nbBas = niveaux.filter((n) => n === "bas").length;
  let burnoutGlobal: NiveauMbi;
  if (nbEleve >= 2) burnoutGlobal = "eleve";
  else if (nbBas >= 2) burnoutGlobal = "bas";
  else burnoutGlobal = "modere";

  let resume: string;
  if (burnoutGlobal === "eleve") {
    resume = "Signes importants de burnout. Consultez un professionnel de sante (medecin du travail, psychologue).";
  } else if (burnoutGlobal === "modere") {
    resume = "Signes moderes de stress professionnel. Soyez vigilant et envisagez des mesures de prevention.";
  } else {
    resume = "Pas de signes notables de burnout. Equilibre professionnel satisfaisant.";
  }

  return {
    dimensions: [ee, dp, ap],
    scoreTotalRisque,
    burnoutGlobal,
    resume,
  };
}

export function niveauLabel(niveau: NiveauMbi): string {
  if (niveau === "bas") return "Bas";
  if (niveau === "modere") return "Modere";
  return "Eleve";
}
