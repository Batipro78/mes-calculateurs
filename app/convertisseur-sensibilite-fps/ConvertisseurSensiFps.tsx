"use client";

import { useState } from "react";
import {
  Jeu,
  JEUX_LABELS,
  convertirSensibilite,
  convertirVersTouxLesJeux,
} from "./sensiFpsCalc";

function fmt(n: number, digits = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

const JEUX_LISTE: Jeu[] = ["cs2", "valorant", "apex", "fortnite", "overwatch", "r6"];
const DPI_PRESETS = [400, 800, 1600];

export default function ConvertisseurSensiFps() {
  const [jeuSource, setJeuSource] = useState<Jeu>("cs2");
  const [sensSource, setSensSource] = useState<string>("1.0");
  const [dpi, setDpi] = useState<string>("800");
  const [jeuCible, setJeuCible] = useState<Jeu>("valorant");

  const sensSourceNum = parseFloat(sensSource) || 0;
  const dpiNum = parseFloat(dpi) || 0;

  let resultat =
    sensSourceNum > 0 && dpiNum > 0
      ? convertirSensibilite(jeuSource, jeuCible, sensSourceNum, dpiNum)
      : null;

  // Conversion vers tous les jeux
  const conversionsToutes =
    sensSourceNum > 0 && dpiNum > 0
      ? convertirVersTouxLesJeux(jeuSource, sensSourceNum, dpiNum)
      : null;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Jeu source */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Jeu source
          </label>
          <div className="grid grid-cols-2 gap-2">
            {JEUX_LISTE.map((jeu) => (
              <button
                key={jeu}
                onClick={() => setJeuSource(jeu)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  jeuSource === jeu
                    ? "border-teal-500 bg-teal-50/50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-xs font-bold text-slate-600">
                  {JEUX_LABELS[jeu]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Sensibilite source */}
        <div className="mb-6">
          <label htmlFor="sens-input" className="block text-sm font-medium text-slate-600 mb-2">
            Sensibilite {JEUX_LABELS[jeuSource]}
          </label>
          <input
            id="sens-input"
            type="number"
            value={sensSource}
            onChange={(e) => setSensSource(e.target.value)}
            placeholder="ex: 1.0"
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
            step="0.01"
            min="0"
          />
        </div>

        {/* DPI */}
        <div className="mb-8">
          <label htmlFor="dpi-input" className="block text-sm font-medium text-slate-600 mb-2">
            DPI (eDPI = DPI × Sensibilite)
          </label>
          <input
            id="dpi-input"
            type="number"
            value={dpi}
            onChange={(e) => setDpi(e.target.value)}
            placeholder="ex: 800"
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow mb-4"
            step="1"
            min="0"
          />
          <div className="flex gap-2">
            {DPI_PRESETS.map((preset) => (
              <button
                key={preset}
                onClick={() => setDpi(preset.toString())}
                className="px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-slate-700"
              >
                {preset} DPI
              </button>
            ))}
          </div>
        </div>

        {/* Jeu cible */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Convertir vers
          </label>
          <div className="grid grid-cols-2 gap-2">
            {JEUX_LISTE.map((jeu) => (
              <button
                key={jeu}
                onClick={() => setJeuCible(jeu)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  jeuCible === jeu
                    ? "border-cyan-500 bg-cyan-50/50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-xs font-bold text-slate-600">
                  {JEUX_LABELS[jeu]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {resultat ? (
          <>
            <div className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white rounded-2xl p-6 shadow-lg shadow-teal-200/50">
              <p className="text-sm text-teal-100 mb-1">Sensibilite {JEUX_LABELS[jeuCible]}</p>
              <p className="text-4xl font-extrabold tracking-tight">
                {fmt(resultat.sensCible, 3)}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">eDPI source</span>
                  <span className="text-lg font-bold text-slate-800">
                    {fmt(resultat.edpiSource, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">eDPI cible</span>
                  <span className="text-lg font-bold text-slate-800">
                    {fmt(resultat.edpiCible, 0)}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                  <span className="text-sm text-slate-400">cm/360° (reference)</span>
                  <span className="text-lg font-bold text-teal-600">
                    {fmt(resultat.cm360Source, 1)} cm
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center">
            <p className="text-sm text-slate-400">
              Entrez sensibilite et DPI pour voir la conversion
            </p>
          </div>
        )}

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Conversions instantanees basees sur cm/360° (deplacement physique). A titre educatif.
        </div>
      </div>
    </div>
  );
}
