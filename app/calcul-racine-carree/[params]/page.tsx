import type { Metadata } from "next";
import CalculateurRacineCarree from "../CalculateurRacineCarree";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const NOMBRES = [2, 3, 4, 5, 7, 8, 9, 10, 12, 15, 16, 20, 25, 27, 32, 36, 49, 50, 64, 75, 81, 100, 121, 125, 144, 169, 196, 200, 225, 256, 289, 324, 361, 400, 500, 625, 729, 900, 1000, 10000];

function fmt(n: number): string { return n.toLocaleString("fr-FR", { minimumFractionDigits: 4, maximumFractionDigits: 6 }); }

function parseSlug(slug: string): { nombre: number } | null {
  const match = slug.match(/^racine-de-(\d+)$/);
  if (!match) return null;
  return { nombre: parseInt(match[1]) };
}

export function generateStaticParams() { return NOMBRES.map((n) => ({ params: `racine-de-${n}` })); }

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const r = Math.sqrt(parsed.nombre);
  const parfait = Math.abs(r - Math.round(r)) < 0.0000001;
  return {
    alternates: { canonical: `/calcul-racine-carree/${slug}` }, title: `Racine carree de ${parsed.nombre} = ${parfait ? Math.round(r) : fmt(r)}`, description: `\u221a${parsed.nombre} = ${parfait ? Math.round(r) : fmt(r)}. ${parfait ? `${parsed.nombre} est un carre parfait.` : `${parsed.nombre} n'est pas un carre parfait.`} Verification et calcul detaille.` };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const { nombre } = parsed;
  const racine = Math.sqrt(nombre);
  const parfait = Math.abs(racine - Math.round(racine)) < 0.0000001;

  return (
    <div>
      <Breadcrumb currentPage={`\u221a${nombre}`} parentPage="Racine Carree" parentHref="/calcul-racine-carree" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">&radic;</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Racine carree de {nombre}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">{parfait ? `${nombre} est un carre parfait` : `Resultat decimal et verification`}</p>

      <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-8 shadow-lg shadow-amber-200/50 mb-8">
        <p className="text-amber-200 mb-1">&radic;{nombre} =</p>
        <p className="text-5xl font-extrabold tracking-tight">{parfait ? Math.round(racine) : fmt(racine)}</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div><p className="text-amber-200">Carre parfait</p><p className="font-semibold text-lg">{parfait ? "Oui" : "Non"}</p></div>
          <div><p className="text-amber-200">Racine cubique</p><p className="font-semibold text-lg">{Math.cbrt(nombre).toLocaleString("fr-FR", { maximumFractionDigits: 4 })}</p></div>
          <div><p className="text-amber-200">Verification</p><p className="font-semibold text-lg">{(racine * racine).toLocaleString("fr-FR", { maximumFractionDigits: 2 })}</p></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres racines carrees</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Nombre</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Racine carree</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Carre parfait</th>
            </tr></thead>
            <tbody>
              {NOMBRES.filter(n => Math.abs(n - nombre) <= 200 || NOMBRES.indexOf(n) < 15).slice(0, 15).map((n) => {
                const r = Math.sqrt(n);
                const p = Math.abs(r - Math.round(r)) < 0.0000001;
                return (
                  <tr key={n} className={`border-b border-slate-100 ${n === nombre ? "bg-amber-50/50" : ""}`}>
                    <td className="py-2.5 px-2">{n === nombre ? <span className="font-bold text-amber-600">{n}</span> : <a href={`/calcul-racine-carree/racine-de-${n}`} className="text-slate-700 hover:text-amber-600">{n}</a>}</td>
                    <td className={`py-2.5 px-2 text-right font-bold ${n === nombre ? "text-amber-600" : "text-slate-700"}`}>{p ? Math.round(r) : r.toLocaleString("fr-FR", { maximumFractionDigits: 4 })}</td>
                    <td className="py-2.5 px-2 text-right">{p ? <span className="text-green-600 font-medium">Oui</span> : <span className="text-slate-400">Non</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif</h2>
      <CalculateurRacineCarree />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <RelatedCalculators currentSlug="/calcul-racine-carree" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
