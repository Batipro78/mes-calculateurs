// Helper logique pour calcul dividendes Belgique 2026

export const REGIMES_FISCAUX = [
  {
    slug: "standard-30",
    taux: 0.3,
    label: "Standard 30%",
    description:
      "Précompte mobilier standard sur tous dividendes et intérêts (taux normal)",
  },
  {
    slug: "vvprbis-15",
    taux: 0.15,
    label: "VVPRbis 15%",
    description:
      "Régime favori PME : 15% si PME constituée après 2013 avec apport minimum 18 550 EUR",
  },
  {
    slug: "liquidation-6.5",
    taux: 0.065,
    label: "Liquidation 6,5%",
    description:
      "Réserves de liquidation constituées après 2025 et distribuées 3+ ans après",
  },
];

export const EXONERATION_ANNUELLE = 833; // EUR exonérés par an pour personne physique

export interface ResultatDividendes {
  dividendeBrut: number;
  regime: (typeof REGIMES_FISCAUX)[number];
  precompte: number;
  dividendeNet: number;
  exonerationAppliquee: number;
  recuperablePersPhysique: number;
}

/**
 * Calcule les dividendes nets après précompte mobilier belge
 * @param dividendeBrut montant brut en EUR
 * @param regimeSlug slug du régime fiscal
 * @param isPersonnePhysique true si personne physique (exonération possible)
 */
export function calculerDividendesBE(
  dividendeBrut: number,
  regimeSlug: string,
  isPersonnePhysique: boolean = false
): ResultatDividendes {
  const regime = REGIMES_FISCAUX.find((r) => r.slug === regimeSlug);
  if (!regime) {
    throw new Error(`Régime inconnu: ${regimeSlug}`);
  }

  // Précompte brut
  let precompte = dividendeBrut * regime.taux;
  let exonerationAppliquee = 0;

  // Exonération pour personne physique (833 EUR de dividendes exonérés)
  if (isPersonnePhysique && regime.slug === "standard-30") {
    // Exonération sur dividendes bruts
    const exonerationBrute = EXONERATION_ANNUELLE * regime.taux;
    exonerationAppliquee = Math.min(exonerationBrute, precompte);
    precompte = Math.max(0, precompte - exonerationAppliquee);
  }

  const dividendeNet = dividendeBrut - precompte;

  // Montant récupérable via déclaration d'impôt (précompte payé)
  const recuperablePersPhysique = precompte;

  return {
    dividendeBrut,
    regime,
    precompte,
    dividendeNet,
    exonerationAppliquee,
    recuperablePersPhysique,
  };
}
