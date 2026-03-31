// Couts mensuels moyens France 2026 (en euros)

export type Zone = "paris" | "grande-ville" | "ville-moyenne" | "rural";
export type Situation = "seul" | "couple" | "famille";
export type Transport = "transport-commun" | "voiture" | "velo-marche";

export const ZONE_LABELS: Record<Zone, string> = {
  "paris": "Paris / Ile-de-France",
  "grande-ville": "Grande ville (Lyon, Marseille, Bordeaux...)",
  "ville-moyenne": "Ville moyenne (Reims, Dijon, Tours...)",
  "rural": "Zone rurale",
};

export const SITUATION_LABELS: Record<Situation, string> = {
  "seul": "Seul(e)",
  "couple": "En couple",
  "famille": "Famille (couple + enfants)",
};

export const TRANSPORT_LABELS: Record<Transport, string> = {
  "transport-commun": "Transports en commun",
  "voiture": "Voiture",
  "velo-marche": "Velo / marche",
};

// Loyers mensuels par zone et situation
const LOYERS: Record<Zone, Record<Situation, number>> = {
  "paris": { "seul": 1050, "couple": 1350, "famille": 1700 },
  "grande-ville": { "seul": 650, "couple": 850, "famille": 1100 },
  "ville-moyenne": { "seul": 480, "couple": 620, "famille": 800 },
  "rural": { "seul": 380, "couple": 480, "famille": 620 },
};

// Alimentation par situation (nb adultes + enfants)
const ALIMENTATION: Record<Situation, number> = {
  "seul": 250,
  "couple": 400,
  "famille": 650,
};

// Bonus alimentation Paris (+20%)
const BONUS_ALIM_PARIS = 1.20;

// Transport mensuel
const TRANSPORTS: Record<Zone, Record<Transport, number>> = {
  "paris": { "transport-commun": 91, "voiture": 300, "velo-marche": 15 },
  "grande-ville": { "transport-commun": 65, "voiture": 250, "velo-marche": 10 },
  "ville-moyenne": { "transport-commun": 45, "voiture": 220, "velo-marche": 10 },
  "rural": { "transport-commun": 0, "voiture": 200, "velo-marche": 5 },
};

// Electricite + gaz + eau
const ENERGIE: Record<Situation, number> = {
  "seul": 85,
  "couple": 110,
  "famille": 158,
};

// Telephone + internet
const TELECOM: Record<Situation, number> = {
  "seul": 35,
  "couple": 50,
  "famille": 55,
};

// Mutuelle sante
const MUTUELLE: Record<Situation, number> = {
  "seul": 45, // minimum jeune / CSS si eligible
  "couple": 90,
  "famille": 130,
};

// Assurance habitation
const ASSURANCE_HABITATION: Record<Zone, number> = {
  "paris": 20,
  "grande-ville": 17,
  "ville-moyenne": 14,
  "rural": 12,
};

// Hygiene, vetements, produits menagers
const HYGIENE: Record<Situation, number> = {
  "seul": 50,
  "couple": 80,
  "famille": 120,
};

// Imprevus / divers
const IMPREVUS: Record<Situation, number> = {
  "seul": 80,
  "couple": 120,
  "famille": 180,
};

// References 2026
export const RSA_SEUL = 646.52;
export const RSA_COUPLE = 969.78;
export const RSA_COUPLE_1_ENFANT = 1163.74;
export const RSA_COUPLE_2_ENFANTS = 1357.69;
export const SMIC_NET = 1443.11;
export const SMIC_BRUT = 1823.03;
export const SEUIL_PAUVRETE = 1288;

export interface PosteBudget {
  label: string;
  montant: number;
  couleur: string;
  icone: string;
}

export interface ResultatBudget {
  postes: PosteBudget[];
  total: number;
  vsRSA: number;
  vsSMIC: number;
  vsSeuilPauvrete: number;
  zone: Zone;
  situation: Situation;
  transport: Transport;
}

export function calcBudgetSurvie(
  zone: Zone,
  situation: Situation,
  transport: Transport,
  enfants: number = 2,
): ResultatBudget {
  const loyer = LOYERS[zone][situation];
  let alimentation = ALIMENTATION[situation];
  if (zone === "paris") alimentation = Math.round(alimentation * BONUS_ALIM_PARIS);
  // Ajustement enfants pour famille
  if (situation === "famille" && enfants > 2) {
    alimentation += (enfants - 2) * 100;
  }
  const transportMontant = TRANSPORTS[zone][transport];
  const energie = ENERGIE[situation];
  const telecom = TELECOM[situation];
  const mutuelle = MUTUELLE[situation];
  const assuranceHab = ASSURANCE_HABITATION[zone];
  const hygiene = HYGIENE[situation];
  const imprevus = IMPREVUS[situation];

  // Assurance voiture si applicable
  const assuranceAuto = transport === "voiture" ? 53 : 0; // tiers basique ~640€/an

  const postes: PosteBudget[] = [
    { label: "Logement (loyer + charges)", montant: loyer, couleur: "bg-blue-500", icone: "🏠" },
    { label: "Alimentation", montant: alimentation, couleur: "bg-green-500", icone: "🛒" },
    { label: "Transport", montant: transportMontant, couleur: "bg-amber-500", icone: "🚌" },
    { label: "Energie (elec/gaz/eau)", montant: energie, couleur: "bg-yellow-500", icone: "⚡" },
    { label: "Telephone + internet", montant: telecom, couleur: "bg-cyan-500", icone: "📱" },
    { label: "Mutuelle sante", montant: mutuelle, couleur: "bg-rose-500", icone: "🏥" },
    { label: "Assurance habitation", montant: assuranceHab, couleur: "bg-indigo-500", icone: "🛡️" },
    { label: "Hygiene / vetements", montant: hygiene, couleur: "bg-purple-500", icone: "👕" },
    { label: "Imprevus / divers", montant: imprevus, couleur: "bg-slate-500", icone: "📦" },
  ];

  if (assuranceAuto > 0) {
    postes.push({ label: "Assurance auto", montant: assuranceAuto, couleur: "bg-orange-500", icone: "🚗" });
  }

  const total = postes.reduce((sum, p) => sum + p.montant, 0);

  const rsaRef = situation === "seul" ? RSA_SEUL : situation === "couple" ? RSA_COUPLE : RSA_COUPLE_2_ENFANTS;

  return {
    postes,
    total,
    vsRSA: total - rsaRef,
    vsSMIC: total - SMIC_NET,
    vsSeuilPauvrete: total - SEUIL_PAUVRETE,
    zone,
    situation,
    transport,
  };
}
