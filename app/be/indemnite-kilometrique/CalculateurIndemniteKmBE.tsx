"use client";

import { useState } from "react";
import {
  calculerIndemniteKm,
  REGIMES_INDEMNITE,
} from "./indemniteKmBeCalc";

function fmt(montant: number): string {
  return montant.toLocaleString("fr-BE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function CalculateurIndemniteKmBE() {
  const [distance, setDistance] = useState<string>("1000");
  const [regimeIndex, setRegimeIndex] = useState<number>(0);

  const distanceNum = parseFloat(distance) || 0;
  const regime = REGIMES_INDEMNITE[regimeIndex];
  const resultat = calculerIndemniteKm(distanceNum, regime.slug);

  // Calculs pour les autres regimes
  const autresResultats = REGIMES_INDEMNITE.filter(
    (_, i) => i !== regimeIndex
  ).map((r) => ({
    regime: r,
    montant: distanceNum * r.taux,
  }));

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label
            htmlFor="distance-km-be"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Distance en kilometres
          </label>
          <div className="relative">
            <input
              id="distance-km-be"
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
              min="0"
              step="100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              km
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-3">
            Regime d&apos;indemnite (Belgique 2026)
          </label>
          <div className="space-y-2">
            {REGIMES_INDEMNITE.map((r, i) => (
              <button
                key={r.slug}
                onClick={() => setRegimeIndex(i)}
                className={`w-full p-3.5 rounded-xl border-2 text-left transition-all ${
                  regimeIndex === i
                    ? "border-teal-500 bg-teal-50/50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="font-semibold text-slate-800">{r.label}</span>
                <span className="block text-xs text-slate-400 mt-0.5">
                  {r.desc}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl p-6 shadow-lg shadow-teal-200/50">
          <p className="text-sm text-teal-100 mb-1">Indemnite totale</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(resultat.montant)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
          <p className="text-teal-100 mt-2 text-xs">
            {fmt(distanceNum)} km × {fmt(regime.taux)} EUR/km
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Distance</span>
              <span className="text-lg font-bold text-slate-800">
                {fmt(distanceNum)} km
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Taux ({regime.label})</span>
              <span className="text-lg font-bold text-teal-600">
                {fmt(regime.taux)} EUR/km
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">
                Montant total
              </span>
              <span className="text-lg font-extrabold text-slate-800">
                {fmt(resultat.montant)} EUR
              </span>
            </div>
          </div>
        </div>

        {autresResultats.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-xs font-medium text-slate-400 mb-3">
              Comparaison avec autres regimes
            </p>
            <div className="space-y-2">
              {autresResultats.map((r) => (
                <div
                  key={r.regime.slug}
                  className="flex justify-between items-center text-xs"
                >
                  <span className="text-slate-500">{r.regime.label}</span>
                  <span className="font-semibold text-slate-700">
                    {fmt(r.montant)} EUR
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Taux d&apos;indemnite kilometrique en Belgique 2026 (UCM, Securex,
          Partena, SPF Finances).
        </div>
      </div>
    </div>
  );
}
