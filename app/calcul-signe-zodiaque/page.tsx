import type { Metadata } from "next";
import CalculSigneZodiaque from "./CalculSigneZodiaque";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import { SIGNES, ELEMENTS_INFO, MODES_INFO } from "./signeZodiaqueCalc";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-signe-zodiaque" },
  title: "Calcul Signe Zodiaque - Astrologie Occidentale 12 Signes",
  description:
    "Découvrez votre signe zodiaque (astrologie occidentale) selon votre date de naissance. Bélier, Taureau, Gémeaux, Cancer, Lion, Vierge, Balance, Scorpion, Sagittaire, Capricorne, Verseau, Poissons. Traits, élément, planète dominante.",
  keywords:
    "signe zodiaque, signe astrologique, belier taureau gemeaux cancer lion vierge balance scorpion sagittaire capricorne verseau poissons, element feu terre air eau, planete signe, astrologie occidentale, horoscope",
};

export default function Page() {
  const signesArray = Object.values(SIGNES);
  const elementsArray = Object.entries(ELEMENTS_INFO);
  const modesArray = Object.entries(MODES_INFO);

  return (
    <div>
      <WebAppJsonLd name="Calcul Signe Zodiaque - Astrologie Occidentale" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quand change le signe zodiaque ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le signe zodiaque change entre le 19 et le 23 de chaque mois selon l&apos;astrologie occidentale tropicale. Les dates varient légèrement chaque année. Par exemple, le Bélier va du 21 mars au 19 avril environ.",
                },
              },
              {
                "@type": "Question",
                name: "Quels sont les 4 éléments du zodiaque ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L&apos;astrologie occidentale classe les 12 signes en 4 éléments : Feu (Bélier, Lion, Sagittaire), Terre (Taureau, Vierge, Capricorne), Air (Gémeaux, Balance, Verseau) et Eau (Cancer, Scorpion, Poissons). Chaque élément apporte des traits de caractère distincts.",
                },
              },
              {
                "@type": "Question",
                name: "Qu&apos;est-ce que le mode en astrologie (Cardinal, Fixe, Mutable) ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le mode décrit la dynamique d&apos;un signe. Cardinal (Bélier, Cancer, Balance, Capricorne) = initiative. Fixe (Taureau, Lion, Scorpion, Verseau) = stabilité. Mutable (Gémeaux, Vierge, Sagittaire, Poissons) = adaptabilité.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la différence entre signe solaire et levant (ascendant) ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le signe solaire (basé sur la date de naissance) décrit votre essence et identité. L&apos;ascendant (signe levant à votre naissance) décrit comment vous êtes perçu par les autres. Pour connaître votre ascendant, il faut l&apos;heure et le lieu exacts de naissance.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul Signe Zodiaque" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ✨
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Signe Zodiaque - Astrologie Occidentale 12 Signes
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Découvrez votre signe zodiaque tropical, élément, mode et planète dominante selon votre date de naissance. Astrologie occidentale classique.
      </p>

      <CalculSigneZodiaque />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les 12 signes du zodiaque occidental
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Le zodiaque occidental (tropical) compte 12 signes astrologiques basés sur le cycle solaire annuel. Chaque signe a ses propres traits de caractère, élément et planète dominante.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Signe
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Dates
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Élément
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Planète
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Traits principaux
                </th>
              </tr>
            </thead>
            <tbody>
              {signesArray.map((signe) => (
                <tr key={signe.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-2 font-semibold text-slate-700">
                    {signe.emoji} {signe.nom}
                  </td>
                  <td className="py-3 px-2 text-slate-600 text-xs">
                    {signe.dateDebut} - {signe.dateFin}
                  </td>
                  <td className="py-3 px-2 text-slate-700 font-medium">
                    {signe.element}
                  </td>
                  <td className="py-3 px-2 text-slate-600">
                    {signe.planete}
                  </td>
                  <td className="py-3 px-2 text-slate-600 text-xs">
                    {signe.traits.slice(0, 2).join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les 4 éléments du zodiaque
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Chaque signe est associé à un élément (Feu, Terre, Air, Eau). Ces éléments décrivent les tendances fondamentales et l&apos;approche de la vie de chaque signe.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {elementsArray.map(([elementName, elementData]) => (
            <div
              key={elementName}
              className={`bg-gradient-to-br ${elementName === "Feu" ? "from-red-600 to-orange-700" : elementName === "Terre" ? "from-amber-600 to-yellow-700" : elementName === "Air" ? "from-cyan-600 to-blue-700" : "from-blue-600 to-cyan-700"} rounded-xl p-4 text-white`}
            >
              <p className="text-3xl mb-2">{elementData.emoji}</p>
              <h3 className="font-bold mb-2">{elementName}</h3>
              <p className="text-sm opacity-90">
                {elementData.traits.slice(0, 2).join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les 3 modes astrologiques
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Le mode décrit la dynamique et l&apos;approche d&apos;un signe face à la vie : Cardinal (initiative), Fixe (stabilité) ou Mutable (adaptabilité).
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {modesArray.map(([modeName, modeData]) => (
            <div
              key={modeName}
              className="bg-slate-50 rounded-xl p-4 border border-slate-200"
            >
              <h3 className="font-bold text-slate-800 mb-3">{modeName}</h3>
              <div className="mb-4 space-y-1">
                {modeData.traits.slice(0, 2).map((trait, idx) => (
                  <p key={idx} className="text-sm text-slate-700">
                    • {trait}
                  </p>
                ))}
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Signes: {modeData.signes.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les 10 planètes en astrologie
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Chaque signe est gouverné par une ou deux planètes. Ces planètes apportent des qualités énergétiques distinctes et influencent votre personnalité.
        </p>
        <div className="grid gap-3">
          <p className="text-sm text-slate-700">
            <strong>Soleil ☀️</strong> — Essence, identité, volonté (Lion)
          </p>
          <p className="text-sm text-slate-700">
            <strong>Lune 🌙</strong> — Émotions, inconscient, intuition (Cancer)
          </p>
          <p className="text-sm text-slate-700">
            <strong>Mercure ☿️</strong> — Communication, intellect (Gémeaux, Vierge)
          </p>
          <p className="text-sm text-slate-700">
            <strong>Vénus ♀️</strong> — Amour, beauté, valeurs (Taureau, Balance)
          </p>
          <p className="text-sm text-slate-700">
            <strong>Mars ♂️</strong> — Énergie, passion, action (Bélier)
          </p>
          <p className="text-sm text-slate-700">
            <strong>Jupiter ♃</strong> — Expansion, chance, sagesse (Sagittaire)
          </p>
          <p className="text-sm text-slate-700">
            <strong>Saturne ♄</strong> — Discipline, limitation, karma (Capricorne)
          </p>
          <p className="text-sm text-slate-700">
            <strong>Uranus ♅</strong> — Innovation, rébellion, futur (Verseau)
          </p>
          <p className="text-sm text-slate-700">
            <strong>Neptune ♆</strong> — Rêves, spiritualité, illusion (Poissons)
          </p>
          <p className="text-sm text-slate-700">
            <strong>Pluton ♇</strong> — Transformation, pouvoir, mort (Scorpion)
          </p>
        </div>
      </section>

      <section className="mt-8 bg-violet-50 rounded-2xl border border-violet-200 p-8">
        <h3 className="text-lg font-bold text-violet-900 mb-3">Disclaimer</h3>
        <p className="text-sm text-violet-800 leading-relaxed">
          Calcul basé sur l&apos;astrologie occidentale tropicale (cycle solaire). À des fins de divertissement et d&apos;introspection personnelle. Les signes astrologiques n&apos;ont aucune base scientifique prouvée et ne prédisent pas l&apos;avenir. Ils servent plutôt de miroir psychologique pour l&apos;auto-réflexion.
          <br />
          <strong>Sources:</strong> Tradition astrologique occidentale, astronomie tropicale.
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-signe-zodiaque" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
