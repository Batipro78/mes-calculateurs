import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Combien coûte un trajet en voiture ? Le calcul du carburant";
const DESCRIPTION =
  "Un trajet de 500 km coûte environ 75 € de carburant en essence (7 L/100 km à 2,14 € le litre), 70 € en diesel et 17 € en électrique à domicile. La formule, un tableau par distance et les péages.";

export const metadata: Metadata = {
  alternates: { canonical: "/combien-coute-un-trajet-en-voiture" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "combien coûte un trajet en voiture, coût d'un trajet en voiture, calcul coût trajet voiture, prix d'un trajet en voiture, coût trajet voiture au km, coût d'un trajet en voiture électrique, coût d'un trajet en voiture diesel, coût d'un trajet en voiture essence",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/combien-coute-un-trajet-en-voiture",
  fil: "Combien coûte un trajet en voiture",
  emoji: "🛣️",
  couleur: "from-sky-500 to-blue-600",
  h1: "Combien coûte un trajet en voiture ?",
  chapo:
    "Cet article s'adresse à celles et ceux qui préparent un trajet, un départ en vacances ou un covoiturage et veulent savoir combien il coûtera en carburant et en péages. Il donne la formule, les prix à la pompe relevés par le ministère de la Transition écologique, un tableau par distance pour l'essence, le diesel et l'électrique, et un exemple complet.",
  reponse:
    "Le coût du carburant se calcule ainsi : **distance × consommation aux 100 km ÷ 100 × prix du litre**, puis on ajoute les péages. Avec les prix à la pompe du **9 octobre 2026** (2,14 € le litre de SP95-E10, 2,33 € le gazole), un trajet de **500 km** coûte environ **75 € en essence** (7 L/100 km), **70 € en diesel** (6 L/100 km) et **17 € en électrique** rechargée à domicile (17 kWh/100 km). Les consommations sont des exemples : remplacez-les par celle de votre voiture.",
  sections: [
    {
      titre: "La formule du coût d'un trajet",
      paras: [
        "Le carburant d'un trajet se calcule en deux temps : on trouve d'abord le nombre de litres consommés, puis on le multiplie par le prix du litre. Pour une voiture électrique, on remplace les litres par des kilowattheures (kWh) et le prix du litre par le prix du kWh.",
        "**Litres consommés = distance en km × consommation aux 100 km ÷ 100.** **Coût du carburant = litres consommés × prix du litre.** Le coût total du trajet est ce coût plus les péages, et le coût par personne est ce total divisé par le nombre d'occupants de la voiture.",
        "Votre consommation réelle ne figure pas forcément sur la fiche du constructeur, qui donne une valeur d'homologation. Pour la connaître, faites le plein, notez les kilomètres au compteur, roulez normalement, refaites le plein et divisez les litres ajoutés par les kilomètres parcourus, puis multipliez par 100.",
      ],
    },
    {
      titre: "Les prix à la pompe : ce que dit le ministère",
      paras: [
        "Le ministère de la Transition écologique publie chaque semaine le prix moyen à la consommation des carburants en France (fichier « Prix HT et TTC depuis janvier 2020 »). Au **9 octobre 2026**, les prix TTC par litre étaient de **2,138 € pour le SP95-E10**, **2,204 € pour le SP98**, **2,328 € pour le gazole** et **1,029 € pour le GPL carburant**.",
        "Ces prix bougent beaucoup. Le gazole valait 1,701 € le 27 février 2026 et 2,328 € le 9 octobre, soit environ 37 % de plus ; le SP95-E10 est passé de 1,708 € à 2,138 €, soit environ 25 % de plus. Avec un prix qui varie de semaine en semaine, un coût de trajet calculé il y a six mois n'a plus de valeur : prenez toujours le prix du jour, affiché à la pompe ou sur votre application de prix des carburants.",
        "Pour l'électrique, le prix du kWh dépend de l'endroit où l'on recharge. À domicile, au tarif Base du Tarif Bleu EDF, il est de 0,2001 € TTC le kWh (grille applicable à compter du 1er août 2026). Sur une borne publique, surtout une borne rapide, le prix est nettement plus élevé et varie selon l'opérateur : lisez-le sur la borne ou l'application avant de brancher.",
      ],
    },
    {
      titre: "Le coût selon la distance : essence, diesel, électrique",
      paras: [
        "Voici le coût du carburant seul, sans péages, pour quatre distances. Les prix sont ceux du 9 octobre 2026 (2,14 € le litre d'essence, 2,33 € le litre de gazole) et le kWh à domicile est à 0,2001 €. Les consommations sont des **valeurs d'exemple** : 7 L/100 km en essence, 6 L/100 km en diesel, 17 kWh/100 km en électrique.",
      ],
      tableau: {
        colonnes: ["Distance", "Essence (7 L/100)", "Diesel (6 L/100)", "Électrique à domicile (17 kWh/100)"],
        lignes: [
          ["100 km", "14,98 €", "13,98 €", "3,40 €"],
          ["300 km", "44,94 €", "41,94 €", "10,21 €"],
          ["500 km", "74,90 €", "69,90 €", "17,01 €"],
          ["1 000 km", "149,80 €", "139,80 €", "34,02 €"],
        ],
      },
      suite: [
        "Ramené au kilomètre, cela donne environ **15 centimes** en essence, **14 centimes** en diesel et **3,4 centimes** en électrique à domicile. Le diesel revient un peu moins cher ici uniquement parce que l'exemple lui donne une consommation plus basse (6 contre 7 L/100 km) : en ce moment, le litre de gazole est plus cher que celui d'essence.",
        "L'avantage de l'électrique dépend de l'endroit où l'on recharge. À titre d'exemple, si l'on rechargeait à 0,50 € le kWh sur une borne rapide (valeur d'exemple, à remplacer par le prix affiché), 500 km coûteraient 42,50 € : toujours moins que l'essence, mais loin des 17 € de la recharge à domicile.",
      ],
      visuel: {
        fichier: "trajet-500-km-cout-carburant-essence-diesel-electrique",
        alt: "Coût du carburant pour un trajet de 500 kilomètres avec les prix du 9 octobre 2026 : essence à 7 litres aux 100 kilomètres soit 74,90 euros, diesel à 6 litres aux 100 soit 69,90 euros, électrique à 17 kWh aux 100 rechargée à domicile soit 17,01 euros, et rechargée à 0,50 euro le kWh soit 42,50 euros",
        legende:
          "Prix du 9 octobre 2026 (ministère de la Transition écologique) et tarif Base EDF à 0,2001 € le kWh ; consommations et prix de borne rapide pris comme exemples.",
      },
    },
    {
      titre: "Exemple chiffré : 500 km à quatre, avec des péages",
      paras: [
        "Prenons une voiture essence qui consomme 7 L/100 km, un trajet de 500 km, 40 € de péages (valeur d'exemple : le montant réel dépend de l'itinéraire) et quatre personnes à bord.",
      ],
      etapes: [
        "**Litres consommés** : 500 × 7 ÷ 100 = 35 litres.",
        "**Carburant** : 35 × 2,14 € = 74,90 €.",
        "**Total avec les péages** : 74,90 + 40 = 114,90 €.",
        "**Par personne** : 114,90 ÷ 4 = environ 28,73 €.",
        "**Aller-retour** : 114,90 × 2 = 229,80 € pour la voiture, soit environ 57,45 € par personne.",
      ],
      suite: [
        "Ce total ne compte que ce qu'on dépense à chaque trajet. Pour un covoiturage, c'est la base du partage des frais : le carburant et les péages divisés entre les occupants.",
      ],
      encadre:
        "Calculez votre propre trajet avec le [calculateur de coût de trajet en voiture](/calcul-cout-trajet-voiture) : il prend la distance, la consommation, le carburant et les péages, et affiche le coût total et le coût par personne.",
    },
    {
      titre: "Ce que le carburant ne compte pas",
      paras: [
        "Le carburant et les péages ne sont qu'une partie du coût d'une voiture. Rouler use aussi le véhicule : entretien, pneus, assurance et perte de valeur de la voiture entrent dans le coût réel d'un kilomètre. Ces frais ne se paient pas au trajet, mais ils augmentent avec les kilomètres parcourus.",
        "Pour comparer avec le train ou l'avion, ou pour fixer un partage de frais équitable en covoiturage, le chiffre du carburant est le plus simple à calculer et le plus facile à vérifier. Pour savoir ce que vous coûte réellement votre voiture, utilisez le [calculateur de coût kilométrique](/calcul-cout-kilometrique).",
      ],
    },
    {
      titre: "Ce qui fait varier la facture",
      paras: [
        "Trois choses font bouger le coût d'un trajet au-delà du prix du litre.",
      ],
      liste: [
        "**La consommation** : elle varie avec la vitesse, le relief, la charge, le chauffage ou la climatisation et le style de conduite.",
        "**Les péages** : ils dépendent de l'itinéraire et de la classe du véhicule. Un calculateur d'itinéraire indique le montant avant le départ.",
        "**Le prix du jour** : à 10 centimes d'écart sur le litre, 35 litres coûtent 3,50 € de plus ou de moins. Les prix varient d'une station à l'autre et d'une semaine à l'autre.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-cout-trajet-voiture",
    nom: "Coût trajet voiture",
    titre: "Calculez le coût de votre trajet",
    texte:
      "Indiquez la distance, le carburant, la consommation de votre voiture et les péages : le calculateur donne le coût du carburant, le total, le coût par kilomètre et l'aller-retour.",
    bouton: "Ouvrir le calculateur de trajet",
  },
  faq: [
    {
      q: "Comment calculer le coût d'un trajet en voiture ?",
      a: "Multipliez la distance par la consommation aux 100 km et divisez par 100 pour obtenir les litres, multipliez par le prix du litre, puis ajoutez les péages. Exemple : 500 km à 7 L/100 km et 2,14 € le litre font 35 litres, soit 74,90 € de carburant.",
    },
    {
      q: "Combien coûte un trajet en voiture au kilomètre ?",
      a: "Pour le carburant seul, environ 15 centimes en essence (7 L/100 km à 2,14 €), 14 centimes en diesel (6 L/100 km à 2,33 €) et 3,4 centimes en électrique à domicile (17 kWh/100 km à 0,2001 €). Ce chiffre ne compte ni l'entretien, ni l'assurance, ni la perte de valeur.",
    },
    {
      q: "Combien coûte un trajet en voiture électrique ?",
      a: "À domicile, au tarif Base EDF de 0,2001 € le kWh, 500 km à 17 kWh/100 km coûtent environ 17 €. Sur une borne publique, le prix du kWh est plus élevé et varie selon l'opérateur : à 0,50 € le kWh (exemple), le même trajet coûte 42,50 €.",
    },
    {
      q: "Combien coûte un trajet en voiture diesel ?",
      a: "Au prix moyen du 9 octobre 2026, le gazole coûte 2,33 € le litre. Une voiture qui consomme 6 L/100 km dépense environ 70 € pour 500 km, contre 75 € pour une essence à 7 L/100 km et 2,14 €.",
    },
    {
      q: "Quel est le prix moyen de l'essence aujourd'hui ?",
      a: "Selon le relevé du ministère de la Transition écologique du 9 octobre 2026, le SP95-E10 coûte en moyenne 2,138 € le litre, le SP98 2,204 € et le gazole 2,328 €. Ces prix changent chaque semaine : le ministère publie le relevé le lundi.",
    },
    {
      q: "Comment partager les frais d'un trajet en covoiturage ?",
      a: "Additionnez le carburant et les péages, puis divisez par le nombre d'occupants de la voiture, conducteur compris. Pour 500 km à quatre, avec 74,90 € de carburant et 40 € de péages, cela fait environ 28,73 € par personne.",
    },
    {
      q: "Comment connaître la consommation réelle de ma voiture ?",
      a: "Faites le plein, notez le kilométrage, roulez normalement, refaites le plein et divisez les litres ajoutés par les kilomètres parcourus, puis multipliez par 100. Le résultat est votre consommation en L/100 km, plus réaliste que la valeur d'homologation.",
    },
  ],
  sources: [
    {
      label: "Ministère de la Transition écologique : prix HT et TTC des carburants depuis janvier 2020 (relevé hebdomadaire)",
      url: "https://www.ecologie.gouv.fr/sites/default/files/documents/Prix%20HTT%20et%20TTC%20depuis%20janvier%202020_0.xlsx",
    },
    {
      label: "Ministère de la Transition écologique : prix des produits pétroliers",
      url: "https://www.ecologie.gouv.fr/politiques-publiques/prix-produits-petroliers",
    },
    {
      label: "EDF : Tarif Bleu, grille de prix de l'électricité (option Base)",
      url: "https://particulier.edf.fr/fr/accueil/electricite-gaz/tarif-bleu.html",
    },
  ],
  datePublication: "2026-10-16",
  dateAffichee: "16 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
