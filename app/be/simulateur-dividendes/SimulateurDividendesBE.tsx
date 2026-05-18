"use client";

import { useState } from "react";
import {
  REGIMES_FISCAUX,
  calculerDividendesBE,
  type ResultatDividendes,
} from "./dividendesBeCalc";

function fmt(montant: number): string {
  return montant.toLocaleString("fr-BE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function SimulateurDividendesBE() {
  const [dividendeBrut, setDividendeBrut] = useState<string>("5000");
  const [regimeSlug, setRegimeSlug] = useState<string>("standard-30");
  const [isPersonnePhysique, setIsPersonnePhysique] = useState<boolean>(false);

  const dividendeBrutNum = parseFloat(dividendeBrut) || 0;

  let resultat: ResultatDividendes | null = null;
  if (dividendeBrutNum > 0) {
    resultat = calculerDividendesBE(
      dividendeBrutNum,
      regimeSlug,
      isPersonnePhysique
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label
            htmlFor="dividende-brut-be"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Dividende brut
          </label>
          <div className="relative">
            <input
              id="dividende-brut-be"
              type="number"
              value={dividendeBrut}
              onChange={(e) => setDividendeBrut(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow"
              min="0"
              step="100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-3">
            Régime fiscal belge
          </label>
          <div className="space-y-2">
            {REGIMES_FISCAUX.map((regime) => (
              <button
                key={regime.slug}
                onClick={() => setRegimeSlug(regime.slug)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  regimeSlug === regime.slug
                    ? "border-green-500 bg-green-50/50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-lg font-bold text-slate-800">
                  {regime.label}
                </span>
                <span className="block text-xs text-slate-400 mt-1">
                  {regime.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <input
            id="personne-physique"
            type="checkbox"
            checked={isPersonnePhysique}
            onChange={(e) => setIsPersonnePhysique(e.target.checked)}
            className="w-5 h-5 rounded border-slate-300 text-green-500 focus:ring-green-500"
          />
          <label htmlFor="personne-physique" className="text-sm text-slate-700">
            Je suis <strong>personne physique</strong> (exonération 833 EUR/an)
          </label>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {resultat && (
          <>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-lg shadow-green-200/50">
              <p className="text-sm text-green-100 mb-1">Dividende net</p>
              <p className="text-4xl font-extrabold tracking-tight">
                {fmt(resultat.dividendeNet)}{" "}
                <span className="text-lg font-semibold">EUR</span>
              </p>
              <p className="text-green-100 mt-2 text-xs">
                Après précompte {(resultat.regime.taux * 100).toFixed(1)}%
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Dividende brut</span>
                  <span className="text-lg font-bold text-slate-800">
                    {fmt(resultat.dividendeBrut)} EUR
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">
                    Précompte ({(resultat.regime.taux * 100).toFixed(1)}%)
                  </span>
                  <span className="text-lg font-bold text-red-600">
                    - {fmt(resultat.precompte)} EUR
                  </span>
                </div>
                {resultat.exonerationAppliquee > 0 && (
                  <div className="flex justify-between items-center text-green-600 text-sm">
                    <span>Exonération appliquée</span>
                    <span className="font-medium">
                      + {fmt(resultat.exonerationAppliquee)} EUR
                    </span>
                  </div>
                )}
                <div className="h-px bg-slate-100" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">
                    Dividende net
                  </span>
                  <span className="text-lg font-extrabold text-slate-800">
                    {fmt(resultat.dividendeNet)} EUR
                  </span>
                </div>
              </div>
            </div>

            {isPersonnePhysique && (
              <div className="bg-blue-50 rounded-2xl border border-blue-200 p-5 shadow-sm">
                <p className="text-xs font-medium text-blue-600 mb-2 uppercase">
                  ℹ️ Récupération possible
                </p>
                <p className="text-sm text-blue-900 leading-relaxed">
                  En tant que personne physique, vous pourrez récupérer jusqu'à{" "}
                  <strong>{fmt(resultat.recuperablePersPhysique)} EUR</strong> de
                  précompte via votre déclaration d'impôt (déduction ou
                  remboursement selon votre situation).
                </p>
              </div>
            )}

            <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
              Précompte mobilier selon baremes SPF Finances 2026 (Belgique).
            </div>
          </>
        )}
      </div>
    </div>
  );
}
