"use client";
import { fmtIntBE as fmt } from "@/app/lib/fmt";

import { useState } from "react";
import {
  calculerSuccessionBE,
  getBaremeRegion,
  type RegionBE,
} from "./droitsSuccessionBeCalc";

const REGIONS: { value: RegionBE; label: string; flag: string }[] = [
  { value: "wallonie", label: "Wallonie", flag: "🟥🟨" },
  { value: "flandre", label: "Flandre", flag: "🦁" },
  { value: "bruxelles", label: "Bruxelles", flag: "🌸" },
];

export default function CalculateurSuccessionBE() {
  const [patrimoine, setPatrimoine] = useState<string>("300000");
  const [region, setRegion] = useState<RegionBE>("wallonie");
  const [heritiers, setHeritiers] = useState<number>(2);

  const patNum = parseFloat(patrimoine) || 0;
  const res = calculerSuccessionBE(patNum, region, heritiers);

  // Comparaison regions
  const comparaisonRegions = REGIONS.map((r) => ({
    region: r,
    res: calculerSuccessionBE(patNum, r.value, heritiers),
  }));

  const bareme = getBaremeRegion(region);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label
            htmlFor="patrimoine-input"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Patrimoine transmis (succession)
          </label>
          <div className="relative">
            <input
              id="patrimoine-input"
              type="number"
              value={patrimoine}
              onChange={(e) => setPatrimoine(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-slate-700 transition-shadow"
              min="0"
              step="10000"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Region du defunt
          </label>
          <div className="grid grid-cols-3 gap-2">
            {REGIONS.map((r) => (
              <button
                key={r.value}
                onClick={() => setRegion(r.value)}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  region === r.value
                    ? "border-slate-700 bg-slate-100"
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
        </div>

        <div className="mb-6">
          <label
            htmlFor="heritiers-input"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Nombre d&apos;heritiers en ligne directe : {heritiers}
          </label>
          <input
            id="heritiers-input"
            type="range"
            min="1"
            max="6"
            value={heritiers}
            onChange={(e) => setHeritiers(parseInt(e.target.value, 10))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>1</span>
            <span>3</span>
            <span>6</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Plus il y a d&apos;heritiers, plus le bareme progressif s&apos;applique
            sur des parts faibles → impot total reduit.
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 text-xs">
          <p className="font-semibold text-slate-700 mb-2">
            Bareme {REGIONS.find((r) => r.value === region)?.label} (ligne directe)
          </p>
          <div className="space-y-1">
            {bareme.map((t, i) => {
              const prev = i === 0 ? 0 : bareme[i - 1].plafond;
              const labelTo = t.plafond === Infinity ? "∞" : `${fmt(t.plafond)}`;
              return (
                <div key={i} className="flex justify-between text-slate-600">
                  <span>
                    {fmt(prev)} - {labelTo} EUR
                  </span>
                  <span className="font-bold text-slate-800">{t.taux} %</span>
                </div>
              );
            })}
          </div>
          <p className="text-slate-500 mt-2">
            Abattement legal : <strong>{fmt(res.abattement)} EUR</strong>
          </p>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white rounded-2xl p-6 shadow-lg shadow-slate-300/50">
          <p className="text-sm text-slate-300 mb-1">
            Droits de succession total
          </p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(res.droitsTotal)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
          <p className="text-xs text-slate-300 mt-2">
            Taux moyen effectif : {res.tauxMoyenEffectif.toFixed(2)} %
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Detail par heritier
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Patrimoine total</span>
              <span className="font-semibold text-slate-700">
                {fmt(res.patrimoine)} EUR
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">
                / {heritiers} heritier{heritiers > 1 ? "s" : ""}
              </span>
              <span className="font-semibold text-slate-700">
                {fmt(res.partParHeritier)} EUR
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">- Abattement</span>
              <span className="font-semibold text-emerald-600">
                -{fmt(res.abattement)} EUR
              </span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-100">
              <span className="text-slate-500">Base taxable / heritier</span>
              <span className="font-semibold text-slate-700">
                {fmt(res.baseTaxable)} EUR
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Droits / heritier</span>
              <span className="font-bold text-slate-800">
                {fmt(res.droitsParHeritier)} EUR
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Comparaison entre regions
          </p>
          <div className="space-y-2 text-sm">
            {comparaisonRegions.map((c) => (
              <div
                key={c.region.value}
                className={`flex justify-between p-2 rounded-lg ${
                  c.region.value === region ? "bg-slate-100" : ""
                }`}
              >
                <span className="text-slate-600">{c.region.label}</span>
                <span className="font-bold text-slate-800">
                  {fmt(c.res.droitsTotal)} EUR
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Calcul ligne directe uniquement (parents/enfants). Frères/soeurs et
          tiers ont des bareme plus eleves (jusqu&apos;a 80 %).
        </div>
      </div>
    </div>
  );
}
