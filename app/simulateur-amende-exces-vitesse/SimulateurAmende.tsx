"use client";

import { useState, useMemo } from "react";
import { calculerAmende, fmtEur } from "./amendeCalc";

export default function SimulateurAmende() {
  const [vitesseMesuree, setVitesseMesuree] = useState(120);
  const [vitesseAutorisee, setVitesseAutorisee] = useState(90);

  const res = useMemo(
    () => calculerAmende({ vitesseMesuree, vitesseAutorisee }),
    [vitesseMesuree, vitesseAutorisee]
  );

  const isDelit = res.tribunalCorrectionnel;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2 mb-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Vitesse mesurée par le radar (km/h)</label>
          <input type="number" value={vitesseMesuree} onChange={(e) => setVitesseMesuree(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-red-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Vitesse maximale autorisée (km/h)</label>
          <select value={vitesseAutorisee} onChange={(e) => setVitesseAutorisee(parseInt(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-red-400 bg-white">
            <option value="30">30 (zone 30)</option>
            <option value="50">50 (ville)</option>
            <option value="70">70</option>
            <option value="80">80 (route)</option>
            <option value="90">90 (route / 2+1)</option>
            <option value="110">110 (voie rapide)</option>
            <option value="130">130 (autoroute)</option>
          </select>
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-5">
        Le calculateur retranche d&apos;abord la marge technique du radar (5 km/h sous 100 km/h, 5 % à partir de 100 km/h).
        {vitesseMesuree > 0 && (<> Vitesse retenue = <strong>{res.vitesseRetenue} km/h</strong>.</>)}
      </p>

      {res.depassement <= 0 ? (
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 mb-5">
          <p className="text-emerald-100 text-sm mb-1">Aucune infraction</p>
          <p className="text-3xl font-extrabold">Vitesse retenue dans la limite</p>
          <p className="text-emerald-100 mt-1 text-sm">{res.description}</p>
        </div>
      ) : (
        <>
          <div className={`bg-gradient-to-br ${isDelit ? "from-red-700 to-rose-800" : "from-red-500 to-orange-600"} text-white rounded-2xl p-6 shadow-lg shadow-red-200/50 mb-5`}>
            <p className="text-red-100 text-sm mb-1">{isDelit ? "Délit routier" : "Contravention"}</p>
            <p className="text-5xl font-extrabold">+{res.depassement} km/h</p>
            <p className="text-red-100 mt-2 text-sm">{res.description}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 mb-5">
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
              <p className="text-xs text-emerald-700 font-medium">Amende minorée</p>
              <p className="text-2xl font-bold text-emerald-700">{fmtEur(res.amendeMinoree)}</p>
              <p className="text-xs text-emerald-600 mt-1">{isDelit ? "paiement sous 15 jours" : "paiement sous 15 jours (30 jours en ligne)"}</p>
            </div>
            <div className="bg-slate-100 rounded-xl p-4 border border-slate-200">
              <p className="text-xs text-slate-600 font-medium">Amende forfaitaire</p>
              <p className="text-2xl font-bold text-slate-800">{fmtEur(res.amendeForfaitaire)}</p>
              <p className="text-xs text-slate-500 mt-1">{isDelit ? "montant standard" : "paiement standard (45 jours, 60 en ligne)"}</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <p className="text-xs text-red-700 font-medium">Amende majorée</p>
              <p className="text-2xl font-bold text-red-700">{fmtEur(res.amendeMajoree)}</p>
              <p className="text-xs text-red-600 mt-1">{isDelit ? "en cas de retard" : "paiement après ces délais"}</p>
            </div>
          </div>

          {/* Conséquences */}
          <div className="bg-amber-50 rounded-xl p-5 border border-amber-200 mb-4">
            <p className="font-semibold text-amber-900 mb-3">Conséquences sur le permis</p>
            <ul className="text-sm text-amber-900 space-y-1.5">
              <li>
                • <strong>{res.pointsRetires === 0 ? "Aucun point retiré" : `Retrait de ${res.pointsRetires} point${res.pointsRetires > 1 ? "s" : ""}`}</strong>
              </li>
              {res.suspensionPossible && <li>• <strong>Suspension possible</strong> du permis (3 ans maximum), si le juge la prononce</li>}
              {res.suspensionPossible && !isDelit && <li>• Stage de sensibilisation possible, aux frais du conducteur, si le juge l&apos;ordonne</li>}
              {isDelit && <li>• <strong className="text-red-700">Si vous refusez l&apos;amende forfaitaire délictuelle</strong> : tribunal correctionnel, jusqu&apos;à 3 750 EUR et 3 mois de prison</li>}
              {isDelit && <li>• Confiscation du véhicule possible (obligatoire en cas de récidive)</li>}
            </ul>
          </div>
        </>
      )}

      <p className="text-xs text-slate-400 text-center">
        Barème au 7 octobre 2026 (service-public.fr). Estimation indicative : seule la décision de l&apos;administration ou du juge fait foi.
      </p>
    </div>
  );
}
