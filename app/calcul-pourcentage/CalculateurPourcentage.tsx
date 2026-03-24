"use client";

import { useState } from "react";

type Mode = "pourcentage" | "augmentation" | "reduction" | "part";

const MODES: { id: Mode; label: string; desc: string }[] = [
  { id: "pourcentage", label: "X% de Y", desc: "Combien fait X% de Y ?" },
  {
    id: "augmentation",
    label: "Augmentation",
    desc: "Variation entre 2 valeurs",
  },
  { id: "reduction", label: "Reduction", desc: "Appliquer une remise" },
  { id: "part", label: "Part en %", desc: "X represente quel % de Y ?" },
];

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function CalculateurPourcentage() {
  const [mode, setMode] = useState<Mode>("pourcentage");

  // Mode pourcentage : X% de Y
  const [pourcent, setPourcent] = useState("20");
  const [valeur, setValeur] = useState("150");

  // Mode augmentation : ancien → nouveau
  const [ancien, setAncien] = useState("80");
  const [nouveau, setNouveau] = useState("100");

  // Mode reduction : prix - remise%
  const [prix, setPrix] = useState("80");
  const [remise, setRemise] = useState("25");

  // Mode part : partie sur total
  const [partie, setPartie] = useState("30");
  const [total, setTotal] = useState("120");

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Mode selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Type de calcul
          </label>
          <div className="grid grid-cols-2 gap-2">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  mode === m.id
                    ? "border-orange-500 bg-orange-50/50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-sm font-bold text-slate-800">
                  {m.label}
                </span>
                <span className="block text-xs text-slate-400 mt-0.5">
                  {m.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Champs dynamiques selon le mode */}
        {mode === "pourcentage" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Pourcentage
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={pourcent}
                  onChange={(e) => setPourcent(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  step="1"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  %
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                de
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={valeur}
                  onChange={(e) => setValeur(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  step="1"
                />
              </div>
            </div>
          </div>
        )}

        {mode === "augmentation" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Valeur initiale
              </label>
              <input
                type="number"
                value={ancien}
                onChange={(e) => setAncien(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                step="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Valeur finale
              </label>
              <input
                type="number"
                value={nouveau}
                onChange={(e) => setNouveau(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                step="1"
              />
            </div>
          </div>
        )}

        {mode === "reduction" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Prix initial
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-14 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  step="1"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  EUR
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Remise
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={remise}
                  onChange={(e) => setRemise(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  step="1"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  %
                </span>
              </div>
            </div>
          </div>
        )}

        {mode === "part" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Partie
              </label>
              <input
                type="number"
                value={partie}
                onChange={(e) => setPartie(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                step="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Total
              </label>
              <input
                type="number"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                step="1"
              />
            </div>
          </div>
        )}
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {mode === "pourcentage" && (
          <ResultatPourcentage
            pourcent={parseFloat(pourcent) || 0}
            valeur={parseFloat(valeur) || 0}
          />
        )}
        {mode === "augmentation" && (
          <ResultatAugmentation
            ancien={parseFloat(ancien) || 0}
            nouveau={parseFloat(nouveau) || 0}
          />
        )}
        {mode === "reduction" && (
          <ResultatReduction
            prix={parseFloat(prix) || 0}
            remise={parseFloat(remise) || 0}
          />
        )}
        {mode === "part" && (
          <ResultatPart
            partie={parseFloat(partie) || 0}
            total={parseFloat(total) || 0}
          />
        )}
      </div>
    </div>
  );
}

function ResultatPourcentage({
  pourcent,
  valeur,
}: {
  pourcent: number;
  valeur: number;
}) {
  const resultat = valeur * (pourcent / 100);
  return (
    <>
      <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-2xl p-6 shadow-lg shadow-orange-200/50">
        <p className="text-sm text-orange-100 mb-1">Resultat</p>
        <p className="text-4xl font-extrabold tracking-tight">
          {fmt(resultat)}
        </p>
        <p className="text-sm text-orange-200 mt-2">
          {fmt(pourcent)}% de {fmt(valeur)} = {fmt(resultat)}
        </p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <p className="text-xs font-medium text-slate-400 mb-3">Visualisation</p>
        <div className="flex h-3 rounded-full overflow-hidden bg-slate-100">
          <div
            className="bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500"
            style={{ width: `${Math.min(pourcent, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-2">
          <span className="text-orange-500 font-medium">{fmt(pourcent)}%</span>
          <span className="text-slate-400">{fmt(valeur)}</span>
        </div>
      </div>
    </>
  );
}

function ResultatAugmentation({
  ancien,
  nouveau,
}: {
  ancien: number;
  nouveau: number;
}) {
  const variation = ancien !== 0 ? ((nouveau - ancien) / ancien) * 100 : 0;
  const diff = nouveau - ancien;
  const isPositif = variation >= 0;

  return (
    <>
      <div
        className={`${
          isPositif
            ? "bg-gradient-to-br from-orange-500 to-amber-500"
            : "bg-gradient-to-br from-red-500 to-rose-500"
        } text-white rounded-2xl p-6 shadow-lg`}
      >
        <p className="text-sm opacity-80 mb-1">Variation</p>
        <p className="text-4xl font-extrabold tracking-tight">
          {isPositif ? "+" : ""}
          {fmt(variation)} %
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="flex justify-between text-sm">
          <span className="opacity-80">Difference</span>
          <span className="font-semibold">
            {isPositif ? "+" : ""}
            {fmt(diff)}
          </span>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400">Valeur initiale</span>
            <span className="text-lg font-bold text-slate-800">
              {fmt(ancien)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400">Valeur finale</span>
            <span className="text-lg font-bold text-slate-800">
              {fmt(nouveau)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function ResultatReduction({
  prix,
  remise,
}: {
  prix: number;
  remise: number;
}) {
  const montantRemise = prix * (remise / 100);
  const prixFinal = prix - montantRemise;

  return (
    <>
      <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-2xl p-6 shadow-lg shadow-orange-200/50">
        <p className="text-sm text-orange-100 mb-1">Prix apres remise</p>
        <p className="text-4xl font-extrabold tracking-tight">
          {fmt(prixFinal)} <span className="text-lg font-semibold">EUR</span>
        </p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400">Prix initial</span>
            <span className="text-lg font-bold text-slate-800">
              {fmt(prix)} EUR
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400">
              Remise ({fmt(remise)}%)
            </span>
            <span className="text-lg font-bold text-red-500">
              - {fmt(montantRemise)} EUR
            </span>
          </div>
          <div className="h-px bg-slate-100" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-600">
              Prix final
            </span>
            <span className="text-lg font-extrabold text-slate-800">
              {fmt(prixFinal)} EUR
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <p className="text-xs font-medium text-slate-400 mb-3">
          Vous economisez
        </p>
        <div className="flex h-3 rounded-full overflow-hidden bg-slate-100">
          <div
            className="bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500"
            style={{ width: `${100 - Math.min(remise, 100)}%` }}
          />
          <div
            className="bg-red-300 transition-all duration-500"
            style={{ width: `${Math.min(remise, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-2">
          <span className="text-orange-500 font-medium">
            Vous payez ({fmt(100 - remise)}%)
          </span>
          <span className="text-red-400 font-medium">
            Economie ({fmt(remise)}%)
          </span>
        </div>
      </div>
    </>
  );
}

function ResultatPart({
  partie,
  total,
}: {
  partie: number;
  total: number;
}) {
  const pourcentage = total !== 0 ? (partie / total) * 100 : 0;

  return (
    <>
      <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-2xl p-6 shadow-lg shadow-orange-200/50">
        <p className="text-sm text-orange-100 mb-1">Resultat</p>
        <p className="text-4xl font-extrabold tracking-tight">
          {fmt(pourcentage)} <span className="text-lg font-semibold">%</span>
        </p>
        <p className="text-sm text-orange-200 mt-2">
          {fmt(partie)} represente {fmt(pourcentage)}% de {fmt(total)}
        </p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <p className="text-xs font-medium text-slate-400 mb-3">Visualisation</p>
        <div className="flex h-3 rounded-full overflow-hidden bg-slate-100">
          <div
            className="bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500"
            style={{ width: `${Math.min(pourcentage, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-2">
          <span className="text-orange-500 font-medium">
            {fmt(partie)} / {fmt(total)}
          </span>
          <span className="text-slate-400">{fmt(pourcentage)}%</span>
        </div>
      </div>
    </>
  );
}
