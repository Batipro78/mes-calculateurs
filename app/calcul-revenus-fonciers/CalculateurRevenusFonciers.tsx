"use client";
import { useState, useMemo } from "react";
import { calcRevenusFonciers } from "./revenusFonciersCalc";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
function fmtP(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

const TMI_BRACKETS = [0, 11, 30, 41, 45] as const;

export default function CalculateurRevenusFonciers() {
  const [loyersAnnuels, setLoyersAnnuels] = useState<string>("12000");
  const [charges, setCharges] = useState<string>("2000");
  const [interetsEmprunt, setInteretsEmprunt] = useState<string>("3000");
  const [travauxDeductibles, setTravauxDeductibles] = useState<string>("0");
  const [regime, setRegime] = useState<"micro" | "reel">("micro");
  const [tmi, setTmi] = useState<number>(30);

  const resultat = useMemo(() => {
    const loyers = parseFloat(loyersAnnuels.replace(",", ".")) || 0;
    const ch = parseFloat(charges.replace(",", ".")) || 0;
    const inter = parseFloat(interetsEmprunt.replace(",", ".")) || 0;
    const travaux = parseFloat(travauxDeductibles.replace(",", ".")) || 0;
    if (loyers <= 0) return null;
    return calcRevenusFonciers(loyers, ch, inter, travaux, regime, tmi);
  }, [loyersAnnuels, charges, interetsEmprunt, travauxDeductibles, regime, tmi]);

  const loyers = parseFloat(loyersAnnuels.replace(",", ".")) || 0;
  const isMicroEligible = loyers < 15000;

  // Bar chart max
  const microTotal = resultat?.comparaison.micro.totalImposition ?? 0;
  const reelTotal = resultat?.comparaison.reel.totalImposition ?? 0;
  const barMax = Math.max(microTotal, reelTotal, 1);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Loyers */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Loyers annuels perçus (&euro;)
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={loyersAnnuels}
            onChange={(e) => setLoyersAnnuels(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {[6000, 8000, 10000, 12000, 15000, 18000, 24000].map((v) => (
              <button
                key={v}
                onClick={() => setLoyersAnnuels(String(v))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all"
              >
                {fmt(v)} &euro;
              </button>
            ))}
          </div>
          {!isMicroEligible && (
            <p className="mt-2 text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
              Loyers &ge; 15 000 &euro; : le micro-foncier n&apos;est pas disponible, seul le regime reel s&apos;applique.
            </p>
          )}
        </div>

        {/* Regime */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Regime fiscal
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setRegime("micro")}
              disabled={!isMicroEligible}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                regime === "micro"
                  ? "bg-indigo-500 text-white shadow-sm"
                  : isMicroEligible
                  ? "border border-slate-200 text-slate-600 hover:border-indigo-300"
                  : "border border-slate-200 text-slate-300 cursor-not-allowed"
              }`}
            >
              Micro-foncier
              <span className="block text-xs opacity-75 font-normal">Abattement 30%</span>
            </button>
            <button
              onClick={() => setRegime("reel")}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                regime === "reel"
                  ? "bg-indigo-500 text-white shadow-sm"
                  : "border border-slate-200 text-slate-600 hover:border-indigo-300"
              }`}
            >
              Regime reel
              <span className="block text-xs opacity-75 font-normal">Charges reelles</span>
            </button>
          </div>
        </div>

        {/* Charges (regime reel) */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Charges deductibles (&euro;)
            <span className="text-xs font-normal text-slate-400 ml-2">assurance, taxe fonciere, gestion...</span>
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={charges}
            onChange={(e) => setCharges(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-base font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Interets emprunt (&euro;)
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={interetsEmprunt}
              onChange={(e) => setInteretsEmprunt(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-base font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Travaux deductibles (&euro;)
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={travauxDeductibles}
              onChange={(e) => setTravauxDeductibles(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-base font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* TMI */}
        <div className="mb-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Tranche marginale d&apos;imposition (TMI)
          </label>
          <div className="flex gap-2">
            {TMI_BRACKETS.map((t) => (
              <button
                key={t}
                onClick={() => setTmi(t)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  tmi === t
                    ? "bg-indigo-500 text-white shadow-sm"
                    : "border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {t}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-2 space-y-4">
        {resultat ? (
          <>
            {/* Carte principale */}
            <div className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-2xl p-6 shadow-lg shadow-indigo-200/50">
              <p className="text-indigo-200 text-sm mb-1">
                Imposition totale — regime {regime === "micro" ? "micro-foncier" : "reel"}
              </p>
              <p className="text-4xl font-extrabold tracking-tight">
                {fmt(resultat.totalImposition)} <span className="text-2xl font-semibold">&euro;</span>
              </p>
              <div className="h-px bg-white/20 my-3" />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-indigo-200">Revenu imposable</p>
                  <p className="font-semibold">{fmt(resultat.revenuImposable)} &euro;</p>
                </div>
                <div>
                  <p className="text-indigo-200">Rendement net</p>
                  <p className="font-semibold">{fmtP(resultat.rendementNet)}%</p>
                </div>
              </div>
            </div>

            {/* Alerte deficit foncier */}
            {resultat.deficitFoncier !== undefined && resultat.deficitFoncier > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-amber-800 mb-1">Deficit foncier detecte</p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  Vous pouvez imputer <strong>{fmt(resultat.deficitFoncier)} &euro;</strong> sur votre revenu global
                  (plafond 10 700 &euro;/an). Le surplus est reportable sur les revenus fonciers des 10 annees suivantes.
                </p>
              </div>
            )}

            {/* Detail imposition */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 font-medium mb-3">Detail de l&apos;imposition</p>
              <div className="space-y-2.5 text-sm">
                {regime === "micro" ? (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Abattement forfaitaire 30%</span>
                    <span className="font-bold text-green-600">-{fmt(resultat.abattement ?? 0)} &euro;</span>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Charges deductibles totales</span>
                    <span className="font-bold text-green-600">-{fmt(resultat.chargesDeductibles ?? 0)} &euro;</span>
                  </div>
                )}
                <div className="h-px bg-slate-100" />
                <div className="flex justify-between">
                  <span className="text-slate-600">Impot sur le revenu (TMI {tmi}%)</span>
                  <span className="font-bold text-slate-800">{fmt(resultat.impotRevenu)} &euro;</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Prelevements sociaux (17,2%)</span>
                  <span className="font-bold text-slate-800">{fmt(resultat.prelevementsSociaux)} &euro;</span>
                </div>
                <div className="h-px bg-slate-100" />
                <div className="flex justify-between text-base">
                  <span className="font-semibold text-slate-800">Total imposition</span>
                  <span className="font-extrabold text-indigo-600">{fmt(resultat.totalImposition)} &euro;</span>
                </div>
              </div>
            </div>

            {/* Comparaison micro vs reel */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 font-medium mb-3">Comparaison micro vs reel</p>

              {/* Meilleur regime badge */}
              <div className={`rounded-xl px-3 py-2 mb-4 text-sm font-semibold ${
                resultat.comparaison.meilleurRegime === "reel"
                  ? "bg-indigo-50 text-indigo-700"
                  : "bg-emerald-50 text-emerald-700"
              }`}>
                Le regime {resultat.comparaison.meilleurRegime === "reel" ? "reel" : "micro-foncier"} est plus avantageux
                — economie de {fmt(resultat.comparaison.economie)} &euro;/an
              </div>

              {/* Barres */}
              <div className="space-y-3">
                {/* Micro */}
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span className="font-medium">Micro-foncier {!isMicroEligible ? "(non eligible)" : ""}</span>
                    <span className="font-bold text-slate-700">{fmt(microTotal)} &euro;</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${(microTotal / barMax) * 100}%` }}
                    />
                  </div>
                </div>
                {/* Reel */}
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span className="font-medium">Regime reel</span>
                    <span className="font-bold text-slate-700">{fmt(reelTotal)} &euro;</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-400 rounded-full transition-all duration-500"
                      style={{ width: `${(reelTotal / barMax) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Mini table */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="text-slate-400" />
                <div className="font-semibold text-slate-500">Micro</div>
                <div className="font-semibold text-slate-500">Reel</div>

                <div className="text-left text-slate-500">Revenu imposable</div>
                <div className="font-medium text-slate-700">{fmt(resultat.comparaison.micro.revenuImposable)} &euro;</div>
                <div className="font-medium text-slate-700">{fmt(resultat.comparaison.reel.revenuImposable)} &euro;</div>

                <div className="text-left text-slate-500">IR</div>
                <div className="font-medium text-slate-700">{fmt(resultat.comparaison.micro.impotRevenu)} &euro;</div>
                <div className="font-medium text-slate-700">{fmt(resultat.comparaison.reel.impotRevenu)} &euro;</div>

                <div className="text-left text-slate-500">PS</div>
                <div className="font-medium text-slate-700">{fmt(resultat.comparaison.micro.prelevementsSociaux)} &euro;</div>
                <div className="font-medium text-slate-700">{fmt(resultat.comparaison.reel.prelevementsSociaux)} &euro;</div>

                <div className="text-left font-semibold text-slate-600">Total</div>
                <div className={`font-bold ${resultat.comparaison.meilleurRegime === "micro" ? "text-emerald-600" : "text-slate-700"}`}>
                  {fmt(microTotal)} &euro;
                </div>
                <div className={`font-bold ${resultat.comparaison.meilleurRegime === "reel" ? "text-indigo-600" : "text-slate-700"}`}>
                  {fmt(reelTotal)} &euro;
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-8 text-center">
            <p className="text-slate-400 text-sm">Remplissez les champs pour voir le resultat</p>
          </div>
        )}
      </div>
    </div>
  );
}
