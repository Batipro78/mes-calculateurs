// Calculateur Score Stress 2026 — PSS-10 (Perceived Stress Scale)

export type NiveauStress = "faible" | "modere" | "eleve";
export type Facteur = { nom: string; score: number; max: number; statut: "bon" | "attention" | "risque" };
export type ResultatStress = {
  score: number;
  maxScore: number;
  niveau: NiveauStress;
  pourcentage: number;
  interpretation: string;
  conseils: string[];
  facteurs: Facteur[];
};

// Questions a score inverse : 4, 5, 7, 9 (indices 3, 4, 6, 8)
const REVERSE_INDICES = [3, 4, 6, 8];

function reverseScore(val: number): number {
  return 4 - val;
}

export function calcStress(reponses: number[]): ResultatStress {
  if (reponses.length !== 10) {
    throw new Error("Le PSS-10 necessite exactement 10 reponses (0-4 chacune).");
  }

  // Calculer le score total avec inversion
  const scored = reponses.map((val, i) =>
    REVERSE_INDICES.includes(i) ? reverseScore(val) : val
  );
  const score = scored.reduce((a, b) => a + b, 0);
  const maxScore = 40;
  const pourcentage = Math.round((score / maxScore) * 100);

  // Niveau
  let niveau: NiveauStress;
  let interpretation: string;
  if (score <= 13) {
    niveau = "faible";
    interpretation = "Votre niveau de stress est faible. Vous gerez bien les situations stressantes du quotidien et maintenez un bon equilibre emotionnel.";
  } else if (score <= 26) {
    niveau = "modere";
    interpretation = "Votre niveau de stress est modere. Certaines situations vous affectent mais vous conservez globalement une capacite d'adaptation. Des ajustements pourraient ameliorer votre bien-etre.";
  } else {
    niveau = "eleve";
    interpretation = "Votre niveau de stress est eleve. Vous ressentez frequemment un manque de controle et une surcharge emotionnelle. Il est important d'agir pour reduire ce stress.";
  }

  // Facteurs — regroupement par categorie
  // Sentiment de controle : questions 4, 5, 7, 9 (indices 3, 4, 6, 8) — reverse scored
  const controleIndices = [3, 4, 6, 8];
  const controleScore = controleIndices.reduce((sum, i) => sum + scored[i], 0);
  const controleMax = controleIndices.length * 4;
  const controleStatut: "bon" | "attention" | "risque" =
    controleScore <= 5 ? "bon" : controleScore <= 10 ? "attention" : "risque";

  // Perception negative : questions 1, 2, 3, 6, 8, 10 (indices 0, 1, 2, 5, 7, 9)
  const perceptionIndices = [0, 1, 2, 5, 7, 9];
  const perceptionScore = perceptionIndices.reduce((sum, i) => sum + scored[i], 0);
  const perceptionMax = perceptionIndices.length * 4;
  const perceptionStatut: "bon" | "attention" | "risque" =
    perceptionScore <= 8 ? "bon" : perceptionScore <= 16 ? "attention" : "risque";

  const facteurs: Facteur[] = [
    {
      nom: "Sentiment de controle",
      score: controleScore,
      max: controleMax,
      statut: controleStatut,
    },
    {
      nom: "Perception negative",
      score: perceptionScore,
      max: perceptionMax,
      statut: perceptionStatut,
    },
  ];

  // Conseils personnalises
  const conseils: string[] = [];

  if (niveau === "faible") {
    conseils.push("Continuez vos bonnes habitudes. Votre gestion du stress est efficace — maintenez un equilibre entre travail, repos et activites agreables.");
    conseils.push("Pratiquez regulierement une activite physique (30 min/jour) pour renforcer votre resilience face au stress.");
    conseils.push("Cultivez vos relations sociales : le soutien de l'entourage est un facteur protecteur majeur contre le stress.");
  } else if (niveau === "modere") {
    conseils.push("Identifiez vos principales sources de stress et essayez de les reduire ou de les gerer differemment. Tenez un journal de stress pendant une semaine.");
    conseils.push("Integrez des techniques de relaxation dans votre quotidien : respiration profonde (4-7-8), meditation guidee ou yoga, meme 10 minutes par jour.");
    conseils.push("Ameliorez votre hygiene de sommeil : couchez-vous a heures regulieres, evitez les ecrans 1h avant le coucher, visez 7 a 8 heures de sommeil.");
    conseils.push("Apprenez a deleguer et a dire non. Fixer des limites claires reduit significativement le stress percu.");
  } else {
    conseils.push("Votre niveau de stress est preoccupant. Consultez un professionnel de sante (medecin generaliste, psychologue) pour un accompagnement adapte.");
    conseils.push("En attendant, pratiquez la coherence cardiaque : 5 minutes, 3 fois par jour (inspirer 5s, expirer 5s). C'est l'une des techniques les plus efficaces contre le stress aigu.");
    conseils.push("Reduisez votre charge mentale : faites une liste de toutes vos obligations et eliminez ou reportez tout ce qui n'est pas essentiel cette semaine.");
    conseils.push("Evitez les stimulants (cafe, alcool, nicotine) qui amplifient les symptomes du stress. Privilegiez l'eau, les tisanes et une alimentation equilibree.");
    conseils.push("Bougez chaque jour, meme une marche de 20 minutes. L'activite physique est un antidepresseur et anxiolytique naturel prouve scientifiquement.");
  }

  if (controleStatut === "risque") {
    conseils.push("Votre sentiment de controle est faible. Travaillez sur ce que vous pouvez changer et acceptez ce que vous ne pouvez pas controler (approche stoicienne).");
  }
  if (perceptionStatut === "risque") {
    conseils.push("Votre perception negative est elevee. La therapie cognitive-comportementale (TCC) est particulierement efficace pour modifier les schemas de pensee negatifs.");
  }

  return {
    score,
    maxScore,
    niveau,
    pourcentage,
    interpretation,
    conseils,
    facteurs,
  };
}
