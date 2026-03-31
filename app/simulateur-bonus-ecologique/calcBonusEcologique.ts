// Bonus ecologique automobile 2026 — Bareme officiel

// Seuils RFR par part
export const SEUIL_MODESTE = 16300;
export const SEUIL_INTERMEDIAIRE = 26300;

// Types
export type TypeVehicule = "electrique" | "hydrogene";
export type BatterieEU = "oui" | "non";

export interface ResultatBonus {
  eligible: boolean;
  raisonExclusion: string | null;
  bonusBase: number;
  surbonus: number;
  bonusTotal: number;
  rfrParPart: number;
  prixVehicule: number;
  poidsVehicule: number;
  typeVehicule: TypeVehicule;
  batterieEU: BatterieEU;
  trancheRFR: "modeste" | "intermediaire" | "standard";
  economieCarburant: number; // estimation economie annuelle vs thermique
}

// Bonus base selon RFR par part
function getBonusBase(rfrParPart: number): number {
  if (rfrParPart <= SEUIL_MODESTE) return 5700;
  if (rfrParPart <= SEUIL_INTERMEDIAIRE) return 4700;
  return 3500;
}

// Surbonus batterie europeenne
function getSurbonus(batterieEU: BatterieEU, rfrParPart: number): number {
  if (batterieEU !== "oui") return 0;
  if (rfrParPart <= SEUIL_MODESTE) return 2000;
  if (rfrParPart <= SEUIL_INTERMEDIAIRE) return 1500;
  return 1200;
}

function getTrancheRFR(
  rfrParPart: number
): "modeste" | "intermediaire" | "standard" {
  if (rfrParPart <= SEUIL_MODESTE) return "modeste";
  if (rfrParPart <= SEUIL_INTERMEDIAIRE) return "intermediaire";
  return "standard";
}

// Estimation economie annuelle (15 000 km/an, 7L/100km a 1.80 EUR/L vs 15kWh/100km a 0.20 EUR/L)
function estimerEconomieCarburant(): number {
  const coutThermique = 15000 * 0.07 * 1.8; // 1 890 EUR/an
  const coutElectrique = 15000 * 0.15 * 0.2; // 450 EUR/an
  return Math.round(coutThermique - coutElectrique);
}

export const TRANCHE_LABELS: Record<
  "modeste" | "intermediaire" | "standard",
  string
> = {
  modeste: "Revenus modestes (≤ 16 300 €/part)",
  intermediaire: "Revenus intermediaires (16 301 - 26 300 €/part)",
  standard: "Revenus superieurs (> 26 300 €/part)",
};

export function calcBonusEcologique(
  prixVehicule: number,
  poidsVehicule: number,
  rfrParPart: number,
  typeVehicule: TypeVehicule,
  batterieEU: BatterieEU
): ResultatBonus {
  // Verifier eligibilite
  let raisonExclusion: string | null = null;

  if (typeVehicule !== "electrique" && typeVehicule !== "hydrogene") {
    raisonExclusion =
      "Seuls les vehicules 100% electriques ou hydrogene sont eligibles";
  } else if (prixVehicule > 47000) {
    raisonExclusion = "Le prix du vehicule depasse 47 000 € TTC";
  } else if (poidsVehicule > 2400) {
    raisonExclusion = "Le poids du vehicule depasse 2 400 kg";
  }

  const eligible = raisonExclusion === null;
  const bonusBase = eligible ? getBonusBase(rfrParPart) : 0;
  const surbonus = eligible ? getSurbonus(batterieEU, rfrParPart) : 0;
  const bonusTotal = bonusBase + surbonus;

  return {
    eligible,
    raisonExclusion,
    bonusBase,
    surbonus,
    bonusTotal,
    rfrParPart,
    prixVehicule,
    poidsVehicule,
    typeVehicule,
    batterieEU,
    trancheRFR: getTrancheRFR(rfrParPart),
    economieCarburant: estimerEconomieCarburant(),
  };
}
