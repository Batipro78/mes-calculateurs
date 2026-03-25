"use client";

import { useState } from "react";

type Motif = "licenciement" | "rupture_conv" | "mise_retraite";

const MOTIF_LABELS: Record<Motif, string> = {
  licenciement: "Licenciement",
  rupture_conv: "Rupture conventionnelle",
  mise_retraite: "Mise a la retraite",
};

const MOTIF_DESC: Record<Motif, string> = {
  licenciement: "Licenciement pour motif personnel ou economique",
  rupture_conv: "Rupture d'un commun accord (meme calcul)",
  mise_retraite: "Mise a la retraite par l'employeur",
};

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export default function CalculateurIndemnite() {
  const [salaireBrut, setSalaireBrut] = useState("2500");
  const [ancienneteAnnees, setAncienneteAnnees] = useState("8");
  const [ancienneteMois, setAncienneteMois] = useState("0");
  const [motif, setMotif] = useState<Motif>("licenciement");

  const salaire = parseFloat(salaireBrut) || 0;
  const annees = parseInt(ancienneteAnnees) || 0;
  const moisSupp = parseInt(ancienneteMois) || 0;
  const ancienneteTotale = annees + moisSupp / 12;

  // Indemnite legale de licenciement (Code du travail)
  // 1/4 de mois par annee pour les 10 premieres annees
  // 1/3 de mois par annee au-dela de 10 ans
  let indemnite = 0;
  if (ancienneteTotale >= 0.6667) {
    // 8 mois minimum d'anciennete
    const partAvant10 = Math.min(ancienneteTotale, 10);
    const partApres10 = Math.max(ancienneteTotale - 10, 0);
    indemnite = salaire * (partAvant10 * (1 / 4) + partApres10 * (1 / 3));
  }

  // Pour mise a la retraite : 1/4 pour les 10 premieres, 1/3 apres (idem)
  // Pour rupture conventionnelle : idem licenciement (plancher legal)

  const moisIndemnite = salaire > 0 ? indemnite / salaire : 0;
  const netApprox = indemnite * 0.9; // ~10% CSG/CRDS approximatif (exonere sous certains seuils)

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Salaire brut */}
        <div className="mb-6">
          <label
            htmlFor="salaire"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Salaire mensuel brut de reference
          </label>
          <div className="relative">
            <input
              id="salaire"
              type="number"
              value={salaireBrut}
              onChange={(e) => setSalaireBrut(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-14 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              min="0"
              step="100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              EUR
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {[1800, 2200, 2500, 3000, 3500, 4500].map((s) => (
              <button
                key={s}
                onClick={() => setSalaireBrut(s.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  salaireBrut === s.toString()
                    ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {fmtInt(s)} EUR
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Moyenne des 12 derniers mois ou des 3 derniers mois (le plus
            avantageux).
          </p>
        </div>

        {/* Anciennete */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Anciennete dans l&apos;entreprise
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <input
                type="number"
                value={ancienneteAnnees}
                onChange={(e) => setAncienneteAnnees(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-16 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                min="0"
                max="50"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                annees
              </span>
            </div>
            <div className="relative">
              <input
                type="number"
                value={ancienneteMois}
                onChange={(e) => setAncienneteMois(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-14 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                min="0"
                max="11"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                mois
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {[2, 5, 8, 10, 15, 20].map((a) => (
              <button
                key={a}
                onClick={() => {
                  setAncienneteAnnees(a.toString());
                  setAncienneteMois("0");
                }}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  ancienneteAnnees === a.toString() && ancienneteMois === "0"
                    ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {a} ans
              </button>
            ))}
          </div>
        </div>

        {/* Motif */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Motif de la rupture
          </label>
          <div className="space-y-2">
            {(Object.keys(MOTIF_LABELS) as Motif[]).map((m) => (
              <label
                key={m}
                className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  motif === m
                    ? "border-indigo-500 bg-indigo-50/50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    motif === m ? "border-indigo-500" : "border-slate-300"
                  }`}
                >
                  {motif === m && (
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  )}
                </div>
                <div>
                  <span className="text-sm font-semibold text-slate-700">
                    {MOTIF_LABELS[m]}
                  </span>
                  <span className="text-xs text-slate-400 ml-2">
                    {MOTIF_DESC[m]}
                  </span>
                </div>
                <input
                  type="radio"
                  name="motif"
                  value={m}
                  checked={motif === m}
                  onChange={() => setMotif(m)}
                  className="sr-only"
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg shadow-indigo-200/50">
          <p className="text-sm text-indigo-100 mb-1">
            Indemnite legale minimale
          </p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(indemnite)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
          <div className="h-px bg-white/20 my-4" />
          <div className="flex justify-between text-sm">
            <span className="text-indigo-200">
              Soit {fmt(moisIndemnite)} mois de salaire
            </span>
          </div>
        </div>

        {ancienneteTotale < 0.6667 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="text-sm font-medium text-amber-800">
              Anciennete insuffisante
            </p>
            <p className="text-xs text-amber-600 mt-1">
              Il faut au minimum 8 mois d&apos;anciennete pour avoir droit a
              l&apos;indemnite legale de licenciement.
            </p>
          </div>
        )}

        {/* Detail calcul */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-600 mb-4">
            Detail du calcul
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Salaire reference</span>
              <span className="text-sm font-bold text-slate-800">
                {fmt(salaire)} EUR/mois
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Anciennete</span>
              <span className="text-sm font-bold text-slate-800">
                {annees} an{annees > 1 ? "s" : ""}
                {moisSupp > 0 ? ` et ${moisSupp} mois` : ""}
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            {ancienneteTotale <= 10 ? (
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">
                  1/4 mois x {fmt(ancienneteTotale)} ans
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {fmt(indemnite)} EUR
                </span>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">
                    1/4 mois x 10 premieres annees
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    {fmt(salaire * 10 * (1 / 4))} EUR
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">
                    1/3 mois x {fmt(ancienneteTotale - 10)} ans
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    {fmt(salaire * (ancienneteTotale - 10) * (1 / 3))} EUR
                  </span>
                </div>
              </>
            )}
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-600">
                Total brut
              </span>
              <span className="text-base font-extrabold text-indigo-600">
                {fmt(indemnite)} EUR
              </span>
            </div>
          </div>
        </div>

        {/* Info fiscale */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Fiscalite
          </p>
          <div className="text-sm text-slate-600 space-y-2 leading-relaxed">
            <p>
              L&apos;indemnite legale de licenciement est{" "}
              <strong>exoneree d&apos;impot sur le revenu</strong> et de
              cotisations sociales dans la limite du montant legal ou
              conventionnel.
            </p>
            <p>
              Au-dela, exoneration plafonnee a{" "}
              <strong>2 fois le salaire annuel brut</strong> ou{" "}
              <strong>50% de l&apos;indemnite</strong> (dans la limite de 6
              PASS).
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Calcul base sur l&apos;indemnite legale minimale (Code du travail
          2026). Votre convention collective peut prevoir un montant superieur.
          Consultez-la ou rapprochez-vous d&apos;un avocat.
        </div>
      </div>
    </div>
  );
}
