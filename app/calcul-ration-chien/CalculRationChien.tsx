"use client";

import { useState } from "react";
import { calculerRation, type Methode, type Activite, type Stade } from "./rationChienCalc";

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

export default function CalculRationChien() {
  const [methode, setMethode] = useState<Methode>("croquettes");
  const [poids, setPoids] = useState("20");
  const [activite, setActivite] = useState<Activite>("normal");
  const [stade, setStade] = useState<Stade>("adulte");
  const [ageChiot, setAgeChiot] = useState("3");

  const poidsNum = parseFloat(poids) || 0;
  const ageChiotNum = parseInt(ageChiot) || 0;

  const resultat = calculerRation({
    poids: poidsNum,
    methode,
    activite,
    stade,
    ageChiot: stade === "chiot" ? ageChiotNum : undefined,
  });

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Poids */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Poids du chien (kg)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="100"
              step="0.5"
              value={poids}
              onChange={(e) => setPoids(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <span className="text-sm font-semibold text-slate-500 w-8">kg</span>
          </div>
        </div>

        {/* Stade */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Stade de vie
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["chiot", "adulte", "senior", "surpoids"] as Stade[]).map((s) => (
              <button
                key={s}
                onClick={() => setStade(s)}
                className={`py-3 rounded-xl font-semibold text-sm border transition-all ${
                  stade === s
                    ? "bg-amber-50 border-amber-300 text-amber-700 shadow-sm"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {s === "chiot" && "Chiot"}
                {s === "adulte" && "Adulte"}
                {s === "senior" && "Sénior"}
                {s === "surpoids" && "Surpoids"}
              </button>
            ))}
          </div>
        </div>

        {/* Âge chiot - conditionnel */}
        {stade === "chiot" && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Âge du chiot (mois)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="12"
                value={ageChiot}
                onChange={(e) => setAgeChiot(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-semibold text-slate-500 w-10">mois</span>
            </div>
          </div>
        )}

        {/* Activité */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Niveau d&apos;activité
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(["sedentaire", "normal", "actif"] as Activite[]).map((a) => (
              <button
                key={a}
                onClick={() => setActivite(a)}
                className={`py-3 rounded-xl font-semibold text-sm border transition-all ${
                  activite === a
                    ? "bg-amber-50 border-amber-300 text-amber-700 shadow-sm"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {a === "sedentaire" && "Sédentaire"}
                {a === "normal" && "Normal"}
                {a === "actif" && "Actif"}
              </button>
            ))}
          </div>
        </div>

        {/* Méthode */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Méthode d&apos;alimentation
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(["croquettes", "barf", "patee"] as Methode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMethode(m)}
                className={`py-3 rounded-xl font-semibold text-sm border transition-all ${
                  methode === m
                    ? "bg-amber-50 border-amber-300 text-amber-700 shadow-sm"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {m === "croquettes" && "Croquettes"}
                {m === "barf" && "BARF (cru)"}
                {m === "patee" && "Pâtée"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Résultats - 2 cols */}
      <div className="lg:col-span-2 space-y-6">
        {/* Résultat principal */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 text-white shadow-lg">
          <div className="text-sm font-medium opacity-90 mb-2">Ration journalière</div>
          <div className="text-5xl font-extrabold mb-2">{fmt(resultat.quantiteTotal)}</div>
          <div className="text-lg opacity-90">
            {resultat.methode === "croquettes" && "g de croquettes / jour"}
            {resultat.methode === "patee" && "g de pâtée / jour"}
            {resultat.methode === "barf" && "g de BARF / jour"}
          </div>
          <div className="mt-4 pt-4 border-t border-white border-opacity-30 text-sm opacity-90">
            {resultat.conseil}
          </div>
        </div>

        {/* Répartition BARF */}
        {resultat.repartitionBARF && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Répartition BARF (70/10/10/5/5)</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-slate-600">Viande (70%)</span>
                  <span className="font-bold text-amber-700">{fmt(resultat.repartitionBARF.viande)} g</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: "70%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-slate-600">Os charnus (10%)</span>
                  <span className="font-bold text-amber-700">{fmt(resultat.repartitionBARF.os)} g</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400" style={{ width: "10%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-slate-600">Légumes (10%)</span>
                  <span className="font-bold text-amber-700">{fmt(resultat.repartitionBARF.legumes)} g</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400" style={{ width: "10%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-slate-600">Fruits (5%)</span>
                  <span className="font-bold text-amber-700">{fmt(resultat.repartitionBARF.fruits)} g</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-300" style={{ width: "5%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-slate-600">Suppléments (5%)</span>
                  <span className="font-bold text-amber-700">{fmt(resultat.repartitionBARF.supplements)} g</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-300" style={{ width: "5%" }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Conseil pratique */}
        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
          <div className="text-sm font-bold text-emerald-800 mb-2">💡 Conseil</div>
          <p className="text-sm text-emerald-700">
            Ajustez la portion selon le {poidsNum < 15 ? "poids stable du chiot" : "poids stable de votre chien"}. Si le chien maigrit → augmentez. Si surpoids → diminuez de 10-15%.
          </p>
        </div>
      </div>
    </div>
  );
}
