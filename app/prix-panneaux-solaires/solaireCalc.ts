export interface PrestationSolaire {
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

export interface RegionSolaire {
  id: string;
  nom: string;
  slug: string;
  coefficient: number;
}

export const PRESTATIONS_SOLAIRE: PrestationSolaire[] = [
  { id: "panneaux-3kwc", nom: "Installation panneaux 3 kWc (~9 panneaux)", slug: "panneaux-3kwc", emoji: "☀️", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 5500, fournituresMax: 8500, mainOeuvreMin: 2500, mainOeuvreMax: 3500, totalMin: 8000, totalMax: 12000, quantites: [1, 2] },
  { id: "panneaux-6kwc", nom: "Installation panneaux 6 kWc (~18 panneaux)", slug: "panneaux-6kwc", emoji: "☀️", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 10000, fournituresMax: 14500, mainOeuvreMin: 4000, mainOeuvreMax: 5500, totalMin: 14000, totalMax: 20000, quantites: [1, 2] },
  { id: "panneaux-9kwc", nom: "Installation panneaux 9 kWc (~27 panneaux)", slug: "panneaux-9kwc", emoji: "☀️", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 14500, fournituresMax: 20500, mainOeuvreMin: 5500, mainOeuvreMax: 7500, totalMin: 20000, totalMax: 28000, quantites: [1] },
  { id: "batterie-5kwh", nom: "Pose batterie domestique 5 kWh", slug: "batterie-5kwh", emoji: "\u{1f50b}", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 3800, fournituresMax: 6000, mainOeuvreMin: 1200, mainOeuvreMax: 2000, totalMin: 5000, totalMax: 8000, quantites: [1, 2] },
  { id: "batterie-10kwh", nom: "Pose batterie domestique 10 kWh", slug: "batterie-10kwh", emoji: "\u{1f50b}", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 6200, fournituresMax: 10000, mainOeuvreMin: 1800, mainOeuvreMax: 3000, totalMin: 8000, totalMax: 13000, quantites: [1, 2] },
  { id: "solaire-thermique", nom: "Solaire thermique (eau chaude)", slug: "solaire-thermique", emoji: "\u{1f6bf}", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 3500, fournituresMax: 6500, mainOeuvreMin: 1500, mainOeuvreMax: 2500, totalMin: 5000, totalMax: 9000, quantites: [1, 2] },
  { id: "onduleur", nom: "Onduleur photovoltaique (remplacement)", slug: "onduleur", emoji: "⚡", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 1000, fournituresMax: 2500, mainOeuvreMin: 500, mainOeuvreMax: 1000, totalMin: 1500, totalMax: 3500, quantites: [1, 2] },
  { id: "carport-solaire", nom: "Carport solaire 3 places", slug: "carport-solaire", emoji: "\u{1f697}", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 8500, fournituresMax: 14000, mainOeuvreMin: 3500, mainOeuvreMax: 6000, totalMin: 12000, totalMax: 20000, quantites: [1, 2] },
  { id: "demoussage-panneaux", nom: "Demoussage / nettoyage panneaux", slug: "demoussage-panneaux", emoji: "\u{1f9fd}", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 20, fournituresMax: 80, mainOeuvreMin: 180, mainOeuvreMax: 420, totalMin: 200, totalMax: 500, quantites: [1, 2] },
  { id: "audit-solaire", nom: "Audit / etude solaire a domicile", slug: "audit-solaire", emoji: "\u{1f4cb}", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 50, fournituresMax: 150, mainOeuvreMin: 200, mainOeuvreMax: 450, totalMin: 250, totalMax: 600, quantites: [1] },
];

export const REGIONS_SOLAIRE: RegionSolaire[] = [
  { id: "ile-de-france", nom: "Ile-de-France", slug: "ile-de-france", coefficient: 1.20 },
  { id: "grandes-villes", nom: "Grandes villes", slug: "grandes-villes", coefficient: 1.10 },
  { id: "province", nom: "Province", slug: "province", coefficient: 1.00 },
  { id: "rural", nom: "Rural", slug: "rural", coefficient: 0.90 },
];

export const REGIONS_SEO = REGIONS_SOLAIRE.filter(r => r.id !== "rural");

export interface ResultatSolaire {
  prestation: PrestationSolaire;
  quantite: number;
  region: RegionSolaire;
  fournituresMin: number;
  fournituresMax: number;
  mainOeuvreMin: number;
  mainOeuvreMax: number;
  totalMin: number;
  totalMax: number;
}

export function calculerPrixSolaire(prestationId: string, quantite: number, regionId: string): ResultatSolaire | null {
  const prestation = PRESTATIONS_SOLAIRE.find(p => p.id === prestationId);
  const region = REGIONS_SOLAIRE.find(r => r.id === regionId);
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
  return n.toLocaleString("fr-FR") + " €";
}

export function parseSlugSolaire(slug: string): { prestation: PrestationSolaire; quantite: number; region: RegionSolaire } | null {
  for (const p of PRESTATIONS_SOLAIRE) {
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

export function generateAllSlugsSolaire(): string[] {
  const slugs: string[] = [];
  for (const p of PRESTATIONS_SOLAIRE) {
    for (const r of REGIONS_SEO) {
      for (const q of p.quantites) {
        slugs.push(`${p.slug}-${q}${p.uniteSlug}-${r.slug}`);
      }
    }
  }
  return slugs;
}

export function calculerPrixSolaireCoef(prestationId: string, quantite: number, coefficient: number): ResultatSolaire | null {
  const prestation = PRESTATIONS_SOLAIRE.find(p => p.id === prestationId);
  if (!prestation) return null;

  const region: RegionSolaire = { id: "custom", nom: "Custom", slug: "custom", coefficient };

  return {
    prestation,
    quantite,
    region,
    fournituresMin: Math.round(prestation.fournituresMin * quantite * coefficient),
    fournituresMax: Math.round(prestation.fournituresMax * quantite * coefficient),
    mainOeuvreMin: Math.round(prestation.mainOeuvreMin * quantite * coefficient),
    mainOeuvreMax: Math.round(prestation.mainOeuvreMax * quantite * coefficient),
    totalMin: Math.round(prestation.totalMin * quantite * coefficient),
    totalMax: Math.round(prestation.totalMax * quantite * coefficient),
  };
}
