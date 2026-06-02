import type { Metadata } from "next";
import CalculSigneLunaire from "./CalculSigneLunaire";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-signe-lunaire" },
  title: "Calcul Signe Lunaire - Lune en Astrologie, Emotions et Inconscient",
  description:
    "Découvrez votre signe lunaire à partir de votre date et heure de naissance. Lune en astrologie : émotions, inconscient, relation à la mère. Calcul gratuit et précis.",
  keywords:
    "signe lunaire, lune en astrologie, calculer signe lunaire, lune naissance, emotions astrologie, signe lune, inconscient astrologie, lune zodiaque",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment calculer son signe lunaire ?",
    a: "Le signe lunaire depend de votre date ET heure de naissance. La Lune parcourt le zodiaque en environ 27,3 jours, soit un signe tous les 2,3 jours. Notre calculateur determine votre signe lunaire en calculant la position de la Lune au moment exact de votre naissance.",
  },
  {
    q: "Quelle est la difference entre Soleil, Lune et Ascendant ?",
    a: "Le Soleil represente votre identite profonde et consciente. La Lune represente vos emotions, votre inconscient et votre intimite. L'Ascendant est votre apparence et la premiere impression que vous donnez aux autres. Ces trois elements forment la trinite astrologique complete.",
  },
  {
    q: "Pourquoi l'heure de naissance est-elle importante pour la Lune ?",
    a: "Parce que la Lune se deplace rapidement dans le zodiaque (un signe tous les 2,3 jours). Sans l'heure, on ne peut pas determiner precisement la position lunaire. Deux personnes nees le meme jour mais a des heures differentes peuvent avoir des signes lunaires differents.",
  },
  {
    q: "Que signifie avoir une Lune en Cancer ?",
    a: "Cancer est le signe de domicile de la Lune, son emplacement favori. Une Lune en Cancer indique une nature emotionnelle tres developpee, une grande intuition, une forte attache familiale et un besoin de securite affective et emotionnelle.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Signe Lunaire" />
      <Breadcrumb currentPage="Signe Lunaire" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-indigo-800 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🌙
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Signe Lunaire - Astrologie
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Découvrez votre signe lunaire, vos émotions et votre inconscient astrologique. Entrez votre date et heure de naissance.
      </p>

      <CalculSigneLunaire />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Les 12 signes lunaires du zodiaque</h2>
        <p className="text-slate-600 text-sm mb-6">
          Chaque signe lunaire gouverne un aspect différent de votre monde émotionnel et inconscient. Voici leurs caractéristiques principales :
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { sym: "♈", signe: "Belier", emotion: "Impulsive, ardente", relMere: "Dynamique, conflit" },
            { sym: "♉", signe: "Taureau", emotion: "Stable, sensuelle", relMere: "Fusionnelle, sécurité" },
            { sym: "♊", signe: "Gemeaux", emotion: "Changeante, intellectuelle", relMere: "Communication, échange" },
            { sym: "♋", signe: "Cancer", emotion: "Profonde, protectrice", relMere: "Intensité primordiale" },
            { sym: "♌", signe: "Lion", emotion: "Dramatique, généreuse", relMere: "Valorisation, reconnaissance" },
            { sym: "♍", signe: "Vierge", emotion: "Analytique, anxieuse", relMere: "Perfectionnisme, critique" },
            { sym: "♎", signe: "Balance", emotion: "Equilibrée, harmonieuse", relMere: "Justice, diplomatie" },
            { sym: "♏", signe: "Scorpion", emotion: "Intense, mystérieuse", relMere: "Secrets, complexité" },
            { sym: "♐", signe: "Sagittaire", emotion: "Optimiste, libre", relMere: "Indépendance émotionnelle" },
            { sym: "♑", signe: "Capricorne", emotion: "Contenue, responsable", relMere: "Distance, maturité" },
            { sym: "♒", signe: "Verseau", emotion: "Détachée, originale", relMere: "Non-conformisme, liberté" },
            { sym: "♓", signe: "Poissons", emotion: "Empathique, fusionnelle", relMere: "Symbiose, absorption" },
          ].map((z) => (
            <div key={z.signe} className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-slate-300 transition-colors">
              <p className="text-2xl mb-2">{z.sym}</p>
              <p className="font-bold text-slate-800 text-sm mb-2">{z.signe}</p>
              <div className="text-xs text-slate-600 space-y-1">
                <p><span className="font-semibold text-slate-700">Émotions :</span> {z.emotion}</p>
                <p><span className="font-semibold text-slate-700">Mère :</span> {z.relMere}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Comprendre la Lune en Astrologie</h2>
        <div className="space-y-6 text-slate-600 leading-relaxed">
          <div>
            <h3 className="font-bold text-slate-800 mb-2">Qu&apos;est-ce que le signe lunaire ?</h3>
            <p>
              Le signe lunaire est le signe du zodiaque occupé par la Lune au moment exact de votre naissance. Tandis que le Soleil représente votre moi conscient et extérieur, la Lune représente votre monde émotionnel intérieur, votre inconscient et vos besoins affectifs profonds.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 mb-2">La Lune, symbole de l&apos;inconscient</h3>
            <p>
              En astrologie, la Lune gouverne nos émotions, nos réactions instinctives, nos habitudes et notre lien primordial avec la mère. Elle influence notre sécurité affective, notre capacité à nourrir autrui et notre intuition. La Lune change de signe environ tous les 2,3 jours, ce qui explique pourquoi deux personnes nées le même jour peuvent avoir des émotionnalités radicalement différentes.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 mb-2">Domicile et exaltation lunaire</h3>
            <p>
              La Lune est domiciliée en Cancer, son signe favori. Une Lune en Cancer amplifie les qualités lunaires : sensibilité, intuition, protection, attachement familial. À l&apos;inverse, la Lune est en exil en Capricorne, ce qui peut rendre les émotions plus difficiles à exprimer et plus contrôlées.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 mb-2">Précision du calcul</h3>
            <p>
              Notre calcul est simplifié et offre une précision de ±1 signe selon l&apos;heure exacte de naissance. Pour une analyse astrologique professionnelle, consultez un astrologue qui pourra accéder à des tables éphémérides complètes et précises. Cet outil est conçu à des fins d&apos;introspection et de curiosité, non comme un diagnostic astrologique complet.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">La trinité astrologique</h2>
        <p className="text-slate-600 text-sm mb-6">
          Pour une compréhension complète de votre profil astrologique, analysez ces trois éléments ensemble :
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <div className="text-3xl mb-3">☉</div>
            <h3 className="font-bold text-yellow-900 mb-2">Soleil</h3>
            <p className="text-sm text-yellow-800">Votre identité consciente, votre essence profonde, ce que vous êtes vraiment.</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
            <div className="text-3xl mb-3">☽</div>
            <h3 className="font-bold text-indigo-900 mb-2">Lune</h3>
            <p className="text-sm text-indigo-800">Votre monde émotionnel intérieur, votre inconscient, vos besoins affectifs.</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <div className="text-3xl mb-3">↑</div>
            <h3 className="font-bold text-purple-900 mb-2">Ascendant</h3>
            <p className="text-sm text-purple-800">Votre apparence, votre style, la première impression que vous donnez.</p>
          </div>
        </div>
      </section>

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-signe-lunaire" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
