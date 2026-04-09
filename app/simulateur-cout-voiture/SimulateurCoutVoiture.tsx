"use client";
import { useState, useMemo } from "react";
import { calcCoutVoiture, PRESETS_VEHICULES } from "./coutVoitureCalc";

function fmt(n: number, dec = 0): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });
}

function fmtEuro(n: number, dec = 0): string {
  return fmt(n, dec) + " €";
}

export default function SimulateurCoutVoiture() {
  const [presetIdx, setPresetIdx] = useState<number>(0);
  const [prixAchat, setPrixAchat] = useState<string>("18000");
  const [kmAnnuels, setKmAnnuels] = useState<string>("15000");
  const [consommation, setConsommation] = useState<string>("5.5");
  const [prixCarburant, setPrixCarburant] = useState<string>("1.85");
  const [assuranceAnnuelle, setAssuranceAnnuelle] = useState<string>("600");
  const [entretienAnnuel, setEntretienAnnuel] = useState<string>("500");
  const [dureeDetention, setDureeDetention] = useState<string>("5");

  function applyPreset(idx: number) {
    const p = PRESETS_VEHICULES[idx];
    setPresetIdx(idx);
    setPrixAchat(String(p.prixAchat));
    setConsommation(String(p.consommation));
    setAssuranceAnnuelle(String(p.assuranceAnnuelle));
    setEntretienAnnuel(String(p.entretienAnnuel));
    // prix carburant: electrique => 1 (cout direct €/100km), thermique => 1.85
    if (idx === 3) {
      setPrixCarburant("1");
    } else {
      setPrixCarburant("1.85");
    }
  }

  const result = useMemo(() => {
    const pa = parseFloat(prixAchat);
    const km = parseFloat(kmAnnuels);
    const conso = parseFloat(consommation);
    const pc = parseFloat(prixCarburant);
    const ass = parseFloat(assuranceAnnuelle);
    const ent = parseFloat(entretienAnnuel);
    const dur = parseInt(dureeDetention);
    if (
      isNaN(pa) || isNaN(km) || isNaN(conso) || isNaN(pc) ||
      isNaN(ass) || isNaN(ent) || isNaN(dur) ||
      pa <= 0 || km <= 0 || conso <= 0 || pc <= 0 || ass <= 0 || ent <= 0 || dur <= 0
    ) return null;
    return calcCoutVoiture(pa, km, conso, pc, ass, ent, dur);
  }, [prixAchat, kmAnnuels, consommation, prixCarburant, assuranceAnnuelle, entretienAnnuel, dureeDetention]);

  // Year-by-year table
  const yearByYear = useMemo(() => {
    const pa = parseFloat(prixAchat);
    const km = parseFloat(kmAnnuels);
    const conso = parseFloat(consommation);
    const pc = parseFloat(prixCarburant);
    const ass = parseFloat(assuranceAnnuelle);
    const ent = parseFloat(entretienAnnuel);
    const dur = parseInt(dureeDetention);
    if (
      isNaN(pa) || isNaN(km) || isNaN(conso) || isNaN(pc) ||
      isNaN(ass) || isNaN(ent) || isNaN(dur) ||
      pa <= 0 || km <= 0 || conso <= 0 || pc <= 0 || ass <= 0 || ent <= 0 || dur <= 0
    ) return [];
    const rows = [];
    let cumulatif = pa; // on part avec le prix d'achat
    for (let annee = 1; annee <= dur; annee++) {
      const carb = (km / 100) * conso * pc;
      const assAn = ass;
      const entAn = annee <= 3 ? ent : ent * Math.pow(1.1, annee - 3);
      const ct = annee % 2 === 0 ? 80 : 0;
      const valeurAuto = pa * Math.pow(0.85, annee);
      const coutAnnee = carb + assAn + entAn + ct;
      cumulatif += coutAnnee;
      rows.push({
        annee,
        carb,
        assAn,
        entAn,
        ct,
        coutAnnee,
        cumulatif: cumulatif - valeurAuto,
        valeurAuto,
      });
    }
    return rows;
  }, [prixAchat, kmAnnuels, consommation, prixCarburant, assuranceAnnuelle, entretienAnnuel, dureeDetention]);

  const isElectrique = presetIdx === 3;

  // Donut colors
  const donutColors = ["#3b82f6", "#f97316", "#10b981", "#8b5cf6", "#64748b"];
  const donutLabels = ["Depreciation", "Carburant", "Assurance", "Entretien", "CT"];

  function buildConicGradient(repartition: typeof result extends null ? never : NonNullable<typeof result>["repartition"]): string {
    const parts = [
      repartition.achat,
      repartition.carburant,
      repartition.assurance,
      repartition.entretien,
      repartition.ct,
    ];
    let cumul = 0;
    const segments: string[] = [];
    parts.forEach((pct, i) => {
      const start = cumul;
      const end = cumul + pct;
      segments.push(`${donutColors[i]} ${start.toFixed(1)}% ${end.toFixed(1)}%`);
      cumul = end;
    });
    return `conic-gradient(${segments.join(", ")})`;
  }

  return (
    <div className="space-y-8">
      {/* Preset cards */}
      <div>
        <p className="text-sm font-semibold text-slate-700 mb-3">Choisir un type de vehicule</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {PRESETS_VEHICULES.map((p, i) => (
            <button
              key={i}
              onClick={() => applyPreset(i)}
              className={`rounded-xl border p-3 text-center transition-all ${
                presetIdx === i
                  ? "border-blue-500 bg-blue-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-blue-300"
              }`}
            >
              <div className="text-2xl mb-1">{p.emoji}</div>
              <div className={`text-xs font-semibold leading-tight ${presetIdx === i ? "text-blue-700" : "text-slate-700"}`}>
                {p.nom}
              </div>
              <div className={`text-xs mt-1 ${presetIdx === i ? "text-blue-500" : "text-slate-400"}`}>
                {fmt(p.prixAchat)} €
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Inputs */}
        <div className="lg:col-span-3 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4">Parametres du vehicule</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Prix d&apos;achat (€)</label>
                <input
                  type="text" inputMode="numeric" value={prixAchat}
                  onChange={(e) => setPrixAchat(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-base font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Km annuels</label>
                <input
                  type="text" inputMode="numeric" value={kmAnnuels}
                  onChange={(e) => setKmAnnuels(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-base font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[5000, 10000, 15000, 20000, 25000].map((km) => (
                    <button key={km} onClick={() => setKmAnnuels(String(km))}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-all">
                      {fmt(km)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {isElectrique ? "Cout energie (€/100km)" : "Consommation (L/100km)"}
                </label>
                <input
                  type="text" inputMode="decimal" value={consommation}
                  onChange={(e) => setConsommation(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-base font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {isElectrique ? "Multiplicateur (laisser 1)" : "Prix carburant (€/L)"}
                </label>
                <input
                  type="text" inputMode="decimal" value={prixCarburant}
                  onChange={(e) => setPrixCarburant(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-base font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                {!isElectrique && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {[1.65, 1.75, 1.85, 1.95, 2.05].map((p) => (
                      <button key={p} onClick={() => setPrixCarburant(String(p))}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-all">
                        {p.toFixed(2)} €
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4">Charges annuelles</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Assurance (€/an)</label>
                <input
                  type="text" inputMode="numeric" value={assuranceAnnuelle}
                  onChange={(e) => setAssuranceAnnuelle(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-base font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Entretien (€/an)</label>
                <input
                  type="text" inputMode="numeric" value={entretienAnnuel}
                  onChange={(e) => setEntretienAnnuel(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-base font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                <p className="text-xs text-slate-400 mt-1">+10%/an apres 3 ans</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Duree de detention (ans)</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[3, 5, 7, 10].map((d) => (
                    <button key={d} onClick={() => setDureeDetention(String(d))}
                      className={`py-3 rounded-xl text-sm font-bold transition-all ${
                        dureeDetention === String(d)
                          ? "bg-blue-500 text-white shadow-sm"
                          : "border border-slate-200 text-slate-600 hover:border-blue-300"
                      }`}>
                      {d} ans
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {result ? (
            <>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg shadow-blue-200/50">
                <p className="text-blue-200 text-sm mb-1">Cout total sur {dureeDetention} an{parseInt(dureeDetention) > 1 ? "s" : ""}</p>
                <p className="text-4xl font-extrabold tracking-tight">{fmt(result.coutTotal)} <span className="text-2xl font-semibold">€</span></p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-white/15 rounded-xl p-3">
                    <p className="text-blue-200 text-xs">Par mois</p>
                    <p className="text-xl font-bold">{fmt(result.coutMensuel)} €</p>
                  </div>
                  <div className="bg-white/15 rounded-xl p-3">
                    <p className="text-blue-200 text-xs">Par kilometre</p>
                    <p className="text-xl font-bold">{result.coutKilometre.toFixed(2)} €</p>
                  </div>
                </div>
              </div>

              {/* Donut chart */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h3 className="text-sm font-bold text-slate-700 mb-4">Repartition des couts</h3>
                <div className="flex items-center gap-5">
                  <div className="relative shrink-0">
                    <div
                      className="w-24 h-24 rounded-full"
                      style={{ background: buildConicGradient(result.repartition) }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-1.5 flex-1 min-w-0">
                    {[
                      { label: "Depreciation", pct: result.repartition.achat, val: result.decote },
                      { label: "Carburant", pct: result.repartition.carburant, val: result.carburantTotal },
                      { label: "Assurance", pct: result.repartition.assurance, val: result.assuranceTotal },
                      { label: "Entretien", pct: result.repartition.entretien, val: result.entretienTotal },
                      { label: "CT", pct: result.repartition.ct, val: result.controleTotal },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: donutColors[i] }} />
                        <span className="text-xs text-slate-600 flex-1 truncate">{item.label}</span>
                        <span className="text-xs font-semibold text-slate-700">{item.pct.toFixed(0)}%</span>
                        <span className="text-xs text-slate-400 hidden sm:block">{fmt(item.val)} €</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Breakdown cards */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h3 className="text-sm font-bold text-slate-700 mb-3">Detail des postes</h3>
                <div className="space-y-2">
                  {[
                    { label: "Prix d'achat", val: parseFloat(prixAchat), sub: `Revente estimee : ${fmt(result.valeurRevente)} €` },
                    { label: "Depreciation reelle", val: result.decote, sub: `${(parseFloat(prixAchat) > 0 ? (result.decote / parseFloat(prixAchat) * 100) : 0).toFixed(0)}% de la valeur perdue` },
                    { label: `Carburant (${dureeDetention} ans)`, val: result.carburantTotal, sub: `${fmt(result.carburantAnnuel)} €/an` },
                    { label: `Assurance (${dureeDetention} ans)`, val: result.assuranceTotal, sub: `${fmt(parseFloat(assuranceAnnuelle))} €/an` },
                    { label: `Entretien (${dureeDetention} ans)`, val: result.entretienTotal, sub: "+10%/an apres 3 ans" },
                    { label: "Controles techniques", val: result.controleTotal, sub: `${Math.floor(parseInt(dureeDetention) / 2)} CT a 80 €` },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-slate-700">{item.label}</p>
                        <p className="text-xs text-slate-400">{item.sub}</p>
                      </div>
                      <p className="text-sm font-bold text-slate-800">{fmtEuro(item.val)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-slate-50 rounded-2xl p-8 text-center">
              <p className="text-slate-400 text-sm">Remplissez les champs pour voir le cout total</p>
            </div>
          )}
        </div>
      </div>

      {/* Year-by-year table */}
      {yearByYear.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Evolution annuelle des couts</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-3 text-slate-500 font-medium">Annee</th>
                  <th className="text-right py-3 px-3 text-slate-500 font-medium">Carburant</th>
                  <th className="text-right py-3 px-3 text-slate-500 font-medium">Assurance</th>
                  <th className="text-right py-3 px-3 text-slate-500 font-medium">Entretien</th>
                  <th className="text-right py-3 px-3 text-slate-500 font-medium">CT</th>
                  <th className="text-right py-3 px-3 text-slate-500 font-medium">Total annee</th>
                  <th className="text-right py-3 px-3 text-slate-500 font-medium">Valeur auto</th>
                  <th className="text-right py-3 px-3 text-blue-600 font-semibold">Cout net cumule</th>
                </tr>
              </thead>
              <tbody>
                {yearByYear.map((row) => (
                  <tr key={row.annee} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-700">An {row.annee}</td>
                    <td className="py-2.5 px-3 text-right text-slate-600">{fmt(row.carb)} €</td>
                    <td className="py-2.5 px-3 text-right text-slate-600">{fmt(row.assAn)} €</td>
                    <td className="py-2.5 px-3 text-right text-slate-600">{fmt(row.entAn)} €</td>
                    <td className="py-2.5 px-3 text-right text-slate-600">{row.ct > 0 ? "80 €" : "-"}</td>
                    <td className="py-2.5 px-3 text-right font-semibold text-slate-700">{fmt(row.coutAnnee)} €</td>
                    <td className="py-2.5 px-3 text-right text-green-600">{fmt(row.valeurAuto)} €</td>
                    <td className="py-2.5 px-3 text-right font-bold text-blue-600">{fmt(row.cumulatif)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
