"use client";
import { useState, useMemo } from "react";

function pgcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

function ppcm(a: number, b: number): number {
  return Math.abs(a * b) / pgcd(a, b);
}

function decomposer(n: number): { facteur: number; exposant: number }[] {
  const facteurs: { facteur: number; exposant: number }[] = [];
  let num = Math.abs(n);
  for (let i = 2; i * i <= num; i++) {
    let exp = 0;
    while (num % i === 0) { exp++; num /= i; }
    if (exp > 0) facteurs.push({ facteur: i, exposant: exp });
  }
  if (num > 1) facteurs.push({ facteur: num, exposant: 1 });
  return facteurs;
}

function fmtInt(n: number): string { return n.toLocaleString("fr-FR"); }

export default function CalculateurPgcdPpcm() {
  const [a, setA] = useState<string>("36");
  const [b, setB] = useState<string>("48");

  const resultat = useMemo(() => {
    const va = parseInt(a);
    const vb = parseInt(b);
    if (isNaN(va) || isNaN(vb) || va <= 0 || vb <= 0) return null;

    const vPgcd = pgcd(va, vb);
    const vPpcm = ppcm(va, vb);
    const decompA = decomposer(va);
    const decompB = decomposer(vb);

    // Etapes Euclide
    const etapes: { a: number; b: number; q: number; r: number }[] = [];
    let ea = Math.max(va, vb), eb = Math.min(va, vb);
    while (eb > 0) {
      const q = Math.floor(ea / eb);
      const r = ea % eb;
      etapes.push({ a: ea, b: eb, q, r });
      ea = eb; eb = r;
    }

    return { pgcd: vPgcd, ppcm: vPpcm, decompA, decompB, etapes, a: va, b: vb };
  }, [a, b]);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre A</label>
            <input type="text" inputMode="numeric" value={a} onChange={(e) => setA(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold text-center focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre B</label>
            <input type="text" inputMode="numeric" value={b} onChange={(e) => setB(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold text-center focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { a: "12", b: "18" }, { a: "24", b: "36" }, { a: "36", b: "48" },
            { a: "56", b: "98" }, { a: "120", b: "84" }, { a: "252", b: "360" },
          ].map((ex) => (
            <button key={`${ex.a}-${ex.b}`} onClick={() => { setA(ex.a); setB(ex.b); }}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50/50 transition-all">
              {ex.a} et {ex.b}
            </button>
          ))}
        </div>

        {/* Algorithme d'Euclide */}
        {resultat && (
          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-700 mb-2">Algorithme d&apos;Euclide</p>
            <div className="bg-purple-50/50 rounded-xl p-4 space-y-1 text-sm font-mono text-slate-700">
              {resultat.etapes.map((e, i) => (
                <p key={i}>{e.a} = {e.b} &times; {e.q} + <span className={e.r === 0 ? "font-bold text-purple-600" : ""}>{e.r}</span></p>
              ))}
              <p className="font-bold text-purple-600 mt-2">PGCD({resultat.a}, {resultat.b}) = {resultat.pgcd}</p>
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-2 space-y-4">
        {resultat ? (
          <>
            <div className="bg-gradient-to-br from-purple-500 to-violet-600 text-white rounded-2xl p-6 shadow-lg shadow-purple-200/50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-purple-200 text-sm mb-1">PGCD</p>
                  <p className="text-3xl font-extrabold">{fmtInt(resultat.pgcd)}</p>
                </div>
                <div>
                  <p className="text-purple-200 text-sm mb-1">PPCM</p>
                  <p className="text-3xl font-extrabold">{fmtInt(resultat.ppcm)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-1">Verification</p>
              <p className="text-sm text-slate-600">PGCD &times; PPCM = {fmtInt(resultat.pgcd)} &times; {fmtInt(resultat.ppcm)} = {fmtInt(resultat.pgcd * resultat.ppcm)}</p>
              <p className="text-sm text-slate-600">A &times; B = {fmtInt(resultat.a)} &times; {fmtInt(resultat.b)} = {fmtInt(resultat.a * resultat.b)}</p>
              <p className="text-xs text-green-600 font-medium mt-1">PGCD &times; PPCM = A &times; B</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-2">Decomposition en facteurs premiers</p>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-slate-500">{resultat.a} = </span>
                  <span className="font-bold text-slate-800">
                    {resultat.decompA.length > 0 ? resultat.decompA.map((f) => f.exposant > 1 ? `${f.facteur}^${f.exposant}` : `${f.facteur}`).join(" \u00d7 ") : resultat.a + " (premier)"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">{resultat.b} = </span>
                  <span className="font-bold text-slate-800">
                    {resultat.decompB.length > 0 ? resultat.decompB.map((f) => f.exposant > 1 ? `${f.facteur}^${f.exposant}` : `${f.facteur}`).join(" \u00d7 ") : resultat.b + " (premier)"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-2">Proprietes</p>
              <div className="space-y-1 text-sm text-slate-600">
                <p>{resultat.a} / {resultat.pgcd} = {resultat.a / resultat.pgcd}</p>
                <p>{resultat.b} / {resultat.pgcd} = {resultat.b / resultat.pgcd}</p>
                <p>{resultat.a} et {resultat.b} sont {resultat.pgcd === 1 ? "premiers entre eux" : `divisibles par ${resultat.pgcd}`}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-6 text-center"><p className="text-slate-400 text-sm">Entrez deux nombres entiers positifs</p></div>
        )}
      </div>
    </div>
  );
}
