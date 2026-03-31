"use client";

import { useState } from "react";
import { calcPensionAlimentaire, getTaux, MINIMUM_VITAL, GARDE_LABELS, type TypeGarde } from "./calcPensionAlimentaire";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

export default function SimulateurPensionAlimentaire() {
  const [revenu, setRevenu] = useState("2500");
  const [enfants, setEnfants] = useState("1");
  const [garde, setGarde] = useState<TypeGarde>("classique");

  const revenuNum = parseFloat(revenu) || 0;
  const enfantsNum = Math.max(1, Math.min(6, parseInt(enfants) || 1));

  const r = calcPensionAlimentaire(revenuNum, enfantsNum, garde);

  const revenusBoutons = [1500, 2000, 2500, 3000, 3500, 4000, 5000];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Formulaire */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-6">Informations du debiteur</h2>

        {/* Revenu */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Revenu net mensuel (EUR)
          </label>
          <input
            type="number"
            value={revenu}
            onChange={(e) => setRevenu(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {revenusBoutons.map((m) => (
              <button
                key={m}
                onClick={() => setRevenu(String(m))}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  revenuNum === m
                    ? "bg-indigo-100 text-indigo-700 ring-1 ring-indigo-300"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {fmtInt(m)} EUR
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Minimum vital deduit : {fmtInt(MINIMUM_VITAL)} EUR (RSA socle)
          </p>
        </div>

        {/* Nombre d'enfants */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nombre d&apos;enfants
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                onClick={() => setEnfants(String(n))}
                className={`w-11 h-11 rounded-xl text-sm font-bold transition-all ${
                  enfantsNum === n
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Type de garde */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Type de garde
          </label>
          <div className="space-y-2">
            {(["classique", "alternee", "reduit"] as TypeGarde[]).map((g) => (
              <button
                key={g}
                onClick={() => setGarde(g)}
                className={`w-full text-left py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                  garde === g
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>{GARDE_LABELS[g]}</span>
                <span className="ml-2 opacity-70">
                  ({(getTaux(enfantsNum, g) * 100).toFixed(1)}% par enfant)
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bareme complet */}
        <div className="bg-slate-50 rounded-xl p-4 mt-4">
          <h3 className="text-sm font-bold text-slate-700 mb-3">Bareme complet (% par enfant)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-1.5 text-slate-500">Enfants</th>
                  <th className="text-center py-1.5 text-slate-500">Reduit</th>
                  <th className="text-center py-1.5 text-slate-500">Classique</th>
                  <th className="text-center py-1.5 text-slate-500">Alternee</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <tr
                    key={n}
                    className={`border-b border-slate-100 ${enfantsNum === n ? "bg-indigo-50 font-bold" : ""}`}
                  >
                    <td className="py-1.5">{n}</td>
                    <td className={`py-1.5 text-center ${enfantsNum === n && garde === "reduit" ? "text-indigo-700" : ""}`}>
                      {(getTaux(n, "reduit") * 100).toFixed(1)}%
                    </td>
                    <td className={`py-1.5 text-center ${enfantsNum === n && garde === "classique" ? "text-indigo-700" : ""}`}>
                      {(getTaux(n, "classique") * 100).toFixed(1)}%
                    </td>
                    <td className={`py-1.5 text-center ${enfantsNum === n && garde === "alternee" ? "text-indigo-700" : ""}`}>
                      {(getTaux(n, "alternee") * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Resultats */}
      <div className="space-y-4">
        {/* Resultat principal */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-center text-white">
          <p className="text-sm font-medium opacity-90 mb-1">Pension alimentaire estimee</p>
          <p className="text-5xl font-black mb-1">
            {fmt(r.pensionTotale)}
            <span className="text-2xl font-bold opacity-80 ml-1">EUR/mois</span>
          </p>
          <p className="text-sm opacity-80">
            soit {fmt(r.pensionParEnfant)} EUR par enfant x {enfantsNum} enfant{enfantsNum > 1 ? "s" : ""}
          </p>
        </div>

        {/* Detail */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Detail du calcul</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">Revenu net mensuel</span>
              <span className="font-bold text-slate-800">{fmt(r.revenuNet)} EUR</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">Minimum vital (RSA)</span>
              <span className="font-bold text-red-600">- {fmt(r.minimumVital)} EUR</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100 bg-slate-50 -mx-6 px-6">
              <span className="text-sm font-semibold text-slate-700">Revenu disponible</span>
              <span className="font-bold text-slate-800">{fmt(r.revenuDisponible)} EUR</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">
                Taux applique ({GARDE_LABELS[garde]})
              </span>
              <span className="font-bold text-slate-800">{(r.taux * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">Pension par enfant</span>
              <span className="font-bold text-slate-800">{fmt(r.pensionParEnfant)} EUR</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">Nombre d&apos;enfants</span>
              <span className="font-bold text-slate-800">x {enfantsNum}</span>
            </div>
            <div className="flex justify-between items-center py-2 bg-indigo-50 -mx-6 px-6 rounded-b-xl">
              <span className="text-sm font-bold text-indigo-800">Pension totale</span>
              <span className="text-xl font-black text-indigo-700">{fmt(r.pensionTotale)} EUR</span>
            </div>
          </div>
        </div>

        {/* Comparaison par revenu */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Selon le revenu</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 text-slate-500">Revenu</th>
                <th className="text-right py-2 text-slate-500">Par enfant</th>
                <th className="text-right py-2 text-slate-500">Total</th>
              </tr>
            </thead>
            <tbody>
              {revenusBoutons.map((rev) => {
                const sim = calcPensionAlimentaire(rev, enfantsNum, garde);
                return (
                  <tr key={rev} className={`border-b border-slate-50 ${revenuNum === rev ? "bg-indigo-50" : ""}`}>
                    <td className="py-2 font-medium">{fmtInt(rev)} EUR</td>
                    <td className="py-2 text-right">{fmt(sim.pensionParEnfant)} EUR</td>
                    <td className="py-2 text-right font-bold text-indigo-600">{fmt(sim.pensionTotale)} EUR</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Comparaison par type de garde */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Selon le type de garde</h3>
          <div className="space-y-3">
            {(["reduit", "classique", "alternee"] as TypeGarde[]).map((g) => {
              const sim = calcPensionAlimentaire(revenuNum, enfantsNum, g);
              return (
                <div
                  key={g}
                  className={`flex justify-between items-center p-3 rounded-xl ${
                    garde === g ? "bg-indigo-50 ring-1 ring-indigo-200" : "bg-slate-50"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-slate-800">{GARDE_LABELS[g]}</p>
                    <p className="text-xs text-slate-500">{(getTaux(enfantsNum, g) * 100).toFixed(1)}% par enfant</p>
                  </div>
                  <p className="text-lg font-black text-indigo-600">{fmt(sim.pensionTotale)} EUR</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Avertissement */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-800">
            <strong>Estimation indicative</strong> — Ce calcul utilise la table de reference du Ministere de la Justice.
            Le montant reel est fixe par le juge aux affaires familiales, qui peut s&apos;en ecarter selon les circonstances
            (besoins de l&apos;enfant, charges du debiteur, revenus du creancier).
          </p>
        </div>
      </div>
    </div>
  );
}
