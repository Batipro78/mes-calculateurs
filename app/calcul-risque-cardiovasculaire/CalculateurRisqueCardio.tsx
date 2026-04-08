"use client";

import { useState } from "react";
import { calcRisqueCardio } from "./risqueCardioCalc";
import type { Statut, Categorie } from "./risqueCardioCalc";

function statutColor(s: Statut): string {
  if (s === "bon") return "border-green-200 bg-green-50";
  if (s === "attention") return "border-yellow-200 bg-yellow-50";
  return "border-red-200 bg-red-50";
}

function statutBadge(s: Statut): string {
  if (s === "bon") return "bg-green-100 text-green-700";
  if (s === "attention") return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}

function statutLabel(s: Statut): string {
  if (s === "bon") return "Bon";
  if (s === "attention") return "A surveiller";
  return "Risque";
}

function categorieGradient(c: Categorie): string {
  if (c === "faible") return "from-green-500 to-emerald-600";
  if (c === "modere") return "from-yellow-500 to-amber-500";
  if (c === "eleve") return "from-orange-500 to-orange-600";
  return "from-red-600 to-rose-600";
}

function categorieLabel(c: Categorie): string {
  if (c === "faible") return "Risque faible";
  if (c === "modere") return "Risque modere";
  if (c === "eleve") return "Risque eleve";
  return "Risque tres eleve";
}

function categorieText(c: Categorie): string {
  if (c === "faible") return "text-green-600";
  if (c === "modere") return "text-yellow-600";
  if (c === "eleve") return "text-orange-600";
  return "text-red-600";
}

// Jauge semi-circulaire (0 -> 40%)
function RiskGauge({ risque }: { risque: string }) {
  const raw = risque.replace(">", "").replace("%", "");
  const val = Math.min(40, parseFloat(raw));
  const pct = val / 40; // 0..1
  // Arc SVG : rayon 80, centre 100,100, de 180 a 0 deg
  const R = 80;
  const cx = 100;
  const cy = 100;
  // Angle : 180 deg (gauche) a 0 deg (droite) = 180 deg total
  const angle = 180 - pct * 180; // en degres depuis l'horizontale gauche
  const rad = (angle * Math.PI) / 180;
  const nx = cx + R * Math.cos(rad);
  const ny = cy - R * Math.sin(rad);

  const trackD = `M ${cx - R},${cy} A ${R},${R} 0 0,1 ${cx + R},${cy}`;
  // Arc de 180 a angle
  const fillAng = 180 - pct * 180;
  const fillRad = (fillAng * Math.PI) / 180;
  const ex = cx + R * Math.cos(fillRad);
  const ey = cy - R * Math.sin(fillRad);
  const largeArc = pct > 0.5 ? 1 : 0;
  const fillD = pct === 0
    ? ""
    : `M ${cx - R},${cy} A ${R},${R} 0 ${largeArc},1 ${ex},${ey}`;

  // Couleur selon risque
  const strokeFill = val <= 5 ? "#22c55e" : val <= 10 ? "#eab308" : val <= 20 ? "#f97316" : "#ef4444";

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 110" className="w-full max-w-[200px]">
        {/* Track */}
        <path d={trackD} fill="none" stroke="#e2e8f0" strokeWidth="16" strokeLinecap="round" />
        {/* Fill */}
        {pct > 0 && (
          <path d={fillD} fill="none" stroke={strokeFill} strokeWidth="16" strokeLinecap="round" />
        )}
        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={nx}
          y2={ny}
          stroke="#334155"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="5" fill="#334155" />
        {/* Labels */}
        <text x="18" y="108" fontSize="9" fill="#94a3b8">0%</text>
        <text x="86" y="22" fontSize="9" fill="#94a3b8">20%</text>
        <text x="167" y="108" fontSize="9" fill="#94a3b8">40%</text>
      </svg>
      <p className="text-3xl font-extrabold mt-1" style={{ color: strokeFill }}>{risque}</p>
      <p className="text-xs text-slate-400 mt-0.5">risque a 10 ans</p>
    </div>
  );
}

export default function CalculateurRisqueCardio() {
  const [age, setAge] = useState(50);
  const [sexe, setSexe] = useState<"homme" | "femme">("homme");
  const [cholesterolTotal, setCholesterolTotal] = useState(220);
  const [cholesterolHDL, setCholesterolHDL] = useState(50);
  const [tensionSystolique, setTensionSystolique] = useState(130);
  const [tabac, setTabac] = useState(false);
  const [diabete, setDiabete] = useState(false);
  const [antecedents, setAntecedents] = useState(false);

  const resultat = calcRisqueCardio(
    age,
    sexe,
    cholesterolTotal,
    cholesterolHDL,
    tensionSystolique,
    tabac,
    diabete,
    antecedents
  );

  return (
    <div className="space-y-8">
      {/* Formulaire */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-6">Vos informations</h2>

        {/* Sexe */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">Sexe</label>
          <div className="flex gap-3">
            <button
              onClick={() => setSexe("homme")}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${
                sexe === "homme"
                  ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Homme
            </button>
            <button
              onClick={() => setSexe("femme")}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${
                sexe === "femme"
                  ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Femme
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Age */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
            <div className="relative">
              <input
                type="number"
                min={18}
                max={90}
                step={1}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-slate-800 font-semibold"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">ans</span>
            </div>
            <input
              type="range"
              min={18}
              max={90}
              step={1}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full mt-2 accent-red-600"
            />
          </div>

          {/* Cholesterol total */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Cholesterol total
            </label>
            <div className="relative">
              <input
                type="number"
                min={100}
                max={400}
                step={1}
                value={cholesterolTotal}
                onChange={(e) => setCholesterolTotal(Number(e.target.value))}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-slate-800 font-semibold"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">mg/dL</span>
            </div>
            <input
              type="range"
              min={100}
              max={400}
              step={5}
              value={cholesterolTotal}
              onChange={(e) => setCholesterolTotal(Number(e.target.value))}
              className="w-full mt-2 accent-red-600"
            />
          </div>

          {/* HDL */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Cholesterol HDL
            </label>
            <div className="relative">
              <input
                type="number"
                min={20}
                max={120}
                step={1}
                value={cholesterolHDL}
                onChange={(e) => setCholesterolHDL(Number(e.target.value))}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-slate-800 font-semibold"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">mg/dL</span>
            </div>
            <input
              type="range"
              min={20}
              max={120}
              step={5}
              value={cholesterolHDL}
              onChange={(e) => setCholesterolHDL(Number(e.target.value))}
              className="w-full mt-2 accent-red-600"
            />
          </div>

          {/* Tension */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tension systolique
            </label>
            <div className="relative">
              <input
                type="number"
                min={80}
                max={220}
                step={1}
                value={tensionSystolique}
                onChange={(e) => setTensionSystolique(Number(e.target.value))}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-slate-800 font-semibold"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">mmHg</span>
            </div>
            <input
              type="range"
              min={80}
              max={220}
              step={5}
              value={tensionSystolique}
              onChange={(e) => setTensionSystolique(Number(e.target.value))}
              className="w-full mt-2 accent-red-600"
            />
          </div>

          {/* Facteurs binaires */}
          <div className="lg:col-span-1 space-y-3">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Facteurs de risque
            </label>

            <button
              onClick={() => setTabac(!tabac)}
              className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-between ${
                tabac
                  ? "bg-red-100 text-red-700 border-2 border-red-300"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 border-2 border-transparent"
              }`}
            >
              <span>Fumeur</span>
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs ${tabac ? "bg-red-600 border-red-600 text-white" : "border-slate-400"}`}>
                {tabac ? "✓" : ""}
              </span>
            </button>

            <button
              onClick={() => setDiabete(!diabete)}
              className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-between ${
                diabete
                  ? "bg-red-100 text-red-700 border-2 border-red-300"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 border-2 border-transparent"
              }`}
            >
              <span>Diabete</span>
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs ${diabete ? "bg-red-600 border-red-600 text-white" : "border-slate-400"}`}>
                {diabete ? "✓" : ""}
              </span>
            </button>

            <button
              onClick={() => setAntecedents(!antecedents)}
              className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-between ${
                antecedents
                  ? "bg-red-100 text-red-700 border-2 border-red-300"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 border-2 border-transparent"
              }`}
            >
              <span>Antecedents</span>
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs ${antecedents ? "bg-red-600 border-red-600 text-white" : "border-slate-400"}`}>
                {antecedents ? "✓" : ""}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Resultat principal */}
      <div className={`bg-gradient-to-br ${categorieGradient(resultat.categorie)} rounded-2xl p-8 text-white shadow-xl`}>
        <div className="grid gap-8 sm:grid-cols-2 items-center">
          <div>
            <p className="text-white/80 text-sm font-medium mb-1">Score de risque Framingham</p>
            <p className="text-6xl font-extrabold tracking-tight">{resultat.score}</p>
            <p className="text-white/70 text-sm mt-1">points / 30</p>
            <div className="mt-4 inline-block bg-white/20 backdrop-blur rounded-xl px-4 py-2">
              <p className="text-lg font-bold">{categorieLabel(resultat.categorie)}</p>
            </div>
          </div>
          <div>
            <RiskGauge risque={resultat.risquePourcentage} />
          </div>
        </div>

        {/* Barre score */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/80">Score</span>
            <span className="font-bold">{resultat.score} / 30</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="h-3 rounded-full bg-white/80 transition-all duration-500"
              style={{ width: `${Math.min(100, (resultat.score / 30) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/60 mt-1">
            <span>Faible</span>
            <span>Modere</span>
            <span>Eleve</span>
            <span>Tres eleve</span>
          </div>
        </div>
      </div>

      {/* Analyse des facteurs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Analyse de vos facteurs de risque</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {resultat.facteurs.map((f) => (
            <div
              key={f.nom}
              className={`rounded-xl border p-4 ${statutColor(f.statut)}`}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-slate-800">{f.nom}</p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statutBadge(f.statut)}`}>
                  {statutLabel(f.statut)}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{f.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Conseils */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Recommandations personnalisees</h3>
        <ul className="space-y-3">
          {resultat.conseils.map((c, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
              <span className="mt-0.5 w-6 h-6 shrink-0 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-xs">
                {i + 1}
              </span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-xs text-amber-800 font-medium">
          Avertissement medical : Cet outil est informatif et ne remplace pas un avis medical. Les resultats sont des estimations basees sur un score simplifie. Consultez votre medecin ou cardiologue pour une evaluation complete et personnalisee de votre risque cardiovasculaire.
        </p>
      </div>
    </div>
  );
}
