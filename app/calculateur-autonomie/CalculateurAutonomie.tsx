"use client";

import { useState } from "react";
import {
  calcBudgetSurvie,
  ZONE_LABELS,
  SITUATION_LABELS,
  TRANSPORT_LABELS,
  SMIC_NET,
  type Zone,
  type Situation,
  type Transport,
} from "../calculateur-budget-survie/calcBudgetSurvie";

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

const ZONES: Zone[] = ["paris", "grande-ville", "ville-moyenne", "rural"];
const SITUATIONS: Situation[] = ["seul", "couple", "famille"];
const TRANSPORTS: Transport[] = ["transport-commun", "voiture", "velo-marche"];

export default function CalculateurAutonomie() {
  const [epargne, setEpargne] = useState("10000");
  const [zone, setZone] = useState<Zone>("ville-moyenne");
  const [situation, setSituation] = useState<Situation>("seul");
  const [transport, setTransport] = useState<Transport>("transport-commun");
  const [revenuComp, setRevenuComp] = useState("0");

  const epargneNum = parseFloat(epargne) || 0;
  const revenuNum = parseFloat(revenuComp) || 0;

  const budget = calcBudgetSurvie(zone, situation, transport);
  const depenseMensuelle = Math.max(budget.total - revenuNum, 0);
  const autonomieMois = depenseMensuelle > 0 ? epargneNum / depenseMensuelle : Infinity;
  const autonomieJours = depenseMensuelle > 0 ? Math.floor((epargneNum / depenseMensuelle) * 30) : Infinity;
  const isInfini = autonomieMois === Infinity || autonomieMois > 600;

  // Date estimee d'epuisement
  const dateEpuisement = new Date();
  if (!isInfini) {
    dateEpuisement.setMonth(dateEpuisement.getMonth() + Math.floor(autonomieMois));
  }

  // Jalons
  const jalons = [
    { label: "25% de l'epargne", pct: 25, mois: autonomieMois * 0.25, montant: epargneNum * 0.75 },
    { label: "50% de l'epargne", pct: 50, mois: autonomieMois * 0.5, montant: epargneNum * 0.5 },
    { label: "75% de l'epargne", pct: 75, mois: autonomieMois * 0.75, montant: epargneNum * 0.25 },
    { label: "Epargne epuisee", pct: 100, mois: autonomieMois, montant: 0 },
  ];

  // Comparaison par zone
  const compZones = ZONES.map((z) => {
    const b = calcBudgetSurvie(z, situation, transport);
    const dep = Math.max(b.total - revenuNum, 0);
    const mois = dep > 0 ? epargneNum / dep : Infinity;
    return { zone: z, label: ZONE_LABELS[z], budget: b.total, mois, isCurrent: z === zone };
  });

  // Epargne necessaire pour X mois
  const cibles = [3, 6, 12, 18, 24];

  // Jauge progression
  const jaugeProgress = isInfini ? 0 : Math.min((1 / autonomieMois) * 100, 100);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Epargne */}
        <div className="mb-6">
          <label htmlFor="epargne" className="block text-sm font-medium text-slate-600 mb-2">
            Votre epargne disponible
          </label>
          <div className="relative">
            <input
              id="epargne"
              type="number"
              value={epargne}
              onChange={(e) => setEpargne(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              min="0"
              step="1000"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">EUR</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {[2000, 5000, 10000, 15000, 20000, 30000, 50000].map((m) => (
              <button
                key={m}
                onClick={() => setEpargne(m.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  epargne === m.toString()
                    ? "bg-amber-50 border-amber-300 text-amber-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {m.toLocaleString("fr-FR")} EUR
              </button>
            ))}
          </div>
        </div>

        {/* Zone */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">Zone</label>
          <div className="grid grid-cols-2 gap-2">
            {ZONES.map((z) => (
              <button
                key={z}
                onClick={() => setZone(z)}
                className={`px-3 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                  zone === z
                    ? "bg-amber-50 border-amber-400 text-amber-700 shadow-sm"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {ZONE_LABELS[z]}
              </button>
            ))}
          </div>
        </div>

        {/* Situation */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">Situation</label>
          <div className="grid grid-cols-3 gap-2">
            {SITUATIONS.map((s) => (
              <button
                key={s}
                onClick={() => setSituation(s)}
                className={`px-3 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                  situation === s
                    ? "bg-amber-50 border-amber-400 text-amber-700 shadow-sm"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {SITUATION_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        {/* Transport */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">Transport</label>
          <div className="grid grid-cols-3 gap-2">
            {TRANSPORTS.map((t) => (
              <button
                key={t}
                onClick={() => setTransport(t)}
                className={`px-3 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                  transport === t
                    ? "bg-amber-50 border-amber-400 text-amber-700 shadow-sm"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {t === "transport-commun" ? "🚌" : t === "voiture" ? "🚗" : "🚲"}{" "}
                {TRANSPORT_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Revenus complementaires */}
        <div className="mb-6">
          <label htmlFor="revenu" className="block text-sm font-medium text-slate-600 mb-2">
            Revenus complementaires mensuels (RSA, ARE, APL, freelance...)
          </label>
          <div className="relative">
            <input
              id="revenu"
              type="number"
              value={revenuComp}
              onChange={(e) => setRevenuComp(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-16 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              min="0"
              step="50"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">EUR/m</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              { label: "Aucun", v: 0 },
              { label: "RSA (647)", v: 647 },
              { label: "RSA+APL (~950)", v: 950 },
              { label: "ARE moyen (~1 200)", v: 1200 },
              { label: "SMIC (1 443)", v: 1443 },
            ].map((r) => (
              <button
                key={r.v}
                onClick={() => setRevenuComp(r.v.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  revenuComp === r.v.toString()
                    ? "bg-amber-50 border-amber-300 text-amber-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline jalons */}
        {!isInfini && (
          <div className="mt-6 bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-medium text-slate-400 mb-3">Timeline de votre epargne</p>
            <div className="space-y-3">
              {jalons.map((j) => (
                <div key={j.pct} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    j.pct === 100 ? "bg-red-100 text-red-700" : j.pct >= 75 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {j.pct}%
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">{j.label}</p>
                    <p className="text-xs text-slate-400">
                      Apres ~{j.mois < 1 ? `${Math.round(j.mois * 30)} jours` : `${j.mois.toFixed(1)} mois`}
                      {j.montant > 0 && ` — reste ${fmt(j.montant)} EUR`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Resultats */}
      <div className="lg:col-span-2 space-y-4">
        {/* Duree d'autonomie */}
        <div className="bg-gradient-to-br from-amber-500 to-red-600 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80 mb-1">Duree d&apos;autonomie</p>
          {isInfini ? (
            <>
              <p className="text-4xl font-extrabold tracking-tight">Illimitee</p>
              <p className="text-sm font-medium mt-1 text-white/80">Vos revenus couvrent vos depenses</p>
            </>
          ) : (
            <>
              <p className="text-5xl font-extrabold tracking-tight">
                {autonomieMois >= 1 ? `${Math.floor(autonomieMois)}` : "< 1"}
              </p>
              <p className="text-lg font-medium mt-1">
                {autonomieMois >= 1 ? "mois" : "mois"}{autonomieMois >= 1 && autonomieMois % 1 > 0.1 ? ` et ${Math.round((autonomieMois % 1) * 30)} jours` : ""}
              </p>
            </>
          )}
          <div className="h-px bg-white/20 my-4" />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white/70">Budget/mois</p>
              <p className="font-semibold">{fmt(budget.total)} EUR</p>
            </div>
            <div>
              <p className="text-white/70">A financer/mois</p>
              <p className="font-semibold">{fmt(depenseMensuelle)} EUR</p>
            </div>
          </div>
        </div>

        {/* Jauge d'epuisement (burn rate) */}
        {!isInfini && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-xs font-medium text-slate-400 mb-3">Vitesse de consommation</p>
            <div className="relative h-5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-red-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(jaugeProgress * 10, 100)}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs">
              <span className="text-emerald-600 font-medium">Lent</span>
              <span className="text-slate-400">{fmt(depenseMensuelle)} EUR/mois puises dans l&apos;epargne</span>
              <span className="text-red-600 font-medium">Rapide</span>
            </div>
            {!isInfini && (
              <p className="text-xs text-slate-500 mt-3">
                Epargne epuisee vers <strong>{dateEpuisement.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</strong>
              </p>
            )}
          </div>
        )}

        {/* Combien il faut pour X mois */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">Epargne necessaire pour :</p>
          <div className="space-y-2">
            {cibles.map((c) => {
              const montantNecessaire = depenseMensuelle * c;
              const estCouvert = epargneNum >= montantNecessaire;
              return (
                <div
                  key={c}
                  className={`flex justify-between items-center px-3 py-2 rounded-lg ${
                    estCouvert ? "bg-emerald-50" : ""
                  }`}
                >
                  <span className={`text-sm ${estCouvert ? "text-emerald-700 font-bold" : "text-slate-500"}`}>
                    {c} mois {estCouvert && "✓"}
                  </span>
                  <span className={`text-sm font-bold ${estCouvert ? "text-emerald-700" : "text-slate-600"}`}>
                    {fmt(montantNecessaire)} EUR
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparaison par zone */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">Autonomie selon la zone ({fmt(epargneNum)} EUR)</p>
          <div className="space-y-2">
            {compZones.map((row) => (
              <div
                key={row.zone}
                className={`flex justify-between items-center px-3 py-2.5 rounded-lg ${
                  row.isCurrent ? "bg-amber-50 border border-amber-200 font-bold" : ""
                }`}
              >
                <span className={`text-sm ${row.isCurrent ? "text-amber-700" : "text-slate-500"}`}>
                  {row.label}
                </span>
                <span className={`text-sm font-bold ${row.isCurrent ? "text-amber-700" : "text-slate-600"}`}>
                  {row.mois === Infinity ? "Illimite" : `${Math.floor(row.mois)} mois`}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Estimation basee sur le budget minimum de survie 2026. N&apos;inclut pas l&apos;inflation,
          les imprevus majeurs ni les loisirs. Consultez la page{" "}
          <a href="/calculateur-budget-survie" className="text-amber-600 underline">Budget Survie</a>{" "}
          pour le detail des postes.
        </div>
      </div>
    </div>
  );
}
