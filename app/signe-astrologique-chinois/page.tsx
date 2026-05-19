import type { Metadata } from "next";
import SigneAstrologiqueChinois from "./SigneAstrologiqueChinois";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/signe-astrologique-chinois" },
  title: "Signe Astrologique Chinois - Animal et Élément selon Année de Naissance",
  description:
    "Découvrez votre signe astrologique chinois et élément Wu Xing selon votre date de naissance. Rat, Buffle, Tigre, Dragon, Serpent, Cheval, Chèvre, Singe, Coq, Chien, Cochon. Compatibilité amoureuse.",
  keywords:
    "signe astrologique chinois, animal chinois, element wu xing, nouvel an chinois, horoscope chinois, zodiaque chinois, compatibilite astrologique",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Signe Astrologique Chinois - Animal et Élément Wu Xing" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quand change le signe astrologique chinois ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le signe astrologique chinois change au Nouvel An lunaire (entre janvier et février), pas au 1er janvier. Par exemple, si vous êtes né le 10 février 2024, vous appartenez à l&apos;année 2023 (Lapin d&apos;Eau), car le Nouvel An lunaire 2024 tombe le 10 février.",
                },
              },
              {
                "@type": "Question",
                name: "Qu&apos;est-ce que le cycle 60 ans en astrologie chinoise ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le cycle 60 ans combine les 12 animaux du zodiaque avec les 5 éléments Wu Xing (Bois, Feu, Terre, Métal, Eau). Cette combinaison (12 × 5) crée 60 combinaisons uniques qui se répètent tous les 60 ans. Par exemple, le Rat de Métal revient tous les 60 ans.",
                },
              },
              {
                "@type": "Question",
                name: "Quels sont les 12 animaux du zodiaque chinois ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les 12 animaux du zodiaque chinois dans l&apos;ordre sont : Rat, Buffle, Tigre, Lapin, Dragon, Serpent, Cheval, Chèvre, Singe, Coq, Chien et Cochon. Cet ordre est immuable depuis plus de 2000 ans.",
                },
              },
              {
                "@type": "Question",
                name: "Comment fonctionne la compatibilité entre signes chinois ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L&apos;astrologie chinoise repose sur les &apos;triades de compatibilité&apos;. Chaque animal a une triade de 3 signes avec lesquels il s&apos;entend naturellement. Par exemple, le Rat s&apos;entend bien avec le Dragon et le Singe. Cette harmonie est basée sur les cycles lunaires et les éléments.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Signe Astrologique Chinois" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-rose-600 to-red-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🐉
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Signe Astrologique Chinois - Animal et Élément Wu Xing
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Découvrez votre animal chinois et votre élément selon votre date de
        naissance. Calcul basé sur le Nouvel An lunaire.
      </p>

      <SigneAstrologiqueChinois />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les 12 animaux du zodiaque chinois
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Le zodiaque chinois compte 12 animaux qui se succèdent dans un cycle
          immuable depuis plus de 2000 ans. Chaque animal représente des traits
          de caractère spécifiques.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Animal
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Emoji
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Traits principaux
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Rat", emoji: "🐀", traits: "Sociable, intelligent, curieux" },
                { name: "Buffle", emoji: "🐂", traits: "Travailleur, patient, fiable" },
                { name: "Tigre", emoji: "🐯", traits: "Courageux, charismatique, généreux" },
                { name: "Lapin", emoji: "🐰", traits: "Diplomate, paisible, élégant" },
                { name: "Dragon", emoji: "🐉", traits: "Charismatique, ambitieux, visionnaire" },
                { name: "Serpent", emoji: "🐍", traits: "Sage, intuitif, mystérieux" },
                { name: "Cheval", emoji: "🐴", traits: "Indépendant, énergique, optimiste" },
                { name: "Chèvre", emoji: "🐐", traits: "Artistique, gentille, créative" },
                { name: "Singe", emoji: "🐵", traits: "Intelligent, malicieux, adaptable" },
                { name: "Coq", emoji: "🐓", traits: "Honnête, perfectionniste, fier" },
                { name: "Chien", emoji: "🐕", traits: "Loyal, juste, protecteur" },
                { name: "Cochon", emoji: "🐷", traits: "Sincère, généreux, optimiste" },
              ].map((animal) => (
                <tr key={animal.name} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-2 font-semibold text-slate-700">
                    {animal.name}
                  </td>
                  <td className="py-3 px-2 text-2xl">{animal.emoji}</td>
                  <td className="py-3 px-2 text-slate-600 text-sm">
                    {animal.traits}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les 5 éléments Wu Xing
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Chaque animal chinois est associé à un élément. Cette combinaison (12
          animaux × 5 éléments) crée un cycle de 60 années uniques.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {[
            {
              name: "Bois",
              emoji: "🌿",
              color: "from-green-600 to-emerald-700",
              traits: "Croissance, création, flexibilité",
            },
            {
              name: "Feu",
              emoji: "🔥",
              color: "from-red-600 to-orange-700",
              traits: "Passion, dynamisme, transformation",
            },
            {
              name: "Terre",
              emoji: "🌍",
              color: "from-amber-600 to-yellow-700",
              traits: "Stabilité, fiabilité, sagesse",
            },
            {
              name: "Métal",
              emoji: "⚙️",
              color: "from-slate-500 to-gray-700",
              traits: "Rigueur, clarté, force",
            },
            {
              name: "Eau",
              emoji: "💧",
              color: "from-blue-600 to-cyan-700",
              traits: "Sagesse, communication, adaptabilité",
            },
          ].map((element) => (
            <div
              key={element.name}
              className={`bg-gradient-to-br ${element.color} rounded-xl p-4 text-white`}
            >
              <p className="text-3xl mb-2">{element.emoji}</p>
              <h3 className="font-bold mb-2">{element.name}</h3>
              <p className="text-sm opacity-90">{element.traits}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Dates du Nouvel An lunaire 2024-2035
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Le signe chinois change le jour du Nouvel An lunaire. Voici les dates
          de changement pour les années à venir.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Année
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Date Nouvel An Lunaire
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Animal
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Élément
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { year: 2024, date: "10 février", animal: "Dragon", element: "Bois" },
                { year: 2025, date: "29 janvier", animal: "Serpent", element: "Bois" },
                { year: 2026, date: "17 février", animal: "Cheval", element: "Feu" },
                { year: 2027, date: "6 février", animal: "Chèvre", element: "Feu" },
                { year: 2028, date: "26 janvier", animal: "Singe", element: "Terre" },
                { year: 2029, date: "13 février", animal: "Coq", element: "Terre" },
                { year: 2030, date: "3 février", animal: "Chien", element: "Métal" },
                { year: 2031, date: "23 janvier", animal: "Cochon", element: "Métal" },
                { year: 2032, date: "11 février", animal: "Rat", element: "Eau" },
                { year: 2033, date: "31 janvier", animal: "Buffle", element: "Eau" },
                { year: 2034, date: "19 février", animal: "Tigre", element: "Bois" },
                { year: 2035, date: "8 février", animal: "Lapin", element: "Bois" },
              ].map((nyc) => (
                <tr key={nyc.year} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-2 font-bold text-slate-700">{nyc.year}</td>
                  <td className="py-3 px-2 text-slate-600">{nyc.date}</td>
                  <td className="py-3 px-2 font-semibold text-slate-700">
                    {nyc.animal}
                  </td>
                  <td className="py-3 px-2 text-slate-600">{nyc.element}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-blue-50 rounded-2xl border border-blue-200 p-8">
        <h3 className="text-lg font-bold text-blue-900 mb-3">Disclaimer</h3>
        <p className="text-sm text-blue-800 leading-relaxed">
          Calcul basé sur l&apos;astrologie traditionnelle chinoise et la
          classification des éléments Wu Xing. Les dates du Nouvel An lunaire
          peuvent varier légèrement selon les calendriers régionaux. Le signe
          chinois change à la date officielle du Nouvel An lunaire, pas le 1er
          janvier.
          <br />
          <strong>Sources:</strong> Tradition luni-solaire chinoise, Wikipedia,
          chine.in
        </p>
      </section>

      <RelatedCalculators currentSlug="/signe-astrologique-chinois" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}