"use client";

import { useState } from "react";
import {
  brutVersNetBE,
  netVersBrutBE,
  type SituationFamiliale,
} from "./salaireBeCalc";

type Direction = "brut-vers-net" | "net-vers-brut";
type Periode = "mensuel" | "annuel";

const SITUATIONS: { value: SituationFamiliale; label: string; desc: string }[] = [
  { value: "isole", label: "Isole", desc: "Celibataire ou separe" },
  { value: "marie-1-revenu", label: "Marie 1 revenu", desc: "Conjoint sans revenu" },
  { value: "marie-2-revenus", label: "Marie 2 revenus", desc: "Conjoint salarie" },
];

function fmt(montant: number): string {
  return montant.toLocaleString("fr-BE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtInt(montant: number): string {
  return Math.round(montant).toLocaleString("fr-BE");
}

export default function CalculateurSalaireBE() {
  const [montant, setMontant] = useState<string>("3000");
  const [direction, setDirection] = useState<Direction>("brut-vers-net");
  const [periode, setPeriode] = useState<Periode>("mensuel");
  const [situation, setSituation] = useState<SituationFamiliale>("isole");
  const [nbEnfants, setNbEnfants] = useState<number>(0);

  const montantNum = parseFloat(montant) || 0;
  const facteurPeriode = periode === "annuel" ? 12 : 1;
  const montantMensuel = montantNum / facteurPeriode;

  const resultat =
    direction === "brut-vers-net"
      ? brutVersNetBE(montantMensuel, situation, nbEnfants)
      : netVersBrutBE(montantMensuel, situation, nbEnfants);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Je connais mon salaire :
          </label>
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setDirection("brut-vers-net")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                direction === "brut-vers-net"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Brut → Net
            </button>
            <button
              onClick={() => setDirection("net-vers-brut")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                direction === "net-vers-brut"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Net → Brut
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="montant-be"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Montant {direction === "brut-vers-net" ? "brut" : "net"}{" "}
            {periode === "mensuel" ? "mensuel" : "annuel"}
          </label>
          <div className="relative">
            <input
              id="montant-be"
              type="number"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-shadow"
              min="0"
              step="100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setPeriode("mensuel")}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                periode === "mensuel"
                  ? "bg-red-100 text-red-700"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setPeriode("annuel")}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                periode === "annuel"
                  ? "bg-red-100 text-red-700"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              Annuel
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Situation familiale
          </label>
          <div className="grid grid-cols-1 gap-2">
            {SITUATIONS.map((s) => (
              <button
                key={s.value}
                onClick={() => setSituation(s.value)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  situation === s.value
                    ? "border-red-500 bg-red-50/50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-sm font-bold text-slate-800">
                  {s.label}
                </span>
                <span className="block text-xs text-slate-400 mt-0.5">
                  {s.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="enfants-be"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Enfants a charge : {nbEnfants}
          </label>
          <input
            id="enfants-be"
            type="range"
            min="0"
            max="6"
            value={nbEnfants}
            onChange={(e) => setNbEnfants(parseInt(e.target.value, 10))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0</span>
            <span>3</span>
            <span>6</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-2xl p-6 shadow-lg shadow-red-200/50">
          <p className="text-sm text-red-100 mb-1">
            {direction === "brut-vers-net" ? "Net" : "Brut"}{" "}
            {periode === "mensuel" ? "mensuel" : "annuel"}
          </p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(
              periode === "annuel"
                ? direction === "brut-vers-net"
                  ? resultat.netAnnuel
                  : resultat.brutAnnuel
                : direction === "brut-vers-net"
                  ? resultat.netMensuel
                  : resultat.brutMensuel,
            )}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
          <p className="text-xs text-red-100 mt-2">
            Ratio net/brut : {fmt(resultat.tauxGlobal)} %
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Detail mensuel
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Brut</span>
              <span className="text-sm font-bold text-slate-800">
                {fmtInt(resultat.brutMensuel)} EUR
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">ONSS (13,07 %)</span>
              <span className="text-sm font-bold text-rose-600">
                - {fmtInt(resultat.onssMensuel)} EUR
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">
                Precompte + additionnels
              </span>
              <span className="text-sm font-bold text-rose-600">
                - {fmtInt(resultat.precompteMensuel)} EUR
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Net</span>
              <span className="text-base font-extrabold text-slate-800">
                {fmtInt(resultat.netMensuel)} EUR
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Detail annuel
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Brut</span>
              <span className="font-semibold text-slate-700">
                {fmtInt(resultat.brutAnnuel)} EUR
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Frais forfaitaires</span>
              <span className="font-semibold text-slate-700">
                {fmtInt(resultat.fraisForfaitAnnuel)} EUR
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Imposable</span>
              <span className="font-semibold text-slate-700">
                {fmtInt(resultat.imposableAnnuel)} EUR
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Quotite exemptee</span>
              <span className="font-semibold text-slate-700">
                {fmtInt(resultat.quotiteExempteeAnnuel)} EUR
              </span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-100">
              <span className="font-medium text-slate-600">Net annuel</span>
              <span className="font-bold text-slate-800">
                {fmtInt(resultat.netAnnuel)} EUR
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Calcul base sur les tranches IPP 2026 (25/40/45/50 %), ONSS 13,07 %,
          frais forfaitaires plafonnes 6 070 EUR et additionnels communaux
          moyens 7,5 %. Resultat indicatif.
        </div>
      </div>
    </div>
  );
}
