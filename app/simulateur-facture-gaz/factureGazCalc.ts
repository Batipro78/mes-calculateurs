// Prix repere de vente de gaz naturel de la CRE (Commission de regulation de l'energie),
// grille du 1er octobre 2026, zone de distribution GRDF (environ 95 % des clients residentiels).
// Source : https://www.cre.fr/documents/open-data/construction-du-prix-repere-de-vente-de-gaz-de-la-cre.html
//   (fichier OPEN_DATA_GRDF.xlsx, onglet « Historique grilles », bloc du 1er octobre 2026,
//    onglets « Grille tarifaire TTC » et « Consommateurs types » pour les taxes).
// Le prix repere est PUBLIE CHAQUE MOIS : le prix du kWh change a chaque grille (novembre 2026 :
// 0,15760 EUR/kWh TTC en moyenne pour le chauffage). L'abonnement ne change qu'une ou deux fois par an.
// Les tarifs reglementes de vente de gaz ont pris fin le 30 juin 2023 : ce prix est un repere
// indicatif, chaque fournisseur fixe librement ses offres.
export const MOIS_GRILLE = "octobre 2026";
export const DATE_GRILLE_ISO = "2026-10-01";

export type Niveau = "basse" | "moyenne" | "haute";
type Profil = "cuisson-eau-chaude" | "chauffage";

interface GrilleProfil {
  // Abonnement annuel
  aboHT: number; // EUR/an, hors CTA
  aboTTC: number; // EUR/an, CTA et TVA comprises
  cta: number; // Contribution tarifaire d'acheminement, EUR/an (T1 : cuisson/eau chaude, T2 : chauffage)
  // Prix du kWh HT (avant TICGN et TVA) : fourchette basse / moyenne / haute
  kwhHT: Record<Niveau, number>;
  // Prix du kWh TTC publie par la CRE (TICGN et TVA comprises)
  kwhTTC: Record<Niveau, number>;
}

const GRILLE: Record<Profil, GrilleProfil> = {
  "cuisson-eau-chaude": {
    aboHT: 112.84,
    aboTTC: 152.46,
    cta: 14.21,
    kwhHT: { basse: 0.12805, moyenne: 0.13194, haute: 0.14004 },
    kwhTTC: { basse: 0.17365, moyenne: 0.17832, haute: 0.18804 },
  },
  chauffage: {
    aboHT: 252.04,
    aboTTC: 360.79,
    cta: 48.62,
    kwhHT: { basse: 0.09662, moyenne: 0.10464, haute: 0.12031 },
    kwhTTC: { basse: 0.13594, moyenne: 0.14557, haute: 0.16436 },
  },
};

// Taxes en vigueur au 1er fevrier 2026 (CRE) : TICGN 16,66 EUR/MWh, TVA 20 % sur la part fixe et
// sur la part variable.
export const TICGN_EUR_KWH = 0.01666;
export const TVA = 0.2;

// Repere officiel : « Baisser le chauffage de 1 °C : -7 % de consommation d'energie »
// (ministere de la Transition ecologique et ADEME, « Eau et energie : comment reduire la facture ?
// 50 trucs et astuces »). Le simulateur l'applique tel quel a la consommation de chauffage, par degre.
export const GAIN_PAR_DEGRE = 0.07;

// Consommations typiques en kWh/an : ordres de grandeur du simulateur (pas des valeurs officielles).
// A titre de comparaison, la CRE retient 1 560 kWh/an pour un client « cuisson/eau chaude »
// et 11 370 kWh/an pour un client « chauffage ».
export const CONSOMMATIONS_TYPIQUES: Record<string, number> = {
  cuisson: 1000,
  "eau-chaude": 3500,
  "chauffage-50m2": 8000,
  "chauffage-80m2": 13000,
  "chauffage-120m2": 20000,
};

export const NIVEAUX: { id: Niveau; label: string }[] = [
  { id: "basse", label: "Fourchette basse" },
  { id: "moyenne", label: "Prix repère moyen" },
  { id: "haute", label: "Fourchette haute" },
];

export interface ResultatFactureGaz {
  // Prix utilises
  prixKwh: number; // EUR/kWh TTC
  abonnementAnnuel: number; // EUR/an TTC (CTA et TVA comprises)
  // Decomposition mensuelle, arrondie au centime. La TVA est calculee par difference : la somme des 5 postes
  // est exactement la facture mensuelle affichee.
  abonnementMensuel: number; // hors CTA et hors TVA
  consommationMensuelle: number; // hors TICGN et hors TVA
  ctaMensuelle: number;
  ticgn: number;
  tva: number;
  // Memes postes sur l'annee (arrondis au centime, somme = facture annuelle)
  annuel: { abonnement: number; consommation: number; cta: number; ticgn: number; tva: number };
  // Totaux TTC
  factureMensuelle: number;
  factureAnnuelle: number;
  // Les trois points de la fourchette du prix repere de la CRE
  comparaisonNiveaux: {
    nom: string;
    prixKwh: number;
    factureAnnuelle: number;
  }[];
}

function profilDe(usage: string): Profil {
  return usage.startsWith("chauffage") ? "chauffage" : "cuisson-eau-chaude";
}

// Facture annuelle TTC = abonnement TTC + kWh x prix TTC du kWh (les deux publies par la CRE).
export function factureAnnuelleTTC(consommationKwh: number, niveau: Niveau, usage: string): number {
  const g = GRILLE[profilDe(usage)];
  return g.aboTTC + consommationKwh * g.kwhTTC[niveau];
}

export function calcFactureGaz(consommationKwh: number, niveau: string, usage: string): ResultatFactureGaz {
  const n: Niveau = niveau === "basse" || niveau === "haute" ? niveau : "moyenne";
  const g = GRILLE[profilDe(usage)];

  const r2 = (x: number) => Math.round(x * 100) / 100;
  const totalAnnuel = r2(factureAnnuelleTTC(consommationKwh, n, usage));
  const consoHT = consommationKwh * g.kwhHT[n];
  const ticgnAnnuel = consommationKwh * TICGN_EUR_KWH;
  // Postes annuels arrondis ; la TVA (20 %) est la difference avec le TTC publie.
  const aboA = r2(g.aboHT);
  const consoA = r2(consoHT);
  const ctaA = r2(g.cta);
  const ticgnA = r2(ticgnAnnuel);
  const tvaA = r2(totalAnnuel - aboA - consoA - ctaA - ticgnA);
  // Postes mensuels arrondis ; meme principe.
  const totalMensuel = r2(totalAnnuel / 12);
  const aboM = r2(aboA / 12);
  const consoM = r2(consoA / 12);
  const ctaM = r2(ctaA / 12);
  const ticgnM = r2(ticgnA / 12);
  const tvaM = r2(totalMensuel - aboM - consoM - ctaM - ticgnM);

  const comparaisonNiveaux = NIVEAUX.map(({ id, label }) => ({
    nom: label,
    prixKwh: g.kwhTTC[id],
    factureAnnuelle: parseFloat(factureAnnuelleTTC(consommationKwh, id, usage).toFixed(2)),
  }));

  return {
    prixKwh: g.kwhTTC[n],
    abonnementAnnuel: g.aboTTC,
    abonnementMensuel: aboM,
    consommationMensuelle: consoM,
    ctaMensuelle: ctaM,
    ticgn: ticgnM,
    tva: tvaM,
    annuel: { abonnement: aboA, consommation: consoA, cta: ctaA, ticgn: ticgnA, tva: tvaA },
    factureMensuelle: totalMensuel,
    factureAnnuelle: totalAnnuel,
    comparaisonNiveaux,
  };
}

// Economie annuelle (en EUR TTC) si l'on baisse le chauffage de `degres` degres, au repere
// de 7 % de consommation par degre. Seule la part variable baisse : l'abonnement reste le meme.
export function economieBaisseChauffage(consommationKwh: number, niveau: Niveau, degres: number): number {
  const g = GRILLE.chauffage;
  const kwhEconomises = consommationKwh * Math.min(1, GAIN_PAR_DEGRE * degres);
  return kwhEconomises * g.kwhTTC[niveau];
}
