// Tables OMS 2006 simplifiées (LMS method) — valeurs approximatives par mois
// Données : WHO Multicentre Growth Reference Study 2006
// Source : https://www.who.int/tools/child-growth-standards/standards

export type Sexe = "garcon" | "fille";

export interface LMS {
  L: number;
  M: number; // médiane
  S: number;
}

// Poids garçons (kg) — OMS 2006, valeurs par mois (0-24)
const POIDS_GARCON: Record<number, LMS> = {
  0: { L: 0.3487, M: 3.3464, S: 0.14602 },
  1: { L: 0.2297, M: 4.4709, S: 0.13395 },
  2: { L: 0.197, M: 5.5675, S: 0.12385 },
  3: { L: 0.1738, M: 6.3762, S: 0.11727 },
  4: { L: 0.1553, M: 7.0023, S: 0.11316 },
  5: { L: 0.1395, M: 7.5105, S: 0.11080 },
  6: { L: 0.1257, M: 7.934, S: 0.10958 },
  7: { L: 0.1134, M: 8.297, S: 0.10902 },
  8: { L: 0.1021, M: 8.6151, S: 0.10882 },
  9: { L: 0.0917, M: 8.9014, S: 0.10881 },
  10: { L: 0.082, M: 9.1649, S: 0.10891 },
  11: { L: 0.073, M: 9.4122, S: 0.10906 },
  12: { L: 0.0644, M: 9.6479, S: 0.10925 },
  15: { L: 0.0402, M: 10.3108, S: 0.10995 },
  18: { L: 0.018, M: 10.9385, S: 0.11086 },
  21: { L: -0.0026, M: 11.5384, S: 0.11189 },
  24: { L: -0.0219, M: 12.1515, S: 0.11297 },
};

// Poids filles (kg) — OMS 2006
const POIDS_FILLE: Record<number, LMS> = {
  0: { L: 0.3809, M: 3.2322, S: 0.14171 },
  1: { L: 0.1714, M: 4.1873, S: 0.13724 },
  2: { L: 0.0962, M: 5.1282, S: 0.13 },
  3: { L: 0.0402, M: 5.8458, S: 0.12619 },
  4: { L: -0.005, M: 6.4237, S: 0.12402 },
  5: { L: -0.043, M: 6.8985, S: 0.12274 },
  6: { L: -0.0756, M: 7.297, S: 0.12204 },
  7: { L: -0.1039, M: 7.6422, S: 0.12178 },
  8: { L: -0.1288, M: 7.9487, S: 0.12181 },
  9: { L: -0.1507, M: 8.2254, S: 0.12199 },
  10: { L: -0.17, M: 8.48, S: 0.12223 },
  11: { L: -0.1872, M: 8.7192, S: 0.12247 },
  12: { L: -0.2024, M: 8.9481, S: 0.12268 },
  15: { L: -0.2401, M: 9.6063, S: 0.1232 },
  18: { L: -0.2697, M: 10.2315, S: 0.12373 },
  21: { L: -0.2932, M: 10.8493, S: 0.12428 },
  24: { L: -0.3122, M: 11.4775, S: 0.12489 },
};

// Taille garçons (cm) — OMS 2006
const TAILLE_GARCON: Record<number, LMS> = {
  0: { L: 1, M: 49.8842, S: 0.03795 },
  1: { L: 1, M: 54.7244, S: 0.03557 },
  2: { L: 1, M: 58.4249, S: 0.03424 },
  3: { L: 1, M: 61.4292, S: 0.03328 },
  4: { L: 1, M: 63.886, S: 0.03257 },
  5: { L: 1, M: 65.9026, S: 0.03204 },
  6: { L: 1, M: 67.6236, S: 0.03165 },
  7: { L: 1, M: 69.1645, S: 0.03139 },
  8: { L: 1, M: 70.5994, S: 0.03124 },
  9: { L: 1, M: 71.9687, S: 0.03117 },
  10: { L: 1, M: 73.2812, S: 0.03116 },
  11: { L: 1, M: 74.5388, S: 0.03119 },
  12: { L: 1, M: 75.7488, S: 0.03127 },
  15: { L: 1, M: 79.1458, S: 0.03159 },
  18: { L: 1, M: 82.2587, S: 0.03197 },
  21: { L: 1, M: 85.1605, S: 0.03234 },
  24: { L: 1, M: 87.8161, S: 0.03268 },
};

// Taille filles (cm) — OMS 2006
const TAILLE_FILLE: Record<number, LMS> = {
  0: { L: 1, M: 49.1477, S: 0.0379 },
  1: { L: 1, M: 53.6872, S: 0.03640 },
  2: { L: 1, M: 57.0673, S: 0.03568 },
  3: { L: 1, M: 59.8029, S: 0.03520 },
  4: { L: 1, M: 62.0899, S: 0.03486 },
  5: { L: 1, M: 64.0301, S: 0.03463 },
  6: { L: 1, M: 65.7311, S: 0.03448 },
  7: { L: 1, M: 67.2873, S: 0.03441 },
  8: { L: 1, M: 68.7498, S: 0.03439 },
  9: { L: 1, M: 70.1435, S: 0.03442 },
  10: { L: 1, M: 71.4818, S: 0.03447 },
  11: { L: 1, M: 72.771, S: 0.03455 },
  12: { L: 1, M: 74.015, S: 0.03466 },
  15: { L: 1, M: 77.5193, S: 0.03499 },
  18: { L: 1, M: 80.7079, S: 0.03533 },
  21: { L: 1, M: 83.6647, S: 0.03569 },
  24: { L: 1, M: 86.4153, S: 0.03605 },
};

export interface PercentileResult {
  sexe: Sexe;
  ageMois: number;
  poids: number;
  taille: number;
  percentilePoids: number;
  percentileTaille: number;
  imc: number;
  interpretationPoids: string;
  interpretationTaille: string;
  categoriePoids: string;
  categorieTaille: string;
}

function interpolerLMS(table: Record<number, LMS>, ageMois: number): LMS {
  const cles = Object.keys(table)
    .map(Number)
    .sort((a, b) => a - b);
  if (ageMois <= cles[0]) return table[cles[0]];
  if (ageMois >= cles[cles.length - 1]) return table[cles[cles.length - 1]];

  let lower = cles[0];
  let upper = cles[cles.length - 1];
  for (let i = 0; i < cles.length - 1; i++) {
    if (cles[i] <= ageMois && cles[i + 1] >= ageMois) {
      lower = cles[i];
      upper = cles[i + 1];
      break;
    }
  }

  const ratio = upper === lower ? 0 : (ageMois - lower) / (upper - lower);
  const lowVal = table[lower];
  const upVal = table[upper];
  return {
    L: lowVal.L + ratio * (upVal.L - lowVal.L),
    M: lowVal.M + ratio * (upVal.M - lowVal.M),
    S: lowVal.S + ratio * (upVal.S - lowVal.S),
  };
}

// Approximation du CDF normal cumulé (méthode Abramowitz & Stegun 26.2.17)
function cdfNormal(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-(z * z) / 2);
  const proba =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - proba : proba;
}

// Méthode LMS : Z = ((mesure/M)^L - 1) / (L*S) si L != 0, sinon ln(mesure/M)/S
function calculerZScore(mesure: number, lms: LMS): number {
  const { L, M, S } = lms;
  if (Math.abs(L) < 1e-6) {
    return Math.log(mesure / M) / S;
  }
  return (Math.pow(mesure / M, L) - 1) / (L * S);
}

function zScoreVersPercentile(z: number): number {
  const p = cdfNormal(z) * 100;
  return Math.max(0.1, Math.min(99.9, Math.round(p * 10) / 10));
}

function categoriserPercentile(p: number): { categorie: string; interpretation: string } {
  if (p < 3) {
    return {
      categorie: "Très faible (sous P3)",
      interpretation: "Valeur en dessous du 3e percentile. Un suivi médical est recommandé pour vérifier la croissance.",
    };
  }
  if (p < 10) {
    return {
      categorie: "Faible (P3 à P10)",
      interpretation: "Valeur inférieure à la moyenne. Reste dans la normale basse selon l'OMS, surveillance habituelle.",
    };
  }
  if (p < 25) {
    return {
      categorie: "Normale basse (P10 à P25)",
      interpretation: "Valeur dans la normale, légèrement en dessous de la médiane.",
    };
  }
  if (p < 75) {
    return {
      categorie: "Normale (P25 à P75)",
      interpretation: "Valeur dans la normale, autour de la médiane. Croissance harmonieuse selon les courbes OMS.",
    };
  }
  if (p < 90) {
    return {
      categorie: "Normale haute (P75 à P90)",
      interpretation: "Valeur dans la normale, légèrement au-dessus de la médiane.",
    };
  }
  if (p < 97) {
    return {
      categorie: "Élevée (P90 à P97)",
      interpretation: "Valeur supérieure à la moyenne. Reste dans la normale haute selon l'OMS.",
    };
  }
  return {
    categorie: "Très élevée (au-dessus de P97)",
    interpretation: "Valeur au-dessus du 97e percentile. Un avis médical permet de vérifier l'évolution.",
  };
}

export function calculerPercentile(
  sexe: Sexe,
  ageMois: number,
  poidsKg: number,
  tailleCm: number,
): PercentileResult {
  const tablePoids = sexe === "garcon" ? POIDS_GARCON : POIDS_FILLE;
  const tableTaille = sexe === "garcon" ? TAILLE_GARCON : TAILLE_FILLE;

  const lmsPoids = interpolerLMS(tablePoids, ageMois);
  const lmsTaille = interpolerLMS(tableTaille, ageMois);

  const zPoids = calculerZScore(poidsKg, lmsPoids);
  const zTaille = calculerZScore(tailleCm, lmsTaille);

  const percentilePoids = zScoreVersPercentile(zPoids);
  const percentileTaille = zScoreVersPercentile(zTaille);

  const tailleM = tailleCm / 100;
  const imc = tailleM > 0 ? poidsKg / (tailleM * tailleM) : 0;

  const catPoids = categoriserPercentile(percentilePoids);
  const catTaille = categoriserPercentile(percentileTaille);

  return {
    sexe,
    ageMois,
    poids: poidsKg,
    taille: tailleCm,
    percentilePoids,
    percentileTaille,
    imc: Math.round(imc * 10) / 10,
    interpretationPoids: catPoids.interpretation,
    interpretationTaille: catTaille.interpretation,
    categoriePoids: catPoids.categorie,
    categorieTaille: catTaille.categorie,
  };
}

// Valeurs de référence pour affichage (médiane = P50)
export function getMediane(sexe: Sexe, ageMois: number): { poids: number; taille: number } {
  const tablePoids = sexe === "garcon" ? POIDS_GARCON : POIDS_FILLE;
  const tableTaille = sexe === "garcon" ? TAILLE_GARCON : TAILLE_FILLE;
  const lmsPoids = interpolerLMS(tablePoids, ageMois);
  const lmsTaille = interpolerLMS(tableTaille, ageMois);
  return {
    poids: Math.round(lmsPoids.M * 10) / 10,
    taille: Math.round(lmsTaille.M * 10) / 10,
  };
}
