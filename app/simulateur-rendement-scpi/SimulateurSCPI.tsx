"use client";

import { useState, useMemo } from "react";
import { calculerSCPI, fmtEur } from "./scpiCalc";

export default function SimulateurSCPI() {
  const [montantInvesti, setMontantInvesti] = useState(50000);
  const [tdvm, setTdvm] = useState(4.8);
  const [fraisEntree, setFraisEntree] = useState(10);
  const [tmi, setTmi] = useState(30);
  const [dureeAnnees, setDureeAnnees] = useState(15);
  const [revalorisation, setRevalorisation] = useState(1);

  const res = useMemo(
    () => calculerSCPI({ montantInvesti, tdvm, fraisEntree, fraisGestion: 0, tmi, dureeAnnees, revalorisationAnnuelle: revalorisation }),
    [montantInvesti, tdvm, fraisEntree, tmi, dureeAnnees, revalorisation]
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2 mb-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Montant investi</label>
          <div className="relative">
            <input type="number" value={montantInvesti} onChange={(e) => setMontantInvesti(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-teal-400" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">EUR</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Duree de detention (annees)</label>
          <input type="number" value={dureeAnnees} onChange={(e) => setDureeAnnees(parseInt(e.target.value) || 1)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-teal-400" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-5">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">TDVM (%/an)</label>
          <input type="number" step="0.1" value={tdvm} onChange={(e) => setTdvm(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-teal-400" />
          <p className="text-xs text-slate-400 mt-1">Moyenne 2026 : 4,8%</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Frais d&apos;entree (%)</label>
          <input type="number" step="0.5" value={fraisEntree} onChange={(e) => setFraisEntree(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-teal-400" />
          <p className="text-xs text-slate-400 mt-1">Typique : 8-12%</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Revalorisation (%/an)</label>
          <input type="number" step="0.5" value={revalorisation} onChange={(e) => setRevalorisation(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-teal-400" />
          <p className="text-xs text-slate-400 mt-1">Typique : 0-2%</p>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Votre TMI (tranche marginale imposition)</label>
        <select value={tmi} onChange={(e) => setTmi(parseInt(e.target.value))}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-teal-400 bg-white">
          <option value="0">0% (non imposable)</option>
          <option value="11">11% (11 498 - 29 315 EUR)</option>
          <option value="30">30% (29 316 - 83 823 EUR)</option>
          <option value="41">41% (83 824 - 180 294 EUR)</option>
          <option value="45">45% (&gt; 180 294 EUR)</option>
        </select>
        <p className="text-xs text-slate-400 mt-1">Les revenus SCPI s&apos;ajoutent a la TMI + 17,2% de prelevements sociaux</p>
      </div>

      {/* Resultats */}
      <div className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl p-6 shadow-lg shadow-teal-200/50 mb-5">
        <p className="text-teal-100 text-sm mb-1">Revenu net mensuel (apres impots)</p>
        <p className="text-4xl font-extrabold">{fmtEur(res.revenuMensuelNet)}</p>
        <p className="text-teal-100 mt-1 text-sm">
          Rendement net : {res.rendementNetAnnuel.toFixed(2)}%/an
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 mb-4">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Revenu brut annuel</p>
          <p className="text-xl font-bold text-slate-800">{fmtEur(res.revenuBrutAnnuel)}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Impots annuels</p>
          <p className="text-xl font-bold text-red-600">-{fmtEur(res.revenuBrutAnnuel - res.revenuAnnuelNetImpots)}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Revenu net total sur {dureeAnnees} ans</p>
          <p className="text-xl font-bold text-teal-600">{fmtEur(res.revenuTotalNetSurDuree)}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Plus-value parts (revalorisation)</p>
          <p className="text-xl font-bold text-emerald-600">+{fmtEur(res.plusValuePotentielle)}</p>
        </div>
      </div>

      <p className="text-xs text-slate-400 text-center">
        Estimation indicative. Le TDVM n&apos;est pas garanti. Les SCPI comportent un risque de perte en capital.
      </p>
    </div>
  );
}
