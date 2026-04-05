"use client";
import { useState, useMemo } from "react";

function fmt(n: number): string { return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function fmtInt(n: number): string { return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }); }

export default function CalculateurInteretCompose() {
  const [capital, setCapital] = useState<string>("10000");
  const [versementMensuel, setVersementMensuel] = useState<string>("200");
  const [taux, setTaux] = useState<string>("5");
  const [duree, setDuree] = useState<string>("10");

  const resultat = useMemo(() => {
    const c = parseFloat(capital.replace(",", "."));
    const vm = parseFloat(versementMensuel.replace(",", ".")) || 0;
    const t = parseFloat(taux.replace(",", "."));
    const d = parseInt(duree);
    if (isNaN(c) || isNaN(t) || isNaN(d) || c < 0 || t < 0 || d <= 0) return null;

    const tauxMensuel = t / 100 / 12;
    const mois = d * 12;

    // Evolution annee par annee
    const annees: { annee: number; capital: number; interets: number; versements: number; total: number }[] = [];
    let solde = c;
    let totalInterets = 0;
    let totalVersements = c;

    for (let a = 1; a <= d; a++) {
      let interetsAnnee = 0;
      for (let m = 0; m < 12; m++) {
        const interet = solde * tauxMensuel;
        interetsAnnee += interet;
        solde += interet + vm;
      }
      totalInterets += interetsAnnee;
      totalVersements += vm * 12;
      annees.push({
        annee: a,
        capital: totalVersements,
        interets: totalInterets,
        versements: totalVersements,
        total: solde,
      });
    }

    return {
      capitalFinal: solde,
      totalInterets,
      totalVersements,
      gainPourcent: totalVersements > 0 ? ((solde - totalVersements) / totalVersements) * 100 : 0,
      annees,
    };
  }, [capital, versementMensuel, taux, duree]);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Capital initial (&euro;)</label>
            <input type="text" inputMode="decimal" value={capital} onChange={(e) => setCapital(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Versement mensuel (&euro;)</label>
            <input type="text" inputMode="decimal" value={versementMensuel} onChange={(e) => setVersementMensuel(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Taux annuel (%)</label>
            <input type="text" inputMode="decimal" value={taux} onChange={(e) => setTaux(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all" />
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                { v: "3", l: "Livret A (3%)" },
                { v: "5", l: "Fonds euros (5%)" },
                { v: "8", l: "Actions (8%)" },
                { v: "10", l: "ETF World (10%)" },
              ].map((t) => (
                <button key={t.v} onClick={() => setTaux(t.v)}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-cyan-300 hover:text-cyan-600 transition-all">
                  {t.l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Duree (annees)</label>
            <input type="text" inputMode="numeric" value={duree} onChange={(e) => setDuree(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all" />
            <div className="flex flex-wrap gap-2 mt-2">
              {[5, 10, 15, 20, 25, 30].map((d) => (
                <button key={d} onClick={() => setDuree(String(d))}
                  className="px-3 py-1 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-cyan-300 hover:text-cyan-600 transition-all">
                  {d} ans
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {resultat ? (
          <>
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg shadow-cyan-200/50">
              <p className="text-cyan-200 text-sm mb-1">Capital final</p>
              <p className="text-4xl font-extrabold tracking-tight">{fmtInt(resultat.capitalFinal)} <span className="text-xl font-semibold">&euro;</span></p>
              <div className="h-px bg-white/20 my-3" />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-cyan-200">Total verse</p>
                  <p className="font-semibold text-lg">{fmtInt(resultat.totalVersements)} &euro;</p>
                </div>
                <div>
                  <p className="text-cyan-200">Interets gagnes</p>
                  <p className="font-semibold text-lg">{fmtInt(resultat.totalInterets)} &euro;</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-1">Gain total</p>
              <p className="text-2xl font-extrabold text-cyan-600">+{fmt(resultat.gainPourcent)}%</p>
            </div>

            {/* Barre visuelle */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-2">Repartition</p>
              <div className="w-full h-6 rounded-full overflow-hidden flex">
                <div className="bg-cyan-500 h-6" style={{ width: `${(resultat.totalVersements / resultat.capitalFinal) * 100}%` }} />
                <div className="bg-cyan-300 h-6" style={{ width: `${(resultat.totalInterets / resultat.capitalFinal) * 100}%` }} />
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-cyan-600">Versements ({((resultat.totalVersements / resultat.capitalFinal) * 100).toFixed(0)}%)</span>
                <span className="text-cyan-400">Interets ({((resultat.totalInterets / resultat.capitalFinal) * 100).toFixed(0)}%)</span>
              </div>
            </div>

            {/* Tableau evolution */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-2">Evolution</p>
              <div className="max-h-48 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-slate-200">
                    <th className="text-left py-2 px-1 text-slate-400">An</th>
                    <th className="text-right py-2 px-1 text-slate-400">Verse</th>
                    <th className="text-right py-2 px-1 text-slate-400">Interets</th>
                    <th className="text-right py-2 px-1 text-slate-400">Total</th>
                  </tr></thead>
                  <tbody>
                    {resultat.annees.map((a) => (
                      <tr key={a.annee} className="border-b border-slate-50">
                        <td className="py-1.5 px-1 text-slate-600">{a.annee}</td>
                        <td className="py-1.5 px-1 text-right text-slate-500">{fmtInt(a.versements)}</td>
                        <td className="py-1.5 px-1 text-right text-cyan-600">{fmtInt(a.interets)}</td>
                        <td className="py-1.5 px-1 text-right font-bold text-slate-800">{fmtInt(a.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-6 text-center"><p className="text-slate-400 text-sm">Remplissez les champs</p></div>
        )}
        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-xs font-medium text-slate-400 mb-2">Formule</p>
          <p className="text-sm text-slate-600">C(n) = C(0) &times; (1 + r)<sup>n</sup> + V &times; ((1 + r)<sup>n</sup> &minus; 1) / r</p>
        </div>
      </div>
    </div>
  );
}
