"use client";

import { useState } from "react";

interface Activite {
  label: string;
  slug: string;
  tauxCharges: number;
  tauxAbattement: number;
  plafondCA: number;
  tva: boolean;
}

const ACTIVITES: Activite[] = [
  {
    label: "Prestations de services (BIC)",
    slug: "services-bic",
    tauxCharges: 21.2,
    tauxAbattement: 50,
    plafondCA: 77700,
    tva: false,
  },
  {
    label: "Prestations de services (BNC)",
    slug: "services-bnc",
    tauxCharges: 21.1,
    tauxAbattement: 34,
    plafondCA: 77700,
    tva: false,
  },
  {
    label: "Achat / Revente de marchandises",
    slug: "achat-revente",
    tauxCharges: 12.3,
    tauxAbattement: 71,
    plafondCA: 188700,
    tva: false,
  },
  {
    label: "Activite liberale (BNC)",
    slug: "liberal",
    tauxCharges: 21.2,
    tauxAbattement: 34,
    plafondCA: 77700,
    tva: false,
  },
  {
    label: "Location meublee (BIC)",
    slug: "location-meublee",
    tauxCharges: 21.2,
    tauxAbattement: 50,
    plafondCA: 77700,
    tva: false,
  },
];

// Tranches impot 2026
const TRANCHES_IR = [
  { min: 0, max: 11497, taux: 0 },
  { min: 11497, max: 29315, taux: 11 },
  { min: 29315, max: 83823, taux: 30 },
  { min: 83823, max: 180294, taux: 41 },
  { min: 180294, max: Infinity, taux: 45 },
];

function calculerIR(revenuImposable: number, parts: number): number {
  const quotient = revenuImposable / parts;
  let impot = 0;
  for (const tranche of TRANCHES_IR) {
    if (quotient <= tranche.min) break;
    const base = Math.min(quotient, tranche.max) - tranche.min;
    impot += base * (tranche.taux / 100);
  }
  return impot * parts;
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

export default function CalculateurMicroEntreprise() {
  const [ca, setCA] = useState("35000");
  const [activiteIndex, setActiviteIndex] = useState(0);
  const [versementLiberatoire, setVersementLiberatoire] = useState(false);
  const [acre, setAcre] = useState(false);
  const [parts, setParts] = useState("1");

  const caNum = parseFloat(ca) || 0;
  const partsNum = parseFloat(parts) || 1;
  const activite = ACTIVITES[activiteIndex];

  // Charges sociales URSSAF
  let tauxEffectif = activite.tauxCharges;
  if (acre) tauxEffectif = tauxEffectif / 2; // ACRE = 50% de reduction la 1ere annee

  const chargesSociales = caNum * (tauxEffectif / 100);

  // CFP (Contribution Formation Professionnelle)
  const tauxCFP = activite.slug === "achat-revente" ? 0.1 : 0.2;
  const cfp = caNum * (tauxCFP / 100);

  // Total charges
  const totalCharges = chargesSociales + cfp;

  // Revenu apres charges
  const revenuApresCharges = caNum - totalCharges;

  // Impot sur le revenu
  let impot = 0;
  let tauxVL = 0;
  if (versementLiberatoire) {
    // Versement liberatoire
    if (activite.slug === "achat-revente") tauxVL = 1;
    else if (activite.slug === "services-bic" || activite.slug === "location-meublee") tauxVL = 1.7;
    else tauxVL = 2.2;
    impot = caNum * (tauxVL / 100);
  } else {
    // Regime classique : abattement forfaitaire
    const revenuImposable = caNum * (1 - activite.tauxAbattement / 100);
    impot = calculerIR(revenuImposable, partsNum);
  }

  // Revenu net
  const revenuNet = caNum - totalCharges - impot;
  const revenuNetMensuel = revenuNet / 12;

  // Taux de prelevement total
  const tauxTotal = caNum > 0 ? ((totalCharges + impot) / caNum) * 100 : 0;

  // Plafond TVA
  const depassePlafond = caNum > activite.plafondCA;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Type d'activite */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">Type d&apos;activite</label>
          <div className="space-y-2">
            {ACTIVITES.map((act, i) => (
              <button
                key={act.slug}
                onClick={() => setActiviteIndex(i)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                  activiteIndex === i
                    ? "bg-violet-50 border-violet-300 shadow-sm"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <p className={`font-semibold text-sm ${activiteIndex === i ? "text-violet-700" : "text-slate-700"}`}>
                  {act.label}
                </p>
                <p className={`text-xs mt-0.5 ${activiteIndex === i ? "text-violet-600" : "text-slate-400"}`}>
                  Charges : {act.tauxCharges}% · Plafond : {act.plafondCA.toLocaleString("fr-FR")} EUR
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* CA annuel */}
        <div className="mb-6">
          <label htmlFor="ca" className="block text-sm font-medium text-slate-600 mb-2">
            Chiffre d&apos;affaires annuel
          </label>
          <div className="relative">
            <input
              id="ca"
              type="number"
              value={ca}
              onChange={(e) => setCA(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-14 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              min="0"
              step="1000"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">EUR</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {[15000, 25000, 35000, 50000, 70000].map((c) => (
              <button
                key={c}
                onClick={() => setCA(c.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  ca === c.toString()
                    ? "bg-violet-50 border-violet-300 text-violet-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {c.toLocaleString("fr-FR")} EUR
              </button>
            ))}
          </div>
        </div>

        {/* Parts fiscales */}
        <div className="mb-6">
          <label htmlFor="parts" className="block text-sm font-medium text-slate-600 mb-2">
            Parts fiscales
          </label>
          <div className="relative">
            <input
              id="parts"
              type="number"
              value={parts}
              onChange={(e) => setParts(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              min="1"
              max="10"
              step="0.5"
            />
          </div>
          <div className="flex gap-2 mt-2">
            {[1, 1.5, 2, 2.5, 3].map((p) => (
              <button
                key={p}
                onClick={() => setParts(p.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  parts === p.toString()
                    ? "bg-violet-50 border-violet-300 text-violet-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {p} part{p > 1 ? "s" : ""}
              </button>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={versementLiberatoire}
              onChange={(e) => setVersementLiberatoire(e.target.checked)}
              className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
            />
            <div>
              <p className="font-semibold text-sm text-slate-700">Versement liberatoire de l&apos;impot</p>
              <p className="text-xs text-slate-400">Payer l&apos;IR en meme temps que les charges (sous conditions de revenus)</p>
            </div>
          </label>
          <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={acre}
              onChange={(e) => setAcre(e.target.checked)}
              className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
            />
            <div>
              <p className="font-semibold text-sm text-slate-700">ACRE (1ere annee)</p>
              <p className="text-xs text-slate-400">Reduction de 50% des charges sociales la premiere annee</p>
            </div>
          </label>
        </div>

        {depassePlafond && (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm font-bold text-amber-800">Attention : plafond depasse</p>
            <p className="text-xs text-amber-700 mt-1">
              Le plafond pour cette activite est de {activite.plafondCA.toLocaleString("fr-FR")} EUR.
              Au-dela, vous basculez en entreprise individuelle classique.
            </p>
          </div>
        )}
      </div>

      {/* Resultats */}
      <div className="lg:col-span-2 space-y-4">
        {/* Revenu net */}
        <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80 mb-1">Revenu net annuel</p>
          <p className="text-5xl font-extrabold tracking-tight">{fmt(revenuNet)}</p>
          <p className="text-lg font-medium mt-1">EUR / an</p>
          <div className="h-px bg-white/20 my-4" />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white/70">Net mensuel</p>
              <p className="font-semibold">{fmt(revenuNetMensuel)} EUR</p>
            </div>
            <div>
              <p className="text-white/70">Taux prelevements</p>
              <p className="font-semibold">{tauxTotal.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        {/* Decomposition */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">Decomposition</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Chiffre d&apos;affaires</span>
              <span className="text-lg font-extrabold text-slate-800">{fmt(caNum)} EUR</span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-red-600">Charges URSSAF</p>
                <p className="text-xs text-slate-400">{tauxEffectif}% du CA{acre ? " (ACRE)" : ""}</p>
              </div>
              <p className="text-lg font-extrabold text-red-600">-{fmt(chargesSociales)}</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-orange-600">CFP</p>
                <p className="text-xs text-slate-400">{tauxCFP}% du CA</p>
              </div>
              <p className="text-lg font-extrabold text-orange-600">-{fmt(cfp)}</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-amber-600">Impot sur le revenu</p>
                <p className="text-xs text-slate-400">
                  {versementLiberatoire ? `VL ${tauxVL}%` : `Abattement ${activite.tauxAbattement}%, ${partsNum} part${partsNum > 1 ? "s" : ""}`}
                </p>
              </div>
              <p className="text-lg font-extrabold text-amber-600">-{fmt(impot)}</p>
            </div>
            <div className="h-px bg-slate-200" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-green-700">Revenu net</span>
              <span className="text-xl font-extrabold text-green-700">{fmt(revenuNet)} EUR</span>
            </div>
          </div>
        </div>

        {/* Barre visuelle */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">Repartition du CA</p>
          <div className="h-6 flex rounded-full overflow-hidden">
            <div className="bg-green-500" style={{ width: `${caNum > 0 ? (revenuNet / caNum) * 100 : 0}%` }} />
            <div className="bg-red-400" style={{ width: `${caNum > 0 ? (chargesSociales / caNum) * 100 : 0}%` }} />
            <div className="bg-orange-400" style={{ width: `${caNum > 0 ? (cfp / caNum) * 100 : 0}%` }} />
            <div className="bg-amber-400" style={{ width: `${caNum > 0 ? (impot / caNum) * 100 : 0}%` }} />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full" /> Net {caNum > 0 ? ((revenuNet / caNum) * 100).toFixed(0) : 0}%</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-400 rounded-full" /> URSSAF {tauxEffectif}%</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-orange-400 rounded-full" /> CFP {tauxCFP}%</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-400 rounded-full" /> IR {caNum > 0 ? ((impot / caNum) * 100).toFixed(1) : 0}%</span>
          </div>
        </div>

        {/* Info activite */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-2">{activite.label}</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-slate-400 text-xs">Taux charges</p>
              <p className="font-bold text-slate-700">{activite.tauxCharges}%</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs">Abattement fiscal</p>
              <p className="font-bold text-slate-700">{activite.tauxAbattement}%</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs">Plafond CA</p>
              <p className="font-bold text-slate-700">{activite.plafondCA.toLocaleString("fr-FR")} EUR</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs">TVA</p>
              <p className="font-bold text-slate-700">Franchise</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Estimation basee sur les taux URSSAF et le bareme IR 2026. Les montants
          reels peuvent varier selon votre situation. Consultez un expert-comptable
          pour un calcul personnalise.
        </div>
      </div>
    </div>
  );
}
