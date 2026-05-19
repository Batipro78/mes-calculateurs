// Helper pour conversion monnaie jeux vidéo ↔ euros

export type Monnaie = "vbucks" | "rp" | "apex" | "robux" | "cp" | "fp" | "vp" | "minecoins";

export interface InfoMonnaie {
  id: Monnaie;
  nom: string;
  jeu: string;
  ratio: number; // quantité / EUR (ex: 125 V-bucks par EUR)
  emoji: string;
  couleur: string; // classe Tailwind (ex: "indigo", "blue")
}

// Taux officiels hardcodés (prix EUR magasins officiels)
export const MONNAIES: InfoMonnaie[] = [
  {
    id: "vbucks",
    nom: "V-bucks",
    jeu: "Fortnite",
    ratio: 125, // 1000 V-bucks = 7.99 EUR
    emoji: "⚡",
    couleur: "indigo",
  },
  {
    id: "rp",
    nom: "RP",
    jeu: "League of Legends",
    ratio: 138, // 1380 RP = 10 EUR
    emoji: "💎",
    couleur: "blue",
  },
  {
    id: "apex",
    nom: "Apex Coins",
    jeu: "Apex Legends",
    ratio: 100, // 1000 AC = 9.99 EUR
    emoji: "🔴",
    couleur: "red",
  },
  {
    id: "robux",
    nom: "Robux",
    jeu: "Roblox",
    ratio: 80, // 800 Robux = 9.99 EUR
    emoji: "🟢",
    couleur: "green",
  },
  {
    id: "cp",
    nom: "COD Points",
    jeu: "Call of Duty",
    ratio: 110, // 1100 CP = 9.99 EUR
    emoji: "🎯",
    couleur: "orange",
  },
  {
    id: "fp",
    nom: "FIFA Points",
    jeu: "EA Sports FC",
    ratio: 105, // 1050 FP = 9.99 EUR
    emoji: "⚽",
    couleur: "emerald",
  },
  {
    id: "vp",
    nom: "Valorant Points",
    jeu: "Valorant",
    ratio: 100, // 1000 VP = 9.99 EUR
    emoji: "🎮",
    couleur: "red",
  },
  {
    id: "minecoins",
    nom: "Minecoins",
    jeu: "Minecraft",
    ratio: 172, // 1720 Minecoins = 9.99 EUR
    emoji: "🟫",
    couleur: "amber",
  },
];

export function getInfo(monnaie: Monnaie): InfoMonnaie {
  const info = MONNAIES.find((m) => m.id === monnaie);
  if (!info) throw new Error(`Monnaie inconnue: ${monnaie}`);
  return info;
}

export function monnaieVersEuros(quantite: number, monnaie: Monnaie): number {
  const info = getInfo(monnaie);
  return quantite / info.ratio;
}

export function eurosVersMonnaie(euros: number, monnaie: Monnaie): number {
  const info = getInfo(monnaie);
  return euros * info.ratio;
}

// Convertir une quantité dans une monnaie vers toutes les autres monnaies
export function convertirVers(
  quantite: number,
  depuis: Monnaie
): Record<Monnaie, number> {
  const euros = monnaieVersEuros(quantite, depuis);
  const resultat: Record<Monnaie, number> = {} as Record<Monnaie, number>;

  for (const m of MONNAIES) {
    resultat[m.id] = eurosVersMonnaie(euros, m.id);
  }

  return resultat;
}
