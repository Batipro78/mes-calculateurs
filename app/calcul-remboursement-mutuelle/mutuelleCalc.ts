// Calculateur Remboursement Mutuelle Sante 2026

export type TypeActe =
  | "consultation-generaliste"
  | "consultation-specialiste"
  | "hospitalisation"
  | "dentaire-couronne"
  | "dentaire-implant"
  | "optique-verres"
  | "optique-monture"
  | "pharmacie"
  | "kine"
  | "radio-irm";

export type NiveauMutuelle = "basique" | "intermediaire" | "premium";

export interface ActeConfig {
  label: string;
  icon: string;
  baseSS: number; // Base de remboursement SS en euros
  tauxSS: number; // Taux SS en pourcentage (ex: 70 = 70%)
  participationForfaitaire: number; // Participation forfaitaire (1€ consultation, 0 sinon)
  plafondMutuelle: Record<NiveauMutuelle, number>; // Pourcentage de la baseSS (100%, 200%, 300%)
}

export const ACTES: Record<TypeActe, ActeConfig> = {
  "consultation-generaliste": {
    label: "Consultation generaliste",
    icon: "🩺",
    baseSS: 26.5,
    tauxSS: 70,
    participationForfaitaire: 1,
    plafondMutuelle: { basique: 100, intermediaire: 150, premium: 300 },
  },
  "consultation-specialiste": {
    label: "Consultation specialiste",
    icon: "👨‍⚕️",
    baseSS: 30,
    tauxSS: 70,
    participationForfaitaire: 1,
    plafondMutuelle: { basique: 100, intermediaire: 200, premium: 350 },
  },
  hospitalisation: {
    label: "Hospitalisation (par jour)",
    icon: "🏥",
    baseSS: 800,
    tauxSS: 80,
    participationForfaitaire: 20, // Forfait hospitalier journalier
    plafondMutuelle: { basique: 100, intermediaire: 200, premium: 400 },
  },
  "dentaire-couronne": {
    label: "Dentaire - Couronne",
    icon: "🦷",
    baseSS: 120,
    tauxSS: 70,
    participationForfaitaire: 0,
    plafondMutuelle: { basique: 100, intermediaire: 250, premium: 400 },
  },
  "dentaire-implant": {
    label: "Dentaire - Implant",
    icon: "🔩",
    baseSS: 120,
    tauxSS: 70,
    participationForfaitaire: 0,
    plafondMutuelle: { basique: 100, intermediaire: 200, premium: 500 },
  },
  "optique-verres": {
    label: "Optique - Verres",
    icon: "👓",
    baseSS: 12.04,
    tauxSS: 60,
    participationForfaitaire: 0,
    plafondMutuelle: { basique: 100, intermediaire: 300, premium: 600 },
  },
  "optique-monture": {
    label: "Optique - Monture",
    icon: "🕶️",
    baseSS: 2.84,
    tauxSS: 60,
    participationForfaitaire: 0,
    plafondMutuelle: { basique: 100, intermediaire: 400, premium: 800 },
  },
  pharmacie: {
    label: "Pharmacie (medicament)",
    icon: "💊",
    baseSS: 20,
    tauxSS: 65,
    participationForfaitaire: 0.5, // Franchise medicale
    plafondMutuelle: { basique: 100, intermediaire: 150, premium: 200 },
  },
  kine: {
    label: "Seance de kine",
    icon: "💆",
    baseSS: 18.55,
    tauxSS: 60,
    participationForfaitaire: 0,
    plafondMutuelle: { basique: 100, intermediaire: 200, premium: 350 },
  },
  "radio-irm": {
    label: "Radio / IRM",
    icon: "📷",
    baseSS: 75,
    tauxSS: 70,
    participationForfaitaire: 0,
    plafondMutuelle: { basique: 100, intermediaire: 200, premium: 400 },
  },
};

export const TYPES_ACTE: TypeActe[] = [
  "consultation-generaliste",
  "consultation-specialiste",
  "hospitalisation",
  "dentaire-couronne",
  "dentaire-implant",
  "optique-verres",
  "optique-monture",
  "pharmacie",
  "kine",
  "radio-irm",
];

export const NIVEAUX: NiveauMutuelle[] = ["basique", "intermediaire", "premium"];

export const NIVEAU_LABELS: Record<NiveauMutuelle, string> = {
  basique: "Basique",
  intermediaire: "Intermediaire",
  premium: "Premium",
};

export interface ResultatMutuelle {
  coutReel: number;
  baseSS: number;
  remboursementSS: number;
  tauxSS: number;
  remboursementMutuelle: number;
  resteACharge: number;
  pourcentageCouvert: number;
  detail: string;
}

export interface ComparatifNiveau {
  niveau: NiveauMutuelle;
  label: string;
  remboursementSS: number;
  remboursementMutuelle: number;
  resteACharge: number;
  pourcentageCouvert: number;
}

export function calcRemboursementMutuelle(
  typeActe: TypeActe,
  coutReel: number,
  niveauMutuelle: NiveauMutuelle
): ResultatMutuelle {
  const acte = ACTES[typeActe];
  const { baseSS, tauxSS, participationForfaitaire, plafondMutuelle } = acte;

  // Etape 1 : Remboursement SS = baseSS * tauxSS - participation forfaitaire
  const remboursementSSBrut = baseSS * (tauxSS / 100);
  const remboursementSS = Math.max(0, Math.min(remboursementSSBrut - participationForfaitaire, coutReel));

  // Etape 2 : Plafond mutuelle = pourcentage de la baseSS
  const plafondMutuelleMontant = baseSS * (plafondMutuelle[niveauMutuelle] / 100);

  // Etape 3 : La mutuelle rembourse jusqu'au plafond, minus ce que la SS a deja rembourse
  // Le remboursement total (SS + mutuelle) ne peut pas depasser le plafond mutuelle ni le cout reel
  const totalMaxRemboursable = Math.min(plafondMutuelleMontant, coutReel);
  const remboursementMutuelle = Math.max(0, totalMaxRemboursable - remboursementSS);

  // Etape 4 : Reste a charge
  const resteACharge = Math.max(0, coutReel - remboursementSS - remboursementMutuelle);

  // Pourcentage couvert
  const pourcentageCouvert = coutReel > 0
    ? Math.round(((remboursementSS + remboursementMutuelle) / coutReel) * 1000) / 10
    : 0;

  // Detail textuel
  let detail = `La Securite Sociale rembourse ${remboursementSS.toFixed(2)} € (${tauxSS}% de ${baseSS.toFixed(2)} €`;
  if (participationForfaitaire > 0) {
    detail += ` - ${participationForfaitaire.toFixed(2)} € de participation forfaitaire`;
  }
  detail += `). `;
  detail += `Votre mutuelle ${NIVEAU_LABELS[niveauMutuelle]} complete a hauteur de ${remboursementMutuelle.toFixed(2)} € (plafond : ${plafondMutuelle[niveauMutuelle]}% BR). `;
  detail += `Reste a votre charge : ${resteACharge.toFixed(2)} €.`;

  return {
    coutReel,
    baseSS,
    remboursementSS: Math.round(remboursementSS * 100) / 100,
    tauxSS,
    remboursementMutuelle: Math.round(remboursementMutuelle * 100) / 100,
    resteACharge: Math.round(resteACharge * 100) / 100,
    pourcentageCouvert,
    detail,
  };
}

export function calcComparatifNiveaux(
  typeActe: TypeActe,
  coutReel: number
): ComparatifNiveau[] {
  return NIVEAUX.map((niveau) => {
    const res = calcRemboursementMutuelle(typeActe, coutReel, niveau);
    return {
      niveau,
      label: NIVEAU_LABELS[niveau],
      remboursementSS: res.remboursementSS,
      remboursementMutuelle: res.remboursementMutuelle,
      resteACharge: res.resteACharge,
      pourcentageCouvert: res.pourcentageCouvert,
    };
  });
}
