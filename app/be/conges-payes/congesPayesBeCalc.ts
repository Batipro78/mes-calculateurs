export type StatutTravailleur = "employe" | "ouvrier";

export const JOURS_CONGES_TEMPS_PLEIN = 20;
export const TAUX_DOUBLE_PECULE = 0.92;
export const TAUX_PECULE_OUVRIER = 0.1538;
export const TAUX_CAISSE_VACANCES = 1.08;
export const TAUX_PRECOMPTE = 0.83; // 17% de precompte

export interface ResultatConges {
  brutMensuel: number;
  statut: StatutTravailleur;
  moisTravailles: number;
  joursConges: number;
  simplePecule: number; // salaire normal pendant conges
  doublePecule: number; // pécule employé
  peculeOuvrier: number; // pécule ouvrier brut
  peculeNet: number; // après précompte
  totalPecule: number; // total brut
}

export function calculerConges(
  brutMensuel: number,
  statut: StatutTravailleur,
  moisTravailles: number
): ResultatConges {
  const joursConges = JOURS_CONGES_TEMPS_PLEIN;

  // Simple pécule : salaire normal pendant congés
  const simplePecule = brutMensuel;

  let totalPecule: number;

  if (statut === "employe") {
    // Double pécule = 92% du salaire mensuel brut × (mois travaillés / 12)
    const doublePecule = brutMensuel * TAUX_DOUBLE_PECULE * (moisTravailles / 12);
    totalPecule = doublePecule;
  } else {
    // Ouvrier : 15,38% de rémunération annuelle brute × 108% (caisse vacances)
    const brutAnnuel = brutMensuel * 12;
    const peculeOuvrier = brutAnnuel * TAUX_PECULE_OUVRIER * TAUX_CAISSE_VACANCES * (moisTravailles / 12);
    totalPecule = peculeOuvrier;
  }

  // Précompte sur le pécule : environ 17%
  const peculeNet = totalPecule * TAUX_PRECOMPTE;

  return {
    brutMensuel,
    statut,
    moisTravailles,
    joursConges,
    simplePecule,
    doublePecule: statut === "employe" ? brutMensuel * TAUX_DOUBLE_PECULE * (moisTravailles / 12) : 0,
    peculeOuvrier: statut === "ouvrier" ? (brutMensuel * 12 * TAUX_PECULE_OUVRIER * TAUX_CAISSE_VACANCES * (moisTravailles / 12)) : 0,
    peculeNet,
    totalPecule,
  };
}
