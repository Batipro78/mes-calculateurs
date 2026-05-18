// Calcul du precompte immobilier en Belgique 2026
// Sources : SPF Finances, regions, baremes officiels 2026
// Coefficient d'indexation 2026 : 2,1763

export type RegionBE = "wallonie" | "flandre" | "bruxelles";

export const COEFFICIENT_INDEXATION_2026 = 2.1763;

// Taux regional de base du precompte immobilier (en %)
const TAUX_REGIONAL: Record<RegionBE, number> = {
  wallonie: 1.25,
  flandre: 2.5,
  bruxelles: 1.25,
};

// Centimes additionnels provinciaux (Wallonie uniquement, approximation)
const ADDITIONNELS_PROVINCIAUX: Record<RegionBE, number> = {
  wallonie: 1500, // centimes provinciaux moyens
  flandre: 0,
  bruxelles: 0,
};

export interface ResultatPrecompte {
  region: RegionBE;
  rcNonIndexe: number;
  rcIndexe: number;
  tauxRegional: number;
  centimesCommunaux: number;
  centimesProvinciaux: number;
  precompteBase: number;
  precompteCommunal: number;
  precompteProvincial: number;
  precompteTotal: number;
  pctRcIndexe: number; // % du precompte total / RC indexe
}

export function calculerPrecompteImmobilier(
  rcNonIndexe: number,
  region: RegionBE,
  centimesCommunaux: number,
): ResultatPrecompte {
  if (rcNonIndexe <= 0) {
    return {
      region,
      rcNonIndexe: 0,
      rcIndexe: 0,
      tauxRegional: TAUX_REGIONAL[region],
      centimesCommunaux,
      centimesProvinciaux: ADDITIONNELS_PROVINCIAUX[region],
      precompteBase: 0,
      precompteCommunal: 0,
      precompteProvincial: 0,
      precompteTotal: 0,
      pctRcIndexe: 0,
    };
  }

  const rcIndexe = rcNonIndexe * COEFFICIENT_INDEXATION_2026;
  const tauxRegional = TAUX_REGIONAL[region];
  const centimesProvinciaux = ADDITIONNELS_PROVINCIAUX[region];

  // Precompte de base = RC indexe x taux regional
  const precompteBase = rcIndexe * (tauxRegional / 100);

  // Additionnels communaux et provinciaux : multiplicateur sur la base
  const precompteCommunal = precompteBase * (centimesCommunaux / 100);
  const precompteProvincial = precompteBase * (centimesProvinciaux / 100);

  const precompteTotal =
    precompteBase + precompteCommunal + precompteProvincial;
  const pctRcIndexe = rcIndexe > 0 ? (precompteTotal / rcIndexe) * 100 : 0;

  return {
    region,
    rcNonIndexe,
    rcIndexe,
    tauxRegional,
    centimesCommunaux,
    centimesProvinciaux,
    precompteBase,
    precompteCommunal,
    precompteProvincial,
    precompteTotal,
    pctRcIndexe,
  };
}

// Quelques communes belges avec leurs centimes additionnels communaux (approximation 2024-2025)
export const COMMUNES_EXEMPLES: { nom: string; region: RegionBE; centimes: number }[] = [
  { nom: "Bruxelles-Ville", region: "bruxelles", centimes: 2700 },
  { nom: "Schaerbeek", region: "bruxelles", centimes: 3590 },
  { nom: "Ixelles", region: "bruxelles", centimes: 2750 },
  { nom: "Liege", region: "wallonie", centimes: 2990 },
  { nom: "Charleroi", region: "wallonie", centimes: 2890 },
  { nom: "Namur", region: "wallonie", centimes: 2700 },
  { nom: "Mons", region: "wallonie", centimes: 2900 },
  { nom: "Anvers (Antwerpen)", region: "flandre", centimes: 1450 },
  { nom: "Gand (Gent)", region: "flandre", centimes: 1100 },
  { nom: "Bruges (Brugge)", region: "flandre", centimes: 750 },
  { nom: "Louvain (Leuven)", region: "flandre", centimes: 700 },
  { nom: "Knokke-Heist", region: "flandre", centimes: 0 },
];
