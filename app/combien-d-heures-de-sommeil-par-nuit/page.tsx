import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Combien d'heures de sommeil par nuit ? (enfant, ado, adulte)";
const DESCRIPTION =
  "Un adulte a besoin de 7 à 9 heures de sommeil par nuit, un adolescent de 8 à 10, un enfant de 6 à 13 ans de 9 à 11. Tableau par âge, 6 ou 7 heures suffisent-elles, durée d'un cycle de sommeil.";

export const metadata: Metadata = {
  alternates: { canonical: "/combien-d-heures-de-sommeil-par-nuit" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "combien d'heures de sommeil par nuit, heures de sommeil enfant, heures de sommeil adulte, heures de sommeil par age, 7 heures de sommeil, 6 heures de sommeil suffisent, moyenne heures de sommeil, cycle de sommeil durée, combien de cycles de sommeil par nuit, calcul heure de sommeil",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/combien-d-heures-de-sommeil-par-nuit",
  fil: "Combien d'heures de sommeil par nuit",
  emoji: "🌙",
  couleur: "from-indigo-500 to-purple-600",
  h1: "Combien d'heures de sommeil par nuit ?",
  chapo:
    "Cet article répond aux parents, aux adolescents et aux adultes qui se demandent combien de temps il faut dormir. Il donne le tableau des durées recommandées par âge, explique si 6 ou 7 heures suffisent et montre comment calculer son heure de coucher avec les cycles de sommeil.",
  reponse:
    "Un **adulte** a besoin de **7 à 9 heures** de sommeil par nuit, un **adolescent** (14 à 17 ans) de **8 à 10 heures** et un **enfant** de 6 à 13 ans de **9 à 11 heures**. À partir de 65 ans, la fourchette est de 7 à 8 heures. Ce sont les recommandations de la National Sleep Foundation, confirmées en juin 2026. Un cycle de sommeil dure environ 90 minutes et une nuit en compte 4 à 6.",
  sections: [
    {
      titre: "Combien d'heures de sommeil selon l'âge ?",
      paras: [
        "La référence la plus citée est celle de la National Sleep Foundation (NSF), une association américaine qui a réuni un panel d'experts. Ses durées de 2015 ont été réaffirmées le 10 juin 2026 après l'examen de 133 méta-analyses (des synthèses de nombreuses études). Elles s'expriment en heures par 24 heures : pour les plus petits, les siestes comptent.",
      ],
      tableau: {
        colonnes: ["Âge", "Heures recommandées", "Milieu de la fourchette"],
        lignes: [
          ["Nouveau-nés (0 à 3 mois)", "14 à 17 h", "15,5 h"],
          ["Nourrissons (4 à 11 mois)", "12 à 15 h", "13,5 h"],
          ["Tout-petits (1 à 2 ans)", "11 à 14 h", "12,5 h"],
          ["Enfants de 3 à 5 ans", "10 à 13 h", "11,5 h"],
          ["Enfants de 6 à 13 ans", "9 à 11 h", "10 h"],
          ["Adolescents (14 à 17 ans)", "8 à 10 h", "9 h"],
          ["Jeunes adultes (18 à 25 ans)", "7 à 9 h", "8 h"],
          ["Adultes (26 à 64 ans)", "7 à 9 h", "8 h"],
          ["65 ans et plus", "7 à 8 h", "7,5 h"],
        ],
      },
      suite: [
        "La dernière colonne n'est pas dans la recommandation : c'est le milieu de chaque fourchette, que le [calculateur de besoin de sommeil](/calcul-besoin-sommeil) du site prend comme durée idéale de départ. Les tranches d'âge du calculateur sont exactement celles de la NSF.",
      ],
      visuel: {
        fichier: "sommeil-duree-recommandee-par-age",
        alt: "Durées de sommeil recommandées par âge : nouveau-nés 14 à 17 heures, nourrissons 12 à 15, tout-petits 11 à 14, enfants de 3 à 5 ans 10 à 13, enfants de 6 à 13 ans 9 à 11, adolescents 8 à 10, adultes de 18 à 64 ans 7 à 9, seniors de 65 ans et plus 7 à 8 heures",
        legende:
          "Durées de sommeil par 24 heures recommandées par la National Sleep Foundation (2015, réaffirmées en juin 2026), les mêmes que celles du calculateur du site.",
      },
      encadre:
        "Ces durées sont des repères pour la population, pas une règle pour chaque personne. La NSF précise que certaines personnes fonctionnent au bas ou au haut de leur fourchette.",
    },
    {
      titre: "Combien d'heures de sommeil pour un enfant ou un adolescent ?",
      paras: [
        "Un enfant de 6 à 13 ans a besoin de 9 à 11 heures, et un enfant de 3 à 5 ans de 10 à 13 heures. Les besoins diminuent avec l'âge, de la naissance à l'âge adulte.",
        "Pour l'adolescent, ameli indique que 9 heures en moyenne permettent à un jeune de 14 à 17 ans d'être en forme, et qu'en dessous de 8 heures, il est bien souvent en déficit de sommeil. La NSF recommande 8 à 10 heures. Selon la même page d'ameli, 20 % des adolescents dorment moins de 7 heures par nuit en semaine, et 40 % ont plus de 2 heures de décalage entre les jours de classe et les jours de repos.",
      ],
      suite: [
        "Si votre enfant dort beaucoup moins que sa fourchette et semble fatigué dans la journée, ou s'il dort beaucoup plus que sa fourchette et reste fatigué, parlez-en à son médecin.",
      ],
    },
    {
      titre: "Combien d'heures de sommeil pour un adulte, et après 65 ans ?",
      paras: [
        "Pour un adulte de 18 à 64 ans, la NSF recommande 7 à 9 heures par nuit. L'Académie américaine de médecine du sommeil (AASM) et la Sleep Research Society sont d'accord sur le bas de la fourchette : leur consensus dit que les adultes devraient dormir 7 heures ou plus par nuit, de façon régulière, pour préserver leur santé.",
        "À partir de 65 ans, la NSF recommande 7 à 8 heures. En France, les sources grand public donnent des chiffres voisins mais pas identiques : ameli évoque 8 heures de sommeil nécessaires à partir de 18 ans, et le site sante.fr écrit que « la durée de sommeil idéale pour un adulte varie de 7 à 10 heures par nuit ». Le message reste le même : environ 7 à 9 heures, à ajuster selon la façon dont vous vous sentez dans la journée.",
        "La NSF a aussi examiné la question des hommes et des femmes : sur 67 méta-analyses qui comparaient les sexes, la plupart n'ont trouvé aucune preuve que les uns et les autres aient besoin de durées différentes. Il n'y a donc pas de recommandation séparée pour les femmes.",
      ],
    },
    {
      titre: "Combien dorment les Français en moyenne ?",
      paras: [
        "Santé publique France a mesuré le sommeil des 18-75 ans dans son Baromètre 2017. Les adultes dormaient en moyenne **6 h 42** les jours de semaine (ou travaillés) et **7 h 26** les jours de repos, soit un écart de 44 minutes. La moyenne des nuits, jours de repos compris, est de **6 h 45**. En ajoutant les siestes, le temps de sommeil par 24 heures est de **6 h 55**.",
      ],
      suite: [
        "Pour la première fois depuis que le sommeil est observé en France, le temps de sommeil moyen d'une nuit passe donc sous les 7 heures, selon les auteurs de l'étude. En comparaison, l'étude rappelle qu'une enquête de 2010 trouvait 7 heures 13 minutes. Ce sont des moyennes : elles ne disent pas ce qui convient à chacun.",
      ],
      encadre:
        "Ces chiffres datent de 2017. Ils décrivent ce que font les Français, pas ce qu'il faut faire.",
    },
    {
      titre: "6 heures ou 7 heures de sommeil, est-ce suffisant ?",
      paras: [
        "**7 heures** sont le bas de la fourchette recommandée pour un adulte. Si vous dormez 7 heures et que vous êtes en forme dans la journée, vous êtes dans les recommandations.",
        "**6 heures** sont en dessous. Le consensus de l'AASM et de la Sleep Research Society dit que dormir moins de 7 heures par nuit de façon régulière est associé à des effets néfastes sur la santé, parmi lesquels la prise de poids, le diabète, l'hypertension, la dépression et un risque accru d'accidents. Il s'agit d'associations observées dans des études, pas d'une certitude pour chaque personne.",
        "Quelques personnes se sentent bien avec un peu moins, c'est la raison pour laquelle on parle de fourchettes. Mais si vous dormez 6 heures par nuit parce que vous n'avez pas le temps, et non parce que cela vous suffit, vous accumulez sans doute une dette de sommeil : voyez le [calculateur de dette de sommeil](/calcul-dette-sommeil).",
      ],
    },
    {
      titre: "Un cycle de sommeil dure combien de temps ?",
      paras: [
        "Une nuit n'est pas un bloc : elle se compose de cycles qui se répètent. Chaque cycle enchaîne du sommeil lent, plus ou moins profond, puis une phase de sommeil paradoxal, celle où l'on rêve.",
        "Pour la durée, les sources donnent une moyenne et une fourchette. Le site sante.fr parle de **4 à 6 cycles de 90 minutes environ** pour une nuit d'adulte. L'Inserm donne une fourchette plus large : **3 à 6 cycles de 60 à 120 minutes**. La durée de 90 minutes est donc une moyenne, qui varie d'une personne à l'autre et d'une nuit à l'autre.",
      ],
      suite: [
        "Ce qui est valable pour tous : les premiers cycles contiennent surtout du sommeil lent profond, tandis que la fin de nuit fait la part belle au sommeil lent léger et au sommeil paradoxal (Inserm). Écourter la nuit retire donc surtout ses derniers cycles.",
      ],
    },
    {
      titre: "Calculer son heure de coucher avec les cycles de sommeil",
      paras: [
        "Beaucoup cherchent à se coucher pour se réveiller à la fin d'un cycle. Le [calculateur de cycles de sommeil](/calcul-cycles-sommeil) du site utilise un cycle de 90 minutes et ajoute 14 minutes pour s'endormir. Exemple : vous devez vous lever à 7 h.",
      ],
      etapes: [
        "Choisissez le nombre de cycles. 5 cycles : 5 × 90 = 450 minutes, soit 7 h 30 de sommeil.",
        "Ajoutez le temps d'endormissement du calculateur : 450 + 14 = 464 minutes, soit 7 h 44 avant le lever.",
        "Retranchez-le de l'heure de lever : 7 h 00 − 7 h 44 = **23 h 16**. Avec 6 cycles (9 h de sommeil), le coucher serait à 21 h 46 ; avec 4 cycles (6 h), à 0 h 46.",
      ],
      suite: [
        "Le calculateur de besoin de sommeil procède autrement : pour un adulte de 30 ans à l'activité modérée, il retient 8 heures, soit 5 cycles une fois arrondi, et propose de se coucher à 23 h 00 pour se lever à 7 h, sans ajouter de temps d'endormissement. Les deux outils donnent donc des horaires proches mais pas identiques.",
        "Le chiffre de 14 minutes est un réglage du calculateur de cycles. Santé publique France mesure en moyenne 25 minutes d'endormissement chez les Français : si vous mettez plus de temps, décalez votre coucher d'autant. Et ne vous crispez pas sur la minute : l'heure de réveil exacte d'un cycle varie.",
      ],
      encadre:
        "Dans le [calculateur de besoin de sommeil](/calcul-besoin-sommeil), vous indiquez votre âge, votre activité et la qualité de votre sommeil. Les ajustements d'activité (30 minutes de plus pour une activité intense, 30 de moins pour une activité légère ou sédentaire) et de qualité (1 heure de plus pour un mauvais sommeil) sont des réglages du calculateur, pas des recommandations officielles.",
    },
    {
      titre: "Quand en parler à un médecin ?",
      paras: [
        "Si vous dormez les heures recommandées mais restez épuisé dans la journée, si vous avez du mal à vous endormir ou si vous vous réveillez la nuit de façon durable, parlez-en à votre médecin : la durée n'est qu'un des aspects d'un bon sommeil.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-besoin-sommeil",
    nom: "Calcul besoin sommeil",
    titre: "Calculez votre besoin de sommeil et votre heure de coucher",
    texte:
      "Indiquez votre âge, votre niveau d'activité et la qualité de votre sommeil : le calculateur donne vos heures de sommeil recommandées, le nombre de cycles de 90 minutes et les heures de coucher pour différents réveils.",
    bouton: "Ouvrir le calculateur de besoin de sommeil",
  },
  faq: [
    {
      q: "Combien d'heures de sommeil par nuit pour un adulte ?",
      a: "7 à 9 heures selon la National Sleep Foundation, qui a confirmé ces durées en juin 2026. Pour les plus de 65 ans, la fourchette est de 7 à 8 heures.",
    },
    {
      q: "Combien d'heures de sommeil pour un enfant ?",
      a: "9 à 11 heures de 6 à 13 ans et 10 à 13 heures de 3 à 5 ans, siestes comprises pour les plus petits (National Sleep Foundation).",
    },
    {
      q: "Combien d'heures de sommeil pour un adolescent ?",
      a: "8 à 10 heures de 14 à 17 ans selon la National Sleep Foundation. L'Assurance Maladie indique que 9 heures en moyenne permettent d'être en forme et qu'en dessous de 8 heures, l'adolescent est bien souvent en déficit de sommeil.",
    },
    {
      q: "Est-ce que 7 heures de sommeil suffisent ?",
      a: "Oui pour un adulte : 7 heures est le bas de la fourchette recommandée (7 à 9 heures). Le consensus de l'AASM et de la Sleep Research Society parle de 7 heures ou plus par nuit, de façon régulière.",
    },
    {
      q: "Est-ce que 6 heures de sommeil suffisent ?",
      a: "C'est en dessous des recommandations pour un adulte. Dormir moins de 7 heures par nuit de façon régulière est associé à des effets néfastes sur la santé (AASM et Sleep Research Society). Si c'est par manque de temps, vous accumulez sans doute une dette de sommeil.",
    },
    {
      q: "Combien de temps dure un cycle de sommeil ?",
      a: "Environ 90 minutes en moyenne, avec 4 à 6 cycles par nuit selon sante.fr. L'Inserm donne une fourchette plus large : 3 à 6 cycles de 60 à 120 minutes.",
    },
    {
      q: "Combien de temps dorment les Français en moyenne ?",
      a: "Selon le Baromètre de Santé publique France 2017, 6 h 42 en semaine, 7 h 26 les jours de repos, 6 h 45 en moyenne par nuit et 6 h 55 par 24 heures, siestes comprises.",
    },
    {
      q: "À quelle heure se coucher pour se lever à 7 h ?",
      a: "Avec le calculateur de cycles du site (cycles de 90 minutes plus 14 minutes d'endormissement) : 23 h 16 pour 5 cycles (7 h 30 de sommeil), 21 h 46 pour 6 cycles (9 h) et 0 h 46 pour 4 cycles (6 h).",
    },
  ],
  sources: [
    {
      label: "National Sleep Foundation : réaffirmation des recommandations de durée de sommeil (10 juin 2026)",
      url: "https://www.thensf.org/sleep-duration-recommendations/",
    },
    {
      label: "AASM et Sleep Research Society : consensus sur la durée de sommeil de l'adulte (Sleep, 2015)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4434546/",
    },
    {
      label: "Santé publique France : le temps de sommeil en France, Baromètre 2017",
      url: "https://beh.santepubliquefrance.fr/beh/2019/8-9/2019_8-9_1.html",
    },
    {
      label: "ameli : sommeil de l'adolescent, quelles particularités ?",
      url: "https://www.ameli.fr/assure/sante/themes/adolescents-sommeil/sommeil-de-l-adolescent-quelles-particularites",
    },
    {
      label: "Inserm : dossier sur le sommeil",
      url: "https://www.inserm.fr/dossier/sommeil/",
    },
    {
      label: "sante.fr : faut-il vraiment dormir 8 heures par nuit ?",
      url: "https://www.sante.fr/decryptage/nos-reponses/faut-il-vraiment-dormir-8-heures-par-nuit-pour-etre-en-bonne-sante",
    },
  ],
  datePublication: "2026-10-07",
  dateAffichee: "7 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
