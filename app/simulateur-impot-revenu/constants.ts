// Barème de l'impôt sur le revenu (tranches), source unique partagée entre
// le composant client et la page dynamique [params] pour éviter toute
// désynchronisation lors des mises à jour annuelles.
//
// Impôt 2026 sur les revenus 2025 (loi de finances 2026, revalorisation +0,9 %).
// Source : service-public.gouv.fr F1419 (barème), F34328 (décote), F1989 (abattement).
// A chaque changement de barème :
//  - regenerer le visuel public/images/bareme-impot-revenu-2026.webp (npm run visuels) ;
//  - mettre a jour les textes de page.tsx (tableau, FAQ, etapes) ;
//  - refaire les exemples chiffres de l'article
//    app/comment-connaitre-sa-tranche-imposition/page.tsx : son tableau suit
//    TRANCHES tout seul, mais ses exemples et sa FAQ sont ecrits en dur.
export const TRANCHES = [
  { min: 0, max: 11600, taux: 0 },
  { min: 11600, max: 29579, taux: 0.11 },
  { min: 29579, max: 84577, taux: 0.3 },
  { min: 84577, max: 181917, taux: 0.41 },
  { min: 181917, max: Infinity, taux: 0.45 },
];

// Décote : forfait - 45,25 % de l'impôt brut, si l'impôt brut ne dépasse pas le seuil.
export const DECOTE = {
  taux: 0.4525,
  seul: { seuil: 1982, forfait: 897 },
  couple: { seuil: 3277, forfait: 1483 },
};

// Déduction forfaitaire de 10 % pour frais professionnels (par déclarant).
export const ABATTEMENT_10 = { min: 509, max: 14555 };
