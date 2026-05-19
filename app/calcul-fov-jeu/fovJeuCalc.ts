// Convertisseur FOV jeux video - Logique de calcul

export type Ratio = "4:3" | "5:4" | "16:10" | "16:9" | "21:9" | "32:9";

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

export const RATIOS: Record<Ratio, number> = {
  "4:3": 4 / 3,
  "5:4": 5 / 4,
  "16:10": 16 / 10,
  "16:9": 16 / 9,
  "21:9": 21 / 9,
  "32:9": 32 / 9,
};

export const RATIOS_LABELS: Record<Ratio, string> = {
  "4:3": "4:3 (CRT ancien)",
  "5:4": "5:4 (CRT ancien)",
  "16:10": "16:10 (WSXGA+)",
  "16:9": "16:9 (Full HD)",
  "21:9": "21:9 (Ultra-wide)",
  "32:9": "32:9 (Super ultra-wide)",
};

// Conversion HFOV <-> VFOV via ratio d'écran
export function hfovVersVfov(hfovDeg: number, aspectRatio: number): number {
  const hfovRad = hfovDeg * DEG_TO_RAD;
  const vfovRad = 2 * Math.atan(Math.tan(hfovRad / 2) / aspectRatio);
  return vfovRad * RAD_TO_DEG;
}

export function vfovVersHfov(vfovDeg: number, aspectRatio: number): number {
  const vfovRad = vfovDeg * DEG_TO_RAD;
  const hfovRad = 2 * Math.atan(Math.tan(vfovRad / 2) * aspectRatio);
  return hfovRad * RAD_TO_DEG;
}

// Conversion FOV entre ratios d'écran - Hor+ scaling (HFOV augmente, VFOV constant)
export function convertirFovEntreRatios(
  fovSource: number,
  ratioSource: number,
  ratioCible: number
): number {
  const fovRad = fovSource * DEG_TO_RAD;
  const fovCibleRad = 2 * Math.atan(Math.tan(fovRad / 2) * (ratioCible / ratioSource));
  return fovCibleRad * RAD_TO_DEG;
}

// Conversion FOV entre ratios - Vert- scaling (VFOV reste constant)
export function convertirFovEntreRatiosVertical(
  fovSource: number,
  ratioSource: number,
  ratioCible: number
): number {
  // Conversion HFOV source -> VFOV source
  const vfovSource = hfovVersVfov(fovSource, ratioSource);
  // VFOV cible = VFOV source (constant)
  // Conversion VFOV cible -> HFOV cible
  const hfovCible = vfovVersHfov(vfovSource, ratioCible);
  return hfovCible;
}

export interface ResultatConversionFov {
  fovSource: number;
  fovCible: number;
  ratioSource: string;
  ratioCible: string;
  modeScaling: "horizontal+" | "vertical-";
  hfov?: number;
  vfov?: number;
}

// Convertir HFOV vers VFOV
export function convertirHfovVersVfov(
  hfov: number,
  ratio: Ratio
): ResultatConversionFov {
  const aspectRatio = RATIOS[ratio];
  const vfov = hfovVersVfov(hfov, aspectRatio);

  return {
    fovSource: hfov,
    fovCible: vfov,
    ratioSource: ratio,
    ratioCible: ratio,
    modeScaling: "horizontal+",
    hfov,
    vfov,
  };
}

// Convertir VFOV vers HFOV
export function convertirVfovVersHfov(
  vfov: number,
  ratio: Ratio
): ResultatConversionFov {
  const aspectRatio = RATIOS[ratio];
  const hfov = vfovVersHfov(vfov, aspectRatio);

  return {
    fovSource: vfov,
    fovCible: hfov,
    ratioSource: ratio,
    ratioCible: ratio,
    modeScaling: "vertical-",
    hfov,
    vfov,
  };
}

// Convertir FOV entre deux ratios - Hor+ scaling (le plus courant)
export function convertirFovRatiosHorplus(
  fov: number,
  ratioSource: Ratio,
  ratioCible: Ratio
): ResultatConversionFov {
  const ratioSourceNum = RATIOS[ratioSource];
  const ratioCibleNum = RATIOS[ratioCible];
  const fovCible = convertirFovEntreRatios(fov, ratioSourceNum, ratioCibleNum);

  return {
    fovSource: fov,
    fovCible,
    ratioSource,
    ratioCible,
    modeScaling: "horizontal+",
  };
}

// Convertir FOV entre deux ratios - Vert- scaling (VFOV constant)
export function convertirFovRatiosVertminus(
  fov: number,
  ratioSource: Ratio,
  ratioCible: Ratio
): ResultatConversionFov {
  const ratioSourceNum = RATIOS[ratioSource];
  const ratioCibleNum = RATIOS[ratioCible];
  const fovCible = convertirFovEntreRatiosVertical(
    fov,
    ratioSourceNum,
    ratioCibleNum
  );

  return {
    fovSource: fov,
    fovCible,
    ratioSource,
    ratioCible,
    modeScaling: "vertical-",
  };
}

// FOV par defaut des jeux populaires
export interface JeuFov {
  jeu: string;
  emoji: string;
  hfov: number;
  vfovLocked?: number;
  min?: number;
  max?: number;
  note?: string;
}

export const JEUX_FOV_DEFAUT: JeuFov[] = [
  {
    jeu: "CS2 / CS:GO",
    emoji: "🔫",
    hfov: 90,
    min: 68,
    max: 100,
    note: "Jeu de reference FPS",
  },
  {
    jeu: "Valorant",
    emoji: "🎯",
    hfov: 103,
    min: 90,
    max: 110,
    note: "FOV large par defaut",
  },
  {
    jeu: "Apex Legends",
    emoji: "⚡",
    hfov: 90,
    min: 70,
    max: 110,
    note: "Configurable en jeu",
  },
  {
    jeu: "Overwatch 2",
    emoji: "🛡️",
    hfov: 103,
    min: 75,
    max: 103,
    note: "FOV fixe competitive",
  },
  {
    jeu: "Fortnite",
    emoji: "🏗️",
    vfovLocked: 80,
    min: 80,
    max: 80,
    note: "VFOV verrouille (design)",
  },
  {
    jeu: "Call of Duty",
    emoji: "💥",
    hfov: 90,
    min: 80,
    max: 120,
    note: "Large gamme de FOV",
  },
];

// Tableau pour afficher FOV sur tous les ratios
export function genererTableauFovRatios(
  fovInitial: number,
  ratioInitial: Ratio,
  modeScaling: "horizontal+" | "vertical-" = "horizontal+"
): Record<Ratio, number> {
  const ratioInitialNum = RATIOS[ratioInitial];
  const resultat: Record<Ratio, number> = {} as Record<Ratio, number>;

  const ratiosKeys: Ratio[] = ["4:3", "5:4", "16:10", "16:9", "21:9", "32:9"];

  ratiosKeys.forEach((ratio) => {
    const ratioCibleNum = RATIOS[ratio];
    if (modeScaling === "horizontal+") {
      resultat[ratio] = convertirFovEntreRatios(
        fovInitial,
        ratioInitialNum,
        ratioCibleNum
      );
    } else {
      resultat[ratio] = convertirFovEntreRatiosVertical(
        fovInitial,
        ratioInitialNum,
        ratioCibleNum
      );
    }
  });

  return resultat;
}
