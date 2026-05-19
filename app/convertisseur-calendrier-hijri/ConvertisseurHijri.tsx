"use client";

import { useState } from "react";
import {
  gregorienVersHijri,
  hijriVersGregorien,
  calculerAgeHijri,
  formatDateHijri,
  MOIS_HIJRI,
  MethodeHijri,
  DateHijri,
} from "./hijriCalc";

type Sens = "greg-hijri" | "hijri-greg" | "age-hijri";

export default function ConvertisseurHijri() {
  const [methode, setMethode] = useState<MethodeHijri>("tic");
  const [sens, setSens] = useState<Sens>("greg-hijri");

  // Mode Grégorien → Hijri
  const [dateGreg, setDateGreg] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  // Mode Hijri → Grégorien
  const [hijriJour, setHijriJour] = useState<string>("1");
  const [hijriMois, setHijriMois] = useState<string>("1");
  const [hijriAnnee, setHijriAnnee] = useState<string>("1447");

  // Mode Âge Hijri
  const [dateNaissance, setDateNaissance] = useState<string>(
    new Date(2000, 0, 1).toISOString().split("T")[0]
  );

  // Aujourd'hui en hijri
  const hijriAujourd = gregorienVersHijri(new Date(), methode);

  // Calculs
  let resultatHijri: DateHijri | null = null;
  let resultatGreg: Date | null = null;
  let ageData: ReturnType<typeof calculerAgeHijri> | null = null;
  let erreur: string = "";

  if (sens === "greg-hijri" && dateGreg) {
    try {
      resultatHijri = gregorienVersHijri(new Date(dateGreg), methode);
    } catch (e) {
      erreur = "Date invalide";
    }
  } else if (sens === "hijri-greg") {
    try {
      const j = parseInt(hijriJour, 10);
      const m = parseInt(hijriMois, 10);
      const a = parseInt(hijriAnnee, 10);
      if (j > 0 && j <= 30 && m > 0 && m <= 12 && a > 0) {
        resultatGreg = hijriVersGregorien(a, m, j, methode);
      } else {
        erreur = "Jour (1-30), Mois (1-12), Année (>0) invalides";
      }
    } catch (e) {
      erreur = "Erreur de conversion";
    }
  } else if (sens === "age-hijri" && dateNaissance) {
    try {
      ageData = calculerAgeHijri(new Date(dateNaissance));
    } catch (e) {
      erreur = "Date invalide";
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Méthode toggle */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Méthode :
          </label>
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setMethode("tic")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                methode === "tic"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              TIC (Tabulaire)
            </button>
            <button
              onClick={() => setMethode("umm-al-qura")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                methode === "umm-al-qura"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Umm al-Qura
            </button>
          </div>
        </div>

        {/* Sens toggle */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Conversion :
          </label>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setSens("greg-hijri")}
              className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all text-left ${
                sens === "greg-hijri"
                  ? "bg-teal-100 text-teal-800 border border-teal-300"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              Grégorien → Hijri
            </button>
            <button
              onClick={() => setSens("hijri-greg")}
              className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all text-left ${
                sens === "hijri-greg"
                  ? "bg-teal-100 text-teal-800 border border-teal-300"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              Hijri → Grégorien
            </button>
            <button
              onClick={() => setSens("age-hijri")}
              className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all text-left ${
                sens === "age-hijri"
                  ? "bg-teal-100 text-teal-800 border border-teal-300"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              Calculer mon âge hijri
            </button>
          </div>
        </div>

        {/* Grégorien → Hijri */}
        {sens === "greg-hijri" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Date grégorienne
              </label>
              <input
                type="date"
                value={dateGreg}
                onChange={(e) => setDateGreg(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Hijri → Grégorien */}
        {sens === "hijri-greg" && (
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
                  value={hijriJour}
                  onChange={(e) => setHijriJour(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Mois
                </label>
                <select
                  value={hijriMois}
                  onChange={(e) => setHijriMois(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {MOIS_HIJRI.map((m, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}. {m.nom}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Année AH
                </label>
                <input
                  type="number"
                  min="1"
                  value={hijriAnnee}
                  onChange={(e) => setHijriAnnee(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Âge Hijri */}
        {sens === "age-hijri" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Date de naissance
              </label>
              <input
                type="date"
                value={dateNaissance}
                onChange={(e) => setDateNaissance(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Résultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {/* Aujourd'hui en hijri */}
        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl border border-teal-200 p-6">
          <h3 className="text-sm font-semibold text-slate-600 mb-2">
            Aujourd&apos;hui en hijri
          </h3>
          <div className="text-3xl font-bold text-teal-700 mb-1">
            {hijriAujourd.jour} {hijriAujourd.moisNom}
          </div>
          <div className="text-xl font-semibold text-slate-700">
            {hijriAujourd.annee} AH
          </div>
          <div className="text-sm text-slate-500 mt-2">
            {MOIS_HIJRI[hijriAujourd.mois - 1]?.arabe}
          </div>
        </div>

        {/* Résultat conversion */}
        {erreur && (
          <div className="bg-red-50 border border-red-300 rounded-2xl p-6">
            <p className="text-red-700 font-medium">Erreur : {erreur}</p>
          </div>
        )}

        {!erreur && sens === "greg-hijri" && resultatHijri && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-600 mb-3">
              Résultat (Hijri)
            </h3>
            <div className="text-3xl font-bold text-teal-700 mb-1">
              {resultatHijri.jour} {resultatHijri.moisNom}
            </div>
            <div className="text-xl font-semibold text-slate-700">
              {resultatHijri.annee} AH
            </div>
            <div className="text-sm text-slate-500 mt-3">
              {MOIS_HIJRI[resultatHijri.mois - 1]?.arabe} •{" "}
              {MOIS_HIJRI[resultatHijri.mois - 1]?.sacre
                ? "Mois sacré"
                : "Mois ordinaire"}
            </div>
          </div>
        )}

        {!erreur && sens === "hijri-greg" && resultatGreg && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-600 mb-3">
              Résultat (Grégorien)
            </h3>
            <div className="text-3xl font-bold text-teal-700 mb-1">
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

        {!erreur && sens === "age-hijri" && ageData && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-600 mb-3">
              Votre âge
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-teal-700">
                  {ageData.ans} ans
                </div>
                <div className="text-xs text-slate-500">Années hijri (lunaires)</div>
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
