export interface NombreInfo {
  nombre: number;
  estMaitre: boolean;
  nom: string;
  description: string;
}

export interface ResultatNumerologie {
  expression: NombreInfo;
  coeur: NombreInfo;
  personnalite: NombreInfo;
  nomComplet: string;
  detailCalcul: {
    voyelles: { lettre: string; valeur: number }[];
    consonnes: { lettre: string; valeur: number }[];
    toutes: { lettre: string; valeur: number }[];
  };
}

const LETTRES_VALEURS: Record<string, number> = {
  A: 1,
  J: 1,
  S: 1,
  B: 2,
  K: 2,
  T: 2,
  C: 3,
  L: 3,
  U: 3,
  D: 4,
  M: 4,
  V: 4,
  E: 5,
  N: 5,
  W: 5,
  F: 6,
  O: 6,
  X: 6,
  G: 7,
  P: 7,
  Y: 7,
  H: 8,
  Q: 8,
  Z: 8,
  I: 9,
  R: 9,
};

const VOYELLES = "AEIOUY";

const SIGNIFICATIONS: Record<number, { nom: string; description: string }> = {
  1: {
    nom: "Pionnier",
    description:
      "Independant, leader ne, visionnaire et createur. Vous avez la capacite a prendre l'initiative et a ouvrir des voies nouvelles. Confiant en vos capacites, vous aimer relever les defis.",
  },
  2: {
    nom: "Diplomate",
    description:
      "Sensible, cooperatif et intuitif. Vous recherchez l'harmonie et l'equilibre. Vous etes un bon mediateur, patient et comprenant. Vous excellez dans le travail en equipe.",
  },
  3: {
    nom: "Artiste",
    description:
      "Creatif, expressif et communicatif. Vous avez un don pour l'art, la musique et l'ecriture. Votre charisme et votre optimisme vous permettent d'inspirer les autres.",
  },
  4: {
    nom: "Bâtisseur",
    description:
      "Organise, stable et pragmatique. Vous etes methodique et travaillez dur pour construire une base solide. Vous etes fiable et responsable, avec un esprit pratique hors pair.",
  },
  5: {
    nom: "Aventurier",
    description:
      "Libre, curieux et dynamique. Vous aimer l'aventure et la decouverte. Vous etes adaptable et aimer vivre de nouvelles experiences. L'ennui n'est pas pour vous.",
  },
  6: {
    nom: "Protecteur",
    description:
      "Responsable, bienveillant et attache a la famille. Vous prenez soin des autres et vous aimez l'harmonie domestique. Vous etes fiable et loyal dans vos relations.",
  },
  7: {
    nom: "Sage",
    description:
      "Spirituel, introspectif et analytique. Vous aimez approfondir vos connaissances et reflechir aux grandes questions. Vous etes methodique et recherchez la sagesse.",
  },
  8: {
    nom: "Magnat",
    description:
      "Ambitieux, puissant et pragmatique. Vous avez une capacite naturelle pour les affaires et la gestion. Vous recherchez le succes materiellement et le pouvoir personnel.",
  },
  9: {
    nom: "Humaniste",
    description:
      "Altruiste, compassionnel et universel. Vous pensez au bien commun et aimer aider les autres. Vous avez une large vision et une grande empathie pour tous.",
  },
  11: {
    nom: "Maître Intuitif",
    description:
      "Visionnaire et intuitif. Vous possedez une intuition remarquable et une connexion profonde aux energies invisibles. Vous avez une mission elevee dans la vie.",
  },
  22: {
    nom: "Maître Bâtisseur",
    description:
      "Transformateur et manifesteur. Vous avez le potentiel de realiser de grands projets et de transformer le monde. Vous etes puissant et responsable de vos creations.",
  },
  33: {
    nom: "Maître Enseignant",
    description:
      "Communicateur et guide spirituel. Vous avez une mission d'enseignement et de service. Vous inspirez les autres et aidez a l'evolution collective.",
  },
};

function normaliser(texte: string): string {
  return texte
    .toUpperCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Z]/g, "");
}

function reduireNombre(n: number): number {
  if (n === 11 || n === 22 || n === 33) {
    return n;
  }

  while (n >= 10) {
    n = String(n)
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit), 0);
  }

  return n;
}

function calculerSomme(texte: string, inclureVoyelles: boolean): { somme: number; details: { lettre: string; valeur: number }[] } {
  const details: { lettre: string; valeur: number }[] = [];
  let somme = 0;

  for (const lettre of texte) {
    const estVoyelle = VOYELLES.includes(lettre);

    if (inclureVoyelles) {
      if (estVoyelle) {
        const valeur = LETTRES_VALEURS[lettre] || 0;
        details.push({ lettre, valeur });
        somme += valeur;
      }
    } else {
      if (!estVoyelle) {
        const valeur = LETTRES_VALEURS[lettre] || 0;
        details.push({ lettre, valeur });
        somme += valeur;
      }
    }
  }

  return { somme, details };
}

export function calculerNumerologieNom(
  prenom: string,
  nom: string
): ResultatNumerologie {
  const prenomNorm = normaliser(prenom);
  const nomNorm = normaliser(nom);
  const nomComplet = `${prenom} ${nom}`;
  const texteFull = prenomNorm + nomNorm;

  // Calcul Expression (toutes lettres)
  const toutesSomme = texteFull
    .split("")
    .reduce((sum, lettre) => sum + (LETTRES_VALEURS[lettre] || 0), 0);
  const expressionNombre = reduireNombre(toutesSomme);
  const toutesDetails = texteFull.split("").map((lettre) => ({
    lettre,
    valeur: LETTRES_VALEURS[lettre] || 0,
  }));

  // Calcul Cœur (voyelles uniquement)
  const { somme: sommeCœur, details: detailsVoyelles } =
    calculerSomme(texteFull, true);
  const cœurNombre = reduireNombre(sommeCœur);

  // Calcul Personnalité (consonnes uniquement)
  const { somme: sommePerso, details: detailsConsonnes } =
    calculerSomme(texteFull, false);
  const persoNombre = reduireNombre(sommePerso);

  return {
    expression: {
      nombre: expressionNombre,
      estMaitre: expressionNombre === 11 || expressionNombre === 22 || expressionNombre === 33,
      nom: SIGNIFICATIONS[expressionNombre].nom,
      description: SIGNIFICATIONS[expressionNombre].description,
    },
    coeur: {
      nombre: cœurNombre,
      estMaitre: cœurNombre === 11 || cœurNombre === 22 || cœurNombre === 33,
      nom: SIGNIFICATIONS[cœurNombre].nom,
      description: SIGNIFICATIONS[cœurNombre].description,
    },
    personnalite: {
      nombre: persoNombre,
      estMaitre: persoNombre === 11 || persoNombre === 22 || persoNombre === 33,
      nom: SIGNIFICATIONS[persoNombre].nom,
      description: SIGNIFICATIONS[persoNombre].description,
    },
    nomComplet,
    detailCalcul: {
      voyelles: detailsVoyelles,
      consonnes: detailsConsonnes,
      toutes: toutesDetails,
    },
  };
}
