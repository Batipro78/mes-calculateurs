import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Quelle température régler pour le chauffage ? (salon, chambre, nuit, absence)";
const DESCRIPTION =
  "19 °C dans les pièces de vie, 17 à 18 °C dans la chambre la nuit, hors gel si vous partez : les repères de l'ADEME et la limite légale de 19 °C. Baisser d'un degré fait environ 7 % de consommation en moins.";

export const metadata: Metadata = {
  alternates: { canonical: "/quelle-temperature-pour-le-chauffage" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "quelle température chauffage maison, température de chauffage réglementaire, chauffage quelle température la nuit, je descends la température du chauffage, température de chauffage recommandé, chauffage collectif quelle température, quelle température chauffage chambre, quelle température chauffage quand on est absent, comment calculer une facture de gaz, réduire sa facture de gaz",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/quelle-temperature-pour-le-chauffage",
  fil: "Quelle température pour le chauffage",
  emoji: "🌡️",
  couleur: "from-orange-500 to-red-500",
  h1: "Quelle température régler pour le chauffage ?",
  chapo:
    "La saison de chauffe commence. Cet article donne la température conseillée pièce par pièce, la nuit et quand vous êtes absent, rappelle la limite fixée par la loi, et chiffre ce que fait gagner un degré de moins sur une facture de gaz.",
  reponse:
    "Les repères de l'ADEME : **19 °C** dans les pièces de vie occupées, **17 °C** dans la chambre la nuit (une autre fiche de l'ADEME dit 18 °C), **16 à 17 °C** dans une pièce vide, et la position **hors gel** si vous vous absentez quelques jours. La loi fixe aussi un plafond : **19 °C en moyenne** dans l'ensemble du logement. Chaque degré en moins fait environ **7 % de consommation en moins** (ministère de la Transition écologique et ADEME) : sur un logement chauffé au gaz à 13 000 kWh par an, cela représente environ 132 € par an, au prix de gaz d'octobre 2026.",
  sections: [
    {
      titre: "Les températures conseillées, en un coup d'œil",
      paras: [
        "Il est inutile de chauffer toutes les pièces à la même température, 24 heures sur 24 : c'est la première idée de l'ADEME (l'Agence de la transition écologique). Voici les repères officiels, avec qui les donne. Les températures sont celles de l'air de la pièce, pas celle de l'eau de la chaudière.",
      ],
      tableau: {
        colonnes: ["Situation", "Température", "Source"],
        lignes: [
          ["Pièce de vie occupée (salon, bureau)", "19 °C", "ADEME, décembre 2025"],
          ["Pièce de vie inoccupée", "16 à 17 °C", "ADEME, décembre 2025"],
          ["Chambre, la nuit et quand elle est inoccupée", "17 °C (18 °C sur une autre fiche)", "ADEME"],
          ["Chambre d'enfant", "17 °C la nuit, 19 °C quand elle est occupée en journée", "ADEME, décembre 2025"],
          ["Salle de bain", "22 °C quand on l'utilise, 16 à 17 °C le reste du temps", "ADEME, décembre 2025"],
          ["Absence dans la journée", "16 à 17 °C", "ADEME"],
          ["Absence de quelques jours", "Position hors gel", "ADEME"],
          ["Moyenne de tout le logement", "19 °C au maximum", "Code de l'énergie, article R241-26"],
        ],
        texte: true,
      },
      visuel: {
        fichier: "chauffage-temperatures-conseillees-par-situation",
        alt: "Températures de chauffage conseillées par situation : 19 °C dans une pièce de vie occupée, 16 à 17 °C quand elle est inoccupée, 17 à 18 °C dans la chambre la nuit, 22 °C dans la salle de bain quand on l'utilise (ADEME). Limites légales pendant une absence : 16 °C de 24 à 48 heures, 8 °C au-delà. Moyenne maximale dans un logement : 19 °C (Code de l'énergie).",
        legende:
          "Repères de l'ADEME (fiche « Les bons gestes pour un chauffage plus économique », 12 décembre 2025, et fiche « 20 solutions » pour les 18 °C de la nuit) et limites du Code de l'énergie (articles R241-26 et R241-27). Les limites légales sont des maximums, pas des consignes à viser.",
      },
      encadre:
        "L'ADEME ne dit pas la même chose partout pour la nuit : 17 °C dans sa fiche sur le chauffage économique, 18 °C (« pas plus pour préserver le sommeil de toute la famille ») dans sa fiche sur l'électricité. Retenez une fourchette de 17 à 18 °C.",
    },
    {
      titre: "Les pièces de vie : 19 °C quand on y est",
      paras: [
        "Pour le salon, la salle à manger ou le bureau, l'ADEME conseille **19 °C quand la pièce est occupée** et 16 à 17 °C quand elle est inoccupée. Elle précise qu'il est inutile de chauffer à 19 °C si vous n'êtes pas chez vous.",
        "Si vous avez froid à 19 °C, regardez d'abord le logement avant de monter le thermostat. L'ADEME le dit ainsi : même avec un thermostat à 19 °C, vous pouvez avoir un ressenti de 16,5 °C, à cause d'un fort taux d'humidité, de courants d'air ou de murs froids. Un thermomètre dans la pièce permet de savoir ce qu'il fait vraiment (le guide du ministère de la Transition écologique et de l'ADEME le recommande). Pour estimer la classe énergie de votre logement, il existe aussi le [simulateur de DPE](/calculateur-dpe).",
      ],
    },
    {
      titre: "La chambre et la nuit : 17 à 18 °C",
      paras: [
        "La nuit, on peut baisser. L'ADEME donne **17 °C pour une chambre**, la nuit comme quand elle est inoccupée. Sa fiche sur le chauffage électrique indique 18 °C la nuit et ajoute : pas plus, pour préserver le sommeil de toute la famille.",
        "Pour une chambre d'enfant, la fiche de décembre 2025 distingue deux moments : 17 °C la nuit, 19 °C quand elle est occupée en journée. La salle de bain est à part : 22 °C quand on l'utilise, 16 à 17 °C le reste du temps.",
        "Le plus simple pour changer de température à heure fixe est un thermostat programmable. D'après le guide du ministère de la Transition écologique et de l'ADEME, pour 60 à 250 €, il permet jusqu'à 15 % d'économie de chauffage.",
      ],
    },
    {
      titre: "Absence courte, absence longue : que faire ?",
      paras: [
        "Chauffer un logement vide coûte de l'argent pour rien. Les repères officiels dépendent de la durée.",
      ],
      liste: [
        "**Absence pour la journée :** baissez de quelques degrés, 16 à 17 °C suffisent (ADEME).",
        "**Absence de quelques jours :** mettez le système de chauffage en position hors gel (ADEME). Le guide du ministère et de l'ADEME dit la même chose : baisser le chauffage en cas de courte absence, et le mettre en hors gel en cas d'absence prolongée.",
        "**Ce que dit la loi pendant une inoccupation :** de 24 heures à moins de 48 heures, la température moyenne de chauffage est limitée à 16 °C ; à partir de 48 heures, à 8 °C (Code de l'énergie, article R241-27). Ce sont des plafonds : vous pouvez chauffer moins.",
      ],
      suite: [
        "L'ADEME ne donne pas de température précise pour le mode hors gel : le réglage dépend de votre thermostat ou de votre chaudière, regardez sa notice. La loi, elle, plafonne à 8 °C la température moyenne à partir de 48 heures d'inoccupation.",
      ],
    },
    {
      titre: "Ce que dit la loi : 19 °C en moyenne",
      paras: [
        "L'article R241-26 du Code de l'énergie fixe à **19 °C en moyenne** la limite supérieure de température de chauffage pour l'ensemble des pièces d'un logement. Cette règle ne s'applique pas pendant les périodes d'inoccupation, qui ont leurs propres limites (16 °C et 8 °C, voir plus haut).",
        "C'est une **moyenne**, pas un maximum pièce par pièce. Service-public explique que la température d'une pièce est celle de l'air, mesurée au centre de la pièce à 1,5 mètre du sol, et que la moyenne se calcule en pondérant chaque pièce par son volume. Son exemple : une pièce de 20 m³ à 18 °C et une pièce de 25 m³ à 19 °C donnent une moyenne de 18,6 °C. Une pièce peut donc dépasser 19 °C si les autres sont plus fraîches.",
        "La loi prévoit une sanction : les infractions aux articles R241-25 à R241-29 sont punies de l'amende des contraventions de la 5e classe, qui peut être doublée en cas de récidive (article R241-29-1).",
      ],
      liste: [
        "**Logements avec des soins médicaux, des personnes âgées ou des enfants en bas âge :** la page du ministère de la Transition écologique indique une limite plus haute, 22 °C en moyenne et 24 °C pour une pièce. Si vous êtes dans ce cas, renseignez-vous sur ce texte (arrêté du 25 juillet 1977).",
        "**Un minimum existe aussi :** pour un logement dont le permis de construire a été déposé après le 1er juin 2001, la température au centre de chaque pièce doit pouvoir être maintenue à 18 °C au minimum (service-public).",
      ],
    },
    {
      titre: "Chauffage collectif ou logement loué : qui règle quoi ?",
      paras: [
        "Dans un immeuble à chauffage collectif, vous ne réglez pas toujours la chaudière. La règle des 19 °C en moyenne vaut quand même pour votre logement, et service-public précise qu'un chauffage qui ne permet pas de dépasser 19 °C de moyenne ne doit pas être considéré comme défaillant.",
        "Si vous avez trop froid : en général, un chauffage est considéré comme insuffisant quand il ne permet pas d'atteindre 18 °C au centre de chaque pièce (service-public). Pour un logement récent (permis déposé après le 1er juin 2001), le locataire peut alors exiger du propriétaire qu'il intervienne, et le copropriétaire peut exiger du syndic qu'il intervienne en cas de chauffage collectif. Si la température est d'au moins 18 °C, on ne peut pas exiger une hausse, et un chauffage d'appoint est à votre charge.",
      ],
      encadre:
        "Faites d'abord mesurer la température avec un thermomètre au centre de la pièce. Service-public rappelle que vous pouvez faire vous-même un contrôle de température ou le faire faire à vos frais.",
    },
    {
      titre: "Baisser d'un degré : combien on économise",
      paras: [
        "Le guide « Eau et énergie : comment réduire la facture ? » du ministère de la Transition écologique, avec l'ADEME, donne un repère : **baisser le chauffage de 1 °C, c'est 7 % de consommation d'énergie en moins**. C'est un ordre de grandeur : le gain réel dépend de l'isolation, de la météo et du type de chauffage.",
        "Le tableau applique ce repère à un logement chauffé au gaz qui consomme 13 000 kWh par an (hypothèse du [simulateur de facture de gaz](/simulateur-facture-gaz) pour 80 m², pas une valeur officielle). Le prix est le prix repère moyen de la CRE (Commission de régulation de l'énergie) d'octobre 2026 : 0,14557 € le kWh, TTC, et 360,79 € d'abonnement par an. Seule la part consommation baisse : l'abonnement reste dû.",
      ],
      tableau: {
        colonnes: ["Baisse du chauffage", "Consommation par an", "Facture par an", "Économie par an"],
        lignes: [
          ["Aucune", "13 000 kWh", "2 253,20 €", "0 €"],
          ["1 °C", "12 090 kWh", "2 120,73 €", "132,47 €"],
          ["2 °C", "11 180 kWh", "1 988,26 €", "264,94 €"],
          ["3 °C", "10 270 kWh", "1 855,79 €", "397,41 €"],
        ],
      },
      suite: [
        "Le prix du gaz change chaque mois : le prix repère de la CRE passe de 0,14557 € le kWh en octobre à 0,15760 € en novembre 2026 pour le chauffage. Avec le prix de novembre, un degré en moins fait gagner environ 143 € par an au lieu de 132 €.",
      ],
    },
    {
      titre: "Exemple chiffré : un degré en moins dans un 80 m² au gaz",
      paras: [
        "Reprenons le logement du tableau : 13 000 kWh de gaz par an, prix repère moyen de la CRE d'octobre 2026. On baisse le thermostat de 1 °C, par exemple de 20 °C à 19 °C.",
      ],
      etapes: [
        "Facture actuelle : 360,79 € d'abonnement + 13 000 kWh × 0,14557 € = 360,79 + 1 892,41 = **2 253,20 € par an**.",
        "Un degré en moins fait 7 % de consommation en moins : 13 000 × 7 % = **910 kWh** de moins, soit 12 090 kWh.",
        "Nouvelle facture : 360,79 + 12 090 × 0,14557 = 360,79 + 1 759,94 = **2 120,73 € par an**.",
        "Économie : 910 kWh × 0,14557 € = **132,47 € par an**, soit environ 11 € par mois.",
      ],
      suite: [
        "132 € par an pour un degré, sans travaux. Trois degrés font environ 397 €. Ces chiffres sont une estimation : refaites le calcul avec votre consommation en kWh (elle figure sur votre facture) dans le [simulateur de facture de gaz](/simulateur-facture-gaz). Si vous vous chauffez à l'électricité, voyez plutôt [combien consomme un radiateur électrique](/combien-consomme-un-radiateur-electrique).",
      ],
    },
  ],
  calculateur: {
    href: "/simulateur-facture-gaz",
    nom: "Facture Gaz",
    titre: "Calculez ce que vous coûte le chauffage au gaz",
    texte:
      "Choisissez l'usage du gaz (chauffage, eau chaude, cuisson) et votre consommation en kWh : le simulateur donne la facture annuelle et mensuelle avec le prix repère de la CRE d'octobre 2026, et le détail de l'abonnement, des taxes et de la TVA.",
    bouton: "Ouvrir le simulateur de facture de gaz",
  },
  faq: [
    {
      q: "Quelle température faut-il régler pour le chauffage dans une maison ?",
      a: "D'après l'ADEME : 19 °C dans les pièces de vie occupées, 16 à 17 °C quand elles sont inoccupées, 17 à 18 °C dans la chambre la nuit. La loi limite la température moyenne du logement à 19 °C (Code de l'énergie, article R241-26).",
    },
    {
      q: "Quelle est la température de chauffage réglementaire ?",
      a: "L'article R241-26 du Code de l'énergie limite à 19 °C en moyenne la température de chauffage pour l'ensemble des pièces d'un logement. La moyenne tient compte du volume de chaque pièce. Pendant une inoccupation de 24 heures à moins de 48 heures la limite est de 16 °C, et de 8 °C à partir de 48 heures (article R241-27). Les infractions sont punies de l'amende des contraventions de la 5e classe.",
    },
    {
      q: "Chauffage : quelle température la nuit ?",
      a: "L'ADEME conseille 17 °C dans la chambre la nuit sur sa fiche sur le chauffage économique, et 18 °C sur sa fiche sur l'électricité, en précisant de ne pas chauffer plus pour préserver le sommeil. Pour une chambre d'enfant : 17 °C la nuit et 19 °C en journée quand elle est occupée.",
    },
    {
      q: "Je descends la température du chauffage : combien vais-je économiser ?",
      a: "Le guide du ministère de la Transition écologique et de l'ADEME indique qu'un degré en moins représente 7 % de consommation d'énergie en moins. Pour un logement au gaz de 13 000 kWh par an au prix repère de la CRE d'octobre 2026, cela fait environ 132 € par an. C'est un ordre de grandeur.",
    },
    {
      q: "Quelle température de chauffage dans la chambre ?",
      a: "17 °C la nuit et quand la chambre est inoccupée selon l'ADEME (18 °C la nuit sur une autre de ses fiches). Dans une chambre d'enfant occupée en journée, l'ADEME indique 19 °C.",
    },
    {
      q: "Chauffage collectif : quelle température ?",
      a: "La limite de 19 °C en moyenne s'applique aussi à un logement en chauffage collectif. Un chauffage est en général considéré comme insuffisant s'il ne permet pas d'atteindre 18 °C au centre de chaque pièce (service-public). Dans ce cas, le copropriétaire peut s'adresser au syndic, et le locataire à son propriétaire.",
    },
    {
      q: "Quelle température de chauffage quand on est absent ?",
      a: "Pour une absence dans la journée, l'ADEME dit que 16 à 17 °C suffisent. Pour quelques jours, mettez le chauffage en position hors gel. La loi limite la température moyenne à 16 °C pour une inoccupation de 24 à 48 heures et à 8 °C au-delà (article R241-27).",
    },
    {
      q: "Comment calculer une facture de gaz ?",
      a: "Elle se compose d'un abonnement fixe, des kWh consommés multipliés par le prix du kWh, puis des taxes (CTA, TICGN) et de la TVA. Avec le prix repère de la CRE d'octobre 2026 pour le chauffage : 360,79 € d'abonnement par an plus 0,14557 € par kWh, taxes comprises. Le simulateur du site fait ce calcul.",
    },
  ],
  sources: [
    {
      label: "ADEME : Les bons gestes pour un chauffage plus économique (12 décembre 2025)",
      url: "https://agirpourlatransition.ademe.fr/particuliers/amenager-maison/chauffer/bons-gestes-chauffage-plus-economique",
    },
    {
      label: "ADEME : 20 solutions pour réduire sa consommation d'électricité (mise à jour du 13 août 2026)",
      url: "https://agirpourlatransition.ademe.fr/particuliers/economiser/energie/20-solutions-reduire-consommation-electricite",
    },
    {
      label: "Ministère de la Transition écologique et ADEME : Eau et énergie, comment réduire la facture ? 50 trucs et astuces",
      url: "https://www.ecologie.gouv.fr/sites/default/files/documents/Eau%20-%20e%CC%81nergie%20-%20comment%20re%CC%81duire%20sa%20facture.pdf",
    },
    {
      label: "Légifrance : Code de l'énergie, articles R241-25 à R241-29-1 (limitation de la température de chauffage)",
      url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000023983208/LEGISCTA000031748163/",
    },
    {
      label: "Ministère de la Transition écologique : Chauffage dans les bâtiments",
      url: "https://www.ecologie.gouv.fr/politiques-publiques/chauffage-batiments",
    },
    {
      label: "Service-public : À quelle température doit être chauffé un logement ?",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F32563",
    },
    {
      label: "CRE : Prix repère de vente de gaz naturel (clients résidentiels)",
      url: "https://www.cre.fr/consommateurs/prix-reperes-et-references/prix-repere-de-vente-de-gaz-naturel-a-destination-des-clients-residentiels.html",
    },
    {
      label: "CRE : Données ouvertes sur la construction du prix repère de vente de gaz",
      url: "https://www.cre.fr/documents/open-data/construction-du-prix-repere-de-vente-de-gaz-de-la-cre.html",
    },
  ],
  datePublication: "2026-10-14",
  dateAffichee: "14 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
