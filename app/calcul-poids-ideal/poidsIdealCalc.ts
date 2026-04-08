export interface PoidsIdealResult {
  lorentz: number;
  devine: number;
  creff: number;
  moyenne: number;
  imcIdeal: number;
  fourchette: { min: number; max: number };
}

export function calcPoidsIdeal(
  taille: number,
  age: number,
  sexe: "homme" | "femme",
  morphologie: "mince" | "normal" | "large"
): PoidsIdealResult {
  const tailleM = taille / 100;
  const tailleInch = taille / 2.54;

  // Formule de Lorentz
  const lorentz =
    sexe === "homme"
      ? taille - 100 - (taille - 150) / 4
      : taille - 100 - (taille - 150) / 2.5;

  // Formule de Devine
  const devine =
    sexe === "homme"
      ? 50 + 2.3 * (tailleInch - 60)
      : 45.5 + 2.3 * (tailleInch - 60);

  // Formule de Creff
  const coef = morphologie === "mince" ? 0.9 : morphologie === "large" ? 1.1 : 1;
  const creff = ((taille - 100) + (age / 10)) * 0.9 * coef;

  // Moyenne des 3 formules
  const moyenne = (lorentz + devine + creff) / 3;

  // IMC ideal (IMC 22)
  const imcIdeal = tailleM * tailleM * 22;

  // Fourchette saine (IMC 18.5 - 24.9)
  const fourchette = {
    min: tailleM * tailleM * 18.5,
    max: tailleM * tailleM * 24.9,
  };

  return {
    lorentz: Math.round(lorentz * 10) / 10,
    devine: Math.round(devine * 10) / 10,
    creff: Math.round(creff * 10) / 10,
    moyenne: Math.round(moyenne * 10) / 10,
    imcIdeal: Math.round(imcIdeal * 10) / 10,
    fourchette: {
      min: Math.round(fourchette.min * 10) / 10,
      max: Math.round(fourchette.max * 10) / 10,
    },
  };
}
