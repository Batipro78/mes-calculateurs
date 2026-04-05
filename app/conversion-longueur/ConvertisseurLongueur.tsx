"use client";
import { useState, useMemo } from "react";

type Unite = "cm" | "pouces" | "pieds" | "m" | "mm";

const UNITES: { id: Unite; label: string; symbole: string }[] = [
  { id: "cm", label: "Centimetres", symbole: "cm" },
  { id: "pouces", label: "Pouces (inches)", symbole: "in" },
  { id: "pieds", label: "Pieds (feet)", symbole: "ft" },
  { id: "m", label: "Metres", symbole: "m" },
  { id: "mm", label: "Millimetres", symbole: "mm" },
];

function convertir(valeur: number, de: Unite, vers: Unite): number {
  // Convert to cm first
  let cm: number;
  if (de === "cm") cm = valeur;
  else if (de === "pouces") cm = valeur * 2.54;
  else if (de === "pieds") cm = valeur * 30.48;
  else if (de === "m") cm = valeur * 100;
  else cm = valeur / 10; // mm

  if (vers === "cm") return cm;
  if (vers === "pouces") return cm / 2.54;
  if (vers === "pieds") return cm / 30.48;
  if (vers === "m") return cm / 100;
  return cm * 10; // mm
}

function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return { feet, inches };
}

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function ConvertisseurLongueur() {
  const [valeur, setValeur] = useState<string>("170");
  const [de, setDe] = useState<Unite>("cm");
  const [vers, setVers] = useState<Unite>("pouces");

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

  const feetInches = useMemo(() => {
    const v = parseFloat(valeur.replace(",", "."));
    if (isNaN(v) || v < 0) return null;
    const cm = de === "cm" ? v : convertir(v, de, "cm");
    return cmToFeetInches(cm);
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
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            placeholder="Entrez une longueur"
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
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
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
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
            >
              {UNITES.filter((u) => u.id !== de).map((u) => (
                <option key={u.id} value={u.id}>{u.label} ({u.symbole})</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-400 mb-2">Tailles courantes</p>
          <div className="flex flex-wrap gap-2">
            {(de === "cm" ? [150, 160, 165, 170, 175, 180, 185, 190] : de === "pouces" ? [1, 6, 12, 24, 48, 60, 72] : [1, 2, 5, 10, 50, 100]).map((v) => (
              <button
                key={v}
                onClick={() => setValeur(String(v))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50/50 transition-all"
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
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-2xl p-6 shadow-lg shadow-orange-200/50">
              <p className="text-orange-200 text-sm mb-1">
                {valeur} {deUnite.symbole} =
              </p>
              <p className="text-4xl font-extrabold tracking-tight">
                {fmt(resultat)} {versUnite.symbole}
              </p>
              {feetInches && (
                <p className="text-orange-200 text-sm mt-2">
                  Soit {feetInches.feet}&apos;{Math.round(feetInches.inches)}&quot; (pieds/pouces)
                </p>
              )}
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
            <p>1 pouce = 2,54 cm</p>
            <p>1 pied = 30,48 cm = 12 pouces</p>
            <p>1 m = 100 cm = 3,281 pieds</p>
            <p>1 yard = 91,44 cm = 3 pieds</p>
          </div>
        </div>
      </div>
    </div>
  );
}
