// Barème de l'impôt sur le revenu (tranches, taux en %), source unique
// partagée entre le composant et la page [params] (cohérence des MAJ annuelles).
export const TRANCHES_IR = [
  { min: 0, max: 11497, taux: 0 },
  { min: 11497, max: 29315, taux: 11 },
  { min: 29315, max: 83823, taux: 30 },
  { min: 83823, max: 180294, taux: 41 },
  { min: 180294, max: Infinity, taux: 45 },
];
