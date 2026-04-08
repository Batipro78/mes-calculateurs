export type Objectif = "maintien" | "perte" | "prise" | "seche" | "cetogene";

export interface MacroDetail {
  grammes: number;
  calories: number;
  pourcentage: number;
}

export interface ResultatMacros {
  proteines: MacroDetail;
  glucides: MacroDetail;
  lipides: MacroDetail;
  caloriesAjustees: number;
}

const RATIOS: Record<Objectif, { p: number; g: number; l: number }> = {
  maintien: { p: 0.3, g: 0.4, l: 0.3 },
  perte: { p: 0.4, g: 0.3, l: 0.3 },
  prise: { p: 0.25, g: 0.5, l: 0.25 },
  seche: { p: 0.4, g: 0.25, l: 0.35 },
  cetogene: { p: 0.2, g: 0.05, l: 0.75 },
};

export function calcMacros(calories: number, objectif: Objectif): ResultatMacros {
  let caloriesAjustees = calories;
  if (objectif === "perte") caloriesAjustees = calories - 400;
  else if (objectif === "prise") caloriesAjustees = calories + 300;

  const { p, g, l } = RATIOS[objectif];

  const proteinesKcal = caloriesAjustees * p;
  const glucidesKcal = caloriesAjustees * g;
  const lipidesKcal = caloriesAjustees * l;

  return {
    proteines: {
      grammes: proteinesKcal / 4,
      calories: proteinesKcal,
      pourcentage: p * 100,
    },
    glucides: {
      grammes: glucidesKcal / 4,
      calories: glucidesKcal,
      pourcentage: g * 100,
    },
    lipides: {
      grammes: lipidesKcal / 9,
      calories: lipidesKcal,
      pourcentage: l * 100,
    },
    caloriesAjustees,
  };
}
