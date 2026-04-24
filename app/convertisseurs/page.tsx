import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/convertisseurs" },
  title: "Convertisseurs Gratuits 2026 - Temperature, Poids, Longueur, Devises",
  description: "Convertissez facilement temperatures (°C/°F/K), poids (kg/lbs), longueurs (cm/pouces/pieds), devises (EUR/USD). Convertisseurs en ligne gratuits et precis.",
  keywords: "convertisseur temperature, convertisseur poids, convertisseur longueur, convertisseur devises, conversion celsius fahrenheit, kg en livres, cm en pouces",
};

const calculateurs = [
  { slug: "/conversion-temperature", titre: "Conversion Temperature", emoji: "🌡️", desc: "Convertissez entre Celsius, Fahrenheit et Kelvin instantanement.", gradient: "from-blue-400 to-indigo-500" },
  { slug: "/conversion-poids", titre: "Conversion Poids", emoji: "⚖️", desc: "Convertissez kilogrammes, livres, onces, grammes et autres unites de masse.", gradient: "from-emerald-400 to-teal-500" },
  { slug: "/conversion-longueur", titre: "Conversion Longueur", emoji: "📏", desc: "Convertissez centimetres, pouces, pieds, metres et autres unites de longueur.", gradient: "from-orange-400 to-amber-500" },
  { slug: "/convertisseur-devises", titre: "Convertisseur Devises", emoji: "💱", desc: "Convertissez entre les principales devises mondiales (EUR, USD, GBP, CHF...).", gradient: "from-sky-400 to-blue-500" },
  { slug: "/calcul-cout-kilometrique", titre: "Cout Kilometrique", emoji: "🚙", desc: "Calculez le cout reel de vos trajets au kilometre.", gradient: "from-cyan-400 to-teal-500" },
  { slug: "/calcul-consommation-essence", titre: "Consommation Essence", emoji: "⛽", desc: "Calculez votre consommation de carburant en L/100km.", gradient: "from-red-400 to-rose-500" },
];

const faqData = [
  { question: "Comment convertir des Celsius en Fahrenheit ?", answer: "La formule est : °F = (°C × 9/5) + 32. Par exemple, 20°C = (20 × 9/5) + 32 = 68°F. A retenir : 0°C = 32°F (gel de l'eau) et 100°C = 212°F (ebullition)." },
  { question: "Combien de livres dans un kilogramme ?", answer: "1 kilogramme = 2,20462 livres (lbs). Inversement, 1 livre = 0,453592 kg. Pour une approximation rapide, multipliez les kg par 2,2." },
  { question: "Comment convertir des pouces en centimetres ?", answer: "1 pouce (inch) = 2,54 cm exactement. Pour convertir des pouces en cm, multipliez par 2,54. Par exemple, un ecran de 27 pouces mesure 27 × 2,54 = 68,58 cm de diagonale." },
];

export default function Convertisseurs() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
          Convertisseurs Gratuits en Ligne
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Temperatures, poids, longueurs, devises, carburant : convertissez toutes les unites simplement et sans inscription.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {calculateurs.map((c) => (
          <a key={c.slug} href={c.slug} className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg border border-slate-200 overflow-hidden transition-all duration-200 hover:-translate-y-1">
            <div className={`h-2 bg-gradient-to-r ${c.gradient}`} />
            <div className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{c.emoji}</span>
                <h2 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{c.titre}</h2>
              </div>
              <p className="text-sm text-slate-500">{c.desc}</p>
            </div>
          </a>
        ))}
      </div>

      <section className="prose prose-slate max-w-none mb-12">
        <h2>Des conversions rapides pour le quotidien</h2>
        <p>Que ce soit pour la cuisine, le voyage ou le travail, nos <a href="/conversion-temperature" className="text-blue-600 hover:underline">convertisseurs de temperature</a>, <a href="/conversion-poids" className="text-blue-600 hover:underline">de poids</a> et <a href="/conversion-longueur" className="text-blue-600 hover:underline">de longueur</a> vous donnent des resultats instantanes.</p>
        <p>Pour vos deplacements, combinez avec le <a href="/calcul-consommation-essence" className="text-blue-600 hover:underline">calcul de consommation d'essence</a> et le <a href="/calcul-indemnites-kilometriques" className="text-blue-600 hover:underline">bareme des indemnites kilometriques</a>.</p>
        <h3>Voir aussi</h3>
        <ul>
          <li><a href="/calculateurs-mathematiques" className="text-blue-600 hover:underline">Calculateurs Mathematiques</a> — pourcentage, moyenne, geometrie</li>
          <li><a href="/calculateurs-finance" className="text-blue-600 hover:underline">Calculateurs Finance</a> — TVA, devises, inflation</li>
          <li><a href="/calculateurs-nutrition" className="text-blue-600 hover:underline">Calculateurs Nutrition</a> — poids ideal, IMC, calories</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Questions frequentes</h2>
        <div className="space-y-4">
          {faqData.map((f, i) => (
            <details key={i} className="bg-white rounded-xl border border-slate-200 p-5 group">
              <summary className="font-semibold text-slate-800 cursor-pointer group-open:mb-3">{f.question}</summary>
              <p className="text-slate-600 text-sm">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
