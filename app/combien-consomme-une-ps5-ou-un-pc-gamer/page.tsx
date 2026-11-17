import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Combien consomme une PS5 ou un PC gamer ?";
const DESCRIPTION =
  "Une PS5 consomme environ 200 W en jeu et un PC gamer 350 W. Méthode de calcul, coût par heure, par mois et par an avec des exemples chiffrés, écran compris.";

export const metadata: Metadata = {
  alternates: { canonical: "/combien-consomme-une-ps5-ou-un-pc-gamer" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "consommation PS5, consommation PS5 par heure, consommation PS5 par mois, combien consomme un PC gamer par mois, combien coûte une PS5 en électricité, consommation PC gamer",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/combien-consomme-une-ps5-ou-un-pc-gamer",
  fil: "PS5 et PC gamer",
  emoji: "🎮",
  couleur: "from-violet-500 to-fuchsia-600",
  h1: "Combien consomme une PS5 ou un PC gamer ?",
  chapo:
    "Une soirée de jeu, c'est du plaisir, mais aussi des kilowattheures sur la facture. Voici comment calculer ce que coûte votre console ou votre PC, avec des exemples chiffrés par heure, par mois et par an.",
  reponse:
    "**Le calculateur retient 200 W pour une PS5 et 350 W pour un PC gamer, en jeu.** Cela donne 0,2 kWh et 0,35 kWh par heure, soit environ 0,04 € et 0,07 € l'heure au tarif Base de 0,2001 € le kWh. Ce sont des valeurs moyennes : la consommation réelle dépend du jeu, du modèle et des réglages.",
  sections: [
    {
      titre: "La méthode : des watts aux euros",
      paras: [
        "La puissance d'un appareil s'exprime en watts (W). Pour savoir ce qu'il consomme, on la multiplie par la durée d'utilisation, puis on convertit en kilowattheures (kWh). Le coût s'obtient ensuite avec le prix du kWh.",
      ],
      liste: [
        "**Énergie :** kWh = puissance en W × heures ÷ 1 000.",
        "**Coût :** coût = kWh × prix du kWh.",
      ],
      suite: [
        "Le calculateur utilise les tarifs Bleu d'EDF, en vigueur depuis le 1er août 2026 pour les puissances de 3 et 6 kVA, toutes taxes comprises : **0,2001 € le kWh** en option Base, ou **0,2142 €** en heures pleines et **0,1589 €** en heures creuses. Les exemples ci-dessous utilisent l'option Base. Un mois y est compté pour 30 jours et une année pour 365 jours.",
      ],
    },
    {
      titre: "Les puissances retenues par le calculateur",
      paras: [
        "Le calculateur propose des raccourcis avec une puissance moyenne en jeu pour chaque appareil. Ceux qui nous intéressent ici :",
      ],
      tableau: {
        colonnes: ["Appareil", "Puissance", "Durée proposée par défaut"],
        lignes: [
          ["PS5", "200 W", "3 h par jour"],
          ["Xbox Series X", "200 W", "3 h par jour"],
          ["PC gamer", "350 W", "4 h par jour"],
          ["Téléviseur", "120 W", "4 h par jour"],
        ],
      },
      suite: [
        "Ces chiffres sont des **moyennes**. Un jeu très gourmand en graphismes fait travailler la machine plus fort qu'un jeu simple ou qu'un menu, et chaque modèle et chaque réglage change le résultat.",
      ],
    },
    {
      titre: "Exemple 1 : une PS5 2 h par jour pendant 30 jours",
      paras: ["Avec 200 W, 2 h de jeu par jour et un kWh à 0,2001 € :"],
      etapes: [
        "Énergie par jour : 200 × 2 ÷ 1 000 = 0,4 kWh.",
        "Énergie sur 30 jours : 0,4 × 30 = 12 kWh.",
        "Coût : 12 × 0,2001 = **2,40 €** pour le mois.",
      ],
      suite: [
        "Jouer 2 h par jour pendant un mois coûte donc environ 2,40 € d'électricité pour la console seule.",
      ],
    },
    {
      titre: "Exemple 2 : une PS5 3 h par jour pendant un an",
      paras: [
        "C'est ce que le calculateur propose quand on clique sur PS5 : 200 W et 3 h par jour.",
      ],
      etapes: [
        "Énergie par jour : 200 × 3 ÷ 1 000 = 0,6 kWh.",
        "Énergie sur 365 jours : 0,6 × 365 = 219 kWh.",
        "Coût : 219 × 0,2001 = **43,82 €** pour l'année.",
      ],
    },
    {
      titre: "Exemple 3 : un PC gamer 4 h par jour",
      paras: ["Quand on clique sur PC Gamer, le calculateur propose 350 W et 4 h par jour."],
      etapes: [
        "Énergie par jour : 350 × 4 ÷ 1 000 = 1,4 kWh.",
        "Sur 30 jours : 1,4 × 30 = 42 kWh, soit 42 × 0,2001 = **8,40 €**.",
        "Sur 365 jours : 1,4 × 365 = 511 kWh, soit 511 × 0,2001 = **102,25 €**.",
      ],
      suite: [
        "Pour le même nombre d'heures, un PC gamer consomme donc nettement plus qu'une PS5 : 350 W contre 200 W, soit 1,75 fois plus.",
      ],
    },
    {
      titre: "Exemple 4 : un week-end de 10 h de jeu sur PC",
      paras: ["Pour une session ponctuelle, on ne passe pas par les jours."],
      etapes: [
        "Énergie : 350 × 10 ÷ 1 000 = 3,5 kWh.",
        "Coût : 3,5 × 0,2001 = **0,70 €**.",
      ],
    },
    {
      titre: "Exemple 5 : la PS5 et le téléviseur",
      paras: [
        "La console ne fait pas tout le coût : il faut aussi compter l'écran. Avec le téléviseur du calculateur (120 W), on additionne les puissances : 200 + 120 = 320 W. Pour 2 h par jour pendant 30 jours :",
      ],
      etapes: [
        "Énergie par jour : 320 × 2 ÷ 1 000 = 0,64 kWh.",
        "Énergie sur 30 jours : 0,64 × 30 = 19,2 kWh.",
        "Coût : 19,2 × 0,2001 = **3,84 €**.",
      ],
      suite: [
        "Le téléviseur seul représente 7,2 kWh, soit 1,44 €, contre 2,40 € pour la console. L'écran pèse donc plus d'un tiers de la facture de la soirée de jeu. Sur PC, l'écran consomme lui aussi en plus de l'unité centrale.",
      ],
    },
    {
      titre: "Exemple 6 : combien coûte une heure de jeu ?",
      paras: ["Pour une heure, au tarif Base à 0,2001 € le kWh :"],
      liste: [
        "**PS5 :** 200 × 1 ÷ 1 000 = 0,2 kWh, soit 0,2 × 0,2001 = **0,04 €**.",
        "**PC gamer :** 350 × 1 ÷ 1 000 = 0,35 kWh, soit 0,35 × 0,2001 = **0,07 €**.",
      ],
    },
    {
      titre: "Résumé des exemples",
      tableau: {
        colonnes: ["Situation", "Énergie", "Coût (Base)"],
        lignes: [
          ["PS5, 1 h", "0,2 kWh", "0,04 €"],
          ["PC gamer, 1 h", "0,35 kWh", "0,07 €"],
          ["PS5, 2 h par jour, 30 jours", "12 kWh", "2,40 €"],
          ["PS5, 3 h par jour, 1 an", "219 kWh", "43,82 €"],
          ["PC gamer, 4 h par jour, 30 jours", "42 kWh", "8,40 €"],
          ["PC gamer, 4 h par jour, 1 an", "511 kWh", "102,25 €"],
          ["PC gamer, week-end de 10 h", "3,5 kWh", "0,70 €"],
          ["PS5 + téléviseur, 2 h par jour, 30 jours", "19,2 kWh", "3,84 €"],
        ],
      },
    },
    {
      titre: "Mesurer la vraie consommation chez vous",
      paras: [
        "Les valeurs du calculateur sont des moyennes. Pour connaître la consommation réelle de votre installation, branchez une **prise wattmètre**, un petit appareil placé entre la prise murale et l'appareil. Elle indique la puissance réelle et l'énergie consommée. Relevez la valeur pendant que vous jouez, puis saisissez-la dans le champ de puissance du calculateur à la place de 200 ou 350 W.",
      ],
    },
    {
      titre: "La veille et les réglages",
      paras: [
        "En veille, une console consomme beaucoup moins qu'en jeu, mais **pas zéro**. Si votre console reste branchée toute la journée, regardez le réglage de veille dans ses paramètres et choisissez celui qui convient à votre usage. Éteindre l'écran quand vous ne jouez pas évite aussi de consommer pour rien.",
      ],
    },
    {
      titre: "Comment utiliser le calculateur de consommation électrique",
      paras: [
        "Dans la grille **Appareil (raccourci)**, cliquez sur « PS5 », « Xbox Series X » ou « PC Gamer » : la puissance et le nombre d'heures par jour se remplissent tout seuls. Vous pouvez ensuite les modifier à la main, ou choisir une durée parmi les boutons 1 h, 3 h, 5 h, 8 h, 12 h et 24 h.",
        "En haut, choisissez l'**option tarifaire** : Base, ou Heures pleines / Heures creuses. Avec cette seconde option, indiquez le nombre d'heures pleines et creuses par jour (16 et 8 par défaut), car le prix moyen du kWh dépend de cette répartition.",
        "Le calculateur affiche le **coût par mois** et la consommation en kWh par mois, ainsi que le coût et les kWh par jour et par an, une comparaison annuelle entre les deux options et un résumé de votre saisie. Le bouton « Ajouter à ma liste » permet de cumuler plusieurs appareils, par exemple la console et le téléviseur, et d'obtenir un total par mois et par an.",
        "Pour comparer avec d'autres appareils, voyez [combien consomme un frigo](/combien-consomme-un-frigo) ou [combien consomme un radiateur électrique](/combien-consomme-un-radiateur-electrique). Le site propose aussi un [convertisseur de monnaie de jeu](/convertisseur-monnaie-jeu). Pour lancer directement un calcul, ouvrez le [calculateur de consommation électrique](/calcul-consommation-electrique).",
      ],
      encadre:
        "Le calculateur donne une estimation basée sur les tarifs EDF Bleu. Votre tarif réel peut varier selon votre contrat et votre fournisseur.",
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Oublier de diviser par 1 000.** Les watts doivent être convertis en kilowatts : 200 W font 0,2 kW.",
        "**Compter la console seule.** L'écran, le casque ou les enceintes s'ajoutent à la facture.",
        "**Prendre la puissance maximale pour la puissance moyenne.** Mesurez avec une prise wattmètre plutôt que de vous fier à une valeur lue sur une fiche.",
        "**Confondre heures par jour et heures par mois.** Multipliez par 30 pour un mois ou par 365 pour un an.",
        "**Oublier la veille.** Une console laissée branchée consomme même quand vous ne jouez pas.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-consommation-electrique",
    nom: "Consommation électrique",
    titre: "Calculez le coût de vos heures de jeu",
    texte:
      "Choisissez PS5, Xbox Series X ou PC Gamer, réglez les heures par jour et l'option tarifaire : le calculateur affiche la consommation et le coût par jour, par mois et par an.",
    bouton: "Ouvrir le calculateur de consommation électrique",
  },
  faq: [
    {
      q: "Combien consomme une PS5 par heure ?",
      a: "Le calculateur retient 200 W en jeu, soit 0,2 kWh par heure. Au tarif Base de 0,2001 € le kWh, cela fait environ 0,04 € l'heure. La valeur réelle dépend du jeu et du modèle.",
    },
    {
      q: "Combien coûte une PS5 par mois en électricité ?",
      a: "Pour 2 h de jeu par jour pendant 30 jours, la consommation est de 12 kWh, soit 2,40 € au tarif Base. Avec 3 h par jour, on arrive à 18 kWh, soit 3,60 € par mois.",
    },
    {
      q: "Combien consomme un PC gamer par mois ?",
      a: "Avec 350 W et 4 h de jeu par jour, un PC gamer consomme 42 kWh en 30 jours, soit 8,40 € au tarif Base. Sur un an, cela fait 511 kWh et 102,25 €.",
    },
    {
      q: "Faut-il compter l'écran dans le coût ?",
      a: "Oui. Avec le téléviseur du calculateur (120 W), la PS5 et l'écran représentent 320 W. Pour 2 h par jour pendant 30 jours, le coût passe de 2,40 € à 3,84 €.",
    },
    {
      q: "Comment connaître la vraie consommation de ma console ou de mon PC ?",
      a: "Branchez une prise wattmètre entre la prise murale et l'appareil, puis relevez la puissance pendant que vous jouez. Saisissez cette valeur dans le calculateur à la place de la valeur moyenne.",
    },
  ],
  sources: [],
  datePublication: "2026-11-16",
  dateAffichee: "16 novembre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
