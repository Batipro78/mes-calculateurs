// Calcul indice inflammation alimentaire (Dietary Inflammatory Index DII simplifie)
// Source : Shivappa et al. 2014 + recherche University of South Carolina

export interface AlimentScore {
  id: string;
  nom: string;
  score: number; // positif = pro-inflammatoire, negatif = anti-inflammatoire
  categorie: "pro" | "anti" | "neutre";
}

// Frequence de consommation : jamais = 0, rare = 0.25, parfois = 0.5, souvent = 0.75, tres souvent = 1
export type Frequence = 0 | 0.25 | 0.5 | 0.75 | 1;

export const ALIMENTS: AlimentScore[] = [
  // Pro-inflammatoires (score positif)
  { id: "sucre", nom: "Sucre raffine, bonbons, sodas", score: 1.2, categorie: "pro" },
  { id: "viande-rouge", nom: "Viande rouge (boeuf, agneau)", score: 0.9, categorie: "pro" },
  { id: "charcuterie", nom: "Charcuterie (saucisson, jambon industriel)", score: 1.4, categorie: "pro" },
  { id: "fritures", nom: "Fritures et aliments frits", score: 1.3, categorie: "pro" },
  { id: "plats-prepares", nom: "Plats prepares / fast-food", score: 1.1, categorie: "pro" },
  { id: "alcool", nom: "Alcool (au-dela de 1 verre/jour)", score: 0.8, categorie: "pro" },
  { id: "graisses-trans", nom: "Margarines, graisses trans", score: 1.0, categorie: "pro" },
  { id: "pain-blanc", nom: "Pain blanc, pates raffinees, riz blanc", score: 0.6, categorie: "pro" },

  // Anti-inflammatoires (score negatif)
  { id: "poisson-gras", nom: "Poissons gras (saumon, sardine, maquereau)", score: -0.9, categorie: "anti" },
  { id: "legumes-verts", nom: "Legumes verts (epinards, brocolis, kale)", score: -0.7, categorie: "anti" },
  { id: "fruits-rouges", nom: "Fruits rouges (myrtilles, framboises, grenades)", score: -0.8, categorie: "anti" },
  { id: "noix", nom: "Noix, amandes, graines de chia/lin", score: -0.6, categorie: "anti" },
  { id: "huile-olive", nom: "Huile d'olive extra vierge", score: -0.7, categorie: "anti" },
  { id: "curcuma", nom: "Curcuma, gingembre", score: -0.5, categorie: "anti" },
  { id: "the-vert", nom: "The vert, the matcha", score: -0.6, categorie: "anti" },
  { id: "legumineuses", nom: "Legumineuses (lentilles, pois chiches)", score: -0.5, categorie: "anti" },
  { id: "ail-oignon", nom: "Ail, oignon", score: -0.4, categorie: "anti" },
  { id: "chocolat-noir", nom: "Chocolat noir 70%+", score: -0.4, categorie: "anti" },
];

export interface ParamsInflammation {
  frequences: Record<string, Frequence>; // id aliment -> frequence 0-1
}

export interface ResultatInflammation {
  scoreTotal: number; // -10 a +10
  categorie: "tres-anti" | "anti" | "neutre" | "pro" | "tres-pro";
  label: string;
  description: string;
  recommandations: string[];
}

export function calculerInflammation(p: ParamsInflammation): ResultatInflammation {
  let scoreTotal = 0;
  for (const aliment of ALIMENTS) {
    const freq = p.frequences[aliment.id] ?? 0;
    scoreTotal += aliment.score * freq;
  }

  // Normaliser entre -10 et +10
  scoreTotal = Math.max(-10, Math.min(10, scoreTotal * 2));

  let categorie: ResultatInflammation["categorie"];
  let label: string;
  let description: string;
  let recommandations: string[];

  if (scoreTotal < -4) {
    categorie = "tres-anti";
    label = "Alimentation tres anti-inflammatoire";
    description = "Votre alimentation favorise fortement la reduction de l'inflammation chronique. Continuez !";
    recommandations = ["Maintenez cette alimentation", "Variez les sources de legumes et fruits", "Surveillez votre apport en proteines"];
  } else if (scoreTotal < -1) {
    categorie = "anti";
    label = "Alimentation anti-inflammatoire";
    description = "Votre alimentation est globalement saine avec un effet anti-inflammatoire positif.";
    recommandations = ["Ajoutez plus de poissons gras", "Consommez quotidiennement des legumes verts", "Reduisez encore les sucres raffines"];
  } else if (scoreTotal < 1) {
    categorie = "neutre";
    label = "Alimentation neutre";
    description = "Votre alimentation est equilibree entre aliments pro et anti-inflammatoires, sans impact marque.";
    recommandations = ["Augmentez la consommation de legumes (5/jour)", "Privilegiez le poisson 2-3x/semaine", "Reduisez la charcuterie et les sucres"];
  } else if (scoreTotal < 4) {
    categorie = "pro";
    label = "Alimentation pro-inflammatoire";
    description = "Votre alimentation favorise l'inflammation chronique. A long terme, cela peut augmenter le risque de maladies cardiovasculaires, diabete et certaines maladies auto-immunes.";
    recommandations = ["Reduisez charcuterie et viande rouge (max 2x/semaine)", "Remplacez les sodas par de l'eau/the", "Cuisinez plus a la maison, limitez les plats prepares", "Introduisez au moins 1 repas avec du poisson gras/semaine"];
  } else {
    categorie = "tres-pro";
    label = "Alimentation tres pro-inflammatoire";
    description = "Votre alimentation contribue significativement a l'inflammation chronique. Des changements sont recommandes.";
    recommandations = ["Consultez un nutritionniste", "Diminuez drastiquement sucres, charcuterie et fritures", "Introduisez 2 portions de legumes a chaque repas", "Privilegiez huile d'olive et noix au lieu de beurre et margarine", "Supprimez progressivement les sodas et fast-food"];
  }

  return { scoreTotal, categorie, label, description, recommandations };
}
