import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Combien consomme un radiateur électrique ? (1 000 W, 2 000 W)";
const DESCRIPTION =
  "Un radiateur de 1 000 W consomme 1 kWh par heure à pleine puissance, soit environ 0,20 € au tarif Base de 0,2001 €/kWh. Calcul par heure, jour et mois, et quel radiateur consomme le moins.";

export const metadata: Metadata = {
  alternates: { canonical: "/combien-consomme-un-radiateur-electrique" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "combien consomme un radiateur électrique, consommation d'un radiateur électrique 1000w, consommation d'un radiateur électrique 2000w, consommation radiateur électrique par jour, calcul consommation radiateur électrique, radiateur électrique qui consomme le moins, radiateur à inertie, prix du kwh",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/combien-consomme-un-radiateur-electrique",
  fil: "Combien consomme un radiateur électrique",
  emoji: "⚡",
  couleur: "from-yellow-500 to-orange-500",
  h1: "Combien consomme un radiateur électrique ?",
  chapo:
    "Cet article s'adresse à ceux qui rallument leur chauffage électrique et veulent savoir ce que cela va coûter. Il donne la formule, des exemples pour 1 000 W et 2 000 W, le prix du kWh en vigueur et répond à la question « quel radiateur consomme le moins ? ».",
  reponse:
    "Un radiateur de **1 000 W** consomme **1 kWh** pour **1 heure** à pleine puissance, et un radiateur de **2 000 W** consomme **2 kWh**. Au tarif Base d'EDF de **0,2001 € le kWh**, cela fait environ **0,20 €** et **0,40 €** par heure. Mais le thermostat coupe le radiateur quand la pièce est assez chaude : la consommation réelle dépend donc du temps où il chauffe vraiment, pas du temps où il est allumé.",
  sections: [
    {
      titre: "La formule pour calculer la consommation d'un radiateur",
      paras: [
        "La consommation d'un appareil se mesure en kilowattheures (kWh). Pour un radiateur, la formule est : **puissance en kW × heures de fonctionnement réel = kWh**. Pour passer des watts aux kilowatts, on divise par 1 000 : 1 500 W font 1,5 kW.",
        "Le coût s'obtient ensuite en multipliant les kWh par le prix du kWh. L'expression importante est « fonctionnement réel » : un radiateur muni d'un thermostat ne chauffe pas en permanence. Quand la température demandée est atteinte, il s'arrête, puis redémarre quand la pièce refroidit. Le nombre d'heures « allumé » n'est donc pas le nombre d'heures de chauffe.",
        "Nous ne connaissons pas de source officielle qui donne la part du temps où un radiateur chauffe réellement : elle dépend de l'isolation, de la météo, de la température choisie et de la taille de la pièce. Les chiffres plus bas sont donc des **cas maximaux** (pleine puissance) et un **exemple avec une hypothèse annoncée**.",
      ],
    },
    {
      titre: "Radiateur de 1 000 W, 1 500 W et 2 000 W : par heure, par jour, par mois",
      paras: [
        "Voici ce que coûte un radiateur qui chauffe à pleine puissance, au tarif Base de 0,2001 € le kWh. Pour le jour et le mois, nous avons supposé 8 heures de chauffe à pleine puissance par jour et un mois de 30 jours, comme le fait le calculateur du site.",
      ],
      tableau: {
        colonnes: ["Puissance", "1 heure", "1 jour (8 h)", "1 mois (30 jours)"],
        lignes: [
          ["1 000 W", "1 kWh · 0,20 €", "8 kWh · 1,60 €", "240 kWh · 48,02 €"],
          ["1 500 W", "1,5 kWh · 0,30 €", "12 kWh · 2,40 €", "360 kWh · 72,04 €"],
          ["2 000 W", "2 kWh · 0,40 €", "16 kWh · 3,20 €", "480 kWh · 96,05 €"],
        ],
      },
      suite: [
        "Ces montants sont un plafond pour 8 heures de chauffe. Si le thermostat coupe le radiateur la moitié du temps, ils sont divisés par deux. À l'inverse, un radiateur de 1 000 W qui chauffait vraiment 24 heures sur 24 consommerait 24 kWh par jour, soit 4,80 €.",
      ],
      visuel: {
        fichier: "cout-radiateur-electrique-1000-1500-2000w",
        alt: "Coût d'un radiateur électrique à pleine puissance au tarif de 0,2001 euro le kWh : 0,20 euro par heure pour 1 000 W, 0,30 pour 1 500 W et 0,40 pour 2 000 W ; pour 8 heures par jour, 1,60, 2,40 et 3,20 euros par jour ; sur 30 jours, 48,02, 72,04 et 96,05 euros",
        legende:
          "Coût à pleine puissance : puissance en kW × heures × 0,2001 €/kWh (Tarif Bleu EDF, option Base), pour 8 heures par jour et 30 jours par mois.",
      },
    },
    {
      titre: "Exemple chiffré : un radiateur de 1 000 W dans une chambre",
      paras: [
        "Prenons un radiateur de 1 000 W, allumé 8 heures par jour. **Hypothèse d'exemple, non tirée d'une source** : le thermostat le fait chauffer la moitié du temps, soit l'équivalent de 4 heures à pleine puissance.",
      ],
      etapes: [
        "**Consommation par jour** : 1 kW × 4 h = 4 kWh.",
        "**Coût par jour** : 4 kWh × 0,2001 € = 0,80 €.",
        "**Consommation par mois** : 4 kWh × 30 jours = 120 kWh.",
        "**Coût par mois** : 120 kWh × 0,2001 € = 24,01 €.",
      ],
      suite: [
        "Avec un radiateur de 2 000 W et la même hypothèse (4 heures à pleine puissance par jour), on double : 8 kWh par jour, 1,60 € par jour et 48,02 € par mois. Si votre radiateur chauffe plus ou moins que cela, remplacez les 4 heures par votre propre estimation dans le calculateur.",
      ],
      encadre:
        "Vous pouvez refaire ces calculs dans le [calculateur de consommation électrique](/calcul-consommation-electrique) : indiquez la puissance (1 000, 1 500, 2 000 W...) et le nombre d'heures de chauffe réelles par jour.",
    },
    {
      titre: "Quel est le prix du kWh aujourd'hui ?",
      paras: [
        "Pour les particuliers qui ont gardé le tarif réglementé, EDF affiche en octobre 2026 un prix de **0,2001 € TTC le kWh** en option Base, pour les puissances de 3 et 6 kVA. Cette grille est applicable à compter du 1er août 2026, d'après la page d'EDF. En option Heures Creuses, le kWh coûte **0,2142 €** en heures pleines et **0,1589 €** en heures creuses.",
        "Votre prix peut être différent : un contrat chez un autre fournisseur ou une autre puissance de compteur change le tarif, et l'abonnement s'ajoute à la consommation. Regardez le prix du kWh sur votre dernière facture. Le tarif réglementé est révisé en général deux fois par an, au 1er février et au 1er août, d'après EDF.",
      ],
      liste: [
        "**Option Base** : un seul prix à toute heure, 0,2001 € le kWh (3 et 6 kVA). Pour un radiateur de 1 000 W, une heure à pleine puissance coûte 0,20 €.",
        "**Option Heures Creuses** : 0,2142 € le kWh en heures pleines et 0,1589 € en heures creuses (8 heures par jour). Si le radiateur chauffe surtout la nuit, le kWh coûte moins cher. Si vous chauffez surtout en journée, c'est l'inverse.",
      ],
    },
    {
      titre: "Quel radiateur électrique consomme le moins ?",
      paras: [
        "À chaleur égale, **tous les radiateurs électriques consomment à peu près autant**. D'après Que Choisir, les chauffages électriques ont un rendement proche de 100 %, c'est-à-dire que presque toute l'électricité consommée devient de la chaleur, et cela est vrai pour tous les types, même ceux à inertie. Un kilowatt consommé restitue toujours le même nombre de calories.",
        "Un radiateur à inertie, un panneau rayonnant et un convecteur ne diffèrent donc pas par la quantité de chaleur produite par kWh. Ce qui change, c'est le confort (chaleur douce ou air sec), la précision du thermostat et la durée de montée en température. Que Choisir précise que la différence de consommation entre les types de radiateurs est faible et qu'en changer n'entraîne pas de grosses économies, mais a un effet sur le confort.",
        "L'ADEME va dans le même sens : l'isolation est la priorité pour réduire les besoins de chauffage, et un chauffage plus performant vient ensuite. Elle cite comme geste simple le remplacement de vieux convecteurs électriques par des panneaux rayonnants. Pour consommer moins, les leviers sont d'abord l'isolation, la bonne température et la programmation.",
      ],
      liste: [
        "**Chauffer à la bonne température** : l'ADEME recommande 19 °C dans les pièces de vie occupées, 16 à 17 °C quand elles sont inoccupées, et 17 °C dans la chambre la nuit.",
        "**Programmer le chauffage** : un thermostat programmable permet de moduler la température selon les moments de la journée ou de la semaine, quel que soit le système.",
        "**Dégager les radiateurs** : l'ADEME demande de ne pas placer de meubles, de linge ou de rideaux devant, car cela bloque la diffusion de la chaleur.",
        "**Éviter les radiateurs d'appoint** : l'ADEME les juge peu performants et très énergivores.",
      ],
    },
    {
      titre: "Existe-t-il une vraie alternative pour consommer moins ?",
      paras: [
        "Oui : la pompe à chaleur. Elle ne transforme pas 1 kWh d'électricité en 1 kWh de chaleur, elle capte de la chaleur dans l'air extérieur. Son efficacité s'exprime par le coefficient de performance (COP) : avec un COP de 3, elle produit 3 kWh de chaleur pour 1 kWh d'électricité consommé.",
        "Pour la pompe à chaleur air/air (celle qui souffle de l'air chaud, comme une climatisation réversible), l'ADEME a comparé les relevés Linky de 88 ménages qui avaient remplacé leurs radiateurs électriques. En moyenne sur cet échantillon, la consommation d'électricité liée au chauffage a été divisée par 2. L'ADEME précise que l'étude ne permet pas de connaître le rendement réel de ces machines.",
      ],
      suite: [
        "C'est un investissement important et le résultat dépend du logement : pour savoir si c'est adapté au vôtre, un conseiller France Rénov' ou un professionnel peut vous orienter. Pour estimer la puissance d'une climatisation réversible, voyez le [calcul de puissance de climatisation](/calcul-puissance-climatisation) et le [coût d'une climatisation](/cout-climatisation).",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-consommation-electrique",
    nom: "Consommation électrique",
    titre: "Calculez le coût de votre radiateur",
    texte:
      "Indiquez la puissance de votre radiateur en watts et le nombre d'heures où il chauffe vraiment par jour : le calculateur donne la consommation en kWh et le coût par jour, par mois et par an, en option Base ou Heures Pleines / Heures Creuses.",
    bouton: "Ouvrir le calculateur de consommation",
  },
  faq: [
    {
      q: "Combien consomme un radiateur électrique de 1 000 W ?",
      a: "1 kWh par heure à pleine puissance, soit environ 0,20 € au tarif Base de 0,2001 € le kWh. Pour 8 heures de chauffe à pleine puissance par jour, 8 kWh et 1,60 € par jour, soit 240 kWh et 48,02 € pour 30 jours. Le thermostat réduit ces chiffres.",
    },
    {
      q: "Combien consomme un radiateur électrique de 2 000 W ?",
      a: "2 kWh par heure à pleine puissance, soit environ 0,40 €. Pour 8 heures de chauffe à pleine puissance par jour, 16 kWh et 3,20 € par jour, soit 480 kWh et 96,05 € pour 30 jours.",
    },
    {
      q: "Combien consomme un radiateur électrique par jour ?",
      a: "Cela dépend de sa puissance et du temps où il chauffe vraiment : consommation par jour = puissance en kW × heures de chauffe. Un radiateur de 1 500 W qui chauffe l'équivalent de 4 heures à pleine puissance consomme 6 kWh, soit 1,20 € par jour au tarif de 0,2001 €/kWh.",
    },
    {
      q: "Un radiateur consomme-t-il toujours sa puissance indiquée ?",
      a: "Non. La puissance indiquée (1 000 W, 2 000 W...) est celle à laquelle il chauffe. Quand le thermostat est satisfait, il s'arrête. La consommation réelle est la puissance multipliée par le temps où il chauffe vraiment, pas par le temps où il est allumé.",
    },
    {
      q: "Quel est le prix du kWh aujourd'hui ?",
      a: "Au tarif réglementé EDF (Tarif Bleu), le kWh coûte 0,2001 € TTC en option Base pour 3 et 6 kVA, d'après la grille EDF applicable à compter du 1er août 2026. En Heures Creuses : 0,2142 € en heures pleines et 0,1589 € en heures creuses. Le prix de votre contrat peut différer : regardez votre facture.",
    },
    {
      q: "Quel radiateur électrique consomme le moins ?",
      a: "À chaleur égale, tous consomment à peu près autant : Que Choisir indique que le rendement des chauffages électriques est proche de 100 %, même pour les modèles à inertie. La différence vient du confort et de la régulation. L'isolation et la température choisie pèsent bien plus.",
    },
    {
      q: "Un radiateur à inertie consomme-t-il moins qu'un convecteur ?",
      a: "Pas de façon importante. Selon Que Choisir, l'inertie stocke la chaleur mais un kilowatt consommé restitue toujours le même nombre de calories, et la différence de consommation entre types de radiateurs est faible. Le radiateur à inertie apporte surtout une chaleur plus douce.",
    },
    {
      q: "Une pompe à chaleur consomme-t-elle moins qu'un radiateur électrique ?",
      a: "Oui, en général. Dans une étude de l'ADEME portant sur 88 ménages, remplacer des radiateurs électriques par une pompe à chaleur air/air a divisé par 2 en moyenne la consommation d'électricité de chauffage. Le résultat dépend du logement et de l'installation.",
    },
  ],
  sources: [
    {
      label: "EDF : Tarif Bleu, grille de prix de l'électricité (option Base, Heures Creuses)",
      url: "https://particulier.edf.fr/fr/accueil/electricite-gaz/tarif-bleu.html",
    },
    {
      label: "Que Choisir : comment choisir un radiateur électrique",
      url: "https://www.quechoisir.org/guide-d-achat-radiateurs-electriques-n84447/",
    },
    {
      label: "ADEME : les bons gestes pour un chauffage plus économique",
      url: "https://agirpourlatransition.ademe.fr/particuliers/amenager-maison/chauffer/bons-gestes-chauffage-plus-economique",
    },
    {
      label: "ADEME : étude sur les consommations des PAC air/air",
      url: "https://librairie.ademe.fr/batiment/8595-etude-sur-les-consommations-des-pac-air-air.html",
    },
    {
      label: "EDF : consommation d'une pompe à chaleur (COP)",
      url: "https://particulier.edf.fr/fr/accueil/guide-energie/electricite/pompe-a-chaleur.html",
    },
  ],
  datePublication: "2026-10-07",
  dateAffichee: "7 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
