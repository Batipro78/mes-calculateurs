"use client";
import { useState, useMemo } from "react";

function fmt(n: number): string { return n.toLocaleString("fr-FR", { minimumFractionDigits: 6, maximumFractionDigits: 6 }); }
function fmt2(n: number): string { return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

function estCarreParfait(n: number): boolean {
  if (n < 0) return false;
  const r = Math.sqrt(n);
  return Math.abs(r - Math.round(r)) < 0.0000001;
}

export default function CalculateurRacineCarree() {
  const [nombre, setNombre] = useState<string>("144");

  const resultat = useMemo(() => {
    const n = parseFloat(nombre.replace(",", "."));
    if (isNaN(n) || n < 0) return null;

    const racine = Math.sqrt(n);
    const carreParfait = estCarreParfait(n);
    const racineEntiere = Math.floor(racine);
    const cube = Math.cbrt(n);

    return { racine, carreParfait, racineEntiere, cube, n };
  }, [nombre]);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre</label>
          <input type="text" inputMode="decimal" value={nombre} onChange={(e) => setNombre(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" />
          <div className="flex flex-wrap gap-2 mt-2">
            {[2, 3, 4, 9, 16, 25, 49, 64, 81, 100, 144, 169, 225, 256, 400, 625, 1000, 10000].map((v) => (
              <button key={v} onClick={() => setNombre(String(v))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-amber-300 hover:text-amber-600 transition-all">{v}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {resultat ? (
          <>
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg shadow-amber-200/50">
              <p className="text-amber-200 text-sm mb-1">&radic;{nombre} =</p>
              <p className="text-4xl font-extrabold tracking-tight">{resultat.carreParfait ? Math.round(resultat.racine).toLocaleString("fr-FR") : fmt(resultat.racine)}</p>
              {resultat.carreParfait && <p className="text-amber-200 text-xs mt-1">{nombre} est un carre parfait</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-xs text-slate-400">Racine cubique</p>
                <p className="text-lg font-bold text-slate-800">{fmt2(resultat.cube)}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-xs text-slate-400">Carre parfait ?</p>
                <p className={`text-lg font-bold ${resultat.carreParfait ? "text-green-600" : "text-slate-400"}`}>{resultat.carreParfait ? "Oui" : "Non"}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-2">Verification</p>
              <p className="text-sm text-slate-600">{fmt2(resultat.racine)} &times; {fmt2(resultat.racine)} = {fmt2(resultat.racine * resultat.racine)}</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-2">Carres parfaits proches</p>
              <div className="flex flex-wrap gap-2 text-sm">
                {[resultat.racineEntiere - 1, resultat.racineEntiere, resultat.racineEntiere + 1, resultat.racineEntiere + 2].filter(v => v >= 0).map((v) => (
                  <span key={v} className={`px-3 py-1 rounded-lg ${v * v === resultat.n ? "bg-amber-100 text-amber-700 font-bold" : "bg-slate-100 text-slate-600"}`}>
                    {v}&sup2; = {v * v}
                  </span>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-6 text-center"><p className="text-slate-400 text-sm">Entrez un nombre positif</p></div>
        )}
        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-xs font-medium text-slate-400 mb-2">Formule</p>
          <div className="space-y-1 text-sm text-slate-600">
            <p>&radic;n = n<sup>1/2</sup></p>
            <p>&radic;n &times; &radic;n = n</p>
          </div>
        </div>
      </div>
    </div>
  );
}
