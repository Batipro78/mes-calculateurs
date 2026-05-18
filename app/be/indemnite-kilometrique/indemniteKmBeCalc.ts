export interface ResultatIndemniteKm {
  distance: number;
  taux: number;
  montant: number;
  regime: string;
}

export const TAUX_INDEMNITE = {
  trimestrielle: 0.4326,
  annuelle: 0.4449,
  fonctionnaire: 0.4477,
  fraisReels: 0.15,
};

export const REGIMES_INDEMNITE = [
  {
    slug: "trimestrielle",
    label: "Trimestrielle (01/01-31/03/2026)",
    taux: TAUX_INDEMNITE.trimestrielle,
    desc: "Taux indexe au 1er trimestre 2026 (janvier-mars)",
  },
  {
    slug: "annuelle",
    label: "Annuelle (01/07/2025-30/06/2026)",
    taux: TAUX_INDEMNITE.annuelle,
    desc: "Taux indexe sur la periode 01/07/2025 - 30/06/2026",
  },
  {
    slug: "fonctionnaire",
    label: "Fonctionnaire (secteur public)",
    taux: TAUX_INDEMNITE.fonctionnaire,
    desc: "Taux applique aux fonctionnaires belgres",
  },
  {
    slug: "fraisReels",
    label: "Frais reels (forfait fiscal)",
    taux: TAUX_INDEMNITE.fraisReels,
    desc: "Forfait fiscal pour declaration d'impot (employes)",
  },
];

export function calculerIndemniteKm(
  distance: number,
  regime: string
): ResultatIndemniteKm {
  const regimeData = REGIMES_INDEMNITE.find((r) => r.slug === regime);
  if (!regimeData) {
    throw new Error(`Regime invalide: ${regime}`);
  }

  const montant = distance * regimeData.taux;

  return {
    distance,
    taux: regimeData.taux,
    montant,
    regime: regimeData.label,
  };
}
