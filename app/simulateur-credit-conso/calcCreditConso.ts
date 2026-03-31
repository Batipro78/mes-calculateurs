// Simulateur Credit a la Consommation 2026

// Taux moyens TAEG par duree (pret personnel, Q1 2026)
export const TAUX_MOYENS: Record<number, number> = {
  12: 3.9,
  24: 4.1,
  36: 4.3,
  48: 4.5,
  60: 4.7,
  72: 5.2,
  84: 6.0,
};

export const DUREES = [12, 24, 36, 48, 60, 72, 84];

export type TypeProjet =
  | "auto"
  | "travaux"
  | "voyage"
  | "electromenager"
  | "mariage"
  | "tresorerie"
  | "energie"
  | "autre";

export const PROJET_LABELS: Record<TypeProjet, string> = {
  auto: "Automobile / Moto",
  travaux: "Travaux / Renovation",
  voyage: "Voyage",
  electromenager: "Electromenager / High-tech",
  mariage: "Mariage / Evenement",
  tresorerie: "Tresorerie / Imprevus",
  energie: "Energie renouvelable",
  autre: "Autre projet",
};

export const PROJET_EMOJIS: Record<TypeProjet, string> = {
  auto: "🚗",
  travaux: "🏠",
  voyage: "✈️",
  electromenager: "📱",
  mariage: "💍",
  tresorerie: "💶",
  energie: "☀️",
  autre: "📋",
};

// Taux d'usure Q1 2026
export function getTauxUsure(montant: number): number {
  if (montant <= 3000) return 23.56;
  if (montant <= 6000) return 15.87;
  return 8.67;
}

export interface ResultatCredit {
  capital: number;
  dureeMois: number;
  tauxAnnuel: number;
  tauxMensuel: number;
  mensualite: number;
  coutInterets: number;
  coutAssurance: number;
  coutTotal: number;
  montantTotalRembourse: number;
  tauxEndettement: number;
  tauxUsure: number;
  depasseUsure: boolean;
  depasseEndettement: boolean;
  tableauAmortissement: LigneAmortissement[];
}

export interface LigneAmortissement {
  mois: number;
  mensualite: number;
  capital: number;
  interets: number;
  assurance: number;
  resteDu: number;
}

export function calcCreditConso(
  capital: number,
  dureeMois: number,
  tauxAnnuel: number,
  revenuMensuel: number,
  tauxAssurance: number = 0.36
): ResultatCredit {
  const tauxMensuel = tauxAnnuel / 100 / 12;
  const tauxAssuranceMensuel = (tauxAssurance / 100) * capital / 12;

  // Mensualite (formule annuite constante)
  let mensualiteHorsAssurance: number;
  if (tauxMensuel === 0) {
    mensualiteHorsAssurance = capital / dureeMois;
  } else {
    mensualiteHorsAssurance =
      (capital * tauxMensuel * Math.pow(1 + tauxMensuel, dureeMois)) /
      (Math.pow(1 + tauxMensuel, dureeMois) - 1);
  }

  const mensualite = mensualiteHorsAssurance + tauxAssuranceMensuel;
  const montantTotalRembourse = mensualite * dureeMois;
  const coutAssurance = tauxAssuranceMensuel * dureeMois;
  const coutInterets = mensualiteHorsAssurance * dureeMois - capital;
  const coutTotal = coutInterets + coutAssurance;

  // Taux endettement
  const tauxEndettement = revenuMensuel > 0 ? (mensualite / revenuMensuel) * 100 : 0;

  // Taux d'usure
  const tauxUsure = getTauxUsure(capital);
  const depasseUsure = tauxAnnuel > tauxUsure;
  const depasseEndettement = tauxEndettement > 35;

  // Tableau d'amortissement
  const tableauAmortissement: LigneAmortissement[] = [];
  let resteDu = capital;

  for (let m = 1; m <= dureeMois; m++) {
    const interetsMois = resteDu * tauxMensuel;
    const capitalMois = mensualiteHorsAssurance - interetsMois;
    resteDu = Math.max(0, resteDu - capitalMois);

    tableauAmortissement.push({
      mois: m,
      mensualite: Math.round(mensualite * 100) / 100,
      capital: Math.round(capitalMois * 100) / 100,
      interets: Math.round(interetsMois * 100) / 100,
      assurance: Math.round(tauxAssuranceMensuel * 100) / 100,
      resteDu: Math.round(resteDu * 100) / 100,
    });
  }

  return {
    capital,
    dureeMois,
    tauxAnnuel,
    tauxMensuel,
    mensualite: Math.round(mensualite * 100) / 100,
    coutInterets: Math.round(coutInterets * 100) / 100,
    coutAssurance: Math.round(coutAssurance * 100) / 100,
    coutTotal: Math.round(coutTotal * 100) / 100,
    montantTotalRembourse: Math.round(montantTotalRembourse * 100) / 100,
    tauxEndettement: Math.round(tauxEndettement * 10) / 10,
    tauxUsure,
    depasseUsure,
    depasseEndettement,
    tableauAmortissement,
  };
}
