import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Combien fait 1 pouce en cm ?";
const DESCRIPTION =
  "Un pouce mesure exactement 2,54 cm. Convertissez les pouces en centimètres et les centimètres en pouces, avec des exemples, un tableau et le cas de la diagonale d'un écran.";

export const metadata: Metadata = {
  alternates: { canonical: "/combien-fait-un-pouce-en-cm" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "pouce en cm, convertir pouces en centimètres, cm en pouces, combien fait un pouce, taille écran pouces, inch cm",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/combien-fait-un-pouce-en-cm",
  fil: "Pouces en centimètres",
  emoji: "📏",
  couleur: "from-orange-500 to-amber-600",
  h1: "Combien fait 1 pouce en cm ?",
  chapo:
    "Le pouce sert notamment à exprimer la taille des écrans, les mesures des jeans, le diamètre des jantes et celui des roues. Voici la conversion exacte entre pouces et centimètres, dans les deux sens, avec des exemples simples.",
  reponse:
    "**1 pouce = 2,54 cm exactement.** Pour convertir des pouces en centimètres, multipliez par 2,54. Pour convertir des centimètres en pouces, divisez par 2,54. Le mot anglais est inch et le symbole peut être in ou ″.",
  sections: [
    {
      titre: "La conversion exacte entre pouces et centimètres",
      paras: [
        "La définition internationale fixée en 1959 établit qu'un pouce vaut **2,54 cm exactement**. Cette égalité ne s'arrondit pas.",
        "Les deux formules sont donc : **centimètres = pouces × 2,54** et **pouces = centimètres ÷ 2,54**. Le résultat obtenu peut ensuite être arrondi, par exemple à deux décimales.",
      ],
      tableau: {
        colonnes: ["Mesure", "Équivalent en centimètres"],
        lignes: [
          ["1 pouce", "2,54 cm"],
          ["2 pouces", "5,08 cm"],
          ["5 pouces", "12,70 cm"],
          ["10 pouces", "25,40 cm"],
          ["12 pouces", "30,48 cm"],
          ["15 pouces", "38,10 cm"],
          ["24 pouces", "60,96 cm"],
          ["32 pouces", "81,28 cm"],
          ["40 pouces", "101,60 cm"],
        ],
      },
    },
    {
      titre: "Convertir des pouces en cm : exemple pas à pas",
      paras: [
        "Pour passer une longueur de pouces en centimètres, il suffit de la multiplier par 2,54. Prenons une mesure de 10 pouces.",
      ],
      etapes: [
        "On part de 10 pouces.",
        "On applique la formule : 10 × 2,54.",
        "Le résultat est **25,40 cm**.",
      ],
      suite: [
        "Ainsi, une longueur de 10 pouces mesure 25,40 cm.",
      ],
    },
    {
      titre: "Convertir des cm en pouces : exemple pas à pas",
      paras: [
        "Dans l'autre sens, on divise les centimètres par 2,54. Prenons une longueur de 30 cm.",
      ],
      etapes: [
        "On part de 30 cm.",
        "On applique la formule : 30 ÷ 2,54.",
        "Le résultat exact est environ 11,811023622 pouces.",
        "Arrondi à deux décimales, cela donne **11,81 pouces**.",
      ],
      suite: [
        "L'arrondi intervient seulement à la fin. Si vous multipliez la valeur arrondie 11,81 par 2,54, vous obtenez 29,9974 cm, et non exactement 30 cm. Pour retrouver 30 cm, repartez de la valeur exacte 30 ÷ 2,54.",
      ],
    },
    {
      titre: "Pouces, pieds et yards",
      paras: [
        "Le pouce peut aussi être relié à deux autres unités de longueur. **1 pied = 12 pouces = 30,48 cm** et **1 yard = 3 pieds = 91,44 cm**.",
      ],
      tableau: {
        colonnes: ["Unité", "Conversion"],
        lignes: [
          ["1 pouce", "2,54 cm"],
          ["1 pied", "12 pouces = 30,48 cm"],
          ["1 yard", "3 pieds = 36 pouces = 91,44 cm"],
        ],
        texte: true,
      },
    },
    {
      titre: "Que signifie la taille d'un écran en pouces ?",
      paras: [
        "Pour un téléviseur, un téléphone ou un ordinateur, la taille annoncée en pouces correspond à la **longueur de la diagonale de l'écran**. Elle va d'un coin de l'écran au coin opposé, et non le long de sa largeur ou de sa hauteur.",
      ],
    },
    {
      titre: "Les autres mesures souvent exprimées en pouces",
      liste: [
        "Sur un jean, **W (waist)** indique le tour de taille en pouces.",
        "Sur un jean, **L (length)** indique la longueur de jambe en pouces.",
        "Le diamètre des jantes de voiture et celui des roues de vélo s'expriment souvent en pouces.",
      ],
      encadre:
        "Pour convertir une mesure de pouces, de pieds, de mètres, de centimètres ou de millimètres, utilisez la [conversion de longueur](/conversion-longueur).",
    },
    {
      titre: "Comment utiliser le convertisseur de longueur",
      paras: [
        "Saisissez votre valeur dans le champ « Valeur ». Dans « De », choisissez l'unité de départ parmi centimètres, pouces, pieds, mètres et millimètres. Dans « Vers », choisissez l'unité souhaitée.",
        "Le résultat principal affiche la conversion demandée. Le calculateur affiche aussi les autres équivalences disponibles et, pour toute valeur valide, une ligne « Soit … (pieds/pouces) » qui donne la même longueur en pieds et pouces, les pouces étant arrondis à l'unité.",
        "Par exemple, saisissez 10, choisissez « Pouces (inches) » dans « De » et « Centimètres (cm) » dans « Vers » : le résultat principal est 25,4 cm.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Multiplier au lieu de diviser dans le mauvais sens.** Des pouces vers les centimètres, on multiplie par 2,54. Des centimètres vers les pouces, on divise par 2,54.",
        "**Confondre la diagonale et la largeur d'un écran.** La taille en pouces désigne la diagonale.",
        "**Arrondir avant la fin du calcul.** Gardez les décimales pendant la conversion, puis arrondissez le résultat final au nombre de décimales souhaité.",
      ],
    },
  ],
  calculateur: {
    href: "/conversion-longueur",
    nom: "Conversion de longueur",
    titre: "Convertissez pouces et centimètres",
    texte:
      "Saisissez une valeur, choisissez l'unité de départ et l'unité d'arrivée : le convertisseur affiche le résultat et les autres équivalences.",
    bouton: "Ouvrir le convertisseur de longueur",
  },
  faq: [
    {
      q: "Combien fait exactement 1 pouce en cm ?",
      a: "1 pouce fait exactement 2,54 cm. Cette égalité est la définition internationale du pouce.",
    },
    {
      q: "Comment convertir des pouces en centimètres ?",
      a: "Multipliez le nombre de pouces par 2,54. Par exemple, 10 pouces correspondent à 10 × 2,54 = 25,40 cm.",
    },
    {
      q: "Comment convertir des centimètres en pouces ?",
      a: "Divisez le nombre de centimètres par 2,54. Par exemple, 30 cm correspondent à environ 11,81 pouces après un arrondi à deux décimales.",
    },
    {
      q: "Que mesure la taille d'un écran en pouces ?",
      a: "Elle mesure la longueur de la diagonale de l'écran, d'un coin au coin opposé.",
    },
    {
      q: "Combien de pouces contient un pied ?",
      a: "Un pied contient 12 pouces et mesure 30,48 cm. Un yard contient 3 pieds, soit 36 pouces ou 91,44 cm.",
    },
  ],
  sources: [],
  datePublication: "2026-10-24",
  dateAffichee: "24 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
