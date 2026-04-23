"use client";

import { useState, useMemo } from "react";
import { calcCritair, type CritairClasse } from "./critairCalc";

const TYPES_VEHICULE = [
  { value: "voiture", label: "Voiture", icon: "\uD83D\uDE97" },
  { value: "utilitaire", label: "Utilitaire", icon: "\uD83D\uDE90" },
  { value: "2-roues", label: "2-roues", icon: "\uD83C\uDFCD\uFE0F" },
  { value: "poids-lourd", label: "Poids lourd", icon: "\uD83D\uDE9B" },
];

const CARBURANTS = [
  { value: "essence", label: "Essence", icon: "\u26FD" },
  { value: "diesel", label: "Diesel", icon: "\uD83D\uDFE4" },
  { value: "electrique", label: "Electrique", icon: "\u26A1" },
  { value: "hybride-rechargeable", label: "Hybride rech.", icon: "\uD83D\uDD0B" },
  { value: "gpl", label: "GPL / GNV", icon: "\uD83D\uDCA8" },
];

const MOIS = [
  { value: "01", label: "Janvier" },
  { value: "02", label: "Fevrier" },
  { value: "03", label: "Mars" },
  { value: "04", label: "Avril" },
  { value: "05", label: "Mai" },
  { value: "06", label: "Juin" },
  { value: "07", label: "Juillet" },
  { value: "08", label: "Aout" },
  { value: "09", label: "Septembre" },
  { value: "10", label: "Octobre" },
  { value: "11", label: "Novembre" },
  { value: "12", label: "Decembre" },
];

function getAnnees(): number[] {
  const annees: number[] = [];
  for (let a = 2026; a >= 1990; a--) {
    annees.push(a);
  }
  return annees;
}

function getBadgeBg(classe: CritairClasse): string {
  switch (classe) {
    case 0: return "bg-[#00B050]";
    case 1: return "bg-[#8B5CF6]";
    case 2: return "bg-[#EAB308]";
    case 3: return "bg-[#F97316]";
    case 4: return "bg-[#881337]";
    case 5: return "bg-[#6B7280]";
    default: return "bg-[#1F2937]";
  }
}

function getBadgeBorder(classe: CritairClasse): string {
  switch (classe) {
    case 0: return "border-[#00B050]";
    case 1: return "border-[#8B5CF6]";
    case 2: return "border-[#EAB308]";
    case 3: return "border-[#F97316]";
    case 4: return "border-[#881337]";
    case 5: return "border-[#6B7280]";
    default: return "border-[#1F2937]";
  }
}

function getResultBg(classe: CritairClasse): string {
  switch (classe) {
    case 0: return "bg-green-50 border-green-200";
    case 1: return "bg-violet-50 border-violet-200";
    case 2: return "bg-yellow-50 border-yellow-200";
    case 3: return "bg-orange-50 border-orange-200";
    case 4: return "bg-rose-50 border-rose-200";
    case 5: return "bg-slate-50 border-slate-200";
    default: return "bg-slate-100 border-slate-300";
  }
}

function getTextColor(classe: CritairClasse): string {
  switch (classe) {
    case 0: return "text-green-800";
    case 1: return "text-violet-800";
    case 2: return "text-yellow-800";
    case 3: return "text-orange-800";
    case 4: return "text-rose-800";
    case 5: return "text-slate-700";
    default: return "text-slate-800";
  }
}

export default function VignetteCritair() {
  const [typeVehicule, setTypeVehicule] = useState("voiture");
  const [carburant, setCarburant] = useState("essence");
  const [mois, setMois] = useState("06");
  const [annee, setAnnee] = useState("2018");
  const annees = useMemo(() => getAnnees(), []);

  const dateImmat = `${annee}-${mois}`;
  const resultat = calcCritair(typeVehicule, carburant, dateImmat);

  return (
    <div className="space-y-8">
      {/* Formulaire */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        {/* Type de vehicule */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Type de vehicule
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TYPES_VEHICULE.map((t) => (
              <button
                key={t.value}
                onClick={() => setTypeVehicule(t.value)}
                className={`flex flex-col items-center gap-1 p-4 rounded-xl border-2 transition-all ${
                  typeVehicule === t.value
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : "border-slate-200 hover:border-blue-300 bg-white"
                }`}
              >
                <span className="text-2xl">{t.icon}</span>
                <span className="text-sm font-medium text-slate-800">
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Carburant */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Type de carburant / energie
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {CARBURANTS.map((c) => (
              <button
                key={c.value}
                onClick={() => setCarburant(c.value)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
                  carburant === c.value
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : "border-slate-200 hover:border-blue-300 bg-white"
                }`}
              >
                <span className="text-xl">{c.icon}</span>
                <span className="text-xs font-medium text-slate-800">
                  {c.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Date d'immatriculation */}
        {carburant !== "electrique" && (
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Date de 1ere immatriculation
            </label>
            <div className="flex gap-3">
              <select
                value={mois}
                onChange={(e) => setMois(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {MOIS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
              <select
                value={annee}
                onChange={(e) => setAnnee(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {annees.map((a) => (
                  <option key={a} value={String(a)}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Resultat — Vignette */}
      <div className={`rounded-2xl border-2 p-6 ${getResultBg(resultat.classe)}`}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Badge vignette */}
          <div className="flex-shrink-0">
            <div
              className={`w-32 h-32 rounded-full flex flex-col items-center justify-center text-white shadow-lg border-4 border-white ${getBadgeBg(resultat.classe)}`}
            >
              {resultat.classe === "non-classe" ? (
                <>
                  <span className="text-3xl font-black">X</span>
                  <span className="text-[10px] font-bold uppercase tracking-wide">
                    Non classe
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[10px] font-bold uppercase tracking-wide">
                    Crit&apos;Air
                  </span>
                  <span className="text-5xl font-black leading-none">
                    {resultat.classe}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Infos */}
          <div className="flex-1 text-center md:text-left">
            <h2 className={`text-2xl font-extrabold mb-1 ${getTextColor(resultat.classe)}`}>
              {resultat.label}
            </h2>
            <p className="text-slate-600 mb-3">{resultat.description}</p>
            <p className="text-sm text-slate-500 italic">{resultat.conseil}</p>
          </div>
        </div>

        {/* Restrictions ZFE */}
        <div className="mt-6">
          <h3 className={`text-sm font-bold uppercase tracking-wide mb-3 ${getTextColor(resultat.classe)}`}>
            Restrictions ZFE
          </h3>
          <ul className="space-y-2">
            {resultat.restrictionsZFE.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${getBadgeBg(resultat.classe)}`} />
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* Prix et validite */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="bg-white/80 rounded-xl p-4">
            <div className="text-xs font-semibold text-slate-500 uppercase mb-1">
              Prix de la vignette
            </div>
            <div className="text-xl font-black text-slate-800">
              {resultat.classe === "non-classe" ? "Non disponible" : "3,72 \u20AC"}
            </div>
            {resultat.classe !== "non-classe" && (
              <div className="text-xs text-slate-500 mt-1">
                3,70 \u20AC + 0,02 \u20AC d&apos;affranchissement
              </div>
            )}
          </div>
          <div className="bg-white/80 rounded-xl p-4">
            <div className="text-xs font-semibold text-slate-500 uppercase mb-1">
              Validite
            </div>
            <div className="text-sm font-medium text-slate-800">
              {resultat.validite}
            </div>
          </div>
        </div>

        {/* Lien commande */}
        {resultat.classe !== "non-classe" && (
          <div className="mt-6 text-center">
            <a
              href="https://www.certificat-air.gouv.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold shadow-md hover:opacity-90 transition-opacity ${getBadgeBg(resultat.classe)}`}
            >
              Commander ma vignette Crit&apos;Air
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <p className="text-xs text-slate-500 mt-2">
              Site officiel du Ministere de la Transition Ecologique
            </p>
          </div>
        )}
      </div>

      {/* ZFE en France */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          Principales ZFE en France (2026)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { ville: "Paris", depuis: "2015", interdit: "Crit'Air 3+" },
            { ville: "Lyon", depuis: "2020", interdit: "Crit'Air 3+" },
            { ville: "Marseille", depuis: "2022", interdit: "Crit'Air 4+" },
            { ville: "Toulouse", depuis: "2024", interdit: "Crit'Air 4+" },
            { ville: "Strasbourg", depuis: "2022", interdit: "Crit'Air 3+" },
            { ville: "Grenoble", depuis: "2020", interdit: "Crit'Air 3+" },
            { ville: "Rouen", depuis: "2022", interdit: "Crit'Air 4+" },
            { ville: "Nice", depuis: "2022", interdit: "Crit'Air 4+" },
          ].map((z) => (
            <div
              key={z.ville}
              className="bg-slate-50 rounded-xl p-3 text-center"
            >
              <div className="font-bold text-slate-800 text-sm">{z.ville}</div>
              <div className="text-xs text-slate-500">Depuis {z.depuis}</div>
              <div className="text-xs font-semibold text-red-600 mt-1">
                {z.interdit} interdit
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
