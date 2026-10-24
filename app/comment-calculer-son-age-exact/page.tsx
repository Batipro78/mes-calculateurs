import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer son âge exact ?";
const DESCRIPTION =
  "Calculez un âge en années, mois et jours, ou en jours. Méthode pas à pas, exemples au 21 octobre 2026 et formule DATEDIF pour Excel en français.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-son-age-exact" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "calculer âge exact, âge en années mois jours, âge en jours, formule âge Excel, DATEDIF",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-son-age-exact",
  fil: "Calculer son âge exact",
  emoji: "🎂",
  couleur: "from-pink-500 to-rose-600",
  h1: "Comment calculer son âge exact ?",
  chapo:
    "Pour connaître son âge exact, on compare la date de naissance à la date choisie. Le résultat peut s'exprimer en années, mois et jours, ou en nombre total de jours. Voici la méthode, des exemples au 21 octobre 2026 et la formule à utiliser dans Excel en français.",
  reponse:
    "Soustrayez la date de naissance de la date de référence. Pour exprimer le résultat en **années, mois et jours**, calculez d'abord les années complètes, puis les mois complets et les jours restants en tenant compte de la longueur réelle de chaque mois. Pour l'âge en jours, comptez les jours écoulés entre les deux dates. Au 21 octobre 2026, une personne née le 15 juin 1998 a **28 ans, 4 mois et 6 jours**, soit **10 355 jours**.",
  sections: [
    {
      titre: "La méthode pour calculer un âge en années, mois et jours",
      paras: [
        "Choisissez d'abord la date de référence. Pour les exemples de cet article, il s'agit du **21 octobre 2026**. Comparez ensuite l'année, le mois et le jour de naissance à cette date.",
        "Les mois n'ont pas tous la même longueur : ils comptent de 28 à 31 jours. C'est ce qui rend le calcul des jours un peu délicat.",
      ],
      etapes: [
        "Soustrayez l'année de naissance de l'année de référence pour obtenir une première différence en années.",
        "Comparez les mois. Si le mois de naissance est plus tard dans l'année, retirez une année et ajoutez 12 aux mois restants.",
        "Comparez les jours. Si le jour de naissance n'est pas encore atteint dans le mois de référence, retirez un mois, puis calculez : jour de référence + nombre de jours du mois précédent − jour de naissance.",
        "Le résultat est l'âge en années complètes, mois complets et jours restants.",
      ],
    },
    {
      titre: "Exemple pas à pas au 21 octobre 2026",
      paras: [
        "Prenons une personne née le **15 juin 1998**. Le calcul se fait au **21 octobre 2026**.",
      ],
      etapes: [
        "Années : 2026 − 1998 = 28. Le 15 juin est déjà passé en 2026 : il y a donc 28 années complètes.",
        "Mois : d'un 15 juin au 15 octobre, il s'est écoulé 4 mois complets.",
        "Jours : du 15 au 21 octobre, il s'est écoulé 6 jours.",
        "L'âge exact est donc **28 ans, 4 mois et 6 jours**.",
        "En comptant les jours écoulés entre le 15 juin 1998 et le 21 octobre 2026, on obtient **10 355 jours**.",
      ],
      suite: [
        "Pour saisir votre date de naissance et lire ces résultats automatiquement, ouvrez le [calculateur d'âge](/calcul-age).",
      ],
    },
    {
      titre: "Quand le jour de naissance n'est pas encore atteint",
      paras: [
        "Prenons une personne née le **25 mars 1990**, toujours au **21 octobre 2026**. Le 21 est avant le 25 : le dernier mois n'est pas complet, il faut l'« emprunter ».",
      ],
      etapes: [
        "Années : 2026 − 1990 = 36. Le 25 mars est passé en 2026 : 36 années complètes.",
        "Mois : d'octobre à mars, 10 − 3 = 7 mois. Mais le 25 octobre n'est pas encore atteint : on retire un mois, il reste 6 mois.",
        "Jours : le mois précédent, septembre, compte 30 jours. 21 + 30 − 25 = 26 jours.",
        "L'âge exact est **36 ans, 6 mois et 26 jours**, soit **13 359 jours**.",
      ],
    },
    {
      titre: "Comment calculer son âge en jours",
      paras: [
        "Pour obtenir l'âge en jours, calculez le nombre de jours écoulés entre la date de naissance et la date de référence. Ce total est différent d'une conversion de l'âge en années avec un nombre fixe de jours par année : le calendrier comprend des années bissextiles.",
        "Une année est bissextile si elle est divisible par 4, sauf les années de siècle qui ne sont pas divisibles par 400 : 2000 et 2024 l'étaient, 2100 ne le sera pas. Exemple : du 21 octobre 2000 au 21 octobre 2026, il y a 26 × 365 = 9 490 jours, plus 6 jours pour les 29 février de 2004, 2008, 2012, 2016, 2020 et 2024, soit **9 496 jours**.",
      ],
      tableau: {
        colonnes: ["Date de naissance", "Date de référence", "Âge en années, mois et jours", "Jours écoulés"],
        lignes: [
          ["15 juin 1998", "21 octobre 2026", "28 ans, 4 mois et 6 jours", "10 355"],
          ["25 mars 1990", "21 octobre 2026", "36 ans, 6 mois et 26 jours", "13 359"],
          ["21 octobre 2000", "21 octobre 2026", "26 ans", "9 496"],
          ["29 février 2000", "21 octobre 2026", "26 ans, 7 mois et 22 jours", "9 731"],
        ],
      },
    },
    {
      titre: "Calculer un âge dans Excel en français",
      paras: [
        "Placez la date de naissance dans la cellule A1. La fonction DATEDIF compare cette date à la date du jour et renvoie une partie de l'intervalle selon le code indiqué à la fin de la formule.",
      ],
      tableau: {
        colonnes: ["Formule", "Résultat calculé"],
        lignes: [
          ['=DATEDIF(A1;AUJOURDHUI();"Y")', "Années complètes"],
          ['=DATEDIF(A1;AUJOURDHUI();"YM")', "Mois en plus des années complètes"],
          ['=DATEDIF(A1;AUJOURDHUI();"MD")', "Jours en plus des mois complets"],
          ["=AUJOURDHUI()-A1", "Âge en jours (cellule au format Nombre)"],
        ],
      },
      suite: [
        "La date de référence est celle du jour où le tableur fait le calcul : le résultat change chaque jour. Selon l'aide de Microsoft, l'argument « MD » peut donner un résultat négatif, nul ou imprécis : vérifiez les jours restants avec le [calculateur d'âge](/calcul-age).",
      ],
    },
    {
      titre: "Le cas d'une naissance un 29 février",
      paras: [
        "Le 29 février n'existe que les années bissextiles. Pour les années complètes et le nombre total de jours, cela ne change rien : on compte les dates du calendrier comme pour n'importe qui.",
        "Exemple : une personne née le **29 février 2000** a, au 21 octobre 2026, **26 ans, 7 mois et 22 jours**, soit **9 731 jours**. Le calcul des jours suit la même règle d'emprunt : 21 + 30 jours de septembre − 29 = 22.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Compter seulement les années.** Si la date d'anniversaire de l'année n'est pas encore atteinte à la date de référence, l'année complète correspondante ne doit pas être ajoutée.",
        "**Supposer que tous les mois ont 30 jours.** Les mois comptent de 28 à 31 jours ; utilisez la longueur du mois concerné pour trouver les jours restants.",
        "**Calculer les jours avec une année fixe.** Le calendrier comprend des années bissextiles ; comptez les jours entre les deux dates plutôt que de multiplier les années par un nombre fixe.",
        "**Oublier de préciser la date de référence.** Un âge exact change avec la date de calcul. Les exemples de cet article sont calculés au 21 octobre 2026.",
        "**Traiter le 29 février comme une date présente chaque année.** Cette date n'existe que lors d'une année bissextile.",
      ],
      encadre:
        "Pour un calcul fiable, indiquez la date de naissance complète et gardez une date de référence précise.",
    },
  ],
  calculateur: {
    href: "/calcul-age",
    nom: "Calcul d'âge",
    titre: "Calculez votre âge exact",
    texte:
      "Saisissez votre date de naissance : le calculateur compte jusqu'à la date du jour et affiche l'âge en années, mois et jours, ainsi que le total en mois, semaines, jours et heures.",
    bouton: "Ouvrir le calculateur d'âge",
  },
  faq: [
    {
      q: "Comment calculer son âge exact en années, mois et jours ?",
      a: "Comparez la date de naissance à la date de référence. Comptez les années complètes, puis les mois complets et enfin les jours restants en tenant compte de la longueur réelle des mois.",
    },
    {
      q: "Comment calculer son âge en jours ?",
      a: "Comptez les jours écoulés entre la date de naissance et la date de référence. Le total tient compte des mois de 28 à 31 jours et des années bissextiles.",
    },
    {
      q: "Quelle formule Excel donne l'âge en années complètes ?",
      a: 'Avec la date de naissance en A1, utilisez =DATEDIF(A1;AUJOURDHUI();"Y") pour obtenir les années complètes.',
    },
    {
      q: "Comment obtenir les mois et les jours restants dans Excel ?",
      a: 'Utilisez =DATEDIF(A1;AUJOURDHUI();"YM") pour les mois en plus des années complètes et =DATEDIF(A1;AUJOURDHUI();"MD") pour les jours en plus des mois complets.',
    },
    {
      q: "Que faire pour une naissance un 29 février ?",
      a: "Comme pour une autre date. Une personne née le 29 février 2000 a, au 21 octobre 2026, 26 ans, 7 mois et 22 jours, soit 9 731 jours.",
    },
  ],
  sources: [
    {
      label: "Aide Microsoft : la fonction DATEDIF dans Excel",
      url: "https://support.microsoft.com/fr-fr/office/datedif-fonction-datedif-25dba1a4-2812-480b-84dd-8b32a451b35c",
    },
  ],
  datePublication: "2026-10-24",
  dateAffichee: "24 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
