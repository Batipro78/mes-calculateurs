import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Combien de calories par jour pour maigrir ? (calcul et exemples)";
const DESCRIPTION =
  "Pour maigrir, on part de son besoin du jour (métabolisme de base × niveau d'activité) et on mange un peu moins. Exemple chiffré pour une femme et un homme, limites de la règle des 7 700 kcal.";

export const metadata: Metadata = {
  alternates: { canonical: "/combien-de-calories-par-jour-pour-maigrir" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "combien de calories par jour pour maigrir, combien de calories pour maigrir femme, calcul calories par jour pour maigrir, combien de calories par repas pour maigrir, calories dépensées par jour, calories moyennes par jour, besoin calories par jour, déficit calorique",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/combien-de-calories-par-jour-pour-maigrir",
  fil: "Combien de calories par jour pour maigrir",
  emoji: "🔥",
  couleur: "from-green-500 to-emerald-600",
  h1: "Combien de calories par jour pour maigrir ?",
  chapo:
    "Cet article s'adresse à celles et ceux qui se demandent combien manger de calories par jour pour perdre du poids. Il explique comment calculer son besoin du jour, ce que veut dire « manger moins », et pourquoi aucun chiffre ne vaut pour tout le monde.",
  reponse:
    "Il n'existe pas de chiffre unique : cela dépend de votre sexe, de votre âge, de votre poids, de votre taille et de votre activité. On calcule d'abord son **besoin du jour** (le métabolisme de base multiplié par un coefficient d'activité), puis on mange un peu moins que ce besoin. Par exemple, avec le calculateur du site, une femme de 35 ans, 65 kg, 165 cm, légèrement active, a un besoin d'environ **1 850 kcal** par jour, et un homme de 35 ans, 80 kg, 180 cm, d'environ **2 413 kcal**. Le déficit à choisir et sa durée sont à voir avec un professionnel de santé.",
  sections: [
    {
      titre: "Étape 1 : calculer le besoin du jour (l'« entretien »)",
      paras: [
        "Le besoin d'entretien est le nombre de calories qui garde votre poids stable. On l'obtient en deux temps : le **métabolisme de base** (l'énergie dépensée au repos), puis un **coefficient d'activité** qui ajoute ce que vous dépensez en bougeant. Pour le premier, le calculateur du site utilise la formule de Mifflin-St Jeor, publiée en 1990 : elle a été établie à partir de 498 adultes de 19 à 78 ans, dont 234 obèses, dont la dépense au repos avait été mesurée. Les auteurs notent que l'ancienne formule de Harris-Benedict (1919) surestimait cette dépense de 5 %.",
        "Voici cette formule telle que les auteurs l'écrivent, avec le poids en kg, la taille en cm et l'âge en années.",
      ],
      liste: [
        "**Homme** : métabolisme de base = 10 × poids + 6,25 × taille − 5 × âge + 5.",
        "**Femme** : métabolisme de base = 10 × poids + 6,25 × taille − 5 × âge − 161.",
        "**Besoin du jour** = métabolisme de base × coefficient d'activité.",
      ],
      tableau: {
        colonnes: ["Niveau d'activité (calculateur du site)", "Coefficient", "Où il tombe dans le classement FAO/OMS (2004)"],
        lignes: [
          ["Sédentaire", "1,2", "En dessous de 1,40"],
          ["Légèrement actif (exercice 1 à 3 jours par semaine)", "1,375", "En dessous de 1,40"],
          ["Modérément actif (3 à 5 jours par semaine)", "1,55", "Mode de vie sédentaire ou peu actif (1,40 à 1,69)"],
          ["Très actif (6 à 7 jours par semaine)", "1,725", "Mode de vie actif (1,70 à 1,99)"],
          ["Extrêmement actif (sportif de haut niveau, travail physique intense)", "1,9", "Mode de vie actif (1,70 à 1,99)"],
        ],
        texte: true,
      },
      suite: [
        "La dernière colonne vient d'un rapport de la FAO, l'OMS et l'Université des Nations unies (2004), qui classe les modes de vie par « niveau d'activité physique », c'est-à-dire la dépense de la journée exprimée en multiple du métabolisme de base. Les coefficients du calculateur sont ceux d'un usage courant : nous ne les avons pas retrouvés dans le résumé de la publication de Mifflin et al., qui donne la formule du métabolisme de base. Les deux premiers (1,2 et 1,375) sont plus bas que le bas de la fourchette FAO (1,40) : pour une personne qui bouge peu, le calcul peut donc donner un besoin un peu faible. Dans tous les cas, le résultat reste une estimation, pas une mesure.",
      ],
      encadre:
        "Le coefficient d'activité est la part la plus incertaine du calcul : se classer un cran trop haut suffit à ajouter plusieurs centaines de calories. Dans le doute, choisissez le niveau le plus bas qui vous ressemble.",
    },
    {
      titre: "Exemple chiffré : une femme et un homme",
      paras: [
        "Prenons deux personnes de 35 ans, légèrement actives (coefficient 1,375). Voici le calcul du calculateur du site, que vous pouvez refaire avec [le calcul des calories](/calcul-calories).",
        "**Femme de 65 kg et 165 cm**",
      ],
      etapes: [
        "Métabolisme de base : 10 × 65 + 6,25 × 165 − 5 × 35 − 161 = 650 + 1 031,25 − 175 − 161 = **1 345 kcal**.",
        "Besoin du jour : 1 345,25 × 1,375 = **1 850 kcal**.",
        "Avec 250 kcal de moins : environ **1 600 kcal**. Avec 500 kcal de moins : environ **1 350 kcal**, soit à peine plus que son métabolisme de base.",
      ],
      suite: [
        "**Homme de 80 kg et 180 cm** : métabolisme de base = 10 × 80 + 6,25 × 180 − 5 × 35 + 5 = 800 + 1 125 − 175 + 5 = **1 755 kcal**. Besoin du jour : 1 755 × 1,375 = **2 413 kcal**. Avec 250 kcal de moins : environ **2 163 kcal** ; avec 500 kcal de moins : environ **1 913 kcal**.",
        "Le même homme, s'il est sédentaire (1,2), a un besoin de 2 106 kcal, et s'il est très actif (1,725), de 3 027 kcal : l'activité pèse autant que le sexe ou le poids.",
      ],
      visuel: {
        fichier: "calories-par-jour-du-metabolisme-au-besoin",
        alt: "Du métabolisme de base au besoin du jour pour une femme de 35 ans, 65 kg, 165 cm : 1 345 kcal de base, 1 850 kcal par jour avec un coefficient de 1,375, 1 600 avec un déficit de 250 et 1 350 avec un déficit de 500. Pour un homme de 35 ans, 80 kg, 180 cm : 1 755, 2 413, 2 163 et 1 913 kcal.",
        legende:
          "Chiffres calculés avec la méthode du calculateur du site : formule de Mifflin-St Jeor (1990) puis coefficient d'activité 1,375, arrondis à la calorie.",
      },
      encadre:
        "Ces chiffres sont des estimations pour une personne moyenne de cet âge, de ce poids et de cette taille. Votre dépense réelle peut s'en écarter.",
    },
    {
      titre: "Étape 2 : combien manger en moins pour maigrir ?",
      paras: [
        "Pour perdre du poids, il faut en général manger moins que ce que l'on dépense. Le calculateur du site propose deux objectifs : 250 kcal de moins par jour (perte lente) ou 500 kcal de moins (perte plus rapide), avec respectivement environ 0,25 et 0,5 kg perdus par semaine.",
        "Ce « 0,5 kg par semaine » vient d'une règle très répandue : 500 kcal de moins par jour sur 7 jours font 3 500 kcal, soit environ 1 livre (0,45 kg) de poids perdu : c'est la « règle des 3 500 kcal par livre », que l'on convertit souvent en 7 700 kcal par kilo. Cette règle est **approximative**. Une étude de Kevin Hall et de ses collègues (The Lancet, 2011) précise qu'elle ignore les adaptations de l'organisme : en perdant du poids, on dépense moins, au repos comme à l'effort. Le même travail propose, pour un adulte en surpoids moyen, que la moitié du changement de poids attendu demande environ un an, et 95 % de ce changement environ trois ans.",
        "Concrètement : ne comptez pas sur un résultat « mathématique » semaine après semaine. La perte ralentit avec le temps, même si vous mangez exactement ce que vous aviez prévu.",
      ],
      suite: [
        "Sur la prudence, l'Anses (l'agence française de sécurité sanitaire de l'alimentation) rappelle que suivre un régime amaigrissant n'est pas un acte anodin et demande un suivi personnalisé par un professionnel de santé. Son expertise de 2010 conclut que chercher à perdre du poids par l'alimentation ne se justifie médicalement que s'il y a un excès de poids réel, et elle constate que plus on fait de régimes, plus on favorise la reprise de poids. Elle ajoute que rien ne remplace une alimentation équilibrée et diversifiée, avec des apports qui ne dépassent pas les besoins, associée à une activité physique régulière.",
        "Nous ne donnons donc pas de « plancher » en calories : nous n'avons pas trouvé de seuil chiffré dans une source officielle. Le calculateur affiche des objectifs, pas une prescription. Pour savoir si une perte de poids est utile pour vous, vous pouvez commencer par calculer votre [IMC](/calcul-imc).",
      ],
      encadre:
        "Si vous avez un déficit à tenir longtemps, un traitement, une maladie, si vous êtes enceinte, allaitante, adolescent ou âgé, parlez-en d'abord à votre médecin ou à un diététicien.",
    },
    {
      titre: "Combien de calories par repas pour maigrir ?",
      paras: [
        "Nous n'avons pas retrouvé de répartition officielle chiffrée des calories entre les repas dans les sources consultées : nous ne la donnons donc pas comme une règle. Le calculateur du site, lui, ne calcule qu'un total par jour.",
        "Ce qu'on peut faire est de l'arithmétique : une fois votre objectif du jour fixé, divisez-le par le nombre de repas et de collations que vous faites. Pour la femme de l'exemple, 1 600 kcal sur 3 repas font environ 533 kcal par repas ; pour l'homme, 2 163 kcal sur 3 repas font environ 721 kcal par repas. Ce n'est pas obligatoire d'avoir la même quantité à chaque repas.",
      ],
    },
    {
      titre: "Calories moyennes par jour : quels repères pour une femme et pour un homme ?",
      paras: [
        "L'Autorité européenne de sécurité des aliments (EFSA) a fixé en 2013 des besoins moyens en énergie, pour un mode de vie modérément actif. Pour les femmes et les hommes de 30 à 39 ans, la fourchette est de **2 000 à 2 600 kcal par jour**, et de 2 000 à 2 500 kcal de 50 à 59 ans. La fourchette est large : elle regroupe des femmes et des hommes, et la valeur de chacun peut se situer dedans, ou en dehors.",
        "Ces repères décrivent des besoins pour **garder son poids**, pas des objectifs pour maigrir. À titre de comparaison, nos exemples au niveau « modérément actif » donnent 2 085 kcal pour la femme, dans cette fourchette, et 2 720 kcal pour l'homme, au-dessus de son maximum de 2 600 : cet homme de 80 kg et 180 cm a un besoin plus élevé que la moyenne.",
      ],
    },
    {
      titre: "Et le métabolisme de base, à quoi sert-il ?",
      paras: [
        "C'est la brique de départ du calcul : l'énergie que votre corps dépense au repos. Il ne représente pas ce qu'il faut manger, parce qu'il ne compte pas vos déplacements, votre travail ni le sport. Pour le calculer seul, utilisez le [calcul du métabolisme de base](/calcul-metabolisme-base). Si vous voulez ensuite répartir votre total en protéines, glucides et lipides, voyez le [calcul des macros](/calcul-macros).",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-calories",
    nom: "Calcul Calories",
    titre: "Calculez votre besoin en calories par jour",
    texte:
      "Indiquez votre sexe, votre âge, votre poids, votre taille et votre niveau d'activité : le calculateur donne votre métabolisme de base, votre besoin du jour et deux objectifs de perte de poids (250 ou 500 kcal de moins).",
    bouton: "Ouvrir le calcul des calories",
  },
  faq: [
    {
      q: "Combien de calories par jour pour maigrir quand on est une femme ?",
      a: "Cela dépend de l'âge, du poids, de la taille et de l'activité. Pour une femme de 35 ans, 65 kg, 165 cm, légèrement active, le calculateur du site donne un besoin d'environ 1 850 kcal par jour, donc environ 1 600 kcal avec 250 kcal de moins. C'est un exemple, pas un objectif pour toutes.",
    },
    {
      q: "Combien de calories par jour pour maigrir quand on est un homme ?",
      a: "Pour un homme de 35 ans, 80 kg, 180 cm, légèrement actif, le calculateur donne un besoin d'environ 2 413 kcal par jour, donc environ 2 163 kcal avec 250 kcal de moins. Le résultat change beaucoup avec le poids et l'activité.",
    },
    {
      q: "Comment calculer ses calories pour maigrir ?",
      a: "Calculez le métabolisme de base (formule de Mifflin-St Jeor), multipliez-le par un coefficient d'activité pour avoir le besoin du jour, puis retirez par exemple 250 à 500 kcal. Le calculateur du site fait ce calcul.",
    },
    {
      q: "Combien de calories par repas pour maigrir ?",
      a: "Nous n'avons pas retrouvé de répartition officielle chiffrée. Une façon simple est de diviser l'objectif du jour par le nombre de repas : 1 600 kcal sur 3 repas font environ 533 kcal par repas.",
    },
    {
      q: "Faut-il 7 700 kcal de moins pour perdre 1 kg ?",
      a: "C'est une règle approximative. Une étude de 2011 (The Lancet) explique qu'elle ignore les adaptations de l'organisme : en perdant du poids, on dépense moins. La perte réelle est plus lente que ce que le calcul laisse penser.",
    },
    {
      q: "Peut-on perdre du poids sans compter les calories ?",
      a: "Oui, beaucoup de personnes y arrivent par des habitudes simples. Pour l'Anses, rien ne remplace une alimentation équilibrée et diversifiée avec des apports qui ne dépassent pas les besoins, associée à une activité physique régulière.",
    },
    {
      q: "Quel est le besoin moyen en calories par jour ?",
      a: "Pour les femmes et les hommes de 30 à 39 ans menant une vie modérément active, l'EFSA donne 2 000 à 2 600 kcal par jour (2 000 à 2 500 de 50 à 59 ans). Ce sont des besoins pour garder son poids, pas pour maigrir.",
    },
    {
      q: "Quand voir un médecin ou un diététicien ?",
      a: "Avant tout régime restrictif, en cas de maladie ou de traitement, de grossesse ou d'allaitement, pour un adolescent ou une personne âgée. L'Anses demande un suivi personnalisé par un professionnel de santé pour un régime amaigrissant.",
    },
  ],
  sources: [
    {
      label: "Mifflin et al. (1990), Am J Clin Nutr : A new predictive equation for resting energy expenditure in healthy individuals (PubMed)",
      url: "https://pubmed.ncbi.nlm.nih.gov/2305711/",
    },
    {
      label: "FAO : Human energy requirements, rapport de 2004 (niveaux d'activité physique)",
      url: "https://www.fao.org/4/y5686e/y5686e07.htm",
    },
    {
      label: "Hall et al. (2011), The Lancet : Quantification of the effect of energy imbalance on bodyweight (PMC)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3880593/",
    },
    {
      label: "Anses : avis sur les régimes amaigrissants (rapport d'expertise de 2010)",
      url: "https://www.anses.fr/fr/content/suite-la-mise-en-consultation-de-son-rapport-dexpertise-lanses-publie-un-avis-sur-les",
    },
    {
      label: "EFSA : besoins moyens en énergie (2013)",
      url: "https://www.efsa.europa.eu/en/press/news/130110",
    },
  ],
  datePublication: "2026-10-07",
  dateAffichee: "7 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
