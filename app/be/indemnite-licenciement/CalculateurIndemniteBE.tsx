"use client";
import { fmtIntBE as fmt, fmtEUR_BE as fmt2 } from "@/app/lib/fmt";

import { useState } from "react";
import {
  calculerIndemniteLicenciementBE,
  preavisSemainesBE,
} from "./indemniteLicenciementBeCalc";

export default function CalculateurIndemniteBE() {
  const [brut, setBrut] = useState<string>("3000");
  const [annees, setAnnees] = useState<number>(5);
  const [mois, setMois] = useState<number>(0);

  const brutNum = parseFloat(brut) || 0;
  const ancienneteMois = annees * 12 + mois;
  const res = calculerIndemniteLicenciementBE(brutNum, ancienneteMois);

  // Bareme de comparaison
  const baremeAnnees = [1, 2, 5, 10, 15, 20, 25, 30];

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label
            htmlFor="brut-licenciement"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Salaire brut mensuel
          </label>
          <div className="relative">
            <input
              id="brut-licenciement"
              type="number"
              value={brut}
              onChange={(e) => setBrut(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              min="0"
              step="100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="annees-input"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Anciennete : {annees} an{annees > 1 ? "s" : ""}
            {mois > 0 ? ` et ${mois} mois` : ""}
          </label>
          <input
            id="annees-input"
            type="range"
            min="0"
            max="40"
            value={annees}
            onChange={(e) => setAnnees(parseInt(e.target.value, 10))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0 ans</span>
            <span>20 ans</span>
            <span>40 ans</span>
          </div>
        </div>

        <div>
          <label
            htmlFor="mois-input"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Mois supplementaires : {mois}
          </label>
          <input
            id="mois-input"
            type="range"
            min="0"
            max="11"
            value={mois}
            onChange={(e) => setMois(parseInt(e.target.value, 10))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0</span>
            <span>6</span>
            <span>11</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg shadow-indigo-200/50">
          <p className="text-sm text-indigo-100 mb-1">Indemnite brute</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(res.indemniteBrute)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
          <p className="text-xs text-indigo-100 mt-2">
            Soit {res.preavisSemaines} semaines de remuneration
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Detail du calcul
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Brut mensuel</span>
              <span className="font-semibold text-slate-700">
                {fmt(res.brutMensuel)} EUR
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">x 12 mois x {res.facteurAvantages}</span>
              <span className="font-semibold text-slate-700">
                {fmt(res.brutMensuel * 12 * res.facteurAvantages)} EUR/an
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">/ 52 semaines</span>
              <span className="font-semibold text-slate-700">
                {fmt2(res.remunerationHebdo)} EUR/sem
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">
                x {res.preavisSemaines} sem (preavis)
              </span>
              <span className="font-bold text-indigo-600">
                {fmt(res.indemniteBrute)} EUR
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            Facteur 1,16 inclut pecule de vacances (~15,38 %) et prime de fin
            d&apos;annee.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Bareme officiel preavis (en semaines)
          </p>
          <div className="space-y-1.5 text-xs">
            {baremeAnnees.map((a) => {
              const sem = preavisSemainesBE(a * 12);
              return (
                <div
                  key={a}
                  className={`flex justify-between p-1.5 rounded ${
                    a === annees ? "bg-indigo-50" : ""
                  }`}
                >
                  <span className="text-slate-600">
                    {a} an{a > 1 ? "s" : ""}
                  </span>
                  <span className="font-bold text-slate-800">{sem} sem</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Bareme officiel post-1er janvier 2014 (statut unifie ouvriers /
          employes). Indemnite brute avant precompte professionnel.
        </div>
      </div>
    </div>
  );
}
