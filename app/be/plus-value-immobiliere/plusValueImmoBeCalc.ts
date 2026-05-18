export type TypeBien = "habitation-principale" | "bati-investissement" | "non-bati-terrain";

// Taux d'imposition pour biens bâtis
export const TAUX_BATI_MOINS_5_ANS = 0.165; // 16.5% si revendu < 5 ans
export const TAUX_BATI_PLUS_5_ANS = 0; // 0% si revendu >= 5 ans

// Taux d'imposition pour terrains (non-bâtis)
export const TAUX_TERRAIN_MOINS_5_ANS = 0.33; // 33% si revendu < 5 ans
export const TAUX_TERRAIN_5_8_ANS = 0.165; // 16.5% si revendu 5-8 ans
export const TAUX_TERRAIN_PLUS_8_ANS = 0; // 0% si revendu >= 8 ans

// Frais forfaitaires d'acquisition
export const FRAIS_ACQUISITION_DEFAULT = 0.125; // 12.5% du prix d'achat

export interface ResultatPlusValue {
  prixAchat: number;
  prixVente: number;
  fraisAcquisition: number;
  travaux: number;
  dureeAnnees: number;
  typeBien: TypeBien;
  plusValueBrute: number;
  taux: number;
  impotPlusValue: number;
  plusValueNette: number;
  estExonere: boolean;
  raison: string;
}

export function calculerPlusValueBE(
  prixAchat: number,
  prixVente: number,
  fraisAcquisition: number,
  travaux: number,
  dureeAnnees: number,
  typeBien: TypeBien
): ResultatPlusValue {
  // Calcul de la plus-value brute
  const plusValueBrute = prixVente - prixAchat - fraisAcquisition - travaux;

  let taux = 0;
  let estExonere = false;
  let raison = "";

  // Déterminer le taux d'imposition
  if (typeBien === "habitation-principale") {
    // Exonération totale pour habitation principale
    estExonere = true;
    taux = 0;
    raison = "Habitation principale : exonération totale";
  } else if (typeBien === "bati-investissement") {
    // Bien bâti (maison/appartement) d'investissement
    if (dureeAnnees < 5) {
      taux = TAUX_BATI_MOINS_5_ANS;
      raison = "Bien bâti revendu < 5 ans : 16.5%";
    } else {
      estExonere = true;
      taux = 0;
      raison = "Bien bâti revendu >= 5 ans : exonération";
    }
  } else if (typeBien === "non-bati-terrain") {
    // Terrain (non-bâti)
    if (dureeAnnees < 5) {
      taux = TAUX_TERRAIN_MOINS_5_ANS;
      raison = "Terrain revendu < 5 ans : 33%";
    } else if (dureeAnnees < 8) {
      taux = TAUX_TERRAIN_5_8_ANS;
      raison = "Terrain revendu 5-8 ans : 16.5%";
    } else {
      estExonere = true;
      taux = 0;
      raison = "Terrain revendu >= 8 ans : exonération";
    }
  }

  // Calcul de l'impôt
  const impotPlusValue =
    plusValueBrute > 0 ? Math.max(0, plusValueBrute * taux) : 0;

  // Plus-value nette
  const plusValueNette = Math.max(0, plusValueBrute - impotPlusValue);

  return {
    prixAchat,
    prixVente,
    fraisAcquisition,
    travaux,
    dureeAnnees,
    typeBien,
    plusValueBrute,
    taux,
    impotPlusValue,
    plusValueNette,
    estExonere,
    raison,
  };
}
