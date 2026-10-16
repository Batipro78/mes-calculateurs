import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Que mettre dans un kit de survie ? La liste officielle pour 72 heures";
const DESCRIPTION =
  "Le kit d'urgence recommandé par l'État : eau (6 litres par personne), nourriture sans cuisson, radio à piles, lampe, médicaments, chargeur, argent liquide, papiers. La liste complète, le calcul de l'eau et quand le vérifier.";

export const metadata: Metadata = {
  alternates: { canonical: "/que-mettre-dans-un-kit-de-survie" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "que mettre dans un kit de survie, composition kit de survie, contenu kit de survie, kit de survie guerre, kit d'urgence 72h, liste kit de survie, kit de survie gouvernement, combien d'eau kit de survie, kit de survie panne électricité",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/que-mettre-dans-un-kit-de-survie",
  fil: "Que mettre dans un kit de survie",
  emoji: "🎒",
  couleur: "from-red-500 to-orange-600",
  h1: "Que mettre dans un kit de survie ?",
  chapo:
    "Cet article répond à ceux qui veulent préparer un kit pour tenir en cas de crise : panne d'électricité longue, catastrophe naturelle, situation de guerre ou toute autre crise majeure. Il reprend la liste publiée par l'État, calcule la réserve d'eau selon le nombre de personnes et indique quand vérifier le contenu.",
  reponse:
    "L'État recommande un **kit d'urgence pour 72 heures**. Il comprend de l'**eau potable (6 litres par personne en bouteilles)**, de la nourriture non périssable qui ne nécessite pas de cuisson, une **radio à piles** avec piles de rechange, une **lampe de poche**, des **médicaments** et une trousse de premiers secours, un **chargeur de téléphone**, des vêtements chauds et une couverture de survie, de l'argent liquide, des photocopies des papiers importants et le double des clés. Le kit est à ranger dans un endroit facile d'accès.",
  sections: [
    {
      titre: "La liste officielle du kit d'urgence, regroupée par usage",
      paras: [
        "Le guide national « Tous responsables » (SGDSN) explique qu'en cas de crise, les premières 72 heures sont souvent les plus éprouvantes, et place le kit sous trois principes-clés : boire et manger, avoir chaud, se soigner. Les éléments ci-dessous sont ceux de ce guide et de la fiche « Votre kit d'urgence 72 h » de Géorisques, regroupés ici par usage.",
      ],
      liste: [
        "**Boire et manger** : eau potable en bouteilles (6 litres par personne), conserves et autres aliments qui ne demandent pas de cuisson, petits pots pour bébé, nourriture pour les animaux. Le guide ajoute le lait infantile de 1er âge liquide prêt à l'emploi, le café et le thé.",
        "**Avoir chaud et s'éclairer** : vêtements chauds, couverture de survie, lampe de poche avec piles de rechange, bougies, briquet ou allumettes.",
        "**Se soigner** : médicaments du quotidien (traitement habituel et médicaments de secours), trousse de premiers secours (alcool, pansements, compresses, masques), paire de lunettes de vue de secours.",
        "**Rester informé et joignable** : radio à piles avec piles de rechange, pour suivre les consignes des autorités, et chargeur de téléphone portable.",
        "**Se débrouiller** : outils de base (couteau multifonctions, ouvre-boîte), argent liquide (les distributeurs pouvant ne pas fonctionner), double des clés de la maison et de la voiture.",
        "**Papiers et moral** : photocopies des documents essentiels dans une pochette étanche (carte d'identité, ordonnances), livres et jeux pour occuper le temps.",
      ],
      visuel: {
        fichier: "kit-urgence-72h-trois-besoins-eau-selon-foyer",
        alt: "Le kit d'urgence 72 heures de l'État en trois besoins : boire et manger, avoir chaud, se soigner, avec la réserve d'eau à prévoir à raison de 6 litres par personne : 6 litres pour 1 personne, 12 pour 2, 18 pour 3, 24 pour 4 et 30 pour 5",
        legende:
          "Contenu : guide « Tous responsables » (SGDSN) et fiche « Votre kit d'urgence 72 h » (Géorisques). L'eau : 6 litres par personne, multiplié par le nombre de personnes du foyer (calcul de ce site).",
      },
    },
    {
      titre: "Combien d'eau prévoir dans son kit de survie",
      paras: [
        "Le guide donne une règle de calcul simple : 6 litres par personne en bouteilles, soit **6 × le nombre de personnes du foyer** pour 72 heures. Réparti sur trois jours, cela fait 2 litres par personne et par jour (calcul de ce site). Les bouteilles servent à boire : l'eau dont on a besoin pour se laver s'ajoute si on veut en disposer.",
      ],
      tableau: {
        colonnes: ["Foyer", "Eau pour 72 heures"],
        lignes: [
          ["1 personne", "6 litres"],
          ["2 personnes", "12 litres"],
          ["3 personnes", "18 litres"],
          ["4 personnes", "24 litres"],
          ["5 personnes", "30 litres"],
        ],
      },
      suite: [
        "Le guide précise aussi qu'en dernier recours, on peut prévoir des pastilles de décontamination de l'eau. Elles ne remplacent pas les bouteilles : le guide les range explicitement « en dernier recours ».",
      ],
    },
    {
      titre: "Existe-t-il un kit de survie spécial guerre ?",
      paras: [
        "Dans les documents officiels que nous avons lus, il n'y a pas de liste séparée pour la guerre. Le guide « Tous responsables » cite les guerres en Europe et au Proche-Orient parmi les crises qui justifient de se préparer, puis propose un seul kit d'urgence pour 72 heures, valable quelle que soit la crise : coupure d'électricité, de gaz et d'eau courante, routes impraticables.",
        "Le but du kit est de tenir les premières 72 heures chez soi dans l'attente des secours. Géorisques précise qu'il est aussi très utile en cas de départ précipité : placez le sac dans un endroit facile d'accès.",
      ],
      encadre:
        "Les aliments, les médicaments et les piles ont une date. Géorisques conseille de vérifier le contenu du kit une fois par an, le guide « Tous responsables » deux fois par an, en particulier la date de péremption des médicaments et des denrées. Remplacez les piles, et réapprovisionnez le kit après utilisation.",
    },
    {
      titre: "Panne d'électricité : ce que le kit couvre et ce qu'il ne couvre pas",
      paras: [
        "Pour une coupure de courant, le kit couvre l'essentiel des premières heures : lumière, information avec la radio à piles, eau et nourriture sans cuisson. Ce qu'il ne règle pas, c'est le chauffage, la cuisson et la conservation des aliments au frigo, qui dépendent du logement.",
        "Un logement tout électrique perd tout à la fois. Le [simulateur de blackout](/simulateur-blackout) donne un score de préparation et une durée d'autonomie selon le type de logement et les équipements que vous avez déjà cochés : il montre ce qui manque au-delà du kit de base.",
      ],
    },
  ],
  calculateur: {
    href: "/simulateur-blackout",
    nom: "Simulateur de blackout",
    titre: "Mesurez votre préparation à une coupure d'électricité",
    texte:
      "Indiquez votre type de logement et cochez ce que vous avez déjà : lampes, radio, réserves d'eau et de nourriture, rechaud, batterie. Le simulateur donne un score de préparation et une durée d'autonomie estimée.",
    bouton: "Ouvrir le simulateur de blackout",
  },
  faq: [
    {
      q: "Que mettre dans un kit de survie de base ?",
      a: "La liste de l'État comprend : eau potable (6 litres par personne), nourriture non périssable sans cuisson, radio à piles, lampe de poche, médicaments, trousse de premiers secours, chargeur de téléphone, vêtements chauds, couverture de survie, outils de base, argent liquide, photocopies des papiers, double des clés et lunettes de secours.",
    },
    {
      q: "Quelle est la composition d'un kit de survie officiel ?",
      a: "Elle est donnée par le guide national « Tous responsables » du SGDSN et par la fiche « Votre kit d'urgence 72 h » de Géorisques : mêmes éléments, placés sous trois principes-clés (boire et manger, avoir chaud, se soigner).",
    },
    {
      q: "Combien d'eau mettre dans un kit de survie ?",
      a: "6 litres par personne en bouteilles pour 72 heures, soit 6 × le nombre de personnes du foyer : 24 litres pour une famille de 4. Les pastilles de décontamination ne sont prévues qu'en dernier recours.",
    },
    {
      q: "Pour combien de temps est prévu un kit de survie ?",
      a: "Pour 72 heures. Le guide « Tous responsables » explique que les premières 72 heures d'une crise sont souvent les plus éprouvantes. Au-delà, le kit ne suffit plus et il faut renouveler les réserves.",
    },
    {
      q: "Que mettre dans un kit de survie en cas de guerre ?",
      a: "Les documents officiels ne proposent pas de liste distincte : le kit d'urgence 72 heures sert pour toute crise majeure, qu'il s'agisse d'une catastrophe naturelle, d'une panne durable ou d'un conflit.",
    },
    {
      q: "Que mettre dans un kit de survie pour une panne d'électricité ?",
      a: "Une lampe de poche avec piles de rechange, des bougies et un briquet, une radio à piles, un chargeur de téléphone, de l'eau et de la nourriture qui ne demande pas de cuisson, et des vêtements chauds. Le simulateur de blackout permet de voir ce qui manque.",
    },
    {
      q: "Quand vérifier son kit de survie ?",
      a: "Géorisques conseille de le faire une fois par an, le guide « Tous responsables » deux fois par an. Il s'agit de contrôler la date de péremption des médicaments et des denrées et de remplacer les piles.",
    },
  ],
  sources: [
    {
      label: "Géorisques : Votre kit d'urgence 72 h (fiche PDF)",
      url: "https://www.georisques.gouv.fr/sites/default/files/2022-08/KIT%2072H_A4-HD.pdf",
    },
    {
      label: "SGDSN : guide « Tous responsables », face aux risques, agissons",
      url: "https://www.ecologie.gouv.fr/sites/default/files/documents/SGDSN_Guide_Tous%20responsables.pdf",
    },
  ],
  datePublication: "2026-10-16",
  dateAffichee: "16 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
