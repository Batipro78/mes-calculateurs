"use client";

import { useState, useMemo } from "react";
import { calculerLMNP, fmtEur } from "./lmnpCalc";

export default function CalculateurLMNP() {
  const [prixBien, setPrixBien] = useState(200000);
  const [valeurTerrain, setValeurTerrain] = useState(30000);
  const [valeurMobilier, setValeurMobilier] = useState(10000);
  const [dureeBien, setDureeBien] = useState(30);
  const [dureeMobilier, setDureeMobilier] = useState(7);
  const [loyersAnnuels, setLoyersAnnuels] = useState(12000);
  const [charges, setCharges] = useState(3500);
  const [tmi, setTmi] = useState(30);

  const res = useMemo(
    () => calculerLMNP({
      prixBienTotal: prixBien, valeurTerrain, valeurMobilier,
      dureeAmortBien: dureeBien, dureeAmortMobilier: dureeMobilier,
      loyersAnnuelsHT: loyersAnnuels, chargesDeductibles: charges, tmi,
    }),
    [prixBien, valeurTerrain, valeurMobilier, dureeBien, dureeMobilier, loyersAnnuels, charges, tmi]
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-3">Valorisation du bien</h3>
      <div className="grid gap-4 sm:grid-cols-3 mb-5">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Prix total (avec frais notaire)</label>
          <div className="relative">
            <input type="number" value={prixBien} onChange={(e) => setPrixBien(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-teal-400" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">EUR</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Valeur terrain (non amort.)</label>
          <div className="relative">
            <input type="number" value={valeurTerrain} onChange={(e) => setValeurTerrain(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-teal-400" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">EUR</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">~10-20% du prix</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Valeur mobilier</label>
          <div className="relative">
            <input type="number" value={valeurMobilier} onChange={(e) => setValeurMobilier(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-teal-400" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">EUR</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-5">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Duree amort. bien (annees)</label>
          <select value={dureeBien} onChange={(e) => setDureeBien(parseInt(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-teal-400 bg-white">
            <option value="25">25 ans</option>
            <option value="30">30 ans (standard)</option>
            <option value="35">35 ans</option>
            <option value="40">40 ans</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Duree amort. mobilier (annees)</label>
          <select value={dureeMobilier} onChange={(e) => setDureeMobilier(parseInt(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-teal-400 bg-white">
            <option value="5">5 ans</option>
            <option value="7">7 ans (standard)</option>
            <option value="10">10 ans</option>
          </select>
        </div>
      </div>

      <h3 className="font-bold text-slate-800 mb-3">Revenus et charges</h3>
      <div className="grid gap-4 sm:grid-cols-3 mb-5">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Loyers annuels HT</label>
          <div className="relative">
            <input type="number" value={loyersAnnuels} onChange={(e) => setLoyersAnnuels(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-teal-400" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">EUR</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Charges deductibles</label>
          <div className="relative">
            <input type="number" value={charges} onChange={(e) => setCharges(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-teal-400" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">EUR</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Taxe, copro, interets, assurance</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Votre TMI</label>
          <select value={tmi} onChange={(e) => setTmi(parseInt(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-teal-400 bg-white">
            <option value="0">0%</option>
            <option value="11">11%</option>
            <option value="30">30%</option>
            <option value="41">41%</option>
            <option value="45">45%</option>
          </select>
        </div>
      </div>

      <div className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-2xl p-6 shadow-lg shadow-teal-200/50 mb-5">
        <p className="text-teal-100 text-sm mb-1">Amortissement annuel total</p>
        <p className="text-4xl font-extrabold">{fmtEur(res.amortissementTotalAnnuel)}</p>
        <p className="text-teal-100 mt-2 text-sm">
          Economie d&apos;impot annuelle : <strong>{fmtEur(res.economieImpot)}</strong>
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 mb-4">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Amort. bien /an</p>
          <p className="text-xl font-bold text-slate-800">{fmtEur(res.amortissementBienAnnuel)}</p>
          <p className="text-xs text-slate-400">sur {dureeBien} ans</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Amort. mobilier /an</p>
          <p className="text-xl font-bold text-slate-800">{fmtEur(res.amortissementMobilierAnnuel)}</p>
          <p className="text-xs text-slate-400">sur {dureeMobilier} ans</p>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
        <p className="font-semibold text-emerald-900 mb-3">Regime reel vs micro-BIC</p>
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-emerald-200">
              <td className="py-2 text-slate-700">Impot annuel (micro-BIC)</td>
              <td className="py-2 text-right font-bold text-red-600">{fmtEur(res.impotSansLMNP)}</td>
            </tr>
            <tr className="border-b border-emerald-200">
              <td className="py-2 text-slate-700">Impot annuel (reel avec amortissement)</td>
              <td className="py-2 text-right font-bold text-emerald-700">{fmtEur(res.impotAvecLMNPReel)}</td>
            </tr>
            <tr>
              <td className="py-2 text-slate-700 font-semibold">Gain regime reel</td>
              <td className="py-2 text-right font-bold text-emerald-600 text-lg">+{fmtEur(res.gainRegimeReel)}/an</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-400 mt-4 text-center">
        Regime BIC reel simplifie. L&apos;amortissement ne peut creer de deficit fiscal (plafond au resultat imposable).
        Declaration 2031-SD obligatoire. Consultez un expert-comptable pour votre situation.
      </p>
    </div>
  );
}
