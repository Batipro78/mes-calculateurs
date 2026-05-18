export interface ResultatCombine {
  cotes: number[];
  mise: number;
  coteTotale: number;
  gainTotal: number;
  beneficeNet: number;
  nbSelections: number;
  probaImplicite: number;
}

export function calculerCombine(
  mise: number,
  cotes: number[]
): ResultatCombine {
  // Filtrer les cotes invalides
  const cotesValides = cotes.filter(
    (c) => typeof c === "number" && c > 0 && !isNaN(c)
  );

  const nbSelections = cotesValides.length;
  let coteTotale = 1;

  for (const cote of cotesValides) {
    coteTotale *= cote;
  }

  const gainTotal = mise * coteTotale;
  const beneficeNet = gainTotal - mise;
  const probaImplicite = nbSelections > 0 ? (1 / coteTotale) * 100 : 0;

  return {
    cotes: cotesValides,
    mise,
    coteTotale,
    gainTotal,
    beneficeNet,
    nbSelections,
    probaImplicite,
  };
}
