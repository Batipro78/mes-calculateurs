export type BunkerType = "basic" | "standard" | "nbc" | "luxury";
export type DurationType = "2-weeks" | "1-month" | "3-months" | "6-months" | "1-year" | "2-years";

export const BUNKER_TYPES: { id: BunkerType; name: string; pricePerSqFt: number; emoji: string; desc: string }[] = [
  { id: "basic", name: "Basic", pricePerSqFt: 150, emoji: "🏗️", desc: "Concrete walls, basic ventilation, no filtration" },
  { id: "standard", name: "Standard", pricePerSqFt: 300, emoji: "🛡️", desc: "Reinforced concrete, filtered air, water storage" },
  { id: "nbc", name: "NBC Protected", pricePerSqFt: 550, emoji: "☢️", desc: "Nuclear/Biological/Chemical filtration, blast doors" },
  { id: "luxury", name: "Luxury", pricePerSqFt: 1000, emoji: "💎", desc: "Full amenities, hydroponics, medical bay, armory" },
];

export const DURATIONS: { id: DurationType; label: string; days: number }[] = [
  { id: "2-weeks", label: "2 weeks", days: 14 },
  { id: "1-month", label: "1 month", days: 30 },
  { id: "3-months", label: "3 months", days: 90 },
  { id: "6-months", label: "6 months", days: 180 },
  { id: "1-year", label: "1 year", days: 365 },
  { id: "2-years", label: "2 years", days: 730 },
];

export interface BunkerResult {
  livingSqFt: number;
  storageSqFt: number;
  totalSqFt: number;
  constructionCost: number;
  waterCost: number;
  foodCost: number;
  equipmentCost: number;
  totalCost: number;
  waterGallons: number;
  foodCalories: number;
}

export function calcBunkerCost(
  bunkerType: BunkerType,
  numPeople: number,
  durationId: DurationType,
): BunkerResult {
  const type = BUNKER_TYPES.find((t) => t.id === bunkerType)!;
  const duration = DURATIONS.find((d) => d.id === durationId)!;

  // Living space: 80 sq ft per person minimum + 100 sq ft common area
  const livingSqFt = numPeople * 80 + 100;
  // Storage: depends on duration
  const storageSqFt = Math.round(
    duration.days <= 30 ? numPeople * 15 :
    duration.days <= 90 ? numPeople * 30 :
    duration.days <= 180 ? numPeople * 50 :
    numPeople * 80
  );
  const totalSqFt = livingSqFt + storageSqFt;

  const constructionCost = totalSqFt * type.pricePerSqFt;

  // Water: 1 gallon per person per day
  const waterGallons = numPeople * 1 * duration.days;
  const waterCost = Math.round(waterGallons * 0.50); // $0.50/gallon stored water

  // Food: 2000 kcal per person per day, ~$10/person/day for long-term storage food
  const foodCalories = numPeople * 2000 * duration.days;
  const foodCost = Math.round(numPeople * 10 * duration.days);

  // Equipment: ~25% of construction cost (air filtration, generator, comms, medical)
  const equipmentCost = Math.round(constructionCost * 0.25);

  const totalCost = constructionCost + waterCost + foodCost + equipmentCost;

  return {
    livingSqFt,
    storageSqFt,
    totalSqFt,
    constructionCost,
    waterCost,
    foodCost,
    equipmentCost,
    totalCost,
    waterGallons,
    foodCalories,
  };
}
