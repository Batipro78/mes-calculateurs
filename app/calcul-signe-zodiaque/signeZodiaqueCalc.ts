// Calcul du signe zodiaque occidental (tropical) et traits astrologiques
// Basé sur l'astrologie occidentale classique

export type Signe =
  | "belier"
  | "taureau"
  | "gemeaux"
  | "cancer"
  | "lion"
  | "vierge"
  | "balance"
  | "scorpion"
  | "sagittaire"
  | "capricorne"
  | "verseau"
  | "poissons";

export type Element = "Feu" | "Terre" | "Air" | "Eau";
export type Mode = "Cardinal" | "Fixe" | "Mutable";

export interface SigneInfo {
  id: Signe;
  nom: string;
  symbole: string;
  emoji: string;
  element: Element;
  mode: Mode;
  planete: string;
  dateDebut: string;
  dateFin: string;
  traits: string[];
  pierre: string;
}

export interface ResultatSigne {
  signe: Signe;
  info: SigneInfo;
  date: Date;
}

// Les 12 signes du zodiaque occidental (tropical)
export const SIGNES: Record<Signe, SigneInfo> = {
  belier: {
    id: "belier",
    nom: "Bélier",
    symbole: "♈",
    emoji: "🐏",
    element: "Feu",
    mode: "Cardinal",
    planete: "Mars",
    dateDebut: "21 mars",
    dateFin: "19 avril",
    traits: [
      "Dynamique et impulsif",
      "Courageux et pionnier",
      "Compétitif et ambitieux",
      "Indépendant et direct",
    ],
    pierre: "Diamant rouge",
  },
  taureau: {
    id: "taureau",
    nom: "Taureau",
    symbole: "♉",
    emoji: "🐂",
    element: "Terre",
    mode: "Fixe",
    planete: "Vénus",
    dateDebut: "20 avril",
    dateFin: "20 mai",
    traits: [
      "Stable et fiable",
      "Sensuel et gourmand",
      "Déterminé et persévérant",
      "Appréciste la beauté et le confort",
    ],
    pierre: "Émeraude",
  },
  gemeaux: {
    id: "gemeaux",
    nom: "Gémeaux",
    symbole: "♊",
    emoji: "👯",
    element: "Air",
    mode: "Mutable",
    planete: "Mercure",
    dateDebut: "21 mai",
    dateFin: "20 juin",
    traits: [
      "Curieux et communicatif",
      "Polyvalent et adaptable",
      "Intellectuel et spirituel",
      "Parfois dispersé",
    ],
    pierre: "Agate",
  },
  cancer: {
    id: "cancer",
    nom: "Cancer",
    symbole: "♋",
    emoji: "🦀",
    element: "Eau",
    mode: "Cardinal",
    planete: "Lune",
    dateDebut: "21 juin",
    dateFin: "22 juillet",
    traits: [
      "Intuitif et émotionnel",
      "Protecteur et familial",
      "Sentimental et sensible",
      "Fidèle aux proches",
    ],
    pierre: "Pierre de lune",
  },
  lion: {
    id: "lion",
    nom: "Lion",
    symbole: "♌",
    emoji: "🦁",
    element: "Feu",
    mode: "Fixe",
    planete: "Soleil",
    dateDebut: "23 juillet",
    dateFin: "22 août",
    traits: [
      "Charismatique et généreux",
      "Créatif et appréciste les honneurs",
      "Ambitieux et orgueilleux",
      "Aime être au centre de l&apos;attention",
    ],
    pierre: "Or",
  },
  vierge: {
    id: "vierge",
    nom: "Vierge",
    symbole: "♍",
    emoji: "👩",
    element: "Terre",
    mode: "Mutable",
    planete: "Mercure",
    dateDebut: "23 août",
    dateFin: "22 septembre",
    traits: [
      "Méticuleux et analytique",
      "Modeste et perfectionniste",
      "Pratique et méthodique",
      "Critique avec lui-même et les autres",
    ],
    pierre: "Jaspe rouge",
  },
  balance: {
    id: "balance",
    nom: "Balance",
    symbole: "♎",
    emoji: "⚖️",
    element: "Air",
    mode: "Cardinal",
    planete: "Vénus",
    dateDebut: "23 septembre",
    dateFin: "22 octobre",
    traits: [
      "Diplomate et sociable",
      "Esthète et appréciste l&apos;harmonie",
      "Indécis mais juste",
      "Charme et équilibre",
    ],
    pierre: "Jade",
  },
  scorpion: {
    id: "scorpion",
    nom: "Scorpion",
    symbole: "♏",
    emoji: "🦂",
    element: "Eau",
    mode: "Fixe",
    planete: "Pluton / Mars",
    dateDebut: "23 octobre",
    dateFin: "21 novembre",
    traits: [
      "Intense et passionné",
      "Mystérieux et magnétique",
      "Transformateur et résistant",
      "Possessif mais loyal",
    ],
    pierre: "Obsidienne",
  },
  sagittaire: {
    id: "sagittaire",
    nom: "Sagittaire",
    symbole: "♐",
    emoji: "🏹",
    element: "Feu",
    mode: "Mutable",
    planete: "Jupiter",
    dateDebut: "22 novembre",
    dateFin: "21 décembre",
    traits: [
      "Aventurier et optimiste",
      "Libre et philosophe",
      "Honnête et enthousiaste",
      "Aime voyager et explorer",
    ],
    pierre: "Topaze bleue",
  },
  capricorne: {
    id: "capricorne",
    nom: "Capricorne",
    symbole: "♑",
    emoji: "🐐",
    element: "Terre",
    mode: "Cardinal",
    planete: "Saturne",
    dateDebut: "22 décembre",
    dateFin: "19 janvier",
    traits: [
      "Ambitieux et discipliné",
      "Sérieux et persévérant",
      "Pragmatique et responsable",
      "Aime les défis et le prestige",
    ],
    pierre: "Grenat",
  },
  verseau: {
    id: "verseau",
    nom: "Verseau",
    symbole: "♒",
    emoji: "🏺",
    element: "Air",
    mode: "Fixe",
    planete: "Uranus / Saturne",
    dateDebut: "20 janvier",
    dateFin: "18 février",
    traits: [
      "Original et indépendant",
      "Humaniste et visionnaire",
      "Intellectuel et excentrique",
      "Détaché mais bienveillant",
    ],
    pierre: "Améthyste",
  },
  poissons: {
    id: "poissons",
    nom: "Poissons",
    symbole: "♓",
    emoji: "🐟",
    element: "Eau",
    mode: "Mutable",
    planete: "Neptune / Jupiter",
    dateDebut: "19 février",
    dateFin: "20 mars",
    traits: [
      "Rêveur et empathique",
      "Artistique et imaginatif",
      "Sensible et intuitif",
      "Fuyant et idéaliste",
    ],
    pierre: "Aigue-marine",
  },
};

// Dates de transition des signes (jour/mois)
const DATES_SIGNES: Array<{
  signe: Signe;
  debut: [number, number];
  fin: [number, number];
}> = [
  { signe: "belier", debut: [3, 21], fin: [4, 19] },
  { signe: "taureau", debut: [4, 20], fin: [5, 20] },
  { signe: "gemeaux", debut: [5, 21], fin: [6, 20] },
  { signe: "cancer", debut: [6, 21], fin: [7, 22] },
  { signe: "lion", debut: [7, 23], fin: [8, 22] },
  { signe: "vierge", debut: [8, 23], fin: [9, 22] },
  { signe: "balance", debut: [9, 23], fin: [10, 22] },
  { signe: "scorpion", debut: [10, 23], fin: [11, 21] },
  { signe: "sagittaire", debut: [11, 22], fin: [12, 21] },
  { signe: "capricorne", debut: [12, 22], fin: [1, 19] },
  { signe: "verseau", debut: [1, 20], fin: [2, 18] },
  { signe: "poissons", debut: [2, 19], fin: [3, 20] },
];

export function calculerSigne(date: Date): ResultatSigne {
  const mois = date.getMonth() + 1;
  const jour = date.getDate();

  let signeId: Signe = "belier";

  for (const { signe, debut, fin } of DATES_SIGNES) {
    const [mDebut, jDebut] = debut;
    const [mFin, jFin] = fin;

    // Cas normal (debut et fin dans la même année)
    if (mDebut <= mFin) {
      if (
        (mois === mDebut && jour >= jDebut) ||
        (mois > mDebut && mois < mFin) ||
        (mois === mFin && jour <= jFin)
      ) {
        signeId = signe;
        break;
      }
    }
    // Cas Capricorne (traverse l'année)
    else {
      if ((mois === mDebut && jour >= jDebut) || (mois === mFin && jour <= jFin)) {
        signeId = signe;
        break;
      }
    }
  }

  return {
    signe: signeId,
    info: SIGNES[signeId],
    date,
  };
}

// Informations par élément
export const ELEMENTS_INFO: Record<
  Element,
  { emoji: string; couleur: string; traits: string[] }
> = {
  Feu: {
    emoji: "🔥",
    couleur: "from-red-600 to-orange-700",
    traits: [
      "Passion et dynamisme",
      "Enthousiasme et créativité",
      "Courage et transformation",
      "Action et liberté",
    ],
  },
  Terre: {
    emoji: "🌍",
    couleur: "from-amber-600 to-yellow-700",
    traits: [
      "Stabilité et fiabilité",
      "Praticité et enracinement",
      "Matérialité et sagesse",
      "Patience et persévérance",
    ],
  },
  Air: {
    emoji: "💨",
    couleur: "from-cyan-600 to-blue-700",
    traits: [
      "Intellect et communication",
      "Légèreté et flexibilité",
      "Socialité et curiosité",
      "Abstraction et idées",
    ],
  },
  Eau: {
    emoji: "💧",
    couleur: "from-blue-600 to-cyan-700",
    traits: [
      "Émotions et intuition",
      "Sensibilité et adaptabilité",
      "Profondeur et mystère",
      "Empathie et fluidité",
    ],
  },
};

// Informations par mode
export const MODES_INFO: Record<
  Mode,
  { traits: string[]; signes: string[] }
> = {
  Cardinal: {
    traits: [
      "Initiative et leadership",
      "Début de saison",
      "Action directe",
      "Prise de décision rapide",
    ],
    signes: ["Bélier", "Cancer", "Balance", "Capricorne"],
  },
  Fixe: {
    traits: [
      "Stabilité et détermination",
      "Milieu de saison",
      "Persistance et loyauté",
      "Résistance au changement",
    ],
    signes: ["Taureau", "Lion", "Scorpion", "Verseau"],
  },
  Mutable: {
    traits: [
      "Adaptabilité et flexibilité",
      "Fin de saison",
      "Communication et curiosité",
      "Transition et changement",
    ],
    signes: ["Gémeaux", "Vierge", "Sagittaire", "Poissons"],
  },
};

// Planètes associées aux signes
export const PLANETES_INFO: Record<
  string,
  { emoji: string; signification: string }
> = {
  Mars: {
    emoji: "♂️",
    signification: "Énergie, passion, action, combativité",
  },
  Vénus: {
    emoji: "♀️",
    signification: "Amour, beauté, plaisir, harmonie",
  },
  Mercure: {
    emoji: "☿️",
    signification: "Communication, intellect, expression",
  },
  Lune: {
    emoji: "🌙",
    signification: "Émotions, intuition, inconscient",
  },
  Soleil: {
    emoji: "☀️",
    signification: "Essence, identité, volonté, énergie vitale",
  },
  Pluton: {
    emoji: "♇",
    signification: "Transformation, mort, pouvoir, régénération",
  },
  Jupiter: {
    emoji: "♃",
    signification: "Expansion, chance, sagesse, générosité",
  },
  Saturne: {
    emoji: "♄",
    signification: "Discipline, limitation, temps, karma",
  },
  Uranus: {
    emoji: "♅",
    signification: "Innovation, rébellion, futur, modernité",
  },
  Neptune: {
    emoji: "♆",
    signification: "Rêves, illusion, spiritualité, instinct",
  },
};
