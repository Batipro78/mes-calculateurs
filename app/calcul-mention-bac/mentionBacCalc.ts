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
  pointsBonusParcoursup: number;
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
    description: "Moyenne inferieure a 10/20. Bac non obtenu (rattrapage possible entre 8 et 10).",
    bonus: "Aucun bonus. Possibilite de rattrapage oral si moyenne entre 8 et 10.",
  },
  {
    id: "passable",
    nom: "Mention Passable",
    seuilMin: 10,
    seuilMax: 11.99,
    emoji: "✅",
    couleur: "slate",
    description: "Bac obtenu sans mention. Moyenne comprise entre 10 et 11,99/20.",
    bonus: "Aucun bonus officiel mais bac validé.",
  },
  {
    id: "assez-bien",
    nom: "Mention Assez Bien",
    seuilMin: 12,
    seuilMax: 13.99,
    emoji: "🥉",
    couleur: "amber",
    description: "Mention Assez Bien. Moyenne entre 12 et 13,99/20.",
    bonus: "Valorisation sur CV et dossiers Parcoursup.",
  },
  {
    id: "bien",
    nom: "Mention Bien",
    seuilMin: 14,
    seuilMax: 15.99,
    emoji: "🥈",
    couleur: "blue",
    description: "Mention Bien. Moyenne entre 14 et 15,99/20.",
    bonus: "Atout important Parcoursup, certaines bourses au mérite.",
  },
  {
    id: "tres-bien",
    nom: "Mention Très Bien",
    seuilMin: 16,
    seuilMax: 17.99,
    emoji: "🥇",
    couleur: "violet",
    description: "Mention Très Bien. Moyenne entre 16 et 17,99/20.",
    bonus: "1 point Parcoursup sur certaines formations sélectives, bourse au mérite possible (échelon variable).",
  },
  {
    id: "tres-bien-felicitations",
    nom: "Mention Très Bien avec Félicitations du jury",
    seuilMin: 18,
    seuilMax: 20,
    emoji: "🏆",
    couleur: "rose",
    description: "Très Bien avec Félicitations du jury. Moyenne 18+/20. Distinction maximale.",
    bonus: "1 point Parcoursup, bourse au mérite échelon supérieur possible, distinction au CV pour grandes écoles.",
  },
];

export function getMentionFromMoyenne(moyenne: number): MentionInfo {
  const m = MENTIONS.find((x) => moyenne >= x.seuilMin && moyenne <= x.seuilMax);
  return m || MENTIONS[0];
}

export function calculerMention(moyenne: number): ResultatMention {
  const moyClamped = Math.max(0, Math.min(20, moyenne));
  const mention = getMentionFromMoyenne(moyClamped);
  const obtenu = moyClamped >= 10;
  const pointsBonusParcoursup = moyClamped >= 16 ? 1 : 0;
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
    pointsBonusParcoursup,
    felicitationsJury,
    prochainePalier,
    pointsPourProchainePalier,
  };
}
