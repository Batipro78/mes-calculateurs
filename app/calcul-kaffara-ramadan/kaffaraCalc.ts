export type TypeCompensation = "kaffara" | "fidya";

export interface InputKaffara {
  type_compensation: TypeCompensation;
  nb_jours: number;
  prix_repas: number; // €
}

export interface ResultatKaffara {
  type_compensation: TypeCompensation;
  nb_jours: number;
  prix_repas: number;
  nb_repas_requis: number;
  total: number;
  detail: string;
}

export const REPAS_DEFAUT_EUR = 9;

export function calculerCompensation(input: InputKaffara): ResultatKaffara {
  const { type_compensation, nb_jours, prix_repas } = input;

  if (nb_jours <= 0) {
    return {
      type_compensation,
      nb_jours: 0,
      prix_repas,
      nb_repas_requis: 0,
      total: 0,
      detail: "",
    };
  }

  let nb_repas_requis = 0;
  let detail_text = "";

  if (type_compensation === "kaffara") {
    // Kaffara: 60 repas par jour rompu volontairement
    nb_repas_requis = nb_jours * 60;
    detail_text =
      nb_jours === 1
        ? "60 repas pour 1 jour rompu volontairement"
        : `${nb_jours} jours × 60 repas = ${nb_repas_requis} repas`;
  } else {
    // Fidya: 1 repas par jour manqué (personnes âgées/malades chroniques)
    nb_repas_requis = nb_jours;
    detail_text =
      nb_jours === 1
        ? "1 repas pour 1 jour manqué"
        : `${nb_jours} jours × 1 repas = ${nb_jours} repas`;
  }

  const total = Math.round(nb_repas_requis * prix_repas * 100) / 100;

  return {
    type_compensation,
    nb_jours,
    prix_repas,
    nb_repas_requis,
    total,
    detail: detail_text,
  };
}
