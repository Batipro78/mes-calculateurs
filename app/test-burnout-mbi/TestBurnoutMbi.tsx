"use client";

import { useMemo, useState } from "react";
import {
  QUESTIONS_MBI,
  ECHELLE_FREQUENCE,
  calculerMbi,
  niveauLabel,
} from "./burnoutMbiCalc";

export default function TestBurnoutMbi() {
  const [reponses, setReponses] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const nbReponses = Object.keys(reponses).length;
  const progression = Math.round((nbReponses / QUESTIONS_MBI.length) * 100);
  const complet = nbReponses === QUESTIONS_MBI.length;

  const resultat = useMemo(() => {
    if (!submitted) return null;
    return calculerMbi(reponses);
  }, [reponses, submitted]);

  const setReponse = (questionId: number, value: number) => {
    setReponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const reset = () => {
    setReponses({});
    setSubmitted(false);
  };

  const couleurNiveau = (niveau: string) => {
    if (niveau === "eleve") return "bg-red-50 border-red-200 text-red-900";
    if (niveau === "modere") return "bg-amber-50 border-amber-200 text-amber-900";
    return "bg-green-50 border-green-200 text-green-900";
  };

  const couleurBarre = (niveau: string) => {
    if (niveau === "eleve") return "from-red-500 to-rose-600";
    if (niveau === "modere") return "from-amber-400 to-orange-500";
    return "from-green-500 to-emerald-600";
  };

  return (
    <div className="space-y-8">
      {/* Progression */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-800">
            Progression du test
          </h2>
          <span className="text-sm font-semibold text-violet-700">
            {nbReponses} / {QUESTIONS_MBI.length}
          </span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-300"
            style={{ width: `${progression}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Repondez selon la frequence a laquelle vous ressentez chaque
          affirmation dans votre travail.
        </p>
      </div>

      {/* Questionnaire */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <ol className="space-y-6">
          {QUESTIONS_MBI.map((q) => (
            <li key={q.id} className="border-b border-slate-100 pb-5 last:border-b-0">
              <p className="text-sm sm:text-base font-medium text-slate-800 mb-3">
                <span className="text-violet-600 mr-2">{q.id}.</span>
                {q.texte}
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                {ECHELLE_FREQUENCE.map((opt) => {
                  const selected = reponses[q.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setReponse(q.id, opt.value)}
                      className={`px-2 py-2 rounded-lg border text-xs font-medium transition ${
                        selected
                          ? "bg-violet-600 text-white border-violet-600 shadow-sm"
                          : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:bg-violet-50"
                      }`}
                    >
                      <div className="font-bold">{opt.value}</div>
                      <div className="text-[10px] leading-tight mt-1">
                        {opt.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Bouton submit */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!complet}
          onClick={() => setSubmitted(true)}
          className={`flex-1 sm:flex-none px-6 py-3 rounded-lg font-semibold transition ${
            complet
              ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white hover:shadow-lg"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          {complet ? "Voir mes resultats" : `Repondez aux 22 questions (${nbReponses}/22)`}
        </button>
        {nbReponses > 0 && (
          <button
            type="button"
            onClick={reset}
            className="px-6 py-3 rounded-lg font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
          >
            Reinitialiser
          </button>
        )}
      </div>

      {/* Resultats */}
      {resultat && (
        <div className="space-y-6">
          {/* Resume global */}
          <div className={`rounded-2xl border-2 p-8 ${couleurNiveau(resultat.burnoutGlobal)}`}>
            <div className="flex items-start gap-4">
              <span className="text-4xl">
                {resultat.burnoutGlobal === "eleve" ? "🚨" : resultat.burnoutGlobal === "modere" ? "⚠️" : "✅"}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium opacity-80 mb-1">
                  Resultat global du test MBI
                </p>
                <h3 className="text-2xl font-bold mb-2">
                  Burnout : niveau {niveauLabel(resultat.burnoutGlobal)}
                </h3>
                <p className="text-sm leading-relaxed">{resultat.resume}</p>
                <div className="mt-4 bg-white bg-opacity-50 rounded-lg p-3">
                  <p className="text-xs font-medium opacity-70 mb-1">
                    Indice de risque global
                  </p>
                  <p className="text-3xl font-bold">{resultat.scoreTotalRisque}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scores par dimension */}
          <div className="grid gap-6 md:grid-cols-3">
            {resultat.dimensions.map((dim) => (
              <div
                key={dim.dimension}
                className="bg-white rounded-2xl border border-slate-200 p-6"
              >
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Dimension {dim.dimension}
                </p>
                <h4 className="text-lg font-bold text-slate-800 mt-1 mb-3">
                  {dim.nomComplet}
                </h4>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-slate-800">
                    {dim.score}
                  </span>
                  <span className="text-sm text-slate-500">
                    / {dim.scoreMax}
                  </span>
                </div>

                <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full bg-gradient-to-r ${couleurBarre(dim.niveau)} transition-all duration-300`}
                    style={{ width: `${(dim.score / dim.scoreMax) * 100}%` }}
                  />
                </div>

                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${couleurNiveau(dim.niveau)}`}
                >
                  Niveau {niveauLabel(dim.niveau)}
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {dim.description}
                </p>
              </div>
            ))}
          </div>

          {/* Interpretation detaillee */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
            <h4 className="text-lg font-bold text-slate-800 mb-4">
              Comment interpreter ces resultats ?
            </h4>
            <div className="space-y-3 text-sm text-slate-700">
              <p>
                <strong>Epuisement emotionnel (EE) :</strong> evalue la fatigue
                psychique liee au travail. Score eleve (27 ou plus) = signal
                d&apos;alerte.
              </p>
              <p>
                <strong>Depersonnalisation (DP) :</strong> mesure le cynisme et
                la distance vis-a-vis des autres. Score eleve (13 ou plus) =
                deshumanisation des relations.
              </p>
              <p>
                <strong>Accomplissement personnel (AP) :</strong> attention,
                cette dimension est inversee. Un score BAS (33 ou moins) =
                sentiment d&apos;inefficacite, donc burnout.
              </p>
              <p className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
                Le burnout est diagnostique cliniquement lorsque les 3
                dimensions sont alterees simultanement. Ce test est un outil
                d&apos;auto-evaluation, pas un diagnostic medical.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
