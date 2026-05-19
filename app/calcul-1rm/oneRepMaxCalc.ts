// 1RM Calculator - One Rep Max avec 5 formules classiques

export interface ResultatRM {
  brzycki: number;
  epley: number;
  lander: number;
  lombardi: number;
  oconnor: number;
  moyenne: number;
  moyenneArrondie: number;
}

export const POURCENTS_REPS = [
  { reps: 1, pourcent: 100 },
  { reps: 2, pourcent: 95 },
  { reps: 3, pourcent: 93 },
  { reps: 4, pourcent: 90 },
  { reps: 5, pourcent: 87 },
  { reps: 6, pourcent: 85 },
  { reps: 7, pourcent: 83 },
  { reps: 8, pourcent: 80 },
  { reps: 9, pourcent: 77 },
  { reps: 10, pourcent: 75 },
  { reps: 11, pourcent: 72 },
  { reps: 12, pourcent: 70 },
  { reps: 15, pourcent: 65 },
  { reps: 20, pourcent: 60 },
];

// Arrondir au plate standard (defaut 2.5 kg)
export function arrondirAuPlate(kg: number, plateMin: number = 2.5): number {
  return Math.round(kg / plateMin) * plateMin;
}

// Calculer 1RM avec les 5 formules
export function calculer1RM(poids: number, reps: number): ResultatRM {
  if (poids <= 0 || reps <= 0 || reps > 100) {
    return {
      brzycki: 0,
      epley: 0,
      lander: 0,
      lombardi: 0,
      oconnor: 0,
      moyenne: 0,
      moyenneArrondie: 0,
    };
  }

  // Brzycki (la plus utilisee en powerlifting)
  const brzycki = poids / (1.0278 - 0.0278 * reps);

  // Epley (populaire aussi)
  const epley = poids * (1 + reps / 30);

  // Lander
  const lander = (100 * poids) / (101.3 - 2.67123 * reps);

  // Lombardi (loi puissance)
  const lombardi = poids * Math.pow(reps, 0.1);

  // O'Connor (lineaire)
  const oconnor = poids * (1 + 0.025 * reps);

  // Moyenne des 5
  const moyenne = (brzycki + epley + lander + lombardi + oconnor) / 5;

  // Arrondir a 2.5 kg
  const moyenneArrondie = arrondirAuPlate(moyenne, 2.5);

  return {
    brzycki: Math.round(brzycki * 10) / 10,
    epley: Math.round(epley * 10) / 10,
    lander: Math.round(lander * 10) / 10,
    lombardi: Math.round(lombardi * 10) / 10,
    oconnor: Math.round(oconnor * 10) / 10,
    moyenne: Math.round(moyenne * 10) / 10,
    moyenneArrondie,
  };
}

// Calculer charge pour N reps a partir du 1RM (formule Brzycki inversee)
export function chargePourReps(oneRM: number, reps: number): number {
  if (oneRM <= 0 || reps <= 0) return 0;
  // Charge = 1RM × (1.0278 - 0.0278 × reps)
  const charge = oneRM * (1.0278 - 0.0278 * reps);
  return Math.round(charge * 10) / 10;
}

// Calculer le poids pour un pourcentage du 1RM
export function pourcentDe1RM(oneRM: number, pourcent: number): number {
  if (oneRM <= 0 || pourcent < 0 || pourcent > 100) return 0;
  const charge = oneRM * (pourcent / 100);
  return Math.round(charge * 10) / 10;
}
