"use client";

import { useState, useMemo } from "react";
import { calculerIS, fmtEur } from "./isCalc";

export default function SimulateurIS() {
  const [benefice, setBenefice] = useState(100000);
  const [eligiblePME, setEligiblePME] = useState(true);

  const res = useMemo(
    () => calculerIS({ beneficeImposable: benefice, eligibleTauxReduit: eligiblePME }),
    [benefice, eligiblePME]
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2 mb-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Benefice imposable</label>
          <div className="relative">
            <input type="number" value={benefice} onChange={(e) => setBenefice(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-blue-400" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">EUR</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Eligible au taux reduit PME ?</label>
          <select value={eligiblePME ? "oui" : "non"} onChange={(e) => setEligiblePME(e.target.value === "oui")}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-blue-400 bg-white">
            <option value="oui">Oui (CA &lt; 10M EUR, 75% pers. physiques)</option>
            <option value="non">Non (grande entreprise)</option>
          </select>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg shadow-blue-200/50 mb-5">
        <p className="text-blue-100 text-sm mb-1">IS a payer</p>
        <p className="text-4xl font-extrabold">{fmtEur(res.impotTotal)}</p>
        <p className="text-blue-100 mt-1 text-sm">
          Taux effectif : {res.tauxEffectif.toFixed(2)}%
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 mb-4">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Benefice avant IS</p>
          <p className="text-xl font-bold text-slate-800">{fmtEur(benefice)}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Benefice net apres IS</p>
          <p className="text-xl font-bold text-emerald-600">{fmtEur(res.beneficeNet)}</p>
        </div>
      </div>

      {res.detail.length > 0 && (
        <div className="bg-slate-50 rounded-xl p-4 mb-4">
          <p className="text-sm font-medium text-slate-700 mb-3">Detail par tranche</p>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 text-slate-500 font-medium">Tranche</th>
                <th className="text-right py-2 text-slate-500 font-medium">Taux</th>
                <th className="text-right py-2 text-slate-500 font-medium">Impot</th>
              </tr>
            </thead>
            <tbody>
              {res.detail.map((d, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-0">
                  <td className="py-1.5 text-slate-700">{d.tranche}</td>
                  <td className="py-1.5 text-right text-slate-600">{d.taux}%</td>
                  <td className="py-1.5 text-right font-medium text-blue-600">{fmtEur(d.impot)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-slate-400 text-center">
        Article 219 CGI. Taux reduit PME : CA &lt; 10M EUR, capital entierement libere, 75% detenu par personnes physiques (ou PME eligibles).
      </p>
    </div>
  );
}
