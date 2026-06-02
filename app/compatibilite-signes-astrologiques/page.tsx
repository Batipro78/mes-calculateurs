import type { Metadata } from "next";
import CompatibiliteSignesAstro from "./CompatibiliteSignesAstro";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/compatibilite-signes-astrologiques" },
  title: "Compatibilité Signes Astrologiques - Amour et Couples",
  description:
    "Découvrez la compatibilité amoureuse entre deux signes astrologiques. Analyse complète basée sur les éléments (Feu, Terre, Air, Eau) et les modes (Cardinal, Fixe, Mutable).",
  keywords:
    "compatibilité signes astrologiques, couple astrologie, amour signe, bélier scorpion compatibilité, lion sagittaire, zodiaque occidental, amour astrologie",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment fonctionne la compatibilite astrologique ?",
    a: "La compatibilite astrologique occidentale se base sur les elements (Feu, Terre, Air, Eau). Les signes du meme element ou d'elements complementaires (Feu-Air, Terre-Eau) ont une meilleure affinite. Les elements opposes (Feu-Eau, Terre-Air) creent des tensions naturelles.",
  },
  {
    q: "Quels couples de signes sont les plus compatibles ?",
    a: "Les couples les plus compatibles sont entre signes de meme element : Belier-Lion-Sagittaire (Feu), Taureau-Vierge-Capricorne (Terre), Gemeaux-Balance-Verseau (Air), Cancer-Scorpion-Poissons (Eau). Le Belier-Lion, Lion-Sagittaire, et Scorpion-Poissons figurent parmi les meilleurs couples.",
  },
  {
    q: "Dois-je comparer uniquement mon signe solaire ?",
    a: "Non, pour une analyse plus precise, comparez aussi vos signes lunaires (emotions) et vos ascendants (apparence). La compatibilite globale depend de toute la carte du ciel (synastrie), pas seulement des signes solaires.",
  },
  {
    q: "Qu'est-ce que la synastrie astrologique ?",
    a: "La synastrie est la comparaison detaillee de deux cartes du ciel pour analyser la compatibilite d'un couple. Elle examine les aspects entre toutes les planetes, pas seulement les signes solaires, pour une vision globale de la relation.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Compatibilité Signes Astrologiques - Amour et Couples" />
      <Breadcrumb currentPage="Compatibilité Signes Astrologiques" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💕
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Compatibilité Signes Astrologiques - Amour et Couples
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Analysez la compatibilité amoureuse entre deux signes astrologiques.
        Basé sur les éléments et modes du zodiaque occidental.
      </p>

      <CompatibiliteSignesAstro />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les 4 éléments astrologiques
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          L&apos;astrologie occidentale repose sur 4 éléments : Feu, Terre, Air
          et Eau. Chaque signe appartient à un élément qui définit sa nature
          profonde et ses affinités.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Feu",
              emoji: "🔥",
              color: "from-red-600 to-orange-700",
              signes: "Bélier, Lion, Sagittaire",
              traits:
                "Passion, dynamisme, créativité, enthousiasme, impulsivité",
            },
            {
              name: "Terre",
              emoji: "🌍",
              color: "from-amber-600 to-yellow-700",
              signes: "Taureau, Vierge, Capricorne",
              traits:
                "Stabilité, pragmatisme, fiabilité, matérialité, prudence",
            },
            {
              name: "Air",
              emoji: "💨",
              color: "from-blue-600 to-cyan-700",
              signes: "Gémeaux, Balance, Verseau",
              traits:
                "Communication, intellect, curiosité, liberté, légèreté",
            },
            {
              name: "Eau",
              emoji: "💧",
              color: "from-teal-600 to-blue-700",
              signes: "Cancer, Scorpion, Poissons",
              traits:
                "Émotivité, intuition, sensibilité, profondeur, imagination",
            },
          ].map((element) => (
            <div
              key={element.name}
              className={`bg-gradient-to-br ${element.color} rounded-xl p-4 text-white`}
            >
              <p className="text-3xl mb-2">{element.emoji}</p>
              <h3 className="font-bold mb-2 text-lg">{element.name}</h3>
              <p className="text-xs opacity-90 mb-3">
                <strong>Signes:</strong> {element.signes}
              </p>
              <p className="text-xs opacity-85">{element.traits}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les 3 modes astrologiques
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Chaque signe possède aussi un mode : Cardinal (initiatif), Fixe
          (stable) ou Mutable (adaptable). Deux signes du même mode ont une
          meilleure compréhension.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              name: "Cardinal",
              emoji: "🚀",
              signes: "Bélier, Cancer, Balance, Capricorne",
              desc: "Leaders naturels, initiateurs, pionniers. Prennent les devants et lancent des projets.",
            },
            {
              name: "Fixe",
              emoji: "🏔️",
              signes: "Taureau, Lion, Scorpion, Verseau",
              desc: "Stables, fiables, persistants. Terminent ce qu&apos;ils commencent et loyaux.",
            },
            {
              name: "Mutable",
              emoji: "🌊",
              signes: "Gémeaux, Vierge, Sagittaire, Poissons",
              desc: "Flexibles, adaptables, communicatifs. S&apos;ajustent facilement aux changements.",
            },
          ].map((mode) => (
            <div
              key={mode.name}
              className="bg-slate-50 rounded-xl border border-slate-200 p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <p className="text-3xl">{mode.emoji}</p>
                <h3 className="font-bold text-lg text-slate-800">
                  {mode.name}
                </h3>
              </div>
              <p className="text-xs font-semibold text-slate-600 mb-3">
                <strong>Signes:</strong> {mode.signes}
              </p>
              <p className="text-sm text-slate-600">{mode.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Top 10 des couples les plus compatibles
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Voici les combinaisons de signes avec les meilleures affinités selon
          l&apos;astrologie occidentale.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Couple
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Compatibilité
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Éléments
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Raison
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  couple: "Bélier + Lion",
                  compat: "95%",
                  elements: "Feu + Feu",
                  reason: "Même élément, passion commune, complicité naturelle",
                },
                {
                  couple: "Lion + Sagittaire",
                  compat: "90%",
                  elements: "Feu + Feu",
                  reason:
                    "Même élément, aventure partagée, générosité mutuelle",
                },
                {
                  couple: "Gémeaux + Verseau",
                  compat: "92%",
                  elements: "Air + Air",
                  reason:
                    "Même élément, communication brillante, liberté d&apos;esprit",
                },
                {
                  couple: "Balance + Gémeaux",
                  compat: "90%",
                  elements: "Air + Air",
                  reason: "Même élément, harmonie intellectuelle, légèreté",
                },
                {
                  couple: "Cancer + Scorpion",
                  compat: "87%",
                  elements: "Eau + Eau",
                  reason:
                    "Même élément, profondeur émotionnelle, intuition partagée",
                },
                {
                  couple: "Scorpion + Poissons",
                  compat: "88%",
                  elements: "Eau + Eau",
                  reason: "Même élément, compréhension psychique, fusion émotionnelle",
                },
                {
                  couple: "Taureau + Cancer",
                  compat: "90%",
                  elements: "Terre + Eau",
                  reason: "Éléments complémentaires, sécurité, stabilité affective",
                },
                {
                  couple: "Vierge + Taureau",
                  compat: "88%",
                  elements: "Terre + Terre",
                  reason: "Même élément, pragmatisme, service mutuel",
                },
                {
                  couple: "Capricorne + Vierge",
                  compat: "87%",
                  elements: "Terre + Terre",
                  reason:
                    "Même élément, ambition partagée, discipline, responsabilité",
                },
                {
                  couple: "Bélier + Sagittaire",
                  compat: "89%",
                  elements: "Feu + Feu",
                  reason:
                    "Même élément, aventure sans limites, dynamisme débordant",
                },
              ].map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="py-3 px-2 font-semibold text-slate-700">
                    {row.couple}
                  </td>
                  <td className="py-3 px-2">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                      {row.compat}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-slate-600">{row.elements}</td>
                  <td className="py-3 px-2 text-slate-600 text-xs">
                    {row.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-blue-50 rounded-2xl border border-blue-200 p-8">
        <h3 className="text-lg font-bold text-blue-900 mb-3">
          Pourquoi Feu + Air = bonne compatibilité ?
        </h3>
        <p className="text-sm text-blue-800 leading-relaxed mb-3">
          Le Feu a besoin d&apos;Air pour s&apos;enflammer et brûler intensément.
          L&apos;Air se nourrit de l&apos;énergie du Feu. Ces deux éléments créent
          une dynamique où l&apos;un encourage l&apos;autre.
        </p>
        <p className="text-sm text-blue-800 leading-relaxed mb-3">
          <strong>Exemple:</strong> Un Sagittaire (Feu) adore l&apos;indépendance
          et les aventures. Un Verseau (Air) appreciates la liberté et les
          nouvelles perspectives. Ensemble, ils voyagent, explorent des idées
          nouvelles et se stimulent mutuellement.
        </p>
        <p className="text-sm text-blue-800 leading-relaxed">
          <strong>En contraste:</strong> Feu + Eau crée des tensions car
          l&apos;Eau éteint le Feu. C&apos;est pourquoi un Bélier (Feu) et un
          Cancer (Eau) doivent faire des efforts pour s&apos;entendre.
        </p>
      </section>

      <section className="mt-8 bg-amber-50 rounded-2xl border border-amber-200 p-8">
        <h3 className="text-lg font-bold text-amber-900 mb-3">Disclaimer</h3>
        <p className="text-sm text-amber-800 leading-relaxed mb-2">
          Cette compatibilité est basée sur l&apos;astrologie occidentale
          traditionnelle et les éléments classiques. À des fins de divertissement
          uniquement.
        </p>
        <p className="text-sm text-amber-800 leading-relaxed">
          <strong>Important:</strong> L&apos;astrologie ne peut pas prédire
          l&apos;issue d&apos;une relation. La véritable compatibilité dépend de
          la communication, du respect mutuel, de l&apos;engagement et de
          l&apos;amour. Une relation réussie entre signes &quot;incompatibles&quot;
          est tout à fait possible !
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentSlug="/compatibilite-signes-astrologiques" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
