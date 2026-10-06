import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Pension de réversion : quel montant ? (2026)";
const DESCRIPTION =
  "La pension de réversion représente 54 % de la retraite de base du défunt au régime général, 60 % à l'Agirc-Arrco et 50 % dans la fonction publique. Conditions, plafond de ressources 2026 et exemple chiffré.";

export const metadata: Metadata = {
  alternates: { canonical: "/pension-de-reversion-quel-montant" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "pension de réversion quel montant, pension de réversion quelles conditions, pension de réversion combien, pension de réversion quel taux, pension de réversion plafond de ressources, pension de réversion quand la demander, pension de réversion divorce, pension de réversion remariage, pension de réversion Agirc-Arrco, pension de réversion fonctionnaire",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/pension-de-reversion-quel-montant",
  fil: "Pension de réversion : quel montant",
  emoji: "💜",
  couleur: "from-violet-500 to-purple-600",
  h1: "Pension de réversion : quel montant ?",
  chapo:
    "Cet article s'adresse aux veufs, aux veuves et aux personnes divorcées dont l'ex-conjoint est décédé. Il explique combien représente la pension de réversion selon la caisse de retraite, à quelles conditions elle est versée, à partir de quand, et comment elle se partage entre plusieurs conjoints.",
  reponse:
    "Le taux dépend de la caisse : **54 % de la retraite de base du défunt** au régime général de la Sécurité sociale, **60 %** pour la retraite complémentaire Agirc-Arrco et **50 %** dans la fonction publique. Pour un défunt qui touchait 1 500 € de retraite de base, cela donne 810 € par mois au régime général, avec un plafond de ressources de 25 001,60 € par an pour une personne seule. Ce sont des montants bruts, et chaque caisse a ses propres conditions : on ne peut pas les mélanger.",
  sections: [
    {
      titre: "Quel taux selon la caisse de retraite ?",
      paras: [
        "Une personne a souvent cotisé à plusieurs caisses. Le conjoint survivant peut donc recevoir plusieurs pensions de réversion, une par caisse, chacune avec son taux et ses règles. Il est important de ne pas les mélanger.",
      ],
      tableau: {
        colonnes: ["Caisse", "Taux", "Condition de ressources", "Remariage"],
        lignes: [
          ["Régime général (retraite de base des salariés du privé)", "54 %", "Oui : 25 001,60 € par an seul, 40 002,56 € en couple", "Pas de perte : un ex-époux peut la toucher même s'il vit de nouveau en couple (plafond couple)"],
          ["Agirc-Arrco (retraite complémentaire des salariés du privé)", "60 %", "Non", "Fin définitive du droit"],
          ["Fonction publique de l'État", "50 %", "Non (ni condition d'âge)", "Perdue si vous vous remariez ou vivez maritalement"],
        ],
        texte: true,
      },
      suite: [
        "Dans tous les cas, il faut avoir été marié avec la personne décédée. Le Pacs et le concubinage n'ouvrent pas droit à la pension de réversion.",
      ],
      visuel: {
        fichier: "pension-reversion-taux-par-regime",
        alt: "Pension de réversion en 2026 : 54 % au régime général avec plafond de ressources de 25 001,60 € par an, 60 % à l'Agirc-Arrco sans condition de ressources, 50 % dans la fonction publique ; pour un défunt à 1 500 € par mois : 810 €, 900 € et 750 € par mois",
        legende:
          "Les trois taux, leurs conditions principales et le montant obtenu pour un défunt qui touchait 1 500 € par mois dans chaque caisse (exemple de cet article).",
      },
    },
    {
      titre: "Régime général : les conditions et le plafond 2026",
      paras: [
        "Au régime général, la pension de réversion est égale à 54 % de la retraite de base que touchait, ou aurait pu toucher, le défunt. Il faut avoir été marié avec lui (un époux divorcé est assimilé à un époux survivant) et avoir au moins 55 ans.",
        "Vos ressources annuelles brutes doivent rester sous 25 001,60 € si vous vivez seul, ou 40 002,56 € si vous vivez en couple. Elles sont examinées sur les 3 mois civils précédant la date d'attribution, sur les 12 mois si elles dépassent le quart du plafond.",
      ],
      liste: [
        "**Ce qui compte** : toutes vos ressources, ou celles de votre ménage, sauf celles qui sont exclues. Les revenus d'activité ne sont pris en compte qu'à 70 % de leur montant.",
        "**Ce qui est exclu** : par exemple les pensions de réversion versées par les régimes complémentaires obligatoires, et les revenus d'activité et de remplacement du conjoint décédé.",
        "**Comment le plafond joue** : si votre pension de réversion plus vos ressources dépassent le plafond, la pension est réduite juste de ce qu'il faut pour ne pas le dépasser. Elle n'est pas supprimée d'un coup.",
        "**Minimum** : la pension ne peut pas être inférieure à 334,92 € par mois si le défunt avait au moins 60 trimestres d'assurance. En dessous de 60 trimestres, ce minimum est réduit en proportion.",
        "**Majorations** : 10 % si vous avez eu au moins 3 enfants, et une majoration forfaitaire si vous avez un enfant à charge et moins de 67 ans sans pension de retraite.",
      ],
      encadre:
        "La page de Service-Public ne donne pas de montant maximum en euros : le montant est 54 % de la retraite de base du défunt, et le plafond porte sur vos ressources. La pension est brute et soumise à la CSG et à la CRDS. Elle est révisable si vos ressources changent : prévenez votre Carsat.",
    },
    {
      titre: "Exemple chiffré au régime général",
      paras: [
        "Le défunt touchait 1 500 € par mois de retraite de base. Vous avez 60 ans, vous vivez seul et vous touchez 1 000 € par mois de retraite. Voici le calcul, que le [calculateur de pension de réversion](/calcul-pension-reversion) refait avec le régime général et ces trois chiffres.",
      ],
      etapes: [
        "**Pension de réversion** : 1 500 × 54 % = 810 € par mois.",
        "**Plafond mensuel pour une personne seule** : 25 001,60 ÷ 12 = 2 083,47 €.",
        "**Vos ressources avec la pension** : 1 000 + 810 = 1 810 €, sous le plafond.",
      ],
      suite: [
        "Aucune réduction : vous touchez les **810 € par mois**, soit 9 720 € par an. Le plafond n'est atteint que si vos revenus dépassent 1 273,47 € par mois (2 083,47 − 810).",
        "Si vos ressources étaient de 1 500 € par mois, le total serait de 2 310 €. Il dépasse le plafond de 226,53 € : la pension serait réduite à 583,47 € par mois. Ce second calcul est fait à la main avec la même règle. Il suppose des revenus de retraite : pour des revenus d'activité, il faudrait n'en compter que 70 %, ce que le calculateur ne fait pas.",
      ],
      encadre:
        "C'est une estimation. Seule la caisse (Carsat ou Assurance retraite) fixe le montant, après examen de vos justificatifs.",
    },
    {
      titre: "Agirc-Arrco et fonction publique : ce qui change",
      paras: [
        "La retraite complémentaire Agirc-Arrco verse 60 % des droits du défunt, sans condition de ressources, à condition de ne pas être remarié. Elle demande d'avoir au moins 55 ans, ou moins si vous avez deux enfants à charge ou êtes invalide. Même si la réversion de base est refusée à cause de vos revenus, il faut quand même demander celle de l'Agirc-Arrco. Pour estimer votre propre retraite, qui peut faire réviser la réversion de base, utilisez le [simulateur de retraite](/simulateur-retraite).",
        "Dans la fonction publique, la pension est de 50 % de la pension du fonctionnaire. D'après le Service des retraites de l'État, aucune condition d'âge ni de ressources n'est exigée. Il faut avoir été marié et remplir l'une de ces conditions : un enfant du mariage, quatre ans de mariage, ou un mariage de deux ans avant le départ en retraite. Se remarier ou vivre maritalement après le décès fait perdre le droit.",
      ],
    },
    {
      titre: "À partir de quand est-elle versée ?",
      paras: [
        "La pension n'est jamais versée d'office : il faut la demander. Au régime général, vous choisissez la date de départ. Ce doit être le 1er jour d'un mois, pas avant le mois qui suit vos 55 ans et pas avant le dépôt de la demande.",
        "Si vous déposez la demande dans l'année qui suit le décès, la pension peut être versée au plus tôt le 1er jour du mois suivant le décès. Passé ce délai, elle ne remonte pas jusqu'au décès : c'est le dépôt qui compte. À l'Agirc-Arrco, le point de départ est aussi le 1er jour du mois suivant le décès, mais une demande tardive donne un rappel d'un an au maximum.",
      ],
      liste: [
        "**Réponse de la caisse** : au régime général, l'absence de réponse pendant plus de 4 mois vaut refus.",
        "**Une seule demande** : le service en ligne d'Info retraite transmet la demande à tous les régimes de base et complémentaires du défunt. Sur papier, le formulaire ne couvre pas l'Agirc-Arrco, qui demande une demande séparée.",
        "**Pièces** : l'Agirc-Arrco cite notamment l'acte de décès, votre pièce d'identité, votre avis d'imposition, un RIB, et l'extrait d'acte de naissance du défunt avec les mentions marginales.",
      ],
    },
    {
      titre: "Divorce et plusieurs mariages : le partage",
      paras: [
        "Quand le défunt a été marié plusieurs fois, la pension est partagée entre le conjoint survivant et les ex-conjoints au prorata de la durée de chaque mariage. Un ex-conjoint divorcé peut en bénéficier : il est assimilé à un époux survivant. Ne la confondez pas avec la [prestation compensatoire](/calcul-prestation-compensatoire), qui concerne le divorce lui-même. Au régime général, la durée est comptée de date à date, arrondie au nombre de mois inférieur.",
        "Exemple : le défunt a été marié 12 ans avec une première épouse, puis 18 ans avec la seconde. La pension de 810 € est répartie en 12/30 et 18/30, soit 324 € pour la première et 486 € pour la seconde. Si l'une des deux décède, sa part augmente celle de l'autre au régime général. Dans la fonction publique, ce n'est pas le cas : la part ne vient pas accroître celle d'un autre conjoint.",
      ],
      encadre:
        "À l'Agirc-Arrco, seuls les conjoints non remariés ont droit à la pension. Un ex-conjoint remarié au moment de la première demande a perdu ses droits, et le conjoint restant touche alors la totalité des 60 %.",
    },
  ],
  calculateur: {
    href: "/calcul-pension-reversion",
    nom: "Pension de réversion",
    titre: "Estimez votre pension de réversion",
    texte:
      "Indiquez la pension mensuelle du défunt, vos revenus mensuels, votre âge et la caisse (régime général ou Agirc-Arrco) : le calculateur donne la pension estimée et signale si le plafond de ressources la réduit. Pour une estimation complète de votre propre retraite, voir aussi le simulateur de retraite.",
    bouton: "Ouvrir le calculateur de pension de réversion",
  },
  faq: [
    {
      q: "Pension de réversion : quel montant ?",
      a: "54 % de la retraite de base du défunt au régime général, 60 % de ses droits à l'Agirc-Arrco et 50 % de sa pension dans la fonction publique. Pour un défunt à 1 500 € par mois, cela fait 810 € au régime général.",
    },
    {
      q: "Quelles conditions pour toucher la pension de réversion ?",
      a: "Il faut avoir été marié avec le défunt. Au régime général, il faut aussi avoir au moins 55 ans et des ressources sous 25 001,60 € par an (40 002,56 € en couple). À l'Agirc-Arrco, 55 ans (parfois moins) et ne pas être remarié, sans condition de ressources. Dans la fonction publique, ni âge ni ressources, mais une durée ou un enfant du mariage.",
    },
    {
      q: "Quel est le plafond de ressources en 2026 ?",
      a: "Au régime général : 25 001,60 € brut par an pour une personne seule et 40 002,56 € pour un couple. Si la pension et vos ressources dépassent ce plafond, la pension est réduite de l'excédent. L'Agirc-Arrco n'a pas de plafond.",
    },
    {
      q: "Peut-on toucher la pension de réversion si on est pacsé ou en concubinage avec le défunt ?",
      a: "Non. Service-Public précise que le Pacs et le concubinage n'ouvrent pas droit à la pension de réversion de l'Assurance retraite. L'Agirc-Arrco le confirme : seul le mariage ouvre ce droit.",
    },
    {
      q: "Quand faut-il demander la pension de réversion ?",
      a: "Le plus tôt possible. Au régime général, une demande déposée dans l'année qui suit le décès peut partir du 1er jour du mois suivant le décès ; après, la pension ne peut pas commencer avant le dépôt de la demande. À l'Agirc-Arrco, la demande tardive donne un rappel d'un an au maximum.",
    },
  ],
  sources: [
    {
      label: "Service-Public.fr : pension de réversion de l'Assurance retraite",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F13104",
    },
    {
      label: "Service-Public.fr : pension de réversion en cas de décès d'un fonctionnaire",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F21819",
    },
    {
      label: "Agirc-Arrco : la réversion pour le conjoint et l'ex-conjoint",
      url: "https://www.agirc-arrco.fr/categorie_expert/reversion-au-conjoint-et-ex-conjoint/",
    },
    {
      label: "Agirc-Arrco : demander la pension de réversion et pièces à fournir",
      url: "https://www.agirc-arrco.fr/categorie_expert/reversions/",
    },
    {
      label: "Service des retraites de l'État : la veuve, le veuf et les ex-conjoints",
      url: "https://retraitesdeletat.gouv.fr/deces/la-reversion-les-droits/la-veuve-le-veuf-et-les-ex-conjoints",
    },
  ],
  datePublication: "2026-10-06",
  dateAffichee: "6 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
