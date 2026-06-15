import type { Metadata } from "next";
import CalculSigneZodiaque from "./CalculSigneZodiaque";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import { SIGNES, ELEMENTS_INFO, MODES_INFO } from "./signeZodiaqueCalc";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-signe-zodiaque" },
  title: "Calcul Signe Zodiaque - Astrologie Occidentale 12 Signes",
  description:
    "Découvrez votre signe zodiaque (astrologie occidentale) selon votre date de naissance. Bélier, Taureau, Gémeaux, Cancer, Lion, Vierge, Balance, Scorpion, Sagittaire, Capricorne, Verseau, Poissons. Traits, élément, planète dominante.",
  keywords:
    "signe zodiaque, signe astrologique, belier taureau gemeaux cancer lion vierge balance scorpion sagittaire capricorne verseau poissons, element feu terre air eau, planete signe, astrologie occidentale, horoscope",
};

// Prose en chaines JS (guillemets doubles) pour eviter les soucis d'apostrophe.
const SECTIONS: { title: string; paras: string[] }[] = [
  {
    title: "Quels signes sont compatibles entre eux ?",
    paras: [
      "En astrologie occidentale, la compatibilité se lit d'abord par les éléments. Les signes de Feu (Bélier, Lion, Sagittaire) et d'Air (Gémeaux, Balance, Verseau) s'accordent bien : l'Air attise le Feu, comme l'oxygène nourrit la flamme. De leur côté, les signes de Terre (Taureau, Vierge, Capricorne) et d'Eau (Cancer, Scorpion, Poissons) forment des duos stables : l'Eau féconde la Terre.",
      "Deux signes du même élément se comprennent instinctivement, mais peuvent manquer de complémentarité. À l'inverse, Feu et Eau ou Terre et Air sont des combinaisons plus contrastées, qui demandent des ajustements.",
      "Les signes opposés sur la roue (Bélier-Balance, Taureau-Scorpion, Gémeaux-Sagittaire, etc.) exercent une forte attraction : ils sont à la fois très différents et profondément complémentaires, d'où des relations intenses.",
    ],
  },
  {
    title: "Soleil, Lune et Ascendant : votre trio astrologique",
    paras: [
      "Réduire l'astrologie à son seul signe solaire est trompeur. Un thème complet repose sur trois piliers. Le Soleil (votre signe usuel, calculé sur la date) décrit votre identité profonde et votre volonté.",
      "La Lune représente votre monde émotionnel, vos besoins intimes et vos réactions spontanées. L'Ascendant est le signe qui se levait à l'horizon à l'heure exacte de votre naissance : il décrit votre attitude extérieure et la première impression que vous donnez.",
      "C'est pourquoi deux personnes du même signe solaire peuvent sembler très différentes : leurs Lune et Ascendant diffèrent. Pour les connaître, il faut votre heure et votre lieu de naissance, en plus de la date.",
    ],
  },
  {
    title: "Pourquoi les dates des signes changent-elles d'une année à l'autre ?",
    paras: [
      "Les bornes des signes ne tombent pas toujours le même jour : le Bélier peut commencer le 20 ou le 21 mars selon les années. La raison est astronomique. Le zodiaque tropical est calé sur les saisons, et le Soleil entre dans chaque signe au moment où il atteint une position précise sur l'écliptique.",
      "Or l'année solaire dure environ 365,25 jours, d'où le décalage rattrapé par les années bissextiles. Le moment exact où le Soleil change de signe glisse donc de quelques heures chaque année. Si vous êtes né un jour de transition (un « cuspide »), seul le calcul à partir de l'année précise tranche votre signe.",
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quand change le signe zodiaque ?",
    a: "Le signe zodiaque change entre le 19 et le 23 de chaque mois selon l'astrologie occidentale tropicale. Les dates varient legerement chaque annee. Par exemple, le Belier va du 21 mars au 19 avril environ.",
  },
  {
    q: "Quels sont les 4 elements du zodiaque ?",
    a: "L'astrologie occidentale classe les 12 signes en 4 elements : Feu (Belier, Lion, Sagittaire), Terre (Taureau, Vierge, Capricorne), Air (Gemeaux, Balance, Verseau) et Eau (Cancer, Scorpion, Poissons). Chaque element apporte des traits de caractere distincts.",
  },
  {
    q: "Qu'est-ce que le mode en astrologie (Cardinal, Fixe, Mutable) ?",
    a: "Le mode decrit la dynamique d'un signe. Cardinal (Belier, Cancer, Balance, Capricorne) = initiative. Fixe (Taureau, Lion, Scorpion, Verseau) = stabilite. Mutable (Gemeaux, Vierge, Sagittaire, Poissons) = adaptabilite.",
  },
  {
    q: "Quelle est la difference entre signe solaire et ascendant ?",
    a: "Le signe solaire (base sur la date de naissance) decrit votre essence et identite. L'ascendant (signe levant a votre naissance) decrit comment vous etes percu par les autres. Pour connaitre votre ascendant, il faut l'heure et le lieu exacts de naissance.",
  },
  {
    q: "Quels sont les signes les plus compatibles ?",
    a: "Les meilleures affinités se trouvent généralement entre signes du même élément ou entre éléments amis : Feu avec Air, et Terre avec Eau. Par exemple, Bélier (Feu) s'entend bien avec Gémeaux ou Verseau (Air), et Taureau (Terre) avec Cancer ou Poissons (Eau). Ce ne sont que des tendances : un thème complet (Lune, Ascendant) nuance beaucoup la compatibilité réelle.",
  },
  {
    q: "Mon signe ne correspond pas à ma personnalité, pourquoi ?",
    a: "C'est fréquent et normal. Le signe solaire n'est qu'une partie du tableau. Votre Lune (émotions) et votre Ascendant (attitude extérieure) peuvent appartenir à des signes très différents et prendre le dessus dans votre comportement. Un thème astral complet, basé sur l'heure et le lieu de naissance, explique souvent ces écarts.",
  },
];

export default function Page() {
  const signesArray = Object.values(SIGNES);
  const elementsArray = Object.entries(ELEMENTS_INFO);
  const modesArray = Object.entries(MODES_INFO);

  return (
    <div>
      <WebAppJsonLd name="Calcul Signe Zodiaque - Astrologie Occidentale" />
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

      <section className="mt-8 bg-violet-50 rounded-2xl border border-violet-200 p-8">
        <h3 className="text-lg font-bold text-violet-900 mb-3">Disclaimer</h3>
        <p className="text-sm text-violet-800 leading-relaxed">
          Calcul basé sur l&apos;astrologie occidentale tropicale (cycle solaire). À des fins de divertissement et d&apos;introspection personnelle. Les signes astrologiques n&apos;ont aucune base scientifique prouvée et ne prédisent pas l&apos;avenir. Ils servent plutôt de miroir psychologique pour l&apos;auto-réflexion.
          <br />
          <strong>Sources:</strong> Tradition astrologique occidentale, astronomie tropicale.
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-signe-zodiaque" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
