export type TypeCarburant = "essence" | "diesel" | "electrique" | "hybride" | "gpl";

export interface CarburantInfo {
  id: TypeCarburant;
  nom: string;
  prixMoyen: number; // €/L ou €/kWh pour electrique
  unite: string;
  emoji: string;
  description: string;
  empreinte: number; // kg CO2 / unite
}

export interface ResultatCoutTrajet {
  distance: number;
  consommation: number;
  prixUnitaire: number;
  peages: number;
  carburant: TypeCarburant;

  // Resultats principaux
  carburantConsomme: number; // litres ou kWh
  coutCarburant: number;
  coutTotal: number;
  coutParKm: number;

  // Comparaisons
  prixTrainEstime: number;
  prixAvionEstime: number;
  economieVsTrain: number;
  economieVsAvion: number;

  // Empreinte carbone
  emissionsCO2: number;
  arbresEquivalents: number;

  // Aller-retour
  coutAllerRetour: number;
}

export const CARBURANTS: CarburantInfo[] = [
  {
    id: "essence",
    nom: "Essence (SP95/SP98)",
    prixMoyen: 1.8,
    unite: "L",
    emoji: "⛽",
    description: "Prix moyen France 2026",
    empreinte: 2.28,
  },
  {
    id: "diesel",
    nom: "Diesel (Gazole)",
    prixMoyen: 1.72,
    unite: "L",
    emoji: "🛢️",
    description: "Prix moyen France 2026",
    empreinte: 2.62,
  },
  {
    id: "electrique",
    nom: "Electrique",
    prixMoyen: 0.3,
    unite: "kWh",
    emoji: "🔌",
    description: "Tarif moyen domicile",
    empreinte: 0.06,
  },
  {
    id: "hybride",
    nom: "Hybride",
    prixMoyen: 1.8,
    unite: "L",
    emoji: "🔋",
    description: "Prix essence (consommation reduite)",
    empreinte: 2.28,
  },
  {
    id: "gpl",
    nom: "GPL",
    prixMoyen: 1.0,
    unite: "L",
    emoji: "⛽",
    description: "Prix moyen France 2026",
    empreinte: 1.65,
  },
];

export function getCarburantInfo(carburant: TypeCarburant): CarburantInfo {
  return CARBURANTS.find((c) => c.id === carburant)!;
}

export function calculerCoutTrajet(
  distance: number,
  consommation: number,
  prixUnitaire: number,
  peages: number,
  carburant: TypeCarburant,
): ResultatCoutTrajet {
  const dist = Math.max(0, distance);
  const conso = Math.max(0, consommation);
  const prix = Math.max(0, prixUnitaire);
  const pe = Math.max(0, peages);

  // Carburant consomme : (distance × conso / 100)
  const carburantConsomme = (dist * conso) / 100;
  const coutCarburant = carburantConsomme * prix;
  const coutTotal = coutCarburant + pe;
  const coutParKm = dist > 0 ? coutTotal / dist : 0;
  const coutAllerRetour = coutCarburant * 2 + pe * 2;

  // Comparaisons (estimations basees sur prix moyens 2026)
  // Train SNCF : ~0.15 €/km (TER) a 0.25 €/km (TGV)
  const prixTrainEstime = dist * 0.18;
  // Avion : pertinent uniquement >500km, ~0.10-0.20 €/km low cost
  const prixAvionEstime = dist >= 500 ? dist * 0.12 + 50 : 0;

  const economieVsTrain = prixTrainEstime - coutTotal;
  const economieVsAvion = prixAvionEstime > 0 ? prixAvionEstime - coutTotal : 0;

  // Empreinte CO2
  const info = getCarburantInfo(carburant);
  const emissionsCO2 = carburantConsomme * info.empreinte;
  // 1 arbre absorbe ~25 kg CO2/an
  const arbresEquivalents = emissionsCO2 / 25;

  return {
    distance: dist,
    consommation: conso,
    prixUnitaire: prix,
    peages: pe,
    carburant,
    carburantConsomme: Math.round(carburantConsomme * 100) / 100,
    coutCarburant: Math.round(coutCarburant * 100) / 100,
    coutTotal: Math.round(coutTotal * 100) / 100,
    coutParKm: Math.round(coutParKm * 1000) / 1000,
    prixTrainEstime: Math.round(prixTrainEstime * 100) / 100,
    prixAvionEstime: Math.round(prixAvionEstime * 100) / 100,
    economieVsTrain: Math.round(economieVsTrain * 100) / 100,
    economieVsAvion: Math.round(economieVsAvion * 100) / 100,
    emissionsCO2: Math.round(emissionsCO2 * 100) / 100,
    arbresEquivalents: Math.round(arbresEquivalents * 100) / 100,
    coutAllerRetour: Math.round(coutAllerRetour * 100) / 100,
  };
}

// Distances populaires (km)
export interface TrajetPredefini {
  slug: string;
  origine: string;
  destination: string;
  distanceKm: number;
  peagesEstimes: number;
}

export const TRAJETS_POPULAIRES: TrajetPredefini[] = [
  { slug: "paris-lyon", origine: "Paris", destination: "Lyon", distanceKm: 465, peagesEstimes: 38 },
  { slug: "paris-marseille", origine: "Paris", destination: "Marseille", distanceKm: 776, peagesEstimes: 62 },
  { slug: "paris-bordeaux", origine: "Paris", destination: "Bordeaux", distanceKm: 583, peagesEstimes: 56 },
  { slug: "paris-toulouse", origine: "Paris", destination: "Toulouse", distanceKm: 678, peagesEstimes: 60 },
  { slug: "paris-nantes", origine: "Paris", destination: "Nantes", distanceKm: 385, peagesEstimes: 35 },
  { slug: "paris-strasbourg", origine: "Paris", destination: "Strasbourg", distanceKm: 489, peagesEstimes: 38 },
  { slug: "paris-lille", origine: "Paris", destination: "Lille", distanceKm: 222, peagesEstimes: 17 },
  { slug: "lyon-marseille", origine: "Lyon", destination: "Marseille", distanceKm: 314, peagesEstimes: 27 },
  { slug: "lyon-bordeaux", origine: "Lyon", destination: "Bordeaux", distanceKm: 555, peagesEstimes: 48 },
  { slug: "marseille-nice", origine: "Marseille", destination: "Nice", distanceKm: 200, peagesEstimes: 18 },
];

export const CARBURANTS_SLUGS: TypeCarburant[] = ["essence", "diesel", "electrique"];
