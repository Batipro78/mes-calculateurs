import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Combien de litres d'eau boire par jour ? (2, 3 ou 4 litres)";
const DESCRIPTION =
  "L'EFSA donne 2,0 L d'eau par jour aux femmes et 2,5 L aux hommes, aliments compris : il reste environ 1 à 1,5 L à boire. Ce que valent 2, 3 ou 4 litres, en verres et en risques.";

export const metadata: Metadata = {
  alternates: { canonical: "/combien-de-litres-d-eau-par-jour" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "combien de litres d'eau boire par jour, 2 litres d'eau par jour, 3 litres d'eau par jour, 4 litres d'eau par jour, combien de litre d'eau par jour femme, combien de ml d'eau par jour, litres d'eau par jour maximum, quand boire de l'eau, bienfaits de boire de l'eau, quantité d'eau à boire",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/combien-de-litres-d-eau-par-jour",
  fil: "Combien de litres d'eau par jour",
  emoji: "💧",
  couleur: "from-blue-500 to-cyan-500",
  h1: "Combien de litres d'eau boire par jour ?",
  chapo:
    "Cet article s'adresse à tous ceux qui se demandent s'il faut vraiment boire 2, 3 ou 4 litres d'eau par jour. Il compare les repères européens et français, explique pourquoi les chiffres semblent se contredire, et dit ce qu'on risque en buvant beaucoup trop.",
  reponse:
    "Pour un adulte en bonne santé, les repères français parlent d'environ **1 à 2 litres d'eau à boire par jour** : 1 à 1,5 litre pour ameli, au moins 1,5 à 2 litres pour l'ANSES. Le chiffre de **2 litres** (femmes) ou **2,5 litres** (hommes) vient de l'EFSA, mais il compte **toute l'eau**, y compris celle des aliments : avec environ 1 litre venu de la nourriture, il reste de l'ordre de **1 à 1,5 litre à boire**. 3 ou 4 litres ne sont pas un objectif recommandé. Ces repères valent pour un climat tempéré et une activité modérée : la chaleur, le sport, la grossesse ou l'allaitement demandent plus.",
  sections: [
    {
      titre: "Pourquoi on lit 1 litre, 1,5 litre, 2 litres et 2,5 litres",
      paras: [
        "Les chiffres ne parlent pas tous de la même chose. Certains comptent seulement ce qu'on boit, d'autres toute l'eau qui entre dans le corps, boissons et aliments mélangés. Voici ce que disent les sources officielles.",
      ],
      liste: [
        "**EFSA (Europe, 2010) : eau totale.** L'Autorité européenne de sécurité des aliments fixe un apport adéquat de **2,0 L par jour pour les femmes** et **2,5 L pour les hommes**. Ces valeurs incluent l'eau de boisson, toutes les autres boissons et l'humidité des aliments, et valent pour un climat modéré et une activité physique modérée. Les mêmes valeurs s'appliquent aux personnes âgées.",
        "**ameli.fr (Assurance maladie) : à boire.** Il est recommandé de compenser les pertes en buvant **1 à 1,5 litre d'eau par jour**, sauf limitation décidée par votre médecin.",
        "**ANSES (France) : à boire.** Il est recommandé de boire un minimum de **1,5 à 2 litres d'eau par jour** pour les adultes, et avant même d'avoir soif.",
        "**Les aliments.** Vidal indique que nos aliments nous apportent environ un litre d'eau par jour. C'est un ordre de grandeur : il varie avec ce que vous mangez (fruits, légumes, yaourts et soupes en apportent beaucoup, l'huile et le sucre aucune).",
      ],
      suite: [
        "En rapprochant ces chiffres, tout devient cohérent : 2,0 L d'eau totale moins environ 1 L d'aliments, cela fait environ 1 L à boire pour une femme ; 2,5 L moins environ 1 L, cela fait environ 1,5 L pour un homme. Vidal fait exactement ce raisonnement dans son exemple : une femme de 65 kg a besoin d'environ 2,2 litres d'eau par jour, dont environ un litre est apporté par les aliments, donc elle doit boire au moins 1,2 litre par jour. Les fourchettes de l'ANSES (1,5 à 2 L) sont un peu plus hautes que celles d'ameli (1 à 1,5 L) : les deux administrations ne donnent pas exactement le même repère, retenez donc plutôt une fourchette.",
      ],
      visuel: {
        fichier: "eau-totale-femme-homme-aliments-boissons",
        alt: "Eau totale par jour selon l'EFSA : 2,0 L pour une femme dont environ 1,0 L viennent des aliments et 1,0 L à boire (4 verres de 250 ml) ; 2,5 L pour un homme dont 1,5 L à boire (6 verres). Les 5 % qui en absorbent le plus atteignent 3,1 L (femmes) et 4,0 L (hommes) d'eau totale.",
        legende:
          "Repères d'eau totale de l'EFSA (2010) ; la part des aliments (environ 1 L) vient de Vidal, la part à boire est calculée par différence ; un verre compte 250 ml, comme dans le calculateur du site.",
      },
      encadre:
        "Ce sont des repères pour une population, pas une ordonnance. Votre besoin réel change avec la chaleur, l'effort, la taille, les aliments et votre état de santé.",
    },
    {
      titre: "Combien de litres d'eau par jour pour une femme, pour un homme ?",
      paras: [
        "Pour une **femme adulte**, l'EFSA donne 2,0 L d'eau totale par jour, soit à peu près 1 L à boire une fois retirée l'eau des aliments (calcul ci-dessus). Pour un **homme adulte**, 2,5 L d'eau totale, soit à peu près 1,5 L à boire.",
        "Ces deux chiffres sont des moyennes pour des adultes, pas des règles au kilo. Les organismes officiels français lus ici (ANSES, ameli) ne donnent pas de formule selon le poids. Vidal en propose une : soustraire 20 kg à son poids, multiplier par 15 et ajouter 1 500, ce qui donne des ml d'eau par jour (65 kg : (65 − 20) × 15 + 1 500 = 2 175 ml). Le calcul « 33 ml par kg » du [calculateur de consommation d'eau](/calcul-consommation-eau) est une autre règle, choisie par ce site pour obtenir une estimation personnalisée.",
      ],
    },
    {
      titre: "Combien de ml, combien de verres ?",
      paras: [
        "Un litre fait 1 000 ml, donc 2 litres font 2 000 ml. Pour compter en verres, le calculateur du site retient un verre de 250 ml ; beaucoup de verres sont plus petits, alors la colonne « 200 ml » ci-dessous est une hypothèse de notre part, pas une valeur officielle.",
      ],
      tableau: {
        colonnes: ["Quantité", "Verres de 250 ml", "Verres de 200 ml (hypothèse)", "Où ça se situe dans les sources"],
        lignes: [
          ["1 L (1 000 ml)", "4", "5", "Bas de la fourchette d'ameli (1 à 1,5 L)"],
          ["1,5 L (1 500 ml)", "6", "7,5", "Haut d'ameli, bas de l'ANSES (1,5 à 2 L)"],
          ["2 L (2 000 ml)", "8", "10", "Haut de l'ANSES ; c'est aussi l'eau totale d'une femme (EFSA)"],
          ["2,5 L (2 500 ml)", "10", "12,5", "Eau totale d'un homme (EFSA), aliments compris"],
          ["3 L (3 000 ml)", "12", "15", "Au-dessus des repères pour l'eau à boire"],
          ["4 L (4 000 ml)", "16", "20", "Niveau d'eau totale atteint par les 5 % d'hommes qui en absorbent le plus (EFSA)"],
        ],
        texte: true,
      },
    },
    {
      titre: "2 litres, 3 litres, 4 litres : ce qui est utile",
      paras: [
        "**2 litres** d'eau à boire sont dans la fourchette haute de l'ANSES, donc raisonnables pour un adulte, surtout s'il fait chaud ou s'il bouge beaucoup. Ce n'est pas un seuil à atteindre à tout prix : ameli parle de 1 à 1,5 litre, donc le repère n'est pas le même partout.",
        "**3 litres** et **4 litres** sortent des repères pour l'eau à boire des sources lues ici. L'EFSA note seulement que, parmi les adultes observés, les 5 % qui absorbent le plus d'eau, tout compris, atteignent 3,1 L (femmes) et 4,0 L (hommes) : c'est un constat sur ce que les gens consomment, pas une recommandation. Aucune des sources ouvertes pour cet article ne recommande 3 ou 4 litres à boire pour tout le monde.",
        "Il y a des cas où l'on boit plus, parce qu'on perd plus d'eau : chaleur, effort, fièvre, grossesse, allaitement (voir plus bas). C'est le besoin du moment, pas un objectif quotidien à tenir toute l'année.",
      ],
    },
    {
      titre: "Peut-on boire trop d'eau ? L'hyponatrémie",
      paras: [
        "Oui, c'est possible, mais c'est rare chez une personne en bonne santé. Boire beaucoup trop d'eau dilue le sodium (le sel) du sang : on parle d'hyponatrémie, ou d'hyperhydratation. Les manuels MSD expliquent que cela peut être dangereux.",
        "Les mêmes manuels précisent que, si l'hypophyse, les reins, le foie et le cœur fonctionnent normalement, boire beaucoup d'eau n'entraîne pas d'hyperhydratation : un adulte à la fonction rénale normale devrait boire plus de 23 litres d'eau par jour, de façon régulière, pour dépasser les capacités d'élimination du corps. Les situations à risque sont d'autres : une diminution de l'élimination par les reins, des troubles du cœur, des reins ou du foie, et le fait de boire beaucoup trop d'eau pour éviter une déshydratation, surtout chez les athlètes. Quand l'excès survient rapidement, il peut donner des vomissements et des troubles de l'équilibre, et, si cela s'aggrave, une confusion.",
      ],
      encadre:
        "Si vous avez une maladie du cœur ou des reins, ou si votre médecin vous a limité les boissons, suivez son avis : ameli rappelle que les recommandations de 1 à 1,5 litre ne s'appliquent pas en cas de limitation décidée par le médecin.",
    },
    {
      titre: "Chaleur, sport, grossesse, personnes âgées : quand il faut plus",
      liste: [
        "**Forte chaleur :** ameli conseille de consommer au moins 1,5 à 2 litres d'eau par jour, en buvant régulièrement et sans attendre d'avoir soif.",
        "**Fièvre :** ameli conseille 0,5 litre d'eau en plus par jour et par degré supplémentaire de température corporelle. Vidal indique qu'en cas de fièvre, de diarrhée ou de forte chaleur, il faut boire au moins un demi-litre d'eau supplémentaire par jour.",
        "**Sport :** Vidal indique qu'une heure d'entraînement provoque la perte d'un litre d'eau. Manger Bouger conseille de boire avant, pendant et après la séance, par petites gorgées et sans attendre d'avoir soif.",
        "**Grossesse :** l'EFSA propose 300 ml par jour de plus que pour une femme non enceinte, soit 2,3 L d'eau totale par jour (2,0 + 0,3).",
        "**Allaitement :** l'EFSA retient environ 700 ml par jour de plus, soit 2,7 L d'eau totale par jour (2,0 + 0,7).",
        "**Personnes âgées :** Manger Bouger rappelle que la sensation de soif s'atténue souvent avec les années. ameli invite à bien s'hydrater dès 55 ans, et l'ANSES recommande de boire avant même d'avoir soif.",
      ],
      suite: [
        "Ces suppléments de l'EFSA sont des repères d'eau totale, boissons et aliments confondus. Retenez surtout qu'il faut boire un peu plus dans ces situations, sans viser un chiffre précis au millilitre.",
      ],
    },
    {
      titre: "Quand boire : par petites quantités, sans attendre la soif",
      paras: [
        "Les sources lues ne donnent pas d'heure précise : elles insistent sur la régularité. L'ANSES et ameli conseillent de boire sans attendre d'avoir soif, et Manger Bouger propose de boire à table et entre les repas.",
        "Le calculateur du site propose une répartition de la journée (30 % le matin, 25 % le midi, 25 % l'après-midi, 20 % le soir) : c'est un choix du calculateur, pas une règle officielle. En pratique, un verre à chaque repas, un verre le matin et un verre en fin d'après-midi font déjà 5 verres, soit 1,25 L avec des verres de 250 ml.",
      ],
    },
    {
      titre: "Exemple chiffré avec le calculateur du site",
      paras: [
        "Prenons une personne de 70 kg, activité modérée, climat tempéré. Le calculateur du site calcule 70 × 0,033 = 2,31 L, plus 0,5 L pour l'activité modérée : **2,81 L par jour, soit 12 verres de 250 ml** (11,24 verres arrondis à 12).",
      ],
      suite: [
        "Ce résultat est plus élevé que les repères officiels : il dépasse les 2,5 L d'eau totale de l'EFSA pour un homme. Il faut donc le lire comme une estimation large du calculateur, dont une partie peut être couverte par les aliments, pas comme une quantité à boire à tout prix. Essayez avec votre poids dans le [calculateur de consommation d'eau](/calcul-consommation-eau), et regardez aussi le [calculateur de calories du sport](/calcul-calories-sport) si vous vous entraînez.",
      ],
    },
    {
      titre: "Quand consulter",
      paras: [
        "En cas de maladie du cœur ou des reins, de limitation de vos boissons décidée par un médecin, ou de doute sur votre hydratation (surtout chez une personne âgée, dont la soif est moins fiable), demandez l'avis de votre médecin.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-consommation-eau",
    nom: "Consommation d'eau",
    titre: "Estimez votre besoin en eau par jour",
    texte:
      "Indiquez votre poids, votre activité, le climat, et si vous êtes enceinte ou si vous allaitez : le calculateur donne une estimation en litres et en verres de 250 ml, et une répartition sur la journée.",
    bouton: "Ouvrir le calculateur de consommation d'eau",
  },
  faq: [
    {
      q: "Combien de litres d'eau faut-il boire par jour ?",
      a: "Pour un adulte en bonne santé, 1 à 1,5 litre d'après ameli et au moins 1,5 à 2 litres d'après l'ANSES. Le repère de l'EFSA (2,0 L pour une femme, 2,5 L pour un homme) compte aussi l'eau des aliments.",
    },
    {
      q: "Combien de litres d'eau par jour pour une femme ?",
      a: "L'EFSA donne 2,0 L d'eau totale par jour pour une femme adulte, aliments compris. Avec environ 1 L d'eau venant des aliments (Vidal), il reste environ 1 L à boire. Ajoutez environ 300 ml en cas de grossesse et environ 700 ml en cas d'allaitement (EFSA).",
    },
    {
      q: "Est-ce qu'il faut boire 3 litres d'eau par jour ?",
      a: "Non, ce n'est pas une recommandation. Les sources françaises lues parlent de 1 à 2 litres à boire, et l'EFSA de 2,0 à 2,5 L d'eau totale. Vous pouvez boire plus s'il fait chaud ou si vous faites du sport.",
    },
    {
      q: "Est-ce dangereux de boire 4 litres d'eau par jour ?",
      a: "Pour un adulte dont les reins fonctionnent normalement, les manuels MSD indiquent qu'il faudrait boire plus de 23 litres par jour, de façon régulière, pour dépasser les capacités d'élimination. Le risque (hyponatrémie) existe surtout en cas de maladie du cœur, des reins ou du foie, ou en buvant énormément en peu de temps. En cas de doute, demandez à votre médecin.",
    },
    {
      q: "Combien de ml d'eau par jour ?",
      a: "1 litre = 1 000 ml. Une fourchette de 1 000 à 2 000 ml d'eau à boire couvre ameli (1 000 à 1 500 ml) et l'ANSES (1 500 à 2 000 ml). Avec un verre de 250 ml, cela fait de 4 à 8 verres.",
    },
    {
      q: "L'eau des aliments compte-t-elle ?",
      a: "Oui pour l'EFSA, dont les repères (2,0 et 2,5 L) incluent l'eau des boissons et celle des aliments. Vidal estime que les aliments apportent environ un litre d'eau par jour.",
    },
    {
      q: "Quand faut-il boire de l'eau ?",
      a: "Régulièrement dans la journée, sans attendre d'avoir soif (ANSES, ameli). Manger Bouger propose de boire à table et entre les repas, et pendant le sport avant, pendant et après la séance, par petites gorgées.",
    },
    {
      q: "Les personnes âgées doivent-elles boire plus ?",
      a: "Pas forcément plus, mais plus régulièrement : la sensation de soif s'atténue souvent avec l'âge (Manger Bouger). L'ANSES recommande de boire avant même d'avoir soif, et ameli invite à bien s'hydrater dès 55 ans.",
    },
  ],
  sources: [
    {
      label: "EFSA : Scientific Opinion on Dietary Reference Values for water (2010)",
      url: "https://www.efsa.europa.eu/en/efsajournal/pub/1459",
    },
    {
      label: "ameli.fr : L'eau",
      url: "https://www.ameli.fr/assure/sante/themes/alimentation/alimentation-adulte/alimentation-adulte-types-aliments/eau",
    },
    {
      label: "ameli.fr : Que faire en cas de canicule ou de fortes chaleurs ?",
      url: "https://www.ameli.fr/assure/sante/themes/canicule-chaleur/que-faire",
    },
    {
      label: "ANSES : Eau en bouteille ou eau du robinet, bonnes pratiques de consommation",
      url: "https://www.anses.fr/fr/content/eau-en-bouteille-ou-eau-du-robinet-bonnes-pratiques-de-consommation",
    },
    {
      label: "Manger Bouger : L'eau, indispensable à notre santé",
      url: "https://www.mangerbouger.fr/manger-mieux/bien-manger-sans-se-ruiner/bien-manger-en-preservant-la-planete-sans-se-ruiner-c-est-possible/l-eau-indispensable-a-notre-sante-conseils-et-astuces-pour-s-hydrater",
    },
    {
      label: "Vidal : De l'eau pour vivre",
      url: "https://www.vidal.fr/sante/nutrition/corps-aliments/eau-vivre.html",
    },
    {
      label: "Manuels MSD : Hyperhydratation",
      url: "https://www.msdmanuals.com/fr/accueil/troubles-r%C3%A9naux/%C3%A9quilibre-hydrique/hyperhydratation",
    },
  ],
  datePublication: "2026-10-07",
  dateAffichee: "7 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
