// Calcul exoneration LODEOM (cotisations patronales Outre-Mer)
// Source : Urssaf / LFSS 2026 — baremes en vigueur au 1er janvier 2026
// Territoires : Guadeloupe, Guyane, Martinique, La Reunion

// SMIC mensuel brut 2026 (meme valeur que sur tout le site)
export const SMIC_MENSUEL = 1823.03;
export const SMIC_ANNUEL = SMIC_MENSUEL * 12; // 21 876,36 EUR

// Taux T (somme des cotisations exonerees)
// Moins de 11 salaries : FNAL 0,10 % → T = 0,3201
// 11 salaries et plus  : FNAL 0,50 % → T = 0,3241
export const T_MOINS_11 = 0.3201;
export const T_11_ET_PLUS = 0.3241;

export type Bareme = "competitivite" | "competitivite-renforcee" | "innovation-croissance";
export type Effectif = "moins-11" | "11-et-plus";

export interface ParamsLodeom {
  bareme: Bareme;
  effectif: Effectif;
  salaireMensuelBrut: number; // EUR
}

export interface ResultatLodeom {
  remAnnuelle: number;
  smicAnnuel: number;
  ratioSmic: number;        // remAnnuelle / SMIC_ANNUEL
  T: number;
  coefficient: number;       // arrondi 4 decimales
  exonerationAnnuelle: number;
  exonerationMensuelle: number;
  pourcentageBrut: number;   // exoneration / remAnnuelle * 100
  zone: "totale" | "degressive" | "nulle";
  seuilBas: number;          // seuil inferieur en multiples SMIC
  seuilHaut: number;         // seuil superieur en multiples SMIC
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}

export function calculerCoefficient(
  bareme: Bareme,
  T: number,
  remAnnuelle: number,
  smicAnnuel: number
): { coefficient: number; zone: "totale" | "degressive" | "nulle" } {
  const r = remAnnuelle;
  const S = smicAnnuel;

  if (bareme === "competitivite") {
    // Seuil bas : 1,3 SMIC  |  Seuil haut : 2,2 SMIC
    if (r <= 1.3 * S) {
      return { coefficient: round4(T), zone: "totale" };
    } else if (r < 2.2 * S) {
      const coef = round4((1.3 * T / 0.9) * (2.2 * S / r - 1));
      return { coefficient: coef, zone: "degressive" };
    } else {
      return { coefficient: 0, zone: "nulle" };
    }
  }

  if (bareme === "competitivite-renforcee") {
    // Seuil bas : 2 SMIC  |  Seuil haut : 2,7 SMIC
    if (r <= 2 * S) {
      return { coefficient: round4(T), zone: "totale" };
    } else if (r < 2.7 * S) {
      const coef = round4((2 * T / 0.7) * (2.7 * S / r - 1));
      return { coefficient: coef, zone: "degressive" };
    } else {
      return { coefficient: 0, zone: "nulle" };
    }
  }

  // bareme === "innovation-croissance"
  // Seuil bas plancher exo totale : 1,7 SMIC
  // Palier fixe entre 1,7 et 2,5 SMIC
  // Zone degressive entre 2,5 et 3,5 SMIC
  if (r <= 1.7 * S) {
    return { coefficient: round4(T), zone: "totale" };
  } else if (r <= 2.5 * S) {
    // Montant fixe = T * 1,7 * S  →  coefficient = T * 1,7 * S / r
    const coef = round4((T * 1.7 * S) / r);
    return { coefficient: coef, zone: "degressive" };
  } else if (r < 3.5 * S) {
    const coef = round4(1.7 * T * (3.5 * S / r - 1));
    return { coefficient: coef, zone: "degressive" };
  } else {
    return { coefficient: 0, zone: "nulle" };
  }
}

function seuilsBareme(bareme: Bareme): { bas: number; haut: number } {
  if (bareme === "competitivite") return { bas: 1.3, haut: 2.2 };
  if (bareme === "competitivite-renforcee") return { bas: 2.0, haut: 2.7 };
  return { bas: 1.7, haut: 3.5 };
}

export function calculerLodeom(p: ParamsLodeom): ResultatLodeom {
  const remAnnuelle = p.salaireMensuelBrut * 12;
  const T = p.effectif === "moins-11" ? T_MOINS_11 : T_11_ET_PLUS;
  const { coefficient, zone } = calculerCoefficient(p.bareme, T, remAnnuelle, SMIC_ANNUEL);
  const exonerationAnnuelle = coefficient * remAnnuelle;
  const { bas, haut } = seuilsBareme(p.bareme);

  return {
    remAnnuelle,
    smicAnnuel: SMIC_ANNUEL,
    ratioSmic: remAnnuelle / SMIC_ANNUEL,
    T,
    coefficient,
    exonerationAnnuelle,
    exonerationMensuelle: exonerationAnnuelle / 12,
    pourcentageBrut: remAnnuelle > 0 ? (exonerationAnnuelle / remAnnuelle) * 100 : 0,
    zone,
    seuilBas: bas,
    seuilHaut: haut,
  };
}

export function fmtEur(n: number): string {
  return Math.round(n).toLocaleString("fr-FR") + " EUR";
}

export function fmtPct(n: number): string {
  return n.toFixed(1) + " %";
}

export const BAREMES_INFO: Record<Bareme, { label: string; description: string; seuilTotale: string; seuilNulle: string }> = {
  "competitivite": {
    label: "Competitivite (droit commun)",
    description: "Tous secteurs d'activite en DOM",
    seuilTotale: "jusqu'a 1,3 SMIC",
    seuilNulle: "a partir de 2,2 SMIC",
  },
  "competitivite-renforcee": {
    label: "Competitivite renforcee",
    description: "PME moins de 250 salaries dans secteurs prioritaires (industrie, agro-nutrition, NTIC, tourisme, energies renouvelables...)",
    seuilTotale: "jusqu'a 2 SMIC",
    seuilNulle: "a partir de 2,7 SMIC",
  },
  "innovation-croissance": {
    label: "Innovation et croissance",
    description: "Salaries concourant a des projets innovants (NTIC, R&D)",
    seuilTotale: "jusqu'a 1,7 SMIC",
    seuilNulle: "a partir de 3,5 SMIC",
  },
};
