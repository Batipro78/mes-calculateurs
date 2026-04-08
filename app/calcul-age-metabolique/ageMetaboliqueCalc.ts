export interface ResultatAgeMetabolique {
  bmr: number;
  bmrRef: number;
  ageMetabolique: number;
  ecart: number;
  categorie: "excellent" | "bon" | "normal" | "attention" | "alerte";
  conseils: string[];
}

export function calcAgeMetabolique(
  age: number,
  poids: number,
  taille: number,
  sexe: "homme" | "femme",
  tourTaille: number,
  activite: string,
  tabac: boolean,
  alcool: boolean
): ResultatAgeMetabolique {
  // BMR Mifflin-St Jeor
  const bmr =
    sexe === "homme"
      ? 10 * poids + 6.25 * taille - 5 * age + 5
      : 10 * poids + 6.25 * taille - 5 * age - 161;

  // BMR de reference : meme age/sexe avec poids ideal (IMC 22)
  const tailleM = taille / 100;
  const poidsIdeal = 22 * tailleM * tailleM;
  const bmrRef =
    sexe === "homme"
      ? 10 * poidsIdeal + 6.25 * taille - 5 * age + 5
      : 10 * poidsIdeal + 6.25 * taille - 5 * age - 161;

  // Ajustement de base : metabolisme plus lent = plus vieux
  let ajustement = Math.round((bmrRef - bmr) / 15);

  // Ajustement activite physique
  if (activite === "sedentaire") ajustement += 3;
  else if (activite === "leger") ajustement += 1;
  else if (activite === "modere") ajustement += 0;
  else if (activite === "actif") ajustement -= 2;
  else if (activite === "intense") ajustement -= 3;

  // Facteurs de style de vie
  if (tabac) ajustement += 2;
  if (alcool) ajustement += 1;

  const ageMetabolique = age + ajustement;
  const ecart = ageMetabolique - age;

  // Categorie
  let categorie: ResultatAgeMetabolique["categorie"];
  if (ecart <= -5) categorie = "excellent";
  else if (ecart <= -1) categorie = "bon";
  else if (ecart <= 2) categorie = "normal";
  else if (ecart <= 7) categorie = "attention";
  else categorie = "alerte";

  // Conseils personnalises
  const conseils: string[] = [];

  const imc = poids / (tailleM * tailleM);
  if (imc > 25) {
    conseils.push(
      "Votre IMC depasse 25. Perdre quelques kilos peut significativement reduire votre age metabolique."
    );
  } else if (imc < 18.5) {
    conseils.push(
      "Votre IMC est inferieur a 18,5. Augmenter votre apport en proteines peut ameliorer votre metabolisme."
    );
  }

  if (activite === "sedentaire" || activite === "leger") {
    conseils.push(
      "Pratiquer 150 minutes d'activite physique moderee par semaine peut rajeunir votre age metabolique de 2 a 4 ans."
    );
  }

  const tourTailleMax = sexe === "homme" ? 94 : 80;
  if (tourTaille > tourTailleMax) {
    conseils.push(
      `Votre tour de taille (${tourTaille} cm) depasse le seuil recommande (${tourTailleMax} cm). La graisse abdominale accelere le vieillissement metabolique.`
    );
  }

  if (tabac) {
    conseils.push(
      "Le tabac vieillit le metabolisme de 2 ans en moyenne. L'arret du tabac est l'une des mesures les plus efficaces."
    );
  }

  if (alcool) {
    conseils.push(
      "Une consommation reguliere d'alcool perturbe le foie et ralentit le metabolisme. Reduire sa consommation aide a rajeunir biologiquement."
    );
  }

  if (activite === "actif" || activite === "intense") {
    conseils.push(
      "Excellent niveau d'activite ! Pensez aussi a la recuperation et au sommeil pour optimiser votre age metabolique."
    );
  }

  if (conseils.length === 0) {
    conseils.push(
      "Votre profil metabolique est excellent. Maintenez vos bonnes habitudes : activite physique reguliere, alimentation equilibree et sommeil de qualite."
    );
  }

  return {
    bmr: Math.round(bmr),
    bmrRef: Math.round(bmrRef),
    ageMetabolique,
    ecart,
    categorie,
    conseils,
  };
}
