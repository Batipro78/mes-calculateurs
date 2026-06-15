import type { Metadata } from "next";
import NumerologieNomPrenom from "./NumerologieNomPrenom";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/numerologie-nom-prenom" },
  title: "Numérologie Nom et Prénom - Nombre Expression Cœur Personnalité",
  description:
    "Calculez votre numérologie nom et prénom avec la méthode pythagoricienne. Nombres d'expression, du cœur et de personnalité. Significations et interprétations complètes.",
  keywords:
    "numerologie nom prenom, nombre expression, nombre coeur, nombre personnalite, numerologie pythagore, calcul numerologie, numerologie gratuit, destinee numerologie",
};

// Signification des nombres d'expression (prose en chaines JS, apostrophes OK).
const NOMBRES: { n: string; titre: string; texte: string }[] = [
  {
    n: "1",
    titre: "L'Indépendant",
    texte:
      "Leadership, originalité et esprit d'initiative. Le 1 d'expression pousse à créer, diriger et tracer sa propre voie. Talent : entreprendre. Écueil : l'autoritarisme et l'impatience.",
  },
  {
    n: "2",
    titre: "Le Coopératif",
    texte:
      "Diplomatie, écoute et sens du collectif. Le 2 excelle dans les rôles d'association, de médiation et de soutien. Talent : créer du lien. Écueil : le manque de confiance en soi.",
  },
  {
    n: "3",
    titre: "Le Créatif",
    texte:
      "Communication, imagination et joie de vivre. Le 3 s'épanouit dans l'expression artistique, l'écriture et la parole. Talent : inspirer et divertir. Écueil : la dispersion.",
  },
  {
    n: "4",
    titre: "L'Organisateur",
    texte:
      "Rigueur, méthode et sens du concret. Le 4 construit du solide et tient ses engagements. Talent : structurer et bâtir. Écueil : la rigidité et la résistance au changement.",
  },
  {
    n: "5",
    titre: "Le Polyvalent",
    texte:
      "Liberté, adaptabilité et goût du mouvement. Le 5 aime le changement, le voyage et les expériences variées. Talent : s'adapter à tout. Écueil : l'instabilité et la dispersion.",
  },
  {
    n: "6",
    titre: "Le Responsable",
    texte:
      "Sens du devoir, harmonie et dévouement. Le 6 se réalise dans le service, la famille et les métiers d'aide. Talent : prendre soin et équilibrer. Écueil : le sacrifice excessif de soi.",
  },
  {
    n: "7",
    titre: "Le Chercheur",
    texte:
      "Analyse, introspection et quête de sens. Le 7 cherche à comprendre en profondeur, souvent dans la science ou la spiritualité. Talent : réfléchir et approfondir. Écueil : l'isolement.",
  },
  {
    n: "8",
    titre: "L'Ambitieux",
    texte:
      "Sens des affaires, pouvoir et réussite matérielle. Le 8 vise les responsabilités et la réussite concrète. Talent : gérer et faire prospérer. Écueil : le matérialisme et la dureté.",
  },
  {
    n: "9",
    titre: "L'Humaniste",
    texte:
      "Générosité, idéalisme et ouverture au monde. Le 9 se tourne vers les causes collectives et l'art. Talent : donner et fédérer. Écueil : l'idéalisme déçu et la difficulté à lâcher prise.",
  },
];

const SECTIONS: { title: string; paras: string[] }[] = [
  {
    title: "Quel nom utiliser pour le calcul ?",
    paras: [
      "La règle classique est d'utiliser le nom complet figurant sur votre acte de naissance : tous vos prénoms et votre nom de famille de naissance. C'est ce nom d'origine qui porterait, selon la numérologie, votre vibration la plus profonde.",
      "Le nom d'usage (nom marital, prénom usuel, pseudonyme) peut aussi être analysé séparément : il refléterait l'énergie que vous projetez aujourd'hui. Beaucoup comparent les deux pour voir l'écart entre l'identité de naissance et l'image actuelle.",
      "En méthode pythagoricienne, on ne compte que les lettres A à Z. Les accents, traits d'union et espaces sont ignorés : « é » compte comme « e », et un prénom composé est traité comme une suite de lettres.",
    ],
  },
  {
    title: "Un exemple concret",
    paras: [
      "Prenons le prénom MARIE. On remplace chaque lettre par sa valeur : M=4, A=1, R=9, I=9, E=5. Total : 4+1+9+9+5 = 28, puis 2+8 = 10, puis 1+0 = 1.",
      "Le nombre d'expression de MARIE (prénom seul) est donc 1, l'Indépendant. Pour un calcul complet, on ajoute de la même façon toutes les lettres du nom de famille, puis on réduit le grand total. Le nombre du cœur ne garderait que les voyelles (A, I, E) et le nombre de personnalité que les consonnes (M, R).",
    ],
  },
  {
    title: "Pythagore et Chaldée : deux écoles",
    paras: [
      "La méthode utilisée ici est la numérologie pythagoricienne, la plus répandue en Occident : les lettres reçoivent une valeur de 1 à 9 dans l'ordre de l'alphabet.",
      "La numérologie chaldéenne, plus ancienne, attribue des valeurs différentes (de 1 à 8, le 9 étant considéré comme sacré) et ne se base pas sur l'ordre alphabétique. Les deux systèmes donnent souvent des résultats différents : il est normal de ne pas obtenir le même nombre selon la méthode choisie.",
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment calculer la numérologie de mon nom et prénom ?",
    a: "La numérologie pythagoricienne assigne une valeur numérique à chaque lettre (A=1, B=2, etc.). Pour calculer votre nombre d'expression, additionnez toutes les lettres de votre nom et prénom, puis réduisez le résultat à un chiffre (sauf 11, 22, 33 qui sont des nombres maîtres). Le nombre du cœur provient des voyelles uniquement, et le nombre de personnalité des consonnes.",
  },
  {
    q: "Quelle est la différence entre expression, cœur et personnalité en numérologie ?",
    a: "Le nombre d'expression (ou destinée) représente votre potentiel global et votre chemin de vie. Le nombre du cœur reflète vos désirs intimes, passions et motivations profondes. Le nombre de personnalité révèle comment les autres vous perçoivent et l'image que vous projetez au monde.",
  },
  {
    q: "Qu'est-ce qu'un nombre maître en numérologie ?",
    a: "Les nombres maîtres sont 11, 22 et 33. Ils possèdent une puissance vibratoire supérieure aux autres nombres. Le 11 représente l'intuition et la vision (maître intuitif), le 22 la manifestation et la construction (maître bâtisseur), et le 33 l'enseignement et le service (maître enseignant).",
  },
  {
    q: "Pourquoi la numérologie pythagoricienne utilise-t-elle ce tableau de lettres ?",
    a: "Le système pythagoricien associe chaque lettre à un nombre de 1 à 9 selon un ordre précis (A=1, J=1, S=1, etc.). Ce système remonte à la tradition grecque antique et suppose que les nombres et les lettres contiennent des vibrations énergétiques spécifiques qui influencent notre personnalité et notre destinée.",
  },
  {
    q: "Faut-il compter les accents et les traits d'union ?",
    a: "Non. En numérologie pythagoricienne, on ne retient que les 26 lettres de A à Z. Les accents sont ignorés (é, è, ê comptent comme e), tout comme les traits d'union, les apostrophes et les espaces des prénoms composés. Seules les lettres elles-mêmes ont une valeur.",
  },
  {
    q: "Quelle est la différence entre numérologie du nom et chemin de vie ?",
    a: "Le chemin de vie se calcule sur votre date de naissance et décrit la grande orientation de votre existence. La numérologie du nom (nombres d'expression, du cœur et de personnalité) se calcule sur les lettres de votre nom et révèle vos talents, vos motivations intimes et l'image que vous projetez. Les deux se complètent.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Numérologie Nom et Prénom" />
      <Breadcrumb currentPage="Numérologie Nom et Prénom" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-fuchsia-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ✨
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Numérologie Nom et Prénom
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Découvrez votre nombre d&apos;expression, votre nombre du cœur et votre
        nombre de personnalité. Méthode pythagoricienne gratuite.
      </p>

      <NumerologieNomPrenom />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Tableau de correspondance */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Tableau de correspondance lettres-chiffres (méthode pythagoricienne)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { num: 1, lettres: "A, J, S" },
            { num: 2, lettres: "B, K, T" },
            { num: 3, lettres: "C, L, U" },
            { num: 4, lettres: "D, M, V" },
            { num: 5, lettres: "E, N, W" },
            { num: 6, lettres: "F, O, X" },
            { num: 7, lettres: "G, P, Y" },
            { num: 8, lettres: "H, Q, Z" },
            { num: 9, lettres: "I, R" },
          ].map((item) => (
            <div
              key={item.num}
              className="bg-slate-50 rounded-xl p-4 flex items-center gap-3 border border-slate-200"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-white text-lg font-bold">
                {item.num}
              </div>
              <p className="text-sm font-semibold text-slate-700">
                {item.lettres}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section explicative */}
      <section className="mt-12 bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl border border-purple-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Les 3 nombres en numérologie
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-purple-900 mb-2">
              1. Nombre d&apos;Expression (Destinée)
            </h3>
            <p className="text-slate-700 leading-relaxed">
              Calculé en additionnant <strong>toutes les lettres</strong> (voyelles
              et consonnes) de votre nom et prénom. Ce nombre représente votre
              potentiel global, vos talents naturels et votre chemin de vie. Il
              révèle ce que vous êtes vraiment capable de réaliser.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-rose-900 mb-2">
              2. Nombre du Cœur (Âme ou Motivation)
            </h3>
            <p className="text-slate-700 leading-relaxed">
              Calculé avec les <strong>voyelles uniquement</strong> (A, E, I, O, U, Y).
              Il révèle vos désirs intimes, vos motivations profondes et votre
              monde émotionnel. C&apos;est votre essence cachée, ce que vous
              ressentez vraiment au plus profond de vous-même.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-amber-900 mb-2">
              3. Nombre de Personnalité (Expression Extérieure)
            </h3>
            <p className="text-slate-700 leading-relaxed">
              Calculé avec les <strong>consonnes uniquement</strong>. Ce nombre
              représente comment les autres vous perçoivent, l&apos;impression que
              vous donnez et votre personnage public. C&apos;est votre masque
              social et votre image extérieure.
            </p>
          </div>
        </div>
      </section>

      {/* Section nombres maitres */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Les nombres maîtres (11, 22, 33)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-6">
            <div className="w-12 h-12 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xl font-bold mb-3">
              11
            </div>
            <h3 className="text-lg font-bold text-indigo-900 mb-2">
              Maître Intuitif
            </h3>
            <p className="text-sm text-indigo-700 leading-relaxed">
              Visionnaire et intuitif, vous possédez une connexion profonde aux
              énergies invisibles. Vous avez une intuition remarquable et une
              mission élevée dans la vie.
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-3">
              22
            </div>
            <h3 className="text-lg font-bold text-blue-900 mb-2">
              Maître Bâtisseur
            </h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              Transformateur et réalisateur, vous avez le potentiel de concrétiser
              de grands projets et de transformer le monde. Puissant et
              responsable.
            </p>
          </div>

          <div className="bg-cyan-50 rounded-xl border border-cyan-200 p-6">
            <div className="w-12 h-12 rounded-lg bg-cyan-600 text-white flex items-center justify-center text-xl font-bold mb-3">
              33
            </div>
            <h3 className="text-lg font-bold text-cyan-900 mb-2">
              Maître Enseignant
            </h3>
            <p className="text-sm text-cyan-700 leading-relaxed">
              Communicateur et guide spirituel, vous avez une mission
              d&apos;enseignement et de service. Vous inspirez les autres et
              aidez à l&apos;évolution collective.
            </p>
          </div>
        </div>
      </section>

      {/* Signification des nombres d'expression */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Signification des nombres d&apos;expression (1 à 9)
        </h2>
        <div className="space-y-4">
          {NOMBRES.map((d) => (
            <div key={d.n} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
              <h3 className="font-bold text-slate-800 mb-1">
                Nombre {d.n} &mdash; {d.titre}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">{d.texte}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sections de contenu detaille (prose en chaines JS) */}
      {SECTIONS.map((section) => (
        <section
          key={section.title}
          className="mt-8 bg-white rounded-2xl border border-slate-200 p-8"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            {section.title}
          </h2>
          <div className="space-y-3">
            {section.paras.map((p, i) => (
              <p key={i} className="text-slate-600 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}

      {/* Disclaimer */}
      <section className="mt-12 bg-amber-50 rounded-2xl border border-amber-200 p-6">
        <p className="text-sm text-amber-900">
          <strong>Note :</strong> La numérologie pythagoricienne est utilisée à
          des fins d&apos;introspection personnelle et de développement
          spirituel. Elle est différente de la numérologie chaldéenne ou
          kabbalistique. Cette méthode n&apos;a pas de validation scientifique
          et ne doit pas être utilisée pour prendre des décisions importantes
          concernant votre santé ou votre vie.
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/numerologie-nom-prenom" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
