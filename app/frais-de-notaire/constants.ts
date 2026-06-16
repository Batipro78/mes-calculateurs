// Données fiscales des frais de notaire, source unique partagée entre le
// composant et la page [params] (cohérence des MAJ annuelles).

// Droits de mutation par type de bien.
export const TAUX_DROITS = {
  ancien: 0.05807, // ~5.81% (taux plein majorite departements)
  neuf: 0.0071, // ~0.71% (taxe publicite fonciere)
  terrain: 0.05807,
};

// Bareme emoluments notaire 2026 (proportionnels, par tranches).
export const TRANCHES_EMOLUMENTS = [
  { limite: 6500, taux: 0.0387 },
  { limite: 17000, taux: 0.01596 },
  { limite: 60000, taux: 0.01064 },
  { limite: Infinity, taux: 0.00799 },
];
