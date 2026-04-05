"use client";
import { useState, useMemo } from "react";

export default function CalculateurDureeEntreDates() {
  const today = new Date();
  const [dateDebut, setDateDebut] = useState<string>(today.toISOString().split("T")[0]);
  const [dateFin, setDateFin] = useState<string>("");

  const resultat = useMemo(() => {
    const debut = new Date(dateDebut);
    const fin = dateFin ? new Date(dateFin) : today;
    if (isNaN(debut.getTime()) || isNaN(fin.getTime())) return null;

    const d1 = debut < fin ? debut : fin;
    const d2 = debut < fin ? fin : debut;

    const diffMs = d2.getTime() - d1.getTime();
    const totalJours = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalSemaines = Math.floor(totalJours / 7);
    const totalHeures = totalJours * 24;
    const totalMinutes = totalHeures * 60;

    // Calcul annees/mois/jours
    let annees = d2.getFullYear() - d1.getFullYear();
    let mois = d2.getMonth() - d1.getMonth();
    let jours = d2.getDate() - d1.getDate();

    if (jours < 0) {
      mois--;
      const moisPrec = new Date(d2.getFullYear(), d2.getMonth(), 0);
      jours += moisPrec.getDate();
    }
    if (mois < 0) {
      annees--;
      mois += 12;
    }

    // Jours ouvres (approximation)
    let ouvres = 0;
    const current = new Date(d1);
    while (current < d2) {
      const dow = current.getDay();
      if (dow !== 0 && dow !== 6) ouvres++;
      current.setDate(current.getDate() + 1);
    }

    return { annees, mois, jours, totalJours, totalSemaines, totalHeures, totalMinutes, ouvres, d1, d2 };
  }, [dateDebut, dateFin]);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Date de debut</label>
            <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Date de fin (vide = aujourd&apos;hui)</label>
            <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all" />
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-400 mb-2">Raccourcis</p>
          <div className="flex flex-wrap gap-2">
            {[
              { l: "Noel 2026", d: "2026-12-25" },
              { l: "Nouvel an", d: "2027-01-01" },
              { l: "Ete 2026", d: "2026-06-21" },
              { l: "14 juillet", d: "2026-07-14" },
              { l: "Rentree", d: "2026-09-01" },
            ].map((r) => (
              <button key={r.l} onClick={() => { setDateDebut(today.toISOString().split("T")[0]); setDateFin(r.d); }}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-fuchsia-300 hover:text-fuchsia-600 hover:bg-fuchsia-50/50 transition-all">
                {r.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {resultat ? (
          <>
            <div className="bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white rounded-2xl p-6 shadow-lg shadow-fuchsia-200/50">
              <p className="text-fuchsia-200 text-sm mb-1">Duree</p>
              <p className="text-3xl font-extrabold tracking-tight">
                {resultat.annees > 0 && `${resultat.annees} an${resultat.annees > 1 ? "s" : ""} `}
                {resultat.mois > 0 && `${resultat.mois} mois `}
                {resultat.jours} jour{resultat.jours > 1 ? "s" : ""}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-xs text-slate-400">Jours</p>
                <p className="text-lg font-bold text-slate-800">{resultat.totalJours.toLocaleString("fr-FR")}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-xs text-slate-400">Semaines</p>
                <p className="text-lg font-bold text-slate-800">{resultat.totalSemaines.toLocaleString("fr-FR")}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-xs text-slate-400">Heures</p>
                <p className="text-lg font-bold text-slate-800">{resultat.totalHeures.toLocaleString("fr-FR")}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-xs text-slate-400">Jours ouvres</p>
                <p className="text-lg font-bold text-slate-800">{resultat.ouvres.toLocaleString("fr-FR")}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-2">Toutes les conversions</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">Minutes</span><span className="font-bold text-slate-800">{resultat.totalMinutes.toLocaleString("fr-FR")}</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Heures</span><span className="font-bold text-slate-800">{resultat.totalHeures.toLocaleString("fr-FR")}</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Jours</span><span className="font-bold text-slate-800">{resultat.totalJours.toLocaleString("fr-FR")}</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Semaines</span><span className="font-bold text-slate-800">{resultat.totalSemaines.toLocaleString("fr-FR")}</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Mois (approx)</span><span className="font-bold text-slate-800">{(resultat.totalJours / 30.44).toFixed(1)}</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Annees (approx)</span><span className="font-bold text-slate-800">{(resultat.totalJours / 365.25).toFixed(2)}</span></div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-6 text-center"><p className="text-slate-400 text-sm">Selectionnez les dates</p></div>
        )}
      </div>
    </div>
  );
}
