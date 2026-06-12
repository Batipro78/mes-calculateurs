"use client";

import { useState, useMemo } from "react";
import { calculerDenormandie, fmtEur, fmtPct } from "./denormandieCalc";
import type { Localisation, DureeEngagement } from "./denormandieCalc";

export default function CalculateurDenormandie() {
  const [localisation, setLocalisation] = useState<Localisation>("metropole");
  const [prixAcquisition, setPrixAcquisition] = useState(150000);
  const [montantTravaux, setMontantTravaux] = useState(50000);
  const [duree, setDuree] = useState<DureeEngagement>(9);

  const res = useMemo(
    () => calculerDenormandie({ localisation, prixAcquisition, montantTravaux, duree }),
    [localisation, prixAcquisition, montantTravaux, duree]
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-4">Votre investissement Denormandie</h3>

      <div className="grid gap-4 sm:grid-cols-2 mb-5">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Localisation</label>
          <select
            value={localisation}
            onChange={(e) => setLocalisation(e.target.value as Localisation)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-400 bg-white"
          >
            <option value="metropole">Metropole</option>
            <option value="outre-mer">Outre-mer (DOM-COM)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Duree d&apos;engagement locatif</label>
          <select
            value={duree}
            onChange={(e) => setDuree(parseInt(e.target.value) as DureeEngagement)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-400 bg-white"
          >
            <option value="6">6 ans</option>
            <option value="9">9 ans (recommande)</option>
            <option value="12">12 ans (maximum)</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-5">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Prix d&apos;acquisition du bien</label>
          <div className="relative">
            <input
              type="number"
              value={prixAcquisition}
              onChange={(e) => setPrixAcquisition(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">EUR</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Montant des travaux</label>
          <div className="relative">
            <input
              type="number"
              value={montantTravaux}
              onChange={(e) => setMontantTravaux(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">EUR</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Min. 25 % du cout total pour etre eligible</p>
        </div>
      </div>

      {!res.eligible && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-5">
          <p className="font-semibold text-amber-800 mb-1">Attention : conditions de travaux non atteintes</p>
          <p className="text-sm text-amber-700">
            Les travaux representent {fmtPct(res.partTravaux)} du cout total, soit moins de 25 % requis.
            Pour etre eligible, les travaux doivent atteindre au moins{" "}
            <strong>{fmtEur(res.travauxMinimum)}</strong> (prix / 3 = 25 % du total).
            La simulation ci-dessous reste affichee a titre indicatif.
          </p>
        </div>
      )}

      {res.eligible && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-5">
          <p className="font-semibold text-emerald-800 mb-1">Operation eligible au dispositif Denormandie</p>
          <p className="text-sm text-emerald-700">
            Les travaux representent {fmtPct(res.partTravaux)} du cout total. Condition des 25 % remplie.
          </p>
        </div>
      )}

      <div className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-2xl p-6 shadow-lg shadow-indigo-200/50 mb-5">
        <p className="text-indigo-100 text-sm mb-1">Reduction d&apos;impot totale sur {duree} ans</p>
        <p className="text-4xl font-extrabold">{fmtEur(res.reductionTotale)}</p>
        <p className="text-indigo-100 mt-2 text-sm">
          Taux applique : <strong>{(res.taux * 100).toFixed(0)} %</strong> · Base : <strong>{fmtEur(res.baseRetenue)}</strong>
          {res.basePlafonnee && " (plafonnee a 300 000 EUR)"}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 mb-4">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Cout total de l&apos;operation</p>
          <p className="text-xl font-bold text-slate-800">{fmtEur(res.coutTotal)}</p>
          <p className="text-xs text-slate-400">Acquisition + travaux</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Part des travaux</p>
          <p className="text-xl font-bold text-slate-800">{fmtPct(res.partTravaux)}</p>
          <p className="text-xs text-slate-400">Seuil minimum : 25,0 %</p>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
        <p className="font-semibold text-indigo-900 mb-3">Detail de la reduction d&apos;impot</p>
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-indigo-100">
              <td className="py-2 text-slate-700">Base de calcul retenue</td>
              <td className="py-2 text-right font-bold text-slate-800">{fmtEur(res.baseRetenue)}</td>
            </tr>
            <tr className="border-b border-indigo-100">
              <td className="py-2 text-slate-700">Taux de reduction ({localisation === "outre-mer" ? "Outre-mer" : "Metropole"}, {duree} ans)</td>
              <td className="py-2 text-right font-bold text-indigo-700">{(res.taux * 100).toFixed(0)} %</td>
            </tr>
            <tr className="border-b border-indigo-100">
              <td className="py-2 text-slate-700">Reduction totale</td>
              <td className="py-2 text-right font-bold text-indigo-700">{fmtEur(res.reductionTotale)}</td>
            </tr>
            {!res.detail12ans ? (
              <tr>
                <td className="py-2 text-slate-700 font-semibold">Reduction annuelle</td>
                <td className="py-2 text-right font-bold text-indigo-600 text-lg">{fmtEur(res.reductionAnnuelleBase)} / an</td>
              </tr>
            ) : (
              <>
                <tr className="border-b border-indigo-100">
                  <td className="py-2 text-slate-700 font-semibold">Reduction annuelle (annees 1 a 9)</td>
                  <td className="py-2 text-right font-bold text-indigo-600">{fmtEur(res.reductionAnnuelleBonifiee)} / an</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-700 font-semibold">Reduction annuelle (annees 10 a 12)</td>
                  <td className="py-2 text-right font-bold text-indigo-600">{fmtEur(res.reductionAnnuelleFinale)} / an</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-400 mt-4 text-center">
        Simulation indicative. La reduction est imputable dans la limite du plafond global des niches fiscales de 10 000 EUR/an.
        Verifiez l&apos;eligibilite de votre commune (programme Action coeur de ville ou ORT) et consultez un conseiller fiscal.
      </p>
    </div>
  );
}
