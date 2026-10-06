import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Quelle capacité d'emprunt pour quel salaire ? (2026)";
const DESCRIPTION =
  "Avec 2 500 € net par mois, on peut emprunter environ 153 000 € sur 20 ans (hors assurance, sans autre crédit). Tableau salaire par salaire, règle des 35 % et formule.";

export const metadata: Metadata = {
  alternates: { canonical: "/capacite-d-emprunt-quel-salaire" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "quelle capacité d'emprunt pour quel salaire, capacité d'emprunt selon salaire, comment est calculée la capacité d'emprunt, comment estimer sa capacité d'emprunt, quelle est ma capacité d'emprunt immobilier, comment augmenter sa capacité d'emprunt, règle des 35 %, mensualité maximale",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/capacite-d-emprunt-quel-salaire",
  fil: "Capacité d'emprunt selon le salaire",
  emoji: "🏠",
  couleur: "from-blue-500 to-indigo-600",
  h1: "Quelle capacité d'emprunt pour quel salaire ?",
  chapo:
    "Cet article s'adresse à ceux qui préparent un achat immobilier et se demandent quelle somme une banque acceptera de leur prêter avec leur salaire. Il donne un tableau salaire par salaire, explique la règle des 35 % et la formule qui transforme une mensualité en capital.",
  reponse:
    "Avec **2 500 € net par mois**, la mensualité maximale est de **875 €** (35 % du salaire). Sur 20 ans à 3,35 %, cela permet d'emprunter environ **152 900 €**, et environ 175 700 € sur 25 ans à 3,45 %, hors assurance et sans autre crédit. Ces taux sont les hypothèses du calculateur du site, pas une offre : la banque décide.",
  sections: [
    {
      titre: "Quel capital pour quel salaire net ?",
      paras: [
        "Le tableau suppose un seul crédit, le vôtre : pas d'autre prêt en cours, pas d'apport, assurance non comptée. Le salaire est le net mensuel du foyer, avant impôt, tel qu'il figure sur la fiche de paie. Si vous ne connaissez que le brut, passez d'abord par le [calcul du salaire brut en net](/salaire-brut-net).",
      ],
      tableau: {
        colonnes: [
          "Salaire net mensuel",
          "Mensualité maximale (35 %)",
          "Capital sur 20 ans (3,35 %)",
          "Capital sur 25 ans (3,45 %)",
        ],
        lignes: [
          ["1 500 €", "525 €", "91 738 €", "105 433 €"],
          ["2 000 €", "700 €", "122 317 €", "140 577 €"],
          ["2 500 €", "875 €", "152 897 €", "175 722 €"],
          ["3 000 €", "1 050 €", "183 476 €", "210 866 €"],
          ["3 500 €", "1 225 €", "214 055 €", "246 011 €"],
          ["4 000 €", "1 400 €", "244 635 €", "281 155 €"],
        ],
      },
      suite: [
        "Pour retrouver ces montants dans le [calculateur de capacité d'emprunt](/calcul-capacite-emprunt), saisissez le salaire, laissez les charges à 0, choisissez la durée (les taux 3,35 % et 3,45 % sont ceux qu'il propose par défaut) et mettez le taux d'assurance à 0. Avec son taux d'assurance par défaut (0,30 %), il affiche un peu moins (146 497 € pour 2 500 € sur 20 ans), car l'assurance prend sa place dans les 35 % : nous y revenons plus bas.",
        "Ces taux sont une hypothèse. Pour situer l'ordre de grandeur, la Banque de France indique que le taux d'intérêt des nouveaux crédits à l'habitat (hors renégociations) s'élevait à 3,27 % en juin 2026. Le vôtre dépendra de votre dossier, de la durée et de la banque.",
      ],
      visuel: {
        fichier: "capacite-emprunt-selon-salaire",
        alt: "Barres du capital empruntable selon le salaire net, avec une mensualité de 35 % du salaire, hors assurance : 2 500 € net donne 152 897 € sur 20 ans et 175 722 € sur 25 ans ; 4 000 € net donne 244 635 € sur 20 ans et 281 155 € sur 25 ans",
        legende:
          "Capital empruntable selon le salaire net, sur 20 ans à 3,35 % et sur 25 ans à 3,45 %, hors assurance et sans autre crédit.",
      },
    },
    {
      titre: "Comment est calculée la capacité d'emprunt ?",
      paras: [
        "Le calcul tient en deux temps. D'abord on fixe la mensualité que vous pouvez payer, ensuite on la convertit en capital selon le taux et la durée.",
        "Pour la mensualité, la décision du Haut Conseil de stabilité financière (HCSF) du 29 septembre 2021 demande aux banques de ne pas dépasser un taux d'effort de 35 %, c'est-à-dire le ratio des charges d'emprunt sur le revenu. Pour la durée, la maturité du crédit ne doit pas dépasser 25 ans. Bercy précise que les charges d'emprunt s'entendent frais d'assurance compris, et que le revenu retenu est le revenu net avant impôt.",
      ],
      liste: [
        "**Mensualité maximale** = revenu net mensuel × 35 %, moins les crédits déjà en cours.",
        "**Capital empruntable** = mensualité × (1 − (1 + i)^−n) / i, où i est le taux mensuel (le taux annuel divisé par 12) et n le nombre de mensualités.",
        "Chaque euro de mensualité « vaut » 174,74 € de capital sur 20 ans à 3,35 %, et 200,82 € sur 25 ans à 3,45 %.",
      ],
      encadre:
        "Le calcul du taux d'endettement (mensualités divisées par revenus) est détaillé dans [cet article](/taux-d-endettement-comment-calculer). Ici, on part de la limite de 35 % pour remonter jusqu'au capital.",
    },
    {
      titre: "Exemple chiffré : 2 500 € net par mois, sur 20 ans",
      paras: [
        "Voici le calcul pour un salaire net de 2 500 €, un crédit sur 20 ans à 3,35 %, sans autre crédit et hors assurance.",
      ],
      etapes: [
        "**Mensualité maximale** : 2 500 × 35 % = 875 €.",
        "**Taux mensuel et durée** : 3,35 % / 12 = 0,2792 % par mois, pendant 20 × 12 = 240 mensualités.",
        "**Coefficient** : (1 − 1,002792^−240) / 0,002792 = 174,74.",
        "**Capital** : 875 × 174,74 = **152 897 €**.",
      ],
      suite: [
        "Si l'assurance emprunteur est comptée dans les 35 %, elle réduit la part qui rembourse le crédit. Avec une assurance à 0,30 % par an du capital emprunté (une hypothèse, le vôtre sera différent), la mensualité de 875 € se partage en 838,38 € de crédit et 36,62 € d'assurance. Le capital tombe alors à **146 497 €**, soit environ 6 400 € de moins (−4,2 %).",
        "Sur 25 ans à 3,45 %, le même salaire donne 175 722 € hors assurance et 167 321 € avec cette assurance.",
      ],
    },
    {
      titre: "Et si vous avez déjà un crédit en cours ?",
      paras: [
        "Les crédits déjà en cours se soustraient de la mensualité maximale : ils occupent une partie des 35 %. Attention à l'ordre du calcul : on prend 35 % du revenu, puis on retire les mensualités existantes, et non l'inverse.",
        "Exemple : 3 000 € net avec un crédit auto de 300 € par mois. La mensualité maximale est de 3 000 × 35 % − 300 = 750 €. Sur 20 ans à 3,35 %, cela donne 750 × 174,74 ≈ **131 054 €**, contre 183 476 € sans crédit auto : environ 52 400 € de moins. Si votre loyer continue après l'achat, il compte aussi, d'après Bercy, dans la capacité d'endettement.",
      ],
    },
    {
      titre: "Avec ou sans assurance : l'effet sur le tableau",
      paras: [
        "Voici les mêmes salaires avec une assurance à 0,30 % par an du capital emprunté, comprise dans les 35 %. Ce taux est une hypothèse : selon l'âge, la santé et le contrat, il peut être plus bas ou beaucoup plus haut.",
      ],
      tableau: {
        colonnes: ["Salaire net mensuel", "Capital sur 20 ans (3,35 %)", "Capital sur 25 ans (3,45 %)"],
        lignes: [
          ["1 500 €", "87 898 €", "100 393 €"],
          ["2 000 €", "117 198 €", "133 857 €"],
          ["2 500 €", "146 497 €", "167 321 €"],
          ["3 000 €", "175 797 €", "200 786 €"],
          ["3 500 €", "205 096 €", "234 250 €"],
          ["4 000 €", "234 395 €", "267 714 €"],
        ],
      },
      suite: [
        "L'écart avec le premier tableau est de 4 à 5 %. Il grandit avec le taux d'assurance et avec la durée.",
      ],
    },
    {
      titre: "Comment augmenter sa capacité d'emprunt ?",
      paras: [
        "Chaque levier agit sur un des éléments de la formule : la mensualité, le taux ou la durée. Les chiffres ci-dessous partent de l'exemple à 2 500 € net, hors assurance.",
      ],
      liste: [
        "**Solder un crédit en cours** : dans l'exemple à 3 000 € net, supprimer le crédit auto de 300 € ajoute environ 52 400 € de capacité.",
        "**Emprunter à deux** : deux revenus de 2 500 € et 2 000 € font 4 500 € net, soit 1 575 € de mensualité maximale et environ 275 200 € sur 20 ans.",
        "**Allonger la durée** : de 20 ans à 3,35 % à 25 ans à 3,45 %, la capacité passe de 152 897 € à 175 722 €, soit environ 15 % de plus. Le crédit coûte aussi plus d'intérêts.",
        "**Obtenir un meilleur taux** : à 2,35 % au lieu de 3,35 % sur 20 ans, la capacité passe de 152 897 € à environ 167 424 € (hypothèse chiffrée à titre d'illustration).",
        "**Comparer les assurances** : une assurance moins chère laisse plus de place au remboursement du crédit dans les 35 %.",
      ],
      suite: [
        "L'apport, lui, n'augmente pas le capital que la banque prête. Il s'ajoute au capital pour donner le budget total du bien. Les frais annexes à prévoir en plus du prix sont détaillés dans l'article sur les [frais de notaire](/frais-de-notaire-quel-pourcentage).",
      ],
      encadre:
        "Une banque peut déroger à la règle des 35 % pour une marge allant jusqu'à 20 % de ses nouveaux crédits chaque trimestre, d'après le HCSF. Mais rien ne l'y oblige : l'établissement reste libre d'accepter ou de refuser un crédit, même à 35 % sur 25 ans.",
    },
    {
      titre: "Ce que ce tableau ne dit pas",
      paras: [
        "La banque regarde aussi votre reste à vivre, c'est-à-dire ce qui vous reste chaque mois après vos charges, votre stabilité professionnelle, votre épargne et votre apport. Une capacité de 152 897 € sur le papier n'est donc pas une promesse de prêt.",
        "Pour un chiffre adapté à votre cas, testez votre projet dans le [calculateur de capacité d'emprunt](/calcul-capacite-emprunt), puis le [simulateur de prêt immobilier](/simulateur-pret-immobilier) pour voir la mensualité d'un montant précis. Le chiffre qui fait foi est celui de votre banque ou de votre courtier.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-capacite-emprunt",
    nom: "Calcul capacité d'emprunt",
    titre: "Calculez votre capacité d'emprunt",
    texte:
      "Indiquez vos revenus nets, vos charges, l'apport et la durée : le calculateur applique la règle des 35 %, convertit la mensualité en capital et compare les durées de 15, 20 et 25 ans.",
    bouton: "Ouvrir le calculateur de capacité d'emprunt",
  },
  faq: [
    {
      q: "Quelle capacité d'emprunt pour quel salaire ?",
      a: "Avec 35 % du salaire net en mensualité, on peut emprunter environ 61 200 € par tranche de 1 000 € de salaire net sur 20 ans à 3,35 %, hors assurance et sans autre crédit : 152 897 € pour 2 500 € net, 183 476 € pour 3 000 € net. La banque a le dernier mot.",
    },
    {
      q: "Comment est calculée la capacité d'emprunt ?",
      a: "On calcule d'abord la mensualité maximale, soit 35 % du revenu net moins les crédits en cours, assurance comprise. On la convertit ensuite en capital avec la formule des mensualités constantes : mensualité × (1 − (1 + i)^−n) / i, où i est le taux mensuel et n le nombre de mensualités.",
    },
    {
      q: "Comment estimer sa capacité d'emprunt ?",
      a: "Partez de votre revenu net mensuel, multipliez par 35 %, retirez vos crédits en cours, puis convertissez la mensualité en capital selon le taux et la durée. Un calculateur fait ces opérations pour vous. Faites ensuite confirmer le résultat par une banque ou un courtier.",
    },
    {
      q: "Quelle durée maximale pour un prêt immobilier ?",
      a: "La décision du HCSF fixe la maturité maximale à 25 ans, avec une tolérance de 2 ans de différé d'amortissement quand l'entrée en jouissance du bien est décalée par rapport à l'octroi du crédit.",
    },
    {
      q: "Peut-on dépasser 35 % d'endettement ?",
      a: "Les banques peuvent déroger à cette règle pour une marge allant jusqu'à 20 % de leurs nouveaux crédits immobiliers chaque trimestre. Ce n'est ni un droit ni la règle : la banque décide au cas par cas.",
    },
  ],
  sources: [
    {
      label: "Economie.gouv.fr (HCSF) : mesure relative à l'octroi de crédits immobiliers",
      url: "https://www.economie.gouv.fr/hcsf/mesures/mesure-relative-loctroi-de-credits-immobiliers",
    },
    {
      label: "Economie.gouv.fr : crédit immobilier, comment ça marche ?",
      url: "https://www.economie.gouv.fr/particuliers/gerer-mon-argent/emprunter-et-sassurer/credit-immobilier-comment-ca-marche",
    },
    {
      label: "Service-Public.fr : je veux obtenir un crédit immobilier",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F16123",
    },
    {
      label: "Banque de France : crédits aux particuliers, juin 2026",
      url: "https://www.banque-france.fr/fr/statistiques/credit/credits-aux-particuliers-2026-06",
    },
  ],
  datePublication: "2026-10-06",
  dateAffichee: "6 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
