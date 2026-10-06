import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Plus-value immobilière : qui la calcule et quand la payer ? (2026)";
const DESCRIPTION =
  "Le notaire calcule la plus-value immobilière et paie l'impôt au moment de la vente : 19 % d'impôt sur le revenu et 17,2 % de prélèvements sociaux, après abattements. Exemple chiffré.";

export const metadata: Metadata = {
  alternates: { canonical: "/plus-value-immobiliere-qui-calcule-quand-payer" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "qui calcule la plus value immobilière, quand payer la plus value immobilière, qui paye la plus value immobilière, comment fonctionne la plus value immobilière, quelle taxe sur plus value immobilière, quel impôt sur plus value immobilière, qui est exonéré de la plus value immobilière, abattement durée de détention",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/plus-value-immobiliere-qui-calcule-quand-payer",
  fil: "Plus-value immobilière : qui calcule, quand payer",
  emoji: "🏡",
  couleur: "from-green-500 to-emerald-600",
  h1: "Qui calcule la plus-value immobilière, et quand la payer ?",
  chapo:
    "Cet article s'adresse à ceux qui vendent un bien immobilier qui n'est pas leur résidence principale : maison de famille, logement loué, résidence secondaire. Il explique qui fait le calcul, quand l'impôt est réglé, quels taux s'appliquent et qui est exonéré.",
  reponse:
    "**C'est le notaire qui calcule la plus-value et qui paie l'impôt, le jour de la vente.** Le vendeur le supporte : l'impôt est de 19 % pour l'impôt sur le revenu et de 17,2 % pour les prélèvements sociaux, calculés sur une plus-value réduite par des abattements selon la durée de détention. Exemple : un bien acheté 180 000 € et revendu 300 000 € après 16 ans donne environ 16 328 € d'impôt, soit 20,5 % de la plus-value. La résidence principale est exonérée.",
  sections: [
    {
      titre: "Qui calcule la plus-value et qui paie l'impôt ?",
      paras: [
        "La plus-value est la différence entre le prix de vente et le prix d'acquisition. Si le résultat est négatif, on parle de moins-value : il n'y a alors pas de plus-value à taxer.",
        "Quand la vente passe par un notaire, c'est lui qui s'occupe de tout. D'après Service-Public.fr, il fait les démarches auprès de l'administration fiscale, calcule la plus-value imposable et le montant de l'impôt, établit la déclaration, puis paie l'impôt auprès du service de la publicité foncière du lieu où se trouve le bien. Il utilise pour cela le formulaire 2048-IMM, que l'administration réserve aux notaires.",
        "L'impôt est dû par le vendeur : c'est lui qui le supporte. Le notaire ne fait que le calculer et le verser. Le vendeur doit ensuite indiquer sur sa déclaration de revenus le montant de la plus-value déclarée par le notaire.",
      ],
      encadre:
        "Le calcul du notaire fait foi, pas une simulation. Pour savoir à l'avance ce qu'il va retenir sur le prix de vente, utilisez le calculateur du site, puis demandez le chiffre à votre notaire avant de signer.",
    },
    {
      titre: "Quand payer la plus-value immobilière ?",
      paras: [
        "L'impôt se règle au moment de la vente, pas l'année suivante. Le BOFiP, la doctrine officielle de l'administration fiscale, indique que les plus-values sont déclarées et les impositions payées lors de la mutation, c'est-à-dire lors du transfert de propriété, et qu'aucun régime de différé de paiement n'est prévu.",
        "En pratique, le notaire doit déposer la déclaration et verser l'impôt dans le mois qui suit la date de l'acte. Prévoyez-le dans votre budget : le net que vous gardez est plus faible que le prix de vente. Cet impôt est calculé à part, au taux de 19 %, et non avec le barème du [simulateur d'impôt sur le revenu](/simulateur-impot-revenu).",
      ],
    },
    {
      titre: "Quel impôt et quels taux en 2026 ?",
      paras: [
        "Une plus-value immobilière supporte trois prélèvements, tous calculés après les abattements pour durée de détention. L'assiette, c'est-à-dire la somme sur laquelle on applique le taux, n'est pas la même pour l'impôt sur le revenu et pour les prélèvements sociaux.",
      ],
      tableau: {
        colonnes: ["Prélèvement", "Taux", "Remarque"],
        lignes: [
          ["Impôt sur le revenu", "19 %", "Taux unique, quelle que soit votre tranche d'imposition"],
          ["Prélèvements sociaux", "17,2 %", "CSG 9,2 %, CRDS 0,5 % et prélèvement de solidarité 7,5 %"],
          ["Taxe supplémentaire", "2 % à 6 %", "Seulement si la plus-value imposable dépasse 50 000 €"],
        ],
        texte: true,
      },
      suite: [
        "Sur les prélèvements sociaux, une précision utile : en 2026, le taux de CSG de 10,6 % s'applique à plusieurs revenus du patrimoine et de placement, mais Service-Public.fr maintient 9,2 % de CSG pour les plus-values immobilières, soit 17,2 % au total. C'est bien le taux utilisé par le calculateur du site.",
        "Pour l'impôt sur le revenu, Service-Public.fr donne un exemple : pour 20 000 € de plus-value imposable, l'impôt est de 3 800 €, et les prélèvements sociaux de 3 440 €, soit 7 240 € en tout.",
      ],
    },
    {
      titre: "La taxe supplémentaire au-delà de 50 000 €",
      paras: [
        "Quand la plus-value imposable dépasse 50 000 € (donc après l'abattement pour durée de détention), une taxe s'ajoute. Elle est calculée sur la totalité de la plus-value imposable, avec un taux qui monte par paliers. Dans chaque palier de 10 000 € entre deux taux, une formule de lissage évite un saut brutal. Le BOFiP donne le barème, où PV désigne la plus-value imposable.",
      ],
      tableau: {
        colonnes: ["Plus-value imposable", "Taxe"],
        lignes: [
          ["Jusqu'à 50 000 €", "Aucune"],
          ["De 60 001 à 100 000 €", "2 % de la plus-value"],
          ["De 110 001 à 150 000 €", "3 % de la plus-value"],
          ["De 160 001 à 200 000 €", "4 % de la plus-value"],
          ["De 210 001 à 250 000 €", "5 % de la plus-value"],
          ["Au-delà de 260 000 €", "6 % de la plus-value"],
        ],
      },
      suite: [
        "Exemple : pour une plus-value imposable de 70 000 €, la taxe est de 2 % × 70 000 = 1 400 €. Entre 50 001 et 60 000 €, la taxe vaut 2 % de la plus-value moins un lissage, ce qui la fait monter progressivement depuis zéro. Cette taxe ne concerne ni les ventes exonérées, ni les ventes de terrains à bâtir. Là encore, le notaire la calcule.",
      ],
    },
    {
      titre: "Comment la plus-value est-elle calculée ?",
      paras: [
        "On part du prix de vente, dont on peut déduire, sur justificatifs, les frais payés lors de la vente (par exemple les diagnostics obligatoires). On retranche ensuite le prix d'achat, majoré de deux postes, au choix du vendeur : les frais d'acquisition (les [frais de notaire](/frais-de-notaire) de l'achat en font partie) et les travaux.",
      ],
      liste: [
        "**Frais d'acquisition** (droits d'enregistrement, frais de notaire) : leur montant réel justifié, ou un forfait de 7,5 % du prix d'achat.",
        "**Travaux** : leur montant réel justifié, ou un forfait de 15 % du prix d'achat, à condition que le bien soit détenu depuis plus de 5 ans.",
        "**Abattements pour durée de détention** : ils réduisent la plus-value, séparément pour l'impôt sur le revenu et pour les prélèvements sociaux (tableau ci-dessous).",
      ],
      tableau: {
        colonnes: ["Durée de détention", "Abattement par an pour l'impôt sur le revenu", "Abattement par an pour les prélèvements sociaux"],
        lignes: [
          ["Jusqu'à 5 ans", "0 %", "0 %"],
          ["De la 6e à la 21e année", "6 %", "1,65 %"],
          ["22e année révolue", "4 %", "1,6 %"],
          ["De la 23e à la 30e année", "Exonération", "9 %"],
          ["Au-delà de 30 ans", "Exonération", "Exonération"],
        ],
        texte: true,
      },
      suite: [
        "Concrètement, après 10 ans, l'abattement est de 30 % pour l'impôt sur le revenu et de 8,25 % pour les prélèvements sociaux. Après 22 ans, il est de 100 % pour l'impôt sur le revenu et de 28 % pour les prélèvements sociaux. L'impôt sur le revenu disparaît donc au bout de 22 ans, et les prélèvements sociaux au bout de 30 ans. Cet écart explique pourquoi on peut encore payer des prélèvements sociaux sur une vente exonérée d'impôt sur le revenu.",
      ],
      visuel: {
        fichier: "plus-value-immobiliere-abattement-duree",
        alt: "Courbes de l'abattement pour durée de détention d'une plus-value immobilière : pour l'impôt sur le revenu 30 % à 10 ans, 60 % à 15 ans et 100 % à 22 ans ; pour les prélèvements sociaux 8,25 % à 10 ans, 16,5 % à 15 ans, 28 % à 22 ans et 100 % à 30 ans",
        legende:
          "Les deux abattements selon le nombre d'années de détention, avec les repères à 22 ans (fin de l'impôt sur le revenu) et à 30 ans (fin des prélèvements sociaux). Mêmes formules que le calculateur du site.",
      },
    },
    {
      titre: "Qui est exonéré de la plus-value immobilière ?",
      paras: [
        "L'exonération la plus courante concerne la résidence principale. Service-Public.fr précise que vous êtes totalement exonéré pour la vente de votre résidence principale et de ses dépendances (cave, garage, place de stationnement, cour...), et que le logement doit être votre résidence principale au moment de la vente. Les autres cas dépendent du bien ou du vendeur, et presque tous sont soumis à des conditions.",
      ],
      liste: [
        "**Bien détenu depuis plus de 22 ans** : exonération d'impôt sur le revenu. Les prélèvements sociaux disparaissent après 30 ans.",
        "**Première vente d'un logement autre que la résidence principale** : exonération si vous utilisez le prix pour acheter ou construire votre résidence principale dans un délai de 2 ans, et si vous n'avez pas été propriétaire de votre résidence principale dans les 4 années précédant la vente. Elle se demande dans l'acte de vente et ne peut servir qu'une fois.",
        "**Bien vendu 15 000 € ou moins** : exonération.",
        "**Retraité ou titulaire d'une carte mobilité inclusion invalidité**, sous conditions de ressources : pour une cession en 2026, il faut un revenu fiscal de référence qui ne dépasse pas 12 793 € pour la première part de quotient familial, avec des conditions supplémentaires que Service-Public.fr détaille.",
      ],
      encadre:
        "Cette liste n'est pas complète : d'autres exonérations existent (certaines ventes à des organismes de logement social, par exemple). Si le bien était loué, voyez aussi le [calcul des revenus fonciers](/calcul-revenus-fonciers). Parlez-en à votre notaire avant la vente, car l'exonération doit souvent être demandée dans l'acte.",
    },
    {
      titre: "Exemple chiffré : un bien acheté 180 000 € et vendu 300 000 € après 16 ans",
      paras: [
        "Voici le calcul reproduit par le calculateur du site, avec les forfaits de 7,5 % pour les frais d'acquisition et de 15 % pour les travaux, pour un bien détenu depuis 16 ans.",
      ],
      etapes: [
        "**Frais d'acquisition forfaitaires** : 180 000 × 7,5 % = 13 500 €.",
        "**Travaux forfaitaires** : 180 000 × 15 % = 27 000 €.",
        "**Prix d'acquisition corrigé** : 180 000 + 13 500 + 27 000 = 220 500 €, donc une plus-value de 300 000 − 220 500 = **79 500 €**.",
        "**Abattements après 16 ans** : (16 − 5) × 6 % = 66 % pour l'impôt sur le revenu ; 11 × 1,65 % = 18,15 % pour les prélèvements sociaux.",
        "**Plus-value imposable** : 79 500 × (1 − 66 %) = 27 030 € pour l'impôt sur le revenu ; 79 500 × (1 − 18,15 %) = 65 070,75 € pour les prélèvements sociaux.",
        "**Impôts** : 27 030 × 19 % = 5 135,70 € ; 65 070,75 × 17,2 % = 11 192,17 €.",
      ],
      suite: [
        "Total : 5 135,70 + 11 192,17 = **16 327,87 €**, soit 20,5 % de la plus-value. Il reste 283 672,13 € au vendeur sur un prix de 300 000 €. Sans aucun abattement, le même calcul aurait donné 28 779 € (36,2 % de 79 500 €) : l'effet de la durée de détention est considérable. La plus-value imposable pour l'impôt sur le revenu reste sous 50 000 €, il n'y a donc pas de taxe supplémentaire.",
      ],
      encadre:
        "Le calculateur applique par défaut les forfaits de 7,5 % et de 15 % : si vos frais et travaux réels sont plus élevés, choisissez les montants réels, avec factures à l'appui. Il ne déduit pas les frais de vente comme les diagnostics. Il donne une estimation ; le notaire fait le calcul définitif. Pour une plus-value qui dépasse 50 000 € après abattement, vérifiez aussi la taxe supplémentaire avec lui.",
    },
  ],
  calculateur: {
    href: "/calcul-plus-value-immobiliere",
    nom: "Calcul plus-value immobilière",
    titre: "Estimez l'impôt sur votre plus-value immobilière",
    texte:
      "Indiquez le prix d'achat, le prix de vente et le nombre d'années de détention : le calculateur applique les forfaits de frais et de travaux, les abattements et les taux de 19 % et 17,2 %, puis donne l'impôt et le net vendeur.",
    bouton: "Ouvrir le calculateur de plus-value immobilière",
  },
  faq: [
    {
      q: "Qui calcule la plus-value immobilière ?",
      a: "Le notaire chargé de la vente. Il calcule la plus-value imposable et l'impôt, établit la déclaration (formulaire 2048-IMM) et paie l'impôt auprès du service de la publicité foncière. Le vendeur doit ensuite reporter la plus-value déclarée par le notaire sur sa déclaration de revenus.",
    },
    {
      q: "Quand payer la plus-value immobilière ?",
      a: "Au moment de la vente. Les plus-values sont déclarées et l'impôt payé lors de la mutation, sans différé de paiement possible, d'après le BOFiP. Le notaire verse l'impôt dans le mois qui suit la date de l'acte.",
    },
    {
      q: "Qui paye la plus-value immobilière ?",
      a: "Le vendeur. Le notaire règle l'impôt à l'administration, mais c'est une dette du vendeur, qui la supporte.",
    },
    {
      q: "Quelle taxe sur la plus-value immobilière ?",
      a: "L'impôt sur le revenu à 19 % et les prélèvements sociaux à 17,2 %, calculés après les abattements pour durée de détention. Au-delà de 50 000 € de plus-value imposable, une taxe supplémentaire de 2 % à 6 % s'ajoute.",
    },
    {
      q: "Qui est exonéré de la plus-value immobilière ?",
      a: "Notamment le vendeur de sa résidence principale, celui qui vend un bien détenu depuis plus de 22 ans (pour l'impôt sur le revenu), et la vente d'un bien de 15 000 € ou moins. D'autres exonérations existent, sous conditions : première cession d'un logement autre que la résidence principale avec réemploi du prix, retraités et titulaires d'une carte mobilité inclusion invalidité sous conditions de ressources.",
    },
    {
      q: "Au bout de combien de temps n'y a-t-il plus d'impôt sur la plus-value ?",
      a: "Après plus de 22 ans de détention, la plus-value est exonérée d'impôt sur le revenu. Après plus de 30 ans, elle est aussi exonérée de prélèvements sociaux, donc totalement.",
    },
  ],
  sources: [
    {
      label: "Service-Public.fr : impôt sur le revenu, plus-value immobilière",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F10864",
    },
    {
      label: "Service-Public.fr : prélèvements sociaux sur les revenus du patrimoine (taux 2026)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2329",
    },
    {
      label: "BOFiP : taxe sur les plus-values immobilières élevées, modalités de détermination",
      url: "https://bofip.impots.gouv.fr/bofip/8597-PGP.html/identifiant=BOI-RFPI-TPVIE-20-20180824",
    },
    {
      label: "BOFiP : plus-values immobilières, obligations déclaratives et de paiement",
      url: "https://bofip.impots.gouv.fr/bofip/1568-PGP.html/identifiant=BOI-RFPI-PVI-30-40-20140224",
    },
    {
      label: "Impots.gouv.fr : formulaire 2048-IMM, cessions d'immeubles ou de droits immobiliers",
      url: "https://www.impots.gouv.fr/formulaire/2048-imm/pvi-cessions-dimmeubles-ou-de-droits-immobiliers",
    },
  ],
  datePublication: "2026-10-06",
  dateAffichee: "6 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
