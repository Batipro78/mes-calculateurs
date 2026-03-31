"use client";

import { useState } from "react";
import {
  calcSalaireAlternant,
  SMIC_BRUT,
  GRILLE_APPRENTISSAGE,
  GRILLE_PRO,
  LABELS_TRANCHE_APPRENTISSAGE,
  LABELS_TRANCHE_PRO,
  TRANCHES_AGE_APPRENTISSAGE,
  TRANCHES_AGE_PRO,
  type TypeContrat,
  type NiveauQualification,
} from "./calcSalaireAlternant";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

export default function CalculateurSalaireAlternant() {
  const [type, setType] = useState<TypeContrat>("apprentissage");
  const [age, setAge] = useState("20");
  const [annee, setAnnee] = useState("1");
  const [qualification, setQualification] = useState<NiveauQualification>("infra-bac");

  const ageNum = parseInt(age) || 18;
  const anneeNum = parseInt(annee) || 1;

  const r = calcSalaireAlternant(type, ageNum, anneeNum, qualification);

  // Jauge : position par rapport au SMIC
  const pourcentageJauge = Math.min((r.brut / SMIC_BRUT) * 100, 100);

  // Tableau comparatif
  const tranches = type === "apprentissage" ? TRANCHES_AGE_APPRENTISSAGE : TRANCHES_AGE_PRO;
  const labels = type === "apprentissage" ? LABELS_TRANCHE_APPRENTISSAGE : LABELS_TRANCHE_PRO;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Type de contrat */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Type de contrat
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(["apprentissage", "professionnalisation"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                  type === t
                    ? "bg-indigo-50 border-indigo-400 text-indigo-700 shadow-sm"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {t === "apprentissage" ? "Apprentissage" : "Professionnalisation"}
              </button>
            ))}
          </div>
        </div>

        {/* Age */}
        <div className="mb-6">
          <label htmlFor="age" className="block text-sm font-medium text-slate-600 mb-2">
            Votre age
          </label>
          <div className="relative">
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-14 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              min="16"
              max="64"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">ans</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {[16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 30].map((a) => (
              <button
                key={a}
                onClick={() => setAge(a.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  age === a.toString()
                    ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {a === 30 ? "26+" : `${a} ans`}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Tranche : <span className="font-medium text-slate-500">{r.labelTranche}</span>
          </p>
        </div>

        {/* Annee de contrat (apprentissage) */}
        {type === "apprentissage" && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Annee de contrat
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((a) => (
                <button
                  key={a}
                  onClick={() => setAnnee(a.toString())}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                    annee === a.toString()
                      ? "bg-indigo-50 border-indigo-400 text-indigo-700 shadow-sm"
                      : "border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  {a === 1 ? "1ere" : `${a}eme`} annee
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Niveau de qualification (professionnalisation) */}
        {type === "professionnalisation" && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Niveau de qualification
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setQualification("infra-bac")}
                className={`px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                  qualification === "infra-bac"
                    ? "bg-indigo-50 border-indigo-400 text-indigo-700 shadow-sm"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                Inferieur au Bac
              </button>
              <button
                onClick={() => setQualification("bac-plus")}
                className={`px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                  qualification === "bac-plus"
                    ? "bg-indigo-50 border-indigo-400 text-indigo-700 shadow-sm"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                Bac pro ou plus
              </button>
            </div>
          </div>
        )}

        {/* Grille complete */}
        <div className="mt-6 bg-slate-50 rounded-xl p-4">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Grille {type === "apprentissage" ? "apprentissage" : "professionnalisation"} 2026 (% du SMIC)
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 px-2 text-slate-500 font-medium">Age</th>
                  {type === "apprentissage" ? (
                    <>
                      <th className="text-right py-2 px-2 text-slate-500 font-medium">1ere</th>
                      <th className="text-right py-2 px-2 text-slate-500 font-medium">2eme</th>
                      <th className="text-right py-2 px-2 text-slate-500 font-medium">3eme</th>
                    </>
                  ) : (
                    <>
                      <th className="text-right py-2 px-2 text-slate-500 font-medium">&lt; Bac</th>
                      <th className="text-right py-2 px-2 text-slate-500 font-medium">&gt;= Bac</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {tranches.map((t) => {
                  const grille = type === "apprentissage"
                    ? GRILLE_APPRENTISSAGE[t]
                    : GRILLE_PRO[t];
                  const isCurrent = t === r.trancheAge;
                  return (
                    <tr key={t} className={`border-b border-slate-100 ${isCurrent ? "bg-indigo-50/50" : ""}`}>
                      <td className={`py-2 px-2 ${isCurrent ? "font-bold text-indigo-600" : "text-slate-600"}`}>
                        {labels[t]}
                      </td>
                      {grille.map((pct, i) => {
                        const isCurrentCell = isCurrent && (
                          type === "apprentissage" ? i === anneeNum - 1 : i === (qualification === "bac-plus" ? 1 : 0)
                        );
                        return (
                          <td
                            key={i}
                            className={`py-2 px-2 text-right ${
                              isCurrentCell
                                ? "font-extrabold text-indigo-700"
                                : isCurrent
                                ? "font-medium text-indigo-600"
                                : "text-slate-500"
                            }`}
                          >
                            {pct}%
                            {isCurrentCell && <span className="text-xs ml-1">&#9664;</span>}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-2 space-y-4">
        {/* Salaire principal */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80 mb-1">Salaire brut mensuel</p>
          <p className="text-5xl font-extrabold tracking-tight">{fmt(r.brut)}</p>
          <p className="text-lg font-medium mt-1">EUR / mois</p>
          <div className="h-px bg-white/20 my-4" />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white/70">% du SMIC</p>
              <p className="font-semibold">{r.pourcentageSmic}%</p>
            </div>
            <div>
              <p className="text-white/70">Salaire net estime</p>
              <p className="font-semibold">{fmt(r.net)} EUR</p>
            </div>
          </div>
        </div>

        {/* Jauge SMIC */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">Position par rapport au SMIC</p>
          <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${pourcentageJauge}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-400">
            <span>0 EUR</span>
            <span className="font-medium text-indigo-600">{r.pourcentageSmic}% du SMIC</span>
            <span>{fmtInt(SMIC_BRUT)} EUR</span>
          </div>
        </div>

        {/* Detail annuel */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">Detail annuel</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Brut annuel</span>
              <span className="font-bold text-slate-700">{fmtInt(r.brutAnnuel)} EUR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Net annuel estime</span>
              <span className="font-bold text-slate-700">{fmtInt(r.netAnnuel)} EUR</span>
            </div>
            {r.cotisations > 0 && (
              <>
                <div className="h-px bg-slate-100" />
                <div className="flex justify-between">
                  <span className="text-slate-500">Cotisations mensuelles</span>
                  <span className="text-red-500 font-medium">-{fmt(r.cotisations)} EUR</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Info exoneration */}
        <div className={`rounded-2xl border p-5 ${r.cotisations > 0 ? "bg-amber-50 border-amber-200" : "bg-emerald-50 border-emerald-200"}`}>
          {r.cotisations > 0 ? (
            <>
              <p className="text-sm font-bold text-amber-800 mb-1">Cotisations partielles</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                Votre salaire depasse 50% du SMIC ({fmt(SMIC_BRUT * 0.5)} EUR).
                Depuis mars 2025, des cotisations s&apos;appliquent sur la part au-dessus de ce seuil
                (CSG, CRDS, cotisations salariales).
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-bold text-emerald-800 mb-1">Exonere de cotisations</p>
              <p className="text-xs text-emerald-700 leading-relaxed">
                Votre salaire est inferieur ou egal a 50% du SMIC.
                Vous ne payez aucune cotisation salariale : brut = net.
              </p>
            </>
          )}
        </div>

        {/* Tableau comparatif par annee (apprentissage) */}
        {type === "apprentissage" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-xs font-medium text-slate-400 mb-3">Evolution par annee ({r.labelTranche})</p>
            <div className="space-y-2">
              {[1, 2, 3].map((a) => {
                const res = calcSalaireAlternant("apprentissage", ageNum, a);
                const isCurrent = a === anneeNum;
                return (
                  <div
                    key={a}
                    className={`flex justify-between items-center px-3 py-2.5 rounded-lg ${
                      isCurrent ? "bg-indigo-50 border border-indigo-200 font-bold" : ""
                    }`}
                  >
                    <span className={`text-sm ${isCurrent ? "text-indigo-700" : "text-slate-500"}`}>
                      {a === 1 ? "1ere" : `${a}eme`} annee ({res.pourcentageSmic}%)
                    </span>
                    <span className={`text-sm font-bold ${isCurrent ? "text-indigo-700" : "text-slate-600"}`}>
                      {fmt(res.brut)} EUR
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Estimation basee sur le SMIC 2026 ({fmtInt(SMIC_BRUT)} EUR brut/mois) et les baremes officiels.
          Le net est estime — les montants reels peuvent varier selon l&apos;entreprise et la convention collective.
        </div>
      </div>
    </div>
  );
}
