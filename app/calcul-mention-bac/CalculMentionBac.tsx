"use client";

import { useState } from "react";
import { calculerMention, MENTIONS } from "./mentionBacCalc";

export default function CalculMentionBac() {
  const [moyenne, setMoyenne] = useState<number>(13.5);

  const resultat = calculerMention(moyenne);

  const couleurMap: Record<string, string> = {
    red: "from-red-500 to-rose-600",
    slate: "from-slate-500 to-slate-600",
    amber: "from-amber-500 to-orange-500",
    blue: "from-blue-500 to-indigo-600",
    violet: "from-violet-500 to-purple-600",
    rose: "from-rose-500 to-pink-600",
  };

  const couleurBg: Record<string, string> = {
    red: "bg-red-50 border-red-200 text-red-900",
    slate: "bg-slate-50 border-slate-200 text-slate-900",
    amber: "bg-amber-50 border-amber-200 text-amber-900",
    blue: "bg-blue-50 border-blue-200 text-blue-900",
    violet: "bg-violet-50 border-violet-200 text-violet-900",
    rose: "bg-rose-50 border-rose-200 text-rose-900",
  };

  return (
    <div className="space-y-8">
      {/* Section saisie */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-lg font-bold text-slate-800 mb-6">
          Votre moyenne au baccalauréat
        </h2>

        <div>
          <label htmlFor="moyenne" className="block text-sm font-medium text-slate-700 mb-2">
            Moyenne générale obtenue (sur 20)
          </label>
          <input
            id="moyenne"
            type="number"
            min="0"
            max="20"
            step="0.01"
            value={moyenne}
            onChange={(e) => setMoyenne(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-medium text-slate-800 text-lg"
            placeholder="Ex: 13.5"
          />
          <p className="text-xs text-slate-500 mt-1">Entre 0 et 20</p>
        </div>

        {/* Slider visuel */}
        <div className="mt-6">
          <input
            type="range"
            min="0"
            max="20"
            step="0.1"
            value={moyenne}
            onChange={(e) => setMoyenne(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0</span>
            <span>10</span>
            <span>12</span>
            <span>14</span>
            <span>16</span>
            <span>18</span>
            <span>20</span>
          </div>
        </div>
      </div>

      {/* Résultat principal */}
      <div className={`bg-gradient-to-br ${couleurMap[resultat.mention.couleur]} rounded-2xl p-8 text-white shadow-lg`}>
        <p className="text-sm font-medium opacity-90 mb-2">Votre mention</p>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-5xl">{resultat.mention.emoji}</span>
          <p className="text-3xl font-bold">{resultat.mention.nom}</p>
        </div>
        <p className="text-sm opacity-90 mb-6">
          Moyenne : {resultat.moyenne.toFixed(2)}/20
        </p>

        <div className="space-y-3 text-sm opacity-95 border-t border-white border-opacity-30 pt-4">
          <div className="flex justify-between">
            <span>Bac obtenu :</span>
            <span className="font-semibold">{resultat.obtenu ? "Oui" : "Non (rattrapage possible si 8-10)"}</span>
          </div>
          <div className="flex justify-between">
            <span>Point Parcoursup bonus :</span>
            <span className="font-semibold">{resultat.pointsBonusParcoursup === 1 ? "+1 point" : "Aucun"}</span>
          </div>
          <div className="flex justify-between">
            <span>Félicitations du jury :</span>
            <span className="font-semibold">{resultat.felicitationsJury ? "Oui (18+)" : "Non"}</span>
          </div>
        </div>
      </div>

      {/* Prochaine palier */}
      {resultat.prochainePalier && resultat.pointsPourProchainePalier > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <p className="text-sm font-semibold text-blue-900 mb-2">
            📈 Pour atteindre la mention suivante
          </p>
          <p className="text-blue-800">
            Il vous manque <strong>{resultat.pointsPourProchainePalier.toFixed(2)} point(s)</strong> pour
            obtenir la mention <strong>{resultat.prochainePalier.nom}</strong> (seuil : {resultat.prochainePalier.seuilMin}/20).
          </p>
        </div>
      )}

      {/* Détail mention obtenue */}
      <div className={`rounded-2xl border p-6 ${couleurBg[resultat.mention.couleur]}`}>
        <h3 className="font-bold mb-2">Détails de la mention</h3>
        <p className="text-sm mb-3">{resultat.mention.description}</p>
        <div className="bg-white bg-opacity-50 rounded-lg p-3 text-sm">
          <strong>Avantages :</strong> {resultat.mention.bonus}
        </div>
      </div>

      {/* Tableau des mentions */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          Barème officiel des mentions au baccalauréat
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-3 font-semibold text-slate-700">Mention</th>
                <th className="text-left py-3 px-3 font-semibold text-slate-700">Moyenne</th>
                <th className="text-left py-3 px-3 font-semibold text-slate-700">Avantage</th>
              </tr>
            </thead>
            <tbody>
              {MENTIONS.filter((m) => m.id !== "insuffisant").map((m) => (
                <tr
                  key={m.id}
                  className={`border-b border-slate-100 ${m.id === resultat.mention.id ? "bg-blue-50" : ""}`}
                >
                  <td className="py-3 px-3 text-slate-800">
                    <span className="mr-2">{m.emoji}</span>
                    <strong>{m.nom}</strong>
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {m.seuilMin === 18 ? "18 et plus" : `${m.seuilMin} à ${m.seuilMax}`}
                  </td>
                  <td className="py-3 px-3 text-slate-600">{m.bonus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Source : Ministère de l&apos;Éducation Nationale (code de l&apos;éducation, art. D334-4).
        </p>
      </div>
    </div>
  );
}
