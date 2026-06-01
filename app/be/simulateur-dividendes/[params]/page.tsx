import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SimulateurDividendesBE from "../SimulateurDividendesBE";
import { REGIMES_FISCAUX, calculerDividendesBE } from "../dividendesBeCalc";
import Breadcrumb from "../../../components/Breadcrumb";

const MONTANTS = [500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];

function fmt(n: number): string {
  return n.toLocaleString("fr-BE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("fr-BE");
}

function parseSlug(
  slug: string
): { montant: number; regime: (typeof REGIMES_FISCAUX)[number] } | null {
  const m = slug.match(/^(\d+)-euros-(.+)$/);
  if (!m) return null;
  const montant = parseInt(m[1], 10);
  const regime = REGIMES_FISCAUX.find((r) => r.slug === m[2]);
  if (!regime || !MONTANTS.includes(montant)) return null;
  return { montant, regime };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const m of MONTANTS) {
    for (const r of REGIMES_FISCAUX) {
      params.push({ params: `${m}-euros-${r.slug}` });
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

  const { montant, regime } = parsed;
  const resultat = calculerDividendesBE(montant, regime.slug, false);

  return {
    alternates: { canonical: `/be/simulateur-dividendes/${slug}` },
    title: `Dividendes ${montant} EUR ${regime.label} - Calcul Belgique 2026`,
    description: `Dividendes bruts ${montant} EUR avec précompte mobilier ${regime.label} en Belgique : précompte ${fmt(resultat.precompte)} EUR, dividende net ${fmt(resultat.dividendeNet)} EUR.`,
    keywords: `${montant} euros dividendes, précompte ${regime.label}, simulation dividendes Belgique`,
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

  const { montant, regime } = parsed;
  const resultat = calculerDividendesBE(montant, regime.slug, false);

  // Tableau de comparaison sur autres régimes
  const autresResultats = REGIMES_FISCAUX.filter(
    (r) => r.slug !== regime.slug
  ).map((r) => ({
    regime: r,
    resultat: calculerDividendesBE(montant, r.slug, false),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien fait ${montant} EUR de dividendes avec précompte ${regime.label} en Belgique ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${montant} EUR de dividendes bruts avec précompte ${regime.label} = précompte de ${fmt(resultat.precompte)} EUR, dividende net de ${fmt(resultat.dividendeNet)} EUR.`,
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
        currentPage={`${montant} EUR ${regime.label}`}
        parentPage="Simulateur Dividendes Belgique"
        parentHref="/be/simulateur-dividendes"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💰
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {montant} EUR dividendes - {regime.label}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulation de dividendes bruts {montant} EUR avec précompte mobilier
        belgique au régime {regime.label}.
      </p>

      <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-8 shadow-lg shadow-green-200/50 mb-8">
        <p className="text-green-100 mb-1">Dividende net</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(resultat.dividendeNet)}{" "}
          <span className="text-2xl font-semibold">EUR</span>
        </p>
        <p className="text-green-100 mt-2 text-sm">
          {montant} EUR bruts - {fmt(resultat.precompte)} EUR de précompte (
          {(regime.taux * 100).toFixed(1)}%)
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Avec d'autres régimes belges (meme montant brut)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Régime
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Précompte
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Net
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Lien
                </th>
              </tr>
            </thead>
            <tbody>
              {autresResultats.map((r) => (
                <tr key={r.regime.slug} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 font-medium text-slate-700">
                    {r.regime.label} ({(r.regime.taux * 100).toFixed(1)}%)
                  </td>
                  <td className="py-2.5 px-2 text-right text-red-600 font-medium">
                    -{fmt(r.resultat.precompte)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right font-bold text-emerald-600">
                    {fmt(r.resultat.dividendeNet)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right">
                    <a
                      href={`/be/simulateur-dividendes/${montant}-euros-${r.regime.slug}`}
                      className="text-emerald-600 hover:underline text-xs font-medium"
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
      <SimulateurDividendesBE />


      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {montant} EUR dividendes avec {regime.label} : détail
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour un montant brut de <strong>{montant} EUR</strong> en Belgique,
          le précompte mobilier au régime <strong>{regime.label}</strong> (taux{" "}
          {(regime.taux * 100).toFixed(1)}%) s'élève à{" "}
          <strong>{fmt(resultat.precompte)} EUR</strong>. Le dividende net versé
          est donc de <strong>{fmt(resultat.dividendeNet)} EUR</strong>.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Le régime{" "}
          {regime.slug === "standard-30"
            ? "standard à 30% s'applique par défaut à tous les dividendes et intérêts versés par les entreprises belges"
            : regime.slug === "vvprbis-15"
              ? "VVPRbis à 15% s'applique aux petites et moyennes entreprises constituées après 2013 avec un apport minimum de 18 550 EUR de capital"
              : "liquidation à 6,5% s'applique aux réserves de liquidation constituées après 2025 et distribuées au moins 3 ans après leur constitution"}
          .
        </p>
      </section>

      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-3">
          Autres montants au régime {regime.label}
        </h3>
        <div className="flex flex-wrap gap-2">
          {MONTANTS.filter((m) => m !== montant).map((m) => (
            <a
              key={m}
              href={`/be/simulateur-dividendes/${m}-euros-${regime.slug}`}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all"
            >
              {fmtInt(m)} EUR
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
