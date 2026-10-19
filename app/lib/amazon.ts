// Liens Partenaires Amazon (affiliation).
// Tant que AMAZON_TAG est vide, le composant AmazonReco n'affiche rien.
// Ajouter une page : une entree dans AMAZON_RECOS. Les articles (ArticleGuide) l'affichent seuls,
// les autres pages doivent appeler <AmazonReco page="..." /> avant leur FAQ.
export const AMAZON_TAG = "mescalculat04-21";

export interface AmazonItem {
  label: string;
  why: string;
  query: string;
}

export interface AmazonBlock {
  title: string;
  items: AmazonItem[];
}

export function amazonSearchUrl(query: string): string {
  return `https://www.amazon.fr/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG}`;
}

const SURVIE: AmazonBlock = {
  title: "Le matériel de base en cas de coupure ou d'alerte",
  items: [
    { label: "Radio à manivelle", why: "Capte les informations sans courant ni piles.", query: "radio manivelle solaire" },
    { label: "Lampe frontale", why: "Garde les deux mains libres dans le noir.", query: "lampe frontale" },
    { label: "Jerrican d'eau pliable", why: "Stocke l'eau potable sans prendre de place.", query: "jerrican eau pliable" },
    { label: "Trousse de premiers secours", why: "Le minimum à avoir chez soi.", query: "trousse premiers secours" },
  ],
};

const POIDS: AmazonBlock = {
  title: "Suivre son poids à la maison",
  items: [
    { label: "Balance impédancemètre", why: "Mesure aussi la masse grasse et la masse musculaire.", query: "balance impédancemètre" },
    { label: "Mètre ruban", why: "Pour suivre le tour de taille, plus parlant que le poids seul.", query: "mètre ruban mesure corporelle" },
  ],
};

const RATION_CHIEN: AmazonBlock = {
  title: "Doser la ration au gramme près",
  items: [
    { label: "Balance de cuisine", why: "Pèse la ration exacte au lieu de l'estimer au verre doseur.", query: "balance de cuisine précise" },
    { label: "Gamelle anti-glouton", why: "Ralentit les chiens qui avalent trop vite.", query: "gamelle anti glouton chien" },
  ],
};

const VMA: AmazonBlock = {
  title: "Travailler à sa VMA",
  items: [
    { label: "Montre GPS cardio", why: "Affiche l'allure et la fréquence cardiaque pendant les fractionnés.", query: "montre gps running cardio" },
    { label: "Ceinture cardio", why: "Plus précise qu'un capteur au poignet sur les efforts courts.", query: "ceinture cardiofréquencemètre" },
  ],
};

const CALORIES: AmazonBlock = {
  title: "Compter ses calories sans se tromper",
  items: [
    { label: "Balance de cuisine", why: "Pèse les portions au gramme près.", query: "balance de cuisine précise" },
    { label: "Boîtes repas à compartiments", why: "Prépare des portions régulières à l'avance.", query: "boite repas compartiments" },
  ],
};

const GROSSESSE: AmazonBlock = {
  title: "Suivre sa grossesse à la maison",
  items: [
    { label: "Pèse-personne", why: "Pour noter son poids chaque semaine, à la même heure.", query: "balance pèse personne" },
    { label: "Coussin de grossesse", why: "Soulage le dos et aide à dormir sur le côté.", query: "coussin grossesse" },
  ],
};

const CHAUFFAGE: AmazonBlock = {
  title: "Faire baisser la facture de chauffage",
  items: [
    { label: "Thermostat programmable", why: "Baisse la température la nuit et en votre absence.", query: "thermostat programmable sans fil" },
    { label: "Boudin de porte", why: "Coupe les courants d'air sous les portes.", query: "boudin bas de porte" },
    { label: "Joint isolant de fenêtre", why: "Bouche les fuites d'air pour quelques euros.", query: "joint isolant fenêtre" },
  ],
};

const CLIM: AmazonBlock = {
  title: "Se rafraîchir",
  items: [
    { label: "Climatiseur mobile", why: "Sans travaux, à brancher dans une pièce.", query: "climatiseur mobile" },
    { label: "Ventilateur colonne", why: "Consomme beaucoup moins qu'un climatiseur.", query: "ventilateur colonne silencieux" },
  ],
};

const PEINTURE: AmazonBlock = {
  title: "Le matériel pour peindre",
  items: [
    { label: "Kit rouleau et bac", why: "L'essentiel pour les murs et plafonds.", query: "kit rouleau peinture" },
    { label: "Ruban de masquage", why: "Des bords nets autour des plinthes et fenêtres.", query: "ruban de masquage peinture" },
    { label: "Bâche de protection", why: "Protège le sol et les meubles.", query: "bâche protection peinture" },
  ],
};

const BURNOUT: AmazonBlock = {
  title: "Pour aller plus loin",
  items: [
    { label: "Livres sur le burn-out", why: "Comprendre les signes et en sortir.", query: "livre burn out" },
    { label: "Livres sur la gestion du stress", why: "Des méthodes concrètes au quotidien.", query: "livre gestion du stress" },
  ],
};

const COMPOSITION: AmazonBlock = {
  title: "Mesurer sa composition corporelle",
  items: [
    { label: "Balance impédancemètre", why: "Donne une estimation de la masse grasse à chaque pesée.", query: "balance impédancemètre" },
    { label: "Pince à plis cutanés", why: "Mesure l'épaisseur des plis de peau, la méthode des salles de sport.", query: "pince plis cutanés adipomètre" },
  ],
};

const PORTIONS: AmazonBlock = {
  title: "Peser ses portions",
  items: [
    { label: "Balance de cuisine", why: "Pèse les aliments au gramme près.", query: "balance de cuisine précise" },
    { label: "Boîtes repas à compartiments", why: "Prépare des repas réguliers à l'avance.", query: "boite repas compartiments" },
  ],
};

const SOMMEIL: AmazonBlock = {
  title: "Mieux dormir",
  items: [
    { label: "Masque de sommeil", why: "Fait le noir complet, même l'été.", query: "masque de sommeil" },
    { label: "Bouchons d'oreilles", why: "Coupent les bruits qui réveillent la nuit.", query: "bouchons d'oreilles sommeil" },
    { label: "Réveil lumière", why: "Simule le lever du soleil pour un réveil plus doux.", query: "réveil lumière simulateur d'aube" },
  ],
};

const EAU: AmazonBlock = {
  title: "Penser à boire",
  items: [
    { label: "Gourde graduée", why: "Les repères d'heures aident à boire régulièrement.", query: "gourde graduée repères horaires" },
    { label: "Carafe filtrante", why: "Pour boire l'eau du robinet avec moins de goût de chlore.", query: "carafe filtrante" },
  ],
};

const BAC: AmazonBlock = {
  title: "Pour réviser",
  items: [
    { label: "Annales du bac", why: "Les sujets des années passées, avec leurs corrigés.", query: "annales bac" },
    { label: "Calculatrice mode examen", why: "Le modèle utilisé au lycée en maths et en sciences.", query: "calculatrice graphique mode examen" },
  ],
};

const JEU_FPS: AmazonBlock = {
  title: "Pour viser plus juste",
  items: [
    { label: "Souris gaming", why: "Capteur précis et DPI réglable.", query: "souris gaming" },
    { label: "Grand tapis de souris", why: "La place de faire de grands gestes en basse sensibilité.", query: "grand tapis de souris gaming" },
  ],
};

const TEMPERATURE: AmazonBlock = {
  title: "Mesurer la température",
  items: [
    { label: "Thermomètre de cuisine", why: "Vérifie la cuisson à cœur, en °C ou en °F.", query: "thermomètre de cuisine" },
    { label: "Thermomètre de four", why: "Contrôle la vraie température du four.", query: "thermomètre de four" },
    { label: "Thermomètre frontal", why: "Prend la température du corps en une seconde.", query: "thermomètre frontal" },
  ],
};

// Clé = chemin de la page (sans le slash initial).
export const AMAZON_RECOS: Record<string, AmazonBlock> = {
  "calcul-consommation-electrique": {
    title: "Mesurer la consommation réelle de vos appareils",
    items: [
      { label: "Prise wattmètre", why: "Affiche ce que consomme vraiment l'appareil branché dessus.", query: "prise wattmètre compteur consommation électrique" },
      { label: "Multiprise à interrupteur", why: "Coupe les veilles de plusieurs appareils d'un seul geste.", query: "multiprise interrupteur" },
    ],
  },
  "calcul-ration-chien": RATION_CHIEN,
  "combien-de-croquettes-par-jour": RATION_CHIEN,
  "calcul-calories-chien-chat": {
    title: "Doser la ration au gramme près",
    items: [
      { label: "Balance de cuisine", why: "Pèse la ration exacte au lieu de l'estimer au verre doseur.", query: "balance de cuisine précise" },
      { label: "Gamelle anti-glouton", why: "Ralentit les chiens et les chats qui mangent trop vite.", query: "gamelle anti glouton" },
    ],
  },
  "simulateur-bombe-nucleaire": SURVIE,
  "calculateur-budget-survie": SURVIE,
  "simulateur-blackout": SURVIE,
  "simulateur-bunker": SURVIE,
  "que-mettre-dans-un-kit-de-survie": SURVIE,
  "calcul-classement-tennis-fft": {
    title: "Pour vos matchs",
    items: [
      { label: "Balles de tennis", why: "Des balles neuves pour les matchs homologués.", query: "balles de tennis" },
      { label: "Surgrips", why: "Une meilleure prise en main, à changer souvent.", query: "surgrip tennis" },
    ],
  },
  "calcul-vma": VMA,
  "comment-calculer-sa-vma": VMA,
  "convertisseur-allure-course": VMA,
  "calcul-calories-sport": {
    title: "Suivre ses dépenses à l'effort",
    items: [
      { label: "Montre connectée cardio", why: "Estime les calories brûlées à partir du rythme cardiaque.", query: "montre connectée cardio sport" },
      { label: "Ceinture cardio", why: "Plus précise qu'un capteur au poignet.", query: "ceinture cardiofréquencemètre" },
    ],
  },
  "calcul-ftp-cyclisme": {
    title: "Travailler sa FTP",
    items: [
      { label: "Home trainer connecté", why: "Pour faire le test FTP et les séances à la maison.", query: "home trainer connecté" },
      { label: "Capteur de puissance", why: "Mesure les watts sur le vélo, dehors comme dedans.", query: "capteur de puissance vélo" },
    ],
  },
  "calcul-allure-natation": {
    title: "Pour la piscine",
    items: [
      { label: "Lunettes de natation", why: "Une bonne étanchéité pour enchaîner les longueurs.", query: "lunettes de natation" },
      { label: "Montre de natation", why: "Compte les longueurs et donne l'allure aux 100 m.", query: "montre natation compteur longueurs" },
    ],
  },
  "calcul-1rm": {
    title: "Pour soulever lourd",
    items: [
      { label: "Ceinture de force", why: "Aide à gainer le dos sur les charges lourdes.", query: "ceinture de force musculation" },
      { label: "Magnésie", why: "Évite que la barre glisse dans les mains.", query: "magnésie musculation" },
    ],
  },
  "calcul-imc": POIDS,
  "comment-calculer-son-imc": POIDS,
  "calcul-age-metabolique": POIDS,
  "calcul-poids-ideal": POIDS,
  "quel-est-mon-poids-ideal": POIDS,
  "calcul-metabolisme-base": POIDS,
  "calcul-rapport-taille-tour-de-taille": POIDS,
  "calcul-masse-grasse": COMPOSITION,
  "calcul-ffmi": COMPOSITION,
  "calcul-calories": CALORIES,
  "combien-de-calories-par-jour-pour-maigrir": CALORIES,
  "calcul-proteines": PORTIONS,
  "calcul-macros": PORTIONS,
  "calcul-prise-poids-grossesse": GROSSESSE,
  "calcul-date-accouchement": GROSSESSE,
  "date-d-accouchement-calcul-exact": GROSSESSE,
  "calcul-ovulation": {
    title: "Repérer sa période fertile",
    items: [
      { label: "Tests d'ovulation", why: "Détectent le pic d'hormone qui précède l'ovulation.", query: "test ovulation" },
      { label: "Thermomètre basal", why: "Repère la petite hausse de température qui suit l'ovulation.", query: "thermomètre basal" },
    ],
  },
  "calcul-percentile-bebe": {
    title: "Suivre la croissance à la maison",
    items: [
      { label: "Pèse-bébé", why: "Pour suivre le poids entre deux rendez-vous chez le médecin.", query: "pèse bébé" },
      { label: "Toise pour bébé", why: "Mesure la taille allongée, comme chez le pédiatre.", query: "toise bébé" },
    ],
  },
  "calcul-besoin-sommeil": SOMMEIL,
  "calcul-cycles-sommeil": SOMMEIL,
  "calcul-dette-sommeil": SOMMEIL,
  "combien-d-heures-de-sommeil-par-nuit": SOMMEIL,
  "calcul-consommation-eau": EAU,
  "combien-de-litres-d-eau-par-jour": EAU,
  "calcul-risque-cardiovasculaire": {
    title: "Surveiller sa tension",
    items: [
      { label: "Tensiomètre au bras", why: "Pour suivre sa tension chez soi, au calme.", query: "tensiomètre bras" },
    ],
  },
  "simulateur-facture-gaz": CHAUFFAGE,
  "combien-coute-le-chauffage-au-gaz": CHAUFFAGE,
  "combien-consomme-un-radiateur-electrique": {
    title: "Faire baisser la facture de chauffage",
    items: [
      { label: "Prise wattmètre", why: "Mesure ce que le radiateur consomme vraiment sur une journée.", query: "prise wattmètre compteur consommation électrique" },
      { label: "Boudin de porte", why: "Coupe les courants d'air sous les portes.", query: "boudin bas de porte" },
      { label: "Joint isolant de fenêtre", why: "Bouche les fuites d'air pour quelques euros.", query: "joint isolant fenêtre" },
    ],
  },
  "quelle-temperature-pour-le-chauffage": {
    title: "Régler la bonne température",
    items: [
      { label: "Thermomètre hygromètre", why: "Affiche la température réelle de chaque pièce.", query: "thermomètre hygromètre" },
      { label: "Thermostat programmable", why: "Baisse la température la nuit et en votre absence.", query: "thermostat programmable sans fil" },
    ],
  },
  "combien-consomme-un-frigo": {
    title: "Vérifier votre frigo",
    items: [
      { label: "Prise wattmètre", why: "Affiche ce que le frigo consomme vraiment.", query: "prise wattmètre compteur consommation électrique" },
      { label: "Thermomètre de frigo", why: "Un frigo réglé trop froid consomme plus.", query: "thermomètre réfrigérateur" },
    ],
  },
  "cout-climatisation": CLIM,
  "combien-consomme-une-climatisation": CLIM,
  "calcul-puissance-climatisation": CLIM,
  "rafraichir-maison-sans-clim": {
    title: "Garder la fraîcheur sans clim",
    items: [
      { label: "Ventilateur colonne", why: "Consomme beaucoup moins qu'un climatiseur.", query: "ventilateur colonne silencieux" },
      { label: "Rideaux occultants thermiques", why: "Bloquent la chaleur du soleil pendant la journée.", query: "rideaux occultants thermiques" },
      { label: "Film solaire pour fenêtre", why: "Renvoie une partie de la chaleur avant qu'elle entre.", query: "film solaire anti chaleur fenêtre" },
    ],
  },
  "calcul-indice-glycemique": {
    title: "Pour aller plus loin",
    items: [
      { label: "Livres sur l'index glycémique", why: "Tables complètes et idées de repas.", query: "livre index glycémique" },
      { label: "Balance de cuisine", why: "La charge glycémique dépend de la portion : il faut la peser.", query: "balance de cuisine précise" },
    ],
  },
  "calcul-temperature-ressentie": {
    title: "Mesurer chez soi",
    items: [
      { label: "Station météo", why: "Température, humidité et vent, dedans et dehors.", query: "station météo intérieur extérieur" },
      { label: "Thermomètre hygromètre", why: "Petit écran pour surveiller une pièce.", query: "thermomètre hygromètre" },
    ],
  },
  "conversion-temperature": TEMPERATURE,
  "comment-convertir-fahrenheit-en-celsius": TEMPERATURE,
  "calcul-surface-peinture": PEINTURE,
  "combien-de-litres-de-peinture": PEINTURE,
  "test-burnout-mbi": BURNOUT,
  "comment-reconnaitre-un-burn-out": BURNOUT,
  "calcul-mention-bac": BAC,
  "calcul-moyenne": BAC,
  "comment-calculer-sa-moyenne": BAC,
  "calcul-handicap-golf-whs": {
    title: "Pour le parcours",
    items: [
      { label: "Balles de golf", why: "Un lot pour le practice et le parcours.", query: "balles de golf" },
      { label: "Télémètre de golf", why: "Donne la distance exacte jusqu'au drapeau.", query: "télémètre golf" },
    ],
  },
  "convertisseur-sensibilite-fps": JEU_FPS,
  "calcul-fov-jeu": JEU_FPS,
};
