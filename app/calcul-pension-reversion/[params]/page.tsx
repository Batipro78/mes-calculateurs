import type { Metadata } from "next";
import CalculateurPensionReversion from "../CalculateurPensionReversion";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const PENSIONS = [800, 1000, 1200, 1500, 1800, 2000, 2500, 3000];

function fmt(n: number): string { return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }); }

function parseSlug(slug: string): { pension: number } | null {
  const match = slug.match(/^(\d+)-euros$/);
  if (!match) return null;
  return { pension: parseInt(match[1]) };
}

export function generateStaticParams() {
  return PENSIONS.map((p) => ({ params: `${p}-euros` }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const rev = Math.round(parsed.pension * 0.54);
  return {
    title: `Pension reversion ${fmt(parsed.pension)} \u20ac = ${fmt(rev)} \u20ac/mois (54%)`,
    description: `Pension de reversion pour une retraite de ${fmt(parsed.pension)} \u20ac/mois : ${fmt(rev)} \u20ac/mois (regime general 54%), ${fmt(Math.round(parsed.pension * 0.60))} \u20ac (AGIRC-ARRCO 60%).`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const { pension } = parsed;
  const revGen = Math.round(pension * 0.54);
  const revComp = Math.round(pension * 0.60);

  return (
    <div>
      <Breadcrumb currentPage={`${fmt(pension)} \u20ac`} parentPage="Pension Reversion" parentHref="/calcul-pension-reversion" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">💜</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Reversion : pension de {fmt(pension)} &euro;</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Montant de la pension de reversion selon le regime.</p>
      <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg shadow-violet-200/50 mb-8">
        <p className="text-violet-200 mb-1">Pension du defunt : {fmt(pension)} &euro;/mois</p>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div><p className="text-violet-200 text-sm">Regime general (54%)</p><p className="text-4xl font-extrabold">{fmt(revGen)} &euro;</p></div>
          <div><p className="text-violet-200 text-sm">AGIRC-ARRCO (60%)</p><p className="text-4xl font-extrabold">{fmt(revComp)} &euro;</p></div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Comparaison par montant de pension</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Pension defunt</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">General (54%)</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Complementaire (60%)</th>
            </tr></thead>
            <tbody>
              {PENSIONS.map((p) => (
                <tr key={p} className={`border-b border-slate-100 ${p === pension ? "bg-violet-50/50" : ""}`}>
                  <td className="py-2.5 px-2">{p === pension ? <span className="font-bold text-violet-600">{fmt(p)} &euro;</span> : <a href={`/calcul-pension-reversion/${p}-euros`} className="text-slate-700 hover:text-violet-600">{fmt(p)} &euro;</a>}</td>
                  <td className={`py-2.5 px-2 text-right font-bold ${p === pension ? "text-violet-600" : "text-slate-700"}`}>{fmt(Math.round(p * 0.54))} &euro;</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{fmt(Math.round(p * 0.60))} &euro;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur complet</h2>
      <CalculateurPensionReversion />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <RelatedCalculators currentSlug="/calcul-pension-reversion" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
