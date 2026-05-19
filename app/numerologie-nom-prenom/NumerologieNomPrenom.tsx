"use client";

import { useState } from "react";
import { calculerNumerologieNom, type ResultatNumerologie } from "./numerologieNomCalc";

export default function NumerologieNomPrenom() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [resultat, setResultat] = useState<ResultatNumerologie | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleCalculer = () => {
    if (prenom.trim() && nom.trim()) {
      const res = calculerNumerologieNom(prenom, nom);
      setResultat(res);
      setShowDetails(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCalculer();
    }
  };

  return (
    <div className="space-y-8">
      {/* Formulaire */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Entrez votre nom et prenom
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Prenom
            </label>
            <input
              type="text"
              placeholder="Ex. Jean"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Nom de famille
            </label>
            <input
              type="text"
              placeholder="Ex. Dupont"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <button
          onClick={handleCalculer}
          disabled={!prenom.trim() || !nom.trim()}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-700 text-white font-bold rounded-lg hover:from-purple-700 hover:to-fuchsia-800 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
        >
          Calculer ma numerologie
        </button>
      </div>

      {/* Resultats */}
      {resultat && (
        <div className="space-y-6">
          {/* Titre resultats */}
          <div className="text-center">
            <p className="text-slate-500 mb-2">Numerologie numerologie pythagoricienne</p>
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-fuchsia-700 bg-clip-text text-transparent">
              {resultat.nomComplet}
            </h2>
          </div>

          {/* 3 cartes resultats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Expression */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 p-6 shadow-lg">
              <p className="text-sm font-medium text-purple-600 uppercase tracking-wider mb-2">
                Nombre d&apos;Expression
              </p>
              <div className="flex items-end gap-3 mb-4">
                <div className="text-5xl font-black text-purple-700">
                  {resultat.expression.nombre}
                </div>
                {resultat.expression.estMaitre && (
                  <span className="text-sm font-bold text-purple-600 bg-white px-2.5 py-1 rounded-full mb-2">
                    Maitre
                  </span>
                )}
              </div>
              <div className="border-t border-purple-200 pt-4">
                <p className="font-bold text-purple-900 mb-2">
                  {resultat.expression.nom}
                </p>
                <p className="text-sm text-purple-700 leading-relaxed">
                  {resultat.expression.description}
                </p>
              </div>
              <p className="text-xs text-purple-500 mt-4 pt-4 border-t border-purple-200">
                Votre potentiel global &amp; destinee
              </p>
            </div>

            {/* Cœur */}
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl border border-rose-200 p-6 shadow-lg">
              <p className="text-sm font-medium text-rose-600 uppercase tracking-wider mb-2">
                Nombre du Cœur
              </p>
              <div className="flex items-end gap-3 mb-4">
                <div className="text-5xl font-black text-rose-700">
                  {resultat.coeur.nombre}
                </div>
                {resultat.coeur.estMaitre && (
                  <span className="text-sm font-bold text-rose-600 bg-white px-2.5 py-1 rounded-full mb-2">
                    Maitre
                  </span>
                )}
              </div>
              <div className="border-t border-rose-200 pt-4">
                <p className="font-bold text-rose-900 mb-2">
                  {resultat.coeur.nom}
                </p>
                <p className="text-sm text-rose-700 leading-relaxed">
                  {resultat.coeur.description}
                </p>
              </div>
              <p className="text-xs text-rose-500 mt-4 pt-4 border-t border-rose-200">
                Vos desirs &amp; passions intimes
              </p>
            </div>

            {/* Personnalité */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl border border-amber-200 p-6 shadow-lg">
              <p className="text-sm font-medium text-amber-600 uppercase tracking-wider mb-2">
                Nombre de Personnalite
              </p>
              <div className="flex items-end gap-3 mb-4">
                <div className="text-5xl font-black text-amber-700">
                  {resultat.personnalite.nombre}
                </div>
                {resultat.personnalite.estMaitre && (
                  <span className="text-sm font-bold text-amber-600 bg-white px-2.5 py-1 rounded-full mb-2">
                    Maitre
                  </span>
                )}
              </div>
              <div className="border-t border-amber-200 pt-4">
                <p className="font-bold text-amber-900 mb-2">
                  {resultat.personnalite.nom}
                </p>
                <p className="text-sm text-amber-700 leading-relaxed">
                  {resultat.personnalite.description}
                </p>
              </div>
              <p className="text-xs text-amber-500 mt-4 pt-4 border-t border-amber-200">
                Votre image exterieure &amp; personnage public
              </p>
            </div>
          </div>

          {/* Détail calcul (collapsible) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between font-bold text-slate-800 hover:text-purple-600 transition-colors"
            >
              <span>Voir le detail du calcul</span>
              <span
                className={`text-xl transition-transform ${
                  showDetails ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {showDetails && (
              <div className="mt-6 space-y-6 pt-6 border-t border-slate-200">
                {/* Toutes lettres */}
                <div>
                  <p className="font-bold text-slate-800 mb-3">
                    Nombre d&apos;Expression (Toutes les lettres)
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {resultat.detailCalcul.toutes.map((item, i) => (
                      <div
                        key={i}
                        className="px-3 py-1.5 bg-slate-100 rounded-lg text-sm font-medium text-slate-800"
                      >
                        <span className="font-bold text-purple-600">
                          {item.lettre}
                        </span>
                        ={item.valeur}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600">
                    Somme :{" "}
                    <span className="font-bold">
                      {resultat.detailCalcul.toutes.reduce(
                        (s, x) => s + x.valeur,
                        0
                      )}
                    </span>{" "}
                    {"→"} {resultat.expression.nombre}
                  </p>
                </div>

                {/* Voyelles */}
                <div>
                  <p className="font-bold text-slate-800 mb-3">
                    Nombre du Cœur (Voyelles : A, E, I, O, U, Y)
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {resultat.detailCalcul.voyelles.map((item, i) => (
                      <div
                        key={i}
                        className="px-3 py-1.5 bg-rose-100 rounded-lg text-sm font-medium text-rose-800"
                      >
                        <span className="font-bold text-rose-600">
                          {item.lettre}
                        </span>
                        ={item.valeur}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600">
                    Somme :{" "}
                    <span className="font-bold">
                      {resultat.detailCalcul.voyelles.reduce(
                        (s, x) => s + x.valeur,
                        0
                      )}
                    </span>{" "}
                    {"→"} {resultat.coeur.nombre}
                  </p>
                </div>

                {/* Consonnes */}
                <div>
                  <p className="font-bold text-slate-800 mb-3">
                    Nombre de Personnalite (Consonnes)
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {resultat.detailCalcul.consonnes.map((item, i) => (
                      <div
                        key={i}
                        className="px-3 py-1.5 bg-amber-100 rounded-lg text-sm font-medium text-amber-800"
                      >
                        <span className="font-bold text-amber-600">
                          {item.lettre}
                        </span>
                        ={item.valeur}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600">
                    Somme :{" "}
                    <span className="font-bold">
                      {resultat.detailCalcul.consonnes.reduce(
                        (s, x) => s + x.valeur,
                        0
                      )}
                    </span>{" "}
                    {"→"} {resultat.personnalite.nombre}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
