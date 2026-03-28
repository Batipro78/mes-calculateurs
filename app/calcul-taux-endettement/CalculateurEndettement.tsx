"use client";

import { useState } from "react";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 });
}

interface ResultsType {
  totalRevenus: number;
  totalCharges: number;
  taux: number;
  resteAVivre: number;
  capaciteEmprunt33: number;
}

export default function CalculateurEndettement({
  initialRevenus,
  initialCharges,
}: {
  initialRevenus?: number;
  initialCharges?: number;
}) {
  const [salaire1, setSalaire1] = useState(initialRevenus || 0);
  const [salaire2, setSalaire2] = useState(0);
  const [autresRevenus, setAutresRevenus] = useState(0);
  const [creditImmo, setCreditImmo] = useState(initialCharges || 0);
  const [creditConso, setCreditConso] = useState(0);
  const [creditAuto, setCreditAuto] = useState(0);
  const [loyer, setLoyer] = useState(0);
  const [autresCharges, setAutresCharges] = useState(0);
  const [results, setResults] = useState<ResultsType | null>(null);

  const salaireSuggestions = [1500, 2000, 2500, 3000, 3500, 4000, 5000];

  function calculate() {
    const totalRevenus = salaire1 + salaire2 + autresRevenus;
    const totalCharges = creditImmo + creditConso + creditAuto + loyer + autresCharges;

    if (totalRevenus <= 0) return;

    const taux = (totalCharges / totalRevenus) * 100;
    const resteAVivre = totalRevenus - totalCharges;
    const capaciteEmprunt33 = totalRevenus * 0.33 - totalCharges;

    setResults({
      totalRevenus,
      totalCharges,
      taux,
      resteAVivre,
      capaciteEmprunt33: Math.max(0, capaciteEmprunt33),
    });
  }

  function getTauxColor(taux: number): string {
    if (taux <= 25) return "text-green-600";
    if (taux <= 33) return "text-amber-600";
    if (taux <= 40) return "text-orange-600";
    return "text-red-600";
  }

  function getTauxBg(taux: number): string {
    if (taux <= 25) return "from-green-500 to-emerald-500";
    if (taux <= 33) return "from-amber-500 to-yellow-500";
    if (taux <= 40) return "from-orange-500 to-amber-500";
    return "from-red-500 to-rose-500";
  }

  function getTauxLabel(taux: number): string {
    if (taux <= 25) return "Excellent - Situation confortable";
    if (taux <= 33) return "Acceptable - Seuil bancaire respecte";
    if (taux <= 40) return "Eleve - Risque de refus bancaire";
    return "Critique - Surendettement";
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-800 mb-4">Vos revenus mensuels nets</h2>

        <label className="block text-sm font-medium text-slate-700 mb-1">
          Salaire net (emprunteur 1)
        </label>
        <div className="flex flex-wrap gap-2 mb-1">
          {salaireSuggestions.map((s) => (
            <button
              key={s}
              onClick={() => setSalaire1(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                salaire1 === s
                  ? "bg-blue-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {fmt(s)} EUR
            </button>
          ))}
        </div>
        <input
          type="number"
          value={salaire1 || ""}
          onChange={(e) => setSalaire1(Number(e.target.value))}
          placeholder="Ex: 2500"
          className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none mb-3"
        />

        <label className="block text-sm font-medium text-slate-700 mb-1">
          Salaire net (co-emprunteur)
        </label>
        <input
          type="number"
          value={salaire2 || ""}
          onChange={(e) => setSalaire2(Number(e.target.value))}
          placeholder="0 si seul"
          className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none mb-3"
        />

        <label className="block text-sm font-medium text-slate-700 mb-1">
          Autres revenus (allocations, loyers...)
        </label>
        <input
          type="number"
          value={autresRevenus || ""}
          onChange={(e) => setAutresRevenus(Number(e.target.value))}
          placeholder="0"
          className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none mb-6"
        />

        <h2 className="font-bold text-slate-800 mb-4">Vos charges mensuelles</h2>

        <label className="block text-sm font-medium text-slate-700 mb-1">
          Credit immobilier (mensualite)
        </label>
        <input
          type="number"
          value={creditImmo || ""}
          onChange={(e) => setCreditImmo(Number(e.target.value))}
          placeholder="0"
          className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none mb-3"
        />

        <label className="block text-sm font-medium text-slate-700 mb-1">
          Credit consommation
        </label>
        <input
          type="number"
          value={creditConso || ""}
          onChange={(e) => setCreditConso(Number(e.target.value))}
          placeholder="0"
          className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none mb-3"
        />

        <label className="block text-sm font-medium text-slate-700 mb-1">
          Credit auto / moto
        </label>
        <input
          type="number"
          value={creditAuto || ""}
          onChange={(e) => setCreditAuto(Number(e.target.value))}
          placeholder="0"
          className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none mb-3"
        />

        <label className="block text-sm font-medium text-slate-700 mb-1">
          Loyer (si locataire)
        </label>
        <input
          type="number"
          value={loyer || ""}
          onChange={(e) => setLoyer(Number(e.target.value))}
          placeholder="0"
          className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none mb-3"
        />

        <label className="block text-sm font-medium text-slate-700 mb-1">
          Autres charges (pension, etc.)
        </label>
        <input
          type="number"
          value={autresCharges || ""}
          onChange={(e) => setAutresCharges(Number(e.target.value))}
          placeholder="0"
          className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none mb-4"
        />

        <button
          onClick={calculate}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-3 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-colors"
        >
          Calculer mon taux d&apos;endettement
        </button>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-3 space-y-6">
        {!results ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <div className="text-5xl mb-4">🏦</div>
            <p className="text-slate-500">
              Renseignez vos revenus et charges mensuels pour calculer votre{" "}
              <strong>taux d&apos;endettement</strong> et savoir si vous pouvez
              emprunter.
            </p>
          </div>
        ) : (
          <>
            {/* Taux principal */}
            <div className={`bg-gradient-to-br ${getTauxBg(results.taux)} rounded-2xl p-6 text-white`}>
              <p className="text-white/80 text-sm font-medium">Taux d&apos;endettement</p>
              <p className="text-5xl font-extrabold mt-1">{results.taux.toFixed(1)}%</p>
              <p className="text-white/90 text-sm mt-2">{getTauxLabel(results.taux)}</p>
              <div className="mt-4 bg-white/20 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${Math.min(100, results.taux * 2)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-white/60 mt-1">
                <span>0%</span>
                <span>25%</span>
                <span>33%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Chiffres cles */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <p className="text-slate-500 text-sm font-medium">Total revenus</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{fmt(results.totalRevenus)} EUR/mois</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <p className="text-slate-500 text-sm font-medium">Total charges</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{fmt(results.totalCharges)} EUR/mois</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <p className="text-slate-500 text-sm font-medium">Reste a vivre</p>
                <p className={`text-2xl font-bold mt-1 ${results.resteAVivre > 0 ? "text-green-600" : "text-red-600"}`}>
                  {fmt(results.resteAVivre)} EUR/mois
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <p className="text-slate-500 text-sm font-medium">Capacite de remboursement</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {fmt(results.capaciteEmprunt33)} EUR/mois
                </p>
                <p className="text-xs text-slate-400 mt-1">Mensualite max pour rester a 33%</p>
              </div>
            </div>

            {/* Detail des charges */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4">Repartition des charges</h3>
              <div className="space-y-3">
                {[
                  { label: "Credit immobilier", value: creditImmo },
                  { label: "Credit consommation", value: creditConso },
                  { label: "Credit auto/moto", value: creditAuto },
                  { label: "Loyer", value: loyer },
                  { label: "Autres charges", value: autresCharges },
                ].filter(c => c.value > 0).map((c) => {
                  const pct = results.totalCharges > 0 ? (c.value / results.totalCharges) * 100 : 0;
                  return (
                    <div key={c.label} className="flex items-center gap-3">
                      <div className="w-36 text-sm text-slate-600 shrink-0">{c.label}</div>
                      <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-blue-400"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="w-24 text-sm text-slate-700 text-right font-medium">
                        {fmt(c.value)} EUR ({pct.toFixed(0)}%)
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Estimation capacite d'emprunt */}
            <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
              <h3 className="font-bold text-blue-800 mb-3">Capacite d&apos;emprunt estimee</h3>
              <p className="text-sm text-blue-700 mb-4">
                Avec une mensualite maximale de <strong>{fmt(results.capaciteEmprunt33)} EUR</strong> (seuil 33%),
                voici le montant que vous pourriez emprunter :
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { duree: 15, taux: 3.2 },
                  { duree: 20, taux: 3.4 },
                  { duree: 25, taux: 3.5 },
                ].map(({ duree, taux }) => {
                  const mensualite = results.capaciteEmprunt33;
                  const r = taux / 100 / 12;
                  const n = duree * 12;
                  const capital = r > 0 ? mensualite * ((1 - Math.pow(1 + r, -n)) / r) : mensualite * n;
                  return (
                    <div key={duree} className="bg-white rounded-xl p-4 border border-blue-100 text-center">
                      <p className="text-sm text-blue-600 font-medium">{duree} ans ({taux}%)</p>
                      <p className="text-xl font-extrabold text-blue-800 mt-1">{fmt(Math.round(capital))} EUR</p>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-blue-500 mt-3">
                Estimations indicatives, hors assurance. Taux moyens constates en mars 2026.
              </p>
            </div>

            {/* Conseils */}
            {results.taux > 33 && (
              <div className="bg-red-50 rounded-2xl border border-red-100 p-6">
                <h3 className="font-bold text-red-800 mb-3">Comment reduire votre taux d&apos;endettement ?</h3>
                <ul className="space-y-2 text-sm text-red-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">1.</span>
                    <strong>Renegociez vos credits</strong> : regroupez-les pour baisser les mensualites
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">2.</span>
                    <strong>Soldez un credit</strong> : remboursez le plus petit par anticipation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">3.</span>
                    <strong>Augmentez vos revenus</strong> : prime, heures sup, activite complementaire
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">4.</span>
                    <strong>Allongez la duree</strong> : etalez le credit sur plus longtemps
                  </li>
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
