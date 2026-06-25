// Calcul de la temperature ressentie en periode de chaleur (indice Humidex).
// Humidex = T + 0,5555 x (e - 10), ou e est la pression de vapeur d'eau (hPa),
// calculee a partir de la temperature et de l'humidite relative (formule de Magnus).

export type NiveauHumidex =
  | "confort"
  | "inconfort"
  | "intense"
  | "danger"
  | "extreme";

export interface HumidexInput {
  temperature: number; // degres Celsius
  humidite: number; // % d'humidite relative (0-100)
  ventilateur: boolean;
}

export interface HumidexResult {
  humidex: number; // indice de chaleur (ressenti de base)
  ressenti: number; // humidex ajuste de l'effet ventilateur eventuel
  niveau: NiveauHumidex;
  label: string;
  conseil: string;
  ventiloEffet: number; // degres ressentis en moins grace au ventilateur
  ventiloContreProductif: boolean; // true au-dela de 37 degres
}

function niveauFromHumidex(h: number): {
  niveau: NiveauHumidex;
  label: string;
  conseil: string;
} {
  if (h < 30)
    return {
      niveau: "confort",
      label: "Confortable",
      conseil:
        "Peu ou pas d'inconfort lie a la chaleur. Hydratez-vous normalement.",
    };
  if (h < 40)
    return {
      niveau: "inconfort",
      label: "Inconfort",
      conseil:
        "Sensation de chaleur marquee. Buvez regulierement et evitez les efforts aux heures les plus chaudes.",
    };
  if (h < 46)
    return {
      niveau: "intense",
      label: "Inconfort intense",
      conseil:
        "Chaleur eprouvante. Limitez l'activite physique, restez au frais et hydratez-vous abondamment.",
    };
  if (h < 54)
    return {
      niveau: "danger",
      label: "Danger",
      conseil:
        "Risque de coup de chaleur en cas d'effort ou d'exposition prolongee. Surveillez les personnes fragiles.",
    };
  return {
    niveau: "extreme",
    label: "Danger extreme",
    conseil:
      "Coup de chaleur probable. Cessez toute activite, mettez-vous au frais et appelez les secours en cas de malaise.",
  };
}

export function calculerHumidex(input: HumidexInput): HumidexResult {
  const T = input.temperature;
  const RH = Math.min(100, Math.max(0, input.humidite || 0));

  // Pression de vapeur (hPa) via la formule de Magnus
  const e = (RH / 100) * 6.112 * Math.exp((17.62 * T) / (243.12 + T));
  const humidexRaw = T + 0.5555 * (e - 10);
  // L'humidex n'est defini que pour la chaleur : sous la temperature de l'air, on garde T.
  const humidex = humidexRaw < T ? T : humidexRaw;

  let ventiloEffet = 0;
  let ventiloContreProductif = false;
  if (input.ventilateur) {
    if (T >= 37) {
      // Au-dela de ~37 degres, le ventilateur brasse de l'air plus chaud que la peau :
      // il n'aide plus et peut accentuer la deshydratation.
      ventiloContreProductif = true;
      ventiloEffet = 0;
    } else {
      ventiloEffet = 3.5; // effet vent moyen sur le ressenti cutane
    }
  }

  const ressenti = humidex - ventiloEffet;
  const { niveau, label, conseil } = niveauFromHumidex(humidex);

  return {
    humidex: Math.round(humidex * 10) / 10,
    ressenti: Math.round(ressenti * 10) / 10,
    niveau,
    label,
    conseil,
    ventiloEffet,
    ventiloContreProductif,
  };
}
