export interface ResultatAgeCorrige {
  ageReelJours: number;
  ageReelSemaines: number;
  ageReelMois: number;
  ageReelTexte: string;
  ageCorrigeJours: number;
  ageCorrigeSemaines: number;
  ageCorrigeMois: number;
  ageCorrigeTexte: string;
  semainesPrematurite: number;
  joursPrematurite: number;
  niveauPrematurite: NiveauPremature;
  agePrenatalSA: number;
  recommandationSuivi: string;
  correctionPertinente: boolean;
  moisAvantFinCorrection: number;
}

export type NiveauPremature =
  | "terme"
  | "tardif"
  | "moyen"
  | "grand"
  | "extreme";

export interface NiveauInfo {
  id: NiveauPremature;
  nom: string;
  saMin: number;
  saMax: number;
  description: string;
  emoji: string;
  couleur: string;
}

export const NIVEAUX_PREMATURITE: NiveauInfo[] = [
  {
    id: "extreme",
    nom: "Extreme prematurite",
    saMin: 22,
    saMax: 27,
    description: "Ne avant 28 SA. Suivi neonatal intensif requis.",
    emoji: "🍼",
    couleur: "rose",
  },
  {
    id: "grand",
    nom: "Grande prematurite",
    saMin: 28,
    saMax: 31,
    description: "Ne entre 28 et 32 SA. Hospitalisation en neonatologie.",
    emoji: "👶",
    couleur: "orange",
  },
  {
    id: "moyen",
    nom: "Prematurite moyenne",
    saMin: 32,
    saMax: 33,
    description: "Ne entre 32 et 34 SA. Risque modere.",
    emoji: "👶",
    couleur: "amber",
  },
  {
    id: "tardif",
    nom: "Prematurite tardive",
    saMin: 34,
    saMax: 36,
    description: "Ne entre 34 et 37 SA. Surveillance recommandee.",
    emoji: "👶",
    couleur: "yellow",
  },
  {
    id: "terme",
    nom: "Ne a terme",
    saMin: 37,
    saMax: 42,
    description: "Pas de correction necessaire.",
    emoji: "👶",
    couleur: "green",
  },
];

function diffJours(d1: Date, d2: Date): number {
  const ms = d2.getTime() - d1.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

function formatAge(jours: number): string {
  if (jours < 0) return "0 jour";
  if (jours < 14) return `${jours} jour${jours > 1 ? "s" : ""}`;
  if (jours < 60) {
    const sem = Math.floor(jours / 7);
    const j = jours % 7;
    return j === 0 ? `${sem} semaines` : `${sem} sem ${j} j`;
  }
  const mois = Math.floor(jours / 30.44);
  const joursRestants = Math.round(jours - mois * 30.44);
  if (mois < 24 && joursRestants > 0) {
    return `${mois} mois ${joursRestants} j`;
  }
  if (mois < 24) return `${mois} mois`;
  const annees = Math.floor(mois / 12);
  const moisRestants = mois % 12;
  return moisRestants === 0
    ? `${annees} an${annees > 1 ? "s" : ""}`
    : `${annees} an${annees > 1 ? "s" : ""} ${moisRestants} mois`;
}

function determinerNiveau(saSemaines: number): NiveauPremature {
  if (saSemaines < 28) return "extreme";
  if (saSemaines < 32) return "grand";
  if (saSemaines < 34) return "moyen";
  if (saSemaines < 37) return "tardif";
  return "terme";
}

function recommandation(
  ageCorrigeMois: number,
  niveau: NiveauPremature,
): { texte: string; correctionPertinente: boolean; moisAvantFin: number } {
  // Recommandation Societe Francaise de Neonatologie + AAP :
  // Correction jusqu'a 24 mois (extreme/grand) ou 12-18 mois (moyen/tardif)
  let limiteMois = 24;
  if (niveau === "moyen") limiteMois = 18;
  if (niveau === "tardif") limiteMois = 12;
  if (niveau === "terme") limiteMois = 0;

  const correctionPertinente = ageCorrigeMois < limiteMois && niveau !== "terme";
  const moisAvantFin = Math.max(0, limiteMois - ageCorrigeMois);

  if (niveau === "terme") {
    return {
      texte:
        "Bebe ne a terme : aucune correction d'age necessaire. Utilisez l'age reel pour evaluer le developpement.",
      correctionPertinente: false,
      moisAvantFin: 0,
    };
  }

  if (!correctionPertinente) {
    return {
      texte: `Bebe a depasse l'age de correction (limite ${limiteMois} mois pour cette prematurite). Utilisez desormais l'age reel.`,
      correctionPertinente: false,
      moisAvantFin: 0,
    };
  }

  return {
    texte: `Continuez a utiliser l'age corrige pour evaluer le developpement (acquisitions motrices, langage, croissance). Correction recommandee jusqu'a ${limiteMois} mois d'age corrige (encore ${Math.ceil(moisAvantFin)} mois). Source : Societe Francaise de Neonatologie + American Academy of Pediatrics.`,
    correctionPertinente: true,
    moisAvantFin,
  };
}

export function calculerAgeCorrige(
  dateNaissance: Date,
  dateTerme: Date,
  dateActuelle: Date,
): ResultatAgeCorrige {
  // Age reel : difference entre date actuelle et date de naissance
  const ageReelJours = Math.max(0, diffJours(dateNaissance, dateActuelle));

  // Jours de prematurite : difference entre terme prevu et naissance reelle
  const joursPrematurite = Math.max(0, diffJours(dateNaissance, dateTerme));
  const semainesPrematurite = joursPrematurite / 7;

  // Age corrige = age reel - jours de prematurite
  const ageCorrigeJours = Math.max(0, ageReelJours - joursPrematurite);

  // Age gestationnel a la naissance (en SA)
  // SA standard a terme = 40, donc SA naissance = 40 - semainesPrematurite
  const agePrenatalSA = Math.max(22, 40 - semainesPrematurite);
  const niveau = determinerNiveau(agePrenatalSA);

  const ageReelMois = ageReelJours / 30.44;
  const ageCorrigeMois = ageCorrigeJours / 30.44;

  const reco = recommandation(ageCorrigeMois, niveau);

  return {
    ageReelJours,
    ageReelSemaines: Math.floor(ageReelJours / 7),
    ageReelMois: Math.round(ageReelMois * 10) / 10,
    ageReelTexte: formatAge(ageReelJours),
    ageCorrigeJours,
    ageCorrigeSemaines: Math.floor(ageCorrigeJours / 7),
    ageCorrigeMois: Math.round(ageCorrigeMois * 10) / 10,
    ageCorrigeTexte: formatAge(ageCorrigeJours),
    semainesPrematurite: Math.round(semainesPrematurite * 10) / 10,
    joursPrematurite,
    niveauPrematurite: niveau,
    agePrenatalSA: Math.round(agePrenatalSA * 10) / 10,
    recommandationSuivi: reco.texte,
    correctionPertinente: reco.correctionPertinente,
    moisAvantFinCorrection: Math.round(reco.moisAvantFin * 10) / 10,
  };
}

export function getNiveauInfo(niveau: NiveauPremature): NiveauInfo {
  return NIVEAUX_PREMATURITE.find((n) => n.id === niveau)!;
}
