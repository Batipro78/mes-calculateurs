"use client";

import { useState } from "react";

type Situation = "celibataire" | "couple" | "couple_1revenu";

// Tranches d'imposition 2026 (revenus 2025)
const TRANCHES = [
  { min: 0, max: 11497, taux: 0 },
  { min: 11497, max: 29315, taux: 0.11 },
  { min: 29315, max: 83823, taux: 0.3 },
  { min: 83823, max: 180294, taux: 0.41 },
  { min: 180294, max: Infinity, taux: 0.45 },
];

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function fmt2(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function calculImpot(revenuImposable: number, nbParts: number) {
  const quotient = revenuImposable / nbParts;
  let impotParPart = 0;
  const detailTranches: { tranche: string; taux: number; montant: number }[] = [];

  for (const t of TRANCHES) {
    if (quotient <= t.min) break;
    const base = Math.min(quotient, t.max) - t.min;
    const montant = base * t.taux;
    impotParPart += montant;
    if (base > 0) {
      detailTranches.push({
        tranche: `${fmt(t.min)} - ${t.max === Infinity ? "+" : fmt(t.max)} EUR`,
        taux: t.taux * 100,
        montant: montant * nbParts,
      });
    }
  }

  const impotBrut = impotParPart * nbParts;

  // Decote 2026
  let decote = 0;
  if (nbParts <= 1.5) {
    // Celibataire
    if (impotBrut < 1929) {
      decote = Math.max(0, 873 - impotBrut * 0.4525);
    }
  } else {
    // Couple
    if (impotBrut < 3191) {
      decote = Math.max(0, 1444 - impotBrut * 0.4525);
    }
  }

  const impotNet = Math.max(0, impotBrut - decote);

  // Taux marginal
  let tauxMarginal = 0;
  for (const t of TRANCHES) {
    if (quotient > t.min) tauxMarginal = t.taux * 100;
  }

  return { impotBrut, decote, impotNet, tauxMarginal, detailTranches, quotient };
}

export default function SimulateurImpot() {
  const [revenuNet, setRevenuNet] = useState("30000");
  const [situation, setSituation] = useState<Situation>("celibataire");
  const [enfants, setEnfants] = useState("0");
  const [deductionForfaitaire, setDeductionForfaitaire] = useState(true);

  const revenu = parseFloat(revenuNet) || 0;

  // Calcul parts
  const nbEnfants = parseInt(enfants) || 0;
  let nbParts = situation === "celibataire" ? 1 : 2;
  if (nbEnfants >= 1) nbParts += 0.5;
  if (nbEnfants >= 2) nbParts += 0.5;
  if (nbEnfants >= 3) nbParts += nbEnfants - 2; // 1 part entiere par enfant a partir du 3e

  // Revenu imposable
  const abattement = deductionForfaitaire
    ? Math.max(495, Math.min(revenu * 0.1, 14171))
    : 0;
  const revenuImposable = Math.max(0, revenu - abattement);

  const result = calculImpot(revenuImposable, nbParts);

  const tauxMoyen =
    revenu > 0 ? (result.impotNet / revenu) * 100 : 0;
  const parMois = result.impotNet / 12;
  const resteAVivre = revenu - result.impotNet;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="space-y-5">
          {/* Revenu */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Revenu net annuel imposable
            </label>
            <div className="relative">
              <input
                type="number"
                value={revenuNet}
                onChange={(e) => setRevenuNet(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-14 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                min="0"
                step="1000"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                EUR
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Montant avant abattement de 10% (inscrit sur votre fiche de paie annuelle)
            </p>
          </div>

          {/* Situation */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Situation familiale
            </label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { id: "celibataire" as Situation, label: "Celibataire", desc: "Divorce, veuf" },
                { id: "couple" as Situation, label: "Couple (2 rev.)", desc: "Marie / Pacse" },
                { id: "couple_1revenu" as Situation, label: "Couple (1 rev.)", desc: "Marie / Pacse" },
              ]).map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSituation(s.id)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    situation === s.id
                      ? "border-red-500 bg-red-50/50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="text-sm font-bold text-slate-800">
                    {s.label}
                  </span>
                  <span className="block text-xs text-slate-400">{s.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Enfants */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Enfants a charge
            </label>
            <div className="flex gap-2">
              {["0", "1", "2", "3", "4", "5"].map((n) => (
                <button
                  key={n}
                  onClick={() => setEnfants(n)}
                  className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                    enfants === n
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Deduction */}
          <div className="pt-4 border-t border-slate-100">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={deductionForfaitaire}
                onChange={(e) => setDeductionForfaitaire(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm font-medium text-slate-600">
                Appliquer l&apos;abattement forfaitaire de 10%
              </span>
            </label>
            {deductionForfaitaire && (
              <p className="text-xs text-slate-400 mt-1 ml-7">
                Abattement : {fmt(abattement)} EUR (min 495 EUR, max 14 171 EUR)
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-2xl p-6 shadow-lg shadow-red-200/50">
          <p className="text-sm text-red-100 mb-1">Impot sur le revenu</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(result.impotNet)}{" "}
            <span className="text-lg font-semibold">EUR / an</span>
          </p>
          <p className="text-sm text-red-200 mt-2">
            soit {fmt(Math.round(parMois))} EUR / mois
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-4">Resume</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Revenu declare</span>
              <span className="font-bold text-slate-800">{fmt(revenu)} EUR</span>
            </div>
            {deductionForfaitaire && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Abattement 10%</span>
                <span className="font-bold text-red-500">- {fmt(abattement)} EUR</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Revenu imposable</span>
              <span className="font-bold text-slate-800">{fmt(revenuImposable)} EUR</span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Nombre de parts</span>
              <span className="font-bold text-slate-800">{nbParts}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Quotient familial</span>
              <span className="font-bold text-slate-800">{fmt(Math.round(result.quotient))} EUR</span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Taux marginal</span>
              <span className="font-bold text-slate-800">{result.tauxMarginal}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Taux moyen</span>
              <span className="font-bold text-slate-800">{fmt2(tauxMoyen)}%</span>
            </div>
            {result.decote > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Decote</span>
                <span className="font-bold text-green-600">- {fmt(Math.round(result.decote))} EUR</span>
              </div>
            )}
          </div>
        </div>

        {/* Detail tranches */}
        {result.detailTranches.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-xs font-medium text-slate-400 mb-3">
              Detail par tranche
            </p>
            <div className="space-y-2">
              {result.detailTranches.map((t, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">
                    {t.taux}%
                  </span>
                  <span className="font-semibold text-slate-700">
                    {fmt(Math.round(t.montant))} EUR
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Barre visuelle */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Repartition de votre revenu
          </p>
          <div className="flex h-4 rounded-full overflow-hidden bg-slate-100">
            <div
              className="bg-green-400 transition-all duration-500"
              style={{ width: `${revenu > 0 ? (resteAVivre / revenu) * 100 : 100}%` }}
            />
            <div
              className="bg-red-400 transition-all duration-500"
              style={{ width: `${revenu > 0 ? tauxMoyen : 0}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-2">
            <span className="text-green-600 font-medium">
              Net : {fmt(Math.round(resteAVivre))} EUR ({fmt2(100 - tauxMoyen)}%)
            </span>
            <span className="text-red-500 font-medium">
              Impot : {fmt2(tauxMoyen)}%
            </span>
          </div>
        </div>

        <div className="bg-red-50 rounded-2xl border border-red-200 p-4">
          <p className="text-xs text-red-700">
            Simulation indicative basee sur le bareme 2026 (revenus 2025).
            Ne tient pas compte des credits et reductions d&apos;impot, des
            revenus fonciers ou des plus-values. Pour une simulation
            officielle, utilisez le simulateur sur impots.gouv.fr.
          </p>
        </div>
      </div>
    </div>
  );
}
