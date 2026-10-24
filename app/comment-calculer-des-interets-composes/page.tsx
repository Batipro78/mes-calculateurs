import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer des intérêts composés ?";
const DESCRIPTION =
  "Les intérêts composés s'ajoutent au capital et produisent eux-mêmes des intérêts. Formules, différence avec les intérêts simples, exemple mensuel et calculateur.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-des-interets-composes" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "intérêts composés, calcul intérêts composés, formule intérêts composés, intérêts simples, capitalisation mensuelle, calculateur intérêts composés",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-des-interets-composes",
  fil: "Calculer des intérêts composés",
  emoji: "📈",
  couleur: "from-cyan-500 to-blue-600",
  h1: "Comment calculer des intérêts composés ?",
  chapo:
    "Avec les intérêts composés, les intérêts ajoutés au capital produisent à leur tour des intérêts. Voici la formule annuelle, la différence avec les intérêts simples et le fonctionnement exact du calculateur avec une capitalisation chaque mois.",
  reponse:
    "La formule annuelle est **C × (1 + t)^n**, avec C le capital de départ, t le taux annuel écrit en nombre décimal et n le nombre d'années. Le calculateur d'intérêts composés travaille toutefois mois par mois : il divise le taux annuel par 12, calcule les intérêts chaque mois, puis ajoute le versement mensuel en fin de mois.",
  sections: [
    {
      titre: "La formule des intérêts composés",
      paras: [
        "Pour une somme placée sans versement supplémentaire et avec une capitalisation annuelle, la formule est **C(n) = C × (1 + t)^n**. C est le capital initial, t le taux annuel sous forme décimale et n le nombre d'années.",
        "Un taux de 5 % s'écrit 0,05 dans la formule. Le signe ^ indique une puissance : **(1 + t)^n** signifie que l'on multiplie le capital par 1 + t, n fois.",
      ],
      etapes: [
        "Prenons un capital initial hypothétique de 1 000 €, un taux annuel hypothétique de 5 % et une durée de 3 ans.",
        "On remplace les valeurs dans la formule : 1 000 × (1 + 0,05)^3.",
        "On calcule : 1 000 × 1,05^3 = 1 157,625 €.",
        "Arrondi à deux décimales, le capital final est de **1 157,63 €**.",
      ],
      suite: [
        "Ce résultat est une hypothèse mathématique : le taux de 5 % ne décrit aucun produit d'épargne particulier.",
      ],
    },
    {
      titre: "Intérêts simples ou intérêts composés ?",
      paras: [
        "Avec les intérêts simples, les intérêts sont calculés uniquement sur le capital initial. La formule est **C × t × n** pour le montant des intérêts. Le capital final est donc le capital initial augmenté de ce montant.",
        "Avec les intérêts composés, les intérêts sont ajoutés au capital avant le calcul suivant. Le montant sur lequel les intérêts sont calculés augmente donc au fil du temps.",
      ],
      tableau: {
        colonnes: ["Méthode", "Calcul avec 1 000 €, 5 % et 3 ans", "Capital final"],
        lignes: [
          ["Intérêts simples", "1 000 + (1 000 × 0,05 × 3)", "1 150,00 €"],
          ["Intérêts composés", "1 000 × (1 + 0,05)^3", "1 157,63 €"],
        ],
      },
      suite: [
        "Dans ces deux calculs, le taux de 5 % et la durée de 3 ans sont des hypothèses. Le résultat composé est arrondi à deux décimales.",
      ],
    },
    {
      titre: "Capitalisation mensuelle : le fonctionnement du calculateur",
      paras: [
        "Le [calculateur d'intérêts composés](/calcul-interet-compose) ne fait pas une seule capitalisation à la fin de chaque année. Il capitalise **chaque mois**. Il calcule le taux mensuel en divisant le taux annuel par 12, puis ajoute le versement mensuel en fin de mois.",
        "Il vous demande quatre valeurs : le **capital initial**, le **versement mensuel**, le **taux annuel** et la **durée en années**. Il affiche ensuite le capital final, le total versé, les intérêts gagnés, le gain total et une évolution année par année.",
      ],
      encadre:
        "Pour reproduire le résultat du calculateur, utilisez exactement le même taux annuel, la même durée, le même capital initial et le même versement mensuel. Le versement est ajouté après le calcul des intérêts du mois, et les montants affichés sont arrondis à l'euro.",
    },
    {
      titre: "Exemple exactement comme le calculateur",
      paras: [
        "Prenons un capital initial hypothétique de 1 000 €, un versement mensuel hypothétique de 100 €, un taux annuel hypothétique de 5 % et une durée de 3 ans. Le taux mensuel utilisé est 5 % ÷ 12 = 0,4166666667 % (soit 0,004166666667 en écriture décimale).",
      ],
      etapes: [
        "Au premier mois, les intérêts sont 1 000 × (0,05 ÷ 12) = 4,1666667 €. Le versement de 100 € est ensuite ajouté : le solde devient 1 104,1666667 €.",
        "Au deuxième mois, les intérêts sont calculés sur 1 104,1666667 € : 1 104,1666667 × (0,05 ÷ 12) = 4,6006944 €. Après le versement de 100 €, le solde devient 1 208,7673611 €.",
        "Le même ordre est répété pendant 36 mois : intérêts sur le solde du mois, puis ajout de 100 € en fin de mois.",
        "Après 36 mois, le total versé est 1 000 + (100 × 36) = **4 600 €**.",
        "Le capital final calculé est 5 036,8057833 €, soit **5 036,81 € après arrondi à deux décimales**.",
        "Les intérêts gagnés sont 5 036,8057833 − 4 600 = 436,8057833 €, soit **436,81 € après arrondi à deux décimales**.",
        "Dans le calculateur, ces résultats s'affichent comme **5 037 €** de capital final et **437 €** d'intérêts, arrondis à l'euro.",
      ],
      suite: [
        "En saisissant ces quatre hypothèses dans le calculateur, vous obtenez ces montants avec l'affichage monétaire arrondi à l'euro.",
      ],
    },
    {
      titre: "La règle de 72",
      paras: [
        "La règle de 72 donne une approximation du nombre d'années nécessaires pour doubler un capital avec des intérêts composés. On divise 72 par le taux annuel exprimé en pourcentage : **nombre d'années ≈ 72 ÷ taux en %**.",
        "Avec un taux hypothétique de 6 %, l'approximation donne 72 ÷ 6 = **12 ans**. Cette règle est une estimation, pas un calcul exact.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Confondre 5 % et 5.** Dans une formule, 5 % devient 0,05. Dans le calculateur, saisissez 5 dans le champ du taux annuel : il effectue lui-même la conversion.",
        "**Utiliser la formule annuelle pour lire le résultat mensuel.** Le calculateur divise le taux annuel par 12 et capitalise chaque mois ; son résultat peut donc différer d'une formule avec une seule capitalisation annuelle.",
        "**Oublier les versements mensuels.** Le total versé comprend le capital initial et tous les versements mensuels.",
        "**Ajouter le versement avant les intérêts.** Le calculateur ajoute le versement en fin de mois. Pour reproduire son résultat, calculez d'abord les intérêts sur le solde existant.",
        "**Arrondir chaque mois.** Gardez les décimales pendant les calculs ; le calculateur affiche ensuite les montants arrondis à l'euro.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-interet-compose",
    nom: "Calcul intérêt composé",
    titre: "Calculez vos intérêts composés",
    texte:
      "Saisissez le capital initial, le versement mensuel, le taux annuel et la durée en années. Le calculateur capitalise chaque mois et affiche le capital final, les intérêts et l'évolution année par année.",
    bouton: "Ouvrir le calculateur",
  },
  faq: [
    {
      q: "Quelle est la formule des intérêts composés ?",
      a: "Pour une capitalisation annuelle sans versement supplémentaire, la formule est C × (1 + t)^n, avec C le capital initial, t le taux annuel sous forme décimale et n le nombre d'années.",
    },
    {
      q: "Quelle est la différence entre intérêts simples et intérêts composés ?",
      a: "Les intérêts simples sont calculés sur le capital initial avec la formule C × t × n. Les intérêts composés sont ajoutés au capital et produisent ensuite eux-mêmes des intérêts.",
    },
    {
      q: "Comment le calculateur capitalise-t-il les intérêts ?",
      a: "Il divise le taux annuel par 12, calcule les intérêts chaque mois et ajoute le versement mensuel en fin de mois. Il répète cette opération pendant la durée saisie.",
    },
    {
      q: "Que faut-il saisir dans le calculateur d'intérêts composés ?",
      a: "Saisissez le capital initial, le versement mensuel, le taux annuel en pourcentage et la durée en années. Le résultat indique notamment le capital final, le total versé et les intérêts gagnés.",
    },
    {
      q: "Que donne la règle de 72 ?",
      a: "Elle estime le nombre d'années pour doubler un capital : nombre d'années environ égal à 72 divisé par le taux annuel en pourcentage. À 6 %, l'estimation est de 12 ans.",
    },
  ],
  sources: [],
  datePublication: "2026-10-24",
  dateAffichee: "24 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
