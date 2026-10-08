import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer sa VMA ? (formules, tests et tableau des allures)";
const DESCRIPTION =
  "La VMA se calcule avec un test de terrain : distance du demi-Cooper (6 min) divisée par 100, du Cooper (12 min) divisée par 200, ou vitesse du dernier palier d'un test progressif. Formules, tableau des allures en % de VMA et limites des montres.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-sa-vma" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "comment calculer sa vma, calcul de la vma formule, comment connaitre sa vma, tableau de calcul vma, calcul vma 6 min, calcul du % de vma, quelle est la vma moyenne, calculer sa vma sans test, calculer sa vma a partir de la vo2max, calculer sa vma garmin, test demi cooper, test cooper, vameval",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-sa-vma",
  fil: "Comment calculer sa VMA",
  emoji: "🏃",
  couleur: "from-emerald-600 to-teal-700",
  h1: "Comment calculer sa VMA ?",
  chapo:
    "Cet article s'adresse aux coureurs, débutants ou non, qui veulent connaître leur vitesse maximale aérobie (VMA) pour caler leurs allures d'entraînement. Il donne les formules des tests de terrain, un tableau des allures en pourcentage de VMA et ce que valent les estimations des montres.",
  reponse:
    "La VMA se mesure avec un test de terrain. Au **demi-Cooper**, vous courez le plus loin possible en **6 minutes** et vous divisez la distance en mètres par **100** : 1 500 m donnent une VMA de **15 km/h**. Au **Cooper** (12 minutes), vous divisez par **200** : 2 800 m donnent **14 km/h**. Aux tests progressifs (Léger-Boucher, VAMEVAL), la VMA est la vitesse du dernier palier tenu. Ce sont des estimations : le demi-Cooper est donné à environ plus ou moins 1 km/h.",
  sections: [
    {
      titre: "C'est quoi la VMA, en une phrase ?",
      paras: [
        "La vitesse maximale aérobie (VMA) est la vitesse de course, en km/h, à laquelle le corps consomme le maximum d'oxygène dont il est capable (sa VO2max). Un document préparatoire publié sur le site de l'EMSLB (ministère des Armées) la définit ainsi : la vitesse limite, exprimée en km/h, atteinte à VO2max.",
        "On ne peut pas la tenir longtemps : le même document parle d'un « temps de soutien » de 3 à 8 minutes. C'est pour cela que les tests de terrain durent quelques minutes seulement. Connaître sa VMA sert ensuite à régler ses allures : on court à un pourcentage de cette vitesse (voir plus bas).",
      ],
    },
    {
      titre: "Les trois tests de terrain et leur formule",
      paras: [
        "Il n'existe pas une seule formule, mais trois familles de tests. Les deux premiers se font avec un chronomètre et une distance connue (piste, ou montre GPS). Le troisième demande une piste balisée et une bande sonore.",
      ],
      tableau: {
        colonnes: ["Test", "Ce qu'on fait", "Formule de la VMA", "Exemple"],
        lignes: [
          ["Demi-Cooper", "Courir la plus grande distance possible en 6 minutes", "distance (m) ÷ 100", "1 500 m → 15 km/h"],
          ["Cooper", "Courir la plus grande distance possible en 12 minutes", "distance (m) ÷ 200", "2 800 m → 14 km/h"],
          ["Léger-Boucher", "Paliers de 2 minutes, la vitesse monte de 1 km/h à chaque palier", "vitesse du dernier palier réalisé", "dernier palier à 15 km/h → 15 km/h"],
          ["VAMEVAL", "Paliers de 1 minute, départ à 8 km/h, la vitesse monte de 0,5 km/h par palier", "vitesse du dernier palier réalisé", "dernier palier à 14,5 km/h → 14,5 km/h"],
        ],
        texte: true,
      },
      suite: [
        "Ces formules ne viennent pas d'une loi de la nature : ce sont des conventions pratiques. Le demi-Cooper se justifie ainsi : 6 minutes, c'est un dixième d'heure, donc la vitesse moyenne en km/h est la distance en kilomètres multipliée par 10, ce qui revient à diviser les mètres par 100 (1,5 km en 6 minutes, c'est 15 km/h). Le Cooper dure 12 minutes, soit un cinquième d'heure : la distance en kilomètres multipliée par 5 donne la vitesse moyenne, ce qui revient à diviser les mètres par 200. Wikipédia écrit la même chose : la VMA, en km/h, est cinq fois la distance en kilomètres.",
        "Une présentation de l'AEEPS Bretagne (association d'enseignants d'EPS, 2019) classe le VAMEVAL (Cazorla, 1996) comme le test de référence, dont les résultats se rapprochent le plus des tests de laboratoire. Elle juge le Cooper et le demi-Cooper peu fiables car ce sont des estimations. Le test navette de Luc Léger, avec ses allers-retours sur 20 m, ne mesure pas la VMA à proprement parler, mais une vitesse avec changement de direction.",
      ],
      encadre:
        "Un test de VMA est un effort maximal. Si vous reprenez le sport après une longue pause ou si vous avez un problème de santé (cœur, tension, souffle), demandez l'avis de votre médecin avant de le faire.",
    },
    {
      titre: "Le demi-Cooper : le test le plus simple pour commencer",
      paras: [
        "Le demi-Cooper se fait seul, sans matériel. Après un bon échauffement, voici comment faire :",
      ],
      etapes: [
        "Choisissez un parcours plat et mesuré (une piste de 400 m, ou une route droite avec une montre GPS).",
        "Courez **6 minutes** en essayant de parcourir la plus grande distance possible, à une vitesse régulière : partir trop vite fait craquer avant la fin.",
        "Notez la distance en mètres. Exemple : **1 560 m**.",
        "Divisez par 100 : 1 560 ÷ 100 = **15,6 km/h** de VMA.",
      ],
      suite: [
        "Le document de l'EMSLB donne la marge d'erreur : 1 250 m au demi-Cooper valent 12,5 km/h de VMA, à plus ou moins 1 km/h près. Refaites le test dans les mêmes conditions (même parcours, même heure, bonne forme) pour suivre vos progrès.",
        "Le calculateur du site fait la même opération : il utilise (distance × 2) ÷ 200, ce qui revient à distance ÷ 100.",
      ],
      encadre:
        "Vous avez déjà votre distance ? Entrez-la dans le [calculateur de VMA](/calcul-vma) : il donne la VMA et les allures qui en découlent.",
    },
    {
      titre: "Le Cooper de 12 minutes, et le lien avec la VO2max",
      paras: [
        "Le Cooper (12 minutes) a d'abord été conçu pour estimer la VO2max, pas la VMA. Le médecin américain Kenneth Cooper l'a publié en 1968 (JAMA). L'équation rappelée dans une étude de l'université de Calcutta est : **VO2max (ml/kg/min) = 22,351 × distance en km − 11,288**.",
        "On peut ensuite passer de la VO2max à la VMA avec la relation de Léger et Mercier (course sur tapis) : VO2max = 3,5 × VMA, donc **VMA = VO2max ÷ 3,5**. Wikipédia précise que cette relation suppose une technique de course idéale et que la VMA réelle peut être inférieure à la prédiction.",
      ],
      etapes: [
        "Un coureur parcourt **2 800 m** en 12 minutes, soit 2,8 km.",
        "VO2max estimée : 22,351 × 2,8 − 11,288 = **51,3 ml/kg/min**.",
        "VMA correspondante : 51,3 ÷ 3,5 = **14,7 km/h**.",
      ],
      suite: [
        "Avec la règle « distance ÷ 200 », le même coureur obtient 14 km/h : les deux méthodes ne donnent pas exactement le même chiffre (14,7 contre 14). Le calculateur du site utilise la règle ÷ 200. Wikipédia rappelle que le Cooper n'est pas très précis pour mesurer la VMA ou la VO2max, notamment parce qu'il est difficile de tenir une vitesse constante pendant douze minutes.",
        "Même remarque pour la relation × 3,5 : c'est une estimation théorique. Une VMA de 15 km/h correspond à une VO2max théorique de 15 × 3,5 = 52,5 ml/kg/min. Seul un test en laboratoire avec analyse des gaz mesure réellement la VO2max.",
      ],
    },
    {
      titre: "Les tests progressifs : Léger-Boucher et VAMEVAL",
      paras: [
        "Dans un test progressif, on court sans s'arrêter à une vitesse qui augmente par paliers, jusqu'à ne plus pouvoir suivre. La VMA est la vitesse du dernier palier réalisé. Le Léger-Boucher monte de 1 km/h toutes les 2 minutes. Le VAMEVAL, plus fin, part de 8 km/h et monte de 0,5 km/h chaque minute, avec des plots tous les 20 m et un signal sonore.",
        "Wikipédia signale une variante pour le Léger-Boucher : on ajoute 0,5 km/h quand le dernier palier a été réalisé aux deux tiers. Le calculateur du site, pour le VAMEVAL, prend simplement la vitesse du dernier palier complet que vous lui donnez.",
        "Ces tests sont plus justes mais plus lourds à organiser : il faut une piste, des plots et une bande sonore. Ils conviennent bien dans un club ou avec un groupe.",
      ],
    },
    {
      titre: "Calcul du % de VMA : le tableau des allures",
      paras: [
        "Une fois la VMA connue, on la transforme en allures. La vitesse à X % de VMA est **VMA × X ÷ 100**, et l'allure en minutes par kilomètre est **60 ÷ vitesse**. Exemple : une VMA de 14 km/h à 70 % donne 9,8 km/h, soit 60 ÷ 9,8 = 6,12 min/km, c'est-à-dire **6:07 par km**.",
        "Le tableau ci-dessous est calculé de cette façon pour quatre VMA. Les pourcentages sont des repères d'entraînement (footing lent vers 60 à 70 %, travail de VMA vers 100 %), pas une norme officielle : chaque entraîneur a ses fourchettes.",
      ],
      tableau: {
        colonnes: ["% de VMA", "VMA 10 km/h", "VMA 12 km/h", "VMA 14 km/h", "VMA 16 km/h"],
        lignes: [
          ["60 %", "10:00 /km (6,0 km/h)", "8:20 /km (7,2 km/h)", "7:09 /km (8,4 km/h)", "6:15 /km (9,6 km/h)"],
          ["65 %", "9:14 /km (6,5 km/h)", "7:42 /km (7,8 km/h)", "6:36 /km (9,1 km/h)", "5:46 /km (10,4 km/h)"],
          ["70 %", "8:34 /km (7,0 km/h)", "7:09 /km (8,4 km/h)", "6:07 /km (9,8 km/h)", "5:21 /km (11,2 km/h)"],
          ["75 %", "8:00 /km (7,5 km/h)", "6:40 /km (9,0 km/h)", "5:43 /km (10,5 km/h)", "5:00 /km (12,0 km/h)"],
          ["80 %", "7:30 /km (8,0 km/h)", "6:15 /km (9,6 km/h)", "5:21 /km (11,2 km/h)", "4:41 /km (12,8 km/h)"],
          ["85 %", "7:04 /km (8,5 km/h)", "5:53 /km (10,2 km/h)", "5:03 /km (11,9 km/h)", "4:25 /km (13,6 km/h)"],
          ["90 %", "6:40 /km (9,0 km/h)", "5:33 /km (10,8 km/h)", "4:46 /km (12,6 km/h)", "4:10 /km (14,4 km/h)"],
          ["95 %", "6:19 /km (9,5 km/h)", "5:16 /km (11,4 km/h)", "4:31 /km (13,3 km/h)", "3:57 /km (15,2 km/h)"],
          ["100 %", "6:00 /km (10,0 km/h)", "5:00 /km (12,0 km/h)", "4:17 /km (14,0 km/h)", "3:45 /km (16,0 km/h)"],
        ],
        texte: true,
      },
      visuel: {
        fichier: "vma-allures-pourcentage-tableau",
        alt: "Tableau des allures en pourcentage de VMA : pour une VMA de 14 km/h, 70 % donne 9,8 km/h soit 6:07 par km, 80 % donne 5:21 par km, 100 % donne 4:17 par km ; colonnes pour des VMA de 10, 12, 14 et 16 km/h, lignes de 60 à 100 %",
        legende:
          "Vitesse = VMA × pourcentage, allure = 60 ÷ vitesse (calcul du calculateur du site). Les pourcentages sont des repères d'entraînement.",
      },
      suite: [
        "Pour passer d'une allure en min/km à une vitesse en km/h (ou l'inverse), utilisez le [convertisseur d'allure de course](/convertisseur-allure-course). Pour estimer les calories dépensées en courant, voyez le [calcul des calories du sport](/calcul-calories-sport).",
      ],
    },
    {
      titre: "Calculer sa VMA sans test, avec une montre ou à partir de la VO2max",
      paras: [
        "Sans test, nous n'avons trouvé aucune formule fiable pour deviner sa VMA (par exemple à partir de l'âge ou du poids). Si vous connaissez déjà votre VO2max (mesurée en laboratoire), vous pouvez la diviser par 3,5 pour obtenir une VMA théorique : une VO2max de 52,5 ml/kg/min donne 52,5 ÷ 3,5 = 15 km/h.",
        "Les montres GPS ne font pas un test de VMA : elles estiment la VO2max pendant vos sorties à partir de la fréquence cardiaque, de la vitesse et de la distance, avec des algorithmes que les fabricants ne publient pas. Une étude sur la Garmin Forerunner 245, chez des athlètes d'endurance, a trouvé que la montre sous-estimait la VO2max en moyenne de 4,73 puis de 4,05 ml/kg/min (deux courses successives), et d'autant plus que le sportif était entraîné. Diviser ce chiffre par 3,5 pour en tirer une VMA cumulerait donc deux estimations : un test sur parcours mesuré reste plus fiable.",
      ],
    },
    {
      titre: "Quelle est la VMA moyenne ?",
      paras: [
        "Il n'existe pas de norme officielle de VMA moyenne que nous ayons pu sourcer : elle dépend de l'âge, du sexe, de l'entraînement et du test utilisé, et les sources sérieuses ne donnent pas de moyenne nationale. Un chiffre « moyen » vu sur un site n'a donc pas de valeur officielle.",
        "À titre indicatif, le calculateur du site range des VMA de 12 à 20 km/h dans un tableau de repères (de débutant à élite). C'est un repère propre au site, pas une norme. L'essentiel est de suivre votre propre progression : refaire le même test de temps en temps, dans les mêmes conditions.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-vma",
    nom: "Calcul VMA",
    titre: "Calculez votre VMA et vos allures",
    texte:
      "Choisissez votre test (demi-Cooper, Cooper ou VAMEVAL), entrez votre résultat : le calculateur donne votre VMA en km/h, vos allures d'entraînement en min/km et vos zones de fréquence cardiaque.",
    bouton: "Ouvrir le calculateur de VMA",
  },
  faq: [
    {
      q: "Comment calculer sa VMA ?",
      a: "Avec un test de terrain. Demi-Cooper : distance parcourue en 6 minutes (en mètres) divisée par 100. Cooper : distance en 12 minutes divisée par 200. Test progressif (Léger-Boucher, VAMEVAL) : vitesse du dernier palier réalisé.",
    },
    {
      q: "Comment calculer sa VMA en 6 minutes ?",
      a: "Courez la plus grande distance possible en 6 minutes à vitesse régulière, puis divisez cette distance en mètres par 100. Par exemple, 1 500 m donnent 15 km/h. D'après l'EMSLB, le résultat est donné à environ plus ou moins 1 km/h.",
    },
    {
      q: "Comment calculer sa VMA à partir de la VO2max ?",
      a: "VMA = VO2max ÷ 3,5, avec la VO2max en ml/kg/min et la VMA en km/h. Exemple : 52,5 ÷ 3,5 = 15 km/h. C'est une relation théorique, qui suppose une technique de course idéale : la VMA réelle peut être plus basse.",
    },
    {
      q: "Comment calculer le pourcentage de VMA ?",
      a: "Vitesse = VMA × pourcentage ÷ 100, puis allure en min/km = 60 ÷ vitesse. Avec une VMA de 14 km/h, 70 % donnent 9,8 km/h, soit environ 6:07 par km.",
    },
    {
      q: "Quelle est la VMA moyenne ?",
      a: "Nous n'avons pas trouvé de norme officielle de VMA moyenne : la valeur dépend de l'âge, du sexe, de l'entraînement et du test. Mieux vaut suivre sa propre progression en refaisant le même test.",
    },
    {
      q: "Peut-on calculer sa VMA avec une montre Garmin ?",
      a: "Pas directement : les montres estiment la VO2max, pas la VMA, avec des algorithmes non publiés. Une étude sur la Garmin Forerunner 245 montre une sous-estimation moyenne d'environ 4 à 5 ml/kg/min. Un test sur parcours mesuré est plus fiable.",
    },
    {
      q: "Le test de Cooper et le demi-Cooper sont-ils précis ?",
      a: "Ce sont des estimations. Wikipédia indique que le Cooper n'est pas très précis pour mesurer la VMA, et une présentation de l'AEEPS juge Cooper et demi-Cooper peu fiables. Le VAMEVAL est présenté comme plus proche des tests de laboratoire.",
    },
    {
      q: "Faut-il un avis médical avant un test de VMA ?",
      a: "Le test est un effort maximal : si vous reprenez le sport après une longue pause ou si vous avez un problème de santé (cœur, tension, souffle), demandez l'avis de votre médecin avant de le faire.",
    },
  ],
  sources: [
    {
      label: "EMSLB (ministère des Armées) : comment se préparer au test demi-Cooper",
      url: "https://emslb.defense.gouv.fr/content/uploads/sites/16/2024/11/vma.pdf",
    },
    {
      label: "AEEPS Bretagne : « Les tests VMA et l'EPS » (2019)",
      url: "https://www.aeeps.org/file/download?fileId=6100",
    },
    {
      label: "Wikipédia : Vitesse maximale aérobie",
      url: "https://fr.wikipedia.org/wiki/Vitesse_maximale_a%C3%A9robie",
    },
    {
      label: "Wikipédia : Test de Cooper",
      url: "https://fr.wikipedia.org/wiki/Test_de_Cooper",
    },
    {
      label: "Biology of Sport (2015) : validité du test de Cooper de 12 minutes pour estimer la VO2max",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4314605/",
    },
    {
      label: "Validité des estimations de VO2max d'une montre Garmin Forerunner 245 (PMC)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12881131/",
    },
  ],
  datePublication: "2026-10-07",
  dateAffichee: "7 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
