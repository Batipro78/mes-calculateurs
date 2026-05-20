"use client";

import { useMemo, useState } from "react";
import {
  QUESTIONS_PHQ9,
  ECHELLE_PHQ9,
  calculerPhq9,
  SEUILS_PHQ9,
} from "./depressionPhq9Calc";

export default function TestDepressionPhq9() {
  const [reponses, setReponses] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const nbReponses = Object.keys(reponses).length;
  const progression = Math.round((nbReponses / QUESTIONS_PHQ9.length) * 100);
  const complet = nbReponses === QUESTIONS_PHQ9.length;

  const resultat = useMemo(() => {
    if (!submitted) return null;
    return calculerPhq9(reponses);
  }, [reponses, submitted]);

  const setReponse = (questionId: number, value: number) => {
    setReponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const reset = () => {
    setReponses({});
    setSubmitted(false);
  };

  const couleurFond = (couleur: string) => {
    if (couleur === "green") return "bg-green-50 border-green-300 text-green-900";
    if (couleur === "yellow") return "bg-yellow-50 border-yellow-300 text-yellow-900";
    if (couleur === "orange") return "bg-orange-50 border-orange-300 text-orange-900";
    return "bg-red-50 border-red-300 text-red-900";
  };

  const couleurBarre = (couleur: string) => {
    if (couleur === "green") return "from-green-500 to-emerald-600";
    if (couleur === "yellow") return "from-yellow-400 to-amber-500";
    if (couleur === "orange") return "from-orange-500 to-red-500";
    return "from-red-600 to-rose-700";
  };

  return (
    <div className="space-y-8">
      {/* Intro / Question */}
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6">
        <h2 className="font-bold text-rose-900 mb-2">
          Au cours des 2 dernieres semaines, a quelle frequence avez-vous ete
          gene(e) par les problemes suivants ?
        </h2>
        <p className="text-sm text-rose-700">
          Repondez honnetement. Vos reponses sont anonymes et calculees
          localement dans votre navigateur.
        </p>
      </div>

      {/* Progression */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-800">
            Progression
          </h2>
          <span className="text-sm font-semibold text-rose-700">
            {nbReponses} / {QUESTIONS_PHQ9.length}
          </span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-pink-600 transition-all duration-300"
            style={{ width: `${progression}%` }}
          />
        </div>
      </div>

      {/* Questionnaire */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <ol className="space-y-6">
          {QUESTIONS_PHQ9.map((q) => (
            <li
              key={q.id}
              className="border-b border-slate-100 pb-5 last:border-b-0"
            >
              <p className="text-sm sm:text-base font-medium text-slate-800 mb-3">
                <span className="text-rose-600 mr-2">{q.id}.</span>
                {q.texte}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ECHELLE_PHQ9.map((opt) => {
                  const selected = reponses[q.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setReponse(q.id, opt.value)}
                      className={`px-3 py-3 rounded-lg border text-sm font-medium transition ${
                        selected
                          ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                          : "bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:bg-rose-50"
                      }`}
                    >
                      <div className="font-bold">{opt.value}</div>
                      <div className="text-xs leading-tight mt-1">
                        {opt.short}
                      </div>
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Submit */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!complet}
          onClick={() => setSubmitted(true)}
          className={`flex-1 sm:flex-none px-6 py-3 rounded-lg font-semibold transition ${
            complet
              ? "bg-gradient-to-r from-rose-600 to-pink-700 text-white hover:shadow-lg"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          {complet
            ? "Voir mon resultat"
            : `Repondez aux 9 questions (${nbReponses}/9)`}
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
          {/* Alerte suicide en haut */}
          {resultat.alerteSuicide && (
            <div className="bg-red-100 border-2 border-red-500 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🆘</span>
                <div>
                  <p className="font-bold text-red-900 text-lg mb-2">
                    Vous avez exprime des pensees de mort ou d&apos;auto-agression.
                  </p>
                  <p className="text-red-800 text-sm mb-3">
                    Ces pensees sont serieuses et meritent une attention immediate.
                    Vous n&apos;etes pas seul(e). Une aide est disponible 24h/24.
                  </p>
                  <div className="bg-white rounded-lg p-4 space-y-2">
                    <p className="font-bold text-red-900 text-lg">
                      📞 3114 - Numero national de prevention du suicide
                    </p>
                    <p className="text-sm text-red-800">
                      Gratuit, anonyme, 24h/24, 7j/7. Professionnels formes a
                      l&apos;ecoute.
                    </p>
                    <p className="text-sm text-red-800 mt-2">
                      <strong>En cas d&apos;urgence vitale :</strong> 15 (SAMU)
                      ou 112 (urgences europeennes).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Score principal */}
          <div
            className={`rounded-2xl border-2 p-8 ${couleurFond(resultat.couleur)}`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-shrink-0">
                <p className="text-sm font-medium opacity-80 mb-1">
                  Votre score PHQ-9
                </p>
                <p className="text-6xl font-bold leading-none">
                  {resultat.score}
                  <span className="text-2xl opacity-60"> / 27</span>
                </p>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{resultat.label}</h3>
                <p className="text-sm leading-relaxed mb-3">
                  {resultat.description}
                </p>
                <div className="bg-white bg-opacity-50 rounded-lg p-3">
                  <p className="text-xs font-semibold opacity-70 mb-1">
                    Recommandation
                  </p>
                  <p className="text-sm font-semibold">
                    {resultat.recommandation}
                  </p>
                </div>
              </div>
            </div>

            {/* Barre de score */}
            <div className="mt-6">
              <div className="h-3 bg-white bg-opacity-50 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${couleurBarre(resultat.couleur)} transition-all duration-300`}
                  style={{ width: `${(resultat.score / 27) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs mt-2 opacity-70">
                <span>0</span>
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
                <span>27</span>
              </div>
            </div>
          </div>

          {/* Conseil */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              💡 Que faire maintenant ?
            </h4>
            <p className="text-blue-800 text-sm leading-relaxed">
              {resultat.conseil}
            </p>
          </div>

          {/* Tableau des seuils */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h4 className="text-lg font-bold text-slate-800 mb-4">
              Interpretation des scores PHQ-9
            </h4>
            <div className="space-y-2">
              {SEUILS_PHQ9.map((s) => {
                const actif = resultat.niveau === s.niveau;
                return (
                  <div
                    key={s.niveau}
                    className={`p-3 rounded-lg border ${
                      actif
                        ? "bg-rose-50 border-rose-300"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span
                        className={`font-semibold ${
                          actif ? "text-rose-900" : "text-slate-700"
                        }`}
                      >
                        {s.label}
                      </span>
                      <span
                        className={`text-sm font-mono ${
                          actif ? "text-rose-700" : "text-slate-500"
                        }`}
                      >
                        Score {s.min} a {s.max}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Source : Kroenke K. et al. (2001). The PHQ-9: Validity of a Brief
              Depression Severity Measure. Journal of General Internal
              Medicine, 16(9), 606-613.
            </p>
          </div>
        </div>
      )}

      {/* Disclaimer permanent */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-900">
        <p>
          <strong>⚠ Important :</strong> Ce test est un outil d&apos;auto-evaluation
          base sur le PHQ-9 valide scientifiquement. Il ne remplace pas
          l&apos;avis d&apos;un professionnel de sante. Si vous vous sentez en
          danger ou en grande detresse, appelez le <strong>3114</strong>
          (prevention suicide) ou le <strong>15</strong> (SAMU).
        </p>
      </div>
    </div>
  );
}
