import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer l'aire d'un cercle ?";
const DESCRIPTION =
  "L'aire d'un cercle se calcule avec la formule π × r². Méthode avec le rayon ou le diamètre, exemples chiffrés, demi-cercle, secteur, anneau et conversion en m².";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-l-aire-d-un-cercle" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "aire d'un cercle, aire d'un cercle avec le diamètre, formule de l'aire d'un cercle, aire d'un demi-cercle, surface d'un cercle en m2, calcul surface cercle",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
    images: [{ url: "/images/aire-cercle-pizza.webp", width: 1200, height: 630 }],
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-l-aire-d-un-cercle",
  fil: "Aire d'un cercle",
  emoji: "⭕",
  couleur: "from-blue-500 to-cyan-600",
  h1: "Comment calculer l'aire d'un cercle ?",
  chapo:
    "Table ronde, massif de fleurs, pizza ou plaque circulaire : pour connaître la surface d'un disque, il suffit d'une formule et d'une seule mesure. Voici la méthode avec le rayon ou le diamètre, des exemples chiffrés et les pièges à éviter.",
  reponse:
    "**Aire = π × r², où r est le rayon.** Si vous connaissez le diamètre d, divisez-le par 2 pour obtenir le rayon, ou utilisez directement **aire = π × d² ÷ 4**. Avec un rayon en centimètres, l'aire est en centimètres carrés (cm²).",
  sections: [
    {
      titre: "La formule de l'aire d'un cercle",
      paras: [
        "L'aire d'un cercle est la surface qu'il occupe, bordure comprise. Elle se calcule à partir du **rayon**, la distance entre le centre et le bord. Le **diamètre** est la distance d'un bord à l'autre en passant par le centre : il vaut deux fois le rayon.",
        "Le nombre π (pi) vaut environ 3,14159. La formule s'écrit donc :",
      ],
      liste: [
        "**Avec le rayon :** aire = π × r × r, soit π × r².",
        "**Avec le diamètre :** r = d ÷ 2, donc aire = π × d² ÷ 4.",
      ],
      suite: [
        "Le plus souvent, on mesure un diamètre, plus facile à relever qu'un rayon : il suffit de tendre un mètre ruban d'un bord à l'autre. Si vous avez besoin de retrouver cette mesure, voyez [comment calculer le diamètre d'un cercle](/comment-calculer-diametre-cercle).",
      ],
      visuel: {
        fichier: "aire-cercle-pizza",
        alt: "Pizza ronde sur une planche en bois avec un mètre ruban jaune tendu sur son diamètre, une roulette à pizza et un peu de farine.",
        legende:
          "Un mètre ruban tendu d'un bord à l'autre d'une pizza donne son diamètre, c'est-à-dire la mesure qui suffit pour calculer son aire.",
      },
    },
    {
      titre: "Exemple 1 : un cercle de rayon 3 cm",
      paras: ["Quelle est l'aire d'un cercle de rayon 3 cm ?"],
      etapes: [
        "On élève le rayon au carré : 3² = 3 × 3 = 9.",
        "On multiplie par π : 9 × 3,14159 = **28,27 cm²**.",
      ],
      suite: [
        "Avec π arrondi à 3,14, on trouve 9 × 3,14 = 28,26 cm². L'écart est de 0,01 cm² seulement, ce qui est négligeable ici. Il grandit avec la taille du cercle, donc gardez plus de décimales pour de grandes surfaces.",
      ],
    },
    {
      titre: "Exemple 2 : un cercle de diamètre 10 cm",
      paras: ["Cette fois, on connaît le diamètre : 10 cm."],
      etapes: [
        "On calcule le rayon : 10 ÷ 2 = 5 cm.",
        "On élève au carré : 5² = 25.",
        "On multiplie par π : 25 × 3,14159 = **78,54 cm²**.",
      ],
      suite: [
        "Avec la formule directe, on retrouve le même résultat : π × 10² ÷ 4 = π × 100 ÷ 4 = 78,54 cm². Avec π = 3,14, on obtient 78,5 cm², soit un écart de 0,04 cm².",
      ],
    },
    {
      titre: "Exemple 3 : une table ronde de 1,20 m de diamètre",
      paras: [
        "Quelle surface occupe une table ronde de 1,20 m de diamètre ? On travaille directement en mètres.",
      ],
      etapes: [
        "Le rayon vaut 1,20 ÷ 2 = 0,60 m.",
        "On élève au carré : 0,60² = 0,36.",
        "On multiplie par π : 0,36 × 3,14159 = **1,13 m²**.",
      ],
      suite: [
        "Vérification en centimètres : le rayon est de 60 cm, et 60² × π = 11 309,73 cm². Comme 1 m² = 10 000 cm², cela fait bien 1,13 m².",
      ],
    },
    {
      titre: "Exemple 4 : une pizza de 30 cm ou deux pizzas de 20 cm ?",
      paras: [
        "Une pizzeria propose une pizza de 30 cm de diamètre, ou deux pizzas de 20 cm de diamètre. Laquelle offre le plus de pâte ? On compare les aires.",
      ],
      etapes: [
        "Pizza de 30 cm : rayon 15 cm, aire = π × 15² = π × 225 = **706,86 cm²**.",
        "Pizza de 20 cm : rayon 10 cm, aire = π × 10² = **314,16 cm²**. Deux pizzas font 2 × 314,16 = **628,32 cm²**.",
        "On compare : 706,86 − 628,32 = 78,54 cm² de plus pour la grande pizza.",
      ],
      suite: [
        "La grande pizza est donc 12,5 % plus grande que les deux petites réunies. Ce résultat surprend, car 30 est inférieur à 20 + 20. Mais l'aire dépend du **carré** du rayon : quand le diamètre est multiplié par 1,5, l'aire est multipliée par 1,5 × 1,5 = 2,25.",
        "Cette comparaison ne vaut que pour la surface : elle ne dit rien de l'épaisseur de la pâte ni du prix.",
      ],
    },
    {
      titre: "Exemple 5 : un massif rond de 2 m de rayon",
      paras: [
        "Vous voulez recouvrir de gazon un massif rond de 2 m de rayon. Combien de mètres carrés faut-il ?",
      ],
      etapes: [
        "On élève le rayon au carré : 2² = 4.",
        "On multiplie par π : 4 × 3,14159 = **12,57 m²**.",
      ],
      suite: [
        "Il faut donc couvrir environ 12,57 m². Pensez à vérifier que 2 m est bien le **rayon** et non le diamètre : si 2 m était le diamètre, le rayon serait de 1 m et l'aire seulement de 3,14 m².",
      ],
    },
    {
      titre: "Résumé des exemples",
      tableau: {
        colonnes: ["Situation", "Calcul", "Aire"],
        lignes: [
          ["Rayon 3 cm", "π × 3²", "28,27 cm²"],
          ["Diamètre 10 cm", "π × 5²", "78,54 cm²"],
          ["Table de 1,20 m de diamètre", "π × 0,60²", "1,13 m²"],
          ["Pizza de 30 cm", "π × 15²", "706,86 cm²"],
          ["Deux pizzas de 20 cm", "2 × π × 10²", "628,32 cm²"],
          ["Massif de 2 m de rayon", "π × 2²", "12,57 m²"],
        ],
      },
    },
    {
      titre: "Demi-cercle, secteur, anneau et rayon à retrouver",
      paras: [
        "Quelques variantes se déduisent de la formule de base.",
      ],
      liste: [
        "**Demi-cercle :** c'est la moitié de l'aire. Pour un rayon de 3 cm : 28,27 ÷ 2 = 14,14 cm².",
        "**Secteur (une part de cercle) :** pour un angle a en degrés, aire = π × r² × a ÷ 360. Pour r = 6 cm et a = 90°, on obtient π × 36 × 90 ÷ 360 = 28,27 cm², soit un quart du cercle entier.",
        "**Anneau (couronne) :** entre un grand rayon R et un petit rayon r, aire = π × (R² − r²). Pour R = 5 cm et r = 3 cm : π × (25 − 9) = 50,27 cm².",
        "**Retrouver le rayon à partir de l'aire :** r = √(aire ÷ π). Pour une aire de 78,54 cm², on calcule 78,54 ÷ 3,14159 = 25, dont la racine carrée est 5 : le rayon est de 5 cm.",
      ],
    },
    {
      titre: "Ne pas confondre aire et périmètre",
      paras: [
        "Le **périmètre** est la longueur du tour du cercle, alors que l'aire est la surface à l'intérieur. La formule est P = 2 × π × r, ou P = π × d.",
        "Pour un rayon de 3 cm, le périmètre vaut 2 × π × 3 = 18,85 cm, et l'aire 28,27 cm². Les deux ne s'expriment pas dans la même unité : le périmètre en cm, l'aire en cm². Pour une clôture ou une bordure, c'est le périmètre qu'il vous faut ; pour du gazon ou de la peinture, c'est l'aire.",
      ],
    },
    {
      titre: "Convertir l'aire en m²",
      paras: [
        "L'aire s'exprime en unités carrées : un rayon en centimètres donne une aire en cm², un rayon en mètres une aire en m². Ne convertissez pas l'aire comme une longueur : **1 m² = 10 000 cm²**, et non 100 cm².",
      ],
      liste: [
        "Pour passer de cm² à m², divisez par 10 000. Exemple : 11 309,73 cm² ÷ 10 000 = 1,13 m².",
        "Le plus simple reste de convertir le rayon en mètres avant de calculer : 60 cm = 0,60 m.",
      ],
      encadre:
        "Les mesures de ces exemples sont choisies pour illustrer la méthode. Remplacez-les par vos propres mesures.",
    },
    {
      titre: "Comment utiliser le calculateur de surface d'un cercle",
      paras: [
        "Le calculateur propose trois modes : **Rayon**, **Diamètre** et **Périmètre**. Choisissez le mode qui correspond à la mesure que vous connaissez, puis saisissez la valeur dans le champ. Vous pouvez écrire les décimales avec une virgule ou avec un point, ou cliquer sur l'une des valeurs proposées sous le champ (1, 2, 3, 5, 7, 10, 15, 20, 50 ou 100).",
        "Le calculateur affiche la **surface du cercle**, ainsi que le rayon, le diamètre et le périmètre, avec un petit dessin et les formules rappelées sous le résultat. Si la valeur est vide, nulle ou négative, aucun résultat n'est affiché.",
        "Le calculateur ne gère pas d'unité : il donne l'aire en « unités² ». Si vous saisissez des centimètres, lisez des cm² ; si vous saisissez des mètres, lisez des m². Il ne calcule pas non plus de demi-cercle, de secteur ni d'anneau : pour ceux-là, utilisez les formules ci-dessus. Pour un solide, voyez le [calcul du volume d'un cylindre](/calcul-volume-cylindre), qui réutilise l'aire du disque de base.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Confondre rayon et diamètre.** C'est l'erreur la plus courante. Si vous utilisez le diamètre à la place du rayon, l'aire est quatre fois trop grande.",
        "**Oublier le carré.** Il faut calculer r × r, pas r × 2. Pour r = 3 cm, r² = 9 mais r × 2 = 6.",
        "**Mélanger aire et périmètre.** Le périmètre se mesure en longueur, l'aire en unités carrées.",
        "**Mal convertir les unités.** 1 m² = 10 000 cm². Convertissez le rayon avant de calculer pour éviter cette erreur.",
        "**Arrondir π trop tôt.** Utilisez 3,14159 (ou la touche π de la calculatrice) et arrondissez seulement le résultat final.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-surface-cercle",
    nom: "Surface d'un cercle",
    titre: "Calculez la surface de votre cercle",
    texte:
      "Choisissez le mode rayon, diamètre ou périmètre, saisissez votre mesure : le calculateur affiche la surface, le rayon, le diamètre et le périmètre.",
    bouton: "Ouvrir le calculateur de surface d'un cercle",
  },
  faq: [
    {
      q: "Quelle est la formule de l'aire d'un cercle ?",
      a: "Aire = π × r², où r est le rayon. Avec le diamètre d, on utilise aire = π × d² ÷ 4. π vaut environ 3,14159.",
    },
    {
      q: "Comment calculer l'aire d'un cercle avec le diamètre ?",
      a: "On divise le diamètre par 2 pour obtenir le rayon, puis on calcule π × r². Pour un diamètre de 10 cm, le rayon est de 5 cm et l'aire vaut 78,54 cm².",
    },
    {
      q: "Comment calculer l'aire d'un demi-cercle ?",
      a: "On calcule l'aire du cercle entier, puis on la divise par 2. Pour un rayon de 3 cm : 28,27 ÷ 2 = 14,14 cm².",
    },
    {
      q: "Comment obtenir la surface d'un cercle en m² ?",
      a: "Mesurez le rayon en mètres et calculez π × r² : le résultat est directement en m². Si vous avez une aire en cm², divisez-la par 10 000 pour obtenir des m².",
    },
    {
      q: "Quelle différence entre l'aire et le périmètre d'un cercle ?",
      a: "Le périmètre est la longueur du tour du cercle (2 × π × r), l'aire est la surface à l'intérieur (π × r²). Le périmètre s'exprime en cm ou en m, l'aire en cm² ou en m².",
    },
  ],
  sources: [],
  datePublication: "2026-11-04",
  dateAffichee: "4 novembre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
