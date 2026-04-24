import type { Metadata } from "next";
import CalculateurGratificationStage from "../CalculateurGratificationStage";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const DUREES = [1, 2, 3, 4, 5, 6];
const HEURES = [20, 25, 28, 35];
const GRATIF = 4.35;

function fmt(n: number): string { return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }); }

function parseSlug(slug: string): { duree: number; heures: number } | null {
  const match = slug.match(/^(\d+)-mois-(\d+)-heures$/);
  if (!match) return null;
  return { duree: parseInt(match[1]), heures: parseInt(match[2]) };
}

export function generateStaticParams() {
  const slugs: string[] = [];
  for (const d of DUREES) { for (const h of HEURES) { slugs.push(`${d}-mois-${h}-heures`); } }
  return slugs.map((s) => ({ params: s }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const hMois = parsed.heures * 52 / 12;
  const mensuel = GRATIF * hMois;
  return {
    alternates: { canonical: `/calcul-gratification-stage/${slug}` },
    title: `Gratification stage ${parsed.duree} mois ${parsed.heures}h/sem = ${fmt(mensuel)} \u20ac/mois`,
    description: `Stage de ${parsed.duree} mois a ${parsed.heures}h/semaine : gratification de ${fmt(mensuel)} \u20ac/mois (minimum legal 2026). Total : ${fmt(mensuel * parsed.duree)} \u20ac.`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const { duree, heures } = parsed;
  const hMois = heures * 52 / 12;
  const mensuel = GRATIF * hMois;
  const total = mensuel * duree;
  const obligatoire = duree > 2;

  return (
    <div>
      <Breadcrumb currentPage={`${duree} mois - ${heures}h`} parentPage="Gratification Stage" parentHref="/calcul-gratification-stage" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">🎓</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Stage {duree} mois a {heures}h/semaine</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Gratification minimale legale 2026.</p>
      <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-2xl p-8 shadow-lg shadow-indigo-200/50 mb-8">
        <p className="text-indigo-200 mb-1">{duree} mois &middot; {heures}h/sem &middot; {GRATIF} &euro;/h</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmt(mensuel)} <span className="text-2xl font-semibold">&euro;/mois</span></p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div><p className="text-indigo-200">Total stage</p><p className="font-semibold text-lg">{fmt(total)} &euro;</p></div>
          <div><p className="text-indigo-200">Heures/mois</p><p className="font-semibold text-lg">{fmt(hMois)}h</p></div>
          <div><p className="text-indigo-200">Statut</p><p className="font-semibold text-lg">{obligatoire ? "Obligatoire" : "Facultatif"}</p></div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Comparaison par duree ({heures}h/sem)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Duree</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Mensuel</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Total</th>
            </tr></thead>
            <tbody>
              {DUREES.map((d) => (
                <tr key={d} className={`border-b border-slate-100 ${d === duree ? "bg-indigo-50/50" : ""}`}>
                  <td className="py-2.5 px-2">{d === duree ? <span className="font-bold text-indigo-600">{d} mois</span> : <a href={`/calcul-gratification-stage/${d}-mois-${heures}-heures`} className="text-slate-700 hover:text-indigo-600">{d} mois</a>}</td>
                  <td className="py-2.5 px-2 text-right font-bold text-slate-700">{fmt(mensuel)} &euro;</td>
                  <td className={`py-2.5 px-2 text-right font-bold ${d === duree ? "text-indigo-600" : "text-slate-700"}`}>{fmt(mensuel * d)} &euro;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif</h2>
      <CalculateurGratificationStage />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <RelatedCalculators currentSlug="/calcul-gratification-stage" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
