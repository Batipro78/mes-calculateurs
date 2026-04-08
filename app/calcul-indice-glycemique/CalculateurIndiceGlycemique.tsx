"use client";

import { useState } from "react";
import { ALIMENTS, calcChargeGlycemique } from "./indiceGlycemiqueCalc";
import type { Aliment, CategorieAliment } from "./indiceGlycemiqueCalc";

const CATEGORIES: { slug: CategorieAliment | "tous"; label: string }[] = [
  { slug: "tous", label: "Tous" },
  { slug: "feculent", label: "Feculents" },
  { slug: "fruit", label: "Fruits" },
  { slug: "legume", label: "Legumes" },
  { slug: "cereale", label: "Cereales" },
  { slug: "sucre", label: "Sucres" },
  { slug: "produit-laitier", label: "Laitiers" },
  { slug: "boisson", label: "Boissons" },
];

type SortKey = "nom" | "ig" | "cg" | "glucides";

function getBadgeIG(ig: number) {
  if (ig <= 55) return { label: "IG Bas", bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" };
  if (ig <= 69) return { label: "IG Moyen", bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500" };
  return { label: "IG Eleve", bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" };
}

function getBadgeCG(cg: number) {
  if (cg <= 10) return { label: "CG Faible", bg: "bg-green-50", text: "text-green-600" };
  if (cg <= 19) return { label: "CG Moyenne", bg: "bg-yellow-50", text: "text-yellow-600" };
  return { label: "CG Elevee", bg: "bg-red-50", text: "text-red-600" };
}

export default function CalculateurIndiceGlycemique() {
  const [search, setSearch] = useState("");
  const [categorie, setCategorie] = useState<CategorieAliment | "tous">("tous");
  const [sortKey, setSortKey] = useState<SortKey>("ig");
  const [sortAsc, setSortAsc] = useState(true);
  const [selected, setSelected] = useState<Aliment | null>(null);

  const filtered = ALIMENTS
    .filter((a) => {
      const matchCat = categorie === "tous" || a.categorie === categorie;
      const matchSearch = a.nom.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      let va = 0;
      let vb = 0;
      if (sortKey === "nom") {
        return sortAsc
          ? a.nom.localeCompare(b.nom)
          : b.nom.localeCompare(a.nom);
      }
      if (sortKey === "ig") { va = a.ig; vb = b.ig; }
      if (sortKey === "glucides") { va = a.glucidesPar100g; vb = b.glucidesPar100g; }
      if (sortKey === "cg") {
        va = calcChargeGlycemique(a.ig, (a.glucidesPar100g * a.portion) / 100).chargeGlycemique;
        vb = calcChargeGlycemique(b.ig, (b.glucidesPar100g * b.portion) / 100).chargeGlycemique;
      }
      return sortAsc ? va - vb : vb - va;
    });

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  }

  function SortArrow({ k }: { k: SortKey }) {
    if (sortKey !== k) return <span className="text-slate-300 ml-1">↕</span>;
    return <span className="text-green-600 ml-1">{sortAsc ? "↑" : "↓"}</span>;
  }

  const selectedCG = selected
    ? calcChargeGlycemique(selected.ig, (selected.glucidesPar100g * selected.portion) / 100)
    : null;

  const glucidesParPortion = selected
    ? Math.round((selected.glucidesPar100g * selected.portion) / 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Rechercher un aliment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategorie(c.slug as CategorieAliment | "tous")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                categorie === c.slug
                  ? "bg-green-50 border-green-400 text-green-700 shadow-sm"
                  : "border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Legende */}
      <div className="flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
          <span className="text-slate-600">IG bas (&le;55)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
          <span className="text-slate-600">IG moyen (56–69)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
          <span className="text-slate-600">IG eleve (&ge;70)</span>
        </div>
        <span className="text-slate-400 ml-2">Cliquer sur un aliment pour le detail</span>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th
                  className="text-left py-3 px-3 text-slate-500 font-medium cursor-pointer hover:text-green-600 transition-colors select-none"
                  onClick={() => handleSort("nom")}
                >
                  Aliment <SortArrow k="nom" />
                </th>
                <th
                  className="text-right py-3 px-3 text-slate-500 font-medium cursor-pointer hover:text-green-600 transition-colors select-none"
                  onClick={() => handleSort("ig")}
                >
                  IG <SortArrow k="ig" />
                </th>
                <th
                  className="text-right py-3 px-3 text-slate-500 font-medium cursor-pointer hover:text-green-600 transition-colors select-none hidden sm:table-cell"
                  onClick={() => handleSort("glucides")}
                >
                  Glucides/100g <SortArrow k="glucides" />
                </th>
                <th
                  className="text-right py-3 px-3 text-slate-500 font-medium cursor-pointer hover:text-green-600 transition-colors select-none"
                  onClick={() => handleSort("cg")}
                >
                  CG/portion <SortArrow k="cg" />
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((aliment) => {
                const glucides = Math.round((aliment.glucidesPar100g * aliment.portion) / 100);
                const res = calcChargeGlycemique(aliment.ig, glucides);
                const badge = getBadgeIG(aliment.ig);
                const isSelected = selected?.slug === aliment.slug;
                return (
                  <tr
                    key={aliment.slug}
                    onClick={() => setSelected(isSelected ? null : aliment)}
                    className={`border-b border-slate-100 cursor-pointer transition-colors last:border-0 ${
                      isSelected ? "bg-green-50/70" : "hover:bg-slate-50"
                    }`}
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${badge.dot}`} />
                        <span className="text-lg leading-none">{aliment.emoji}</span>
                        <div>
                          <span className={`font-medium ${isSelected ? "text-green-700" : "text-slate-700"}`}>
                            {aliment.nom}
                          </span>
                          <span className="text-xs text-slate-400 ml-1.5 hidden sm:inline">
                            ({aliment.portion}g)
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${badge.bg} ${badge.text}`}>
                        {aliment.ig}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-slate-600 hidden sm:table-cell">
                      {aliment.glucidesPar100g}g
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className={`text-xs font-bold ${getBadgeCG(res.chargeGlycemique).text}`}>
                        {res.chargeGlycemique}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-slate-400 text-sm">
                    Aucun aliment trouve. Essayez une autre recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Carte detail */}
      {selected && selectedCG && (
        <div className="bg-white rounded-2xl border border-green-200 shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{selected.emoji}</span>
            <div>
              <h3 className="text-xl font-extrabold text-slate-800">{selected.nom}</h3>
              <span className="text-xs text-slate-400 capitalize">{selected.categorie.replace("-", " ")}</span>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="ml-auto text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Fermer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-xs text-slate-400 mb-1">Indice Glycemique</p>
              <p className={`text-3xl font-extrabold ${getBadgeIG(selected.ig).text}`}>
                {selected.ig}
              </p>
              <p className={`text-xs font-semibold mt-1 px-2 py-0.5 rounded-full inline-block ${getBadgeIG(selected.ig).bg} ${getBadgeIG(selected.ig).text}`}>
                {selectedCG.categorieIG === "bas" ? "Bas" : selectedCG.categorieIG === "moyen" ? "Moyen" : "Eleve"}
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-xs text-slate-400 mb-1">Charge Glyc./portion</p>
              <p className={`text-3xl font-extrabold ${getBadgeCG(selectedCG.chargeGlycemique).text}`}>
                {selectedCG.chargeGlycemique}
              </p>
              <p className={`text-xs font-semibold mt-1 px-2 py-0.5 rounded-full inline-block ${getBadgeCG(selectedCG.chargeGlycemique).bg} ${getBadgeCG(selectedCG.chargeGlycemique).text}`}>
                {selectedCG.categorieCG === "faible" ? "Faible" : selectedCG.categorieCG === "moyenne" ? "Moyenne" : "Elevee"}
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-xs text-slate-400 mb-1">Glucides/100g</p>
              <p className="text-3xl font-extrabold text-slate-700">{selected.glucidesPar100g}g</p>
              <p className="text-xs text-slate-400 mt-1">teneur brute</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-xs text-slate-400 mb-1">Portion de reference</p>
              <p className="text-3xl font-extrabold text-slate-700">{selected.portion}g</p>
              <p className="text-xs text-slate-400 mt-1">{glucidesParPortion}g de glucides</p>
            </div>
          </div>

          {/* Calcul CG */}
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="text-sm font-semibold text-green-800 mb-2">Calcul de la Charge Glycemique</p>
            <p className="text-xs text-green-700 font-mono">
              CG = (IG x glucides par portion) / 100 = ({selected.ig} x {glucidesParPortion}) / 100 = <strong>{selectedCG.chargeGlycemique}</strong>
            </p>
          </div>

          <div className="mt-4 text-xs text-slate-400 leading-relaxed">
            Une charge glycemique &le;10 est faible, 11-19 est moyenne, &ge;20 est elevee.
            La CG tient compte a la fois de l&apos;IG et de la quantite de glucides dans la portion reelle.
          </div>

          <a
            href={`/calcul-indice-glycemique/${selected.slug}`}
            className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
          >
            Voir la page detaillee pour {selected.nom}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
