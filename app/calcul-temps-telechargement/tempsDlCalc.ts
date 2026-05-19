// Helper pour calcul temps de téléchargement (Mb/s vs Mo/s)

export type UniteTaille = "Mo" | "Go" | "To";
export type UniteDebit = "Kb/s" | "Mb/s" | "Gb/s";

export interface ResultatTemps {
  theoriqueSec: number;
  reelSec: number;
  theoriqueFormat: string;
  reelFormat: string;
}

export interface InfoJeu {
  id: string;
  nom: string;
  emoji: string;
  taille_go: number;
}

export interface InfoApp {
  id: string;
  nom: string;
  emoji: string;
  taille_go: number;
}

export interface InfoDebit {
  nom: string;
  debit: number;
  unite: UniteDebit;
}

// Conversion taille en octets
function tailleEnOctets(taille: number, unite: UniteTaille): number {
  const conversions: Record<UniteTaille, number> = {
    Mo: 1_000_000,
    Go: 1_000_000_000,
    To: 1_000_000_000_000,
  };
  return taille * conversions[unite];
}

// Conversion débit en Mb/s
function debitEnMbps(debit: number, unite: UniteDebit): number {
  const conversions: Record<UniteDebit, number> = {
    "Kb/s": 0.001,
    "Mb/s": 1,
    "Gb/s": 1000,
  };
  return debit * conversions[unite];
}

// Convertir Mb/s en octets/s
function mbpsEnOctetsSec(mbps: number): number {
  return mbps * 125_000; // 1 Mb/s = 1_000_000 bits/s / 8 = 125_000 octets/s
}

// Format durée lisible
export function formatDuree(secondes: number): string {
  if (secondes < 60) {
    return `${Math.round(secondes)}s`;
  }

  if (secondes < 3600) {
    const min = Math.floor(secondes / 60);
    const sec = Math.round(secondes % 60);
    if (sec === 0) return `${min}min`;
    return `${min}min ${sec}s`;
  }

  const heures = Math.floor(secondes / 3600);
  const minRestant = Math.floor((secondes % 3600) / 60);
  const secRestant = Math.round(secondes % 60);

  if (secRestant === 0 && minRestant === 0) {
    return `${heures}h`;
  }
  if (secRestant === 0) {
    return `${heures}h ${minRestant}min`;
  }
  return `${heures}h ${minRestant}min ${secRestant}s`;
}

// Calcul principal
export function calculerTempsTelechargement(
  taille: number,
  uniteTaille: UniteTaille,
  debit: number,
  uniteDebit: UniteDebit
): ResultatTemps {
  const octets = tailleEnOctets(taille, uniteTaille);
  const mbps = debitEnMbps(debit, uniteDebit);
  const octetsSec = mbpsEnOctetsSec(mbps);

  // Temps théorique (sans overhead)
  const theoriqueSec = octets / octetsSec;

  // Temps réel estimé avec overhead réseau ~10% (TCP/IP, retransmissions)
  const overhead = 1.1;
  const reelSec = theoriqueSec * overhead;

  return {
    theoriqueSec,
    reelSec,
    theoriqueFormat: formatDuree(theoriqueSec),
    reelFormat: formatDuree(reelSec),
  };
}

// Jeux populaires récents
export const JEUX_TAILLES: InfoJeu[] = [
  {
    id: "cod-mw3",
    nom: "Call of Duty MW3 / Warzone",
    emoji: "🎯",
    taille_go: 220,
  },
  { id: "cyberpunk", nom: "Cyberpunk 2077", emoji: "🌃", taille_go: 70 },
  { id: "gta5", nom: "GTA V", emoji: "🚗", taille_go: 95 },
  { id: "rdr2", nom: "Red Dead Redemption 2", emoji: "🤠", taille_go: 150 },
  { id: "bg3", nom: "Baldur's Gate 3", emoji: "⚔️", taille_go: 150 },
  { id: "starfield", nom: "Starfield", emoji: "🚀", taille_go: 125 },
  { id: "fortnite", nom: "Fortnite", emoji: "⚡", taille_go: 30 },
  { id: "apex", nom: "Apex Legends", emoji: "🔴", taille_go: 75 },
  { id: "valorant", nom: "Valorant", emoji: "🎮", taille_go: 30 },
  { id: "cs2", nom: "Counter-Strike 2", emoji: "💣", taille_go: 85 },
  { id: "lol", nom: "League of Legends", emoji: "💎", taille_go: 22 },
  { id: "minecraft", nom: "Minecraft", emoji: "⛏️", taille_go: 4 },
  { id: "elden-ring", nom: "Elden Ring", emoji: "👑", taille_go: 50 },
  { id: "hogwarts", nom: "Hogwarts Legacy", emoji: "🪄", taille_go: 85 },
  { id: "diablo4", nom: "Diablo IV", emoji: "😈", taille_go: 90 },
];

// Films / Apps / Contenus
export const APPS_TAILLES: InfoApp[] = [
  { id: "film-4k", nom: "Film 4K", emoji: "🎬", taille_go: 25 },
  { id: "film-1080p", nom: "Film 1080p", emoji: "📹", taille_go: 5 },
  { id: "serie-1080p", nom: "Saison série 1080p", emoji: "📺", taille_go: 30 },
  {
    id: "windows-update",
    nom: "Update Windows 11",
    emoji: "🪟",
    taille_go: 4,
  },
  { id: "macos", nom: "macOS Sonoma", emoji: "🍎", taille_go: 12 },
  { id: "ubuntu", nom: "Ubuntu ISO", emoji: "🐧", taille_go: 5 },
  { id: "android-update", nom: "Android update", emoji: "🤖", taille_go: 2 },
];

// Débits FAI courants
export const DEBITS_FAI: InfoDebit[] = [
  { nom: "ADSL classique", debit: 8, unite: "Mb/s" },
  { nom: "VDSL", debit: 50, unite: "Mb/s" },
  { nom: "Fibre 100 Mb/s", debit: 100, unite: "Mb/s" },
  { nom: "Fibre 500 Mb/s", debit: 500, unite: "Mb/s" },
  { nom: "Fibre 1 Gb/s", debit: 1000, unite: "Mb/s" },
  { nom: "Fibre 2 Gb/s", debit: 2000, unite: "Mb/s" },
  { nom: "Fibre 8 Gb/s", debit: 8000, unite: "Mb/s" },
  { nom: "4G LTE", debit: 25, unite: "Mb/s" },
  { nom: "5G", debit: 200, unite: "Mb/s" },
];
