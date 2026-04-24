"use client";

import { useState, useMemo } from "react";
import { calculerAmende, fmtEur, type Zone } from "./amendeCalc";

export default function SimulateurAmende() {
  const [vitesseMesuree, setVitesseMesuree] = useState(120);
  const [vitesseAutorisee, setVitesseAutorisee] = useState(90);
  const [zone, setZone] = useState<Zone>("hors-ville");

  const res = useMemo(
    () => calculerAmende({ vitesseMesuree, vitesseAutorisee, zone }),
    [vitesseMesuree, vitesseAutorisee, zone]
  );

  const isDelit = res.tribunalCorrectionnel;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-3 mb-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Vitesse mesuree (km/h)</label>
          <input type="number" value={vitesseMesuree} onChange={(e) => setVitesseMesuree(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-red-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Vitesse autorisee (km/h)</label>
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
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Zone</label>
          <select value={zone} onChange={(e) => setZone(e.target.value as Zone)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-red-400 bg-white">
            <option value="ville">En agglomeration</option>
            <option value="hors-ville">Hors agglomeration</option>
          </select>
        </div>
      </div>

      {res.depassement <= 0 ? (
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 mb-5">
          <p className="text-emerald-100 text-sm mb-1">Aucune infraction</p>
          <p className="text-3xl font-extrabold">Vitesse dans la limite</p>
          <p className="text-emerald-100 mt-1 text-sm">{res.description}</p>
        </div>
      ) : (
        <>
          <div className={`bg-gradient-to-br ${isDelit ? "from-red-700 to-rose-800" : "from-red-500 to-orange-600"} text-white rounded-2xl p-6 shadow-lg shadow-red-200/50 mb-5`}>
            <p className="text-red-100 text-sm mb-1">{isDelit ? "DELIT routier" : "Contravention"}</p>
            <p className="text-5xl font-extrabold">+{res.depassement} km/h</p>
            <p className="text-red-100 mt-2 text-sm">{res.description}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 mb-5">
            {res.amendeMinoree > 0 && (
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <p className="text-xs text-emerald-700 font-medium">Amende minoree</p>
                <p className="text-2xl font-bold text-emerald-700">{fmtEur(res.amendeMinoree)}</p>
                <p className="text-xs text-emerald-600 mt-1">paiement sous 15 jours</p>
              </div>
            )}
            <div className="bg-slate-100 rounded-xl p-4 border border-slate-200">
              <p className="text-xs text-slate-600 font-medium">Amende forfaitaire</p>
              <p className="text-2xl font-bold text-slate-800">{fmtEur(res.amendeForfaitaire)}</p>
              <p className="text-xs text-slate-500 mt-1">paiement standard</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <p className="text-xs text-red-700 font-medium">Amende majoree</p>
              <p className="text-2xl font-bold text-red-700">{fmtEur(res.amendeMajoree)}</p>
              <p className="text-xs text-red-600 mt-1">paiement au-dela de 45 jours</p>
            </div>
          </div>

          {/* Consequences */}
          <div className="bg-amber-50 rounded-xl p-5 border border-amber-200 mb-4">
            <p className="font-semibold text-amber-900 mb-3">Consequences sur le permis</p>
            <ul className="text-sm text-amber-900 space-y-1.5">
              <li>• <strong>Retrait de {res.pointsRetires} point{res.pointsRetires > 1 ? "s" : ""}</strong> du permis</li>
              {res.suspensionObligatoire && <li>• <strong className="text-red-700">Suspension OBLIGATOIRE du permis</strong> (3 ans maximum)</li>}
              {res.suspensionPossible && !res.suspensionObligatoire && <li>• <strong>Suspension possible</strong> du permis (jusqu&apos;a 3 ans)</li>}
              {res.stageObligatoire && <li>• <strong>Stage de sensibilisation obligatoire</strong> (150-250 EUR)</li>}
              {res.tribunalCorrectionnel && <li>• <strong className="text-red-700">Convocation au tribunal correctionnel</strong></li>}
            </ul>
          </div>
        </>
      )}

      <p className="text-xs text-slate-400 text-center">
        Bareme officiel Code de la route 2026. Pour un delit (&gt;= 50 km/h), l&apos;amende peut atteindre 3 750 EUR devant le tribunal.
      </p>
    </div>
  );
}
