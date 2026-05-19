export type SitemapEntry = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
};

export const BASE_URL = "https://mescalculateurs.fr";
export const CHUNK_SIZE = 500;

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

// Pension Reversion
const REVERSION_PENSIONS = [800, 1000, 1200, 1500, 1800, 2000, 2500, 3000];

// Surface Cercle
const CERCLE_RAYONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 50, 100];

// Volume Cylindre
const CYLINDRE_COMBOS = [[2,5],[3,8],[5,10],[5,15],[5,20],[7,10],[10,10],[10,15],[10,20],[10,30],[15,20],[15,30],[20,30],[20,40],[25,50],[30,50]];

// Racine Carree
const RACINE_NOMBRES = [2, 3, 4, 5, 7, 8, 9, 10, 12, 15, 16, 20, 25, 27, 32, 36, 49, 50, 64, 75, 81, 100, 121, 125, 144, 169, 196, 200, 225, 256, 289, 324, 361, 400, 500, 625, 729, 900, 1000, 10000];

// Ascendant Astrologique
const ASTRO_SIGNES = ["belier","taureau","gemeaux","cancer","lion","vierge","balance","scorpion","sagittaire","capricorne","verseau","poissons"];

// Gratification Stage
const STAGE_DUREES = [1, 2, 3, 4, 5, 6];
const STAGE_HEURES = [20, 25, 28, 35];

// Droits Succession
const SUCC_MONTANTS = [100000, 200000, 300000, 400000, 500000, 750000, 1000000];
const SUCC_HERITIERS = [1, 2, 3];

// Cout Kilometrique
const CK_DISTANCES = [3000, 5000, 8000, 10000, 12000, 15000, 20000, 25000, 30000];
const CK_CV = ["3cv", "4cv", "5cv", "6cv", "7cv"];

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

// Metabolisme de Base
const MB_SEXES = ["homme", "femme"];
const MB_POIDS = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
const MB_AGES = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65];

// Proteines
const PROT_POIDS = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
const PROT_ACTIVITES = ["sedentaire", "actif", "sportif", "musculation", "endurance"];

// Macros
const MACROS_CALORIES = [1400, 1600, 1800, 2000, 2200, 2500, 2800, 3000, 3500];
const MACROS_OBJECTIFS = ["maintien", "perte", "prise", "seche", "cetogene"];

// Age Metabolique
const AM_SEXES = ["homme", "femme"];
const AM_AGES = [25, 30, 35, 40, 45, 50, 55, 60, 65];
const AM_ACTIVITES = ["sedentaire", "leger", "modere", "actif", "intense"];

// Risque Cardiovasculaire
const RC_SEXES = ["homme", "femme"];
const RC_AGES = [30, 35, 40, 45, 50, 55, 60, 65, 70];
const RC_PROFILS = ["sans-facteur", "fumeur", "diabetique", "hypertension", "cholesterol-eleve"];

// DPE
const DPE_SURFACES = [30, 50, 70, 90, 110, 130, 150];
const DPE_CHAUFFAGES = ["electrique", "gaz", "fioul", "pac", "bois"];
const DPE_EPOQUES = ["avant-1975", "1975-1989", "1990-2005", "2006-2012", "apres-2012"];

// Credit Auto
const CA_MONTANTS = [10000, 15000, 20000, 25000, 30000, 35000, 40000, 50000];
const CA_DUREES = [24, 36, 48, 60, 72];

// Paris sportifs
const PARI_MISES = [1, 5, 10, 20, 50, 100, 500];
const PARI_COTES_SLUGS = ["1-25", "1-50", "1-80", "2-00", "2-50", "3-00", "5-00", "10-00"];
const COMBINE_NB = [2, 3, 4, 5];
const COMBINE_COTES = ["1-50", "1-80", "2-00", "2-50", "3-00"];
const COMBINE_MISES = [5, 10, 20, 50];
const PROBA_COTES = ["1-10", "1-25", "1-50", "1-80", "2-00", "2-25", "2-50", "3-00", "4-00", "5-00", "7-00", "10-00"];

let _cachedAll: SitemapEntry[] | null = null;
export function getAllUrls(): SitemapEntry[] {
  if (_cachedAll === null) _cachedAll = generateAllUrls();
  return _cachedAll;
}

export function getSitemapsCount(): number {
  return Math.ceil(getAllUrls().length / CHUNK_SIZE);
}

export function getSitemapChunk(id: number): SitemapEntry[] {
  const all = getAllUrls();
  const safeId = Number.isFinite(id) && id >= 0 ? Math.floor(id) : 0;
  const start = safeId * CHUNK_SIZE;
  const end = start + CHUNK_SIZE;
  return all.slice(start, end);
}

function generateAllUrls(): SitemapEntry[] {
  const staticPages: SitemapEntry[] = [
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
      url: `${BASE_URL}/calcul-masse-grasse`,
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
      url: `${BASE_URL}/calcul-poids-ideal`,
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
      url: `${BASE_URL}/simulateur-facture-gaz`,
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
      url: `${BASE_URL}/calculateurs-immobilier`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculateurs-nutrition`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculateurs-mathematiques`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/convertisseurs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateurs-auto`,
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
      url: `${BASE_URL}/calcul-score-stress`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-electrique-vs-thermique`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-vignette-critair`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-remboursement-mutuelle`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-allocation-familiale`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-taxe-fonciere`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-assurance-emprunteur`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-rendement-scpi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-rente-viagere`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-ifi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-impot-societe`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-amende-exces-vitesse`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-loa-lld`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-indice-inflammation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-prestation-compensatoire`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-prise-poids-grossesse`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-amortissement-lmnp`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-dividendes`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/audit-frais-bancaires`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-pension-reversion`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-surface-cercle`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-volume-cylindre`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-racine-carree`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-ascendant-astrologique`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-gratification-stage`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-droits-succession`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-cout-voiture`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-cout-kilometrique`,
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
      url: `${BASE_URL}/calcul-revenus-fonciers`,
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
      url: `${BASE_URL}/calcul-metabolisme-base`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-proteines`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-besoin-sommeil`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-macros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-consommation-eau`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-indice-glycemique`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-age-metabolique`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-risque-cardiovasculaire`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculateur-dpe`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-credit-auto`,
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
    {
      url: `${BASE_URL}/embed`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/integrateurs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Pages dynamiques Salaire Brut/Net
  const salairePages: SitemapEntry[] = [];
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
  for (const v of VILLES_SLUGS) {
    salairePages.push({ url: `${BASE_URL}/salaire-brut-net/${v}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 });
  }

  // Pages dynamiques TVA
  const tvaPages: SitemapEntry[] = [];
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
  const pourcentagePages: SitemapEntry[] = [];
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
  const pretPages: SitemapEntry[] = [];
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
  for (const v of VILLES_SLUGS) {
    pretPages.push({ url: `${BASE_URL}/simulateur-pret-immobilier/${v}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 });
  }

  // Pages dynamiques APL
  const aplPages: SitemapEntry[] = [];
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
  const dpaPages: SitemapEntry[] = [];
  for (const sa of DPA_SEMAINES) {
    dpaPages.push({
      url: `${BASE_URL}/calcul-date-accouchement/enceinte-de-${sa}-semaines`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Pages dynamiques Heures de Travail
  const heuresPages: SitemapEntry[] = [];
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
  const dcaPages: SitemapEntry[] = [];
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
  const caloriesPages: SitemapEntry[] = [];
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
  const microPages: SitemapEntry[] = [];
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
  const chomagePages: SitemapEntry[] = [];
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
  const endettementPages: SitemapEntry[] = [];
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
  const ovulationPages: SitemapEntry[] = [];
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
  const nukePages: SitemapEntry[] = [];
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
  const pensionPages: SitemapEntry[] = [];
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
  const gardePages: SitemapEntry[] = [];
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
  const creditPages: SitemapEntry[] = [];
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
  const bonusPages: SitemapEntry[] = [];
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
  const primeActivitePages: SitemapEntry[] = [];
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
  const retraitePages: SitemapEntry[] = [];
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
  const mobilisationPages: SitemapEntry[] = [];
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
  const autonomiePages: SitemapEntry[] = [];
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
  const budgetSurviePages: SitemapEntry[] = [];
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
  const alternantPages: SitemapEntry[] = [];
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
  const empruntPages: SitemapEntry[] = [];
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
  const blackoutPages: SitemapEntry[] = [];
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
  const maconPages: SitemapEntry[] = [];
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
  const peintrePages: SitemapEntry[] = [];
  for (const p of PEINTRE_PRESTATIONS_SEO) {
    for (const r of PEINTRE_REGIONS_SEO) {
      for (const q of p.quantites) {
        peintrePages.push({ url: `${BASE_URL}/prix-peintre/${p.slug}-${q}${p.unite}-${r}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // Pages dynamiques Prix Electricien
  const elecPages: SitemapEntry[] = [];
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
  const plombPages: SitemapEntry[] = [];
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
  const couvreurPages: SitemapEntry[] = [];
  for (const p of COUVREUR_PRESTATIONS_SEO) {
    for (const r of COUVREUR_REGIONS_SEO) {
      for (const q of p.quantites) {
        couvreurPages.push({ url: `${BASE_URL}/prix-couvreur/${p.slug}-${q}${p.unite}-${r}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // --- EN Static Pages ---
  const enStaticPages: SitemapEntry[] = [
    { url: `${BASE_URL}/en`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/en/nuclear-bomb-simulator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/en/blackout-simulator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/en/bunker-cost-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/en/survival-budget-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/en/draft-simulator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  // EN Nuclear Bomb dynamic pages
  const enNukePages: SitemapEntry[] = [];
  for (const w of EN_NUKE_WEAPONS) {
    for (const c of EN_NUKE_CITIES) {
      enNukePages.push({ url: `${BASE_URL}/en/nuclear-bomb-simulator/${w}-on-${c}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // EN Blackout dynamic pages
  const enBlackoutPages: SitemapEntry[] = [];
  for (const h of EN_BLACKOUT_HOUSINGS) {
    for (const ht of EN_BLACKOUT_HEATINGS) {
      for (const p of EN_BLACKOUT_PEOPLE) {
        enBlackoutPages.push({ url: `${BASE_URL}/en/blackout-simulator/${h}-${ht}-${p}-people`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // EN Bunker dynamic pages
  const enBunkerPages: SitemapEntry[] = [];
  for (const t of EN_BUNKER_TYPES) {
    for (const p of EN_BUNKER_PEOPLE) {
      for (const d of EN_BUNKER_DURATIONS) {
        enBunkerPages.push({ url: `${BASE_URL}/en/bunker-cost-calculator/${t}-${p}-people-${d}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // EN Survival Budget dynamic pages
  const enSurvivalPages: SitemapEntry[] = [];
  for (const z of EN_SURVIVAL_ZONES) {
    for (const s of EN_SURVIVAL_SITUATIONS) {
      for (const t of EN_SURVIVAL_TRANSPORTS) {
        enSurvivalPages.push({ url: `${BASE_URL}/en/survival-budget-calculator/${z}-${s}-${t}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // EN Draft dynamic pages
  const enDraftPages: SitemapEntry[] = [];
  for (const g of EN_DRAFT_GENDERS) {
    for (const a of EN_DRAFT_AGES) {
      enDraftPages.push({ url: `${BASE_URL}/en/draft-simulator/${g}-${a}-years-old`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }
  for (const p of EN_DRAFT_PROFILES) {
    enDraftPages.push({ url: `${BASE_URL}/en/draft-simulator/${p}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // --- BE Static Pages (Belgique) ---
  const beStaticPages: SitemapEntry[] = [
    { url: `${BASE_URL}/be`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/be/salaire-brut-net`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/be/calcul-tva`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/be/droits-enregistrement`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/be/precompte-immobilier`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/be/simulateur-pret-immobilier`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/be/indemnite-licenciement`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/be/simulateur-chomage`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/be/droits-succession`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/be/calcul-capacite-emprunt`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/be/pension-alimentaire`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/be/indemnite-kilometrique`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/be/simulateur-dividendes`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/be/simulateur-isoc`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/be/allocations-familiales`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/be/atn-voiture-societe`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/be/conges-payes`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/be/plus-value-immobiliere`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  // --- BE Dynamic Pages ---
  // TVA BE : montant x taux
  const BE_TVA_MONTANTS = [50, 100, 200, 500, 1000, 2000, 5000, 10000];
  const BE_TVA_TAUX = ["21", "12", "6"];
  const beTvaPages: SitemapEntry[] = [];
  for (const m of BE_TVA_MONTANTS) {
    for (const t of BE_TVA_TAUX) {
      beTvaPages.push({ url: `${BASE_URL}/be/calcul-tva/${m}-euros-${t}-pourcent`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Salaire BE : brut/net x situation familiale
  const BE_SAL_BRUT = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000];
  const BE_SAL_NET = [1200, 1500, 1800, 2000, 2300, 2500, 2800, 3000, 3500, 4000, 4500];
  const BE_SAL_SITUATIONS = ["isole", "marie-1-revenu", "marie-2-revenus"];
  const beSalairePages: SitemapEntry[] = [];
  for (const b of BE_SAL_BRUT) {
    for (const s of BE_SAL_SITUATIONS) {
      beSalairePages.push({ url: `${BASE_URL}/be/salaire-brut-net/${b}-euros-${s}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }
  for (const n of BE_SAL_NET) {
    for (const s of BE_SAL_SITUATIONS) {
      beSalairePages.push({ url: `${BASE_URL}/be/salaire-brut-net/${n}-euros-net-${s}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Droits d'enregistrement BE : prix x region x statut
  const BE_DROITS_PRIX = [100000, 150000, 200000, 250000, 300000, 350000, 400000, 500000];
  const BE_DROITS_REGIONS = ["wallonie", "flandre", "bruxelles"];
  const BE_DROITS_STATUTS = ["habitation-unique", "investissement"];
  const beDroitsPages: SitemapEntry[] = [];
  for (const p of BE_DROITS_PRIX) {
    for (const r of BE_DROITS_REGIONS) {
      for (const s of BE_DROITS_STATUTS) {
        beDroitsPages.push({ url: `${BASE_URL}/be/droits-enregistrement/${p}-euros-${r}-${s}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // Precompte immobilier BE : RC x region
  const BE_PRECOMPTE_RC = [500, 800, 1000, 1200, 1500, 2000, 3000, 5000];
  const BE_PRECOMPTE_REGIONS = ["wallonie", "flandre", "bruxelles"];
  const bePrecomptePages: SitemapEntry[] = [];
  for (const rc of BE_PRECOMPTE_RC) {
    for (const r of BE_PRECOMPTE_REGIONS) {
      bePrecomptePages.push({ url: `${BASE_URL}/be/precompte-immobilier/${rc}-rc-${r}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pret immobilier BE : montant x duree
  const BE_PRET_MONTANTS = [100000, 150000, 200000, 250000, 300000, 350000, 400000, 500000, 600000];
  const BE_PRET_DUREES = [15, 20, 25, 30];
  const bePretPages: SitemapEntry[] = [];
  for (const m of BE_PRET_MONTANTS) {
    for (const d of BE_PRET_DUREES) {
      bePretPages.push({ url: `${BASE_URL}/be/simulateur-pret-immobilier/${m}-euros-${d}-ans`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Indemnite licenciement BE : brut x annees
  const BE_LICENC_BRUTS = [2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000];
  const BE_LICENC_ANNEES = [1, 2, 5, 10, 15, 20, 25, 30];
  const beLicenciementPages: SitemapEntry[] = [];
  for (const b of BE_LICENC_BRUTS) {
    for (const a of BE_LICENC_ANNEES) {
      beLicenciementPages.push({ url: `${BASE_URL}/be/indemnite-licenciement/${b}-euros-${a}-ans`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Chomage BE : brut x situation x mois
  const BE_CHOMAGE_BRUTS = [1800, 2000, 2400, 2800, 3000, 3500, 4000, 5000];
  const BE_CHOMAGE_SITUATIONS = ["isole", "chef-famille", "cohabitant"];
  const BE_CHOMAGE_MOIS = [3, 6, 12, 18, 24];
  const beChomagePages: SitemapEntry[] = [];
  for (const b of BE_CHOMAGE_BRUTS) {
    for (const s of BE_CHOMAGE_SITUATIONS) {
      for (const m of BE_CHOMAGE_MOIS) {
        beChomagePages.push({ url: `${BASE_URL}/be/simulateur-chomage/${b}-euros-${s}-${m}-mois`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // Succession BE : patrimoine x region x heritiers
  const BE_SUCC_PATRIMOINES = [100000, 200000, 300000, 500000, 750000, 1000000, 1500000];
  const BE_SUCC_REGIONS = ["wallonie", "flandre", "bruxelles"];
  const BE_SUCC_HERITIERS = [1, 2, 3];
  const beSuccPages: SitemapEntry[] = [];
  for (const p of BE_SUCC_PATRIMOINES) {
    for (const r of BE_SUCC_REGIONS) {
      for (const h of BE_SUCC_HERITIERS) {
        beSuccPages.push({ url: `${BASE_URL}/be/droits-succession/${p}-euros-${r}-${h}-heritier${h > 1 ? "s" : ""}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // Capacite emprunt BE : revenu x duree
  const BE_CAPACITE_REVENUS = [1800, 2000, 2500, 3000, 3500, 4000, 5000, 6000, 8000];
  const BE_CAPACITE_DUREES = [15, 20, 25, 30];
  const beCapacitePages: SitemapEntry[] = [];
  for (const r of BE_CAPACITE_REVENUS) {
    for (const d of BE_CAPACITE_DUREES) {
      beCapacitePages.push({ url: `${BASE_URL}/be/calcul-capacite-emprunt/${r}-euros-${d}-ans`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pension alimentaire BE : revenu1 x revenu2 x age x nbenfants
  const BE_PENSION_REVENUS1 = [2000, 3000, 4000, 5000];
  const BE_PENSION_REVENUS2 = [0, 1500, 2500, 3500];
  const BE_PENSION_AGES = [5, 10, 15];
  const BE_PENSION_ENFANTS = [1, 2, 3];
  const bePensionPages: SitemapEntry[] = [];
  for (const r1 of BE_PENSION_REVENUS1) {
    for (const r2 of BE_PENSION_REVENUS2) {
      for (const a of BE_PENSION_AGES) {
        for (const e of BE_PENSION_ENFANTS) {
          bePensionPages.push({ url: `${BASE_URL}/be/pension-alimentaire/${r1}-euros-${r2}-euros-${a}-ans-${e}-enfant`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
        }
      }
    }
  }

  // Indemnite kilometrique BE : distance x regime
  const BE_KM_DISTANCES = [1000, 3000, 5000, 8000, 10000, 15000, 20000, 25000, 30000];
  const BE_KM_REGIMES = ["trimestrielle", "annuelle", "fonctionnaire", "fraisReels"];
  const beKmPages: SitemapEntry[] = [];
  for (const d of BE_KM_DISTANCES) {
    for (const r of BE_KM_REGIMES) {
      beKmPages.push({ url: `${BASE_URL}/be/indemnite-kilometrique/${d}-km-${r}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Dividendes BE : montant x regime
  const BE_DIV_MONTANTS = [500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];
  const BE_DIV_REGIMES = ["standard-30", "vvprbis-15", "liquidation-6.5"];
  const beDividendesPages: SitemapEntry[] = [];
  for (const m of BE_DIV_MONTANTS) {
    for (const r of BE_DIV_REGIMES) {
      beDividendesPages.push({ url: `${BASE_URL}/be/simulateur-dividendes/${m}-euros-${r}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // ISOC BE : benefice x statut
  const BE_ISOC_BENEFICES = [10000, 25000, 50000, 75000, 100000, 150000, 250000, 500000, 1000000];
  const BE_ISOC_STATUTS = ["pme", "non-pme"];
  const beIsocPages: SitemapEntry[] = [];
  for (const b of BE_ISOC_BENEFICES) {
    for (const s of BE_ISOC_STATUTS) {
      beIsocPages.push({ url: `${BASE_URL}/be/simulateur-isoc/${b}-euros-${s}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Allocations familiales BE : region x enfants x age moyen
  const BE_ALLOC_REGIONS = ["wallonie", "flandre", "bruxelles"];
  const BE_ALLOC_ENFANTS = [1, 2, 3, 4];
  const BE_ALLOC_AGES = [3, 8, 12, 15];
  const beAllocPages: SitemapEntry[] = [];
  for (const r of BE_ALLOC_REGIONS) {
    for (const n of BE_ALLOC_ENFANTS) {
      for (const a of BE_ALLOC_AGES) {
        beAllocPages.push({ url: `${BASE_URL}/be/allocations-familiales/${r}-${n}-enfants-${a}-ans`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // ATN voiture societe BE : valeur x co2 x carburant
  const BE_ATN_VALEURS = [20000, 30000, 40000, 50000, 70000];
  const BE_ATN_CO2 = [100, 120, 150, 180];
  const BE_ATN_CARBURANTS_TH = ["essence", "diesel"];
  const beAtnPages: SitemapEntry[] = [];
  for (const v of BE_ATN_VALEURS) {
    for (const c of BE_ATN_CARBURANTS_TH) {
      for (const co2 of BE_ATN_CO2) {
        beAtnPages.push({ url: `${BASE_URL}/be/atn-voiture-societe/${v}-euros-${co2}g-${c}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
    // Electrique : co2=0 uniquement
    beAtnPages.push({ url: `${BASE_URL}/be/atn-voiture-societe/${v}-euros-0g-electrique`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Conges payes BE : brut x statut x mois
  const BE_CONGES_BRUTS = [2000, 2500, 3000, 3500, 4000, 5000];
  const BE_CONGES_STATUTS = ["employe", "ouvrier"];
  const BE_CONGES_MOIS = [6, 9, 12];
  const beCongesPages: SitemapEntry[] = [];
  for (const b of BE_CONGES_BRUTS) {
    for (const s of BE_CONGES_STATUTS) {
      for (const m of BE_CONGES_MOIS) {
        beCongesPages.push({ url: `${BASE_URL}/be/conges-payes/${b}-euros-${s}-${m}-mois`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // Plus-value immobiliere BE : prixAchat x prixVente x duree x type (filtrage prixVente > prixAchat)
  const BE_PV_PRIX_ACHATS = [150000, 200000, 250000, 300000];
  const BE_PV_PRIX_VENTES = [180000, 250000, 300000, 400000];
  const BE_PV_DUREES = [2, 4, 6, 10];
  const BE_PV_TYPES = ["habitation", "bati", "terrain"];
  const bePvPages: SitemapEntry[] = [];
  for (const pa of BE_PV_PRIX_ACHATS) {
    for (const pv of BE_PV_PRIX_VENTES) {
      if (pv <= pa) continue;
      for (const d of BE_PV_DUREES) {
        for (const t of BE_PV_TYPES) {
          bePvPages.push({ url: `${BASE_URL}/be/plus-value-immobiliere/${pa}-euros-${pv}-euros-${d}-ans-${t}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
        }
      }
    }
  }

  // Paris sportifs (calcs mathematiques, racine - utilisables FR/BE/CH)
  const parisSportifsStaticPages: SitemapEntry[] = [
    { url: `${BASE_URL}/calculateur-gain-pari`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/calculateur-pari-combine`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/convertisseur-cote-probabilite`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  // Gain pari : mise x cote
  const gainPariPages: SitemapEntry[] = [];
  for (const m of PARI_MISES) {
    for (const c of PARI_COTES_SLUGS) {
      gainPariPages.push({ url: `${BASE_URL}/calculateur-gain-pari/${m}-euros-cote-${c}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pari combine : nb x cote x mise
  const combinePages: SitemapEntry[] = [];
  for (const n of COMBINE_NB) {
    for (const c of COMBINE_COTES) {
      for (const m of COMBINE_MISES) {
        combinePages.push({ url: `${BASE_URL}/calculateur-pari-combine/${n}-selections-${c}-cote-${m}-mise`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // Probabilite cote : cote
  const probaPages: SitemapEntry[] = [];
  for (const c of PROBA_COTES) {
    probaPages.push({ url: `${BASE_URL}/convertisseur-cote-probabilite/cote-${c}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Sport + Gaming (4 calcs ajoutes 19/05/2026 session 52)
  const sportGamingStaticPages: SitemapEntry[] = [
    { url: `${BASE_URL}/convertisseur-sensibilite-fps`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/convertisseur-allure-course`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/calcul-ffmi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/convertisseur-monnaie-jeu`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  // Sensibilite FPS : conversions paires de jeux
  const SENSI_FPS_SLUGS = [
    "valorant-vers-cs2", "cs2-vers-valorant", "apex-vers-valorant", "valorant-vers-apex",
    "fortnite-vers-valorant", "valorant-vers-fortnite", "cs2-vers-apex", "apex-vers-cs2",
    "overwatch-vers-valorant", "valorant-vers-overwatch", "r6-vers-cs2", "cs2-vers-r6",
    "fortnite-vers-cs2", "cs2-vers-fortnite", "overwatch-vers-cs2", "r6-vers-valorant",
    "valorant-vers-r6", "apex-vers-fortnite", "fortnite-vers-apex", "overwatch-vers-apex",
    "apex-vers-overwatch", "r6-vers-fortnite", "fortnite-vers-r6", "overwatch-vers-r6",
  ];
  const sensiFpsPages: SitemapEntry[] = SENSI_FPS_SLUGS.map((s) => ({
    url: `${BASE_URL}/convertisseur-sensibilite-fps/${s}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Allure course : allures min/km + vitesses km/h + temps cibles
  const ALLURE_COURSE_SLUGS = [
    "allure-3min30-par-km", "allure-4min-par-km", "allure-4min30-par-km",
    "allure-5min-par-km", "allure-5min30-par-km", "allure-6min-par-km",
    "allure-6min30-par-km", "allure-7min-par-km", "allure-7min30-par-km", "allure-8min-par-km",
    "vitesse-8-kmh", "vitesse-9-kmh", "vitesse-10-kmh", "vitesse-11-kmh",
    "vitesse-12-kmh", "vitesse-13-kmh", "vitesse-14-kmh", "vitesse-15-kmh",
    "marathon-4h", "marathon-3h30", "semi-1h45", "semi-2h",
    "10km-50min", "10km-45min", "5km-25min", "5km-22min",
  ];
  const allureCoursePages: SitemapEntry[] = ALLURE_COURSE_SLUGS.map((s) => ({
    url: `${BASE_URL}/convertisseur-allure-course/${s}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // FFMI : sexe-poids-taille-MG
  const FFMI_SLUGS = [
    "homme-70kg-170cm-15-mg", "homme-75kg-175cm-15-mg", "homme-80kg-180cm-15-mg",
    "homme-85kg-185cm-15-mg", "homme-90kg-185cm-15-mg", "homme-75kg-175cm-10-mg",
    "homme-80kg-180cm-10-mg", "homme-80kg-180cm-20-mg", "homme-75kg-170cm-20-mg",
    "homme-85kg-180cm-15-mg", "homme-70kg-175cm-15-mg", "homme-80kg-185cm-15-mg",
    "homme-90kg-180cm-15-mg", "homme-75kg-180cm-12-mg", "homme-80kg-175cm-18-mg",
    "femme-55kg-160cm-22-mg", "femme-60kg-165cm-22-mg", "femme-65kg-170cm-22-mg",
    "femme-70kg-170cm-22-mg", "femme-55kg-165cm-20-mg", "femme-60kg-160cm-25-mg",
    "femme-65kg-165cm-20-mg", "femme-70kg-165cm-22-mg", "femme-60kg-165cm-25-mg",
    "femme-55kg-160cm-20-mg",
  ];
  const ffmiPages: SitemapEntry[] = FFMI_SLUGS.map((s) => ({
    url: `${BASE_URL}/calcul-ffmi/${s}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Monnaie jeu : quantite-monnaie-en-euros + euros-en-monnaie
  const MONNAIE_JEU_SLUGS = [
    "1000-vbucks-en-euros", "2800-vbucks-en-euros", "5000-vbucks-en-euros", "13500-vbucks-en-euros",
    "650-rp-en-euros", "1380-rp-en-euros", "2800-rp-en-euros", "5000-rp-en-euros",
    "1000-apex-en-euros", "2150-apex-en-euros", "4350-apex-en-euros", "6700-apex-en-euros", "11500-apex-en-euros",
    "400-robux-en-euros", "800-robux-en-euros", "1700-robux-en-euros", "4500-robux-en-euros", "10000-robux-en-euros",
    "500-cp-en-euros", "1100-cp-en-euros", "2400-cp-en-euros", "5000-cp-en-euros",
    "500-fp-en-euros", "1050-fp-en-euros", "2200-fp-en-euros", "5900-fp-en-euros", "12000-fp-en-euros",
    "475-vp-en-euros", "1000-vp-en-euros", "2050-vp-en-euros", "3650-vp-en-euros",
    "320-minecoins-en-euros", "1020-minecoins-en-euros", "1720-minecoins-en-euros", "3500-minecoins-en-euros",
    "5-euros-en-vbucks", "10-euros-en-rp", "10-euros-en-apex", "10-euros-en-robux", "20-euros-en-cp",
  ];
  const monnaieJeuPages: SitemapEntry[] = MONNAIE_JEU_SLUGS.map((s) => ({
    url: `${BASE_URL}/convertisseur-monnaie-jeu/${s}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Sport + Gaming batch 2 (5 calcs ajoutes 19/05/2026 session 52 bis)
  const sportGaming2StaticPages: SitemapEntry[] = [
    { url: `${BASE_URL}/calcul-vma`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/calcul-1rm`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/calcul-calories-sport`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/calcul-fov-jeu`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/calcul-temps-telechargement`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  // VMA : 21 valeurs km/h + 8 distances cooper = 29 variantes
  const vmaPages: SitemapEntry[] = [];
  for (let v = 10; v <= 20; v += 0.5) {
    const s = v % 1 === 0 ? v.toString() : v.toFixed(1);
    vmaPages.push({ url: `${BASE_URL}/calcul-vma/vma-${s}-kmh`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }
  for (const d of [2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600]) {
    vmaPages.push({ url: `${BASE_URL}/calcul-vma/cooper-${d}m`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // 1RM : poids x reps populaires
  const ONE_RM_SLUGS = [
    "40kg-3-reps", "40kg-5-reps", "40kg-8-reps", "40kg-10-reps",
    "60kg-3-reps", "60kg-5-reps", "60kg-8-reps", "60kg-10-reps",
    "80kg-3-reps", "80kg-5-reps", "80kg-8-reps", "80kg-10-reps",
    "100kg-3-reps", "100kg-5-reps", "100kg-8-reps", "100kg-10-reps",
    "120kg-3-reps", "120kg-5-reps", "120kg-8-reps", "120kg-10-reps",
    "140kg-5-reps", "140kg-8-reps",
    "160kg-3-reps", "160kg-5-reps", "160kg-8-reps",
  ];
  const oneRmPages: SitemapEntry[] = ONE_RM_SLUGS.map((s) => ({
    url: `${BASE_URL}/calcul-1rm/${s}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Calories sport : sport-poids-duree
  const CALORIES_SPORT_SLUGS = [
    "course-10kmh-60kg-30min", "course-10kmh-70kg-30min", "course-10kmh-80kg-30min",
    "course-10kmh-70kg-60min", "course-10kmh-80kg-60min",
    "velo-route-25-70kg-30min", "velo-route-25-70kg-60min", "velo-route-25-80kg-60min",
    "natation-moderee-70kg-30min", "natation-moderee-70kg-60min", "natation-rapide-70kg-30min",
    "football-match-70kg-60min", "football-match-80kg-60min", "football-recreatif-70kg-60min",
    "muscu-moderee-70kg-30min", "muscu-intense-70kg-60min", "crossfit-70kg-30min",
    "hiit-70kg-30min", "hiit-70kg-60min",
    "yoga-vinyasa-60kg-60min", "yoga-vinyasa-70kg-60min",
    "marche-rapide-70kg-30min", "marche-rapide-70kg-60min",
    "randonnee-montagne-70kg-60min", "randonnee-montagne-80kg-60min",
    "zumba-60kg-60min", "zumba-70kg-60min",
    "basketball-match-70kg-60min", "tennis-simple-70kg-60min",
    "aviron-intense-70kg-30min", "aviron-intense-70kg-60min",
  ];
  const caloriesSportPages: SitemapEntry[] = CALORIES_SPORT_SLUGS.map((s) => ({
    url: `${BASE_URL}/calcul-calories-sport/${s}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // FOV : fov-X-ratioSource-vers-ratioCible
  const FOV_SLUGS = [
    "fov-90-16-9-vers-21-9", "fov-90-21-9-vers-16-9", "fov-90-4-3-vers-16-9", "fov-90-16-9-vers-4-3",
    "fov-103-16-9-vers-21-9", "fov-103-21-9-vers-16-9", "fov-103-16-9-vers-16-10",
    "fov-110-16-9-vers-21-9", "fov-110-21-9-vers-16-9", "fov-110-16-9-vers-16-10",
    "fov-80-16-9-vers-21-9", "fov-80-21-9-vers-16-9", "fov-80-16-10-vers-16-9",
    "fov-100-16-9-vers-21-9", "fov-100-21-9-vers-16-9", "fov-100-4-3-vers-21-9",
    "fov-106-16-9-vers-21-9", "fov-106-21-9-vers-16-9", "fov-106-16-10-vers-21-9",
    "fov-120-21-9-vers-16-9", "fov-120-32-9-vers-21-9",
  ];
  const fovPages: SitemapEntry[] = FOV_SLUGS.map((s) => ({
    url: `${BASE_URL}/calcul-fov-jeu/${s}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Temps telechargement : taille-debit + jeu-debit
  const TEMPS_DL_SLUGS = [
    "5go-en-8mbs", "5go-en-50mbs", "5go-en-100mbs", "5go-en-500mbs", "5go-en-1000mbs",
    "10go-en-8mbs", "10go-en-50mbs", "10go-en-100mbs", "10go-en-500mbs", "10go-en-1000mbs",
    "30go-en-50mbs", "30go-en-100mbs", "30go-en-500mbs", "30go-en-1000mbs",
    "50go-en-50mbs", "50go-en-100mbs", "50go-en-500mbs", "50go-en-1000mbs",
    "100go-en-50mbs", "100go-en-100mbs", "100go-en-500mbs", "100go-en-1000mbs",
    "150go-en-50mbs", "150go-en-100mbs", "150go-en-1000mbs",
    "220go-en-50mbs", "220go-en-100mbs", "220go-en-1000mbs",
    "cyberpunk-en-100mbs", "gta5-en-100mbs", "fortnite-en-100mbs",
    "baldursgate3-en-100mbs", "starfield-en-100mbs", "cod-en-100mbs",
  ];
  const tempsDlPages: SitemapEntry[] = TEMPS_DL_SLUGS.map((s) => ({
    url: `${BASE_URL}/calcul-temps-telechargement/${s}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Religion (5 calcs ajoutes 19/05/2026 session 52 ter)
  const religionStaticPages: SitemapEntry[] = [
    { url: `${BASE_URL}/calcul-zakat`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/calcul-zakat-al-fitr`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/convertisseur-calendrier-hijri`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/calcul-date-ramadan`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/calcul-date-paques`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  // Zakat al-Mal : patrimoines + ecoles + cas speciaux
  const ZAKAT_SLUGS = [
    "5000-euros", "10000-euros", "15000-euros", "20000-euros", "25000-euros",
    "30000-euros", "40000-euros", "50000-euros", "75000-euros", "100000-euros",
    "150000-euros", "200000-euros",
    "10000-euros-majoritaire", "25000-euros-hanafite", "50000-euros-majoritaire", "100000-euros-hanafite",
    "5000-euros-epargne", "10000-euros-epargne", "25000-euros-epargne",
    "nisab-or-actuel", "nisab-argent-actuel",
    "calcul-zakat-avec-bijoux", "zakat-dettes-court-terme", "hawl-annee-lunaire", "zakat-crypto-avis-ecfr",
  ];
  const zakatPages: SitemapEntry[] = ZAKAT_SLUGS.map((s) => ({
    url: `${BASE_URL}/calcul-zakat/${s}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Zakat al-Fitr : nb personnes
  const ZAKAT_FITR_SLUGS = [
    "1-personne", "2-personnes", "3-personnes", "4-personnes", "5-personnes",
    "6-personnes", "7-personnes", "8-personnes",
    "2-personnes-cfcm", "4-personnes-cfcm", "6-personnes-cfcm",
    "famille-3-personnes", "famille-4-personnes", "famille-5-personnes", "couple-2-personnes",
  ];
  const zakatFitrPages: SitemapEntry[] = ZAKAT_FITR_SLUGS.map((s) => ({
    url: `${BASE_URL}/calcul-zakat-al-fitr/${s}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Hijri : dates + ages
  const HIJRI_SLUGS = [
    "aujourd-hui-en-hijri",
    "annee-1444", "annee-1445", "annee-1446", "annee-1447",
    "annee-1448", "annee-1449", "annee-1450",
    "ne-en-1980", "ne-en-1985", "ne-en-1990", "ne-en-1995",
    "ne-en-2000", "ne-en-2005", "ne-en-2010",
    "1-janvier-2026", "1-juillet-2026", "31-decembre-2026",
    "nouvelle-annee-hijri-2026", "ramadan-2026-en-gregorien", "aid-2026-en-hijri",
  ];
  const hijriPages: SitemapEntry[] = HIJRI_SLUGS.map((s) => ({
    url: `${BASE_URL}/convertisseur-calendrier-hijri/${s}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Date Ramadan : 5 annees x 3 evenements + 2 questions + 5 calendriers
  const RAMADAN_SLUGS = [
    "ramadan-2026", "ramadan-2027", "ramadan-2028", "ramadan-2029", "ramadan-2030",
    "aid-al-fitr-2026", "aid-al-fitr-2027", "aid-al-fitr-2028", "aid-al-fitr-2029", "aid-al-fitr-2030",
    "aid-al-adha-2026", "aid-al-adha-2027", "aid-al-adha-2028", "aid-al-adha-2029", "aid-al-adha-2030",
    "combien-de-jours-avant-ramadan", "combien-de-jours-avant-aid",
    "calendrier-musulman-2026", "calendrier-musulman-2027", "calendrier-musulman-2028",
    "calendrier-musulman-2029", "calendrier-musulman-2030",
  ];
  const ramadanPages: SitemapEntry[] = RAMADAN_SLUGS.map((s) => ({
    url: `${BASE_URL}/calcul-date-ramadan/${s}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Date Paques : 10 annees + orthodoxe + fetes derivees
  const PAQUES_SLUGS = [
    "paques-2026", "paques-2027", "paques-2028", "paques-2029", "paques-2030",
    "paques-2031", "paques-2032", "paques-2033", "paques-2034", "paques-2035",
    "paques-orthodoxe-2026", "paques-orthodoxe-2027", "paques-orthodoxe-2028",
    "mercredi-cendres-2026", "mercredi-cendres-2027",
    "ascension-2026", "ascension-2027", "ascension-2028",
    "pentecote-2026", "pentecote-2027",
    "combien-de-jours-avant-paques", "combien-de-jours-avant-ascension",
    "paques-meeus-algorithme", "coincidence-paques-orthodoxe-catholique-2028",
    "pourquoi-paques-date-change",
  ];
  const paquesPages: SitemapEntry[] = PAQUES_SLUGS.map((s) => ({
    url: `${BASE_URL}/calcul-date-paques/${s}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Religion 2 (5 calcs ajoutes 19/05/2026 session 52 quater)
  const religion2StaticPages: SitemapEntry[] = [
    { url: `${BASE_URL}/signe-astrologique-chinois`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/calcul-fetes-catholiques`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/calcul-kaffara-ramadan`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/convertisseur-calendrier-hebraique`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/calcul-date-bar-mitzvah`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  // Signe astrologique chinois : annees + signes + nouvel an
  const SIGNE_CHINOIS_SLUGS = [
    "annee-1970", "annee-1975", "annee-1980", "annee-1985", "annee-1990",
    "annee-1995", "annee-2000", "annee-2005", "annee-2010", "annee-2015",
    "annee-2020", "annee-2024", "annee-2025", "annee-2026",
    "signe-rat", "signe-buffle", "signe-tigre", "signe-lapin", "signe-dragon",
    "signe-serpent", "signe-cheval", "signe-chevre", "signe-singe", "signe-coq",
    "signe-chien", "signe-cochon",
    "nouvel-an-chinois-2026", "nouvel-an-chinois-2027",
  ];
  const signeChinoisPages: SitemapEntry[] = SIGNE_CHINOIS_SLUGS.map((s) => ({
    url: `${BASE_URL}/signe-astrologique-chinois/${s}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Fetes catholiques : pack toutes fetes mobiles + fixes par annee
  const FETES_CATHO_SLUGS = [
    "fetes-2026", "fetes-2027", "fetes-2028", "fetes-2029", "fetes-2030",
    "toussaint-2026", "toussaint-2027", "toussaint-2028",
    "assomption-2026", "assomption-2027", "assomption-2028",
    "avent-2026", "avent-2027", "avent-2028",
    "epiphanie-2026", "epiphanie-2027",
    "chandeleur-2026", "chandeleur-2027",
    "careme-2026", "careme-2027",
    "quand-tombe-noel-2026", "quand-tombe-paques-2026",
    "jours-feries-religieux-2026",
    "calendrier-liturgique-2026", "calendrier-liturgique-2027",
  ];
  const fetesCathoPages: SitemapEntry[] = FETES_CATHO_SLUGS.map((s) => ({
    url: `${BASE_URL}/calcul-fetes-catholiques/${s}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Kaffara Ramadan + Fidya
  const KAFFARA_SLUGS = [
    "kaffara-1-jour", "kaffara-2-jours", "kaffara-3-jours", "kaffara-5-jours",
    "kaffara-7-jours", "kaffara-10-jours", "kaffara-15-jours", "kaffara-30-jours",
    "fidya-1-jour", "fidya-5-jours", "fidya-10-jours", "fidya-20-jours", "fidya-30-jours",
    "kaffara-rapport-conjugal-ramadan", "fidya-personne-agee",
  ];
  const kaffaraPages: SitemapEntry[] = KAFFARA_SLUGS.map((s) => ({
    url: `${BASE_URL}/calcul-kaffara-ramadan/${s}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Calendrier hebraique
  const HEBRAIQUE_SLUGS = [
    "aujourd-hui-en-hebreu",
    "annee-5780", "annee-5783", "annee-5784", "annee-5785",
    "annee-5786", "annee-5787", "annee-5788",
    "ne-en-1980", "ne-en-1985", "ne-en-1990", "ne-en-1995",
    "ne-en-2000", "ne-en-2005", "ne-en-2010",
    "1-janvier-2026", "1-juillet-2026", "31-decembre-2026",
    "rosh-hashanah-2026", "yom-kippour-2026",
    "pessah-2026-hebraique", "shavouot-2026-hebraique",
  ];
  const hebraiquePages: SitemapEntry[] = HEBRAIQUE_SLUGS.map((s) => ({
    url: `${BASE_URL}/convertisseur-calendrier-hebraique/${s}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Bar / Bat Mitzvah
  const BAR_MITZVAH_SLUGS = [
    "ne-en-2010-garcon", "ne-en-2011-garcon", "ne-en-2012-garcon",
    "ne-en-2013-garcon", "ne-en-2014-garcon", "ne-en-2015-garcon",
    "ne-en-2012-fille", "ne-en-2013-fille", "ne-en-2014-fille",
    "ne-en-2015-fille", "ne-en-2016-fille", "ne-en-2017-fille",
    "quand-bar-mitzvah-13-ans", "quand-bat-mitzvah-12-ans", "difference-bar-bat-mitzvah",
  ];
  const barMitzvahPages: SitemapEntry[] = BAR_MITZVAH_SLUGS.map((s) => ({
    url: `${BASE_URL}/calcul-date-bar-mitzvah/${s}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Pages dynamiques Poids Ideal
  const PI_SEXES = ["homme", "femme"];
  const PI_TAILLES = [155, 158, 160, 163, 165, 168, 170, 173, 175, 178, 180, 183, 185, 188, 190];
  const PI_AGES = [20, 25, 30, 35, 40, 45, 50, 55, 60];
  const poidsIdealPages: SitemapEntry[] = [];
  for (const s of PI_SEXES) {
    for (const t of PI_TAILLES) {
      for (const a of PI_AGES) {
        poidsIdealPages.push({ url: `${BASE_URL}/calcul-poids-ideal/${s}-${t}cm-${a}ans`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // Pages dynamiques IMC
  const imcPages: SitemapEntry[] = [];
  for (const p of IMC_POIDS) {
    for (const t of IMC_TAILLES) {
      imcPages.push({ url: `${BASE_URL}/calcul-imc/${p}-kg-${t}-cm`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Masse Grasse
  const MG_SEXES = ["homme", "femme"];
  const MG_POIDS = [55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
  const MG_TAILLES = [160, 165, 170, 175, 180, 185];
  const masseGrassePages: SitemapEntry[] = [];
  for (const s of MG_SEXES) {
    for (const p of MG_POIDS) {
      for (const t of MG_TAILLES) {
        masseGrassePages.push({ url: `${BASE_URL}/calcul-masse-grasse/${s}-${p}kg-${t}cm`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // Pages dynamiques Frais de Notaire
  const notairePages: SitemapEntry[] = [];
  for (const p of NOTAIRE_PRIX) {
    for (const t of NOTAIRE_TYPES) {
      notairePages.push({ url: `${BASE_URL}/frais-de-notaire/${p}-euros-${t}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }
  for (const v of VILLES_SLUGS) {
    notairePages.push({ url: `${BASE_URL}/frais-de-notaire/${v}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 });
  }

  // Pages dynamiques Consommation Electrique
  const consoPages: SitemapEntry[] = [];
  for (const a of CONSO_APPAREILS) {
    consoPages.push({ url: `${BASE_URL}/calcul-consommation-electrique/${a}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Indemnite Licenciement
  const licenciementPages: SitemapEntry[] = [];
  for (const s of LICENC_SALAIRES) {
    for (const a of LICENC_ANNEES) {
      licenciementPages.push({ url: `${BASE_URL}/indemnite-licenciement/${s}-euros-${a}-ans`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Convertisseur Devises
  const devisesPages: SitemapEntry[] = [];
  for (const m of DEVISES_MONTANTS) {
    for (const d of DEVISES_PAIRES) {
      devisesPages.push({ url: `${BASE_URL}/convertisseur-devises/${m}-euros-en-${d}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Inflation
  const inflationPages: SitemapEntry[] = [];
  for (const m of INFL_MONTANTS) {
    for (const a of INFL_ANNEES) {
      inflationPages.push({ url: `${BASE_URL}/calculateur-inflation/${m}-euros-depuis-${a}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Age
  const agePages: SitemapEntry[] = [];
  for (const a of AGE_ANNEES) {
    agePages.push({ url: `${BASE_URL}/calcul-age/ne-en-${a}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Surface Peinture
  const surfPeinturePages: SitemapEntry[] = [];
  for (const piece of SURF_PIECES) {
    for (const s of piece.surfaces) {
      surfPeinturePages.push({ url: `${BASE_URL}/calcul-surface-peinture/${piece.slug}-${s}-m2`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Epargne
  const epargnePages: SitemapEntry[] = [];
  for (const c of EPARGNE_CAPITAUX) {
    for (const p of EPARGNE_PLACEMENTS) {
      epargnePages.push({ url: `${BASE_URL}/simulateur-epargne/${c}-euros-${p}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Indemnites Kilometriques
  const kmPages: SitemapEntry[] = [];
  for (const d of KM_DISTANCES) {
    for (const cv of KM_CV) {
      kmPages.push({ url: `${BASE_URL}/calcul-indemnites-kilometriques/${d}-km-${cv}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Impot Revenu
  const impotPages: SitemapEntry[] = [];
  for (const r of IMPOT_REVENUS) {
    impotPages.push({ url: `${BASE_URL}/simulateur-impot-revenu/${r}-euros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Bunker FR
  const bunkerPages: SitemapEntry[] = [];
  for (const p of BUNKER_PERSONNES) {
    for (const d of BUNKER_DUREES) {
      for (const t of BUNKER_TYPES) {
        bunkerPages.push({ url: `${BASE_URL}/simulateur-bunker/${p}-personne${p > 1 ? "s" : ""}-${d}-${t}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // Pages dynamiques Prix Chauffagiste
  const chauffPages: SitemapEntry[] = [];
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
  const tempPages: SitemapEntry[] = [];
  for (const c of TEMP_CELSIUS) {
    tempPages.push({ url: `${BASE_URL}/conversion-temperature/${c}-celsius-en-fahrenheit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }
  for (const f of TEMP_FAHRENHEIT) {
    tempPages.push({ url: `${BASE_URL}/conversion-temperature/${f}-fahrenheit-en-celsius`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Conversion Poids
  const poidsPages: SitemapEntry[] = [];
  for (const kg of POIDS_KG) {
    poidsPages.push({ url: `${BASE_URL}/conversion-poids/${kg}-kg-en-livres`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }
  for (const lbs of POIDS_LBS) {
    poidsPages.push({ url: `${BASE_URL}/conversion-poids/${lbs}-livres-en-kg`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Conversion Longueur
  const longueurPages: SitemapEntry[] = [];
  for (const cm of LONG_CM) {
    longueurPages.push({ url: `${BASE_URL}/conversion-longueur/${cm}-cm-en-pouces`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }
  for (const p of LONG_POUCES) {
    longueurPages.push({ url: `${BASE_URL}/conversion-longueur/${p}-pouces-en-cm`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Pension Reversion
  const reversionPages: SitemapEntry[] = [];
  for (const p of REVERSION_PENSIONS) {
    reversionPages.push({ url: `${BASE_URL}/calcul-pension-reversion/${p}-euros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Surface Cercle
  const cerclePages: SitemapEntry[] = [];
  for (const r of CERCLE_RAYONS) {
    cerclePages.push({ url: `${BASE_URL}/calcul-surface-cercle/rayon-${r}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Volume Cylindre
  const cylindrePages: SitemapEntry[] = [];
  for (const [r, h] of CYLINDRE_COMBOS) {
    cylindrePages.push({ url: `${BASE_URL}/calcul-volume-cylindre/rayon-${r}-hauteur-${h}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Racine Carree
  const racinePages: SitemapEntry[] = [];
  for (const n of RACINE_NOMBRES) {
    racinePages.push({ url: `${BASE_URL}/calcul-racine-carree/racine-de-${n}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Ascendant Astrologique
  const astroPages: SitemapEntry[] = [];
  for (const s of ASTRO_SIGNES) {
    astroPages.push({ url: `${BASE_URL}/calcul-ascendant-astrologique/${s}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Gratification Stage
  const stagePages: SitemapEntry[] = [];
  for (const d of STAGE_DUREES) {
    for (const h of STAGE_HEURES) {
      stagePages.push({ url: `${BASE_URL}/calcul-gratification-stage/${d}-mois-${h}-heures`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Droits Succession
  const succPages: SitemapEntry[] = [];
  for (const m of SUCC_MONTANTS) {
    for (const h of SUCC_HERITIERS) {
      succPages.push({ url: `${BASE_URL}/calcul-droits-succession/${m}-euros-${h}-enfants`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Simulateur Cout Voiture
  const coutVoitureTypes = ["citadine", "berline", "suv", "electrique", "utilitaire"];
  const coutVoitureKm = [5000, 10000, 15000, 20000, 25000, 30000];
  const coutVoitureDurees = [3, 5, 7, 10];
  const coutVoiturePages: SitemapEntry[] = [];
  for (const t of coutVoitureTypes) {
    for (const k of coutVoitureKm) {
      for (const d of coutVoitureDurees) {
        coutVoiturePages.push({ url: `${BASE_URL}/simulateur-cout-voiture/${t}-${k}km-${d}ans`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // Pages dynamiques Cout Kilometrique
  const ckPages: SitemapEntry[] = [];
  for (const d of CK_DISTANCES) {
    for (const cv of CK_CV) {
      ckPages.push({ url: `${BASE_URL}/calcul-cout-kilometrique/${d}-km-${cv}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Interet Compose
  const icPages: SitemapEntry[] = [];
  for (const c of IC_CAPITAUX) {
    for (const t of IC_TAUX) {
      for (const d of IC_DUREES) {
        icPages.push({ url: `${BASE_URL}/calcul-interet-compose/${c}-euros-${t}-pourcent-${d}-ans`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // Pages dynamiques Malus Ecologique
  const malusPages: SitemapEntry[] = [];
  for (const co2 of MALUS_CO2) {
    malusPages.push({ url: `${BASE_URL}/calcul-malus-ecologique/${co2}-g-co2`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques PGCD PPCM
  const pgcdPages: SitemapEntry[] = [];
  for (const [a, b] of PGCD_PAIRES) {
    pgcdPages.push({ url: `${BASE_URL}/calcul-pgcd-ppcm/${a}-et-${b}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Duree Entre Dates
  const dureePages: SitemapEntry[] = [];
  for (const ev of DUREE_EVENEMENTS) {
    dureePages.push({ url: `${BASE_URL}/calcul-duree-entre-dates/${ev}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Plus-Value Immobiliere
  const pvImmoPages: SitemapEntry[] = [];
  for (const pv of PV_PLUS_VALUES) {
    for (const a of PV_ANNEES) {
      pvImmoPages.push({ url: `${BASE_URL}/calcul-plus-value-immobiliere/200000-euros-plus-value-${pv}-euros-${a}-ans`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }
  for (const pa of [100000, 150000, 200000, 250000, 300000, 400000, 500000]) {
    pvImmoPages.push({ url: `${BASE_URL}/calcul-plus-value-immobiliere/${pa}-euros-plus-value-100000-euros-10-ans`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Revenus Fonciers
  const revFoncPages: SitemapEntry[] = [];
  for (const loyers of [6000, 8000, 10000, 12000, 15000, 18000, 24000, 36000]) {
    for (const tmi of [11, 30, 41]) {
      for (const regime of ["micro-foncier", "reel"]) {
        revFoncPages.push({ url: `${BASE_URL}/calcul-revenus-fonciers/${loyers}-euros-tmi-${tmi}-${regime}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // Pages dynamiques Rentabilite Locative
  const rentaPages: SitemapEntry[] = [];
  for (const p of RENTA_PRIX) {
    for (const l of RENTA_LOYERS) {
      rentaPages.push({ url: `${BASE_URL}/calcul-rentabilite-locative/${p}-euros-${l}-euros-mois`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Consommation Essence
  const essencePages: SitemapEntry[] = [];
  for (const d of ESS_DISTANCES) {
    for (const c of ESS_CONSOS) {
      essencePages.push({ url: `${BASE_URL}/calcul-consommation-essence/${d}-km-${c}-litres`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Jours Ouvres
  const joPages: SitemapEntry[] = [];
  for (const m of JO_MOIS) {
    joPages.push({ url: `${BASE_URL}/calcul-jours-ouvres/${m}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Calcul Moyenne
  const moyennePages: SitemapEntry[] = [];
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
  const produitPages: SitemapEntry[] = [];
  for (const [a, b, c] of PRODUIT_EXEMPLES) {
    produitPages.push({ url: `${BASE_URL}/produit-en-croix/${a}-sur-${b}-egale-${c}-sur-x`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques Conges Payes
  const cpPages: SitemapEntry[] = [];
  for (const s of CP_SALAIRES) {
    for (const m of CP_MOIS) {
      cpPages.push({ url: `${BASE_URL}/calcul-conges-payes/${s}-euros-${m}-mois`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages ville par metier (25 villes x 6 metiers = 150 pages)
  const villePages: SitemapEntry[] = [];
  for (const metier of METIERS_PRIX) {
    for (const ville of VILLES_SLUGS) {
      villePages.push({ url: `${BASE_URL}/${metier}/${ville}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 });
    }
  }

  // Pages ville taxe fonciere (25 pages)
  const taxeFonciereVillePages: SitemapEntry[] = [];
  for (const v of VILLES_SLUGS) {
    taxeFonciereVillePages.push({ url: `${BASE_URL}/calcul-taxe-fonciere/${v}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 });
  }

  // Pages dynamiques 4 nouveaux calcs finance (session 14)
  const ASSURANCE_CAPITAUX = [100000, 150000, 200000, 250000, 300000, 400000, 500000];
  const ASSURANCE_DUREES = [15, 20, 25];
  const assurancePages: SitemapEntry[] = [];
  for (const c of ASSURANCE_CAPITAUX) {
    for (const d of ASSURANCE_DUREES) {
      assurancePages.push({ url: `${BASE_URL}/simulateur-assurance-emprunteur/${c}-euros-${d}-ans`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  const SCPI_MONTANTS = [10000, 20000, 30000, 50000, 75000, 100000, 150000, 200000, 300000];
  const SCPI_TMIS = [11, 30, 41];
  const scpiPages: SitemapEntry[] = [];
  for (const m of SCPI_MONTANTS) {
    for (const t of SCPI_TMIS) {
      scpiPages.push({ url: `${BASE_URL}/simulateur-rendement-scpi/${m}-euros-tmi-${t}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  const RENTE_CAPITAUX = [50000, 100000, 150000, 200000, 300000, 500000, 750000, 1000000];
  const RENTE_AGES = [55, 60, 65, 70, 75];
  const rentePages: SitemapEntry[] = [];
  for (const c of RENTE_CAPITAUX) {
    for (const a of RENTE_AGES) {
      rentePages.push({ url: `${BASE_URL}/simulateur-rente-viagere/${c}-euros-a-${a}-ans`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  const IFI_PATRIMOINES = [1400000, 1500000, 1700000, 2000000, 2500000, 3000000, 4000000, 5000000, 7500000, 10000000];
  const ifiPages: SitemapEntry[] = [];
  for (const p of IFI_PATRIMOINES) {
    ifiPages.push({ url: `${BASE_URL}/calcul-ifi/patrimoine-${p}-euros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Pages dynamiques batch 2 (IS, amende vitesse, LOA/LLD)
  const IS_BENEFICES = [10000, 25000, 42500, 50000, 75000, 100000, 150000, 200000, 300000, 500000, 1000000];
  const isPages: SitemapEntry[] = [];
  for (const b of IS_BENEFICES) {
    isPages.push({ url: `${BASE_URL}/simulateur-impot-societe/${b}-euros-benefice`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  const AMENDE_SLUGS = [
    "60-en-zone-50", "65-en-zone-50", "80-en-zone-50", "100-en-zone-50",
    "90-en-zone-80", "100-en-zone-80", "120-en-zone-80",
    "140-en-zone-90", "150-en-zone-130", "160-en-zone-130", "180-en-zone-130", "200-en-zone-130",
  ];
  const amendePages: SitemapEntry[] = [];
  for (const s of AMENDE_SLUGS) {
    amendePages.push({ url: `${BASE_URL}/simulateur-amende-exces-vitesse/${s}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  const LOA_LLD_SLUGS = [
    "voiture-20000-euros-36-mois", "voiture-25000-euros-48-mois", "voiture-30000-euros-48-mois",
    "voiture-35000-euros-48-mois", "voiture-40000-euros-48-mois", "voiture-50000-euros-60-mois",
    "voiture-electrique-30000-euros-48-mois",
  ];
  const loaLldPages: SitemapEntry[] = [];
  for (const s of LOA_LLD_SLUGS) {
    loaLldPages.push({ url: `${BASE_URL}/simulateur-loa-lld/${s}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Batch 3 (inflammation, prestation compensatoire, grossesse)
  const INFLAMMATION_SLUGS = ["regime-mediterraneen", "regime-vegetarien", "regime-vegan", "regime-occidental-standard", "regime-keto", "regime-paleo"];
  const inflammationPages: SitemapEntry[] = [];
  for (const s of INFLAMMATION_SLUGS) {
    inflammationPages.push({ url: `${BASE_URL}/calcul-indice-inflammation/${s}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  const PRESTATION_SLUGS = ["mariage-10-ans", "mariage-15-ans", "mariage-20-ans", "mariage-25-ans", "mariage-30-ans", "mariage-5-ans-sans-enfant", "femme-au-foyer-20-ans"];
  const prestationPages: SitemapEntry[] = [];
  for (const s of PRESTATION_SLUGS) {
    prestationPages.push({ url: `${BASE_URL}/calcul-prestation-compensatoire/${s}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  const GROSSESSE_SEMAINES = [8, 12, 16, 20, 24, 28, 32, 36, 40];
  const grossessePages: SitemapEntry[] = [];
  for (const s of GROSSESSE_SEMAINES) {
    grossessePages.push({ url: `${BASE_URL}/calcul-prise-poids-grossesse/${s}-semaines`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Batch 4 (LMNP, dividendes)
  const LMNP_SLUGS = ["studio-100000-euros", "appartement-150000-euros", "appartement-200000-euros", "appartement-300000-euros", "maison-400000-euros", "tmi-41-appartement-200000", "tmi-11-appartement-150000"];
  const lmnpPages: SitemapEntry[] = [];
  for (const s of LMNP_SLUGS) {
    lmnpPages.push({ url: `${BASE_URL}/calcul-amortissement-lmnp/${s}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  const DIV_MONTANTS = [5000, 10000, 15000, 20000, 30000, 50000, 75000, 100000, 150000, 200000];
  const DIV_TMIS = [11, 30, 41];
  const dividendesPages: SitemapEntry[] = [];
  for (const m of DIV_MONTANTS) {
    for (const t of DIV_TMIS) {
      dividendesPages.push({ url: `${BASE_URL}/simulateur-dividendes/${m}-euros-tmi-${t}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Metabolisme de Base
  const metabolismePages: SitemapEntry[] = [];
  for (const s of MB_SEXES) {
    for (const p of MB_POIDS) {
      for (const a of MB_AGES) {
        metabolismePages.push({ url: `${BASE_URL}/calcul-metabolisme-base/${s}-${p}kg-${a}ans`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // Pages dynamiques Proteines
  const proteinesPages: SitemapEntry[] = [];
  for (const p of PROT_POIDS) {
    for (const a of PROT_ACTIVITES) {
      proteinesPages.push({ url: `${BASE_URL}/calcul-proteines/${p}kg-${a}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Besoin Sommeil
  const SOMMEIL_AGES = [1, 3, 6, 10, 14, 18, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];
  const SOMMEIL_ACTIVITES = ["sedentaire", "modere", "actif", "intense"];
  const sommeilPages: SitemapEntry[] = [];
  for (const age of SOMMEIL_AGES) {
    for (const act of SOMMEIL_ACTIVITES) {
      sommeilPages.push({ url: `${BASE_URL}/calcul-besoin-sommeil/${age}ans-${act}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Consommation Eau
  const EAU_POIDS = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
  const EAU_ACTIVITES = ["sedentaire", "leger", "modere", "actif", "intense"];
  const EAU_CLIMATS = ["tempere", "chaud", "tres-chaud"];
  const eauPages: SitemapEntry[] = [];
  for (const p of EAU_POIDS) {
    for (const a of EAU_ACTIVITES) {
      for (const c of EAU_CLIMATS) {
        eauPages.push({ url: `${BASE_URL}/calcul-consommation-eau/${p}kg-${a}-${c}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // Pages dynamiques Macros
  const macrosPages: SitemapEntry[] = [];
  for (const c of MACROS_CALORIES) {
    for (const o of MACROS_OBJECTIFS) {
      macrosPages.push({ url: `${BASE_URL}/calcul-macros/${c}kcal-${o}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Indice Glycemique (une page par aliment)
  const IG_SLUGS = [
    "pain-blanc", "pain-complet", "baguette", "riz-blanc", "riz-basmati", "riz-complet",
    "pates-blanches-cuites", "pates-completes-cuites", "pomme-de-terre-cuite-a-l-eau",
    "patate-douce", "quinoa-cuit", "lentilles", "pois-chiches", "haricots-rouges",
    "petits-pois", "carotte", "brocoli", "pomme", "banane", "banane-mure",
    "orange", "mangue", "raisin", "fraise", "ananas", "peche",
    "flocons-d-avoine", "corn-flakes", "muesli-sans-sucre",
    "chocolat-noir-70", "chocolat-au-lait", "miel", "sucre-blanc", "confiture",
    "yaourt-nature", "lait-entier", "glace-a-la-vanille",
    "coca-cola", "jus-d-orange", "jus-de-pomme",
  ];
  // Note: slugs sont generes par slugify() dans indiceGlycemiqueCalc.ts
  const igPages: SitemapEntry[] = IG_SLUGS.map((slug) => ({
    url: `${BASE_URL}/calcul-indice-glycemique/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Pages dynamiques Age Metabolique
  const ageMetaPages: SitemapEntry[] = [];
  for (const s of AM_SEXES) {
    for (const a of AM_AGES) {
      for (const act of AM_ACTIVITES) {
        ageMetaPages.push({ url: `${BASE_URL}/calcul-age-metabolique/${s}-${a}ans-${act}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // Pages dynamiques Risque Cardiovasculaire
  const risqueCardioPages: SitemapEntry[] = [];
  for (const s of RC_SEXES) {
    for (const a of RC_AGES) {
      for (const p of RC_PROFILS) {
        risqueCardioPages.push({ url: `${BASE_URL}/calcul-risque-cardiovasculaire/${s}-${a}ans-${p}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // Pages dynamiques DPE (7 surfaces x 5 chauffages x 5 epoques = 175 pages)
  const dpePages: SitemapEntry[] = [];
  for (const s of DPE_SURFACES) {
    for (const ch of DPE_CHAUFFAGES) {
      for (const ep of DPE_EPOQUES) {
        dpePages.push({ url: `${BASE_URL}/calculateur-dpe/${s}m2-${ch}-${ep}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  // Pages dynamiques Simulateur Facture Gaz (5 usages x 6 zones = 30 pages)
  const FAC_GAZ_USAGES = ["cuisson", "eau-chaude", "chauffage-50m2", "chauffage-80m2", "chauffage-120m2"];
  const FAC_GAZ_ZONES = ["zone1", "zone2", "zone3", "zone4", "zone5", "zone6"];
  const facGazPages: SitemapEntry[] = [];
  for (const u of FAC_GAZ_USAGES) {
    for (const z of FAC_GAZ_ZONES) {
      facGazPages.push({ url: `${BASE_URL}/simulateur-facture-gaz/${u}-${z}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Credit Auto
  const creditAutoPages: SitemapEntry[] = [];
  for (const m of CA_MONTANTS) {
    for (const d of CA_DUREES) {
      creditAutoPages.push({ url: `${BASE_URL}/simulateur-credit-auto/${m}-euros-${d}-mois`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Pages dynamiques Audit Frais Bancaires (par banque)
  const AUDIT_BANQUES_SLUGS = [
    "credit-agricole", "bnp-paribas", "societe-generale", "banque-postale", "lcl",
    "caisse-epargne", "credit-mutuel", "cic", "bred", "hsbc-france",
    "boursobank", "fortuneo", "hello-bank", "monabanq", "bforbank",
    "revolut", "n26", "lydia",
  ];
  const auditBanquesPages: SitemapEntry[] = [];
  for (const b of AUDIT_BANQUES_SLUGS) {
    auditBanquesPages.push({ url: `${BASE_URL}/audit-frais-bancaires/${b}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 });
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
    ...masseGrassePages,
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
    ...taxeFonciereVillePages,
    ...assurancePages,
    ...scpiPages,
    ...rentePages,
    ...ifiPages,
    ...isPages,
    ...amendePages,
    ...loaLldPages,
    ...inflammationPages,
    ...prestationPages,
    ...grossessePages,
    ...lmnpPages,
    ...dividendesPages,
    ...enStaticPages,
    ...enNukePages,
    ...enBlackoutPages,
    ...enBunkerPages,
    ...enSurvivalPages,
    ...enDraftPages,
    ...beStaticPages,
    ...beTvaPages,
    ...beSalairePages,
    ...beDroitsPages,
    ...bePrecomptePages,
    ...bePretPages,
    ...beLicenciementPages,
    ...beChomagePages,
    ...beSuccPages,
    ...beCapacitePages,
    ...bePensionPages,
    ...beKmPages,
    ...beDividendesPages,
    ...beIsocPages,
    ...beAllocPages,
    ...beAtnPages,
    ...beCongesPages,
    ...bePvPages,
    ...parisSportifsStaticPages,
    ...gainPariPages,
    ...combinePages,
    ...probaPages,
    ...sportGamingStaticPages,
    ...sensiFpsPages,
    ...allureCoursePages,
    ...ffmiPages,
    ...monnaieJeuPages,
    ...sportGaming2StaticPages,
    ...vmaPages,
    ...oneRmPages,
    ...caloriesSportPages,
    ...fovPages,
    ...tempsDlPages,
    ...religionStaticPages,
    ...zakatPages,
    ...zakatFitrPages,
    ...hijriPages,
    ...ramadanPages,
    ...paquesPages,
    ...religion2StaticPages,
    ...signeChinoisPages,
    ...fetesCathoPages,
    ...kaffaraPages,
    ...hebraiquePages,
    ...barMitzvahPages,
    ...tempPages,
    ...poidsPages,
    ...longueurPages,
    ...reversionPages,
    ...cerclePages,
    ...cylindrePages,
    ...racinePages,
    ...astroPages,
    ...stagePages,
    ...succPages,
    ...coutVoiturePages,
    ...ckPages,
    ...icPages,
    ...malusPages,
    ...pgcdPages,
    ...dureePages,
    ...pvImmoPages,
    ...revFoncPages,
    ...rentaPages,
    ...essencePages,
    ...joPages,
    ...moyennePages,
    ...produitPages,
    ...cpPages,
    ...poidsIdealPages,
    ...metabolismePages,
    ...proteinesPages,
    ...sommeilPages,
    ...macrosPages,
    ...eauPages,
    ...igPages,
    ...ageMetaPages,
    ...risqueCardioPages,
    ...dpePages,
    ...facGazPages,
    ...creditAutoPages,
    ...auditBanquesPages,
  ];
}
