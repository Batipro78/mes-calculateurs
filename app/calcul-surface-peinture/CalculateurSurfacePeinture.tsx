"use client";

import { useState } from "react";

interface Mur {
  id: number;
  largeur: string;
  hauteur: string;
}

interface Ouverture {
  id: number;
  type: "porte" | "fenetre" | "custom";
  largeur: string;
  hauteur: string;
}

const RENDEMENTS: { label: string; m2ParLitre: number; desc: string }[] = [
  { label: "Peinture acrylique (mur)", m2ParLitre: 10, desc: "~10 m²/L" },
  { label: "Peinture glycero (boiserie)", m2ParLitre: 12, desc: "~12 m²/L" },
  { label: "Sous-couche / Primaire", m2ParLitre: 8, desc: "~8 m²/L" },
  { label: "Peinture plafond", m2ParLitre: 9, desc: "~9 m²/L" },
  { label: "Lasure bois", m2ParLitre: 10, desc: "~10 m²/L" },
];

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

let nextMurId = 2;
let nextOuvId = 1;

export default function CalculateurSurfacePeinture() {
  const [murs, setMurs] = useState<Mur[]>([
    { id: 1, largeur: "5", hauteur: "2.5" },
  ]);
  const [ouvertures, setOuvertures] = useState<Ouverture[]>([]);
  const [nbCouches, setNbCouches] = useState("2");
  const [rendementIdx, setRendementIdx] = useState(0);
  const [prixLitre, setPrixLitre] = useState("25");
  const [inclurePlafond, setInclurePlafond] = useState(false);
  const [longueurPiece, setLongueurPiece] = useState("5");
  const [largeurPiece, setLargeurPiece] = useState("4");

  const ajouterMur = () => {
    setMurs([...murs, { id: nextMurId++, largeur: "", hauteur: "2.5" }]);
  };

  const supprimerMur = (id: number) => {
    if (murs.length > 1) setMurs(murs.filter((m) => m.id !== id));
  };

  const updateMur = (id: number, field: "largeur" | "hauteur", val: string) => {
    setMurs(murs.map((m) => (m.id === id ? { ...m, [field]: val } : m)));
  };

  const ajouterOuverture = (type: "porte" | "fenetre" | "custom") => {
    const defaults = {
      porte: { largeur: "0.9", hauteur: "2.1" },
      fenetre: { largeur: "1.2", hauteur: "1.2" },
      custom: { largeur: "", hauteur: "" },
    };
    setOuvertures([
      ...ouvertures,
      { id: nextOuvId++, type, ...defaults[type] },
    ]);
  };

  const supprimerOuverture = (id: number) => {
    setOuvertures(ouvertures.filter((o) => o.id !== id));
  };

  const updateOuverture = (
    id: number,
    field: "largeur" | "hauteur",
    val: string
  ) => {
    setOuvertures(
      ouvertures.map((o) => (o.id === id ? { ...o, [field]: val } : o))
    );
  };

  // Calculs
  const surfaceMurs = murs.reduce((acc, m) => {
    return acc + (parseFloat(m.largeur) || 0) * (parseFloat(m.hauteur) || 0);
  }, 0);

  const surfaceOuvertures = ouvertures.reduce((acc, o) => {
    return acc + (parseFloat(o.largeur) || 0) * (parseFloat(o.hauteur) || 0);
  }, 0);

  const surfacePlafond = inclurePlafond
    ? (parseFloat(longueurPiece) || 0) * (parseFloat(largeurPiece) || 0)
    : 0;

  const surfaceNette = Math.max(0, surfaceMurs - surfaceOuvertures + surfacePlafond);
  const couches = parseInt(nbCouches) || 2;
  const surfaceTotale = surfaceNette * couches;
  const rendement = RENDEMENTS[rendementIdx].m2ParLitre;
  const litresNecessaires = surfaceTotale / rendement;
  const prixTotal = litresNecessaires * (parseFloat(prixLitre) || 0);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Murs */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-3">
            Murs a peindre
          </label>
          <div className="space-y-3">
            {murs.map((mur, i) => (
              <div key={mur.id} className="flex items-center gap-2">
                <span className="text-xs text-slate-400 w-16">
                  Mur {i + 1}
                </span>
                <input
                  type="number"
                  value={mur.largeur}
                  onChange={(e) => updateMur(mur.id, "largeur", e.target.value)}
                  placeholder="Largeur"
                  className="flex-1 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                  step="0.1"
                  min="0"
                />
                <span className="text-slate-400 text-sm">x</span>
                <input
                  type="number"
                  value={mur.hauteur}
                  onChange={(e) => updateMur(mur.id, "hauteur", e.target.value)}
                  placeholder="Hauteur"
                  className="flex-1 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                  step="0.1"
                  min="0"
                />
                <span className="text-xs text-slate-400">m</span>
                {murs.length > 1 && (
                  <button
                    onClick={() => supprimerMur(mur.id)}
                    className="text-red-400 hover:text-red-600 p-1"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={ajouterMur}
            className="mt-3 text-sm text-fuchsia-600 font-medium hover:text-fuchsia-700"
          >
            + Ajouter un mur
          </button>
        </div>

        {/* Ouvertures */}
        <div className="mb-6 pt-5 border-t border-slate-100">
          <label className="block text-sm font-medium text-slate-600 mb-3">
            Ouvertures a deduire
          </label>
          {ouvertures.length > 0 && (
            <div className="space-y-3 mb-3">
              {ouvertures.map((ouv) => (
                <div key={ouv.id} className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 w-16 capitalize">
                    {ouv.type}
                  </span>
                  <input
                    type="number"
                    value={ouv.largeur}
                    onChange={(e) =>
                      updateOuverture(ouv.id, "largeur", e.target.value)
                    }
                    placeholder="L"
                    className="flex-1 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                    step="0.1"
                    min="0"
                  />
                  <span className="text-slate-400 text-sm">x</span>
                  <input
                    type="number"
                    value={ouv.hauteur}
                    onChange={(e) =>
                      updateOuverture(ouv.id, "hauteur", e.target.value)
                    }
                    placeholder="H"
                    className="flex-1 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                    step="0.1"
                    min="0"
                  />
                  <span className="text-xs text-slate-400">m</span>
                  <button
                    onClick={() => supprimerOuverture(ouv.id)}
                    className="text-red-400 hover:text-red-600 p-1"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => ajouterOuverture("porte")}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
            >
              + Porte (0.9x2.1m)
            </button>
            <button
              onClick={() => ajouterOuverture("fenetre")}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
            >
              + Fenetre (1.2x1.2m)
            </button>
            <button
              onClick={() => ajouterOuverture("custom")}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
            >
              + Autre
            </button>
          </div>
        </div>

        {/* Plafond */}
        <div className="mb-6 pt-5 border-t border-slate-100">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={inclurePlafond}
              onChange={(e) => setInclurePlafond(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-fuchsia-600 focus:ring-fuchsia-500"
            />
            <span className="text-sm font-medium text-slate-600">
              Inclure le plafond
            </span>
          </label>
          {inclurePlafond && (
            <div className="flex items-center gap-2 mt-3 ml-7">
              <input
                type="number"
                value={longueurPiece}
                onChange={(e) => setLongueurPiece(e.target.value)}
                placeholder="Longueur"
                className="flex-1 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                step="0.1"
                min="0"
              />
              <span className="text-slate-400 text-sm">x</span>
              <input
                type="number"
                value={largeurPiece}
                onChange={(e) => setLargeurPiece(e.target.value)}
                placeholder="Largeur"
                className="flex-1 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                step="0.1"
                min="0"
              />
              <span className="text-xs text-slate-400">m</span>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="pt-5 border-t border-slate-100 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Type de peinture
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {RENDEMENTS.map((r, i) => (
                <button
                  key={r.label}
                  onClick={() => setRendementIdx(i)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    rendementIdx === i
                      ? "border-fuchsia-500 bg-fuchsia-50/50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="text-sm font-bold text-slate-800">
                    {r.label}
                  </span>
                  <span className="block text-xs text-slate-400">{r.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Nombre de couches
              </label>
              <select
                value={nbCouches}
                onChange={(e) => setNbCouches(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
              >
                <option value="1">1 couche</option>
                <option value="2">2 couches</option>
                <option value="3">3 couches</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Prix au litre
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={prixLitre}
                  onChange={(e) => setPrixLitre(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm font-semibold pr-14 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                  step="1"
                  min="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                  EUR/L
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white rounded-2xl p-6 shadow-lg shadow-fuchsia-200/50">
          <p className="text-sm text-fuchsia-100 mb-1">Surface a peindre</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(surfaceNette)}{" "}
            <span className="text-lg font-semibold">m&sup2;</span>
          </p>
          <p className="text-sm text-fuchsia-200 mt-2">
            {couches} couche{couches > 1 ? "s" : ""} = {fmt(surfaceTotale)} m&sup2;
            a couvrir
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-4">Detail</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Surface murs</span>
              <span className="font-bold text-slate-800">
                {fmt(surfaceMurs)} m&sup2;
              </span>
            </div>
            {surfaceOuvertures > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Ouvertures</span>
                <span className="font-bold text-red-500">
                  - {fmt(surfaceOuvertures)} m&sup2;
                </span>
              </div>
            )}
            {surfacePlafond > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Plafond</span>
                <span className="font-bold text-slate-800">
                  + {fmt(surfacePlafond)} m&sup2;
                </span>
              </div>
            )}
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">
                Surface nette
              </span>
              <span className="font-extrabold text-slate-800">
                {fmt(surfaceNette)} m&sup2;
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-4">
            Quantite et budget
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Peinture necessaire</span>
              <span className="text-lg font-bold text-slate-800">
                {fmt(litresNecessaires)} L
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">
                Pots de 2.5L
              </span>
              <span className="font-bold text-slate-800">
                {Math.ceil(litresNecessaires / 2.5)} pot{Math.ceil(litresNecessaires / 2.5) > 1 ? "s" : ""}
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">
                Budget estime
              </span>
              <span className="text-xl font-extrabold text-fuchsia-600">
                {fmt(prixTotal)} EUR
              </span>
            </div>
          </div>
        </div>

        <div className="bg-fuchsia-50 rounded-2xl border border-fuchsia-200 p-4">
          <p className="text-xs text-fuchsia-700">
            Prevoyez 10 a 15% de peinture en plus pour les pertes et retouches.
            Le rendement reel depend de la porosite du support et de la methode
            d&apos;application (rouleau, pinceau, pistolet).
          </p>
        </div>
      </div>
    </div>
  );
}
