// Types
export type HousingType = "apartment" | "house" | "mobile-home";
export type HeatingType = "all-electric" | "natural-gas" | "wood" | "hybrid";
export type CookingType = "electric" | "gas" | "hybrid";
export type WaterHeaterType = "electric" | "gas" | "solar";
export type PrepLevel = "essential" | "comfort" | "autonomous";

export const HOUSING_LABELS: Record<HousingType, string> = {
  apartment: "Apartment",
  house: "House",
  "mobile-home": "Mobile Home",
};

export const HEATING_LABELS: Record<HeatingType, string> = {
  "all-electric": "All Electric",
  "natural-gas": "Natural Gas",
  wood: "Wood / Pellet Stove",
  hybrid: "Hybrid (gas + electric)",
};

export const COOKING_LABELS: Record<CookingType, string> = {
  electric: "Electric / Induction",
  gas: "Gas",
  hybrid: "Hybrid",
};

export const WATER_HEATER_LABELS: Record<WaterHeaterType, string> = {
  electric: "Electric Tank",
  gas: "Gas Water Heater",
  solar: "Solar / Heat Pump",
};

export const LEVEL_LABELS: Record<PrepLevel, string> = {
  essential: "Essential",
  comfort: "Comfort",
  autonomous: "Autonomous",
};

export interface EmergencyEquipment {
  id: string;
  name: string;
  emoji: string;
  priceMin: number;
  priceMax: number;
  autonomyH: number;
  category: "lighting" | "communication" | "food" | "water" | "energy" | "thermal";
  level: PrepLevel;
  perPerson: boolean;
}

export const EQUIPMENT: EmergencyEquipment[] = [
  { id: "flashlights", name: "Flashlights + candles", emoji: "🔦", priceMin: 15, priceMax: 35, autonomyH: 0, category: "lighting", level: "essential", perPerson: false },
  { id: "radio", name: "Battery / crank radio (NOAA)", emoji: "📻", priceMin: 25, priceMax: 50, autonomyH: 0, category: "communication", level: "essential", perPerson: false },
  { id: "powerbank", name: "Power bank 20,000 mAh", emoji: "🔋", priceMin: 25, priceMax: 55, autonomyH: 36, category: "communication", level: "essential", perPerson: false },
  { id: "water-reserve", name: "Water reserve (5 gal/person)", emoji: "💧", priceMin: 10, priceMax: 25, autonomyH: 72, category: "water", level: "essential", perPerson: true },
  { id: "dry-food", name: "Dry food supply (3 days)", emoji: "🥫", priceMin: 35, priceMax: 60, autonomyH: 72, category: "food", level: "essential", perPerson: true },
  { id: "blankets", name: "Emergency blankets", emoji: "🧣", priceMin: 5, priceMax: 12, autonomyH: 0, category: "thermal", level: "essential", perPerson: true },
  { id: "camp-stove", name: "Camping stove (propane)", emoji: "🔥", priceMin: 35, priceMax: 60, autonomyH: 168, category: "food", level: "comfort", perPerson: false },
  { id: "food-7d", name: "7-day food supply", emoji: "📦", priceMin: 90, priceMax: 140, autonomyH: 168, category: "food", level: "comfort", perPerson: true },
  { id: "station-500", name: "Portable power station 500Wh", emoji: "☀️", priceMin: 450, priceMax: 900, autonomyH: 48, category: "energy", level: "comfort", perPerson: false },
  { id: "station-1000", name: "Portable power station 1000Wh+", emoji: "⚡", priceMin: 900, priceMax: 1700, autonomyH: 96, category: "energy", level: "autonomous", perPerson: false },
  { id: "generator", name: "Portable generator 3500W", emoji: "🏭", priceMin: 700, priceMax: 1400, autonomyH: 336, category: "energy", level: "autonomous", perPerson: false },
  { id: "solar-panels", name: "Portable solar panels 200W", emoji: "🔆", priceMin: 220, priceMax: 450, autonomyH: 0, category: "energy", level: "autonomous", perPerson: false },
];

function getBaseHeatingAutonomy(heating: HeatingType): number {
  switch (heating) {
    case "all-electric": return 0;
    case "natural-gas": return 168;
    case "wood": return 336;
    case "hybrid": return 72;
  }
}

function getBaseCookingAutonomy(cooking: CookingType): number {
  switch (cooking) {
    case "electric": return 0;
    case "gas": return 168;
    case "hybrid": return 72;
  }
}

function getBaseWaterHeaterAutonomy(waterHeater: WaterHeaterType): number {
  switch (waterHeater) {
    case "electric": return 0;
    case "gas": return 168;
    case "solar": return 48;
  }
}

export interface ScoreDetail {
  category: string;
  label: string;
  score: number;
  max: number;
  autonomyH: number;
  emoji: string;
}

export interface ScoreResult {
  totalScore: number;
  autonomyDurationH: number;
  details: ScoreDetail[];
  vulnerabilities: string[];
  strengths: string[];
  level: "critical" | "fragile" | "decent" | "prepared";
}

export function calcAutonomyScore(
  heating: HeatingType,
  cooking: CookingType,
  waterHeater: WaterHeaterType,
  numPeople: number,
  equipment: string[],
): ScoreResult {
  const details: ScoreDetail[] = [];
  const vulnerabilities: string[] = [];
  const strengths: string[] = [];

  // --- Heating ---
  let scoreHeating = 0;
  const baseHeating = getBaseHeatingAutonomy(heating);
  if (baseHeating > 0) {
    scoreHeating += 15;
    strengths.push(`${HEATING_LABELS[heating]} heating: works without electricity`);
  } else {
    vulnerabilities.push("All-electric heating: immediate loss during power outage");
  }
  if (equipment.includes("blankets")) scoreHeating += 5;
  if (equipment.includes("station-1000") || equipment.includes("generator")) scoreHeating += 5;
  details.push({ category: "heating", label: "Heating", score: Math.min(scoreHeating, 25), max: 25, autonomyH: baseHeating, emoji: "🌡️" });

  // --- Food ---
  let scoreFood = 0;
  let autoFoodH = 4;
  const baseCooking = getBaseCookingAutonomy(cooking);
  if (baseCooking > 0) {
    scoreFood += 8;
    strengths.push("Gas cooking: you can cook without electricity");
  } else {
    vulnerabilities.push("Electric/induction cooking: cannot cook without backup equipment");
  }
  if (equipment.includes("camp-stove")) { scoreFood += 5; autoFoodH = Math.max(autoFoodH, 168); }
  if (equipment.includes("dry-food")) { scoreFood += 6; autoFoodH = Math.max(autoFoodH, 72); }
  if (equipment.includes("food-7d")) { scoreFood += 6; autoFoodH = Math.max(autoFoodH, 168); }
  if (!equipment.includes("dry-food") && !equipment.includes("food-7d")) {
    vulnerabilities.push("No food reserve: dependent on fresh groceries");
  }
  details.push({ category: "food", label: "Food", score: Math.min(scoreFood, 25), max: 25, autonomyH: autoFoodH, emoji: "🍽️" });

  // --- Water ---
  let scoreWater = 0;
  let autoWaterH = 24;
  if (equipment.includes("water-reserve")) { scoreWater += 12; autoWaterH = 72; }
  else { vulnerabilities.push("No water reserve: critical risk during extended outage"); }
  const baseWaterHeater = getBaseWaterHeaterAutonomy(waterHeater);
  if (baseWaterHeater > 24) { scoreWater += 3; }
  details.push({ category: "water", label: "Water", score: Math.min(scoreWater, 15), max: 15, autonomyH: autoWaterH, emoji: "💧" });

  // --- Lighting ---
  let scoreLighting = 0;
  let autoLightingH = 0;
  if (equipment.includes("flashlights")) { scoreLighting += 10; autoLightingH = 168; strengths.push("Flashlights/candles: lighting covered"); }
  else { vulnerabilities.push("No backup lighting source"); }
  details.push({ category: "lighting", label: "Lighting", score: Math.min(scoreLighting, 10), max: 10, autonomyH: autoLightingH, emoji: "💡" });

  // --- Communication ---
  let scoreComm = 0;
  let autoCommH = 12;
  if (equipment.includes("powerbank")) { scoreComm += 7; autoCommH += 36; }
  if (equipment.includes("radio")) { scoreComm += 8; strengths.push("NOAA radio: access to official emergency info without cell service"); }
  else { vulnerabilities.push("No radio: risk of information blackout if cell towers go down"); }
  details.push({ category: "communication", label: "Communication", score: Math.min(scoreComm, 15), max: 15, autonomyH: autoCommH, emoji: "📡" });

  // --- Backup Energy ---
  let scoreEnergy = 0;
  if (equipment.includes("station-500")) { scoreEnergy += 5; }
  if (equipment.includes("station-1000")) { scoreEnergy += 7; }
  if (equipment.includes("generator")) { scoreEnergy += 8; strengths.push("Generator: near-complete energy autonomy"); }
  if (equipment.includes("solar-panels")) { scoreEnergy += 3; }
  details.push({ category: "energy", label: "Backup Energy", score: Math.min(scoreEnergy, 10), max: 10, autonomyH: 0, emoji: "⚡" });

  const totalScore = details.reduce((sum, d) => sum + d.score, 0);

  const criticalDurations = [
    baseHeating > 0 ? baseHeating : (equipment.includes("blankets") ? 72 : 6),
    autoFoodH,
    autoWaterH,
  ];
  const autonomyDurationH = Math.min(...criticalDurations);

  const peopleFactor = numPeople > 1 ? Math.max(0.5, 1 - (numPeople - 1) * 0.1) : 1;
  const adjustedDuration = Math.round(autonomyDurationH * peopleFactor);

  const level: ScoreResult["level"] =
    totalScore >= 70 ? "prepared" :
    totalScore >= 45 ? "decent" :
    totalScore >= 25 ? "fragile" : "critical";

  return { totalScore, autonomyDurationH: adjustedDuration, details, vulnerabilities, strengths, level };
}

export interface BudgetItem {
  equipment: EmergencyEquipment;
  estimatedPrice: number;
  alreadyOwned: boolean;
}

export interface BudgetResult {
  items: BudgetItem[];
  totalNew: number;
  totalOwned: number;
  toInvest: number;
}

export function calcEquipmentBudget(
  level: PrepLevel,
  numPeople: number,
  ownedEquipment: string[],
): BudgetResult {
  const includedLevels: PrepLevel[] =
    level === "essential" ? ["essential"] :
    level === "comfort" ? ["essential", "comfort"] :
    ["essential", "comfort", "autonomous"];

  const filteredEquipment = EQUIPMENT.filter((e) => {
    if (!includedLevels.includes(e.level)) return false;
    if (level === "comfort" || level === "autonomous") {
      if (e.id === "dry-food") return false;
    }
    if (level === "autonomous" && e.id === "station-500") return false;
    return true;
  });

  const items: BudgetItem[] = filteredEquipment.map((eq) => {
    const multiplier = eq.perPerson ? numPeople : 1;
    const avgPrice = Math.round((eq.priceMin + eq.priceMax) / 2);
    return {
      equipment: eq,
      estimatedPrice: avgPrice * multiplier,
      alreadyOwned: ownedEquipment.includes(eq.id),
    };
  });

  const totalNew = items.reduce((s, i) => s + i.estimatedPrice, 0);
  const totalOwned = items.filter((i) => i.alreadyOwned).reduce((s, i) => s + i.estimatedPrice, 0);

  return {
    items,
    totalNew,
    totalOwned,
    toInvest: totalNew - totalOwned,
  };
}
