// Zakat al-Mal Calculator
// Sources: Coran 9:60, Boukhari/Mouslim hadiths, Al-Azhar, CFCM, ECFR

export type EcoleNisab = "or" | "argent"; // or = majoritaire, argent = hanafite

export interface InputZakat {
  cash: number; // €
  or_grammes: number; // grammes d'or detenu
  argent_grammes: number; // grammes d'argent detenu
  prix_or_eur_g: number; // prix saisi par utilisateur €/g
  prix_argent_eur_g: number; // prix saisi par utilisateur €/g
  actions_valeur: number; // € valeur de marche
  scpi_valeur: number; // € valeur liquidative
  crypto_valeur: number; // € valeur totale
  epargne_assurance: number; // € assurance-vie et livrets
  inventaire_pro: number; // € stock commercial
  creances: number; // € creances recouvrables
  bijoux_valeur: number; // € valeur bijoux portes
  bijoux_inclure: boolean; // selon ecole choisie
  dettes_court_terme: number; // € dettes payables dans 12 mois
  ecole: EcoleNisab;
}

export interface ResultatZakat {
  patrimoine_brut: number;
  patrimoine_net: number;
  nisab_or: number;
  nisab_argent: number;
  nisab_applique: number;
  eligible: boolean;
  zakat: number;
  ecole: EcoleNisab;
}

// Nisab or: 85g a multiplier par prix €/g
const NISAB_OR_GRAMMES = 85;

// Nisab argent: 595g a multiplier par prix €/g
const NISAB_ARGENT_GRAMMES = 595;

// Taux zakat: 2.5% sur patrimoine net
const TAUX_ZAKAT = 0.025;

export function calculerZakat(input: InputZakat): ResultatZakat {
  // Calcul patrimoine brut
  const or_valeur = input.or_grammes * input.prix_or_eur_g;
  const argent_valeur = input.argent_grammes * input.prix_argent_eur_g;
  const bijoux = input.bijoux_inclure ? input.bijoux_valeur : 0;

  const patrimoine_brut =
    input.cash +
    or_valeur +
    argent_valeur +
    input.actions_valeur +
    input.scpi_valeur +
    input.crypto_valeur +
    input.epargne_assurance +
    input.inventaire_pro +
    input.creances +
    bijoux;

  // Patrimoine net = brut - dettes court terme
  const patrimoine_net = Math.max(0, patrimoine_brut - input.dettes_court_terme);

  // Nisab applique selon ecole
  let nisab_or = NISAB_OR_GRAMMES * input.prix_or_eur_g;
  let nisab_argent = NISAB_ARGENT_GRAMMES * input.prix_argent_eur_g;

  const nisab_applique =
    input.ecole === "or" ? nisab_or : nisab_argent;

  // Eligibilite: patrimoine net >= nisab applique
  const eligible = patrimoine_net >= nisab_applique;

  // Zakat = 2.5% du patrimoine net si eligible, sinon 0
  const zakat = eligible ? patrimoine_net * TAUX_ZAKAT : 0;

  return {
    patrimoine_brut: Math.round(patrimoine_brut * 100) / 100,
    patrimoine_net: Math.round(patrimoine_net * 100) / 100,
    nisab_or: Math.round(nisab_or * 100) / 100,
    nisab_argent: Math.round(nisab_argent * 100) / 100,
    nisab_applique: Math.round(nisab_applique * 100) / 100,
    eligible,
    zakat: Math.round(zakat * 100) / 100,
    ecole: input.ecole,
  };
}
