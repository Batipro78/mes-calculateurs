import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Quel est mon poids idéal ? Fourchette selon la taille";
const DESCRIPTION =
  "Il n'y a pas un poids idéal unique mais une fourchette : pour 1,70 m, de 53,5 à 72 kg (IMC de 18,5 à moins de 25). Le tableau par taille, les formules de Lorentz, Devine et Creff et leurs limites.";

export const metadata: Metadata = {
  alternates: { canonical: "/quel-est-mon-poids-ideal" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "quel est mon poids idéal, poids idéal selon la taille, poids idéal femme, poids idéal homme, poids idéal selon l'âge, calcul poids idéal, formule de Lorentz, poids idéal 1m60, poids idéal 1m70",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/quel-est-mon-poids-ideal",
  fil: "Quel est mon poids idéal",
  emoji: "⚖️",
  couleur: "from-violet-500 to-purple-600",
  h1: "Quel est mon poids idéal ?",
  chapo:
    "Cet article s'adresse aux adultes qui se demandent quel poids correspond à leur taille. Il explique pourquoi on parle plutôt d'une fourchette que d'un chiffre unique, donne un tableau selon la taille, présente les formules de Lorentz, de Devine et de Creff utilisées par notre calculateur, et rappelle ce que ces repères ne disent pas.",
  reponse:
    "Il n'existe pas un poids idéal unique, mais une **fourchette de poids** qui correspond à un indice de masse corporelle (IMC) de **18,5 à moins de 25**, la catégorie « poids normal » de l'OMS et du CDC. Pour **1,70 m**, cela fait de **53,5 à 72 kg**. La formule de Lorentz donne un chiffre précis : **65 kg pour un homme** et **62 kg pour une femme** de 1,70 m. Ces repères ne remplacent pas l'avis d'un médecin.",
  sections: [
    {
      titre: "Une fourchette plutôt qu'un chiffre",
      paras: [
        "L'IMC est le poids en kilogrammes divisé par le carré de la taille en mètres. Le CDC, l'agence de santé publique américaine, classe les adultes de 20 ans et plus en catégories : en dessous de 18,5, insuffisance pondérale ; de 18,5 à moins de 25, poids normal ; de 25 à moins de 30, surpoids ; à partir de 30, obésité. L'OMS retient les mêmes seuils de 25 et 30 pour le surpoids et l'obésité.",
        "On obtient donc la fourchette de poids qui correspond à votre taille en multipliant 18,5 puis 25 par votre taille au carré. Notre calculateur de poids idéal utilise 24,9 comme borne haute, pour rester strictement sous le seuil de 25 : l'écart est inférieur à 0,4 kg pour les tailles du tableau.",
        "Pourquoi une fourchette ? Parce que deux personnes de même taille et de même poids n'ont pas la même corpulence. L'OMS précise que l'IMC est « un marqueur de substitution de l'adiposité » et que d'autres valeurs, comme le tour de taille, peuvent aider à poser le diagnostic. Le CDC le présente comme une mesure de dépistage, à considérer avec d'autres éléments pour juger la santé d'une personne.",
      ],
    },
    {
      titre: "Le poids selon la taille : la fourchette et la formule de Lorentz",
      paras: [
        "Voici, pour des tailles courantes d'adulte, la fourchette de poids correspondant à un IMC de 18,5 à 24,9, et le poids donné par la formule de Lorentz pour un homme et pour une femme.",
      ],
      tableau: {
        colonnes: ["Taille", "Fourchette (IMC 18,5 à 24,9)", "Lorentz homme", "Lorentz femme"],
        lignes: [
          ["1,55 m", "44,4 à 59,8 kg", "53,8 kg", "53,0 kg"],
          ["1,60 m", "47,4 à 63,7 kg", "57,5 kg", "56,0 kg"],
          ["1,65 m", "50,4 à 67,8 kg", "61,3 kg", "59,0 kg"],
          ["1,70 m", "53,5 à 72,0 kg", "65,0 kg", "62,0 kg"],
          ["1,75 m", "56,7 à 76,3 kg", "68,8 kg", "65,0 kg"],
          ["1,80 m", "59,9 à 80,7 kg", "72,5 kg", "68,0 kg"],
          ["1,85 m", "63,3 à 85,2 kg", "76,3 kg", "71,0 kg"],
          ["1,90 m", "66,8 à 89,9 kg", "80,0 kg", "74,0 kg"],
        ],
      },
      suite: [
        "La fourchette est large : environ 18 kg d'écart pour 1,70 m. Le chiffre de Lorentz tombe à l'intérieur pour toutes les tailles du tableau. Cette formule ne dépend que de la taille et du sexe, ce qui explique qu'elle ne puisse pas tenir compte de la morphologie, de la musculature ni de l'âge.",
      ],
      visuel: {
        fichier: "poids-ideal-fourchette-selon-la-taille",
        alt: "Fourchette de poids correspondant à un indice de masse corporelle de 18,5 à 24,9 selon la taille : 1,60 m de 47,4 à 63,7 kg ; 1,70 m de 53,5 à 72,0 kg ; 1,80 m de 59,9 à 80,7 kg ; 1,90 m de 66,8 à 89,9 kg, avec le poids de la formule de Lorentz pour un homme et pour une femme",
        legende:
          "Fourchette = IMC de 18,5 à 24,9 × taille au carré (catégorie « poids normal », CDC et OMS) ; points = formule de Lorentz, comme dans notre calculateur.",
      },
    },
    {
      titre: "Les formules de Lorentz, de Devine et de Creff",
      paras: [
        "Notre calculateur de poids idéal affiche trois formules et leur moyenne. Elles donnent des résultats proches mais pas identiques, car elles ne mesurent pas la même chose.",
      ],
      liste: [
        "**Lorentz** : taille en cm − 100 − (taille − 150) ÷ 4 pour un homme, et taille − 100 − (taille − 150) ÷ 2,5 pour une femme. Elle ne dépend que de la taille et du sexe.",
        "**Devine** : 50 + 2,3 × (taille en pouces − 60) pour un homme, 45,5 + 2,3 × (taille en pouces − 60) pour une femme. Un pouce vaut 2,54 cm.",
        "**Creff** : (taille en cm − 100 + âge ÷ 10) × 0,9, multiplié par 0,9 pour une morphologie fine ou par 1,1 pour une morphologie large. C'est la seule des trois qui tient compte de l'âge.",
      ],
      suite: [
        "Aucune de ces formules n'est une norme de santé publique : l'OMS et le CDC raisonnent en catégories d'IMC. Elles donnent un ordre de grandeur, et leur moyenne lisse leurs écarts.",
      ],
    },
    {
      titre: "Exemple chiffré : 1,65 m et 60 kg",
      paras: [
        "Prenons une femme de 1,65 m qui pèse 60 kg et se demande si son poids est « idéal ».",
      ],
      etapes: [
        "**IMC** : 60 ÷ (1,65 × 1,65) = 60 ÷ 2,7225 = 22,0.",
        "**Catégorie** : 22,0 est compris entre 18,5 et 25, donc dans la catégorie « poids normal ».",
        "**Fourchette de poids pour 1,65 m** : de 50,4 à 67,8 kg. Avec 60 kg, elle se situe au milieu.",
        "**Formule de Lorentz** : 165 − 100 − (165 − 150) ÷ 2,5 = 59,0 kg, soit 1 kg de moins que son poids.",
      ],
      suite: [
        "Conclusion : son poids est bien dans la fourchette et très proche du chiffre de Lorentz. L'écart de 1 kg avec la formule n'a aucune signification médicale : c'est la fourchette qui compte.",
      ],
      encadre:
        "Calculez votre fourchette et les trois formules avec le [calculateur de poids idéal](/calcul-poids-ideal), puis votre indice avec le [calculateur d'IMC](/calcul-imc). Le détail du calcul de l'IMC est dans l'article [comment calculer son IMC](/comment-calculer-son-imc).",
    },
    {
      titre: "Poids idéal selon l'âge et la morphologie",
      paras: [
        "Parmi les trois formules, seule celle de Creff intègre l'âge. Exemple pour 1,70 m à 40 ans : (170 − 100 + 4) × 0,9 = 66,6 kg pour une morphologie normale, **59,9 kg** pour une morphologie fine et **73,3 kg** pour une morphologie large. Le même calcul à 60 ans donne 68,4 kg en morphologie normale : l'âge ajoute un peu de poids à la cible, mais l'effet reste modeste.",
        "Pour les enfants et les adolescents, ces formules d'adulte ne s'appliquent pas. L'OMS explique que, pour l'enfant de 5 à 19 ans, on compare l'IMC à une norme de croissance de référence selon l'âge. Pour un enfant, c'est le médecin ou le pédiatre qui lit les courbes de croissance.",
      ],
    },
    {
      titre: "Ce qu'un poids idéal ne dit pas",
      paras: [
        "Un poids dans la fourchette ne garantit pas une bonne santé, et un poids hors fourchette n'est pas forcément un problème. Le CDC rappelle que l'IMC est un outil de dépistage. L'OMS cite le tour de taille comme valeur complémentaire. Une personne très musclée peut avoir un IMC élevé sans excès de graisse, et l'inverse est possible.",
        "Si votre poids est hors fourchette, ou si vous voulez perdre ou prendre du poids, parlez-en à votre médecin : c'est lui qui interprète votre IMC avec votre âge, votre mode de vie et votre état de santé. Évitez de viser un chiffre précis donné par une formule.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-poids-ideal",
    nom: "Poids idéal",
    titre: "Calculez votre poids idéal",
    texte:
      "Indiquez votre taille, votre âge, votre sexe et votre morphologie : le calculateur donne les poids des formules de Lorentz, de Devine et de Creff, leur moyenne, le poids pour un IMC de 22 et la fourchette de 18,5 à 24,9.",
    bouton: "Ouvrir le calculateur de poids idéal",
  },
  faq: [
    {
      q: "Quel est mon poids idéal selon ma taille ?",
      a: "Il n'y a pas un chiffre unique mais une fourchette : de 18,5 à moins de 25 d'IMC. Pour 1,70 m, de 53,5 à 72 kg ; pour 1,60 m, de 47,4 à 63,7 kg ; pour 1,80 m, de 59,9 à 80,7 kg.",
    },
    {
      q: "Quel est le poids idéal pour une femme de 1,60 m ?",
      a: "La fourchette d'IMC de 18,5 à 24,9 donne de 47,4 à 63,7 kg. La formule de Lorentz donne 56 kg pour une femme de 1,60 m.",
    },
    {
      q: "Quel est le poids idéal pour un homme de 1,75 m ?",
      a: "La fourchette d'IMC de 18,5 à 24,9 donne de 56,7 à 76,3 kg. La formule de Lorentz donne 68,8 kg pour un homme de 1,75 m.",
    },
    {
      q: "Le poids idéal change-t-il avec l'âge ?",
      a: "Selon la formule de Creff, un peu : à 1,70 m, la cible passe de 66,6 kg à 40 ans à 68,4 kg à 60 ans en morphologie normale. Les catégories d'IMC du CDC valent pour tous les adultes de 20 ans et plus, quel que soit l'âge.",
    },
    {
      q: "Quelle formule choisir : Lorentz, Devine ou Creff ?",
      a: "Aucune n'est une norme de santé. Lorentz ne dépend que de la taille et du sexe, Devine utilise la taille en pouces, Creff ajoute l'âge et la morphologie. Notre calculateur affiche les trois et leur moyenne : regardez surtout la fourchette d'IMC.",
    },
    {
      q: "Quelle est la différence entre poids idéal et IMC ?",
      a: "L'IMC est le poids divisé par la taille au carré et sert à classer la corpulence. Le poids idéal est le poids qui correspond à un bon IMC pour votre taille. Les deux reposent sur le même principe, mais la fourchette d'IMC est plus large que les chiffres des formules.",
    },
    {
      q: "Un poids dans la fourchette signifie-t-il que je suis en bonne santé ?",
      a: "Pas forcément. L'IMC est un outil de dépistage, qui ne tient compte ni de la masse musculaire ni de la répartition de la graisse. Le tour de taille peut compléter, et c'est le médecin qui juge de votre état de santé.",
    },
  ],
  sources: [
    {
      label: "CDC : catégories d'IMC pour les adultes (en anglais)",
      url: "https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html",
    },
    {
      label: "OMS : obésité et surpoids (définitions, IMC, tour de taille)",
      url: "https://www.who.int/fr/news-room/fact-sheets/detail/obesity-and-overweight",
    },
  ],
  datePublication: "2026-10-16",
  dateAffichee: "16 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
