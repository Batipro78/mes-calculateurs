import type { MetadataRoute } from "next";

const BASE_URL = "https://mes-calculateurs.vercel.app";

// Salaire Brut/Net
const SALAIRE_MONTANTS = [1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3200, 3500, 3800, 4000, 4500, 5000];

// TVA
const TVA_MONTANTS = [50, 100, 150, 200, 300, 500, 1000, 2000, 5000, 10000];
const TVA_TAUX = ["20-pourcent", "10-pourcent", "5-5-pourcent"];

// Pourcentage
const POURC_POURCENTAGES = [5, 10, 15, 20, 25, 30, 50, 75];
const POURC_VALEURS = [100, 200, 500, 1000, 1500, 2000, 5000];

// Pret immobilier
const PRET_MONTANTS = [100000, 150000, 200000, 250000, 300000, 350000, 400000, 500000];
const PRET_DUREES = [15, 20, 25];

// APL
const APL_ZONES = ["1", "2", "3"];
const APL_SITUATIONS = ["seul", "couple"];
const APL_ENFANTS = [0, 1, 2, 3, 4];

// Date Accouchement
const DPA_SEMAINES = Array.from({ length: 38 }, (_, i) => i + 4); // 4 SA a 41 SA

// Heures de Travail
const HT_HEURES = [20, 24, 28, 32, 35, 37, 39, 40, 42, 45, 48];
const HT_TAUX = [12, 13, 15, 18, 20, 25, 30];

// DCA
const DCA_MONTANTS = [50, 100, 150, 200, 300, 500, 1000];
const DCA_ACTIFS = ["sp500", "cac40", "bitcoin"];

// Micro-Entreprise
const MICRO_CA = [10000, 15000, 20000, 25000, 30000, 35000, 40000, 50000, 60000, 70000, 77700];
const MICRO_ACTIVITES = ["services-bnc", "services-bic", "achat-revente", "liberal"];

// Taux Endettement
const ENDETT_REVENUS = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 10000];
const ENDETT_CHARGES = [300, 500, 700, 900, 1000, 1200, 1500, 2000];

// Ovulation
const OVU_CYCLES = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
const OVU_SITUATIONS = ["conception", "regles-irregulieres", "apres-pilule", "allaitement"];

// Bombe Nucleaire
const NUKE_ARMES = ["hiroshima", "nagasaki", "tactique", "trident", "tn75", "sarmat", "b83", "tsar-bomba"];
const NUKE_VILLES = ["paris", "lyon", "marseille", "toulouse", "nice", "lille", "strasbourg", "bordeaux", "nantes", "rennes"];

// Pension Alimentaire
const PENSION_REVENUS = [1500, 2000, 2500, 3000, 3500, 4000, 5000];
const PENSION_ENFANTS = [1, 2, 3, 4];
const PENSION_GARDES = ["classique", "alternee", "reduit"];

// Garde Enfant
const GARDE_REVENUS = [20000, 30000, 40000, 50000, 60000, 80000];
const GARDE_ENFANTS = [1, 2, 3];
const GARDE_MODES = ["creche", "assistante-maternelle", "garde-domicile", "micro-creche"];

// Credit Conso
const CREDIT_MONTANTS = [3000, 5000, 10000, 15000, 20000, 30000, 50000];
const CREDIT_DUREES = [24, 36, 48, 60, 72];

// Bonus Ecologique
const BONUS_VEHICULES = ["renault-5", "peugeot-e208", "citroen-ec3", "dacia-spring", "tesla-model-3", "mg4", "renault-megane", "fiat-500e"];
const BONUS_RFR = ["revenu-modeste", "revenu-intermediaire", "revenu-standard"];

// Prime d'Activite
const PRIME_REVENUS = [800, 1000, 1200, 1400, 1600, 1800, 2000];
const PRIME_SITUATIONS = ["seul", "couple"];
const PRIME_ENFANTS = [0, 1, 2, 3];

// Retraite
const RETRAITE_ANNEES = [1960, 1962, 1964, 1965, 1968, 1970, 1975, 1980, 1985, 1990];
const RETRAITE_SALAIRES = [20000, 25000, 30000, 35000, 40000, 47100];

// Mobilisation
const MOBIL_AGES = [18, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];
const MOBIL_SEXES = ["homme", "femme"];
const MOBIL_PROFILS = ["reserviste", "ancien-militaire", "parent-isole", "profession-sante", "femme-enceinte", "etudiant", "double-nationalite"];

// Autonomie Financiere
const AUTO_EPARGNES = [2000, 5000, 10000, 15000, 20000, 30000, 50000];
const AUTO_ZONES = ["paris", "grande-ville", "ville-moyenne", "rural"];
const AUTO_SITUATIONS = ["seul", "couple", "famille"];

// Budget Survie
const BUDGET_ZONES = ["paris", "grande-ville", "ville-moyenne", "rural"];
const BUDGET_SITUATIONS = ["seul", "couple", "famille"];
const BUDGET_TRANSPORTS = ["transport-commun", "voiture"];

// Salaire Alternant
const ALT_AGES_APP = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
const ALT_ANNEES = [1, 2, 3];
const ALT_AGES_PRO = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
const ALT_NIVEAUX = ["niveau-infra-bac", "niveau-bac"];

// IMC (MANQUANT du sitemap)
const IMC_POIDS = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 110, 120];
const IMC_TAILLES = [155, 160, 165, 170, 175, 180, 185, 190];

// Frais de Notaire dynamiques (MANQUANT du sitemap)
const NOTAIRE_PRIX = [100000, 150000, 200000, 250000, 300000, 350000, 400000, 500000, 600000, 750000, 1000000];
const NOTAIRE_TYPES = ["ancien", "neuf", "terrain"];

// Consommation Electrique (MANQUANT du sitemap)
const CONSO_APPAREILS = ["ampoule-led", "televiseur", "ordinateur-portable", "pc-gamer", "ps5", "lave-linge", "lave-vaisselle", "radiateur-electrique", "refrigerateur", "four-electrique", "micro-ondes", "plaque-induction", "climatisation", "pompe-a-chaleur", "box-internet", "borne-recharge-ve"];

// Indemnite Licenciement (MANQUANT du sitemap)
const LICENC_SALAIRES = [1500, 1800, 2000, 2200, 2500, 2800, 3000, 3500, 4000, 4500, 5000];
const LICENC_ANNEES = [1, 2, 3, 5, 8, 10, 12, 15, 18, 20, 25, 30];

// Convertisseur Devises (MANQUANT du sitemap)
const DEVISES_MONTANTS = [100, 500, 1000, 2000, 5000, 10000];
const DEVISES_PAIRES = ["usd", "gbp", "chf", "cad", "jpy", "mad", "tnd", "dzd", "cny", "try", "aed", "xof"];

// Inflation (MANQUANT du sitemap)
const INFL_MONTANTS = [1000, 1500, 2000, 2500, 3000, 3500, 4000, 5000];
const INFL_ANNEES = [2000, 2005, 2010, 2015, 2018, 2020, 2022, 2023];

// Conversion Temperature
const TEMP_CELSIUS = [-40, -20, -10, 0, 5, 10, 15, 20, 25, 30, 35, 37, 40, 50, 60, 80, 100, 150, 200, 250];
const TEMP_FAHRENHEIT = [-40, 0, 32, 50, 60, 68, 72, 77, 80, 90, 98.6, 100, 120, 140, 160, 180, 200, 212, 300, 350, 400, 450];

// Conversion Poids
const POIDS_KG = [1, 2, 3, 5, 10, 15, 20, 25, 30, 40, 50, 60, 65, 70, 75, 80, 85, 90, 95, 100, 120, 150];
const POIDS_LBS = [1, 5, 10, 20, 50, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 220, 250, 300];

// Conversion Longueur
const LONG_CM = [1, 2, 5, 10, 20, 30, 50, 100, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200];
const LONG_POUCES = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20, 24, 27, 32, 40, 43, 50, 55, 65, 75, 85];

// Interet Compose
const IC_CAPITAUX = [1000, 5000, 10000, 20000, 50000, 100000];
const IC_TAUX = [3, 5, 8, 10];
const IC_DUREES = [10, 20, 30];

// Malus Ecologique
const MALUS_CO2 = [100, 110, 113, 114, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 170, 180, 190, 200, 210, 220];

// PGCD PPCM
const PGCD_PAIRES = [[6,8],[8,12],[10,15],[12,18],[14,21],[15,20],[16,24],[18,27],[20,30],[24,36],[28,42],[30,45],[36,48],[42,56],[48,72],[56,98],[60,84],[72,108],[84,126],[100,75],[120,84],[150,200],[180,252],[252,360]];

// Duree Entre Dates
const DUREE_EVENEMENTS = ["noel-2026","nouvel-an-2027","ete-2026","14-juillet-2026","rentree-2026","toussaint-2026","saint-valentin-2027","paques-2026","halloween-2026","fete-musique-2026"];

// Plus-Value Immobiliere
const PV_PLUS_VALUES = [25000, 50000, 75000, 100000, 150000, 200000];
const PV_ANNEES = [5, 10, 15, 22, 30];

// Rentabilite Locative
const RENTA_PRIX = [80000, 100000, 120000, 150000, 180000, 200000, 250000, 300000, 400000, 500000];
const RENTA_LOYERS = [500, 700, 800, 1000];

// Consommation Essence
const ESS_DISTANCES = [50, 100, 200, 300, 400, 500, 600, 750, 1000, 1500];
const ESS_CONSOS = [5, 6, 7, 8, 10];

// Jours Ouvres
const JO_MOIS = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];

// Moyenne
const MOY_MOYENNES = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const MOY_SUR10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const MOY_SUR100 = [25, 30, 40, 50, 60, 70, 75, 80, 85, 90, 95, 100];

// Produit en Croix
const PRODUIT_EXEMPLES = [
  [2,5,6], [2,5,10], [3,4,9], [3,6,12], [4,5,8], [4,7,12], [5,8,10], [5,3,15],
  [6,10,9], [7,3,14], [8,5,16], [10,4,25], [10,15,20], [12,8,18], [15,20,30],
  [20,50,40], [25,100,50], [50,75,100], [100,250,40], [100,150,200],
];

// Conges Payes
const CP_SALAIRES = [1500, 1800, 2000, 2200, 2500, 2800, 3000, 3500, 4000, 4500, 5000];
const CP_MOIS = [3, 6, 9, 12];

// Age (MANQUANT du sitemap)
const AGE_ANNEES = Array.from({ length: 71 }, (_, i) => 1950 + i);

// Surface Peinture (MANQUANT du sitemap)
const SURF_PIECES: { slug: string; surfaces: number[] }[] = [
  { slug: "chambre", surfaces: [9, 10, 12, 14] },
  { slug: "salon", surfaces: [18, 20, 25, 30, 35] },
  { slug: "cuisine", surfaces: [8, 10, 12, 15] },
  { slug: "salle-de-bain", surfaces: [4, 5, 6, 8] },
  { slug: "bureau", surfaces: [8, 10, 12] },
  { slug: "couloir", surfaces: [4, 6, 8] },
  { slug: "studio", surfaces: [15, 20, 25] },
];

// Epargne (MANQUANT du sitemap)
const EPARGNE_CAPITAUX = [1000, 2000, 5000, 10000, 15000, 20000, 30000, 50000, 100000];
const EPARGNE_PLACEMENTS = ["livret-a", "ldds", "lep", "assurance-vie", "pel"];

// Indemnites Kilometriques (MANQUANT du sitemap)
const KM_DISTANCES = [3000, 5000, 8000, 10000, 12000, 15000, 18000, 20000, 25000, 30000];
const KM_CV = ["3cv", "4cv", "5cv", "6cv", "7cv"];

// Impot Revenu (MANQUANT du sitemap)
const IMPOT_REVENUS = [15000, 18000, 20000, 22000, 25000, 28000, 30000, 32000, 35000, 38000, 40000, 42000, 45000, 48000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 90000, 100000, 120000, 150000];

// Bunker FR (MANQUANT du sitemap)
const BUNKER_PERSONNES = [1, 2, 4, 6, 10];
const BUNKER_DUREES = ["2-semaines", "1-mois", "3-mois", "6-mois", "1-an", "2-ans"];
const BUNKER_TYPES = ["basique", "standard", "nrbc", "luxe"];

// Prix Chauffagiste (MANQUANT du sitemap)
const CHAUFF_PRESTATIONS_SEO = [
  { slug: "chaudiere-gaz-condensation", unite: "forfait", quantites: [] },
  { slug: "pac-air-eau", unite: "forfait", quantites: [] },
  { slug: "pac-air-air", unite: "forfait", quantites: [] },
  { slug: "chauffe-eau-thermodynamique", unite: "forfait", quantites: [] },
  { slug: "chauffe-eau-electrique", unite: "forfait", quantites: [] },
  { slug: "plancher-chauffant", unite: "m2", quantites: [30, 50, 80, 120] },
  { slug: "radiateur", unite: "unites", quantites: [2, 4, 6, 8] },
  { slug: "entretien-chaudiere", unite: "forfait", quantites: [] },
  { slug: "desembouage", unite: "forfait", quantites: [] },
  { slug: "depannage-chauffage", unite: "forfait", quantites: [] },
];
const CHAUFF_REGIONS_SEO = ["ile-de-france", "grandes-villes", "province"];

// Capacite Emprunt
const EMPRUNT_REVENUS = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 10000];
const EMPRUNT_DUREES = [15, 20, 25];

// Prix Macon
const MACON_PRESTATIONS_SEO = [
  { slug: "mur-parpaings", unite: "m2", quantites: [10, 20, 40, 80] },
  { slug: "dalle-beton", unite: "m2", quantites: [10, 20, 40, 80] },
  { slug: "muret-jardin", unite: "ml", quantites: [5, 10, 20, 40] },
  { slug: "ouverture-mur-porteur", unite: "forfait", quantites: [] },
  { slug: "demolition-mur", unite: "m2", quantites: [10, 20, 40, 80] },
  { slug: "ravalement-facade", unite: "m2", quantites: [10, 20, 40, 80] },
  { slug: "enduit-facade", unite: "m2", quantites: [10, 20, 40, 80] },
  { slug: "terrasse-beton", unite: "m2", quantites: [10, 20, 40, 80] },
  { slug: "chape-beton", unite: "m2", quantites: [10, 20, 40, 80] },
  { slug: "pose-cloture", unite: "ml", quantites: [5, 10, 20, 40] },
];
const MACON_REGIONS_SEO = ["ile-de-france", "grandes-villes", "province"];

// Prix Peintre
const PEINTRE_PRESTATIONS_SEO = [
  { slug: "peinture-mur", unite: "m2", quantites: [10, 20, 40, 80] },
  { slug: "peinture-plafond", unite: "m2", quantites: [10, 20, 40, 80] },
  { slug: "peinture-piece", unite: "m2", quantites: [10, 20, 40, 80] },
  { slug: "peinture-facade", unite: "m2", quantites: [10, 20, 40, 80] },
  { slug: "peinture-boiseries", unite: "unites", quantites: [1, 3, 5, 8] },
  { slug: "papier-peint", unite: "m2", quantites: [10, 20, 40, 80] },
  { slug: "lessivage-peinture", unite: "m2", quantites: [10, 20, 40, 80] },
  { slug: "enduit-lissage-peinture", unite: "m2", quantites: [10, 20, 40, 80] },
  { slug: "peinture-decorative", unite: "m2", quantites: [10, 20, 40, 80] },
  { slug: "poncage-peinture", unite: "m2", quantites: [10, 20, 40, 80] },
];
const PEINTRE_REGIONS_SEO = ["ile-de-france", "grandes-villes", "province"];

// Electricien
const ELEC_PRESTATIONS_SEO = [
  { slug: "installation-prise", unite: "unites", quantites: [3, 5, 10, 15] },
  { slug: "point-lumineux", unite: "unites", quantites: [3, 5, 10, 15] },
  { slug: "tableau-electrique", unite: "forfait", quantites: [1] },
  { slug: "renovation-electrique", unite: "m2", quantites: [30, 50, 80, 120] },
  { slug: "radiateur-electrique", unite: "unites", quantites: [2, 4, 6, 8] },
  { slug: "installation-vmc", unite: "forfait", quantites: [1] },
  { slug: "volet-roulant", unite: "unites", quantites: [3, 5, 8, 12] },
  { slug: "diagnostic-electrique", unite: "forfait", quantites: [1] },
  { slug: "borne-recharge-irve", unite: "forfait", quantites: [1] },
  { slug: "mise-en-conformite", unite: "m2", quantites: [30, 50, 80, 120] },
];
const ELEC_REGIONS_SEO = ["ile-de-france", "grandes-villes", "province"];

// Plombier
const PLOMB_PRESTATIONS_SEO = [
  { slug: "installation-robinet", unite: "unites", quantites: [1, 2, 3, 5] },
  { slug: "installation-wc", unite: "unites", quantites: [1, 2, 3] },
  { slug: "chauffe-eau", unite: "forfait", quantites: [1] },
  { slug: "installation-douche", unite: "forfait", quantites: [1] },
  { slug: "remplacement-baignoire", unite: "forfait", quantites: [1] },
  { slug: "debouchage-canalisation", unite: "forfait", quantites: [1] },
  { slug: "chaudiere-gaz", unite: "forfait", quantites: [1] },
  { slug: "salle-de-bain", unite: "m2", quantites: [4, 6, 8, 10] },
  { slug: "adoucisseur-eau", unite: "forfait", quantites: [1] },
  { slug: "recherche-fuite", unite: "forfait", quantites: [1] },
];
const PLOMB_REGIONS_SEO = ["ile-de-france", "grandes-villes", "province"];

// Couvreur
const COUVREUR_PRESTATIONS_SEO = [
  { slug: "reparation-toiture", unite: "m2", quantites: [20, 50, 100, 150] },
  { slug: "renovation-toiture", unite: "m2", quantites: [50, 100, 150, 200] },
  { slug: "demoussage-toiture", unite: "m2", quantites: [50, 100, 150, 200] },
  { slug: "etancheite-terrasse", unite: "m2", quantites: [20, 50, 100, 150] },
  { slug: "isolation-sarking", unite: "m2", quantites: [50, 100, 150, 200] },
  { slug: "isolation-combles", unite: "m2", quantites: [30, 50, 80, 120] },
  { slug: "velux", unite: "unites", quantites: [1, 2, 3] },
  { slug: "gouttiere", unite: "ml", quantites: [10, 20, 40, 60] },
  { slug: "charpente", unite: "m2", quantites: [20, 50, 100, 150] },
  { slug: "zinguerie", unite: "ml", quantites: [10, 20, 40, 60] },
];
const COUVREUR_REGIONS_SEO = ["ile-de-france", "grandes-villes", "province"];

// Blackout
const BLACKOUT_LOGEMENTS = ["appartement", "maison"];
const BLACKOUT_CHAUFFAGES = ["tout-electrique", "gaz", "bois", "mixte"];
const BLACKOUT_PERSONNES = [1, 2, 3, 4, 5];

// --- EN Pages ---
// Nuclear Bomb EN
const EN_NUKE_WEAPONS = ["hiroshima", "nagasaki", "tactical", "trident", "b61", "sarmat", "b83", "tsar-bomba"];
const EN_NUKE_CITIES = ["new-york", "los-angeles", "chicago", "houston", "washington-dc", "miami", "san-francisco", "seattle", "dallas", "denver"];

// Blackout EN
const EN_BLACKOUT_HOUSINGS = ["apartment", "house", "mobile-home"];
const EN_BLACKOUT_HEATINGS = ["all-electric", "natural-gas", "wood", "hybrid"];
const EN_BLACKOUT_PEOPLE = [1, 2, 3, 4, 5];

// Bunker EN
const EN_BUNKER_TYPES = ["basic", "standard", "nbc", "luxury"];
const EN_BUNKER_PEOPLE = [2, 4, 6, 8, 12];
const EN_BUNKER_DURATIONS = ["2-weeks", "1-month", "3-months", "6-months", "1-year", "2-years"];

// Survival Budget EN
const EN_SURVIVAL_ZONES = ["major-metro", "large-city", "mid-city", "rural"];
const EN_SURVIVAL_SITUATIONS = ["single", "couple", "family"];
const EN_SURVIVAL_TRANSPORTS = ["public-transit", "car"];

// Draft EN
const EN_DRAFT_GENDERS = ["male", "female"];
const EN_DRAFT_AGES = [18, 20, 22, 25, 30, 35, 40, 45, 50, 55, 60, 65];
const EN_DRAFT_PROFILES = ["veteran", "national-guard", "single-parent", "healthcare-worker", "college-student", "dual-citizen", "conscientious-objector"];

// Villes (pages SEO locales)
const VILLES_SLUGS = [
  "paris", "boulogne-billancourt", "saint-denis", "versailles",
  "marseille", "lyon", "toulouse", "nice", "nantes", "montpellier", "strasbourg", "bordeaux", "lille", "rennes", "toulon",
  "reims", "saint-etienne", "le-havre", "dijon", "grenoble", "angers", "aix-en-provence", "brest", "le-mans", "clermont-ferrand",
];
const METIERS_PRIX = ["prix-chauffagiste", "prix-plombier", "prix-electricien", "prix-macon", "prix-peintre", "prix-couvreur"];

// Chomage
const CHOMAGE_SALAIRES = [1400, 1600, 1800, 2000, 2200, 2500, 2800, 3000, 3500, 4000, 4500, 5000, 6000];
const CHOMAGE_MOIS = [6, 12, 18, 24];
const CHOMAGE_AGES = [25, 30, 35, 40, 45, 50, 53, 55, 60];

// Calories
const CAL_SEXES = ["homme", "femme"];
const CAL_AGES = [20, 25, 30, 35, 40, 45, 50, 55, 60];
const CAL_POIDS = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
const CAL_ACTIVITES = ["sedentaire", "actif", "sportif"];

const CHUNK_SIZE = 500;

export async function generateSitemaps() {
  const all = generateAllUrls();
  const count = Math.ceil(all.length / CHUNK_SIZE);
  return Array.from({ length: count }, (_, i) => ({ id: i }));
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const all = generateAllUrls();
  return all.slice(id * CHUNK_SIZE, (id + 1) * CHUNK_SIZE);
}

function generateAllUrls(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/salaire-brut-net`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-tva`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-pret-immobilier`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-pourcentage`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-imc`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/frais-de-notaire`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-consommation-electrique`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/indemnite-licenciement`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-age`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/convertisseur-devises`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-surface-peinture`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-epargne`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-heures-travail`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-indemnites-kilometriques`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-impot-revenu`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-date-accouchement`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-dca`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculateur-inflation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-apl`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-calories`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-chomage`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-micro-entreprise`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-taux-endettement`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-ovulation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-pension-alimentaire`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-cout-garde-enfant`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-credit-conso`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-bonus-ecologique`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-prime-activite`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-retraite`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-mobilisation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-bombe-nucleaire`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculateur-autonomie`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculateur-budget-survie`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-salaire-alternant`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-capacite-emprunt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-blackout`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/prix-macon`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/prix-peintre`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/prix-electricien`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/prix-plombier`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/prix-couvreur`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculateurs-finance`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateurs-emploi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculateurs-sante-famille`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/prix-travaux-maison`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/verificateur-devis`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-interet-compose`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-malus-ecologique`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-pgcd-ppcm`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-duree-entre-dates`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-plus-value-immobiliere`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-rentabilite-locative`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-consommation-essence`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-jours-ouvres`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-moyenne`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/produit-en-croix`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-conges-payes`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/conversion-temperature`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/conversion-poids`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/conversion-longueur`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/confidentialite`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Pages dynamiques Salaire Brut/Net
  const salairePages: MetadataRoute.Sitemap = [];
  for (const m of SALAIRE_MONTANTS) {
    salairePages.push({
      url: `${BASE_URL}/salaire-brut-net/${m}-euros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
    salairePages.push({
      url: `${BASE_URL}/salaire-brut-net/${m}-euros-net`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Pages dynamiques TVA
  const tvaPages: MetadataRoute.Sitemap = [];
  for (const m of TVA_MONTANTS) {
    for (const t of TVA_TAUX) {
      tvaPages.push({
        url: `${BASE_URL}/calcul-tva/${m}-euros-ht-${t}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
      tvaPages.push({
        url: `${BASE_URL}/calcul-tva/${m}-euros-ttc-${t}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques Pourcentage
  const pourcentagePages: MetadataRoute.Sitemap = [];
  for (const p of POURC_POURCENTAGES) {
    for (const v of POURC_VALEURS) {
      pourcentagePages.push({
        url: `${BASE_URL}/calcul-pourcentage/${p}-pourcent-de-${v}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques Pret Immobilier
  const pretPages: MetadataRoute.Sitemap = [];
  for (const m of PRET_MONTANTS) {
    for (const d of PRET_DUREES) {
      pretPages.push({
        url: `${BASE_URL}/simulateur-pret-immobilier/${m}-euros-${d}-ans`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques APL
  const aplPages: MetadataRoute.Sitemap = [];
  for (const z of APL_ZONES) {
    for (const s of APL_SITUATIONS) {
      for (const n of APL_ENFANTS) {
        aplPages.push({
          url: `${BASE_URL}/simulateur-apl/zone-${z}-${s}-${n}-enfant${n !== 1 ? "s" : ""}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  // Pages dynamiques Date Accouchement
  const dpaPages: MetadataRoute.Sitemap = [];
  for (const sa of DPA_SEMAINES) {
    dpaPages.push({
      url: `${BASE_URL}/calcul-date-accouchement/enceinte-de-${sa}-semaines`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Pages dynamiques Heures de Travail
  const heuresPages: MetadataRoute.Sitemap = [];
  for (const h of HT_HEURES) {
    for (const t of HT_TAUX) {
      heuresPages.push({
        url: `${BASE_URL}/calcul-heures-travail/${h}-heures-${t}-euros`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques DCA
  const dcaPages: MetadataRoute.Sitemap = [];
  for (const m of DCA_MONTANTS) {
    for (const a of DCA_ACTIFS) {
      dcaPages.push({
        url: `${BASE_URL}/simulateur-dca/${m}-euros-par-mois-${a}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques Calories
  const caloriesPages: MetadataRoute.Sitemap = [];
  for (const sexe of CAL_SEXES) {
    const taille = sexe === "homme" ? 175 : 165;
    for (const age of CAL_AGES) {
      for (const poids of CAL_POIDS) {
        for (const activite of CAL_ACTIVITES) {
          caloriesPages.push({
            url: `${BASE_URL}/calcul-calories/${sexe}-${poids}kg-${taille}cm-${age}ans-${activite}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
          });
        }
      }
    }
  }

  // Pages dynamiques Micro-Entreprise
  const microPages: MetadataRoute.Sitemap = [];
  for (const ca of MICRO_CA) {
    for (const act of MICRO_ACTIVITES) {
      microPages.push({
        url: `${BASE_URL}/simulateur-micro-entreprise/${ca}-euros-${act}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques Chomage
  const chomagePages: MetadataRoute.Sitemap = [];
  for (const s of CHOMAGE_SALAIRES) {
    for (const m of CHOMAGE_MOIS) {
      for (const a of CHOMAGE_AGES) {
        chomagePages.push({
          url: `${BASE_URL}/simulateur-chomage/${s}-euros-${m}-mois-${a}-ans`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  // Pages dynamiques Taux Endettement
  const endettementPages: MetadataRoute.Sitemap = [];
  for (const r of ENDETT_REVENUS) {
    for (const c of ENDETT_CHARGES) {
      if (c < r) {
        endettementPages.push({
          url: `${BASE_URL}/calcul-taux-endettement/${r}-euros-revenus-${c}-euros-charges`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  // Pages dynamiques Ovulation
  const ovulationPages: MetadataRoute.Sitemap = [];
  for (const c of OVU_CYCLES) {
    ovulationPages.push({
      url: `${BASE_URL}/calcul-ovulation/cycle-${c}-jours`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  for (const s of OVU_SITUATIONS) {
    ovulationPages.push({
      url: `${BASE_URL}/calcul-ovulation/ovulation-et-${s}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Pages dynamiques Bombe Nucleaire
  const nukePages: MetadataRoute.Sitemap = [];
  for (const arme of NUKE_ARMES) {
    for (const ville of NUKE_VILLES) {
      nukePages.push({
        url: `${BASE_URL}/simulateur-bombe-nucleaire/${arme}-sur-${ville}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques Pension Alimentaire
  const pensionPages: MetadataRoute.Sitemap = [];
  for (const rev of PENSION_REVENUS) {
    for (const enf of PENSION_ENFANTS) {
      for (const g of PENSION_GARDES) {
        pensionPages.push({
          url: `${BASE_URL}/simulateur-pension-alimentaire/${rev}-euros-${enf}-enfant${enf > 1 ? "s" : ""}-${g}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  // Pages dynamiques Garde Enfant
  const gardePages: MetadataRoute.Sitemap = [];
  for (const r of GARDE_REVENUS) {
    for (const e of GARDE_ENFANTS) {
      for (const m of GARDE_MODES) {
        gardePages.push({
          url: `${BASE_URL}/calcul-cout-garde-enfant/${r}-euros-${e}-enfant${e > 1 ? "s" : ""}-${m}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  // Pages dynamiques Credit Conso
  const creditPages: MetadataRoute.Sitemap = [];
  for (const m of CREDIT_MONTANTS) {
    for (const d of CREDIT_DUREES) {
      creditPages.push({
        url: `${BASE_URL}/simulateur-credit-conso/${m}-euros-${d}-mois`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques Bonus Ecologique
  const bonusPages: MetadataRoute.Sitemap = [];
  for (const v of BONUS_VEHICULES) {
    for (const r of BONUS_RFR) {
      bonusPages.push({
        url: `${BASE_URL}/simulateur-bonus-ecologique/${v}-${r}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques Prime d'Activite
  const primeActivitePages: MetadataRoute.Sitemap = [];
  for (const sit of PRIME_SITUATIONS) {
    for (const enf of PRIME_ENFANTS) {
      for (const rev of PRIME_REVENUS) {
        const slug = enf === 0
          ? `${sit}-${rev}-euros`
          : `${sit}-${enf}-enfant${enf > 1 ? "s" : ""}-${rev}-euros`;
        primeActivitePages.push({
          url: `${BASE_URL}/calcul-prime-activite/${slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  // Pages dynamiques Retraite
  const retraitePages: MetadataRoute.Sitemap = [];
  for (const a of RETRAITE_ANNEES) {
    for (const s of RETRAITE_SALAIRES) {
      retraitePages.push({
        url: `${BASE_URL}/simulateur-retraite/ne-en-${a}-${s}-euros`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques Mobilisation
  const mobilisationPages: MetadataRoute.Sitemap = [];
  for (const sexe of MOBIL_SEXES) {
    for (const age of MOBIL_AGES) {
      mobilisationPages.push({
        url: `${BASE_URL}/simulateur-mobilisation/${sexe}-${age}-ans`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }
  for (const profil of MOBIL_PROFILS) {
    mobilisationPages.push({
      url: `${BASE_URL}/simulateur-mobilisation/${profil}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Pages dynamiques Autonomie Financiere
  const autonomiePages: MetadataRoute.Sitemap = [];
  for (const e of AUTO_EPARGNES) {
    for (const z of AUTO_ZONES) {
      for (const s of AUTO_SITUATIONS) {
        autonomiePages.push({
          url: `${BASE_URL}/calculateur-autonomie/${e}-euros-${z}-${s}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  // Pages dynamiques Budget Survie
  const budgetSurviePages: MetadataRoute.Sitemap = [];
  for (const z of BUDGET_ZONES) {
    for (const s of BUDGET_SITUATIONS) {
      for (const t of BUDGET_TRANSPORTS) {
        budgetSurviePages.push({
          url: `${BASE_URL}/calculateur-budget-survie/${z}-${s}-${t}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  // Pages dynamiques Salaire Alternant
  const alternantPages: MetadataRoute.Sitemap = [];
  for (const age of ALT_AGES_APP) {
    for (const annee of ALT_ANNEES) {
      alternantPages.push({
        url: `${BASE_URL}/simulateur-salaire-alternant/apprentissage-${age}-ans-${annee}e-annee`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }
  for (const age of ALT_AGES_PRO) {
    for (const niveau of ALT_NIVEAUX) {
      alternantPages.push({
        url: `${BASE_URL}/simulateur-salaire-alternant/professionnalisation-${age}-ans-${niveau}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques Capacite Emprunt
  const empruntPages: MetadataRoute.Sitemap = [];
  for (const r of EMPRUNT_REVENUS) {
    for (const d of EMPRUNT_DUREES) {
      empruntPages.push({
        url: `${BASE_URL}/calcul-capacite-emprunt/${r}-euros-${d}-ans`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques Blackout
  const blackoutPages: MetadataRoute.Sitemap = [];
  for (const l of BLACKOUT_LOGEMENTS) {
    for (const c of BLACKOUT_CHAUFFAGES) {
      for (const n of BLACKOUT_PERSONNES) {
        blackoutPages.push({
          url: `${BASE_URL}/simulateur-blackout/${l}-${c}-${n}-personnes`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  // Pages dynamiques Prix Macon
  const maconPages: MetadataRoute.Sitemap = [];
  for (const p of MACON_PRESTATIONS_SEO) {
    for (const r of MACON_REGIONS_SEO) {
      if (p.unite === "forfait") {
        maconPages.push({ url: `${BASE_URL}/prix-macon/${p.slug}-${r}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      } else {
        for (const q of p.quantites) {
          maconPages.push({ url: `${BASE_URL}/prix-macon/${p.slug}-${q}${p.unite}-${r}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
        }
      }
    }
  }

  // Pages dynamiques Prix Peintre
  const peintrePages: MetadataRoute.Sitemap = [];
  for (const p of PEINTRE_PRESTATIONS_SEO) {
    for (const r of PEINTRE_REGIONS_SEO) {
      for (const q of p.quantites) {
        peintrePages.push({ url: `${BASE_URL}/prix-peintre/${p.slug}-${q}${p.unite}-${r}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // Pages dynamiques Prix Electricien
  const elecPages: MetadataRoute.Sitemap = [];
  for (const p of ELEC_PRESTATIONS_SEO) {
    for (const r of ELEC_REGIONS_SEO) {
      if (p.unite === "forfait") {
        elecPages.push({ url: `${BASE_URL}/prix-electricien/${p.slug}-${r}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      } else {
        for (const q of p.quantites) {
          elecPages.push({ url: `${BASE_URL}/prix-electricien/${p.slug}-${q}${p.unite}-${r}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
        }
      }
    }
  }

  // Pages dynamiques Prix Plombier
  const plombPages: MetadataRoute.Sitemap = [];
  for (const p of PLOMB_PRESTATIONS_SEO) {
    for (const r of PLOMB_REGIONS_SEO) {
      if (p.unite === "forfait") {
        plombPages.push({ url: `${BASE_URL}/prix-plombier/${p.slug}-${r}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      } else {
        for (const q of p.quantites) {
          plombPages.push({ url: `${BASE_URL}/prix-plombier/${p.slug}-${q}${p.unite}-${r}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
        }
      }
    }
  }

  // Pages dynamiques Prix Couvreur
  const couvreurPages: MetadataRoute.Sitemap = [];
  for (const p of COUVREUR_PRESTATIONS_SEO) {
    for (const r of COUVREUR_REGIONS_SEO) {
      for (const q of p.quantites) {
        couvreurPages.push({ url: `${BASE_URL}/prix-couvreur/${p.slug}-${q}${p.unite}-${r}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // --- EN Static Pages ---
  const enStaticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/en`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/en/nuclear-bomb-simulator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/en/blackout-simulator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/en/bunker-cost-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/en/survival-budget-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/en/draft-simulator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  // EN Nuclear Bomb dynamic pages
  const enNukePages: MetadataRoute.Sitemap = [];
  for (const w of EN_NUKE_WEAPONS) {
    for (const c of EN_NUKE_CITIES) {
      enNukePages.push({ url: `${BASE_URL}/en/nuclear-bomb-simulator/${w}-on-${c}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // EN Blackout dynamic pages
  const enBlackoutPages: MetadataRoute.Sitemap = [];
  for (const h of EN_BLACKOUT_HOUSINGS) {
    for (const ht of EN_BLACKOUT_HEATINGS) {
      for (const p of EN_BLACKOUT_PEOPLE) {
        enBlackoutPages.push({ url: `${BASE_URL}/en/blackout-simulator/${h}-${ht}-${p}-people`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // EN Bunker dynamic pages
  const enBunkerPages: MetadataRoute.Sitemap = [];
  for (const t of EN_BUNKER_TYPES) {
    for (const p of EN_BUNKER_PEOPLE) {
      for (const d of EN_BUNKER_DURATIONS) {
        enBunkerPages.push({ url: `${BASE_URL}/en/bunker-cost-calculator/${t}-${p}-people-${d}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // EN Survival Budget dynamic pages
  const enSurvivalPages: MetadataRoute.Sitemap = [];
  for (const z of EN_SURVIVAL_ZONES) {
    for (const s of EN_SURVIVAL_SITUATIONS) {
      for (const t of EN_SURVIVAL_TRANSPORTS) {
        enSurvivalPages.push({ url: `${BASE_URL}/en/survival-budget-calculator/${z}-${s}-${t}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // EN Draft dynamic pages
  const enDraftPages: MetadataRoute.Sitemap = [];
  for (const g of EN_DRAFT_GENDERS) {
    for (const a of EN_DRAFT_AGES) {
      enDraftPages.push({ url: `${BASE_URL}/en/draft-simulator/${g}-${a}-years-old`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }
  for (const p of EN_DRAFT_PROFILES) {
    enDraftPages.push({ url: `${BASE_URL}/en/draft-simulator/${p}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques IMC
  const imcPages: MetadataRoute.Sitemap = [];
  for (const p of IMC_POIDS) {
    for (const t of IMC_TAILLES) {
      imcPages.push({ url: `${BASE_URL}/calcul-imc/${p}-kg-${t}-cm`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Frais de Notaire
  const notairePages: MetadataRoute.Sitemap = [];
  for (const p of NOTAIRE_PRIX) {
    for (const t of NOTAIRE_TYPES) {
      notairePages.push({ url: `${BASE_URL}/frais-de-notaire/${p}-euros-${t}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Consommation Electrique
  const consoPages: MetadataRoute.Sitemap = [];
  for (const a of CONSO_APPAREILS) {
    consoPages.push({ url: `${BASE_URL}/calcul-consommation-electrique/${a}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Indemnite Licenciement
  const licenciementPages: MetadataRoute.Sitemap = [];
  for (const s of LICENC_SALAIRES) {
    for (const a of LICENC_ANNEES) {
      licenciementPages.push({ url: `${BASE_URL}/indemnite-licenciement/${s}-euros-${a}-ans`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Convertisseur Devises
  const devisesPages: MetadataRoute.Sitemap = [];
  for (const m of DEVISES_MONTANTS) {
    for (const d of DEVISES_PAIRES) {
      devisesPages.push({ url: `${BASE_URL}/convertisseur-devises/${m}-euros-en-${d}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Inflation
  const inflationPages: MetadataRoute.Sitemap = [];
  for (const m of INFL_MONTANTS) {
    for (const a of INFL_ANNEES) {
      inflationPages.push({ url: `${BASE_URL}/calculateur-inflation/${m}-euros-depuis-${a}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Age
  const agePages: MetadataRoute.Sitemap = [];
  for (const a of AGE_ANNEES) {
    agePages.push({ url: `${BASE_URL}/calcul-age/ne-en-${a}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Surface Peinture
  const surfPeinturePages: MetadataRoute.Sitemap = [];
  for (const piece of SURF_PIECES) {
    for (const s of piece.surfaces) {
      surfPeinturePages.push({ url: `${BASE_URL}/calcul-surface-peinture/${piece.slug}-${s}-m2`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Epargne
  const epargnePages: MetadataRoute.Sitemap = [];
  for (const c of EPARGNE_CAPITAUX) {
    for (const p of EPARGNE_PLACEMENTS) {
      epargnePages.push({ url: `${BASE_URL}/simulateur-epargne/${c}-euros-${p}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Indemnites Kilometriques
  const kmPages: MetadataRoute.Sitemap = [];
  for (const d of KM_DISTANCES) {
    for (const cv of KM_CV) {
      kmPages.push({ url: `${BASE_URL}/calcul-indemnites-kilometriques/${d}-km-${cv}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Impot Revenu
  const impotPages: MetadataRoute.Sitemap = [];
  for (const r of IMPOT_REVENUS) {
    impotPages.push({ url: `${BASE_URL}/simulateur-impot-revenu/${r}-euros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Bunker FR
  const bunkerPages: MetadataRoute.Sitemap = [];
  for (const p of BUNKER_PERSONNES) {
    for (const d of BUNKER_DUREES) {
      for (const t of BUNKER_TYPES) {
        bunkerPages.push({ url: `${BASE_URL}/simulateur-bunker/${p}-personne${p > 1 ? "s" : ""}-${d}-${t}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // Pages dynamiques Prix Chauffagiste
  const chauffPages: MetadataRoute.Sitemap = [];
  for (const p of CHAUFF_PRESTATIONS_SEO) {
    for (const r of CHAUFF_REGIONS_SEO) {
      if (p.unite === "forfait") {
        chauffPages.push({ url: `${BASE_URL}/prix-chauffagiste/${p.slug}-${r}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      } else {
        for (const q of p.quantites) {
          chauffPages.push({ url: `${BASE_URL}/prix-chauffagiste/${p.slug}-${q}${p.unite}-${r}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
        }
      }
    }
  }

  // Pages dynamiques Conversion Temperature
  const tempPages: MetadataRoute.Sitemap = [];
  for (const c of TEMP_CELSIUS) {
    tempPages.push({ url: `${BASE_URL}/conversion-temperature/${c}-celsius-en-fahrenheit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }
  for (const f of TEMP_FAHRENHEIT) {
    tempPages.push({ url: `${BASE_URL}/conversion-temperature/${f}-fahrenheit-en-celsius`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Conversion Poids
  const poidsPages: MetadataRoute.Sitemap = [];
  for (const kg of POIDS_KG) {
    poidsPages.push({ url: `${BASE_URL}/conversion-poids/${kg}-kg-en-livres`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }
  for (const lbs of POIDS_LBS) {
    poidsPages.push({ url: `${BASE_URL}/conversion-poids/${lbs}-livres-en-kg`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Conversion Longueur
  const longueurPages: MetadataRoute.Sitemap = [];
  for (const cm of LONG_CM) {
    longueurPages.push({ url: `${BASE_URL}/conversion-longueur/${cm}-cm-en-pouces`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }
  for (const p of LONG_POUCES) {
    longueurPages.push({ url: `${BASE_URL}/conversion-longueur/${p}-pouces-en-cm`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Interet Compose
  const icPages: MetadataRoute.Sitemap = [];
  for (const c of IC_CAPITAUX) {
    for (const t of IC_TAUX) {
      for (const d of IC_DUREES) {
        icPages.push({ url: `${BASE_URL}/calcul-interet-compose/${c}-euros-${t}-pourcent-${d}-ans`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // Pages dynamiques Malus Ecologique
  const malusPages: MetadataRoute.Sitemap = [];
  for (const co2 of MALUS_CO2) {
    malusPages.push({ url: `${BASE_URL}/calcul-malus-ecologique/${co2}-g-co2`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques PGCD PPCM
  const pgcdPages: MetadataRoute.Sitemap = [];
  for (const [a, b] of PGCD_PAIRES) {
    pgcdPages.push({ url: `${BASE_URL}/calcul-pgcd-ppcm/${a}-et-${b}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Duree Entre Dates
  const dureePages: MetadataRoute.Sitemap = [];
  for (const ev of DUREE_EVENEMENTS) {
    dureePages.push({ url: `${BASE_URL}/calcul-duree-entre-dates/${ev}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Plus-Value Immobiliere
  const pvImmoPages: MetadataRoute.Sitemap = [];
  for (const pv of PV_PLUS_VALUES) {
    for (const a of PV_ANNEES) {
      pvImmoPages.push({ url: `${BASE_URL}/calcul-plus-value-immobiliere/200000-euros-plus-value-${pv}-euros-${a}-ans`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }
  for (const pa of [100000, 150000, 200000, 250000, 300000, 400000, 500000]) {
    pvImmoPages.push({ url: `${BASE_URL}/calcul-plus-value-immobiliere/${pa}-euros-plus-value-100000-euros-10-ans`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Rentabilite Locative
  const rentaPages: MetadataRoute.Sitemap = [];
  for (const p of RENTA_PRIX) {
    for (const l of RENTA_LOYERS) {
      rentaPages.push({ url: `${BASE_URL}/calcul-rentabilite-locative/${p}-euros-${l}-euros-mois`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Consommation Essence
  const essencePages: MetadataRoute.Sitemap = [];
  for (const d of ESS_DISTANCES) {
    for (const c of ESS_CONSOS) {
      essencePages.push({ url: `${BASE_URL}/calcul-consommation-essence/${d}-km-${c}-litres`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Jours Ouvres
  const joPages: MetadataRoute.Sitemap = [];
  for (const m of JO_MOIS) {
    joPages.push({ url: `${BASE_URL}/calcul-jours-ouvres/${m}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Calcul Moyenne
  const moyennePages: MetadataRoute.Sitemap = [];
  for (const m of MOY_MOYENNES) {
    moyennePages.push({ url: `${BASE_URL}/calcul-moyenne/${m}-sur-20`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }
  for (const m of MOY_SUR10) {
    moyennePages.push({ url: `${BASE_URL}/calcul-moyenne/${m}-sur-10`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }
  for (const m of MOY_SUR100) {
    moyennePages.push({ url: `${BASE_URL}/calcul-moyenne/${m}-sur-100`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Produit en Croix
  const produitPages: MetadataRoute.Sitemap = [];
  for (const [a, b, c] of PRODUIT_EXEMPLES) {
    produitPages.push({ url: `${BASE_URL}/produit-en-croix/${a}-sur-${b}-egale-${c}-sur-x`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Conges Payes
  const cpPages: MetadataRoute.Sitemap = [];
  for (const s of CP_SALAIRES) {
    for (const m of CP_MOIS) {
      cpPages.push({ url: `${BASE_URL}/calcul-conges-payes/${s}-euros-${m}-mois`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages ville par metier (25 villes x 6 metiers = 150 pages)
  const villePages: MetadataRoute.Sitemap = [];
  for (const metier of METIERS_PRIX) {
    for (const ville of VILLES_SLUGS) {
      villePages.push({ url: `${BASE_URL}/${metier}/${ville}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 });
    }
  }

  return [
    ...staticPages,
    ...salairePages,
    ...tvaPages,
    ...pourcentagePages,
    ...pretPages,
    ...aplPages,
    ...dpaPages,
    ...heuresPages,
    ...dcaPages,
    ...caloriesPages,
    ...chomagePages,
    ...microPages,
    ...ovulationPages,
    ...endettementPages,
    ...pensionPages,
    ...gardePages,
    ...creditPages,
    ...bonusPages,
    ...primeActivitePages,
    ...retraitePages,
    ...mobilisationPages,
    ...nukePages,
    ...alternantPages,
    ...budgetSurviePages,
    ...autonomiePages,
    ...blackoutPages,
    ...empruntPages,
    ...maconPages,
    ...peintrePages,
    ...elecPages,
    ...plombPages,
    ...couvreurPages,
    ...imcPages,
    ...notairePages,
    ...consoPages,
    ...licenciementPages,
    ...devisesPages,
    ...inflationPages,
    ...agePages,
    ...surfPeinturePages,
    ...epargnePages,
    ...kmPages,
    ...impotPages,
    ...bunkerPages,
    ...chauffPages,
    ...villePages,
    ...enStaticPages,
    ...enNukePages,
    ...enBlackoutPages,
    ...enBunkerPages,
    ...enSurvivalPages,
    ...enDraftPages,
    ...tempPages,
    ...poidsPages,
    ...longueurPages,
    ...icPages,
    ...malusPages,
    ...pgcdPages,
    ...dureePages,
    ...pvImmoPages,
    ...rentaPages,
    ...essencePages,
    ...joPages,
    ...moyennePages,
    ...produitPages,
    ...cpPages,
  ];
}
