"use client";

import { useState } from "react";
import {
  calculerDER,
  STADES_LABELS,
  ACTIVITE_LABELS,
  type Espece,
  type Stade,
  type Activite,
} from "./caloriesAnimauxCalc";

export default function CalculCaloriesChienChat() {
  const [espece, setEspece] = useState<Espece>("chien");
  const [poidsKg, setPoidsKg] = useState<number>(25);
  const [stade, setStade] = useState<Stade>("adulte");
  const [activite, setActivite] = useState<Activite>("normal");
  const [sterilise, setSterilise] = useState(false);

  const resultat = calculerDER({
    espece,
    poidsKg,
    stade,
    activite,
    sterilise,
  });

  const stadeOptions: Stade[] = ["chiot-0-4", "chiot-4-12", "adulte", "senior", "gestation", "allaitement"];
  const activiteOptions: Activite[] = ["sedentaire", "normal", "actif", "travail"];

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-gradient-to-br from-orange-50 to-red-50 p-8 shadow-lg">
      {/* Choix espece */}
      <div className="mb-8">
        <label className="mb-3 block text-sm font-semibold text-gray-700">Espèce</label>
        <div className="flex gap-4">
          {(["chien", "chat"] as const).map((e) => (
            <button
              key={e}
              onClick={() => setEspece(e)}
              className={`flex-1 rounded-lg px-4 py-3 font-semibold transition ${
                espece === e
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                  : "border-2 border-orange-200 bg-white text-gray-700 hover:border-orange-400"
              }`}
            >
              {e === "chien" ? "🐕 Chien" : "🐱 Chat"}
            </button>
          ))}
        </div>
      </div>

      {/* Poids */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Poids : {poidsKg} kg
        </label>
        <input
          type="range"
          min="1"
          max="100"
          step="0.5"
          value={poidsKg}
          onChange={(e) => setPoidsKg(parseFloat(e.target.value))}
          className="w-full accent-orange-500"
        />
        <div className="mt-2 flex gap-2">
          <input
            type="number"
            min="1"
            max="100"
            step="0.5"
            value={poidsKg}
            onChange={(e) => setPoidsKg(parseFloat(e.target.value) || 1)}
            className="w-24 rounded border border-gray-300 px-3 py-2 text-sm"
          />
          <span className="flex items-center text-gray-600">kg</span>
        </div>
      </div>

      {/* Stade de vie */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-semibold text-gray-700">Stade de vie</label>
        <select
          value={stade}
          onChange={(e) => setStade(e.target.value as Stade)}
          className="w-full rounded border border-gray-300 bg-white px-4 py-2 text-gray-700"
        >
          {stadeOptions.map((s) => (
            <option key={s} value={s}>
              {STADES_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      {/* Activité */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-semibold text-gray-700">Niveau d&apos;activité</label>
        <select
          value={activite}
          onChange={(e) => setActivite(e.target.value as Activite)}
          className="w-full rounded border border-gray-300 bg-white px-4 py-2 text-gray-700"
        >
          {activiteOptions.map((a) => (
            <option key={a} value={a}>
              {ACTIVITE_LABELS[a]}
            </option>
          ))}
        </select>
      </div>

      {/* Stérilisé/Castré */}
      <div className="mb-8 flex items-center gap-3">
        <input
          type="checkbox"
          id="sterilise"
          checked={sterilise}
          onChange={(e) => setSterilise(e.target.checked)}
          className="h-5 w-5 accent-orange-500"
        />
        <label htmlFor="sterilise" className="text-sm font-medium text-gray-700">
          Stérilisé/Castré (réduit les besoins énergétiques)
        </label>
      </div>

      {/* Résultats */}
      <div className="space-y-4 rounded-lg bg-white p-6">
        <div>
          <p className="text-sm text-gray-600">{resultat.description}</p>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="mb-4">
            <p className="text-xs text-gray-500">Besoin Énergétique de Repos (BER)</p>
            <p className="text-3xl font-bold text-orange-600">
              {resultat.ber.toLocaleString("fr-FR")}
            </p>
            <p className="text-sm text-gray-600">kcal/jour (au repos)</p>
          </div>

          <div className="rounded-lg bg-gradient-to-r from-orange-100 to-red-100 p-4">
            <p className="text-xs text-gray-600">Besoin Énergétique Quotidien (DER)</p>
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
              {resultat.der.toLocaleString("fr-FR")}
            </p>
            <p className="text-sm font-semibold text-gray-700">kcal/jour (résultat principal)</p>
          </div>
        </div>

        {/* Détail facteur */}
        <div className="border-t border-gray-200 pt-4 text-sm text-gray-600">
          <p>
            BER {resultat.ber.toLocaleString("fr-FR")} × facteur {resultat.facteur} ={" "}
            <strong className="text-orange-600">
              {resultat.der.toLocaleString("fr-FR")} kcal/jour
            </strong>
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-gray-700">
        <p className="mb-2 font-semibold text-blue-900">💡 À savoir</p>
        <ul className="list-inside list-disc space-y-1 text-xs">
          <li>Ce besoin est une estimation pour maintenir un poids stable</li>
          <li>Chaque animal est unique : conseil vétérinaire recommandé</li>
          <li>Adapter les portions selon l&apos;état corporel (score BCS)</li>
          <li>Pour perte de poids : réduire de 10-15% du DER avec exercice</li>
        </ul>
      </div>
    </div>
  );
}
