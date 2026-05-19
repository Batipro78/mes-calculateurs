"use client";

import { useEffect, useState } from "react";
import {
  DATES_2026_2030,
  getProchaineRamadan,
  getProchainAid,
  joursAvant,
  dureeRamadan,
  formatDateFR,
  formatDateFRShort,
} from "./ramadanCalc";

export default function CalculDateRamadan() {
  const [joursAvantRamadan, setJoursAvantRamadan] = useState<number | null>(null);
  const [joursAvantAid, setJoursAvantAid] = useState<number | null>(null);

  useEffect(() => {
    const prochaineRamadan = getProchaineRamadan();
    const jours = joursAvant(prochaineRamadan.ramadanDebut);
    setJoursAvantRamadan(jours);

    const prochainAid = getProchainAid();
    const joursAid = joursAvant(prochainAid.date);
    setJoursAvantAid(joursAid);
  }, []);

  const prochaineRamadan = getProchaineRamadan();
  const prochainAid = getProchainAid();

  return (
    <div className="grid gap-8">
      {/* Compte à rebours Ramadan */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-8">
        <h2 className="text-sm font-semibold text-emerald-700 uppercase tracking-wide mb-2">
          Prochain Ramadan
        </h2>
        <p className="text-slate-600 mb-4">
          {formatDateFR(prochaineRamadan.ramadanDebut)}
        </p>
        <div className="flex items-baseline gap-4">
          <div className="text-5xl font-extrabold text-emerald-600">
            {joursAvantRamadan === null ? "—" : joursAvantRamadan}
          </div>
          <div className="text-lg text-slate-600">
            {joursAvantRamadan === 1 ? "jour avant" : "jours avant"}
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-4">
          Durée estimée : {dureeRamadan(prochaineRamadan.annee)} jours
        </p>
      </div>

      {/* Prochain Aïd */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-4">
          Prochain Aïd
        </h2>
        <div className="flex items-start gap-4">
          <div>
            <p className="text-sm text-slate-500 mb-1">
              {prochainAid.type === "fitr"
                ? "Aïd al-Fitr (Fête de la Rupture)"
                : "Aïd al-Adha (Fête du Sacrifice)"}
            </p>
            <p className="text-lg font-semibold text-slate-800 mb-3">
              {formatDateFR(prochainAid.date)}
            </p>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-emerald-600">
                {joursAvantAid === null ? "—" : joursAvantAid}
              </div>
              <div className="text-sm text-slate-600">jours</div>
            </div>
          </div>
          {!DATES_2026_2030.find((d) => d.annee === prochainAid.annee)?.confirme && (
            <div className="ml-auto bg-amber-100 border border-amber-300 rounded-lg px-3 py-1 text-xs font-medium text-amber-800">
              Estimation
            </div>
          )}
        </div>
      </div>

      {/* Tableau 5 années */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left py-3 px-4 text-slate-600 font-semibold">
                  Année
                </th>
                <th className="text-left py-3 px-4 text-slate-600 font-semibold">
                  Ramadan (début)
                </th>
                <th className="text-left py-3 px-4 text-slate-600 font-semibold">
                  Aïd al-Fitr
                </th>
                <th className="text-left py-3 px-4 text-slate-600 font-semibold">
                  Aïd al-Adha
                </th>
                <th className="text-center py-3 px-4 text-slate-600 font-semibold">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody>
              {DATES_2026_2030.map((dates, idx) => (
                <tr
                  key={dates.annee}
                  className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                >
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    {dates.annee}
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    {formatDateFRShort(dates.ramadanDebut)}
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    {formatDateFRShort(dates.aidAlFitr)}
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    {formatDateFRShort(dates.aidAlAdha)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {dates.confirme ? (
                      <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-1 rounded">
                        Confirmé
                      </span>
                    ) : (
                      <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded">
                        Estimation
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
