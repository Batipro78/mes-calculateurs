export interface ProteinesResult {
  grammes: number;
  parRepas: number;
  fourchette: { min: number; max: number };
  calories: number;
  pourcentage: number;
}

const BASE_COEFFICIENTS: Record<string, number> = {
  sedentaire: 0.8,
  actif: 1.2,
  sportif: 1.6,
  musculation: 2.0,
  endurance: 1.4,
};

const FOURCHETTES: Record<string, { min: number; max: number }> = {
  sedentaire: { min: 0.8, max: 1.0 },
  actif: { min: 1.0, max: 1.4 },
  sportif: { min: 1.4, max: 1.8 },
  musculation: { min: 1.8, max: 2.2 },
  endurance: { min: 1.2, max: 1.6 },
};

const OBJECTIF_MULTIPLIERS: Record<string, number> = {
  maintien: 1,
  perte: 1.15,
  prise: 1.1,
};

export function calcProteines(
  poids: number,
  activite: string,
  objectif: string
): ProteinesResult {
  const baseCoeff = BASE_COEFFICIENTS[activite] ?? 1.2;
  const objectifMultiplier = OBJECTIF_MULTIPLIERS[objectif] ?? 1;
  const fourchette = FOURCHETTES[activite] ?? { min: 1.0, max: 1.4 };

  const grammes = Math.round(poids * baseCoeff * objectifMultiplier);
  const parRepas = Math.round(grammes / 3);
  const calories = grammes * 4;
  const pourcentage = Math.round((calories / 2000) * 100);

  return {
    grammes,
    parRepas,
    fourchette,
    calories,
    pourcentage,
  };
}
