// Helper pour calcul FTP (Functional Threshold Power) cyclisme, W/kg et VAM

export type Sexe = "homme" | "femme";

export interface ResultatFTP {
  ftp: number; // watts
  wattsParKilo: number;
  niveau: string;
  niveauCouleur: string; // class Tailwind (bg-xxx)
}

export interface ResultatVAM {
  vam: number; // m/h
  niveau: string;
  niveauCouleur: string;
}

// FTP = puissance moyenne 20min × 0.95
export function calculerFTP(
  puissanceMoyenne20min: number,
  poidsKg: number,
  sexe: Sexe
): ResultatFTP {
  if (puissanceMoyenne20min <= 0 || poidsKg <= 0) {
    return {
      ftp: 0,
      wattsParKilo: 0,
      niveau: "—",
      niveauCouleur: "bg-slate-200",
    };
  }

  const ftp = Math.round(puissanceMoyenne20min * 0.95);
  const wpk = ftp / poidsKg;

  // Tableau W/kg selon sexe (homme: +0.7 W/kg vs femme)
  const niveaux =
    sexe === "homme"
      ? [
          { min: 0, max: 2.5, label: "Loisir / Débutant", couleur: "bg-blue-100" },
          {
            min: 2.5,
            max: 3.0,
            label: "Catégorie 5 (Pass'Cyclisme D2)",
            couleur: "bg-cyan-100",
          },
          {
            min: 3.0,
            max: 3.5,
            label: "Catégorie 4 (Pass'Cyclisme D1)",
            couleur: "bg-teal-100",
          },
          {
            min: 3.5,
            max: 4.0,
            label: "Catégorie 3 (FFC)",
            couleur: "bg-green-100",
          },
          {
            min: 4.0,
            max: 4.5,
            label: "Catégorie 2 (FFC)",
            couleur: "bg-emerald-100",
          },
          {
            min: 4.5,
            max: 5.0,
            label: "Catégorie 1 (FFC)",
            couleur: "bg-lime-100",
          },
          {
            min: 5.0,
            max: 5.5,
            label: "Élite / Amateur très avancé",
            couleur: "bg-yellow-100",
          },
          {
            min: 5.5,
            max: 6.2,
            label: "Pro Continental",
            couleur: "bg-orange-100",
          },
          {
            min: 6.2,
            max: 10,
            label: "Pro World Tour",
            couleur: "bg-red-100",
          },
        ]
      : [
          {
            min: 0,
            max: 1.8,
            label: "Loisir / Débutant",
            couleur: "bg-blue-100",
          },
          {
            min: 1.8,
            max: 2.3,
            label: "Catégorie 5 (Pass'Cyclisme D2)",
            couleur: "bg-cyan-100",
          },
          {
            min: 2.3,
            max: 2.8,
            label: "Catégorie 4 (Pass'Cyclisme D1)",
            couleur: "bg-teal-100",
          },
          {
            min: 2.8,
            max: 3.3,
            label: "Catégorie 3 (FFC)",
            couleur: "bg-green-100",
          },
          {
            min: 3.3,
            max: 3.8,
            label: "Catégorie 2 (FFC)",
            couleur: "bg-emerald-100",
          },
          {
            min: 3.8,
            max: 4.3,
            label: "Catégorie 1 (FFC)",
            couleur: "bg-lime-100",
          },
          {
            min: 4.3,
            max: 4.8,
            label: "Élite / Pro Continental",
            couleur: "bg-yellow-100",
          },
          {
            min: 4.8,
            max: 5.5,
            label: "Pro World Tour",
            couleur: "bg-red-100",
          },
        ];

  const niveau = niveaux.find((n) => wpk >= n.min && wpk < n.max);

  return {
    ftp,
    wattsParKilo: Math.round(wpk * 100) / 100,
    niveau: niveau?.label || "—",
    niveauCouleur: niveau?.couleur || "bg-slate-200",
  };
}

// VAM = (dénivelé mètres × 60) / temps minutes (résultat en m/h)
export function calculerVAM(
  deniveleMetres: number,
  tempsMinutes: number
): ResultatVAM {
  if (deniveleMetres <= 0 || tempsMinutes <= 0) {
    return {
      vam: 0,
      niveau: "—",
      niveauCouleur: "bg-slate-200",
    };
  }

  const vam = (deniveleMetres * 60) / tempsMinutes;

  const niveaux = [
    { min: 0, max: 800, label: "Cyclotouriste", couleur: "bg-blue-100" },
    {
      min: 800,
      max: 1000,
      label: "Amateur entraîné",
      couleur: "bg-cyan-100",
    },
    {
      min: 1000,
      max: 1200,
      label: "Pass'Cyclisme avancé",
      couleur: "bg-teal-100",
    },
    {
      min: 1200,
      max: 1400,
      label: "Cat 2-3 FFC",
      couleur: "bg-green-100",
    },
    {
      min: 1400,
      max: 1600,
      label: "Cat 1-Élite",
      couleur: "bg-emerald-100",
    },
    { min: 1600, max: 1800, label: "Pro", couleur: "bg-orange-100" },
    {
      min: 1800,
      max: 10000,
      label: "Pro World Tour en col HC",
      couleur: "bg-red-100",
    },
  ];

  const niveau = niveaux.find((n) => vam >= n.min && vam < n.max);

  return {
    vam: Math.round(vam),
    niveau: niveau?.label || "—",
    niveauCouleur: niveau?.couleur || "bg-slate-200",
  };
}

// Formatter nombre français
export function fmt(n: number, digits = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}
