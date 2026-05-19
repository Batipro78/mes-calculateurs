export interface CheminDeVieInfo {
  nombre: number;
  estMaitre: boolean;
  nom: string;
  description: string;
  force: string;
  faiblesse: string;
  metiers: string;
  couleur: string;
  pierre: string;
}

export function reduireNombre(n: number): number {
  // Réduit jusqu'à 1 chiffre SAUF si 11, 22, 33
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = n
      .toString()
      .split("")
      .reduce((acc, c) => acc + parseInt(c), 0);
  }
  return n;
}

export function calculerCheminDeVie(date: Date): CheminDeVieInfo {
  const jour = date.getDate();
  const mois = date.getMonth() + 1;
  const annee = date.getFullYear();
  const somme = (
    jour +
    "" +
    mois +
    "" +
    annee
  )
    .split("")
    .reduce((a, c) => a + parseInt(c), 0);
  const nombre = reduireNombre(somme);
  return CHEMINS[nombre];
}

export const CHEMINS: Record<number, CheminDeVieInfo> = {
  1: {
    nombre: 1,
    estMaitre: false,
    nom: "Le Pionnier",
    description:
      "Le chemin de vie 1 est celui du leader independant et createur. Vous etes naturellement doue pour initier des projets, innover et tracer votre propre chemin. Votre independance et votre determination font de vous un precurseur dans votre domaine.",
    force:
      "Leadership inné, autonomie, creativité, determination, confiance en soi, capacite a surmonter les obstacles",
    faiblesse:
      "Egocentrisme, impatience, arrogance, tendance a l'egoïsme, difficulte a travailler en equipe, dominance excessive",
    metiers:
      "Entrepreneur, directeur general, createur, artiste, inventeur, architecte, chercheur, chef de projet",
    couleur: "Rouge et Or",
    pierre: "Diamant, Rubis, Grenat",
  },
  2: {
    nombre: 2,
    estMaitre: false,
    nom: "Le Médiateur",
    description:
      "Le chemin de vie 2 est celui de la diplomatie et de l'harmonie. Vous avez une grande sensibilite et une intuition remarquable. Vous cherchez l'equilibre, la cooperation et l'entente dans tous les domaines de votre vie.",
    force:
      "Diplomatie, sensibilite, intuition, empathie, capacite d'ecoute, cooperation, equilibre, bienveillance",
    faiblesse:
      "Dependance emotionnelle, timidite excessive, indecision, hypersensibilite, manque de confiance en soi, passivite",
    metiers:
      "Mediateur, psychologue, therapeute, diplomate, assistant, artiste, musicien, professeur, infirmier, coach",
    couleur: "Bleu clair et Blanc",
    pierre: "Pierre de lune, Calcite blanche, Amazonite",
  },
  3: {
    nombre: 3,
    estMaitre: false,
    nom: "L'Artiste",
    description:
      "Le chemin de vie 3 est celui de la creativite et de l'expression. Vous avez un don naturel pour communiquer, vous exprimer et inspirer les autres. Votre optimisme et votre joie de vivre sont contagieux et vous permettent de creer de belles choses.",
    force:
      "Creativite, expression, communication, optimisme, sociabilite, imagination, capacite d'inspiration, joie de vivre",
    faiblesse:
      "Dispersion, manque de concentration, superficialite, impatience, exces de paroles, manque de discipline, instabilite emotionnelle",
    metiers:
      "Artiste, ecrivain, musicien, acteur, designer, publiciste, professeur, journaliste, animateur, comedien",
    couleur: "Jaune et Or",
    pierre: "Citrine, Topaze jaune, Amber",
  },
  4: {
    nombre: 4,
    estMaitre: false,
    nom: "Le Bâtisseur",
    description:
      "Le chemin de vie 4 est celui de la stabilite et du travail methodique. Vous etes un constructeur au sens propre et figure. Votre fiabilite, votre organisation et votre perseverance vous permettent de creer des fondations solides pour vous et les autres.",
    force:
      "Organisation, stabilite, fiabilite, perseverance, travail methodique, loyaute, solidite, pragmatisme, responsabilite",
    faiblesse:
      "Rigidite, resistance au changement, ennui, manque de flexibilite, tendance a l'autoritarisme, difficulte d'adaptation, blocages emotionnels",
    metiers:
      "Ingenier, architecte, comptable, gestionnaire, entrepreneur agricole, charpentier, maçon, organisateur, administrateur",
    couleur: "Vert foncé et Marron",
    pierre: "Emeraude, Jade, Tourmaline verte",
  },
  5: {
    nombre: 5,
    estMaitre: false,
    nom: "L'Aventurier",
    description:
      "Le chemin de vie 5 est celui de la liberte et du changement. Vous etes un aventurier dans l'ame, curieux et adapte. La vie est votre terrain de jeu, et vous apprenez en vivant. Votre flexibilite et votre soif de decouverte vous pousse constamment vers de nouveaux horizons.",
    force:
      "Liberte, adaptabilite, curiosite, dynamisme, flexibilite, independence, courage face au changement, versatilite",
    faiblesse:
      "Instabilite, impatience, difficulte a s'engager, irresponsabilite, impulsivite, manque de concentration, excès d'aventure",
    metiers:
      "Journaliste, guide touristique, vendeur, acteur, consultant, photographe, pilote, agent de voyage, explorateur, communicant",
    couleur: "Bleu ciel et Gris",
    pierre: "Apatite bleue, Tourmaline bleu, Saphir bleu",
  },
  6: {
    nombre: 6,
    estMaitre: false,
    nom: "Le Protecteur",
    description:
      "Le chemin de vie 6 est celui de la responsabilite et de l'amour inconditionnel. Vous avez un grand cœur et une tendance naturelle a vous occuper des autres. La famille, l'harmonie et le service sont au cœur de votre existence. Vous etes le refuge et le soutien de vos proches.",
    force:
      "Amour, devouement, responsabilite, compassion, equilibre, harmonie, capacite de soin, loyaute familiale, bienveillance",
    faiblesse:
      "Sacrifice excessif, codependance, culpabilite, tendance a la manipulation par l'amour, jalousie, possessivite, surcharge emotionnelle",
    metiers:
      "Professeur, medecin, infirmier, travailleur social, conseiller, jardinier, decorateur, consultante en ressources humaines, coach de vie",
    couleur: "Rose et Turquoise",
    pierre: "Tourmaline rose, Quartz rose, Emeraude",
  },
  7: {
    nombre: 7,
    estMaitre: false,
    nom: "Le Sage",
    description:
      "Le chemin de vie 7 est celui de la spiritualite et de la sagesse. Vous etes un chercheur de verite, un mystique. Vous avez une profondeur de reflexion rare et une intuition spirituelle. Le monde materiel vous interesse moins que le monde interieur et spirituel.",
    force:
      "Sagesse, intuition, spiritualite, introspection, analyse, profondeur, mystique, capacite de discernement, recherche de verite",
    faiblesse:
      "Isolement, cynisme, perfectionnisme excessif, difficulte de communication, detachement du monde reel, pessimisme, critique severe",
    metiers:
      "Philosophe, spirituel, chercheur, scientifique, analyste, psychologue, professeur, moines, astrologue, numerologue, therapeute",
    couleur: "Violet et Indigo",
    pierre: "Amelyste, Labradorite, Fluorite violette",
  },
  8: {
    nombre: 8,
    estMaitre: false,
    nom: "Le Magnat",
    description:
      "Le chemin de vie 8 est celui du pouvoir et du succes materiel. Vous avez des capacites innees pour le leadership, la gestion et la creation de richesse. Vous comprenez le jeu des affaires et avez une vision strategique. Le succes et l'autorite sont naturels pour vous.",
    force:
      "Leadership, ambition, pouvoir, succes materiel, gestion, vision strategique, determination, efficacite, capacite de decision",
    faiblesse:
      "Materialisme excessif, obsession du pouvoir, arrogance, insensibilite emotionnelle, tendances dictatoriales, oubli des valeurs humaines",
    metiers:
      "Cadre superieur, PDG, entrepreneur, avocat, banquier, investisseur, directeur financier, politicien, chef d'entreprise",
    couleur: "Noir et Or",
    pierre: "Tourmaline noire, Obsidienne, Hematite",
  },
  9: {
    nombre: 9,
    estMaitre: false,
    nom: "L'Humaniste",
    description:
      "Le chemin de vie 9 est celui de l'altruisme et de l'universalite. Vous avez une vision globale de l'humanite et une profonde compassion. Vous cherchez a servir, a guerir et a transformer le monde. Votre amour pour l'humanite est votre moteur.",
    force:
      "Altruisme, compassion, vision universelle, sagesse, charite, capacite de transformation, sensibilite, amour inconditionnel, humanisme",
    faiblesse:
      "Utopisme naif, detachement de la realite, idealisme decu, difficulte a dire non, absorption d'energies negatives, sacrifice de soi",
    metiers:
      "Medecin humanitaire, travailleur social, conseiller, professeur, artiste social, activiste, psychologue, therapeute, religieux",
    couleur: "Blanc et Arc-en-ciel",
    pierre: "Clear Quartz, Selenite, Howlite",
  },
  11: {
    nombre: 11,
    estMaitre: true,
    nom: "Maître Intuitif",
    description:
      "Le nombre maitre 11 est celui de l'inspiration spirituelle et de la vision elevee. Vous avez des capacites psychiques et intuitives exceptionnelles. Vous etes un canal pour l'inspiration divine. Votre sensibilite vous permet de capter les energies subtiles du monde.",
    force:
      "Intuition exceptionnelle, inspiration, sensibilite psychique, vision spirituelle, idealism, compassion, capacite de canalisation, clairvoyance",
    faiblesse:
      "Nervosité excessive, hypersensibilité destructrice, anxiete, indecision paralysante, manque de concretisation, idealism impraticable",
    metiers:
      "Spirituel guide, therapeute energetique, numerologue, astrologue, ecrivain inspiré, artiste mystique, coach de vie spirituelle, medium",
    couleur: "Pourpre et Argent",
    pierre: "Amelyste, Selenite, Fluorite violette",
  },
  22: {
    nombre: 22,
    estMaitre: true,
    nom: "Maître Bâtisseur",
    description:
      "Le nombre maitre 22 est celui de la manifestation et de la realisation des reves en realite concrete. Vous avez le potentiel de changer le monde d'une maniere materielle et tangible. Vous etes un architecte spirituel, capable de construire des empires physiques et spirituels.",
    force:
      "Vision grandiose, capacite de manifestation, realisation concrète, leadership spirituel, ambition elevee, gestion strategique, transformation materielle",
    faiblesse:
      "Perfectionnisme paralysant, culpabilite si echecs, pression excessive, difficulte a accepter les limitations, tendance au doute de soi",
    metiers:
      "Entrepreneur visionnaire, architecte de transformations, leader de mouvements, createur d'organisations durables, scientifique applique",
    couleur: "Noir et Or",
    pierre: "Tourmaline noire, Diamant, Obsidienne doree",
  },
  33: {
    nombre: 33,
    estMaitre: true,
    nom: "Maître Enseignant",
    description:
      "Le nombre maitre 33 est le plus rare et le plus eleve. C'est celui du service a l'humanite et de la conscience christique. Vous avez une mission spirituelle elevee : enseigner, guerir et elever la conscience collective. Votre presence est un cadeau pour le monde.",
    force:
      "Service divin, enseignement spirituel, compassion universelle, guerison, transmission de sagesse, elevation collective, amour inconditionnel",
    faiblesse:
      "Surcharge de responsabilite cosmique, detachement de la realite personnelle, doute de la mission, sacrifice personnel excessif",
    metiers:
      "Maitre spirituel, gurisseur, prophete, enseignant spirituel, therapeute holistique, createur de mouvements transformateurs, guide de conscience",
    couleur: "Or et Blanc",
    pierre: "Clear Quartz, Selenite, Diamant",
  },
};
