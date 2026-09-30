import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer l'octroi de mer ? Formule et exemple";
const DESCRIPTION =
  "L'octroi de mer se calcule en multipliant la valeur du bien par le taux voté par la collectivité. Formule, exemple à La Réunion et où trouver le taux.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-octroi-de-mer" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "comment calculer l'octroi de mer, calcul octroi de mer, taux octroi de mer, octroi de mer réunion, octroi de mer martinique, octroi de mer guadeloupe, octroi de mer régional, qui paie l'octroi de mer",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
    images: [{ url: "/calcul-octroi-de-mer/opengraph-image.png", width: 1200, height: 630 }],
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-octroi-de-mer",
  fil: "Calculer l'octroi de mer",
  emoji: "🏝️",
  couleur: "from-blue-500 to-indigo-600",
  h1: "Comment calculer l'octroi de mer ?",
  chapo:
    "Cet article s'adresse à celles et ceux qui reçoivent un colis ou importent des marchandises en Guadeloupe, en Martinique, en Guyane, à La Réunion ou à Mayotte. Il explique la formule, la valeur retenue et l'endroit où trouver le taux.",
  reponse:
    "L'octroi de mer se calcule en appliquant à la valeur du bien un **taux fixé par la collectivité** : octroi de mer = valeur × taux. Pour un bien importé, la valeur retenue est la valeur en douane. Si la collectivité a instauré un octroi de mer régional, il se calcule de la même façon avec son propre taux. Exemple : sur 1 000 € de marchandise avec un taux de 12,5 %, l'octroi de mer est de **125 €**. Le taux dépend du produit et du territoire : il faut le lire dans le tarif de la douane.",
  sections: [
    {
      titre: "Qu'est-ce que l'octroi de mer ?",
      paras: [
        "D'après la douane, l'octroi de mer est une taxe perçue au profit des collectivités locales des départements d'outre-mer. Elle s'applique aux marchandises introduites dans ces territoires, quelle que soit leur provenance.",
        "Toujours d'après la douane, elle concerne aussi certaines livraisons de biens produits localement. Cet article se concentre sur le cas le plus courant pour un particulier : le bien qui arrive de l'extérieur.",
      ],
    },
    {
      titre: "La formule, pas à pas",
      paras: [
        "Le calcul tient en quelques lignes. Chaque taxe se calcule séparément sur la même valeur de départ.",
      ],
      etapes: [
        "Repérez la **valeur du bien** (voir la section suivante).",
        "Trouvez le **taux d'octroi de mer** qui correspond à votre produit.",
        "Multipliez : **octroi de mer = valeur × taux**.",
        "S'il existe un octroi de mer régional, multipliez la même valeur par son taux : **octroi de mer régional = valeur × taux régional**.",
        "Ajoutez ensuite la TVA, calculée de son côté (voir l'exemple). Le [simulateur du site](/calcul-octroi-de-mer) applique la TVA à la valeur du bien seule, sans y ajouter l'octroi de mer.",
      ],
      encadre:
        "Le taux s'écrit en pourcentage. Pour multiplier, divisez-le par 100 : 12,5 % devient 0,125. Pour manier les pourcentages, voir aussi [le calcul de pourcentage](/calcul-pourcentage).",
    },
    {
      titre: "Sur quelle valeur calcule-t-on ?",
      paras: [
        "D'après la douane, la valeur retenue pour un bien importé est la **valeur en douane** au sens des règles communautaires. Pour les livraisons de biens produits sur place, c'est le prix hors taxe sur la valeur ajoutée.",
        "Le simulateur du site parle de « valeur CAF » (coût, assurance, fret) : c'est la valeur du bien rendu à la frontière du territoire, transport et assurance compris. C'est cette valeur que vous saisissez dans le simulateur. En cas de doute sur la valeur exacte à retenir, votre transporteur ou la douane pourra vous la confirmer.",
      ],
    },
    {
      titre: "D'où vient le taux ? Où le trouver ?",
      paras: [
        "Le taux n'est pas national. La douane indique que les taux d'octroi de mer sont fixés par délibérations des conseils régionaux (ou du conseil général à Mayotte). Ils varient donc d'un territoire à l'autre, et d'un produit à l'autre.",
        "Pour le connaître, la douane renvoie vers son service en ligne du tarif douanier, appelé RITA, ainsi que vers les tarifs d'octroi de mer publiés sur son site pour chaque territoire. Il faut connaître le classement douanier de votre produit pour y lire la ligne qui vous concerne.",
      ],
      encadre:
        "Pour un colis, la douane cite à titre d'ordre de grandeur, pour la Guadeloupe, des taux moyens de 7 % pour l'octroi de mer et de 2,5 % pour l'octroi de mer régional. Il s'agit de moyennes : le taux réel de votre produit peut être différent.",
    },
    {
      titre: "Exemple détaillé à La Réunion",
      paras: [
        "Prenons 1 000 € de marchandise importée à La Réunion, avec un octroi de mer de 12,5 %, un octroi de mer régional de 2,5 % et une TVA de 8,5 %. Ce sont les chiffres de l'exemple du simulateur, à titre d'illustration : ils ne correspondent pas à un produit précis.",
      ],
      etapes: [
        "Octroi de mer : 1 000 × 12,5 % = **125 €**.",
        "Octroi de mer régional : 1 000 × 2,5 % = **25 €**.",
        "TVA : 1 000 × 8,5 % = **85 €**.",
        "Total des taxes : 125 + 25 + 85 = **235 €**.",
        "Coût rendu : 1 000 + 235 = **1 235 €**, soit 23,5 % de plus que la valeur de départ.",
      ],
    },
    {
      titre: "Un second exemple avec un autre taux",
      paras: [
        "Prenons une marchandise de 600 € en Guadeloupe, avec les taux moyens que la douane cite à titre indicatif sur sa page consacrée aux colis : octroi de mer 7 %, octroi de mer régional 2,5 %, TVA 8,5 %. Le taux réel de votre produit peut différer.",
      ],
      tableau: {
        colonnes: ["Ligne", "Taux", "Montant"],
        lignes: [
          ["Octroi de mer", "7 %", "42 €"],
          ["Octroi de mer régional", "2,5 %", "15 €"],
          ["TVA", "8,5 %", "51 €"],
          ["Total des taxes", "", "108 €"],
          ["Coût rendu (600 € + 108 €)", "", "708 €"],
        ],
      },
    },
    {
      titre: "Qui paie, et à quel moment ?",
      paras: [
        "D'après la douane, les importations de biens sont soumises à l'octroi de mer « externe » quelle que soit leur provenance. Il est exigible lors de l'entrée dans le département d'outre-mer ou lors de la mise à la consommation, et il est liquidé sur la déclaration en douane.",
        "Pour un professionnel qui importe, c'est donc la déclaration en douane qui fixe le montant. Pour un particulier qui reçoit un colis, la douane précise qu'elle ne taxe ni ne détient aucun colis : en pratique, c'est le transporteur (La Poste, DHL, FedEx) qui est votre interlocuteur pour la taxation.",
        "La douane indique aussi, pour la Guadeloupe, qu'un colis non commercial (envoyé par la famille ou un ami) venant de l'Union européenne, France hexagonale incluse, ne supporte aucun droit ni taxe si sa valeur ne dépasse pas 400 €. Le seuil est de 45 € s'il vient d'un pays hors de l'Union européenne. Pour un achat, les règles sont différentes : vérifiez-les sur le site de la douane avant d'estimer votre facture.",
      ],
    },
    {
      titre: "Ce que fait le simulateur du site",
      paras: [
        "Le [simulateur d'octroi de mer](/calcul-octroi-de-mer) réalise exactement ces multiplications : vous saisissez la valeur, le territoire et les taux, il affiche l'octroi de mer, l'octroi de mer régional, la TVA, le total des taxes et le coût rendu.",
        "Il ne devine pas le taux de votre produit : c'est à vous de le lire dans le tarif de la douane. Le résultat est une estimation. Pour une opération importante, rapprochez-vous de votre transitaire ou de la douane.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-octroi-de-mer",
    nom: "Calcul octroi de mer",
    titre: "Calculez votre octroi de mer en quelques secondes",
    texte:
      "Saisissez la valeur du bien, le territoire et les taux : le simulateur affiche les taxes et le coût rendu.",
    bouton: "Ouvrir le simulateur d'octroi de mer",
  },
  faq: [
    {
      q: "Comment calculer l'octroi de mer à La Réunion ?",
      a: "La méthode est la même que dans les autres territoires : on multiplie la valeur du bien par le taux d'octroi de mer, puis par le taux régional s'il existe. La douane indique que ces taux figurent dans le tarif d'octroi de mer de La Réunion, consultable en ligne. Lisez la ligne qui correspond à votre produit avant de calculer.",
    },
    {
      q: "Quel est le taux d'octroi de mer en Martinique ?",
      a: "Il n'y a pas un taux unique. La douane précise que les taux sont fixés par délibérations des conseils régionaux, et ils varient selon le produit. Consultez le tarif d'octroi de mer de la Martinique sur le site de la douane pour lire le taux de votre article.",
    },
    {
      q: "Qui perçoit l'octroi de mer ?",
      a: "Selon la douane, c'est une taxe perçue au profit des collectivités locales des départements d'outre-mer.",
    },
    {
      q: "Qui paie l'octroi de mer ?",
      a: "Les importations de biens y sont soumises, quelle que soit leur provenance. Lorsque vous recevez un colis, le transporteur est votre interlocuteur pour la taxation. Pour les livraisons de biens produits sur place, la douane indique aussi qu'il s'applique aux personnes qui exercent une activité de production.",
    },
    {
      q: "Comment éviter l'octroi de mer ?",
      a: "On ne peut pas l'éviter, mais on peut vérifier si un seuil de franchise s'applique. Pour un colis non commercial venant de l'Union européenne et reçu en Guadeloupe, la douane indique qu'aucun droit ni taxe n'est dû jusqu'à 400 €. Ces seuils dépendent de la provenance et de la nature de l'envoi : vérifiez-les sur le site de la douane.",
    },
  ],
  sources: [
    {
      label: "Douane – Octroi de mer (lexique)",
      url: "https://www.douane.gouv.fr/lexique/octroi-de-mer",
    },
    {
      label: "Douane – Importer un bien dans un DROM",
      url: "https://www.douane.gouv.fr/demarche/importer-un-bien-dans-un-drom",
    },
    {
      label: "Douane – Customs taxation in the overseas departments",
      url: "https://www.douane.gouv.fr/en/fiche/customs-taxation-overseas-departments",
    },
    {
      label: "Douane – L'octroi de mer à La Réunion",
      url: "https://www.douane.gouv.fr/fiche/loctroi-de-mer-la-reunion",
    },
    {
      label: "Douane – Recevoir un colis en Guadeloupe (particuliers)",
      url: "https://www.douane.gouv.fr/fiche/recevoir-un-colis-en-guadeloupe-particuliers",
    },
  ],
  datePublication: "2026-09-30",
  dateAffichee: "30 septembre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
