import type { Metadata } from "next";
import CalculateurAscendant from "./CalculateurAscendant";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Calcul Ascendant Astrologique - Signe, Personnalite, Profil Astral",
  description:
    "Calculez votre signe astrologique, ascendant et personnalite. Entrez votre date et heure de naissance. Qualites, defauts, element, planete. Gratuit.",
  keywords:
    "calcul ascendant, ascendant astrologique, signe astrologique, calculer son ascendant, personnalite signe, profil astral, horoscope signe ascendant, quel est mon ascendant",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Ascendant Astrologique" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Comment calculer son ascendant astrologique ?",
            acceptedAnswer: { "@type": "Answer", text: "L'ascendant depend de votre heure et lieu de naissance. Il correspond au signe du zodiaque qui se levait a l'horizon est au moment exact de votre naissance. L'ascendant change environ toutes les 2 heures, c'est pourquoi l'heure de naissance est essentielle pour le calculer." } },
          { "@type": "Question", name: "Quelle est la difference entre signe solaire et ascendant ?",
            acceptedAnswer: { "@type": "Answer", text: "Le signe solaire (votre signe habituel) est determine par votre date de naissance et represente votre identite profonde. L'ascendant est determine par votre heure de naissance et represente votre apparence, la premiere impression que vous donnez aux autres." } },
          { "@type": "Question", name: "Pourquoi l'heure de naissance est-elle importante ?",
            acceptedAnswer: { "@type": "Answer", text: "L'heure de naissance determine votre ascendant, qui change toutes les 2 heures environ. Deux personnes nees le meme jour mais a des heures differentes auront le meme signe solaire mais des ascendants differents, ce qui modifie significativement leur profil astrologique." } },
        ]
      }) }} />
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

      <RelatedCalculators currentSlug="/calcul-ascendant-astrologique" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
