"use client";

import { useState } from "react";
import {
  calcBudgetSurvie,
  ZONE_LABELS,
  SITUATION_LABELS,
  TRANSPORT_LABELS,
  RSA_SEUL,
  RSA_COUPLE,
  RSA_COUPLE_2_ENFANTS,
  SMIC_NET,
  SEUIL_PAUVRETE,
  type Zone,
  type Situation,
  type Transport,
} from "./calcBudgetSurvie";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const ZONES: Zone[] = ["paris", "grande-ville", "ville-moyenne", "rural"];
const SITUATIONS: Situation[] = ["seul", "couple", "famille"];
const TRANSPORTS: Transport[] = ["transport-commun", "voiture", "velo-marche"];

export default function CalculateurBudgetSurvie() {
  const [zone, setZone] = useState<Zone>("ville-moyenne");
  const [situation, setSituation] = useState<Situation>("seul");
  const [transport, setTransport] = useState<Transport>("transport-commun");
  const [enfants, setEnfants] = useState("2");

  const enfantsNum = parseInt(enfants) || 2;
  const r = calcBudgetSurvie(zone, situation, transport, enfantsNum);
  const rsaRef = situation === "seul" ? RSA_SEUL : situation === "couple" ? RSA_COUPLE : RSA_COUPLE_2_ENFANTS;

  // Tri postes par montant decroissant pour le graphique
  const postesTries = [...r.postes].sort((a, b) => b.montant - a.montant);
  const maxPoste = postesTries[0]?.montant || 1;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Zone */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Ou vivez-vous ?
          </label>
          <div className="grid grid-cols-2 gap-2">
            {ZONES.map((z) => (
              <button
                key={z}
                onClick={() => setZone(z)}
                className={`px-3 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                  zone === z
                    ? "bg-red-50 border-red-400 text-red-700 shadow-sm"
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
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Situation
          </label>
          <div className="grid grid-cols-3 gap-2">
            {SITUATIONS.map((s) => (
              <button
                key={s}
                onClick={() => setSituation(s)}
                className={`px-3 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                  situation === s
                    ? "bg-red-50 border-red-400 text-red-700 shadow-sm"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {SITUATION_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        {/* Enfants (si famille) */}
        {situation === "famille" && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Nombre d&apos;enfants
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setEnfants(n.toString())}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                    enfants === n.toString()
                      ? "bg-red-50 border-red-400 text-red-700 shadow-sm"
                      : "border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  {n} enfant{n > 1 ? "s" : ""}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Transport */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Mode de transport principal
          </label>
          <div className="grid grid-cols-3 gap-2">
            {TRANSPORTS.map((t) => (
              <button
                key={t}
                onClick={() => setTransport(t)}
                className={`px-3 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                  transport === t
                    ? "bg-red-50 border-red-400 text-red-700 shadow-sm"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {t === "transport-commun" ? "🚌" : t === "voiture" ? "🚗" : "🚲"}{" "}
                {TRANSPORT_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Detail des postes avec barres */}
        <div className="mt-6 bg-slate-50 rounded-xl p-4">
          <p className="text-xs font-medium text-slate-400 mb-4">Repartition du budget</p>
          <div className="space-y-3">
            {postesTries.map((p) => (
              <div key={p.label}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-slate-600">
                    {p.icone} {p.label}
                  </span>
                  <span className="text-sm font-bold text-slate-700">{fmt(p.montant)} EUR</span>
                </div>
                <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 ${p.couleur} rounded-full transition-all duration-500`}
                    style={{ width: `${(p.montant / maxPoste) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-2 space-y-4">
        {/* Total */}
        <div className="bg-gradient-to-br from-red-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80 mb-1">Budget minimum mensuel</p>
          <p className="text-5xl font-extrabold tracking-tight">{fmt(r.total)}</p>
          <p className="text-lg font-medium mt-1">EUR / mois</p>
          <div className="h-px bg-white/20 my-4" />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white/70">Par jour</p>
              <p className="font-semibold">{fmt(Math.round(r.total / 30))} EUR</p>
            </div>
            <div>
              <p className="text-white/70">Par an</p>
              <p className="font-semibold">{fmt(r.total * 12)} EUR</p>
            </div>
          </div>
        </div>

        {/* Comparaison avec references */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-4">Comparaison avec les revenus de reference</p>
          <div className="space-y-4">
            {/* RSA */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">RSA ({situation === "famille" ? "couple + 2 enf." : SITUATION_LABELS[situation].toLowerCase()})</span>
                <span className="font-bold text-slate-700">{fmt(Math.round(rsaRef))} EUR</span>
              </div>
              <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-red-400 rounded-full"
                  style={{ width: `${Math.min((rsaRef / r.total) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-red-600 font-medium mt-1">
                Manque {fmt(Math.round(Math.max(r.total - rsaRef, 0)))} EUR/mois
              </p>
            </div>

            {/* Seuil pauvrete */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Seuil de pauvrete</span>
                <span className="font-bold text-slate-700">{fmt(SEUIL_PAUVRETE)} EUR</span>
              </div>
              <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 rounded-full ${SEUIL_PAUVRETE >= r.total ? "bg-emerald-400" : "bg-amber-400"}`}
                  style={{ width: `${Math.min((SEUIL_PAUVRETE / r.total) * 100, 100)}%` }}
                />
              </div>
              <p className={`text-xs font-medium mt-1 ${SEUIL_PAUVRETE >= r.total ? "text-emerald-600" : "text-amber-600"}`}>
                {SEUIL_PAUVRETE >= r.total
                  ? `Couvre le budget (+${fmt(Math.round(SEUIL_PAUVRETE - r.total))} EUR)`
                  : `Manque ${fmt(Math.round(r.total - SEUIL_PAUVRETE))} EUR/mois`}
              </p>
            </div>

            {/* SMIC */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">SMIC net</span>
                <span className="font-bold text-slate-700">{fmt(Math.round(SMIC_NET))} EUR</span>
              </div>
              <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 rounded-full ${SMIC_NET >= r.total ? "bg-emerald-400" : "bg-amber-400"}`}
                  style={{ width: `${Math.min((SMIC_NET / r.total) * 100, 100)}%` }}
                />
              </div>
              <p className={`text-xs font-medium mt-1 ${SMIC_NET >= r.total ? "text-emerald-600" : "text-amber-600"}`}>
                {SMIC_NET >= r.total
                  ? `Couvre le budget (+${fmt(Math.round(SMIC_NET - r.total))} EUR)`
                  : `Manque ${fmt(Math.round(r.total - SMIC_NET))} EUR/mois`}
              </p>
            </div>
          </div>
        </div>

        {/* Tableau comparatif par zone */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">Budget selon la zone</p>
          <div className="space-y-2">
            {ZONES.map((z) => {
              const res = calcBudgetSurvie(z, situation, transport, enfantsNum);
              const isCurrent = z === zone;
              return (
                <div
                  key={z}
                  className={`flex justify-between items-center px-3 py-2.5 rounded-lg ${
                    isCurrent ? "bg-red-50 border border-red-200 font-bold" : ""
                  }`}
                >
                  <span className={`text-sm ${isCurrent ? "text-red-700" : "text-slate-500"}`}>
                    {ZONE_LABELS[z]}
                  </span>
                  <span className={`text-sm font-bold ${isCurrent ? "text-red-700" : "text-slate-600"}`}>
                    {fmt(res.total)} EUR
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Le poste le plus lourd */}
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
          <p className="text-sm font-bold text-amber-800 mb-1">
            {postesTries[0]?.icone} Poste le plus lourd : {postesTries[0]?.label}
          </p>
          <p className="text-xs text-amber-700">
            {fmt(postesTries[0]?.montant || 0)} EUR/mois = {Math.round(((postesTries[0]?.montant || 0) / r.total) * 100)}% du budget total
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Estimation basee sur les couts moyens 2026 en France. Les montants reels varient
          selon le quartier, les habitudes de consommation et les aides percues (APL, CSS, prime d&apos;activite).
        </div>
      </div>
    </div>
  );
}
