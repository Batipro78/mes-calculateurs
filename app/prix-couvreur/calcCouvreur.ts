export interface PrestationCouvreur {
  id: string;
  nom: string;
  slug: string;
  emoji: string;
  unite: "m2" | "ml" | "unite";
  uniteLabel: string;
  uniteSlug: string;
  fournituresMin: number;
  fournituresMax: number;
  mainOeuvreMin: number;
  mainOeuvreMax: number;
  totalMin: number;
  totalMax: number;
  quantites: number[];
}

export interface RegionCouvreur {
  id: string;
  nom: string;
  slug: string;
  coefficient: number;
}

export const PRESTATIONS_COUVREUR: PrestationCouvreur[] = [
  { id: "reparation-toiture", nom: "Reparation toiture", slug: "reparation-toiture", emoji: "🔨", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 10, fournituresMax: 30, mainOeuvreMin: 30, mainOeuvreMax: 70, totalMin: 40, totalMax: 100, quantites: [20, 50, 100, 150] },
  { id: "renovation-toiture", nom: "Renovation toiture complete", slug: "renovation-toiture", emoji: "🏗️", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 70, fournituresMax: 180, mainOeuvreMin: 60, mainOeuvreMax: 120, totalMin: 130, totalMax: 300, quantites: [50, 100, 150, 200] },
  { id: "demoussage-toiture", nom: "Nettoyage / demoussage toiture", slug: "demoussage-toiture", emoji: "🧹", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 2, fournituresMax: 8, mainOeuvreMin: 8, mainOeuvreMax: 32, totalMin: 10, totalMax: 40, quantites: [50, 100, 150, 200] },
  { id: "etancheite-terrasse", nom: "Etancheite toiture terrasse", slug: "etancheite-terrasse", emoji: "💧", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 35, fournituresMax: 70, mainOeuvreMin: 25, mainOeuvreMax: 65, totalMin: 60, totalMax: 135, quantites: [20, 50, 100, 150] },
  { id: "isolation-sarking", nom: "Isolation par l'exterieur (sarking)", slug: "isolation-sarking", emoji: "🌡️", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 95, fournituresMax: 180, mainOeuvreMin: 40, mainOeuvreMax: 80, totalMin: 135, totalMax: 260, quantites: [50, 100, 150, 200] },
  { id: "isolation-combles", nom: "Isolation combles", slug: "isolation-combles", emoji: "🏡", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 15, fournituresMax: 50, mainOeuvreMin: 20, mainOeuvreMax: 60, totalMin: 35, totalMax: 110, quantites: [30, 50, 80, 120] },
  { id: "velux", nom: "Installation Velux / fenetre de toit", slug: "velux", emoji: "🪟", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 250, fournituresMax: 950, mainOeuvreMin: 250, mainOeuvreMax: 650, totalMin: 500, totalMax: 1600, quantites: [1, 2, 3] },
  { id: "gouttiere", nom: "Pose gouttiere", slug: "gouttiere", emoji: "🔩", unite: "ml", uniteLabel: "ml", uniteSlug: "ml", fournituresMin: 15, fournituresMax: 50, mainOeuvreMin: 15, mainOeuvreMax: 45, totalMin: 30, totalMax: 95, quantites: [10, 20, 40, 60] },
  { id: "charpente", nom: "Reparation / traitement charpente", slug: "charpente", emoji: "🪵", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 20, fournituresMax: 50, mainOeuvreMin: 30, mainOeuvreMax: 80, totalMin: 50, totalMax: 130, quantites: [20, 50, 100, 150] },
  { id: "zinguerie", nom: "Zinguerie (faitage, noues, solins)", slug: "zinguerie", emoji: "⛏️", unite: "ml", uniteLabel: "ml", uniteSlug: "ml", fournituresMin: 12, fournituresMax: 40, mainOeuvreMin: 15, mainOeuvreMax: 35, totalMin: 30, totalMax: 80, quantites: [10, 20, 40, 60] },
];

export const REGIONS_COUVREUR: RegionCouvreur[] = [
  { id: "ile-de-france", nom: "Ile-de-France", slug: "ile-de-france", coefficient: 1.20 },
  { id: "grandes-villes", nom: "Grandes villes", slug: "grandes-villes", coefficient: 1.10 },
  { id: "province", nom: "Province", slug: "province", coefficient: 1.00 },
  { id: "rural", nom: "Rural", slug: "rural", coefficient: 0.90 },
];

export const REGIONS_SEO = REGIONS_COUVREUR.filter(r => r.id !== "rural");

export interface ResultatCouvreur {
  prestation: PrestationCouvreur;
  quantite: number;
  region: RegionCouvreur;
  fournituresMin: number;
  fournituresMax: number;
  mainOeuvreMin: number;
  mainOeuvreMax: number;
  totalMin: number;
  totalMax: number;
}

export function calculerPrixCouvreur(prestationId: string, quantite: number, regionId: string): ResultatCouvreur | null {
  const prestation = PRESTATIONS_COUVREUR.find(p => p.id === prestationId);
  const region = REGIONS_COUVREUR.find(r => r.id === regionId);
  if (!prestation || !region) return null;

  const coef = region.coefficient;

  return {
    prestation,
    quantite,
    region,
    fournituresMin: Math.round(prestation.fournituresMin * quantite * coef),
    fournituresMax: Math.round(prestation.fournituresMax * quantite * coef),
    mainOeuvreMin: Math.round(prestation.mainOeuvreMin * quantite * coef),
    mainOeuvreMax: Math.round(prestation.mainOeuvreMax * quantite * coef),
    totalMin: Math.round(prestation.totalMin * quantite * coef),
    totalMax: Math.round(prestation.totalMax * quantite * coef),
  };
}

export function fmtPrix(n: number): string {
  return n.toLocaleString("fr-FR") + " \u20ac";
}

export function parseSlugCouvreur(slug: string): { prestation: PrestationCouvreur; quantite: number; region: RegionCouvreur } | null {
  for (const p of PRESTATIONS_COUVREUR) {
    for (const r of REGIONS_SEO) {
      for (const q of p.quantites) {
        if (slug === `${p.slug}-${q}${p.uniteSlug}-${r.slug}`) {
          return { prestation: p, quantite: q, region: r };
        }
      }
    }
  }
  return null;
}

export function generateAllSlugsCouvreur(): string[] {
  const slugs: string[] = [];
  for (const p of PRESTATIONS_COUVREUR) {
    for (const r of REGIONS_SEO) {
      for (const q of p.quantites) {
        slugs.push(`${p.slug}-${q}${p.uniteSlug}-${r.slug}`);
      }
    }
  }
  return slugs;
}
