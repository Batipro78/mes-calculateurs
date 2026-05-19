"use client";

import { useState } from "react";
import {
  allureMinKmVersKmh,
  kmhVersAllureMinKm,
  allureMinKmVersMinMile,
  formatAllure,
  parseAllure,
  genererPredictions,
} from "./allureCourseCalc";

type ModeEntree = "allure" | "vitesse";

function fmt(n: number, digits = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function ConvertisseurAllureCourse() {
  const [modeEntree, setModeEntree] = useState<ModeEntree>("allure");
  const [valueAllure, setValueAllure] = useState<string>("5:30");
  const [valueVitesse, setValueVitesse] = useState<string>("11");

  let allureMinKmDec: number | null = null;
  let kmh: number | null = null;
  let minMile: number | null = null;

  if (modeEntree === "allure") {
    const parsed = parseAllure(valueAllure);
    if (parsed !== null && parsed > 0) {
      allureMinKmDec = parsed;
      kmh = allureMinKmVersKmh(parsed);
      minMile = allureMinKmVersMinMile(parsed);
    }
  } else {
    const val = parseFloat(valueVitesse) || 0;
    if (val > 0) {
      kmh = val;
      allureMinKmDec = kmhVersAllureMinKm(val);
      minMile = allureMinKmVersMinMile(allureMinKmDec);
    }
  }

  const predictions =
    allureMinKmDec !== null ? genererPredictions(allureMinKmDec) : [];

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Mode entree toggle */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Je connais :
          </label>
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setModeEntree("allure")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                modeEntree === "allure"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              L&apos;allure (min/km)
            </button>
            <button
              onClick={() => setModeEntree("vitesse")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                modeEntree === "vitesse"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              La vitesse (km/h)
            </button>
          </div>
        </div>

        {/* Allure input */}
        {modeEntree === "allure" && (
          <div>
            <label
              htmlFor="allure-input"
              className="block text-sm font-medium text-slate-600 mb-2"
            >
              Allure (MM:SS par km)
            </label>
            <div className="relative">
              <input
                id="allure-input"
                type="text"
                value={valueAllure}
                onChange={(e) => setValueAllure(e.target.value)}
                placeholder="ex: 5:30"
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
              />
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Format : minutes:secondes par kilometre
            </p>
          </div>
        )}

        {/* Vitesse input */}
        {modeEntree === "vitesse" && (
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
                placeholder="ex: 11"
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
                min="0"
                step="0.1"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                km/h
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {allureMinKmDec !== null && kmh !== null ? (
          <>
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-6 shadow-lg shadow-emerald-200/50">
              <p className="text-sm text-emerald-100 mb-1">Allure</p>
              <p className="text-4xl font-extrabold tracking-tight">
                {formatAllure(allureMinKmDec)}
              </p>
              <p className="text-sm text-emerald-100 mt-3">par km</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Vitesse</span>
                  <span className="text-lg font-bold text-slate-800">
                    {fmt(kmh, 2)} km/h
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Allure/mile</span>
                  <span className="text-lg font-bold text-slate-800">
                    {formatAllure(minMile || 0)}
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center">
            <p className="text-sm text-slate-400">
              Entrez une valeur pour voir les conversions
            </p>
          </div>
        )}

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Conversions instantanees entre allure et vitesse de course a pied.
        </div>
      </div>

      {/* Tableau predictions */}
      {predictions.length > 0 && (
        <div className="lg:col-span-5 mt-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Temps predits sur distances courantes
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
                      {p.distance}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600">
                      {p.tempsTotal}
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
