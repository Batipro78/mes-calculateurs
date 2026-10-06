import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Quel âge a mon chien en âge humain ? (tableau par taille)";
const DESCRIPTION =
  "Un chien de 5 ans a environ 36 à 45 ans humains selon sa taille, pas 35. Pourquoi « multiplier par 7 » est une idée reçue, tableau par taille, âge adulte et âge senior.";

export const metadata: Metadata = {
  alternates: { canonical: "/quel-age-a-mon-chien-en-age-humain" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "quel age a mon chien en age humain, quel age chien en humain, age chien en age humain, age d'un chien en age humain, a quel age un chien est adulte, quel age chien adulte, age chien taille adulte, age chien fois combien, age chien tableau",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/quel-age-a-mon-chien-en-age-humain",
  fil: "Quel âge a mon chien en âge humain",
  emoji: "🐕",
  couleur: "from-amber-500 to-orange-600",
  h1: "Quel âge a mon chien en âge humain ?",
  chapo:
    "Cet article s'adresse aux propriétaires de chien qui veulent savoir à quel âge humain correspond leur compagnon, et à partir de quand on le dit adulte ou senior. Il explique pourquoi « multiplier par 7 » ne marche pas et donne un tableau par taille.",
  reponse:
    "Un chien d'**1 an** correspond à environ **15 ans humains** et un chien de **2 ans** à environ **24 ans**. Ensuite, tout dépend de sa taille : à 5 ans, un petit chien a environ **36 ans humains**, un chien moyen **39** et un chien géant **45**, et non 35 comme avec la règle du « fois 7 ». Il n'existe pas de source officielle sur cette équivalence : ce sont des estimations, à prendre comme des ordres de grandeur.",
  sections: [
    {
      titre: "Pourquoi « multiplier par 7 » est une idée reçue",
      paras: [
        "La règle « 1 an de chien = 7 ans humains » est la plus connue. Selon l'American Kennel Club (AKC), elle repose sans doute sur un simple calcul : les gens vivaient environ 70 ans, les chiens environ 10. Un vétérinaire cité par l'AKC dit même qu'il s'agissait peut-être d'un « coup de marketing ».",
        "Les vétérinaires américains (AVMA) sont clairs : contrairement à une idée répandue, les chiens ne vieillissent pas au rythme de 7 années humaines par année de chien. Un chiot grandit bien plus vite qu'un enfant (voir plus bas) : les premières années d'un chien pèsent donc beaucoup plus que les suivantes.",
        "La taille joue aussi. D'après l'AVMA, les grands chiens ont en général une vie plus courte que les petits : et un même nombre d'années ne représente pas le même âge pour un chihuahua et pour un dogue.",
      ],
    },
    {
      titre: "Ce que disent les sources, et ce qu'elles ne disent pas",
      paras: [
        "Aucune administration ne publie de table officielle d'équivalence : c'est une convention. Deux repères sérieux existent, et le calculateur du site les affiche tous les deux.",
      ],
      liste: [
        "**La règle des vétérinaires (15, 9, puis 5).** L'AKC la rapporte ainsi, d'après l'AVMA : 15 ans humains pour la première année d'un chien de taille moyenne, environ 9 pour la deuxième, puis environ 5 par année ensuite. Le calculateur du site la décline par taille : +4 ans humains par année après 2 ans pour un petit chien, +5 pour un moyen, +6 pour un grand, +7 pour un géant. Cette déclinaison par taille est celle du calculateur : nous ne l'avons pas retrouvée telle quelle sur la page de l'AVMA.",
        "**La formule de l'étude de l'Université de Californie à San Diego.** Wang et al. (Cell Systems, 2020) ont comparé le vieillissement de l'ADN de 104 chiens, surtout des labradors, à celui de 320 personnes. Leur formule : **âge humain = 16 × ln(âge du chien) + 31**. Elle donne 31 ans humains à 1 an et 71 ans à 12 ans. Les auteurs reconnaissent qu'elle repose surtout sur des labradors et qu'elle pourrait être différente selon les races.",
      ],
      tableau: {
        colonnes: ["Âge du chien", "Fois 7", "Petit chien", "Chien moyen", "Grand chien", "Chien géant", "Labrador (étude)"],
        lignes: [
          ["1 an", "7", "15", "15", "15", "15", "31"],
          ["2 ans", "14", "24", "24", "24", "24", "42"],
          ["3 ans", "21", "28", "29", "30", "31", "49"],
          ["5 ans", "35", "36", "39", "42", "45", "57"],
          ["7 ans", "49", "44", "49", "54", "59", "62"],
          ["10 ans", "70", "56", "64", "72", "80", "68"],
          ["12 ans", "84", "64", "74", "84", "94", "71"],
        ],
      },
      suite: [
        "Les colonnes par taille sont celles du calculateur du site. Les deux méthodes ne donnent pas les mêmes chiffres : l'étude fait vieillir très vite la première année (31 ans humains à 1 an) puis ralentit, alors que la règle des vétérinaires monte de façon régulière. Elles se rejoignent vers 10 ans pour un chien de taille moyenne ou grande (64 et 72 contre 68).",
      ],
      visuel: {
        fichier: "age-chien-age-humain-par-taille",
        alt: "Tableau de l'âge humain équivalent d'un chien selon son âge et sa taille : à 5 ans, 36 ans pour un petit chien, 39 pour un chien moyen, 42 pour un grand chien, 45 pour un chien géant, contre 35 avec la règle du multiplier par 7",
        legende:
          "Âge humain équivalent par âge et par taille, calculé avec la méthode du calculateur du site ; la ligne Labrador utilise la formule de Wang et al. (Cell Systems, 2020).",
      },
      encadre:
        "Ces équivalences sont des estimations, pas une mesure. Pour juger de la santé de votre chien, seul votre vétérinaire fait foi.",
    },
    {
      titre: "Exemple chiffré : un chien moyen de 5 ans",
      paras: [
        "Reprenons un chien de 10 à 25 kg, par exemple un beagle, qui a 5 ans. Voici le calcul du calculateur du site.",
      ],
      etapes: [
        "**1re année** : 15 ans humains.",
        "**2e année** : 9 ans de plus, soit 15 + 9 = 24 ans humains à 2 ans.",
        "**Années suivantes** : 5 ans humains par année de chien pour un chien moyen. Il reste 5 − 2 = 3 années : 3 × 5 = 15 ans.",
      ],
      suite: [
        "Total : 24 + 15 = **39 ans humains**, contre 35 avec la règle du « fois 7 ». Avec la formule de l'étude (16 × ln(5) + 31), on obtient environ 56,75, que le calculateur arrondit à **57 ans**.",
        "Pour le même âge, la taille change le résultat : 36 ans pour un petit chien (24 + 4 × 3), 42 pour un grand (24 + 6 × 3) et 45 pour un géant (24 + 7 × 3). Un chien de 8 ans vaut 48 ans humains pour un petit chien et 60 pour un grand.",
      ],
      encadre:
        "Vous pouvez refaire ces calculs dans le [calculateur d'âge du chien](/calcul-age-chien-humain) : indiquez l'âge et la taille, il affiche les deux méthodes.",
    },
    {
      titre: "À quel âge un chien est-il adulte ?",
      paras: [
        "Un chien est adulte quand il a fini de grandir, et cela dépend de sa taille. Une thèse de l'École nationale vétérinaire de Toulouse note que les petites et moyennes races atteignent 99 % de leur poids adulte à 9 ou 10 mois, alors que les races géantes n'y arrivent qu'entre 11 et 15 mois.",
        "Autrement dit, un petit chien est en général adulte avant son premier anniversaire, tandis qu'un très grand chien peut continuer à grandir bien après. Ce sont des repères pour le poids : la maturité de comportement, elle, peut venir plus tard. Pour savoir où en est votre chien, demandez à votre vétérinaire.",
      ],
    },
    {
      titre: "À quel âge un chien est-il senior ?",
      paras: [
        "Là aussi la taille compte. L'AVMA explique que les experts suggèrent de considérer un chien comme senior quand il atteint les 25 derniers pour cent de la durée de vie estimée de sa race. Avec des données de l'AKC, cela donne en moyenne :",
      ],
      tableau: {
        colonnes: ["Taille (classement AVMA)", "Âge senior en moyenne"],
        lignes: [
          ["Petite ou très petite race (moins de 20 livres, soit moins de 9 kg)", "8 à 11 ans"],
          ["Race moyenne (20 à 50 livres, soit 9 à 23 kg)", "8 à 10 ans"],
          ["Grande race (50 à 90 livres, soit 23 à 41 kg)", "8 à 9 ans"],
          ["Race géante (plus de 90 livres, soit plus de 41 kg)", "6 à 7 ans"],
        ],
        texte: true,
      },
      suite: [
        "Les limites de poids de l'AVMA sont un peu différentes de celles du calculateur du site (10, 25 et 45 kg) : dans le doute, choisissez la taille la plus proche du poids adulte de votre chien. Pour un chat, voir le [calculateur d'âge du chat](/calcul-age-chat-humain).",
      ],
    },
    {
      titre: "Et si je ne connais pas l'âge de mon chien ?",
      paras: [
        "Si vous avez adopté un chien sans connaître sa date de naissance, aucun calculateur ne peut la deviner. Demandez à votre vétérinaire une estimation à l'examen, puis utilisez cet âge dans le [calculateur](/calcul-age-chien-humain). L'âge de votre chien sert aussi à choisir sa nourriture : voyez le [calcul de la ration du chien](/calcul-ration-chien).",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-age-chien-humain",
    nom: "Âge chien",
    titre: "Calculez l'âge humain de votre chien",
    texte:
      "Indiquez l'âge de votre chien et sa taille (petit, moyen, grand ou géant) : le calculateur donne son âge humain avec la règle des vétérinaires et avec la formule de l'étude de 2020, et la part de sa vie déjà écoulée.",
    bouton: "Ouvrir le calculateur d'âge du chien",
  },
  faq: [
    {
      q: "Quel âge a mon chien en âge humain ?",
      a: "Environ 15 ans humains à 1 an et 24 ans à 2 ans. Ensuite, comptez de 4 à 7 ans humains par année selon la taille : à 5 ans, environ 36 ans pour un petit chien, 39 pour un chien moyen, 42 pour un grand et 45 pour un géant (calculateur du site). Ce sont des estimations.",
    },
    {
      q: "Pourquoi un an de chien ne vaut-il pas 7 ans humains ?",
      a: "Parce que les chiens vieillissent très vite au début de leur vie puis plus lentement, et que la taille joue. Selon les vétérinaires américains (AVMA), les chiens ne vieillissent pas au rythme de 7 années humaines par année de chien.",
    },
    {
      q: "Quelle est la formule de l'étude de l'Université de Californie ?",
      a: "Âge humain = 16 × ln(âge du chien) + 31, d'après Wang et al. (Cell Systems, 2020). Elle a été établie surtout sur des labradors : les auteurs précisent qu'elle pourrait différer selon les races.",
    },
    {
      q: "À quel âge un chien est-il adulte ?",
      a: "D'après une thèse de l'École nationale vétérinaire de Toulouse, les petites et moyennes races atteignent 99 % de leur poids adulte à 9 ou 10 mois, et les races géantes entre 11 et 15 mois. La maturité de comportement peut venir plus tard.",
    },
    {
      q: "À quel âge un chien est-il senior ?",
      a: "Selon l'AVMA, quand il atteint les 25 derniers pour cent de la durée de vie estimée de sa race : en moyenne 8 à 11 ans pour un petit chien et 6 à 7 ans pour un chien géant.",
    },
    {
      q: "Le calculateur et l'étude donnent-ils le même âge ?",
      a: "Non. Pour un chien moyen de 5 ans, le calculateur donne 39 ans avec la règle des vétérinaires et 57 ans avec la formule de l'étude. Ce sont deux méthodes d'estimation différentes, aucune n'est une mesure exacte.",
    },
  ],
  sources: [
    {
      label: "AVMA : Caring for senior cats and dogs",
      url: "https://www.avma.org/resources-tools/pet-owners/petcare/senior-pets",
    },
    {
      label: "AKC : How to calculate dog years to human years",
      url: "https://www.akc.org/expert-advice/health/how-to-calculate-dog-years-to-human-years/",
    },
    {
      label: "NHGRI (NIH) : researchers reframe dog-to-human aging comparisons",
      url: "https://www.genome.gov/news/news-release/NHGRI-researchers-reframe-dog-to-human-aging-comparisons",
    },
    {
      label: "NIA (NIH) : epigenetics study updates the dog-to-human age formula",
      url: "https://www.nia.nih.gov/news/epigenetics-study-updates-dog-human-age-formula-implications-cross-species-comparison-help",
    },
    {
      label: "École nationale vétérinaire de Toulouse : thèse « Évolution des paramètres physiologiques du chiot de 0 à 6 mois »",
      url: "https://archivet.envt.fr/oatao.univ-toulouse.fr/27302/1/Dumont-dayot_27302.pdf",
    },
  ],
  datePublication: "2026-10-06",
  dateAffichee: "6 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
