"use client";

import { useState } from "react";
import { PRESTATIONS_PEINTRE, REGIONS_PEINTRE, calculerPrixPeintre, fmtPrix } from "./calcPeintre";

export default function EstimateurPeintre() {
  const [prestationId, setPrestationId] = useState<string | null>(null);
  const [quantite, setQuantite] = useState(20);
  const [regionId, setRegionId] = useState("province");

  const prestation = PRESTATIONS_PEINTRE.find(p => p.id === prestationId);
  const resultat = prestationId ? calculerPrixPeintre(prestationId, quantite, regionId) : null;

  function selectPrestation(id: string) {
    const p = PRESTATIONS_PEINTRE.find(pr => pr.id === id);
    setPrestationId(id);
    if (p) {
      if (p.unite === "unite") setQuantite(3);
      else setQuantite(20);
    }
  }

  const sliderMax = prestation?.unite === "unite" ? 20 : 200;

  return (
    <div className="space-y-6">
      {/* Etape 1 : Prestation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-bold mr-2">1</span>
          Choisissez la prestation
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRESTATIONS_PEINTRE.map(p => (
            <button
              key={p.id}
              onClick={() => selectPrestation(p.id)}
              className={`text-left rounded-xl border-2 p-4 transition-all ${prestationId === p.id ? "border-violet-500 bg-violet-50 shadow-md" : "border-slate-200 hover:border-violet-300 hover:bg-violet-50/50"}`}
            >
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl">{p.emoji}</span>
                <span className="font-semibold text-slate-800 text-sm">{p.nom}</span>
              </div>
              <p className="text-xs text-slate-400 ml-9">{p.totalMin} - {p.totalMax} \u20ac/{p.uniteLabel}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Etape 2 : Quantite */}
      {prestation && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-bold mr-2">2</span>
            {prestation.unite === "unite" ? "Nombre de portes / boiseries" : `Surface (${prestation.uniteLabel})`}
          </h2>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={1}
              max={sliderMax}
              value={quantite}
              onChange={e => setQuantite(Number(e.target.value))}
              className="flex-1 accent-violet-500"
            />
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={999}
                value={quantite}
                onChange={e => setQuantite(Math.max(1, Number(e.target.value)))}
                className="w-20 border border-slate-300 rounded-lg px-3 py-2 text-center font-bold focus:outline-none focus:ring-2 focus:ring-violet-500"
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
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-bold mr-2">3</span>
            Region
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {REGIONS_PEINTRE.map(r => (
              <button
                key={r.id}
                onClick={() => setRegionId(r.id)}
                className={`rounded-xl border-2 px-4 py-3 text-center transition-all ${regionId === r.id ? "border-violet-500 bg-violet-50 shadow-md" : "border-slate-200 hover:border-violet-300"}`}
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
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg shadow-violet-200/50">
            <p className="text-violet-200 text-sm mb-1">Prix estime — {resultat.prestation.nom}</p>
            <p className="text-4xl font-extrabold tracking-tight">
              {fmtPrix(resultat.totalMin)} — {fmtPrix(resultat.totalMax)}
            </p>
            <p className="text-violet-200 text-sm mt-2">
              Pour {resultat.quantite} {resultat.prestation.uniteLabel} &middot; {resultat.region.nom} (x{resultat.region.coefficient.toFixed(2)})
            </p>
            <div className="h-px bg-white/20 my-5" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-violet-200">Fournitures</p>
                <p className="font-bold text-lg">{fmtPrix(resultat.fournituresMin)} — {fmtPrix(resultat.fournituresMax)}</p>
              </div>
              <div>
                <p className="text-violet-200">Main d&apos;oeuvre</p>
                <p className="font-bold text-lg">{fmtPrix(resultat.mainOeuvreMin)} — {fmtPrix(resultat.mainOeuvreMax)}</p>
              </div>
            </div>
          </div>

          {/* Jauge visuelle */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600 mb-3">Niveau de cout</p>
            <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((resultat.totalMin + resultat.totalMax) / 2 / 80))}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Economique</span>
              <span>Moyen</span>
              <span>Eleve</span>
            </div>
          </div>

          {/* Detail par unite */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600 mb-3">Prix unitaire ({resultat.region.nom})</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-lg font-extrabold text-slate-800">{fmtPrix(Math.round(resultat.prestation.totalMin * resultat.region.coefficient))}</p>
                <p className="text-xs text-slate-400">min / {resultat.prestation.uniteLabel}</p>
              </div>
              <div className="bg-violet-50 rounded-xl p-3 text-center">
                <p className="text-lg font-extrabold text-violet-600">{fmtPrix(Math.round((resultat.prestation.totalMin + resultat.prestation.totalMax) / 2 * resultat.region.coefficient))}</p>
                <p className="text-xs text-slate-400">moyen / {resultat.prestation.uniteLabel}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-lg font-extrabold text-slate-800">{fmtPrix(Math.round(resultat.prestation.totalMax * resultat.region.coefficient))}</p>
                <p className="text-xs text-slate-400">max / {resultat.prestation.uniteLabel}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tableau comparatif */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Tableau des prix peintre 2026</h2>
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
              {PRESTATIONS_PEINTRE.map(p => {
                const region = REGIONS_PEINTRE.find(r => r.id === regionId) || REGIONS_PEINTRE[2];
                const c = region.coefficient;
                return (
                  <tr key={p.id} className={`border-b border-slate-100 ${prestationId === p.id ? "bg-violet-50/50" : ""}`}>
                    <td className="py-2.5 px-2">
                      <span className="mr-2">{p.emoji}</span>
                      <span className={prestationId === p.id ? "font-bold text-violet-700" : "text-slate-700"}>{p.nom}</span>
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-500">{p.uniteLabel}</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{Math.round(p.fournituresMin * c)} - {Math.round(p.fournituresMax * c)} \u20ac</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{Math.round(p.mainOeuvreMin * c)} - {Math.round(p.mainOeuvreMax * c)} \u20ac</td>
                    <td className="py-2.5 px-2 text-right font-bold text-slate-800">{Math.round(p.totalMin * c)} - {Math.round(p.totalMax * c)} \u20ac</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">* Prix indicatifs TTC pour la region {REGIONS_PEINTRE.find(r => r.id === regionId)?.nom || "Province"}. TVA a 10% pour les travaux de renovation (logement de + de 2 ans).</p>
      </div>

      {/* Conseils */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Conseils pour vos travaux de peinture</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-violet-50/50 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm mb-1">Preparation des surfaces</p>
            <p className="text-xs text-slate-500">La preparation (lessivage, poncage, enduit) represente 50% du travail. Un bon peintre passe autant de temps a preparer qu&apos;a peindre.</p>
          </div>
          <div className="bg-violet-50/50 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm mb-1">TVA reduite a 10%</p>
            <p className="text-xs text-slate-500">Les travaux de peinture dans un logement de plus de 2 ans beneficient d&apos;une TVA a 10%. Valable pour la main d&apos;oeuvre ET les fournitures.</p>
          </div>
          <div className="bg-violet-50/50 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm mb-1">Nombre de couches</p>
            <p className="text-xs text-slate-500">Prevoyez generalement 2 couches de peinture + 1 sous-couche si le support est neuf ou tres abime. Les prix indiques incluent 2 couches.</p>
          </div>
          <div className="bg-violet-50/50 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm mb-1">Qualite de la peinture</p>
            <p className="text-xs text-slate-500">Une peinture de qualite (Tollens, Sikkens, Zolpan) coute plus cher mais offre un meilleur rendu et une meilleure tenue dans le temps.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
