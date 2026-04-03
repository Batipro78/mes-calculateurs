import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulateurs Emploi & Salaire Gratuits 2026 - Calcul en ligne",
  description:
    "Calculez votre salaire brut/net, simulez vos allocations chomage, indemnites de licenciement, prime d'activite, retraite, heures de travail et indemnites kilometriques. Gratuit.",
  keywords:
    "simulateur emploi, calcul salaire brut net, simulateur chomage, indemnite licenciement, prime activite, simulateur retraite, heures travail, indemnites kilometriques, micro-entreprise",
};

const calculateurs = [
  { slug: "/salaire-brut-net", titre: "Salaire Brut / Net", emoji: "💰", desc: "Convertissez votre salaire brut en net (ou inversement). Cadre, non-cadre, fonction publique.", gradient: "from-emerald-400 to-green-500" },
  { slug: "/simulateur-chomage", titre: "Simulateur Chomage (ARE)", emoji: "📉", desc: "Estimez vos allocations chomage : montant, duree, degressivite.", gradient: "from-orange-400 to-red-500" },
  { slug: "/indemnite-licenciement", titre: "Indemnite de Licenciement", emoji: "📄", desc: "Calculez votre indemnite legale selon votre salaire et anciennete.", gradient: "from-red-400 to-rose-500" },
  { slug: "/calcul-prime-activite", titre: "Prime d'Activite", emoji: "💸", desc: "Estimez votre prime d'activite CAF selon vos revenus et situation.", gradient: "from-violet-400 to-purple-500" },
  { slug: "/simulateur-retraite", titre: "Simulateur Retraite", emoji: "🏖️", desc: "Estimez votre pension de retraite : age, trimestres, montant.", gradient: "from-blue-400 to-indigo-500" },
  { slug: "/calcul-heures-travail", titre: "Calcul Heures de Travail", emoji: "⏰", desc: "Calculez vos heures, heures sup et salaire correspondant.", gradient: "from-cyan-400 to-blue-500" },
  { slug: "/calcul-indemnites-kilometriques", titre: "Indemnites Kilometriques", emoji: "🚗", desc: "Bareme fiscal 2026 : voiture, moto, velo, electrique.", gradient: "from-amber-400 to-orange-500" },
  { slug: "/simulateur-micro-entreprise", titre: "Simulateur Micro-Entreprise", emoji: "🏪", desc: "Cotisations URSSAF, ACRE, versement liberatoire, 5 activites.", gradient: "from-teal-400 to-emerald-500" },
  { slug: "/simulateur-salaire-alternant", titre: "Salaire Alternant", emoji: "🎓", desc: "Apprentissage et professionnalisation : salaire minimum selon age et annee.", gradient: "from-pink-400 to-rose-500" },
];

const faqData = [
  { question: "Comment calculer son salaire net a partir du brut ?", answer: "Pour passer du brut au net, il faut deduire les cotisations salariales (environ 22-25% pour un non-cadre, 25-28% pour un cadre). Notre simulateur applique les taux 2026 et tient compte du statut (cadre, non-cadre, fonction publique)." },
  { question: "Combien touche-t-on au chomage ?", answer: "L'allocation chomage (ARE) represente environ 57% de votre salaire journalier de reference, avec un minimum de 31,59 EUR/jour. La duree depend de votre age et de vos mois travailles (maximum 24 mois, ou 36 mois apres 55 ans)." },
  { question: "Comment est calculee l'indemnite de licenciement ?", answer: "L'indemnite legale est de 1/4 de mois de salaire par annee d'anciennete pour les 10 premieres annees, puis 1/3 de mois au-dela. Le salaire de reference est le plus avantageux entre les 12 ou 3 derniers mois." },
];

export default function SimulateursEmploi() {
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
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Simulateurs Emploi & Salaire Gratuits</h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Tous nos outils pour calculer votre salaire, simuler vos droits au chomage, estimer votre retraite et optimiser vos revenus d'activite. Baremes officiels 2026.
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
        <h2>Gerez votre carriere avec nos simulateurs</h2>
        <p>
          Que vous negociez un salaire, prepariez un depart ou lanciez votre micro-entreprise, nos simulateurs emploi vous donnent les chiffres exacts bases sur les baremes officiels 2026. Le <a href="/salaire-brut-net" className="text-blue-600 hover:underline">simulateur brut/net</a> est l'outil le plus utilise de notre site avec 450 000 recherches mensuelles en France.
        </p>
        <p>
          En cas de licenciement, calculez d'abord votre <a href="/indemnite-licenciement" className="text-blue-600 hover:underline">indemnite legale</a>, puis estimez vos <a href="/simulateur-chomage" className="text-blue-600 hover:underline">allocations chomage</a>. N'oubliez pas de verifier votre eligibilite a la <a href="/calcul-prime-activite" className="text-blue-600 hover:underline">prime d'activite</a> si vous reprenez un emploi a temps partiel.
        </p>
        <h3>Voir aussi</h3>
        <ul>
          <li><a href="/calculateurs-finance" className="text-blue-600 hover:underline">Calculateurs Finance</a> — pret immobilier, impots, epargne</li>
          <li><a href="/calculateurs-sante-famille" className="text-blue-600 hover:underline">Calculateurs Sante &amp; Famille</a> — IMC, calories, grossesse</li>
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
