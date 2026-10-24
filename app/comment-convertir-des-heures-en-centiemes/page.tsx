import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment convertir des heures en centièmes ?";
const DESCRIPTION =
  "Pour convertir des minutes en centièmes d'heure, divisez par 60. Pour convertir des centièmes en minutes, multipliez la partie décimale par 60. Tableau, exemples et pièges.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-convertir-des-heures-en-centiemes" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "convertir heures en centièmes, heures centièmes, centièmes en minutes, 7,75 heures en minutes, conversion heures décimales",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-convertir-des-heures-en-centiemes",
  fil: "Convertir des heures en centièmes",
  emoji: "⏱️",
  couleur: "from-amber-500 to-orange-600",
  h1: "Comment convertir des heures en centièmes ?",
  chapo:
    "Les heures en centièmes servent à écrire une durée sous forme décimale : 30 minutes correspondent à 0,50 heure, et non à 0,30 heure. Voici la méthode pour passer des minutes aux centièmes et l'inverse, avec un tableau et des exemples.",
  reponse:
    "Pour convertir des minutes en centièmes d'heure, **divisez le nombre de minutes par 60**. Pour convertir des centièmes en minutes, **multipliez la partie décimale par 60**. Ainsi, 45 minutes valent 45 ÷ 60 = **0,75 heure**, et 7,75 heures correspondent à 7 heures et 45 minutes.",
  sections: [
    {
      titre: "Pourquoi convertir les heures en centièmes ?",
      paras: [
        "Une heure contient 60 minutes, mais elle est aussi divisée en 100 centièmes d'heure pour les calculs décimaux. Les fiches de paie et les logiciels de pointage affichent souvent les heures sous cette forme.",
        "Une durée écrite 7,50 heures signifie 7 heures et demie, soit 7 heures 30 minutes. En revanche, 7 heures 50 minutes ne s'écrit pas 7,50 heure : il faut convertir les 50 minutes en centièmes.",
      ],
    },
    {
      titre: "Convertir des minutes en centièmes d'heure",
      paras: [
        "La formule est : **centièmes d'heure = minutes ÷ 60**. Le résultat peut comporter plusieurs décimales. Arrondissez seulement à la fin, généralement à deux décimales.",
      ],
      etapes: [
        "Prenez la durée en minutes. Exemple : 45 minutes.",
        "Divisez par 60 : 45 ÷ 60 = 0,75.",
        "Écrivez le résultat en heures décimales : 45 minutes = **0,75 heure**.",
      ],
      suite: [
        "Pour une durée complète, séparez les heures entières des minutes. Par exemple, 7 heures 45 minutes deviennent 7 + (45 ÷ 60) = **7,75 heures**.",
      ],
    },
    {
      titre: "Convertir des centièmes d'heure en minutes",
      paras: [
        "Pour revenir à des minutes, prenez la partie décimale de l'heure et multipliez-la par 60. La formule est : **minutes = partie décimale × 60**.",
      ],
      etapes: [
        "Prenez 7,75 heures. La partie décimale est 0,75.",
        "Multipliez cette partie par 60 : 0,75 × 60 = 45 minutes.",
        "La durée est donc de **7 heures 45 minutes**.",
      ],
      suite: [
        "Autre exemple : 6,25 heures correspondent à 6 heures et 0,25 × 60 = 15 minutes, soit 6 heures 15 minutes.",
      ],
    },
    {
      titre: "Tableau de conversion des minutes en centièmes",
      paras: [
        "Les valeurs ci-dessous sont **arrondies à deux décimales**. Le calcul exact reste minutes ÷ 60.",
      ],
      tableau: {
        colonnes: ["Minutes", "Centièmes d'heure"],
        lignes: [
          ["5", "0,08"],
          ["10", "0,17"],
          ["15", "0,25"],
          ["20", "0,33"],
          ["25", "0,42"],
          ["30", "0,50"],
          ["35", "0,58"],
          ["40", "0,67"],
          ["45", "0,75"],
          ["50", "0,83"],
          ["55", "0,92"],
          ["60", "1,00"],
        ],
      },
    },
    {
      titre: "Comment lire 7,75 heures ou 7,50 heures ?",
      paras: [
        "Le chiffre après la virgule est une fraction d'heure, pas un nombre de minutes. Pour l'interpréter, multipliez cette partie par 60.",
      ],
      liste: [
        "**7,75 heures** : 0,75 × 60 = 45 minutes, donc 7 heures 45 minutes.",
        "**7,50 heures** : 0,50 × 60 = 30 minutes, donc 7 heures 30 minutes.",
        "**7,25 heures** : 0,25 × 60 = 15 minutes, donc 7 heures 15 minutes.",
        "**7,10 heures** : 0,10 × 60 = 6 minutes, donc 7 heures 06 minutes.",
      ],
      encadre:
        "Ne lisez pas 7,75 heures comme 7 heures 75 minutes. Les centièmes sont une écriture décimale : seule la multiplication de la partie décimale par 60 donne les minutes.",
    },
    {
      titre: "Utiliser le calculateur d'heures de travail",
      paras: [
        "Le [calculateur d'heures de travail](/calcul-heures-travail) ne convertit pas directement des centièmes en minutes. Il calcule plutôt une durée de travail ou des heures supplémentaires à partir des valeurs saisies.",
        "En mode « Journée », saisissez l'heure de début et l'heure de fin, puis choisissez la pause parmi 0, 30, 45, 60 ou 90 minutes. Le résultat affiche les heures travaillées au format heures-minutes et leur équivalent en heures décimales. Avec 9 h à 17 h 30 et 60 minutes de pause, le résultat est 7 h 30, soit 7,50 heures.",
        "En mode « Semaine », activez les jours travaillés, saisissez les horaires et la pause de chaque jour. Le calculateur affiche le total de la semaine, le détail par jour et la moyenne par jour. En mode « Heures sup », saisissez les heures du contrat et les heures réellement travaillées, puis choisissez la majoration parmi +25 % ou +50 % pour obtenir le nombre d'heures supplémentaires.",
        "Le taux horaire brut est facultatif. Lorsqu'il est renseigné, le calculateur affiche aussi une rémunération estimée selon le mode choisi.",
      ],
    },
    {
      titre: "Heures en centièmes et durée légale du travail",
      paras: [
        "La durée légale du travail en France est de **35 heures par semaine**. 35 heures pile correspondent à 35,00 en centièmes.",
        "Une durée de 35 heures et 30 minutes s'écrit 35,50 heures, car 30 ÷ 60 = 0,50. Une durée de 35 heures et 5 minutes s'écrit environ 35,08 heures après arrondi à deux décimales.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Lire les minutes comme des centièmes.** 20 minutes ne valent pas 0,20 heure, mais 20 ÷ 60 = 0,3333..., soit 0,33 après arrondi à deux décimales.",
        "**Multiplier toute la durée par 60.** Pour revenir aux minutes, multipliez seulement la partie décimale par 60. Dans 7,75, les 7 heures restent des heures.",
        "**Arrondir trop tôt.** Gardez le résultat complet pendant le calcul, puis arrondissez à deux décimales à la fin.",
        "**Confondre 7,50 et 7 h 50.** 7,50 heures correspondent à 7 h 30, tandis que 7 h 50 correspondent à 7 + (50 ÷ 60) = 7,8333... heures, soit 7,83 après arrondi.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-heures-travail",
    nom: "Calcul heures de travail",
    titre: "Calculez vos heures de travail",
    texte:
      "Saisissez vos horaires, vos pauses ou vos heures contractuelles : le calculateur donne les durées travaillées, les heures supplémentaires et, si vous le renseignez, une rémunération estimée.",
    bouton: "Ouvrir le calculateur d'heures",
  },
  faq: [
    {
      q: "Comment convertir 30 minutes en centièmes d'heure ?",
      a: "Divisez 30 par 60 : 30 ÷ 60 = 0,50. Trente minutes correspondent donc à 0,50 heure.",
    },
    {
      q: "Comment convertir 7,75 heures en heures et minutes ?",
      a: "Prenez la partie décimale 0,75 et multipliez-la par 60 : 0,75 × 60 = 45. 7,75 heures correspondent à 7 heures 45 minutes.",
    },
    {
      q: "Combien font 45 minutes en heures décimales ?",
      a: "45 ÷ 60 = 0,75. Quarante-cinq minutes correspondent à 0,75 heure.",
    },
    {
      q: "Pourquoi 20 minutes ne correspondent-elles pas à 0,20 heure ?",
      a: "Une heure contient 60 minutes. Il faut donc calculer 20 ÷ 60 = 0,3333..., soit 0,33 heure après arrondi à deux décimales.",
    },
    {
      q: "Le calculateur d'heures de travail convertit-il les centièmes en minutes ?",
      a: "Non. Il calcule les heures travaillées à partir d'horaires et de pauses, le total d'une semaine ou les heures supplémentaires. En mode journée, il affiche aussi l'équivalent en heures décimales.",
    },
  ],
  sources: [],
  datePublication: "2026-10-24",
  dateAffichee: "24 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
