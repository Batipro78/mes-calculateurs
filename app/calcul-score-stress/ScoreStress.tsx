"use client";

import { useState } from "react";
import { calcStress } from "./stressCalc";
import type { NiveauStress, Facteur } from "./stressCalc";

const QUESTIONS = [
  "A quelle frequence avez-vous ete derange par un evenement inattendu ?",
  "A quelle frequence avez-vous eu le sentiment de ne pas pouvoir controler les choses importantes de votre vie ?",
  "A quelle frequence vous etes-vous senti nerveux et stresse ?",
  "A quelle frequence avez-vous gere avec succes les petits problemes irritants de la vie ?",
  "A quelle frequence avez-vous senti que vous faisiez face efficacement aux changements importants ?",
  "A quelle frequence avez-vous manque de confiance dans votre capacite a gerer vos problemes personnels ?",
  "A quelle frequence avez-vous senti que les choses allaient comme vous le vouliez ?",
  "A quelle frequence avez-vous trouve que vous ne pouviez pas faire face a tout ce que vous aviez a faire ?",
  "A quelle frequence avez-vous ete capable de maitriser votre enervement ?",
  "A quelle frequence avez-vous senti que les difficultes s'accumulaient au point de ne plus pouvoir les surmonter ?",
];

const LABELS = ["Jamais", "Rarement", "Parfois", "Souvent", "Tres souvent"];
const REVERSE_INDICES = [3, 4, 6, 8];

function niveauGradient(n: NiveauStress): string {
  if (n === "faible") return "from-green-500 to-emerald-600";
  if (n === "modere") return "from-yellow-500 to-amber-500";
  return "from-red-500 to-rose-600";
}

function niveauLabel(n: NiveauStress): string {
  if (n === "faible") return "Stress faible";
  if (n === "modere") return "Stress modere";
  return "Stress eleve";
}

function niveauBadgeBg(n: NiveauStress): string {
  if (n === "faible") return "bg-green-100 text-green-700";
  if (n === "modere") return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}

function facteurColor(s: Facteur["statut"]): string {
  if (s === "bon") return "border-green-200 bg-green-50";
  if (s === "attention") return "border-yellow-200 bg-yellow-50";
  return "border-red-200 bg-red-50";
}

function facteurBadge(s: Facteur["statut"]): string {
  if (s === "bon") return "bg-green-100 text-green-700";
  if (s === "attention") return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}

function facteurLabel(s: Facteur["statut"]): string {
  if (s === "bon") return "Bon";
  if (s === "attention") return "A surveiller";
  return "Risque";
}

export default function ScoreStress() {
  const [reponses, setReponses] = useState<number[]>(Array(10).fill(2));

  const handleChange = (index: number, value: number) => {
    const next = [...reponses];
    next[index] = value;
    setReponses(next);
  };

  const resultat = calcStress(reponses);

  return (
    <div className="space-y-8">
      {/* Questions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-2">Questionnaire PSS-10</h2>
        <p className="text-sm text-slate-500 mb-6">
          Pour chaque question, indiquez a quelle frequence vous avez ressenti cela au cours du <strong>dernier mois</strong>.
        </p>

        <div className="space-y-6">
          {QUESTIONS.map((q, i) => (
            <div key={i} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
              <p className="text-sm font-medium text-slate-700 mb-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-violet-100 text-violet-700 text-xs font-bold mr-2">
                  {i + 1}
                </span>
                {q}
                {REVERSE_INDICES.includes(i) && (
                  <span className="ml-2 text-xs text-violet-500 font-normal">(question positive)</span>
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {LABELS.map((label, val) => (
                  <button
                    key={val}
                    onClick={() => handleChange(i, val)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      reponses[i] === val
                        ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-200"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resultat principal */}
      <div className={`bg-gradient-to-br ${niveauGradient(resultat.niveau)} rounded-2xl p-8 text-white shadow-xl`}>
        <div className="grid gap-6 sm:grid-cols-2 items-center">
          <div>
            <p className="text-white/80 text-sm font-medium mb-1">Score PSS-10</p>
            <p className="text-6xl font-extrabold tracking-tight">{resultat.score}</p>
            <p className="text-white/70 text-sm mt-1">sur {resultat.maxScore}</p>
            <div className="mt-4 inline-block bg-white/20 backdrop-blur rounded-xl px-4 py-2">
              <p className="text-lg font-bold">{niveauLabel(resultat.niveau)}</p>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 120 120" className="w-full h-full">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${resultat.pourcentage * 3.14} ${314 - resultat.pourcentage * 3.14}`}
                    strokeDashoffset="78.5"
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-extrabold">{resultat.pourcentage}%</span>
                </div>
              </div>
              <p className="text-xs text-white/60 mt-2">du score maximum</p>
            </div>
          </div>
        </div>

        {/* Barre de score */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/80">Score</span>
            <span className="font-bold">{resultat.score} / {resultat.maxScore}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="h-3 rounded-full bg-white/80 transition-all duration-500"
              style={{ width: `${resultat.pourcentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/60 mt-1">
            <span>Faible (0-13)</span>
            <span>Modere (14-26)</span>
            <span>Eleve (27-40)</span>
          </div>
        </div>

        {/* Interpretation */}
        <div className="mt-6 bg-white/10 backdrop-blur rounded-xl p-4">
          <p className="text-sm leading-relaxed">{resultat.interpretation}</p>
        </div>
      </div>

      {/* Analyse des facteurs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Analyse par facteur</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {resultat.facteurs.map((f) => (
            <div
              key={f.nom}
              className={`rounded-xl border p-5 ${facteurColor(f.statut)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-slate-800">{f.nom}</p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${facteurBadge(f.statut)}`}>
                  {facteurLabel(f.statut)}
                </span>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-2xl font-extrabold text-slate-800">{f.score}</span>
                <span className="text-sm text-slate-500 mb-0.5">/ {f.max}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    f.statut === "bon"
                      ? "bg-green-500"
                      : f.statut === "attention"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${Math.round((f.score / f.max) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {f.nom === "Sentiment de controle"
                  ? "Capacite a gerer les situations et a se sentir en controle de sa vie (score eleve = moins de controle percu)"
                  : "Frequence des pensees et emotions negatives liees au stress (score eleve = plus de negativite)"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Conseils */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Conseils personnalises</h3>
        <ul className="space-y-3">
          {resultat.conseils.map((c, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
              <span className="mt-0.5 w-6 h-6 shrink-0 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center font-bold text-xs">
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
          Avertissement : Ce test est un outil d&apos;auto-evaluation informatif base sur l&apos;echelle PSS-10 (Cohen, Kamarck &amp; Mermelstein, 1983). Il ne constitue pas un diagnostic medical. Si vous ressentez un stress intense ou prolonge, consultez un professionnel de sante (medecin, psychologue, psychiatre).
        </p>
      </div>
    </div>
  );
}
