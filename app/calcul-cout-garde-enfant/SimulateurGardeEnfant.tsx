"use client";

import { useState } from "react";
import {
  calcGardeEnfant,
  MODES,
  MODE_LABELS,
  MODE_EMOJIS,
  type ModeGarde,
} from "./calcGardeEnfant";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function SimulateurGardeEnfant() {
  const [revenuAnnuel, setRevenuAnnuel] = useState(36000);
  const [nbEnfants, setNbEnfants] = useState(1);
  const [nbEnfantsGardes, setNbEnfantsGardes] = useState(1);
  const [heuresParSemaine, setHeuresParSemaine] = useState(40);
  const [ageEnfant, setAgeEnfant] = useState(1);

  // Calculer pour tous les modes
  const resultats = MODES.map((mode) =>
    calcGardeEnfant(mode, revenuAnnuel, nbEnfants, nbEnfantsGardes, heuresParSemaine, ageEnfant)
  );

  const moinsCher = resultats.reduce((a, b) => (a.coutMensuelNet < b.coutMensuelNet ? a : b));

  return (
    <div className="space-y-8">
      {/* Formulaire */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Votre situation</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Revenus annuels du foyer
            </label>
            <div className="relative">
              <input
                type="number"
                value={revenuAnnuel}
                onChange={(e) => setRevenuAnnuel(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-lg border border-slate-300 p-2.5 pr-12 text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€/an</span>
            </div>
            <input
              type="range"
              min={10000}
              max={120000}
              step={1000}
              value={revenuAnnuel}
              onChange={(e) => setRevenuAnnuel(Number(e.target.value))}
              className="w-full mt-2 accent-pink-500"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>10 000 €</span>
              <span>120 000 €</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Enfants a charge (total)
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    setNbEnfants(n);
                    if (nbEnfantsGardes > n) setNbEnfantsGardes(n);
                  }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    nbEnfants === n
                      ? "bg-pink-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Enfants a faire garder
            </label>
            <div className="flex gap-2">
              {Array.from({ length: nbEnfants }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setNbEnfantsGardes(n)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    nbEnfantsGardes === n
                      ? "bg-pink-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Heures de garde par semaine
            </label>
            <div className="relative">
              <input
                type="number"
                value={heuresParSemaine}
                onChange={(e) => setHeuresParSemaine(Math.max(5, Math.min(50, Number(e.target.value))))}
                className="w-full rounded-lg border border-slate-300 p-2.5 pr-8 text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">h</span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={1}
              value={heuresParSemaine}
              onChange={(e) => setHeuresParSemaine(Number(e.target.value))}
              className="w-full mt-2 accent-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Age de l&apos;enfant
            </label>
            <div className="flex gap-2">
              {[
                { v: 0, l: "< 1 an" },
                { v: 1, l: "1-2 ans" },
                { v: 3, l: "3-4 ans" },
                { v: 5, l: "5 ans" },
              ].map((a) => (
                <button
                  key={a.v}
                  onClick={() => setAgeEnfant(a.v)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    ageEnfant === a.v
                      ? "bg-pink-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {a.l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comparaison des 4 modes */}
      <div className="grid md:grid-cols-2 gap-4">
        {resultats.map((r) => (
          <div
            key={r.mode}
            className={`rounded-2xl border-2 p-5 transition-all ${
              r.mode === moinsCher.mode
                ? "border-pink-400 bg-gradient-to-br from-pink-50 to-rose-50 shadow-md"
                : "border-slate-200 bg-white"
            }`}
          >
            {r.mode === moinsCher.mode && (
              <div className="inline-block bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                Le moins cher
              </div>
            )}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{MODE_EMOJIS[r.mode]}</span>
              <div>
                <div className="font-bold text-slate-800">{MODE_LABELS[r.mode]}</div>
                <div className="text-xs text-slate-500">{fmt(r.tarifHoraire)} €/h · {r.heuresMois}h/mois</div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Cout brut mensuel</span>
                <span className="font-medium">{fmt(r.coutMensuelBrut)} €</span>
              </div>
              {r.cmgMensuel > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>- CMG (aide CAF)</span>
                  <span className="font-medium">-{fmt(r.cmgMensuel)} €</span>
                </div>
              )}
              {r.creditImpotAnnuel > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>- Credit impot 50%</span>
                  <span className="font-medium">-{fmt(r.creditImpotAnnuel / 12)} €/mois</span>
                </div>
              )}
              <div className="border-t border-slate-200 pt-2 flex justify-between">
                <span className="font-bold text-slate-800">Cout net reel</span>
                <span className="font-black text-lg text-pink-700">{fmt(r.coutMensuelNet)} €/mois</span>
              </div>
              <div className="text-xs text-slate-400 text-right">
                soit {fmtInt(r.coutAnnuelNet)} €/an
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tableau recapitulatif */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Recapitulatif comparatif</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-3 font-semibold text-slate-700">Mode de garde</th>
                <th className="text-center p-3 font-semibold text-slate-700">Tarif/h</th>
                <th className="text-center p-3 font-semibold text-slate-700">Brut/mois</th>
                <th className="text-center p-3 font-semibold text-slate-700">CMG</th>
                <th className="text-center p-3 font-semibold text-slate-700">Credit impot</th>
                <th className="text-center p-3 font-semibold text-slate-700">Net/mois</th>
                <th className="text-center p-3 font-semibold text-slate-700">Net/an</th>
              </tr>
            </thead>
            <tbody>
              {resultats.map((r) => (
                <tr
                  key={r.mode}
                  className={`border-b border-slate-100 ${r.mode === moinsCher.mode ? "bg-pink-50 font-bold" : ""}`}
                >
                  <td className="p-3 text-slate-700">
                    {MODE_EMOJIS[r.mode]} {MODE_LABELS[r.mode]}
                  </td>
                  <td className="p-3 text-center">{fmt(r.tarifHoraire)} €</td>
                  <td className="p-3 text-center">{fmt(r.coutMensuelBrut)} €</td>
                  <td className="p-3 text-center text-green-600">
                    {r.cmgMensuel > 0 ? `-${fmt(r.cmgMensuel)} €` : "—"}
                  </td>
                  <td className="p-3 text-center text-green-600">
                    {r.creditImpotAnnuel > 0 ? `-${fmtInt(r.creditImpotAnnuel)} €/an` : "—"}
                  </td>
                  <td className="p-3 text-center font-bold text-pink-700">{fmt(r.coutMensuelNet)} €</td>
                  <td className="p-3 text-center">{fmtInt(r.coutAnnuelNet)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Impact sur le budget */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Impact sur votre budget</h2>
        <div className="space-y-3">
          {resultats.map((r) => {
            const pctRevenu = r.revenuMensuel > 0 ? (r.coutMensuelNet / r.revenuMensuel) * 100 : 0;
            return (
              <div key={r.mode}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">
                    {MODE_EMOJIS[r.mode]} {MODE_LABELS[r.mode]}
                  </span>
                  <span className={`font-bold ${pctRevenu > 20 ? "text-red-600" : pctRevenu > 10 ? "text-orange-600" : "text-green-600"}`}>
                    {pctRevenu.toFixed(1)}% du revenu
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full transition-all ${
                      pctRevenu > 20 ? "bg-red-500" : pctRevenu > 10 ? "bg-orange-500" : "bg-green-500"
                    }`}
                    style={{ width: `${Math.min(100, pctRevenu * 2)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
