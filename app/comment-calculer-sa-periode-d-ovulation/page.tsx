import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer sa période d'ovulation ?";
const DESCRIPTION =
  "L'ovulation a lieu en moyenne 14 jours avant les règles suivantes. Calculez votre date d'ovulation et vos jours fertiles, avec des exemples datés, un tableau et les limites de la méthode.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-sa-periode-d-ovulation" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "calculer ovulation, période d'ovulation, quand ovule-t-on, jours fertiles, fenêtre de fertilité, date d'ovulation, durée du cycle",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-sa-periode-d-ovulation",
  fil: "Période d'ovulation",
  emoji: "🌸",
  couleur: "from-pink-500 to-rose-600",
  h1: "Comment calculer sa période d'ovulation ?",
  chapo:
    "L'ovulation se situe environ 14 jours avant les règles suivantes : on part donc du premier jour des dernières règles et de la durée habituelle du cycle. Voici la méthode, des exemples datés pas à pas et les limites du calcul.",
  reponse:
    "**L'ovulation a lieu en moyenne 14 jours avant les règles suivantes.** Pour un cycle de 28 jours, elle tombe vers le 14e jour ; pour un cycle de 32 jours, vers le 18e jour. Les jours fertiles forment une fenêtre d'environ 6 jours : les 5 jours qui précèdent l'ovulation et le jour de l'ovulation. Ces durées sont des moyennes, qui varient d'une femme à l'autre.",
  sections: [
    {
      titre: "Le principe : compter à rebours depuis les prochaines règles",
      paras: [
        "On croit souvent que l'ovulation a lieu 14 jours après le début des dernières règles. C'est exact seulement pour un cycle de 28 jours. En réalité, c'est la durée entre l'ovulation et les règles suivantes qui est proche de **14 jours**.",
        "Le **jour 1 du cycle est le premier jour des règles**. Le cycle se termine la veille des règles suivantes. Pour estimer l'ovulation, on soustrait donc 14 jours à la durée du cycle : **jour d'ovulation = durée du cycle − 14**. Attention : cette durée de 14 jours est une moyenne. Elle n'est pas fixe et peut différer d'une femme à l'autre.",
      ],
      visuel: {
        fichier: "ovulation-agenda",
        alt: "Table de petit déjeuner claire avec un agenda papier ouvert sur une grille de cases, quelques cases entourées au crayon rose, une tasse de tisane et un brin d'eucalyptus.",
        legende:
          "Un agenda où l'on note le premier jour des règles permet de repérer la durée de ses cycles.",
      },
    },
    {
      titre: "Exemple pas à pas : un cycle de 28 jours",
      paras: [
        "Imaginons que vos dernières règles aient commencé le mardi 3 novembre 2026 et que vos cycles durent 28 jours.",
      ],
      etapes: [
        "Les prochaines règles sont attendues 28 jours plus tard : le **mardi 1er décembre 2026**.",
        "On retire 14 jours à cette date, ou, ce qui revient au même, on ajoute 28 − 14 = 14 jours au 3 novembre.",
        "L'ovulation est estimée au **mardi 17 novembre 2026**.",
        "La fenêtre de fertilité commence 5 jours avant : le **jeudi 12 novembre 2026**.",
      ],
      suite: [
        "Les jours fertiles vont donc du 12 au 17 novembre inclus, soit 6 jours. Si les règles suivantes arrivent bien le 1er décembre, l'ovulation précédente a eu lieu 14 jours avant, soit le 17 novembre.",
      ],
    },
    {
      titre: "Exemple pas à pas : un cycle de 32 jours",
      paras: [
        "Gardons les mêmes règles, le 3 novembre 2026, mais avec des cycles de 32 jours. L'ovulation ne tombe plus au même endroit du cycle.",
      ],
      etapes: [
        "Les prochaines règles sont attendues le **samedi 5 décembre 2026** (3 novembre + 32 jours).",
        "On calcule 32 − 14 = 18 jours après le 3 novembre.",
        "L'ovulation est estimée au **samedi 21 novembre 2026**, vers le 18e jour du cycle.",
        "La fenêtre de fertilité débute 5 jours avant : le **lundi 16 novembre 2026**.",
      ],
      suite: [
        "Pour ce cycle, les jours fertiles vont du 16 au 21 novembre inclus. Avec 4 jours de cycle en plus, l'ovulation est décalée de 4 jours : cela montre pourquoi la règle « 14 jours après les règles » ne convient pas à tout le monde.",
      ],
    },
    {
      titre: "Tableau : ovulation selon la durée du cycle",
      paras: [
        "Voici le jour d'ovulation estimé pour quelques durées de cycle, avec la même méthode (durée du cycle − 14).",
      ],
      tableau: {
        colonnes: ["Durée du cycle", "Ovulation estimée", "Début de la fenêtre de fertilité"],
        lignes: [
          ["24 jours", "Vers le 10e jour", "Vers le 5e jour"],
          ["26 jours", "Vers le 12e jour", "Vers le 7e jour"],
          ["28 jours", "Vers le 14e jour", "Vers le 9e jour"],
          ["30 jours", "Vers le 16e jour", "Vers le 11e jour"],
          ["32 jours", "Vers le 18e jour", "Vers le 13e jour"],
          ["35 jours", "Vers le 21e jour", "Vers le 16e jour"],
        ],
      },
    },
    {
      titre: "Pourquoi une fenêtre de fertilité de 6 jours ?",
      paras: [
        "Une grossesse est possible les jours qui précèdent l'ovulation, pas seulement le jour même. Les spermatozoïdes peuvent survivre **jusqu'à 5 jours**, alors que l'ovule ne vit que **12 à 24 heures**.",
        "L'étude de Wilcox et ses collègues, publiée dans le New England Journal of Medicine en 1995, a mesuré la fertilité selon le moment des rapports. Elle conduit à retenir une fenêtre d'environ **6 jours** : les 5 jours qui précèdent l'ovulation et le jour de l'ovulation.",
      ],
    },
    {
      titre: "Comment utiliser le calculateur d'ovulation",
      paras: [
        "Dans « Premier jour des dernières règles », choisissez la date avec le sélecteur. Dans « Durée du cycle (jours) », cliquez sur les boutons de 21 à 35 jours. Le cycle est réglé sur 28 jours au départ. Cliquez ensuite sur « Calculer mon ovulation ».",
        "Le calculateur affiche quatre résultats : la **date d'ovulation** (avec son jour du cycle), la **fenêtre de fertilité**, la **date des prochaines règles** et la **date de la prochaine ovulation**. Il montre aussi un calendrier où l'ovulation, la fenêtre de fertilité et les règles ont chacune leur couleur, ainsi qu'un détail jour par jour.",
        "Pour vérifier avec l'exemple ci-dessus, saisissez le 3 novembre 2026 et 28 jours : l'ovulation affichée est le mardi 17 novembre 2026, et les prochaines règles le mardi 1er décembre 2026. Pour 32 jours, l'ovulation est le samedi 21 novembre 2026.",
      ],
      encadre:
        "Le calculateur colore la fenêtre de fertilité du 5e jour avant l'ovulation jusqu'au lendemain de l'ovulation, soit 7 jours sur le calendrier. Pour l'exemple de 28 jours, la fenêtre va ainsi du 12 au 18 novembre. Le calcul décrit dans cet article, lui, s'arrête au jour de l'ovulation (6 jours). Le calculateur ne tient pas compte de vos éventuels autres indices (tests, température).",
    },
    {
      titre: "Les pièges pratiques",
      liste: [
        "**Compter depuis le mauvais jour.** Le jour 1 est le premier jour des règles, pas le dernier. Comptez la durée entre deux débuts de règles successifs.",
        "**Prendre un seul cycle pour référence.** Notez la durée de plusieurs cycles dans un agenda : si elle change beaucoup, la date calculée sera moins fiable.",
        "**Penser que l'ovulation tombe toujours au 14e jour.** Ce n'est vrai que pour un cycle de 28 jours.",
        "**Oublier que la durée de 14 jours varie.** Elle est moyenne : votre ovulation peut avoir lieu un peu plus tôt ou un peu plus tard que la date calculée.",
      ],
    },
    {
      titre: "Quand le calcul devient moins fiable",
      paras: [
        "Avec des **cycles irréguliers**, la date des prochaines règles est difficile à prévoir, et le calcul est donc beaucoup moins fiable. D'autres indices peuvent alors aider : les **tests d'ovulation** (urinaires) et la **courbe de température**.",
        "Le calcul du calendrier n'est **pas une méthode de contraception fiable**. Une date estimée peut se tromper de plusieurs jours, et les spermatozoïdes survivent jusqu'à 5 jours.",
        "Si vous avez du mal à concevoir, ou pour toute question médicale, parlez-en à un médecin, un gynécologue ou une sage-femme.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Ajouter 14 jours aux dernières règles pour tous les cycles.** Il faut retirer 14 jours à la durée du cycle.",
        "**Ne viser que le jour de l'ovulation.** Les 5 jours qui précèdent comptent aussi dans la fenêtre de fertilité.",
        "**Considérer la date obtenue comme une certitude.** C'est une estimation fondée sur des moyennes.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-ovulation",
    nom: "Calcul d'ovulation",
    titre: "Calculez votre date d'ovulation",
    texte:
      "Saisissez le premier jour de vos dernières règles et la durée de votre cycle : le calculateur affiche votre ovulation, votre fenêtre de fertilité et vos prochaines règles.",
    bouton: "Ouvrir le calculateur d'ovulation",
  },
  faq: [
    {
      q: "Quand ovule-t-on ?",
      a: "En moyenne 14 jours avant les règles suivantes. Pour un cycle de 28 jours, c'est vers le 14e jour ; pour un cycle de 32 jours, vers le 18e jour. Cette durée de 14 jours est une moyenne qui varie d'une femme à l'autre.",
    },
    {
      q: "Comment calculer ses jours fertiles ?",
      a: "Estimez d'abord le jour d'ovulation en retirant 14 jours à la durée de votre cycle. Les jours fertiles sont les 5 jours qui précèdent l'ovulation et le jour de l'ovulation, soit environ 6 jours.",
    },
    {
      q: "Combien de temps vivent les spermatozoïdes et l'ovule ?",
      a: "Les spermatozoïdes peuvent survivre jusqu'à 5 jours. L'ovule ne vit que 12 à 24 heures. C'est pourquoi la fenêtre de fertilité commence avant l'ovulation.",
    },
    {
      q: "Le calcul est-il fiable avec des cycles irréguliers ?",
      a: "Il est beaucoup moins fiable, car la date des prochaines règles est difficile à prévoir. Les tests d'ovulation urinaires et la courbe de température donnent d'autres indices.",
    },
    {
      q: "Puis-je utiliser ce calcul comme contraception ?",
      a: "Non. Pour une question médicale ou une difficulté à concevoir, parlez-en à un médecin, un gynécologue ou une sage-femme.",
    },
  ],
  sources: [
    {
      label:
        "Wilcox AJ et al. - Timing of sexual intercourse in relation to ovulation (NEJM, 1995)",
      url: "https://doi.org/10.1056/NEJM199512073332301",
    },
  ],
  datePublication: "2026-10-27",
  dateAffichee: "27 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
