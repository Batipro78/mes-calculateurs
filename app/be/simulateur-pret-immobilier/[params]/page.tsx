import { fmtIntBE as fmt, fmtEUR_BE as fmt2 } from "@/app/lib/fmt";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SimulateurPretBE from "../SimulateurPretBE";
import Breadcrumb from "../../../components/Breadcrumb";
import { calculerPretBE, TAUX_MOYENS_BE } from "../pretImmoBeCalc";

const MONTANTS = [100000, 150000, 200000, 250000, 300000, 350000, 400000, 500000, 600000];
const DUREES = [15, 20, 25, 30];

type Parsed = { montant: number; duree: number };

function parseSlug(slug: string): Parsed | null {
  const m = slug.match(/^(\d+)-euros-(\d+)-ans$/);
  if (!m) return null;
  const montant = parseInt(m[1], 10);
  const duree = parseInt(m[2], 10);
  if (!MONTANTS.includes(montant) || !DUREES.includes(duree)) return null;
  return { montant, duree };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const m of MONTANTS) {
    for (const d of DUREES) {
      params.push({ params: `${m}-euros-${d}-ans` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const taux = TAUX_MOYENS_BE[parsed.duree];
  const res = calculerPretBE(parsed.montant, parsed.duree, taux);
  return {
    alternates: { canonical: `/be/simulateur-pret-immobilier/${slug}` },
    title: `Pret hypothecaire ${fmt(parsed.montant)} EUR sur ${parsed.duree} ans Belgique`,
    description: `Pret hypothecaire belge de ${fmt(parsed.montant)} EUR sur ${parsed.duree} ans : mensualite ${fmt2(res.mensualite)} EUR au taux ${taux} %. Cout total ${fmt(res.coutTotal)} EUR. Simulateur 2026.`,
    keywords: `pret ${parsed.montant} belgique ${parsed.duree} ans, mensualite credit immobilier belge, simulateur hypothecaire`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const taux = TAUX_MOYENS_BE[parsed.duree];
  const res = calculerPretBE(parsed.montant, parsed.duree, taux);

  const comparaisonDurees = DUREES.map((d) => ({
    duree: d,
    res: calculerPretBE(parsed.montant, d, TAUX_MOYENS_BE[d]),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quelle mensualite pour un pret de ${fmt(parsed.montant)} EUR sur ${parsed.duree} ans en Belgique ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un pret hypothecaire belge de ${fmt(parsed.montant)} EUR sur ${parsed.duree} ans au taux moyen de ${taux} % (mai 2026), la mensualite est d'environ ${fmt2(res.mensualite)} EUR. Le cout total du credit s'eleve a ${fmt(res.coutTotal)} EUR, dont ${fmt(res.interetsTotal)} EUR d'interets.`,
        },
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb
        currentPage={`${fmt(parsed.montant)} EUR sur ${parsed.duree} ans`}
        parentPage="Simulateur Pret Hypothecaire"
        parentHref="/be/simulateur-pret-immobilier"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Pret {fmt(parsed.montant)} EUR sur {parsed.duree} ans Belgique
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Mensualite, cout total et interets au taux moyen {taux} % (marche BE 2026).
      </p>

      <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg shadow-violet-200/50 mb-8">
        <p className="text-violet-100 mb-1">Mensualite</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt2(res.mensualite)} <span className="text-2xl font-semibold">EUR</span>
        </p>
        <p className="text-violet-100 mt-2 text-sm">
          Pret {fmt(parsed.montant)} EUR / {parsed.duree} ans / {taux} %
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Cout total du credit</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Capital emprunte</span>
            <span className="font-semibold text-slate-700">{fmt(res.montant)} EUR</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Interets totaux</span>
            <span className="font-semibold text-rose-600">+{fmt(res.interetsTotal)} EUR</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-100">
            <span className="font-medium text-slate-600">Cout total</span>
            <span className="font-bold text-slate-800">{fmt(res.coutTotal)} EUR</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Comparaison par duree</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Duree</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Mensualite</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Cout total</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Lien</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonDurees.map((c) => (
                <tr key={c.duree} className={`border-b border-slate-100 ${c.duree === parsed.duree ? "bg-violet-50/40" : ""}`}>
                  <td className="py-2.5 px-2 font-medium text-slate-700">{c.duree} ans</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{TAUX_MOYENS_BE[c.duree]} %</td>
                  <td className="py-2.5 px-2 text-right font-bold text-violet-600">{fmt2(c.res.mensualite)} EUR</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{fmt(c.res.coutTotal)} EUR</td>
                  <td className="py-2.5 px-2 text-right">
                    <a href={`/be/simulateur-pret-immobilier/${parsed.montant}-euros-${c.duree}-ans`} className="text-violet-600 hover:underline text-xs font-medium">voir →</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif (taux personnalise)</h2>
      <SimulateurPretBE />

      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-3">Autres montants sur {parsed.duree} ans</h3>
        <div className="flex flex-wrap gap-2">
          {MONTANTS.filter((m) => m !== parsed.montant).map((m) => (
            <a key={m} href={`/be/simulateur-pret-immobilier/${m}-euros-${parsed.duree}-ans`} className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/50 transition-all">
              {fmt(m)} EUR
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
