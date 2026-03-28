const ALL_CALCULATORS = [
  { slug: "/salaire-brut-net", title: "Salaire Brut / Net", emoji: "💰", color: "from-blue-500 to-indigo-500" },
  { slug: "/calcul-tva", title: "Calcul TVA", emoji: "🧾", color: "from-emerald-500 to-teal-500" },
  { slug: "/simulateur-pret-immobilier", title: "Pret Immobilier", emoji: "🏠", color: "from-violet-500 to-purple-500" },
  { slug: "/calcul-pourcentage", title: "Calcul Pourcentage", emoji: "📊", color: "from-orange-500 to-amber-500" },
  { slug: "/calcul-imc", title: "Calcul IMC", emoji: "⚖️", color: "from-rose-500 to-pink-500" },
  { slug: "/frais-de-notaire", title: "Frais de Notaire", emoji: "📋", color: "from-cyan-500 to-blue-500" },
  { slug: "/calcul-consommation-electrique", title: "Consommation Electrique", emoji: "⚡", color: "from-yellow-500 to-orange-500" },
  { slug: "/calcul-age", title: "Calcul Age", emoji: "🎂", color: "from-pink-500 to-rose-500" },
  { slug: "/indemnite-licenciement", title: "Indemnite Licenciement", emoji: "📄", color: "from-indigo-500 to-purple-500" },
  { slug: "/convertisseur-devises", title: "Convertisseur Devises", emoji: "💱", color: "from-sky-500 to-blue-600" },
  { slug: "/calcul-surface-peinture", title: "Surface Peinture", emoji: "🎨", color: "from-fuchsia-500 to-pink-500" },
  { slug: "/simulateur-epargne", title: "Simulateur Epargne", emoji: "🏦", color: "from-emerald-500 to-green-600" },
  { slug: "/calcul-heures-travail", title: "Heures de Travail", emoji: "⏰", color: "from-amber-500 to-orange-500" },
  { slug: "/calcul-indemnites-kilometriques", title: "Indemnites Kilometriques", emoji: "🚗", color: "from-teal-500 to-cyan-600" },
  { slug: "/simulateur-impot-revenu", title: "Simulateur Impot", emoji: "🏛️", color: "from-red-500 to-rose-600" },
  { slug: "/calcul-date-accouchement", title: "Date d'Accouchement", emoji: "🤰", color: "from-purple-500 to-pink-500" },
  { slug: "/simulateur-dca", title: "Simulateur DCA", emoji: "📈", color: "from-green-500 to-emerald-600" },
  { slug: "/calculateur-inflation", title: "Calculateur Inflation", emoji: "📉", color: "from-red-500 to-orange-500" },
  { slug: "/simulateur-apl", title: "Simulateur APL", emoji: "🏘️", color: "from-teal-500 to-cyan-600" },
  { slug: "/calcul-calories", title: "Calcul Calories", emoji: "🔥", color: "from-green-500 to-emerald-600" },
  { slug: "/simulateur-chomage", title: "Simulateur Chomage", emoji: "📋", color: "from-sky-500 to-blue-600" },
  { slug: "/simulateur-micro-entreprise", title: "Micro-Entreprise", emoji: "🏢", color: "from-violet-500 to-purple-600" },
  { slug: "/calcul-ovulation", title: "Calcul Ovulation", emoji: "🌸", color: "from-pink-500 to-rose-500" },
  { slug: "/calcul-taux-endettement", title: "Taux d'Endettement", emoji: "🏦", color: "from-blue-500 to-indigo-500" },
];

const RELATED_MAP: Record<string, string[]> = {
  "/salaire-brut-net": ["/simulateur-impot-revenu", "/indemnite-licenciement", "/calcul-heures-travail", "/calcul-indemnites-kilometriques"],
  "/calcul-tva": ["/calcul-pourcentage", "/frais-de-notaire", "/convertisseur-devises", "/salaire-brut-net"],
  "/simulateur-pret-immobilier": ["/calcul-taux-endettement", "/frais-de-notaire", "/simulateur-epargne", "/simulateur-impot-revenu"],
  "/calcul-pourcentage": ["/calcul-tva", "/salaire-brut-net", "/simulateur-epargne", "/convertisseur-devises"],
  "/calcul-imc": ["/calcul-calories", "/calcul-age", "/calcul-date-accouchement", "/calcul-consommation-electrique"],
  "/frais-de-notaire": ["/simulateur-pret-immobilier", "/simulateur-impot-revenu", "/calcul-tva", "/simulateur-epargne"],
  "/calcul-consommation-electrique": ["/calcul-surface-peinture", "/calcul-pourcentage", "/simulateur-epargne", "/calcul-tva"],
  "/calcul-age": ["/calcul-date-accouchement", "/calcul-imc", "/calcul-heures-travail", "/simulateur-epargne"],
  "/indemnite-licenciement": ["/salaire-brut-net", "/calcul-heures-travail", "/simulateur-impot-revenu", "/calcul-indemnites-kilometriques"],
  "/convertisseur-devises": ["/calcul-tva", "/calcul-pourcentage", "/salaire-brut-net", "/simulateur-epargne"],
  "/calcul-surface-peinture": ["/calcul-consommation-electrique", "/simulateur-pret-immobilier", "/frais-de-notaire", "/calcul-pourcentage"],
  "/simulateur-epargne": ["/simulateur-impot-revenu", "/simulateur-pret-immobilier", "/salaire-brut-net", "/convertisseur-devises"],
  "/calcul-heures-travail": ["/salaire-brut-net", "/indemnite-licenciement", "/calcul-indemnites-kilometriques", "/simulateur-impot-revenu"],
  "/calcul-indemnites-kilometriques": ["/calcul-heures-travail", "/salaire-brut-net", "/calcul-consommation-electrique", "/simulateur-impot-revenu"],
  "/simulateur-impot-revenu": ["/salaire-brut-net", "/simulateur-epargne", "/indemnite-licenciement", "/frais-de-notaire"],
  "/calcul-date-accouchement": ["/calcul-ovulation", "/calcul-age", "/calcul-imc", "/calcul-heures-travail"],
  "/simulateur-dca": ["/simulateur-epargne", "/calculateur-inflation", "/convertisseur-devises", "/simulateur-impot-revenu"],
  "/calculateur-inflation": ["/salaire-brut-net", "/simulateur-epargne", "/simulateur-dca", "/simulateur-impot-revenu"],
  "/simulateur-apl": ["/simulateur-impot-revenu", "/salaire-brut-net", "/simulateur-epargne", "/calcul-consommation-electrique"],
  "/calcul-calories": ["/calcul-imc", "/calcul-age", "/calcul-date-accouchement", "/calcul-heures-travail"],
  "/simulateur-chomage": ["/salaire-brut-net", "/indemnite-licenciement", "/simulateur-impot-revenu", "/simulateur-micro-entreprise"],
  "/simulateur-micro-entreprise": ["/simulateur-impot-revenu", "/salaire-brut-net", "/calcul-tva", "/simulateur-chomage"],
  "/calcul-ovulation": ["/calcul-date-accouchement", "/calcul-imc", "/calcul-calories", "/calcul-age"],
  "/calcul-taux-endettement": ["/simulateur-pret-immobilier", "/frais-de-notaire", "/simulateur-impot-revenu", "/salaire-brut-net"],
};

interface RelatedCalculatorsProps {
  currentSlug: string;
}

export default function RelatedCalculators({ currentSlug }: RelatedCalculatorsProps) {
  const relatedSlugs = RELATED_MAP[currentSlug] || [];
  const related = relatedSlugs
    .map((slug) => ALL_CALCULATORS.find((c) => c.slug === slug))
    .filter(Boolean);

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-slate-800 mb-6">
        Calculateurs similaires
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((calc) => (
          <a
            key={calc!.slug}
            href={calc!.slug}
            className="group bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className={`w-10 h-10 bg-gradient-to-br ${calc!.color} rounded-lg flex items-center justify-center text-lg shadow-sm`}>
              {calc!.emoji}
            </div>
            <p className="text-sm font-semibold text-slate-700 mt-3 group-hover:text-blue-600 transition-colors">
              {calc!.title}
            </p>
            <div className="mt-2 text-xs font-medium text-blue-600 flex items-center gap-1">
              Calculer
              <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
