"use client";

import { useState, useMemo } from "react";
import { calculerReductionDOM, fmtEur, fmtPct, LABELS_TERRITOIRE, TerritoireDOM } from "./reductionDomCalc";

const TERRITOIRES: TerritoireDOM[] = ["guadeloupe", "martinique", "reunion", "guyane", "mayotte"];

interface Props {
  defaultTerritoire?: TerritoireDOM;
  defaultImpot?: number;
}

export default function CalculateurReductionDom({
  defaultTerritoire = "reunion",
  defaultImpot = 3000,
}: Props) {
  const [territoire, setTerritoire] = useState<TerritoireDOM>(defaultTerritoire);
  const [impotBareme, setImpotBareme] = useState(defaultImpot);

  const res = useMemo(
    () => calculerReductionDOM({ territoire, impotBareme }),
    [territoire, impotBareme]
  );

  const tauxLabel = res.taux === 0.30 ? "30 %" : "40 %";
  const plafondLabel = fmtEur(res.plafond);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-3">Votre situation</h3>
      <div className="grid gap-4 sm:grid-cols-2 mb-5">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Territoire DOM
          </label>
          <select
            value={territoire}
            onChange={(e) => setTerritoire(e.target.value as TerritoireDOM)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-400 bg-white"
          >
            {TERRITOIRES.map((t) => (
              <option key={t} value={t}>
                {LABELS_TERRITOIRE[t]} {t === "guyane" || t === "mayotte" ? "(40 %)" : "(30 %)"}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-400 mt-1">
            Taux applicable : <strong>{tauxLabel}</strong>, plafond {plafondLabel}
          </p>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Impot issu du bareme progressif (en EUR)
          </label>
          <div className="relative">
            <input
              type="number"
              min={0}
              step={100}
              value={impotBareme}
              onChange={(e) => setImpotBareme(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">EUR</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Ligne 14 de votre avis d&apos;imposition, avant reductions et credits
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-lg shadow-blue-200/50 mb-5">
        <p className="text-blue-100 text-sm mb-1">Reduction d&apos;impot DOM appliquee</p>
        <p className="text-4xl font-extrabold">
          {res.reductionAppliquee > 0 ? "-" : ""}{fmtEur(res.reductionAppliquee)}
        </p>
        <p className="text-blue-100 mt-2 text-sm">
          Impot apres refaction : <strong>{fmtEur(res.impotApresRefaction)}</strong>
          {" "}· Baisse effective : <strong>{fmtPct(res.tauxBaisseEffectif)}</strong>
        </p>
        {res.plafondAtteint && (
          <p className="mt-2 text-xs bg-white/10 rounded-lg px-3 py-1 inline-block">
            Plafond de {plafondLabel} atteint — reduction maximale appliquee
          </p>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-3 mb-4">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Reduction theorique</p>
          <p className="text-xl font-bold text-slate-800">{fmtEur(res.reductionTheorique)}</p>
          <p className="text-xs text-slate-400">{tauxLabel} x impot bareme</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Plafond legal</p>
          <p className="text-xl font-bold text-slate-800">{plafondLabel}</p>
          <p className="text-xs text-slate-400">
            {res.taux === 0.30 ? "Zone 30 % (Antilles, Reunion)" : "Zone 40 % (Guyane, Mayotte)"}
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-xs text-slate-500">Impot apres refaction</p>
          <p className="text-xl font-bold text-blue-700">{fmtEur(res.impotApresRefaction)}</p>
          <p className="text-xs text-slate-400">apres deduction automatique</p>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
        <p className="font-semibold text-indigo-900 mb-3">Comparaison par zone</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-indigo-200">
              <th className="py-2 text-left text-slate-600 font-medium">Situation</th>
              <th className="py-2 text-right text-slate-600 font-medium">Impot final</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-indigo-100">
              <td className="py-2 text-slate-700">Metropole (0 % de refaction)</td>
              <td className="py-2 text-right font-bold text-red-600">{fmtEur(res.impotMetropole)}</td>
            </tr>
            <tr className="border-b border-indigo-100">
              <td className="py-2 text-slate-700">Zone 30 % — Guadeloupe, Martinique, Reunion</td>
              <td className="py-2 text-right font-bold text-indigo-700">{fmtEur(res.impotZone30)}</td>
            </tr>
            <tr>
              <td className="py-2 text-slate-700">Zone 40 % — Guyane, Mayotte</td>
              <td className="py-2 text-right font-bold text-emerald-700">{fmtEur(res.impotZone40)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-400 mt-4 text-center">
        Refaction automatique art. 197-I-3 CGI. S&apos;applique sur l&apos;impot du bareme apres decote
        et avant les autres reductions/credits d&apos;impot. Consultez votre centre des finances publiques
        pour votre situation personnelle.
      </p>
    </div>
  );
}
