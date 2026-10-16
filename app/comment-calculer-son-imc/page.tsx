import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer son IMC ? Formule, seuils et exemples";
const DESCRIPTION =
  "L'IMC se calcule en divisant le poids en kg par la taille en mètres au carré : 70 kg pour 1,70 m font 24,2. La formule pas à pas, les seuils de l'OMS et du CDC, un tableau et les limites de l'indice.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-son-imc" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "comment calculer son IMC, calcul IMC, formule IMC, calcul IMC femme, calcul IMC homme, calcul IMC enfant, IMC normal, indice de masse corporelle, seuils IMC, IMC 70 ans",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-son-imc",
  fil: "Comment calculer son IMC",
  emoji: "⚖️",
  couleur: "from-rose-500 to-pink-500",
  h1: "Comment calculer son IMC ?",
  chapo:
    "Cet article s'adresse à toute personne qui veut calculer son indice de masse corporelle à la main, comprendre le chiffre obtenu et savoir ce qu'il permet de dire. Il donne la formule, les seuils de l'Organisation mondiale de la santé et du CDC, un exemple pas à pas, un tableau et les cas où l'IMC doit être lu avec prudence : enfants, personnes très musclées, personnes âgées.",
  reponse:
    "L'IMC (indice de masse corporelle) se calcule en divisant le **poids en kilogrammes** par la **taille en mètres, élevée au carré**. Exemple : **70 kg** pour **1,70 m** font 70 ÷ (1,70 × 1,70) = 70 ÷ 2,89 = **24,2**. Chez l'adulte, un IMC **de 18,5 à moins de 25** correspond à un poids normal, **de 25 à moins de 30** à un surpoids, et **30 ou plus** à une obésité. En dessous de 18,5, on parle d'insuffisance pondérale.",
  sections: [
    {
      titre: "La formule de l'IMC, pas à pas",
      paras: [
        "L'OMS donne la formule : l'IMC est égal au poids en kilogrammes divisé par la taille en mètres carrés (kg/m²). Il suffit d'une calculatrice.",
      ],
      etapes: [
        "**Mesurez votre taille en mètres** : 1 m 70 s'écrit 1,70.",
        "**Élevez-la au carré**, c'est-à-dire multipliez-la par elle-même : 1,70 × 1,70 = 2,89.",
        "**Divisez votre poids en kilogrammes par ce nombre** : 70 ÷ 2,89 = 24,2.",
        "**Arrondissez à une décimale** et comparez aux seuils ci-dessous.",
      ],
      suite: [
        "Attention à l'unité : si vous avez votre taille en centimètres, divisez-la par 100 avant de l'élever au carré. Si votre poids est en livres, convertissez-le en kilogrammes d'abord. La formule marche de la même façon pour un homme et pour une femme.",
      ],
    },
    {
      titre: "Les seuils de l'IMC chez l'adulte",
      paras: [
        "Pour les adultes de 20 ans et plus, le CDC, l'agence de santé publique américaine, classe l'IMC en catégories, quels que soient l'âge, le sexe ou l'origine. L'OMS définit le surpoids à partir d'un IMC de 25 et l'obésité à partir de 30, et considère comme insuffisance pondérale un IMC inférieur à 18,5.",
      ],
      tableau: {
        colonnes: ["IMC (kg/m²)", "Catégorie"],
        lignes: [
          ["Moins de 18,5", "Insuffisance pondérale (maigreur)"],
          ["De 18,5 à moins de 25", "Poids normal"],
          ["De 25 à moins de 30", "Surpoids"],
          ["30 ou plus", "Obésité"],
          ["De 30 à moins de 35", "Obésité de classe 1"],
          ["De 35 à moins de 40", "Obésité de classe 2"],
          ["40 ou plus", "Obésité de classe 3 (obésité sévère)"],
        ],
        texte: true,
      },
      suite: [
        "Ces catégories valent pour l'adulte. Selon l'OMS, pour les enfants et les adolescents, les catégories varient avec l'âge et le sexe : on ne peut pas leur appliquer les seuils de l'adulte.",
      ],
    },
    {
      titre: "L'IMC d'une personne de 1,70 m selon son poids",
      paras: [
        "Pour une personne de 1,70 m (taille au carré : 2,89), voici l'IMC correspondant à cinq poids, et la catégorie des seuils ci-dessus.",
      ],
      tableau: {
        colonnes: ["Poids", "Calcul", "IMC", "Catégorie"],
        lignes: [
          ["50 kg", "50 ÷ 2,89", "17,3", "Insuffisance pondérale"],
          ["60 kg", "60 ÷ 2,89", "20,8", "Poids normal"],
          ["70 kg", "70 ÷ 2,89", "24,2", "Poids normal"],
          ["80 kg", "80 ÷ 2,89", "27,7", "Surpoids"],
          ["90 kg", "90 ÷ 2,89", "31,1", "Obésité de classe 1"],
        ],
      },
      suite: [
        "On peut aussi faire le calcul à l'envers pour connaître la fourchette de poids « normal » d'une taille : multipliez 18,5 puis 25 par la taille au carré. Pour 1,70 m, cela donne de 53,5 à 72,2 kg. Pour 1,60 m, de 47,4 à 64,0 kg ; pour 1,80 m, de 59,9 à 81,0 kg.",
      ],
      visuel: {
        fichier: "imc-1m70-selon-le-poids-categories",
        alt: "IMC d'une personne de 1,70 m selon son poids avec les seuils de l'OMS et du CDC : 50 kg donnent 17,3 soit insuffisance pondérale ; 60 kg donnent 20,8 et 70 kg donnent 24,2 soit poids normal ; 80 kg donnent 27,7 soit surpoids ; 90 kg donnent 31,1 soit obésité",
        legende:
          "IMC = poids ÷ taille² ; seuils à 18,5, 25 et 30 (OMS, CDC). Le calcul est fait pour une taille de 1,70 m.",
      },
    },
    {
      titre: "IMC pour une femme, un homme, une personne âgée",
      paras: [
        "La formule est la même pour tous. Le CDC précise que, pour les adultes de 20 ans et plus, les catégories reposent sur l'IMC seul, quels que soient l'âge, le sexe ou l'origine : un homme et une femme de 70 ans sont donc classés avec les mêmes seuils que des adultes plus jeunes.",
        "Cela ne veut pas dire que le chiffre se lit de la même façon à tout âge. Le CDC présente l'IMC comme une mesure de dépistage, à considérer avec d'autres éléments pour juger la santé d'une personne. Pour une personne âgée, c'est au médecin d'interpréter l'IMC avec son état de santé, ses traitements et l'évolution de son poids.",
      ],
    },
    {
      titre: "Ce que l'IMC ne dit pas",
      paras: [
        "L'OMS décrit l'IMC comme un « marqueur de substitution de l'adiposité » : il estime l'excès de graisse sans le mesurer. Elle ajoute que d'autres valeurs, comme le tour de taille, peuvent aider à poser le diagnostic d'obésité.",
      ],
      liste: [
        "**Il ne distingue pas la graisse du muscle** : le calcul ne regarde que le poids total. Une personne très musclée peut avoir un IMC élevé sans excès de graisse.",
        "**Il ne dit pas où se trouve la graisse** : le tour de taille complète l'information.",
        "**Il n'est pas un diagnostic** : le CDC en fait une mesure de dépistage. Un IMC hors de la zone normale justifie d'en parler à un médecin, pas de tirer une conclusion seul.",
        "**Il ne s'applique pas tel quel aux enfants** : on compare l'IMC de l'enfant à des courbes de croissance selon l'âge et le sexe.",
      ],
    },
    {
      titre: "Que faire du résultat ?",
      paras: [
        "Si votre IMC est dans la zone normale, il n'y a rien à corriger. S'il est en dessous de 18,5 ou à partir de 25, ce n'est pas une alerte en soi mais un signal : parlez-en à votre médecin, qui tiendra compte de votre âge, de votre tour de taille et de votre mode de vie.",
        "Pour passer de l'IMC au poids, consultez l'article [quel est mon poids idéal](/quel-est-mon-poids-ideal), qui donne la fourchette de poids selon la taille. Pour estimer vos besoins en calories, utilisez le [calculateur de calories](/calcul-calories).",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-imc",
    nom: "Calcul IMC",
    titre: "Calculez votre IMC",
    texte:
      "Indiquez votre poids et votre taille : le calculateur donne votre IMC, votre catégorie et la fourchette de poids correspondant à une corpulence normale pour votre taille.",
    bouton: "Ouvrir le calculateur d'IMC",
  },
  faq: [
    {
      q: "Comment calculer son IMC ?",
      a: "Divisez votre poids en kilogrammes par votre taille en mètres élevée au carré. Exemple : 70 kg et 1,70 m font 70 ÷ 2,89 = 24,2.",
    },
    {
      q: "Quel est un IMC normal ?",
      a: "Chez l'adulte, un IMC de 18,5 à moins de 25 correspond à un poids normal d'après le CDC. L'OMS définit le surpoids à partir de 25 et l'obésité à partir de 30.",
    },
    {
      q: "Comment calculer l'IMC d'une femme ?",
      a: "Avec la même formule que pour un homme : poids en kg divisé par la taille en mètres au carré. Les catégories du CDC pour les adultes ne dépendent pas du sexe.",
    },
    {
      q: "Comment calculer l'IMC à 70 ans ?",
      a: "La formule est identique. Le CDC applique les mêmes catégories à tous les adultes de 20 ans et plus, mais l'IMC reste une mesure de dépistage : un médecin l'interprète avec l'état de santé de la personne.",
    },
    {
      q: "Comment calculer l'IMC d'un enfant ?",
      a: "Le calcul est le même (poids ÷ taille²), mais l'interprétation diffère : l'OMS compare l'IMC de l'enfant à une norme de croissance selon l'âge. Les seuils de l'adulte ne s'appliquent pas, et c'est le médecin qui lit les courbes.",
    },
    {
      q: "Quel IMC correspond à l'obésité ?",
      a: "L'OMS parle d'obésité à partir d'un IMC de 30. Le CDC distingue trois classes : de 30 à moins de 35, de 35 à moins de 40, et 40 ou plus (obésité sévère).",
    },
    {
      q: "L'IMC est-il fiable ?",
      a: "C'est un repère utile mais imparfait. L'OMS le décrit comme un marqueur de substitution de l'adiposité et cite le tour de taille comme valeur complémentaire. Le CDC en fait une mesure de dépistage, pas un diagnostic.",
    },
  ],
  sources: [
    {
      label: "OMS : obésité et surpoids (formule, définitions, enfants)",
      url: "https://www.who.int/fr/news-room/fact-sheets/detail/obesity-and-overweight",
    },
    {
      label: "CDC : catégories d'IMC pour les adultes (en anglais)",
      url: "https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html",
    },
    {
      label: "OMS : indice de masse corporelle, insuffisance pondérale à moins de 18,5 (en anglais)",
      url: "https://www.who.int/data/gho/data/themes/topics/topic-details/GHO/body-mass-index",
    },
  ],
  datePublication: "2026-10-16",
  dateAffichee: "16 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
