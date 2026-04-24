"use client";

import { useState, useMemo } from "react";
import {
  calculerAssurance,
  fmtEur,
  TAUX_BANQUE_MOYEN,
  TAUX_DELEGATION_MOYEN,
  type ProfilAge,
  type TypeProfil,
} from "./assuranceEmprunteurCalc";

export default function SimulateurAssuranceEmprunteur() {
  const [capital, setCapital] = useState(200000);
  const [dureeAnnees, setDureeAnnees] = useState(20);
  const [profilAge, setProfilAge] = useState<ProfilAge>("adulte");
  const [typeProfil, setTypeProfil] = useState<TypeProfil>("non-fumeur");
  const [quotite, setQuotite] = useState(100);
  const [tauxBanque, setTauxBanque] = useState(0.40);
  const [tauxDelegation, setTauxDelegation] = useState(0.15);

  const res = useMemo(
    () => calculerAssurance({ capital, dureeAnnees, tauxBanque, tauxDelegation, quotiteCouverture: quotite }),
    [capital, dureeAnnees, tauxBanque, tauxDelegation, quotite]
  );

  const applyDefaults = (age: ProfilAge, type: TypeProfil) => {
    setTauxBanque(TAUX_BANQUE_MOYEN[age][type]);
    setTauxDelegation(TAUX_DELEGATION_MOYEN[age][type]);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      {/* Inputs */}
      <div className="grid gap-4 sm:grid-cols-2 mb-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Capital emprunte</label>
          <div className="relative">
            <input
              type="number"
              value={capital}
              onChange={(e) => setCapital(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-indigo-400"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">EUR</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Duree du pret (annees)</label>
          <input
            type="number"
            value={dureeAnnees}
            onChange={(e) => setDureeAnnees(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-indigo-400"
          />
        </div>
      </div>

      {/* Profil */}
      <div className="grid gap-4 sm:grid-cols-2 mb-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Tranche d&apos;age</label>
          <select
            value={profilAge}
            onChange={(e) => {
              const v = e.target.value as ProfilAge;
              setProfilAge(v);
              applyDefaults(v, typeProfil);
            }}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-indigo-400 bg-white"
          >
            <option value="jeune">20-35 ans</option>
            <option value="adulte">35-50 ans</option>
            <option value="senior">50-65 ans</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Profil tabac</label>
          <select
            value={typeProfil}
            onChange={(e) => {
              const v = e.target.value as TypeProfil;
              setTypeProfil(v);
              applyDefaults(profilAge, v);
            }}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-indigo-400 bg-white"
          >
            <option value="non-fumeur">Non-fumeur</option>
            <option value="fumeur">Fumeur</option>
          </select>
        </div>
      </div>

      {/* Taux personnalisables */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Taux banque (%/an)</label>
          <input
            type="number"
            step="0.01"
            value={tauxBanque}
            onChange={(e) => setTauxBanque(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-400"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Taux delegation (%/an)</label>
          <input
            type="number"
            step="0.01"
            value={tauxDelegation}
            onChange={(e) => setTauxDelegation(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-400"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Quotite (%)</label>
          <select
            value={quotite}
            onChange={(e) => setQuotite(parseInt(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-400 bg-white"
          >
            <option value="100">100% (seul)</option>
            <option value="200">200% (couple 50/50)</option>
            <option value="150">150% (couple 50/100)</option>
          </select>
        </div>
      </div>

      {/* Resultats */}
      <div className="grid gap-4 sm:grid-cols-2 mb-5">
        <div className="bg-gradient-to-br from-slate-500 to-slate-700 text-white rounded-2xl p-5">
          <p className="text-slate-200 text-sm mb-1">Assurance banque</p>
          <p className="text-3xl font-extrabold">{fmtEur(res.coutMensuelBanque)}</p>
          <p className="text-slate-200 text-sm">/mois</p>
          <div className="h-px bg-white/20 my-3" />
          <p className="text-slate-200 text-xs">Cout total sur {dureeAnnees} ans</p>
          <p className="text-xl font-bold">{fmtEur(res.coutTotalBanque)}</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-5">
          <p className="text-indigo-100 text-sm mb-1">Assurance delegation</p>
          <p className="text-3xl font-extrabold">{fmtEur(res.coutMensuelDelegation)}</p>
          <p className="text-indigo-100 text-sm">/mois</p>
          <div className="h-px bg-white/20 my-3" />
          <p className="text-indigo-100 text-xs">Cout total sur {dureeAnnees} ans</p>
          <p className="text-xl font-bold">{fmtEur(res.coutTotalDelegation)}</p>
        </div>
      </div>

      {/* Economie */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg shadow-emerald-200/50">
        <p className="text-emerald-100 mb-1 text-sm">Economie totale avec la delegation</p>
        <p className="text-4xl font-extrabold">{fmtEur(res.economieTotale)}</p>
        <p className="text-emerald-100 mt-1 text-sm">
          soit {fmtEur(res.economieMensuelle)}/mois ({res.pctEconomie.toFixed(0)}% moins cher)
        </p>
      </div>

      <p className="text-xs text-slate-400 mt-4 text-center">
        Estimation indicative. Les taux reels dependent de votre dossier medical, profession et de l&apos;assureur.
        Loi Lemoine 2022 permet la resiliation a tout moment.
      </p>
    </div>
  );
}
