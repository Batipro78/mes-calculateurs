"use client";

import { useState } from "react";
import { calcRetraite, PASS_ANNUEL } from "./calcRetraite";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

export default function SimulateurRetraite() {
  const [anneeNaissance, setAnneeNaissance] = useState("1970");
  const [salaireMoyen, setSalaireMoyen] = useState("35000");
  const [trimestres, setTrimestres] = useState("168");
  const [ageDepart, setAgeDepart] = useState("64");

  const annee = parseInt(anneeNaissance) || 1970;
  const sam = parseFloat(salaireMoyen) || 0;
  const trim = parseInt(trimestres) || 0;
  const ageSouhaite = parseFloat(ageDepart) || 64;

  const r = calcRetraite(annee, sam, trim, ageSouhaite);

  // Tableau scenarios par age de depart
  const scenarios = [62, 63, 64, 65, 66, 67].map((age) => {
    const res = calcRetraite(annee, sam, trim, age);
    return { age, ...res, isCurrent: age === r.ageDepart };
  });

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Annee de naissance */}
        <div className="mb-6">
          <label htmlFor="annee" className="block text-sm font-medium text-slate-600 mb-2">
            Annee de naissance
          </label>
          <div className="relative">
            <input
              id="annee"
              type="number"
              value={anneeNaissance}
              onChange={(e) => setAnneeNaissance(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              min="1955"
              max="2005"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {[1960, 1965, 1970, 1975, 1980, 1985, 1990].map((a) => (
              <button
                key={a}
                onClick={() => setAnneeNaissance(a.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  anneeNaissance === a.toString()
                    ? "bg-amber-50 border-amber-300 text-amber-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Salaire annuel moyen */}
        <div className="mb-6">
          <label htmlFor="salaire" className="block text-sm font-medium text-slate-600 mb-2">
            Salaire annuel moyen brut (25 meilleures annees)
          </label>
          <div className="relative">
            <input
              id="salaire"
              type="number"
              value={salaireMoyen}
              onChange={(e) => setSalaireMoyen(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              min="0"
              step="1000"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">EUR</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {[20000, 25000, 30000, 35000, 40000, 47100].map((s) => (
              <button
                key={s}
                onClick={() => setSalaireMoyen(s.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  salaireMoyen === s.toString()
                    ? "bg-amber-50 border-amber-300 text-amber-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {(s / 1000).toFixed(0)}k EUR
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-1">Plafond Securite Sociale : {fmtInt(PASS_ANNUEL)} EUR/an</p>
        </div>

        {/* Trimestres */}
        <div className="mb-6">
          <label htmlFor="trimestres" className="block text-sm font-medium text-slate-600 mb-2">
            Trimestres cotises
          </label>
          <div className="relative">
            <input
              id="trimestres"
              type="number"
              value={trimestres}
              onChange={(e) => setTrimestres(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-24 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              min="0"
              max="200"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">trimestres</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {[120, 140, 160, 168, 172, 180].map((t) => (
              <button
                key={t}
                onClick={() => setTrimestres(t.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  trimestres === t.toString()
                    ? "bg-amber-50 border-amber-300 text-amber-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {t} ({(t / 4).toFixed(0)} ans)
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-1">Requis pour le taux plein (generation {annee >= 1965 ? "1965+" : annee}) : {r.trimestresRequis} trimestres</p>
        </div>

        {/* Age de depart */}
        <div>
          <label htmlFor="ageDepart" className="block text-sm font-medium text-slate-600 mb-2">
            Age de depart souhaite
          </label>
          <div className="relative">
            <input
              id="ageDepart"
              type="number"
              value={ageDepart}
              onChange={(e) => setAgeDepart(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-14 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              min="55"
              max="70"
              step="1"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">ans</span>
          </div>
          <div className="flex gap-2 mt-2">
            {[62, 63, 64, 65, 67].map((a) => (
              <button
                key={a}
                onClick={() => setAgeDepart(a.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  ageDepart === a.toString()
                    ? "bg-amber-50 border-amber-300 text-amber-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {a} ans
              </button>
            ))}
          </div>
          {ageSouhaite < r.ageLegal && (
            <p className="text-xs text-red-500 mt-1">
              Age legal pour votre generation : {r.ageLegal % 1 === 0 ? r.ageLegal : r.ageLegal.toFixed(1)} ans. Votre depart sera recale a cet age.
            </p>
          )}
        </div>

        {/* Detail du calcul */}
        <div className="mt-8 bg-slate-50 rounded-xl p-4">
          <p className="text-xs font-medium text-slate-400 mb-3">Detail du calcul</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">SAM plafonne (annuel)</span>
              <span className="font-medium text-slate-700">{fmtInt(r.samPlafonne)} EUR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Taux de liquidation</span>
              <span className="font-bold text-slate-800">{(r.taux * 100).toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Coefficient proratisation</span>
              <span className="font-medium text-slate-700">{(r.coeffProrata * 100).toFixed(1)}%</span>
            </div>
            {r.trimestresDecote > 0 && (
              <div className="flex justify-between text-red-600">
                <span>Decote ({r.trimestresDecote} trim. manquants)</span>
                <span className="font-medium">-{(r.trimestresDecote * 0.625).toFixed(2)}%</span>
              </div>
            )}
            {r.trimestresSupp > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Surcote ({r.trimestresSupp} trim. supplementaires)</span>
                <span className="font-medium">+{(r.trimestresSupp * 1.25).toFixed(2)}%</span>
              </div>
            )}
            <div className="h-px bg-slate-200 my-1" />
            <div className="flex justify-between">
              <span className="text-slate-500">Pension base (regime general)</span>
              <span className="font-bold text-slate-700">{fmt(r.pensionBase)} EUR/mois</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Complementaire AGIRC-ARRCO</span>
              <span className="font-bold text-slate-700">{fmt(r.complementaireEffective)} EUR/mois</span>
            </div>
            <div className="h-px bg-slate-200 my-1" />
            <div className="flex justify-between font-bold">
              <span className="text-slate-600">Pension totale brute</span>
              <span className="text-amber-700">{fmt(r.pensionTotaleBrute)} EUR/mois</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Prelevements (CSG/CRDS/Casa : 9,1%)</span>
              <span className="text-slate-400">-{fmt(r.pensionTotaleBrute * r.tauxPrelevements)} EUR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-2 space-y-4">
        {/* Pension principale */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80 mb-1">Pension de retraite estimee</p>
          <p className="text-5xl font-extrabold tracking-tight">{fmtInt(r.pensionTotaleNette)}</p>
          <p className="text-lg font-medium mt-1">EUR net / mois</p>
          <div className="h-px bg-white/20 my-4" />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white/70">Brut mensuel</p>
              <p className="font-semibold">{fmt(r.pensionTotaleBrute)} EUR</p>
            </div>
            <div>
              <p className="text-white/70">Taux remplacement</p>
              <p className="font-semibold">{r.tauxRemplacement.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        {/* Age et trimestres */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-1">Age de depart effectif</p>
          <p className="text-3xl font-extrabold text-slate-800">
            {r.ageDepart % 1 === 0 ? r.ageDepart : r.ageDepart.toFixed(1)} ans
          </p>
          <p className="text-sm text-slate-500 mt-1">Age legal : {r.ageLegal % 1 === 0 ? r.ageLegal : r.ageLegal.toFixed(1)} ans</p>
          <div className="h-px bg-slate-100 my-3" />
          <p className="text-xs font-medium text-slate-400 mb-1">Trimestres</p>
          <p className="text-2xl font-extrabold text-slate-800">{trim} / {r.trimestresRequis}</p>
          <div className="w-full bg-slate-100 rounded-full h-2.5 mt-2">
            <div
              className={`h-2.5 rounded-full ${r.coeffProrata >= 1 ? "bg-green-500" : "bg-amber-500"}`}
              style={{ width: `${Math.min(r.coeffProrata * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {r.trimestresManquants > 0 ? `${r.trimestresManquants} trimestres manquants` : "Taux plein atteint"}
          </p>
        </div>

        {/* Decomposition */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">Decomposition de la pension nette</p>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Regime general (base)</span>
                <span className="font-bold text-slate-700">{fmt(r.pensionBase * (1 - r.tauxPrelevements))} EUR</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="h-2 rounded-full bg-amber-500" style={{ width: `${r.pensionTotaleBrute > 0 ? (r.pensionBase / r.pensionTotaleBrute) * 100 : 0}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Complementaire AGIRC-ARRCO</span>
                <span className="font-bold text-slate-700">{fmt(r.complementaireEffective * (1 - r.tauxPrelevements))} EUR</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="h-2 rounded-full bg-orange-500" style={{ width: `${r.pensionTotaleBrute > 0 ? (r.complementaireEffective / r.pensionTotaleBrute) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Scenarios par age */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">Pension nette selon l&apos;age de depart</p>
          <div className="space-y-2">
            {scenarios.map((s) => (
              <div
                key={s.age}
                className={`flex items-center justify-between px-3 py-2 rounded-lg ${
                  s.isCurrent ? "bg-amber-50 border border-amber-200" : ""
                }`}
              >
                <span className={`text-sm ${s.isCurrent ? "font-bold text-amber-700" : "text-slate-500"}`}>
                  {s.age} ans
                  {s.age < s.ageLegal && <span className="text-xs text-red-400 ml-1">(avant age legal)</span>}
                </span>
                <span className={`text-sm font-bold ${s.isCurrent ? "text-amber-700" : "text-slate-700"}`}>
                  {fmtInt(s.pensionTotaleNette)} EUR/mois
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Estimation indicative basee sur les regles 2026 (reforme retraites 2023).
          Les montants reels dependent de votre releve de carriere (info-retraite.fr).
          La complementaire AGIRC-ARRCO est estimee de facon simplifiee.
        </div>
      </div>
    </div>
  );
}
