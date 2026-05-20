"use client";

import { useState } from "react";
import {
  calculerCyclesSommeil,
  formatDuree,
  DUREE_CYCLE_MINUTES,
  DUREE_ENDORMISSEMENT_MINUTES,
  type ModeCalcul,
} from "./cyclesSommeilCalc";

export default function CalculCyclesSommeil() {
  const [mode, setMode] = useState<ModeCalcul>("reveil");
  const [heure, setHeure] = useState<string>("07:00");
  const [inclureLatence, setInclureLatence] = useState<boolean>(true);

  const resultat = calculerCyclesSommeil(mode, heure, inclureLatence);

  const qualiteStyles: Record<
    string,
    { bg: string; border: string; text: string; badge: string; badgeText: string }
  > = {
    courte: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-900",
      badge: "bg-red-100",
      badgeText: "text-red-700",
    },
    minimale: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-900",
      badge: "bg-amber-100",
      badgeText: "text-amber-700",
    },
    optimale: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-900",
      badge: "bg-emerald-100",
      badgeText: "text-emerald-700",
    },
    longue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-900",
      badge: "bg-blue-100",
      badgeText: "text-blue-700",
    },
  };

  return (
    <div className="space-y-8">
      {/* Mode */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Que souhaitez-vous calculer ?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setMode("reveil")}
            className={`p-4 rounded-xl border text-left transition ${
              mode === "reveil"
                ? "bg-indigo-50 border-indigo-500 ring-2 ring-indigo-200"
                : "bg-white border-slate-200 hover:border-indigo-300"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">⏰</span>
              <span className="font-semibold text-slate-800">
                Je dois me reveiller a...
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Calculer a quelle heure m&apos;endormir
            </p>
          </button>

          <button
            type="button"
            onClick={() => setMode("endormissement")}
            className={`p-4 rounded-xl border text-left transition ${
              mode === "endormissement"
                ? "bg-indigo-50 border-indigo-500 ring-2 ring-indigo-200"
                : "bg-white border-slate-200 hover:border-indigo-300"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🌙</span>
              <span className="font-semibold text-slate-800">
                Je m&apos;endors a...
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Calculer a quelle heure me reveiller
            </p>
          </button>
        </div>

        {/* Saisie heure */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="heure" className="block text-sm font-medium text-slate-700 mb-2">
              {mode === "reveil"
                ? "Heure de reveil souhaitee"
                : "Heure d'endormissement"}
            </label>
            <input
              id="heure"
              type="time"
              value={heure}
              onChange={(e) => setHeure(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none font-medium text-slate-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Latence d&apos;endormissement
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setInclureLatence(!inclureLatence)}
                className={`relative w-12 h-6 rounded-full transition ${
                  inclureLatence ? "bg-indigo-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    inclureLatence ? "translate-x-6" : ""
                  }`}
                />
              </button>
              <span className="text-sm text-slate-700">
                Inclure {DUREE_ENDORMISSEMENT_MINUTES} min (moyenne adulte)
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Le temps moyen pour s&apos;endormir est de{" "}
              {DUREE_ENDORMISSEMENT_MINUTES} minutes (INSERM).
            </p>
          </div>
        </div>
      </div>

      {/* Resultats */}
      {resultat && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
            <p className="text-sm opacity-90 mb-1">
              {mode === "reveil"
                ? "Pour vous reveiller a"
                : "Si vous vous endormez a"}
            </p>
            <p className="text-3xl font-bold">{heure}</p>
            <p className="text-sm opacity-90 mt-2">
              Voici les {mode === "reveil" ? "heures de coucher" : "heures de reveil"} ideales,
              calees sur des cycles de {DUREE_CYCLE_MINUTES} min :
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {resultat.propositions.map((p) => {
              const s = qualiteStyles[p.qualiteSommeil];
              return (
                <div
                  key={p.cycles}
                  className={`${s.bg} ${s.border} border rounded-2xl p-5`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className={`text-3xl font-bold ${s.text}`}>{p.heure}</p>
                      <p className={`text-xs ${s.text} opacity-75 mt-1`}>
                        {mode === "reveil" ? "Coucher conseille" : "Reveil naturel"}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold uppercase tracking-wide ${s.badge} ${s.badgeText} px-2 py-1 rounded`}
                    >
                      {p.qualiteSommeil}
                    </span>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className={`${s.text} opacity-80`}>Cycles :</span>
                      <span className={`font-semibold ${s.text}`}>
                        {p.cycles} cycles
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${s.text} opacity-80`}>Sommeil :</span>
                      <span className={`font-semibold ${s.text}`}>
                        {formatDuree(p.dureeSommeilMinutes)}
                      </span>
                    </div>
                  </div>

                  <p className={`text-xs ${s.text} mt-3 leading-relaxed`}>
                    {p.recommandation}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
            <p className="text-amber-900 font-semibold mb-1">
              Astuce : viser 5 ou 6 cycles
            </p>
            <p className="text-amber-800">
              La National Sleep Foundation recommande 7 a 9 heures de sommeil
              pour un adulte, soit environ 5 cycles (7h30) en moyenne. Se
              reveiller en fin de cycle (et non en plein sommeil profond) reduit
              l&apos;inertie matinale.
            </p>
          </div>
        </div>
      )}

      {/* Schema cycle de sommeil */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          Anatomie d&apos;un cycle de sommeil ({DUREE_CYCLE_MINUTES} min)
        </h3>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-24 text-xs font-semibold text-indigo-700">N1 - leger</div>
            <div className="flex-1 h-8 bg-indigo-100 rounded relative">
              <div className="h-full bg-indigo-200 rounded" style={{ width: "10%" }} />
            </div>
            <div className="w-16 text-xs text-slate-600">5-10 min</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-24 text-xs font-semibold text-indigo-700">N2 - leger</div>
            <div className="flex-1 h-8 bg-indigo-100 rounded relative">
              <div className="h-full bg-indigo-300 rounded" style={{ width: "50%" }} />
            </div>
            <div className="w-16 text-xs text-slate-600">~45 min</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-24 text-xs font-semibold text-purple-700">N3 - profond</div>
            <div className="flex-1 h-8 bg-purple-100 rounded relative">
              <div className="h-full bg-purple-400 rounded" style={{ width: "25%" }} />
            </div>
            <div className="w-16 text-xs text-slate-600">~20 min</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-24 text-xs font-semibold text-rose-700">REM</div>
            <div className="flex-1 h-8 bg-rose-100 rounded relative">
              <div className="h-full bg-rose-300 rounded" style={{ width: "20%" }} />
            </div>
            <div className="w-16 text-xs text-slate-600">~15 min</div>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-4">
          Source : INSERM, National Sleep Foundation. Chaque cycle alterne entre
          sommeil leger, sommeil profond et sommeil paradoxal (REM). Le sommeil
          profond domine en debut de nuit, le REM en fin de nuit.
        </p>
      </div>
    </div>
  );
}
