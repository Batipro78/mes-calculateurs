"use client";

import { useState } from "react";

const APPAREILS_PREDEFINIS = [
  { nom: "Ampoule LED", puissance: 9 },
  { nom: "Televiseur", puissance: 120 },
  { nom: "Ordinateur portable", puissance: 50 },
  { nom: "Lave-linge", puissance: 1200 },
  { nom: "Radiateur electrique", puissance: 1500 },
  { nom: "Refrigerateur", puissance: 150 },
  { nom: "Four electrique", puissance: 2500 },
  { nom: "Seche-cheveux", puissance: 1800 },
  { nom: "Climatisation", puissance: 2000 },
  { nom: "Box internet", puissance: 15 },
  { nom: "Chargeur telephone", puissance: 20 },
  { nom: "Lave-vaisselle", puissance: 1400 },
];

// Tarif EDF Bleu Base 2026
const TARIF_KWH_DEFAUT = 0.2516;

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function CalculateurElectricite() {
  const [puissance, setPuissance] = useState("1500");
  const [heuresJour, setHeuresJour] = useState("5");
  const [tarifKwh, setTarifKwh] = useState(TARIF_KWH_DEFAUT.toString());
  const [appareilActif, setAppareilActif] = useState<number | null>(4); // Radiateur par defaut

  const puissanceNum = parseFloat(puissance) || 0;
  const heuresNum = parseFloat(heuresJour) || 0;
  const tarifNum = parseFloat(tarifKwh) || 0;

  // Calculs
  const consoJourKwh = (puissanceNum * heuresNum) / 1000;
  const consoMoisKwh = consoJourKwh * 30;
  const consoAnKwh = consoJourKwh * 365;

  const coutJour = consoJourKwh * tarifNum;
  const coutMois = consoMoisKwh * tarifNum;
  const coutAn = consoAnKwh * tarifNum;

  function selectAppareil(index: number) {
    setAppareilActif(index);
    setPuissance(APPAREILS_PREDEFINIS[index].puissance.toString());
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Appareil predefini */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Appareil (raccourci)
          </label>
          <div className="grid grid-cols-3 gap-1.5 max-h-48 overflow-y-auto pr-1">
            {APPAREILS_PREDEFINIS.map((a, i) => (
              <button
                key={a.nom}
                onClick={() => selectAppareil(i)}
                className={`px-2.5 py-2 rounded-lg text-xs font-medium border text-left transition-colors ${
                  appareilActif === i
                    ? "bg-yellow-50 border-yellow-400 text-yellow-800"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {a.nom}
                <span className="block text-slate-400 mt-0.5">
                  {a.puissance} W
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Puissance */}
        <div className="mb-6">
          <label
            htmlFor="puissance"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Puissance de l&apos;appareil
          </label>
          <div className="relative">
            <input
              id="puissance"
              type="number"
              value={puissance}
              onChange={(e) => {
                setPuissance(e.target.value);
                setAppareilActif(null);
              }}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              min="0"
              step="10"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              W
            </span>
          </div>
        </div>

        {/* Heures par jour */}
        <div className="mb-6">
          <label
            htmlFor="heures"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Utilisation par jour
          </label>
          <div className="relative">
            <input
              id="heures"
              type="number"
              value={heuresJour}
              onChange={(e) => setHeuresJour(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              min="0"
              max="24"
              step="0.5"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              h/jour
            </span>
          </div>
          <div className="flex gap-2 mt-2">
            {[1, 3, 5, 8, 12, 24].map((h) => (
              <button
                key={h}
                onClick={() => setHeuresJour(h.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  heuresJour === h.toString()
                    ? "bg-yellow-50 border-yellow-400 text-yellow-800"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {h}h
              </button>
            ))}
          </div>
        </div>

        {/* Tarif */}
        <div>
          <label
            htmlFor="tarif"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Prix du kWh
          </label>
          <div className="relative">
            <input
              id="tarif"
              type="number"
              value={tarifKwh}
              onChange={(e) => setTarifKwh(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold pr-16 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              min="0"
              step="0.01"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
              EUR/kWh
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Tarif EDF Bleu Base 2026 : 0,2516 EUR/kWh
          </p>
        </div>
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-2xl p-6 shadow-lg shadow-yellow-200/50">
          <p className="text-sm text-yellow-100 mb-1">Cout par mois</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(coutMois)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
          <div className="h-px bg-white/20 my-4" />
          <div className="flex justify-between text-sm">
            <span className="text-yellow-200">Consommation</span>
            <span className="font-semibold">{fmt(consoMoisKwh)} kWh/mois</span>
          </div>
        </div>

        {/* Par jour / par an */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-xs text-slate-400 mb-1">Par jour</p>
            <p className="text-lg font-extrabold text-slate-800">
              {fmt(coutJour)} EUR
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {fmt(consoJourKwh)} kWh
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-xs text-slate-400 mb-1">Par an</p>
            <p className="text-lg font-extrabold text-slate-800">
              {fmt(coutAn)} EUR
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {fmt(consoAnKwh)} kWh
            </p>
          </div>
        </div>

        {/* Detail consommation */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-600 mb-4">Resume</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Puissance</span>
              <span className="text-sm font-bold text-slate-800">
                {puissanceNum} W ({fmt(puissanceNum / 1000)} kW)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Utilisation</span>
              <span className="text-sm font-bold text-slate-800">
                {heuresNum}h / jour
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Tarif</span>
              <span className="text-sm font-bold text-slate-800">
                {tarifKwh} EUR/kWh
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">
                Conso journaliere
              </span>
              <span className="text-sm font-bold text-yellow-600">
                {fmt(consoJourKwh)} kWh
              </span>
            </div>
          </div>
        </div>

        {/* Equivalence */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Equivalent annuel
          </p>
          <div className="text-sm text-slate-600 space-y-1">
            <p>
              {fmt(coutAn)} EUR/an ={" "}
              <strong>{fmt(coutAn / 12)} EUR/mois</strong>
            </p>
            <p>
              Soit{" "}
              <strong>
                {fmt(consoAnKwh)} kWh/an
              </strong>{" "}
              pour cet appareil
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Estimation basee sur le tarif EDF Bleu Base 2026. Votre tarif reel
          peut varier selon votre contrat et votre fournisseur.
        </div>
      </div>
    </div>
  );
}
