"use client";

import { useState } from "react";
import {
  calculerVMACooper,
  calculerVMADemiCooper,
  calculerVMAVameval,
  calculerFCMaxTanaka,
  calculerZoneKarvonen,
  calculerAllureSelonPourcentVMA,
  formatAllure,
  ZONES_FC,
  ALLURES_ENTRAINEMENT,
  fmt,
  type MethodeTest,
} from "./vmaCalc";

export default function CalculVMA() {
  const [methode, setMethode] = useState<MethodeTest>("cooper");
  const [distanceM, setDistanceM] = useState<string>("3000");
  const [tempsVameval, setTempsVameval] = useState<string>("6");
  const [vmaSaisie, setVmaSaisie] = useState<string>("15");
  const [age, setAge] = useState<string>("30");
  const [fcRepos, setFcRepos] = useState<string>("60");

  let vma: number | null = null;

  if (methode === "cooper") {
    const dist = parseFloat(distanceM) || 0;
    if (dist > 0) vma = calculerVMACooper(dist);
  } else if (methode === "demi-cooper") {
    const dist = parseFloat(distanceM) || 0;
    if (dist > 0) vma = calculerVMADemiCooper(dist);
  } else if (methode === "vameval") {
    const temps = parseFloat(tempsVameval) || 0;
    if (temps > 0) vma = calculerVMAVameval(temps);
  } else if (methode === "saisie-directe") {
    const val = parseFloat(vmaSaisie) || 0;
    if (val > 0) vma = val;
  }

  const ageNum = parseInt(age) || 30;
  const fcReposNum = parseInt(fcRepos) || 60;
  const fcMax = calculerFCMaxTanaka(ageNum);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        {/* Sélection méthode test */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Méthode de calcul VMA :
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: "cooper", label: "Test Cooper (12 min)" },
              { value: "demi-cooper", label: "Demi-Cooper (6 min)" },
              { value: "vameval", label: "VAMEVAL (1500m)" },
              { value: "saisie-directe", label: "Saisie directe" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setMethode(opt.value as MethodeTest)}
                className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                  methode === opt.value
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input distance Cooper / Demi-Cooper */}
        {(methode === "cooper" || methode === "demi-cooper") && (
          <div>
            <label
              htmlFor="distance-input"
              className="block text-sm font-medium text-slate-600 mb-2"
            >
              {methode === "cooper"
                ? "Distance 12 minutes (m)"
                : "Distance 6 minutes (m)"}
            </label>
            <div className="relative">
              <input
                id="distance-input"
                type="number"
                value={distanceM}
                onChange={(e) => setDistanceM(e.target.value)}
                placeholder="ex: 3000"
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
                min="0"
                step="10"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                m
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Distance totale parcourue pendant le test
            </p>
          </div>
        )}

        {/* Input temps VAMEVAL */}
        {methode === "vameval" && (
          <div>
            <label
              htmlFor="temps-vameval"
              className="block text-sm font-medium text-slate-600 mb-2"
            >
              Temps 1500m (minutes décimales)
            </label>
            <div className="relative">
              <input
                id="temps-vameval"
                type="number"
                value={tempsVameval}
                onChange={(e) => setTempsVameval(e.target.value)}
                placeholder="ex: 6.5"
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
                min="0"
                step="0.1"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                min
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Exemple : 6 min 30 s = 6.5
            </p>
          </div>
        )}

        {/* Input VMA saisie directe */}
        {methode === "saisie-directe" && (
          <div>
            <label
              htmlFor="vma-saisie"
              className="block text-sm font-medium text-slate-600 mb-2"
            >
              VMA (km/h)
            </label>
            <div className="relative">
              <input
                id="vma-saisie"
                type="number"
                value={vmaSaisie}
                onChange={(e) => setVmaSaisie(e.target.value)}
                placeholder="ex: 15"
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
                min="0"
                step="0.5"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                km/h
              </span>
            </div>
          </div>
        )}

        {/* Inputs âge et FC repos */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="age-input"
              className="block text-sm font-medium text-slate-600 mb-2"
            >
              Âge (ans)
            </label>
            <input
              id="age-input"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
              min="10"
              max="120"
            />
          </div>
          <div>
            <label
              htmlFor="fc-repos-input"
              className="block text-sm font-medium text-slate-600 mb-2"
            >
              FC repos (bpm)
            </label>
            <input
              id="fc-repos-input"
              type="number"
              value={fcRepos}
              onChange={(e) => setFcRepos(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
              min="30"
              max="100"
            />
          </div>
        </div>
      </div>

      {/* Résultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {vma !== null && vma > 0 ? (
          <>
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-6 shadow-lg shadow-emerald-200/50">
              <p className="text-sm text-emerald-100 mb-1">VMA</p>
              <p className="text-4xl font-extrabold tracking-tight">
                {fmt(vma, 1)}
              </p>
              <p className="text-sm text-emerald-100 mt-3">km/h</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">FC max</span>
                  <span className="text-lg font-bold text-slate-800">
                    {fcMax} bpm
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">FC repos</span>
                  <span className="text-lg font-bold text-slate-800">
                    {fcReposNum} bpm
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center">
            <p className="text-sm text-slate-400">
              Entrez une valeur pour voir les resultats
            </p>
          </div>
        )}

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Calcul VMA, zones FC Karvonen et allures d&apos;entrainement.
        </div>
      </div>

      {/* Tableau zones FC */}
      {vma !== null && vma > 0 && (
        <div className="lg:col-span-5 mt-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Zones de fréquence cardiaque (Karvonen)
          </h3>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-3 px-4 text-slate-500 font-medium">
                    Zone
                  </th>
                  <th className="text-right py-3 px-4 text-slate-500 font-medium">
                    Min (bpm)
                  </th>
                  <th className="text-right py-3 px-4 text-slate-500 font-medium">
                    Max (bpm)
                  </th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium">
                    Type d&apos;entraînement
                  </th>
                </tr>
              </thead>
              <tbody>
                {ZONES_FC.map((z) => {
                  const fcMin = calculerZoneKarvonen(
                    fcMax,
                    fcReposNum,
                    z.minPourcent
                  );
                  const fcMax_ = calculerZoneKarvonen(
                    fcMax,
                    fcReposNum,
                    z.maxPourcent
                  );
                  return (
                    <tr
                      key={z.zone}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="py-3 px-4 font-medium text-slate-700">
                        {z.zone}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-600">
                        {fcMin}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-600">
                        {fcMax_}
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-600">
                        {z.minPourcent}-{z.maxPourcent}% FC max
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tableau allures entraînement */}
      {vma !== null && vma > 0 && (
        <div className="lg:col-span-5 mt-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Allures d&apos;entraînement cibles
          </h3>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-3 px-4 text-slate-500 font-medium">
                    Type d&apos;entraînement
                  </th>
                  <th className="text-right py-3 px-4 text-slate-500 font-medium">
                    % VMA
                  </th>
                  <th className="text-right py-3 px-4 text-slate-500 font-medium">
                    Allure min/km
                  </th>
                  <th className="text-right py-3 px-4 text-slate-500 font-medium">
                    Vitesse (km/h)
                  </th>
                </tr>
              </thead>
              <tbody>
                {ALLURES_ENTRAINEMENT.map((a) => {
                  const minAllure = calculerAllureSelonPourcentVMA(
                    vma,
                    a.minPourcent
                  );
                  const maxAllure = calculerAllureSelonPourcentVMA(
                    vma,
                    a.maxPourcent
                  );
                  return (
                    <tr
                      key={a.nom}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="py-3 px-4 font-medium text-slate-700">
                        {a.nom}
                      </td>
                      <td className="py-3 px-4 text-right text-sm text-slate-600">
                        {a.minPourcent}-{a.maxPourcent}%
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-600">
                        {formatAllure(minAllure.minKm)} -{" "}
                        {formatAllure(maxAllure.minKm)}
                      </td>
                      <td className="py-3 px-4 text-right text-sm text-slate-600">
                        {fmt(minAllure.kmh, 1)} -{" "}
                        {fmt(maxAllure.kmh, 1)} km/h
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
