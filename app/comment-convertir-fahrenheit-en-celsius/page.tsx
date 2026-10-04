import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Convertir Fahrenheit en Celsius (et l'inverse) : formules";
const DESCRIPTION =
  "°C en °F : × 1,8 + 32. °F en °C : (°F − 32) × 5/9. Méthode pas à pas, tableau (180 °C = 356 °F), calcul mental avec son écart et erreurs à éviter.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-convertir-fahrenheit-en-celsius" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "comment convertir fahrenheit en celsius, calculer celsius en fahrenheit, fahrenheit en celsius calcul, comment passer de celsius à fahrenheit, 180 celsius en fahrenheit, formule celsius fahrenheit, convertir les degrés en fahrenheit",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-convertir-fahrenheit-en-celsius",
  fil: "Convertir Fahrenheit en Celsius",
  emoji: "🌡️",
  couleur: "from-blue-500 to-indigo-600",
  h1: "Comment convertir des Fahrenheit en Celsius (et des Celsius en Fahrenheit) ?",
  chapo:
    "Une recette américaine, une météo à New York, un thermomètre étranger : les degrés Fahrenheit sont partout hors de France. Cet article donne les deux formules, la méthode pas à pas, un tableau et un calcul mental.",
  reponse:
    "Pour passer des Celsius aux Fahrenheit : **°F = °C × 1,8 + 32**. Pour passer des Fahrenheit aux Celsius : **°C = (°F − 32) × 5/9**. Par exemple, 180 °C = 180 × 1,8 + 32 = **356 °F**, et 350 °F = (350 − 32) × 5/9 ≈ **176,67 °C**.",
  sections: [
    {
      titre: "Les deux formules",
      paras: [
        "Le Celsius (°C) est utilisé en France. Le Fahrenheit (°F) est utilisé aux États-Unis. Les deux échelles ne démarrent pas au même point et leurs degrés n'ont pas la même taille : un écart de 1 °C vaut 1,8 °F. C'est pour cela qu'il faut à la fois multiplier et ajouter ou retrancher 32.",
      ],
      liste: [
        "**Celsius en Fahrenheit** : °F = °C × 9/5 + 32. Comme 9/5 = 1,8, on écrit aussi °F = °C × 1,8 + 32.",
        "**Fahrenheit en Celsius** : °C = (°F − 32) × 5/9. On peut aussi diviser par 1,8 : °C = (°F − 32) ÷ 1,8.",
      ],
      visuel: {
        fichier: "formule-conversion-celsius-fahrenheit",
        alt: "Formules de conversion des températures : °F = °C × 1,8 + 32 et °C = (°F − 32) ÷ 1,8, avec une échelle de repères de -40 °C (-40 °F) à 180 °C (356 °F)",
        legende:
          "Les deux formules, et quelques repères : à la même position, la température en Celsius (en haut) et en Fahrenheit (en bas).",
      },
    },
    {
      titre: "Des Celsius en Fahrenheit, pas à pas",
      paras: ["Exemple : convertir 180 °C en Fahrenheit."],
      etapes: [
        "Multipliez la température en Celsius par 1,8 : 180 × 1,8 = 324.",
        "Ajoutez 32 : 324 + 32 = 356.",
      ],
      suite: [
        "180 °C égalent donc **356 °F**. C'est le calcul que l'on fait pour une recette américaine qui donne la température du four en Fahrenheit, ou l'inverse. Autre exemple : 37 °C × 1,8 = 66,6, puis 66,6 + 32 = 98,6 °F.",
      ],
    },
    {
      titre: "Des Fahrenheit en Celsius, pas à pas",
      paras: ["Exemple : convertir 350 °F en Celsius."],
      etapes: [
        "Retranchez 32 à la température en Fahrenheit : 350 − 32 = 318.",
        "Multipliez par 5 : 318 × 5 = 1 590.",
        "Divisez par 9 : 1 590 ÷ 9 ≈ 176,67.",
      ],
      suite: [
        "350 °F égalent donc environ **176,67 °C**. Le résultat tombe rarement juste : on l'arrondit, ici à deux décimales, comme le fait le [convertisseur de température](/conversion-temperature).",
      ],
    },
    {
      titre: "Tableau de correspondance",
      paras: [
        "Voici des valeurs courantes de Celsius vers Fahrenheit, calculées avec la formule et arrondies à deux décimales au plus (ici, aucune n'a besoin d'être arrondie).",
      ],
      tableau: {
        colonnes: ["Celsius (°C)", "Fahrenheit (°F)"],
        lignes: [
          ["-40", "-40"],
          ["0", "32"],
          ["20", "68"],
          ["37", "98,6"],
          ["100", "212"],
          ["150", "302"],
          ["160", "320"],
          ["180", "356"],
          ["200", "392"],
          ["220", "428"],
          ["250", "482"],
        ],
      },
      encadre:
        "À -40, les deux échelles donnent le même nombre : -40 °C = -40 °F. On le vérifie avec la formule : -40 × 1,8 + 32 = -72 + 32 = -40.",
    },
    {
      titre: "De Fahrenheit vers Celsius : les valeurs courantes",
      paras: ["Même chose dans l'autre sens, arrondi à deux décimales."],
      tableau: {
        colonnes: ["Fahrenheit (°F)", "Celsius (°C)"],
        lignes: [
          ["-40", "-40"],
          ["32", "0"],
          ["68", "20"],
          ["98,6", "37"],
          ["212", "100"],
          ["300", "148,89"],
          ["350", "176,67"],
          ["400", "204,44"],
          ["450", "232,22"],
        ],
      },
      suite: [
        "Pour d'autres valeurs, le convertisseur propose des pages toutes prêtes, par exemple [200 °C en Fahrenheit](/conversion-temperature/200-celsius-en-fahrenheit), [20 °C en Fahrenheit](/conversion-temperature/20-celsius-en-fahrenheit) ou [350 °F en Celsius](/conversion-temperature/350-fahrenheit-en-celsius).",
      ],
    },
    {
      titre: "Le calcul mental, et l'écart qu'il produit",
      paras: [
        "Sans calculatrice, une règle courante est : **doublez les Celsius et ajoutez 30**. Elle donne une estimation, pas le bon résultat. L'écart avec la vraie valeur est de 0,2 × °C − 2 degrés Fahrenheit : la règle est juste à 10 °C, trop basse de 2 °F à 0 °C, trop haute de 2 °F à 20 °C et de 6 °F à 40 °C.",
        "Plus la température monte, plus l'écart grandit. Pour 180 °C, la règle donne 2 × 180 + 30 = 390 °F au lieu de 356 °F : 34 °F de trop. Elle ne convient donc pas pour un four.",
        "Une version exacte reste facile à faire de tête : **doublez les Celsius, retirez 10 % de ce double, puis ajoutez 32**. Pour 180 °C : 360 − 36 + 32 = 356 °F. C'est exactement 1,8 × °C + 32, car doubler puis retirer 10 % revient à multiplier par 1,8.",
        "Dans l'autre sens, on peut retrancher 32 puis multiplier par 0,55 au lieu de 5/9 (0,5556). L'écart reste faible : pour 350 °F, on trouve 174,90 °C au lieu de 176,67 °C, soit 1,77 °C de moins. Pour 68 °F, l'écart est de 0,20 °C.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Mauvais ordre des opérations.** Dans °C en °F, on multiplie d'abord, on ajoute 32 ensuite. Si l'on ajoute 32 avant de multiplier, on trouve (180 + 32) × 1,8 = 381,6 °F au lieu de 356 °F. Dans °F en °C, c'est l'inverse : on retranche 32 d'abord, puis on multiplie.",
        "**Oublier les parenthèses.** Écrire °F − 32 × 5/9 revient à ne multiplier que le 32. Pour 350 °F, on obtiendrait 332,22 au lieu de 176,67 °C.",
        "**Se tromper de formule.** Multiplier par 1,8 pour passer de Fahrenheit à Celsius donne un résultat bien trop grand. Pour descendre vers les Celsius, on divise par 1,8 (ou on multiplie par 5/9).",
        "**Confondre une température et un écart.** Le facteur 1,8 s'applique à un écart, mais le +32 ne s'ajoute que pour une température. Un écart de 10 °C vaut 18 °F, pas 50 °F.",
      ],
    },
    {
      titre: "Utiliser le convertisseur",
      paras: [
        "Dans le [convertisseur de température](/conversion-temperature), tapez la valeur, puis choisissez l'unité de départ dans « De » et celle d'arrivée dans « Vers ». Les valeurs courantes proposées (0, 20, 37, 100 et -40) se choisissent en un clic. Le résultat s'affiche avec deux décimales, par exemple 356,00 °F pour 180 °C. Les deux autres échelles sont affichées en dessous, Kelvin compris.",
      ],
    },
  ],
  calculateur: {
    href: "/conversion-temperature",
    nom: "Conversion Temperature",
    titre: "Convertissez Celsius, Fahrenheit et Kelvin instantanément",
    texte:
      "Saisissez une température, choisissez l'unité de départ et d'arrivée : le résultat s'affiche tout de suite avec deux décimales.",
    bouton: "Ouvrir le convertisseur de température",
  },
  faq: [
    {
      q: "Comment convertir des Celsius en Fahrenheit ?",
      a: "Multipliez les Celsius par 1,8 puis ajoutez 32. Exemple : 20 °C × 1,8 = 36, puis 36 + 32 = 68 °F.",
    },
    {
      q: "Comment convertir des Fahrenheit en Celsius ?",
      a: "Retranchez 32 aux Fahrenheit, puis multipliez par 5 et divisez par 9. Exemple : (68 − 32) × 5 ÷ 9 = 20 °C.",
    },
    {
      q: "180 Celsius égale combien en Fahrenheit ?",
      a: "180 °C égalent 356 °F : 180 × 1,8 = 324, puis 324 + 32 = 356.",
    },
    {
      q: "Quelle température est identique en Celsius et en Fahrenheit ?",
      a: "-40. À cette température, -40 °C et -40 °F désignent la même chaleur. C'est le seul point où les deux échelles affichent le même nombre.",
    },
    {
      q: "La règle « doubler et ajouter 30 » est-elle fiable ?",
      a: "Seulement pour des températures entre 0 et 25 °C, où l'écart reste de 3 °F au plus. À 180 °C, elle donne 390 °F au lieu de 356 °F. Pour être exact, doublez, retirez 10 % du double et ajoutez 32.",
    },
  ],
  sources: [],
  datePublication: "2026-10-03",
  dateAffichee: "3 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
