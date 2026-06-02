import type { Metadata } from "next";
import NumerologieNomPrenom from "./NumerologieNomPrenom";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/numerologie-nom-prenom" },
  title: "Numerologie Nom et Prenom - Nombre Expression Coeur Personnalite",
  description:
    "Calculez votre numerologie nom et prenom avec la methode pythagoricienne. Nombres d'expression, du cœur et de personnalite. Significations et interpretations completes.",
  keywords:
    "numerologie nom prenom, nombre expression, nombre coeur, nombre personnalite, numerologie pythagore, calcul numerologie, numerologie gratuit, destinee numerologie",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment calculer la numerologie de mon nom et prenom ?",
    a: "La numerologie pythagoricienne assigne une valeur numerique a chaque lettre (A=1, B=2, etc.). Pour calculer votre nombre d'expression, additionnez toutes les lettres de votre nom et prenom, puis reduisez le resultat a un chiffre (sauf 11, 22, 33 qui sont des nombres maitres). Le nombre du coeur provient des voyelles uniquement, et le nombre de personnalite des consonnes.",
  },
  {
    q: "Quelle est la difference entre expression, coeur et personnalite en numerologie ?",
    a: "Le nombre d'expression (ou destinee) represente votre potentiel global et votre chemin de vie. Le nombre du coeur reflète vos desirs intimes, passions et motivations profondes. Le nombre de personnalite revele comment les autres vous percevez et l'image que vous projetez au monde.",
  },
  {
    q: "Qu'est-ce qu'un nombre maitre en numerologie ?",
    a: "Les nombres maitres sont 11, 22 et 33. Ils possedent une puissance vibratoire superieure aux autres nombres. Le 11 represente l'intuition et la vision (maitre intuitif), le 22 la manifestation et la construction (maitre bâtisseur), et le 33 l'enseignement et le service (maitre enseignant).",
  },
  {
    q: "Pourquoi la numerologie pythagoricienne utilise-t-elle ce tableau de lettres ?",
    a: "Le systeme pythagoricien associe chaque lettre a un nombre de 1 a 9 selon un ordre precis (A=1, J=1, S=1, etc.). Ce systeme remonte a la tradition grecque antique et suppose que les nombres et les lettres contiennent des vibrations energetiques specifiques qui influencent notre personnalite et notre destinee.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Numerologie Nom et Prenom" />
      <Breadcrumb currentPage="Numerologie Nom et Prenom" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-fuchsia-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ✨
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Numerologie Nom et Prenom
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Decouvrez votre numero d&apos;expression, votre nombre du cœur et votre
        nombre de personnalite. Methode pythagoricienne gratuite.
      </p>

      <NumerologieNomPrenom />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Tableau de correspondance */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Tableau de correspondance lettres-chiffres (Methode pythagoricienne)
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
          Les 3 nombres en numerologie
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-purple-900 mb-2">
              1. Nombre d&apos;Expression (Destinee)
            </h3>
            <p className="text-slate-700 leading-relaxed">
              Calculé en additionnant <strong>toutes les lettres</strong> (voyelles
              et consonnes) de votre nom et prenom. Ce nombre represente votre
              potentiel global, vos talents naturels et votre chemin de vie. Il
              revele ce que vous etes vraiment capable de realiser.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-rose-900 mb-2">
              2. Nombre du Cœur (Âme ou Motivation)
            </h3>
            <p className="text-slate-700 leading-relaxed">
              Calculé avec les <strong>voyelles uniquement</strong> (A, E, I, O, U, Y).
              Il revele vos desirs intimes, vos motivations profondes et votre
              monde emotionnel. C&apos;est votre essence cachee, ce que vous
              sentez vraiment au plus profond de vous-même.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-amber-900 mb-2">
              3. Nombre de Personnalite (Expression Exterieure)
            </h3>
            <p className="text-slate-700 leading-relaxed">
              Calculé avec les <strong>consonnes uniquement</strong>. Ce nombre
              represente comment les autres vous percevez, l&apos;impression que
              vous donnez et votre personnage public. C&apos;est votre masque
              social et votre image exterieure.
            </p>
          </div>
        </div>
      </section>

      {/* Section nombres maitres */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Les nombres maitres (11, 22, 33)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-6">
            <div className="w-12 h-12 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xl font-bold mb-3">
              11
            </div>
            <h3 className="text-lg font-bold text-indigo-900 mb-2">
              Maitre Intuitif
            </h3>
            <p className="text-sm text-indigo-700 leading-relaxed">
              Visionnaire et intuitif, vous possedez une connexion profonde aux
              energies invisibles. Vous avez une intuition remarquable et une
              mission elevee dans la vie.
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-3">
              22
            </div>
            <h3 className="text-lg font-bold text-blue-900 mb-2">
              Maitre Bâtisseur
            </h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              Transformateur et manifesteur, vous avez le potentiel de realiser
              de grands projets et de transformer le monde. Puissant et
              responsable.
            </p>
          </div>

          <div className="bg-cyan-50 rounded-xl border border-cyan-200 p-6">
            <div className="w-12 h-12 rounded-lg bg-cyan-600 text-white flex items-center justify-center text-xl font-bold mb-3">
              33
            </div>
            <h3 className="text-lg font-bold text-cyan-900 mb-2">
              Maitre Enseignant
            </h3>
            <p className="text-sm text-cyan-700 leading-relaxed">
              Communicateur et guide spirituel, vous avez une mission
              d&apos;enseignement et de service. Vous inspirez les autres et
              aidez a l&apos;evolution collective.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mt-12 bg-amber-50 rounded-2xl border border-amber-200 p-6">
        <p className="text-sm text-amber-900">
          <strong>Note :</strong> La numerologie pythagoricienne est utilisee a
          des fins d&apos;introspection personnelle et de developpement
          spirituel. Elle est differente de la numerologie chaldéenne ou
          kabbalistique. Cette methode n&apos;a pas de validation scientifique
          et ne doit pas etre utilisée pour prendre des decisions importantes
          concernant votre sante ou votre vie.
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/numerologie-nom-prenom" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
