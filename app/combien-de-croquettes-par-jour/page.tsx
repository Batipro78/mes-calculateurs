import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Combien de croquettes par jour pour un chien ou un chat ?";
const DESCRIPTION =
  "Un chien adulte de 10 kg a besoin d'environ 630 kcal par jour, soit 166 g de croquettes à 380 kcal pour 100 g. La formule, un tableau par poids, les chiots, les chats et pourquoi le sac prime.";

export const metadata: Metadata = {
  alternates: { canonical: "/combien-de-croquettes-par-jour" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "combien de croquettes par jour, combien de croquettes par jour pour un chien, combien de croquettes par jour pour un chiot, combien de croquettes par jour pour un chat, combien de croquettes par jour pour un chaton, ration croquettes chien, quantité croquettes chien, calcul ration chien",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/combien-de-croquettes-par-jour",
  fil: "Combien de croquettes par jour",
  emoji: "🐕",
  couleur: "from-amber-500 to-orange-600",
  h1: "Combien de croquettes par jour ?",
  chapo:
    "Cet article s'adresse aux propriétaires d'un chien, d'un chiot, d'un chat ou d'un chaton qui veulent savoir quelle quantité de croquettes donner chaque jour. Il explique la méthode des vétérinaires (on calcule d'abord des calories, puis on les convertit en grammes), donne des exemples chiffrés et dit pourquoi le tableau du sac reste le point de départ.",
  reponse:
    "Cela dépend du poids et de l'âge, et surtout de l'aliment. À titre d'exemple, un chien adulte de **10 kg** a besoin d'environ **630 kcal par jour** : avec des croquettes à **380 kcal pour 100 g** (valeur d'exemple), cela fait environ **166 g par jour**. Un chat adulte stérilisé de 4 kg a besoin d'environ 238 kcal, soit 63 g. Ce sont des estimations : la quantité se règle ensuite selon la silhouette de l'animal.",
  sections: [
    {
      titre: "La méthode : des calories d'abord, des grammes ensuite",
      paras: [
        "Une croquette n'a pas de valeur fixe : selon la marque et la gamme, 100 g n'apportent pas la même énergie. Les vétérinaires calculent donc d'abord le besoin en kilocalories (kcal), puis le convertissent en grammes avec la richesse de l'aliment.",
        "Un document de la Pet Nutrition Alliance (une organisation de nutrition animale) donne la formule du besoin au repos (RER, pour resting energy requirement) : **RER = 70 × poids en kg à la puissance 0,75**. Cette formule est la même pour les chiens et les chats. Le besoin réel s'obtient en multipliant le RER par un facteur selon l'âge, l'activité et la stérilisation.",
        "Pour un chien adulte, l'alliance indique 1,6 fois le RER s'il est castré et 1,8 fois s'il ne l'est pas. Pour un chat adulte, 1,2 fois le RER s'il est stérilisé et 1,4 fois s'il ne l'est pas. Pour un chiot ou un chaton en croissance, le facteur est de 2 à 3 fois le RER, plus élevé quand l'animal est jeune, et il diminue à partir d'environ 4 mois.",
        "Même alliance, même avertissement : ces équations ne sont que des **estimations**, car un animal peut s'écarter de 50 % de la valeur prédite. Elles servent de point de départ, et la quantité est ensuite ajustée à la silhouette de l'animal.",
      ],
      encadre:
        "Autre repère : Purina cite la formule des lignes directrices de la FEDIAF (l'association européenne des fabricants d'aliments pour animaux), qui donne 110 × poids^0,75 pour un chien et 100 × poids^0,67 pour un chat. Pour un chien de 10 kg, cela fait 619 kcal, très proche des 630 kcal ci-dessous.",
    },
    {
      titre: "Combien de croquettes pour un chien adulte, selon son poids ?",
      paras: [
        "Voici le besoin d'un chien adulte d'activité normale (facteur 1,6) et la quantité de croquettes correspondante, **pour un aliment à 380 kcal pour 100 g**. Cette valeur est un exemple : remplacez-la par celle de votre aliment.",
      ],
      tableau: {
        colonnes: ["Poids du chien", "Besoin au repos (RER)", "Besoin par jour", "Croquettes par jour"],
        lignes: [
          ["5 kg", "234 kcal", "374 kcal", "99 g"],
          ["10 kg", "394 kcal", "630 kcal", "166 g"],
          ["20 kg", "662 kcal", "1 059 kcal", "279 g"],
          ["30 kg", "897 kcal", "1 436 kcal", "378 g"],
        ],
      },
      suite: [
        "Un aliment plus riche en énergie, par exemple 420 kcal pour 100 g, demande moins de grammes pour le même besoin : 630 kcal ÷ 4,2 = 150 g pour le chien de 10 kg. Un aliment « light » demande davantage. Le chiffre en grammes n'a de sens qu'avec la richesse de l'aliment en face.",
      ],
      visuel: {
        fichier: "croquettes-grammes-par-jour-selon-poids",
        alt: "Besoin d'énergie et quantité de croquettes par jour pour un chien adulte d'activité normale, avec un aliment à 380 kilocalories pour 100 grammes : 5 kg demandent 374 kcal soit 99 g ; 10 kg demandent 630 kcal soit 166 g ; 20 kg demandent 1 059 kcal soit 279 g ; 30 kg demandent 1 436 kcal soit 378 g",
        legende:
          "Besoin = 70 × poids^0,75 × 1,6 (Pet Nutrition Alliance) ; grammes = besoin ÷ 3,8 pour un aliment à 380 kcal pour 100 g, valeur d'exemple.",
      },
    },
    {
      titre: "Exemple chiffré : un chien de 10 kg et un sac de 5 kg",
      paras: [
        "Reprenons un chien adulte de 10 kg, d'activité normale, nourri avec des croquettes à 380 kcal pour 100 g (valeur d'exemple).",
      ],
      etapes: [
        "**Besoin au repos** : 70 × 10^0,75 = 393,6 kcal.",
        "**Besoin par jour** : 393,6 × 1,6 = 629,8 kcal.",
        "**Croquettes par jour** : 629,8 ÷ 3,8 = 166 g.",
        "**Durée d'un sac de 5 kg** : 5 000 ÷ 166 = environ 30 jours.",
      ],
      suite: [
        "Cette quantité englobe tout ce que le chien mange : si vous donnez des friandises ou des restes, retirez-en l'équivalent des croquettes. Pesez la ration avec une balance de cuisine plutôt qu'au verre doseur.",
      ],
      encadre:
        "Faites le calcul avec le poids de votre animal dans le [calculateur de calories pour chien et chat](/calcul-calories-chien-chat), qui donne le besoin en kcal, puis dans le [calculateur de ration pour chien](/calcul-ration-chien), qui donne une quantité en grammes à partir d'un tableau de poids.",
    },
    {
      titre: "Combien de croquettes pour un chiot ?",
      paras: [
        "Un chiot a besoin de beaucoup plus d'énergie qu'un adulte pour grandir : la Pet Nutrition Alliance retient 2 à 3 fois le RER, plus au début de la vie, avec une baisse à partir d'environ 4 mois jusqu'à la fin de la croissance, qui varie selon la race.",
        "Exemple : un chiot de 5 kg a un RER de 234 kcal, donc un besoin de 468 à 702 kcal par jour. Avec des croquettes à 380 kcal pour 100 g, cela fait **123 à 185 g par jour**. L'écart est large, ce qui rappelle que l'âge seul ne suffit pas : on regarde le poids, la race et la silhouette.",
        "C'est pourquoi il n'existe pas de chiffre unique pour « un chiot de 2 mois » ou « de 3 mois ». Le poids d'un chiot de cet âge dépend énormément de la race adulte. Suivez le tableau du sac, conçu pour un aliment « croissance », et pesez régulièrement votre chiot. Pour une race grande ou géante, demandez conseil au vétérinaire.",
      ],
    },
    {
      titre: "Combien de croquettes pour un chat ou un chaton ?",
      paras: [
        "Pour un chat, on utilise la même formule du RER, avec des facteurs plus bas : 1,2 fois le RER pour un adulte stérilisé, 1,4 fois pour un adulte entier, 2 à 3 fois pour un chaton.",
        "Exemple : un chat de 4 kg a un RER de 198 kcal. Stérilisé, son besoin est de 238 kcal par jour, soit **63 g** de croquettes à 380 kcal pour 100 g. Non stérilisé, il est de 277 kcal, soit **73 g**. Un chaton de 2 kg a un RER de 118 kcal, donc un besoin de 235 à 353 kcal par jour, soit **62 à 93 g**.",
      ],
      liste: [
        "**Chat stérilisé** : il dépense moins d'énergie, et la ration doit baisser en conséquence, sans quoi il grossit.",
        "**Chaton** : la ration baisse à mesure qu'il approche de l'âge adulte, à partir d'environ 4 mois.",
      ],
    },
    {
      titre: "Pourquoi le tableau du sac passe avant le calcul",
      paras: [
        "Purina précise que l'indication de l'énergie (kcal pour 100 g) n'est pas obligatoire sur les aliments pour animaux en Europe. Beaucoup de sacs ne la donnent donc pas. Dans ce cas, le plus simple est le **tableau de rationnement imprimé sur le sac**, qui propose une quantité selon le poids de l'animal. Si vous voulez la valeur en kcal, Purina indique que son service consommateurs peut la communiquer : renseignez-vous auprès de la marque de votre aliment.",
        "La Pet Nutrition Alliance rappelle que les tableaux des emballages sont eux aussi des points de départ. Elle précise que la quantité servie peut être augmentée ou diminuée pour maintenir ou atteindre une note d'état corporel idéale. Concrètement : si votre animal grossit ou maigrit, ajustez la ration. Au moindre doute, ou s'il est malade ou en net surpoids, c'est le vétérinaire qui fixe la ration.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-calories-chien-chat",
    nom: "Calories chien et chat",
    titre: "Calculez les calories de votre animal",
    texte:
      "Indiquez l'espèce, le poids, l'âge, l'activité et si l'animal est stérilisé : le calculateur donne le besoin au repos et le besoin quotidien en kcal, que vous convertissez en grammes avec la richesse de votre aliment.",
    bouton: "Ouvrir le calculateur de calories",
  },
  faq: [
    {
      q: "Combien de croquettes par jour pour un chien ?",
      a: "Cela dépend de son poids, de son âge et de l'aliment. Pour un chien adulte d'activité normale de 10 kg, environ 630 kcal par jour, soit 166 g avec des croquettes à 380 kcal pour 100 g (valeur d'exemple). Suivez le tableau du sac et ajustez selon la silhouette.",
    },
    {
      q: "Combien de croquettes par jour pour un chiot ?",
      a: "Un chiot a besoin de 2 à 3 fois son besoin au repos, d'après la Pet Nutrition Alliance. Un chiot de 5 kg : 468 à 702 kcal, soit 123 à 185 g avec des croquettes à 380 kcal pour 100 g. Utilisez le tableau du sac d'un aliment croissance et pesez le chiot régulièrement.",
    },
    {
      q: "Combien de croquettes par jour pour un chiot de 2 ou 3 mois ?",
      a: "Il n'y a pas de quantité unique : à cet âge, le poids dépend de la race adulte. Partez du poids actuel du chiot et du tableau du sac, puis ajustez avec le vétérinaire.",
    },
    {
      q: "Combien de croquettes par jour pour un chat ?",
      a: "Pour un chat adulte stérilisé de 4 kg, environ 238 kcal par jour, soit 63 g de croquettes à 380 kcal pour 100 g. Non stérilisé, environ 277 kcal, soit 73 g.",
    },
    {
      q: "Combien de croquettes par jour pour un chaton ?",
      a: "Un chaton a besoin de 2 à 3 fois son besoin au repos. Pour un chaton de 2 kg : 235 à 353 kcal par jour, soit 62 à 93 g de croquettes à 380 kcal pour 100 g. La ration diminue à partir d'environ 4 mois.",
    },
    {
      q: "Comment savoir si mon animal reçoit trop de croquettes ?",
      a: "Surveillez son poids et sa silhouette. S'il grossit, réduisez la ration et pensez à compter les friandises. La note d'état corporel, que le vétérinaire sait évaluer, est la référence pour savoir si la quantité convient.",
    },
    {
      q: "Pourquoi le calcul ne tombe pas juste pour mon animal ?",
      a: "La Pet Nutrition Alliance précise que ces équations sont des estimations : un animal peut s'écarter de 50 % de la valeur prédite. Elles servent de point de départ, qu'on ajuste selon la silhouette.",
    },
  ],
  sources: [
    {
      label: "Pet Nutrition Alliance : calcul des besoins énergétiques (RER et MER)",
      url: "https://petnutritionalliance.org/wp-content/uploads/2023/03/MER.RER_.PNA_.pdf",
    },
    {
      label: "Purina : pourquoi les calories ne figurent pas sur l'emballage (formules FEDIAF)",
      url: "https://www.purina.eu/contact-us/faq/science/calories",
    },
  ],
  datePublication: "2026-10-16",
  dateAffichee: "16 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
