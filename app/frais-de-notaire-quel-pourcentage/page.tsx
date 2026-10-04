import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Frais de notaire : quel pourcentage du prix ? (2026)";
const DESCRIPTION =
  "Les frais de notaire représentent en moyenne 7 à 8 % du prix dans l'ancien et 2 à 3 % dans le neuf. Composition, taux des droits de mutation et exemple chiffré.";

export const metadata: Metadata = {
  alternates: { canonical: "/frais-de-notaire-quel-pourcentage" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "frais de notaire quel pourcentage, combien de pourcentage frais de notaire, frais de notaire quel taux, comment se calculent les frais de notaire, qui règle les frais de notaire, c'est quoi les frais de notaire, droits de mutation, financer les frais de notaire",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/frais-de-notaire-quel-pourcentage",
  fil: "Frais de notaire : quel pourcentage",
  emoji: "📋",
  couleur: "from-cyan-500 to-blue-500",
  h1: "Frais de notaire : quel pourcentage du prix ?",
  chapo:
    "Cet article s'adresse à ceux qui préparent un achat immobilier, souvent un premier achat, et veulent savoir combien prévoir en plus du prix. Il explique ce que contiennent les frais de notaire, qui les paie et comment on les calcule.",
  reponse:
    "D'après les notaires, les frais de notaire représentent **en moyenne 7 à 8 % du prix dans l'ancien** et **2 à 3 % dans le neuf**. Pour un achat à 250 000 € dans l'ancien, le calculateur du site donne environ 18 291 €, soit 7,3 %. Ce sont des ordres de grandeur : le montant exact dépend du département et du bien. Ils sont payés par l'acheteur, en plus du prix.",
  sections: [
    {
      titre: "C'est quoi, les frais de notaire ?",
      paras: [
        "Les frais de notaire regroupent les droits de mutation, les débours et les émoluments du notaire. Les droits de mutation sont des taxes sur l'achat d'un bien immobilier. Les débours sont les sommes que le notaire avance pour constituer le dossier. Les émoluments sont sa rémunération.",
        "Le nom est trompeur : le notaire ne garde pas la totalité. Les droits et taxes sont des sommes reversées à l'État et aux collectivités territoriales.",
      ],
    },
    {
      titre: "Quel pourcentage dans l'ancien et dans le neuf ?",
      paras: [
        "Les notaires donnent deux repères moyens. Ils valent pour un achat de logement, avant toute particularité locale.",
      ],
      tableau: {
        colonnes: ["Type de bien", "Frais de notaire (en moyenne)", "Pourquoi cet écart"],
        lignes: [
          ["Ancien", "7 à 8 % du prix", "Droits de mutation, le plus souvent autour de 5,8 % du prix"],
          ["Neuf", "2 à 3 % du prix", "Droits réduits à 0,71 %, mais TVA dans le prix"],
        ],
        texte: true,
      },
      suite: [
        "Un bien est considéré comme neuf lorsqu'il a moins de 5 ans. Dans le neuf, l'acheteur est, pour l'essentiel, redevable de la TVA et de droits d'enregistrement réduits.",
      ],
      visuel: {
        fichier: "frais-de-notaire-pourcentage-ancien-neuf",
        alt: "Frais de notaire : 7 à 8 % du prix dans l'ancien et 2 à 3 % dans le neuf en moyenne, et détail d'un achat ancien à 250 000 € : 18 291,20 € de frais, dont 14 517,50 € de droits de mutation",
        legende:
          "Les frais de notaire en moyenne, et le détail de l'exemple à 250 000 € de cet article, calculé par le simulateur du site (débours estimés).",
      },
    },
    {
      titre: "Comment se calculent les frais de notaire ?",
      paras: [
        "On additionne quatre éléments, tous calculés à partir du prix de vente.",
      ],
      liste: [
        "**Les droits de mutation** : un pourcentage du prix, fixé par la loi et les départements. Dans l'ancien, ils pèsent le plus lourd.",
        "**Les émoluments du notaire** : un barème par tranches, identique quel que soit le notaire choisi, auquel s'ajoute une TVA de 20 %.",
        "**La contribution de sécurité immobilière** : 0,10 % du prix, jamais moins de 15 €.",
        "**Les débours** : les sommes avancées par le notaire, par exemple pour consulter le cadastre ou les documents d'urbanisme.",
      ],
      encadre:
        "Demandez toujours à votre notaire un devis écrit détaillé, ou un état prévisionnel du coût de l'opération. C'est lui qui fait foi, pas une simulation.",
    },
    {
      titre: "Le barème des émoluments du notaire",
      paras: [
        "En métropole, les émoluments d'un achat immobilier suivent ce barème, en vigueur depuis le 1er janvier 2021 d'après Service-Public.fr, qui précise que leur montant varie selon la situation géographique. Chaque taux s'applique seulement à la part du prix située dans la tranche.",
      ],
      tableau: {
        colonnes: ["Tranche de prix", "Taux"],
        lignes: [
          ["De 0 à 6 500 €", "3,870 %"],
          ["De 6 500 à 17 000 €", "1,596 %"],
          ["De 17 000 à 60 000 €", "1,064 %"],
          ["Au-delà de 60 000 €", "0,799 %"],
        ],
      },
      suite: [
        "Pour un appartement à 200 000 €, Service-Public.fr donne 1 995,25 € HT d'émoluments, avant TVA. Le calculateur du site retrouve ce même montant.",
      ],
    },
    {
      titre: "Le taux des droits de mutation et ce qui a changé",
      paras: [
        "Les droits de mutation se décomposent en une part départementale, une taxe communale de 1,20 % du prix et des frais d'assiette et de recouvrement perçus par l'État (2,37 % de la part départementale). Quand la part départementale est de 4,50 %, le total est de 5,81 % du prix.",
        "Depuis avril 2025, les départements peuvent porter leur part de 4,50 % à 5 %. Le taux global maximal passe alors à 6,32 %. Cette possibilité vaut pour les actes passés du 1er avril 2025 au 31 mars 2028.",
      ],
      liste: [
        "La hausse est décidée département par département. Votre notaire ou votre conseil départemental vous dit si le vôtre est concerné.",
        "Elle ne s'applique pas à une première acquisition destinée à devenir la résidence principale : le taux reste alors plafonné à 4,5 % pour la part départementale.",
        "La loi de finances pour 2026 a modifié le calendrier d'entrée en vigueur des délibérations des conseils départementaux.",
      ],
      encadre:
        "Le taux de votre département se vérifie sur impots.gouv.fr, ou auprès de votre notaire avant de signer le compromis.",
    },
    {
      titre: "Qui règle les frais de notaire ?",
      paras: [
        "C'est l'acquéreur. Ce sont des frais obligatoires, à régler au moment de la signature de l'acte définitif. Ils s'ajoutent donc au prix du bien dans votre budget.",
      ],
    },
    {
      titre: "Exemple chiffré : un achat à 250 000 € dans l'ancien",
      paras: [
        "Voici le détail du calculateur du site pour un bien ancien à 250 000 €. Il utilise un taux de droits de 5,807 %, le barème des émoluments ci-dessus et une estimation forfaitaire des débours.",
      ],
      etapes: [
        "**Droits de mutation** : 250 000 × 5,807 % = 14 517,50 €.",
        "**Émoluments du notaire** : 6 500 × 3,87 % + 10 500 × 1,596 % + 43 000 × 1,064 % + 190 000 × 0,799 % = 2 394,75 €.",
        "**TVA sur les émoluments** : 2 394,75 × 20 % = 478,95 €.",
        "**Débours et formalités** (estimation forfaitaire du calculateur) : 650 €.",
        "**Contribution de sécurité immobilière** : 250 000 × 0,10 % = 250 €.",
      ],
      suite: [
        "Total : 14 517,50 + 2 394,75 + 478,95 + 650 + 250 = **18 291,20 €**, soit **7,32 %** du prix. Le coût total de l'achat est de 268 291,20 €. Les droits de mutation représentent environ 80 % de ces frais : la plus grande part revient à l'État et aux collectivités, pas au notaire.",
        "Dans un département qui a voté 5 %, les droits montent à environ 6,32 % : 15 800 € au lieu de 14 517,50 €, et un total d'environ 19 574 €, soit environ 7,8 %. C'est pourquoi il faut garder une marge.",
      ],
      encadre:
        "Ce total est une estimation : les débours réels varient d'un dossier à l'autre. Seul le devis du notaire donne le montant exact.",
    },
    {
      titre: "Comment financer les frais de notaire ?",
      paras: [
        "Le plus simple est de les payer avec votre apport personnel. En 2025, les banques demandaient le plus souvent un apport d'au moins 10 % du prix du bien. D'après les notaires, cet apport sert justement à financer les frais annexes comme les frais de notaire, les frais de garantie ou les frais de dossier.",
        "Faire financer aussi les frais de notaire par le prêt n'est pas un droit : c'est la banque qui décide, selon votre situation et votre bien. Pour mesurer ce que vous pouvez emprunter, utilisez le [calcul de capacité d'emprunt](/calcul-capacite-emprunt) et le [simulateur de prêt immobilier](/simulateur-pret-immobilier). Vérifiez aussi votre [taux d'endettement](/calcul-taux-endettement).",
      ],
    },
  ],
  calculateur: {
    href: "/frais-de-notaire",
    nom: "Frais de notaire",
    titre: "Estimez vos frais de notaire",
    texte:
      "Indiquez le prix du bien et son type (ancien, neuf ou terrain) : le calculateur détaille les droits de mutation, les émoluments, la TVA et les débours, puis donne le total et le pourcentage du prix.",
    bouton: "Ouvrir le calculateur de frais de notaire",
  },
  faq: [
    {
      q: "Frais de notaire : quel pourcentage du prix ?",
      a: "En moyenne 7 à 8 % du prix dans l'ancien et 2 à 3 % dans le neuf, d'après les notaires. Pour un bien ancien à 250 000 €, le calculateur du site donne environ 7,3 %.",
    },
    {
      q: "Quel est le taux des droits de mutation ?",
      a: "Dans l'ancien, le total des droits est de 5,81 % du prix quand la part départementale est de 4,50 %. Depuis avril 2025, un département peut la porter à 5 %, ce qui donne un taux global maximal de 6,32 %. Cette hausse ne s'applique pas à un premier achat de résidence principale.",
    },
    {
      q: "Qui règle les frais de notaire ?",
      a: "L'acquéreur. Ils s'ajoutent au prix du bien et se règlent à la signature de l'acte définitif.",
    },
    {
      q: "Les frais de notaire vont-ils tous au notaire ?",
      a: "Non. Les droits et taxes sont reversés à l'État et aux collectivités territoriales. Le notaire reçoit ses émoluments, au barème réglementé, et se fait rembourser les débours qu'il a avancés. Dans notre exemple à 250 000 €, les droits représentent environ 80 % des frais.",
    },
    {
      q: "Peut-on financer les frais de notaire avec un prêt ?",
      a: "Ce n'est pas un droit : c'est la banque qui décide, selon votre situation et votre bien. Elle demande le plus souvent un apport, qui sert justement à payer ces frais annexes.",
    },
  ],
  sources: [
    {
      label: "Impots.gouv.fr : achat dans le neuf",
      url: "https://www.impots.gouv.fr/particulier/achat-dans-le-neuf",
    },
    {
      label: "Impots.gouv.fr : quels frais payer chez le notaire en achetant un bien immobilier",
      url: "https://www.impots.gouv.fr/particulier/questions/jachete-un-bien-immobilier-quaurai-je-payer-comme-frais-au-notaire",
    },
    {
      label: "Service-Public.fr : frais de notaire, de quoi s'agit-il ?",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F17701",
    },
    {
      label: "Service-Public.fr : les droits de mutation augmentent dans certains départements",
      url: "https://www.service-public.gouv.fr/particuliers/actualites/A18183",
    },
    {
      label: "BOFiP : dispositions temporaires relatives aux droits de mutation (lois de finances 2025 et 2026)",
      url: "https://bofip.impots.gouv.fr/bofip/14771-PGP.html/ACTU-2025-00129",
    },
    {
      label: "Immobilier.notaires.fr : frais cachés d'un achat immobilier",
      url: "https://www.immobilier.notaires.fr/fr/articles/conseils-et-actualites/achat-vente/frais-caches-dun-achat-immobilier-les-connaitre-avant-de-signer",
    },
    {
      label: "Immobilier.notaires.fr : optimiser son apport personnel",
      url: "https://www.immobilier.notaires.fr/fr/articles/conseils-et-actualites/achat-vente/optimiser-son-apport-personnel-pour-bien-acheter-en-2025",
    },
  ],
  datePublication: "2026-10-03",
  dateAffichee: "3 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
