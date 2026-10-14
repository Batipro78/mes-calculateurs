import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Chômage : comment est calculé le montant de l'allocation ?";
const DESCRIPTION =
  "Allocation chômage : 57 % du salaire journalier de référence ou 40,4 % + 13,18 €, minimum 32,13 € par jour, maximum 300,21 €. Durée, différés, effet des indemnités.";

export const metadata: Metadata = {
  alternates: { canonical: "/chomage-comment-est-calcule-le-montant" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "comment est calculé le montant du chômage, calcul du montant du chômage, calculer le montant du chômage, chomage quel montant du salaire, droit au chômage montant, quand est versé le chômage, chômage montant maximum, chomage montant calcul",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/chomage-comment-est-calcule-le-montant",
  fil: "Chômage : comment est calculé le montant",
  emoji: "📋",
  couleur: "from-sky-500 to-blue-600",
  h1: "Chômage : comment est calculé le montant de l'allocation ?",
  chapo:
    "Cet article s'adresse à toute personne qui perd son emploi ou prépare une rupture et veut savoir combien elle touchera. Il suit le calcul pas à pas, du salaire à l'allocation, avec les chiffres de l'Unédic (l'organisme qui gère l'assurance chômage) en vigueur au 14 octobre 2026, puis explique la durée, la date de versement et l'effet d'une indemnité de licenciement ou de congés payés.",
  reponse:
    "L'allocation chômage (l'ARE, allocation d'aide au retour à l'emploi) part de votre **salaire journalier de référence**, ou SJR : vos salaires bruts des 24 derniers mois (36 à partir de 55 ans) divisés par le nombre de jours de cette période. France Travail applique deux formules, **57 % du SJR** ou **40,4 % du SJR + 13,18 €**, et garde la plus haute. Le résultat ne peut pas passer sous **32,13 € par jour** (sauf cas très bas salaires), ni dépasser **75 % du SJR** ni **300,21 € brut par jour**. Pour 2 500 € brut par mois pendant 24 mois, cela donne environ **46,85 € par jour, soit 1 405,50 € brut pour 30 jours**. Les allocations n'ont pas été revalorisées au 1er juillet 2026.",
  sections: [
    {
      titre: "Le calcul en un coup d'œil",
      paras: [
        "Le montant se calcule en trois étapes : on additionne les salaires bruts, on les ramène à un salaire par jour (le SJR), puis on applique deux formules et on garde la plus haute. Ensuite viennent un minimum et deux plafonds. Le schéma ci-dessous suit un exemple complet, calculé avec le code du simulateur du site.",
        "L'allocation est **brute** : la CSG et la CRDS (deux prélèvements sociaux) sont retirées quand l'allocation brute atteint 61 € par jour, et une participation finance vos points de retraite complémentaire. Tous les montants de cet article sont donc des montants bruts, avant ces retenues.",
      ],
      visuel: {
        fichier: "chomage-du-salaire-a-l-allocation",
        alt: "Schéma du calcul de l'allocation chômage pour 2 500 € brut par mois pendant 24 mois : 60 000 € de salaires divisés par 730 jours donnent un salaire journalier de référence de 82,19 €. Formule 1, 57 % du SJR : 46,85 €. Formule 2, 40,4 % du SJR plus 13,18 € : 46,39 €. On garde la plus haute, 46,85 € par jour, soit 1 405,50 € par mois, dans la limite du minimum de 32,13 €, de 75 % du SJR et de 300,21 € par jour",
        legende:
          "Exemple : 2 500 € brut par mois pendant 24 mois, emploi continu, 35 ans. Formules, minimum et plafonds de l'Unédic ; calcul fait avec le simulateur du site. Montants bruts.",
      },
    },
    {
      titre: "Étape 1 : le salaire journalier de référence (SJR)",
      paras: [
        "Le salaire de référence est la somme des salaires bruts que vous avez perçus pendant la période de référence : **24 mois** avant la fin du contrat si vous avez moins de 55 ans, **36 mois** à partir de 55 ans. Les primes comptent. Les indemnités de rupture du contrat, elles, sont exclues (voir plus bas).",
        "L'allocation étant versée par jour, on divise ce total par un nombre de jours : **SJR = salaire de référence ÷ nombre de jours calendaires**. Ce nombre va du premier au dernier jour d'emploi de la période. Il compte donc aussi les jours sans contrat, mais ceux-ci sont retenus au plus à 70 % des jours travaillés. Une période complète fait au maximum 730 jours (24 mois) ou 1 095 jours (36 mois).",
        "Conséquence utile à retenir : si vous avez eu des trous entre vos contrats, le SJR baisse, car on divise le même total par plus de jours. Le simulateur du site suppose un salaire identique chaque mois et un emploi continu, avec 365 ÷ 12 = 30,4 jours par mois.",
      ],
    },
    {
      titre: "Étape 2 : les deux formules, le minimum et les plafonds",
      paras: [
        "Une fois le SJR connu, l'Unédic indique que l'allocation journalière se calcule avec deux formules, et que le résultat le plus élevé est retenu : **40,4 % du SJR + 13,18 €**, ou **57 % du SJR**. Les 13,18 € sont la partie fixe de l'allocation.",
        "Trois bornes encadrent ensuite le résultat. Il ne peut pas être inférieur à **32,13 €** par jour (l'allocation minimale), un montant non applicable en cas de travail partiel. Il ne peut jamais dépasser **75 % du SJR**. Et l'allocation est au maximum de **300,21 € brut par jour**. Quand le minimum de 32,13 € est supérieur à 75 % du SJR, c'est ce montant de 75 % du SJR qui est versé.",
        "Selon le niveau de salaire, ce n'est pas la même règle qui s'applique. Le tableau ci-dessous reprend celui de la fiche ARE de l'Unédic (montants indicatifs, plafond mis à jour : voir la note sous le tableau), pour une activité à temps plein.",
      ],
      tableau: {
        colonnes: ["Salaire mensuel brut", "Allocation par jour"],
        lignes: [
          ["Moins de 1 303,05 €", "75 % du salaire brut"],
          ["De 1 303,05 € à 1 426,72 €", "Allocation minimale : 32,13 €"],
          ["De 1 426,72 € à 2 415,01 €", "40,4 % du salaire journalier brut + 13,18 €"],
          ["De 2 415,01 € à 16 020 €", "57 % du salaire journalier brut"],
        ],
        texte: true,
      },
      suite: [
        "Le plafond de 16 020 € correspond à 4 fois le plafond mensuel de la Sécurité sociale 2026 (48 060 € par an, soit 4 005 € par mois) : c'est le plafond des contributions d'assurance chômage, et 16 020 × 12 ÷ 365 × 57 % redonne bien le maximum de 300,21 € par jour. La fiche ARE de l'Unédic affiche encore 15 700 €, valeur de 2025. Seuls les salaires soumis aux contributions d'assurance chômage sont pris en compte. Le taux de 40,4 % + partie fixe est plus favorable aux salaires modestes, celui de 57 % aux salaires moyens et élevés.",
      ],
    },
    {
      titre: "Exemple chiffré : 2 500 € brut par mois pendant 24 mois",
      paras: [
        "Prenons une personne de 35 ans qui a travaillé 24 mois sans interruption à 2 500 € brut par mois, et dont le contrat se termine par un licenciement, sans indemnité supplémentaire.",
      ],
      etapes: [
        "Salaires de la période : 2 500 € × 24 mois = **60 000 €**.",
        "Nombre de jours : 24 mois = **730 jours**.",
        "SJR : 60 000 ÷ 730 = **82,19 € par jour**.",
        "Formule 1 : 57 % × 82,19 = **46,85 €**.",
        "Formule 2 : 40,4 % × 82,19 + 13,18 = 33,21 + 13,18 = **46,39 €**.",
        "On garde la plus haute : **46,85 € par jour**.",
        "Contrôles : 46,85 € est supérieur à 32,13 €, inférieur à 75 % du SJR (61,64 €) et inférieur à 300,21 €, donc il n'est pas modifié.",
        "Montant pour un mois : l'Unédic multiplie l'allocation journalière par 30, quel que soit le mois. 46,85 × 30 = **1 405,50 € brut**.",
      ],
      suite: [
        "Pour ce salaire, l'allocation représente 56,2 % du salaire brut. Pour un salaire plus bas, la formule 2 peut gagner : à 1 800 € brut, le SJR est de 59,18 €, la formule 1 donne 33,73 €, la formule 2 donne 37,09 € et c'est elle qui est retenue (1 112,70 € brut par mois). Testez votre propre salaire dans le [simulateur de chômage](/simulateur-chomage). Si vous connaissez votre salaire net, passez d'abord par le [calculateur de salaire brut net](/salaire-brut-net).",
      ],
    },
    {
      titre: "Combien de temps est-on indemnisé ?",
      paras: [
        "La durée dépend de la période travaillée et de l'âge. On compte les jours calendaires entre le premier et le dernier jour d'emploi de la période de référence, puis on applique un **coefficient 0,75** (la durée est réduite de 25 %). La durée ne peut pas être inférieure à 182 jours (6 mois). Pour ouvrir un droit, il faut avoir travaillé au moins 130 jours ou 910 heures (environ 6 mois) sur les 24 derniers mois, ou 36 mois à partir de 55 ans.",
        "Exemple : 12 mois travaillés sans interruption font 365 jours, soit 365 × 0,75 = 274 jours, environ 9 mois d'allocation. Avec 24 mois travaillés, on arrive à 548 jours, soit 18 mois.",
      ],
      tableau: {
        colonnes: ["Âge à la fin du contrat", "Durée maximale", "En jours"],
        lignes: [
          ["Moins de 55 ans", "18 mois", "548 jours"],
          ["55 et 56 ans", "22,5 mois (27 mois en cas de formation, voir ci-dessous)", "685 jours (822 jours en cas de formation)"],
          ["57 ans et plus", "27 mois", "822 jours"],
        ],
        texte: true,
      },
      suite: [
        "**Nouveauté du 1er septembre 2026.** Si votre fin de contrat, fixée par la convention de rupture, tombe à partir du 1er septembre 2026 après une **rupture conventionnelle individuelle**, la durée maximale est de **15 mois** avant 55 ans et de **20,5 mois** à partir de 55 ans (France métropolitaine). Les 55 ans et plus peuvent demander une prolongation à France Travail. La rupture conventionnelle collective n'est pas concernée. Pour les 55 et 56 ans, la fiche ARE de l'Unédic prévoit 822 jours (27 mois) en cas de suivi d'une formation dans le cadre du contrat d'engagement ou financée par le CPF. Les durées maximales du tableau sont celles qui valent après le coefficient 0,75 ; l'Unédic prévoit aussi un complément de fin de droits en cas de conjoncture défavorable, qui n'est pas pris en compte ici.",
      ],
    },
    {
      titre: "La dégressivité : une baisse de 30 % pour les allocations élevées",
      paras: [
        "Pour les allocataires de **moins de 55 ans** dont l'allocation dépasse **92,57 € par jour**, l'allocation est réduite de 30 % à partir du 7e mois d'indemnisation, sans pouvoir tomber sous 92,57 €. L'Unédic indique que cela correspond environ à un salaire brut mensuel antérieur d'environ 4 940 €.",
        "Si la fin de contrat ou la procédure de licenciement date d'avant le 1er avril 2025, la condition d'âge est de 57 ans. Les formations suivies dans le cadre du contrat d'engagement (ou financées par le CPF, le compte personnel de formation) suspendent la période au bout de laquelle la baisse s'applique.",
        "Exemple du simulateur : pour 6 000 € brut par mois pendant 24 mois, le SJR est de 197,26 € et l'allocation de 112,44 € par jour (3 373,20 € pour 30 jours). À partir du 7e mois, 30 % de moins donnerait 78,71 € : c'est le plancher de 92,57 € qui s'applique, soit 2 777,10 € pour 30 jours.",
      ],
    },
    {
      titre: "Quand est versé le chômage ? Délai d'attente et différés",
      paras: [
        "L'indemnisation ne commence pas le lendemain de votre inscription. Un **délai d'attente de 7 jours** s'applique à compter de l'inscription comme demandeur d'emploi, sauf s'il a déjà été appliqué dans les 12 derniers mois. À ce délai peuvent s'ajouter deux **différés d'indemnisation**, que nous détaillons dans la section suivante.",
        "Ensuite, l'allocation est versée une fois par mois, « à terme échu » : celle d'un mois est réglée début du mois suivant. Elle n'est versée qu'après votre actualisation sur francetravail.fr, à faire entre le 28 du mois et le 15 du mois suivant. Depuis avril 2025, l'allocation est calculée sur 30 jours par mois, quel que soit le nombre réel de jours.",
      ],
      encadre:
        "Le simulateur du site calcule le montant et la durée, pas les différés : ajoutez-les vous-même à la date de début de votre indemnisation.",
    },
    {
      titre: "Indemnité de licenciement et congés payés : quel effet sur le chômage ?",
      paras: [
        "Ces sommes ne réduisent pas le montant journalier : elles sont **exclues du salaire de référence**, comme toutes les indemnités de rupture (indemnité de licenciement, indemnité compensatrice de préavis, indemnité compensatrice de congés payés). En revanche, elles peuvent **retarder le début** de l'indemnisation. L'Unédic précise que ces différés n'affectent pas le capital de droits : ils reportent seulement le point de départ.",
      ],
      liste: [
        "**Indemnité de licenciement : le différé spécifique.** Seule la part qui dépasse le minimum prévu par la loi compte (les indemnités dites supra-légales). Différé = indemnités supra-légales ÷ **111,8** (valeur fixée pour 2026), plafonné à **150 jours**, ou **75 jours** en cas de licenciement pour motif économique. Le minimum légal lui-même ne retarde rien. Pour le connaître, utilisez le [calculateur d'indemnité de licenciement](/indemnite-licenciement).",
        "**Congés payés non pris : le différé congés payés.** Différé = indemnité compensatrice de congés payés (ICCP) des 182 derniers jours ÷ SJR, limité à **30 jours**.",
        "**Délai d'attente : 7 jours**, une fois par période de 12 mois.",
      ],
      suite: [
        "Exemple avec le SJR de 82,19 € : un licenciement avec 3 000 € versés au-dessus du minimum légal donne 3 000 ÷ 111,8 = 26,8, soit environ 27 jours. Une indemnité de congés payés de 1 000 € donne 1 000 ÷ 82,19 = 12,2, soit environ 12 jours. Avec le délai d'attente de 7 jours, l'indemnisation commence environ 27 + 12 + 7 = 46 jours après la fin du contrat. L'Unédic arrondit les différés à la journée ; le décompte exact est fait par France Travail.",
      ],
      encadre:
        "Une indemnité de licenciement ne fait pas baisser votre allocation : elle peut seulement en retarder le début, et seulement pour la part située au-dessus du minimum légal.",
    },
    {
      titre: "Ce que le calcul ne montre pas",
      liste: [
        "**Temps partiel :** si l'horaire était inférieur à la durée légale, l'allocation est réduite par un coefficient égal aux heures travaillées divisées par les heures d'un temps plein.",
        "**Salaires variables et périodes sans salaire :** maladie, maternité, activité partielle et certaines autres périodes sont reconstituées par France Travail, ce qui évite de faire baisser le SJR.",
        "**Retenues :** CSG et CRDS dès 61 € brut par jour, et participation à la retraite complémentaire. Le montant net reçu est inférieur au montant brut calculé ici.",
        "**Démission :** une démission ordinaire n'ouvre pas de droit, sauf cas particuliers (démission légitime, projet professionnel réel et sérieux). La rupture conventionnelle ouvre droit à l'ARE.",
      ],
      suite: [
        "Pour un montant exact, France Travail calcule votre allocation à partir de l'attestation de votre employeur.",
      ],
    },
  ],
  calculateur: {
    href: "/simulateur-chomage",
    nom: "Simulateur chômage",
    titre: "Estimez votre allocation chômage",
    texte:
      "Indiquez votre salaire brut mensuel, vos mois travaillés et votre âge : le simulateur donne le SJR, les deux formules, l'allocation par jour et par mois, la durée et la dégressivité.",
    bouton: "Ouvrir le simulateur chômage",
  },
  faq: [
    {
      q: "Comment est calculé le montant du chômage ?",
      a: "On calcule le salaire journalier de référence (SJR) : salaires bruts des 24 derniers mois (36 à partir de 55 ans) divisés par le nombre de jours calendaires de la période. L'allocation par jour est la plus haute de 57 % du SJR et de 40,4 % du SJR + 13,18 €, avec un minimum de 32,13 €, un plafond de 75 % du SJR et un maximum de 300,21 € brut par jour (Unédic).",
    },
    {
      q: "Chômage : quel montant du salaire touche-t-on ?",
      a: "Pour 2 500 € brut par mois, l'allocation brute est d'environ 56 % du salaire brut (46,85 € par jour, 1 405,50 € pour 30 jours). Le taux monte avec les bas salaires, jusqu'à 75 % du SJR, et se stabilise à 57 % du SJR au-dessus d'environ 2 415 € brut par mois.",
    },
    {
      q: "Quel est le montant maximum du chômage ?",
      a: "L'allocation est au maximum de 300,21 € brut par jour (Unédic), soit 9 006,30 € brut pour 30 jours.",
    },
    {
      q: "Quel est le montant minimum du droit au chômage ?",
      a: "L'allocation minimale est de 32,13 € par jour, soit 963,90 € pour 30 jours. Elle n'est pas applicable en cas de travail partiel. Quand 75 % du SJR est inférieur à 32,13 €, c'est ce montant de 75 % du SJR qui est versé.",
    },
    {
      q: "Quand est versé le chômage ?",
      a: "Après un délai d'attente de 7 jours et d'éventuels différés, l'allocation est versée une fois par mois, à terme échu, au début du mois suivant. Il faut s'actualiser sur francetravail.fr entre le 28 du mois et le 15 du mois suivant.",
    },
    {
      q: "Combien de temps peut-on toucher le chômage ?",
      a: "La durée est de 75 % de la période travaillée, avec un maximum de 18 mois avant 55 ans, 22,5 mois à 55 et 56 ans et 27 mois à partir de 57 ans. Après une rupture conventionnelle individuelle dont la fin de contrat est à partir du 1er septembre 2026 : 15 mois avant 55 ans, 20,5 mois à partir de 55 ans.",
    },
    {
      q: "Une indemnité de licenciement réduit-elle le chômage ?",
      a: "Elle ne réduit pas le montant journalier, car elle est exclue du salaire de référence. Seule la part supérieure au minimum légal retarde le début de l'indemnisation : différé = indemnités supra-légales ÷ 111,8, limité à 150 jours (75 jours en cas de licenciement économique).",
    },
    {
      q: "Les congés payés non pris retardent-ils le chômage ?",
      a: "Oui. L'indemnité compensatrice de congés payés est divisée par le SJR pour donner un différé en jours, limité à 30 jours. Elle ne change pas le montant de l'allocation, seulement la date de début.",
    },
  ],
  sources: [
    {
      label: "Unédic : Quel sera le montant de mon allocation chômage ?",
      url: "https://www.unedic.org/l-assurance-chomage-et-vous/demandeur-d-emploi-ou-salarie/mon-indemnisation/quel-sera-le-montant-de-mon-allocation-chomage",
    },
    {
      label: "Unédic : Allocation d'aide au retour à l'emploi (ARE)",
      url: "https://www.unedic.org/la-reglementation/fiches-thematiques/allocation-d-aide-au-retour-a-l-emploi-are",
    },
    {
      label: "Unédic : Salaire de référence",
      url: "https://www.unedic.org/la-reglementation/fiches-thematiques/salaire-de-reference",
    },
    {
      label: "Unédic : Durée d'indemnisation",
      url: "https://www.unedic.org/la-reglementation/fiches-thematiques/duree-dindemnisation",
    },
    {
      label: "Unédic : Pas de revalorisation au 1er juillet 2026",
      url: "https://www.unedic.org/actualites/allocations-dassurance-chomage-pas-de-revalorisation-au-1er-juillet-2026",
    },
    {
      label: "Unédic : Ce qui change le 1er septembre 2026",
      url: "https://www.unedic.org/actualites/assurance-chomage-ce-qui-change-le-1er-septembre-2026",
    },
    {
      label: "Unédic : Rupture conventionnelle",
      url: "https://www.unedic.org/la-reglementation/fiches-thematiques/rupture-conventionnelle",
    },
    {
      label: "Unédic : Différé d'indemnisation spécifique (indemnités supra-légales)",
      url: "https://www.unedic.org/la-reglementation/fiches-thematiques/differe-dindemnisation-specifique-en-cas-dindemnites-supra-legales",
    },
    {
      label: "Unédic : Différé congés payés",
      url: "https://www.unedic.org/la-reglementation/fiches-thematiques/differe-conges-payes",
    },
    {
      label: "France Travail : Le paiement de l'allocation chômage",
      url: "https://www.francetravail.fr/candidat/vos-droits-et-demarches/vos-demarches-aupres-de-pole-emp/le-paiement-des-allocations.html",
    },
  ],
  datePublication: "2026-10-14",
  dateAffichee: "14 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
