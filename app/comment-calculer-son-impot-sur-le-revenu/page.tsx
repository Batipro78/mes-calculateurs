import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer son impôt sur le revenu ? (barème 2026)";
const DESCRIPTION =
  "L'impôt sur le revenu se calcule en cinq étapes : abattement de 10 %, quotient familial, barème par tranches, parts, décote. Exemples chiffrés pas à pas, barème 2026.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-son-impot-sur-le-revenu" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "calcul impôt sur le revenu 2026 exemple, comment est calculé l'impôt, quotient familial calcul, décote impôt, barème impôt sur le revenu 2026, taux marginal et taux moyen",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-son-impot-sur-le-revenu",
  fil: "Calculer son impôt sur le revenu",
  emoji: "🧾",
  couleur: "from-indigo-500 to-blue-600",
  h1: "Comment calculer son impôt sur le revenu ?",
  chapo:
    "Salarié célibataire, couple ou famille : l'impôt sur le revenu suit toujours la même méthode, en cinq étapes. Voici le détail du calcul avec le barème 2026, quatre exemples chiffrés et les pièges à éviter.",
  reponse:
    "**On retire 10 % de frais professionnels, on divise par le nombre de parts, on applique le barème par tranches au résultat, on remultiplie par le nombre de parts, puis on retranche la décote si l'impôt est faible.** Le barème 2026 s'applique aux revenus de 2025, déclarés au printemps 2026. Par exemple, une personne seule qui déclare 25 000 € de salaires paie 845 € d'impôt.",
  sections: [
    {
      titre: "Les cinq étapes du calcul",
      paras: [
        "Le barème 2026 concerne les revenus perçus en 2025, que l'on déclare au printemps 2026. Pour des salaires, le calcul se déroule ainsi :",
      ],
      etapes: [
        "**Revenu net imposable :** on part des salaires déclarés et on retire l'abattement de 10 % pour frais professionnels. Cet abattement ne peut pas être inférieur à 509 € ni supérieur à 14 555 €.",
        "**Quotient familial :** on divise le revenu net imposable par le nombre de parts. Une personne seule a 1 part, un couple 2 parts. Chacun des deux premiers enfants ajoute 0,5 part, puis chaque enfant à partir du troisième ajoute 1 part.",
        "**Barème par tranches :** on applique le barème au quotient, tranche par tranche (voir le tableau plus bas).",
        "**Multiplication par le nombre de parts :** on multiplie l'impôt obtenu par le nombre de parts. C'est l'impôt brut.",
        "**Décote :** si l'impôt brut est faible, on la retranche. Le résultat est l'impôt à payer.",
      ],
      suite: [
        "Le prélèvement à la source n'est pas un autre impôt : c'est une façon de payer celui-ci chaque mois. Son taux est calculé par l'administration d'après votre dernière déclaration, il n'y a donc pas de formule à appliquer vous-même.",
      ],
    },
    {
      titre: "Le barème 2026",
      paras: [
        "Chaque taux ne s'applique qu'à la part du quotient familial comprise dans sa tranche. C'est le même barème que dans notre article sur [la tranche d'imposition](/comment-connaitre-sa-tranche-imposition), où vous trouverez comment lire sa tranche.",
      ],
      tableau: {
        colonnes: ["Quotient familial", "Taux"],
        lignes: [
          ["Jusqu'à 11 600 €", "0 %"],
          ["De 11 600 € à 29 579 €", "11 %"],
          ["De 29 579 € à 84 577 €", "30 %"],
          ["De 84 577 € à 181 917 €", "41 %"],
          ["Au-delà de 181 917 €", "45 %"],
        ],
      },
    },
    {
      titre: "Exemple 1 : une personne seule avec 25 000 € de salaires",
      etapes: [
        "Abattement : 25 000 × 10 % = 2 500 €. Revenu net imposable : 25 000 − 2 500 = **22 500 €**.",
        "Nombre de parts : 1. Quotient familial : 22 500 ÷ 1 = **22 500 €**.",
        "Barème : rien jusqu'à 11 600 €, puis 11 % sur la part de 11 600 € à 22 500 €, soit 10 900 × 11 % = **1 199 €**.",
        "Une seule part, donc impôt brut : 1 199 × 1 = **1 199 €**.",
        "Décote : cet impôt est inférieur au seuil de 1 982 €. Décote = 897 − (1 199 × 45,25 %) = 897 − 542,55 = **354,45 €**. Impôt à payer : 1 199 − 354,45 = **844,55 €**, soit environ 845 €.",
      ],
      suite: [
        "Le taux marginal est de 11 %, car le quotient se trouve dans la tranche à 11 %. Mais le taux moyen est de 844,55 ÷ 25 000, soit **3,38 %** : l'impôt pèse bien moins que le taux de la tranche.",
      ],
    },
    {
      titre: "Exemple 2 : un couple sans enfant avec 50 000 €",
      etapes: [
        "Abattement : 50 000 × 10 % = 5 000 €. Revenu net imposable : **45 000 €**.",
        "Nombre de parts : 2. Quotient familial : 45 000 ÷ 2 = **22 500 €**.",
        "Barème sur 22 500 € : comme dans l'exemple 1, **1 199 €** par part.",
        "Impôt brut : 1 199 × 2 = **2 398 €**.",
        "Décote : pour un couple, le seuil est de 3 277 € et le forfait de 1 483 €. Comme 2 398 € est sous le seuil, décote = 1 483 − (2 398 × 45,25 %) = 1 483 − 1 085,10 = **397,90 €**. Impôt à payer : 2 398 − 397,90 = **2 000,10 €**.",
      ],
      suite: [
        "Le taux moyen est de 2 000,10 ÷ 50 000, soit **4,00 %**. Le couple a le même quotient que la personne seule de l'exemple 1, mais il gagne deux fois plus : son impôt est plus que doublé, car la décote en retire proportionnellement moins.",
      ],
    },
    {
      titre: "Exemple 3 : un couple avec 2 enfants et 60 000 €",
      etapes: [
        "Abattement : 60 000 × 10 % = 6 000 €. Revenu net imposable : **54 000 €**.",
        "Nombre de parts : 2 pour le couple, plus 0,5 et 0,5 pour les enfants, soit **3 parts**. Quotient familial : 54 000 ÷ 3 = **18 000 €**.",
        "Barème sur 18 000 € : 11 % sur la part de 11 600 € à 18 000 €, soit 6 400 × 11 % = **704 €** par part.",
        "Impôt brut : 704 × 3 = **2 112 €**.",
        "Décote (seuil de 3 277 €) : 1 483 − (2 112 × 45,25 %) = 1 483 − 955,68 = **527,32 €**. Impôt à payer : 2 112 − 527,32 = **1 584,68 €**.",
      ],
      suite: [
        "Le taux moyen est de **2,64 %**. À revenu égal, un couple sans enfant paierait davantage : avec 60 000 € déclarés, il aurait un quotient de 27 000 €, un impôt brut de 3 388 € et aucune décote, soit 3 388 € à payer.",
      ],
    },
    {
      titre: "Exemple 4 : une personne seule avec 18 000 €, le cas de la décote",
      etapes: [
        "Abattement : 18 000 × 10 % = 1 800 €. Revenu net imposable : **16 200 €**.",
        "Nombre de parts : 1. Quotient familial : **16 200 €**.",
        "Barème : 11 % sur la part de 11 600 € à 16 200 €, soit 4 600 × 11 % = **506 €**. Impôt brut : 506 €.",
        "Décote : 897 − (506 × 45,25 %) = 897 − 228,97 = **668,03 €**.",
        "La décote est supérieure à l'impôt brut : 506 − 668,03 est négatif, l'impôt est ramené à **0 €**.",
      ],
      suite: [
        "Un quotient dans la tranche à 11 % ne signifie donc pas forcément un impôt à payer. La décote efface l'impôt des foyers modestes.",
      ],
    },
    {
      titre: "Taux marginal et taux moyen : l'écart sur un exemple",
      paras: [
        "Prenons une personne seule qui déclare 40 000 € de salaires.",
      ],
      etapes: [
        "Abattement de 4 000 €, revenu net imposable et quotient : **36 000 €**.",
        "Tranche à 11 % : (29 579 − 11 600) × 11 % = 17 979 × 11 % = **1 977,69 €**.",
        "Tranche à 30 % : (36 000 − 29 579) × 30 % = 6 421 × 30 % = **1 926,30 €**.",
        "Impôt : 1 977,69 + 1 926,30 = **3 903,99 €**. Il dépasse le seuil de 1 982 € : pas de décote.",
      ],
      suite: [
        "Le taux marginal est de 30 %, mais le taux moyen est de 3 903,99 ÷ 40 000, soit **9,76 %**. Les 30 % ne concernent que les euros situés au-dessus de 29 579 € de quotient. Pour partir d'un salaire brut, voyez d'abord [le passage du brut au net](/brut-en-net-quel-pourcentage) ; pour l'opération inverse, [comment passer du salaire net au brut](/comment-passer-du-salaire-net-au-brut).",
      ],
    },
    {
      titre: "Résumé des exemples",
      tableau: {
        colonnes: ["Situation", "Quotient", "Impôt brut", "Décote", "Impôt à payer"],
        lignes: [
          ["Seul, 25 000 €", "22 500 €", "1 199 €", "354,45 €", "844,55 €"],
          ["Couple, 50 000 €", "22 500 €", "2 398 €", "397,90 €", "2 000,10 €"],
          ["Couple, 2 enfants, 60 000 €", "18 000 €", "2 112 €", "527,32 €", "1 584,68 €"],
          ["Seul, 18 000 €", "16 200 €", "506 €", "668,03 €", "0 €"],
        ],
      },
    },
    {
      titre: "Comment utiliser le simulateur d'impôt sur le revenu",
      paras: [
        "Dans le champ de revenu, saisissez vos salaires annuels **avant** l'abattement de 10 %, tels qu'ils figurent sur votre fiche de paie annuelle. Choisissez ensuite votre situation (célibataire, couple à deux revenus ou couple à un revenu) et le nombre d'enfants à charge, de 0 à 5. La case de l'abattement forfaitaire de 10 % est cochée par défaut : décochez-la si vous saisissez un revenu déjà net d'abattement.",
        "Il affiche l'impôt par an et par mois, le quotient familial, les taux marginal et moyen, la décote et le détail par tranche. Il ignore les crédits et réductions d'impôt, les revenus fonciers et les plus-values : le résultat reste une estimation.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Appliquer le taux de la tranche à tout le revenu.** Chaque taux ne s'applique qu'à la part comprise dans sa tranche.",
        "**Oublier de diviser par le nombre de parts.** Sans cela, on se retrouve dans une tranche trop haute.",
        "**Appliquer le barème au revenu avant abattement.** Il faut d'abord retirer les 10 %.",
        "**Oublier de remultiplier par le nombre de parts.** L'impôt calculé sur le quotient est un impôt par part.",
        "**Ignorer la décote.** Pour un impôt faible, elle réduit nettement la facture, voire l'annule.",
      ],
      encadre:
        "Les situations de ces exemples illustrent la méthode. Votre avis d'imposition fait foi.",
    },
  ],
  calculateur: {
    href: "/simulateur-impot-revenu",
    nom: "Simulateur impôt sur le revenu",
    titre: "Calculez votre impôt sur le revenu",
    texte:
      "Saisissez vos salaires annuels, votre situation et vos enfants : le simulateur affiche l'impôt, le quotient familial, les taux marginal et moyen et le détail par tranche.",
    bouton: "Ouvrir le simulateur d'impôt sur le revenu",
  },
  faq: [
    {
      q: "Comment est calculé l'impôt sur le revenu ?",
      a: "On retire l'abattement de 10 % des salaires, on divise par le nombre de parts, on applique le barème par tranches au quotient, on remultiplie par le nombre de parts, puis on retranche la décote si l'impôt est faible.",
    },
    {
      q: "Comment calculer le quotient familial ?",
      a: "On divise le revenu net imposable par le nombre de parts. Avec 54 000 € et 3 parts, le quotient est de 18 000 €.",
    },
    {
      q: "Comment fonctionne la décote ?",
      a: "Si l'impôt brut ne dépasse pas 1 982 € (seul) ou 3 277 € (couple), on retranche un forfait de 897 € ou 1 483 €, diminué de 45,25 % de l'impôt brut. Pour un impôt brut de 506 €, l'impôt tombe à 0 €.",
    },
    {
      q: "Quelle est la différence entre taux marginal et taux moyen ?",
      a: "Le taux marginal est celui de la tranche la plus haute atteinte par le quotient. Le taux moyen est l'impôt divisé par le revenu. Avec 40 000 € de salaires pour une personne seule, le taux marginal est de 30 % et le taux moyen de 9,76 %.",
    },
    {
      q: "Quel barème s'applique en 2026 ?",
      a: "Le barème 2026 s'applique aux revenus de 2025, déclarés au printemps 2026. Ses tranches sont à 0 %, 11 %, 30 %, 41 % et 45 %, avec des seuils à 11 600 €, 29 579 €, 84 577 € et 181 917 €.",
    },
  ],
  sources: [
    {
      label: "Service-public.fr : barème de l'impôt sur le revenu",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1419",
    },
    {
      label: "impots.gouv.fr : calculer son quotient familial",
      url: "https://www.impots.gouv.fr/particulier/questions/comment-calculer-mon-quotient-familial",
    },
  ],
  datePublication: "2026-11-16",
  dateAffichee: "16 novembre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
