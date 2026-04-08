"use client";

import { useState } from "react";
import { calcConsommationEau } from "./consommationEauCalc";

function fmtL(n: number): string {
  return n.toFixed(2).replace(".", ",");
}

function fmtMl(n: number): string {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n);
}

const ACTIVITES = [
  { key: "sedentaire", label: "Sedentaire", description: "Bureau, peu de mouvement", icon: "🪑" },
  { key: "leger", label: "Leger", description: "Marche, activite douce", icon: "🚶" },
  { key: "modere", label: "Modere", description: "Sport 3-4x/semaine", icon: "🚴" },
  { key: "actif", label: "Actif", description: "Sport intense regulier", icon: "🏃" },
  { key: "intense", label: "Intense", description: "Athlete, travail physique", icon: "🏋️" },
];

const CLIMATS = [
  { key: "tempere", label: "Tempere", description: "Europe, saisons normales", icon: "⛅" },
  { key: "chaud", label: "Chaud", description: "Ete, region mediterraneenne", icon: "☀️" },
  { key: "tres_chaud", label: "Tres chaud", description: "Chaleur extreme, tropical", icon: "🔥" },
];

const REPARTITION_MOMENTS = [
  { key: "matin" as const, label: "Matin", pct: 30, color: "bg-blue-400" },
  { key: "midi" as const, label: "Midi", pct: 25, color: "bg-cyan-400" },
  { key: "apres_midi" as const, label: "Apres-midi", pct: 25, color: "bg-sky-400" },
  { key: "soir" as const, label: "Soir", pct: 20, color: "bg-indigo-400" },
];

export default function CalculateurConsommationEau() {
  const [poids, setPoids] = useState(70);
  const [activite, setActivite] = useState("modere");
  const [climat, setClimat] = useState("tempere");
  const [enceinte, setEnceinte] = useState(false);
  const [allaitement, setAllaitement] = useState(false);

  const res = calcConsommationEau(poids, activite, climat, enceinte, allaitement);

  const drops = Math.min(Math.ceil(res.verres / 2), 16);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire — 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">

        {/* Poids */}
        <div>
          <label htmlFor="poids" className="block text-sm font-medium text-slate-600 mb-2">
            Poids corporel
          </label>
          <div className="flex items-center gap-4">
            <input
              id="poids"
              type="range"
              min={30}
              max={150}
              value={poids}
              onChange={(e) => setPoids(Number(e.target.value))}
              className="flex-1 h-2 rounded-full accent-blue-500"
            />
            <div className="relative w-28">
              <input
                type="number"
                value={poids}
                onChange={(e) => setPoids(Math.max(30, Math.min(150, Number(e.target.value) || 70)))}
                className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-lg font-semibold pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min={30}
                max={150}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                kg
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {[50, 60, 70, 80, 90, 100].map((p) => (
              <button
                key={p}
                onClick={() => setPoids(p)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  poids === p
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {p} kg
              </button>
            ))}
          </div>
        </div>

        {/* Activite physique */}
        <div>
          <p className="block text-sm font-medium text-slate-600 mb-2">Niveau d&apos;activite physique</p>
          <div className="grid grid-cols-5 gap-2">
            {ACTIVITES.map((a) => (
              <button
                key={a.key}
                onClick={() => setActivite(a.key)}
                className={`flex flex-col items-center gap-1 py-3 px-1 rounded-xl border text-center transition-all ${
                  activite === a.key
                    ? "bg-blue-50 border-blue-300 text-blue-700 shadow-sm"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                <span className="text-xl">{a.icon}</span>
                <span className="text-xs font-semibold leading-tight">{a.label}</span>
                <span className="text-[10px] leading-tight hidden sm:block">{a.description}</span>
              </button>
            ))}
          </div>
          {activite === "sedentaire" && (
            <p className="text-xs text-slate-400 mt-1.5">+0 L bonus activite</p>
          )}
          {activite === "leger" && (
            <p className="text-xs text-blue-500 mt-1.5">+0,3 L bonus activite</p>
          )}
          {activite === "modere" && (
            <p className="text-xs text-blue-500 mt-1.5">+0,5 L bonus activite</p>
          )}
          {activite === "actif" && (
            <p className="text-xs text-blue-600 mt-1.5">+0,8 L bonus activite</p>
          )}
          {activite === "intense" && (
            <p className="text-xs text-blue-700 mt-1.5 font-semibold">+1,2 L bonus activite</p>
          )}
        </div>

        {/* Climat */}
        <div>
          <p className="block text-sm font-medium text-slate-600 mb-2">Climat / Temperature ambiante</p>
          <div className="grid grid-cols-3 gap-3">
            {CLIMATS.map((c) => (
              <button
                key={c.key}
                onClick={() => setClimat(c.key)}
                className={`flex flex-col items-center gap-1.5 py-4 px-2 rounded-xl border text-center transition-all ${
                  climat === c.key
                    ? "bg-cyan-50 border-cyan-300 text-cyan-700 shadow-sm"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                <span className="text-2xl">{c.icon}</span>
                <span className="text-sm font-semibold">{c.label}</span>
                <span className="text-xs text-slate-400">{c.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Situations particulieres */}
        <div>
          <p className="block text-sm font-medium text-slate-600 mb-3">Situations particulieres</p>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={enceinte}
                  onChange={(e) => setEnceinte(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  enceinte ? "bg-pink-500 border-pink-500" : "border-slate-300 group-hover:border-pink-300"
                }`}>
                  {enceinte && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-700">Grossesse</span>
                <span className="text-xs text-pink-500 ml-2">+0,3 L/jour</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={allaitement}
                  onChange={(e) => setAllaitement(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  allaitement ? "bg-purple-500 border-purple-500" : "border-slate-300 group-hover:border-purple-300"
                }`}>
                  {allaitement && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-700">Allaitement</span>
                <span className="text-xs text-purple-500 ml-2">+0,7 L/jour</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Resultats — 2 cols */}
      <div className="lg:col-span-2 space-y-4">

        {/* Carte principale */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80 mb-1">Besoin quotidien en eau</p>
          <p className="text-5xl font-extrabold tracking-tight">
            {fmtL(res.total)} L
          </p>
          <p className="text-lg font-medium mt-1 opacity-90">par jour</p>

          {/* Gouttes d'eau visuelles */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {Array.from({ length: drops }).map((_, i) => (
              <div
                key={i}
                className="w-6 h-7 bg-white/30 rounded-full rounded-tl-[50%] rounded-tr-[50%] rounded-bl-[50%] rounded-br-[30%] flex items-center justify-center"
                style={{ borderRadius: "50% 50% 50% 30% / 60% 60% 40% 40%" }}
              >
                <span className="text-xs">💧</span>
              </div>
            ))}
          </div>

          <div className="h-px bg-white/20 my-4" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Verres de 250 ml</p>
              <p className="text-3xl font-bold">{res.verres} verres</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-80">Base (poids)</p>
              <p className="text-xl font-semibold">{fmtL(res.base)} L</p>
            </div>
          </div>
        </div>

        {/* Detail des bonuses */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">Detail du calcul</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
              <span className="text-sm text-slate-600">Base (poids x 0,033)</span>
              <span className="text-sm font-bold text-slate-800">{fmtL(res.base)} L</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
              <span className="text-sm text-slate-600">Bonus activite</span>
              <span className={`text-sm font-bold ${res.activiteBonus > 0 ? "text-blue-600" : "text-slate-400"}`}>
                +{fmtL(res.activiteBonus)} L
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
              <span className="text-sm text-slate-600">Bonus climat</span>
              <span className={`text-sm font-bold ${res.climatBonus > 0 ? "text-cyan-600" : "text-slate-400"}`}>
                +{fmtL(res.climatBonus)} L
              </span>
            </div>
            {(enceinte || allaitement) && (
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-sm text-slate-600">
                  {enceinte && allaitement ? "Grossesse + allaitement" : enceinte ? "Grossesse" : "Allaitement"}
                </span>
                <span className="text-sm font-bold text-pink-600">
                  +{fmtL(res.grossesseBonus + res.allaitementBonus)} L
                </span>
              </div>
            )}
            <div className="flex justify-between items-center py-2 mt-1">
              <span className="text-sm font-bold text-slate-800">Total</span>
              <span className="text-base font-extrabold text-blue-600">{fmtL(res.total)} L</span>
            </div>
          </div>
        </div>

        {/* Repartition par moment */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-4">Repartition recommandee</p>
          <div className="space-y-3">
            {REPARTITION_MOMENTS.map((m) => {
              const ml = res.repartition[m.key];
              const pct = m.pct;
              return (
                <div key={m.key}>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span className="font-medium text-slate-600">{m.label}</span>
                    <span>{fmtMl(ml)} ml — {pct}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${m.color} rounded-full transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conseils d'hydratation */}
        <div className="bg-blue-50 rounded-2xl border border-blue-100 p-5">
          <p className="text-sm font-semibold text-blue-700 mb-3">Conseils d&apos;hydratation</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-xs text-blue-600">
              <span className="mt-0.5">💧</span>
              <span>Commencez la journee avec un grand verre d&apos;eau avant le cafe</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-blue-600">
              <span className="mt-0.5">⏰</span>
              <span>Buvez regulierement toutes les heures, sans attendre la soif</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-blue-600">
              <span className="mt-0.5">🥗</span>
              <span>Les fruits et legumes couvrent 20% de vos besoins en eau</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-blue-600">
              <span className="mt-0.5">🏃</span>
              <span>Pendant le sport : boire 150-200 ml toutes les 15-20 minutes</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-blue-600">
              <span className="mt-0.5">🌡️</span>
              <span>Par forte chaleur, augmentez votre consommation de 500 ml a 1 L</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
