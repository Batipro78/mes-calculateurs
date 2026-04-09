export interface CoutVoitureResult {
  carburantAnnuel: number;
  carburantTotal: number;
  assuranceTotal: number;
  entretienTotal: number;
  controleTotal: number;
  decote: number;
  valeurRevente: number;
  coutTotal: number;
  coutMensuel: number;
  coutKilometre: number;
  repartition: {
    achat: number;
    carburant: number;
    assurance: number;
    entretien: number;
    ct: number;
  };
}

export interface PresetVehicule {
  nom: string;
  emoji: string;
  prixAchat: number;
  consommation: number;
  assuranceAnnuelle: number;
  entretienAnnuel: number;
  carburantLabel: string;
}

export const PRESETS_VEHICULES: PresetVehicule[] = [
  {
    nom: "Citadine (Clio)",
    emoji: "🚗",
    prixAchat: 18000,
    consommation: 5.5,
    assuranceAnnuelle: 600,
    entretienAnnuel: 500,
    carburantLabel: "L/100km",
  },
  {
    nom: "Berline (308)",
    emoji: "🚘",
    prixAchat: 28000,
    consommation: 5.8,
    assuranceAnnuelle: 750,
    entretienAnnuel: 650,
    carburantLabel: "L/100km",
  },
  {
    nom: "SUV (3008)",
    emoji: "🚙",
    prixAchat: 38000,
    consommation: 7.2,
    assuranceAnnuelle: 900,
    entretienAnnuel: 800,
    carburantLabel: "L/100km",
  },
  {
    nom: "Electrique (e-208)",
    emoji: "⚡",
    prixAchat: 35000,
    consommation: 2.7,
    assuranceAnnuelle: 550,
    entretienAnnuel: 300,
    carburantLabel: "€/100km",
  },
  {
    nom: "Utilitaire (Kangoo)",
    emoji: "🚐",
    prixAchat: 25000,
    consommation: 6.5,
    assuranceAnnuelle: 700,
    entretienAnnuel: 700,
    carburantLabel: "L/100km",
  },
];

export function calcCoutVoiture(
  prixAchat: number,
  kmAnnuels: number,
  consommation: number,
  prixCarburant: number,
  assuranceAnnuelle: number,
  entretienAnnuel: number,
  dureeDetention: number
): CoutVoitureResult {
  // Carburant : (km / 100) * conso * prix
  const carburantAnnuel = (kmAnnuels / 100) * consommation * prixCarburant;
  const carburantTotal = carburantAnnuel * dureeDetention;

  // Assurance
  const assuranceTotal = assuranceAnnuelle * dureeDetention;

  // Entretien : augmente de 10% par an apres l'annee 3
  let entretienTotal = 0;
  for (let annee = 1; annee <= dureeDetention; annee++) {
    if (annee <= 3) {
      entretienTotal += entretienAnnuel;
    } else {
      entretienTotal += entretienAnnuel * Math.pow(1.1, annee - 3);
    }
  }

  // Controle technique : tous les 2 ans, ~80€
  const controleTotal = Math.floor(dureeDetention / 2) * 80;

  // Decote : 15% par an (valeur residuelle = 85%^n)
  const decote = prixAchat * (1 - Math.pow(0.85, dureeDetention));
  const valeurRevente = prixAchat - decote;

  // Cout total
  const coutTotal =
    prixAchat +
    carburantTotal +
    assuranceTotal +
    entretienTotal +
    controleTotal -
    valeurRevente;

  const coutMensuel = coutTotal / (dureeDetention * 12);
  const coutKilometre = coutTotal / (kmAnnuels * dureeDetention);

  // Repartition (% du cout total hors revente)
  const base =
    decote + carburantTotal + assuranceTotal + entretienTotal + controleTotal;
  const repartition = {
    achat: base > 0 ? (decote / base) * 100 : 0,
    carburant: base > 0 ? (carburantTotal / base) * 100 : 0,
    assurance: base > 0 ? (assuranceTotal / base) * 100 : 0,
    entretien: base > 0 ? (entretienTotal / base) * 100 : 0,
    ct: base > 0 ? (controleTotal / base) * 100 : 0,
  };

  return {
    carburantAnnuel,
    carburantTotal,
    assuranceTotal,
    entretienTotal,
    controleTotal,
    decote,
    valeurRevente,
    coutTotal,
    coutMensuel,
    coutKilometre,
    repartition,
  };
}
