/**
 * Helpers de formatage numérique (locale fr-FR), factorisés.
 *
 * Avant : chaque calculateur redéfinissait sa propre fonction `fmt()`.
 * Problème : des fonctions portant le MÊME nom faisaient des choses
 * DIFFÉRENTES (2 décimales, 0 décimale, 6 décimales…). On expose donc
 * des helpers EXPLICITES par comportement, pour éviter toute ambiguïté.
 *
 * Migration sûre : dans un fichier qui utilisait `fmt` à 2 décimales,
 * remplacer la définition locale par
 *   import { fmtEUR as fmt } from "@/app/lib/fmt";
 * Les appels existants (`fmt(x)`) restent inchangés.
 */

/** 2 décimales fixes — ex: 1 234,50 (montants en euros, taux, etc.). */
export function fmtEUR(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Entier sans décimale — ex: 1 235. */
export function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 });
}

/** Nombre de décimales configurable (fixes). Par défaut 2. */
export function fmtDec(n: number, digits = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

/* --- Variantes belges (locale fr-BE) pour les calculateurs /be --- */

/** 2 décimales fixes, format belge — ex: 1.234,50. */
export function fmtEUR_BE(n: number): string {
  return n.toLocaleString("fr-BE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Entier arrondi, format belge — ex: 1.235. */
export function fmtIntBE(n: number): string {
  return Math.round(n).toLocaleString("fr-BE");
}

/** Pourcentage (ratio × 100) à 2 décimales, format belge — ex: 0,21 -> 21,00. */
export function fmtPctBE(n: number): string {
  return (n * 100).toLocaleString("fr-BE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/* --- Variantes anglaises / USD (pages /en) --- */

/** Montant en dollars US sans décimale — ex: $1,235. */
export function fmtUSD(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

/** Nombre au format anglais (en-US) — ex: 1,234.5. */
export function fmtNumberUS(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}
