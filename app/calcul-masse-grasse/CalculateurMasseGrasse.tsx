"use client";

import { useState } from "react";
import { calcMasseGrasse } from "./masseGrasseCalc";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

const CATEGORIES_INFO = [
  {
    key: "essentiel",
    label: "Essentiel",
    hommeRange: "< 6 %",
    femmeRange: "< 14 %",
    couleur: "text-blue-600",
    borderCouleur: "border-blue-200 bg-blue-50",
    bgGradient: "from-blue-500 to-cyan-500",
  },
  {
    key: "athlete",
    label: "Athlete",
    hommeRange: "6 – 13 %",
    femmeRange: "14 – 20 %",
    couleur: "text-emerald-600",
    borderCouleur: "border-emerald-200 bg-emerald-50",
    bgGradient: "from-emerald-500 to-green-500",
  },
  {
    key: "fitness",
    label: "Fitness",
    hommeRange: "14 – 17 %",
    femmeRange: "21 – 24 %",
    couleur: "text-teal-600",
    borderCouleur: "border-teal-200 bg-teal-50",
    bgGradient: "from-teal-500 to-emerald-500",
  },
  {
    key: "normal",
    label: "Normal",
    hommeRange: "18 – 24 %",
    femmeRange: "25 – 31 %",
    couleur: "text-amber-600",
    borderCouleur: "border-amber-200 bg-amber-50",
    bgGradient: "from-amber-500 to-yellow-500",
  },
  {
    key: "surpoids",
    label: "Surpoids",
    hommeRange: "> 25 %",
    femmeRange: "> 32 %",
    couleur: "text-red-600",
    borderCouleur: "border-red-200 bg-red-50",
    bgGradient: "from-red-500 to-rose-500",
  },
];

export default function CalculateurMasseGrasse() {
  const [poids, setPoids] = useState(75);
  const [taille, setTaille] = useState(175);
  const [age, setAge] = useState(30);
  const [sexe, setSexe] = useState<"homme" | "femme">("homme");
  const [tourTaille, setTourTaille] = useState(85);
  const [tourCou, setTourCou] = useState(38);
  const [tourHanches, setTourHanches] = useState(95);

  const resultat = calcMasseGrasse(
    poids,
    taille,
    age,
    sexe,
    tourTaille,
    tourCou,
    sexe === "femme" ? tourHanches : undefined
  );

  const catInfo =
    CATEGORIES_INFO.find((c) => c.key === resultat.categorie) ||
    CATEGORIES_INFO[3];

  // Jauge 0-50%
  const jaugePosition = Math.min((resultat.navy / 50) * 100, 100);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        {/* Sexe */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Sexe
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setSexe("homme")}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm border-2 transition-all ${
                sexe === "homme"
                  ? "border-violet-500 bg-violet-50 text-violet-700"
                  : "border-slate-200 text-slate-400 hover:border-slate-300"
              }`}
            >
              Homme
            </button>
            <button
              onClick={() => setSexe("femme")}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm border-2 transition-all ${
                sexe === "femme"
                  ? "border-violet-500 bg-violet-50 text-violet-700"
                  : "border-slate-200 text-slate-400 hover:border-slate-300"
              }`}
            >
              Femme
            </button>
          </div>
        </div>

        {/* Poids */}
        <div>
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
              onChange={(e) => setPoids(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              min="30"
              max="250"
              step="1"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              kg
            </span>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {[60, 70, 75, 80, 90].map((v) => (
              <button
                key={v}
                onClick={() => setPoids(v)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  poids === v
                    ? "bg-violet-50 border-violet-300 text-violet-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {v} kg
              </button>
            ))}
          </div>
        </div>

        {/* Taille */}
        <div>
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
              onChange={(e) => setTaille(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              min="100"
              max="250"
              step="1"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              cm
            </span>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {[160, 165, 170, 175, 180, 185].map((v) => (
              <button
                key={v}
                onClick={() => setTaille(v)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  taille === v
                    ? "bg-violet-50 border-violet-300 text-violet-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {v} cm
              </button>
            ))}
          </div>
        </div>

        {/* Age */}
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Age
          </label>
          <div className="relative">
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              min="15"
              max="100"
              step="1"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              ans
            </span>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {[25, 30, 35, 40, 45].map((v) => (
              <button
                key={v}
                onClick={() => setAge(v)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  age === v
                    ? "bg-violet-50 border-violet-300 text-violet-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {v} ans
              </button>
            ))}
          </div>
        </div>

        {/* Tour de taille */}
        <div>
          <label
            htmlFor="tourTaille"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Tour de taille
          </label>
          <div className="relative">
            <input
              id="tourTaille"
              type="number"
              value={tourTaille}
              onChange={(e) => setTourTaille(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              min="40"
              max="200"
              step="1"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              cm
            </span>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {[75, 80, 85, 90, 95].map((v) => (
              <button
                key={v}
                onClick={() => setTourTaille(v)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  tourTaille === v
                    ? "bg-violet-50 border-violet-300 text-violet-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {v} cm
              </button>
            ))}
          </div>
        </div>

        {/* Tour de cou */}
        <div>
          <label
            htmlFor="tourCou"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Tour de cou
          </label>
          <div className="relative">
            <input
              id="tourCou"
              type="number"
              value={tourCou}
              onChange={(e) => setTourCou(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              min="25"
              max="60"
              step="1"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              cm
            </span>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {[34, 36, 38, 40, 42].map((v) => (
              <button
                key={v}
                onClick={() => setTourCou(v)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  tourCou === v
                    ? "bg-violet-50 border-violet-300 text-violet-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {v} cm
              </button>
            ))}
          </div>
        </div>

        {/* Tour de hanches (femme uniquement) */}
        {sexe === "femme" && (
          <div>
            <label
              htmlFor="tourHanches"
              className="block text-sm font-medium text-slate-600 mb-2"
            >
              Tour de hanches
            </label>
            <div className="relative">
              <input
                id="tourHanches"
                type="number"
                value={tourHanches}
                onChange={(e) => setTourHanches(Number(e.target.value))}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                min="50"
                max="200"
                step="1"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                cm
              </span>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {[88, 92, 95, 100, 105].map((v) => (
                <button
                  key={v}
                  onClick={() => setTourHanches(v)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                    tourHanches === v
                      ? "bg-violet-50 border-violet-300 text-violet-700"
                      : "border-slate-200 text-slate-400 hover:border-slate-300"
                  }`}
                >
                  {v} cm
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Jauge visuelle */}
        <div className="mt-4">
          <p className="text-sm font-medium text-slate-600 mb-3">
            Echelle masse grasse (methode Navy)
          </p>
          <div className="relative">
            <div className="flex h-4 rounded-full overflow-hidden">
              <div className="bg-blue-400 flex-[2]" />
              <div className="bg-emerald-400 flex-[3]" />
              <div className="bg-teal-400 flex-[2]" />
              <div className="bg-amber-400 flex-[3]" />
              <div className="bg-red-400 flex-[5]" />
            </div>
            {resultat.navy > 0 && (
              <div
                className="absolute top-0 -mt-1 transition-all duration-500"
                style={{ left: `${jaugePosition}%` }}
              >
                <div className="w-0.5 h-6 bg-slate-800 mx-auto" />
                <div className="text-xs font-bold text-slate-800 -ml-3 mt-0.5">
                  {fmt(resultat.navy)}%
                </div>
              </div>
            )}
            <div className="flex justify-between text-xs text-slate-400 mt-5">
              <span>0%</span>
              <span>10%</span>
              <span>20%</span>
              <span>30%</span>
              <span>40%</span>
              <span>50%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {/* Carte principale */}
        <div
          className={`bg-gradient-to-br ${catInfo.bgGradient} text-white rounded-2xl p-6 shadow-lg`}
        >
          <p className="text-sm opacity-80 mb-1">Taux de masse grasse (Navy)</p>
          <p className="text-5xl font-extrabold tracking-tight">
            {fmt(resultat.navy)}<span className="text-2xl font-bold ml-1">%</span>
          </p>
          <div className="h-px bg-white/20 my-4" />
          <p className="text-lg font-bold">{catInfo.label}</p>
        </div>

        {/* Masses */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-400 mb-1">Masse grasse</p>
            <p className="text-2xl font-extrabold text-slate-800">
              {fmt(resultat.masseGrasse)}{" "}
              <span className="text-sm font-semibold text-slate-400">kg</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Masse maigre</p>
            <p className="text-2xl font-extrabold text-slate-800">
              {fmt(resultat.masseMaigre)}{" "}
              <span className="text-sm font-semibold text-slate-400">kg</span>
            </p>
          </div>
        </div>

        {/* Estimation par IMC */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs text-slate-400 mb-1">
            Estimation par IMC (Deurenberg)
          </p>
          <p className="text-2xl font-extrabold text-slate-800">
            {fmt(resultat.bmi)}{" "}
            <span className="text-sm font-semibold text-slate-400">%</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Formule : 1,20 × IMC + 0,23 × age{sexe === "homme" ? " − 16,2" : " − 5,4"}
          </p>
        </div>

        {/* Classification */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Classification — {sexe === "homme" ? "Homme" : "Femme"}
          </p>
          <div className="space-y-1.5">
            {CATEGORIES_INFO.map((c) => (
              <div
                key={c.key}
                className={`flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-all ${
                  resultat.categorie === c.key
                    ? `${c.borderCouleur} border-2 font-bold`
                    : "border-transparent"
                }`}
              >
                <span
                  className={
                    resultat.categorie === c.key ? c.couleur : "text-slate-400"
                  }
                >
                  {c.label}
                </span>
                <span
                  className={`text-xs ${
                    resultat.categorie === c.key ? c.couleur : "text-slate-300"
                  }`}
                >
                  {sexe === "homme" ? c.hommeRange : c.femmeRange}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          La methode US Navy necessite un ruban mesureur. Les resultats sont
          une estimation — consultez un professionnel de sante pour un bilan
          compose corporelle precis.
        </div>
      </div>
    </div>
  );
}
