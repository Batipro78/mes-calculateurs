"use client";

import { useState, useMemo } from "react";
import {
  calculerCoutTrajet,
  CARBURANTS,
  getCarburantInfo,
  type TypeCarburant,
} from "./coutTrajetCalc";

export default function CalculCoutTrajetVoiture() {
  const [distance, setDistance] = useState<number>(465);
  const [consommation, setConsommation] = useState<number>(7);
  const [carburant, setCarburant] = useState<TypeCarburant>("essence");
  const [prixUnitaire, setPrixUnitaire] = useState<number>(1.8);
  const [peages, setPeages] = useState<number>(38);

  // Auto-update prix moyen quand on change de carburant
  const handleCarburantChange = (newCarburant: TypeCarburant) => {
    setCarburant(newCarburant);
    const info = getCarburantInfo(newCarburant);
    setPrixUnitaire(info.prixMoyen);
    // Adapter conso : electrique moyen 17 kWh/100km, sinon laisser
    if (newCarburant === "electrique") {
      setConsommation(17);
    } else if (consommation === 17) {
      setConsommation(7);
    }
  };

  const resultat = useMemo(
    () => calculerCoutTrajet(distance, consommation, prixUnitaire, peages, carburant),
    [distance, consommation, prixUnitaire, peages, carburant],
  );

  const carburantInfo = getCarburantInfo(carburant);

  return (
    <div className="space-y-8">
      {/* Section entree */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-lg font-bold text-slate-800 mb-6">
          Parametres du trajet
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          {/* Distance */}
          <div>
            <label htmlFor="distance" className="block text-sm font-medium text-slate-700 mb-2">
              Distance (km)
            </label>
            <input
              id="distance"
              type="number"
              min="0"
              step="1"
              value={distance}
              onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-medium text-slate-800"
              placeholder="Ex: 465"
            />
            <p className="text-xs text-slate-500 mt-1">Distance aller simple</p>
          </div>

          {/* Type carburant */}
          <div>
            <label htmlFor="carburant" className="block text-sm font-medium text-slate-700 mb-2">
              Type de carburant
            </label>
            <select
              id="carburant"
              value={carburant}
              onChange={(e) => handleCarburantChange(e.target.value as TypeCarburant)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-medium text-slate-800 bg-white"
            >
              {CARBURANTS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nom}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-1">{carburantInfo.description}</p>
          </div>

          {/* Consommation */}
          <div>
            <label htmlFor="conso" className="block text-sm font-medium text-slate-700 mb-2">
              Consommation ({carburantInfo.unite}/100 km)
            </label>
            <input
              id="conso"
              type="number"
              min="0"
              step="0.1"
              value={consommation}
              onChange={(e) => setConsommation(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-medium text-slate-800"
              placeholder={carburant === "electrique" ? "Ex: 17" : "Ex: 7"}
            />
            <p className="text-xs text-slate-500 mt-1">
              {carburant === "electrique" ? "Moyenne electrique : 15-20 kWh/100km" : "Moyenne thermique : 5-9 L/100km"}
            </p>
          </div>

          {/* Prix unitaire */}
          <div>
            <label htmlFor="prix" className="block text-sm font-medium text-slate-700 mb-2">
              Prix (€/{carburantInfo.unite})
            </label>
            <input
              id="prix"
              type="number"
              min="0"
              step="0.01"
              value={prixUnitaire}
              onChange={(e) => setPrixUnitaire(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-medium text-slate-800"
              placeholder="Ex: 1.80"
            />
            <p className="text-xs text-slate-500 mt-1">
              Prix moyen 2026 : {carburantInfo.prixMoyen} €/{carburantInfo.unite}
            </p>
          </div>

          {/* Peages */}
          <div className="sm:col-span-2">
            <label htmlFor="peages" className="block text-sm font-medium text-slate-700 mb-2">
              Peages (€) - optionnel
            </label>
            <input
              id="peages"
              type="number"
              min="0"
              step="0.5"
              value={peages}
              onChange={(e) => setPeages(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-medium text-slate-800"
              placeholder="Ex: 38"
            />
            <p className="text-xs text-slate-500 mt-1">Montant total des peages pour ce trajet</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <span className="text-2xl">{carburantInfo.emoji}</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-900">{carburantInfo.nom}</p>
            <p className="text-xs text-blue-700 mt-1">
              Conso saisie : {consommation} {carburantInfo.unite}/100km • Prix : {prixUnitaire.toFixed(2)} €/{carburantInfo.unite}
            </p>
          </div>
        </div>
      </div>

      {/* Resultat principal */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg">
          <p className="text-sm font-medium opacity-90 mb-2">Cout total du trajet</p>
          <p className="text-5xl font-bold mb-1">{resultat.coutTotal.toFixed(2)} €</p>
          <p className="text-sm opacity-90 mb-6">aller simple</p>

          <div className="space-y-3 text-sm opacity-95 border-t border-white border-opacity-30 pt-4">
            <div className="flex justify-between">
              <span>Carburant ({resultat.carburantConsomme} {carburantInfo.unite})</span>
              <span className="font-semibold">{resultat.coutCarburant.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between">
              <span>Peages</span>
              <span className="font-semibold">{resultat.peages.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between border-t border-white border-opacity-30 pt-2">
              <span>Aller-retour estime</span>
              <span className="font-semibold">{resultat.coutAllerRetour.toFixed(2)} €</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8">
          <p className="text-sm font-medium text-slate-700 mb-2">Cout par kilometre</p>
          <p className="text-4xl font-bold text-slate-800 mb-1">
            {(resultat.coutParKm * 100).toFixed(1)}
          </p>
          <p className="text-sm text-slate-500 mb-6">centimes par km</p>

          <div className="bg-slate-50 rounded-lg p-3 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600">Cout / km exact</span>
              <span className="font-semibold text-slate-800">{resultat.coutParKm.toFixed(3)} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Cout 1000 km</span>
              <span className="font-semibold text-slate-800">{(resultat.coutParKm * 1000).toFixed(0)} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Cout 10 000 km / an</span>
              <span className="font-semibold text-slate-800">{(resultat.coutParKm * 10000).toFixed(0)} €</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparaisons */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          Comparaison avec autres modes
        </h3>

        <div className="space-y-3">
          {/* Voiture */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚗</span>
              <div>
                <p className="font-semibold text-blue-900 text-sm">Voiture (votre calcul)</p>
                <p className="text-xs text-blue-700">{carburantInfo.nom}</p>
              </div>
            </div>
            <p className="text-xl font-bold text-blue-900">{resultat.coutTotal.toFixed(2)} €</p>
          </div>

          {/* Train */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚆</span>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Train (estimation)</p>
                <p className="text-xs text-slate-600">Base 0.18 €/km (mix TER/TGV/Ouigo)</p>
              </div>
            </div>
            <p className="text-xl font-bold text-slate-800">{resultat.prixTrainEstime.toFixed(2)} €</p>
          </div>

          {/* Avion */}
          {resultat.prixAvionEstime > 0 && (
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✈️</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Avion (estimation low cost)</p>
                  <p className="text-xs text-slate-600">Base 0.12 €/km + 50 € frais fixes</p>
                </div>
              </div>
              <p className="text-xl font-bold text-slate-800">{resultat.prixAvionEstime.toFixed(2)} €</p>
            </div>
          )}
        </div>

        {/* Analyse */}
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900">
          {resultat.economieVsTrain > 0 ? (
            <p>
              <strong>Voiture moins chere que le train</strong> de {resultat.economieVsTrain.toFixed(2)} €
              {distance > 100 && " (mais train souvent plus rapide sur longue distance)"}.
            </p>
          ) : (
            <p>
              <strong>Train moins cher</strong> de {Math.abs(resultat.economieVsTrain).toFixed(2)} €
              + plus rapide et ecologique sur ce trajet.
            </p>
          )}
        </div>
      </div>

      {/* Empreinte carbone */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
        <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
          🌱 Empreinte carbone du trajet
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <p className="text-sm text-green-700 font-medium">Emissions CO2</p>
            <p className="text-3xl font-bold text-green-900 mt-1">{resultat.emissionsCO2.toFixed(1)} kg</p>
            <p className="text-xs text-green-600 mt-1">
              soit {(resultat.emissionsCO2 * 1000 / resultat.distance).toFixed(0)} g CO2/km
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-green-200">
            <p className="text-sm text-green-700 font-medium">Equivalent arbres / an</p>
            <p className="text-3xl font-bold text-green-900 mt-1">{resultat.arbresEquivalents.toFixed(2)}</p>
            <p className="text-xs text-green-600 mt-1">
              arbres pour absorber ces emissions
            </p>
          </div>
        </div>

        <p className="text-xs text-green-700 mt-4">
          Base : facteurs ADEME 2024 (essence 2.28, diesel 2.62, electrique 0.06 kg CO2/unite).
        </p>
      </div>

      {/* Tableau carburants */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Prix moyens carburants France 2026</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-3 font-semibold text-slate-700">Carburant</th>
                <th className="text-center py-3 px-3 font-semibold text-slate-700">Prix moyen</th>
                <th className="text-center py-3 px-3 font-semibold text-slate-700">Empreinte</th>
              </tr>
            </thead>
            <tbody>
              {CARBURANTS.map((c) => (
                <tr
                  key={c.id}
                  className={`border-b border-slate-100 ${
                    c.id === carburant ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="py-3 px-3 text-slate-800">
                    <span className="mr-2">{c.emoji}</span>
                    {c.nom}
                  </td>
                  <td className="py-3 px-3 text-center font-medium text-slate-800">
                    {c.prixMoyen.toFixed(2)} €/{c.unite}
                  </td>
                  <td className="py-3 px-3 text-center text-slate-600">
                    {c.empreinte} kg CO2/{c.unite}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Sources : Ministere de la Transition Ecologique, ADEME 2024-2026.
        </p>
      </div>
    </div>
  );
}
