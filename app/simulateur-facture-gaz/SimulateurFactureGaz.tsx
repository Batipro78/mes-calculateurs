"use client";

import { useState, useMemo } from "react";
import { calcFactureGaz, CONSOMMATIONS_TYPIQUES } from "./factureGazCalc";

const PRIX_KWH_ZONE_MAP: Record<string, string> = {
  zone1: "0,1284",
  zone2: "0,1324",
  zone3: "0,1365",
  zone4: "0,1406",
  zone5: "0,1447",
  zone6: "0,1488",
};

function fmt(n: number, decimals = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

const ZONES = [
  { id: "zone1", label: "Zone 1", villes: "Paris, Ile-de-France, Nord" },
  { id: "zone2", label: "Zone 2", villes: "Lyon, Bordeaux, Rennes" },
  { id: "zone3", label: "Zone 3", villes: "Marseille, Toulouse, Nantes" },
  { id: "zone4", label: "Zone 4", villes: "Strasbourg, Metz, Reims" },
  { id: "zone5", label: "Zone 5", villes: "Montpellier, Nice, Grenoble" },
  { id: "zone6", label: "Zone 6", villes: "Clermont-Ferrand, Limoges, Poitiers" },
];

const USAGES_CARDS = [
  {
    id: "cuisson",
    label: "Cuisson",
    emoji: "🍳",
    description: "Gaziniere / four gaz",
    conso: 1000,
  },
  {
    id: "eau-chaude",
    label: "Eau chaude",
    emoji: "🚿",
    description: "Chauffe-eau gaz seul",
    conso: 3500,
  },
  {
    id: "chauffage",
    label: "Chauffage",
    emoji: "🏠",
    description: "Chauffage central gaz",
    conso: null, // depends on surface
  },
];

const SURFACES = [
  { label: "50 m²", value: 50, consoKey: "chauffage-50m2" },
  { label: "80 m²", value: 80, consoKey: "chauffage-80m2" },
  { label: "120 m²", value: 120, consoKey: "chauffage-120m2" },
];

function getConsoFromSurface(surface: number): number {
  if (surface <= 60) return CONSOMMATIONS_TYPIQUES["chauffage-50m2"];
  if (surface <= 100) return CONSOMMATIONS_TYPIQUES["chauffage-80m2"];
  return CONSOMMATIONS_TYPIQUES["chauffage-120m2"];
}

// Simple SVG pie chart
function PieChart({
  segments,
}: {
  segments: { label: string; value: number; color: string }[];
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  if (total === 0) return null;

  let cumAngle = 0;
  const paths: { d: string; color: string; label: string; pct: number }[] = [];
  const cx = 80;
  const cy = 80;
  const r = 70;

  segments.forEach((seg) => {
    const pct = seg.value / total;
    const startAngle = cumAngle;
    const endAngle = cumAngle + pct * 2 * Math.PI;
    const x1 = cx + r * Math.sin(startAngle);
    const y1 = cy - r * Math.cos(startAngle);
    const x2 = cx + r * Math.sin(endAngle);
    const y2 = cy - r * Math.cos(endAngle);
    const largeArc = pct > 0.5 ? 1 : 0;
    const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`;
    paths.push({ d, color: seg.color, label: seg.label, pct });
    cumAngle = endAngle;
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox="0 0 160 160" className="w-40 h-40">
        {paths.map((p) => (
          <path key={p.label} d={p.d} fill={p.color} />
        ))}
      </svg>
      <div className="space-y-1.5 w-full">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-xs text-slate-600">{seg.label}</span>
            </div>
            <span className="text-xs font-semibold text-slate-700">
              {fmt(seg.value)} EUR/mois
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SimulateurFactureGaz() {
  const [usage, setUsage] = useState("chauffage");
  const [zone, setZone] = useState("zone2");
  const [surface, setSurface] = useState(80);
  const [consommationKwh, setConsommationKwh] = useState(13000);
  const [fournisseur] = useState("tarif-reglemente");

  const resultat = useMemo(
    () => calcFactureGaz(consommationKwh, zone, usage, fournisseur),
    [consommationKwh, zone, usage, fournisseur]
  );

  function handleUsageChange(u: string) {
    setUsage(u);
    if (u === "chauffage") {
      setConsommationKwh(getConsoFromSurface(surface));
    } else {
      const card = USAGES_CARDS.find((c) => c.id === u);
      if (card && card.conso !== null) setConsommationKwh(card.conso);
    }
  }

  function handleSurfaceQuick(s: number) {
    setSurface(s);
    if (usage === "chauffage") {
      setConsommationKwh(getConsoFromSurface(s));
    }
  }

  const pieSegments = [
    { label: "Abonnement", value: resultat.abonnementMensuel, color: "#3b82f6" },
    { label: "Consommation", value: resultat.consommationMensuelle, color: "#f97316" },
    { label: "CTA", value: resultat.ctaMensuelle, color: "#8b5cf6" },
    { label: "TVA 5,5%", value: resultat.tva55, color: "#10b981" },
    { label: "TVA 20%", value: resultat.tva20, color: "#f59e0b" },
    { label: "TICGN", value: resultat.ticgn, color: "#ec4899" },
  ];

  return (
    <div className="space-y-8">
      {/* Usage cards */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-600 mb-3">Usage du gaz</p>
        <div className="grid grid-cols-3 gap-3">
          {USAGES_CARDS.map((u) => (
            <button
              key={u.id}
              onClick={() => handleUsageChange(u.id)}
              className={`flex flex-col items-center gap-1 p-4 rounded-xl border-2 text-center transition-colors ${
                usage === u.id
                  ? "bg-orange-50 border-orange-400 text-orange-800"
                  : "border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              <span className="text-2xl">{u.emoji}</span>
              <span className="text-sm font-semibold">{u.label}</span>
              <span className="text-xs text-slate-400">{u.description}</span>
              {u.conso !== null && (
                <span className="text-xs font-medium text-slate-500 mt-0.5">
                  ~{u.conso.toLocaleString("fr-FR")} kWh/an
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Formulaire — 3 cols */}
        <div className="lg:col-span-3 space-y-6">
          {/* Surface si chauffage */}
          {usage === "chauffage" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-600 mb-3">
                Surface du logement
              </label>
              <div className="flex gap-2 mb-4">
                {SURFACES.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => handleSurfaceQuick(s.value)}
                    className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-semibold border-2 transition-colors ${
                      surface === s.value
                        ? "bg-orange-50 border-orange-400 text-orange-700"
                        : "border-slate-200 text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={surface}
                  onChange={(e) => {
                    const v = parseInt(e.target.value) || 80;
                    setSurface(v);
                    setConsommationKwh(getConsoFromSurface(v));
                  }}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  min="10"
                  max="500"
                  step="5"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  m²
                </span>
              </div>
            </div>
          )}

          {/* Consommation annuelle */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Consommation annuelle (kWh/an)
            </label>
            <div className="relative">
              <input
                type="number"
                value={consommationKwh}
                onChange={(e) => setConsommationKwh(parseInt(e.target.value) || 0)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-xl font-semibold pr-20 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                min="0"
                step="100"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                kWh/an
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Valeur indicative — verifiez sur votre relevé de compteur ou facture precedente.
            </p>
          </div>

          {/* Zone tarifaire */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <label className="block text-sm font-medium text-slate-600 mb-3">
              Zone tarifaire GRDF
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ZONES.map((z) => (
                <button
                  key={z.id}
                  onClick={() => setZone(z.id)}
                  className={`px-3 py-3 rounded-xl text-left border-2 transition-colors ${
                    zone === z.id
                      ? "bg-orange-50 border-orange-400"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span
                    className={`block text-sm font-semibold ${zone === z.id ? "text-orange-700" : "text-slate-700"}`}
                  >
                    {z.label} — {PRIX_KWH_ZONE_MAP[z.id]} EUR/kWh
                  </span>
                  <span className="block text-xs text-slate-400 mt-0.5">{z.villes}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resultats — 2 cols */}
        <div className="lg:col-span-2 space-y-4">
          {/* Facture mensuelle principale */}
          <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 shadow-lg shadow-orange-200/50">
            <p className="text-sm text-orange-100 mb-1">Facture mensuelle estimee</p>
            <p className="text-4xl font-extrabold tracking-tight">
              {fmt(resultat.factureMensuelle)}{" "}
              <span className="text-lg font-semibold">EUR</span>
            </p>
            <div className="h-px bg-white/20 my-4" />
            <div className="flex justify-between text-sm">
              <span className="text-orange-100">Facture annuelle</span>
              <span className="font-bold text-xl">{fmt(resultat.factureAnnuelle)} EUR/an</span>
            </div>
          </div>

          {/* Decomposition */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600 mb-4">
              Detail de la facture (mensuel)
            </p>
            <div className="space-y-2 mb-5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Abonnement</span>
                <span className="text-sm font-semibold text-blue-600">
                  {fmt(resultat.abonnementMensuel)} EUR
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Consommation</span>
                <span className="text-sm font-semibold text-orange-600">
                  {fmt(resultat.consommationMensuelle)} EUR
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">CTA</span>
                <span className="text-sm font-semibold text-purple-600">
                  {fmt(resultat.ctaMensuelle)} EUR
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">TVA 5,5%</span>
                <span className="text-sm font-semibold text-emerald-600">
                  {fmt(resultat.tva55)} EUR
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">TVA 20%</span>
                <span className="text-sm font-semibold text-amber-600">
                  {fmt(resultat.tva20)} EUR
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">TICGN</span>
                <span className="text-sm font-semibold text-pink-600">
                  {fmt(resultat.ticgn)} EUR
                </span>
              </div>
              <div className="h-px bg-slate-100" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-700">Total mensuel</span>
                <span className="text-base font-extrabold text-orange-600">
                  {fmt(resultat.factureMensuelle)} EUR
                </span>
              </div>
            </div>
            <PieChart segments={pieSegments} />
          </div>

          {/* Note tarif */}
          <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
            Estimations basees sur le tarif reglemente GRDF Q1 2026. Votre facture reelle depend de votre contrat, de votre isolation et de vos habitudes.
          </div>
        </div>
      </div>

      {/* Comparaison fournisseurs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Comparaison fournisseurs de gaz (estimation annuelle)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-3 text-slate-500 font-medium">Fournisseur</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Prix kWh</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Facture annuelle</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">vs tarif reglemente</th>
              </tr>
            </thead>
            <tbody>
              {resultat.comparaisonFournisseurs.map((f, i) => {
                const ref = resultat.comparaisonFournisseurs[0].factureAnnuelle;
                const diff = f.factureAnnuelle - ref;
                return (
                  <tr
                    key={f.nom}
                    className={`border-b border-slate-100 ${i === 0 ? "bg-orange-50/50" : ""}`}
                  >
                    <td className={`py-2.5 px-3 font-medium ${i === 0 ? "text-orange-700" : "text-slate-700"}`}>
                      {f.nom}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-600">
                      {f.prixKwh.toLocaleString("fr-FR", { minimumFractionDigits: 4, maximumFractionDigits: 4 })} EUR
                    </td>
                    <td className={`py-2.5 px-3 text-right font-bold ${i === 0 ? "text-orange-700" : "text-slate-700"}`}>
                      {fmt(f.factureAnnuelle)} EUR
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {i === 0 ? (
                        <span className="text-slate-400 text-xs">Reference</span>
                      ) : (
                        <span className={`text-xs font-semibold ${diff < 0 ? "text-green-600" : "text-red-500"}`}>
                          {diff > 0 ? "+" : ""}{fmt(diff)} EUR
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-3">
          * Les prix des fournisseurs alternatifs sont indicatifs et peuvent varier selon les offres en cours.
        </p>
      </div>

      {/* Conseils */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Conseils pour reduire sa facture de gaz
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            {
              emoji: "🌡️",
              titre: "Baisser le thermostat",
              texte: "Reduire de 1°C = 7% d'economie. 19°C est la temperature recommandee.",
            },
            {
              emoji: "🔧",
              titre: "Entretenir la chaudiere",
              texte: "Un entretien annuel obligatoire ameliore le rendement jusqu'a 15%.",
            },
            {
              emoji: "🪟",
              titre: "Isolation renforcee",
              texte: "Double vitrage et isolation des combles peuvent reduire la facture de 30%.",
            },
            {
              emoji: "📅",
              titre: "Programmer le chauffage",
              texte: "Reduire de 3-4°C la nuit et en absence = economie de 10 a 15%.",
            },
            {
              emoji: "💧",
              titre: "Reduire la consommation eau chaude",
              texte: "Douches courtes, mousseurs robinet, regulateur de debit.",
            },
            {
              emoji: "🔄",
              titre: "Comparer les offres",
              texte: "Le marche libre peut proposer des tarifs inferieurs selon les periodes.",
            },
          ].map((conseil) => (
            <div key={conseil.titre} className="flex gap-3 p-4 bg-slate-50 rounded-xl">
              <span className="text-xl flex-shrink-0">{conseil.emoji}</span>
              <div>
                <p className="text-sm font-semibold text-slate-700">{conseil.titre}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{conseil.texte}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

