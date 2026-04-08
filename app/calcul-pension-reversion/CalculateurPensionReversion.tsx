"use client";
import { useState, useMemo } from "react";

function fmt(n: number): string { return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }); }

export default function CalculateurPensionReversion() {
  const [pensionDefunt, setPensionDefunt] = useState<string>("1500");
  const [revenusConjoint, setRevenusConjoint] = useState<string>("1000");
  const [regime, setRegime] = useState<"general" | "complementaire">("general");
  const [age, setAge] = useState<string>("55");

  const resultat = useMemo(() => {
    const pension = parseFloat(pensionDefunt.replace(",", "."));
    const revenus = parseFloat(revenusConjoint.replace(",", "."));
    const a = parseInt(age);
    if (isNaN(pension) || isNaN(revenus) || isNaN(a) || pension <= 0) return null;

    // Regime general : 54% de la pension du defunt
    const tauxGeneral = 0.54;
    // Regime complementaire AGIRC-ARRCO : 60%
    const tauxComplementaire = 0.60;

    const taux = regime === "general" ? tauxGeneral : tauxComplementaire;
    const pensionReversion = pension * taux;

    // Plafond de ressources 2026 (regime general) : ~23 441€/an pour une personne seule
    const plafondAnnuel = 23441;
    const plafondMensuel = plafondAnnuel / 12;
    const revenuTotal = revenus + pensionReversion;
    const depassement = Math.max(0, revenuTotal - plafondMensuel);

    // Si depassement, la pension est reduite
    const pensionEffective = regime === "general" ? Math.max(0, pensionReversion - depassement) : pensionReversion;

    // Minimum : 314,72€/mois (si 60 trimestres cotises)
    const minimum = 314.72;

    // Age minimum : 55 ans regime general, pas de condition age AGIRC-ARRCO si marié
    const ageMinimum = regime === "general" ? 55 : 55;
    const eligible = a >= ageMinimum;

    return {
      pensionBrute: pensionReversion,
      pensionEffective: eligible ? pensionEffective : 0,
      taux: taux * 100,
      plafondMensuel,
      revenuTotal,
      depassement,
      eligible,
      ageMinimum,
      minimum,
    };
  }, [pensionDefunt, revenusConjoint, regime, age]);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Pension mensuelle du defunt (&euro;)</label>
          <input type="text" inputMode="decimal" value={pensionDefunt} onChange={(e) => setPensionDefunt(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all" />
          <div className="flex flex-wrap gap-2 mt-2">
            {[800, 1000, 1200, 1500, 1800, 2000, 2500, 3000].map((p) => (
              <button key={p} onClick={() => setPensionDefunt(String(p))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 transition-all">{fmt(p)} &euro;</button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Vos revenus mensuels (&euro;)</label>
          <input type="text" inputMode="decimal" value={revenusConjoint} onChange={(e) => setRevenusConjoint(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Votre age</label>
          <input type="text" inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Regime</label>
          <div className="flex gap-2">
            {[
              { v: "general" as const, l: "Regime general (54%)" },
              { v: "complementaire" as const, l: "AGIRC-ARRCO (60%)" },
            ].map((r) => (
              <button key={r.v} onClick={() => setRegime(r.v)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${regime === r.v ? "bg-violet-500 text-white" : "border border-slate-200 text-slate-600"}`}>{r.l}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {resultat ? (
          <>
            <div className={`rounded-2xl p-6 shadow-lg text-white ${resultat.eligible ? "bg-gradient-to-br from-violet-500 to-purple-600 shadow-violet-200/50" : "bg-gradient-to-br from-slate-500 to-slate-700 shadow-slate-200/50"}`}>
              <p className="text-sm opacity-80 mb-1">Pension de reversion estimee</p>
              <p className="text-4xl font-extrabold tracking-tight">{resultat.eligible ? `${fmt(resultat.pensionEffective)} \u20ac` : "Non eligible"}<span className="text-xl font-semibold">{resultat.eligible ? "/mois" : ""}</span></p>
              {!resultat.eligible && <p className="text-sm opacity-70 mt-1">Age minimum : {resultat.ageMinimum} ans</p>}
            </div>
            {resultat.eligible && (
              <>
                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                  <p className="text-xs text-slate-400 mb-2">Detail</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span className="text-slate-600">Pension du defunt</span><span className="font-bold">{fmt(parseFloat(pensionDefunt))} &euro;</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Taux ({resultat.taux}%)</span><span className="font-bold">{fmt(resultat.pensionBrute)} &euro;</span></div>
                    {resultat.depassement > 0 && (
                      <div className="flex justify-between"><span className="text-slate-600">Reduction (plafond)</span><span className="font-bold text-red-500">-{fmt(resultat.depassement)} &euro;</span></div>
                    )}
                    <div className="flex justify-between border-t pt-1"><span className="text-slate-700 font-semibold">Pension effective</span><span className="font-bold text-violet-600">{fmt(resultat.pensionEffective)} &euro;/mois</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Annuel</span><span className="font-bold">{fmt(resultat.pensionEffective * 12)} &euro;</span></div>
                  </div>
                </div>
                {resultat.depassement > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                    <p className="text-sm font-semibold text-amber-700">Plafond de ressources depasse</p>
                    <p className="text-xs text-slate-500 mt-1">Vos revenus + pension ({fmt(resultat.revenuTotal)} &euro;) depassent le plafond ({fmt(resultat.plafondMensuel)} &euro;/mois). La pension est reduite.</p>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-6 text-center"><p className="text-slate-400 text-sm">Remplissez les champs</p></div>
        )}
        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-xs font-medium text-slate-400 mb-2">Conditions 2026</p>
          <div className="space-y-1 text-sm text-slate-600">
            <p>Age minimum : 55 ans</p>
            <p>Regime general : 54% de la pension</p>
            <p>AGIRC-ARRCO : 60% de la pension</p>
            <p>Plafond ressources : {fmt(23441)} &euro;/an</p>
            <p>Minimum : 314,72 &euro;/mois</p>
          </div>
        </div>
      </div>
    </div>
  );
}
