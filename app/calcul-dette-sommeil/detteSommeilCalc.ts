export type NiveauDette = "ideal" | "legere" | "moderee" | "severe";

export interface NuitDeSommeil {
  jour: number;
  heuresDormies: number;
}

export interface ResultatDetteSommeil {
  besoinIdeal: number;
  joursAnalyses: number;
  totalHeuresIdeal: number;
  totalHeuresDormies: number;
  detteHeures: number;
  moyenneNuit: number;
  niveau: NiveauDette;
  interpretation: string;
  conseils: string[];
}

export interface NiveauInfo {
  id: NiveauDette;
  label: string;
  description: string;
  couleur: string;
  emoji: string;
}

export const NIVEAUX_DETTE: NiveauInfo[] = [
  {
    id: "ideal",
    label: "Pas de dette",
    description: "Vous dormez suffisamment, continuez ainsi.",
    couleur: "green",
    emoji: "✅",
  },
  {
    id: "legere",
    label: "Dette légère",
    description: "Moins de 5 heures de dette. Récupérable en 1-2 jours.",
    couleur: "yellow",
    emoji: "😴",
  },
  {
    id: "moderee",
    label: "Dette modérée",
    description: "Entre 5 et 10 heures de dette. Effets cognitifs notables.",
    couleur: "orange",
    emoji: "😪",
  },
  {
    id: "severe",
    label: "Dette sévère",
    description: "Plus de 10 heures de dette. Risque pour la santé.",
    couleur: "red",
    emoji: "⚠️",
  },
];

const CONSEILS_LEGERE = [
  "Faites une sieste de 20 minutes en début d'après-midi (avant 15h).",
  "Couchez-vous 30 minutes plus tôt les 2 prochaines nuits.",
  "Évitez les écrans 1h avant le coucher pour récupérer plus vite.",
];

const CONSEILS_MODEREE = [
  "Ajoutez 1 à 2 heures de sommeil par nuit le week-end pour récupérer.",
  "Programmez des siestes courtes (20 minutes) plusieurs jours.",
  "Réduisez la caféine après 14h et l'alcool en soirée.",
  "Maintenez un horaire de coucher régulier pendant 7 à 10 jours.",
];

const CONSEILS_SEVERE = [
  "Consultez un médecin ou un spécialiste du sommeil : dette sévère = risque santé.",
  "Mettez en place une routine de coucher stricte pendant 2 semaines.",
  "Évitez de conduire en cas de somnolence : risque d'accident multiplié par 4.",
  "Limitez fortement les écrans, la caféine et l'alcool.",
  "Exposez-vous à la lumière du jour le matin pour resynchroniser l'horloge biologique.",
];

const CONSEILS_IDEAL = [
  "Conservez vos bonnes habitudes : couchers et levers à heures fixes.",
  "Maintenez une chambre fraîche (18-19°C) et sombre.",
  "Évitez les longues siestes (plus de 30 min) qui perturbent le sommeil nocturne.",
];

export function calculerDetteSommeil(
  besoinIdeal: number,
  heuresParNuit: number[],
): ResultatDetteSommeil {
  const joursAnalyses = heuresParNuit.length;
  const totalHeuresIdeal = besoinIdeal * joursAnalyses;
  const totalHeuresDormies = heuresParNuit.reduce((acc, h) => acc + (h || 0), 0);
  const detteHeures = Math.max(0, totalHeuresIdeal - totalHeuresDormies);
  const moyenneNuit = joursAnalyses > 0 ? totalHeuresDormies / joursAnalyses : 0;

  let niveau: NiveauDette;
  let interpretation: string;
  let conseils: string[];

  if (detteHeures <= 0) {
    niveau = "ideal";
    interpretation = `Excellent ! Vous dormez en moyenne ${moyenneNuit.toFixed(1)}h par nuit, en ligne avec votre besoin de ${besoinIdeal}h. Aucune dette accumulée.`;
    conseils = CONSEILS_IDEAL;
  } else if (detteHeures < 5) {
    niveau = "legere";
    interpretation = `Dette légère de ${detteHeures.toFixed(1)}h sur ${joursAnalyses} jours. Récupération possible rapidement avec quelques nuits prolongées ou une sieste.`;
    conseils = CONSEILS_LEGERE;
  } else if (detteHeures <= 10) {
    niveau = "moderee";
    interpretation = `Dette modérée de ${detteHeures.toFixed(1)}h. Vos performances cognitives, votre humeur et votre système immunitaire sont affectés. Une récupération progressive sur 1-2 semaines est nécessaire.`;
    conseils = CONSEILS_MODEREE;
  } else {
    niveau = "severe";
    interpretation = `Dette sévère de ${detteHeures.toFixed(1)}h. Risque élevé pour la santé : système immunitaire affaibli, troubles métaboliques, risque cardiovasculaire augmenté. Récupération longue (2-4 semaines minimum).`;
    conseils = CONSEILS_SEVERE;
  }

  return {
    besoinIdeal,
    joursAnalyses,
    totalHeuresIdeal,
    totalHeuresDormies: Math.round(totalHeuresDormies * 10) / 10,
    detteHeures: Math.round(detteHeures * 10) / 10,
    moyenneNuit: Math.round(moyenneNuit * 10) / 10,
    niveau,
    interpretation,
    conseils,
  };
}

export function getNiveauInfo(niveau: NiveauDette): NiveauInfo {
  return NIVEAUX_DETTE.find((n) => n.id === niveau) ?? NIVEAUX_DETTE[0];
}
