"use client";

import { useState, useMemo } from "react";
import { ALIMENTS, calculerInflammation, type Frequence } from "./inflammationCalc";

const FREQ_LABELS: { value: Frequence; label: string }[] = [
  { value: 0, label: "Jamais" },
  { value: 0.25, label: "Rarement" },
  { value: 0.5, label: "Parfois" },
  { value: 0.75, label: "Souvent" },
  { value: 1, label: "Tres souvent" },
];

export default function CalculateurInflammation() {
  const [frequences, setFrequences] = useState<Record<string, Frequence>>({});

  const res = useMemo(() => calculerInflammation({ frequences }), [frequences]);

  const setFreq = (id: string, val: Frequence) => {
    setFrequences((prev) => ({ ...prev, [id]: val }));
  };

  const proAliments = ALIMENTS.filter((a) => a.categorie === "pro");
  const antiAliments = ALIMENTS.filter((a) => a.categorie === "anti");

  const couleurScore = res.categorie === "tres-anti" ? "from-emerald-500 to-teal-600"
    : res.categorie === "anti" ? "from-green-500 to-emerald-600"
    : res.categorie === "neutre" ? "from-slate-500 to-slate-600"
    : res.categorie === "pro" ? "from-orange-500 to-red-500"
    : "from-red-600 to-rose-700";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      {/* Resultat en haut */}
      <div className={`bg-gradient-to-br ${couleurScore} text-white rounded-2xl p-6 shadow-lg mb-6`}>
        <p className="text-white/80 text-sm mb-1">Score d&apos;inflammation alimentaire</p>
        <p className="text-5xl font-extrabold">{res.scoreTotal >= 0 ? "+" : ""}{res.scoreTotal.toFixed(1)}</p>
        <p className="text-white/90 mt-2 font-semibold">{res.label}</p>
        <p className="text-white/80 text-sm mt-1">{res.description}</p>
      </div>

      {/* Barre visuelle */}
      <div className="bg-slate-50 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <span>Anti-inflammatoire</span>
          <span className="flex-1 text-center">Neutre</span>
          <span>Pro-inflammatoire</span>
        </div>
        <div className="relative h-3 bg-gradient-to-r from-emerald-500 via-slate-300 to-red-500 rounded-full">
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-800 rounded-full shadow"
            style={{ left: `${((res.scoreTotal + 10) / 20) * 100}%`, transform: "translateX(-50%) translateY(-50%)" }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>-10</span>
          <span>0</span>
          <span>+10</span>
        </div>
      </div>

      {/* Questionnaire pro */}
      <h3 className="font-bold text-slate-800 mb-3">Aliments pro-inflammatoires</h3>
      <p className="text-sm text-slate-500 mb-4">Indiquez votre frequence de consommation :</p>
      <div className="space-y-3 mb-6">
        {proAliments.map((a) => (
          <div key={a.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <p className="flex-1 text-sm text-slate-700">{a.nom}</p>
            <div className="flex gap-1 flex-wrap">
              {FREQ_LABELS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFreq(a.id, f.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    (frequences[a.id] ?? 0) === f.value
                      ? "bg-red-500 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Questionnaire anti */}
      <h3 className="font-bold text-slate-800 mb-3">Aliments anti-inflammatoires</h3>
      <p className="text-sm text-slate-500 mb-4">Indiquez votre frequence de consommation :</p>
      <div className="space-y-3 mb-6">
        {antiAliments.map((a) => (
          <div key={a.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <p className="flex-1 text-sm text-slate-700">{a.nom}</p>
            <div className="flex gap-1 flex-wrap">
              {FREQ_LABELS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFreq(a.id, f.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    (frequences[a.id] ?? 0) === f.value
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Recommandations */}
      <div className="bg-slate-50 rounded-xl p-5">
        <p className="font-semibold text-slate-800 mb-3">Recommandations personnalisees</p>
        <ul className="text-sm text-slate-700 space-y-1.5">
          {res.recommandations.map((r, i) => <li key={i}>• {r}</li>)}
        </ul>
      </div>

      <p className="text-xs text-slate-400 mt-4 text-center">
        Score inspire du Dietary Inflammatory Index (Shivappa et al. 2014). Outil educatif, ne remplace pas un avis medical.
      </p>
    </div>
  );
}
