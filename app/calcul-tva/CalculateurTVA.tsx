"use client";

import { useState } from "react";

type Direction = "ht-vers-ttc" | "ttc-vers-ht";

const TAUX_TVA = [
  { valeur: 0.2, label: "20%", desc: "Normal" },
  { valeur: 0.1, label: "10%", desc: "Intermediaire" },
  { valeur: 0.055, label: "5,5%", desc: "Reduit" },
  { valeur: 0.021, label: "2,1%", desc: "Super reduit" },
];

function fmt(montant: number): string {
  return montant.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function CalculateurTVA() {
  const [montant, setMontant] = useState<string>("1000");
  const [tauxIndex, setTauxIndex] = useState<number>(0);
  const [direction, setDirection] = useState<Direction>("ht-vers-ttc");

  const montantNum = parseFloat(montant) || 0;
  const taux = TAUX_TVA[tauxIndex].valeur;

  let ht: number;
  let ttc: number;
  let tva: number;

  if (direction === "ht-vers-ttc") {
    ht = montantNum;
    tva = ht * taux;
    ttc = ht + tva;
  } else {
    ttc = montantNum;
    ht = ttc / (1 + taux);
    tva = ttc - ht;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Direction toggle */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Je connais le montant :
          </label>
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setDirection("ht-vers-ttc")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                direction === "ht-vers-ttc"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              HT → TTC
            </button>
            <button
              onClick={() => setDirection("ttc-vers-ht")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                direction === "ttc-vers-ht"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              TTC → HT
            </button>
          </div>
        </div>

        {/* Montant */}
        <div className="mb-6">
          <label
            htmlFor="montant-tva"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Montant {direction === "ht-vers-ttc" ? "HT" : "TTC"}
          </label>
          <div className="relative">
            <input
              id="montant-tva"
              type="number"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
              min="0"
              step="10"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
        </div>

        {/* Taux TVA */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Taux de TVA
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TAUX_TVA.map((t, i) => (
              <button
                key={t.label}
                onClick={() => setTauxIndex(i)}
                className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                  tauxIndex === i
                    ? "border-emerald-500 bg-emerald-50/50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-lg font-bold text-slate-800">
                  {t.label}
                </span>
                <span className="block text-xs text-slate-400 mt-0.5">
                  {t.desc}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg shadow-emerald-200/50">
          <p className="text-sm text-emerald-100 mb-1">
            Montant {direction === "ht-vers-ttc" ? "TTC" : "HT"}
          </p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(direction === "ht-vers-ttc" ? ttc : ht)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Montant HT</span>
              <span className="text-lg font-bold text-slate-800">
                {fmt(ht)} EUR
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">
                TVA ({TAUX_TVA[tauxIndex].label})
              </span>
              <span className="text-lg font-bold text-emerald-600">
                + {fmt(tva)} EUR
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">
                Montant TTC
              </span>
              <span className="text-lg font-extrabold text-slate-800">
                {fmt(ttc)} EUR
              </span>
            </div>
          </div>
        </div>

        {/* Barre visuelle */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Repartition du montant TTC
          </p>
          <div className="flex h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
              style={{ width: `${(ht / (ttc || 1)) * 100}%` }}
            />
            <div
              className="bg-amber-300 transition-all duration-500"
              style={{ width: `${(tva / (ttc || 1)) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-2">
            <span className="text-emerald-600 font-medium">
              HT ({fmt((ht / (ttc || 1)) * 100)}%)
            </span>
            <span className="text-amber-500 font-medium">
              TVA ({TAUX_TVA[tauxIndex].label})
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Taux de TVA en vigueur en France metropolitaine pour 2026.
        </div>
      </div>
    </div>
  );
}
