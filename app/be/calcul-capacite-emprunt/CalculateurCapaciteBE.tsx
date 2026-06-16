"use client";
import { fmtIntBE as fmt } from "@/app/lib/fmt";

import { useState } from "react";
import {
  calculerCapaciteEmpruntBE,
  TAUX_MOYENS_BE_EMPRUNT,
  TAUX_ENDETTEMENT_MAX,
} from "./capaciteEmpruntBeCalc";

const DUREES = [15, 20, 25, 30];

export default function CalculateurCapaciteBE() {
  const [revenu, setRevenu] = useState<string>("2500");
  const [charges, setCharges] = useState<string>("0");
  const [duree, setDuree] = useState<number>(25);
  const [apport, setApport] = useState<string>("30000");

  const revenuNum = parseFloat(revenu) || 0;
  const chargesNum = parseFloat(charges) || 0;
  const apportNum = parseFloat(apport) || 0;
  const res = calculerCapaciteEmpruntBE(revenuNum, chargesNum, duree);
  const prixMax = res.prixMaxAvecApport(apportNum);

  // Comparaison par duree
  const comparaisonDurees = DUREES.map((d) => ({
    duree: d,
    res: calculerCapaciteEmpruntBE(revenuNum, chargesNum, d),
  }));

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label
            htmlFor="revenu-input"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Revenu mensuel net (foyer)
          </label>
          <div className="relative">
            <input
              id="revenu-input"
              type="number"
              value={revenu}
              onChange={(e) => setRevenu(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              min="0"
              step="100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="charges-input"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Charges existantes (autres credits, pensions alimentaires…)
          </label>
          <div className="relative">
            <input
              id="charges-input"
              type="number"
              value={charges}
              onChange={(e) => setCharges(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              min="0"
              step="50"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Duree du pret
          </label>
          <div className="grid grid-cols-4 gap-2">
            {DUREES.map((d) => (
              <button
                key={d}
                onClick={() => setDuree(d)}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  duree === d
                    ? "border-blue-500 bg-blue-50/50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-lg font-bold text-slate-800">{d}</span>
                <span className="text-xs text-slate-400 block">ans</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Taux moyen utilise : <strong>{TAUX_MOYENS_BE_EMPRUNT[duree]} %</strong>
          </p>
        </div>

        <div>
          <label
            htmlFor="apport-input"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Apport personnel (optionnel)
          </label>
          <div className="relative">
            <input
              id="apport-input"
              type="number"
              value={apport}
              onChange={(e) => setApport(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              min="0"
              step="5000"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            En Belgique, les banques exigent generalement un apport de 10-20 %
            + frais notaire et droits d&apos;enregistrement.
          </p>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg shadow-blue-200/50">
          <p className="text-sm text-blue-100 mb-1">Capacite d&apos;emprunt</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(res.capitalMax)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
          <p className="text-xs text-blue-100 mt-2">
            Mensualite max : {fmt(res.mensualiteMax)} EUR
            <br />
            (33 % de {fmt(revenuNum - chargesNum)} EUR dispo)
          </p>
        </div>

        {apportNum > 0 && (
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg shadow-emerald-200/50">
            <p className="text-sm text-emerald-100 mb-1">
              Prix max du bien (avec apport)
            </p>
            <p className="text-3xl font-extrabold tracking-tight">
              {fmt(prixMax)}{" "}
              <span className="text-base font-semibold">EUR</span>
            </p>
            <p className="text-xs text-emerald-100 mt-2">
              {fmt(res.capitalMax)} EUR pret + {fmt(apportNum)} EUR apport
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Capacite par duree
          </p>
          <div className="space-y-2 text-sm">
            {comparaisonDurees.map((c) => (
              <div
                key={c.duree}
                className={`flex justify-between p-2 rounded-lg ${
                  c.duree === duree ? "bg-blue-50" : ""
                }`}
              >
                <span className="text-slate-600">
                  {c.duree} ans ({TAUX_MOYENS_BE_EMPRUNT[c.duree]} %)
                </span>
                <span className="font-bold text-slate-800">
                  {fmt(c.res.capitalMax)} EUR
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Taux d&apos;endettement max applique :{" "}
          {(TAUX_ENDETTEMENT_MAX * 100).toFixed(0)} % (pratique bancaire BE
          standard). Certaines banques acceptent jusqu&apos;a 38 % pour les
          hauts revenus.
        </div>
      </div>
    </div>
  );
}
