"use client";

import { useState } from "react";
import { calculerHumidex, type NiveauHumidex } from "./humidexCalc";

const STYLES: Record<
  NiveauHumidex,
  { grad: string; chipBg: string; chipText: string }
> = {
  confort: { grad: "from-emerald-500 to-green-600", chipBg: "bg-emerald-100", chipText: "text-emerald-700" },
  inconfort: { grad: "from-yellow-400 to-amber-500", chipBg: "bg-amber-100", chipText: "text-amber-700" },
  intense: { grad: "from-orange-500 to-orange-600", chipBg: "bg-orange-100", chipText: "text-orange-700" },
  danger: { grad: "from-red-500 to-rose-600", chipBg: "bg-red-100", chipText: "text-red-700" },
  extreme: { grad: "from-red-700 to-rose-900", chipBg: "bg-red-200", chipText: "text-red-900" },
};

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export default function TemperatureRessentie() {
  const [temperature, setTemperature] = useState("34");
  const [humidite, setHumidite] = useState("55");
  const [ventilateur, setVentilateur] = useState(false);

  const T = parseFloat(temperature) || 0;
  const RH = parseFloat(humidite) || 0;

  const r = calculerHumidex({ temperature: T, humidite: RH, ventilateur });
  const s = STYLES[r.niveau];

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        {/* Temperature */}
        <div>
          <label htmlFor="temperature" className="block text-sm font-medium text-slate-600 mb-2">
            Temperature de l&apos;air : <span className="font-bold text-slate-800">{fmt(T)} &deg;C</span>
          </label>
          <input
            id="temperature"
            type="range"
            min="20"
            max="50"
            step="0.5"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            className="w-full accent-red-500"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>20 &deg;C</span>
            <span>50 &deg;C</span>
          </div>
        </div>

        {/* Humidite */}
        <div>
          <label htmlFor="humidite" className="block text-sm font-medium text-slate-600 mb-2">
            Humidite relative : <span className="font-bold text-slate-800">{Math.round(RH)} %</span>
          </label>
          <input
            id="humidite"
            type="range"
            min="0"
            max="100"
            step="1"
            value={humidite}
            onChange={(e) => setHumidite(e.target.value)}
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0 % (sec)</span>
            <span>100 % (lourd)</span>
          </div>
        </div>

        {/* Ventilateur */}
        <button
          onClick={() => setVentilateur(!ventilateur)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-colors ${
            ventilateur
              ? "bg-sky-50 border-sky-300 text-sky-800"
              : "border-slate-200 text-slate-500 hover:border-slate-300"
          }`}
        >
          <span>Ventilateur en marche</span>
          <span
            className={`inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              ventilateur ? "bg-sky-400" : "bg-slate-300"
            }`}
          >
            <span
              className={`h-5 w-5 rounded-full bg-white shadow transform transition-transform ${
                ventilateur ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </span>
        </button>

        <p className="text-xs text-slate-400 leading-relaxed">
          Astuce : un hygrometre (ou la meteo locale) vous donne l&apos;humidite relative. Plus l&apos;air est
          humide, plus la chaleur est difficile a supporter car la transpiration s&apos;evapore mal.
        </p>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-2 space-y-4">
        <div className={`bg-gradient-to-br ${s.grad} text-white rounded-2xl p-6 shadow-lg`}>
          <p className="text-sm text-white/80 mb-1">Temperature ressentie</p>
          <p className="text-5xl font-extrabold tracking-tight">
            {fmt(r.ressenti)} <span className="text-xl font-semibold">&deg;C</span>
          </p>
          <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold ${s.chipBg} ${s.chipText}`}>
            {r.label}
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Indice Humidex</span>
            <span className="font-bold text-slate-800">{fmt(r.humidex)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Effet ventilateur</span>
            <span className="font-bold text-slate-800">
              {r.ventiloEffet > 0 ? `- ${fmt(r.ventiloEffet)} °C ressentis` : "—"}
            </span>
          </div>
        </div>

        {r.ventiloContreProductif && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-800 leading-relaxed">
            <strong>Attention :</strong> au-dela de 37 &deg;C, un ventilateur brasse de l&apos;air plus chaud que
            la peau. Il ne rafraichit plus et peut accentuer la deshydratation. Preferez un brumisateur, un linge
            humide et l&apos;ombre.
          </div>
        )}

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-600 leading-relaxed">
          {r.conseil}
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Indice indicatif (formule Humidex). Il ne remplace pas les bulletins de vigilance de Meteo-France ni
          l&apos;avis d&apos;un professionnel de sante.
        </div>
      </div>
    </div>
  );
}
