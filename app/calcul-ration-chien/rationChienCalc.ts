// Logique de calcul pour ration alimentaire chien
// Sources: Royal Canin, WSAVA, Association BARF France

export type Methode = "barf" | "croquettes" | "patee";
export type Activite = "sedentaire" | "normal" | "actif";
export type Stade = "chiot" | "adulte" | "senior" | "surpoids";

export interface InputRation {
  poids: number; // kg
  methode: Methode;
  activite: Activite;
  stade: Stade;
  ageChiot?: number; // mois, uniquement si stade === "chiot"
}

export interface RepartitionBARF {
  viande: number;
  os: number;
  legumes: number;
  fruits: number;
  supplements: number;
}

export interface ResultatRation {
  quantiteTotal: number; // g/jour
  methode: Methode;
  repartitionBARF?: RepartitionBARF;
  nbreRepas: number;
  conseil: string;
}

// Tableau Royal Canin standard (croquettes adulte, activité normale)
const ROYAL_CANIN_TABLE: Record<number, number> = {
  2: 60,
  5: 100,
  10: 165,
  15: 220,
  20: 275,
  25: 315,
  30: 360,
  40: 450,
  50: 530,
};

function interpolateRoyalCanin(poids: number): number {
  const sortedPoids = Object.keys(ROYAL_CANIN_TABLE)
    .map(Number)
    .sort((a, b) => a - b);

  // Exact match
  if (ROYAL_CANIN_TABLE[poids] !== undefined) {
    return ROYAL_CANIN_TABLE[poids];
  }

  // Find surrounding values
  let below = sortedPoids[0];
  let above = sortedPoids[sortedPoids.length - 1];

  for (const p of sortedPoids) {
    if (p <= poids) below = p;
    if (p >= poids && above === sortedPoids[0]) above = p;
  }

  if (below === above) {
    return ROYAL_CANIN_TABLE[below];
  }

  // Linear interpolation
  const y1 = ROYAL_CANIN_TABLE[below];
  const y2 = ROYAL_CANIN_TABLE[above];
  const ratio = (poids - below) / (above - below);

  return y1 + ratio * (y2 - y1);
}

function calculerRationCroquettes(
  poids: number,
  activite: Activite,
  stade: Stade,
): number {
  // Formule simplifiée: ration_g/jour = 30 × poids^0.75 × facteur_activite

  let facteur = 1.6; // normal
  if (activite === "sedentaire") facteur = 1.4;
  if (activite === "actif") facteur = 1.8;

  if (stade === "chiot") facteur = 2.0;
  if (stade === "senior") facteur = 1.3;
  if (stade === "surpoids") facteur = 1.2;

  // Utiliser la table Royal Canin comme base pour la cohérence
  const baseRoyalCanin = interpolateRoyalCanin(poids);

  // Appliquer le facteur d'ajustement
  const ajustement = facteur / 1.6; // 1.6 est le "normal"
  return Math.round(baseRoyalCanin * ajustement);
}

function calculerRationBARF(
  poids: number,
  activite: Activite,
  stade: Stade,
): { quantiteTotal: number; repartition: RepartitionBARF } {
  let pourcentagePoids = 2.5; // normal

  // Par activité
  if (activite === "sedentaire") pourcentagePoids = 2.0;
  if (activite === "actif") pourcentagePoids = 3.0;

  // Par stade
  if (stade === "chiot") pourcentagePoids = 5.0; // moyenne entre 2-12 mois
  if (stade === "senior") pourcentagePoids = 1.75;
  if (stade === "surpoids") pourcentagePoids = 1.5;

  const quantiteTotal = Math.round((poids * pourcentagePoids) / 100 * 1000);

  // Répartition BARF standard (70/10/10/5/5)
  const repartition: RepartitionBARF = {
    viande: Math.round(quantiteTotal * 0.7), // 70%
    os: Math.round(quantiteTotal * 0.1), // 10%
    legumes: Math.round(quantiteTotal * 0.1), // 10%
    fruits: Math.round(quantiteTotal * 0.05), // 5%
    supplements: Math.round(quantiteTotal * 0.05), // 5%
  };

  return { quantiteTotal, repartition };
}

function calculerRationPatee(
  poids: number,
  activite: Activite,
  stade: Stade,
): number {
  // Pâtée ~75% eau, donc ~4x plus en poids que croquettes
  const croquettes = calculerRationCroquettes(poids, activite, stade);
  return Math.round(croquettes * 4);
}

export function calculerRation(input: InputRation): ResultatRation {
  const { poids, methode, activite, stade } = input;

  let quantiteTotal: number;
  let repartitionBARF: RepartitionBARF | undefined;

  if (methode === "barf") {
    const result = calculerRationBARF(poids, activite, stade);
    quantiteTotal = result.quantiteTotal;
    repartitionBARF = result.repartition;
  } else if (methode === "croquettes") {
    quantiteTotal = calculerRationCroquettes(poids, activite, stade);
  } else {
    // patee
    quantiteTotal = calculerRationPatee(poids, activite, stade);
  }

  // Nombre de repas conseillés
  let nbreRepas = 2;
  if (stade === "chiot") nbreRepas = 4; // chiot < 4 mois
  if (stade === "chiot" && input.ageChiot && input.ageChiot >= 4) nbreRepas = 3;
  if (stade === "chiot" && input.ageChiot && input.ageChiot >= 6) nbreRepas = 2;

  let conseil = `${nbreRepas} repas par jour`;
  if (stade === "chiot" && input.ageChiot) {
    if (input.ageChiot < 4) {
      conseil = "4 repas par jour (allaitement naturel jusqu&apos;à 3-4 semaines)";
    } else if (input.ageChiot < 6) {
      conseil = "3 repas par jour";
    } else {
      conseil = "2 repas par jour";
    }
  }

  return {
    quantiteTotal,
    methode,
    repartitionBARF,
    nbreRepas,
    conseil,
  };
}
