import { AMAZON_TAG, AMAZON_RECOS, amazonSearchUrl } from "../lib/amazon";

const MENTION = "En tant que Partenaire Amazon, je réalise un bénéfice sur les achats remplissant les conditions requises.";

export default function AmazonReco({ page }: { page: string }) {
  const block = AMAZON_RECOS[page];
  if (!AMAZON_TAG || !block) return null;

  return (
    <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
      <h2 className="text-xl font-bold text-slate-800 mb-6">{block.title}</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {block.items.map((item) => (
          <li key={item.query}>
            <a
              href={amazonSearchUrl(item.query)}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="block h-full rounded-xl border border-slate-200 px-4 py-3 hover:border-amber-400 hover:bg-amber-50 transition-colors"
            >
              <span className="block font-semibold text-slate-800">{item.label}</span>
              <span className="block text-sm text-slate-600 mt-0.5">{item.why}</span>
              <span className="block text-xs text-amber-700 mt-1.5">Voir sur Amazon</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-slate-500">{MENTION}</p>
    </section>
  );
}
