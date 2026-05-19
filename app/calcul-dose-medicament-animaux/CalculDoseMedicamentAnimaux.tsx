"use client";

import { useState } from "react";
import {
  calculerDose,
  MEDICAMENTS_CHIEN,
  MEDICAMENTS_CHAT,
  type Animal,
  type Medicament,
  type ResultatDose,
} from "./doseMedicamentCalc";

export default function CalculDoseMedicamentAnimaux() {
  const [animal, setAnimal] = useState<Animal>("chien");
  const [medicament, setMedicament] = useState<Medicament>("milbemax");
  const [poidsKg, setPoidsKg] = useState<number>(25);
  const [resultat, setResultat] = useState<ResultatDose | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);

  const medicamentsDisponibles =
    animal === "chien" ? MEDICAMENTS_CHIEN : MEDICAMENTS_CHAT;

  // Reset medication si non disponible pour cet animal
  if (!medicamentsDisponibles.find((m) => m.id === medicament)) {
    setMedicament(medicamentsDisponibles[0].id);
  }

  function handleCalculer() {
    setErreur(null);
    setResultat(null);

    try {
      const res = calculerDose(animal, medicament, poidsKg);
      setResultat(res);
    } catch (err) {
      setErreur((err as Error).message);
    }
  }

  return (
    <div className="space-y-8">
      {/* ===== FORMULAIRE ===== */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-6 md:p-8 shadow-md">
        <h2 className="text-xl font-bold text-blue-900 mb-6">
          Paramètres de calcul
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Animal */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Animal
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setAnimal("chien")}
                className={`flex-1 py-2 px-4 rounded-lg font-bold transition text-sm ${
                  animal === "chien"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-blue-400"
                }`}
              >
                🐕 Chien
              </button>
              <button
                onClick={() => setAnimal("chat")}
                className={`flex-1 py-2 px-4 rounded-lg font-bold transition text-sm ${
                  animal === "chat"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-blue-400"
                }`}
              >
                🐱 Chat
              </button>
            </div>
          </div>

          {/* Médicament */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Médicament
            </label>
            <select
              value={medicament}
              onChange={(e) => setMedicament(e.target.value as Medicament)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 font-medium"
            >
              {medicamentsDisponibles.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nom}
                </option>
              ))}
            </select>
          </div>

          {/* Poids */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Poids (kg)
            </label>
            <input
              type="number"
              value={poidsKg}
              onChange={(e) => setPoidsKg(parseFloat(e.target.value) || 0)}
              min="0.5"
              max="100"
              step="0.5"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 font-medium"
            />
          </div>
        </div>

        <button
          onClick={handleCalculer}
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
        >
          Calculer la dose 💊
        </button>
      </div>

      {/* ===== ERREUR ===== */}
      {erreur && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-800">
          <p className="font-bold">Erreur :</p>
          <p>{erreur}</p>
        </div>
      )}

      {/* ===== RÉSULTAT ===== */}
      {resultat && (
        <div className="space-y-6">
          {/* Carte principale */}
          <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-cyan-600 rounded-2xl p-8 shadow-xl text-white">
            <h3 className="text-lg font-semibold mb-4 opacity-90">
              Dose pour votre animal
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm opacity-80">Médicament</p>
                <p className="text-2xl font-bold">{resultat.medicament}</p>
                <p className="text-xs opacity-75 mt-1">Marque : {resultat.marque}</p>
              </div>
              <div className="h-1 bg-white/30 rounded"></div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm opacity-80">Animal</p>
                  <p className="text-xl font-bold">{resultat.animal}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Poids</p>
                  <p className="text-xl font-bold">{resultat.poidsKg} kg</p>
                </div>
              </div>
              <div className="h-1 bg-white/30 rounded"></div>
              <div>
                <p className="text-sm opacity-80">Format</p>
                <p className="text-lg font-bold">{resultat.format}</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Quantité exacte</p>
                <p className="text-3xl font-extrabold text-yellow-100 mt-1">
                  {resultat.quantite}
                </p>
              </div>
              <div className="h-1 bg-white/30 rounded"></div>
              <div>
                <p className="text-sm opacity-80">Posologie</p>
                <p className="text-base font-semibold">{resultat.posologie}</p>
              </div>
            </div>
          </div>

          {/* Détails et conseils */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Notes */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
              <h4 className="font-bold text-blue-900 mb-3">📋 Conseils</h4>
              <ul className="space-y-2">
                {resultat.notes.map((note, idx) => (
                  <li key={idx} className="text-sm text-gray-800 flex gap-2">
                    <span className="text-blue-500">✓</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Avertissements */}
            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6">
              <h4 className="font-bold text-amber-900 mb-3">⚠️ Précautions</h4>
              <ul className="space-y-2">
                {resultat.avertissements.map((avert, idx) => (
                  <li key={idx} className="text-sm text-gray-800 flex gap-2">
                    <span className="text-amber-500">!</span>
                    <span>{avert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ===== DISCLAIMER OBLIGATOIRE ===== */}
      <div className="bg-red-100 border-2 border-red-500 rounded-xl p-6 mt-8 text-red-900">
        <p className="font-bold text-lg mb-3">
          ⚠️ IMPORTANT — Disclaimer Médical Vétérinaire
        </p>
        <ul className="space-y-2 text-sm">
          <li>
            ✓ Ce calcul est <strong>indicatif</strong> et basé sur les AMM
            françaises (notices officielles).
          </li>
          <li>
            ✓ <strong>TOUJOURS respecter la notice</strong> du médicament et
            consulter votre vétérinaire <strong>AVANT</strong> toute
            administration.
          </li>
          <li>
            ✓ Certains médicaments sont{" "}
            <strong>contre-indiqués pour des races spécifiques</strong>
            (ex: Collies sensibles à l&apos;ivermectine).
          </li>
          <li>
            ✓ En cas de <strong>surdosage ou réaction anormale</strong> :
            urgence vétérinaire immédiate.
          </li>
          <li>
            ✓ Ce calculateur ne remplace PAS une{" "}
            <strong>consultation vétérinaire</strong>.
          </li>
        </ul>
      </div>
    </div>
  );
}
