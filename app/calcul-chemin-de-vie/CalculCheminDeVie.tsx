"use client";
import { useState, useMemo } from "react";
import { calculerCheminDeVie } from "./cheminDeVieCalc";

export default function CalculCheminDeVie() {
  const [dateNaissance, setDateNaissance] = useState<string>("");
  const [error, setError] = useState<string>("");

  const resultat = useMemo(() => {
    if (!dateNaissance) {
      setError("");
      return null;
    }
    try {
      const date = new Date(dateNaissance + "T00:00:00Z");
      if (isNaN(date.getTime())) {
        setError("Date invalide. Veuillez entrer une date valide.");
        return null;
      }
      setError("");
      return calculerCheminDeVie(date);
    } catch (e) {
      setError("Erreur lors du calcul. Veuillez verifier la date.");
      return null;
    }
  }, [dateNaissance]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateNaissance(e.target.value);
  };

  return (
    <div className="w-full space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <label className="block mb-4">
          <span className="text-slate-700 font-semibold mb-2 block">
            Date de naissance
          </span>
          <input
            type="date"
            value={dateNaissance}
            onChange={handleDateChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </label>
        {error && (
          <div className="text-red-600 text-sm mt-2 bg-red-50 p-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}
      </div>

      {resultat && (
        <div className="space-y-6">
          {/* Grosse carte résultat */}
          <div className={`rounded-2xl border-2 p-8 text-white shadow-lg bg-gradient-to-br ${
            resultat.nombre === 1 ? "from-red-600 to-orange-600 border-red-400" :
            resultat.nombre === 2 ? "from-blue-400 to-cyan-500 border-blue-300" :
            resultat.nombre === 3 ? "from-yellow-500 to-orange-500 border-yellow-400" :
            resultat.nombre === 4 ? "from-green-700 to-emerald-700 border-green-600" :
            resultat.nombre === 5 ? "from-sky-500 to-blue-600 border-sky-400" :
            resultat.nombre === 6 ? "from-pink-500 to-rose-500 border-pink-400" :
            resultat.nombre === 7 ? "from-purple-700 to-indigo-800 border-purple-600" :
            resultat.nombre === 8 ? "from-gray-900 to-gray-700 border-gray-800" :
            resultat.nombre === 9 ? "from-white to-gray-100 text-slate-800 border-white" :
            resultat.nombre === 11 ? "from-purple-600 to-indigo-700 border-purple-500" :
            resultat.nombre === 22 ? "from-gray-900 via-yellow-700 to-yellow-600 border-gray-800" :
            "from-yellow-300 to-white text-slate-800 border-yellow-200"
          }`}>
            <div className="text-center">
              <div className="text-6xl font-black mb-3">{resultat.nombre}</div>
              <div className="text-2xl font-bold mb-1">{resultat.nom}</div>
              {resultat.estMaitre && (
                <div className="inline-block bg-white bg-opacity-25 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  ✨ Nombre Maître
                </div>
              )}
              <p className="text-base opacity-95 max-w-md mx-auto leading-relaxed">
                {resultat.description}
              </p>
            </div>
          </div>

          {/* Grille forces/faiblesses/metiers */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-green-50 rounded-xl border border-green-200 p-6">
              <h3 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                <span className="text-xl">💪</span> Force
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {resultat.force}
              </p>
            </div>

            <div className="bg-red-50 rounded-xl border border-red-200 p-6">
              <h3 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                <span className="text-xl">⚠️</span> Faiblesse
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {resultat.faiblesse}
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
                <span className="text-xl">💼</span> Métiers
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {resultat.metiers}
              </p>
            </div>
          </div>

          {/* Couleur et pierre */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-2">🎨 Couleur</h3>
              <p className="text-sm text-slate-600">{resultat.couleur}</p>
            </div>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-2">💎 Pierre</h3>
              <p className="text-sm text-slate-600">{resultat.pierre}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
