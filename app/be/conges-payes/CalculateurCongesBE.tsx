"use client";
import { fmtEUR_BE as fmt } from "@/app/lib/fmt";

import { useState } from "react";
import { calculerConges, type StatutTravailleur } from "./congesPayesBeCalc";

export default function CalculateurCongesBE() {
  const [brut, setBrut] = useState<string>("2500");
  const [statut, setStatut] = useState<StatutTravailleur>("employe");
  const [mois, setMois] = useState<number>(12);

  const brutNum = parseFloat(brut) || 0;
  const result = calculerConges(brutNum, statut, mois);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label htmlFor="brut-mensuel" className="block text-sm font-medium text-slate-600 mb-2">
            Salaire brut mensuel
          </label>
          <div className="relative">
            <input
              id="brut-mensuel"
              type="number"
              value={brut}
              onChange={(e) => setBrut(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-shadow"
              min="0"
              step="100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Statut professionnel
          </label>
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setStatut("employe")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                statut === "employe"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Employé
            </button>
            <button
              onClick={() => setStatut("ouvrier")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                statut === "ouvrier"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Ouvrier
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="mois-slider" className="block text-sm font-medium text-slate-600 mb-3">
            Mois travaillés cette année : <span className="font-bold text-yellow-600">{mois}</span> mois
          </label>
          <input
            id="mois-slider"
            type="range"
            min="1"
            max="12"
            step="1"
            value={mois}
            onChange={(e) => setMois(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1 px-1">
            <span>1 mois</span>
            <span>12 mois</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-yellow-400 to-amber-500 text-white rounded-2xl p-6 shadow-lg shadow-yellow-200/50">
          <p className="text-sm text-yellow-100 mb-1">Pécule brut total</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(result.totalPecule)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="space-y-4">
            {statut === "employe" ? (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Simple pécule (salaire normal)</span>
                  <span className="text-lg font-bold text-slate-800">
                    {fmt(result.simplePecule)} EUR
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Double pécule (92% × {mois}/12)</span>
                  <span className="text-lg font-bold text-yellow-600">
                    {fmt(result.doublePecule)} EUR
                  </span>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Pécule ouvrier (15,38% × 108%)</span>
                <span className="text-lg font-bold text-yellow-600">
                  {fmt(result.peculeOuvrier)} EUR
                </span>
              </div>
            )}
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Pécule net (après précompte ~17%)</span>
              <span className="text-lg font-extrabold text-slate-800">
                {fmt(result.peculeNet)} EUR
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-700 leading-relaxed">
          <p className="font-medium mb-1">Congés annuels temps plein :</p>
          <p>{result.joursConges} jours (4 semaines)</p>
        </div>
      </div>
    </div>
  );
}
