"use client";
import { useState, useMemo } from "react";

function fmt(n: number): string { return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

export default function CalculateurVolumeCylindre() {
  const [rayon, setRayon] = useState<string>("5");
  const [hauteur, setHauteur] = useState<string>("10");

  const resultat = useMemo(() => {
    const r = parseFloat(rayon.replace(",", "."));
    const h = parseFloat(hauteur.replace(",", "."));
    if (isNaN(r) || isNaN(h) || r <= 0 || h <= 0) return null;

    const volume = Math.PI * r * r * h;
    const surfaceBase = Math.PI * r * r;
    const surfaceLaterale = 2 * Math.PI * r * h;
    const surfaceTotale = 2 * surfaceBase + surfaceLaterale;
    const litres = volume / 1000; // cm3 to litres

    return { volume, surfaceBase, surfaceLaterale, surfaceTotale, litres, r, h };
  }, [rayon, hauteur]);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Rayon</label>
            <input type="text" inputMode="decimal" value={rayon} onChange={(e) => setRayon(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Hauteur</label>
            <input type="text" inputMode="decimal" value={hauteur} onChange={(e) => setHauteur(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {[{ r: "2", h: "5" }, { r: "5", h: "10" }, { r: "10", h: "20" }, { r: "15", h: "30" }, { r: "25", h: "50" }].map((ex) => (
            <button key={`${ex.r}-${ex.h}`} onClick={() => { setRayon(ex.r); setHauteur(ex.h); }}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-teal-300 hover:text-teal-600 transition-all">r={ex.r} h={ex.h}</button>
          ))}
        </div>
        {/* Dessin SVG */}
        {resultat && (
          <div className="bg-teal-50/30 rounded-xl p-4 flex justify-center">
            <svg viewBox="0 0 200 250" width="160" height="200" className="text-teal-500">
              <ellipse cx="100" cy="50" rx="60" ry="20" fill="none" stroke="currentColor" strokeWidth="2" />
              <ellipse cx="100" cy="190" rx="60" ry="20" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
              <line x1="40" y1="50" x2="40" y2="190" stroke="currentColor" strokeWidth="2" />
              <line x1="160" y1="50" x2="160" y2="190" stroke="currentColor" strokeWidth="2" />
              <line x1="100" y1="50" x2="160" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="3" />
              <text x="120" y="45" fill="currentColor" fontSize="11" fontWeight="bold">r</text>
              <line x1="165" y1="50" x2="165" y2="190" stroke="currentColor" strokeWidth="1" strokeDasharray="3" />
              <text x="170" y="125" fill="currentColor" fontSize="11" fontWeight="bold">h</text>
            </svg>
          </div>
        )}
      </div>

      <div className="lg:col-span-2 space-y-4">
        {resultat ? (
          <>
            <div className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-2xl p-6 shadow-lg shadow-teal-200/50">
              <p className="text-teal-200 text-sm mb-1">Volume du cylindre</p>
              <p className="text-4xl font-extrabold tracking-tight">{fmt(resultat.volume)}</p>
              <p className="text-teal-200 text-sm mt-1">unites&sup3;</p>
              {resultat.volume > 0 && <p className="text-teal-200 text-xs mt-1">Soit {fmt(resultat.litres)} litres (si en cm)</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-xs text-slate-400">Surface base</p>
                <p className="text-lg font-bold text-slate-800">{fmt(resultat.surfaceBase)}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-xs text-slate-400">Surface laterale</p>
                <p className="text-lg font-bold text-slate-800">{fmt(resultat.surfaceLaterale)}</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
              <p className="text-xs text-slate-400">Surface totale</p>
              <p className="text-lg font-bold text-slate-800">{fmt(resultat.surfaceTotale)}</p>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-6 text-center"><p className="text-slate-400 text-sm">Entrez rayon et hauteur</p></div>
        )}
        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-xs font-medium text-slate-400 mb-2">Formules</p>
          <div className="space-y-1 text-sm text-slate-600">
            <p>Volume = &pi; &times; r&sup2; &times; h</p>
            <p>Surface laterale = 2 &times; &pi; &times; r &times; h</p>
            <p>Surface totale = 2&pi;r&sup2; + 2&pi;rh</p>
          </div>
        </div>
      </div>
    </div>
  );
}
