"use client";
import { useState, useMemo } from "react";

function fmt(n: number): string { return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function fmtInt(n: number): string { return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }); }

export default function CalculateurEssence() {
  const [distance, setDistance] = useState<string>("500");
  const [consommation, setConsommation] = useState<string>("7");
  const [prixLitre, setPrixLitre] = useState<string>("1.75");

  const resultat = useMemo(() => {
    const dist = parseFloat(distance.replace(",", "."));
    const conso = parseFloat(consommation.replace(",", "."));
    const prix = parseFloat(prixLitre.replace(",", "."));
    if (isNaN(dist) || isNaN(conso) || isNaN(prix) || dist <= 0 || conso <= 0 || prix <= 0) return null;

    const litres = (conso / 100) * dist;
    const cout = litres * prix;
    const coutKm = cout / dist;
    const autonomie100e = (100 / prix) / (conso / 100); // km avec 100€

    return { litres, cout, coutKm, autonomie100e };
  }, [distance, consommation, prixLitre]);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Distance (km)</label>
          <input type="text" inputMode="decimal" value={distance} onChange={(e) => setDistance(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all" />
          <div className="flex flex-wrap gap-2 mt-2">
            {[50, 100, 200, 500, 750, 1000, 1500].map((d) => (
              <button key={d} onClick={() => setDistance(String(d))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50/50 transition-all">
                {d} km
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Consommation (L/100km)</label>
            <input type="text" inputMode="decimal" value={consommation} onChange={(e) => setConsommation(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all" />
            <div className="flex flex-wrap gap-2 mt-2">
              {[4, 5, 6, 7, 8, 10, 12].map((c) => (
                <button key={c} onClick={() => setConsommation(String(c))}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-red-300 hover:text-red-600 transition-all">
                  {c}L
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Prix du litre (&euro;)</label>
            <input type="text" inputMode="decimal" value={prixLitre} onChange={(e) => setPrixLitre(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all" />
            <div className="flex flex-wrap gap-2 mt-2">
              {[1.55, 1.65, 1.75, 1.85, 1.95, 2.05].map((p) => (
                <button key={p} onClick={() => setPrixLitre(String(p))}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-red-300 hover:text-red-600 transition-all">
                  {p}&euro;
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {resultat ? (
          <>
            <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-2xl p-6 shadow-lg shadow-red-200/50">
              <p className="text-red-200 text-sm mb-1">Cout du trajet</p>
              <p className="text-4xl font-extrabold tracking-tight">{fmt(resultat.cout)} <span className="text-xl font-semibold">&euro;</span></p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-xs text-slate-400">Litres necessaires</p>
                <p className="text-lg font-bold text-slate-800">{fmt(resultat.litres)} L</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-xs text-slate-400">Cout/km</p>
                <p className="text-lg font-bold text-slate-800">{fmt(resultat.coutKm)} &euro;</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-1">Avec 100 &euro; de carburant</p>
              <p className="text-xl font-bold text-slate-800">{fmtInt(resultat.autonomie100e)} km</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-2">Cout mensuel (estimation)</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">Domicile-travail (20km A/R x 22j)</span><span className="font-bold">{fmt((parseFloat(consommation.replace(",",".")) || 7) / 100 * 20 * 22 * (parseFloat(prixLitre.replace(",",".")) || 1.75))} &euro;</span></div>
                <div className="flex justify-between"><span className="text-slate-600">1 000 km/mois</span><span className="font-bold">{fmt((parseFloat(consommation.replace(",",".")) || 7) / 100 * 1000 * (parseFloat(prixLitre.replace(",",".")) || 1.75))} &euro;</span></div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-6 text-center"><p className="text-slate-400 text-sm">Remplissez les champs</p></div>
        )}
        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-xs font-medium text-slate-400 mb-2">Formule</p>
          <p className="text-sm text-slate-600">Cout = (conso/100) &times; distance &times; prix/L</p>
        </div>
      </div>
    </div>
  );
}
