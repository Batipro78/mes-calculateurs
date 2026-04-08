"use client";

import { useState } from "react";
import { calcMetabolisme } from "./metabolismeCalc";

function fmt(n: number): string {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n);
}

const TDEE_ROWS = [
  { key: "sedentaire" as const, label: "Sedentaire", description: "Peu ou pas d'exercice", coeff: "x 1,2" },
  { key: "leger" as const, label: "Legerement actif", description: "1-3 jours/semaine", coeff: "x 1,375" },
  { key: "modere" as const, label: "Moderement actif", description: "3-5 jours/semaine", coeff: "x 1,55" },
  { key: "actif" as const, label: "Tres actif", description: "6-7 jours/semaine", coeff: "x 1,725" },
  { key: "intense" as const, label: "Extremement actif", description: "Athlete, travail physique", coeff: "x 1,9" },
];

export default function CalculateurMetabolisme() {
  const [poids, setPoids] = useState("70");
  const [taille, setTaille] = useState("175");
  const [age, setAge] = useState("30");
  const [sexe, setSexe] = useState<"homme" | "femme">("homme");

  const poidsNum = parseFloat(poids) || 0;
  const tailleNum = parseFloat(taille) || 0;
  const ageNum = parseInt(age) || 0;

  const res =
    poidsNum > 0 && tailleNum > 0 && ageNum > 0
      ? calcMetabolisme(poidsNum, tailleNum, ageNum, sexe)
      : null;

  // Jauge visuelle : BMR range 1000–3000
  const bmr = res?.mifflin ?? 0;
  const jaugeMin = 1000;
  const jaugeMax = 3000;
  const jaugePct = res
    ? Math.min(Math.max(((bmr - jaugeMin) / (jaugeMax - jaugeMin)) * 100, 0), 100)
    : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire — 3 cols */}
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
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-14 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              min="15"
              max="100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              ans
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {[20, 25, 30, 35, 40, 50].map((a) => (
              <button
                key={a}
                onClick={() => setAge(a.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  age === a.toString()
                    ? "bg-orange-50 border-orange-300 text-orange-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {a} ans
              </button>
            ))}
          </div>
        </div>

        {/* Poids */}
        <div className="mb-6">
          <label htmlFor="poids" className="block text-sm font-medium text-slate-600 mb-2">
            Poids
          </label>
          <div className="relative">
            <input
              id="poids"
              type="number"
              value={poids}
              onChange={(e) => setPoids(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              min="30"
              max="250"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              kg
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {[55, 65, 70, 80, 90].map((p) => (
              <button
                key={p}
                onClick={() => setPoids(p.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  poids === p.toString()
                    ? "bg-orange-50 border-orange-300 text-orange-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {p} kg
              </button>
            ))}
          </div>
        </div>

        {/* Taille */}
        <div className="mb-8">
          <label htmlFor="taille" className="block text-sm font-medium text-slate-600 mb-2">
            Taille
          </label>
          <div className="relative">
            <input
              id="taille"
              type="number"
              value={taille}
              onChange={(e) => setTaille(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              min="100"
              max="230"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              cm
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {[155, 165, 175, 185].map((t) => (
              <button
                key={t}
                onClick={() => setTaille(t.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  taille === t.toString()
                    ? "bg-orange-50 border-orange-300 text-orange-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {t} cm
              </button>
            ))}
          </div>
        </div>

        {/* Jauge visuelle BMR */}
        <div>
          <p className="text-sm font-medium text-slate-600 mb-3">
            Position de votre BMR (1 000 – 3 000 kcal)
          </p>
          <div className="relative">
            <div className="flex h-4 rounded-full overflow-hidden">
              <div className="bg-blue-400 flex-1" />
              <div className="bg-green-400 flex-[2]" />
              <div className="bg-amber-400 flex-[2]" />
              <div className="bg-orange-400 flex-[2]" />
              <div className="bg-red-400 flex-1" />
            </div>
            {res && (
              <div
                className="absolute top-0 -mt-1 transition-all duration-500"
                style={{ left: `${jaugePct}%` }}
              >
                <div className="w-0.5 h-6 bg-slate-800 mx-auto" />
                <div className="text-xs font-bold text-slate-800 -ml-5 mt-0.5">
                  {fmt(bmr)} kcal
                </div>
              </div>
            )}
            <div className="flex justify-between text-xs text-slate-400 mt-5">
              <span>1 000</span>
              <span>1 500</span>
              <span>2 000</span>
              <span>2 500</span>
              <span>3 000+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resultats — 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {/* Carte BMR principale */}
        <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80 mb-1">
            Metabolisme de base (Mifflin-St Jeor)
          </p>
          <p className="text-5xl font-extrabold tracking-tight">
            {res ? fmt(res.mifflin) : "—"}
          </p>
          <p className="text-lg font-medium mt-1">kcal / jour</p>
          <div className="h-px bg-white/20 my-4" />
          <p className="text-sm opacity-80 mb-1">Harris-Benedict</p>
          <p className="text-2xl font-bold">
            {res ? fmt(res.harris) : "—"} kcal
          </p>
          <p className="text-xs opacity-70 mt-1">
            {res
              ? `Ecart : ${fmt(Math.abs(res.mifflin - res.harris))} kcal`
              : "Formule de reference 1984"}
          </p>
        </div>

        {/* Tableau TDEE */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Depense energetique totale (TDEE)
          </p>
          <div className="space-y-2">
            {TDEE_ROWS.map((row) => (
              <div
                key={row.key}
                className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-700">{row.label}</p>
                  <p className="text-xs text-slate-400">{row.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-extrabold text-orange-600">
                    {res ? fmt(res.tdee[row.key]) : "—"}
                  </p>
                  <p className="text-xs text-slate-400">{row.coeff}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Liens rapides */}
        <a
          href="/calcul-calories"
          className="block bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-lg">
              🔥
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                Calculer vos besoins caloriques
              </p>
              <p className="text-xs text-slate-400">TDEE + objectifs + macros</p>
            </div>
          </div>
        </a>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Le metabolisme de base est une estimation. Il varie selon la composition
          corporelle, la genetique et l&apos;etat de sante. Consultez un medecin
          ou nutritionniste pour un bilan personnalise.
        </div>
      </div>
    </div>
  );
}
