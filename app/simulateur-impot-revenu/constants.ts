// Barème de l'impôt sur le revenu (tranches), source unique partagée entre
// le composant client et la page dynamique [params] pour éviter toute
// désynchronisation lors des mises à jour annuelles.
export const TRANCHES = [
  { min: 0, max: 11497, taux: 0 },
  { min: 11497, max: 29315, taux: 0.11 },
  { min: 29315, max: 83823, taux: 0.3 },
  { min: 83823, max: 180294, taux: 0.41 },
  { min: 180294, max: Infinity, taux: 0.45 },
];
