import { describe, it, expect } from "vitest";
import { fmtEUR_BE, fmtIntBE, fmtPctBE } from "@/app/lib/fmt";

const norm = (s: string) => s.replace(/\s/g, " ");

describe("fmtEUR_BE (2 décimales, fr-BE)", () => {
  it("formate avec virgule décimale", () => {
    expect(fmtEUR_BE(5)).toBe("5,00");
    expect(norm(fmtEUR_BE(1234.5))).toBe("1 234,50");
  });
});

describe("fmtIntBE (arrondi entier, fr-BE)", () => {
  it("arrondit et n'affiche aucune décimale", () => {
    expect(fmtIntBE(5.6)).toBe("6");
    expect(fmtIntBE(5.4)).toBe("5");
    expect(norm(fmtIntBE(1234.4))).toBe("1 234");
  });
});

describe("fmtPctBE (ratio × 100, fr-BE)", () => {
  it("multiplie par 100 et formate à 2 décimales", () => {
    expect(fmtPctBE(0.21)).toBe("21,00");
    expect(fmtPctBE(0.5)).toBe("50,00");
  });
});
