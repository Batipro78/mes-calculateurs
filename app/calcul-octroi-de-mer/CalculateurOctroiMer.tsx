"use client";

import { useState, useMemo } from "react";
import {
  calculerOctroiMer,
  fmtEur,
  fmtPct,
  TVA_PAR_TERRITOIRE,
  LABEL_TERRITOIRE,
  type Territoire,
} from "./octroiMerCalc";

export default function CalculateurOctroiMer() {
  const [territoire, setTerritoire] = useState<Territoire>("la-reunion");
  const [valeurCAF, setValeurCAF] = useState(1000);
  const [tauxOM, setTauxOM] = useState(12.5);
  const [tauxOMR, setTauxOMR] = useState(2.5);
  const [tauxTVA, setTauxTVA] = useState(TVA_PAR_TERRITOIRE["la-reunion"]);

  // Quand le territoire change, on met a jour la TVA par defaut
  function handleTerritoire(t: Territoire) {
    setTerritoire(t);
    setTauxTVA(TVA_PAR_TERRITOIRE[t]);
  }

  const res = useMemo(
    () => calculerOctroiMer({ territoire, valeurCAF, tauxOM, tauxOMR, tauxTVA }),
    [territoire, valeurCAF, tauxOM, tauxOMR, tauxTVA]
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-3">Parametres de la marchandise</h3>

      <div className="grid gap-4 sm:grid-cols-2 mb-5">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Territoire DOM
          </label>
          <select
            value={territoire}
            onChange={(e) => handleTerritoire(e.target.value as Territoire)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-400 bg-white"
          >
            {(Object.keys(LABEL_TERRITOIRE) as Territoire[]).map((t) => (
              <option key={t} value={t}>
                {LABEL_TERRITOIRE[t]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Valeur CAF de la marchandise
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="100"
              value={valeurCAF}
              onChange={(e) => setValeurCAF(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">EUR</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Cout Assurance Fret (valeur douaniere)</p>
        </div>
      </div>

      <h3 className="font-bold text-slate-800 mb-3">Taux applicables</h3>
      <div className="grid gap-4 sm:grid-cols-3 mb-5">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Taux octroi de mer (OM)
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="60"
              step="0.5"
              value={tauxOM}
              onChange={(e) => setTauxOM(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">%</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Taux vote par la collectivite (0-60 %)</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Taux OMR (regional)
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="2.5"
              step="0.1"
              value={tauxOMR}
              onChange={(e) => setTauxOMR(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">%</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Max legal : 2,5 %</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Taux TVA
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="20"
              step="0.1"
              value={tauxTVA}
              onChange={(e) => setTauxTVA(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">%</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {tauxTVA === 0 ? "0 % (Guyane / Mayotte : TVA non applicable)" : tauxTVA === 2.1 ? "2,1 % taux reduit DOM" : "8,5 % taux normal DOM"}
          </p>
        </div>
      </div>

      {/* Carte principale */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-lg shadow-blue-200/50 mb-5">
        <p className="text-blue-100 text-sm mb-1">Total taxes a l&apos;importation</p>
        <p className="text-4xl font-extrabold">{fmtEur(res.totalTaxes)}</p>
        <p className="text-blue-100 mt-2 text-sm">
          Majoration de <strong>{fmtPct(res.majorationPct)}</strong> sur la valeur CAF
        </p>
      </div>

      {/* Tableau de decomposition */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4">
        <p className="font-semibold text-blue-900 mb-3">Decomposition des taxes</p>
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-blue-200">
              <td className="py-2 text-slate-700">Valeur CAF de la marchandise</td>
              <td className="py-2 text-right font-medium text-slate-800">{fmtEur(valeurCAF)}</td>
            </tr>
            <tr className="border-b border-blue-200">
              <td className="py-2 text-slate-700">
                Octroi de mer (OM) — {tauxOM} %
              </td>
              <td className="py-2 text-right font-bold text-red-600">{fmtEur(res.octroiDeMer)}</td>
            </tr>
            <tr className="border-b border-blue-200">
              <td className="py-2 text-slate-700">
                Octroi de mer regional (OMR) — {tauxOMR} %
              </td>
              <td className="py-2 text-right font-bold text-orange-600">{fmtEur(res.omr)}</td>
            </tr>
            <tr className="border-b border-blue-200">
              <td className="py-2 text-slate-700">
                TVA — {tauxTVA} % (sur valeur CAF uniquement)
              </td>
              <td className="py-2 text-right font-bold text-amber-600">{fmtEur(res.tva)}</td>
            </tr>
            <tr className="border-b border-blue-200">
              <td className="py-2 text-slate-700 font-semibold">Total taxes</td>
              <td className="py-2 text-right font-bold text-red-700">{fmtEur(res.totalTaxes)}</td>
            </tr>
            <tr>
              <td className="py-2 text-slate-800 font-bold text-base">Cout rendu DOM</td>
              <td className="py-2 text-right font-extrabold text-blue-700 text-xl">{fmtEur(res.coutRendu)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-400 mt-4 text-center">
        Estimation indicative. Les taux reels dependent de la nomenclature douaniere du produit
        et des deliberations de chaque collectivite. Source officielle : douane.gouv.fr.
      </p>
    </div>
  );
}
