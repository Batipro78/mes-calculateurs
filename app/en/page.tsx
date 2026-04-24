import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Calculators & Simulators - Survival, Nuclear, Draft, Bunker, Blackout",
  description: "Free survival simulators and preparedness tools. Nuclear bomb simulator, blackout readiness test, bunker cost calculator, draft risk assessment, and survival budget calculator. Educational tools for 2026.",
  keywords: "nuclear bomb simulator, blackout simulator, bunker cost calculator, draft simulator, survival budget calculator, prepper tools, emergency preparedness, SHTF calculator",
  alternates: {
    canonical: "/en",
    languages: {
      "fr": "/",
      "en": "/en",
    },
  },
};

const TOOLS = [
  {
    title: "Nuclear Bomb Simulator",
    description: "Simulate nuclear explosions on any US city. Interactive map with fireball, radiation, blast, and thermal burn zones.",
    href: "/en/nuclear-bomb-simulator",
    emoji: "☢️",
    color: "from-red-600 to-orange-600",
    tag: "Popular",
  },
  {
    title: "Blackout Simulator",
    description: "Test your home's readiness for a power outage. Get a preparedness score and emergency kit shopping list.",
    href: "/en/blackout-simulator",
    emoji: "🔦",
    color: "from-slate-700 to-slate-900",
    tag: "New",
  },
  {
    title: "Bunker Cost Calculator",
    description: "How much does a survival bunker cost? Calculate construction, food, water, and equipment costs.",
    href: "/en/bunker-cost-calculator",
    emoji: "🛡️",
    color: "from-amber-600 to-orange-700",
    tag: "New",
  },
  {
    title: "Survival Budget Calculator",
    description: "Minimum monthly budget to survive in any US city. Compare to poverty line, SNAP, and minimum wage.",
    href: "/en/survival-budget-calculator",
    emoji: "🧮",
    color: "from-red-500 to-orange-500",
    tag: "New",
  },
  {
    title: "Military Draft Simulator",
    description: "Would you be drafted? Hypothetical draft priority score based on age, gender, military experience, and occupation.",
    href: "/en/draft-simulator",
    emoji: "🪖",
    color: "from-slate-700 to-slate-900",
    tag: "Trending",
  },
];

export default function ENPage() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-3">
          Free Survival Simulators &amp; Preparedness Tools
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Educational tools for emergency preparedness and survival planning.
          100% free, no signup required.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => (
          <a
            key={tool.href}
            href={tool.href}
            className="group bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center text-2xl shadow-sm`}>
                {tool.emoji}
              </div>
              {tool.tag && (
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                  {tool.tag}
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">
              {tool.title}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              {tool.description}
            </p>
            <div className="text-sm font-medium text-blue-600 flex items-center gap-1">
              Try it free
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        ))}
      </div>

      {/* SEO Content */}
      <section className="mt-16 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Why Emergency Preparedness Matters in 2026
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          From the <strong>Iran nuclear crisis</strong> to extreme weather events like the{" "}
          <strong>Texas Winter Storm</strong> and <strong>California wildfires</strong>,
          Americans are increasingly focused on emergency preparedness. Our free simulators
          help you understand risks and plan ahead.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          Whether you want to visualize nuclear explosion effects, assess your blackout
          readiness, budget for a survival shelter, calculate minimum living costs, or
          understand how a hypothetical military draft would work &mdash; our tools provide
          science-based, educational answers.
        </p>
        <p className="text-slate-600 leading-relaxed">
          All calculators are <strong>100% free</strong>, require no signup, and work on
          any device. Built with the latest data and research for 2026.
        </p>
      </section>

      <div className="mt-8 text-center">
        <p className="text-xs text-slate-400">
          Also available in <a href="/" className="text-blue-500 hover:underline">French (Francais)</a> with 40+ additional calculators.
        </p>
      </div>
    </div>
  );
}
