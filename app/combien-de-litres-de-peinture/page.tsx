import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Combien de litres de peinture pour 10, 20, 50 ou 100 m² ?";
const DESCRIPTION =
  "Avec une peinture qui couvre 10 m² par litre, il faut 2 litres pour 20 m² en une couche et 4 litres en deux couches. La formule, le tableau par surface et un exemple pour une pièce de 20 m² au sol.";

export const metadata: Metadata = {
  alternates: { canonical: "/combien-de-litres-de-peinture" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "combien de litres de peinture, combien de litres de peinture par m2, combien de litres de peinture pour 20 m2, combien de litres de peinture pour 50 m2, combien de litres de peinture pour 100 m2, 5 litres de peinture combien de m2, calcul quantité de peinture, rendement peinture",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/combien-de-litres-de-peinture",
  fil: "Combien de litres de peinture",
  emoji: "🎨",
  couleur: "from-fuchsia-500 to-pink-600",
  h1: "Combien de litres de peinture faut-il ?",
  chapo:
    "Cet article s'adresse à ceux qui vont repeindre une pièce et veulent savoir combien de pots acheter. Il donne la formule, un tableau pour 10, 20, 50 et 100 m², la réponse à « 5 litres, ça couvre combien de m² ? » et un exemple pour une pièce complète, en distinguant bien la surface du sol et la surface des murs.",
  reponse:
    "Pour une peinture qui couvre **10 m² par litre**, il faut **0,1 litre par m² et par couche**. Pour **20 m²**, cela fait **2 litres en une couche** et **4 litres en deux couches**. Le rendement exact est écrit sur le pot (entre 5 et 20 m² par litre selon Castorama) : remplacez 10 par la valeur de votre peinture.",
  sections: [
    {
      titre: "La formule pour calculer les litres de peinture",
      paras: [
        "Castorama décompose le calcul ainsi : on mesure la surface à peindre, on déduit les portes et fenêtres, puis on divise par le rendement de la peinture. Le rendement est le nombre de m² que l'on peut peindre avec 1 litre. Il est indiqué sur le pot et varie généralement entre 5 et 20 m² par litre.",
        "La formule est : **litres = surface à peindre × nombre de couches ÷ rendement**. Avec le repère de 10 m² par litre utilisé par le calculateur de ce site pour une peinture acrylique de mur, un m² demande 0,1 litre par couche, donc 0,2 litre (200 ml) en deux couches.",
        "Combien de couches ? Castorama indique qu'une couche suffit si le mur est sain mais ne donne en général pas un rendu fini, et qu'il est recommandé de passer deux couches pour un rendu fini. Le calcul ci-dessous prend donc deux couches comme cas courant.",
      ],
    },
    {
      titre: "Combien de litres pour 10, 20, 50 ou 100 m² ?",
      paras: [
        "Voici les litres nécessaires pour une surface de murs à peindre, avec un rendement de 10 m² par litre. Il s'agit de la surface réellement peinte, pas de la surface au sol de la pièce (voir plus bas).",
      ],
      tableau: {
        colonnes: ["Surface à peindre", "1 couche", "2 couches", "3 couches"],
        lignes: [
          ["10 m²", "1 litre", "2 litres", "3 litres"],
          ["20 m²", "2 litres", "4 litres", "6 litres"],
          ["50 m²", "5 litres", "10 litres", "15 litres"],
          ["100 m²", "10 litres", "20 litres", "30 litres"],
        ],
      },
      suite: [
        "Si votre peinture couvre 6 m² par litre, il faut 3,33 litres pour 20 m² en une couche et 6,67 litres en deux. Si elle couvre 15 m² par litre, il en faut 1,33 litre en une couche et 2,67 litres en deux. D'où l'importance de lire le pot.",
      ],
      visuel: {
        fichier: "peinture-litres-selon-surface-et-couches",
        alt: "Litres de peinture nécessaires selon la surface et le nombre de couches, avec un rendement de 10 mètres carrés par litre : 10 m² demandent 1 litre en une couche et 2 en deux ; 20 m² demandent 2 et 4 litres ; 50 m² demandent 5 et 10 litres ; 100 m² demandent 10 et 20 litres",
        legende:
          "Litres = surface × couches ÷ rendement, avec le repère de 10 m² par litre du calculateur. Le rendement réel est sur le pot.",
      },
    },
    {
      titre: "5 litres de peinture, ça couvre combien de m² ?",
      paras: [
        "La réponse dépend du rendement et du nombre de couches : **m² couverts = litres × rendement ÷ couches**. Avec 10 m² par litre, 5 litres couvrent 50 m² en une couche, ou 25 m² en deux couches.",
      ],
      tableau: {
        colonnes: ["Rendement du pot", "5 litres, 1 couche", "5 litres, 2 couches"],
        lignes: [
          ["6 m² par litre", "30 m²", "15 m²"],
          ["10 m² par litre", "50 m²", "25 m²"],
          ["15 m² par litre", "75 m²", "37,5 m²"],
        ],
      },
    },
    {
      titre: "Exemple chiffré : une pièce de 20 m² au sol",
      paras: [
        "« Pour une pièce de 20 m² » peut désigner le sol ou les murs. Ce n'est pas la même chose : les murs ont une surface bien plus grande. Prenons une pièce de 4 m sur 5 m, haute de 2,50 m, avec une porte de 0,90 × 2,10 m et une fenêtre de 1,20 × 1,20 m. Rendement de 10 m² par litre, deux couches.",
      ],
      etapes: [
        "**Surface des murs** : le tour de la pièce fait (4 + 5) × 2 = 18 m, donc 18 × 2,5 = 45 m².",
        "**Ouvertures à déduire** : porte 0,9 × 2,1 = 1,89 m² et fenêtre 1,2 × 1,2 = 1,44 m², soit 3,33 m².",
        "**Surface à peindre** : 45 − 3,33 = 41,67 m².",
        "**Litres en deux couches** : 41,67 × 2 ÷ 10 = 8,33 litres.",
        "**Avec la marge de 10 %** : 8,33 × 1,1 = 9,17 litres.",
      ],
      suite: [
        "Pour le plafond de 20 m² (4 × 5), ajoutez 20 × 2 ÷ 10 = 4 litres en deux couches. Murs et plafond ensemble : 12,33 litres sans marge, comme dans le calculateur quand on coche « inclure le plafond » avec la peinture acrylique de mur. Castorama conseille une marge de 10 % : sur un besoin de 7 litres, il suggère un petit pot de 0,75 litre en plus.",
      ],
      encadre:
        "Refaites ce calcul avec vos dimensions dans le [calculateur de surface de peinture](/calcul-surface-peinture) : entrez chaque mur, ajoutez la porte et la fenêtre, et choisissez le rendement. Pour le coût de la main-d'œuvre, voyez les [prix d'un peintre](/prix-peintre).",
    },
    {
      titre: "Ce qui fait varier la quantité de peinture",
      paras: [
        "Le calcul donne un minimum théorique. Castorama cite plusieurs facteurs qui font monter la consommation : le pouvoir couvrant de la peinture, la couleur à recouvrir et la nature du support.",
      ],
      liste: [
        "**Mur qui absorbe** : certains supports « boivent » la peinture et obligent à passer une couche de plus, d'après Castorama.",
        "**Sous-couche** : Castorama la présente comme le moyen le plus simple d'économiser des couches, car elle uniformise le mur et couvre une couleur existante. Elle se compte à part, avec son propre rendement.",
        "**Couleur à recouvrir** : Castorama la cite parmi les critères du pouvoir couvrant. Si le mur change nettement de teinte, ajustez le nombre de couches dans le calcul.",
        "**Marge de sécurité** : prévoyez environ 10 % en plus, une marge que Castorama juge classique, pour un renversement ou un recoin oublié.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-surface-peinture",
    nom: "Surface de peinture",
    titre: "Calculez vos litres de peinture",
    texte:
      "Entrez la largeur et la hauteur de chaque mur, retirez les portes et fenêtres, choisissez le rendement et le nombre de couches : le calculateur donne la surface à peindre, les litres nécessaires et le budget.",
    bouton: "Ouvrir le calculateur de peinture",
  },
  faq: [
    {
      q: "Combien de litres de peinture par m² ?",
      a: "Avec un rendement de 10 m² par litre, 0,1 litre par m² et par couche, soit 0,2 litre en deux couches. Le rendement de votre pot, écrit dessus, peut aller de 5 à 20 m² par litre d'après Castorama.",
    },
    {
      q: "Combien de litres de peinture pour 20 m² ?",
      a: "Avec 10 m² par litre : 2 litres en une couche et 4 litres en deux couches pour 20 m² de surface à peindre. Si les 20 m² sont ceux du sol d'une pièce, les murs font beaucoup plus : comptez le tour de la pièce × la hauteur.",
    },
    {
      q: "Combien de litres de peinture pour 50 m² ?",
      a: "Avec 10 m² par litre : 5 litres en une couche et 10 litres en deux couches. Avec une peinture à 6 m² par litre, il en faut 8,33 litres en une couche et 16,67 litres en deux.",
    },
    {
      q: "Combien de litres de peinture pour 100 m² ?",
      a: "Avec 10 m² par litre : 10 litres en une couche et 20 litres en deux couches. Ajoutez environ 10 % de marge de sécurité.",
    },
    {
      q: "5 litres de peinture, ça couvre combien de m² ?",
      a: "50 m² en une couche et 25 m² en deux couches avec un rendement de 10 m² par litre. Avec 6 m² par litre, 30 m² en une couche et 15 m² en deux ; avec 15 m² par litre, 75 m² et 37,5 m².",
    },
    {
      q: "Combien de couches de peinture faut-il passer ?",
      a: "Castorama recommande deux couches pour un rendu fini. Une seule suffit sur un mur sain mais donne en général un résultat moins fini ; trois couches donnent une finition parfaite pour un coût plus élevé.",
    },
    {
      q: "Faut-il prévoir une marge de peinture ?",
      a: "Oui, Castorama juge une marge de 10 % classique : elle couvre un renversement ou un recoin oublié. Sur un besoin de 7 litres, il conseille de prévoir un petit pot de 0,75 litre en plus.",
    },
  ],
  sources: [
    {
      label: "Castorama : calculer votre besoin en peinture",
      url: "https://www.castorama.fr/idees-et-conseils/calculer-votre-besoin-en-peinture/CF_CPRD_npcart_100567.art",
    },
  ],
  datePublication: "2026-10-16",
  dateAffichee: "16 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
