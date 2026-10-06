import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Congés payés : quelle année, et quand les poser ? (2026)";
const DESCRIPTION =
  "Les congés payés s'acquièrent du 1er juin au 31 mai (2,5 jours ouvrables par mois, 30 par an) et se prennent pendant la période de prise, qui inclut au moins du 1er mai au 31 octobre. Qui décide des dates, report, perte, arrêt maladie.";

export const metadata: Metadata = {
  alternates: { canonical: "/conges-payes-quelle-annee-quand-les-poser" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "congés payés quelle année, congés payés quand les poser, qui décide des congés payés, congés payés quand les prendre, peut-on payer des congés payés, période de référence congés payés, période de prise des congés, congés payés perdus, congés payés arrêt maladie",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/conges-payes-quelle-annee-quand-les-poser",
  fil: "Congés payés : quelle année, quand les poser",
  emoji: "🏖️",
  couleur: "from-teal-500 to-cyan-600",
  h1: "Congés payés : quelle année, et quand les poser ?",
  chapo:
    "Cet article s'adresse aux salariés du secteur privé qui se demandent à quelle « année » correspondent leurs congés, quand ils peuvent les poser, qui décide des dates et ce qu'ils risquent de perdre. Il suit les pages officielles de Service-Public.fr et du ministère du Travail.",
  reponse:
    "Les congés s'acquièrent pendant une **période de référence**, du **1er juin au 31 mai** sauf accord ou convention, à raison de **2,5 jours ouvrables par mois**, soit **30 jours ouvrables** (5 semaines) pour une année complète. Ils se prennent ensuite pendant la **période de prise**, qui doit comprendre au moins du **1er mai au 31 octobre**. Les dates sont fixées par la convention ou l'accord collectif, sinon par l'employeur après avis du CSE. Et on ne peut pas se faire payer ses congés à la place de les prendre, sauf à la fin du contrat.",
  sections: [
    {
      titre: "Quelle année ? La période d'acquisition et la période de prise",
      paras: [
        "Deux périodes se suivent, et c'est ce qui explique les « congés N-1 ». La **période de référence** (ou période d'acquisition) est celle pendant laquelle on gagne des jours. Par défaut, elle va du 1er juin d'une année au 31 mai de l'année suivante. Une convention collective ou un accord d'entreprise peut en fixer une autre.",
        "Les jours acquis pendant cette période doivent ensuite être pris pendant la **période de prise**. Exemple donné par Service-Public.fr : dans une entreprise dont la période de prise va du 1er mai au 30 avril, les congés acquis du 1er juin 2024 au 31 mai 2025 se prennent entre le 1er mai 2025 et le 30 avril 2026.",
        "Appliqué à aujourd'hui, 5 octobre 2026 : les jours acquis du 1er juin 2025 au 31 mai 2026 sont ceux que vous pouvez poser en ce moment. Ceux qui s'acquièrent depuis le 1er juin 2026 viendront ensuite. Regardez la date de fin de votre propre période de prise : c'est elle qui compte.",
      ],
      tableau: {
        colonnes: ["Période", "Dates par défaut", "Qui peut les modifier"],
        lignes: [
          ["Référence (acquisition)", "Du 1er juin N-1 au 31 mai N", "Convention collective ou accord d'entreprise"],
          ["Prise des congés", "Comprend au moins du 1er mai au 31 octobre", "Fixée par convention ou accord, sinon par l'employeur après avis du CSE"],
          ["Entreprises affiliées à une caisse de congés payés (BTP, spectacles...)", "Du 1er avril N-1 au 31 mars N", "Règles de la caisse"],
        ],
        texte: true,
      },
      visuel: {
        fichier: "conges-payes-periode-acquisition",
        alt: "Frise des congés payés : sur la période de référence du 1er juin 2025 au 31 mai 2026, on acquiert 2,5 jours ouvrables par mois, soit 30 jours ouvrables au bout de 12 mois ; la période de prise comprend au moins du 1er mai au 31 octobre 2026",
        legende:
          "L'acquisition mois après mois sur la période de référence 2025-2026, et la période de prise qui comprend au moins du 1er mai au 31 octobre. Dates par défaut : une convention ou un accord peut en fixer d'autres.",
      },
      encadre:
        "La période de prise doit être portée à la connaissance des salariés au moins 2 mois avant son ouverture. Si vous ne la connaissez pas, demandez-la à votre employeur ou regardez votre convention collective.",
    },
    {
      titre: "Combien de jours acquiert-on : jours ouvrables ou jours ouvrés ?",
      paras: [
        "Chaque mois de travail effectif ouvre droit à 2,5 jours **ouvrables**. Un jour ouvrable est un jour de la semaine hors jour de repos hebdomadaire (en général le dimanche) et hors jours fériés habituellement non travaillés dans l'entreprise : on en compte 6 par semaine. Les 30 jours d'une année complète font donc 5 semaines.",
        "Un employeur peut aussi compter en **jours ouvrés** (les jours réellement travaillés, 5 par semaine), à condition que ce mode de calcul garantisse au salarié au moins les mêmes droits. Dans ce cas, 30 jours ouvrables correspondent à 25 jours ouvrés. Pour compter des jours ouvrés entre deux dates, utilisez le [calcul de jours ouvrés](/calcul-jours-ouvres).",
        "Quand le résultat n'est pas un nombre entier, il est porté au nombre entier supérieur. Le temps partiel ne change pas le nombre de jours : le salarié acquiert 2,5 jours ouvrables par mois qu'il travaille à temps plein ou à temps partiel.",
      ],
      tableau: {
        colonnes: ["Mois de travail effectif", "Jours ouvrables calculés", "Jours acquis (arrondi)"],
        lignes: [
          ["1 mois", "2,5", "3"],
          ["3 mois", "7,5", "8"],
          ["5 mois", "12,5", "13"],
          ["9 mois", "22,5", "23"],
          ["12 mois", "30", "30"],
        ],
      },
      suite: [
        "L'exemple de 5 mois et 13 jours est celui de Service-Public.fr. Certaines absences comptent comme du travail effectif (congé de maternité, accident du travail, congés payés eux-mêmes), d'autres non (congé sans solde, grève, congé parental à temps plein).",
      ],
    },
    {
      titre: "Quand les poser et qui décide des dates ?",
      paras: [
        "Les dates de départ sont fixées par la convention collective ou l'accord d'entreprise, ou à défaut par l'employeur, après avis du CSE s'il en existe un. Le salarié indique les dates qu'il souhaite, mais l'employeur peut les refuser : le congé doit alors être pris à une autre date. Ce refus ne doit pas être abusif. Il peut se justifier, par exemple, par la continuité du service ou une forte activité.",
        "Pour ordonner les départs, l'employeur tient compte de la situation de famille, de la durée de service dans l'entreprise et de l'éventuelle activité chez d'autres employeurs, sauf autres critères prévus par la convention ou l'accord. Les salariés mariés ou pacsés qui travaillent dans la même entreprise ont droit à un congé simultané.",
      ],
      liste: [
        "**Le congé principal** : on ne peut pas poser plus de 24 jours ouvrables consécutifs (4 semaines), sauf accord de l'employeur dans deux cas prévus (contraintes géographiques, personne handicapée ou âgée en perte d'autonomie au foyer).",
        "**Au moins 12 jours ouvrables d'affilée** entre le 1er mai et le 31 octobre. Ce congé ne peut pas être fractionné.",
        "**Le fractionnement** : si vous prenez 3 à 5 jours en dehors de la période du 1er mai au 31 octobre, vous gagnez 1 jour ouvrable ; à partir de 6 jours, 2 jours ouvrables.",
        "**Le délai** : la date de départ et l'ordre des départs sont communiqués au moins 1 mois à l'avance. L'employeur ne peut pas changer les dates moins d'un mois avant le départ, sauf circonstances exceptionnelles.",
        "**La fermeture de l'entreprise** : l'employeur peut imposer de prendre des jours de congés lors d'une fermeture temporaire.",
      ],
      encadre:
        "Sans réponse de l'employeur à une demande dont il connaissait les dates et qu'il n'a pas refusée, le salarié qui part ne commet pas de faute, d'après Service-Public.fr. Le plus sûr reste d'obtenir une réponse écrite avant de réserver.",
    },
    {
      titre: "Que deviennent les congés non pris ? Peut-on les perdre ?",
      paras: [
        "Oui. En principe, il n'existe pas de droit au report : les congés non pris avant la fin de la période de prise sont perdus. Un report reste possible par accord avec l'employeur, ou si un usage ou une disposition conventionnelle le prévoit. Le report est aussi prévu au retour d'un congé de maternité ou d'adoption.",
        "Il y a une limite importante : la perte ne joue que si l'employeur a bien rempli ses obligations (fixer et afficher la période de prise, communiquer l'ordre des départs, permettre de prendre effectivement les congés). Sinon, d'après Service-Public.fr, les congés non pris sont reportés si le contrat se poursuit, ou convertis en indemnité à la fin du contrat. Un salarié qui refuse de les prendre alors que l'employeur l'y a invité à plusieurs reprises les perd s'ils ne sont pas reportés.",
      ],
    },
    {
      titre: "Arrêt maladie : combien de jours acquiert-on, et jusqu'à quand les prendre ?",
      paras: [
        "Depuis la loi du 22 avril 2024, un salarié en arrêt maladie d'origine non professionnelle acquiert des congés payés, à raison de **2 jours ouvrables par mois**, soit **24 jours ouvrables par an** au maximum. En cas d'accident du travail ou de maladie professionnelle, c'est le rythme normal de 2,5 jours par mois. Exemple de Service-Public.fr : un salarié malade 2 mois (du 1er août au 30 septembre 2024) sur la période de référence 2024-2025.",
      ],
      etapes: [
        "**Du 1er juin au 31 juillet 2024** : 2 mois travaillés, 2 × 2,5 = 5 jours.",
        "**Du 1er août au 30 septembre 2024** : 2 mois d'arrêt maladie non professionnel, 2 × 2 = 4 jours.",
        "**Du 1er octobre 2024 au 31 mai 2025** : 8 mois travaillés, 8 × 2,5 = 20 jours.",
      ],
      suite: [
        "Total : 5 + 4 + 20 = **29 jours ouvrables**. Un salarié qui n'a pas pu poser ses congés à cause d'un arrêt maladie bénéficie d'un report de **15 mois**, qui démarre à la date où l'employeur l'informe de ses droits, après la reprise. Dans l'exemple officiel, informé le 13 mai 2026, il peut les prendre jusqu'au 13 août 2027. Les congés non pris à la fin de ce délai sont perdus.",
      ],
      encadre:
        "L'employeur doit informer le salarié, dans le mois qui suit sa reprise, du nombre de jours dont il dispose et de la date limite pour les prendre. C'est cette information qui fait partir le délai de 15 mois.",
    },
    {
      titre: "Peut-on se faire payer ses congés ? Et combien touche-t-on en congé ?",
      paras: [
        "Non. D'après le ministère du Travail, les congés payés doivent être pris chaque année et ne peuvent pas être remplacés par une indemnité : un salarié ne peut pas y renoncer contre de l'argent, et l'employeur ne peut pas décider de payer à la place. L'exception, ce sont les cas où le salarié ne peut pas exercer son droit, notamment la rupture du contrat : l'employeur verse alors une indemnité compensatrice pour les jours acquis et non pris.",
        "Pendant les congés, le salaire n'est pas versé, mais le salarié perçoit une **indemnité de congés payés**. Elle est calculée de deux façons, et on retient la plus avantageuse : le **dixième** de la rémunération brute totale de la période de référence, ou le **maintien de salaire**, c'est-à-dire ce que le salarié aurait gagné s'il avait travaillé. Exemple de Service-Public.fr : 24 000 € bruts sur la période de référence (2 000 € par mois) et 2 semaines de congés.",
      ],
      etapes: [
        "**Dixième** : 24 000 ÷ 10 = 2 400 € pour 30 jours ouvrables.",
        "**Pour 12 jours ouvrables** (2 semaines) : 2 400 × 12 ÷ 30 = 960 €.",
        "**Maintien de salaire** : 2 000 × (7 × 10) ÷ (7 × 21) = 952,38 € (horaire réel, mois de 21 jours ouvrés, 10 jours de congés).",
      ],
      suite: [
        "Le salarié perçoit le montant le plus favorable : **960 €** pour les 2 semaines. L'indemnité est versée à la date habituelle de paie. Le dixième de 24 000 € est le calcul que fait aussi le calculateur du site pour une année complète. Pour le maintien de salaire, vérifiez votre fiche de paie : son calcul dépend de l'horaire réel et de la convention.",
      ],
      encadre:
        "Les primes de fin d'année, l'intéressement et la participation ne comptent pas dans l'indemnité de congés payés. Les majorations pour heures supplémentaires y entrent, ainsi que la prime d'ancienneté sous conditions. En cas de doute, la fiche de paie et le service paie font foi.",
    },
  ],
  calculateur: {
    href: "/calcul-conges-payes",
    nom: "Calcul des congés payés",
    titre: "Calculez vos jours de congés et le dixième de votre indemnité",
    texte:
      "Indiquez vos mois de travail sur la période de référence et votre salaire brut : le calculateur donne les jours acquis (arrondis au nombre entier supérieur) et le dixième de la rémunération brute. Pour le maintien de salaire, la fiche de paie fait foi.",
    bouton: "Ouvrir le calculateur de congés payés",
  },
  faq: [
    {
      q: "Congés payés : quelle année ?",
      a: "Les congés s'acquièrent sur la période de référence, par défaut du 1er juin au 31 mai, puis se prennent pendant la période de prise, qui comprend au moins du 1er mai au 31 octobre. Les jours acquis du 1er juin 2025 au 31 mai 2026 se posent donc à partir du 1er mai 2026, jusqu'à la fin de la période de prise de l'entreprise.",
    },
    {
      q: "Qui décide des dates de congés payés ?",
      a: "La convention collective ou l'accord d'entreprise, sinon l'employeur après avis du CSE. Le salarié propose ses dates, l'employeur peut les refuser sans abus. Les dates et l'ordre des départs sont communiqués au moins 1 mois avant le départ.",
    },
    {
      q: "Peut-on payer des congés payés au lieu de les faire prendre ?",
      a: "Non, d'après le ministère du Travail : le salarié ne peut pas y renoncer contre une indemnité, et l'employeur ne peut pas la substituer à la prise des congés. Une indemnité compensatrice n'est versée que dans certains cas, comme la rupture du contrat ou la fin d'un CDD.",
    },
    {
      q: "Les congés payés non pris sont-ils perdus ?",
      a: "En principe oui, à la fin de la période de prise, sauf report par accord, usage ou disposition conventionnelle. Ils ne sont pas perdus si l'employeur n'a pas rempli ses obligations. Le report est aussi prévu en cas de maladie (15 mois), de maternité ou d'adoption.",
    },
    {
      q: "Combien de jours de congés payés en arrêt maladie ?",
      a: "Depuis le 24 avril 2024, 2 jours ouvrables par mois en maladie non professionnelle, soit 24 jours ouvrables par an au maximum. En accident du travail ou maladie professionnelle, le rythme est de 2,5 jours par mois.",
    },
    {
      q: "Un employeur peut-il changer mes dates de congés ?",
      a: "Pas moins d'un mois avant la date de départ prévue. En cas de circonstances exceptionnelles, comme une commande exceptionnelle, il peut reporter les congés.",
    },
  ],
  sources: [
    {
      label: "Service-Public.fr : congés payés du salarié dans le secteur privé",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2258",
    },
    {
      label: "Service-Public.fr : peut-on reporter sur l'année suivante des jours de congés non pris ?",
      url: "https://www.service-public.gouv.fr/particuliers/actualites/A15702",
    },
    {
      label: "Service-Public.fr : un salarié peut-il acquérir des congés payés pendant un arrêt maladie ?",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F37482",
    },
    {
      label: "Service-Public.fr : comment est calculée l'indemnité de congés payés ?",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33359",
    },
    {
      label: "Service-Public.fr : un employeur peut-il refuser des congés payés ?",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F12803",
    },
    {
      label: "Service-Public.fr : indemnité compensatrice de congés payés",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F24661",
    },
    {
      label: "Ministère du Travail : les congés payés",
      url: "https://travail-emploi.gouv.fr/les-conges-payes",
    },
  ],
  datePublication: "2026-10-06",
  dateAffichee: "6 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
