"use client";

import { useState } from "react";
import {
  parseAllureNatation,
  formatAllureNatation,
  allureVersVitesse,
  vitesseVersAllure,
  genererPredictions,
  calculerSWOLF,
} from "./natationCalc";

type ModeCalc = "allure" | "vitesse" | "swolf";

function fmt(n: number, digits = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function CalculAllureNatation() {
  const [mode, setMode] = useState<ModeCalc>("allure");
  const [valueAllure, setValueAllure] = useState<string>("1:45");
  const [valueVitesse, setValueVitesse] = useState<string>("3.5");
  const [valueTemps25, setValueTemps25] = useState<string>("30");
  const [valueCoups, setValueCoups] = useState<string>("16");

  let alluremin100m: number | null = null;
  let kmh: number | null = null;
  let predictions: { distance: number; distanceLabel: string; temps: string }[] = [];
  let swolfResult = null;

  if (mode === "allure") {
    const parsed = parseAllureNatation(valueAllure);
    if (parsed !== null && parsed > 0) {
      alluremin100m = parsed;
      kmh = allureVersVitesse(parsed);
      predictions = genererPredictions(alluremin100m);
    }
  } else if (mode === "vitesse") {
    const val = parseFloat(valueVitesse) || 0;
    if (val > 0) {
      kmh = val;
      alluremin100m = vitesseVersAllure(val);
      predictions = genererPredictions(alluremin100m);
    }
  } else if (mode === "swolf") {
    const temps = parseFloat(valueTemps25) || 0;
    const coups = parseInt(valueCoups) || 0;
    if (temps > 0 && coups > 0) {
      swolfResult = calculerSWOLF(temps, coups);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Mode toggle */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Je calcule :
          </label>
          <div className="flex flex-col gap-2 sm:flex-row sm:bg-slate-100 sm:rounded-xl sm:p-1">
            <button
              onClick={() => setMode("allure")}
              className={`py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                mode === "allure"
                  ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md"
                  : "bg-slate-50 text-slate-600 hover:text-slate-800"
              }`}
            >
              Allure (depuis temps)
            </button>
            <button
              onClick={() => setMode("vitesse")}
              className={`py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                mode === "vitesse"
                  ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md"
                  : "bg-slate-50 text-slate-600 hover:text-slate-800"
              }`}
            >
              Vitesse (depuis allure)
            </button>
            <button
              onClick={() => setMode("swolf")}
              className={`py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                mode === "swolf"
                  ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md"
                  : "bg-slate-50 text-slate-600 hover:text-slate-800"
              }`}
            >
              SWOLF Score
            </button>
          </div>
        </div>

        {/* Allure mode */}
        {mode === "allure" && (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="allure-input"
                className="block text-sm font-medium text-slate-600 mb-2"
              >
                Allure (MM:SS par 100m)
              </label>
              <input
                id="allure-input"
                type="text"
                value={valueAllure}
                onChange={(e) => setValueAllure(e.target.value)}
                placeholder="ex: 1:45"
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow"
              />
              <p className="text-xs text-slate-400 mt-2">
                Format : minutes:secondes pour 100 mètres
              </p>
            </div>
          </div>
        )}

        {/* Vitesse mode */}
        {mode === "vitesse" && (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="vitesse-input"
                className="block text-sm font-medium text-slate-600 mb-2"
              >
                Vitesse (km/h)
              </label>
              <div className="relative">
                <input
                  id="vitesse-input"
                  type="number"
                  value={valueVitesse}
                  onChange={(e) => setValueVitesse(e.target.value)}
                  placeholder="ex: 3.5"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow"
                  min="0"
                  step="0.1"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  km/h
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SWOLF mode */}
        {mode === "swolf" && (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="temps25-input"
                className="block text-sm font-medium text-slate-600 mb-2"
              >
                Temps 25m (secondes)
              </label>
              <div className="relative">
                <input
                  id="temps25-input"
                  type="number"
                  value={valueTemps25}
                  onChange={(e) => setValueTemps25(e.target.value)}
                  placeholder="ex: 30"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow"
                  min="0"
                  step="0.1"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  s
                </span>
              </div>
            </div>
            <div>
              <label
                htmlFor="coups-input"
                className="block text-sm font-medium text-slate-600 mb-2"
              >
                Nombre de coups (25m)
              </label>
              <input
                id="coups-input"
                type="number"
                value={valueCoups}
                onChange={(e) => setValueCoups(e.target.value)}
                placeholder="ex: 16"
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow"
                min="0"
              />
              <p className="text-xs text-slate-400 mt-2">
                Nombre total de mouvements de bras en 25m crawl
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Résultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {(alluremin100m !== null || swolfResult !== null) ? (
          <>
            {mode === "swolf" && swolfResult ? (
              <div
                className={`bg-gradient-to-br ${swolfResult.niveauCouleur} text-white rounded-2xl p-6 shadow-lg`}
              >
                <p className="text-slate-100 mb-1">SWOLF Score</p>
                <p className="text-4xl font-extrabold tracking-tight">
                  {swolfResult.swolf}
                </p>
                <p className="text-sm text-slate-100 mt-3">
                  Niveau : {swolfResult.niveau}
                </p>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg shadow-cyan-200/50">
                  <p className="text-cyan-100 mb-1">Allure</p>
                  <p className="text-4xl font-extrabold tracking-tight">
                    {formatAllureNatation(alluremin100m || 0)}
                  </p>
                  <p className="text-sm text-cyan-100 mt-3">par 100m</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Vitesse</span>
                      <span className="text-lg font-bold text-slate-800">
                        {fmt(kmh || 0, 2)} km/h
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center">
            <p className="text-sm text-slate-400">
              Entrez une valeur pour voir les résultats
            </p>
          </div>
        )}

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Conversions instantanées pour natation : allure, vitesse, SWOLF,
          prédictions d&apos;Ironman.
        </div>
      </div>

      {/* Tableau prédictions */}
      {predictions.length > 0 && (
        <div className="lg:col-span-5 mt-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Temps prédits sur distances courantes
          </h3>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-3 px-4 text-slate-500 font-medium">
                    Distance
                  </th>
                  <th className="text-right py-3 px-4 text-slate-500 font-medium">
                    Temps
                  </th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((p) => (
                  <tr
                    key={p.distance}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="py-3 px-4 font-medium text-slate-700">
                      {p.distanceLabel}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-blue-600">
                      {p.temps}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
