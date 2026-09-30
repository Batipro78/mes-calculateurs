import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer le diamètre d'un cercle ? Formules";
const DESCRIPTION =
  "Diamètre = 2 × rayon, = périmètre ÷ π, ou 2 × √(aire ÷ π). Trois méthodes, exemples chiffrés, tableau de correspondance et erreurs à éviter.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-diametre-cercle" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "comment calculer le diamètre d'un cercle, diamètre cercle formule, calcul du diamètre du cercle, trouver le diamètre à partir du périmètre, diamètre à partir de l'aire, rayon et diamètre",
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
  slug: "/comment-calculer-diametre-cercle",
  fil: "Calculer le diamètre d'un cercle",
  emoji: "⭕",
  couleur: "from-blue-500 to-cyan-600",
  h1: "Comment calculer le diamètre d'un cercle ?",
  chapo:
    "Vous connaissez le rayon, le tour ou la surface d'un cercle et il vous manque son diamètre ? Cet article donne les trois formules, un exemple pour chacune et les pièges à éviter.",
  reponse:
    "Le diamètre est la longueur d'un bord à l'autre du cercle, en passant par le centre. Si vous connaissez le rayon r : **d = 2 × r**. Si vous connaissez le périmètre P (le tour) : **d = P ÷ π**. Si vous connaissez l'aire A : **d = 2 × √(A ÷ π)**. Par exemple, un cercle de 157 cm de tour a un diamètre d'environ 49,97 cm.",
  sections: [
    {
      titre: "Le diamètre, c'est quoi ?",
      paras: [
        "Le diamètre est le segment qui relie deux points du cercle en passant par son centre. C'est la plus grande distance que l'on peut mesurer à l'intérieur du cercle. Le rayon, lui, va du centre jusqu'au bord : il vaut donc la moitié du diamètre.",
        "Le nombre π (pi) vaut environ 3,14159. Il relie le diamètre au tour du cercle : le périmètre est toujours égal à π fois le diamètre, quelle que soit la taille du cercle. C'est ce qui permet de passer du tour ou de la surface au diamètre.",
      ],
    },
    {
      titre: "Méthode 1 : à partir du rayon",
      paras: [
        "C'est le cas le plus simple. Le diamètre est le double du rayon : **d = 2 × r**. Inversement, r = d ÷ 2.",
        "Exemple : un cercle de 7 cm de rayon a un diamètre de 2 × 7 = 14 cm.",
      ],
    },
    {
      titre: "Méthode 2 : à partir du périmètre",
      paras: [
        "Le périmètre (ou circonférence) est la longueur du contour. Comme P = π × d, on retrouve le diamètre en divisant : **d = P ÷ π**.",
      ],
      etapes: [
        "Mesurez ou relevez le périmètre : par exemple P = 157 cm.",
        "Divisez par π : 157 ÷ 3,14159 ≈ 49,97.",
        "Le diamètre est d'environ 49,97 cm, soit près de 50 cm.",
        "Vérification : π × 49,97 ≈ 157 cm, on retrouve bien le périmètre de départ.",
      ],
    },
    {
      titre: "Méthode 3 : à partir de l'aire",
      paras: [
        "L'aire est la surface à l'intérieur du cercle : A = π × r². On isole d'abord le rayon, r = √(A ÷ π), puis on double : **d = 2 × √(A ÷ π)**. Le symbole √ désigne la racine carrée ; pour la calculer, voir le [calcul de racine carrée](/calcul-racine-carree).",
      ],
      etapes: [
        "Prenez une aire de 200 cm².",
        "Divisez par π : 200 ÷ 3,14159 ≈ 63,66.",
        "Prenez la racine carrée : √63,66 ≈ 7,98. C'est le rayon, en cm.",
        "Doublez : 2 × 7,98 = 15,96. Le diamètre est d'environ 15,96 cm.",
        "Vérification : π × 7,98² ≈ 200 cm².",
      ],
    },
    {
      titre: "Tableau de correspondance",
      paras: [
        "Voici les valeurs associées à quelques diamètres courants, arrondies à deux décimales. Le périmètre est en cm et l'aire en cm².",
      ],
      tableau: {
        colonnes: ["Diamètre (cm)", "Rayon (cm)", "Périmètre (cm)", "Aire (cm²)"],
        lignes: [
          ["2", "1", "6,28", "3,14"],
          ["5", "2,5", "15,71", "19,63"],
          ["10", "5", "31,42", "78,54"],
          ["20", "10", "62,83", "314,16"],
          ["30", "15", "94,25", "706,86"],
          ["50", "25", "157,08", "1 963,50"],
          ["80", "40", "251,33", "5 026,55"],
          ["100", "50", "314,16", "7 853,98"],
          ["150", "75", "471,24", "17 671,46"],
          ["200", "100", "628,32", "31 415,93"],
        ],
      },
    },
    {
      titre: "Quand on ne peut mesurer que le tour",
      paras: [
        "Un tronc d'arbre, un tuyau ou une table ronde ne se mesurent pas toujours de part en part : le centre est inaccessible ou le passage est bloqué. Dans ce cas, entourez l'objet avec un mètre ruban souple et relevez le tour, puis divisez par π.",
        "Exemple : une table ronde fait 377 cm de tour. Son diamètre est 377 ÷ 3,14159 ≈ 120,00 cm, soit 1,20 m, et son rayon 60 cm. Pour un tronc, mesurez à hauteur constante et serrez le ruban sans le tordre : un ruban qui ne suit pas le contour donne un tour trop grand.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Confondre rayon et diamètre.** Le rayon est la moitié du diamètre. Dans la formule de l'aire π × r², utiliser le diamètre à la place du rayon multiplie le résultat par quatre : pour d = 14 cm, on obtiendrait 615,75 cm² au lieu de 153,94 cm².",
        "**Oublier la racine carrée.** Pour l'aire de 200 cm², 200 ÷ π = 63,66 n'est pas un rayon : c'est un rayon au carré. Il faut encore prendre la racine, puis doubler.",
        "**Mélanger les unités.** Un périmètre en centimètres donne un diamètre en centimètres ; une aire en m² donne un diamètre en mètres. Convertissez d'abord si besoin avec la [conversion de longueur](/conversion-longueur) : un diamètre de 80 cm s'écrit 0,8 m avant de calculer une aire en m² (0,50 m²).",
      ],
      encadre:
        "Pour aller plus loin, le calculateur [surface d'un cercle](/calcul-surface-cercle) déduit rayon, diamètre, périmètre et aire à partir d'une seule mesure.",
    },
  ],
  calculateur: {
    href: "/calcul-surface-cercle",
    nom: "Calcul surface cercle",
    titre: "Calculez rayon, diamètre, périmètre et aire en un clic",
    texte:
      "Saisissez une seule mesure (rayon, diamètre ou périmètre) : le calculateur déduit toutes les autres valeurs du cercle.",
    bouton: "Ouvrir le calculateur de cercle",
  },
  faq: [
    {
      q: "Comment trouver le diamètre d'un cercle ?",
      a: "Cela dépend de ce que vous connaissez. Avec le rayon, doublez-le. Avec le tour du cercle, divisez-le par π. Avec la surface, divisez-la par π, prenez la racine carrée, puis doublez.",
    },
    {
      q: "Quelle est la formule du périmètre d'un cercle ?",
      a: "Le périmètre vaut π × d, ou 2 × π × r, puisque d = 2 × r. Pour un cercle de 10 cm de diamètre, le périmètre est d'environ 31,42 cm.",
    },
    {
      q: "Comment trouver l'aire d'un cercle à partir du diamètre ?",
      a: "Divisez le diamètre par 2 pour obtenir le rayon, puis calculez π × r². On peut aussi écrire A = π × d² ÷ 4. Avec d = 20 cm, on trouve environ 314,16 cm².",
    },
    {
      q: "Le diamètre est-il toujours le double du rayon ?",
      a: "Oui, pour n'importe quel cercle. Le diamètre passe par le centre et compte deux rayons mis bout à bout. C'est pourquoi le rayon est la moitié du diamètre, et jamais l'inverse.",
    },
    {
      q: "Peut-on calculer un diamètre avec un produit en croix ?",
      a: "Oui, si vous connaissez un cercle de référence. Le périmètre est proportionnel au diamètre : pour un cercle de 10 cm de diamètre et 31,42 cm de tour, le rapport est le même que pour tout autre cercle. Le produit en croix permet de le poser, mais diviser par π reste plus direct.",
    },
  ],
  sources: [],
  datePublication: "2026-09-30",
  dateAffichee: "30 septembre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
