import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment est calculée la taxe foncière ? Dates 2026";
const DESCRIPTION =
  "Taxe foncière 2026 : base = moitié de la valeur locative cadastrale, multipliée par les taux votés. Dates de l'avis, date limite de paiement, mensualisation.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-est-calculee-la-taxe-fonciere" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "comment est calculée la taxe foncière, taxe foncière 2026 calcul, taxe foncière c'est quoi, quand reçoit-on la taxe foncière 2026, taxe foncière 2026 date limite, mensualiser la taxe foncière, augmentation taxe foncière 2026, valeur locative cadastrale",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-est-calculee-la-taxe-fonciere",
  fil: "Comment est calculée la taxe foncière",
  emoji: "🏠",
  couleur: "from-amber-500 to-yellow-600",
  h1: "Comment est calculée la taxe foncière ? Dates et paiement en 2026",
  chapo:
    "Cet article s'adresse aux propriétaires qui veulent comprendre leur avis de taxe foncière : ce qu'elle est, comment son montant est fixé, quand elle arrive, jusqu'à quand la payer et comment l'étaler. Les dates sont celles de 2026.",
  reponse:
    "La taxe foncière sur les propriétés bâties est calculée **sur la moitié de la valeur locative cadastrale** du bien, valeur revalorisée chaque année. On applique ensuite les **taux votés par les collectivités** (commune, intercommunalité, etc.). Elle est due par le propriétaire **au 1er janvier 2026**, pour l'année entière. En 2026, les avis sont disponibles depuis fin août ou septembre, et la date limite de paiement est le **15 octobre** (paiement non dématérialisé, montant de 300 € ou moins) ou le **20 octobre** (paiement en ligne). La mensualisation de 2026 n'est plus possible : il fallait adhérer au plus tard le 30 juin.",
  sections: [
    {
      titre: "La taxe foncière, c'est quoi ?",
      paras: [
        "Selon Service-Public.fr, un propriétaire ou usufruitier de propriétés bâties doit payer la taxe foncière sur les propriétés bâties, appelée TFPB.",
        "L'avis peut aussi comprendre une taxe d'enlèvement des ordures ménagères. Elle est calculée de la même façon, mais avec un taux qui lui est propre.",
      ],
    },
    {
      titre: "Comment le montant est calculé",
      paras: [
        "Le calcul tient en trois éléments. D'après Service-Public.fr, la base d'imposition de la TFPB est égale à la moitié de la valeur locative cadastrale. Cette valeur locative est revalorisée chaque année, en particulier pour tenir compte de l'augmentation des prix. Les taux d'imposition sont votés par les collectivités territoriales.",
        "La valeur locative cadastrale est le niveau de loyer théorique annuel que le bien pourrait produire s'il était loué dans des conditions normales. Elle peut varier si le bien a fait l'objet de travaux importants.",
      ],
      liste: [
        "**Valeur locative cadastrale** : un loyer théorique fixé par l'administration, pas votre loyer réel.",
        "**Base d'imposition** : la moitié de cette valeur, après revalorisation de l'année.",
        "**Taux** : fixés chaque année par les collectivités, qui peuvent les baisser, les maintenir ou les augmenter.",
      ],
      encadre:
        "Formule : taxe foncière = valeur locative revalorisée × 50 % × taux. Elle ne tient pas compte de la taxe d'enlèvement des ordures ménagères, qui s'ajoute sur l'avis.",
    },
    {
      titre: "Exemple chiffré avec une valeur locative de 4 000 €",
      paras: [
        "Exemple fictif : une valeur locative cadastrale de 4 000 € avant la revalorisation de 2026, et un taux global de 40 %. Ces deux chiffres sont des hypothèses, pas des données d'une commune réelle. Le coefficient de revalorisation de 2026 est de 1,008.",
      ],
      etapes: [
        "Valeur locative revalorisée : 4 000 × 1,008 = **4 032 €**.",
        "Base d'imposition : 4 032 × 50 % = **2 016 €**.",
        "Taxe foncière : 2 016 × 40 % = **806,40 €** pour l'année.",
      ],
      suite: [
        "Sans revalorisation, la même taxe aurait été de 800 €. La hausse de 0,8 % de la base ajoute donc 6,40 € ici. Si la collectivité avait relevé son taux de 40 % à 41 %, la taxe aurait gagné environ 20 € de plus.",
      ],
      visuel: {
        fichier: "calcul-taxe-fonciere-2026-exemple",
        alt: "Calcul de la taxe foncière 2026 sur un exemple : valeur locative de 4 000 €, revalorisée à 4 032 €, base de 2 016 €, taxe de 806,40 € avec un taux de 40 %, et dates de paiement des 15, 20 et 26 octobre 2026",
        legende:
          "Le calcul de l'exemple fictif ci-dessus, étape par étape, et les dates de paiement de 2026.",
      },
    },
    {
      titre: "Pourquoi la taxe foncière augmente-t-elle en 2026 ?",
      paras: [
        "Deux choses peuvent faire varier votre montant. D'après impots.gouv.fr, en 2026 le coefficient de revalorisation est fixé à 1,008, soit une augmentation forfaitaire de 0,8 % de la base de calcul des propriétés bâties et non bâties (hors locaux professionnels). La taxe d'enlèvement des ordures ménagères est touchée de la même façon.",
        "Le deuxième facteur est local : les collectivités votent leurs taux chaque année. Un taux plus haut, des travaux sur le bien ou la fin d'une exonération peuvent aussi changer la somme. Le pourcentage d'augmentation de votre avis dépend donc de votre commune et de votre situation, pas seulement des 0,8 %.",
      ],
    },
    {
      titre: "Pour quelle année, et qui la paie ?",
      paras: [
        "La taxe foncière 2026 concerne l'année 2026 entière. D'après Service-Public.fr, la TFPB est établie une fois par an, pour l'année entière, d'après la situation au 1er janvier de l'année d'imposition.",
        "Elle est donc établie au nom de celui qui est propriétaire au 1er janvier. Si vous avez vendu en cours d'année, l'avis arrive quand même à votre nom et l'administration ne tient pas compte du changement de propriétaire. Vous pouvez demander le remboursement d'une partie au nouvel acquéreur, ce qui se règle habituellement chez le notaire le jour de la vente.",
      ],
    },
    {
      titre: "Quand reçoit-on la taxe foncière 2026 ?",
      paras: [
        "Selon impots.gouv.fr, les dates dépendent de votre choix de réception et du prélèvement mensuel.",
      ],
      tableau: {
        colonnes: ["Situation", "Avis en ligne", "Avis papier"],
        lignes: [
          ["Non mensualisé", "à partir du 27 août 2026", "entre le 24 août et le 21 septembre 2026"],
          ["Mensualisé", "à partir du 19 septembre 2026", "entre le 21 septembre et le 9 octobre 2026"],
        ],
        texte: true,
      },
      suite: [
        "Dans certains cas, l'avis ne peut pas être établi pour ces dates : vous pouvez alors le recevoir ou le consulter plus tard. Si vous avez choisi l'avis en ligne, un mail vous prévient. Il se trouve dans l'onglet « Documents » de votre espace Finances publiques.",
      ],
      encadre:
        "Le ministère met en garde contre la fraude : ne cliquez jamais sur un lien contenu dans le mail pour accéder à votre espace ou payer. Passez par impots.gouv.fr ou l'application.",
    },
    {
      titre: "Quelle est la date limite de paiement en 2026 ?",
      paras: [
        "Les dates à retenir, d'après le communiqué du ministère de l'Économie du 22 septembre 2026, sont les suivantes.",
      ],
      tableau: {
        colonnes: ["Date", "Ce que cela signifie"],
        lignes: [
          ["30 septembre 2026", "date limite pour adhérer au prélèvement à l'échéance (passée)"],
          ["15 octobre 2026", "date limite pour les autres moyens de paiement autorisés, pour un montant de 300 € ou moins"],
          ["20 octobre 2026", "date limite pour payer en ligne"],
          ["26 octobre 2026", "prélèvement sur votre compte, pour le paiement à l'échéance ou en ligne"],
        ],
        texte: true,
      },
      suite: [
        "Si vous payez en ligne, vous pouvez choisir un prélèvement immédiat, effectué trois jours après l'enregistrement de votre paiement. À défaut, le compte est prélevé le 26 octobre 2026.",
        "Si le montant est de 300 € ou moins, vous pouvez aussi régler en espèces ou par carte auprès d'un buraliste agréé, ou par carte aux guichets des centres des Finances publiques, au plus tard le 15 octobre.",
      ],
    },
    {
      titre: "Comment mensualiser la taxe foncière ?",
      paras: [
        "Le prélèvement mensuel se fait en dix prélèvements, de janvier à octobre. D'après impots.gouv.fr, chaque prélèvement correspond au dixième de l'impôt dû l'année précédente. Le contrat est reconduit chaque année, sauf avis contraire de votre part.",
      ],
      etapes: [
        "Munissez-vous de votre avis d'impôt et d'un RIB.",
        "Adhérez depuis votre espace Finances publiques sur impots.gouv.fr, par l'application « Impots.gouv », par téléphone au numéro de votre avis ou par la messagerie sécurisée.",
        "Respectez la date limite : jusqu'au 30 juin pour l'année en cours, les prélèvements commençant alors le mois suivant.",
      ],
      suite: [
        "En 2026, la date du 30 juin est passée : une adhésion faite aujourd'hui ne vaut que pour l'année suivante, et vous devez payer l'échéance actuelle par un autre moyen. Pour 2027, adhérez entre le 1er juillet et le 15 décembre 2026 pour être prélevé à partir du 15 janvier 2027. Si vous adhérez entre le 16 et le 31 décembre, les prélèvements commencent le 15 février 2027, avec deux mensualités prélevées d'un coup, janvier et février.",
        "Exemple : si votre taxe de l'année précédente était de 780 €, chaque mensualité est de 78 €.",
      ],
      encadre:
        "Mensualiser n'efface pas la date limite de l'avis en cours. Si vous n'étiez pas mensualisé en 2026, vous devez payer l'avis reçu au plus tard le 15 octobre, ou le 20 octobre si vous payez en ligne.",
    },
    {
      titre: "Que faire si vous avez raté la date limite ?",
      paras: [
        "Selon impots.gouv.fr, une majoration de 10 % est appliquée automatiquement dès que l'impôt n'est pas payé à la date limite de paiement, en vertu de l'article 1730 du Code général des impôts. Le plus simple est donc de payer le plus vite possible.",
        "Si vous avez des difficultés, le comptable des Finances publiques peut accorder, à titre gracieux, des remises totales ou partielles de cette majoration. Il peut aussi, dans certains cas, accorder un délai de paiement avec remise de la majoration, si le délai accordé est respecté. La demande se fait auprès du service indiqué sur votre avis.",
      ],
    },
    {
      titre: "Estimer sa taxe avec le calculateur du site",
      paras: [
        "Le [calculateur de taxe foncière](/calcul-taxe-fonciere) propose un type de bien, une surface et une ville parmi dix grandes villes, ou un taux personnalisé avec « Autre ». Il applique le calcul de cet article et affiche la taxe annuelle, le détail du calcul et le total divisé par douze.",
        "Pour un résultat plus proche de votre avis, ouvrez le mode avancé et saisissez la valeur locative cadastrale de votre bien avant la revalorisation de 2026, plutôt que l'estimation automatique, qui est calculée à partir de la surface. Ne saisissez pas la base d'imposition : elle est déjà divisée par deux, et le calculateur applique lui-même les 50 %. Si votre commune n'est pas dans la liste, choisissez « Autre » et saisissez le taux global.",
      ],
      encadre:
        "Le calculateur applique le coefficient officiel de 2026 (1,008), mais les taux des villes proposées sont approximatifs. Pour le montant exact, fiez-vous à votre avis. Le total divisé par douze n'est pas la mensualité réelle du prélèvement, qui est un dixième de l'impôt de l'année précédente.",
    },
  ],
  calculateur: {
    href: "/calcul-taxe-fonciere",
    nom: "Taxe foncière",
    titre: "Estimez votre taxe foncière",
    texte:
      "Choisissez le type de bien, la surface et la ville, ou saisissez votre valeur locative cadastrale en mode avancé : le calculateur donne une estimation de la taxe annuelle.",
    bouton: "Ouvrir le calculateur de taxe foncière",
  },
  faq: [
    {
      q: "Comment mensualiser la taxe foncière 2026 ?",
      a: "Ce n'est plus possible pour 2026 : la date limite d'adhésion au prélèvement mensuel pour l'année en cours était le 30 juin. Vous devez payer l'avis reçu avant la date limite. Pour 2027, adhérez entre le 1er juillet et le 15 décembre 2026 pour un début des prélèvements le 15 janvier 2027, depuis votre espace Finances publiques.",
    },
    {
      q: "Quand reçoit-on la taxe foncière 2026 ?",
      a: "Les avis sont mis en ligne à partir du 27 août 2026 pour les contribuables non mensualisés et à partir du 19 septembre 2026 pour les mensualisés. Les avis papier sont envoyés entre le 24 août et le 21 septembre 2026 (non mensualisés) ou entre le 21 septembre et le 9 octobre 2026 (mensualisés).",
    },
    {
      q: "Quelle est la date limite de paiement de la taxe foncière 2026 ?",
      a: "Le 20 octobre 2026 pour un paiement en ligne, et le 15 octobre 2026 pour les autres moyens de paiement autorisés (montant de 300 € ou moins). Passé cette date, une majoration de 10 % s'applique automatiquement.",
    },
    {
      q: "La taxe foncière 2026 concerne quelle année ?",
      a: "L'année 2026 entière. Elle est établie d'après la situation au 1er janvier 2026 : celui qui est propriétaire à cette date paie la totalité, même s'il vend en cours d'année.",
    },
    {
      q: "Quelle augmentation de la taxe foncière en 2026 ?",
      a: "Le coefficient de revalorisation des valeurs locatives est de 1,008 en 2026, soit 0,8 % de hausse de la base. Votre montant peut aussi changer si votre commune ou votre intercommunalité a modifié son taux, ou si votre bien a changé. L'augmentation réelle dépend donc de votre situation.",
    },
  ],
  sources: [
    {
      label: "Service-Public.fr : taxe foncière sur les propriétés bâties",
      url: "https://www.service-public.fr/particuliers/vosdroits/F59",
    },
    {
      label: "impots.gouv.fr : comment est calculée ma taxe foncière, pourquoi a-t-elle augmenté en 2026",
      url: "https://www.impots.gouv.fr/particulier/questions/comment-est-calculee-ma-taxe-fonciere-pourquoi-t-elle-augmente-en-2026",
    },
    {
      label: "impots.gouv.fr : date de réception de l'avis et date limite de paiement",
      url: "https://www.impots.gouv.fr/particulier/questions/quelle-date-vais-je-recevoir-mon-avis-de-taxe-fonciere-et-quand-dois-je-la",
    },
    {
      label: "Ministère de l'Économie : taxes foncières 2026, les dates à retenir pour le paiement",
      url: "https://presse.economie.gouv.fr/taxes-foncieres-2026-les-dates-a-retenir-pour-le-paiement/",
    },
    {
      label: "impots.gouv.fr : le prélèvement mensuel",
      url: "https://www.impots.gouv.fr/particulier/le-prelevement-mensuel",
    },
    {
      label: "impots.gouv.fr : date limite pour adhérer à la mensualisation",
      url: "https://www.impots.gouv.fr/particulier/questions/quelle-est-la-date-limite-pour-adherer-la-mensualisation-en-vue-du-paiement-de",
    },
    {
      label: "impots.gouv.fr : délai de paiement et majoration de 10 %",
      url: "https://www.impots.gouv.fr/particulier/questions/si-jobtiens-un-delai-de-paiement-aurai-je-des-penalites",
    },
  ],
  datePublication: "2026-10-03",
  dateAffichee: "3 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
