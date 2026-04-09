// Simulateur Credit Auto 2026

// Taux moyens par duree (taux concessionnaire + banque, moyenne 2026)
export const TAUX_MOYENS: Record<number, number> = {
  12: 3.5,
  24: 3.9,
  36: 4.2,
  48: 4.5,
  60: 4.9,
  72: 5.5,
  84: 6.0,
};

export const DUREES = [12, 24, 36, 48, 60, 72, 84];

export interface VehiculePreset {
  nom: string;
  marque: string;
  emoji: string;
  prix: number;
  dureeConseillee: number;
}

export const VEHICULES_PRESETS: VehiculePreset[] = [
  { nom: "Sandero", marque: "Dacia", emoji: "🚗", prix: 13000, dureeConseillee: 36 },
  { nom: "C3", marque: "Citroen", emoji: "🚙", prix: 17000, dureeConseillee: 48 },
  { nom: "Clio", marque: "Renault", emoji: "🚗", prix: 18000, dureeConseillee: 48 },
  { nom: "208", marque: "Peugeot", emoji: "🚙", prix: 22000, dureeConseillee: 48 },
  { nom: "Captur", marque: "Renault", emoji: "🚕", prix: 26000, dureeConseillee: 60 },
  { nom: "3008", marque: "Peugeot", emoji: "🚕", prix: 38000, dureeConseillee: 60 },
  { nom: "Golf", marque: "Volkswagen", emoji: "🚙", prix: 32000, dureeConseillee: 60 },
  { nom: "Model 3", marque: "Tesla", emoji: "⚡", prix: 42000, dureeConseillee: 72 },
];

export interface LigneAmortissement {
  mois: number;
  mensualite: number;
  capital: number;
  interets: number;
  restant: number;
}

export interface ResultatCreditAuto {
  montantEmprunte: number;
  mensualite: number;
  coutTotal: number;
  coutCredit: number;
  tauxEndettement: number;
  tableauAmortissement: LigneAmortissement[];
}

export function calcCreditAuto(
  montant: number,
  duree: number,
  taux: number,
  apport: number,
  allRows = false
): ResultatCreditAuto {
  const montantEmprunte = Math.max(0, montant - apport);

  let mensualite: number;
  const t = taux / 100 / 12;

  if (t === 0 || montantEmprunte === 0) {
    mensualite = montantEmprunte > 0 ? montantEmprunte / duree : 0;
  } else {
    mensualite =
      (montantEmprunte * t * Math.pow(1 + t, duree)) /
      (Math.pow(1 + t, duree) - 1);
  }

  mensualite = Math.round(mensualite * 100) / 100;

  const coutTotal = Math.round(mensualite * duree * 100) / 100;
  const coutCredit = Math.round((coutTotal - montantEmprunte) * 100) / 100;
  const tauxEndettement = Math.round((mensualite / 2500) * 100 * 10) / 10;

  // Tableau d'amortissement (6 premieres lignes)
  const tableauAmortissement: LigneAmortissement[] = [];
  let restant = montantEmprunte;

  const rowLimit = allRows ? duree : Math.min(6, duree);
  for (let m = 1; m <= rowLimit; m++) {
    const interetsMois = Math.round(restant * t * 100) / 100;
    const capitalMois = Math.round((mensualite - interetsMois) * 100) / 100;
    restant = Math.max(0, Math.round((restant - capitalMois) * 100) / 100);

    tableauAmortissement.push({
      mois: m,
      mensualite,
      capital: capitalMois,
      interets: interetsMois,
      restant,
    });
  }

  return {
    montantEmprunte,
    mensualite,
    coutTotal,
    coutCredit,
    tauxEndettement,
    tableauAmortissement,
  };
}
