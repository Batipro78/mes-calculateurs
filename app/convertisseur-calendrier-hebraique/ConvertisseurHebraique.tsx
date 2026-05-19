"use client";

import { useState } from "react";
import {
  gregorienVersHebraique,
  hebraiqueVersGregorien,
  calculerAgeHebraique,
  MOIS_HEBRAIQUES,
  DateHebraique,
  estAnneeEmbolismique,
  getMoisPourAnnee,
} from "./hebraiqueCalc";

type Sens = "greg-heb" | "heb-greg" | "age-heb";

export default function ConvertisseurHebraique() {
  const [sens, setSens] = useState<Sens>("greg-heb");

  // Mode Grégorien → Hébraïque
  const [dateGreg, setDateGreg] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  // Mode Hébraïque → Grégorien
  const [hebJour, setHebJour] = useState<string>("1");
  const [hebMois, setHebMois] = useState<string>("1");
  const [hebAnnee, setHebAnnee] = useState<string>("5786");

  // Mode Âge Hébraïque
  const [dateNaissance, setDateNaissance] = useState<string>(
    new Date(2000, 0, 1).toISOString().split("T")[0]
  );

  // Aujourd'hui en hébraïque
  const hebAujourd = gregorienVersHebraique(new Date());

  // Calculs
  let resultatHeb: DateHebraique | null = null;
  let resultatGreg: Date | null = null;
  let ageData: ReturnType<typeof calculerAgeHebraique> | null = null;
  let erreur: string = "";

  if (sens === "greg-heb" && dateGreg) {
    try {
      resultatHeb = gregorienVersHebraique(new Date(dateGreg));
    } catch (e) {
      erreur = "Date invalide";
    }
  } else if (sens === "heb-greg") {
    try {
      const j = parseInt(hebJour, 10);
      const m = parseInt(hebMois, 10);
      const a = parseInt(hebAnnee, 10);
      if (j > 0 && j <= 30 && m > 0 && m <= 13 && a > 0) {
        resultatGreg = hebraiqueVersGregorien(a, m, j);
      } else {
        erreur = "Jour (1-30), Mois (1-13), Année (>0) invalides";
      }
    } catch (e) {
      erreur = "Erreur de conversion";
    }
  } else if (sens === "age-heb" && dateNaissance) {
    try {
      ageData = calculerAgeHebraique(new Date(dateNaissance));
    } catch (e) {
      erreur = "Date invalide";
    }
  }

  const hebAnneeCourante = parseInt(hebAnnee, 10);
  const moisDispo = getMoisPourAnnee(hebAnneeCourante);
  const estEmbol = estAnneeEmbolismique(hebAnneeCourante);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Sens toggle */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Conversion :
          </label>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setSens("greg-heb")}
              className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all text-left ${
                sens === "greg-heb"
                  ? "bg-blue-100 text-blue-800 border border-blue-300"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              Grégorien → Hébraïque
            </button>
            <button
              onClick={() => setSens("heb-greg")}
              className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all text-left ${
                sens === "heb-greg"
                  ? "bg-blue-100 text-blue-800 border border-blue-300"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              Hébraïque → Grégorien
            </button>
            <button
              onClick={() => setSens("age-heb")}
              className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all text-left ${
                sens === "age-heb"
                  ? "bg-blue-100 text-blue-800 border border-blue-300"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              Calculer mon âge hébraïque
            </button>
          </div>
        </div>

        {/* Grégorien → Hébraïque */}
        {sens === "greg-heb" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Date grégorienne
              </label>
              <input
                type="date"
                value={dateGreg}
                onChange={(e) => setDateGreg(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Hébraïque → Grégorien */}
        {sens === "heb-greg" && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Jour
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={hebJour}
                  onChange={(e) => setHebJour(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Mois
                </label>
                <select
                  value={hebMois}
                  onChange={(e) => setHebMois(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {moisDispo.map((m) => (
                    <option key={m.numero} value={m.numero}>
                      {m.numero}. {m.nom}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Année
                </label>
                <input
                  type="number"
                  min="5000"
                  value={hebAnnee}
                  onChange={(e) => setHebAnnee(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Âge Hébraïque */}
        {sens === "age-heb" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Date de naissance
              </label>
              <input
                type="date"
                value={dateNaissance}
                onChange={(e) => setDateNaissance(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Résultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {/* Aujourd'hui en hébraïque */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
          <h3 className="text-sm font-semibold text-slate-600 mb-2">
            Aujourd&apos;hui en hébraïque
          </h3>
          <div className="text-3xl font-bold text-blue-700 mb-1">
            {hebAujourd.jour} {hebAujourd.moisNom}
          </div>
          <div className="text-xl font-semibold text-slate-700">
            {hebAujourd.annee}
          </div>
          <div className="text-sm text-slate-500 mt-2 text-center">
            {hebAujourd.moisHebreu}
          </div>
          {hebAujourd.estEmbolismique && (
            <div className="mt-2 bg-blue-100 text-blue-700 text-xs font-medium rounded px-2 py-1 text-center">
              Année embolismique (13 mois)
            </div>
          )}
        </div>

        {/* Résultat conversion */}
        {erreur && (
          <div className="bg-red-50 border border-red-300 rounded-2xl p-6">
            <p className="text-red-700 font-medium">Erreur : {erreur}</p>
          </div>
        )}

        {!erreur && sens === "greg-heb" && resultatHeb && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-600 mb-3">
              Résultat (Hébraïque)
            </h3>
            <div className="text-3xl font-bold text-blue-700 mb-1">
              {resultatHeb.jour} {resultatHeb.moisNom}
            </div>
            <div className="text-xl font-semibold text-slate-700">
              {resultatHeb.annee}
            </div>
            <div className="text-sm text-slate-500 mt-3 space-y-1">
              <div>{resultatHeb.moisHebreu}</div>
              <div>Saison : {resultatHeb.saison}</div>
              {resultatHeb.estEmbolismique && (
                <div className="bg-blue-100 text-blue-700 text-xs font-medium rounded px-2 py-1 inline-block mt-2">
                  Année embolismique (13 mois)
                </div>
              )}
            </div>
          </div>
        )}

        {!erreur && sens === "heb-greg" && resultatGreg && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-600 mb-3">
              Résultat (Grégorien)
            </h3>
            <div className="text-3xl font-bold text-blue-700 mb-1">
              {resultatGreg.toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="text-sm text-slate-500 mt-3">
              Jour de la semaine :{" "}
              <strong>
                {resultatGreg.toLocaleDateString("fr-FR", {
                  weekday: "long",
                })}
              </strong>
            </div>
          </div>
        )}

        {!erreur && sens === "age-heb" && ageData && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-600 mb-3">
              Votre âge
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-blue-700">
                  {ageData.ans} ans
                </div>
                <div className="text-xs text-slate-500">Années hébraïques</div>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <div className="text-sm text-slate-600">
                  {ageData.mois} mois • {ageData.jours} jours
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <div className="text-xs text-slate-500 mb-1">
                  Équivalent grégorien :
                </div>
                <div className="font-semibold text-slate-700">
                  {ageData.ansGregorien} ans
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
