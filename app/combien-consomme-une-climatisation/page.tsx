import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Combien consomme une climatisation ? Par jour, par mois, par été";
const DESCRIPTION =
  "Une climatisation fixe consomme en moyenne 250 kWh par été, soit environ 50 € à 0,2001 € le kWh. Un climatiseur mobile en consomme 2,8 fois plus. Les watts, le coût par jour et par mois, et comment réduire la facture.";

export const metadata: Metadata = {
  alternates: { canonical: "/combien-consomme-une-climatisation" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "combien consomme une climatisation, consommation climatisation par jour, consommation climatisation par mois, consommation climatisation en watt, consommation clim kwh, combien consomme un climatiseur, combien consomme une clim réversible, combien consomme une climatisation mobile, coût climatisation",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,  },
};

const ARTICLE: ArticleData = {
  slug: "/combien-consomme-une-climatisation",
  fil: "Combien consomme une climatisation",
  emoji: "❄️",
  couleur: "from-sky-500 to-blue-600",
  h1: "Combien consomme une climatisation ?",
  chapo:
    "Cet article répond à ceux qui se demandent ce que la climatisation va ajouter à leur facture d'électricité. Il donne les consommations moyennes d'une clim fixe, d'une clim mobile et d'un ventilateur, explique comment passer de la puissance en watts à un coût par jour et par mois, et indique ce qui fait vraiment varier la note.",
  reponse:
    "Selon EDF, une pompe à chaleur air/air (la « clim réversible » fixe) consomme en moyenne **250 kWh par an** en mode froid, et un climatiseur mobile **710 kWh par an**, soit 2,8 fois plus. Au tarif Base de **0,2001 € le kWh**, cela fait environ **50 €** pour la clim fixe et **142 €** pour la clim mobile, contre environ **1 €** pour un ventilateur (5 kWh par an). La fourchette est large pour un appareil fixe : EDF indique de 100 à 700 kWh par an selon l'usage.",
  sections: [
    {
      titre: "Consommation d'une climatisation par an : fixe, mobile, ventilateur",
      paras: [
        "Les chiffres ci-dessous viennent d'EDF. Pour la clim fixe et la clim mobile, ce sont des moyennes du parc observées par l'enquête CONSER (EDF R&D) citée par EDF : 250 kWh par an pour une pompe à chaleur air/air en mode froid, 710 kWh par an pour un climatiseur mobile. Le ventilateur est donné à 5 kWh par an. Les coûts sont calculés avec le tarif Base du Tarif Bleu EDF, 0,2001 € TTC le kWh (grille applicable à compter du 1er août 2026). L'abonnement n'est pas compté.",
      ],
      tableau: {
        colonnes: ["Appareil", "Par an (moyenne)", "Coût par an"],
        lignes: [
          ["Ventilateur", "5 kWh", "1,00 €"],
          ["Clim fixe (pompe à chaleur air/air), mode froid", "250 kWh", "environ 50 €"],
          ["Climatiseur mobile monobloc", "710 kWh", "142,07 €"],
        ],
      },
      suite: [
        "Ce sont des moyennes. EDF précise aussi que pour un modèle fixe, la consommation varie « entre 100 et 700 kWh par an » selon l'appareil et l'usage : un salon exposé plein sud, climatisé tout l'été, sera loin d'une chambre climatisée quelques nuits. Le chiffre de 2,8 est celui d'EDF : 710 ÷ 250 donne 2,84.",
      ],
      visuel: {
        fichier: "climatisation-fixe-mobile-ventilateur-kwh-par-an",
        alt: "Consommation moyenne par an d'un ventilateur, d'une climatisation fixe et d'un climatiseur mobile avec le coût au tarif de 0,2001 euro le kWh : ventilateur 5 kWh soit 1 euro, clim fixe 250 kWh soit 50 euros, climatiseur mobile 710 kWh soit 142 euros",
        legende:
          "Moyennes EDF (ventilateur 5 kWh/an, pompe à chaleur air/air 250 kWh/an, climatiseur mobile 710 kWh/an) multipliées par 0,2001 €/kWh (Tarif Bleu, option Base).",
      },
    },
    {
      titre: "Consommation d'une clim en watts : de la puissance au coût par jour",
      paras: [
        "Sur la fiche d'une clim, la puissance annoncée est souvent la puissance de froid produite, pas l'électricité consommée. Une pompe à chaleur air/air restitue en moyenne 3 kWh de froid pour 1 kWh d'électricité, d'après EDF. Pour estimer la puissance électrique, on divise donc la puissance de froid par ce rapport (appelé EER sur les fiches techniques).",
        "Exemple avec une clim fixe de 2,5 kW de froid (environ 9 000 BTU) et un rapport de 3 : 2 500 ÷ 3 = **833 W** d'électricité quand l'appareil tourne à plein régime. Ce sont des valeurs d'exemple : prenez celles de la fiche de votre appareil.",
      ],
      etapes: [
        "**Puissance électrique** : 2 500 W de froid ÷ 3 = 833 W, soit 0,833 kW.",
        "**Par jour, pour 8 heures** : 0,833 kW × 8 h = 6,67 kWh.",
        "**Coût par jour** : 6,67 kWh × 0,2001 € = 1,33 €.",
        "**Coût pour 30 jours** : 1,33 € × 30 = 40 € environ.",
      ],
      suite: [
        "Le même calcul avec un climatiseur mobile de 2,6 kW de froid et un rapport de 2,6 (valeurs d'exemple moins favorables) donne 1 000 W, soit 8 kWh et 1,60 € pour 8 heures, et environ 48 € pour 30 jours. Les heures de marche réelles sont souvent plus basses, parce que le compresseur s'arrête quand la température demandée est atteinte : la formule donne un maximum pour la durée choisie.",
      ],
      encadre:
        "Vous pouvez refaire ces calculs avec votre appareil dans le [calculateur du coût d'une climatisation](/cout-climatisation) : entrez la puissance de froid, le rapport d'efficacité, les heures par jour et le prix du kWh de votre contrat.",
    },
    {
      titre: "Pourquoi une clim mobile coûte plus cher qu'une clim fixe",
      paras: [
        "D'après EDF, un climatiseur mobile consomme jusqu'à 2,8 fois plus d'électricité qu'une pompe à chaleur réversible fixe, pour une efficacité moindre. EDF cite une facture pouvant aller jusqu'à **130 € par mois** pour un climatiseur mobile, contre moins de 10 € pour tout l'été avec un ventilateur.",
        "EDF déconseille les monoblocs mobiles qui obligent à laisser une fenêtre ou une porte ouverte pour faire passer le tuyau d'évacuation : l'air chaud de l'extérieur revient, et l'appareil lutte contre lui. Pour EDF, la climatisation fixe est à privilégier parce qu'elle consomme 3 fois moins d'électricité.",
      ],
      encadre:
        "Un ventilateur ne refroidit pas une pièce : il réduit la sensation de chaleur, de 2 à 3 °C selon EDF. C'est suffisant par chaleur modérée, et son efficacité chute une fois atteints 30 à 35 °C.",
    },
    {
      titre: "Réglage et entretien : ce qui fait vraiment baisser la facture",
      paras: [
        "Le premier levier est la température demandée. D'après EDF, régler la climatisation sur 26 °C au lieu de 23 °C permet de diviser sa consommation d'électricité par 2,5 à Montpellier, par 3 à Lyon et par 4,2 à Paris. EDF recommande aussi de limiter l'écart entre la température intérieure et la température extérieure à 7 ou 8 °C au maximum.",
      ],
      liste: [
        "**Choisir un appareil à variation de puissance** : EDF indique qu'un appareil de classe A à compresseur modulant permet jusqu'à 30 % d'économies d'énergie, parce qu'il évite les démarrages et arrêts successifs.",
        "**Regarder l'étiquette énergie avant d'acheter** : plus l'appareil est bien classé, moins il consomme pour le même froid.",
        "**Ne refroidir que les pièces occupées** et fermer les volets le jour : chaque degré d'écart évité fait tourner l'appareil moins longtemps.",
        "**Entretenir l'appareil** : EDF rappelle que l'entretien d'une pompe à chaleur évite la surconsommation.",
      ],
    },
  ],
  calculateur: {
    href: "/cout-climatisation",
    nom: "Coût d'une climatisation",
    titre: "Calculez le coût de votre climatisation",
    texte:
      "Indiquez la puissance de froid de votre appareil, son rapport d'efficacité, le nombre d'heures par jour et le prix du kWh : le calculateur donne la consommation et le coût par jour, par mois et pour l'été.",
    bouton: "Ouvrir le calculateur de coût de climatisation",
  },
  faq: [
    {
      q: "Combien consomme une climatisation par jour ?",
      a: "Cela dépend de la puissance et des heures de marche. À titre d'exemple, une clim fixe de 2,5 kW de froid avec un rapport d'efficacité de 3 consomme 833 W quand elle tourne, soit 6,67 kWh pour 8 heures et environ 1,33 € au tarif Base de 0,2001 € le kWh.",
    },
    {
      q: "Combien consomme une climatisation par mois ?",
      a: "Avec le même exemple (8 heures par jour), environ 200 kWh pour 30 jours, soit 40 € environ. Un climatiseur mobile de 2,6 kW de froid utilisé 8 heures par jour revient à environ 48 € pour 30 jours.",
    },
    {
      q: "Combien consomme une climatisation en watts ?",
      a: "On divise la puissance de froid par le rapport d'efficacité (EER). Pour 2 500 W de froid et un rapport de 3, la clim consomme 833 W d'électricité quand elle tourne à plein régime. Elle s'arrête ou ralentit ensuite, donc la moyenne est plus basse.",
    },
    {
      q: "Combien consomme une climatisation réversible ?",
      a: "D'après EDF, une pompe à chaleur air/air consomme en moyenne 250 kWh par an en mode froid (enquête CONSER, EDF R&D), soit environ 50 € au tarif Base de 0,2001 € le kWh. EDF donne une autre moyenne de 260 kWh pour un été.",
    },
    {
      q: "Combien consomme une climatisation mobile ?",
      a: "En moyenne 710 kWh par an d'après EDF, soit environ 142 € à 0,2001 € le kWh, et jusqu'à 130 € par mois en cas d'usage intensif. Elle consomme jusqu'à 2,8 fois plus qu'une clim réversible fixe.",
    },
    {
      q: "Une clim consomme-t-elle plus qu'un ventilateur ?",
      a: "Oui, nettement. EDF donne 5 kWh par an pour un ventilateur et 100 à 700 kWh par an pour un climatiseur fixe. Le ventilateur coûte moins de 10 € pour tout l'été, mais il ne baisse pas la température de la pièce : il réduit seulement la sensation de chaleur.",
    },
    {
      q: "À quelle température régler sa climatisation pour consommer moins ?",
      a: "EDF indique que régler sur 26 °C au lieu de 23 °C divise la consommation par 2,5 à 4,2 selon la ville (2,5 à Montpellier, 3 à Lyon, 4,2 à Paris), et conseille de limiter l'écart avec l'extérieur à 7 ou 8 °C.",
    },
  ],
  sources: [
    {
      label: "EDF : ventilateur ou climatiseur, que choisir ?",
      url: "https://particulier.edf.fr/fr/accueil/guide-energie/economies-energie/ventilateur-climatiseur.html",
    },
    {
      label: "EDF : comment faire des économies d'énergie avec une climatisation réversible ?",
      url: "https://particulier.edf.fr/fr/accueil/guide-energie/electricite/choisir-climatisation-economie-energie.html",
    },
    {
      label: "EDF : chaleur estivale, toutes les solutions pour rafraîchir sa maison",
      url: "https://particulier.edf.fr/fr/accueil/guide-energie/economies-energie/rafraichir-sa-maison.html",
    },
    {
      label: "EDF : Tarif Bleu, grille de prix de l'électricité (option Base)",
      url: "https://particulier.edf.fr/fr/accueil/electricite-gaz/tarif-bleu.html",
    },
  ],
  datePublication: "2026-10-16",
  dateAffichee: "16 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
