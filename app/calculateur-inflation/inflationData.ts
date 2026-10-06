// Inflation annuelle en France : evolution annuelle MOYENNE de l'indice des prix
// a la consommation (IPC), en %. Source unique pour le calculateur, ses pages
// par montant et son visuel (scripts/visuels).
// Source : Insee, « L'essentiel sur... l'inflation », tableau « Evolution annuelle
// moyenne de l'indice des prix a la consommation » (champ : France hors Mayotte,
// ensemble des menages) — https://www.insee.fr/fr/statistiques/4268033
// Verifie le 05/10/2026. A completer chaque mi-janvier, quand l'Insee publie la
// moyenne de l'annee ecoulee.
export const INFLATION_FR: Record<number, number> = {
  2000: 1.7, 2001: 1.6, 2002: 1.9, 2003: 2.1, 2004: 2.1,
  2005: 1.8, 2006: 1.7, 2007: 1.5, 2008: 2.8, 2009: 0.1,
  2010: 1.5, 2011: 2.1, 2012: 2.0, 2013: 0.9, 2014: 0.5,
  2015: 0.0, 2016: 0.2, 2017: 1.0, 2018: 1.9, 2019: 1.1,
  2020: 0.5, 2021: 1.6, 2022: 5.2, 2023: 4.9, 2024: 2.0,
  2025: 0.9,
};

// Derniere annee complete publiee par l'Insee.
export const DERNIERE_ANNEE = Math.max(...Object.keys(INFLATION_FR).map(Number));
