"use client";

import { useState, useMemo } from "react";
import {
  HousingType, HeatingType, CookingType, WaterHeaterType, PrepLevel,
  HOUSING_LABELS, HEATING_LABELS, COOKING_LABELS, WATER_HEATER_LABELS, LEVEL_LABELS,
  EQUIPMENT, calcAutonomyScore, calcEquipmentBudget,
} from "./blackoutCalcEN";

const LEVEL_COLORS = {
  critical: { bg: "bg-red-600", text: "text-red-600", border: "border-red-300", label: "Critical" },
  fragile: { bg: "bg-orange-500", text: "text-orange-500", border: "border-orange-300", label: "Fragile" },
  decent: { bg: "bg-yellow-500", text: "text-yellow-500", border: "border-yellow-300", label: "Decent" },
  prepared: { bg: "bg-emerald-500", text: "text-emerald-500", border: "border-emerald-300", label: "Prepared" },
};

function fmtDuration(hours: number): string {
  if (hours < 24) return `${hours} hours`;
  const days = Math.floor(hours / 24);
  const h = hours % 24;
  return h > 0 ? `${days} day${days > 1 ? "s" : ""} ${h}h` : `${days} day${days > 1 ? "s" : ""}`;
}

export default function BlackoutSimulator() {
  const [housing, setHousing] = useState<HousingType>("house");
  const [heating, setHeating] = useState<HeatingType>("all-electric");
  const [cooking, setCooking] = useState<CookingType>("electric");
  const [waterHeater, setWaterHeater] = useState<WaterHeaterType>("electric");
  const [numPeople, setNumPeople] = useState(3);
  const [ownedEquipment, setOwnedEquipment] = useState<string[]>([]);
  const [budgetLevel, setBudgetLevel] = useState<PrepLevel>("essential");

  const score = useMemo(
    () => calcAutonomyScore(heating, cooking, waterHeater, numPeople, ownedEquipment),
    [heating, cooking, waterHeater, numPeople, ownedEquipment]
  );

  const budget = useMemo(
    () => calcEquipmentBudget(budgetLevel, numPeople, ownedEquipment),
    [budgetLevel, numPeople, ownedEquipment]
  );

  const colors = LEVEL_COLORS[score.level];

  function toggleEquipment(id: string) {
    setOwnedEquipment((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  }

  return (
    <div className="space-y-6">
      {/* Config */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800">Your Home Setup</h3>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Housing type</label>
            <div className="flex gap-2">
              {(Object.keys(HOUSING_LABELS) as HousingType[]).map((h) => (
                <button key={h} onClick={() => setHousing(h)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${housing === h ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  {HOUSING_LABELS[h]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Heating</label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(HEATING_LABELS) as HeatingType[]).map((h) => (
                <button key={h} onClick={() => setHeating(h)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${heating === h ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  {HEATING_LABELS[h]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Cooking</label>
            <div className="flex gap-2">
              {(Object.keys(COOKING_LABELS) as CookingType[]).map((c) => (
                <button key={c} onClick={() => setCooking(c)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${cooking === c ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  {COOKING_LABELS[c]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Water heater</label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(WATER_HEATER_LABELS) as WaterHeaterType[]).map((w) => (
                <button key={w} onClick={() => setWaterHeater(w)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${waterHeater === w ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  {WATER_HEATER_LABELS[w]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">People in household: {numPeople}</label>
            <input type="range" min="1" max="8" value={numPeople}
              onChange={(e) => setNumPeople(parseInt(e.target.value))}
              className="w-full accent-slate-800" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Equipment you already own</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {EQUIPMENT.map((eq) => (
              <button key={eq.id} onClick={() => toggleEquipment(eq.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-left transition-all ${ownedEquipment.includes(eq.id) ? "bg-emerald-50 border-2 border-emerald-400 text-emerald-800" : "bg-slate-50 border-2 border-transparent text-slate-600 hover:bg-slate-100"}`}>
                <span>{eq.emoji}</span>
                <span className="font-medium">{eq.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Score */}
      <div className={`bg-gradient-to-br ${score.level === "prepared" ? "from-emerald-600 to-teal-600" : score.level === "decent" ? "from-yellow-500 to-orange-500" : score.level === "fragile" ? "from-orange-500 to-red-500" : "from-red-600 to-red-800"} text-white rounded-2xl p-8 shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/70 text-sm">Blackout readiness score</p>
            <p className="text-5xl font-extrabold">{score.totalScore}/100</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{colors.label}</p>
            <p className="text-white/70 text-sm">Estimated autonomy: {fmtDuration(score.autonomyDurationH)}</p>
          </div>
        </div>

        <div className="w-full bg-white/20 rounded-full h-3 mb-6">
          <div className="bg-white rounded-full h-3 transition-all" style={{ width: `${score.totalScore}%` }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {score.details.map((d) => (
            <div key={d.category} className="bg-white/10 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <span>{d.emoji}</span>
                <span className="text-xs font-medium text-white/80">{d.label}</span>
              </div>
              <p className="font-bold text-lg">{d.score}/{d.max}</p>
              {d.autonomyH > 0 && <p className="text-xs text-white/60">{fmtDuration(d.autonomyH)}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Vulnerabilities & Strengths */}
      <div className="grid gap-6 sm:grid-cols-2">
        {score.vulnerabilities.length > 0 && (
          <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
            <h3 className="font-bold text-red-800 mb-3">Vulnerabilities</h3>
            <ul className="space-y-2">
              {score.vulnerabilities.map((v, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                  <span className="text-red-400 mt-0.5">⚠️</span>{v}
                </li>
              ))}
            </ul>
          </div>
        )}
        {score.strengths.length > 0 && (
          <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
            <h3 className="font-bold text-emerald-800 mb-3">Strengths</h3>
            <ul className="space-y-2">
              {score.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-emerald-700">
                  <span className="text-emerald-400 mt-0.5">✅</span>{s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Budget */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Emergency Kit Budget</h3>
        <div className="flex gap-2 mb-6">
          {(Object.keys(LEVEL_LABELS) as PrepLevel[]).map((l) => (
            <button key={l} onClick={() => setBudgetLevel(l)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${budgetLevel === l ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              {LEVEL_LABELS[l]}
            </button>
          ))}
        </div>

        <div className="space-y-2 mb-6">
          {budget.items.map((item) => (
            <div key={item.equipment.id}
              className={`flex items-center justify-between px-4 py-3 rounded-xl ${item.alreadyOwned ? "bg-emerald-50 border border-emerald-200" : "bg-slate-50"}`}>
              <div className="flex items-center gap-3">
                <span>{item.equipment.emoji}</span>
                <div>
                  <p className="text-sm font-medium text-slate-700">{item.equipment.name}</p>
                  {item.alreadyOwned && <p className="text-xs text-emerald-600">Already owned</p>}
                </div>
              </div>
              <p className={`font-bold text-sm ${item.alreadyOwned ? "text-emerald-600 line-through" : "text-slate-800"}`}>
                ${item.estimatedPrice}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 rounded-xl p-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-slate-400">Full kit cost</p>
            <p className="text-lg font-bold text-slate-800">${budget.totalNew}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Already owned</p>
            <p className="text-lg font-bold text-emerald-600">-${budget.totalOwned}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">To invest</p>
            <p className="text-lg font-bold text-blue-600">${budget.toInvest}</p>
          </div>
        </div>
      </div>

      {/* US-specific context */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Note:</strong> US power outages average 5+ incidents per year per household, with an average duration of ~2.5 hours.
          However, extreme events (Texas Winter Storm 2021, California wildfires, hurricanes) can cause blackouts lasting days to weeks.
          Prices shown are estimates in US dollars for typical retail purchases on Amazon or at hardware stores like Home Depot and Lowe&apos;s.
        </p>
      </div>
    </div>
  );
}
