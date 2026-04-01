const EN_CALCULATORS = [
  { slug: "/en/nuclear-bomb-simulator", title: "Nuclear Bomb Simulator", emoji: "☢️", color: "from-red-600 to-orange-600" },
  { slug: "/en/blackout-simulator", title: "Blackout Simulator", emoji: "🔦", color: "from-slate-700 to-slate-900" },
  { slug: "/en/bunker-cost-calculator", title: "Bunker Cost Calculator", emoji: "🛡️", color: "from-amber-600 to-orange-700" },
  { slug: "/en/survival-budget-calculator", title: "Survival Budget Calculator", emoji: "🧮", color: "from-red-500 to-orange-500" },
  { slug: "/en/draft-simulator", title: "Draft Simulator", emoji: "🪖", color: "from-slate-700 to-slate-900" },
];

const EN_RELATED_MAP: Record<string, string[]> = {
  "/en/nuclear-bomb-simulator": ["/en/bunker-cost-calculator", "/en/blackout-simulator", "/en/draft-simulator", "/en/survival-budget-calculator"],
  "/en/blackout-simulator": ["/en/bunker-cost-calculator", "/en/survival-budget-calculator", "/en/nuclear-bomb-simulator", "/en/draft-simulator"],
  "/en/bunker-cost-calculator": ["/en/nuclear-bomb-simulator", "/en/blackout-simulator", "/en/survival-budget-calculator", "/en/draft-simulator"],
  "/en/survival-budget-calculator": ["/en/blackout-simulator", "/en/bunker-cost-calculator", "/en/draft-simulator", "/en/nuclear-bomb-simulator"],
  "/en/draft-simulator": ["/en/nuclear-bomb-simulator", "/en/bunker-cost-calculator", "/en/blackout-simulator", "/en/survival-budget-calculator"],
};

interface RelatedCalculatorsENProps {
  currentSlug: string;
}

export default function RelatedCalculatorsEN({ currentSlug }: RelatedCalculatorsENProps) {
  const relatedSlugs = EN_RELATED_MAP[currentSlug] || [];
  const related = relatedSlugs
    .map((slug) => EN_CALCULATORS.find((c) => c.slug === slug))
    .filter(Boolean);

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-slate-800 mb-6">
        Related Simulators
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
              Try it
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
