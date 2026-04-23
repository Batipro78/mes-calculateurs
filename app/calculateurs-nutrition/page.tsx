import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculateurs Sante & Nutrition Gratuits 2026 - IMC, Calories, Macros",
  description: "Calculez votre metabolisme de base, apport en proteines, macros, besoin en eau, indice glycemique, risque cardiovasculaire. Outils sante et nutrition gratuits.",
  keywords: "calculateur nutrition, metabolisme de base, calcul proteines, macros nutrition, besoin eau, indice glycemique, risque cardiovasculaire, age metabolique, BMR",
};

const calculateurs = [
  { slug: "/calcul-imc", titre: "Calcul IMC", emoji: "⚖️", desc: "Calculez votre indice de masse corporelle et interpretez votre resultat.", gradient: "from-rose-400 to-pink-500" },
  { slug: "/calcul-calories", titre: "Calcul Calories (TDEE)", emoji: "🔥", desc: "Estimez vos besoins caloriques journaliers selon votre activite physique.", gradient: "from-orange-400 to-red-500" },
  { slug: "/calcul-macros", titre: "Calcul Macros", emoji: "🥗", desc: "Repartissez vos macronutriments (proteines, glucides, lipides) selon vos objectifs.", gradient: "from-green-400 to-emerald-500" },
  { slug: "/calcul-metabolisme-base", titre: "Metabolisme de Base (BMR)", emoji: "🔥", desc: "Calculez les calories brulees au repos par votre organisme.", gradient: "from-amber-400 to-orange-500" },
  { slug: "/calcul-proteines", titre: "Apport Proteines", emoji: "🥩", desc: "Determinez votre besoin quotidien en proteines selon votre poids et activite.", gradient: "from-red-400 to-rose-500" },
  { slug: "/calcul-poids-ideal", titre: "Poids Ideal", emoji: "⚖️", desc: "Estimez votre poids ideal selon plusieurs formules medicales reconnues.", gradient: "from-violet-400 to-purple-500" },
  { slug: "/calcul-masse-grasse", titre: "Masse Grasse", emoji: "🏋️", desc: "Evaluez votre pourcentage de masse grasse corporelle.", gradient: "from-indigo-400 to-purple-500" },
  { slug: "/calcul-indice-glycemique", titre: "Indice Glycemique", emoji: "🌿", desc: "Consultez l'indice glycemique des aliments pour mieux gerer votre glycemie.", gradient: "from-emerald-400 to-teal-500" },
  { slug: "/calcul-consommation-eau", titre: "Consommation Eau", emoji: "💧", desc: "Calculez votre besoin quotidien en eau selon votre poids et activite.", gradient: "from-cyan-400 to-blue-500" },
  { slug: "/calcul-besoin-sommeil", titre: "Besoin Sommeil", emoji: "🌙", desc: "Decouvrez votre besoin en sommeil et les heures ideales de coucher.", gradient: "from-indigo-400 to-violet-500" },
  { slug: "/calcul-age-metabolique", titre: "Age Metabolique", emoji: "🧬", desc: "Comparez votre age metabolique a votre age reel pour evaluer votre forme.", gradient: "from-purple-400 to-violet-500" },
  { slug: "/calcul-risque-cardiovasculaire", titre: "Risque Cardiovasculaire", emoji: "❤️", desc: "Evaluez votre risque cardiovasculaire selon les facteurs de sante.", gradient: "from-red-400 to-rose-500" },
];

const faqData = [
  { question: "Quelle difference entre metabolisme de base (BMR) et TDEE ?", answer: "Le metabolisme de base (BMR) represente les calories brulees au repos pour les fonctions vitales (respiration, digestion, circulation). Le TDEE (Total Daily Energy Expenditure) inclut le BMR plus les calories brulees par l'activite physique et la thermogenese. Le TDEE est donc toujours superieur au BMR." },
  { question: "Comment calculer ses macros pour perdre du poids ?", answer: "Pour la perte de poids, visez un deficit calorique de 300-500 kcal sous votre TDEE. Repartissez en general : 30-35% proteines (pour preserver la masse musculaire), 35-40% glucides (pour l'energie), et 25-30% lipides (pour les hormones). Ajustez selon vos resultats sur 2-3 semaines." },
  { question: "Combien de proteines par jour faut-il consommer ?", answer: "Les besoins en proteines varient selon l'activite : 0,8g/kg pour un sedentaire, 1,2-1,6g/kg pour un sportif moderé, 1,6-2,2g/kg pour la musculation. Par exemple, une personne de 70kg faisant du sport regulierement a besoin de 84 a 112g de proteines par jour." },
  { question: "Qu'est-ce que l'age metabolique ?", answer: "L'age metabolique compare votre metabolisme de base a la moyenne de la population. Si votre age metabolique est inferieur a votre age reel, votre metabolisme est meilleur que la moyenne — signe de bonne forme physique. L'exercice regulier et une alimentation equilibree abaissent l'age metabolique." },
];

export default function CalculateursNutrition() {
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
          Calculateurs Sante &amp; Nutrition Gratuits
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Tous les outils pour comprendre votre corps : calories, macros, metabolisme, hydratation, sommeil et risques de sante.
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
        <h2>Optimisez votre sante avec des outils personnalises</h2>
        <p>Commencez par calculer votre <a href="/calcul-imc" className="text-blue-600 hover:underline">IMC</a> et votre <a href="/calcul-metabolisme-base" className="text-blue-600 hover:underline">metabolisme de base</a>, puis ajustez votre alimentation avec le <a href="/calcul-macros" className="text-blue-600 hover:underline">calculateur de macros</a> et l'<a href="/calcul-proteines" className="text-blue-600 hover:underline">apport en proteines</a>.</p>
        <p>Pour un suivi complet, explorez aussi nos <a href="/calculateurs-sante-famille" className="text-blue-600 hover:underline">calculateurs sante &amp; famille</a> (grossesse, ovulation, garde d'enfant).</p>
        <h3>Voir aussi</h3>
        <ul>
          <li><a href="/calculateurs-sante-famille" className="text-blue-600 hover:underline">Calculateurs Sante &amp; Famille</a> — grossesse, ovulation, pension alimentaire</li>
          <li><a href="/convertisseurs" className="text-blue-600 hover:underline">Convertisseurs</a> — temperature, poids, longueur</li>
          <li><a href="/calculateurs-finance" className="text-blue-600 hover:underline">Calculateurs Finance</a> — budget, epargne, impots</li>
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
