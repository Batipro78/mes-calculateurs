import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer sa moyenne ? (simple, coefficients, bac)";
const DESCRIPTION =
  "Moyenne simple, moyenne avec coefficients, notes sur un autre barème, piège de la moyenne de moyennes, bac général (session 2027) et seuils des mentions : la méthode et des exemples chiffrés.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-sa-moyenne" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "comment calculer sa moyenne, calcul pour faire une moyenne, calculer moyenne de moyenne, comment calculer la moyenne en maths, comment calculer sa moyenne générale, comment calculer sa moyenne sur 20, exemple de calcul de moyenne, moyenne annuelle, comment calculer sa moyenne avec coefficient, mention bac quelle moyenne",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-sa-moyenne",
  fil: "Comment calculer sa moyenne",
  emoji: "🎓",
  couleur: "from-violet-500 to-purple-600",
  h1: "Comment calculer sa moyenne ?",
  chapo:
    "Cet article s'adresse aux élèves, aux étudiants et aux parents qui veulent refaire le calcul d'une moyenne : moyenne simple, avec coefficients, sur un autre barème, moyenne de moyennes, moyenne annuelle et note du bac général. Chaque règle est donnée avec un exemple chiffré.",
  reponse:
    "Pour une **moyenne simple**, on additionne les notes et on divise par leur nombre : 12, 15 et 9 donnent (12 + 15 + 9) ÷ 3 = **12**. Avec des **coefficients**, on multiplie chaque note par son coefficient, on additionne, puis on divise par la somme des coefficients : Maths 14 (coefficient 5), Français 12 (coefficient 4) et Sport 16 (coefficient 2) donnent 150 ÷ 11 = **13,64**. Au bac général, la note se calcule de la même façon sur **100 coefficients** pour un élève sans option : 40 pour le contrôle continu et 60 pour les épreuves finales.",
  sections: [
    {
      titre: "Comment calculer une moyenne simple ?",
      paras: [
        "La moyenne simple est celle où toutes les notes ont le même poids. On additionne toutes les notes, puis on divise la somme par le nombre de notes.",
      ],
      etapes: [
        "**Additionner** les notes : 12 + 15 + 9 = 36.",
        "**Compter** les notes : il y en a 3.",
        "**Diviser** : 36 ÷ 3 = 12. La moyenne est de 12 sur 20.",
      ],
      suite: [
        "Cette méthode ne convient que si les notes ont toutes le même poids. Dès qu'un devoir compte plus qu'un autre, il faut passer à la moyenne avec coefficients.",
      ],
    },
    {
      titre: "Comment calculer une moyenne avec des coefficients ?",
      paras: [
        "Un coefficient dit combien de fois une note compte. Une note de coefficient 5 pèse cinq fois plus qu'une note de coefficient 1. La formule est : moyenne = somme de (note × coefficient) ÷ somme des coefficients.",
        "Exemple avec trois matières (c'est l'exemple du [calculateur de moyenne](/calcul-moyenne)) :",
      ],
      etapes: [
        "**Multiplier chaque note par son coefficient** : Maths 14 × 5 = 70, Français 12 × 4 = 48, Sport 16 × 2 = 32.",
        "**Additionner les résultats** : 70 + 48 + 32 = 150 points.",
        "**Additionner les coefficients** : 5 + 4 + 2 = 11.",
        "**Diviser** : 150 ÷ 11 = 13,636…, soit **13,64** sur 20 arrondi au centième.",
      ],
      suite: [
        "Sans coefficients, la moyenne simple des mêmes notes serait (14 + 12 + 16) ÷ 3 = 14. L'écart vient du Français, la note la plus basse, dont le coefficient est supérieur à celui du Sport, la note la plus haute.",
      ],
      visuel: {
        fichier: "moyenne-coefficients-et-moyenne-de-moyennes",
        alt: "Deux calculs de moyenne. Avec coefficients : Maths 14 coefficient 5 donne 70, Français 12 coefficient 4 donne 48, Sport 16 coefficient 2 donne 32 ; 150 divisé par 11 donne 13,64. Piège de la moyenne de moyennes : moyennes de 10 et 14 donnent 12, alors que la moyenne de toutes les notes est 13",
        legende:
          "Deux exemples chiffrés calculés par le site : la moyenne avec coefficients (même exemple que le calculateur) et le piège de la moyenne de moyennes (2 notes de moyenne 10, puis 6 notes de 14).",
      },
    },
    {
      titre: "Comment calculer sa moyenne quand les notes ne sont pas sur 20 ?",
      paras: [
        "Pour comparer des notes, on les ramène d'abord sur 20 : note sur 20 = note × 20 ÷ barème (le barème est le total de points possible).",
      ],
      liste: [
        "17 sur 25 : 17 × 20 ÷ 25 = **13,6** sur 20.",
        "34 sur 50 : 34 × 20 ÷ 50 = **13,6** sur 20.",
        "7 sur 10 : 7 × 20 ÷ 10 = **14** sur 20.",
        "65 sur 100 : 65 × 20 ÷ 100 = **13** sur 20.",
      ],
      suite: [
        "Attention, deux méthodes existent et elles ne donnent pas toujours le même résultat. Prenons 17 sur 25 et 12 sur 20. Si l'on ramène chaque note sur 20 puis qu'on fait la moyenne, on obtient (13,6 + 12) ÷ 2 = 12,8. Si l'on additionne les points et les barèmes, on obtient 29 ÷ 45 × 20 = 12,89, ce qui revient à donner à chaque note un coefficient égal à son barème. Aucune des deux n'est « fausse » : tout dépend de la règle annoncée par l'enseignant. Le [calculateur du site](/calcul-moyenne) applique un seul barème à toutes les notes saisies et peut afficher le résultat sur 20. Pour passer d'une note à un pourcentage, voir le [calcul de pourcentage](/calcul-pourcentage).",
      ],
    },
    {
      titre: "Le piège de la « moyenne de moyennes »",
      paras: [
        "Calculer la moyenne de plusieurs moyennes ne donne pas toujours la moyenne de toutes les notes. En général, les deux ne sont égales que si chaque moyenne repose sur le même nombre de notes (ou le même coefficient).",
        "Exemple : au 1er trimestre, un élève a 2 notes, 8 et 12, donc une moyenne de 10. Au 2e trimestre, il a 6 notes de 14, donc une moyenne de 14.",
      ],
      liste: [
        "**Moyenne des deux moyennes** : (10 + 14) ÷ 2 = 12.",
        "**Moyenne de toutes les notes** : (8 + 12 + 6 × 14) ÷ 8 = 104 ÷ 8 = 13.",
      ],
      suite: [
        "L'écart vient du trimestre 2, qui compte 6 notes contre 2 : il pèse trois fois plus dans la moyenne de toutes les notes. Pour obtenir le même résultat avec les moyennes, il faut les pondérer par le nombre de notes : (10 × 2 + 14 × 6) ÷ (2 + 6) = 104 ÷ 8 = 13.",
        "À l'inverse, faire la moyenne simple des moyennes est parfaitement correct quand c'est la règle de calcul choisie : les deux résultats répondent à deux règles différentes, aucun n'est faux en soi. L'important est de savoir laquelle s'applique à votre bulletin.",
      ],
      encadre:
        "Pour vérifier une moyenne avec des coefficients, saisissez les notes et leurs coefficients dans le [calculateur de moyenne](/calcul-moyenne) : il affiche le total pondéré, le total des coefficients et la moyenne.",
    },
    {
      titre: "Moyenne générale et moyenne annuelle : ce qui est national, ce qui dépend de l'établissement",
      paras: [
        "Beaucoup de questions viennent de là : « mon bulletin ne donne pas le même chiffre que mon calcul ». Pour le lycée général et technologique, un texte officiel (la note de service du 25 août 2025 sur le projet d'évaluation) fixe quelques règles, et laisse le reste à chaque lycée.",
      ],
      tableau: {
        colonnes: ["Question", "Ce qui est dit au niveau national", "Ce qui dépend de l'établissement"],
        lignes: [
          [
            "Moyenne annuelle d'une matière",
            "Elle est constituée à partir des moyennes périodiques des bulletins et validée au dernier conseil de classe de chaque année de première et de terminale.",
            "Le projet d'évaluation du lycée précise la pondération (les coefficients) des différents types d'évaluation dans chaque moyenne périodique.",
          ],
          [
            "Notes à coefficient zéro",
            "Elles ne sont pas comptées dans la moyenne, mais toutes les notes figurent sur le relevé de notes communiqué avec le bulletin.",
            "Le projet d'évaluation du lycée précise lesquelles ont un coefficient zéro (par exemple des évaluations diagnostiques ou certaines évaluations formatives).",
          ],
          [
            "Arrondi",
            "Pour le bac, la moyenne annuelle d'un enseignement évalué en contrôle continu est arrondie au dixième de point supérieur.",
            "Pour le bulletin, nous n'avons pas trouvé de règle nationale : demandez à l'établissement.",
          ],
          [
            "Moyenne générale du bulletin",
            "Nous n'avons trouvé aucun texte national qui fixe les coefficients des matières dans la moyenne générale.",
            "Pratique de l'établissement ou du logiciel de vie scolaire : demandez la règle au professeur principal.",
          ],
        ],
        texte: true,
      },
      suite: [
        "En clair : le calcul reste toujours « somme des notes pondérées ÷ somme des coefficients », mais les coefficients et l'arrondi du bulletin sont choisis localement. Si votre résultat diffère de celui du bulletin, l'écart peut venir d'un coefficient ou d'un arrondi que vous ne connaissez pas. Cet article ne couvre pas les règles propres à chaque collège ou à chaque lycée.",
      ],
    },
    {
      titre: "Bac général (session 2027) : comment la note est calculée",
      paras: [
        "Au bac, la règle de calcul est nationale. Le code de l'éducation (article D334-8) dit que la note de chaque épreuve est multipliée par son coefficient et que la moyenne est la somme des points divisée par le total des coefficients. Pour un élève sans option, ce total est de 100 : 40 pour le contrôle continu et 60 pour les épreuves finales (voie générale, à compter de la session 2027).",
      ],
      tableau: {
        colonnes: ["Bloc", "Enseignement ou épreuve", "Coefficient"],
        lignes: [
          ["Contrôle continu (40)", "Histoire-géographie", "6"],
          ["Contrôle continu (40)", "Langue vivante A", "6"],
          ["Contrôle continu (40)", "Langue vivante B", "6"],
          ["Contrôle continu (40)", "Enseignement scientifique", "6"],
          ["Contrôle continu (40)", "Éducation physique et sportive", "6"],
          ["Contrôle continu (40)", "Enseignement moral et civique", "2"],
          ["Contrôle continu (40)", "Spécialité suivie seulement en première", "8"],
          ["Épreuves finales (60)", "Deux spécialités de terminale", "16 chacune"],
          ["Épreuves finales (60)", "Philosophie", "8"],
          ["Épreuves finales (60)", "Grand oral", "8"],
          ["Épreuves finales (60)", "Français, écrit puis oral (première)", "5 et 5"],
          ["Épreuves finales (60)", "Mathématiques, épreuve anticipée (fin de première)", "2"],
        ],
        texte: true,
      },
      suite: [
        "Le contrôle continu est la moyenne annuelle des bulletins de première et de terminale dans chaque enseignement concerné. Les options s'ajoutent en supplément : le total passe alors au-dessus de 100 (106 dans un exemple du ministère avec 6 coefficients d'options). En voie technologique, la philosophie compte 4 et le Grand oral 12.",
        "Exemple simplifié, avec des chiffres inventés pour le calcul : 14 de moyenne sur l'ensemble du contrôle continu (40 coefficients) et 12 sur l'ensemble des épreuves finales (60 coefficients). Moyenne = (14 × 40 + 12 × 60) ÷ 100 = (560 + 720) ÷ 100 = **12,8**. C'est le niveau de la mention assez bien.",
        "Le jury peut ajouter des points, dans la limite de 50 points d'après l'article D334-10, soit au plus 0,5 point de moyenne avec 100 coefficients. Jusqu'à la session 2026, la grille était un peu différente : le Grand oral comptait 10 (14 en voie technologique) et il n'y avait pas d'épreuve anticipée de mathématiques.",
      ],
      encadre:
        "Les coefficients de ce tableau sont ceux annoncés par le ministère à compter de la session 2027 : 16 + 16 + 8 + 8 + 5 + 5 + 2 = 60 pour les épreuves finales, 40 pour le contrôle continu. Vérifiez la grille de votre année sur la page du ministère citée dans les sources.",
    },
    {
      titre: "Quelle moyenne pour avoir le bac, et une mention ?",
      paras: [
        "Les seuils sont fixés par le code de l'éducation (articles D334-8 et D334-11) pour le baccalauréat général. Le bac est obtenu dès 10 sur 20. Les mentions commencent à 12 : le texte ne prévoit pas de mention « passable », et entre 10 et 12 le bac est donc obtenu sans mention.",
      ],
      tableau: {
        colonnes: ["Moyenne sur 20", "Résultat", "Total de points (100 coefficients)"],
        lignes: [
          ["Moins de 8", "Ajourné", "moins de 800"],
          ["8 à moins de 10", "Second groupe d'épreuves (rattrapage)", "dès 800"],
          ["10 à moins de 12", "Admis, sans mention", "dès 1 000"],
          ["12 à moins de 14", "Mention assez bien", "dès 1 200"],
          ["14 à moins de 16", "Mention bien", "dès 1 400"],
          ["16 à moins de 18", "Mention très bien", "dès 1 600"],
          ["18 et plus", "Très bien, avec les félicitations du jury", "dès 1 800"],
        ],
        texte: true,
      },
      suite: [
        "Le total de points est la moyenne multipliée par 100 coefficients, sur un maximum de 2 000. Les candidats admis à l'issue du second groupe d'épreuves ne peuvent pas obtenir de mention : pour une mention, il faut atteindre le seuil dès le premier groupe d'épreuves. Pour savoir où vous vous situez, utilisez le [calculateur de mention au bac](/calcul-mention-bac).",
      ],
      encadre:
        "Ces seuils sont ceux du bac général. Ils ne valent pas pour une moyenne de bulletin : une moyenne de 12 sur 20 sur un bulletin est seulement un chiffre, pas une mention du bac.",
    },
  ],
  calculateur: {
    href: "/calcul-moyenne",
    nom: "Calcul Moyenne",
    titre: "Calculez votre moyenne avec coefficients",
    texte:
      "Saisissez chaque note avec son coefficient, choisissez le barème (sur 20, sur 10, sur 100 ou sur 5) : le calculateur donne la moyenne pondérée, le total des coefficients, la note la plus basse et la plus haute.",
    bouton: "Ouvrir le calculateur de moyenne",
  },
  faq: [
    {
      q: "Comment calculer sa moyenne en maths ?",
      a: "On additionne toutes les notes puis on divise par leur nombre. Avec 12, 15 et 9 : (12 + 15 + 9) ÷ 3 = 12. Si les notes ont des coefficients, on multiplie chaque note par son coefficient et on divise la somme par le total des coefficients.",
    },
    {
      q: "Comment calculer une moyenne avec des coefficients ?",
      a: "Moyenne = somme de (note × coefficient) ÷ somme des coefficients. Exemple : 14 coefficient 5, 12 coefficient 4 et 16 coefficient 2 donnent (70 + 48 + 32) ÷ 11 = 150 ÷ 11 = 13,64.",
    },
    {
      q: "Peut-on faire la moyenne de moyennes ?",
      a: "En général seulement si chaque moyenne repose sur le même nombre de notes ou le même coefficient. Avec une moyenne de 10 sur 2 notes et une moyenne de 14 sur 6 notes, la moyenne des deux moyennes est 12, mais la moyenne de toutes les notes est 13.",
    },
    {
      q: "Comment ramener une note sur 20 ?",
      a: "Multipliez la note par 20 et divisez par le barème : 17 sur 25 donne 17 × 20 ÷ 25 = 13,6 sur 20. Pour une note sur 10, il suffit de la multiplier par 2.",
    },
    {
      q: "Comment calculer sa moyenne annuelle ?",
      a: "Au lycée général et technologique, la moyenne annuelle est constituée à partir des moyennes périodiques des bulletins (trimestres ou semestres). La façon exacte de les combiner dépend du projet d'évaluation de l'établissement : demandez la règle à votre lycée.",
    },
    {
      q: "Comment est calculée la note du bac général ?",
      a: "Chaque note est multipliée par son coefficient, puis la somme est divisée par le total des coefficients, 100 pour un élève sans option. À partir de la session 2027, le contrôle continu compte pour 40 % et les épreuves finales pour 60 % (c'était déjà le cas en 2026).",
    },
    {
      q: "Quelle moyenne faut-il pour avoir une mention au bac ?",
      a: "12 sur 20 pour la mention assez bien, 14 pour bien, 16 pour très bien et 18 pour très bien avec les félicitations du jury. De 10 à moins de 12, le bac est obtenu sans mention.",
    },
    {
      q: "Peut-on avoir une mention après le rattrapage ?",
      a: "Non. Le code de l'éducation précise que les candidats admis à l'issue du second groupe d'épreuves ne peuvent pas obtenir de mention.",
    },
  ],
  sources: [
    {
      label: "Ministère de l'Éducation nationale : Comment calculer votre note au baccalauréat",
      url: "https://www.education.gouv.fr/reussir-au-lycee/comment-calculer-votre-note-au-baccalaureat-325511",
    },
    {
      label: "Légifrance, code de l'éducation : articles D334-2 à D334-14 (conditions de délivrance du baccalauréat général)",
      url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006071191/LEGISCTA000006166854/",
    },
    {
      label: "Bulletin officiel n° 32 du 28 août 2025 : Le projet d'évaluation au lycée général et technologique",
      url: "https://www.education.gouv.fr/bo/2025/Hebdo32/MENE2523744N",
    },
    {
      label: "Éduscol : Les épreuves terminales du baccalauréat général",
      url: "https://eduscol.education.gouv.fr/5706/les-epreuves-terminales-du-baccalaureat-general",
    },
  ],
  datePublication: "2026-10-07",
  dateAffichee: "7 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
