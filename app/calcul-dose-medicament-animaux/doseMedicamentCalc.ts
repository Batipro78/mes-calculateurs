export type Animal = "chien" | "chat";
export type Medicament =
  | "milbemax"
  | "drontal"
  | "frontline"
  | "bravecto"
  | "stronghold"
  | "profender";

export interface MedicamentInfo {
  id: Medicament;
  nom: string;
  marque: string;
  type: "vermifuge" | "anti-puces" | "anti-puces-tiques";
  spectre?: string;
  doseParKg?: number;
  formule?: string;
  amm: string;
}

export interface ResultatDose {
  medicament: string;
  marque: string;
  animal: string;
  poidsKg: number;
  dose: string;
  format: string;
  quantite: string;
  posologie: string;
  notes: string[];
  avertissements: string[];
}

export const MEDICAMENTS_CHIEN: MedicamentInfo[] = [
  {
    id: "milbemax",
    nom: "Milbemax (Milbémycine oxime)",
    marque: "Milbemax",
    type: "vermifuge",
    spectre: "Vers ronds & plats",
    doseParKg: 0.5,
    amm: "AMM FR — Prescription",
  },
  {
    id: "drontal",
    nom: "Drontal Plus (Fébantel + Pyrantel + Praziquantel)",
    marque: "Drontal Plus",
    type: "vermifuge",
    spectre: "Vers ronds & plats",
    amm: "AMM FR — Prescription",
  },
  {
    id: "frontline",
    nom: "Frontline (Fipronil)",
    marque: "Frontline",
    type: "anti-puces",
    spectre: "Puces & tiques",
    amm: "AMM FR — OTC",
  },
  {
    id: "bravecto",
    nom: "Bravecto (Fluralaner)",
    marque: "Bravecto",
    type: "anti-puces-tiques",
    spectre: "Puces, tiques & poux",
    amm: "AMM FR — Prescription",
  },
];

export const MEDICAMENTS_CHAT: MedicamentInfo[] = [
  {
    id: "milbemax",
    nom: "Milbemax Chat (Milbémycine oxime)",
    marque: "Milbemax Chat",
    type: "vermifuge",
    spectre: "Vers ronds & plats",
    doseParKg: 0.5,
    amm: "AMM FR — Prescription",
  },
  {
    id: "stronghold",
    nom: "Stronghold (Selamectine)",
    marque: "Stronghold",
    type: "anti-puces",
    spectre: "Puces, vers ronds & otodectes",
    doseParKg: 6,
    amm: "AMM FR — OTC",
  },
  {
    id: "profender",
    nom: "Profender Chat (Emodepsid + Praziquantel)",
    marque: "Profender",
    type: "vermifuge",
    spectre: "Vers ronds & plats",
    amm: "AMM FR — Prescription",
  },
];

export function calculerDose(
  animal: Animal,
  medicament: Medicament,
  poidsKg: number
): ResultatDose {
  if (poidsKg <= 0) {
    throw new Error("Le poids doit être positif");
  }

  const med =
    animal === "chien"
      ? MEDICAMENTS_CHIEN.find((m) => m.id === medicament)
      : MEDICAMENTS_CHAT.find((m) => m.id === medicament);

  if (!med) {
    throw new Error("Médicament non trouvé pour cet animal");
  }

  let resultat: ResultatDose;

  // ========== MILBEMAX CHIEN ==========
  if (medicament === "milbemax" && animal === "chien") {
    let dose = "";
    let quantite = "";
    let format = "Comprimé à jeun";

    if (poidsKg <= 5) {
      dose = "1 comprimé petit chien (2.5 mg)";
      quantite = "1 comprimé petit";
      format = "Comprimé petit chien (2.5 mg) — à jeun";
    } else if (poidsKg <= 25) {
      dose = "1 comprimé grand chien (12.5 mg)";
      quantite = "1 comprimé grand";
      format = "Comprimé grand chien (12.5 mg) — à jeun";
    } else if (poidsKg <= 50) {
      dose = "2 comprimés grand chien (25 mg total)";
      quantite = "2 comprimés grands";
      format = "2 comprimés grand chien (12.5 mg x2) — à jeun";
    } else {
      dose = `${Math.ceil(poidsKg / 25)} comprimés grand chien`;
      quantite = `${Math.ceil(poidsKg / 25)} comprimés`;
      format = `${Math.ceil(poidsKg / 25)} comprimés grand chien (12.5 mg x${Math.ceil(poidsKg / 25)}) — à jeun`;
    }

    resultat = {
      medicament: med.nom,
      marque: med.marque,
      animal: animal === "chien" ? "Chien" : "Chat",
      poidsKg,
      dose,
      format,
      quantite,
      posologie: "Dose unique — À renouveler tous les 3 mois",
      notes: [
        "Administrer de préférence à jeun ou avec un peu de nourriture.",
        "Efficace contre vers ronds et plats.",
        "À partir de 6 semaines d'âge.",
      ],
      avertissements: [
        "Ne pas utiliser chez les chiots < 6 semaines ou < 0.5 kg",
        "Races sensibles (Collie, Berger Australien) : tolérance démontrée mais toujours consulter le vétérinaire",
        "Contre-indiqué en cas de gestation",
      ],
    };
  }

  // ========== DRONTAL PLUS CHIEN ==========
  else if (medicament === "drontal" && animal === "chien") {
    const comprimés = Math.ceil(poidsKg / 10);
    resultat = {
      medicament: med.nom,
      marque: med.marque,
      animal: "Chien",
      poidsKg,
      dose: `${comprimés} comprimé(s) (1 par 10 kg)`,
      format: `${comprimés} comprimé(s) unique(s) — à jeun`,
      quantite: `${comprimés} comprimé(s)`,
      posologie: "Dose unique — À renouveler tous les 3 mois",
      notes: [
        "Administrer de préférence le matin à jeun.",
        "Triple action : vers ronds, plats et Giardia.",
      ],
      avertissements: [
        "Ne pas utiliser chez les chiots < 2 semaines",
        "Contre-indiqué en gestation avancée",
        "Peut causer légère diarrhée temporaire",
      ],
    };
  }

  // ========== FRONTLINE CHIEN ==========
  else if (medicament === "frontline" && animal === "chien") {
    let pipette = "";
    let ml = "";

    if (poidsKg < 2) {
      pipette = "Pipette XS (2-10 kg)";
      ml = "0.67 ml";
    } else if (poidsKg <= 10) {
      pipette = "Pipette S (2-10 kg)";
      ml = "0.67 ml";
    } else if (poidsKg <= 20) {
      pipette = "Pipette M (10-20 kg)";
      ml = "1.34 ml";
    } else if (poidsKg <= 40) {
      pipette = "Pipette L (20-40 kg)";
      ml = "2.68 ml";
    } else {
      pipette = "Pipette XL (40-60 kg)";
      ml = "4.02 ml";
    }

    resultat = {
      medicament: med.nom,
      marque: med.marque,
      animal: "Chien",
      poidsKg,
      dose: pipette,
      format: `Spot-on (pipette) — ${ml}`,
      quantite: ml,
      posologie:
        "Dose unique — À renouveler tous les mois (ou tous les 3 mois selon formule)",
      notes: [
        "Appliquer sur la peau, à la base du crâne, où le chien ne peut pas se lécher.",
        "Éfficace contre puces et tiques.",
        "Effet dans les 24-48h.",
      ],
      avertissements: [
        "Ne pas baigner le chien 48h avant et après l'application",
        "Toxique si ingéré — appliquer dans un endroit inaccessible",
        "Consulter vétérinaire si allergie cutanée",
      ],
    };
  }

  // ========== BRAVECTO CHIEN ==========
  else if (medicament === "bravecto" && animal === "chien") {
    let dose_mg = "";
    let pipette = "";
    let format_details = "";

    if (poidsKg < 2) {
      throw new Error("Bravecto non recommandé < 2 kg");
    } else if (poidsKg <= 4.5) {
      dose_mg = "112.5 mg";
      pipette = "Bravecto petit chien (2-4.5 kg)";
      format_details = "Comprimé spot-on 112.5 mg";
    } else if (poidsKg <= 10) {
      dose_mg = "250 mg";
      pipette = "Bravecto petit-moyen (4.5-10 kg)";
      format_details = "Comprimé ou spot-on 250 mg";
    } else if (poidsKg <= 20) {
      dose_mg = "500 mg";
      pipette = "Bravecto moyen (10-20 kg)";
      format_details = "Comprimé ou spot-on 500 mg";
    } else if (poidsKg <= 40) {
      dose_mg = "1000 mg";
      pipette = "Bravecto grand (20-40 kg)";
      format_details = "Comprimé ou spot-on 1000 mg";
    } else if (poidsKg <= 56) {
      dose_mg = "1400 mg";
      pipette = "Bravecto très grand (40-56 kg)";
      format_details = "Comprimé ou spot-on 1400 mg";
    } else {
      throw new Error("Bravecto max 56 kg — consulter vétérinaire pour > 56 kg");
    }

    resultat = {
      medicament: med.nom,
      marque: med.marque,
      animal: "Chien",
      poidsKg,
      dose: `${dose_mg} (${pipette})`,
      format: format_details,
      quantite: dose_mg,
      posologie: "Dose unique — Protection 3 mois (12 semaines)",
      notes: [
        "Disponible en comprimé (à jeun) ou spot-on.",
        "Efficace contre puces, tiques, et poux.",
        "Effet rapide : tiques tuées en 12-24h.",
      ],
      avertissements: [
        "Prescription vétérinaire requise en France",
        "Ne pas utiliser < 8 semaines ou < 2 kg",
        "Peut causer tremblements / sédation (rare) — contacter vét",
        "Contre-indiqué en gestation",
      ],
    };
  }

  // ========== MILBEMAX CHAT ==========
  else if (medicament === "milbemax" && animal === "chat") {
    let dose = "";
    let format_text = "";

    if (poidsKg <= 2) {
      dose = "1 comprimé chaton (2.5 mg)";
      format_text = "Comprimé chaton (2.5 mg) — à jeun";
    } else if (poidsKg <= 8) {
      dose = "1 comprimé chat adulte (12.5 mg)";
      format_text = "Comprimé adulte (12.5 mg) — à jeun";
    } else {
      dose = `${Math.ceil(poidsKg / 8)} comprimé(s) adulte`;
      format_text = `${Math.ceil(poidsKg / 8)} comprimé(s) adulte (12.5 mg x${Math.ceil(poidsKg / 8)}) — à jeun`;
    }

    resultat = {
      medicament: med.nom,
      marque: med.marque,
      animal: "Chat",
      poidsKg,
      dose,
      format: format_text,
      quantite: dose,
      posologie: "Dose unique — À renouveler tous les 3 mois",
      notes: [
        "Administrer de préférence à jeun.",
        "Efficace contre vers ronds et plats.",
        "À partir de 2 semaines d'âge (chatons).",
      ],
      avertissements: [
        "Ne pas utiliser chez chatons < 2 semaines",
        "Contre-indiqué en gestation",
        "Chiots sensibles à l'ivermectine : ce produit sans danger",
      ],
    };
  }

  // ========== STRONGHOLD CHAT ==========
  else if (medicament === "stronghold" && animal === "chat") {
    let pipette = "";
    let ml = "";

    if (poidsKg < 2.6) {
      pipette = "Pipette S (< 2.6 kg)";
      ml = "0.25 ml";
    } else if (poidsKg <= 7.5) {
      pipette = "Pipette M (2.6-7.5 kg)";
      ml = "0.5 ml";
    } else if (poidsKg <= 10) {
      pipette = "Pipette L (7.6-10 kg)";
      ml = "0.75 ml";
    } else {
      throw new Error("Stronghold max 10 kg pour chat");
    }

    resultat = {
      medicament: med.nom,
      marque: med.marque,
      animal: "Chat",
      poidsKg,
      dose: pipette,
      format: `Spot-on (pipette) — ${ml}`,
      quantite: ml,
      posologie: "Dose unique — À renouveler tous les mois",
      notes: [
        "Appliquer sur la peau à la base du crâne.",
        "Efficace contre puces, vers ronds et otodectes (gale auriculaire).",
        "Effet en 24h contre les puces.",
      ],
      avertissements: [
        "Ne pas baigner le chat 2h avant et 2h après",
        "Toxique en ingestion — appliquer où chat ne peut pas se lécher",
        "Peut causer sédation temporaire",
        "Contre-indiqué chez chatons < 6 semaines",
      ],
    };
  }

  // ========== PROFENDER CHAT ==========
  else if (medicament === "profender" && animal === "chat") {
    let pipette = "";
    let ml = "";

    if (poidsKg <= 2.5) {
      pipette = "Pipette S (0.5-2.5 kg)";
      ml = "0.5 ml";
    } else if (poidsKg <= 5) {
      pipette = "Pipette M (2.5-5 kg)";
      ml = "1 ml";
    } else if (poidsKg <= 8) {
      pipette = "Pipette L (5-8 kg)";
      ml = "1.5 ml";
    } else {
      throw new Error("Profender max 8 kg pour chat");
    }

    resultat = {
      medicament: med.nom,
      marque: med.marque,
      animal: "Chat",
      poidsKg,
      dose: pipette,
      format: `Spot-on (pipette) — ${ml}`,
      quantite: ml,
      posologie: "Dose unique — À renouveler tous les 3 mois",
      notes: [
        "Appliquer sur la peau à la base du crâne.",
        "Efficace contre vers ronds et plats.",
        "Rapidement absorbé (2h).",
      ],
      avertissements: [
        "Prescription requise en France",
        "Ne pas baigner 2h avant et 2h après",
        "Contre-indiqué chez chatons < 8 semaines",
        "Ne pas utiliser en co-infection feline",
      ],
    };
  }

  // Fallback error
  else {
    throw new Error(
      `Combinaison animal/médicament non gérée : ${animal} + ${medicament}`
    );
  }

  return resultat;
}
