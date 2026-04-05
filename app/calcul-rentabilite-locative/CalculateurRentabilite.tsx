"use client";
import { useState, useMemo } from "react";

function fmt(n: number): string { return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function fmtInt(n: number): string { return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }); }

export default function CalculateurRentabilite() {
  const [prixAchat, setPrixAchat] = useState<string>("200000");
  const [fraisNotaire, setFraisNotaire] = useState<string>("16000");
  const [travaux, setTravaux] = useState<string>("0");
  const [loyerMensuel, setLoyerMensuel] = useState<string>("800");
  const [chargesAnnuelles, setChargesAnnuelles] = useState<string>("1200");
  const [taxeFonciere, setTaxeFonciere] = useState<string>("1000");
  const [vacanceLocative, setVacanceLocative] = useState<string>("5");

  const resultat = useMemo(() => {
    const achat = parseFloat(prixAchat.replace(",", "."));
    const notaire = parseFloat(fraisNotaire.replace(",", "."));
    const trav = parseFloat(travaux.replace(",", ".")) || 0;
    const loyer = parseFloat(loyerMensuel.replace(",", "."));
    const charges = parseFloat(chargesAnnuelles.replace(",", ".")) || 0;
    const taxe = parseFloat(taxeFonciere.replace(",", ".")) || 0;
    const vacance = parseFloat(vacanceLocative.replace(",", ".")) || 0;
    if (isNaN(achat) || isNaN(notaire) || isNaN(loyer) || achat <= 0 || loyer <= 0) return null;

    const investTotal = achat + notaire + trav;
    const loyerAnnuelBrut = loyer * 12;
    const loyerAnnuelVacance = loyerAnnuelBrut * (1 - vacance / 100);
    const chargesTotal = charges + taxe;
    const loyerAnnuelNet = loyerAnnuelVacance - chargesTotal;

    const rentaBrute = (loyerAnnuelBrut / investTotal) * 100;
    const rentaNette = (loyerAnnuelNet / investTotal) * 100;

    // Cash-flow mensuel (sans credit)
    const cashFlowMensuel = loyerAnnuelNet / 12;

    // Rendement Brut prix d'achat seul
    const rentaBrutePrixSeul = (loyerAnnuelBrut / achat) * 100;

    return {
      investTotal,
      loyerAnnuelBrut,
      loyerAnnuelNet,
      rentaBrute,
      rentaNette,
      rentaBrutePrixSeul,
      cashFlowMensuel,
      chargesTotal,
    };
  }, [prixAchat, fraisNotaire, travaux, loyerMensuel, chargesAnnuelles, taxeFonciere, vacanceLocative]);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Prix d&apos;achat (&euro;)</label>
            <input type="text" inputMode="decimal" value={prixAchat} onChange={(e) => setPrixAchat(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Frais de notaire (&euro;)</label>
            <input type="text" inputMode="decimal" value={fraisNotaire} onChange={(e) => setFraisNotaire(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Travaux (&euro;)</label>
            <input type="text" inputMode="decimal" value={travaux} onChange={(e) => setTravaux(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Loyer mensuel (&euro;)</label>
            <input type="text" inputMode="decimal" value={loyerMensuel} onChange={(e) => setLoyerMensuel(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Charges/an (&euro;)</label>
            <input type="text" inputMode="decimal" value={chargesAnnuelles} onChange={(e) => setChargesAnnuelles(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Taxe fonciere (&euro;)</label>
            <input type="text" inputMode="decimal" value={taxeFonciere} onChange={(e) => setTaxeFonciere(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Vacance (%)</label>
            <input type="text" inputMode="decimal" value={vacanceLocative} onChange={(e) => setVacanceLocative(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[500, 600, 700, 800, 900, 1000, 1200, 1500].map((l) => (
            <button key={l} onClick={() => setLoyerMensuel(String(l))}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50/50 transition-all">
              {l} &euro;/mois
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {resultat ? (
          <>
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg shadow-amber-200/50">
              <p className="text-amber-200 text-sm mb-1">Rentabilite nette</p>
              <p className="text-4xl font-extrabold tracking-tight">
                {fmt(resultat.rentaNette)} <span className="text-xl font-semibold">%</span>
              </p>
              <div className="h-px bg-white/20 my-3" />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-amber-200">Rentabilite brute</p>
                  <p className="font-semibold text-lg">{fmt(resultat.rentaBrute)}%</p>
                </div>
                <div>
                  <p className="text-amber-200">Cash-flow/mois</p>
                  <p className="font-semibold text-lg">{fmtInt(resultat.cashFlowMensuel)} &euro;</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-2">Detail revenus</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">Loyer brut/an</span><span className="font-bold">{fmtInt(resultat.loyerAnnuelBrut)} &euro;</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Charges + taxe</span><span className="font-bold text-red-500">-{fmtInt(resultat.chargesTotal)} &euro;</span></div>
                <div className="flex justify-between border-t pt-2"><span className="text-slate-700 font-semibold">Loyer net/an</span><span className="font-bold text-amber-600">{fmtInt(resultat.loyerAnnuelNet)} &euro;</span></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-2">Investissement total</p>
              <p className="text-xl font-bold text-slate-800">{fmtInt(resultat.investTotal)} &euro;</p>
            </div>

            <div className={`rounded-2xl p-4 ${resultat.rentaNette >= 5 ? "bg-green-50 border border-green-200" : resultat.rentaNette >= 3 ? "bg-amber-50 border border-amber-200" : "bg-red-50 border border-red-200"}`}>
              <p className="text-sm font-semibold">{resultat.rentaNette >= 7 ? "Excellente rentabilite" : resultat.rentaNette >= 5 ? "Bonne rentabilite" : resultat.rentaNette >= 3 ? "Rentabilite moyenne" : "Rentabilite faible"}</p>
              <p className="text-xs text-slate-500 mt-1">{resultat.rentaNette >= 5 ? "Au-dessus de la moyenne nationale (~3-5%)" : resultat.rentaNette >= 3 ? "Dans la moyenne nationale" : "En dessous de la moyenne — verifier les charges"}</p>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-6 text-center"><p className="text-slate-400 text-sm">Remplissez les champs</p></div>
        )}
      </div>
    </div>
  );
}
