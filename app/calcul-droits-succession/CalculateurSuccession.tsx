"use client";
import { useState, useMemo } from "react";

function fmt(n: number): string { return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }); }

// Abattements 2026
const ABATTEMENTS: Record<string, number> = {
  "enfant": 100000,
  "petit-enfant": 31865,
  "frere-soeur": 15932,
  "neveu-niece": 7967,
  "conjoint": 0, // exonere total
  "autre": 1594,
};

// Bareme ligne directe (enfants)
function calculerDroitsLigneDirecte(montantImposable: number): number {
  if (montantImposable <= 0) return 0;
  const tranches = [
    { limite: 8072, taux: 0.05 },
    { limite: 12109, taux: 0.10 },
    { limite: 15932, taux: 0.15 },
    { limite: 552324, taux: 0.20 },
    { limite: 902838, taux: 0.30 },
    { limite: 1805677, taux: 0.40 },
    { limite: Infinity, taux: 0.45 },
  ];

  let droits = 0;
  let restant = montantImposable;
  let precLimite = 0;

  for (const tranche of tranches) {
    const assiette = Math.min(restant, tranche.limite - precLimite);
    if (assiette <= 0) break;
    droits += assiette * tranche.taux;
    restant -= assiette;
    precLimite = tranche.limite;
  }

  return droits;
}

// Bareme freres/soeurs
function calculerDroitsFrere(montantImposable: number): number {
  if (montantImposable <= 0) return 0;
  if (montantImposable <= 24430) return montantImposable * 0.35;
  return 24430 * 0.35 + (montantImposable - 24430) * 0.45;
}

export default function CalculateurSuccession() {
  const [montant, setMontant] = useState<string>("300000");
  const [lien, setLien] = useState<string>("enfant");
  const [nbHeritiers, setNbHeritiers] = useState<string>("2");

  const resultat = useMemo(() => {
    const m = parseFloat(montant.replace(",", "."));
    const nb = parseInt(nbHeritiers) || 1;
    if (isNaN(m) || m <= 0) return null;

    if (lien === "conjoint") {
      return { partParHeritier: m / nb, abattement: 0, imposable: 0, droits: 0, droitsTotal: 0, exonere: true, tauxEffectif: 0 };
    }

    const partBrute = m / nb;
    const abattement = ABATTEMENTS[lien] || 1594;
    const imposable = Math.max(0, partBrute - abattement);

    let droitsPart: number;
    if (lien === "enfant" || lien === "petit-enfant") {
      droitsPart = calculerDroitsLigneDirecte(imposable);
    } else if (lien === "frere-soeur") {
      droitsPart = calculerDroitsFrere(imposable);
    } else if (lien === "neveu-niece") {
      droitsPart = imposable * 0.55;
    } else {
      droitsPart = imposable * 0.60;
    }

    const droitsTotal = droitsPart * nb;
    const tauxEffectif = m > 0 ? (droitsTotal / m) * 100 : 0;

    return { partParHeritier: partBrute, abattement, imposable, droits: droitsPart, droitsTotal, exonere: false, tauxEffectif };
  }, [montant, lien, nbHeritiers]);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Montant de la succession (&euro;)</label>
          <input type="text" inputMode="decimal" value={montant} onChange={(e) => setMontant(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all" />
          <div className="flex flex-wrap gap-2 mt-2">
            {[100000, 200000, 300000, 500000, 750000, 1000000].map((m) => (
              <button key={m} onClick={() => setMontant(String(m))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-slate-400 transition-all">{fmt(m)} &euro;</button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Lien de parente</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { v: "conjoint", l: "Conjoint/Pacse" },
              { v: "enfant", l: "Enfant" },
              { v: "petit-enfant", l: "Petit-enfant" },
              { v: "frere-soeur", l: "Frere/Soeur" },
              { v: "neveu-niece", l: "Neveu/Niece" },
              { v: "autre", l: "Autre" },
            ].map((o) => (
              <button key={o.v} onClick={() => setLien(o.v)}
                className={`py-2.5 rounded-xl text-sm font-medium transition-all ${lien === o.v ? "bg-slate-800 text-white" : "border border-slate-200 text-slate-600 hover:border-slate-400"}`}>{o.l}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre d&apos;heritiers</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => setNbHeritiers(String(n))}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${nbHeritiers === String(n) ? "bg-slate-800 text-white" : "border border-slate-200 text-slate-600"}`}>{n}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {resultat ? (
          <>
            <div className={`rounded-2xl p-6 shadow-lg text-white ${resultat.exonere ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-200/50" : "bg-gradient-to-br from-slate-700 to-slate-900 shadow-slate-300/50"}`}>
              <p className="text-sm opacity-80 mb-1">Droits de succession</p>
              <p className="text-4xl font-extrabold tracking-tight">{resultat.exonere ? "Exonere" : `${fmt(resultat.droitsTotal)} \u20ac`}</p>
              {!resultat.exonere && <p className="text-sm opacity-70 mt-1">Taux effectif : {resultat.tauxEffectif.toFixed(1)}%</p>}
            </div>
            {!resultat.exonere && (
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                <p className="text-xs text-slate-400 mb-2">Detail par heritier</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-slate-600">Part brute</span><span className="font-bold">{fmt(resultat.partParHeritier)} &euro;</span></div>
                  <div className="flex justify-between"><span className="text-slate-600">Abattement</span><span className="font-bold text-green-600">-{fmt(resultat.abattement)} &euro;</span></div>
                  <div className="flex justify-between"><span className="text-slate-600">Part imposable</span><span className="font-bold">{fmt(resultat.imposable)} &euro;</span></div>
                  <div className="flex justify-between border-t pt-1"><span className="text-slate-700 font-semibold">Droits par heritier</span><span className="font-bold text-red-500">{fmt(resultat.droits)} &euro;</span></div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-6 text-center"><p className="text-slate-400 text-sm">Remplissez les champs</p></div>
        )}
        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-xs font-medium text-slate-400 mb-2">Abattements 2026</p>
          <div className="space-y-1 text-sm text-slate-600">
            <p>Conjoint/Pacse : <strong>exonere total</strong></p>
            <p>Enfant : <strong>100 000 &euro;</strong></p>
            <p>Petit-enfant : <strong>31 865 &euro;</strong></p>
            <p>Frere/Soeur : <strong>15 932 &euro;</strong></p>
            <p>Neveu/Niece : <strong>7 967 &euro;</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
