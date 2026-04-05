"use client";
import { useState, useMemo } from "react";

type Unite = "kg" | "livres" | "oz" | "g" | "stones";

const UNITES: { id: Unite; label: string; symbole: string }[] = [
  { id: "kg", label: "Kilogrammes", symbole: "kg" },
  { id: "livres", label: "Livres (lbs)", symbole: "lbs" },
  { id: "oz", label: "Onces (oz)", symbole: "oz" },
  { id: "g", label: "Grammes", symbole: "g" },
  { id: "stones", label: "Stones (st)", symbole: "st" },
];

function convertir(valeur: number, de: Unite, vers: Unite): number {
  // Convert to kg first
  let kg: number;
  if (de === "kg") kg = valeur;
  else if (de === "livres") kg = valeur * 0.45359237;
  else if (de === "oz") kg = valeur * 0.028349523;
  else if (de === "g") kg = valeur / 1000;
  else kg = valeur * 6.35029318; // stones

  // Convert from kg to target
  if (vers === "kg") return kg;
  if (vers === "livres") return kg / 0.45359237;
  if (vers === "oz") return kg / 0.028349523;
  if (vers === "g") return kg * 1000;
  return kg / 6.35029318; // stones
}

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function ConvertisseurPoids() {
  const [valeur, setValeur] = useState<string>("70");
  const [de, setDe] = useState<Unite>("kg");
  const [vers, setVers] = useState<Unite>("livres");

  const resultat = useMemo(() => {
    const v = parseFloat(valeur.replace(",", "."));
    if (isNaN(v) || v < 0) return null;
    return convertir(v, de, vers);
  }, [valeur, de, vers]);

  const autresResultats = useMemo(() => {
    const v = parseFloat(valeur.replace(",", "."));
    if (isNaN(v) || v < 0) return [];
    return UNITES.filter((u) => u.id !== de && u.id !== vers).map((u) => ({
      ...u,
      valeur: convertir(v, de, u.id),
    }));
  }, [valeur, de, vers]);

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
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            placeholder="Entrez un poids"
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
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
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
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
            >
              {UNITES.filter((u) => u.id !== de).map((u) => (
                <option key={u.id} value={u.id}>{u.label} ({u.symbole})</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-400 mb-2">Poids courants</p>
          <div className="flex flex-wrap gap-2">
            {(de === "kg" ? [1, 5, 10, 50, 70, 100] : de === "livres" ? [1, 10, 50, 100, 150, 200] : [100, 500, 1000]).map((v) => (
              <button
                key={v}
                onClick={() => setValeur(String(v))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all"
              >
                {v} {deUnite.symbole}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {resultat !== null && (
          <>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg shadow-emerald-200/50">
              <p className="text-emerald-200 text-sm mb-1">
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
          <p className="text-xs font-medium text-slate-400 mb-2">Equivalences</p>
          <div className="space-y-1 text-sm text-slate-600">
            <p>1 kg = 2,20462 lbs</p>
            <p>1 lb = 0,45359 kg</p>
            <p>1 lb = 16 oz</p>
            <p>1 stone = 14 lbs = 6,350 kg</p>
          </div>
        </div>
      </div>
    </div>
  );
}
