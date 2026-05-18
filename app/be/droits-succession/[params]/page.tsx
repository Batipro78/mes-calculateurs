import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurSuccessionBE from "../CalculateurSuccessionBE";
import AdSlot from "../../../components/AdSlot";
import Breadcrumb from "../../../components/Breadcrumb";
import { calculerSuccessionBE, type RegionBE } from "../droitsSuccessionBeCalc";

const PATRIMOINES = [100000, 200000, 300000, 500000, 750000, 1000000, 1500000];
const REGIONS: { slug: string; value: RegionBE; label: string }[] = [
  { slug: "wallonie", value: "wallonie", label: "Wallonie" },
  { slug: "flandre", value: "flandre", label: "Flandre" },
  { slug: "bruxelles", value: "bruxelles", label: "Bruxelles" },
];
const HERITIERS_VALS = [1, 2, 3];

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-BE");
}

type Parsed = { patrimoine: number; region: typeof REGIONS[number]; heritiers: number };

function parseSlug(slug: string): Parsed | null {
  const m = slug.match(/^(\d+)-euros-(wallonie|flandre|bruxelles)-(\d+)-heritiers?$/);
  if (!m) return null;
  const patrimoine = parseInt(m[1], 10);
  const region = REGIONS.find((r) => r.slug === m[2]);
  const heritiers = parseInt(m[3], 10);
  if (!PATRIMOINES.includes(patrimoine) || !region || !HERITIERS_VALS.includes(heritiers)) return null;
  return { patrimoine, region, heritiers };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const p of PATRIMOINES) {
    for (const r of REGIONS) {
      for (const h of HERITIERS_VALS) {
        params.push({ params: `${p}-euros-${r.slug}-${h}-heritier${h > 1 ? "s" : ""}` });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const res = calculerSuccessionBE(parsed.patrimoine, parsed.region.value, parsed.heritiers);
  return {
    alternates: { canonical: `/be/droits-succession/${slug}` },
    title: `Droits succession ${fmt(parsed.patrimoine)} EUR ${parsed.region.label} ${parsed.heritiers} heritier${parsed.heritiers > 1 ? "s" : ""}`,
    description: `Succession ${fmt(parsed.patrimoine)} EUR en ${parsed.region.label} avec ${parsed.heritiers} heritier${parsed.heritiers > 1 ? "s" : ""} en ligne directe : ${fmt(res.droitsTotal)} EUR de droits (${res.tauxMoyenEffectif.toFixed(1)} %).`,
    keywords: `succession ${parsed.patrimoine} ${parsed.region.slug}, heritage ${parsed.heritiers} enfants belgique`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const res = calculerSuccessionBE(parsed.patrimoine, parsed.region.value, parsed.heritiers);

  const comparaisonRegions = REGIONS.map((r) => ({
    region: r,
    res: calculerSuccessionBE(parsed.patrimoine, r.value, parsed.heritiers),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien de droits de succession pour ${fmt(parsed.patrimoine)} EUR en ${parsed.region.label} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un patrimoine de ${fmt(parsed.patrimoine)} EUR transmis en ligne directe a ${parsed.heritiers} heritier${parsed.heritiers > 1 ? "s" : ""} en ${parsed.region.label}, les droits de succession total s'elevent a ${fmt(res.droitsTotal)} EUR, soit un taux moyen effectif de ${res.tauxMoyenEffectif.toFixed(2)} %. Chaque heritier paiera ${fmt(res.droitsParHeritier)} EUR.`,
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
        currentPage={`${fmt(parsed.patrimoine)} EUR ${parsed.region.label} ${parsed.heritiers} heritier${parsed.heritiers > 1 ? "s" : ""}`}
        parentPage="Droits de Succession"
        parentHref="/be/droits-succession"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⚖️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Succession {fmt(parsed.patrimoine)} EUR / {parsed.region.label} / {parsed.heritiers} heritier{parsed.heritiers > 1 ? "s" : ""}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calcul detaille en ligne directe.
      </p>

      <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white rounded-2xl p-8 shadow-lg shadow-slate-300/50 mb-8">
        <p className="text-slate-300 mb-1">Droits de succession total</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(res.droitsTotal)} <span className="text-2xl font-semibold">EUR</span>
        </p>
        <p className="text-slate-300 mt-2 text-sm">
          Soit {res.tauxMoyenEffectif.toFixed(2)} % du patrimoine total
          <br />
          {fmt(res.droitsParHeritier)} EUR par heritier
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Comparaison entre regions (meme patrimoine & heritiers)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Region</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Droits total</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux moyen</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Lien</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonRegions.map((c) => (
                <tr key={c.region.value} className={`border-b border-slate-100 ${c.region.value === parsed.region.value ? "bg-slate-100" : ""}`}>
                  <td className="py-2.5 px-2 font-medium text-slate-700">{c.region.label}</td>
                  <td className="py-2.5 px-2 text-right font-bold text-slate-800">{fmt(c.res.droitsTotal)} EUR</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{c.res.tauxMoyenEffectif.toFixed(2)} %</td>
                  <td className="py-2.5 px-2 text-right">
                    <a href={`/be/droits-succession/${parsed.patrimoine}-euros-${c.region.slug}-${parsed.heritiers}-heritier${parsed.heritiers > 1 ? "s" : ""}`} className="text-slate-700 hover:underline text-xs font-medium">voir →</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif</h2>
      <CalculateurSuccessionBE />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-3">
          Autres patrimoines ({parsed.region.label}, {parsed.heritiers} heritier{parsed.heritiers > 1 ? "s" : ""})
        </h3>
        <div className="flex flex-wrap gap-2">
          {PATRIMOINES.filter((p) => p !== parsed.patrimoine).map((p) => (
            <a key={p} href={`/be/droits-succession/${p}-euros-${parsed.region.slug}-${parsed.heritiers}-heritier${parsed.heritiers > 1 ? "s" : ""}`} className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-slate-400 hover:text-slate-800 transition-all">
              {fmt(p)} EUR
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
