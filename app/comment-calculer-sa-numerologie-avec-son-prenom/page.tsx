import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer sa numérologie avec son nom et son prénom ?";
const DESCRIPTION =
  "Tableau lettres-chiffres, addition, réduction, nombres maîtres : la méthode pour calculer ses nombres d'expression, du cœur et de personnalité, avec des exemples détaillés.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-sa-numerologie-avec-son-prenom" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "numérologie prénom calcul, nombre d'expression calcul, tableau numérologie lettres chiffres, nombre intime, numérologie nom prénom, calcul numérologie pythagoricienne",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
    images: [{ url: "/images/numerologie-carnet.webp", width: 1200, height: 630 }],
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-sa-numerologie-avec-son-prenom",
  fil: "Numérologie du prénom",
  emoji: "🔢",
  couleur: "from-purple-500 to-indigo-600",
  h1: "Comment calculer sa numérologie avec son nom et son prénom ?",
  chapo:
    "Chaque lettre de votre nom et de votre prénom correspond à un chiffre de 1 à 9. En les additionnant puis en réduisant le total, on obtient trois nombres : l'expression, le cœur et la personnalité. Voici la méthode pas à pas, avec des exemples entièrement détaillés.",
  reponse:
    "**On remplace chaque lettre par un chiffre grâce à un tableau, on additionne, puis on réduit le total à un seul chiffre** en additionnant ses chiffres. Toutes les lettres donnent le nombre d'expression, les voyelles le nombre du cœur (ou nombre intime), les consonnes le nombre de personnalité. La numérologie est une tradition sans base scientifique : prenez-la comme un jeu ou une curiosité.",
  sections: [
    {
      titre: "Une tradition, pas une science",
      paras: [
        "La numérologie est une pratique traditionnelle qui associe des nombres aux lettres. Aucune étude scientifique ne montre qu'elle décrit une personnalité ou prédit quoi que ce soit. Beaucoup de gens y trouvent pourtant un plaisir de lecture, un sujet de conversation ou une façon de s'interroger sur eux-mêmes, et c'est très bien ainsi.",
        "Le calcul, lui, est de l'arithmétique simple et se vérifie à la main, avec la méthode du calculateur.",
      ],
      visuel: {
        fichier: "numerologie-carnet",
        alt: "Carnet ouvert couvert de petites notes manuscrites, un crayon posé dessus, une tasse de tisane et une bougie, sur un bureau éclairé le soir par une lampe.",
        legende:
          "Un crayon et une feuille suffisent : la numérologie du prénom repose sur de simples additions de lettres.",
      },
    },
    {
      titre: "Le tableau lettres-chiffres",
      paras: [
        "Les 26 lettres de l'alphabet sont réparties sur les chiffres de 1 à 9, dans l'ordre, puis on recommence :",
      ],
      tableau: {
        colonnes: ["Chiffre", "Lettres"],
        lignes: [
          ["1", "A, J, S"],
          ["2", "B, K, T"],
          ["3", "C, L, U"],
          ["4", "D, M, V"],
          ["5", "E, N, W"],
          ["6", "F, O, X"],
          ["7", "G, P, Y"],
          ["8", "H, Q, Z"],
          ["9", "I, R"],
        ],
        texte: true,
      },
      suite: [
        "Seules les lettres comptent : espaces, tirets et apostrophes sont ignorés. Le prénom et le nom sont additionnés ensemble.",
      ],
    },
    {
      titre: "Réduire un nombre à un chiffre",
      paras: [
        "Le total des lettres dépasse presque toujours 9. On le réduit en additionnant ses chiffres, autant de fois que nécessaire, jusqu'à obtenir un seul chiffre. Par exemple, 55 donne 5 + 5 = 10, puis 1 + 0 = 1.",
        "Il existe une exception : les **nombres maîtres 11, 22 et 33**. Si le total est exactement l'un d'eux, le calculateur le garde tel quel et l'indique comme « Maître ». Attention à un détail : cette règle ne s'applique qu'au total final. Un total de 29 donne 2 + 9 = 11, puis le calcul continue : 1 + 1 = 2. Le résultat est 2, pas 11. De même, 44 donne 8 et non 44.",
      ],
    },
    {
      titre: "Les trois nombres calculés",
      paras: [
        "Le calculateur donne trois nombres, chacun avec un titre et un court texte d'interprétation :",
      ],
      liste: [
        "**Nombre d'expression :** on additionne toutes les lettres. La carte l'associe à votre potentiel global et à votre destinée.",
        "**Nombre du cœur (ou nombre intime) :** on n'additionne que les voyelles, A, E, I, O, U et Y. La carte l'associe à vos désirs et passions intimes.",
        "**Nombre de personnalité :** on n'additionne que les consonnes. La carte l'associe à votre image extérieure.",
      ],
      suite: [
        "Le Y est donc compté comme une voyelle, ce qui n'est pas le cas dans toutes les méthodes. Comme chaque lettre est soit voyelle, soit consonne, la somme du cœur et celle de la personnalité redonnent toujours la somme de toutes les lettres, avant réduction.",
      ],
    },
    {
      titre: "Exemple 1 : Marie Dupont",
      paras: ["On convertit chaque lettre, puis on additionne."],
      etapes: [
        "Prénom : M = 4, A = 1, R = 9, I = 9, E = 5, soit 28. Nom : D = 4, U = 3, P = 7, O = 6, N = 5, T = 2, soit 27.",
        "**Expression :** 28 + 27 = 55, puis 5 + 5 = 10, puis 1 + 0 = **1**.",
        "**Cœur** (voyelles A, I, E, U, O) : 1 + 9 + 5 + 3 + 6 = 24, puis 2 + 4 = **6**.",
        "**Personnalité** (consonnes M, R, D, P, N, T) : 4 + 9 + 4 + 7 + 5 + 2 = 31, puis 3 + 1 = **4**.",
      ],
      suite: [
        "Vérification : 24 + 31 = 55, comme la somme de toutes les lettres. Dans les textes du calculateur, le 1 est le « Pionnier », le 6 le « Protecteur » et le 4 le « Bâtisseur ». Nom et prénom sont inventés.",
      ],
    },
    {
      titre: "Exemple 2 : Lucas Martin",
      paras: ["Même méthode avec un deuxième nom inventé."],
      etapes: [
        "Prénom : L = 3, U = 3, C = 3, A = 1, S = 1, soit 11. Nom : M = 4, A = 1, R = 9, T = 2, I = 9, N = 5, soit 30.",
        "**Expression :** 11 + 30 = 41, puis 4 + 1 = **5**.",
        "**Cœur** (voyelles U, A, A, I) : 3 + 1 + 1 + 9 = 14, puis 1 + 4 = **5**.",
        "**Personnalité** (consonnes L, C, S, M, R, T, N) : 3 + 3 + 1 + 4 + 9 + 2 + 5 = 27, puis 2 + 7 = **9**.",
      ],
      suite: [
        "Vérification : 14 + 27 = 41. Ici, l'expression et le cœur donnent le même nombre, 5, le « Aventurier » dans les textes du calculateur. Le 9 est l'« Humaniste ». Deux sommes différentes peuvent se réduire au même chiffre.",
      ],
    },
    {
      titre: "Exemple 3 : un prénom avec accent, Hélène Martin",
      paras: [
        "Le calculateur met le texte en majuscules, retire les accents (É devient E, Ç devient C), puis supprime tout ce qui n'est pas une lettre de A à Z. Hélène est donc calculé comme Helene, et le résultat est identique avec ou sans accent.",
      ],
      etapes: [
        "Prénom : H = 8, E = 5, L = 3, E = 5, N = 5, E = 5, soit 31. Nom : Martin, soit 30 comme plus haut.",
        "**Expression :** 31 + 30 = 61, puis 6 + 1 = **7**.",
        "**Cœur** (voyelles E, E, E, A, I) : 5 + 5 + 5 + 1 + 9 = 25, puis 2 + 5 = **7**.",
        "**Personnalité** (consonnes H, L, N, M, R, T, N) : 8 + 3 + 5 + 4 + 9 + 2 + 5 = 36, puis 3 + 6 = **9**.",
      ],
      suite: [
        "Vérification : 25 + 36 = 61. Une ligature comme « œ » n'est pas décomposée par ce traitement : elle est simplement ignorée, ce qui change la somme. Si votre nom en contient une, écrivez « oe » pour la compter.",
      ],
    },
    {
      titre: "Résumé des exemples",
      tableau: {
        colonnes: ["Nom", "Expression", "Cœur", "Personnalité"],
        lignes: [
          ["Marie Dupont", "55 → 1", "24 → 6", "31 → 4"],
          ["Lucas Martin", "41 → 5", "14 → 5", "27 → 9"],
          ["Hélène Martin", "61 → 7", "25 → 7", "36 → 9"],
        ],
      },
    },
    {
      titre: "Ce que disent les textes du calculateur",
      paras: [
        "Chaque nombre est accompagné d'un titre et d'un court portrait. Voici l'idée de chacun, résumée :",
      ],
      liste: [
        "**1, Pionnier :** indépendant, aime prendre l'initiative. **2, Diplomate :** sensible, cherche l'harmonie. **3, Artiste :** créatif et communicatif.",
        "**4, Bâtisseur :** organisé et fiable. **5, Aventurier :** libre et curieux. **6, Protecteur :** attaché à la famille et aux autres.",
        "**7, Sage :** introspectif et analytique. **8, Magnat :** ambitieux, à l'aise avec les affaires. **9, Humaniste :** altruiste, à l'esprit large.",
        "**11, Maître Intuitif**, **22, Maître Bâtisseur** et **33, Maître Enseignant** : les trois nombres maîtres, avec leur propre texte.",
      ],
      suite: [
        "Ce sont des portraits généraux, à lire avec recul. Pour une autre approche fondée sur la date de naissance, voyez le [calcul du chemin de vie](/calcul-chemin-de-vie), le [signe zodiacal](/calcul-signe-zodiaque) ou la [compatibilité entre signes](/compatibilite-signes-astrologiques).",
      ],
    },
    {
      titre: "Comment utiliser le calculateur de numérologie",
      paras: [
        "Saisissez votre **prénom** et votre **nom de famille** dans les deux champs, puis cliquez sur « Calculer ma numérologie » (ou appuyez sur la touche Entrée). Le bouton reste grisé tant qu'un des deux champs est vide.",
        "Le calculateur affiche trois cartes : le nombre d'expression, le nombre du cœur et le nombre de personnalité. Chacune indique le chiffre, un badge « Maître » si c'est 11, 22 ou 33, le titre et le texte d'interprétation. Le bouton « Voir le détail du calcul » déplie la valeur de chaque lettre et la somme avant réduction, pratique pour vérifier.",
        "Le calculateur ne traite que le nom et le prénom : il ne demande pas de date de naissance. Pour un prénom composé ou un nom à particule, écrivez-le en entier dans le champ : les espaces et les tirets sont ignorés.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Réduire trop tôt une somme partielle.** Additionnez d'abord toutes les lettres, puis réduisez le total, en recommençant jusqu'à obtenir un seul chiffre.",
        "**Compter 29 ou 44 comme des nombres maîtres.** Seuls les totaux exactement égaux à 11, 22 ou 33 sont conservés.",
        "**Oublier le Y parmi les voyelles.** Il compte dans le cœur, pas dans la personnalité.",
        "**Utiliser un autre tableau.** D'autres tables donnent d'autres résultats : suivez celle du calculateur.",
      ],
    },
  ],
  calculateur: {
    href: "/numerologie-nom-prenom",
    nom: "Numérologie du nom et du prénom",
    titre: "Calculez vos nombres de numérologie",
    texte:
      "Saisissez votre prénom et votre nom : le calculateur affiche vos nombres d'expression, du cœur et de personnalité, avec le détail lettre par lettre.",
    bouton: "Ouvrir le calculateur de numérologie",
  },
  faq: [
    {
      q: "Comment calculer sa numérologie avec son prénom ?",
      a: "On remplace chaque lettre par un chiffre selon un tableau (A, J, S = 1 ; B, K, T = 2 ; et ainsi de suite jusqu'à 9), on additionne, puis on réduit le total à un seul chiffre. Le calculateur additionne le prénom et le nom ensemble.",
    },
    {
      q: "Comment calculer le nombre d'expression ?",
      a: "On additionne les valeurs de toutes les lettres du prénom et du nom, puis on réduit. Pour Marie Dupont, 28 + 27 = 55, puis 5 + 5 = 10, puis 1 + 0 = 1.",
    },
    {
      q: "Qu'est-ce que le nombre intime ?",
      a: "C'est le nombre du cœur : on n'additionne que les voyelles (A, E, I, O, U, Y), puis on réduit. Pour Marie Dupont, 1 + 9 + 5 + 3 + 6 = 24, puis 2 + 4 = 6.",
    },
    {
      q: "Les accents changent-ils le résultat ?",
      a: "Non. Le calculateur retire les accents avant de compter : Hélène est calculé comme Helene. Les espaces, tirets et apostrophes sont ignorés. Une ligature comme « œ » est ignorée aussi : écrivez « oe » pour la compter.",
    },
    {
      q: "La numérologie est-elle fiable ?",
      a: "Non, elle n'a pas de base scientifique et ne prédit rien. C'est une tradition que l'on peut aborder comme un jeu ou une curiosité. Le calcul, lui, est de l'arithmétique simple.",
    },
  ],
  sources: [],
  datePublication: "2026-11-20",
  dateAffichee: "20 novembre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
