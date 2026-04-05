"use client";
import { useState, useMemo } from "react";

// Jours feries France 2026
const JOURS_FERIES_2026 = [
  new Date(2026, 0, 1),   // Jour de l'an
  new Date(2026, 3, 6),   // Lundi de Paques
  new Date(2026, 4, 1),   // Fete du travail
  new Date(2026, 4, 8),   // Victoire 1945
  new Date(2026, 4, 14),  // Ascension
  new Date(2026, 4, 25),  // Lundi de Pentecote
  new Date(2026, 6, 14),  // Fete nationale
  new Date(2026, 7, 15),  // Assomption
  new Date(2026, 10, 1),  // Toussaint
  new Date(2026, 10, 11), // Armistice
  new Date(2026, 11, 25), // Noel
];

function isJourFerie(date: Date): boolean {
  return JOURS_FERIES_2026.some((jf) => jf.getDate() === date.getDate() && jf.getMonth() === date.getMonth() && jf.getFullYear() === date.getFullYear());
}

function isWeekend(date: Date): boolean {
  return date.getDay() === 0 || date.getDay() === 6;
}

function compterJoursOuvres(debut: Date, fin: Date): { ouvres: number; calendaires: number; feries: number; weekends: number } {
  let ouvres = 0, calendaires = 0, feries = 0, weekends = 0;
  const current = new Date(debut);
  while (current <= fin) {
    calendaires++;
    if (isWeekend(current)) {
      weekends++;
    } else if (isJourFerie(current)) {
      feries++;
    } else {
      ouvres++;
    }
    current.setDate(current.getDate() + 1);
  }
  return { ouvres, calendaires, feries, weekends };
}

const MOIS_NOMS = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];

export default function CalculateurJoursOuvres() {
  const today = new Date();
  const [dateDebut, setDateDebut] = useState<string>(today.toISOString().split("T")[0]);
  const [dateFin, setDateFin] = useState<string>(
    new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split("T")[0]
  );
  const [mode, setMode] = useState<"periode" | "mois">("periode");

  const resultat = useMemo(() => {
    if (mode === "periode") {
      const debut = new Date(dateDebut);
      const fin = new Date(dateFin);
      if (isNaN(debut.getTime()) || isNaN(fin.getTime()) || debut > fin) return null;
      return compterJoursOuvres(debut, fin);
    }
    return null;
  }, [dateDebut, dateFin, mode]);

  // Jours ouvres par mois 2026
  const moisData = useMemo(() => {
    return Array.from({ length: 12 }, (_, m) => {
      const debut = new Date(2026, m, 1);
      const fin = new Date(2026, m + 1, 0);
      const data = compterJoursOuvres(debut, fin);
      return { mois: MOIS_NOMS[m], ...data };
    });
  }, []);

  const totalOuvres2026 = moisData.reduce((acc, m) => acc + m.ouvres, 0);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex gap-2 mb-6">
          {[
            { v: "periode" as const, label: "Par periode" },
            { v: "mois" as const, label: "Par mois 2026" },
          ].map((o) => (
            <button key={o.v} onClick={() => setMode(o.v)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${mode === o.v ? "bg-indigo-500 text-white shadow-sm" : "border border-slate-200 text-slate-600 hover:border-indigo-300"}`}>
              {o.label}
            </button>
          ))}
        </div>

        {mode === "periode" && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Date de debut</label>
              <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Date de fin</label>
              <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
            </div>
          </div>
        )}

        {mode === "mois" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Mois</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Jours ouvres</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Calendaires</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Feries</th>
              </tr></thead>
              <tbody>
                {moisData.map((m) => (
                  <tr key={m.mois} className="border-b border-slate-100">
                    <td className="py-2.5 px-2 font-medium text-slate-700">{m.mois}</td>
                    <td className="py-2.5 px-2 text-right font-bold text-indigo-600">{m.ouvres}</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{m.calendaires}</td>
                    <td className="py-2.5 px-2 text-right text-slate-500">{m.feries}</td>
                  </tr>
                ))}
                <tr className="bg-indigo-50/50">
                  <td className="py-2.5 px-2 font-bold text-slate-800">Total 2026</td>
                  <td className="py-2.5 px-2 text-right font-bold text-indigo-600">{totalOuvres2026}</td>
                  <td className="py-2.5 px-2 text-right font-bold text-slate-700">365</td>
                  <td className="py-2.5 px-2 text-right font-bold text-slate-700">{moisData.reduce((a, m) => a + m.feries, 0)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="lg:col-span-2 space-y-4">
        {mode === "periode" && resultat ? (
          <>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg shadow-indigo-200/50">
              <p className="text-indigo-200 text-sm mb-1">Jours ouvres</p>
              <p className="text-4xl font-extrabold tracking-tight">{resultat.ouvres} <span className="text-xl font-semibold">jours</span></p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-xs text-slate-400">Calendaires</p>
                <p className="text-lg font-bold text-slate-800">{resultat.calendaires}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-xs text-slate-400">Week-ends</p>
                <p className="text-lg font-bold text-slate-800">{resultat.weekends}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-xs text-slate-400">Feries</p>
                <p className="text-lg font-bold text-slate-800">{resultat.feries}</p>
              </div>
            </div>
          </>
        ) : mode === "mois" ? (
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg shadow-indigo-200/50">
            <p className="text-indigo-200 text-sm mb-1">Total 2026</p>
            <p className="text-4xl font-extrabold tracking-tight">{totalOuvres2026} <span className="text-xl font-semibold">jours ouvres</span></p>
          </div>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-6 text-center"><p className="text-slate-400 text-sm">Selectionnez des dates valides</p></div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs text-slate-400 mb-2">Jours feries 2026</p>
          <div className="space-y-1 text-sm">
            {[
              { d: "1er janvier", n: "Jour de l'an" }, { d: "6 avril", n: "Lundi de Paques" },
              { d: "1er mai", n: "Fete du travail" }, { d: "8 mai", n: "Victoire 1945" },
              { d: "14 mai", n: "Ascension" }, { d: "25 mai", n: "Lundi de Pentecote" },
              { d: "14 juillet", n: "Fete nationale" }, { d: "15 aout", n: "Assomption" },
              { d: "1er novembre", n: "Toussaint" }, { d: "11 novembre", n: "Armistice" },
              { d: "25 decembre", n: "Noel" },
            ].map((jf) => (
              <div key={jf.n} className="flex justify-between text-slate-600">
                <span>{jf.n}</span>
                <span className="text-slate-400 text-xs">{jf.d}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-xs font-medium text-slate-400 mb-2">Definitions</p>
          <div className="space-y-1 text-sm text-slate-600">
            <p><strong>Jour ouvre</strong> : lundi au vendredi hors feries</p>
            <p><strong>Jour ouvrable</strong> : lundi au samedi hors feries</p>
            <p><strong>Jour calendaire</strong> : tous les jours</p>
          </div>
        </div>
      </div>
    </div>
  );
}
