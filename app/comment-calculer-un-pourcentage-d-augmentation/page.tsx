import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer un pourcentage (augmentation, remise) ?";
const DESCRIPTION =
  "Pourcentage entre deux nombres : (arrivée − départ) ÷ départ × 100. Augmentation, réduction, prix avant remise, hausses successives et formule Excel, avec exemples.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-un-pourcentage-d-augmentation" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "comment calculer un pourcentage, calculer un pourcentage d'augmentation, comment calculer un pourcentage de réduction, pourcentage entre deux nombres, pourcentage d'une somme, formule pourcentage, calculer un pourcentage sur excel, pourcentage de diminution",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-un-pourcentage-d-augmentation",
  fil: "Calculer un pourcentage",
  emoji: "📊",
  couleur: "from-orange-500 to-amber-500",
  h1: "Comment calculer un pourcentage d'augmentation, de réduction ou d'une somme ?",
  chapo:
    "Une hausse de loyer, un article soldé, une prime sur un salaire : on a vite besoin d'un pourcentage. Cet article donne la formule, les exemples chiffrés, les pièges classiques et le calcul sous Excel.",
  reponse:
    "Pour passer de deux nombres à un pourcentage d'évolution, utilisez **(valeur d'arrivée − valeur de départ) ÷ valeur de départ × 100**. Si le résultat est positif, c'est une augmentation ; s'il est négatif, c'est une diminution. Par exemple, un loyer qui passe de 650 € à 669,50 € augmente de (669,50 − 650) ÷ 650 × 100 = 3 %. Pour trouver X % d'une somme, multipliez la somme par X puis divisez par 100.",
  sections: [
    {
      titre: "Le pourcentage entre deux nombres",
      paras: [
        "Un pourcentage compare une variation à la valeur de départ. La formule est toujours la même : **(arrivée − départ) ÷ départ × 100**. Le point important : on divise par le nombre de départ, pas par celui d'arrivée.",
        "Exemple : un salaire passe de 2 000 € à 2 150 €. La différence est de 150 €. On calcule 150 ÷ 2 000 × 100 = 7,5 %. Le salaire a augmenté de 7,5 %.",
        "Dans l'autre sens, un résultat négatif signale une baisse : un prix qui passe de 100 € à 80 € donne (80 − 100) ÷ 100 × 100 = −20 %. C'est une diminution de 20 %.",
      ],
      visuel: {
        fichier: "formule-calcul-pourcentage-augmentation",
        alt: "Trois formules de pourcentage : évolution = (arrivée − départ) ÷ départ × 100, X % d'une somme = somme × X ÷ 100, et prix avant une remise de 25 % : 60 € ÷ 0,75 = 80 €",
        legende:
          "Les trois calculs de pourcentage les plus courants, avec un exemple pour chacun.",
      },
      encadre:
        "Dans le calculateur [calcul de pourcentage](/calcul-pourcentage), le mode « Augmentation » (variation entre 2 valeurs) fait ce calcul. Il affiche aussi les baisses, avec un résultat négatif.",
    },
    {
      titre: "Calculer un pourcentage d'une somme",
      paras: [
        "Pour trouver X % d'une somme, multipliez la somme par X puis divisez par 100 : **somme × X ÷ 100**. Exemple : 20 % de 150 € = 150 × 20 ÷ 100 = 30 €.",
        "Pour appliquer une hausse, ajoutez ce montant à la somme de départ. Un loyer de 650 € augmenté de 3 % : 650 × 3 ÷ 100 = 19,50 €, donc 650 + 19,50 = 669,50 €. Le raccourci est de multiplier par 1,03 : 650 × 1,03 = 669,50 €.",
        "Pour trouver la part d'un nombre dans un total, faites l'inverse : partie ÷ total × 100. Par exemple, 30 sur 120 représente 30 ÷ 120 × 100 = 25 %.",
      ],
      encadre:
        "Le mode « X% de Y » du [calculateur de pourcentage](/calcul-pourcentage) donne le montant ; le mode « Part en % » donne la proportion.",
    },
    {
      titre: "Calculer un pourcentage de réduction",
      paras: [
        "Pour connaître le prix après une remise, retirez le montant de la remise : **prix × (1 − remise ÷ 100)**. Une remise de 25 % revient à multiplier le prix par 0,75.",
      ],
      etapes: [
        "Prenez un article à 80 € avec 25 % de remise.",
        "Calculez le montant de la remise : 80 × 25 ÷ 100 = 20 €.",
        "Retirez-le du prix : 80 − 20 = 60 €.",
        "Raccourci : 80 × 0,75 = 60 €.",
      ],
      suite: [
        "Le prix final est donc de 60 €. Le mode « Reduction » du calculateur affiche exactement ce prix et le montant économisé.",
        "Pour trouver le pourcentage de réduction quand on connaît les deux prix, utilisez la formule du début : un article passé de 80 € à 60 € a baissé de (60 − 80) ÷ 80 × 100 = −25 %.",
      ],
    },
    {
      titre: "Retrouver le prix avant la remise",
      paras: [
        "C'est le piège le plus courant. Vous voyez 60 € après 25 % de remise et vous voulez le prix de départ. Ajouter 25 % à 60 € donne 75 €, ce qui est faux : le prix de départ était 80 €.",
        "La raison : les 25 % de remise portaient sur 80 €, pas sur 60 €. Pour remonter, on divise par le coefficient : **prix après remise ÷ (1 − remise ÷ 100)**.",
      ],
      etapes: [
        "Prix après remise : 60 €. Remise : 25 %.",
        "Coefficient : 1 − 0,25 = 0,75.",
        "Prix de départ : 60 ÷ 0,75 = 80 €.",
      ],
      suite: [
        "On retrouve bien 80 €. Pour ramener 60 € à 80 €, il faut une hausse de 33,33 %, et non de 25 %. Une baisse de 25 % puis une hausse de 25 % ne s'annulent donc pas : 80 × 0,75 × 1,25 = 75 €.",
      ],
    },
    {
      titre: "Deux hausses successives ne s'additionnent pas",
      paras: [
        "Si un loyer monte de 10 % une année, puis de 10 % la suivante, la hausse totale n'est pas de 20 %. La deuxième hausse s'applique à un montant déjà augmenté.",
        "Sur 100 €, la première hausse donne 100 × 1,10 = 110 €. La seconde donne 110 × 1,10 = 121 €. La hausse totale est de 21 %, soit 1,10 × 1,10 = 1,21.",
        "Pour cumuler des variations, multipliez les coefficients. Une hausse de 20 % suivie d'une hausse de 10 % donne 1,20 × 1,10 = 1,32, soit +32 % et non +30 %. Le même raisonnement vaut pour les baisses : deux remises de 30 % puis 10 % donnent 0,70 × 0,90 = 0,63, soit une remise réelle de 37 % et non de 40 %.",
      ],
    },
    {
      titre: "Calculer un pourcentage sur Excel",
      paras: [
        "Sous Excel, on écrit la formule dans une cellule, puis on affiche le résultat en pourcentage. D'après l'aide de Microsoft, pour une part : tapez =42/50 ; le résultat obtenu est 0,84. En appliquant le format pourcentage à cette cellule, on lit 84,00 %.",
        "Pour une évolution entre deux valeurs, la formule est la même que plus haut. Microsoft donne l'exemple =(2500-2342)/2342, dont le résultat 0,06746 s'affiche 6,75 % une fois la cellule mise en pourcentage. Avec des cellules : si le départ est en A2 et l'arrivée en B2, écrivez =(B2-A2)/A2.",
        "Pour augmenter un nombre d'un pourcentage, Microsoft propose =113*(1+0,25), qui donne 141,25. Pour le diminuer, on remplace le + par un −.",
        "Pour afficher en pourcentage, sélectionnez la cellule et cliquez sur « Style de pourcentage » dans le groupe Nombre de l'onglet Accueil, ou appuyez sur Ctrl+Maj+%.",
      ],
      encadre:
        "Attention : si une cellule contient déjà le nombre 10 et que vous lui appliquez le format Pourcentage, Excel affiche 1000,00 %, car il multiplie par 100. Appliquez le format à un résultat de division (0,84), pas à un nombre déjà exprimé en pourcentage.",
    },
    {
      titre: "Les erreurs fréquentes",
      liste: [
        "**Diviser par le mauvais nombre.** On divise toujours par la valeur de départ. De 80 à 100, la hausse est de 25 % (20 ÷ 80), alors que de 100 à 80 la baisse est de 20 % (20 ÷ 100).",
        "**Additionner des pourcentages successifs.** +10 % puis +10 % font +21 %, pas +20 %.",
        "**Rajouter la remise au prix soldé.** Pour retrouver le prix initial, divisez par le coefficient (60 ÷ 0,75 = 80 €), n'ajoutez pas 25 %.",
        "**Oublier de diviser par 100.** 20 % s'écrit 0,20 dans un calcul : 150 × 0,20 = 30.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-pourcentage",
    nom: "Calcul Pourcentage",
    titre: "Faites le calcul de pourcentage en quelques secondes",
    texte:
      "Quatre modes : X % de Y, augmentation ou diminution entre deux valeurs, réduction (prix après remise) et part en pourcentage. Saisissez vos nombres, le résultat s'affiche tout de suite.",
    bouton: "Ouvrir le calculateur de pourcentage",
  },
  faq: [
    {
      q: "Comment calculer un pourcentage entre deux nombres ?",
      a: "Soustrayez le nombre de départ du nombre d'arrivée, divisez par le nombre de départ, puis multipliez par 100. De 80 à 100, on obtient (100 − 80) ÷ 80 × 100 = 25 %. Si le résultat est négatif, c'est une diminution.",
    },
    {
      q: "Comment calculer un pourcentage d'une somme ?",
      a: "Multipliez la somme par le pourcentage puis divisez par 100. Par exemple, 20 % de 150 € font 150 × 20 ÷ 100 = 30 €.",
    },
    {
      q: "Comment calculer un pourcentage de réduction ?",
      a: "Multipliez le prix par (1 − remise ÷ 100). Pour 80 € avec 25 % de remise, 80 × 0,75 = 60 €. Si vous connaissez les deux prix, utilisez (nouveau prix − ancien prix) ÷ ancien prix × 100.",
    },
    {
      q: "Quelle formule utiliser pour calculer un pourcentage sur Excel ?",
      a: "Pour une part, tapez par exemple =42/50 puis appliquez le format pourcentage : 84,00 %. Pour une évolution, tapez =(B2-A2)/A2 avec le départ en A2 et l'arrivée en B2, puis appliquez le même format.",
    },
    {
      q: "Une hausse de 20 % puis une baisse de 20 % ramènent-elles au prix de départ ?",
      a: "Non. Sur 100 €, +20 % donne 120 €, puis −20 % donne 96 €. On multiplie les coefficients : 1,20 × 0,80 = 0,96, soit −4 % au total.",
    },
  ],
  sources: [
    {
      label: "Microsoft Support : Calculer des pourcentages",
      url: "https://support.microsoft.com/fr-fr/excel/calculate-percentages",
    },
    {
      label: "Microsoft Support : Mettre en forme les nombres sous forme de pourcentages dans Excel",
      url: "https://support.microsoft.com/fr-fr/excel/format-numbers-as-percentages-in-excel",
    },
  ],
  datePublication: "2026-10-03",
  dateAffichee: "3 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
