"use client";

import { useState } from "react";
import {
  MONNAIES,
  monnaieVersEuros,
  eurosVersMonnaie,
  convertirVers,
  type Monnaie,
} from "./monnaieJeuCalc";

type ModeEntree = "monnaie" | "euros";

function fmt(n: number, digits = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function ConvertisseurMonnaieJeu() {
  const [modeEntree, setModeEntree] = useState<ModeEntree>("monnaie");
  const [monnaieSelectionnee, setMonnaieSelectionnee] = useState<Monnaie>(
    "vbucks"
  );
  const [valeurMonnaie, setValeurMonnaie] = useState<string>("1000");
  const [valeurEuros, setValeurEuros] = useState<string>("7.99");

  let euros = 0;
  let conversions: Record<Monnaie, number> = {} as Record<Monnaie, number>;

  if (modeEntree === "monnaie") {
    const val = parseFloat(valeurMonnaie) || 0;
    if (val > 0) {
      euros = monnaieVersEuros(val, monnaieSelectionnee);
      conversions = convertirVers(val, monnaieSelectionnee);
    }
  } else {
    const val = parseFloat(valeurEuros) || 0;
    if (val > 0) {
      euros = val;
      for (const m of MONNAIES) {
        conversions[m.id] = eurosVersMonnaie(val, m.id);
      }
    }
  }

  const monnaieInfo = MONNAIES.find((m) => m.id === monnaieSelectionnee);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Mode entree toggle */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Je veux convertir :
          </label>
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setModeEntree("monnaie")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                modeEntree === "monnaie"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Monnaie → Euros
            </button>
            <button
              onClick={() => setModeEntree("euros")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                modeEntree === "euros"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Euros → Monnaie
            </button>
          </div>
        </div>

        {/* Section monnaie vers euros */}
        {modeEntree === "monnaie" && (
          <div className="space-y-6">
            {/* Select monnaie */}
            <div>
              <label
                htmlFor="monnaie-select"
                className="block text-sm font-medium text-slate-600 mb-2"
              >
                Choisir une monnaie
              </label>
              <select
                id="monnaie-select"
                value={monnaieSelectionnee}
                onChange={(e) =>
                  setMonnaieSelectionnee(e.target.value as Monnaie)
                }
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-shadow"
              >
                {MONNAIES.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.emoji} {m.nom} ({m.jeu})
                  </option>
                ))}
              </select>
            </div>

            {/* Input quantité */}
            <div>
              <label
                htmlFor="quantite-input"
                className="block text-sm font-medium text-slate-600 mb-2"
              >
                Quantité {monnaieInfo ? monnaieInfo.nom : ""}
              </label>
              <div className="relative">
                <input
                  id="quantite-input"
                  type="number"
                  value={valeurMonnaie}
                  onChange={(e) => setValeurMonnaie(e.target.value)}
                  placeholder="ex: 1000"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-shadow"
                  min="0"
                  step="1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Section euros vers monnaie */}
        {modeEntree === "euros" && (
          <div>
            <label
              htmlFor="euros-input"
              className="block text-sm font-medium text-slate-600 mb-2"
            >
              Montant en euros
            </label>
            <div className="relative">
              <input
                id="euros-input"
                type="number"
                value={valeurEuros}
                onChange={(e) => setValeurEuros(e.target.value)}
                placeholder="ex: 10"
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-shadow"
                min="0"
                step="0.01"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                €
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {euros > 0 ? (
          <>
            <div className="bg-gradient-to-br from-fuchsia-600 to-pink-700 text-white rounded-2xl p-6 shadow-lg shadow-pink-200/50">
              <p className="text-sm text-pink-100 mb-1">
                {modeEntree === "monnaie" ? "Euros" : "Équivalent"}
              </p>
              <p className="text-4xl font-extrabold tracking-tight">
                {fmt(euros, 2)}{" "}
                <span className="text-lg font-semibold">€</span>
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <p className="text-xs text-slate-400 mb-4 font-semibold">
                CONVERSIONS AUTOMATIQUES
              </p>
              <div className="space-y-3">
                {MONNAIES.map((m) => (
                  <div key={m.id} className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">
                      {m.emoji} {m.nom}
                    </span>
                    <span className="text-lg font-bold text-slate-800">
                      {fmt(conversions[m.id], 0)}
                    </span>
                  </div>
                ))}
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

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Conversions instantanées avec taux officiels des magasins.
        </div>
      </div>
    </div>
  );
}
