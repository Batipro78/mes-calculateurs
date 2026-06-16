import { describe, it, expect } from "vitest";
import {
  calculer1RM,
  arrondirAuPlate,
} from "@/app/calcul-1rm/oneRepMaxCalc";

describe("calculer1RM", () => {
  it("applique les formules standard (100 kg × 1 rep)", () => {
    const r = calculer1RM(100, 1);
    // Brzycki : 100 / (1.0278 - 0.0278×1) = 100 / 1.0 = 100
    expect(r.brzycki).toBe(100);
    // Epley : 100 × (1 + 1/30) = 103,33 -> 103,3
    expect(r.epley).toBe(103.3);
    // O'Connor : 100 × (1 + 0.025×1) = 102,5
    expect(r.oconnor).toBe(102.5);
  });

  it("Epley pour 100 kg × 10 reps = 133,3", () => {
    expect(calculer1RM(100, 10).epley).toBe(133.3);
  });

  it("renvoie des zéros pour des entrées invalides", () => {
    expect(calculer1RM(0, 5).epley).toBe(0);
    expect(calculer1RM(100, 0).epley).toBe(0);
    expect(calculer1RM(100, 101).epley).toBe(0);
  });
});

describe("arrondirAuPlate", () => {
  it("arrondit au multiple de 2,5 kg", () => {
    expect(arrondirAuPlate(101, 2.5)).toBe(100);
    expect(arrondirAuPlate(103.7, 2.5)).toBe(102.5);
    expect(arrondirAuPlate(104, 2.5)).toBe(105);
  });
});
