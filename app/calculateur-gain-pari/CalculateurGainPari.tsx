"use client";

import { useState } from "react";
import {
  calculerGain,
  type ResultatGain,
} from "./gainPariCalc";

function fmt(montant: number): string {
  return montant.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtProba(proba: number): string {
  return proba.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function CalculateurGainPari() {
  const [mise, setMise] = useState<string>("10");
  const [cote, setCote] = useState<string>("2.50");

  const miseNum = parseFloat(mise) || 0;
  const coteNum = parseFloat(cote) || 0;

  const resultat: ResultatGain | null =
    miseNum > 0 && coteNum > 0 ? calculerGain(miseNum, coteNum) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label
            htmlFor="mise-pari"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Mise (EUR)
          </label>
          <div className="relative">
            <input
              id="mise-pari"
              type="number"
              value={mise}
              onChange={(e) => setMise(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-slate-700 transition-shadow"
              min="0"
              step="1"
              placeholder="10"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="cote-pari"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Cote décimale
          </label>
          <div className="relative">
            <input
              id="cote-pari"
              type="number"
              value={cote}
              onChange={(e) => setCote(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-slate-700 transition-shadow"
              min="0.01"
              step="0.01"
              placeholder="2.50"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              x
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-500 leading-relaxed">
          La cote décimale est le format européen. Exemple : 3.50 signifie que pour chaque euro mis, vous recevez 3.50 EUR si vous gagnez.
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {resultat && (
          <>
            <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white rounded-2xl p-6 shadow-lg shadow-slate-900/20">
              <p className="text-sm text-slate-300 mb-1">Gain total (si gagnant)</p>
              <p className="text-4xl font-extrabold tracking-tight">
                {fmt(resultat.gainTotal)}{" "}
                <span className="text-lg font-semibold">EUR</span>
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Mise</span>
                  <span className="text-lg font-bold text-slate-800">
                    {fmt(resultat.mise)} EUR
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Bénéfice net</span>
                  <span className="text-lg font-bold text-slate-700">
                    {fmt(resultat.beneficeNet)} EUR
                  </span>
                </div>
                <div className="h-px bg-slate-100" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">
                    Gain total
                  </span>
                  <span className="text-lg font-extrabold text-slate-800">
                    {fmt(resultat.gainTotal)} EUR
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <p className="text-xs font-medium text-slate-400 mb-4">Formats alternatifsde cote</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Fractionnelle</span>
                  <span className="font-bold text-slate-800">
                    {resultat.coteFractionnelle}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Américaine</span>
                  <span className="font-bold text-slate-800">
                    {resultat.coteAmericaine > 0 ? "+" : ""}
                    {Math.round(resultat.coteAmericaine)}
                  </span>
                </div>
                <div className="h-px bg-slate-100" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">Probabilité implicite</span>
                  <span className="font-extrabold text-slate-800">
                    {fmtProba(resultat.probaImplicite)} %
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {(!resultat || miseNum === 0 || coteNum === 0) && (
          <div className="lg:col-span-2 rounded-2xl bg-slate-50 border border-slate-200 p-6 text-center text-slate-400">
            <p className="text-sm">Entrez une mise et une cote pour voir les résultats.</p>
          </div>
        )}
      </div>
    </div>
  );
}
