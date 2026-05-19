"use client";

import { useState } from "react";
import {
  calculerBarMitzvah,
  formatDateFR,
  type Sexe,
} from "./barMitzvahCalc";

export default function CalculDateBarMitzvah() {
  const today = new Date();
  const defaultDate = new Date(
    today.getFullYear() - 13,
    today.getMonth(),
    today.getDate()
  );
  const defaultDateStr = defaultDate.toISOString().split("T")[0];

  const [dateNaissance, setDateNaissance] = useState<string>(defaultDateStr);
  const [sexe, setSexe] = useState<Sexe>("garcon");

  // Valider et calculer
  let resultat = null;
  let erreur = "";

  if (dateNaissance) {
    try {
      const parts = dateNaissance.split("-");
      if (parts.length === 3) {
        const dateObj = new Date(
          parseInt(parts[0]),
          parseInt(parts[1]) - 1,
          parseInt(parts[2])
        );
        if (!isNaN(dateObj.getTime())) {
          resultat = calculerBarMitzvah(dateObj, sexe);
        } else {
          erreur = "Date invalide";
        }
      }
    } catch {
      erreur = "Erreur dans le calcul";
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Formulaire - 1 col */}
      <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-fit">
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Genre
          </label>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setSexe("garcon")}
              className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                sexe === "garcon"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-150"
              }`}
            >
              Garçon (13 ans)
            </button>
            <button
              onClick={() => setSexe("fille")}
              className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                sexe === "fille"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-150"
              }`}
            >
              Fille (12 ans)
            </button>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Date de naissance
          </label>
          <input
            type="date"
            value={dateNaissance}
            onChange={(e) => setDateNaissance(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-slate-500 mt-1">Au format AAAA-MM-JJ</p>
        </div>

        {/* Compte à rebours */}
        {resultat && (
          <div
            className={`rounded-xl p-4 border ${
              resultat.joursAvant > 0
                ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"
                : "bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-wide mb-2 text-slate-600">
              Compte à rebours
            </p>
            <p className="text-2xl font-bold text-blue-900">
              {resultat.joursAvant > 0 ? resultat.joursAvant : 0}
              <span className="text-sm ml-1 font-medium">jours</span>
            </p>
            <p className="text-xs text-slate-600 mt-2">
              {resultat.joursAvant > 0
                ? `avant le ${sexe === "garcon" ? "Bar" : "Bat"} Mitzvah`
                : `${sexe === "garcon" ? "Bar" : "Bat"} Mitzvah passée`}
            </p>
          </div>
        )}
      </div>

      {/* Résultats - 2 cols */}
      <div className="lg:col-span-2">
        {erreur && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 text-red-700">
            <p className="font-semibold">Erreur</p>
            <p className="text-sm mt-1">{erreur}</p>
          </div>
        )}

        {resultat && (
          <>
            {/* Grosse date Bar/Bat Mitzvah */}
            <div
              className={`rounded-2xl p-8 text-white mb-8 shadow-lg bg-gradient-to-br ${
                sexe === "garcon"
                  ? "from-blue-600 to-indigo-700"
                  : "from-indigo-600 to-purple-700"
              }`}
            >
              <p className="text-sm uppercase tracking-wider font-semibold opacity-90">
                {sexe === "garcon" ? "Bar" : "Bat"} Mitzvah
              </p>
              <h2 className="text-4xl font-bold mt-2">
                {formatDateFR(resultat.dateBarMitzvahGregorien)}
              </h2>
              <p className="mt-2 text-sm opacity-95">
                À {resultat.ageRequis} ans hébraïques
              </p>
            </div>

            {/* Détails */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Naissance */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h3 className="font-bold text-slate-700 mb-3">
                    Date de naissance
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-500">Calendrier grégorien</span>
                      <p className="font-mono text-slate-700">
                        {resultat.dateNaissanceGregorien.toLocaleDateString(
                          "fr-FR"
                        )}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">Calendrier hébraïque</span>
                      <p className="font-mono text-slate-700">
                        {resultat.dateNaissanceHebraique.jour}{" "}
                        {resultat.dateNaissanceHebraique.mois}{" "}
                        {resultat.dateNaissanceHebraique.annee}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bar/Bat Mitzvah */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h3 className="font-bold text-slate-700 mb-3">
                    {sexe === "garcon" ? "Bar" : "Bat"} Mitzvah
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-500">Calendrier grégorien</span>
                      <p className="font-mono text-slate-700">
                        {resultat.dateBarMitzvahGregorien.toLocaleDateString(
                          "fr-FR"
                        )}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">Calendrier hébraïque</span>
                      <p className="font-mono text-slate-700">
                        {resultat.dateBarMitzvahHebraique.jour}{" "}
                        {resultat.dateBarMitzvahHebraique.mois}{" "}
                        {resultat.dateBarMitzvahHebraique.annee}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Explication */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-900">
                  <strong>Comment ça marche ?</strong> La majorité religieuse
                  juive est fixée à <strong>13 ans révolus</strong> (garçon) ou{" "}
                  <strong>12 ans révolus</strong> (fille) en{" "}
                  <strong>années hébraïques</strong>. On ajoute donc {resultat.ageRequis} ans
                  à l&apos;année de naissance hébraïque (même jour/mois hébreu),
                  puis on convertit cette date en calendrier grégorien. Le résultat
                  est généralement décalé de 1-2 mois par rapport à
                  l&apos;anniversaire grégorien.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
