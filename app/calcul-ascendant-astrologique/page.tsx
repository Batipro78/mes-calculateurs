import type { Metadata } from "next";
import CalculateurAscendant from "./CalculateurAscendant";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-ascendant-astrologique" },
  title: "Calcul Ascendant Astrologique - Signe, Personnalite, Profil Astral",
  description:
    "Calculez votre signe astrologique, ascendant et personnalite. Entrez votre date et heure de naissance. Qualites, defauts, element, planete. Gratuit.",
  keywords:
    "calcul ascendant, ascendant astrologique, signe astrologique, calculer son ascendant, personnalite signe, profil astral, horoscope signe ascendant, quel est mon ascendant",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment calculer son ascendant astrologique ?",
    a: "L'ascendant depend de votre heure et lieu de naissance. Il correspond au signe du zodiaque qui se levait a l'horizon est au moment exact de votre naissance. L'ascendant change environ toutes les 2 heures, c'est pourquoi l'heure de naissance est essentielle pour le calculer.",
  },
  {
    q: "Quelle est la difference entre signe solaire et ascendant ?",
    a: "Le signe solaire (votre signe habituel) est determine par votre date de naissance et represente votre identite profonde. L'ascendant est determine par votre heure de naissance et represente votre apparence, la premiere impression que vous donnez aux autres.",
  },
  {
    q: "Pourquoi l'heure de naissance est-elle importante ?",
    a: "L'heure de naissance determine votre ascendant, qui change toutes les 2 heures environ. Deux personnes nees le meme jour mais a des heures differentes auront le meme signe solaire mais des ascendants differents, ce qui modifie significativement leur profil astrologique.",
  },
  {
    q: "Peut-on avoir un ascendant different de son signe solaire ?",
    a: "Oui, c'est meme la situation la plus courante. Le signe solaire est fixe pour toute personne nee le meme jour, tandis que l'ascendant depend de l'heure exacte de naissance. Un Belier peut tres bien avoir un ascendant Scorpion ou Verseau, ce qui nuance considerablement son profil astrologique.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Ascendant Astrologique" />
      <Breadcrumb currentPage="Ascendant Astrologique" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ♈
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Ascendant Astrologique
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Decouvrez votre signe, ascendant, personnalite, qualites et defauts. Entrez votre date et heure de naissance.
      </p>

      <CalculateurAscendant />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Les 12 signes du zodiaque</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { s: "\u2648 Belier", d: "21 mars - 19 avril", e: "Feu" },
            { s: "\u2649 Taureau", d: "20 avril - 20 mai", e: "Terre" },
            { s: "\u264A Gemeaux", d: "21 mai - 20 juin", e: "Air" },
            { s: "\u264B Cancer", d: "21 juin - 22 juillet", e: "Eau" },
            { s: "\u264C Lion", d: "23 juillet - 22 aout", e: "Feu" },
            { s: "\u264D Vierge", d: "23 aout - 22 sept.", e: "Terre" },
            { s: "\u264E Balance", d: "23 sept. - 22 oct.", e: "Air" },
            { s: "\u264F Scorpion", d: "23 oct. - 21 nov.", e: "Eau" },
            { s: "\u2650 Sagittaire", d: "22 nov. - 21 dec.", e: "Feu" },
            { s: "\u2651 Capricorne", d: "22 dec. - 19 janv.", e: "Terre" },
            { s: "\u2652 Verseau", d: "20 janv. - 18 fev.", e: "Air" },
            { s: "\u2653 Poissons", d: "19 fev. - 20 mars", e: "Eau" },
          ].map((z) => (
            <div key={z.s} className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-700">{z.s}</span>
              <div className="text-right">
                <span className="text-xs text-slate-400">{z.d}</span>
                <span className="ml-2 text-xs font-medium px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-600">{z.e}</span>
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Les 4 elements</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { e: "Feu", emoji: "🔥", signes: "Belier, Lion, Sagittaire", trait: "Energie, passion" },
            { e: "Terre", emoji: "🌍", signes: "Taureau, Vierge, Capricorne", trait: "Stabilite, pragmatisme" },
            { e: "Air", emoji: "💨", signes: "Gemeaux, Balance, Verseau", trait: "Intellect, communication" },
            { e: "Eau", emoji: "💧", signes: "Cancer, Scorpion, Poissons", trait: "Emotion, intuition" },
          ].map((el) => (
            <div key={el.e} className="bg-slate-50 rounded-xl p-3 text-center">
              <p className="text-2xl">{el.emoji}</p>
              <p className="text-sm font-bold text-slate-700 mt-1">{el.e}</p>
              <p className="text-xs text-slate-400 mt-1">{el.signes}</p>
              <p className="text-xs text-purple-600 mt-1">{el.trait}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Soleil, Lune et Ascendant : la trinite du theme astral</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          En astrologie, votre profil ne se resume pas a votre signe solaire. Trois reperes forment le coeur de
          votre <strong>theme astral</strong>, et c&apos;est leur combinaison qui dessine un portrait nuance.
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>Le Soleil</strong> (votre signe) : votre identite profonde, ce qui vous anime et vos aspirations</li>
          <li><strong>La Lune</strong> : votre monde emotionnel, votre sensibilite et vos reactions instinctives</li>
          <li><strong>L&apos;Ascendant</strong> : votre apparence, votre maniere d&apos;aborder le monde, la premiere impression que vous donnez</li>
        </ul>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Pourquoi l&apos;ascendant nuance tout</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Comme l&apos;ascendant change environ toutes les <strong>2 heures</strong>, deux personnes nees le meme
          jour peuvent avoir des personnalites tres differentes. Un Belier ascendant Cancer paraitra plus doux et
          reserve qu&apos;un Belier ascendant Lion, flamboyant et sur de lui. L&apos;ascendant agit comme un
          filtre a travers lequel s&apos;exprime l&apos;energie du signe solaire.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Les maisons astrologiques</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;ascendant marque le debut de la <strong>premiere maison</strong> et determine la position des
          douze maisons du theme, qui correspondent chacune a un domaine de vie (couple, travail, argent,
          famille...). C&apos;est pourquoi l&apos;heure de naissance exacte est indispensable a une lecture
          complete : sans elle, impossible de positionner ascendant et maisons.
        </p>
        <p className="text-slate-500 text-sm leading-relaxed">
          A noter : l&apos;astrologie est un loisir et un outil d&apos;introspection, sans valeur scientifique
          demontree. Ces interpretations sont proposees a titre de divertissement.
        </p>
      </section>

      <HowToJsonLd
        name="Calculer son signe et ascendant astrologique"
        steps={[
          { name: "Saisir la date de naissance", text: "Entrer le jour, le mois et l'année de naissance. Le signe solaire est determine par la date (ex : ne le 15 mars = Poissons, ne le 5 mai = Taureau)." },
          { name: "Saisir l'heure de naissance", text: "L ascendant correspond au signe qui se levait à l'horizon est au moment exact de la naissance. Il change environ toutes les 2 heures : une heure approximative suffit pour une estimation." },
          { name: "Lire le profil astral complet", text: "Le calculateur retourne le signe solaire (identite profonde), l'ascendant (apparence et première impression), l'élément (Feu, Terre, Air ou Eau) et les qualites et defauts associes." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentSlug="/calcul-ascendant-astrologique" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
