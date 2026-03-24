"use client";

import { useState } from "react";

interface CategorieIMC {
  label: string;
  min: number;
  max: number;
  couleur: string;
  bgCouleur: string;
  borderCouleur: string;
}

const CATEGORIES: CategorieIMC[] = [
  {
    label: "Maigreur",
    min: 0,
    max: 18.5,
    couleur: "text-blue-600",
    bgCouleur: "from-blue-500 to-cyan-500",
    borderCouleur: "border-blue-200 bg-blue-50",
  },
  {
    label: "Poids normal",
    min: 18.5,
    max: 25,
    couleur: "text-emerald-600",
    bgCouleur: "from-emerald-500 to-green-500",
    borderCouleur: "border-emerald-200 bg-emerald-50",
  },
  {
    label: "Surpoids",
    min: 25,
    max: 30,
    couleur: "text-amber-600",
    bgCouleur: "from-amber-500 to-yellow-500",
    borderCouleur: "border-amber-200 bg-amber-50",
  },
  {
    label: "Obesite moderee",
    min: 30,
    max: 35,
    couleur: "text-orange-600",
    bgCouleur: "from-orange-500 to-amber-600",
    borderCouleur: "border-orange-200 bg-orange-50",
  },
  {
    label: "Obesite severe",
    min: 35,
    max: 40,
    couleur: "text-red-600",
    bgCouleur: "from-red-500 to-rose-500",
    borderCouleur: "border-red-200 bg-red-50",
  },
  {
    label: "Obesite morbide",
    min: 40,
    max: 100,
    couleur: "text-red-800",
    bgCouleur: "from-red-700 to-red-500",
    borderCouleur: "border-red-300 bg-red-100",
  },
];

function getCategorie(imc: number): CategorieIMC {
  return (
    CATEGORIES.find((c) => imc >= c.min && imc < c.max) ||
    CATEGORIES[CATEGORIES.length - 1]
  );
}

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export default function CalculateurIMC() {
  const [poids, setPoids] = useState("70");
  const [taille, setTaille] = useState("175");

  const poidsNum = parseFloat(poids) || 0;
  const tailleCm = parseFloat(taille) || 0;
  const tailleM = tailleCm / 100;

  const imc = tailleM > 0 ? poidsNum / (tailleM * tailleM) : 0;
  const categorie = getCategorie(imc);

  // Poids ideal (IMC 21.5 = milieu de la zone normale)
  const poidsIdealBas = 18.5 * tailleM * tailleM;
  const poidsIdealHaut = 25 * tailleM * tailleM;

  // Position sur la jauge (0-50 IMC mapped to 0-100%)
  const jaugePosition = Math.min((imc / 50) * 100, 100);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Taille */}
        <div className="mb-6">
          <label
            htmlFor="taille"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Taille
          </label>
          <div className="relative">
            <input
              id="taille"
              type="number"
              value={taille}
              onChange={(e) => setTaille(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              min="50"
              max="250"
              step="1"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              cm
            </span>
          </div>
          {/* Raccourcis */}
          <div className="flex gap-2 mt-2">
            {[155, 165, 175, 185].map((t) => (
              <button
                key={t}
                onClick={() => setTaille(t.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  taille === t.toString()
                    ? "bg-rose-50 border-rose-300 text-rose-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {t} cm
              </button>
            ))}
          </div>
        </div>

        {/* Poids */}
        <div className="mb-6">
          <label
            htmlFor="poids"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Poids
          </label>
          <div className="relative">
            <input
              id="poids"
              type="number"
              value={poids}
              onChange={(e) => setPoids(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              min="20"
              max="300"
              step="1"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              kg
            </span>
          </div>
          {/* Raccourcis */}
          <div className="flex gap-2 mt-2">
            {[55, 65, 75, 85, 95].map((p) => (
              <button
                key={p}
                onClick={() => setPoids(p.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  poids === p.toString()
                    ? "bg-rose-50 border-rose-300 text-rose-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {p} kg
              </button>
            ))}
          </div>
        </div>

        {/* Jauge visuelle */}
        <div className="mt-8">
          <p className="text-sm font-medium text-slate-600 mb-3">
            Echelle IMC
          </p>
          <div className="relative">
            <div className="flex h-4 rounded-full overflow-hidden">
              <div className="bg-blue-400 flex-1" />
              <div className="bg-emerald-400 flex-[2.6]" />
              <div className="bg-amber-400 flex-[2]" />
              <div className="bg-orange-400 flex-[2]" />
              <div className="bg-red-400 flex-[2]" />
              <div className="bg-red-700 flex-[4]" />
            </div>
            {/* Curseur */}
            {imc > 0 && (
              <div
                className="absolute top-0 -mt-1 transition-all duration-500"
                style={{ left: `${jaugePosition}%` }}
              >
                <div className="w-0.5 h-6 bg-slate-800 mx-auto" />
                <div className="text-xs font-bold text-slate-800 -ml-3 mt-0.5">
                  {fmt(imc)}
                </div>
              </div>
            )}
            {/* Labels */}
            <div className="flex justify-between text-xs text-slate-400 mt-5">
              <span>16</span>
              <span>18,5</span>
              <span>25</span>
              <span>30</span>
              <span>35</span>
              <span>40+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        <div
          className={`bg-gradient-to-br ${categorie.bgCouleur} text-white rounded-2xl p-6 shadow-lg`}
        >
          <p className="text-sm opacity-80 mb-1">Votre IMC</p>
          <p className="text-5xl font-extrabold tracking-tight">{fmt(imc)}</p>
          <div className="h-px bg-white/20 my-4" />
          <p className="text-lg font-bold">{categorie.label}</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Poids ideal (IMC normal)</p>
          <p className="text-xl font-extrabold text-slate-800">
            {fmt(poidsIdealBas)} - {fmt(poidsIdealHaut)}{" "}
            <span className="text-sm font-semibold text-slate-400">kg</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Pour une taille de {tailleCm} cm (IMC entre 18,5 et 25)
          </p>
        </div>

        {/* Classification */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Classification OMS
          </p>
          <div className="space-y-1.5">
            {CATEGORIES.map((c) => (
              <div
                key={c.label}
                className={`flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-all ${
                  categorie.label === c.label
                    ? `${c.borderCouleur} border-2 font-bold`
                    : "border-transparent"
                }`}
              >
                <span
                  className={
                    categorie.label === c.label ? c.couleur : "text-slate-400"
                  }
                >
                  {c.label}
                </span>
                <span
                  className={`text-xs ${
                    categorie.label === c.label ? c.couleur : "text-slate-300"
                  }`}
                >
                  {c.min === 0
                    ? `< ${c.max}`
                    : c.max === 100
                      ? `≥ ${c.min}`
                      : `${c.min} - ${c.max}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          L&apos;IMC est un indicateur general. Il ne remplace pas un avis
          medical. Non adapte aux sportifs, femmes enceintes et personnes agees.
        </div>
      </div>
    </div>
  );
}
