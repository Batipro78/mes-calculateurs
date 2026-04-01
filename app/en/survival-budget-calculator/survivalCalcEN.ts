export type CityZone = "major-metro" | "large-city" | "mid-city" | "rural";
export type Situation = "single" | "couple" | "family";
export type TransportType = "public-transit" | "car";

export const ZONE_LABELS: Record<CityZone, string> = {
  "major-metro": "Major Metro (NYC, SF, LA)",
  "large-city": "Large City (Chicago, Houston, Seattle)",
  "mid-city": "Mid-Size City (Portland, Boise, Des Moines)",
  rural: "Rural America",
};

export const SITUATION_LABELS: Record<Situation, string> = {
  single: "Single",
  couple: "Couple",
  family: "Family (2 adults + 2 kids)",
};

export const TRANSPORT_LABELS: Record<TransportType, string> = {
  "public-transit": "Public Transit",
  car: "Car",
};

// US rent data by zone and situation (monthly, USD)
const RENT: Record<CityZone, Record<Situation, number>> = {
  "major-metro": { single: 1800, couple: 2300, family: 2900 },
  "large-city": { single: 1200, couple: 1550, family: 2000 },
  "mid-city": { single: 850, couple: 1100, family: 1400 },
  rural: { single: 650, couple: 800, family: 1050 },
};

// US grocery costs per month
const FOOD: Record<Situation, number> = {
  single: 350,
  couple: 580,
  family: 900,
};

// US transport costs per month
const TRANSPORT: Record<CityZone, Record<TransportType, number>> = {
  "major-metro": { "public-transit": 130, car: 450 },
  "large-city": { "public-transit": 100, car: 420 },
  "mid-city": { "public-transit": 70, car: 380 },
  rural: { "public-transit": 0, car: 350 },
};

// Other monthly costs by situation
function getOtherCosts(situation: Situation) {
  const base = situation === "family" ? 1.6 : situation === "couple" ? 1.3 : 1;
  return {
    utilities: Math.round(150 * base),       // electricity, gas, water
    telecom: Math.round(90 * base),           // phone + internet
    healthInsurance: Math.round(situation === "single" ? 350 : situation === "couple" ? 600 : 900), // marketplace/ACA
    rentersInsurance: Math.round(15 * base),
    hygiene: Math.round(60 * base),
    emergency: Math.round(100 * base),
  };
}

export interface BudgetLine {
  label: string;
  emoji: string;
  amount: number;
  note: string;
}

export interface SurvivalBudgetResult {
  lines: BudgetLine[];
  total: number;
  federalPovertyLine: number;
  federalMinWage: number;
  snapBenefit: number;
  comparison: string;
}

export function calcSurvivalBudget(
  zone: CityZone,
  situation: Situation,
  transport: TransportType,
): SurvivalBudgetResult {
  const rent = RENT[zone][situation];
  const food = FOOD[situation];
  const transportCost = TRANSPORT[zone][transport];
  const other = getOtherCosts(situation);

  const lines: BudgetLine[] = [
    { label: "Rent + Utilities deposit", emoji: "🏠", amount: rent, note: `${ZONE_LABELS[zone]} average` },
    { label: "Groceries", emoji: "🛒", amount: food, note: "USDA moderate-cost plan" },
    { label: "Transportation", emoji: "🚗", amount: transportCost, note: transport === "car" ? "Gas, insurance, maintenance" : "Monthly transit pass" },
    { label: "Utilities", emoji: "⚡", amount: other.utilities, note: "Electricity, gas, water, trash" },
    { label: "Phone + Internet", emoji: "📱", amount: other.telecom, note: "Cell plan + home internet" },
    { label: "Health Insurance", emoji: "🏥", amount: other.healthInsurance, note: "ACA marketplace (no subsidy)" },
    { label: "Renter's Insurance", emoji: "📋", amount: other.rentersInsurance, note: "Basic liability coverage" },
    { label: "Hygiene & Clothing", emoji: "🧴", amount: other.hygiene, note: "Personal care essentials" },
    { label: "Emergency Fund", emoji: "🆘", amount: other.emergency, note: "Recommended 10% buffer" },
  ];

  const total = lines.reduce((s, l) => s + l.amount, 0);

  // US reference points (2026 estimates)
  const numPeople = situation === "family" ? 4 : situation === "couple" ? 2 : 1;
  const federalPovertyLine = situation === "single" ? 1380 : situation === "couple" ? 1860 : 2840;
  const federalMinWage = Math.round(7.25 * 40 * 4.33); // federal min $7.25/hr
  const snapBenefit = situation === "single" ? 291 : situation === "couple" ? 535 : 939;

  const comparison = total <= federalPovertyLine
    ? "Below the federal poverty line. You would likely qualify for SNAP, Medicaid, and housing assistance."
    : total <= federalMinWage
    ? "At or below federal minimum wage. You may qualify for EITC, SNAP, and ACA subsidies."
    : total <= federalMinWage * 1.5
    ? "Above minimum wage but still tight. You may qualify for ACA premium subsidies."
    : "Above the assistance threshold for most federal programs.";

  return { lines, total, federalPovertyLine, federalMinWage, snapBenefit, comparison };
}
