import type { Metadata } from "next";
import SimulateurCreditConso from "../SimulateurCreditConso";
import { calcCreditConso, TAUX_MOYENS, DUREES, PROJET_LABELS, PROJET_EMOJIS, type TypeProjet } from "../calcCreditConso";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const MONTANTS = [3000, 5000, 10000, 15000, 20000, 30000, 50000];
const DUREES_SEO = [24, 36, 48, 60, 72];

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const m of MONTANTS) {
    for (const d of DUREES_SEO) {
      params.push({ params: `${m}-euros-${d}-mois` });
    }
  }
  return params;
}

type Props = { params: Promise<{ params: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { params: slug } = await params;
  const match = slug.match(/^(\d+)-euros-(\d+)-mois$/);
  if (!match) return {};

  const montant = parseInt(match[1]);
  const duree = parseInt(match[2]);
  const taux = TAUX_MOYENS[duree] || 4.5;
  const sim = calcCreditConso(montant, duree, taux, 2500, 0.36);

  return {
    title: `Credit conso ${fmtInt(montant)} € sur ${duree} mois — Mensualite ${fmt(sim.mensualite)} €`,
    description: `Simulez un credit consommation de ${fmtInt(montant)} € sur ${duree} mois a ${taux}%. Mensualite : ${fmt(sim.mensualite)} €. Cout total : ${fmt(sim.coutTotal)} €. Taux 2026 actualises.`,
  };
}

export default async function Page({ params }: Props) {
  const { params: slug } = await params;
  const match = slug.match(/^(\d+)-euros-(\d+)-mois$/);
  if (!match) notFound();

  const montant = parseInt(match[1]);
  const duree = parseInt(match[2]);

  if (!MONTANTS.includes(montant) || !DUREES_SEO.includes(duree)) notFound();

  const taux = TAUX_MOYENS[duree] || 4.5;
  const sim = calcCreditConso(montant, duree, taux, 2500, 0.36);

  // Comparaison par duree
  const compDurees = DUREES.map((d) => {
    const s = calcCreditConso(montant, d, TAUX_MOYENS[d] || 4.5, 2500, 0.36);
    return { duree: d, ...s };
  });

  // Comparaison par montant
  const compMontants = MONTANTS.map((m) => {
    const s = calcCreditConso(m, duree, taux, 2500, 0.36);
    return { montant: m, ...s };
  });

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `Quelle mensualite pour un credit de ${fmtInt(montant)} € sur ${duree} mois ?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Pour un credit consommation de ${fmtInt(montant)} € sur ${duree} mois au taux moyen de ${taux}% (Q1 2026), la mensualite est de ${fmt(sim.mensualite)} € (assurance incluse a 0,36%). Le cout total du credit est de ${fmt(sim.coutTotal)} €.`,
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage={`Credit ${fmtInt(montant)} € sur ${duree} mois`} />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💳
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">
          Credit conso {fmtInt(montant)} € sur {duree} mois
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulation d&apos;un pret personnel de {fmtInt(montant)} € rembourse sur{" "}
        {duree} mois au taux moyen de {taux}% TAEG (Q1 2026).
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-6 mb-8">
        <div className="text-center mb-6">
          <div className="text-sm font-medium text-blue-700 mb-1">
            Mensualite pour {fmtInt(montant)} € sur {duree} mois
          </div>
          <div className="text-5xl font-black text-blue-700">
            {fmt(sim.mensualite)} €
          </div>
          <div className="text-sm text-blue-600 mt-1">
            au taux de {taux}% TAEG (assurance 0,36% incluse)
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500">Capital</div>
            <div className="text-xl font-bold text-slate-800">{fmtInt(montant)} €</div>
          </div>
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500">Interets</div>
            <div className="text-xl font-bold text-red-600">{fmt(sim.coutInterets)} €</div>
          </div>
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500">Assurance</div>
            <div className="text-xl font-bold text-orange-600">{fmt(sim.coutAssurance)} €</div>
          </div>
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500">Total rembourse</div>
            <div className="text-xl font-bold text-slate-800">{fmt(sim.montantTotalRembourse)} €</div>
          </div>
        </div>
      </div>

      <SimulateurCreditConso />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Comparaison par duree */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {fmtInt(montant)} € : comparaison par duree
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-3 font-semibold text-slate-700">Duree</th>
                <th className="text-center p-3 font-semibold text-slate-700">Taux</th>
                <th className="text-center p-3 font-semibold text-slate-700">Mensualite</th>
                <th className="text-center p-3 font-semibold text-slate-700">Cout total</th>
              </tr>
            </thead>
            <tbody>
              {compDurees.map((row) => (
                <tr
                  key={row.duree}
                  className={`border-b border-slate-100 ${row.duree === duree ? "bg-blue-50 font-bold" : ""}`}
                >
                  <td className="p-3 text-slate-700">
                    {row.duree} mois ({Math.floor(row.duree / 12)} an{Math.floor(row.duree / 12) > 1 ? "s" : ""})
                  </td>
                  <td className="p-3 text-center">{TAUX_MOYENS[row.duree]}%</td>
                  <td className="p-3 text-center">{fmt(row.mensualite)} €</td>
                  <td className="p-3 text-center text-red-600">{fmt(row.coutTotal)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par montant */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Sur {duree} mois : comparaison par montant
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-3 font-semibold text-slate-700">Montant</th>
                <th className="text-center p-3 font-semibold text-slate-700">Mensualite</th>
                <th className="text-center p-3 font-semibold text-slate-700">Cout total</th>
                <th className="text-center p-3 font-semibold text-slate-700">Total rembourse</th>
              </tr>
            </thead>
            <tbody>
              {compMontants.map((row) => (
                <tr
                  key={row.montant}
                  className={`border-b border-slate-100 ${row.montant === montant ? "bg-blue-50 font-bold" : ""}`}
                >
                  <td className="p-3 text-slate-700">{fmtInt(row.montant)} €</td>
                  <td className="p-3 text-center">{fmt(row.mensualite)} €</td>
                  <td className="p-3 text-center text-red-600">{fmt(row.coutTotal)} €</td>
                  <td className="p-3 text-center">{fmt(row.montantTotalRembourse)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdSlot adSlot="0987654321" adFormat="rectangle" className="my-8" />

      <RelatedCalculators currentSlug="/simulateur-credit-conso" />
    </div>
  );
}
