import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Taux d'endettement : comment calculer ? Formule et seuil (2026)";
const DESCRIPTION =
  "Taux d'endettement = charges de crédit ÷ revenus × 100. La norme du HCSF impose aux banques 35 % maximum, assurance comprise. Formule, exemple chiffré, revenus retenus et dérogations.";

export const metadata: Metadata = {
  alternates: { canonical: "/taux-d-endettement-comment-calculer" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "taux d'endettement comment calculer, quel taux d'endettement est acceptable, c'est quoi le taux d'endettement, comment est calculé le taux d'endettement, taux d'endettement maximum, comment dépasser le taux d'endettement, taux d'endettement 35, HCSF",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/taux-d-endettement-comment-calculer",
  fil: "Taux d'endettement : comment calculer",
  emoji: "🏦",
  couleur: "from-blue-500 to-indigo-500",
  h1: "Taux d'endettement : comment calculer ?",
  chapo:
    "Cet article s'adresse à ceux qui préparent une demande de crédit, surtout immobilier, et veulent savoir comment la banque calcule leur taux d'endettement, quel seuil ne pas dépasser et ce qu'on peut faire quand on le dépasse.",
  reponse:
    "Le taux d'endettement, c'est **les charges de vos crédits divisées par vos revenus, multipliées par 100**. Pour un crédit immobilier, la décision du Haut Conseil de stabilité financière (HCSF) impose aux banques **35 % maximum**, assurance comprise. Exemple : 1 340 € de charges pour 4 000 € de revenus donnent 33,5 %, donc sous le seuil. Ce seuil s'adresse aux banques, pas à l'emprunteur, et elles peuvent y déroger dans une part limitée de leurs prêts.",
  sections: [
    {
      titre: "C'est quoi, le taux d'endettement, et comment se calcule-t-il ?",
      paras: [
        "Le taux d'endettement mesure la part de vos revenus qui part chaque mois dans le remboursement de vos crédits. Le HCSF, lui, parle de « taux d'effort » : le ratio de la charge d'emprunt sur le revenu. Dans le langage courant, les deux mots désignent le même calcul.",
        "La formule : **taux d'endettement = charges de crédit ÷ revenus × 100**. On peut la faire par mois ou par an, du moment que les charges et les revenus sont sur la même période.",
      ],
      visuel: {
        fichier: "taux-endettement-calcul-35-pourcent",
        alt: "Formule du taux d'endettement (charges de crédit ÷ revenus × 100) et exemple : 1 340 € de charges pour 4 000 € de revenus, soit 33,5 %, sous le seuil de 35 % du HCSF",
        legende:
          "La formule et l'exemple de cet article : 1 340 € de charges pour 4 000 € de revenus mensuels, soit 33,5 %, face au seuil de 35 % du HCSF.",
      },
    },
    {
      titre: "Quel taux d'endettement maximum ? La norme du HCSF",
      paras: [
        "Le HCSF est l'autorité chargée de surveiller la stabilité du système financier français. Après deux recommandations (décembre 2019 et janvier 2021), il a décidé de rendre contraignants ses critères : sa décision du 29 septembre 2021 s'applique depuis le 1er janvier 2022. Elle fixe deux critères que les banques doivent appliquer.",
      ],
      tableau: {
        colonnes: ["Critère", "Limite", "À savoir"],
        lignes: [
          ["Taux d'effort", "35 % maximum", "Assurance emprunteur comprise, tous les crédits en cours inclus"],
          ["Durée du crédit", "25 ans maximum", "Jusqu'à 27 ans avec un différé d'amortissement, par exemple pour un logement neuf ou des travaux importants"],
        ],
        texte: true,
      },
      suite: [
        "Attention à qui s'adresse cette règle. La décision s'applique aux établissements de crédit et aux sociétés de financement, pas à l'emprunteur : c'est la banque qui a l'obligation, et elle peut aussi refuser un dossier à 30 %. D'après le HCSF, d'autres critères que ceux de la décision entrent en compte dans l'octroi d'un crédit.",
        "Le chiffre de 33 %, souvent cité, n'est pas une norme officielle. La Finance pour tous, le site pédagogique des institutions financières publiques, écrit qu'avec un taux supérieur à 30 %, « ou plus récemment de 35 % », il est vraisemblable que la banque refusera.",
      ],
      encadre:
        "Cette norme porte sur les crédits immobiliers. Pour un crédit à la consommation ou un crédit auto, les sources officielles consultées ne donnent aucun seuil de ce type : chaque prêteur applique sa propre méthode.",
    },
    {
      titre: "Quels revenus et quelles charges entrent dans le calcul ?",
      paras: [
        "Pour les crédits immobiliers, la foire aux questions du HCSF précise la méthode. Elle n'a pas de portée normative, mais elle indique comment les banques doivent lire la décision.",
      ],
      liste: [
        "**Les charges** : toutes les charges de crédit de l'emprunteur et des co-emprunteurs comptent, quelle que soit la banque, y compris un crédit à la consommation accordé ailleurs. L'assurance emprunteur compte quand elle est une condition pour obtenir le prêt. Certains crédits relais sont exclus.",
        "**Les revenus** : le revenu net avant impôt, celui du foyer fiscal ou la somme des revenus des co-emprunteurs. Les revenus exceptionnels, qui ne sont pas stables et récurrents, sont retirés. Les contrats à durée déterminée comptent, mais la banque peut appliquer une décote prudente.",
        "**Les revenus locatifs** : pris en compte avec une décote appliquée par la banque pour refléter le risque locatif. Le HCSF ne donne pas de pourcentage : celui que l'on lit parfois (70 %) est une pratique de certaines banques, pas une règle officielle.",
        "**La durée** : le taux est regardé chaque année du prêt, et c'est le plus élevé qui compte. Les revenus sont ceux du jour de l'octroi, sans hypothèse d'augmentation.",
      ],
      suite: [
        "Dans la décision du HCSF, seules les charges d'emprunt entrent dans le taux. Le loyer n'y est pas cité. Bercy indique en revanche que la capacité d'endettement calculée par la banque inclut vos charges fixes, « comme le loyer », si vous restez locataire après l'achat. Elles regardent souvent aussi votre reste à vivre, mais ce critère n'est pas défini par le HCSF.",
      ],
    },
    {
      titre: "Exemple chiffré : un couple qui prépare un prêt immobilier",
      paras: [
        "Un couple gagne 2 400 € et 1 600 € nets par mois. Il rembourse déjà un crédit auto de 200 € par mois. Le prêt immobilier envisagé coûte 1 140 € par mois, assurance emprunteur comprise. Le calcul se retrouve dans le [calculateur de taux d'endettement](/calcul-taux-endettement).",
      ],
      etapes: [
        "**Revenus** : 2 400 + 1 600 = 4 000 € par mois.",
        "**Charges de crédit** : 1 140 + 200 = 1 340 € par mois.",
        "**Taux** : 1 340 ÷ 4 000 × 100 = 33,5 %.",
        "**Marge restante sous 35 %** : 4 000 × 35 % = 1 400 €, soit 60 € de mensualité de plus au maximum.",
      ],
      suite: [
        "Avec 33,5 %, le dossier est sous le seuil du HCSF. Avec une mensualité de 1 240 €, les charges passent à 1 440 € et le taux à 36 % : le prêt dépasse alors 35 % et ne peut être accordé que dans la marge de dérogation de la banque.",
        "Le calculateur du site affiche un reste à vivre de 2 660 € (4 000 - 1 340). Ses couleurs et son libellé « Élevé » démarrent à 33 %, un repère de prudence du site, plus strict que les 35 % du HCSF. Ses calculs de capacité utilisent aussi 33 %.",
      ],
      encadre:
        "Dans la FAQ du HCSF, un emprunteur avec 17 000 € de charges immobilières par an et 1 000 € de crédit conso, pour 50 000 € de revenus, est à 36 % les 5 premières années, puis à 34 %. Le prêt est non conforme à cause des 5 premières années.",
    },
    {
      titre: "Peut-on dépasser le taux d'endettement ?",
      paras: [
        "Oui, mais c'est la banque qui en décide, pas vous. D'après le HCSF, les établissements peuvent déroger aux critères pour une marge de flexibilité allant jusqu'à 20 % de leur production de nouveaux crédits immobiliers chaque trimestre. La décision du 29 juin 2023 en fixe la répartition.",
      ],
      tableau: {
        colonnes: ["Part de la marge de 20 %", "Règle"],
        lignes: [
          ["Au moins 70 %", "Réservée aux achats de résidence principale (soit 14 % de la production)"],
          ["Dont au moins 30 %", "Réservée aux primo-accédants (soit 6 % de la production), compris dans les 70 % ci-dessus"],
          ["Les 30 % restants", "Libres d'utilisation, soit 6 % de la production : investissement locatif, résidence secondaire…"],
        ],
        texte: true,
      },
      suite: [
        "Concrètement, il n'existe pas de règle pour « contourner » la norme : on peut seulement obtenir une dérogation si la banque estime le dossier solide et qu'il lui reste de la place dans sa marge. Un apport important, un reste à vivre confortable ou une baisse de vos autres crédits jouent en votre faveur, mais rien n'est garanti. Un primo-accédant est une personne qui n'a pas été propriétaire de sa résidence principale au cours des deux dernières années.",
        "Pour un prêt à une SCI, le HCSF indique qu'il n'est généralement pas possible de calculer un taux d'effort, et que ce prêt relève donc a priori des exceptions prévues par la marge de flexibilité.",
      ],
    },
    {
      titre: "Que faire si votre taux est trop haut ?",
      paras: [
        "Trois leviers existent : réduire les charges (solder un petit crédit, regrouper), augmenter les revenus pris en compte (un co-emprunteur), ou réduire la mensualité du projet en empruntant moins ou plus longtemps, dans la limite de 25 ans. Pour savoir combien vous pouvez emprunter selon votre salaire, lisez [cet article](/capacite-d-emprunt-quel-salaire). Pour comparer le coût de l'assurance, utilisez le [simulateur d'assurance emprunteur](/simulateur-assurance-emprunteur).",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-taux-endettement",
    nom: "Taux d'endettement",
    titre: "Calculez votre taux d'endettement",
    texte:
      "Indiquez vos revenus et vos charges mensuels : le calculateur donne votre taux d'endettement, votre reste à vivre et la mensualité qu'il vous reste avant d'atteindre son repère de 33 %.",
    bouton: "Ouvrir le calculateur de taux d'endettement",
  },
  faq: [
    {
      q: "Comment calculer son taux d'endettement ?",
      a: "On divise les charges de crédit par les revenus, puis on multiplie par 100. Par exemple, 1 340 € de charges pour 4 000 € de revenus donnent 33,5 %. Pour un crédit immobilier, la banque ajoute l'assurance emprunteur aux charges.",
    },
    {
      q: "Quel taux d'endettement est acceptable ?",
      a: "Pour un crédit immobilier, la décision du HCSF impose aux banques un taux d'effort de 35 % maximum, assurance comprise. Une banque peut refuser un dossier sous ce seuil, ou accepter un dossier au-dessus dans la limite de sa marge de dérogation.",
    },
    {
      q: "Peut-on avoir un taux d'endettement supérieur à 35 % ?",
      a: "Oui, si la banque utilise sa marge de flexibilité, qui va jusqu'à 20 % de sa production trimestrielle de nouveaux crédits immobiliers. Cette marge est réservée en priorité aux achats de résidence principale et aux primo-accédants.",
    },
    {
      q: "Quel taux d'endettement pour un crédit à la consommation ?",
      a: "La norme du HCSF porte sur les crédits immobiliers. Pour un crédit à la consommation, les sources officielles consultées ne fixent pas de seuil : le prêteur applique ses propres critères. Ce crédit compte en revanche dans le taux d'endettement d'un futur prêt immobilier.",
    },
    {
      q: "Quel taux d'endettement pour une SCI ?",
      a: "D'après le HCSF, il n'est généralement pas possible de calculer un taux d'effort pour un prêt accordé à une SCI. Ce prêt entre donc a priori dans les exceptions couvertes par la marge de flexibilité des banques.",
    },
    {
      q: "Qui fixe le taux d'endettement maximum ?",
      a: "Le Haut Conseil de stabilité financière, qui a décidé de rendre ses critères contraignants pour les banques depuis le 1er janvier 2022. La décision s'impose aux établissements de crédit, pas à l'emprunteur.",
    },
  ],
  sources: [
    {
      label: "HCSF (economie.gouv.fr) : mesure relative à l'octroi de crédits immobiliers",
      url: "https://www.economie.gouv.fr/hcsf/mesures/mesure-relative-loctroi-de-credits-immobiliers",
    },
    {
      label: "HCSF : foire aux questions sur les décisions relatives aux crédits immobiliers (janvier 2024)",
      url: "https://www.economie.gouv.fr/files/files/directions_services/hcsf/HCSF_FAQ_decisions_octroi_credits_immobiliers.pdf",
    },
    {
      label: "Banque de France : Haut Conseil de stabilité financière, une notoriété inespérée",
      url: "https://www.banque-france.fr/fr/interventions-gouverneur/haut-conseil-de-stabilite-financiere-une-notoriete-inesperee",
    },
    {
      label: "La Finance pour tous : le taux d'endettement",
      url: "https://www.lafinancepourtous.com/decryptages/finance-perso/banque-et-credit/taux-d-endettement",
    },
  ],
  datePublication: "2026-10-06",
  dateAffichee: "6 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
