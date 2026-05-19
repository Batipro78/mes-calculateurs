"use client";

import { useState } from "react";
import {
  calculer1RM,
  chargePourReps,
  pourcentDe1RM,
  POURCENTS_REPS,
  arrondirAuPlate,
  type ResultatRM,
} from "./oneRepMaxCalc";

type Mode = "calculer" | "charger";
type Unite = "kg" | "lbs";

function fmt(n: number, digits = 1): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function Calcul1RM() {
  const [mode, setMode] = useState<Mode>("calculer");
  const [unite, setUnite] = useState<Unite>("kg");
  const [poids, setPoids] = useState<string>("80");
  const [reps, setReps] = useState<string>("5");
  const [oneRM, setOneRM] = useState<string>("100");

  // Conversions kg <-> lbs
  const factorKgLbs = 2.20462;
  const poidsDPlay = unite === "kg" ? parseFloat(poids) || 0 : (parseFloat(poids) || 0) / factorKgLbs;
  const repsDPlay = parseFloat(reps) || 0;
  const oneRMDisplay = unite === "kg" ? parseFloat(oneRM) || 0 : (parseFloat(oneRM) || 0) / factorKgLbs;

  // Calcul 1RM (en kg)
  const resultat: ResultatRM = calculer1RM(poidsDPlay, repsDPlay);

  // Pour affichage
  const rm1Display = unite === "kg" ? resultat.moyenneArrondie : Math.round(resultat.moyenneArrondie * factorKgLbs * 10) / 10;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Toggle Mode */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Mode calcul
          </label>
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setMode("calculer")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                mode === "calculer"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Calculer mon 1RM
            </button>
            <button
              onClick={() => setMode("charger")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                mode === "charger"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Mes charges par reps
            </button>
          </div>
        </div>

        {/* Toggle Unite */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Unité
          </label>
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setUnite("kg")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                unite === "kg"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Kg
            </button>
            <button
              onClick={() => setUnite("lbs")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                unite === "lbs"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Lbs
            </button>
          </div>
        </div>

        {/* Mode Calculer mon 1RM */}
        {mode === "calculer" && (
          <>
            {/* Poids */}
            <div className="mb-6">
              <label htmlFor="poids" className="block text-sm font-medium text-slate-600 mb-2">
                Charge soulevée ({unite.toUpperCase()})
              </label>
              <div className="relative">
                <input
                  id="poids"
                  type="number"
                  value={poids}
                  onChange={(e) => setPoids(e.target.value)}
                  placeholder="ex: 80"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow"
                  step="0.5"
                />
              </div>
            </div>

            {/* Reps */}
            <div className="mb-6">
              <label htmlFor="reps" className="block text-sm font-medium text-slate-600 mb-2">
                Nombre de répétitions
              </label>
              <div className="relative">
                <input
                  id="reps"
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  placeholder="ex: 5"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow"
                  step="1"
                  min="1"
                  max="100"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">De 1 à 100 reps</p>
            </div>
          </>
        )}

        {/* Mode Charger depuis 1RM */}
        {mode === "charger" && (
          <>
            {/* 1RM */}
            <div className="mb-6">
              <label htmlFor="oneRM" className="block text-sm font-medium text-slate-600 mb-2">
                Mon 1RM ({unite.toUpperCase()})
              </label>
              <div className="relative">
                <input
                  id="oneRM"
                  type="number"
                  value={oneRM}
                  onChange={(e) => setOneRM(e.target.value)}
                  placeholder="ex: 100"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow"
                  step="0.5"
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Résultats - 2 cols */}
      <div className="lg:col-span-2">
        {mode === "calculer" && (
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border border-purple-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-6">
              Votre 1RM estimé
            </h3>

            {/* Grand nombre */}
            <div className="mb-8 text-center">
              <div className="text-5xl font-black text-purple-600">
                {fmt(rm1Display, 1)}
              </div>
              <div className="text-sm text-slate-500 mt-2">{unite.toUpperCase()}</div>
            </div>

            {/* 5 formules */}
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-3.5 flex justify-between items-center border border-purple-100">
                <span className="text-sm font-medium text-slate-600">Brzycki</span>
                <span className="text-lg font-bold text-purple-600">
                  {fmt(unite === "kg" ? resultat.brzycki : resultat.brzycki * factorKgLbs, 1)}
                </span>
              </div>
              <div className="bg-white rounded-xl p-3.5 flex justify-between items-center border border-purple-100">
                <span className="text-sm font-medium text-slate-600">Epley</span>
                <span className="text-lg font-bold text-purple-600">
                  {fmt(unite === "kg" ? resultat.epley : resultat.epley * factorKgLbs, 1)}
                </span>
              </div>
              <div className="bg-white rounded-xl p-3.5 flex justify-between items-center border border-purple-100">
                <span className="text-sm font-medium text-slate-600">Lander</span>
                <span className="text-lg font-bold text-purple-600">
                  {fmt(unite === "kg" ? resultat.lander : resultat.lander * factorKgLbs, 1)}
                </span>
              </div>
              <div className="bg-white rounded-xl p-3.5 flex justify-between items-center border border-purple-100">
                <span className="text-sm font-medium text-slate-600">Lombardi</span>
                <span className="text-lg font-bold text-purple-600">
                  {fmt(unite === "kg" ? resultat.lombardi : resultat.lombardi * factorKgLbs, 1)}
                </span>
              </div>
              <div className="bg-white rounded-xl p-3.5 flex justify-between items-center border border-purple-100">
                <span className="text-sm font-medium text-slate-600">O&apos;Connor</span>
                <span className="text-lg font-bold text-purple-600">
                  {fmt(unite === "kg" ? resultat.oconnor : resultat.oconnor * factorKgLbs, 1)}
                </span>
              </div>

              <div className="bg-purple-100 rounded-xl p-3.5 flex justify-between items-center border border-purple-200 mt-4">
                <span className="font-semibold text-purple-900">Moyenne (arrondie)</span>
                <span className="text-xl font-black text-purple-700">
                  {fmt(rm1Display, 1)}
                </span>
              </div>
            </div>
          </div>
        )}

        {mode === "charger" && (
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border border-purple-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4">
              Charges pour 1-20 reps
            </h3>

            <div className="overflow-y-auto max-h-[600px]">
              <div className="space-y-2">
                {POURCENTS_REPS.map(({ reps, pourcent }) => {
                  const chargeKg = chargePourReps(oneRMDisplay, reps);
                  const chargeDisplay = unite === "kg" ? chargeKg : Math.round(chargeKg * factorKgLbs * 10) / 10;
                  const chargeArrondie = arrondirAuPlate(chargeDisplay, 2.5);

                  return (
                    <div key={reps} className="bg-white rounded-xl p-3 flex justify-between items-center border border-purple-100">
                      <div className="flex-1">
                        <span className="text-sm font-semibold text-slate-700">
                          {reps === 1 ? "1 rep" : `${reps} reps`}
                        </span>
                        <span className="text-xs text-slate-400 ml-2">({pourcent}% 1RM)</span>
                      </div>
                      <span className="text-lg font-bold text-purple-600">
                        {fmt(chargeArrondie, 1)} {unite}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
