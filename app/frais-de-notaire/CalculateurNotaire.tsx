"use client";

import { useState } from "react";

type TypeBien = "ancien" | "neuf" | "terrain";

const TYPE_LABELS: Record<TypeBien, string> = {
  ancien: "Ancien",
  neuf: "Neuf (VEFA)",
  terrain: "Terrain",
};

const TYPE_DESC: Record<TypeBien, string> = {
  ancien: "Bien de plus de 5 ans",
  neuf: "Bien neuf ou moins de 5 ans",
  terrain: "Terrain a batir",
};

// Taux droits de mutation (departement + commune + Etat)
const TAUX_DROITS: Record<TypeBien, number> = {
  ancien: 0.05807, // ~5.81% (taux plein majorite departements)
  neuf: 0.0071, // ~0.71% (taxe publicite fonciere)
  terrain: 0.05807,
};

// Bareme emoluments notaire 2026 (proportionnels, par tranches)
const TRANCHES_EMOLUMENTS = [
  { limite: 6500, taux: 0.03870 },
  { limite: 17000, taux: 0.01596 },
  { limite: 60000, taux: 0.01064 },
  { limite: Infinity, taux: 0.00799 },
];

function calculerEmoluments(prix: number): number {
  let emoluments = 0;
  let reste = prix;
  let seuilBas = 0;

  for (const tranche of TRANCHES_EMOLUMENTS) {
    const montantTranche = Math.min(reste, tranche.limite - seuilBas);
    if (montantTranche <= 0) break;
    emoluments += montantTranche * tranche.taux;
    reste -= montantTranche;
    seuilBas = tranche.limite;
  }

  return emoluments;
}

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export default function CalculateurNotaire() {
  const [prix, setPrix] = useState("250000");
  const [type, setType] = useState<TypeBien>("ancien");

  const prixNum = parseFloat(prix) || 0;

  // Calculs
  const droitsMutation = prixNum * TAUX_DROITS[type];
  const emoluments = calculerEmoluments(prixNum);
  const emolumentsTVA = emoluments * 0.2; // TVA 20% sur emoluments
  const debours = Math.min(1500, prixNum * 0.001) + 400; // estimation forfaitaire
  const contributionSecu = prixNum >= 10000 ? 15 : 0; // contribution securite immobiliere

  const totalFrais =
    droitsMutation + emoluments + emolumentsTVA + debours + contributionSecu;
  const pourcentageFrais = prixNum > 0 ? (totalFrais / prixNum) * 100 : 0;
  const prixTotal = prixNum + totalFrais;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Prix */}
        <div className="mb-6">
          <label
            htmlFor="prix-bien"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Prix du bien
          </label>
          <div className="relative">
            <input
              id="prix-bien"
              type="number"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-14 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              min="0"
              step="10000"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {[150000, 200000, 250000, 350000, 500000].map((p) => (
              <button
                key={p}
                onClick={() => setPrix(p.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  prix === p.toString()
                    ? "bg-cyan-50 border-cyan-300 text-cyan-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {fmtInt(p)} EUR
              </button>
            ))}
          </div>
        </div>

        {/* Type de bien */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Type de bien
          </label>
          <div className="space-y-2">
            {(Object.keys(TYPE_LABELS) as TypeBien[]).map((t) => (
              <label
                key={t}
                className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  type === t
                    ? "border-cyan-500 bg-cyan-50/50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      type === t ? "border-cyan-500" : "border-slate-300"
                    }`}
                  >
                    {type === t && (
                      <div className="w-2 h-2 rounded-full bg-cyan-500" />
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700">
                      {TYPE_LABELS[t]}
                    </span>
                    <span className="text-xs text-slate-400 ml-2">
                      {TYPE_DESC[t]}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-500">
                  ~{t === "neuf" ? "2-3" : "7-8"}%
                </span>
                <input
                  type="radio"
                  name="type-bien"
                  value={t}
                  checked={type === t}
                  onChange={() => setType(t)}
                  className="sr-only"
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg shadow-cyan-200/50">
          <p className="text-sm text-cyan-100 mb-1">Frais de notaire estimes</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(totalFrais)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
          <div className="h-px bg-white/20 my-4" />
          <div className="flex justify-between text-sm">
            <span className="text-cyan-200">
              Soit {fmt(pourcentageFrais)}% du prix
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Cout total de l&apos;achat</p>
          <p className="text-2xl font-extrabold text-slate-800">
            {fmt(prixTotal)}{" "}
            <span className="text-sm font-semibold text-slate-400">EUR</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Prix du bien + frais de notaire
          </p>
        </div>

        {/* Detail */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-600 mb-4">
            Detail des frais
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Droits de mutation</span>
              <span className="text-sm font-bold text-slate-800">
                {fmt(droitsMutation)} EUR
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">
                Emoluments du notaire
              </span>
              <span className="text-sm font-bold text-slate-800">
                {fmt(emoluments)} EUR
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">
                TVA sur emoluments
              </span>
              <span className="text-sm font-bold text-slate-800">
                {fmt(emolumentsTVA)} EUR
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">
                Debours et formalites
              </span>
              <span className="text-sm font-bold text-slate-800">
                {fmt(debours)} EUR
              </span>
            </div>
            {contributionSecu > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">
                  Contribution securite immo.
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {fmt(contributionSecu)} EUR
                </span>
              </div>
            )}
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-600">
                Total frais
              </span>
              <span className="text-base font-extrabold text-cyan-600">
                {fmt(totalFrais)} EUR
              </span>
            </div>
          </div>
        </div>

        {/* Barre visuelle */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Repartition du cout total
          </p>
          <div className="flex h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
              style={{
                width: `${prixTotal > 0 ? (prixNum / prixTotal) * 100 : 100}%`,
              }}
            />
            <div
              className="bg-amber-300 transition-all duration-500"
              style={{
                width: `${pourcentageFrais > 0 ? (totalFrais / prixTotal) * 100 : 0}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs mt-2">
            <span className="text-cyan-600 font-medium">Prix du bien</span>
            <span className="text-amber-500 font-medium">
              Frais ({fmt(pourcentageFrais)}%)
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Estimation indicative basee sur les taux moyens 2026. Les frais reels
          peuvent varier selon le departement et la situation. Consultez votre
          notaire pour un calcul exact.
        </div>
      </div>
    </div>
  );
}
