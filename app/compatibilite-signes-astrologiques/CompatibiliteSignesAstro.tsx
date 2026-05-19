"use client";

import { useState } from "react";
import {
  calculerCompatibilite,
  ALL_SIGNES,
  type Signe,
} from "./compatibiliteSignesCalc";

export default function CompatibiliteSignesAstro() {
  const [signe1, setSigne1] = useState<Signe>("belier");
  const [signe2, setSigne2] = useState<Signe>("lion");

  const resultat = calculerCompatibilite(signe1, signe2);

  // Couleur de la jauge en fonction du pourcentage
  const gaugeColor =
    resultat.pourcentage >= 80
      ? "from-green-500 to-emerald-600"
      : resultat.pourcentage >= 60
        ? "from-yellow-500 to-amber-600"
        : resultat.pourcentage >= 50
          ? "from-orange-500 to-orange-600"
          : "from-red-500 to-rose-600";

  const textColorLabel =
    resultat.pourcentage >= 80
      ? "text-green-700"
      : resultat.pourcentage >= 60
        ? "text-yellow-700"
        : resultat.pourcentage >= 50
          ? "text-orange-700"
          : "text-red-700";

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Formulaire - Colonne gauche */}
      <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-fit">
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Premier signe
          </label>
          <select
            value={signe1}
            onChange={(e) => setSigne1(e.target.value as Signe)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {ALL_SIGNES.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.emoji} {s.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Deuxième signe
          </label>
          <select
            value={signe2}
            onChange={(e) => setSigne2(e.target.value as Signe)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {ALL_SIGNES.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.emoji} {s.nom}
              </option>
            ))}
          </select>
        </div>

        {/* Info rapide */}
        <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
          <p className="text-xs font-semibold text-pink-600 uppercase tracking-wide mb-3">
            Conseil
          </p>
          <p className="text-sm text-pink-700">
            Essayez aussi avec vos ascendants et Lunes pour une analyse plus
            précise de votre compatibilité réelle.
          </p>
        </div>
      </div>

      {/* Résultat principal - Colonne droite */}
      <div className="lg:col-span-2">
        {/* Carte principale avec gradient rose */}
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-8 text-white mb-8 shadow-lg">
          <p className="text-sm uppercase tracking-wider font-semibold opacity-90">
            Compatibilité amoureuse
          </p>

          <div className="flex items-center justify-between mt-6 mb-8">
            <div className="text-center flex-1">
              <p className="text-5xl font-bold">💕</p>
              <p className="text-lg font-semibold mt-2">{resultat.signe1}</p>
            </div>

            <div className="text-center mx-4">
              <p className="text-6xl font-bold">{resultat.pourcentage}</p>
              <p className="text-sm opacity-90 mt-1">% compatible</p>
            </div>

            <div className="text-center flex-1">
              <p className="text-5xl font-bold">💕</p>
              <p className="text-lg font-semibold mt-2">{resultat.signe2}</p>
            </div>
          </div>

          {/* Jauge */}
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${gaugeColor} transition-all duration-500`}
              style={{ width: `${resultat.pourcentage}%` }}
            ></div>
          </div>
        </div>

        {/* Niveau de compatibilité */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {resultat.niveau}
          </h3>
          <p className={`text-sm font-semibold ${textColorLabel} mb-3`}>
            Score: {resultat.pourcentage}/100
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            {resultat.description}
          </p>
        </div>

        {/* Raison */}
        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-bold text-blue-900 mb-3">Pourquoi ?</h3>
          <p className="text-sm text-blue-800 leading-relaxed">
            {resultat.raison}
          </p>
        </div>

        {/* Forces */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Points forts du couple
          </h3>
          <div className="space-y-3">
            {resultat.forces.map((force, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="text-xl mt-0.5">✨</div>
                <p className="text-slate-700 text-sm">{force}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Défis */}
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-amber-900 mb-4">
            Défis à relever
          </h3>
          <div className="space-y-3">
            {resultat.defis.map((defi, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="text-xl mt-0.5">⚡</div>
                <p className="text-amber-800 text-sm">{defi}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
