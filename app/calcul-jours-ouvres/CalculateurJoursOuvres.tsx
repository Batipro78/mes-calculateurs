"use client";
import { useState, useMemo } from "react";
import { paquesGregorien } from "../calcul-date-paques/paquesCalc";

const MOIS_NOMS = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
const MOIS_MIN = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];

function decaler(date: Date, jours: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + jours);
  return d;
}

// Les 11 jours feries legaux en France metropolitaine, pour n'importe quelle annee
function joursFeries(annee: number): { date: Date; nom: string }[] {
  const paques = paquesGregorien(annee);
  return [
    { date: new Date(annee, 0, 1), nom: "Jour de l'an" },
    { date: decaler(paques, 1), nom: "Lundi de Paques" },
    { date: new Date(annee, 4, 1), nom: "Fete du travail" },
    { date: new Date(annee, 4, 8), nom: "Victoire 1945" },
    { date: decaler(paques, 39), nom: "Ascension" },
    { date: decaler(paques, 50), nom: "Lundi de Pentecote" },
    { date: new Date(annee, 6, 14), nom: "Fete nationale" },
    { date: new Date(annee, 7, 15), nom: "Assomption" },
    { date: new Date(annee, 10, 1), nom: "Toussaint" },
    { date: new Date(annee, 10, 11), nom: "Armistice" },
    { date: new Date(annee, 11, 25), nom: "Noel" },
  ];
}

const cacheFeries = new Map<number, Set<string>>();
const cle = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

function isJourFerie(date: Date): boolean {
  const annee = date.getFullYear();
  if (!cacheFeries.has(annee)) cacheFeries.set(annee, new Set(joursFeries(annee).map((jf) => cle(jf.date))));
  return cacheFeries.get(annee)!.has(cle(date));
}

function isWeekend(date: Date): boolean {
  return date.getDay() === 0 || date.getDay() === 6;
}

// "AAAA-MM-JJ" lu en heure locale : new Date("AAAA-MM-JJ") le lit en UTC, ce qui faisait
// sauter le dernier jour d'une periode qui passe de l'heure d'ete a l'heure d'hiver.
function lireDate(s: string): Date {
  const [a, m, j] = s.split("-").map(Number);
  return new Date(a, m - 1, j);
}

function ecrireDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
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

export default function CalculateurJoursOuvres() {
  const today = new Date();
  const anneeCourante = today.getFullYear();
  const [dateDebut, setDateDebut] = useState<string>(ecrireDate(today));
  const [dateFin, setDateFin] = useState<string>(
    ecrireDate(new Date(today.getFullYear(), today.getMonth() + 1, 0))
  );
  const [mode, setMode] = useState<"periode" | "mois">("periode");
  const [annee, setAnnee] = useState<number>(anneeCourante);

  const resultat = useMemo(() => {
    if (mode === "periode") {
      if (!dateDebut || !dateFin) return null;
      const debut = lireDate(dateDebut);
      const fin = lireDate(dateFin);
      if (isNaN(debut.getTime()) || isNaN(fin.getTime()) || debut > fin) return null;
      return compterJoursOuvres(debut, fin);
    }
    return null;
  }, [dateDebut, dateFin, mode]);

  // Jours ouvres par mois de l'annee choisie
  const moisData = useMemo(() => {
    return Array.from({ length: 12 }, (_, m) => {
      const debut = new Date(annee, m, 1);
      const fin = new Date(annee, m + 1, 0);
      const data = compterJoursOuvres(debut, fin);
      return { mois: MOIS_NOMS[m], ...data };
    });
  }, [annee]);

  const totalOuvres = moisData.reduce((acc, m) => acc + m.ouvres, 0);

  // Feries affiches : annee choisie (par mois) ou annee de la date de debut (par periode)
  const anneeDebut = dateDebut ? lireDate(dateDebut).getFullYear() : NaN;
  const anneeFeries = mode === "mois" ? annee : isNaN(anneeDebut) ? anneeCourante : anneeDebut;
  const listeFeries = joursFeries(anneeFeries);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex gap-2 mb-6">
          {[
            { v: "periode" as const, label: "Par periode" },
            { v: "mois" as const, label: "Par mois" },
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
          <>
          <div className="flex gap-2 mb-4">
            {[anneeCourante, anneeCourante + 1].map((a) => (
              <button key={a} onClick={() => setAnnee(a)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${annee === a ? "bg-indigo-500 text-white shadow-sm" : "border border-slate-200 text-slate-600 hover:border-indigo-300"}`}>
                {a}
              </button>
            ))}
          </div>
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
                  <td className="py-2.5 px-2 font-bold text-slate-800">Total {annee}</td>
                  <td className="py-2.5 px-2 text-right font-bold text-indigo-600">{totalOuvres}</td>
                  <td className="py-2.5 px-2 text-right font-bold text-slate-700">{moisData.reduce((a, m) => a + m.calendaires, 0)}</td>
                  <td className="py-2.5 px-2 text-right font-bold text-slate-700">{moisData.reduce((a, m) => a + m.feries, 0)}</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-slate-400 mt-3">Colonne Feries : jours feries tombant du lundi au vendredi (ceux du week-end ne retirent aucun jour ouvre).</p>
          </div>
          </>
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
            <p className="text-indigo-200 text-sm mb-1">Total {annee}</p>
            <p className="text-4xl font-extrabold tracking-tight">{totalOuvres} <span className="text-xl font-semibold">jours ouvres</span></p>
          </div>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-6 text-center"><p className="text-slate-400 text-sm">Selectionnez des dates valides</p></div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs text-slate-400 mb-2">Jours feries {anneeFeries}</p>
          <div className="space-y-1 text-sm">
            {listeFeries.map((jf) => (
              <div key={jf.nom} className="flex justify-between text-slate-600">
                <span>{jf.nom}</span>
                <span className="text-slate-400 text-xs">{jf.date.getDate() === 1 ? "1er" : jf.date.getDate()} {MOIS_MIN[jf.date.getMonth()]}</span>
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
