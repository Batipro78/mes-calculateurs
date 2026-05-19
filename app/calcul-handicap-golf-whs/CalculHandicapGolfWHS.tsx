"use client";

import { useState } from "react";
import {
  calculerDifferentiel,
  calculerIndexWHS,
  calculerHandicapJeu,
  GOLFS_POPULAIRES,
  type CarteScore,
} from "./golfHandicapCalc";

function fmt(n: number, digits = 1): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function CalculHandicapGolfWHS() {
  const [cartes, setCartes] = useState<CarteScore[]>([
    { scoreBrut: 82, sss: 72, slope: 130 },
    { scoreBrut: 80, sss: 72, slope: 130 },
    { scoreBrut: 85, sss: 72, slope: 130 },
  ]);

  const [showHandicapJeu, setShowHandicapJeu] = useState(false);
  const [handicapJeuSlope, setHandicapJeuSlope] = useState("130");
  const [handicapJeuSss, setHandicapJeuSss] = useState("72");
  const [handicapJeuPar, setHandicapJeuPar] = useState("72");

  // Ajouter une carte
  const ajouterCarte = () => {
    setCartes([...cartes, { scoreBrut: 80, sss: 72, slope: 130 }]);
  };

  // Supprimer une carte
  const supprimerCarte = (index: number) => {
    setCartes(cartes.filter((_, i) => i !== index));
  };

  // Mettre à jour une carte
  const mettreAJourCarte = (
    index: number,
    field: keyof CarteScore,
    value: number
  ) => {
    const newCartes = [...cartes];
    newCartes[index] = { ...newCartes[index], [field]: value };
    setCartes(newCartes);
  };

  // Calcul Index WHS
  const resultatIndex = calculerIndexWHS(cartes);

  // Calcul Handicap de jeu
  let handicapJeu = 0;
  if (resultatIndex.index > 0 && showHandicapJeu) {
    handicapJeu = calculerHandicapJeu(
      resultatIndex.index,
      parseFloat(handicapJeuSlope) || 130,
      parseFloat(handicapJeuSss) || 72,
      parseFloat(handicapJeuPar) || 72
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800">Mes cartes</h2>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold">
              {cartes.length} cartes
            </span>
          </div>

          <div className="space-y-4 mb-6">
            {cartes.map((carte, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200"
              >
                <div className="grid gap-3 md:grid-cols-4 mb-4">
                  {/* Score Brut */}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Score brut
                    </label>
                    <input
                      type="number"
                      value={carte.scoreBrut}
                      onChange={(e) =>
                        mettreAJourCarte(
                          idx,
                          "scoreBrut",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      min="40"
                      max="150"
                      step="1"
                    />
                  </div>

                  {/* SSS */}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      SSS (Course Rating)
                    </label>
                    <input
                      type="number"
                      value={carte.sss}
                      onChange={(e) =>
                        mettreAJourCarte(
                          idx,
                          "sss",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      step="0.1"
                    />
                  </div>

                  {/* Slope */}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Slope Rating
                    </label>
                    <input
                      type="number"
                      value={carte.slope}
                      onChange={(e) =>
                        mettreAJourCarte(
                          idx,
                          "slope",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      min="55"
                      max="155"
                      step="1"
                    />
                  </div>

                  {/* Différentiel */}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Différentiel
                    </label>
                    <div className="bg-white rounded-lg px-3 py-2 text-sm font-bold text-green-700">
                      {fmt(calculerDifferentiel(carte), 1)}
                    </div>
                  </div>
                </div>

                {/* Bouton supprimer */}
                {cartes.length > 3 && (
                  <button
                    onClick={() => supprimerCarte(idx)}
                    className="text-xs text-red-600 hover:text-red-700 font-medium"
                  >
                    Supprimer cette carte
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={ajouterCarte}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
          >
            + Ajouter une carte
          </button>
        </div>

        {/* Info minimum cartes */}
        {cartes.length < 3 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-700">
            Minimum 3 cartes requises pour calculer l&apos;Index WHS.
          </div>
        )}
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {resultatIndex.index > 0 ? (
          <>
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-2xl p-6 shadow-lg shadow-green-200/50">
              <p className="text-sm text-green-100 mb-1">Index WHS</p>
              <p className="text-4xl font-extrabold tracking-tight">
                {fmt(resultatIndex.index, 1)}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Cartes utilisées</p>
                  <p className="text-xl font-bold text-slate-800">
                    {resultatIndex.nbCartesUtilisees}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">
                    Meilleurs différentiels
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    {resultatIndex.nbMeilleursUtilises} cartes utilisées
                  </p>
                </div>
                {resultatIndex.ajustement !== undefined && (
                  <div className="pt-2 border-t border-slate-200">
                    <p className="text-xs text-slate-400 mb-1">Ajustement</p>
                    <p className="text-lg font-bold text-amber-600">
                      {resultatIndex.ajustement > 0
                        ? "+"
                        : ""}
                      {fmt(resultatIndex.ajustement, 1)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tableau différentiels */}
            {resultatIndex.differentiels.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-3 text-sm">
                  Différentiels détaillés
                </h3>
                <div className="space-y-2 text-sm max-h-48 overflow-y-auto">
                  {resultatIndex.differentiels.map((diff, i) => {
                    const isMeilleur =
                      resultatIndex.differentielsMeilleurs.includes(diff);
                    return (
                      <div
                        key={i}
                        className={`flex justify-between items-center px-3 py-2 rounded ${
                          isMeilleur
                            ? "bg-green-50 border border-green-200"
                            : "bg-slate-50"
                        }`}
                      >
                        <span className="text-slate-600">
                          Carte {i + 1}
                        </span>
                        <span
                          className={`font-bold ${
                            isMeilleur ? "text-green-700" : "text-slate-700"
                          }`}
                        >
                          {fmt(diff, 1)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center">
            <p className="text-sm text-slate-400">
              Ajoutez au moins 3 cartes pour calculer
            </p>
          </div>
        )}

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Index WHS = moyenne des N meilleurs différentiels selon WHS.
        </div>
      </div>

      {/* Handicap de jeu */}
      {resultatIndex.index > 0 && (
        <div className="lg:col-span-5 mt-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <button
            onClick={() => setShowHandicapJeu(!showHandicapJeu)}
            className="w-full text-left font-bold text-slate-800 hover:text-emerald-700 transition-colors py-2"
          >
            {showHandicapJeu ? "▼" : "▶"} Calculer le Handicap de jeu
          </button>

          {showHandicapJeu && (
            <div className="mt-4 space-y-4">
              <p className="text-sm text-slate-600">
                Indiquez les paramètres du parcours où vous allez jouer.
              </p>
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-2">
                    SSS du parcours
                  </label>
                  <input
                    type="number"
                    value={handicapJeuSss}
                    onChange={(e) => setHandicapJeuSss(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-2">
                    Slope du parcours
                  </label>
                  <input
                    type="number"
                    value={handicapJeuSlope}
                    onChange={(e) => setHandicapJeuSlope(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="55"
                    max="155"
                    step="1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-2">
                    Par du parcours
                  </label>
                  <input
                    type="number"
                    value={handicapJeuPar}
                    onChange={(e) => setHandicapJeuPar(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="60"
                    max="75"
                    step="1"
                  />
                </div>
                <div className="flex items-end">
                  <div className="w-full">
                    <p className="text-xs text-slate-500 mb-2">Handicap de jeu</p>
                    <div className="bg-green-50 rounded-lg px-3 py-2.5 text-lg font-bold text-green-700">
                      {handicapJeu}
                    </div>
                  </div>
                </div>
              </div>

              {/* Golfes populaires */}
              <div className="mt-4">
                <p className="text-xs font-medium text-slate-600 mb-2">
                  Golfs populaires
                </p>
                <div className="grid gap-2 md:grid-cols-2">
                  {GOLFS_POPULAIRES.map((golf) => (
                    <button
                      key={golf.nom}
                      onClick={() => {
                        setHandicapJeuSss(golf.sss.toString());
                        setHandicapJeuSlope(golf.slope.toString());
                        setHandicapJeuPar(golf.par.toString());
                      }}
                      className="text-left text-xs bg-slate-50 hover:bg-green-50 border border-slate-200 hover:border-green-300 rounded-lg p-2 transition-colors"
                    >
                      <p className="font-semibold text-slate-800">
                        {golf.nom}
                      </p>
                      <p className="text-slate-500">
                        SSS {golf.sss} | Slope {golf.slope}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
