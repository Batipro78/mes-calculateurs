"use client";

import { useState, useMemo } from "react";

function fmt(montant: number): string {
  return montant.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtInt(montant: number): string {
  return montant.toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

interface LigneAmortissement {
  mois: number;
  mensualite: number;
  capital: number;
  interets: number;
  restant: number;
}

function calculerAmortissement(
  montant: number,
  tauxAnnuel: number,
  dureeAnnees: number
): LigneAmortissement[] {
  const tauxMensuel = tauxAnnuel / 100 / 12;
  const nbMois = dureeAnnees * 12;

  if (tauxMensuel === 0) {
    const mensualite = montant / nbMois;
    return Array.from({ length: nbMois }, (_, i) => ({
      mois: i + 1,
      mensualite,
      capital: mensualite,
      interets: 0,
      restant: montant - mensualite * (i + 1),
    }));
  }

  const mensualite =
    (montant * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -nbMois));

  const lignes: LigneAmortissement[] = [];
  let restant = montant;

  for (let i = 1; i <= nbMois; i++) {
    const interets = restant * tauxMensuel;
    const capital = mensualite - interets;
    restant = restant - capital;
    lignes.push({
      mois: i,
      mensualite,
      capital,
      interets,
      restant: Math.max(0, restant),
    });
  }

  return lignes;
}

const DUREES = [7, 10, 15, 20, 25];

export default function SimulateurPret() {
  const [montant, setMontant] = useState<string>("200000");
  const [taux, setTaux] = useState<string>("3.40");
  const [duree, setDuree] = useState<number>(20);
  const [showTableau, setShowTableau] = useState(false);

  const montantNum = parseFloat(montant) || 0;
  const tauxNum = parseFloat(taux) || 0;

  const lignes = useMemo(
    () => calculerAmortissement(montantNum, tauxNum, duree),
    [montantNum, tauxNum, duree]
  );

  const mensualite = lignes.length > 0 ? lignes[0].mensualite : 0;
  const coutTotal = mensualite * duree * 12;
  const coutInterets = coutTotal - montantNum;
  const pourcentageInterets =
    coutTotal > 0 ? (coutInterets / coutTotal) * 100 : 0;

  // Donnees par annee pour le tableau resume
  const parAnnee = useMemo(() => {
    const result: {
      annee: number;
      capital: number;
      interets: number;
      restant: number;
    }[] = [];
    for (let a = 0; a < duree; a++) {
      const lignesAnnee = lignes.slice(a * 12, (a + 1) * 12);
      if (lignesAnnee.length === 0) break;
      result.push({
        annee: a + 1,
        capital: lignesAnnee.reduce((s, l) => s + l.capital, 0),
        interets: lignesAnnee.reduce((s, l) => s + l.interets, 0),
        restant: lignesAnnee[lignesAnnee.length - 1].restant,
      });
    }
    return result;
  }, [lignes, duree]);

  return (
    <div className="space-y-8">
      {/* Formulaire + Resultats */}
      <div className="grid gap-8 lg:grid-cols-5">
        {/* Formulaire - 3 cols */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          {/* Montant */}
          <div className="mb-6">
            <label
              htmlFor="montant-pret"
              className="block text-sm font-medium text-slate-600 mb-2"
            >
              Montant du pret
            </label>
            <div className="relative">
              <input
                id="montant-pret"
                type="number"
                value={montant}
                onChange={(e) => setMontant(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-shadow"
                min="0"
                step="5000"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                EUR
              </span>
            </div>
            {/* Raccourcis montant */}
            <div className="flex gap-2 mt-2">
              {[100000, 150000, 200000, 300000].map((m) => (
                <button
                  key={m}
                  onClick={() => setMontant(m.toString())}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                    montant === m.toString()
                      ? "bg-violet-50 border-violet-300 text-violet-700"
                      : "border-slate-200 text-slate-400 hover:border-slate-300"
                  }`}
                >
                  {fmtInt(m)} EUR
                </button>
              ))}
            </div>
          </div>

          {/* Taux */}
          <div className="mb-6">
            <label
              htmlFor="taux-pret"
              className="block text-sm font-medium text-slate-600 mb-2"
            >
              Taux annuel
            </label>
            <div className="relative">
              <input
                id="taux-pret"
                type="number"
                value={taux}
                onChange={(e) => setTaux(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-shadow"
                min="0"
                max="15"
                step="0.05"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                %
              </span>
            </div>
            {/* Raccourcis taux */}
            <div className="flex gap-2 mt-2">
              {["2.90", "3.10", "3.40", "3.55", "4.00"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTaux(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                    taux === t
                      ? "bg-violet-50 border-violet-300 text-violet-700"
                      : "border-slate-200 text-slate-400 hover:border-slate-300"
                  }`}
                >
                  {t}%
                </button>
              ))}
            </div>
          </div>

          {/* Duree */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Duree du pret
            </label>
            <div className="grid grid-cols-5 gap-2">
              {DUREES.map((d) => (
                <button
                  key={d}
                  onClick={() => setDuree(d)}
                  className={`py-3 rounded-xl border-2 text-center transition-all ${
                    duree === d
                      ? "border-violet-500 bg-violet-50/50"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-lg font-bold text-slate-800">{d}</span>
                  <span className="block text-xs text-slate-400">ans</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resultats - 2 cols */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg shadow-violet-200/50">
            <p className="text-sm text-violet-200 mb-1">Mensualite</p>
            <p className="text-4xl font-extrabold tracking-tight">
              {fmt(mensualite)}{" "}
              <span className="text-lg font-semibold">EUR</span>
            </p>
            <div className="h-px bg-white/20 my-4" />
            <div className="flex justify-between text-sm">
              <span className="text-violet-200">sur {duree} ans ({duree * 12} mois)</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm text-slate-400 mb-1">Cout total du credit</p>
            <p className="text-2xl font-extrabold text-slate-800">
              {fmt(coutTotal)}{" "}
              <span className="text-sm font-semibold text-slate-400">EUR</span>
            </p>
            <div className="h-px bg-slate-100 my-3" />
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Capital emprunte</span>
              <span className="font-semibold text-slate-600">
                {fmt(montantNum)} EUR
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm text-slate-400 mb-1">Cout des interets</p>
            <p className="text-xl font-extrabold text-amber-500">
              + {fmt(coutInterets)}{" "}
              <span className="text-sm font-semibold">EUR</span>
            </p>
            <div className="h-px bg-slate-100 my-3" />
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Part des interets</span>
              <span className="font-semibold text-amber-500">
                {fmt(pourcentageInterets)}%
              </span>
            </div>
          </div>

          {/* Barre visuelle */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-xs font-medium text-slate-400 mb-3">
              Repartition du cout total
            </p>
            <div className="flex h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500"
                style={{
                  width: `${coutTotal > 0 ? (montantNum / coutTotal) * 100 : 100}%`,
                }}
              />
              <div
                className="bg-amber-300 transition-all duration-500"
                style={{
                  width: `${pourcentageInterets}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs mt-2">
              <span className="text-violet-600 font-medium">
                Capital ({fmt(100 - pourcentageInterets)}%)
              </span>
              <span className="text-amber-500 font-medium">
                Interets ({fmt(pourcentageInterets)}%)
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
            Simulation indicative. Ne tient pas compte de l&apos;assurance
            emprunteur ni des frais de dossier. Consultez votre banque pour une
            offre personnalisee.
          </div>
        </div>
      </div>

      {/* Tableau d'amortissement */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <button
          onClick={() => setShowTableau(!showTableau)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
        >
          <h2 className="text-lg font-bold text-slate-800">
            Tableau d&apos;amortissement
          </h2>
          <svg
            className={`w-5 h-5 text-slate-400 transition-transform ${showTableau ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {showTableau && (
          <div className="px-6 pb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-2 text-slate-500 font-medium">
                      Annee
                    </th>
                    <th className="text-right py-3 px-2 text-slate-500 font-medium">
                      Capital rembourse
                    </th>
                    <th className="text-right py-3 px-2 text-slate-500 font-medium">
                      Interets payes
                    </th>
                    <th className="text-right py-3 px-2 text-slate-500 font-medium">
                      Capital restant
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {parAnnee.map((a) => (
                    <tr
                      key={a.annee}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="py-2.5 px-2 font-medium text-slate-700">
                        {a.annee}
                      </td>
                      <td className="py-2.5 px-2 text-right text-violet-600 font-medium">
                        {fmt(a.capital)} EUR
                      </td>
                      <td className="py-2.5 px-2 text-right text-amber-500 font-medium">
                        {fmt(a.interets)} EUR
                      </td>
                      <td className="py-2.5 px-2 text-right text-slate-600">
                        {fmt(a.restant)} EUR
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
