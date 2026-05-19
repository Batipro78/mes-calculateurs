// FFMI Calculator (Fat-Free Mass Index) selon Kouri

export type Sexe = "homme" | "femme";

export interface ResultatFFMI {
  masseMaigre: number;
  ffmiBrut: number;
  ffmiNormalise: number;
  niveau: string;
  couleur: string;
  description: string;
}

// Estimation % MG depuis IMC + age (formule Deurenberg)
export function estimerMGDebutant(
  imc: number,
  age: number,
  sexe: Sexe
): number {
  const factorSexe = sexe === "homme" ? 1 : 0;
  const mg =
    1.2 * imc + 0.23 * age - 10.8 * factorSexe - 5.4;
  return Math.max(5, Math.min(50, mg)); // Clamp 5-50%
}

// Calculer FFMI selon formule Kouri
export function calculerFFMI(
  poidsKg: number,
  tailleCm: number,
  pourcentMG: number
): ResultatFFMI {
  if (poidsKg <= 0 || tailleCm <= 0 || pourcentMG < 0 || pourcentMG > 100) {
    return {
      masseMaigre: 0,
      ffmiBrut: 0,
      ffmiNormalise: 0,
      niveau: "Invalide",
      couleur: "text-slate-500",
      description: "Verifiez vos entrees",
    };
  }

  // Masse maigre = Poids × (1 - %MG/100)
  const masseMaigre = poidsKg * (1 - pourcentMG / 100);

  // Taille en metres
  const tailleM = tailleCm / 100;

  // FFMI brut = Masse maigre / Taille²
  const ffmiBrut = masseMaigre / (tailleM * tailleM);

  // FFMI normalise (Kouri) = FFMI brut + 6.1 × (1.8 - Taille(m))
  const ffmiNormalise = ffmiBrut + 6.1 * (1.8 - tailleM);

  // Interpretation
  const interpretation = interpreterFFMI(ffmiNormalise, "homme"); // Default homme pour FFMI normalisé

  return {
    masseMaigre: Math.round(masseMaigre * 10) / 10,
    ffmiBrut: Math.round(ffmiBrut * 10) / 10,
    ffmiNormalise: Math.round(ffmiNormalise * 10) / 10,
    ...interpretation,
  };
}

interface InterpretationFFMI {
  niveau: string;
  couleur: string;
  description: string;
}

// Interpreter FFMI selon sexe (echelle decalee pour femmes)
export function interpreterFFMI(
  ffmi: number,
  sexe: Sexe
): InterpretationFFMI {
  if (sexe === "femme") {
    // Echelle femme decalee de ~3 points
    if (ffmi < 15) {
      return {
        niveau: "Maigre",
        couleur: "text-slate-500",
        description:
          "Faible masse musculaire. Entrainement en force recommande.",
      };
    } else if (ffmi < 16) {
      return {
        niveau: "Moyen",
        couleur: "text-blue-600",
        description: "Masse musculaire moderee pour une femme.",
      };
    } else if (ffmi < 17) {
      return {
        niveau: "Intermediaire",
        couleur: "text-cyan-600",
        description: "Bon developpement musculaire.",
      };
    } else if (ffmi < 18) {
      return {
        niveau: "Avance",
        couleur: "text-emerald-600",
        description: "Musculature impressionnante pour une femme naturelle.",
      };
    } else if (ffmi < 19) {
      return {
        niveau: "Tres avance",
        couleur: "text-amber-600",
        description: "Proche limite naturelle pour femmes.",
      };
    } else if (ffmi < 20) {
      return {
        niveau: "Limite naturelle",
        couleur: "text-orange-600",
        description: "Probablement limite pour femmes naturelles.",
      };
    } else {
      return {
        niveau: "Tres probablement assiste",
        couleur: "text-red-600",
        description: "FFMI indique probablement utilisation de PED.",
      };
    }
  } else {
    // Echelle homme
    if (ffmi < 18) {
      return {
        niveau: "Maigre",
        couleur: "text-slate-500",
        description: "Peu de masse musculaire. Entrainement en force utile.",
      };
    } else if (ffmi < 19) {
      return {
        niveau: "Moyen",
        couleur: "text-blue-600",
        description: "Masse musculaire moderee.",
      };
    } else if (ffmi < 21) {
      return {
        niveau: "Intermediaire",
        couleur: "text-cyan-600",
        description: "Bon niveau de developpement musculaire.",
      };
    } else if (ffmi < 23) {
      return {
        niveau: "Avance",
        couleur: "text-emerald-600",
        description: "Excellente musculature naturelle.",
      };
    } else if (ffmi < 25) {
      return {
        niveau: "Tres avance",
        couleur: "text-amber-600",
        description: "Proche limite naturelle (Kouri ~25).",
      };
    } else if (ffmi < 26.5) {
      return {
        niveau: "Limite naturelle",
        couleur: "text-orange-600",
        description: "Extremement rare naturellement. Limite de Kouri ~26.5.",
      };
    } else {
      return {
        niveau: "Tres probablement assiste",
        couleur: "text-red-600",
        description: "FFMI indique tres probablement utilisation de PED.",
      };
    }
  }
}

// Echelle FFMI homme
export const ECHELLE_FFMI_HOMME = [
  {
    min: 0,
    max: 18,
    niveau: "Maigre",
    couleur: "from-slate-400 to-slate-600",
  },
  {
    min: 18,
    max: 19,
    niveau: "Moyen",
    couleur: "from-blue-400 to-blue-600",
  },
  {
    min: 19,
    max: 21,
    niveau: "Intermediaire",
    couleur: "from-cyan-400 to-cyan-600",
  },
  {
    min: 21,
    max: 23,
    niveau: "Avance",
    couleur: "from-emerald-400 to-emerald-600",
  },
  {
    min: 23,
    max: 25,
    niveau: "Tres avance",
    couleur: "from-amber-400 to-amber-600",
  },
  {
    min: 25,
    max: 26.5,
    niveau: "Limite naturelle",
    couleur: "from-orange-400 to-orange-600",
  },
  {
    min: 26.5,
    max: 100,
    niveau: "Probablement assiste",
    couleur: "from-red-400 to-red-600",
  },
];

// Echelle FFMI femme
export const ECHELLE_FFMI_FEMME = [
  {
    min: 0,
    max: 15,
    niveau: "Maigre",
    couleur: "from-slate-400 to-slate-600",
  },
  {
    min: 15,
    max: 16,
    niveau: "Moyen",
    couleur: "from-blue-400 to-blue-600",
  },
  {
    min: 16,
    max: 17,
    niveau: "Intermediaire",
    couleur: "from-cyan-400 to-cyan-600",
  },
  {
    min: 17,
    max: 18,
    niveau: "Avance",
    couleur: "from-emerald-400 to-emerald-600",
  },
  {
    min: 18,
    max: 19,
    niveau: "Tres avance",
    couleur: "from-amber-400 to-amber-600",
  },
  {
    min: 19,
    max: 20,
    niveau: "Limite naturelle",
    couleur: "from-orange-400 to-orange-600",
  },
  {
    min: 20,
    max: 100,
    niveau: "Probablement assiste",
    couleur: "from-red-400 to-red-600",
  },
];
