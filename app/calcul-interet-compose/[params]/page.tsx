import type { Metadata } from "next";
import CalculateurInteretCompose from "../CalculateurInteretCompose";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const CAPITAUX = [1000, 5000, 10000, 20000, 50000, 100000];
const TAUX = [3, 5, 7, 8, 10];
const DUREES = [5, 10, 15, 20, 25, 30];

function fmtInt(n: number): string { return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }); }

function parseSlug(slug: string): { capital: number; taux: number; duree: number } | null {
  const match = slug.match(/^(\d+)-euros-(\d+)-pourcent-(\d+)-ans$/);
  if (!match) return null;
  return { capital: parseInt(match[1]), taux: parseInt(match[2]), duree: parseInt(match[3]) };
}

export function generateStaticParams() {
  const slugs: string[] = [];
  for (const c of CAPITAUX) {
    for (const t of [3, 5, 8, 10]) {
      for (const d of [10, 20, 30]) {
        slugs.push(`${c}-euros-${t}-pourcent-${d}-ans`);
      }
    }
  }
  return slugs.map((s) => ({ params: s }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const { capital, taux, duree } = parsed;
  const final = capital * Math.pow(1 + taux / 100, duree);
  return {
    title: `${fmtInt(capital)} \u20ac a ${taux}% pendant ${duree} ans = ${fmtInt(final)} \u20ac`,
    description: `${fmtInt(capital)} \u20ac places a ${taux}% par an pendant ${duree} ans deviennent ${fmtInt(final)} \u20ac grace aux interets composes. Gain : +${fmtInt(final - capital)} \u20ac.`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const { capital, taux, duree } = parsed;
  const final = capital * Math.pow(1 + taux / 100, duree);
  const interets = final - capital;
  const gain = ((final - capital) / capital) * 100;

  const annees = Array.from({ length: duree }, (_, i) => ({
    a: i + 1,
    total: capital * Math.pow(1 + taux / 100, i + 1),
  }));

  return (
    <div>
      <Breadcrumb currentPage={`${fmtInt(capital)} \u20ac a ${taux}%`} parentPage="Interet Compose" parentHref="/calcul-interet-compose" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">📈</div>
        <h1 className="text-3xl font-extrabold text-slate-800">{fmtInt(capital)} &euro; a {taux}% pendant {duree} ans</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Evolution avec interets composes, sans versement mensuel.</p>

      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl p-8 shadow-lg shadow-cyan-200/50 mb-8">
        <p className="text-cyan-200 mb-1">{fmtInt(capital)} &euro; a {taux}% / an pendant {duree} ans</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmtInt(final)} <span className="text-2xl font-semibold">&euro;</span></p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div><p className="text-cyan-200">Capital initial</p><p className="font-semibold text-lg">{fmtInt(capital)} &euro;</p></div>
          <div><p className="text-cyan-200">Interets gagnes</p><p className="font-semibold text-lg">+{fmtInt(interets)} &euro;</p></div>
          <div><p className="text-cyan-200">Gain total</p><p className="font-semibold text-lg">+{gain.toFixed(0)}%</p></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Evolution annee par annee</h2>
        <div className="overflow-x-auto max-h-64 overflow-y-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200 sticky top-0 bg-white">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Annee</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Capital</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Interets cumules</th>
            </tr></thead>
            <tbody>
              {annees.map((a) => (
                <tr key={a.a} className="border-b border-slate-100">
                  <td className="py-2 px-2 text-slate-700">{a.a}</td>
                  <td className="py-2 px-2 text-right font-bold text-slate-800">{fmtInt(a.total)} &euro;</td>
                  <td className="py-2 px-2 text-right text-cyan-600">+{fmtInt(a.total - capital)} &euro;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Comparaison par taux ({fmtInt(capital)} &euro;, {duree} ans)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Taux</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Capital final</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Interets</th>
            </tr></thead>
            <tbody>
              {TAUX.map((t) => {
                const f = capital * Math.pow(1 + t / 100, duree);
                return (
                  <tr key={t} className={`border-b border-slate-100 ${t === taux ? "bg-cyan-50/50" : ""}`}>
                    <td className="py-2.5 px-2">{t === taux ? <span className="font-bold text-cyan-600">{t}%</span> : <a href={`/calcul-interet-compose/${capital}-euros-${t}-pourcent-${duree}-ans`} className="text-slate-700 hover:text-cyan-600">{t}%</a>}</td>
                    <td className={`py-2.5 px-2 text-right font-bold ${t === taux ? "text-cyan-600" : "text-slate-700"}`}>{fmtInt(f)} &euro;</td>
                    <td className="py-2.5 px-2 text-right text-slate-500">+{fmtInt(f - capital)} &euro;</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur interactif</h2>
      <CalculateurInteretCompose />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">{fmtInt(capital)} &euro; places a {taux}% pendant {duree} ans</h2>
        <p className="text-slate-600 leading-relaxed">
          En placant <strong>{fmtInt(capital)} &euro;</strong> a un taux annuel de <strong>{taux}%</strong> pendant <strong>{duree} ans</strong>,
          votre capital atteint <strong>{fmtInt(final)} &euro;</strong> grace aux interets composes, soit un gain de <strong>+{fmtInt(interets)} &euro;</strong> (+{gain.toFixed(0)}%).
          {duree >= 20 && " Sur cette duree, les interets composes representent une part significative du capital final — c'est l'effet boule de neige."}
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-interet-compose" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
