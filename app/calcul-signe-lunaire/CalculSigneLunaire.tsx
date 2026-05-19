"use client";
import { useState, useMemo } from "react";
import { calculerSigneLunaire, getAllSignesLunaires, type SigneLunaireInfo } from "./signeLunaireCalc";

export default function CalculSigneLunaire() {
  const [dateNaissance, setDateNaissance] = useState("");
  const [heureH, setHeureH] = useState("12");
  const [heureM, setHeureM] = useState("00");
  const [resultat, setResultat] = useState<SigneLunaireInfo | null>(null);
  const [erreur, setErreur] = useState("");

  const handleCalculer = () => {
    setErreur("");
    setResultat(null);

    if (!dateNaissance) {
      setErreur("Veuillez entrer votre date de naissance");
      return;
    }

    const h = parseInt(heureH, 10);
    const m = parseInt(heureM, 10);

    if (isNaN(h) || h < 0 || h > 23 || isNaN(m) || m < 0 || m > 59) {
      setErreur("Heure invalide. Entrez une heure entre 0-23 et des minutes entre 0-59");
      return;
    }

    const date = new Date(dateNaissance);
    if (isNaN(date.getTime())) {
      setErreur("Date invalide");
      return;
    }

    const signe = calculerSigneLunaire(date, h, m);
    setResultat(signe);
  };

  const signesLunaires = useMemo(() => getAllSignesLunaires(), []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Formulaire */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Entrez vos informations de naissance</h2>

        <div className="space-y-4">
          {/* Date */}
          <div>
            <label htmlFor="date-naissance" className="block text-sm font-semibold text-slate-700 mb-2">
              Date de naissance <span className="text-red-500">*</span>
            </label>
            <input
              id="date-naissance"
              type="date"
              value={dateNaissance}
              onChange={(e) => setDateNaissance(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-slate-800"
            />
          </div>

          {/* Heure */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="heure" className="block text-sm font-semibold text-slate-700 mb-2">
                Heure (0-23) <span className="text-slate-400 text-xs">optionnel</span>
              </label>
              <input
                id="heure"
                type="number"
                min="0"
                max="23"
                value={heureH}
                onChange={(e) => setHeureH(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-slate-800"
              />
            </div>
            <div>
              <label htmlFor="minute" className="block text-sm font-semibold text-slate-700 mb-2">
                Minute (0-59) <span className="text-slate-400 text-xs">optionnel</span>
              </label>
              <input
                id="minute"
                type="number"
                min="0"
                max="59"
                value={heureM}
                onChange={(e) => setHeureM(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-slate-800"
              />
            </div>
          </div>

          {/* Bouton */}
          <button
            onClick={handleCalculer}
            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-slate-700 to-indigo-800 text-white font-semibold rounded-lg shadow-md hover:from-slate-800 hover:to-indigo-900 transition-all duration-200"
          >
            Calculer mon signe lunaire
          </button>
        </div>

        {/* Erreur */}
        {erreur && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {erreur}
          </div>
        )}
      </div>

      {/* Résultat */}
      {resultat && (
        <div className="bg-gradient-to-br from-slate-700 to-indigo-800 text-white rounded-2xl p-8 shadow-lg shadow-slate-500/20 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-slate-300 text-sm mb-1">Votre signe lunaire</p>
              <h3 className="text-5xl font-extrabold">{resultat.symbole} {resultat.signe}</h3>
            </div>
            <div className="text-right">
              {resultat.domicile && (
                <div className="inline-block bg-amber-400/20 border border-amber-300 text-amber-100 px-3 py-1 rounded-full text-xs font-semibold">
                  ✨ Domicile lunaire
                </div>
              )}
            </div>
          </div>

          <div className="h-px bg-white/20 mb-6" />

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-slate-300 text-sm mb-1">Élément</p>
              <p className="text-lg font-semibold">{resultat.element}</p>
            </div>
            <div>
              <p className="text-slate-300 text-sm mb-1">Planète</p>
              <p className="text-lg font-semibold">{resultat.planete}</p>
            </div>
          </div>

          <h4 className="text-sm font-bold text-slate-300 mb-2">Votre nature émotionnelle</h4>
          <p className="text-slate-100 leading-relaxed mb-4">{resultat.description}</p>

          <h4 className="text-sm font-bold text-slate-300 mb-2">Profil émotionnel</h4>
          <p className="text-slate-200 italic mb-4">{resultat.emotion}</p>

          <h4 className="text-sm font-bold text-slate-300 mb-2">Relation à la mère</h4>
          <p className="text-slate-200 text-sm">{resultat.relationMere}</p>
        </div>
      )}

      {/* Tableau comparatif Soleil vs Lune */}
      {resultat && (
        <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Soleil vs Lune vs Ascendant</h3>
          <p className="text-slate-600 text-sm mb-6">
            La trinité astrologique complète votre profil psychologique :
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center font-bold text-xs">☉</div>
              <div>
                <p className="font-semibold text-slate-700">Soleil ☉</p>
                <p className="text-slate-600">Votre identité profonde, votre essence, vos qualités innées</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xs">☽</div>
              <div>
                <p className="font-semibold text-slate-700">Lune ☽</p>
                <p className="text-slate-600">Votre inconscient, vos émotions, votre mère, votre monde intime</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-xs">↑</div>
              <div>
                <p className="font-semibold text-slate-700">Ascendant ↑</p>
                <p className="text-slate-600">Votre apparence, votre première impression, votre masque social</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tous les signes lunaires */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Les 12 signes lunaires</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {signesLunaires.map((s) => (
            <div
              key={s.signe}
              className={`rounded-xl p-4 border-2 transition-all ${
                resultat?.signe === s.signe
                  ? "bg-gradient-to-br from-indigo-50 to-slate-50 border-indigo-400 shadow-md"
                  : "bg-slate-50 border-slate-200 hover:border-slate-300"
              }`}
            >
              <p className="text-2xl mb-2">{s.symbole}</p>
              <p className="font-bold text-slate-800 text-sm mb-1">{s.signe}</p>
              <p className="text-xs text-slate-500 mb-2">{s.element}</p>
              <p className="text-xs text-slate-600 italic">{s.emotion}</p>
              {s.domicile && (
                <p className="text-xs text-amber-600 font-semibold mt-2">✨ Domicile lunaire</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
