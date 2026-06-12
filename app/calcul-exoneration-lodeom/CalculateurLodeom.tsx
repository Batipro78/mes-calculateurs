"use client";

import { useState, useMemo } from "react";
import {
  calculerLodeom,
  calculerCoefficient,
  fmtEur,
  fmtPct,
  SMIC_ANNUEL,
  T_MOINS_11,
  T_11_ET_PLUS,
  BAREMES_INFO,
  type Bareme,
  type Effectif,
} from "./lodeomCalc";

export default function CalculateurLodeom() {
  const [bareme, setBareme] = useState<Bareme>("competitivite-renforcee");
  const [effectif, setEffectif] = useState<Effectif>("moins-11");
  const [salaireMensuel, setSalaireMensuel] = useState(2500);

  const res = useMemo(
    () => calculerLodeom({ bareme, effectif, salaireMensuelBrut: salaireMensuel }),
    [bareme, effectif, salaireMensuel]
  );

  // Comparatif des 3 baremes avec le meme salaire
  const comparatif = useMemo(() => {
    const T = effectif === "moins-11" ? T_MOINS_11 : T_11_ET_PLUS;
    const remAnnuelle = salaireMensuel * 12;
    return (["competitivite", "competitivite-renforcee", "innovation-croissance"] as Bareme[]).map((b) => {
      const { coefficient } = calculerCoefficient(b, T, remAnnuelle, SMIC_ANNUEL);
      return {
        bareme: b,
        label: BAREMES_INFO[b].label,
        exoAnnuelle: coefficient * remAnnuelle,
        coefficient,
      };
    });
  }, [salaireMensuel, effectif]);

  const zoneColor =
    res.zone === "totale"
      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
      : res.zone === "degressive"
      ? "bg-amber-50 border-amber-200 text-amber-800"
      : "bg-red-50 border-red-200 text-red-800";

  const zoneLabel =
    res.zone === "totale"
      ? "Exoneration totale"
      : res.zone === "degressive"
      ? "Exoneration degressive"
      : "Hors plafond — exoneration nulle";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-4">Parametres du calcul</h3>

      {/* Bareme */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-slate-500 mb-1">Bareme LODEOM</label>
        <select
          value={bareme}
          onChange={(e) => setBareme(e.target.value as Bareme)}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-400 bg-white"
        >
          {(Object.entries(BAREMES_INFO) as Array<[Bareme, { label: string; description: string; seuilTotale: string; seuilNulle: string }]>).map(([key, info]) => (
            <option key={key} value={key}>
              {info.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-slate-400 mt-1">{BAREMES_INFO[bareme].description}</p>
      </div>

      {/* Effectif + Salaire */}
      <div className="grid gap-4 sm:grid-cols-2 mb-5">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Effectif de l&apos;entreprise</label>
          <select
            value={effectif}
            onChange={(e) => setEffectif(e.target.value as Effectif)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-400 bg-white"
          >
            <option value="moins-11">Moins de 11 salaries (T = 0,3201)</option>
            <option value="11-et-plus">11 salaries et plus (T = 0,3241)</option>
          </select>
          <p className="text-xs text-slate-400 mt-1">Impacte le taux FNAL (0,10 % ou 0,50 %)</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Salaire mensuel brut</label>
          <div className="relative">
            <input
              type="number"
              value={salaireMensuel}
              onChange={(e) => setSalaireMensuel(parseFloat(e.target.value) || 0)}
              min={0}
              step={100}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">EUR</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">SMIC mensuel 2026 : 1 823,03 EUR</p>
        </div>
      </div>

      {/* Zone indicateur */}
      <div className={`rounded-xl border px-4 py-2 text-sm font-semibold mb-5 ${zoneColor}`}>
        {zoneLabel} — seuil total : {res.seuilBas} SMIC, seuil nul : {res.seuilHaut} SMIC
      </div>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-lg shadow-blue-200/50 mb-5">
        <p className="text-blue-100 text-sm mb-1">Exoneration annuelle estimee</p>
        <p className="text-4xl font-extrabold">{fmtEur(res.exonerationAnnuelle)}</p>
        <p className="text-blue-100 mt-2 text-sm">
          Soit <strong>{fmtEur(res.exonerationMensuelle)}</strong> par mois ({fmtPct(res.pourcentageBrut)} du salaire brut)
        </p>
      </div>

      {/* Details */}
      <div className="grid gap-3 sm:grid-cols-3 mb-5">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Remuneration annuelle</p>
          <p className="text-lg font-bold text-slate-800">{fmtEur(res.remAnnuelle)}</p>
          <p className="text-xs text-slate-400">= {salaireMensuel.toLocaleString("fr-FR")} EUR x 12</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Ratio salaire / SMIC</p>
          <p className="text-lg font-bold text-slate-800">{res.ratioSmic.toFixed(3)}</p>
          <p className="text-xs text-slate-400">SMIC annuel : {fmtEur(SMIC_ANNUEL)}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Coefficient applique</p>
          <p className="text-lg font-bold text-slate-800">{res.coefficient.toFixed(4)}</p>
          <p className="text-xs text-slate-400">T de reference : {res.T}</p>
        </div>
      </div>

      {/* Comparatif 3 baremes */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
        <p className="font-semibold text-indigo-900 mb-3">Comparatif des 3 baremes pour ce salaire</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-indigo-200 text-xs text-indigo-600">
              <th className="py-1 text-left font-medium">Bareme</th>
              <th className="py-1 text-right font-medium">Coeff.</th>
              <th className="py-1 text-right font-medium">Exo / an</th>
            </tr>
          </thead>
          <tbody>
            {comparatif.map((c) => (
              <tr key={c.bareme} className={`border-b border-indigo-100 last:border-0 ${c.bareme === bareme ? "font-semibold" : ""}`}>
                <td className="py-2 text-slate-700">
                  {c.bareme === bareme ? "▶ " : ""}{c.label}
                </td>
                <td className="py-2 text-right text-slate-600">{c.coefficient.toFixed(4)}</td>
                <td className={`py-2 text-right font-bold ${c.exoAnnuelle > 0 ? "text-emerald-700" : "text-slate-400"}`}>
                  {fmtEur(c.exoAnnuelle)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-400 mt-4 text-center">
        Estimation indicative. Le calcul officiel se fait sur mon-entreprise.urssaf.fr.
        Verifiez l&apos;eligibilite sectorielle aupres de votre Urssaf.
        Saint-Barthelemy, Saint-Martin et Mayotte ont des regles specifiques.
      </p>
    </div>
  );
}
