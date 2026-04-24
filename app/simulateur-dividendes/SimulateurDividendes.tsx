"use client";

import { useState, useMemo } from "react";
import { calculerDividendes, fmtEur } from "./dividendesCalc";

export default function SimulateurDividendes() {
  const [dividendes, setDividendes] = useState(30000);
  const [tmi, setTmi] = useState(30);
  const [gerantMajoritaire, setGerantMajoritaire] = useState(false);

  const res = useMemo(
    () => calculerDividendes({ dividendesBruts: dividendes, tmi, optionFiscale: "pfu", gerantMajoritaire }),
    [dividendes, tmi, gerantMajoritaire]
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-3 mb-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Dividendes bruts</label>
          <div className="relative">
            <input type="number" value={dividendes} onChange={(e) => setDividendes(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-violet-400" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">EUR/an</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Votre TMI</label>
          <select value={tmi} onChange={(e) => setTmi(parseInt(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-violet-400 bg-white">
            <option value="0">0% (non imposable)</option>
            <option value="11">11%</option>
            <option value="30">30%</option>
            <option value="41">41%</option>
            <option value="45">45%</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Gerant majoritaire ?</label>
          <select value={gerantMajoritaire ? "oui" : "non"} onChange={(e) => setGerantMajoritaire(e.target.value === "oui")}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-violet-400 bg-white">
            <option value="non">Non (associe minoritaire)</option>
            <option value="oui">Oui (EURL/SARL - cotisations TNS)</option>
          </select>
        </div>
      </div>

      {/* Meilleur choix */}
      <div className={`bg-gradient-to-br ${res.meilleurChoix === "pfu" ? "from-violet-500 to-purple-600" : "from-emerald-500 to-teal-600"} text-white rounded-2xl p-6 shadow-lg mb-5`}>
        <p className="text-white/80 text-sm mb-1">Meilleur choix fiscal</p>
        <p className="text-3xl font-extrabold uppercase">{res.meilleurChoix === "pfu" ? "PFU (Flat tax 30%)" : "Bareme progressif"}</p>
        <p className="text-white/90 mt-2">
          Net percu : <strong>{fmtEur(res.meilleurChoix === "pfu" ? res.pfu_net : res.bareme_net)}</strong>
          {" — "}
          Economie vs autre option : <strong>{fmtEur(res.economieMeilleurChoix)}</strong>
        </p>
      </div>

      {/* Comparaison PFU vs Bareme */}
      <div className="grid gap-4 sm:grid-cols-2 mb-5">
        <div className={`rounded-2xl p-5 ${res.meilleurChoix === "pfu" ? "bg-violet-50 border-2 border-violet-400" : "bg-slate-50 border border-slate-200"}`}>
          <p className="text-violet-900 font-semibold mb-2">PFU (Flat tax 30%)</p>
          <p className="text-3xl font-extrabold text-slate-800">{fmtEur(res.pfu_net)}</p>
          <p className="text-sm text-slate-500 mb-3">net apres impots</p>
          <table className="w-full text-xs">
            <tbody>
              <tr className="border-b border-violet-200">
                <td className="py-1 text-slate-600">IR (12,8%)</td>
                <td className="py-1 text-right text-red-600">-{fmtEur(res.pfu_ir)}</td>
              </tr>
              <tr className="border-b border-violet-200">
                <td className="py-1 text-slate-600">PS (17,2%)</td>
                <td className="py-1 text-right text-red-600">-{fmtEur(res.pfu_ps)}</td>
              </tr>
              <tr>
                <td className="py-1 text-slate-700 font-semibold">Total impot</td>
                <td className="py-1 text-right font-bold text-red-700">-{fmtEur(res.pfu_total)}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-slate-500 mt-2">Taux effectif : {res.pfu_tauxEffectif.toFixed(1)}%</p>
        </div>
        <div className={`rounded-2xl p-5 ${res.meilleurChoix === "bareme" ? "bg-emerald-50 border-2 border-emerald-400" : "bg-slate-50 border border-slate-200"}`}>
          <p className="text-emerald-900 font-semibold mb-2">Bareme progressif</p>
          <p className="text-3xl font-extrabold text-slate-800">{fmtEur(res.bareme_net)}</p>
          <p className="text-sm text-slate-500 mb-3">net apres impots</p>
          <table className="w-full text-xs">
            <tbody>
              <tr className="border-b border-emerald-200">
                <td className="py-1 text-slate-600">Abattement 40%</td>
                <td className="py-1 text-right text-emerald-600">-{fmtEur(res.bareme_abattement)}</td>
              </tr>
              <tr className="border-b border-emerald-200">
                <td className="py-1 text-slate-600">IR sur {fmtEur(res.bareme_baseImposable)} a TMI {tmi}%</td>
                <td className="py-1 text-right text-red-600">-{fmtEur(res.bareme_ir)}</td>
              </tr>
              <tr className="border-b border-emerald-200">
                <td className="py-1 text-slate-600">PS (17,2% sur brut)</td>
                <td className="py-1 text-right text-red-600">-{fmtEur(res.bareme_ps)}</td>
              </tr>
              <tr>
                <td className="py-1 text-slate-700 font-semibold">Total impot</td>
                <td className="py-1 text-right font-bold text-red-700">-{fmtEur(res.bareme_total)}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-slate-500 mt-2">Taux effectif : {res.bareme_tauxEffectif.toFixed(1)}%</p>
        </div>
      </div>

      {/* Cotisations TNS */}
      {gerantMajoritaire && res.cotisationsTNS > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
          <p className="font-semibold text-amber-900 mb-2">⚠ Cotisations sociales TNS (gerant majoritaire)</p>
          <p className="text-sm text-amber-900">
            Pour un gerant majoritaire de SARL/EURL, la fraction de dividendes depassant 10% du capital + primes d&apos;emission + apports en compte courant est soumise a cotisations sociales (~20-30%).
            <br />
            Estimation pour vos {fmtEur(dividendes)} : <strong>{fmtEur(res.cotisationsTNS)}</strong> de cotisations.
            <br />
            Net apres cotisations ET impots : <strong>{fmtEur((res.meilleurChoix === "pfu" ? res.pfu_net : res.bareme_net) - res.cotisationsTNS)}</strong>
          </p>
        </div>
      )}

      <p className="text-xs text-slate-400 text-center">
        Art. 117 quater, 158-3, 200 A CGI. Le PFU est applique par defaut. L&apos;option pour le bareme progressif est GLOBALE
        (s&apos;applique a tous les revenus de capitaux mobiliers de l&apos;annee).
      </p>
    </div>
  );
}
