import type { Metadata } from "next";
import NumerologieNomPrenom from "../NumerologieNomPrenom";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const PAGES_DATA = [
  // Nombres (1-9)
  {
    slug: "expression-1",
    title: "Nombre d'Expression 1 — Pionnier et Leader",
    description:
      "Le nombre d'expression 1 symbolise l'independance, la leadership et la creation. Decouvrez votre potentiel de pionnier.",
    h1: "Nombre d'Expression 1 — Le Pionnier",
    contenu: `Le nombre 1 est le symbole du commencement, de l'independance et du leadership. Les personnes ayant un nombre d'expression 1 sont naturellement des pionniers, des createurs et des innovateurs. Vous etes confiant, ambitieux et aimer prendre les initiatives.

Votre force principale reside dans votre capacite a voir une vision et a la transformer en realite. Vous ne craignez pas les defis et vous etes pret a emprunter de nouveaux chemins. Votre independance est votre plus grand atout.`,
  },
  {
    slug: "expression-2",
    title: "Nombre d'Expression 2 — Diplomate et Cooperatif",
    description:
      "Le nombre 2 represente la diplomatie, la cooperation et la sensibilite. Vous etes un mediateur naturel et excellent en travail d'equipe.",
    h1: "Nombre d'Expression 2 — Le Diplomate",
    contenu: `Le nombre 2 symbolise la dualite, l'harmonie et la cooperation. Les personnes avec un nombre 2 sont sensibles, intuitives et excellent dans les relations interpersonnelles. Vous recherchez l'equilibre et l'harmonie dans votre environnement.

Vous etes un excellent mediateur et vous exceller dans le travail en equipe. Votre sensibilite vous permet de comprendre les emotions des autres. Votre defi principal est de ne pas vous laisser dominer par vos doutes.`,
  },
  {
    slug: "expression-3",
    title: "Nombre d'Expression 3 — Artiste et Createur",
    description:
      "Le nombre 3 represente la creativite, l'expression et la communication. Vous avez un don naturel pour l'art et l'expression personnelle.",
    h1: "Nombre d'Expression 3 — L'Artiste",
    contenu: `Le nombre 3 symbolise la creativite, la joie et l'expression personnelle. Les personnes avec un nombre 3 sont naturellement creatifs, expressifs et communicatifs. Vous avez un don pour inspirer les autres par votre charisme.

Votre passion pour la vie est contagieuse. Vous excellez dans les domaines artistiques et communicatifs. Votre defi principal est de rester concentre et de terminer ce que vous avez commence.`,
  },
  {
    slug: "expression-4",
    title: "Nombre d'Expression 4 — Bâtisseur et Constructeur",
    description:
      "Le nombre 4 represente la stabilite, l'organisation et la construction. Vous etes un bâtisseur naturel avec un fort sens du devoir.",
    h1: "Nombre d'Expression 4 — Le Bâtisseur",
    contenu: `Le nombre 4 symbolise la stabilite, la solidite et la construction. Les personnes avec un nombre 4 sont methodiques, responsables et travaillent dur pour construire une base solide. Vous etes fiable et pragmatique.

Votre force reside dans votre capacite a organiser et structurer. Vous ne prenez pas de raccourcis et vous travaillez systematiquement vers vos objectifs. Votre defi principal est de rester flexible face aux changements.`,
  },
  {
    slug: "expression-5",
    title: "Nombre d'Expression 5 — Aventurier et Explorateur",
    description:
      "Le nombre 5 represente la liberte, l'aventure et la flexibilite. Vous etes dynamique et aimer explorer de nouvelles experiences.",
    h1: "Nombre d'Expression 5 — L'Aventurier",
    contenu: `Le nombre 5 symbolise la liberte, la curiosite et l'aventure. Les personnes avec un nombre 5 sont dynamiques, adaptables et aimer vivre de nouvelles experiences. Vous etes energique et constamment a la recherche d'aventure.

Votre force est votre flexibilite et votre capacite d'adaptation. Vous n'etes jamais ennuye car vous recherchez constamment la nouveaute. Votre defi principal est de trouver la stabilite et de rester concentre.`,
  },
  {
    slug: "expression-6",
    title: "Nombre d'Expression 6 — Protecteur et Responsable",
    description:
      "Le nombre 6 represente la responsabilite, la famille et l'harmonie domestique. Vous ete bienveillant et protecteur.",
    h1: "Nombre d'Expression 6 — Le Protecteur",
    contenu: `Le nombre 6 symbolise la responsabilite, la bienveillance et la famille. Les personnes avec un nombre 6 sont naturellement protectrices, loyales et attachées a la famille. Vous aimer prendre soin des autres.

Votre force reside dans votre capacite a creer de l'harmonie et a s'occuper des autres. Vous etes fiable et on peut toujours compter sur vous. Votre defi principal est de ne pas vous sacrifier au detriment de vos propres besoins.`,
  },
  {
    slug: "expression-7",
    title: "Nombre d'Expression 7 — Sage et Spirituel",
    description:
      "Le nombre 7 represente la sagesse, la spiritualite et l'introspection. Vous avez un esprit analytique et une profonde reflexion.",
    h1: "Nombre d'Expression 7 — Le Sage",
    contenu: `Le nombre 7 symbolise la sagesse, la spiritualite et la reflexion. Les personnes avec un nombre 7 sont analytiques, introspectives et aimer approfondir les grandes questions existentielles. Vous etes methodique et intellectuel.

Votre force reside dans votre capacite de reflexion profonde et votre quete de sagesse. Vous aimez les mysteres et recherchez la verite. Votre defi principal est de ne pas vous isoler ou devenir trop sceptique.`,
  },
  {
    slug: "expression-8",
    title: "Nombre d'Expression 8 — Magnat et Leader Efficace",
    description:
      "Le nombre 8 represente le pouvoir, l'ambition et la manifestation. Vous avez un talent naturel pour les affaires et la reussite.",
    h1: "Nombre d'Expression 8 — Le Magnat",
    contenu: `Le nombre 8 symbolise le pouvoir, l'ambition et la manifestation materielle. Les personnes avec un nombre 8 sont nees pour la reussite et excellent dans les domaines commerciaux. Vous avez un fort sens des responsabilites.

Votre force est votre capacite a manifester vos objectifs et a construire une richesse durable. Vous etes pratique et efficace. Votre defi principal est de ne pas devenir obsede par l'argent ou le pouvoir.`,
  },
  {
    slug: "expression-9",
    title: "Nombre d'Expression 9 — Humaniste et Altruiste",
    description:
      "Le nombre 9 represente l'altruisme, l'humanite et l'universel. Vous avez une grande compassion pour les autres.",
    h1: "Nombre d'Expression 9 — L'Humaniste",
    contenu: `Le nombre 9 symbolise l'altruisme, la compassion et la vision universelle. Les personnes avec un nombre 9 sont humanistes, altruistes et pensent au bien commun. Vous avez une grande empathie.

Votre force reside dans votre compassion et votre vision large de l'humanite. Vous aimer aider les autres et contribuer au bien collectif. Votre defi principal est de fixer des limites et de prendre soin de vous-meme.`,
  },
  // Questions
  {
    slug: "comment-calculer-numerologie-nom",
    title: "Comment calculer la numerologie de son nom et prenom ?",
    description:
      "Guide complet pour calculer votre numerologie nom avec la methode pythagoricienne. Etapes et explications.",
    h1: "Comment calculer la numerologie de son nom et prenom ?",
    contenu: `La numerologie pythagoricienne est une methode ancestrale pour comprendre votre personnalite et votre destinee par les chiffres. Voici comment calculer votre numerologie nom et prenom :

**Etape 1 : Utiliser le tableau de correspondance**
Chaque lettre a une valeur numerique de 1 a 9 selon la methode pythagoricienne. Par exemple : A=1, B=2, C=3, etc.

**Etape 2 : Additionner les valeurs**
Pour le nombre d'expression, additionnez TOUTES les lettres de votre nom et prenom. Pour le nombre du cœur, additionnez uniquement les VOYELLES. Pour la personnalite, additionnez uniquement les CONSONNES.

**Etape 3 : Reduire a un chiffre**
Additionnez les chiffres du resultat jusqu'a obtenir un numero simple entre 1 et 9. Exception : si vous obtenez 11, 22 ou 33, ne reduisez pas car ce sont des nombres maitres.

Cette methode permet d'obtenir une vision complete de votre personnalite numerologique.`,
  },
  {
    slug: "numerologie-prenom-signification",
    title: "Que signifie mon prenom en numerologie ?",
    description:
      "Decouvrez la signification numerologique de votre prenom avec la methode pythagoricienne.",
    h1: "Que signifie mon prenom en numerologie ?",
    contenu: `Le prenom joue un role tres important en numerologie. Votre numero de prenom (calcule avec les lettres de votre prenom seulement) revele votre nature personnelle et votre approche initiale de la vie.

Le prenom represente comment vous vous presentez au monde et comment vous interagissez avec les gens que vous rencontrez pour la premiere fois. C'est votre numero de premiere impression.

Certains prenoms ont une vibration naturelle puissante, tandis que d'autres sont plus doux et delicats. La numerologie soutient que certains prenoms resonnent mieux avec certaines personnes selon leur date de naissance.

Par exemple, un prenom qui reduit au numero 3 (comme "Luc" ou "Paul") a une vibration creative et communicative. Un prenom qui reduit au 7 apporte une vibration spirituelle et analytique.`,
  },
  {
    slug: "voyelles-consonnes-numerologie",
    title: "Pourquoi distinguer voyelles et consonnes en numerologie ?",
    description:
      "Explication de l'importance des voyelles et consonnes dans le calcul numerologique.",
    h1: "Pourquoi distinguer voyelles et consonnes en numerologie ?",
    contenu: `En numerologie pythagoricienne, les voyelles et consonnes ont des roles distincts et complementaires :

**Les VOYELLES (A, E, I, O, U, Y) créent le Nombre du Cœur**
Les voyelles representent ce qui est interieur, cache et prive. Elles revelent vos desirs profonds, vos passions et votre monde emotionnel. C'est votre essence secrete.

**Les CONSONNES créent le Nombre de Personnalité**
Les consonnes representent ce qui est exterieur, visible et public. Elles revelent comment les autres vous percevez et l'image que vous projetez.

**Ensemble (Voyelles + Consonnes) = Nombre d'Expression**
Le nombre d'expression complet represente votre potentiel global et votre destinee totale.

Cette distinction permet d'avoir une vision tridimensionnelle de votre personnalite : votre etre interieur (cœur), votre apparence exterieure (personnalite) et votre potentiel global (expression).`,
  },
];

function findPage(slug: string): (typeof PAGES_DATA)[0] | null {
  return PAGES_DATA.find((p) => p.slug === slug) || null;
}

export function generateStaticParams() {
  return PAGES_DATA.map((p) => ({ params: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const page = findPage(slug);
  if (!page) return {};
  return {
    alternates: { canonical: `/numerologie-nom-prenom/${slug}` },
    title: page.title,
    description: page.description,
    keywords: `numerologie, ${slug.replace(/-/g, " ")}, calcul numerologie, nombre pythagoricien`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const page = findPage(slug);
  if (!page) notFound();

  return (
    <div>
      <Breadcrumb
        currentPage={page.h1}
        parentPage="Numerologie Nom et Prenom"
        parentHref="/numerologie-nom-prenom"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-fuchsia-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ✨
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">{page.h1}</h1>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl border border-purple-200 p-6 mb-8 ml-[52px]">
        <p className="text-slate-700 leading-relaxed whitespace-pre-line">
          {page.contenu}
        </p>
      </div>

      <NumerologieNomPrenom />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <RelatedCalculators currentSlug="/numerologie-nom-prenom" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
