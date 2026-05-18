export type TypeCarburant = "essence" | "diesel" | "electrique" | "lpg";

export const REFERENCES_CO2: Record<TypeCarburant, number> = {
  essence: 70,
  diesel: 58,
  lpg: 70,
  electrique: 0,
};

export const ATN_MIN_ANNUEL = 1690;

export interface ResultatATN {
  valeurCatalogue: number;
  co2: number;
  carburant: TypeCarburant;
  ageVehicule: number;
  pctCO2: number;
  valeurDecotee: number;
  atnAnnuel: number;
  atnMensuel: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function calculerATN(
  valeurCatalogue: number,
  co2: number,
  carburant: TypeCarburant,
  ageVehicule: number
): ResultatATN {
  // Calcul % CO2
  let pctCO2: number;
  if (carburant === "electrique") {
    pctCO2 = 4;
  } else {
    const refCO2 = REFERENCES_CO2[carburant];
    pctCO2 = clamp(5.5 + (co2 - refCO2) * 0.1, 4, 18);
  }

  // Calcul valeur décotée
  const ageClamp = Math.min(ageVehicule, 6);
  const valeurDecotee = Math.max(
    valeurCatalogue * (1 - 0.06 * ageClamp),
    valeurCatalogue * 0.7
  );

  // Calcul ATN annuel
  const atnAnnuelBrut = (valeurDecotee * 6) / 7 * (pctCO2 / 100);
  const atnAnnuel = Math.max(atnAnnuelBrut, ATN_MIN_ANNUEL);

  // Calcul ATN mensuel
  const atnMensuel = atnAnnuel / 12;

  return {
    valeurCatalogue,
    co2,
    carburant,
    ageVehicule: ageClamp,
    pctCO2,
    valeurDecotee,
    atnAnnuel,
    atnMensuel,
  };
}
