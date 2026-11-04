import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer la mensualité d'un prêt immobilier ?";
const DESCRIPTION =
  "La mensualité d'un prêt immobilier se calcule avec le capital, le taux mensuel et le nombre de mensualités. Formule, exemples chiffrés, tableau d'amortissement, effet de la durée et du taux, règle des 35 %.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-la-mensualite-d-un-pret-immobilier" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "mensualité prêt immobilier, calcul des mensualités d'un prêt, estimer sa mensualité, formule mensualité crédit, tableau d'amortissement, coût total du crédit",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
    images: [{ url: "/images/pret-immobilier-cles.webp", width: 1200, height: 630 }],
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-la-mensualite-d-un-pret-immobilier",
  fil: "Mensualité d'un prêt immobilier",
  emoji: "🏠",
  couleur: "from-violet-500 to-purple-500",
  h1: "Comment calculer la mensualité d'un prêt immobilier ?",
  chapo:
    "Avant de visiter un bien ou de rencontrer une banque, il est utile de savoir ce que vous paierez chaque mois. Voici la formule, des exemples chiffrés pas à pas, l'effet de la durée et du taux, et la façon de lire le résultat.",
  reponse:
    "**M = C × t ÷ (1 − (1 + t)^(−n))**, où C est le capital emprunté, t le taux annuel divisé par 12 et n le nombre de mensualités (années × 12). À taux zéro, la formule se simplifie : M = C ÷ n. Le coût total des intérêts est ensuite M × n − C.",
  sections: [
    {
      titre: "La formule, pas à pas",
      paras: [
        "Pour un prêt à mensualités constantes, la banque vous demande la même somme chaque mois pendant toute la durée du prêt. Cette somme dépend de trois données : le capital emprunté, le taux et la durée.",
        "On les convertit ainsi :",
      ],
      liste: [
        "**C** : le capital emprunté, en euros.",
        "**t** : le taux mensuel, c'est-à-dire le taux annuel divisé par 100, puis par 12. Un taux de 3,5 % par an donne t = 0,035 ÷ 12, soit environ 0,0029167.",
        "**n** : le nombre de mensualités, c'est-à-dire la durée en années multipliée par 12. Vingt ans font 240 mensualités.",
      ],
      suite: [
        "On applique ensuite la formule **M = C × t ÷ (1 − (1 + t)^(−n))**. Les taux utilisés dans cet article sont des hypothèses pour illustrer le calcul : ce ne sont pas des taux du marché.",
      ],
      visuel: {
        fichier: "pret-immobilier-cles",
        alt: "Un trousseau de clés de maison posé sur une table en bois à côté d'une calculatrice, de feuilles imprimées illisibles et d'une tasse de café, dans la lumière du jour d'une fenêtre.",
        legende:
          "Estimer sa mensualité avant de signer permet de savoir si le projet reste supportable mois après mois.",
      },
    },
    {
      titre: "Exemple 1 : 200 000 € sur 20 ans à 3,5 %",
      paras: [
        "Vous empruntez 200 000 € sur 20 ans, avec un taux de 3,5 % par an (hypothèse).",
      ],
      etapes: [
        "On calcule le taux mensuel : t = 0,035 ÷ 12, soit environ 0,0029167.",
        "On compte les mensualités : 20 × 12 = 240.",
        "On applique la formule avec la valeur non arrondie : 200 000 × (0,035 ÷ 12) ÷ (1 − (1 + 0,035 ÷ 12)^(−240)). Le terme (1 + 0,035 ÷ 12)^(−240) vaut environ 0,50, donc le dénominateur est proche de 0,50.",
        "On obtient une mensualité d'environ **1 159,92 €**.",
      ],
      suite: [
        "Le coût total est d'environ **278 380,66 €**, calculé avec la mensualité non arrondie. Le coût des intérêts est donc 278 380,66 − 200 000 = **78 380,66 €**. Les intérêts représentent environ 28,2 % du coût total. Le simulateur fait le calcul sans arrondir la mensualité ; si vous multipliez 1 159,92 € par 240 à la main, vous trouvez 278 380,80 €, soit quelques centimes de plus.",
      ],
    },
    {
      titre: "Que devient chaque mensualité ?",
      paras: [
        "Chaque mois, les intérêts se calculent sur le capital restant dû : intérêts = capital restant × t. Le reste de la mensualité rembourse du capital. Au début du prêt, le capital restant est élevé : la part d'intérêts est donc la plus forte. Elle baisse ensuite, et la part de capital augmente. C'est ce que montre le tableau d'amortissement.",
        "Voici les trois premières lignes pour l'exemple 1 (mensualité de 1 159,92 €, taux mensuel de 3,5 % ÷ 12) :",
      ],
      tableau: {
        colonnes: ["Mois", "Intérêts", "Capital remboursé", "Capital restant"],
        lignes: [
          ["1", "583,33 €", "576,59 €", "199 423,41 €"],
          ["2", "581,65 €", "578,27 €", "198 845,15 €"],
          ["3", "579,97 €", "579,95 €", "198 265,19 €"],
        ],
      },
      suite: [
        "Le premier mois, on paie 200 000 × 0,035 ÷ 12 = 583,33 € d'intérêts, et il reste 1 159,92 − 583,33 = 576,59 € pour rembourser le capital. Le capital restant devient 199 423,41 €. Le mois suivant, les intérêts sont calculés sur ce nouveau montant, donc ils sont un peu plus faibles.",
      ],
    },
    {
      titre: "Exemple 2 : les mêmes 200 000 € sur 25 ans",
      paras: [
        "Gardons le même capital et le même taux de 3,5 %, mais allongeons la durée : 25 × 12 = 300 mensualités.",
      ],
      etapes: [
        "On applique la formule avec n = 300 : la mensualité est d'environ **1 001,25 €**.",
        "Le coût total est 1 001,25 × 300, soit environ 300 374,14 €.",
        "Le coût des intérêts est 300 374,14 − 200 000 = **100 374,14 €**.",
      ],
      suite: [
        "La mensualité baisse de 158,67 € par mois, mais le coût des intérêts augmente de 21 993,48 €. Allonger la durée allège le budget mensuel, au prix d'un crédit plus cher au total.",
      ],
    },
    {
      titre: "Exemple 3 : 150 000 € sur 15 ans à 3 %",
      paras: [
        "Avec un taux de 3 % (hypothèse), t = 0,03 ÷ 12 = 0,0025 et n = 15 × 12 = 180.",
      ],
      etapes: [
        "On applique la formule : 150 000 × 0,0025 ÷ (1 − (1,0025)^(−180)).",
        "On obtient une mensualité d'environ **1 035,87 €**.",
        "Le coût total est 1 035,87 × 180, soit environ 186 457,04 €, et le coût des intérêts est **36 457,04 €**.",
      ],
    },
    {
      titre: "Exemple 4 : l'effet de 0,5 point de taux en plus",
      paras: [
        "Reprenons l'exemple 1 (200 000 € sur 20 ans) avec un taux de 4 % au lieu de 3,5 %. Le taux mensuel passe à 4 % ÷ 12 = 0,003333 environ.",
      ],
      etapes: [
        "La mensualité devient environ **1 211,96 €**, soit 52,04 € de plus par mois.",
        "Le coût total est d'environ 290 870,56 € et le coût des intérêts de 90 870,56 €.",
        "L'écart sur les intérêts, calculé avec les valeurs non arrondies, est d'environ **12 489,89 €**.",
      ],
      suite: [
        "Un demi-point de taux d'écart paraît faible, mais sur 20 ans il pèse plus de 12 000 €.",
      ],
    },
    {
      titre: "Récapitulatif des exemples",
      tableau: {
        colonnes: ["Prêt", "Mensualité", "Coût des intérêts"],
        lignes: [
          ["200 000 € sur 20 ans à 3,5 %", "1 159,92 €", "78 380,66 €"],
          ["200 000 € sur 25 ans à 3,5 %", "1 001,25 €", "100 374,14 €"],
          ["150 000 € sur 15 ans à 3 %", "1 035,87 €", "36 457,04 €"],
          ["200 000 € sur 20 ans à 4 %", "1 211,96 €", "90 870,56 €"],
        ],
      },
    },
    {
      titre: "Quel revenu pour cette mensualité ?",
      paras: [
        "Les banques appliquent une norme du Haut Conseil de stabilité financière (HCSF) : les mensualités, assurance comprise, ne doivent pas dépasser 35 % des revenus nets, et la durée du prêt est limitée à 25 ans en général.",
        "Pour l'exemple 1, on cherche le revenu net mensuel minimal : 1 159,92 ÷ 0,35 = **3 314,06 €** environ. Ce calcul ne tient pas compte de l'assurance, qui s'ajoute à la mensualité : avec elle, il faudrait un revenu plus élevé. Il ne tient pas non plus compte de vos autres crédits éventuels.",
        "Pour aller plus loin, le calculateur de [capacité d'emprunt](/calcul-capacite-emprunt) part de vos revenus et le [calcul du taux d'endettement](/calcul-taux-endettement) mesure la part de vos revenus consacrée aux remboursements.",
      ],
    },
    {
      titre: "Comment utiliser le simulateur de prêt immobilier",
      paras: [
        "Vous saisissez trois données : le **montant du prêt** (des raccourcis proposent 100 000, 150 000, 200 000 et 300 000 €), le **taux annuel** (des raccourcis proposent 2,90, 3,10, 3,40, 3,55 et 4,00 %, et vous pouvez écrire un autre taux) et la **durée**, à choisir parmi 7, 10, 15, 20 ou 25 ans.",
        "Le simulateur affiche la **mensualité** et le nombre de mensualités, le **coût total du crédit**, le **coût des intérêts**, la part des intérêts en pourcentage, et une barre qui sépare le capital des intérêts. Un tableau d'amortissement s'ouvre en cliquant sur son titre : il donne, **année par année**, le capital remboursé, les intérêts payés et le capital restant, et non mois par mois.",
        "Attention : le simulateur **ne tient pas compte de l'assurance emprunteur ni des frais de dossier**. La mensualité qu'il affiche est donc hors assurance. Le [calcul des frais de notaire](/frais-de-notaire) est un autre poste à prévoir pour un achat.",
        "Pour retrouver l'exemple 1, saisissez 200 000 €, un taux de 3,5 % et une durée de 20 ans : vous lisez environ 1 159,92 € par mois.",
      ],
    },
    {
      titre: "Pièges pratiques",
      liste: [
        "**Oublier l'assurance.** Elle s'ajoute à la mensualité. Demandez son montant à la banque et ajoutez-le au résultat.",
        "**Ne regarder que la mensualité.** Un prêt plus long a une mensualité plus faible, mais un coût total plus élevé, comme l'exemple 2 le montre.",
        "**Confondre le taux annuel et le taux mensuel.** La formule demande le taux mensuel : divisez le taux annuel par 12.",
        "**Croire les taux d'exemple.** Les taux de cet article sont des hypothèses. Votre taux dépend de votre dossier et de l'offre de la banque.",
      ],
      encadre:
        "Si vous refaites le calcul à la main avec des valeurs arrondies, vous trouverez parfois quelques centimes d'écart.",
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Prendre la durée en années dans la formule.** Il faut n en mois : 20 ans font 240 mensualités.",
        "**Oublier de mettre le taux en décimal.** 3,5 % s'écrit 0,035 avant de le diviser par 12.",
        "**Calculer le coût des intérêts sans soustraire le capital.** Le coût total, M × n, comprend le capital : il faut retirer C pour obtenir les intérêts.",
        "**Appliquer la formule à un taux de 0 %.** Elle ne fonctionne pas avec t = 0 : on divise simplement le capital par n.",
      ],
    },
  ],
  calculateur: {
    href: "/simulateur-pret-immobilier",
    nom: "Simulateur de prêt immobilier",
    titre: "Simulez votre mensualité",
    texte:
      "Saisissez le montant, le taux et la durée : le simulateur affiche la mensualité, le coût total, le coût des intérêts et le tableau d'amortissement année par année, hors assurance.",
    bouton: "Ouvrir le simulateur de prêt immobilier",
  },
  faq: [
    {
      q: "Quelle est la formule de la mensualité d'un prêt ?",
      a: "M = C × t ÷ (1 − (1 + t)^(−n)), avec C le capital emprunté, t le taux annuel divisé par 12 et n le nombre de mensualités. À taux zéro, M = C ÷ n.",
    },
    {
      q: "Comment calculer le coût total des intérêts ?",
      a: "On multiplie la mensualité par le nombre de mensualités, puis on retire le capital emprunté : coût des intérêts = M × n − C.",
    },
    {
      q: "Pourquoi paie-t-on plus d'intérêts au début du prêt ?",
      a: "Chaque mois, les intérêts se calculent sur le capital restant dû. Au début, il est élevé, donc la part d'intérêts est la plus forte. Elle baisse ensuite à mesure que le capital se rembourse.",
    },
    {
      q: "L'assurance emprunteur est-elle comprise dans la mensualité calculée ?",
      a: "Non. L'assurance s'ajoute à la mensualité, et le simulateur de Mes Calculateurs ne la prend pas en compte. Ajoutez son montant au résultat.",
    },
    {
      q: "Quelle part des revenus la mensualité peut-elle représenter ?",
      a: "Les banques appliquent une norme du HCSF : les mensualités, assurance comprise, ne doivent pas dépasser 35 % des revenus nets, et la durée du prêt est limitée à 25 ans en général.",
    },
  ],
  sources: [],
  datePublication: "2026-11-04",
  dateAffichee: "4 novembre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
