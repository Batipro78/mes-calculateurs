// Helper pour conversion cote ↔ probabilite

export interface ResultatConversion {
  decimal: number;
  fractionnelle: string;
  americaine: number;
  proba: number; // en %
}

// PGCD pour simplifier fractions
function pgcd(a: number, b: number): number {
  return b === 0 ? a : pgcd(b, a % b);
}

// Decimaleto proba
function decimalVersProba(decimal: number): number {
  return (1 / decimal) * 100;
}

// Decimal vers fractionnelle (simplifiee)
export function decimaleVersFraction(decimal: number): string {
  const fraction = decimal - 1; // Decimal 2.5 = 1.5 = 3/2

  // Fractions courantes precalcules pour eviter erreurs floating-point
  const commutations: { [key: number]: string } = {
    0.5: "1/2",
    1: "1/1",
    1.5: "3/2",
    2: "2/1",
    2.5: "5/2",
    3: "3/1",
    4: "4/1",
    5: "5/1",
    6: "6/1",
    7: "7/1",
    8: "8/1",
    9: "9/1",
  };

  if (commutations[fraction]) {
    return commutations[fraction];
  }

  // Algorithme fallback
  const num = Math.round(fraction * 1000);
  const den = 1000;
  const g = pgcd(num, den);
  return `${num / g}/${den / g}`;
}

// Decimal vers Americaine
export function decimaleVersAmericaine(decimal: number): number {
  if (decimal >= 2) {
    return Math.round((decimal - 1) * 100);
  } else {
    return Math.round(-100 / (decimal - 1));
  }
}

// Fractionnelle (string "5/2") vers Decimal
export function fractionVersDecimale(fraction: string): number | null {
  const match = fraction.match(/^(\d+)\/(\d+)$/);
  if (!match) return null;
  const [, num, den] = match;
  return 1 + parseInt(num) / parseInt(den);
}

// Americaine vers Decimal
export function americaineVersDecimale(americain: number): number {
  if (americain > 0) {
    return 1 + americain / 100;
  } else {
    return 1 + 100 / (-americain);
  }
}

// Probabilite (%) vers tous les formats
export function probaVersCote(proba_pourcent: number): ResultatConversion {
  if (proba_pourcent <= 0 || proba_pourcent > 100) {
    return {
      decimal: 0,
      fractionnelle: "0/1",
      americaine: 0,
      proba: proba_pourcent,
    };
  }

  const decimal = 100 / proba_pourcent;
  return {
    decimal: Math.round(decimal * 100) / 100,
    fractionnelle: decimaleVersFraction(decimal),
    americaine: decimaleVersAmericaine(decimal),
    proba: Math.round(proba_pourcent * 100) / 100,
  };
}

// Cote decimale vers tous les formats
export function coteDecimaleVersToutFormat(
  decimal: number
): ResultatConversion {
  if (decimal <= 0) {
    return {
      decimal: 0,
      fractionnelle: "0/1",
      americaine: 0,
      proba: 0,
    };
  }

  const proba = decimalVersProba(decimal);
  return {
    decimal: Math.round(decimal * 100) / 100,
    fractionnelle: decimaleVersFraction(decimal),
    americaine: decimaleVersAmericaine(decimal),
    proba: Math.round(proba * 100) / 100,
  };
}

// Cote fractionnelle vers tous les formats
export function coteFractionVerstoFormat(
  fraction: string
): ResultatConversion | null {
  const decimal = fractionVersDecimale(fraction);
  if (decimal === null) return null;
  return coteDecimaleVersToutFormat(decimal);
}

// Cote americaine vers tous les formats
export function coteAmericaineVersToutFormat(
  americain: number
): ResultatConversion {
  const decimal = americaineVersDecimale(americain);
  return coteDecimaleVersToutFormat(decimal);
}

// Calculer marge bookmaker (somme probas - 100%)
export function calculerMargeBookmaker(cotes_decimales: number[]): number {
  const sommeProbas = cotes_decimales.reduce((acc, cote) => {
    return acc + decimalVersProba(cote);
  }, 0);
  return Math.round((sommeProbas - 100) * 100) / 100; // Marge en %
}
