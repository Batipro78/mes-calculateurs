"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";

const MapNucleaire = dynamic(() => import("../../simulateur-bombe-nucleaire/MapNucleaire"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-slate-100 rounded-xl flex items-center justify-center">
      <p className="text-slate-400 text-sm">Loading map...</p>
    </div>
  ),
});

const WEAPONS = [
  { id: "tactical", name: "Tactical Nuke", yield: 5, desc: "Tactical nuclear weapon (5 kT)" },
  { id: "hiroshima", name: "Little Boy (Hiroshima)", yield: 15, desc: "Bomb dropped on Hiroshima, August 6, 1945" },
  { id: "nagasaki", name: "Fat Man (Nagasaki)", yield: 21, desc: "Bomb dropped on Nagasaki, August 9, 1945" },
  { id: "w76", name: "W76 Trident (USA)", yield: 100, desc: "US strategic warhead, submarine-launched" },
  { id: "b61", name: "B61-12 (USA)", yield: 50, desc: "US tactical/strategic gravity bomb, NATO deployed" },
  { id: "sarmat", name: "RS-28 Sarmat (Russia)", yield: 800, desc: "Russian ICBM, multiple warheads" },
  { id: "b83", name: "B83 (USA)", yield: 1200, desc: "Largest active US nuclear bomb" },
  { id: "tsar", name: "Tsar Bomba (USSR)", yield: 50000, desc: "Largest bomb ever tested, 50 Mt, 1961" },
  { id: "custom", name: "Custom", yield: 0, desc: "Choose your own yield" },
];

const CITIES = [
  { name: "New York", lat: 40.7128, lng: -74.0060 },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { name: "Chicago", lat: 41.8781, lng: -87.6298 },
  { name: "Houston", lat: 29.7604, lng: -95.3698 },
  { name: "Washington DC", lat: 38.9072, lng: -77.0369 },
  { name: "Miami", lat: 25.7617, lng: -80.1918 },
  { name: "Seattle", lat: 47.6062, lng: -122.3321 },
  { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
  { name: "Dallas", lat: 32.7767, lng: -96.7970 },
  { name: "Denver", lat: 39.7392, lng: -104.9903 },
  { name: "Atlanta", lat: 33.7490, lng: -84.3880 },
  { name: "Boston", lat: 42.3601, lng: -71.0589 },
];

function calculateZones(yieldKt: number) {
  if (yieldKt <= 0) return [];

  const fireball = 0.033 * Math.pow(yieldKt, 0.40) * 1000;
  const radiation = 0.40 * Math.pow(yieldKt, 0.33) * 1000;
  const blast20psi = 0.28 * Math.pow(yieldKt, 0.33) * 1000;
  const blast5psi = 0.71 * Math.pow(yieldKt, 0.33) * 1000;
  const thermal = 0.67 * Math.pow(yieldKt, 0.41) * 1000;
  const blast1psi = 2.2 * Math.pow(yieldKt, 0.33) * 1000;

  return [
    { id: "fireball", radius: fireball, color: "#ff0000", fillColor: "#ff0000", label: "Fireball", description: "Total vaporization. Nothing survives.", mortalite: "100%" },
    { id: "radiation", radius: radiation, color: "#ff6600", fillColor: "#ff6600", label: "Lethal radiation (500 rem)", description: "Lethal radiation dose. Death within hours to weeks.", mortalite: "90-100%" },
    { id: "blast20", radius: blast20psi, color: "#ff3300", fillColor: "#ff3300", label: "Heavy blast (20 psi)", description: "Reinforced concrete destroyed. Near-total destruction.", mortalite: "~90%" },
    { id: "blast5", radius: blast5psi, color: "#ff9900", fillColor: "#ff9900", label: "Moderate blast (5 psi)", description: "Residential buildings collapsed. Massive fires.", mortalite: "~50%" },
    { id: "thermal", radius: thermal, color: "#ffcc00", fillColor: "#ffcc00", label: "3rd degree burns", description: "Severe burns on exposed skin. Spontaneous fires.", mortalite: "20-50%" },
    { id: "blast1", radius: blast1psi, color: "#66cc00", fillColor: "#66cc00", label: "Light blast (1 psi)", description: "Windows shattered, light damage. Injuries from debris.", mortalite: "~5%" },
  ];
}

function fmtDistance(metres: number): string {
  const miles = metres / 1609.34;
  if (miles >= 1) return `${miles.toFixed(1)} mi (${(metres / 1000).toFixed(1)} km)`;
  return `${Math.round(metres * 3.281)} ft (${Math.round(metres)} m)`;
}

function fmtSurface(metres: number): string {
  const km2 = Math.PI * Math.pow(metres / 1000, 2);
  const mi2 = km2 * 0.3861;
  if (mi2 >= 1) return `${mi2.toFixed(0)} mi² (${km2.toFixed(0)} km²)`;
  return `${(km2 * 100).toFixed(1)} hectares`;
}

export default function NuclearSimulator() {
  const [weaponId, setWeaponId] = useState("hiroshima");
  const [customYield, setCustomYield] = useState("100");
  const [cityIndex, setCityIndex] = useState(0);
  const [center, setCenter] = useState<[number, number]>([40.7128, -74.0060]);

  const weapon = WEAPONS.find((w) => w.id === weaponId)!;
  const yieldKt = weaponId === "custom" ? parseFloat(customYield) || 0 : weapon.yield;
  const zones = useMemo(() => calculateZones(yieldKt), [yieldKt]);

  function handleCityChange(index: number) {
    setCityIndex(index);
    setCenter([CITIES[index].lat, CITIES[index].lng]);
  }

  function handleMapClick(lat: number, lng: number) {
    setCenter([lat, lng]);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <label className="block text-sm font-medium text-slate-600 mb-2">Nuclear weapon</label>
          <select
            value={weaponId}
            onChange={(e) => setWeaponId(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          >
            {WEAPONS.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name} {w.id !== "custom" ? `(${w.yield >= 1000 ? `${w.yield / 1000} Mt` : `${w.yield} kT`})` : ""}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-400 mt-2">{weapon.desc}</p>

          {weaponId === "custom" && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-600 mb-2">Yield (kilotons)</label>
              <input
                type="number"
                min="0.1"
                max="100000"
                step="1"
                value={customYield}
                onChange={(e) => setCustomYield(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-lg font-semibold focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                placeholder="e.g. 100"
              />
              <p className="text-xs text-slate-400 mt-1">1 Mt = 1,000 kT. Hiroshima = 15 kT.</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <label className="block text-sm font-medium text-slate-600 mb-2">Ground zero</label>
          <select
            value={cityIndex}
            onChange={(e) => handleCityChange(parseInt(e.target.value))}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          >
            {CITIES.map((c, i) => (
              <option key={c.name} value={i}>{c.name}</option>
            ))}
          </select>
          <p className="text-xs text-slate-400 mt-2">Or click directly on the map to move the impact point.</p>
          <div className="mt-3 bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-500">Coordinates: {center[0].toFixed(4)}, {center[1].toFixed(4)}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-red-200 text-sm mb-1">Explosion yield</p>
          <p className="text-4xl font-extrabold">
            {yieldKt >= 1000 ? `${(yieldKt / 1000).toFixed(yieldKt % 1000 === 0 ? 0 : 1)} Mt` : `${yieldKt} kT`}
          </p>
          <div className="h-px bg-white/20 my-3" />
          <p className="text-red-200 text-xs">
            {yieldKt > 0 ? (
              <>Equivalent to <strong className="text-white">{yieldKt >= 1000 ? `${Math.round(yieldKt / 15)} times Hiroshima` : `${(yieldKt / 15).toFixed(1)} times Hiroshima`}</strong></>
            ) : "Select a weapon"}
          </p>
          {zones.length > 0 && (
            <p className="text-red-200 text-xs mt-1">
              Total destruction radius: <strong className="text-white">{fmtDistance(zones[2]?.radius || 0)}</strong>
            </p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm">
        <div className="h-[500px] rounded-xl overflow-hidden">
          <MapNucleaire center={center} zones={zones} onMapClick={handleMapClick} />
        </div>
      </div>

      {zones.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Detailed impact zones</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {zones.map((zone) => (
              <div key={zone.id} className="rounded-xl border-2 p-4" style={{ borderColor: zone.color }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: zone.fillColor }} />
                  <p className="font-semibold text-slate-800 text-sm">{zone.label}</p>
                </div>
                <p className="text-xs text-slate-500 mb-2">{zone.description}</p>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Radius</span>
                  <span className="font-bold text-slate-700">{fmtDistance(zone.radius)}</span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-slate-400">Area</span>
                  <span className="font-bold text-slate-700">{fmtSurface(zone.radius)}</span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-slate-400">Fatality rate</span>
                  <span className="font-bold" style={{ color: zone.color }}>{zone.mortalite}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Disclaimer:</strong> This simulator is an educational tool based on nuclear explosion physics formulas (Hopkinson scaling law, Glasstone &amp; Dolan data). The radii shown are theoretical approximations for an optimal airburst detonation. Actual effects depend on many factors: detonation altitude, topography, weather, building types. This simulator does not account for radioactive fallout.
        </p>
      </div>
    </div>
  );
}
