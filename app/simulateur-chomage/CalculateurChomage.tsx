"use client";

import { useState } from "react";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

// Bareme ARE 2026
const PART_FIXE = 13.18; // euros/jour depuis 01/07/2025
const TAUX_1 = 0.404; // 40.4%
const TAUX_2 = 0.574; // 57.4% (alternative)
const ARE_MIN = 31.59; // euros/jour
const ARE_MAX = 274.80; // euros/jour (plafond)
const PLAFOND_SJR = 478.26; // euros/jour

export default function CalculateurChomage() {
  const [salaireBrut, setSalaireBrut] = useState("2500");
  const [moisTravailles, setMoisTravailles] = useState("24");
  const [age, setAge] = useState("35");

  const salaireNum = parseFloat(salaireBrut) || 0;
  const moisNum = parseInt(moisTravailles) || 0;
  const ageNum = parseInt(age) || 0;

  // SJR = Salaire Journalier de Reference
  // Salaire brut mensuel x nombre de mois / (nombre de mois x 30)
  const salaireBrutTotal = salaireNum * moisNum;
  const joursReference = moisNum * 30;
  const sjr = joursReference > 0 ? salaireBrutTotal / joursReference : 0;

  // Calcul ARE : le plus avantageux des deux
  const methode1 = sjr * TAUX_2; // 57.4% du SJR
  const methode2 = sjr * TAUX_1 + PART_FIXE; // 40.4% du SJR + partie fixe
  let areJournalier = Math.max(methode1, methode2);

  // Plancher et plafond
  areJournalier = Math.max(areJournalier, ARE_MIN);
  areJournalier = Math.min(areJournalier, ARE_MAX);

  // Si SJR est 0, pas d'allocation
  if (sjr <= 0) areJournalier = 0;

  const areMensuel = areJournalier * 30;
  const tauxRemplacement = salaireNum > 0 ? (areMensuel / salaireNum) * 100 : 0;

  // Duree d'indemnisation (regles 2024-2026)
  let dureeMaxMois: number;
  if (ageNum < 53) {
    dureeMaxMois = Math.min(moisNum, 18); // max 18 mois
  } else if (ageNum < 55) {
    dureeMaxMois = Math.min(moisNum, 22.5); // max 22.5 mois
  } else {
    dureeMaxMois = Math.min(moisNum, 27); // max 27 mois
  }
  const dureeMaxJours = Math.round(dureeMaxMois * 30);

  // Montant total estimé
  const montantTotal = areJournalier * dureeMaxJours;

  // Degressivite (salaires > 4 965€ brut/mois, apres 6 mois)
  const seuilDegressivite = 4965;
  const areApresDegressivite = areJournalier * 0.7;
  const isDegressif = salaireNum > seuilDegressivite && ageNum < 57;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Salaire brut mensuel */}
        <div className="mb-6">
          <label htmlFor="salaire" className="block text-sm font-medium text-slate-600 mb-2">
            Salaire brut mensuel moyen
          </label>
          <div className="relative">
            <input
              id="salaire"
              type="number"
              value={salaireBrut}
              onChange={(e) => setSalaireBrut(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              min="0"
              step="100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">EUR</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {[1600, 1800, 2000, 2500, 3000, 3500, 4000, 5000].map((s) => (
              <button
                key={s}
                onClick={() => setSalaireBrut(s.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  salaireBrut === s.toString()
                    ? "bg-sky-50 border-sky-300 text-sky-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {s.toLocaleString("fr-FR")} EUR
              </button>
            ))}
          </div>
        </div>

        {/* Mois travailles */}
        <div className="mb-6">
          <label htmlFor="mois" className="block text-sm font-medium text-slate-600 mb-2">
            Mois travailles (sur les 24 derniers mois)
          </label>
          <div className="relative">
            <input
              id="mois"
              type="number"
              value={moisTravailles}
              onChange={(e) => setMoisTravailles(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-16 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              min="6"
              max="24"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">mois</span>
          </div>
          <div className="flex gap-2 mt-2">
            {[6, 12, 18, 24].map((m) => (
              <button
                key={m}
                onClick={() => setMoisTravailles(m.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  moisTravailles === m.toString()
                    ? "bg-sky-50 border-sky-300 text-sky-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {m} mois
              </button>
            ))}
          </div>
        </div>

        {/* Age */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-slate-600 mb-2">
            Votre age
          </label>
          <div className="relative">
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-14 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              min="16"
              max="67"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">ans</span>
          </div>
          <div className="flex gap-2 mt-2">
            {[25, 30, 35, 40, 50, 55].map((a) => (
              <button
                key={a}
                onClick={() => setAge(a.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  age === a.toString()
                    ? "bg-sky-50 border-sky-300 text-sky-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {a} ans
              </button>
            ))}
          </div>
        </div>

        {/* Detail du calcul */}
        <div className="mt-8 bg-slate-50 rounded-xl p-4">
          <p className="text-xs font-medium text-slate-400 mb-3">Detail du calcul</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Salaire brut total ({moisNum} mois)</span>
              <span className="font-medium text-slate-700">{fmtInt(salaireBrutTotal)} EUR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Jours de reference</span>
              <span className="font-medium text-slate-700">{joursReference} jours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">SJR (Salaire Journalier de Reference)</span>
              <span className="font-bold text-slate-800">{fmt(sjr)} EUR</span>
            </div>
            <div className="h-px bg-slate-200 my-1" />
            <div className="flex justify-between">
              <span className="text-slate-500">Methode 1 : 57,4% du SJR</span>
              <span className="text-slate-700">{fmt(methode1)} EUR/j</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Methode 2 : 40,4% SJR + {fmt(PART_FIXE)} EUR</span>
              <span className="text-slate-700">{fmt(methode2)} EUR/j</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-slate-600">Retenu (le plus avantageux)</span>
              <span className="text-sky-700">{fmt(areJournalier)} EUR/j</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-2 space-y-4">
        {/* ARE principal */}
        <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80 mb-1">Allocation chomage estimee (ARE)</p>
          <p className="text-5xl font-extrabold tracking-tight">{fmt(areMensuel)}</p>
          <p className="text-lg font-medium mt-1">EUR / mois</p>
          <div className="h-px bg-white/20 my-4" />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white/70">Par jour</p>
              <p className="font-semibold">{fmt(areJournalier)} EUR</p>
            </div>
            <div>
              <p className="text-white/70">Taux de remplacement</p>
              <p className="font-semibold">{tauxRemplacement.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        {/* Duree */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-1">Duree d&apos;indemnisation</p>
          <p className="text-3xl font-extrabold text-slate-800">
            {dureeMaxMois % 1 === 0 ? dureeMaxMois : dureeMaxMois.toFixed(1)} mois
          </p>
          <p className="text-sm text-slate-500 mt-1">{dureeMaxJours} jours calendaires</p>
          <div className="h-px bg-slate-100 my-3" />
          <p className="text-xs font-medium text-slate-400 mb-1">Montant total estime</p>
          <p className="text-2xl font-extrabold text-slate-800">{fmtInt(montantTotal)} EUR</p>
        </div>

        {/* Degressivite */}
        {isDegressif && (
          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
            <p className="text-sm font-bold text-amber-800 mb-1">Degressivite applicable</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              Votre salaire brut depasse {seuilDegressivite.toLocaleString("fr-FR")} EUR/mois.
              Apres 6 mois, votre ARE sera reduite de 30% :
            </p>
            <p className="text-lg font-extrabold text-amber-800 mt-2">
              {fmt(areApresDegressivite * 30)} EUR/mois
            </p>
            <p className="text-xs text-amber-600">soit {fmt(areApresDegressivite)} EUR/jour</p>
          </div>
        )}

        {/* Durees max */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">Duree maximale selon l&apos;age</p>
          <div className="space-y-2">
            {[
              { label: "Moins de 53 ans", duree: "18 mois (max)", isCurrent: ageNum < 53 },
              { label: "53-54 ans", duree: "22,5 mois (max)", isCurrent: ageNum >= 53 && ageNum < 55 },
              { label: "55 ans et plus", duree: "27 mois (max)", isCurrent: ageNum >= 55 },
            ].map((row) => (
              <div
                key={row.label}
                className={`flex justify-between items-center px-3 py-2 rounded-lg ${
                  row.isCurrent ? "bg-sky-50 border border-sky-200 font-bold" : ""
                }`}
              >
                <span className={`text-sm ${row.isCurrent ? "text-sky-700" : "text-slate-500"}`}>{row.label}</span>
                <span className={`text-sm ${row.isCurrent ? "text-sky-700" : "text-slate-600"}`}>{row.duree}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Estimation basee sur les regles ARE 2026. Les montants reels peuvent varier
          selon votre situation (temps partiel, primes, etc.). Consultez France Travail
          pour un calcul officiel.
        </div>
      </div>
    </div>
  );
}
