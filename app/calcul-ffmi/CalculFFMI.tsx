"use client";

import { useState } from "react";
import {
  calculerFFMI,
  estimerMGDebutant,
  ECHELLE_FFMI_HOMME,
  ECHELLE_FFMI_FEMME,
  type Sexe,
} from "./ffmiCalc";

type ModeMG = "connu" | "estimer";

function fmt(n: number, digits = 1): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function CalculFFMI() {
  const [sexe, setSexe] = useState<Sexe>("homme");
  const [poidsKg, setPoidsKg] = useState<string>("80");
  const [tailleCm, setTailleCm] = useState<string>("180");
  const [modeMG, setModeMG] = useState<ModeMG>("connu");
  const [pourcentMG, setPourcentMG] = useState<string>("15");
  const [age, setAge] = useState<string>("30");

  // Calcul % MG estime si necessaire
  let mg = parseFloat(pourcentMG) || 0;
  if (modeMG === "estimer") {
    const imc =
      (parseFloat(poidsKg) || 0) /
      Math.pow((parseFloat(tailleCm) || 180) / 100, 2);
    mg = estimerMGDebutant(imc, parseFloat(age) || 30, sexe);
  }

  // Calcul FFMI
  const resultat = calculerFFMI(
    parseFloat(poidsKg) || 0,
    parseFloat(tailleCm) || 0,
    mg
  );

  const echelle = sexe === "homme" ? ECHELLE_FFMI_HOMME : ECHELLE_FFMI_FEMME;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Sexe */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Sexe
          </label>
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setSexe("homme")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                sexe === "homme"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Homme
            </button>
            <button
              onClick={() => setSexe("femme")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                sexe === "femme"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Femme
            </button>
          </div>
        </div>

        {/* Poids */}
        <div className="mb-6">
          <label htmlFor="poids" className="block text-sm font-medium text-slate-600 mb-2">
            Poids (kg)
          </label>
          <div className="relative">
            <input
              id="poids"
              type="number"
              value={poidsKg}
              onChange={(e) => setPoidsKg(e.target.value)}
              placeholder="ex: 80"
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-shadow"
              step="0.1"
            />
          </div>
        </div>

        {/* Taille */}
        <div className="mb-6">
          <label htmlFor="taille" className="block text-sm font-medium text-slate-600 mb-2">
            Taille (cm)
          </label>
          <div className="relative">
            <input
              id="taille"
              type="number"
              value={tailleCm}
              onChange={(e) => setTailleCm(e.target.value)}
              placeholder="ex: 180"
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-shadow"
              step="0.1"
            />
          </div>
        </div>

        {/* Mode % MG */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Masse grasse
          </label>
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setModeMG("connu")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                modeMG === "connu"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Je la connais
            </button>
            <button
              onClick={() => setModeMG("estimer")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                modeMG === "estimer"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              L&apos;estimer
            </button>
          </div>
        </div>

        {/* % MG connu */}
        {modeMG === "connu" && (
          <div className="mb-6">
            <label htmlFor="mg" className="block text-sm font-medium text-slate-600 mb-2">
              Pourcentage de masse grasse (%)
            </label>
            <div className="relative">
              <input
                id="mg"
                type="number"
                value={pourcentMG}
                onChange={(e) => setPourcentMG(e.target.value)}
                placeholder="ex: 15"
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-shadow"
                min="0"
                max="100"
                step="0.1"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                %
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Mesurez via pince, balance DEXA, ou formule Deurenberg.
            </p>
          </div>
        )}

        {/* Estimation age */}
        {modeMG === "estimer" && (
          <div className="mb-6">
            <label htmlFor="age" className="block text-sm font-medium text-slate-600 mb-2">
              Age (annees)
            </label>
            <div className="relative">
              <input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="ex: 30"
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-shadow"
                min="15"
                max="120"
                step="1"
              />
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Estimation via formule Deurenberg (approximatif).
            </p>
          </div>
        )}
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {resultat.ffmiNormalise > 0 ? (
          <>
            <div className="bg-gradient-to-br from-violet-600 to-purple-700 text-white rounded-2xl p-6 shadow-lg shadow-violet-200/50">
              <p className="text-sm text-violet-100 mb-1">FFMI normalise</p>
              <p className="text-4xl font-extrabold tracking-tight">
                {fmt(resultat.ffmiNormalise, 1)}{" "}
                <span className="text-lg font-semibold">pts</span>
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Masse maigre</p>
                  <p className="text-xl font-bold text-slate-800">
                    {fmt(resultat.masseMaigre, 1)} kg
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">FFMI brut</p>
                  <p className="text-xl font-bold text-slate-800">
                    {fmt(resultat.ffmiBrut, 1)}
                  </p>
                </div>
              </div>
            </div>

            <div className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-sm`}>
              <p className={`text-xs mb-2 ${resultat.couleur}`}>
                Niveau
              </p>
              <p className={`text-lg font-bold ${resultat.couleur} mb-2`}>
                {resultat.niveau}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {resultat.description}
              </p>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center">
            <p className="text-sm text-slate-400">
              Entrez vos mesures pour calculer
            </p>
          </div>
        )}

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Calcul selon formule Kouri. A titre informatif.
        </div>
      </div>

      {/* Echelle FFMI */}
      <div className="lg:col-span-5 mt-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          Echelle FFMI {sexe === "homme" ? "pour hommes" : "pour femmes"}
        </h3>
        <div className="space-y-3">
          {echelle.map((e) => (
            <div key={e.niveau} className="flex items-center gap-4">
              <div
                className={`flex-shrink-0 w-12 h-6 rounded bg-gradient-to-r ${e.couleur}`}
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  {e.niveau}
                </p>
                <p className="text-xs text-slate-500">
                  {fmt(e.min, 0)} — {fmt(e.max, 0)} pts
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
