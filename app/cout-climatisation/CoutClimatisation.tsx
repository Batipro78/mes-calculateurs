"use client";

import { useState } from "react";
import { calculerCoutClim } from "./coutClimCalc";

const TARIF_BASE = 0.2516; // EUR/kWh, tarif EDF Bleu 2026

interface Modele {
  nom: string;
  emoji: string;
  puissanceFroidW: number;
  eer: number;
  detail: string;
}

const MODELES: Modele[] = [
  { nom: "Mobile monobloc", emoji: "\u{1F4E6}", puissanceFroidW: 2600, eer: 2.6, detail: "~2,6 kW froid - peu efficace" },
  { nom: "Split 9000 BTU", emoji: "❄️", puissanceFroidW: 2500, eer: 3.4, detail: "2,5 kW - 1 piece" },
  { nom: "Split 12000 BTU", emoji: "❄️", puissanceFroidW: 3500, eer: 3.6, detail: "3,5 kW - grande piece" },
  { nom: "Reversible 18000 BTU", emoji: "\u{1F501}", puissanceFroidW: 5000, eer: 3.8, detail: "5 kW - chaud + froid" },
  { nom: "Multi-split", emoji: "\u{1F3E0}", puissanceFroidW: 7000, eer: 4.0, detail: "7 kW - plusieurs pieces" },
];

function fmt(n: number, dec = 0): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

export default function CoutClimatisation() {
  const [modeleActif, setModeleActif] = useState(1); // Split 9000 BTU
  const [puissanceFroid, setPuissanceFroid] = useState("2500");
  const [eer, setEer] = useState("3.4");
  const [heuresJour, setHeuresJour] = useState("8");
  const [prixKwh, setPrixKwh] = useState(TARIF_BASE.toString());

  function selectModele(i: number) {
    setModeleActif(i);
    setPuissanceFroid(MODELES[i].puissanceFroidW.toString());
    setEer(MODELES[i].eer.toString());
  }

  const r = calculerCoutClim({
    puissanceFroidW: parseFloat(puissanceFroid) || 0,
    eer: parseFloat(eer) || 0,
    heuresJour: parseFloat(heuresJour) || 0,
    prixKwh: parseFloat(prixKwh) || 0,
  });

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        {/* Modeles */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Type de climatiseur</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {MODELES.map((m, i) => (
              <button
                key={m.nom}
                onClick={() => selectModele(i)}
                className={`px-2.5 py-2 rounded-xl text-xs font-semibold border-2 text-left transition-colors ${
                  modeleActif === i
                    ? "bg-sky-50 border-sky-400 text-sky-800"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                <span className="mr-1">{m.emoji}</span>
                {m.nom}
                <span className="block text-[10px] font-normal text-slate-400 mt-0.5 leading-tight">
                  {m.detail}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Puissance froid + EER */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="puissance" className="block text-sm font-medium text-slate-600 mb-2">
              Puissance froid
            </label>
            <div className="relative">
              <input
                id="puissance"
                type="number"
                value={puissanceFroid}
                onChange={(e) => {
                  setPuissanceFroid(e.target.value);
                  setModeleActif(-1);
                }}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                min="0"
                step="100"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">W</span>
            </div>
          </div>
          <div>
            <label htmlFor="eer" className="block text-sm font-medium text-slate-600 mb-2">
              Efficacite (EER)
            </label>
            <input
              id="eer"
              type="number"
              value={eer}
              onChange={(e) => {
                setEer(e.target.value);
                setModeleActif(-1);
              }}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              min="1"
              step="0.1"
            />
          </div>
        </div>

        {/* Heures */}
        <div>
          <label htmlFor="heures" className="block text-sm font-medium text-slate-600 mb-2">
            Utilisation par jour
          </label>
          <div className="relative">
            <input
              id="heures"
              type="number"
              value={heuresJour}
              onChange={(e) => setHeuresJour(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              min="0"
              max="24"
              step="1"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">h/j</span>
          </div>
          <div className="flex gap-2 mt-2">
            {[2, 4, 8, 12, 24].map((h) => (
              <button
                key={h}
                onClick={() => setHeuresJour(h.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  heuresJour === h.toString()
                    ? "bg-sky-50 border-sky-400 text-sky-800"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {h}h
              </button>
            ))}
          </div>
        </div>

        {/* Prix kWh */}
        <div>
          <label htmlFor="prix" className="block text-sm font-medium text-slate-600 mb-2">
            Prix de l&apos;electricite
          </label>
          <div className="relative">
            <input
              id="prix"
              type="number"
              value={prixKwh}
              onChange={(e) => setPrixKwh(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold pr-16 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              min="0"
              step="0.01"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">&euro;/kWh</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Tarif EDF Bleu 2026 : {TARIF_BASE} &euro;/kWh.</p>
        </div>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg shadow-sky-200/50">
          <p className="text-sm text-sky-100 mb-1">Cout par mois</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(r.coutMois)} <span className="text-lg font-semibold">&euro;</span>
          </p>
          <div className="h-px bg-white/20 my-4" />
          <div className="flex justify-between text-sm">
            <span className="text-sky-100">Consommation</span>
            <span className="font-semibold">{fmt(r.consoJourKwh, 1)} kWh/jour</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm text-center">
            <p className="text-xs text-slate-400 mb-1">Par jour</p>
            <p className="text-base font-extrabold text-slate-800">{fmt(r.coutJour, 2)} &euro;</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm text-center">
            <p className="text-xs text-slate-400 mb-1">Ete (3 mois)</p>
            <p className="text-base font-extrabold text-slate-800">{fmt(r.coutEte)} &euro;</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm text-center">
            <p className="text-xs text-slate-400 mb-1">Par an*</p>
            <p className="text-base font-extrabold text-slate-800">{fmt(r.coutAn)} &euro;</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-600 mb-3">Detail</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Puissance electrique</span>
              <span className="font-semibold text-slate-800">{fmt(r.consoElecW)} W</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Conso mensuelle</span>
              <span className="font-semibold text-slate-800">{fmt(r.consoJourKwh * 30)} kWh</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-xs text-emerald-800 leading-relaxed">
          <strong>Astuce :</strong> regler la clim a 26 &deg;C au lieu de 23 &deg;C divise la consommation par
          trois (ADEME). Fermez volets et fenetres en journee pour qu&apos;elle force moins.
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          * Estimation sur ~120 jours d&apos;utilisation effective dans l&apos;annee. Le cout reel depend de votre
          tarif, de la temperature de consigne et de l&apos;isolation.
        </div>
      </div>
    </div>
  );
}
