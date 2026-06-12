"use client";

import { useState, useMemo } from "react";
import { calculerGirardin, fmtEur } from "./girardinCalc";
import type { TypeOperation } from "./girardinCalc";

interface Props {
  defaultImpot?: number;
  defaultRendement?: number;
  defaultType?: TypeOperation;
}

export default function CalculateurGirardin({
  defaultImpot = 8000,
  defaultRendement = 10,
  defaultType = "plein-droit",
}: Props) {
  const [impot, setImpot] = useState(defaultImpot);
  const [rendement, setRendement] = useState(defaultRendement);
  const [typeOp, setTypeOp] = useState<TypeOperation>(defaultType);

  const res = useMemo(
    () => calculerGirardin({ impotAnnuel: impot, rendement, typeOperation: typeOp }),
    [impot, rendement, typeOp]
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-4">Votre situation fiscale</h3>

      <div className="grid gap-4 sm:grid-cols-2 mb-5">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Impot sur le revenu annuel estime
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="500"
              value={impot}
              onChange={(e) => setImpot(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">EUR</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Impot N+1 a payer en septembre</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Type d&apos;operation
          </label>
          <select
            value={typeOp}
            onChange={(e) => setTypeOp(e.target.value as TypeOperation)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-400 bg-white"
          >
            <option value="plein-droit">De plein droit (moins de 300 000 EUR)</option>
            <option value="avec-agrement">Avec agrement (plus de 300 000 EUR)</option>
          </select>
          <p className="text-xs text-slate-400 mt-1">
            Retrocession min. {typeOp === "avec-agrement" ? "66 %" : "56 %"} a l&apos;exploitant
          </p>
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-xs font-medium text-slate-500 mb-2">
          Rendement de l&apos;operation : <span className="font-bold text-indigo-600">{rendement} %</span>
        </label>
        <input
          type="range"
          min="7"
          max="14"
          step="0.5"
          value={rendement}
          onChange={(e) => setRendement(parseFloat(e.target.value))}
          className="w-full accent-indigo-500"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>7 % (prudent)</span>
          <span>14 % (eleve)</span>
        </div>
      </div>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-2xl p-6 shadow-lg shadow-indigo-200/50 mb-5">
        <p className="text-indigo-100 text-sm mb-1">Reduction d&apos;impot obtenue en 2027</p>
        <p className="text-4xl font-extrabold">{fmtEur(res.reductionCible)}</p>
        <p className="text-indigo-100 mt-2 text-sm">
          Pour un apport de <strong>{fmtEur(res.apportNecessaire)}</strong> en 2026
        </p>
      </div>

      {/* Tableau de details */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-5">
        <p className="font-semibold text-indigo-900 mb-3">Detail de l&apos;operation</p>
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-indigo-200">
              <td className="py-2 text-slate-700">Apport a verser (annee N)</td>
              <td className="py-2 text-right font-bold text-slate-800">{fmtEur(res.apportNecessaire)}</td>
            </tr>
            <tr className="border-b border-indigo-200">
              <td className="py-2 text-slate-700">Reduction d&apos;impot (annee N+1)</td>
              <td className="py-2 text-right font-bold text-indigo-700">{fmtEur(res.reductionCible)}</td>
            </tr>
            <tr className="border-b border-indigo-200">
              <td className="py-2 text-slate-700">Gain net (one-shot, a fonds perdus)</td>
              <td className="py-2 text-right font-bold text-emerald-600">+{fmtEur(res.gainNet)}</td>
            </tr>
            <tr className="border-b border-indigo-200">
              <td className="py-2 text-slate-700">Equivalent placement sur 1 an</td>
              <td className="py-2 text-right font-bold text-slate-800">{res.rendementEffectif} %</td>
            </tr>
            <tr className="border-b border-indigo-200">
              <td className="py-2 text-slate-700">Part comptee dans le plafond 18 000 EUR</td>
              <td className="py-2 text-right font-bold text-slate-800">{fmtEur(res.partDansPlafond)}</td>
            </tr>
            <tr>
              <td className="py-2 text-slate-700">Taux de retrocession a l&apos;exploitant</td>
              <td className="py-2 text-right font-bold text-slate-800">{res.tauxRetrocession} %</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Alerte plafond */}
      {!res.apportCouvreImpot && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
          <p className="text-sm text-amber-800 font-medium">
            Votre impot ({fmtEur(impot)}) est inferieur au maximum possible par ce dispositif ({fmtEur(res.reductionMaxPlafond)}).
            La simulation est donc limitee a votre impot reel — vous ne pouvez pas reduire plus que ce que vous devez.
          </p>
        </div>
      )}

      <p className="text-xs text-slate-400 mt-2 text-center">
        Simulation indicative. Ne constitue pas un conseil en investissement.
        Consultez un conseiller en gestion de patrimoine agree avant tout investissement Girardin.
      </p>
    </div>
  );
}
