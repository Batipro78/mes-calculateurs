export interface ResultatDPE {
  consommationEstimee: number;
  classeEnergie: "A" | "B" | "C" | "D" | "E" | "F" | "G";
  ges: number;
  classeGES: "A" | "B" | "C" | "D" | "E" | "F" | "G";
  coutAnnuel: number;
  economiesPotentielles: number;
  passoire: boolean;
}

type ClasseEnergie = "A" | "B" | "C" | "D" | "E" | "F" | "G";

function getClasseEnergie(conso: number): ClasseEnergie {
  if (conso <= 70) return "A";
  if (conso <= 110) return "B";
  if (conso <= 180) return "C";
  if (conso <= 250) return "D";
  if (conso <= 330) return "E";
  if (conso <= 420) return "F";
  return "G";
}

function getClasseGES(ges: number): ClasseEnergie {
  if (ges <= 6) return "A";
  if (ges <= 11) return "B";
  if (ges <= 30) return "C";
  if (ges <= 50) return "D";
  if (ges <= 70) return "E";
  if (ges <= 100) return "F";
  return "G";
}

// kWh/m²/an -> € par kWh selon type de chauffage
const PRIX_KWH: Record<string, number> = {
  electrique: 0.2276,
  gaz: 0.12,
  fioul: 0.115,
  pac: 0.2276,
  bois: 0.07,
};

// Facteur d'emission CO2 kg/kWh selon chauffage
const FACTEUR_GES: Record<string, number> = {
  electrique: 0.052,
  gaz: 0.227,
  fioul: 0.324,
  pac: 0.052,
  bois: 0.03,
};

export function calcDPE(
  surface: number,
  chauffage: string,
  isolation: string,
  vitrage: string,
  anneeConstruction: number,
  region: string
): ResultatDPE {
  // Base par epoque de construction (kWh/m²/an)
  let base: number;
  if (anneeConstruction < 1975) base = 350;
  else if (anneeConstruction <= 1989) base = 250;
  else if (anneeConstruction <= 2005) base = 180;
  else if (anneeConstruction <= 2012) base = 130;
  else if (anneeConstruction <= 2020) base = 80;
  else base = 50;

  // Modificateurs
  const chauffageModifier: Record<string, number> = {
    electrique: 1.0,
    gaz: 0.9,
    fioul: 1.15,
    pac: 0.5,
    bois: 0.7,
  };

  const isolationModifier: Record<string, number> = {
    aucune: 1.3,
    partielle: 1.0,
    complete: 0.7,
  };

  const vitrageModifier: Record<string, number> = {
    simple: 1.2,
    double: 1.0,
    triple: 0.85,
  };

  const regionModifier: Record<string, number> = {
    nord: 1.15,
    centre: 1.0,
    sud: 0.85,
  };

  const mChauffage = chauffageModifier[chauffage] ?? 1.0;
  const mIsolation = isolationModifier[isolation] ?? 1.0;
  const mVitrage = vitrageModifier[vitrage] ?? 1.0;
  const mRegion = regionModifier[region] ?? 1.0;

  const consommationEstimee = Math.round(
    base * mChauffage * mIsolation * mVitrage * mRegion
  );

  const classeEnergie = getClasseEnergie(consommationEstimee);

  // GES en kg CO2/m²/an
  const facteurGES = FACTEUR_GES[chauffage] ?? 0.2;
  const ges = Math.round(consommationEstimee * facteurGES * 10) / 10;
  const classeGES = getClasseGES(ges);

  // Cout annuel en €
  const prixKWh = PRIX_KWH[chauffage] ?? 0.2276;
  const coutAnnuel = Math.round(consommationEstimee * surface * prixKWh);

  // Economies potentielles si on ameliore d'une classe
  const classesOrder: ClasseEnergie[] = ["A", "B", "C", "D", "E", "F", "G"];
  const idxActuel = classesOrder.indexOf(classeEnergie);
  let economiesPotentielles = 0;
  if (idxActuel > 0) {
    // Consommation max de la classe superieure
    const maxClasseSuperieure: Record<ClasseEnergie, number> = {
      A: 70, B: 110, C: 180, D: 250, E: 330, F: 420, G: 500,
    };
    const classeSuperieure = classesOrder[idxActuel - 1];
    const consoObjectif = maxClasseSuperieure[classeSuperieure];
    const economiesKWh = Math.max(0, consommationEstimee - consoObjectif);
    economiesPotentielles = Math.round(economiesKWh * surface * prixKWh);
  }

  const passoire = classeEnergie === "F" || classeEnergie === "G";

  return {
    consommationEstimee,
    classeEnergie,
    ges,
    classeGES,
    coutAnnuel,
    economiesPotentielles,
    passoire,
  };
}
