"use client";

import { useState } from "react";
import {
  calcScoreAutonomie,
  calcBudgetEquipement,
  EQUIPEMENTS,
  CHAUFFAGE_LABELS,
  CUISINE_LABELS,
  EAU_CHAUDE_LABELS,
  NIVEAU_LABELS,
  type ChauffageType,
  type CuisineType,
  type EauChaudeType,
  type NiveauPreparation,
} from "./blackoutCalc";

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

const CHAUFFAGES: ChauffageType[] = ["tout-electrique", "gaz", "bois", "mixte"];
const CUISINES: CuisineType[] = ["electrique", "gaz", "mixte"];
const EAUX_CHAUDES: EauChaudeType[] = ["electrique", "gaz", "solaire"];

export default function SimulateurBlackout() {
  const [onglet, setOnglet] = useState<"score" | "budget">("score");
  const [chauffage, setChauffage] = useState<ChauffageType>("tout-electrique");
  const [cuisine, setCuisine] = useState<CuisineType>("electrique");
  const [eauChaude, setEauChaude] = useState<EauChaudeType>("electrique");
  const [nbPersonnes, setNbPersonnes] = useState(2);
  const [equipements, setEquipements] = useState<string[]>([]);
  const [niveau, setNiveau] = useState<NiveauPreparation>("essentiel");

  const toggleEquipement = (id: string) => {
    setEquipements((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id],
    );
  };

  const score = calcScoreAutonomie(chauffage, cuisine, eauChaude, nbPersonnes, equipements);
  const budget = calcBudgetEquipement(niveau, nbPersonnes, equipements);

  const scoreColor =
    score.scoreTotal >= 70 ? "text-emerald-600" :
    score.scoreTotal >= 45 ? "text-amber-600" :
    score.scoreTotal >= 25 ? "text-orange-600" : "text-red-600";

  const scoreBg =
    score.scoreTotal >= 70 ? "from-emerald-500 to-green-600" :
    score.scoreTotal >= 45 ? "from-amber-500 to-orange-500" :
    score.scoreTotal >= 25 ? "from-orange-500 to-red-500" : "from-red-600 to-red-800";

  const niveauLabel =
    score.niveau === "prepare" ? "Bien prepare" :
    score.niveau === "correct" ? "Correct" :
    score.niveau === "fragile" ? "Fragile" : "Critique";

  return (
    <div>
      {/* Onglets */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setOnglet("score")}
          className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
            onglet === "score"
              ? "bg-slate-800 border-slate-800 text-white shadow-lg"
              : "border-slate-200 text-slate-500 hover:border-slate-300"
          }`}
        >
          🔦 Score d&apos;autonomie
        </button>
        <button
          onClick={() => setOnglet("budget")}
          className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
            onglet === "budget"
              ? "bg-slate-800 border-slate-800 text-white shadow-lg"
              : "border-slate-200 text-slate-500 hover:border-slate-300"
          }`}
        >
          🛒 Budget equipement
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Formulaire */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          {/* Chauffage */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-2">Chauffage principal</label>
            <div className="grid grid-cols-2 gap-2">
              {CHAUFFAGES.map((c) => (
                <button
                  key={c}
                  onClick={() => setChauffage(c)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                    chauffage === c
                      ? "bg-slate-800 border-slate-800 text-white shadow-sm"
                      : "border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  {c === "tout-electrique" ? "⚡" : c === "gaz" ? "🔥" : c === "bois" ? "🪵" : "🔄"}{" "}
                  {CHAUFFAGE_LABELS[c]}
                </button>
              ))}
            </div>
          </div>

          {/* Cuisine */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-2">Plaque de cuisson</label>
            <div className="grid grid-cols-3 gap-2">
              {CUISINES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCuisine(c)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                    cuisine === c
                      ? "bg-slate-800 border-slate-800 text-white shadow-sm"
                      : "border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  {CUISINE_LABELS[c]}
                </button>
              ))}
            </div>
          </div>

          {/* Eau chaude */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-2">Eau chaude</label>
            <div className="grid grid-cols-3 gap-2">
              {EAUX_CHAUDES.map((e) => (
                <button
                  key={e}
                  onClick={() => setEauChaude(e)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                    eauChaude === e
                      ? "bg-slate-800 border-slate-800 text-white shadow-sm"
                      : "border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  {EAU_CHAUDE_LABELS[e]}
                </button>
              ))}
            </div>
          </div>

          {/* Nb personnes */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-2">Nombre de personnes</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setNbPersonnes(n)}
                  className={`w-12 h-12 rounded-xl text-sm font-bold border-2 transition-all ${
                    nbPersonnes === n
                      ? "bg-slate-800 border-slate-800 text-white shadow-sm"
                      : "border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Equipements possedes */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Equipements de secours que vous possedez
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {EQUIPEMENTS.map((eq) => (
                <button
                  key={eq.id}
                  onClick={() => toggleEquipement(eq.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-sm border-2 transition-all ${
                    equipements.includes(eq.id)
                      ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                      : "border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  <span className="text-lg">{eq.emoji}</span>
                  <span className="font-medium">{eq.nom}</span>
                  {equipements.includes(eq.id) && <span className="ml-auto text-emerald-600">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resultats */}
        <div className="lg:col-span-2 space-y-4">
          {onglet === "score" ? (
            <>
              {/* Score principal */}
              <div className={`bg-gradient-to-br ${scoreBg} text-white rounded-2xl p-6 shadow-lg`}>
                <p className="text-sm opacity-80 mb-1">Score d&apos;autonomie</p>
                <p className="text-5xl font-extrabold tracking-tight">{score.scoreTotal}<span className="text-2xl opacity-70">/100</span></p>
                <p className="text-lg font-medium mt-1">{niveauLabel}</p>
                <div className="h-px bg-white/20 my-4" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white/70">Autonomie estimee</p>
                    <p className="font-semibold">
                      {score.dureeAutonomieH >= 24
                        ? `${Math.floor(score.dureeAutonomieH / 24)} jours`
                        : `${score.dureeAutonomieH}h`}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/70">Personnes</p>
                    <p className="font-semibold">{nbPersonnes}</p>
                  </div>
                </div>
              </div>

              {/* Detail par categorie */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <p className="text-xs font-medium text-slate-400 mb-3">Detail par categorie</p>
                <div className="space-y-3">
                  {score.details.map((d) => (
                    <div key={d.categorie}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-slate-600">
                          {d.emoji} {d.label}
                        </span>
                        <span className={`text-sm font-bold ${d.score >= d.max * 0.6 ? "text-emerald-600" : d.score >= d.max * 0.3 ? "text-amber-600" : "text-red-600"}`}>
                          {d.score}/{d.max}
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            d.score >= d.max * 0.6 ? "bg-emerald-500" : d.score >= d.max * 0.3 ? "bg-amber-500" : "bg-red-500"
                          }`}
                          style={{ width: `${(d.score / d.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vulnerabilites */}
              {score.vulnerabilites.length > 0 && (
                <div className="bg-red-50 rounded-2xl border border-red-200 p-5">
                  <p className="text-xs font-medium text-red-400 mb-3">⚠️ Vulnerabilites</p>
                  <ul className="space-y-2">
                    {score.vulnerabilites.map((v, i) => (
                      <li key={i} className="text-sm text-red-700 flex gap-2">
                        <span className="text-red-400 mt-0.5">•</span>
                        {v}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Forces */}
              {score.forces.length > 0 && (
                <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5">
                  <p className="text-xs font-medium text-emerald-400 mb-3">✓ Points forts</p>
                  <ul className="space-y-2">
                    {score.forces.map((f, i) => (
                      <li key={i} className="text-sm text-emerald-700 flex gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Selection niveau */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <p className="text-xs font-medium text-slate-400 mb-3">Niveau de preparation</p>
                <div className="space-y-2">
                  {(["essentiel", "confort", "autonome"] as NiveauPreparation[]).map((n) => {
                    const budgetN = calcBudgetEquipement(n, nbPersonnes, equipements);
                    return (
                      <button
                        key={n}
                        onClick={() => setNiveau(n)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${
                          niveau === n
                            ? "bg-slate-800 border-slate-800 text-white"
                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <span className="font-semibold text-sm">
                          {n === "essentiel" ? "🎒" : n === "confort" ? "🏠" : "🏰"}{" "}
                          {NIVEAU_LABELS[n]}
                        </span>
                        <span className={`text-sm font-bold ${niveau === n ? "text-white" : "text-slate-500"}`}>
                          {fmt(budgetN.aInvestir)} EUR
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget detail */}
              <div className={`bg-gradient-to-br from-slate-700 to-slate-900 text-white rounded-2xl p-6 shadow-lg`}>
                <p className="text-sm opacity-80 mb-1">Budget a investir</p>
                <p className="text-5xl font-extrabold tracking-tight">{fmt(budget.aInvestir)} <span className="text-2xl opacity-70">EUR</span></p>
                <p className="text-sm font-medium mt-1 text-white/70">
                  Niveau {NIVEAU_LABELS[niveau]} — {nbPersonnes} pers.
                </p>
                <div className="h-px bg-white/20 my-4" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white/70">Budget total</p>
                    <p className="font-semibold">{fmt(budget.totalNeuf)} EUR</p>
                  </div>
                  <div>
                    <p className="text-white/70">Deja acquis</p>
                    <p className="font-semibold text-emerald-300">-{fmt(budget.totalDejaAcquis)} EUR</p>
                  </div>
                </div>
              </div>

              {/* Liste equipements */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <p className="text-xs font-medium text-slate-400 mb-3">Equipements recommandes</p>
                <div className="space-y-2">
                  {budget.items.map((item) => (
                    <div
                      key={item.equipement.id}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl border ${
                        item.dejaAcquis ? "bg-emerald-50 border-emerald-200" : "border-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.equipement.emoji}</span>
                        <div>
                          <p className={`text-sm font-medium ${item.dejaAcquis ? "text-emerald-700" : "text-slate-700"}`}>
                            {item.equipement.nom}
                          </p>
                          <p className="text-xs text-slate-400">
                            {item.equipement.prixMin}-{item.equipement.prixMax} EUR
                            {item.equipement.parPersonne ? " /pers" : ""}
                          </p>
                        </div>
                      </div>
                      <span className={`text-sm font-bold ${item.dejaAcquis ? "text-emerald-600" : "text-slate-600"}`}>
                        {item.dejaAcquis ? "✓ Acquis" : `${fmt(item.prixEstime)} EUR`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
            Estimation indicative basee sur des scenarios de coupure moyenne. Les durees reelles
            dependent de la saison, de l&apos;isolation du logement et du stock de consommables.
          </div>
        </div>
      </div>
    </div>
  );
}
