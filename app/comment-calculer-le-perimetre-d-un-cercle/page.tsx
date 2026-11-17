import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment calculer le périmètre d'un cercle ?";
const DESCRIPTION =
  "Le périmètre d'un cercle se calcule avec la formule 2 × π × r, ou π × d avec le diamètre. Exemples chiffrés, roue de vélo, table ronde, demi-cercle et arc de cercle.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-calculer-le-perimetre-d-un-cercle" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "périmètre d'un cercle, périmètre d'un cercle formule, périmètre d'un cercle avec le diamètre, périmètre d'un demi-cercle, circonférence d'un cercle, calcul circonférence",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-calculer-le-perimetre-d-un-cercle",
  fil: "Périmètre d'un cercle",
  emoji: "⭕",
  couleur: "from-blue-500 to-cyan-600",
  h1: "Comment calculer le périmètre d'un cercle ?",
  chapo:
    "Roue de vélo, table ronde, tronc d'arbre ou bordure de massif : pour connaître la longueur du tour d'un cercle, il suffit d'une formule et d'une seule mesure. Voici la méthode avec le rayon ou le diamètre, des exemples chiffrés et les pièges à éviter.",
  reponse:
    "**Périmètre = 2 × π × r, où r est le rayon.** Si vous connaissez le diamètre d, c'est encore plus simple : **périmètre = π × d**. Le périmètre d'un cercle s'appelle aussi sa circonférence. C'est une longueur : avec un rayon en centimètres, le résultat est en centimètres (cm).",
  sections: [
    {
      titre: "La formule du périmètre d'un cercle",
      paras: [
        "Le périmètre d'un cercle est la longueur de son contour, c'est-à-dire la distance qu'on parcourt en en faisant le tour. Il se calcule à partir du **rayon**, la distance entre le centre et le bord, ou du **diamètre**, la distance d'un bord à l'autre en passant par le centre. Le diamètre vaut deux fois le rayon.",
        "Le nombre π (pi) vaut environ 3,14159. La formule s'écrit donc de deux façons équivalentes :",
      ],
      liste: [
        "**Avec le rayon :** périmètre = 2 × π × r.",
        "**Avec le diamètre :** d = 2 × r, donc périmètre = π × d.",
      ],
      suite: [
        "Autrement dit, le tour d'un cercle mesure un peu plus de trois fois son diamètre. Si vous devez d'abord retrouver cette mesure, voyez [comment calculer le diamètre d'un cercle](/comment-calculer-diametre-cercle).",
      ],
    },
    {
      titre: "Exemple 1 : un cercle de rayon 5 cm",
      paras: ["Quel est le périmètre d'un cercle de rayon 5 cm ?"],
      etapes: [
        "On double le rayon : 2 × 5 = 10.",
        "On multiplie par π : 10 × 3,14159 = **31,42 cm**.",
      ],
      suite: [
        "Avec π arrondi à 3,14, on trouve 10 × 3,14 = 31,4 cm. L'écart est de 0,02 cm environ, négligeable ici. Il grandit avec la taille du cercle : sur une grande distance, gardez plus de décimales.",
      ],
    },
    {
      titre: "Exemple 2 : un cercle de diamètre 30 cm",
      paras: ["Cette fois, on connaît directement le diamètre : 30 cm."],
      etapes: ["On multiplie le diamètre par π : 30 × 3,14159 = **94,25 cm**."],
      suite: [
        "Pas besoin de passer par le rayon. Avec π = 3,14, on obtient 94,2 cm, soit un écart de 0,05 cm. Si vous aviez seulement le rayon (15 cm), le calcul 2 × π × 15 donne exactement le même résultat.",
      ],
    },
    {
      titre: "Exemple 3 : une roue de vélo de 70 cm de diamètre",
      paras: [
        "Le périmètre d'une roue est la distance parcourue en un tour complet. Pour une roue de 70 cm de diamètre :",
      ],
      etapes: [
        "On calcule le périmètre : 70 × 3,14159 = 219,91 cm, soit **2,20 m** par tour.",
        "On convertit 1 km en centimètres : 1 km = 1 000 m = 100 000 cm.",
        "On divise : 100 000 ÷ 219,91 = **454,7 tours** de roue pour parcourir 1 km.",
      ],
      suite: [
        "Avec π = 3,14, on trouverait 219,8 cm par tour et 455,0 tours : l'arrondi de π ajoute donc environ 0,2 tour de roue au kilomètre (0,23 en calcul exact).",
      ],
    },
    {
      titre: "Exemple 4 : retrouver le diamètre d'un tronc d'arbre",
      paras: [
        "Il est souvent plus facile de mesurer le tour d'un objet avec un mètre ruban que de mesurer son diamètre. Imaginons un tronc dont le tour mesure 1,57 m. On retourne la formule : d = P ÷ π.",
      ],
      etapes: [
        "Diamètre : 1,57 ÷ 3,14159 = **0,50 m**, soit 50 cm.",
        "Rayon : 1,57 ÷ (2 × 3,14159) = **0,25 m**, soit 25 cm.",
      ],
      suite: [
        "On suppose ici que le tronc est parfaitement rond : le résultat est une valeur moyenne.",
      ],
    },
    {
      titre: "Exemple 5 : une table ronde de 1,20 m de diamètre",
      paras: [
        "Vous voulez poser un chant décoratif autour d'une table ronde de 1,20 m de diamètre, ou choisir une nappe. La longueur du bord est le périmètre.",
      ],
      etapes: ["On multiplie : 1,20 × 3,14159 = **3,77 m** de bordure."],
      suite: [
        "Vérification en centimètres : 120 × 3,14159 = 376,99 cm, soit bien 3,77 m. Pour une nappe qui retombe sur les côtés, la longueur à prévoir dépend de la retombée souhaitée : mesurez-la et ajoutez-la au rayon de la table avant de calculer.",
      ],
    },
    {
      titre: "Exemple 6 : un demi-cercle de 2 m de diamètre",
      paras: [
        "Un demi-cercle a deux types de bords : l'arc, qui est courbe, et le diamètre, qui est droit. Le « tour complet » de la forme additionne les deux. Pour un diamètre de 2 m, le rayon vaut 1 m.",
      ],
      etapes: [
        "L'arc est la moitié du périmètre du cercle : π × r = 3,14159 × 1 = 3,14 m.",
        "On ajoute le côté droit, le diamètre : 2 m.",
        "Le tour complet vaut 3,14159 + 2 = **5,14 m**.",
      ],
      suite: [
        "La formule du tour complet d'un demi-cercle est donc π × r + 2 × r. N'oubliez pas le côté droit : sans lui, vous ne comptez que la partie courbe.",
      ],
    },
    {
      titre: "Résumé des exemples",
      tableau: {
        colonnes: ["Situation", "Calcul", "Résultat"],
        lignes: [
          ["Rayon 5 cm", "2 × π × 5", "31,42 cm"],
          ["Diamètre 30 cm", "π × 30", "94,25 cm"],
          ["Roue de 70 cm de diamètre", "π × 70", "219,91 cm par tour"],
          ["1 km en roue de 70 cm", "100 000 ÷ 219,91", "454,7 tours"],
          ["Tronc de 1,57 m de tour", "1,57 ÷ π", "0,50 m de diamètre"],
          ["Table de 1,20 m de diamètre", "π × 1,20", "3,77 m"],
          ["Demi-cercle de 2 m de diamètre", "π × 1 + 2", "5,14 m"],
        ],
      },
    },
    {
      titre: "Arc de cercle et rayon à retrouver",
      paras: [
        "Deux variantes se déduisent de la formule de base.",
      ],
      liste: [
        "**Arc de cercle :** pour un angle a en degrés, longueur de l'arc = 2 × π × r × a ÷ 360. Pour r = 5 cm et a = 90°, on obtient 2 × π × 5 × 90 ÷ 360 = 7,85 cm, soit un quart du périmètre de 31,42 cm.",
        "**Retrouver le diamètre ou le rayon à partir du périmètre :** d = P ÷ π et r = P ÷ (2 × π). Pour un périmètre de 31,42 cm, on trouve d = 10,00 cm et r = 5,00 cm.",
      ],
    },
    {
      titre: "Ne pas confondre périmètre et aire",
      paras: [
        "Le **périmètre** est la longueur du tour du cercle, alors que l'**aire** est la surface à l'intérieur. La formule de l'aire est π × r², et elle s'exprime en unités carrées (cm², m²).",
        "Pour savoir lequel utiliser, posez-vous la question : ai-je besoin d'une longueur ou d'une surface ? Pour une clôture, une bordure ou un ruban, c'est le périmètre. Pour du gazon, de la peinture ou une plaque, c'est l'aire : voyez [comment calculer l'aire d'un cercle](/comment-calculer-l-aire-d-un-cercle). Si vous cherchez le volume d'un solide à base circulaire, c'est le [calcul du volume d'un cylindre](/calcul-volume-cylindre).",
      ],
    },
    {
      titre: "Unités : le périmètre reste une longueur",
      paras: [
        "Le périmètre garde la même unité que la mesure de départ : un rayon en centimètres donne un périmètre en centimètres, un rayon en mètres un périmètre en mètres. Contrairement à l'aire, il n'y a pas de carré à gérer.",
      ],
      liste: [
        "Pour passer de cm à m, divisez par 100, car 1 m = 100 cm. Exemple : 376,99 cm ÷ 100 = 3,77 m.",
        "Le plus sûr reste de convertir la mesure de départ avant de calculer, puis de ne pas mélanger les unités en cours de route.",
      ],
      encadre:
        "Les mesures de ces exemples sont choisies pour illustrer la méthode. Remplacez-les par vos propres mesures.",
    },
    {
      titre: "Comment utiliser le calculateur de surface d'un cercle",
      paras: [
        "Le calculateur propose trois modes : **Rayon**, **Diamètre** et **Périmètre**. Choisissez le mode qui correspond à la mesure que vous connaissez, puis saisissez la valeur dans le champ. Vous pouvez écrire les décimales avec une virgule ou avec un point, ou cliquer sur l'une des valeurs proposées sous le champ (1, 2, 3, 5, 7, 10, 15, 20, 50 ou 100).",
        "Pour le périmètre, lisez la case **Périmètre** sous le résultat principal : elle se trouve à côté du rayon et du diamètre. Le résultat mis en avant, en grand, est la surface du cercle, pas le périmètre. Si vous partez du périmètre (par exemple le tour d'un tronc), choisissez le mode Périmètre : le calculateur en déduit le rayon et le diamètre.",
        "Le calculateur ne gère pas d'unité : il donne des nombres. Si vous saisissez des centimètres, lisez des centimètres pour les longueurs. Il ne calcule pas non plus de demi-cercle ni d'arc : pour ceux-là, utilisez les formules ci-dessus. Si la valeur est vide, nulle ou négative, aucun résultat n'est affiché.",
      ],
    },
    {
      titre: "Erreurs fréquentes",
      liste: [
        "**Confondre rayon et diamètre.** Si vous utilisez le diamètre dans la formule 2 × π × r, le résultat est deux fois trop grand.",
        "**Mélanger périmètre et aire.** Le périmètre se mesure en longueur, l'aire en unités carrées. Ne mettez jamais un carré sur le rayon pour un périmètre.",
        "**Arrondir π trop tôt.** Utilisez 3,14159 (ou la touche π de la calculatrice) et arrondissez seulement le résultat final.",
        "**Oublier le côté droit d'un demi-cercle.** Le tour complet de la forme est π × r + 2 × r, pas seulement π × r.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-surface-cercle",
    nom: "Surface d'un cercle",
    titre: "Calculez le périmètre de votre cercle",
    texte:
      "Choisissez le mode rayon, diamètre ou périmètre, saisissez votre mesure : le calculateur affiche la surface, le rayon, le diamètre et le périmètre.",
    bouton: "Ouvrir le calculateur de surface d'un cercle",
  },
  faq: [
    {
      q: "Quelle est la formule du périmètre d'un cercle ?",
      a: "Périmètre = 2 × π × r, où r est le rayon. Avec le diamètre d, on utilise périmètre = π × d. π vaut environ 3,14159.",
    },
    {
      q: "Comment calculer le périmètre d'un cercle avec le diamètre ?",
      a: "On multiplie le diamètre par π. Pour un diamètre de 30 cm, le périmètre vaut 30 × 3,14159 = 94,25 cm.",
    },
    {
      q: "Quelle différence entre périmètre et circonférence ?",
      a: "Aucune pour un cercle : la circonférence est le nom du périmètre d'un cercle. Les deux se calculent avec 2 × π × r.",
    },
    {
      q: "Comment calculer le périmètre d'un demi-cercle ?",
      a: "Le tour complet est la moitié du périmètre du cercle plus le diamètre : π × r + 2 × r. Pour un diamètre de 2 m, on obtient 3,14 + 2 = 5,14 m.",
    },
    {
      q: "Comment retrouver le rayon à partir du périmètre ?",
      a: "On divise le périmètre par 2 × π. Pour un périmètre de 31,42 cm, le rayon vaut 31,42 ÷ 6,28318 = 5,00 cm. Le diamètre se trouve en divisant le périmètre par π.",
    },
  ],
  sources: [],
  datePublication: "2026-11-16",
  dateAffichee: "16 novembre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
