"use client";

import { useState, useMemo } from "react";
import {
  calculerAgeCorrige,
  getNiveauInfo,
  NIVEAUX_PREMATURITE,
} from "./ageCorrigeCalc";

function toISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export default function CalculAgeCorrigePrema() {
  const today = useMemo(() => new Date(), []);

  // Defaults : naissance il y a 6 mois, terme prevu il y a 4 mois (donc 8 sem premat)
  const defaultNaissance = useMemo(() => {
    const d = new Date(today);
    d.setMonth(d.getMonth() - 6);
    return toISO(d);
  }, [today]);

  const defaultTerme = useMemo(() => {
    const d = new Date(today);
    d.setMonth(d.getMonth() - 4);
    return toISO(d);
  }, [today]);

  const [dateNaissance, setDateNaissance] = useState<string>(defaultNaissance);
  const [dateTerme, setDateTerme] = useState<string>(defaultTerme);
  const [dateActuelle, setDateActuelle] = useState<string>(toISO(today));

  const resultat = useMemo(() => {
    const dN = new Date(dateNaissance);
    const dT = new Date(dateTerme);
    const dA = new Date(dateActuelle);
    if (isNaN(dN.getTime()) || isNaN(dT.getTime()) || isNaN(dA.getTime())) {
      return null;
    }
    return calculerAgeCorrige(dN, dT, dA);
  }, [dateNaissance, dateTerme, dateActuelle]);

  const niveauInfo = resultat ? getNiveauInfo(resultat.niveauPrematurite) : null;

  return (
    <div className="space-y-8">
      {/* Section entree */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-lg font-bold text-slate-800 mb-6">
          Dates a saisir
        </h2>

        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <label htmlFor="naissance" className="block text-sm font-medium text-slate-700 mb-2">
              Date de naissance
            </label>
            <input
              id="naissance"
              type="date"
              value={dateNaissance}
              onChange={(e) => setDateNaissance(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none font-medium text-slate-800"
            />
            <p className="text-xs text-slate-500 mt-1">Date reelle de naissance</p>
          </div>

          <div>
            <label htmlFor="terme" className="block text-sm font-medium text-slate-700 mb-2">
              Date du terme prevu (DPA)
            </label>
            <input
              id="terme"
              type="date"
              value={dateTerme}
              onChange={(e) => setDateTerme(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none font-medium text-slate-800"
            />
            <p className="text-xs text-slate-500 mt-1">Date prevue d&apos;accouchement (40 SA)</p>
          </div>

          <div>
            <label htmlFor="actuelle" className="block text-sm font-medium text-slate-700 mb-2">
              Date actuelle
            </label>
            <input
              id="actuelle"
              type="date"
              value={dateActuelle}
              onChange={(e) => setDateActuelle(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none font-medium text-slate-800"
            />
            <p className="text-xs text-slate-500 mt-1">Aujourd&apos;hui par defaut</p>
          </div>
        </div>
      </div>

      {/* Resultats */}
      {resultat && niveauInfo && (
        <>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Age reel */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <p className="text-sm font-medium text-slate-700 mb-2">Age reel (chronologique)</p>
              <p className="text-4xl font-bold text-slate-800 mb-1">{resultat.ageReelTexte}</p>
              <p className="text-sm text-slate-500 mb-6">
                {resultat.ageReelJours} jours depuis la naissance
              </p>

              <div className="bg-slate-50 rounded-lg p-3 text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-600">En semaines :</span>
                  <span className="font-semibold text-slate-800">{resultat.ageReelSemaines} sem</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">En mois :</span>
                  <span className="font-semibold text-slate-800">{resultat.ageReelMois} mois</span>
                </div>
              </div>
            </div>

            {/* Age corrige (principal) */}
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-8 text-white shadow-lg">
              <p className="text-sm font-medium opacity-90 mb-2">Age corrige</p>
              <p className="text-4xl font-bold mb-1">{resultat.ageCorrigeTexte}</p>
              <p className="text-sm opacity-90 mb-6">
                {resultat.ageCorrigeJours} jours d&apos;age corrige
              </p>

              <div className="bg-white bg-opacity-20 rounded-lg p-3 text-sm space-y-1 border border-white border-opacity-30">
                <div className="flex justify-between">
                  <span className="opacity-90">En semaines :</span>
                  <span className="font-semibold">{resultat.ageCorrigeSemaines} sem</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-90">En mois :</span>
                  <span className="font-semibold">{resultat.ageCorrigeMois} mois</span>
                </div>
              </div>
            </div>
          </div>

          {/* Niveau prematurite */}
          <div className={`rounded-2xl p-8 border ${
            niveauInfo.id === "terme"
              ? "bg-green-50 border-green-200"
              : niveauInfo.id === "extreme"
              ? "bg-rose-50 border-rose-200"
              : niveauInfo.id === "grand"
              ? "bg-orange-50 border-orange-200"
              : niveauInfo.id === "moyen"
              ? "bg-amber-50 border-amber-200"
              : "bg-yellow-50 border-yellow-200"
          }`}>
            <div className="flex items-start gap-4">
              <span className="text-4xl">{niveauInfo.emoji}</span>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 mb-2">{niveauInfo.nom}</h3>
                <p className="text-sm text-slate-700 mb-3">{niveauInfo.description}</p>

                <div className="grid sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <p className="text-xs text-slate-500">Age gestationnel</p>
                    <p className="font-bold text-slate-800">{resultat.agePrenatalSA} SA</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <p className="text-xs text-slate-500">Semaines de prematurite</p>
                    <p className="font-bold text-slate-800">{resultat.semainesPrematurite} sem</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <p className="text-xs text-slate-500">Jours de prematurite</p>
                    <p className="font-bold text-slate-800">{resultat.joursPrematurite} jours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommandation suivi */}
          <div className={`rounded-2xl p-8 border ${
            resultat.correctionPertinente
              ? "bg-blue-50 border-blue-200"
              : "bg-slate-50 border-slate-200"
          }`}>
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              {resultat.correctionPertinente ? "Recommandation de suivi" : "Information"}
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {resultat.recommandationSuivi}
            </p>

            {resultat.correctionPertinente && (
              <div className="mt-4 bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-xs text-blue-700 font-medium">Mois restants avant fin de correction</p>
                <p className="text-2xl font-bold text-blue-900 mt-1">
                  {Math.ceil(resultat.moisAvantFinCorrection)} mois
                </p>
              </div>
            )}
          </div>

          {/* Echelle prematurite */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Echelle de la prematurite
            </h3>
            <div className="space-y-2">
              {NIVEAUX_PREMATURITE.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    n.id === resultat.niveauPrematurite
                      ? "bg-pink-50 border-pink-300 ring-2 ring-pink-200"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <span className="text-2xl">{n.emoji}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 text-sm">
                      {n.nom}{" "}
                      <span className="text-xs text-slate-500 font-normal">
                        ({n.saMin}-{n.saMax === 42 ? "42" : n.saMax}+ SA)
                      </span>
                    </p>
                    <p className="text-xs text-slate-600">{n.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4">
              SA = Semaines d&apos;Amenorrhee. Bebe a terme = 37-42 SA (40 SA en moyenne).
            </p>
          </div>

          {/* Avertissement */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-900">
              <strong>Important :</strong> Ce calcul est informatif. Il ne remplace pas
              le suivi par un pediatre ou neonatologue. Chaque enfant ne prematurement
              merite un suivi medical regulier et personnalise.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
