// Barème de l'impôt sur le revenu (tranches, taux en %), source unique
// partagée entre le composant et la page [params] (cohérence des MAJ annuelles).
// Impôt 2026 sur les revenus 2025 (source : service-public.gouv.fr F1419).
export const TRANCHES_IR = [
  { min: 0, max: 11600, taux: 0 },
  { min: 11600, max: 29579, taux: 11 },
  { min: 29579, max: 84577, taux: 30 },
  { min: 84577, max: 181917, taux: 41 },
  { min: 181917, max: Infinity, taux: 45 },
];
