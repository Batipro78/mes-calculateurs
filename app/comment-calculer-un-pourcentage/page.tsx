import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer un pourcentage : formules et exemples";
const DESCRIPTION =
  "15 % de 80 font 12. Pour trouver un pourcentage, on divise la part par le total puis on multiplie par 100. Les trois calculs de base, un tableau de repère et l'erreur de la hausse suivie d'une baisse.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-un-pourcentage" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "comment calculer un pourcentage, calcul pourcentage, calculer 15 pourcentage de 80, formule pourcentage, pourcentage entre deux nombres, calcul pourcentage règle de trois",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-un-pourcentage",
  fil: "Calculer un pourcentage",
  emoji: "📊",
  couleur: "from-cyan-500 to-sky-600",
  h1: "Comment calculer un pourcentage ?",
  chapo:
    "Un pourcentage est une proportion sur 100. On s'en sert pour une remise, une part, une hausse de prix ou une note. Cet article présente les trois calculs de base, avec un exemple chiffré pour chacun, et un tableau de repère pour vérifier un résultat de tête.",
  reponse:
    "Pour calculer un pourcentage, on multiplie le nombre par le pourcentage, puis on divise par 100. Ainsi, **15 % de 80** font **80 × 15 ÷ 100 = 12**. Pour trouver le pourcentage qu'un nombre représente, on divise la part par le total et on multiplie par 100 : **12 sur 80** font **15 %**.",
  sections: [
    {
      titre: "Les trois calculs de base",
      paras: [
        "Il existe trois situations. Il faut savoir laquelle vous avez devant vous pour choisir la bonne formule.",
      ],
      liste: [
        "**Trouver une part** : X % de Y se calcule avec Y × X ÷ 100. Exemple : 15 % de 80 = 12.",
        "**Trouver le pourcentage** : la part X sur le total Y se calcule avec X ÷ Y × 100. Exemple : 12 sur 80 = 15 %.",
        "**Augmenter ou baisser** : pour une hausse, on multiplie par 1 + le taux ; pour une baisse, par 1 − le taux. Exemple : 80 + 15 % = 80 × 1,15 = 92.",
      ],
    },
    {
      titre: "Exemple pas à pas : 15 % de 80",
      etapes: [
        "**Écrire le pourcentage en nombre décimal** : 15 % = 15 ÷ 100 = 0,15.",
        "**Multiplier** : 80 × 0,15 = 12.",
        "**Vérifier** : 10 % de 80 font 8 et 5 % font 4. 8 + 4 = 12. Le résultat est juste.",
      ],
    },
    {
      titre: "Un tableau de repère",
      paras: [
        "Ces valeurs se retrouvent en quelques multiplications. Elles permettent de vérifier un résultat de tête, par exemple une remise sur un achat.",
      ],
      tableau: {
        colonnes: ["Pourcentage", "De 80", "De 200", "De 1 500"],
        lignes: [
          ["5 %", "4", "10", "75"],
          ["10 %", "8", "20", "150"],
          ["15 %", "12", "30", "225"],
          ["25 %", "20", "50", "375"],
          ["50 %", "40", "100", "750"],
        ],
      },
    },
    {
      titre: "Trouver le pourcentage entre deux nombres",
      paras: [
        "Pour savoir quelle part X représente de Y, on divise X par Y, puis on multiplie par 100. Exemple : un article à 45 € est soldé à 36 €. La baisse est de 9 €, et 9 ÷ 45 × 100 = **20 %**.",
      ],
      encadre:
        "Pour un calcul sans erreur, utilisez le [calculateur de pourcentage](/calcul-pourcentage) : il fait les trois cas, la part, le pourcentage et la hausse ou la baisse.",
    },
    {
      titre: "La hausse suivie d'une baisse ne revient pas au départ",
      paras: [
        "Une hausse de 20 % suivie d'une baisse de 20 % ne ramène pas au prix de départ. Sur 100 €, la hausse donne 120 €, puis la baisse de 20 % donne 96 €. La seconde baisse s'applique à un prix plus élevé.",
        "Pour revenir de 80 € à 100 €, il faut une hausse de **25 %**, et non de 20 %. Pour une hausse détaillée, voir [comment calculer un pourcentage d'augmentation](/comment-calculer-un-pourcentage-d-augmentation).",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-pourcentage",
    nom: "Calculateur de pourcentage",
    titre: "Calculez votre pourcentage",
    texte:
      "Choisissez le type de calcul : X % de Y, la part d'un total, ou une hausse ou une baisse. Le résultat s'affiche tout de suite.",
    bouton: "Ouvrir le calculateur de pourcentage",
  },
  faq: [
    {
      q: "Comment calculer un pourcentage ?",
      a: "On multiplie le nombre par le pourcentage, puis on divise par 100. Par exemple, 15 % de 80 : 80 × 15 ÷ 100 = 12.",
    },
    {
      q: "Comment trouver un pourcentage entre deux nombres ?",
      a: "On divise la part par le total, puis on multiplie par 100. Pour 12 sur 80 : 12 ÷ 80 × 100 = 15 %.",
    },
    {
      q: "Comment calculer une augmentation de 10 % ?",
      a: "On multiplie par 1,10. Par exemple, 200 € deviennent 200 × 1,10 = 220 €.",
    },
    {
      q: "Pourquoi une hausse de 20 % puis une baisse de 20 % ne redonnent pas le prix de départ ?",
      a: "Parce que la baisse s'applique à un prix plus élevé. 100 € + 20 % = 120 €, puis 120 € − 20 % = 96 €.",
    },
  ],
  sources: [],
  datePublication: "2026-10-18",
  dateAffichee: "18 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
