"use client";

import { useState } from "react";
import { calculerAgeChien, TAILLES_CHIEN, type TailleChien } from "./ageChienCalc";

export default function CalculAgeChienHumain() {
  const [ageChien, setAgeChien] = useState<number>(5);
  const [taille, setTaille] = useState<TailleChien>("moyen");

  const resultat = calculerAgeChien(ageChien, taille);
  const tailleInfo = TAILLES_CHIEN.find((t) => t.id === taille)!;

  return (
    <div className="space-y-8">
      {/* Section entrée */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-lg font-bold text-slate-800 mb-6">
          Informations sur votre chien
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Âge du chien */}
          <div>
            <label htmlFor="age-chien" className="block text-sm font-medium text-slate-700 mb-2">
              Âge de votre chien (années)
            </label>
            <input
              id="age-chien"
              type="number"
              min="0"
              max="30"
              step="0.5"
              value={ageChien}
              onChange={(e) => setAgeChien(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none font-medium text-slate-800"
              placeholder="Ex: 5"
            />
            <p className="text-xs text-slate-500 mt-1">Entre 0 et 30 ans</p>
          </div>

          {/* Taille */}
          <div>
            <label htmlFor="taille" className="block text-sm font-medium text-slate-700 mb-2">
              Taille de votre chien
            </label>
            <select
              id="taille"
              value={taille}
              onChange={(e) => setTaille(e.target.value as TailleChien)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none font-medium text-slate-800 bg-white"
            >
              {TAILLES_CHIEN.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nom} ({t.poidsKg})
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-1">Sélectionnez selon le poids</p>
          </div>
        </div>

        {/* Info taille sélectionnée */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">{tailleInfo.emoji}</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-900">{tailleInfo.nom}</p>
              <p className="text-xs text-amber-700 mt-1">
                Poids : {tailleInfo.poidsKg} • Exemples : {tailleInfo.exemples}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Méthode AVMA (principale) */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 text-white shadow-lg">
          <p className="text-sm font-medium opacity-90 mb-2">Âge en années humaines</p>
          <p className="text-5xl font-bold mb-1">{resultat.ageHumainAVMA}</p>
          <p className="text-sm opacity-90 mb-6">ans humains (Formule AVMA)</p>

          <div className="space-y-3 text-sm opacity-95 border-t border-white border-opacity-30 pt-4">
            <div className="flex justify-between">
              <span>Âge du chien :</span>
              <span className="font-semibold">{ageChien} ans</span>
            </div>
            <div className="flex justify-between">
              <span>Taille :</span>
              <span className="font-semibold">{tailleInfo.nom}</span>
            </div>
            <div className="flex justify-between">
              <span>Espérance de vie :</span>
              <span className="font-semibold">{resultat.esperanceVie}</span>
            </div>
          </div>
        </div>

        {/* Jauge de vie */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8">
          <p className="text-sm font-medium text-slate-700 mb-4">Progression de la vie</p>

          <div className="mb-4">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-3xl font-bold text-slate-800">{resultat.proportionVie}%</span>
              <span className="text-xs text-slate-500">de l&apos;espérance de vie</span>
            </div>

            {/* Barre de progression */}
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
                style={{ width: `${resultat.proportionVie}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 text-sm">
            <p className="text-slate-700">
              Votre chien a parcouru <strong>{resultat.proportionVie}%</strong> de son espérance de vie estimée.
            </p>
          </div>
        </div>
      </div>

      {/* Méthode scientifique Wang 2019 */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
        <div className="flex items-start gap-4">
          <span className="text-3xl">🧬</span>
          <div className="flex-1">
            <h3 className="font-bold text-blue-900 mb-2">Étude Wang 2019 (ADN Méthylation)</h3>
            <p className="text-sm text-blue-800 mb-3">
              Selon la recherche scientifique de Wang et al. (2019, Cell Systems), basée sur l&apos;analyse de la méthylation de l&apos;ADN :
            </p>
            <div className="bg-white border border-blue-200 rounded-lg p-4 mb-3">
              <p className="text-center">
                <span className="text-4xl font-bold text-blue-600">{resultat.ageHumainWang}</span>
                <span className="text-sm text-blue-700 ml-2">ans humains</span>
              </p>
            </div>
            <p className="text-xs text-blue-700">
              Cette formule utilise la biologie moléculaire (ln(âge)) et s&apos;applique principalement aux Labrador. Résultats plus élevés que l&apos;AVMA pour les jeunes chiens.
            </p>
          </div>
        </div>
      </div>

      {/* Tableau comparatif tailles */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Comparaison par taille</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-3 font-semibold text-slate-700">Catégorie</th>
                <th className="text-left py-3 px-3 font-semibold text-slate-700">Poids</th>
                <th className="text-center py-3 px-3 font-semibold text-slate-700">+Années/an</th>
                <th className="text-center py-3 px-3 font-semibold text-slate-700">Espérance</th>
              </tr>
            </thead>
            <tbody>
              {TAILLES_CHIEN.map((t) => (
                <tr
                  key={t.id}
                  className={`border-b border-slate-100 ${
                    t.id === taille ? "bg-amber-50" : ""
                  }`}
                >
                  <td className="py-3 px-3 text-slate-800">
                    <span className="mr-2">{t.emoji}</span>
                    {t.nom}
                  </td>
                  <td className="py-3 px-3 text-slate-600">{t.poidsKg}</td>
                  <td className="py-3 px-3 text-center font-medium text-slate-800">
                    +{t.ajoutAnnuel}
                  </td>
                  <td className="py-3 px-3 text-center text-slate-600">{t.esperanceVie}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          À partir de 3 ans du chien, le coefficient ajouté annuellement varie selon la taille (petit +4, moyen +5, grand +6, géant +7 ans humains).
        </p>
      </div>

      {/* Conseil santé */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
        <h3 className="font-bold text-green-900 mb-3">💚 Conseil santé selon l&apos;âge</h3>
        <div className="space-y-2 text-sm text-green-800">
          {ageChien < 1 && (
            <p>
              <strong>Chiot (0-1 an) :</strong> Vaccinations régulières, socialisation, alimentation spéciale chiot.
            </p>
          )}
          {ageChien >= 1 && ageChien < 7 && (
            <p>
              <strong>Adulte ({Math.round(ageChien)}-7 ans) :</strong> Entretien dentaire, exercice quotidien, rappel vaccinal annuel.
            </p>
          )}
          {ageChien >= 7 && (
            <p>
              <strong>Senior ({Math.round(ageChien)}+ ans) :</strong> Bilan gériatrique annuel, alimentation adaptée, exercice doux, surveillance arthrose.
            </p>
          )}
          <p>Consultez votre vétérinaire pour un suivi personnalisé adapté à votre compagnon.</p>
        </div>
      </div>
    </div>
  );
}
