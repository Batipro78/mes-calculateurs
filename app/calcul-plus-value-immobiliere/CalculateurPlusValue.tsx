"use client";
import { useState, useMemo } from "react";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
function fmtP(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

// Abattement pour duree de detention (impot sur le revenu)
function abattementIR(annees: number): number {
  if (annees < 6) return 0;
  if (annees <= 21) return (annees - 5) * 6; // 6% par an de la 6e a la 21e
  if (annees === 22) return 96 + 4; // 4% la 22e annee = 100%
  return 100;
}

// Abattement pour duree de detention (prelevements sociaux)
function abattementPS(annees: number): number {
  if (annees < 6) return 0;
  if (annees <= 21) return (annees - 5) * 1.65; // 1.65% par an de la 6e a la 21e
  if (annees === 22) return 26.40 + 1.60; // 1.60% la 22e annee
  if (annees <= 30) return 28 + (annees - 22) * 9; // 9% par an de la 23e a la 30e
  return 100;
}

export default function CalculateurPlusValue() {
  const [prixAchat, setPrixAchat] = useState<string>("200000");
  const [prixVente, setPrixVente] = useState<string>("300000");
  const [fraisAchat, setFraisAchat] = useState<string>("forfait");
  const [fraisAchatMontant, setFraisAchatMontant] = useState<string>("15000");
  const [travaux, setTravaux] = useState<string>("forfait");
  const [travauxMontant, setTravauxMontant] = useState<string>("0");
  const [anneesDetention, setAnneesDetention] = useState<string>("8");
  const [residencePrincipale, setResidencePrincipale] = useState<boolean>(false);

  const resultat = useMemo(() => {
    const achat = parseFloat(prixAchat.replace(",", "."));
    const vente = parseFloat(prixVente.replace(",", "."));
    const annees = parseInt(anneesDetention);
    if (isNaN(achat) || isNaN(vente) || isNaN(annees) || achat <= 0 || vente <= 0) return null;

    // Frais d'acquisition
    let frais: number;
    if (fraisAchat === "forfait") {
      frais = achat * 0.075; // forfait 7.5%
    } else {
      frais = parseFloat(fraisAchatMontant.replace(",", ".")) || 0;
    }

    // Travaux
    let travauxVal: number;
    if (travaux === "forfait" && annees >= 5) {
      travauxVal = achat * 0.15; // forfait 15% apres 5 ans
    } else if (travaux === "reel") {
      travauxVal = parseFloat(travauxMontant.replace(",", ".")) || 0;
    } else {
      travauxVal = 0;
    }

    const prixAchatCorrige = achat + frais + travauxVal;
    const plusValueBrute = vente - prixAchatCorrige;

    if (plusValueBrute <= 0 || residencePrincipale) {
      return {
        plusValueBrute: Math.max(0, plusValueBrute),
        abattIR: 0,
        abattPS: 0,
        plusValueIR: 0,
        plusValuePS: 0,
        impotIR: 0,
        impotPS: 0,
        surtaxe: 0,
        impotTotal: 0,
        netVendeur: vente,
        prixAchatCorrige,
        frais,
        travauxVal,
        exonere: true,
      };
    }

    const abIR = abattementIR(annees);
    const abPS = abattementPS(annees);

    const pvImposableIR = plusValueBrute * (1 - abIR / 100);
    const pvImposablePS = plusValueBrute * (1 - abPS / 100);

    const ir = pvImposableIR * 0.19; // 19% flat
    const ps = pvImposablePS * 0.172; // 17.2% prelevements sociaux
    const surtaxe = pvImposableIR > 50000 ? pvImposableIR * 0.06 : 0; // surtaxe si > 50K
    const total = ir + ps + surtaxe;

    return {
      plusValueBrute,
      abattIR: abIR,
      abattPS: abPS,
      plusValueIR: pvImposableIR,
      plusValuePS: pvImposablePS,
      impotIR: ir,
      impotPS: ps,
      surtaxe,
      impotTotal: total,
      netVendeur: vente - total,
      prixAchatCorrige,
      frais,
      travauxVal,
      exonere: false,
    };
  }, [prixAchat, prixVente, fraisAchat, fraisAchatMontant, travaux, travauxMontant, anneesDetention, residencePrincipale]);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Prix d&apos;achat (&euro;)</label>
            <input type="text" inputMode="decimal" value={prixAchat} onChange={(e) => setPrixAchat(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Prix de vente (&euro;)</label>
            <input type="text" inputMode="decimal" value={prixVente} onChange={(e) => setPrixVente(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Frais d&apos;acquisition</label>
          <div className="flex gap-2">
            {[
              { v: "forfait", label: "Forfait 7,5%" },
              { v: "reel", label: "Frais reels" },
            ].map((o) => (
              <button key={o.v} onClick={() => setFraisAchat(o.v)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${fraisAchat === o.v ? "bg-green-500 text-white shadow-sm" : "border border-slate-200 text-slate-600 hover:border-green-300"}`}>
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Travaux</label>
          <div className="flex gap-2">
            {[
              { v: "forfait", label: "Forfait 15%" },
              { v: "reel", label: "Montant reel" },
              { v: "aucun", label: "Aucun" },
            ].map((o) => (
              <button key={o.v} onClick={() => setTravaux(o.v)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${travaux === o.v ? "bg-green-500 text-white shadow-sm" : "border border-slate-200 text-slate-600 hover:border-green-300"}`}>
                {o.label}
              </button>
            ))}
          </div>
          {travaux === "reel" && (
            <input type="text" inputMode="decimal" value={travauxMontant} onChange={(e) => setTravauxMontant(e.target.value)} placeholder="Montant travaux"
              className="w-full mt-2 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Duree de detention (annees)</label>
          <input type="text" inputMode="numeric" value={anneesDetention} onChange={(e) => setAnneesDetention(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" />
          <div className="flex flex-wrap gap-2 mt-2">
            {[2, 5, 8, 10, 15, 20, 22, 25, 30].map((a) => (
              <button key={a} onClick={() => setAnneesDetention(String(a))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-green-300 hover:text-green-600 hover:bg-green-50/50 transition-all">
                {a} ans
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={residencePrincipale} onChange={(e) => setResidencePrincipale(e.target.checked)}
            className="w-5 h-5 rounded border-slate-300 text-green-500 focus:ring-green-500" />
          <span className="text-sm font-medium text-slate-700">Residence principale (exoneree)</span>
        </label>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {resultat ? (
          <>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-lg shadow-green-200/50">
              {resultat.exonere ? (
                <>
                  <p className="text-green-200 text-sm mb-1">Plus-value</p>
                  <p className="text-3xl font-extrabold">{residencePrincipale ? "Exoneree" : "Aucune"}</p>
                  <p className="text-green-200 text-sm mt-1">Impot : 0 &euro;</p>
                </>
              ) : (
                <>
                  <p className="text-green-200 text-sm mb-1">Impot total a payer</p>
                  <p className="text-4xl font-extrabold tracking-tight">{fmt(resultat.impotTotal)} &euro;</p>
                  <div className="h-px bg-white/20 my-3" />
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-green-200">Plus-value brute</p>
                      <p className="font-semibold">{fmt(resultat.plusValueBrute)} &euro;</p>
                    </div>
                    <div>
                      <p className="text-green-200">Net vendeur</p>
                      <p className="font-semibold">{fmt(resultat.netVendeur)} &euro;</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {!resultat.exonere && (
              <>
                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                  <p className="text-xs text-slate-400 mb-2">Detail imposition</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">IR (19%)</span>
                      <span className="font-bold text-slate-800">{fmt(resultat.impotIR)} &euro;</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">PS (17,2%)</span>
                      <span className="font-bold text-slate-800">{fmt(resultat.impotPS)} &euro;</span>
                    </div>
                    {resultat.surtaxe > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Surtaxe</span>
                        <span className="font-bold text-red-500">{fmt(resultat.surtaxe)} &euro;</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                  <p className="text-xs text-slate-400 mb-2">Abattements ({anneesDetention} ans)</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Abattement IR</span>
                      <span className="font-bold text-green-600">{fmtP(resultat.abattIR)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Abattement PS</span>
                      <span className="font-bold text-green-600">{fmtP(resultat.abattPS)}%</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-xs font-medium text-slate-400 mb-2">Prix d&apos;achat corrige</p>
              <p className="text-sm text-slate-600">{fmt(resultat.prixAchatCorrige)} &euro;</p>
              <p className="text-xs text-slate-400 mt-1">(achat + frais {fmt(resultat.frais)} &euro; + travaux {fmt(resultat.travauxVal)} &euro;)</p>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-6 text-center">
            <p className="text-slate-400 text-sm">Remplissez les champs pour voir le resultat</p>
          </div>
        )}
      </div>
    </div>
  );
}
