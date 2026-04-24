"use client";

import { useState, useMemo } from "react";
import { calculerPrestation, fmtEur } from "./prestationCalc";

export default function CalculateurPrestation() {
  const [revenuDemandeur, setRevenuDemandeur] = useState(24000);
  const [revenuDebiteur, setRevenuDebiteur] = useState(60000);
  const [dureeMariage, setDureeMariage] = useState(15);
  const [ageDemandeur, setAgeDemandeur] = useState(45);
  const [nbEnfants, setNbEnfants] = useState(2);
  const [patrimoine, setPatrimoine] = useState(100000);

  const res = useMemo(
    () => calculerPrestation({
      revenuAnnuelDemandeur: revenuDemandeur,
      revenuAnnuelDebiteur: revenuDebiteur,
      dureeMariage, ageDemandeur, nbEnfantsDemandeur: nbEnfants,
      patrimoineCommun: patrimoine,
    }),
    [revenuDemandeur, revenuDebiteur, dureeMariage, ageDemandeur, nbEnfants, patrimoine]
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2 mb-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Revenu annuel net : demandeur</label>
          <div className="relative">
            <input type="number" value={revenuDemandeur} onChange={(e) => setRevenuDemandeur(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-violet-400" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">EUR/an</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Conjoint au revenu plus faible</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Revenu annuel net : debiteur</label>
          <div className="relative">
            <input type="number" value={revenuDebiteur} onChange={(e) => setRevenuDebiteur(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-violet-400" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">EUR/an</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Conjoint au revenu plus eleve</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-5">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Duree du mariage (annees)</label>
          <input type="number" value={dureeMariage} onChange={(e) => setDureeMariage(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-violet-400" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Age du demandeur</label>
          <input type="number" value={ageDemandeur} onChange={(e) => setAgeDemandeur(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-violet-400" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Enfants a charge</label>
          <select value={nbEnfants} onChange={(e) => setNbEnfants(parseInt(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-violet-400 bg-white">
            <option value="0">Aucun</option>
            <option value="1">1 enfant</option>
            <option value="2">2 enfants</option>
            <option value="3">3 enfants</option>
            <option value="4">4+ enfants</option>
          </select>
        </div>
      </div>

      {/* Resultat */}
      <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg shadow-violet-200/50 mb-5">
        <p className="text-violet-100 text-sm mb-1">Montant estime indicatif</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmtEur(res.montantEstime)}</p>
        <p className="text-violet-100 mt-2 text-sm">
          Fourchette : {fmtEur(res.plancher)} - {fmtEur(res.plafond)}
        </p>
      </div>

      {/* 3 methodes */}
      <div className="grid gap-3 sm:grid-cols-3 mb-4">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Methode Depondt (CA Paris)</p>
          <p className="text-xl font-bold text-violet-600">{fmtEur(res.methodeDepondt)}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Methode moyenne</p>
          <p className="text-xl font-bold text-violet-600">{fmtEur(res.methodeMoyenne)}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Methode age + esperance</p>
          <p className="text-xl font-bold text-violet-600">{fmtEur(res.methodeAgeesperanceVie)}</p>
        </div>
      </div>

      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 mb-4">
        <p className="text-sm text-amber-900">{res.commentaire}</p>
      </div>

      <p className="text-xs text-slate-400 text-center">
        Estimation INDICATIVE. La prestation compensatoire est fixee par le juge selon l&apos;article 271 du Code civil,
        en tenant compte de nombreux facteurs (duree mariage, age, sante, qualifications, patrimoine, droits retraite).
        Consultez un avocat pour votre situation specifique.
      </p>
    </div>
  );
}
