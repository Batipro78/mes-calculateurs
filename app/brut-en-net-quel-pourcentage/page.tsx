import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Brut en net : quel pourcentage enlever ? (2026)";
const DESCRIPTION =
  "Du brut au net, on retire environ 22 % (non-cadre), 25 % (cadre) ou 15 % (fonction publique). Exemple à 2 500 € brut, tableau et calcul inverse.";

export const metadata: Metadata = {
  alternates: { canonical: "/brut-en-net-quel-pourcentage" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "brut en net quel pourcentage, brut en net combien de pourcentage, salaire brut net quel pourcentage, brut en net cadre, brut en net fonction publique, net en brut",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
    images: [{ url: "/salaire-brut-net/opengraph-image.png", width: 1200, height: 630 }],
  },
};

const ARTICLE: ArticleData = {
  slug: "/brut-en-net-quel-pourcentage",
  fil: "Brut en net : quel pourcentage",
  emoji: "💰",
  couleur: "from-blue-500 to-indigo-500",
  h1: "Brut en net : quel pourcentage enlever ?",
  chapo:
    "Cet article s'adresse aux salariés et aux futurs salariés qui lisent un salaire brut dans une offre ou un contrat et veulent savoir combien ils toucheront vraiment. Il donne des ordres de grandeur, pas un montant exact.",
  reponse:
    "Pour une estimation rapide, retirez **environ 22 % du brut** pour un non-cadre du privé, **environ 25 %** pour un cadre et **environ 15 %** dans la fonction publique. Cela revient à multiplier le brut par 0,78, 0,75 ou 0,85. Ce sont des approximations : le pourcentage réel dépend de votre convention collective, de votre niveau de rémunération et de votre mutuelle. Pour 2 500 € brut par mois, on obtient environ 1 950 € net pour un non-cadre.",
  sections: [
    {
      titre: "Le pourcentage à retirer selon le statut",
      paras: [
        "Le salaire brut est le montant inscrit dans votre contrat. Le salaire net est ce qui reste après les cotisations sociales prélevées sur votre salaire. Le pourcentage d'écart n'est pas unique : il change avec le statut.",
      ],
      tableau: {
        colonnes: ["Statut", "Part retirée (indicatif)", "Coefficient brut vers net"],
        lignes: [
          ["Non-cadre du privé", "environ 22 %", "× 0,78"],
          ["Cadre du privé", "environ 25 %", "× 0,75"],
          ["Fonction publique", "environ 15 %", "× 0,85"],
        ],
      },
      encadre:
        "Ces taux sont ceux utilisés par le [calculateur brut / net](/salaire-brut-net) du site. Ils servent à estimer, pas à établir une fiche de paie.",
    },
    {
      titre: "Exemple détaillé : 2 500 € brut par mois",
      paras: ["Voici le calcul pour les trois statuts, avec les mêmes taux indicatifs."],
      etapes: [
        "**Non-cadre** : 2 500 × 22 % = 550 € de cotisations. 2 500 − 550 = **1 950 € net** par mois, soit 23 400 € sur 12 mois.",
        "**Cadre** : 2 500 × 25 % = 625 € de cotisations. 2 500 − 625 = **1 875 € net** par mois, soit 22 500 € sur 12 mois.",
        "**Fonction publique** : 2 500 × 15 % = 375 € de cotisations. 2 500 − 375 = **2 125 € net** par mois, soit 25 500 € sur 12 mois.",
      ],
    },
    {
      titre: "Quelques bruts courants convertis en net",
      paras: [
        "Le tableau applique les mêmes coefficients à des bruts mensuels fréquents. Ce sont des estimations, avant impôt.",
      ],
      tableau: {
        colonnes: ["Brut mensuel", "Net non-cadre", "Net cadre", "Net fonction publique"],
        lignes: [
          ["1 800 €", "1 404 €", "1 350 €", "1 530 €"],
          ["2 000 €", "1 560 €", "1 500 €", "1 700 €"],
          ["2 500 €", "1 950 €", "1 875 €", "2 125 €"],
          ["3 000 €", "2 340 €", "2 250 €", "2 550 €"],
          ["4 000 €", "3 120 €", "3 000 €", "3 400 €"],
        ],
      },
    },
    {
      titre: "Ce qui compose l'écart entre brut et net",
      paras: [
        "Les cotisations salariales sont déduites du salaire brut. Elles regroupent plusieurs familles. D'après la fiche de Service-Public.fr sur les cotisations salariales, on y trouve notamment l'assurance vieillesse, la CSG (contribution sociale généralisée), la CRDS (contribution au remboursement de la dette sociale) et les cotisations de retraite complémentaire Agirc-Arrco.",
        "Le taux total varie selon la convention collective, le niveau de salaire et les dispositifs de l'entreprise, comme la mutuelle. C'est pourquoi 22 % ou 25 % restent des repères, et non des taux légaux uniques.",
      ],
    },
    {
      titre: "Net avant impôt et net après prélèvement à la source",
      paras: [
        "La fiche de paie distingue le « net à payer avant impôt sur le revenu » et l'impôt prélevé à la source, qui apparaît sur une ligne à part. Les pourcentages de cet article donnent le net **avant impôt**.",
        "Ce que vous recevez réellement sur votre compte est donc plus bas si votre foyer est soumis au prélèvement à la source. Son taux dépend de votre situation : pour l'évaluer, utilisez le [simulateur d'impôt sur le revenu](/simulateur-impot-revenu).",
      ],
    },
    {
      titre: "Du net vers le brut : le chemin inverse",
      paras: [
        "Pour retrouver le brut à partir d'un net, on divise au lieu de multiplier : par 0,78 (non-cadre), 0,75 (cadre) ou 0,85 (fonction publique).",
      ],
      etapes: [
        "Pour 2 000 € net : 2 000 ÷ 0,78 ≈ **2 564 € brut** (non-cadre), 2 000 ÷ 0,75 ≈ **2 667 € brut** (cadre), 2 000 ÷ 0,85 ≈ **2 353 € brut** (fonction publique).",
        "Pour 2 500 € net : 2 500 ÷ 0,78 ≈ **3 205 € brut** (non-cadre), 2 500 ÷ 0,75 ≈ **3 333 € brut** (cadre), 2 500 ÷ 0,85 ≈ **2 941 € brut** (fonction publique).",
        "N'ajoutez pas 22 % au net pour trouver le brut : 2 000 × 1,22 = 2 440 €, alors que le bon calcul donne environ 2 564 €. Les 22 % s'appliquent au brut, pas au net.",
      ],
      encadre:
        "Si votre salaire est annuel, divisez d'abord par 12 : 30 000 € brut par an font 2 500 € brut par mois, soit environ 1 950 € net par mois pour un non-cadre. Pour un salaire d'alternant, voir le [simulateur de salaire alternant](/simulateur-salaire-alternant).",
    },
  ],
  calculateur: {
    href: "/salaire-brut-net",
    nom: "Salaire brut / net",
    titre: "Convertissez votre salaire brut en net",
    texte:
      "Indiquez votre montant, votre statut et la période (mensuelle ou annuelle) : le calculateur convertit dans les deux sens, du brut vers le net et du net vers le brut.",
    bouton: "Ouvrir le calculateur brut / net",
  },
  faq: [
    {
      q: "Quel salaire net pour 2 000 € brut ?",
      a: "Environ 1 560 € net pour un non-cadre du privé, 1 500 € pour un cadre et 1 700 € dans la fonction publique, avant impôt. Ce sont des estimations basées sur des taux indicatifs.",
    },
    {
      q: "Quel salaire brut pour 2 000 € net ?",
      a: "Il faut diviser le net par le coefficient du statut. Cela donne environ 2 564 € brut pour un non-cadre et 2 667 € pour un cadre. Le résultat reste approximatif.",
    },
    {
      q: "Comment passer d'un brut annuel à un net mensuel ?",
      a: "Divisez le brut annuel par 12, puis appliquez le coefficient de votre statut. Avec 30 000 € brut par an, on obtient 2 500 € brut par mois, soit environ 1 950 € net par mois pour un non-cadre.",
    },
    {
      q: "Quelle est la différence entre salaire brut et net ?",
      a: "Le brut est le montant avant cotisations salariales, le net est celui qui reste après. Un salarié soumis au prélèvement à la source verra en plus l'impôt retiré sur sa fiche de paie. Cet impôt n'est pas une cotisation sociale.",
    },
    {
      q: "Le net est-il plus faible pour un cadre ?",
      a: "À brut égal, oui, avec les taux indicatifs du site : 25 % retirés contre 22 % pour un non-cadre. L'écart réel dépend de la convention collective et des contrats souscrits par l'entreprise.",
    },
  ],
  sources: [
    {
      label: "Service-Public.fr : cotisations salariales",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2302",
    },
    {
      label: "Service-Public.fr : bulletin de paie",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F559",
    },
  ],
  datePublication: "2026-09-30",
  dateAffichee: "30 septembre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
