import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer le PGCD de deux nombres ?";
const DESCRIPTION =
  "Pour calculer le PGCD, utilisez les diviseurs, l'algorithme d'Euclide, les soustractions successives ou les facteurs premiers. Exemple détaillé avec 36 et 48.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-le-pgcd" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "calcul PGCD, comment calculer le PGCD, PGCD de 36 et 48, trouver le PGCD, algorithme d'Euclide, diviseurs communs, PPCM",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-le-pgcd",
  fil: "Calculer le PGCD",
  emoji: "🔢",
  couleur: "from-purple-500 to-violet-600",
  h1: "Comment calculer le PGCD de deux nombres ?",
  chapo:
    "Le PGCD est le plus grand diviseur commun à deux nombres entiers. Pour le trouver, vous pouvez lister les diviseurs, appliquer l'algorithme d'Euclide, effectuer des soustractions successives ou décomposer les nombres en facteurs premiers.",
  reponse:
    "Pour 36 et 48, le résultat est **12**. Une méthode efficace consiste à effectuer des divisions successives : 48 = 36 × 1 + 12, puis 36 = 12 × 3 + 0. Le dernier reste non nul, 12, est le PGCD.",
  sections: [
    {
      titre: "Qu'est-ce que le PGCD ?",
      paras: [
        "Le PGCD de deux nombres est leur **plus grand diviseur commun**. Un diviseur d'un nombre le partage sans reste. Le PGCD est donc le plus grand nombre qui divise les deux nombres exactement.",
        "Le PGCD de 36 et 48 vaut 12, car 12 divise 36 et 48, et aucun diviseur commun plus grand n'existe.",
        "Lorsque le PGCD de deux nombres vaut 1, ces nombres sont dits **premiers entre eux**.",
      ],
    },
    {
      titre: "Exemple : PGCD de 36 et 48",
      paras: [
        "Voici quatre méthodes pour retrouver le même résultat avec 36 et 48.",
      ],
      etapes: [
        "Par les listes de diviseurs, les diviseurs de 36 sont 1, 2, 3, 4, 6, 9, 12, 18 et 36.",
        "Les diviseurs de 48 sont 1, 2, 3, 4, 6, 8, 12, 16, 24 et 48.",
        "Les diviseurs communs sont 1, 2, 3, 4, 6 et 12. Le plus grand est donc **PGCD(36, 48) = 12**.",
      ],
      tableau: {
        colonnes: ["Méthode", "Calcul", "Résultat"],
        lignes: [
          ["Listes de diviseurs", "Plus grand diviseur commun", "12"],
          ["Euclide", "48 = 36 × 1 + 12 ; 36 = 12 × 3 + 0", "12"],
          ["Soustractions", "48 − 36 = 12, puis retraits successifs", "12"],
          ["Facteurs premiers", "36 = 2² × 3² et 48 = 2⁴ × 3", "12"],
        ],
      },
    },
    {
      titre: "L'algorithme d'Euclide : les divisions successives",
      paras: [
        "L'algorithme d'Euclide utilise des divisions successives. Divisez le plus grand nombre par le plus petit, puis recommencez avec le diviseur et le reste. Le dernier reste non nul est le PGCD.",
      ],
      etapes: [
        "Divisez 48 par 36 : **48 = 36 × 1 + 12**. Le reste est 12.",
        "Divisez 36 par 12 : **36 = 12 × 3 + 0**. Le reste est 0.",
        "Le dernier reste non nul est 12. Donc **PGCD(36, 48) = 12**.",
      ],
    },
    {
      titre: "La méthode des soustractions successives",
      paras: [
        "On peut aussi remplacer le plus grand nombre par la différence entre les deux nombres. On recommence jusqu'à obtenir deux nombres égaux. Cette valeur commune est le PGCD.",
      ],
      etapes: [
        "48 − 36 = 12. On travaille maintenant avec 36 et 12.",
        "36 − 12 = 24. On travaille avec 24 et 12.",
        "24 − 12 = 12. Les deux nombres sont maintenant 12 et 12.",
        "Le PGCD est donc **12**.",
      ],
    },
    {
      titre: "Calculer le PGCD avec les facteurs premiers",
      paras: [
        "Décomposez chaque nombre en facteurs premiers, puis gardez uniquement les facteurs présents dans les deux décompositions, avec le plus petit exposant.",
      ],
      etapes: [
        "Décomposez 36 : **36 = 2 × 2 × 3 × 3 = 2² × 3²**.",
        "Décomposez 48 : **48 = 2 × 2 × 2 × 2 × 3 = 2⁴ × 3**.",
        "Gardez 2², car le plus petit exposant de 2 est 2, et gardez 3, car le plus petit exposant de 3 est 1.",
        "Multipliez les facteurs communs : **2² × 3 = 4 × 3 = 12**.",
      ],
    },
    {
      titre: "Le lien entre PGCD et PPCM",
      paras: [
        "Le PPCM est le plus petit multiple commun à deux nombres. Pour 36 et 48, le PPCM vaut **144**.",
        "La relation entre les deux résultats est : **PGCD(a, b) × PPCM(a, b) = a × b**.",
      ],
      etapes: [
        "Avec a = 36 et b = 48 : 12 × 144 = 1 728.",
        "Le produit des nombres de départ vaut 36 × 48 = 1 728.",
        "Les deux produits sont égaux : **PGCD(36, 48) × PPCM(36, 48) = 36 × 48**.",
      ],
    },
    {
      titre: "Simplifier une fraction avec le PGCD",
      paras: [
        "Pour rendre une fraction irréductible, divisez son numérateur et son dénominateur par leur PGCD.",
      ],
      etapes: [
        "Pour la fraction 36/48, le PGCD du numérateur et du dénominateur est 12.",
        "Divisez le numérateur : 36 ÷ 12 = 3.",
        "Divisez le dénominateur : 48 ÷ 12 = 4.",
        "La fraction simplifiée est donc **36/48 = 3/4**.",
      ],
    },
    {
      titre: "Comment utiliser le calculateur de PGCD et de PPCM",
      paras: [
        "Le calculateur demande deux valeurs dans les champs **Nombre A** et **Nombre B**. Saisissez deux nombres entiers positifs, puis lisez directement les résultats affichés.",
        "Il affiche le PGCD et le PPCM, les divisions de l'algorithme d'Euclide, la décomposition de chaque nombre en facteurs premiers, la vérification de la relation entre PGCD et PPCM, ainsi que les quotients obtenus en divisant A et B par le PGCD.",
        "Pour vérifier l'exemple, saisissez 36 dans Nombre A et 48 dans Nombre B. Le calculateur affiche un PGCD de 12 et un PPCM de 144.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Choisir le plus grand diviseur d'un seul nombre.** Le PGCD doit diviser les deux nombres, pas un seul.",
        "**S'arrêter au premier reste.** Avec Euclide, le PGCD est le dernier reste non nul, pas forcément le premier.",
        "**Confondre PGCD et PPCM.** Le PGCD cherche le plus grand diviseur commun, tandis que le PPCM cherche le plus petit multiple commun.",
        "**Oublier tous les facteurs communs.** Avec les facteurs premiers, utilisez le plus petit exposant présent dans les deux décompositions.",
        "**Ne simplifier qu'une partie de la fraction.** Pour rendre une fraction irréductible, divisez le numérateur et le dénominateur par le même PGCD.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-pgcd-ppcm",
    nom: "Calcul PGCD et PPCM",
    titre: "Calculez le PGCD et le PPCM",
    texte:
      "Saisissez deux nombres entiers positifs : le calculateur affiche le PGCD, le PPCM, les étapes d'Euclide et les décompositions en facteurs premiers.",
    bouton: "Ouvrir le calculateur PGCD",
  },
  faq: [
    {
      q: "Comment calculer rapidement le PGCD de deux nombres ?",
      a: "Utilisez l'algorithme d'Euclide : divisez le plus grand nombre par le plus petit, puis recommencez avec le diviseur et le reste. Le dernier reste non nul est le PGCD.",
    },
    {
      q: "Quel est le PGCD de 36 et 48 ?",
      a: "Le PGCD de 36 et 48 est 12. En effet, 48 = 36 × 1 + 12, puis 36 = 12 × 3 + 0 : le dernier reste non nul est 12.",
    },
    {
      q: "Comment trouver le PGCD avec les diviseurs ?",
      a: "Listez les diviseurs de chacun des deux nombres, repérez leurs diviseurs communs et choisissez le plus grand. Pour 36 et 48, le plus grand diviseur commun est 12.",
    },
    {
      q: "À quoi sert le PGCD pour une fraction ?",
      a: "Il sert à rendre une fraction irréductible. Divisez le numérateur et le dénominateur par leur PGCD. Ainsi, 36/48 devient 3/4 après une division par 12.",
    },
    {
      q: "Quelle est la différence entre le PGCD et le PPCM ?",
      a: "Le PGCD est le plus grand diviseur commun à deux nombres. Le PPCM est leur plus petit multiple commun. Ils vérifient la relation PGCD(a, b) × PPCM(a, b) = a × b.",
    },
  ],
  sources: [],
  datePublication: "2026-10-24",
  dateAffichee: "24 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
