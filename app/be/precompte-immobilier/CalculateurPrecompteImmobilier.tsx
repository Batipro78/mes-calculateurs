"use client";

import { useState } from "react";
import {
  calculerPrecompteImmobilier,
  COMMUNES_EXEMPLES,
  COEFFICIENT_INDEXATION_2026,
  type RegionBE,
} from "./precompteImmobilierCalc";

const REGIONS: { value: RegionBE; label: string; flag: string }[] = [
  { value: "wallonie", label: "Wallonie", flag: "🟥🟨" },
  { value: "flandre", label: "Flandre", flag: "🦁" },
  { value: "bruxelles", label: "Bruxelles", flag: "🌸" },
];

function fmt(montant: number): string {
  return Math.round(montant).toLocaleString("fr-BE");
}

export default function CalculateurPrecompteImmobilier() {
  const [rc, setRc] = useState<string>("1200");
  const [region, setRegion] = useState<RegionBE>("wallonie");
  const [centimes, setCentimes] = useState<number>(2700);

  const rcNum = parseFloat(rc) || 0;
  const res = calculerPrecompteImmobilier(rcNum, region, centimes);

  const communesRegion = COMMUNES_EXEMPLES.filter((c) => c.region === region);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label
            htmlFor="rc-input"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Revenu cadastral (non indexe)
          </label>
          <div className="relative">
            <input
              id="rc-input"
              type="number"
              value={rc}
              onChange={(e) => setRc(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-shadow"
              min="0"
              step="50"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Le RC se trouve sur votre avertissement-extrait de role. RC indexe
            2026 ={" "}
            <strong>{fmt(rcNum * COEFFICIENT_INDEXATION_2026)} EUR</strong>{" "}
            (coefficient {COEFFICIENT_INDEXATION_2026})
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Region du bien
          </label>
          <div className="grid grid-cols-3 gap-2">
            {REGIONS.map((r) => (
              <button
                key={r.value}
                onClick={() => {
                  setRegion(r.value);
                  // ajuster centimes par defaut a la 1ere commune connue de la region
                  const defaut = COMMUNES_EXEMPLES.find(
                    (c) => c.region === r.value,
                  );
                  if (defaut) setCentimes(defaut.centimes);
                }}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  region === r.value
                    ? "border-amber-500 bg-amber-50/50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-lg block">{r.flag}</span>
                <span className="text-xs font-bold text-slate-800 mt-1 block">
                  {r.label}
                </span>
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Taux regional applique : <strong>{res.tauxRegional} %</strong>
            {res.centimesProvinciaux > 0 && (
              <> &middot; Additionnels provinciaux : {res.centimesProvinciaux}</>
            )}
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="centimes-input"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Centimes additionnels communaux : <strong>{centimes}</strong>
          </label>
          <input
            id="centimes-input"
            type="range"
            min="0"
            max="4500"
            step="50"
            value={centimes}
            onChange={(e) => setCentimes(parseInt(e.target.value, 10))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0</span>
            <span>2 000</span>
            <span>4 500</span>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-slate-700 mb-2">
            Exemples de communes en {REGIONS.find((r) => r.value === region)?.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {communesRegion.map((c) => (
              <button
                key={c.nom}
                onClick={() => setCentimes(c.centimes)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  centimes === c.centimes
                    ? "bg-amber-100 text-amber-700"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-amber-50"
                }`}
              >
                {c.nom} ({c.centimes})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg shadow-amber-200/50">
          <p className="text-sm text-amber-100 mb-1">
            Precompte immobilier annuel
          </p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(res.precompteTotal)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
          <p className="text-xs text-amber-100 mt-2">
            Soit {res.pctRcIndexe.toFixed(2)} % du RC indexe
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Detail du calcul
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">RC non indexe</span>
              <span className="font-semibold text-slate-700">
                {fmt(res.rcNonIndexe)} EUR
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">RC indexe (x 2,1763)</span>
              <span className="font-semibold text-slate-700">
                {fmt(res.rcIndexe)} EUR
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">
                Base regionale ({res.tauxRegional} %)
              </span>
              <span className="font-semibold text-slate-700">
                {fmt(res.precompteBase)} EUR
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">
                + Communaux ({res.centimesCommunaux} centimes)
              </span>
              <span className="font-semibold text-amber-600">
                + {fmt(res.precompteCommunal)} EUR
              </span>
            </div>
            {res.precompteProvincial > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-500">
                  + Provinciaux ({res.centimesProvinciaux} centimes)
                </span>
                <span className="font-semibold text-amber-600">
                  + {fmt(res.precompteProvincial)} EUR
                </span>
              </div>
            )}
            <div className="flex justify-between pt-1 border-t border-slate-100">
              <span className="font-medium text-slate-600">Total annuel</span>
              <span className="font-extrabold text-slate-800">
                {fmt(res.precompteTotal)} EUR
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Estimation avant reductions (habitation modeste, enfants a charge,
          personne handicapee). Le precompte exact est notifie par la region
          chaque annee.
        </div>
      </div>
    </div>
  );
}
