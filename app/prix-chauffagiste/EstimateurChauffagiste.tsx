"use client";

import { useState } from "react";
import { PRESTATIONS_CHAUFFAGISTE, REGIONS_CHAUFFAGISTE, calculerPrixChauffagiste, fmtPrix } from "./calcChauffagiste";

export default function EstimateurChauffagiste() {
  const [prestationId, setPrestationId] = useState<string | null>(null);
  const [quantite, setQuantite] = useState(1);
  const [regionId, setRegionId] = useState("province");

  const prestation = PRESTATIONS_CHAUFFAGISTE.find(p => p.id === prestationId);
  const resultat = prestationId ? calculerPrixChauffagiste(prestationId, quantite, regionId) : null;

  function selectPrestation(id: string) {
    const p = PRESTATIONS_CHAUFFAGISTE.find(pr => pr.id === id);
    setPrestationId(id);
    if (p) {
      if (p.unite === "m2") setQuantite(50);
      else setQuantite(1);
    }
  }

  const sliderMax = prestation?.unite === "m2" ? 200 : 6;

  return (
    <div className="space-y-6">
      {/* Etape 1 : Prestation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-100 text-orange-700 text-sm font-bold mr-2">1</span>
          Choisissez la prestation
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRESTATIONS_CHAUFFAGISTE.map(p => (
            <button
              key={p.id}
              onClick={() => selectPrestation(p.id)}
              className={`text-left rounded-xl border-2 p-4 transition-all ${prestationId === p.id ? "border-orange-600 bg-orange-50 shadow-md" : "border-slate-200 hover:border-orange-400 hover:bg-orange-50/50"}`}
            >
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl">{p.emoji}</span>
                <span className="font-semibold text-slate-800 text-sm">{p.nom}</span>
              </div>
              <p className="text-xs text-slate-400 ml-9">{p.totalMin} - {p.totalMax} &euro;/{p.uniteLabel}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Etape 2 : Quantite */}
      {prestation && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-100 text-orange-700 text-sm font-bold mr-2">2</span>
            Quantite ({prestation.uniteLabel})
          </h2>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={1}
              max={sliderMax}
              value={quantite}
              onChange={e => setQuantite(Number(e.target.value))}
              className="flex-1 accent-orange-600"
            />
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={999}
                value={quantite}
                onChange={e => setQuantite(Math.max(1, Number(e.target.value)))}
                className="w-20 border border-slate-300 rounded-lg px-3 py-2 text-center font-bold focus:outline-none focus:ring-2 focus:ring-orange-600"
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
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-100 text-orange-700 text-sm font-bold mr-2">3</span>
            Region
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {REGIONS_CHAUFFAGISTE.map(r => (
              <button
                key={r.id}
                onClick={() => setRegionId(r.id)}
                className={`rounded-xl border-2 px-4 py-3 text-center transition-all ${regionId === r.id ? "border-orange-600 bg-orange-50 shadow-md" : "border-slate-200 hover:border-orange-400"}`}
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
          <div className="bg-gradient-to-br from-orange-600 to-red-500 text-white rounded-2xl p-8 shadow-lg shadow-orange-200/50">
            <p className="text-orange-200 text-sm mb-1">Prix estime &mdash; {resultat.prestation.nom}</p>
            <p className="text-4xl font-extrabold tracking-tight">
              {fmtPrix(resultat.totalMin)} &mdash; {fmtPrix(resultat.totalMax)}
            </p>
            <p className="text-orange-200 text-sm mt-2">
              Pour {resultat.quantite} {resultat.prestation.uniteLabel} &middot; {resultat.region.nom} (x{resultat.region.coefficient.toFixed(2)})
            </p>
            <div className="h-px bg-white/20 my-5" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-orange-200">Fournitures</p>
                <p className="font-bold text-lg">{fmtPrix(resultat.fournituresMin)} &mdash; {fmtPrix(resultat.fournituresMax)}</p>
              </div>
              <div>
                <p className="text-orange-200">Main d&apos;oeuvre</p>
                <p className="font-bold text-lg">{fmtPrix(resultat.mainOeuvreMin)} &mdash; {fmtPrix(resultat.mainOeuvreMax)}</p>
              </div>
            </div>
          </div>

          {/* Jauge visuelle */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600 mb-3">Niveau de cout</p>
            <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((resultat.totalMin + resultat.totalMax) / 2 / 200))}%` }}
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
              <div className="bg-orange-50 rounded-xl p-3 text-center">
                <p className="text-lg font-extrabold text-orange-700">{fmtPrix(Math.round((resultat.prestation.totalMin + resultat.prestation.totalMax) / 2 * resultat.region.coefficient))}</p>
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
        <h2 className="text-lg font-bold text-slate-800 mb-4">Tableau des prix chauffagiste 2026</h2>
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
              {PRESTATIONS_CHAUFFAGISTE.map(p => {
                const region = REGIONS_CHAUFFAGISTE.find(r => r.id === regionId) || REGIONS_CHAUFFAGISTE[2];
                const c = region.coefficient;
                return (
                  <tr key={p.id} className={`border-b border-slate-100 ${prestationId === p.id ? "bg-orange-50/50" : ""}`}>
                    <td className="py-2.5 px-2">
                      <span className="mr-2">{p.emoji}</span>
                      <span className={prestationId === p.id ? "font-bold text-orange-700" : "text-slate-700"}>{p.nom}</span>
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-500">{p.uniteLabel}</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{Math.round(p.fournituresMin * c)} - {Math.round(p.fournituresMax * c)} &euro;</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{Math.round(p.mainOeuvreMin * c)} - {Math.round(p.mainOeuvreMax * c)} &euro;</td>
                    <td className="py-2.5 px-2 text-right font-bold text-slate-800">{Math.round(p.totalMin * c)} - {Math.round(p.totalMax * c)} &euro;</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">* Prix indicatifs TTC pour la region {REGIONS_CHAUFFAGISTE.find(r => r.id === regionId)?.nom || "Province"}. TVA a 5,5% pour renovation energetique (logement de + de 2 ans), 10% pour travaux de renovation, 20% pour le neuf.</p>
      </div>

      {/* Conseils */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Conseils pour vos travaux de chauffage</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-orange-50/50 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm mb-1">Demandez plusieurs devis</p>
            <p className="text-xs text-slate-500">Comparez au moins 3 devis de chauffagistes differents. Les ecarts de prix peuvent atteindre 30 a 50% pour la meme installation.</p>
          </div>
          <div className="bg-orange-50/50 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm mb-1">MaPrimeRenov&apos; 2026</p>
            <p className="text-xs text-slate-500">Les pompes a chaleur et chauffe-eau thermodynamiques sont eligibles a MaPrimeRenov&apos;. Jusqu&apos;a 5 000 &euro; d&apos;aide selon vos revenus et le type d&apos;equipement.</p>
          </div>
          <div className="bg-orange-50/50 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm mb-1">Certification RGE obligatoire</p>
            <p className="text-xs text-slate-500">Pour beneficier des aides, votre chauffagiste doit etre certifie RGE (Reconnu Garant de l&apos;Environnement). Verifiez sur france-renov.gouv.fr.</p>
          </div>
          <div className="bg-orange-50/50 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm mb-1">Entretien obligatoire</p>
            <p className="text-xs text-slate-500">L&apos;entretien annuel de votre chaudiere (gaz, fioul) est obligatoire. Comptez 100 a 180 &euro; TTC. Un contrat d&apos;entretien est souvent plus avantageux.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
