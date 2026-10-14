import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Surcote retraite : comment est-elle calculée ? (+1,25 % par trimestre)";
const DESCRIPTION =
  "La surcote ajoute 1,25 % à votre pension de base par trimestre travaillé après l'âge légal et la durée du taux plein : 1 an de plus = +5 %. Conditions, exemple chiffré et revalorisation des pensions (base et Agirc-Arrco).";

export const metadata: Metadata = {
  alternates: { canonical: "/surcote-retraite-comment-est-elle-calculee" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "surcote retraite combien de temps, surcote retraite carrière longue, comment calculer la surcote retraite, taux de surcote retraite, décote et surcote retraite, surcote retraite de base, surcote retraite agirc arrco, revalorisation retraite quelle date, montant de la revalorisation des retraites, tableau de revalorisation des retraites, quand revalorisation des retraites, agirc arrco quelle augmentation en 2026",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/surcote-retraite-comment-est-elle-calculee",
  fil: "Surcote retraite",
  emoji: "📈",
  couleur: "from-amber-500 to-orange-600",
  h1: "Surcote retraite : comment est-elle calculée et combien de temps travailler en plus ?",
  chapo:
    "Cet article s'adresse à ceux qui peuvent déjà partir à la retraite à taux plein et se demandent s'ils ont intérêt à continuer. Il explique la surcote, son calcul trimestre par trimestre et ce qu'elle rapporte, puis fait le point sur la revalorisation des pensions (retraite de base et Agirc-Arrco), très recherchée en ce moment.",
  reponse:
    "La surcote augmente votre pension de base de **1,25 % par trimestre** travaillé en plus, sans durée minimale : chaque trimestre civil entier compte. Elle ne joue que si vous avez dépassé l'âge légal, si vous avez déjà la durée d'assurance du taux plein et si vous continuez à travailler. **Un an de plus (4 trimestres) donne +5 %** à vie, deux ans +10 %. Côté revalorisation, les pensions de base ont augmenté de **0,9 % le 1er janvier 2026** et les retraites Agirc-Arrco n'ont **pas** été revalorisées au 1er novembre 2025, la décision pour le 1er novembre 2026 n'étant pas publiée au 14 octobre 2026.",
  sections: [
    {
      titre: "La surcote : à quoi ça sert et dans quels cas elle s'applique",
      paras: [
        "La surcote est une majoration de votre pension de retraite. Elle récompense ceux qui continuent de travailler alors qu'ils pourraient déjà partir avec une retraite à taux plein. Le taux plein, c'est une pension de base calculée sur 50 % de votre salaire annuel moyen (la moyenne de vos 25 meilleures années), sans réduction.",
        "D'après l'Assurance retraite, vous bénéficiez de la surcote si les trois conditions suivantes sont réunies :",
      ],
      liste: [
        "**Vous avez dépassé l'âge légal** de départ (il dépend de votre année de naissance, voir plus bas).",
        "**Vous totalisez le nombre de trimestres nécessaires** pour une retraite au taux maximum (ce qu'on appelle le taux plein).",
        "**Vous continuez à travailler.**",
      ],
      suite: [
        "Deux précisions importantes. D'abord, la surcote joue sur la retraite de **base** (celle de l'Assurance retraite). Ensuite, elle est viagère : l'Assurance retraite indique qu'elle s'applique à votre retraite jusqu'à votre décès. L'effort fourni quelques années est donc rentabilisé sur toute la durée de la retraite.",
      ],
      encadre:
        "Les trimestres acquis avant l'âge légal ne donnent pas droit à la surcote. Si vous avez commencé à travailler très tôt et que vous avez déjà beaucoup de trimestres à l'âge légal, la surcote ne commence à courir qu'après cet âge.",
    },
    {
      titre: "Comment la surcote est calculée : 1,25 % par trimestre",
      paras: [
        "Le calcul tient en une ligne : **pension de base × (1 + 1,25 % × nombre de trimestres de surcote)**. Chaque trimestre civil entier travaillé en plus augmente votre retraite de 1,25 %, selon Service-Public.fr. Un trimestre civil est une période de 3 mois qui commence le 1er janvier, le 1er avril, le 1er juillet ou le 1er octobre. Seuls les trimestres entiers comptent, et l'année où vous atteignez l'âge légal, on ne retient que les trimestres entiers qui suivent celui où vous avez atteint cet âge.",
        "Attention à ne pas confondre : c'est la **pension** qui augmente de 1,25 % par trimestre, pas le taux de 50 % qui augmenterait de 1,25 point. Sur une pension de base de 1 750 €, six trimestres de surcote donnent +7,5 %, soit 131,25 € de plus par mois : c'est l'exemple publié par l'Assurance retraite pour une personne née le 2 mars 1962, qui travaille jusqu'à 64 ans (62 ans et 6 mois d'âge légal, 169 trimestres requis).",
      ],
      visuel: {
        fichier: "surcote-retraite-1-25-pourcent-par-trimestre",
        alt: "Schéma de la surcote : une pension de base de 1 750 € par mois au taux plein est majorée de 1,25 % par trimestre travaillé après l'âge légal et la durée du taux plein, 4 trimestres donnent 1 837,50 € (+5 %), 8 trimestres donnent 1 925 € (+10 %), 12 trimestres donnent 2 012,50 € (+15 %).",
        legende:
          "Calcul du site : pension × (1 + 0,0125 × nombre de trimestres), sur la pension de 1 750 € donnée en exemple par l'Assurance retraite. Le taux de 1,25 % par trimestre vient de Service-Public.fr et de l'Assurance retraite.",
      },
    },
    {
      titre: "Combien de temps faut-il travailler en plus ?",
      paras: [
        "Il n'y a pas de durée minimale à respecter : un seul trimestre civil entier de plus suffit pour avoir +1,25 %. L'Assurance retraite précise aussi que vous pouvez prolonger votre activité autant que vous le souhaitez, tout en rappelant que votre employeur peut vous mettre d'office à la retraite dès 70 ans.",
        "Le tableau ci-dessous applique le taux de 1,25 % à la pension de 1 750 € de l'exemple. Les montants sont calculés par le site.",
      ],
      tableau: {
        colonnes: ["Temps travaillé en plus", "Trimestres de surcote", "Majoration", "Pension de 1 750 € devient", "Gain par mois"],
        lignes: [
          ["3 mois", "1", "+1,25 %", "1 771,88 €", "+21,88 €"],
          ["6 mois", "2", "+2,5 %", "1 793,75 €", "+43,75 €"],
          ["1 an", "4", "+5 %", "1 837,50 €", "+87,50 €"],
          ["2 ans", "8", "+10 %", "1 925 €", "+175 €"],
          ["3 ans", "12", "+15 %", "2 012,50 €", "+262,50 €"],
          ["5 ans", "20", "+25 %", "2 187,50 €", "+437,50 €"],
        ],
      },
      suite: [
        "Pour chiffrer votre cas, le [simulateur de retraite](/simulateur-retraite) du site applique la surcote (et la décote) à partir de votre année de naissance, de votre salaire annuel moyen, de vos trimestres et de votre âge de départ.",
      ],
    },
    {
      titre: "À partir de quand ? Âge légal et durée selon l'année de naissance",
      paras: [
        "La surcote commence quand vous avez à la fois l'âge légal et la durée du taux plein. Ces deux chiffres dépendent de votre année de naissance. Le relèvement prévu par la réforme de 2023 est **suspendu jusqu'en 2028** par la loi de financement de la Sécurité sociale pour 2026 : à partir du 1er septembre 2026, l'âge de 64 ans ne s'applique plus aux personnes nées en 1968, mais uniquement à celles nées à partir de 1969 (Service-Public.fr).",
        "Beaucoup de pages sur internet donnent encore l'ancien calendrier (63 ans pour les nés en 1964, 64 ans pour 1968). Voici le tableau de Service-Public.fr, à jour de la suspension :",
      ],
      tableau: {
        colonnes: ["Vous êtes né", "Âge à partir duquel vous pouvez partir", "Trimestres pour le taux plein"],
        lignes: [
          ["Entre 1958 et 1960", "62 ans", "167"],
          ["Du 1er janvier au 31 août 1961", "62 ans", "168"],
          ["Du 1er septembre au 31 décembre 1961", "62 ans et 3 mois", "169"],
          ["1962", "62 ans et 6 mois", "169"],
          ["Du 1er janvier 1963 au 31 mars 1965", "62 ans et 9 mois", "170"],
          ["Du 1er avril au 31 décembre 1965", "63 ans", "171"],
          ["1966", "63 ans et 3 mois", "172"],
          ["1967", "63 ans et 6 mois", "172"],
          ["1968", "63 ans et 9 mois", "172"],
          ["À partir de 1969", "64 ans", "172"],
        ],
        texte: true,
      },
      suite: [
        "Et la carrière longue ? Le départ anticipé pour carrière longue permet de partir avant l'âge légal, mais la surcote, elle, ne se calcule qu'après l'âge légal : les trimestres accomplis avant cet âge ne comptent pas pour elle.",
      ],
    },
    {
      titre: "Exemple chiffré complet : né en 1964, deux ans de plus",
      paras: [
        "Prenons une personne née en 1964, qui a toujours gagné en moyenne 30 000 € brut par an (exemple inventé). Pour les nés en 1964, l'âge légal est de 62 ans et 9 mois et il faut 170 trimestres pour le taux plein. Elle les a. Elle décide de continuer à travailler 2 ans de plus.",
      ],
      etapes: [
        "**Pension au taux plein :** 30 000 € × 50 % = 15 000 € par an, soit **1 250 € par mois** (brut, retraite de base seule).",
        "**Trimestres de surcote :** 2 ans de plus = 8 trimestres civils entiers, tous après l'âge légal et au-delà des 170 trimestres.",
        "**Majoration :** 8 × 1,25 % = **+10 %**.",
        "**Pension avec surcote :** 1 250 € × 1,10 = **1 375 € par mois**, soit 125 € de plus chaque mois et 1 500 € de plus par an.",
      ],
      suite: [
        "Ce que cette personne ne touche pas pendant ces 24 mois si elle ne prend pas sa retraite : 24 × 1 250 € = 30 000 €. Pour comparer, ce montant divisé par le gain de 1 500 € par an donne 20 ans. Ce calcul est volontairement simple : il ne compte ni le salaire gagné pendant ces 2 ans, ni les nouveaux points de retraite complémentaire acquis, qui jouent en faveur de celui qui continue. Retenez surtout que la surcote est un petit supplément à vie, pas un placement spectaculaire : à vous de comparer avec votre situation. Le même calcul est refait par le [simulateur de retraite](/simulateur-retraite).",
      ],
    },
    {
      titre: "La surcote et la retraite complémentaire Agirc-Arrco",
      paras: [
        "La surcote de 1,25 % par trimestre décrite plus haut concerne la retraite de base. Pour la retraite complémentaire des salariés du privé (l'Agirc-Arrco), les pages lues ne décrivent pas de surcote de ce type. L'Assurance retraite rappelle simplement que, tant que vous travaillez, vous continuez d'acquérir des points pour votre retraite complémentaire : vous améliorez donc aussi son montant.",
        "Une majoration temporaire existe pourtant, mais dans un cas précis : si vous pouviez obtenir votre retraite de base à taux plein avant le 1er décembre 2023 et que vous avez reporté votre départ d'au moins deux ans après cette date. Elle s'applique pendant un an : 10 % pour un report de deux ans, 15 % pour trois ans et 20 % pour quatre ans et plus (Agirc-Arrco). Elle ne concerne pas la retraite progressive.",
      ],
      encadre:
        "Autre règle de l'Agirc-Arrco : sans condition de durée d'assurance, la retraite complémentaire est à taux plein à 67 ans pour les assurés nés à compter du 1er janvier 1955.",
    },
    {
      titre: "Surcote parentale, fonctionnaires, après 67 ans, décote : les cas voisins",
      liste: [
        "**Surcote parentale :** votre retraite est augmentée de 1,25 % par trimestre ouvrant droit à la surcote parentale, dans la limite de 4 trimestres, soit 5 % au maximum (Assurance retraite). Conditions : être né après le 1er avril 1965, avoir acquis au moins un trimestre pour enfant et avoir validé, avant l'âge légal, le nombre de trimestres exigés pour une retraite au taux maximum de 50 %.",
        "**Fonctionnaires :** chaque trimestre civil entier cotisé supplémentaire augmente la retraite de 1,25 %. Cette surcote ne se cumule pas avec la surcote parentale. Un agent contractuel est traité comme un salarié du privé (Service-Public.fr).",
        "**Après 67 ans, sans le taux plein :** ce n'est pas la surcote. Si vous n'avez pas à 67 ans la durée exigée, la durée d'assurance est augmentée de 2,5 % pour chaque trimestre écoulé après 67 ans. Si vous avez déjà la durée à 67 ans, vous pouvez continuer à travailler pour obtenir une surcote.",
        "**La décote, le contraire de la surcote :** si vous partez avant 67 ans sans la durée exigée, ce taux de 50 % est réduit de 0,625 % par trimestre manquant, dans la limite de 20 trimestres : avec 1 trimestre manquant, le taux appliqué passe de 50 % à 49,375 % ; avec 20 trimestres ou plus, il est de 37,5 % (Service-Public.fr). À 67 ans, vous avez droit au taux plein quel que soit votre nombre de trimestres.",
      ],
    },
    {
      titre: "Revalorisation des pensions de base : quelle date, quel montant ?",
      paras: [
        "La retraite de base est revalorisée en début d'année : en 2026, c'était le 1er janvier. Le Code de la Sécurité sociale prévoit une indexation sur l'inflation : la moyenne annuelle des prix à la consommation, hors tabac, constatée par l'Insee. Au 1er janvier 2026, les pensions de retraite de base ont augmenté de **0,9 %** (Service-Public.fr). Cette hausse concerne toutes les pensions de base : Carsat, Cnav, MSA…",
        "Le projet de loi de financement de la Sécurité sociale pour 2026 prévoyait au départ un gel de ces pensions. Les députés ont supprimé cette disposition : la loi définitive n'en comporte pas, et la hausse de 0,9 % a bien été appliquée.",
        "Pour savoir ce qu'une hausse change à votre pension, multipliez-la par son pourcentage : à +0,9 %, une pension de base de 1 000 € par mois devient 1 009 €.",
      ],
      encadre:
        "Pour le 1er janvier 2027, il n'y a pas encore de chiffre officiel. Le projet de loi de financement de la Sécurité sociale pour 2027, déposé le 1er octobre 2026 et pas encore voté, prévoit que les pensions supérieures à 1 260 € par mois (base et complémentaire réunies) pourront être désindexées ou sous-indexées, c'est-à-dire ne pas suivre l'inflation (Vie-publique.fr). Seules les pensions inférieures à ce seuil seraient revalorisées sur l'inflation.",
    },
    {
      titre: "Revalorisation Agirc-Arrco : la décision du 1er novembre 2026 n'est pas publiée",
      paras: [
        "La retraite complémentaire Agirc-Arrco est revalorisée à une autre date que la retraite de base : chaque année, les partenaires sociaux fixent la valeur du point à effet du **1er novembre**. La pension complémentaire est égale au nombre de vos points multiplié par la valeur de service du point : elle vaut **1,4386 €** depuis le 1er novembre 2024 et n'a pas changé au 1er novembre 2025.",
        "En 2025, le conseil d'administration s'est réuni le 17 octobre. Faute d'accord entre les organisations patronales et syndicales, les retraites complémentaires n'ont pas été revalorisées au 1er novembre 2025. Pour 2026, l'Agirc-Arrco n'avait pas publié de décision au 14 octobre 2026 : sa page des paramètres du régime affichait toujours 1,4386 € à compter du 1er novembre 2025. Nous mettrons ce chiffre à jour quand la décision sera connue.",
        "Pour la période 2024-2026, l'accord du 5 octobre 2023 fixe la règle : les retraites suivent l'évolution des prix hors tabac estimée par l'Insee pour l'année, diminuée de 0,4 point, avec une marge de plus ou moins 0,4 point pour le conseil d'administration (Service-Public.fr).",
        "Voici les revalorisations de la valeur de service du point publiées par l'Agirc-Arrco, à chaque 1er novembre :",
      ],
      tableau: {
        colonnes: ["Date d'effet", "Nouvelle valeur du point", "Revalorisation"],
        lignes: [
          ["1er novembre 2019", "1,2714 €", "+1,00 %"],
          ["1er novembre 2020", "1,2714 €", "0,00 %"],
          ["1er novembre 2021", "1,2841 €", "+1,00 %"],
          ["1er novembre 2022", "1,3498 €", "+5,12 %"],
          ["1er novembre 2023", "1,4159 €", "+4,90 %"],
          ["1er novembre 2024", "1,4386 €", "+1,60 %"],
          ["1er novembre 2025", "1,4386 €", "0,00 %"],
          ["1er novembre 2026", "pas encore publiée", "pas encore publiée"],
        ],
      },
      suite: [
        "Pour la retraite de base, la dernière revalorisation connue est celle du 1er janvier 2026 (+0,9 %). Si vous êtes concerné par une pension de réversion, lisez aussi [pension de réversion : quel montant ?](/pension-de-reversion-quel-montant).",
      ],
    },
  ],
  calculateur: {
    href: "/simulateur-retraite",
    nom: "Simulateur retraite",
    titre: "Simulez votre pension avec décote et surcote",
    texte:
      "Indiquez votre année de naissance, votre salaire annuel moyen, vos trimestres et votre âge de départ : le simulateur applique la décote ou la surcote, et estime la pension de base, la retraite complémentaire et la pension nette.",
    bouton: "Ouvrir le simulateur de retraite",
  },
  faq: [
    {
      q: "Surcote retraite : combien de temps faut-il travailler en plus ?",
      a: "Il n'y a pas de durée minimale : chaque trimestre civil entier travaillé en plus, après l'âge légal et la durée du taux plein, augmente la retraite de base de 1,25 %. Un an de plus (4 trimestres) donne +5 %, deux ans +10 %.",
    },
    {
      q: "Comment calculer la surcote retraite ?",
      a: "Pension de base × (1 + 1,25 % × nombre de trimestres de surcote). Exemple de l'Assurance retraite : une pension de 1 750 € avec 6 trimestres de surcote est majorée de 7,5 %, soit 131,25 € de plus par mois.",
    },
    {
      q: "Quel est le taux de surcote retraite ?",
      a: "1,25 % par trimestre civil entier travaillé en plus pour la retraite de base d'un salarié du privé (Service-Public.fr). Pour la surcote parentale, la limite est de 4 trimestres, soit 5 % au maximum.",
    },
    {
      q: "Surcote retraite carrière longue : comment ça marche ?",
      a: "Le départ en carrière longue permet de partir avant l'âge légal, mais la surcote ne se calcule qu'après l'âge légal et au-delà de la durée du taux plein : les trimestres accomplis avant l'âge légal ne comptent pas pour elle.",
    },
    {
      q: "Quelle différence entre décote et surcote retraite ?",
      a: "La décote réduit la pension de base si vous partez avant 67 ans sans la durée exigée : le taux de 50 % est réduit de 0,625 % par trimestre manquant (49,375 % pour 1 trimestre manquant), dans la limite de 20 trimestres. La surcote l'augmente de 1,25 % par trimestre travaillé en plus.",
    },
    {
      q: "La surcote retraite est-elle définitive ?",
      a: "Oui, elle est viagère : l'Assurance retraite indique qu'elle s'applique à votre retraite jusqu'à votre décès.",
    },
    {
      q: "Revalorisation des retraites : quelle date et quel montant ?",
      a: "Les pensions de base ont été revalorisées de 0,9 % au 1er janvier 2026. Les retraites complémentaires Agirc-Arrco le sont au 1er novembre : 0 % au 1er novembre 2025, +1,6 % au 1er novembre 2024.",
    },
    {
      q: "Agirc-Arrco : quelle augmentation en 2026 ?",
      a: "Au 14 octobre 2026, la décision pour le 1er novembre 2026 n'était pas publiée. La valeur de service du point restait à 1,4386 € (depuis le 1er novembre 2024).",
    },
  ],
  sources: [
    {
      label: "Service-Public.fr : Retraite du salarié du secteur privé, qu'est-ce que la surcote ?",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F19643",
    },
    {
      label: "Assurance retraite : Prolonger mon activité, la surcote",
      url: "https://www.lassuranceretraite.fr/portail-info/hors-menu/annexe/salaries/montant-retraite/surcote-retraite.html",
    },
    {
      label: "Assurance retraite : Surcote, prolongez votre activité tout en augmentant votre retraite",
      url: "https://www.lassuranceretraite.fr/portail-info/hors-menu/actualites-nationales/actif/2025/surcote-prolongez-votre-activite.html",
    },
    {
      label: "Service-Public.fr : Retraite du salarié, qu'est-ce que la décote ?",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F19666",
    },
    {
      label: "Service-Public.fr : Suspension de la réforme des retraites, qui est concerné ?",
      url: "https://www.service-public.gouv.fr/particuliers/actualites/A18825",
    },
    {
      label: "Service-Public.fr : Demander sa retraite après 67 ans",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F32128",
    },
    {
      label: "Service-Public.fr : Retraite d'un agent public, qu'est-ce que la surcote ?",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F16494",
    },
    {
      label: "Assurance retraite : Être parent, la surcote parentale",
      url: "https://www.lassuranceretraite.fr/portail-info/home/actif/vie-personnelle-retraite/parentalite-droits-retraite.html",
    },
    {
      label: "Service-Public.fr : Pensions de retraite de base, quelle revalorisation au 1er janvier 2026 ?",
      url: "https://www.service-public.gouv.fr/particuliers/actualites/A17919",
    },
    {
      label: "Service-Public.fr : Quelle revalorisation pour les retraites complémentaires du privé ?",
      url: "https://www.service-public.gouv.fr/particuliers/actualites/A17790",
    },
    {
      label: "Agirc-Arrco : Paramètres et chiffres du régime (valeurs du point)",
      url: "https://www.agirc-arrco.fr/nous-connaitre/nos-etudes-et-publications/documentation-institutionnelle/parametres-et-donnees-statistiques/",
    },
    {
      label: "Agirc-Arrco : Conditions d'ouverture de mes droits",
      url: "https://www.agirc-arrco.fr/particuliers/ma-retraite/demander-ma-retraite/conditions-douverture-de-mes-droits/",
    },
    {
      label: "Agirc-Arrco : communiqué du 17 octobre 2025 sur la revalorisation",
      url: "https://www.agirc-arrco.fr/storage/20251017_CP_Revalorisation-valeur-du-point-Agirc-Arrco.pdf",
    },
    {
      label: "Vie-publique.fr : Projet de loi de financement de la sécurité sociale pour 2027",
      url: "https://www.vie-publique.fr/loi/304803-projet-de-loi-de-financement-de-la-securite-sociale-pour-plfss-2027",
    },
  ],
  datePublication: "2026-10-14",
  dateAffichee: "14 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
