import type { Metadata } from "next";
import CalculateurJoursOuvres from "../CalculateurJoursOuvres";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const MOIS_NOMS = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];
const MOIS_NOMS_CAP = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];

// Jours feries 2026
const JF = [
  new Date(2026,0,1), new Date(2026,3,6), new Date(2026,4,1), new Date(2026,4,8),
  new Date(2026,4,14), new Date(2026,4,25), new Date(2026,6,14), new Date(2026,7,15),
  new Date(2026,10,1), new Date(2026,10,11), new Date(2026,11,25),
];

function compterJO(mois: number): { ouvres: number; calendaires: number; feries: number } {
  let ouvres = 0, calendaires = 0, feries = 0;
  const d = new Date(2026, mois, 1);
  const fin = new Date(2026, mois + 1, 0);
  while (d <= fin) {
    calendaires++;
    const dow = d.getDay();
    const isJF = JF.some((j) => j.getDate() === d.getDate() && j.getMonth() === d.getMonth());
    if (dow === 0 || dow === 6) { /* weekend */ }
    else if (isJF) { feries++; }
    else { ouvres++; }
    d.setDate(d.getDate() + 1);
  }
  return { ouvres, calendaires, feries };
}

function parseSlug(slug: string): { mois: number } | null {
  const idx = MOIS_NOMS.indexOf(slug);
  if (idx === -1) return null;
  return { mois: idx };
}

export function generateStaticParams() {
  return MOIS_NOMS.map((m) => ({ params: m }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const { ouvres, feries } = compterJO(parsed.mois);
  const nom = MOIS_NOMS_CAP[parsed.mois];
  return {
    title: `Jours ouvres ${nom} 2026 — ${ouvres} jours travailles`,
    description: `${nom} 2026 compte ${ouvres} jours ouvres et ${feries} jour(s) ferie(s). Calendrier complet, jours feries et planning.`,
    keywords: `jours ouvres ${nom.toLowerCase()} 2026, nombre jours travailles ${nom.toLowerCase()}, calendrier ${nom.toLowerCase()} 2026, jours feries ${nom.toLowerCase()}`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const { mois } = parsed;
  const nom = MOIS_NOMS_CAP[mois];
  const { ouvres, calendaires, feries } = compterJO(mois);

  const allMois = MOIS_NOMS.map((_, i) => ({ nom: MOIS_NOMS_CAP[i], slug: MOIS_NOMS[i], ...compterJO(i) }));

  return (
    <div>
      <Breadcrumb currentPage={`${nom} 2026`} parentPage="Jours Ouvres" parentHref="/calcul-jours-ouvres" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">📅</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Jours ouvres {nom} 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Nombre de jours travailles, feries et calendaires pour {nom} 2026.</p>

      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg shadow-indigo-200/50 mb-8">
        <p className="text-indigo-200 mb-1">{nom} 2026</p>
        <p className="text-5xl font-extrabold tracking-tight">{ouvres} <span className="text-2xl font-semibold">jours ouvres</span></p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div><p className="text-indigo-200">Calendaires</p><p className="font-semibold text-lg">{calendaires}</p></div>
          <div><p className="text-indigo-200">Feries</p><p className="font-semibold text-lg">{feries}</p></div>
          <div><p className="text-indigo-200">Week-ends</p><p className="font-semibold text-lg">{calendaires - ouvres - feries}</p></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Tous les mois 2026</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Mois</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Jours ouvres</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Feries</th>
            </tr></thead>
            <tbody>
              {allMois.map((m) => (
                <tr key={m.slug} className={`border-b border-slate-100 ${m.slug === MOIS_NOMS[mois] ? "bg-indigo-50/50" : ""}`}>
                  <td className="py-2.5 px-2">{m.slug === MOIS_NOMS[mois] ? <span className="font-bold text-indigo-600">{m.nom}</span> : <a href={`/calcul-jours-ouvres/${m.slug}`} className="text-slate-700 hover:text-indigo-600">{m.nom}</a>}</td>
                  <td className={`py-2.5 px-2 text-right font-bold ${m.slug === MOIS_NOMS[mois] ? "text-indigo-600" : "text-slate-700"}`}>{m.ouvres}</td>
                  <td className="py-2.5 px-2 text-right text-slate-500">{m.feries}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif</h2>
      <CalculateurJoursOuvres />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Jours ouvres en {nom} 2026</h2>
        <p className="text-slate-600 leading-relaxed">
          Le mois de <strong>{nom} 2026</strong> compte <strong>{ouvres} jours ouvres</strong> (lundi-vendredi hors feries),
          {feries > 0 ? ` ${feries} jour(s) ferie(s)` : " aucun jour ferie"} et {calendaires} jours calendaires.
          {mois === 4 && " Mai est souvent le mois avec le moins de jours ouvres grace aux ponts (1er mai, 8 mai, Ascension, Pentecote)."}
          {mois === 7 && " Aout est le mois traditionnel des vacances en France."}
        </p>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres mois</h2>
        <div className="flex flex-wrap gap-2">
          {allMois.filter((m) => m.slug !== MOIS_NOMS[mois]).map((m) => (
            <a key={m.slug} href={`/calcul-jours-ouvres/${m.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all">
              {m.nom}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-jours-ouvres" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
