import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer ses heures de travail et ses heures supplémentaires ?";
const DESCRIPTION =
  "Durée d'une journée avec pause, total de la semaine, heures supplémentaires au-delà de 35 h, majoration de 25 % et 50 % : méthode pas à pas, exemples chiffrés et calcul à la main.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-ses-heures-de-travail" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "calcul heures travaillées semaine, calculer ses heures avec pause, calcul heures supplémentaires 25 %, combien d'heures sup au-delà de 35 h, calcul heures de travail",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-ses-heures-de-travail",
  fil: "Heures de travail",
  emoji: "⏱️",
  couleur: "from-amber-500 to-orange-600",
  h1: "Comment calculer ses heures de travail et ses heures supplémentaires ?",
  chapo:
    "Savoir combien d'heures vous avez réellement travaillées, c'est vérifier votre fiche de paie et connaître vos droits. Voici la méthode pour une journée, une semaine et les heures supplémentaires, avec des exemples chiffrés à reproduire.",
  reponse:
    "**Durée d'une journée = heure de fin − heure de début − pause.** On additionne ensuite les journées de la semaine. Pour un temps plein, les heures faites **au-delà de 35 h par semaine** sont des heures supplémentaires, majorées de **25 %** pour les 8 premières (de la 36e à la 43e heure), puis de **50 %** à partir de la 44e, à défaut d'accord d'entreprise ou de branche.",
  sections: [
    {
      titre: "Calculer la durée d'une journée",
      paras: [
        "La formule est simple : on prend l'heure de fin, on retire l'heure de début, puis on retire la pause. En général, la pause déjeuner n'est pas comptée comme du temps de travail, mais votre contrat ou votre convention collective peut prévoir autre chose.",
        "Le plus sûr est de tout compter en **minutes**, puis de convertir en heures et minutes. Pour obtenir des heures décimales, on divise les minutes par 60 : 7 h 45 = 465 minutes = 7,75 h. Si vous devez convertir des heures et minutes en centièmes, voyez [comment convertir des heures en centièmes](/comment-convertir-des-heures-en-centiemes).",
      ],
    },
    {
      titre: "Exemple 1 : 9 h 00 - 17 h 30 avec 1 h de pause",
      paras: ["Vous commencez à 9 h 00, vous finissez à 17 h 30 et vous prenez 1 h de pause."],
      etapes: [
        "On convertit en minutes : 9 h 00 = 540 minutes et 17 h 30 = 1 050 minutes.",
        "On retire le début à la fin : 1 050 − 540 = 510 minutes, soit 8 h 30 de présence.",
        "On retire la pause de 60 minutes : 510 − 60 = 450 minutes, soit **7 h 30** de travail (7,5 h en décimal).",
      ],
    },
    {
      titre: "Exemple 2 : une semaine de 5 jours et ses heures supplémentaires",
      paras: [
        "Si vous faites cette même journée du lundi au vendredi, le total de la semaine est de 5 × 450 = 2 250 minutes, soit **37 h 30** (37,5 h).",
      ],
      etapes: [
        "On compare à la durée légale : 37,5 − 35 = **2,5 heures supplémentaires**, soit 2 h 30.",
        "Ces 2,5 heures sont toutes dans la tranche à 25 %, puisque la tranche à 25 % va jusqu'à 8 heures supplémentaires.",
      ],
    },
    {
      titre: "Exemple 3 : combien vous sont payées ces heures",
      paras: [
        "Avec un taux de 13 € brut de l'heure, par exemple (une hypothèse, remplacez-la par le vôtre) :",
      ],
      etapes: [
        "Les 35 premières heures : 35 × 13 = **455,00 €**.",
        "Une heure supplémentaire majorée de 25 % vaut 13 × 1,25 = **16,25 €**.",
        "Les 2,5 heures supplémentaires : 2,5 × 16,25 = **40,63 €** (40,625 arrondi).",
        "Total de la semaine : 455,00 + 40,625 = **495,63 € brut**.",
      ],
      suite: [
        "Ce sont des montants bruts, avant cotisations. Pour passer au net, utilisez le [calcul du salaire brut en net](/salaire-brut-net). Pour comprendre le « + 25 % », voyez [comment calculer un pourcentage](/comment-calculer-un-pourcentage).",
      ],
    },
    {
      titre: "Exemple 4 : une journée coupée",
      paras: [
        "Vous travaillez de 8 h 15 à 12 h 00, puis de 13 h 30 à 17 h 45. Il n'y a pas de pause à retirer : elle est déjà hors des deux plages.",
      ],
      etapes: [
        "Matin : de 8 h 15 à 12 h 00, il y a 3 h 45 (225 minutes).",
        "Après-midi : de 13 h 30 à 17 h 45, il y a 4 h 15 (255 minutes).",
        "Total : 225 + 255 = 480 minutes, soit **8 h 00**.",
      ],
      suite: [
        "Autre façon de vérifier : de 8 h 15 à 17 h 45, il y a 9 h 30 de présence (570 minutes). On retire la coupure de 1 h 30 (90 minutes) : 570 − 90 = 480 minutes, soit 8 h 00.",
      ],
    },
    {
      titre: "Exemple 5 : une semaine de 46 h, avec deux taux de majoration",
      paras: [
        "Avec 46 h dans la semaine, il y a 46 − 35 = 11 heures supplémentaires. Sans accord particulier, elles se répartissent en deux tranches. Taux de 13 € brut de l'heure, toujours en hypothèse.",
      ],
      etapes: [
        "Les 8 premières heures supplémentaires (36e à 43e heure) : 8 × 13 × 1,25 = **130,00 €**.",
        "Les 3 suivantes (à partir de la 44e) : 3 × 13 × 1,50 = **58,50 €**.",
        "Heures supplémentaires : 130,00 + 58,50 = **188,50 €**.",
        "Avec les 35 premières heures (455,00 €), la semaine vaut 455,00 + 188,50 = **643,50 € brut**.",
      ],
      suite: [
        "Le calculateur applique **un seul taux** à toutes les heures supplémentaires. Avec 25 % pour les 11 heures, il affiche 11 × 13 × 1,25 = 178,75 €, soit 633,75 € pour la semaine : 9,75 € de moins que le calcul en deux parties. Avec 50 % partout, il affiche 11 × 13 × 1,50 = 214,50 €, soit 669,50 € : 26,00 € de plus.",
        "Au-delà de 8 heures supplémentaires, faites donc le calcul en deux parties comme ci-dessus, et additionnez le résultat à vos 35 heures normales.",
      ],
    },
    {
      titre: "Exemple 6 : 37 h 45 en heures décimales",
      paras: ["Pour multiplier un taux horaire, il vaut mieux avoir des heures décimales."],
      etapes: [
        "On convertit en minutes : 37 × 60 + 45 = 2 265 minutes.",
        "On divise par 60 : 2 265 ÷ 60 = **37,75 h**.",
      ],
      suite: [
        "Retenez le raccourci : 15 minutes = 0,25 h, 30 minutes = 0,5 h et 45 minutes = 0,75 h. Ne dites pas « 37,45 » : 45 est un nombre de minutes, pas un centième d'heure.",
      ],
    },
    {
      titre: "Résumé des exemples",
      tableau: {
        colonnes: ["Situation", "Calcul", "Résultat"],
        lignes: [
          ["Journée 9 h 00 - 17 h 30, pause 1 h", "1 050 − 540 − 60 minutes", "7 h 30"],
          ["Semaine de 5 jours", "5 × 7 h 30", "37 h 30"],
          ["Heures supplémentaires", "37,5 − 35", "2,5 h"],
          ["Paiement à 13 €, + 25 %", "455 + 2,5 × 16,25", "495,63 €"],
          ["Journée coupée", "225 + 255 minutes", "8 h 00"],
          ["Semaine de 46 h, deux taux", "455 + 130 + 58,50", "643,50 €"],
          ["Semaine de 46 h, tout à 25 %", "455 + 178,75", "633,75 €"],
          ["37 h 45 en décimal", "2 265 ÷ 60", "37,75 h"],
        ],
      },
    },
    {
      titre: "Comment utiliser le calculateur d'heures de travail",
      paras: [
        "Le calculateur propose trois modes, que vous choisissez en haut : **Journée**, **Semaine** et **Heures sup**. Un champ « taux horaire brut » est commun aux trois (12 € par défaut, optionnel). Les résultats s'affichent à droite.",
        "**Mode Journée :** saisissez l'heure de début, l'heure de fin et la pause (boutons 0, 30, 45, 60 ou 90 minutes). Vous lisez les heures travaillées en heures et minutes, en heures décimales, et le salaire de la journée si un taux est saisi. Pour l'exemple de la journée coupée, saisissez 8 h 15 - 17 h 45 avec une pause de 90 minutes.",
        "**Mode Semaine :** un planning du lundi au dimanche. Par défaut, du lundi au vendredi sont cochés, de 9 h 00 à 17 h 30 avec 60 minutes de pause, ce qui correspond à l'exemple 2. Vous modifiez les horaires de chaque jour ou décochez les jours non travaillés. Vous lisez le total, la moyenne par jour, le détail jour par jour, puis la rémunération estimée de la semaine et du mois (semaine × 4,33).",
        "Dans ce mode, le calculateur ne détecte pas les heures supplémentaires : il multiplie simplement toutes les heures par le taux, sans majoration. Avec 37,5 h à 13 €, il affiche 487,50 € pour la semaine, alors que le calcul avec majoration donne 495,63 €. Pour les heures supplémentaires, passez au mode suivant.",
        "**Mode Heures sup :** saisissez les heures du contrat par semaine (35 par défaut), les heures réellement travaillées (42 par défaut), la majoration (+ 25 % ou + 50 %) et le taux horaire. Vous lisez le nombre d'heures supplémentaires, puis le détail du paiement : heures normales, heures supplémentaires, total de la semaine et total mensuel (× 4,33). Comme le taux est unique, au-delà de 8 heures supplémentaires, reportez-vous à l'exemple 5.",
        "Le calculateur ne tient pas compte des conventions collectives ni des cotisations. Pour vos congés, voyez le [calcul des congés payés](/calcul-conges-payes).",
      ],
    },
    {
      titre: "Pièges pratiques",
      liste: [
        "**Le taux de majoration.** Un accord d'entreprise ou de branche peut fixer un autre taux que 25 % et 50 %, jamais en dessous de 10 %.",
        "**Le temps partiel.** On parle alors d'heures complémentaires, avec d'autres règles que cet article ne détaille pas.",
        "**La semaine.** Les heures supplémentaires se comptent sur la semaine, pas sur la journée.",
        "**Le brut et le net.** Les taux de ces exemples sont bruts. Votre salaire net est plus bas.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Oublier de retirer la pause.** Sur 5 jours avec 1 h de pause, l'oubli ajoute 5 h à la semaine.",
        "**Appliquer 25 % à toutes les heures supplémentaires.** Au-delà de la 43e heure, la majoration est de 50 % par défaut.",
        "**Confondre 1,25 et 25.** Une heure majorée de 25 % se paie 1,25 fois le taux horaire.",
        "**Écrire 7,45 pour 7 h 45.** Une heure a 60 minutes, pas 100 : 7 h 45 vaut 7,75 h.",
      ],
      encadre:
        "Les horaires et le taux de 13 € de ces exemples sont des hypothèses pour illustrer la méthode. Remplacez-les par les vôtres et vérifiez votre contrat ou votre convention collective.",
    },
  ],
  calculateur: {
    href: "/calcul-heures-travail",
    nom: "Calcul des heures de travail",
    titre: "Calculez vos heures de travail",
    texte:
      "Choisissez le mode journée, semaine ou heures sup, saisissez vos horaires ou vos heures : le calculateur affiche le total d'heures et la rémunération estimée.",
    bouton: "Ouvrir le calculateur d'heures de travail",
  },
  faq: [
    {
      q: "Comment calculer ses heures de travail par semaine ?",
      a: "Pour chaque jour, on calcule heure de fin − heure de début − pause, puis on additionne les journées. Pour cinq jours de 7 h 30, on obtient 37 h 30.",
    },
    {
      q: "Comment calculer ses heures avec une pause ?",
      a: "On retire la durée de la pause de la durée entre l'arrivée et le départ. De 9 h 00 à 17 h 30 avec 1 h de pause, on obtient 7 h 30. En général, la pause déjeuner n'est pas comptée comme du temps de travail, mais le contrat ou la convention collective peut prévoir autre chose.",
    },
    {
      q: "Combien d'heures supplémentaires au-delà de 35 h ?",
      a: "Toutes les heures faites au-delà de 35 h dans la semaine, pour un temps plein. À 37 h 30 par semaine, il y a 2 h 30 d'heures supplémentaires.",
    },
    {
      q: "Comment calculer les heures supplémentaires à 25 % ?",
      a: "On multiplie le taux horaire par 1,25. Avec 13 € brut de l'heure, une heure supplémentaire à 25 % vaut 16,25 €. À défaut d'accord, ce taux s'applique aux 8 premières heures supplémentaires, puis la majoration passe à 50 %.",
    },
    {
      q: "Comment convertir 7 h 45 en heures décimales ?",
      a: "On convertit en minutes (7 × 60 + 45 = 465), puis on divise par 60 : 465 ÷ 60 = 7,75 h. Les 45 minutes valent 0,75 h.",
    },
  ],
  sources: [
    {
      label: "Service-public.fr : heures supplémentaires d'un salarié du privé",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2391",
    },
  ],
  datePublication: "2026-11-20",
  dateAffichee: "20 novembre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
