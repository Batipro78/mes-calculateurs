import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer les indemnités kilométriques ?";
const DESCRIPTION =
  "Les indemnités kilométriques se calculent avec le barème fiscal selon la puissance (CV) et la distance annuelle. Formules, exemples chiffrés, tableau des voitures et pièges des frais réels.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-les-indemnites-kilometriques" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "indemnités kilométriques, barème kilométrique 2026, frais réels kilomètres, déduire trajets domicile travail, calcul IK voiture, barème fiscal 2026",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-les-indemnites-kilometriques",
  fil: "Indemnités kilométriques",
  emoji: "🚗",
  couleur: "from-sky-500 to-blue-600",
  h1: "Comment calculer les indemnités kilométriques ?",
  chapo:
    "Si vous utilisez votre véhicule pour aller travailler et que vous optez pour les frais réels, le barème kilométrique fiscal donne le montant à déduire. Voici comment l'appliquer, avec des exemples chiffrés et les limites à connaître.",
  reponse:
    "**Cherchez votre puissance fiscale (CV) sur la carte grise, estimez vos kilomètres sur l'année, puis appliquez la formule de la tranche correspondante.** Pour une voiture de 5 CV qui roule 12 000 km, le barème 2026 (revenus 2025) donne 12 000 × 0,357 + 1 395 = **5 679 €**. Ce barème sert aux salariés qui choisissent les frais réels plutôt que l'abattement forfaitaire de 10 %.",
  sections: [
    {
      titre: "À quoi sert le barème kilométrique ?",
      paras: [
        "Pour sa déclaration de revenus, un salarié a le choix entre deux méthodes. Soit il garde l'**abattement forfaitaire de 10 %**, appliqué automatiquement. Soit il opte pour les **frais réels** et déduit ses dépenses professionnelles réelles, dont ses frais de déplacement.",
        "Le barème kilométrique permet d'évaluer ces frais de déplacement sans retrouver chaque facture d'essence ou d'entretien. On compare ensuite les deux méthodes et on garde la plus avantageuse.",
        "Le barème utilisé pour la déclaration de 2026 (revenus 2025) est le même que celui publié en 2023 : il a été reconduit sans revalorisation. Ses montants sont ceux que reprend le calculateur.",
      ],
      visuel: {
        fichier: "indemnites-kilometriques-route",
        alt: "Vue depuis le siège conducteur d'une petite voiture : deux mains sur le volant, une route de campagne bordée de platanes au lever du soleil et, sur le siège passager, un carnet avec un stylo.",
        legende:
          "Chaque trajet professionnel compte dans la distance annuelle.",
      },
    },
    {
      titre: "Ce que couvre le barème",
      paras: [
        "Le barème couvre la dépréciation du véhicule, l'entretien, les réparations, les pneus, le carburant et l'assurance. Vous n'ajoutez donc pas ces dépenses une par une.",
        "En revanche, les frais de péage, de stationnement et les intérêts d'un crédit auto peuvent s'ajouter au montant du barème, sur justificatifs.",
      ],
    },
    {
      titre: "La formule pour une voiture",
      paras: [
        "Pour une voiture, la formule dépend de deux choses : la **puissance fiscale** (en CV, inscrite sur la carte grise) et la **distance annuelle** d parcourue. Trois tranches existent : jusqu'à 5 000 km, de 5 001 à 20 000 km, et au-delà de 20 000 km.",
        "Voici le barème utilisé par le calculateur pour les voitures. La distance d est exprimée en kilomètres.",
      ],
      tableau: {
        colonnes: [
          "Puissance",
          "Jusqu'à 5 000 km",
          "De 5 001 à 20 000 km",
          "Plus de 20 000 km",
        ],
        lignes: [
          ["3 CV et moins", "d × 0,529", "d × 0,316 + 1 065", "d × 0,37"],
          ["4 CV", "d × 0,606", "d × 0,34 + 1 330", "d × 0,407"],
          ["5 CV", "d × 0,636", "d × 0,357 + 1 395", "d × 0,427"],
          ["6 CV", "d × 0,665", "d × 0,374 + 1 457", "d × 0,447"],
          ["7 CV et plus", "d × 0,697", "d × 0,394 + 1 515", "d × 0,47"],
        ],
      },
      suite: [
        "Les montants sont en euros. Pour un véhicule électrique, le résultat est majoré de 20 %.",
      ],
    },
    {
      titre: "Exemple 1 : 5 CV et 12 000 km par an",
      paras: [
        "12 000 km se situent dans la tranche de 5 001 à 20 000 km. On applique donc la formule d × 0,357 + 1 395.",
      ],
      etapes: [
        "On part de d = 12 000 km et de 5 CV.",
        "On multiplie : 12 000 × 0,357 = 4 284.",
        "On ajoute la constante de la tranche : 4 284 + 1 395 = **5 679 €**.",
      ],
      suite: [
        "Cela représente 473,25 € par mois (5 679 ÷ 12) et 0,47 € par kilomètre en moyenne (5 679 ÷ 12 000 = 0,47325).",
      ],
    },
    {
      titre: "Exemple 2 : 4 CV et 4 000 km par an",
      paras: [
        "4 000 km se situent dans la première tranche, jusqu'à 5 000 km. Il n'y a pas de constante à ajouter : la formule est d × 0,606.",
      ],
      etapes: [
        "On part de d = 4 000 km et de 4 CV.",
        "On multiplie : 4 000 × 0,606 = **2 424 €**.",
      ],
      suite: [
        "Cela représente 202 € par mois (2 424 ÷ 12).",
      ],
    },
    {
      titre: "Exemple 3 : 6 CV électrique et 8 000 km par an",
      paras: [
        "8 000 km se situent dans la deuxième tranche : d × 0,374 + 1 457. Comme le véhicule est électrique, on majore le résultat de 20 %.",
      ],
      etapes: [
        "On part de d = 8 000 km et de 6 CV.",
        "On multiplie : 8 000 × 0,374 = 2 992.",
        "On ajoute la constante : 2 992 + 1 457 = 4 449 €.",
        "On majore de 20 % : 4 449 × 1,2 = **5 338,80 €**.",
      ],
      suite: [
        "Cela représente 444,90 € par mois (5 338,80 ÷ 12), soit environ 0,67 € par kilomètre (5 338,80 ÷ 8 000 = 0,66735).",
      ],
    },
    {
      titre: "Trajet domicile-travail : quelle distance compter ?",
      paras: [
        "Pour les trajets entre le domicile et le lieu de travail, la distance prise en compte est en principe limitée à **40 km par trajet aller**, soit 80 km aller-retour par jour. Une distance plus longue n'est admise que dans des circonstances particulières, qui doivent être justifiées.",
        "Prenons une personne qui fait 80 km aller-retour, 5 jours par semaine, avec une voiture de 5 CV. Le calculateur estime la distance annuelle sur 47 semaines : 80 × 5 × 47 = 18 800 km. Cette distance est dans la deuxième tranche : 18 800 × 0,357 + 1 395 = **8 106,60 €**.",
      ],
      encadre:
        "Les 47 semaines sont une hypothèse du calculateur, pas une règle fiscale. Si vous avez travaillé un nombre de semaines différent, saisissez directement votre distance annuelle réelle.",
    },
    {
      titre: "Comment utiliser le calculateur",
      paras: [
        "Choisissez d'abord le type de véhicule : voiture ou moto. Pour une voiture, sélectionnez la puissance fiscale parmi 3 CV et moins, 4, 5, 6 ou 7 CV et plus, et cochez la case « Véhicule électrique (+20%) » si c'est le cas. Pour une moto, choisissez sa puissance fiscale.",
        "Saisissez ensuite la distance annuelle en kilomètres. Vous pouvez aussi renseigner la distance aller-retour et le nombre de jours par semaine : le calculateur en déduit une distance annuelle sur 47 semaines et l'utilise à la place du champ précédent.",
        "À droite, vous lisez l'**indemnité annuelle**, puis le détail par mois et par kilomètre. Pour une voiture, le calculateur rappelle aussi les trois formules de votre puissance fiscale.",
        "Le calculateur donne le montant du barème. Il ne compare pas ce montant à l'abattement de 10 % et n'ajoute ni péages ni stationnement : ces calculs restent à faire de votre côté.",
      ],
    },
    {
      titre: "Frais réels ou abattement de 10 % : comment choisir ?",
      paras: [
        "L'abattement de 10 % est automatique. Les frais réels demandent de déclarer chaque dépense, avec des justificatifs. Ils ne valent la peine que s'ils dépassent l'abattement.",
      ],
      etapes: [
        "Calculez vos indemnités kilométriques avec le barème.",
        "Ajoutez les autres frais professionnels que vous pouvez justifier.",
        "Comparez le total à l'abattement de 10 % de votre salaire.",
        "Gardez la méthode qui donne la déduction la plus élevée.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Se tromper de tranche.** La formule change à 5 000 km et à 20 000 km. Vérifiez d'abord votre distance annuelle avant d'appliquer un coefficient.",
        "**Oublier la constante.** Dans la deuxième tranche, il faut ajouter un montant fixe (par exemple 1 395 pour 5 CV) après la multiplication.",
        "**Compter plus de 40 km par trajet sans justification.** La distance domicile-travail est en principe plafonnée, et le calculateur ne vérifie pas cette limite à votre place.",
        "**Ajouter l'essence ou l'assurance au barème.** Ces dépenses sont déjà comprises dans le barème. Certains frais supplémentaires peuvent s'ajouter.",
        "**Utiliser un ancien barème en pensant qu'il a changé.** Pour la déclaration de 2026, les montants sont ceux de 2023 : ils n'ont pas été revalorisés.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-indemnites-kilometriques",
    nom: "Calcul des indemnités kilométriques",
    titre: "Calculez vos indemnités kilométriques",
    texte:
      "Choisissez votre véhicule et sa puissance, saisissez votre distance annuelle : le calculateur affiche l'indemnité annuelle, par mois et par kilomètre.",
    bouton: "Ouvrir le calculateur d'indemnités kilométriques",
  },
  faq: [
    {
      q: "Comment calculer les indemnités kilométriques d'une voiture ?",
      a: "Repérez la puissance fiscale sur la carte grise, estimez la distance annuelle, puis appliquez la formule de la tranche : jusqu'à 5 000 km, de 5 001 à 20 000 km ou au-delà de 20 000 km. Par exemple, pour 5 CV et 12 000 km : 12 000 × 0,357 + 1 395 = 5 679 €.",
    },
    {
      q: "Le barème kilométrique a-t-il changé pour 2026 ?",
      a: "Non. Le barème utilisé pour la déclaration de 2026 (revenus 2025) a été reconduit sans revalorisation : ce sont les mêmes montants que ceux publiés en 2023.",
    },
    {
      q: "Quelle majoration pour une voiture électrique ?",
      a: "Le montant calculé avec le barème est majoré de 20 %. Pour une voiture de 6 CV électrique qui roule 8 000 km, on passe ainsi de 4 449 € à 5 338,80 €.",
    },
    {
      q: "Quelle distance peut-on déduire pour le trajet domicile-travail ?",
      a: "En principe, la distance prise en compte est limitée à 40 km par trajet aller, soit 80 km aller-retour par jour. Une distance supérieure n'est possible que dans des circonstances particulières, justifiées.",
    },
    {
      q: "Peut-on ajouter les péages et le stationnement ?",
      a: "Oui. Les frais de péage, de stationnement et les intérêts d'un crédit auto peuvent s'ajouter au barème, sur justificatifs. Le carburant, l'entretien et l'assurance sont déjà inclus dans le barème.",
    },
  ],
  sources: [
    {
      label: "impots.gouv.fr - Frais de transport",
      url: "https://www.impots.gouv.fr/particulier/frais-de-transport",
    },
    {
      label: "Service-public.fr - Les barèmes kilométriques 2026 sont disponibles",
      url: "https://www.service-public.gouv.fr/particuliers/actualites/A14686",
    },
    {
      label: "BOFiP - Barème des frais kilométriques",
      url: "https://bofip.impots.gouv.fr/bofip/2185-PGP.html/identifiant=BOI-BAREME-000001-20230720",
    },
  ],
  datePublication: "2026-10-27",
  dateAffichee: "27 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
