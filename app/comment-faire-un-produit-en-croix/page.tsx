import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment faire un produit en croix ?";
const DESCRIPTION =
  "Le produit en croix (ou règle de trois) permet de trouver une quatrième valeur quand deux grandeurs sont proportionnelles. Méthode pas à pas, exemples chiffrés, pièges et cas où il ne marche pas.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-faire-un-produit-en-croix" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "produit en croix, règle de trois, c'est quoi le produit en croix, produit en croix exemple, calcul pourcentage, proportionnalité",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-faire-un-produit-en-croix",
  fil: "Produit en croix",
  emoji: "✖️",
  couleur: "from-violet-500 to-purple-600",
  h1: "Comment faire un produit en croix ?",
  chapo:
    "Adapter une recette, calculer un prix, lire une carte ou trouver un pourcentage : le produit en croix, aussi appelé règle de trois, sert dans toutes ces situations. Voici la méthode, des exemples chiffrés et les cas où il ne faut pas l'utiliser.",
  reponse:
    "**Si a correspond à b, et c correspond à x, alors x = b × c ÷ a.** On multiplie les deux nombres en diagonale (b et c), puis on divise par le nombre qui reste (a). Cette méthode fonctionne uniquement quand les deux grandeurs sont proportionnelles.",
  sections: [
    {
      titre: "C'est quoi le produit en croix ?",
      paras: [
        "Le produit en croix, ou règle de trois, sert à trouver une **quatrième valeur** quand on en connaît trois. Il s'applique à deux grandeurs proportionnelles : quand l'une est multipliée par un nombre, l'autre l'est par le même nombre.",
        "On présente les données dans un tableau. Si a correspond à b, et c correspond à x, on écrit :",
      ],
      tableau: {
        colonnes: ["Première grandeur", "Deuxième grandeur"],
        lignes: [
          ["a", "b"],
          ["c", "x"],
        ],
        texte: true,
      },
      suite: [
        "Dans un tableau de proportionnalité, les « produits en croix » sont égaux : **a × x = b × c**. On en déduit la formule : **x = b × c ÷ a**.",
        "C'est une méthode qui s'apprend au collège et qui sert ensuite toute la vie : en cuisine, en courses, en bricolage ou pour un taux.",
      ],
      visuel: {
        fichier: "produit-en-croix-recette",
        alt: "Plan de travail de cuisine avec une balance, un bol de farine, un verre doseur de lait, trois œufs, une cuillère en bois et une petite fiche recette illisible.",
        legende:
          "Adapter une recette à un autre nombre de personnes est l'un des usages les plus courants du produit en croix.",
      },
    },
    {
      titre: "Exemple 1 : adapter une recette",
      paras: [
        "Une recette pour 4 personnes demande 200 g de farine. Combien en faut-il pour 6 personnes, puis pour 3 personnes ? Le nombre de personnes et la quantité de farine sont proportionnels : pour deux fois plus de convives, il faut deux fois plus de farine.",
        "Commençons par 6 personnes.",
      ],
      etapes: [
        "On écrit le tableau : 4 personnes correspondent à 200 g, 6 personnes correspondent à x.",
        "On multiplie en diagonale : 200 × 6 = 1 200.",
        "On divise par le nombre restant : 1 200 ÷ 4 = **300 g**.",
      ],
      suite: [
        "Pour 3 personnes, on garde le même tableau, avec 4 personnes pour 200 g, et on remplace 6 par 3 : 200 × 3 = 600, puis 600 ÷ 4 = **150 g**.",
        "Les deux résultats sont logiques : 6 personnes, c'est plus que 4, donc plus de farine ; 3 personnes, c'est moins, donc moins de farine.",
      ],
    },
    {
      titre: "Exemple 2 : calculer un prix",
      paras: [
        "1,5 kg de pommes coûte 4,20 €. Combien coûtent 2 kg, au même prix au kilo ?",
      ],
      etapes: [
        "On écrit le tableau : 1,5 kg correspond à 4,20 €, 2 kg correspond à x.",
        "On multiplie en diagonale : 4,20 × 2 = 8,40.",
        "On divise par le nombre restant : 8,40 ÷ 1,5 = **5,60 €**.",
      ],
      suite: [
        "On peut vérifier : 4,20 ÷ 1,5 = 2,80 €, c'est le prix d'un kilo. Deux kilos coûtent bien 2 × 2,80 € = 5,60 €.",
      ],
    },
    {
      titre: "Exemple 3 : lire une carte",
      paras: [
        "Sur une carte au 1/25 000, 1 cm sur la carte représente 25 000 cm en vrai. Combien représentent 4 cm sur la carte ?",
      ],
      etapes: [
        "On écrit le tableau : 1 cm sur la carte correspond à 25 000 cm en vrai, 4 cm sur la carte correspondent à x.",
        "On multiplie en diagonale : 25 000 × 4 = 100 000.",
        "On divise par le nombre restant : 100 000 ÷ 1 = 100 000 cm.",
        "On convertit : 100 000 cm = 1 000 m, soit **1 km**.",
      ],
      suite: [
        "Sur cette carte, 4 cm représentent donc 1 km sur le terrain.",
      ],
    },
    {
      titre: "Exemple 4 : trouver un pourcentage",
      paras: [
        "Un pourcentage est une proportion rapportée à 100. Dans une classe de 24 élèves, 18 élèves ont réussi le test. Quel pourcentage cela représente-t-il ?",
        "On pose : 24 élèves correspondent à 100 %, 18 élèves correspondent à x.",
      ],
      etapes: [
        "On multiplie en diagonale : 18 × 100 = 1 800.",
        "On divise par le nombre restant : 1 800 ÷ 24 = **75 %**.",
      ],
      suite: [
        "18 élèves sur 24, c'est donc 75 % de la classe. Vérification : 75 % de 24 fait bien 18.",
      ],
    },
    {
      titre: "Résumé des exemples",
      tableau: {
        colonnes: ["Situation", "Calcul", "Résultat"],
        lignes: [
          ["Farine pour 6 personnes", "200 × 6 ÷ 4", "300 g"],
          ["Farine pour 3 personnes", "200 × 3 ÷ 4", "150 g"],
          ["2 kg de pommes", "4,20 × 2 ÷ 1,5", "5,60 €"],
          ["4 cm sur une carte au 1/25 000", "25 000 × 4 ÷ 1", "100 000 cm, soit 1 km"],
          ["18 élèves sur 24", "18 × 100 ÷ 24", "75 %"],
        ],
      },
    },
    {
      titre: "Quand le produit en croix ne marche pas",
      paras: [
        "Le produit en croix ne donne un résultat juste que si les deux grandeurs sont **proportionnelles**. Dans le cas contraire, le résultat est faux, même si le calcul est bien fait. Voici des situations où il ne faut pas l'utiliser.",
      ],
      liste: [
        "**La taille d'un enfant et son âge.** Un enfant ne grandit pas deux fois plus quand son âge double : la taille et l'âge ne sont pas proportionnels.",
        "**Un prix dégressif par quantité.** Si le prix au kilo baisse quand vous achetez davantage, le prix total n'est pas proportionnel à la quantité.",
        "**Le temps de cuisson selon le poids.** Ce n'est pas garanti proportionnel : un plat deux fois plus lourd ne cuit pas forcément deux fois plus longtemps.",
      ],
      encadre:
        "Avant de calculer, posez-vous la question : si une grandeur double, l'autre double-t-elle aussi ? Si la réponse est non, ou si vous avez un doute, le produit en croix n'est pas la bonne méthode.",
    },
    {
      titre: "Comment utiliser le calculateur de produit en croix",
      paras: [
        "Le calculateur est construit sur l'égalité A / B = C / D. Vous saisissez trois valeurs connues dans les champs **A**, **B** et **C**, et le calculateur trouve la valeur **D**. Vous pouvez écrire les décimales avec une virgule ou avec un point.",
        "Rangez vos données dans le même ordre que dans le tableau : A correspond à B, et C correspond à D. Pour la recette de l'exemple 1, saisissez A = 4, B = 200 et C = 6 : D vaut 300.",
        "Le calculateur affiche la formule D = (B × C) ÷ A, le calcul détaillé étape par étape, puis une vérification qui compare les deux rapports. Trois exemples rapides sont aussi proposés sous les champs. Si A vaut 0 ou si un champ est vide, aucun résultat n'est affiché.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Mélanger l'ordre des valeurs.** Dans le tableau, chaque ligne doit contenir deux valeurs qui se correspondent. Si vous placez 6 personnes en face de 200 g, le résultat est faux.",
        "**Diviser par le mauvais nombre.** On divise par a, le nombre qui est en diagonale de x, et non par b ou par c.",
        "**Oublier les unités.** Les deux valeurs d'une même colonne doivent être dans la même unité. Sur la carte, convertissez toujours les centimètres en mètres ou en kilomètres à la fin.",
        "**Appliquer la méthode sans proportionnalité.** C'est l'erreur la plus grave : vérifiez d'abord que les deux grandeurs évoluent ensemble dans la même proportion.",
      ],
    },
  ],
  calculateur: {
    href: "/produit-en-croix",
    nom: "Produit en croix",
    titre: "Calculez votre produit en croix",
    texte:
      "Saisissez les valeurs A, B et C : le calculateur trouve D, affiche le calcul détaillé et vérifie que les deux rapports sont égaux.",
    bouton: "Ouvrir le calculateur de produit en croix",
  },
  faq: [
    {
      q: "C'est quoi le produit en croix ?",
      a: "C'est une méthode qui permet de trouver une quatrième valeur quand deux grandeurs sont proportionnelles. On l'appelle aussi règle de trois.",
    },
    {
      q: "Quelle est la formule du produit en croix ?",
      a: "Si a correspond à b, et c correspond à x, alors x = b × c ÷ a. On multiplie les deux nombres en diagonale, puis on divise par le nombre qui reste.",
    },
    {
      q: "Pourquoi le produit en croix fonctionne-t-il ?",
      a: "Dans un tableau de proportionnalité, les produits en croix sont égaux : a × x = b × c. Il suffit alors de diviser les deux côtés par a pour obtenir x.",
    },
    {
      q: "Comment calculer un pourcentage avec un produit en croix ?",
      a: "Posez la quantité totale en face de 100 %, puis la quantité étudiée en face de x. Pour 18 élèves sur 24, on calcule 18 × 100 ÷ 24 = 75 %.",
    },
    {
      q: "Dans quels cas ne faut-il pas utiliser le produit en croix ?",
      a: "Quand les grandeurs ne sont pas proportionnelles, par exemple la taille d'un enfant et son âge, un prix dégressif selon la quantité, ou le temps de cuisson d'un plat selon son poids.",
    },
  ],
  sources: [],
  datePublication: "2026-10-27",
  dateAffichee: "27 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
