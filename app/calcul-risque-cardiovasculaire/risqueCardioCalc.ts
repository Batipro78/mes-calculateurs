// Calculateur Risque Cardiovasculaire 2026 — Score simplifie Framingham-like

export type Sexe = "homme" | "femme";
export type Categorie = "faible" | "modere" | "eleve" | "tres-eleve";
export type Statut = "bon" | "attention" | "risque";

export interface FacteurRisque {
  nom: string;
  statut: Statut;
  detail: string;
}

export interface ResultatRisqueCardio {
  score: number;
  risquePourcentage: string;
  categorie: Categorie;
  facteurs: FacteurRisque[];
  conseils: string[];
}

export function calcRisqueCardio(
  age: number,
  sexe: Sexe,
  cholesterolTotal: number,
  cholesterolHDL: number,
  tensionSystolique: number,
  tabac: boolean,
  diabete: boolean,
  antecedents: boolean
): ResultatRisqueCardio {
  let score = 0;

  // --- Age ---
  let scoreAge = 0;
  if (sexe === "homme") {
    if (age < 35) scoreAge = 0;
    else if (age <= 44) scoreAge = 1;
    else if (age <= 54) scoreAge = 2;
    else if (age <= 64) scoreAge = 3;
    else scoreAge = 4;
  } else {
    if (age < 35) scoreAge = 0;
    else if (age <= 44) scoreAge = 0;
    else if (age <= 54) scoreAge = 1;
    else if (age <= 64) scoreAge = 2;
    else scoreAge = 3;
  }
  score += scoreAge;

  // --- Cholesterol total ---
  let scoreCholTotal = 0;
  if (cholesterolTotal < 200) scoreCholTotal = 0;
  else if (cholesterolTotal <= 239) scoreCholTotal = 1;
  else if (cholesterolTotal <= 279) scoreCholTotal = 2;
  else scoreCholTotal = 3;
  score += scoreCholTotal;

  // --- HDL ---
  let scoreHDL = 0;
  if (cholesterolHDL >= 60) scoreHDL = -1;
  else if (cholesterolHDL >= 40) scoreHDL = 0;
  else scoreHDL = 2;
  score += scoreHDL;

  // --- Tension ---
  let scoreTension = 0;
  if (tensionSystolique < 120) scoreTension = 0;
  else if (tensionSystolique <= 139) scoreTension = 1;
  else if (tensionSystolique <= 159) scoreTension = 2;
  else scoreTension = 3;
  score += scoreTension;

  // --- Facteurs binaires ---
  if (tabac) score += 3;
  if (diabete) score += 3;
  if (antecedents) score += 2;

  // Borner le score a 0 minimum
  score = Math.max(0, score);

  // --- Risque 10 ans ---
  let risquePourcentage: string;
  if (score <= 5) risquePourcentage = "2%";
  else if (score <= 10) risquePourcentage = "5%";
  else if (score <= 15) risquePourcentage = "10%";
  else if (score <= 20) risquePourcentage = "20%";
  else if (score <= 25) risquePourcentage = "30%";
  else risquePourcentage = ">40%";

  // --- Categorie ---
  let categorie: Categorie;
  const risqueNum = score <= 5 ? 2 : score <= 10 ? 5 : score <= 15 ? 10 : score <= 20 ? 20 : score <= 25 ? 30 : 40;
  if (risqueNum <= 5) categorie = "faible";
  else if (risqueNum <= 10) categorie = "modere";
  else if (risqueNum <= 20) categorie = "eleve";
  else categorie = "tres-eleve";

  // --- Facteurs ---
  const facteurs: FacteurRisque[] = [];

  // Age
  const ageStatut: Statut = scoreAge === 0 ? "bon" : scoreAge <= 2 ? "attention" : "risque";
  facteurs.push({
    nom: "Age",
    statut: ageStatut,
    detail: age < 35
      ? "Moins de 35 ans : risque tres faible"
      : age <= 44
        ? `${age} ans : risque faible`
        : age <= 54
          ? `${age} ans : risque modere`
          : age <= 64
            ? `${age} ans : risque eleve`
            : `${age} ans et plus : risque tres eleve`,
  });

  // Cholesterol total
  const cholTotalStatut: Statut = scoreCholTotal === 0 ? "bon" : scoreCholTotal === 1 ? "attention" : "risque";
  facteurs.push({
    nom: "Cholesterol total",
    statut: cholTotalStatut,
    detail: cholesterolTotal < 200
      ? `${cholesterolTotal} mg/dL — Optimal (< 200)`
      : cholesterolTotal <= 239
        ? `${cholesterolTotal} mg/dL — Limite haute (200-239)`
        : cholesterolTotal <= 279
          ? `${cholesterolTotal} mg/dL — Eleve (240-279)`
          : `${cholesterolTotal} mg/dL — Tres eleve (≥ 280)`,
  });

  // HDL
  const hdlStatut: Statut = cholesterolHDL >= 60 ? "bon" : cholesterolHDL >= 40 ? "attention" : "risque";
  facteurs.push({
    nom: "Cholesterol HDL",
    statut: hdlStatut,
    detail: cholesterolHDL >= 60
      ? `${cholesterolHDL} mg/dL — Protecteur (≥ 60)`
      : cholesterolHDL >= 40
        ? `${cholesterolHDL} mg/dL — Normal (40-59)`
        : `${cholesterolHDL} mg/dL — Bas, facteur de risque (< 40)`,
  });

  // Tension
  const tensionStatut: Statut = scoreTension === 0 ? "bon" : scoreTension === 1 ? "attention" : "risque";
  facteurs.push({
    nom: "Tension arterielle",
    statut: tensionStatut,
    detail: tensionSystolique < 120
      ? `${tensionSystolique} mmHg — Optimale (< 120)`
      : tensionSystolique <= 139
        ? `${tensionSystolique} mmHg — Normale a surveiller (120-139)`
        : tensionSystolique <= 159
          ? `${tensionSystolique} mmHg — Hypertension stade 1 (140-159)`
          : `${tensionSystolique} mmHg — Hypertension stade 2 (≥ 160)`,
  });

  // Tabac
  facteurs.push({
    nom: "Tabagisme",
    statut: tabac ? "risque" : "bon",
    detail: tabac
      ? "Fumeur actif : +3 points. Le tabac double le risque cardiovasculaire"
      : "Non-fumeur : pas de risque additionnel",
  });

  // Diabete
  facteurs.push({
    nom: "Diabete",
    statut: diabete ? "risque" : "bon",
    detail: diabete
      ? "Diabete confirme : +3 points. Multiplie le risque par 2 a 4"
      : "Pas de diabete connu",
  });

  // Antecedents familiaux
  facteurs.push({
    nom: "Antecedents familiaux",
    statut: antecedents ? "risque" : "bon",
    detail: antecedents
      ? "Antecedents cardiovasculaires familiaux : +2 points (parent 1er degre < 55/65 ans)"
      : "Pas d'antecedent familial cardiovasculaire connu",
  });

  // --- Conseils ---
  const conseils: string[] = [];

  if (tabac) {
    conseils.push("Arreter de fumer est la mesure la plus efficace — reduit le risque de 50% en 1 an. Consultez votre medecin pour un accompagnement au sevrage.");
  }
  if (tensionSystolique >= 140) {
    conseils.push("Votre tension est elevee. Reduisez les apports en sel (< 5g/jour), pratiquez une activite physique reguliere et consultez un medecin pour un traitement si necessaire.");
  } else if (tensionSystolique >= 120) {
    conseils.push("Surveillez votre tension arterielle regulierement. Une alimentation pauvre en sel et la gestion du stress peuvent aider a la maintenir dans les normes.");
  }
  if (cholesterolTotal >= 240) {
    conseils.push("Votre cholesterol total est eleve. Reduisez les graisses saturees, augmentez les fibres (fruits, legumes, cereales completes) et pratiquez 30 min d'activite physique par jour.");
  }
  if (cholesterolHDL < 40) {
    conseils.push("Votre HDL (bon cholesterol) est trop bas. L'exercice physique regulier (surtout cardio) et les acides gras omega-3 (poissons gras, noix) aident a l'augmenter.");
  }
  if (diabete) {
    conseils.push("Avec un diabete, un suivi cardiologique regulier est recommande. Maintenez une glycemie controlee, une alimentation equilibree et une activite physique quotidienne.");
  }
  if (age >= 50 && !tabac && cholesterolTotal < 200 && tensionSystolique < 130) {
    conseils.push("Continuez vos bonnes habitudes. Un bilan cardiovasculaire tous les 5 ans est recommande apres 50 ans meme en l'absence de facteurs de risque.");
  }
  if (conseils.length === 0) {
    conseils.push("Votre profil de risque est favorable. Maintenez une alimentation equilibree, une activite physique reguliere (150 min/semaine) et des bilans sanguins annuels.");
  }
  if (categorie === "eleve" || categorie === "tres-eleve") {
    conseils.push("Votre risque cardiovasculaire est significatif. Consultez un cardiologue pour un bilan complet et une prise en charge adaptee.");
  }

  return {
    score,
    risquePourcentage,
    categorie,
    facteurs,
    conseils,
  };
}
