"use client";
import { useState, useMemo } from "react";

function fmt(n: number): string { return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

export default function CalculateurSurfaceCercle() {
  const [mode, setMode] = useState<"rayon" | "diametre" | "perimetre">("rayon");
  const [valeur, setValeur] = useState<string>("5");

  const resultat = useMemo(() => {
    const v = parseFloat(valeur.replace(",", "."));
    if (isNaN(v) || v <= 0) return null;

    let rayon: number;
    if (mode === "rayon") rayon = v;
    else if (mode === "diametre") rayon = v / 2;
    else rayon = v / (2 * Math.PI);

    const surface = Math.PI * rayon * rayon;
    const perimetre = 2 * Math.PI * rayon;
    const diametre = rayon * 2;

    return { rayon, diametre, surface, perimetre };
  }, [mode, valeur]);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Mode de calcul</label>
          <div className="flex gap-2">
            {[
              { v: "rayon" as const, l: "Rayon" },
              { v: "diametre" as const, l: "Diametre" },
              { v: "perimetre" as const, l: "Perimetre" },
            ].map((m) => (
              <button key={m.v} onClick={() => setMode(m.v)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${mode === m.v ? "bg-blue-500 text-white" : "border border-slate-200 text-slate-600 hover:border-blue-300"}`}>{m.l}</button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">{mode === "rayon" ? "Rayon" : mode === "diametre" ? "Diametre" : "Perimetre"}</label>
          <input type="text" inputMode="decimal" value={valeur} onChange={(e) => setValeur(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
          <div className="flex flex-wrap gap-2 mt-2">
            {[1, 2, 3, 5, 7, 10, 15, 20, 50, 100].map((v) => (
              <button key={v} onClick={() => setValeur(String(v))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-all">{v}</button>
            ))}
          </div>
        </div>
        {/* Dessin SVG du cercle */}
        {resultat && (
          <div className="bg-blue-50/30 rounded-xl p-4 flex justify-center">
            <svg viewBox="0 0 200 200" width="180" height="180" className="text-blue-500">
              <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="100" y1="100" x2="170" y2="100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4" />
              <text x="130" y="95" fill="currentColor" fontSize="12" fontWeight="bold">r={fmt(resultat.rayon)}</text>
              <circle cx="100" cy="100" r="3" fill="currentColor" />
              <text x="60" y="185" fill="currentColor" fontSize="10">S = {fmt(resultat.surface)}</text>
            </svg>
          </div>
        )}
      </div>

      <div className="lg:col-span-2 space-y-4">
        {resultat ? (
          <>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl p-6 shadow-lg shadow-blue-200/50">
              <p className="text-blue-200 text-sm mb-1">Surface du cercle</p>
              <p className="text-4xl font-extrabold tracking-tight">{fmt(resultat.surface)}</p>
              <p className="text-blue-200 text-sm mt-1">unites&sup2;</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-xs text-slate-400">Rayon</p>
                <p className="text-lg font-bold text-slate-800">{fmt(resultat.rayon)}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-xs text-slate-400">Diametre</p>
                <p className="text-lg font-bold text-slate-800">{fmt(resultat.diametre)}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-xs text-slate-400">Perimetre</p>
                <p className="text-lg font-bold text-slate-800">{fmt(resultat.perimetre)}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-6 text-center"><p className="text-slate-400 text-sm">Entrez une valeur</p></div>
        )}
        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-xs font-medium text-slate-400 mb-2">Formules</p>
          <div className="space-y-1 text-sm text-slate-600">
            <p>Surface = &pi; &times; r&sup2;</p>
            <p>Perimetre = 2 &times; &pi; &times; r</p>
            <p>&pi; &asymp; 3,14159</p>
          </div>
        </div>
      </div>
    </div>
  );
}
