// Reduction d'impot DOM (refaction outre-mer) — art. 197-I-3 du CGI
// Source : BOFiP BOI-IR-LIQ-20-30-10
// Plafonds inchanges depuis imposition des revenus 2018 (loi de finances 2019)

export type TerritoireDOM =
  | "guadeloupe"
  | "martinique"
  | "reunion"
  | "guyane"
  | "mayotte";

export interface ParamsReductionDOM {
  territoire: TerritoireDOM;
  impotBareme: number; // impot issu du bareme progressif avant refaction (en EUR)
}

export interface ResultatReductionDOM {
  territoire: TerritoireDOM;
  taux: number; // 0.30 ou 0.40
  plafond: number; // 2450 ou 4050
  reductionTheorique: number; // taux * impotBareme
  reductionAppliquee: number; // min(reductionTheorique, plafond)
  impotApresRefaction: number; // impotBareme - reductionAppliquee
  tauxBaisseEffectif: number; // reductionAppliquee / impotBareme * 100 (en %)
  plafondAtteint: boolean;
  // Tableau comparatif
  impotMetropole: number; // 0 (pas de refaction)
  impotZone30: number; // simulation avec taux 30% plafond 2450
  impotZone40: number; // simulation avec taux 40% plafond 4050
}

// Configuration par territoire
const CONFIG: Record<TerritoireDOM, { taux: number; plafond: number }> = {
  guadeloupe: { taux: 0.30, plafond: 2450 },
  martinique: { taux: 0.30, plafond: 2450 },
  reunion:    { taux: 0.30, plafond: 2450 },
  guyane:     { taux: 0.40, plafond: 4050 },
  mayotte:    { taux: 0.40, plafond: 4050 },
};

export const LABELS_TERRITOIRE: Record<TerritoireDOM, string> = {
  guadeloupe: "Guadeloupe",
  martinique: "Martinique",
  reunion:    "La Reunion",
  guyane:     "Guyane",
  mayotte:    "Mayotte",
};

export function calculerReductionDOM(p: ParamsReductionDOM): ResultatReductionDOM {
  const { taux, plafond } = CONFIG[p.territoire];
  const impot = Math.max(0, p.impotBareme);

  const reductionTheorique = taux * impot;
  const reductionAppliquee = Math.min(reductionTheorique, plafond);
  const impotApresRefaction = impot - reductionAppliquee;
  const tauxBaisseEffectif = impot > 0 ? (reductionAppliquee / impot) * 100 : 0;
  const plafondAtteint = reductionTheorique > plafond;

  // Comparatif
  const red30 = Math.min(0.30 * impot, 2450);
  const red40 = Math.min(0.40 * impot, 4050);

  return {
    territoire: p.territoire,
    taux,
    plafond,
    reductionTheorique,
    reductionAppliquee,
    impotApresRefaction,
    tauxBaisseEffectif,
    plafondAtteint,
    impotMetropole: impot,
    impotZone30: impot - red30,
    impotZone40: impot - red40,
  };
}

export function fmtEur(n: number): string {
  return Math.round(n).toLocaleString("fr-FR") + " EUR";
}

export function fmtPct(n: number): string {
  return n.toFixed(1).replace(".", ",") + " %";
}

// Pour les pages dynamiques : parse un slug territoire-impot-XXXX-euros
export function parseSlugDOM(slug: string): { territoire: TerritoireDOM; impot: number } | null {
  const TERRITOIRES: TerritoireDOM[] = ["guadeloupe", "martinique", "reunion", "guyane", "mayotte"];
  const IMPOTS_VALIDES = [3000, 6000, 12000];

  const match = slug.match(/^(guadeloupe|martinique|reunion|guyane|mayotte)-impot-(\d+)-euros$/);
  if (!match) return null;

  const territoire = match[1] as TerritoireDOM;
  const impot = parseInt(match[2], 10);

  if (!TERRITOIRES.includes(territoire)) return null;
  if (!IMPOTS_VALIDES.includes(impot)) return null;

  return { territoire, impot };
}
