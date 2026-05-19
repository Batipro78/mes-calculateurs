"use client";

import { useState } from "react";
import {
  calculerTempsTelechargement,
  JEUX_TAILLES,
  APPS_TAILLES,
  DEBITS_FAI,
  type UniteTaille,
  type UniteDebit,
} from "./tempsDlCalc";

type ModeSelection = "manuel" | "jeu" | "app" | "fai";

export default function CalculTempsTelechargement() {
  const [taille, setTaille] = useState<string>("100");
  const [uniteTaille, setUniteTaille] = useState<UniteTaille>("Go");
  const [debit, setDebit] = useState<string>("100");
  const [uniteDebit, setUniteDebit] = useState<UniteDebit>("Mb/s");

  const [modeSelection, setModeSelection] = useState<ModeSelection>("manuel");
  const [jeuSelectiole, setJeuSelectionne] = useState<string>("cod-mw3");
  const [appSelectionnee, setAppSelectionnee] = useState<string>("film-4k");
  const [faiSelectionne, setFaiSelectionne] = useState<string>("fibre-100");

  // Appliquer les presets
  const handleJeuSelect = (jeuId: string) => {
    const jeu = JEUX_TAILLES.find((j) => j.id === jeuId);
    if (jeu) {
      setTaille(jeu.taille_go.toString());
      setUniteTaille("Go");
      setJeuSelectionne(jeuId);
      setModeSelection("jeu");
    }
  };

  const handleAppSelect = (appId: string) => {
    const app = APPS_TAILLES.find((a) => a.id === appId);
    if (app) {
      setTaille(app.taille_go.toString());
      setUniteTaille("Go");
      setAppSelectionnee(appId);
      setModeSelection("app");
    }
  };

  const handleFaiSelect = (faiNom: string) => {
    const fai = DEBITS_FAI.find((f) => f.nom === faiNom);
    if (fai) {
      setDebit(fai.debit.toString());
      setUniteDebit(fai.unite);
      setFaiSelectionne(faiNom);
      setModeSelection("fai");
    }
  };

  // Calcul
  const tailleParsed = parseFloat(taille) || 0;
  const debitParsed = parseFloat(debit) || 0;
  const resultat =
    tailleParsed > 0 && debitParsed > 0
      ? calculerTempsTelechargement(tailleParsed, uniteTaille, debitParsed, uniteDebit)
      : null;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-8">
        {/* Section Taille du fichier */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-3">
            Taille du fichier
          </label>

          {/* Toggle Jeu/App/Manuel */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <button
              onClick={() => setModeSelection("manuel")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                modeSelection === "manuel"
                  ? "bg-cyan-100 text-cyan-700 border border-cyan-300"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Manuel
            </button>
            <button
              onClick={() => setModeSelection("jeu")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                modeSelection === "jeu"
                  ? "bg-cyan-100 text-cyan-700 border border-cyan-300"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              🎮 Jeu
            </button>
            <button
              onClick={() => setModeSelection("app")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                modeSelection === "app"
                  ? "bg-cyan-100 text-cyan-700 border border-cyan-300"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              📱 App/Film
            </button>
          </div>

          {modeSelection === "manuel" && (
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="number"
                  value={taille}
                  onChange={(e) => setTaille(e.target.value)}
                  placeholder="ex: 100"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow"
                  min="0"
                  step="1"
                />
              </div>
              <select
                value={uniteTaille}
                onChange={(e) => setUniteTaille(e.target.value as UniteTaille)}
                className="border border-slate-300 rounded-xl px-3 py-3 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow"
              >
                <option value="Mo">Mo</option>
                <option value="Go">Go</option>
                <option value="To">To</option>
              </select>
            </div>
          )}

          {modeSelection === "jeu" && (
            <select
              value={jeuSelectiole}
              onChange={(e) => handleJeuSelect(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow"
            >
              {JEUX_TAILLES.map((jeu) => (
                <option key={jeu.id} value={jeu.id}>
                  {jeu.emoji} {jeu.nom} ({jeu.taille_go} Go)
                </option>
              ))}
            </select>
          )}

          {modeSelection === "app" && (
            <select
              value={appSelectionnee}
              onChange={(e) => handleAppSelect(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow"
            >
              {APPS_TAILLES.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.emoji} {app.nom} ({app.taille_go} Go)
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Section Débit internet */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-3">
            Débit internet
          </label>

          {/* Toggle Manuel/FAI */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setModeSelection("manuel")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                modeSelection === "manuel"
                  ? "bg-cyan-100 text-cyan-700 border border-cyan-300"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Manuel
            </button>
            <button
              onClick={() => setModeSelection("fai")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                modeSelection === "fai"
                  ? "bg-cyan-100 text-cyan-700 border border-cyan-300"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              🌐 Presets FAI
            </button>
          </div>

          {modeSelection !== "fai" && (
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="number"
                  value={debit}
                  onChange={(e) => setDebit(e.target.value)}
                  placeholder="ex: 100"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow"
                  min="0"
                  step="1"
                />
              </div>
              <select
                value={uniteDebit}
                onChange={(e) => setUniteDebit(e.target.value as UniteDebit)}
                className="border border-slate-300 rounded-xl px-3 py-3 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow"
              >
                <option value="Kb/s">Kb/s</option>
                <option value="Mb/s">Mb/s</option>
                <option value="Gb/s">Gb/s</option>
              </select>
            </div>
          )}

          {modeSelection === "fai" && (
            <select
              value={faiSelectionne}
              onChange={(e) => handleFaiSelect(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow"
            >
              {DEBITS_FAI.map((fai, idx) => (
                <option key={idx} value={fai.nom}>
                  {fai.nom} ({fai.debit} {fai.unite})
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {resultat ? (
          <>
            {/* Résultat théorique */}
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg shadow-blue-200/50">
              <p className="text-sm text-blue-100 mb-1">Temps théorique</p>
              <p className="text-4xl font-extrabold tracking-tight">
                {resultat.theoriqueFormat}
              </p>
              <p className="text-xs text-blue-200 mt-2">
                Sans overhead réseau
              </p>
            </div>

            {/* Résultat réel */}
            <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-6 shadow-lg shadow-red-200/50">
              <p className="text-sm text-red-100 mb-1">Temps réel estimé</p>
              <p className="text-4xl font-extrabold tracking-tight">
                {resultat.reelFormat}
              </p>
              <p className="text-xs text-red-200 mt-2">
                Avec overhead réseau ~10%
              </p>
            </div>

            {/* Info conversion */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500 mb-3 font-semibold">
                CONVERSIONS
              </p>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Taille fichier :</span>
                  <span className="font-semibold">
                    {tailleParsed} {uniteTaille}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Débit :</span>
                  <span className="font-semibold">
                    {debitParsed} {uniteDebit}
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center">
            <p className="text-sm text-slate-400">
              Entrez une taille et un débit pour voir le temps
            </p>
          </div>
        )}

        <div className="rounded-xl bg-blue-50 border border-blue-200 px-4 py-3 text-xs text-blue-700 leading-relaxed font-medium">
          💡 1 Mb/s = 125 Ko/s (différence bits/octets)
        </div>
      </div>

      {/* Tableau comparaison débits */}
      {resultat && (
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mt-4">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Temps avec différents débits
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">
                    Débit
                  </th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">
                    Théorique
                  </th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">
                    Réel estimé
                  </th>
                </tr>
              </thead>
              <tbody>
                {[8, 25, 50, 100, 500, 1000, 2000].map((debitTest) => {
                  const resultatTest = calculerTempsTelechargement(
                    tailleParsed,
                    uniteTaille,
                    debitTest,
                    "Mb/s"
                  );
                  return (
                    <tr
                      key={debitTest}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="py-3 px-2 font-medium text-slate-700">
                        {debitTest} Mb/s
                      </td>
                      <td className="py-3 px-2 text-right text-slate-600">
                        {resultatTest.theoriqueFormat}
                      </td>
                      <td className="py-3 px-2 text-right font-semibold text-slate-800">
                        {resultatTest.reelFormat}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
