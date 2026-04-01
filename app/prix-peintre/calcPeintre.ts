export interface PrestationPeintre {
  id: string;
  nom: string;
  slug: string;
  emoji: string;
  unite: "m2" | "unite";
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

export interface RegionPeintre {
  id: string;
  nom: string;
  slug: string;
  coefficient: number;
}

export const PRESTATIONS_PEINTRE: PrestationPeintre[] = [
  { id: "peinture-mur", nom: "Peinture mur interieur", slug: "peinture-mur", emoji: "\ud83c\udfa8", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 5, fournituresMax: 10, mainOeuvreMin: 15, mainOeuvreMax: 30, totalMin: 20, totalMax: 40, quantites: [10, 20, 40, 80] },
  { id: "peinture-plafond", nom: "Peinture plafond", slug: "peinture-plafond", emoji: "\u2b06\ufe0f", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 5, fournituresMax: 12, mainOeuvreMin: 20, mainOeuvreMax: 33, totalMin: 25, totalMax: 45, quantites: [10, 20, 40, 80] },
  { id: "peinture-piece", nom: "Peinture piece complete", slug: "peinture-piece", emoji: "\ud83c\udfe0", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 5, fournituresMax: 12, mainOeuvreMin: 20, mainOeuvreMax: 38, totalMin: 25, totalMax: 50, quantites: [10, 20, 40, 80] },
  { id: "peinture-facade", nom: "Peinture facade exterieure", slug: "peinture-facade", emoji: "\ud83c\udfd7\ufe0f", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 8, fournituresMax: 15, mainOeuvreMin: 17, mainOeuvreMax: 45, totalMin: 25, totalMax: 60, quantites: [10, 20, 40, 80] },
  { id: "peinture-boiseries", nom: "Peinture boiseries / portes", slug: "peinture-boiseries", emoji: "\ud83d\udeaa", unite: "unite", uniteLabel: "unite", uniteSlug: "unites", fournituresMin: 10, fournituresMax: 20, mainOeuvreMin: 20, mainOeuvreMax: 30, totalMin: 30, totalMax: 50, quantites: [1, 3, 5, 8] },
  { id: "papier-peint", nom: "Pose papier peint", slug: "papier-peint", emoji: "\ud83c\udf38", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 10, fournituresMax: 25, mainOeuvreMin: 15, mainOeuvreMax: 30, totalMin: 25, totalMax: 55, quantites: [10, 20, 40, 80] },
  { id: "lessivage-peinture", nom: "Lessivage + peinture", slug: "lessivage-peinture", emoji: "\ud83e\uddf9", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 3, fournituresMax: 5, mainOeuvreMin: 12, mainOeuvreMax: 20, totalMin: 15, totalMax: 25, quantites: [10, 20, 40, 80] },
  { id: "enduit-lissage-peinture", nom: "Enduit + lissage + peinture", slug: "enduit-lissage-peinture", emoji: "\ud83d\udd8c\ufe0f", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 8, fournituresMax: 15, mainOeuvreMin: 22, mainOeuvreMax: 45, totalMin: 30, totalMax: 60, quantites: [10, 20, 40, 80] },
  { id: "peinture-decorative", nom: "Peinture decorative / patine", slug: "peinture-decorative", emoji: "\u2728", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 10, fournituresMax: 20, mainOeuvreMin: 25, mainOeuvreMax: 50, totalMin: 35, totalMax: 70, quantites: [10, 20, 40, 80] },
  { id: "poncage-peinture", nom: "Pon\u00e7age + sous-couche + peinture", slug: "poncage-peinture", emoji: "\ud83e\udea8", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 5, fournituresMax: 10, mainOeuvreMin: 18, mainOeuvreMax: 35, totalMin: 23, totalMax: 45, quantites: [10, 20, 40, 80] },
];

export const REGIONS_PEINTRE: RegionPeintre[] = [
  { id: "ile-de-france", nom: "Ile-de-France", slug: "ile-de-france", coefficient: 1.25 },
  { id: "grandes-villes", nom: "Grandes villes", slug: "grandes-villes", coefficient: 1.10 },
  { id: "province", nom: "Province", slug: "province", coefficient: 1.00 },
  { id: "rural", nom: "Rural", slug: "rural", coefficient: 0.90 },
];

export const REGIONS_SEO_PEINTRE = REGIONS_PEINTRE.filter(r => r.id !== "rural");

export interface ResultatPeintre {
  prestation: PrestationPeintre;
  quantite: number;
  region: RegionPeintre;
  fournituresMin: number;
  fournituresMax: number;
  mainOeuvreMin: number;
  mainOeuvreMax: number;
  totalMin: number;
  totalMax: number;
}

export function calculerPrixPeintre(prestationId: string, quantite: number, regionId: string): ResultatPeintre | null {
  const prestation = PRESTATIONS_PEINTRE.find(p => p.id === prestationId);
  const region = REGIONS_PEINTRE.find(r => r.id === regionId);
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

export function parseSlugPeintre(slug: string): { prestation: PrestationPeintre; quantite: number; region: RegionPeintre } | null {
  for (const p of PRESTATIONS_PEINTRE) {
    for (const r of REGIONS_SEO_PEINTRE) {
      for (const q of p.quantites) {
        const expected = `${p.slug}-${q}${p.uniteSlug}-${r.slug}`;
        if (slug === expected) {
          return { prestation: p, quantite: q, region: r };
        }
      }
    }
  }
  return null;
}

export function generateAllSlugsPeintre(): string[] {
  const slugs: string[] = [];
  for (const p of PRESTATIONS_PEINTRE) {
    for (const r of REGIONS_SEO_PEINTRE) {
      for (const q of p.quantites) {
        slugs.push(`${p.slug}-${q}${p.uniteSlug}-${r.slug}`);
      }
    }
  }
  return slugs;
}
