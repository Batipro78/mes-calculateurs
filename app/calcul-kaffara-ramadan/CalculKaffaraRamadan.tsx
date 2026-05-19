"use client";

import { useState } from "react";
import {
  calculerCompensation,
  type TypeCompensation,
  REPAS_DEFAUT_EUR,
} from "./kaffaraCalc";

function fmt(n: number, digits = 0): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function CalculKaffaraRamadan() {
  const [typeComp, setTypeComp] = useState<TypeCompensation>("kaffara");
  const [nbJours, setNbJours] = useState<string>("1");
  const [prixRepas, setPrixRepas] = useState<string>(REPAS_DEFAUT_EUR.toString());

  const resultat = calculerCompensation({
    type_compensation: typeComp,
    nb_jours: Math.max(0, parseInt(nbJours) || 0),
    prix_repas: parseFloat(prixRepas) || REPAS_DEFAUT_EUR,
  });

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Section Type de compensation */}
        <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">
          Type de compensation
        </h3>

        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-600 mb-3">
            Cas de rupture ou absence de jeûne
          </label>
          <div className="space-y-2.5">
            {/* Kaffara */}
            <button
              onClick={() => setTypeComp("kaffara")}
              className={`w-full px-4 py-3.5 rounded-xl text-sm font-semibold transition-all text-left border ${
                typeComp === "kaffara"
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800 ring-2 ring-emerald-200"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <span className="font-bold">Kaffara — Rupture volontaire</span>
              <p className="text-xs text-slate-500 mt-1">
                Relation conjugale ou consommation intentionnelle
              </p>
            </button>

            {/* Fidya */}
            <button
              onClick={() => setTypeComp("fidya")}
              className={`w-full px-4 py-3.5 rounded-xl text-sm font-semibold transition-all text-left border ${
                typeComp === "fidya"
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800 ring-2 ring-emerald-200"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <span className="font-bold">Fidya — Incapacité permanente</span>
              <p className="text-xs text-slate-500 mt-1">
                Personnes âgées ou malades chroniques
              </p>
            </button>
          </div>
        </div>

        {/* Section Nombre de jours */}
        <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">
          Jours concernés
        </h3>

        <div className="mb-8">
          <label htmlFor="jours" className="block text-sm font-medium text-slate-600 mb-2">
            Nombre de jours {typeComp === "kaffara" ? "rompus volontairement" : "manqués"}
          </label>
          <div className="relative">
            <input
              id="jours"
              type="number"
              value={nbJours}
              onChange={(e) => setNbJours(e.target.value)}
              placeholder="ex: 1"
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
              min="0"
              step="1"
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {typeComp === "kaffara"
              ? "Chaque jour rompu volontairement"
              : "Jours où vous avez été incapable de jeûner"}
          </p>
        </div>

        {/* Section Prix repas */}
        <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">
          Prix unitaire
        </h3>

        <div className="mb-6">
          <label htmlFor="prix" className="block text-sm font-medium text-slate-600 mb-2">
            Prix par repas (€)
          </label>
          <div className="relative">
            <input
              id="prix"
              type="number"
              value={prixRepas}
              onChange={(e) => setPrixRepas(e.target.value)}
              placeholder="ex: 9"
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold pr-8 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
              step="0.5"
              min="0"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              €
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Moyenne France 2026 : 7–10 € selon sources caritatives
          </p>
        </div>
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {resultat.nb_jours > 0 ? (
          <>
            {/* Total principal */}
            <div className="bg-gradient-to-br from-emerald-600 to-green-700 text-white rounded-2xl p-6 shadow-lg shadow-emerald-200/50">
              <p className="text-sm text-emerald-100 mb-1">
                Total {typeComp === "kaffara" ? "Kaffara" : "Fidya"} à verser
              </p>
              <p className="text-4xl font-extrabold tracking-tight">
                {fmt(resultat.total, 2)} <span className="text-lg font-semibold">€</span>
              </p>
              <p className="text-sm text-emerald-100 mt-3">
                {resultat.nb_repas_requis} repas × {fmt(resultat.prix_repas, 2)} €
              </p>
            </div>

            {/* Détails */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Jours concernés</p>
                  <p className="text-xl font-bold text-slate-800">
                    {resultat.nb_jours} jour{resultat.nb_jours > 1 ? "s" : ""}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Repas à fournir</p>
                  <p className="text-xl font-bold text-slate-800">
                    {resultat.nb_repas_requis}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Par repas</p>
                  <p className="text-xl font-bold text-emerald-700">
                    {fmt(resultat.prix_repas, 2)} €
                  </p>
                </div>
              </div>
            </div>

            {/* Note de rappel */}
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-4 shadow-sm">
              <p className="text-sm text-emerald-800">
                <strong>À verser avant la fin du Ramadan.</strong><br />
                Répartissez vers les pauvres et nécessiteux.
              </p>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center">
            <p className="text-sm text-slate-400">
              Entrez le nombre de jours pour calculer
            </p>
          </div>
        )}

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-500 leading-relaxed">
          Kaffara : 60 repas/jour. Fidya : 1 repas/jour.
        </div>
      </div>
    </div>
  );
}
