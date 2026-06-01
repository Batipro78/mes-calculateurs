import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurIndemniteBE from "../CalculateurIndemniteBE";
import Breadcrumb from "../../../components/Breadcrumb";
import {
  calculerIndemniteLicenciementBE,
  preavisSemainesBE,
} from "../indemniteLicenciementBeCalc";

const BRUTS = [2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000];
const ANNEES = [1, 2, 5, 10, 15, 20, 25, 30];

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-BE");
}

type Parsed = { brut: number; annees: number };

function parseSlug(slug: string): Parsed | null {
  const m = slug.match(/^(\d+)-euros-(\d+)-ans$/);
  if (!m) return null;
  const brut = parseInt(m[1], 10);
  const annees = parseInt(m[2], 10);
  if (!BRUTS.includes(brut) || !ANNEES.includes(annees)) return null;
  return { brut, annees };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const b of BRUTS) {
    for (const a of ANNEES) {
      params.push({ params: `${b}-euros-${a}-ans` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const res = calculerIndemniteLicenciementBE(parsed.brut, parsed.annees * 12);
  return {
    alternates: { canonical: `/be/indemnite-licenciement/${slug}` },
    title: `Indemnite licenciement ${parsed.brut} EUR brut ${parsed.annees} ans Belgique`,
    description: `Pour un brut de ${parsed.brut} EUR/mois et ${parsed.annees} ans d'anciennete en Belgique : indemnite ${fmt(res.indemniteBrute)} EUR brute (${res.preavisSemaines} semaines). Statut unifie 2026.`,
    keywords: `indemnite licenciement ${parsed.brut} ${parsed.annees} ans belgique, preavis ${parsed.annees} ans, calcul rupture`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const res = calculerIndemniteLicenciementBE(parsed.brut, parsed.annees * 12);

  // Comparaison par anciennete
  const comparaisonAnciennete = ANNEES.map((a) => ({
    annees: a,
    res: calculerIndemniteLicenciementBE(parsed.brut, a * 12),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quelle indemnite pour ${parsed.brut} EUR brut et ${parsed.annees} ans d'anciennete en Belgique ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un salaire brut de ${parsed.brut} EUR/mois et une anciennete de ${parsed.annees} ans en Belgique (statut unifie post-2014), l'indemnite de licenciement est de ${fmt(res.indemniteBrute)} EUR brute. Cela correspond a ${res.preavisSemaines} semaines de remuneration (preavis officiel non preste). L'indemnite nette apres precompte sera d'environ ${fmt(res.indemniteBrute * 0.55)} EUR.`,
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
        currentPage={`${parsed.brut} EUR / ${parsed.annees} ans`}
        parentPage="Indemnite Licenciement"
        parentHref="/be/indemnite-licenciement"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📄
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Indemnite licenciement {parsed.brut} EUR brut / {parsed.annees} ans
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calcul detaille en Belgique selon le statut unifie post-2014.
      </p>

      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg shadow-indigo-200/50 mb-8">
        <p className="text-indigo-100 mb-1">Indemnite brute estimee</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(res.indemniteBrute)}{" "}
          <span className="text-2xl font-semibold">EUR</span>
        </p>
        <p className="text-indigo-100 mt-2 text-sm">
          {res.preavisSemaines} semaines de remuneration de reference
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Indemnite selon l&apos;anciennete (meme brut)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Anciennete
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Preavis
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Indemnite
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Lien
                </th>
              </tr>
            </thead>
            <tbody>
              {comparaisonAnciennete.map((c) => (
                <tr
                  key={c.annees}
                  className={`border-b border-slate-100 ${
                    c.annees === parsed.annees ? "bg-indigo-50/40" : ""
                  }`}
                >
                  <td className="py-2.5 px-2 font-medium text-slate-700">
                    {c.annees} an{c.annees > 1 ? "s" : ""}
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">
                    {c.res.preavisSemaines} sem
                  </td>
                  <td className="py-2.5 px-2 text-right font-bold text-indigo-600">
                    {fmt(c.res.indemniteBrute)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right">
                    <a
                      href={`/be/indemnite-licenciement/${parsed.brut}-euros-${c.annees}-ans`}
                      className="text-indigo-600 hover:underline text-xs font-medium"
                    >
                      voir →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Calculateur interactif
      </h2>
      <CalculateurIndemniteBE />


      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-3">
          Autres bruts ({parsed.annees} ans)
        </h3>
        <div className="flex flex-wrap gap-2">
          {BRUTS.filter((b) => b !== parsed.brut).map((b) => (
            <a
              key={b}
              href={`/be/indemnite-licenciement/${b}-euros-${parsed.annees}-ans`}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all"
            >
              {b} EUR
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
