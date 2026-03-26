import type { Metadata } from "next";
import CalculateurIndemnite from "../CalculateurIndemnite";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const SALAIRES = [1500, 1800, 2000, 2200, 2500, 2800, 3000, 3500, 4000, 4500, 5000];
const ANCIENNES = [1, 2, 3, 5, 8, 10, 12, 15, 18, 20, 25, 30];

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function calculIndemnite(salaire: number, annees: number): number {
  if (annees < 0.6667) return 0;
  const partAvant10 = Math.min(annees, 10);
  const partApres10 = Math.max(annees - 10, 0);
  return salaire * (partAvant10 * (1 / 4) + partApres10 * (1 / 3));
}

function parseSlug(slug: string): { salaire: number; annees: number } | null {
  const match = slug.match(/^(\d+)-euros-(\d+)-ans$/);
  if (!match) return null;
  return { salaire: parseInt(match[1]), annees: parseInt(match[2]) };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const s of SALAIRES) {
    for (const a of ANCIENNES) {
      params.push({ params: `${s}-euros-${a}-ans` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { salaire, annees } = parsed;
  const indemnite = calculIndemnite(salaire, annees);
  const moisInd = salaire > 0 ? indemnite / salaire : 0;

  return {
    title: `Indemnite licenciement ${fmtInt(salaire)} EUR brut - ${annees} ans d'anciennete`,
    description: `Indemnite de licenciement pour ${fmtInt(salaire)} EUR brut/mois avec ${annees} ans d'anciennete : ${fmt(indemnite)} EUR (${fmt(moisInd)} mois de salaire). Calcul legal 2026.`,
    keywords: `indemnite licenciement ${fmtInt(salaire)} euros ${annees} ans, calcul indemnite ${annees} ans anciennete, prime licenciement ${fmtInt(salaire)}`,
    openGraph: {
      title: `${fmtInt(salaire)} EUR brut x ${annees} ans = ${fmt(indemnite)} EUR d'indemnite`,
      description: `Indemnite legale : ${fmt(indemnite)} EUR pour ${annees} ans a ${fmtInt(salaire)} EUR brut/mois. Soit ${fmt(moisInd)} mois de salaire.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { salaire, annees } = parsed;
  if (!SALAIRES.includes(salaire) || !ANCIENNES.includes(annees)) notFound();

  const indemnite = calculIndemnite(salaire, annees);
  const moisInd = salaire > 0 ? indemnite / salaire : 0;

  // Detail du calcul
  const partAvant10 = Math.min(annees, 10);
  const partApres10 = Math.max(annees - 10, 0);
  const montantAvant10 = salaire * partAvant10 * (1 / 4);
  const montantApres10 = salaire * partApres10 * (1 / 3);

  // Comparaison par salaire
  const comparaisonSalaires = SALAIRES.map((s) => {
    const ind = calculIndemnite(s, annees);
    return { salaire: s, indemnite: ind, mois: s > 0 ? ind / s : 0, isCurrent: s === salaire };
  });

  // Comparaison par anciennete
  const comparaisonAnciennes = ANCIENNES.map((a) => {
    const ind = calculIndemnite(salaire, a);
    return { annees: a, indemnite: ind, mois: salaire > 0 ? ind / salaire : 0, isCurrent: a === annees };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quelle indemnite pour ${annees} ans d'anciennete a ${fmtInt(salaire)} EUR brut ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour ${annees} ans d'anciennete avec un salaire de ${fmtInt(salaire)} EUR brut mensuel, l'indemnite legale de licenciement est de ${fmt(indemnite)} EUR, soit ${fmt(moisInd)} mois de salaire. Calcul : 1/4 de mois par annee (10 premieres annees) + 1/3 de mois par annee (au-dela).`,
        },
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb
        currentPage={`${fmtInt(salaire)} EUR - ${annees} ans`}
        parentPage="Indemnite Licenciement"
        parentHref="/indemnite-licenciement"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📄
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Indemnite : {fmtInt(salaire)} EUR brut - {annees} ans
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Indemnite legale de licenciement pour un salaire de {fmtInt(salaire)} EUR brut/mois avec {annees} ans d&apos;anciennete.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-2xl p-8 shadow-lg shadow-indigo-200/50 mb-8">
        <p className="text-indigo-200 mb-1">Indemnite legale de licenciement</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(indemnite)} <span className="text-2xl font-semibold">EUR</span>
        </p>
        <p className="text-indigo-200 mt-2">soit {fmt(moisInd)} mois de salaire</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-indigo-200">Salaire brut</p>
            <p className="font-semibold">{fmtInt(salaire)} EUR/mois</p>
          </div>
          <div>
            <p className="text-indigo-200">Anciennete</p>
            <p className="font-semibold">{annees} ans</p>
          </div>
          <div>
            <p className="text-indigo-200">Net approx.</p>
            <p className="font-semibold">~{fmt(indemnite * 0.9)} EUR</p>
          </div>
        </div>
      </div>

      {/* Detail du calcul */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Detail du calcul</h2>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700 space-y-1">
          {partAvant10 > 0 && (
            <p>1/4 x {fmtInt(salaire)} EUR x {fmt(partAvant10)} ans = {fmt(montantAvant10)} EUR</p>
          )}
          {partApres10 > 0 && (
            <p>1/3 x {fmtInt(salaire)} EUR x {fmt(partApres10)} ans = {fmt(montantApres10)} EUR</p>
          )}
          <p className="font-bold pt-2 border-t border-slate-200">Total = {fmt(indemnite)} EUR</p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
            <p className="text-xs text-indigo-400">10 premieres annees (1/4)</p>
            <p className="text-xl font-extrabold text-indigo-700">{fmt(montantAvant10)} EUR</p>
          </div>
          {partApres10 > 0 && (
            <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
              <p className="text-xs text-violet-400">Au-dela de 10 ans (1/3)</p>
              <p className="text-xl font-extrabold text-violet-700">{fmt(montantApres10)} EUR</p>
            </div>
          )}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="text-xs text-slate-400">En mois de salaire</p>
            <p className="text-xl font-extrabold text-slate-700">{fmt(moisInd)} mois</p>
          </div>
        </div>
      </div>

      {/* Comparaison par salaire */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {annees} ans d&apos;anciennete : indemnite par salaire
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Salaire brut</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Indemnite</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">En mois</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonSalaires.map((row) => (
                <tr key={row.salaire} className={`border-b border-slate-100 ${row.isCurrent ? "bg-indigo-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-indigo-600">{fmtInt(row.salaire)} EUR</span>
                    ) : (
                      <a href={`/indemnite-licenciement/${row.salaire}-euros-${annees}-ans`} className="text-slate-700 hover:text-indigo-600 transition-colors">
                        {fmtInt(row.salaire)} EUR
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-indigo-600" : "text-slate-700"}`}>
                    {fmt(row.indemnite)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{fmt(row.mois)} mois</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par anciennete */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {fmtInt(salaire)} EUR brut : indemnite par anciennete
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Anciennete</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Indemnite</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">En mois</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonAnciennes.map((row) => (
                <tr key={row.annees} className={`border-b border-slate-100 ${row.isCurrent ? "bg-indigo-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-indigo-600">{row.annees} ans</span>
                    ) : (
                      <a href={`/indemnite-licenciement/${salaire}-euros-${row.annees}-ans`} className="text-slate-700 hover:text-indigo-600 transition-colors">
                        {row.annees} ans
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-indigo-600" : "text-slate-700"}`}>
                    {fmt(row.indemnite)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{fmt(row.mois)} mois</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur interactif</h2>
      <CalculateurIndemnite />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Indemnite de licenciement : {fmtInt(salaire)} EUR brut, {annees} ans
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour un salaire brut de <strong>{fmtInt(salaire)} EUR/mois</strong> avec{" "}
          <strong>{annees} ans d&apos;anciennete</strong>, l&apos;indemnite legale de licenciement
          est de <strong>{fmt(indemnite)} EUR</strong>, soit <strong>{fmt(moisInd)} mois de salaire</strong>.
          Ce montant s&apos;applique au licenciement pour motif personnel, economique, et a la rupture conventionnelle.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le calcul suit le bareme legal : <strong>1/4 de mois par annee</strong> pour les 10 premieres annees,
          puis <strong>1/3 de mois par annee</strong> au-dela. Votre convention collective peut prevoir
          un montant superieur — verifiez toujours.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Fiscalite</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>L&apos;indemnite legale est exoneree d&apos;impot sur le revenu</li>
          <li>Exoneree de CSG/CRDS dans la limite de l&apos;indemnite legale</li>
          <li>Au-dela (convention collective), imposition possible</li>
          <li>Minimum 8 mois d&apos;anciennete requis</li>
        </ul>
      </section>

      {/* Liens */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations</h2>
        <div className="flex flex-wrap gap-2">
          {SALAIRES.filter((s) => s !== salaire).slice(0, 5).map((s) => (
            <a
              key={`s-${s}`}
              href={`/indemnite-licenciement/${s}-euros-${annees}-ans`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all"
            >
              {fmtInt(s)} EUR - {annees} ans
            </a>
          ))}
          {ANCIENNES.filter((a) => a !== annees).slice(0, 5).map((a) => (
            <a
              key={`a-${a}`}
              href={`/indemnite-licenciement/${salaire}-euros-${a}-ans`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all"
            >
              {fmtInt(salaire)} EUR - {a} ans
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/indemnite-licenciement" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
