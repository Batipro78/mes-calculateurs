// Golf WHS (World Handicap System) Calculator
// Sources: FFGolf, USGA, R&A
// Index WHS = moyenne des N meilleurs différentiels parmi les 20 dernières cartes

export interface CarteScore {
  scoreBrut: number;
  sss: number; // Slope Style Score (USGA Course Rating)
  slope: number; // Difficulté relative (95-155, standard 113)
}

export interface ResultatHandicap {
  index: number; // ex 18.4
  nbCartesUtilisees: number;
  differentiels: number[]; // tous les différentiels, triés DESC
  differentielsMeilleurs: number[]; // les N meilleurs utilisés pour le calcul
  nbMeilleursUtilises: number; // selon table officielle
  ajustement?: number; // pour <20 cartes (ex: -2.0)
}

const SLOPE_STANDARD = 113;

/**
 * Calcule le différentiel d'une carte selon WHS
 * Différentiel = (Score brut ajusté − SSS) × 113 / Slope
 * Ajustement du score : Net Double Bogey max par trou
 */
export function calculerDifferentiel(carte: CarteScore): number {
  // Simple pour ce calculateur (on suppose score déjà ajusté)
  const diff = ((carte.scoreBrut - carte.sss) * SLOPE_STANDARD) / carte.slope;
  return Math.round(diff * 10) / 10;
}

/**
 * Determine le nombre de meilleurs différentiels à utiliser selon le nombre de cartes
 * Basé sur la table officielle WHS
 */
function getNbMeilleursUtilises(nbCartes: number): {
  nbUtilises: number;
  ajustement: number;
} {
  if (nbCartes < 3) return { nbUtilises: 0, ajustement: 0 };
  if (nbCartes === 3) return { nbUtilises: 1, ajustement: -2.0 };
  if (nbCartes === 4) return { nbUtilises: 1, ajustement: -1.0 };
  if (nbCartes === 5) return { nbUtilises: 1, ajustement: 0 };
  if (nbCartes === 6) return { nbUtilises: 2, ajustement: -1.0 };
  if (nbCartes === 7 || nbCartes === 8)
    return { nbUtilises: 2, ajustement: 0 };
  if (nbCartes === 9 || nbCartes === 10 || nbCartes === 11)
    return { nbUtilises: 3, ajustement: 0 };
  if (nbCartes === 12 || nbCartes === 13 || nbCartes === 14)
    return { nbUtilises: 4, ajustement: 0 };
  if (nbCartes === 15 || nbCartes === 16)
    return { nbUtilises: 5, ajustement: 0 };
  if (nbCartes === 17) return { nbUtilises: 6, ajustement: 0 };
  if (nbCartes === 18 || nbCartes === 19)
    return { nbUtilises: 7, ajustement: 0 };
  // 20+
  return { nbUtilises: 8, ajustement: 0 };
}

/**
 * Calcule l'Index WHS à partir d'un tableau de cartes
 * Minimum 3 cartes pour un calcul valide
 */
export function calculerIndexWHS(cartes: CarteScore[]): ResultatHandicap {
  if (cartes.length < 3) {
    return {
      index: 0,
      nbCartesUtilisees: 0,
      differentiels: [],
      differentielsMeilleurs: [],
      nbMeilleursUtilises: 0,
    };
  }

  // Calculer tous les différentiels
  const differentiels = cartes.map((c) => calculerDifferentiel(c));

  // Trier DESC (meilleurs d'abord = plus faibles)
  const differentielsTries = [...differentiels].sort((a, b) => a - b);

  // Obtenir le nombre de meilleurs à utiliser
  const { nbUtilises, ajustement } = getNbMeilleursUtilises(cartes.length);

  // Prendre les N meilleurs
  const differentielsMeilleurs = differentielsTries.slice(0, nbUtilises);

  // Calculer la moyenne
  const somme = differentielsMeilleurs.reduce((a, b) => a + b, 0);
  const moyenne = somme / nbUtilises;

  // Appliquer l'ajustement
  const indexBrut = moyenne + ajustement;

  // Arrondir à 0.1
  const index = Math.round(indexBrut * 10) / 10;

  return {
    index,
    nbCartesUtilisees: cartes.length,
    differentiels: differentielsTries,
    differentielsMeilleurs,
    nbMeilleursUtilises: nbUtilises,
    ajustement: cartes.length < 20 ? ajustement : undefined,
  };
}

/**
 * Calcule le Handicap de jeu (Playing Handicap)
 * = Index × (Slope du parcours / 113) + (SSS − Par)
 */
export function calculerHandicapJeu(
  index: number,
  slope: number,
  sss: number,
  par: number
): number {
  const handicap = index * (slope / SLOPE_STANDARD) + (sss - par);
  return Math.round(handicap);
}

/**
 * Table des noms de métiers de golf (simplifiée)
 */
export const GOLFS_POPULAIRES = [
  { nom: "Le Touquet", sss: 73, slope: 130, par: 72 },
  { nom: "Saint-Cloud", sss: 72, slope: 126, par: 71 },
  { nom: "Morfontaine", sss: 73, slope: 135, par: 72 },
  { nom: "Fontainebleau", sss: 72, slope: 125, par: 72 },
  { nom: "Chantilly", sss: 72, slope: 129, par: 72 },
];
