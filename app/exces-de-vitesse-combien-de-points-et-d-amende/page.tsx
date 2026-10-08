import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Excès de vitesse : combien de points et d'amende ? (tableau)";
const DESCRIPTION =
  "Moins de 5 km/h : 0 point. De 5 à 19 km/h : 1 point et 68 ou 135 €. À partir de 50 km/h : délit, 300 € et 6 points. Tableau complet, vitesse retenue, récupération des points.";

export const metadata: Metadata = {
  alternates: { canonical: "/exces-de-vitesse-combien-de-points-et-d-amende" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "excès de vitesse combien de points, amende excès de vitesse, tableau des excès de vitesse, montant excès de vitesse, vitesse retenue excès de vitesse, retrait de points combien de temps, petit excès de vitesse, grand excès de vitesse, retrait de 1 point, retrait de 4 points, retrait de 6 points, excès de vitesse en ville",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/exces-de-vitesse-combien-de-points-et-d-amende",
  fil: "Excès de vitesse : points et amende",
  emoji: "🚨",
  couleur: "from-red-500 to-orange-600",
  h1: "Excès de vitesse : combien de points et d'amende ?",
  chapo:
    "Cet article s'adresse aux conducteurs qui ont été flashés ou qui veulent savoir ce qu'ils risquent. Il donne le tableau complet de l'amende et des points, explique la vitesse retenue par le radar, et dit combien de temps il faut pour récupérer ses points.",
  reponse:
    "Cela dépend de l'**excès retenu**, c'est-à-dire de la vitesse mesurée moins la marge du radar. Sous **5 km/h** : amende mais **0 point**. De **5 à 19 km/h** : **1 point** et **68 €** (**135 €** si la limite est de 50 km/h ou moins). De **20 à 29 km/h** : **135 €** et **2 points**. De **30 à 39 km/h** : **3 points**. De **40 à 49 km/h** : **4 points**. À partir de **50 km/h** : c'est un **délit**, avec une amende forfaitaire de **300 €** et **6 points**. Un seul point se récupère en **6 mois**, les autres en **3 ans** si vous ne commettez aucune nouvelle infraction.",
  sections: [
    {
      titre: "Le tableau : amende et points selon l'excès de vitesse",
      paras: [
        "Les montants ci-dessous sont ceux de l'**amende forfaitaire**, celle que l'on vous demande de payer sans passer devant un juge. Elle est **minorée** si vous payez vite et **majorée** si vous payez trop tard (voir plus bas). L'excès se compte sur la **vitesse retenue**, pas sur la vitesse affichée par le radar.",
      ],
      tableau: {
        colonnes: ["Excès retenu", "Limite", "Infraction", "Forfaitaire", "Minorée", "Majorée", "Points"],
        lignes: [
          ["Moins de 5 km/h", "plus de 50 km/h", "3e classe", "68 €", "45 €", "180 €", "0"],
          ["Moins de 5 km/h", "50 km/h ou moins", "4e classe", "135 €", "90 €", "375 €", "0"],
          ["5 à 19 km/h", "plus de 50 km/h", "3e classe", "68 €", "45 €", "180 €", "1"],
          ["5 à 19 km/h", "50 km/h ou moins", "4e classe", "135 €", "90 €", "375 €", "1"],
          ["20 à 29 km/h", "toutes", "4e classe", "135 €", "90 €", "375 €", "2"],
          ["30 à 39 km/h", "toutes", "4e classe", "135 €", "90 €", "375 €", "3"],
          ["40 à 49 km/h", "toutes", "4e classe", "135 €", "90 €", "375 €", "4"],
          ["50 km/h ou plus", "toutes", "délit", "300 €", "250 €", "600 €", "6"],
        ],
        texte: true,
      },
      suite: [
        "Dans le langage courant, le **petit excès** est celui de moins de 20 km/h : 1 point au plus. Le **grand excès** est celui de 50 km/h ou plus : depuis le 29 décembre 2025, ce n'est plus une contravention de 5e classe mais un délit. Il était déjà un délit en cas de récidive.",
        "Pour le délit, les 300 € sont une amende forfaitaire délictuelle. Si vous la refusez, l'affaire va devant le tribunal correctionnel, qui peut prononcer jusqu'à 3 750 € d'amende et 3 mois de prison.",
      ],
      visuel: {
        fichier: "exces-de-vitesse-amende-et-points-par-tranche",
        alt: "Tableau de l'amende forfaitaire et des points retirés selon l'excès de vitesse retenu : moins de 5 km/h 68 € ou 135 € et 0 point ; de 5 à 19 km/h 68 € ou 135 € et 1 point ; de 20 à 29 km/h 135 € et 2 points ; de 30 à 39 km/h 135 € et 3 points ; de 40 à 49 km/h 135 € et 4 points ; 50 km/h et plus 300 € (délit) et 6 points",
        legende:
          "Amende forfaitaire et points par tranche d'excès retenu, d'après le barème de service-public.fr (fiche « Vitesse au volant » et actualité sur le délit d'excès de vitesse), calculé avec le simulateur du site.",
      },
      encadre:
        "Les montants et les points sont ceux en vigueur au 7 octobre 2026. La décision finale appartient à l'administration ou au juge.",
    },
    {
      titre: "Excès de vitesse en ville : pourquoi 135 € au lieu de 68 € ?",
      paras: [
        "Sous 20 km/h d'excès, tout dépend de la limite. Quand elle est de **50 km/h ou moins** (la ville, une zone 30), l'infraction est de 4e classe : **135 €**. Quand elle est **supérieure à 50 km/h** (route, autoroute), elle est de 3e classe : **68 €**.",
        "Au-dessus de 20 km/h d'excès, la différence disparaît : c'est 135 € partout. Exemple : limite de 50 km/h, vitesse mesurée de 56 km/h. La vitesse retenue est de 51 km/h, soit 1 km/h de trop. Vous payez tout de même 135 €, mais vous ne perdez aucun point.",
      ],
    },
    {
      titre: "Quelle vitesse est retenue par le radar ?",
      paras: [
        "Le radar ne vous sanctionne pas sur la vitesse qu'il a mesurée. Il retranche d'abord une **marge technique** : **5 km/h** en dessous de 100 km/h, **5 %** à partir de 100 km/h. L'Agence nationale de traitement automatisé des infractions (ANTAI) précise que cette marge est toujours prise à l'avantage du conducteur. Son exemple : un véhicule enregistré à 97 km/h est retenu à 92 km/h.",
        "Voici trois exemples, que vous pouvez refaire dans le calculateur.",
      ],
      etapes: [
        "**Limite de 80 km/h, vitesse mesurée de 93 km/h.** 93 − 5 = 88 km/h retenus, soit 8 km/h d'excès : **68 €** et **1 point**.",
        "**Autoroute à 130 km/h, vitesse mesurée de 140 km/h.** 5 % de 140 = 7, donc 140 − 7 = 133 km/h retenus, soit 3 km/h d'excès : **68 €** mais **0 point**.",
        "**Limite de 90 km/h, vitesse mesurée de 120 km/h.** 5 % de 120 = 6, donc 120 − 6 = 114 km/h retenus, soit 24 km/h d'excès : **135 €** et **2 points**.",
      ],
      suite: [
        "Quand les 5 % ne tombent pas juste, le calculateur du site arrondit la vitesse retenue à l'entier inférieur : nous n'avons pas trouvé de règle d'arrondi sur les pages officielles, c'est un choix du calculateur.",
        "Les voitures-radars de nouvelle génération, qui roulent avec les forces de l'ordre, ont une marge plus large : **10 km/h** sous 100 km/h et **10 %** au-dessus, selon l'ANTAI. Le calculateur du site applique seulement la marge de 5 km/h ou 5 %.",
      ],
      encadre:
        "Pour calculer votre cas, ouvrez le [simulateur d'amende pour excès de vitesse](/simulateur-amende-exces-vitesse) : il retranche la marge, puis donne l'amende, les points et les peines possibles.",
    },
    {
      titre: "Combien de temps pour payer l'amende ?",
      paras: [
        "Le montant change selon la date de paiement. Le délai court à partir de la constatation de l'infraction ou, si un avis est envoyé, à partir de son envoi.",
      ],
      liste: [
        "**Minorée** : si vous payez dans les **15 jours**, ou **30 jours** en cas de télépaiement par carte bancaire. Pour une amende de 135 €, cela fait 90 €.",
        "**Forfaitaire** : si vous payez dans les **45 jours**, ou **60 jours** en télépaiement.",
        "**Majorée** : au-delà, le montant augmente. Pour 135 €, c'est 375 €, soit environ 2,8 fois plus. Pour 68 €, c'est 180 €.",
      ],
      suite: [
        "Pour le délit, l'amende forfaitaire délictuelle est de 250 € si vous la payez dans les 15 jours, de 300 € ensuite, et de 600 € en cas de retard.",
        "Si vous roulez beaucoup, le [calcul du coût d'un trajet en voiture](/calcul-cout-trajet-voiture) aide à budgéter vos déplacements.",
      ],
    },
    {
      titre: "Quand les points sont-ils retirés ?",
      paras: [
        "Les points sont retirés quand l'infraction est **établie**, pas au moment du flash. Elle est établie par le paiement de l'amende forfaitaire, par l'émission du titre exécutoire d'une amende majorée, par une composition pénale ou par une condamnation définitive.",
        "Payer l'amende forfaitaire établit donc l'infraction : c'est à ce moment que les points partent. Tant que l'infraction n'est pas établie, ils ne sont pas retirés.",
      ],
    },
    {
      titre: "Combien de temps pour récupérer ses points ?",
      paras: [
        "La récupération est automatique, mais le délai dépend de la gravité. Il court à partir de la date où l'infraction est établie (voir plus haut), et vous ne devez commettre **aucune nouvelle infraction** pendant ce délai.",
      ],
      tableau: {
        colonnes: ["Situation", "Délai", "Excès de vitesse concerné"],
        lignes: [
          ["Vous perdez 1 seul point", "6 mois", "de 5 à 19 km/h d'excès"],
          ["Pas de délit ni d'infraction de 4e ou 5e classe dans le dossier", "2 ans", "plusieurs excès de 5 à 19 km/h avec une limite supérieure à 50 km/h (3e classe)"],
          ["Un délit ou une infraction de 4e ou 5e classe", "3 ans", "20 à 49 km/h (4e classe) ; 50 km/h ou plus (délit) ; ou plusieurs infractions dont un excès de 5 à 19 km/h avec une limite de 50 km/h ou moins (4e classe)"],
          ["Nouvelle infraction à chaque délai, sans solde nul", "10 ans", "contraventions de 1re à 4e classe seulement"],
        ],
        texte: true,
      },
      suite: [
        "Concrètement : après 1 seul point perdu pour 10 km/h d'excès, que la limite soit de 50 ou de 80 km/h, vous retrouvez votre point au bout de 6 mois sans nouvelle infraction. Après un excès de 20 à 49 km/h (2, 3 ou 4 points, 4e classe) ou un délit (6 points), il faut **3 ans** sans nouvelle infraction pour retrouver les 12 points. Chaque nouvelle infraction repousse la date, puisque le délai court depuis la dernière.",
        "Si le solde tombe à zéro, le permis est invalidé : l'interdiction de conduire s'applique et un contrôle médical est nécessaire avant de repasser le permis.",
      ],
    },
    {
      titre: "Le stage permet-il de récupérer des points ?",
      paras: [
        "Oui, c'est le seul moyen d'aller plus vite que les délais automatiques. Le stage de sensibilisation à la sécurité routière est volontaire dans la plupart des cas.",
      ],
      liste: [
        "Il permet de récupérer **jusqu'à 4 points**, dans la limite de 12 points (6 pour un permis probatoire de moins d'un an).",
        "Vous pouvez en faire **1 par an au maximum**. Un stage fait du 1er au 2 octobre 2025 permet d'en refaire un à partir du 1er octobre 2026.",
        "Votre permis doit être encore valide, c'est-à-dire avoir **au moins 1 point**.",
        "Il dure **2 jours de suite** (7 heures par jour) et coûte **200 € en moyenne**, le prix étant fixé librement par l'organisme.",
        "En permis probatoire, un retrait de **3 points ou plus** rend le stage **obligatoire** dans les 4 mois suivant la lettre recommandée.",
      ],
    },
    {
      titre: "À partir de quel excès de vitesse risque-t-on son permis ?",
      paras: [
        "Les points ne sont pas la seule menace : le juge peut aussi prononcer des **peines complémentaires**.",
      ],
      liste: [
        "**De 30 à 49 km/h d'excès** : suspension du permis jusqu'à 3 ans (avec un aménagement possible en dehors de l'activité professionnelle), interdiction de conduire certains véhicules, stage à vos frais.",
        "**50 km/h ou plus** : délit puni de 3 mois de prison et jusqu'à 3 750 € d'amende. Le véhicule peut être immobilisé et mis en fourrière. Le juge peut prononcer la suspension (3 ans maximum, sans aménagement), l'annulation du permis et la confiscation du véhicule, qui est obligatoire en cas de récidive sauf décision spécialement motivée.",
        "**Un accident** : un excès de 30 km/h ou plus est une circonstance aggravante en cas d'homicide ou de blessures routières.",
      ],
      encadre:
        "Ces peines ne sont pas automatiques : c'est le juge qui décide. Si vous avez un doute sur votre dossier, adressez-vous à votre préfecture ou à un avocat.",
    },
  ],
  calculateur: {
    href: "/simulateur-amende-exces-vitesse",
    nom: "Simulateur d'amende pour excès de vitesse",
    titre: "Calculez votre amende et vos points",
    texte:
      "Indiquez la vitesse mesurée par le radar et la vitesse autorisée : le simulateur retranche la marge technique, puis affiche l'amende minorée, forfaitaire et majorée, les points retirés et les peines possibles.",
    bouton: "Ouvrir le simulateur d'amende",
  },
  faq: [
    {
      q: "Combien de points pour un excès de vitesse ?",
      a: "Aucun point sous 5 km/h d'excès, 1 point de 5 à 19 km/h, 2 points de 20 à 29 km/h, 3 points de 30 à 39 km/h, 4 points de 40 à 49 km/h et 6 points à partir de 50 km/h. L'excès se calcule sur la vitesse retenue, après la marge du radar.",
    },
    {
      q: "Quelle est l'amende pour un excès de vitesse de moins de 20 km/h ?",
      a: "68 € si la limite est supérieure à 50 km/h (3e classe), 135 € si elle est de 50 km/h ou moins (4e classe). Les montants minorés sont 45 € et 90 €, les montants majorés 180 € et 375 €.",
    },
    {
      q: "Quelle est la vitesse retenue pour un excès de vitesse ?",
      a: "C'est la vitesse mesurée moins la marge technique : 5 km/h en dessous de 100 km/h, 5 % à partir de 100 km/h. Exemple de l'ANTAI : 97 km/h mesurés, 92 km/h retenus. La marge est de 10 km/h ou 10 % pour les voitures-radars de nouvelle génération.",
    },
    {
      q: "Combien de temps pour récupérer un point perdu ?",
      a: "6 mois si vous ne perdez qu'un seul point. Pour 2 points ou plus perdus avec une infraction de 4e classe ou un délit, comme un excès de 20 km/h ou plus, c'est 3 ans. Dans les deux cas, vous ne devez pas commettre de nouvelle infraction pendant ce délai.",
    },
    {
      q: "Qu'est-ce qu'un retrait de 6 points ?",
      a: "Pour un excès de vitesse, c'est l'excès de 50 km/h ou plus, qui est un délit. Le retrait de 6 points sanctionne aussi la détention ou l'usage d'un détecteur de radar. Le retrait de 4 points correspond à un excès de 40 à 49 km/h.",
    },
    {
      q: "Peut-on récupérer des points avec un stage ?",
      a: "Oui, jusqu'à 4 points par stage, avec 1 stage par an au maximum. Le stage dure 2 jours et coûte 200 € en moyenne. Il faut avoir encore au moins 1 point sur le permis.",
    },
    {
      q: "Quel excès de vitesse est un délit ?",
      a: "Un excès de 50 km/h ou plus au-dessus de la vitesse maximale autorisée, depuis le 29 décembre 2025 (il l'était déjà en cas de récidive). Il vaut 6 points et une amende forfaitaire délictuelle de 300 €, ou jusqu'à 3 750 € et 3 mois de prison devant le tribunal.",
    },
    {
      q: "Combien de temps ai-je pour payer l'amende ?",
      a: "15 jours pour le montant minoré (30 jours en télépaiement), 45 jours pour le montant forfaitaire (60 jours en télépaiement). Au-delà, l'amende est majorée.",
    },
  ],
  sources: [
    {
      label: "Service-public.fr : Vitesse au volant (sanctions en cas d'excès de vitesse)",
      url: "https://www.service-public.fr/particuliers/vosdroits/F19460",
    },
    {
      label: "Service-public.fr : Le grand excès de vitesse est désormais un délit",
      url: "https://www.service-public.fr/particuliers/actualites/A18723",
    },
    {
      label: "Service-public.fr : Amende forfaitaire en cas de contravention au code de la route",
      url: "https://www.service-public.fr/particuliers/vosdroits/F18509",
    },
    {
      label: "Service-public.fr : Récupération des points du permis de conduire",
      url: "https://www.service-public.fr/particuliers/vosdroits/F1685",
    },
    {
      label: "Service-public.fr : Stage de sensibilisation à la sécurité routière",
      url: "https://www.service-public.fr/particuliers/vosdroits/F14208",
    },
    {
      label: "ANTAI : Les radars en France (marge technique)",
      url: "https://www.antai.gouv.fr/les-radars-en-france/",
    },
  ],
  datePublication: "2026-10-07",
  dateAffichee: "7 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
