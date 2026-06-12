import type { Metadata } from "next";
import CalculateurGirardin from "../CalculateurGirardin";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerGirardin, fmtEur } from "../girardinCalc";
import type { TypeOperation } from "../girardinCalc";

// Variantes SEO par niveau d'impot
interface Variante {
  slug: string;
  label: string;
  impot: number;
  rendement: number;
  typeOp: TypeOperation;
}

const VARIANTES: Variante[] = [
  { slug: "impot-5000-euros",  label: "Impot 5 000 EUR",  impot: 5000,  rendement: 10, typeOp: "plein-droit" },
  { slug: "impot-8000-euros",  label: "Impot 8 000 EUR",  impot: 8000,  rendement: 10, typeOp: "plein-droit" },
  { slug: "impot-10000-euros", label: "Impot 10 000 EUR", impot: 10000, rendement: 10, typeOp: "plein-droit" },
  { slug: "impot-15000-euros", label: "Impot 15 000 EUR", impot: 15000, rendement: 10, typeOp: "plein-droit" },
  { slug: "impot-20000-euros", label: "Impot 20 000 EUR", impot: 20000, rendement: 10, typeOp: "plein-droit" },
  { slug: "impot-30000-euros", label: "Impot 30 000 EUR", impot: 30000, rendement: 10, typeOp: "avec-agrement" },
  { slug: "impot-50000-euros", label: "Impot 50 000 EUR", impot: 50000, rendement: 10, typeOp: "avec-agrement" },
];

export function generateStaticParams() {
  return VARIANTES.map((v) => ({ params: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const variante = VARIANTES.find((v) => v.slug === slug);
  if (!variante) return {};

  const res = calculerGirardin({
    impotAnnuel: variante.impot,
    rendement: variante.rendement,
    typeOperation: variante.typeOp,
  });

  return {
    alternates: { canonical: `/simulateur-girardin-industriel/${slug}` },
    title: `Girardin Industriel avec ${variante.label} - Simulation 2026`,
    description: `Simulation Girardin industriel pour un impot de ${fmtEur(variante.impot)} : apport ${fmtEur(res.apportNecessaire)}, reduction ${fmtEur(res.reductionCible)}, gain net ${fmtEur(res.gainNet)}. Rendement ${variante.rendement} %.`,
    keywords: `Girardin industriel ${variante.impot} euros, defiscalisation outre-mer ${variante.impot}, reduction impot ${variante.impot} Girardin, 199 undecies B`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const variante = VARIANTES.find((v) => v.slug === slug);
  if (!variante) notFound();

  const res = calculerGirardin({
    impotAnnuel: variante.impot,
    rendement: variante.rendement,
    typeOperation: variante.typeOp,
  });

  const typeLabel = variante.typeOp === "avec-agrement" ? "avec agrement" : "de plein droit";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien apporter en Girardin industriel pour un impot de ${fmtEur(variante.impot)} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un impot annuel de ${fmtEur(variante.impot)}, un investissement Girardin industriel ${typeLabel} avec un rendement de ${variante.rendement} % necessite un apport de ${fmtEur(res.apportNecessaire)}. Vous obtiendrez une reduction d'impot de ${fmtEur(res.reductionCible)} l'annee suivante, soit un gain net de ${fmtEur(res.gainNet)}.`,
        },
      },
      {
        "@type": "Question",
        name: `Quel est le plafond Girardin pour un impot de ${fmtEur(variante.impot)} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `La part de la reduction Girardin industriel comptee dans le plafond de niches fiscales outre-mer (18 000 EUR) est de ${fmtEur(res.partDansPlafond)} pour cette simulation (taux ${res.tauxPartComptee} % car retrocession ${res.tauxRetrocession} % a l'exploitant). Ce montant est bien inferieur au plafond de 18 000 EUR, donc la totalite de la reduction est utilisable.`,
        },
      },
      {
        "@type": "Question",
        name: `Le Girardin industriel est-il interessant pour ${fmtEur(variante.impot)} d'impot ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Oui, pour ${fmtEur(variante.impot)} d'impot, le Girardin industriel permet de realiser un gain net de ${fmtEur(res.gainNet)} en un an. C'est un rendement equivalent a ${variante.rendement} % sur 1 an. L'operation reste interessante tant que vous avez un monteur serieux avec une garantie de bonne fin fiscale et financiere (G3F).`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb
        currentPage={variante.label}
        parentPage="Simulateur Girardin Industriel"
        parentHref="/simulateur-girardin-industriel"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏝️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Girardin industriel : {variante.label}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulation Girardin industriel {typeLabel}, rendement {variante.rendement} %, pour un impot de {fmtEur(variante.impot)}.
      </p>

      {/* Carte de resultat principale */}
      <div className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-2xl p-8 shadow-lg shadow-indigo-200/50 mb-8">
        <p className="text-indigo-100 mb-1">Reduction d&apos;impot obtenue en N+1</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmtEur(res.reductionCible)}</p>
        <p className="text-indigo-100 mt-2">
          Pour un apport de <strong>{fmtEur(res.apportNecessaire)}</strong> — gain net : <strong>+{fmtEur(res.gainNet)}</strong>
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-indigo-100">Apport (annee N)</p>
            <p className="font-semibold">{fmtEur(res.apportNecessaire)}</p>
          </div>
          <div>
            <p className="text-indigo-100">Rendement</p>
            <p className="font-semibold">{res.rendementEffectif} %</p>
          </div>
          <div>
            <p className="text-indigo-100">Part dans plafond</p>
            <p className="font-semibold">{fmtEur(res.partDansPlafond)}</p>
          </div>
        </div>
      </div>

      {/* Tableau recapitulatif */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Detail de la simulation</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 rounded-lg">
              <th className="text-left py-2 px-3 text-slate-600 font-semibold">Element</th>
              <th className="text-right py-2 px-3 text-slate-600 font-semibold">Montant</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="py-2 px-3 text-slate-700">Impot annuel estime</td>
              <td className="py-2 px-3 text-right font-medium text-slate-800">{fmtEur(variante.impot)}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 px-3 text-slate-700">Type d&apos;operation</td>
              <td className="py-2 px-3 text-right font-medium text-slate-800 capitalize">{typeLabel}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 px-3 text-slate-700">Retrocession a l&apos;exploitant</td>
              <td className="py-2 px-3 text-right font-medium text-slate-800">{res.tauxRetrocession} %</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 px-3 text-slate-700">Reduction maximale (plafond)</td>
              <td className="py-2 px-3 text-right font-medium text-slate-800">{fmtEur(res.reductionMaxPlafond)}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 px-3 text-slate-700">Reduction retenue</td>
              <td className="py-2 px-3 text-right font-bold text-indigo-700">{fmtEur(res.reductionCible)}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 px-3 text-slate-700">Apport a verser</td>
              <td className="py-2 px-3 text-right font-bold text-slate-800">{fmtEur(res.apportNecessaire)}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 px-3 text-slate-700">Gain net</td>
              <td className="py-2 px-3 text-right font-bold text-emerald-600">+{fmtEur(res.gainNet)}</td>
            </tr>
            <tr>
              <td className="py-2 px-3 text-slate-700">Part dans le plafond 18 000 EUR</td>
              <td className="py-2 px-3 text-right font-medium text-slate-800">{fmtEur(res.partDansPlafond)}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Personnaliser la simulation</h2>
      <CalculateurGirardin
        defaultImpot={variante.impot}
        defaultRendement={variante.rendement}
        defaultType={variante.typeOp}
      />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres profils d&apos;investisseurs</h2>
        <div className="flex flex-wrap gap-2">
          {VARIANTES.filter((v) => v.slug !== variante.slug).map((v) => (
            <a
              key={v.slug}
              href={`/simulateur-girardin-industriel/${v.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all"
            >
              {v.label}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-girardin-industriel" />
    </div>
  );
}
