"use client";

import { useState } from "react";
import { calculerAgeChat, getPhaseColor, PHASES_CHAT, type Environnement } from "./ageChatCalc";

export default function CalculAgeChatHumain() {
  const [ageAnnees, setAgeAnnees] = useState<number>(3);
  const [ageMois, setAgeMois] = useState<number>(0);
  const [environnement, setEnvironnement] = useState<Environnement>("interieur");

  const ageTotal = ageAnnees + ageMois / 12;
  const resultat = calculerAgeChat(ageTotal, environnement);
  const phaseColor = getPhaseColor(resultat.phase);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Formulaire */}
      <div className="bg-white rounded-lg border-2 border-orange-200 p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="age-annees" className="block text-sm font-semibold text-gray-700 mb-2">
              Âge de votre chat (années)
            </label>
            <input
              id="age-annees"
              type="number"
              min="0"
              max="50"
              step="1"
              value={ageAnnees}
              onChange={(e) => setAgeAnnees(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <div>
            <label htmlFor="age-mois" className="block text-sm font-semibold text-gray-700 mb-2">
              Mois supplémentaires (0-11)
            </label>
            <input
              id="age-mois"
              type="number"
              min="0"
              max="11"
              step="1"
              value={ageMois}
              onChange={(e) => setAgeMois(Math.min(11, Math.max(0, parseInt(e.target.value) || 0)))}
              className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <div>
            <label htmlFor="environnement" className="block text-sm font-semibold text-gray-700 mb-2">
              Environnement
            </label>
            <select
              id="environnement"
              value={environnement}
              onChange={(e) => setEnvironnement(e.target.value as Environnement)}
              className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            >
              <option value="interieur">Chat d&apos;intérieur (13-17 ans)</option>
              <option value="exterieur">Chat d&apos;extérieur (5-7 ans)</option>
              <option value="mixte">Chat mixte intérieur/extérieur (~12 ans)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Résultat principal */}
      <div className={`bg-gradient-to-br ${phaseColor} rounded-xl p-8 text-white shadow-lg`}>
        <div className="text-center space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-90">Équivalent en années humaines</p>
          <div className="text-6xl font-bold">{resultat.ageHumain}</div>
          <p className="text-xl">
            Votre chat de <strong>{ageAnnees}</strong>
            {ageMois > 0 && ` ans et ${ageMois} mois`} a l&apos;équivalent de{" "}
            <strong>{resultat.ageHumain}</strong> ans humains
          </p>
        </div>
      </div>

      {/* Carte phase de vie */}
      <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{resultat.phaseInfo.emoji}</span>
          <div>
            <h3 className="text-2xl font-bold text-orange-900">{resultat.phaseInfo.nom}</h3>
            <p className="text-sm text-orange-700">{resultat.phaseInfo.ageHumainEquivalent}</p>
          </div>
        </div>
        <p className="text-gray-700">{resultat.phaseInfo.description}</p>
        <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
          <p className="text-sm font-semibold text-gray-900 mb-2">Conseils santé :</p>
          <p className="text-sm text-gray-600">{resultat.phaseInfo.conseilsSante}</p>
        </div>
      </div>

      {/* Espérance de vie */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
        <p className="text-sm font-semibold text-blue-900 mb-2">Espérance de vie restante</p>
        <p className="text-lg font-bold text-blue-700">{resultat.esperanceVieRestante}</p>
        <p className="text-xs text-blue-600 mt-3">
          ℹ️ Les chats d&apos;intérieur vivent généralement 5-7 ans de plus que ceux d&apos;extérieur. Ces chiffres
          sont des moyennes statistiques; chaque chat est unique.
        </p>
      </div>

      {/* Tableau phases */}
      <div className="overflow-x-auto">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Toutes les phases de la vie du chat</h3>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-orange-100 border-2 border-orange-300">
              <th className="px-4 py-2 text-left font-semibold text-gray-900">Phase</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-900">Âge chat</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-900">Équivalent humain</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-900">Description</th>
            </tr>
          </thead>
          <tbody>
            {PHASES_CHAT.map((phase, idx) => (
              <tr key={phase.id} className={idx % 2 === 0 ? "bg-white" : "bg-orange-50"}>
                <td className="px-4 py-3 font-semibold text-gray-900">
                  {phase.emoji} {phase.nom}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {phase.ageChatMin === phase.ageChatMax ? `${phase.ageChatMin}` : `${phase.ageChatMin}-${phase.ageChatMax}`}
                </td>
                <td className="px-4 py-3 text-gray-700">{phase.ageHumainEquivalent}</td>
                <td className="px-4 py-3 text-gray-600">{phase.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info complémentaire */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-4 border-l-4 border-orange-500">
        <h3 className="font-bold text-gray-900">Pourquoi pas 1 an = 7 ans humain ?</h3>
        <p className="text-sm text-gray-700">
          La formule <strong>« 1 an de chat = 7 ans humains »</strong> est un mythe populaire mais imprécis. En réalité,
          un chaton d&apos;un an a atteint sa maturité sexuelle et adulte, ce qui équivaut plutôt à 15 ans humains. La
          seconde année compte pour 9 années supplémentaires (total 24 ans à 2 ans). Après 2 ans, chaque année chat
          ajoute environ 4 années humaines.
        </p>
        <p className="text-sm text-gray-700">
          Cette formule AAFP (American Association of Feline Practitioners) tient compte de la courbe de croissance
          rapide du chaton, puis du ralentissement du vieillissement à l&apos;âge adulte.
        </p>
      </div>

      {/* Intérieur vs extérieur */}
      <div className="bg-amber-50 rounded-lg p-6 space-y-4 border-l-4 border-amber-600">
        <h3 className="font-bold text-gray-900">Chat d&apos;intérieur vs extérieur : l&apos;impact sur la durée de vie</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-white rounded p-4 border-2 border-green-300">
            <p className="font-semibold text-green-700 mb-2">🏠 Chat d&apos;intérieur</p>
            <p className="text-sm text-gray-700">
              <strong>Espérance de vie:</strong> 13-17 ans (moyenne 15-16 ans)
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Protégé des accidents, maladies infectieuses, prédateurs et routes. Bonne qualité de vie si enrichissement.
            </p>
          </div>
          <div className="bg-white rounded p-4 border-2 border-red-300">
            <p className="font-semibold text-red-700 mb-2">🚗 Chat d&apos;extérieur</p>
            <p className="text-sm text-gray-700">
              <strong>Espérance de vie:</strong> 5-7 ans (moyenne 6 ans)
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Risques : accidents routiers, combats, maladies (FIV, FeLV), parasites, intoxications.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 text-xs text-gray-700">
        <p>
          <strong>⚠️ Disclaimer :</strong> Ce calcul est basé sur les recommandations de l&apos;AAFP (American
          Association of Feline Practitioners) et International Cat Care. Il s&apos;agit d&apos;une estimation. Pour la
          santé et le bien-être de votre chat, consultez votre vétérinaire. Chaque chat vieillit différemment selon sa
          génétique, sa race, son mode de vie et ses soins.
        </p>
      </div>
    </div>
  );
}
