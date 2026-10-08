// Simulateur amende excès de vitesse France 2026
// Sources (relues le 7 octobre 2026) :
//  - service-public.fr, fiche F19460 « Vitesse au volant » : classe, amende forfaitaire et points
//    selon l'excès ; 0 point sous 5 km/h ; 3e classe (68 €) si la limite est > 50 km/h, 4e classe (135 €)
//    si la limite est <= 50 km/h pour un excès inférieur à 20 km/h ; 4e classe de 20 à 49 km/h ;
//    délit à partir de 50 km/h (6 points, jusqu'à 3 750 € et 3 mois de prison devant le tribunal).
//  - service-public.fr, fiche F18509 : minoré 45 € (3e classe) / 90 € (4e classe),
//    majoré 180 € (3e classe) / 375 € (4e classe).
//  - service-public.fr, actualité A18723 : depuis le 29 décembre 2025, amende forfaitaire délictuelle
//    de 300 € (250 € minorée, 600 € majorée) pour un excès d'au moins 50 km/h.
//  - antai.gouv.fr « Les radars en France » : marge technique de 5 km/h (sous 100 km/h) ou 5 %
//    (à partir de 100 km/h), retranchée de la vitesse mesurée pour obtenir la vitesse retenue.
// Arrondi de la vitesse retenue à l'entier inférieur : choix du calculateur (non précisé par ces pages).

export type Zone = "ville" | "hors-ville";

export interface ParamsAmende {
  vitesseMesuree: number;
  vitesseAutorisee: number;
  // Conservé pour compatibilité des pages : la règle officielle dépend de la limite (<= 50 km/h ou non),
  // pas de la zone.
  zone?: Zone;
}

export interface ResultatAmende {
  vitesseRetenue: number;
  depassement: number; // excès calculé sur la vitesse retenue
  amendeForfaitaire: number;
  amendeMinoree: number;
  amendeMajoree: number;
  pointsRetires: number;
  suspensionPossible: boolean; // peine complémentaire que le juge peut prononcer
  suspensionObligatoire: boolean; // toujours false : jamais automatique d'après service-public.fr
  stageObligatoire: boolean; // toujours false : le stage est une peine complémentaire possible
  tribunalCorrectionnel: boolean; // délit (excès d'au moins 50 km/h)
  classContravention: number; // 3 ou 4 ; 0 pour un délit ou une absence d'infraction
  description: string;
}

// Vitesse retenue = vitesse mesurée moins la marge technique (5 km/h sous 100 km/h, 5 % ensuite).
export function vitesseRetenue(mesuree: number): number {
  if (mesuree < 100) return mesuree - 5;
  return Math.floor((mesuree * 95) / 100);
}

export function calculerAmende(p: ParamsAmende): ResultatAmende {
  const retenue = vitesseRetenue(p.vitesseMesuree);
  const depassement = retenue - p.vitesseAutorisee;
  const limiteBasse = p.vitesseAutorisee <= 50; // 4e classe sous 20 km/h d'excès

  if (depassement <= 0) {
    return {
      vitesseRetenue: retenue,
      depassement,
      amendeForfaitaire: 0, amendeMinoree: 0, amendeMajoree: 0,
      pointsRetires: 0,
      suspensionPossible: false, suspensionObligatoire: false,
      stageObligatoire: false, tribunalCorrectionnel: false,
      classContravention: 0,
      description: "Vitesse retenue dans la limite autorisée : aucune infraction",
    };
  }

  // Excès inférieur à 20 km/h
  if (depassement < 20) {
    const points = depassement < 5 ? 0 : 1;
    const txtPoints = points === 0 ? "aucun point retiré" : "1 point retiré";
    if (limiteBasse) {
      return {
        vitesseRetenue: retenue,
        depassement,
        amendeForfaitaire: 135, amendeMinoree: 90, amendeMajoree: 375,
        pointsRetires: points,
        suspensionPossible: false, suspensionObligatoire: false,
        stageObligatoire: false, tribunalCorrectionnel: false,
        classContravention: 4,
        description: `Excès de ${depassement} km/h, limite de 50 km/h ou moins : contravention de 4e classe, ${txtPoints}`,
      };
    }
    return {
      vitesseRetenue: retenue,
      depassement,
      amendeForfaitaire: 68, amendeMinoree: 45, amendeMajoree: 180,
      pointsRetires: points,
      suspensionPossible: false, suspensionObligatoire: false,
      stageObligatoire: false, tribunalCorrectionnel: false,
      classContravention: 3,
      description: `Excès de ${depassement} km/h, limite supérieure à 50 km/h : contravention de 3e classe, ${txtPoints}`,
    };
  }

  // De 20 à 29 km/h
  if (depassement < 30) {
    return {
      vitesseRetenue: retenue,
      depassement,
      amendeForfaitaire: 135, amendeMinoree: 90, amendeMajoree: 375,
      pointsRetires: 2,
      suspensionPossible: false, suspensionObligatoire: false,
      stageObligatoire: false, tribunalCorrectionnel: false,
      classContravention: 4,
      description: "Excès de 20 à 29 km/h : contravention de 4e classe, 2 points retirés",
    };
  }

  // De 30 à 39 km/h
  if (depassement < 40) {
    return {
      vitesseRetenue: retenue,
      depassement,
      amendeForfaitaire: 135, amendeMinoree: 90, amendeMajoree: 375,
      pointsRetires: 3,
      suspensionPossible: true, suspensionObligatoire: false,
      stageObligatoire: false, tribunalCorrectionnel: false,
      classContravention: 4,
      description: "Excès de 30 à 39 km/h : contravention de 4e classe, 3 points retirés, suspension du permis possible (3 ans maximum)",
    };
  }

  // De 40 à 49 km/h
  if (depassement < 50) {
    return {
      vitesseRetenue: retenue,
      depassement,
      amendeForfaitaire: 135, amendeMinoree: 90, amendeMajoree: 375,
      pointsRetires: 4,
      suspensionPossible: true, suspensionObligatoire: false,
      stageObligatoire: false, tribunalCorrectionnel: false,
      classContravention: 4,
      description: "Excès de 40 à 49 km/h : contravention de 4e classe, 4 points retirés, suspension du permis possible (3 ans maximum)",
    };
  }

  // 50 km/h ou plus : délit (amende forfaitaire délictuelle de 300 €)
  return {
    vitesseRetenue: retenue,
    depassement,
    amendeForfaitaire: 300, amendeMinoree: 250, amendeMajoree: 600,
    pointsRetires: 6,
    suspensionPossible: true, suspensionObligatoire: false,
    stageObligatoire: false, tribunalCorrectionnel: true,
    classContravention: 0,
    description: "Excès d'au moins 50 km/h : DÉLIT, amende forfaitaire délictuelle de 300 €, 6 points retirés. Si vous la refusez, le tribunal correctionnel peut aller jusqu'à 3 750 € d'amende et 3 mois de prison",
  };
}

export function fmtEur(n: number): string {
  return n.toLocaleString("fr-FR") + " EUR";
}
