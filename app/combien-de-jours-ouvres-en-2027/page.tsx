import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Combien de jours ouvrés en 2027 ?";
const DESCRIPTION =
  "En 2027, il y a 254 jours ouvrés en France métropolitaine, soit du lundi au vendredi hors jours fériés. Découvrez le détail par mois, les jours fériés et les ponts possibles.";

export const metadata: Metadata = {
  alternates: { canonical: "/combien-de-jours-ouvres-en-2027" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "jours ouvrés 2027, nombre jours ouvrés 2027, jours ouvrés par mois 2027, jours fériés 2027, jours ouvrés avril 2027",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/combien-de-jours-ouvres-en-2027",
  fil: "Jours ouvrés en 2027",
  emoji: "📅",
  couleur: "from-indigo-500 to-blue-600",
  h1: "Combien de jours ouvrés en 2027 ?",
  chapo:
    "En 2027, l'année commence un vendredi et compte 365 jours. Voici le nombre exact de jours ouvrés, le détail mois par mois, les 11 jours fériés légaux et les ponts possibles.",
  reponse:
    "En 2027, il y a **254 jours ouvrés** en France métropolitaine. L'année compte 261 jours du lundi au vendredi, moins 7 jours fériés qui tombent en semaine. Pour comparaison, 2026 compte 252 jours ouvrés.",
  sections: [
    {
      titre: "Jour ouvré, jour ouvrable ou jour calendaire : quelle différence ?",
      paras: [
        "Un **jour ouvré** est un jour du lundi au vendredi, hors jours fériés. C'est la définition utilisée dans cet article et par le calculateur.",
        "Un **jour ouvrable** est un jour du lundi au samedi, hors jours fériés. Un **jour calendaire** correspond à tous les jours, y compris les week-ends et les jours fériés.",
      ],
    },
    {
      titre: "Le calcul des 254 jours ouvrés en 2027",
      paras: [
        "L'année 2027 compte 365 jours et commence un vendredi. Il y a 261 jours du lundi au vendredi et 104 jours de week-end.",
      ],
      etapes: [
        "Partir des 261 jours compris du lundi au vendredi.",
        "Retirer les 7 jours fériés qui tombent du lundi au vendredi.",
        "Obtenir 261 − 7 = **254 jours ouvrés**.",
      ],
      suite: [
        "Ce résultat suppose que les 11 jours fériés sont chômés. Le [calculateur de jours ouvrés](/calcul-jours-ouvres) permet de refaire le décompte pour une période précise.",
      ],
    },
    {
      titre: "Jours ouvrés 2027 par mois",
      paras: [
        "Voici le nombre de jours ouvrés et de jours ouvrables pour chaque mois de 2027. En particulier, **avril 2027 compte 22 jours ouvrés**.",
      ],
      tableau: {
        colonnes: ["Mois", "Jours ouvrés", "Jours ouvrables"],
        lignes: [
          ["Janvier", "20", "25"],
          ["Février", "20", "24"],
          ["Mars", "22", "26"],
          ["Avril", "22", "26"],
          ["Mai", "19", "22"],
          ["Juin", "22", "26"],
          ["Juillet", "21", "26"],
          ["Août", "22", "26"],
          ["Septembre", "22", "26"],
          ["Octobre", "21", "26"],
          ["Novembre", "20", "24"],
          ["Décembre", "23", "26"],
          ["Total 2027", "254", "303"],
        ],
      },
      suite: [
        "Au total, 2027 compte **303 jours ouvrables**. Ce total ne correspond pas aux 254 jours ouvrés, car le samedi est inclus dans les jours ouvrables.",
      ],
    },
    {
      titre: "Les 11 jours fériés légaux en 2027",
      paras: [
        "Pâques tombe le dimanche 28 mars 2027. Le lundi de Pâques est donc le lundi 29 mars.",
      ],
      tableau: {
        colonnes: ["Jour férié", "Date"],
        lignes: [
          ["Jour de l'an", "Vendredi 1er janvier"],
          ["Lundi de Pâques", "Lundi 29 mars"],
          ["Fête du travail", "Samedi 1er mai"],
          ["Victoire 1945", "Samedi 8 mai"],
          ["Ascension", "Jeudi 6 mai"],
          ["Lundi de Pentecôte", "Lundi 17 mai"],
          ["Fête nationale", "Mercredi 14 juillet"],
          ["Assomption", "Dimanche 15 août"],
          ["Toussaint", "Lundi 1er novembre"],
          ["Armistice", "Jeudi 11 novembre"],
          ["Noël", "Samedi 25 décembre"],
        ],
      },
      suite: [
        "Sept jours fériés tombent du lundi au vendredi : le 1er janvier, le 29 mars, le 6 mai, le 17 mai, le 14 juillet, le 1er novembre et le 11 novembre. Les quatre autres tombent le week-end : le 1er mai, le 8 mai et le 25 décembre un samedi, ainsi que le 15 août un dimanche.",
      ],
    },
    {
      titre: "Les ponts possibles en 2027",
      paras: [
        "Deux jours fériés tombent un jeudi en 2027. Ils peuvent permettre un pont le vendredi suivant :",
      ],
      liste: [
        "Vendredi 7 mai, après l'Ascension du jeudi 6 mai.",
        "Vendredi 12 novembre, après l'Armistice du jeudi 11 novembre.",
      ],
      encadre:
        "Un pont n'est pas un jour férié. Le calculateur le compte donc comme un jour ouvré.",
    },
    {
      titre: "Comment utiliser le calculateur de jours ouvrés",
      paras: [
        "Le [calculateur de jours ouvrés](/calcul-jours-ouvres) compte les jours du lundi au vendredi, hors les 11 jours fériés légaux. Il ne compte pas les jours ouvrables, les jours fériés d'Alsace-Moselle ou des DOM, ni les ponts.",
        "En mode « Par période », saisissez une **date de début** et une **date de fin**. Le résultat affiche le nombre de jours ouvrés, ainsi que les jours calendaires, les week-ends et les jours fériés tombant en semaine. Un jour férié qui tombe un samedi ou un dimanche est compté dans les week-ends.",
        "En mode « Par mois », choisissez l'année avec les **boutons d'année**. Le tableau affiche ensuite, mois par mois, les jours ouvrés, les jours calendaires et les jours fériés tombant en semaine, avec un total pour l'année.",
        "Pour retrouver les jours ouvrés de 2027, choisissez 2027 en mode « Par mois ». Le tableau affiche 22 jours ouvrés pour avril, 254 jours ouvrés au total et 7 jours fériés en semaine. Les jours ouvrables (303) ne sont pas affichés par le calculateur.",
      ],
    },
    {
      titre: "Les cas particuliers à connaître",
      paras: [
        "Seul le 1er mai est obligatoirement chômé pour tous les salariés. Les autres jours fériés sont chômés si la convention collective ou un accord le prévoit, ou, à défaut, sur décision de l'employeur après consultation du CSE. Les chiffres de cet article supposent que les 11 jours fériés sont chômés.",
        "En Alsace-Moselle, deux jours fériés supplémentaires existent : le Vendredi saint, dans les communes ayant un temple protestant ou une église mixte, et le 26 décembre. En 2027, le Vendredi saint tombe le vendredi 26 mars : il retire un jour ouvré, ce qui donne **253 jours ouvrés** dans ces communes. Le 26 décembre tombe un dimanche et ne change pas le total.",
        "Dans les DOM, la commémoration de l'abolition de l'esclavage est un jour férié supplémentaire, à une date propre à chaque département.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Confondre jours ouvrés et jours ouvrables.** Les jours ouvrés vont du lundi au vendredi ; les jours ouvrables vont du lundi au samedi, hors jours fériés.",
        "**Retirer tous les jours fériés du calendrier.** En 2027, les quatre jours fériés qui tombent le week-end ne retirent aucun jour ouvré.",
        "**Retirer les ponts comme s'ils étaient fériés.** Les vendredis 7 mai et 12 novembre sont des ponts possibles, mais restent des jours ouvrés dans le calculateur.",
        "**Oublier l'hypothèse sur les jours chômés.** Le total de 254 suppose que les 11 jours fériés sont chômés ; les règles applicables peuvent dépendre de la convention collective ou de l'employeur.",
        "**Utiliser le calcul de la métropole pour une autre zone.** Le calculateur ne prend pas en compte les jours fériés supplémentaires d'Alsace-Moselle ni des DOM.",
      ],
      encadre:
        "Pour compter des congés ou vérifier une période de travail, utilisez aussi le [calculateur de congés payés](/calcul-conges-payes).",
    },
  ],
  calculateur: {
    href: "/calcul-jours-ouvres",
    nom: "Calcul jours ouvrés",
    titre: "Calculez vos jours ouvrés",
    texte:
      "Choisissez « Par période » pour saisir une date de début et une date de fin, ou « Par mois » pour afficher le tableau mois par mois d'une année.",
    bouton: "Ouvrir le calculateur de jours ouvrés",
  },
  faq: [
    {
      q: "Combien y a-t-il de jours ouvrés en 2027 ?",
      a: "Il y a 254 jours ouvrés en 2027, en comptant les jours du lundi au vendredi et en retirant les 7 jours fériés qui tombent en semaine.",
    },
    {
      q: "Combien de jours ouvrés compte avril 2027 ?",
      a: "Avril 2027 compte 22 jours ouvrés et 26 jours ouvrables.",
    },
    {
      q: "Quel est le nombre de jours ouvrés par mois en 2027 ?",
      a: "Janvier 20, février 20, mars 22, avril 22, mai 19, juin 22, juillet 21, août 22, septembre 22, octobre 21, novembre 20 et décembre 23. Le total est de 254 jours ouvrés.",
    },
    {
      q: "Quels sont les jours fériés qui tombent en semaine en 2027 ?",
      a: "Le 1er janvier, le 29 mars, le 6 mai, le 17 mai, le 14 juillet, le 1er novembre et le 11 novembre tombent du lundi au vendredi en 2027.",
    },
    {
      q: "Les ponts sont-ils retirés du nombre de jours ouvrés ?",
      a: "Non. Les ponts possibles du vendredi 7 mai et du vendredi 12 novembre ne sont pas des jours fériés. Le calculateur les compte comme des jours ouvrés.",
    },
  ],
  sources: [
    {
      label: "Service-public.fr — Jours fériés et ponts dans le secteur privé (fiche F2405)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2405",
    },
  ],
  datePublication: "2026-10-24",
  dateAffichee: "24 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
