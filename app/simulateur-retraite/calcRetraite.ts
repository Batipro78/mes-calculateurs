// Reforme retraite 2023 : age legal par annee de naissance
const AGE_LEGAL: Record<number, number> = {
  1955: 62, 1956: 62, 1957: 62, 1958: 62, 1959: 62, 1960: 62,
  1961: 62.25,
  1962: 62.5,
  1963: 62.75,
  1964: 63,
  1965: 63.25,
  1966: 63.5,
  1967: 63.75,
  1968: 64, 1969: 64, 1970: 64, 1971: 64, 1972: 64, 1973: 64, 1974: 64, 1975: 64,
  1976: 64, 1977: 64, 1978: 64, 1979: 64, 1980: 64, 1981: 64, 1982: 64, 1983: 64,
  1984: 64, 1985: 64, 1986: 64, 1987: 64, 1988: 64, 1989: 64, 1990: 64, 1991: 64,
  1992: 64, 1993: 64, 1994: 64, 1995: 64, 1996: 64, 1997: 64, 1998: 64, 1999: 64,
  2000: 64, 2001: 64, 2002: 64, 2003: 64, 2004: 64, 2005: 64,
};

function getAgeLegal(annee: number): number {
  if (annee <= 1960) return 62;
  if (annee >= 1968) return 64;
  return AGE_LEGAL[annee] || 64;
}

function getTrimestresRequis(annee: number): number {
  if (annee <= 1957) return 166;
  if (annee <= 1960) return 167;
  if (annee <= 1962) return 169;
  if (annee === 1963) return 170;
  if (annee === 1964) return 171;
  return 172;
}

// Plafond Securite Sociale 2026 (PASS annuel estime)
export const PASS_ANNUEL = 47100;

export function calcRetraite(anneeNaissance: number, samAnnuel: number, trimestresAcquis: number, ageDepartSouhaite: number) {
  const ageLegal = getAgeLegal(anneeNaissance);
  const trimestresRequis = getTrimestresRequis(anneeNaissance);
  const ageTauxPlein = 67;

  const ageDepart = Math.max(ageDepartSouhaite, ageLegal);

  const trimestresManquants = Math.max(0, trimestresRequis - trimestresAcquis);
  const trimestresAvantTauxPleinAge = Math.max(0, (ageTauxPlein - ageDepart) * 4);
  const trimestresDecote = Math.min(trimestresManquants, trimestresAvantTauxPleinAge, 20);

  const trimestresSupp = trimestresAcquis > trimestresRequis && ageDepart >= ageLegal
    ? Math.max(0, trimestresAcquis - trimestresRequis)
    : 0;

  let taux = 0.5;
  if (trimestresDecote > 0) {
    taux = 0.5 - (trimestresDecote * 0.00625);
  }
  const bonusSurcote = trimestresSupp * 0.0125;
  taux = taux + bonusSurcote;

  const coeffProrata = Math.min(trimestresAcquis / trimestresRequis, 1);
  const samPlafonne = Math.min(samAnnuel, PASS_ANNUEL);
  const pensionAnnuelleBase = samPlafonne * taux * coeffProrata;
  const pensionMensuelleBase = pensionAnnuelleBase / 12;

  const minimumContributif = 747.05;
  const pensionMinimum = coeffProrata >= 1 && taux >= 0.5 ? minimumContributif : 0;

  let pensionBase = Math.max(pensionMensuelleBase, pensionMinimum);
  const plafondBase = (PASS_ANNUEL * 0.5) / 12;
  pensionBase = Math.min(pensionBase, plafondBase);

  const valeurPoint = 1.4159;
  const anneesCarriere = trimestresAcquis / 4;
  const pointsAnnuels = (samAnnuel * 0.0787) / valeurPoint;
  const totalPoints = pointsAnnuels * Math.min(anneesCarriere, 43);
  const complementaireAnnuelle = totalPoints * valeurPoint;
  const complementaireMensuelle = complementaireAnnuelle / 12;

  const coefMinorationCompl = trimestresDecote > 0 ? Math.max(0.78, 1 - trimestresDecote * 0.01) : 1;
  const complementaireEffective = complementaireMensuelle * coefMinorationCompl;

  const pensionTotaleBrute = pensionBase + complementaireEffective;
  const tauxPrelevements = 0.091;
  const pensionTotaleNette = pensionTotaleBrute * (1 - tauxPrelevements);

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
    coeffProrata,
    samPlafonne,
    pensionBase,
    complementaireEffective,
    pensionTotaleBrute,
    pensionTotaleNette,
    tauxRemplacement,
    tauxPrelevements,
    plafondBase,
    pensionAnnuelleBase,
    coefMinorationCompl,
  };
}
