"use client";
import { fmtEUR_BE as fmt, fmtIntBE as fmtInt, fmtPctBE as fmtPct } from "@/app/lib/fmt";

import { useState } from "react";
import {
  calculerISOC,
  REMUNERATION_MIN_DIRIGEANT,
  SEUIL_TAUX_REDUIT,
} from "./isocBeCalc";

export default function SimulateurISOCBE() {
  const [benefice, setBenefice] = useState<string>("100000");
  const [estPME, setEstPME] = useState<boolean>(true);

  const beneficeNum = parseFloat(benefice) || 0;
  const resultat = calculerISOC(beneficeNum, estPME);

  // Détail par tranche si PME et bénéfice > seuil
  const detailTranches =
    estPME && beneficeNum > SEUIL_TAUX_REDUIT
      ? [
          {
            tranche: `0 à ${fmtInt(SEUIL_TAUX_REDUIT)} EUR`,
            montant: SEUIL_TAUX_REDUIT,
            taux: 0.2,
            impot: SEUIL_TAUX_REDUIT * 0.2,
          },
          {
            tranche: `${fmtInt(SEUIL_TAUX_REDUIT)} à ${fmtInt(beneficeNum)} EUR`,
            montant: beneficeNum - SEUIL_TAUX_REDUIT,
            taux: 0.25,
            impot: (beneficeNum - SEUIL_TAUX_REDUIT) * 0.25,
          },
        ]
      : [];

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label
            htmlFor="benefice-isoc-be"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Bénéfice imposable (EUR)
          </label>
          <div className="relative">
            <input
              id="benefice-isoc-be"
              type="number"
              value={benefice}
              onChange={(e) => setBenefice(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              min="0"
              step="1000"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={estPME}
              onChange={(e) => setEstPME(e.target.checked)}
              className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 transition-colors"
            />
            <span className="ml-3 font-medium text-slate-700">
              Statut PME (taux réduit 20%)
            </span>
          </label>
          <p className="text-xs text-slate-400 ml-8 mt-2">
            Conditions : rémunération dirigeant ≥ {fmtInt(REMUNERATION_MIN_DIRIGEANT)} EUR/an,
            actionnariat personnes physiques, pas société financière, ATN ≤ 20%
            rémunération
          </p>
        </div>

        {detailTranches.length > 0 && (
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 mb-6">
            <h3 className="font-semibold text-blue-900 text-sm mb-3">
              Détail du calcul par tranche
            </h3>
            <div className="space-y-2 text-sm">
              {detailTranches.map((t, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-slate-600">
                    {t.tranche} × {fmtPct(t.taux)}%
                  </span>
                  <span className="font-semibold text-slate-800">
                    {fmt(t.impot)} EUR
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-lg shadow-blue-200/50">
          <p className="text-sm text-blue-100 mb-1">ISOC à payer</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(resultat.impotTotal)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
          <p className="text-blue-100 mt-2 text-sm">
            Taux effectif : {fmtPct(resultat.tauxEffectif)}%
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Bénéfice imposable</span>
              <span className="text-lg font-bold text-slate-800">
                {fmt(beneficeNum)} EUR
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Taux</span>
              <span className="text-lg font-bold text-slate-800">
                {estPME && beneficeNum <= SEUIL_TAUX_REDUIT
                  ? "20% PME"
                  : estPME && beneficeNum > SEUIL_TAUX_REDUIT
                    ? "20% - 25% PME"
                    : "25% normal"}
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">
                ISOC total
              </span>
              <span className="text-lg font-extrabold text-slate-800">
                {fmt(resultat.impotTotal)} EUR
              </span>
            </div>
          </div>
        </div>

        {resultat.economiePME > 0 && (
          <div className="bg-green-50 rounded-2xl border border-green-200 p-5 shadow-sm">
            <p className="text-xs font-medium text-green-700 mb-1">
              Économie PME vs taux normal
            </p>
            <p className="text-2xl font-extrabold text-green-600">
              {fmt(resultat.economiePME)} EUR
            </p>
            <p className="text-xs text-green-600 mt-1">
              Grâce au statut PME
            </p>
          </div>
        )}

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Taux ISOC en vigueur en Belgique pour 2026 (SPF Finances, UCM, BDO).
        </div>
      </div>
    </div>
  );
}
