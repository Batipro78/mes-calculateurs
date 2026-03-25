"use client";

import { useState } from "react";

const PLACEMENTS: { label: string; taux: number; desc: string }[] = [
  { label: "Livret A", taux: 2.4, desc: "Taux 2026 - Net d'impot" },
  { label: "LDDS", taux: 2.4, desc: "Taux 2026 - Net d'impot" },
  { label: "LEP", taux: 3.5, desc: "Taux 2026 - Sous conditions" },
  { label: "Assurance-vie (fonds euro)", taux: 2.5, desc: "Rendement moyen 2025" },
  { label: "PEL (depuis 2024)", taux: 2.25, desc: "Taux fixe a l'ouverture" },
  { label: "Personnalise", taux: 0, desc: "Saisir votre propre taux" },
];

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function SimulateurEpargne() {
  const [capitalInitial, setCapitalInitial] = useState("5000");
  const [versementMensuel, setVersementMensuel] = useState("200");
  const [duree, setDuree] = useState("10");
  const [placementIdx, setPlacementIdx] = useState(0);
  const [tauxCustom, setTauxCustom] = useState("3");

  const capital = parseFloat(capitalInitial) || 0;
  const mensuel = parseFloat(versementMensuel) || 0;
  const annees = parseInt(duree) || 0;
  const taux =
    placementIdx === PLACEMENTS.length - 1
      ? parseFloat(tauxCustom) || 0
      : PLACEMENTS[placementIdx].taux;

  const tauxMensuel = taux / 100 / 12;
  const nbMois = annees * 12;

  // Calcul interets composes
  let capitalFinal = capital;
  let totalVersements = capital;
  const evolutionAnnuelle: { annee: number; capital: number; versements: number; interets: number }[] = [];

  let capitalAnneeDebut = capital;
  let versementsAnnee = 0;

  for (let m = 1; m <= nbMois; m++) {
    capitalFinal = capitalFinal * (1 + tauxMensuel) + mensuel;
    totalVersements += mensuel;
    versementsAnnee += mensuel;

    if (m % 12 === 0) {
      const interetsCumules = capitalFinal - totalVersements;
      evolutionAnnuelle.push({
        annee: m / 12,
        capital: capitalFinal,
        versements: totalVersements,
        interets: interetsCumules,
      });
      capitalAnneeDebut = capitalFinal;
      versementsAnnee = 0;
    }
  }

  const totalInterets = capitalFinal - totalVersements;
  const rendementTotal = totalVersements > 0 ? (totalInterets / totalVersements) * 100 : 0;

  // Pour la barre de progression
  const partCapital = capitalFinal > 0 ? (totalVersements / capitalFinal) * 100 : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Capital initial
            </label>
            <div className="relative">
              <input
                type="number"
                value={capitalInitial}
                onChange={(e) => setCapitalInitial(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-14 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                min="0"
                step="100"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                EUR
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Versement mensuel
            </label>
            <div className="relative">
              <input
                type="number"
                value={versementMensuel}
                onChange={(e) => setVersementMensuel(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-16 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                min="0"
                step="10"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                EUR/m
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Duree (annees) : {duree} an{parseInt(duree) > 1 ? "s" : ""}
            </label>
            <input
              type="range"
              value={duree}
              onChange={(e) => setDuree(e.target.value)}
              min="1"
              max="40"
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1 an</span>
              <span>10</span>
              <span>20</span>
              <span>30</span>
              <span>40 ans</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Type de placement
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PLACEMENTS.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => setPlacementIdx(i)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    placementIdx === i
                      ? "border-emerald-500 bg-emerald-50/50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="text-sm font-bold text-slate-800">
                    {p.label}
                    {i < PLACEMENTS.length - 1 && (
                      <span className="text-emerald-600 ml-1">
                        {p.taux}%
                      </span>
                    )}
                  </span>
                  <span className="block text-xs text-slate-400">{p.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {placementIdx === PLACEMENTS.length - 1 && (
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Taux annuel personnalise
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={tauxCustom}
                  onChange={(e) => setTauxCustom(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  step="0.1"
                  min="0"
                  max="20"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  %
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-2xl p-6 shadow-lg shadow-emerald-200/50">
          <p className="text-sm text-emerald-100 mb-1">
            Capital apres {annees} an{annees > 1 ? "s" : ""}
          </p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(capitalFinal)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
          <p className="text-sm text-emerald-200 mt-2">
            dont {fmt(totalInterets)} EUR d&apos;interets gagnes
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-4">
            Repartition
          </p>
          <div className="flex h-4 rounded-full overflow-hidden bg-slate-100 mb-3">
            <div
              className="bg-emerald-200 transition-all duration-500"
              style={{ width: `${partCapital}%` }}
            />
            <div
              className="bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-500"
              style={{ width: `${100 - partCapital}%` }}
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-200" />
              Versements : {fmt(totalVersements)} EUR
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Interets : {fmt(totalInterets)} EUR
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-4">Resume</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Capital initial</span>
              <span className="font-bold text-slate-800">{fmt(capital)} EUR</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Total verse</span>
              <span className="font-bold text-slate-800">
                {fmt(totalVersements)} EUR
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Interets cumules</span>
              <span className="font-bold text-emerald-600">
                + {fmt(totalInterets)} EUR
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Taux applique</span>
              <span className="font-bold text-slate-800">{taux}% / an</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Rendement total</span>
              <span className="font-bold text-emerald-600">
                {fmt(rendementTotal)}%
              </span>
            </div>
          </div>
        </div>

        {/* Tableau evolution */}
        {evolutionAnnuelle.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-xs font-medium text-slate-400 mb-3">
              Evolution annuelle
            </p>
            <div className="max-h-60 overflow-y-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200 sticky top-0 bg-white">
                    <th className="text-left pb-2 text-slate-500 font-medium">
                      Annee
                    </th>
                    <th className="text-right pb-2 text-slate-500 font-medium">
                      Capital
                    </th>
                    <th className="text-right pb-2 text-slate-500 font-medium">
                      Interets
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {evolutionAnnuelle.map((row) => (
                    <tr
                      key={row.annee}
                      className="border-b border-slate-50"
                    >
                      <td className="py-1.5 text-slate-600">{row.annee}</td>
                      <td className="py-1.5 text-right font-semibold text-slate-800">
                        {fmt(row.capital)}
                      </td>
                      <td className="py-1.5 text-right text-emerald-600 font-medium">
                        +{fmt(row.interets)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
