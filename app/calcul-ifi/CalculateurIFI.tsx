"use client";

import { useState, useMemo } from "react";
import { calculerIFI, fmtEur } from "./ifiCalc";

export default function CalculateurIFI() {
  const [patrimoineBrut, setPatrimoineBrut] = useState(1800000);
  const [dettes, setDettes] = useState(200000);
  const [residencePrincipale, setResidencePrincipale] = useState(500000);

  const res = useMemo(
    () => calculerIFI({ patrimoineImmoBrut: patrimoineBrut, dettesImmobilieres: dettes, residencePrincipale, autresAbattements: 0 }),
    [patrimoineBrut, dettes, residencePrincipale]
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-3 mb-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Patrimoine immo brut</label>
          <div className="relative">
            <input type="number" value={patrimoineBrut} onChange={(e) => setPatrimoineBrut(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-rose-400" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">EUR</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Tous biens immo (valeur venale)</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Dettes (emprunts)</label>
          <div className="relative">
            <input type="number" value={dettes} onChange={(e) => setDettes(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-rose-400" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">EUR</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Capital restant du</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Dont residence principale</label>
          <div className="relative">
            <input type="number" value={residencePrincipale} onChange={(e) => setResidencePrincipale(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-rose-400" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">EUR</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Abattement 30% automatique</p>
        </div>
      </div>

      {/* Resultat principal */}
      {res.estRedevable ? (
        <div className="bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-2xl p-6 shadow-lg shadow-rose-200/50 mb-5">
          <p className="text-rose-100 text-sm mb-1">IFI 2026 a payer</p>
          <p className="text-4xl font-extrabold">{fmtEur(res.ifiNet)}</p>
          <p className="text-rose-100 mt-1 text-sm">
            Patrimoine net imposable : {fmtEur(res.patrimoineNet)}
          </p>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg shadow-emerald-200/50 mb-5">
          <p className="text-emerald-100 text-sm mb-1">Non redevable de l&apos;IFI</p>
          <p className="text-4xl font-extrabold">0 EUR</p>
          <p className="text-emerald-100 mt-1 text-sm">
            Patrimoine net {fmtEur(res.patrimoineNet)} &lt; seuil 1 300 000 EUR
          </p>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-3 mb-4">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Abattement RP (30%)</p>
          <p className="text-lg font-bold text-emerald-600">-{fmtEur(res.abattementRP)}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Patrimoine net</p>
          <p className="text-lg font-bold text-slate-800">{fmtEur(res.patrimoineNet)}</p>
        </div>
        {res.decote > 0 && (
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500">Decote (1,3-1,4M)</p>
            <p className="text-lg font-bold text-emerald-600">-{fmtEur(res.decote)}</p>
          </div>
        )}
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
                  <td className="py-1.5 text-right font-medium text-rose-600">{fmtEur(d.impot)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-slate-400 text-center">
        Estimation basee sur le bareme IFI 2026 (article 977 CGI). Declaration obligatoire si patrimoine net &gt; 1 300 000 EUR au 1er janvier.
      </p>
    </div>
  );
}
