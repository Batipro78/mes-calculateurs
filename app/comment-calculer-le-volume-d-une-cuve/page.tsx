import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer le volume d'une cuve ronde en litres ?";
const DESCRIPTION =
  "Volume d'une cuve ronde = π × rayon² × hauteur, puis ÷ 1 000 pour passer des cm³ aux litres. Exemple, cuve couchée pleine ou à moitié remplie, tableau et erreurs à éviter.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-le-volume-d-une-cuve" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "calcul volume cuve litres, volume cuve ronde, volume cuve cylindrique, volume cuve couchée, cuve couchée partiellement remplie, calcul volume réservoir, cuve eau litres",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
    images: [{ url: "/calcul-surface-cercle/opengraph-image.png", width: 1200, height: 630 }],
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-le-volume-d-une-cuve",
  fil: "Calculer le volume d'une cuve",
  emoji: "🛢️",
  couleur: "from-teal-500 to-emerald-600",
  h1: "Comment calculer le volume d'une cuve ronde en litres ?",
  chapo:
    "Une cuve à eau, une cuve à fioul, un récupérateur d'eau de pluie, un bidon ou un tonneau ont la forme d'un cylindre. Pour connaître leur capacité, deux mesures suffisent : le diamètre et la hauteur. Cet article donne la formule, un exemple, le cas de la cuve couchée à moitié pleine et les pièges de mesure.",
  reponse:
    "Le volume d'une cuve ronde vaut **π × rayon² × hauteur**, le rayon étant la moitié du diamètre. Avec des mesures en centimètres, le résultat est en cm³ : divisez-le par 1 000 pour obtenir des litres. Par exemple, une cuve de 100 cm de diamètre et 120 cm de hauteur contient environ **942,48 litres**.",
  sections: [
    {
      titre: "La formule du volume d'une cuve ronde",
      paras: [
        "Une cuve ronde est un cylindre. Son volume dépend de deux mesures : le rayon du cercle de base, qui va du centre jusqu'au bord, et la hauteur du cylindre.",
        "La formule est : **V = π × r² × h**. V est le volume, r le rayon et h la hauteur. Le nombre π vaut environ 3,14159. Gardez la même unité pour les deux mesures : des centimètres donnent des cm³, des mètres donnent des m³.",
        "Pour passer aux litres : **1 000 cm³ = 1 litre**, et **1 m³ = 1 000 litres**.",
      ],
    },
    {
      titre: "Exemple pas à pas : une cuve de 100 cm par 120 cm",
      paras: [
        "Prenons une cuve debout de 100 cm de diamètre et de 120 cm de hauteur.",
      ],
      etapes: [
        "Le rayon est la moitié du diamètre : 100 ÷ 2 = 50 cm.",
        "Le rayon au carré : 50 × 50 = 2 500 cm².",
        "On multiplie par π puis par la hauteur : 3,14159 × 2 500 × 120 ≈ 942 477,80 cm³.",
        "On convertit en litres : 942 477,80 ÷ 1 000 = **942,48 litres**.",
      ],
      suite: [
        "Pour refaire le calcul avec vos mesures, le [calculateur de volume d'un cylindre](/calcul-volume-cylindre) fait les étapes à votre place.",
      ],
    },
    {
      titre: "Comment utiliser le calculateur pour obtenir des litres",
      paras: [
        "Le calculateur demande le **rayon** et la **hauteur**, pas le diamètre. Saisissez les deux en **centimètres** : le grand chiffre affiché est alors le volume en cm³, et la ligne « Soit … litres (si en cm) » juste en dessous donne directement les litres.",
        "Avec l'exemple ci-dessus, saisissez 50 pour le rayon et 120 pour la hauteur : le calculateur affiche 942 477,80 et, en dessous, 942,48 litres.",
        "Si vous saisissez le diamètre à la place du rayon, le volume affiché sera quatre fois trop grand.",
      ],
    },
    {
      titre: "Mesurer la cuve : diamètre intérieur, pas extérieur",
      paras: [
        "On mesure souvent une cuve par l'extérieur, avec un mètre ruban. Mais ce qui compte pour le volume, c'est l'intérieur : la paroi prend de la place. Retirez deux fois l'épaisseur de la paroi au diamètre extérieur, une fois de chaque côté.",
        "Exemple : une cuve de 100 cm de diamètre extérieur, avec une paroi de 1 cm, a un diamètre intérieur de 98 cm. Pour 120 cm de hauteur, elle contient environ **905,16 litres**, et non 942,48 : 37 litres d'écart, soit 4 %.",
        "Si vous ne pouvez mesurer que le tour de la cuve, divisez-le par π pour obtenir le diamètre. Le guide pour [calculer le diamètre d'un cercle](/comment-calculer-diametre-cercle) détaille cette méthode.",
      ],
    },
    {
      titre: "Le cas d'une cuve couchée, pleine",
      paras: [
        "Une cuve couchée et pleine se calcule avec la même formule. Le rayon est celui de la face ronde, et la « hauteur » de la formule devient la longueur de la cuve.",
        "Exemple : une cuve couchée de 80 cm de diamètre et de 150 cm de longueur a un rayon de 40 cm. Pleine, elle contient π × 40² × 150 ≈ 753 982,24 cm³, soit **753,98 litres**.",
      ],
    },
    {
      titre: "Le cas d'une cuve couchée remplie en partie",
      paras: [
        "Dans une cuve couchée, le niveau du liquide ne dit pas directement la quantité : à mi-hauteur, la cuve est bien à moitié pleine, mais à un quart de la hauteur, elle contient beaucoup moins d'un quart. Il faut calculer la surface de liquide sur la face ronde, puis la multiplier par la longueur.",
        "Avec r le rayon, h la hauteur de liquide mesurée depuis le fond et L la longueur, la surface mouillée vaut **r² × arccos((r − h) ÷ r) − (r − h) × √(2 × r × h − h²)**, et le volume vaut cette surface × L. La fonction arccos se calcule sur une calculatrice scientifique avec la touche cos⁻¹, réglée en radians (RAD).",
      ],
      etapes: [
        "Prenons une cuve couchée de 100 cm de diamètre (r = 50 cm) et de 200 cm de longueur, avec 30 cm de liquide.",
        "(r − h) ÷ r = (50 − 30) ÷ 50 = 0,4, et arccos(0,4) ≈ 1,1593 radian.",
        "Premier terme : 50² × 1,1593 ≈ 2 898,20 cm².",
        "Second terme : √(2 × 50 × 30 − 30²) = √2 100 ≈ 45,83, puis 20 × 45,83 ≈ 916,52 cm².",
        "Surface mouillée : 2 898,20 − 916,52 ≈ 1 981,68 cm².",
        "Volume : 1 981,68 × 200 ≈ 396 336 cm³, soit environ **396,34 litres**, alors que la cuve pleine en contient 1 570,80.",
      ],
      tableau: {
        colonnes: ["Hauteur de liquide (cm)", "Volume (litres)", "Part de la cuve pleine"],
        lignes: [
          ["10", "81,75", "5,2 %"],
          ["20", "223,65", "14,2 %"],
          ["25", "307,09", "19,6 %"],
          ["30", "396,34", "25,2 %"],
          ["40", "586,74", "37,4 %"],
          ["50", "785,40", "50,0 %"],
          ["60", "984,06", "62,6 %"],
          ["75", "1 263,70", "80,4 %"],
          ["90", "1 489,05", "94,8 %"],
          ["100", "1 570,80", "100,0 %"],
        ],
      },
      suite: [
        "Ce tableau vaut pour la cuve de l'exemple (100 cm de diamètre, 200 cm de longueur). Pour une autre cuve, refaites le calcul avec son rayon et sa longueur.",
      ],
    },
    {
      titre: "Tableau de volumes de cuves debout courantes",
      paras: [
        "Volumes calculés avec la valeur exacte de π, arrondis à deux décimales. Diamètre et hauteur en centimètres, résultat en litres.",
      ],
      tableau: {
        colonnes: ["Diamètre × hauteur (cm)", "Rayon (cm)", "Volume (litres)"],
        lignes: [
          ["50 × 100", "25", "196,35"],
          ["60 × 120", "30", "339,29"],
          ["80 × 150", "40", "753,98"],
          ["100 × 200", "50", "1 570,80"],
          ["120 × 200", "60", "2 261,95"],
          ["150 × 250", "75", "4 417,86"],
          ["200 × 300", "100", "9 424,78"],
          ["250 × 400", "125", "19 634,95"],
        ],
      },
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Utiliser le diamètre à la place du rayon.** La formule prend r. Avec 100 cm au lieu de 50 cm, le résultat est quatre fois trop grand.",
        "**Mesurer par l'extérieur.** La paroi fait perdre quelques pour cent de volume. Retirez deux fois son épaisseur au diamètre extérieur.",
        "**Mélanger les unités.** Un rayon en centimètres et une hauteur en mètres ne vont pas ensemble. Convertissez d'abord avec la [conversion de longueur](/conversion-longueur).",
        "**Arrondir trop tôt.** Gardez les décimales jusqu'au résultat en cm³, et n'arrondissez qu'après la division par 1 000.",
        "**Lire le niveau d'une cuve couchée comme une règle.** Un quart de la hauteur ne veut pas dire un quart du volume : dans l'exemple ci-dessus, 25 cm de liquide sur 100 cm ne font que 19,6 % de la cuve.",
      ],
      encadre:
        "Pour la surface de la face ronde seule, utilisez le [calculateur de surface d'un cercle](/calcul-surface-cercle).",
    },
  ],
  calculateur: {
    href: "/calcul-volume-cylindre",
    nom: "Calcul volume cylindre",
    titre: "Calculez le volume de votre cuve",
    texte:
      "Saisissez le rayon et la hauteur en centimètres : le calculateur donne le volume en cm³ et son équivalent en litres.",
    bouton: "Ouvrir le calculateur de volume",
  },
  faq: [
    {
      q: "Comment calculer le nombre de litres d'une cuve ronde ?",
      a: "Mesurez le diamètre et la hauteur en centimètres. Divisez le diamètre par 2 pour avoir le rayon, calculez π × rayon × rayon × hauteur, puis divisez par 1 000 pour obtenir des litres.",
    },
    {
      q: "Quelle formule utiliser pour une cuve cylindrique ?",
      a: "V = π × r² × h, où r est le rayon de la base et h la hauteur, ou la longueur si la cuve est couchée. Une cuve de 60 cm de diamètre et 120 cm de hauteur contient environ 339,29 litres.",
    },
    {
      q: "Comment calculer le volume d'une cuve couchée à moitié pleine ?",
      a: "Si le liquide arrive exactement à mi-hauteur, la cuve contient la moitié de son volume plein. Pour un autre niveau, la règle de trois ne marche pas : il faut la formule de la surface mouillée, puis multiplier par la longueur.",
    },
    {
      q: "Faut-il entrer le rayon ou le diamètre dans le calculateur ?",
      a: "Le rayon. Si vous connaissez le diamètre, divisez-le par 2 avant de le saisir. Un diamètre de 120 cm correspond à un rayon de 60 cm.",
    },
    {
      q: "Combien de litres fait 1 m³ ?",
      a: "1 m³ fait 1 000 litres, et 1 litre fait 1 000 cm³, soit 1 dm³. Une cuve de 1 m de diamètre et 2 m de hauteur fait environ 1,57 m³, donc 1 570,80 litres.",
    },
  ],
  sources: [],
  datePublication: "2026-10-21",
  dateAffichee: "21 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
