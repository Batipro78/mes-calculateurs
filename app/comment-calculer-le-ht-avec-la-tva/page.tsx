import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer le HT à partir du TTC avec la TVA ?";
const DESCRIPTION =
  "Pour trouver le prix hors taxes, on divise le TTC par 1 + le taux. Avec 120 € TTC à 20 %, le HT est de 100 €. La formule, les taux de 20 %, 10 % et 5,5 %, et l'erreur à éviter.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-le-ht-avec-la-tva" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "comment calculer le HT, calcul HT à partir du TTC, calculer le HT avec la TVA, calcul TVA, formule TVA, enlever la TVA d'un prix, TTC en HT",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-le-ht-avec-la-tva",
  fil: "Calculer le HT avec la TVA",
  emoji: "🧾",
  couleur: "from-emerald-500 to-teal-600",
  h1: "Comment calculer le HT à partir du TTC ?",
  chapo:
    "Vous avez un prix TTC, c'est-à-dire avec la TVA, et vous voulez connaître le prix HT, hors TVA. C'est le cas sur une facture, un devis ou une étiquette. Cet article donne la formule, un exemple pas à pas avec les trois taux courants, et l'erreur qui fausse la plupart des calculs.",
  reponse:
    "Pour trouver le **HT**, on divise le **TTC** par **1 + le taux**. Avec un taux de 20 %, cela donne TTC ÷ 1,20. Ainsi, **120 € TTC** correspondent à **100 € HT**, avec **20 € de TVA**. Pour faire l'inverse, du HT au TTC, on multiplie par 1 + le taux.",
  sections: [
    {
      titre: "La formule pour trouver le HT",
      paras: [
        "Le prix TTC (toutes taxes comprises) est le prix HT (hors taxes) auquel on ajoute la TVA. Avec un taux de 20 %, le TTC vaut donc 1,20 fois le HT. Pour revenir en arrière, il suffit de diviser : **HT = TTC ÷ (1 + taux)**.",
        "Dans cette formule, le taux s'écrit en nombre décimal : 20 % devient 0,20, donc 1 + 0,20 = 1,20. Pour 10 %, on divise par 1,10 ; pour 5,5 %, on divise par 1,055.",
        "Une fois le HT trouvé, la TVA se déduit : **TVA = TTC − HT**.",
      ],
    },
    {
      titre: "Exemple pas à pas : 120 € TTC à 20 %",
      etapes: [
        "**Diviser par le coefficient** : 120 ÷ 1,20 = 100 €. C'est le prix HT.",
        "**Trouver la TVA** : 120 − 100 = 20 €.",
        "**Vérifier** : 100 × 1,20 = 120 €. On retrouve le TTC, le calcul est juste.",
      ],
    },
    {
      titre: "Le HT selon le taux de TVA",
      paras: [
        "Le taux dépend du produit ou de la prestation. Les trois taux les plus courants sont 20 % (taux normal), 10 % (taux intermédiaire) et 5,5 % (taux réduit). Le tableau ci-dessous applique chacun d'eux à un même prix de 120 € TTC.",
      ],
      tableau: {
        colonnes: ["Taux", "Coefficient", "HT pour 120 € TTC", "TVA incluse"],
        lignes: [
          ["20 % (taux normal)", "1,20", "100,00 €", "20,00 €"],
          ["10 % (taux intermédiaire)", "1,10", "109,09 €", "10,91 €"],
          ["5,5 % (taux réduit)", "1,055", "113,74 €", "6,26 €"],
        ],
      },
      suite: [
        "Le taux ne se devine pas : vérifiez celui de votre produit avant de calculer. Une erreur de taux fausse le HT autant qu'une erreur de calcul. La liste des taux par produit est sur le site du service public, cité plus bas.",
      ],
    },
    {
      titre: "L'erreur à éviter : retirer 20 % du TTC",
      paras: [
        "Beaucoup de personnes font 120 × 0,80 = 96 € pour « enlever la TVA ». Ce n'est pas le HT. Retirer 20 % du prix revient à enlever 24 €, alors que la TVA est de 20 €, car elle se calcule sur le HT et non sur le TTC.",
        "Le bon repère : à 20 %, la TVA représente **un sixième du TTC** (20 € sur 120 €). À 10 %, elle représente un onzième du TTC.",
      ],
    },
    {
      titre: "Passer du HT au TTC",
      paras: [
        "Pour l'inverse, on multiplie le HT par 1 + le taux : **TTC = HT × (1 + taux)**. Un prix de 100 € HT donne 120 € TTC à 20 %, 110 € à 10 % et 105,50 € à 5,5 %.",
      ],
      encadre:
        "Pour un calcul sans erreur, utilisez le [calculateur de TVA](/calcul-tva) : entrez le montant, choisissez le taux, et il affiche le HT, la TVA et le TTC.",
    },
  ],
  calculateur: {
    href: "/calcul-tva",
    nom: "Calculateur de TVA",
    titre: "Calculez le HT et la TVA",
    texte:
      "Entrez un montant HT ou TTC et choisissez le taux de TVA : le calculateur donne le HT, le montant de la TVA et le TTC.",
    bouton: "Ouvrir le calculateur de TVA",
  },
  faq: [
    {
      q: "Comment calculer le HT à partir du TTC ?",
      a: "On divise le TTC par 1 + le taux. Avec 20 %, on divise par 1,20. Exemple : 120 € TTC correspondent à 100 € HT.",
    },
    {
      q: "Comment enlever la TVA d'un prix ?",
      a: "En divisant le prix TTC par 1 + le taux, et non en retirant le taux du prix. Pour 120 € à 20 %, on obtient 100 €, et non 96 €.",
    },
    {
      q: "Quelle est la formule de la TVA ?",
      a: "TVA = TTC − HT, ou TVA = HT × taux. Avec 100 € HT à 20 %, la TVA est de 20 €.",
    },
    {
      q: "Quel est le taux de TVA normal en France ?",
      a: "Le taux normal est de 20 %. Il existe aussi un taux intermédiaire de 10 % et un taux réduit de 5,5 %, selon le produit ou la prestation.",
    },
  ],
  sources: [
    {
      label: "Service public (Entreprendre) : les taux de TVA de 20 %, 10 % et 5,5 %",
      url: "https://entreprendre.service-public.gouv.fr/vosdroits/F22399",
    },
  ],
  datePublication: "2026-10-18",
  dateAffichee: "18 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
