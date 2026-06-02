import type { Metadata } from "next";
import CalculCheminDeVie from "./CalculCheminDeVie";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-chemin-de-vie" },
  title:
    "Calcul Chemin de Vie Numérologie - 9 Nombres + Maîtres 11/22/33",
  description:
    "Calculez votre chemin de vie en numérologie pythagoricienne. Découvrez votre nombre de destinée (1-9 ou maîtres 11, 22, 33), votre personnalité, forces, faiblesses et métiers. Gratuit.",
  keywords:
    "chemin de vie, numérologie, nombre chemin de vie, numérologie pythagoricienne, nombre destinée, maître 11 22 33, calcul nombre vie, personnalité numérologie",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment calculer mon chemin de vie en numérologie ?",
    a: "Le chemin de vie se calcule en additionnant tous les chiffres de votre date de naissance (jour, mois, année) jusqu'à obtenir un chiffre unique entre 1 et 9, ou un nombre maître (11, 22, 33). Par exemple : 15 octobre 1990 = 1+5+1+0+1+9+9+0 = 26 = 2+6 = 8.",
  },
  {
    q: "Qu'est-ce qu'un nombre maître en numérologie ?",
    a: "Les nombres maîtres (11, 22, 33) ne sont pas réduits à un chiffre unique en numérologie pythagoricienne. Ils représentent des niveaux de conscience et de spiritualité élevés. Le 11 est l'inspiration spirituelle, le 22 est la manifestation concrète, et le 33 est le service à l'humanité.",
  },
  {
    q: "Que signifie chaque chemin de vie ?",
    a: "Chaque chemin de vie (1-9 + maîtres) révèle votre destinée, vos forces, vos faiblesses, et votre mission de vie. Le 1 est le pionnier, le 2 le médiateur, le 3 l'artiste, etc. Les maîtres apportent une dimension spirituelle supplémentaire.",
  },
  {
    q: "Comment utiliser mon chemin de vie au quotidien ?",
    a: "Votre chemin de vie peut vous aider à mieux comprendre votre personnalité, à identifier vos talents naturels, à choisir des carrières alignées avec votre destinée, et à surmonter vos défis. C'est un outil d'introspection et de développement personnel.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Chemin de Vie Numérologie" />
      <Breadcrumb currentPage="Chemin de Vie" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🔮
        </div>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent">
          Calcul Chemin de Vie Numérologie
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Découvrez votre nombre de destinée (1-9 ou maîtres 11, 22, 33) selon la
        numérologie pythagoricienne. Entrez votre date de naissance pour révéler
        votre chemin de vie.
      </p>

      <CalculCheminDeVie />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Les 9 chemins de vie + 3 maîtres
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              n: 1,
              nom: "Le Pionnier",
              emoji: "🚀",
              trait: "Leader, indépendant, créatif",
            },
            {
              n: 2,
              nom: "Le Médiateur",
              emoji: "🤝",
              trait: "Diplomate, sensible, coopératif",
            },
            {
              n: 3,
              nom: "L'Artiste",
              emoji: "🎨",
              trait: "Créatif, expressif, sociable",
            },
            {
              n: 4,
              nom: "Le Bâtisseur",
              emoji: "🏗️",
              trait: "Travailleur, organisé, stable",
            },
            {
              n: 5,
              nom: "L'Aventurier",
              emoji: "🌍",
              trait: "Libre, curieux, adaptable",
            },
            {
              n: 6,
              nom: "Le Protecteur",
              emoji: "❤️",
              trait: "Famille, responsable, aimant",
            },
            {
              n: 7,
              nom: "Le Sage",
              emoji: "📖",
              trait: "Spirituel, introspectif, mystique",
            },
            {
              n: 8,
              nom: "Le Magnat",
              emoji: "💎",
              trait: "Pouvoir, succès, ambition",
            },
            {
              n: 9,
              nom: "L'Humaniste",
              emoji: "🌟",
              trait: "Altruiste, universel, idéaliste",
            },
            {
              n: 11,
              nom: "Maître Intuitif",
              emoji: "✨",
              trait: "Inspiration, vision spirituelle",
            },
            {
              n: 22,
              nom: "Maître Bâtisseur",
              emoji: "👑",
              trait: "Manifestation, réalisation",
            },
            {
              n: 33,
              nom: "Maître Enseignant",
              emoji: "🙏",
              trait: "Service à l'humanité, conscience",
            },
          ].map((c) => (
            <div
              key={c.n}
              className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{c.emoji}</span>
                <div>
                  <p className="font-bold text-slate-800">{c.nom}</p>
                  <p className="text-xs text-purple-600 font-semibold">#{c.n}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">{c.trait}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          📐 Méthode Pythagoricienne
        </h2>
        <div className="space-y-4">
          <p className="text-slate-700">
            La numérologie pythagoricienne réduit la date de naissance à un seul
            chiffre (de 1 à 9) ou à un nombre maître (11, 22, 33). Voici les
            étapes :
          </p>
          <ol className="list-decimal list-inside space-y-2 text-slate-600">
            <li>
              Écrivez votre date complète (jour + mois + année) en chiffres
            </li>
            <li>Additionnez tous les chiffres entre eux</li>
            <li>
              Si le résultat est un nombre à deux chiffres, additionnez à
              nouveau (exemple : 26 = 2+6 = 8)
            </li>
            <li>
              EXCEPTION : arrêtez si vous obtenez 11, 22 ou 33 (nombres maîtres)
            </li>
            <li>Le chiffre final est votre chemin de vie</li>
          </ol>

          <div className="bg-white rounded-xl p-6 border border-purple-200 mt-6">
            <h3 className="font-bold text-slate-800 mb-3">Exemple :</h3>
            <p className="text-sm text-slate-700 font-mono">
              Date : 15 octobre 1990
              <br />
              Calcul : 1 + 5 + 1 + 0 + 1 + 9 + 9 + 0 = 26
              <br />
              Réduit : 2 + 6 = 8
              <br />
              <strong>Résultat : Chemin de Vie 8 (Le Magnat)</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-blue-50 rounded-2xl border border-blue-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">⚠️ Disclaimer</h2>
        <p className="text-slate-700 text-sm leading-relaxed">
          Ce calculateur utilise les principes de la numérologie pythagoricienne
          à titre informatif et d'introspection personnelle. Les résultats
          doivent être considérés comme des outils de réflexion et de
          développement personnel, et non comme des vérités absolues ou des
          directives de vie. La numérologie fait partie des pratiques
          ésotériques et ne remplace en aucun cas un conseil professionnel
          (médical, juridique, financier).
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentSlug="/calcul-chemin-de-vie" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
