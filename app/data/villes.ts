export interface Ville {
  nom: string;
  slug: string;
  regionId: string;
  coefficient: number;
  departement: string;
  codePostal: string;
  population: string;
  gentile: string;
}

export const VILLES: Ville[] = [
  // Ile-de-France (coefficient 1.20)
  { nom: "Paris", slug: "paris", regionId: "ile-de-france", coefficient: 1.20, departement: "75", codePostal: "75000", population: "2 133 000", gentile: "parisiens" },
  { nom: "Boulogne-Billancourt", slug: "boulogne-billancourt", regionId: "ile-de-france", coefficient: 1.20, departement: "92", codePostal: "92100", population: "121 000", gentile: "boulonnais" },
  { nom: "Saint-Denis", slug: "saint-denis", regionId: "ile-de-france", coefficient: 1.20, departement: "93", codePostal: "93200", population: "113 000", gentile: "dionysiens" },
  { nom: "Versailles", slug: "versailles", regionId: "ile-de-france", coefficient: 1.20, departement: "78", codePostal: "78000", population: "85 000", gentile: "versaillais" },

  // Grandes villes (coefficient 1.10)
  { nom: "Marseille", slug: "marseille", regionId: "grandes-villes", coefficient: 1.10, departement: "13", codePostal: "13000", population: "873 000", gentile: "marseillais" },
  { nom: "Lyon", slug: "lyon", regionId: "grandes-villes", coefficient: 1.10, departement: "69", codePostal: "69000", population: "522 000", gentile: "lyonnais" },
  { nom: "Toulouse", slug: "toulouse", regionId: "grandes-villes", coefficient: 1.10, departement: "31", codePostal: "31000", population: "504 000", gentile: "toulousains" },
  { nom: "Nice", slug: "nice", regionId: "grandes-villes", coefficient: 1.10, departement: "06", codePostal: "06000", population: "342 000", gentile: "nicois" },
  { nom: "Nantes", slug: "nantes", regionId: "grandes-villes", coefficient: 1.10, departement: "44", codePostal: "44000", population: "323 000", gentile: "nantais" },
  { nom: "Montpellier", slug: "montpellier", regionId: "grandes-villes", coefficient: 1.10, departement: "34", codePostal: "34000", population: "302 000", gentile: "montpellierains" },
  { nom: "Strasbourg", slug: "strasbourg", regionId: "grandes-villes", coefficient: 1.10, departement: "67", codePostal: "67000", population: "290 000", gentile: "strasbourgeois" },
  { nom: "Bordeaux", slug: "bordeaux", regionId: "grandes-villes", coefficient: 1.10, departement: "33", codePostal: "33000", population: "260 000", gentile: "bordelais" },
  { nom: "Lille", slug: "lille", regionId: "grandes-villes", coefficient: 1.10, departement: "59", codePostal: "59000", population: "236 000", gentile: "lillois" },
  { nom: "Rennes", slug: "rennes", regionId: "grandes-villes", coefficient: 1.10, departement: "35", codePostal: "35000", population: "222 000", gentile: "rennais" },
  { nom: "Toulon", slug: "toulon", regionId: "grandes-villes", coefficient: 1.10, departement: "83", codePostal: "83000", population: "180 000", gentile: "toulonnais" },

  // Province (coefficient 1.00)
  { nom: "Reims", slug: "reims", regionId: "province", coefficient: 1.00, departement: "51", codePostal: "51100", population: "182 000", gentile: "remois" },
  { nom: "Saint-Etienne", slug: "saint-etienne", regionId: "province", coefficient: 1.00, departement: "42", codePostal: "42000", population: "174 000", gentile: "stephanois" },
  { nom: "Le Havre", slug: "le-havre", regionId: "province", coefficient: 1.00, departement: "76", codePostal: "76600", population: "170 000", gentile: "havrais" },
  { nom: "Dijon", slug: "dijon", regionId: "province", coefficient: 1.00, departement: "21", codePostal: "21000", population: "160 000", gentile: "dijonnais" },
  { nom: "Grenoble", slug: "grenoble", regionId: "province", coefficient: 1.00, departement: "38", codePostal: "38000", population: "158 000", gentile: "grenoblois" },
  { nom: "Angers", slug: "angers", regionId: "province", coefficient: 1.00, departement: "49", codePostal: "49000", population: "155 000", gentile: "angevins" },
  { nom: "Aix-en-Provence", slug: "aix-en-provence", regionId: "province", coefficient: 1.00, departement: "13", codePostal: "13100", population: "147 000", gentile: "aixois" },
  { nom: "Brest", slug: "brest", regionId: "province", coefficient: 1.00, departement: "29", codePostal: "29200", population: "139 000", gentile: "brestois" },
  { nom: "Le Mans", slug: "le-mans", regionId: "province", coefficient: 1.00, departement: "72", codePostal: "72000", population: "145 000", gentile: "manceaux" },
  { nom: "Clermont-Ferrand", slug: "clermont-ferrand", regionId: "province", coefficient: 1.00, departement: "63", codePostal: "63000", population: "147 000", gentile: "clermontois" },
];

export function findVille(slug: string): Ville | null {
  return VILLES.find(v => v.slug === slug) ?? null;
}

export function getVillesSlugs(): string[] {
  return VILLES.map(v => v.slug);
}
