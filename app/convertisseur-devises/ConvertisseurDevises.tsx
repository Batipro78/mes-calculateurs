"use client";

import { useState } from "react";

interface Devise {
  code: string;
  nom: string;
  symbole: string;
  taux: number; // taux par rapport a 1 EUR
}

const DEVISES: Devise[] = [
  { code: "EUR", nom: "Euro", symbole: "\u20ac", taux: 1 },
  { code: "USD", nom: "Dollar americain", symbole: "$", taux: 1.0856 },
  { code: "GBP", nom: "Livre sterling", symbole: "\u00a3", taux: 0.8612 },
  { code: "CHF", nom: "Franc suisse", symbole: "CHF", taux: 0.9541 },
  { code: "CAD", nom: "Dollar canadien", symbole: "CA$", taux: 1.4732 },
  { code: "JPY", nom: "Yen japonais", symbole: "\u00a5", taux: 162.45 },
  { code: "MAD", nom: "Dirham marocain", symbole: "MAD", taux: 10.75 },
  { code: "TND", nom: "Dinar tunisien", symbole: "TND", taux: 3.38 },
  { code: "DZD", nom: "Dinar algerien", symbole: "DZD", taux: 145.82 },
  { code: "CNY", nom: "Yuan chinois", symbole: "\u00a5", taux: 7.89 },
  { code: "TRY", nom: "Livre turque", symbole: "\u20ba", taux: 38.92 },
  { code: "AED", nom: "Dirham des EAU", symbole: "AED", taux: 3.99 },
  { code: "XOF", nom: "Franc CFA (BCEAO)", symbole: "CFA", taux: 655.957 },
  { code: "XAF", nom: "Franc CFA (BEAC)", symbole: "CFA", taux: 655.957 },
];

function fmt(n: number, decimals = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function ConvertisseurDevises() {
  const [montant, setMontant] = useState("1000");
  const [deviseFrom, setDeviseFrom] = useState("EUR");
  const [deviseTo, setDeviseTo] = useState("USD");

  const from = DEVISES.find((d) => d.code === deviseFrom) || DEVISES[0];
  const to = DEVISES.find((d) => d.code === deviseTo) || DEVISES[1];

  const montantNum = parseFloat(montant) || 0;
  const enEur = montantNum / from.taux;
  const resultat = enEur * to.taux;
  const tauxDirect = to.taux / from.taux;
  const tauxInverse = from.taux / to.taux;

  const inverser = () => {
    setDeviseFrom(deviseTo);
    setDeviseTo(deviseFrom);
  };

  const conversionsRapides = [100, 500, 1000, 5000, 10000];

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="space-y-5">
          {/* Montant */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Montant
            </label>
            <input
              type="number"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              min="0"
              step="1"
            />
          </div>

          {/* Devise source */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              De
            </label>
            <select
              value={deviseFrom}
              onChange={(e) => setDeviseFrom(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            >
              {DEVISES.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.code} - {d.nom}
                </option>
              ))}
            </select>
          </div>

          {/* Bouton inverser */}
          <div className="flex justify-center">
            <button
              onClick={inverser}
              className="p-3 rounded-full border-2 border-slate-200 hover:border-sky-400 hover:bg-sky-50 transition-all"
              title="Inverser les devises"
            >
              <svg
                className="w-5 h-5 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </button>
          </div>

          {/* Devise cible */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Vers
            </label>
            <select
              value={deviseTo}
              onChange={(e) => setDeviseTo(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            >
              {DEVISES.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.code} - {d.nom}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Conversions rapides */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Conversions rapides
          </p>
          <div className="flex flex-wrap gap-2">
            {conversionsRapides.map((val) => (
              <button
                key={val}
                onClick={() => setMontant(String(val))}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  montant === String(val)
                    ? "bg-sky-100 text-sky-700 border border-sky-300"
                    : "bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {val.toLocaleString("fr-FR")} {from.symbole}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg shadow-sky-200/50">
          <p className="text-sm text-sky-100 mb-1">Resultat</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(resultat)}{" "}
            <span className="text-lg font-semibold">{to.symbole}</span>
          </p>
          <p className="text-sm text-sky-200 mt-2">
            {fmt(montantNum)} {from.symbole} = {fmt(resultat)} {to.symbole}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-4">
            Taux de change
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">
                1 {from.code}
              </span>
              <span className="text-lg font-bold text-slate-800">
                {fmt(tauxDirect, 4)} {to.code}
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">
                1 {to.code}
              </span>
              <span className="text-lg font-bold text-slate-800">
                {fmt(tauxInverse, 4)} {from.code}
              </span>
            </div>
          </div>
        </div>

        {/* Tableau multi-devises */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            {fmt(montantNum)} {from.code} dans d&apos;autres devises
          </p>
          <div className="space-y-2">
            {DEVISES.filter((d) => d.code !== deviseFrom)
              .slice(0, 6)
              .map((d) => {
                const conv = enEur * d.taux;
                return (
                  <div
                    key={d.code}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-slate-500">
                      {d.code}
                    </span>
                    <span className="font-semibold text-slate-700">
                      {fmt(conv)} {d.symbole}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-4">
          <p className="text-xs text-amber-700">
            Taux indicatifs mis a jour periodiquement. Pour des transactions
            reelles, consultez votre banque ou un service specialise.
          </p>
        </div>
      </div>
    </div>
  );
}
