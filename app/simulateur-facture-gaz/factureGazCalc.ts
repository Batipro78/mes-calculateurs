// Tarifs reglementeS GRDF Q1 2026 — approximations
// Abonnements annuels TTC
const ABONNEMENTS: Record<string, number> = {
  cuisson: 102,
  "eau-chaude": 102,
  chauffage: 257,
};

// Prix du kWh TTC par zone tarifaire GRDF
const PRIX_KWH_ZONE: Record<string, number> = {
  zone1: 0.1284,
  zone2: 0.1324,
  zone3: 0.1365,
  zone4: 0.1406,
  zone5: 0.1447,
  zone6: 0.1488,
};

// Consommations typiques en kWh/an par usage
export const CONSOMMATIONS_TYPIQUES: Record<string, number> = {
  cuisson: 1000,
  "eau-chaude": 3500,
  "chauffage-50m2": 8000,
  "chauffage-80m2": 13000,
  "chauffage-120m2": 20000,
};

export interface ResultatFactureGaz {
  // Tarifs utilises
  prixKwh: number;
  abonnementAnnuel: number;
  // Decomposition mensuelle
  abonnementMensuel: number;
  consommationMensuelle: number;
  ctaMensuelle: number;
  tva55: number;
  tva20: number;
  ticgn: number;
  // Totaux
  factureMensuelle: number;
  factureAnnuelle: number;
  // Comparaison fournisseurs
  comparaisonFournisseurs: {
    nom: string;
    prixKwh: number;
    factureAnnuelle: number;
  }[];
}

export function calcFactureGaz(
  consommationKwh: number,
  zone: string,
  usage: string,
  fournisseur: string
): ResultatFactureGaz {
  // Tarif de base selon la zone
  const prixKwh = PRIX_KWH_ZONE[zone] ?? PRIX_KWH_ZONE["zone2"];

  // Usage pour l'abonnement : cuisson, eau-chaude ou chauffage
  const usageAbonnement = usage.startsWith("chauffage") ? "chauffage" : usage;
  const abonnementAnnuel = ABONNEMENTS[usageAbonnement] ?? ABONNEMENTS["chauffage"];

  // Decomposition mensuelle
  const abonnementMensuel = abonnementAnnuel / 12;
  const consommationMensuelle = (consommationKwh * prixKwh) / 12;
  // CTA (Contribution Tarifaire d'Acheminement) = 20,82% de l'abonnement annuel / 12
  const ctaMensuelle = (abonnementAnnuel * 0.2082) / 12;
  // TVA 5,5% sur abonnement + CTA
  const tva55 = (abonnementMensuel + ctaMensuelle) * 0.055;
  // TVA 20% sur la consommation
  const tva20 = consommationMensuelle * 0.2;
  // TICGN (Taxe Interieure de Consommation sur le Gaz Naturel)
  const ticgn = (consommationKwh * 0.00837) / 12;

  const factureMensuelle =
    abonnementMensuel +
    consommationMensuelle +
    ctaMensuelle +
    tva55 +
    tva20 +
    ticgn;

  const factureAnnuelle = factureMensuelle * 12;

  // Comparaison fournisseurs (variations +/- 5% autour du tarif reglemente)
  const comparaisonFournisseurs = [
    { nom: "Tarif reglemente GRDF", variation: 0 },
    { nom: "EDF", variation: -0.02 },
    { nom: "Engie", variation: 0.01 },
    { nom: "TotalEnergies", variation: -0.04 },
    { nom: "Eni", variation: 0.03 },
  ].map(({ nom, variation }) => {
    const px = prixKwh * (1 + variation);
    const consoM = (consommationKwh * px) / 12;
    const tva20F = consoM * 0.2;
    const facM =
      abonnementMensuel + consoM + ctaMensuelle + tva55 + tva20F + ticgn;
    return {
      nom,
      prixKwh: parseFloat(px.toFixed(4)),
      factureAnnuelle: parseFloat((facM * 12).toFixed(2)),
    };
  });

  return {
    prixKwh,
    abonnementAnnuel,
    abonnementMensuel: parseFloat(abonnementMensuel.toFixed(2)),
    consommationMensuelle: parseFloat(consommationMensuelle.toFixed(2)),
    ctaMensuelle: parseFloat(ctaMensuelle.toFixed(2)),
    tva55: parseFloat(tva55.toFixed(2)),
    tva20: parseFloat(tva20.toFixed(2)),
    ticgn: parseFloat(ticgn.toFixed(2)),
    factureMensuelle: parseFloat(factureMensuelle.toFixed(2)),
    factureAnnuelle: parseFloat(factureAnnuelle.toFixed(2)),
    comparaisonFournisseurs,
  };
}
