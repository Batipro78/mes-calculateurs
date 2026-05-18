"use client";

import { useState } from "react";
import {
  calculerAllocationsBE,
  RegionBE,
} from "./allocationsFamilialesBeCalc";

function fmt(montant: number): string {
  return montant.toLocaleString("fr-BE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function CalculateurAllocationsBE() {
  const [region, setRegion] = useState<RegionBE>("wallonie");
  const [nbEnfants, setNbEnfants] = useState<number>(2);
  const [ageEnfants, setAgeEnfants] = useState<number[]>([5, 10]);

  const resultat = calculerAllocationsBE(region, ageEnfants);

  const handleNbEnfantsChange = (n: number) => {
    setNbEnfants(n);
    const newAges = Array.from({ length: n }, (_, i) => ageEnfants[i] || 8);
    setAgeEnfants(newAges);
  };

  const handleAgeChange = (index: number, age: number) => {
    const newAges = [...ageEnfants];
    newAges[index] = age;
    setAgeEnfants(newAges);
  };

  const regionLabels: Record<RegionBE, string> = {
    wallonie: "Wallonie",
    flandre: "Flandre",
    bruxelles: "Bruxelles",
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Region Belgique
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["wallonie", "flandre", "bruxelles"] as RegionBE[]).map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  region === r
                    ? "border-cyan-500 bg-cyan-50/50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-sm font-bold text-slate-800">
                  {regionLabels[r]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="nb-enfants" className="block text-sm font-medium text-slate-600 mb-3">
            Nombre d&apos;enfants : <span className="font-bold text-slate-800">{nbEnfants}</span>
          </label>
          <input
            id="nb-enfants"
            type="range"
            min="1"
            max="6"
            value={nbEnfants}
            onChange={(e) => handleNbEnfantsChange(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>1</span>
            <span>6</span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-3">
            Age de chaque enfant
          </label>
          <div className="space-y-3">
            {ageEnfants.map((age, index) => (
              <div key={index}>
                <label
                  htmlFor={`age-enfant-${index}`}
                  className="block text-xs font-medium text-slate-500 mb-1"
                >
                  Enfant {index + 1} : <span className="font-bold text-slate-700">{age} ans</span>
                </label>
                <input
                  id={`age-enfant-${index}`}
                  type="range"
                  min="0"
                  max="17"
                  value={age}
                  onChange={(e) =>
                    handleAgeChange(index, parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg shadow-cyan-200/50">
          <p className="text-sm text-cyan-100 mb-1">Allocation mensuelle</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(resultat.montantMensuel)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Region</span>
              <span className="text-sm font-bold text-slate-800">
                {regionLabels[region]}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Nombre d&apos;enfants</span>
              <span className="text-sm font-bold text-slate-800">
                {nbEnfants}
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">
                Total mensuel
              </span>
              <span className="text-lg font-extrabold text-cyan-600">
                {fmt(resultat.montantMensuel)} EUR
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">
                Total annuel
              </span>
              <span className="text-lg font-extrabold text-cyan-600">
                {fmt(resultat.montantAnnuel)} EUR
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Prime de naissance
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Par enfant</span>
              <span className="font-bold text-slate-800">
                {fmt(resultat.primeNaissance)} EUR
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between">
              <span className="font-semibold text-slate-700">Total ({nbEnfants} enfants)</span>
              <span className="text-lg font-extrabold text-blue-600">
                {fmt(resultat.primeNaissanceTotal)} EUR
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl border border-blue-200 px-4 py-3 text-xs text-blue-700 leading-relaxed">
          Allocations familiales 2026 - sources officielles (MyFamily, FAMIWAL, Famiris, Groeipakket).
        </div>
      </div>
    </div>
  );
}
