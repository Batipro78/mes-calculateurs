import type { Metadata } from "next";
import CalculateurReductionDom from "../CalculateurReductionDom";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerReductionDOM, fmtEur, fmtPct, LABELS_TERRITOIRE, TerritoireDOM } from "../reductionDomCalc";

// 12 variantes : 4 territoires x 3 montants (martinique exclu pour garder 12 slugs propres)
// Territoires : reunion, guadeloupe, guyane, mayotte
// Impots : 3000, 6000, 12000
const VARIANTES: Array<{ slug: string; territoire: TerritoireDOM; impot: number }> = [
  { slug: "reunion-impot-3000-euros",       territoire: "reunion",     impot: 3000  },
  { slug: "reunion-impot-6000-euros",       territoire: "reunion",     impot: 6000  },
  { slug: "reunion-impot-12000-euros",      territoire: "reunion",     impot: 12000 },
  { slug: "guadeloupe-impot-3000-euros",    territoire: "guadeloupe",  impot: 3000  },
  { slug: "guadeloupe-impot-6000-euros",    territoire: "guadeloupe",  impot: 6000  },
  { slug: "guadeloupe-impot-12000-euros",   territoire: "guadeloupe",  impot: 12000 },
  { slug: "guyane-impot-3000-euros",        territoire: "guyane",      impot: 3000  },
  { slug: "guyane-impot-6000-euros",        territoire: "guyane",      impot: 6000  },
  { slug: "guyane-impot-12000-euros",       territoire: "guyane",      impot: 12000 },
  { slug: "mayotte-impot-3000-euros",       territoire: "mayotte",     impot: 3000  },
  { slug: "mayotte-impot-6000-euros",       territoire: "mayotte",     impot: 6000  },
  { slug: "mayotte-impot-12000-euros",      territoire: "mayotte",     impot: 12000 },
];

export function generateStaticParams() {
  return VARIANTES.map((v) => ({ params: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const variante = VARIANTES.find((v) => v.slug === slug);
  if (!variante) return {};

  const res = calculerReductionDOM({ territoire: variante.territoire, impotBareme: variante.impot });
  const label = LABELS_TERRITOIRE[variante.territoire];
  const tauxLabel = res.taux === 0.30 ? "30 %" : "40 %";

  return {
    alternates: { canonical: `/calcul-reduction-impot-dom/${slug}` },
    title: `Reduction Impot DOM ${label} ${variante.impot.toLocaleString("fr-FR")} EUR — Refaction ${tauxLabel} 2026`,
    description: `Impot bareme ${fmtEur(variante.impot)} en ${label} : reduction DOM de ${fmtEur(res.reductionAppliquee)} (${tauxLabel}${res.plafondAtteint ? ", plafond atteint" : ""}). Impot apres refaction : ${fmtEur(res.impotApresRefaction)}. Simulation 2026.`,
    keywords: `reduction impot ${label.toLowerCase()}, refaction DOM ${label.toLowerCase()}, impot outre-mer ${variante.impot} EUR, fiscalite ${label.toLowerCase()} 2026`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const variante = VARIANTES.find((v) => v.slug === slug);
  if (!variante) notFound();

  const res = calculerReductionDOM({ territoire: variante.territoire, impotBareme: variante.impot });
  const label = LABELS_TERRITOIRE[variante.territoire];
  const tauxLabel = res.taux === 0.30 ? "30 %" : "40 %";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quelle est la reduction d'impot DOM pour un impot bareme de ${fmtEur(variante.impot)} en ${label} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `En ${label}, le taux de refaction DOM est de ${tauxLabel} (plafond ${fmtEur(res.plafond)}). Pour un impot bareme de ${fmtEur(variante.impot)}, la reduction theorique est de ${fmtEur(res.reductionTheorique)}${res.plafondAtteint ? `, mais elle est plafonnee a ${fmtEur(res.reductionAppliquee)}` : `, soit ${fmtEur(res.reductionAppliquee)} effectivement deduits`}. L'impot final apres refaction est de ${fmtEur(res.impotApresRefaction)}, soit une baisse de ${fmtPct(res.tauxBaisseEffectif)}.`,
        },
      },
      {
        "@type": "Question",
        name: `La refaction DOM en ${label} est-elle automatique ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Oui, la refaction DOM est appliquee automatiquement par l'administration fiscale pour tout contribuable dont le domicile fiscal se trouve en ${label} au 31 decembre de l'annee d'imposition. Aucune case a cocher ni demarche specifique n'est necessaire dans la declaration de revenus. Le taux applicable en ${label} est de ${tauxLabel} avec un plafond de ${fmtEur(res.plafond)}, conformement a l'article 197-I-3 du Code general des impots.`,
        },
      },
      {
        "@type": "Question",
        name: `Comment comparer l'impot en ${label} avec la metropole ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour le meme impot bareme de ${fmtEur(variante.impot)}, un resident de metropole paie ${fmtEur(res.impotMetropole)} (aucune refaction), un resident en zone 30 % (Guadeloupe, Martinique, Reunion) paie ${fmtEur(res.impotZone30)}, et un resident en zone 40 % (Guyane, Mayotte) paie ${fmtEur(res.impotZone40)}. Pour un resident de ${label}, l'impot final est de ${fmtEur(res.impotApresRefaction)}.`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb
        currentPage={`${label} — impot ${variante.impot.toLocaleString("fr-FR")} EUR`}
        parentPage="Reduction d'Impot DOM"
        parentHref="/calcul-reduction-impot-dom"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏝
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Refaction DOM {label} — {variante.impot.toLocaleString("fr-FR")} EUR
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Reduction d&apos;impot automatique de {tauxLabel} (plafond {fmtEur(res.plafond)}) pour un resident de {label}.
      </p>

      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-8 shadow-lg shadow-blue-200/50 mb-8">
        <p className="text-blue-100 mb-1">Reduction d&apos;impot appliquee</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {res.reductionAppliquee > 0 ? "-" : ""}{fmtEur(res.reductionAppliquee)}
        </p>
        <p className="text-blue-100 mt-2">
          Impot apres refaction : <strong>{fmtEur(res.impotApresRefaction)}</strong>
          {" "}— baisse de <strong>{fmtPct(res.tauxBaisseEffectif)}</strong>
        </p>
        {res.plafondAtteint && (
          <p className="mt-2 text-sm bg-white/10 rounded-lg px-3 py-1 inline-block">
            Plafond de {fmtEur(res.plafond)} atteint — reduction maximale appliquee
          </p>
        )}
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-blue-100">Taux applique</p>
            <p className="font-semibold">{tauxLabel}</p>
          </div>
          <div>
            <p className="text-blue-100">Impot bareme initial</p>
            <p className="font-semibold">{fmtEur(variante.impot)}</p>
          </div>
          <div>
            <p className="text-blue-100">Plafond legal</p>
            <p className="font-semibold">{fmtEur(res.plafond)}</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Personnaliser la simulation</h2>
      <CalculateurReductionDom defaultTerritoire={variante.territoire} defaultImpot={variante.impot} />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations DOM</h2>
        <div className="flex flex-wrap gap-2">
          {VARIANTES.filter((v) => v.slug !== variante.slug).map((v) => (
            <a
              key={v.slug}
              href={`/calcul-reduction-impot-dom/${v.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
            >
              {LABELS_TERRITOIRE[v.territoire]} — {v.impot.toLocaleString("fr-FR")} EUR
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-reduction-impot-dom" />
    </div>
  );
}
