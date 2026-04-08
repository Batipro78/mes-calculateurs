import type { Metadata } from "next";
import CalculateurSurfaceCercle from "../CalculateurSurfaceCercle";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const RAYONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 50, 100];

function fmt(n: number): string { return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

function parseSlug(slug: string): { rayon: number } | null {
  const match = slug.match(/^rayon-(\d+)$/);
  if (!match) return null;
  return { rayon: parseInt(match[1]) };
}

export function generateStaticParams() { return RAYONS.map((r) => ({ params: `rayon-${r}` })); }

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const s = Math.PI * parsed.rayon * parsed.rayon;
  return { title: `Surface cercle rayon ${parsed.rayon} = ${fmt(s)}`, description: `Surface d'un cercle de rayon ${parsed.rayon} = ${fmt(s)} unites\u00b2. Perimetre = ${fmt(2 * Math.PI * parsed.rayon)}. Formule et calcul detaille.` };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const { rayon } = parsed;
  const surface = Math.PI * rayon * rayon;
  const perimetre = 2 * Math.PI * rayon;

  return (
    <div>
      <Breadcrumb currentPage={`Rayon ${rayon}`} parentPage="Surface Cercle" parentHref="/calcul-surface-cercle" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-xl shadow-sm">⭕</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Cercle de rayon {rayon}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Surface, perimetre et diametre.</p>
      <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl p-8 shadow-lg shadow-blue-200/50 mb-8">
        <p className="text-blue-200 mb-1">Rayon = {rayon}</p>
        <p className="text-5xl font-extrabold tracking-tight">S = {fmt(surface)}</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div><p className="text-blue-200">Diametre</p><p className="font-semibold text-lg">{rayon * 2}</p></div>
          <div><p className="text-blue-200">Perimetre</p><p className="font-semibold text-lg">{fmt(perimetre)}</p></div>
          <div><p className="text-blue-200">Formule</p><p className="font-semibold text-lg">&pi; &times; {rayon}&sup2;</p></div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres rayons</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Rayon</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Surface</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Perimetre</th>
            </tr></thead>
            <tbody>
              {RAYONS.map((r) => (
                <tr key={r} className={`border-b border-slate-100 ${r === rayon ? "bg-blue-50/50" : ""}`}>
                  <td className="py-2.5 px-2">{r === rayon ? <span className="font-bold text-blue-600">{r}</span> : <a href={`/calcul-surface-cercle/rayon-${r}`} className="text-slate-700 hover:text-blue-600">{r}</a>}</td>
                  <td className={`py-2.5 px-2 text-right font-bold ${r === rayon ? "text-blue-600" : "text-slate-700"}`}>{fmt(Math.PI * r * r)}</td>
                  <td className="py-2.5 px-2 text-right text-slate-500">{fmt(2 * Math.PI * r)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif</h2>
      <CalculateurSurfaceCercle />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <RelatedCalculators currentSlug="/calcul-surface-cercle" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
