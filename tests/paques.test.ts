import { describe, it, expect } from "vitest";
import { paquesGregorien } from "@/app/calcul-date-paques/paquesCalc";

// Dates de Pâques occidentale (grégorienne) vérifiables indépendamment.
// getMonth() est 0-indexé : 2 = mars, 3 = avril.
describe("paquesGregorien", () => {
  const cas = [
    { annee: 2024, mois: 2, jour: 31 }, // 31 mars 2024
    { annee: 2025, mois: 3, jour: 20 }, // 20 avril 2025
    { annee: 2026, mois: 3, jour: 5 }, //  5 avril 2026
    { annee: 2027, mois: 2, jour: 28 }, // 28 mars 2027
  ];
  for (const { annee, mois, jour } of cas) {
    it(`Pâques ${annee}`, () => {
      const d = paquesGregorien(annee);
      expect(d.getFullYear()).toBe(annee);
      expect(d.getMonth()).toBe(mois);
      expect(d.getDate()).toBe(jour);
    });
  }
});
