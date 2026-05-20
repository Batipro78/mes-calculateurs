"use client";

import { useState } from "react";
import {
  calculerGAD7,
  QUESTIONS_GAD7,
  ECHELLE_REPONSES,
  SEUILS_GAD7,
} from "./gad7Calc";

export default function TestAnxieteGAD7() {
  const [reponses, setReponses] = useState<number[]>(
    Array(QUESTIONS_GAD7.length).fill(-1)
  );
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = reponses.every((v) => v >= 0);
  const handleChange = (index: number, valeur: number) => {
    const next = [...reponses];
    next[index] = valeur;
    setReponses(next);
  };

  const handleSubmit = () => {
    if (allAnswered) setSubmitted(true);
  };

  const handleReset = () => {
    setReponses(Array(QUESTIONS_GAD7.length).fill(-1));
    setSubmitted(false);
  };

  const reponsesPourCalcul = reponses.map((v) => (v < 0 ? 0 : v));
  const resultat = calculerGAD7(reponsesPourCalcul);

  const couleurMap: Record<string, { bg: string; border: string; text: string; gauge: string }> = {
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-900",
      gauge: "from-green-400 to-emerald-500",
    },
    yellow: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-900",
      gauge: "from-yellow-400 to-amber-500",
    },
    orange: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-900",
      gauge: "from-orange-400 to-orange-600",
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-900",
      gauge: "from-red-500 to-rose-600",
    },
  };

  const c = couleurMap[resultat.couleur];
  const pourcentage = Math.round((resultat.scoreTotal / 21) * 100);

  return (
    <div className="space-y-8">
      {/* Intro / consignes */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-blue-900 mb-2">
          Au cours des 2 dernieres semaines
        </h2>
        <p className="text-blue-800 text-sm leading-relaxed">
          Pour chaque enonce, indiquez la frequence a laquelle vous avez ete
          gene(e) par ce probleme. Repondez aux 7 questions pour obtenir votre
          score GAD-7.
        </p>
        <p className="text-blue-700 text-xs mt-3 italic">
          Ce test est un outil de depistage. Il ne remplace pas un diagnostic
          medical realise par un professionnel de sante.
        </p>
      </div>

      {/* Questionnaire */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <ol className="space-y-6">
          {QUESTIONS_GAD7.map((q, idx) => (
            <li key={q.id} className="border-b border-slate-100 last:border-b-0 pb-5 last:pb-0">
              <p className="font-medium text-slate-800 mb-3">
                {q.id}. {q.texte}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ECHELLE_REPONSES.map((opt) => {
                  const isSelected = reponses[idx] === opt.valeur;
                  return (
                    <button
                      key={opt.valeur}
                      type="button"
                      onClick={() => handleChange(idx, opt.valeur)}
                      className={`text-sm px-3 py-2 rounded-lg border transition ${
                        isSelected
                          ? "bg-violet-600 border-violet-600 text-white font-semibold shadow-sm"
                          : "bg-white border-slate-200 text-slate-700 hover:border-violet-400 hover:bg-violet-50"
                      }`}
                    >
                      <span className="block text-xs opacity-75 mb-0.5">
                        {opt.valeur}
                      </span>
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
              allAnswered
                ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-sm hover:shadow-md"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            {allAnswered ? "Calculer mon score" : `Repondez aux ${reponses.filter((v) => v < 0).length} question(s) restante(s)`}
          </button>
          {submitted && (
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 rounded-lg font-medium border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Recommencer
            </button>
          )}
        </div>
      </div>

      {/* Resultat */}
      {submitted && (
        <div className="space-y-6">
          <div className={`bg-gradient-to-br ${c.gauge} rounded-2xl p-8 text-white shadow-lg`}>
            <p className="text-sm font-medium opacity-90 mb-2">Votre score GAD-7</p>
            <div className="flex items-baseline gap-3 mb-4">
              <p className="text-6xl font-bold">{resultat.scoreTotal}</p>
              <p className="text-xl opacity-80">/ 21</p>
            </div>
            <p className="text-lg font-semibold mb-1">{resultat.nomNiveau}</p>

            {/* Barre de progression */}
            <div className="mt-6 h-3 bg-white bg-opacity-30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${pourcentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs opacity-90 mt-1">
              <span>0</span>
              <span>21</span>
            </div>
          </div>

          <div className={`${c.bg} ${c.border} border rounded-2xl p-6`}>
            <h3 className={`font-bold ${c.text} mb-2`}>Interpretation</h3>
            <p className={`${c.text} text-sm leading-relaxed mb-4`}>
              {resultat.description}
            </p>
            <h4 className={`font-bold ${c.text} mb-1 text-sm`}>Recommandation</h4>
            <p className={`${c.text} text-sm leading-relaxed`}>
              {resultat.recommandation}
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <p className="text-amber-900 font-semibold mb-2 text-sm">
              Important
            </p>
            <p className="text-amber-800 text-sm leading-relaxed">
              Le GAD-7 est un outil de depistage valide scientifiquement, mais
              il ne pose pas de diagnostic. Si votre score est eleve ou si vous
              ressentez une souffrance, parlez-en a votre medecin traitant ou
              consultez un psychologue.
            </p>
            <p className="text-amber-800 text-sm leading-relaxed mt-3">
              <strong>Numeros utiles :</strong> 3114 (prevention suicide,
              gratuit 24h/24), 15 (urgences medicales), SOS Amitie
              09 72 39 40 50.
            </p>
          </div>
        </div>
      )}

      {/* Tableau seuils */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          Bareme d&apos;interpretation du score GAD-7
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-3 font-semibold text-slate-700">Score</th>
                <th className="text-left py-3 px-3 font-semibold text-slate-700">Niveau</th>
                <th className="text-left py-3 px-3 font-semibold text-slate-700">Indication</th>
              </tr>
            </thead>
            <tbody>
              {SEUILS_GAD7.map((s) => (
                <tr key={s.niveau} className="border-b border-slate-100">
                  <td className="py-3 px-3 font-medium text-slate-800">
                    {s.min} - {s.max}
                  </td>
                  <td className="py-3 px-3 text-slate-700">{s.niveau}</td>
                  <td className="py-3 px-3 text-slate-600 text-xs">
                    {s.niveau === "Minimale" && "Pas d'anxiete cliniquement significative"}
                    {s.niveau === "Legere" && "Surveillance recommandee"}
                    {s.niveau === "Moderee" && "Consultation recommandee"}
                    {s.niveau === "Severe" && "Prise en charge medicale necessaire"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Seuils valides par Spitzer et al. (2006). Sensibilite 89%, specificite
          82% pour le trouble anxieux generalise au seuil de 10.
        </p>
      </div>
    </div>
  );
}
