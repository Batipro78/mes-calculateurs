"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";

const MapNucleaire = dynamic(() => import("./MapNucleaire"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-slate-100 rounded-xl flex items-center justify-center">
      <p className="text-slate-400 text-sm">Chargement de la carte...</p>
    </div>
  ),
});

// --- Presets d'armes ---
const ARMES = [
  { id: "tactique", nom: "Arme tactique", puissance: 5, desc: "Bombe tactique (5 kT)" },
  { id: "hiroshima", nom: "Little Boy (Hiroshima)", puissance: 15, desc: "Bombe larguee sur Hiroshima, 6 aout 1945" },
  { id: "nagasaki", nom: "Fat Man (Nagasaki)", puissance: 21, desc: "Bombe larguee sur Nagasaki, 9 aout 1945" },
  { id: "w76", nom: "W76 (USA - Trident)", puissance: 100, desc: "Ogive strategique americaine, sous-marin" },
  { id: "tn75", nom: "TN75 (France)", puissance: 300, desc: "Ogive strategique francaise, sous-marin" },
  { id: "sarmat", nom: "RS-28 Sarmat (Russie)", puissance: 800, desc: "Missile intercontinental russe" },
  { id: "b83", nom: "B83 (USA)", puissance: 1200, desc: "Plus grosse bombe active americaine" },
  { id: "tsar", nom: "Tsar Bomba (URSS)", puissance: 50000, desc: "Plus grosse bombe jamais testee, 50 Mt, 1961" },
  { id: "custom", nom: "Personnalise", puissance: 0, desc: "Choisissez votre propre puissance" },
];

// --- Villes ---
const VILLES = [
  { nom: "Paris", lat: 48.8566, lng: 2.3522 },
  { nom: "Lyon", lat: 45.7640, lng: 4.8357 },
  { nom: "Marseille", lat: 43.2965, lng: 5.3698 },
  { nom: "Toulouse", lat: 43.6047, lng: 1.4442 },
  { nom: "Nice", lat: 43.7102, lng: 7.2620 },
  { nom: "Lille", lat: 50.6292, lng: 3.0573 },
  { nom: "Strasbourg", lat: 48.5734, lng: 7.7521 },
  { nom: "Bordeaux", lat: 44.8378, lng: -0.5792 },
  { nom: "Nantes", lat: 47.2184, lng: -1.5536 },
  { nom: "Rennes", lat: 48.1173, lng: -1.6778 },
];

// --- Formules de calcul ---
function calculerZones(puissanceKt: number) {
  if (puissanceKt <= 0) return [];

  const fireball = 0.033 * Math.pow(puissanceKt, 0.40) * 1000; // metres
  const radiation = 0.40 * Math.pow(puissanceKt, 0.33) * 1000;
  const blast20psi = 0.28 * Math.pow(puissanceKt, 0.33) * 1000;
  const blast5psi = 0.71 * Math.pow(puissanceKt, 0.33) * 1000;
  const thermal = 0.67 * Math.pow(puissanceKt, 0.41) * 1000;
  const blast1psi = 2.2 * Math.pow(puissanceKt, 0.33) * 1000;

  return [
    {
      id: "fireball",
      radius: fireball,
      color: "#ff0000",
      fillColor: "#ff0000",
      label: "Boule de feu",
      description: "Vaporisation totale. Rien ne survit.",
      mortalite: "100%",
    },
    {
      id: "radiation",
      radius: radiation,
      color: "#ff6600",
      fillColor: "#ff6600",
      label: "Radiation letale (500 rem)",
      description: "Dose letale de radiation. Mort en quelques heures a semaines.",
      mortalite: "90-100%",
    },
    {
      id: "blast20",
      radius: blast20psi,
      color: "#ff3300",
      fillColor: "#ff3300",
      label: "Souffle violent (20 psi)",
      description: "Batiments en beton detruits. Destruction quasi-totale.",
      mortalite: "~90%",
    },
    {
      id: "blast5",
      radius: blast5psi,
      color: "#ff9900",
      fillColor: "#ff9900",
      label: "Souffle modere (5 psi)",
      description: "Immeubles d'habitation effondres. Incendies massifs.",
      mortalite: "~50%",
    },
    {
      id: "thermal",
      radius: thermal,
      color: "#ffcc00",
      fillColor: "#ffcc00",
      label: "Brulures 3e degre",
      description: "Brulures graves sur peau exposee. Incendies spontanes.",
      mortalite: "20-50%",
    },
    {
      id: "blast1",
      radius: blast1psi,
      color: "#66cc00",
      fillColor: "#66cc00",
      label: "Souffle leger (1 psi)",
      description: "Vitres brisees, degats legers. Blessures par debris.",
      mortalite: "~5%",
    },
  ];
}

function fmtDistance(metres: number): string {
  if (metres >= 1000) return `${(metres / 1000).toFixed(1)} km`;
  return `${Math.round(metres)} m`;
}

function fmtSurface(metres: number): string {
  const km2 = Math.PI * Math.pow(metres / 1000, 2);
  if (km2 >= 1) return `${km2.toFixed(0)} km²`;
  return `${(km2 * 100).toFixed(1)} hectares`;
}

export default function SimulateurNucleaire() {
  const [armeId, setArmeId] = useState("hiroshima");
  const [puissanceCustom, setPuissanceCustom] = useState("100");
  const [villeIndex, setVilleIndex] = useState(0);
  const [center, setCenter] = useState<[number, number]>([48.8566, 2.3522]);

  const arme = ARMES.find((a) => a.id === armeId)!;
  const puissance = armeId === "custom" ? parseFloat(puissanceCustom) || 0 : arme.puissance;
  const zones = useMemo(() => calculerZones(puissance), [puissance]);

  function handleVilleChange(index: number) {
    setVilleIndex(index);
    setCenter([VILLES[index].lat, VILLES[index].lng]);
  }

  function handleMapClick(lat: number, lng: number) {
    setCenter([lat, lng]);
  }

  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Selection arme */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Type d&apos;arme nucleaire
          </label>
          <select
            value={armeId}
            onChange={(e) => setArmeId(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          >
            {ARMES.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nom} {a.id !== "custom" ? `(${a.puissance >= 1000 ? `${a.puissance / 1000} Mt` : `${a.puissance} kT`})` : ""}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-400 mt-2">{arme.desc}</p>

          {armeId === "custom" && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Puissance (kilotonnes)
              </label>
              <input
                type="number"
                min="0.1"
                max="100000"
                step="1"
                value={puissanceCustom}
                onChange={(e) => setPuissanceCustom(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-lg font-semibold focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                placeholder="Ex : 100"
              />
              <p className="text-xs text-slate-400 mt-1">
                1 Mt = 1 000 kT. Hiroshima = 15 kT.
              </p>
            </div>
          )}
        </div>

        {/* Selection ville */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Point d&apos;impact
          </label>
          <select
            value={villeIndex}
            onChange={(e) => handleVilleChange(parseInt(e.target.value))}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          >
            {VILLES.map((v, i) => (
              <option key={v.nom} value={i}>
                {v.nom}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-400 mt-2">
            Ou cliquez directement sur la carte pour deplacer le point d&apos;impact.
          </p>
          <div className="mt-3 bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-500">
              Coordonnees : {center[0].toFixed(4)}, {center[1].toFixed(4)}
            </p>
          </div>
        </div>

        {/* Resume puissance */}
        <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-red-200 text-sm mb-1">Puissance de l&apos;explosion</p>
          <p className="text-4xl font-extrabold">
            {puissance >= 1000
              ? `${(puissance / 1000).toFixed(puissance % 1000 === 0 ? 0 : 1)} Mt`
              : `${puissance} kT`}
          </p>
          <div className="h-px bg-white/20 my-3" />
          <p className="text-red-200 text-xs">
            {puissance > 0 ? (
              <>
                Equivalent a{" "}
                <strong className="text-white">
                  {puissance >= 1000
                    ? `${Math.round(puissance / 15)} fois Hiroshima`
                    : `${(puissance / 15).toFixed(1)} fois Hiroshima`}
                </strong>
              </>
            ) : (
              "Selectionnez une arme"
            )}
          </p>
          {zones.length > 0 && (
            <p className="text-red-200 text-xs mt-1">
              Rayon de destruction totale :{" "}
              <strong className="text-white">{fmtDistance(zones[2]?.radius || 0)}</strong>
            </p>
          )}
        </div>
      </div>

      {/* Carte */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm">
        <div className="h-[500px] rounded-xl overflow-hidden">
          <MapNucleaire center={center} zones={zones} onMapClick={handleMapClick} />
        </div>
      </div>

      {/* Legende des zones */}
      {zones.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Zones d&apos;impact detaillees</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {zones.map((zone) => (
              <div
                key={zone.id}
                className="rounded-xl border-2 p-4"
                style={{ borderColor: zone.color }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: zone.fillColor }}
                  />
                  <p className="font-semibold text-slate-800 text-sm">{zone.label}</p>
                </div>
                <p className="text-xs text-slate-500 mb-2">{zone.description}</p>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Rayon</span>
                  <span className="font-bold text-slate-700">{fmtDistance(zone.radius)}</span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-slate-400">Surface</span>
                  <span className="font-bold text-slate-700">{fmtSurface(zone.radius)}</span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-slate-400">Mortalite</span>
                  <span className="font-bold" style={{ color: zone.color }}>
                    {zone.mortalite}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Avertissement */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Avertissement :</strong> Ce simulateur est un outil educatif base sur les
          formules de physique des explosions nucleaires (loi de Hopkinson, donnees Glasstone &amp;
          Dolan). Les rayons affiches sont des approximations theoriques pour une detonation
          aerienne optimale. Les effets reels dependent de nombreux facteurs : altitude de
          detonation, topographie, meteo, type de batiments. Ce simulateur ne prend pas en
          compte les retombees radioactives (fallout).
        </p>
      </div>
    </div>
  );
}
