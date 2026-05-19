/**
 * Calcul des besoins energetiques pour chiens et chats
 * Sources: WSAVA Nutritional Toolkit, NRC (National Research Council),
 * Royal Canin nutritional guidelines
 */

export type Espece = "chien" | "chat";
export type Stade = "chiot-0-4" | "chiot-4-12" | "adulte" | "senior" | "gestation" | "allaitement";
export type Activite = "sedentaire" | "normal" | "actif" | "travail";

export interface InputCalories {
  espece: Espece;
  poidsKg: number;
  stade: Stade;
  activite: Activite;
  sterilise: boolean;
}

export interface ResultatCalories {
  ber: number; // Besoin Énergétique de Repos (kcal/jour)
  der: number; // Besoin Énergétique Quotidien (kcal/jour)
  facteur: number; // Facteur d'activité appliqué
  description: string; // Description du résultat
}

/**
 * Calcule le BER (Besoin Énergétique de Repos)
 * Formule Kleiber adaptée: BER = 70 × (poids_kg)^0.75
 */
export function calculerBER(poidsKg: number): number {
  if (poidsKg <= 0) return 0;
  return 70 * Math.pow(poidsKg, 0.75);
}

/**
 * Facteurs d'activité CHIEN selon stade de vie et activité
 */
const FACTEURS_CHIEN: Record<Stade, Record<Activite, { base: number; sterilise: number }>> = {
  "chiot-0-4": {
    sedentaire: { base: 3.0, sterilise: 3.0 },
    normal: { base: 3.0, sterilise: 3.0 },
    actif: { base: 3.0, sterilise: 3.0 },
    travail: { base: 3.0, sterilise: 3.0 },
  },
  "chiot-4-12": {
    sedentaire: { base: 2.0, sterilise: 2.0 },
    normal: { base: 2.0, sterilise: 2.0 },
    actif: { base: 2.0, sterilise: 2.0 },
    travail: { base: 2.0, sterilise: 2.0 },
  },
  adulte: {
    sedentaire: { base: 1.2, sterilise: 1.2 },
    normal: { base: 1.6, sterilise: 1.4 },
    actif: { base: 2.0, sterilise: 1.8 },
    travail: { base: 3.0, sterilise: 3.0 }, // 2.0-5.0 selon intensité
  },
  senior: {
    sedentaire: { base: 1.4, sterilise: 1.2 },
    normal: { base: 1.4, sterilise: 1.2 },
    actif: { base: 1.6, sterilise: 1.4 },
    travail: { base: 1.6, sterilise: 1.4 },
  },
  gestation: {
    sedentaire: { base: 1.8, sterilise: 1.8 },
    normal: { base: 2.2, sterilise: 2.2 },
    actif: { base: 2.8, sterilise: 2.8 },
    travail: { base: 3.0, sterilise: 3.0 },
  },
  allaitement: {
    sedentaire: { base: 4.0, sterilise: 4.0 },
    normal: { base: 5.5, sterilise: 5.5 },
    actif: { base: 6.5, sterilise: 6.5 },
    travail: { base: 8.0, sterilise: 8.0 },
  },
};

/**
 * Facteurs d'activité CHAT selon stade de vie et activité
 */
const FACTEURS_CHAT: Record<Stade, Record<Activite, { base: number; sterilise: number }>> = {
  "chiot-0-4": {
    sedentaire: { base: 2.5, sterilise: 2.5 },
    normal: { base: 2.5, sterilise: 2.5 },
    actif: { base: 2.5, sterilise: 2.5 },
    travail: { base: 2.5, sterilise: 2.5 },
  },
  "chiot-4-12": {
    sedentaire: { base: 2.0, sterilise: 2.0 },
    normal: { base: 2.0, sterilise: 2.0 },
    actif: { base: 2.0, sterilise: 2.0 },
    travail: { base: 2.0, sterilise: 2.0 },
  },
  adulte: {
    sedentaire: { base: 1.2, sterilise: 1.2 },
    normal: { base: 1.4, sterilise: 1.2 },
    actif: { base: 1.6, sterilise: 1.4 },
    travail: { base: 1.6, sterilise: 1.6 },
  },
  senior: {
    sedentaire: { base: 1.1, sterilise: 1.0 },
    normal: { base: 1.1, sterilise: 1.0 },
    actif: { base: 1.2, sterilise: 1.1 },
    travail: { base: 1.2, sterilise: 1.1 },
  },
  gestation: {
    sedentaire: { base: 1.6, sterilise: 1.6 },
    normal: { base: 1.8, sterilise: 1.8 },
    actif: { base: 2.0, sterilise: 2.0 },
    travail: { base: 2.0, sterilise: 2.0 },
  },
  allaitement: {
    sedentaire: { base: 2.0, sterilise: 2.0 },
    normal: { base: 3.5, sterilise: 3.5 },
    actif: { base: 5.0, sterilise: 5.0 },
    travail: { base: 6.0, sterilise: 6.0 },
  },
};

/**
 * Calcule le DER (Besoin Énergétique Quotidien) = BER × facteur d'activité
 */
export function calculerDER(input: InputCalories): ResultatCalories {
  const ber = calculerBER(input.poidsKg);

  const facteurs =
    input.espece === "chien"
      ? FACTEURS_CHIEN[input.stade][input.activite]
      : FACTEURS_CHAT[input.stade][input.activite];

  const facteur = input.sterilise ? facteurs.sterilise : facteurs.base;
  const der = ber * facteur;

  const descriptions: Record<Espece, Record<Stade, string>> = {
    chien: {
      "chiot-0-4": "Chiot 0-4 mois (croissance très rapide)",
      "chiot-4-12": "Chiot 4-12 mois (croissance)",
      adulte: "Chien adulte",
      senior: "Chien sénior (>7 ans)",
      gestation: "Chienne en gestation",
      allaitement: "Chienne allaitante",
    },
    chat: {
      "chiot-0-4": "Chaton 0-4 mois (croissance très rapide)",
      "chiot-4-12": "Chaton 4-12 mois (croissance)",
      adulte: "Chat adulte",
      senior: "Chat sénior (>7 ans)",
      gestation: "Chatte en gestation",
      allaitement: "Chatte allaitante",
    },
  };

  const description = descriptions[input.espece][input.stade];

  return {
    ber: Math.round(ber * 10) / 10,
    der: Math.round(der * 10) / 10,
    facteur: Math.round(facteur * 100) / 100,
    description,
  };
}

/**
 * Tableau des BER pour différents poids (référence)
 */
export function genererTableauBER(
  poidsMin: number = 1,
  poidsMax: number = 50,
  increment: number = 5
): Array<{ poids: number; ber: number }> {
  const tableau: Array<{ poids: number; ber: number }> = [];
  for (let p = poidsMin; p <= poidsMax; p += increment) {
    tableau.push({ poids: p, ber: Math.round(calculerBER(p) * 10) / 10 });
  }
  return tableau;
}

/**
 * Labels pour les selects
 */
export const STADES_LABELS: Record<Stade, string> = {
  "chiot-0-4": "Chiot/Chaton 0-4 mois",
  "chiot-4-12": "Chiot/Chaton 4-12 mois",
  adulte: "Adulte",
  senior: "Sénior (>7 ans)",
  gestation: "Gestation",
  allaitement: "Allaitement",
};

export const ACTIVITE_LABELS: Record<Activite, string> = {
  sedentaire: "Sédentaire/Intérieur",
  normal: "Normal",
  actif: "Actif/Extérieur",
  travail: "Travail/Agility",
};
