"use client";

import { useState } from "react";

interface NiveauActivite {
  label: string;
  description: string;
  coefficient: number;
}

const NIVEAUX_ACTIVITE: NiveauActivite[] = [
  { label: "Sedentaire", description: "Peu ou pas d'exercice, travail de bureau", coefficient: 1.2 },
  { label: "Legerement actif", description: "Exercice leger 1-3 jours/semaine", coefficient: 1.375 },
  { label: "Moderement actif", description: "Exercice modere 3-5 jours/semaine", coefficient: 1.55 },
  { label: "Tres actif", description: "Exercice intense 6-7 jours/semaine", coefficient: 1.725 },
  { label: "Extremement actif", description: "Athlete, travail physique intense", coefficient: 1.9 },
];

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

export default function CalculateurCalories() {
  const [sexe, setSexe] = useState<"homme" | "femme">("homme");
  const [age, setAge] = useState("30");
  const [poids, setPoids] = useState("75");
  const [taille, setTaille] = useState("175");
  const [activite, setActivite] = useState(2);

  const ageNum = parseInt(age) || 0;
  const poidsNum = parseFloat(poids) || 0;
  const tailleNum = parseFloat(taille) || 0;

  // Formule Mifflin-St Jeor (la plus precise selon les etudes)
  const mb =
    sexe === "homme"
      ? 10 * poidsNum + 6.25 * tailleNum - 5 * ageNum + 5
      : 10 * poidsNum + 6.25 * tailleNum - 5 * ageNum - 161;

  const tdee = mb * NIVEAUX_ACTIVITE[activite].coefficient;

  // Objectifs
  const perteLente = tdee - 250;
  const perteRapide = tdee - 500;
  const priseLente = tdee + 250;
  const priseRapide = tdee + 500;

  // Repartition macros pour maintien
  const proteines = poidsNum * 1.8; // g
  const lipides = (tdee * 0.3) / 9; // g
  const glucides = (tdee - proteines * 4 - lipides * 9) / 4; // g

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

        {/* Age */}
        <div className="mb-6">
          <label htmlFor="age" className="block text-sm font-medium text-slate-600 mb-2">Age</label>
          <div className="relative">
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-14 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              min="15"
              max="100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">ans</span>
          </div>
          <div className="flex gap-2 mt-2">
            {[20, 25, 30, 40, 50].map((a) => (
              <button
                key={a}
                onClick={() => setAge(a.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  age === a.toString()
                    ? "bg-green-50 border-green-300 text-green-700"
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
          <label htmlFor="poids" className="block text-sm font-medium text-slate-600 mb-2">Poids</label>
          <div className="relative">
            <input
              id="poids"
              type="number"
              value={poids}
              onChange={(e) => setPoids(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              min="30"
              max="250"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">kg</span>
          </div>
          <div className="flex gap-2 mt-2">
            {[55, 65, 75, 85, 95].map((p) => (
              <button
                key={p}
                onClick={() => setPoids(p.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  poids === p.toString()
                    ? "bg-green-50 border-green-300 text-green-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {p} kg
              </button>
            ))}
          </div>
        </div>

        {/* Taille */}
        <div className="mb-6">
          <label htmlFor="taille" className="block text-sm font-medium text-slate-600 mb-2">Taille</label>
          <div className="relative">
            <input
              id="taille"
              type="number"
              value={taille}
              onChange={(e) => setTaille(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              min="100"
              max="230"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">cm</span>
          </div>
          <div className="flex gap-2 mt-2">
            {[155, 165, 175, 185].map((t) => (
              <button
                key={t}
                onClick={() => setTaille(t.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  taille === t.toString()
                    ? "bg-green-50 border-green-300 text-green-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {t} cm
              </button>
            ))}
          </div>
        </div>

        {/* Niveau d'activite */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Niveau d&apos;activite</label>
          <div className="space-y-2">
            {NIVEAUX_ACTIVITE.map((n, i) => (
              <button
                key={i}
                onClick={() => setActivite(i)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                  activite === i
                    ? "bg-green-50 border-green-300 shadow-sm"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <p className={`font-semibold text-sm ${activite === i ? "text-green-700" : "text-slate-700"}`}>
                  {n.label}
                </p>
                <p className={`text-xs mt-0.5 ${activite === i ? "text-green-600" : "text-slate-400"}`}>
                  {n.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {/* TDEE principal */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80 mb-1">Besoin calorique journalier (TDEE)</p>
          <p className="text-5xl font-extrabold tracking-tight">{fmt(tdee)}</p>
          <p className="text-lg font-medium mt-1">kcal / jour</p>
          <div className="h-px bg-white/20 my-4" />
          <p className="text-sm opacity-80 mb-1">Metabolisme de base</p>
          <p className="text-2xl font-bold">{fmt(mb)} kcal</p>
          <p className="text-xs opacity-70 mt-1">
            Formule Mifflin-St Jeor x {NIVEAUX_ACTIVITE[activite].coefficient}
          </p>
        </div>

        {/* Objectifs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">Objectifs caloriques</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-red-600">Perte rapide</p>
                <p className="text-xs text-slate-400">-500 kcal/j (~0,5 kg/sem)</p>
              </div>
              <p className="text-lg font-extrabold text-red-600">{fmt(perteRapide)}</p>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-orange-600">Perte lente</p>
                <p className="text-xs text-slate-400">-250 kcal/j (~0,25 kg/sem)</p>
              </div>
              <p className="text-lg font-extrabold text-orange-600">{fmt(perteLente)}</p>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center bg-green-50/50 -mx-2 px-2 py-1 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-green-700">Maintien</p>
                <p className="text-xs text-green-600">Equilibre calorique</p>
              </div>
              <p className="text-lg font-extrabold text-green-700">{fmt(tdee)}</p>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-blue-600">Prise lente</p>
                <p className="text-xs text-slate-400">+250 kcal/j (~0,25 kg/sem)</p>
              </div>
              <p className="text-lg font-extrabold text-blue-600">{fmt(priseLente)}</p>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-purple-600">Prise rapide</p>
                <p className="text-xs text-slate-400">+500 kcal/j (~0,5 kg/sem)</p>
              </div>
              <p className="text-lg font-extrabold text-purple-600">{fmt(priseRapide)}</p>
            </div>
          </div>
        </div>

        {/* Repartition macros */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">Repartition macronutriments (maintien)</p>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-blue-700">Proteines (1,8g/kg)</span>
                <span className="font-bold text-blue-700">{Math.round(proteines)}g</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${Math.min(((proteines * 4) / tdee) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{Math.round((proteines * 4 / tdee) * 100)}% des calories</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-amber-700">Lipides (30%)</span>
                <span className="font-bold text-amber-700">{Math.round(lipides)}g</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: "30%" }} />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">30% des calories</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-green-700">Glucides (reste)</span>
                <span className="font-bold text-green-700">{Math.round(glucides)}g</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${Math.min(((glucides * 4) / tdee) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{Math.round((glucides * 4 / tdee) * 100)}% des calories</p>
            </div>
          </div>
        </div>

        {/* Lien IMC */}
        <a
          href="/calcul-imc"
          className="block bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center text-lg">
              ⚖️
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">Calculez aussi votre IMC</p>
              <p className="text-xs text-slate-400">Indice de Masse Corporelle selon l&apos;OMS</p>
            </div>
          </div>
        </a>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Ce calculateur utilise la formule Mifflin-St Jeor, consideree comme la
          plus precise. Les resultats sont des estimations. Consultez un
          nutritionniste pour un suivi personnalise.
        </div>
      </div>
    </div>
  );
}
