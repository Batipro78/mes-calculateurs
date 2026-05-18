"use client";

import { useState } from "react";
import {
  coteDecimaleVersToutFormat,
  coteFractionVerstoFormat,
  coteAmericaineVersToutFormat,
  probaVersCote,
  calculerMargeBookmaker,
  ResultatConversion,
} from "./coteProbaCalc";

type ModeEntree = "cote" | "proba";
type FormatCote = "decimal" | "fraction" | "americaine";

function fmt(n: number, digits = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function ConvertisseurCoteProba() {
  const [modeEntree, setModeEntree] = useState<ModeEntree>("cote");
  const [formatCote, setFormatCote] = useState<FormatCote>("decimal");
  const [valeurCote, setValeurCote] = useState<string>("2.00");
  const [valeurProba, setValeurProba] = useState<string>("50");
  const [marge1, setMarge1] = useState<string>("2.00");
  const [marge2, setMarge2] = useState<string>("2.00");
  const [marge3, setMarge3] = useState<string>("");

  let resultat: ResultatConversion | null = null;

  if (modeEntree === "cote") {
    const val = parseFloat(valeurCote) || 0;
    if (formatCote === "decimal" && val > 0) {
      resultat = coteDecimaleVersToutFormat(val);
    } else if (formatCote === "fraction" && valeurCote) {
      resultat = coteFractionVerstoFormat(valeurCote);
    } else if (formatCote === "americaine") {
      resultat = coteAmericaineVersToutFormat(val);
    }
  } else {
    const val = parseFloat(valeurProba) || 0;
    if (val > 0 && val <= 100) {
      resultat = probaVersCote(val);
    }
  }

  // Calcul marge bookmaker
  const cotes = [parseFloat(marge1) || 0, parseFloat(marge2) || 0].filter(
    (c) => c > 0
  );
  if (marge3) {
    cotes.push(parseFloat(marge3) || 0);
  }
  const margeBookmaker =
    cotes.length >= 2 ? calculerMargeBookmaker(cotes) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Mode entree toggle */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Je connais :
          </label>
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setModeEntree("cote")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                modeEntree === "cote"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              La cote
            </button>
            <button
              onClick={() => setModeEntree("proba")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                modeEntree === "proba"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              La probabilite
            </button>
          </div>
        </div>

        {/* Cote section */}
        {modeEntree === "cote" && (
          <div className="space-y-6">
            {/* Format selecteur */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Format de cote
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setFormatCote("decimal")}
                  className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                    formatCote === "decimal"
                      ? "border-teal-500 bg-teal-50/50"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xs font-bold text-slate-600">
                    Decimale
                  </span>
                  <span className="block text-sm text-slate-400 mt-0.5">
                    1.50, 2.00
                  </span>
                </button>
                <button
                  onClick={() => setFormatCote("fraction")}
                  className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                    formatCote === "fraction"
                      ? "border-teal-500 bg-teal-50/50"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xs font-bold text-slate-600">
                    Fractionnelle
                  </span>
                  <span className="block text-sm text-slate-400 mt-0.5">
                    5/2, 3/1
                  </span>
                </button>
                <button
                  onClick={() => setFormatCote("americaine")}
                  className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                    formatCote === "americaine"
                      ? "border-teal-500 bg-teal-50/50"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xs font-bold text-slate-600">
                    Americaine
                  </span>
                  <span className="block text-sm text-slate-400 mt-0.5">
                    +250, -150
                  </span>
                </button>
              </div>
            </div>

            {/* Input cote */}
            <div>
              <label htmlFor="cote-input" className="block text-sm font-medium text-slate-600 mb-2">
                Cote {formatCote === "decimal" ? "decimalee" : formatCote === "fraction" ? "fractionelle" : "americaine"}
              </label>
              <div className="relative">
                <input
                  id="cote-input"
                  type={formatCote === "americaine" ? "number" : "text"}
                  value={valeurCote}
                  onChange={(e) => setValeurCote(e.target.value)}
                  placeholder={
                    formatCote === "decimal"
                      ? "ex: 2.50"
                      : formatCote === "fraction"
                        ? "ex: 5/2"
                        : "ex: +250"
                  }
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
                />
              </div>
            </div>
          </div>
        )}

        {/* Proba section */}
        {modeEntree === "proba" && (
          <div>
            <label htmlFor="proba-input" className="block text-sm font-medium text-slate-600 mb-2">
              Probabilite (en %)
            </label>
            <div className="relative">
              <input
                id="proba-input"
                type="number"
                value={valeurProba}
                onChange={(e) => setValeurProba(e.target.value)}
                placeholder="ex: 50"
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
                min="0"
                max="100"
                step="0.01"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                %
              </span>
            </div>
          </div>
        )}

        {/* Section marge bookmaker */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <label className="block text-sm font-medium text-slate-600 mb-4">
            Calculer la marge bookmaker
          </label>
          <p className="text-xs text-slate-400 mb-4">
            Entrez 2 ou 3 cotes opposees pour calculer la marge du bookmaker.
          </p>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="marge1" className="block text-xs text-slate-500 mb-1">
                Cote 1
              </label>
              <input
                id="marge1"
                type="number"
                value={marge1}
                onChange={(e) => setMarge1(e.target.value)}
                placeholder="2.00"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                step="0.01"
              />
            </div>
            <div>
              <label htmlFor="marge2" className="block text-xs text-slate-500 mb-1">
                Cote 2
              </label>
              <input
                id="marge2"
                type="number"
                value={marge2}
                onChange={(e) => setMarge2(e.target.value)}
                placeholder="2.00"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                step="0.01"
              />
            </div>
            <div>
              <label htmlFor="marge3" className="block text-xs text-slate-500 mb-1">
                Cote 3 (optionnel)
              </label>
              <input
                id="marge3"
                type="number"
                value={marge3}
                onChange={(e) => setMarge3(e.target.value)}
                placeholder="—"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                step="0.01"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {resultat ? (
          <>
            <div className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white rounded-2xl p-6 shadow-lg shadow-teal-200/50">
              <p className="text-sm text-teal-100 mb-1">Probabilite</p>
              <p className="text-4xl font-extrabold tracking-tight">
                {fmt(resultat.proba, 2)}{" "}
                <span className="text-lg font-semibold">%</span>
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Decimale</span>
                  <span className="text-lg font-bold text-slate-800">
                    {fmt(resultat.decimal, 2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Fractionnelle</span>
                  <span className="text-lg font-bold text-slate-800">
                    {resultat.fractionnelle}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Americaine</span>
                  <span className="text-lg font-bold text-slate-800">
                    {resultat.americaine > 0 ? "+" : ""}
                    {resultat.americaine}
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center">
            <p className="text-sm text-slate-400">
              Entrez une valeur pour voir les conversions
            </p>
          </div>
        )}

        {/* Marge bookmaker */}
        {margeBookmaker !== null && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-xs text-slate-400 mb-2">Marge bookmaker</p>
            <p
              className={`text-2xl font-extrabold ${
                margeBookmaker > 0
                  ? "text-amber-600"
                  : "text-emerald-600"
              }`}
            >
              {margeBookmaker > 0 ? "+" : ""}
              {fmt(margeBookmaker, 2)}%
            </p>
            <p className="text-xs text-slate-400 mt-2">
              {margeBookmaker > 0
                ? "Avantage bookmaker"
                : "Value bet possible"}
            </p>
          </div>
        )}

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Conversions instantanees entre cotes et probabilites. A titre educatif.
        </div>
      </div>
    </div>
  );
}
