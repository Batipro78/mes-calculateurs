"use client";

import { useState } from "react";

const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MOIS_NOMS = [
  "Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre",
];

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatShort(d: Date): string {
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

interface ResultsType {
  ovulation: Date;
  fertileStart: Date;
  fertileEnd: Date;
  nextPeriod: Date;
  nextOvulation: Date;
  ddr: Date;
  cycleLength: number;
}

export default function CalculateurOvulation({
  initialDdr,
  initialCycle,
}: {
  initialDdr?: string;
  initialCycle?: number;
}) {
  const today = new Date();
  const defaultDdr = initialDdr || today.toISOString().split("T")[0];

  const [ddr, setDdr] = useState(defaultDdr);
  const [cycleLength, setCycleLength] = useState(initialCycle || 28);
  const [results, setResults] = useState<ResultsType | null>(null);

  const cycleLengths = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];

  function calculate() {
    const ddrDate = new Date(ddr);
    if (isNaN(ddrDate.getTime())) return;

    const ovulationDay = cycleLength - 14;
    const ovulation = addDays(ddrDate, ovulationDay);
    const fertileStart = addDays(ovulation, -5);
    const fertileEnd = addDays(ovulation, 1);
    const nextPeriod = addDays(ddrDate, cycleLength);
    const nextOvulation = addDays(nextPeriod, cycleLength - 14);

    setResults({
      ovulation,
      fertileStart,
      fertileEnd,
      nextPeriod,
      nextOvulation,
      ddr: ddrDate,
      cycleLength,
    });
  }

  function renderCalendar(r: ResultsType) {
    const start = new Date(r.fertileStart);
    start.setDate(1);
    const calStart = new Date(start);
    const dayOfWeek = calStart.getDay();
    calStart.setDate(calStart.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    const end = new Date(r.fertileEnd);
    end.setMonth(end.getMonth() + 1, 0);
    const calEnd = new Date(end);
    const endDow = calEnd.getDay();
    if (endDow !== 0) calEnd.setDate(calEnd.getDate() + (7 - endDow));

    const months: { month: number; year: number; weeks: Date[][] }[] = [];
    let currentMonth = -1;
    let currentWeek: Date[] = [];

    const cursor = new Date(calStart);
    while (cursor <= calEnd) {
      const m = cursor.getMonth();
      const y = cursor.getFullYear();

      if (m !== currentMonth || months.length === 0) {
        if (currentWeek.length > 0) {
          while (currentWeek.length < 7) currentWeek.push(new Date(0));
          if (months.length > 0) months[months.length - 1].weeks.push(currentWeek);
          currentWeek = [];
        }
        months.push({ month: m, year: y, weeks: [] });
        currentMonth = m;
      }

      currentWeek.push(new Date(cursor));
      if (currentWeek.length === 7) {
        months[months.length - 1].weeks.push(currentWeek);
        currentWeek = [];
      }

      cursor.setDate(cursor.getDate() + 1);
    }
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) currentWeek.push(new Date(0));
      if (months.length > 0) months[months.length - 1].weeks.push(currentWeek);
    }

    // Show only months that contain fertile window or ovulation
    const relevantMonths = months.filter((m) => {
      const monthStart = new Date(m.year, m.month, 1);
      const monthEnd = new Date(m.year, m.month + 1, 0);
      return r.fertileStart <= monthEnd && r.fertileEnd >= monthStart;
    });

    return relevantMonths.map((m) => (
      <div key={`${m.year}-${m.month}`} className="mb-4">
        <p className="text-sm font-bold text-slate-700 mb-2 text-center">
          {MOIS_NOMS[m.month]} {m.year}
        </p>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {JOURS.map((j) => (
            <div key={j} className="font-medium text-slate-400 py-1">{j}</div>
          ))}
          {m.weeks.flat().map((day, i) => {
            if (day.getTime() === 0 || day.getMonth() !== m.month) {
              return <div key={i} className="py-1.5" />;
            }
            const isOvulation = isSameDay(day, r.ovulation);
            const isFertile = day >= r.fertileStart && day <= r.fertileEnd && !isOvulation;
            const isDdr = isSameDay(day, r.ddr);
            const isNextPeriod = isSameDay(day, r.nextPeriod);
            const isToday = isSameDay(day, today);

            let classes = "py-1.5 rounded-lg text-slate-600 ";
            if (isOvulation) classes = "py-1.5 rounded-lg bg-pink-500 text-white font-bold ";
            else if (isFertile) classes = "py-1.5 rounded-lg bg-pink-100 text-pink-700 font-medium ";
            else if (isDdr || isNextPeriod) classes = "py-1.5 rounded-lg bg-red-100 text-red-600 font-medium ";
            else if (isToday) classes = "py-1.5 rounded-lg ring-2 ring-blue-400 text-blue-600 font-medium ";

            return (
              <div key={i} className={classes}>
                {day.getDate()}
              </div>
            );
          })}
        </div>
      </div>
    ));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-800 mb-4">Vos informations</h2>

        <label className="block text-sm font-medium text-slate-700 mb-1">
          Premier jour des dernieres regles
        </label>
        <input
          type="date"
          value={ddr}
          onChange={(e) => setDdr(e.target.value)}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none mb-4"
        />

        <label className="block text-sm font-medium text-slate-700 mb-1">
          Duree du cycle (jours)
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {cycleLengths.map((c) => (
            <button
              key={c}
              onClick={() => setCycleLength(c)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                cycleLength === c
                  ? "bg-pink-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c}j
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Le cycle moyen est de 28 jours (entre 21 et 35 jours).
        </p>

        <button
          onClick={calculate}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-colors"
        >
          Calculer mon ovulation
        </button>

        {results && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-4 h-4 rounded bg-pink-500 inline-block" /> Jour d&apos;ovulation
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-4 h-4 rounded bg-pink-100 inline-block" /> Fenetre de fertilite
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-4 h-4 rounded bg-red-100 inline-block" /> Regles
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100">
          <a
            href="/calcul-date-accouchement"
            className="text-sm text-pink-600 hover:text-pink-700 font-medium flex items-center gap-1"
          >
            Deja enceinte ? Calculez votre date d&apos;accouchement
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-3 space-y-6">
        {!results ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <div className="text-5xl mb-4">🌸</div>
            <p className="text-slate-500">
              Entrez la date de vos dernieres regles et la duree de votre cycle
              pour connaitre votre <strong>date d&apos;ovulation</strong> et votre{" "}
              <strong>fenetre de fertilite</strong>.
            </p>
          </div>
        ) : (
          <>
            {/* Dates cles */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-5 text-white">
                <p className="text-pink-100 text-sm font-medium">Date d&apos;ovulation</p>
                <p className="text-2xl font-extrabold mt-1">{formatDate(results.ovulation)}</p>
                <p className="text-pink-100 text-xs mt-1">
                  Jour {results.cycleLength - 14} du cycle
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <p className="text-slate-500 text-sm font-medium">Fenetre de fertilite</p>
                <p className="text-lg font-bold text-slate-800 mt-1">
                  {formatShort(results.fertileStart)} → {formatShort(results.fertileEnd)}
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  6 jours les plus fertiles
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <p className="text-slate-500 text-sm font-medium">Prochaines regles</p>
                <p className="text-lg font-bold text-slate-800 mt-1">
                  {formatDate(results.nextPeriod)}
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Dans {Math.round((results.nextPeriod.getTime() - today.getTime()) / 86400000)} jours
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <p className="text-slate-500 text-sm font-medium">Prochaine ovulation</p>
                <p className="text-lg font-bold text-slate-800 mt-1">
                  {formatDate(results.nextOvulation)}
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Cycle suivant (jour {results.cycleLength - 14})
                </p>
              </div>
            </div>

            {/* Calendrier */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4">Calendrier de fertilite</h3>
              {renderCalendar(results)}
            </div>

            {/* Jours par jour */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4">Detail jour par jour</h3>
              <div className="space-y-2">
                {Array.from({ length: 7 }, (_, i) => {
                  const day = addDays(results.fertileStart, i);
                  const isOvulation = isSameDay(day, results.ovulation);
                  const dayNum = Math.round((day.getTime() - results.ddr.getTime()) / 86400000) + 1;

                  let fertility = "Fertile";
                  let barWidth = "60%";
                  let barColor = "bg-pink-200";

                  if (i <= 1) { fertility = "Peu fertile"; barWidth = "30%"; barColor = "bg-pink-100"; }
                  else if (i <= 3) { fertility = "Fertile"; barWidth = "60%"; barColor = "bg-pink-200"; }
                  else if (i === 4) { fertility = "Tres fertile"; barWidth = "85%"; barColor = "bg-pink-300"; }
                  if (isOvulation) { fertility = "OVULATION - Fertilite maximale"; barWidth = "100%"; barColor = "bg-pink-500"; }
                  if (i === 6) { fertility = "Fin de fenetre fertile"; barWidth = "20%"; barColor = "bg-pink-100"; }

                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-20 text-xs text-slate-500 shrink-0">
                        J{dayNum} - {day.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })}
                      </div>
                      <div className="flex-1 bg-slate-100 rounded-full h-5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${barColor} transition-all`}
                          style={{ width: barWidth }}
                        />
                      </div>
                      <div className={`text-xs font-medium shrink-0 ${isOvulation ? "text-pink-600 font-bold" : "text-slate-500"}`}>
                        {fertility}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Conseils */}
            <div className="bg-pink-50 rounded-2xl border border-pink-100 p-6">
              <h3 className="font-bold text-pink-800 mb-3">Conseils pour concevoir</h3>
              <ul className="space-y-2 text-sm text-pink-700">
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-0.5">&#10003;</span>
                  Avoir des rapports <strong>tous les 2 jours</strong> pendant la fenetre fertile
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-0.5">&#10003;</span>
                  Les spermatozoides survivent <strong>3 a 5 jours</strong> dans l&apos;uterus
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-0.5">&#10003;</span>
                  L&apos;ovule est fecondable pendant <strong>12 a 24 heures</strong> apres l&apos;ovulation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-0.5">&#10003;</span>
                  Commencez l&apos;acide folique <strong>3 mois avant</strong> la conception
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
