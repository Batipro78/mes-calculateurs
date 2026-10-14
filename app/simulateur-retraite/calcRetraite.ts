// Age legal et duree d'assurance pour le taux plein, par annee de naissance,
// pour un depart a partir du 1er septembre 2026 (la reforme de 2023 est suspendue
// jusqu'en 2028 par la loi de financement de la Securite sociale pour 2026).
// Sources : service-public.gouv.fr (fiche F19643 et actualite A18825) et agirc-arrco.fr.
// Le calculateur raisonne par ANNEE de naissance. Pour les deux annees coupees en deux
// (1961 et 1965), il retient les personnes nees en fin d'annee :
//   1961 : nes de septembre a decembre -> 62 ans et 3 mois, 169 trimestres
//          (janvier a aout : 62 ans, 168 trimestres)
//   1965 : nes d'avril a decembre -> 63 ans, 171 trimestres
//          (janvier a mars : 62 ans et 9 mois, 170 trimestres)
export function getAgeLegal(annee: number): number {
  if (annee <= 1960) return 62;
  if (annee === 1961) return 62.25;
  if (annee === 1962) return 62.5;
  if (annee === 1963 || annee === 1964) return 62.75;
  if (annee === 1965) return 63;
  if (annee === 1966) return 63.25;
  if (annee === 1967) return 63.5;
  if (annee === 1968) return 63.75;
  return 64;
}

export function getTrimestresRequis(annee: number): number {
  if (annee <= 1957) return 166;
  if (annee <= 1960) return 167;
  if (annee <= 1962) return 169;
  if (annee <= 1964) return 170;
  if (annee === 1965) return 171;
  return 172;
}

// Plafond de la Securite sociale 2026 : 48 060 EUR par an (4 005 EUR par mois),
// source agirc-arrco.fr, page "Parametres et chiffres du regime".
export const PASS_ANNUEL = 48060;

// Valeur de service du point Agirc-Arrco depuis le 1er novembre 2024 : 1,4386 EUR.
// Elle n'a pas ete revalorisee au 1er novembre 2025 (agirc-arrco.fr). La decision
// pour le 1er novembre 2026 n'etait pas publiee au 14 octobre 2026.
export const VALEUR_POINT = 1.4386;

// Prix d'achat du point Agirc-Arrco en 2026 : 20,1877 EUR (agirc-arrco.fr).
export const PRIX_ACHAT_POINT = 20.1877;

// Taux de cotisation Agirc-Arrco 2026, "inclus pourcentage d'appel 127 %" (agirc-arrco.fr) :
// 7,87 % sur la part du salaire jusqu'au plafond (tranche 1), 21,59 % entre 1 et 8 plafonds
// (tranche 2). Seule la part SANS l'appel de 127 % donne des points : on divise par 1,27.
// Hors CEG et CET, qui ne donnent pas de points.
const TAUX_T1 = 0.0787;
const TAUX_T2 = 0.2159;
const POURCENTAGE_APPEL = 1.27;

// Minimum contributif 2026 (service-public.gouv.fr, actualite A15703) : 903,93 EUR brut
// par mois quand on part avant 67 ans avec tous les trimestres du taux plein, tous cotises.
export const MINIMUM_CONTRIBUTIF = 903.93;

// Coefficient d'anticipation de la retraite complementaire (agirc-arrco.fr, tableaux 2 et 3
// du document "coefficients de minoration") : 1 % par trimestre manquant jusqu'a 12
// trimestres (0,88), puis 1,25 % par trimestre de 13 a 20 (0,78 a 20).
export function coefficientAnticipation(trimestres: number): number {
  const n = Math.min(Math.max(0, trimestres), 20);
  if (n <= 12) return 1 - 0.01 * n;
  return 0.88 - 0.0125 * (n - 12);
}

export function calcRetraite(anneeNaissance: number, samAnnuel: number, trimestresAcquis: number, ageDepartSouhaite: number) {
  const ageLegal = getAgeLegal(anneeNaissance);
  const trimestresRequis = getTrimestresRequis(anneeNaissance);
  const ageTauxPlein = 67;

  const ageDepart = Math.max(ageDepartSouhaite, ageLegal);

  // Decote : le plus petit de (trimestres manquants pour la duree, trimestres avant 67 ans), 20 au maximum.
  const trimestresManquants = Math.max(0, trimestresRequis - trimestresAcquis);
  const trimestresAvantTauxPleinAge = Math.max(0, Math.ceil((ageTauxPlein - ageDepart) * 4 - 1e-9));
  const trimestresDecote = Math.min(trimestresManquants, trimestresAvantTauxPleinAge, 20);

  // Surcote : trimestres au-dela de la duree du taux plein ET accomplis apres l'age legal
  // (on retient le plus petit des deux nombres). Trimestres entiers uniquement.
  const trimestresApresAgeLegal = Math.max(0, Math.floor((ageDepart - ageLegal) * 4 + 1e-9));
  const trimestresAuDessus = Math.max(0, trimestresAcquis - trimestresRequis);
  const trimestresSupp = Math.min(trimestresAuDessus, trimestresApresAgeLegal);

  // Decote : le taux de 50 % est reduit de 0,625 % par trimestre manquant (49,375 % pour 1 trimestre).
  const tauxAvantSurcote = 0.5 - trimestresDecote * 0.00625;
  // Surcote : la PENSION est majoree de 1,25 % par trimestre (et non 1,25 point de taux).
  const coeffSurcote = 1 + trimestresSupp * 0.0125;
  const taux = tauxAvantSurcote * coeffSurcote;

  const coeffProrata = Math.min(trimestresAcquis / trimestresRequis, 1);
  const samPlafonne = Math.min(samAnnuel, PASS_ANNUEL);
  const pensionAnnuelleBase = samPlafonne * taux * coeffProrata;
  const pensionMensuelleBase = pensionAnnuelleBase / 12;

  // Hypothese du calculateur : tous les trimestres sont cotises.
  const pensionMinimum = coeffProrata >= 1 && tauxAvantSurcote >= 0.5 ? MINIMUM_CONTRIBUTIF : 0;

  let pensionBase = Math.max(pensionMensuelleBase, pensionMinimum);
  const plafondBase = ((PASS_ANNUEL * 0.5) / 12) * coeffSurcote;
  pensionBase = Math.min(pensionBase, plafondBase);

  // Complementaire Agirc-Arrco : estimation simplifiee.
  // Hypothese du calculateur : le salaire annuel moyen a ete le salaire de toute la carriere,
  // et chaque point est achete au prix de 2026.
  const salaireT1 = Math.min(samAnnuel, PASS_ANNUEL);
  const salaireT2 = Math.max(0, Math.min(samAnnuel, 8 * PASS_ANNUEL) - PASS_ANNUEL);
  const pointsAnnuels = (salaireT1 * TAUX_T1 + salaireT2 * TAUX_T2) / POURCENTAGE_APPEL / PRIX_ACHAT_POINT;
  const anneesCarriere = trimestresAcquis / 4;
  const totalPoints = pointsAnnuels * anneesCarriere;
  const complementaireAnnuelle = totalPoints * VALEUR_POINT;
  const complementaireMensuelle = complementaireAnnuelle / 12;

  const coefMinorationCompl = coefficientAnticipation(trimestresDecote);
  const complementaireEffective = complementaireMensuelle * coefMinorationCompl;

  const pensionTotaleBrute = pensionBase + complementaireEffective;
  // CSG au taux normal (8,3 %) + CRDS (0,5 %) + Casa (0,3 %) = 9,1 % (lassuranceretraite.fr).
  const tauxPrelevements = 0.091;
  // La retraite complementaire supporte en plus 1 % de cotisation d'assurance maladie (agirc-arrco.fr, "Prelevements sociaux").
  const tauxPrelevementsCompl = tauxPrelevements + 0.01;
  const pensionTotaleNette = pensionBase * (1 - tauxPrelevements) + complementaireEffective * (1 - tauxPrelevementsCompl);

  const salaireMensuelNet = (samAnnuel / 12) * 0.78;
  const tauxRemplacement = salaireMensuelNet > 0 ? (pensionTotaleNette / salaireMensuelNet) * 100 : 0;

  return {
    ageLegal,
    ageDepart,
    trimestresRequis,
    trimestresAcquis,
    trimestresManquants,
    trimestresDecote,
    trimestresSupp,
    taux,
    tauxAvantSurcote,
    coeffSurcote,
    coeffProrata,
    samPlafonne,
    pensionBase,
    complementaireEffective,
    pensionTotaleBrute,
    pensionTotaleNette,
    tauxRemplacement,
    tauxPrelevements,
    tauxPrelevementsCompl,
    plafondBase,
    pensionAnnuelleBase,
    coefMinorationCompl,
  };
}

// Ecrit un age en annees et mois : 64 -> "64 ans", 62.75 -> "62 ans et 9 mois".
export function ageEnTexte(age: number): string {
  const ans = Math.floor(age + 1e-9);
  const mois = Math.round((age - ans) * 12);
  return mois === 0 ? `${ans} ans` : `${ans} ans et ${mois} mois`;
}
