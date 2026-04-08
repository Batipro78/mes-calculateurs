"use client";

import { useState } from "react";
import { calcPoidsIdeal } from "./poidsIdealCalc";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export default function CalculateurPoidsIdeal() {
  const [taille, setTaille] = useState("170");
  const [age, setAge] = useState("30");
  const [sexe, setSexe] = useState<"homme" | "femme">("homme");
  const [morphologie, setMorphologie] = useState<"mince" | "normal" | "large">("normal");

  const tailleNum = parseInt(taille) || 170;
  const ageNum = parseInt(age) || 30;

  const result = calcPoidsIdeal(tailleNum, ageNum, sexe, morphologie);

  // Position jauge : fourchette min ~ 40kg max ~ 100kg, mapped 0-100%
  const jaugeMin = 40;
  const jaugeMax = 100;
  const idealPos = Math.min(Math.max(((result.imcIdeal - jaugeMin) / (jaugeMax - jaugeMin)) * 100, 0), 100);
  const fourchetteMinPos = Math.min(Math.max(((result.fourchette.min - jaugeMin) / (jaugeMax - jaugeMin)) * 100, 0), 100);
  const fourchetteMaxPos = Math.min(Math.max(((result.fourchette.max - jaugeMin) / (jaugeMax - jaugeMin)) * 100, 0), 100);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Sexe */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">Sexe</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSexe("homme")}
              className={`py-3 rounded-xl font-semibold text-sm border transition-all ${
                sexe === "homme"
                  ? "bg-blue-50 border-blue-300 text-blue-700 shadow-sm"
                  : "border-slate-200 text-slate-400 hover:border-slate-300"
              }`}
            >
              Homme
            </button>
            <button
              onClick={() => setSexe("femme")}
              className={`py-3 rounded-xl font-semibold text-sm border transition-all ${
                sexe === "femme"
                  ? "bg-pink-50 border-pink-300 text-pink-700 shadow-sm"
                  : "border-slate-200 text-slate-400 hover:border-slate-300"
              }`}
            >
              Femme
            </button>
          </div>
        </div>

        {/* Taille */}
        <div className="mb-6">
          <label htmlFor="taille" className="block text-sm font-medium text-slate-600 mb-2">
            Taille
          </label>
          <div className="relative">
            <input
              id="taille"
              type="number"
              value={taille}
              onChange={(e) => setTaille(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              min="140"
              max="220"
              step="1"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">cm</span>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {[155, 160, 165, 170, 175, 180, 185].map((t) => (
              <button
                key={t}
                onClick={() => setTaille(t.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  taille === t.toString()
                    ? "bg-violet-50 border-violet-300 text-violet-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {t} cm
              </button>
            ))}
          </div>
        </div>

        {/* Age */}
        <div className="mb-6">
          <label htmlFor="age" className="block text-sm font-medium text-slate-600 mb-2">
            Age
          </label>
          <div className="relative">
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-14 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              min="15"
              max="100"
              step="1"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">ans</span>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {[20, 25, 30, 35, 40, 45, 50].map((a) => (
              <button
                key={a}
                onClick={() => setAge(a.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  age === a.toString()
                    ? "bg-violet-50 border-violet-300 text-violet-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {a} ans
              </button>
            ))}
          </div>
        </div>

        {/* Morphologie */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-slate-600 mb-2">Morphologie</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setMorphologie("mince")}
              className={`py-3 px-2 rounded-xl text-sm border transition-all ${
                morphologie === "mince"
                  ? "bg-sky-50 border-sky-300 text-sky-700 shadow-sm"
                  : "border-slate-200 text-slate-400 hover:border-slate-300"
              }`}
            >
              <p className="font-semibold">Mince</p>
              <p className="text-xs mt-0.5 opacity-70">Ossature fine</p>
            </button>
            <button
              onClick={() => setMorphologie("normal")}
              className={`py-3 px-2 rounded-xl text-sm border transition-all ${
                morphologie === "normal"
                  ? "bg-violet-50 border-violet-300 text-violet-700 shadow-sm"
                  : "border-slate-200 text-slate-400 hover:border-slate-300"
              }`}
            >
              <p className="font-semibold">Normal</p>
              <p className="text-xs mt-0.5 opacity-70">Ossature moyenne</p>
            </button>
            <button
              onClick={() => setMorphologie("large")}
              className={`py-3 px-2 rounded-xl text-sm border transition-all ${
                morphologie === "large"
                  ? "bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm"
                  : "border-slate-200 text-slate-400 hover:border-slate-300"
              }`}
            >
              <p className="font-semibold">Large</p>
              <p className="text-xs mt-0.5 opacity-70">Ossature forte</p>
            </button>
          </div>
        </div>

        {/* Jauge visuelle */}
        <div className="mt-8">
          <p className="text-sm font-medium text-slate-600 mb-3">Poids ideal dans la fourchette saine</p>
          <div className="relative h-8">
            {/* Barre de fond */}
            <div className="absolute top-2 left-0 right-0 h-4 bg-slate-100 rounded-full overflow-hidden">
              {/* Zone fourchette verte */}
              <div
                className="absolute top-0 h-full bg-emerald-200 rounded-full"
                style={{
                  left: `${fourchetteMinPos}%`,
                  width: `${fourchetteMaxPos - fourchetteMinPos}%`,
                }}
              />
            </div>
            {/* Marqueur poids ideal */}
            <div
              className="absolute top-0 transition-all duration-500"
              style={{ left: `${idealPos}%` }}
            >
              <div className="w-0.5 h-8 bg-violet-600 mx-auto" />
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>{jaugeMin} kg</span>
            <span className="text-emerald-600 font-medium">
              {fmt(result.fourchette.min)} – {fmt(result.fourchette.max)} kg (fourchette saine)
            </span>
            <span>{jaugeMax} kg</span>
          </div>
        </div>
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {/* Resultat principal */}
        <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80 mb-1">Poids ideal moyen</p>
          <p className="text-5xl font-extrabold tracking-tight">{fmt(result.moyenne)}</p>
          <p className="text-lg font-medium mt-1">kg</p>
          <div className="h-px bg-white/20 my-4" />
          <p className="text-sm opacity-80 mb-1">Fourchette saine (IMC 18,5 – 24,9)</p>
          <p className="text-xl font-bold">
            {fmt(result.fourchette.min)} – {fmt(result.fourchette.max)} kg
          </p>
        </div>

        {/* 3 formules */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">Comparaison des formules</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 border border-blue-100">
              <div>
                <p className="text-sm font-semibold text-blue-700">Formule de Lorentz</p>
                <p className="text-xs text-blue-500 mt-0.5">
                  {sexe === "homme"
                    ? "Taille−100−(Taille−150)/4"
                    : "Taille−100−(Taille−150)/2,5"}
                </p>
              </div>
              <p className="text-xl font-extrabold text-blue-700">{fmt(result.lorentz)} <span className="text-xs font-medium">kg</span></p>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <div>
                <p className="text-sm font-semibold text-emerald-700">Formule de Devine</p>
                <p className="text-xs text-emerald-500 mt-0.5">
                  {sexe === "homme"
                    ? "50+2,3×(Taille/2,54−60)"
                    : "45,5+2,3×(Taille/2,54−60)"}
                </p>
              </div>
              <p className="text-xl font-extrabold text-emerald-700">{fmt(result.devine)} <span className="text-xs font-medium">kg</span></p>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-100">
              <div>
                <p className="text-sm font-semibold text-amber-700">Formule de Creff</p>
                <p className="text-xs text-amber-500 mt-0.5">
                  (Taille−100+Age/10)×0,9×{morphologie === "mince" ? "0,9" : morphologie === "large" ? "1,1" : "1"}
                </p>
              </div>
              <p className="text-xl font-extrabold text-amber-700">{fmt(result.creff)} <span className="text-xs font-medium">kg</span></p>
            </div>
          </div>
        </div>

        {/* IMC ideal */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-2">Poids pour IMC 22 (ideal)</p>
          <p className="text-2xl font-extrabold text-slate-800">
            {fmt(result.imcIdeal)} <span className="text-sm font-semibold text-slate-400">kg</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Pour une taille de {tailleNum} cm
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Ces formules sont des estimations statistiques. Le poids ideal varie selon la
          composition corporelle et la morphologie. Consultez un medecin pour un bilan
          personnalise.
        </div>
      </div>
    </div>
  );
}
