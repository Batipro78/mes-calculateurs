"use client";

import { useState } from "react";

type Direction = "htva-vers-tvac" | "tvac-vers-htva";

const TAUX_TVA_BE = [
  { valeur: 0.21, label: "21 %", desc: "Normal" },
  { valeur: 0.12, label: "12 %", desc: "Intermediaire" },
  { valeur: 0.06, label: "6 %", desc: "Reduit" },
  { valeur: 0, label: "0 %", desc: "Exonere" },
];

function fmt(montant: number): string {
  return montant.toLocaleString("fr-BE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function CalculateurTVABE() {
  const [montant, setMontant] = useState<string>("1000");
  const [tauxIndex, setTauxIndex] = useState<number>(0);
  const [direction, setDirection] = useState<Direction>("htva-vers-tvac");

  const montantNum = parseFloat(montant) || 0;
  const taux = TAUX_TVA_BE[tauxIndex].valeur;

  let htva: number;
  let tvac: number;
  let tva: number;

  if (direction === "htva-vers-tvac") {
    htva = montantNum;
    tva = htva * taux;
    tvac = htva + tva;
  } else {
    tvac = montantNum;
    htva = tvac / (1 + taux);
    tva = tvac - htva;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Je connais le montant :
          </label>
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setDirection("htva-vers-tvac")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                direction === "htva-vers-tvac"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              HTVA → TVAC
            </button>
            <button
              onClick={() => setDirection("tvac-vers-htva")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                direction === "tvac-vers-htva"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              TVAC → HTVA
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="montant-tva-be"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Montant {direction === "htva-vers-tvac" ? "HTVA" : "TVAC"}
          </label>
          <div className="relative">
            <input
              id="montant-tva-be"
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

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Taux de TVA belge
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TAUX_TVA_BE.map((t, i) => (
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

      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg shadow-emerald-200/50">
          <p className="text-sm text-emerald-100 mb-1">
            Montant {direction === "htva-vers-tvac" ? "TVAC" : "HTVA"}
          </p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(direction === "htva-vers-tvac" ? tvac : htva)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Montant HTVA</span>
              <span className="text-lg font-bold text-slate-800">
                {fmt(htva)} EUR
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">
                TVA ({TAUX_TVA_BE[tauxIndex].label})
              </span>
              <span className="text-lg font-bold text-emerald-600">
                + {fmt(tva)} EUR
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">
                Montant TVAC
              </span>
              <span className="text-lg font-extrabold text-slate-800">
                {fmt(tvac)} EUR
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Repartition du montant TVAC
          </p>
          <div className="flex h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
              style={{ width: `${(htva / (tvac || 1)) * 100}%` }}
            />
            <div
              className="bg-amber-300 transition-all duration-500"
              style={{ width: `${(tva / (tvac || 1)) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-2">
            <span className="text-emerald-600 font-medium">
              HTVA ({fmt((htva / (tvac || 1)) * 100)} %)
            </span>
            <span className="text-amber-500 font-medium">
              TVA ({TAUX_TVA_BE[tauxIndex].label})
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Taux de TVA en vigueur en Belgique pour 2026 (SPF Finances).
        </div>
      </div>
    </div>
  );
}
