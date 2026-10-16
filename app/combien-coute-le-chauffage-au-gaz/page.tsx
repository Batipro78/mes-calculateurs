import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Combien coûte le chauffage au gaz ? Par mois, par an et par m²";
const DESCRIPTION =
  "Au prix repère de la CRE d'octobre 2026, un client chauffé au gaz (11 370 kWh par an) paie environ 2 016 € par an, soit 168 € par mois, abonnement compris. Le calcul, le coût au m², et ce qui fait varier la facture.";

export const metadata: Metadata = {
  alternates: { canonical: "/combien-coute-le-chauffage-au-gaz" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "combien coûte le chauffage au gaz, coût chauffage gaz par mois, coût chauffage gaz par an, coût chauffage gaz au m2, coût moyen chauffage gaz, prix du kWh de gaz, facture de gaz chauffage, chauffage gaz maison 100m2",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/combien-coute-le-chauffage-au-gaz",
  fil: "Combien coûte le chauffage au gaz",
  emoji: "🔥",
  couleur: "from-orange-500 to-red-600",
  h1: "Combien coûte le chauffage au gaz ?",
  chapo:
    "Cet article répond à ceux qui veulent savoir ce que le chauffage au gaz coûte chaque mois et chaque année. Il part du prix repère publié par la CRE (Commission de régulation de l'énergie), donne la facture d'un client type, calcule le coût selon la surface et explique pourquoi le coût au mètre carré n'a pas de valeur unique.",
  reponse:
    "La CRE retient pour un client chauffé au gaz une consommation de référence de **11 370 kWh par an**. Au prix repère d'octobre 2026 (0,14557 € TTC le kWh en prix moyen, abonnement de 360,79 € TTC par an), la facture est d'environ **2 016 € par an**, soit **168 € par mois**. Pour un logement de 80 m² qui consommerait 13 000 kWh par an (hypothèse de ce site), on arrive à environ 2 253 € par an, soit 188 € par mois.",
  sections: [
    {
      titre: "Le prix du gaz : ce que dit le prix repère de la CRE",
      paras: [
        "Les tarifs réglementés de vente de gaz ont pris fin le 30 juin 2023 : chaque fournisseur fixe librement ses offres. La CRE publie chaque mois un prix repère, qui sert de point de comparaison. Il est donné pour la zone de distribution de GRDF, qui dessert environ 95 % des clients résidentiels, en distinguant les clients « cuisson / eau chaude » et les clients « chauffage ».",
        "Grille du prix repère d'octobre 2026 pour un client chauffage, tout compris (taxes, TVA, CTA) : un abonnement de 360,79 € par an, soit 30,07 € par mois, et un prix du kWh qui va de 0,13594 € (fourchette basse) à 0,16436 € (fourchette haute), avec 0,14557 € en prix moyen. La CRE a déjà publié la grille de novembre 2026 : le kWh moyen passe à 0,15760 €, soit 8 % de plus.",
      ],
      encadre:
        "Le prix repère n'est pas votre prix. Votre contrat est fixé par votre fournisseur, avec son propre abonnement et son propre prix du kWh. Lisez ces deux lignes sur votre facture et refaites le calcul avec vos chiffres.",
    },
    {
      titre: "Le calcul : la facture d'un client chauffé au gaz",
      paras: [
        "La formule est simple : **facture annuelle = abonnement + (kWh consommés × prix du kWh)**. Pour le client type de la CRE (11 370 kWh par an, prix moyen d'octobre 2026) :",
      ],
      etapes: [
        "**Part variable** : 11 370 kWh × 0,14557 € = 1 655,13 €.",
        "**Abonnement** : 360,79 € par an.",
        "**Total par an** : 1 655,13 + 360,79 = **2 015,92 €**.",
        "**Par mois** : 2 015,92 ÷ 12 = **167,99 €**, dont 30,07 € d'abonnement.",
      ],
      suite: [
        "Avec les fourchettes du prix repère, la facture annuelle du même client va de 1 906,43 € (fourchette basse) à 2 229,56 € (fourchette haute). Avec la grille de novembre 2026, elle serait de 2 152,70 € au prix moyen.",
      ],
    },
    {
      titre: "Coût du chauffage au gaz selon la surface : 50, 80 ou 120 m²",
      paras: [
        "Les consommations ci-dessous sont des hypothèses de ce site pour trois tailles de logement, pas des valeurs officielles : la vraie consommation dépend de l'isolation, de la région et de la manière de se chauffer. Les prix sont ceux du prix repère moyen d'octobre 2026, abonnement compris.",
      ],
      tableau: {
        colonnes: ["Logement chauffé au gaz", "Consommation", "Par an", "Par mois"],
        lignes: [
          ["50 m² (hypothèse)", "8 000 kWh", "1 525 €", "127 €"],
          ["Client type de la CRE", "11 370 kWh", "2 016 €", "168 €"],
          ["80 m² (hypothèse)", "13 000 kWh", "2 253 €", "188 €"],
          ["120 m² (hypothèse)", "20 000 kWh", "3 272 €", "273 €"],
        ],
      },
      visuel: {
        fichier: "chauffage-gaz-facture-annuelle-selon-consommation",
        alt: "Facture de chauffage au gaz au prix repère de la CRE d'octobre 2026, abonnement compris : 8 000 kWh soit 1 525 euros par an, 11 370 kWh (client type de la CRE) soit 2 016 euros, 13 000 kWh soit 2 253 euros, 20 000 kWh soit 3 272 euros",
        legende:
          "Prix repère de la CRE d'octobre 2026 (zone GRDF, client chauffage, prix moyen) : abonnement 360,79 € par an et kWh à 0,14557 € TTC. Seule la consommation de 11 370 kWh est celle de la CRE ; les autres sont des hypothèses de ce site.",
      },
    },
    {
      titre: "Le coût du chauffage au gaz au m² : pourquoi il n'y a pas un seul chiffre",
      paras: [
        "Le coût au mètre carré dépend d'une seule chose : combien de kWh le logement consomme par m² et par an. Un logement bien isolé consomme beaucoup moins qu'une passoire thermique de même surface. Nous n'avons pas de consommation moyenne par m² issue d'une source officielle, donc nous donnons la méthode plutôt qu'un chiffre unique.",
        "La formule : **coût au m² par an = kWh par m² × prix du kWh**, plus la part d'abonnement. Avec le prix moyen d'octobre 2026 (0,14557 € le kWh) :",
      ],
      tableau: {
        colonnes: ["Consommation du logement", "Coût au m² par an (kWh seul)"],
        lignes: [
          ["100 kWh par m² et par an", "14,56 €"],
          ["150 kWh par m² et par an", "21,84 €"],
          ["200 kWh par m² et par an", "29,11 €"],
        ],
      },
      suite: [
        "Ce sont des valeurs d'exemple. Pour connaître la vôtre, divisez la consommation annuelle en kWh de votre facture de gaz par la surface chauffée. À titre de repère, la consommation de référence de la CRE (11 370 kWh) rapportée à 80 m² donne 142 kWh par m² et par an.",
      ],
    },
    {
      titre: "Ce qui fait baisser la facture de chauffage au gaz",
      paras: [
        "Le levier le plus simple est la température. Le guide « Eau et énergie : comment réduire la facture ? » du ministère de la Transition écologique, réalisé avec l'ADEME, donne un repère : baisser le chauffage de 1 °C, c'est 7 % de consommation d'énergie en moins. C'est un ordre de grandeur.",
      ],
      etapes: [
        "**Consommation de départ** : 13 000 kWh par an (exemple d'un logement de 80 m²).",
        "**Un degré en moins** : 13 000 × 7 % = 910 kWh de moins.",
        "**Économie** : 910 kWh × 0,14557 € = environ **132 € par an**. L'abonnement ne baisse pas.",
      ],
      suite: [
        "Pour savoir à quelle température chauffer chaque pièce, voir notre article [quelle température pour le chauffage](/quelle-temperature-pour-le-chauffage). Les autres leviers (isolation, entretien de la chaudière, changement d'offre) dépendent de votre logement et de votre contrat.",
      ],
    },
  ],
  calculateur: {
    href: "/simulateur-facture-gaz",
    nom: "Simulateur de facture de gaz",
    titre: "Estimez votre facture de gaz",
    texte:
      "Indiquez votre usage (chauffage, cuisson, eau chaude) et votre consommation annuelle : le simulateur applique le prix repère de la CRE et détaille la facture par mois et par an, avec abonnement, taxes et TVA.",
    bouton: "Ouvrir le simulateur de facture de gaz",
  },
  faq: [
    {
      q: "Combien coûte le chauffage au gaz par mois ?",
      a: "Pour le client chauffé au gaz de référence de la CRE (11 370 kWh par an), environ 168 € par mois au prix repère moyen d'octobre 2026, dont 30,07 € d'abonnement. C'est une moyenne sur l'année : en pratique la consommation est concentrée sur les mois froids.",
    },
    {
      q: "Combien coûte le chauffage au gaz par an ?",
      a: "Environ 2 016 € par an pour 11 370 kWh au prix repère moyen d'octobre 2026, abonnement compris. La fourchette du prix repère va de 1 906 € à 2 230 € pour le même volume.",
    },
    {
      q: "Quel est le coût moyen du chauffage au gaz au m² ?",
      a: "Il n'y a pas de valeur unique : il dépend de la consommation du logement par m². Le coût au m² par an est égal aux kWh consommés par m² multipliés par le prix du kWh. À 150 kWh par m² et par an et 0,14557 € le kWh, on arrive à 21,84 € par m² (hors abonnement).",
    },
    {
      q: "Combien coûte le chauffage au gaz pour une maison de 100 m² ?",
      a: "Cela dépend de la consommation. À titre d'exemple, à 150 kWh par m² et par an, une maison de 100 m² consomme 15 000 kWh, soit 360,79 + 15 000 × 0,14557 = 2 544 € par an, environ 212 € par mois, au prix repère moyen d'octobre 2026.",
    },
    {
      q: "Quel est le prix du kWh de gaz en 2026 ?",
      a: "Au prix repère de la CRE d'octobre 2026, pour un client chauffage, le kWh coûte 0,14557 € TTC en prix moyen (de 0,13594 € à 0,16436 €), avec un abonnement de 360,79 € TTC par an. Le kWh moyen de novembre 2026 est de 0,15760 €.",
    },
    {
      q: "Le prix repère de la CRE est-il le prix que je paie ?",
      a: "Non. Les tarifs réglementés de vente de gaz ont pris fin le 30 juin 2023 et chaque fournisseur fixe ses offres. Le prix repère sert de comparaison : lisez le prix du kWh et l'abonnement de votre contrat.",
    },
    {
      q: "Combien économise-t-on en baissant le chauffage d'un degré ?",
      a: "Le ministère de la Transition écologique et l'ADEME donnent 7 % de consommation en moins par degré. Pour 13 000 kWh par an au prix repère d'octobre 2026, cela représente environ 132 € par an. C'est un ordre de grandeur.",
    },
  ],
  sources: [
    {
      label: "CRE : prix repère de vente de gaz naturel à destination des clients résidentiels",
      url: "https://www.cre.fr/consommateurs/prix-reperes-et-references/prix-repere-de-vente-de-gaz-naturel-a-destination-des-clients-residentiels.html",
    },
    {
      label: "CRE : construction du prix repère de vente de gaz (données ouvertes)",
      url: "https://www.cre.fr/documents/open-data/construction-du-prix-repere-de-vente-de-gaz-de-la-cre.html",
    },
    {
      label: "Ministère de la Transition écologique et ADEME : Eau et énergie, comment réduire la facture ?",
      url: "https://www.ecologie.gouv.fr/sites/default/files/documents/Eau%20-%20e%CC%81nergie%20-%20comment%20re%CC%81duire%20sa%20facture.pdf",
    },
  ],
  datePublication: "2026-10-16",
  dateAffichee: "16 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
