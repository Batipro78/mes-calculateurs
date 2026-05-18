"use client";

import { useState } from "react";
import {
  calculerPensionAlimentaireBE,
  COEFFICIENTS_RENARD,
} from "./pensionAlimentaireBeCalc";

function fmt(montant: number): string {
  return montant.toLocaleString("fr-BE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function CalculateurPensionAlimentaireBE() {
  const [revenusP1, setRevenusP1] = useState<string>("3000");
  const [revenusP2, setRevenusP2] = useState<string>("2000");
  const [age, setAge] = useState<string>("10");
  const [nbEnfants, setNbEnfants] = useState<string>("1");
  const [gardeChezP1, setGardeChezP1] = useState<boolean>(true);

  const r1 = parseFloat(revenusP1) || 0;
  const r2 = parseFloat(revenusP2) || 0;
  const ageNum = parseInt(age) || 0;
  const nbE = parseInt(nbEnfants) || 1;

  const resultat = calculerPensionAlimentaireBE(
    r1,
    r2,
    ageNum,
    nbE,
    gardeChezP1
  );

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Revenus P1 */}
        <div className="mb-6">
          <label
            htmlFor="revenus-p1"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Revenus Parent 1 (mensuel/annuel)
          </label>
          <div className="relative">
            <input
              id="revenus-p1"
              type="number"
              value={revenusP1}
              onChange={(e) => setRevenusP1(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-shadow"
              min="0"
              step="100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
        </div>

        {/* Revenus P2 */}
        <div className="mb-6">
          <label
            htmlFor="revenus-p2"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Revenus Parent 2 (mensuel/annuel)
          </label>
          <div className="relative">
            <input
              id="revenus-p2"
              type="number"
              value={revenusP2}
              onChange={(e) => setRevenusP2(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-shadow"
              min="0"
              step="100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
        </div>

        {/* Âge enfant */}
        <div className="mb-6">
          <label
            htmlFor="age-enfant"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Âge de l'enfant
          </label>
          <input
            id="age-enfant"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-shadow"
            min="0"
            max="25"
            step="1"
          />
        </div>

        {/* Nombre enfants */}
        <div className="mb-6">
          <label
            htmlFor="nb-enfants"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Nombre d'enfants à charge
          </label>
          <input
            id="nb-enfants"
            type="number"
            value={nbEnfants}
            onChange={(e) => setNbEnfants(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-shadow"
            min="1"
            max="10"
            step="1"
          />
        </div>

        {/* Garde principale */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-3">
            Qui a la garde principale ?
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setGardeChezP1(true)}
              className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                gardeChezP1
                  ? "border-pink-500 bg-pink-50 text-pink-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              Parent 1
            </button>
            <button
              onClick={() => setGardeChezP1(false)}
              className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                !gardeChezP1
                  ? "border-pink-500 bg-pink-50 text-pink-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              Parent 2
            </button>
          </div>
        </div>
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {/* Pension à verser */}
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl p-6 shadow-lg shadow-pink-200/50">
          <p className="text-sm text-pink-100 mb-1">Pension mensuelle</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(resultat.pensionAVerser)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
        </div>

        {/* Détails */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Coût total enfant</span>
              <span className="text-lg font-bold text-slate-800">
                {fmt(resultat.coutEnfantTotal)} EUR
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Part Parent 1</span>
              <span className="text-lg font-bold text-slate-800">
                {fmt(resultat.partP1)} EUR
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Part Parent 2</span>
              <span className="text-lg font-bold text-slate-800">
                {fmt(resultat.partP2)} EUR
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">
                Plafond 1/3
              </span>
              <span className="text-lg font-bold text-pink-600">
                {fmt(resultat.plafondTiers)} EUR
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">
                Déduction fiscale (80%)
              </span>
              <span className="text-lg font-bold text-emerald-600">
                {fmt(resultat.deductionFiscale)} EUR
              </span>
            </div>
          </div>
        </div>

        {/* Coefficient Renard */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
          <p className="text-xs font-medium text-slate-400 mb-2">
            Coefficient Renard (âge {ageNum} ans)
          </p>
          <p className="text-2xl font-bold text-slate-800">
            {resultat.coefficientRenard.toFixed(4)}
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 border border-blue-200 px-4 py-3 text-xs text-blue-700 leading-relaxed">
          <strong>Note :</strong> Calcul simplifié. Consulter un avocat pour un
          cas réel. Méthode Renard officielle Belgique 2026.
        </div>
      </div>
    </div>
  );
}
