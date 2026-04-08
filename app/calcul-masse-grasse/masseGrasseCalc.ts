export type CategorieMG =
  | "essentiel"
  | "athlete"
  | "fitness"
  | "normal"
  | "surpoids";

export interface ResultatMasseGrasse {
  navy: number;
  bmi: number;
  masseGrasse: number;
  masseMaigre: number;
  categorie: CategorieMG;
}

export function calcMasseGrasse(
  poids: number,
  taille: number,
  age: number,
  sexe: "homme" | "femme",
  tour_taille: number,
  tour_cou: number,
  tour_hanches?: number
): ResultatMasseGrasse {
  // Methode US Navy
  let navy: number;
  if (sexe === "homme") {
    // %BF = 86.010 × log10(waist - neck) - 70.041 × log10(height) + 36.76
    const diff = tour_taille - tour_cou;
    navy =
      diff > 0
        ? 86.010 * Math.log10(diff) - 70.041 * Math.log10(taille) + 36.76
        : 0;
  } else {
    // %BF = 163.205 × log10(waist + hip - neck) - 97.684 × log10(height) - 78.387
    const hanches = tour_hanches ?? 95;
    const sum = tour_taille + hanches - tour_cou;
    navy =
      sum > 0
        ? 163.205 * Math.log10(sum) - 97.684 * Math.log10(taille) - 78.387
        : 0;
  }
  navy = Math.max(0, navy);

  // Methode IMC
  const tailleM = taille / 100;
  const bmiVal = poids / (tailleM * tailleM);
  const bmi =
    sexe === "homme"
      ? 1.2 * bmiVal + 0.23 * age - 16.2
      : 1.2 * bmiVal + 0.23 * age - 5.4;

  // On utilise Navy comme reference principale pour les masses
  const percentage = navy;
  const masseGrasse = (poids * percentage) / 100;
  const masseMaigre = poids - masseGrasse;

  // Categorie selon sexe (basee sur Navy %)
  let categorie: CategorieMG;
  if (sexe === "homme") {
    if (percentage < 6) categorie = "essentiel";
    else if (percentage < 14) categorie = "athlete";
    else if (percentage < 18) categorie = "fitness";
    else if (percentage < 25) categorie = "normal";
    else categorie = "surpoids";
  } else {
    if (percentage < 14) categorie = "essentiel";
    else if (percentage < 21) categorie = "athlete";
    else if (percentage < 25) categorie = "fitness";
    else if (percentage < 32) categorie = "normal";
    else categorie = "surpoids";
  }

  return {
    navy: Math.round(navy * 10) / 10,
    bmi: Math.round(bmi * 10) / 10,
    masseGrasse: Math.round(masseGrasse * 10) / 10,
    masseMaigre: Math.round(masseMaigre * 10) / 10,
    categorie,
  };
}
