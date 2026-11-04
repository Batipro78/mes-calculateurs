import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Combien de jours entre deux dates ?";
const DESCRIPTION =
  "Le nombre de jours entre deux dates est la date de fin moins la date de début. Méthode à la main, formule de tableur, années bissextiles, jour de départ compté ou non : exemples chiffrés et pièges.";

export const metadata: Metadata = {
  alternates: { canonical: "/combien-de-jours-entre-deux-dates" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "jours entre deux dates, durée en jours entre deux dates, différence de jours entre deux dates, jours entre deux dates excel, calcul de durée, année bissextile",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
    images: [{ url: "/images/jours-entre-dates-calendrier.webp", width: 1200, height: 630 }],
  },
};

const ARTICLE: ArticleData = {
  slug: "/combien-de-jours-entre-deux-dates",
  fil: "Jours entre deux dates",
  emoji: "📆",
  couleur: "from-fuchsia-500 to-pink-600",
  h1: "Combien de jours entre deux dates ?",
  chapo:
    "Un délai, un séjour, une location, un compte à rebours : on a souvent besoin de savoir combien de jours séparent deux dates. Voici la méthode à la main, la formule de tableur, les pièges des mois et des années bissextiles, et des exemples chiffrés.",
  reponse:
    "**Le nombre de jours est la date de fin moins la date de début.** Ce calcul ne compte pas le jour de départ. Pour compter les deux jours extrêmes, début et fin inclus, ajoutez 1. Du 4 novembre au 25 décembre 2026, il y a 51 jours, ou 52 jours en comptant les deux dates.",
  sections: [
    {
      titre: "Le principe : une soustraction",
      paras: [
        "Pour connaître la durée entre deux dates, on retranche la date de début à la date de fin. Le résultat est un nombre de jours **écoulés** : si vous partez le 1er et que vous arrivez le 2, il s'est écoulé 1 jour.",
        "Ce calcul ne compte donc pas le jour de départ. Selon ce que vous cherchez, vous garderez ce résultat tel quel ou vous ajouterez 1.",
      ],
      liste: [
        "**Une durée écoulée** (depuis un événement, jusqu'à une échéance) : on garde la différence, sans rien ajouter.",
        "**Une période comptée en jours ou en nuits** (une location, un séjour) : si le premier et le dernier jour comptent tous les deux, on ajoute 1. Si on compte des nuits, la différence suffit : du 1er au 8, cela fait 7 nuits et 8 jours.",
      ],
      encadre:
        "Avant de calculer, demandez-vous : le jour de départ et le jour d'arrivée comptent-ils tous les deux ? Si oui, ajoutez 1 à la différence.",
      visuel: {
        fichier: "jours-entre-dates-calendrier",
        alt: "Calendrier mural en papier sur un mur clair, avec une grille de cases vides et deux cases entourées au feutre rouge, un feutre posé en dessous sur un bureau à côté d'une plante.",
        legende:
          "Entre deux cases entourées sur un calendrier, la question est toujours la même : compte-t-on la case de départ ?",
      },
    },
    {
      titre: "Ce qui complique le calcul : les mois et les années bissextiles",
      paras: [
        "Les mois n'ont pas tous la même longueur : ils comptent 28, 29, 30 ou 31 jours. On ne peut donc pas multiplier un nombre de mois par 30 sans faire d'erreur.",
        "Février a 29 jours les années bissextiles. Une année est bissextile quand elle est divisible par 4, sauf les années séculaires qui ne sont pas divisibles par 400. L'an 2000 l'était ; 2100 ne le sera pas. Pour la période qui nous concerne, 2028 est bissextile : février 2028 a 29 jours.",
      ],
    },
    {
      titre: "Exemple 1 : du 1er janvier au 31 décembre 2026",
      paras: [
        "2026 n'est pas une année bissextile : elle compte 365 jours. Du 1er janvier au 31 décembre, on ne compte pas le premier jour.",
      ],
      etapes: [
        "On compte les jours de l'année : 365, de janvier à décembre.",
        "On retire le 1er janvier du compte : 365 − 1 = **364 jours**.",
        "Si l'on veut compter les deux jours extrêmes, on ajoute 1 : **365 jours**, soit l'année entière.",
      ],
    },
    {
      titre: "Exemple 2 : du 4 novembre au 25 décembre 2026",
      paras: [
        "On utilise la méthode à la main : jours restants du mois de départ, plus les jours des mois entiers, plus les jours du mois d'arrivée.",
      ],
      etapes: [
        "Jours restants de novembre après le 4 : 30 − 4 = 26.",
        "Mois entiers entre les deux : aucun, puisque décembre est le mois d'arrivée.",
        "Jours de décembre jusqu'au 25 : 25.",
        "On additionne : 26 + 25 = **51 jours**.",
      ],
      suite: [
        "En comptant le 4 novembre et le 25 décembre tous les deux, on obtient 52 jours. Sous forme de durée, cela fait 1 mois et 21 jours : du 4 novembre au 4 décembre, 1 mois, puis 21 jours jusqu'au 25.",
      ],
    },
    {
      titre: "Exemple 3 : le piège du 29 février",
      paras: [
        "Calculons le nombre de jours entre le 15 février et le 15 mars, d'abord en 2027, puis en 2028.",
      ],
      etapes: [
        "En 2027, février a 28 jours : du 15 février au 15 mars, il y a 13 jours restants en février (28 − 15), puis 15 jours en mars : 13 + 15 = **28 jours**.",
        "En 2028, février a 29 jours : 14 jours restants en février (29 − 15), puis 15 jours en mars : 14 + 15 = **29 jours**.",
      ],
      suite: [
        "Les deux périodes vont du 15 février au 15 mars, mais elles ne durent pas pareil, à cause d'un seul jour : le 29 février 2028.",
      ],
    },
    {
      titre: "Exemple 4 : quelle date tombe 30 jours après le 4 novembre 2026 ?",
      paras: [
        "Ici, on cherche la date d'arrivée à partir d'un nombre de jours : on ajoute à la date de départ.",
      ],
      etapes: [
        "Jours restants de novembre après le 4 : 26. Ils nous amènent au 30 novembre.",
        "Il reste 30 − 26 = 4 jours à ajouter, à compter du 30 novembre.",
        "On arrive au **4 décembre 2026**.",
      ],
      suite: [
        "Vérification : du 4 novembre au 4 décembre, il y a bien 26 + 4 = 30 jours.",
      ],
    },
    {
      titre: "Résumé des exemples",
      tableau: {
        colonnes: ["Période", "Jours (différence)", "Jours (départ et fin comptés)"],
        lignes: [
          ["1er janvier au 31 décembre 2026", "364", "365"],
          ["4 novembre au 25 décembre 2026", "51", "52"],
          ["15 février au 15 mars 2027", "28", "29"],
          ["15 février au 15 mars 2028", "29", "30"],
        ],
      },
    },
    {
      titre: "Faire le calcul dans un tableur",
      paras: [
        "Dans Excel ou LibreOffice, saisissez la date de début en A1 et la date de fin en B1. Dans une troisième cellule, écrivez la formule suivante :",
      ],
      liste: ["**=B1-A1**"],
      suite: [
        "Mettez la cellule au format **Nombre**. Si elle reste au format date, le tableur affiche une date au lieu d'un nombre de jours. Ajoutez 1 si vous voulez compter les deux jours.",
      ],
    },
    {
      titre: "Comment utiliser le calculateur de durée entre deux dates",
      paras: [
        "Dans le [calculateur de durée entre deux dates](/calcul-duree-entre-dates), vous choisissez une **date de début** et une **date de fin**. Si vous laissez la date de fin vide, le calculateur prend la date du jour. Si la date de début est postérieure à celle de fin, il remet les deux dans l'ordre : vous n'obtenez pas de nombre négatif.",
        "Le résultat principal est la durée en **années, mois et jours**. Il affiche ensuite le total en **jours**, en **semaines** (semaines entières), en **heures** et en **jours ouvrés**. Un bloc de conversions ajoute les minutes, ainsi qu'un nombre approximatif de mois et d'années. Des raccourcis, comme Noël 2026 ou le nouvel an, remettent la date de début à aujourd'hui et remplissent la date de fin.",
        "Le total en jours est la différence entre les deux dates. Pour du 4 novembre au 25 décembre 2026, il affiche 51 jours, 7 semaines et 1 224 heures (51 × 24), et une durée de 1 mois et 21 jours. Pour compter les deux jours extrêmes, ajoutez 1 vous-même.",
        "Les **jours ouvrés** sont les jours du lundi au vendredi. Le calculateur n'en retire pas les jours fériés : c'est une approximation. Pour la même période, il en affiche 37. Pour un décompte plus fin, utilisez le [calculateur de jours ouvrés](/calcul-jours-ouvres), ou consultez l'article [combien de jours ouvrés en 2027](/combien-de-jours-ouvres-en-2027).",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Oublier de décider si le jour de départ compte.** C'est une source d'écart fréquente, de 1 jour. Choisissez avant de calculer.",
        "**Compter 30 jours par mois.** Un mois fait 28, 29, 30 ou 31 jours : additionnez les vrais nombres de jours.",
        "**Oublier le 29 février.** Sur une période qui traverse février d'une année bissextile comme 2028, il y a un jour de plus.",
        "**Laisser le tableur au format date.** La formule est bonne, mais l'affichage est faux : passez la cellule au format Nombre.",
        "**Confondre durée et âge.** Pour un âge exact, en années, mois et jours, voyez l'article [comment calculer son âge exact](/comment-calculer-son-age-exact).",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-duree-entre-dates",
    nom: "Durée entre deux dates",
    titre: "Calculez la durée entre deux dates",
    texte:
      "Choisissez une date de début et une date de fin : le calculateur affiche la durée en années, mois et jours, le total en jours, en semaines et en heures, et un nombre approximatif de jours ouvrés.",
    bouton: "Ouvrir le calculateur de durée entre deux dates",
  },
  faq: [
    {
      q: "Comment calculer le nombre de jours entre deux dates ?",
      a: "On retranche la date de début à la date de fin. Du 4 novembre au 25 décembre 2026, on trouve 26 jours restants en novembre plus 25 jours en décembre, soit 51 jours.",
    },
    {
      q: "Le jour de départ est-il compté ?",
      a: "Non, la différence entre deux dates ne compte pas le jour de départ. Si vous voulez compter le premier et le dernier jour, ajoutez 1 au résultat.",
    },
    {
      q: "Comment calculer le nombre de jours entre deux dates dans Excel ?",
      a: "Mettez la date de début en A1 et la date de fin en B1, puis saisissez =B1-A1 dans une autre cellule. Appliquez à cette cellule le format Nombre pour voir un nombre de jours.",
    },
    {
      q: "Quelles sont les années bissextiles ?",
      a: "Ce sont les années divisibles par 4, sauf les années séculaires qui ne sont pas divisibles par 400. 2000 l'était, 2100 ne le sera pas, et 2028 est bissextile : février 2028 compte 29 jours.",
    },
    {
      q: "Le calculateur retire-t-il les jours fériés des jours ouvrés ?",
      a: "Non. Il compte les jours du lundi au vendredi, sans retirer les jours fériés : c'est une approximation. Pour un décompte plus précis, utilisez le calculateur de jours ouvrés.",
    },
  ],
  sources: [],
  datePublication: "2026-11-04",
  dateAffichee: "4 novembre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
