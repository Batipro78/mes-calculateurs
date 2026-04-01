"use client";

import { useState, useMemo } from "react";
import {
  Gender, MedicalStatus, MilitaryExp, FamilyStatus, Occupation,
  GENDER_LABELS, MEDICAL_LABELS, MILITARY_LABELS, FAMILY_LABELS, OCCUPATION_LABELS,
  calcDraftRisk,
} from "./draftCalcEN";

export default function DraftSimulator() {
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState(25);
  const [medical, setMedical] = useState<MedicalStatus>("fit");
  const [military, setMilitary] = useState<MilitaryExp>("registered");
  const [family, setFamily] = useState<FamilyStatus>("single");
  const [occupation, setOccupation] = useState<Occupation>("standard");

  const result = useMemo(
    () => calcDraftRisk(gender, age, medical, military, family, occupation),
    [gender, age, medical, military, family, occupation]
  );

  return (
    <div className="space-y-6">
      {/* Config */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800">Personal Profile</h3>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Gender</label>
            <div className="flex gap-2">
              {(Object.keys(GENDER_LABELS) as Gender[]).map((g) => (
                <button key={g} onClick={() => setGender(g)}
                  className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${gender === g ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  {GENDER_LABELS[g]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Age: {age}</label>
            <input type="range" min="16" max="70" value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              className="w-full accent-slate-800" />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>16</span><span>26</span><span>35</span><span>45</span><span>55</span><span>70</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Medical status</label>
            <div className="space-y-2">
              {(Object.keys(MEDICAL_LABELS) as MedicalStatus[]).map((m) => (
                <button key={m} onClick={() => setMedical(m)}
                  className={`w-full px-4 py-2 rounded-xl text-left text-sm font-medium transition-all ${medical === m ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  {MEDICAL_LABELS[m]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Military experience</label>
            <div className="space-y-2">
              {(Object.keys(MILITARY_LABELS) as MilitaryExp[]).map((m) => (
                <button key={m} onClick={() => setMilitary(m)}
                  className={`w-full px-4 py-2 rounded-xl text-left text-sm font-medium transition-all ${military === m ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  {MILITARY_LABELS[m]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Family situation</label>
            <div className="space-y-2">
              {(Object.keys(FAMILY_LABELS) as FamilyStatus[]).map((f) => (
                <button key={f} onClick={() => setFamily(f)}
                  className={`w-full px-4 py-2 rounded-xl text-left text-sm font-medium transition-all ${family === f ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  {FAMILY_LABELS[f]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Occupation</label>
            <select value={occupation} onChange={(e) => setOccupation(e.target.value as Occupation)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none">
              {(Object.keys(OCCUPATION_LABELS) as Occupation[]).map((o) => (
                <option key={o} value={o}>{OCCUPATION_LABELS[o]}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="rounded-2xl p-8 text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${result.color}, ${result.color}dd)` }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/70 text-sm">Draft priority score</p>
            <p className="text-5xl font-extrabold">{result.score}/100</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{result.label}</p>
            <p className="text-white/70 text-sm">{gender === "male" ? "Male" : "Female"}, {age} years old</p>
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3 mb-4">
          <div className="bg-white rounded-full h-3 transition-all" style={{ width: `${result.score}%` }} />
        </div>
        <p className="text-white/90 text-sm leading-relaxed">{result.description}</p>
      </div>

      {/* Factors */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Scoring Factors</h3>
        <div className="space-y-2">
          {result.factors.map((f, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-xl">{f.emoji}</span>
                <p className="text-sm font-medium text-slate-700">{f.label}</p>
              </div>
              <p className={`font-bold text-sm ${f.points > 0 ? "text-red-600" : f.points < 0 ? "text-emerald-600" : "text-slate-400"}`}>
                {f.points > 0 ? `+${f.points}` : f.points}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* US Selective Service Info */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-3">US Selective Service System</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-white rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm">Registration Required</p>
            <p className="text-xs text-slate-500">All US males ages 18-25 must register. Failure to register can result in denial of federal student aid, government jobs, and citizenship applications.</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm">No Active Draft Since 1973</p>
            <p className="text-xs text-slate-500">The US has not drafted anyone since 1973 (Vietnam War). The all-volunteer force has been in place for 50+ years. However, the Selective Service system remains active.</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm">How a Draft Would Work</p>
            <p className="text-xs text-slate-500">Congress and the President would need to authorize activation. A lottery system would determine call-up order by birthday. Classification boards would process deferment claims.</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm">Conscientious Objector Status</p>
            <p className="text-xs text-slate-500">Those opposed to war on moral/religious grounds can apply for CO status. If approved, they serve in non-combat roles or alternative civilian service.</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Disclaimer:</strong> This is a hypothetical educational simulator. There is currently NO active
          draft in the United States. The Selective Service System exists as a contingency, but a draft
          would require an act of Congress. This tool does not predict actual military conscription risk. Scores
          are based on historical draft patterns and current Selective Service regulations.
        </p>
      </div>
    </div>
  );
}
