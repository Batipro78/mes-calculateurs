"use client";

import { useState, useMemo } from "react";
import { calculerGrossesse, CAT_LABELS, type TypeGrossesse } from "./grossesseCalc";

export default function CalculateurGrossesse() {
  const [poidsAvant, setPoidsAvant] = useState(60);
  const [taille, setTaille] = useState(165);
  const [semaines, setSemaines] = useState(20);
  const [poidsActuel, setPoidsActuel] = useState(65);
  const [typeGrossesse, setTypeGrossesse] = useState<TypeGrossesse>("simple");

  const res = useMemo(
    () => calculerGrossesse({ poidsAvant, taille, semainesAmenorrhee: semaines, poidsActuel, typeGrossesse }),
    [poidsAvant, taille, semaines, poidsActuel, typeGrossesse]
  );

  const couleur = res.verdict === "normale" ? "from-emerald-500 to-teal-600"
    : res.verdict === "faible" ? "from-sky-500 to-blue-600"
    : "from-amber-500 to-orange-600";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2 mb-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Poids avant grossesse</label>
          <div className="relative">
            <input type="number" step="0.1" value={poidsAvant} onChange={(e) => setPoidsAvant(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-pink-400" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">kg</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Taille</label>
          <div className="relative">
            <input type="number" value={taille} onChange={(e) => setTaille(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-pink-400" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">cm</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Semaines d&apos;amenorrhee (SA)</label>
          <input type="number" value={semaines} onChange={(e) => setSemaines(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-pink-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Poids actuel</label>
          <div className="relative">
            <input type="number" step="0.1" value={poidsActuel} onChange={(e) => setPoidsActuel(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-pink-400" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">kg</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Type grossesse</label>
          <select value={typeGrossesse} onChange={(e) => setTypeGrossesse(e.target.value as TypeGrossesse)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-pink-400 bg-white">
            <option value="simple">Simple (1 bebe)</option>
            <option value="gemellaire">Gemellaire (jumeaux)</option>
          </select>
        </div>
      </div>

      <div className={`bg-gradient-to-br ${couleur} text-white rounded-2xl p-6 shadow-lg mb-5`}>
        <p className="text-white/80 text-sm mb-1">Prise de poids actuelle</p>
        <p className="text-5xl font-extrabold">{res.priseActuelle >= 0 ? "+" : ""}{res.priseActuelle.toFixed(1)} <span className="text-2xl font-semibold">kg</span></p>
        <p className="text-white/90 mt-2 text-sm">{res.messageVerdict}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 mb-4">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Votre IMC avant grossesse</p>
          <p className="text-xl font-bold text-slate-800">{res.imcAvant.toFixed(1)}</p>
          <p className="text-xs text-slate-400 mt-1">{CAT_LABELS[res.categorieIMC]}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Prise totale recommandee (fin grossesse)</p>
          <p className="text-xl font-bold text-pink-600">+{res.priseRecommandeeMin} a +{res.priseRecommandeeMax} kg</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Fourchette attendue a {semaines} SA</p>
          <p className="text-xl font-bold text-emerald-600">+{res.priseAttendueMin.toFixed(1)} a +{res.priseAttendueMax.toFixed(1)} kg</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Poids attendu a terme</p>
          <p className="text-xl font-bold text-slate-800">{(poidsAvant + res.priseRecommandeeMin).toFixed(1)} a {(poidsAvant + res.priseRecommandeeMax).toFixed(1)} kg</p>
        </div>
      </div>

      {/* Courbe */}
      <div className="bg-slate-50 rounded-xl p-5 mb-4">
        <p className="font-semibold text-slate-800 mb-3">Courbe de prise de poids recommandee</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-2 text-slate-500 font-medium">Semaines (SA)</th>
              <th className="text-right py-2 text-slate-500 font-medium">Prise min</th>
              <th className="text-right py-2 text-slate-500 font-medium">Prise max</th>
            </tr>
          </thead>
          <tbody>
            {res.courbe.filter(c => c.semaine > 0).map((c) => (
              <tr key={c.semaine} className={`border-b border-slate-100 ${Math.abs(c.semaine - semaines) < 2 ? "bg-pink-50" : ""}`}>
                <td className="py-1.5 text-slate-700">{c.semaine} SA</td>
                <td className="py-1.5 text-right text-slate-600">+{c.min.toFixed(1)} kg</td>
                <td className="py-1.5 text-right text-slate-600">+{c.max.toFixed(1)} kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-400 text-center">
        Recommandations Institute of Medicine (IOM) 2009. Chaque grossesse est unique — consultez votre sage-femme ou gynecologue.
      </p>
    </div>
  );
}
