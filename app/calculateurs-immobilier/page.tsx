import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/calculateurs-immobilier" },
  title: "Calculateurs Immobilier & Investissement Gratuits 2026 - Simulateurs en Ligne",
  description: "Calculez votre plus-value immobiliere, rentabilite locative, revenus fonciers, DPE, capacite d'emprunt, frais de notaire. Simulateurs immobiliers gratuits et precis.",
  keywords: "calculateur immobilier, plus-value immobiliere, rentabilite locative, revenus fonciers, DPE, capacite emprunt, frais de notaire, simulation immobilier 2026",
};

const calculateurs = [
  { slug: "/simulateur-pret-immobilier", titre: "Simulateur Pret Immobilier", emoji: "🏠", desc: "Calculez vos mensualites, le cout total et le tableau d'amortissement de votre pret immobilier.", gradient: "from-blue-400 to-indigo-500" },
  { slug: "/frais-de-notaire", titre: "Frais de Notaire", emoji: "📋", desc: "Estimez les frais de notaire pour votre achat immobilier, neuf ou ancien.", gradient: "from-cyan-400 to-blue-500" },
  { slug: "/calcul-capacite-emprunt", titre: "Capacite d'Emprunt", emoji: "🏠", desc: "Decouvrez combien vous pouvez emprunter selon vos revenus et charges.", gradient: "from-indigo-400 to-purple-500" },
  { slug: "/calcul-taux-endettement", titre: "Taux d'Endettement", emoji: "🏦", desc: "Verifiez si votre taux d'endettement respecte le seuil de 35% impose par le HCSF.", gradient: "from-amber-400 to-orange-500" },
  { slug: "/calcul-plus-value-immobiliere", titre: "Plus-Value Immobiliere", emoji: "🏡", desc: "Calculez l'impot sur la plus-value lors de la revente de votre bien immobilier.", gradient: "from-green-400 to-emerald-500" },
  { slug: "/calcul-rentabilite-locative", titre: "Rentabilite Locative", emoji: "🏢", desc: "Evaluez la rentabilite brute et nette de votre investissement locatif.", gradient: "from-emerald-400 to-teal-500" },
  { slug: "/calcul-revenus-fonciers", titre: "Revenus Fonciers", emoji: "🏘️", desc: "Calculez vos revenus fonciers nets et l'imposition au regime reel ou micro-foncier.", gradient: "from-violet-400 to-purple-500" },
  { slug: "/calcul-droits-succession", titre: "Droits de Succession", emoji: "⚖️", desc: "Estimez les droits de succession selon le lien de parente et la valeur du patrimoine.", gradient: "from-red-400 to-rose-500" },
  { slug: "/calculateur-dpe", titre: "Simulateur DPE", emoji: "🏠", desc: "Estimez la classe energetique de votre logement selon sa surface, chauffage et epoque.", gradient: "from-teal-400 to-cyan-500" },
  { slug: "/calcul-surface-peinture", titre: "Surface Peinture", emoji: "🎨", desc: "Calculez la surface a peindre et le budget peinture pour vos travaux.", gradient: "from-fuchsia-400 to-pink-500" },
  { slug: "/calcul-taxe-fonciere", titre: "Taxe Fonciere", emoji: "🏠", desc: "Estimez votre taxe fonciere selon la surface, le type de bien et la ville.", gradient: "from-amber-400 to-yellow-500" },
];

const faqData = [
  { question: "Comment calculer la rentabilite d'un investissement locatif ?", answer: "La rentabilite brute se calcule en divisant le loyer annuel par le prix d'achat, multiplie par 100. La rentabilite nette deduit les charges (taxe fonciere, assurance, travaux, vacance locative). Un bon investissement locatif offre generalement une rentabilite nette superieure a 4-5%." },
  { question: "Quels sont les frais de notaire en 2026 ?", answer: "Les frais de notaire representent environ 7-8% du prix d'achat dans l'ancien et 2-3% dans le neuf. Ils comprennent les droits de mutation, les emoluments du notaire, les frais de formalites et la contribution de securite immobiliere." },
  { question: "Quel taux d'endettement maximum pour un pret immobilier ?", answer: "Depuis 2022, le HCSF impose un taux d'endettement maximum de 35% (assurance comprise). Ce seuil peut etre depasse dans certains cas exceptionnels (primo-accedants, investissement locatif avec revenus eleves)." },
  { question: "Comment est calculee la plus-value immobiliere ?", answer: "La plus-value immobiliere est la difference entre le prix de vente et le prix d'achat (majore des frais d'acquisition et travaux). Elle est soumise a l'impot sur le revenu (19%) et aux prelevements sociaux (17,2%). Des abattements s'appliquent selon la duree de detention, avec exoneration totale apres 22 ans (IR) et 30 ans (PS)." },
];

export default function CalculateursImmobilier() {
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
          Calculateurs Immobilier &amp; Investissement Gratuits
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Tous les outils pour votre projet immobilier : pret, frais de notaire, rentabilite locative, plus-value, DPE et plus encore.
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
        <h2>Vos outils immobiliers en un seul endroit</h2>
        <p>Que vous soyez primo-accedant ou investisseur experimente, nos calculateurs vous aident a prendre les bonnes decisions. Du <a href="/simulateur-pret-immobilier" className="text-blue-600 hover:underline">simulateur de pret immobilier</a> au <a href="/calcul-rentabilite-locative" className="text-blue-600 hover:underline">calcul de rentabilite locative</a>, chaque outil est concu pour etre simple, rapide et precis.</p>
        <p>Completez votre analyse avec nos <a href="/calculateurs-finance" className="text-blue-600 hover:underline">calculateurs financiers</a> pour optimiser votre fiscalite et votre epargne.</p>
        <h3>Voir aussi</h3>
        <ul>
          <li><a href="/calculateurs-finance" className="text-blue-600 hover:underline">Calculateurs Finance &amp; Impots</a> — simulateur d'impot, epargne, credit</li>
          <li><a href="/prix-travaux-maison" className="text-blue-600 hover:underline">Prix Travaux &amp; Artisans</a> — estimez le cout de vos travaux par corps de metier</li>
          <li><a href="/simulateurs-emploi" className="text-blue-600 hover:underline">Simulateurs Emploi</a> — salaire, chomage, retraite</li>
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
