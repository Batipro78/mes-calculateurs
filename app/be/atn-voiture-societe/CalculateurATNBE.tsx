"use client";
import { fmtEUR_BE as fmt } from "@/app/lib/fmt";

import { useState } from "react";
import {
  calculerATN,
  TypeCarburant,
  REFERENCES_CO2,
} from "./atnVoitureBeCalc";

const CARBURANTS: Array<{ value: TypeCarburant; label: string; icon: string }> =
  [
    { value: "essence", label: "Essence", icon: "⛽" },
    { value: "diesel", label: "Diesel", icon: "🛢" },
    { value: "electrique", label: "Électrique", icon: "⚡" },
    { value: "lpg", label: "LPG/GNC", icon: "💨" },
  ];

export default function CalculateurATNBE() {
  const [valeurCatalogue, setValeurCatalogue] = useState<string>("35000");
  const [co2, setCo2] = useState<string>("120");
  const [carburant, setCarburant] = useState<TypeCarburant>("essence");
  const [ageVehicule, setAgeVehicule] = useState<number>(2);

  const valeurNum = parseFloat(valeurCatalogue) || 0;
  const co2Num = parseFloat(co2) || 0;

  const resultat = calculerATN(valeurNum, co2Num, carburant, ageVehicule);

  // Estimation impact net (50% précompte)
  const impactNetMensuel = resultat.atnMensuel * 0.5;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label
            htmlFor="valeur-catalog"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Valeur catalogue TTC (EUR)
          </label>
          <div className="relative">
            <input
              id="valeur-catalog"
              type="number"
              value={valeurCatalogue}
              onChange={(e) => setValeurCatalogue(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow"
              min="0"
              step="1000"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Type de carburant
          </label>
          <div className="grid grid-cols-2 gap-2">
            {CARBURANTS.map((c) => (
              <button
                key={c.value}
                onClick={() => setCarburant(c.value)}
                className={`p-3 rounded-xl border-2 transition-all flex items-center gap-2 ${
                  carburant === c.value
                    ? "border-orange-500 bg-orange-50/50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-lg">{c.icon}</span>
                <span
                  className={`text-sm font-semibold ${
                    carburant === c.value
                      ? "text-slate-800"
                      : "text-slate-700"
                  }`}
                >
                  {c.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {carburant !== "electrique" && (
          <div className="mb-6">
            <label
              htmlFor="co2-slider"
              className="block text-sm font-medium text-slate-600 mb-2"
            >
              Émissions CO2 (g/km) — Référence {carburant === "diesel" ? "58" : "70"} g/km
            </label>
            <div className="flex items-center gap-4">
              <input
                id="co2-slider"
                type="range"
                min="0"
                max="300"
                step="10"
                value={co2Num}
                onChange={(e) => setCo2(e.target.value)}
                className="flex-1"
              />
              <span className="text-2xl font-bold text-slate-800 min-w-20 text-right">
                {Math.round(co2Num)}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Consultez votre fiche technique ou SYNERGIE Belgique pour les émissions réelles.
            </p>
          </div>
        )}

        <div className="mb-6">
          <label
            htmlFor="age-slider"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Âge du véhicule : {ageVehicule} ans
          </label>
          <input
            id="age-slider"
            type="range"
            min="0"
            max="6"
            step="1"
            value={ageVehicule}
            onChange={(e) => setAgeVehicule(parseInt(e.target.value, 10))}
            className="w-full"
          />
          <p className="text-xs text-slate-400 mt-2">
            Dégressivité 6 %/an, plancher 70 % (max 6 ans pris en compte).
          </p>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-6 shadow-lg shadow-orange-200/50">
          <p className="text-sm text-orange-100 mb-1">ATN annuel imposable</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(resultat.atnAnnuel)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
          <p className="text-orange-100 text-sm mt-2">
            Minimum légal : {fmt(1690)} EUR
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">ATN mensuel</span>
              <span className="text-lg font-bold text-slate-800">
                {fmt(resultat.atnMensuel)} EUR
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">
                Impact net (≈50 % précompte)
              </span>
              <span className="text-lg font-bold text-orange-600">
                {fmt(impactNetMensuel)} EUR
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">
                % CO2 appliqué
              </span>
              <span className="text-lg font-extrabold text-slate-800">
                {resultat.pctCO2.toFixed(1)} %
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">
                Valeur décotée
              </span>
              <span className="text-lg font-extrabold text-slate-800">
                {fmt(resultat.valeurDecotee)} EUR
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Calcul conforme SPF Finances 2026. ATN intégré au salaire pour précompte professionnel. Valeur applicable immédiatement.
        </div>
      </div>
    </div>
  );
}
