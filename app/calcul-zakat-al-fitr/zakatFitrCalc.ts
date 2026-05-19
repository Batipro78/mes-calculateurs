export type SourceMontant = "mosquee-paris" | "cfcm" | "libre";

export interface InputZakatFitr {
  nb_adultes: number;
  nb_enfants: number;
  source: SourceMontant;
  montant_libre?: number;
}

export interface ResultatZakatFitr {
  total_personnes: number;
  montant_par_personne: number;
  total: number;
}

export const MONTANTS_2026 = {
  "mosquee-paris": 7,
  "cfcm": 9,
} as const;

export function calculerZakatFitr(input: InputZakatFitr): ResultatZakatFitr {
  const total_personnes = input.nb_adultes + input.nb_enfants;

  if (total_personnes <= 0) {
    return {
      total_personnes: 0,
      montant_par_personne: 0,
      total: 0,
    };
  }

  let montant_par_personne = 0;

  if (input.source === "mosquee-paris") {
    montant_par_personne = MONTANTS_2026["mosquee-paris"];
  } else if (input.source === "cfcm") {
    montant_par_personne = MONTANTS_2026["cfcm"];
  } else if (input.source === "libre" && input.montant_libre !== undefined) {
    montant_par_personne = Math.max(0, input.montant_libre);
  }

  const total = Math.round(total_personnes * montant_par_personne * 100) / 100;

  return {
    total_personnes,
    montant_par_personne,
    total,
  };
}
