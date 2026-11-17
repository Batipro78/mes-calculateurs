import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment passer du salaire net au brut ?";
const DESCRIPTION =
  "Pour passer du net au brut, on divise le net par 0,78 (non-cadre), 0,75 (cadre) ou 0,85 (fonction publique). Exemples à 2 000 € net, taux horaire, tableau et pièges.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-passer-du-salaire-net-au-brut" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "salaire net en brut, salaire net en brut calcul, 2000 euros net en brut, net en brut cadre, net en brut horaire, passer du net au brut",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-passer-du-salaire-net-au-brut",
  fil: "Salaire net en brut",
  emoji: "💶",
  couleur: "from-emerald-500 to-teal-600",
  h1: "Comment passer du salaire net au brut ?",
  chapo:
    "Vous visez un salaire net, par exemple pour une négociation ou une offre d'emploi, et vous voulez savoir quel brut demander. Voici la méthode, des exemples chiffrés pour un non-cadre, un cadre et la fonction publique, et l'erreur à ne pas faire.",
  reponse:
    "**Brut = net ÷ (1 − taux de cotisations).** Pour un non-cadre (22 %), on divise le net par 0,78 : 2 000 € net correspondent à environ **2 564 € brut**. Pour un cadre (25 %), on divise par 0,75, et pour la fonction publique (15 %) par 0,85. Ce sont des taux moyens : le bulletin de paie fait foi.",
  sections: [
    {
      titre: "La formule du net au brut",
      paras: [
        "Le salaire brut est le montant avant cotisations. Le net est ce qu'il reste une fois les cotisations retirées. Si le taux de cotisations est de 22 %, le net représente 78 % du brut : net = brut × 0,78. Pour revenir au brut, on fait l'opération inverse.",
        "Les taux utilisés par le calculateur du site sont les suivants :",
      ],
      liste: [
        "**Non-cadre :** 22 %, donc brut = net ÷ 0,78.",
        "**Cadre :** 25 %, donc brut = net ÷ 0,75.",
        "**Fonction publique :** 15 %, donc brut = net ÷ 0,85.",
      ],
      suite: [
        "Ces taux sont des moyennes. Le taux réel dépend de votre entreprise, de la mutuelle et de la prévoyance. Le résultat est donc une estimation : votre bulletin de paie reste la référence. Pour le chemin inverse, du brut vers le net, voyez l'article [brut en net : quel pourcentage enlever](/brut-en-net-quel-pourcentage).",
      ],
    },
    {
      titre: "Pourquoi on n'ajoute pas 22 % au net",
      paras: [
        "Le réflexe est d'ajouter 22 % au net. C'est faux : les 22 % se calculent sur le **brut**, pas sur le net. Prenons 2 000 € net en non-cadre.",
      ],
      etapes: [
        "Méthode fausse : 2 000 × 1,22 = 2 440 €.",
        "Méthode juste : 2 000 ÷ 0,78 = **2 564,10 €**.",
        "Vérification : 2 440 × 0,78 = 1 903,20 € seulement, loin des 2 000 € visés. Alors que 2 564,10 × 0,78 = 2 000 €.",
      ],
      suite: [
        "L'écart est de 124,10 € par mois : en retenant 2 440 €, on sous-estime le brut nécessaire. Pour retrouver le taux réel appliqué au net, on peut aussi dire que 22 % du brut représentent environ 28,2 % du net (22 ÷ 78).",
      ],
    },
    {
      titre: "Exemple 1 : 1 500 € net en non-cadre",
      etapes: [
        "On divise par 0,78 : 1 500 ÷ 0,78 = **1 923,08 € brut** par mois.",
        "Les cotisations représentent 1 923,08 − 1 500 = 423,08 € par mois.",
        "Sur 12 mois : 1 923,08 × 12 = 23 076,96 € brut par an, pour 18 000 € net.",
      ],
    },
    {
      titre: "Exemple 2 : 2 000 € net en non-cadre",
      etapes: [
        "On divise par 0,78 : 2 000 ÷ 0,78 = **2 564,10 € brut** par mois.",
        "Les cotisations : 2 564,10 − 2 000 = 564,10 € par mois.",
        "Sur 12 mois : 2 564,10 × 12 = 30 769,20 € brut par an, pour 24 000 € net.",
      ],
      suite: [
        "C'est la réponse à la question « 2 000 euros net en brut » pour un salarié du privé non-cadre : un peu plus de 2 564 € brut.",
      ],
    },
    {
      titre: "Exemple 3 : 2 500 € net en non-cadre",
      etapes: [
        "On divise par 0,78 : 2 500 ÷ 0,78 = **3 205,13 € brut** par mois.",
        "Les cotisations : 3 205,13 − 2 500 = 705,13 € par mois.",
        "Sur 12 mois : 3 205,13 × 12 = 38 461,56 € brut par an, pour 30 000 € net.",
      ],
    },
    {
      titre: "Exemple 4 : 3 000 € net en cadre",
      paras: ["Pour un cadre, le taux est de 25 %, donc on divise par 0,75."],
      etapes: [
        "3 000 ÷ 0,75 = **4 000 € brut** par mois.",
        "Les cotisations : 4 000 − 3 000 = 1 000 € par mois.",
        "Sur 12 mois : 4 000 × 12 = 48 000 € brut par an, pour 36 000 € net.",
      ],
      suite: [
        "Avec le taux non-cadre, on aurait trouvé 3 000 ÷ 0,78 = 3 846,15 € : l'écart avec le statut cadre est de 153,85 € par mois. Le statut change donc nettement le brut nécessaire pour un même net.",
      ],
    },
    {
      titre: "Exemple 5 : 2 000 € net dans la fonction publique",
      paras: ["Le taux est de 15 %, donc on divise par 0,85."],
      etapes: [
        "2 000 ÷ 0,85 = **2 352,94 € brut** par mois.",
        "Les cotisations : 2 352,94 − 2 000 = 352,94 € par mois.",
        "Sur 12 mois : 2 352,94 × 12 = 28 235,28 € brut par an, pour 24 000 € net.",
      ],
      suite: [
        "Pour le même net de 2 000 €, il faut donc 2 564,10 € brut en non-cadre et seulement 2 352,94 € dans la fonction publique, soit 211,16 € de moins.",
      ],
    },
    {
      titre: "Passer du net au brut horaire",
      paras: [
        "La formule est la même sur le taux horaire : on divise le net de l'heure par le coefficient du statut. Prenons 12 € net de l'heure en non-cadre.",
      ],
      etapes: [
        "On divise par 0,78 : 12 ÷ 0,78 = **15,38 € brut** de l'heure.",
        "Les cotisations représentent 15,38 − 12 = 3,38 € par heure.",
      ],
      suite: [
        "La méthode « net + 22 % » donnerait 12 × 1,22 = 14,64 €, soit 0,74 € de moins que le bon résultat. Cette fois, le calculateur ne propose pas de saisie horaire : faites ce calcul à la main avec la formule, ou convertissez d'abord le taux horaire en salaire mensuel selon votre contrat.",
      ],
    },
    {
      titre: "Tableau : du net au brut de 1 500 € à 3 500 €",
      paras: [
        "Ce tableau applique la formule à des nets mensuels courants. Les bruts sont arrondis au centime ; ce sont des estimations avant impôt.",
      ],
      tableau: {
        colonnes: ["Net mensuel", "Brut non-cadre (÷ 0,78)", "Brut cadre (÷ 0,75)"],
        lignes: [
          ["1 500 €", "1 923,08 €", "2 000,00 €"],
          ["2 000 €", "2 564,10 €", "2 666,67 €"],
          ["2 500 €", "3 205,13 €", "3 333,33 €"],
          ["3 000 €", "3 846,15 €", "4 000,00 €"],
          ["3 500 €", "4 487,18 €", "4 666,67 €"],
        ],
      },
    },
    {
      titre: "Brut annuel et net avant impôt",
      paras: [
        "Pour passer du mensuel à l'annuel, multipliez par 12, à condition qu'il n'y ait pas de 13e mois. S'il y en a un, le calcul annuel est différent et ne se résume pas à un simple ×12.",
        "Le net dont on parle ici est le net **avant impôt sur le revenu**. Le prélèvement à la source vient en plus, sur une ligne à part du bulletin. Pour estimer cet impôt, utilisez le [simulateur d'impôt sur le revenu](/simulateur-impot-revenu) ; pour savoir où se situe votre foyer, voyez [comment connaître sa tranche d'imposition](/comment-connaitre-sa-tranche-imposition).",
      ],
      encadre:
        "Les montants de ces exemples sont des hypothèses pour illustrer la méthode. Remplacez-les par votre net et votre statut.",
    },
    {
      titre: "Comment utiliser le calculateur brut / net",
      paras: [
        "Dans le calculateur, choisissez d'abord **Net → Brut** à la ligne « Je connais mon salaire ». Saisissez ensuite le montant net dans le champ, en euros, puis choisissez la période **Mensuel** ou **Annuel**. Si vous indiquez un montant annuel, il est divisé par 12 pour le calcul. Enfin, sélectionnez votre statut : non-cadre (22 %), cadre (25 %) ou fonction publique (15 %). Le montant proposé au départ est 2 500 €.",
        "À droite, vous lisez le **salaire brut mensuel** et le brut annuel, ainsi que le net mensuel et annuel, le montant des cotisations par mois et par an, et une barre qui montre la part du net et celle des cotisations. Le calculateur n'applique que ces trois taux moyens : il ne tient pas compte de votre mutuelle ni de votre convention collective, et il n'a pas de mode horaire.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Ajouter 22 % au net.** C'est l'erreur la plus courante : il faut diviser par 0,78, pas multiplier par 1,22.",
        "**Utiliser le mauvais statut.** À net égal, le brut est plus élevé pour un cadre que pour un non-cadre.",
        "**Confondre net avant et après impôt.** Le net dont on parle ici est avant prélèvement à la source.",
        "**Prendre le taux moyen pour un taux exact.** Le vrai taux dépend de l'entreprise, de la mutuelle et de la prévoyance.",
        "**Multiplier par 12 sans réfléchir.** Avec un 13e mois, le total annuel change.",
      ],
    },
  ],
  calculateur: {
    href: "/salaire-brut-net",
    nom: "Salaire brut / net",
    titre: "Convertissez votre net en brut",
    texte:
      "Choisissez Net → Brut, saisissez votre montant, la période et votre statut : le calculateur affiche le brut mensuel et annuel, ainsi que les cotisations.",
    bouton: "Ouvrir le calculateur brut / net",
  },
  faq: [
    {
      q: "Comment calculer le brut à partir du net ?",
      a: "On divise le net par (1 − taux de cotisations). Pour un non-cadre à 22 %, on divise par 0,78 ; pour un cadre à 25 %, par 0,75 ; pour la fonction publique à 15 %, par 0,85.",
    },
    {
      q: "Combien font 2 000 euros net en brut ?",
      a: "Environ 2 564 € brut par mois pour un non-cadre, 2 667 € pour un cadre et 2 353 € dans la fonction publique. Ce sont des estimations basées sur des taux moyens.",
    },
    {
      q: "Pourquoi ne suffit-il pas d'ajouter 22 % au net ?",
      a: "Parce que les 22 % s'appliquent au brut, pas au net. Pour 2 000 € net, ajouter 22 % donne 2 440 € alors que le bon calcul donne 2 564,10 €, soit 124,10 € de plus.",
    },
    {
      q: "Comment passer du net au brut pour un cadre ?",
      a: "On divise le net par 0,75. Pour 3 000 € net par mois, on obtient 4 000 € brut par mois, soit 48 000 € brut par an.",
    },
    {
      q: "Le net indiqué est-il avant ou après impôt ?",
      a: "Avant impôt sur le revenu. Le prélèvement à la source s'ajoute sur le bulletin de paie : le montant réellement versé sur votre compte peut donc être plus bas.",
    },
  ],
  sources: [
    {
      label: "Service-public.fr : salaire brut et net",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F559",
    },
  ],
  datePublication: "2026-11-16",
  dateAffichee: "16 novembre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
