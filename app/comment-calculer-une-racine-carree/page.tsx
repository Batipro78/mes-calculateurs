import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer une racine carrée ?";
const DESCRIPTION =
  "Définition, carrés parfaits, encadrement et méthode de Heron pour calculer une racine carrée. Exemples détaillés avec racine carrée de 2 et de 3.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-une-racine-carree" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "calculer racine carrée, racine carrée, racine carrée de 2, racine carrée de 3, trouver racine carrée, méthode de Heron",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-une-racine-carree",
  fil: "Calculer une racine carrée",
  emoji: "√",
  couleur: "from-amber-500 to-orange-600",
  h1: "Comment calculer une racine carrée ?",
  chapo:
    "La racine carrée d'un nombre est le nombre positif dont le carré donne le nombre de départ. Pour la trouver, on peut reconnaître un carré parfait, l'encadrer entre deux carrés parfaits ou utiliser la méthode de Heron. Pour √2, en partant de x = 1,5, les trois premières étapes donnent environ 1,416667, 1,414216 puis 1,414214. Voici aussi le résultat pour √3.",
  reponse:
    "Pour calculer une racine carrée, cherchez d'abord deux carrés parfaits qui encadrent le nombre. Par exemple, 2 est entre 1 et 4, donc √2 est entre 1 et 2. Pour obtenir davantage de décimales, appliquez la méthode de Heron : **x suivant = (x + a ÷ x) ÷ 2**, avec a le nombre dont on cherche la racine. Ainsi, **√2 ≈ 1,414214** et **√3 ≈ 1,732051**, à 6 décimales.",
  sections: [
    {
      titre: "Qu'est-ce qu'une racine carrée ?",
      paras: [
        "La racine carrée d'un nombre a est le nombre positif dont le carré est égal à a. Elle s'écrit √a. Cela signifie que √a × √a = a.",
        "Par exemple, √25 = 5, car 5 × 5 = 25. Le nombre 25 est alors un carré parfait.",
        "Dans les nombres réels, un nombre négatif n'a pas de racine carrée : aucun nombre réel multiplié par lui-même ne donne un résultat négatif.",
      ],
    },
    {
      titre: "Reconnaître les carrés parfaits",
      paras: [
        "Un carré parfait est le carré d'un nombre entier. Quand le nombre de départ est un carré parfait, sa racine carrée se trouve directement.",
      ],
      tableau: {
        colonnes: ["Nombre", "Calcul", "Racine carrée"],
        lignes: [
          ["0", "0 × 0", "0"],
          ["1", "1 × 1", "1"],
          ["4", "2 × 2", "2"],
          ["9", "3 × 3", "3"],
          ["16", "4 × 4", "4"],
          ["25", "5 × 5", "5"],
          ["36", "6 × 6", "6"],
          ["49", "7 × 7", "7"],
          ["64", "8 × 8", "8"],
          ["81", "9 × 9", "9"],
          ["100", "10 × 10", "10"],
        ],
      },
      suite: [
        "Si le nombre n'est pas un carré parfait, vous pouvez l'encadrer entre deux carrés parfaits pour trouver une première approximation.",
      ],
    },
    {
      titre: "Encadrer une racine carrée entre deux carrés parfaits",
      paras: [
        "Pour encadrer √a, cherchez deux nombres entiers consécutifs dont les carrés entourent a. La racine carrée est alors comprise entre ces deux nombres.",
      ],
      etapes: [
        "Pour √20, on repère 16 < 20 < 25.",
        "Comme 4² = 16 et 5² = 25, on obtient 4 < √20 < 5.",
        "Pour une première estimation, on peut tester des dixièmes : 4,4² = 19,36 et 4,5² = 20,25. Donc 4,4 < √20 < 4,5.",
      ],
      suite: [
        "Cet encadrement indique l'ordre de grandeur, mais il ne donne pas encore toutes les décimales. Pour affiner le résultat, utilisez la méthode de Heron.",
      ],
    },
    {
      titre: "La méthode de Heron, ou méthode babylonienne",
      paras: [
        "La méthode de Heron permet d'approcher la racine carrée d'un nombre a par une suite de calculs. Choisissez une première valeur x, puis recommencez avec la formule **x suivant = (x + a ÷ x) ÷ 2**.",
        "À chaque étape, la nouvelle valeur se rapproche de √a. On peut arrêter quand les décimales obtenues ne changent plus au niveau souhaité.",
      ],
      etapes: [
        "Pour calculer √10, choisissons x = 3, car 3² est proche de 10.",
        "Première étape : (3 + 10 ÷ 3) ÷ 2 = 3,166667.",
        "Deuxième étape : (3,166667 + 10 ÷ 3,166667) ÷ 2 ≈ 3,162281.",
        "Troisième étape : (3,162281 + 10 ÷ 3,162281) ÷ 2 ≈ 3,162278.",
        "On obtient donc √10 ≈ 3,162278 à 6 décimales.",
      ],
      encadre:
        "Gardez plusieurs décimales pendant les étapes, puis arrondissez seulement le résultat final. Un arrondi trop tôt peut modifier les dernières décimales.",
    },
    {
      titre: "Comment calculer √2 et √3 ?",
      paras: [
        "Ni 2 ni 3 ne sont des carrés parfaits. Pour √2, l'encadrement 1² < 2 < 2² donne 1 < √2 < 2. Pour √3, le même encadrement donne 1 < √3 < 2.",
        "En affinant le calcul, on obtient les valeurs suivantes, arrondies à 6 décimales.",
      ],
      tableau: {
        colonnes: ["Racine", "Valeur à 6 décimales", "Vérification du carré"],
        lignes: [
          ["√2", "1,414214", "1,414214 × 1,414214 ≈ 2"],
          ["√3", "1,732051", "1,732051 × 1,732051 ≈ 3"],
        ],
      },
      suite: [
        "Les signes ≈ indiquent que les valeurs sont arrondies. Avec ces arrondis, 1,414214² = 2,0000012 et 1,732051² = 3,0000007 : l'écart vient de l'arrondi. La racine carrée de 2 vaut environ 1,414214 et celle de 3 environ 1,732051.",
      ],
    },
    {
      titre: "Les règles de calcul avec les racines carrées",
      paras: [
        "Pour des nombres positifs, certaines opérations peuvent être séparées sous la racine : **√(a × b) = √a × √b** et **√(a ÷ b) = √a ÷ √b**.",
      ],
      etapes: [
        "Pour √12, on écrit 12 = 4 × 3.",
        "On applique la règle du produit : √12 = √4 × √3.",
        "Comme √4 = 2, on obtient √12 = 2 × √3, soit environ 3,464102.",
      ],
      encadre:
        "Attention : une addition ne se sépare pas de la même façon. En général, **√(a + b) ≠ √a + √b**. Par exemple, √(4 + 9) = √13, alors que √4 + √9 = 5.",
    },
    {
      titre: "Comment utiliser le calculateur de racine carrée",
      paras: [
        "Saisissez le nombre dans le champ « Nombre ». Le calculateur accepte aussi une virgule décimale. Attention : une saisie comme « 12abc » est lue comme 12. Pour un nombre négatif ou une saisie qui ne commence pas par un nombre, aucun résultat n'est affiché et le message « Entrez un nombre positif » apparaît.",
        "Le résultat principal affiche √n. Une racine exacte est affichée sans décimales ; une autre racine est affichée à 6 décimales. Le calculateur indique également si le nombre est un carré parfait.",
        "Sous ce résultat, vous lisez la racine cubique, une vérification du carré de la racine et les carrés parfaits proches du nombre saisi.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Confondre le nombre et sa racine.** Pour √25, le nombre de départ est 25 et la racine est 5.",
        "**Utiliser un encadrement incorrect.** Pour √20, il faut comparer 20 à 4² = 16 et 5² = 25, donc la racine est entre 4 et 5.",
        "**Arrondir à chaque étape.** Avec la méthode de Heron, gardez plusieurs décimales et arrondissez à la fin.",
        "**Séparer une addition sous la racine.** √(a + b) n'est pas égal à √a + √b.",
        "**Chercher une racine réelle pour un nombre négatif.** Dans les nombres réels, un nombre négatif n'a pas de racine carrée.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-racine-carree",
    nom: "Calcul racine carrée",
    titre: "Calculez une racine carrée",
    texte:
      "Saisissez un nombre positif ou nul : le calculateur affiche sa racine carrée, sa racine cubique, sa vérification et les carrés parfaits proches.",
    bouton: "Ouvrir le calculateur de racine carrée",
  },
  faq: [
    {
      q: "Comment trouver la racine carrée d'un nombre ?",
      a: "Cherchez deux carrés parfaits qui encadrent le nombre, puis affinez avec la méthode de Heron : x suivant = (x + a ÷ x) ÷ 2. Pour un carré parfait, la racine se lit directement.",
    },
    {
      q: "Quelle est la racine carrée de 2 ?",
      a: "La racine carrée de 2 vaut environ 1,414214, arrondie à 6 décimales. En effet, 1² < 2 < 2².",
    },
    {
      q: "Quelle est la racine carrée de 3 ?",
      a: "La racine carrée de 3 vaut environ 1,732051, arrondie à 6 décimales. Elle est comprise entre 1 et 2, car 1² < 3 < 2².",
    },
    {
      q: "Comment calculer une racine carrée sans calculatrice ?",
      a: "Commencez par l'encadrer entre deux carrés parfaits. Pour obtenir davantage de décimales, choisissez une première valeur et appliquez plusieurs fois la méthode de Heron.",
    },
    {
      q: "Peut-on calculer la racine carrée d'un nombre négatif ?",
      a: "Non, pas dans les nombres réels. Aucun nombre réel multiplié par lui-même ne donne un résultat négatif.",
    },
  ],
  sources: [],
  datePublication: "2026-10-24",
  dateAffichee: "24 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
