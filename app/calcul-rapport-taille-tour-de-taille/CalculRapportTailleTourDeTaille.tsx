"use client";

import { useState } from "react";
import { calculerWthr, fmt, type Sexe } from "./wthrCalc";

export default function CalculRapportTailleTourDeTaille() {
  const [tourDeTaille, setTourDeTaille] = useState("85");
  const [taille, setTaille] = useState("175");
  const [sexe, setSexe] = useState<Sexe>("homme");
  const [age, setAge] = useState("30");

  const tourDeTaileNum = parseFloat(tourDeTaille) || 0;
  const tailleNum = parseFloat(taille) || 0;
  const ageNum = parseInt(age) || 0;

  const resultat = calculerWthr(tourDeTaileNum, tailleNum, sexe);

  // Position sur jauge (0 à 0.7 mapped to 0-100%)
  const jaugePosition = Math.min((resultat.wthr / 0.7) * 100, 100);

  // Regle d'or: 0.5 sur la jauge
  const regleDorPosition = (0.5 / 0.7) * 100;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Toggle Sexe */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-3">
            Sexe / Catégorie
          </label>
          <div className="flex gap-2">
            {["homme", "femme", "enfant"].map((s) => (
              <button
                key={s}
                onClick={() => setSexe(s as Sexe)}
                className={`px-4 py-2 rounded-xl font-medium transition-all border ${
                  sexe === s
                    ? "bg-rose-50 border-rose-300 text-rose-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                {s === "homme" && "Homme"}
                {s === "femme" && "Femme"}
                {s === "enfant" && "Enfant (5-18)"}
              </button>
            ))}
          </div>
        </div>

        {/* Tour de taille */}
        <div className="mb-6">
          <label
            htmlFor="tour-taille"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Tour de taille
          </label>
          <div className="relative">
            <input
              id="tour-taille"
              type="number"
              value={tourDeTaille}
              onChange={(e) => setTourDeTaille(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              min="40"
              max="150"
              step="1"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              cm
            </span>
          </div>
          <div className="flex gap-2 mt-2">
            {(sexe === "homme" ? [75, 80, 85, 90, 95] : [65, 70, 75, 80, 85]).map(
              (t) => (
                <button
                  key={t}
                  onClick={() => setTourDeTaille(t.toString())}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                    tourDeTaille === t.toString()
                      ? "bg-rose-50 border-rose-300 text-rose-700"
                      : "border-slate-200 text-slate-400 hover:border-slate-300"
                  }`}
                >
                  {t} cm
                </button>
              )
            )}
          </div>
        </div>

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

        {/* Âge (optionnel) */}
        {sexe === "enfant" && (
          <div className="mb-6">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-slate-600 mb-2"
            >
              Âge (optionnel)
            </label>
            <div className="relative">
              <input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                min="5"
                max="18"
                step="1"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                ans
              </span>
            </div>
          </div>
        )}

        {/* Jauge visuelle */}
        <div className="mt-8">
          <p className="text-sm font-medium text-slate-600 mb-3">
            Échelle WtHR
          </p>
          <div className="relative">
            <div className="flex h-4 rounded-full overflow-hidden">
              <div className="bg-blue-400 flex-1" />
              <div className="bg-emerald-400 flex-1" />
              <div className="bg-amber-400 flex-1" />
              <div className="bg-orange-400 flex-1" />
              <div className="bg-red-400 flex-1" />
              <div className="bg-red-700 flex-1" />
            </div>
            {/* Curseur WtHR */}
            {resultat.wthr > 0 && (
              <div
                className="absolute top-0 -mt-1 transition-all duration-500"
                style={{ left: `${jaugePosition}%` }}
              >
                <div className="w-1 h-6 bg-slate-800 mx-auto" />
                <div className="text-xs font-bold text-slate-800 -ml-3 mt-0.5 whitespace-nowrap">
                  {fmt(resultat.wthr)}
                </div>
              </div>
            )}
            {/* Marque règle d'or 0.5 */}
            <div
              className="absolute top-0 -mt-2 opacity-50"
              style={{ left: `${regleDorPosition}%` }}
            >
              <div className="text-xs text-emerald-600 font-semibold -ml-4">
                0.5 (OMS)
              </div>
            </div>
            {/* Labels */}
            <div className="flex justify-between text-xs text-slate-400 mt-6">
              <span>0.3</span>
              <span>0.42</span>
              <span>0.5</span>
              <span>0.58</span>
              <span>0.65</span>
              <span>0.7+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Résultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        <div
          className={`bg-gradient-to-br ${resultat.bgCouleur} text-white rounded-2xl p-6 shadow-lg`}
        >
          <p className="text-sm opacity-80 mb-1">Votre WtHR</p>
          <p className="text-5xl font-extrabold tracking-tight">
            {fmt(resultat.wthr)}
          </p>
          <div className="h-px bg-white/20 my-4" />
          <p className="text-lg font-bold">{resultat.niveau}</p>
          <p className="text-sm opacity-90 mt-2">{resultat.niveauDescription}</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Risque cardiovasculaire</p>
          <p className="text-xl font-extrabold text-slate-800">
            {resultat.risqueCardio}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Basé sur la graisse viscérale (NHS 2022)
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">vs Règle d&apos;or OMS</p>
          <p className="text-lg font-extrabold text-slate-800">
            {resultat.ecartRegle05Texte}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {resultat.wthr <= 0.5
              ? "✓ En dessous du seuil OMS 0.5"
              : "⚠ Au-dessus du seuil OMS 0.5"}
          </p>
        </div>

        {/* Détails */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">Détails</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Tour de taille</span>
              <span className="font-semibold text-slate-800">{tourDeTaileNum} cm</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-2">
              <span className="text-slate-600">Taille</span>
              <span className="font-semibold text-slate-800">{tailleNum} cm</span>
            </div>
            {sexe === "enfant" && (
              <div className="flex justify-between border-t border-slate-100 pt-2">
                <span className="text-slate-600">Âge</span>
                <span className="font-semibold text-slate-800">{ageNum} ans</span>
              </div>
            )}
            <div className="flex justify-between border-t border-slate-100 pt-2">
              <span className="text-slate-600">Formule</span>
              <span className="font-mono text-xs text-slate-500">
                {tourDeTaileNum}/{tailleNum}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-700 leading-relaxed">
          <strong>Comment mesurer :</strong> À mi-hauteur entre les côtes et les
          hanches, sans rentrer le ventre, en fin d&apos;expiration normale.
        </div>
      </div>
    </div>
  );
}
