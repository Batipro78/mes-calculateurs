"use client";
import { useState, useMemo } from "react";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function CalculateurProduitEnCroix() {
  const [a, setA] = useState<string>("3");
  const [b, setB] = useState<string>("6");
  const [c, setC] = useState<string>("9");
  const [inconnue, setInconnue] = useState<"d" | "c" | "b" | "a">("d");

  const resultat = useMemo(() => {
    const va = parseFloat(a.replace(",", "."));
    const vb = parseFloat(b.replace(",", "."));
    const vc = parseFloat(c.replace(",", "."));
    if (inconnue === "d" && !isNaN(va) && !isNaN(vb) && !isNaN(vc) && va !== 0) return (vb * vc) / va;
    if (inconnue === "c" && !isNaN(va) && !isNaN(vb) && !isNaN(parseFloat(a)) && vb !== 0) return null; // need d
    return null;
  }, [a, b, c, inconnue]);

  // Calcul generique : a/b = c/d → d = (b*c)/a
  const va = parseFloat(a.replace(",", "."));
  const vb = parseFloat(b.replace(",", "."));
  const vc = parseFloat(c.replace(",", "."));
  const vd = !isNaN(va) && !isNaN(vb) && !isNaN(vc) && va !== 0 ? (vb * vc) / va : null;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <p className="text-sm font-semibold text-slate-700 mb-4">
          Si A / B = C / D, trouvez D
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">A (valeur connue)</label>
            <input
              type="text"
              inputMode="decimal"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold text-center focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
              placeholder="A"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">B (valeur connue)</label>
            <input
              type="text"
              inputMode="decimal"
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold text-center focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
              placeholder="B"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">C (valeur connue)</label>
            <input
              type="text"
              inputMode="decimal"
              value={c}
              onChange={(e) => setC(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold text-center focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
              placeholder="C"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">D (inconnue)</label>
            <div className={`w-full rounded-xl px-4 py-3.5 text-lg font-extrabold text-center ${vd !== null ? "bg-sky-50 text-sky-600 border-2 border-sky-200" : "bg-slate-50 text-slate-300 border border-slate-200"}`}>
              {vd !== null ? fmt(vd) : "?"}
            </div>
          </div>
        </div>

        {/* Representation visuelle */}
        {vd !== null && (
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-medium text-slate-400 mb-3">Representation</p>
            <div className="flex items-center justify-center gap-4 text-lg">
              <div className="text-center">
                <p className="font-bold text-slate-700">{a}</p>
                <div className="w-12 h-px bg-slate-400 my-1" />
                <p className="font-bold text-slate-700">{b}</p>
              </div>
              <p className="text-2xl text-slate-400">=</p>
              <div className="text-center">
                <p className="font-bold text-slate-700">{c}</p>
                <div className="w-12 h-px bg-slate-400 my-1" />
                <p className="font-bold text-sky-600">{fmt(vd)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Raccourcis */}
        <div className="mt-4">
          <p className="text-xs font-medium text-slate-400 mb-2">Exemples rapides</p>
          <div className="flex flex-wrap gap-2">
            {[
              { a: "2", b: "5", c: "6", label: "2/5 = 6/?" },
              { a: "3", b: "4", c: "9", label: "3/4 = 9/?" },
              { a: "100", b: "250", c: "40", label: "100/250 = 40/?" },
            ].map((ex) => (
              <button
                key={ex.label}
                onClick={() => { setA(ex.a); setB(ex.b); setC(ex.c); }}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50/50 transition-all"
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {vd !== null ? (
          <>
            <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg shadow-sky-200/50">
              <p className="text-sky-200 text-sm mb-1">D = (B &times; C) &divide; A</p>
              <p className="text-4xl font-extrabold tracking-tight">{fmt(vd)}</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-2">Calcul detaille</p>
              <div className="space-y-1 text-sm text-slate-700">
                <p>D = (B &times; C) &divide; A</p>
                <p>D = ({b} &times; {c}) &divide; {a}</p>
                <p>D = {fmt(vb * vc)} &divide; {a}</p>
                <p className="font-bold text-sky-600">D = {fmt(vd)}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-2">Verification</p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <p>{a} &divide; {b} = <span className="font-bold">{fmt(va / vb)}</span></p>
                <p>{c} &divide; {fmt(vd)} = <span className="font-bold">{fmt(vc / vd)}</span></p>
              </div>
              <p className="text-xs text-green-600 font-medium text-center mt-1">Les deux rapports sont egaux</p>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-6 text-center">
            <p className="text-slate-400 text-sm">Entrez les 3 valeurs connues</p>
          </div>
        )}

        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-xs font-medium text-slate-400 mb-2">Formule</p>
          <div className="space-y-1 text-sm text-slate-600">
            <p>A / B = C / D</p>
            <p>D = (B &times; C) / A</p>
          </div>
        </div>
      </div>
    </div>
  );
}
