"use client";

import { useState } from "react";
import {
  calculerZakatFitr,
  MONTANTS_2026,
  type SourceMontant,
} from "./zakatFitrCalc";

function fmt(n: number, digits = 0): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function CalculZakatFitr() {
  const [nbAdultes, setNbAdultes] = useState<string>("2");
  const [nbEnfants, setNbEnfants] = useState<string>("1");
  const [source, setSource] = useState<SourceMontant>("mosquee-paris");
  const [montantLibre, setMontantLibre] = useState<string>("7");

  const resultat = calculerZakatFitr({
    nb_adultes: Math.max(0, parseInt(nbAdultes) || 0),
    nb_enfants: Math.max(0, parseInt(nbEnfants) || 0),
    source,
    montant_libre: source === "libre" ? parseFloat(montantLibre) || 0 : undefined,
  });

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Section Foyer */}
        <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">
          Votre foyer
        </h3>

        {/* Nombre d'adultes */}
        <div className="mb-6">
          <label htmlFor="adultes" className="block text-sm font-medium text-slate-600 mb-2">
            Nombre d&apos;adultes
          </label>
          <div className="relative">
            <input
              id="adultes"
              type="number"
              value={nbAdultes}
              onChange={(e) => setNbAdultes(e.target.value)}
              placeholder="ex: 2"
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
              min="0"
              step="1"
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Vous-même, votre époux/épouse, etc.
          </p>
        </div>

        {/* Nombre d'enfants */}
        <div className="mb-8">
          <label htmlFor="enfants" className="block text-sm font-medium text-slate-600 mb-2">
            Nombre d&apos;enfants (tous comptent)
          </label>
          <div className="relative">
            <input
              id="enfants"
              type="number"
              value={nbEnfants}
              onChange={(e) => setNbEnfants(e.target.value)}
              placeholder="ex: 2"
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
              min="0"
              step="1"
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Enfants et nourrissons — tous doivent être couverts.
          </p>
        </div>

        {/* Section Montant */}
        <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">
          Montant par personne
        </h3>

        {/* Toggle montants */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-3">
            Source officielle
          </label>
          <div className="space-y-2.5">
            {/* Mosquée Paris */}
            <button
              onClick={() => setSource("mosquee-paris")}
              className={`w-full px-4 py-3.5 rounded-xl text-sm font-semibold transition-all text-left border ${
                source === "mosquee-paris"
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800 ring-2 ring-emerald-200"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <span className="font-bold">Mosquée de Paris</span>
              <span className="text-emerald-600 font-bold ml-2">7 €</span>
            </button>

            {/* CFCM */}
            <button
              onClick={() => setSource("cfcm")}
              className={`w-full px-4 py-3.5 rounded-xl text-sm font-semibold transition-all text-left border ${
                source === "cfcm"
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800 ring-2 ring-emerald-200"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <span className="font-bold">CFCM (Conseil Français du Culte Musulman)</span>
              <span className="text-emerald-600 font-bold ml-2">9 €</span>
            </button>

            {/* Libre */}
            <button
              onClick={() => setSource("libre")}
              className={`w-full px-4 py-3.5 rounded-xl text-sm font-semibold transition-all text-left border ${
                source === "libre"
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800 ring-2 ring-emerald-200"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <span className="font-bold">Montant libre</span>
              <span className="text-emerald-600 font-bold ml-2">personnalisé</span>
            </button>
          </div>
        </div>

        {/* Input montant libre si necessaire */}
        {source === "libre" && (
          <div className="mb-6">
            <label htmlFor="libre" className="block text-sm font-medium text-slate-600 mb-2">
              Montant par personne (€)
            </label>
            <div className="relative">
              <input
                id="libre"
                type="number"
                value={montantLibre}
                onChange={(e) => setMontantLibre(e.target.value)}
                placeholder="ex: 8"
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold pr-8 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
                step="0.5"
                min="0"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                €
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Montant conseillé selon votre mosquée locale.
            </p>
          </div>
        )}
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {resultat.total_personnes > 0 ? (
          <>
            {/* Total principal */}
            <div className="bg-gradient-to-br from-emerald-600 to-green-700 text-white rounded-2xl p-6 shadow-lg shadow-emerald-200/50">
              <p className="text-sm text-emerald-100 mb-1">Total Zakat al-Fitr à verser</p>
              <p className="text-4xl font-extrabold tracking-tight">
                {fmt(resultat.total, 2)} <span className="text-lg font-semibold">€</span>
              </p>
              <p className="text-sm text-emerald-100 mt-3">
                {resultat.total_personnes} personne{resultat.total_personnes > 1 ? "s" : ""} ×{" "}
                {fmt(resultat.montant_par_personne, 2)} €
              </p>
            </div>

            {/* Détails */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Membres du foyer</p>
                  <p className="text-xl font-bold text-slate-800">
                    {resultat.total_personnes} personne{resultat.total_personnes > 1 ? "s" : ""}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Par personne</p>
                  <p className="text-xl font-bold text-slate-800">
                    {fmt(resultat.montant_par_personne, 2)} €
                  </p>
                </div>
              </div>
            </div>

            {/* Note de rappel */}
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-4 shadow-sm">
              <p className="text-sm text-emerald-800">
                <strong>À verser avant la prière de l&apos;Aïd al-Fitr.</strong><br />
                Autorisé dès le début du Ramadan.
              </p>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center">
            <p className="text-sm text-slate-400">
              Entrez le nombre de membres du foyer pour calculer
            </p>
          </div>
        )}

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-500 leading-relaxed">
          Montants 2026 officiels selon Mosquée de Paris et CFCM.
        </div>
      </div>
    </div>
  );
}
