import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer l'inflation et la perte de pouvoir d'achat ?";
const DESCRIPTION =
  "L'inflation se cumule en multipliant les coefficients annuels, pas en additionnant les taux. Méthode, exemples chiffrés (100 € de 2000, salaire de 2 000 €), francs en euros et perte de pouvoir d'achat.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-l-inflation" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "calcul inflation, inflation cumulée, calcul inflation entre deux années, combien valent 100 euros de 2000 aujourd'hui, calcul pouvoir d'achat, perte de pouvoir d'achat",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-l-inflation",
  fil: "Calculer l'inflation",
  emoji: "📈",
  couleur: "from-rose-500 to-red-600",
  h1: "Comment calculer l'inflation et la perte de pouvoir d'achat ?",
  chapo:
    "Que valent aujourd'hui 100 € de l'an 2000 ? De combien votre salaire a-t-il perdu en pouvoir d'achat s'il n'a pas bougé depuis quelques années ? La réponse tient en un coefficient, obtenu en multipliant les taux d'inflation année après année. Voici la méthode, des exemples chiffrés et les pièges à éviter.",
  reponse:
    "**Multipliez les coefficients (1 + taux) de chaque année, sans additionner les taux.** Le résultat est le coefficient cumulé : une somme d'hier, multipliée par ce coefficient, donne son équivalent d'aujourd'hui. La perte de pouvoir d'achat d'une somme qui ne bouge pas vaut **1 − 1 ÷ coefficient cumulé**.",
  sections: [
    {
      titre: "La méthode : multiplier les coefficients",
      paras: [
        "L'inflation est la hausse générale des prix d'une année à l'autre. Les taux de cet article sont l'inflation annuelle moyenne en France, publiée par l'Insee, de 2000 à 2025. Un taux de 2,0 % veut dire que les prix ont augmenté en moyenne de 2,0 % sur l'année.",
        "Pour cumuler plusieurs années, on passe par le **coefficient** de chaque année : 1 + taux ÷ 100. Pour 2,0 %, le coefficient est 1,02. On multiplie ensuite tous les coefficients entre eux.",
      ],
      liste: [
        "**Équivalent d'une somme :** somme de départ × coefficient cumulé.",
        "**Inflation cumulée :** (coefficient cumulé − 1) × 100, en %.",
        "**Pouvoir d'achat d'une somme qui ne bouge pas :** somme ÷ coefficient cumulé.",
        "**Perte de pouvoir d'achat :** 1 − 1 ÷ coefficient cumulé, en %.",
      ],
      suite: [
        "Pourquoi multiplier ? Parce que chaque année, la hausse s'applique à des prix déjà augmentés. C'est le même principe que les [intérêts composés](/comment-calculer-des-interets-composes), mais à l'envers : ici, l'argent perd de sa valeur.",
      ],
    },
    {
      titre: "Quelles années compte-t-on ?",
      paras: [
        "Le taux d'une année mesure la hausse des prix par rapport à l'année précédente. Entre une année de départ et une année d'arrivée, on applique donc les taux des années **après** l'année de départ, jusqu'à l'année d'arrivée comprise. Le taux de l'année de départ elle-même n'entre pas dans le calcul.",
        "Exemple : de 2020 à 2025, on utilise les taux de 2021, 2022, 2023, 2024 et 2025, soit cinq coefficients. Le calculateur procède exactement ainsi, avec 2025 comme dernière année : c'est la dernière année complète publiée dans ses données.",
      ],
    },
    {
      titre: "Exemple 1 : que valent 100 € de 2000 en 2025 ?",
      paras: [
        "On multiplie les coefficients des 25 années de 2001 à 2025 : 1,016 × 1,019 × 1,021 × … × 1,009.",
      ],
      etapes: [
        "Le coefficient cumulé obtenu est **1,5125**.",
        "L'inflation cumulée est donc de **51,25 %** (1,5125 − 1 = 0,5125).",
        "On multiplie : 100 € × 1,5125 = **151,25 €**.",
      ],
      suite: [
        "Il faut donc environ 151,25 € en 2025 pour acheter ce que 100 € permettaient d'acheter en 2000. Autrement dit, 100 € de 2025 ne valent plus que 100 ÷ 1,5125 = 66,12 € de 2000. La perte de pouvoir d'achat est de 1 − 1 ÷ 1,5125 = **33,88 %**.",
      ],
    },
    {
      titre: "Exemple 2 : 1 000 € de 2020 en 2025",
      paras: [
        "On multiplie les coefficients de 2021 à 2025 : 1,016 × 1,052 × 1,049 × 1,020 × 1,009.",
      ],
      etapes: [
        "Le coefficient cumulé vaut **1,15392**, soit une inflation cumulée de **15,39 %**.",
        "On multiplie : 1 000 € × 1,15392 = **1 153,92 €**.",
        "À l'inverse, 1 000 € qui n'ont pas bougé ne valent plus que 1 000 ÷ 1,15392 = **866,61 €** en pouvoir d'achat de 2020.",
      ],
      suite: [
        "Pour le détail d'une hausse en pourcentage, voyez [comment calculer un pourcentage d'augmentation](/comment-calculer-un-pourcentage-d-augmentation).",
      ],
    },
    {
      titre: "Exemple 3 : un salaire de 2 000 € net qui ne bouge pas",
      paras: [
        "Imaginons un salaire de 2 000 € net par mois, identique en 2021 et en 2025. Le montant est une hypothèse : remplacez-le par le vôtre. Les taux utilisés sont ceux de 2022, 2023, 2024 et 2025 : 5,2 %, 4,9 %, 2,0 % et 0,9 %.",
      ],
      etapes: [
        "Le coefficient cumulé vaut 1,052 × 1,049 × 1,020 × 1,009 = **1,13575**, soit +13,57 %.",
        "Pour garder le même niveau de vie, il faudrait 2 000 € × 1,13575 = **2 271,50 €**. Il manque donc 271,50 € par mois, soit environ 3 258 € par an.",
        "Le pouvoir d'achat réel des 2 000 € est de 2 000 ÷ 1,13575 = **1 760,95 €**, ce qui fait une perte de 239,05 €.",
        "La perte de pouvoir d'achat vaut 1 − 1 ÷ 1,13575 = **11,95 %**.",
      ],
      suite: [
        "Attention à ne pas confondre les deux montants : 271,50 € est ce qu'il faudrait **ajouter** au salaire pour le remettre au niveau de 2021, tandis que 239,05 € est ce que les 2 000 € **ont perdu** en valeur. Les pourcentages diffèrent aussi : +13,57 % d'un côté, −11,95 % de l'autre. Pour passer du brut au net, voyez le [calcul du salaire brut net](/salaire-brut-net).",
      ],
    },
    {
      titre: "Exemple 4 : 500 francs de 2000 en euros de 2025",
      paras: [
        "Le calculateur commence en 2000, et nous n'avons aucune donnée d'inflation avant cette année. Pour une somme en francs, il faut d'abord la convertir en euros avec le taux officiel : **1 € = 6,55957 francs**.",
      ],
      etapes: [
        "On convertit : 500 ÷ 6,55957 = **76,22 €**.",
        "On applique le coefficient de 2000 à 2025 : 76,22 × 1,5125 = **115,28 €**.",
      ],
      suite: [
        "Une somme de 500 francs en 2000 équivaut donc à environ 115,28 € en 2025. Pour une somme antérieure à 2000, cette méthode ne s'applique pas : sans taux, il est impossible de la calculer ici.",
      ],
    },
    {
      titre: "Exemple 5 : additionner les taux ou les multiplier ?",
      paras: [
        "Prenons les quatre années 2022, 2023, 2024 et 2025, avec les taux 5,2 %, 4,9 %, 2,0 % et 0,9 %. Les 2 000 € de l'exemple 3 servent de repère.",
      ],
      liste: [
        "**En additionnant :** 5,2 + 4,9 + 2,0 + 0,9 = 13,0 %, soit 2 000 × 1,13 = 2 260 €. C'est faux.",
        "**En multipliant :** coefficient 1,13575, soit +13,57 % et 2 271,50 €. C'est la bonne méthode.",
      ],
      suite: [
        "Sur quatre années, l'écart est de 11,50 €. Il grandit avec la durée : de 2000 à 2025, la somme des taux donne 41,9 %, alors que l'inflation cumulée est de 51,25 %. Sur 100 €, on passerait de 141,90 € (faux) à 151,25 € (juste).",
        "Les années 2022 et 2023 sont celles de la plus forte inflation depuis 2000 : 5,2 % et 4,9 %.",
      ],
    },
    {
      titre: "Résumé des exemples",
      tableau: {
        colonnes: ["Situation", "Coefficient", "Résultat"],
        lignes: [
          ["100 € de 2000 en 2025", "1,5125", "151,25 €"],
          ["1 000 € de 2020 en 2025", "1,15392", "1 153,92 €"],
          ["2 000 € net de 2021 en 2025", "1,13575", "2 271,50 € nécessaires"],
          ["Pouvoir d'achat de ces 2 000 €", "÷ 1,13575", "1 760,95 €"],
          ["500 francs de 2000 en 2025", "76,22 € × 1,5125", "115,28 €"],
        ],
      },
    },
    {
      titre: "Comment utiliser le calculateur d'inflation",
      paras: [
        "Le calculateur propose deux types de calcul : **Salaire** (salaire mensuel net) et **Prix / Montant**. Le choix ne change que les libellés et la phrase de résumé : le calcul est le même. Saisissez le montant en euros, puis choisissez l'**année de référence** dans la liste (de 2000 à 2024), ou cliquez sur 2015, 2020 ou 2023.",
        "Vous lisez le montant équivalent en 2025 (dernière année complète), l'inflation cumulée, le pouvoir d'achat réel de votre somme et la perte en euros. Un graphique et un tableau détaillent chaque année. En mode salaire, une phrase indique la perte annuelle, soit la perte mensuelle × 12.",
        "Le calculateur ne fait pas tout : l'année d'arrivée est toujours 2025, et il ne convertit pas les francs. Saisissez donc une somme en euros. Ses taux sont des moyennes annuelles : ils ne reflètent pas votre budget personnel, qui dépend de ce que vous achetez. Les montants affichés sont arrondis.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Additionner les taux.** Il faut multiplier les coefficients, comme dans l'exemple 5.",
        "**Compter l'année de départ.** Le taux de cette année-là ne s'applique pas : on commence l'année suivante.",
        "**Confondre les deux pourcentages.** Une hausse de 13,57 % des prix correspond à une perte de pouvoir d'achat de 11,95 %, pas de 13,57 %.",
        "**Oublier les francs.** Convertissez d'abord en euros avec 6,55957, puis appliquez l'inflation.",
        "**Prendre une moyenne pour votre cas.** L'inflation moyenne ne dit pas comment évoluent vos propres dépenses. Pour aller plus loin sur un pourcentage, voyez le [calcul de pourcentage](/calcul-pourcentage).",
      ],
      encadre:
        "Les montants de ces exemples (100 €, 1 000 €, 2 000 €, 500 francs) sont des hypothèses. Remplacez-les par les vôtres. Si vous placez votre argent, le [simulateur d'épargne](/simulateur-epargne) montre ce qu'il peut rapporter face à l'inflation.",
    },
  ],
  calculateur: {
    href: "/calculateur-inflation",
    nom: "Calculateur d'inflation",
    titre: "Calculez l'effet de l'inflation sur votre somme",
    texte:
      "Saisissez un montant et une année de référence : le calculateur affiche son équivalent en 2025, l'inflation cumulée et la perte de pouvoir d'achat.",
    bouton: "Ouvrir le calculateur d'inflation",
  },
  faq: [
    {
      q: "Comment calculer l'inflation cumulée entre deux années ?",
      a: "On multiplie les coefficients (1 + taux ÷ 100) des années qui suivent l'année de départ, jusqu'à l'année d'arrivée comprise. Le coefficient moins 1 donne l'inflation cumulée. De 2020 à 2025, on obtient 1,15392, soit +15,39 %.",
    },
    {
      q: "Combien valent 100 euros de 2000 aujourd'hui ?",
      a: "Avec les taux annuels moyens de l'Insee, 100 € de 2000 équivalent à 151,25 € en 2025, soit une inflation cumulée de 51,25 %.",
    },
    {
      q: "Comment calculer la perte de pouvoir d'achat ?",
      a: "Elle vaut 1 − 1 ÷ coefficient cumulé. Avec un coefficient de 1,13575 (2021 à 2025), la perte est de 11,95 % : 2 000 € ne valent plus que 1 760,95 € en pouvoir d'achat de 2021.",
    },
    {
      q: "Peut-on additionner les taux d'inflation de plusieurs années ?",
      a: "Non, car chaque hausse s'applique à des prix déjà augmentés. De 2022 à 2025, la somme des taux donne 13,0 %, mais l'inflation réelle cumulée est de 13,57 %.",
    },
    {
      q: "Comment convertir une somme en francs avant de calculer l'inflation ?",
      a: "On divise par 6,55957, le taux officiel : 500 francs font 76,22 €. On applique ensuite l'inflation à partir de 2000. Il n'y a pas de données d'inflation avant cette année.",
    },
  ],
  sources: [
    {
      label: "Insee : l'essentiel sur l'inflation",
      url: "https://www.insee.fr/fr/statistiques/4268033",
    },
  ],
  datePublication: "2026-11-20",
  dateAffichee: "20 novembre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
