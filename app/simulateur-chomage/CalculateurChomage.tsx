"use client";
import { fmtEUR as fmt } from "@/app/lib/fmt";

import { useState } from "react";
import { calculerARE, PART_FIXE, SEUIL_DEGRESSIVITE } from "./chomageCalc";



function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

export default function CalculateurChomage() {
  const [salaireBrut, setSalaireBrut] = useState("2500");
  const [moisTravailles, setMoisTravailles] = useState("24");
  const [age, setAge] = useState("35");
  const [ruptureConv, setRuptureConv] = useState(false);

  const salaireNum = parseFloat(salaireBrut) || 0;
  const moisNum = parseInt(moisTravailles) || 0;
  const ageNum = parseInt(age) || 0;

  // Toutes les regles sont dans chomageCalc.ts (sources Unedic en commentaire).
  const r = calculerARE(salaireNum, moisNum, ageNum, ruptureConv);
  const moisPris = Math.min(moisNum, ageNum >= 55 ? 36 : 24);
  const salaireBrutTotal = salaireNum * moisPris;
  const {
    sjr,
    joursReference,
    formule1: methode1,
    formule2: methode2,
    areJour: areJournalier,
    areMois: areMensuel,
    tauxRemplacement,
    dureeJours: dureeMaxJours,
    dureeMois: dureeMaxMois,
    montantTotal,
    isDegressif,
    areJourApresDegressivite: areApresDegressivite,
  } = r;

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
            Mois travailles (sur les 24 derniers mois, 36 si vous avez 55 ans ou plus)
          </label>
          <div className="relative">
            <input
              id="mois"
              type="number"
              value={moisTravailles}
              onChange={(e) => setMoisTravailles(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-16 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              min="6"
              max="36"
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
            {[25, 30, 35, 40, 50, 55, 57].map((a) => (
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

        {/* Rupture conventionnelle */}
        <label className="mt-6 flex items-start gap-3 text-sm text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            checked={ruptureConv}
            onChange={(e) => setRuptureConv(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300"
          />
          <span>
            Fin de contrat par rupture conventionnelle individuelle, à partir du 1er septembre 2026
            (durée maximale plafonnée à 15 mois avant 55 ans, 20,5 mois à partir de 55 ans)
          </span>
        </label>

        {/* Detail du calcul */}
        <div className="mt-8 bg-slate-50 rounded-xl p-4">
          <p className="text-xs font-medium text-slate-400 mb-3">Detail du calcul</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Salaire brut total ({moisNum} mois)</span>
              <span className="font-medium text-slate-700">{fmtInt(salaireBrutTotal)} EUR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Jours calendaires de la période</span>
              <span className="font-medium text-slate-700">{Math.round(joursReference)} jours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">SJR (Salaire Journalier de Reference)</span>
              <span className="font-bold text-slate-800">{fmt(sjr)} EUR</span>
            </div>
            <div className="h-px bg-slate-200 my-1" />
            <div className="flex justify-between">
              <span className="text-slate-500">Formule 1 : 57 % du SJR</span>
              <span className="text-slate-700">{fmt(methode1)} EUR/j</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Formule 2 : 40,4 % du SJR + {fmt(PART_FIXE)} EUR</span>
              <span className="text-slate-700">{fmt(methode2)} EUR/j</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-slate-600">Retenu (formule la plus haute, puis minimum et plafonds)</span>
              <span className="text-sky-700">{fmt(areJournalier)} EUR/j</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-2 space-y-4">
        {/* ARE principal */}
        <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80 mb-1">Allocation chomage brute estimee (ARE)</p>
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
            {dureeMaxMois.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} mois
          </p>
          <p className="text-sm text-slate-500 mt-1">
            {r.droitOuvert
              ? `${dureeMaxJours} jours calendaires (avec le coefficient 0,75)`
              : "Moins de 6 mois travaillés : en général, pas de droit ouvert"}
          </p>
          <div className="h-px bg-slate-100 my-3" />
          <p className="text-xs font-medium text-slate-400 mb-1">Montant total estime</p>
          <p className="text-2xl font-extrabold text-slate-800">{fmtInt(montantTotal)} EUR</p>
        </div>

        {/* Degressivite */}
        {isDegressif && (
          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
            <p className="text-sm font-bold text-amber-800 mb-1">Degressivite applicable</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              Votre allocation depasse {fmt(SEUIL_DEGRESSIVITE)} EUR par jour et vous avez moins de 55 ans.
              A partir du 7e mois, elle baisse de 30 %, sans descendre sous {fmt(SEUIL_DEGRESSIVITE)} EUR par jour :
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
            {(ruptureConv
              ? [
                  { label: "Moins de 55 ans (rupture conv.)", duree: "15 mois (max)", isCurrent: ageNum < 55 },
                  { label: "55 ans et plus (rupture conv.)", duree: "20,5 mois (max)", isCurrent: ageNum >= 55 },
                ]
              : [
                  { label: "Moins de 55 ans", duree: "18 mois (max)", isCurrent: ageNum < 55 },
                  { label: "55-56 ans", duree: "22,5 mois (max)", isCurrent: ageNum >= 55 && ageNum < 57 },
                  { label: "57 ans et plus", duree: "27 mois (max)", isCurrent: ageNum >= 57 },
                ]
            ).map((row) => (
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
          Estimation basee sur les regles de l&apos;Unedic en vigueur au 14 octobre 2026 (montants
          non revalorises au 1er juillet 2026). Hypothese : meme salaire brut chaque mois, emploi
          continu. Montants bruts, avant retenues. Le temps partiel, les periodes sans emploi, la
          formation ou les differes ne sont pas pris en compte. Consultez France Travail pour un
          calcul officiel.
        </div>
      </div>
    </div>
  );
}
