"use client";

import { useState } from "react";
import {
  calcCreditConso,
  TAUX_MOYENS,
  DUREES,
  PROJET_LABELS,
  PROJET_EMOJIS,
  type TypeProjet,
} from "./calcCreditConso";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const PROJETS_PRESETS: { type: TypeProjet; montant: number; duree: number }[] = [
  { type: "auto", montant: 15000, duree: 48 },
  { type: "travaux", montant: 20000, duree: 60 },
  { type: "voyage", montant: 5000, duree: 24 },
  { type: "electromenager", montant: 3000, duree: 24 },
  { type: "mariage", montant: 10000, duree: 36 },
  { type: "tresorerie", montant: 5000, duree: 36 },
  { type: "energie", montant: 25000, duree: 84 },
];

export default function SimulateurCreditConso() {
  const [capital, setCapital] = useState(15000);
  const [dureeMois, setDureeMois] = useState(48);
  const [tauxAnnuel, setTauxAnnuel] = useState(TAUX_MOYENS[48]);
  const [revenuMensuel, setRevenuMensuel] = useState(2500);
  const [tauxAssurance, setTauxAssurance] = useState(0.36);
  const [tauxPerso, setTauxPerso] = useState(false);
  const [showAmortissement, setShowAmortissement] = useState(false);

  const resultat = calcCreditConso(capital, dureeMois, tauxAnnuel, revenuMensuel, tauxAssurance);

  function appliquerPreset(p: (typeof PROJETS_PRESETS)[number]) {
    setCapital(p.montant);
    setDureeMois(p.duree);
    if (!tauxPerso) setTauxAnnuel(TAUX_MOYENS[p.duree] || 4.5);
  }

  function changerDuree(d: number) {
    setDureeMois(d);
    if (!tauxPerso) setTauxAnnuel(TAUX_MOYENS[d] || 4.5);
  }

  return (
    <div className="space-y-8">
      {/* Presets projets */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Type de projet</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PROJETS_PRESETS.map((p) => (
            <button
              key={p.type}
              onClick={() => appliquerPreset(p)}
              className={`text-left p-3 rounded-xl border-2 transition-all text-sm ${
                capital === p.montant && dureeMois === p.duree
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 hover:border-blue-300 bg-white"
              }`}
            >
              <div className="text-xl mb-1">{PROJET_EMOJIS[p.type]}</div>
              <div className="font-bold text-slate-800">{PROJET_LABELS[p.type]}</div>
              <div className="text-slate-500 text-xs">
                {fmtInt(p.montant)} € · {p.duree} mois
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Parametres du credit</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Montant emprunte
            </label>
            <div className="relative">
              <input
                type="number"
                value={capital}
                onChange={(e) => setCapital(Math.max(200, Math.min(75000, Number(e.target.value))))}
                className="w-full rounded-lg border border-slate-300 p-2.5 pr-8 text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€</span>
            </div>
            <input
              type="range"
              min={500}
              max={75000}
              step={500}
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
              className="w-full mt-2 accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>500 €</span>
              <span>75 000 €</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Duree (mois)
            </label>
            <div className="flex flex-wrap gap-2">
              {DUREES.map((d) => (
                <button
                  key={d}
                  onClick={() => changerDuree(d)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    dureeMois === d
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {d} mois
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Taux TAEG annuel (%)
              <button
                onClick={() => {
                  setTauxPerso(!tauxPerso);
                  if (tauxPerso) setTauxAnnuel(TAUX_MOYENS[dureeMois] || 4.5);
                }}
                className="ml-2 text-xs text-blue-600 hover:underline"
              >
                {tauxPerso ? "Utiliser taux moyen" : "Personnaliser"}
              </button>
            </label>
            <div className="relative">
              <input
                type="number"
                step={0.1}
                value={tauxAnnuel}
                onChange={(e) => {
                  setTauxPerso(true);
                  setTauxAnnuel(Math.max(0, Number(e.target.value)));
                }}
                className="w-full rounded-lg border border-slate-300 p-2.5 pr-8 text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
            </div>
            {!tauxPerso && (
              <p className="text-xs text-slate-400 mt-1">
                Taux moyen constate Q1 2026 pour {dureeMois} mois
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Revenu net mensuel
            </label>
            <div className="relative">
              <input
                type="number"
                value={revenuMensuel}
                onChange={(e) => setRevenuMensuel(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-lg border border-slate-300 p-2.5 pr-8 text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Pour calculer votre taux d&apos;endettement</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Assurance emprunteur (%/an du capital)
            </label>
            <div className="relative">
              <input
                type="number"
                step={0.01}
                value={tauxAssurance}
                onChange={(e) => setTauxAssurance(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-lg border border-slate-300 p-2.5 pr-8 text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Moyenne : 0,36%. Mettre 0 si pas d&apos;assurance</p>
          </div>
        </div>
      </div>

      {/* Resultat */}
      <div className={`rounded-2xl border-2 shadow-sm p-6 ${
        resultat.depasseEndettement || resultat.depasseUsure
          ? "border-orange-300 bg-gradient-to-br from-orange-50 to-amber-50"
          : "border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50"
      }`}>
        <div className="text-center mb-6">
          <div className="text-sm font-medium text-blue-700 mb-1">Votre mensualite</div>
          <div className="text-5xl font-black text-blue-700">{fmt(resultat.mensualite)} €</div>
          <div className="text-sm text-blue-600 mt-1">
            pendant {dureeMois} mois ({Math.floor(dureeMois / 12)} an{Math.floor(dureeMois / 12) > 1 ? "s" : ""}{dureeMois % 12 > 0 ? ` et ${dureeMois % 12} mois` : ""})
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500 mb-1">Capital emprunte</div>
            <div className="text-xl font-bold text-slate-800">{fmtInt(capital)} €</div>
          </div>
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500 mb-1">Cout des interets</div>
            <div className="text-xl font-bold text-red-600">{fmt(resultat.coutInterets)} €</div>
          </div>
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500 mb-1">Cout assurance</div>
            <div className="text-xl font-bold text-orange-600">{fmt(resultat.coutAssurance)} €</div>
          </div>
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500 mb-1">Cout total du credit</div>
            <div className="text-xl font-bold text-red-700">{fmt(resultat.coutTotal)} €</div>
          </div>
        </div>

        {/* Alertes */}
        {resultat.depasseEndettement && (
          <div className="bg-orange-100 border border-orange-300 rounded-xl p-4 mb-4">
            <div className="font-bold text-orange-800">⚠️ Taux d&apos;endettement eleve : {resultat.tauxEndettement}%</div>
            <p className="text-sm text-orange-700">
              Votre taux d&apos;endettement depasse 35%. Les banques refusent generalement les credits au-dela de ce seuil.
            </p>
          </div>
        )}

        {/* Jauge endettement */}
        <div className="bg-white/70 rounded-xl p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-slate-700">Taux d&apos;endettement</span>
            <span className={`font-bold ${resultat.tauxEndettement > 35 ? "text-red-600" : resultat.tauxEndettement > 25 ? "text-orange-600" : "text-green-600"}`}>
              {resultat.tauxEndettement}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 relative">
            <div
              className={`h-3 rounded-full transition-all ${
                resultat.tauxEndettement > 35 ? "bg-red-500" : resultat.tauxEndettement > 25 ? "bg-orange-500" : "bg-green-500"
              }`}
              style={{ width: `${Math.min(100, resultat.tauxEndettement * 2)}%` }}
            />
            <div className="absolute top-0 left-[70%] w-0.5 h-3 bg-red-400" title="Seuil 35%" />
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0%</span>
            <span className="text-red-400">35% max</span>
            <span>50%</span>
          </div>
        </div>
      </div>

      {/* Comparaison par duree */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Comparaison par duree ({fmtInt(capital)} €)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-3 font-semibold text-slate-700">Duree</th>
                <th className="text-center p-3 font-semibold text-slate-700">Taux</th>
                <th className="text-center p-3 font-semibold text-slate-700">Mensualite</th>
                <th className="text-center p-3 font-semibold text-slate-700">Cout total</th>
                <th className="text-center p-3 font-semibold text-slate-700">Endettement</th>
              </tr>
            </thead>
            <tbody>
              {DUREES.map((d) => {
                const sim = calcCreditConso(capital, d, TAUX_MOYENS[d], revenuMensuel, tauxAssurance);
                return (
                  <tr key={d} className={`border-b border-slate-100 ${d === dureeMois ? "bg-blue-50 font-bold" : ""}`}>
                    <td className="p-3 text-slate-700">{d} mois ({Math.floor(d / 12)} an{Math.floor(d / 12) > 1 ? "s" : ""})</td>
                    <td className="p-3 text-center">{TAUX_MOYENS[d]}%</td>
                    <td className="p-3 text-center">{fmt(sim.mensualite)} €</td>
                    <td className="p-3 text-center text-red-600">{fmt(sim.coutTotal)} €</td>
                    <td className={`p-3 text-center ${sim.tauxEndettement > 35 ? "text-red-600 font-bold" : "text-green-600"}`}>
                      {sim.tauxEndettement}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tableau amortissement */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">Tableau d&apos;amortissement</h2>
          <button
            onClick={() => setShowAmortissement(!showAmortissement)}
            className="text-sm text-blue-600 hover:underline"
          >
            {showAmortissement ? "Masquer" : "Afficher"}
          </button>
        </div>
        {showAmortissement && (
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="sticky top-0 bg-white">
                <tr className="bg-slate-50">
                  <th className="text-left p-2 font-semibold text-slate-700">Mois</th>
                  <th className="text-center p-2 font-semibold text-slate-700">Mensualite</th>
                  <th className="text-center p-2 font-semibold text-slate-700">Capital</th>
                  <th className="text-center p-2 font-semibold text-slate-700">Interets</th>
                  <th className="text-center p-2 font-semibold text-slate-700">Assurance</th>
                  <th className="text-center p-2 font-semibold text-slate-700">Reste du</th>
                </tr>
              </thead>
              <tbody>
                {resultat.tableauAmortissement.map((l) => (
                  <tr key={l.mois} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="p-2 text-slate-700">{l.mois}</td>
                    <td className="p-2 text-center">{fmt(l.mensualite)} €</td>
                    <td className="p-2 text-center text-blue-600">{fmt(l.capital)} €</td>
                    <td className="p-2 text-center text-red-500">{fmt(l.interets)} €</td>
                    <td className="p-2 text-center text-orange-500">{fmt(l.assurance)} €</td>
                    <td className="p-2 text-center font-medium">{fmt(l.resteDu)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
