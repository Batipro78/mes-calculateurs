"use client";

import { useState } from "react";
import {
  calculerCalories,
  equivalenceCalories,
  getSport,
  getCategories,
  getSportsByCategory,
  tempsForBrulerCalories,
  type CategorieSport,
} from "./caloriesSportCalc";

function fmt(n: number, digits = 0): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function fmtDecimals(n: number, digits = 1): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function CalculCaloriesSport() {
  const [categorieSportSelect, setCategorieSportSelect] = useState<CategorieSport>("course");
  const [sportId, setSportId] = useState<string>("course-10kmh");
  const [poidsKg, setPoidsKg] = useState<string>("70");
  const [dureeMin, setDureeMin] = useState<string>("30");

  const poids = parseFloat(poidsKg) || 0;
  const duree = parseFloat(dureeMin) || 0;

  // Obtenir le sport selectionne
  const sport = getSport(sportId);
  const calories = sport ? calculerCalories(sport.mets, poids, duree) : 0;
  const equivalences = equivalenceCalories(calories);

  // Temps pour bruler 100, 300, 500 kcal
  const temps100 = sport ? tempsForBrulerCalories(sport.mets, poids, 100) : 0;
  const temps300 = sport ? tempsForBrulerCalories(sport.mets, poids, 300) : 0;
  const temps500 = sport ? tempsForBrulerCalories(sport.mets, poids, 500) : 0;

  const sportsCategorie = getSportsByCategory(categorieSportSelect);
  const categories = getCategories();

  const handleChangeCategorie = (cat: CategorieSport) => {
    setCategorieSportSelect(cat);
    // Reset sport ID au premier sport de la nouvelle categorie
    const firstSport = getSportsByCategory(cat)[0];
    if (firstSport) {
      setSportId(firstSport.id);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Categorie Sport */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-600 mb-3">
            Catégorie de sport
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const labels: Record<CategorieSport, string> = {
                course: "Course",
                velo: "Vélo",
                natation: "Natation",
                collectif: "Sports collectifs",
                muscu: "Musculation",
                exterieur: "Extérieur",
                nautique: "Nautique",
                autres: "Autres",
              };
              return (
                <button
                  key={cat}
                  onClick={() => handleChangeCategorie(cat)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    categorieSportSelect === cat
                      ? "bg-orange-500 text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {labels[cat]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sport Specifique */}
        <div className="mb-6">
          <label htmlFor="sport" className="block text-sm font-medium text-slate-600 mb-2">
            Sport spécifique
          </label>
          <select
            id="sport"
            value={sportId}
            onChange={(e) => setSportId(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow"
          >
            {sportsCategorie.map((s) => (
              <option key={s.id} value={s.id}>
                {s.emoji} {s.nom}
              </option>
            ))}
          </select>
        </div>

        {/* Poids */}
        <div className="mb-6">
          <label htmlFor="poids" className="block text-sm font-medium text-slate-600 mb-2">
            Poids (kg)
          </label>
          <div className="relative">
            <input
              id="poids"
              type="number"
              value={poidsKg}
              onChange={(e) => setPoidsKg(e.target.value)}
              placeholder="ex: 70"
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow"
              step="0.1"
              min="0"
            />
          </div>
        </div>

        {/* Duree */}
        <div className="mb-6">
          <label htmlFor="duree" className="block text-sm font-medium text-slate-600 mb-2">
            Durée (minutes)
          </label>
          <div className="relative">
            <input
              id="duree"
              type="number"
              value={dureeMin}
              onChange={(e) => setDureeMin(e.target.value)}
              placeholder="ex: 30"
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow"
              step="1"
              min="0"
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Entrez la durée totale de votre activité
          </p>
        </div>
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {calories > 0 ? (
          <>
            <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 shadow-lg shadow-orange-200/50">
              <p className="text-sm text-orange-100 mb-1">Calories brûlées</p>
              <p className="text-4xl font-extrabold tracking-tight">
                {fmt(calories)} <span className="text-lg font-semibold">kcal</span>
              </p>
              {sport && (
                <p className="text-orange-100 text-sm mt-2">
                  {sport.emoji} {sport.nom}
                </p>
              )}
            </div>

            {/* Equivalences alimentaires */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <p className="text-xs text-slate-400 mb-3 font-semibold uppercase">
                Équivalences alimentaires
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500">Environ</p>
                  <p className="text-lg font-bold text-slate-800">
                    {fmtDecimals(equivalences.bigmac, 1)} Big Mac
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Ou</p>
                  <p className="text-lg font-bold text-slate-800">
                    {fmt(equivalences.banane)} bananes
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Ou</p>
                  <p className="text-lg font-bold text-slate-800">
                    {fmt(equivalences.carre_chocolat)} carrés de chocolat
                  </p>
                </div>
              </div>
            </div>

            {/* Temps pour bruler X kcal */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <p className="text-xs text-slate-400 mb-3 font-semibold uppercase">
                Temps nécessaire pour bruler
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-600">100 kcal</p>
                  <p className="font-bold text-slate-800">
                    {fmt(temps100)} min
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-600">300 kcal</p>
                  <p className="font-bold text-slate-800">
                    {fmt(temps300)} min
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-600">500 kcal</p>
                  <p className="font-bold text-slate-800">
                    {fmt(temps500)} min
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center">
            <p className="text-sm text-slate-400">
              Entrez vos informations pour calculer
            </p>
          </div>
        )}

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Calcul selon METs officiels (Compendium 2024). À titre informatif.
        </div>
      </div>
    </div>
  );
}
