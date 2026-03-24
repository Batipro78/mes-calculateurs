"use client";

import { useState } from "react";

type Statut = "non-cadre" | "cadre" | "public";
type Direction = "brut-vers-net" | "net-vers-brut";
type Periode = "mensuel" | "annuel";

const TAUX_COTISATIONS: Record<Statut, number> = {
  "non-cadre": 0.22,
  cadre: 0.25,
  public: 0.15,
};

const STATUT_LABELS: Record<Statut, string> = {
  "non-cadre": "Non-cadre",
  cadre: "Cadre",
  public: "Fonction publique",
};

const STATUT_DESC: Record<Statut, string> = {
  "non-cadre": "Secteur prive",
  cadre: "Secteur prive",
  public: "Etat / Territorial",
};

function calculerNet(brut: number, statut: Statut): number {
  return brut * (1 - TAUX_COTISATIONS[statut]);
}

function calculerBrut(net: number, statut: Statut): number {
  return net / (1 - TAUX_COTISATIONS[statut]);
}

function fmt(montant: number): string {
  return montant.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function CalculateurSalaire() {
  const [montant, setMontant] = useState<string>("2500");
  const [statut, setStatut] = useState<Statut>("non-cadre");
  const [direction, setDirection] = useState<Direction>("brut-vers-net");
  const [periode, setPeriode] = useState<Periode>("mensuel");

  const montantNum = parseFloat(montant) || 0;
  const facteurPeriode = periode === "annuel" ? 12 : 1;

  let brutMensuel: number;
  let netMensuel: number;

  if (direction === "brut-vers-net") {
    brutMensuel = montantNum / facteurPeriode;
    netMensuel = calculerNet(brutMensuel, statut);
  } else {
    netMensuel = montantNum / facteurPeriode;
    brutMensuel = calculerBrut(netMensuel, statut);
  }

  const brutAnnuel = brutMensuel * 12;
  const netAnnuel = netMensuel * 12;
  const cotisationsMensuel = brutMensuel - netMensuel;
  const taux = TAUX_COTISATIONS[statut] * 100;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Direction toggle */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Je connais mon salaire :
          </label>
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setDirection("brut-vers-net")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                direction === "brut-vers-net"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Brut → Net
            </button>
            <button
              onClick={() => setDirection("net-vers-brut")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                direction === "net-vers-brut"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Net → Brut
            </button>
          </div>
        </div>

        {/* Montant */}
        <div className="mb-6">
          <label
            htmlFor="montant"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Montant {direction === "brut-vers-net" ? "brut" : "net"}
          </label>
          <div className="relative">
            <input
              id="montant"
              type="number"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              min="0"
              step="100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
        </div>

        {/* Periode */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Periode
          </label>
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setPeriode("mensuel")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                periode === "mensuel"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setPeriode("annuel")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                periode === "annuel"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Annuel
            </button>
          </div>
        </div>

        {/* Statut */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Statut
          </label>
          <div className="space-y-2">
            {(Object.keys(TAUX_COTISATIONS) as Statut[]).map((s) => (
              <label
                key={s}
                className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  statut === s
                    ? "border-blue-500 bg-blue-50/50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      statut === s ? "border-blue-500" : "border-slate-300"
                    }`}
                  >
                    {statut === s && (
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700">
                      {STATUT_LABELS[s]}
                    </span>
                    <span className="text-xs text-slate-400 ml-2">
                      {STATUT_DESC[s]}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-500">
                  {TAUX_COTISATIONS[s] * 100}%
                </span>
                <input
                  type="radio"
                  name="statut"
                  value={s}
                  checked={statut === s}
                  onChange={() => setStatut(s)}
                  className="sr-only"
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg shadow-blue-200/50">
          <p className="text-sm text-blue-100 mb-1">Salaire net mensuel</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(netMensuel)} <span className="text-lg font-semibold">EUR</span>
          </p>
          <div className="h-px bg-white/20 my-4" />
          <div className="flex justify-between text-sm">
            <span className="text-blue-200">Net annuel</span>
            <span className="font-semibold">{fmt(netAnnuel)} EUR</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Salaire brut mensuel</p>
          <p className="text-2xl font-extrabold text-slate-800">
            {fmt(brutMensuel)} <span className="text-sm font-semibold text-slate-400">EUR</span>
          </p>
          <div className="h-px bg-slate-100 my-3" />
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Brut annuel</span>
            <span className="font-semibold text-slate-600">
              {fmt(brutAnnuel)} EUR
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">
            Cotisations ({taux}%)
          </p>
          <p className="text-xl font-extrabold text-red-500">
            - {fmt(cotisationsMensuel)} <span className="text-sm font-semibold">EUR / mois</span>
          </p>
          <div className="h-px bg-slate-100 my-3" />
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Cotisations annuelles</span>
            <span className="font-semibold text-red-400">
              - {fmt(cotisationsMensuel * 12)} EUR
            </span>
          </div>
        </div>

        {/* Barre visuelle */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Repartition du salaire brut
          </p>
          <div className="flex h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${100 - taux}%` }}
            />
            <div
              className="bg-red-300 transition-all duration-500"
              style={{ width: `${taux}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-2">
            <span className="text-blue-600 font-medium">
              Net ({100 - taux}%)
            </span>
            <span className="text-red-400 font-medium">
              Cotisations ({taux}%)
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Taux indicatifs pour 2026. Le montant exact depend de votre convention
          collective et situation personnelle.
        </div>
      </div>
    </div>
  );
}
