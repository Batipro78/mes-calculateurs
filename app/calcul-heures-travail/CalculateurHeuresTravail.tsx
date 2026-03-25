"use client";

import { useState } from "react";

type Mode = "journee" | "semaine" | "heures-sup";

interface Journee {
  jour: string;
  debut: string;
  fin: string;
  pauseMin: string;
  actif: boolean;
}

function timeToMinutes(t: string): number {
  if (!t) return 0;
  const [h, m] = t.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

function minutesToHM(min: number): string {
  const h = Math.floor(Math.abs(min) / 60);
  const m = Math.abs(min) % 60;
  const sign = min < 0 ? "-" : "";
  return `${sign}${h}h${m.toString().padStart(2, "0")}`;
}

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const JOURS_DEFAUT: Journee[] = [
  { jour: "Lundi", debut: "09:00", fin: "17:30", pauseMin: "60", actif: true },
  { jour: "Mardi", debut: "09:00", fin: "17:30", pauseMin: "60", actif: true },
  { jour: "Mercredi", debut: "09:00", fin: "17:30", pauseMin: "60", actif: true },
  { jour: "Jeudi", debut: "09:00", fin: "17:30", pauseMin: "60", actif: true },
  { jour: "Vendredi", debut: "09:00", fin: "17:30", pauseMin: "60", actif: true },
  { jour: "Samedi", debut: "", fin: "", pauseMin: "0", actif: false },
  { jour: "Dimanche", debut: "", fin: "", pauseMin: "0", actif: false },
];

export default function CalculateurHeuresTravail() {
  const [mode, setMode] = useState<Mode>("semaine");
  const [jours, setJours] = useState<Journee[]>(JOURS_DEFAUT);
  const [tauxHoraire, setTauxHoraire] = useState("12");

  // Mode journee simple
  const [debutJ, setDebutJ] = useState("09:00");
  const [finJ, setFinJ] = useState("17:30");
  const [pauseJ, setPauseJ] = useState("60");

  // Mode heures sup
  const [heuresContrat, setHeuresContrat] = useState("35");
  const [heuresReelles, setHeuresReelles] = useState("42");
  const [majorationSup, setMajorationSup] = useState("25");

  const updateJour = (idx: number, field: keyof Journee, val: string | boolean) => {
    setJours(jours.map((j, i) => (i === idx ? { ...j, [field]: val } : j)));
  };

  // Calculs mode journee
  const minutesJournee =
    timeToMinutes(finJ) - timeToMinutes(debutJ) - (parseInt(pauseJ) || 0);

  // Calculs mode semaine
  const detailSemaine = jours.map((j) => {
    if (!j.actif || !j.debut || !j.fin) return { ...j, minutes: 0 };
    const min =
      timeToMinutes(j.fin) - timeToMinutes(j.debut) - (parseInt(j.pauseMin) || 0);
    return { ...j, minutes: Math.max(0, min) };
  });
  const totalMinutesSemaine = detailSemaine.reduce(
    (acc, j) => acc + j.minutes,
    0
  );
  const joursActifs = detailSemaine.filter((j) => j.actif && j.minutes > 0).length;
  const moyenneMinutesJour =
    joursActifs > 0 ? totalMinutesSemaine / joursActifs : 0;

  // Calculs mode heures sup
  const hContrat = parseFloat(heuresContrat) || 0;
  const hReelles = parseFloat(heuresReelles) || 0;
  const hSup = Math.max(0, hReelles - hContrat);
  const majoration = parseFloat(majorationSup) || 25;
  const tauxH = parseFloat(tauxHoraire) || 0;
  const montantNormal = hContrat * tauxH;
  const montantSup = hSup * tauxH * (1 + majoration / 100);
  const montantTotal = montantNormal + montantSup;

  // Salaire semaine
  const heuresSemaine = totalMinutesSemaine / 60;
  const salaireSemaine = heuresSemaine * tauxH;
  const salaireMois = salaireSemaine * 4.33;

  const MODES: { id: Mode; label: string; desc: string }[] = [
    { id: "journee", label: "Journee", desc: "Heures d'une journee" },
    { id: "semaine", label: "Semaine", desc: "Planning hebdomadaire" },
    { id: "heures-sup", label: "Heures sup", desc: "Calcul supplementaires" },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Selecteur mode */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Type de calcul
          </label>
          <div className="grid grid-cols-3 gap-2">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  mode === m.id
                    ? "border-amber-500 bg-amber-50/50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <span className="text-sm font-bold text-slate-800">
                  {m.label}
                </span>
                <span className="block text-xs text-slate-400">{m.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mode journee */}
        {mode === "journee" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Heure de debut
                </label>
                <input
                  type="time"
                  value={debutJ}
                  onChange={(e) => setDebutJ(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Heure de fin
                </label>
                <input
                  type="time"
                  value={finJ}
                  onChange={(e) => setFinJ(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Pause (minutes)
              </label>
              <div className="flex gap-2">
                {["0", "30", "45", "60", "90"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setPauseJ(v)}
                    className={`flex-1 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                      pauseJ === v
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-slate-200 text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    {v} min
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mode semaine */}
        {mode === "semaine" && (
          <div className="space-y-2">
            {jours.map((j, idx) => (
              <div
                key={j.jour}
                className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                  j.actif
                    ? "border-slate-200 bg-white"
                    : "border-slate-100 bg-slate-50/50 opacity-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={j.actif}
                  onChange={(e) => updateJour(idx, "actif", e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-sm font-medium text-slate-700 w-20">
                  {j.jour}
                </span>
                <input
                  type="time"
                  value={j.debut}
                  onChange={(e) => updateJour(idx, "debut", e.target.value)}
                  disabled={!j.actif}
                  className="border border-slate-300 rounded-lg px-2 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:bg-slate-100"
                />
                <span className="text-slate-400 text-xs">a</span>
                <input
                  type="time"
                  value={j.fin}
                  onChange={(e) => updateJour(idx, "fin", e.target.value)}
                  disabled={!j.actif}
                  className="border border-slate-300 rounded-lg px-2 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:bg-slate-100"
                />
                <span className="text-slate-400 text-xs">pause</span>
                <input
                  type="number"
                  value={j.pauseMin}
                  onChange={(e) => updateJour(idx, "pauseMin", e.target.value)}
                  disabled={!j.actif}
                  className="w-16 border border-slate-300 rounded-lg px-2 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:bg-slate-100"
                  min="0"
                />
                <span className="text-slate-400 text-xs">min</span>
              </div>
            ))}
          </div>
        )}

        {/* Mode heures sup */}
        {mode === "heures-sup" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Heures contrat (par semaine)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={heuresContrat}
                  onChange={(e) => setHeuresContrat(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-10 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  step="1"
                  min="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  h
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Heures reellement travaillees
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={heuresReelles}
                  onChange={(e) => setHeuresReelles(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-10 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  step="1"
                  min="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  h
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Majoration heures supplementaires
              </label>
              <div className="flex gap-2">
                {["25", "50"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setMajorationSup(v)}
                    className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                      majorationSup === v
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-slate-200 text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    +{v}%
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                +25% pour les 8 premieres heures sup, +50% au-dela (droit du travail)
              </p>
            </div>
          </div>
        )}

        {/* Taux horaire (commun) */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Taux horaire brut (optionnel)
          </label>
          <div className="relative">
            <input
              type="number"
              value={tauxHoraire}
              onChange={(e) => setTauxHoraire(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold pr-16 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              step="0.5"
              min="0"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR/h
            </span>
          </div>
        </div>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-2 space-y-4">
        {mode === "journee" && (
          <>
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-2xl p-6 shadow-lg shadow-amber-200/50">
              <p className="text-sm text-amber-100 mb-1">Heures travaillees</p>
              <p className="text-4xl font-extrabold tracking-tight">
                {minutesToHM(Math.max(0, minutesJournee))}
              </p>
              <p className="text-sm text-amber-200 mt-2">
                soit {fmt(Math.max(0, minutesJournee) / 60)} heures decimales
              </p>
            </div>
            {tauxH > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <p className="text-xs font-medium text-slate-400 mb-4">
                  Remuneration
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Salaire journee</span>
                    <span className="text-lg font-bold text-slate-800">
                      {fmt((Math.max(0, minutesJournee) / 60) * tauxH)} EUR
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {mode === "semaine" && (
          <>
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-2xl p-6 shadow-lg shadow-amber-200/50">
              <p className="text-sm text-amber-100 mb-1">Total semaine</p>
              <p className="text-4xl font-extrabold tracking-tight">
                {minutesToHM(totalMinutesSemaine)}
              </p>
              <p className="text-sm text-amber-200 mt-2">
                {joursActifs} jour{joursActifs > 1 ? "s" : ""} travaille
                {joursActifs > 1 ? "s" : ""} &middot; Moyenne{" "}
                {minutesToHM(Math.round(moyenneMinutesJour))}/jour
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <p className="text-xs font-medium text-slate-400 mb-3">
                Detail par jour
              </p>
              <div className="space-y-2">
                {detailSemaine
                  .filter((j) => j.actif)
                  .map((j) => (
                    <div
                      key={j.jour}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm text-slate-500">{j.jour}</span>
                      <span className="font-bold text-slate-800">
                        {minutesToHM(j.minutes)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            {tauxH > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <p className="text-xs font-medium text-slate-400 mb-4">
                  Remuneration estimee
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Semaine</span>
                    <span className="font-bold text-slate-800">
                      {fmt(salaireSemaine)} EUR
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Mois (x4.33)</span>
                    <span className="text-lg font-extrabold text-amber-600">
                      {fmt(salaireMois)} EUR
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {mode === "heures-sup" && (
          <>
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-2xl p-6 shadow-lg shadow-amber-200/50">
              <p className="text-sm text-amber-100 mb-1">
                Heures supplementaires
              </p>
              <p className="text-4xl font-extrabold tracking-tight">
                {fmt(hSup)}{" "}
                <span className="text-lg font-semibold">h/sem</span>
              </p>
              <p className="text-sm text-amber-200 mt-2">
                majorees a +{majoration}%
              </p>
            </div>
            {tauxH > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <p className="text-xs font-medium text-slate-400 mb-4">
                  Remuneration hebdomadaire
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">
                      {hContrat}h normales x {fmt(tauxH)} EUR
                    </span>
                    <span className="font-bold text-slate-800">
                      {fmt(montantNormal)} EUR
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">
                      {fmt(hSup)}h sup x {fmt(tauxH * (1 + majoration / 100))} EUR
                    </span>
                    <span className="font-bold text-amber-600">
                      {fmt(montantSup)} EUR
                    </span>
                  </div>
                  <div className="h-px bg-slate-100" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-600">
                      Total semaine
                    </span>
                    <span className="text-lg font-extrabold text-slate-800">
                      {fmt(montantTotal)} EUR
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">
                      Total mensuel (x4.33)
                    </span>
                    <span className="text-lg font-extrabold text-amber-600">
                      {fmt(montantTotal * 4.33)} EUR
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-4">
          <p className="text-xs text-amber-700">
            Calculs indicatifs bases sur le droit du travail francais.
            Les conventions collectives peuvent prevoir des majorations
            differentes. Consultez votre contrat ou vos RH.
          </p>
        </div>
      </div>
    </div>
  );
}
