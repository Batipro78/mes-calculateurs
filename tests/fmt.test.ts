import { describe, it, expect } from "vitest";
import { fmtEUR, fmtInt, fmtDec } from "@/app/lib/fmt";

// On normalise les espaces : fr-FR utilise une espace fine insécable (U+202F)
// comme séparateur de milliers selon la version d'ICU.
const norm = (s: string) => s.replace(/\s/g, " ");

describe("fmtEUR (2 décimales)", () => {
  it("formate avec 2 décimales fixes", () => {
    expect(fmtEUR(5)).toBe("5,00");
    expect(fmtEUR(3.5)).toBe("3,50");
  });
  it("ajoute le séparateur de milliers", () => {
    expect(norm(fmtEUR(1234.5))).toBe("1 234,50");
  });
});

describe("fmtInt (entier)", () => {
  it("arrondit et n'affiche aucune décimale", () => {
    expect(norm(fmtInt(1234.6))).toBe("1 235");
    expect(fmtInt(42)).toBe("42");
  });
});

describe("fmtDec (décimales configurables)", () => {
  it("respecte le nombre de décimales demandé", () => {
    expect(fmtDec(3.14159, 2)).toBe("3,14");
    expect(fmtDec(3.1, 3)).toBe("3,100");
  });
});
