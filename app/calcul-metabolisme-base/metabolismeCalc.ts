export interface ResultatMetabolisme {
  mifflin: number;
  harris: number;
  tdee: {
    sedentaire: number;
    leger: number;
    modere: number;
    actif: number;
    intense: number;
  };
}

export function calcMetabolisme(
  poids: number,
  taille: number,
  age: number,
  sexe: "homme" | "femme"
): ResultatMetabolisme {
  const mifflin =
    sexe === "homme"
      ? 10 * poids + 6.25 * taille - 5 * age + 5
      : 10 * poids + 6.25 * taille - 5 * age - 161;

  const harris =
    sexe === "homme"
      ? 88.362 + 13.397 * poids + 4.799 * taille - 5.677 * age
      : 447.593 + 9.247 * poids + 3.098 * taille - 4.33 * age;

  return {
    mifflin,
    harris,
    tdee: {
      sedentaire: mifflin * 1.2,
      leger: mifflin * 1.375,
      modere: mifflin * 1.55,
      actif: mifflin * 1.725,
      intense: mifflin * 1.9,
    },
  };
}
