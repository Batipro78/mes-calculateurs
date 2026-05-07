// Tarifs bancaires estimes 2026 par etablissement
// Sources : tarifs-bancaires.gouv.fr, MoneyVox, plaquettes tarifaires officielles

export interface DonneesBanque {
  slug: string;
  nom: string;
  type: "traditionnelle" | "ligne" | "neobanque";
  emoji: string;
  // Tarifs annuels moyens estimes (€)
  tenueCompte: number;
  carteClassic: number;
  cartePremier: number;
  // Total moyen estime (basé sur usage standard)
  totalAnnuelMoyen: number;
  // Specificites
  hausse2026: string;
  pointFort: string;
  pointFaible: string;
  recommandation: string;
}

export const BANQUES: DonneesBanque[] = [
  // BANQUES TRADITIONNELLES
  {
    slug: "credit-agricole",
    nom: "Credit Agricole",
    type: "traditionnelle",
    emoji: "🌾",
    tenueCompte: 25,
    carteClassic: 47, // varie selon caisse regionale
    cartePremier: 144,
    totalAnnuelMoyen: 220,
    hausse2026: "+3,5% en moyenne sur les services courants",
    pointFort: "Reseau d'agences le plus dense de France, conseillers physiques",
    pointFaible: "Tarifs variables selon les 39 caisses regionales, peu lisibles",
    recommandation: "Negociez chaque ligne tarifaire avec votre conseiller. Demandez le pack jeune si vous avez < 30 ans.",
  },
  {
    slug: "bnp-paribas",
    nom: "BNP Paribas",
    type: "traditionnelle",
    emoji: "🏛",
    tenueCompte: 30,
    carteClassic: 47.5,
    cartePremier: 142,
    totalAnnuelMoyen: 235,
    hausse2026: "+2,9% sur les cartes, +5% sur les frais d'incidents",
    pointFort: "Application mobile parmi les meilleures du marche, services internationaux",
    pointFaible: "Frais de tenue de compte les plus eleves des grandes banques",
    recommandation: "Si vous avez moins de 28 ans, basculez vers Hello Bank (groupe BNP) : gratuit et meme securite.",
  },
  {
    slug: "societe-generale",
    nom: "Societe Generale",
    type: "traditionnelle",
    emoji: "🏦",
    tenueCompte: 24,
    carteClassic: 49.5,
    cartePremier: 144,
    totalAnnuelMoyen: 220,
    hausse2026: "+3% en moyenne, fusion en cours avec Credit du Nord",
    pointFort: "Banque privee performante, services entreprise solides",
    pointFaible: "Restructuration en cours, fermeture progressive d'agences",
    recommandation: "Plan de restructuration en cours : verifiez la stabilite de votre conseiller. Pensez a Boursobank (filiale Societe Generale).",
  },
  {
    slug: "banque-postale",
    nom: "La Banque Postale",
    type: "traditionnelle",
    emoji: "📮",
    tenueCompte: 0, // Tenue de compte gratuite
    carteClassic: 94.8, // Visa Classic 7,90 €/mois
    cartePremier: 165.6, // Visa Premier 13,80 €/mois
    totalAnnuelMoyen: 195,
    hausse2026: "Hausse importante en 2026 : carte Visa Classic +3%, virements +5%",
    pointFort: "Tenue de compte gratuite, accessibilite (clients fragiles), reseau postal",
    pointFaible: "Cartes parmi les plus cheres, service client surcharge",
    recommandation: "La carte Visa Classic a 95€/an est chere. Si vous n'utilisez pas le reseau postal, partez vers une banque en ligne.",
  },
  {
    slug: "lcl",
    nom: "LCL (Le Credit Lyonnais)",
    type: "traditionnelle",
    emoji: "🦁",
    tenueCompte: 24,
    carteClassic: 48,
    cartePremier: 144,
    totalAnnuelMoyen: 215,
    hausse2026: "+3,2% en moyenne, refonte des packs en 2026",
    pointFort: "Bon equilibre tarifs/services, conseillers disponibles",
    pointFaible: "Frais de retrait DAB hors LCL eleves",
    recommandation: "Negociez l'inclusion des retraits hors reseau dans votre pack si vous voyagez.",
  },
  {
    slug: "caisse-epargne",
    nom: "Caisse d'Epargne",
    type: "traditionnelle",
    emoji: "🐿",
    tenueCompte: 28,
    carteClassic: 47,
    cartePremier: 142,
    totalAnnuelMoyen: 225,
    hausse2026: "+3% sur les cartes, frais d'incidents au plafond legal",
    pointFort: "Bonne couverture territoriale, livret A et epargne reglementee",
    pointFaible: "17 caisses regionales = grandes variations tarifaires",
    recommandation: "Comparez avec votre Caisse voisine : les ecarts entre regions atteignent parfois 30%.",
  },
  {
    slug: "credit-mutuel",
    nom: "Credit Mutuel",
    type: "traditionnelle",
    emoji: "🤝",
    tenueCompte: 22,
    carteClassic: 47,
    cartePremier: 138,
    totalAnnuelMoyen: 200,
    hausse2026: "+2,5%, parmi les hausses les plus contenues",
    pointFort: "Banque mutualiste, tarifs souvent en dessous de la moyenne",
    pointFaible: "Federation regionale tres decentralisee",
    recommandation: "Souvent meilleure offre du circuit traditionnel. Demandez le pack famille si vous avez des enfants.",
  },
  {
    slug: "cic",
    nom: "CIC",
    type: "traditionnelle",
    emoji: "🏦",
    tenueCompte: 28,
    carteClassic: 48,
    cartePremier: 142,
    totalAnnuelMoyen: 220,
    hausse2026: "+3% en moyenne, alignement avec Credit Mutuel (meme groupe)",
    pointFort: "Banque urbaine, services entreprise solides",
    pointFaible: "Tarifs au-dessus du Credit Mutuel meme groupe",
    recommandation: "Si vous etes au CIC, comparez avec une federation Credit Mutuel proche : meme groupe, tarifs souvent inferieurs.",
  },
  {
    slug: "bred",
    nom: "BRED",
    type: "traditionnelle",
    emoji: "🌍",
    tenueCompte: 30,
    carteClassic: 49,
    cartePremier: 145,
    totalAnnuelMoyen: 230,
    hausse2026: "+3,5%, parmi les plus eleves du secteur",
    pointFort: "Dimension internationale (BPCE), conseil patrimonial",
    pointFaible: "Tarifs eleves, peu de promotions",
    recommandation: "Si vous n'utilisez pas les services internationaux, c'est cher pour ce que c'est.",
  },
  {
    slug: "hsbc-france",
    nom: "HSBC France",
    type: "traditionnelle",
    emoji: "🌐",
    tenueCompte: 60,
    carteClassic: 60,
    cartePremier: 195,
    totalAnnuelMoyen: 290,
    hausse2026: "Activite particuliers cedee a CCF, tarifs en transition",
    pointFort: "Reseau international (pour expatries)",
    pointFaible: "Banque la plus chere du circuit traditionnel, vente de la branche particuliers",
    recommandation: "Activite particuliers vendue : verifiez votre nouveau contrat CCF en 2026.",
  },
  // BANQUES EN LIGNE
  {
    slug: "boursobank",
    nom: "Boursobank (ex-Boursorama)",
    type: "ligne",
    emoji: "🥇",
    tenueCompte: 0,
    carteClassic: 0, // Welcome
    cartePremier: 0, // Ultim sous conditions
    totalAnnuelMoyen: 0,
    hausse2026: "Aucune hausse, lancement de Boursobank Custom (carte sur mesure)",
    pointFort: "Banque la moins chere de France 9 ans de suite (MoneyVox), prime jusqu'a 220€",
    pointFaible: "Pas d'agences physiques, plafond de retrait limite avec Welcome",
    recommandation: "Reference pour qui veut economiser. Carte Welcome gratuite sans condition de revenus.",
  },
  {
    slug: "fortuneo",
    nom: "Fortuneo",
    type: "ligne",
    emoji: "💎",
    tenueCompte: 0,
    carteClassic: 0,
    cartePremier: 0,
    totalAnnuelMoyen: 0,
    hausse2026: "Maintien de la gratuite sur Fosfo, refonte des cartes Gold/Mastercard",
    pointFort: "Carte World Elite Mastercard gratuite, frais etranger reduits, courtage en bourse",
    pointFaible: "Conditions de revenus pour Gold (1 800€/mois) et Elite (4 000€/mois)",
    recommandation: "Excellent choix pour revenus moyens et eleves. Carte Fosfo gratuite sans condition pour les autres.",
  },
  {
    slug: "hello-bank",
    nom: "Hello Bank",
    type: "ligne",
    emoji: "👋",
    tenueCompte: 0,
    carteClassic: 0,
    cartePremier: 60, // Hello Prime
    totalAnnuelMoyen: 0,
    hausse2026: "Maintien de la gratuite sur Hello One",
    pointFort: "Soutien BNP Paribas (agences accessibles), tarifs decouvert souples",
    pointFaible: "Hello Prime payante (60€/an) pour la carte premium",
    recommandation: "Bon compromis pour ceux qui veulent une banque en ligne avec acces aux agences BNP.",
  },
  {
    slug: "monabanq",
    nom: "Monabanq",
    type: "ligne",
    emoji: "🏦",
    tenueCompte: 0,
    carteClassic: 36, // Pratiq+ 3€/mois
    cartePremier: 72, // Uniq+ 6€/mois
    totalAnnuelMoyen: 36,
    hausse2026: "Stable, offre etoffee pour les profils atypiques",
    pointFort: "Accepte les profils atypiques (interdits bancaires, freelances)",
    pointFaible: "Pas totalement gratuite, mais reste tres competitive",
    recommandation: "Si vous avez un parcours bancaire complique, Monabanq est plus accessible que les autres.",
  },
  {
    slug: "bforbank",
    nom: "BforBank",
    type: "ligne",
    emoji: "📈",
    tenueCompte: 0,
    carteClassic: 0,
    cartePremier: 0,
    totalAnnuelMoyen: 0,
    hausse2026: "Refonte complete en 2024-2025, banque relancee avec une offre enrichie",
    pointFort: "Specialiste epargne et bourse (Credit Agricole), prime 160€",
    pointFaible: "Application mobile encore en rattrapage, condition de revenus",
    recommandation: "Bonne alternative si vous voulez epargner et investir avec une banque francaise (Credit Agricole).",
  },
  // NEOBANQUES
  {
    slug: "revolut",
    nom: "Revolut",
    type: "neobanque",
    emoji: "💜",
    tenueCompte: 0,
    carteClassic: 0,
    cartePremier: 95, // Revolut Premium
    totalAnnuelMoyen: 0,
    hausse2026: "Lancement de Revolut Bank en France (licence europeenne)",
    pointFort: "Excellent pour voyages, change instantane, crypto, IBAN francais en 2026",
    pointFaible: "Pas de prelevement automatique facile (mais s'ameliore), service client lent",
    recommandation: "Parfait en deuxieme banque ou pour voyages. IBAN francais disponible courant 2026.",
  },
  {
    slug: "n26",
    nom: "N26",
    type: "neobanque",
    emoji: "🇩🇪",
    tenueCompte: 0,
    carteClassic: 0,
    cartePremier: 119.4, // N26 You 9,90€/mois
    totalAnnuelMoyen: 0,
    hausse2026: "Levee des restrictions imposees par BaFin, retour des nouveaux clients",
    pointFort: "Application moderne, Spaces (sous-comptes), notification temps reel",
    pointFaible: "Pas de cheques, IBAN allemand (peut bloquer chez certains creanciers)",
    recommandation: "Excellente banque digitale. Verifiez que tous vos creanciers acceptent les IBAN allemands (DE).",
  },
  {
    slug: "lydia",
    nom: "Lydia",
    type: "neobanque",
    emoji: "💸",
    tenueCompte: 0,
    carteClassic: 0,
    cartePremier: 47.88, // Lydia+ 3,99€/mois
    totalAnnuelMoyen: 0,
    hausse2026: "Lancement de l'offre Sumeria (IBAN francais), banque complete",
    pointFort: "Paiement entre amis instantane, application notee 4,8/5",
    pointFaible: "Pas une banque traditionnelle complete (pas de cheques, decouvert limite)",
    recommandation: "Parfait pour usage quotidien et entre amis. Sumeria pour ceux qui veulent un IBAN francais.",
  },
];

export function getBanqueBySlug(slug: string): DonneesBanque | undefined {
  return BANQUES.find((b) => b.slug === slug);
}

export const BANQUE_SLUGS = BANQUES.map((b) => b.slug);
