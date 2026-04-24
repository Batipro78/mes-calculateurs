"use client";
import { useState, useMemo } from "react";
import {
  calculerTaxeFonciere,
  comparerVilles,
  VILLES,
  TAUX_VILLES,
  estimerValeurLocative,
} from "./taxeFonciereCalc";

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

const TYPES_BIEN = [
  { id: "appartement" as const, label: "Appartement", icon: "🏢" },
  { id: "maison" as const, label: "Maison", icon: "🏠" },
  { id: "terrain" as const, label: "Terrain", icon: "🌳" },
];

export default function TaxeFonciere() {
  const [typeBien, setTypeBien] = useState<"appartement" | "maison" | "terrain">("appartement");
  const [surface, setSurface] = useState(80);
  const [ville, setVille] = useState("Paris");
  const [tauxCustom, setTauxCustom] = useState("30");
  const [neuf, setNeuf] = useState(false);
  const [modeAvance, setModeAvance] = useState(false);
  const [valeurLocativeManuelle, setValeurLocativeManuelle] = useState("");

  const valeurLocative = modeAvance && valeurLocativeManuelle
    ? parseFloat(valeurLocativeManuelle.replace(",", ".")) || null
    : null;

  const resultat = useMemo(() => {
    return calculerTaxeFonciere({
      valeurLocative,
      surface,
      typeBien,
      ville,
      tauxCustom: parseFloat(tauxCustom.replace(",", ".")) || null,
      neuf,
    });
  }, [valeurLocative, surface, typeBien, ville, tauxCustom, neuf]);

  const comparaison = useMemo(() => {
    return comparerVilles(surface, typeBien, valeurLocative);
  }, [surface, typeBien, valeurLocative]);

  const vlEstimee = estimerValeurLocative(surface, typeBien);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* --- Formulaire --- */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Type de bien */}
        <label className="block text-sm font-semibold text-slate-700 mb-2">Type de bien</label>
        <div className="grid grid-cols-3 gap-3 mb-5">
          {TYPES_BIEN.map((t) => (
            <button
              key={t.id}
              onClick={() => setTypeBien(t.id)}
              className={`rounded-xl py-3 text-sm font-semibold transition-all border ${
                typeBien === t.id
                  ? "border-amber-400 bg-amber-50 text-amber-700 shadow-sm"
                  : "border-slate-200 text-slate-600 hover:border-amber-300 hover:bg-amber-50/50"
              }`}
            >
              <span className="text-lg mr-1">{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Surface */}
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Surface : <span className="text-amber-600">{surface} m&sup2;</span>
        </label>
        <input
          type="range"
          min={10}
          max={500}
          step={5}
          value={surface}
          onChange={(e) => setSurface(Number(e.target.value))}
          className="w-full mb-1 accent-amber-500"
        />
        <div className="flex justify-between text-xs text-slate-400 mb-5">
          <span>10 m&sup2;</span>
          <span>500 m&sup2;</span>
        </div>

        {/* Ville */}
        <label className="block text-sm font-semibold text-slate-700 mb-2">Ville (taux communal)</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {VILLES.map((v) => (
            <button
              key={v}
              onClick={() => setVille(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                ville === v
                  ? "border-amber-400 bg-amber-50 text-amber-700"
                  : "border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50/50"
              }`}
            >
              {v} ({TAUX_VILLES[v]}%)
            </button>
          ))}
          <button
            onClick={() => setVille("autre")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              ville === "autre"
                ? "border-amber-400 bg-amber-50 text-amber-700"
                : "border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50/50"
            }`}
          >
            Autre
          </button>
        </div>
        {ville === "autre" && (
          <div className="mb-5">
            <label className="block text-xs text-slate-500 mb-1">Taux global personnalise (%)</label>
            <input
              type="text"
              inputMode="decimal"
              value={tauxCustom}
              onChange={(e) => setTauxCustom(e.target.value)}
              className="w-40 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
              placeholder="ex: 35"
            />
          </div>
        )}

        {/* Neuf */}
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => setNeuf(!neuf)}
            className={`w-12 h-7 rounded-full transition-all relative ${
              neuf ? "bg-amber-500" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all ${
                neuf ? "left-5" : "left-0.5"
              }`}
            />
          </button>
          <span className="text-sm font-medium text-slate-700">
            Construction neuve (exoneration 2 ans)
          </span>
        </div>

        {/* Mode avance */}
        <button
          onClick={() => setModeAvance(!modeAvance)}
          className="text-xs text-amber-600 font-semibold hover:underline mb-3"
        >
          {modeAvance ? "Masquer le mode avance" : "Mode avance : saisir la valeur locative"}
        </button>
        {modeAvance && (
          <div className="mt-2 mb-4">
            <label className="block text-xs text-slate-500 mb-1">
              Valeur locative cadastrale annuelle (&euro;)
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={valeurLocativeManuelle}
              onChange={(e) => setValeurLocativeManuelle(e.target.value)}
              placeholder={`Estimation auto : ${fmt(vlEstimee)} EUR`}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
            />
            <p className="text-xs text-slate-400 mt-1">
              Laissez vide pour utiliser l&apos;estimation automatique ({fmt(vlEstimee)} &euro;/an)
            </p>
          </div>
        )}
      </div>

      {/* --- Resultats --- */}
      <div className="lg:col-span-2 space-y-4">
        {resultat ? (
          <>
            {/* Card principale */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg shadow-amber-200/50">
              <p className="text-amber-200 text-sm mb-1">Taxe fonciere annuelle</p>
              {resultat.exoneration ? (
                <>
                  <p className="text-4xl font-extrabold tracking-tight">0 &euro;</p>
                  <p className="text-amber-200 text-xs mt-1">
                    Exoneration construction neuve (2 ans)
                  </p>
                  <p className="text-amber-100 text-xs mt-1">
                    Sans exoneration : {fmt(resultat.baseImposable * (resultat.tauxCommunal / 100))} &euro;/an
                  </p>
                </>
              ) : (
                <p className="text-4xl font-extrabold tracking-tight">
                  {fmt(resultat.taxeAnnuelle)} <span className="text-xl font-semibold">&euro;</span>
                </p>
              )}
              <div className="h-px bg-white/20 my-3" />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-amber-200">Par mois</p>
                  <p className="font-semibold text-lg">{fmt(resultat.taxeMensuelle)} &euro;</p>
                </div>
                <div>
                  <p className="text-amber-200">Taux global</p>
                  <p className="font-semibold text-lg">{resultat.tauxCommunal} %</p>
                </div>
              </div>
            </div>

            {/* Detail calcul */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-2">Detail du calcul</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Valeur locative cadastrale</span>
                  <span className="font-bold">{fmt(resultat.valeurLocative)} &euro;/an</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Apres revalorisation (x1,035)</span>
                  <span className="font-bold">{fmt(resultat.valeurLocativeRevisee)} &euro;</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Abattement 50%</span>
                  <span className="font-bold text-amber-600">-50%</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-slate-700 font-semibold">Base imposable</span>
                  <span className="font-bold text-amber-600">{fmt(resultat.baseImposable)} &euro;</span>
                </div>
              </div>
            </div>

            {/* Comparaison multi-villes */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-2">
                Comparaison par ville ({surface} m&sup2; - {typeBien})
              </p>
              <div className="space-y-1.5">
                {comparaison.map((c) => {
                  const max = comparaison[comparaison.length - 1]?.taxeAnnuelle || 1;
                  const pct = (c.taxeAnnuelle / max) * 100;
                  const isActive = c.ville === ville;
                  return (
                    <div key={c.ville} className="flex items-center gap-2 text-xs">
                      <span className={`w-24 text-right font-medium ${isActive ? "text-amber-700" : "text-slate-600"}`}>
                        {c.ville}
                      </span>
                      <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${isActive ? "bg-amber-500" : "bg-amber-300"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className={`w-20 text-right font-bold ${isActive ? "text-amber-700" : "text-slate-700"}`}>
                        {fmt(c.taxeAnnuelle)} &euro;
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {resultat.exoneration && (
              <div className="rounded-2xl p-4 bg-green-50 border border-green-200">
                <p className="text-sm font-semibold text-green-700">Exoneration construction neuve</p>
                <p className="text-xs text-slate-500 mt-1">
                  Les constructions neuves beneficient d&apos;une exoneration de taxe fonciere pendant 2 ans, sur demande aupres du centre des impots dans les 90 jours suivant l&apos;achevement des travaux.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-6 text-center">
            <p className="text-slate-400 text-sm">Remplissez les champs</p>
          </div>
        )}
      </div>
    </div>
  );
}
