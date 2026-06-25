// Cout d'utilisation d'une climatisation.
// On part de la puissance FROID (frigorifique) et du coefficient d'efficacite (EER) :
// puissance electrique reellement consommee = puissance froid / EER.

export interface CoutClimInput {
  puissanceFroidW: number; // puissance frigorifique (W)
  eer: number; // coefficient d'efficacite energetique (froid / elec)
  heuresJour: number;
  prixKwh: number;
}

export interface CoutClimResult {
  consoElecW: number;
  consoJourKwh: number;
  coutJour: number;
  coutMois: number; // 30 jours
  coutEte: number; // 90 jours
  coutAn: number; // estimation 120 jours d'utilisation effective
}

export function calculerCoutClim(input: CoutClimInput): CoutClimResult {
  const puissance = Math.max(0, input.puissanceFroidW || 0);
  const eer = input.eer > 0 ? input.eer : 3;
  const heures = Math.max(0, input.heuresJour || 0);
  const prix = Math.max(0, input.prixKwh || 0);

  const consoElecW = puissance / eer;
  const consoJourKwh = (consoElecW / 1000) * heures;
  const coutJour = consoJourKwh * prix;

  return {
    consoElecW,
    consoJourKwh,
    coutJour,
    coutMois: coutJour * 30,
    coutEte: coutJour * 90,
    coutAn: coutJour * 120,
  };
}
