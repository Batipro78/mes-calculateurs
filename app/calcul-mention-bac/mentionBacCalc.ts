export type MentionId = "insuffisant" | "passable" | "assez-bien" | "bien" | "tres-bien" | "tres-bien-felicitations";

export interface MentionInfo {
  id: MentionId;
  nom: string;
  seuilMin: number;
  seuilMax: number;
  emoji: string;
  couleur: string;
  description: string;
  bonus: string;
}

export interface ResultatMention {
  moyenne: number;
  mention: MentionInfo;
  obtenu: boolean;
  felicitationsJury: boolean;
  prochainePalier: MentionInfo | null;
  pointsPourProchainePalier: number;
}

export const MENTIONS: MentionInfo[] = [
  {
    id: "insuffisant",
    nom: "Non admis",
    seuilMin: 0,
    seuilMax: 9.99,
    emoji: "❌",
    couleur: "red",
    description: "Moyenne inferieure a 10/20. De 8 a moins de 10 : second groupe d'epreuves (rattrapage). En dessous de 8 : ajourne.",
    bonus: "Aucun bonus. Second groupe d'epreuves possible si la moyenne est d'au moins 8 et inferieure a 10.",
  },
  {
    id: "passable",
    nom: "Pas de mention (admis)",
    seuilMin: 10,
    seuilMax: 11.99,
    emoji: "✅",
    couleur: "slate",
    description: "Bac obtenu sans mention : le code de l'éducation ne prévoit de mention qu'à partir de 12/20. Moyenne comprise entre 10 et 11,99/20.",
    bonus: "Bac obtenu, sans mention.",
  },
  {
    id: "assez-bien",
    nom: "Mention Assez Bien",
    seuilMin: 12,
    seuilMax: 13.99,
    emoji: "🥉",
    couleur: "amber",
    description: "Mention Assez Bien. Moyenne entre 12 et 13,99/20.",
    bonus: "Seuil fixé par l'article D334-11 du code de l'éducation : moyenne d'au moins 12 et inférieure à 14.",
  },
  {
    id: "bien",
    nom: "Mention Bien",
    seuilMin: 14,
    seuilMax: 15.99,
    emoji: "🥈",
    couleur: "blue",
    description: "Mention Bien. Moyenne entre 14 et 15,99/20.",
    bonus: "Seuil fixé par l'article D334-11 du code de l'éducation : moyenne d'au moins 14 et inférieure à 16.",
  },
  {
    id: "tres-bien",
    nom: "Mention Très Bien",
    seuilMin: 16,
    seuilMax: 17.99,
    emoji: "🥇",
    couleur: "violet",
    description: "Mention Très Bien. Moyenne entre 16 et 17,99/20.",
    bonus: "Seuil fixé par l'article D334-11 du code de l'éducation : moyenne d'au moins 16.",
  },
  {
    id: "tres-bien-felicitations",
    nom: "Mention Très Bien avec Félicitations du jury",
    seuilMin: 18,
    seuilMax: 20,
    emoji: "🏆",
    couleur: "rose",
    description: "Très Bien avec Félicitations du jury. Moyenne 18+/20. Distinction maximale.",
    bonus: "Seuil fixé par l'article D334-11 du code de l'éducation : moyenne d'au moins 18, avec les félicitations du jury.",
  },
];

export function getMentionFromMoyenne(moyenne: number): MentionInfo {
  // On compare au seuil bas seulement : le code de l'éducation (D. 334-11) dit « au moins égale à 12
  // et inférieure à 14 », donc sans trou entre 11,99 et 12.
  for (let i = MENTIONS.length - 1; i >= 0; i--) {
    if (moyenne >= MENTIONS[i].seuilMin) return MENTIONS[i];
  }
  return MENTIONS[0];
}

export function calculerMention(moyenne: number): ResultatMention {
  const moyClamped = Math.max(0, Math.min(20, moyenne));
  const mention = getMentionFromMoyenne(moyClamped);
  const obtenu = moyClamped >= 10;
  const felicitationsJury = moyClamped >= 18;

  // Prochaine palier
  const idx = MENTIONS.findIndex((m) => m.id === mention.id);
  const prochainePalier = idx < MENTIONS.length - 1 ? MENTIONS[idx + 1] : null;
  const pointsPourProchainePalier = prochainePalier
    ? Math.max(0, Math.round((prochainePalier.seuilMin - moyClamped) * 100) / 100)
    : 0;

  return {
    moyenne: moyClamped,
    mention,
    obtenu,
    felicitationsJury,
    prochainePalier,
    pointsPourProchainePalier,
  };
}
