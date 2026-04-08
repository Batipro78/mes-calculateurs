"use client";

import { useState } from "react";
import { calcProteines } from "./proteinesCalc";

const ACTIVITES = [
  {
    slug: "sedentaire",
    label: "Sedentaire",
    description: "Peu ou pas d'exercice",
    icon: "🪑",
  },
  {
    slug: "actif",
    label: "Actif",
    description: "Exercice 2-4x/semaine",
    icon: "🚶",
  },
  {
    slug: "sportif",
    label: "Sportif",
    description: "Entrainement intense regulier",
    icon: "🏃",
  },
  {
    slug: "musculation",
    label: "Musculation",
    description: "Prise de masse, halteres",
    icon: "💪",
  },
  {
    slug: "endurance",
    label: "Endurance",
    description: "Course, velo, natation",
    icon: "🚴",
  },
];

const OBJECTIFS = [
  { slug: "maintien", label: "Maintien", description: "Garder le poids", icon: "⚖️" },
  { slug: "perte", label: "Perte de poids", description: "Secher, preserver les muscles", icon: "🔥" },
  { slug: "prise", label: "Prise de masse", description: "Gagner du muscle", icon: "📈" },
];

const ALIMENTS = [
  { nom: "Poulet (blanc)", proteines: 31, unite: "100g", emoji: "🍗" },
  { nom: "Oeufs entiers", proteines: 13, unite: "100g", emoji: "🥚" },
  { nom: "Thon en conserve", proteines: 26, unite: "100g", emoji: "🐟" },
  { nom: "Lentilles cuites", proteines: 9, unite: "100g", emoji: "🫘" },
  { nom: "Fromage blanc 0%", proteines: 8, unite: "100g", emoji: "🥛" },
  { nom: "Tofu nature", proteines: 8, unite: "100g", emoji: "🟡" },
  { nom: "Amandes", proteines: 21, unite: "100g", emoji: "🌰" },
  { nom: "Saumon", proteines: 20, unite: "100g", emoji: "🍣" },
];

export default function CalculateurProteines() {
  const [poids, setPoids] = useState(70);
  const [poidsInput, setPoidsInput] = useState("70");
  const [activite, setActivite] = useState("actif");
  const [objectif, setObjectif] = useState("maintien");

  const result = calcProteines(poids, activite, objectif);

  const { grammes, parRepas, fourchette, calories, pourcentage } = result;

  // Position dans la fourchette (0 a 100%)
  const fourchetteMin = fourchette.min * poids;
  const fourchetteMax = fourchette.max * poids;
  const posPercent = Math.min(
    100,
    Math.max(
      0,
      ((grammes - fourchetteMin) / (fourchetteMax - fourchetteMin)) * 100
    )
  );

  function handlePoidsInput(val: string) {
    setPoidsInput(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 30 && num <= 200) {
      setPoids(num);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire — 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Poids */}
        <div className="mb-6">
          <label htmlFor="poids" className="block text-sm font-medium text-slate-600 mb-2">
            Poids corporel
          </label>
          <div className="relative">
            <input
              id="poids"
              type="number"
              value={poidsInput}
              onChange={(e) => handlePoidsInput(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              min="30"
              max="200"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">kg</span>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {[50, 60, 70, 80, 90, 100].map((p) => (
              <button
                key={p}
                onClick={() => { setPoids(p); setPoidsInput(p.toString()); }}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  poids === p
                    ? "bg-purple-50 border-purple-300 text-purple-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {p} kg
              </button>
            ))}
          </div>
        </div>

        {/* Activite */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Niveau d&apos;activite
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 lg:grid-cols-5">
            {ACTIVITES.map((a) => (
              <button
                key={a.slug}
                onClick={() => setActivite(a.slug)}
                className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-center transition-all ${
                  activite === a.slug
                    ? "bg-purple-50 border-purple-300 shadow-sm"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <span className="text-2xl">{a.icon}</span>
                <span className={`text-xs font-semibold leading-tight ${activite === a.slug ? "text-purple-700" : "text-slate-600"}`}>
                  {a.label}
                </span>
                <span className={`text-[10px] leading-tight ${activite === a.slug ? "text-purple-500" : "text-slate-400"}`}>
                  {a.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Objectif */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Objectif
          </label>
          <div className="grid grid-cols-3 gap-3">
            {OBJECTIFS.map((o) => (
              <button
                key={o.slug}
                onClick={() => setObjectif(o.slug)}
                className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-center transition-all ${
                  objectif === o.slug
                    ? "bg-purple-50 border-purple-300 shadow-sm"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <span className="text-2xl">{o.icon}</span>
                <span className={`text-xs font-semibold leading-tight ${objectif === o.slug ? "text-purple-700" : "text-slate-600"}`}>
                  {o.label}
                </span>
                <span className={`text-[10px] leading-tight ${objectif === o.slug ? "text-purple-500" : "text-slate-400"}`}>
                  {o.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resultats — 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {/* Carte principale */}
        <div className="bg-gradient-to-br from-purple-500 to-violet-600 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80 mb-1">Apport en proteines journalier</p>
          <p className="text-5xl font-extrabold tracking-tight">{grammes}</p>
          <p className="text-lg font-medium mt-1">grammes / jour</p>
          <div className="h-px bg-white/20 my-4" />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="opacity-75">Par repas (x3)</p>
              <p className="text-2xl font-bold">{parRepas}g</p>
            </div>
            <div>
              <p className="opacity-75">Calories proteines</p>
              <p className="text-2xl font-bold">{calories} kcal</p>
            </div>
          </div>
        </div>

        {/* Fourchette et barre */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">Position dans la fourchette recommandee</p>
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>{Math.round(fourchetteMin)}g ({fourchette.min}g/kg)</span>
            <span>{Math.round(fourchetteMax)}g ({fourchette.max}g/kg)</span>
          </div>
          <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-violet-300 rounded-full" />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-purple-600 rounded-full border-2 border-white shadow-md transition-all"
              style={{ left: `calc(${posPercent}% - 8px)` }}
            />
          </div>
          <p className="text-center text-sm font-bold text-purple-700 mt-2">
            {grammes}g — {pourcentage}% d&apos;un regime 2000 kcal
          </p>
        </div>

        {/* Sources alimentaires */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">Sources de proteines (pour {grammes}g/j)</p>
          <div className="space-y-2">
            {ALIMENTS.map((a) => {
              const portions = (grammes / a.proteines) * 100;
              return (
                <div key={a.nom} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span>{a.emoji}</span>
                    <span className="text-slate-600">{a.nom}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-700">{Math.round(portions)}g</span>
                    <span className="text-xs text-slate-400 ml-1">({a.proteines}g/100g)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Les besoins en proteines varient selon la morphologie, l&apos;age et l&apos;etat de sante.
          Consultez un nutritionniste pour un bilan personnalise.
        </div>
      </div>
    </div>
  );
}
