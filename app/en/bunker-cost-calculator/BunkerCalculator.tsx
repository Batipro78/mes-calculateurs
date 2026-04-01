"use client";

import { useState, useMemo } from "react";
import { BunkerType, DurationType, BUNKER_TYPES, DURATIONS, calcBunkerCost } from "./bunkerCalcEN";

function fmtUSD(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function fmtNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export default function BunkerCalculator() {
  const [bunkerType, setBunkerType] = useState<BunkerType>("standard");
  const [numPeople, setNumPeople] = useState(4);
  const [duration, setDuration] = useState<DurationType>("3-months");

  const result = useMemo(
    () => calcBunkerCost(bunkerType, numPeople, duration),
    [bunkerType, numPeople, duration]
  );

  const type = BUNKER_TYPES.find((t) => t.id === bunkerType)!;
  const dur = DURATIONS.find((d) => d.id === duration)!;

  return (
    <div className="space-y-6">
      {/* Config */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <label className="block text-sm font-medium text-slate-600 mb-3">Bunker Type</label>
          <div className="space-y-2">
            {BUNKER_TYPES.map((t) => (
              <button key={t.id} onClick={() => setBunkerType(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${bunkerType === t.id ? "bg-amber-50 border-2 border-amber-500 text-amber-900" : "bg-slate-50 border-2 border-transparent text-slate-600 hover:bg-slate-100"}`}>
                <span className="text-xl">{t.emoji}</span>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs opacity-70">${t.pricePerSqFt}/sq ft</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Number of occupants: {numPeople}
            </label>
            <input type="range" min="1" max="12" value={numPeople}
              onChange={(e) => setNumPeople(parseInt(e.target.value))}
              className="w-full accent-amber-600" />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1</span><span>6</span><span>12</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-3">Duration</label>
            <div className="grid grid-cols-2 gap-2">
              {DURATIONS.map((d) => (
                <button key={d.id} onClick={() => setDuration(d.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${duration === d.id ? "bg-amber-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-amber-200 text-sm mb-1">Total Estimated Cost</p>
          <p className="text-4xl font-extrabold">{fmtUSD(result.totalCost)}</p>
          <div className="h-px bg-white/20 my-3" />
          <p className="text-amber-200 text-xs mb-1">
            {type.name} bunker for {numPeople} {numPeople === 1 ? "person" : "people"}, {dur.label}
          </p>
          <p className="text-amber-200 text-xs">
            Total area: <strong className="text-white">{fmtNumber(result.totalSqFt)} sq ft</strong>
          </p>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Cost Breakdown</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-xl">🏗️</span>
              <div>
                <p className="font-medium text-slate-700 text-sm">Construction</p>
                <p className="text-xs text-slate-400">{fmtNumber(result.totalSqFt)} sq ft × ${type.pricePerSqFt}/sq ft</p>
              </div>
            </div>
            <p className="font-bold text-slate-800">{fmtUSD(result.constructionCost)}</p>
          </div>

          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-xl">💧</span>
              <div>
                <p className="font-medium text-slate-700 text-sm">Water Supply</p>
                <p className="text-xs text-slate-400">{fmtNumber(result.waterGallons)} gallons ({numPeople} × 1 gal/day × {dur.days} days)</p>
              </div>
            </div>
            <p className="font-bold text-slate-800">{fmtUSD(result.waterCost)}</p>
          </div>

          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-xl">🥫</span>
              <div>
                <p className="font-medium text-slate-700 text-sm">Food Supply</p>
                <p className="text-xs text-slate-400">{fmtNumber(result.foodCalories / 1000)}K cal ({numPeople} × 2,000 cal/day × {dur.days} days)</p>
              </div>
            </div>
            <p className="font-bold text-slate-800">{fmtUSD(result.foodCost)}</p>
          </div>

          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚙️</span>
              <div>
                <p className="font-medium text-slate-700 text-sm">Equipment &amp; Systems</p>
                <p className="text-xs text-slate-400">Air filtration, generator, comms, medical (~25% of construction)</p>
              </div>
            </div>
            <p className="font-bold text-slate-800">{fmtUSD(result.equipmentCost)}</p>
          </div>
        </div>

        <div className="mt-4 bg-amber-50 rounded-xl p-4 flex items-center justify-between">
          <p className="font-bold text-amber-900">TOTAL</p>
          <p className="text-2xl font-extrabold text-amber-900">{fmtUSD(result.totalCost)}</p>
        </div>
      </div>

      {/* Space breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Space Requirements</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-3xl font-extrabold text-blue-700">{fmtNumber(result.livingSqFt)}</p>
            <p className="text-sm text-blue-600 font-medium">sq ft living space</p>
            <p className="text-xs text-blue-400 mt-1">{numPeople} × 80 sq ft + 100 common</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 text-center">
            <p className="text-3xl font-extrabold text-orange-700">{fmtNumber(result.storageSqFt)}</p>
            <p className="text-sm text-orange-600 font-medium">sq ft storage</p>
            <p className="text-xs text-orange-400 mt-1">Food, water, equipment</p>
          </div>
          <div className="bg-slate-100 rounded-xl p-4 text-center">
            <p className="text-3xl font-extrabold text-slate-800">{fmtNumber(result.totalSqFt)}</p>
            <p className="text-sm text-slate-600 font-medium">sq ft total</p>
            <p className="text-xs text-slate-400 mt-1">~{Math.round(result.totalSqFt / 10.764)} m²</p>
          </div>
        </div>
      </div>

      {/* US Bunker Companies */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">US Bunker Companies (Reference)</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm">Rising S Company (Texas)</p>
            <p className="text-xs text-slate-500">Steel underground bunkers. Starting at $40,000 for basic models up to $8.5M for luxury complexes.</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm">Atlas Survival Shelters</p>
            <p className="text-xs text-slate-500">Corrugated steel shelters. $20,000-$200,000+ range. NBC options available.</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm">Vivos (Indiana/South Dakota)</p>
            <p className="text-xs text-slate-500">Community bunkers and private shelters. Converted missile silos. $25,000-$35,000/person.</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm">Radius Engineering (Texas)</p>
            <p className="text-xs text-slate-500">Premium fiberglass shelters. NBC certified. $100,000-$500,000+ depending on configuration.</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Note:</strong> Costs are rough estimates based on 2026 US construction market data.
          Actual costs vary significantly based on location, soil conditions, water table depth,
          local building codes, and permitting requirements. Most US states require building permits
          for underground structures. Always consult a licensed contractor and check local zoning
          ordinances before construction. Prices in US dollars.
        </p>
      </div>
    </div>
  );
}
