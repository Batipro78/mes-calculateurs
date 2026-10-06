// Taxe sur les plus-values immobilieres elevees (au-dela de 50 000 EUR de
// plus-value imposable a l'IR), de 2 % a 6 % avec lissage entre les tranches.
// Bareme : BOFiP BOI-RFPI-TPVIE-20 (verifie le 05/10/2026).
// Partagee par le calculateur et ses pages par montant.
export function taxePlusValueElevee(pv: number): number {
  if (pv <= 50000) return 0;
  if (pv <= 60000) return 0.02 * pv - (60000 - pv) / 20;
  if (pv <= 100000) return 0.02 * pv;
  if (pv <= 110000) return 0.03 * pv - (110000 - pv) / 10;
  if (pv <= 150000) return 0.03 * pv;
  if (pv <= 160000) return 0.04 * pv - (160000 - pv) * 0.15;
  if (pv <= 200000) return 0.04 * pv;
  if (pv <= 210000) return 0.05 * pv - (210000 - pv) * 0.2;
  if (pv <= 250000) return 0.05 * pv;
  if (pv <= 260000) return 0.06 * pv - (260000 - pv) * 0.25;
  return 0.06 * pv;
}
