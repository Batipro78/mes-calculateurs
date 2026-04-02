export interface PrestationElectricien {
  id: string;
  nom: string;
  slug: string;
  emoji: string;
  unite: "m2" | "unite" | "forfait";
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

export interface RegionElectricien {
  id: string;
  nom: string;
  slug: string;
  coefficient: number;
}

export const PRESTATIONS_ELECTRICIEN: PrestationElectricien[] = [
  { id: "prise-electrique", nom: "Installation prise electrique", slug: "installation-prise", emoji: "🔌", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 15, fournituresMax: 50, mainOeuvreMin: 35, mainOeuvreMax: 100, totalMin: 50, totalMax: 150, quantites: [3, 5, 10, 15] },
  { id: "point-lumineux", nom: "Point lumineux / interrupteur", slug: "point-lumineux", emoji: "💡", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 30, fournituresMax: 80, mainOeuvreMin: 70, mainOeuvreMax: 170, totalMin: 100, totalMax: 250, quantites: [3, 5, 10, 15] },
  { id: "tableau-electrique", nom: "Remplacement tableau electrique", slug: "tableau-electrique", emoji: "⚡", unite: "forfait", uniteLabel: "forfait", uniteSlug: "forfait", fournituresMin: 200, fournituresMax: 600, mainOeuvreMin: 600, mainOeuvreMax: 1400, totalMin: 800, totalMax: 2000, quantites: [1] },
  { id: "renovation-electrique", nom: "Renovation electrique complete", slug: "renovation-electrique", emoji: "🏠", unite: "m2", uniteLabel: "m²", uniteSlug: "m2", fournituresMin: 40, fournituresMax: 90, mainOeuvreMin: 50, mainOeuvreMax: 110, totalMin: 90, totalMax: 200, quantites: [30, 50, 80, 120] },
  { id: "radiateur-electrique", nom: "Installation radiateur electrique", slug: "radiateur-electrique", emoji: "🌡️", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 100, fournituresMax: 500, mainOeuvreMin: 100, mainOeuvreMax: 300, totalMin: 200, totalMax: 800, quantites: [2, 4, 6, 8] },
  { id: "vmc", nom: "Installation VMC", slug: "installation-vmc", emoji: "🌀", unite: "forfait", uniteLabel: "forfait", uniteSlug: "forfait", fournituresMin: 150, fournituresMax: 400, mainOeuvreMin: 200, mainOeuvreMax: 600, totalMin: 350, totalMax: 1000, quantites: [1] },
  { id: "volet-roulant", nom: "Pose volet roulant electrique", slug: "volet-roulant", emoji: "🪟", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 150, fournituresMax: 600, mainOeuvreMin: 100, mainOeuvreMax: 300, totalMin: 250, totalMax: 900, quantites: [3, 5, 8, 12] },
  { id: "diagnostic", nom: "Diagnostic electrique", slug: "diagnostic-electrique", emoji: "🔍", unite: "forfait", uniteLabel: "forfait", uniteSlug: "forfait", fournituresMin: 0, fournituresMax: 0, mainOeuvreMin: 80, mainOeuvreMax: 180, totalMin: 80, totalMax: 180, quantites: [1] },
  { id: "borne-irve", nom: "Borne recharge vehicule electrique", slug: "borne-recharge-irve", emoji: "🚗", unite: "forfait", uniteLabel: "forfait", uniteSlug: "forfait", fournituresMin: 700, fournituresMax: 1300, mainOeuvreMin: 800, mainOeuvreMax: 1200, totalMin: 1500, totalMax: 2500, quantites: [1] },
  { id: "mise-conformite", nom: "Mise en conformite NF C 15-100", slug: "mise-en-conformite", emoji: "✅", unite: "m2", uniteLabel: "m²", uniteSlug: "m2", fournituresMin: 15, fournituresMax: 50, mainOeuvreMin: 35, mainOeuvreMax: 100, totalMin: 50, totalMax: 150, quantites: [30, 50, 80, 120] },
];

export const REGIONS_ELECTRICIEN: RegionElectricien[] = [
  { id: "ile-de-france", nom: "Ile-de-France", slug: "ile-de-france", coefficient: 1.25 },
  { id: "grandes-villes", nom: "Grandes villes", slug: "grandes-villes", coefficient: 1.10 },
  { id: "province", nom: "Province", slug: "province", coefficient: 1.00 },
  { id: "rural", nom: "Rural", slug: "rural", coefficient: 0.90 },
];

export const REGIONS_SEO = REGIONS_ELECTRICIEN.filter(r => r.id !== "rural");

export interface ResultatElectricien {
  prestation: PrestationElectricien;
  quantite: number;
  region: RegionElectricien;
  fournituresMin: number;
  fournituresMax: number;
  mainOeuvreMin: number;
  mainOeuvreMax: number;
  totalMin: number;
  totalMax: number;
}

export function calculerPrixElectricien(prestationId: string, quantite: number, regionId: string): ResultatElectricien | null {
  const prestation = PRESTATIONS_ELECTRICIEN.find(p => p.id === prestationId);
  const region = REGIONS_ELECTRICIEN.find(r => r.id === regionId);
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
  return n.toLocaleString("fr-FR") + " €";
}

export function parseSlugElectricien(slug: string): { prestation: PrestationElectricien; quantite: number; region: RegionElectricien } | null {
  for (const p of PRESTATIONS_ELECTRICIEN) {
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

export function generateAllSlugsElectricien(): string[] {
  const slugs: string[] = [];
  for (const p of PRESTATIONS_ELECTRICIEN) {
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
