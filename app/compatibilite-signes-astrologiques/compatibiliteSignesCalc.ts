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
  nom: string;
  symbole: string;
  emoji: string;
  element: Element;
  mode: Mode;
}

export interface ResultatCompatibilite {
  signe1: string;
  signe2: string;
  pourcentage: number;
  niveau: string;
  description: string;
  forces: string[];
  defis: string[];
  raison: string;
}

const SIGNES_INFO: Record<Signe, SigneInfo> = {
  belier: {
    nom: "Bélier",
    symbole: "♈",
    emoji: "🐏",
    element: "Feu",
    mode: "Cardinal",
  },
  taureau: {
    nom: "Taureau",
    symbole: "♉",
    emoji: "🐂",
    element: "Terre",
    mode: "Fixe",
  },
  gemeaux: {
    nom: "Gémeaux",
    symbole: "♊",
    emoji: "👯",
    element: "Air",
    mode: "Mutable",
  },
  cancer: {
    nom: "Cancer",
    symbole: "♋",
    emoji: "🦀",
    element: "Eau",
    mode: "Cardinal",
  },
  lion: {
    nom: "Lion",
    symbole: "♌",
    emoji: "🦁",
    element: "Feu",
    mode: "Fixe",
  },
  vierge: {
    nom: "Vierge",
    symbole: "♍",
    emoji: "👧",
    element: "Terre",
    mode: "Mutable",
  },
  balance: {
    nom: "Balance",
    symbole: "♎",
    emoji: "⚖️",
    element: "Air",
    mode: "Cardinal",
  },
  scorpion: {
    nom: "Scorpion",
    symbole: "♏",
    emoji: "🦂",
    element: "Eau",
    mode: "Fixe",
  },
  sagittaire: {
    nom: "Sagittaire",
    symbole: "♐",
    emoji: "🏹",
    element: "Feu",
    mode: "Mutable",
  },
  capricorne: {
    nom: "Capricorne",
    symbole: "♑",
    emoji: "🐐",
    element: "Terre",
    mode: "Cardinal",
  },
  verseau: {
    nom: "Verseau",
    symbole: "♒",
    emoji: "🫗",
    element: "Air",
    mode: "Fixe",
  },
  poissons: {
    nom: "Poissons",
    symbole: "♓",
    emoji: "🐟",
    element: "Eau",
    mode: "Mutable",
  },
};

function getCompatibiliteParElement(
  elem1: Element,
  elem2: Element
): number {
  if (elem1 === elem2) return 90; // Même élément = très bonne affinité
  if (
    (elem1 === "Feu" && elem2 === "Air") ||
    (elem1 === "Air" && elem2 === "Feu")
  )
    return 85; // Feu + Air s'attisent
  if (
    (elem1 === "Terre" && elem2 === "Eau") ||
    (elem1 === "Eau" && elem2 === "Terre")
  )
    return 85; // Terre + Eau se nourrissent
  if (
    (elem1 === "Feu" && elem2 === "Eau") ||
    (elem1 === "Eau" && elem2 === "Feu")
  )
    return 40; // Feu + Eau s'éteignent
  if (
    (elem1 === "Terre" && elem2 === "Air") ||
    (elem1 === "Air" && elem2 === "Terre")
  )
    return 40; // Terre + Air incompréhension
  return 50; // Par défaut
}

function getBonus(mode1: Mode, mode2: Mode): number {
  return mode1 === mode2 ? 5 : 0;
}

function getLevelAndDescription(
  pourcent: number
): { niveau: string; description: string } {
  if (pourcent >= 90)
    return {
      niveau: "Très compatible",
      description:
        "Une affinité naturelle et harmonieuse. Vous vous comprenez instinctivement.",
    };
  if (pourcent >= 80)
    return {
      niveau: "Très compatible",
      description:
        "Une très bonne harmonie. Les énergies se complètent merveilleusement.",
    };
  if (pourcent >= 70)
    return {
      niveau: "Compatible",
      description:
        "Une bonne compatibilité. Vous partagez des valeurs communes.",
    };
  if (pourcent >= 60)
    return {
      niveau: "Assez compatible",
      description:
        "Une relation viable. Efforts mutuels nécessaires pour s'harmoniser.",
    };
  if (pourcent >= 50)
    return {
      niveau: "Neutre",
      description:
        "Une compatibilité moyenne. Les différences peuvent créer des apprentissages.",
    };
  return {
    niveau: "Peu compatible",
    description:
      "Les énergies sont opposées. Une relation demande beaucoup de travail.",
  };
}

function getForceEtDefis(
  signe1Info: SigneInfo,
  signe2Info: SigneInfo,
  pourcent: number
): { forces: string[]; defis: string[] } {
  const forces: string[] = [];
  const defis: string[] = [];

  // Même élément
  if (signe1Info.element === signe2Info.element) {
    forces.push(`Compréhension mutuelle de l'élément ${signe1Info.element}`);
    forces.push("Valeurs et besoins similaires");
  }

  // Feu + Air
  if (
    (signe1Info.element === "Feu" && signe2Info.element === "Air") ||
    (signe1Info.element === "Air" && signe2Info.element === "Feu")
  ) {
    forces.push("Entente créative et dynamique");
    forces.push("Communication vive et stimulante");
  }

  // Terre + Eau
  if (
    (signe1Info.element === "Terre" && signe2Info.element === "Eau") ||
    (signe1Info.element === "Eau" && signe2Info.element === "Terre")
  ) {
    forces.push("Soutien émotionnel et stabilité");
    forces.push("Complémentarité terre-sentiments");
  }

  // Feu + Eau
  if (
    (signe1Info.element === "Feu" && signe2Info.element === "Eau") ||
    (signe1Info.element === "Eau" && signe2Info.element === "Feu")
  ) {
    defis.push("Risque d'éteindre les passions");
    defis.push("Rythmes de vie différents");
  }

  // Terre + Air
  if (
    (signe1Info.element === "Terre" && signe2Info.element === "Air") ||
    (signe1Info.element === "Air" && signe2Info.element === "Terre")
  ) {
    defis.push("Approches de la vie divergentes");
    defis.push("Communication souvent incomprise");
  }

  // Cardinal + Fixe ou Mutable
  if (signe1Info.mode === "Cardinal" && signe2Info.mode === "Cardinal") {
    forces.push("Leadership et initiative partagés");
  }
  if (signe1Info.mode === "Fixe" && signe2Info.mode === "Fixe") {
    forces.push("Engagement et loyauté mutuels");
  }
  if (signe1Info.mode === "Mutable" && signe2Info.mode === "Mutable") {
    forces.push("Adaptabilité et flexibilité");
  }

  if (pourcent < 60) {
    if (!defis.includes("Approches de la vie divergentes")) {
      defis.push("Nécessite d'importants efforts mutuels");
    }
  }

  return { forces, defis };
}

function getReasonText(elem1: Element, elem2: Element): string {
  if (elem1 === elem2) {
    return `Signes du même élément ${elem1}. Compréhension naturelle et valeurs partagées.`;
  }
  if (
    (elem1 === "Feu" && elem2 === "Air") ||
    (elem1 === "Air" && elem2 === "Feu")
  ) {
    return "Éléments complémentaires : le Feu s'alimente de l'Air et vice-versa.";
  }
  if (
    (elem1 === "Terre" && elem2 === "Eau") ||
    (elem1 === "Eau" && elem2 === "Terre")
  ) {
    return "Éléments nourriciers : la Terre retient l'Eau et l'Eau féconde la Terre.";
  }
  if (
    (elem1 === "Feu" && elem2 === "Eau") ||
    (elem1 === "Eau" && elem2 === "Feu")
  ) {
    return "Éléments antagonistes : l'Eau éteint le Feu, tensions naturelles.";
  }
  if (
    (elem1 === "Terre" && elem2 === "Air") ||
    (elem1 === "Air" && elem2 === "Terre")
  ) {
    return "Éléments opposés : l'Air disperse la Terre, incompréhension probable.";
  }
  return "Compatibilité basée sur les éléments astraux.";
}

export function calculerCompatibilite(
  signe1Slug: Signe,
  signe2Slug: Signe
): ResultatCompatibilite {
  const signe1Info = SIGNES_INFO[signe1Slug];
  const signe2Info = SIGNES_INFO[signe2Slug];

  const baseCompat = getCompatibiliteParElement(
    signe1Info.element,
    signe2Info.element
  );
  const bonus = getBonus(signe1Info.mode, signe2Info.mode);
  const pourcentage = Math.min(100, baseCompat + bonus);

  const { niveau, description } = getLevelAndDescription(pourcentage);
  const { forces, defis } = getForceEtDefis(signe1Info, signe2Info, pourcentage);
  const raison = getReasonText(signe1Info.element, signe2Info.element);

  return {
    signe1: signe1Info.nom,
    signe2: signe2Info.nom,
    pourcentage,
    niveau,
    description,
    forces: forces.length > 0 ? forces : ["Énergie d'attraction présente"],
    defis: defis.length > 0 ? defis : ["Croissance mutuellement possible"],
    raison,
  };
}

export function getNomSigne(slug: Signe): string {
  return SIGNES_INFO[slug].nom;
}

export function getEmojisigne(slug: Signe): string {
  return SIGNES_INFO[slug].emoji;
}

export const ALL_SIGNES: Array<{ slug: Signe; nom: string; emoji: string }> =
  Object.entries(SIGNES_INFO).map(([slug, info]) => ({
    slug: slug as Signe,
    nom: info.nom,
    emoji: info.emoji,
  }));
