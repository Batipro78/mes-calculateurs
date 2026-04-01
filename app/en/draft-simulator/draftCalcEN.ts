export type Gender = "male" | "female";
export type MedicalStatus = "fit" | "chronic" | "disability";
export type MilitaryExp = "none" | "registered" | "guard" | "veteran";
export type FamilyStatus = "single" | "married" | "single-parent" | "children3plus";
export type Occupation = "standard" | "healthcare" | "law-enforcement" | "military" | "critical-infra" | "agriculture" | "education";

export const GENDER_LABELS: Record<Gender, string> = { male: "Male", female: "Female" };
export const MEDICAL_LABELS: Record<MedicalStatus, string> = { fit: "Fit for service", chronic: "Chronic condition", disability: "Disability" };
export const MILITARY_LABELS: Record<MilitaryExp, string> = { none: "No military experience", registered: "Selective Service registered", guard: "National Guard / Reserve", veteran: "Veteran" };
export const FAMILY_LABELS: Record<FamilyStatus, string> = { single: "Single / No dependents", married: "Married", "single-parent": "Single parent", children3plus: "3+ children" };
export const OCCUPATION_LABELS: Record<Occupation, string> = {
  standard: "Standard occupation",
  healthcare: "Healthcare worker",
  "law-enforcement": "Law enforcement / First responder",
  military: "Active military / DOD civilian",
  "critical-infra": "Critical infrastructure (energy, water, telecom)",
  agriculture: "Agriculture / Food supply",
  education: "Education / Research",
};

export type DraftCategory = "priority" | "secondary" | "reserve" | "exempt";

export interface DraftResult {
  score: number;
  category: DraftCategory;
  label: string;
  color: string;
  description: string;
  factors: { label: string; points: number; emoji: string }[];
}

export function calcDraftRisk(
  gender: Gender,
  age: number,
  medical: MedicalStatus,
  military: MilitaryExp,
  family: FamilyStatus,
  occupation: Occupation,
): DraftResult {
  const factors: { label: string; points: number; emoji: string }[] = [];

  // Military experience
  if (military === "veteran") { factors.push({ label: "Military veteran", points: 40, emoji: "🎖️" }); }
  else if (military === "guard") { factors.push({ label: "National Guard / Reserve", points: 35, emoji: "🛡️" }); }
  else if (military === "registered") { factors.push({ label: "Selective Service registered", points: 5, emoji: "📋" }); }

  // Age
  if (age >= 18 && age <= 25) { factors.push({ label: `Age ${age} (prime draft age)`, points: 30, emoji: "👤" }); }
  else if (age >= 26 && age <= 35) { factors.push({ label: `Age ${age} (secondary draft pool)`, points: 20, emoji: "👤" }); }
  else if (age >= 36 && age <= 45) { factors.push({ label: `Age ${age} (extended draft pool)`, points: 12, emoji: "👤" }); }
  else if (age >= 46 && age <= 55) { factors.push({ label: `Age ${age} (support roles only)`, points: 5, emoji: "👤" }); }
  else if (age >= 56) { factors.push({ label: `Age ${age} (beyond typical draft range)`, points: 2, emoji: "👤" }); }
  else { factors.push({ label: `Age ${age} (under 18 - not eligible)`, points: 0, emoji: "👤" }); }

  // Gender
  if (gender === "male") { factors.push({ label: "Male (historically drafted)", points: 10, emoji: "♂️" }); }
  else { factors.push({ label: "Female (never drafted in US history)", points: 3, emoji: "♀️" }); }

  // Medical
  if (medical === "chronic") { factors.push({ label: "Chronic condition (possible deferment)", points: -10, emoji: "🏥" }); }
  else if (medical === "disability") { factors.push({ label: "Disability (likely exempt)", points: -25, emoji: "🏥" }); }

  // Occupation
  if (occupation === "military") { factors.push({ label: "Active military/DOD (already serving)", points: 15, emoji: "🏛️" }); }
  else if (occupation === "healthcare") { factors.push({ label: "Healthcare (possible essential deferment)", points: -5, emoji: "⚕️" }); }
  else if (occupation === "law-enforcement") { factors.push({ label: "Law enforcement (possible deferment)", points: -3, emoji: "🚔" }); }
  else if (occupation === "critical-infra") { factors.push({ label: "Critical infrastructure (possible deferment)", points: -5, emoji: "⚡" }); }
  else if (occupation === "agriculture") { factors.push({ label: "Agriculture (possible deferment)", points: -3, emoji: "🌾" }); }

  // Family
  if (family === "single-parent") { factors.push({ label: "Single parent (hardship deferment)", points: -10, emoji: "👨‍👧" }); }
  else if (family === "children3plus") { factors.push({ label: "3+ children (possible deferment)", points: -5, emoji: "👨‍👩‍👧‍👦" }); }

  const score = Math.max(0, Math.min(100, factors.reduce((s, f) => s + f.points, 0)));

  let category: DraftCategory;
  let label: string;
  let color: string;
  let description: string;

  if (score >= 45) {
    category = "priority";
    label = "High Priority";
    color = "#dc2626";
    description = "In a hypothetical draft, you would likely be among the first called. Your military background and/or age profile make you a priority for mobilization.";
  } else if (score >= 25) {
    category = "secondary";
    label = "Secondary Pool";
    color = "#f97316";
    description = "You would be in the second wave of a draft. Called after priority personnel but before the general reserve pool.";
  } else if (score >= 10) {
    category = "reserve";
    label = "Reserve Pool";
    color = "#eab308";
    description = "You would be in the reserve pool, called only in extended mobilization scenarios. Deferment requests would likely be considered.";
  } else {
    category = "exempt";
    label = "Likely Exempt";
    color = "#22c55e";
    description = "Based on your profile, you would likely be exempt or deferred from a draft due to medical, family, or age-related factors.";
  }

  return { score, category, label, color, description, factors };
}
