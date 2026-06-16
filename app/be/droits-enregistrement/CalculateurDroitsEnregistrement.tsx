"use client";
import { fmtIntBE as fmt } from "@/app/lib/fmt";

import { useState } from "react";
import {
  calculerDroitsEnregistrement,
  type RegionBE,
} from "./droitsEnregistrementCalc";

const REGIONS: { value: RegionBE; label: string; flag: string; couleur: string }[] = [
  { value: "wallonie", label: "Wallonie", flag: "🟥🟨", couleur: "from-red-500 to-yellow-500" },
  { value: "flandre", label: "Flandre", flag: "🦁", couleur: "from-yellow-400 to-amber-500" },
  { value: "bruxelles", label: "Bruxelles", flag: "🌸", couleur: "from-blue-500 to-indigo-500" },
];

export default function CalculateurDroitsEnregistrement() {
  const [prix, setPrix] = useState<string>("300000");
  const [region, setRegion] = useState<RegionBE>("wallonie");
  const [habitationUnique, setHabitationUnique] = useState<boolean>(true);

  const prixNum = parseFloat(prix) || 0;
  const res = calculerDroitsEnregistrement(region, prixNum, habitationUnique);
  const pctDuPrix = prixNum > 0 ? (res.droitsEnregistrement / prixNum) * 100 : 0;

  // Comparaison entre les 3 regions
  const comparaisons = REGIONS.map((r) => ({
    ...r,
    res: calculerDroitsEnregistrement(r.value, prixNum, habitationUnique),
  }));

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label
            htmlFor="prix-bien"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Prix d&apos;achat du bien
          </label>
          <div className="relative">
            <input
              id="prix-bien"
              type="number"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-shadow"
              min="0"
              step="1000"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Region du bien
          </label>
          <div className="grid grid-cols-3 gap-2">
            {REGIONS.map((r) => (
              <button
                key={r.value}
                onClick={() => setRegion(r.value)}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  region === r.value
                    ? "border-rose-500 bg-rose-50/50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-lg block">{r.flag}</span>
                <span className="text-xs font-bold text-slate-800 mt-1 block">
                  {r.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Type d&apos;acquisition
          </label>
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setHabitationUnique(true)}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                habitationUnique
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Habitation propre &amp; unique
            </button>
            <button
              onClick={() => setHabitationUnique(false)}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                !habitationUnique
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Investissement / 2e bien
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            {habitationUnique
              ? "Taux reduit applicable si vous achetez votre seule et unique residence principale."
              : "Taux standard applicable pour un investissement locatif ou un bien secondaire."}
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-500 leading-relaxed">
          <p className="font-semibold text-slate-700 mb-2">
            Recapitulatif du regime applicable
          </p>
          <p>
            <strong>{REGIONS.find((r) => r.value === region)?.label}</strong>{" "}
            &middot; Taux : <strong>{res.tauxApplique} %</strong>
            {res.abattementApplique > 0 && (
              <>
                {" "}
                &middot; Abattement :{" "}
                <strong>{fmt(res.abattementApplique)} EUR</strong>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-2xl p-6 shadow-lg shadow-rose-200/50">
          <p className="text-sm text-rose-100 mb-1">
            Droits d&apos;enregistrement
          </p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(res.droitsEnregistrement)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
          <p className="text-xs text-rose-100 mt-2">
            Soit {pctDuPrix.toFixed(2)} % du prix d&apos;achat
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Detail du calcul
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Prix d&apos;achat</span>
              <span className="font-semibold text-slate-700">
                {fmt(res.prixAchat)} EUR
              </span>
            </div>
            {res.abattementApplique > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Abattement (1re tranche)
                </span>
                <span className="font-semibold text-emerald-600">
                  - {fmt(res.abattementApplique)} EUR
                </span>
              </div>
            )}
            <div className="flex justify-between pt-1 border-t border-slate-100">
              <span className="text-slate-500">Base taxable</span>
              <span className="font-semibold text-slate-700">
                {fmt(res.baseTaxable)} EUR
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">
                Taux applique ({res.tauxApplique} %)
              </span>
              <span className="font-bold text-rose-600">
                {fmt(res.droitsEnregistrement)} EUR
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Comparaison par region (meme prix &amp; statut)
          </p>
          <div className="space-y-2 text-sm">
            {comparaisons.map((c) => (
              <div
                key={c.value}
                className={`flex justify-between p-2 rounded-lg ${
                  c.value === region ? "bg-rose-50" : ""
                }`}
              >
                <span className="text-slate-600">{c.label}</span>
                <span className="font-bold text-slate-800">
                  {fmt(c.res.droitsEnregistrement)} EUR
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Estimation hors frais de notaire, debours et TVA sur honoraires. Pour
          le neuf en Flandre, le taux peut etre abaisse a 1 % si renovation
          energetique majeure.
        </div>
      </div>
    </div>
  );
}
