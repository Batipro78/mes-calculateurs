import { VILLES } from "../data/villes";

const METIER_COLORS: Record<string, { hover: string; bg: string }> = {
  "/prix-chauffagiste": { hover: "hover:border-orange-400 hover:text-orange-700 hover:bg-orange-50/50", bg: "from-orange-600 to-red-500" },
  "/prix-plombier": { hover: "hover:border-cyan-300 hover:text-cyan-600 hover:bg-cyan-50/50", bg: "from-cyan-500 to-teal-600" },
  "/prix-electricien": { hover: "hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50", bg: "from-blue-500 to-indigo-600" },
  "/prix-macon": { hover: "hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50/50", bg: "from-amber-500 to-orange-600" },
  "/prix-peintre": { hover: "hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/50", bg: "from-violet-500 to-purple-600" },
  "/prix-couvreur": { hover: "hover:border-red-400 hover:text-red-700 hover:bg-red-50/50", bg: "from-red-700 to-amber-600" },
};

const METIER_LABELS: Record<string, string> = {
  "/prix-chauffagiste": "chauffagiste",
  "/prix-plombier": "plombier",
  "/prix-electricien": "electricien",
  "/prix-macon": "macon",
  "/prix-peintre": "peintre",
  "/prix-couvreur": "couvreur",
};

export default function VillesLinks({ metierSlug }: { metierSlug: string }) {
  const colors = METIER_COLORS[metierSlug] ?? METIER_COLORS["/prix-chauffagiste"];
  const label = METIER_LABELS[metierSlug] ?? "artisan";

  return (
    <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
      <h2 className="text-lg font-bold text-slate-800 mb-4">
        Prix {label} par ville
      </h2>
      <div className="flex flex-wrap gap-2">
        {VILLES.map(v => (
          <a
            key={v.slug}
            href={`${metierSlug}/${v.slug}`}
            className={`px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 ${colors.hover} transition-all`}
          >
            {v.nom}
          </a>
        ))}
      </div>
    </section>
  );
}
