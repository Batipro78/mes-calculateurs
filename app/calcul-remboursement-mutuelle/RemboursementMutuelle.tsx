"use client";

import { useState } from "react";
import {
  calcRemboursementMutuelle,
  calcComparatifNiveaux,
  ACTES,
  TYPES_ACTE,
  NIVEAUX,
  NIVEAU_LABELS,
  type TypeActe,
  type NiveauMutuelle,
} from "./mutuelleCalc";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const COUT_DEFAUT: Record<TypeActe, number> = {
  "consultation-generaliste": 30,
  "consultation-specialiste": 50,
  hospitalisation: 2000,
  "dentaire-couronne": 500,
  "dentaire-implant": 1800,
  "optique-verres": 200,
  "optique-monture": 150,
  pharmacie: 30,
  kine: 25,
  "radio-irm": 250,
};

const COUT_MAX: Record<TypeActe, number> = {
  "consultation-generaliste": 100,
  "consultation-specialiste": 200,
  hospitalisation: 10000,
  "dentaire-couronne": 1500,
  "dentaire-implant": 4000,
  "optique-verres": 800,
  "optique-monture": 500,
  pharmacie: 200,
  kine: 80,
  "radio-irm": 1000,
};

export default function RemboursementMutuelle() {
  const [typeActe, setTypeActe] = useState<TypeActe>("consultation-generaliste");
  const [coutReel, setCoutReel] = useState(30);
  const [niveau, setNiveau] = useState<NiveauMutuelle>("intermediaire");

  const resultat = calcRemboursementMutuelle(typeActe, coutReel, niveau);
  const comparatif = calcComparatifNiveaux(typeActe, coutReel);

  const handleTypeChange = (type: TypeActe) => {
    setTypeActe(type);
    setCoutReel(COUT_DEFAUT[type]);
  };

  // Barre empilee : proportions
  const pctSS = coutReel > 0 ? (resultat.remboursementSS / coutReel) * 100 : 0;
  const pctMut = coutReel > 0 ? (resultat.remboursementMutuelle / coutReel) * 100 : 0;
  const pctRAC = coutReel > 0 ? (resultat.resteACharge / coutReel) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Selection type d'acte */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Type de soin</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {TYPES_ACTE.map((type) => {
            const acte = ACTES[type];
            const isActive = typeActe === type;
            return (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={
                  isActive
                    ? "flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 border-cyan-500 bg-cyan-50 text-cyan-700 transition-all"
                    : "flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-cyan-300 hover:bg-cyan-50/50 transition-all"
                }
              >
                <span className="text-2xl">{acte.icon}</span>
                <span className="text-xs font-medium text-center leading-tight">{acte.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cout reel + Niveau mutuelle */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Cout reel */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Cout reel de l&apos;acte
            </label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={COUT_MAX[typeActe]}
                step={1}
                value={coutReel}
                onChange={(e) => setCoutReel(Math.max(0, Number(e.target.value)))}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-slate-800 font-semibold"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€</span>
            </div>
            <input
              type="range"
              min={0}
              max={COUT_MAX[typeActe]}
              step={1}
              value={coutReel}
              onChange={(e) => setCoutReel(Number(e.target.value))}
              className="w-full mt-2 accent-cyan-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>0 €</span>
              <span>Base SS : {fmt(ACTES[typeActe].baseSS)} €</span>
              <span>{fmt(COUT_MAX[typeActe])} €</span>
            </div>
          </div>

          {/* Niveau mutuelle */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Niveau de mutuelle
            </label>
            <div className="grid grid-cols-3 gap-2">
              {NIVEAUX.map((n) => {
                const isActive = niveau === n;
                return (
                  <button
                    key={n}
                    onClick={() => setNiveau(n)}
                    className={
                      isActive
                        ? n === "basique"
                          ? "py-3 px-2 rounded-xl border-2 border-cyan-500 bg-cyan-50 text-cyan-700 font-semibold text-sm transition-all"
                          : n === "intermediaire"
                            ? "py-3 px-2 rounded-xl border-2 border-blue-500 bg-blue-50 text-blue-700 font-semibold text-sm transition-all"
                            : "py-3 px-2 rounded-xl border-2 border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold text-sm transition-all"
                        : "py-3 px-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-slate-300 font-medium text-sm transition-all"
                    }
                  >
                    <div className="text-center">
                      <div>{NIVEAU_LABELS[n]}</div>
                      <div className="text-xs opacity-70 mt-0.5">
                        {n === "basique" && "100% BR"}
                        {n === "intermediaire" && "200% BR"}
                        {n === "premium" && "300%+ BR"}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              BR = Base de Remboursement de la Securite Sociale
            </p>
          </div>
        </div>
      </div>

      {/* Resultats */}
      {coutReel > 0 && (
        <>
          {/* Barre empilee */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Repartition du remboursement</h2>

            <div className="mb-6">
              <div className="flex rounded-xl overflow-hidden h-10">
                {pctSS > 0 && (
                  <div
                    className="bg-cyan-500 flex items-center justify-center text-white text-xs font-semibold"
                    style={{ width: `${Math.max(pctSS, 5)}%` }}
                  >
                    {pctSS >= 10 && `${fmt(resultat.remboursementSS)} €`}
                  </div>
                )}
                {pctMut > 0 && (
                  <div
                    className="bg-blue-500 flex items-center justify-center text-white text-xs font-semibold"
                    style={{ width: `${Math.max(pctMut, 5)}%` }}
                  >
                    {pctMut >= 10 && `${fmt(resultat.remboursementMutuelle)} €`}
                  </div>
                )}
                {pctRAC > 0 && (
                  <div
                    className="bg-slate-300 flex items-center justify-center text-slate-700 text-xs font-semibold"
                    style={{ width: `${Math.max(pctRAC, 5)}%` }}
                  >
                    {pctRAC >= 10 && `${fmt(resultat.resteACharge)} €`}
                  </div>
                )}
              </div>
              <div className="flex gap-4 mt-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-cyan-500"></div>
                  <span className="text-slate-600">Securite Sociale</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-blue-500"></div>
                  <span className="text-slate-600">Mutuelle</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-slate-300"></div>
                  <span className="text-slate-600">Reste a charge</span>
                </div>
              </div>
            </div>

            {/* Detail cards */}
            <div className="grid gap-4 sm:grid-cols-4">
              <div className="bg-slate-50 rounded-xl p-4 text-center">
                <p className="text-xs text-slate-500 mb-1">Cout reel</p>
                <p className="text-xl font-bold text-slate-800">{fmt(resultat.coutReel)} €</p>
              </div>
              <div className="bg-cyan-50 rounded-xl p-4 text-center">
                <p className="text-xs text-cyan-600 mb-1">Securite Sociale</p>
                <p className="text-xl font-bold text-cyan-700">{fmt(resultat.remboursementSS)} €</p>
                <p className="text-xs text-cyan-500 mt-1">{resultat.tauxSS}% de {fmt(resultat.baseSS)} €</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-xs text-blue-600 mb-1">Mutuelle</p>
                <p className="text-xl font-bold text-blue-700">{fmt(resultat.remboursementMutuelle)} €</p>
                <p className="text-xs text-blue-500 mt-1">{NIVEAU_LABELS[niveau]}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-center border-2 border-slate-200">
                <p className="text-xs text-slate-500 mb-1">Reste a charge</p>
                <p className={
                  resultat.resteACharge === 0
                    ? "text-xl font-bold text-green-600"
                    : resultat.resteACharge < coutReel * 0.3
                      ? "text-xl font-bold text-orange-600"
                      : "text-xl font-bold text-red-600"
                }>
                  {fmt(resultat.resteACharge)} €
                </p>
                <p className="text-xs text-slate-500 mt-1">{resultat.pourcentageCouvert}% couvert</p>
              </div>
            </div>

            {/* Detail textuel */}
            <div className="mt-4 bg-blue-50/50 rounded-xl p-4">
              <p className="text-sm text-slate-600 leading-relaxed">{resultat.detail}</p>
            </div>
          </div>

          {/* Tableau comparatif par niveau */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Comparatif par niveau de mutuelle
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              Pour un(e) {ACTES[typeActe].label.toLowerCase()} a {fmt(coutReel)} €
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-2 text-slate-500 font-medium">Niveau</th>
                    <th className="text-right py-3 px-2 text-slate-500 font-medium">Secu</th>
                    <th className="text-right py-3 px-2 text-slate-500 font-medium">Mutuelle</th>
                    <th className="text-right py-3 px-2 text-slate-500 font-medium">Reste a charge</th>
                    <th className="text-right py-3 px-2 text-slate-500 font-medium">% couvert</th>
                  </tr>
                </thead>
                <tbody>
                  {comparatif.map((c) => {
                    const isActive = c.niveau === niveau;
                    return (
                      <tr
                        key={c.niveau}
                        className={
                          isActive
                            ? "border-b border-blue-100 bg-blue-50/50"
                            : "border-b border-slate-100"
                        }
                      >
                        <td className="py-3 px-2">
                          <span className={
                            isActive
                              ? "font-semibold text-blue-700"
                              : "text-slate-700"
                          }>
                            {c.label}
                          </span>
                          {isActive && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">actuel</span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-right text-cyan-600 font-medium">{fmt(c.remboursementSS)} €</td>
                        <td className="py-3 px-2 text-right text-blue-600 font-medium">{fmt(c.remboursementMutuelle)} €</td>
                        <td className={
                          c.resteACharge === 0
                            ? "py-3 px-2 text-right font-semibold text-green-600"
                            : "py-3 px-2 text-right font-semibold text-slate-800"
                        }>
                          {fmt(c.resteACharge)} €
                        </td>
                        <td className="py-3 px-2 text-right">
                          <span className={
                            c.pourcentageCouvert >= 100
                              ? "bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold"
                              : c.pourcentageCouvert >= 70
                                ? "bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold"
                                : "bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-semibold"
                          }>
                            {c.pourcentageCouvert}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {comparatif.some((c) => c.resteACharge === 0) && (
              <div className="mt-4 bg-green-50 rounded-xl p-3 flex items-center gap-2">
                <span className="text-green-600 text-lg">✓</span>
                <p className="text-sm text-green-700">
                  {comparatif.filter((c) => c.resteACharge === 0).length === 3
                    ? "Tous les niveaux couvrent integralement cet acte."
                    : `Le(s) niveau(x) ${comparatif.filter((c) => c.resteACharge === 0).map((c) => c.label).join(", ")} couvre(nt) integralement cet acte.`}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
