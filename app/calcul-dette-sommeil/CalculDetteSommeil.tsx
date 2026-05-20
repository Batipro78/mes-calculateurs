"use client";

import { useState } from "react";
import {
  calculerDetteSommeil,
  getNiveauInfo,
  NIVEAUX_DETTE,
} from "./detteSommeilCalc";

const COULEURS_BG: Record<string, string> = {
  green: "from-green-500 to-emerald-600",
  yellow: "from-yellow-500 to-amber-500",
  orange: "from-orange-500 to-amber-600",
  red: "from-red-500 to-rose-600",
};

const COULEURS_LIGHT: Record<string, string> = {
  green: "bg-green-50 border-green-200 text-green-900",
  yellow: "bg-yellow-50 border-yellow-200 text-yellow-900",
  orange: "bg-orange-50 border-orange-200 text-orange-900",
  red: "bg-red-50 border-red-200 text-red-900",
};

export default function CalculDetteSommeil() {
  const [besoinIdeal, setBesoinIdeal] = useState<number>(8);
  const [nbJours, setNbJours] = useState<number>(7);
  const [heuresParNuit, setHeuresParNuit] = useState<number[]>([
    6, 6.5, 5, 7, 6, 5.5, 6,
  ]);

  function updateNuit(index: number, valeur: number) {
    const copie = [...heuresParNuit];
    copie[index] = valeur;
    setHeuresParNuit(copie);
  }

  function changerNbJours(nouveauNb: number) {
    const n = Math.max(7, Math.min(14, nouveauNb));
    setNbJours(n);
    const copie = [...heuresParNuit];
    while (copie.length < n) copie.push(7);
    while (copie.length > n) copie.pop();
    setHeuresParNuit(copie);
  }

  const heuresUtilisees = heuresParNuit.slice(0, nbJours);
  const resultat = calculerDetteSommeil(besoinIdeal, heuresUtilisees);
  const niveauInfo = getNiveauInfo(resultat.niveau);
  const couleurGradient = COULEURS_BG[niveauInfo.couleur];
  const couleurLight = COULEURS_LIGHT[niveauInfo.couleur];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-lg font-bold text-slate-800 mb-6">
          Vos paramètres de sommeil
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="besoin"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Besoin de sommeil idéal par nuit (heures)
            </label>
            <input
              id="besoin"
              type="number"
              min="4"
              max="12"
              step="0.5"
              value={besoinIdeal}
              onChange={(e) =>
                setBesoinIdeal(parseFloat(e.target.value) || 0)
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none font-medium text-slate-800"
            />
            <p className="text-xs text-slate-500 mt-1">
              Recommandation adulte : 7-9h (AASM, INSERM)
            </p>
          </div>

          <div>
            <label
              htmlFor="nb-jours"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Nombre de jours analysés
            </label>
            <input
              id="nb-jours"
              type="number"
              min="7"
              max="14"
              step="1"
              value={nbJours}
              onChange={(e) => changerNbJours(parseInt(e.target.value) || 7)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none font-medium text-slate-800"
            />
            <p className="text-xs text-slate-500 mt-1">
              Entre 7 et 14 jours (1 à 2 semaines)
            </p>
          </div>
        </div>

        <h3 className="text-sm font-bold text-slate-800 mb-3">
          Heures dormies chaque nuit
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {Array.from({ length: nbJours }).map((_, i) => (
            <div key={i}>
              <label
                htmlFor={`nuit-${i}`}
                className="block text-xs font-medium text-slate-600 mb-1"
              >
                Nuit {i + 1}
              </label>
              <input
                id={`nuit-${i}`}
                type="number"
                min="0"
                max="14"
                step="0.5"
                value={heuresParNuit[i] ?? 7}
                onChange={(e) =>
                  updateNuit(i, parseFloat(e.target.value) || 0)
                }
                className="w-full px-2 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm font-medium text-slate-800"
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className={`bg-gradient-to-br ${couleurGradient} rounded-2xl p-8 text-white shadow-lg`}
      >
        <div className="flex items-start gap-4 mb-4">
          <span className="text-4xl">{niveauInfo.emoji}</span>
          <div>
            <p className="text-sm font-medium opacity-90">Votre dette de sommeil</p>
            <p className="text-5xl font-bold">{resultat.detteHeures}h</p>
            <p className="text-sm opacity-90 mt-1">{niveauInfo.label}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mt-6 border-t border-white border-opacity-30 pt-4">
          <div>
            <p className="text-xs opacity-90">Moyenne par nuit</p>
            <p className="text-lg font-bold">{resultat.moyenneNuit}h</p>
          </div>
          <div>
            <p className="text-xs opacity-90">Total dormi</p>
            <p className="text-lg font-bold">{resultat.totalHeuresDormies}h</p>
          </div>
          <div>
            <p className="text-xs opacity-90">Total idéal</p>
            <p className="text-lg font-bold">{resultat.totalHeuresIdeal}h</p>
          </div>
        </div>
      </div>

      <div className={`border-2 rounded-2xl p-6 ${couleurLight}`}>
        <h3 className="font-bold mb-2">Interprétation</h3>
        <p className="text-sm leading-relaxed">{resultat.interpretation}</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          Conseils de récupération
        </h3>
        <ul className="space-y-3">
          {resultat.conseils.map((conseil, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
              <span className="text-indigo-500 font-bold mt-0.5">→</span>
              <span>{conseil}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          Échelle de gravité
        </h3>
        <div className="space-y-3">
          {NIVEAUX_DETTE.map((n) => {
            const isActive = n.id === resultat.niveau;
            return (
              <div
                key={n.id}
                className={`p-3 rounded-lg border-2 ${
                  isActive
                    ? COULEURS_LIGHT[n.couleur]
                    : "bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>{n.emoji}</span>
                  <strong>{n.label}</strong>
                </div>
                <p className="text-xs">{n.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
