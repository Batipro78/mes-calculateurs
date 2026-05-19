"use client";

import { useState } from "react";
import { getFetesAnnee, formatDateFR, formatDateCourte, getProchaineFete, type Fete } from "./fetesCatholiquesCalc";

export default function CalculFetesCatholiques() {
  const currentYear = new Date().getFullYear();
  const [annee, setAnnee] = useState<string>(currentYear.toString());

  const anneeNum = parseInt(annee) || currentYear;
  const fetes = getFetesAnnee(anneeNum);
  const { fete: prochaineFete, joursRestants } = getProchaineFete(anneeNum);

  const fetesMobiles = fetes.filter((f) => f.type === "mobile");
  const fetesFixes = fetes.filter((f) => f.type === "fixe");

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Formulaire - 1 col */}
      <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-fit">
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-600 mb-2">Année</label>
          <input
            type="number"
            value={annee}
            onChange={(e) => setAnnee(e.target.value)}
            min="1900"
            max="2099"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <p className="text-xs text-slate-500 mt-1">1900 - 2099</p>
        </div>

        {/* Prochaine fête */}
        {prochaineFete && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">Prochaine fête</p>
            <p className="text-sm font-bold text-amber-900">{prochaineFete.nom}</p>
            <p className="text-2xl font-bold text-amber-900 mt-2">{joursRestants > 0 ? joursRestants : 0}<span className="text-sm ml-1 font-medium">jours</span></p>
            <p className="text-xs text-amber-700 mt-2">{formatDateCourte(prochaineFete.date)}</p>
          </div>
        )}
      </div>

      {/* Résultats - 2 cols */}
      <div className="lg:col-span-2 space-y-8">
        {/* Fêtes mobiles */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 overflow-x-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full"></span>
            Fêtes mobiles {anneeNum}
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Fête</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Date</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium text-xs">Description</th>
              </tr>
            </thead>
            <tbody>
              {fetesMobiles.map((fete, idx) => (
                <tr key={idx} className={`border-b border-slate-100 ${fete.importance === "majeure" ? "hover:bg-amber-50" : "hover:bg-slate-50"}`}>
                  <td className={`py-3 px-2 font-semibold ${fete.importance === "majeure" ? "text-amber-700" : "text-slate-700"}`}>{fete.nom}</td>
                  <td className="py-3 px-2 text-slate-600 font-mono">{formatDateFR(fete.date)}</td>
                  <td className="py-3 px-2 text-slate-500 text-xs">{fete.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fêtes fixes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 overflow-x-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-slate-400 rounded-full"></span>
            Fêtes fixes {anneeNum}
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Fête</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Date</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium text-xs">Description</th>
              </tr>
            </thead>
            <tbody>
              {fetesFixes.map((fete, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-2 font-semibold text-slate-700">{fete.nom}</td>
                  <td className="py-3 px-2 text-slate-600 font-mono">{formatDateFR(fete.date)}</td>
                  <td className="py-3 px-2 text-slate-500 text-xs">{fete.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
