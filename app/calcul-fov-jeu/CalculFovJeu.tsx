"use client";

import { useState } from "react";
import {
  Ratio,
  RATIOS,
  RATIOS_LABELS,
  JEUX_FOV_DEFAUT,
  convertirHfovVersVfov,
  convertirVfovVersHfov,
  convertirFovRatiosHorplus,
  convertirFovRatiosVertminus,
  genererTableauFovRatios,
} from "./fovJeuCalc";

function fmt(n: number, digits = 1): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

type Mode = "hfov-vfov" | "ratios";

const RATIOS_LISTE: Ratio[] = ["4:3", "5:4", "16:10", "16:9", "21:9", "32:9"];

export default function CalculFovJeu() {
  const [mode, setMode] = useState<Mode>("hfov-vfov");
  const [typeConversion, setTypeConversion] = useState<"hfov-vers-vfov" | "vfov-vers-hfov">(
    "hfov-vers-vfov"
  );

  // Mode 1: HFOV <-> VFOV
  const [hfovInput, setHfovInput] = useState<string>("90");
  const [ratioHfovVfov, setRatioHfovVfov] = useState<Ratio>("16:9");

  // Mode 2: Entre ratios
  const [fovRatiosInput, setFovRatiosInput] = useState<string>("90");
  const [ratioSource, setRatioSource] = useState<Ratio>("16:9");
  const [ratioCible, setRatioCible] = useState<Ratio>("21:9");
  const [scalingMode, setScalingMode] = useState<"horizontal+" | "vertical-">(
    "horizontal+"
  );

  const hfovNum = parseFloat(hfovInput) || 0;
  const fovRatiosNum = parseFloat(fovRatiosInput) || 0;

  // Resultats Mode 1
  let resultHfovVfov = null;
  if (mode === "hfov-vfov" && hfovNum > 0) {
    if (typeConversion === "hfov-vers-vfov") {
      resultHfovVfov = convertirHfovVersVfov(hfovNum, ratioHfovVfov);
    } else {
      resultHfovVfov = convertirVfovVersHfov(hfovNum, ratioHfovVfov);
    }
  }

  // Resultats Mode 2
  let resultRatios = null;
  if (mode === "ratios" && fovRatiosNum > 0) {
    if (scalingMode === "horizontal+") {
      resultRatios = convertirFovRatiosHorplus(
        fovRatiosNum,
        ratioSource,
        ratioCible
      );
    } else {
      resultRatios = convertirFovRatiosVertminus(
        fovRatiosNum,
        ratioSource,
        ratioCible
      );
    }
  }

  // Tableau tous les ratios
  const tableauRatios =
    mode === "hfov-vfov" && hfovNum > 0
      ? genererTableauFovRatios(hfovNum, ratioHfovVfov)
      : mode === "ratios" && fovRatiosNum > 0
        ? genererTableauFovRatios(
            fovRatiosNum,
            ratioSource,
            scalingMode
          )
        : null;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Toggle Mode */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Type de conversion
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setMode("hfov-vfov")}
              className={`p-3 rounded-xl border-2 text-left transition-all ${
                mode === "hfov-vfov"
                  ? "border-teal-500 bg-teal-50/50"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className="text-xs font-bold text-slate-600">
                HFOV ↔ VFOV
              </span>
            </button>
            <button
              onClick={() => setMode("ratios")}
              className={`p-3 rounded-xl border-2 text-left transition-all ${
                mode === "ratios"
                  ? "border-teal-500 bg-teal-50/50"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className="text-xs font-bold text-slate-600">
                Entre ratios
              </span>
            </button>
          </div>
        </div>

        {/* Mode 1: HFOV <-> VFOV */}
        {mode === "hfov-vfov" && (
          <>
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Convertir
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTypeConversion("hfov-vers-vfov")}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    typeConversion === "hfov-vers-vfov"
                      ? "border-teal-500 bg-teal-50/50"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xs font-bold text-slate-600">
                    HFOV → VFOV
                  </span>
                </button>
                <button
                  onClick={() => setTypeConversion("vfov-vers-hfov")}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    typeConversion === "vfov-vers-hfov"
                      ? "border-teal-500 bg-teal-50/50"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xs font-bold text-slate-600">
                    VFOV → HFOV
                  </span>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="fov-input" className="block text-sm font-medium text-slate-600 mb-2">
                FOV {typeConversion === "hfov-vers-vfov" ? "horizontal" : "vertical"} (°)
              </label>
              <input
                id="fov-input"
                type="number"
                value={hfovInput}
                onChange={(e) => setHfovInput(e.target.value)}
                placeholder="ex: 90"
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
                step="0.1"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Ratio d&apos;écran
              </label>
              <select
                value={ratioHfovVfov}
                onChange={(e) => setRatioHfovVfov(e.target.value as Ratio)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
              >
                {RATIOS_LISTE.map((ratio) => (
                  <option key={ratio} value={ratio}>
                    {RATIOS_LABELS[ratio]}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Mode 2: Entre ratios */}
        {mode === "ratios" && (
          <>
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Scaling mode (comment adapter le FOV)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setScalingMode("horizontal+")}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    scalingMode === "horizontal+"
                      ? "border-teal-500 bg-teal-50/50"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xs font-bold text-slate-600">
                    Hor+ (std)
                  </span>
                  <p className="text-xs text-slate-400">HFOV augmente</p>
                </button>
                <button
                  onClick={() => setScalingMode("vertical-")}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    scalingMode === "vertical-"
                      ? "border-teal-500 bg-teal-50/50"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xs font-bold text-slate-600">
                    Vert- (rare)
                  </span>
                  <p className="text-xs text-slate-400">VFOV constant</p>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="fov-ratios-input" className="block text-sm font-medium text-slate-600 mb-2">
                FOV (°)
              </label>
              <input
                id="fov-ratios-input"
                type="number"
                value={fovRatiosInput}
                onChange={(e) => setFovRatiosInput(e.target.value)}
                placeholder="ex: 90"
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
                step="0.1"
                min="0"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Ratio source
              </label>
              <select
                value={ratioSource}
                onChange={(e) => setRatioSource(e.target.value as Ratio)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
              >
                {RATIOS_LISTE.map((ratio) => (
                  <option key={ratio} value={ratio}>
                    {RATIOS_LABELS[ratio]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Ratio cible
              </label>
              <select
                value={ratioCible}
                onChange={(e) => setRatioCible(e.target.value as Ratio)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
              >
                {RATIOS_LISTE.map((ratio) => (
                  <option key={ratio} value={ratio}>
                    {RATIOS_LABELS[ratio]}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {mode === "hfov-vfov" && resultHfovVfov ? (
          <>
            <div className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white rounded-2xl p-6 shadow-lg shadow-teal-200/50">
              <p className="text-sm text-teal-100 mb-1">
                FOV {typeConversion === "hfov-vers-vfov" ? "vertical" : "horizontal"}
              </p>
              <p className="text-4xl font-extrabold tracking-tight">
                {fmt(resultHfovVfov.fovCible, 2)}°
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-sm text-slate-600 space-y-2">
              {resultHfovVfov.hfov !== undefined && (
                <div className="flex justify-between">
                  <span>HFOV</span>
                  <span className="font-bold text-slate-800">
                    {fmt(resultHfovVfov.hfov, 2)}°
                  </span>
                </div>
              )}
              {resultHfovVfov.vfov !== undefined && (
                <div className="flex justify-between border-t border-slate-200 pt-2">
                  <span>VFOV</span>
                  <span className="font-bold text-slate-800">
                    {fmt(resultHfovVfov.vfov, 2)}°
                  </span>
                </div>
              )}
            </div>
          </>
        ) : mode === "ratios" && resultRatios ? (
          <>
            <div className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white rounded-2xl p-6 shadow-lg shadow-teal-200/50">
              <p className="text-sm text-teal-100 mb-1">
                FOV sur {RATIOS_LABELS[ratioCible]}
              </p>
              <p className="text-4xl font-extrabold tracking-tight">
                {fmt(resultRatios.fovCible, 2)}°
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-sm">
              <div className="text-slate-600">Scaling : {scalingMode === "horizontal+" ? "HFOV augmente" : "VFOV constant"}</div>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center">
            <p className="text-sm text-slate-400">
              Entrez FOV pour voir la conversion
            </p>
          </div>
        )}

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Les conversions utilisent des formules trigonometriques precises.
        </div>
      </div>

      {/* Tableau FOV sur tous les ratios */}
      {tableauRatios && (
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            FOV equivalents sur tous les ratios
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">
                    Ratio
                  </th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">
                    FOV (°)
                  </th>
                </tr>
              </thead>
              <tbody>
                {RATIOS_LISTE.map((ratio, idx) => (
                  <tr
                    key={ratio}
                    className={`border-b border-slate-100 hover:bg-slate-50 ${
                      idx === 3 ? "bg-teal-50/50" : ""
                    }`}
                  >
                    <td className="py-3 px-2 font-medium text-slate-700">
                      {RATIOS_LABELS[ratio]}
                    </td>
                    <td className="py-3 px-2 text-right font-bold text-slate-800">
                      {fmt(tableauRatios[ratio], 2)}°
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Section FOV par jeu */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          FOV par defaut des jeux populaires
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Jeu
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  FOV defaut
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Gamme
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Note
                </th>
              </tr>
            </thead>
            <tbody>
              {JEUX_FOV_DEFAUT.map((jeu, idx) => (
                <tr
                  key={jeu.jeu}
                  className={`border-b border-slate-100 hover:bg-slate-50 ${
                    idx % 2 === 0 ? "bg-slate-50/30" : ""
                  }`}
                >
                  <td className="py-3 px-2 font-medium text-slate-700">
                    <span className="mr-2">{jeu.emoji}</span>
                    {jeu.jeu}
                  </td>
                  <td className="py-3 px-2 text-slate-700 font-bold">
                    {jeu.hfov || jeu.vfovLocked}°
                  </td>
                  <td className="py-3 px-2 text-slate-600 text-xs">
                    {jeu.min}° - {jeu.max}°
                  </td>
                  <td className="py-3 px-2 text-slate-500 text-xs">
                    {jeu.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
