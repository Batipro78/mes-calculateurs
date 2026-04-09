"use client";

import { useState } from "react";
import { calcDPE } from "./dpeCalc";

const CLASSES_DPE = [
  { classe: "A", label: "Tres performant", max: 70, bg: "bg-[#009b6e]", text: "text-white", border: "border-[#009b6e]" },
  { classe: "B", label: "Performant", max: 110, bg: "bg-[#51b848]", text: "text-white", border: "border-[#51b848]" },
  { classe: "C", label: "Assez performant", max: 180, bg: "bg-[#adcc40]", text: "text-white", border: "border-[#adcc40]" },
  { classe: "D", label: "Peu performant", max: 250, bg: "bg-[#f4e435]", text: "text-slate-800", border: "border-[#f4e435]" },
  { classe: "E", label: "Energivore", max: 330, bg: "bg-[#f2a731]", text: "text-white", border: "border-[#f2a731]" },
  { classe: "F", label: "Tres energivore", max: 420, bg: "bg-[#e8732a]", text: "text-white", border: "border-[#e8732a]" },
  { classe: "G", label: "Passoire thermique", max: 999, bg: "bg-[#d63228]", text: "text-white", border: "border-[#d63228]" },
];

const CLASSES_GES = [
  { classe: "A", max: 6, bg: "bg-[#ddeedd]", text: "text-slate-800" },
  { classe: "B", max: 11, bg: "bg-[#bbddcc]", text: "text-slate-800" },
  { classe: "C", max: 30, bg: "bg-[#99ccaa]", text: "text-slate-800" },
  { classe: "D", max: 50, bg: "bg-[#77aa88]", text: "text-white" },
  { classe: "E", max: 70, bg: "bg-[#558866]", text: "text-white" },
  { classe: "F", max: 100, bg: "bg-[#336644]", text: "text-white" },
  { classe: "G", max: 999, bg: "bg-[#224433]", text: "text-white" },
];

const CHAUFFAGES = [
  { value: "gaz", label: "Gaz naturel", emoji: "🔥" },
  { value: "electrique", label: "Electricite", emoji: "⚡" },
  { value: "fioul", label: "Fioul", emoji: "🛢️" },
  { value: "pac", label: "Pompe a chaleur", emoji: "🌡️" },
  { value: "bois", label: "Bois / Pellet", emoji: "🪵" },
];

const ISOLATIONS = [
  { value: "aucune", label: "Aucune", desc: "Avant 1975, non renove" },
  { value: "partielle", label: "Partielle", desc: "Quelques travaux realises" },
  { value: "complete", label: "Complete", desc: "Isolation recente conforme RT" },
];

const VITRAGES = [
  { value: "simple", label: "Simple vitrage", desc: "Ancien, non isole" },
  { value: "double", label: "Double vitrage", desc: "Standard actuel" },
  { value: "triple", label: "Triple vitrage", desc: "Haute performance" },
];

const REGIONS = [
  { value: "nord", label: "Nord / Est", desc: "Hauts-de-France, Grand Est, Normandie" },
  { value: "centre", label: "Centre / Ile-de-France", desc: "IDF, Centre-Val-de-Loire, Bretagne" },
  { value: "sud", label: "Sud / Mediterannee", desc: "PACA, Occitanie, Nouvelle-Aquitaine" },
];

const DECENNIES = [1960, 1970, 1980, 1990, 2000, 2010, 2020];

function fmt(n: number, decimals = 0): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function CalculateurDPE() {
  const [surface, setSurface] = useState(80);
  const [chauffage, setChauffage] = useState("gaz");
  const [isolation, setIsolation] = useState("partielle");
  const [vitrage, setVitrage] = useState("double");
  const [anneeConstruction, setAnneeConstruction] = useState(1990);
  const [region, setRegion] = useState("centre");

  const resultat = calcDPE(surface, chauffage, isolation, vitrage, anneeConstruction, region);

  const idxEnergie = CLASSES_DPE.findIndex((c) => c.classe === resultat.classeEnergie);
  const idxGES = CLASSES_GES.findIndex((c) => c.classe === resultat.classeGES);

  // Suggestions de renovation
  const suggestions: string[] = [];
  if (isolation === "aucune") suggestions.push("Isolation des murs et combles : gain potentiel de 30 a 40% sur la consommation");
  else if (isolation === "partielle") suggestions.push("Completer l'isolation des combles et des ponts thermiques");
  if (vitrage === "simple") suggestions.push("Remplacement des fenetres par du double ou triple vitrage");
  if (chauffage === "fioul") suggestions.push("Remplacement de la chaudiere fioul par une PAC ou une chaudiere gaz condensation");
  if (chauffage === "electrique" && anneeConstruction < 2000) suggestions.push("Installation d'une pompe a chaleur (divise la facture par 2 a 3)");
  if (anneeConstruction < 1975 && isolation !== "complete") suggestions.push("Programme MaPrimeRenov' : jusqu'a 70% de subvention pour l'isolation");
  if (resultat.passoire) suggestions.push("Logement classifie passoire energetique (F/G) : interdiction de location progressive (G en 2025, F en 2028)");

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 space-y-6">

        {/* Surface */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <label htmlFor="surface" className="block text-sm font-medium text-slate-600 mb-2">
            Surface habitable
          </label>
          <div className="relative">
            <input
              id="surface"
              type="number"
              value={surface}
              onChange={(e) => setSurface(Math.max(10, parseInt(e.target.value) || 10))}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-14 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              min="10"
              max="1000"
              step="5"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">m²</span>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {[30, 50, 70, 90, 110, 150].map((s) => (
              <button
                key={s}
                onClick={() => setSurface(s)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  surface === s
                    ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {s} m²
              </button>
            ))}
          </div>
        </div>

        {/* Annee de construction */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <label htmlFor="annee" className="block text-sm font-medium text-slate-600 mb-2">
            Annee de construction
          </label>
          <div className="relative">
            <input
              id="annee"
              type="number"
              value={anneeConstruction}
              onChange={(e) => setAnneeConstruction(parseInt(e.target.value) || 1980)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              min="1900"
              max="2026"
              step="1"
            />
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {DECENNIES.map((d) => (
              <button
                key={d}
                onClick={() => setAnneeConstruction(d)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  anneeConstruction === d
                    ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Chauffage */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-600 mb-3">Type de chauffage</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CHAUFFAGES.map((c) => (
              <button
                key={c.value}
                onClick={() => setChauffage(c.value)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  chauffage === c.value
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                <span className="text-2xl">{c.emoji}</span>
                <span className="text-center text-xs">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Isolation */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-600 mb-3">Niveau d&apos;isolation</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ISOLATIONS.map((i) => (
              <button
                key={i.value}
                onClick={() => setIsolation(i.value)}
                className={`flex flex-col items-start gap-1 p-3 rounded-xl border-2 text-sm transition-all ${
                  isolation === i.value
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <span className={`font-semibold ${isolation === i.value ? "text-emerald-700" : "text-slate-700"}`}>
                  {i.label}
                </span>
                <span className="text-xs text-slate-500">{i.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Vitrage */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-600 mb-3">Type de vitrage</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {VITRAGES.map((v) => (
              <button
                key={v.value}
                onClick={() => setVitrage(v.value)}
                className={`flex flex-col items-start gap-1 p-3 rounded-xl border-2 text-sm transition-all ${
                  vitrage === v.value
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <span className={`font-semibold ${vitrage === v.value ? "text-emerald-700" : "text-slate-700"}`}>
                  {v.label}
                </span>
                <span className="text-xs text-slate-500">{v.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Region */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-600 mb-3">Region climatique</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {REGIONS.map((r) => (
              <button
                key={r.value}
                onClick={() => setRegion(r.value)}
                className={`flex flex-col items-start gap-1 p-3 rounded-xl border-2 text-sm transition-all ${
                  region === r.value
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <span className={`font-semibold ${region === r.value ? "text-emerald-700" : "text-slate-700"}`}>
                  {r.label}
                </span>
                <span className="text-xs text-slate-500">{r.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">

        {/* Alerte passoire */}
        {resultat.passoire && (
          <div className="bg-red-50 border-2 border-red-400 rounded-2xl p-4 flex gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-bold text-red-700">Passoire energetique</p>
              <p className="text-sm text-red-600 mt-1">
                Ce logement est classe {resultat.classeEnergie}. La location des logements G est interdite depuis janvier 2025, les F le seront en 2028.
              </p>
            </div>
          </div>
        )}

        {/* Consommation estimee */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs text-slate-400 mb-1">Consommation estimee</p>
          <p className="text-4xl font-extrabold text-slate-800">
            {fmt(resultat.consommationEstimee)} <span className="text-lg font-semibold text-slate-400">kWh/m²/an</span>
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Soit {fmt(resultat.consommationEstimee * surface)} kWh/an pour {surface} m²
          </p>
        </div>

        {/* Echelle DPE energie */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">Classe energetique DPE</p>
          <div className="space-y-1.5">
            {CLASSES_DPE.map((c, idx) => (
              <div
                key={c.classe}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  idx === idxEnergie ? `${c.bg} ${c.text} font-bold scale-105 shadow-sm` : "bg-slate-50 text-slate-500"
                }`}
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-lg shrink-0 ${
                  idx === idxEnergie ? "bg-white/20" : c.bg
                } ${idx !== idxEnergie ? c.text : ""}`}>
                  {c.classe}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-sm">{c.label}</span>
                </div>
                <span className="text-xs shrink-0">
                  {c.classe === "A" ? "≤ 70" : c.classe === "G" ? "> 420" : `≤ ${c.max}`} kWh
                </span>
                {idx === idxEnergie && (
                  <span className="text-lg">◄</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Echelle GES */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Emissions GES — {fmt(resultat.ges, 1)} kg CO₂/m²/an — Classe {resultat.classeGES}
          </p>
          <div className="flex gap-1.5">
            {CLASSES_GES.map((c, idx) => (
              <div
                key={c.classe}
                className={`flex-1 rounded-lg py-2 flex flex-col items-center gap-0.5 transition-all ${c.bg} ${c.text} ${
                  idx === idxGES ? "ring-2 ring-slate-800 scale-105 shadow-sm" : "opacity-60"
                }`}
              >
                <span className="text-xs font-extrabold">{c.classe}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2 text-center">
            Classe GES actuelle : <strong className="text-slate-700">{resultat.classeGES}</strong>
          </p>
        </div>

        {/* Cout annuel */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
          <p className="text-xs text-emerald-700 mb-1">Cout energetique annuel estimé</p>
          <p className="text-3xl font-extrabold text-emerald-800">
            {fmt(resultat.coutAnnuel)} €
          </p>
          <p className="text-sm text-emerald-700 mt-1">
            Pour {surface} m² — {resultat.consommationEstimee} kWh/m²/an
          </p>
          {resultat.economiesPotentielles > 0 && (
            <div className="mt-3 pt-3 border-t border-emerald-200">
              <p className="text-xs text-emerald-700">Economies potentielles (classe superieure)</p>
              <p className="text-xl font-bold text-emerald-700 mt-0.5">
                - {fmt(resultat.economiesPotentielles)} €/an
              </p>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <p className="text-sm font-bold text-amber-800 mb-3">
              Pistes d&apos;amelioration
            </p>
            <ul className="space-y-2">
              {suggestions.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-amber-700">
                  <span className="mt-0.5 shrink-0">→</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Disclaimer */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Estimation indicative. Seul un diagnostiqueur certifie peut etablir un DPE officiel (arrete du 31 mars 2021).
        </div>
      </div>
    </div>
  );
}
