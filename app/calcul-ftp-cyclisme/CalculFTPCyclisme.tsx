"use client";

import { useState } from "react";
import { calculerFTP, calculerVAM, fmt, type Sexe } from "./ftpCyclismeCalc";

export default function CalculFTPCyclisme() {
  // Section FTP
  const [sexe, setSexe] = useState<Sexe>("homme");
  const [puissance20min, setPuissance20min] = useState<string>("250");
  const [poidsKg, setPoidsKg] = useState<string>("75");

  // Section VAM
  const [denivele, setDenivele] = useState<string>("800");
  const [tempsMinutes, setTempsMinutes] = useState<string>("30");

  const puissance = parseFloat(puissance20min) || 0;
  const poids = parseFloat(poidsKg) || 0;
  const resultFTP = calculerFTP(puissance, poids, sexe);

  const deniv = parseFloat(denivele) || 0;
  const temps = parseFloat(tempsMinutes) || 0;
  const resultVAM = calculerVAM(deniv, temps);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire FTP - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        {/* Section FTP */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Calcul FTP (Functional Threshold Power)
          </h2>

          {/* Sexe */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Sexe
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setSexe("homme")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  sexe === "homme"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Homme
              </button>
              <button
                onClick={() => setSexe("femme")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  sexe === "femme"
                    ? "bg-red-500 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Femme
              </button>
            </div>
          </div>

          {/* Puissance 20min */}
          <div className="mb-4">
            <label htmlFor="puissance" className="block text-sm font-semibold text-slate-700 mb-2">
              Puissance moyenne test 20 min (watts)
            </label>
            <input
              id="puissance"
              type="number"
              value={puissance20min}
              onChange={(e) => setPuissance20min(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="250"
              min="0"
            />
            <p className="text-xs text-slate-500 mt-1">
              Résultat de 20 minutes à puissance maximale soutenable.
            </p>
          </div>

          {/* Poids */}
          <div className="mb-6">
            <label htmlFor="poids" className="block text-sm font-semibold text-slate-700 mb-2">
              Poids corporel (kg)
            </label>
            <input
              id="poids"
              type="number"
              value={poidsKg}
              onChange={(e) => setPoidsKg(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="75"
              min="0"
            />
          </div>

          {/* Séparation */}
          <div className="border-t border-slate-200 pt-6 mb-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Calcul VAM (Vitesse Ascensionnelle Moyenne)
            </h3>

            {/* Dénivelé */}
            <div className="mb-4">
              <label htmlFor="denivele" className="block text-sm font-semibold text-slate-700 mb-2">
                Dénivelé (mètres)
              </label>
              <input
                id="denivele"
                type="number"
                value={denivele}
                onChange={(e) => setDenivele(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="800"
                min="0"
              />
              <p className="text-xs text-slate-500 mt-1">
                Dénivelé positif total de la montée ou col.
              </p>
            </div>

            {/* Temps */}
            <div className="mb-6">
              <label htmlFor="temps" className="block text-sm font-semibold text-slate-700 mb-2">
                Temps (minutes)
              </label>
              <input
                id="temps"
                type="number"
                value={tempsMinutes}
                onChange={(e) => setTempsMinutes(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="30"
                min="0"
              />
              <p className="text-xs text-slate-500 mt-1">
                Temps de montée en minutes décimales.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Résultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {/* Résultat FTP */}
        <div className={`rounded-2xl p-6 text-white shadow-sm ${resultFTP.niveauCouleur.replace("bg-", "bg-gradient-to-br from-") + " to-opacity-70"}`}>
          <div className={`${resultFTP.niveauCouleur} rounded-xl p-6`}>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Résultat FTP
            </p>
            <p className="text-4xl font-extrabold text-slate-800">
              {resultFTP.ftp}
            </p>
            <p className="text-sm text-slate-600 font-semibold mt-2">watts</p>

            <div className="mt-4 pt-4 border-t border-slate-300 space-y-2">
              <div>
                <p className="text-xs text-slate-600 font-semibold">
                  Watts par kilo
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {fmt(resultFTP.wattsParKilo, 2)} W/kg
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-600 font-semibold">
                  Niveau cycliste
                </p>
                <p className="text-base font-bold text-orange-600">
                  {resultFTP.niveau}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Résultat VAM */}
        <div className={`${resultVAM.niveauCouleur} rounded-2xl p-6`}>
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
            Résultat VAM
          </p>
          <p className="text-4xl font-extrabold text-slate-800">
            {resultVAM.vam}
          </p>
          <p className="text-sm text-slate-600 font-semibold mt-2">
            mètres par heure
          </p>

          <div className="mt-4 pt-4 border-t border-slate-300 space-y-2">
            <div>
              <p className="text-xs text-slate-600 font-semibold">
                Niveau de performance
              </p>
              <p className="text-base font-bold text-orange-600">
                {resultVAM.niveau}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
