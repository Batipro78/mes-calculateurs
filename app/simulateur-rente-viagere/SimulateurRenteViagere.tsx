"use client";

import { useState, useMemo } from "react";
import { calculerRente, fmtEur } from "./renteViagereCalc";

export default function SimulateurRenteViagere() {
  const [capital, setCapital] = useState(200000);
  const [ageAuVersement, setAgeAuVersement] = useState(65);
  const [typeContrat, setTypeContrat] = useState<"assurance-vie" | "per" | "dsk">("assurance-vie");
  const [reversion, setReversion] = useState(false);

  const res = useMemo(
    () => calculerRente({ capital, ageAuVersement, typeContrat, reversionConjoint: reversion }),
    [capital, ageAuVersement, typeContrat, reversion]
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2 mb-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Capital place</label>
          <div className="relative">
            <input type="number" value={capital} onChange={(e) => setCapital(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-amber-400" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">EUR</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Age au 1er versement</label>
          <input type="number" value={ageAuVersement} onChange={(e) => setAgeAuVersement(parseInt(e.target.value) || 60)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-amber-400" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Type de contrat</label>
          <select value={typeContrat} onChange={(e) => setTypeContrat(e.target.value as "assurance-vie" | "per" | "dsk")}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-amber-400 bg-white">
            <option value="assurance-vie">Assurance-vie</option>
            <option value="per">PER (Plan Epargne Retraite)</option>
            <option value="dsk">Contrat DSK / Madelin</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Reversion au conjoint ?</label>
          <select value={reversion ? "oui" : "non"} onChange={(e) => setReversion(e.target.value === "oui")}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-amber-400 bg-white">
            <option value="non">Non (rente simple)</option>
            <option value="oui">Oui (reversion ~85%)</option>
          </select>
        </div>
      </div>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg shadow-amber-200/50 mb-5">
        <p className="text-amber-100 text-sm mb-1">Rente mensuelle nette (apres impots)</p>
        <p className="text-4xl font-extrabold">{fmtEur(res.renteNetteMensuelle)}</p>
        <p className="text-amber-100 mt-1 text-sm">
          soit {fmtEur(res.renteNetteAnnuelle)} par an a vie
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 mb-4">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Taux de conversion</p>
          <p className="text-xl font-bold text-slate-800">{res.tauxConversion.toFixed(2)}%</p>
          <p className="text-xs text-slate-400 mt-1">du capital par an</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Rente brute mensuelle</p>
          <p className="text-xl font-bold text-amber-600">{fmtEur(res.renteMensuelle)}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Abattement fiscal</p>
          <p className="text-xl font-bold text-emerald-600">{res.abattementFiscal}%</p>
          <p className="text-xs text-slate-400 mt-1">fraction non imposee</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500">Impot annuel (TMI 30%)</p>
          <p className="text-xl font-bold text-red-600">-{fmtEur(res.impotRentier)}</p>
        </div>
      </div>

      <p className="text-xs text-slate-400 text-center">
        Estimation basee sur les tables de mortalite TGH/TGF 2005 et un taux technique de ~1%.
        Le taux reel depend de l&apos;assureur. Abattement CGI art. 158-6 selon age au 1er versement.
      </p>
    </div>
  );
}
