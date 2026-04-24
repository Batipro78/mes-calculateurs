import type { Metadata } from "next";
import CalculateurPlusValue from "../CalculateurPlusValue";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const PRIX_ACHAT = [100000, 150000, 200000, 250000, 300000, 400000, 500000];
const PLUS_VALUES = [25000, 50000, 75000, 100000, 150000, 200000];
const ANNEES = [2, 5, 8, 10, 15, 20, 22, 25, 30];

function fmt(n: number): string { return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }); }

function abattementIR(a: number): number {
  if (a < 6) return 0; if (a <= 21) return (a - 5) * 6; return 100;
}
function abattementPS(a: number): number {
  if (a < 6) return 0; if (a <= 21) return (a - 5) * 1.65; if (a === 22) return 28; if (a <= 30) return 28 + (a - 22) * 9; return 100;
}

function parseSlug(slug: string): { prixAchat: number; plusValue: number; annees: number } | null {
  const match = slug.match(/^(\d+)-euros-plus-value-(\d+)-euros-(\d+)-ans$/);
  if (!match) return null;
  return { prixAchat: parseInt(match[1]), plusValue: parseInt(match[2]), annees: parseInt(match[3]) };
}

export function generateStaticParams() {
  const slugs: string[] = [];
  for (const pv of PLUS_VALUES) {
    for (const a of [5, 10, 15, 22, 30]) {
      slugs.push(`200000-euros-plus-value-${pv}-euros-${a}-ans`);
    }
  }
  for (const pa of PRIX_ACHAT) {
    slugs.push(`${pa}-euros-plus-value-100000-euros-10-ans`);
  }
  return slugs.map((s) => ({ params: s }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const { plusValue, annees } = parsed;
  const abIR = abattementIR(annees);
  const pvIR = plusValue * (1 - abIR / 100);
  const ir = pvIR * 0.19;
  const abPS_ = abattementPS(annees);
  const pvPS = plusValue * (1 - abPS_ / 100);
  const ps = pvPS * 0.172;
  const total = ir + ps;

  return {
    alternates: { canonical: `/calcul-plus-value-immobiliere/${slug}` },
    title: `Plus-value ${fmt(plusValue)} \u20ac apres ${annees} ans = ${fmt(total)} \u20ac d'impot`,
    description: `Plus-value immobiliere de ${fmt(plusValue)} \u20ac apres ${annees} ans de detention : ${fmt(total)} \u20ac d'impot (IR ${fmt(ir)} \u20ac + PS ${fmt(ps)} \u20ac). Abattement IR ${abIR.toFixed(0)}%.`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const { prixAchat, plusValue, annees } = parsed;

  const abIR = abattementIR(annees);
  const abPS_ = abattementPS(annees);
  const pvIR = plusValue * (1 - abIR / 100);
  const pvPS = plusValue * (1 - abPS_ / 100);
  const ir = pvIR * 0.19;
  const ps = pvPS * 0.172;
  const total = ir + ps;
  const prixVente = prixAchat + plusValue;

  return (
    <div>
      <Breadcrumb currentPage={`PV ${fmt(plusValue)} \u20ac - ${annees} ans`} parentPage="Plus-Value Immobiliere" parentHref="/calcul-plus-value-immobiliere" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-sm">🏡</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Plus-value de {fmt(plusValue)} &euro; apres {annees} ans</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Impot, abattements et detail pour une plus-value de {fmt(plusValue)} &euro; avec {annees} ans de detention.</p>

      <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-8 shadow-lg shadow-green-200/50 mb-8">
        <p className="text-green-200 mb-1">Impot total sur {fmt(plusValue)} &euro; de plus-value</p>
        <p className="text-5xl font-extrabold tracking-tight">{annees >= 30 ? "0" : fmt(total)} <span className="text-2xl font-semibold">&euro;</span></p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-4 gap-3 text-sm">
          <div><p className="text-green-200">IR (19%)</p><p className="font-semibold text-lg">{fmt(ir)} &euro;</p></div>
          <div><p className="text-green-200">PS (17,2%)</p><p className="font-semibold text-lg">{fmt(ps)} &euro;</p></div>
          <div><p className="text-green-200">Abatt. IR</p><p className="font-semibold text-lg">{abIR.toFixed(0)}%</p></div>
          <div><p className="text-green-200">Abatt. PS</p><p className="font-semibold text-lg">{abPS_.toFixed(1)}%</p></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Impot selon la duree de detention</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Duree</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Abatt. IR</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Impot total</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Net vendeur</th>
            </tr></thead>
            <tbody>
              {ANNEES.map((a) => {
                const aIR = abattementIR(a); const aPS = abattementPS(a);
                const pIR = plusValue * (1 - aIR / 100) * 0.19;
                const pPS = plusValue * (1 - aPS / 100) * 0.172;
                const t = pIR + pPS;
                return (
                  <tr key={a} className={`border-b border-slate-100 ${a === annees ? "bg-green-50/50" : ""}`}>
                    <td className="py-2.5 px-2">{a === annees ? <span className="font-bold text-green-600">{a} ans</span> : <a href={`/calcul-plus-value-immobiliere/${prixAchat}-euros-plus-value-${plusValue}-euros-${a}-ans`} className="text-slate-700 hover:text-green-600">{a} ans</a>}</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{aIR.toFixed(0)}%</td>
                    <td className={`py-2.5 px-2 text-right font-bold ${a === annees ? "text-green-600" : "text-slate-700"}`}>{fmt(t)} &euro;</td>
                    <td className="py-2.5 px-2 text-right text-slate-500">{fmt(prixVente - t)} &euro;</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur interactif</h2>
      <CalculateurPlusValue />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Plus-value de {fmt(plusValue)} &euro; apres {annees} ans</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Avec une plus-value brute de <strong>{fmt(plusValue)} &euro;</strong> et <strong>{annees} ans de detention</strong>,
          l&apos;abattement IR est de {abIR.toFixed(0)}% et l&apos;abattement PS de {abPS_.toFixed(1)}%.
          L&apos;impot total s&apos;eleve a <strong>{fmt(total)} &euro;</strong>.
          {annees >= 22 && " Vous etes exonere d'impot sur le revenu (22+ ans)."}
          {annees >= 30 && " Vous etes totalement exonere (30+ ans)."}
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-plus-value-immobiliere" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
