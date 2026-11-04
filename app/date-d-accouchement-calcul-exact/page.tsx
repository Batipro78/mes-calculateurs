import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer sa date d'accouchement ?";
const DESCRIPTION =
  "En France, la date présumée d'accouchement se calcule à partir du premier jour des dernières règles : on ajoute 287 jours (41 SA). Méthode pas à pas, exemples datés, conception, échographie et limites de l'estimation.";

export const metadata: Metadata = {
  alternates: { canonical: "/date-d-accouchement-calcul-exact" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "date d'accouchement, calcul date accouchement, date d'accouchement calcul exact, date présumée d'accouchement, DPA, calcul date accouchement avec date de conception, accouchement à combien de SA",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
    images: [{ url: "/images/date-accouchement-chambre.webp", width: 1200, height: 630 }],
  },
};

const ARTICLE: ArticleData = {
  slug: "/date-d-accouchement-calcul-exact",
  fil: "Date d'accouchement",
  emoji: "🤰",
  couleur: "from-purple-500 to-pink-500",
  h1: "Comment calculer sa date d'accouchement ?",
  chapo:
    "À partir de la date de vos dernières règles, de la conception ou d'une échographie, vous pouvez estimer la date présumée d'accouchement. Voici la méthode française, des exemples datés et ce qu'il faut savoir sur la fiabilité de cette date.",
  reponse:
    "**En France, la date présumée d'accouchement (DPA) se situe à 41 semaines d'aménorrhée (SA) après le premier jour des dernières règles, soit 287 jours.** Cela revient à ajouter environ 9 mois et 2 semaines. C'est une estimation : un examen échographique permet de l'affiner.",
  sections: [
    {
      titre: "La règle de calcul de la DPA",
      paras: [
        "La date présumée d'accouchement est fixée par convention, en France, à **41 semaines d'aménorrhée** à partir du **premier jour des dernières règles**. Cela représente 287 jours (41 semaines), soit environ 9 mois et 2 semaines.",
        "La formule est donc simple : **DPA = premier jour des dernières règles + 287 jours**.",
        "Cette règle suppose un cycle régulier de 28 jours. C'est une estimation statistique, pas une date certaine : peu de bébés naissent le jour prévu.",
      ],
      visuel: {
        fichier: "date-accouchement-chambre",
        alt: "Coin d'une chambre de bébé dans la lumière du matin, avec un petit bonnet tricoté et une paire de chaussons de naissance posés sur une commode en bois clair, une plante et un mur blanc.",
        legende:
          "Connaître la date présumée d'accouchement aide à préparer l'arrivée du bébé, sans oublier qu'il s'agit d'une estimation.",
      },
    },
    {
      titre: "SA ou SG : ne pas les confondre",
      paras: [
        "Deux façons de compter les semaines existent, et elles diffèrent de 2 semaines.",
      ],
      liste: [
        "**Les semaines d'aménorrhée (SA)** se comptent depuis le premier jour des dernières règles. C'est l'unité utilisée dans le suivi médical.",
        "**Les semaines de grossesse (SG)** se comptent depuis la fécondation. On a donc : **SG = SA − 2 semaines**.",
      ],
      suite: [
        "Le terme en France est à 41 SA, ce qui correspond à 39 SG. Pour la question « accouchement à combien de SA ? », la réponse de référence est donc 41 SA, soit la DPA.",
      ],
    },
    {
      titre: "Exemple 1 : dernières règles le 1er février 2026",
      paras: [
        "Le premier jour des dernières règles est le 1er février 2026. On ajoute 287 jours.",
      ],
      etapes: [
        "On part du 1er février 2026.",
        "On ajoute 287 jours, soit 41 semaines.",
        "On obtient le **dimanche 15 novembre 2026**.",
      ],
      suite: [
        "Le congé prénatal d'un premier ou d'un deuxième enfant commence 6 semaines avant la DPA. Ici, 6 semaines avant le 15 novembre 2026 : le **4 octobre 2026**.",
      ],
    },
    {
      titre: "Exemple 2 : dernières règles le 20 septembre 2026",
      paras: [
        "Même méthode, avec des règles qui commencent le 20 septembre 2026.",
      ],
      etapes: [
        "On part du 20 septembre 2026.",
        "On ajoute 287 jours.",
        "On obtient le **dimanche 4 juillet 2027**.",
      ],
      suite: [
        "Le calcul traverse le changement d'année, mais la règle ne change pas : 287 jours, quelle que soit la date de départ.",
      ],
    },
    {
      titre: "Exemple 3 : à partir de la date de conception",
      paras: [
        "Si vous connaissez la date de conception, vous pouvez calculer à partir d'elle. La conception a lieu environ 2 semaines après le début des dernières règles : la DPA tombe donc **273 jours après la conception** (287 − 14).",
        "Prenons une conception le 15 mars 2026.",
      ],
      etapes: [
        "On part du 15 mars 2026.",
        "On ajoute 273 jours.",
        "On obtient le **dimanche 13 décembre 2026**.",
      ],
      suite: [
        "Pour vérifier, on remonte de 14 jours : les dernières règles correspondantes seraient le 1er mars 2026, et 1er mars + 287 jours donne bien le 13 décembre 2026.",
        "Cette méthode suppose, comme la précédente, une ovulation environ 14 jours après le début des règles. Si vos cycles sont plus longs ou plus courts, la date de conception ne tombe pas forcément 14 jours après les règles. Pour mieux situer votre ovulation, consultez [comment calculer sa période d'ovulation](/comment-calculer-sa-periode-d-ovulation).",
      ],
    },
    {
      titre: "Exemple 4 : à quelle date est-on à 12 SA ?",
      paras: [
        "Avec des dernières règles le 1er février 2026, à quelle date atteint-on 12 SA ? Les SA se comptent depuis le premier jour des règles : 12 SA, c'est 12 × 7 = 84 jours.",
      ],
      etapes: [
        "On part du 1er février 2026.",
        "On ajoute 84 jours.",
        "On obtient le **dimanche 26 avril 2026**.",
      ],
      suite: [
        "La même méthode donne n'importe quel jalon : on multiplie le nombre de SA par 7 et on ajoute le résultat à la date des dernières règles.",
      ],
    },
    {
      titre: "Résumé des exemples",
      tableau: {
        colonnes: ["Situation", "Calcul", "Résultat"],
        lignes: [
          ["Règles le 1er février 2026", "+ 287 jours", "15 novembre 2026"],
          ["Règles le 20 septembre 2026", "+ 287 jours", "4 juillet 2027"],
          ["Conception le 15 mars 2026", "+ 273 jours", "13 décembre 2026"],
          ["12 SA, règles le 1er février 2026", "+ 84 jours", "26 avril 2026"],
        ],
      },
    },
    {
      titre: "Pourquoi la DPA n'est qu'une estimation",
      paras: [
        "La règle des 41 SA repose sur l'hypothèse d'un cycle standard. Si vos cycles sont irréguliers, ou si vous n'êtes pas sûre de la date de vos dernières règles, la date calculée peut être décalée.",
        "L'**échographie de datation**, faite entre 11 et 13 SA + 6 jours, est le repère le plus fiable. Le médecin ou la sage-femme peut s'appuyer sur elle pour affiner ou corriger la DPA, surtout si les cycles sont irréguliers ou la date des dernières règles incertaine.",
        "Autre source d'écart : certains sites, notamment étrangers, utilisent la **règle de Naegele**, qui ajoute 280 jours, soit 40 SA. Elle donne une date une semaine plus tôt que la convention française. Pour les règles du 1er février 2026, on obtient le 8 novembre 2026 au lieu du 15 novembre.",
      ],
      encadre:
        "Cet article ne remplace pas un avis médical. Pour toute question sur votre grossesse ou votre date d'accouchement, adressez-vous à votre médecin, à votre gynécologue ou à votre sage-femme.",
    },
    {
      titre: "Comment utiliser le calculateur de date d'accouchement",
      paras: [
        "Le calculateur propose **trois modes**, à choisir en haut du formulaire.",
      ],
      liste: [
        "**Dernières règles** : vous saisissez la date du premier jour de vos dernières règles. Le calculateur ajoute 287 jours.",
        "**Conception** : vous saisissez la date estimée de conception. Le calculateur ajoute 273 jours.",
        "**Échographie** : vous saisissez la date de l'échographie et le nombre de semaines d'aménorrhée indiqué à cette échographie. Le calculateur en déduit le début de grossesse, puis ajoute 287 jours.",
      ],
      suite: [
        "Par défaut, les champs date sont remplis avec la date du jour : pensez à les modifier.",
        "Le résultat principal est la **date prévue d'accouchement**, avec le jour de la semaine. Le calculateur indique aussi où vous en êtes aujourd'hui : semaines d'aménorrhée, semaines de grossesse, mois de grossesse, trimestre en cours et nombre de jours restants, avec une barre de progression.",
        "Il affiche enfin quelques dates clés : la fin du 1er trimestre, la fin du 2e trimestre, le début du congé prénatal (6 semaines avant la DPA) et la DPA. Il ajoute le signe astrologique correspondant à la DPA, à titre indicatif.",
        "Avec les règles du 1er février 2026, le calculateur donne donc le 15 novembre 2026, comme dans l'exemple 1. Pour en savoir plus sur le cycle, voir aussi le [calculateur d'ovulation](/calcul-ovulation).",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Partir de la date de conception avec la règle des 287 jours.** Les 287 jours se comptent depuis les dernières règles. Depuis la conception, il faut ajouter 273 jours.",
        "**Confondre SA et SG.** Il y a 2 semaines d'écart : 41 SA correspondent à 39 SG.",
        "**Compter depuis la fin des règles.** Le départ du calcul est le premier jour des dernières règles.",
        "**Voir la DPA comme une date certaine.** C'est une estimation. L'examen échographique permet de la préciser.",
        "**S'étonner d'un écart avec un site étranger.** Il utilise peut-être la règle de Naegele (280 jours), qui donne une date une semaine plus tôt.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-date-accouchement",
    nom: "Date d'accouchement",
    titre: "Calculez votre date d'accouchement",
    texte:
      "Choisissez le mode (dernières règles, conception ou échographie), saisissez la date : le calculateur affiche la date prévue d'accouchement, vos semaines d'aménorrhée et les dates clés.",
    bouton: "Ouvrir le calculateur de date d'accouchement",
  },
  faq: [
    {
      q: "Comment calculer sa date d'accouchement ?",
      a: "Ajoutez 287 jours (41 semaines d'aménorrhée) au premier jour de vos dernières règles. Cela revient à ajouter environ 9 mois et 2 semaines.",
    },
    {
      q: "Comment calculer la date d'accouchement avec la date de conception ?",
      a: "Ajoutez 273 jours à la date de conception. Pour une conception le 15 mars 2026, on obtient le 13 décembre 2026.",
    },
    {
      q: "Accouchement à combien de SA ?",
      a: "En France, la date présumée d'accouchement est fixée à 41 SA, ce qui correspond à 39 semaines de grossesse (SG = SA − 2 semaines).",
    },
    {
      q: "La date d'accouchement calculée est-elle exacte ?",
      a: "Non, c'est une estimation statistique qui suppose un cycle régulier de 28 jours. L'échographie de datation, entre 11 et 13 SA + 6 jours, permet au médecin ou à la sage-femme de l'affiner ou de la corriger.",
    },
    {
      q: "Pourquoi un site étranger donne-t-il une date différente ?",
      a: "Certains pays utilisent la règle de Naegele, qui ajoute 280 jours (40 SA) aux dernières règles. Elle donne une date une semaine plus tôt que la convention française à 41 SA.",
    },
  ],
  sources: [
    {
      label: "Santé.fr - Âge de la grossesse et date de l'accouchement",
      url: "https://www.sante.fr/node/1068443",
    },
  ],
  datePublication: "2026-11-04",
  dateAffichee: "4 novembre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
