"use client";

import { useState, useMemo } from "react";

// Taux d'inflation annuels en France (INSEE - Indice des prix a la consommation)
const INFLATION_FR: Record<number, number> = {
  2000: 1.8, 2001: 1.8, 2002: 1.9, 2003: 2.2, 2004: 2.3,
  2005: 1.9, 2006: 1.9, 2007: 1.6, 2008: 3.2, 2009: 0.1,
  2010: 1.7, 2011: 2.3, 2012: 2.2, 2013: 1.0, 2014: 0.6,
  2015: 0.1, 2016: 0.3, 2017: 1.2, 2018: 2.1, 2019: 1.3,
  2020: 0.5, 2021: 1.6, 2022: 5.2, 2023: 4.9, 2024: 2.0,
  2025: 1.5,
};

const YEARS = Object.keys(INFLATION_FR).map(Number).sort((a, b) => a - b);
const CURRENT_YEAR = YEARS[YEARS.length - 1];

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function CalculateurInflation() {
  const [montant, setMontant] = useState("2000");
  const [anneeDepart, setAnneeDepart] = useState("2020");
  const [mode, setMode] = useState<"salaire" | "prix">("salaire");

  const amount = parseFloat(montant) || 0;
  const startYear = parseInt(anneeDepart) || 2020;

  const result = useMemo(() => {
    if (amount <= 0 || startYear >= CURRENT_YEAR) return null;

    let cumulativeMultiplier = 1;
    const evolution: { year: number; inflation: number; cumulative: number; equivalent: number }[] = [];

    for (let y = startYear; y <= CURRENT_YEAR; y++) {
      const rate = INFLATION_FR[y] || 0;
      if (y > startYear) {
        cumulativeMultiplier *= 1 + rate / 100;
      }
      evolution.push({
        year: y,
        inflation: rate,
        cumulative: (cumulativeMultiplier - 1) * 100,
        equivalent: amount * cumulativeMultiplier,
      });
    }

    const equivalentToday = amount * cumulativeMultiplier;
    const perte = equivalentToday - amount;
    const pertePct = (cumulativeMultiplier - 1) * 100;
    const pouvoirAchat = amount / cumulativeMultiplier;
    const pertePouvoirAchat = amount - pouvoirAchat;

    return {
      equivalentToday,
      perte,
      pertePct,
      pouvoirAchat,
      pertePouvoirAchat,
      cumulativeMultiplier,
      evolution,
    };
  }, [amount, startYear]);

  const maxCumulative = result ? Math.max(...result.evolution.map((e) => e.cumulative), 1) : 1;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-800 mb-6">Parametres</h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Type de calcul
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMode("salaire")}
                className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  mode === "salaire"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                Salaire
              </button>
              <button
                onClick={() => setMode("prix")}
                className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  mode === "prix"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                Prix / Montant
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              {mode === "salaire" ? "Salaire mensuel net" : "Montant"} en EUR
            </label>
            <div className="relative">
              <input
                type="number"
                value={montant}
                onChange={(e) => setMontant(e.target.value)}
                className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-800"
                min="1"
                step="100"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                EUR
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Annee de reference
            </label>
            <select
              value={anneeDepart}
              onChange={(e) => setAnneeDepart(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-800"
            >
              {YEARS.filter((y) => y < CURRENT_YEAR).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[2015, 2020, 2023].map((y) => (
              <button
                key={y}
                onClick={() => setAnneeDepart(String(y))}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  parseInt(anneeDepart) === y
                    ? "bg-blue-100 text-blue-700"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 p-3 bg-slate-50 rounded-xl">
          <p className="text-xs text-slate-400">
            Source : INSEE (Indice des Prix a la Consommation). Taux annuels moyens
            de l&apos;inflation en France metropolitaine.
          </p>
        </div>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-3 space-y-6">
        {result && amount > 0 ? (
          <>
            {/* Chiffres cles */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <p className="text-sm text-slate-400">
                  {mode === "salaire" ? "Salaire" : "Montant"} en {startYear}
                </p>
                <p className="text-2xl font-bold text-slate-800 mt-1">
                  {fmt(amount)} EUR
                </p>
              </div>
              <div className="bg-red-50 rounded-2xl border border-red-200 p-5">
                <p className="text-sm text-slate-500">
                  Equivalent en {CURRENT_YEAR}
                </p>
                <p className="text-2xl font-bold text-red-700 mt-1">
                  {fmt(result.equivalentToday)} EUR
                </p>
                <p className="text-sm text-red-600 font-semibold mt-1">
                  +{fmt(result.perte)} EUR necessaires
                </p>
              </div>
              <div className="bg-orange-50 rounded-2xl border border-orange-200 p-5">
                <p className="text-sm text-slate-500">Inflation cumulee</p>
                <p className="text-2xl font-bold text-orange-700 mt-1">
                  +{result.pertePct.toFixed(1)}%
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  depuis {startYear}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <p className="text-sm text-slate-400">
                  Pouvoir d&apos;achat reel de {fmt(amount)} EUR
                </p>
                <p className="text-2xl font-bold text-slate-800 mt-1">
                  {fmt(result.pouvoirAchat)} EUR
                </p>
                <p className="text-xs text-red-500 mt-1">
                  -{fmt(result.pertePouvoirAchat)} EUR de perte seche
                </p>
              </div>
            </div>

            {/* Phrase resumee */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200 p-6">
              {mode === "salaire" ? (
                <p className="text-slate-700 leading-relaxed">
                  Si vous gagniez <strong>{fmt(amount)} EUR net/mois</strong> en{" "}
                  <strong>{startYear}</strong>, vous devriez gagner{" "}
                  <strong className="text-red-700">{fmt(result.equivalentToday)} EUR</strong>{" "}
                  aujourd&apos;hui pour avoir le meme niveau de vie. Si votre
                  salaire n&apos;a pas augmente, vous avez perdu{" "}
                  <strong className="text-red-700">{fmt(result.perte)} EUR/mois</strong>{" "}
                  de pouvoir d&apos;achat, soit{" "}
                  <strong className="text-red-700">{fmt(result.perte * 12)} EUR/an</strong>.
                </p>
              ) : (
                <p className="text-slate-700 leading-relaxed">
                  Ce qui coutait <strong>{fmt(amount)} EUR</strong> en{" "}
                  <strong>{startYear}</strong> coute aujourd&apos;hui environ{" "}
                  <strong className="text-red-700">{fmt(result.equivalentToday)} EUR</strong>.
                  L&apos;inflation a fait perdre{" "}
                  <strong className="text-red-700">{result.pertePct.toFixed(1)}%</strong>{" "}
                  de la valeur de votre argent en {CURRENT_YEAR - startYear} ans.
                </p>
              )}
            </div>

            {/* Graphique inflation par annee */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4">Inflation annuelle en France</h3>
              <div className="space-y-1.5">
                {result.evolution.map((e) => (
                  <div key={e.year} className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-10 text-right font-mono">{e.year}</span>
                    <div className="flex-1 relative h-6">
                      <div
                        className={`absolute top-0 left-0 h-full rounded-md ${
                          e.inflation >= 3 ? "bg-red-400" : e.inflation >= 2 ? "bg-orange-400" : "bg-emerald-400"
                        }`}
                        style={{ width: `${Math.max((e.inflation / 6) * 100, 2)}%` }}
                      />
                      <div className="absolute top-0 left-0 h-full flex items-center pl-2">
                        <span className="text-xs font-medium text-slate-700 drop-shadow-sm">
                          {e.inflation.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 w-20 text-right">
                      cumul: +{e.cumulative.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-emerald-400 rounded-sm" /> &lt; 2%
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-orange-400 rounded-sm" /> 2-3%
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-red-400 rounded-sm" /> &gt; 3%
                </span>
              </div>
            </div>

            {/* Tableau detail */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4">Evolution detaillee</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="pb-2 text-slate-500 font-medium">Annee</th>
                      <th className="pb-2 text-slate-500 font-medium">Inflation</th>
                      <th className="pb-2 text-slate-500 font-medium">Cumul</th>
                      <th className="pb-2 text-slate-500 font-medium">Equivalent</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600">
                    {result.evolution.map((e) => (
                      <tr key={e.year} className="border-b border-slate-100">
                        <td className="py-2 font-semibold">{e.year}</td>
                        <td className={`py-2 ${e.inflation >= 3 ? "text-red-600 font-semibold" : ""}`}>
                          +{e.inflation.toFixed(1)}%
                        </td>
                        <td className="py-2">+{e.cumulative.toFixed(1)}%</td>
                        <td className="py-2 font-semibold">{fmt(e.equivalent)} EUR</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <p className="text-slate-400">
              Entrez un montant pour voir l&apos;impact de l&apos;inflation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
