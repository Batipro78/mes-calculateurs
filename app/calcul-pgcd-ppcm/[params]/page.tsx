import type { Metadata } from "next";
import CalculateurPgcdPpcm from "../CalculateurPgcdPpcm";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const PAIRES = [[6,8],[8,12],[10,15],[12,18],[14,21],[15,20],[16,24],[18,27],[20,30],[24,36],[28,42],[30,45],[36,48],[42,56],[48,72],[56,98],[60,84],[72,108],[84,126],[100,75],[120,84],[150,200],[180,252],[252,360]];

function pgcd(a: number, b: number): number { a=Math.abs(a);b=Math.abs(b); while(b){[a,b]=[b,a%b];} return a; }
function fmtInt(n: number): string { return n.toLocaleString("fr-FR"); }

function parseSlug(slug: string): { a: number; b: number } | null {
  const match = slug.match(/^(\d+)-et-(\d+)$/);
  if (!match) return null;
  return { a: parseInt(match[1]), b: parseInt(match[2]) };
}

export function generateStaticParams() {
  return PAIRES.map(([a, b]) => ({ params: `${a}-et-${b}` }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const g = pgcd(parsed.a, parsed.b);
  const p = (parsed.a * parsed.b) / g;
  return {
    title: `PGCD et PPCM de ${parsed.a} et ${parsed.b} — PGCD=${g}, PPCM=${fmtInt(p)}`,
    description: `PGCD(${parsed.a}, ${parsed.b}) = ${g}. PPCM(${parsed.a}, ${parsed.b}) = ${fmtInt(p)}. Algorithme d'Euclide detaille et decomposition.`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const { a, b } = parsed;
  const g = pgcd(a, b);
  const p = (a * b) / g;

  // Euclide
  const etapes: { ea: number; eb: number; q: number; r: number }[] = [];
  let ea = Math.max(a, b), eb = Math.min(a, b);
  while (eb > 0) { const q = Math.floor(ea / eb); const r = ea % eb; etapes.push({ ea, eb, q, r }); ea = eb; eb = r; }

  return (
    <div>
      <Breadcrumb currentPage={`${a} et ${b}`} parentPage="PGCD / PPCM" parentHref="/calcul-pgcd-ppcm" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center text-xl shadow-sm">🔢</div>
        <h1 className="text-3xl font-extrabold text-slate-800">PGCD et PPCM de {a} et {b}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Calcul detaille avec algorithme d&apos;Euclide.</p>

      <div className="bg-gradient-to-br from-purple-500 to-violet-600 text-white rounded-2xl p-8 shadow-lg shadow-purple-200/50 mb-8">
        <div className="grid grid-cols-2 gap-6">
          <div><p className="text-purple-200 text-sm mb-1">PGCD({a}, {b})</p><p className="text-4xl font-extrabold">{g}</p></div>
          <div><p className="text-purple-200 text-sm mb-1">PPCM({a}, {b})</p><p className="text-4xl font-extrabold">{fmtInt(p)}</p></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Algorithme d&apos;Euclide</h2>
        <div className="bg-purple-50/50 rounded-xl p-4 space-y-1 text-sm font-mono text-slate-700">
          {etapes.map((e, i) => (
            <p key={i}>{e.ea} = {e.eb} &times; {e.q} + <span className={e.r === 0 ? "font-bold text-purple-600" : ""}>{e.r}</span></p>
          ))}
          <p className="font-bold text-purple-600 mt-2">PGCD = {g}</p>
          <p className="text-slate-500 mt-1">PPCM = ({a} &times; {b}) / {g} = {fmtInt(p)}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres paires</h2>
        <div className="flex flex-wrap gap-2">
          {PAIRES.filter(([pa, pb]) => !(pa === a && pb === b)).slice(0, 12).map(([pa, pb]) => (
            <a key={`${pa}-${pb}`} href={`/calcul-pgcd-ppcm/${pa}-et-${pb}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50/50 transition-all">
              {pa} et {pb}
            </a>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif</h2>
      <CalculateurPgcdPpcm />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">PGCD et PPCM de {a} et {b}</h2>
        <p className="text-slate-600 leading-relaxed">
          Le <strong>PGCD de {a} et {b} est {g}</strong> — c&apos;est le plus grand nombre qui divise {a} et {b} sans reste.
          Le <strong>PPCM est {fmtInt(p)}</strong> — c&apos;est le plus petit nombre divisible par {a} et par {b}.
          {g === 1 && ` ${a} et ${b} sont premiers entre eux (aucun diviseur commun autre que 1).`}
          {g > 1 && ` La fraction ${a}/${b} se simplifie en ${a / g}/${b / g}.`}
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-pgcd-ppcm" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
