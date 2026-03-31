"use client";

import { useState } from "react";
import {
  calcCapaciteEmprunt,
  calcComparatifDurees,
  TAUX_MOYENS,
  DUREES,
  DUREE_LABELS,
  TAUX_ASSURANCE_DEFAUT,
  TAUX_ENDETTEMENT_MAX,
} from "./empruntCalc";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR");
}

export default function CalculCapaciteEmprunt() {
  const [revenu1, setRevenu1] = useState(2500);
  const [revenu2, setRevenu2] = useState(0);
  const [charges, setCharges] = useState(0);
  const [apport, setApport] = useState(20000);
  const [duree, setDuree] = useState<number>(20);
  const [taux, setTaux] = useState(TAUX_MOYENS[20]);
  const [tauxAssurance, setTauxAssurance] = useState(TAUX_ASSURANCE_DEFAUT);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const resultat = calcCapaciteEmprunt(revenu1, revenu2, charges, apport, duree, taux, tauxAssurance);
  const comparatif = calcComparatifDurees(revenu1, revenu2, charges, apport, tauxAssurance);

  const handleDureeChange = (d: number) => {
    setDuree(d);
    setTaux(TAUX_MOYENS[d]);
  };

  const endettementColor =
    resultat.tauxEndettement <= 25
      ? "text-green-600"
      : resultat.tauxEndettement <= 35
        ? "text-orange-500"
        : "text-red-600";

  const endettementBg =
    resultat.tauxEndettement <= 25
      ? "bg-green-500"
      : resultat.tauxEndettement <= 35
        ? "bg-orange-500"
        : "bg-red-500";

  return (
    <div className="space-y-8">
      {/* Formulaire */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-6">Vos informations</h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Revenu emprunteur 1 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Revenus nets mensuels (emprunteur 1)
            </label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={50000}
                step={100}
                value={revenu1}
                onChange={(e) => setRevenu1(Number(e.target.value))}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 font-semibold"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€/mois</span>
            </div>
            <input
              type="range"
              min={0}
              max={10000}
              step={100}
              value={revenu1}
              onChange={(e) => setRevenu1(Number(e.target.value))}
              className="w-full mt-2 accent-blue-600"
            />
          </div>

          {/* Revenu emprunteur 2 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Revenus nets mensuels (co-emprunteur)
            </label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={50000}
                step={100}
                value={revenu2}
                onChange={(e) => setRevenu2(Number(e.target.value))}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 font-semibold"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€/mois</span>
            </div>
            <input
              type="range"
              min={0}
              max={10000}
              step={100}
              value={revenu2}
              onChange={(e) => setRevenu2(Number(e.target.value))}
              className="w-full mt-2 accent-blue-600"
            />
          </div>

          {/* Charges */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Charges mensuelles (credits en cours)
            </label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={10000}
                step={50}
                value={charges}
                onChange={(e) => setCharges(Number(e.target.value))}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 font-semibold"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€/mois</span>
            </div>
          </div>

          {/* Apport */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Apport personnel
            </label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={500000}
                step={1000}
                value={apport}
                onChange={(e) => setApport(Number(e.target.value))}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 font-semibold"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€</span>
            </div>
          </div>
        </div>

        {/* Duree */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">Duree du pret</label>
          <div className="flex gap-3">
            {DUREES.map((d) => (
              <button
                key={d}
                onClick={() => handleDureeChange(d)}
                className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${
                  duree === d
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {DUREE_LABELS[d]}
              </button>
            ))}
          </div>
        </div>

        {/* Parametres avances */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          {showAdvanced ? "Masquer" : "Afficher"} les parametres avances
          <svg className={`w-4 h-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showAdvanced && (
          <div className="grid gap-4 sm:grid-cols-2 mt-4 p-4 bg-slate-50 rounded-xl">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Taux d&apos;interet annuel (%)
              </label>
              <input
                type="number"
                min={0}
                max={10}
                step={0.05}
                value={taux}
                onChange={(e) => setTaux(Number(e.target.value))}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 font-semibold"
              />
              <p className="text-xs text-slate-400 mt-1">Taux moyen {duree} ans : {TAUX_MOYENS[duree]}%</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Taux assurance emprunteur (%)
              </label>
              <input
                type="number"
                min={0}
                max={1}
                step={0.01}
                value={tauxAssurance}
                onChange={(e) => setTauxAssurance(Number(e.target.value))}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 font-semibold"
              />
              <p className="text-xs text-slate-400 mt-1">Moyenne : {TAUX_ASSURANCE_DEFAUT}%</p>
            </div>
          </div>
        )}
      </div>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl shadow-blue-200/50">
        <p className="text-blue-100 text-sm font-medium mb-1">Votre capacite d&apos;emprunt maximale</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmt(resultat.capitalMax)} €</p>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-blue-100 text-xs">Budget total (emprunt + apport)</p>
            <p className="text-2xl font-bold mt-1">{fmt(resultat.budgetTotal)} €</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-blue-100 text-xs">Mensualite maximale</p>
            <p className="text-2xl font-bold mt-1">{fmt(resultat.mensualiteMax)} €/mois</p>
          </div>
        </div>

        {/* Barre endettement */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-blue-100">Taux d&apos;endettement</span>
            <span className="font-bold">{resultat.tauxEndettement}% / {TAUX_ENDETTEMENT_MAX}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                resultat.tauxEndettement <= 25
                  ? "bg-green-400"
                  : resultat.tauxEndettement <= 35
                    ? "bg-orange-400"
                    : "bg-red-400"
              }`}
              style={{ width: `${Math.min(100, (resultat.tauxEndettement / 50) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-blue-200 mt-1">
            <span>0%</span>
            <span>|25%</span>
            <span className="font-bold">|35% max HCSF</span>
            <span>50%</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-slate-500 text-xs font-medium">Reste a vivre</p>
          <p className={`text-2xl font-bold mt-1 ${resultat.resteAVivre >= 700 ? "text-green-600" : "text-red-600"}`}>
            {fmt(resultat.resteAVivre)} €
          </p>
          <p className="text-xs text-slate-400 mt-1">apres credit et charges</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-slate-500 text-xs font-medium">Cout des interets</p>
          <p className="text-2xl font-bold mt-1 text-slate-800">{fmt(resultat.coutInterets)} €</p>
          <p className="text-xs text-slate-400 mt-1">sur {duree} ans a {taux}%</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-slate-500 text-xs font-medium">Cout assurance</p>
          <p className="text-2xl font-bold mt-1 text-slate-800">{fmt(resultat.coutAssurance)} €</p>
          <p className="text-xs text-slate-400 mt-1">taux {tauxAssurance}%</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-slate-500 text-xs font-medium">Cout total du credit</p>
          <p className="text-2xl font-bold mt-1 text-orange-600">{fmt(resultat.coutTotal)} €</p>
          <p className="text-xs text-slate-400 mt-1">interets + assurance</p>
        </div>
      </div>

      {/* Indicateurs conformite */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Conformite HCSF 2026</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${resultat.tauxEndettement <= 35 ? "bg-green-500" : "bg-red-500"}`}>
              {resultat.tauxEndettement <= 35 ? "✓" : "✗"}
            </span>
            <div>
              <p className="text-sm font-medium text-slate-700">
                Taux d&apos;endettement : <span className={endettementColor}>{resultat.tauxEndettement}%</span>
              </p>
              <p className="text-xs text-slate-400">Maximum autorise : 35% (HCSF)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${resultat.resteAVivre >= 700 ? "bg-green-500" : "bg-red-500"}`}>
              {resultat.resteAVivre >= 700 ? "✓" : "✗"}
            </span>
            <div>
              <p className="text-sm font-medium text-slate-700">
                Reste a vivre : <span className={resultat.resteAVivre >= 700 ? "text-green-600" : "text-red-600"}>{fmt(resultat.resteAVivre)} €/mois</span>
              </p>
              <p className="text-xs text-slate-400">Minimum recommande : 700 € (seul) / 1 200 € (couple)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${duree <= 25 ? "bg-green-500" : "bg-red-500"}`}>
              {duree <= 25 ? "✓" : "✗"}
            </span>
            <div>
              <p className="text-sm font-medium text-slate-700">
                Duree : <span className="text-green-600">{duree} ans</span>
              </p>
              <p className="text-xs text-slate-400">Maximum autorise : 25 ans (27 ans si construction)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparatif durees */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Comparatif par duree</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Duree</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Capacite</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Mensualite</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Budget total</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Cout credit</th>
              </tr>
            </thead>
            <tbody>
              {comparatif.map((c) => (
                <tr
                  key={c.duree}
                  className={`border-b border-slate-100 ${c.duree === duree ? "bg-blue-50 font-semibold" : ""}`}
                >
                  <td className="py-3 px-2 text-slate-800">{c.duree} ans</td>
                  <td className="py-3 px-2 text-right text-slate-600">{c.taux}%</td>
                  <td className="py-3 px-2 text-right text-slate-800 font-semibold">{fmt(c.capitalMax)} €</td>
                  <td className="py-3 px-2 text-right text-slate-600">{fmt(c.mensualite)} €/mois</td>
                  <td className="py-3 px-2 text-right text-slate-800">{fmt(c.budgetTotal)} €</td>
                  <td className="py-3 px-2 text-right text-orange-600">{fmt(c.coutTotal)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-3">
          Plus la duree est longue, plus vous pouvez emprunter, mais le cout total du credit augmente.
        </p>
      </div>
    </div>
  );
}
