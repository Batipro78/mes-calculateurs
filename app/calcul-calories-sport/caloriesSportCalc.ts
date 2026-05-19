// Calculateur calories brulees par sport selon METs (Metabolic Equivalent of Task)

export type CategorieSport =
  | "course"
  | "velo"
  | "natation"
  | "collectif"
  | "muscu"
  | "exterieur"
  | "nautique"
  | "autres";

export interface SportInfo {
  id: string;
  nom: string;
  categorie: CategorieSport;
  mets: number;
  emoji: string;
}

// Sports avec METs officiels du Compendium of Physical Activities 2024
export const SPORTS: SportInfo[] = [
  // Course a pied
  { id: "course-6kmh", nom: "Course 6 km/h", categorie: "course", mets: 6, emoji: "🏃" },
  { id: "course-8kmh", nom: "Course 8 km/h", categorie: "course", mets: 8, emoji: "🏃" },
  { id: "course-10kmh", nom: "Course 10 km/h", categorie: "course", mets: 10, emoji: "🏃" },
  { id: "course-12kmh", nom: "Course 12 km/h", categorie: "course", mets: 11.5, emoji: "🏃" },
  { id: "course-15kmh", nom: "Course 15 km/h", categorie: "course", mets: 14, emoji: "🏃" },
  { id: "course-sprint", nom: "Sprint", categorie: "course", mets: 23, emoji: "⚡" },

  // Velo
  { id: "velo-loisir", nom: "Vélo loisir 16 km/h", categorie: "velo", mets: 6, emoji: "🚴" },
  { id: "velo-route-20", nom: "Vélo route 20 km/h", categorie: "velo", mets: 8, emoji: "🚴" },
  { id: "velo-route-25", nom: "Vélo route 25 km/h", categorie: "velo", mets: 10, emoji: "🚴" },
  { id: "velo-route-30", nom: "Vélo route 30 km/h", categorie: "velo", mets: 12, emoji: "🚴" },
  { id: "velo-vtt-modere", nom: "VTT modéré", categorie: "velo", mets: 8.5, emoji: "🚵" },
  { id: "velo-vtt-intense", nom: "VTT intense", categorie: "velo", mets: 14, emoji: "🚵" },
  { id: "velo-appartement", nom: "Vélo appartement intense", categorie: "velo", mets: 8.5, emoji: "🚴" },

  // Natation
  { id: "natation-lente", nom: "Natation libre lente", categorie: "natation", mets: 6, emoji: "🏊" },
  { id: "natation-moderee", nom: "Natation libre modérée", categorie: "natation", mets: 8.3, emoji: "🏊" },
  { id: "natation-rapide", nom: "Natation crawl rapide", categorie: "natation", mets: 10, emoji: "🏊" },
  { id: "natation-brasse", nom: "Natation brasse", categorie: "natation", mets: 5.3, emoji: "🏊" },
  { id: "natation-papillon", nom: "Natation papillon", categorie: "natation", mets: 13.8, emoji: "🏊" },

  // Sports collectifs
  { id: "football-match", nom: "Football match", categorie: "collectif", mets: 10, emoji: "⚽" },
  { id: "football-recreatif", nom: "Football récréatif", categorie: "collectif", mets: 7, emoji: "⚽" },
  { id: "basketball-match", nom: "Basketball match", categorie: "collectif", mets: 8, emoji: "🏀" },
  { id: "volleyball", nom: "Volleyball", categorie: "collectif", mets: 4, emoji: "🏐" },
  { id: "rugby", nom: "Rugby", categorie: "collectif", mets: 8.3, emoji: "🏉" },
  { id: "handball", nom: "Handball", categorie: "collectif", mets: 8, emoji: "🤾" },
  { id: "tennis-simple", nom: "Tennis simple", categorie: "collectif", mets: 8, emoji: "🎾" },
  { id: "tennis-double", nom: "Tennis double", categorie: "collectif", mets: 5, emoji: "🎾" },
  { id: "badminton", nom: "Badminton", categorie: "collectif", mets: 7, emoji: "🏸" },
  { id: "ping-pong", nom: "Tennis de table", categorie: "collectif", mets: 4, emoji: "🏓" },

  // Musculation / Fitness
  { id: "muscu-moderee", nom: "Musculation modérée", categorie: "muscu", mets: 3.5, emoji: "💪" },
  { id: "muscu-intense", nom: "Musculation intense", categorie: "muscu", mets: 6, emoji: "💪" },
  { id: "crossfit", nom: "CrossFit", categorie: "muscu", mets: 8, emoji: "🏋️" },
  { id: "yoga-doux", nom: "Yoga doux", categorie: "muscu", mets: 2.5, emoji: "🧘" },
  { id: "yoga-vinyasa", nom: "Yoga vinyasa", categorie: "muscu", mets: 4, emoji: "🧘" },
  { id: "pilates", nom: "Pilates", categorie: "muscu", mets: 3, emoji: "🧘" },
  { id: "hiit", nom: "HIIT (entraînement par intervalles)", categorie: "muscu", mets: 8, emoji: "⚡" },
  { id: "zumba", nom: "Zumba", categorie: "muscu", mets: 7.5, emoji: "💃" },
  { id: "step", nom: "Step", categorie: "muscu", mets: 8.5, emoji: "🪜" },

  // Sports d'exterieur
  { id: "marche-5kmh", nom: "Marche 5 km/h", categorie: "exterieur", mets: 3.5, emoji: "🚶" },
  { id: "marche-rapide", nom: "Marche rapide 6.5 km/h", categorie: "exterieur", mets: 5, emoji: "🚶" },
  { id: "randonnee-plat", nom: "Randonnée plat", categorie: "exterieur", mets: 5, emoji: "🥾" },
  { id: "randonnee-montagne", nom: "Randonnée montagne", categorie: "exterieur", mets: 7.3, emoji: "⛰️" },
  { id: "course-montagne", nom: "Course en montagne", categorie: "exterieur", mets: 9, emoji: "🏔️" },
  { id: "ski-alpin", nom: "Ski alpin", categorie: "exterieur", mets: 7, emoji: "⛷️" },
  { id: "snowboard", nom: "Snowboard", categorie: "exterieur", mets: 5.3, emoji: "🏂" },
  { id: "ski-fond", nom: "Ski de fond", categorie: "exterieur", mets: 9, emoji: "🎿" },
  { id: "escalade", nom: "Escalade", categorie: "exterieur", mets: 8, emoji: "🧗" },

  // Sports nautiques
  { id: "aviron-loisir", nom: "Aviron loisir", categorie: "nautique", mets: 5, emoji: "🚣" },
  { id: "aviron-intense", nom: "Aviron intense", categorie: "nautique", mets: 12, emoji: "🚣" },
  { id: "kayak", nom: "Kayak", categorie: "nautique", mets: 5, emoji: "🛶" },
  { id: "surf", nom: "Surf", categorie: "nautique", mets: 3, emoji: "🏄" },
  { id: "paddle", nom: "Paddle", categorie: "nautique", mets: 6, emoji: "🏄" },

  // Autres
  { id: "boxe-sac", nom: "Boxe sac de frappe", categorie: "autres", mets: 5.5, emoji: "🥊" },
  { id: "boxe-sparring", nom: "Boxe sparring", categorie: "autres", mets: 9, emoji: "🥊" },
  { id: "arts-martiaux", nom: "Arts martiaux", categorie: "autres", mets: 10, emoji: "🥋" },
  { id: "equitation", nom: "Équitation", categorie: "autres", mets: 5.5, emoji: "🐴" },
  { id: "danse", nom: "Danse moderne", categorie: "autres", mets: 5, emoji: "💃" },
  { id: "golf", nom: "Golf marche", categorie: "autres", mets: 4.8, emoji: "⛳" },
];

// Calculer les calories brulees
// Formule: Calories = METs × poids(kg) × duree(heures)
export function calculerCalories(mets: number, poidsKg: number, dureeMin: number): number {
  if (mets <= 0 || poidsKg <= 0 || dureeMin <= 0) return 0;
  const dureeHeures = dureeMin / 60;
  return Math.round(mets * poidsKg * dureeHeures);
}

// Obtenir les infos d'un sport par ID
export function getSport(id: string): SportInfo | null {
  return SPORTS.find((s) => s.id === id) || null;
}

// Obtenir les categories uniques
export function getCategories(): CategorieSport[] {
  const categories = new Set(SPORTS.map((s) => s.categorie));
  return Array.from(categories) as CategorieSport[];
}

// Obtenir les sports d'une categorie
export function getSportsByCategory(categorie: CategorieSport): SportInfo[] {
  return SPORTS.filter((s) => s.categorie === categorie);
}

// Equivalences alimentaires
export interface EquivalencesAlimentaires {
  bigmac: number;
  banane: number;
  carre_chocolat: number;
}

export function equivalenceCalories(calories: number): EquivalencesAlimentaires {
  return {
    bigmac: Math.round((calories / 540) * 10) / 10,
    banane: Math.round((calories / 90) * 10) / 10,
    carre_chocolat: Math.round(calories / 25),
  };
}

// Top 10 sports qui brulent le plus de calories
export function getTopSports(poids: number, duree: number): Array<SportInfo & { calories: number }> {
  return SPORTS.map((sport) => ({
    ...sport,
    calories: calculerCalories(sport.mets, poids, duree),
  }))
    .sort((a, b) => b.calories - a.calories)
    .slice(0, 10);
}

// Temps necessaire pour bruler X calories avec un sport
export function tempsForBrulerCalories(
  mets: number,
  poidsKg: number,
  targetCalories: number
): number {
  if (mets <= 0 || poidsKg <= 0 || targetCalories <= 0) return 0;
  const heures = targetCalories / (mets * poidsKg);
  return Math.round(heures * 60); // Retour en minutes
}
