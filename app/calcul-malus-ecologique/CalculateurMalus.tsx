"use client";
import { useState, useMemo } from "react";

function fmtInt(n: number): string { return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }); }

// Bareme malus CO2 2026 (simplifie, paliers principaux)
function calculerMalus(co2: number): number {
  if (co2 <= 113) return 0;
  if (co2 === 114) return 50;
  if (co2 <= 120) return 50 + (co2 - 114) * 25;
  if (co2 <= 130) return 200 + (co2 - 120) * 50;
  if (co2 <= 140) return 700 + (co2 - 130) * 80;
  if (co2 <= 150) return 1500 + (co2 - 140) * 150;
  if (co2 <= 160) return 3000 + (co2 - 150) * 250;
  if (co2 <= 170) return 5500 + (co2 - 160) * 400;
  if (co2 <= 180) return 9500 + (co2 - 170) * 600;
  if (co2 <= 190) return 15500 + (co2 - 180) * 800;
  if (co2 <= 200) return 23500 + (co2 - 190) * 1000;
  if (co2 <= 210) return 33500 + (co2 - 200) * 1200;
  return Math.min(70000, 45500 + (co2 - 210) * 1500); // plafond 70 000€
}

// Malus au poids 2026
function calculerMalusPoids(poids: number): number {
  if (poids <= 1600) return 0;
  return (poids - 1600) * 10; // 10€/kg au-dessus de 1600 kg
}

export default function CalculateurMalus() {
  const [co2, setCo2] = useState<string>("130");
  const [poids, setPoids] = useState<string>("1400");
  const [electrique, setElectrique] = useState<boolean>(false);

  const resultat = useMemo(() => {
    const c = parseInt(co2);
    const p = parseInt(poids);
    if (isNaN(c) || c < 0) return null;

    if (electrique) {
      return { malusCO2: 0, malusPoids: 0, malusTotal: 0, exonere: true };
    }

    const malusCO2 = calculerMalus(c);
    const malusPoids = !isNaN(p) ? calculerMalusPoids(p) : 0;
    const malusTotal = Math.max(malusCO2, malusPoids); // On retient le plus eleve (pas cumul)

    return { malusCO2, malusPoids, malusTotal, exonere: false };
  }, [co2, poids, electrique]);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Emissions CO2 (g/km)</label>
          <input type="text" inputMode="numeric" value={co2} onChange={(e) => setCo2(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all" />
          <div className="flex flex-wrap gap-2 mt-2">
            {[100, 113, 120, 130, 140, 150, 160, 180, 200, 220].map((v) => (
              <button key={v} onClick={() => setCo2(String(v))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50/50 transition-all">
                {v} g
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Poids du vehicule (kg)</label>
          <input type="text" inputMode="numeric" value={poids} onChange={(e) => setPoids(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all" />
          <div className="flex flex-wrap gap-2 mt-2">
            {[1000, 1200, 1400, 1600, 1800, 2000, 2200, 2500].map((v) => (
              <button key={v} onClick={() => setPoids(String(v))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50/50 transition-all">
                {fmtInt(v)} kg
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={electrique} onChange={(e) => setElectrique(e.target.checked)}
            className="w-5 h-5 rounded border-slate-300 text-green-500 focus:ring-green-500" />
          <span className="text-sm font-medium text-slate-700">Vehicule electrique ou hybride rechargeable (&lt; 50 g CO2)</span>
        </label>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {resultat ? (
          <>
            <div className={`rounded-2xl p-6 shadow-lg ${resultat.exonere || resultat.malusTotal === 0 ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-200/50" : "bg-gradient-to-br from-rose-500 to-red-600 shadow-rose-200/50"} text-white`}>
              <p className={`text-sm mb-1 ${resultat.exonere || resultat.malusTotal === 0 ? "text-green-200" : "text-rose-200"}`}>Malus ecologique 2026</p>
              <p className="text-4xl font-extrabold tracking-tight">
                {resultat.exonere ? "Exonere" : resultat.malusTotal === 0 ? "0 \u20ac" : `${fmtInt(resultat.malusTotal)} \u20ac`}
              </p>
            </div>

            {!resultat.exonere && resultat.malusTotal > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                <p className="text-xs text-slate-400 mb-2">Detail</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Malus CO2 ({co2} g/km)</span>
                    <span className="font-bold text-slate-800">{fmtInt(resultat.malusCO2)} &euro;</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Malus poids ({poids} kg)</span>
                    <span className="font-bold text-slate-800">{fmtInt(resultat.malusPoids)} &euro;</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-slate-700 font-semibold">Retenu (le plus eleve)</span>
                    <span className="font-bold text-rose-600">{fmtInt(resultat.malusTotal)} &euro;</span>
                  </div>
                </div>
              </div>
            )}

            <div className={`rounded-2xl p-4 ${resultat.malusTotal === 0 ? "bg-green-50 border border-green-200" : resultat.malusTotal <= 1000 ? "bg-amber-50 border border-amber-200" : "bg-red-50 border border-red-200"}`}>
              <p className="text-sm font-semibold">{resultat.malusTotal === 0 ? "Pas de malus" : resultat.malusTotal <= 1000 ? "Malus modere" : resultat.malusTotal <= 10000 ? "Malus eleve" : "Malus tres eleve"}</p>
              <p className="text-xs text-slate-500 mt-1">{resultat.malusTotal === 0 ? "Vehicule sous le seuil de 113 g CO2/km" : `Plafond 2026 : 70 000 \u20ac`}</p>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-6 text-center"><p className="text-slate-400 text-sm">Entrez les emissions CO2</p></div>
        )}

        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-xs font-medium text-slate-400 mb-2">Seuils 2026</p>
          <div className="space-y-1 text-sm text-slate-600">
            <p>CO2 : malus a partir de 114 g/km</p>
            <p>Poids : malus a partir de 1 600 kg (10 &euro;/kg)</p>
            <p>Plafond : 70 000 &euro;</p>
            <p>Electrique/hybride : exonere</p>
          </div>
        </div>
      </div>
    </div>
  );
}
