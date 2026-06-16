import { describe, it, expect } from "vitest";
import { TRANCHES } from "@/app/simulateur-impot-revenu/constants";
import { TRANCHES_IR } from "@/app/simulateur-micro-entreprise/constants";
import {
  TAUX_DROITS,
  TRANCHES_EMOLUMENTS,
} from "@/app/frais-de-notaire/constants";

// Ces tests verrouillent les barèmes mutualisés (chantier dédup). Lors d'une
// mise à jour annuelle, ils forcent à modifier consciemment les valeurs au lieu
// d'introduire une incohérence silencieuse.

describe("barème IR (simulateur-impot-revenu)", () => {
  it("a 5 tranches avec les bons seuils 2026", () => {
    expect(TRANCHES).toHaveLength(5);
    expect(TRANCHES[0]).toMatchObject({ min: 0, max: 11497, taux: 0 });
    expect(TRANCHES[4]).toMatchObject({ min: 180294, max: Infinity, taux: 0.45 });
  });
});

describe("barème IR (micro-entreprise, taux en %)", () => {
  it("partage les mêmes seuils mais des taux en pourcentage", () => {
    expect(TRANCHES_IR).toHaveLength(5);
    expect(TRANCHES_IR[1]).toMatchObject({ min: 11497, taux: 11 });
    expect(TRANCHES_IR[4]).toMatchObject({ max: Infinity, taux: 45 });
  });
});

describe("frais de notaire", () => {
  it("taux de droits de mutation", () => {
    expect(TAUX_DROITS.ancien).toBe(0.05807);
    expect(TAUX_DROITS.neuf).toBe(0.0071);
    expect(TAUX_DROITS.terrain).toBe(0.05807);
  });
  it("barème émoluments (1ère et dernière tranche)", () => {
    expect(TRANCHES_EMOLUMENTS[0]).toMatchObject({ limite: 6500, taux: 0.0387 });
    expect(TRANCHES_EMOLUMENTS.at(-1)).toMatchObject({
      limite: Infinity,
      taux: 0.00799,
    });
  });
});
