"use client";
import { useState, useMemo } from "react";

type Unite = "celsius" | "fahrenheit" | "kelvin";

const UNITES: { id: Unite; label: string; symbole: string }[] = [
  { id: "celsius", label: "Celsius", symbole: "\u00b0C" },
  { id: "fahrenheit", label: "Fahrenheit", symbole: "\u00b0F" },
  { id: "kelvin", label: "Kelvin", symbole: "K" },
];

function convertir(valeur: number, de: Unite, vers: Unite): number {
  let celsius: number;
  if (de === "celsius") celsius = valeur;
  else if (de === "fahrenheit") celsius = (valeur - 32) * 5 / 9;
  else celsius = valeur - 273.15;

  if (vers === "celsius") return celsius;
  if (vers === "fahrenheit") return celsius * 9 / 5 + 32;
  return celsius + 273.15;
}

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function ConvertisseurTemperature() {
  const [valeur, setValeur] = useState<string>("20");
  const [de, setDe] = useState<Unite>("celsius");
  const [vers, setVers] = useState<Unite>("fahrenheit");

  const resultat = useMemo(() => {
    const v = parseFloat(valeur.replace(",", "."));
    if (isNaN(v)) return null;
    return convertir(v, de, vers);
  }, [valeur, de, vers]);

  const autresResultats = useMemo(() => {
    const v = parseFloat(valeur.replace(",", "."));
    if (isNaN(v)) return [];
    return UNITES.filter((u) => u.id !== de).map((u) => ({
      ...u,
      valeur: convertir(v, de, u.id),
    }));
  }, [valeur, de]);

  const deUnite = UNITES.find((u) => u.id === de)!;
  const versUnite = UNITES.find((u) => u.id === vers)!;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Valeur
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Entrez une temperature"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">De</label>
            <select
              value={de}
              onChange={(e) => {
                const newDe = e.target.value as Unite;
                if (newDe === vers) setVers(de);
                setDe(newDe);
              }}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            >
              {UNITES.map((u) => (
                <option key={u.id} value={u.id}>{u.label} ({u.symbole})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Vers</label>
            <select
              value={vers}
              onChange={(e) => setVers(e.target.value as Unite)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            >
              {UNITES.filter((u) => u.id !== de).map((u) => (
                <option key={u.id} value={u.id}>{u.label} ({u.symbole})</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-400 mb-2">Valeurs courantes</p>
          <div className="flex flex-wrap gap-2">
            {[0, 20, 37, 100, -40].map((v) => (
              <button
                key={v}
                onClick={() => setValeur(String(v))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
              >
                {v}{deUnite.symbole}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {resultat !== null && (
          <>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg shadow-blue-200/50">
              <p className="text-blue-200 text-sm mb-1">
                {valeur} {deUnite.symbole} =
              </p>
              <p className="text-4xl font-extrabold tracking-tight">
                {fmt(resultat)} {versUnite.symbole}
              </p>
            </div>
            {autresResultats.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                <p className="text-xs text-slate-400">{r.label}</p>
                <p className="text-xl font-bold text-slate-800">
                  {fmt(r.valeur)} {r.symbole}
                </p>
              </div>
            ))}
          </>
        )}

        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-xs font-medium text-slate-400 mb-2">Formules</p>
          <div className="space-y-1 text-sm text-slate-600">
            <p>\u00b0F = \u00b0C \u00d7 9/5 + 32</p>
            <p>\u00b0C = (\u00b0F \u2212 32) \u00d7 5/9</p>
            <p>K = \u00b0C + 273,15</p>
          </div>
        </div>

        {/* Reperes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">Reperes</p>
          <div className="space-y-2 text-sm">
            {[
              { label: "Eau gele", c: 0, f: 32 },
              { label: "Temperature corporelle", c: 37, f: 98.6 },
              { label: "Eau bouillante", c: 100, f: 212 },
              { label: "Zero absolu", c: -273.15, f: -459.67 },
            ].map((r) => (
              <div key={r.label} className="flex justify-between items-center">
                <span className="text-slate-600">{r.label}</span>
                <span className="font-semibold text-slate-800">{r.c}\u00b0C / {r.f}\u00b0F</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
