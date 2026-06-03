import { SITE_LAST_UPDATED } from "../lib/site-meta";

export interface Source {
  label: string;
  url: string;
}

// Bloc E-E-A-T réutilisable : affiche la méthode de calcul + les sources
// officielles utilisées + la date de dernière revue. C'est le signal de
// confiance que regardent les moteurs IA (Perplexity, ChatGPT, AI Overviews)
// et Google pour décider quelle source citer. Les liens pointent vers des
// sources gouvernementales/officielles (autorité).
export default function SourcesMethodo({
  methode,
  sources,
  lastReviewed = SITE_LAST_UPDATED,
}: {
  methode: string;
  sources: Source[];
  lastReviewed?: string;
}) {
  return (
    <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Sources officielles et methode de calcul
      </h2>
      <p className="text-slate-600 leading-relaxed mb-5">{methode}</p>

      {sources.length > 0 && (
        <>
          <h3 className="font-semibold text-slate-800 mb-2">
            Sources officielles
          </h3>
          <ul className="space-y-1.5 mb-5">
            {sources.map((s, i) => (
              <li key={i} className="text-slate-600 text-sm flex gap-2">
                <span className="text-blue-500" aria-hidden="true">
                  &#8226;
                </span>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener nofollow"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="text-xs text-slate-400">
        Calculs deterministes bases sur les baremes officiels en vigueur.
        Donnees verifiees et mises a jour : {lastReviewed}.
      </p>
    </section>
  );
}
