"use client";

import { useState } from "react";
import { calculerSigne, ELEMENTS_INFO } from "./signeZodiaqueCalc";

export default function CalculSigneZodiaque() {
  const today = new Date();
  const defaultDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const [dateStr, setDateStr] = useState<string>(defaultDate);

  const dateObj = new Date(dateStr);
  const resultat = calculerSigne(dateObj);
  const info = resultat.info;

  const elementInfo = ELEMENTS_INFO[info.element];

  const colorGradients: Record<string, string> = {
    Feu: "from-red-600 to-orange-700",
    Terre: "from-amber-600 to-yellow-700",
    Air: "from-cyan-600 to-blue-700",
    Eau: "from-blue-600 to-cyan-700",
  };

  const gradientClass = colorGradients[info.element] || "from-violet-600 to-purple-700";

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Formulaire */}
      <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-fit">
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Date de naissance
          </label>
          <input
            type="date"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <p className="text-xs text-slate-500 mt-1">
            Signe change entre le 19 et le 23 de chaque mois selon le zodiaque tropical.
          </p>
        </div>

        {/* Infos résumé */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">
            Résumé
          </p>
          <div className="space-y-2">
            <p className="text-sm text-slate-700">
              <strong>Élément:</strong> {info.element}
            </p>
            <p className="text-sm text-slate-700">
              <strong>Mode:</strong> {info.mode}
            </p>
            <p className="text-sm text-slate-700">
              <strong>Planète:</strong> {info.planete}
            </p>
            <p className="text-sm text-slate-700">
              <strong>Pierre:</strong> {info.pierre}
            </p>
          </div>
        </div>
      </div>

      {/* Résultat principal */}
      <div className="lg:col-span-2">
        {/* Carte signe */}
        <div
          className={`bg-gradient-to-br ${gradientClass} rounded-2xl p-8 text-white mb-8 shadow-lg`}
        >
          <p className="text-sm uppercase tracking-wider font-semibold opacity-90">
            Votre signe zodiaque
          </p>
          <div className="flex items-center gap-6 mt-6">
            <div className="text-7xl">{info.emoji}</div>
            <div>
              <h2 className="text-4xl font-bold">{info.nom}</h2>
              <p className="text-xl mt-2 font-semibold">
                {info.dateDebut} - {info.dateFin}
              </p>
              <p className="text-white/80 text-sm mt-3">
                {info.element} • {info.mode} • {info.planete}
              </p>
            </div>
          </div>
        </div>

        {/* Traits du signe */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Traits du {info.nom}
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            {info.traits.map((trait, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="text-2xl mt-0.5">{info.emoji}</div>
                <p className="text-slate-700 text-sm">{trait}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Élément */}
        <div className={`bg-gradient-to-br ${colorGradients[info.element]} rounded-2xl p-6 text-white mb-8 shadow-lg`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">{elementInfo.emoji}</div>
            <h3 className="text-lg font-bold">
              Élément: {info.element}
            </h3>
          </div>
          <div className="grid gap-2">
            {elementInfo.traits.map((trait, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
                <p className="text-sm text-white/90">
                  {trait}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Planète */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Planète dominante
          </h3>
          <p className="text-slate-600 text-sm mb-3">
            {info.planete} régit le signe du {info.nom}.
          </p>
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-700 leading-relaxed">
              Cette planète apporte les qualités et défis spécifiques du signe. Elle influence votre personnalité, vos motivations et votre approche de la vie.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
