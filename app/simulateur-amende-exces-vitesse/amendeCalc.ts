// Simulateur amende exces de vitesse France 2026
// Source : Code de la route + Service-Public.fr

export type Zone = "ville" | "hors-ville";

export interface ParamsAmende {
  vitesseMesuree: number;
  vitesseAutorisee: number;
  zone: Zone;
}

export interface ResultatAmende {
  depassement: number;
  amendeForfaitaire: number;
  amendeMinoree: number;
  amendeMajoree: number;
  pointsRetires: number;
  suspensionPossible: boolean;
  suspensionObligatoire: boolean;
  stageObligatoire: boolean;
  tribunalCorrectionnel: boolean; // delit
  classContravention: number; // 3 (ville <20) ou 4 (>20)
  description: string;
}

export function calculerAmende(p: ParamsAmende): ResultatAmende {
  const depassement = p.vitesseMesuree - p.vitesseAutorisee;

  if (depassement < 0) {
    return {
      depassement,
      amendeForfaitaire: 0, amendeMinoree: 0, amendeMajoree: 0,
      pointsRetires: 0,
      suspensionPossible: false, suspensionObligatoire: false,
      stageObligatoire: false, tribunalCorrectionnel: false,
      classContravention: 0,
      description: "Vitesse sous la limite autorisee - aucune infraction",
    };
  }

  // Depassement < 20 km/h
  if (depassement < 20) {
    if (p.zone === "ville") {
      return {
        depassement,
        amendeForfaitaire: 135, amendeMinoree: 90, amendeMajoree: 375,
        pointsRetires: 1,
        suspensionPossible: false, suspensionObligatoire: false,
        stageObligatoire: false, tribunalCorrectionnel: false,
        classContravention: 4,
        description: "Exces < 20 km/h en agglomeration : contravention 4e classe",
      };
    }
    return {
      depassement,
      amendeForfaitaire: 68, amendeMinoree: 45, amendeMajoree: 180,
      pointsRetires: 1,
      suspensionPossible: false, suspensionObligatoire: false,
      stageObligatoire: false, tribunalCorrectionnel: false,
      classContravention: 3,
      description: "Exces < 20 km/h hors agglomeration : contravention 3e classe",
    };
  }

  // 20-30 km/h
  if (depassement < 30) {
    return {
      depassement,
      amendeForfaitaire: 135, amendeMinoree: 90, amendeMajoree: 375,
      pointsRetires: 2,
      suspensionPossible: false, suspensionObligatoire: false,
      stageObligatoire: false, tribunalCorrectionnel: false,
      classContravention: 4,
      description: "Exces de 20 a 29 km/h : contravention 4e classe + 2 points",
    };
  }

  // 30-40 km/h
  if (depassement < 40) {
    return {
      depassement,
      amendeForfaitaire: 135, amendeMinoree: 90, amendeMajoree: 375,
      pointsRetires: 3,
      suspensionPossible: true, suspensionObligatoire: false,
      stageObligatoire: false, tribunalCorrectionnel: false,
      classContravention: 4,
      description: "Exces de 30 a 39 km/h : 135 EUR + 3 points + suspension possible 3 ans",
    };
  }

  // 40-50 km/h
  if (depassement < 50) {
    return {
      depassement,
      amendeForfaitaire: 135, amendeMinoree: 90, amendeMajoree: 375,
      pointsRetires: 4,
      suspensionPossible: true, suspensionObligatoire: false,
      stageObligatoire: false, tribunalCorrectionnel: false,
      classContravention: 4,
      description: "Exces de 40 a 49 km/h : 135 EUR + 4 points + suspension possible 3 ans",
    };
  }

  // >= 50 km/h : delit
  return {
    depassement,
    amendeForfaitaire: 1500, amendeMinoree: 0, amendeMajoree: 3750,
    pointsRetires: 6,
    suspensionPossible: true, suspensionObligatoire: true,
    stageObligatoire: true, tribunalCorrectionnel: true,
    classContravention: 5,
    description: "Exces >= 50 km/h : DELIT - amende 1 500 EUR, 6 points, suspension 3 ans, stage obligatoire, convocation au tribunal correctionnel",
  };
}

export function fmtEur(n: number): string {
  return n.toLocaleString("fr-FR") + " EUR";
}
