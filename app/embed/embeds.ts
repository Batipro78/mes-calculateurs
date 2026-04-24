// Catalogue des widgets embeddables disponibles
export interface EmbedDef {
  slug: string;
  title: string;
  description: string;
  emoji: string;
  color: string; // Tailwind gradient classes for preview
  defaultHeight: number; // hauteur recommandee pour iframe
  sourcePath: string; // chemin vers la page complete (pour lien "Voir en plein ecran")
}

export const EMBEDS: EmbedDef[] = [
  {
    slug: "imc",
    title: "Calculateur IMC",
    description: "Calcul de l'indice de masse corporelle avec interpretation OMS",
    emoji: "⚖️",
    color: "from-rose-500 to-pink-600",
    defaultHeight: 640,
    sourcePath: "/calcul-imc",
  },
  {
    slug: "pourcentage",
    title: "Calcul de pourcentage",
    description: "X% de Y, augmentation, reduction, part — 4 modes",
    emoji: "%",
    color: "from-purple-500 to-indigo-600",
    defaultHeight: 560,
    sourcePath: "/calcul-pourcentage",
  },
  {
    slug: "tva",
    title: "Calcul TVA HT/TTC",
    description: "Conversion entre prix HT et TTC (4 taux francais)",
    emoji: "€",
    color: "from-amber-500 to-orange-600",
    defaultHeight: 560,
    sourcePath: "/calcul-tva",
  },
  {
    slug: "salaire-brut-net",
    title: "Salaire Brut / Net",
    description: "Convertisseur brut/net pour cadre, non-cadre, fonction publique",
    emoji: "💼",
    color: "from-emerald-500 to-teal-600",
    defaultHeight: 640,
    sourcePath: "/salaire-brut-net",
  },
  {
    slug: "pret-immobilier",
    title: "Simulateur pret immobilier",
    description: "Mensualite, cout total, interets — taux 2026",
    emoji: "🏠",
    color: "from-blue-500 to-indigo-600",
    defaultHeight: 720,
    sourcePath: "/simulateur-pret-immobilier",
  },
  {
    slug: "interet-compose",
    title: "Interets composes",
    description: "Simulation d'epargne avec interets composes sur N annees",
    emoji: "📈",
    color: "from-teal-500 to-cyan-600",
    defaultHeight: 640,
    sourcePath: "/calcul-interet-compose",
  },
  {
    slug: "frais-de-notaire",
    title: "Frais de notaire",
    description: "Frais pour achat ancien / neuf / terrain (bareme 2026)",
    emoji: "📋",
    color: "from-cyan-500 to-blue-500",
    defaultHeight: 640,
    sourcePath: "/frais-de-notaire",
  },
];

export function findEmbed(slug: string): EmbedDef | undefined {
  return EMBEDS.find((e) => e.slug === slug);
}
