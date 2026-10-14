// Calculateur Remboursement Mutuelle Sante 2026
//
// Sources (ameli.fr et service-public.fr, lues le 14/10/2026) :
//  - consultation generaliste secteur 1 : base 30 EUR, 70 %, participation forfaitaire 2 EUR
//  - specialiste (hors pediatre, psychiatre, neurologue, geriatre, gynecologue medical, MPR) secteur 1 ou Optam, sur avis du medecin traitant : base 31,50 EUR, 70 %, participation forfaitaire 2 EUR
//  - couronne dentaire : base 120 EUR, prothese dentaire remboursee a 60 %
//  - monture : base 2,84 EUR, verre simple foyer : base 6,25 EUR, optique 60 %
//  - medicament : 65 % (service medical rendu majeur ou important), franchise 1 EUR par boite
//  - masseur-kinesitherapeute : 16,58 EUR la seance, 60 %, franchise 1 EUR par acte
//  - imagerie : 70 %, participation forfaitaire 2 EUR (mammographie en secteur 1 : 66,42 EUR)
//  - contrat responsable : la participation forfaitaire et les franchises ne sont pas remboursees
//  - "150 % de la base" = remboursement TOTAL (Assurance maladie incluse) jusqu'a 150 % de la base
// Taux general du regime general (hors ALD, maternite, Alsace-Moselle, hors parcours de soins).

export type TypeActe =
  | "consultation-generaliste"
  | "consultation-specialiste"
  | "dentaire-couronne"
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
  baseSuitLeCout?: boolean; // vrai pour un medicament : le prix fixe est la base
  tauxSS: number; // Taux SS en pourcentage (ex: 70 = 70%)
  // Somme retenue par l'Assurance maladie sur son remboursement et jamais prise
  // en charge par un contrat responsable : participation forfaitaire (2 EUR par
  // consultation ou acte d'imagerie) ou franchise medicale (1 EUR par boite ou par acte).
  retenueForfaitaire: number;
}

// Niveau de garantie du contrat, en % de la base de remboursement, Securite sociale comprise.
export const POURCENTAGE_BR: Record<NiveauMutuelle, number> = {
  basique: 100,
  intermediaire: 200,
  premium: 300,
};

export const ACTES: Record<TypeActe, ActeConfig> = {
  "consultation-generaliste": {
    label: "Consultation generaliste",
    icon: "🩺",
    baseSS: 30,
    tauxSS: 70,
    retenueForfaitaire: 2,
  },
  "consultation-specialiste": {
    label: "Consultation specialiste (sur avis du medecin traitant)",
    icon: "👨‍⚕️",
    baseSS: 31.5,
    tauxSS: 70,
    retenueForfaitaire: 2,
  },
  "dentaire-couronne": {
    label: "Dentaire - Couronne",
    icon: "🦷",
    baseSS: 120,
    tauxSS: 60,
    retenueForfaitaire: 0,
  },
  "optique-verres": {
    label: "Optique - 1 verre simple foyer",
    icon: "👓",
    baseSS: 6.25,
    tauxSS: 60,
    retenueForfaitaire: 0,
  },
  "optique-monture": {
    label: "Optique - Monture",
    icon: "🕶️",
    baseSS: 2.84,
    tauxSS: 60,
    retenueForfaitaire: 0,
  },
  pharmacie: {
    label: "Pharmacie (1 boite, remboursee a 65 %)",
    icon: "💊",
    baseSS: 7.95,
    baseSuitLeCout: true,
    tauxSS: 65,
    retenueForfaitaire: 1,
  },
  kine: {
    label: "Seance de kine",
    icon: "💆",
    baseSS: 16.58,
    tauxSS: 60,
    retenueForfaitaire: 1,
  },
  "radio-irm": {
    label: "Imagerie (ex : mammographie)",
    icon: "📷",
    baseSS: 66.42,
    tauxSS: 70,
    retenueForfaitaire: 2,
  },
};

export const TYPES_ACTE: TypeActe[] = [
  "consultation-generaliste",
  "consultation-specialiste",
  "dentaire-couronne",
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
  retenueForfaitaire: number;
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
  const { tauxSS, retenueForfaitaire } = acte;
  const baseSS = acte.baseSuitLeCout ? coutReel : acte.baseSS;

  // Etape 1 : la Securite sociale rembourse taux x base (la base est plafonnee au cout reel),
  // puis retient la participation forfaitaire ou la franchise.
  const ssAvantRetenue = Math.min(baseSS, coutReel) * (tauxSS / 100);
  const retenue = Math.min(retenueForfaitaire, ssAvantRetenue);
  const remboursementSS = Math.max(0, ssAvantRetenue - retenue);

  // Etape 2 : garantie "X % de la base", Securite sociale comprise. Le total (SS + mutuelle)
  // ne depasse ni X % de la base, ni le cout reel. La mutuelle part du remboursement SS
  // AVANT retenue : elle ne rembourse jamais la participation forfaitaire ni la franchise.
  const plafondTotal = baseSS * (POURCENTAGE_BR[niveauMutuelle] / 100);
  const totalMaxRemboursable = Math.min(plafondTotal, coutReel);
  const remboursementMutuelle = Math.max(0, totalMaxRemboursable - ssAvantRetenue);

  // Etape 3 : reste a charge
  const resteACharge = Math.max(0, coutReel - remboursementSS - remboursementMutuelle);

  // Pourcentage couvert
  const pourcentageCouvert = coutReel > 0
    ? Math.round(((remboursementSS + remboursementMutuelle) / coutReel) * 1000) / 10
    : 0;

  // Detail textuel
  let detail = `La Securite Sociale rembourse ${remboursementSS.toFixed(2)} € (${tauxSS}% de ${baseSS.toFixed(2)} €`;
  if (retenue > 0) {
    detail += ` - ${retenue.toFixed(2)} € de participation forfaitaire ou de franchise`;
  }
  detail += `). `;
  detail += `Votre mutuelle ${NIVEAU_LABELS[niveauMutuelle]} complete a hauteur de ${remboursementMutuelle.toFixed(2)} € (garantie : ${POURCENTAGE_BR[niveauMutuelle]}% de la BR, Securite sociale comprise). `;
  detail += `Reste a votre charge : ${resteACharge.toFixed(2)} €.`;

  return {
    coutReel,
    baseSS,
    remboursementSS: Math.round(remboursementSS * 100) / 100,
    tauxSS,
    remboursementMutuelle: Math.round(remboursementMutuelle * 100) / 100,
    retenueForfaitaire: Math.round(retenue * 100) / 100,
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
