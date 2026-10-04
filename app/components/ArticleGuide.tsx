import type { ReactNode } from "react";
import AdSlot from "./AdSlot";
import Breadcrumb from "./Breadcrumb";
import RelatedCalculators from "./RelatedCalculators";
import Faq, { FaqItem } from "./Faq";
import Visuel from "./Visuel";

// Gabarit des articles « une question, une reponse, un calculateur ».
// La page ne fournit que des donnees (ArticleData) : tout le texte passe par des
// chaines, donc aucun souci d'apostrophe ou de < > dans le JSX.
//
// Dans les chaines de texte (chapo, reponse, paras, liste, etapes, encadre,
// cellules de tableau), deux ecritures sont reconnues :
//   **texte en gras**
//   [texte du lien](/page-du-site)      (liens internes uniquement)
// PAS dans la FAQ ni dans le bloc calculateur : ces textes sont affiches tels
// quels (et la FAQ part aussi dans le balisage FAQPage), donc texte brut seulement.

// Ordre d'affichage d'une section, quel que soit l'ordre d'ecriture :
// paras, liste, etapes, tableau, suite, visuel, encadre.
export interface ArticleSection {
  titre: string;
  paras?: string[]; // avant les etapes ou le tableau
  liste?: string[];
  etapes?: string[];
  // texte: true = tableau de phrases (tout aligne a gauche) ; sinon les
  // colonnes apres la premiere sont alignees a droite (chiffres).
  tableau?: { colonnes: string[]; lignes: string[][]; texte?: boolean };
  suite?: string[]; // apres les etapes ou le tableau (la conclusion d'un exemple)
  // Image de public/images/<fichier>.webp, fabriquee par `npm run visuels`.
  // Le premier visuel de l'article sert aussi d'image au balisage Article.
  visuel?: { fichier: string; alt: string; legende: string };
  encadre?: string;
}

export interface ArticleData {
  slug: string; // "/comment-calculer-..."
  fil: string; // libelle court du fil d'Ariane
  emoji: string;
  couleur: string; // degrade Tailwind, ex. "from-red-500 to-rose-600"
  h1: string;
  chapo: string;
  reponse: string; // la reponse courte, donnee tout de suite
  sections: ArticleSection[];
  calculateur: {
    href: string;
    nom: string; // nom de la page parente dans le fil d'Ariane
    titre: string;
    texte: string;
    bouton: string;
  };
  faq: FaqItem[];
  sources: { label: string; url: string }[];
  datePublication: string; // "2026-09-30"
  dateAffichee: string; // "30 septembre 2026"
}

function riche(texte: string): ReactNode[] {
  const morceaux = texte.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\(\/[^)\s]*\))/g);
  return morceaux.map((m, i) => {
    if (m.startsWith("**") && m.endsWith("**")) {
      return <strong key={i}>{m.slice(2, -2)}</strong>;
    }
    const lien = m.match(/^\[([^\]]+)\]\((\/[^)\s]*)\)$/);
    if (lien) {
      return (
        <a key={i} href={lien[2]} className="text-blue-600 hover:underline font-medium">
          {lien[1]}
        </a>
      );
    }
    return m;
  });
}

function BlocCalculateur({ c }: { c: ArticleData["calculateur"] }) {
  return (
    <div className="mt-8 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-6 sm:p-8 text-white shadow-lg shadow-blue-200/50">
      <p className="text-lg sm:text-xl font-bold">{c.titre}</p>
      <p className="mt-2 text-blue-100 leading-relaxed">{c.texte}</p>
      <a
        href={c.href}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50 transition-colors"
      >
        {c.bouton}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}

export default function ArticleGuide({ article: a }: { article: ArticleData }) {
  const url = `https://mescalculateurs.fr${a.slug}`;
  const visuel = a.sections.find((s) => s.visuel)?.visuel;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.h1,
    description: a.chapo,
    ...(visuel && { image: `https://mescalculateurs.fr/images/${visuel.fichier}.webp` }),
    inLanguage: "fr-FR",
    datePublished: a.datePublication,
    dateModified: a.datePublication,
    mainEntityOfPage: url,
    author: {
      "@type": "Organization",
      name: "Mes Calculateurs",
      url: "https://mescalculateurs.fr",
    },
    publisher: {
      "@type": "Organization",
      name: "Mes Calculateurs",
      url: "https://mescalculateurs.fr",
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb
        currentPage={a.fil}
        parentPage={a.calculateur.nom}
        parentHref={a.calculateur.href}
        lastUpdated={a.dateAffichee}
      />

      <div className="flex items-start gap-3 mb-2">
        <div
          className={`w-10 h-10 shrink-0 bg-gradient-to-br ${a.couleur} rounded-xl flex items-center justify-center text-xl shadow-sm`}
        >
          {a.emoji}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">{a.h1}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px] leading-relaxed">{riche(a.chapo)}</p>

      <section className="bg-white rounded-2xl border-2 border-blue-200 p-6 sm:p-8">
        <h2 className="text-sm font-bold uppercase tracking-wide text-blue-600 mb-2">
          La réponse en bref
        </h2>
        <p className="text-slate-700 text-lg leading-relaxed">{riche(a.reponse)}</p>
      </section>

      <BlocCalculateur c={a.calculateur} />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {a.sections.map((s) => (
        <section
          key={s.titre}
          className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4">{s.titre}</h2>
          {s.paras && (
            <div className="space-y-3">
              {s.paras.map((p, i) => (
                <p key={i} className="text-slate-600 leading-relaxed">
                  {riche(p)}
                </p>
              ))}
            </div>
          )}
          {s.liste && (
            <ul className="list-disc pl-5 text-slate-600 space-y-1.5 mt-4 leading-relaxed">
              {s.liste.map((l, i) => (
                <li key={i}>{riche(l)}</li>
              ))}
            </ul>
          )}
          {s.etapes && (
            <ol className="list-decimal pl-5 text-slate-600 space-y-2 mt-4 leading-relaxed">
              {s.etapes.map((e, i) => (
                <li key={i}>{riche(e)}</li>
              ))}
            </ol>
          )}
          {s.tableau && (
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    {s.tableau.colonnes.map((c, i) => (
                      <th
                        key={i}
                        className={`py-3 px-2 text-slate-500 font-medium ${i === 0 || s.tableau!.texte ? "text-left" : "text-right"}`}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.tableau.lignes.map((ligne, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0">
                      {ligne.map((cellule, j) => (
                        <td
                          key={j}
                          className={`py-2.5 px-2 align-top ${j === 0 ? "text-left text-slate-700 font-medium" : s.tableau!.texte ? "text-left text-slate-600" : "text-right text-slate-600"}`}
                        >
                          {riche(cellule)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {s.suite && (
            <div className="space-y-3 mt-4">
              {s.suite.map((p, i) => (
                <p key={i} className="text-slate-600 leading-relaxed">
                  {riche(p)}
                </p>
              ))}
            </div>
          )}
          {s.visuel && <Visuel {...s.visuel} className="mt-6" />}
          {s.encadre && (
            <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900 leading-relaxed">
              {riche(s.encadre)}
            </div>
          )}
        </section>
      ))}

      <BlocCalculateur c={a.calculateur} />

      <Faq items={a.faq} title="Questions fréquentes" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {a.sources.length > 0 ? "Sources" : "À propos de cet article"}
        </h2>
        {a.sources.length > 0 && (
          <ul className="space-y-1.5 mb-5">
            {a.sources.map((s, i) => (
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
        )}
        <p className="text-xs text-slate-400">
          {a.sources.length > 0
            ? "Article informatif rédigé à partir des sources ci-dessus."
            : "Article informatif."}{" "}
          Dernière mise à jour : {a.dateAffichee}.
        </p>
      </section>

      <RelatedCalculators currentSlug={a.slug} />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
