export interface PrestationMacon {
  id: string;
  nom: string;
  slug: string;
  emoji: string;
  unite: "m2" | "ml" | "forfait";
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

export interface RegionMacon {
  id: string;
  nom: string;
  slug: string;
  coefficient: number;
}

export const PRESTATIONS_MACON: PrestationMacon[] = [
  { id: "mur-parpaings", nom: "Mur en parpaings", slug: "mur-parpaings", emoji: "\ud83e\uddf1", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 15, fournituresMax: 25, mainOeuvreMin: 35, mainOeuvreMax: 55, totalMin: 50, totalMax: 80, quantites: [10, 20, 40, 80] },
  { id: "dalle-beton", nom: "Dalle beton", slug: "dalle-beton", emoji: "\ud83c\udfd7\ufe0f", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 20, fournituresMax: 40, mainOeuvreMin: 40, mainOeuvreMax: 80, totalMin: 60, totalMax: 120, quantites: [10, 20, 40, 80] },
  { id: "muret-jardin", nom: "Muret de jardin", slug: "muret-jardin", emoji: "\ud83c\udf3f", unite: "ml", uniteLabel: "ml", uniteSlug: "ml", fournituresMin: 40, fournituresMax: 80, mainOeuvreMin: 60, mainOeuvreMax: 170, totalMin: 100, totalMax: 250, quantites: [5, 10, 20, 40] },
  { id: "ouverture-mur-porteur", nom: "Ouverture mur porteur", slug: "ouverture-mur-porteur", emoji: "\ud83d\udeaa", unite: "forfait", uniteLabel: "forfait", uniteSlug: "forfait", fournituresMin: 200, fournituresMax: 500, mainOeuvreMin: 1300, mainOeuvreMax: 3500, totalMin: 1500, totalMax: 4000, quantites: [1] },
  { id: "demolition-mur", nom: "Demolition mur non porteur", slug: "demolition-mur", emoji: "\ud83d\udd28", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 0, fournituresMax: 0, mainOeuvreMin: 20, mainOeuvreMax: 60, totalMin: 20, totalMax: 60, quantites: [10, 20, 40, 80] },
  { id: "ravalement-facade", nom: "Ravalement facade", slug: "ravalement-facade", emoji: "\ud83c\udfe0", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 10, fournituresMax: 30, mainOeuvreMin: 20, mainOeuvreMax: 70, totalMin: 30, totalMax: 100, quantites: [10, 20, 40, 80] },
  { id: "enduit-facade", nom: "Enduit facade", slug: "enduit-facade", emoji: "\ud83d\udd8c\ufe0f", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 8, fournituresMax: 20, mainOeuvreMin: 17, mainOeuvreMax: 50, totalMin: 25, totalMax: 70, quantites: [10, 20, 40, 80] },
  { id: "terrasse-beton", nom: "Terrasse beton", slug: "terrasse-beton", emoji: "\u2600\ufe0f", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 25, fournituresMax: 50, mainOeuvreMin: 40, mainOeuvreMax: 100, totalMin: 65, totalMax: 150, quantites: [10, 20, 40, 80] },
  { id: "chape-beton", nom: "Chape beton", slug: "chape-beton", emoji: "\ud83e\uddf9", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 10, fournituresMax: 20, mainOeuvreMin: 15, mainOeuvreMax: 30, totalMin: 25, totalMax: 50, quantites: [10, 20, 40, 80] },
  { id: "pose-cloture", nom: "Pose cloture / piliers", slug: "pose-cloture", emoji: "\ud83c\udfd7\ufe0f", unite: "ml", uniteLabel: "ml", uniteSlug: "ml", fournituresMin: 30, fournituresMax: 80, mainOeuvreMin: 40, mainOeuvreMax: 100, totalMin: 70, totalMax: 180, quantites: [5, 10, 20, 40] },
];

export const REGIONS_MACON: RegionMacon[] = [
  { id: "ile-de-france", nom: "Ile-de-France", slug: "ile-de-france", coefficient: 1.25 },
  { id: "grandes-villes", nom: "Grandes villes", slug: "grandes-villes", coefficient: 1.10 },
  { id: "province", nom: "Province", slug: "province", coefficient: 1.00 },
  { id: "rural", nom: "Rural", slug: "rural", coefficient: 0.90 },
];

export const REGIONS_SEO = REGIONS_MACON.filter(r => r.id !== "rural");

export interface ResultatMacon {
  prestation: PrestationMacon;
  quantite: number;
  region: RegionMacon;
  fournituresMin: number;
  fournituresMax: number;
  mainOeuvreMin: number;
  mainOeuvreMax: number;
  totalMin: number;
  totalMax: number;
}

export function calculerPrixMacon(prestationId: string, quantite: number, regionId: string): ResultatMacon | null {
  const prestation = PRESTATIONS_MACON.find(p => p.id === prestationId);
  const region = REGIONS_MACON.find(r => r.id === regionId);
  if (!prestation || !region) return null;

  const coef = region.coefficient;
  const qty = prestation.unite === "forfait" ? 1 : quantite;

  return {
    prestation,
    quantite: qty,
    region,
    fournituresMin: Math.round(prestation.fournituresMin * qty * coef),
    fournituresMax: Math.round(prestation.fournituresMax * qty * coef),
    mainOeuvreMin: Math.round(prestation.mainOeuvreMin * qty * coef),
    mainOeuvreMax: Math.round(prestation.mainOeuvreMax * qty * coef),
    totalMin: Math.round(prestation.totalMin * qty * coef),
    totalMax: Math.round(prestation.totalMax * qty * coef),
  };
}

export function fmtPrix(n: number): string {
  return n.toLocaleString("fr-FR") + " \u20ac";
}

export function parseSlugMacon(slug: string): { prestation: PrestationMacon; quantite: number; region: RegionMacon } | null {
  for (const p of PRESTATIONS_MACON) {
    for (const r of REGIONS_SEO) {
      if (p.unite === "forfait") {
        if (slug === `${p.slug}-${r.slug}`) {
          return { prestation: p, quantite: 1, region: r };
        }
      } else {
        for (const q of p.quantites) {
          if (slug === `${p.slug}-${q}${p.uniteSlug}-${r.slug}`) {
            return { prestation: p, quantite: q, region: r };
          }
        }
      }
    }
  }
  return null;
}

export function generateAllSlugsMacon(): string[] {
  const slugs: string[] = [];
  for (const p of PRESTATIONS_MACON) {
    for (const r of REGIONS_SEO) {
      if (p.unite === "forfait") {
        slugs.push(`${p.slug}-${r.slug}`);
      } else {
        for (const q of p.quantites) {
          slugs.push(`${p.slug}-${q}${p.uniteSlug}-${r.slug}`);
        }
      }
    }
  }
  return slugs;
}
