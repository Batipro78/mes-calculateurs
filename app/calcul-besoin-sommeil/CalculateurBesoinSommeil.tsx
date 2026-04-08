"use client";

import { useState } from "react";
import { calcBesoinSommeil } from "./besoinSommeilCalc";

const ACTIVITES = [
  { value: "sedentaire", label: "Sedentaire", desc: "Bureautique, peu de mouvements", emoji: "🪑" },
  { value: "leger", label: "Leger", desc: "Quelques promenades par semaine", emoji: "🚶" },
  { value: "modere", label: "Modere", desc: "Sport 3-4x/semaine", emoji: "🏃" },
  { value: "actif", label: "Actif", desc: "Sport quotidien ou travail physique", emoji: "🏋️" },
  { value: "intense", label: "Intense", desc: "Athlete, entrainements intensifs", emoji: "🏅" },
];

const QUALITES = [
  { value: "mauvaise", label: "Mauvaise", desc: "Reveils frequents, fatigue au lever", color: "red" },
  { value: "moyenne", label: "Moyenne", desc: "Parfois difficile a dormir", color: "amber" },
  { value: "bonne", label: "Bonne", desc: "Sommeil globalement satisfaisant", color: "green" },
  { value: "excellente", label: "Excellente", desc: "Sommeil profond et recuperateur", color: "indigo" },
];

const WAKE_TIMES = [
  { label: "6h00", value: "06:00" },
  { label: "6h30", value: "06:30" },
  { label: "7h00", value: "07:00" },
  { label: "7h30", value: "07:30" },
  { label: "8h00", value: "08:00" },
];

const BED_TIMES = [
  { label: "21h00", value: "21:00" },
  { label: "21h30", value: "21:30" },
  { label: "22h00", value: "22:00" },
  { label: "22h30", value: "22:30" },
  { label: "23h00", value: "23:00" },
  { label: "23h30", value: "23:30" },
];

export default function CalculateurBesoinSommeil() {
  const [age, setAge] = useState("30");
  const [activite, setActivite] = useState("modere");
  const [qualite, setQualite] = useState("bonne");
  const [selectedWake, setSelectedWake] = useState("07:00");
  const [selectedBed, setSelectedBed] = useState("23:00");

  const ageNum = parseInt(age) || 0;
  const res = ageNum > 0 ? calcBesoinSommeil(ageNum, activite, qualite) : null;

  // Index du reveil selectionne pour afficher la bonne heure de coucher
  const wakeIndex = WAKE_TIMES.findIndex((w) => w.value === selectedWake);
  const bedIndex = BED_TIMES.findIndex((b) => b.value === selectedBed);

  const suggestedBedtime = res && wakeIndex >= 0 ? res.heureCoucher[wakeIndex] : null;
  const suggestedWaketime = res && bedIndex >= 0 ? res.heureReveil[bedIndex] : null;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire — 3 cols */}
      <div className="lg:col-span-3 space-y-6">
        {/* Carte age */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <label htmlFor="age" className="block text-sm font-medium text-slate-600 mb-2">
            Votre age
          </label>
          <div className="relative">
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-14 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              min="1"
              max="100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              ans
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {[10, 18, 25, 30, 40, 50, 65].map((a) => (
              <button
                key={a}
                onClick={() => setAge(a.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  age === a.toString()
                    ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {a} ans
              </button>
            ))}
          </div>
        </div>

        {/* Activite physique */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-600 mb-3">Niveau d&apos;activite physique</p>
          <div className="space-y-2">
            {ACTIVITES.map((act) => (
              <button
                key={act.value}
                onClick={() => setActivite(act.value)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  activite === act.value
                    ? "bg-indigo-50 border-indigo-300 shadow-sm"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <span className="text-xl">{act.emoji}</span>
                <div>
                  <p className={`text-sm font-semibold ${activite === act.value ? "text-indigo-700" : "text-slate-700"}`}>
                    {act.label}
                  </p>
                  <p className="text-xs text-slate-400">{act.desc}</p>
                </div>
                {activite === act.value && (
                  <div className="ml-auto w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Qualite du sommeil */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-600 mb-3">Qualite actuelle de votre sommeil</p>
          <div className="grid grid-cols-2 gap-3">
            {QUALITES.map((q) => (
              <button
                key={q.value}
                onClick={() => setQualite(q.value)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  qualite === q.value
                    ? q.color === "red"
                      ? "bg-red-50 border-red-300"
                      : q.color === "amber"
                      ? "bg-amber-50 border-amber-300"
                      : q.color === "green"
                      ? "bg-green-50 border-green-300"
                      : "bg-indigo-50 border-indigo-300"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <p className={`text-sm font-semibold ${
                  qualite === q.value
                    ? q.color === "red"
                      ? "text-red-700"
                      : q.color === "amber"
                      ? "text-amber-700"
                      : q.color === "green"
                      ? "text-green-700"
                      : "text-indigo-700"
                    : "text-slate-700"
                }`}>
                  {q.label}
                </p>
                <p className="text-xs text-slate-400 mt-0.5 leading-tight">{q.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resultats — 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {/* Carte principale gradient */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🌙</span>
            <p className="text-sm text-white/80 font-medium">Besoin de sommeil recommande</p>
          </div>
          <p className="text-5xl font-extrabold tracking-tight">
            {res ? `${res.heuresRecommandees.min}–${res.heuresRecommandees.max}h` : "—"}
          </p>
          <p className="text-lg font-medium mt-1 text-white/80">par nuit</p>
          <div className="h-px bg-white/20 my-4" />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white/60">Ideal pour vous</p>
              <p className="text-2xl font-bold">{res ? `${res.heuresAjustees}h` : "—"}</p>
              {res && res.ajustement !== 0 && (
                <p className="text-xs text-white/60 mt-0.5">
                  {res.ajustement > 0 ? `+${res.ajustement}h` : `${res.ajustement}h`} ajustement
                </p>
              )}
            </div>
            <div>
              <p className="text-white/60">Cycles de sommeil</p>
              <p className="text-2xl font-bold">{res ? res.cycles : "—"}</p>
              <p className="text-xs text-white/60 mt-0.5">cycles de 90 min</p>
            </div>
          </div>
        </div>

        {/* Score qualite */}
        {res && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-xs font-medium text-slate-400 mb-3">Score qualite sommeil</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    res.scoreQualite >= 80
                      ? "bg-gradient-to-r from-green-400 to-emerald-500"
                      : res.scoreQualite >= 60
                      ? "bg-gradient-to-r from-indigo-400 to-purple-500"
                      : res.scoreQualite >= 40
                      ? "bg-gradient-to-r from-amber-400 to-orange-500"
                      : "bg-gradient-to-r from-red-400 to-rose-500"
                  }`}
                  style={{ width: `${res.scoreQualite}%` }}
                />
              </div>
              <span className="text-lg font-extrabold text-slate-800">{res.scoreQualite}%</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {res.scoreQualite >= 80
                ? "Excellent — continuez ainsi !"
                : res.scoreQualite >= 60
                ? "Bien — quelques ameliorations possibles"
                : res.scoreQualite >= 40
                ? "Moyen — pensez a ameliorer vos habitudes"
                : "A ameliorer — consultez un specialiste si besoin"}
            </p>
          </div>
        )}

        {/* Calculateur heure de coucher */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">☀️</span>
            <p className="text-sm font-semibold text-slate-700">Je me reveille a...</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {WAKE_TIMES.map((w) => (
              <button
                key={w.value}
                onClick={() => setSelectedWake(w.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  selectedWake === w.value
                    ? "bg-amber-50 border-amber-300 text-amber-700"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
          {res && suggestedBedtime && (
            <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-100">
              <p className="text-xs text-indigo-500 mb-0.5">Se coucher a</p>
              <p className="text-2xl font-extrabold text-indigo-700">{suggestedBedtime}</p>
              <p className="text-xs text-indigo-400 mt-0.5">
                pour {res.heuresAjustees}h de sommeil ({res.cycles} cycles)
              </p>
            </div>
          )}
        </div>

        {/* Calculateur heure de reveil */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">🌙</span>
            <p className="text-sm font-semibold text-slate-700">Je me couche a...</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {BED_TIMES.map((b) => (
              <button
                key={b.value}
                onClick={() => setSelectedBed(b.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  selectedBed === b.value
                    ? "bg-purple-50 border-purple-300 text-purple-700"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
          {res && suggestedWaketime && (
            <div className="bg-purple-50 rounded-xl p-3 border border-purple-100">
              <p className="text-xs text-purple-500 mb-0.5">Se reveiller a</p>
              <p className="text-2xl font-extrabold text-purple-700">{suggestedWaketime}</p>
              <p className="text-xs text-purple-400 mt-0.5">
                apres {res.heuresAjustees}h de sommeil ({res.cycles} cycles)
              </p>
            </div>
          )}
        </div>

        {/* Diagramme cycle lune/soleil */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-4">Cycle nuit typique</p>
          <div className="relative flex items-center justify-between px-2">
            {/* Barre de nuit */}
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-2 bg-gradient-to-r from-indigo-900 via-purple-700 to-amber-400 rounded-full" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 bg-indigo-900 rounded-full flex items-center justify-center text-sm shadow-md">🌙</div>
              <span className="text-xs text-slate-500 mt-1 font-medium">Coucher</span>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-6 h-6 bg-purple-800 rounded-full flex items-center justify-center text-xs shadow">N1</div>
              <span className="text-xs text-slate-400 mt-1">Leger</span>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs shadow">N2</div>
              <span className="text-xs text-slate-400 mt-1">Profond</span>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center text-xs shadow">REM</div>
              <span className="text-xs text-slate-400 mt-1">Paradox.</span>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-sm shadow-md">☀️</div>
              <span className="text-xs text-slate-500 mt-1 font-medium">Reveil</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-4 leading-relaxed text-center">
            Un cycle = ~90 min. {res ? `${res.cycles} cycles recommandes pour vous.` : ""}
          </p>
        </div>

        {/* Info phases */}
        <div className="space-y-2">
          <div className="flex gap-3 bg-purple-50 rounded-xl p-3 border border-purple-100">
            <span className="text-lg">💜</span>
            <div>
              <p className="text-xs font-semibold text-purple-700">Sommeil leger (N1-N2)</p>
              <p className="text-xs text-purple-500">Transition eveil-sommeil, temperature baisse, relaxation musculaire</p>
            </div>
          </div>
          <div className="flex gap-3 bg-indigo-50 rounded-xl p-3 border border-indigo-100">
            <span className="text-lg">💙</span>
            <div>
              <p className="text-xs font-semibold text-indigo-700">Sommeil profond (N3)</p>
              <p className="text-xs text-indigo-500">Reparation tissu, systeme immunitaire, memoire declarative</p>
            </div>
          </div>
          <div className="flex gap-3 bg-violet-50 rounded-xl p-3 border border-violet-100">
            <span className="text-lg">🌀</span>
            <div>
              <p className="text-xs font-semibold text-violet-700">Sommeil paradoxal (REM)</p>
              <p className="text-xs text-violet-500">Consolidation memoire, creativity, regulation emotionnelle, reves</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Ces recommandations sont basees sur les guidelines de la National Sleep Foundation. Consultez un specialiste si vous souffrez de troubles du sommeil persistants.
        </div>
      </div>
    </div>
  );
}
