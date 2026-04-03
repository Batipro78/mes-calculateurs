export interface PrestationChauffagiste {
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

export interface RegionChauffagiste {
  id: string;
  nom: string;
  slug: string;
  coefficient: number;
}

export const PRESTATIONS_CHAUFFAGISTE: PrestationChauffagiste[] = [
  { id: "chaudiere-gaz-condensation", nom: "Chaudiere gaz condensation", slug: "chaudiere-gaz-condensation", emoji: "🔥", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 2500, fournituresMax: 5500, mainOeuvreMin: 1000, mainOeuvreMax: 2000, totalMin: 3500, totalMax: 7500, quantites: [1, 2] },
  { id: "pac-air-eau", nom: "Pompe a chaleur air-eau", slug: "pac-air-eau", emoji: "💧", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 7000, fournituresMax: 13000, mainOeuvreMin: 3000, mainOeuvreMax: 5000, totalMin: 10000, totalMax: 18000, quantites: [1, 2] },
  { id: "pac-air-air", nom: "Pompe a chaleur air-air", slug: "pac-air-air", emoji: "❄️", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 1500, fournituresMax: 4000, mainOeuvreMin: 500, mainOeuvreMax: 2000, totalMin: 2000, totalMax: 6000, quantites: [1, 2, 3] },
  { id: "chauffe-eau-thermo", nom: "Chauffe-eau thermodynamique", slug: "chauffe-eau-thermo", emoji: "🌡️", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 1500, fournituresMax: 3000, mainOeuvreMin: 500, mainOeuvreMax: 1500, totalMin: 2000, totalMax: 4500, quantites: [1, 2] },
  { id: "chauffe-eau-electrique", nom: "Remplacement chauffe-eau electrique", slug: "chauffe-eau-electrique", emoji: "⚡", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 200, fournituresMax: 600, mainOeuvreMin: 200, mainOeuvreMax: 500, totalMin: 400, totalMax: 1100, quantites: [1, 2] },
  { id: "plancher-chauffant", nom: "Plancher chauffant hydraulique", slug: "plancher-chauffant", emoji: "🏠", unite: "m2", uniteLabel: "m\u00b2", uniteSlug: "m2", fournituresMin: 30, fournituresMax: 60, mainOeuvreMin: 20, mainOeuvreMax: 40, totalMin: 50, totalMax: 100, quantites: [30, 50, 80, 120] },
  { id: "radiateur", nom: "Installation radiateur", slug: "radiateur", emoji: "🔲", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 100, fournituresMax: 400, mainOeuvreMin: 80, mainOeuvreMax: 200, totalMin: 180, totalMax: 600, quantites: [1, 2, 4, 6] },
  { id: "entretien-chaudiere", nom: "Entretien chaudiere annuel", slug: "entretien-chaudiere", emoji: "🔧", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 10, fournituresMax: 30, mainOeuvreMin: 90, mainOeuvreMax: 150, totalMin: 100, totalMax: 180, quantites: [1, 2] },
  { id: "desembouage", nom: "Desembouage circuit chauffage", slug: "desembouage", emoji: "🚿", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 50, fournituresMax: 150, mainOeuvreMin: 250, mainOeuvreMax: 500, totalMin: 300, totalMax: 650, quantites: [1, 2] },
  { id: "depannage-chauffage", nom: "Depannage / reparation chauffage", slug: "depannage-chauffage", emoji: "🛠️", unite: "unite", uniteLabel: "unite(s)", uniteSlug: "unites", fournituresMin: 30, fournituresMax: 100, mainOeuvreMin: 80, mainOeuvreMax: 200, totalMin: 110, totalMax: 300, quantites: [1, 2] },
];

export const REGIONS_CHAUFFAGISTE: RegionChauffagiste[] = [
  { id: "ile-de-france", nom: "Ile-de-France", slug: "ile-de-france", coefficient: 1.20 },
  { id: "grandes-villes", nom: "Grandes villes", slug: "grandes-villes", coefficient: 1.10 },
  { id: "province", nom: "Province", slug: "province", coefficient: 1.00 },
  { id: "rural", nom: "Rural", slug: "rural", coefficient: 0.90 },
];

export const REGIONS_SEO = REGIONS_CHAUFFAGISTE.filter(r => r.id !== "rural");

export interface ResultatChauffagiste {
  prestation: PrestationChauffagiste;
  quantite: number;
  region: RegionChauffagiste;
  fournituresMin: number;
  fournituresMax: number;
  mainOeuvreMin: number;
  mainOeuvreMax: number;
  totalMin: number;
  totalMax: number;
}

export function calculerPrixChauffagiste(prestationId: string, quantite: number, regionId: string): ResultatChauffagiste | null {
  const prestation = PRESTATIONS_CHAUFFAGISTE.find(p => p.id === prestationId);
  const region = REGIONS_CHAUFFAGISTE.find(r => r.id === regionId);
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

export function parseSlugChauffagiste(slug: string): { prestation: PrestationChauffagiste; quantite: number; region: RegionChauffagiste } | null {
  for (const p of PRESTATIONS_CHAUFFAGISTE) {
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

export function generateAllSlugsChauffagiste(): string[] {
  const slugs: string[] = [];
  for (const p of PRESTATIONS_CHAUFFAGISTE) {
    for (const r of REGIONS_SEO) {
      for (const q of p.quantites) {
        slugs.push(`${p.slug}-${q}${p.uniteSlug}-${r.slug}`);
      }
    }
  }
  return slugs;
}

export function calculerPrixChauffagisteCoef(prestationId: string, quantite: number, coefficient: number): ResultatChauffagiste | null {
  const prestation = PRESTATIONS_CHAUFFAGISTE.find(p => p.id === prestationId);
  if (!prestation) return null;

  const region: RegionChauffagiste = { id: "custom", nom: "Custom", slug: "custom", coefficient };

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
