"use client";

import { useState } from "react";

type Zone = "1" | "2" | "3";
type Situation = "seul" | "couple";

// Loyers plafonds mensuels 2026 par zone et nombre total de personnes
const LOYERS_PLAFONDS: Record<Zone, number[]> = {
  "1": [319.41, 385.09, 409.82, 437.77],
  "2": [278.28, 340.57, 363.43, 385.77],
  "3": [260.82, 314.41, 336.04, 357.02],
};

// Supplement par personne supplementaire au-dela de 4
const SUPPLEMENT_PERSONNE: Record<Zone, number> = {
  "1": 30.42,
  "2": 29.35,
  "3": 27.82,
};

// Forfait charges
const FORFAIT_CHARGES_BASE = [60.59, 73.17]; // 1 pers, 2 pers
const FORFAIT_CHARGES_SUPP = 11.20; // par pers supp

// Participation minimale
const P0 = 39.15;

// Seuil R0 (ressources annuelles)
const R0_SEUL = 5235;
const R0_COUPLE = 7501;
const R0_SUPP_CHARGE = 1400;

// Taux de participation
const TP: Record<Situation, number[]> = {
  seul: [0.029, 0.028, 0.027, 0.026, 0.025, 0.024, 0.023],
  couple: [0.032, 0.031, 0.030, 0.029, 0.028, 0.027, 0.026],
};

function getLoyerPlafond(zone: Zone, nbPersonnes: number): number {
  if (nbPersonnes <= 4) {
    return LOYERS_PLAFONDS[zone][nbPersonnes - 1];
  }
  return LOYERS_PLAFONDS[zone][3] + SUPPLEMENT_PERSONNE[zone] * (nbPersonnes - 4);
}

function getForfaitCharges(nbPersonnes: number): number {
  if (nbPersonnes === 1) return FORFAIT_CHARGES_BASE[0];
  return FORFAIT_CHARGES_BASE[1] + FORFAIT_CHARGES_SUPP * Math.max(0, nbPersonnes - 2);
}

function getR0(situation: Situation, nbCharges: number): number {
  const base = situation === "seul" ? R0_SEUL : R0_COUPLE;
  return base + R0_SUPP_CHARGE * nbCharges;
}

function getTp(situation: Situation, nbCharges: number): number {
  const taux = TP[situation];
  const idx = Math.min(nbCharges, taux.length - 1);
  return taux[idx];
}

function calculerAPL(
  loyer: number,
  zone: Zone,
  situation: Situation,
  nbCharges: number,
  revenus: number
): {
  apl: number;
  loyerPlafonne: number;
  forfaitCharges: number;
  participationPersonnelle: number;
  estPlafonne: boolean;
} {
  const nbPersonnes = (situation === "couple" ? 2 : 1) + nbCharges;
  const loyerPlafond = getLoyerPlafond(zone, nbPersonnes);
  const loyerPlafonne = Math.min(loyer, loyerPlafond);
  const estPlafonne = loyer > loyerPlafond;
  const forfaitCharges = getForfaitCharges(nbPersonnes);

  const r0 = getR0(situation, nbCharges);
  const tp = getTp(situation, nbCharges);
  const rp = Math.max(0, revenus - r0);
  const participationPersonnelle = P0 + tp * (rp / 12);

  let apl = loyerPlafonne + forfaitCharges - participationPersonnelle;
  apl = Math.max(0, apl);

  // Seuil de versement : 10 EUR minimum
  if (apl > 0 && apl < 10) apl = 0;

  return { apl, loyerPlafonne, forfaitCharges, participationPersonnelle, estPlafonne };
}

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const ZONE_DESC: Record<Zone, string> = {
  "1": "Ile-de-France",
  "2": "Grandes villes (>50 000 hab.)",
  "3": "Reste du territoire",
};

export default function SimulateurAPL() {
  const [loyer, setLoyer] = useState("600");
  const [zone, setZone] = useState<Zone>("1");
  const [situation, setSituation] = useState<Situation>("seul");
  const [nbCharges, setNbCharges] = useState(0);
  const [revenus, setRevenus] = useState("15000");

  const loyerNum = parseFloat(loyer) || 0;
  const revenusNum = parseFloat(revenus) || 0;

  const result = calculerAPL(loyerNum, zone, situation, nbCharges, revenusNum);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Loyer */}
        <div className="mb-6">
          <label htmlFor="loyer-apl" className="block text-sm font-medium text-slate-600 mb-2">
            Loyer mensuel (hors charges)
          </label>
          <div className="relative">
            <input
              id="loyer-apl"
              type="number"
              value={loyer}
              onChange={(e) => setLoyer(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
              min="0"
              step="10"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
        </div>

        {/* Zone */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Zone geographique
          </label>
          <div className="space-y-2">
            {(["1", "2", "3"] as Zone[]).map((z) => (
              <label
                key={z}
                className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  zone === z
                    ? "border-teal-500 bg-teal-50/50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      zone === z ? "border-teal-500" : "border-slate-300"
                    }`}
                  >
                    {zone === z && <div className="w-2 h-2 rounded-full bg-teal-500" />}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700">Zone {z}</span>
                    <span className="text-xs text-slate-400 ml-2">{ZONE_DESC[z]}</span>
                  </div>
                </div>
                <input
                  type="radio"
                  name="zone"
                  value={z}
                  checked={zone === z}
                  onChange={() => setZone(z)}
                  className="sr-only"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Situation */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Situation
          </label>
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setSituation("seul")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                situation === "seul"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Seul(e)
            </button>
            <button
              onClick={() => setSituation("couple")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                situation === "couple"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              En couple
            </button>
          </div>
        </div>

        {/* Personnes a charge */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Personnes a charge (enfants)
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[0, 1, 2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => setNbCharges(n)}
                className={`py-3 rounded-xl border-2 text-center transition-all ${
                  nbCharges === n
                    ? "border-teal-500 bg-teal-50/50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-lg font-bold text-slate-800">{n}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Revenus */}
        <div>
          <label htmlFor="revenus-apl" className="block text-sm font-medium text-slate-600 mb-2">
            Revenus annuels du foyer (N-2, soit 2024)
          </label>
          <div className="relative">
            <input
              id="revenus-apl"
              type="number"
              value={revenus}
              onChange={(e) => setRevenus(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
              min="0"
              step="500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1.5">
            Revenus nets imposables figurant sur votre avis d&apos;imposition 2024
          </p>
        </div>
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {/* APL estimee */}
        <div className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl p-6 shadow-lg shadow-teal-200/50">
          <p className="text-sm text-teal-100 mb-1">APL estimee</p>
          {result.apl > 0 ? (
            <>
              <p className="text-4xl font-extrabold tracking-tight">
                {fmt(result.apl)} <span className="text-lg font-semibold">EUR / mois</span>
              </p>
              <div className="h-px bg-white/20 my-4" />
              <div className="flex justify-between text-sm">
                <span className="text-teal-200">Soit par an</span>
                <span className="font-semibold">{fmt(result.apl * 12)} EUR</span>
              </div>
            </>
          ) : (
            <p className="text-2xl font-extrabold tracking-tight mt-2">
              {loyerNum === 0 ? "Entrez votre loyer" : "Non eligible"}
            </p>
          )}
        </div>

        {/* Detail du calcul */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-4">Detail du calcul</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">
                Loyer {result.estPlafonne ? "(plafonne)" : ""}
              </span>
              <span className="text-base font-bold text-slate-800">
                {fmt(result.loyerPlafonne)} EUR
              </span>
            </div>
            {result.estPlafonne && (
              <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-1.5">
                Votre loyer de {fmt(loyerNum)} EUR depasse le plafond de {fmt(result.loyerPlafonne)} EUR pour la zone {zone}
              </p>
            )}
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Forfait charges</span>
              <span className="text-base font-bold text-teal-600">
                + {fmt(result.forfaitCharges)} EUR
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Participation personnelle</span>
              <span className="text-base font-bold text-red-500">
                - {fmt(result.participationPersonnelle)} EUR
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">APL mensuelle</span>
              <span className="text-lg font-extrabold text-teal-600">
                {fmt(result.apl)} EUR
              </span>
            </div>
          </div>
        </div>

        {/* Barre visuelle */}
        {result.apl > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-xs font-medium text-slate-400 mb-3">
              Aide sur votre loyer
            </p>
            <div className="flex h-3 rounded-full overflow-hidden bg-slate-100">
              <div
                className="bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-500"
                style={{ width: `${loyerNum > 0 ? Math.min((result.apl / loyerNum) * 100, 100) : 0}%` }}
              />
            </div>
            <div className="flex justify-between text-xs mt-2">
              <span className="text-teal-600 font-medium">
                APL couvre {loyerNum > 0 ? fmt((result.apl / loyerNum) * 100) : "0"}% du loyer
              </span>
              <span className="text-slate-400">
                Reste : {fmt(Math.max(0, loyerNum - result.apl))} EUR
              </span>
            </div>
          </div>
        )}

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Estimation indicative basee sur les baremes 2026. Le montant exact depend de votre
          situation personnelle et est calcule par la CAF. L&apos;APL n&apos;est pas versee si
          inferieure a 10 EUR/mois.
        </div>
      </div>
    </div>
  );
}
