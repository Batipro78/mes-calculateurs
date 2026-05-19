// Convertisseur sensibilite FPS - Logique de calcul

export type Jeu = "cs2" | "valorant" | "apex" | "fortnite" | "overwatch" | "r6";

export interface ResultatConversion {
  jeuSource: Jeu;
  jeuCible: Jeu;
  sensSource: number;
  sensCible: number;
  dpi: number;
  cm360Source: number;
  cm360Cible: number;
  edpiSource: number;
  edpiCible: number;
}

// Yaw (sensibilite angulaire) pour chaque jeu
const YAW_PAR_JEU: Record<Jeu, number> = {
  cs2: 0.022, // Reference CS2 / CS:GO
  valorant: 0.07, // Valorant utilise une scale differente
  apex: 0.022, // Apex = CS2
  fortnite: 0.0066, // Fortnite a une scale differente
  overwatch: 0.0066, // Overwatch = Fortnite
  r6: 0.02, // Rainbow Six
};

export const JEUX_LABELS: Record<Jeu, string> = {
  cs2: "CS2 / CS:GO",
  valorant: "Valorant",
  apex: "Apex Legends",
  fortnite: "Fortnite",
  overwatch: "Overwatch 2",
  r6: "Rainbow Six Siege",
};

// Calculer eDPI = DPI × Sensibilite
export function calculerEdpi(dpi: number, sens: number): number {
  return dpi * sens;
}

// Calculer cm/360 = (2.54 × 360) / (DPI × Sensibilite × Yaw)
// 2.54 = conversion pouce a cm
export function calculerCm360(
  dpi: number,
  sens: number,
  yaw: number
): number {
  if (dpi <= 0 || sens <= 0 || yaw <= 0) return 0;
  return (2.54 * 360) / (dpi * sens * yaw);
}

// Convertir sensibilite entre deux jeux
export function convertirSensibilite(
  jeuSource: Jeu,
  jeuCible: Jeu,
  sensSource: number,
  dpi: number
): ResultatConversion {
  if (sensSource <= 0 || dpi <= 0) {
    return {
      jeuSource,
      jeuCible,
      sensSource: 0,
      sensCible: 0,
      dpi,
      cm360Source: 0,
      cm360Cible: 0,
      edpiSource: 0,
      edpiCible: 0,
    };
  }

  const yawSource = YAW_PAR_JEU[jeuSource];
  const yawCible = YAW_PAR_JEU[jeuCible];

  // Formule: sensibilite = (yawSource / yawCible) × sensSource
  // Car cm/360 = constant = (2.54 × 360) / (dpi × sens × yaw)
  const sensCible = sensSource * (yawSource / yawCible);

  const cm360Source = calculerCm360(dpi, sensSource, yawSource);
  const cm360Cible = calculerCm360(dpi, sensCible, yawCible);
  const edpiSource = calculerEdpi(dpi, sensSource);
  const edpiCible = calculerEdpi(dpi, sensCible);

  return {
    jeuSource,
    jeuCible,
    sensSource,
    sensCible,
    dpi,
    cm360Source,
    cm360Cible,
    edpiSource,
    edpiCible,
  };
}

// Convertir vers TOUS les autres jeux
export function convertirVersTouxLesJeux(
  jeuSource: Jeu,
  sensSource: number,
  dpi: number
): Record<Jeu, ResultatConversion> {
  const jeux: Jeu[] = ["cs2", "valorant", "apex", "fortnite", "overwatch", "r6"];
  const resultats: Record<Jeu, ResultatConversion> = {} as Record<
    Jeu,
    ResultatConversion
  >;

  jeux.forEach((jeu) => {
    resultats[jeu] = convertirSensibilite(jeuSource, jeu, sensSource, dpi);
  });

  return resultats;
}
