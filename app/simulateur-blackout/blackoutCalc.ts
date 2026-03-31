// Types
export type LogementType = "appartement" | "maison";
export type ChauffageType = "tout-electrique" | "gaz" | "bois" | "mixte";
export type CuisineType = "electrique" | "gaz" | "mixte";
export type EauChaudeType = "electrique" | "gaz" | "solaire";
export type NiveauPreparation = "essentiel" | "confort" | "autonome";

export const LOGEMENT_LABELS: Record<LogementType, string> = {
  appartement: "Appartement",
  maison: "Maison",
};

export const CHAUFFAGE_LABELS: Record<ChauffageType, string> = {
  "tout-electrique": "Tout electrique",
  gaz: "Gaz",
  bois: "Bois / Poele",
  mixte: "Mixte (gaz + elec)",
};

export const CUISINE_LABELS: Record<CuisineType, string> = {
  electrique: "Electrique / Induction",
  gaz: "Gaz",
  mixte: "Mixte",
};

export const EAU_CHAUDE_LABELS: Record<EauChaudeType, string> = {
  electrique: "Ballon electrique",
  gaz: "Chauffe-eau gaz",
  solaire: "Solaire / Thermodynamique",
};

export const NIVEAU_LABELS: Record<NiveauPreparation, string> = {
  essentiel: "Essentiel",
  confort: "Confort",
  autonome: "Autonome",
};

// Equipements de secours
export interface EquipementSecours {
  id: string;
  nom: string;
  emoji: string;
  prixMin: number;
  prixMax: number;
  autonomieH: number; // heures d'autonomie ajoutees (0 = illimite dans sa categorie)
  categorie: "eclairage" | "communication" | "alimentation" | "eau" | "energie" | "thermique";
  niveau: NiveauPreparation; // niveau minimum recommande
  parPersonne: boolean; // prix multiplie par nb personnes
}

export const EQUIPEMENTS: EquipementSecours[] = [
  { id: "lampes", nom: "Lampes torche + bougies", emoji: "🔦", prixMin: 15, prixMax: 30, autonomieH: 0, categorie: "eclairage", niveau: "essentiel", parPersonne: false },
  { id: "radio", nom: "Radio a piles / dynamo", emoji: "📻", prixMin: 20, prixMax: 40, autonomieH: 0, categorie: "communication", niveau: "essentiel", parPersonne: false },
  { id: "powerbank", nom: "Powerbank 20 000 mAh", emoji: "🔋", prixMin: 25, prixMax: 50, autonomieH: 36, categorie: "communication", niveau: "essentiel", parPersonne: false },
  { id: "reserve-eau", nom: "Reserve d'eau (20L/pers)", emoji: "💧", prixMin: 10, prixMax: 20, autonomieH: 72, categorie: "eau", niveau: "essentiel", parPersonne: true },
  { id: "nourriture-seche", nom: "Reserve alimentaire seche (3j)", emoji: "🥫", prixMin: 30, prixMax: 50, autonomieH: 72, categorie: "alimentation", niveau: "essentiel", parPersonne: true },
  { id: "couvertures", nom: "Couvertures de survie", emoji: "🧣", prixMin: 5, prixMax: 10, autonomieH: 0, categorie: "thermique", niveau: "essentiel", parPersonne: true },
  { id: "rechaud", nom: "Rechaud camping gaz", emoji: "🔥", prixMin: 30, prixMax: 50, autonomieH: 168, categorie: "alimentation", niveau: "confort", parPersonne: false },
  { id: "nourriture-7j", nom: "Reserve alimentaire 7 jours", emoji: "📦", prixMin: 80, prixMax: 120, autonomieH: 168, categorie: "alimentation", niveau: "confort", parPersonne: true },
  { id: "station-500", nom: "Station solaire 500Wh", emoji: "☀️", prixMin: 400, prixMax: 800, autonomieH: 48, categorie: "energie", niveau: "confort", parPersonne: false },
  { id: "station-1000", nom: "Station solaire 1000Wh+", emoji: "⚡", prixMin: 800, prixMax: 1500, autonomieH: 96, categorie: "energie", niveau: "autonome", parPersonne: false },
  { id: "groupe-electrogene", nom: "Groupe electrogene 3500W", emoji: "🏭", prixMin: 600, prixMax: 1200, autonomieH: 336, categorie: "energie", niveau: "autonome", parPersonne: false },
  { id: "panneaux-portables", nom: "Panneaux solaires portables 200W", emoji: "🔆", prixMin: 200, prixMax: 400, autonomieH: 0, categorie: "energie", niveau: "autonome", parPersonne: false },
];

// Score par categorie (max points)
const SCORE_CATEGORIES = {
  chauffage: 25,
  alimentation: 25,
  eau: 15,
  eclairage: 10,
  communication: 15,
  energie: 10,
};

// Autonomie de base (heures) selon config logement
function getAutonomieBaseChauffage(chauffage: ChauffageType): number {
  switch (chauffage) {
    case "tout-electrique": return 0;
    case "gaz": return 168; // 7 jours
    case "bois": return 336; // 14 jours (stock bois)
    case "mixte": return 72; // 3 jours gaz
  }
}

function getAutonomieBaseCuisine(cuisine: CuisineType): number {
  switch (cuisine) {
    case "electrique": return 0;
    case "gaz": return 168;
    case "mixte": return 72;
  }
}

function getAutonomieBaseEauChaude(eauChaude: EauChaudeType): number {
  switch (eauChaude) {
    case "electrique": return 0; // cumulus = quelques heures d'eau chaude restante
    case "gaz": return 168;
    case "solaire": return 48; // depend du soleil
  }
}

export interface ScoreDetail {
  categorie: string;
  label: string;
  score: number;
  max: number;
  autonomieH: number;
  emoji: string;
}

export interface ScoreResult {
  scoreTotal: number;
  dureeAutonomieH: number;
  details: ScoreDetail[];
  vulnerabilites: string[];
  forces: string[];
  niveau: "critique" | "fragile" | "correct" | "prepare";
}

export function calcScoreAutonomie(
  chauffage: ChauffageType,
  cuisine: CuisineType,
  eauChaude: EauChaudeType,
  nbPersonnes: number,
  equipements: string[],
): ScoreResult {
  const details: ScoreDetail[] = [];
  const vulnerabilites: string[] = [];
  const forces: string[] = [];

  // --- Chauffage ---
  let scoreChauffage = 0;
  const autoBaseChauffage = getAutonomieBaseChauffage(chauffage);
  if (autoBaseChauffage > 0) {
    scoreChauffage += 15;
    forces.push(`Chauffage ${CHAUFFAGE_LABELS[chauffage].toLowerCase()} : fonctionne sans electricite`);
  } else {
    vulnerabilites.push("Chauffage 100% electrique : perte immediate en cas de coupure");
  }
  if (equipements.includes("couvertures")) scoreChauffage += 5;
  if (equipements.includes("station-1000") || equipements.includes("groupe-electrogene")) scoreChauffage += 5;
  details.push({ categorie: "chauffage", label: "Chauffage", score: Math.min(scoreChauffage, 25), max: 25, autonomieH: autoBaseChauffage, emoji: "🌡️" });

  // --- Alimentation ---
  let scoreAlim = 0;
  let autoAlimH = 4; // frigo tient ~4h
  const autoBaseCuisine = getAutonomieBaseCuisine(cuisine);
  if (autoBaseCuisine > 0) {
    scoreAlim += 8;
    forces.push("Cuisine au gaz : vous pouvez cuisiner sans electricite");
  } else {
    vulnerabilites.push("Cuisine electrique/induction : impossible de cuisiner sans equipement");
  }
  if (equipements.includes("rechaud")) { scoreAlim += 5; autoAlimH = Math.max(autoAlimH, 168); }
  if (equipements.includes("nourriture-seche")) { scoreAlim += 6; autoAlimH = Math.max(autoAlimH, 72); }
  if (equipements.includes("nourriture-7j")) { scoreAlim += 6; autoAlimH = Math.max(autoAlimH, 168); }
  if (!equipements.includes("nourriture-seche") && !equipements.includes("nourriture-7j")) {
    vulnerabilites.push("Pas de reserve alimentaire : dependant des courses fraiches");
  }
  details.push({ categorie: "alimentation", label: "Alimentation", score: Math.min(scoreAlim, 25), max: 25, autonomieH: autoAlimH, emoji: "🍽️" });

  // --- Eau ---
  let scoreEau = 0;
  let autoEauH = 24; // on a toujours un peu d'eau courante au debut
  if (equipements.includes("reserve-eau")) { scoreEau += 12; autoEauH = 72; }
  else { vulnerabilites.push("Pas de reserve d'eau : risque critique si coupure prolongee"); }
  const autoEauChaude = getAutonomieBaseEauChaude(eauChaude);
  if (autoEauChaude > 24) { scoreEau += 3; }
  details.push({ categorie: "eau", label: "Eau", score: Math.min(scoreEau, 15), max: 15, autonomieH: autoEauH, emoji: "💧" });

  // --- Eclairage ---
  let scoreEclairage = 0;
  let autoEclairageH = 0;
  if (equipements.includes("lampes")) { scoreEclairage += 10; autoEclairageH = 168; forces.push("Lampes/bougies : eclairage assure"); }
  else { vulnerabilites.push("Pas de source d'eclairage de secours"); }
  details.push({ categorie: "eclairage", label: "Eclairage", score: Math.min(scoreEclairage, 10), max: 10, autonomieH: autoEclairageH, emoji: "💡" });

  // --- Communication ---
  let scoreComm = 0;
  let autoCommH = 12; // batterie telephone de base
  if (equipements.includes("powerbank")) { scoreComm += 7; autoCommH += 36; }
  if (equipements.includes("radio")) { scoreComm += 8; forces.push("Radio : acces a l'information officielle sans reseau"); }
  else { vulnerabilites.push("Pas de radio : risque d'isolement informationnel si reseau mobile tombe"); }
  details.push({ categorie: "communication", label: "Communication", score: Math.min(scoreComm, 15), max: 15, autonomieH: autoCommH, emoji: "📡" });

  // --- Energie de secours ---
  let scoreEnergie = 0;
  if (equipements.includes("station-500")) { scoreEnergie += 5; }
  if (equipements.includes("station-1000")) { scoreEnergie += 7; }
  if (equipements.includes("groupe-electrogene")) { scoreEnergie += 8; forces.push("Groupe electrogene : autonomie energetique quasi-complete"); }
  if (equipements.includes("panneaux-portables")) { scoreEnergie += 3; }
  details.push({ categorie: "energie", label: "Energie secours", score: Math.min(scoreEnergie, 10), max: 10, autonomieH: 0, emoji: "⚡" });

  // Score total
  const scoreTotal = details.reduce((sum, d) => sum + d.score, 0);

  // Duree d'autonomie = minimum des categories critiques (chauffage, alimentation, eau)
  const dureesCritiques = [
    autoBaseChauffage > 0 ? autoBaseChauffage : (equipements.includes("couvertures") ? 72 : 6),
    autoAlimH,
    autoEauH,
  ];
  const dureeAutonomieH = Math.min(...dureesCritiques);

  // Facteur personnes : plus il y a de monde, plus les reserves partent vite
  const facteurPersonnes = nbPersonnes > 1 ? Math.max(0.5, 1 - (nbPersonnes - 1) * 0.1) : 1;
  const dureeAjustee = Math.round(dureeAutonomieH * facteurPersonnes);

  const niveau: ScoreResult["niveau"] =
    scoreTotal >= 70 ? "prepare" :
    scoreTotal >= 45 ? "correct" :
    scoreTotal >= 25 ? "fragile" : "critique";

  return { scoreTotal, dureeAutonomieH: dureeAjustee, details, vulnerabilites, forces, niveau };
}

export interface BudgetItem {
  equipement: EquipementSecours;
  prixEstime: number;
  dejaAcquis: boolean;
}

export interface BudgetResult {
  items: BudgetItem[];
  totalNeuf: number;
  totalDejaAcquis: number;
  aInvestir: number;
}

export function calcBudgetEquipement(
  niveau: NiveauPreparation,
  nbPersonnes: number,
  equipementsAcquis: string[],
): BudgetResult {
  const niveauxInclus: NiveauPreparation[] =
    niveau === "essentiel" ? ["essentiel"] :
    niveau === "confort" ? ["essentiel", "confort"] :
    ["essentiel", "confort", "autonome"];

  // Pour autonome, on prend soit station-1000 soit groupe-electrogene (pas les deux)
  const equipementsFiltres = EQUIPEMENTS.filter((e) => {
    if (!niveauxInclus.includes(e.niveau)) return false;
    // Eviter doublons nourriture
    if (niveau === "confort" || niveau === "autonome") {
      if (e.id === "nourriture-seche") return false; // remplace par nourriture-7j
    }
    // Pour autonome, garder groupe-electrogene, pas station-500
    if (niveau === "autonome" && e.id === "station-500") return false;
    return true;
  });

  const items: BudgetItem[] = equipementsFiltres.map((eq) => {
    const multiplicateur = eq.parPersonne ? nbPersonnes : 1;
    const prixMoyen = Math.round((eq.prixMin + eq.prixMax) / 2);
    return {
      equipement: eq,
      prixEstime: prixMoyen * multiplicateur,
      dejaAcquis: equipementsAcquis.includes(eq.id),
    };
  });

  const totalNeuf = items.reduce((s, i) => s + i.prixEstime, 0);
  const totalDejaAcquis = items.filter((i) => i.dejaAcquis).reduce((s, i) => s + i.prixEstime, 0);

  return {
    items,
    totalNeuf,
    totalDejaAcquis,
    aInvestir: totalNeuf - totalDejaAcquis,
  };
}
