export type CategorieAliment =
  | "fruit"
  | "legume"
  | "feculent"
  | "sucre"
  | "produit-laitier"
  | "boisson"
  | "cereale";

export interface Aliment {
  nom: string;
  slug: string;
  ig: number;
  glucidesPar100g: number;
  portion: number; // en grammes (ou ml)
  categorie: CategorieAliment;
  emoji: string;
}

export interface ResultatCG {
  chargeGlycemique: number;
  categorieCG: "faible" | "moyenne" | "elevee";
  categorieIG: "bas" | "moyen" | "eleve";
}

export function calcChargeGlycemique(
  ig: number,
  glucidesParPortion: number
): ResultatCG {
  const chargeGlycemique = (ig * glucidesParPortion) / 100;

  const categorieCG: ResultatCG["categorieCG"] =
    chargeGlycemique <= 10 ? "faible" : chargeGlycemique <= 19 ? "moyenne" : "elevee";

  const categorieIG: ResultatCG["categorieIG"] =
    ig <= 55 ? "bas" : ig <= 69 ? "moyen" : "eleve";

  return {
    chargeGlycemique: Math.round(chargeGlycemique * 10) / 10,
    categorieCG,
    categorieIG,
  };
}

function slugify(nom: string): string {
  return nom
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const ALIMENTS_RAW: Omit<Aliment, "slug">[] = [
  // Feculents
  { nom: "Pain blanc", ig: 75, glucidesPar100g: 49, portion: 60, categorie: "feculent", emoji: "🍞" },
  { nom: "Pain complet", ig: 51, glucidesPar100g: 41, portion: 60, categorie: "feculent", emoji: "🍞" },
  { nom: "Baguette", ig: 95, glucidesPar100g: 55, portion: 60, categorie: "feculent", emoji: "🥖" },
  { nom: "Riz blanc", ig: 73, glucidesPar100g: 28, portion: 150, categorie: "feculent", emoji: "🍚" },
  { nom: "Riz basmati", ig: 58, glucidesPar100g: 26, portion: 150, categorie: "feculent", emoji: "🍚" },
  { nom: "Riz complet", ig: 50, glucidesPar100g: 23, portion: 150, categorie: "feculent", emoji: "🍚" },
  { nom: "Pates blanches cuites", ig: 49, glucidesPar100g: 25, portion: 180, categorie: "feculent", emoji: "🍝" },
  { nom: "Pates completes cuites", ig: 42, glucidesPar100g: 23, portion: 180, categorie: "feculent", emoji: "🍝" },
  { nom: "Pomme de terre (cuite a l'eau)", ig: 78, glucidesPar100g: 17, portion: 150, categorie: "feculent", emoji: "🥔" },
  { nom: "Patate douce", ig: 61, glucidesPar100g: 20, portion: 150, categorie: "feculent", emoji: "🍠" },
  { nom: "Quinoa cuit", ig: 53, glucidesPar100g: 22, portion: 150, categorie: "feculent", emoji: "🌾" },

  // Legumes / Legumineuses
  { nom: "Lentilles", ig: 32, glucidesPar100g: 20, portion: 150, categorie: "legume", emoji: "🫘" },
  { nom: "Pois chiches", ig: 33, glucidesPar100g: 27, portion: 150, categorie: "legume", emoji: "🫘" },
  { nom: "Haricots rouges", ig: 24, glucidesPar100g: 21, portion: 150, categorie: "legume", emoji: "🫘" },
  { nom: "Petits pois", ig: 51, glucidesPar100g: 9, portion: 100, categorie: "legume", emoji: "🟢" },
  { nom: "Carotte", ig: 47, glucidesPar100g: 8, portion: 100, categorie: "legume", emoji: "🥕" },
  { nom: "Brocoli", ig: 15, glucidesPar100g: 4, portion: 150, categorie: "legume", emoji: "🥦" },

  // Fruits
  { nom: "Pomme", ig: 36, glucidesPar100g: 14, portion: 150, categorie: "fruit", emoji: "🍎" },
  { nom: "Banane", ig: 51, glucidesPar100g: 23, portion: 120, categorie: "fruit", emoji: "🍌" },
  { nom: "Banane mure", ig: 62, glucidesPar100g: 25, portion: 120, categorie: "fruit", emoji: "🍌" },
  { nom: "Orange", ig: 43, glucidesPar100g: 11, portion: 150, categorie: "fruit", emoji: "🍊" },
  { nom: "Mangue", ig: 55, glucidesPar100g: 15, portion: 150, categorie: "fruit", emoji: "🥭" },
  { nom: "Raisin", ig: 59, glucidesPar100g: 18, portion: 100, categorie: "fruit", emoji: "🍇" },
  { nom: "Fraise", ig: 40, glucidesPar100g: 8, portion: 150, categorie: "fruit", emoji: "🍓" },
  { nom: "Ananas", ig: 59, glucidesPar100g: 12, portion: 130, categorie: "fruit", emoji: "🍍" },
  { nom: "Peche", ig: 42, glucidesPar100g: 10, portion: 150, categorie: "fruit", emoji: "🍑" },

  // Cereales / Petit-dejeuner
  { nom: "Flocons d'avoine", ig: 55, glucidesPar100g: 59, portion: 40, categorie: "cereale", emoji: "🌾" },
  { nom: "Corn Flakes", ig: 81, glucidesPar100g: 84, portion: 30, categorie: "cereale", emoji: "🥣" },
  { nom: "Muesli sans sucre", ig: 49, glucidesPar100g: 60, portion: 40, categorie: "cereale", emoji: "🥣" },

  // Sucres / Confiseries
  { nom: "Chocolat noir 70%", ig: 22, glucidesPar100g: 33, portion: 30, categorie: "sucre", emoji: "🍫" },
  { nom: "Chocolat au lait", ig: 43, glucidesPar100g: 57, portion: 30, categorie: "sucre", emoji: "🍫" },
  { nom: "Miel", ig: 61, glucidesPar100g: 80, portion: 15, categorie: "sucre", emoji: "🍯" },
  { nom: "Sucre blanc", ig: 68, glucidesPar100g: 100, portion: 10, categorie: "sucre", emoji: "🍬" },
  { nom: "Confiture", ig: 65, glucidesPar100g: 65, portion: 20, categorie: "sucre", emoji: "🍓" },

  // Produits laitiers
  { nom: "Yaourt nature", ig: 35, glucidesPar100g: 5, portion: 125, categorie: "produit-laitier", emoji: "🥛" },
  { nom: "Lait entier", ig: 27, glucidesPar100g: 5, portion: 200, categorie: "produit-laitier", emoji: "🥛" },
  { nom: "Glace a la vanille", ig: 61, glucidesPar100g: 28, portion: 70, categorie: "produit-laitier", emoji: "🍦" },

  // Boissons
  { nom: "Coca-Cola", ig: 63, glucidesPar100g: 11, portion: 330, categorie: "boisson", emoji: "🥤" },
  { nom: "Jus d'orange", ig: 50, glucidesPar100g: 10, portion: 200, categorie: "boisson", emoji: "🍊" },
  { nom: "Jus de pomme", ig: 44, glucidesPar100g: 11, portion: 200, categorie: "boisson", emoji: "🍎" },
];

export const ALIMENTS: Aliment[] = ALIMENTS_RAW.map((a) => ({
  ...a,
  slug: slugify(a.nom),
}));

export const ALIMENTS_BY_SLUG: Record<string, Aliment> = Object.fromEntries(
  ALIMENTS.map((a) => [a.slug, a])
);
