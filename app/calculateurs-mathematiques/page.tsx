import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculateurs Mathematiques Gratuits 2026 - Pourcentage, Moyenne, Geometrie",
  description: "Calculez pourcentages, moyennes, PGCD, PPCM, racine carree, surface du cercle, volume du cylindre, produit en croix. Outils mathematiques gratuits en ligne.",
  keywords: "calcul pourcentage, calcul moyenne, PGCD PPCM, racine carree, surface cercle, volume cylindre, produit en croix, calculatrice en ligne",
};

const calculateurs = [
  { slug: "/calcul-pourcentage", titre: "Calcul Pourcentage", emoji: "📊", desc: "Calculez un pourcentage, une augmentation, une reduction ou un ratio facilement.", gradient: "from-orange-400 to-amber-500" },
  { slug: "/calcul-moyenne", titre: "Calcul Moyenne", emoji: "🎓", desc: "Calculez la moyenne simple ou ponderee de vos notes ou valeurs.", gradient: "from-violet-400 to-purple-500" },
  { slug: "/produit-en-croix", titre: "Produit en Croix", emoji: "✖️", desc: "Resolvez une regle de trois en un clic avec le produit en croix.", gradient: "from-sky-400 to-blue-500" },
  { slug: "/calcul-pgcd-ppcm", titre: "PGCD / PPCM", emoji: "🔢", desc: "Trouvez le plus grand diviseur commun et le plus petit multiple commun.", gradient: "from-purple-400 to-violet-500" },
  { slug: "/calcul-racine-carree", titre: "Racine Carree", emoji: "√", desc: "Calculez la racine carree de n'importe quel nombre instantanement.", gradient: "from-amber-400 to-orange-500" },
  { slug: "/calcul-surface-cercle", titre: "Surface du Cercle", emoji: "⭕", desc: "Calculez l'aire et le perimetre d'un cercle a partir du rayon ou diametre.", gradient: "from-blue-400 to-cyan-500" },
  { slug: "/calcul-volume-cylindre", titre: "Volume du Cylindre", emoji: "🛢️", desc: "Calculez le volume et la surface d'un cylindre pour vos projets.", gradient: "from-teal-400 to-emerald-500" },
  { slug: "/calcul-duree-entre-dates", titre: "Duree Entre Dates", emoji: "📆", desc: "Calculez le nombre de jours, semaines ou mois entre deux dates.", gradient: "from-fuchsia-400 to-pink-500" },
];

const faqData = [
  { question: "Comment calculer un pourcentage d'augmentation ?", answer: "La formule est : ((nouvelle valeur - ancienne valeur) / ancienne valeur) x 100. Par exemple, un prix passant de 80€ a 100€ represente une augmentation de ((100-80)/80) x 100 = 25%." },
  { question: "Quelle est la difference entre PGCD et PPCM ?", answer: "Le PGCD (Plus Grand Commun Diviseur) est le plus grand nombre qui divise deux nombres sans reste. Le PPCM (Plus Petit Commun Multiple) est le plus petit nombre divisible par les deux nombres. Par exemple, pour 12 et 18 : PGCD = 6, PPCM = 36." },
  { question: "Comment fonctionne le produit en croix ?", answer: "Le produit en croix resout les proportions : si A/B = C/D, alors A×D = B×C. Exemple : si 3 kg coutent 12€, combien coutent 5 kg ? On pose 3/12 = 5/x, donc x = (12×5)/3 = 20€." },
];

export default function CalculateursMathematiques() {
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
          Calculateurs Mathematiques Gratuits
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Pourcentages, moyennes, geometrie, arithmetique : tous les outils de calcul pour le quotidien et les etudes.
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
        <h2>Des outils de calcul simples et rapides</h2>
        <p>Besoin de calculer un <a href="/calcul-pourcentage" className="text-blue-600 hover:underline">pourcentage</a> rapidement ou de verifier un <a href="/produit-en-croix" className="text-blue-600 hover:underline">produit en croix</a> ? Nos calculateurs mathematiques sont concus pour etre accessibles a tous, du collegien au professionnel.</p>
        <p>Pour vos calculs financiers, consultez nos <a href="/calculateurs-finance" className="text-blue-600 hover:underline">calculateurs finance &amp; impots</a>.</p>
        <h3>Voir aussi</h3>
        <ul>
          <li><a href="/convertisseurs" className="text-blue-600 hover:underline">Convertisseurs</a> — temperature, poids, longueur, devises</li>
          <li><a href="/calculateurs-finance" className="text-blue-600 hover:underline">Calculateurs Finance</a> — TVA, pourcentage, interet compose</li>
          <li><a href="/calculateurs-nutrition" className="text-blue-600 hover:underline">Calculateurs Nutrition</a> — calories, macros, IMC</li>
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
