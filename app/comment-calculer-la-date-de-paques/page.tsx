import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Quand tombe Pâques, et comment la calculer ?";
const DESCRIPTION =
  "Pâques tombe le dimanche qui suit la première pleine lune après le 21 mars, entre le 22 mars et le 25 avril. Les dates de 2026 à 2030, la règle, et la date de Pâques orthodoxe (12 avril 2026).";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-la-date-de-paques" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "quand tombe Pâques, comment calculer la date de Pâques, date de Pâques 2026, date de Pâques 2027, Pâques orthodoxe 2026, règle de Pâques, pleine lune Pâques",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-la-date-de-paques",
  fil: "Date de Pâques",
  emoji: "🐣",
  couleur: "from-yellow-400 to-amber-500",
  h1: "Quand tombe Pâques, et comment la calculer ?",
  chapo:
    "La date de Pâques change chaque année, ce qui surprend souvent. Cet article explique la règle fixée au IVe siècle, donne les dates de 2026 à 2030, indique la différence avec la date orthodoxe et liste les fêtes qui se calent sur Pâques.",
  reponse:
    "Pâques tombe le **dimanche qui suit la première pleine lune après le 21 mars**. Elle peut donc tomber entre le **22 mars** et le **25 avril**. En 2026, c'est le **5 avril** pour les Églises catholique et protestante, et le **12 avril** pour les Églises orthodoxes.",
  sections: [
    {
      titre: "La règle fixée par le concile de Nicée",
      paras: [
        "En 325, le concile de Nicée a fixé la règle encore en vigueur chez les catholiques et les protestants : Pâques tombe le **dimanche qui suit la première pleine lune après le 21 mars**. Le 21 mars sert de date conventionnelle pour l'équinoxe de printemps.",
        "La lune utilisée n'est pas la lune observée dans le ciel, mais une lune conventionnelle, dite « ecclésiastique ». C'est pourquoi la date de Pâques ne suit pas exactement la lune réelle.",
        "Pâques est toujours un dimanche. L'écart entre la date la plus tôt (22 mars) et la plus tard (25 avril) est d'environ cinq semaines.",
      ],
    },
    {
      titre: "Les dates de Pâques de 2026 à 2030",
      paras: [
        "Le tableau donne la date pour les Églises catholique et protestante, et celle des Églises orthodoxes, qui utilisent le calendrier julien.",
      ],
      tableau: {
        colonnes: ["Année", "Pâques (catholiques, protestants)", "Pâques (orthodoxes)"],
        lignes: [
          ["2026", "dimanche 5 avril", "dimanche 12 avril"],
          ["2027", "dimanche 28 mars", "dimanche 2 mai"],
          ["2028", "dimanche 16 avril", "dimanche 16 avril"],
          ["2029", "dimanche 1er avril", "dimanche 8 avril"],
          ["2030", "dimanche 21 avril", "dimanche 28 avril"],
        ],
        texte: true,
      },
    },
    {
      titre: "Pourquoi les orthodoxes fêtent Pâques à une autre date",
      paras: [
        "Les Églises orthodoxes calculent Pâques avec la même règle, mais en se basant sur le calendrier julien. Le décalage entre les deux calendriers fait que les dates diffèrent parfois de plusieurs semaines. En 2027, par exemple, l'écart atteint cinq semaines.",
        "Il faut donc préciser la tradition avant de lire la date. Le calculateur de ce site donne les deux dates.",
      ],
    },
    {
      titre: "Les fêtes qui se calent sur Pâques",
      paras: [
        "Plusieurs fêtes chrétiennes se calculent à partir de Pâques. Elles changent donc de date avec elle :",
      ],
      liste: [
        "**Vendredi saint** : 2 jours avant Pâques.",
        "**Lundi de Pâques** : le lendemain de Pâques.",
        "**Ascension** : 39 jours après Pâques, un jeudi.",
        "**Pentecôte** : 49 jours après Pâques, un dimanche.",
      ],
      encadre:
        "Pour une date précise, utilisez le [calculateur de la date de Pâques](/calcul-date-paques) : entrez l'année et il donne Pâques, les fêtes qui en dépendent et la date orthodoxe.",
    },
  ],
  calculateur: {
    href: "/calcul-date-paques",
    nom: "Date de Pâques",
    titre: "Trouvez la date de Pâques",
    texte:
      "Entrez une année : le calculateur donne la date de Pâques, celle des fêtes qui en dépendent et la date orthodoxe.",
    bouton: "Ouvrir le calculateur de Pâques",
  },
  faq: [
    {
      q: "Quand tombe Pâques en 2026 ?",
      a: "Le dimanche 5 avril 2026 pour les Églises catholique et protestante. Pour les Églises orthodoxes, c'est le dimanche 12 avril 2026.",
    },
    {
      q: "Quelle est la règle pour la date de Pâques ?",
      a: "Pâques tombe le dimanche qui suit la première pleine lune après le 21 mars. Elle peut donc tomber entre le 22 mars et le 25 avril.",
    },
    {
      q: "Pâques tombe-t-elle toujours le même jour ?",
      a: "Pâques est toujours un dimanche, mais sa date change d'une année à l'autre, entre le 22 mars et le 25 avril.",
    },
    {
      q: "Quand tombe Pâques en 2027 ?",
      a: "Le dimanche 28 mars 2027 pour les Églises catholique et protestante. Les Églises orthodoxes la fêtent le dimanche 2 mai 2027.",
    },
  ],
  sources: [
    {
      label: "Wikipédia : Pâques (règle du concile de Nicée et calendriers)",
      url: "https://fr.wikipedia.org/wiki/P%C3%A2ques",
    },
    {
      label: "Église catholique en France : pourquoi la date de Pâques change",
      url: "https://eglise.catholique.fr/approfondir-sa-foi/la-celebration-de-la-foi/les-grandes-fetes-chretiennes/careme-et-paques/semaine-sainte-paques/371448-pourquoi-date-paques-change/",
    },
  ],
  datePublication: "2026-10-18",
  dateAffichee: "18 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
