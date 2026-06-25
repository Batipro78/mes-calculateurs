// Logique de dimensionnement d'une climatisation (puissance frigorifique) + cout.
// Modele simplifie mais aligne sur la regle usuelle "~100 W par m2" (plafond 2,5 m),
// ajustee selon l'isolation, l'exposition, l'etage et les occupants.

export type Isolation = "bonne" | "standard" | "faible";
export type Exposition = "ombragee" | "mixte" | "ensoleillee";

export interface ClimInput {
  surface: number; // m2
  hauteur: number; // m
  isolation: Isolation;
  exposition: Exposition;
  sousToit: boolean;
  occupants: number;
  heuresJour: number;
  prixKwh: number;
  eer: number; // coefficient d'efficacite frigorifique (puissance froid / puissance elec)
}

export interface ClimResult {
  volume: number;
  puissanceW: number; // puissance frigorifique calculee
  puissanceKw: number;
  puissanceBTU: number;
  recommandeW: number; // arrondi au palier commercial de 500 W
  consoElecW: number; // puissance electrique absorbee
  consoJourKwh: number;
  coutJour: number;
  coutMois: number;
  coutEte: number; // estimation sur 3 mois (90 jours)
}

// Coefficients en W de froid par m3. Standard x 2,5 m de plafond = 100 W/m2 (regle usuelle).
const COEFF_ISO: Record<Isolation, number> = {
  bonne: 30,
  standard: 40,
  faible: 50,
};

const COEFF_EXPO: Record<Exposition, number> = {
  ombragee: 1.0,
  mixte: 1.1,
  ensoleillee: 1.2,
};

export function calculerClim(input: ClimInput): ClimResult {
  const surface = Math.max(0, input.surface || 0);
  const hauteur = Math.max(0, input.hauteur || 0);
  const volume = surface * hauteur;

  const base = volume * COEFF_ISO[input.isolation] * COEFF_EXPO[input.exposition];
  const toit = input.sousToit ? 1.15 : 1;
  const occupantsExtra = Math.max(0, (input.occupants || 0) - 2) * 100;

  const puissanceW = base * toit + occupantsExtra;
  const recommandeW = puissanceW > 0 ? Math.ceil(puissanceW / 500) * 500 : 0;
  const puissanceKw = puissanceW / 1000;
  const puissanceBTU = puissanceW * 3.412;

  const eer = input.eer > 0 ? input.eer : 3;
  const consoElecW = puissanceW / eer;
  const consoJourKwh = (consoElecW / 1000) * Math.max(0, input.heuresJour || 0);
  const coutJour = consoJourKwh * Math.max(0, input.prixKwh || 0);
  const coutMois = coutJour * 30;
  const coutEte = coutJour * 90;

  return {
    volume,
    puissanceW,
    puissanceKw,
    puissanceBTU,
    recommandeW,
    consoElecW,
    consoJourKwh,
    coutJour,
    coutMois,
    coutEte,
  };
}
