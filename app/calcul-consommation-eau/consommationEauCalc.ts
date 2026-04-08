export interface ResultatConsommationEau {
  base: number;
  activiteBonus: number;
  climatBonus: number;
  grossesseBonus: number;
  allaitementBonus: number;
  total: number;
  verres: number;
  repartition: {
    matin: number;
    midi: number;
    apres_midi: number;
    soir: number;
  };
}

export function calcConsommationEau(
  poids: number,
  activite: string,
  climat: string,
  enceinte: boolean,
  allaitement: boolean
): ResultatConsommationEau {
  const base = poids * 0.033;

  const activiteBonusMap: Record<string, number> = {
    sedentaire: 0,
    leger: 0.3,
    modere: 0.5,
    actif: 0.8,
    intense: 1.2,
  };
  const activiteBonus = activiteBonusMap[activite] ?? 0.5;

  const climatBonusMap: Record<string, number> = {
    tempere: 0,
    chaud: 0.5,
    tres_chaud: 1.0,
  };
  // Handle slug format "tres-chaud" as well as "tres_chaud"
  const climatKey = climat.replace("-", "_");
  const climatBonus = climatBonusMap[climatKey] ?? 0;

  const grossesseBonus = enceinte ? 0.3 : 0;
  const allaitementBonus = allaitement ? 0.7 : 0;

  const total = base + activiteBonus + climatBonus + grossesseBonus + allaitementBonus;
  const verres = Math.ceil(total / 0.25);

  const totalMl = total * 1000;
  const repartition = {
    matin: Math.round(totalMl * 0.3),
    midi: Math.round(totalMl * 0.25),
    apres_midi: Math.round(totalMl * 0.25),
    soir: Math.round(totalMl * 0.2),
  };

  return {
    base,
    activiteBonus,
    climatBonus,
    grossesseBonus,
    allaitementBonus,
    total,
    verres,
    repartition,
  };
}
