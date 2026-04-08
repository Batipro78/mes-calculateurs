"use client";

import { useState } from "react";
import { calcMacros, type Objectif } from "./macrosCalc";

const OBJECTIFS: { key: Objectif; label: string; emoji: string; desc: string; color: string; bg: string }[] = [
  { key: "maintien", label: "Maintien", emoji: "⚖️", desc: "Stabiliser son poids", color: "text-slate-700", bg: "bg-slate-50 border-slate-300" },
  { key: "perte", label: "Perte de poids", emoji: "📉", desc: "-400 kcal / objectif minceur", color: "text-orange-700", bg: "bg-orange-50 border-orange-300" },
  { key: "prise", label: "Prise de masse", emoji: "💪", desc: "+300 kcal / objectif volume", color: "text-blue-700", bg: "bg-blue-50 border-blue-300" },
  { key: "seche", label: "Seche", emoji: "🔥", desc: "Conserver le muscle, bruler le gras", color: "text-rose-700", bg: "bg-rose-50 border-rose-300" },
  { key: "cetogene", label: "Cetogene", emoji: "🥑", desc: "Tres peu de glucides (keto)", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-300" },
];

const ACTIVITES = [
  { slug: "sedentaire", label: "Sedentaire", description: "Peu ou pas d'exercice", coefficient: 1.2 },
  { slug: "leger", label: "Legerement actif", description: "1-3 jours/semaine", coefficient: 1.375 },
  { slug: "modere", label: "Moderement actif", description: "3-5 jours/semaine", coefficient: 1.55 },
  { slug: "actif", label: "Tres actif", description: "6-7 jours/semaine", coefficient: 1.725 },
  { slug: "intense", label: "Extremement actif", description: "Athlete / travail physique", coefficient: 1.9 },
];

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

export default function CalculateurMacros() {
  const [objectif, setObjectif] = useState<Objectif>("maintien");
  const [sexe, setSexe] = useState<"homme" | "femme">("homme");
  const [poids, setPoids] = useState("75");
  const [taille, setTaille] = useState("175");
  const [age, setAge] = useState("30");
  const [activite, setActivite] = useState(2);
  const [mode, setMode] = useState<"calcul" | "direct">("calcul");
  const [caloriesDirect, setCaloriesDirect] = useState("2000");

  const poidsNum = parseFloat(poids) || 0;
  const tailleNum = parseFloat(taille) || 0;
  const ageNum = parseInt(age) || 0;

  const mb =
    sexe === "homme"
      ? 10 * poidsNum + 6.25 * tailleNum - 5 * ageNum + 5
      : 10 * poidsNum + 6.25 * tailleNum - 5 * ageNum - 161;

  const tdee = Math.round(mb * ACTIVITES[activite].coefficient);
  const caloriesBase = mode === "calcul" ? tdee : parseInt(caloriesDirect) || 2000;

  const macros = calcMacros(caloriesBase, objectif);

  // Pie chart degrees
  const pDeg = (macros.proteines.pourcentage / 100) * 360;
  const gDeg = (macros.glucides.pourcentage / 100) * 360;
  const pEnd = pDeg;
  const gEnd = pDeg + gDeg;
  const conicGradient = `conic-gradient(#3b82f6 0deg ${pEnd}deg, #22c55e ${pEnd}deg ${gEnd}deg, #f97316 ${gEnd}deg 360deg)`;

  // Repas (3 repas)
  const repasProteines = macros.proteines.grammes / 3;
  const repasGlucides = macros.glucides.grammes / 3;
  const repasLipides = macros.lipides.grammes / 3;
  const repasKcal = macros.caloriesAjustees / 3;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">

        {/* Mode saisie */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Comment entrer vos calories ?</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMode("calcul")}
              className={`py-3 px-4 rounded-xl font-semibold text-sm border transition-all ${
                mode === "calcul"
                  ? "bg-violet-50 border-violet-300 text-violet-700 shadow-sm"
                  : "border-slate-200 text-slate-400 hover:border-slate-300"
              }`}
            >
              Calculer depuis mon profil
            </button>
            <button
              onClick={() => setMode("direct")}
              className={`py-3 px-4 rounded-xl font-semibold text-sm border transition-all ${
                mode === "direct"
                  ? "bg-violet-50 border-violet-300 text-violet-700 shadow-sm"
                  : "border-slate-200 text-slate-400 hover:border-slate-300"
              }`}
            >
              Saisir directement
            </button>
          </div>
        </div>

        {mode === "direct" ? (
          <div>
            <label htmlFor="calories-direct" className="block text-sm font-medium text-slate-600 mb-2">
              Calories journalieres
            </label>
            <div className="relative">
              <input
                id="calories-direct"
                type="number"
                value={caloriesDirect}
                onChange={(e) => setCaloriesDirect(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-16 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                min="800"
                max="6000"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">kcal</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {[1400, 1600, 1800, 2000, 2200, 2500, 2800, 3000].map((c) => (
                <button
                  key={c}
                  onClick={() => setCaloriesDirect(c.toString())}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                    caloriesDirect === c.toString()
                      ? "bg-violet-50 border-violet-300 text-violet-700"
                      : "border-slate-200 text-slate-400 hover:border-slate-300"
                  }`}
                >
                  {c} kcal
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Sexe */}
            <div>
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
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-slate-600 mb-2">Age</label>
              <div className="relative">
                <input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-14 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
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
                        ? "bg-violet-50 border-violet-300 text-violet-700"
                        : "border-slate-200 text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    {a} ans
                  </button>
                ))}
              </div>
            </div>

            {/* Poids */}
            <div>
              <label htmlFor="poids" className="block text-sm font-medium text-slate-600 mb-2">Poids</label>
              <div className="relative">
                <input
                  id="poids"
                  type="number"
                  value={poids}
                  onChange={(e) => setPoids(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
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
                        ? "bg-violet-50 border-violet-300 text-violet-700"
                        : "border-slate-200 text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    {p} kg
                  </button>
                ))}
              </div>
            </div>

            {/* Taille */}
            <div>
              <label htmlFor="taille" className="block text-sm font-medium text-slate-600 mb-2">Taille</label>
              <div className="relative">
                <input
                  id="taille"
                  type="number"
                  value={taille}
                  onChange={(e) => setTaille(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
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
                        ? "bg-violet-50 border-violet-300 text-violet-700"
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
                {ACTIVITES.map((n, i) => (
                  <button
                    key={i}
                    onClick={() => setActivite(i)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                      activite === i
                        ? "bg-violet-50 border-violet-300 shadow-sm"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <p className={`font-semibold text-sm ${activite === i ? "text-violet-700" : "text-slate-700"}`}>
                      {n.label}
                    </p>
                    <p className={`text-xs mt-0.5 ${activite === i ? "text-violet-600" : "text-slate-400"}`}>
                      {n.description}
                    </p>
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                TDEE calcule : <strong className="text-slate-600">{fmt(tdee)} kcal/jour</strong>
              </p>
            </div>
          </>
        )}

        {/* Objectif */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-3">Votre objectif</label>
          <div className="space-y-2">
            {OBJECTIFS.map((obj) => (
              <button
                key={obj.key}
                onClick={() => setObjectif(obj.key)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                  objectif === obj.key
                    ? `${obj.bg} shadow-sm`
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{obj.emoji}</span>
                  <div>
                    <p className={`font-semibold text-sm ${objectif === obj.key ? obj.color : "text-slate-700"}`}>
                      {obj.label}
                    </p>
                    <p className={`text-xs mt-0.5 ${objectif === obj.key ? obj.color + " opacity-80" : "text-slate-400"}`}>
                      {obj.desc}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">

        {/* Total calories ajustees */}
        <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80 mb-1">
            Calories ({OBJECTIFS.find((o) => o.key === objectif)?.label})
          </p>
          <p className="text-5xl font-extrabold tracking-tight">{fmt(macros.caloriesAjustees)}</p>
          <p className="text-lg font-medium mt-1">kcal / jour</p>
          {objectif === "perte" && (
            <p className="text-xs opacity-70 mt-2">Deficit de 400 kcal applique</p>
          )}
          {objectif === "prise" && (
            <p className="text-xs opacity-70 mt-2">Surplus de 300 kcal applique</p>
          )}
        </div>

        {/* 3 cartes macros */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-4">Repartition des macronutriments</p>
          <div className="space-y-4">
            {/* Proteines */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center justify-between mb-1">
                <p className="font-bold text-blue-700 text-base">Proteines</p>
                <span className="text-xs font-semibold text-blue-500 bg-blue-100 px-2 py-0.5 rounded-full">
                  {Math.round(macros.proteines.pourcentage)}%
                </span>
              </div>
              <p className="text-3xl font-extrabold text-blue-700">{fmt(macros.proteines.grammes)}<span className="text-lg font-bold ml-1">g/jour</span></p>
              <p className="text-sm text-blue-500 mt-1">{fmt(macros.proteines.calories)} kcal — 4 kcal/g</p>
            </div>

            {/* Glucides */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center justify-between mb-1">
                <p className="font-bold text-green-700 text-base">Glucides</p>
                <span className="text-xs font-semibold text-green-500 bg-green-100 px-2 py-0.5 rounded-full">
                  {Math.round(macros.glucides.pourcentage)}%
                </span>
              </div>
              <p className="text-3xl font-extrabold text-green-700">{fmt(macros.glucides.grammes)}<span className="text-lg font-bold ml-1">g/jour</span></p>
              <p className="text-sm text-green-500 mt-1">{fmt(macros.glucides.calories)} kcal — 4 kcal/g</p>
            </div>

            {/* Lipides */}
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
              <div className="flex items-center justify-between mb-1">
                <p className="font-bold text-orange-700 text-base">Lipides</p>
                <span className="text-xs font-semibold text-orange-500 bg-orange-100 px-2 py-0.5 rounded-full">
                  {Math.round(macros.lipides.pourcentage)}%
                </span>
              </div>
              <p className="text-3xl font-extrabold text-orange-700">{fmt(macros.lipides.grammes)}<span className="text-lg font-bold ml-1">g/jour</span></p>
              <p className="text-sm text-orange-500 mt-1">{fmt(macros.lipides.calories)} kcal — 9 kcal/g</p>
            </div>
          </div>
        </div>

        {/* Pie chart CSS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-4">Visualisation</p>
          <div className="flex items-center gap-6">
            <div
              className="w-28 h-28 rounded-full flex-shrink-0"
              style={{ background: conicGradient }}
              aria-label={`Repartition : Proteines ${Math.round(macros.proteines.pourcentage)}%, Glucides ${Math.round(macros.glucides.pourcentage)}%, Lipides ${Math.round(macros.lipides.pourcentage)}%`}
            />
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0" />
                <span className="text-slate-600">Proteines <strong className="text-slate-800">{Math.round(macros.proteines.pourcentage)}%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
                <span className="text-slate-600">Glucides <strong className="text-slate-800">{Math.round(macros.glucides.pourcentage)}%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500 flex-shrink-0" />
                <span className="text-slate-600">Lipides <strong className="text-slate-800">{Math.round(macros.lipides.pourcentage)}%</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Plan repas 3 repas */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-4">Repartition sur 3 repas</p>
          <div className="space-y-3">
            {["Petit-dejeuner", "Dejeuner", "Diner"].map((repas) => (
              <div key={repas} className="border border-slate-100 rounded-xl px-4 py-3">
                <p className="text-sm font-semibold text-slate-700 mb-2">{repas}</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-blue-500 font-medium">Prot.</p>
                    <p className="text-sm font-bold text-blue-700">{fmt(repasProteines)}g</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-500 font-medium">Gluc.</p>
                    <p className="text-sm font-bold text-green-700">{fmt(repasGlucides)}g</p>
                  </div>
                  <div>
                    <p className="text-xs text-orange-500 font-medium">Lip.</p>
                    <p className="text-sm font-bold text-orange-700">{fmt(repasLipides)}g</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 text-center mt-1">{fmt(repasKcal)} kcal</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Les ratios sont des recommandations generales. Consultez un nutritionniste ou dieteticien pour un plan personnalise.
        </div>
      </div>
    </div>
  );
}
