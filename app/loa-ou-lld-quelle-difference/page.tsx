import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "LOA ou LLD : quelle différence et laquelle choisir ?";
const DESCRIPTION =
  "LOA ou LLD : la LOA permet d'acheter la voiture à la fin, pas la LLD. Différences, coût total de chaque formule avec deux exemples chiffrés, pièges et questions à se poser.";

export const metadata: Metadata = {
  alternates: { canonical: "/loa-ou-lld-quelle-difference" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "LOA ou LLD, LOA ou LLD que choisir, différence LOA LLD, LOA LLD avantages inconvénients, coût total d'une LOA, leasing voiture, option d'achat",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
    images: [{ url: "/images/loa-lld-cles-voiture.webp", width: 1200, height: 630 }],
  },
};

const ARTICLE: ArticleData = {
  slug: "/loa-ou-lld-quelle-difference",
  fil: "LOA ou LLD",
  emoji: "🚗",
  couleur: "from-sky-500 to-blue-600",
  h1: "LOA ou LLD : quelle différence et laquelle choisir ?",
  chapo:
    "Leasing, location longue durée, option d'achat : les deux formules se ressemblent, mais elles ne mènent pas au même endroit. Voici ce qui les distingue, le coût total de chacune sur deux exemples chiffrés, et la question qui permet de trancher.",
  reponse:
    "**La LOA donne la possibilité d'acheter la voiture à la fin du contrat, la LLD non.** Dans les deux cas, vous payez un loyer mensuel. Le coût total d'une LOA, si vous rachetez la voiture, est égal à **apport + loyers + option d'achat**. En LLD, c'est **apport + loyers**, puis vous rendez la voiture.",
  sections: [
    {
      titre: "Ce que sont la LOA et la LLD",
      paras: [
        "La **LOA** (location avec option d'achat, aussi appelée leasing) est une location pour une durée fixée. À la fin, vous avez la possibilité, mais pas l'obligation, d'acheter la voiture en payant l'**option d'achat**, c'est-à-dire la valeur résiduelle fixée dès le départ dans le contrat. Si vous ne la payez pas, vous rendez la voiture.",
        "La **LLD** (location longue durée) est une location sans option d'achat : à la fin, vous rendez la voiture. Selon le contrat, des services peuvent être inclus, comme l'entretien ou l'assistance.",
      ],
      visuel: {
        fichier: "loa-lld-cles-voiture",
        alt: "Clés de voiture posées sur un contrat de location imprimé, à côté d'un stylo, sur un bureau de concession ; une voiture grise neuve, floue, à l'arrière-plan.",
        legende:
          "En LOA comme en LLD, on signe un contrat de location : la différence se joue à la fin, quand on rend la voiture ou qu'on l'achète.",
      },
    },
    {
      titre: "Les différences à connaître",
      paras: [
        "Les deux formules ont un point commun important : le contrat fixe un kilométrage. Un dépassement, ou des dégâts au-delà de l'usure normale, peuvent vous être facturés à la restitution, selon le contrat. Les tarifs dépendent du contrat : renseignez-vous avant de signer.",
      ],
      liste: [
        "**Achat à la fin :** possible en LOA (en payant l'option d'achat), impossible en LLD.",
        "**Nature du contrat :** la LOA est assimilée à un crédit à la consommation ; la LLD est un contrat de location.",
        "**Rétractation :** pour une LOA, vous disposez de 14 jours à compter de l'acceptation du contrat pour vous rétracter.",
        "**Services :** en LLD, l'entretien et l'assistance peuvent être inclus, selon le contrat.",
        "**Restitution :** possible dans les deux cas. En LOA, c'est le choix de ne pas lever l'option d'achat.",
      ],
      suite: [
        "Pour les détails juridiques de votre contrat, la page de Service-public.fr citée en bas d'article fait référence. Ici, on se concentre sur le coût.",
      ],
    },
    {
      titre: "Comment on calcule le coût total",
      paras: [
        "Le calcul est le même que celui du simulateur. Il comporte trois formules :",
      ],
      liste: [
        "**LOA sans rachat :** apport + loyers. Vous rendez la voiture.",
        "**LOA avec rachat :** apport + loyers + option d'achat. Vous gardez la voiture.",
        "**LLD :** apport + loyers. Vous rendez la voiture.",
      ],
      suite: [
        "Les loyers valent le loyer mensuel multiplié par le nombre de mois. Pour connaître le **coût réel par mois**, on divise le coût total par la durée en mois. Les montants des exemples ci-dessous sont des hypothèses, choisies pour illustrer la méthode : remplacez-les par ceux de vos devis.",
      ],
    },
    {
      titre: "Exemple 1 : une voiture à 30 000 € sur 48 mois",
      paras: [
        "Vous visez une voiture à 30 000 €, avec un apport de 3 000 € et une durée de 48 mois. La LOA est proposée à 350 € par mois avec une option d'achat de 12 000 €. La LLD est proposée à 380 € par mois.",
      ],
      etapes: [
        "Loyers de la LOA : 350 € × 48 = 16 800 €.",
        "LOA sans rachat : 3 000 + 16 800 = **19 800 €**, soit 19 800 ÷ 48 = **412,50 € par mois**.",
        "LOA avec rachat : 19 800 + 12 000 = **31 800 €**, soit 31 800 ÷ 48 = **662,50 € par mois**.",
        "Loyers de la LLD : 380 € × 48 = 18 240 €. Coût total : 3 000 + 18 240 = **21 240 €**, soit 21 240 ÷ 48 = **442,50 € par mois**.",
      ],
      suite: [
        "Si vous rendez la voiture, la LOA coûte 21 240 − 19 800 = 1 440 € de moins que la LLD, mais la LLD inclut peut-être des services que la LOA n'a pas. Si vous gardez la voiture, la LOA revient à 31 800 €, soit 1 800 € de plus que le prix de la voiture (31 800 − 30 000). Pour savoir si ce surcoût se justifie, comparez-le à un achat à crédit avec le [simulateur de crédit auto](/simulateur-credit-auto).",
      ],
    },
    {
      titre: "Exemple 2 : une voiture à 32 000 € sur 36 mois, sans apport",
      paras: [
        "Autre cas : une voiture à 32 000 €, sans apport, sur 36 mois. La LOA est à 420 € par mois avec une option d'achat de 14 000 €. La LLD est à 430 € par mois.",
      ],
      etapes: [
        "Loyers de la LOA : 420 € × 36 = 15 120 €. Sans apport, la LOA sans rachat coûte **15 120 €**, soit 15 120 ÷ 36 = **420 € par mois**.",
        "LOA avec rachat : 15 120 + 14 000 = **29 120 €**, soit 29 120 ÷ 36 = **808,89 € par mois**.",
        "LLD : 430 € × 36 = **15 480 €**, soit 15 480 ÷ 36 = **430 € par mois**.",
      ],
      suite: [
        "Ici, l'écart entre la LOA sans rachat et la LLD n'est que de 15 480 − 15 120 = 360 €. Quant à la LOA avec rachat, elle revient à 29 120 €, soit 2 880 € de moins que le prix de la voiture (32 000 − 29 120). Attention : cela ne veut pas dire que la LOA est une bonne affaire. Ce prix de 32 000 € est une hypothèse, et si vous deviez emprunter pour acheter la voiture, le crédit ajouterait ses propres frais. La comparaison honnête se fait toujours avec le prix que vous paieriez vraiment.",
      ],
    },
    {
      titre: "Résumé des deux exemples",
      tableau: {
        colonnes: ["Formule", "Coût total", "Par mois (total ÷ durée)"],
        lignes: [
          ["Exemple 1 : LOA sans rachat (48 mois)", "19 800 €", "412,50 €"],
          ["Exemple 1 : LOA avec rachat", "31 800 €", "662,50 €"],
          ["Exemple 1 : LLD", "21 240 €", "442,50 €"],
          ["Exemple 2 : LOA sans rachat (36 mois)", "15 120 €", "420 €"],
          ["Exemple 2 : LOA avec rachat", "29 120 €", "808,89 €"],
          ["Exemple 2 : LLD", "15 480 €", "430 €"],
        ],
      },
    },
    {
      titre: "La vraie question : voulez-vous garder la voiture ?",
      paras: [
        "Comparer les loyers ne suffit pas, car le coût réel dépend de ce que vous faites à la fin.",
        "**Si vous voulez changer de voiture à la fin du contrat**, comparez la LOA sans rachat et la LLD : les deux se terminent par une restitution. Le calcul se résume à apport + loyers, en tenant compte des services inclus ou non dans chaque offre, comme l'entretien.",
        "**Si vous voulez garder la voiture**, la LOA avec rachat doit être comparée au prix d'achat comptant ou à crédit, et non à la LLD, qui ne permet pas l'achat. Dans l'exemple 1, la LOA avec rachat coûte 31 800 € pour une voiture à 30 000 €. À vous de voir si l'étalement des paiements vaut ces 1 800 €.",
        "Pour mesurer le budget global d'une voiture au-delà du loyer, regardez aussi le [simulateur du coût d'une voiture](/simulateur-cout-voiture) et l'article [combien coûte une voiture par mois](/combien-coute-une-voiture-par-mois). Pour estimer ce que vaudra la voiture à la fin, voyez [comment calculer la cote Argus d'une voiture](/calcul-cote-argus-voiture) : si l'option d'achat est supérieure à la valeur de revente, racheter vous coûterait plus cher que ce qu'elle vaut.",
      ],
    },
    {
      titre: "Comment utiliser le simulateur LOA / LLD",
      paras: [
        "Le simulateur propose six champs : le **prix catalogue du véhicule**, l'**apport initial**, les **kilomètres par an**, le **loyer mensuel**, la **durée** (24, 36, 48 ou 60 mois) et la **valeur résiduelle** (l'option d'achat de la LOA). Il se présente avec des valeurs d'exemple (30 000 €, 3 000 € d'apport, 350 € par mois, 48 mois, 12 000 € de valeur résiduelle) : remplacez-les par celles de vos devis.",
        "Il affiche deux cartes : le **coût de la LOA avec rachat** et le **coût de la LLD**, avec le détail apport, loyers et rachat. Un résumé donne le coût de la location sans rachat, le montant du rachat avec sa part du prix catalogue, et la différence entre la LOA rachetée et la LLD. Les montants sont arrondis à l'euro.",
        "Trois limites sont à connaître. D'abord, **il n'y a qu'un seul champ de loyer**, utilisé pour la LOA comme pour la LLD : si vos deux devis n'ont pas le même loyer, lancez le calcul deux fois, une fois avec chaque loyer, ou faites l'addition à la main comme dans les exemples. Ensuite, **le kilométrage saisi n'entre pas dans le calcul** : il ne change aucun résultat, et le prix catalogue sert seulement à afficher la part que représente le rachat. Enfin, le simulateur ne tient pas compte des frais de dossier ni des services inclus : sa comparaison est volontairement simplifiée.",
        "Le simulateur ne choisit pas à votre place : il ne prend qu'un seul loyer à la fois. Pour comparer une offre de LOA et une offre de LLD, faites une simulation pour chacune avec son propre loyer, puis comparez les deux totaux.",
      ],
    },
    {
      titre: "Pièges pratiques",
      liste: [
        "**Lire la valeur résiduelle.** C'est le prix de l'achat final, fixé au départ. Une mensualité basse peut cacher une option d'achat élevée.",
        "**Vérifier le kilométrage du contrat.** Si vous roulez plus que prévu, le dépassement peut être facturé à la restitution. Il vaut mieux choisir un kilométrage réaliste dès le début.",
        "**Garder la voiture en bon état.** Les dégâts au-delà de l'usure normale peuvent être facturés à la restitution, selon le contrat.",
        "**Comparer ce qui est inclus.** Une LLD avec entretien et assistance n'est pas comparable à une LOA sans ces services : mettez les mêmes prestations en face.",
        "**Utiliser le délai de rétractation.** Pour une LOA, vous avez 14 jours à compter de l'acceptation du contrat.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Comparer la LOA avec rachat à la LLD.** La LLD ne permet pas l'achat : la bonne comparaison est avec le prix d'achat de la voiture.",
        "**Oublier l'apport.** Il fait partie du coût total, même s'il n'est pas dans le loyer mensuel.",
        "**Oublier l'option d'achat.** Le coût total d'une LOA gardée est apport + loyers + option, pas seulement apport + loyers.",
        "**Croire que le loyer dit tout.** Le loyer le plus bas n'est pas toujours la formule la moins chère : regardez le coût total et le coût par mois.",
        "**Ne pas diviser par la durée.** Le total divisé par le nombre de mois donne le coût réel par mois, à comparer avec votre budget.",
      ],
    },
  ],
  calculateur: {
    href: "/simulateur-loa-lld",
    nom: "Simulateur LOA / LLD",
    titre: "Comparez le coût de votre LOA et de votre LLD",
    texte:
      "Saisissez le prix, l'apport, le loyer, la durée et l'option d'achat : le simulateur affiche le coût total de la LOA avec rachat, celui de la LLD et la différence.",
    bouton: "Ouvrir le simulateur LOA / LLD",
  },
  faq: [
    {
      q: "Quelle est la différence entre la LOA et la LLD ?",
      a: "La LOA permet d'acheter la voiture à la fin du contrat en payant l'option d'achat. La LLD ne le permet pas : on rend la voiture. Selon le contrat, la LLD peut inclure des services comme l'entretien ou l'assistance.",
    },
    {
      q: "Quel est le coût total d'une LOA ?",
      a: "Si vous rachetez la voiture, le coût total est égal à l'apport, plus les loyers, plus l'option d'achat. Si vous la rendez, c'est l'apport plus les loyers. Avec un apport de 3 000 €, 48 loyers de 350 € et une option de 12 000 €, par exemple, on obtient 31 800 € avec rachat et 19 800 € sans.",
    },
    {
      q: "LOA ou LLD : que choisir ?",
      a: "Tout dépend de ce que vous voulez faire à la fin. Si vous voulez garder la voiture, la LOA est la seule des deux formules qui le permet. Si vous voulez la rendre, comparez le coût total des deux et les services inclus.",
    },
    {
      q: "Peut-on se rétracter d'une LOA ?",
      a: "Oui. Pour une LOA, le consommateur dispose d'un délai de 14 jours à compter de l'acceptation du contrat pour se rétracter.",
    },
    {
      q: "Que se passe-t-il si je dépasse le kilométrage prévu ?",
      a: "Dans les deux formules, le contrat fixe un kilométrage. Un dépassement, ou des dégâts au-delà de l'usure normale, peuvent être facturés à la restitution, selon le contrat. Relisez ces clauses avant de signer.",
    },
  ],
  sources: [
    {
      label: "Service-public.fr : LOA ou LLD",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2437",
    },
  ],
  datePublication: "2026-11-20",
  dateAffichee: "20 novembre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
