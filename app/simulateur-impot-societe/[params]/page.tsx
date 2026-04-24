import type { Metadata } from "next";
import SimulateurIS from "../SimulateurIS";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerIS, fmtEur } from "../isCalc";

const BENEFICES = [10000, 25000, 42500, 50000, 75000, 100000, 150000, 200000, 300000, 500000, 1000000];

function parseSlug(slug: string): { benefice: number } | null {
  const m = slug.match(/^(\d+)-euros-benefice$/);
  if (!m) return null;
  return { benefice: parseInt(m[1]) };
}

export function generateStaticParams() {
  return BENEFICES.map((b) => ({ params: `${b}-euros-benefice` }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { benefice } = parsed;
  const resPME = calculerIS({ beneficeImposable: benefice, eligibleTauxReduit: true });
  const resGE = calculerIS({ beneficeImposable: benefice, eligibleTauxReduit: false });

  return {
    alternates: { canonical: `/simulateur-impot-societe/${slug}` },
    title: `IS ${benefice.toLocaleString("fr-FR")} EUR de benefice - Simulation 2026`,
    description: `Impot societe pour ${benefice.toLocaleString("fr-FR")} EUR de benefice : ${fmtEur(resPME.impotTotal)} en PME (taux effectif ${resPME.tauxEffectif.toFixed(1)}%), ${fmtEur(resGE.impotTotal)} pour une grande entreprise. Economie PME : ${fmtEur(resGE.impotTotal - resPME.impotTotal)}.`,
    keywords: `IS ${benefice} euros, impot societe ${benefice}, calcul IS ${benefice} benefice, taux reduit ${benefice}`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { benefice } = parsed;
  if (!BENEFICES.includes(benefice)) notFound();

  const resPME = calculerIS({ beneficeImposable: benefice, eligibleTauxReduit: true });
  const resGE = calculerIS({ beneficeImposable: benefice, eligibleTauxReduit: false });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien d'IS pour ${benefice.toLocaleString("fr-FR")} EUR de benefice ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un benefice imposable de ${benefice.toLocaleString("fr-FR")} EUR, une PME eligible au taux reduit paie ${fmtEur(resPME.impotTotal)} d'IS (15% sur les 42 500 premiers EUR + 25% au-dela). Une grande entreprise paie ${fmtEur(resGE.impotTotal)} (25% sur tout). L'economie pour une PME eligible est de ${fmtEur(resGE.impotTotal - resPME.impotTotal)}.`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb
        currentPage={`${benefice.toLocaleString("fr-FR")} EUR benefice`}
        parentPage="Simulateur IS"
        parentHref="/simulateur-impot-societe"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏦
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          IS pour {benefice.toLocaleString("fr-FR")} EUR de benefice
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calcul de l&apos;Impot sur les Societes 2026 pour {benefice.toLocaleString("fr-FR")} EUR de benefice imposable.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg shadow-emerald-200/50">
          <p className="text-emerald-100 text-sm mb-1">PME taux reduit</p>
          <p className="text-4xl font-extrabold">{fmtEur(resPME.impotTotal)}</p>
          <p className="text-emerald-100 mt-1 text-sm">
            Taux effectif : {resPME.tauxEffectif.toFixed(2)}%
          </p>
          <div className="h-px bg-white/20 my-3" />
          <p className="text-emerald-100 text-xs">Benefice net</p>
          <p className="text-xl font-bold">{fmtEur(resPME.beneficeNet)}</p>
        </div>
        <div className="bg-gradient-to-br from-slate-600 to-slate-800 text-white rounded-2xl p-6">
          <p className="text-slate-200 text-sm mb-1">Grande entreprise (25%)</p>
          <p className="text-4xl font-extrabold">{fmtEur(resGE.impotTotal)}</p>
          <p className="text-slate-200 mt-1 text-sm">
            Taux effectif : {resGE.tauxEffectif.toFixed(2)}%
          </p>
          <div className="h-px bg-white/20 my-3" />
          <p className="text-slate-200 text-xs">Benefice net</p>
          <p className="text-xl font-bold">{fmtEur(resGE.beneficeNet)}</p>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-8">
        <p className="text-emerald-800 text-sm">
          <strong>Economie avec le taux reduit PME :</strong> {fmtEur(resGE.impotTotal - resPME.impotTotal)} sur l&apos;annee.
          Verifiez votre eligibilite (CA &lt; 10M EUR, capital libere, 75% personnes physiques).
        </p>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Personnaliser la simulation</h2>
      <SimulateurIS />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres benefices</h2>
        <div className="flex flex-wrap gap-2">
          {BENEFICES.filter(b => b !== benefice).map(b => (
            <a key={b} href={`/simulateur-impot-societe/${b}-euros-benefice`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all">
              {b.toLocaleString("fr-FR")} EUR
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-impot-societe" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
