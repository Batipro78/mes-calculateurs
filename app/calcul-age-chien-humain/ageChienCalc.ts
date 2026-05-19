export type TailleChien = "petit" | "moyen" | "grand" | "geant";

export interface TailleInfo {
  id: TailleChien;
  nom: string;
  poidsKg: string;
  exemples: string;
  ajoutAnnuel: number;
  esperanceVie: string;
  emoji: string;
}

export interface ResultatAgeChien {
  ageChien: number;
  taille: TailleChien;
  ageHumainAVMA: number;
  ageHumainWang: number;
  esperanceVie: string;
  proportionVie: number;
}

export const TAILLES_CHIEN: TailleInfo[] = [
  {
    id: "petit",
    nom: "Petit chien",
    poidsKg: "≤10 kg",
    exemples: "Chihuahua, Yorkshire, Bichon",
    ajoutAnnuel: 4,
    esperanceVie: "14-16 ans",
    emoji: "🐕",
  },
  {
    id: "moyen",
    nom: "Chien moyen",
    poidsKg: "10-25 kg",
    exemples: "Bulldog, Cocker, Beagle",
    ajoutAnnuel: 5,
    esperanceVie: "12-14 ans",
    emoji: "🐕",
  },
  {
    id: "grand",
    nom: "Grand chien",
    poidsKg: "25-45 kg",
    exemples: "Labrador, Berger Allemand",
    ajoutAnnuel: 6,
    esperanceVie: "10-12 ans",
    emoji: "🐕‍🦺",
  },
  {
    id: "geant",
    nom: "Chien géant",
    poidsKg: ">45 kg",
    exemples: "Saint-Bernard, Dogue, Mastiff",
    ajoutAnnuel: 7,
    esperanceVie: "8-10 ans",
    emoji: "🐕‍🦺",
  },
];

export function calculerAgeChien(ageChien: number, taille: TailleChien): ResultatAgeChien {
  // AVMA : 1ère année = 15, 2ème = +9 (24 total), puis +N/an selon taille
  const info = TAILLES_CHIEN.find((t) => t.id === taille)!;

  let ageHumain = 0;
  if (ageChien <= 0) {
    ageHumain = 0;
  } else if (ageChien <= 1) {
    ageHumain = 15 * ageChien;
  } else if (ageChien <= 2) {
    ageHumain = 15 + 9 * (ageChien - 1);
  } else {
    ageHumain = 24 + info.ajoutAnnuel * (ageChien - 2);
  }

  // Wang 2019 : 16 × ln(age) + 31
  const ageHumainWang = ageChien > 0 ? Math.round(16 * Math.log(ageChien) + 31) : 0;

  // Proportion vie écoulée selon taille
  const esperanceMoy: Record<TailleChien, number> = {
    petit: 15,
    moyen: 13,
    grand: 11,
    geant: 9,
  };
  const proportion = Math.min((ageChien / esperanceMoy[taille]) * 100, 100);

  return {
    ageChien,
    taille,
    ageHumainAVMA: Math.round(ageHumain),
    ageHumainWang,
    esperanceVie: info.esperanceVie,
    proportionVie: Math.round(proportion),
  };
}
