"use client";

import { useState } from "react";
import { calculerCombine } from "./pariCombineCalc";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtPct(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export default function CalculateurPariCombine() {
  const [mise, setMise] = useState<string>("10");
  const [cotes, setCotes] = useState<string[]>(["1.40", "1.55", "1.30"]);

  const miseNum = parseFloat(mise) || 0;
  const cotesNum = cotes.map((c) => parseFloat(c) || 0);

  const resultat = calculerCombine(miseNum, cotesNum);

  const ajouterSelection = () => {
    if (cotes.length < 10) {
      setCotes([...cotes, "1.50"]);
    }
  };

  const retirerSelection = (index: number) => {
    setCotes(cotes.filter((_, i) => i !== index));
  };

  const mettreAJourCote = (index: number, valeur: string) => {
    const nouvellesCotes = [...cotes];
    nouvellesCotes[index] = valeur;
    setCotes(nouvellesCotes);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Mise */}
        <div className="mb-6">
          <label
            htmlFor="mise-combine"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Mise initiale
          </label>
          <div className="relative">
            <input
              id="mise-combine"
              type="number"
              value={mise}
              onChange={(e) => setMise(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              min="0"
              step="1"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
        </div>

        {/* Selections */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-slate-600">
              Sélections ({resultat.nbSelections} cotes)
            </label>
            {cotes.length < 10 && (
              <button
                onClick={ajouterSelection}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 px-2 py-1 rounded-lg hover:bg-indigo-50 transition-all"
              >
                + Ajouter sélection
              </button>
            )}
          </div>
          <div className="space-y-2">
            {cotes.map((cote, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-400 w-6">
                  {i + 1}.
                </span>
                <input
                  type="number"
                  value={cote}
                  onChange={(e) => mettreAJourCote(i, e.target.value)}
                  className="flex-1 border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  min="0.01"
                  step="0.01"
                  placeholder="1.40"
                />
                {cotes.length > 2 && (
                  <button
                    onClick={() => retirerSelection(i)}
                    className="text-xs font-semibold text-red-600 hover:text-red-700 px-3 py-2.5 rounded-lg hover:bg-red-50 transition-all"
                  >
                    Retirer
                  </button>
                )}
              </div>
            ))}
          </div>
          {cotes.length === 10 && (
            <p className="text-xs text-amber-600 mt-2">
              Maximum 10 sélections atteint
            </p>
          )}
        </div>

        {/* Tableau recapitulatif */}
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Résumé par sélection
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 px-2 text-slate-500 font-semibold">
                    Sél.
                  </th>
                  <th className="text-right py-2 px-2 text-slate-500 font-semibold">
                    Cote
                  </th>
                  <th className="text-right py-2 px-2 text-slate-500 font-semibold">
                    Cote cumulative
                  </th>
                </tr>
              </thead>
              <tbody>
                {resultat.cotes.map((cote, i) => {
                  let cumulative = 1;
                  for (let j = 0; j <= i; j++) {
                    cumulative *= resultat.cotes[j];
                  }
                  return (
                    <tr key={i} className="border-b border-slate-100">
                      <td className="py-2 px-2 font-medium text-slate-700">
                        {i + 1}
                      </td>
                      <td className="py-2 px-2 text-right text-slate-600">
                        {fmt(cote)}
                      </td>
                      <td className="py-2 px-2 text-right font-semibold text-indigo-600">
                        {fmt(cumulative)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl p-6 shadow-lg shadow-indigo-200/50">
          <p className="text-sm text-indigo-100 mb-1">Gain total</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(resultat.gainTotal)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Mise</span>
              <span className="text-lg font-bold text-slate-800">
                {fmt(resultat.mise)} EUR
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Cote totale</span>
              <span className="text-lg font-bold text-indigo-600">
                {fmt(resultat.coteTotale)}
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">
                Bénéfice net
              </span>
              <span className="text-lg font-extrabold text-slate-800">
                {fmt(resultat.beneficeNet)} EUR
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">
                Probabilité implicite
              </span>
              <span className="text-lg font-bold text-slate-800">
                {fmtPct(resultat.probaImplicite)} %
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">
                Nombre de sélections
              </span>
              <span className="text-lg font-bold text-slate-800">
                {resultat.nbSelections}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Outil pédagogique de calcul. Pas de conseil de pari. Voir les
          conditions de votre opérateur agréé.
        </div>
      </div>
    </div>
  );
}
