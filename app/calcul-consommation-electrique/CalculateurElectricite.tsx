"use client";

import { useState } from "react";

interface AppareilPredefini {
  nom: string;
  emoji: string;
  puissance: number;
  heuresDefaut: number;
}

interface AppareilListe {
  id: number;
  nom: string;
  emoji: string;
  puissance: number;
  heuresJour: number;
}

const APPAREILS_PREDEFINIS: AppareilPredefini[] = [
  { nom: "Ampoule LED", emoji: "\u{1F4A1}", puissance: 9, heuresDefaut: 5 },
  { nom: "Televiseur", emoji: "\u{1F4FA}", puissance: 120, heuresDefaut: 4 },
  { nom: "Ordinateur portable", emoji: "\u{1F4BB}", puissance: 50, heuresDefaut: 6 },
  { nom: "PC Gamer", emoji: "\u{1F3AE}", puissance: 350, heuresDefaut: 4 },
  { nom: "PS5", emoji: "\u{1F579}\uFE0F", puissance: 200, heuresDefaut: 3 },
  { nom: "Xbox Series X", emoji: "\u{1F3AE}", puissance: 200, heuresDefaut: 3 },
  { nom: "Lave-linge", emoji: "\u{1F9FA}", puissance: 1200, heuresDefaut: 1 },
  { nom: "Lave-vaisselle", emoji: "\u{1F37D}\uFE0F", puissance: 1400, heuresDefaut: 1 },
  { nom: "Radiateur electrique", emoji: "\u{1F525}", puissance: 1500, heuresDefaut: 8 },
  { nom: "Refrigerateur", emoji: "\u{2744}\uFE0F", puissance: 150, heuresDefaut: 24 },
  { nom: "Four electrique", emoji: "\u{1F373}", puissance: 2500, heuresDefaut: 1 },
  { nom: "Micro-ondes", emoji: "\u{1F4E1}", puissance: 1000, heuresDefaut: 0.5 },
  { nom: "Plaque induction", emoji: "\u{1F372}", puissance: 2500, heuresDefaut: 1 },
  { nom: "Seche-cheveux", emoji: "\u{1F4A8}", puissance: 1800, heuresDefaut: 0.5 },
  { nom: "Climatisation", emoji: "\u{2744}\uFE0F", puissance: 2000, heuresDefaut: 6 },
  { nom: "Pompe a chaleur", emoji: "\u{1F321}\uFE0F", puissance: 1500, heuresDefaut: 10 },
  { nom: "Aspirateur", emoji: "\u{1F9F9}", puissance: 1800, heuresDefaut: 0.5 },
  { nom: "Box internet", emoji: "\u{1F4F6}", puissance: 15, heuresDefaut: 24 },
  { nom: "Chargeur telephone", emoji: "\u{1F50B}", puissance: 20, heuresDefaut: 2 },
  { nom: "Borne recharge VE", emoji: "\u{1F697}", puissance: 7400, heuresDefaut: 4 },
];

// Tarifs EDF 2026
const TARIF_BASE = 0.2516;
const TARIF_HP = 0.27;
const TARIF_HC = 0.2068;

type OptionTarif = "base" | "hphc";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

let nextId = 1;

export default function CalculateurElectricite() {
  // Mode calcul rapide
  const [puissance, setPuissance] = useState("1500");
  const [heuresJour, setHeuresJour] = useState("8");
  const [appareilActif, setAppareilActif] = useState<number | null>(8); // Radiateur

  // Option tarifaire
  const [optionTarif, setOptionTarif] = useState<OptionTarif>("base");
  const [heuresHP, setHeuresHP] = useState("16");
  const [heuresHC, setHeuresHC] = useState("8");

  // Multi-appareils
  const [listeAppareils, setListeAppareils] = useState<AppareilListe[]>([]);

  const puissanceNum = parseFloat(puissance) || 0;
  const heuresNum = parseFloat(heuresJour) || 0;
  const heuresHPNum = parseFloat(heuresHP) || 0;
  const heuresHCNum = parseFloat(heuresHC) || 0;

  // --- Calculs rapide (un seul appareil) ---
  const consoJourKwh = (puissanceNum * heuresNum) / 1000;
  const consoMoisKwh = consoJourKwh * 30;
  const consoAnKwh = consoJourKwh * 365;

  function calculerCout(consoKwh: number) {
    if (optionTarif === "base") {
      return consoKwh * TARIF_BASE;
    }
    const totalH = heuresHPNum + heuresHCNum;
    if (totalH === 0) return 0;
    const ratioHP = heuresHPNum / totalH;
    const ratioHC = heuresHCNum / totalH;
    return consoKwh * (ratioHP * TARIF_HP + ratioHC * TARIF_HC);
  }

  function calculerCoutBase(consoKwh: number) {
    return consoKwh * TARIF_BASE;
  }

  function calculerCoutHPHC(consoKwh: number) {
    const totalH = heuresHPNum + heuresHCNum;
    if (totalH === 0) return 0;
    const ratioHP = heuresHPNum / totalH;
    const ratioHC = heuresHCNum / totalH;
    return consoKwh * (ratioHP * TARIF_HP + ratioHC * TARIF_HC);
  }

  const coutJour = calculerCout(consoJourKwh);
  const coutMois = calculerCout(consoMoisKwh);
  const coutAn = calculerCout(consoAnKwh);

  // Comparaison Base vs HP/HC
  const coutAnBase = calculerCoutBase(consoAnKwh);
  const coutAnHPHC = calculerCoutHPHC(consoAnKwh);
  const economie = coutAnBase - coutAnHPHC;

  // --- Multi-appareils ---
  function ajouterAppareil() {
    const ap = appareilActif !== null ? APPAREILS_PREDEFINIS[appareilActif] : null;
    const newAppareil: AppareilListe = {
      id: nextId++,
      nom: ap ? `${ap.emoji} ${ap.nom}` : "Appareil personnalise",
      emoji: ap ? ap.emoji : "\u{1F50C}",
      puissance: puissanceNum,
      heuresJour: heuresNum,
    };
    setListeAppareils([...listeAppareils, newAppareil]);
  }

  function supprimerAppareil(id: number) {
    setListeAppareils(listeAppareils.filter((a) => a.id !== id));
  }

  function coutAppareil(a: AppareilListe) {
    const consoMois = (a.puissance * a.heuresJour * 30) / 1000;
    return calculerCout(consoMois);
  }

  const totalConsoMois = listeAppareils.reduce(
    (acc, a) => acc + (a.puissance * a.heuresJour * 30) / 1000,
    0
  );
  const totalCoutMois = listeAppareils.reduce((acc, a) => acc + coutAppareil(a), 0);
  const totalCoutAn = totalCoutMois * 12;

  function selectAppareil(index: number) {
    setAppareilActif(index);
    setPuissance(APPAREILS_PREDEFINIS[index].puissance.toString());
    setHeuresJour(APPAREILS_PREDEFINIS[index].heuresDefaut.toString());
  }

  return (
    <div className="space-y-8">
      {/* Toggle Base / HP-HC */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-600 mb-3">Option tarifaire</p>
        <div className="flex gap-2">
          <button
            onClick={() => setOptionTarif("base")}
            className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-colors ${
              optionTarif === "base"
                ? "bg-yellow-50 border-yellow-400 text-yellow-800"
                : "border-slate-200 text-slate-500 hover:border-slate-300"
            }`}
          >
            Option Base
            <span className="block text-xs font-normal mt-0.5">
              {TARIF_BASE} EUR/kWh (tarif unique)
            </span>
          </button>
          <button
            onClick={() => setOptionTarif("hphc")}
            className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-colors ${
              optionTarif === "hphc"
                ? "bg-blue-50 border-blue-400 text-blue-800"
                : "border-slate-200 text-slate-500 hover:border-slate-300"
            }`}
          >
            Option HP / HC
            <span className="block text-xs font-normal mt-0.5">
              HP {TARIF_HP} EUR + HC {TARIF_HC} EUR/kWh
            </span>
          </button>
        </div>

        {optionTarif === "hphc" && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Heures Pleines (par jour)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={heuresHP}
                  onChange={(e) => setHeuresHP(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-lg font-semibold pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  max="24"
                  step="1"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">h</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Heures Creuses (par jour)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={heuresHC}
                  onChange={(e) => setHeuresHC(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-lg font-semibold pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  max="24"
                  step="1"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">h</span>
              </div>
            </div>
            <p className="col-span-2 text-xs text-slate-400">
              En general : 16h en Heures Pleines et 8h en Heures Creuses (souvent de 22h a 6h).
            </p>
          </div>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Formulaire - 3 cols */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          {/* Appareils predefinis */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Appareil (raccourci)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-64 overflow-y-auto pr-1">
              {APPAREILS_PREDEFINIS.map((a, i) => (
                <button
                  key={a.nom}
                  onClick={() => selectAppareil(i)}
                  className={`px-2.5 py-2 rounded-lg text-xs font-medium border text-left transition-colors ${
                    appareilActif === i
                      ? "bg-yellow-50 border-yellow-400 text-yellow-800"
                      : "border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  <span className="mr-1">{a.emoji}</span>
                  {a.nom}
                  <span className="block text-slate-400 mt-0.5">
                    {a.puissance} W &middot; {a.heuresDefaut}h/j
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Puissance */}
          <div className="mb-6">
            <label
              htmlFor="puissance"
              className="block text-sm font-medium text-slate-600 mb-2"
            >
              Puissance de l&apos;appareil
            </label>
            <div className="relative">
              <input
                id="puissance"
                type="number"
                value={puissance}
                onChange={(e) => {
                  setPuissance(e.target.value);
                  setAppareilActif(null);
                }}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                min="0"
                step="10"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                W
              </span>
            </div>
          </div>

          {/* Heures par jour */}
          <div className="mb-6">
            <label
              htmlFor="heures"
              className="block text-sm font-medium text-slate-600 mb-2"
            >
              Utilisation par jour
            </label>
            <div className="relative">
              <input
                id="heures"
                type="number"
                value={heuresJour}
                onChange={(e) => setHeuresJour(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                min="0"
                max="24"
                step="0.5"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                h/jour
              </span>
            </div>
            <div className="flex gap-2 mt-2">
              {[1, 3, 5, 8, 12, 24].map((h) => (
                <button
                  key={h}
                  onClick={() => setHeuresJour(h.toString())}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                    heuresJour === h.toString()
                      ? "bg-yellow-50 border-yellow-400 text-yellow-800"
                      : "border-slate-200 text-slate-400 hover:border-slate-300"
                  }`}
                >
                  {h}h
                </button>
              ))}
            </div>
          </div>

          {/* Bouton ajouter a la liste */}
          <button
            onClick={ajouterAppareil}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            + Ajouter a ma liste
          </button>
        </div>

        {/* Resultats - 2 cols */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-2xl p-6 shadow-lg shadow-yellow-200/50">
            <p className="text-sm text-yellow-100 mb-1">Cout par mois</p>
            <p className="text-4xl font-extrabold tracking-tight">
              {fmt(coutMois)}{" "}
              <span className="text-lg font-semibold">EUR</span>
            </p>
            <div className="h-px bg-white/20 my-4" />
            <div className="flex justify-between text-sm">
              <span className="text-yellow-200">Consommation</span>
              <span className="font-semibold">{fmt(consoMoisKwh)} kWh/mois</span>
            </div>
          </div>

          {/* Par jour / par an */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className="text-xs text-slate-400 mb-1">Par jour</p>
              <p className="text-lg font-extrabold text-slate-800">
                {fmt(coutJour)} EUR
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {fmt(consoJourKwh)} kWh
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className="text-xs text-slate-400 mb-1">Par an</p>
              <p className="text-lg font-extrabold text-slate-800">
                {fmt(coutAn)} EUR
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {fmt(consoAnKwh)} kWh
              </p>
            </div>
          </div>

          {/* Comparaison Base vs HP/HC */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-600 mb-3">Comparaison annuelle</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Option Base</span>
                <span className={`text-sm font-bold ${optionTarif === "base" ? "text-yellow-600" : "text-slate-800"}`}>
                  {fmt(coutAnBase)} EUR/an
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Option HP/HC</span>
                <span className={`text-sm font-bold ${optionTarif === "hphc" ? "text-blue-600" : "text-slate-800"}`}>
                  {fmt(coutAnHPHC)} EUR/an
                </span>
              </div>
              <div className="h-px bg-slate-100" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Economie HP/HC</span>
                <span className={`text-sm font-bold ${economie > 0 ? "text-green-600" : "text-red-500"}`}>
                  {economie > 0 ? "+" : ""}{fmt(economie)} EUR/an
                </span>
              </div>
            </div>
            {economie > 0 ? (
              <p className="text-xs text-green-600 mt-2">
                L&apos;option HP/HC est avantageuse pour cet appareil.
              </p>
            ) : (
              <p className="text-xs text-slate-400 mt-2">
                L&apos;option Base est plus avantageuse pour cet appareil.
              </p>
            )}
          </div>

          {/* Resume */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600 mb-4">Resume</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Puissance</span>
                <span className="text-sm font-bold text-slate-800">
                  {puissanceNum} W ({fmt(puissanceNum / 1000)} kW)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Utilisation</span>
                <span className="text-sm font-bold text-slate-800">
                  {heuresNum}h / jour
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Tarif</span>
                <span className="text-sm font-bold text-slate-800">
                  {optionTarif === "base"
                    ? `${TARIF_BASE} EUR/kWh (Base)`
                    : `HP ${TARIF_HP} / HC ${TARIF_HC} EUR/kWh`}
                </span>
              </div>
              <div className="h-px bg-slate-100" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Conso journaliere</span>
                <span className="text-sm font-bold text-yellow-600">
                  {fmt(consoJourKwh)} kWh
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
            Estimation basee sur les tarifs EDF Bleu 2026. Votre tarif reel
            peut varier selon votre contrat et votre fournisseur.
          </div>
        </div>
      </div>

      {/* Section Multi-Appareils */}
      {listeAppareils.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Ma liste d&apos;appareils
          </h2>

          <div className="space-y-2">
            {listeAppareils.map((a) => {
              const coutM = coutAppareil(a);
              const consoM = (a.puissance * a.heuresJour * 30) / 1000;
              return (
                <div
                  key={a.id}
                  className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {a.nom}
                    </p>
                    <p className="text-xs text-slate-400">
                      {a.puissance} W &middot; {a.heuresJour}h/jour &middot; {fmt(consoM)} kWh/mois
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-bold text-slate-800">
                      {fmt(coutM)} EUR/mois
                    </p>
                  </div>
                  <button
                    onClick={() => supprimerAppareil(a.id)}
                    className="ml-3 text-red-400 hover:text-red-600 text-lg"
                    title="Supprimer"
                  >
                    &times;
                  </button>
                </div>
              );
            })}
          </div>

          {/* Total */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Total : {listeAppareils.length} appareil{listeAppareils.length > 1 ? "s" : ""}
                </p>
                <p className="text-xs text-slate-400">
                  {fmt(totalConsoMois)} kWh/mois &middot; {fmt(totalConsoMois * 12)} kWh/an
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-extrabold text-yellow-600">
                  {fmt(totalCoutMois)} EUR/mois
                </p>
                <p className="text-sm text-slate-500">
                  {fmt(totalCoutAn)} EUR/an
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
