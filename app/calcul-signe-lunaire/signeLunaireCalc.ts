export type Signe =
  | "Belier" | "Taureau" | "Gemeaux" | "Cancer" | "Lion" | "Vierge"
  | "Balance" | "Scorpion" | "Sagittaire" | "Capricorne" | "Verseau" | "Poissons";

export interface SigneLunaireInfo {
  signe: Signe;
  index: number;
  symbole: string;
  description: string;
  emotion: string;
  relationMere: string;
  element: string;
  planete: string;
  domicile: boolean;
}

const SIGNES_LUNAIRES: Record<number, SigneLunaireInfo> = {
  0: {
    signe: "Belier",
    index: 0,
    symbole: "♈",
    description: "Emotions impulsives et indépendantes. Le Bélier lunaire agit sans réfléchir aux sentiments, vit l'émotion immédiatement.",
    emotion: "Impulsive, ardente, combattive",
    relationMere: "Relation dynamique, parfois conflictuelle. Besoin d'indépendance émotionnelle dès l'enfance.",
    element: "Feu",
    planete: "Mars",
    domicile: false,
  },
  1: {
    signe: "Taureau",
    index: 1,
    symbole: "♉",
    description: "Emotions stables, sensuelles et matérielles. Le Taureau lunaire a besoin de sécurité affective et de confort.",
    emotion: "Stable, sensuelle, possessive",
    relationMere: "Relation fusionnelle et durable. Attente d'une mère rassurante et constante.",
    element: "Terre",
    planete: "Venus",
    domicile: false,
  },
  2: {
    signe: "Gemeaux",
    index: 2,
    symbole: "♊",
    description: "Emotions changeantes, intellectuelles et communicatives. Le Gémeaux lunaire analyse ses sentiments plutôt que de les vivre.",
    emotion: "Changeante, intellectuelle, curieuse",
    relationMere: "Relation basée sur la communication et l'échange. Besoin de mère stimulante intellectuellement.",
    element: "Air",
    planete: "Mercure",
    domicile: false,
  },
  3: {
    signe: "Cancer",
    index: 3,
    symbole: "♋",
    description: "Emotions profondes, nourricières et très sensibles. Le Cancer lunaire est le signe de domicile de la Lune : intuition, protection, familles.",
    emotion: "Profonde, protectrice, intuitive",
    relationMere: "Lien émotionnel intense et primordial. La mère est centrale dans la psychologie affective.",
    element: "Eau",
    planete: "Lune",
    domicile: true,
  },
  4: {
    signe: "Lion",
    index: 4,
    symbole: "♌",
    description: "Emotions dramatiques, généreuses et créatives. Le Lion lunaire a besoin de reconnaissance affective et de se sentir aimé.",
    emotion: "Dramatique, généreuse, créative",
    relationMere: "Relation admirative. Besoin d'être valorisé et reconnu par la mère.",
    element: "Feu",
    planete: "Soleil",
    domicile: false,
  },
  5: {
    signe: "Vierge",
    index: 5,
    symbole: "♍",
    description: "Emotions analytiques, modestes et pratiques. La Vierge lunaire critique ses sentiments, doute de ses émotions.",
    emotion: "Analytique, modeste, anxieuse",
    relationMere: "Relation intellecutelle. Mère critique ou perfectionniste ayant instillé l'anxiété.",
    element: "Terre",
    planete: "Mercure",
    domicile: false,
  },
  6: {
    signe: "Balance",
    index: 6,
    symbole: "♎",
    description: "Emotions équilibrées, harmonieuses et sociales. La Balance lunaire cherche l'harmonie affective et déteste les conflits émotionnels.",
    emotion: "Equilibrée, harmonieuse, diplomatique",
    relationMere: "Relation apaisée et équilibrée. Besoin d'une mère juste et diplomate.",
    element: "Air",
    planete: "Venus",
    domicile: false,
  },
  7: {
    signe: "Scorpion",
    index: 7,
    symbole: "♏",
    description: "Emotions intenses, mystérieuses et transformatrices. Le Scorpion lunaire vit ses sentiments en profondeur, avec passion.",
    emotion: "Intense, mystérieuse, passionnelle",
    relationMere: "Relation complexe, souvent cachée. Secrets ou intensité émotionnelle non dits.",
    element: "Eau",
    planete: "Pluton",
    domicile: false,
  },
  8: {
    signe: "Sagittaire",
    index: 8,
    symbole: "♐",
    description: "Emotions optimistes, libres et philosophiques. Le Sagittaire lunaire fuit les liens trop étroits, cherche l'indépendance émotionnelle.",
    emotion: "Optimiste, libre, aventurière",
    relationMere: "Relation basée sur la liberté. Besoin de mère indépendante et compréhensive.",
    element: "Feu",
    planete: "Jupiter",
    domicile: false,
  },
  9: {
    signe: "Capricorne",
    index: 9,
    symbole: "♑",
    description: "Emotions contenues, responsables et matures. Le Capricorne lunaire contrôle ses sentiments, difficultés à exprimer ses émotions.",
    emotion: "Contenue, responsable, sérieuse",
    relationMere: "Relation formelle ou absente. Mère stricte ou distante ayant forgé une carapace émotionnelle.",
    element: "Terre",
    planete: "Saturne",
    domicile: false,
  },
  10: {
    signe: "Verseau",
    index: 10,
    symbole: "♒",
    description: "Emotions détachées, originales et humanistes. Le Verseau lunaire intellectualise ses sentiments, difficultés à être émotionnellement disponible.",
    emotion: "Detachée, originale, humaniste",
    relationMere: "Relation distante ou non-conforme. Mère excentrique ou ayant encouragé l'indépendance émotionnelle.",
    element: "Air",
    planete: "Uranus",
    domicile: false,
  },
  11: {
    signe: "Poissons",
    index: 11,
    symbole: "♓",
    description: "Emotions empathiques, fusionnelles et mystiques. Le Poissons lunaire absorbe les émotions d'autrui, très perméable affectivement.",
    emotion: "Empathique, fusionnelle, mystique",
    relationMere: "Relation fusionnelle et symbiotique. Difficulté à délimiter ses émotions de celles de la mère.",
    element: "Eau",
    planete: "Neptune",
    domicile: false,
  },
};

/**
 * Calcule le signe lunaire à partir de la date et heure de naissance.
 *
 * Algorithme simplifié :
 * - Référence : 1er janvier 2000 minuit UTC, Lune à ~5° (Scorpion)
 * - La Lune parcourt 360° en ~27.32 jours (cycle sidéral)
 * - Vitesse moyenne : ~13.176°/jour
 * - Chaque signe = 30°
 *
 * @param dateNaissance Date de naissance
 * @param heureH Heure de naissance (0-23)
 * @param heureM Minute de naissance (0-59)
 * @returns SigneLunaireInfo
 */
export function calculerSigneLunaire(
  dateNaissance: Date,
  heureH: number,
  heureM: number
): SigneLunaireInfo {
  // Référence : 1er janvier 2000 00:00 UTC
  // À cette date, la Lune était à environ 5° (en Scorpion, index 7)
  const ref = new Date("2000-01-01T00:00:00Z");

  // Créer la date de naissance en UTC avec l'heure fournie
  const naissance = new Date(dateNaissance);
  naissance.setHours(heureH, heureM, 0, 0);

  // Calculer la différence en millisecondes
  const diffMs = naissance.getTime() - ref.getTime();

  // Convertir en jours
  const jours = diffMs / (1000 * 60 * 60 * 24);

  // Calculer les degrés zodiacaux
  // Vitesse lunaire : 13.176°/jour (360° / 27.32 jours)
  // Position initiale : 5° (Scorpion)
  const degresLune = (5 + jours * 13.176) % 360;

  // Déterminer le signe (0-11)
  const indexSigne = Math.floor(degresLune / 30) % 12;

  return SIGNES_LUNAIRES[indexSigne];
}

export function getAllSignesLunaires(): SigneLunaireInfo[] {
  return Object.values(SIGNES_LUNAIRES).sort((a, b) => a.index - b.index);
}
