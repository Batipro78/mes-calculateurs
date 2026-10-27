import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer l'indemnité de licenciement ?";
const DESCRIPTION =
  "L'indemnité légale de licenciement vaut au minimum 1/4 de mois de salaire par année d'ancienneté jusqu'à 10 ans, puis 1/3 de mois au-delà. Conditions, salaire de référence, exemples chiffrés et pièges.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-l-indemnite-de-licenciement" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "indemnité de licenciement, indemnité légale de licenciement calcul, à combien ai-je droit, 1/4 de mois par année, salaire de référence, ancienneté, rupture conventionnelle",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-l-indemnite-de-licenciement",
  fil: "Indemnité de licenciement",
  emoji: "📦",
  couleur: "from-slate-600 to-slate-800",
  h1: "Comment calculer l'indemnité de licenciement ?",
  chapo:
    "Après un licenciement, la première question est souvent : à combien ai-je droit ? Le calcul légal repose sur trois éléments : le salaire de référence, l'ancienneté et deux taux, l'un jusqu'à 10 ans, l'autre au-delà. Voici la méthode, avec des exemples chiffrés.",
  reponse:
    "**L'indemnité légale minimale vaut 1/4 de mois de salaire par année d'ancienneté jusqu'à 10 ans, puis 1/3 de mois par année au-delà de 10 ans.** Il faut au moins 8 mois d'ancienneté ininterrompue chez le même employeur. Pour 1 500 € de salaire de référence et 3 ans et 6 mois d'ancienneté, cela donne 1 312,50 €.",
  sections: [
    {
      titre: "Qui a droit à l'indemnité légale de licenciement ?",
      paras: [
        "L'indemnité est due en cas de licenciement pour motif personnel, pour motif économique ou pour inaptitude. Elle n'est **pas due en cas de faute grave ou lourde**. Dans ce cas, seule une convention collective, le contrat de travail ou un usage peut prévoir une somme.",
        "Une condition d'ancienneté s'ajoute : il faut avoir au moins **8 mois d'ancienneté ininterrompue** chez le même employeur. Cette ancienneté s'apprécie à la date d'envoi de la lettre de licenciement.",
      ],
      visuel: {
        fichier: "indemnite-licenciement-carton",
        alt: "Un bureau vide dans un open space, avec un carton d'archives contenant une plante, une tasse, des carnets et un cadre vu de dos, devant un écran éteint.",
        legende:
          "Le jour du départ, le carton est prêt : reste à savoir quelle indemnité le licenciement ouvre.",
      },
    },
    {
      titre: "La formule : deux taux selon l'ancienneté",
      paras: [
        "Le montant minimum se calcule à partir du salaire de référence mensuel, noté S, et de l'ancienneté, comptée en années.",
      ],
      liste: [
        "Jusqu'à 10 ans d'ancienneté : **S × 1/4 × nombre d'années**.",
        "Au-delà de 10 ans : on garde les 10 premières années à 1/4, puis chaque année supplémentaire compte pour **1/3 de mois**.",
      ],
      tableau: {
        colonnes: ["Ancienneté", "Salaire de référence", "Indemnité légale minimale"],
        lignes: [
          ["2 ans", "1 500 €", "750 €"],
          ["5 ans", "1 500 €", "1 875 €"],
          ["10 ans", "1 500 €", "3 750 €"],
          ["15 ans", "1 500 €", "6 250 €"],
          ["20 ans", "1 500 €", "8 750 €"],
        ],
      },
      suite: [
        "Le taux ne s'applique pas à tout le montant d'un coup : à 15 ans, les 10 premières années comptent à 1/4 de mois et seules les 5 dernières à 1/3 de mois.",
      ],
    },
    {
      titre: "Le salaire de référence : le plus avantageux des deux moyennes",
      paras: [
        "Le salaire de référence est le **plus avantageux** entre deux moyennes mensuelles : celle des 12 derniers mois et celle des 3 derniers mois.",
        "Exemple : une personne a gagné 2 000 € par mois pendant 9 mois, puis 2 300 € par mois pendant les 3 derniers mois.",
      ],
      etapes: [
        "Moyenne des 12 derniers mois : (2 000 × 9 + 2 300 × 3) ÷ 12 = 24 900 ÷ 12 = 2 075 €.",
        "Moyenne des 3 derniers mois : 2 300 €.",
        "On retient la plus favorable : **2 300 €**.",
      ],
      suite: [
        "Deux cas particuliers. Si une prime annuelle tombe dans les 3 derniers mois, on ne compte que 1/12 de son montant par mois : une prime de 3 600 € ajoute donc 300 € par mois. En cas d'arrêt maladie, on prend les mois qui précèdent l'arrêt.",
      ],
    },
    {
      titre: "L'ancienneté : années incomplètes et préavis",
      paras: [
        "Les années incomplètes ne sont pas perdues : le calcul est **proportionnel au nombre de mois complets**. Trois ans et six mois comptent pour 3,5 ans, et douze ans et neuf mois pour 12,75 ans.",
        "L'ancienneté se compte **jusqu'à la fin du préavis**, c'est-à-dire jusqu'à la date de rupture effective du contrat. Le préavis allonge donc l'ancienneté retenue, même si le calcul de la condition de 8 mois, lui, se fait à la date d'envoi de la lettre.",
      ],
    },
    {
      titre: "Premier exemple : 1 500 € et 3 ans et 6 mois",
      etapes: [
        "Salaire de référence : 1 500 €.",
        "Ancienneté : 3 ans et 6 mois, soit 3,5 ans. Elle reste sous 10 ans, donc un seul taux : 1/4.",
        "Calcul : 1 500 × 1/4 × 3,5 = 1 500 × 0,875.",
        "Résultat : **1 312,50 €**, soit 0,875 mois de salaire.",
      ],
      suite: [
        "On retrouve le montant donné en exemple par Service-public.fr.",
      ],
    },
    {
      titre: "Second exemple : 1 500 € et 12 ans et 9 mois",
      paras: [
        "Ici, l'ancienneté dépasse 10 ans. Il faut donc couper le calcul en deux parts.",
      ],
      etapes: [
        "Salaire de référence : 1 500 €.",
        "Ancienneté : 12 ans et 9 mois, soit 12,75 ans.",
        "Part des 10 premières années : 1 500 × 1/4 × 10 = 3 750 €.",
        "Part au-delà de 10 ans : 2,75 ans restants, soit 1 500 × 1/3 × 2,75 = 1 375 €.",
        "Total : 3 750 + 1 375 = **5 125 €**.",
      ],
      suite: [
        "Là encore, le résultat est celui de l'exemple officiel.",
      ],
    },
    {
      titre: "Convention collective, contrat et rupture conventionnelle",
      paras: [
        "Le calcul ci-dessus donne un **minimum légal**. Une convention collective ou le contrat de travail peut prévoir une indemnité plus élevée. La personne licenciée touche alors la plus favorable des deux. Pensez donc à lire votre convention collective avant de conclure que le minimum légal est le montant final.",
        "En cas de rupture conventionnelle, l'indemnité spécifique ne peut pas être inférieure à l'indemnité légale de licenciement (article L1237-13 du code du travail). Le calcul légal sert donc de plancher à la négociation.",
      ],
    },
    {
      titre: "Comment utiliser le calculateur",
      paras: [
        "Dans « Salaire mensuel brut de référence », saisissez le salaire de référence déjà calculé : le calculateur ne le déduit pas de vos fiches de paie. Vous pouvez aussi cliquer sur l'un des montants proposés, de 1 800 € à 4 500 €.",
        "Dans « Ancienneté dans l'entreprise », indiquez les années et les mois. Des boutons proposent des durées de 2 à 20 ans. Comptez l'ancienneté jusqu'à la fin du préavis. Choisissez ensuite le motif : licenciement, rupture conventionnelle ou mise à la retraite. Dans les trois cas, le calculateur applique la même formule.",
        "Vous lisez l'**indemnité légale minimale** en grand, avec le nombre de mois de salaire correspondant. Le « Détail du calcul » montre les deux parts quand l'ancienneté dépasse 10 ans. Si l'ancienneté est inférieure à 8 mois, un message « Ancienneté insuffisante » s'affiche.",
      ],
      encadre:
        "Le calculateur ne connaît ni votre convention collective ni la nature de la faute. Il ne calcule que le minimum légal, à partir du salaire et de l'ancienneté que vous saisissez.",
    },
    {
      titre: "Pièges pratiques",
      liste: [
        "**Prendre le dernier salaire au lieu du salaire de référence.** Comparez toujours la moyenne des 12 derniers mois et celle des 3 derniers mois.",
        "**Compter une prime annuelle en entier.** Dans les 3 derniers mois, seul 1/12 de son montant est pris en compte par mois.",
        "**Oublier le préavis dans l'ancienneté.** Elle se compte jusqu'à la fin du préavis.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Appliquer 1/3 de mois dès la première année.** Ce taux ne concerne que les années au-delà de la dixième.",
        "**Ignorer les mois.** Les années incomplètes comptent au prorata des mois complets.",
        "**Croire que le minimum légal est toujours le montant final.** La convention collective ou le contrat peut prévoir mieux.",
        "**Attendre une indemnité légale après une faute grave ou lourde.** Elle n'est pas due dans ce cas.",
      ],
    },
  ],
  calculateur: {
    href: "/indemnite-licenciement",
    nom: "Indemnité de licenciement",
    titre: "Calculez votre indemnité légale minimale",
    texte:
      "Saisissez votre salaire de référence et votre ancienneté : le calculateur affiche l'indemnité légale minimale, le nombre de mois de salaire et le détail du calcul.",
    bouton: "Ouvrir le calculateur d'indemnité",
  },
  faq: [
    {
      q: "Comment calcule-t-on l'indemnité légale de licenciement ?",
      a: "On multiplie le salaire de référence par 1/4 pour chaque année d'ancienneté jusqu'à 10 ans, puis par 1/3 pour chaque année au-delà. Avec 1 500 € et 3 ans et 6 mois, on obtient 1 312,50 €.",
    },
    {
      q: "Quelle ancienneté faut-il pour avoir droit à l'indemnité ?",
      a: "Il faut au moins 8 mois d'ancienneté ininterrompue chez le même employeur, appréciée à la date d'envoi de la lettre de licenciement.",
    },
    {
      q: "Quel salaire faut-il prendre comme référence ?",
      a: "Le plus avantageux entre la moyenne mensuelle des 12 derniers mois et celle des 3 derniers mois. Une prime annuelle versée dans les 3 derniers mois n'est comptée que pour 1/12 de son montant par mois.",
    },
    {
      q: "L'indemnité est-elle due en cas de faute grave ?",
      a: "Non, il n'y a pas d'indemnité légale en cas de faute grave ou lourde. Une convention collective, le contrat ou un usage peut toutefois prévoir mieux.",
    },
    {
      q: "Et en cas de rupture conventionnelle ?",
      a: "L'indemnité spécifique de rupture conventionnelle ne peut pas être inférieure à l'indemnité légale de licenciement (article L1237-13 du code du travail).",
    },
  ],
  sources: [
    {
      label: "Service-public.fr - Indemnité de licenciement d'un salarié en CDI",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F987",
    },
    {
      label: "Service-public.fr - Rupture conventionnelle d'un salarié du secteur privé",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F19030",
    },
  ],
  datePublication: "2026-10-27",
  dateAffichee: "27 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
