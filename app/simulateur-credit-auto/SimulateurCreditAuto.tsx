"use client";

import { useState } from "react";
import {
  calcCreditAuto,
  TAUX_MOYENS,
  DUREES,
  VEHICULES_PRESETS,
} from "./creditAutoCalc";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export default function SimulateurCreditAuto() {
  const [montant, setMontant] = useState(20000);
  const [duree, setDuree] = useState(48);
  const [taux, setTaux] = useState(4.5);
  const [apport, setApport] = useState(3000);
  const [tauxPerso, setTauxPerso] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const res = calcCreditAuto(montant, duree, taux, apport);

  function changerDuree(d: number) {
    setDuree(d);
    if (!tauxPerso) setTaux(TAUX_MOYENS[d] || 4.5);
  }

  function choisirVehicule(prix: number, dureeConseillee: number) {
    setMontant(prix);
    setDuree(dureeConseillee);
    if (!tauxPerso) setTaux(TAUX_MOYENS[dureeConseillee] || 4.5);
  }

  const endettementCouleur =
    res.tauxEndettement > 33
      ? "text-red-600"
      : res.tauxEndettement > 25
      ? "text-orange-600"
      : "text-green-600";

  const jaugePct = Math.min(100, (res.tauxEndettement / 50) * 100);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Colonne gauche — 3 cols */}
      <div className="lg:col-span-3 space-y-6">
        {/* Presets vehicules */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-base font-bold text-slate-800 mb-4">
            Choisissez votre vehicule
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {VEHICULES_PRESETS.map((v) => (
              <button
                key={`${v.marque}-${v.nom}`}
                onClick={() => choisirVehicule(v.prix, v.dureeConseillee)}
                className={`text-left p-3 rounded-xl border-2 transition-all text-sm ${
                  montant === v.prix && duree === v.dureeConseillee
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:border-blue-300 bg-white"
                }`}
              >
                <div className="text-xl mb-1">{v.emoji}</div>
                <div className="font-bold text-slate-800 text-xs leading-tight">
                  {v.marque}
                </div>
                <div className="text-slate-600 text-xs">{v.nom}</div>
                <div className="text-slate-500 text-xs mt-1">
                  {fmtInt(v.prix)} €
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Parametres */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-base font-bold text-slate-800 mb-5">
            Parametres du credit
          </h2>

          {/* Montant vehicule */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Prix du vehicule
            </label>
            <div className="relative">
              <input
                type="number"
                value={montant}
                onChange={(e) =>
                  setMontant(Math.max(1000, Math.min(200000, Number(e.target.value))))
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-10 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                €
              </span>
            </div>
            <input
              type="range"
              min={1000}
              max={80000}
              step={500}
              value={montant}
              onChange={(e) => setMontant(Number(e.target.value))}
              className="w-full mt-2 accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>1 000 €</span>
              <span>80 000 €</span>
            </div>
          </div>

          {/* Apport */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Apport personnel
            </label>
            <div className="relative">
              <input
                type="number"
                value={apport}
                onChange={(e) =>
                  setApport(Math.max(0, Math.min(montant, Number(e.target.value))))
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-10 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                €
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {[0, 1000, 2000, 3000, 5000].map((a) => (
                <button
                  key={a}
                  onClick={() => setApport(a)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                    apport === a
                      ? "bg-blue-50 border-blue-300 text-blue-700"
                      : "border-slate-200 text-slate-400 hover:border-slate-300"
                  }`}
                >
                  {a === 0 ? "Sans apport" : `${fmtInt(a)} €`}
                </button>
              ))}
            </div>
          </div>

          {/* Duree */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Duree du credit
            </label>
            <div className="flex flex-wrap gap-2">
              {DUREES.map((d) => (
                <button
                  key={d}
                  onClick={() => changerDuree(d)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    duree === d
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {d} mois
                </button>
              ))}
            </div>
          </div>

          {/* Taux */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Taux annuel (TAEG)
              <button
                onClick={() => {
                  const next = !tauxPerso;
                  setTauxPerso(next);
                  if (!next) setTaux(TAUX_MOYENS[duree] || 4.5);
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
                min={0}
                max={25}
                value={taux}
                onChange={(e) => {
                  setTauxPerso(true);
                  setTaux(Math.max(0, Number(e.target.value)));
                }}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-10 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                %
              </span>
            </div>
            {!tauxPerso && (
              <p className="text-xs text-slate-400 mt-1">
                Taux moyen concessionnaire 2026 pour {duree} mois
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Colonne droite — 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {/* Carte principale gradient */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm text-white/80 mb-1">Mensualite</p>
          <p className="text-5xl font-extrabold tracking-tight">
            {fmt(res.mensualite)} €
          </p>
          <p className="text-sm font-medium mt-1 text-white/80">
            pendant {duree} mois
          </p>

          <div className="h-px bg-white/20 my-4" />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white/70">Montant emprunte</p>
              <p className="text-xl font-bold">
                {fmtInt(res.montantEmprunte)} €
              </p>
            </div>
            <div>
              <p className="text-white/70">Cout du credit</p>
              <p className="text-xl font-bold">{fmt(res.coutCredit)} €</p>
            </div>
            <div>
              <p className="text-white/70">Total rembourse</p>
              <p className="text-xl font-bold">{fmt(res.coutTotal)} €</p>
            </div>
            <div>
              <p className="text-white/70">Apport</p>
              <p className="text-xl font-bold">{fmtInt(apport)} €</p>
            </div>
          </div>
        </div>

        {/* Alerte taux endettement */}
        {res.tauxEndettement > 33 && (
          <div className="bg-red-50 border border-red-300 rounded-2xl p-4">
            <p className="font-bold text-red-800 text-sm">
              Taux d&apos;endettement eleve : {res.tauxEndettement}%
            </p>
            <p className="text-xs text-red-700 mt-1">
              Votre taux d&apos;endettement depasse le seuil de 33% recommande.
              Les etablissements financiers pourraient refuser votre dossier.
              Augmentez votre apport ou allongez la duree.
            </p>
          </div>
        )}

        {/* Jauge endettement */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-slate-700">
              Taux d&apos;endettement
            </span>
            <span className={`font-bold ${endettementCouleur}`}>
              {res.tauxEndettement}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 relative overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                res.tauxEndettement > 33
                  ? "bg-red-500"
                  : res.tauxEndettement > 25
                  ? "bg-orange-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${jaugePct}%` }}
            />
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-red-400"
              style={{ left: `${(33 / 50) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0%</span>
            <span className="text-red-400">33% max</span>
            <span>50%</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Calcule sur un salaire moyen de 2 500 €/mois
          </p>
        </div>

        {/* Tableau amortissement */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-slate-800">
              Tableau d&apos;amortissement
            </h3>
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs text-blue-600 hover:underline"
            >
              {showAll ? "Afficher moins" : "Voir tout"}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-2 text-left text-slate-500 font-semibold">Mois</th>
                  <th className="p-2 text-center text-slate-500 font-semibold">Capital</th>
                  <th className="p-2 text-center text-slate-500 font-semibold">Interets</th>
                  <th className="p-2 text-center text-slate-500 font-semibold">Restant</th>
                </tr>
              </thead>
              <tbody>
                {(showAll
                  ? calcCreditAuto(montant, duree, taux, apport, true).tableauAmortissement
                  : res.tableauAmortissement
                ).map((l) => (
                  <tr
                    key={l.mois}
                    className="border-b border-slate-50 hover:bg-slate-50"
                  >
                    <td className="p-2 font-medium text-slate-700">{l.mois}</td>
                    <td className="p-2 text-center text-blue-600">
                      {fmt(l.capital)} €
                    </td>
                    <td className="p-2 text-center text-red-500">
                      {fmt(l.interets)} €
                    </td>
                    <td className="p-2 text-center text-slate-700">
                      {fmtInt(l.restant)} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!showAll && duree > 6 && (
            <p className="text-xs text-slate-400 mt-2 text-center">
              6 premiers mois affich&eacute;s sur {duree}
            </p>
          )}
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Simulation indicative. Taux et mensualites a titre d&apos;exemple — le
          taux reel depend de votre profil emprunteur. Consultez plusieurs
          etablissements financiers avant de signer.
        </div>
      </div>
    </div>
  );
}
