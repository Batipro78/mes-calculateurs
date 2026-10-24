import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Combien fait 1 livre en kg ?";
const DESCRIPTION =
  "Une livre anglo-saxonne vaut exactement 0,45359237 kg. Retrouvez la conversion inverse, des exemples chiffrés et la différence avec la livre utilisée couramment en France.";

export const metadata: Metadata = {
  alternates: { canonical: "/combien-fait-une-livre-en-kg" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "livre en kg, lb en kg, kg en livres, conversion livres kilogrammes, livre française 500 g",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/combien-fait-une-livre-en-kg",
  fil: "Livre en kg",
  emoji: "⚖️",
  couleur: "from-emerald-500 to-teal-600",
  h1: "Combien fait 1 livre en kg ?",
  chapo:
    "Une livre peut désigner l'unité anglo-saxonne lb ou, dans le langage courant en France, une quantité de 500 g. Voici la conversion exacte de la livre anglo-saxonne en kilogrammes, le calcul inverse et des exemples simples.",
  reponse:
    "Une livre anglo-saxonne, notée **lb**, vaut exactement **0,45359237 kg**. Dans l'autre sens, **1 kg vaut environ 2,20462 lb**, arrondi à cinq décimales. En France, « une livre » dans une recette ou au marché désigne couramment **500 g**, soit 0,5 kg : ce n'est pas la même quantité.",
  sections: [
    {
      titre: "La conversion d'une livre anglo-saxonne en kilogrammes",
      paras: [
        "Depuis la définition internationale de 1959, une livre anglo-saxonne (lb) correspond exactement à **0,45359237 kg**, soit 453,59237 g. Pour convertir des livres en kilogrammes, multipliez le nombre de livres par 0,45359237.",
        "La formule est : **kilogrammes = livres × 0,45359237**. Le facteur de conversion est exact ; si le résultat comporte trop de chiffres, arrondissez uniquement à la fin. Les résultats ci-dessous sont arrondis à cinq décimales.",
      ],
    },
    {
      titre: "Exemple pas à pas : convertir 10 lb en kg",
      paras: ["Pour convertir 10 livres anglo-saxonnes en kilogrammes :"],
      etapes: [
        "Multipliez le poids par le facteur exact : 10 × 0,45359237.",
        "Le résultat avant arrondi est 4,5359237 kg.",
        "Arrondi à cinq décimales, **10 lb = 4,53592 kg**.",
      ],
      suite: [
        "Pour refaire ce calcul avec un autre poids, utilisez le [convertisseur de poids](/conversion-poids) et choisissez les livres comme unité de départ et les kilogrammes comme unité d'arrivée.",
      ],
    },
    {
      titre: "Convertir des kilogrammes en livres",
      paras: [
        "Pour passer des kilogrammes aux livres, faites l'opération inverse : **livres = kilogrammes ÷ 0,45359237**. Le résultat peut avoir de nombreuses décimales ; les valeurs du tableau sont arrondies à cinq décimales.",
      ],
      tableau: {
        colonnes: ["Poids de départ", "Calcul", "Résultat arrondi"],
        lignes: [
          ["1 lb", "1 × 0,45359237", "0,45359 kg"],
          ["2 lb", "2 × 0,45359237", "0,90718 kg"],
          ["5 lb", "5 × 0,45359237", "2,26796 kg"],
          ["10 lb", "10 × 0,45359237", "4,53592 kg"],
          ["1 kg", "1 ÷ 0,45359237", "2,20462 lb"],
          ["5 kg", "5 ÷ 0,45359237", "11,02311 lb"],
          ["10 kg", "10 ÷ 0,45359237", "22,04623 lb"],
        ],
      },
    },
    {
      titre: "Livre, once et stone : les équivalences",
      paras: [
        "La livre anglo-saxonne se divise en **16 onces (oz)**. Une once vaut exactement **28,349523125 g**. Une autre unité, le stone, vaut **14 lb**.",
      ],
      tableau: {
        colonnes: ["Unité", "Équivalence"],
        lignes: [
          ["1 lb", "16 oz"],
          ["1 oz", "28,349523125 g"],
          ["1 stone", "14 lb"],
        ],
      },
      suite: [
        "Ces équivalences concernent les unités anglo-saxonnes. Elles ne changent pas le sens courant du mot « livre » en France.",
      ],
    },
    {
      titre: "Attention à la livre utilisée en France",
      paras: [
        "Dans une conversation au marché ou dans une recette, « une livre » désigne couramment **500 g**, c'est-à-dire **0,5 kg**. La livre anglo-saxonne vaut 453,59237 g. La différence entre les deux est de **46,40763 g**.",
        "Vérifiez donc le contexte avant de convertir : si le poids est indiqué en lb, appliquez le facteur 0,45359237 ; si « une livre » désigne la quantité courante en France, comptez 500 g.",
      ],
    },
    {
      titre: "Comment utiliser le convertisseur de poids",
      paras: [
        "Saisissez un nombre dans le champ « Valeur », puis choisissez l'unité dans les menus « De » et « Vers ». Pour convertir des livres en kilogrammes, sélectionnez « Livres (lbs) » puis « Kilogrammes (kg) » ; pour faire l'inverse, sélectionnez d'abord les kilogrammes, puis les livres.",
        "Le résultat principal apparaît avec les unités choisies. Les autres conversions disponibles s'affichent aussi en dessous. Vous pouvez saisir une virgule décimale ou choisir l'un des boutons de poids courant.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Confondre lb et la livre courante en France.** Une lb vaut 0,45359237 kg ; la livre utilisée couramment en France désigne 0,5 kg.",
        "**Inverser la multiplication et la division.** Pour passer des lb aux kg, multipliez par 0,45359237 ; pour passer des kg aux lb, divisez par ce même nombre.",
        "**Arrondir trop tôt.** Gardez le facteur exact et arrondissez seulement le résultat final, ici à cinq décimales.",
        "**Confondre once et livre.** Une livre anglo-saxonne contient 16 onces, et non une seule.",
      ],
      encadre:
        "Pour une livre anglo-saxonne : **1 lb = 0,45359237 kg exactement**. Pour une livre au sens courant en France : **1 livre = 0,5 kg**.",
    },
  ],
  calculateur: {
    href: "/conversion-poids",
    nom: "Conversion de poids",
    titre: "Convertissez livres et kilogrammes",
    texte:
      "Saisissez le poids, choisissez l'unité de départ et l'unité d'arrivée. Le résultat et d'autres équivalences s'affichent automatiquement.",
    bouton: "Ouvrir le convertisseur de poids",
  },
  faq: [
    {
      q: "Combien fait 1 livre en kg ?",
      a: "Une livre anglo-saxonne (1 lb) vaut exactement 0,45359237 kg. Arrondie à cinq décimales, elle vaut 0,45359 kg.",
    },
    {
      q: "Combien font 5 kg en livres ?",
      a: "5 ÷ 0,45359237 = environ 11,02311 lb, arrondi à cinq décimales.",
    },
    {
      q: "Une livre fait-elle 500 g ou 453,59237 g ?",
      a: "La livre anglo-saxonne (lb) vaut 453,59237 g. Dans le langage courant en France, « une livre » désigne 500 g.",
    },
    {
      q: "Combien d'onces y a-t-il dans une livre ?",
      a: "Une livre anglo-saxonne contient 16 onces. Une once vaut exactement 28,349523125 g.",
    },
    {
      q: "Combien de livres y a-t-il dans un stone ?",
      a: "Un stone vaut 14 livres anglo-saxonnes (lb).",
    },
  ],
  sources: [],
  datePublication: "2026-10-24",
  dateAffichee: "24 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
