"use client";

import { useState } from "react";
import { calculerSigneChinois, ELEMENTS } from "./signeChinoisCalc";

export default function SigneAstrologiqueChinois() {
  const today = new Date();
  const defaultDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const [dateStr, setDateStr] = useState<string>(defaultDate);

  const dateObj = new Date(dateStr);
  const resultat = calculerSigneChinois(dateObj);

  const elementInfo = ELEMENTS[resultat.element];

  const elementBgColor: Record<string, string> = {
    Bois: "bg-green-50 border-green-200",
    Feu: "bg-red-50 border-red-200",
    Terre: "bg-amber-50 border-amber-200",
    Métal: "bg-slate-50 border-slate-200",
    Eau: "bg-blue-50 border-blue-200",
  };

  const elementTextColor: Record<string, string> = {
    Bois: "text-green-700",
    Feu: "text-red-700",
    Terre: "text-amber-700",
    Métal: "text-slate-700",
    Eau: "text-blue-700",
  };

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
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <p className="text-xs text-slate-500 mt-1">
            Signe change au Nouvel An lunaire (pas au 1er janvier)
          </p>
        </div>

        {/* Infos année */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
            Résumé
          </p>
          <p className="text-sm text-slate-700 mb-2">
            <strong>Année actuelle:</strong> {resultat.anneeNaissance}
          </p>
          <p className="text-sm text-slate-700 mb-2">
            <strong>Année chinoise:</strong> {resultat.anneeChinoise}
          </p>
          <p className="text-sm text-slate-700 font-semibold">
            <strong>Signe:</strong> {resultat.combinaison}
          </p>
        </div>
      </div>

      {/* Résultat principal */}
      <div className="lg:col-span-2">
        {/* Carte animal + élément */}
        <div className="bg-gradient-to-br from-rose-600 to-red-700 rounded-2xl p-8 text-white mb-8 shadow-lg">
          <p className="text-sm uppercase tracking-wider font-semibold opacity-90">
            Votre signe astrologique chinois
          </p>
          <div className="flex items-center gap-6 mt-6">
            <div className="text-7xl">{resultat.animalInfo.emoji}</div>
            <div>
              <h2 className="text-4xl font-bold">{resultat.animal}</h2>
              <p className="text-xl mt-2 font-semibold">{resultat.element}</p>
              <p className="text-rose-100 text-sm mt-3">
                Combinaison: {resultat.combinaison}
              </p>
            </div>
          </div>
        </div>

        {/* Traits de l&apos;animal */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Traits du {resultat.animal}
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            {resultat.animalInfo.traits.map((trait, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="text-2xl mt-0.5">{resultat.animalInfo.emoji}</div>
                <p className="text-slate-700 text-sm">{trait}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Traits de l&apos;élément */}
        <div
          className={`rounded-2xl border p-6 mb-8 shadow-sm ${elementBgColor[resultat.element]}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">{elementInfo.emoji}</div>
            <h3 className={`text-lg font-bold ${elementTextColor[resultat.element]}`}>
              Élément: {resultat.element}
            </h3>
          </div>
          <div className="grid gap-2">
            {elementInfo.traits.map((trait, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                <p className={`text-sm ${elementTextColor[resultat.element]}`}>
                  {trait}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Compatibilité (exemple) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Compatibilité amoureuse
          </h3>
          <p className="text-slate-600 text-sm mb-4">
            Les meilleurs signes pour s&apos;entendre avec le {resultat.animal}
          </p>
          <div className="grid gap-2">
            <p className="text-sm text-slate-700">
              <strong>Triades positives:</strong> Cherchez dans les ressources ci-dessous pour une compatibilité détaillée.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}