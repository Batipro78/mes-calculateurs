import { VILLES } from "../data/villes";

const COLORS: Record<string, string> = {
  orange: "hover:border-orange-400 hover:text-orange-700 hover:bg-orange-50/50",
  cyan: "hover:border-cyan-300 hover:text-cyan-600 hover:bg-cyan-50/50",
  blue: "hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50",
  amber: "hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50/50",
  violet: "hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/50",
  red: "hover:border-red-400 hover:text-red-700 hover:bg-red-50/50",
  emerald: "hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/50",
  indigo: "hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50",
};

const METIER_COLORS: Record<string, string> = {
  "/prix-chauffagiste": "orange",
  "/prix-plombier": "cyan",
  "/prix-electricien": "blue",
  "/prix-macon": "amber",
  "/prix-peintre": "violet",
  "/prix-couvreur": "red",
};

const METIER_LABELS: Record<string, string> = {
  "/prix-chauffagiste": "chauffagiste",
  "/prix-plombier": "plombier",
  "/prix-electricien": "electricien",
  "/prix-macon": "macon",
  "/prix-peintre": "peintre",
  "/prix-couvreur": "couvreur",
};

/** Metier-style usage: <VillesLinks metierSlug="/prix-macon" /> */
/** Generic usage: <VillesLinks baseSlug="/frais-de-notaire" title="Frais de notaire par ville" color="cyan" /> */
export default function VillesLinks({
  metierSlug,
  baseSlug,
  title,
  color,
}: {
  metierSlug?: string;
  baseSlug?: string;
  title?: string;
  color?: keyof typeof COLORS;
}) {
  const slug = baseSlug ?? metierSlug ?? "";
  const hoverColor = COLORS[color ?? METIER_COLORS[slug] ?? "cyan"] ?? COLORS.cyan;
  const heading = title ?? (METIER_LABELS[slug] ? `Prix ${METIER_LABELS[slug]} par ville` : "Par ville");

  return (
    <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
      <h2 className="text-lg font-bold text-slate-800 mb-4">{heading}</h2>
      <div className="flex flex-wrap gap-2">
        {VILLES.map(v => (
          <a
            key={v.slug}
            href={`${slug}/${v.slug}`}
            className={`px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 ${hoverColor} transition-all`}
          >
            {v.nom}
          </a>
        ))}
      </div>
    </section>
  );
}
