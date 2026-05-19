"use client";

import { useState } from "react";
import {
  calculerBilanFFT,
  CLASSEMENTS_ORDRE,
  type ClassementFFT,
} from "./tennisFftCalc";

function fmt(n: number, digits = 1): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

type VictoireItem = { id: string; classement: ClassementFFT; nombre: number };
type DefaiteItem = { id: string; classement: ClassementFFT; nombre: number };

export default function CalculClassementTennisFFT() {
  const [classementActuel, setClassementActuel] = useState<ClassementFFT>("30/5");
  const [victoires, setVictoires] = useState<VictoireItem[]>([
    { id: "v1", classement: "30", nombre: 1 },
  ]);
  const [defaites, setDefaites] = useState<DefaiteItem[]>([
    { id: "d1", classement: "30/5", nombre: 0 },
  ]);

  // Calcul
  const resultat = calculerBilanFFT({
    classementActuel,
    victoires: victoires.map(v => ({
      classementAdversaire: v.classement,
      nombre: v.nombre,
    })),
    defaites: defaites.map(d => ({
      classementAdversaire: d.classement,
      nombre: d.nombre,
    })),
  });

  const addVictoire = () => {
    setVictoires([
      ...victoires,
      {
        id: `v${Date.now()}`,
        classement: classementActuel,
        nombre: 1,
      },
    ]);
  };

  const removeVictoire = (id: string) => {
    setVictoires(victoires.filter(v => v.id !== id));
  };

  const updateVictoire = (
    id: string,
    key: keyof VictoireItem,
    value: any
  ) => {
    setVictoires(
      victoires.map(v =>
        v.id === id
          ? {
              ...v,
              [key]:
                key === "nombre" ? Math.max(0, parseInt(value) || 0) : value,
            }
          : v
      )
    );
  };

  const addDefaite = () => {
    setDefaites([
      ...defaites,
      {
        id: `d${Date.now()}`,
        classement: classementActuel,
        nombre: 1,
      },
    ]);
  };

  const removeDefaite = (id: string) => {
    setDefaites(defaites.filter(d => d.id !== id));
  };

  const updateDefaite = (id: string, key: keyof DefaiteItem, value: any) => {
    setDefaites(
      defaites.map(d =>
        d.id === id
          ? {
              ...d,
              [key]:
                key === "nombre" ? Math.max(0, parseInt(value) || 0) : value,
            }
          : d
      )
    );
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-8">
        {/* Classement actuel */}
        <div>
          <label
            htmlFor="classement"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Votre classement actuel
          </label>
          <select
            id="classement"
            value={classementActuel}
            onChange={e => setClassementActuel(e.target.value as ClassementFFT)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-shadow"
          >
            {CLASSEMENTS_ORDRE.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Victoires */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-slate-600">
              Victoires cette saison
            </label>
            <button
              onClick={addVictoire}
              className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg font-semibold hover:bg-emerald-200 transition-colors"
            >
              + Ajouter
            </button>
          </div>
          <div className="space-y-3">
            {victoires.map(v => (
              <div key={v.id} className="flex gap-2">
                <select
                  value={v.classement}
                  onChange={e =>
                    updateVictoire(
                      v.id,
                      "classement",
                      e.target.value as ClassementFFT
                    )
                  }
                  className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  {CLASSEMENTS_ORDRE.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={v.nombre}
                  onChange={e =>
                    updateVictoire(v.id, "nombre", e.target.value)
                  }
                  min="0"
                  className="w-16 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="nb"
                />
                <button
                  onClick={() => removeVictoire(v.id)}
                  className="text-xs bg-red-100 text-red-700 px-2 py-2 rounded-lg hover:bg-red-200 transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Defaites */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-slate-600">
              Défaites cette saison
            </label>
            <button
              onClick={addDefaite}
              className="text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-lg font-semibold hover:bg-red-200 transition-colors"
            >
              + Ajouter
            </button>
          </div>
          <div className="space-y-3">
            {defaites.map(d => (
              <div key={d.id} className="flex gap-2">
                <select
                  value={d.classement}
                  onChange={e =>
                    updateDefaite(
                      d.id,
                      "classement",
                      e.target.value as ClassementFFT
                    )
                  }
                  className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  {CLASSEMENTS_ORDRE.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={d.nombre}
                  onChange={e =>
                    updateDefaite(d.id, "nombre", e.target.value)
                  }
                  min="0"
                  className="w-16 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="nb"
                />
                <button
                  onClick={() => removeDefaite(d.id)}
                  className="text-xs bg-red-100 text-red-700 px-2 py-2 rounded-lg hover:bg-red-200 transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg shadow-yellow-200/50">
          <p className="text-sm text-yellow-100 mb-1">Bilan points</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(resultat.bilanPoints, 1)}{" "}
            <span className="text-lg font-semibold">pts</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-400 mb-1">Classement estimé</p>
              <p className="text-2xl font-bold text-slate-800">
                {resultat.classementEstime}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Progression</p>
              <p className="text-lg font-semibold text-yellow-600">
                {resultat.progression}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs text-slate-400 mb-2">Résumé saison</p>
          <div className="space-y-2 text-sm">
            <p className="text-slate-700">
              Victoires : <strong>{victoires.reduce((sum, v) => sum + v.nombre, 0)}</strong>
            </p>
            <p className="text-slate-700">
              Défaites : <strong>{defaites.reduce((sum, d) => sum + d.nombre, 0)}</strong>
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Calcul selon règles FFT (V-E-2I-5G). A titre informatif.
        </div>
      </div>
    </div>
  );
}
