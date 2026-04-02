export interface PrestationPlombier {
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

export interface RegionPlombier {
  id: string;
  nom: string;
  slug: string;
  coefficient: number;
}

export const PRESTATIONS_PLOMBIER: PrestationPlombier[] = [
  { id: "robinet-mitigeur", nom: "Installation robinet / mitigeur", slug: "installation-robinet", emoji: "🚰", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 50, fournituresMax: 200, mainOeuvreMin: 80, mainOeuvreMax: 150, totalMin: 130, totalMax: 350, quantites: [1, 2, 3, 5] },
  { id: "wc-toilettes", nom: "Installation WC / toilettes", slug: "installation-wc", emoji: "🚽", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 100, fournituresMax: 500, mainOeuvreMin: 150, mainOeuvreMax: 400, totalMin: 250, totalMax: 900, quantites: [1, 2, 3] },
  { id: "chauffe-eau", nom: "Installation chauffe-eau electrique", slug: "chauffe-eau", emoji: "🔥", unite: "forfait", uniteLabel: "forfait", uniteSlug: "forfait", fournituresMin: 300, fournituresMax: 900, mainOeuvreMin: 200, mainOeuvreMax: 500, totalMin: 500, totalMax: 1400, quantites: [1] },
  { id: "douche", nom: "Installation douche / receveur", slug: "installation-douche", emoji: "🚿", unite: "forfait", uniteLabel: "forfait", uniteSlug: "forfait", fournituresMin: 300, fournituresMax: 1200, mainOeuvreMin: 400, mainOeuvreMax: 1000, totalMin: 700, totalMax: 2200, quantites: [1] },
  { id: "baignoire", nom: "Remplacement baignoire", slug: "remplacement-baignoire", emoji: "🛁", unite: "forfait", uniteLabel: "forfait", uniteSlug: "forfait", fournituresMin: 300, fournituresMax: 1500, mainOeuvreMin: 500, mainOeuvreMax: 1500, totalMin: 800, totalMax: 3000, quantites: [1] },
  { id: "debouchage", nom: "Debouchage canalisation", slug: "debouchage-canalisation", emoji: "🔧", unite: "forfait", uniteLabel: "forfait", uniteSlug: "forfait", fournituresMin: 0, fournituresMax: 50, mainOeuvreMin: 100, mainOeuvreMax: 400, totalMin: 100, totalMax: 450, quantites: [1] },
  { id: "chaudiere-gaz", nom: "Installation chaudiere gaz condensation", slug: "chaudiere-gaz", emoji: "🏠", unite: "forfait", uniteLabel: "forfait", uniteSlug: "forfait", fournituresMin: 2000, fournituresMax: 5000, mainOeuvreMin: 800, mainOeuvreMax: 1500, totalMin: 2800, totalMax: 6500, quantites: [1] },
  { id: "salle-de-bain", nom: "Creation salle de bain complete", slug: "salle-de-bain", emoji: "🏗️", unite: "m2", uniteLabel: "m²", uniteSlug: "m2", fournituresMin: 400, fournituresMax: 1200, mainOeuvreMin: 500, mainOeuvreMax: 1300, totalMin: 900, totalMax: 2500, quantites: [4, 6, 8, 10] },
  { id: "adoucisseur", nom: "Installation adoucisseur d'eau", slug: "adoucisseur-eau", emoji: "💧", unite: "forfait", uniteLabel: "forfait", uniteSlug: "forfait", fournituresMin: 500, fournituresMax: 2000, mainOeuvreMin: 250, mainOeuvreMax: 700, totalMin: 750, totalMax: 2700, quantites: [1] },
  { id: "recherche-fuite", nom: "Recherche de fuite", slug: "recherche-fuite", emoji: "🔍", unite: "forfait", uniteLabel: "forfait", uniteSlug: "forfait", fournituresMin: 0, fournituresMax: 50, mainOeuvreMin: 150, mainOeuvreMax: 550, totalMin: 150, totalMax: 600, quantites: [1] },
];

export const REGIONS_PLOMBIER: RegionPlombier[] = [
  { id: "ile-de-france", nom: "Ile-de-France", slug: "ile-de-france", coefficient: 1.30 },
  { id: "grandes-villes", nom: "Grandes villes", slug: "grandes-villes", coefficient: 1.10 },
  { id: "province", nom: "Province", slug: "province", coefficient: 1.00 },
  { id: "rural", nom: "Rural", slug: "rural", coefficient: 0.90 },
];

export const REGIONS_SEO = REGIONS_PLOMBIER.filter(r => r.id !== "rural");

export interface ResultatPlombier {
  prestation: PrestationPlombier;
  quantite: number;
  region: RegionPlombier;
  fournituresMin: number;
  fournituresMax: number;
  mainOeuvreMin: number;
  mainOeuvreMax: number;
  totalMin: number;
  totalMax: number;
}

export function calculerPrixPlombier(prestationId: string, quantite: number, regionId: string): ResultatPlombier | null {
  const prestation = PRESTATIONS_PLOMBIER.find(p => p.id === prestationId);
  const region = REGIONS_PLOMBIER.find(r => r.id === regionId);
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

export function parseSlugPlombier(slug: string): { prestation: PrestationPlombier; quantite: number; region: RegionPlombier } | null {
  for (const p of PRESTATIONS_PLOMBIER) {
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

export function generateAllSlugsPlombier(): string[] {
  const slugs: string[] = [];
  for (const p of PRESTATIONS_PLOMBIER) {
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
