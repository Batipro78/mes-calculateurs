import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Droits de succession : combien, qui paie, comment régler ? (2026)";
const DESCRIPTION =
  "Droits de succession : un enfant a 100 000 € d'abattement, puis un barème de 5 à 45 %. Qui paie, quand, comment régler ou étaler le paiement. Exemple chiffré.";

export const metadata: Metadata = {
  alternates: { canonical: "/droits-de-succession-combien-qui-paie" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "droits de succession, droits de succession quel montant, qui paye les droits de succession, quand payer les droits de succession, comment payer les droits de succession, droits de succession enfants, abattement 100 000 euros, paiement fractionné succession",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/droits-de-succession-combien-qui-paie",
  fil: "Droits de succession : combien et qui paie",
  emoji: "⚖️",
  couleur: "from-slate-700 to-slate-900",
  h1: "Droits de succession : combien, qui paie et comment les régler ?",
  chapo:
    "Cet article s'adresse aux personnes qui héritent d'un proche et veulent savoir si elles devront payer des droits, combien, et à quel moment.",
  reponse:
    "Chaque héritier paie des droits sur sa propre part, **après un abattement qui dépend de son lien avec le défunt**. Un enfant a un abattement de **100 000 €** : rien n'est dû sur cette somme. Au-delà, le barème va de **5 % à 45 %**. Par exemple, un enfant qui reçoit 150 000 € paie des droits sur 50 000 €, soit **8 194,35 €**. Le conjoint et le partenaire de PACS ne paient aucun droit. Les droits se règlent en principe au moment du dépôt de la déclaration de succession, dans les **6 mois** du décès. Pour estimer votre cas, utilisez le [calculateur de droits de succession](/calcul-droits-succession).",
  sections: [
    {
      titre: "C'est quoi, les droits de succession ?",
      paras: [
        "Les droits de succession sont la somme que l'administration fiscale peut demander à un héritier sur ce qu'il reçoit. Ce n'est pas une somme fixe : elle dépend de la valeur de ce qui est transmis et du lien de parenté entre l'héritier et la personne décédée.",
        "Le calcul se fait en trois temps. On établit d'abord la valeur de la succession : les biens du défunt, moins ses dettes (c'est l'actif net). On détermine ensuite la part de chaque héritier. Enfin, on retire de cette part l'abattement lié à son lien de parenté, puis on applique un barème progressif sur ce qui reste.",
        "Un abattement est une somme sur laquelle aucun droit n'est calculé. Un barème progressif applique un taux par tranche, comme pour l'impôt sur le revenu : chaque taux ne porte que sur la partie de la somme qui entre dans sa tranche.",
      ],
      visuel: {
        fichier: "droits-succession-abattement-taux-par-lien",
        alt: "Droits de succession selon le lien avec le défunt : conjoint ou partenaire de PACS exonéré, enfant, père, mère ou grand-parent 100 000 € d'abattement puis 5 % à 45 %, frère ou sœur 15 932 €, neveu ou nièce 7 967 €, cousin ou personne sans lien 1 594 €",
        legende:
          "Abattement et taux selon le lien avec le défunt, pour un héritier qui n'est pas en situation de handicap. Le cas des petits-enfants est expliqué plus bas.",
      },
      encadre:
        "Les frais funéraires, dans la limite de 1 500 €, font partie des dettes qui se déduisent de la succession. Le recours à un notaire est obligatoire dans certaines situations, en particulier s'il y a un bien immobilier ou un testament.",
    },
    {
      titre: "Les droits de succession pour un enfant : 100 000 € d'abattement",
      paras: [
        "Un enfant bénéficie d'un abattement de 100 000 € sur sa part. Cet abattement s'applique au décès de chacun des deux parents, pour chaque enfant. Pour l'appliquer, l'administration tient compte de certaines donations que l'enfant a déjà reçues.",
        "Sur la part qui dépasse cet abattement, le barème en ligne directe est le suivant.",
      ],
      tableau: {
        colonnes: ["Part taxable après abattement", "Taux"],
        lignes: [
          ["Jusqu'à 8 072 €", "5 %"],
          ["De 8 073 € à 12 109 €", "10 %"],
          ["De 12 110 € à 15 932 €", "15 %"],
          ["De 15 933 € à 552 324 €", "20 %"],
          ["De 552 325 € à 902 838 €", "30 %"],
          ["De 902 839 € à 1 805 677 €", "40 %"],
          ["Plus de 1 805 677 €", "45 %"],
        ],
      },
      encadre:
        "Ce barème s'applique aussi aux parents et grands-parents du défunt, qui ont eux aussi un abattement de 100 000 €, et aux petits-enfants. Un petit-enfant n'a qu'un abattement de 1 594 € si son parent est vivant. S'il hérite à la place de son parent décédé ou qui a renoncé à la succession, il bénéficie de l'abattement de 100 000 € de ce parent, partagé à parts égales avec ses frères et soeurs. Les tarifs sont ceux en vigueur au jour du décès.",
    },
    {
      titre: "Exemple : deux enfants se partagent 300 000 €",
      paras: [
        "Un parent décède sans conjoint. Après déduction de ses dettes, sa succession vaut 300 000 €. Elle revient à parts égales à ses deux enfants. Calculons les droits de chacun.",
      ],
      etapes: [
        "Part de chaque enfant : 300 000 ÷ 2 = **150 000 €**.",
        "Abattement : 150 000 − 100 000 = **50 000 €** de part taxable.",
        "5 % sur 8 072 € : 403,60 €. 10 % sur 4 037 € (de 8 073 € à 12 109 €) : 403,70 €. 15 % sur 3 823 € (de 12 110 € à 15 932 €) : 573,45 €. 20 % sur 34 068 € (de 15 933 € à 50 000 €) : 6 813,60 €.",
        "Droits de chaque enfant : 403,60 + 403,70 + 573,45 + 6 813,60 = **8 194,35 €**.",
      ],
      suite: [
        "Pour les deux enfants, cela fait 16 388,70 €, soit 5,5 % de la succession. Notre calculateur, avec 300 000 €, le lien « Enfant » et 2 héritiers, affiche 8 194 € par héritier et 16 389 € au total : il arrondit à l'euro.",
        "Si la même succession de 300 000 € revenait à un seul enfant, sa part taxable serait de 200 000 € et ses droits de 38 194,35 €. Plus la part reçue est élevée, plus le taux moyen monte.",
      ],
    },
    {
      titre: "Conjoint ou partenaire de PACS : aucun droit à payer",
      paras: [
        "L'époux ou l'épouse et le partenaire de PACS sont exonérés de droits de succession. Ils n'ont donc rien à payer sur ce qu'ils reçoivent.",
        "Être exonéré ne dispense pas toujours de déclarer. Le conjoint ou le partenaire de PACS n'a pas de déclaration à déposer seulement si l'ensemble des biens du défunt vaut moins de 50 000 € et s'il n'a reçu que des dons ou donations déclarés ou enregistrés. Attention aussi : pour que son partenaire de PACS bénéficie de tout ou partie de sa succession, le défunt doit avoir rédigé un testament.",
      ],
    },
    {
      titre: "Parents, frères et soeurs, neveux et nièces, autres personnes",
      paras: [
        "Plus le lien est éloigné, plus l'abattement est faible et plus les taux sont élevés. Voici l'essentiel pour une personne qui n'est pas en situation de handicap.",
      ],
      tableau: {
        texte: true,
        colonnes: ["Lien avec le défunt", "Abattement", "Taux"],
        lignes: [
          ["Père, mère, grand-parent", "100 000 €", "barème de 5 % à 45 %, comme pour un enfant"],
          ["Frère ou soeur", "15 932 €", "35 % jusqu'à 24 430 € de part taxable, puis 45 %"],
          ["Neveu ou nièce", "7 967 €", "55 %"],
          ["Autre membre de la famille (cousin...) ou personne sans lien de parenté", "1 594 €", "55 % jusqu'au 4e degré de parenté (un cousin germain, par exemple), 60 % au-delà ou sans lien de parenté"],
        ],
      },
      suite: [
        "Un frère ou une soeur est exonéré de droits s'il remplit les trois conditions suivantes au moment du décès : avoir été constamment domicilié avec le défunt pendant les 5 années précédant le décès, être célibataire, veuf, divorcé ou séparé de corps, et avoir plus de 50 ans ou être atteint d'une infirmité qui ne permet pas de travailler. Il doit justifier de sa situation.",
        "Au sens fiscal, une personne est neveu ou nièce uniquement si le défunt est le frère ou la soeur de l'un de ses parents. Le neveu ou la nièce « par alliance » est traité comme un tiers.",
        "D'autres règles existent, par exemple pour les héritiers en situation de handicap ou pour ceux qui héritent à la place d'un parent décédé. Elles sont détaillées sur la page de service-public.gouv.fr indiquée plus bas.",
      ],
    },
    {
      titre: "Qui doit payer les droits de succession ?",
      paras: [
        "Ce sont les héritiers. Les droits sont calculés sur la part de chacun. Mais lorsqu'il y a plusieurs héritiers, ils sont solidaires pour le paiement : chacun peut être tenu de payer la totalité des sommes dues. Il suffit alors que l'un d'eux dépose la déclaration.",
        "Les héritiers exonérés de droits, comme le conjoint, ne sont pas solidaires du paiement, mais ils ne sont pas dispensés de déclaration pour autant. Un légataire (personne désignée par testament) n'est pas solidaire des autres.",
        "Un notaire peut remplir la déclaration à la place des héritiers. Ceux-ci restent toutefois responsables vis-à-vis de l'administration fiscale.",
      ],
    },
    {
      titre: "Quand payer les droits de succession ?",
      paras: [
        "La déclaration de succession doit être déposée dans les 6 mois à compter du jour du décès si la personne est décédée en France métropolitaine, et dans les 12 mois si elle est décédée à l'étranger. Des délais particuliers existent pour certains territoires d'outre-mer.",
        "Les droits se règlent en principe en totalité au moment du dépôt de la déclaration. Il n'y a donc pas de date de paiement distincte de celle de la déclaration.",
        "En cas de dépôt tardif, l'administration applique un intérêt de retard de 0,20 % par mois, soit 2,4 % par an, et une majoration. La majoration de 10 % s'applique à partir du 13e mois.",
      ],
    },
    {
      titre: "Comment payer, et que faire si l'on n'a pas l'argent ?",
      paras: [
        "Le paiement se fait lors du dépôt de la déclaration, auprès du service de l'enregistrement dont dépend le domicile du défunt. Il peut être réalisé en espèces (jusqu'à 300 €), par chèque, par carte bancaire ou par virement. Le chèque à l'ordre du Trésor public est accepté pour un montant inférieur à 1 000 € ; au-delà, un chèque de banque est demandé.",
        "Si les héritiers ne peuvent pas tout payer d'un coup, la loi prévoit, sous conditions, deux possibilités.",
      ],
      liste: [
        "**Le paiement fractionné** : les droits sont payés en plusieurs versements égaux sur une période maximale d'un an après la date limite de dépôt de la déclaration. Cette période passe à trois ans si la succession est composée d'au moins 50 % de biens non liquides, comme des immeubles, des objets d'art ou des titres non cotés.",
        "**Le paiement différé** : il est possible si la succession comporte des biens en nue-propriété, si le conjoint survivant a choisi le droit viager d'habitation et d'usage, ou si la succession donne lieu à l'attribution préférentielle d'une exploitation agricole. Il ne concerne que les droits dus pour les biens concernés.",
      ],
      suite: [
        "Ces modalités sont accordées sur demande, formulée lors du dépôt de la déclaration. L'administration demande des garanties et des intérêts, au taux de 2 % pour les demandes faites depuis le 1er janvier 2026. Pour savoir si votre situation y donne droit, adressez-vous au service de l'enregistrement ou au notaire chargé du dossier.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-droits-succession",
    nom: "Calcul des droits de succession",
    titre: "Estimer les droits de succession de votre situation",
    texte:
      "Indiquez le montant de la succession, le lien de parenté et le nombre d'héritiers : le calculateur affiche la part de chacun, l'abattement et les droits. Le résultat est une estimation.",
    bouton: "Ouvrir le calculateur de droits de succession",
  },
  faq: [
    {
      q: "Quel est le montant des droits de succession ?",
      a: "Il dépend de la part reçue et du lien avec le défunt. Pour un enfant, on retire 100 000 € de sa part, puis un barème de 5 % à 45 % s'applique au reste. Par exemple, pour une part de 150 000 €, les droits sont de 8 194,35 €. Le conjoint et le partenaire de PACS ne paient rien.",
    },
    {
      q: "Quel pourcentage de droits de succession paie-t-on ?",
      a: "Il n'y a pas un taux unique. En ligne directe (enfants, parents, petits-enfants), le barème va de 5 % à 45 %, et la tranche de 20 % couvre la part taxable comprise entre 15 933 € et 552 324 €. Entre frères et soeurs, c'est 35 % puis 45 %. Pour un neveu ou une nièce, 55 %. Sans lien de parenté, 60 %.",
    },
    {
      q: "Quand faut-il payer les droits de succession ?",
      a: "Au moment du dépôt de la déclaration de succession, qui doit avoir lieu dans les 6 mois suivant le décès si celui-ci est survenu en France métropolitaine, et dans les 12 mois s'il est survenu à l'étranger. Un paiement fractionné ou différé peut être demandé dans certains cas.",
    },
    {
      q: "Comment payer les droits de succession quand on n'a pas l'argent ?",
      a: "On peut demander, au dépôt de la déclaration, un paiement fractionné : plusieurs versements égaux sur un an après la date limite de dépôt, ou sur trois ans si la succession est composée d'au moins 50 % de biens non liquides. Un paiement différé existe aussi dans quelques cas, par exemple pour des biens en nue-propriété. Des garanties et des intérêts de 2 % sont demandés.",
    },
    {
      q: "Quels droits de succession pour les enfants ?",
      a: "Chaque enfant a un abattement de 100 000 € au décès de chacun de ses parents. Le barème en ligne directe s'applique à la part qui dépasse cette somme : 5 % jusqu'à 8 072 €, puis 10 %, 15 %, 20 % jusqu'à 552 324 €, 30 %, 40 % et 45 % au-delà de 1 805 677 €.",
    },
  ],
  sources: [
    {
      label: "Service-public.gouv.fr : droits de succession, évaluation de la succession et calcul des droits",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14198",
    },
    {
      label: "Service-public.gouv.fr : droits de succession, déclaration",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F80",
    },
    {
      label: "Impots.gouv.fr : comment puis-je payer les droits de succession ?",
      url: "https://www.impots.gouv.fr/particulier/questions/comment-puis-je-payer-les-droits-de-succession",
    },
    {
      label: "Impots.gouv.fr : quand déposer la déclaration de succession ?",
      url: "https://www.impots.gouv.fr/particulier/questions/quand-dois-je-deposer-les-declarations-de-revenu-et-de-succession-en-cas-de",
    },
  ],
  datePublication: "2026-10-04",
  dateAffichee: "4 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
