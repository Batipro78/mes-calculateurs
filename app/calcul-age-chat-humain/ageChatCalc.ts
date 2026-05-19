export type PhaseChat = "chaton" | "junior" | "adulte" | "senior" | "super-senior" | "venerable";
export type Environnement = "interieur" | "exterieur" | "mixte";

export interface PhaseInfo {
  id: PhaseChat;
  nom: string;
  ageChatMin: number;
  ageChatMax: number;
  ageHumainEquivalent: string;
  description: string;
  conseilsSante: string;
  emoji: string;
}

export interface ResultatAgeChat {
  ageChat: number;
  ageHumain: number;
  phase: PhaseChat;
  phaseInfo: PhaseInfo;
  esperanceVieRestante: string;
  environnement: Environnement;
}

export const PHASES_CHAT: PhaseInfo[] = [
  {
    id: "chaton",
    nom: "Chaton",
    ageChatMin: 0,
    ageChatMax: 0.5,
    ageHumainEquivalent: "0-10 ans",
    description: "Croissance rapide et apprentissage",
    conseilsSante: "Vaccinations, vermifugation, stérilisation/castration dès 4-5 mois",
    emoji: "🐱",
  },
  {
    id: "junior",
    nom: "Junior",
    ageChatMin: 0.5,
    ageChatMax: 2,
    ageHumainEquivalent: "11-24 ans",
    description: "Adolescent à jeune adulte, très actif",
    conseilsSante: "Visite annuelle, transition alimentation adulte, jeux et enrichissement",
    emoji: "😺",
  },
  {
    id: "adulte",
    nom: "Adulte",
    ageChatMin: 3,
    ageChatMax: 6,
    ageHumainEquivalent: "28-40 ans",
    description: "Pleine forme physique et stabilité comportementale",
    conseilsSante: "Bilan annuel, surveillance du poids, alimentation équilibrée",
    emoji: "🐈",
  },
  {
    id: "senior",
    nom: "Sénior",
    ageChatMin: 7,
    ageChatMax: 10,
    ageHumainEquivalent: "44-56 ans",
    description: "Début du vieillissement, moins d'activité",
    conseilsSante: "Bilan biannuel, dépistage maladies rénales et thyroïdiennes, alimentation senior",
    emoji: "😻",
  },
  {
    id: "super-senior",
    nom: "Super-Sénior",
    ageChatMin: 11,
    ageChatMax: 14,
    ageHumainEquivalent: "60-72 ans",
    description: "Vieillissement avancé, ralentissement métabolique",
    conseilsSante: "Suivi vétérinaire renforcé (tous les 6 mois), alimentation adaptée, confort physique",
    emoji: "😸",
  },
  {
    id: "venerable",
    nom: "Vénérable",
    ageChatMin: 15,
    ageChatMax: 99,
    ageHumainEquivalent: "76+ ans",
    description: "Âge très avancé, vigilance accrue nécessaire",
    conseilsSante: "Suivi mensuel à trimestriel, surveillance déclin cognitif, adaptation du cadre de vie",
    emoji: "🐱‍👴",
  },
];

export function calculerAgeChat(ageChat: number, environnement: Environnement = "interieur"): ResultatAgeChat {
  // Formule AAFP (American Association of Feline Practitioners)
  // 1ère année = 15 ans humain
  // 2ème année = +9 ans (total 24 ans à 2 ans)
  // À partir de 3 ans = +4 ans par année
  let ageHumain = 0;

  if (ageChat <= 0) {
    ageHumain = 0;
  } else if (ageChat <= 1) {
    ageHumain = 15 * ageChat;
  } else if (ageChat <= 2) {
    ageHumain = 15 + 9 * (ageChat - 1);
  } else {
    ageHumain = 24 + 4 * (ageChat - 2);
  }

  // Déterminer la phase actuelle
  const phase = PHASES_CHAT.find((p) => ageChat >= p.ageChatMin && ageChat <= p.ageChatMax) || PHASES_CHAT[5];

  // Espérance de vie restante selon environnement
  // Chat d'intérieur : 13-17 ans (moyenne 15-16)
  // Chat d'extérieur : 5-7 ans (moyenne 6)
  // Chat mixte : ~12 ans (moyenne)
  const esperanceMax = environnement === "interieur" ? 16 : environnement === "exterieur" ? 7 : 12;
  const restant = Math.max(esperanceMax - ageChat, 0);
  const esperanceVieRestante = `~${restant.toFixed(1)} ans (${environnement})`;

  return {
    ageChat,
    ageHumain: Math.round(ageHumain),
    phase: phase.id,
    phaseInfo: phase,
    esperanceVieRestante,
    environnement,
  };
}

export function getPhaseColor(phase: PhaseChat): string {
  const colors: Record<PhaseChat, string> = {
    chaton: "from-amber-300 to-orange-400",
    junior: "from-orange-400 to-orange-500",
    adulte: "from-orange-500 to-red-500",
    senior: "from-amber-600 to-orange-700",
    "super-senior": "from-amber-700 to-orange-800",
    venerable: "from-gray-600 to-amber-800",
  };
  return colors[phase] || "from-orange-400 to-amber-600";
}
