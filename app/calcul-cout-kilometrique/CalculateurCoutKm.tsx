"use client";
import { useState, useMemo } from "react";

function fmt(n: number): string { return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function fmtInt(n: number): string { return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }); }

// Bareme kilometrique fiscal 2026 (voiture)
const BAREME: { cv: string; tranches: { max: number; formule: (d: number) => number }[] }[] = [
  { cv: "3 CV et moins", tranches: [
    { max: 5000, formule: (d) => d * 0.529 },
    { max: 20000, formule: (d) => d * 0.316 + 1065 },
    { max: Infinity, formule: (d) => d * 0.370 },
  ]},
  { cv: "4 CV", tranches: [
    { max: 5000, formule: (d) => d * 0.606 },
    { max: 20000, formule: (d) => d * 0.340 + 1330 },
    { max: Infinity, formule: (d) => d * 0.407 },
  ]},
  { cv: "5 CV", tranches: [
    { max: 5000, formule: (d) => d * 0.636 },
    { max: 20000, formule: (d) => d * 0.357 + 1395 },
    { max: Infinity, formule: (d) => d * 0.427 },
  ]},
  { cv: "6 CV", tranches: [
    { max: 5000, formule: (d) => d * 0.665 },
    { max: 20000, formule: (d) => d * 0.374 + 1457 },
    { max: Infinity, formule: (d) => d * 0.447 },
  ]},
  { cv: "7 CV et plus", tranches: [
    { max: 5000, formule: (d) => d * 0.697 },
    { max: 20000, formule: (d) => d * 0.394 + 1515 },
    { max: Infinity, formule: (d) => d * 0.470 },
  ]},
];

function calculerBareme(cvIndex: number, distance: number): number {
  const b = BAREME[cvIndex];
  for (const t of b.tranches) {
    if (distance <= t.max) return t.formule(distance);
  }
  return 0;
}

export default function CalculateurCoutKm() {
  const [distance, setDistance] = useState<string>("12000");
  const [cvIndex, setCvIndex] = useState<number>(2);
  const [electrique, setElectrique] = useState<boolean>(false);

  const resultat = useMemo(() => {
    const d = parseInt(distance);
    if (isNaN(d) || d <= 0) return null;

    let indemnite = calculerBareme(cvIndex, d);
    if (electrique) indemnite *= 1.20; // +20% pour vehicule electrique

    const coutKm = indemnite / d;
    const mensuel = indemnite / 12;

    return { indemnite, coutKm, mensuel };
  }, [distance, cvIndex, electrique]);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Distance annuelle (km)</label>
          <input type="text" inputMode="numeric" value={distance} onChange={(e) => setDistance(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all" />
          <div className="flex flex-wrap gap-2 mt-2">
            {[3000, 5000, 8000, 10000, 12000, 15000, 20000, 25000].map((d) => (
              <button key={d} onClick={() => setDistance(String(d))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-sky-300 hover:text-sky-600 transition-all">{fmtInt(d)} km</button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Puissance fiscale</label>
          <div className="grid grid-cols-5 gap-2">
            {BAREME.map((b, i) => (
              <button key={i} onClick={() => setCvIndex(i)}
                className={`py-2.5 rounded-xl text-xs font-medium transition-all ${cvIndex === i ? "bg-sky-500 text-white" : "border border-slate-200 text-slate-600 hover:border-sky-300"}`}>
                {b.cv}
              </button>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={electrique} onChange={(e) => setElectrique(e.target.checked)}
            className="w-5 h-5 rounded border-slate-300 text-green-500 focus:ring-green-500" />
          <span className="text-sm font-medium text-slate-700">Vehicule electrique (+20%)</span>
        </label>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {resultat ? (
          <>
            <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg shadow-sky-200/50">
              <p className="text-sky-200 text-sm mb-1">Indemnite kilometrique annuelle</p>
              <p className="text-4xl font-extrabold tracking-tight">{fmtInt(resultat.indemnite)} <span className="text-xl font-semibold">&euro;</span></p>
              {electrique && <p className="text-sky-200 text-xs mt-1">Majoration +20% vehicule electrique incluse</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-xs text-slate-400">Cout/km</p>
                <p className="text-lg font-bold text-slate-800">{fmt(resultat.coutKm)} &euro;</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-xs text-slate-400">Mensuel</p>
                <p className="text-lg font-bold text-slate-800">{fmtInt(resultat.mensuel)} &euro;</p>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-6 text-center"><p className="text-slate-400 text-sm">Entrez la distance</p></div>
        )}
        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-xs font-medium text-slate-400 mb-2">Info</p>
          <div className="space-y-1 text-sm text-slate-600">
            <p>Bareme fiscal officiel 2026</p>
            <p>Couvre : carburant, assurance, entretien, depreciation</p>
            <p>Electrique : majoration de 20%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
