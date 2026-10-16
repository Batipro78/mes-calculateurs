import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Combien consomme un frigo ? Par jour, par mois, par an";
const DESCRIPTION =
  "Un frigo consomme en moyenne 332 kWh par an, soit environ 0,91 kWh par jour et 66 € par an au tarif de 0,2001 €/kWh. Pourquoi la puissance en watts trompe, et comment lire l'étiquette énergie.";

export const metadata: Metadata = {
  alternates: { canonical: "/combien-consomme-un-frigo" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "combien consomme un frigo, consommation frigo par jour, consommation frigo par mois, consommation frigo par an, consommation frigo en watt, consommation frigo kwh, consommation frigo congélateur, consommation frigo américain, coût d'un frigo",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/combien-consomme-un-frigo",
  fil: "Combien consomme un frigo",
  emoji: "🧊",
  couleur: "from-cyan-500 to-blue-600",
  h1: "Combien consomme un frigo ?",
  chapo:
    "Cet article répond à ceux qui veulent connaître le poids d'un frigo ou d'un congélateur sur leur facture d'électricité. Il donne la consommation par jour, par mois et par an, explique pourquoi la puissance en watts indiquée sur l'appareil ne permet pas de la calculer, et montre où lire la vraie valeur.",
  reponse:
    "Selon EDF, un frigo consomme en moyenne **332 kWh par an**, et un congélateur **254 kWh par an**. Pour un frigo, cela fait environ **0,91 kWh par jour**, **27,7 kWh par mois** et, au tarif Base de **0,2001 € le kWh**, environ **66 € par an**, soit **5,54 € par mois**. Un frigo américain consomme en général le double.",
  sections: [
    {
      titre: "Consommation d'un frigo par jour, par mois et par an",
      paras: [
        "Les moyennes ci-dessous sont celles que donne EDF pour un appareil branché 24 heures sur 24, toute l'année. Les coûts sont calculés avec le tarif Base du Tarif Bleu EDF, 0,2001 € TTC le kWh (grille applicable à compter du 1er août 2026). L'abonnement n'est pas compté : il se paie que le frigo soit branché ou non.",
      ],
      tableau: {
        colonnes: ["Appareil", "Par jour", "Par mois", "Par an"],
        lignes: [
          ["Frigo (moyenne)", "0,91 kWh · 0,18 €", "27,7 kWh · 5,54 €", "332,3 kWh · 66,49 €"],
          ["Congélateur (moyenne)", "0,69 kWh · 0,14 €", "21,1 kWh · 4,23 €", "253,6 kWh · 50,74 €"],
          ["Frigo américain (le double)", "1,82 kWh · 0,36 €", "55,4 kWh · 11,08 €", "664,6 kWh · 132,99 €"],
        ],
      },
      suite: [
        "Ce sont des moyennes. EDF précise que la consommation varie selon le modèle, le volume, l'âge et l'état de l'appareil. Le chiffre du frigo américain est un calcul de ce site : EDF indique que sa consommation est deux fois plus élevée que celle d'un frigo classique, nous avons donc doublé la moyenne.",
      ],
      visuel: {
        fichier: "frigo-consommation-par-jour-mois-an",
        alt: "Consommation moyenne d'un frigo, d'un congélateur et d'un frigo américain avec le coût au tarif de 0,2001 euro le kWh : frigo 332,3 kWh par an soit 66,49 euros, congélateur 253,6 kWh soit 50,74 euros, frigo américain 664,6 kWh soit 132,99 euros",
        legende:
          "Moyennes EDF (frigo 332,30 kWh/an, congélateur 253,58 kWh/an, américain = 2 fois un frigo classique) multipliées par 0,2001 €/kWh (Tarif Bleu, option Base).",
      },
    },
    {
      titre: "Consommation d'un frigo en watts : pourquoi le calcul trompe",
      paras: [
        "La puissance en watts écrite sur le frigo est celle du moment où le moteur (le compresseur) tourne. Or il ne tourne pas en continu : EDF explique que le frigo alterne des périodes de fonctionnement et des périodes d'arrêt. Multiplier cette puissance par 24 heures donne donc un chiffre beaucoup trop haut.",
        "L'exemple est parlant. Avec un frigo de 150 W branché sans arrêt, la formule (150 × 24 × 365) ÷ 1 000 donne 1 314 kWh par an, soit 262,93 € : c'est quatre fois la moyenne de 332 kWh. La formule est juste, mais elle suppose que le moteur tourne jour et nuit, ce qui n'est pas le cas.",
        "Pour passer des kWh par an à une puissance moyenne, on divise par le nombre d'heures de l'année : 332,3 kWh × 1 000 ÷ 8 760 heures donnent environ **38 W** en moyenne. C'est cette puissance moyenne qu'il faut entrer dans un calculateur si vous raisonnez en watts, pas la puissance maximale.",
      ],
      encadre:
        "La meilleure valeur à utiliser est celle de l'étiquette énergie de votre appareil, qui donne la consommation à l'année en kWh. Multipliez-la par le prix du kWh de votre facture : vous obtenez le coût annuel de votre modèle précis.",
    },
    {
      titre: "Exemple chiffré : votre frigo consomme 180 kWh par an d'après l'étiquette",
      paras: [
        "Prenons un frigo récent dont l'étiquette annonce 180 kWh par an (valeur d'exemple, à remplacer par celle de votre appareil), et le tarif Base de 0,2001 € le kWh.",
      ],
      etapes: [
        "**Par jour** : 180 kWh ÷ 365 = 0,49 kWh.",
        "**Par mois** : 180 kWh ÷ 12 = 15 kWh.",
        "**Coût par an** : 180 kWh × 0,2001 € = 36,02 €.",
        "**Coût par mois** : 36,02 € ÷ 12 = 3,00 €.",
      ],
      suite: [
        "Cet appareil coûte donc deux fois moins cher à faire fonctionner que la moyenne de 66,49 € par an. Sur dix ans, l'écart avec la moyenne représente environ 305 €.",
      ],
      encadre:
        "Vous pouvez refaire ces calculs dans le [calculateur de consommation électrique](/calcul-consommation-electrique) : choisissez « Réfrigérateur », il applique une puissance moyenne de 38 W sur 24 heures, soit environ 333 kWh par an.",
    },
    {
      titre: "Lire l'étiquette énergie d'un frigo",
      paras: [
        "Pour les réfrigérateurs, l'étiquette est obligatoire, en magasin comme en ligne. D'après EDF, elle indique la classe énergétique, de A (très économe) à G (énergivore), et la consommation du frigo à l'année, en kWh.",
        "EDF recommande de comparer les modèles avec la consommation en kWh par an plutôt qu'avec la seule lettre : la performance peut varier à l'intérieur d'une même classe à cause des volumes des différents modèles. Le choix compte aussi à l’achat : d'après l'ADEME citée par EDF, un réfrigérateur de classe C permet 50 % d'économies d'énergie par rapport à un appareil de classe F.",
      ],
      liste: [
        "**Volume** : EDF conseille de 100 à 150 litres pour une personne, de 150 à 250 litres pour deux, de 250 à 350 litres pour trois et de 350 à 500 litres pour quatre et plus. Un frigo trop grand consomme pour rien.",
        "**Frigo américain** : sa consommation est deux fois plus élevée que celle d'un frigo classique, d'après EDF.",
        "**Congélateur** : un modèle armoire consomme plus qu'un modèle coffre de même volume, selon EDF.",
      ],
    },
    {
      titre: "Comment faire consommer moins un frigo",
      paras: [
        "Les conseils d'EDF sont simples et ne coûtent rien : placer le frigo loin des sources de chaleur (four, radiateur, soleil), laisser environ 10 cm à l'arrière et sur le dessus, et ne pas le surcharger.",
      ],
      liste: [
        "**Régler la température** : EDF conseille de contrôler avec un thermomètre que le frigo est à +4 °C et le congélateur à -18 °C.",
        "**Dégivrer** : le givre fait surconsommer l'appareil. EDF conseille de le faire dès que l'épaisseur dépasse 2 à 3 mm.",
        "**Contrôler les joints** : un frigo mal isolé consomme plus. Glissez une feuille de papier dans la porte : si vous la retirez facilement, le joint doit être nettoyé ou remplacé.",
        "**Dépoussiérer la grille arrière** : EDF indique que cet entretien, environ deux fois par an, évite un gaspillage pouvant aller jusqu'à 30 % de l'énergie consommée.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-consommation-electrique",
    nom: "Consommation électrique",
    titre: "Calculez le coût de votre frigo",
    texte:
      "Indiquez la puissance moyenne de votre appareil (environ 38 W pour un frigo) et les heures de fonctionnement : le calculateur donne la consommation en kWh et le coût par jour, par mois et par an, en option Base ou Heures Pleines / Heures Creuses.",
    bouton: "Ouvrir le calculateur de consommation",
  },
  faq: [
    {
      q: "Combien consomme un frigo par jour ?",
      a: "En moyenne 0,91 kWh par jour (332,3 kWh par an d'après EDF divisés par 365), soit environ 0,18 € au tarif Base de 0,2001 € le kWh. Un frigo récent peut consommer deux fois moins.",
    },
    {
      q: "Combien consomme un frigo par mois ?",
      a: "En moyenne 27,7 kWh par mois, soit environ 5,54 € au tarif Base de 0,2001 € le kWh. Un congélateur consomme en moyenne 21,1 kWh par mois, soit 4,23 €.",
    },
    {
      q: "Combien consomme un frigo par an ?",
      a: "D'après EDF, 332,30 kWh par an en moyenne pour un frigo et 253,58 kWh pour un congélateur. Au tarif de 0,2001 € le kWh, cela fait 66,49 € et 50,74 € par an.",
    },
    {
      q: "Combien consomme un frigo en watts ?",
      a: "Quand le moteur tourne, la puissance est celle indiquée sur l'appareil (par exemple 150 W), mais il s'arrête régulièrement. Sur l'année, la puissance moyenne d'un frigo qui consomme 332 kWh est d'environ 38 W.",
    },
    {
      q: "Combien consomme un frigo congélateur ?",
      a: "Nous n'avons pas de moyenne officielle pour l'appareil combiné. Regardez l'étiquette énergie : elle donne la consommation à l'année de votre modèle, frigo et congélateur compris. Comme repère, la somme des moyennes EDF d'un frigo et d'un congélateur séparés est de 586 kWh par an.",
    },
    {
      q: "Combien consomme un frigo américain ?",
      a: "EDF indique que la consommation d'un frigo américain est deux fois plus élevée que celle d'un frigo classique. En partant de la moyenne de 332 kWh, cela fait environ 665 kWh par an, soit 133 € au tarif de 0,2001 € le kWh.",
    },
    {
      q: "Un frigo consomme-t-il beaucoup d'électricité ?",
      a: "C'est souvent l'appareil qui consomme le plus dans la cuisine, parce qu'il est branché en continu, d'après EDF. Mais au prix moyen de 66 € par an, il pèse bien moins qu'un radiateur électrique ou un chauffe-eau.",
    },
  ],
  sources: [
    {
      label: "EDF : consommation d'un frigo, comment bien choisir son frigo basse consommation",
      url: "https://particulier.edf.fr/fr/accueil/guide-energie/economies-energie/comment-bien-choisir-son-frigo.html",
    },
    {
      label: "EDF : consommation électrique des appareils de cuisine",
      url: "https://particulier.edf.fr/fr/accueil/guide-energie/electricite/consommation-electrique-cuisine.html",
    },
    {
      label: "EDF : Tarif Bleu, grille de prix de l'électricité (option Base)",
      url: "https://particulier.edf.fr/fr/accueil/electricite-gaz/tarif-bleu.html",
    },
    {
      label: "ADEME : la nouvelle étiquette énergie",
      url: "https://agirpourlatransition.ademe.fr/particuliers/conso/droit-conso/nouvelle-etiquette-energie",
    },
  ],
  datePublication: "2026-10-16",
  dateAffichee: "16 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
