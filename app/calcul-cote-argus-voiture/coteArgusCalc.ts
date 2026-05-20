export type EtatVoiture = "excellent" | "bon" | "moyen" | "mauvais";
export type Carburant = "essence" | "diesel" | "hybride" | "electrique";

export interface EtatInfo {
  id: EtatVoiture;
  nom: string;
  multiplicateur: number;
  description: string;
  emoji: string;
}

export interface CarburantInfo {
  id: Carburant;
  nom: string;
  multiplicateur: number;
  description: string;
  emoji: string;
}

export interface ResultatCote {
  prixNeuf: number;
  anneeAchat: number;
  ageVoiture: number;
  kilometrage: number;
  etat: EtatVoiture;
  carburant: Carburant;
  valeurApresDecoteAge: number;
  multEtat: number;
  multCarburant: number;
  multKm: number;
  estimationFinale: number;
  decotePourcent: number;
  kilometrageMoyen: number;
  kilometrageNormal: boolean;
  detailDecote: { annee: number; decoteAn: number; valeurFinAnnee: number }[];
}

export const ETATS: EtatInfo[] = [
  {
    id: "excellent",
    nom: "Excellent",
    multiplicateur: 1.1,
    description: "Comme neuve : aucune rayure, intérieur impeccable, entretien suivi à jour",
    emoji: "✨",
  },
  {
    id: "bon",
    nom: "Bon",
    multiplicateur: 1.0,
    description: "État normal : petites traces d'usage, entretien régulier, fonctionnement parfait",
    emoji: "👍",
  },
  {
    id: "moyen",
    nom: "Moyen",
    multiplicateur: 0.88,
    description: "Quelques défauts esthétiques, petits éléments à reprendre, mécanique OK",
    emoji: "🟠",
  },
  {
    id: "mauvais",
    nom: "Mauvais",
    multiplicateur: 0.72,
    description: "Carrosserie abîmée, mécanique fatiguée, entretien irrégulier",
    emoji: "🔴",
  },
];

export const CARBURANTS: CarburantInfo[] = [
  { id: "essence", nom: "Essence", multiplicateur: 1.0, description: "Carburant standard, valeur de référence", emoji: "⛽" },
  { id: "diesel", nom: "Diesel", multiplicateur: 0.92, description: "Décote accélérée (ZFE, restrictions urbaines)", emoji: "🛢️" },
  { id: "hybride", nom: "Hybride", multiplicateur: 1.05, description: "Demande soutenue, légère prime à la revente", emoji: "🔋" },
  { id: "electrique", nom: "Électrique", multiplicateur: 0.95, description: "Forte décote initiale (technologie batterie évolutive)", emoji: "🔌" },
];

const KM_MOYEN_PAR_AN = 15000;

export function calculerCoteArgus(
  prixNeuf: number,
  anneeAchat: number,
  kilometrage: number,
  etat: EtatVoiture,
  carburant: Carburant,
  anneeActuelle: number = 2026
): ResultatCote {
  const ageVoiture = Math.max(0, anneeActuelle - anneeAchat);

  // Décote selon l'âge (1er an -25%, ans 2-5 -15%/an, 6+ -10%/an, plafonné à 90% de décote)
  let valeurCourante = prixNeuf;
  const detailDecote: { annee: number; decoteAn: number; valeurFinAnnee: number }[] = [];

  for (let an = 1; an <= ageVoiture; an++) {
    let tauxDecote = 0;
    if (an === 1) tauxDecote = 0.25;
    else if (an <= 5) tauxDecote = 0.15;
    else tauxDecote = 0.1;

    const decoteEuros = valeurCourante * tauxDecote;
    valeurCourante = valeurCourante - decoteEuros;
    detailDecote.push({
      annee: an,
      decoteAn: Math.round(tauxDecote * 100),
      valeurFinAnnee: Math.round(valeurCourante),
    });
  }

  // Plafond : pas moins de 10% du prix neuf
  const plancher = prixNeuf * 0.1;
  if (valeurCourante < plancher) valeurCourante = plancher;
  const valeurApresDecoteAge = valeurCourante;

  // Multiplicateur état
  const etatInfo = ETATS.find((e) => e.id === etat)!;
  const multEtat = etatInfo.multiplicateur;

  // Multiplicateur carburant
  const carburantInfo = CARBURANTS.find((c) => c.id === carburant)!;
  const multCarburant = carburantInfo.multiplicateur;

  // Multiplicateur kilométrage (référence : ageVoiture * 15000)
  const kilometrageMoyen = ageVoiture * KM_MOYEN_PAR_AN;
  let multKm = 1.0;
  if (ageVoiture > 0 && kilometrage > 0) {
    const ratio = kilometrage / kilometrageMoyen;
    // Plus de km que la moyenne = valeur plus basse
    // -3% par tranche de 10% au-dessus, +2% par tranche de 10% en-dessous, bornes 0.7 - 1.15
    if (ratio > 1) {
      multKm = 1 - Math.min((ratio - 1) * 0.3, 0.3);
    } else {
      multKm = 1 + Math.min((1 - ratio) * 0.2, 0.15);
    }
    multKm = Math.max(0.7, Math.min(1.15, multKm));
  }
  const kilometrageNormal = Math.abs(kilometrage - kilometrageMoyen) / Math.max(1, kilometrageMoyen) < 0.15;

  const estimationFinale = Math.round(valeurApresDecoteAge * multEtat * multCarburant * multKm);
  const decotePourcent = prixNeuf > 0 ? Math.round((1 - estimationFinale / prixNeuf) * 100) : 0;

  return {
    prixNeuf,
    anneeAchat,
    ageVoiture,
    kilometrage,
    etat,
    carburant,
    valeurApresDecoteAge: Math.round(valeurApresDecoteAge),
    multEtat,
    multCarburant,
    multKm: Math.round(multKm * 100) / 100,
    estimationFinale: Math.max(0, estimationFinale),
    decotePourcent,
    kilometrageMoyen,
    kilometrageNormal,
    detailDecote,
  };
}
