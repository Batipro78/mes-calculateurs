// Tennis FFT Classement Calculator

export type ClassementFFT = string;

export interface BilanFFT {
  bilanPoints: number;
  classementEstime: string;
  progression: string;
}

// Ordre FFT du meilleur au moins bon
export const CLASSEMENTS_ORDRE: ClassementFFT[] = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
  "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
  "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
  "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
  "41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
  "51", "52", "53", "54", "55", "56", "57", "58", "59", "60",
  "61", "62", "63", "64", "65", "66", "67", "68", "69", "70",
  "71", "72", "73", "74", "75", "76", "77", "78", "79", "80",
  "81", "82", "83", "84", "85", "86", "87", "88", "89", "90",
  "91", "92", "93", "94", "95", "96", "97", "98", "99", "100",
  "-30", "-15", "-4/6", "-2/6", "0", "1/6", "2/6", "3/6", "4/6", "5/6",
  "15", "15/1", "15/2", "15/3", "15/4", "15/5",
  "30", "30/1", "30/2", "30/3", "30/4", "30/5",
  "40",
  "NC"
];

// Echelle simplified pour affichage
export const ECHELLE_CLASSEMENT = [
  { classement: "1-30", label: "Elite (1 a 30)", couleur: "from-red-600 to-red-500" },
  { classement: "31-100", label: "Elite (31 a 100)", couleur: "from-orange-600 to-orange-500" },
  { classement: "-30 a 0", label: "1ere serie", couleur: "from-yellow-600 to-yellow-500" },
  { classement: "1/6 a 5/6", label: "2eme serie", couleur: "from-emerald-600 to-emerald-500" },
  { classement: "15 a 15/5", label: "3eme serie", couleur: "from-cyan-600 to-cyan-500" },
  { classement: "30 a 30/5", label: "4eme serie", couleur: "from-blue-600 to-blue-500" },
  { classement: "40", label: "5eme serie", couleur: "from-purple-600 to-purple-500" },
  { classement: "NC", label: "Non-classe", couleur: "from-slate-500 to-slate-400" }
];

// Obtenir l'indice numerique d'un classement (0 = meilleur, augmente = moins bon)
export function getIndiceClassement(c: ClassementFFT): number {
  const index = CLASSEMENTS_ORDRE.indexOf(c);
  return index >= 0 ? index : CLASSEMENTS_ORDRE.length - 1;
}

// Comparer deux classements : retourne -1, 0, 1 (compare a b)
export function comparerClassements(a: ClassementFFT, b: ClassementFFT): number {
  const indiceA = getIndiceClassement(a);
  const indiceB = getIndiceClassement(b);
  if (indiceA < indiceB) return -1;
  if (indiceA > indiceB) return 1;
  return 0;
}

// Calculer le bilan FFT : estime la progression basee sur victoires et defaites
export function calculerBilanFFT({
  classementActuel,
  victoires, // Array de { classementAdversaire, nombre }
  defaites,  // Array de { classementAdversaire, nombre }
}: {
  classementActuel: ClassementFFT;
  victoires: Array<{ classementAdversaire: ClassementFFT; nombre: number }>;
  defaites: Array<{ classementAdversaire: ClassementFFT; nombre: number }>;
}): BilanFFT {
  let bilanPoints = 0;

  const indiceActuel = getIndiceClassement(classementActuel);

  // Victoires : bonus si contre meilleur classement, points si egal/moins bon
  victoires.forEach(({ classementAdversaire, nombre }) => {
    const indiceAdversaire = getIndiceClassement(classementAdversaire);
    const diff = indiceAdversaire - indiceActuel;

    if (diff < 0) {
      // Adversaire mieux classé = bonus
      const bonus = Math.ceil(Math.abs(diff) / 10) + 2; // Approximation
      bilanPoints += bonus * nombre;
    } else if (diff === 0) {
      // Meme niveau = 1 point par victoire
      bilanPoints += nombre;
    } else {
      // Moins bon classement = 0.5 point par victoire (peu de gain)
      bilanPoints += Math.ceil(nombre * 0.5);
    }
  });

  // Defaites : -2 points par defaite (regle V-E-2I-5G FFT)
  defaites.forEach(({ nombre }) => {
    bilanPoints -= 2 * nombre;
  });

  // Bonification des 5 meilleures victoires (5G) : +2 points supp par victoire elite
  const victoires5G = victoires
    .filter(v => getIndiceClassement(v.classementAdversaire) < indiceActuel)
    .slice(0, 5);
  victoires5G.forEach(v => {
    bilanPoints += 2 * v.nombre;
  });

  // Estime classement suivant based sur bilan
  let classementEstime = classementActuel;
  let progression = "stable";

  if (bilanPoints >= 5) {
    // Progression attendue
    const indiceNext = Math.max(0, indiceActuel - 1);
    classementEstime = CLASSEMENTS_ORDRE[indiceNext];
    progression = `vers ${classementEstime}`;
  } else if (bilanPoints >= 3) {
    progression = "possible progression";
  } else if (bilanPoints < -5) {
    // Regression
    const indiceNext = Math.min(CLASSEMENTS_ORDRE.length - 1, indiceActuel + 1);
    classementEstime = CLASSEMENTS_ORDRE[indiceNext];
    progression = `risque vers ${classementEstime}`;
  } else if (bilanPoints < 0) {
    progression = "a consolider";
  }

  return {
    bilanPoints: Math.round(bilanPoints * 10) / 10,
    classementEstime,
    progression,
  };
}
