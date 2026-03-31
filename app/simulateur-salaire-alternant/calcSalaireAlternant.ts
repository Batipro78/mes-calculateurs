// SMIC 2026
export const SMIC_BRUT = 1823.03;
export const SMIC_HORAIRE = 12.02;

// Grille Apprentissage 2026 (% du SMIC)
// [tranche_age][annee_contrat - 1]
export const GRILLE_APPRENTISSAGE: Record<string, [number, number, number]> = {
  "moins-18": [27, 39, 55],
  "18-20": [43, 51, 67],
  "21-25": [53, 61, 78],
  "26-plus": [100, 100, 100],
};

// Grille Professionnalisation 2026 (% du SMIC)
// [tranche_age][niveau: 0 = < bac, 1 = >= bac]
export const GRILLE_PRO: Record<string, [number, number]> = {
  "moins-21": [55, 65],
  "21-25": [70, 80],
  "26-plus": [100, 100],
};

export const TRANCHES_AGE_APPRENTISSAGE = ["moins-18", "18-20", "21-25", "26-plus"] as const;
export const TRANCHES_AGE_PRO = ["moins-21", "21-25", "26-plus"] as const;
export const LABELS_TRANCHE_APPRENTISSAGE: Record<string, string> = {
  "moins-18": "Moins de 18 ans",
  "18-20": "18-20 ans",
  "21-25": "21-25 ans",
  "26-plus": "26 ans et plus",
};
export const LABELS_TRANCHE_PRO: Record<string, string> = {
  "moins-21": "Moins de 21 ans",
  "21-25": "21-25 ans",
  "26-plus": "26 ans et plus",
};

export type TypeContrat = "apprentissage" | "professionnalisation";
export type NiveauQualification = "infra-bac" | "bac-plus";

export interface ResultatSalaire {
  type: TypeContrat;
  pourcentageSmic: number;
  brut: number;
  net: number;
  brutAnnuel: number;
  netAnnuel: number;
  cotisations: number;
  trancheAge: string;
  labelTranche: string;
}

export function getTrancheAge(age: number, type: TypeContrat): string {
  if (type === "apprentissage") {
    if (age < 18) return "moins-18";
    if (age <= 20) return "18-20";
    if (age <= 25) return "21-25";
    return "26-plus";
  } else {
    if (age < 21) return "moins-21";
    if (age <= 25) return "21-25";
    return "26-plus";
  }
}

export function calcSalaireAlternant(
  type: TypeContrat,
  age: number,
  annee: number, // 1, 2 ou 3 (apprentissage)
  qualification: NiveauQualification = "infra-bac" // professionnalisation
): ResultatSalaire {
  const tranche = getTrancheAge(age, type);
  let pourcentage: number;

  if (type === "apprentissage") {
    const grille = GRILLE_APPRENTISSAGE[tranche];
    pourcentage = grille[Math.min(annee - 1, 2)];
  } else {
    const grille = GRILLE_PRO[tranche];
    pourcentage = grille[qualification === "bac-plus" ? 1 : 0];
  }

  const brut = (pourcentage / 100) * SMIC_BRUT;

  // Estimation net : les apprentis beneficient d'exonerations
  // Contrats avant mars 2025 : exoneration jusqu'a 79% SMIC
  // Contrats apres mars 2025 : exoneration jusqu'a 50% SMIC
  // Simplification : si brut <= 50% SMIC → net = brut (exonere)
  // Si brut > 50% SMIC → cotisations sur la part au-dessus de 50%
  const seuilExoneration = SMIC_BRUT * 0.5;
  let cotisations = 0;
  if (brut > seuilExoneration) {
    // ~22% de charges sur la part depassant le seuil (CSG 9.2% + CRDS 0.5% + cotisations salariales ~12%)
    cotisations = (brut - seuilExoneration) * 0.22;
  }
  const net = brut - cotisations;

  const labelTranche = type === "apprentissage"
    ? LABELS_TRANCHE_APPRENTISSAGE[tranche]
    : LABELS_TRANCHE_PRO[tranche];

  return {
    type,
    pourcentageSmic: pourcentage,
    brut: Math.round(brut * 100) / 100,
    net: Math.round(net * 100) / 100,
    brutAnnuel: Math.round(brut * 12 * 100) / 100,
    netAnnuel: Math.round(net * 12 * 100) / 100,
    cotisations: Math.round(cotisations * 100) / 100,
    trancheAge: tranche,
    labelTranche,
  };
}
