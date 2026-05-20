"use client";

import { useState } from "react";
import {
  calculerPercentile,
  getMediane,
  type Sexe,
} from "./percentileBebeCalc";

function couleurPercentile(p: number): string {
  if (p < 3 || p > 97) return "bg-red-50 border-red-200 text-red-900";
  if (p < 10 || p > 90) return "bg-orange-50 border-orange-200 text-orange-900";
  if (p < 25 || p > 75) return "bg-yellow-50 border-yellow-200 text-yellow-900";
  return "bg-green-50 border-green-200 text-green-900";
}

const PERCENTILES_AFFICHAGE = [3, 10, 25, 50, 75, 90, 97];

export default function CalculPercentileBebe() {
  const [sexe, setSexe] = useState<Sexe>("garcon");
  const [ageMois, setAgeMois] = useState<number>(6);
  const [poids, setPoids] = useState<number>(7.9);
  const [taille, setTaille] = useState<number>(67.6);

  const resultat = calculerPercentile(sexe, ageMois, poids, taille);
  const mediane = getMediane(sexe, ageMois);

  return (
    <div className="space-y-8">
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-bold text-amber-900 mb-1">
              Avertissement médical
            </p>
            <p className="text-sm text-amber-800">
              Ce calculateur est un outil informatif basé sur les courbes
              OMS 2006. Il ne remplace en aucun cas l&apos;avis d&apos;un
              pédiatre. Seul un professionnel de santé peut interpréter la
              croissance globale de votre bébé sur le carnet de santé.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-lg font-bold text-slate-800 mb-6">
          Mesures de votre bébé
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Sexe
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSexe("garcon")}
                className={`px-4 py-3 rounded-lg font-medium transition border-2 ${
                  sexe === "garcon"
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "bg-white border-slate-300 text-slate-700 hover:border-blue-300"
                }`}
              >
                👦 Garçon
              </button>
              <button
                type="button"
                onClick={() => setSexe("fille")}
                className={`px-4 py-3 rounded-lg font-medium transition border-2 ${
                  sexe === "fille"
                    ? "bg-pink-500 border-pink-500 text-white"
                    : "bg-white border-slate-300 text-slate-700 hover:border-pink-300"
                }`}
              >
                👧 Fille
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="age-mois"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Âge (mois)
            </label>
            <input
              id="age-mois"
              type="number"
              min="0"
              max="24"
              step="1"
              value={ageMois}
              onChange={(e) => setAgeMois(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none font-medium text-slate-800"
            />
            <p className="text-xs text-slate-500 mt-1">Entre 0 et 24 mois</p>
          </div>

          <div>
            <label
              htmlFor="poids"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Poids (kg)
            </label>
            <input
              id="poids"
              type="number"
              min="1"
              max="20"
              step="0.1"
              value={poids}
              onChange={(e) => setPoids(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none font-medium text-slate-800"
            />
            <p className="text-xs text-slate-500 mt-1">
              Médiane à {ageMois} mois : {mediane.poids} kg
            </p>
          </div>

          <div>
            <label
              htmlFor="taille"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Taille (cm)
            </label>
            <input
              id="taille"
              type="number"
              min="40"
              max="100"
              step="0.5"
              value={taille}
              onChange={(e) => setTaille(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none font-medium text-slate-800"
            />
            <p className="text-xs text-slate-500 mt-1">
              Médiane à {ageMois} mois : {mediane.taille} cm
            </p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-8 text-white shadow-lg">
          <p className="text-sm font-medium opacity-90 mb-2">
            Percentile Poids
          </p>
          <p className="text-5xl font-bold mb-1">
            P{resultat.percentilePoids.toFixed(0)}
          </p>
          <p className="text-sm opacity-90 mb-4">
            {resultat.categoriePoids}
          </p>
          <div className="text-sm opacity-95 border-t border-white border-opacity-30 pt-3">
            <div className="flex justify-between">
              <span>Poids :</span>
              <span className="font-semibold">{resultat.poids} kg</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Médiane (P50) :</span>
              <span className="font-semibold">{mediane.poids} kg</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
          <p className="text-sm font-medium opacity-90 mb-2">
            Percentile Taille
          </p>
          <p className="text-5xl font-bold mb-1">
            P{resultat.percentileTaille.toFixed(0)}
          </p>
          <p className="text-sm opacity-90 mb-4">
            {resultat.categorieTaille}
          </p>
          <div className="text-sm opacity-95 border-t border-white border-opacity-30 pt-3">
            <div className="flex justify-between">
              <span>Taille :</span>
              <span className="font-semibold">{resultat.taille} cm</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Médiane (P50) :</span>
              <span className="font-semibold">{mediane.taille} cm</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8">
        <p className="text-sm font-medium text-slate-700 mb-2">IMC Bébé</p>
        <p className="text-4xl font-bold text-slate-800 mb-2">{resultat.imc}</p>
        <p className="text-sm text-slate-600">
          kg/m² — Pour les bébés, l&apos;IMC se lit toujours sur la courbe
          OMS adaptée à l&apos;âge et au sexe, jamais comme l&apos;IMC adulte.
        </p>
      </div>

      <div className={`border-2 rounded-2xl p-6 ${couleurPercentile(resultat.percentilePoids)}`}>
        <h3 className="font-bold mb-2">Interprétation du poids</h3>
        <p className="text-sm leading-relaxed">{resultat.interpretationPoids}</p>
      </div>

      <div className={`border-2 rounded-2xl p-6 ${couleurPercentile(resultat.percentileTaille)}`}>
        <h3 className="font-bold mb-2">Interprétation de la taille</h3>
        <p className="text-sm leading-relaxed">{resultat.interpretationTaille}</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          Les 7 percentiles principaux (OMS)
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {PERCENTILES_AFFICHAGE.map((p) => (
            <div
              key={p}
              className={`text-center p-2 rounded-lg border-2 ${
                Math.round(resultat.percentilePoids) === p
                  ? "bg-pink-100 border-pink-400"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <p className="text-xs font-bold text-slate-700">P{p}</p>
              <p className="text-xs text-slate-500 mt-1">
                {p === 3
                  ? "Très bas"
                  : p === 10
                    ? "Bas"
                    : p === 25
                      ? "Normal-"
                      : p === 50
                        ? "Médiane"
                        : p === 75
                          ? "Normal+"
                          : p === 90
                            ? "Haut"
                            : "Très haut"}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">
          La majorité des bébés (95%) se situent entre P3 et P97. La
          courbe individuelle compte plus qu&apos;une mesure isolée.
        </p>
      </div>
    </div>
  );
}
