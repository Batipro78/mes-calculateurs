// Simulateur Voiture Electrique vs Thermique — Cout total de possession

export interface VehiculeConfig {
  prixAchat: number;
  kmAnnuels: number;
  dureeAnnees: number;
  // Thermique
  consoThermique: number; // L/100km
  prixCarburant: number; // €/L
  entretienThermique: number; // €/an
  assuranceThermique: number; // €/an
  // Electrique
  consoElectrique: number; // kWh/100km
  prixKwh: number; // €/kWh
  prixAchatElec: number;
  entretienElec: number; // €/an
  assuranceElec: number; // €/an
  bonusEcologique: number;
}

export interface Resultat {
  thermique: {
    coutTotal: number;
    coutMensuel: number;
    coutKm: number;
    carburant: number;
    entretien: number;
    assurance: number;
    depreciation: number;
  };
  electrique: {
    coutTotal: number;
    coutMensuel: number;
    coutKm: number;
    energie: number;
    entretien: number;
    assurance: number;
    depreciation: number;
    bonus: number;
  };
  economie: number; // positive = electrique gagne
  seuilRentabiliteKm: number; // km/an ou electrique devient rentable
  co2EconomieTonnes: number;
  annees: { annee: number; cumulTherm: number; cumulElec: number }[];
}

// Depreciation: 15% annee 1, 12% annee 2, 10% annee 3, 8% apres
function calcDepreciation(prixAchat: number, dureeAnnees: number): number {
  let valeur = prixAchat;
  const taux = [0.15, 0.12, 0.10];
  for (let i = 0; i < dureeAnnees; i++) {
    const t = i < taux.length ? taux[i] : 0.08;
    valeur -= prixAchat * t;
  }
  return Math.max(0, prixAchat - valeur);
}

function depreciationAnnee(prixAchat: number, annee: number): number {
  const taux = [0.15, 0.12, 0.10];
  const t = annee < taux.length ? taux[annee] : 0.08;
  return prixAchat * t;
}

export function calcEvVsTherm(config: VehiculeConfig): Resultat {
  const {
    prixAchat,
    kmAnnuels,
    dureeAnnees,
    consoThermique,
    prixCarburant,
    entretienThermique,
    assuranceThermique,
    consoElectrique,
    prixKwh,
    prixAchatElec,
    entretienElec,
    assuranceElec,
    bonusEcologique,
  } = config;

  const kmTotal = kmAnnuels * dureeAnnees;

  // --- Thermique ---
  const carburantTotal = (kmTotal / 100) * consoThermique * prixCarburant;
  const entretienThermTotal = entretienThermique * dureeAnnees;
  const assuranceThermTotal = assuranceThermique * dureeAnnees;
  const depreciationTherm = calcDepreciation(prixAchat, dureeAnnees);
  const coutTotalTherm =
    carburantTotal + entretienThermTotal + assuranceThermTotal + depreciationTherm;

  // --- Electrique ---
  const energieTotal = (kmTotal / 100) * consoElectrique * prixKwh;
  const entretienElecTotal = entretienElec * dureeAnnees;
  const assuranceElecTotal = assuranceElec * dureeAnnees;
  const depreciationElec = calcDepreciation(prixAchatElec, dureeAnnees);
  const coutTotalElec =
    energieTotal +
    entretienElecTotal +
    assuranceElecTotal +
    depreciationElec -
    bonusEcologique;

  // --- Economie ---
  const economie = coutTotalTherm - coutTotalElec;

  // --- Seuil de rentabilite (km/an) ---
  // Cout fixe annuel thermique vs electrique
  const coutFixeAnnuelTherm =
    entretienThermique + assuranceThermique + prixAchat * 0.1; // approx 10% depreciation moyenne
  const coutFixeAnnuelElec =
    entretienElec + assuranceElec + prixAchatElec * 0.1 - bonusEcologique / dureeAnnees;
  const coutKmTherm = (consoThermique / 100) * prixCarburant;
  const coutKmElec = (consoElectrique / 100) * prixKwh;
  const diffCoutKm = coutKmTherm - coutKmElec;
  const diffCoutFixe = coutFixeAnnuelElec - coutFixeAnnuelTherm;
  const seuilRentabiliteKm =
    diffCoutKm > 0 ? Math.max(0, Math.round(diffCoutFixe / diffCoutKm)) : 0;

  // --- CO2 ---
  // Thermique: ~120g/km, Electrique: 0g direct
  const co2EconomieTonnes = (kmTotal * 120) / 1_000_000;

  // --- Annees ---
  const annees: { annee: number; cumulTherm: number; cumulElec: number }[] = [];
  let cumulTherm = 0;
  let cumulElec = -bonusEcologique; // bonus deduit au depart
  for (let i = 0; i < dureeAnnees; i++) {
    const carburantAn = (kmAnnuels / 100) * consoThermique * prixCarburant;
    const energieAn = (kmAnnuels / 100) * consoElectrique * prixKwh;
    const depTherm = depreciationAnnee(prixAchat, i);
    const depElec = depreciationAnnee(prixAchatElec, i);

    cumulTherm += carburantAn + entretienThermique + assuranceThermique + depTherm;
    cumulElec += energieAn + entretienElec + assuranceElec + depElec;

    annees.push({
      annee: i + 1,
      cumulTherm: Math.round(cumulTherm),
      cumulElec: Math.round(cumulElec),
    });
  }

  const moisTotal = dureeAnnees * 12;

  return {
    thermique: {
      coutTotal: Math.round(coutTotalTherm),
      coutMensuel: Math.round(coutTotalTherm / moisTotal),
      coutKm: +(coutTotalTherm / kmTotal).toFixed(3),
      carburant: Math.round(carburantTotal),
      entretien: Math.round(entretienThermTotal),
      assurance: Math.round(assuranceThermTotal),
      depreciation: Math.round(depreciationTherm),
    },
    electrique: {
      coutTotal: Math.round(coutTotalElec),
      coutMensuel: Math.round(coutTotalElec / moisTotal),
      coutKm: +(coutTotalElec / kmTotal).toFixed(3),
      energie: Math.round(energieTotal),
      entretien: Math.round(entretienElecTotal),
      assurance: Math.round(assuranceElecTotal),
      depreciation: Math.round(depreciationElec),
      bonus: bonusEcologique,
    },
    economie: Math.round(economie),
    seuilRentabiliteKm,
    co2EconomieTonnes: +co2EconomieTonnes.toFixed(1),
    annees,
  };
}
