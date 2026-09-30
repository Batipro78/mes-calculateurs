import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";
import { TRANCHES } from "../simulateur-impot-revenu/constants";

const TITRE = "Comment connaître sa tranche d'imposition ? (barème 2026)";
const DESCRIPTION =
  "Votre tranche d'imposition se lit sur le quotient familial : revenu net imposable divisé par le nombre de parts. Méthode, barème 2026 et exemples chiffrés.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-connaitre-sa-tranche-imposition" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "tranche d'imposition, comment connaître sa tranche d'imposition, quotient familial, taux marginal d'imposition, taux moyen d'imposition, barème impôt sur le revenu 2026",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
    images: [{ url: "/simulateur-impot-revenu/opengraph-image.png", width: 1200, height: 630 }],
  },
};

// Espace normale dans les milliers, pour rester cohérent avec le reste du site.
function euros(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €";
}

// Tableau construit à partir du barème du simulateur : il suit ses mises à jour.
const LIGNES_BAREME: string[][] = TRANCHES.map((t) => {
  const plage =
    t.min === 0
      ? `Jusqu'à ${euros(t.max)}`
      : t.max === Infinity
        ? `Au-delà de ${euros(t.min)}`
        : `De ${euros(t.min)} à ${euros(t.max)}`;
  return [plage, `${Math.round(t.taux * 100)} %`];
});

const ARTICLE: ArticleData = {
  slug: "/comment-connaitre-sa-tranche-imposition",
  fil: "Connaître sa tranche d'imposition",
  emoji: "🏛️",
  couleur: "from-red-500 to-rose-600",
  h1: "Comment connaître sa tranche d'imposition ?",
  chapo:
    "Cet article s'adresse aux particuliers qui veulent savoir dans quelle tranche de l'impôt sur le revenu ils se trouvent, et ce que ce chiffre change vraiment à leur impôt.",
  reponse:
    "Votre tranche se lit sur le **quotient familial** : votre revenu net imposable divisé par votre nombre de parts (1 pour un célibataire, 2 pour un couple, +0,5 pour chacun des deux premiers enfants). Ce quotient est ensuite comparé au barème, qui comporte cinq tranches : 0 %, 11 %, 30 %, 41 % et 45 %. La tranche trouvée est votre taux marginal : ce taux ne s'applique qu'à la part du quotient située dans cette tranche, jamais à tout votre revenu. Pour connaître le montant exact, utilisez le [simulateur d'impôt sur le revenu](/simulateur-impot-revenu).",
  sections: [
    {
      titre: "La tranche se lit sur le quotient familial, pas sur le revenu total",
      paras: [
        "Le quotient familial est le revenu net imposable du foyer divisé par le nombre de parts. Le nombre de parts dépend de la situation familiale : **1 part** pour un célibataire, **2 parts** pour un couple marié ou pacsé, puis **0,5 part** pour chacun des deux premiers enfants à charge et **1 part entière** à partir du troisième.",
        "C'est ce quotient, et non le revenu de tout le foyer, que l'on compare au barème. Deux foyers qui gagnent la même somme peuvent donc se trouver dans des tranches différentes selon leur composition. Le revenu net imposable est le revenu de la déclaration, après les abattements et déductions qui s'y appliquent, comme les 10 % pour frais professionnels sur les salaires.",
      ],
    },
    {
      titre: "Les cinq tranches du barème",
      paras: [
        "Voici le barème utilisé par notre simulateur pour l'impôt 2026, calculé sur les revenus de 2025. Il correspond à celui publié par service-public.gouv.fr.",
      ],
      tableau: {
        colonnes: ["Quotient familial", "Taux"],
        lignes: LIGNES_BAREME,
      },
      encadre:
        "Le barème est mis à jour chaque année. Vérifiez toujours qu'il s'agit de celui de l'année qui vous concerne.",
    },
    {
      titre: "La méthode en trois étapes",
      etapes: [
        "Repérez votre **revenu net imposable** de l'année, celui de votre déclaration de revenus.",
        "Divisez-le par votre **nombre de parts** pour obtenir le quotient familial.",
        "Cherchez ce quotient dans le tableau : la ligne correspondante est votre tranche, donc votre taux marginal.",
      ],
      suite: [
        "Si vous n'avez pas votre nombre de parts sous la main, le [simulateur d'impôt sur le revenu](/simulateur-impot-revenu) le calcule à partir de votre situation et affiche le quotient et le taux marginal. Pour partir de votre salaire brut, le [calculateur salaire brut net](/salaire-brut-net) donne d'abord le net.",
        "Attention à un réglage : le simulateur retire lui-même l'abattement de 10 % du montant saisi. Si vous entrez un revenu net imposable, déjà après abattement, comme dans les exemples ci-dessous, décochez la case « Appliquer l'abattement forfaitaire de 10 % ».",
      ],
    },
    {
      titre: "Exemple 1 : un célibataire à 35 000 € de revenu net imposable",
      etapes: [
        "Nombre de parts : 1. Quotient familial : 35 000 ÷ 1 = **35 000 €**.",
        "Ce quotient est entre 29 579 € et 84 577 € : la tranche est celle à **30 %**.",
        "Impôt brut : 0 % jusqu'à 11 600 €, 11 % sur la part de 11 600 € à 29 579 €, 30 % sur la part au-dessus de 29 579 €. Le calcul donne **3 603,99 €**.",
        "Cet impôt dépasse le seuil de 1 982 € : pas de décote. Le taux moyen est de 3 603,99 ÷ 35 000, soit **10,30 %**.",
      ],
      suite: [
        "Ce célibataire est dans la tranche à 30 %, mais il paie 10,30 % de son revenu, pas 30 %.",
      ],
    },
    {
      titre: "Exemple 2 : un couple avec deux enfants à 60 000 €",
      etapes: [
        "Nombre de parts : 2 pour le couple + 0,5 + 0,5 pour les enfants = **3 parts**. Quotient familial : 60 000 ÷ 3 = **20 000 €**.",
        "Ce quotient est entre 11 600 € et 29 579 € : la tranche est celle à **11 %**.",
        "Impôt brut : le calcul sur 20 000 € par part, multiplié par 3, donne **2 772 €**.",
        "Cet impôt est inférieur au seuil de décote des couples (3 277 €) : la décote est de 1 483 € − (2 772 € × 45,25 %), soit 228,67 €. Impôt final : **2 543,33 €**, soit un taux moyen de 4,24 %.",
      ],
      suite: [
        "Pour comparer : le même revenu de 60 000 € pour un couple sans enfant (2 parts) donne un quotient de 30 000 €, donc la tranche à 30 %. Les enfants font ici passer le foyer de 30 % à 11 %.",
      ],
    },
    {
      titre: "Tranche marginale et taux moyen : deux chiffres différents",
      paras: [
        "Le **taux marginal** est le taux de la tranche la plus haute que votre quotient atteint. Hors décote, c'est le taux appliqué à l'euro supplémentaire que vous gagnez.",
        "Le **taux moyen** est l'impôt payé divisé par le revenu. Il ne dépasse jamais le taux marginal, puisque les premières tranches sont moins taxées. C'est lui qui mesure le poids réel de l'impôt sur votre revenu.",
        "Notre simulateur affiche les deux. Pour calculer un pourcentage à la main, vous pouvez aussi passer par le [calcul de pourcentage](/calcul-pourcentage).",
      ],
    },
    {
      titre: "L'erreur fréquente : « passer dans la tranche du dessus fait perdre de l'argent »",
      paras: [
        "C'est faux. Une augmentation ne fait jamais baisser votre revenu net après impôt, parce que le taux supérieur ne s'applique qu'à la partie qui dépasse le seuil.",
        "Prenons le célibataire de l'exemple 1. Si son revenu net imposable augmente de 1 000 €, ces 1 000 € sont taxés à 30 %, soit 300 € d'impôt. Il lui reste 700 € de plus. Le reste de son revenu est taxé comme avant.",
      ],
      encadre:
        "Cette règle ne vaut que pour le barème. D'autres dispositifs, comme certaines aides sous conditions de ressources, peuvent avoir leurs propres seuils : renseignez-vous auprès de l'organisme concerné ou d'un professionnel.",
    },
  ],
  calculateur: {
    href: "/simulateur-impot-revenu",
    nom: "Simulateur impôt sur le revenu",
    titre: "Connaître votre tranche et votre impôt en quelques secondes",
    texte:
      "Entrez votre revenu, votre situation et vos enfants : le simulateur affiche le quotient familial, le taux marginal, le taux moyen et l'impôt estimé. Il applique lui-même l'abattement de 10 %, que vous pouvez décocher.",
    bouton: "Ouvrir le simulateur d'impôt",
  },
  faq: [
    {
      q: "Comment savoir sa tranche d'imposition ?",
      a: "Divisez votre revenu net imposable par votre nombre de parts, puis placez le résultat dans le barème. La ligne obtenue est votre tranche. Le simulateur du site fait ce calcul et indique aussi votre taux marginal.",
    },
    {
      q: "C'est quoi le taux marginal d'imposition ?",
      a: "C'est le taux de la tranche la plus haute atteinte par votre quotient familial. Il s'applique seulement à la part du revenu située dans cette tranche, pas à l'ensemble. Hors décote, il indique combien l'impôt augmenterait sur un euro gagné en plus.",
    },
    {
      q: "Quel est le taux moyen d'imposition ?",
      a: "C'est le rapport entre l'impôt réellement payé et votre revenu. Par exemple, un célibataire dont l'impôt brut est de 2 103,99 € pour 30 000 € de revenu a un taux moyen de 7,01 %, selon l'exemple de service-public.gouv.fr. Il ne dépasse jamais le taux marginal.",
    },
    {
      q: "Pourquoi mon taux d'imposition est à 0 ?",
      a: "Deux raisons possibles. Votre quotient familial peut être inférieur à 11 600 €, seuil de la tranche à 0 %. Ou bien la décote annule l'impôt : elle réduit l'impôt brut des foyers modestes s'il ne dépasse pas 1 982 € (célibataire) ou 3 277 € (couple).",
    },
    {
      q: "Comment fonctionnent les tranches d'imposition ?",
      a: "Le barème est progressif : chaque taux ne s'applique qu'à la part du quotient familial comprise dans sa tranche. On additionne l'impôt de chaque tranche, puis on multiplie le total par le nombre de parts. Passer dans une tranche supérieure ne taxe donc pas tout le revenu à ce taux.",
    },
  ],
  sources: [
    {
      label: "Service-public.gouv.fr : barème de l'impôt sur le revenu et quotient familial",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1419",
    },
    {
      label: "Service-public.gouv.fr : la décote de l'impôt sur le revenu",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34328",
    },
    {
      label: "Service-public.gouv.fr : le quotient familial et le nombre de parts",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2705",
    },
  ],
  datePublication: "2026-09-30",
  dateAffichee: "30 septembre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
