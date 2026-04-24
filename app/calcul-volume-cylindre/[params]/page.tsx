import type { Metadata } from "next";
import CalculateurVolumeCylindre from "../CalculateurVolumeCylindre";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const COMBOS = [[2,5],[3,8],[5,10],[5,15],[5,20],[7,10],[10,10],[10,15],[10,20],[10,30],[15,20],[15,30],[20,30],[20,40],[25,50],[30,50]];

function fmt(n: number): string { return n.toLocaleString("fr-FR", { maximumFractionDigits: 2 }); }

function parseSlug(slug: string): { rayon: number; hauteur: number } | null {
  const match = slug.match(/^rayon-(\d+)-hauteur-(\d+)$/);
  if (!match) return null;
  return { rayon: parseInt(match[1]), hauteur: parseInt(match[2]) };
}

export function generateStaticParams() { return COMBOS.map(([r, h]) => ({ params: `rayon-${r}-hauteur-${h}` })); }

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const v = Math.PI * parsed.rayon * parsed.rayon * parsed.hauteur;
  return {
    alternates: { canonical: `/calcul-volume-cylindre/${slug}` }, title: `Volume cylindre r=${parsed.rayon} h=${parsed.hauteur} = ${fmt(v)}`, description: `Volume d'un cylindre de rayon ${parsed.rayon} et hauteur ${parsed.hauteur} = ${fmt(v)} unites\u00b3. Soit ${fmt(v / 1000)} litres.` };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const { rayon, hauteur } = parsed;
  const volume = Math.PI * rayon * rayon * hauteur;

  return (
    <div>
      <Breadcrumb currentPage={`r=${rayon} h=${hauteur}`} parentPage="Volume Cylindre" parentHref="/calcul-volume-cylindre" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-sm">🛢️</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Cylindre r={rayon}, h={hauteur}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Volume, surface et conversion en litres.</p>
      <div className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-2xl p-8 shadow-lg shadow-teal-200/50 mb-8">
        <p className="text-teal-200 mb-1">Rayon {rayon} &times; Hauteur {hauteur}</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmt(volume)}</p>
        <p className="text-teal-200 text-sm mt-1">unites&sup3; = {fmt(volume / 1000)} litres</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres dimensions</h2>
        <div className="flex flex-wrap gap-2">
          {COMBOS.filter(([r, h]) => !(r === rayon && h === hauteur)).map(([r, h]) => (
            <a key={`${r}-${h}`} href={`/calcul-volume-cylindre/rayon-${r}-hauteur-${h}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50/50 transition-all">
              r={r} h={h}
            </a>
          ))}
        </div>
      </div>
      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif</h2>
      <CalculateurVolumeCylindre />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <RelatedCalculators currentSlug="/calcul-volume-cylindre" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
