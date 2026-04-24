"use client";

import { useState, useMemo } from "react";
import { calculerLoaLld, fmtEur } from "./loaLldCalc";

export default function SimulateurLoaLld() {
  const [prixVehicule, setPrixVehicule] = useState(30000);
  const [apport, setApport] = useState(3000);
  const [loyer, setLoyer] = useState(350);
  const [duree, setDuree] = useState(48);
  const [valeurResiduelle, setValeurResiduelle] = useState(12000);
  const [kmAn, setKmAn] = useState(15000);

  const res = useMemo(
    () => calculerLoaLld({
      prixVehicule, apportInitial: apport, loyerMensuel: loyer,
      dureeMonths: duree, valeurResiduelleLOA: valeurResiduelle, kmParAn: kmAn,
    }),
    [prixVehicule, apport, loyer, duree, valeurResiduelle, kmAn]
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-3 mb-5">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Prix catalogue vehicule</label>
          <div className="relative">
            <input type="number" value={prixVehicule} onChange={(e) => setPrixVehicule(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-sky-400" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">EUR</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Apport initial</label>
          <div className="relative">
            <input type="number" value={apport} onChange={(e) => setApport(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-sky-400" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">EUR</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Km par an</label>
          <input type="number" value={kmAn} onChange={(e) => setKmAn(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-sky-400" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-5">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Loyer mensuel</label>
          <div className="relative">
            <input type="number" value={loyer} onChange={(e) => setLoyer(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-sky-400" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">EUR</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Duree (mois)</label>
          <select value={duree} onChange={(e) => setDuree(parseInt(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-sky-400 bg-white">
            <option value="24">24 mois (2 ans)</option>
            <option value="36">36 mois (3 ans)</option>
            <option value="48">48 mois (4 ans)</option>
            <option value="60">60 mois (5 ans)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Valeur residuelle (LOA)</label>
          <div className="relative">
            <input type="number" value={valeurResiduelle} onChange={(e) => setValeurResiduelle(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-sky-400" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">EUR</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Option d&apos;achat fin contrat</p>
        </div>
      </div>

      {/* Comparaison */}
      <div className="grid gap-4 sm:grid-cols-2 mb-5">
        <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl p-5">
          <p className="text-sky-100 text-sm mb-1">LOA avec rachat (devenir proprietaire)</p>
          <p className="text-3xl font-extrabold">{fmtEur(res.coutTotalLOA)}</p>
          <div className="h-px bg-white/20 my-3" />
          <div className="text-xs space-y-1">
            <p><span className="text-sky-100">Apport :</span> {fmtEur(apport)}</p>
            <p><span className="text-sky-100">Loyers :</span> {fmtEur(loyer * duree)}</p>
            <p><span className="text-sky-100">Rachat :</span> {fmtEur(valeurResiduelle)}</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-5">
          <p className="text-emerald-100 text-sm mb-1">LLD (restitution vehicule)</p>
          <p className="text-3xl font-extrabold">{fmtEur(res.coutTotalLLD)}</p>
          <div className="h-px bg-white/20 my-3" />
          <div className="text-xs space-y-1">
            <p><span className="text-emerald-100">Apport :</span> {fmtEur(apport)}</p>
            <p><span className="text-emerald-100">Loyers :</span> {fmtEur(loyer * duree)}</p>
            <p><span className="text-emerald-100">Restitution :</span> 0 EUR</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-5">
        <p className="text-sm font-medium text-slate-700 mb-2">Resume</p>
        <ul className="text-sm text-slate-600 space-y-1.5">
          <li>• Cout location sans rachat : <strong>{fmtEur(res.coutSansRachatLOA)}</strong></li>
          <li>• Rachat (valeur residuelle) : <strong>{fmtEur(valeurResiduelle)}</strong> ({(res.ratioRachatValeur * 100).toFixed(0)}% du prix neuf)</li>
          <li>• Difference LOA rachete vs LLD : <strong>{fmtEur(res.differenceAvecRachat)}</strong></li>
        </ul>
      </div>

      <p className="text-xs text-slate-400 mt-4 text-center">
        Comparaison simplifiee. En LLD, l&apos;entretien est souvent inclus. En LOA, vous pouvez aussi restituer (ne pas lever l&apos;option).
      </p>
    </div>
  );
}
