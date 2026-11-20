import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Combien coûte une voiture par mois ?";
const DESCRIPTION =
  "Le coût d'une voiture se calcule en additionnant la perte de valeur, le carburant, l'assurance, l'entretien et le contrôle technique, puis en divisant par la durée. Méthode, trois exemples chiffrés et pièges à éviter.";

export const metadata: Metadata = {
  alternates: { canonical: "/combien-coute-une-voiture-par-mois" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "combien coûte une voiture par mois, coût réel d'une voiture par an, budget voiture mensuel, coût d'une voiture au kilomètre, combien coûte une voiture à l'année, décote voiture",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/combien-coute-une-voiture-par-mois",
  fil: "Coût d'une voiture par mois",
  emoji: "💸",
  couleur: "from-teal-500 to-emerald-600",
  h1: "Combien coûte une voiture par mois ?",
  chapo:
    "On pense souvent au carburant et à l'assurance, et on oublie le poste le plus lourd : la perte de valeur. Voici comment calculer le coût réel par mois et au kilomètre, avec trois exemples chiffrés.",
  reponse:
    "**Coût par mois = coût total ÷ (durée en années × 12).** Le coût total, c'est le prix d'achat, plus le carburant, l'assurance, l'entretien et le contrôle technique, moins la valeur de revente. Avec les réglages par défaut du simulateur (hypothèses), une citadine à 18 000 € gardée 5 ans revient à environ **391 € par mois**, soit 0,31 € du kilomètre.",
  sections: [
    {
      titre: "Les postes à additionner",
      paras: [
        "Le coût d'une voiture ne se limite pas à ce que vous payez chaque mois. Le simulateur compte cinq postes :",
      ],
      liste: [
        "**La perte de valeur (décote) :** la différence entre le prix d'achat et la valeur de revente estimée.",
        "**Le carburant :** kilomètres par an ÷ 100 × consommation aux 100 km × prix du carburant.",
        "**L'assurance :** un montant annuel multiplié par la durée de détention.",
        "**L'entretien :** un montant annuel, qui augmente de 10 % par an à partir de la 4e année.",
        "**Le contrôle technique :** 80 € tous les 2 ans.",
      ],
      suite: [
        "Ce qui n'est pas compté : le stationnement, les péages, un éventuel crédit et les amendes. Si vous financez la voiture, voyez le [simulateur de crédit auto](/simulateur-credit-auto) ; si vous hésitez avec une location, lisez [LOA ou LLD : quelle différence](/loa-ou-lld-quelle-difference).",
      ],
    },
    {
      titre: "Pourquoi la perte de valeur pèse autant",
      paras: [
        "Quand on revend sa voiture, on récupère moins que ce qu'on a payé : cette différence est une vraie dépense. Le simulateur suppose que la voiture perd **15 % de sa valeur chaque année** : après n années, elle vaut le prix d'achat multiplié par 0,85 à la puissance n. C'est une simplification : la vraie revente dépend du modèle, de l'état et du kilométrage, et vous ne pouvez pas la saisir.",
        "Pour une voiture à 18 000 €, la première année coûte déjà 18 000 × 0,15 = 2 700 €, soit 225 € par mois, avant le moindre litre d'essence. Sur 5 ans, la décote atteint 10 013 €, soit 43 % du coût total de l'exemple 1.",
      ],
    },
    {
      titre: "Exemple 1 : les réglages par défaut du simulateur",
      paras: [
        "Valeurs par défaut (hypothèses, pas des moyennes du marché) : 18 000 € à l'achat, 15 000 km par an, 5,5 L aux 100 km, carburant à 1,85 € le litre, assurance à 600 € par an, entretien à 500 € par an, 5 ans de détention.",
      ],
      etapes: [
        "Carburant : 15 000 ÷ 100 × 5,5 × 1,85 = 1 526,25 € par an, soit 7 631,25 € sur 5 ans.",
        "Assurance : 600 × 5 = 3 000 €.",
        "Entretien : 500 € les années 1 à 3, soit 1 500 €. Année 4 : 500 × 1,1 = 550 €. Année 5 : 500 × 1,1 × 1,1 = 605 €. Total : 2 655 €.",
        "Contrôle technique : 5 ÷ 2 = 2,5, arrondi à 2 contrôles, soit 2 × 80 = 160 €.",
        "Valeur de revente : 18 000 × 0,85⁵ = 18 000 × 0,4437053 = 7 986,70 €. Décote : 18 000 − 7 986,70 = 10 013,30 €.",
        "Coût total : 18 000 + 7 631,25 + 3 000 + 2 655 + 160 − 7 986,70 = **23 459,55 €**.",
        "Par mois : 23 459,55 ÷ (5 × 12) = 23 459,55 ÷ 60 = **391 €**. Au kilomètre : 23 459,55 ÷ 75 000 km = **0,31 €**.",
      ],
      suite: [
        "Autrement dit, 391 € par mois, dont 167 € de perte de valeur (10 013 ÷ 60). Pour le prix d'un seul trajet, voyez [combien coûte un trajet en voiture](/combien-coute-un-trajet-en-voiture).",
      ],
    },
    {
      titre: "Exemple 2 : deux fois plus de kilomètres",
      paras: [
        "Gardons les mêmes réglages, mais avec 30 000 km par an. Seul le carburant change : dans le simulateur, les autres postes ne dépendent pas du kilométrage.",
      ],
      etapes: [
        "Carburant : 30 000 ÷ 100 × 5,5 × 1,85 = 3 052,50 € par an, soit 15 262,50 € sur 5 ans.",
        "Les autres postes ne bougent pas : décote 10 013,30 €, assurance 3 000 €, entretien 2 655 €, contrôle technique 160 €.",
        "Coût total : 18 000 + 15 262,50 + 3 000 + 2 655 + 160 − 7 986,70 = **31 090,80 €**.",
        "Par mois : 31 090,80 ÷ 60 = **518 €**. Au kilomètre : 31 090,80 ÷ 150 000 = **0,21 €**.",
      ],
      suite: [
        "Le coût mensuel augmente de 127 € (soit 7 631 € de plus au total, exactement le surcroît de carburant), mais le coût au kilomètre baisse, de 0,31 € à 0,21 €. Les frais fixes sont répartis sur plus de kilomètres. En vrai, rouler plus use aussi la voiture et fait baisser sa revente, ce que le simulateur ne voit pas. Pour connaître votre consommation, voyez [comment la calculer aux 100 km](/comment-calculer-sa-consommation-aux-100-km).",
      ],
    },
    {
      titre: "Exemple 3 : une voiture à 12 000 € gardée 8 ans",
      paras: [
        "Prenons une voiture à 12 000 € gardée 8 ans, avec les autres réglages par défaut. Le simulateur ne propose que 3, 5, 7 ou 10 ans : pour 8 ans, le calcul se fait à la main.",
      ],
      etapes: [
        "Carburant : 1 526,25 × 8 = 12 210 €. Assurance : 600 × 8 = 4 800 €.",
        "Entretien : 1 500 € (années 1 à 3), puis 550 + 605 + 665,50 + 732,05 + 805,26 pour les années 4 à 8. Total : 4 857,81 €.",
        "Contrôle technique : 8 ÷ 2 = 4 contrôles, soit 320 €.",
        "Valeur de revente : 12 000 × 0,85⁸ = 12 000 × 0,2724905 = 3 269,89 €. Décote : 8 730,11 €.",
        "Coût total : 12 000 + 12 210 + 4 800 + 4 857,81 + 320 − 3 269,89 = **30 917,92 €**.",
        "Par mois : 30 917,92 ÷ 96 = **322 €**. Au kilomètre : 30 917,92 ÷ 120 000 = **0,26 €**.",
      ],
      suite: [
        "Une voiture moins chère et gardée plus longtemps coûte moins par mois (322 € contre 391 €). L'entretien pèse davantage : 16 % du coût contre 11 %.",
      ],
    },
    {
      titre: "Résumé des exemples",
      tableau: {
        colonnes: ["Poste", "Exemple 1", "Exemple 2", "Exemple 3"],
        lignes: [
          ["Voiture, durée, km par an", "18 000 €, 5 ans, 15 000 km", "18 000 €, 5 ans, 30 000 km", "12 000 €, 8 ans, 15 000 km"],
          ["Décote", "10 013 €", "10 013 €", "8 730 €"],
          ["Carburant", "7 631 €", "15 263 €", "12 210 €"],
          ["Assurance", "3 000 €", "3 000 €", "4 800 €"],
          ["Entretien", "2 655 €", "2 655 €", "4 858 €"],
          ["Contrôle technique", "160 €", "160 €", "320 €"],
          ["Coût total", "23 460 €", "31 091 €", "30 918 €"],
          ["Par mois", "391 €", "518 €", "322 €"],
          ["Au kilomètre", "0,31 €", "0,21 €", "0,26 €"],
        ],
      },
      suite: [
        "Totaux arrondis à l'euro : une somme peut différer d'un euro.",
      ],
    },
    {
      titre: "Comment utiliser le simulateur de coût d'une voiture",
      paras: [
        "Choisissez d'abord un type de véhicule parmi cinq cartes : citadine, berline, SUV, électrique ou utilitaire. Cela remplit le prix d'achat, la consommation, l'assurance et l'entretien avec des valeurs d'exemple. Ce sont des hypothèses : remplacez-les par vos vrais chiffres.",
        "Saisissez ensuite le prix d'achat, les kilomètres annuels, la consommation aux 100 km, le prix du carburant, l'assurance et l'entretien par an. La durée se choisit parmi quatre boutons : 3, 5, 7 ou 10 ans. Tous les champs doivent être supérieurs à zéro, sinon aucun résultat ne s'affiche. Pour une électrique, la consommation devient un coût en € aux 100 km et le prix du carburant reste à 1.",
        "Vous lisez le **coût total**, le coût **par mois** et le coût **par kilomètre**, un graphique de répartition (calculé hors revente), le détail des postes et un tableau année par année. Pour un autre mode de calcul, voyez le [calcul du coût kilométrique](/calcul-cout-kilometrique).",
        "Le simulateur simplifie : décote fixée à 15 % par an, entretien à +10 % par an dès la 4e année, contrôle technique à 80 €, prix du carburant constant, pas de valeur de revente saisissable. Hors de ces règles, refaites le calcul à la main comme dans l'exemple 3.",
      ],
    },
    {
      titre: "Pièges pratiques",
      liste: [
        "**Oublier la décote.** C'est le poste le plus lourd dans l'exemple 1, et le plus invisible. Une voiture payée comptant coûte quand même.",
        "**Garder les valeurs par défaut.** Un autre prix de carburant, d'assurance ou d'entretien change le résultat : saisissez les vôtres.",
        "**Comparer deux voitures sur des durées différentes.** Comparez-les sur la même durée, ou au kilomètre.",
      ],
      encadre:
        "Les montants de cet article sont des hypothèses pour illustrer la méthode, pas des moyennes du marché. Remplacez-les par vos propres chiffres.",
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Diviser par la mauvaise durée.** 5 ans = 60 mois, pas 5.",
        "**Oublier la revente.** Additionner le prix d'achat et tous les frais sans la retrancher surestime le coût.",
        "**Confondre coût mensuel et coût au kilomètre.** Le premier dépend de la durée, le second des kilomètres parcourus.",
        "**Oublier que l'entretien augmente** de 10 % par an à partir de la 4e année.",
      ],
    },
  ],
  calculateur: {
    href: "/simulateur-cout-voiture",
    nom: "Simulateur de coût d'une voiture",
    titre: "Calculez le coût réel de votre voiture",
    texte:
      "Choisissez un type de véhicule, saisissez vos chiffres et la durée : le simulateur affiche le coût total, par mois et au kilomètre.",
    bouton: "Ouvrir le simulateur de coût d'une voiture",
  },
  faq: [
    {
      q: "Combien coûte une voiture par mois ?",
      a: "Cela dépend du véhicule, des kilomètres et de la durée. Coût total (achat + carburant + assurance + entretien + contrôle technique − revente) ÷ (années × 12). Avec les réglages par défaut du simulateur, qui sont des hypothèses, on trouve 391 € par mois.",
    },
    {
      q: "Comment calculer le coût d'une voiture au kilomètre ?",
      a: "On divise le coût total par le nombre de kilomètres parcourus pendant la détention. Dans l'exemple 1 : 23 459,55 € ÷ 75 000 km = 0,31 € du kilomètre.",
    },
    {
      q: "Quel est le poste le plus coûteux d'une voiture ?",
      a: "Dans les exemples de cet article, c'est la perte de valeur ou le carburant selon les kilomètres : la décote représente 43 % du coût dans l'exemple 1, et le carburant 49 % dans l'exemple 2.",
    },
    {
      q: "Comment calculer le coût d'une voiture à l'année ?",
      a: "On divise le coût total par le nombre d'années. Dans l'exemple 1, 23 459,55 € ÷ 5 ans = 4 692 € par an, soit 391 € par mois.",
    },
    {
      q: "Le simulateur compte-t-il le stationnement, les péages ou le crédit ?",
      a: "Non. Il compte la perte de valeur, le carburant, l'assurance, l'entretien et le contrôle technique. Le stationnement, les péages, un crédit éventuel et les amendes sont à ajouter vous-même.",
    },
  ],
  sources: [],
  datePublication: "2026-11-20",
  dateAffichee: "20 novembre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
