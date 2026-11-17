import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer sa consommation d'essence aux 100 km ?";
const DESCRIPTION =
  "La consommation aux 100 km se calcule avec la méthode du plein à plein : litres ÷ kilomètres × 100. Exemples chiffrés, coût d'un trajet, km par litre et pièges à éviter.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-sa-consommation-aux-100-km" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "calcul consommation carburant 100 km, consommation moyenne aux 100 km, calcul consommation plein à plein, consommation d'essence, litres aux 100 km, coût aux 100 km",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-sa-consommation-aux-100-km",
  fil: "Consommation aux 100 km",
  emoji: "⛽",
  couleur: "from-orange-500 to-amber-600",
  h1: "Comment calculer sa consommation d'essence aux 100 km ?",
  chapo:
    "Savoir combien votre voiture consomme vraiment permet de prévoir le budget carburant d'un trajet, d'une année ou de comparer deux véhicules. Voici la méthode du plein à plein, des exemples chiffrés et les pièges à éviter.",
  reponse:
    "**Consommation (L/100 km) = litres consommés ÷ kilomètres parcourus × 100.** Pour la mesurer, faites le plein, remettez le compteur journalier à zéro, roulez, refaites le plein : les litres du second plein correspondent aux kilomètres du compteur.",
  sections: [
    {
      titre: "La formule de la consommation aux 100 km",
      paras: [
        "La consommation aux 100 km indique combien de litres votre voiture utilise pour parcourir 100 kilomètres. Plus le chiffre est bas, moins le véhicule consomme.",
        "Pour la calculer, il suffit de deux données : les **litres consommés** et les **kilomètres parcourus** pendant que vous les consommiez.",
      ],
      liste: [
        "**Consommation :** litres ÷ kilomètres × 100.",
        "**Coût aux 100 km :** consommation × prix du litre.",
        "**Coût d'un trajet :** distance ÷ 100 × consommation × prix du litre.",
        "**Kilomètres par litre :** 100 ÷ consommation aux 100 km.",
      ],
    },
    {
      titre: "La méthode du plein à plein",
      paras: [
        "C'est la façon la plus simple de mesurer sa vraie consommation, sans dépendre d'un affichage du tableau de bord.",
      ],
      etapes: [
        "Faites le plein du réservoir.",
        "Remettez le compteur journalier à zéro.",
        "Roulez comme d'habitude, sans rien changer à vos trajets.",
        "Refaites le plein et notez les litres ajoutés ainsi que les kilomètres du compteur.",
        "Appliquez la formule : litres ÷ kilomètres × 100.",
      ],
      suite: [
        "Les litres du second plein sont exactement ce que la voiture a consommé sur les kilomètres affichés. **Plus le trajet est long, plus le résultat est fiable**, car une petite imprécision pèse moins sur un grand nombre de kilomètres.",
        "L'ordinateur de bord donne aussi une estimation, mais elle peut s'écarter du calcul au plein. Si les deux ne concordent pas, fiez-vous au plein à plein, qui repose sur ce que vous avez réellement payé à la pompe.",
      ],
    },
    {
      titre: "Exemple 1 : 42 L pour 650 km",
      paras: [
        "Au second plein, vous avez mis 42 L, et le compteur journalier affiche 650 km.",
      ],
      etapes: [
        "On divise les litres par les kilomètres : 42 ÷ 650 = 0,0646.",
        "On multiplie par 100 : 0,0646 × 100 = **6,46 L/100 km**.",
      ],
      suite: [
        "Votre voiture consomme donc environ 6,5 L aux 100 km. En kilomètres par litre, cela fait 100 ÷ 6,46 = 15,5 km avec un litre.",
      ],
    },
    {
      titre: "Exemple 2 : 35 L pour 500 km",
      paras: ["Même démarche avec un autre relevé : 35 L pour 500 km."],
      etapes: [
        "On divise : 35 ÷ 500 = 0,07.",
        "On multiplie par 100 : 0,07 × 100 = **7 L/100 km**.",
      ],
      suite: [
        "En kilomètres par litre : 100 ÷ 7 = 14,3 km. Cette voiture consomme un peu plus que celle de l'exemple précédent, même si le plein est plus petit : seule la proportion entre litres et kilomètres compte.",
      ],
    },
    {
      titre: "Exemple 3 : le coût d'un trajet de 450 km",
      paras: [
        "Votre voiture consomme 6,5 L/100 km et vous partez pour 450 km. Le prix du litre est ici une hypothèse : 1,80 €. Remplacez-le par le prix que vous payez réellement.",
      ],
      etapes: [
        "On calcule les litres nécessaires : 450 ÷ 100 × 6,5 = 4,5 × 6,5 = **29,25 L**.",
        "On multiplie par le prix du litre : 29,25 × 1,80 = **52,65 €**.",
      ],
      suite: [
        "Le coût aux 100 km est de 6,5 × 1,80 = 11,70 €, soit environ 0,12 € par kilomètre. Pour comparer ce coût à d'autres frais d'un déplacement, voyez [le calcul du coût d'un trajet en voiture](/calcul-cout-trajet-voiture).",
      ],
    },
    {
      titre: "Exemple 4 : passer des L/100 km aux km par litre",
      paras: [
        "Certaines personnes raisonnent en kilomètres par litre, d'autres en litres aux 100 km. La conversion est simple : km par litre = 100 ÷ consommation.",
      ],
      etapes: [
        "Pour 5 L/100 km : 100 ÷ 5 = **20 km par litre**.",
        "Pour 7 L/100 km : 100 ÷ 7 = **14,3 km par litre**.",
      ],
      suite: [
        "Plus la consommation aux 100 km est basse, plus on parcourt de kilomètres avec un litre.",
      ],
    },
    {
      titre: "Exemple 5 : 5,5 ou 7 L/100 km sur une année",
      paras: [
        "Deux voitures parcourent chacune 15 000 km par an. L'une consomme 5,5 L/100 km, l'autre 7 L/100 km. Le litre est à 1,80 € (hypothèse).",
      ],
      etapes: [
        "Voiture à 5,5 L/100 km : 15 000 ÷ 100 × 5,5 = 150 × 5,5 = 825 L, soit 825 × 1,80 = **1 485 €**.",
        "Voiture à 7 L/100 km : 150 × 7 = 1 050 L, soit 1 050 × 1,80 = **1 890 €**.",
        "L'écart : 1 890 − 1 485 = **405 € par an**.",
      ],
      suite: [
        "La voiture la plus sobre coûte donc 405 € de moins sur l'année, soit environ 21 % de moins que l'autre (405 ÷ 1 890). Pour calculer un pourcentage comme celui-ci, vous pouvez utiliser le [calcul de pourcentage](/calcul-pourcentage).",
      ],
    },
    {
      titre: "Résumé des exemples",
      tableau: {
        colonnes: ["Situation", "Calcul", "Résultat"],
        lignes: [
          ["42 L pour 650 km", "42 ÷ 650 × 100", "6,46 L/100 km"],
          ["35 L pour 500 km", "35 ÷ 500 × 100", "7 L/100 km"],
          ["450 km à 6,5 L/100 km", "4,5 × 6,5 × 1,80", "52,65 €"],
          ["5 L/100 km en km par litre", "100 ÷ 5", "20 km/L"],
          ["15 000 km à 5,5 L/100 km", "825 L × 1,80", "1 485 €"],
          ["15 000 km à 7 L/100 km", "1 050 L × 1,80", "1 890 €"],
        ],
      },
    },
    {
      titre: "Ce qui fait varier la consommation",
      paras: [
        "Une même voiture ne consomme pas toujours pareil. Plusieurs facteurs jouent sur le résultat que vous mesurez :",
      ],
      liste: [
        "**La vitesse et le type de route :** ville, route ou autoroute ne donnent pas la même consommation.",
        "**La charge :** passagers, bagages ou coffre de toit alourdissent le véhicule.",
        "**La climatisation**, qui demande de l'énergie au moteur.",
        "**La pression des pneus :** des pneus sous-gonflés augmentent la consommation.",
        "**Le style de conduite :** accélérations et freinages brusques coûtent du carburant.",
        "**Les petits trajets :** un moteur froid consomme davantage tant qu'il n'est pas monté en température.",
      ],
      suite: [
        "C'est pourquoi un relevé sur un seul plein ne vaut que pour les conditions de ce plein. Pour une moyenne solide, répétez la mesure sur plusieurs pleins et comparez les résultats.",
      ],
    },
    {
      titre: "Comment utiliser le calculateur de consommation d'essence",
      paras: [
        "Le calculateur part d'une consommation que vous connaissez déjà : il ne la calcule pas à partir des litres du plein. Commencez donc par la méthode ci-dessus, puis reportez le résultat.",
        "Vous saisissez trois valeurs : la **distance** en kilomètres, la **consommation** en L/100 km et le **prix du litre** en euros. Les décimales s'écrivent avec une virgule ou un point. Des boutons proposent des valeurs toutes prêtes pour chaque champ, par exemple 5, 6, 7 ou 8 pour la consommation, ou des prix de 1,55 € à 2,05 € pour le litre. Si une valeur est vide, nulle ou négative, aucun résultat n'est affiché.",
        "Le calculateur affiche le **coût du trajet**, les **litres nécessaires**, le **coût par kilomètre** et le nombre de kilomètres que l'on parcourt avec 100 € de carburant. Il donne aussi une estimation du coût mensuel pour 20 km aller-retour par jour pendant 22 jours, et pour 1 000 km par mois.",
        "Avec 450 km, 6,5 L/100 km et un litre à 1,80 €, vous lisez donc 29,25 L et 52,65 €. Pour d'autres frais de déplacement, consultez [combien coûte un trajet en voiture](/combien-coute-un-trajet-en-voiture).",
      ],
      encadre:
        "Les prix du litre de cet article sont des hypothèses. Mettez celui que vous payez à la pompe : il varie d'une station à l'autre et d'une semaine à l'autre.",
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Mesurer sur un trajet trop court.** Quelques dizaines de kilomètres donnent un résultat peu fiable. Visez un plein entier.",
        "**Ne pas remettre le compteur à zéro** au moment du premier plein : les kilomètres ne correspondent plus aux litres.",
        "**Se fier uniquement à l'ordinateur de bord.** Sa valeur est une estimation, qui peut différer du plein à plein.",
        "**Inverser la formule.** On divise les litres par les kilomètres, puis on multiplie par 100, et non l'inverse.",
        "**Oublier de remplacer le prix du litre** par le prix réel quand on calcule un coût.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-consommation-essence",
    nom: "Consommation d'essence",
    titre: "Calculez le coût de votre trajet",
    texte:
      "Saisissez la distance, votre consommation aux 100 km et le prix du litre : le calculateur affiche le coût du trajet, les litres nécessaires et le coût par kilomètre.",
    bouton: "Ouvrir le calculateur de consommation d'essence",
  },
  faq: [
    {
      q: "Comment calculer la consommation aux 100 km ?",
      a: "On divise les litres consommés par les kilomètres parcourus, puis on multiplie par 100. Pour 42 L sur 650 km : 42 ÷ 650 × 100 = 6,46 L/100 km.",
    },
    {
      q: "Comment fonctionne le calcul plein à plein ?",
      a: "On fait le plein, on remet le compteur journalier à zéro, on roule, puis on refait le plein. Les litres du second plein correspondent à ce qui a été consommé sur les kilomètres du compteur. Plus le trajet est long, plus le résultat est fiable.",
    },
    {
      q: "Comment calculer le coût d'un trajet en voiture ?",
      a: "Coût = distance ÷ 100 × consommation × prix du litre. Pour 450 km à 6,5 L/100 km avec un litre à 1,80 € (hypothèse) : 4,5 × 6,5 × 1,80 = 52,65 €.",
    },
    {
      q: "Comment convertir les L/100 km en km par litre ?",
      a: "On divise 100 par la consommation. Pour 5 L/100 km, on obtient 100 ÷ 5 = 20 km par litre.",
    },
    {
      q: "Pourquoi ma consommation change-t-elle d'un plein à l'autre ?",
      a: "Elle dépend de la vitesse, du type de route, de la charge, de la climatisation, de la pression des pneus, du style de conduite et des petits trajets à moteur froid. Répétez la mesure sur plusieurs pleins pour obtenir une moyenne.",
    },
  ],
  sources: [],
  datePublication: "2026-11-16",
  dateAffichee: "16 novembre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
