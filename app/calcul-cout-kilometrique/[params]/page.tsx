import type { Metadata } from "next";
import CalculateurCoutKm from "../CalculateurCoutKm";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const DISTANCES = [3000, 5000, 8000, 10000, 12000, 15000, 20000, 25000, 30000];
const CV_SLUGS = ["3cv", "4cv", "5cv", "6cv", "7cv"];
const CV_LABELS = ["3 CV", "4 CV", "5 CV", "6 CV", "7+ CV"];

function calculer(cvIdx: number, d: number): number {
  const baremes = [
    [[5000, 0.529, 0], [20000, 0.316, 1065], [Infinity, 0.370, 0]],
    [[5000, 0.606, 0], [20000, 0.340, 1330], [Infinity, 0.407, 0]],
    [[5000, 0.636, 0], [20000, 0.357, 1395], [Infinity, 0.427, 0]],
    [[5000, 0.665, 0], [20000, 0.374, 1457], [Infinity, 0.447, 0]],
    [[5000, 0.697, 0], [20000, 0.394, 1515], [Infinity, 0.470, 0]],
  ];
  for (const [max, coef, fixe] of baremes[cvIdx]) {
    if (d <= max) return d * coef + fixe;
  }
  return 0;
}

function fmtInt(n: number): string { return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }); }

function parseSlug(slug: string): { distance: number; cvIdx: number } | null {
  const match = slug.match(/^(\d+)-km-(\d+)cv$/);
  if (!match) return null;
  const d = parseInt(match[1]);
  const cv = parseInt(match[2]);
  const idx = cv <= 3 ? 0 : cv <= 4 ? 1 : cv <= 5 ? 2 : cv <= 6 ? 3 : 4;
  return { distance: d, cvIdx: idx };
}

export function generateStaticParams() {
  const slugs: string[] = [];
  for (const d of DISTANCES) { for (const cv of CV_SLUGS) { slugs.push(`${d}-km-${cv}`); } }
  return slugs.map((s) => ({ params: s }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const indemnite = calculer(parsed.cvIdx, parsed.distance);
  return {
    alternates: { canonical: `/calcul-cout-kilometrique/${slug}` },
    title: `Cout km : ${fmtInt(parsed.distance)} km, ${CV_LABELS[parsed.cvIdx]} = ${fmtInt(indemnite)} \u20ac`,
    description: `Indemnite kilometrique pour ${fmtInt(parsed.distance)} km avec un vehicule ${CV_LABELS[parsed.cvIdx]} : ${fmtInt(indemnite)} \u20ac (bareme fiscal 2026).`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const { distance, cvIdx } = parsed;
  const indemnite = calculer(cvIdx, distance);
  const coutKm = (indemnite / distance).toFixed(3);

  return (
    <div>
      <Breadcrumb currentPage={`${fmtInt(distance)} km - ${CV_LABELS[cvIdx]}`} parentPage="Cout Kilometrique" parentHref="/calcul-cout-kilometrique" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">🚙</div>
        <h1 className="text-3xl font-extrabold text-slate-800">{fmtInt(distance)} km — {CV_LABELS[cvIdx]}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Indemnite kilometrique bareme fiscal 2026.</p>

      <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl p-8 shadow-lg shadow-sky-200/50 mb-8">
        <p className="text-sky-200 mb-1">{fmtInt(distance)} km &middot; {CV_LABELS[cvIdx]}</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmtInt(indemnite)} <span className="text-2xl font-semibold">&euro;</span></p>
        <p className="text-sky-200 text-sm mt-2">Cout/km : {coutKm} &euro; &middot; Mensuel : {fmtInt(indemnite / 12)} &euro;</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Indemnite par distance ({CV_LABELS[cvIdx]})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Distance</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Indemnite</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Cout/km</th>
            </tr></thead>
            <tbody>
              {DISTANCES.map((d) => {
                const ind = calculer(cvIdx, d);
                return (
                  <tr key={d} className={`border-b border-slate-100 ${d === distance ? "bg-sky-50/50" : ""}`}>
                    <td className="py-2.5 px-2">{d === distance ? <span className="font-bold text-sky-600">{fmtInt(d)} km</span> : <a href={`/calcul-cout-kilometrique/${d}-km-${CV_SLUGS[cvIdx]}`} className="text-slate-700 hover:text-sky-600">{fmtInt(d)} km</a>}</td>
                    <td className={`py-2.5 px-2 text-right font-bold ${d === distance ? "text-sky-600" : "text-slate-700"}`}>{fmtInt(ind)} &euro;</td>
                    <td className="py-2.5 px-2 text-right text-slate-500">{(ind / d).toFixed(3)} &euro;</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif</h2>
      <CalculateurCoutKm />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <RelatedCalculators currentSlug="/calcul-cout-kilometrique" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
