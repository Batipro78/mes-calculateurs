import type { Metadata } from "next";
import CalculateurRentabilite from "../CalculateurRentabilite";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const PRIX = [80000, 100000, 120000, 150000, 180000, 200000, 250000, 300000, 400000, 500000];
const LOYERS = [400, 500, 600, 700, 800, 900, 1000, 1200, 1500];

function fmt(n: number): string { return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function fmtInt(n: number): string { return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }); }

function parseSlug(slug: string): { prix: number; loyer: number } | null {
  const match = slug.match(/^(\d+)-euros-(\d+)-euros-mois$/);
  if (!match) return null;
  return { prix: parseInt(match[1]), loyer: parseInt(match[2]) };
}

export function generateStaticParams() {
  const slugs: string[] = [];
  for (const p of PRIX) {
    for (const l of [500, 700, 800, 1000]) {
      slugs.push(`${p}-euros-${l}-euros-mois`);
    }
  }
  return slugs.map((s) => ({ params: s }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const { prix, loyer } = parsed;
  const renta = ((loyer * 12) / prix) * 100;
  return {
    title: `Rentabilite locative : ${fmtInt(prix)} \u20ac, ${loyer} \u20ac/mois = ${fmt(renta)}% brut`,
    description: `Investissement de ${fmtInt(prix)} \u20ac avec un loyer de ${loyer} \u20ac/mois : rentabilite brute de ${fmt(renta)}%. Calcul detaille brut et net.`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const { prix, loyer } = parsed;
  const loyerAnnuel = loyer * 12;
  const rentaBrute = (loyerAnnuel / prix) * 100;
  const investTotal = prix * 1.08; // +8% frais
  const rentaNette = ((loyerAnnuel * 0.9) / investTotal) * 100; // -10% charges approx

  return (
    <div>
      <Breadcrumb currentPage={`${fmtInt(prix)} \u20ac - ${loyer} \u20ac/mois`} parentPage="Rentabilite Locative" parentHref="/calcul-rentabilite-locative" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">🏢</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Rentabilite : {fmtInt(prix)} &euro; / {loyer} &euro; par mois</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Rentabilite brute et nette estimee pour cet investissement.</p>

      <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-8 shadow-lg shadow-amber-200/50 mb-8">
        <p className="text-amber-200 mb-1">{fmtInt(prix)} &euro; / {loyer} &euro; par mois</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmt(rentaBrute)} <span className="text-2xl font-semibold">% brut</span></p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div><p className="text-amber-200">Nette estimee</p><p className="font-semibold text-lg">~{fmt(rentaNette)}%</p></div>
          <div><p className="text-amber-200">Loyer/an</p><p className="font-semibold text-lg">{fmtInt(loyerAnnuel)} &euro;</p></div>
          <div><p className="text-amber-200">Invest. total</p><p className="font-semibold text-lg">~{fmtInt(investTotal)} &euro;</p></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Rentabilite selon le loyer ({fmtInt(prix)} &euro;)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Loyer/mois</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Renta brute</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Loyer/an</th>
            </tr></thead>
            <tbody>
              {LOYERS.map((l) => {
                const r = ((l * 12) / prix) * 100;
                return (
                  <tr key={l} className={`border-b border-slate-100 ${l === loyer ? "bg-amber-50/50" : ""}`}>
                    <td className="py-2.5 px-2">{l === loyer ? <span className="font-bold text-amber-600">{l} &euro;</span> : <a href={`/calcul-rentabilite-locative/${prix}-euros-${l}-euros-mois`} className="text-slate-700 hover:text-amber-600">{l} &euro;</a>}</td>
                    <td className={`py-2.5 px-2 text-right font-bold ${l === loyer ? "text-amber-600" : "text-slate-700"}`}>{fmt(r)}%</td>
                    <td className="py-2.5 px-2 text-right text-slate-500">{fmtInt(l * 12)} &euro;</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur complet</h2>
      <CalculateurRentabilite />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Investissement de {fmtInt(prix)} &euro; a {loyer} &euro;/mois</h2>
        <p className="text-slate-600 leading-relaxed">
          Un bien achete <strong>{fmtInt(prix)} &euro;</strong> et loue <strong>{loyer} &euro;/mois</strong> genere une rentabilite brute de <strong>{fmt(rentaBrute)}%</strong>.
          Apres charges et frais, la rentabilite nette estimee est d&apos;environ <strong>{fmt(rentaNette)}%</strong>.
          {rentaBrute >= 7 ? " C'est une excellente rentabilite." : rentaBrute >= 5 ? " C'est une bonne rentabilite." : rentaBrute >= 3 ? " C'est dans la moyenne nationale." : " C'est en dessous de la moyenne."}
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-rentabilite-locative" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
