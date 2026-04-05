"use client";
import { useState, useMemo } from "react";

function fmt(n: number): string { return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

// Gratification minimale 2026 : 4,35€/heure (15% du plafond horaire SS)
const GRATIF_HORAIRE_2026 = 4.35;

export default function CalculateurGratificationStage() {
  const [heuresParSemaine, setHeuresParSemaine] = useState<string>("35");
  const [dureeJours, setDureeJours] = useState<string>("132");
  const [gratifHoraire, setGratifHoraire] = useState<string>(String(GRATIF_HORAIRE_2026));

  const resultat = useMemo(() => {
    const h = parseFloat(heuresParSemaine.replace(",", "."));
    const d = parseInt(dureeJours);
    const g = parseFloat(gratifHoraire.replace(",", "."));
    if (isNaN(h) || isNaN(d) || isNaN(g) || h <= 0 || d <= 0 || g <= 0) return null;

    const obligatoire = d > 44 * 5; // > 2 mois (44 jours = 308h a 7h/j)
    const heuresMois = h * 52 / 12;
    const mensuel = g * heuresMois;
    const totalHeures = h * d / 5;
    const totalBrut = g * totalHeures;
    const mois = d / 22; // jours ouvres / mois

    // Exoneration charges : gratification <= minimum legal
    const partExoneree = Math.min(g, GRATIF_HORAIRE_2026) * totalHeures;
    const partImposable = Math.max(0, totalBrut - partExoneree);

    return { obligatoire, mensuel, totalBrut, totalHeures, mois, partExoneree, partImposable, heuresMois };
  }, [heuresParSemaine, dureeJours, gratifHoraire]);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Heures par semaine</label>
          <input type="text" inputMode="decimal" value={heuresParSemaine} onChange={(e) => setHeuresParSemaine(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
          <div className="flex flex-wrap gap-2 mt-2">
            {[15, 20, 25, 28, 35].map((h) => (
              <button key={h} onClick={() => setHeuresParSemaine(String(h))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all">{h}h</button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Duree du stage (jours ouvres)</label>
          <input type="text" inputMode="numeric" value={dureeJours} onChange={(e) => setDureeJours(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
          <div className="flex flex-wrap gap-2 mt-2">
            {[{ j: 22, l: "1 mois" }, { j: 44, l: "2 mois" }, { j: 66, l: "3 mois" }, { j: 88, l: "4 mois" }, { j: 110, l: "5 mois" }, { j: 132, l: "6 mois" }].map((d) => (
              <button key={d.j} onClick={() => setDureeJours(String(d.j))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all">{d.l}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Gratification horaire (&euro;)</label>
          <input type="text" inputMode="decimal" value={gratifHoraire} onChange={(e) => setGratifHoraire(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
          <p className="text-xs text-slate-400 mt-1">Minimum legal 2026 : {GRATIF_HORAIRE_2026} &euro;/h (15% plafond SS)</p>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {resultat ? (
          <>
            <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg shadow-indigo-200/50">
              <p className="text-indigo-200 text-sm mb-1">Gratification mensuelle</p>
              <p className="text-4xl font-extrabold tracking-tight">{fmt(resultat.mensuel)} <span className="text-xl font-semibold">&euro;</span></p>
              <div className="h-px bg-white/20 my-3" />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-indigo-200">Total stage</p><p className="font-semibold text-lg">{fmt(resultat.totalBrut)} &euro;</p></div>
                <div><p className="text-indigo-200">Duree</p><p className="font-semibold text-lg">{resultat.mois.toFixed(1)} mois</p></div>
              </div>
            </div>

            <div className={`rounded-2xl p-4 ${resultat.obligatoire ? "bg-amber-50 border border-amber-200" : "bg-green-50 border border-green-200"}`}>
              <p className="text-sm font-semibold">{resultat.obligatoire ? "Gratification obligatoire" : "Gratification facultative"}</p>
              <p className="text-xs text-slate-500 mt-1">{resultat.obligatoire ? "Stage > 2 mois (44 jours) : gratification obligatoire" : "Stage \u2264 2 mois : gratification facultative"}</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-2">Details</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">Heures/mois</span><span className="font-bold">{fmt(resultat.heuresMois)}h</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Total heures</span><span className="font-bold">{fmt(resultat.totalHeures)}h</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Part exoneree</span><span className="font-bold text-green-600">{fmt(resultat.partExoneree)} &euro;</span></div>
                {resultat.partImposable > 0 && (
                  <div className="flex justify-between"><span className="text-slate-600">Part imposable</span><span className="font-bold text-amber-600">{fmt(resultat.partImposable)} &euro;</span></div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-6 text-center"><p className="text-slate-400 text-sm">Remplissez les champs</p></div>
        )}
        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-xs font-medium text-slate-400 mb-2">Regles 2026</p>
          <div className="space-y-1 text-sm text-slate-600">
            <p>Obligatoire si stage &gt; 2 mois (44 jours)</p>
            <p>Minimum : {GRATIF_HORAIRE_2026} &euro;/h (15% plafond SS)</p>
            <p>Exoneree de charges si &le; minimum legal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
