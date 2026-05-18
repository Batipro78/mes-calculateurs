"use client";

import { useState } from "react";
import {
  calculerChomageBE,
  PLAFOND_INFO,
  type SituationFamilialeChomage,
} from "./chomageBeCalc";

const SITUATIONS: { value: SituationFamilialeChomage; label: string; desc: string }[] = [
  { value: "isole", label: "Isole", desc: "Vit seul" },
  { value: "cohabitant-charge-famille", label: "Chef de famille", desc: "Charge de famille" },
  { value: "cohabitant-sans-charge", label: "Cohabitant simple", desc: "Sans charge de famille" },
];

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-BE");
}

export default function SimulateurChomageBE() {
  const [brut, setBrut] = useState<string>("3000");
  const [situation, setSituation] = useState<SituationFamilialeChomage>("isole");
  const [moisChomage, setMoisChomage] = useState<number>(6);

  const brutNum = parseFloat(brut) || 0;
  const res = calculerChomageBE(brutNum, situation, moisChomage);

  // Courbe par mois 1-24
  const allMois = [1, 3, 6, 12, 18, 24];

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label
            htmlFor="brut-chomage"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Salaire brut mensuel (avant licenciement)
          </label>
          <div className="relative">
            <input
              id="brut-chomage"
              type="number"
              value={brut}
              onChange={(e) => setBrut(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow"
              min="0"
              step="100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
          {brutNum > PLAFOND_INFO.mensuel && (
            <p className="text-xs text-amber-600 mt-2">
              ⚠ Plafond ONEM = {fmt(PLAFOND_INFO.mensuel)} EUR/mois. Le calcul
              utilise ce plafond.
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Situation familiale
          </label>
          <div className="grid grid-cols-1 gap-2">
            {SITUATIONS.map((s) => (
              <button
                key={s.value}
                onClick={() => setSituation(s.value)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  situation === s.value
                    ? "border-sky-500 bg-sky-50/50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-sm font-bold text-slate-800">
                  {s.label}
                </span>
                <span className="block text-xs text-slate-400 mt-0.5">
                  {s.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="mois-chomage"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Mois de chomage : {moisChomage}
          </label>
          <input
            id="mois-chomage"
            type="range"
            min="1"
            max="24"
            value={moisChomage}
            onChange={(e) => setMoisChomage(parseInt(e.target.value, 10))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>1 mois</span>
            <span>12 mois</span>
            <span>24 mois</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Reforme 2026 : duree max 24 mois (12 base + 12 selon passe pro).
          </p>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg shadow-sky-200/50">
          <p className="text-sm text-sky-100 mb-1">
            Allocation au mois {moisChomage}
          </p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(res.allocationMensuelle)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
          <p className="text-xs text-sky-100 mt-2">
            Taux applique : {res.tauxApplique.toFixed(1)} %
            <br />
            {res.phaseLabel}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Cumul total sur {moisChomage} mois
          </p>
          <p className="text-2xl font-bold text-slate-800">
            {fmt(res.totalSurDuree)} EUR
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Brut plafonne utilise : {fmt(res.brutPlafonne)} EUR/mois
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Allocation par phase ({SITUATIONS.find((s) => s.value === situation)?.label})
          </p>
          <div className="space-y-1.5 text-xs">
            {allMois.map((m) => {
              const r = calculerChomageBE(brutNum, situation, m);
              return (
                <div
                  key={m}
                  className={`flex justify-between p-1.5 rounded ${
                    m === moisChomage ? "bg-sky-50" : ""
                  }`}
                >
                  <span className="text-slate-600">Mois {m}</span>
                  <span className="font-bold text-slate-800">
                    {fmt(r.allocationMensuelle)} EUR ({r.tauxApplique.toFixed(0)} %)
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Reforme assurance chomage en vigueur depuis 01/03/2026. Plafond brut
          journalier ONEM : {PLAFOND_INFO.journalier} EUR (~{fmt(PLAFOND_INFO.mensuel)} EUR/mois).
        </div>
      </div>
    </div>
  );
}
