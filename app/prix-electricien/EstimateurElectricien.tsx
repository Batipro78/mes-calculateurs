"use client";

import { useState } from "react";
import { PRESTATIONS_ELECTRICIEN, REGIONS_ELECTRICIEN, calculerPrixElectricien, fmtPrix } from "./calcElectricien";

export default function EstimateurElectricien() {
  const [prestationId, setPrestationId] = useState<string | null>(null);
  const [quantite, setQuantite] = useState(5);
  const [regionId, setRegionId] = useState("province");

  const prestation = PRESTATIONS_ELECTRICIEN.find(p => p.id === prestationId);
  const resultat = prestationId ? calculerPrixElectricien(prestationId, quantite, regionId) : null;

  function selectPrestation(id: string) {
    const p = PRESTATIONS_ELECTRICIEN.find(pr => pr.id === id);
    setPrestationId(id);
    if (p) {
      if (p.unite === "forfait") setQuantite(1);
      else if (p.unite === "unite") setQuantite(5);
      else setQuantite(50);
    }
  }

  const sliderMax = prestation?.unite === "m2" ? 200 : prestation?.unite === "forfait" ? 1 : 20;

  return (
    <div className="space-y-6">
      {/* Etape 1 : Prestation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mr-2">1</span>
          Choisissez la prestation
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRESTATIONS_ELECTRICIEN.map(p => (
            <button
              key={p.id}
              onClick={() => selectPrestation(p.id)}
              className={`text-left rounded-xl border-2 p-4 transition-all ${prestationId === p.id ? "border-blue-500 bg-blue-50 shadow-md" : "border-slate-200 hover:border-blue-300 hover:bg-blue-50/50"}`}
            >
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl">{p.emoji}</span>
                <span className="font-semibold text-slate-800 text-sm">{p.nom}</span>
              </div>
              <p className="text-xs text-slate-400 ml-9">{p.totalMin} - {p.totalMax} €/{p.uniteLabel}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Etape 2 : Quantite */}
      {prestation && prestation.unite !== "forfait" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mr-2">2</span>
            Quantite ({prestation.uniteLabel})
          </h2>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={1}
              max={sliderMax}
              value={quantite}
              onChange={e => setQuantite(Number(e.target.value))}
              className="flex-1 accent-blue-500"
            />
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={999}
                value={quantite}
                onChange={e => setQuantite(Math.max(1, Number(e.target.value)))}
                className="w-20 border border-slate-300 rounded-lg px-3 py-2 text-center font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-500 font-medium">{prestation.uniteLabel}</span>
            </div>
          </div>
        </div>
      )}

      {/* Etape 3 : Region */}
      {prestation && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mr-2">{prestation.unite === "forfait" ? "2" : "3"}</span>
            Region
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {REGIONS_ELECTRICIEN.map(r => (
              <button
                key={r.id}
                onClick={() => setRegionId(r.id)}
                className={`rounded-xl border-2 px-4 py-3 text-center transition-all ${regionId === r.id ? "border-blue-500 bg-blue-50 shadow-md" : "border-slate-200 hover:border-blue-300"}`}
              >
                <p className="font-semibold text-sm text-slate-800">{r.nom}</p>
                <p className="text-xs text-slate-400">x{r.coefficient.toFixed(2)}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Resultat */}
      {resultat && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg shadow-blue-200/50">
            <p className="text-blue-100 text-sm mb-1">Prix estime — {resultat.prestation.nom}</p>
            <p className="text-4xl font-extrabold tracking-tight">
              {fmtPrix(resultat.totalMin)} — {fmtPrix(resultat.totalMax)}
            </p>
            <p className="text-blue-100 text-sm mt-2">
              {resultat.prestation.unite !== "forfait" && `Pour ${resultat.quantite} ${resultat.prestation.uniteLabel} · `}{resultat.region.nom} (x{resultat.region.coefficient.toFixed(2)})
            </p>
            <div className="h-px bg-white/20 my-5" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-blue-200">Fournitures</p>
                <p className="font-bold text-lg">{fmtPrix(resultat.fournituresMin)} — {fmtPrix(resultat.fournituresMax)}</p>
              </div>
              <div>
                <p className="text-blue-200">Main d&apos;oeuvre</p>
                <p className="font-bold text-lg">{fmtPrix(resultat.mainOeuvreMin)} — {fmtPrix(resultat.mainOeuvreMax)}</p>
              </div>
            </div>
          </div>

          {/* Jauge visuelle */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600 mb-3">Niveau de cout</p>
            <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((resultat.totalMin + resultat.totalMax) / 2 / 150))}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Economique</span>
              <span>Moyen</span>
              <span>Eleve</span>
            </div>
          </div>

          {/* Detail par unite */}
          {resultat.prestation.unite !== "forfait" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-600 mb-3">Prix unitaire ({resultat.region.nom})</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-extrabold text-slate-800">{fmtPrix(Math.round(resultat.prestation.totalMin * resultat.region.coefficient))}</p>
                  <p className="text-xs text-slate-400">min / {resultat.prestation.uniteLabel}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-extrabold text-blue-600">{fmtPrix(Math.round((resultat.prestation.totalMin + resultat.prestation.totalMax) / 2 * resultat.region.coefficient))}</p>
                  <p className="text-xs text-slate-400">moyen / {resultat.prestation.uniteLabel}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-extrabold text-slate-800">{fmtPrix(Math.round(resultat.prestation.totalMax * resultat.region.coefficient))}</p>
                  <p className="text-xs text-slate-400">max / {resultat.prestation.uniteLabel}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tableau comparatif */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Tableau des prix electricien 2026</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Prestation</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Unite</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Fournitures</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Main d&apos;oeuvre</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {PRESTATIONS_ELECTRICIEN.map(p => {
                const region = REGIONS_ELECTRICIEN.find(r => r.id === regionId) || REGIONS_ELECTRICIEN[2];
                const c = region.coefficient;
                return (
                  <tr key={p.id} className={`border-b border-slate-100 ${prestationId === p.id ? "bg-blue-50/50" : ""}`}>
                    <td className="py-2.5 px-2">
                      <span className="mr-2">{p.emoji}</span>
                      <span className={prestationId === p.id ? "font-bold text-blue-700" : "text-slate-700"}>{p.nom}</span>
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-500">{p.uniteLabel}</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{Math.round(p.fournituresMin * c)} - {Math.round(p.fournituresMax * c)} €</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{Math.round(p.mainOeuvreMin * c)} - {Math.round(p.mainOeuvreMax * c)} €</td>
                    <td className="py-2.5 px-2 text-right font-bold text-slate-800">{Math.round(p.totalMin * c)} - {Math.round(p.totalMax * c)} €</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">* Prix indicatifs TTC pour la region {REGIONS_ELECTRICIEN.find(r => r.id === regionId)?.nom || "Province"}. TVA a 10% pour les travaux de renovation (logement de + de 2 ans). TVA 5,5% pour les bornes IRVE.</p>
      </div>

      {/* Conseils */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Conseils pour vos travaux d&apos;electricite</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-blue-50/50 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm mb-1">Norme NF C 15-100</p>
            <p className="text-xs text-slate-500">Toute installation electrique doit respecter la norme NF C 15-100 (version 2024). Exigez un certificat de conformite Consuel apres les travaux.</p>
          </div>
          <div className="bg-blue-50/50 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm mb-1">Demandez plusieurs devis</p>
            <p className="text-xs text-slate-500">Comparez au moins 3 devis d&apos;electriciens qualifies. Les ecarts de prix peuvent atteindre 30 a 50% pour la meme prestation.</p>
          </div>
          <div className="bg-blue-50/50 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm mb-1">Qualification Qualifelec</p>
            <p className="text-xs text-slate-500">Privilegiez un electricien certifie Qualifelec ou RGE. C&apos;est obligatoire pour l&apos;installation de bornes IRVE et pour beneficier des aides MaPrimeRenov&apos;.</p>
          </div>
          <div className="bg-blue-50/50 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm mb-1">Aides financieres</p>
            <p className="text-xs text-slate-500">TVA a 10% en renovation, 5,5% pour les bornes IRVE. Credit d&apos;impot de 300 € pour une borne de recharge. MaPrimeRenov&apos; pour la VMC et l&apos;isolation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
