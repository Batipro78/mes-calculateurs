export interface ResultatGain {
  mise: number;
  coteDecimale: number;
  gainTotal: number;
  beneficeNet: number;
  coteFractionnelle: string;
  coteAmericaine: number;
  probaImplicite: number;
}

export function calculerGain(mise: number, coteDecimale: number): ResultatGain {
  const gainTotal = mise * coteDecimale;
  const beneficeNet = gainTotal - mise;
  const coteFractionnelle = decimaleVersFraction(coteDecimale);
  const coteAmericaine = decimaleVersAmericaine(coteDecimale);
  const probaImplicite = coteVersProba(coteDecimale);

  return {
    mise,
    coteDecimale,
    gainTotal,
    beneficeNet,
    coteFractionnelle,
    coteAmericaine,
    probaImplicite,
  };
}

export function decimaleVersFraction(cote: number): string {
  const fraction = cote - 1;

  // Cas particuliers courants
  const fractions: Record<number, string> = {
    0.2: "1/5",
    0.25: "1/4",
    0.33: "1/3",
    0.5: "1/2",
    0.66: "2/3",
    0.75: "3/4",
    1: "1/1",
    1.5: "3/2",
    2: "2/1",
    2.5: "5/2",
    3: "3/1",
    4: "4/1",
    5: "5/1",
  };

  // Chercher correspondance exacte
  const key = Math.round(fraction * 100) / 100;
  if (fractions[key]) {
    return fractions[key];
  }

  // Approximation simple pour autres cas
  const denom = 100;
  const num = Math.round(fraction * denom);
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(num, denom);
  return `${num / divisor}/${denom / divisor}`;
}

export function decimaleVersAmericaine(cote: number): number {
  if (cote >= 2.0) {
    return (cote - 1) * 100;
  } else {
    return -100 / (cote - 1);
  }
}

export function coteVersProba(cote: number): number {
  return (1 / cote) * 100;
}
