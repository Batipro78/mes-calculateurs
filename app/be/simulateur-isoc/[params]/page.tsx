import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SimulateurISOCBE from "../SimulateurISOCBE";
import { calculerISOC } from "../isocBeCalc";
import AdSlot from "../../../components/AdSlot";
import Breadcrumb from "../../../components/Breadcrumb";

const BENEFICES = [10000, 25000, 50000, 75000, 100000, 150000, 250000, 500000, 1000000];
const STATUTS = [
  { slug: "pme", label: "PME", estPME: true },
  { slug: "non-pme", label: "Non-PME", estPME: false },
];

function fmt(n: number): string {
  return n.toLocaleString("fr-BE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("fr-BE");
}

function fmtPct(pct: number): string {
  return (pct * 100).toLocaleString("fr-BE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function parseSlug(slug: string): {
  benefice: number;
  statut: typeof STATUTS[number];
} | null {
  const m = slug.match(/^(\d+)-euros-([a-z-]+)$/);
  if (!m) return null;
  const benefice = parseInt(m[1], 10);
  const statut = STATUTS.find((s) => s.slug === m[2]);
  if (!statut || !BENEFICES.includes(benefice)) return null;
  return { benefice, statut };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const b of BENEFICES) {
    for (const s of STATUTS) {
      params.push({ params: `${b}-euros-${s.slug}` });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { benefice, statut } = parsed;
  const resultat = calculerISOC(benefice, statut.estPME);

  return {
    alternates: { canonical: `/be/simulateur-isoc/${slug}` },
    title: `ISOC ${statut.label} sur ${fmtInt(benefice)} EUR - Belgique 2026`,
    description: `Simulation ISOC belge ${statut.label} sur bénéfice ${fmtInt(benefice)} EUR : ISOC = ${fmt(resultat.impotTotal)} EUR, taux effectif ${fmtPct(resultat.tauxEffectif)}%. Conforme barèmes 2026.`,
    keywords: `ISOC ${statut.label}, Belgique, ${fmtInt(benefice)} euros, impôt des sociétés`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { benefice, statut } = parsed;
  const resultat = calculerISOC(benefice, statut.estPME);

  // Tableau de comparaison avec l'autre statut
  const autreStatut = STATUTS.find((s) => s.slug !== statut.slug)!;
  const resultatAutreStatut = calculerISOC(benefice, autreStatut.estPME);
  const economieDifference = Math.abs(
    resultat.impotTotal - resultatAutreStatut.impotTotal
  );

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel est l'ISOC sur un bénéfice de ${fmtInt(benefice)} EUR pour une ${statut.label} en Belgique ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un bénéfice imposable de ${fmtInt(benefice)} EUR, une ${statut.label} paie un ISOC de ${fmt(resultat.impotTotal)} EUR en Belgique (taux effectif ${fmtPct(resultat.tauxEffectif)}%).`,
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
        currentPage={`${fmtInt(benefice)} EUR (${statut.label})`}
        parentPage="Simulateur ISOC Belgique"
        parentHref="/be/simulateur-isoc"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💼
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          ISOC {statut.label} sur {fmtInt(benefice)} EUR
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulation ISOC belge pour une {statut.label} avec bénéfice imposable de{" "}
        {fmtInt(benefice)} EUR.
      </p>

      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-8 shadow-lg shadow-blue-200/50 mb-8">
        <p className="text-blue-100 mb-1">Impôt des sociétés (ISOC)</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(resultat.impotTotal)}{" "}
          <span className="text-2xl font-semibold">EUR</span>
        </p>
        <p className="text-blue-100 mt-2 text-sm">
          Taux effectif {fmtPct(resultat.tauxEffectif)}% • Bénéfice{" "}
          {fmtInt(benefice)} EUR
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Comparaison avec le statut {autreStatut.label}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Statut
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  ISOC
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Taux effectif
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Lien
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">
                  {statut.label}
                </td>
                <td className="py-2.5 px-2 text-right text-slate-600">
                  {fmt(resultat.impotTotal)} EUR
                </td>
                <td className="py-2.5 px-2 text-right font-bold text-blue-600">
                  {fmtPct(resultat.tauxEffectif)}%
                </td>
                <td className="py-2.5 px-2 text-right text-slate-400">
                  (actuel)
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-2 font-medium text-slate-700">
                  {autreStatut.label}
                </td>
                <td className="py-2.5 px-2 text-right text-slate-600">
                  {fmt(resultatAutreStatut.impotTotal)} EUR
                </td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-800">
                  {fmtPct(resultatAutreStatut.tauxEffectif)}%
                </td>
                <td className="py-2.5 px-2 text-right">
                  <a
                    href={`/be/simulateur-isoc/${benefice}-euros-${autreStatut.slug}`}
                    className="text-blue-600 hover:underline text-xs font-medium"
                  >
                    voir →
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {resultat.economiePME > 0 && (
          <p className="text-xs text-green-600 font-medium mt-3">
            Économie PME vs taux normal : {fmt(resultat.economiePME)} EUR
          </p>
        )}
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Calculateur interactif
      </h2>
      <SimulateurISOCBE />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          ISOC {statut.label} sur {fmtInt(benefice)} EUR : détail
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour un bénéfice imposable de <strong>{fmtInt(benefice)} EUR</strong>,
          une <strong>{statut.label}</strong> en Belgique paie un ISOC de{" "}
          <strong>{fmt(resultat.impotTotal)} EUR</strong> (taux effectif{" "}
          <strong>{fmtPct(resultat.tauxEffectif)}%</strong>).
        </p>
        <p className="text-slate-600 leading-relaxed">
          {statut.estPME
            ? "Cette entreprise bénéficie du taux réduit PME de 20% sur la première tranche de 100 000 EUR, puis du taux normal de 25% au-delà."
            : "Cette entreprise est soumise au taux normal de 25% sur la totalité du bénéfice imposable."}
        </p>
      </section>

      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-3">
          Autres bénéfices (statut {statut.label})
        </h3>
        <div className="flex flex-wrap gap-2">
          {BENEFICES.filter((b) => b !== benefice).map((b) => (
            <a
              key={b}
              href={`/be/simulateur-isoc/${b}-euros-${statut.slug}`}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
            >
              {fmtInt(b)} EUR
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
