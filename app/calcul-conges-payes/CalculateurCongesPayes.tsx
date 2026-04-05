"use client";
import { useState, useMemo } from "react";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function CalculateurCongesPayes() {
  const [moisTravailles, setMoisTravailles] = useState<string>("12");
  const [salaireBrut, setSalaireBrut] = useState<string>("2500");
  const [tempsPartiel, setTempsPartiel] = useState<string>("100");
  const [methode, setMethode] = useState<"dixieme" | "maintien">("dixieme");

  const resultat = useMemo(() => {
    const mois = parseFloat(moisTravailles.replace(",", "."));
    const salaire = parseFloat(salaireBrut.replace(",", "."));
    const tp = parseFloat(tempsPartiel.replace(",", "."));
    if (isNaN(mois) || isNaN(salaire) || isNaN(tp) || mois <= 0 || salaire <= 0 || tp <= 0) return null;

    const joursAcquis = Math.min(mois, 12) * 2.5 * (tp / 100);
    const joursAcquisArrondi = Math.ceil(joursAcquis); // Arrondi au superieur

    // Methode du 1/10e
    const totalBrutAnnuel = salaire * Math.min(mois, 12);
    const indemniteDixieme = totalBrutAnnuel / 10;

    // Methode du maintien de salaire (26 jours ouvres / mois)
    const salaireJournalier = salaire / 21.67; // jours ouvres par mois
    const indemniteMainitien = salaireJournalier * joursAcquisArrondi;

    const indemniteRetenue = Math.max(indemniteDixieme, indemniteMainitien);

    return {
      joursAcquis: joursAcquisArrondi,
      joursExacts: joursAcquis,
      indemniteDixieme,
      indemniteMainitien,
      indemniteRetenue,
      methodeRetenue: indemniteDixieme >= indemniteMainitien ? "1/10e" : "maintien",
      salaireJournalier,
      totalBrutAnnuel,
    };
  }, [moisTravailles, salaireBrut, tempsPartiel]);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Mois travailles (sur la periode de reference)
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={moisTravailles}
            onChange={(e) => setMoisTravailles(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
            placeholder="12"
          />
          <p className="text-xs text-slate-400 mt-1">Periode de reference : 1er juin N-1 au 31 mai N (max 12 mois)</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Salaire brut mensuel (&euro;)
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={salaireBrut}
            onChange={(e) => setSalaireBrut(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
            placeholder="2500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Temps de travail (%)
          </label>
          <div className="flex gap-2">
            {[100, 80, 60, 50].map((t) => (
              <button
                key={t}
                onClick={() => setTempsPartiel(String(t))}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  tempsPartiel === String(t)
                    ? "bg-teal-500 text-white shadow-sm"
                    : "border border-slate-200 text-slate-600 hover:border-teal-300"
                }`}
              >
                {t}%
              </button>
            ))}
          </div>
        </div>

        {/* Raccourcis salaire */}
        <div>
          <p className="text-xs font-medium text-slate-400 mb-2">Salaires courants</p>
          <div className="flex flex-wrap gap-2">
            {[1800, 2000, 2500, 3000, 3500, 4000].map((s) => (
              <button
                key={s}
                onClick={() => setSalaireBrut(String(s))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50/50 transition-all"
              >
                {s.toLocaleString("fr-FR")} &euro;
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {resultat ? (
          <>
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl p-6 shadow-lg shadow-teal-200/50">
              <p className="text-teal-200 text-sm mb-1">Jours de conges acquis</p>
              <p className="text-4xl font-extrabold tracking-tight">
                {resultat.joursAcquis} <span className="text-xl font-semibold">jours ouvres</span>
              </p>
              <p className="text-teal-200 text-xs mt-1">({fmt(resultat.joursExacts)} jours exacts, arrondi au superieur)</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-2">Indemnite de conges payes</p>
              <p className="text-2xl font-extrabold text-teal-600">{fmt(resultat.indemniteRetenue)} &euro;</p>
              <p className="text-xs text-slate-400 mt-1">Methode la plus favorable : {resultat.methodeRetenue}</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-3">Comparaison des 2 methodes</p>
              <div className="space-y-2">
                <div className={`rounded-xl p-3 flex justify-between items-center ${resultat.methodeRetenue === "1/10e" ? "bg-teal-50 ring-1 ring-teal-200" : "bg-slate-50"}`}>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Methode du 1/10e</p>
                    <p className="text-xs text-slate-400">1/10e du salaire brut annuel</p>
                  </div>
                  <p className="font-bold text-slate-800">{fmt(resultat.indemniteDixieme)} &euro;</p>
                </div>
                <div className={`rounded-xl p-3 flex justify-between items-center ${resultat.methodeRetenue === "maintien" ? "bg-teal-50 ring-1 ring-teal-200" : "bg-slate-50"}`}>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Maintien de salaire</p>
                    <p className="text-xs text-slate-400">Salaire journalier &times; jours de CP</p>
                  </div>
                  <p className="font-bold text-slate-800">{fmt(resultat.indemniteMainitien)} &euro;</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-xs font-medium text-slate-400 mb-2">Details</p>
              <div className="space-y-1 text-sm text-slate-600">
                <p>Salaire journalier : {fmt(resultat.salaireJournalier)} &euro;</p>
                <p>Total brut annuel : {fmt(resultat.totalBrutAnnuel)} &euro;</p>
                <p>Acquisition : 2,5 jours/mois travaille</p>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-6 text-center">
            <p className="text-slate-400 text-sm">Remplissez les champs pour voir le resultat</p>
          </div>
        )}
      </div>
    </div>
  );
}
