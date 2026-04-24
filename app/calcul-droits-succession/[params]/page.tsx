import type { Metadata } from "next";
import CalculateurSuccession from "../CalculateurSuccession";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const MONTANTS = [100000, 200000, 300000, 400000, 500000, 750000, 1000000];
const HERITIERS = [1, 2, 3];

function calculerDroits(montant: number, nb: number): number {
  const part = montant / nb;
  const imposable = Math.max(0, part - 100000);
  if (imposable <= 0) return 0;
  const tranches = [[8072,0.05],[12109,0.10],[15932,0.15],[552324,0.20],[902838,0.30],[1805677,0.40],[Infinity,0.45]];
  let droits = 0, restant = imposable, prec = 0;
  for (const [lim, taux] of tranches) { const a = Math.min(restant, lim - prec); if (a <= 0) break; droits += a * taux; restant -= a; prec = lim; }
  return droits * nb;
}

function fmt(n: number): string { return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }); }

function parseSlug(slug: string): { montant: number; heritiers: number } | null {
  const match = slug.match(/^(\d+)-euros-(\d+)-enfants$/);
  if (!match) return null;
  return { montant: parseInt(match[1]), heritiers: parseInt(match[2]) };
}

export function generateStaticParams() {
  const slugs: string[] = [];
  for (const m of MONTANTS) { for (const h of HERITIERS) { slugs.push(`${m}-euros-${h}-enfants`); } }
  return slugs.map((s) => ({ params: s }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const droits = calculerDroits(parsed.montant, parsed.heritiers);
  return {
    alternates: { canonical: `/calcul-droits-succession/${slug}` },
    title: `Succession ${fmt(parsed.montant)} \u20ac, ${parsed.heritiers} enfant${parsed.heritiers > 1 ? "s" : ""} = ${fmt(droits)} \u20ac de droits`,
    description: `Droits de succession pour ${fmt(parsed.montant)} \u20ac repartis entre ${parsed.heritiers} enfant${parsed.heritiers > 1 ? "s" : ""} : ${fmt(droits)} \u20ac. Abattement 100 000 \u20ac par enfant, bareme progressif.`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const { montant, heritiers } = parsed;
  const droits = calculerDroits(montant, heritiers);
  const taux = montant > 0 ? ((droits / montant) * 100).toFixed(1) : "0";

  return (
    <div>
      <Breadcrumb currentPage={`${fmt(montant)} \u20ac - ${heritiers} enfant${heritiers > 1 ? "s" : ""}`} parentPage="Droits Succession" parentHref="/calcul-droits-succession" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-xl shadow-sm">⚖️</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Succession {fmt(montant)} &euro; — {heritiers} enfant{heritiers > 1 ? "s" : ""}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Droits de succession en ligne directe, bareme 2026.</p>
      <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white rounded-2xl p-8 shadow-lg shadow-slate-300/50 mb-8">
        <p className="text-slate-300 mb-1">{fmt(montant)} &euro; / {heritiers} enfant{heritiers > 1 ? "s" : ""}</p>
        <p className="text-5xl font-extrabold tracking-tight">{droits === 0 ? "0" : fmt(droits)} <span className="text-2xl font-semibold">&euro;</span></p>
        <p className="text-slate-400 text-sm mt-1">Taux effectif : {taux}%</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Droits selon le montant ({heritiers} enfant{heritiers > 1 ? "s" : ""})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Succession</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Droits</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux effectif</th>
            </tr></thead>
            <tbody>
              {MONTANTS.map((m) => {
                const d = calculerDroits(m, heritiers);
                const t = m > 0 ? ((d / m) * 100).toFixed(1) : "0";
                return (
                  <tr key={m} className={`border-b border-slate-100 ${m === montant ? "bg-slate-50" : ""}`}>
                    <td className="py-2.5 px-2">{m === montant ? <span className="font-bold text-slate-800">{fmt(m)} &euro;</span> : <a href={`/calcul-droits-succession/${m}-euros-${heritiers}-enfants`} className="text-slate-700 hover:text-slate-900">{fmt(m)} &euro;</a>}</td>
                    <td className={`py-2.5 px-2 text-right font-bold ${m === montant ? "text-slate-800" : "text-slate-700"}`}>{fmt(d)} &euro;</td>
                    <td className="py-2.5 px-2 text-right text-slate-500">{t}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur complet</h2>
      <CalculateurSuccession />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <RelatedCalculators currentSlug="/calcul-droits-succession" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
