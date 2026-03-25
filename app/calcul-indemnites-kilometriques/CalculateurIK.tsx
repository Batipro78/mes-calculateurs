"use client";

import { useState } from "react";

type TypeVehicule = "voiture" | "moto" | "velo";

// Bareme fiscal 2026 (revenus 2025) — voitures
const BAREME_VOITURE: {
  cv: string;
  label: string;
  d1: number;
  d2: number;
  d3: number;
  c1: number;
  c2: number;
}[] = [
  { cv: "3", label: "3 CV et moins", d1: 0.529, d2: 0.316, d3: 0.37, c1: 1065, c2: 0 },
  { cv: "4", label: "4 CV", d1: 0.606, d2: 0.34, d3: 0.407, c1: 1330, c2: 0 },
  { cv: "5", label: "5 CV", d1: 0.636, d2: 0.357, d3: 0.427, c1: 1395, c2: 0 },
  { cv: "6", label: "6 CV", d1: 0.665, d2: 0.374, d3: 0.447, c1: 1457, c2: 0 },
  { cv: "7+", label: "7 CV et plus", d1: 0.697, d2: 0.394, d3: 0.470, c1: 1515, c2: 0 },
];

// Bareme motos > 50cc
const BAREME_MOTO: {
  cv: string;
  label: string;
  d1: number;
  d2: number;
  d3: number;
  c1: number;
}[] = [
  { cv: "1-2", label: "1 a 2 CV", d1: 0.395, d2: 0.099, d3: 0.248, c1: 891 },
  { cv: "3-5", label: "3 a 5 CV", d1: 0.468, d2: 0.082, d3: 0.275, c1: 1158 },
  { cv: "5+", label: "Plus de 5 CV", d1: 0.606, d2: 0.079, d3: 0.343, c1: 1583 },
];

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function calculVoiture(cvIdx: number, km: number): number {
  const b = BAREME_VOITURE[cvIdx];
  if (km <= 5000) return km * b.d1;
  if (km <= 20000) return km * b.d2 + b.c1;
  return km * b.d3;
}

function calculMoto(cvIdx: number, km: number): number {
  const b = BAREME_MOTO[cvIdx];
  if (km <= 3000) return km * b.d1;
  if (km <= 6000) return km * b.d2 + b.c1;
  return km * b.d3;
}

export default function CalculateurIK() {
  const [type, setType] = useState<TypeVehicule>("voiture");
  const [km, setKm] = useState("12000");
  const [cvVoiture, setCvVoiture] = useState(2); // index 5CV par defaut
  const [cvMoto, setCvMoto] = useState(1);
  const [electrique, setElectrique] = useState(false);
  const [joursParSemaine, setJoursParSemaine] = useState("5");
  const [distanceAR, setDistanceAR] = useState("");

  const kmNum = parseFloat(km) || 0;

  // Calcul depuis trajet quotidien
  const distAR = parseFloat(distanceAR) || 0;
  const joursS = parseInt(joursParSemaine) || 5;
  const kmAnnuelEstime = distAR > 0 ? distAR * joursS * 47 : 0; // 47 semaines travaillees

  const kmFinal = distAR > 0 ? kmAnnuelEstime : kmNum;

  let indemnite = 0;
  if (type === "voiture") {
    indemnite = calculVoiture(cvVoiture, kmFinal);
    if (electrique) indemnite *= 1.2; // majoration 20% vehicule electrique
  } else if (type === "moto") {
    indemnite = calculMoto(cvMoto, kmFinal);
  } else {
    // Velo : forfait 0.25 EUR/km plafonne a 200 km
    indemnite = Math.min(kmFinal, 200) * 0.25;
  }

  const parMois = indemnite / 12;
  const parKm = kmFinal > 0 ? indemnite / kmFinal : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Type de vehicule */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Type de vehicule
          </label>
          <div className="grid grid-cols-3 gap-2">
            {([
              { id: "voiture" as TypeVehicule, label: "Voiture", icon: "🚗" },
              { id: "moto" as TypeVehicule, label: "Moto", icon: "🏍️" },
              { id: "velo" as TypeVehicule, label: "Velo", icon: "🚲" },
            ]).map((v) => (
              <button
                key={v.id}
                onClick={() => setType(v.id)}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  type === v.id
                    ? "border-teal-500 bg-teal-50/50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <span className="text-2xl">{v.icon}</span>
                <span className="block text-sm font-bold text-slate-800 mt-1">
                  {v.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Puissance fiscale */}
        {type === "voiture" && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Puissance fiscale (CV)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {BAREME_VOITURE.map((b, i) => (
                <button
                  key={b.cv}
                  onClick={() => setCvVoiture(i)}
                  className={`p-2 rounded-xl border-2 text-center transition-all ${
                    cvVoiture === i
                      ? "border-teal-500 bg-teal-50/50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="text-sm font-bold text-slate-800">
                    {b.cv} CV
                  </span>
                </button>
              ))}
            </div>

            <label className="flex items-center gap-3 mt-4 cursor-pointer">
              <input
                type="checkbox"
                checked={electrique}
                onChange={(e) => setElectrique(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm font-medium text-slate-600">
                Vehicule electrique (+20%)
              </span>
            </label>
          </div>
        )}

        {type === "moto" && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Puissance fiscale
            </label>
            <div className="grid grid-cols-3 gap-2">
              {BAREME_MOTO.map((b, i) => (
                <button
                  key={b.cv}
                  onClick={() => setCvMoto(i)}
                  className={`p-2 rounded-xl border-2 text-center transition-all ${
                    cvMoto === i
                      ? "border-teal-500 bg-teal-50/50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="text-sm font-bold text-slate-800">
                    {b.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Kilometres */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Distance annuelle
          </label>
          <div className="relative">
            <input
              type="number"
              value={km}
              onChange={(e) => {
                setKm(e.target.value);
                setDistanceAR("");
              }}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-14 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              min="0"
              step="100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              km
            </span>
          </div>
        </div>

        {/* Calcul depuis trajet quotidien */}
        <div className="pt-5 border-t border-slate-100">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Ou calculez depuis votre trajet quotidien
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">
                Distance aller-retour
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={distanceAR}
                  onChange={(e) => setDistanceAR(e.target.value)}
                  placeholder="ex: 40"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  min="0"
                  step="1"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                  km
                </span>
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">
                Jours / semaine
              </label>
              <select
                value={joursParSemaine}
                onChange={(e) => setJoursParSemaine(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                {[1, 2, 3, 4, 5, 6].map((j) => (
                  <option key={j} value={j}>
                    {j} jour{j > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {distAR > 0 && (
            <p className="text-xs text-teal-600 mt-2">
              = {kmAnnuelEstime.toLocaleString("fr-FR")} km/an (47 semaines)
            </p>
          )}
        </div>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl p-6 shadow-lg shadow-teal-200/50">
          <p className="text-sm text-teal-100 mb-1">Indemnite annuelle</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(indemnite)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
          <p className="text-sm text-teal-200 mt-2">
            pour {kmFinal.toLocaleString("fr-FR")} km parcourus
            {electrique && type === "voiture" ? " (majoration EV +20%)" : ""}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-4">Detail</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Par mois</span>
              <span className="font-bold text-slate-800">
                {fmt(parMois)} EUR
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Par kilometre</span>
              <span className="font-bold text-slate-800">
                {fmt(parKm)} EUR/km
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Vehicule</span>
              <span className="font-bold text-slate-800">
                {type === "voiture"
                  ? `${BAREME_VOITURE[cvVoiture].label}${electrique ? " (EV)" : ""}`
                  : type === "moto"
                  ? BAREME_MOTO[cvMoto].label
                  : "Velo"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Bareme</span>
              <span className="font-bold text-slate-800">Fiscal 2026</span>
            </div>
          </div>
        </div>

        {type === "voiture" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-xs font-medium text-slate-400 mb-3">
              Bareme {BAREME_VOITURE[cvVoiture].label}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Jusqu&apos;a 5 000 km</span>
                <span className="font-semibold text-slate-700">
                  {BAREME_VOITURE[cvVoiture].d1} EUR/km
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">5 001 a 20 000 km</span>
                <span className="font-semibold text-slate-700">
                  {BAREME_VOITURE[cvVoiture].d2} EUR/km + {BAREME_VOITURE[cvVoiture].c1}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Plus de 20 000 km</span>
                <span className="font-semibold text-slate-700">
                  {BAREME_VOITURE[cvVoiture].d3} EUR/km
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-teal-50 rounded-2xl border border-teal-200 p-4">
          <p className="text-xs text-teal-700">
            Bareme kilometrique fiscal 2026 (revenus 2025). Ces indemnites
            couvrent l&apos;amortissement du vehicule, l&apos;assurance,
            l&apos;entretien et le carburant. Les peages et parkings sont
            deductibles en plus.
          </p>
        </div>
      </div>
    </div>
  );
}
