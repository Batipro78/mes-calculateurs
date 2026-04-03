import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculateurs Sante & Famille Gratuits 2026 - Outils en ligne",
  description:
    "Calculez votre IMC, vos besoins caloriques, votre date d'accouchement, votre ovulation, la pension alimentaire et le cout de garde d'enfant. Gratuit et sans inscription.",
  keywords:
    "calcul IMC, calculateur calories, date accouchement, calcul ovulation, pension alimentaire, cout garde enfant, calculateur sante, outils famille gratuit",
};

const calculateurs = [
  { slug: "/calcul-imc", titre: "Calcul IMC", emoji: "⚖️", desc: "Indice de Masse Corporelle avec classification OMS et poids ideal.", gradient: "from-green-400 to-emerald-500" },
  { slug: "/calcul-calories", titre: "Calcul Calories (TDEE)", emoji: "🔥", desc: "Besoins caloriques journaliers selon votre profil et activite.", gradient: "from-orange-400 to-red-500" },
  { slug: "/calcul-date-accouchement", titre: "Date d'Accouchement", emoji: "👶", desc: "Estimez votre DPA par DDR, conception ou echographie.", gradient: "from-pink-400 to-rose-500" },
  { slug: "/calcul-ovulation", titre: "Calcul Ovulation", emoji: "🌸", desc: "Calendrier de fertilite et fenetre fertile jour par jour.", gradient: "from-purple-400 to-violet-500" },
  { slug: "/simulateur-pension-alimentaire", titre: "Pension Alimentaire", emoji: "👨‍👩‍👧‍👦", desc: "Bareme officiel du Ministere de la Justice 2025-2026.", gradient: "from-blue-400 to-indigo-500" },
  { slug: "/calcul-cout-garde-enfant", titre: "Cout Garde Enfant", emoji: "🏠", desc: "Comparez creche, assistante maternelle, garde a domicile, micro-creche.", gradient: "from-amber-400 to-yellow-500" },
  { slug: "/calcul-age", titre: "Calcul Age Exact", emoji: "🎂", desc: "Calculez votre age exact en annees, mois et jours.", gradient: "from-cyan-400 to-blue-500" },
];

const faqData = [
  { question: "Comment calculer son IMC ?", answer: "L'IMC se calcule en divisant votre poids (en kg) par votre taille (en metres) au carre : IMC = poids / taille². Un IMC normal se situe entre 18,5 et 24,9 selon l'OMS." },
  { question: "Comment connaitre sa date d'accouchement ?", answer: "La date prevue d'accouchement (DPA) se calcule en ajoutant 41 semaines d'amenorrhee a la date de vos dernieres regles, ou 39 semaines apres la date de conception. Notre calculateur propose 3 methodes de calcul." },
  { question: "Comment est calculee la pension alimentaire ?", answer: "La pension alimentaire suit le bareme du Ministere de la Justice, base sur les revenus du parent debiteur, le nombre d'enfants et le type de garde (classique, alternee ou reduit). Le minimum vital de 648 EUR (RSA socle) est d'abord deduit des revenus." },
];

export default function CalculateursSanteFamille() {
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
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Calculateurs Sante & Famille Gratuits</h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Outils de calcul pour votre sante et votre famille : IMC, calories, grossesse, fertilite, pension alimentaire et garde d'enfant. Bases sur les references medicales et les baremes officiels.
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
        <h2>Des outils fiables pour votre sante et votre famille</h2>
        <p>
          Nos calculateurs sante utilisent les formules medicales de reference : <a href="/calcul-imc" className="text-blue-600 hover:underline">l'IMC selon l'OMS</a>, les <a href="/calcul-calories" className="text-blue-600 hover:underline">besoins caloriques par la formule Mifflin-St Jeor</a>, et le <a href="/calcul-ovulation" className="text-blue-600 hover:underline">calcul d'ovulation</a> base sur la duree de votre cycle.
        </p>
        <p>
          Pour les questions familiales, la <a href="/simulateur-pension-alimentaire" className="text-blue-600 hover:underline">pension alimentaire</a> suit le bareme officiel du Ministere de la Justice, et le <a href="/calcul-cout-garde-enfant" className="text-blue-600 hover:underline">cout de garde</a> integre les aides CAF (CMG) et le credit d'impot.
        </p>
        <h3>Voir aussi</h3>
        <ul>
          <li><a href="/calculateurs-finance" className="text-blue-600 hover:underline">Calculateurs Finance</a> — pret immobilier, impots, epargne</li>
          <li><a href="/simulateurs-emploi" className="text-blue-600 hover:underline">Simulateurs Emploi &amp; Salaire</a> — brut/net, chomage, retraite</li>
          <li><a href="/prix-travaux-maison" className="text-blue-600 hover:underline">Prix Travaux &amp; Artisans</a> — devis macon, electricien, plombier</li>
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
