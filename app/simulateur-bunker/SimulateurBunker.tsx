"use client";

import { useState, useMemo } from "react";

/* ─── Types de bunkers ─── */
const TYPES_BUNKER = [
  {
    id: "basique",
    nom: "Basique",
    description: "Abri souterrain simple, protection tempete/tornade",
    prixM2: 1500,
    emoji: "🏚️",
  },
  {
    id: "standard",
    nom: "Standard",
    description: "Bunker beton arme, filtration air, autonomie complete",
    prixM2: 3000,
    emoji: "🏗️",
  },
  {
    id: "nrbc",
    nom: "NRBC (Nucleaire)",
    description: "Protection nucleaire/radiologique/biologique/chimique",
    prixM2: 5500,
    emoji: "☢️",
  },
  {
    id: "luxe",
    nom: "Luxe / Survivaliste",
    description: "Bunker haut de gamme, confort total, systemes redondants",
    prixM2: 10000,
    emoji: "💎",
  },
];

/* ─── Durees preselectionnees ─── */
const DUREES = [
  { id: "2s", label: "2 semaines", jours: 14 },
  { id: "1m", label: "1 mois", jours: 30 },
  { id: "3m", label: "3 mois", jours: 90 },
  { id: "6m", label: "6 mois", jours: 180 },
  { id: "1a", label: "1 an", jours: 365 },
  { id: "2a", label: "2 ans", jours: 730 },
];

/* ─── Constantes de calcul ─── */
const EAU_PAR_JOUR_PAR_PERSONNE = 3; // litres (survie + hygiene minimale)
const CALORIES_PAR_JOUR = 2000;
const PRIX_RATION_SURVIE_JOUR = 8; // euros par personne par jour (rations longue conservation)
const PRIX_EAU_LITRE_STOCKE = 0.5; // euros (conteneurs + eau)
const SURFACE_MIN_PAR_PERSONNE = 5; // m2 (espace vital minimum)
const SURFACE_COMMUNE_BASE = 10; // m2 (sanitaires, cuisine, stockage de base)
const VOLUME_STOCKAGE_PAR_JOUR_PERSONNE = 0.015; // m3 (nourriture)

/* ─── Equipements fixes par type ─── */
function getEquipements(type: string, personnes: number, jours: number) {
  const base = [
    { nom: "Porte blindee anti-souffle", prix: type === "basique" ? 2500 : type === "standard" ? 5000 : type === "nrbc" ? 12000 : 20000 },
    { nom: "Ventilation / filtration air", prix: type === "basique" ? 1500 : type === "standard" ? 4000 : type === "nrbc" ? 15000 : 25000 },
    { nom: "Systeme electrique (batteries + generateur)", prix: type === "basique" ? 3000 : type === "standard" ? 8000 : type === "nrbc" ? 18000 : 35000 },
    { nom: "Sanitaires (WC chimiques / compost)", prix: type === "basique" ? 800 : type === "standard" ? 2500 : type === "nrbc" ? 5000 : 12000 },
    { nom: "Couchages (" + personnes + " pers.)", prix: personnes * (type === "luxe" ? 1500 : type === "nrbc" ? 600 : 300) },
    { nom: "Kit medical + pharmacie", prix: type === "basique" ? 200 : type === "standard" ? 500 : 1500 },
    { nom: "Communication (radio, talkie-walkie)", prix: type === "basique" ? 150 : type === "standard" ? 500 : 2000 },
  ];

  if (type === "nrbc" || type === "luxe") {
    base.push({ nom: "Filtration NRBC (anti-radiation)", prix: type === "luxe" ? 30000 : 20000 });
    base.push({ nom: "Compteur Geiger + dosimetres", prix: 800 });
  }

  if (type === "luxe") {
    base.push({ nom: "Panneaux solaires + onduleur", prix: 12000 });
    base.push({ nom: "Systeme hydroponique (culture)", prix: 8000 });
    base.push({ nom: "Purification eau avancee (osmose)", prix: 5000 });
    base.push({ nom: "Divertissement (livres, jeux, ecran)", prix: 2000 });
    base.push({ nom: "Surveillance cameras + intercom", prix: 3500 });
  }

  if (jours > 90) {
    base.push({ nom: "Reservoir eau supplementaire (" + Math.round(personnes * EAU_PAR_JOUR_PAR_PERSONNE * jours / 1000) + " m3)", prix: Math.round(personnes * EAU_PAR_JOUR_PAR_PERSONNE * jours * 0.3) });
  }

  return base;
}

/* ─── Formatage prix ─── */
function formatPrix(n: number): string {
  return n.toLocaleString("fr-FR") + " €";
}

export default function SimulateurBunker() {
  const [personnes, setPersonnes] = useState(4);
  const [dureeId, setDureeId] = useState("3m");
  const [typeId, setTypeId] = useState("standard");

  const duree = DUREES.find((d) => d.id === dureeId)!;
  const typeBunker = TYPES_BUNKER.find((t) => t.id === typeId)!;

  const resultats = useMemo(() => {
    const jours = duree.jours;

    // Surface
    const surfaceVie = personnes * SURFACE_MIN_PAR_PERSONNE;
    const surfaceStockage = Math.ceil(personnes * VOLUME_STOCKAGE_PAR_JOUR_PERSONNE * jours / 2.5); // hauteur 2.5m
    const surfaceTotale = surfaceVie + SURFACE_COMMUNE_BASE + surfaceStockage;

    // Construction
    const prixConstruction = Math.round(surfaceTotale * typeBunker.prixM2);

    // Eau
    const litresEauTotal = personnes * EAU_PAR_JOUR_PAR_PERSONNE * jours;
    const prixEau = Math.round(litresEauTotal * PRIX_EAU_LITRE_STOCKE);

    // Nourriture
    const prixNourriture = Math.round(personnes * PRIX_RATION_SURVIE_JOUR * jours);
    const caloriesTotal = personnes * CALORIES_PAR_JOUR * jours;

    // Equipements
    const equipements = getEquipements(typeId, personnes, jours);
    const prixEquipements = equipements.reduce((acc, e) => acc + e.prix, 0);

    // Total
    const prixTotal = prixConstruction + prixEau + prixNourriture + prixEquipements;

    return {
      surfaceVie,
      surfaceStockage,
      surfaceTotale,
      prixConstruction,
      litresEauTotal,
      prixEau,
      prixNourriture,
      caloriesTotal,
      equipements,
      prixEquipements,
      prixTotal,
      jours,
    };
  }, [personnes, duree, typeBunker, typeId]);

  // Pourcentages pour la jauge de repartition
  const pctConstruction = Math.round((resultats.prixConstruction / resultats.prixTotal) * 100);
  const pctEquipements = Math.round((resultats.prixEquipements / resultats.prixTotal) * 100);
  const pctNourriture = Math.round((resultats.prixNourriture / resultats.prixTotal) * 100);
  const pctEau = 100 - pctConstruction - pctEquipements - pctNourriture;

  return (
    <div className="space-y-6">
      {/* ── Controles ── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Nombre de personnes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Nombre de personnes
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={1}
              max={20}
              value={personnes}
              onChange={(e) => setPersonnes(Number(e.target.value))}
              className="flex-1 accent-amber-600"
            />
            <span className="text-2xl font-bold text-amber-700 w-10 text-center">
              {personnes}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            De 1 (solo) a 20 (famille elargie / groupe)
          </p>
        </div>

        {/* Duree d'autonomie */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Duree d&apos;autonomie
          </label>
          <div className="grid grid-cols-3 gap-2">
            {DUREES.map((d) => (
              <button
                key={d.id}
                onClick={() => setDureeId(d.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  dureeId === d.id
                    ? "bg-amber-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resultat total */}
        <div className="bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl p-6 text-white">
          <p className="text-sm font-medium text-amber-100 mb-1">Budget total estime</p>
          <p className="text-3xl font-extrabold">{formatPrix(resultats.prixTotal)}</p>
          <div className="mt-3 space-y-1 text-sm text-amber-100">
            <p>{resultats.surfaceTotale} m² de surface totale</p>
            <p>{Math.round(resultats.litresEauTotal / 1000 * 10) / 10} m³ d&apos;eau stockee</p>
            <p>{(resultats.caloriesTotal / 1000000).toFixed(1)}M calories de rations</p>
          </div>
          <div className="mt-3 pt-3 border-t border-amber-500/30">
            <p className="text-xs text-amber-200">
              {formatPrix(Math.round(resultats.prixTotal / personnes))} par personne
            </p>
          </div>
        </div>
      </div>

      {/* ── Type de bunker ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TYPES_BUNKER.map((t) => (
          <button
            key={t.id}
            onClick={() => setTypeId(t.id)}
            className={`text-left rounded-2xl border-2 p-5 transition-all ${
              typeId === t.id
                ? "border-amber-500 bg-amber-50 shadow-lg shadow-amber-100"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <span className="text-2xl">{t.emoji}</span>
            <p className="font-bold text-slate-800 mt-2">{t.nom}</p>
            <p className="text-xs text-slate-500 mt-1">{t.description}</p>
            <p className="text-sm font-semibold text-amber-700 mt-2">
              {formatPrix(t.prixM2)} / m²
            </p>
          </button>
        ))}
      </div>

      {/* ── Repartition du budget ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-4">Repartition du budget</h3>
        <div className="flex rounded-full overflow-hidden h-6 mb-4">
          <div className="bg-amber-600 flex items-center justify-center text-[10px] font-bold text-white" style={{ width: pctConstruction + "%" }}>
            {pctConstruction > 8 ? pctConstruction + "%" : ""}
          </div>
          <div className="bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white" style={{ width: pctEquipements + "%" }}>
            {pctEquipements > 8 ? pctEquipements + "%" : ""}
          </div>
          <div className="bg-green-500 flex items-center justify-center text-[10px] font-bold text-white" style={{ width: pctNourriture + "%" }}>
            {pctNourriture > 8 ? pctNourriture + "%" : ""}
          </div>
          <div className="bg-cyan-500 flex items-center justify-center text-[10px] font-bold text-white" style={{ width: Math.max(pctEau, 1) + "%" }}>
            {pctEau > 8 ? pctEau + "%" : ""}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-600" />
            <span className="text-slate-600">Construction ({pctConstruction}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-slate-600">Equipements ({pctEquipements}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-slate-600">Nourriture ({pctNourriture}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
            <span className="text-slate-600">Eau ({pctEau}%)</span>
          </div>
        </div>
      </div>

      {/* ── Detail des couts ── */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Construction */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-lg">
              🏗️
            </div>
            <h3 className="font-bold text-slate-800">Construction</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Surface habitable</span>
              <span className="font-semibold text-slate-800">{resultats.surfaceVie} m²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Espaces communs</span>
              <span className="font-semibold text-slate-800">{SURFACE_COMMUNE_BASE} m²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Stockage</span>
              <span className="font-semibold text-slate-800">{resultats.surfaceStockage} m²</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-2">
              <span className="text-slate-600">Surface totale</span>
              <span className="font-bold text-slate-800">{resultats.surfaceTotale} m²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Prix au m² ({typeBunker.nom})</span>
              <span className="font-semibold text-slate-800">{formatPrix(typeBunker.prixM2)}</span>
            </div>
            <div className="flex justify-between bg-amber-50 rounded-lg px-3 py-2 mt-2">
              <span className="font-semibold text-amber-800">Total construction</span>
              <span className="font-bold text-amber-700">{formatPrix(resultats.prixConstruction)}</span>
            </div>
          </div>
        </div>

        {/* Provisions */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-lg">
              🥫
            </div>
            <h3 className="font-bold text-slate-800">Provisions</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Eau ({EAU_PAR_JOUR_PAR_PERSONNE}L/jour/pers.)</span>
              <span className="font-semibold text-slate-800">{resultats.litresEauTotal.toLocaleString("fr-FR")} L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Cout eau + stockage</span>
              <span className="font-semibold text-slate-800">{formatPrix(resultats.prixEau)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-2">
              <span className="text-slate-600">Nourriture ({CALORIES_PAR_JOUR} kcal/j/pers.)</span>
              <span className="font-semibold text-slate-800">{resultats.caloriesTotal.toLocaleString("fr-FR")} kcal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Rations longue conservation</span>
              <span className="font-semibold text-slate-800">{formatPrix(resultats.prixNourriture)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Cout par jour par personne</span>
              <span className="font-semibold text-slate-800">{formatPrix(PRIX_RATION_SURVIE_JOUR + Math.round(EAU_PAR_JOUR_PAR_PERSONNE * PRIX_EAU_LITRE_STOCKE * 100) / 100)}</span>
            </div>
            <div className="flex justify-between bg-green-50 rounded-lg px-3 py-2 mt-2">
              <span className="font-semibold text-green-800">Total provisions</span>
              <span className="font-bold text-green-700">{formatPrix(resultats.prixEau + resultats.prixNourriture)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Equipements detailles ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
            🔧
          </div>
          <h3 className="font-bold text-slate-800">Equipements et installations</h3>
        </div>
        <div className="space-y-2">
          {resultats.equipements.map((e, i) => (
            <div key={i} className="flex justify-between text-sm py-1.5 border-b border-slate-50 last:border-0">
              <span className="text-slate-600">{e.nom}</span>
              <span className="font-semibold text-slate-800">{formatPrix(e.prix)}</span>
            </div>
          ))}
          <div className="flex justify-between bg-blue-50 rounded-lg px-3 py-2 mt-2">
            <span className="font-semibold text-blue-800">Total equipements</span>
            <span className="font-bold text-blue-700">{formatPrix(resultats.prixEquipements)}</span>
          </div>
        </div>
      </div>

      {/* ── Resume final ── */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
        <h3 className="font-bold text-lg mb-4">Resume du projet</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider">Bunker</p>
            <p className="font-bold text-lg">{typeBunker.nom}</p>
            <p className="text-slate-400 text-sm">{resultats.surfaceTotale} m²</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider">Occupants</p>
            <p className="font-bold text-lg">{personnes} personne{personnes > 1 ? "s" : ""}</p>
            <p className="text-slate-400 text-sm">{SURFACE_MIN_PAR_PERSONNE} m² / personne</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider">Autonomie</p>
            <p className="font-bold text-lg">{duree.label}</p>
            <p className="text-slate-400 text-sm">{resultats.jours} jours</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider">Budget total</p>
            <p className="font-bold text-lg text-amber-400">{formatPrix(resultats.prixTotal)}</p>
            <p className="text-slate-400 text-sm">{formatPrix(Math.round(resultats.prixTotal / personnes))} / pers.</p>
          </div>
        </div>
      </div>

      {/* ── Avertissement ── */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        <p className="font-semibold mb-1">Estimation indicative</p>
        <p className="text-amber-700">
          Les prix varient fortement selon la region, le terrain (roche, nappe phreatique),
          l&apos;accessibilite du chantier et les prestataires. Ce simulateur donne un ordre
          de grandeur base sur les prix moyens constates en France en 2026. Pour un projet
          reel, consultez un constructeur specialise.
        </p>
      </div>
    </div>
  );
}
