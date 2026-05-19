// Calcul du signe astrologique chinois et élément Wu Xing
// Basé sur la tradition luni-solaire chinoise

export type Animal =
  | "Rat"
  | "Buffle"
  | "Tigre"
  | "Lapin"
  | "Dragon"
  | "Serpent"
  | "Cheval"
  | "Chèvre"
  | "Singe"
  | "Coq"
  | "Chien"
  | "Cochon";

export type Element = "Bois" | "Feu" | "Terre" | "Métal" | "Eau";

export interface AnimalInfo {
  nom: Animal;
  emoji: string;
  traits: string[];
  couleur: string;
}

export interface ResultatSigneChinois {
  animal: Animal;
  element: Element;
  combinaison: string;
  animalInfo: AnimalInfo;
  anneeNaissance: number;
  anneeChinoise: number;
  anneeNouvellun: number;
}

// 12 animaux du zodiaque chinois avec traits
export const ANIMAUX: Record<Animal, AnimalInfo> = {
  Rat: {
    nom: "Rat",
    emoji: "🐀",
    traits: [
      "Sociable et charmeur",
      "Curieux et observateur",
      "Intelligent et rapide",
      "Fidèle aux proches",
    ],
    couleur: "#8B4513",
  },
  Buffle: {
    nom: "Buffle",
    emoji: "🐂",
    traits: [
      "Travailleur et patient",
      "Fiable et honnête",
      "Stable et déterminé",
      "Généreux avec la famille",
    ],
    couleur: "#6B4423",
  },
  Tigre: {
    nom: "Tigre",
    emoji: "🐯",
    traits: [
      "Courageux et charismatique",
      "Autoritaire mais juste",
      "Généreux et protecteur",
      "Passionné et énergique",
    ],
    couleur: "#FF6B35",
  },
  Lapin: {
    nom: "Lapin",
    emoji: "🐰",
    traits: [
      "Diplomate et paisible",
      "Élégant et raffiné",
      "Sensible et compatissant",
      "Déteste les conflits",
    ],
    couleur: "#9370DB",
  },
  Dragon: {
    nom: "Dragon",
    emoji: "🐉",
    traits: [
      "Charismatique et ambitieux",
      "Fier et confiant",
      "Créatif et visionnaire",
      "Aime le défi et l&apos;aventure",
    ],
    couleur: "#DC143C",
  },
  Serpent: {
    nom: "Serpent",
    emoji: "🐍",
    traits: [
      "Sage et intuitif",
      "Mystérieux et énigmatique",
      "Réfléchi et stratégique",
      "Charismatique et séduisant",
    ],
    couleur: "#228B22",
  },
  Cheval: {
    nom: "Cheval",
    emoji: "🐴",
    traits: [
      "Indépendant et libre",
      "Énergique et actif",
      "Optimiste et positif",
      "Aime voyager et explorer",
    ],
    couleur: "#CD853F",
  },
  Chèvre: {
    nom: "Chèvre",
    emoji: "🐐",
    traits: [
      "Artistique et créatif",
      "Gentille et douce",
      "Créative et sensible",
      "Aime l&apos;harmonie et la beauté",
    ],
    couleur: "#DDA0DD",
  },
  Singe: {
    nom: "Singe",
    emoji: "🐵",
    traits: [
      "Intelligent et malicieux",
      "Curieux et explorateur",
      "Amusant et divertissant",
      "Adaptable et flexible",
    ],
    couleur: "#FFD700",
  },
  Coq: {
    nom: "Coq",
    emoji: "🐓",
    traits: [
      "Honnête et direct",
      "Perfectionniste et soigneux",
      "Fier et courageux",
      "Travailleur et responsable",
    ],
    couleur: "#FF4500",
  },
  Chien: {
    nom: "Chien",
    emoji: "🐕",
    traits: [
      "Loyal et fidèle",
      "Juste et intègre",
      "Protecteur et dévoué",
      "Sincère et honnête",
    ],
    couleur: "#8B4513",
  },
  Cochon: {
    nom: "Cochon",
    emoji: "🐷",
    traits: [
      "Sincère et généreux",
      "Optimiste et positif",
      "Gentil et compassionnant",
      "Aime les plaisirs simples",
    ],
    couleur: "#FFB6C1",
  },
};

// Éléments Wu Xing avec traits
export const ELEMENTS: Record<Element, { emoji: string; traits: string[] }> = {
  Bois: {
    emoji: "🌿",
    traits: [
      "Croissance",
      "Création",
      "Flexibilité",
      "Renouvellement",
      "Générosité",
    ],
  },
  Feu: {
    emoji: "🔥",
    traits: [
      "Passion",
      "Dynamisme",
      "Enthousiasme",
      "Transformation",
      "Liberté",
    ],
  },
  Terre: {
    emoji: "🌍",
    traits: [
      "Stabilité",
      "Fiabilité",
      "Équilibre",
      "Sagesse",
      "Fondation",
    ],
  },
  Métal: {
    emoji: "⚙️",
    traits: [
      "Rigueur",
      "Clarté",
      "Précision",
      "Force",
      "Détermination",
    ],
  },
  Eau: {
    emoji: "💧",
    traits: [
      "Sagesse",
      "Communication",
      "Fluidité",
      "Adaptabilité",
      "Intuition",
    ],
  },
};

// Table des Nouveaux Ans Lunaires
export const NOUVEL_AN_CHINOIS: Record<number, [number, number]> = {
  2020: [1, 25],
  2021: [2, 12],
  2022: [2, 1],
  2023: [1, 22],
  2024: [2, 10],
  2025: [1, 29],
  2026: [2, 17],
  2027: [2, 6],
  2028: [1, 26],
  2029: [2, 13],
  2030: [2, 3],
  2031: [1, 23],
  2032: [2, 11],
  2033: [1, 31],
  2034: [2, 19],
  2035: [2, 8],
};

function getAnimalIndex(annee: number): number {
  return (annee - 4) % 12;
}

function getElementIndex(annee: number): number {
  return Math.floor(((annee - 4) % 10) / 2);
}

function getCycleIndex(annee: number): number {
  return (annee - 4) % 60;
}

function isBeforeChineseNewYear(date: Date): boolean {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const newYearDate = NOUVEL_AN_CHINOIS[year];
  if (!newYearDate) {
    return false;
  }

  const [newYearMonth, newYearDay] = newYearDate;

  if (month < newYearMonth) return true;
  if (month === newYearMonth && day < newYearDay) return true;
  return false;
}

export function calculerSigneChinois(
  dateNaissance: Date
): ResultatSigneChinois {
  let anneeNaissance = dateNaissance.getFullYear();
  let anneeChinoise = anneeNaissance;

  if (isBeforeChineseNewYear(dateNaissance)) {
    anneeChinoise = anneeNaissance - 1;
  }

  const animalIndex = getAnimalIndex(anneeChinoise);
  const elementIndex = getElementIndex(anneeChinoise);

  const animauxArray: Animal[] = [
    "Rat",
    "Buffle",
    "Tigre",
    "Lapin",
    "Dragon",
    "Serpent",
    "Cheval",
    "Chèvre",
    "Singe",
    "Coq",
    "Chien",
    "Cochon",
  ];

  const elementsArray: Element[] = ["Bois", "Feu", "Terre", "Métal", "Eau"];

  const animal = animauxArray[animalIndex];
  const element = elementsArray[elementIndex];
  const combinaison = `${animal} de ${element}`;

  return {
    animal,
    element,
    combinaison,
    animalInfo: ANIMAUX[animal],
    anneeNaissance,
    anneeChinoise,
    anneeNouvellun: anneeChinoise,
  };
}

export function getProchainNouvelanChinois(
  annee: number = new Date().getFullYear()
): { annee: number; date: [number, number] } {
  const dateAujourdhui = new Date();
  const anActuel = dateAujourdhui.getFullYear();

  for (let y = anActuel; y <= anActuel + 2; y++) {
    const dateNYC = NOUVEL_AN_CHINOIS[y];
    if (dateNYC) {
      const dateObj = new Date(y, dateNYC[0] - 1, dateNYC[1]);
      if (dateObj >= dateAujourdhui) {
        return { annee: y, date: dateNYC };
      }
    }
  }

  return { annee: anActuel + 1, date: [2, 1] };
}

export function getCompatibilite(
  animal1: Animal,
  animal2: Animal
): {
  score: number;
  description: string;
} {
  const compatibilites: Record<string, number> = {
    "Rat-Dragon": 3,
    "Rat-Singe": 3,
    "Buffle-Serpent": 3,
    "Buffle-Coq": 3,
    "Tigre-Cheval": 3,
    "Tigre-Chien": 3,
    "Lapin-Chèvre": 3,
    "Lapin-Cochon": 3,
    "Dragon-Rat": 3,
    "Dragon-Singe": 3,
    "Serpent-Buffle": 3,
    "Serpent-Coq": 3,
    "Cheval-Tigre": 3,
    "Cheval-Chien": 3,
    "Chèvre-Lapin": 3,
    "Chèvre-Cochon": 3,
    "Singe-Rat": 3,
    "Singe-Dragon": 3,
    "Coq-Buffle": 3,
    "Coq-Serpent": 3,
    "Chien-Tigre": 3,
    "Chien-Cheval": 3,
    "Cochon-Lapin": 3,
    "Cochon-Chèvre": 3,
    "Rat-Buffle": 2,
    "Rat-Tigre": 1,
    "Rat-Lapin": 1,
    "Rat-Cheval": 1,
    "Rat-Chèvre": 0,
    "Rat-Coq": 1,
    "Rat-Chien": 1,
    "Rat-Cochon": 2,
  };

  const key1 = `${animal1}-${animal2}`;
  const key2 = `${animal2}-${animal1}`;

  let score = compatibilites[key1] || compatibilites[key2];
  if (score === undefined) {
    score = 1;
  }

  const descriptions: Record<number, string> = {
    3: "Très compatible - affinités naturelles fortes",
    2: "Compatible - bonne harmonie",
    1: "Neutre - peuvent bien s&apos;entendre",
    0: "Peu compatible - différences à réconcilier",
  };

  return {
    score,
    description: descriptions[score] || "Compatibilité variable",
  };
}

export function formatAnneeChinoise(annee: number): string {
  const animalIndex = getAnimalIndex(annee);
  const elementIndex = getElementIndex(annee);

  const animauxArray: Animal[] = [
    "Rat",
    "Buffle",
    "Tigre",
    "Lapin",
    "Dragon",
    "Serpent",
    "Cheval",
    "Chèvre",
    "Singe",
    "Coq",
    "Chien",
    "Cochon",
  ];

  const elementsArray: Element[] = ["Bois", "Feu", "Terre", "Métal", "Eau"];

  const animal = animauxArray[animalIndex];
  const element = elementsArray[elementIndex];

  return `${annee} - Année du ${animal} de ${element}`;
}