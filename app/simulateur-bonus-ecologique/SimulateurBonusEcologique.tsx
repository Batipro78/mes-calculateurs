"use client";

import { useState } from "react";
import {
  calcBonusEcologique,
  SEUIL_MODESTE,
  SEUIL_INTERMEDIAIRE,
  TRANCHE_LABELS,
  type TypeVehicule,
  type BatterieEU,
} from "./calcBonusEcologique";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

const VEHICULES_POPULAIRES = [
  { nom: "Renault 5 E-Tech", prix: 25000, poids: 1450, battEU: true },
  { nom: "Peugeot e-208", prix: 33500, poids: 1530, battEU: true },
  { nom: "Citroen e-C3", prix: 23300, poids: 1416, battEU: true },
  { nom: "Dacia Spring", prix: 18900, poids: 1050, battEU: false },
  { nom: "Tesla Model 3", prix: 39990, poids: 1760, battEU: true },
  { nom: "MG4", prix: 27990, poids: 1655, battEU: false },
  { nom: "Renault Megane E-Tech", prix: 37200, poids: 1636, battEU: true },
  { nom: "Fiat 500e", prix: 29900, poids: 1320, battEU: true },
];

export default function SimulateurBonusEcologique() {
  const [prixVehicule, setPrixVehicule] = useState(25000);
  const [poidsVehicule, setPoidsVehicule] = useState(1450);
  const [rfrParPart, setRfrParPart] = useState(20000);
  const [typeVehicule, setTypeVehicule] = useState<TypeVehicule>("electrique");
  const [batterieEU, setBatterieEU] = useState<BatterieEU>("oui");

  const resultat = calcBonusEcologique(
    prixVehicule,
    poidsVehicule,
    rfrParPart,
    typeVehicule,
    batterieEU
  );

  function appliquerVehicule(v: (typeof VEHICULES_POPULAIRES)[number]) {
    setPrixVehicule(v.prix);
    setPoidsVehicule(v.poids);
    setBatterieEU(v.battEU ? "oui" : "non");
    setTypeVehicule("electrique");
  }

  return (
    <div className="space-y-8">
      {/* Vehicules populaires */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Vehicules populaires 2026
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {VEHICULES_POPULAIRES.map((v) => (
            <button
              key={v.nom}
              onClick={() => appliquerVehicule(v)}
              className={`text-left p-3 rounded-xl border-2 transition-all text-sm ${
                prixVehicule === v.prix && poidsVehicule === v.poids
                  ? "border-green-500 bg-green-50"
                  : "border-slate-200 hover:border-green-300 bg-white"
              }`}
            >
              <div className="font-bold text-slate-800">{v.nom}</div>
              <div className="text-slate-500 text-xs">
                {fmt(v.prix)} € · {fmt(v.poids)} kg
              </div>
              <div className="text-xs mt-1">
                {v.battEU ? (
                  <span className="text-green-600">🇪🇺 Batterie EU</span>
                ) : (
                  <span className="text-slate-400">Batterie hors EU</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Votre situation
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Type de vehicule
            </label>
            <select
              value={typeVehicule}
              onChange={(e) =>
                setTypeVehicule(e.target.value as TypeVehicule)
              }
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm"
            >
              <option value="electrique">100% Electrique</option>
              <option value="hydrogene">Hydrogene</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Prix du vehicule TTC
            </label>
            <div className="relative">
              <input
                type="number"
                value={prixVehicule}
                onChange={(e) =>
                  setPrixVehicule(Math.max(0, Number(e.target.value)))
                }
                className="w-full rounded-lg border border-slate-300 p-2.5 pr-8 text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                €
              </span>
            </div>
            {prixVehicule > 47000 && (
              <p className="text-red-500 text-xs mt-1">
                Maximum 47 000 € pour etre eligible
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Poids du vehicule
            </label>
            <div className="relative">
              <input
                type="number"
                value={poidsVehicule}
                onChange={(e) =>
                  setPoidsVehicule(Math.max(0, Number(e.target.value)))
                }
                className="w-full rounded-lg border border-slate-300 p-2.5 pr-8 text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                kg
              </span>
            </div>
            {poidsVehicule > 2400 && (
              <p className="text-red-500 text-xs mt-1">
                Maximum 2 400 kg pour etre eligible
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Revenu fiscal de reference par part
            </label>
            <div className="relative">
              <input
                type="number"
                value={rfrParPart}
                onChange={(e) =>
                  setRfrParPart(Math.max(0, Number(e.target.value)))
                }
                className="w-full rounded-lg border border-slate-300 p-2.5 pr-8 text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                €
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-1">
              Visible sur votre avis d&apos;imposition (ligne RFR / nombre de
              parts)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Batterie fabriquee en Europe ?
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setBatterieEU("oui")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  batterieEU === "oui"
                    ? "bg-green-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                🇪🇺 Oui
              </button>
              <button
                onClick={() => setBatterieEU("non")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  batterieEU === "non"
                    ? "bg-slate-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Non
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resultat */}
      <div
        className={`rounded-2xl border-2 shadow-sm p-6 ${
          resultat.eligible
            ? "border-green-300 bg-gradient-to-br from-green-50 to-emerald-50"
            : "border-red-300 bg-gradient-to-br from-red-50 to-orange-50"
        }`}
      >
        {resultat.eligible ? (
          <>
            <div className="text-center mb-6">
              <div className="text-sm font-medium text-green-700 mb-1">
                ✅ Vehicule eligible — Votre bonus ecologique
              </div>
              <div className="text-5xl font-black text-green-700">
                {fmt(resultat.bonusTotal)} €
              </div>
              <div className="text-sm text-green-600 mt-1">
                {TRANCHE_LABELS[resultat.trancheRFR]}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/70 rounded-xl p-4 text-center">
                <div className="text-xs text-slate-500 mb-1">Bonus de base</div>
                <div className="text-2xl font-bold text-green-700">
                  {fmt(resultat.bonusBase)} €
                </div>
              </div>
              <div className="bg-white/70 rounded-xl p-4 text-center">
                <div className="text-xs text-slate-500 mb-1">
                  Surbonus batterie EU
                </div>
                <div className="text-2xl font-bold text-green-700">
                  {resultat.surbonus > 0
                    ? `+${fmt(resultat.surbonus)} €`
                    : "—"}
                </div>
              </div>
              <div className="bg-white/70 rounded-xl p-4 text-center">
                <div className="text-xs text-slate-500 mb-1">
                  Cout reel du vehicule
                </div>
                <div className="text-2xl font-bold text-slate-800">
                  {fmt(prixVehicule - resultat.bonusTotal)} €
                </div>
              </div>
            </div>

            <div className="bg-white/70 rounded-xl p-4">
              <h3 className="font-bold text-slate-800 mb-2 text-sm">
                Economies estimees sur 5 ans
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs text-slate-500">Bonus</div>
                  <div className="font-bold text-green-700">
                    {fmt(resultat.bonusTotal)} €
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">
                    Carburant (5 ans)
                  </div>
                  <div className="font-bold text-green-700">
                    {fmt(resultat.economieCarburant * 5)} €
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Total economies</div>
                  <div className="font-bold text-green-700">
                    {fmt(resultat.bonusTotal + resultat.economieCarburant * 5)} €
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="text-4xl mb-3">❌</div>
            <div className="text-xl font-bold text-red-700 mb-2">
              Vehicule non eligible
            </div>
            <p className="text-red-600">{resultat.raisonExclusion}</p>
          </div>
        )}
      </div>

      {/* Tableau comparatif par RFR */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Bareme complet selon vos revenus
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-3 font-semibold text-slate-700">
                  Tranche RFR/part
                </th>
                <th className="text-center p-3 font-semibold text-slate-700">
                  Bonus base
                </th>
                <th className="text-center p-3 font-semibold text-slate-700">
                  + Surbonus EU
                </th>
                <th className="text-center p-3 font-semibold text-slate-700">
                  Total max
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  label: `≤ ${fmt(SEUIL_MODESTE)} €`,
                  base: 5700,
                  surb: 2000,
                  active: rfrParPart <= SEUIL_MODESTE,
                },
                {
                  label: `${fmt(SEUIL_MODESTE + 1)} - ${fmt(SEUIL_INTERMEDIAIRE)} €`,
                  base: 4700,
                  surb: 1500,
                  active:
                    rfrParPart > SEUIL_MODESTE &&
                    rfrParPart <= SEUIL_INTERMEDIAIRE,
                },
                {
                  label: `> ${fmt(SEUIL_INTERMEDIAIRE)} €`,
                  base: 3500,
                  surb: 1200,
                  active: rfrParPart > SEUIL_INTERMEDIAIRE,
                },
              ].map((row) => (
                <tr
                  key={row.label}
                  className={`border-b border-slate-100 ${
                    row.active ? "bg-green-50 font-bold" : ""
                  }`}
                >
                  <td className="p-3 text-slate-700">{row.label}</td>
                  <td className="p-3 text-center">{fmt(row.base)} €</td>
                  <td className="p-3 text-center text-green-600">
                    +{fmt(row.surb)} €
                  </td>
                  <td className="p-3 text-center font-bold text-green-700">
                    {fmt(row.base + row.surb)} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tableau vehicules eligibles */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Bonus par vehicule (avec votre RFR)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-3 font-semibold text-slate-700">
                  Modele
                </th>
                <th className="text-center p-3 font-semibold text-slate-700">
                  Prix
                </th>
                <th className="text-center p-3 font-semibold text-slate-700">
                  Bonus
                </th>
                <th className="text-center p-3 font-semibold text-slate-700">
                  Cout reel
                </th>
              </tr>
            </thead>
            <tbody>
              {VEHICULES_POPULAIRES.map((v) => {
                const sim = calcBonusEcologique(
                  v.prix,
                  v.poids,
                  rfrParPart,
                  "electrique",
                  v.battEU ? "oui" : "non"
                );
                return (
                  <tr
                    key={v.nom}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="p-3 font-medium text-slate-700">
                      {v.nom}
                      {v.battEU && (
                        <span className="ml-2 text-xs text-green-600">
                          🇪🇺
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-center">{fmt(v.prix)} €</td>
                    <td className="p-3 text-center font-bold text-green-600">
                      -{fmt(sim.bonusTotal)} €
                    </td>
                    <td className="p-3 text-center font-bold text-slate-800">
                      {fmt(v.prix - sim.bonusTotal)} €
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
