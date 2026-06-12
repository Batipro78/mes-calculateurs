// Calcul octroi de mer DOM (Guadeloupe, Martinique, Guyane, La Reunion, Mayotte)
// Base legale : loi n° 2004-639 du 2 juillet 2004
// Reforme : loi n° 2026-103 du 19 fevrier 2026, applicables au 1er juillet 2026

export type Territoire = "guadeloupe" | "martinique" | "guyane" | "la-reunion" | "mayotte";

export interface ParamsOctroiMer {
  territoire: Territoire;
  valeurCAF: number;       // valeur CAF de la marchandise en EUR
  tauxOM: number;          // taux octroi de mer en % (0-60)
  tauxOMR: number;         // taux octroi de mer regional en % (0-2.5)
  tauxTVA: number;         // taux TVA en % (auto selon territoire, modifiable)
}

export interface ResultatOctroiMer {
  octroiDeMer: number;     // valeur x tauxOM
  omr: number;             // valeur x tauxOMR
  tva: number;             // valeur x tauxTVA (OM n'entre PAS dans la base TVA)
  totalTaxes: number;      // OM + OMR + TVA
  coutRendu: number;       // valeur + totalTaxes
  majorationPct: number;   // totalTaxes / valeur * 100
}

// TVA par defaut selon territoire
// Guadeloupe / Martinique / La Reunion : 8,5 % (taux normal DOM)
// Guyane / Mayotte : 0 % (TVA provisoirement non applicable)
export const TVA_PAR_TERRITOIRE: Record<Territoire, number> = {
  guadeloupe: 8.5,
  martinique: 8.5,
  "la-reunion": 8.5,
  guyane: 0,
  mayotte: 0,
};

export const LABEL_TERRITOIRE: Record<Territoire, string> = {
  guadeloupe: "Guadeloupe",
  martinique: "Martinique",
  "la-reunion": "La Reunion",
  guyane: "Guyane",
  mayotte: "Mayotte",
};

export function calculerOctroiMer(p: ParamsOctroiMer): ResultatOctroiMer {
  const octroiDeMer = p.valeurCAF * (p.tauxOM / 100);
  const omr = p.valeurCAF * (p.tauxOMR / 100);
  // L'octroi de mer n'entre PAS dans la base d'imposition de la TVA (art. 267 et 292 du CGI)
  const tva = p.valeurCAF * (p.tauxTVA / 100);
  const totalTaxes = octroiDeMer + omr + tva;
  const coutRendu = p.valeurCAF + totalTaxes;
  const majorationPct = p.valeurCAF > 0 ? (totalTaxes / p.valeurCAF) * 100 : 0;

  return {
    octroiDeMer,
    omr,
    tva,
    totalTaxes,
    coutRendu,
    majorationPct,
  };
}

export function fmtEur(n: number): string {
  return Math.round(n).toLocaleString("fr-FR") + " EUR";
}

export function fmtPct(n: number): string {
  return n.toFixed(2).replace(".", ",") + " %";
}
