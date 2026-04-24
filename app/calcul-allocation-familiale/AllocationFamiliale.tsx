"use client";

import { useState, useMemo } from "react";
import {
  calculerAllocations,
  calculerParTranche,
  type FamilleConfig,
} from "./allocationCalc";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

export default function AllocationFamiliale() {
  const [nombreEnfants, setNombreEnfants] = useState(2);
  const [agesEnfants, setAgesEnfants] = useState<number[]>([5, 8]);
  const [revenuAnnuel, setRevenuAnnuel] = useState(45000);
  const [situation, setSituation] = useState<"couple" | "seul">("couple");

  // Sync ages array with nombre d'enfants
  const handleNombreEnfants = (n: number) => {
    setNombreEnfants(n);
    setAgesEnfants((prev) => {
      if (n > prev.length) {
        return [...prev, ...Array(n - prev.length).fill(3)];
      }
      return prev.slice(0, n);
    });
  };

  const handleAge = (index: number, age: number) => {
    setAgesEnfants((prev) => {
      const copy = [...prev];
      copy[index] = Math.max(0, Math.min(21, age));
      return copy;
    });
  };

  const config: FamilleConfig = useMemo(
    () => ({
      nombreEnfants,
      agesEnfants,
      revenuAnnuel,
      situation,
    }),
    [nombreEnfants, agesEnfants, revenuAnnuel, situation]
  );

  const resultat = useMemo(() => calculerAllocations(config), [config]);
  const comparaison = useMemo(
    () => calculerParTranche(nombreEnfants, agesEnfants),
    [nombreEnfants, agesEnfants]
  );

  const agesRapides = [1, 3, 6, 10, 14, 16, 18];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Formulaire */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-6">
          Votre situation familiale
        </h2>

        {/* Situation */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Situation
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { val: "couple", label: "En couple" },
                { val: "seul", label: "Parent seul(e)" },
              ] as const
            ).map((s) => (
              <button
                key={s.val}
                onClick={() => setSituation(s.val)}
                className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                  situation === s.val
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Nombre d'enfants */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nombre d&apos;enfants a charge
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                onClick={() => handleNombreEnfants(n)}
                className={`w-11 h-11 rounded-xl text-sm font-bold transition-all ${
                  nombreEnfants === n
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          {nombreEnfants < 2 && (
            <p className="text-xs text-amber-600 mt-2 font-medium">
              Les allocations familiales sont versees a partir de 2 enfants a
              charge
            </p>
          )}
        </div>

        {/* Ages des enfants */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Age de chaque enfant
          </label>
          <div className="space-y-3">
            {agesEnfants.map((age, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Enfant {index + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAge(index, age - 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-100 transition-all"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) =>
                        handleAge(index, parseInt(e.target.value) || 0)
                      }
                      min={0}
                      max={21}
                      className="w-14 text-center border border-slate-200 rounded-lg py-1.5 text-sm font-bold text-slate-800 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                    />
                    <button
                      onClick={() => handleAge(index, age + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-100 transition-all"
                    >
                      +
                    </button>
                    <span className="text-xs text-slate-400 ml-1">ans</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {agesRapides.map((a) => (
                    <button
                      key={a}
                      onClick={() => handleAge(index, a)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                        age === a
                          ? "bg-green-100 text-green-700 ring-1 ring-green-300"
                          : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      {a} ans
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenu annuel */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Revenus annuels du foyer (EUR)
          </label>
          <input
            type="number"
            value={revenuAnnuel}
            onChange={(e) => setRevenuAnnuel(parseInt(e.target.value) || 0)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold text-slate-800 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
          />
          <input
            type="range"
            min={0}
            max={200000}
            step={1000}
            value={revenuAnnuel}
            onChange={(e) => setRevenuAnnuel(parseInt(e.target.value))}
            className="w-full mt-2 accent-green-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0 EUR</span>
            <span>{fmtInt(revenuAnnuel)} EUR</span>
            <span>200 000 EUR</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {[25000, 40000, 55000, 75000, 100000].map((r) => (
              <button
                key={r}
                onClick={() => setRevenuAnnuel(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  revenuAnnuel === r
                    ? "bg-green-100 text-green-700 ring-1 ring-green-300"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {fmtInt(r)} EUR
              </button>
            ))}
          </div>
        </div>

        {/* Info tranche */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-3">
          <p className="text-sm text-green-800 font-medium">
            {resultat.trancheRevenus}
          </p>
        </div>
      </div>

      {/* Resultats */}
      <div className="space-y-4">
        {/* Total mensuel */}
        <div
          className={`rounded-2xl p-6 text-center ${
            resultat.totalMensuel > 0
              ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
              : "bg-gradient-to-br from-slate-400 to-slate-500 text-white"
          }`}
        >
          <p className="text-sm font-medium opacity-90 mb-1">
            Total allocations mensuelles
          </p>
          <p className="text-5xl font-black mb-1">
            {fmt(resultat.totalMensuel)}
            <span className="text-2xl font-bold opacity-80 ml-1">
              EUR/mois
            </span>
          </p>
          <p className="text-sm opacity-80">
            soit {fmtInt(resultat.totalAnnuel)} EUR/an (dont{" "}
            {fmt(resultat.allocationRentreeScolaire)} EUR d&apos;ARS)
          </p>
        </div>

        {/* Detail par prestation */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Detail des prestations
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <div>
                <span className="text-sm text-slate-600">
                  Allocations familiales
                </span>
                {nombreEnfants < 2 && (
                  <span className="text-xs text-slate-400 block">
                    A partir de 2 enfants
                  </span>
                )}
              </div>
              <span className="font-bold text-slate-800">
                {fmt(resultat.allocationsFamiliales)} EUR/mois
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <div>
                <span className="text-sm text-slate-600">
                  Complement familial
                </span>
                {nombreEnfants < 3 && (
                  <span className="text-xs text-slate-400 block">
                    A partir de 3 enfants (3-21 ans)
                  </span>
                )}
              </div>
              <span className="font-bold text-slate-800">
                {fmt(resultat.complementFamilial)} EUR/mois
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">
                Allocation rentree scolaire (ARS)
              </span>
              <span className="font-bold text-slate-800">
                {fmt(resultat.allocationRentreeScolaire)} EUR/an
              </span>
            </div>
            <div className="flex justify-between items-center py-2 bg-green-50 -mx-6 px-6 rounded-b-xl">
              <span className="text-sm font-bold text-green-800">
                Total mensuel
              </span>
              <span className="text-xl font-black text-green-700">
                {fmt(resultat.totalMensuel)} EUR
              </span>
            </div>
          </div>
        </div>

        {/* Detail par enfant */}
        {resultat.detailParEnfant.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Detail par enfant
            </h3>
            <div className="space-y-2">
              {resultat.detailParEnfant.map((enfant, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700">
                        {enfant.age} ans
                      </span>
                      {enfant.majoration > 0 && (
                        <span className="text-xs text-green-600 ml-2">
                          +{fmt(enfant.majoration)} EUR majoration 14+
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {enfant.ars > 0 ? (
                      <span className="text-sm font-bold text-green-600">
                        ARS : {fmt(enfant.ars)} EUR
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">
                        {enfant.age < 6
                          ? "ARS des 6 ans"
                          : enfant.age > 18
                          ? "ARS jusqu'a 18 ans"
                          : "Non eligible ARS"}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tableau comparatif par tranche */}
        {nombreEnfants >= 2 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Comparaison par tranche de revenus
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 text-slate-500 font-medium">
                      Tranche
                    </th>
                    <th className="text-right py-2 text-slate-500 font-medium">
                      AF/mois
                    </th>
                    <th className="text-right py-2 text-slate-500 font-medium">
                      AF/an
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: "Tranche 1 (revenus bas)",
                      val: comparaison.tranche1,
                      active:
                        resultat.trancheRevenus.includes("Tranche 1"),
                    },
                    {
                      label: "Tranche 2 (revenus moyens)",
                      val: comparaison.tranche2,
                      active:
                        resultat.trancheRevenus.includes("Tranche 2"),
                    },
                    {
                      label: "Tranche 3 (revenus eleves)",
                      val: comparaison.tranche3,
                      active:
                        resultat.trancheRevenus.includes("Tranche 3"),
                    },
                  ].map((t) => (
                    <tr
                      key={t.label}
                      className={`border-b border-slate-50 ${
                        t.active ? "bg-green-50" : ""
                      }`}
                    >
                      <td className="py-2.5 font-medium text-slate-700">
                        {t.label}
                        {t.active && (
                          <span className="text-xs text-green-600 ml-2 font-bold">
                            Votre tranche
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 text-right font-bold text-green-600">
                        {fmt(t.val)} EUR
                      </td>
                      <td className="py-2.5 text-right text-slate-600">
                        {fmtInt(t.val * 12)} EUR
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Avertissement */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-800">
            <strong>Estimation indicative</strong> — Les montants reels peuvent
            varier selon votre situation exacte. Les baremes utilises sont bases
            sur les montants 2025-2026 de la CAF. Consultez{" "}
            <strong>caf.fr</strong> pour un calcul officiel.
          </p>
        </div>
      </div>
    </div>
  );
}
