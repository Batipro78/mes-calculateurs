"use client";

import { useState } from "react";
import { calculerCoteArgus, ETATS, CARBURANTS, type EtatVoiture, type Carburant } from "./coteArgusCalc";

export default function CalculCoteArgusVoiture() {
  const [prixNeuf, setPrixNeuf] = useState<number>(20000);
  const [anneeAchat, setAnneeAchat] = useState<number>(2020);
  const [kilometrage, setKilometrage] = useState<number>(80000);
  const [etat, setEtat] = useState<EtatVoiture>("bon");
  const [carburant, setCarburant] = useState<Carburant>("essence");

  const resultat = calculerCoteArgus(prixNeuf, anneeAchat, kilometrage, etat, carburant);
  const etatInfo = ETATS.find((e) => e.id === etat)!;
  const carburantInfo = CARBURANTS.find((c) => c.id === carburant)!;

  return (
    <div className="space-y-8">
      {/* Disclaimer ÉNORME */}
      <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <span className="text-3xl">⚠️</span>
          <div>
            <h2 className="text-lg font-bold text-red-900 mb-2">
              CECI N&apos;EST PAS LA COTE OFFICIELLE ARGUS
            </h2>
            <p className="text-sm text-red-800 mb-2">
              Ce calculateur fournit une <strong>estimation indicative à but uniquement informatif</strong>,
              basée sur des règles de décote moyennes du marché. Il ne s&apos;agit en aucun cas de la
              cote officielle publiée par L&apos;argus (marque déposée).
            </p>
            <p className="text-sm text-red-800">
              Pour obtenir la <strong>cote Argus officielle</strong> de votre véhicule, consultez le
              site officiel <a href="https://www.largus.fr" target="_blank" rel="noopener noreferrer" className="underline font-semibold">largus.fr</a>{" "}
              (service payant). Pour une estimation gratuite alternative, voir aussi La Centrale,
              AutoScout24, ou un professionnel.
            </p>
          </div>
        </div>
      </div>

      {/* Saisie */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-lg font-bold text-slate-800 mb-6">
          Informations sur votre véhicule
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="prix-neuf" className="block text-sm font-medium text-slate-700 mb-2">
              Prix d&apos;achat neuf (€)
            </label>
            <input
              id="prix-neuf"
              type="number"
              min="0"
              max="500000"
              step="100"
              value={prixNeuf}
              onChange={(e) => setPrixNeuf(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-medium text-slate-800"
              placeholder="Ex: 20000"
            />
            <p className="text-xs text-slate-500 mt-1">Prix catalogue à neuf</p>
          </div>

          <div>
            <label htmlFor="annee-achat" className="block text-sm font-medium text-slate-700 mb-2">
              Année de mise en circulation
            </label>
            <input
              id="annee-achat"
              type="number"
              min="1990"
              max="2026"
              step="1"
              value={anneeAchat}
              onChange={(e) => setAnneeAchat(parseInt(e.target.value) || 2020)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-medium text-slate-800"
              placeholder="Ex: 2020"
            />
            <p className="text-xs text-slate-500 mt-1">Année 1ère immatriculation</p>
          </div>

          <div>
            <label htmlFor="kilometrage" className="block text-sm font-medium text-slate-700 mb-2">
              Kilométrage actuel (km)
            </label>
            <input
              id="kilometrage"
              type="number"
              min="0"
              max="500000"
              step="1000"
              value={kilometrage}
              onChange={(e) => setKilometrage(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-medium text-slate-800"
              placeholder="Ex: 80000"
            />
            <p className="text-xs text-slate-500 mt-1">Moyenne FR : 15 000 km/an</p>
          </div>

          <div>
            <label htmlFor="etat" className="block text-sm font-medium text-slate-700 mb-2">
              État général du véhicule
            </label>
            <select
              id="etat"
              value={etat}
              onChange={(e) => setEtat(e.target.value as EtatVoiture)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-medium text-slate-800 bg-white"
            >
              {ETATS.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.emoji} {e.nom}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-1">{etatInfo.description}</p>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="carburant" className="block text-sm font-medium text-slate-700 mb-2">
              Type de carburant
            </label>
            <select
              id="carburant"
              value={carburant}
              onChange={(e) => setCarburant(e.target.value as Carburant)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-medium text-slate-800 bg-white"
            >
              {CARBURANTS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.emoji} {c.nom}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-1">{carburantInfo.description}</p>
          </div>
        </div>
      </div>

      {/* Résultat principal */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
          <p className="text-sm font-medium opacity-90 mb-2">Estimation indicative</p>
          <p className="text-5xl font-bold mb-1">{resultat.estimationFinale.toLocaleString("fr-FR")} €</p>
          <p className="text-sm opacity-90 mb-6">valeur estimée actuelle</p>

          <div className="space-y-3 text-sm opacity-95 border-t border-white border-opacity-30 pt-4">
            <div className="flex justify-between">
              <span>Prix neuf :</span>
              <span className="font-semibold">{resultat.prixNeuf.toLocaleString("fr-FR")} €</span>
            </div>
            <div className="flex justify-between">
              <span>Âge du véhicule :</span>
              <span className="font-semibold">{resultat.ageVoiture} an{resultat.ageVoiture > 1 ? "s" : ""}</span>
            </div>
            <div className="flex justify-between">
              <span>Décote totale :</span>
              <span className="font-semibold">-{resultat.decotePourcent}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8">
          <p className="text-sm font-medium text-slate-700 mb-4">Comparaison kilométrage</p>

          <div className="mb-4">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-3xl font-bold text-slate-800">{resultat.kilometrage.toLocaleString("fr-FR")} km</span>
              <span className="text-xs text-slate-500">votre véhicule</span>
            </div>
            <div className="text-sm text-slate-600 mb-3">
              Moyenne attendue : <strong>{resultat.kilometrageMoyen.toLocaleString("fr-FR")} km</strong> (15 000 km/an × {resultat.ageVoiture} ans)
            </div>

            <div className={`rounded-lg p-3 text-sm ${
              resultat.kilometrageNormal
                ? "bg-green-50 border border-green-200 text-green-800"
                : resultat.kilometrage > resultat.kilometrageMoyen
                ? "bg-orange-50 border border-orange-200 text-orange-800"
                : "bg-blue-50 border border-blue-200 text-blue-800"
            }`}>
              {resultat.kilometrageNormal && "✅ Kilométrage dans la norme du marché français."}
              {!resultat.kilometrageNormal && resultat.kilometrage > resultat.kilometrageMoyen &&
                `⚠️ Kilométrage élevé : ${(resultat.kilometrage - resultat.kilometrageMoyen).toLocaleString("fr-FR")} km de plus que la moyenne. Décote accentuée.`}
              {!resultat.kilometrageNormal && resultat.kilometrage < resultat.kilometrageMoyen &&
                `✨ Faible kilométrage : ${(resultat.kilometrageMoyen - resultat.kilometrage).toLocaleString("fr-FR")} km de moins que la moyenne. Valorisation à la revente.`}
            </div>
          </div>
        </div>
      </div>

      {/* Détail des facteurs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          Détail du calcul
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-slate-100 py-2">
            <span className="text-slate-700">Prix d&apos;achat neuf</span>
            <span className="font-semibold text-slate-800">{resultat.prixNeuf.toLocaleString("fr-FR")} €</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 py-2">
            <span className="text-slate-700">Valeur après décote liée à l&apos;âge ({resultat.ageVoiture} ans)</span>
            <span className="font-semibold text-slate-800">{resultat.valeurApresDecoteAge.toLocaleString("fr-FR")} €</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 py-2">
            <span className="text-slate-700">× Multiplicateur état ({etatInfo.nom})</span>
            <span className="font-semibold text-slate-800">×{resultat.multEtat.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 py-2">
            <span className="text-slate-700">× Multiplicateur carburant ({carburantInfo.nom})</span>
            <span className="font-semibold text-slate-800">×{resultat.multCarburant.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 py-2">
            <span className="text-slate-700">× Ajustement kilométrage</span>
            <span className="font-semibold text-slate-800">×{resultat.multKm.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 bg-blue-50 -mx-2 px-2 rounded">
            <span className="font-semibold text-blue-900">= Estimation finale</span>
            <span className="font-bold text-blue-900">{resultat.estimationFinale.toLocaleString("fr-FR")} €</span>
          </div>
        </div>
      </div>

      {/* Détail décote année par année */}
      {resultat.detailDecote.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Décote année par année
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-3 font-semibold text-slate-700">Année</th>
                  <th className="text-center py-3 px-3 font-semibold text-slate-700">Taux décote</th>
                  <th className="text-right py-3 px-3 font-semibold text-slate-700">Valeur fin d&apos;année</th>
                </tr>
              </thead>
              <tbody>
                {resultat.detailDecote.map((d) => (
                  <tr key={d.annee} className="border-b border-slate-100">
                    <td className="py-3 px-3 text-slate-800">Année {d.annee}</td>
                    <td className="py-3 px-3 text-center text-red-700 font-medium">-{d.decoteAn}%</td>
                    <td className="py-3 px-3 text-right font-semibold text-slate-800">
                      {d.valeurFinAnnee.toLocaleString("fr-FR")} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Règle : 1ère année -25%, années 2 à 5 -15%/an, à partir de la 6ème année -10%/an
            (plafonné à 10% du prix neuf minimum).
          </p>
        </div>
      )}

      {/* Tableau états */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Coefficients état du véhicule</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {ETATS.map((e) => (
            <div
              key={e.id}
              className={`rounded-lg border p-3 ${e.id === etat ? "border-blue-400 bg-blue-50" : "border-slate-200 bg-slate-50"}`}
            >
              <p className="font-semibold text-slate-800">{e.emoji} {e.nom} (×{e.multiplicateur.toFixed(2)})</p>
              <p className="text-xs text-slate-600 mt-1">{e.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer rappel */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
        <p className="text-sm text-yellow-900">
          <strong>📌 Rappel :</strong> Cette estimation est indicative et basée sur des règles de
          décote moyennes. La cote officielle du marché peut varier significativement selon le
          modèle, la motorisation, les options, l&apos;historique d&apos;entretien et la demande
          locale. Pour la cote Argus officielle, consultez <a href="https://www.largus.fr" target="_blank" rel="noopener noreferrer" className="underline">largus.fr</a>.
        </p>
      </div>
    </div>
  );
}
