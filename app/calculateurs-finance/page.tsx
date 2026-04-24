import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/calculateurs-finance" },
  title: "Calculateurs Financiers Gratuits 2026 - Simulateurs en ligne",
  description:
    "Tous nos calculateurs financiers gratuits : simulateur pret immobilier, frais de notaire, credit conso, impot revenu, epargne, taux endettement, capacite emprunt, TVA et plus.",
  keywords:
    "calculateur financier gratuit, simulateur finance, calcul pret immobilier, frais notaire, simulateur impot, credit consommation, taux endettement, capacite emprunt, epargne, TVA",
};

const calculateurs = [
  { slug: "/simulateur-pret-immobilier", titre: "Simulateur Pret Immobilier", emoji: "🏠", desc: "Calculez vos mensualites, cout total et tableau d'amortissement.", gradient: "from-green-400 to-emerald-500" },
  { slug: "/frais-de-notaire", titre: "Frais de Notaire", emoji: "📋", desc: "Estimez les frais de notaire pour votre achat immobilier.", gradient: "from-amber-400 to-orange-500" },
  { slug: "/simulateur-impot-revenu", titre: "Simulateur Impot Revenu", emoji: "🏛️", desc: "Calculez votre impot 2026 : tranches, quotient familial, decote.", gradient: "from-indigo-400 to-purple-500" },
  { slug: "/simulateur-credit-conso", titre: "Simulateur Credit Conso", emoji: "💳", desc: "Mensualites, cout total et tableau d'amortissement de votre credit.", gradient: "from-cyan-400 to-blue-500" },
  { slug: "/calcul-taux-endettement", titre: "Taux d'Endettement", emoji: "📊", desc: "Verifiez votre taux d'endettement et reste a vivre.", gradient: "from-red-400 to-rose-500" },
  { slug: "/calcul-capacite-emprunt", titre: "Capacite d'Emprunt", emoji: "🏦", desc: "Combien pouvez-vous emprunter selon vos revenus ?", gradient: "from-emerald-400 to-teal-500" },
  { slug: "/simulateur-epargne", titre: "Simulateur Epargne", emoji: "🐖", desc: "Livret A, LDDS, LEP, assurance-vie : comparez vos placements.", gradient: "from-yellow-400 to-amber-500" },
  { slug: "/calcul-tva", titre: "Calcul TVA HT/TTC", emoji: "🧮", desc: "Convertissez HT/TTC avec tous les taux francais.", gradient: "from-blue-400 to-indigo-500" },
  { slug: "/convertisseur-devises", titre: "Convertisseur Devises", emoji: "💱", desc: "Convertissez entre 14 devises avec taux indicatifs.", gradient: "from-teal-400 to-cyan-500" },
  { slug: "/calculateur-inflation", titre: "Calculateur Inflation", emoji: "📈", desc: "Mesurez l'impact de l'inflation sur votre pouvoir d'achat.", gradient: "from-orange-400 to-red-500" },
  { slug: "/simulateur-dca", titre: "Simulateur DCA", emoji: "📉", desc: "Simulez votre investissement progressif (Dollar Cost Averaging).", gradient: "from-violet-400 to-purple-500" },
  { slug: "/calcul-pourcentage", titre: "Calcul Pourcentage", emoji: "➗", desc: "4 modes : pourcentage d'un nombre, augmentation, reduction, part.", gradient: "from-pink-400 to-rose-500" },
];

const faqData = [
  { question: "Quel est le meilleur simulateur de pret immobilier gratuit ?", answer: "Notre simulateur de pret immobilier vous permet de calculer vos mensualites, le cout total du credit et de generer un tableau d'amortissement complet. Il utilise les taux moyens 2026 et prend en compte l'assurance emprunteur." },
  { question: "Comment calculer son taux d'endettement ?", answer: "Le taux d'endettement se calcule en divisant vos charges mensuelles (credits, loyer) par vos revenus nets mensuels, multiplie par 100. Le seuil recommande par les banques est de 33-35%." },
  { question: "Comment estimer ses frais de notaire ?", answer: "Les frais de notaire representent environ 7-8% du prix dans l'ancien et 2-3% dans le neuf. Ils comprennent les droits de mutation, les emoluments du notaire et les debours." },
];

export default function CalculateursFinance() {
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
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Calculateurs Financiers Gratuits</h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Tous nos outils de calcul financier pour gerer votre budget, preparer un achat immobilier, optimiser vos impots et faire fructifier votre epargne. 100% gratuits, sans inscription.
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
        <h2>Pourquoi utiliser nos calculateurs financiers ?</h2>
        <p>
          Que vous prepariez un achat immobilier, souhaitiez optimiser votre declaration d'impots ou comparer des placements d'epargne, nos simulateurs financiers vous donnent des resultats precis en quelques secondes. Tous nos outils utilisent les baremes et taux officiels 2026 (tranches d'imposition, taux de TVA, taux d'interet moyens).
        </p>
        <p>
          Pour un projet immobilier, commencez par calculer votre <a href="/calcul-capacite-emprunt" className="text-blue-600 hover:underline">capacite d'emprunt</a>, puis estimez vos <a href="/simulateur-pret-immobilier" className="text-blue-600 hover:underline">mensualites de pret</a> et vos <a href="/frais-de-notaire" className="text-blue-600 hover:underline">frais de notaire</a>. Verifiez enfin votre <a href="/calcul-taux-endettement" className="text-blue-600 hover:underline">taux d'endettement</a> avant de contacter votre banque.
        </p>
        <h3>Voir aussi</h3>
        <ul>
          <li><a href="/simulateurs-emploi" className="text-blue-600 hover:underline">Calculateurs Emploi &amp; Salaire</a> — salaire brut/net, chomage, licenciement</li>
          <li><a href="/calculateurs-sante-famille" className="text-blue-600 hover:underline">Calculateurs Sante &amp; Famille</a> — IMC, calories, grossesse</li>
          <li><a href="/prix-travaux-maison" className="text-blue-600 hover:underline">Prix Travaux &amp; Artisans</a> — macon, electricien, plombier, couvreur</li>
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
