"use client";

import { useState } from "react";
import { calcEvVsTherm, type VehiculeConfig } from "./evVsThermCalc";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function fmtDec(n: number, decimals = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

interface Preset {
  nom: string;
  emoji: string;
  prixAchat: number;
  consoThermique: number;
  entretienThermique: number;
  assuranceThermique: number;
  prixAchatElec: number;
  consoElectrique: number;
  entretienElec: number;
  assuranceElec: number;
  bonusEcologique: number;
}

const PRESETS: Preset[] = [
  {
    nom: "Citadine (Clio vs R5 E-Tech)",
    emoji: "🚗",
    prixAchat: 22000,
    consoThermique: 5.8,
    entretienThermique: 800,
    assuranceThermique: 600,
    prixAchatElec: 25000,
    consoElectrique: 15,
    entretienElec: 400,
    assuranceElec: 650,
    bonusEcologique: 4000,
  },
  {
    nom: "Compacte (308 vs e-308)",
    emoji: "🚙",
    prixAchat: 30000,
    consoThermique: 6.2,
    entretienThermique: 950,
    assuranceThermique: 700,
    prixAchatElec: 37000,
    consoElectrique: 16,
    entretienElec: 450,
    assuranceElec: 750,
    bonusEcologique: 4000,
  },
  {
    nom: "SUV (3008 vs e-3008)",
    emoji: "🚐",
    prixAchat: 38000,
    consoThermique: 7.0,
    entretienThermique: 1100,
    assuranceThermique: 850,
    prixAchatElec: 45000,
    consoElectrique: 18,
    entretienElec: 500,
    assuranceElec: 900,
    bonusEcologique: 3500,
  },
];

export default function EvVsThermique() {
  // Shared
  const [kmAnnuels, setKmAnnuels] = useState(15000);
  const [dureeAnnees, setDureeAnnees] = useState(5);
  // Thermique
  const [prixAchat, setPrixAchat] = useState(22000);
  const [consoThermique, setConsoThermique] = useState(5.8);
  const [prixCarburant, setPrixCarburant] = useState(1.75);
  const [entretienThermique, setEntretienThermique] = useState(800);
  const [assuranceThermique, setAssuranceThermique] = useState(600);
  // Electrique
  const [prixAchatElec, setPrixAchatElec] = useState(25000);
  const [consoElectrique, setConsoElectrique] = useState(15);
  const [prixKwh, setPrixKwh] = useState(0.21);
  const [entretienElec, setEntretienElec] = useState(400);
  const [assuranceElec, setAssuranceElec] = useState(650);
  const [bonusEcologique, setBonusEcologique] = useState(4000);

  const [activePreset, setActivePreset] = useState(0);

  function appliquerPreset(p: Preset, idx: number) {
    setActivePreset(idx);
    setPrixAchat(p.prixAchat);
    setConsoThermique(p.consoThermique);
    setEntretienThermique(p.entretienThermique);
    setAssuranceThermique(p.assuranceThermique);
    setPrixAchatElec(p.prixAchatElec);
    setConsoElectrique(p.consoElectrique);
    setEntretienElec(p.entretienElec);
    setAssuranceElec(p.assuranceElec);
    setBonusEcologique(p.bonusEcologique);
  }

  const config: VehiculeConfig = {
    prixAchat,
    kmAnnuels,
    dureeAnnees,
    consoThermique,
    prixCarburant,
    entretienThermique,
    assuranceThermique,
    consoElectrique,
    prixKwh,
    prixAchatElec,
    entretienElec,
    assuranceElec,
    bonusEcologique,
  };

  const res = calcEvVsTherm(config);

  const maxCumul = Math.max(
    ...res.annees.map((a) => Math.max(a.cumulTherm, a.cumulElec))
  );

  return (
    <div className="space-y-8">
      {/* Presets */}
      <div className="flex flex-wrap gap-3">
        {PRESETS.map((p, i) => (
          <button
            key={p.nom}
            onClick={() => appliquerPreset(p, i)}
            className={`px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium ${
              activePreset === i
                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                : "border-slate-200 bg-white hover:border-indigo-300 text-slate-700"
            }`}
          >
            <span className="mr-2">{p.emoji}</span>
            {p.nom}
          </button>
        ))}
      </div>

      {/* Parametres communs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Parametres communs
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Kilometres par an : <strong>{fmt(kmAnnuels)} km</strong>
            </label>
            <input
              type="range"
              min={5000}
              max={50000}
              step={1000}
              value={kmAnnuels}
              onChange={(e) => setKmAnnuels(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>5 000 km</span>
              <span>50 000 km</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Duree de possession : <strong>{dureeAnnees} ans</strong>
            </label>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={dureeAnnees}
              onChange={(e) => setDureeAnnees(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1 an</span>
              <span>10 ans</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deux colonnes: Thermique vs Electrique */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Thermique */}
        <div className="bg-white rounded-2xl border-2 border-blue-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
              ⛽
            </div>
            <h2 className="text-lg font-bold text-blue-800">Thermique</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Prix d&apos;achat : <strong>{fmt(prixAchat)} €</strong>
              </label>
              <input
                type="range"
                min={10000}
                max={60000}
                step={500}
                value={prixAchat}
                onChange={(e) => setPrixAchat(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Consommation : <strong>{fmtDec(consoThermique, 1)} L/100km</strong>
              </label>
              <input
                type="range"
                min={3}
                max={12}
                step={0.1}
                value={consoThermique}
                onChange={(e) => setConsoThermique(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Prix carburant : <strong>{fmtDec(prixCarburant)} €/L</strong>
              </label>
              <input
                type="range"
                min={1.2}
                max={2.5}
                step={0.01}
                value={prixCarburant}
                onChange={(e) => setPrixCarburant(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Entretien annuel : <strong>{fmt(entretienThermique)} €/an</strong>
              </label>
              <input
                type="range"
                min={200}
                max={2500}
                step={50}
                value={entretienThermique}
                onChange={(e) => setEntretienThermique(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Assurance : <strong>{fmt(assuranceThermique)} €/an</strong>
              </label>
              <input
                type="range"
                min={300}
                max={2000}
                step={50}
                value={assuranceThermique}
                onChange={(e) => setAssuranceThermique(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Electrique */}
        <div className="bg-white rounded-2xl border-2 border-green-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-lg">
              ⚡
            </div>
            <h2 className="text-lg font-bold text-green-800">Electrique</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Prix d&apos;achat : <strong>{fmt(prixAchatElec)} €</strong>
              </label>
              <input
                type="range"
                min={15000}
                max={70000}
                step={500}
                value={prixAchatElec}
                onChange={(e) => setPrixAchatElec(Number(e.target.value))}
                className="w-full accent-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Consommation : <strong>{fmtDec(consoElectrique, 1)} kWh/100km</strong>
              </label>
              <input
                type="range"
                min={10}
                max={30}
                step={0.5}
                value={consoElectrique}
                onChange={(e) => setConsoElectrique(Number(e.target.value))}
                className="w-full accent-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Prix electricite : <strong>{fmtDec(prixKwh)} €/kWh</strong>
              </label>
              <input
                type="range"
                min={0.1}
                max={0.5}
                step={0.01}
                value={prixKwh}
                onChange={(e) => setPrixKwh(Number(e.target.value))}
                className="w-full accent-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Entretien annuel : <strong>{fmt(entretienElec)} €/an</strong>
              </label>
              <input
                type="range"
                min={100}
                max={1500}
                step={50}
                value={entretienElec}
                onChange={(e) => setEntretienElec(Number(e.target.value))}
                className="w-full accent-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Assurance : <strong>{fmt(assuranceElec)} €/an</strong>
              </label>
              <input
                type="range"
                min={300}
                max={2000}
                step={50}
                value={assuranceElec}
                onChange={(e) => setAssuranceElec(Number(e.target.value))}
                className="w-full accent-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Bonus ecologique : <strong>{fmt(bonusEcologique)} €</strong>
              </label>
              <input
                type="range"
                min={0}
                max={7700}
                step={100}
                value={bonusEcologique}
                onChange={(e) => setBonusEcologique(Number(e.target.value))}
                className="w-full accent-green-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Winner Banner */}
      <div
        className={`rounded-2xl p-6 text-center ${
          res.economie > 0
            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
            : res.economie < 0
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
            : "bg-slate-200 text-slate-800"
        }`}
      >
        <div className="text-lg font-medium opacity-90">
          {res.economie > 0
            ? "L'electrique est moins cher !"
            : res.economie < 0
            ? "Le thermique est moins cher !"
            : "Cout identique !"}
        </div>
        <div className="text-4xl font-black mt-1">
          {res.economie !== 0
            ? `${fmt(Math.abs(res.economie))} € d'economie`
            : "0 € de difference"}
        </div>
        <div className="text-sm opacity-80 mt-1">
          sur {dureeAnnees} an{dureeAnnees > 1 ? "s" : ""} et{" "}
          {fmt(kmAnnuels * dureeAnnees)} km
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Thermique */}
        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-3">
            ⛽ Cout total thermique
          </h3>
          <div className="text-3xl font-black text-blue-900 mb-1">
            {fmt(res.thermique.coutTotal)} €
          </div>
          <div className="text-sm text-blue-600 mb-4">
            {fmt(res.thermique.coutMensuel)} €/mois · {fmtDec(res.thermique.coutKm, 2)}{" "}
            €/km
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-700">Carburant</span>
              <span className="font-semibold text-blue-900">
                {fmt(res.thermique.carburant)} €
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Entretien</span>
              <span className="font-semibold text-blue-900">
                {fmt(res.thermique.entretien)} €
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Assurance</span>
              <span className="font-semibold text-blue-900">
                {fmt(res.thermique.assurance)} €
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Depreciation</span>
              <span className="font-semibold text-blue-900">
                {fmt(res.thermique.depreciation)} €
              </span>
            </div>
          </div>
        </div>

        {/* Electrique */}
        <div className="bg-green-50 rounded-2xl border border-green-200 p-6">
          <h3 className="text-lg font-bold text-green-800 mb-3">
            ⚡ Cout total electrique
          </h3>
          <div className="text-3xl font-black text-green-900 mb-1">
            {fmt(res.electrique.coutTotal)} €
          </div>
          <div className="text-sm text-green-600 mb-4">
            {fmt(res.electrique.coutMensuel)} €/mois ·{" "}
            {fmtDec(res.electrique.coutKm, 2)} €/km
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-green-700">Electricite</span>
              <span className="font-semibold text-green-900">
                {fmt(res.electrique.energie)} €
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Entretien</span>
              <span className="font-semibold text-green-900">
                {fmt(res.electrique.entretien)} €
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Assurance</span>
              <span className="font-semibold text-green-900">
                {fmt(res.electrique.assurance)} €
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Depreciation</span>
              <span className="font-semibold text-green-900">
                {fmt(res.electrique.depreciation)} €
              </span>
            </div>
            <div className="flex justify-between border-t border-green-200 pt-2 mt-2">
              <span className="text-green-700">Bonus ecologique</span>
              <span className="font-semibold text-green-600">
                -{fmt(res.electrique.bonus)} €
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CO2 + Seuil rentabilite */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 text-center">
          <div className="text-sm text-emerald-600 font-medium">
            CO2 economise (emissions directes)
          </div>
          <div className="text-3xl font-black text-emerald-800 mt-1">
            {fmtDec(res.co2EconomieTonnes, 1)} tonnes
          </div>
          <div className="text-xs text-emerald-500 mt-1">
            sur {dureeAnnees} an{dureeAnnees > 1 ? "s" : ""} ·{" "}
            {fmt(kmAnnuels * dureeAnnees)} km
          </div>
        </div>
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 text-center">
          <div className="text-sm text-amber-600 font-medium">
            Seuil de rentabilite electrique
          </div>
          <div className="text-3xl font-black text-amber-800 mt-1">
            {res.seuilRentabiliteKm > 0
              ? `${fmt(res.seuilRentabiliteKm)} km/an`
              : "Toujours rentable"}
          </div>
          <div className="text-xs text-amber-500 mt-1">
            {res.seuilRentabiliteKm > 0 && kmAnnuels >= res.seuilRentabiliteKm
              ? "Vous depassez le seuil : l'electrique est rentable pour vous"
              : res.seuilRentabiliteKm > 0
              ? "Vous n'atteignez pas encore le seuil"
              : "Avec ces parametres, l'electrique est toujours avantageux"}
          </div>
        </div>
      </div>

      {/* Graphique annee par annee */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Cout cumule annee par annee
        </h2>
        <div className="space-y-3">
          {res.annees.map((a) => (
            <div key={a.annee}>
              <div className="text-sm font-medium text-slate-600 mb-1">
                Annee {a.annee}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-blue-600 w-20">Thermique</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-5 overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full transition-all"
                      style={{
                        width: `${maxCumul > 0 ? (a.cumulTherm / maxCumul) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-blue-800 w-24 text-right">
                    {fmt(a.cumulTherm)} €
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-600 w-20">Electrique</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-5 overflow-hidden">
                    <div
                      className="bg-green-500 h-full rounded-full transition-all"
                      style={{
                        width: `${maxCumul > 0 ? (Math.max(0, a.cumulElec) / maxCumul) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-green-800 w-24 text-right">
                    {fmt(a.cumulElec)} €
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tableau de ventilation */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-x-auto">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Ventilation detaillee des couts
        </h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="text-left p-3 font-semibold text-slate-700">
                Poste de cout
              </th>
              <th className="text-right p-3 font-semibold text-blue-700">
                ⛽ Thermique
              </th>
              <th className="text-right p-3 font-semibold text-green-700">
                ⚡ Electrique
              </th>
              <th className="text-right p-3 font-semibold text-slate-700">
                Difference
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="p-3">Energie / Carburant</td>
              <td className="p-3 text-right font-medium text-blue-800">
                {fmt(res.thermique.carburant)} €
              </td>
              <td className="p-3 text-right font-medium text-green-800">
                {fmt(res.electrique.energie)} €
              </td>
              <td className="p-3 text-right font-semibold">
                <span
                  className={
                    res.thermique.carburant - res.electrique.energie > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {res.thermique.carburant - res.electrique.energie > 0 ? "+" : ""}
                  {fmt(res.thermique.carburant - res.electrique.energie)} €
                </span>
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="p-3">Entretien</td>
              <td className="p-3 text-right font-medium text-blue-800">
                {fmt(res.thermique.entretien)} €
              </td>
              <td className="p-3 text-right font-medium text-green-800">
                {fmt(res.electrique.entretien)} €
              </td>
              <td className="p-3 text-right font-semibold">
                <span
                  className={
                    res.thermique.entretien - res.electrique.entretien > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {res.thermique.entretien - res.electrique.entretien > 0 ? "+" : ""}
                  {fmt(res.thermique.entretien - res.electrique.entretien)} €
                </span>
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="p-3">Assurance</td>
              <td className="p-3 text-right font-medium text-blue-800">
                {fmt(res.thermique.assurance)} €
              </td>
              <td className="p-3 text-right font-medium text-green-800">
                {fmt(res.electrique.assurance)} €
              </td>
              <td className="p-3 text-right font-semibold">
                <span
                  className={
                    res.thermique.assurance - res.electrique.assurance > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {res.thermique.assurance - res.electrique.assurance > 0 ? "+" : ""}
                  {fmt(res.thermique.assurance - res.electrique.assurance)} €
                </span>
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="p-3">Depreciation</td>
              <td className="p-3 text-right font-medium text-blue-800">
                {fmt(res.thermique.depreciation)} €
              </td>
              <td className="p-3 text-right font-medium text-green-800">
                {fmt(res.electrique.depreciation)} €
              </td>
              <td className="p-3 text-right font-semibold">
                <span
                  className={
                    res.thermique.depreciation - res.electrique.depreciation > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {res.thermique.depreciation - res.electrique.depreciation > 0
                    ? "+"
                    : ""}
                  {fmt(res.thermique.depreciation - res.electrique.depreciation)} €
                </span>
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="p-3">Bonus ecologique</td>
              <td className="p-3 text-right font-medium text-blue-800">-</td>
              <td className="p-3 text-right font-medium text-green-600">
                -{fmt(res.electrique.bonus)} €
              </td>
              <td className="p-3 text-right font-semibold text-green-600">
                +{fmt(res.electrique.bonus)} €
              </td>
            </tr>
            <tr className="bg-slate-50 font-bold">
              <td className="p-3">TOTAL</td>
              <td className="p-3 text-right text-blue-800">
                {fmt(res.thermique.coutTotal)} €
              </td>
              <td className="p-3 text-right text-green-800">
                {fmt(res.electrique.coutTotal)} €
              </td>
              <td className="p-3 text-right">
                <span className={res.economie > 0 ? "text-green-600" : "text-red-600"}>
                  {res.economie > 0 ? "+" : ""}
                  {fmt(res.economie)} €
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
