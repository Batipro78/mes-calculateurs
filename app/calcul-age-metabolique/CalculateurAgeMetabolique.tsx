"use client";

import { useState } from "react";
import { calcAgeMetabolique } from "./ageMetaboliqueCalc";

function fmt(n: number): string {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n);
}

const ACTIVITES = [
  { key: "sedentaire", label: "Sedentaire", description: "Peu ou pas d'exercice" },
  { key: "leger", label: "Leger", description: "1-3 jours/sem." },
  { key: "modere", label: "Modere", description: "3-5 jours/sem." },
  { key: "actif", label: "Actif", description: "6-7 jours/sem." },
  { key: "intense", label: "Intense", description: "Athlete" },
] as const;

const CATEGORIE_CONFIG = {
  excellent: { label: "Excellent", bg: "bg-emerald-50", border: "border-emerald-300", text: "text-emerald-700", ring: "ring-emerald-400", dot: "bg-emerald-500" },
  bon: { label: "Bon", bg: "bg-green-50", border: "border-green-300", text: "text-green-700", ring: "ring-green-400", dot: "bg-green-500" },
  normal: { label: "Normal", bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-700", ring: "ring-blue-400", dot: "bg-blue-500" },
  attention: { label: "Attention", bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-700", ring: "ring-amber-400", dot: "bg-amber-500" },
  alerte: { label: "Alerte", bg: "bg-red-50", border: "border-red-300", text: "text-red-700", ring: "ring-red-400", dot: "bg-red-500" },
};

export default function CalculateurAgeMetabolique() {
  const [age, setAge] = useState("35");
  const [poids, setPoids] = useState("75");
  const [taille, setTaille] = useState("175");
  const [sexe, setSexe] = useState<"homme" | "femme">("homme");
  const [tourTaille, setTourTaille] = useState("85");
  const [activite, setActivite] = useState("modere");
  const [tabac, setTabac] = useState(false);
  const [alcool, setAlcool] = useState(false);

  const ageNum = parseInt(age) || 0;
  const poidsNum = parseFloat(poids) || 0;
  const tailleNum = parseFloat(taille) || 0;
  const tourTailleNum = parseFloat(tourTaille) || 0;

  const res =
    ageNum > 0 && poidsNum > 0 && tailleNum > 0 && tourTailleNum > 0
      ? calcAgeMetabolique(ageNum, poidsNum, tailleNum, sexe, tourTailleNum, activite, tabac, alcool)
      : null;

  const cat = res ? CATEGORIE_CONFIG[res.categorie] : null;

  // Echelle visuelle : age metabolique vs age reel
  const scaleMin = Math.max(15, (ageNum || 35) - 20);
  const scaleMax = (ageNum || 35) + 20;
  const realPct = res ? Math.min(Math.max(((ageNum - scaleMin) / (scaleMax - scaleMin)) * 100, 0), 100) : 50;
  const metabolicPct = res ? Math.min(Math.max(((res.ageMetabolique - scaleMin) / (scaleMax - scaleMin)) * 100, 0), 100) : 50;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire — 3 cols */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Sexe */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">Sexe</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSexe("homme")}
              className={`py-3 rounded-xl font-semibold text-sm border transition-all ${
                sexe === "homme"
                  ? "bg-blue-50 border-blue-300 text-blue-700 shadow-sm"
                  : "border-slate-200 text-slate-400 hover:border-slate-300"
              }`}
            >
              Homme
            </button>
            <button
              onClick={() => setSexe("femme")}
              className={`py-3 rounded-xl font-semibold text-sm border transition-all ${
                sexe === "femme"
                  ? "bg-pink-50 border-pink-300 text-pink-700 shadow-sm"
                  : "border-slate-200 text-slate-400 hover:border-slate-300"
              }`}
            >
              Femme
            </button>
          </div>
        </div>

        {/* Age */}
        <div className="mb-6">
          <label htmlFor="age-meta" className="block text-sm font-medium text-slate-600 mb-2">
            Age
          </label>
          <div className="relative">
            <input
              id="age-meta"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-14 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              min="15"
              max="100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              ans
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {[25, 30, 35, 40, 45, 50, 55].map((a) => (
              <button
                key={a}
                onClick={() => setAge(a.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  age === a.toString()
                    ? "bg-violet-50 border-violet-300 text-violet-700"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {a} ans
              </button>
            ))}
          </div>
        </div>

        {/* Poids */}
        <div className="mb-6">
          <label htmlFor="poids-meta" className="block text-sm font-medium text-slate-600 mb-2">
            Poids
          </label>
          <div className="relative">
            <input
              id="poids-meta"
              type="number"
              value={poids}
              onChange={(e) => setPoids(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              min="30"
              max="250"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              kg
            </span>
          </div>
        </div>

        {/* Taille */}
        <div className="mb-6">
          <label htmlFor="taille-meta" className="block text-sm font-medium text-slate-600 mb-2">
            Taille
          </label>
          <div className="relative">
            <input
              id="taille-meta"
              type="number"
              value={taille}
              onChange={(e) => setTaille(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              min="100"
              max="230"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              cm
            </span>
          </div>
        </div>

        {/* Tour de taille */}
        <div className="mb-6">
          <label htmlFor="tour-taille" className="block text-sm font-medium text-slate-600 mb-2">
            Tour de taille
          </label>
          <div className="relative">
            <input
              id="tour-taille"
              type="number"
              value={tourTaille}
              onChange={(e) => setTourTaille(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              min="50"
              max="180"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              cm
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Seuil recommande : {sexe === "homme" ? "94 cm (homme)" : "80 cm (femme)"}
          </p>
        </div>

        {/* Activite physique */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Niveau d&apos;activite physique
          </label>
          <div className="grid grid-cols-5 gap-2">
            {ACTIVITES.map((a) => (
              <button
                key={a.key}
                onClick={() => setActivite(a.key)}
                className={`py-2.5 rounded-xl text-xs font-semibold border transition-all flex flex-col items-center gap-0.5 ${
                  activite === a.key
                    ? "bg-violet-50 border-violet-300 text-violet-700 shadow-sm"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                <span>{a.label}</span>
                <span className="font-normal opacity-70 hidden sm:block">{a.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tabac & Alcool */}
        <div className="grid grid-cols-2 gap-4">
          <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
            tabac ? "bg-orange-50 border-orange-300" : "border-slate-200 hover:border-slate-300"
          }`}>
            <input
              type="checkbox"
              checked={tabac}
              onChange={(e) => setTabac(e.target.checked)}
              className="w-4 h-4 accent-orange-500"
            />
            <div>
              <p className={`text-sm font-semibold ${tabac ? "text-orange-700" : "text-slate-600"}`}>
                Tabac
              </p>
              <p className="text-xs text-slate-400">+2 ans</p>
            </div>
          </label>
          <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
            alcool ? "bg-amber-50 border-amber-300" : "border-slate-200 hover:border-slate-300"
          }`}>
            <input
              type="checkbox"
              checked={alcool}
              onChange={(e) => setAlcool(e.target.checked)}
              className="w-4 h-4 accent-amber-500"
            />
            <div>
              <p className={`text-sm font-semibold ${alcool ? "text-amber-700" : "text-slate-600"}`}>
                Alcool regulier
              </p>
              <p className="text-xs text-slate-400">+1 an</p>
            </div>
          </label>
        </div>
      </div>

      {/* Resultats — 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {/* Carte age metabolique principale */}
        <div className={`rounded-2xl p-6 shadow-lg border-2 ${res && cat ? `${cat.bg} ${cat.border}` : "bg-slate-50 border-slate-200"}`}>
          <p className={`text-sm font-medium mb-1 ${res && cat ? cat.text : "text-slate-400"}`}>
            Age metabolique
          </p>
          <p className={`text-6xl font-extrabold tracking-tight ${res && cat ? cat.text : "text-slate-300"}`}>
            {res ? res.ageMetabolique : "—"}
          </p>
          <p className={`text-lg font-medium mt-1 ${res && cat ? cat.text : "text-slate-400"}`}>ans</p>

          {res && cat && (
            <>
              <div className={`h-px my-4 opacity-30 ${cat.border.replace("border-", "bg-")}`} />
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs font-medium mb-1 ${cat.text} opacity-70`}>
                    Age reel
                  </p>
                  <p className={`text-2xl font-bold ${cat.text}`}>{ageNum} ans</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-medium mb-1 ${cat.text} opacity-70`}>Ecart</p>
                  <p className={`text-2xl font-bold flex items-center gap-1 justify-end ${cat.text}`}>
                    {res.ecart > 0 ? "+" : ""}{res.ecart}
                    <span className="text-lg">{res.ecart > 0 ? "↑" : res.ecart < 0 ? "↓" : "="}</span>
                  </p>
                </div>
              </div>

              {/* Badge categorie */}
              <div className={`mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${cat.bg} border ${cat.border}`}>
                <span className={`w-2 h-2 rounded-full ${cat.dot}`} />
                <span className={`text-sm font-semibold ${cat.text}`}>{cat.label}</span>
              </div>
            </>
          )}
        </div>

        {/* BMR comparison */}
        {res && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-xs font-medium text-slate-400 mb-3">Comparaison BMR</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Votre BMR</p>
                  <p className="text-xs text-slate-400">Mifflin-St Jeor</p>
                </div>
                <p className="text-base font-extrabold text-violet-600">{fmt(res.bmr)} kcal</p>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-semibold text-slate-700">BMR de reference</p>
                  <p className="text-xs text-slate-400">IMC 22 — {ageNum} ans</p>
                </div>
                <p className="text-base font-extrabold text-slate-500">{fmt(res.bmrRef)} kcal</p>
              </div>
              <div className={`flex items-center justify-between pt-2 border-t border-slate-100`}>
                <p className="text-xs font-medium text-slate-500">Ecart BMR</p>
                <p className={`text-sm font-bold ${res.bmr >= res.bmrRef ? "text-emerald-600" : "text-red-500"}`}>
                  {res.bmr >= res.bmrRef ? "+" : ""}{fmt(res.bmr - res.bmrRef)} kcal
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Echelle visuelle */}
        {res && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-xs font-medium text-slate-400 mb-4">Position sur l&apos;echelle</p>
            <div className="relative h-2 bg-gradient-to-r from-emerald-400 via-amber-400 to-red-400 rounded-full mb-6">
              {/* Age reel */}
              <div
                className="absolute -top-1.5 transition-all duration-500"
                style={{ left: `${realPct}%`, transform: "translateX(-50%)" }}
              >
                <div className="w-5 h-5 rounded-full bg-slate-700 border-2 border-white shadow" />
              </div>
              {/* Age metabolique */}
              <div
                className={`absolute -top-1.5 transition-all duration-500`}
                style={{ left: `${metabolicPct}%`, transform: "translateX(-50%)" }}
              >
                <div className={`w-5 h-5 rounded-full border-2 border-white shadow ${cat?.dot ?? "bg-violet-500"}`} />
              </div>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>{scaleMin} ans</span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-700 inline-block" /> Age reel
              </span>
              <span className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full inline-block ${cat?.dot ?? "bg-violet-500"}`} /> Metabolique
              </span>
              <span>{scaleMax} ans</span>
            </div>
          </div>
        )}

        {/* Conseils */}
        {res && res.conseils.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-xs font-medium text-slate-400 mb-3">Conseils personnalises</p>
            <div className="space-y-3">
              {res.conseils.map((conseil, i) => (
                <div key={i} className="flex gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-violet-600 text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{conseil}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          L&apos;age metabolique est une estimation indicative. Consultez un medecin ou
          nutritionniste pour un bilan complet.
        </div>
      </div>
    </div>
  );
}
