import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer le salaire d'un alternant ?";
const DESCRIPTION =
  "Le salaire d'un apprenti ou d'un alternant en contrat de professionnalisation dépend de son âge et de l'année de contrat. Pourcentages du SMIC 2026, exemples chiffrés, brut, net estimé et changement de tranche d'âge.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-le-salaire-d-un-alternant" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "salaire alternant, salaire apprenti 2026, calcul salaire alternant, combien gagne un apprenti, contrat d'apprentissage, contrat de professionnalisation, pourcentage du SMIC",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
    images: [{ url: "/images/salaire-alternant-atelier.webp", width: 1200, height: 630 }],
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-le-salaire-d-un-alternant",
  fil: "Salaire alternant",
  emoji: "🎓",
  couleur: "from-indigo-500 to-purple-500",
  h1: "Comment calculer le salaire d'un alternant ?",
  chapo:
    "Apprenti ou en contrat de professionnalisation : votre salaire minimum est un pourcentage du SMIC, qui dépend de votre âge et, pour l'apprentissage, de l'année de contrat. Voici comment le calculer, avec des exemples chiffrés et la méthode du calculateur pour le net.",
  reponse:
    "**Salaire brut minimum = pourcentage du SMIC × 1 867,02 €.** Le SMIC est de 1 867,02 € brut par mois pour 35 heures depuis le 1er juin 2026. Un apprenti de 17 ans en première année touche au minimum 27 % de cette somme, soit 504,09 € brut. Ce sont des minimums : une convention collective ou l'employeur peuvent prévoir plus.",
  sections: [
    {
      titre: "Le principe : un pourcentage du SMIC",
      paras: [
        "Depuis le 1er juin 2026 (arrêté du 22 mai 2026), le SMIC est de 12,31 € brut de l'heure, soit 1 867,02 € brut par mois pour 35 heures. Il valait 1 823,03 € brut par mois au 1er janvier 2026.",
        "Le salaire d'un apprenti se calcule en appliquant un pourcentage à ce SMIC. Ce pourcentage dépend de deux choses : **votre âge** et **l'année de votre contrat** (première, deuxième ou troisième année). Voici les minimums, en brut par mois.",
      ],
      tableau: {
        colonnes: ["Âge", "1re année", "2e année", "3e année"],
        lignes: [
          ["16-17 ans (le calculateur affiche « Moins de 18 ans »)", "27 % (504,09 €)", "39 % (728,14 €)", "55 % (1 026,86 €)"],
          ["18-20 ans", "43 % (802,82 €)", "51 % (952,18 €)", "67 % (1 250,90 €)"],
          ["21-25 ans", "53 % (989,52 €)", "61 % (1 138,88 €)", "78 % (1 456,27 €)"],
          ["26 ans et plus", "100 % (1 867,02 €)", "100 % (1 867,02 €)", "100 % (1 867,02 €)"],
        ],
      },
      suite: [
        "Pour les 21-25 ans, c'est le même pourcentage du salaire minimum conventionnel de l'emploi qui s'applique s'il est plus élevé. À partir de 26 ans, c'est 100 % du SMIC, ou le salaire minimum conventionnel s'il est plus élevé.",
      ],
      visuel: {
        fichier: "salaire-alternant-atelier",
        alt: "Les mains d'un jeune apprenti qui rabote une planche sur un établi de menuiserie, avec des copeaux de bois, des outils accrochés au mur et la lumière d'une verrière.",
        legende:
          "En apprentissage comme en menuiserie, le salaire se construit par étapes : il augmente avec l'âge et l'année de contrat.",
      },
    },
    {
      titre: "Exemple 1 : 17 ans en première année",
      paras: [
        "Un apprenti de 17 ans signe son premier contrat. Il est dans la tranche des 16-17 ans, première année : 27 % du SMIC.",
      ],
      etapes: [
        "On prend le SMIC mensuel : 1 867,02 €.",
        "On applique le pourcentage : 1 867,02 × 27 ÷ 100 = **504,09 € brut** par mois.",
        "On compare au seuil d'exonération, 50 % du SMIC, soit 933,51 € : 504,09 € est en dessous. Le net est donc égal au brut.",
      ],
      suite: [
        "Sur l'année, cela fait 12 × 504,09 = 6 049,08 € brut. Le calculateur, qui arrondit au centime le plus proche, affiche 504,10 € par mois et 6 049 € sur l'année.",
      ],
    },
    {
      titre: "Exemple 2 : 19 ans en première année",
      paras: [
        "À 19 ans, on est dans la tranche des 18-20 ans. En première année, le pourcentage est de 43 %.",
      ],
      etapes: [
        "On applique le pourcentage : 1 867,02 × 43 ÷ 100 = **802,82 € brut** par mois.",
        "On compare à 933,51 € : le salaire est en dessous du seuil. Le net est égal au brut, soit 802,82 €.",
      ],
      suite: [
        "Entre 17 ans et 19 ans, pour une même première année, le salaire minimum passe de 504,09 € à 802,82 € : l'âge joue autant que l'année de contrat.",
      ],
    },
    {
      titre: "Exemple 3 : 22 ans en deuxième année, du brut au net",
      paras: [
        "À 22 ans, on est dans la tranche des 21-25 ans. En deuxième année, le pourcentage est de 61 %.",
        "Pour un contrat commencé depuis le 1er mars 2025, le salaire est exonéré de cotisations salariales et de CSG et CRDS dans la limite de 50 % du SMIC, soit 933,51 €. La part au-dessus de ce seuil y est soumise. Le salaire est aussi exonéré d'impôt sur le revenu dans la limite du montant annuel du SMIC.",
        "Le calculateur estime le net avec une règle simple : il retire **22 % de la part qui dépasse 933,51 €**, et rien sur la part en dessous. C'est une estimation, pas un bulletin de paie.",
      ],
      etapes: [
        "Brut : 1 867,02 × 61 ÷ 100 = **1 138,88 €**.",
        "Part au-dessus du seuil : 1 138,88 − 933,51 = 205,37 €.",
        "Cotisations estimées : 205,37 × 22 ÷ 100 = 45,18 €.",
        "Net estimé : 1 138,88 − 45,18 = **1 093,70 €** par mois.",
      ],
      suite: [
        "Sur 12 mois, le calculateur affiche un brut annuel de 13 667 € et un net annuel estimé de 13 124 €.",
      ],
    },
    {
      titre: "Exemple 4 : un anniversaire en cours de contrat",
      paras: [
        "Un apprenti de 20 ans est en deuxième année de contrat. Il fête ses 21 ans le 10 mai. Quand son salaire change-t-il ? Le passage à la tranche d'âge supérieure prend effet **le 1er jour du mois qui suit l'anniversaire**. Le salaire de mai reste donc celui de la tranche des 18-20 ans.",
      ],
      etapes: [
        "En mai, il a encore le barème des 18-20 ans en deuxième année : 51 %, soit 1 867,02 × 51 ÷ 100 = **952,18 € brut**.",
        "Le 1er juin, il passe dans la tranche des 21-25 ans : 61 %, soit **1 138,88 € brut**.",
      ],
      suite: [
        "L'écart est de 1 138,88 − 952,18 = 186,70 € brut par mois. L'exemple officiel de service-public suit la même règle : un apprenti de première année qui a 21 ans en mars passe de 43 % à 53 % le 1er avril.",
      ],
    },
    {
      titre: "Résumé des exemples",
      tableau: {
        colonnes: ["Situation", "Pourcentage", "Brut mensuel", "Net estimé"],
        lignes: [
          ["17 ans, 1re année", "27 %", "504,09 €", "504,09 €"],
          ["19 ans, 1re année", "43 %", "802,82 €", "802,82 €"],
          ["22 ans, 2e année", "61 %", "1 138,88 €", "1 093,70 €"],
          ["20 ans, 2e année (mai)", "51 %", "952,18 €", "948,07 €"],
          ["21 ans, 2e année (juin)", "61 %", "1 138,88 €", "1 093,70 €"],
        ],
      },
      suite: [
        "Pour la ligne de mai, la part au-dessus du seuil est de 952,18 − 933,51 = 18,67 €, soit 4,11 € de cotisations estimées avec la règle du calculateur.",
      ],
    },
    {
      titre: "Et en contrat de professionnalisation ?",
      paras: [
        "Le contrat de professionnalisation a ses propres minimums. Ils dépendent de l'âge et du niveau de diplôme : le taux le plus élevé s'applique avec au moins un bac professionnel ou un titre ou diplôme de même niveau.",
      ],
      tableau: {
        colonnes: ["Âge", "Sans bac pro", "Avec bac pro ou équivalent"],
        lignes: [
          ["Moins de 21 ans", "55 % (1 026,86 €)", "65 % (1 213,57 €)"],
          ["21-25 ans", "70 % (1 306,92 €)", "80 % (1 493,62 €)"],
        ],
      },
      suite: [
        "À partir de 26 ans, le salaire est d'au moins le SMIC (1 867,02 €) et d'au moins 85 % du salaire minimum conventionnel. Le calculateur retient le SMIC pour cette tranche. Il n'applique pas l'exonération des apprentis à ce contrat : il retire 22 % sur la totalité du salaire brut.",
        "Pour savoir ce que le salaire brut donne en net dans les autres situations, vous pouvez aussi utiliser le [convertisseur brut net](/salaire-brut-net). Si vous cherchez la rémunération d'un stagiaire, c'est un autre calcul : voyez la [gratification de stage](/calcul-gratification-stage).",
      ],
    },
    {
      titre: "Comment utiliser le simulateur de salaire alternant",
      paras: [
        "Choisissez d'abord le **type de contrat** : apprentissage ou professionnalisation. Saisissez ensuite votre **âge** dans le champ prévu, ou cliquez sur l'un des âges proposés sous le champ. Le simulateur indique la tranche d'âge retenue.",
        "En apprentissage, choisissez l'**année de contrat** (1re, 2e ou 3e année). En professionnalisation, choisissez le **niveau de qualification** : inférieur au bac, ou bac pro ou plus. Le tableau de la grille met en évidence votre ligne et votre case.",
        "Le simulateur affiche le salaire brut mensuel, le pourcentage du SMIC, le net estimé, le brut et le net annuels, et le montant des cotisations quand il y en a. En apprentissage, il montre aussi le brut des trois années pour votre âge. Il ne gère qu'un âge entier : pour un anniversaire en cours de contrat, saisissez 20 ans pour le salaire de mai, 21 ans pour celui de juin, en tenant compte de la règle du 1er jour du mois suivant.",
      ],
    },
    {
      titre: "Pièges pratiques",
      liste: [
        "**Les montants sont des minimums.** Une convention collective ou l'employeur peuvent prévoir un salaire plus élevé. Le contrat de travail et la fiche de paie font foi.",
        "**Le passage de tranche n'est pas le jour de l'anniversaire.** Il a lieu le 1er du mois suivant, comme dans l'exemple 4.",
        "**Le net est une estimation.** Le calculateur applique une seule règle simplifiée. Votre bulletin de paie peut différer.",
        "**Les contrats anciens suivent d'autres règles.** Pour un contrat commencé au plus tard le 28 février 2025, les exonérations ne sont pas les mêmes. Cet article ne les détaille pas.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Prendre le SMIC de janvier 2026.** Depuis le 1er juin 2026, la base est de 1 867,02 € et non de 1 823,03 €.",
        "**Confondre l'année de contrat et l'année d'études.** Le pourcentage dépend de l'année du contrat d'apprentissage.",
        "**Mélanger apprentissage et professionnalisation.** Les deux contrats n'ont ni les mêmes pourcentages, ni les mêmes exonérations.",
        "**Lire le brut comme ce qui arrive sur le compte.** Au-dessus de 933,51 € par mois, une partie du brut est retirée.",
      ],
      encadre:
        "Les montants de cet article sont les minimums légaux d'après le SMIC en vigueur depuis le 1er juin 2026. Pour votre situation exacte, appuyez-vous sur votre contrat et sur votre convention collective.",
    },
  ],
  calculateur: {
    href: "/simulateur-salaire-alternant",
    nom: "Salaire alternant",
    titre: "Estimez votre salaire d'alternant",
    texte:
      "Choisissez le contrat, saisissez l'âge et l'année de contrat : le simulateur affiche le brut, le net estimé et la grille complète en pourcentage du SMIC.",
    bouton: "Ouvrir le simulateur de salaire alternant",
  },
  faq: [
    {
      q: "Combien gagne un apprenti en 2026 ?",
      a: "Cela dépend de l'âge et de l'année de contrat. Depuis le 1er juin 2026, le minimum va de 27 % du SMIC, soit 504,09 € brut par mois, pour un apprenti de 16-17 ans en première année, à 100 % du SMIC, soit 1 867,02 €, à partir de 26 ans.",
    },
    {
      q: "Comment calcule-t-on le salaire d'un alternant ?",
      a: "On multiplie le SMIC mensuel brut, 1 867,02 € depuis le 1er juin 2026, par le pourcentage qui correspond à l'âge et à l'année de contrat. Par exemple, 1 867,02 × 43 ÷ 100 = 802,82 € brut pour un apprenti de 19 ans en première année.",
    },
    {
      q: "Quand le salaire change-t-il après un anniversaire ?",
      a: "Le passage à la tranche d'âge supérieure prend effet le 1er jour du mois qui suit l'anniversaire. Un apprenti qui a 21 ans le 10 mai change de tranche le 1er juin.",
    },
    {
      q: "Un apprenti paie-t-il des cotisations ?",
      a: "Pour un contrat commencé depuis le 1er mars 2025, le salaire est exonéré de cotisations salariales et de CSG et CRDS dans la limite de 50 % du SMIC, soit 933,51 €. La part au-dessus y est soumise.",
    },
    {
      q: "Quel est le salaire en contrat de professionnalisation ?",
      a: "Avant 21 ans, c'est 55 % du SMIC, ou 65 % avec au moins un bac professionnel ou un diplôme de même niveau. De 21 à 25 ans, c'est 70 %, ou 80 % avec le même niveau. À partir de 26 ans, c'est au moins le SMIC.",
    },
  ],
  sources: [
    {
      label: "Service-public.fr - Rémunération d'un apprenti",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2918",
    },
    {
      label: "Service-public.fr - Smic",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2300",
    },
    {
      label: "Service-public.fr - Contrat de professionnalisation",
      url: "https://entreprendre.service-public.gouv.fr/vosdroits/F15478",
    },
  ],
  datePublication: "2026-11-04",
  dateAffichee: "4 novembre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
