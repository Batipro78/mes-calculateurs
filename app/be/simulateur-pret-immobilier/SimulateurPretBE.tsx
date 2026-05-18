"use client";

import { useState } from "react";
import { calculerPretBE, TAUX_MOYENS_BE } from "./pretImmoBeCalc";

const DUREES = [10, 15, 20, 25, 30];

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-BE");
}

function fmt2(n: number): string {
  return n.toLocaleString("fr-BE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function SimulateurPretBE() {
  const [montant, setMontant] = useState<string>("250000");
  const [duree, setDuree] = useState<number>(25);
  const [tauxCustom, setTauxCustom] = useState<string>("");

  const montantNum = parseFloat(montant) || 0;
  const taux = tauxCustom ? parseFloat(tauxCustom) || TAUX_MOYENS_BE[duree] : TAUX_MOYENS_BE[duree];
  const res = calculerPretBE(montantNum, duree, taux);

  // Comparaison durees
  const comparaison = DUREES.map((d) => ({
    duree: d,
    res: calculerPretBE(montantNum, d, TAUX_MOYENS_BE[d]),
  }));

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label
            htmlFor="montant-pret"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Montant emprunte
          </label>
          <div className="relative">
            <input
              id="montant-pret"
              type="number"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-shadow"
              min="0"
              step="5000"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Duree du pret
          </label>
          <div className="grid grid-cols-5 gap-2">
            {DUREES.map((d) => (
              <button
                key={d}
                onClick={() => {
                  setDuree(d);
                  setTauxCustom("");
                }}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  duree === d
                    ? "border-violet-500 bg-violet-50/50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-lg font-bold text-slate-800">{d}</span>
                <span className="text-xs text-slate-400 block">ans</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Taux moyen marche BE 2026 : <strong>{TAUX_MOYENS_BE[duree]} %</strong>
          </p>
        </div>

        <div>
          <label
            htmlFor="taux-custom"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Taux personnalise (optionnel)
          </label>
          <div className="relative">
            <input
              id="taux-custom"
              type="number"
              value={tauxCustom}
              onChange={(e) => setTauxCustom(e.target.value)}
              placeholder={`${TAUX_MOYENS_BE[duree]}`}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 pr-12 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-shadow"
              step="0.05"
              min="0"
              max="10"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              %
            </span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg shadow-violet-200/50">
          <p className="text-sm text-violet-100 mb-1">Mensualite</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt2(res.mensualite)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
          <p className="text-xs text-violet-100 mt-2">
            Sur {duree} ans au taux fixe {taux} %
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Cout total du credit
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Capital</span>
              <span className="font-semibold text-slate-700">
                {fmt(res.montant)} EUR
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Interets totaux</span>
              <span className="font-semibold text-rose-600">
                +{fmt(res.interetsTotal)} EUR
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-100">
              <span className="font-medium text-slate-600">Cout total</span>
              <span className="font-bold text-slate-800">
                {fmt(res.coutTotal)} EUR
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Capital rembourse annee 1</span>
              <span className="font-semibold text-emerald-600">
                {fmt(res.amortissementAnnee1)} EUR
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Mensualite selon la duree
          </p>
          <div className="space-y-2 text-sm">
            {comparaison.map((c) => (
              <div
                key={c.duree}
                className={`flex justify-between p-2 rounded-lg ${
                  c.duree === duree ? "bg-violet-50" : ""
                }`}
              >
                <span className="text-slate-600">
                  {c.duree} ans ({TAUX_MOYENS_BE[c.duree]} %)
                </span>
                <span className="font-bold text-slate-800">
                  {fmt2(c.res.mensualite)} EUR
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Taux indicatifs marche belge mai 2026 (Immotheker, Meilleurtaux.be).
          Estimation hors assurance solde restant du et frais notaire.
        </div>
      </div>
    </div>
  );
}
