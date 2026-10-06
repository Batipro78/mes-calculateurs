import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Prime d'activité : pour qui et jusqu'à quel salaire ? (2026)";
const DESCRIPTION =
  "Qui a droit à la prime d'activité, quelles conditions, quel salaire maximum et quel montant en 2026 : forfait de 638,28 €, 59,85 % des revenus, bonification, exemple chiffré.";

export const metadata: Metadata = {
  alternates: { canonical: "/prime-d-activite-pour-qui-quel-salaire" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "prime d'activité pour qui, prime d'activité quel salaire, prime d'activité quelles conditions, prime d'activité quel montant, prime d'activité quel revenu, qui a droit à la prime d'activité, prime d'activité salaire maximum, prime d'activité quel montant déclarer, prime d'activité étudiant",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/prime-d-activite-pour-qui-quel-salaire",
  fil: "Prime d'activité : pour qui, quel salaire",
  emoji: "💶",
  couleur: "from-emerald-500 to-teal-600",
  h1: "Prime d'activité : pour qui et jusqu'à quel salaire ?",
  chapo:
    "Cet article s'adresse aux salariés, aux apprentis, aux étudiants qui travaillent et aux indépendants qui se demandent s'ils ont droit à la prime d'activité, et jusqu'à quel salaire. Il donne les conditions, la formule de calcul en vigueur depuis le 1er avril 2026 et un exemple chiffré.",
  reponse:
    "Il faut avoir **au moins 18 ans**, travailler, vivre en France et avoir des revenus modestes. Pour une personne seule sans enfant, les pouvoirs publics parlent d'une prime qui cesse **au-delà d'environ 2 000 € nets par mois**. Avec la formule 2026 et sans aide au logement, notre estimation donne par exemple **251 € à 1 400 € net**, et plus rien au-delà d'environ 2 150 €. Ce sont des estimations : la CAF fait foi.",
  sections: [
    {
      titre: "Qui a droit à la prime d'activité ?",
      paras: [
        "D'après Service-Public.fr, un Français doit remplir trois conditions en même temps. Il faut avoir 18 ans ou plus, avoir une activité professionnelle et percevoir des revenus modestes, et résider en France de manière stable et effective. Elle concerne les salariés comme les indépendants.",
        "Quelques cas particuliers à connaître :",
      ],
      liste: [
        "**Un travailleur détaché** temporairement en France n'a pas droit à la prime d'activité.",
        "**Un ressortissant européen** doit avoir droit au séjour en France et y vivre depuis au moins 3 mois au moment de la demande.",
        "**Un étranger d'un autre pays** doit, en plus des conditions d'âge et d'activité, remplir l'une de celles listées par Service-Public.fr. Par exemple : avoir depuis au moins 5 ans un titre de séjour permettant de travailler en France, avoir la carte de résident ou le statut de réfugié.",
        "**Un parent isolé** avec un enfant de moins de 3 ans et un titre de séjour peut aussi y prétendre.",
      ],
      encadre:
        "Le droit ne dépend pas de votre seul salaire : la CAF regarde l'ensemble des ressources du foyer (conjoint, enfants à charge). Pour savoir si vous êtes concerné, le plus sûr est le simulateur de la CAF.",
    },
    {
      titre: "Étudiants et apprentis : un seuil de 1 117,26 €",
      paras: [
        "Les étudiants et les apprentis ne touchent pas la prime dès le premier euro gagné. D'après economie.gouv.fr, le montant net social de leur revenu d'activité mensuel doit être supérieur à 1 117,26 €. Le ministère du Travail précise qu'il s'agit de chaque mois du trimestre de référence.",
        "Il existe une exception : l'étudiant ou l'apprenti qui assume seul la charge d'un ou de plusieurs enfants n'est pas soumis à ce seuil. Le montant net social est le chiffre qui figure sur le bulletin de paie : voir plus bas.",
      ],
    },
    {
      titre: "Comment la prime est calculée en 2026",
      paras: [
        "La formule officielle est la suivante, d'après Service-Public.fr : prime = (montant forfaitaire éventuellement majoré + 59,85 % des revenus professionnels + bonifications individuelles) − les ressources prises en compte du foyer.",
        "Le montant forfaitaire de base est de 638,28 € pour une personne seule depuis le 1er avril 2026, d'après le décret du 30 mars 2026. Il monte avec la taille du foyer (barème de la CAF) :",
      ],
      tableau: {
        colonnes: ["Enfants ou personnes à charge", "Vous vivez seul", "Vous êtes en couple"],
        lignes: [
          ["0", "638,28 €", "957,42 €"],
          ["1", "957,42 €", "1 148,90 €"],
          ["2", "1 148,90 €", "1 340,38 €"],
          ["Par enfant en plus", "255,32 €", "255,32 €"],
        ],
      },
      suite: [
        "La **bonification individuelle** s'ajoute pour chaque membre du foyer qui travaille. Elle n'est pas due sous 709,18 € de revenu d'activité par mois. Elle atteint son maximum, 240,63 € par mois, à partir de 1 658,76 €, et progresse entre les deux. Ces deux seuils sont ceux du barème de la CAF ; la fiche de Service-Public.fr affichait, au moment où nous écrivons, d'autres valeurs (726,29 € et 1 698,78 €).",
        "Un **forfait logement** est ajouté à vos ressources si vous êtes logé gratuitement, propriétaire sans emprunt ou bénéficiaire d'une aide au logement (voir le [simulateur APL](/simulateur-apl)) : 76,59 € pour une personne seule. Enfin, la prime n'est pas versée en dessous de 15 €.",
      ],
      encadre:
        "Deux changements en 2026 : le montant forfaitaire a été revalorisé de 0,8 %, et la bonification a été augmentée pour les revenus situés entre 1 442,40 € (le Smic) et 1 658,76 €. Les premiers effets se voient à partir de juillet 2026, selon les mois de votre déclaration.",
    },
    {
      titre: "Quel salaire pour quelle prime ? Un exemple à 1 400 € net",
      paras: [
        "Prenons une personne seule, sans enfant, qui gagne 1 400 € net social par mois, sans aide au logement et sans autre ressource. Voici le calcul avec la formule 2026 :",
      ],
      etapes: [
        "**Montant forfaitaire** : 638,28 €.",
        "**Part des revenus** : 1 400 × 59,85 % = 837,90 €.",
        "**Bonification** : 1 400 € se situe entre 709,18 € et 1 658,76 €. On calcule 240,63 × (1 400 − 709,18) ÷ (1 658,76 − 709,18) = 175,06 €.",
        "**Total avant ressources** : 638,28 + 837,90 + 175,06 = 1 651,24 €.",
        "**On retire les ressources du foyer**, ici le salaire : 1 651,24 − 1 400 = **251,24 € par mois**.",
      ],
      suite: [
        "Si cette personne avait en plus une aide au logement, on retirerait aussi le forfait logement de 76,59 € : il resterait environ 175 €.",
      ],
    },
    {
      titre: "La prime selon le salaire",
      paras: [
        "Le même calcul, refait pour d'autres salaires, donne le tableau ci-dessous. Entre 800 € et 1 600 €, la prime baisse d'environ 15 centimes par euro gagné en plus, parce que la bonification augmente en même temps. Au-delà de 1 658,76 €, la bonification ne bouge plus et la prime baisse d'environ 40 centimes par euro : le salaire est retiré en entier alors que seuls 59,85 % sont ajoutés.",
      ],
      tableau: {
        colonnes: ["Salaire net par mois", "Prime estimée (seul, sans enfant, sans logement)"],
        lignes: [
          ["800 €", "340 €"],
          ["1 000 €", "310 €"],
          ["1 200 €", "281 €"],
          ["1 400 €", "251 €"],
          ["1 600 €", "222 €"],
          ["1 800 €", "156 €"],
          ["2 000 €", "76 €"],
          ["2 200 €", "0 € (sous le seuil de 15 €)"],
        ],
      },
      visuel: {
        fichier: "prime-activite-selon-salaire",
        alt: "Prime d'activité estimée selon le salaire net en 2026, personne seule sans enfant : 340 € à 800 €, 310 € à 1 000 €, 251 € à 1 400 €, 156 € à 1 800 €, 76 € à 2 000 € et 0 € à 2 200 €",
        legende:
          "Estimation avec la formule 2026 (forfait 638,28 €, 59,85 % du salaire, bonification), pour une personne seule sans enfant ni aide au logement. La CAF fait foi.",
      },
      encadre:
        "Pour vérifier notre méthode, nous l'avons appliquée à un exemple du ministère du Travail : une personne seule payée 1,4 Smic (2 020 € net) touche 70 € après la réforme. Notre formule donne 68 €. L'écart de quelques euros peut venir d'arrondis.",
    },
    {
      titre: "Jusqu'à quel salaire touche-t-on la prime d'activité ?",
      paras: [
        "Le ministère du Travail donne un repère : la prime cesse d'être versée au-delà d'environ 2 000 € nets mensuels pour une personne seule, ou 3 450 € nets pour un couple dont un seul membre travaille et qui a deux enfants.",
        "Notre calcul retrouve cet ordre de grandeur. Pour une personne seule sans enfant et sans autre ressource, la prime tombe sous 15 € vers 2 150 € net et s'annule vers 2 190 €. Si elle bénéficie d'une aide au logement, le forfait logement fait baisser ce plafond d'environ 190 € : il tombe alors autour de 2 000 €.",
        "Le plafond monte avec la taille du foyer, puisque le montant forfaitaire augmente. Pour passer d'un salaire brut à un net, utilisez le [convertisseur brut net](/salaire-brut-net). Le [calcul de la prime d'activité](/calcul-prime-activite) permet de tester votre situation.",
      ],
    },
    {
      titre: "Quels revenus déclarer, et quand ?",
      paras: [
        "Les droits sont étudiés sur un trimestre de référence. La CAF vous notifie une attribution pour 3 mois, et le montant versé reste fixe pendant ces 3 mois, même si vos revenus changent. Il est ensuite réévalué à chaque déclaration trimestrielle.",
        "Le chiffre à déclarer est le **montant net social**. La CAF précise qu'il est affiché sur tous les bulletins de paie. Vous le retrouvez aussi sur vos relevés de prestations.",
      ],
      liste: [
        "Depuis mars 2025, vos salaires, vos revenus de remplacement et vos autres allocations (chômage, retraites, pensions, arrêts maladie) sont préremplis en montant net social pour tout le foyer. Vous les vérifiez et vous les validez.",
        "Il vous reste à compléter les ressources que la CAF ne connaît pas, par exemple une pension alimentaire.",
        "Le calcul se base sur les ressources des mois M-2 à M-4. Pour une déclaration de mars 2025, ce sont celles de novembre, décembre et janvier.",
        "Tout changement de situation (déménagement, famille, activité, ressources) doit être signalé rapidement à la CAF.",
      ],
      encadre:
        "La prime d'activité n'est pas imposable. Si vous déclarez vos revenus à l'administration fiscale, vous n'avez pas à y faire figurer cette prime.",
    },
  ],
  calculateur: {
    href: "/calcul-prime-activite",
    nom: "Calcul de la prime d'activité",
    titre: "Estimez votre prime d'activité",
    texte:
      "Indiquez votre situation (seul ou en couple, enfants à charge), votre revenu net et un éventuel logement : le calculateur donne une estimation du montant mensuel. Seule la CAF peut confirmer votre droit.",
    bouton: "Ouvrir le calculateur de prime d'activité",
  },
  faq: [
    {
      q: "Prime d'activité : pour qui ?",
      a: "Pour les personnes d'au moins 18 ans, salariées ou indépendantes, qui résident en France de manière stable et ont des revenus modestes. Les étudiants et les apprentis doivent avoir un revenu d'activité mensuel supérieur à 1 117,26 € net social, sauf s'ils élèvent seuls un enfant.",
    },
    {
      q: "Quel salaire maximum pour toucher la prime d'activité ?",
      a: "Pour une personne seule, le ministère du Travail indique qu'elle cesse d'être versée au-delà d'environ 2 000 € nets par mois. Avec la formule 2026, notre estimation sans aide au logement donne une prime qui n'est plus versée au-delà d'environ 2 150 € net (elle passe sous 15 €). Le plafond monte pour un couple ou avec des enfants.",
    },
    {
      q: "Quel montant faut-il déclarer pour la prime d'activité ?",
      a: "Le montant net social, que vous trouvez sur votre bulletin de paie et vos relevés de prestations. Il est en grande partie prérempli dans votre déclaration trimestrielle : vous vérifiez, puis vous complétez avec les ressources manquantes.",
    },
    {
      q: "Quel est le montant de la prime d'activité en 2026 ?",
      a: "Le montant forfaitaire de base est de 638,28 € pour une personne seule depuis le 1er avril 2026. La prime réelle dépend de vos revenus et de votre foyer : à 1 400 € net, une personne seule sans aide au logement obtient environ 251 € selon notre estimation.",
    },
    {
      q: "La prime d'activité est-elle imposable ?",
      a: "Non. D'après Service-Public.fr, elle n'est pas imposable et n'est pas à déclarer à l'administration fiscale.",
    },
    {
      q: "Pourquoi ma prime d'activité baisse-t-elle quand mon salaire augmente ?",
      a: "Parce que le salaire entier est retiré du calcul, alors que seuls 59,85 % sont ajoutés. Chaque euro gagné en plus fait donc baisser la prime d'environ 40 centimes, une fois la bonification maximale atteinte. Vous y gagnez tout de même : le revenu total augmente.",
    },
  ],
  sources: [
    {
      label: "Service-Public.fr : prime d'activité, salarié ou fonctionnaire",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2882",
    },
    {
      label: "CAF : barème de la prime d'activité au 1er avril 2026",
      url: "https://www.caf.fr/professionnels/offres-et-services/accompagnement-des-allocataires/bareme-prime-d-activite",
    },
    {
      label: "CAF : la prime d'activité augmente en 2026",
      url: "https://www.caf.fr/allocataires/actualites/actualites-nationales/la-prime-d-activite-augmente-en-2026",
    },
    {
      label: "Economie.gouv.fr : prime d'activité, pouvez-vous en bénéficier ?",
      url: "https://www.economie.gouv.fr/particuliers/vie-en-entreprise/prime-dactivite-pouvez-vous-en-beneficier",
    },
    {
      label: "Ministère du Travail : réforme de la prime d'activité",
      url: "https://travail-emploi.gouv.fr/reforme-de-la-prime-dactivite-un-effort-inedit-pour-le-pouvoir-dachat-de-ceux-qui-travaillent",
    },
    {
      label: "Légifrance : décret n° 2026-222 du 30 mars 2026",
      url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053733855",
    },
  ],
  datePublication: "2026-10-06",
  dateAffichee: "6 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
