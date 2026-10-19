// Liens Partenaires Amazon (affiliation).
// Tant que AMAZON_TAG est vide, le composant AmazonReco n'affiche rien.
// Renseigner l'identifiant de suivi du compte Partenaires (format "xxxxx-21"), puis pousser.
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

// Clé = chemin de la page (sans le slash initial).
export const AMAZON_RECOS: Record<string, AmazonBlock> = {
  "calcul-consommation-electrique": {
    title: "Mesurer la consommation réelle de vos appareils",
    items: [
      { label: "Prise wattmètre", why: "Affiche ce que consomme vraiment l'appareil branché dessus.", query: "prise wattmètre compteur consommation électrique" },
      { label: "Multiprise à interrupteur", why: "Coupe les veilles de plusieurs appareils d'un seul geste.", query: "multiprise interrupteur" },
    ],
  },
  "calcul-ration-chien": {
    title: "Doser la ration au gramme près",
    items: [
      { label: "Balance de cuisine", why: "Pèse la ration exacte au lieu de l'estimer au verre doseur.", query: "balance de cuisine précise" },
      { label: "Gamelle anti-glouton", why: "Ralentit les chiens qui avalent trop vite.", query: "gamelle anti glouton chien" },
    ],
  },
  "simulateur-bombe-nucleaire": SURVIE,
  "calculateur-budget-survie": SURVIE,
  "simulateur-blackout": SURVIE,
  "calcul-classement-tennis-fft": {
    title: "Pour vos matchs",
    items: [
      { label: "Balles de tennis", why: "Des balles neuves pour les matchs homologués.", query: "balles de tennis" },
      { label: "Surgrips", why: "Une meilleure prise en main, à changer souvent.", query: "surgrip tennis" },
    ],
  },
  "calcul-vma": {
    title: "Travailler à sa VMA",
    items: [
      { label: "Montre GPS cardio", why: "Affiche l'allure et la fréquence cardiaque pendant les fractionnés.", query: "montre gps running cardio" },
      { label: "Ceinture cardio", why: "Plus précise qu'un capteur au poignet sur les efforts courts.", query: "ceinture cardiofréquencemètre" },
    ],
  },
  "calcul-imc": POIDS,
  "calcul-age-metabolique": POIDS,
  "calcul-calories": {
    title: "Compter ses calories sans se tromper",
    items: [
      { label: "Balance de cuisine", why: "Pèse les portions au gramme près.", query: "balance de cuisine précise" },
      { label: "Boîtes repas à compartiments", why: "Prépare des portions régulières à l'avance.", query: "boite repas compartiments" },
    ],
  },
  "calcul-prise-poids-grossesse": {
    title: "Suivre sa grossesse à la maison",
    items: [
      { label: "Pèse-personne", why: "Pour noter son poids chaque semaine, à la même heure.", query: "balance pèse personne" },
      { label: "Coussin de grossesse", why: "Soulage le dos et aide à dormir sur le côté.", query: "coussin grossesse" },
    ],
  },
  "simulateur-facture-gaz": {
    title: "Faire baisser la facture de chauffage",
    items: [
      { label: "Thermostat programmable", why: "Baisse la température la nuit et en votre absence.", query: "thermostat programmable sans fil" },
      { label: "Boudin de porte", why: "Coupe les courants d'air sous les portes.", query: "boudin bas de porte" },
      { label: "Joint isolant de fenêtre", why: "Bouche les fuites d'air pour quelques euros.", query: "joint isolant fenêtre" },
    ],
  },
  "cout-climatisation": {
    title: "Se rafraîchir",
    items: [
      { label: "Climatiseur mobile", why: "Sans travaux, à brancher dans une pièce.", query: "climatiseur mobile" },
      { label: "Ventilateur colonne", why: "Consomme beaucoup moins qu'un climatiseur.", query: "ventilateur colonne silencieux" },
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
  "calcul-surface-peinture": {
    title: "Le matériel pour peindre",
    items: [
      { label: "Kit rouleau et bac", why: "L'essentiel pour les murs et plafonds.", query: "kit rouleau peinture" },
      { label: "Ruban de masquage", why: "Des bords nets autour des plinthes et fenêtres.", query: "ruban de masquage peinture" },
      { label: "Bâche de protection", why: "Protège le sol et les meubles.", query: "bâche protection peinture" },
    ],
  },
  "test-burnout-mbi": {
    title: "Pour aller plus loin",
    items: [
      { label: "Livres sur le burn-out", why: "Comprendre les signes et en sortir.", query: "livre burn out" },
      { label: "Livres sur la gestion du stress", why: "Des méthodes concrètes au quotidien.", query: "livre gestion du stress" },
    ],
  },
};
