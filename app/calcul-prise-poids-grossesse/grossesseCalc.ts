// Calcul prise de poids grossesse
// Source : Institute of Medicine (IOM) 2009 - recommandations officielles

export type CatIMC = "maigre" | "normal" | "surpoids" | "obesite";
export type TypeGrossesse = "simple" | "gemellaire";

export interface ParamsGrossesse {
  poidsAvant: number; // kg
  taille: number; // cm
  semainesAmenorrhee: number; // 0-42
  poidsActuel: number; // kg
  typeGrossesse: TypeGrossesse;
}

export interface ResultatGrossesse {
  imcAvant: number;
  categorieIMC: CatIMC;
  priseRecommandeeMin: number;
  priseRecommandeeMax: number;
  priseActuelle: number;
  priseAttendueMin: number;
  priseAttendueMax: number;
  verdict: "normale" | "faible" | "excessive";
  messageVerdict: string;
  courbe: Array<{ semaine: number; min: number; max: number }>;
}

function categorieIMC(imc: number): CatIMC {
  if (imc < 18.5) return "maigre";
  if (imc < 25) return "normal";
  if (imc < 30) return "surpoids";
  return "obesite";
}

// Recommandations IOM 2009 (grossesse simple)
const IOM_SIMPLE: Record<CatIMC, { min: number; max: number }> = {
  maigre:   { min: 12.5, max: 18 },
  normal:   { min: 11.5, max: 16 },
  surpoids: { min: 7,    max: 11.5 },
  obesite:  { min: 5,    max: 9 },
};

// Pour grossesse gemellaire
const IOM_GEMELLAIRE: Record<CatIMC, { min: number; max: number }> = {
  maigre:   { min: 15,   max: 20 }, // estimation (pas de reco formelle IOM)
  normal:   { min: 16.8, max: 24.5 },
  surpoids: { min: 14,   max: 22.7 },
  obesite:  { min: 11.3, max: 19 },
};

export function calculerGrossesse(p: ParamsGrossesse): ResultatGrossesse {
  const imcAvant = p.poidsAvant / ((p.taille / 100) ** 2);
  const cat = categorieIMC(imcAvant);
  const reco = p.typeGrossesse === "gemellaire" ? IOM_GEMELLAIRE[cat] : IOM_SIMPLE[cat];

  const priseActuelle = p.poidsActuel - p.poidsAvant;

  // Repartition classique : T1 = 1-2 kg, T2 = 40% restant, T3 = 40% restant, reste = T3 final
  // Simplification : prise proportionnelle a la semaine apres SA 13
  // Avant SA 13 : 1-2 kg
  // SA 13-40 : le reste proportionnel
  function priseAttendueASemaine(sem: number, prise: number): number {
    if (sem <= 0) return 0;
    if (sem < 13) {
      return Math.min((sem / 13) * 1.5, 1.5);
    }
    const base = 1.5; // deja pris au T1
    const restant = prise - base;
    if (sem >= 40) return prise;
    const progression = (sem - 13) / (40 - 13);
    return base + restant * progression;
  }

  const priseAttendueMin = priseAttendueASemaine(p.semainesAmenorrhee, reco.min);
  const priseAttendueMax = priseAttendueASemaine(p.semainesAmenorrhee, reco.max);

  let verdict: ResultatGrossesse["verdict"] = "normale";
  let messageVerdict = "";

  if (priseActuelle < priseAttendueMin - 2) {
    verdict = "faible";
    messageVerdict = `Votre prise de poids est inferieure aux recommandations a ${p.semainesAmenorrhee} SA. Cela peut etre normal selon les cas, mais parlez-en a votre sage-femme ou gynecologue.`;
  } else if (priseActuelle > priseAttendueMax + 2) {
    verdict = "excessive";
    messageVerdict = `Votre prise de poids est superieure aux recommandations a ${p.semainesAmenorrhee} SA. Consultez votre professionnel de sante pour verifier qu'il ne s'agit pas d'un diabete gestationnel ou retention d'eau.`;
  } else {
    verdict = "normale";
    messageVerdict = `Votre prise de poids est dans la fourchette recommandee a ${p.semainesAmenorrhee} SA. Continuez ainsi.`;
  }

  // Courbe par semaine (min et max recommandes)
  const courbe: Array<{ semaine: number; min: number; max: number }> = [];
  for (let s = 0; s <= 40; s += 4) {
    courbe.push({
      semaine: s,
      min: priseAttendueASemaine(s, reco.min),
      max: priseAttendueASemaine(s, reco.max),
    });
  }

  return {
    imcAvant,
    categorieIMC: cat,
    priseRecommandeeMin: reco.min,
    priseRecommandeeMax: reco.max,
    priseActuelle,
    priseAttendueMin,
    priseAttendueMax,
    verdict,
    messageVerdict,
    courbe,
  };
}

export const CAT_LABELS: Record<CatIMC, string> = {
  maigre: "Maigreur (IMC < 18,5)",
  normal: "Corpulence normale (IMC 18,5-25)",
  surpoids: "Surpoids (IMC 25-30)",
  obesite: "Obesite (IMC >= 30)",
};
