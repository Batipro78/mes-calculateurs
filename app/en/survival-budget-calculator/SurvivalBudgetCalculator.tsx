"use client";

import { useState, useMemo } from "react";
import {
  CityZone, Situation, TransportType,
  ZONE_LABELS, SITUATION_LABELS, TRANSPORT_LABELS,
  calcSurvivalBudget,
} from "./survivalCalcEN";

function fmtUSD(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function SurvivalBudgetCalculator() {
  const [zone, setZone] = useState<CityZone>("large-city");
  const [situation, setSituation] = useState<Situation>("single");
  const [transport, setTransport] = useState<TransportType>("car");

  const result = useMemo(
    () => calcSurvivalBudget(zone, situation, transport),
    [zone, situation, transport]
  );

  const povertyPct = Math.round((result.total / result.federalPovertyLine) * 100);
  const minWagePct = Math.round((result.total / result.federalMinWage) * 100);

  return (
    <div className="space-y-6">
      {/* Config */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <label className="block text-sm font-medium text-slate-600 mb-3">Location</label>
          <div className="space-y-2">
            {(Object.keys(ZONE_LABELS) as CityZone[]).map((z) => (
              <button key={z} onClick={() => setZone(z)}
                className={`w-full px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${zone === z ? "bg-red-50 border-2 border-red-500 text-red-900" : "bg-slate-50 border-2 border-transparent text-slate-600 hover:bg-slate-100"}`}>
                {ZONE_LABELS[z]}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-3">Household</label>
            <div className="space-y-2">
              {(Object.keys(SITUATION_LABELS) as Situation[]).map((s) => (
                <button key={s} onClick={() => setSituation(s)}
                  className={`w-full px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${situation === s ? "bg-red-50 border-2 border-red-500 text-red-900" : "bg-slate-50 border-2 border-transparent text-slate-600 hover:bg-slate-100"}`}>
                  {SITUATION_LABELS[s]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-3">Transportation</label>
            <div className="flex gap-2">
              {(Object.keys(TRANSPORT_LABELS) as TransportType[]).map((t) => (
                <button key={t} onClick={() => setTransport(t)}
                  className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${transport === t ? "bg-red-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  {TRANSPORT_LABELS[t]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-red-200 text-sm mb-1">Minimum monthly budget</p>
          <p className="text-4xl font-extrabold">{fmtUSD(result.total)}</p>
          <p className="text-red-200 text-sm mt-1">{fmtUSD(result.total * 12)}/year</p>
          <div className="h-px bg-white/20 my-3" />
          <p className="text-xs text-red-200">{result.comparison}</p>
        </div>
      </div>

      {/* Budget breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Monthly Budget Breakdown</h3>
        <div className="space-y-2">
          {result.lines.map((line) => (
            <div key={line.label} className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-xl">{line.emoji}</span>
                <div>
                  <p className="font-medium text-slate-700 text-sm">{line.label}</p>
                  <p className="text-xs text-slate-400">{line.note}</p>
                </div>
              </div>
              <p className="font-bold text-slate-800">{fmtUSD(line.amount)}</p>
            </div>
          ))}
          <div className="flex items-center justify-between px-4 py-4 bg-red-50 rounded-xl border border-red-200 mt-2">
            <p className="font-bold text-red-900">TOTAL</p>
            <p className="text-2xl font-extrabold text-red-900">{fmtUSD(result.total)}/mo</p>
          </div>
        </div>
      </div>

      {/* US Reference Points */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">US Reference Points</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl p-4 border-2" style={{ borderColor: povertyPct > 100 ? "#ef4444" : "#22c55e" }}>
            <p className="text-xs text-slate-400">Federal Poverty Line</p>
            <p className="text-xl font-bold text-slate-800">{fmtUSD(result.federalPovertyLine)}/mo</p>
            <p className={`text-xs font-medium ${povertyPct > 100 ? "text-red-500" : "text-emerald-500"}`}>
              Your budget is {povertyPct}% of poverty line
            </p>
          </div>
          <div className="rounded-xl p-4 border-2" style={{ borderColor: minWagePct > 100 ? "#ef4444" : "#f59e0b" }}>
            <p className="text-xs text-slate-400">Federal Min Wage ($7.25/hr)</p>
            <p className="text-xl font-bold text-slate-800">{fmtUSD(result.federalMinWage)}/mo</p>
            <p className={`text-xs font-medium ${minWagePct > 100 ? "text-red-500" : "text-amber-500"}`}>
              Your budget is {minWagePct}% of min wage
            </p>
          </div>
          <div className="rounded-xl p-4 border-2 border-blue-300">
            <p className="text-xs text-slate-400">Max SNAP Benefit</p>
            <p className="text-xl font-bold text-slate-800">{fmtUSD(result.snapBenefit)}/mo</p>
            <p className="text-xs font-medium text-blue-500">
              Food assistance if eligible
            </p>
          </div>
        </div>
      </div>

      {/* US Aid Programs */}
      <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
        <h3 className="font-bold text-blue-900 mb-3">Available US Assistance Programs</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-white rounded-xl p-3">
            <p className="font-semibold text-blue-800 text-sm">SNAP (Food Stamps)</p>
            <p className="text-xs text-blue-600">Up to ${result.snapBenefit}/mo for food</p>
          </div>
          <div className="bg-white rounded-xl p-3">
            <p className="font-semibold text-blue-800 text-sm">Medicaid</p>
            <p className="text-xs text-blue-600">Free healthcare if income &lt;138% FPL</p>
          </div>
          <div className="bg-white rounded-xl p-3">
            <p className="font-semibold text-blue-800 text-sm">Section 8 Housing</p>
            <p className="text-xs text-blue-600">Rent subsidies (long waitlists)</p>
          </div>
          <div className="bg-white rounded-xl p-3">
            <p className="font-semibold text-blue-800 text-sm">LIHEAP</p>
            <p className="text-xs text-blue-600">Energy bill assistance</p>
          </div>
          <div className="bg-white rounded-xl p-3">
            <p className="font-semibold text-blue-800 text-sm">EITC (Tax Credit)</p>
            <p className="text-xs text-blue-600">Up to $7,430/year for low-income workers</p>
          </div>
          <div className="bg-white rounded-xl p-3">
            <p className="font-semibold text-blue-800 text-sm">ACA Subsidies</p>
            <p className="text-xs text-blue-600">Health insurance premium assistance</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Note:</strong> Budget estimates are based on 2026 US averages. Actual costs
          vary significantly by specific city and state. Health insurance costs assume
          ACA marketplace plans without employer coverage. Federal minimum wage is $7.25/hr,
          but many states have higher minimums ($15-$20/hr in CA, NY, WA). All amounts in US dollars.
        </p>
      </div>
    </div>
  );
}
