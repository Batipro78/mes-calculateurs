import type { Metadata } from "next";
import CalculateurEssence from "../CalculateurEssence";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const DISTANCES = [50, 100, 200, 300, 400, 500, 600, 750, 1000, 1500];
const CONSOS = [5, 6, 7, 8, 10];

function fmt(n: number): string { return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function fmtInt(n: number): string { return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }); }

function parseSlug(slug: string): { distance: number; conso: number } | null {
  const match = slug.match(/^(\d+)-km-(\d+)-litres$/);
  if (!match) return null;
  return { distance: parseInt(match[1]), conso: parseInt(match[2]) };
}

export function generateStaticParams() {
  const slugs: string[] = [];
  for (const d of DISTANCES) {
    for (const c of CONSOS) {
      slugs.push(`${d}-km-${c}-litres`);
    }
  }
  return slugs.map((s) => ({ params: s }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const { distance, conso } = parsed;
  const litres = (conso / 100) * distance;
  const cout = litres * 1.75;
  return {
    title: `Cout trajet ${distance} km a ${conso} L/100 = ${fmt(cout)} \u20ac`,
    description: `Trajet de ${distance} km avec une consommation de ${conso} L/100km : ${fmt(litres)} litres, cout ${fmt(cout)} \u20ac (a 1,75\u20ac/L). Tableau par distance et consommation.`,
    keywords: `cout trajet ${distance} km, consommation ${conso} litres 100, essence ${distance} km, carburant ${distance} km prix`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const { distance, conso } = parsed;
  const prixL = 1.75;
  const litres = (conso / 100) * distance;
  const cout = litres * prixL;
  const coutKm = cout / distance;

  return (
    <div>
      <Breadcrumb currentPage={`${distance} km - ${conso} L/100`} parentPage="Consommation Essence" parentHref="/calcul-consommation-essence" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center text-xl shadow-sm">⛽</div>
        <h1 className="text-3xl font-extrabold text-slate-800">{distance} km a {conso} L/100km</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Cout, litres et prix au kilometre pour ce trajet.</p>

      <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-2xl p-8 shadow-lg shadow-red-200/50 mb-8">
        <p className="text-red-200 mb-1">{distance} km a {conso} L/100km (1,75 &euro;/L)</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmt(cout)} <span className="text-2xl font-semibold">&euro;</span></p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div><p className="text-red-200">Litres</p><p className="font-semibold text-lg">{fmt(litres)} L</p></div>
          <div><p className="text-red-200">Cout/km</p><p className="font-semibold text-lg">{fmt(coutKm)} &euro;</p></div>
          <div><p className="text-red-200">Aller-retour</p><p className="font-semibold text-lg">{fmt(cout * 2)} &euro;</p></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Cout selon la distance ({conso} L/100km)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Distance</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Litres</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Cout (1,75 &euro;/L)</th>
            </tr></thead>
            <tbody>
              {DISTANCES.map((d) => {
                const l = (conso / 100) * d;
                const c = l * prixL;
                return (
                  <tr key={d} className={`border-b border-slate-100 ${d === distance ? "bg-red-50/50" : ""}`}>
                    <td className="py-2.5 px-2">{d === distance ? <span className="font-bold text-red-600">{d} km</span> : <a href={`/calcul-consommation-essence/${d}-km-${conso}-litres`} className="text-slate-700 hover:text-red-600">{d} km</a>}</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{fmt(l)} L</td>
                    <td className={`py-2.5 px-2 text-right font-bold ${d === distance ? "text-red-600" : "text-slate-700"}`}>{fmt(c)} &euro;</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Cout selon la consommation ({distance} km)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Consommation</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Litres</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Cout</th>
            </tr></thead>
            <tbody>
              {CONSOS.map((co) => {
                const l = (co / 100) * distance;
                const c = l * prixL;
                return (
                  <tr key={co} className={`border-b border-slate-100 ${co === conso ? "bg-red-50/50" : ""}`}>
                    <td className="py-2.5 px-2">{co === conso ? <span className="font-bold text-red-600">{co} L/100</span> : <a href={`/calcul-consommation-essence/${distance}-km-${co}-litres`} className="text-slate-700 hover:text-red-600">{co} L/100</a>}</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{fmt(l)} L</td>
                    <td className={`py-2.5 px-2 text-right font-bold ${co === conso ? "text-red-600" : "text-slate-700"}`}>{fmt(c)} &euro;</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif</h2>
      <CalculateurEssence />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <RelatedCalculators currentSlug="/calcul-consommation-essence" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
