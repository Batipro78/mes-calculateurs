// Droits de succession Belgique 2026 - en ligne directe (parents/enfants)
// Sources : SPF Finances, Wikifin, notaire.be, barèmes régionaux 2026

export type RegionBE = "wallonie" | "flandre" | "bruxelles";
export type LienParente = "ligne-directe" | "entre-epoux" | "freres-soeurs" | "autres";

interface Tranche {
  plafond: number;
  taux: number; // %
}

// Bareme ligne directe par region 2026
const BAREMES: Record<RegionBE, Tranche[]> = {
  wallonie: [
    { plafond: 12500, taux: 3 },
    { plafond: 25000, taux: 4 },
    { plafond: 50000, taux: 5 },
    { plafond: 100000, taux: 7 },
    { plafond: 150000, taux: 10 },
    { plafond: 200000, taux: 14 },
    { plafond: 250000, taux: 18 },
    { plafond: 500000, taux: 24 },
    { plafond: Infinity, taux: 30 },
  ],
  bruxelles: [
    { plafond: 50000, taux: 3 },
    { plafond: 100000, taux: 8 },
    { plafond: 175000, taux: 9 },
    { plafond: 250000, taux: 18 },
    { plafond: 500000, taux: 24 },
    { plafond: Infinity, taux: 30 },
  ],
  flandre: [
    { plafond: 50000, taux: 3 },
    { plafond: 250000, taux: 9 },
    { plafond: Infinity, taux: 27 },
  ],
};

// Abattement legal en ligne directe par region
const ABATTEMENTS: Record<RegionBE, number> = {
  wallonie: 12500,
  bruxelles: 15000,
  flandre: 50000, // exoneration sur mobilier pour enfants
};

export interface ResultatSuccession {
  region: RegionBE;
  patrimoine: number;
  nombreHeritiers: number;
  partParHeritier: number;
  abattement: number;
  baseTaxable: number;
  droitsParHeritier: number;
  droitsTotal: number;
  tauxMoyenEffectif: number;
}

function calculerImpotSurMontant(montant: number, region: RegionBE): number {
  if (montant <= 0) return 0;
  const bareme = BAREMES[region];
  let impot = 0;
  let plafondPrecedent = 0;
  let restant = montant;
  for (const tranche of bareme) {
    if (restant <= 0) break;
    const largeur = tranche.plafond - plafondPrecedent;
    const dansCetteTranche = Math.min(restant, largeur);
    impot += dansCetteTranche * (tranche.taux / 100);
    restant -= dansCetteTranche;
    plafondPrecedent = tranche.plafond;
  }
  return impot;
}

export function calculerSuccessionBE(
  patrimoine: number,
  region: RegionBE,
  nombreHeritiers: number,
): ResultatSuccession {
  if (patrimoine <= 0 || nombreHeritiers <= 0) {
    return {
      region,
      patrimoine: 0,
      nombreHeritiers,
      partParHeritier: 0,
      abattement: ABATTEMENTS[region],
      baseTaxable: 0,
      droitsParHeritier: 0,
      droitsTotal: 0,
      tauxMoyenEffectif: 0,
    };
  }

  const abattement = ABATTEMENTS[region];
  const partParHeritier = patrimoine / nombreHeritiers;
  const baseTaxable = Math.max(0, partParHeritier - abattement);
  const droitsParHeritier = calculerImpotSurMontant(baseTaxable, region);
  const droitsTotal = droitsParHeritier * nombreHeritiers;
  const tauxMoyenEffectif = patrimoine > 0 ? (droitsTotal / patrimoine) * 100 : 0;

  return {
    region,
    patrimoine,
    nombreHeritiers,
    partParHeritier,
    abattement,
    baseTaxable,
    droitsParHeritier,
    droitsTotal,
    tauxMoyenEffectif,
  };
}

export function getBaremeRegion(region: RegionBE): Tranche[] {
  return BAREMES[region];
}
