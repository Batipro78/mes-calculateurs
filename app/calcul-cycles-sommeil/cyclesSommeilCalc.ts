export type ModeCalcul = "reveil" | "endormissement";

export const DUREE_CYCLE_MINUTES = 90;
export const DUREE_ENDORMISSEMENT_MINUTES = 14;
export const CYCLES_RECOMMANDES = [4, 5, 6]; // 6h, 7h30, 9h

export interface HoraireProposition {
  cycles: number;
  dureeSommeilMinutes: number;
  heure: string; // "HH:MM"
  qualiteSommeil: "courte" | "minimale" | "optimale" | "longue";
  recommandation: string;
}

export interface ResultatCyclesSommeil {
  mode: ModeCalcul;
  heureReference: string;
  propositions: HoraireProposition[];
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function parseHeure(heure: string): { h: number; m: number } | null {
  const match = heure.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const h = parseInt(match[1]);
  const m = parseInt(match[2]);
  if (h < 0 || h > 23 || m < 0 || m > 59) return null;
  return { h, m };
}

function formatHeure(h: number, m: number): string {
  // Normaliser modulo 24h
  let totalMin = h * 60 + m;
  totalMin = ((totalMin % 1440) + 1440) % 1440;
  const hh = Math.floor(totalMin / 60);
  const mm = totalMin % 60;
  return `${pad(hh)}:${pad(mm)}`;
}

function addMinutes(heure: string, minutes: number): string {
  const parsed = parseHeure(heure);
  if (!parsed) return heure;
  return formatHeure(parsed.h, parsed.m + minutes);
}

function subtractMinutes(heure: string, minutes: number): string {
  return addMinutes(heure, -minutes);
}

function qualiteFor(cycles: number): HoraireProposition["qualiteSommeil"] {
  if (cycles <= 3) return "courte";
  if (cycles === 4) return "minimale";
  if (cycles === 5 || cycles === 6) return "optimale";
  return "longue";
}

function recommandationFor(cycles: number, dureeMinutes: number): string {
  const h = Math.floor(dureeMinutes / 60);
  const m = dureeMinutes % 60;
  const dureeStr = m === 0 ? `${h}h` : `${h}h${pad(m)}`;

  if (cycles <= 3) {
    return `${dureeStr} de sommeil - tres court, a eviter sauf cas exceptionnel (sieste longue ou nuit forcee).`;
  }
  if (cycles === 4) {
    return `${dureeStr} de sommeil - minimum acceptable pour un adulte. Convient pour une nuit ponctuelle.`;
  }
  if (cycles === 5) {
    return `${dureeStr} de sommeil - duree optimale pour la plupart des adultes.`;
  }
  if (cycles === 6) {
    return `${dureeStr} de sommeil - ideal pour les adolescents, jeunes adultes ou en periode de recuperation.`;
  }
  return `${dureeStr} de sommeil - tres long, peut indiquer une dette de sommeil a rattraper.`;
}

export function calculerCyclesSommeil(
  mode: ModeCalcul,
  heure: string,
  inclureLatence: boolean = true
): ResultatCyclesSommeil | null {
  const parsed = parseHeure(heure);
  if (!parsed) return null;

  const latence = inclureLatence ? DUREE_ENDORMISSEMENT_MINUTES : 0;
  const cycles = [3, 4, 5, 6, 7];

  const propositions: HoraireProposition[] = cycles.map((nbCycles) => {
    const dureeSommeil = nbCycles * DUREE_CYCLE_MINUTES;
    let heureProp: string;

    if (mode === "reveil") {
      // L'utilisateur veut se reveiller a "heure" -> calculer heure de coucher
      heureProp = subtractMinutes(heure, dureeSommeil + latence);
    } else {
      // L'utilisateur se couche a "heure" -> calculer heure de reveil
      heureProp = addMinutes(heure, dureeSommeil + latence);
    }

    return {
      cycles: nbCycles,
      dureeSommeilMinutes: dureeSommeil,
      heure: heureProp,
      qualiteSommeil: qualiteFor(nbCycles),
      recommandation: recommandationFor(nbCycles, dureeSommeil),
    };
  });

  return {
    mode,
    heureReference: heure,
    propositions,
  };
}

export function formatDuree(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h${pad(m)}`;
}
