"use client";

import { useState } from "react";
import { calcPrimeActivite, FORFAITAIRE_BASE } from "./calcPrimeActivite";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

export default function CalculateurPrimeActivite() {
  const [situation, setSituation] = useState("seul");
  const [enfants, setEnfants] = useState("0");
  const [parentIsole, setParentIsole] = useState(false);
  const [revenu, setRevenu] = useState("1200");
  const [revenuConjoint, setRevenuConjoint] = useState("0");
  const [autresRessources, setAutresRessources] = useState("0");
  const [aLogement, setALogement] = useState(true);

  const revenuNum = parseFloat(revenu) || 0;
  const conjointNum = parseFloat(revenuConjoint) || 0;
  const autresNum = parseFloat(autresRessources) || 0;
  const enfantsNum = parseInt(enfants) || 0;

  const r = calcPrimeActivite(
    situation,
    enfantsNum,
    parentIsole,
    revenuNum,
    conjointNum,
    autresNum,
    aLogement
  );

  const revenusBoutons = [800, 1000, 1200, 1400, 1600, 1800, 2000];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Formulaire */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-6">Vos informations</h2>

        {/* Situation */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Situation familiale</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: "seul", label: "Seul(e)" },
              { val: "couple", label: "En couple" },
            ].map((s) => (
              <button
                key={s.val}
                onClick={() => {
                  setSituation(s.val);
                  if (s.val === "seul") setRevenuConjoint("0");
                }}
                className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                  situation === s.val
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Enfants */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nombre d&apos;enfants a charge
          </label>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setEnfants(String(n))}
                className={`w-11 h-11 rounded-xl text-sm font-bold transition-all ${
                  enfantsNum === n
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Parent isole */}
        {situation === "seul" && enfantsNum > 0 && (
          <div className="mb-5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={parentIsole}
                onChange={(e) => setParentIsole(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm font-semibold text-slate-700">Parent isole (majoration)</span>
            </label>
          </div>
        )}

        {/* Revenu mensuel */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Votre revenu net mensuel (EUR)
          </label>
          <input
            type="number"
            value={revenu}
            onChange={(e) => setRevenu(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {revenusBoutons.map((m) => (
              <button
                key={m}
                onClick={() => setRevenu(String(m))}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  revenuNum === m
                    ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {fmtInt(m)} EUR
              </button>
            ))}
          </div>
        </div>

        {/* Revenu conjoint */}
        {situation === "couple" && (
          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Revenu net du conjoint (EUR)
            </label>
            <input
              type="number"
              value={revenuConjoint}
              onChange={(e) => setRevenuConjoint(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
            />
          </div>
        )}

        {/* Autres ressources */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Autres ressources mensuelles (EUR)
          </label>
          <input
            type="number"
            value={autresRessources}
            onChange={(e) => setAutresRessources(e.target.value)}
            placeholder="APL, allocations, pensions..."
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
          />
        </div>

        {/* Logement */}
        <div className="mb-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={aLogement}
              onChange={(e) => setALogement(e.target.checked)}
              className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-sm font-semibold text-slate-700">
              Beneficiaire d&apos;une aide au logement ou proprietaire
            </span>
          </label>
          <p className="text-xs text-slate-400 ml-8 mt-1">
            Un forfait logement est deduit si vous percevez une aide au logement (APL, ALS, ALF) ou etes proprietaire.
          </p>
        </div>
      </div>

      {/* Resultats */}
      <div className="space-y-4">
        {/* Resultat principal */}
        <div className={`rounded-2xl p-6 text-center ${
          r.eligible
            ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
            : "bg-gradient-to-br from-slate-400 to-slate-500 text-white"
        }`}>
          <p className="text-sm font-medium opacity-90 mb-1">
            Prime d&apos;activite estimee
          </p>
          <p className="text-5xl font-black mb-1">
            {r.eligible ? `${fmt(r.primeActivite)}` : "0,00"}
            <span className="text-2xl font-bold opacity-80 ml-1">EUR/mois</span>
          </p>
          {r.eligible ? (
            <p className="text-sm opacity-80">
              soit {fmt(r.primeActivite * 12)} EUR/an
            </p>
          ) : (
            <p className="text-sm opacity-80">{r.raisonIneligible}</p>
          )}
        </div>

        {/* Detail du calcul */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Detail du calcul</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">Montant forfaitaire</span>
              <span className="font-bold text-slate-800">+ {fmt(r.montantForfaitaire)} EUR</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">61% des revenus professionnels</span>
              <span className="font-bold text-slate-800">+ {fmt(r.partRevenus)} EUR</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">Bonification individuelle</span>
              <span className="font-bold text-slate-800">+ {fmt(r.bonification)} EUR</span>
            </div>
            {situation === "couple" && (
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Bonification conjoint</span>
                <span className="font-bold text-slate-800">+ {fmt(r.bonificationConjoint)} EUR</span>
              </div>
            )}
            <div className="flex justify-between items-center py-2 border-b border-slate-100 bg-slate-50 -mx-6 px-6">
              <span className="text-sm font-semibold text-slate-700">Total avant deductions</span>
              <span className="font-bold text-slate-800">{fmt(r.totalAvantDeduction)} EUR</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">Ressources du foyer</span>
              <span className="font-bold text-red-600">- {fmt(r.ressourcesFoyer)} EUR</span>
            </div>
            {aLogement && (
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Forfait logement</span>
                <span className="font-bold text-red-600">- {fmt(r.forfaitLogement)} EUR</span>
              </div>
            )}
            <div className="flex justify-between items-center py-2 bg-emerald-50 -mx-6 px-6 rounded-b-xl">
              <span className="text-sm font-bold text-emerald-800">Prime d&apos;activite nette</span>
              <span className="text-xl font-black text-emerald-700">{fmt(r.primeActivite)} EUR</span>
            </div>
          </div>
        </div>

        {/* Bareme rapide */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Estimation selon le revenu</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 text-slate-500 font-medium">Revenu net</th>
                  <th className="text-right py-2 text-slate-500 font-medium">Prime estimee</th>
                </tr>
              </thead>
              <tbody>
                {[800, 1000, 1200, 1400, 1600, 1800, 2000].map((rev) => {
                  const sim = calcPrimeActivite(situation, enfantsNum, parentIsole, rev, conjointNum, autresNum, aLogement);
                  return (
                    <tr
                      key={rev}
                      className={`border-b border-slate-50 ${revenuNum === rev ? "bg-emerald-50" : ""}`}
                    >
                      <td className="py-2 font-medium text-slate-700">{fmtInt(rev)} EUR</td>
                      <td className="py-2 text-right font-bold text-emerald-600">
                        {sim.eligible ? `${fmt(sim.primeActivite)} EUR` : "Non eligible"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Infos */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-800">
            <strong>Estimation indicative</strong> — Le calcul reel de la CAF prend en compte les revenus des 3 derniers mois glissants,
            les prestations familiales et d&apos;autres parametres. Montant forfaitaire de base : {fmt(FORFAITAIRE_BASE)} EUR (2025).
          </p>
        </div>
      </div>
    </div>
  );
}
