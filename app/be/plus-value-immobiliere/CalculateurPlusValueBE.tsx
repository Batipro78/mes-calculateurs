"use client";

import { useState } from "react";
import { calculerPlusValueBE, type TypeBien } from "./plusValueImmoBeCalc";

function fmt(montant: number): string {
  return montant.toLocaleString("fr-BE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function CalculateurPlusValueBE() {
  const [prixAchat, setPrixAchat] = useState<string>("200000");
  const [prixVente, setPrixVente] = useState<string>("280000");
  const [fraisAcquisition, setFraisAcquisition] = useState<string>("25000");
  const [travaux, setTravaux] = useState<string>("0");
  const [dureeAnnees, setDureeAnnees] = useState<number>(3);
  const [typeBien, setTypeBien] = useState<TypeBien>("bati-investissement");

  const prixAchatNum = parseFloat(prixAchat) || 0;
  const prixVenteNum = parseFloat(prixVente) || 0;
  const fraisAcquisitionNum = parseFloat(fraisAcquisition) || 0;
  const travauxNum = parseFloat(travaux) || 0;

  const resultat = calculerPlusValueBE(
    prixAchatNum,
    prixVenteNum,
    fraisAcquisitionNum,
    travauxNum,
    dureeAnnees,
    typeBien
  );

  // Calcul des frais forfaitaires par défaut (12.5% du prix d'achat)
  const fraisForfaitaires = prixAchatNum * 0.125;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Inputs Prix */}
        <div className="mb-6">
          <label
            htmlFor="prix-achat-pv"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Prix d&apos;achat (EUR)
          </label>
          <input
            id="prix-achat-pv"
            type="number"
            value={prixAchat}
            onChange={(e) => setPrixAchat(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow"
            min="0"
            step="10000"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="prix-vente-pv"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Prix de vente (EUR)
          </label>
          <input
            id="prix-vente-pv"
            type="number"
            value={prixVente}
            onChange={(e) => setPrixVente(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow"
            min="0"
            step="10000"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="frais-acq-pv"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Frais d&apos;acquisition (EUR) — Défaut: {fmt(fraisForfaitaires)}
          </label>
          <input
            id="frais-acq-pv"
            type="number"
            value={fraisAcquisition}
            onChange={(e) => setFraisAcquisition(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow"
            min="0"
            step="1000"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="travaux-pv"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Travaux réalisés (EUR) — Avec factures
          </label>
          <input
            id="travaux-pv"
            type="number"
            value={travaux}
            onChange={(e) => setTravaux(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow"
            min="0"
            step="5000"
          />
        </div>

        {/* Slider Durée */}
        <div className="mb-6">
          <label
            htmlFor="duree-pv"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Durée de détention : <strong>{dureeAnnees} ans</strong>
          </label>
          <input
            id="duree-pv"
            type="range"
            min="0"
            max="20"
            step="1"
            value={dureeAnnees}
            onChange={(e) => setDureeAnnees(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0 ans</span>
            <span>20 ans</span>
          </div>
        </div>

        {/* Type de bien */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Type de bien
          </label>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => setTypeBien("habitation-principale")}
              className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                typeBien === "habitation-principale"
                  ? "border-purple-500 bg-purple-50/50"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className="text-sm font-bold text-slate-800">
                Habitation principale
              </span>
              <span className="block text-xs text-slate-400 mt-0.5">
                Résidence du vendeur — Exonération totale
              </span>
            </button>
            <button
              onClick={() => setTypeBien("bati-investissement")}
              className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                typeBien === "bati-investissement"
                  ? "border-purple-500 bg-purple-50/50"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className="text-sm font-bold text-slate-800">
                Bien bâti (investissement)
              </span>
              <span className="block text-xs text-slate-400 mt-0.5">
                Maison/Appartement — 16.5% si &lt;5 ans, 0% sinon
              </span>
            </button>
            <button
              onClick={() => setTypeBien("non-bati-terrain")}
              className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                typeBien === "non-bati-terrain"
                  ? "border-purple-500 bg-purple-50/50"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className="text-sm font-bold text-slate-800">
                Terrain (non-bâti)
              </span>
              <span className="block text-xs text-slate-400 mt-0.5">
                Terrain brut — 33% si &lt;5 ans, 16.5% si 5-8 ans, 0% sinon
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white rounded-2xl p-6 shadow-lg shadow-purple-200/50">
          <p className="text-sm text-purple-100 mb-1">Plus-value nette</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(resultat.plusValueNette)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Plus-value brute</span>
              <span className="text-lg font-bold text-slate-800">
                {fmt(resultat.plusValueBrute)} EUR
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">
                Taux appliqué ({resultat.typeBien})
              </span>
              <span className="text-lg font-bold text-slate-800">
                {(resultat.taux * 100).toFixed(1)} %
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">
                Impôt plus-value
              </span>
              <span className="text-lg font-extrabold text-red-600">
                {fmt(resultat.impotPlusValue)} EUR
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-600 leading-relaxed">
          <strong>Exonération :</strong> {resultat.estExonere ? "Oui" : "Non"}
          <br />
          <span className="text-slate-400">{resultat.raison}</span>
        </div>

        <div className="rounded-xl bg-blue-50 border border-blue-200 px-4 py-3 text-xs text-blue-700 leading-relaxed">
          Calcul conforme barèmes Belgique 2026 (SPF Finances, notaire.be).
          Pour plus de précision, consultez un notaire.
        </div>
      </div>
    </div>
  );
}
