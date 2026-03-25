"use client";

import { useState } from "react";

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

const SIGNES_ZODIAQUE = [
  { nom: "Capricorne", debut: [1, 1], fin: [1, 19], icone: "\u2651" },
  { nom: "Verseau", debut: [1, 20], fin: [2, 18], icone: "\u2652" },
  { nom: "Poissons", debut: [2, 19], fin: [3, 20], icone: "\u2653" },
  { nom: "Belier", debut: [3, 21], fin: [4, 19], icone: "\u2648" },
  { nom: "Taureau", debut: [4, 20], fin: [5, 20], icone: "\u2649" },
  { nom: "Gemeaux", debut: [5, 21], fin: [6, 20], icone: "\u264A" },
  { nom: "Cancer", debut: [6, 21], fin: [7, 22], icone: "\u264B" },
  { nom: "Lion", debut: [7, 23], fin: [8, 22], icone: "\u264C" },
  { nom: "Vierge", debut: [8, 23], fin: [9, 22], icone: "\u264D" },
  { nom: "Balance", debut: [9, 23], fin: [10, 22], icone: "\u264E" },
  { nom: "Scorpion", debut: [10, 23], fin: [11, 21], icone: "\u264F" },
  { nom: "Sagittaire", debut: [11, 22], fin: [12, 21], icone: "\u2650" },
  { nom: "Capricorne", debut: [12, 22], fin: [12, 31], icone: "\u2651" },
];

function getSigneZodiaque(mois: number, jour: number) {
  for (const s of SIGNES_ZODIAQUE) {
    const apresDebut =
      mois > s.debut[0] || (mois === s.debut[0] && jour >= s.debut[1]);
    const avantFin =
      mois < s.fin[0] || (mois === s.fin[0] && jour <= s.fin[1]);
    if (apresDebut && avantFin) return s;
  }
  return SIGNES_ZODIAQUE[0]; // Capricorne par defaut
}

function getJourSemaine(date: Date): string {
  const jours = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  return jours[date.getDay()];
}

export default function CalculateurAge() {
  const today = new Date();
  const defaultDate = `${today.getFullYear() - 30}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

  const [dateNaissance, setDateNaissance] = useState(defaultDate);

  const naissance = new Date(dateNaissance + "T00:00:00");
  const isValid =
    dateNaissance && !isNaN(naissance.getTime()) && naissance < today;

  // Calcul age exact
  let ans = 0,
    mois = 0,
    jours = 0;
  let totalJours = 0;
  let totalMois = 0;
  let totalSemaines = 0;
  let totalHeures = 0;
  let prochainAnnivJours = 0;
  let prochainAnnivDate = "";

  if (isValid) {
    // Difference en annees/mois/jours
    ans = today.getFullYear() - naissance.getFullYear();
    mois = today.getMonth() - naissance.getMonth();
    jours = today.getDate() - naissance.getDate();

    if (jours < 0) {
      mois--;
      const moisPrecedent = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      );
      jours += moisPrecedent.getDate();
    }
    if (mois < 0) {
      ans--;
      mois += 12;
    }

    // Totaux
    const diffMs = today.getTime() - naissance.getTime();
    totalJours = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    totalSemaines = Math.floor(totalJours / 7);
    totalHeures = Math.floor(diffMs / (1000 * 60 * 60));
    totalMois = ans * 12 + mois;

    // Prochain anniversaire
    let prochainAnniv = new Date(
      today.getFullYear(),
      naissance.getMonth(),
      naissance.getDate()
    );
    if (prochainAnniv <= today) {
      prochainAnniv = new Date(
        today.getFullYear() + 1,
        naissance.getMonth(),
        naissance.getDate()
      );
    }
    prochainAnnivJours = Math.ceil(
      (prochainAnniv.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    prochainAnnivDate = prochainAnniv.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const signe = isValid
    ? getSigneZodiaque(naissance.getMonth() + 1, naissance.getDate())
    : null;
  const jourNaissance = isValid ? getJourSemaine(naissance) : "";

  // Raccourcis ages courants
  const raccourcis = [
    { label: "20 ans", annees: 20 },
    { label: "30 ans", annees: 30 },
    { label: "40 ans", annees: 40 },
    { label: "50 ans", annees: 50 },
    { label: "65 ans", annees: 65 },
  ];

  function setAge(annees: number) {
    const d = new Date(
      today.getFullYear() - annees,
      today.getMonth(),
      today.getDate()
    );
    setDateNaissance(
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label
            htmlFor="date-naissance"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Date de naissance
          </label>
          <input
            id="date-naissance"
            type="date"
            value={dateNaissance}
            onChange={(e) => setDateNaissance(e.target.value)}
            max={today.toISOString().split("T")[0]}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        <div className="mb-6">
          <p className="text-xs text-slate-400 mb-2">Raccourcis</p>
          <div className="flex flex-wrap gap-2">
            {raccourcis.map((r) => (
              <button
                key={r.label}
                onClick={() => setAge(r.annees)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 text-slate-400 hover:border-pink-300 hover:text-pink-600 transition-colors"
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {isValid && (
          <div className="bg-slate-50 rounded-xl p-5">
            <p className="text-sm font-medium text-slate-600 mb-3">
              Conversions
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 border border-slate-100">
                <p className="text-2xl font-extrabold text-slate-800">
                  {totalMois.toLocaleString("fr-FR")}
                </p>
                <p className="text-xs text-slate-400">mois</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-100">
                <p className="text-2xl font-extrabold text-slate-800">
                  {totalSemaines.toLocaleString("fr-FR")}
                </p>
                <p className="text-xs text-slate-400">semaines</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-100">
                <p className="text-2xl font-extrabold text-slate-800">
                  {totalJours.toLocaleString("fr-FR")}
                </p>
                <p className="text-xs text-slate-400">jours</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-100">
                <p className="text-2xl font-extrabold text-slate-800">
                  {totalHeures.toLocaleString("fr-FR")}
                </p>
                <p className="text-xs text-slate-400">heures</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {isValid ? (
          <>
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl p-6 shadow-lg shadow-pink-200/50">
              <p className="text-sm text-pink-100 mb-1">Votre age exact</p>
              <p className="text-4xl font-extrabold tracking-tight">
                {ans}{" "}
                <span className="text-lg font-semibold">
                  an{ans > 1 ? "s" : ""}
                </span>
              </p>
              <p className="text-pink-100 text-sm mt-1">
                {mois} mois et {jours} jour{jours > 1 ? "s" : ""}
              </p>
              <div className="h-px bg-white/20 my-4" />
              <div className="flex justify-between text-sm">
                <span className="text-pink-200">Ne(e) un {jourNaissance}</span>
              </div>
            </div>

            {/* Prochain anniversaire */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className="text-xs text-slate-400 mb-1">
                Prochain anniversaire
              </p>
              {prochainAnnivJours === 0 ? (
                <p className="text-lg font-extrabold text-pink-600">
                  Joyeux anniversaire !
                </p>
              ) : (
                <>
                  <p className="text-lg font-extrabold text-slate-800">
                    Dans {prochainAnnivJours} jour
                    {prochainAnnivJours > 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 capitalize">
                    {prochainAnnivDate}
                  </p>
                </>
              )}
            </div>

            {/* Signe zodiaque */}
            {signe && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <p className="text-xs text-slate-400 mb-1">
                  Signe astrologique
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{signe.icone}</span>
                  <p className="text-lg font-extrabold text-slate-800">
                    {signe.nom}
                  </p>
                </div>
              </div>
            )}

            {/* Resume */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-600 mb-4">
                Resume
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">
                    Date de naissance
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    {naissance.toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Jour de naissance</span>
                  <span className="text-sm font-bold text-slate-800">
                    {jourNaissance}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Age exact</span>
                  <span className="text-sm font-bold text-pink-600">
                    {ans} ans, {mois} mois, {jours} jours
                  </span>
                </div>
                <div className="h-px bg-slate-100" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Vous avez vecu</span>
                  <span className="text-sm font-bold text-slate-800">
                    {totalJours.toLocaleString("fr-FR")} jours
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
            <p className="text-4xl mb-3">🎂</p>
            <p className="text-slate-400 text-sm">
              Entrez votre date de naissance pour calculer votre age exact.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
